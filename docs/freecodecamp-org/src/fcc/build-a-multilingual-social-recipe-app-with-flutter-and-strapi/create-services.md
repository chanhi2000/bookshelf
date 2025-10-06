---
lang: en-US
title: "Create Services"
description: "Article(s) > (9/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
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
      content: "Article(s) > (9/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
    - property: og:description
      content: "Create Services"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/create-services.html
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
  url="https://freecodecamp.org/news/build-a-multilingual-social-recipe-app-with-flutter-and-strapi#heading-create-services"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743509325302/fd7d5d6c-9a48-4037-9cc2-3b35a92b6006.png"/>

Now that your environment variables are set up, you can create different services for communicating with the server. In your <FontIcon icon="fas fa-folder-open"/>`lib/utils/`<FontIcon icon="fa-brands fa-dart-lang"/>`server.dart` file, add the code below:

```dart :collapsed-lines title="lib/utils/server.dart"
import 'dart:convert';
import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:easy_localization/easy_localization.dart';
import '../models/recipe.dart';

class ApiService {
  final String baseUrl = dotenv.env['BASE_URL']!;
  final String registerEndpoint = dotenv.env['USERS_ENDPOINT_REG']!;
  final String loginEndpoint = dotenv.env['USERS_ENDPOINT']!;
  final String accessToken = dotenv.env['ACCESS_TOKEN']!;
  final String recipeEndpoint = dotenv.env['RECIPE_ENDPOINT']!;
  final String commentEndpoint = dotenv.env['COMMENT_ENDPOINT']!;
  final String requestEndpoint = dotenv.env['R_REQUEST_ENDPOINT']!;

  // Helper method to get headers with optional JWT token
  Future<Map<String, String>> _getHeaders({bool includeJwt = false}) async {
    final headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer $accessToken",
    };
    if (includeJwt) {
      final jwt = await getJwt();
      if (jwt != null) {
        headers["Authorization"] = "Bearer $jwt";
      }
    }
    return headers;
  }

  // Get JWT
  Future<String?> getJwt() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('jwt');
  }

  // Set JWT
  Future<void> setJwt(String jwt) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('jwt', jwt);
  }

  // Remove JWT
  Future<void> removeJwt() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('jwt');
  }

  // Set User Data
  Future<void> setUserData(Map<String, dynamic> data) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('userId', data['user']['id'].toString());
    await prefs.setString('username', data['user']['username']);
  }

  // Remove User Data
  Future<void> removeUserData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('userId');
    await prefs.remove('username');
  }

  // User Registration
  Future<http.Response> register(String username, String email, String password) async {
    final url = Uri.parse('$baseUrl$registerEndpoint');
    try {
      final response = await http.post(
        url,
        headers: await _getHeaders(),
        body: json.encode({
          "username": username,
          "email": email,
          "password": password,
        }),
      );
      return response;
    } catch (e) {
      log("Error registering user: $e");
      rethrow;
    }
  }

  // User Login
  Future<http.Response> login(String email, String password) async {
    final url = Uri.parse('$baseUrl$loginEndpoint');
    try {
      final response = await http.post(
        url,
        headers: await _getHeaders(),
        body: json.encode({
          "identifier": email,
          "password": password,
        }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        await setJwt(data['jwt']);
        await setUserData(data);
      }

      return response;
    } catch (e) {
      log("Error logging in user: $e");
      rethrow;
    }
  }

  // User Logout
  Future<void> logout() async {
    await removeJwt();
    await removeUserData();
  }

  // Fetch Recipes
  Future<List<Recipe>> fetchRecipes(BuildContext context) async {
    final String localeCode = context.locale.toString().replaceAll('_', '-');
    final String lang = localeCode == 'en' ? 'en' : localeCode;
    final url = Uri.parse('$baseUrl$recipeEndpoint?locale=$lang&populate=*');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonResponse = jsonDecode(response.body);
      List<dynamic> dataList = jsonResponse['data'];
      List<Recipe> recipes = [];

      for (var item in dataList) {
        try {
          recipes.add(Recipe.fromJson(item));
        } catch (e) {
          print('Failed to parse item: $e');
          print('Item data: $item');
        }
      }

      return recipes;
    } else {
      throw Exception('Failed to load recipes: HTTP ${response.statusCode}');
    }
  }

  // Fetch Comments
    Future<List<Comment>> fetchComments(int recipeId) async {
    final url = Uri.parse('$baseUrl$commentEndpoint?filters[recipe][id][\$eq]=$recipeId&populate=comment_author');
    try {
      final response = await http.get(url, headers: await _getHeaders());
      print('Response fetch status: ${response.statusCode}');
      print('Response fetch body: ${response.body}');

      if (response.statusCode == 200) {
        var jsonData = jsonDecode(response.body);
        print("Parsed JSON: $jsonData");

        if (jsonData != null && jsonData.containsKey('data')) {
          List<dynamic> data = jsonData['data'];
          return data.map<Comment>((json) {
            if (json == null || json['attributes'] == null) {
              print('json or json[\'attributes\'] is null');
              return Comment(content: 'Invalid', author: 'Invalid', createdAt: DateTime.now());
            }
            return Comment.fromJson(json);
          }).toList();
        } else {
          print('Data field is missing or null in the response');
          return [];
        }
      } else {
        print('Failed to load comments with status code: ${response.statusCode}');
        return [];
      }
    } catch (e) {
      print('Error server fetching comments: $e');
      throw Exception('Error fetching comments: $e');
    }
  }

  Future<Comment> postComment(String content, int recipeId, String authorId) async {
    final url = Uri.parse('$baseUrl$commentEndpoint?populate=comment_author');
    try {
      final response = await http.post(
        url,
        headers: await _getHeaders(),
        body: json.encode({
          "data": {
            "content": content,
            "recipe": recipeId,
            "comment_author": authorId,
          },
        }),
      );
      print('Post comment response status: ${response.statusCode}');
      print('Post comment response body: ${response.body}');

      if (response.statusCode == 200 || response.statusCode == 201) {
        var jsonData = jsonDecode(response.body);
        return Comment.fromJson(jsonData['data']);
      } else {
        throw Exception('Failed to post comment');
      }
    } catch (e) {
      log("Error posting comment: $e");
      rethrow;
    }
  }

  Future<void> updateCommentCount(int recipeId, {required bool increment}) async {
    final recipeUrl = Uri.parse('$baseUrl$recipeEndpoint/$recipeId');
    try {
      // Fetch the current recipe data
      final recipeResponse = await http.get(recipeUrl, headers: await _getHeaders());
      print('Fetch recipe response status: ${recipeResponse.statusCode}');
      print('Fetch recipe response body: ${recipeResponse.body}');

      if (recipeResponse.statusCode == 200) {
        var recipeData = jsonDecode(recipeResponse.body)['data'];
        int currentComments = recipeData['attributes']['comments'] ?? 0;
        int updatedComments = increment ? currentComments + 1 : currentComments - 1;

        // Ensure updatedComments is not negative
        if (updatedComments < 0) {
          updatedComments = 0;
        }

        // Update the recipe with the new comment count
        final updateResponse = await http.put(
          recipeUrl,
          headers: await _getHeaders(),
          body: json.encode({
            "data": {
              "comments": updatedComments,
            },
          }),
        );

        print('Update recipe response status: ${updateResponse.statusCode}');
        print('Update recipe response body: ${updateResponse.body}');

        if (updateResponse.statusCode != 200) {
          throw Exception('Failed to update comment count');
        }
      } else {
        throw Exception('Failed to fetch recipe data');
      }
    } catch (e) {
      log("Error updating comment count: $e");
      throw Exception('Error updating comment count: $e');
    }
  }

  // Like Recipe
  Future<void> likeRecipe(int recipeId) async {
    final recipeUrl = Uri.parse('$baseUrl$recipeEndpoint/$recipeId');
    try {
      // Fetch the current recipe data
      final recipeResponse = await http.get(recipeUrl, headers: await _getHeaders());
      if (recipeResponse.statusCode == 200) {
        var recipeData = jsonDecode(recipeResponse.body)['data'];
        int currentLikes = recipeData['attributes']['likes'] ?? 0;
        int updatedLikes = currentLikes + 1;

        // Update the recipe with the new likes count
        final updateResponse = await http.put(
          recipeUrl,
          headers: await _getHeaders(),
          body: json.encode({
            "data": {
              "likes": updatedLikes,
            },
          }),
        );

        if (updateResponse.statusCode != 200) {
          throw Exception('Failed to update likes count');
        }
      } else {
        throw Exception('Failed to fetch recipe data');
      }
    } catch (e) {
      log("Error liking recipe: $e");
      throw Exception('Error liking recipe: $e');
    }
  }

  // Submit Recipe Request
  Future<void> submitRecipeRequest(RecipeRequest r_request) async {
    final url = Uri.parse('$baseUrl$requestEndpoint');

    try {
      final response = await http.post(
        url,
        headers: await _getHeaders(includeJwt: true),
        body: jsonEncode({
          'data': r_request.toJson(), // Wrap the request in a 'data' object
        }),
      );
      print('Response status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      if (response.statusCode != 200 && response.statusCode != 201) {
        throw Exception('Failed to submit recipe request');
      }
    } catch (e) {
      print("Error submitting recipe request: $e");
      rethrow;
    }
  }

  // Fetch User Requested Recipes
  Future<List<RecipeRequest>> fetchUserRequestedRecipes() async {
    final url = Uri.parse('$baseUrl$requestEndpoint');
    try {
      final response = await http.get(
        url,
        headers: await _getHeaders(includeJwt: true),
      );
      print('Response status code: ${response.statusCode}');
      print('Response body: ${response.body}');

      if (response.statusCode == 200) {
        var jsonResponse = jsonDecode(response.body);
        List<dynamic> data = jsonResponse['data'];
        return data.map((json) => RecipeRequest.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load user requested recipes');
      }
    } catch (e) {
      print("Error fetching user requested recipes: $e");
      rethrow;
    }
  }
}
```

