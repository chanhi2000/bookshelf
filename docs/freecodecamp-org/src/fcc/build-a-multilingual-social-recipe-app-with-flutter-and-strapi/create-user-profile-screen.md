---
lang: en-US
title: "Create User Profile Screen"
description: "Article(s) > (15/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
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
      content: "Article(s) > (15/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
    - property: og:description
      content: "Create User Profile Screen"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/create-user-profile-screen.html
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
  url="https://freecodecamp.org/news/build-a-multilingual-social-recipe-app-with-flutter-and-strapi#heading-create-user-profile-screen"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743509325302/fd7d5d6c-9a48-4037-9cc2-3b35a92b6006.png"/>

In the <VPIcon icon="fas fa-folder-open"/>`lib/screens/`<VPIcon icon="fa-brands fa-dart-lang"/>`profile.dart` file, add the code below:

```dart title="lib/screens/profile.dart"
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_recipe_app/screens/requestRecipe.dart';
import '../models/recipe.dart';
import '../utils/server2.dart';

class ProfileScreen extends StatefulWidget {
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  late Future<List<RecipeRequest>> _requestedRecipesFuture;

  @override
  void initState() {
    super.initState();
    _requestedRecipesFuture = ApiService().fetchUserRequestedRecipes();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(tr('profile')),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(height: 10),
                Text(
                  tr('request_list'),
                  style: TextStyle(fontSize: 16, color: Colors.grey[600]),
                ),
                SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () {
                    Navigator.pop(context);
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => RecipeRequestScreen(),
                      ),
                    );
                  },
                  child: Text(tr('request_new_recipe')),
                ),
              ],
            ),
          ),
          Expanded(
            child: FutureBuilder<List<RecipeRequest>>(
              future: _requestedRecipesFuture,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  return Center(child: Text('Error: ${snapshot.error.toString()}'));
                } else if (snapshot.data == null || snapshot.data!.isEmpty) {
                  return Center(child: Text(tr('no_request_found')));
                }

                return ListView.builder(
                  itemCount: snapshot.data!.length,
                  itemBuilder: (context, index) {
                    RecipeRequest request = snapshot.data![index];
                    String fullDescription = request.description
                        .map((d) => d.children.map((t) => t.text).join('\n'))
                        .join('\n\n');

                    return Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 40.0),
                      child: ListTile(
                        title: Text(
                          request.title.toUpperCase(),
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        subtitle: Text(fullDescription),
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
```

The `ProfileScreen` class in this Flutter application represents a user's profile page where they can view their requested recipes. When the screen is initialized, it fetches a list of recipes requested by the user by calling the `fetchUserRequestedRecipes` method from the `ApiService`. This data is then stored in the `_requestedRecipesFuture` variable, which is a `Future` that will eventually hold the list of requested recipes.

In the `build` method, the screen is constructed using a `Scaffold` widget.

The main part of the screen is an `Expanded` widget containing a `FutureBuilder`. The `FutureBuilder` widget waits for the `_requestedRecipesFuture` to complete and then builds the list of requested recipes. If the data is still loading, it shows a `CircularProgressIndicator`. If there's an error, it displays an error message. And if there are no recipes, it shows a "no request found" message. Otherwise, it displays the list of requested recipes, each rendered as a `ListTile` with the recipe title and description.