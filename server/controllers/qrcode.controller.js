var QRCode = require('qrcode');
var base64ToImage = require('base64-to-image');

require('dotenv').config()

const generateURL = (name) => {
    // return `http://localhost:6969/api/qrcode/${name}`;
    return `https://a4ac-42-106-241-46.ngrok-free.app/api/qrcode/${name}`;
};

const QRCodeGenerator = async (req, res) => {
    //TODO: Add validation
    const name = req.body.productName;
    const url = generateURL(name);
    const qrCode = await QRCode.toDataURL(url, {
      type: "image/png",
      margin: 1,
      width: 300,
    });
    console.log(qrCode)
    const path = name+'_qr.png'

    const imgdata = qrCode
    base64ToImage(imgdata,path);

    
    // res.setHeader("content-type", "image/png");
    res.status(200).json({qrCode});
  }

const almondFrappeColdCoffee = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Almond Frappe Cold Coffee',
        'Beverage_category': 'Cold Coffee',
        'Beverage_description': "Looking for a refreshing and lactose-free beat-the-heat solution? Our Almond Frappe is the perfect answer! Made with creamy almond milk, this indulgent treat is blended to perfection with ice for a smooth and satisfying texture. Whether you're dairy-free or just looking for a new twist on your usual iced coffee, our Almond Frappe is sure to hit the spot.",
        'Calories': 3,
        'Total Fat (g)': 0.1,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 5,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.7,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 260
    });
}

const bonBonColdCoffee = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Bon Bon Cold Coffee',
        'Beverage_category': 'Cold Coffee',
        'Beverage_description': "The perfect coffee indulgence for those who love a touch of sweetness. Our expertly crafted coffee is paired with a generous drizzle of condensed milk, creating a delectable combination of flavors that will satisfy any craving. Indulge in the rich and creamy texture of our Bon Bon and experience a little taste of heaven in every sip.",
        'Calories': 3,
        'Total Fat (g)': 0.5,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 7,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.9,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 460
    });
}

const classicFrappeColdCoffee = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Classic Frappe Cold Coffee',
        'Beverage_category': 'Cold Coffee',
        'Beverage_description': "Our Classic Frappe is a delicious blend of coffee, milk, and ice that's perfect for any time of day. It's a creamy and refreshing drink that's a must-try for coffee lovers. Get your caffeine fix with this classic beverage.",
        'Calories': 9,
        'Total Fat (g)': 0.5,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 3,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.5,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 120
    });
}

const hazelnutFrappeColdCoffee = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Hazelnut Frappe Cold Coffee',
        'Beverage_category': 'Cold Coffee',
        'Beverage_description': "Indulge in the nutty and creamy flavors of our Hazelnut Frappe. Made with a blend of coffee, hazelnut syrup, milk, and ice, this drink is drizzled with caramel sauce and is a perfect treat to satisfy your cravings. Order now to experience the perfect blend of flavors.",
        'Calories': 3,
        'Total Fat (g)': 0.5,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 2,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.1,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 70
    });
}

const icedAmericanoColdCoffee = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Hazelnut Frappe Cold Coffee',
        'Beverage_category': 'Cold Coffee',
        'Beverage_description': "Indulge in the nutty and creamy flavors of our Hazelnut Frappe. Made with a blend of coffee, hazelnut syrup, milk, and ice, this drink is drizzled with caramel sauce and is a perfect treat to satisfy your cravings. Order now to experience the perfect blend of flavors.",
        'Calories': 3,
        'Total Fat (g)': 0.5,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 2,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.1,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 70
    });
}

const icedLatteColdCoffee = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Iced Latte Cold Coffee',
        'Beverage_category': 'Cold Coffee',
        'Beverage_description': "Our Iced Latte is a deliciously smooth and creamy drink made with espresso and cold milk poured over ice. It's a perfect combination of coffee and milk, great for those who prefer a milder coffee taste.",
        'Calories': 7,
        'Total Fat (g)': 0.6,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 3,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.1,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 150
    });
}

const madagascarChocoChipFrappeColdCoffee = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Madagascar Choco Chip Frappe Cold Coffee',
        'Beverage_category': 'Cold Coffee',
        'Beverage_description': "Satisfy your chocolate cravings with our Madagascar ChocoChip Frappe. Made with a blend of coffee, chocolate syrup, milk, and ice, this drink is topped with chocolate chips for an added crunch. Order now to indulge in this chocolatey delight.",
        'Calories': 11,
        'Total Fat (g)': 0.3,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 5,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.5,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 220
    });
}

