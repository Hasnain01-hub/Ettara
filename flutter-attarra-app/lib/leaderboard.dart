import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

class LeaderBoard extends StatefulWidget {
  const LeaderBoard({super.key});

  @override
  State<LeaderBoard> createState() => _LeaderBoardState();
}

class _LeaderBoardState extends State<LeaderBoard> {
  var leaders = [
    {
      "name": "5 Coffee Beans you\n Must Try!",
      "points": "653",
      "image": "images/coffee3.jpeg",
    },
    {
      "name": "5 Coffee Beans you\n Must Try!",
      "points": "651",
      "image": "images/coffee3.jpeg",
    },
    {
      "name": "5 Coffee Beans you\n Must Try!",
      "points": "789",
      "image":
          "https://ui-avatars.com/api/?name=sdf&background=random&color=fff",
    },
    {
      "name": "5 Coffee Beans you\n Must Try!",
      "points": "560",
      "image": "https://ui-avatars.com/api/?name=we&background=random&color=fff",
    },
    {
      "name": "5 Coffee Beans you\n Must Try!",
      "points": "540",
      "image": "images/coffee3.jpeg",
    },
    {
      "name": "5 Coffee Beans you\n Must Try!",
      "points": "482",
      "image": "images/coffee3.jpeg",
    },
    {
      "name": "5 Coffee Beans you\n Must Try!",
      "points": "420",
      "image": "https://ui-avatars.com/api/?name=khjjyfg&background=random&color=fff",
    },
    {
      "name": "5 Coffee Beans you\n Must Try!",
      "points": "346",
      "image": "images/coffee3.jpeg",
    },
    {
      "name": "5 Coffee Beans you\n Must Try!",
      "points": "239",
      "image": "https://ui-avatars.com/api/?name=esrtdf&background=random&color=fff",
    },
    {
      "name": "5 Coffee Beans you\n Must Try!",
      "points": "176",
      "image": "images/coffee3.jpeg",
    },
  ];

  @override
  Widget build(BuildContext context) {
    var screenHeight = MediaQuery.of(context).size.height;
    var screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      backgroundColor: Color(0xff0c0f14),
      body: SafeArea(
        child: SingleChildScrollView(
            child: Column(
          children: [
            Text(
              "Leader board",
              style: TextStyle(
                fontSize: 25,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
            ),
            SizedBox(height: 20),
            Stack(
              alignment: Alignment.topRight,
              children: [
                Container(
                  padding: EdgeInsets.all(12.0),
                  margin: EdgeInsets.symmetric(horizontal: 15),
                  height: screenHeight * 0.2 - 20,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: Color(0xff171b22),
                    borderRadius: BorderRadius.circular(25),
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: Container(
                          decoration: BoxDecoration(
                            boxShadow: [
                              BoxShadow(
                                blurRadius: 2.0,
                                spreadRadius: 1.0,
                                color: Color(0xff30221f),
                              ),
                            ],
                            image: DecorationImage(
                              fit: BoxFit.cover,
                              image: AssetImage(
                                "images/coffee3.jpeg",
                              ),
                            ),
                            borderRadius: BorderRadius.circular(20.0),
                          ),
                        ),
                      ),
                      SizedBox(
                        width: 20.0,
                      ),
                      ListView.builder(
                        itemBuilder: (context, index) {
                          return Expanded(
                            flex: 2,
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  "5 Coffee Beans you\n Must Try!",
                                  style: TextStyle(
                                    fontSize: 17,
                                    color: Colors.white,
                                    fontWeight: FontWeight.w400,
                                  ),
                                ),
                                Text(
                                  "With Oat Milk",
                                  style: TextStyle(
                                    color: Color(0xffaeaeae),
                                  ),
                                ),
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Row(
                                      children: [
                                        Icon(
                                          Icons.star,
                                          size: 15,
                                          color: Color(0xffd17842),
                                        ),
                                        Text(
                                          "\$\t",
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            color: Color(0xffd17842),
                                          ),
                                        ),
                                        Text(
                                          "4.20",
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            color: Colors.white,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                )
                              ],
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                ),
              ],
            )
          ],
        )),
      ),
    );
  }
}
