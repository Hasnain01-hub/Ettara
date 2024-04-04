import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:http/http.dart' as http;
import '../constant/User.dart';
import 'Auth.dart';

class FirebaseAuthService implements AuthService {
  final FirebaseAuth _firebaseAuth = FirebaseAuth.instance;
  final GoogleSignIn _googleSignIn = GoogleSignIn();
  final CollectionReference users =
      FirebaseFirestore.instance.collection('Users');
  UserModel _userFromFirebase(User? user) {
    return UserModel(
      uid: user!.uid,
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoURL,
      phoneNumber: user.phoneNumber,
    );
  }

  UserModel? currentUser() {
    final User? user = _firebaseAuth.currentUser;
    if (user != null)
      return _userFromFirebase(user);
    else
      return null;
  }

  @override
  Stream<UserModel> get onAuthStateChanged {
    return _firebaseAuth.authStateChanges().map(_userFromFirebase);
  }

  Future<UserModel> signInWithGoogle(BuildContext context) async {
    final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
    final GoogleSignInAuthentication googleAuth =
        await googleUser!.authentication;
    final AuthCredential credential = GoogleAuthProvider.credential(
      accessToken: googleAuth.accessToken,
      idToken: googleAuth.idToken,
    );
    final authResult = await _firebaseAuth.signInWithCredential(credential);
    final user = authResult.user;
    final CollectionReference users =
        FirebaseFirestore.instance.collection('Users');

    String API_KEY = "44c6af6c-d881-4a31-9035-dd60b0d04e37";

    var createWallet = await http.get(
        Uri.parse("https://api.tatum.io/v3/bitcoin/wallet"),
        headers: {"x-api-key": API_KEY});

    var mnemonic = jsonDecode(createWallet.body)["mnemonic"];
    var xpub = jsonDecode(createWallet.body)["xpub"];

    var createPublicKey = await http.get(
        Uri.parse("https://api.tatum.io/v3/bitcoin/address/" + xpub + "/32"),
        headers: {"x-api-key": API_KEY});

    var publicKey = jsonDecode(createPublicKey.body)["address"];

    var createPrivateKey = await http.post(
        Uri.parse("https://api.tatum.io/v3/bitcoin/wallet/priv"),
        headers: {"x-api-key": API_KEY, "Content-Type": "application/json"},
        body: jsonEncode({"index": 32, "mnemonic": mnemonic}));

    var privateKey = jsonDecode(createPrivateKey.body)["key"];

    // add the users document if not ready
    users.doc(user!.email).get().then(
      (DocumentSnapshot documentSnapshot) async {
        if (!documentSnapshot.exists) {
          await users.doc(user.email).set({
            "name": user.displayName,
            "email": user.email,
            "phoneFromAuth": user.phoneNumber ?? null,
            "wallet": {
              "mnemonic": mnemonic,
              "xpub": xpub,
              "publicKey": publicKey,
              "privateKey": privateKey,
            },
          }).catchError((error) => print("Failed to add user: $error"));
          Navigator.pushReplacementNamed(context, "/home");
        } else {
          Navigator.pushReplacementNamed(context, "/home");
          Fluttertoast.showToast(msg: "Sign in successful!");
        }
      },
    );
    return _userFromFirebase(user);
  }

  Future signOutUser() async {
    return _firebaseAuth.signOut();
  }
}
