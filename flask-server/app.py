from flask import Flask
import os
import re
import operator
import requests
import json
import base64
from flask import request, jsonify, make_response
# import cv2
from io import BytesIO
from PIL import Image
import numpy as np
import pyimgur
import json
import os
from dotenv import load_dotenv
# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision_v1 import AnnotateImageResponse
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import tensorflow as tf
from tensorflow.keras import layers
from difflib import SequenceMatcher
import pickle
from flask_cors import CORS

load_dotenv()

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "google-cloud-service-account-key.json"
# Instantiates a client
client = vision.ImageAnnotatorClient()


imgur_client_id = os.environ['IMGUR_CLIENT']
imgur_client = pyimgur.Imgur(imgur_client_id)

# imgur_headers = {"Authorization": "Client-ID my-client-id"}

# imgur_api_key = os.environ['IMGUR_KEY']

# imgur_url = "http://api.imgur.com/3/upload.json"


app = Flask(__name__)
CORS(app)

@app.route('/imageRecognition',  methods=['POST'])
def annotate_image():
    request_data = json.loads(request.data)
    print(request_data['image_uri'])
    # response = client.label_detection(image=vision.Image(source=vision.ImageSource(image_uri="https://cdn.zeebiz.com/sites/default/files/2023/03/08/230800-new-delhi-union-defence-pti.jpg")))
    response = client.annotate_image({
        'image': {
            'source': {
                'image_uri': request_data['image_uri'],
            }
        }
    })

    # serialize / deserialize proto (binary)
    serialized_proto_plus = AnnotateImageResponse.serialize(response)
    deserialized_response = AnnotateImageResponse.deserialize(
        serialized_proto_plus)

    # serialize / deserialize json
    response_json = AnnotateImageResponse.to_json(deserialized_response)
    json_response = json.loads(response_json)
    label_response = json_response["webDetection"]["bestGuessLabels"][0]["label"]
    return label_response

@app.route('/quizRecommendation',  methods=['POST'])
def quiz_recommendation():
    request_data = json.loads(request.data)
    
    saturdayMorning = request_data['SaturdayMorning']
    vacation = request_data['Vacation']
    breakfast = request_data['Breakfast']
    house = request_data['House']
    favouriteThing = request_data['FavouriteThing']
    city = request_data['City']
    holiday = request_data['Holiday']
    cup = request_data['Cup']
    friday = request_data['Friday']
    
    
    quiz_data = pd.read_csv('quiz_data.csv')

    # Split the dataset into features and labels
    X = quiz_data.drop('Beverage', axis=1)
    y = quiz_data['Beverage']
    
    # Encode the labels as integers
    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(y)
    
    # Load the model
    loaded_model = tf.keras.models.load_model('beverage_model')
    
    # Define a test case
    test_case = pd.DataFrame({
        'SaturdayMorning': [int(saturdayMorning)],
        'Vacation': [int(vacation)],
        'Breakfast': [int(breakfast)],
        'House': [int(house)],
        'FavouriteThing': [int(favouriteThing)],
        'City': [int(city)],
        'Holiday': [int(holiday)],
        'Cup': [int(cup)],
        'Friday': [int(friday)]
    })
    
    # Make a prediction using the loaded model
    prediction = loaded_model.predict(test_case)
    
    # Decode the prediction
    predicted_beverage = label_encoder.inverse_transform([tf.argmax(prediction, axis=1).numpy()[0]])
    
    print('Predicted beverage:', predicted_beverage[0])
    return predicted_beverage[0]

@app.route("/imageRecognitionDetails", methods=["POST"])
def image_recognition_details():
    
    file = request.files['file']
    if not file:
        return "No file uploaded", 400
    
    img = Image.open(file)
    img.save('image.jpg')
    uploaded_image = imgur_client.upload_image('image.jpg') 
    print(uploaded_image.link)   
     
    # request_data = json.loads(request.data)
    # print(request_data['image_uri'])
    # response = client.label_detection(image=vision.Image(source=vision.ImageSource(image_uri="https://cdn.zeebiz.com/sites/default/files/2023/03/08/230800-new-delhi-union-defence-pti.jpg")))
    response = client.annotate_image({
        'image': {
            'source': {
                'image_uri': uploaded_image.link,
            }
        }
    })

    # serialize / deserialize proto (binary)
    serialized_proto_plus = AnnotateImageResponse.serialize(response)
    deserialized_response = AnnotateImageResponse.deserialize(
        serialized_proto_plus)

    # serialize / deserialize json
    response_json = AnnotateImageResponse.to_json(deserialized_response)
    json_response = json.loads(response_json)
    label_response = json_response["webDetection"]["bestGuessLabels"][0]["label"]

    drink_data = pd.read_csv('starbucks_drinkMenu_expanded.csv')
    query = label_response
    best_match = find_matching_beverage(drink_data, query)
    if best_match is not None:
        print(f"Match found")
    else:
        print(f"No match found for '{query}'")
    
    result = {
        'Beverage_category': drink_data.iloc[best_match, 0],
        'Beverage': drink_data.iloc[best_match, 1],
        'Beverage_prep': drink_data.iloc[best_match, 2],
        'Calories': int(drink_data.iloc[best_match, 3]),
        'Total Fat (g)': float(drink_data.iloc[best_match, 4]),
        'Trans Fat (g)': float(drink_data.iloc[best_match, 5]),
        'Saturated Fat (g)': float(drink_data.iloc[best_match, 6]),
        'Sodium (mg)': int(drink_data.iloc[best_match, 7]),
        'Total Carbohydrates (g)': float(drink_data.iloc[best_match, 8]),
        'Cholesterol (mg)': int(drink_data.iloc[best_match, 9]),
        'Dietary Fibre (g)': float(drink_data.iloc[best_match, 10]),
        'Sugars (g)': float(drink_data.iloc[best_match, 11]),
        'Protein (g)': float(drink_data.iloc[best_match, 12]),
        'Vitamin A (% DV)': (drink_data.iloc[best_match, 13]),
        'Vitamin C (% DV)': (drink_data.iloc[best_match, 14]),
        'Calcium (% DV)': (drink_data.iloc[best_match, 15]),
        'Iron (% DV)': (drink_data.iloc[best_match, 16]),
        'Caffeine (mg)': (drink_data.iloc[best_match, 17])
    }
    return jsonify({'result': result})