const nariyalIrishCreamFrappe = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Nariyal Irish Cream Frappe',
        'Beverage_category': 'Cold Coffee',
        'Beverage_description': "Treat yourself to the perfect blend of tender coconut and premium coffee with our Nariyal Irish Cream Frappe! This refreshing beverage is blended to precision for a smooth and creamy texture that will tantalize your taste buds. Order now to experience the tropical paradise in a cup.",
        'Calories': 15,
        'Total Fat (g)': 0.5,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 5,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.5,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 330
    });
}

const originalSouthIndiaFrappe = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Original South India Frappe',
        'Beverage_category': 'Cold Coffee',
        'Beverage_description': "Experience the best of South India with our Original South India Frappe - a modern twist on the classic filter kaapi. We start with the finest quality coffee beans sourced from the region and carefully filter them to create a rich and aromatic base. Our expert baristas then blend this traditional filter kaapi with ice, milk and a touch of sweetness for a truly indulgent frappe experience. The result is a creamy, smooth and refreshing drink that will transport you straight to the streets of South India. Order now and savor the authentic taste of our Traditional Filter Kaapi Frappe!",
        'Calories': 7,
        'Total Fat (g)': 0.2,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 1,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.5,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 250
    });
}

const vietnameseColdCoffee = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Vietnamese Cold Coffee',
        'Beverage_category': 'Cold Coffee',
        'Beverage_description': "Savor the rich and bold flavors of our Vietnamese coffee. Made with strong coffee and sweetened condensed milk, this iced beverage is a must-try for coffee aficionados. Order now to experience the authentic taste of Vietnam.",
        'Calories': 5,
        'Total Fat (g)': 0.2,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 1,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.3,
        'Sugars (g)': 0.4,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 110
    });
}

const americano = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Americano',
        'Beverage_category': 'Hot Coffee',
        'Beverage_description': "A classic coffee made with hot water and a shot of espresso. Simple, yet satisfying.(A.K.A. Up All Night Recovery)",
        'Calories': 3,
        'Total Fat (g)': 0.2,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 3,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.3,
        'Sugars (g)': 0.4,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 70
    });
}

const bellatte = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Bellatte',
        'Beverage_category': 'Hot Coffee',
        'Beverage_description': "Our unique twist on the classic Cafe Latte features a rich espresso shot blended with steamed milk and natural Jaggery sourced from villages in Southern India. The natural sweetness of Jaggery gives this drink a delightful depth of flavor without the need for additional syrups or sugars. Order now to experience the deliciously sweet Bella'tte.",
        'Calories': 7,
        'Total Fat (g)': 0.2,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 5,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.3,
        'Sugars (g)': 0.4,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 260
    });
}

const cafeLatte = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Cafe Latte',
        'Beverage_category': 'Hot Coffee',
        'Beverage_description': "Smooth, creamy coffee made with steamed milk and a shot of espresso. Perfect for those who prefer a milder coffee taste.",
        'Calories': 2,
        'Total Fat (g)': 0.2,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 5,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.3,
        'Sugars (g)': 0.4,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 160
    });
}

const cafeMocha = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Cafe Mocha',
        'Beverage_category': 'Hot Coffee',
        'Beverage_description': "Cafe Mocha - A delicious blend of milk coffee and special dark cocoa from Madagascar. Indulge in the velvety texture of steamed milk and the intense flavor of cocoa.",
        'Calories': 5,
        'Total Fat (g)': 0.1,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 6,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.3,
        'Sugars (g)': 0.4,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 220
    });
}

const cappucino = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Cappucino',
        'Beverage_category': 'Hot Coffee',
        'Beverage_description': "'Safest Bet' A classic Italian coffee made with equal parts of espresso, steamed milk, and frothed milk. Enjoy the perfect balance of rich coffee and creamy milk.",
        'Calories': 7,
        'Total Fat (g)': 0.1,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 2,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.4,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 40
    });
}

const doubleRestritto = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Double Restritto [44 Ml]',
        'Beverage_category': 'Hot Coffee',
        'Beverage_description': "A shot of espresso with half the amount of water, resulting in a bolder and more intense flavor. A must-try for espresso lovers.",
        'Calories': 5,
        'Total Fat (g)': 0.1,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 3,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.4,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 530
    });
}

const espresso = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Espresso [30 Ml]',
        'Beverage_category': 'Hot Coffee',
        'Beverage_description': "Bold, aromatic espresso shot that's sure to awaken your senses. This 30ml 'Wake Me Up' Coffee Shot is perfect for an energizing start to your day.",
        'Calories': 6,
        'Total Fat (g)': 0.1,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 7,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.4,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 130
    });
}

