import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

class DisplayNFT extends StatefulWidget {
  final Map<String, dynamic> element;
  const DisplayNFT({required this.element, super.key});

  @override
  State<DisplayNFT> createState() => _DisplayNFTState();
}

class _DisplayNFTState extends State<DisplayNFT> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xff0c0f14),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              SizedBox(height: 20),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(
                      widget.element["title"],
                      style: TextStyle(
                        fontSize: 25,
                        fontWeight: FontWeight.w600,
                        color: Colors.white,
                      ),
                    ),
                    SizedBox(height: 20),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(20.0),
                      child: Image(
                        fit: BoxFit.cover,
                        image:
                            Image.network(widget.element["secure_url"]).image,
                        height: 300,
                        width: 300,
                      ),
                    ),
                    SizedBox(height: 20),
                    Text(
                      widget.element["description"],
                      style: TextStyle(
                        fontSize: 16,
                        // fontWeight: FontWeight.w600,
                        color: Colors.white,
                      ),
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
