---
lang: en-US
title: "View Recipe"
description: "Article(s) > (13/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
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
      content: "Article(s) > (13/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
    - property: og:description
      content: "View Recipe"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/view-recipe.html
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
  url="https://freecodecamp.org/news/build-a-multilingual-social-recipe-app-with-flutter-and-strapi#heading-view-recipe"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743509325302/fd7d5d6c-9a48-4037-9cc2-3b35a92b6006.png"/>

In the <VPIcon icon="fas fa-folder-open"/>`lib/screens/`<VPIcon icon="fa-brands fa-dart-lang"/>`detail.dart` file, add the code below:

```dart title="lib/screens/detail.dart"
import 'dart:developer';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/recipe.dart';
import '../utils/server2.dart';

class RecipeDetailPage extends StatefulWidget {
  final Recipe recipe;

  const RecipeDetailPage({Key? key, required this.recipe}) : super(key: key);

  @override
  _RecipeDetailPageState createState() => _RecipeDetailPageState();
}

class _RecipeDetailPageState extends State<RecipeDetailPage> {
  final _commentController = TextEditingController();
  List<Comment> _comments = [];
  bool _isLoading = true;
  bool _isAuthenticated = false;
  String? _userId;
  int _likes = 0;
  int _commentsCount = 0;

  @override
  void initState() {
    super.initState();
    _initializePage();
  }

  Future<void> _initializePage() async {
    _checkAuthentication();
    _loadComments();
    _likes = widget.recipe.likes;
    _comments = widget.recipe.comments;
    _commentsCount = widget.recipe.commentCount;
    _commentController.addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _commentController.dispose();
    super.dispose();
  }

  Future<void> _checkAuthentication() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _isAuthenticated = prefs.containsKey('jwt');
      _userId = prefs.getString('userId');
    });
  }

  void _showError(String message) {
    final snackBar = SnackBar(content: Text(message));
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }

  Future<void> _loadComments() async {
    try {
      var comments = await ApiService().fetchComments(widget.recipe.id);
      setState(() {
        _comments = comments;
        _commentsCount = comments.length;
        _isLoading = false;
      });
    } catch (e) {
      log('Error server fetching comments: $e');
      _showError('Failed to load comments: $e');
      setState(() => _isLoading = false);
    }
  }

  Future<void> _addComment() async {
    if (_commentController.text.isNotEmpty && _userId != null) {
      try {
        Comment newComment = await ApiService().postComment(
            _commentController.text, widget.recipe.id, _userId!);

        setState(() {
          _comments.add(newComment);
          _commentsCount++;
          _commentController.clear();
        });

        await ApiService().updateCommentCount(widget.recipe.id, increment: true);
      } catch (e) {
        log("Error posting comment: $e");
        _showError('Error posting comment: $e');
      }
    }
  }

  Future<void> _likeRecipe() async {
    try {
      await ApiService().likeRecipe(widget.recipe.id);
      setState(() => _likes++);
    } catch (e) {
      log("Error liking recipe: $e");
      _showError('Error liking recipe: $e');
    }
  }

  Future<void> _logout() async {
    await ApiService().logout();
    setState(() {
      _isAuthenticated = false;
      _userId = null;
    });
    Navigator.pushReplacementNamed(context, '/login');
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        Navigator.pop(context, {
          'likes': _likes,
          'commentsCount': _commentsCount,
        });
        return true;
      },
      child: Scaffold(
        appBar: AppBar(
          title: Text(widget.recipe.title),
          actions: [
            if (_isAuthenticated)
              IconButton(
                icon: const Icon(Icons.logout),
                onPressed: _logout,
              ),
          ],
        ),
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (widget.recipe.coverImageUrl.isNotEmpty)
                  Image.network(
                    widget.recipe.coverImageUrl,
                    width: double.infinity,
                    height: 200,
                    fit: BoxFit.cover,
                  ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: Row(
                        children: [
                          Text('$_likes'),
                          const SizedBox(width: 5),
                          IconButton(
                            icon: const Icon(Icons.thumb_up, size: 18, color: Colors.redAccent),
                            onPressed: _likeRecipe,
                          ),
                        ],
                      ),
                    ),
                    Expanded(
                      child: Row(
                        children: [
                          Text('$_commentsCount'),
                          const SizedBox(width: 5),
                          const Icon(Icons.comment, size: 18, color: Colors.blue),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                ...widget.recipe.description.map((desc) =>
                    Text(desc.children.map((child) => child.text).join())),
                const SizedBox(height: 20),
                const Text('Ingredients', style: TextStyle(fontWeight: FontWeight.bold)),
                const SizedBox(height: 20),
                Text(widget.recipe.ingredients),
                const SizedBox(height: 20),
                const Text('Procedure', style: TextStyle(fontWeight: FontWeight.bold)),
                const SizedBox(height: 20),
                ...widget.recipe.steps.map((step) =>
                    Text(step.children.map((child) => child.text).join())),
                if (_isLoading)
                  const CircularProgressIndicator(),
                ..._comments.map((comment) => ListTile(
                  title: Text(comment.author),
                  subtitle: Text(comment.content),
                  trailing: Text(comment.createdAt.toLocal().toString()),
                )),
                if (_isAuthenticated)
                  Column(
                    children: [
                      TextField(
                        controller: _commentController,
                        decoration: InputDecoration(labelText: tr('add_comment')),
                      ),
                      ElevatedButton(
                        onPressed: _commentController.text.isNotEmpty ? _addComment : null,
                        child: Text(tr('submit')),
                      ),
                    ],
                  )
                else
                  Text(tr('login_comment')),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
```

This `RecipeDetailPage` displays detailed information about a selected recipe, including its cover image, likes, comments, ingredients, and procedure. Only authenticated users can comment or like a recipe. During initialization, the page checks if the user is authenticated by reading from local storage. If authenticated, it sets `_isAuthenticated` to `true` and retrieves the user's ID, enabling features like adding comments and liking recipes.

- **Adding a comment**: The `_addComment` function posts the new comment to the server, adds it to the local comments list, increments the comment count, and clears the input field.
- **Liking a recipe**: The `_likeRecipe` function sends a like request to the server, increases the local like count, and updates the UI.

If the user is not authenticated, they are prompted to log in to leave a comment or interact with the recipe.
