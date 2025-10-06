---
lang: en-US
title: "Authorization and Authentication"
description: "Article(s) > (10/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
category:
  - Dart
  - Flutter
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (10/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
    - property: og:description
      content: "Authorization and Authentication"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/authorization-and-authentication.html
date: 2025-04-09
isOriginal: false
author:
  - name: Kevine Nzapdi
    url : https://freecodecamp.org/news/author/gunkev/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743509325302/fd7d5d6c-9a48-4037-9cc2-3b35a92b6006.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "desc": "Hey there! In this project, you will build a multilingual social recipe application using Flutter and Strapi. Flutter is an open-source UI software development kit created by Google. It allows you to build beautiful and highly interactive user interf...",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
  desc="Hey there! In this project, you will build a multilingual social recipe application using Flutter and Strapi. Flutter is an open-source UI software development kit created by Google. It allows you to build beautiful and highly interactive user interf..."
  url="https://freecodecamp.org/news/build-a-multilingual-social-recipe-app-with-flutter-and-strapi#heading-authorization-and-authentication"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743509325302/fd7d5d6c-9a48-4037-9cc2-3b35a92b6006.png"/>

Authorization is what allows a user to access a particular resource and determines if a user can perform certain actions within the application like commenting on a recipe, liking a recipe, or requesting a recipe.

On the other hand, authentication is the process of validating and verifying a user.

There are many Authorization and Authentication methods, but in this tutorial we’ll use password-based authentication and an API Key for authorization.

---

## Registration

In the <FontIcon icon="fas fa-folder-open"/>`lib/screen/`<FontIcon icon="fa-brands fa-dart-lang"/>`signUp.dart` file, add the code below:

```dart :collapsed-lines title="lib/screen/signUp.dart"
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../utils/server2.dart';
import 'login.dart';

class RegisterScreen extends StatefulWidget {
  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool _isLoading = false;

  @override
  void dispose() {
    usernameController.dispose();
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  Future<void> _register() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
      });

      final response = await Provider.of<ApiService>(context, listen: false)
          .register(usernameController.text, emailController.text, passwordController.text);

      setState(() {
        _isLoading = false;
      });

      if (response.statusCode == 200) {
        // Navigate to the login screen after successful registration
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (_) => LoginScreen()),
        );
      } else {
        // Handle error
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: Text(tr('register_fail')),
            content: Text(tr('register_error')),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: Text(tr('ok')),
              ),
            ],
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(tr('register'))),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: usernameController,
                decoration: InputDecoration(labelText: tr('username')),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return tr('username_required');
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: emailController,
                decoration: InputDecoration(labelText: tr('email')),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return tr('email_required');
                  } else if (!RegExp(r'^[^@]+@[^@]+.[^@]+').hasMatch(value)) {
                    return tr('email_invalid');
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: passwordController,
                decoration: InputDecoration(labelText: tr('password')),
                obscureText: true,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return tr('password_required');
                  }
                  return null;
                },
              ),
              SizedBox(height: 20),
              _isLoading
                  ? CircularProgressIndicator()
                  : ElevatedButton(
                onPressed: _register,
                child: Text(tr('register')),
              ),
              TextButton(
                onPressed: () {
                  // Navigate to the login screen
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(builder: (_) => LoginScreen()),
                  );
                },
                child: Text(
                  tr("have_account"),
                  style: const TextStyle(fontSize: 16),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

This code provides a user-friendly registration interface for the recipe application. The `RegisterScreen` class is a stateful widget that manages the registration process.

The `_register` method validates the form and calls the `register` method from the `ApiService`. If the registration is successful (indicated by a 200 HTTP status code), it redirects to the login screen. If it fails, an error dialog is displayed with a message.

The code above also employs form validation to ensure that users enter valid information. The username and password fields must not be empty, and the email field must follow a proper email format.

Upon submission, the form displays a loading indicator while the app communicates with the server to register the user.

The form's state is managed using a GlobalKey, and controllers for the text fields are properly disposed of to free up resources when the widget is removed from the tree.

---

## Login

```dart :collapsed-lines
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../utils/server2.dart';
import 'signUp.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool _isLoading = false;

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
      });

      final response = await Provider.of<ApiService>(context, listen: false)
          .login(emailController.text, passwordController.text);

      setState(() {
        _isLoading = false;
      });

      if (response.statusCode == 200) {
        Navigator.pushReplacementNamed(context, '/home');
      } else {
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: Text(tr('login_failed')),
            content: Text(tr('invalid_email_password')),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: Text(tr('ok')),
              ),
            ],
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(tr('login'))),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: emailController,
                decoration: InputDecoration(labelText: tr('email')),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return tr('email_required');
                  } else if (!RegExp(r'^[^@]+@[^@]+.[^@]+').hasMatch(value)) {
                    return tr('email_invalid');
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: passwordController,
                decoration: InputDecoration(labelText: tr('password')),
                obscureText: true,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return tr('password_required');
                  }
                  return null;
                },
              ),
              SizedBox(height: 20),
              _isLoading
                  ? CircularProgressIndicator()
                  : ElevatedButton(
                      onPressed: _login,
                      child: Text(tr('login')),
                    ),
              TextButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => RegisterScreen()),
                  );
                },
                child: Text(
                  tr("dont_have_account"),
                  style: const TextStyle(fontSize: 16),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

The `LoginScreen` contains two input fields for the user's email and password, and it validates the inputs before attempting to log in. When the user submits the form, the app checks if the input is valid. If valid, it sets a loading indicator and sends a login request to the backend API.

If the login is successful, the app navigates to the home screen, whereas if the login fails, an alert dialog is displayed to inform the user of the invalid email or password. The form also uses a `GlobalKey` to manage its state and ensures that the text controllers are properly disposed of when the widget is removed from the tree.
