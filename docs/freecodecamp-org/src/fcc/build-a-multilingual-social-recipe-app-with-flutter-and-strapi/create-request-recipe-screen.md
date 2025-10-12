---
lang: en-US
title: "Create Request Recipe Screen"
description: "Article(s) > (14/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
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
      content: "Article(s) > (14/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
    - property: og:description
      content: "Create Request Recipe Screen"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/create-request-recipe-screen.html
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
  url="https://freecodecamp.org/news/build-a-multilingual-social-recipe-app-with-flutter-and-strapi#heading-create-request-recipe-screen"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743509325302/fd7d5d6c-9a48-4037-9cc2-3b35a92b6006.png"/>

In the <VPIcon icon="fas fa-folder-open"/>`lib/screens/`<VPIcon icon="fa-brands fa-dart-lang"/>`requestRecipe.dart` file, add the code below:

```dart title="lib/screens/requestRecipe.dart"
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import '../models/recipe.dart';
import '../utils/server2.dart';

class RecipeRequestScreen extends StatefulWidget {
  @override
  _RecipeRequestScreenState createState() => _RecipeRequestScreenState();
}

class _RecipeRequestScreenState extends State<RecipeRequestScreen> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  final ApiService _apiService = ApiService();

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  Future<void> _submitRequest() async {
    if (_formKey.currentState!.validate()) {
      final description = _descriptionController.text;
      final descriptionList = [
        Description(
          type: 'paragraph',
          children: [
            TextContent(
              type: 'text',
              text: description,
              bold: false
            ),
          ],
        ),
      ];
      final request = RecipeRequest(
        title: _titleController.text,
        description: descriptionList,
        id: 0,
      );
      try {
        await _apiService.submitRecipeRequest(request);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(tr('request_successful'))),
        );
        _titleController.clear();
        _descriptionController.clear();
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to submit recipe request: $e')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(tr('request_recipe')),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _titleController,
                decoration: InputDecoration(labelText: tr('recipe_title')),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a title';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _descriptionController,
                decoration: InputDecoration(labelText: tr('description')),
                maxLines: 5,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return tr('enter_description');
                  }
                  return null;
                },
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _submitRequest,
                child: Text(tr('submit_request')),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

The `RecipeRequestPage` allows authenticated users to submit a request for a new recipe. `widget` is a statefull widget managed by the `_RecipeRequestPageState` class. It uses a form with two input fields: one for the recipe title and one for the description. These input fields are controlled by `TextEditingController` instances, which manage the text entered by the user.

The `_submitRequest` method handles the form submission. It validates the form fields, constructs a `RecipeRequest` object with the entered title and description, and sends it to the server using the `ApiService`. If the submission is successful, a success message is displayed using `ScaffoldMessenger`. If there is an error, an error message is shown.

The `build` method constructs the user interface of the screen and displays the form with its inputs.
