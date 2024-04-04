import 'package:attarra/Onboarding_screen.dart';
import 'package:attarra/auth/Authentication.dart';
import 'package:attarra/auth/Authpage.dart';
import 'package:attarra/bottom_page.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'dart:io';
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  WidgetsFlutterBinding.ensureInitialized();
  if (Platform.isIOS) {
    await Firebase.initializeApp(
        options: FirebaseOptions(
            apiKey: "AIzaSyCDGWiwao_5qyFxfoDg-kkSdED2QFJgCZw",
            appId: "1:35231514717:ios:ffdd74eaa76e6cd984cdb4",
            messagingSenderId: "Your Sender id found in Firebase",
            projectId: "attarra-e80ee"));
  } else {
    await Firebase.initializeApp();
    await FirebaseMessaging.instance.subscribeToTopic("ATTARRA");
  }
  runApp(MyApp());
  SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
    systemNavigationBarColor: Color(0xff0c0f14),
    statusBarColor: Color(0xff0c0f14),
  ));
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider<FirebaseAuthService>(create: (_) => FirebaseAuthService()),
        FutureProvider<Map<String, dynamic>?>(
          create: (context) async {
            var user = Provider.of<FirebaseAuthService>(context, listen: false)
                .currentUser();
            var userDoc = await FirebaseFirestore.instance
                .collection("Users")
                .doc(user!.email)
                .get();
            return userDoc.data();
          },
          initialData: {},
        ),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Ettarra',
        theme: ThemeData(
          primarySwatch: Colors.blue, 
        ),
        home: const AuthPage(),
        routes: {
          "/home": (context) => BottomPage(),
        },
      ),
    );
  }
}