const flatWhite = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Flat White [250 Ml]',
        'Beverage_category': 'Hot Coffee',
        'Beverage_description': "A smooth and velvety coffee made with a double shot of espresso and steamed milk. Experience the perfect balance of rich espresso and silky milk.",
        'Calories': 5,
        'Total Fat (g)': 0.1,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 3,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.4,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 210
    });
}

const kaapi_cino = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Kaapi-cino',
        'Beverage_category': 'Hot Coffee',
        'Beverage_description': "A fusion of traditional South Indian filter coffee and frothy cappuccino. Experience the best of both worlds in every sip.",
        'Calories': 5,
        'Total Fat (g)': 0.1,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 3,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.4,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 110
    });
}

const seaSaltDarkMocha = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Sea Salt Dark Mocha',
        'Beverage_category': 'Hot Coffee',
        'Beverage_description': "Our Sea Salt Dark Mocha is a delicious blend of milk coffee and special cocoa sourced from Madagascar, savored with Konkan coastal sea salt. The unique combination of rich, dark cocoa and sea salt creates a flavor profile that's both savory and sweet. Enjoy the velvety texture of steamed milk and the complex flavors of this indulgent drink.",
        'Calories': 7,
        'Total Fat (g)': 0.1,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 5,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.4,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 310
    });
}

const southIndianFilterKaapi = async(req,res) => {
    res.status(200).json({
        'Beverage': 'South Indian Filter Kaapi',
        'Beverage_category': 'Hot Coffee',
        'Beverage_description': "A traditional Indian coffee made with a unique blend of roasted coffee beans and chicory, served with frothy milk. A rich, flavorful brew that will transport you to the streets of South India.",
        'Calories': 12,
        'Total Fat (g)': 0.1,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 7,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.4,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 150
    });
}

const hotChocolate = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Hot Chocolate 250ML',
        'Beverage_category': 'Hot Chocolate',
        'Beverage_description': "Warm up your taste buds with our rich and creamy Hot Chocolate. Made with premium cocoa, this indulgent treat is the perfect way to satisfy your sweet tooth.",
        'Calories': 12,
        'Total Fat (g)': 0.1,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 7,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.4,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 150
    });
}

const madagascarHotChocolate = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Madagascar Hot Chocolate 250ML',
        'Beverage_category': 'Hot Chocolate',
        'Beverage_description': "Savor the intense and complex flavors of the 'sinfully dark chocolate' as it melts in your mouth, leaving you feeling warm and satisfied. Perfect for a cozy night in or as an after-dinner treat, our Madagascar Hot Chocolate is sure to become your new favorite indulgence. Order now and experience the ultimate in chocolatey bliss.",
        'Calories': 7,
        'Total Fat (g)': 0.1,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 7,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.4,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 170
    });
}

const coldBrew = async(req,res) => {
    res.status(200).json({
        'Beverage': 'Cold Brew',
        'Beverage_category': 'Manual Brew',
        'Beverage_description': "Refresh yourself with our smooth and refreshing Cold Brew coffee. Brewed with cold water and steeped for hours, our Cold Brew coffee has less acidity and bitterness, making it the perfect pick-me-up on hot summer days or any time you need a refreshing boost.",
        'Calories': 10,
        'Total Fat (g)': 0.1,
        'Trans Fat (g)': 0.0,
        'Saturated Fat (g)': 0.0,
        'Sodium (mg)': 0,
        'Total Carbohydrates (g)': 5,
        'Cholesterol (mg)': 0,
        'Dietary Fibre (g)': 0.1,
        'Sugars (g)': 0.4,
        'Protein (g)': 0.1,
        'Vitamin A (% DV)': '0%',
        'Vitamin C (% DV)': '1%',
        'Calcium (% DV)': '1%',
        'Iron (% DV)': '0%',
        'Caffeine (mg)': 210
    });
}

module.exports = {
    QRCodeGenerator,
    almondFrappeColdCoffee,
    bonBonColdCoffee,
    classicFrappeColdCoffee,
    hazelnutFrappeColdCoffee,
    icedAmericanoColdCoffee,
    icedLatteColdCoffee,
    madagascarChocoChipFrappeColdCoffee,
    nariyalIrishCreamFrappe,
    originalSouthIndiaFrappe,
    vietnameseColdCoffee,
    americano,
    bellatte,
    cafeLatte,
    cafeMocha,
    cappucino,
    doubleRestritto,
    espresso,
    flatWhite,
    kaapi_cino,
    seaSaltDarkMocha,
    southIndianFilterKaapi,
    hotChocolate,
    madagascarHotChocolate,
    coldBrew,
}