The `ApiService` class from the code above is a utility for handling various operations related to user authentication and data fetching from a backend server. This service uses HTTP requests to communicate with the Strapi server.

There are four main entities:

---

## 1. Class Variables

- `baseUrl` is the base URL.
- `registerEndpoint`, `loginEndpoint`, `recipeEndpoint`, `commentEndpoint`, `requestEndpoint` are the specific endpoints for registration, login, recipes, comments, and requests.
- `accessToken` is the token used for API authentication.

---

## 2. Helper Methods

- `_getHeaders` prepares the headers for HTTP requests and it optionally includes a JWT token if `includeJwt` is true.
- `getJwt` retrieves the JWT token from shared preferences.
- `setJwt` and `setUserData` store the JWT token and user data (ID and username) in shared preferences once the user logs in.
- `removeJwt` and `removeUserData` remove the JWT token and user data from shared preferences, respectively, and log the user out.

---

## 3. User Operations

- `register` registers a new user with the given username, email, and password. It sends a POST request to the registration endpoint with the user details.
- `login` logs in a user with the given email and password. If successful, it stores the received JWT token and user data.
- `logout` logs out the user by removing the JWT token and user data from shared preferences.

---

## 4. Data Fetching and Manipulation

- `fetchRecipes` fetches a list of recipes based on the current locale (language) from the backend. It handles parsing the JSON response into a list of `Recipe` objects.
- `fetchComments` fetches comments for a specific recipe by its ID. It populates the `comment_author` field and returns a list of `Comment` objects.
- `postComment` posts a new comment on a specific recipe. It sends the comment content, recipe ID, and author ID to the backend.
- `updateCommentCount` updates the comment count for a specific recipe. It first fetches the current count, modifies it, and then updates it on the backend.
- `likeRecipe`: Increments the like count for a specific recipe by fetching the current count, adding one, and updating the backend.
- `submitRecipeRequest` submits a new recipe request to the backend. It sends the request data wrapped in a `data` object.
- `fetchUserRequestedRecipes` fetches a list of recipes requested by a specific user from the backend.
