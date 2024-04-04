class QuizData {
  final String question;
  final List answer;
  // final Map<String, dynamic> correctAnswer;
  final String key;
  final String value;
  QuizData({
    required this.key,
    required this.value,
    required this.question,
    required this.answer,
  });
}

List data = <QuizData>[
  QuizData(
    question: "What do you like to do first thing Saturday morning?",
    answer: [
      ["Go for a walk with your dog"],
      ["Walk to a local coffee shop"],
      ["Whatever pleases you"],
      ["Check social media"],
      ["Work out"],
      ["Catch up on work"]
    ],
    key: "SaturdayMorning",
    value: "1",
  ),
  QuizData(
    question: "Where would you like to vacation?",
    answer: [
      ["Colombia"],
      ["Ethiopia"],
      ["Hawaii"],
      ["California"],
      ["New  York"],
      ["France"],
    ],
    key: "Vacation",
    value: "1",
  ),
  QuizData(
    question: "What would you like for breakfast?",
    answer: [
      ["Bagel with cream cheese"],
      ["Butter croissant"],
      ["Vanilla bean scones"],
      ["Egg and cheese breakfast sandwich"],
      ["Chocolate crêpes"],
      ["Chocolate chip banana bread"],
    ],
    key: "Breakfast",
    value: "1",
  ),
  QuizData(
    question: "What style house would you live in?",
    answer: [
      ["Farmhouse rustic"],
      ["Traditional"],
      ["Modern"],
      ["Victorian"],
      ["Mid-century modern"],
      ["Farmhouse modern"],
    ],
    key: "House",
    value: "1",
  ),
  QuizData(
    question: "What is your favorite thing to do on vacation?",
    answer: [
      ["Take guided tours"],
      ["Go to museums"],
      ["Hike the mountains"],
      ["Relax on the beach"],
      ["Shop 'til you drop"],
      ["Run on the trails"],
    ],
    key: "FavouriteThing",
    value: "1",
  ),
  QuizData(
    question: "Which American city would you like to live in?",
    answer: [
      ["Portland, Oregon"],
      ["New York City, New York"],
      ["Park City, Utah"],
      ["Charleston, South Carolina"],
      ["Stowe, Vermont"],
      ["San Francisco, California"],
    ],
    key: "City",
    value: "1",
  ),
  QuizData(
    question: "What is your favorite holiday?",
    answer: [
      ["Thanksgiving"],
      ["New Year's Day"],
      ["4th of July"],
      ["Easter"],
      ["Christmas"],
      ["Valentine's Day"],
    ],
    key: "Holiday",
    value: "1",
  ),
  QuizData(
    question: "Pick a cup or mug to drink your coffee out of?",
    answer: [
      ["Big mug"],
      ["Diner mug"],
      ["Mug with a saying on it"],
      ["To-go cup"],
      ["Glass mug"],
      ["Cup with a dome lid"],
    ],
    key: "Cup",
    value: "1",
  ),
  QuizData(
    question: "Lastly, what would you rather do on Friday night?",
    answer: [
      ["Watch a movie and chill"],
      ["Go to a party"],
      ["Read a book"],
      ["Watch a documentary"],
      ["Have people over for dinner"],
      ["Play card/ board games"],
    ],
    key: "Friday",
    value: "1",
  ),
];
