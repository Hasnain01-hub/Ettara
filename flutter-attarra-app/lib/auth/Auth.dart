import 'package:flutter/material.dart';

import '../constant/User.dart';
import 'Authentication.dart';

abstract class AuthService {
  Stream<UserModel> get onAuthStateChanged;
  Future signInWithGoogle(BuildContext context);
  // Future signOutUser();
}
