---
lang: en-US
title: "How to Build an Upload Service in Flutter Web with Firebase"
description: "Article(s) > How to Build an Upload Service in Flutter Web with Firebase"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - Google
  - Firebase
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - google
  - firebase
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an Upload Service in Flutter Web with Firebase"
    - property: og:description
      content: "How to Build an Upload Service in Flutter Web with Firebase"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-an-upload-service-in-flutter-web-with-firebase.html
prev: /articles/README.md
date: 2025-09-06
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757085725508/3ff2d66d-5b3b-4784-904b-de7b464de41b.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Supabase > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-supabase/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an Upload Service in Flutter Web with Firebase"
  desc="Uploading files is one of the most common requirements in modern web applications. Whether it’s profile pictures, documents, or bulk uploads, users expect a smooth and reliable experience. With Flutter Web and Firebase Storage, you can implement this..."
  url="https://freecodecamp.org/news/how-to-build-an-upload-service-in-flutter-web-with-firebase"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1757085725508/3ff2d66d-5b3b-4784-904b-de7b464de41b.png"/>

Uploading files is one of the most common requirements in modern web applications. Whether it’s profile pictures, documents, or bulk uploads, users expect a smooth and reliable experience. With Flutter Web and Firebase Storage, you can implement this functionality in a clean and scalable way.

In this article, you’ll learn how to build a reusable upload service that:

1. Uploads single and multiple files to Firebase Storage
2. Returns file download URLs
3. Uses Dependency Injection (DI) with `injectable` to keep the code modular, testable, and easy to maintain

By the end, you will have a production-ready upload service for your Flutter Web project.

---

## Why File Uploads Matter in Flutter Web

When building for the web, users often expect features like uploading a profile picture, submitting documents, or sharing media. Unlike mobile, the web environment requires handling files via browser APIs, which then need to be integrated with backend services like Firebase for persistence.

---

## Upload Flow Overview

Here’s a high-level look at how the upload process works:

1. The user selects a file or image using a browser file picker.
2. Flutter reads the file as a `Uint8List`.
3. The file is uploaded to Firebase Storage.
4. A download URL is generated and stored in Firestore (or used directly).

::: note Prerequisites

Before starting, ensure you have the following:

**1. A Flutter Web project**

```sh
flutter config --enable-web
flutter create my_web_project
cd my_web_project
```

**2. Firebase set up in your Flutter app:**

