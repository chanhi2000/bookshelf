---
lang: en-US
title: "Build App Components"
description: "Article(s) > (11/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
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
      content: "Article(s) > (11/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
    - property: og:description
      content: "Build App Components"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/build-app-components.html
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
  url="https://freecodecamp.org/news/build-a-multilingual-social-recipe-app-with-flutter-and-strapi#heading-build-app-components"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743509325302/fd7d5d6c-9a48-4037-9cc2-3b35a92b6006.png"/>

## Drawer

The Drawer is a side panel that slides in from the left (by default) and provides navigation options for the user. It’s a great way to organize your app’s sections without crowding the main screen.

In our app, the drawer will include links to the Request recipe screen, Profile, Logout, and languages for authenticated users.

In the <FontIcon icon="fas fa-folder-open"/>`lib/components/`<FontIcon icon="fa-brands fa-dart-lang"/>`drawer.dart` file, add the code below:

```dart title="lib/components/drawer.dart"
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../screens/profile.dart';
import '../screens/requestRecipe.dart';

class CustomDrawer extends StatefulWidget {
  @override
  _CustomDrawerState createState() => _CustomDrawerState();
}

class _CustomDrawerState extends State<CustomDrawer> {
  bool _isAuthenticated = false;
  String? _username;
  String? _userId;

  @override
  void initState() {
    super.initState();
    _checkAuthentication();
  }

  Future<void> _checkAuthentication() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _isAuthenticated = prefs.containsKey('jwt');
      _username = prefs.getString('username');
      _userId = prefs.getString('userId');
    });
  }

  void _navigateToLogin() {
    Navigator.pushReplacementNamed(context, '/login');
  }

  Future<void> _logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
    setState(() {
      _isAuthenticated = false;
      _username = null;
      _userId = null;
    });
    Navigator.pushReplacementNamed(context, '/login');
  }

  void _changeLanguage(Locale locale) {
    context.setLocale(locale);
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: BoxDecoration(
              color: Colors.blue,
            ),
            child: Text(
              _isAuthenticated ? tr('hello', namedArgs: {'username': _username ?? ''}) : tr('welcome'),
              style: TextStyle(
                color: Colors.white,
                fontSize: 24,
              ),
            ),
          ),
          if (_isAuthenticated)
            ListTile(
              leading: Icon(Icons.request_page),
              title:Text(tr('request_recipe')),
              onTap: () {

                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => RecipeRequestScreen()),

                );
              },
            ),
          if (_isAuthenticated)
            ListTile(
              leading: const Icon(Icons.person),
              title: Text(tr('profile')),
              onTap: () {
                if (_userId != null) {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => ProfileScreen()),
                  );
                }
              },
            ),
          if (_isAuthenticated)
            ListTile(
              leading: Icon(Icons.logout),
              title: Text(tr('logout')),
              onTap: _logout,

            )
          else
            ListTile(
              leading: Icon(Icons.login),
              title: Text(tr('login')),
              onTap: _navigateToLogin,
            ),
          Divider(),
          ListTile(
            leading: SizedBox(
              width: 24.0,
              height: 24.0,
              child: Image.asset(
                'assets/images/en-flag.jpg',
              ),
            ),
            title: Text(tr('english')),
            onTap: () {
              Navigator.pop(context);
              _changeLanguage(Locale('en'));
    },
          ),
          ListTile(
            leading: SizedBox(
              width: 24.0,
              height: 24.0,
              child: Image.asset(
                'assets/images/fr-flag.jpg',
              ),
            ),
            title: Text(tr('french')),
            onTap: () {
              Navigator.pop(context);
              _changeLanguage(Locale('fr', 'FR'));
            },
          ),
          ListTile(
            leading: SizedBox(
              width: 24.0,
              height: 24.0,
              child: Image.asset(
                'assets/images/ja-flag.jpg',
              ),
            ),
            title: Text(tr('japanese')),
            onTap: () {
              Navigator.pop(context);
              _changeLanguage(Locale('ja', 'JP'));
            },
          ),
        ],
      ),
    );
  }
}
```

The `CustomDrawer` gives users access to different parts of the app and lets them switch languages. It updates its content based on the user's login status. Logged-in users see options like “Request a Recipe,” “Profile,” and “Logout,” while guests only see a “Login” option. It personalizes the user experience by greeting logged-in users with their username.

It also includes a language switcher with flag icons for English, French, and Japanese, powered by the `easy_localization` package. This allows users to change the app’s language instantly.

On startup, the drawer checks the user's authentication status using `SharedPreferences` and adjusts the UI accordingly. Navigation is handled with `Navigator`, enabling smooth transitions to different screens based on the selected menu item.

---

## AppBar

The AppBar is the top bar of your app’s screen. It typically contains the app’s title, a back button (if needed), and sometimes actions like search, settings, or a language toggle. In our multilingual recipe app, we’ll use the `AppBar` to show the current page title and allow easy navigation through the drawer.

In the <FontIcon icon="fas fa-folder-open"/>`lib/components/`<FontIcon icon="fa-brands fa-dart-lang"/>`appBar.dart` file, add the code below:

```dart :collpased-lines title="lib/components/appBar.dart"
import 'package:flutter/material.dart';

/// A customizable AppBar for the Recipe application.
///
/// This AppBar allows for setting a title, actions, a leading widget, 
/// centering the title, background color, and elevation.
class RecipeBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final List<Widget>? actions;
  final Widget? leading;
  final bool centerTitle;
  final Color? backgroundColor;
  final double elevation;

  const RecipeBar({
    required this.title,
    this.actions,
    this.leading,
    this.centerTitle = true,
    this.backgroundColor,
    this.elevation = 4.0,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Text(title),
      actions: actions,
      leading: leading,
      centerTitle: centerTitle,
      backgroundColor: backgroundColor,
      elevation: elevation,
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
```

The AppBar uses a `StatelessWidget` since it does not manage any state that changes over time. It implements the `PreferredSizeWidget` interface, which is necessary for AppBar customization in Flutter.

The constructor of the `RecipeBar` class takes several parameters to customize the AppBar. The `title` parameter is required, while the others are optional with default values. The `actions` parameter allows adding widgets like buttons for login, language switching, or simply navigating to another screen of the app.

In the `build` method, the AppBar is constructed using the provided parameters. The `preferredSize` getter returns the preferred height of the AppBar, which is set to the standard toolbar height using `kToolbarHeight`. This class provides a flexible and reusable AppBar component for the Recipe application, enabling easy customization and consistent UI design across different screens.
