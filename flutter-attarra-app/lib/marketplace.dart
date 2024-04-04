import 'package:attarra/auth/Authentication.dart';
import 'package:attarra/display_nft.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:provider/provider.dart';

class MarketPlace extends StatefulWidget {
  const MarketPlace({super.key});

  @override
  State<MarketPlace> createState() => _MarketPlaceState();
}

class _MarketPlaceState extends State<MarketPlace> {
  late final screenHeight;
  late final screenWidth;

  Future<Map<String, dynamic>> getData(BuildContext context) async {
    var querySnapshot =
        await FirebaseFirestore.instance.collection("NFTs").get();
    final allData = querySnapshot.docs.map((doc) => doc.data()).toList();
    allData.removeLast();

    var user =
        Provider.of<FirebaseAuthService>(context, listen: false).currentUser();
    var userDoc = await FirebaseFirestore.instance
        .collection("Users")
        .doc(user!.email)
        .get();
    
    return {"nft": allData, "user": userDoc.data()};
  }

  Widget buildSingleItem(Map<String, dynamic> element) {
    return GestureDetector(
      onTap: () {
        if (element["points"] >= int.parse(element["reward_points"]))
          Navigator.of(context).push(MaterialPageRoute(
              builder: (context) => DisplayNFT(element: element)));
      },
      child: Container(
        width: screenWidth * 0.4 + 10.0,
        height: screenHeight * 0.35,
        margin: EdgeInsets.all(5.0),
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
                        image: NetworkImage(element["secure_url"]),
                        // colorFilter: element["points"] <
                        //         int.parse(element["reward_points"])
                        //     ? ColorFilter.mode(
                        //         Colors.black.withOpacity(0.7), BlendMode.darken)
                        //     : null,
                      ),
                      borderRadius: BorderRadius.circular(20.0),
                    ),
                  ),
                ),
                Text(
                  element["title"],
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    screenHeight = MediaQuery.of(context).size.height;
    screenWidth = MediaQuery.of(context).size.width;
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
                      "Unlock your",
                      style: TextStyle(
                        fontSize: 25,
                        fontWeight: FontWeight.w600,
                        color: Colors.white,
                      ),
                    ),
                    Text(
                      "Delicious Mystery!",
                      style: TextStyle(
                        fontSize: 30,
                        fontWeight: FontWeight.w600,
                        color: Colors.white,
                      ),
                    )
                  ],
                ),
              ),
              SizedBox(height: 20),
              SingleChildScrollView(
                scrollDirection: Axis.vertical,
                child: FutureBuilder<Map<String, dynamic>>(
                    future: getData(context),
                    builder: (BuildContext context,
                        AsyncSnapshot<Map<String, dynamic>> snapshot) {
                      if (!snapshot.hasData) {
                        return const CircularProgressIndicator();
                      } else {
                        List<Widget> widgets = [];
                        var nfts = snapshot.data!["nft"];
                        print(nfts);
                        nfts.forEach((element) {
                          element["points"] =
                              snapshot.data!["user"]["loyaltyPoints"];
                          widgets.add(
                            buildSingleItem(element),
                          );
                        });
                        return SingleChildScrollView(
                          scrollDirection: Axis.vertical,
                          child: GridView.count(
                            crossAxisCount: 2,
                            physics: ScrollPhysics(),
                            shrinkWrap: true,
                            children: widgets,
                          ),
                        );
                      }
                    }),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
