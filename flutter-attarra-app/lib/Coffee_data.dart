class coffee_data {
  final String image;
  final String title;
  final String subTitle;
  final double price;
  final double rating;

  coffee_data({
    required this.image,
    required this.title,
    required this.subTitle,
    required this.price,
    required this.rating,
  });
}

List<coffee_data> coffee = [
  coffee_data(
    image: "images/coffee1.jpeg",
    title: "Cappuccino",
    subTitle: "Coffee Shop",
    price: 4.99,
    rating: 4.5,
  ),
  coffee_data(
    image: "images/coffee8.jpeg",
    title: "Cappuccino",
    subTitle: "With Chocolate",
    price: 3.14,
    rating: 4.5,
  ),
  coffee_data(
    image: "images/coffee2.jpeg",
    title: "Cappuccino",
    subTitle: "With Chocolate",
    price: 3.14,
    rating: 4.5,
  ),
  coffee_data(
    image: "images/coffee4.jpeg",
    title: "Cappuccino",
    subTitle: "With Chocolate",
    price: 3.14,
    rating: 4.5,
  ),
];


