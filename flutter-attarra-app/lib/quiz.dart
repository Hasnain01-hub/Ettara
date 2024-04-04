import 'dart:convert';

import 'package:attarra/constant/api.dart';
import 'package:attarra/constant/quiz_constant.dart';
import 'package:attarra/product_recommendation.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../constant/Size_configs.dart';

class QuizPage extends StatefulWidget {
  @override
  State<QuizPage> createState() => _QuizPageState();
}

class _QuizPageState extends State<QuizPage> {
  late PageController _controller;

  Map<String, String> qnaData = {};
  @override
  void initState() {
    _controller = PageController();
    super.initState();
  }

  int _currentPage = 0;
  AnimatedContainer _buildDots({
    int? index,
  }) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      decoration: const BoxDecoration(
        borderRadius: BorderRadius.all(
          Radius.circular(50),
        ),
        color: Color(0xFF000000),
      ),
      margin: const EdgeInsets.only(right: 5),
      height: 10,
      curve: Curves.easeIn,
      width: _currentPage == index ? 20 : 10,
    );
  }

  String? gender; //no radio button will be selected
  //String gender = "male"; //if you want to set default value
  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    double width = SizeConfig.screenW!;
    double height = SizeConfig.screenH!;
    return Scaffold(
      backgroundColor: Color(0xff0c0f14),
      appBar: AppBar(
        title: Text("Quiz Page"),
        backgroundColor: Color(0xFF563300),
      ),
      body: Container(
        padding: EdgeInsets.all(20),
        child: Column(
          children: [
            Expanded(
                flex: 3,
                child: PageView.builder(
                    physics: const BouncingScrollPhysics(),
                    controller: _controller,
                    onPageChanged: (value) =>
                        setState(() => _currentPage = value),
                    itemCount: data.length,
                    itemBuilder: (context, i) {
                      return Column(
                        children: [
                          Text(
                            data[i].question,
                            style: TextStyle(fontSize: 18, color: Colors.white),
                          ),
                          Divider(),
                          Column(
                              children: List.generate(
                                  data[i].answer.length,
                                  (index) => ListTile(
                                        title: Text(
                                          data[i].answer[index][0],
                                          style: TextStyle(
                                            fontSize: 15,
                                            color: Colors.white,
                                          ),
                                        ),
                                        onTap: () async {
                                          setState(() {
                                            qnaData[data[i].key] =
                                                (index + 1).toString();
                                          });
                                          await _controller.nextPage(
                                            duration: const Duration(
                                              milliseconds: 200,
                                            ),
                                            curve: Curves.easeIn,
                                          );
                                        },
                                      )).toList()),
                          SizedBox(height: 30),
                          data.length != i + 1
                              ? ElevatedButton(
                                  onPressed: () async {
                                    setState(() {
                                      qnaData[data[i].key] = "1";
                                    });
                                    await _controller.nextPage(
                                      duration:
                                          const Duration(milliseconds: 200),
                                      curve: Curves.easeIn,
                                    );
                                  },
                                  child: const Text("Next"),
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: Color(0xff6D756E),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(50),
                                    ),
                                    elevation: 0,
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 100, vertical: 20),
                                    textStyle: TextStyle(fontSize: 17),
                                  ),
                                )
                              : SizedBox(),
                        ],
                      );
                    })),
            _currentPage + 1 == data.length
                ? Padding(
                    padding: const EdgeInsets.all(30),
                    child: ElevatedButton(
                      onPressed: () async {
                        print(qnaData);
                        var result = await http.post(
                            Uri.parse(
                                Constants().flaskUrl + "/quizRecommendation"),
                            body: jsonEncode(qnaData));
                        print(result.body);
                        Navigator.pop(context);
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => ProductRecommendation(
                                  productName: result.body)),
                        );
                      },
                      child: const Text("Submit"),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Color(0xffAB877D),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(50),
                        ),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 100, vertical: 20),
                        textStyle: TextStyle(fontSize: 17),
                      ),
                    ),
                  )
                : Divider(),
          ],
        ),
      ),
    );
  }
}