Follow [<VPIcon icon="iconfont icon-firebase"/>Add Firebase to your Flutter app (Web)](https://firebase.google.com/docs/flutter/setup?platform=web) and include the Firebase SDK snippet in <VPIcon icon="fa-brands fa-html5"/>`index.html`.

**3. Firebase Storage enabled in the Firebase Console**

Go to Build > Storage > Get Started and allow read/write access for testing. Example rules:

```json
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

Don’t use these rules in production.

**4. Required dependencies in your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`:**

```yaml title="pubspec.yaml"
dependencies:
  firebase_core: ^3.13.0
  firebase_storage: ^12.4.2
  injectable: ^2.3.2
  get_it: ^8.0.3

dev_dependencies:
  build_runner: ^2.4.13
  injectable_generator: ^2.4.1
```

Run `flutter pub get` to install.

:::

---

## How to Define the Upload Data Model and Service Interface

We begin with a data model to represent the file and a service interface to define the upload contract.

```dart
import 'dart:typed_data';

class UploadData {
  final Uint8List fileData;   // File in binary format
  final String folderName;    // Folder path in Firebase Storage
  final String fileName;      // File name

  const UploadData({
    required this.fileData,
    required this.fileName,
    required this.folderName,
  });
}
```

Next, create an abstract service that defines what the upload logic should do.

```dart
abstract class IUploadService {
  Future<String> uploadDoc({
    required UploadData file,
  });

  Future<List<String>> uploadMultipleDoc({
    required List<UploadData> files,
  });
}
```

Here’s what’s happening in this code:

- `uploadDoc`: Uploads one file and returns its download URL
- `uploadMultipleDoc`: Uploads multiple files in parallel and returns a list of URLs

![Diagram: Interface Design](https://cdn.hashnode.com/res/hashnode/image/upload/v1756777666277/35243f4a-4f0f-40b5-92b1-f1f1a5b3474e.png)

---

## How to Implement the Upload Service

Now let’s implement the upload logic with Firebase Storage.

```dart :collapsed-liens
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/foundation.dart';
import 'package:injectable/injectable.dart';
import 'i_upload_service.dart';
import 'custom_error.dart';

@LazySingleton(as: IUploadService)
class UploadService extends IUploadService {
  final FirebaseStorage firebaseStorage;

  UploadService({required this.firebaseStorage});

  @override
  Future<String> uploadDoc({required UploadData file}) async {
    try {
      var storageRef = firebaseStorage.ref('${file.folderName}/${file.fileName}');
      var uploadTask = storageRef.putData(file.fileData);
      TaskSnapshot snapshot = await uploadTask;
      return await snapshot.ref.getDownloadURL();
    } on FirebaseException catch (e) {
      throw CustomError(
        errorMsg: "Firebase upload failed: ${e.message}",
        code: e.code,
        plugin: e.plugin,
      );
    } catch (e) {
      if (kDebugMode) print("Unexpected error: $e");
      rethrow;
    }
  }

  @override
  Future<List<String>> uploadMultipleDoc({required List<UploadData> files}) async {
    return await Future.wait(
      files.map((file) => uploadDoc(file: file)),
    );
  }
}
```

This code defines a **service class** for uploading documents to Firebase Storage in a Flutter app. Let’s break it down step by step so you see exactly what’s happening:

### 1. Imports

1. `firebase_storage`: provides Firebase Storage SDK for uploading and managing files.
2. `flutter/foundation.dart`: gives access to constants like `kDebugMode` for debug logging.
3. `injectable.dart`: enables dependency injection using the injectable + getIt package.
4. `i_upload_service.dart`: defines the abstract contract/interface for the upload service.
5. `custom_error.dart`: defines a custom error class to standardize error handling.

### 2. Dependency Injection Setup

```dart
@LazySingleton(as: IUploadService)
class UploadService extends IUploadService {
```

1. `@LazySingleton(as: IUploadService)` registers `UploadService` as the implementation of `IUploadService`.
2. This means anywhere in the app where `IUploadService` is requested, getIt will provide an instance of `UploadService`.
3. It’s a singleton, so only one instance is created and reused across the app.

### 3. Constructor

```dart
final FirebaseStorage firebaseStorage;

UploadService({required this.firebaseStorage});
```

1. The class requires a `FirebaseStorage` instance, which will also be injected automatically.
2. This makes the service easier to test and replace.

### 4. Upload a Single File

```dart
@override
Future<String> uploadDoc({required UploadData file}) async {
  try {
    var storageRef = firebaseStorage.ref('${file.folderName}/${file.fileName}');
    var uploadTask = storageRef.putData(file.fileData);
    TaskSnapshot snapshot = await uploadTask;
    return await snapshot.ref.getDownloadURL();
  } on FirebaseException catch (e) {
    throw CustomError(
      errorMsg: "Firebase upload failed: ${e.message}",
      code: e.code,
      plugin: e.plugin,
    );
  } catch (e) {
    if (kDebugMode) print("Unexpected error: $e");
    rethrow;
  }
}
```

What this code does:

1. Creates a reference in Firebase Storage at the path `folderName/fileName`
2. Uploads the raw file bytes (`file.fileData`) using `putData`.
3. Waits for the upload to complete and retrieves a `TaskSnapshot`.
4. From the snapshot, gets the download URL of the uploaded file and returns it.
5. If a `FirebaseException` occurs, it wraps the error inside a custom `CustomError`.
6. Any other unexpected error is logged (only in debug mode) and rethrown.

### 5. Upload Multiple Files

```dart
@override
Future<List<String>> uploadMultipleDoc({required List<UploadData> files}) async {
  return await Future.wait(
    files.map((file) => uploadDoc(file: file)),
  );
}
```

What the code does:

1. Accepts a list of `UploadData` objects.
2. For each file, it calls `uploadDoc` (the single upload function).
3. `Future.wait` runs all uploads **in parallel**, waits for them to complete, and returns a list of download URLs.

This class is a Firebase Storage upload service. It can upload single or multiple documents. It follows dependency injection principles for testability and scalability. It uses error handling with `CustomError` to provide cleaner error messages. Multiple uploads are executed in parallel for efficiency.

![Upload Flow with Firebase Storage](https://cdn.hashnode.com/res/hashnode/image/upload/v1756776717488/16d18b9c-309c-43a3-b595-74dabe7d7b3c.png)

---

## How to Handle Errors

Instead of relying on raw `print` statements, it’s better to use a **structured error class**. A structured error class organizes all error information, like the message, code, and source, into a single object. This makes error handling consistent, reusable, and easy to manage. You can inspect, log, or display errors programmatically, which is much more maintainable than scattered prints.

```dart
import 'package:equatable/equatable.dart';

class CustomError extends Equatable {
  final String errorMsg;
  final String code;
  final String plugin;

  const CustomError({
    required this.errorMsg,
    required this.code,
    required this.plugin,
  });

  @override
  List<Object?> get props => [errorMsg, code, plugin];

  @override
  String toString() {
    return 'CustomError(errorMsg: $errorMsg, code: $code, plugin: $plugin)';
  }
}
```

Why you should use this approach:

- Ensures consistency across the project.
- Makes errors reusable anywhere in the app.
- Allows programmatic handling (for example, act differently based on the error code).
- Provides clear debugging information through `toString()`.
- Scales well as your app grows.

---

## Dependency Injection with injectable

In a typical app, you might manually create service instances like `UploadService` or `FirebaseStorage` wherever you need them. But as your app grows, manually creating and passing dependencies becomes messy, error-prone, and hard to test.

This is where **Dependency Injection** (DI) comes in. DI allows you to declare dependencies once, and let a framework handle creating and providing them wherever they’re needed. The `injectable` package in Flutter works with `getIt` to automate this process.

Instead of creating `UploadService` manually, you configure it with injectable so that your app automatically gets the correct instance when needed, following the singleton or lazy-loading patterns.

### Step 1: Annotate your service

```dart
@LazySingleton(as: IUploadService)
class UploadService implements IUploadService {
  // your upload logic here
}
```

`@LazySingleton(as: IUploadService)` tells injectable:

- **Lazy**: Only create the instance when it’s first used.
- **Singleton**: Reuse the same instance throughout the app.
- **as: IUploadService**: Expose the service via its interface, making testing and swapping implementations easier.

### Step 2: Run the generator

```sh
flutter pub run build_runner build
```

This command generates code that wiring all your injectable dependencies together, so you don’t have to manually instantiate them.

### Step 3: Create an injectable module

```dart
import 'package:firebase_storage/firebase_storage.dart';
import 'package:injectable/injectable.dart';

@module
abstract class InjectableModule {
  @lazySingleton
  FirebaseStorage get firebaseStorage => FirebaseStorage.instance;
}
```

This code is setting up dependency injection for `FirebaseStorage` using the `injectable` package. Let me break it down:

1. `@module`: The `@module` annotation tells `injectable` that this class will act as a provider of external dependencies (things you don’t create manually but get from libraries, SDKs, or APIs).<br/>In this case, `FirebaseStorage` is coming from the Firebase SDK, so you don’t construct it yourself. You just get an instance from the SDK.
2. `abstract class InjectableModule`: This is a special module class that contains dependency definitions. Since it’s abstract, it won’t be instantiated directly. Instead, `injectable` generates code to handle the injection.
3. `@lazySingleton`: This annotation tells `injectable` that the dependency should be created **only once** and reused throughout the app (singleton pattern).
    - **Lazy** means it won’t be created until it’s actually needed.
    - **Singleton** means the same instance will be reused everywhere after the first creation.
4. `FirebaseStorage get firebaseStorage => FirebaseStorage.instance;`: This line defines what dependency to provide. Here it’s saying:
    - Whenever something in the app needs a `FirebaseStorage` instance, inject `FirebaseStorage.instance`.
    - This way, you don’t manually create or pass around `FirebaseStorage` yourself – `injectable` plus `getIt` handle that automatically.

In practice, this ensures that everywhere in your app where you need `FirebaseStorage`, you can simply inject it via constructor injection (for example, in your `UploadService`) without manually instantiating it.

### Step 4: Resolve the service anywhere

```dart
final uploadService = getIt<IUploadService>();
```

::: important Why we do this

By using injectable:

1. You stop manually instantiating dependencies everywhere.
2. Your services are easier to test, because you can swap implementations via interfaces.
3. You ensure singleton patterns and lazy loading without extra boilerplate.
4. Your app becomes more maintainable, especially as it grows.

:::

::: tip In practice

Anywhere in your app where `UploadService` needs `FirebaseStorage`, you just inject it via the constructor:

```dart
class UploadService implements IUploadService {
  final FirebaseStorage _firebaseStorage;

  UploadService(this._firebaseStorage);

  // Use _firebaseStorage here
}
```

Injectable + getIt takes care of providing the correct `_firebaseStorage` instance automatically.

![Dependency Injection with getIt & injectable](https://cdn.hashnode.com/res/hashnode/image/upload/v1756776761337/7a32fc39-9147-4e78-ba82-150074cdb066.png)

:::

---

## How to Use the Upload Service

The **Upload Service** is a modular, reusable service in your app that handles uploading files to Firebase Storage. By using this service, you abstract away direct Firebase interactions, keep your code clean, and leverage dependency injection to access the service anywhere in your app.

The Upload Service provides several options:

- **Single file upload** – Upload one file at a time and get its download URL.
- **Multiple file upload** – Upload a batch of files in one go and receive a list of download URLs.
- **Error handling** – Any issues during upload (like network errors or permission problems) are caught and can be handled gracefully.

Below, we’ll go step by step through how to use these options in practice.

::: tip Example: Upload a single file.

```dart
Future<void> uploadFile(Uint8List fileData) async {
  final file = UploadData(
    fileData: fileData,
    fileName: 'example.txt',
    folderName: 'documents',
  );

  try {
    final uploadService = getIt<IUploadService>();
    final downloadUrl = await uploadService.uploadDoc(file: file);
    print('Uploaded successfully: $downloadUrl');
  } catch (e) {
    print('Upload failed: $e');
  }
}
```

This function `uploadFile` is a wrapper that prepares a file for upload and delegates the actual uploading to your `UploadService` via dependency injection. Let me break it down step by step:

```dart
Future<void> uploadFile(Uint8List fileData) async {
  final file = UploadData(
    fileData: fileData,
    fileName: 'example.txt',
    folderName: 'documents',
  );
```

1. First, it takes a file as raw bytes (`Uint8List fileData`).
2. Then it wraps this data in an `UploadData` object, giving it a `fileName` (`example.txt`) and a `folderName` (`documents`). This essentially creates metadata about the file, so your upload service knows what to call it and where to store it in Firebase Storage.

```dart
  try {
    final uploadService = getIt<IUploadService>();
    final downloadUrl = await uploadService.uploadDoc(file: file);
    print('Uploaded successfully: $downloadUrl');
  } catch (e) {
    print('Upload failed: $e');
  }
}
```

3. Next, it retrieves the `IUploadService` instance using `getIt` (your dependency injection container). Thanks to the binding you defined earlier (`UploadService` registered as `IUploadService`), `getIt` knows to give you the correct implementation.
4. It calls `uploadService.uploadDoc(file: file)` which triggers the actual upload to Firebase Storage. If successful, Firebase returns a download URL of the uploaded file.
5. The function then prints out:
    - `"Uploaded successfully: <downloadUrl>"` if the upload worked.
    - `"Upload failed: <error>"` if an error occurred (for example, no internet or Firebase permission issues).

:::

::: info In simple terms:

1. **Input**: Raw file data (bytes).
2. **Process**: Wraps it in an `UploadData` object → sends it to Firebase via `UploadService`.
3. **Output**: Prints the public download URL if upload succeeds, or prints an error message if it fails.

:::

::: tip Example: Upload multiple files.

```dart
Future<void> uploadMultiple(List<Uint8List> filesData) async {
  final uploadService = getIt<IUploadService>();

  final files = filesData.map((data) => UploadData(
    fileData: data,
    fileName: '${DateTime.now().millisecondsSinceEpoch}.txt',
    folderName: 'batch_docs',
  )).toList();

  try {
    final urls = await uploadService.uploadMultipleDoc(files: files);
    print('All files uploaded: $urls');
  } catch (e) {
    print('Batch upload failed: $e');
  }
}
```

This function handles batch uploading of multiple files to Firebase Storage using the `IUploadService`. Let’s break it down step by step:

**1. Access the upload service**

```dart
final uploadService = getIt<IUploadService>();
```

Here, `getIt` retrieves the registered `IUploadService` instance through dependency injection. This service abstracts all the logic of uploading files, so you don’t deal with Firebase APIs directly in this method.

**2. Prepare the list of files**

```dart
final files = filesData.map((data) => UploadData(
  fileData: data,
  fileName: '${DateTime.now().millisecondsSinceEpoch}.txt',
  folderName: 'batch_docs',
)).toList();
```

`filesData` is a list of raw file contents (`Uint8List`). For each file in the list, it creates an `UploadData` object.

The filename is generated dynamically using the current timestamp (`DateTime.now().millisecondsSinceEpoch`), ensuring each file has a unique name.

All files are placed in the `"batch_docs"` folder in Firebase Storage. This way, you have a structured list of files ready for uploading.

**3. Upload Multiple File Mechanism**

```dart
final urls = await uploadService.uploadMultipleDoc(files: files);
```

The `uploadService` is asked to upload all files in one go using its `uploadMultipleDoc` method. It uploads each file to Firebase Storage. Once done, it returns a list of download URLs, one for each uploaded file.

**4. Handle success or failure**

```dart
print('All files uploaded: $urls');
```

On success, it prints out the URLs of all uploaded files (so you can later use them, for example, to display or share the documents).

```dart
print('Batch upload failed: $e');
```

If something goes wrong, it catches the exception and logs the error message.

In short, this function takes multiple raw files, wraps them into `UploadData` objects, uploads them all to Firebase Storage using the service layer, and prints the resulting download URLs.

:::

---

## Best Practices

1. Validate file size before uploading to avoid oversized files.
2. Restrict file types (for example, only `image/*`) to improve security.
3. Store metadata (like user ID, timestamp) in Firestore along with the download URL.
4. Use unique paths (`uploads/userId/filename`) to prevent collisions.

---

## Conclusion

You now have a reusable and modular upload service for Flutter Web that supports single and multiple file uploads, handles errors in a structured way, and uses Dependency Injection for clean architecture.

This foundation makes it easy to extend the service further, for example by adding file deletion, upload progress tracking, or authenticated uploads.

::: info References

```component VPCard
{
  "title": "Get started with Cloud Storage on Flutter  |  Cloud Storage for Firebase",
  "desc": "Cloud Storage for Firebase lets you upload and share user generated content, such as images and video, which allows you to build rich media content into your apps. Your data is stored in a Google Cloud Storage bucket — an exabyte scale object storage solution with high availability and global redundancy. Cloud Storage for Firebase lets you securely upload these files directly from mobile devices and web browsers, handling spotty networks with ease.",
  "link": "https://firebase.google.com/docs/storage/flutter/start/",
  "logo": "https://gstatic.com/devrel-devsite/prod/vd661722dc0bf89538e3b1471bfa72ffd39d274bea13001a4422eac953971d84d/firebase/images/favicon.png",
  "background": "rgba(232,128,0,0.2)"
}
```

```component VPCard
{
  "title": "firebase_storage library - Dart API",
  "desc": "firebase_storage library API docs, for the Dart programming language.",
  "link": "https://pub.dev/documentation/firebase_storage/latest/firebase_storage//",
  "logo": "https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8",
  "background": "rgba(0,210,250,0.2)"
}
```

<SiteInfo
  name="injectable | Dart package"
  desc="Injectable is a convenient code generator for get_it. Inspired by Angular DI, Guice DI and inject.dart."
  url="https://pub.dev/packages/injectable/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-e4t06sub/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="Search results for platform:linux"
  desc="Pub is the package manager for the Dart programming language, containing reusable libraries & packages for Flutter and general Dart programs."
  url="https://pub.dev/packages?q=platform%3Alinux/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-e4t06sub/img/pub-dev-icon-cover-image.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an Upload Service in Flutter Web with Firebase",
  "desc": "Uploading files is one of the most common requirements in modern web applications. Whether it’s profile pictures, documents, or bulk uploads, users expect a smooth and reliable experience. With Flutter Web and Firebase Storage, you can implement this...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-build-an-upload-service-in-flutter-web-with-firebase.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