@app.route("/imageTest", methods=["POST"])
def image_test():
    file = request.files['file']
    if not file:
        return "No file uploaded", 400
    
    img = Image.open(file)
    img.save('image.jpg')
    uploaded_image = imgur_client.upload_image('image.jpg') 
    print(uploaded_image.link)    
   
    
    print(uploaded_image.link)    
    return 'Success!'



def find_matching_beverage(df, query):
    # concatenate the 'Beverage_category' and 'Beverage' columns
    beverages = df['Beverage_category'] + ' ' + df['Beverage']
    # initialize the best match and its score
    best_match = None
    best_score = 0
    # loop through all the beverages and calculate their similarity scores with the query
    for i, beverage in enumerate(beverages):
        score = SequenceMatcher(None, query.lower(), beverage.lower()).ratio()
        # if the score is higher than the previous best score, update the best match and its score
        if score > best_score:
            best_match = i
            best_score = score
    # if no match was found, return None
    if best_match is None:
        return None
    # otherwise, return the row of the best match
    return best_match

@app.route('/getDetails',  methods=['POST'])
def get_details():
    # load the dataset
    drink_data = pd.read_csv('starbucks_drinkMenu_expanded.csv')
    query = 'iced white mocha with sweet cream and caramel drizzle'
    result = find_matching_beverage(drink_data, query)
    if result is not None:
        print(f"Match found: {result['Beverage_category']} {result['Beverage']}")
        print(f"Calories: {result[3]}")
        print(f"Total Fat: {result[4]} g")
        print(f"Trans Fat: {result[5]} g")
        print(f"Saturated Fat: {result[6]} g")
        print(f"Sodium: {result[7]} mg")
        print(f"Total Carbohydrates: {result[8]} g")
        print(f"Cholesterol: {result[9]} mg")
        print(f"Dietary Fibre: {result[10]} g")
        print(f"Sugars: {result[11]} g")
        print(f"Protein: {result[12]} g")
        print(f"Vitamin A (% DV): {result[13]}%")
        print(f"Vitamin C (% DV): {result[14]}%")
        print(f"Calcium (% DV): {result[15]}%")
        print(f"Iron (% DV): {result[16]}%")
        print(f"Caffeine: {result[17]} mg")
    else:
        print(f"No match found for '{query}'")
    
    return ''

@app.route('/hourwiseSalesPrediction',  methods=['POST'])
def hourwise_sales_prediction():
    request_data = json.loads(request.data)
    
    # Load the model
    with open('item_popularity_model.pkl', 'rb') as f:
        loaded_model = pickle.load(f)

    # Load the label encoder used for training
    with open('item_popularity_model_label_encoding.pkl', 'rb') as f:
        let = pickle.load(f)

    # Test case

    def get_hour_num(hour_str):
        hour = pd.to_datetime(hour_str).hour
        return hour


    test_hour = request_data['test_hour']
    test_item = request_data['test_item']
    _test_item =  test_item.replace(" ", '')
    print(test_item)

    item_encoded = let.transform([_test_item])[0]

    # Convert the hour to numerical representation
    hour_num = get_hour_num(test_hour)

    # Create a test DataFrame
    test_df = pd.DataFrame({'Hour': [hour_num], 'Item': [item_encoded]})

    # Make the prediction using the loaded model
    prediction = loaded_model.predict(test_df)

    return (f"The predicted quantity of {test_item} at {test_hour} is {prediction[0]}")
    # return make_response(prediction[0])

@app.route('/',  methods=['POST'])
def workflow():
    return 'Hey'


if __name__ == "__main__":
    app.run()