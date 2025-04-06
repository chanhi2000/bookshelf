---
lang: en-US
title: "Create Models (2)"
description: "Article(s) > (8/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
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
      content: "Article(s) > (8/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
    - property: og:description
      content: "Create Models (2)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/create-models-2.html
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
  url="https://freecodecamp.org/news/build-a-multilingual-social-recipe-app-with-flutter-and-strapi#heading-create-models-1"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743509325302/fd7d5d6c-9a48-4037-9cc2-3b35a92b6006.png"/>

Here you will create the different models of the app. You can create all the models in a single file or create them in individual files. In this tutorial, we’ll create all the models in a single file which is <FontIcon icon="fas fa-folder-open"/>`lib/models/`<FontIcon icon="fa-brands fa-dart-lang"/>`recipe.dart`:

```dart title="lib/moidels/recipe.dart"
import 'package:flutter_dotenv/flutter_dotenv.dart';

// models recipe_ request
class RecipeRequest {
  final int id;
  final String title;
  final List<Description> description

  RecipeRequest({
    required this.id,
    required this.title,
    required this.description,
  });

  factory RecipeRequest.fromJson(Map<String, dynamic> json) {
    var attr = json['attributes'] ?? {};
    var attributes = json['attributes'] ?? {};
    List<Description> descriptionList = (attr['description'] as List? ?? [])
        .map((desc) => Description.fromJson(desc)).toList();

    print("Parsed Recipe: ${json['id']} - Descriptions: ${descriptionList.length}");

    return RecipeRequest(
      id: json['id'] ?? 0,
      title: attr['title'] ?? 'No title',
      description: descriptionList,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'description': description.map((desc) => desc.toJson()).toList(),
      // 'id': id
    };
  }
}

// step model

class Step {
  final String type;
  final List<TextContent> children;
  final int? level;

  Step({required this.type, required this.children, this.level});

  factory Step.fromJson(Map<String, dynamic> json) {
    var childrenList = json['children'] as List? ?? [];
    List<TextContent> parsedChildren = childrenList.map((child) => TextContent.fromJson(child)).toList();
    return Step(
      type: json['type'] ?? '',
      children: parsedChildren,
      level: json['level'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'type': type,
      'children': children.map((child) => child.toJson()).toList(),
      'level': level,
    };
  }
}

// description model

class Description {
  final String type;
  final List<TextContent> children;
  final int? level;

  Description({required this.type, required this.children, this.level});

  factory Description.fromJson(Map<String, dynamic> json) {
    var childrenList = json['children'] as List? ?? [];
    List<TextContent> parsedChildren = childrenList.map((child) => TextContent.fromJson(child)).toList();
    return Description(
      type: json['type'] ?? '',
      children: parsedChildren,
      level: json['level'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'type': type,
      'children': children.map((child) => child.toJson()).toList(),
      'level': level,
    };
  }
}

class TextContent {
  final String type;
  final String text;
  final bool? bold;

  TextContent({required this.type, required this.text, this.bold});

  factory TextContent.fromJson(Map<String, dynamic> json) {
    return TextContent(
      type: json['type'] ?? '',
      text: json['text'] ?? '',
      bold: json['bold'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'type': type,
      'text': text,
      'bold': bold,
    };
  }
}

class Comment {
  final String content;
  final String author;
  final DateTime createdAt;

  Comment({
    required this.content,
    required this.author,
    required this.createdAt,
  });

  factory Comment.fromJson(Map<String, dynamic> json) {
    var attributes = json['attributes'] as Map<String, dynamic> ?? {};
    var authorData = attributes['comment_author']?['data']?['attributes'] ?? {};
    return Comment(
      content: attributes['content'] ?? 'No content',
      author: authorData['username'] ?? 'Unknown',
      createdAt: DateTime.parse(attributes['createdAt'] ?? DateTime.now().toString()),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'content': content,
      'author': author,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}

//recipe model

class Recipe {
  final int id;
  final String title;
  final List<Description> description;
  final String ingredients;
  late int likes;
  final DateTime createdAt;
  final DateTime updatedAt;
  final DateTime publishedAt;
  final List<Step> steps;
  late int commentCount;
  final List<Comment> comments;
  final String coverImageUrl;

  Recipe({
    required this.id,
    required this.title,
    required this.description,
    required this.ingredients,
    required this.likes,
    required this.createdAt,
    required this.updatedAt,
    required this.publishedAt,
    required this.steps,
    required this.commentCount,
    required this.comments,
    required this.coverImageUrl
  });

  factory Recipe.fromJson(Map<String, dynamic> json) {
    var attr = json['attributes'] as Map<String, dynamic> ?? {};

    // Parse descriptions
    List<Description> descriptionList = [];
    if (attr['description'] != null && attr['description'] is List) {
      descriptionList = (attr['description'] as List).map((desc) => Description.fromJson(desc)).toList();
    }

    // Parse steps
    List<Step> stepsList = [];
    if (attr['steps'] != null && attr['steps'] is List) {
      stepsList = (attr['steps'] as List).map((step) => Step.fromJson(step)).toList();
    }

    // Parse comments
    List<Comment> commentList = [];
    if (attr['comments'] != null && attr['comments']['data'] != null && attr['comments']['data'] is List) {
      commentList = (attr['comments']['data'] as List).map((comment) => Comment.fromJson(comment)).toList();
    }

    // var attr = json['attributes'] as Map<String, dynamic>;
    final String baseUrl = dotenv.env['BASE_URL']!;

    // Ensure image URL is correctly prefixed
    String coverImageUrl = '';
    if (attr['cover'] != null && attr['cover']['data'] != null) {
      var imageUrl = attr['cover']['data']['attributes']['url'];
      coverImageUrl = imageUrl.startsWith('http')
          ? imageUrl
          : baseUrl + imageUrl; 
    }

    return Recipe(
        id: json['id'] ?? 0,
        title: attr['title'] ?? 'No title',
        description: descriptionList,
        ingredients: attr['ingredients'] ?? 'No ingredients',
        likes: attr['likes'] ?? 0,
        createdAt: DateTime.tryParse(attr['createdAt'] ?? DateTime.now().toIso8601String()) ?? DateTime.now(),
        updatedAt: DateTime.tryParse(attr['updatedAt'] ?? DateTime.now().toIso8601String()) ?? DateTime.now(),
        publishedAt: DateTime.tryParse(attr['publishedAt'] ?? DateTime.now().toIso8601String()) ?? DateTime.now(),
        steps: stepsList,
        commentCount: commentList.length,
        comments: commentList,
        coverImageUrl: coverImageUrl
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description.map((desc) => desc.toJson()).toList(),
      'ingredients': ingredients,
      'likes': likes,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
      'publishedAt': publishedAt.toIso8601String(),
      'steps': steps.map((step) => step.toJson()).toList(),
      'commentCount': commentCount,
      'comments': comments.map((comment) => comment.toJson()).toList(),
      'cover': coverImageUrl
    };
  }
}
```

