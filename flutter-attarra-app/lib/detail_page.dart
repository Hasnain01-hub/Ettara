import 'dart:convert';
import 'dart:ui';
import 'package:attarra/constant/api.dart';
import 'package:http/http.dart' as http;
import 'package:attarra/auth/Authentication.dart';
import 'package:attarra/home_page.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:provider/provider.dart';

class DetailPage extends StatefulWidget {
  Map<String, dynamic> element;

  DetailPage(this.element);

  @override
  State<DetailPage> createState() => _DetailPageState();
}

class _DetailPageState extends State<DetailPage> {
  late String? currPrice = null;
  late String? currSize = null;

  List<Widget> getSizeTabs() {
    List<Widget> tabs = [];
    for (int i = 0; i < widget.element['prices'].length; i++) {
      tabs.add(
        MaterialButton(
          onPressed: () {
            setState(() {
              currPrice = widget.element['prices'][i]['price'];
              currSize = widget.element['prices'][i]['size'] + "ml";
            });
          },
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
            side: BorderSide(
              color: Color(0xffb25e2b),
            ),
          ),
          child: Text(
            widget.element['prices'][i]['size'] + "ml",
            style: TextStyle(
              color: Color(0xffb86b3c),
            ),
          ),
        ),
      );
    }
    return tabs;
  }

  @override
  Widget build(BuildContext context) {
    var screenHeight = MediaQuery.of(context).size.height;
    var screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      backgroundColor: Color(0xff0c0f14),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            children: [
              Expanded(
                flex: 2,
                child: Stack(
                  children: [
                    Container(
                      width: double.infinity,
                      decoration: BoxDecoration(
                        image: DecorationImage(
                          fit: BoxFit.cover,
                          image: NetworkImage(widget.element['url']),
                        ),
                        borderRadius: BorderRadius.circular(30.0),
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          ClipRRect(
                            borderRadius: BorderRadius.circular(30.0),
                            child: BackdropFilter(
                              filter: ImageFilter.blur(
                                sigmaX: 10.0,
                                sigmaY: 10.0,
                              ),
                              child: Container(
                                padding: EdgeInsets.symmetric(horizontal: 20.0),
                                width: double.infinity,
                                height: screenHeight * 0.2 - 20,
                                decoration: BoxDecoration(
                                  color: Color(0xff311d18).withOpacity(0.6),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Row(
                                      children: [
                                        Expanded(
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              Column(
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.start,
                                                children: [
                                                  Text(
                                                    widget.element['name'],
                                                    style: TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 20.0,
                                                      fontWeight:
                                                          FontWeight.normal,
                                                    ),
                                                  ),
                                                ],
                                              ),
                                              SizedBox(
                                                height: 3,
                                              ),
                                            ],
                                          ),
                                        ),
                                        Expanded(
                                          child: Column(
                                            children: [
                                              Row(
                                                mainAxisAlignment:
                                                    MainAxisAlignment
                                                        .spaceEvenly,
                                                children: [
                                                  Container(
                                                    height: 40.0,
                                                    width: 40.0,
                                                    decoration: BoxDecoration(
                                                      color: Color(0xff141921),
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                        10.0,
                                                      ),
                                                    ),
                                                    child: Column(
                                                      mainAxisAlignment:
                                                          MainAxisAlignment
                                                              .spaceEvenly,
                                                      children: [
                                                        SvgPicture.asset(
                                                          'images/coffeeicon.svg',
                                                          height: 20,
                                                          color:
                                                              Color(0xffd17842),
                                                        ),
                                                        Text(
                                                          "Coffee",
                                                          style: TextStyle(
                                                            fontSize: 10,
                                                            color: Color(
                                                                0xffaeaeae),
                                                          ),
                                                        )
                                                      ],
                                                    ),
                                                  ),
                                                  Container(
                                                    height: 40.0,
                                                    width: 40.0,
                                                    decoration: BoxDecoration(
                                                      color: Color(0xff141921),
                                                      borderRadius:
                                                          BorderRadius.circular(
                                                        10.0,
                                                      ),
                                                    ),
                                                    child: Column(
                                                      mainAxisAlignment:
                                                          MainAxisAlignment
                                                              .spaceEvenly,
                                                      children: [
                                                        SvgPicture.asset(
                                                          'images/milkicon.svg',
                                                          height: 20,
                                                          color:
                                                              Color(0xffd17842),
                                                        ),
                                                        Text(
                                                          "Milk",
                                                          style: TextStyle(
                                                            fontSize: 10,
                                                            color: Color(
                                                                0xffaeaeae),
                                                          ),
                                                        )
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                              SizedBox(
                                                height: 10,
                                              ),
                                              MaterialButton(
                                                minWidth: 120,
                                                onPressed: () {},
                                                color: Color(0xff101419),
                                                shape: RoundedRectangleBorder(
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                    10.0,
                                                  ),
                                                ),
                                                child: Text(
                                                  "Medicum Roasted",
                                                  style: TextStyle(
                                                    fontSize: 10,
                                                    color: Color(0xffaeaeae),
                                                  ),
                                                ),
                                              )
                                            ],
                                          ),
                                        )
                                      ],
                                    )
                                  ],
                                ),
                              ),
                            ),
                          )
                        ],
                      ),
                    ),
                    Padding(
                      padding:
                          const EdgeInsets.only(left: 20, top: 20, right: 20),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            height: 40.0,
                            width: 40.0,
                            decoration: BoxDecoration(
                              color: Color(0xff141921),
                              borderRadius: BorderRadius.circular(10.0),
                            ),
                            child: IconButton(
                              icon: Icon(
                                Icons.arrow_back_ios_new,
                                size: 20,
                                color: Color(0xffaeaeae),
                              ),
                              onPressed: () {
                                Navigator.of(context).pushNamed("/home");
                              },
                            ),
                          ),
                          Container(
                            height: 40.0,
                            width: 40.0,
                            decoration: BoxDecoration(
                              color: Color(0xff141921),
                              borderRadius: BorderRadius.circular(10.0),
                            ),
                            child: IconButton(
                              icon: Icon(
                                Icons.favorite,
                                size: 20,
                                color: Color(0xffaeaeae),
                              ),
                              onPressed: () {},
                            ),
                          ),
                        ],
                      ),
                    )
                  ],
                ),
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Text(
                        "Description",
                        style: TextStyle(
                          fontSize: 20.0,
                          color: Color(0xffaeaeae),
                        ),
                      ),
                      Column(
                        children: [
                          Text(
                            widget.element["desc"],
                            style: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                          SizedBox(
                            height: 10.0,
                          ),
                        ],
                      ),
                      Text(
                        "Size",
                        style: TextStyle(
                          fontSize: 20.0,
                          color: Color(0xffaeaeae),
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: getSizeTabs(),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            children: [
                              Text(
                                "Price",
                                style: TextStyle(
                                  color: Color(0xffaeaeae),
                                ),
                              ),
                              SizedBox(
                                height: 3,
                              ),
                              Row(
                                children: [
                                  Text(
                                    "\₹\t",
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      color: Color(0xffd17842),
                                    ),
                                  ),
                                  Text(
                                    currPrice != null
                                        ? currPrice.toString()
                                        : "Select size",
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  )
                                ],
                              ),
                            ],
                          ),
                          MaterialButton(
                            height: 55,
                            minWidth: 200,
                            color: Color(0xffd17842),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20.0),
                            ),
                            child: Text(
                              "Buy Now",
                              style: TextStyle(
                                color: Colors.white,
                              ),
                            ),
                            onPressed: () async {
                              if (currPrice != null) {
                                var orderData = {
                                  "name": widget.element["name"],
                                  "price": currPrice,
                                  "size": currSize,
                                  "timestamp": DateTime.now().toString(),
                                  "points": int.parse(currPrice!) * 0.1,
                                };
                                var user = Provider.of<FirebaseAuthService>(
                                        context,
                                        listen: false)
                                    .currentUser();
                                var docSnapshot = await FirebaseFirestore
                                    .instance
                                    .collection("Users")
                                    .doc(user!.email)
                                    .get();
                                final allData = docSnapshot.data();

                                http.post(Uri.parse(Constants().baseUrl + "/user/loyaltyPoints/add"),
                                    body: {
                                      "userAddress": allData!["wallet"]["publicKey"],
                                      "points": orderData["points"].toInt().toString(),
                                    });

                                // var user = Provider.of<FirebaseAuthService>(
                                //         context,
                                //         listen: false)
                                //     .currentUser();
                                await FirebaseFirestore.instance
                                    .collection("Users")
                                    .doc(user.email)
                                    .update({
                                  "orders": FieldValue.arrayUnion([orderData]),
                                  'loyaltyPoints': FieldValue.increment(
                                      orderData["points"].toInt()),
                                });
                                Fluttertoast.showToast(msg: "Order placed!");
                                Navigator.of(context).pushNamed("/home");
                              } else {
                                Fluttertoast.showToast(
                                    msg: "Please select size!");
                              }
                            },
                          )
                        ],
                      )
                    ],
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
