---
lang: en-US
title: "Fetch Recipes"
description: "Article(s) > (12/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
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
      content: "Article(s) > (12/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
    - property: og:description
      content: "Fetch Recipes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/fetch-recipes.html
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
  url="https://freecodecamp.org/news/build-a-multilingual-social-recipe-app-with-flutter-and-strapi#heading-fetch-recipes"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743509325302/fd7d5d6c-9a48-4037-9cc2-3b35a92b6006.png"/>

In the <FontIcon icon="fas fa-folder-open"/>`lib/screens/`<FontIcon icon="fa-brands fa-dart-lang"/>`home.dart` file, add the code below:

```dart :collapsed-lines title="lib/screens/home.dart"
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../components/drawer.dart';
import '../models/recipe.dart';
import '../utils/server2.dart';
import 'detail.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late Future<List<Recipe>> _recipesFuture;
  bool _isAuthenticated = false;
  String? _username;

  @override
  void initState() {
    super.initState();
    _checkAuthentication(); // Check authentication state when initializing
  }

  Future<void> _checkAuthentication() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _isAuthenticated = prefs.containsKey('jwt'); // Check if JWT token is stored
      _username = prefs.getString('username'); // Get the logged-in user's username from shared preferences
    });
  }

  void _navigateToLogin() {
    Navigator.pushReplacementNamed(context, '/login');
  }

  // Logout method
  Future<void> _logout() async {
    await ApiService().logout();
    setState(() {
      _isAuthenticated = false;
      _username = null;
    });
    Navigator.pushReplacementNamed(context, '/login');
  }

  String truncateWithEllipsis(int cutoff, String myString) {
    return (myString.length <= cutoff) ? myString : '${myString.substring(0, cutoff)}...';
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Initialize _recipesFuture  after context is available
    _recipesFuture = ApiService().fetchRecipes(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(tr('recipe_list')),
        actions: [
          if (_isAuthenticated)
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Center(
                child: Text(tr('hello', namedArgs: {'username': _username ?? ''})),
              ),
            ),
          if (_isAuthenticated)
            IconButton(
              icon: const Icon(Icons.logout),
              onPressed: _logout,
            )
          else
            TextButton(
              onPressed: _navigateToLogin,
              child: Text(
                tr('login'),
                style: const TextStyle(color: Colors.white),
              ),
            ),
        ],
      ),
      drawer: CustomDrawer(),
      body: FutureBuilder<List<Recipe>>(
        future: _recipesFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error.toString()}'));
          } else if (snapshot.data == null || snapshot.data!.isEmpty) {
            return Center(child: Text(tr('no_recipe')));
          }

          return ListView.builder(
            itemCount: snapshot.data!.length,
            itemBuilder: (context, index) {
              Recipe recipe = snapshot.data![index];
              String fullDescription = recipe.description.isNotEmpty
                  ? recipe.description.map((d) => d.children.map((t) => t.text).join(' ')).join('\n')
                  : tr('no_description');
              String truncatedDescription = truncateWithEllipsis(100, fullDescription);

              print("Recipe Title: ${recipe.title}");
              print("Full Description: $fullDescription");

              return GestureDetector(
                onTap: () async {
                  final result = await Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => RecipeDetailPage(recipe: recipe),
                    ),
                  );

                  if (result != null && result is Map<String, int>) {
                    setState(() {
                      Recipe updatedRecipe = Recipe(
                        id: recipe.id,
                        title: recipe.title,
                        description: recipe.description,
                        ingredients: recipe.ingredients,
                        likes: result['likes']!,
                        createdAt: recipe.createdAt,
                        updatedAt: recipe.updatedAt,
                        publishedAt: recipe.publishedAt,
                        steps: recipe.steps,
                        commentCount: result['commentsCount']!,
                        comments: recipe.comments,
                        coverImageUrl: recipe.coverImageUrl,
                      );
                      snapshot.data![index] = updatedRecipe;
                    });
                  }
                },
                child: Container(
                  margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(15),
                    border: Border.all(
                      color: const Color(0xff595959),
                      width: 0.5,
                    ),
                  ),
                  child: Row(
                    children: [
                      Container(
                        height: 80,
                        width: 80,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(15),
                          image: DecorationImage(
                            image: NetworkImage(recipe.coverImageUrl),
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        flex: 3,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              recipe.title.toUpperCase(),
                              style: const TextStyle(fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(height: 5),
                            Text(
                              truncatedDescription,
                              style: const TextStyle(color: Color(0xff595959)),
                            ),
                            const SizedBox(height: 5),
                            Row(
                              children: [
                                Expanded(
                                  child: Row(
                                    children: [
                                      Text('${recipe.likes}'),
                                      const SizedBox(width: 5),
                                      const Icon(Icons.thumb_up, size: 18, color: Colors.redAccent),
                                    ],
                                  ),
                                ),
                                Expanded(
                                  child: Row(
                                    children: [
                                      Text('${recipe.commentCount}'),
                                      const SizedBox(width: 5),
                                      const Icon(Icons.comment, size: 18, color: Colors.blue),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}
```

The `HomeScreen` mainly displays a list of recipes. It checks if the user is authenticated by looking for a JWT token in shared preferences and sets the authentication state accordingly. If the user is authenticated, it shows a greeting with their username and provides a logout option in the app bar.

The `FutureBuilder` to fetch recipes from the `ApiService`. While the data is being fetched, it shows a loading indicator. Once the data is fetched, it displays the list of recipes. Each recipe card includes the title, truncated description, cover image, and the counts of likes and comments.

When a user taps on a recipe, it navigates to a detailed page for that recipe. If the detailed page updates the recipe's likes or comments, the list updates accordingly without reloading the entire screen.