Let’s go over this code piece by piece, as it’s a lot:

---

## 1. RecipeRequest

The `RecipeRequest` class represents the class that allows a user to request a recipe. It has three properties (`id`, `title`, and a list of `Description` objects as defined in the Strapi backend) with 2 methods:

- `fromJson`: to convert JSON data into a `RecipeRequest` object, including parsing a list of descriptions.
- `toJson`: to convert a `RecipeRequest` object back to JSON.

---

## 2. Step

Represents the cooking steps in a recipe. It contains a list of `Textcontent` objects, and each Step object has a type, level, and children as it is a richtext type. It also has two methods:

- `fromJson`: to parse JSON to create a `Step` object.
- `toJson`: to convert a `Step` object back to JSON.

---

## 3. Description

This class also contains a list of `TextContent` objects (`children`). Each `Description` object also has a `type` and an optional `level` to indicate hierarchical structure. It has two methods, too:

- `fromJson`: to convert JSON into a `Description` object.
- `toJson`: to serialise a `Description` object to JSON.

---

## 4. TextContent

This class is designed to represent individual pieces of text within larger structures. Each `TextContent` object can contain a string of text (`text`), the type of text (`type`), and an optional boolean to indicate whether the text is bold (`bold`)

- `fromJson`: Parses JSON into a `TextContent` object.
- `toJson`: Converts a `TextContent` object back to JSON.

---

## 5. Comment

As the name indicates, this represents a comment written by a use. It has three properties: the comment `content`, `author`, and `createdAt`. Like others, it also includes two methods:

- `fromJson`: to extract and construct a `Comment` object from JSON, including parsing author data.
- `toJson`: to serializes a `Comment` object to JSON.

---

## 6. Recipe

Finally, there is the `Recipe` class which is the main recipe object. It contains various details about a recipe, including id, title, descriptions, ingredients, likes, timestamps, steps, comment count, comment list, and a cover image URL. We have the:

- `fromJson`: to build a `Recipe` object from JSON data. This includes parsing lists of descriptions, steps, and comments. It also adjusts the image URL to ensure it is absolute.
- `toJson`: to convert the `Recipe` object to JSON format.

As you can see, each class is designed to handle specific parts of the recipe data, with `fromJson` methods to parse JSON into Dart objects and `toJson` methods to serialize Dart objects back to JSON.
