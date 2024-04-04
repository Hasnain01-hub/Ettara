import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

class ProductRecommendation extends StatefulWidget {
  final String productName;
  const ProductRecommendation({required this.productName, super.key});

  @override
  State<ProductRecommendation> createState() => _ProductRecommendationState();
}

class _ProductRecommendationState extends State<ProductRecommendation> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xff0c0f14),
      appBar: AppBar(
        title: Text("Product Recommendation"),
        backgroundColor: Color(0xFF563300),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              widget.productName,
              style: TextStyle(
                color: Color(0xffF2EAE2),
                fontSize: 20,
              ),
            ),
            SizedBox(height: 20),
            ClipRRect(
              borderRadius: BorderRadius.circular(10.0),
              child: Image(
                image: Image.network(
                        "https://celebratingsweets.com/wp-content/uploads/2017/06/Espresso-Chip-Frappe-2-500x500.jpg")
                    .image,
                height: 300,
                width: 300,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
