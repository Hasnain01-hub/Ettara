import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:attarra/detail_page.dart';
import 'package:provider/provider.dart';

import 'auth/Authentication.dart';

class HomePage extends StatefulWidget {
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late final screenHeight;
  late final screenWidth;
  Widget buildCoffeeCategory({categoryName, isSelected}) {
    return Padding(
      padding: const EdgeInsets.only(left: 20),
      child: Column(
        children: [
          Text(
            categoryName,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: isSelected ? Color(0xffd17842) : Color(0xff52555a),
            ),
          ),
          isSelected
              ? Text(
                  "⬤",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Color(0xffd17842),
                  ),
                )
              : Text(""),
        ],
      ),
    );
  }

  Widget buildSingleItem(element) {
    List<Widget> buildPricing() {
      List<Widget> priceList = [];
      for (var i = 0; i < element["prices"].length; i++) {
        priceList.add(
          Text(
            "\₹${element["prices"][i]["price"]} - ${element["prices"][i]["size"]} ml",
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: Color(0xffd17842),
            ),
          ),
        );
      }
      return priceList;
    }

    return GestureDetector(
      onTap: () {
        Navigator.of(context)
            .push(MaterialPageRoute(builder: (context) => DetailPage(element)));
      },
      child: Container(
        width: screenWidth * 0.4 + 10,
        height: screenHeight * 0.35,
        margin: EdgeInsets.all(15.0),
        padding: EdgeInsets.all(10.0),
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: Color.fromARGB(255, 33, 36, 45),
          borderRadius: BorderRadius.circular(20.0),
        ),
        child: Stack(
          alignment: Alignment.topRight,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  flex: 2,
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
                        image: NetworkImage(element["url"]),
                      ),
                      borderRadius: BorderRadius.circular(20.0),
                    ),
                  ),
                ),
                SizedBox(
                  height: 10.0,
                ),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Text(
                        element["name"],
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(
                        height: 3,
                      ),
                      Text(
                        element["desc"].length < 30 ? element["desc"] : element["desc"].substring(0, 20) + "...",
                        style: TextStyle(
                          color: Color(0xffaeaeae),
                          fontSize: 10,
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            children: buildPricing(),
                          ),
                          Container(
                            decoration: BoxDecoration(
                              color: Color(0xffd17842),
                              borderRadius: BorderRadius.circular(7),
                            ),
                            child: Icon(
                              Icons.add,
                              size: 25,
                              color: Colors.white,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Future<List<Map<String, dynamic>>> getItemsData() async {
    var querySnapshot =
        await FirebaseFirestore.instance.collection("menu").get();
    final allData = querySnapshot.docs.map((doc) => doc.data()).toList();
    return allData;
  }

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<FirebaseAuthService>(context).currentUser();

    screenHeight = MediaQuery.of(context).size.height;
    screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      backgroundColor: Color(0xff0c0f14),
      body: SafeArea(
        child: SingleChildScrollView(
          physics: BouncingScrollPhysics(),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              SizedBox(
                height: 20,
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    ElevatedButton(
                      child:
                          Text("Logout", style: TextStyle(color: Colors.black)),
                      style: ElevatedButton.styleFrom(
                          backgroundColor: Color(0xffE2C2AA)),
                      onPressed: () async {
                        await Provider.of<FirebaseAuthService>(context,
                                listen: false)
                            .signOutUser();
                      },
                    ),
                    Container(
                      height: 40,
                      width: 40,
                      decoration: BoxDecoration(
                          color: Color(0xff141921),
                          borderRadius: BorderRadius.circular(15.0),
                          image: DecorationImage(
                            image: user!.photoUrl != null
                                ? NetworkImage(user.photoUrl!)
                                : AssetImage("images/profile.png")
                                    as ImageProvider,
                          )),
                    ),
                  ],
                ),
              ),
              SizedBox(
                height: 20,
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(
                      "Find the best",
                      style: TextStyle(
                        fontSize: 25,
                        fontWeight: FontWeight.w600,
                        color: Colors.white,
                      ),
                    ),
                    Text(
                      "Beverage for you",
                      style: TextStyle(
                        fontSize: 30,
                        fontWeight: FontWeight.w600,
                        color: Colors.white,
                      ),
                    )
                  ],
                ),
              ),
              FutureBuilder<List<Map<String, dynamic>>>(
                  future: getItemsData(),
                  builder: (BuildContext context,
                      AsyncSnapshot<List<Map<String, dynamic>>> snapshot) {
                    if (!snapshot.hasData) {
                      return const CircularProgressIndicator();
                    } else {
                      List<Widget> widgets = [];
                      snapshot.data!.forEach((element) {
                        widgets.add(
                          buildSingleItem(element),
                        );
                      });
                      return SingleChildScrollView(
                        physics: BouncingScrollPhysics(),
                        scrollDirection: Axis.horizontal,
                        child: Row(
                          children: widgets,
                        ),
                      );
                    }
                  }),
              Padding(
                padding: const EdgeInsets.only(left: 5),
                child: ListTile(
                  leading: Text(
                    "Special for you",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20.0,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ),
              ),
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
                        Expanded(
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
                                  Container(
                                    decoration: BoxDecoration(
                                      color: Color(0xffd17842),
                                      borderRadius: BorderRadius.circular(10.0),
                                    ),
                                    child: Icon(Icons.add,
                                        size: 30, color: Colors.white),
                                  )
                                ],
                              )
                            ],
                          ),
                        )
                      ],
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(right: 15),
                    height: 25.0,
                    width: 50.0,
                    decoration: BoxDecoration(
                      color: Color(0xff231715),
                      borderRadius: BorderRadius.only(
                        topRight: Radius.circular(20.0),
                        bottomLeft: Radius.circular(20.0),
                      ),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Icon(
                          Icons.star,
                          size: 15,
                          color: Color(0xffd17842),
                        ),
                        Text(
                          "4.5",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        )
                      ],
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
