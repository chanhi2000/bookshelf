---
lang: en-US
title: "Project Structure"
description: "Article(s) > (3/7) How to Build an AI-Powered Cooking Assistant with Flutter and Gemini"
category:
  - Dart
  - Flutter
  - AI
  - LLM
  - Google
  - Google Gemini
tag:
  - blog
  - freecodecamp.org
  - dart
  - dartlang
  - flutter
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - google
  - google-gemini
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (3/7) How to Build an AI-Powered Cooking Assistant with Flutter and Gemini"
    - property: og:description
      content: "Project Structure"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini/project-structure.html
date: 2025-05-30
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1748533427117/1c8c2384-c6a3-4ad8-ab40-1eee65b2c914.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Build an AI-Powered Cooking Assistant with Flutter and Gemini",
  "desc": "After soaking in everything shared at GoogleIO, I can’t lie - I feel supercharged! From What’s New in Flutter to Building Agentic Apps with Flutter and Firebase AI Logic, and the deep dive into How Flutter Makes the Most of Your Platforms, it felt li...",
  "link": "/freecodecamp.org/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an AI-Powered Cooking Assistant with Flutter and Gemini"
  desc="After soaking in everything shared at GoogleIO, I can’t lie - I feel supercharged! From What’s New in Flutter to Building Agentic Apps with Flutter and Firebase AI Logic, and the deep dive into How Flutter Makes the Most of Your Platforms, it felt li..."
  url="https://freecodecamp.org/news/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini#heading-project-structure"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1748533427117/1c8c2384-c6a3-4ad8-ab40-1eee65b2c914.png"/>

We'll organize our project into three main folders (with various subfolders) to maintain a clean and scalable architecture:

- `core`: Contains core functionalities, utilities, and shared components.
- `infrastructure`: Manages external services, data handling, and business logic.
- `presentation`: Houses the UI layer, including screens, widgets, and components.
- <VPIcon icon="fa-brands fa-dart-lange"/>`main.dart`: The entry point of our Flutter application.

Let's dive into the details of each folder.

---

## 1. The <VPIcon icon="fas fa-folder-open"/>`core` Folder

The <VPIcon icon="fas fa-folder-open"/>`core` folder will contain <VPIcon icon="fas fa-folder-open"/>`extensions`, <VPIcon icon="fas fa-folder-open"/>`constants`, and <VPIcon icon="fas fa-folder-open"/>`shared` utilities.

### The <VPIcon icon="fas fa-folder-open"/>`extensions` Folder

This directory will hold extension methods that add new functionalities to existing classes.

```dart title="format_to_mb.dart"
extension ByTeToMegaByte on int {
  int formatToMegaByte() {
    int bytes = this;
    return (bytes / (1024 * 1024)).ceil();
  }
}
```

This extension on the int type (integers) provides a convenient method `formatToMegaByte()`. When called on an integer representing bytes, it converts that byte value into megabytes. The division by $1024\times{1024}$ converts bytes to megabytes, and `.ceil()` rounds the result up to the nearest whole number. This is useful for displaying file sizes in a more human-readable format.

```dart title="loading.dart"
import 'package:flutter/material.dart';
import 'package:loader_overlay/loader_overlay.dart';

extension LoaderOverlayExtension on BuildContext {
  void showLoader() {
    loaderOverlay.show();
  }

  void hideLoader() {
    loaderOverlay.hide();
  }
}
```

This extension on `BuildContext` simplifies the process of showing and hiding a global loading overlay in your Flutter application. It leverages the `loader_overlay` package.

- `showLoader()`: Calls `loaderOverlay.show()` to display the loading indicator.
- `hideLoader()`: Calls `loaderOverlay.hide()` to dismiss the loading indicator. These extensions make it easy to control the loader from any widget that has access to a `BuildContext`.

```dart title="to_file.dart"
import 'dart:io';

import 'package:image_picker/image_picker.dart';

extension ToFile on Future<XFile?> {
  Future<File?> toFile() => then((xFile) => xFile?.path).then(
        (filePath) => filePath != null ? File(filePath) : null,
      );
}
```

This extension is designed to convert an XFile object (typically obtained from the image_picker package) into a dart:io File object.

- It operates on a `Future<XFile?>`, meaning it expects a future that might resolve to an `XFile` or `null`.
- `then((xFile) => xFile?.path)`: If `xFile` is not null, it extracts the file's path. Otherwise, it passes `null`.
- `then((filePath) => filePath != null ? File(filePath) : null)`: If a `filePath` is available, it creates a `File` object from it. Otherwise, it returns `null`. This is a concise way to handle the asynchronous conversion of a picked image or video `XFile` into a `File` object that can be used for further operations like displaying or uploading.

```dart title="to_file2.dart"
import 'dart:io';
import 'package:image_picker/image_picker.dart';
import 'package:path_provider/path_provider.dart';

extension XFileExtension on XFile {
  Future<File> toFile() async {
    final bytes = await readAsBytes();
    final tempDir = await getTemporaryDirectory();
    final tempFile = File('${tempDir.path}/${this.name}');
    await tempFile.writeAsBytes(bytes);
    return tempFile;
  }
}
```

This extension on XFile provides a more robust way to convert an XFile to a dart:io file. This is particularly useful when you need to write the XFile's content to a temporary location.

- `await readAsBytes()`: Reads the content of the `XFile` as a list of bytes.
- `final tempDir = await getTemporaryDirectory()`: Gets the path to the temporary directory on the device using `path_provider`.
- `final tempFile = File('${tempDir.path}/${this.name}')`: Creates a new `File` object in the temporary directory with the original name of the `XFile`.
- `await tempFile.writeAsBytes(bytes)`: Writes the bytes read from the `XFile` into the newly created temporary file.
- `return tempFile`: Returns the newly created `File` object. This is particularly useful when you're working with `XFile`s that might not have a readily accessible file path on the device, or if you need to ensure the file is persistently available for further processing, such as cropping.

### The <VPIcon icon="fas fa-folder-open"/>`constants` Folder

This directory will hold static values and enumerations used throughout the app.

```dart title="enums/record_source.dart"
enum RecordSource { camera, gallery }
```

This is a simple enumeration (enum) named `RecordSource`. It defines two possible values: `camera` and `gallery`. This enum is used to represent the source from which an image or video is picked, providing a clear and type-safe way to differentiate between capturing from the camera and selecting from the device's gallery.

```dart title="enums/status.dart"
enum Status { success, error }
```

This is another straightforward enumeration named `Status`. It defines `success` and `error` as its possible values. This enum is commonly used to indicate the outcome of an operation or a process, providing a standardized way to convey status information, for example, for toast messages.

```dart title+"app_strings.dart"
// ignore_for_file: constant_identifier_names

class AppStrings {
  static const String AI_MODEL = 'gemini-2.0-flash';

  static const String APP_SUBTITLE =  "Capture a photo or use your voice to get step-by-step guidance on how to prepare your favorite dishes or snacks";
  static const String APP_TITLE = "Your Personal AI Recipe Guide";

  static const String AI_TEXT_PART = "You are a recipe ai expert. Generate a recipe based on this image, include recipe name, preparation steps, and a public YouTube video demonstrating the preparation step. Output the YouTube video URL on a new line prefixed with 'YouTube Video URL: ', it should be a https URL and the image URL on a new line prefixed with 'Image URL: ' and it should be a https URL too."
      "If the image is not a food, snacks or drink, politely inform the user that you can only answer recipe queries and ask them to close and upload a food/snack/drink image.";

  static const String AI_AUDIO_PART =
  "You are a recipe ai expert. Generate a recipe based on this text, include recipe name, preparation steps. I'd also love for you to show me any valid image online relating to this food/drink/snack and a public YouTube video demonstrating the preparation step.If the text doesn't contain things related to a food, snacks or drink, politely inform the user that you can only answer recipe queries and ask them to close and upload a food/snack/drink image. Output the YouTube video URL on a new line prefixed with 'YouTube Video URL: ', it should be a https URL and the image URL on a new line prefixed with 'Image URL: ' and it should be a https URL too, The text is: ";

}
```

This class `AppStrings` centralizes all the static string constants used throughout the application. This approach helps in managing strings effectively, making them easily modifiable and preventing typos.

- `AI_MODEL`: Specifies the Gemini model to be used, in this case, `gemini-2.0-flash`.
- `APP_SUBTITLE` and `APP_TITLE`: Define the main titles and subtitles for the app's UI.
- `AI_TEXT_PART`: This is a crucial string that serves as the prompt for the Gemini model **when an image is provided**. It instructs the AI to act as a recipe expert, generate a recipe including the name and steps, and provide a YouTube video. It also includes a fallback message if the image isn't food-related.
- `AI_AUDIO_PART`: Similar to `AI_TEXT_PART`, but this prompt is used when **audio input is provided**. It also instructs the AI to generate a recipe, include a relevant online image, and a YouTube video, with specific formatting requirements for the URLs. This prompt will be concatenated with the transcribed text from the user's voice input.

```dart title+"app_color.dart"
import 'package:flutter/material.dart';

class AppColors {
  static const primaryColor = Color(0xFF7E57C2);
  static const litePrimary = Color(0xFFEDE7F6);
  static Color errorColor = const Color(0xFFEA5757);
  static const Color grey =
  Color.fromARGB(255, 170, 170, 170);

  static const Color lighterGrey =
  Color.fromARGB(255, 204, 204, 204);
}
```

The `AppColors` class centralizes all the custom color definitions used in the application. This makes it easy to maintain a consistent color scheme throughout the UI and allows for quick global changes to the app's theme. Each static constant represents a specific color with its hexadecimal value or RGB value.

### The <VPIcon icon="fas fa-folder-open"/>`shared` Folder

This directory will contain shared utility classes.

```dart :collapsed-lines title+"image_picker_helper.dart"
import 'dart:developer';
import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/foundation.dart' show immutable;
import 'package:image_picker/image_picker.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:snap2chef/core/extensions/to_file.dart';
import 'package:snap2chef/core/extensions/to_file2.dart';
import '../../presentation/components/toast_info.dart';
import '../constants/enums/status.dart';

@immutable
class ImagePickerHelper {
  static final ImagePicker _imagePicker = ImagePicker();

  static Future<PickedFileWithInfo?> pickImageFromGallery2() async {
    final isGranted = await Permission.photos.isGranted;
    if (!isGranted) {
      await Permission.photos.request();
      toastInfo(
          msg: "You didn't allow access", status: Status.error);
    }
    final pickedFile =
    await _imagePicker.pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      final file = await pickedFile.toFile();
      log(pickedFile.name.split(".").join(","));
      return PickedFileWithInfo(file: file, fileName: pickedFile.name);
    } else {
      return null;
    }
  }

  static Future<FilePickerResult?> pickFileFromGallery() =>
      FilePicker.platform.pickFiles(
          type: FileType.custom,
          allowedExtensions: ["pdf", "doc", "docx", "png", "jpg", "jpeg"]);

  static Future<File?> pickImageFromGallery() =>
      _imagePicker.pickImage(source: ImageSource.gallery).toFile();

  static Future<File?> takePictureFromCamera() =>
      _imagePicker.pickImage(source: ImageSource.camera).toFile();

  static Future<File?> pickVideoFromGallery() =>
      _imagePicker.pickVideo(source: ImageSource.gallery).toFile();

  static Future<FilePickerResult?> pickSinglePDFFileFromGallery() =>
      FilePicker.platform
          .pickFiles(type: FileType.custom, allowedExtensions: ["pdf"]);
}

class PickedFileWithInfo {
  final File file;
  final String fileName;

  PickedFileWithInfo({required this.file, required this.fileName});
}

PlatformFile? file;
```

The `ImagePickerHelper` class provides static methods for picking various types of files (images, videos, documents) from the device's gallery or camera, with integrated permission handling.

- `_imagePicker`: An instance of `ImagePicker` for interacting with the device's image and video picking functionalities.
- `pickImageFromGallery2()`:
  - **Permission handling**: Checks if photo gallery permission is granted using `permission_handler`. If not, it requests the permission and displays a toast message if denied.
  - **Image picking**: Uses `_imagePicker.pickImage(source: ImageSource.gallery)` to let the user select an image from the gallery.
  - **Conversion**: If an image is picked, it converts the `XFile` to a `File` object using the `toFile()` extension.
  - **Logging**: Logs the file name for debugging.
  - **Return value**: Returns a `PickedFileWithInfo` object containing the `File` and `fileName`.
- `pickFileFromGallery()`: Uses `file_picker` to allow picking various file types (PDF, Doc, Docx, PNG, JPG, JPEG) from the gallery.
- `pickImageFromGallery()`: A simpler method to pick an image from the gallery, directly returning a `Future<File?>` using the `toFile()` extension.
- `takePictureFromCamera()`: Captures an image using the device's camera and returns a `Future<File?>`.
- `pickVideoFromGallery()`: Picks a video from the gallery and returns a `Future<File?>`.
- `pickSinglePDFFileFromGallery()`: Specifically picks a single PDF file from the gallery.
- `PickedFileWithInfo` class: A simple data class to hold both the `File` object and its `fileName`.

This helper class centralizes all file picking logic, making it reusable and easier to manage permissions and different picking scenarios.

---

## 2. The <VPIcon icon="fas fa-folder-open"/>`infrastructure` Folder

This folder handles the logic for interacting with external services and processing data.

```dart :collapsed-lines title="image_upload_controller.dart
import 'dart:async';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:iconsax/iconsax.dart';
import 'package:image_cropper/image_cropper.dart';

import '../core/constants/app_colors.dart';
import '../core/constants/enums/record_source.dart';
import '../core/shared/image_picker_helper.dart';
import '../presentation/widgets/image_picker_component.dart';

class ImageUploadController {
  /// crop image
  static Future<void> _cropImage(
      File? selectedFile,
      Function assignCroppedImage,
      ) async {
    if (selectedFile != null) {
      final croppedFile = await ImageCropper().cropImage(
        sourcePath: selectedFile.path,
        compressFormat: ImageCompressFormat.jpg,
        compressQuality: 100,
        uiSettings: [
          AndroidUiSettings(
            toolbarTitle: 'Crop Image',
            toolbarColor: AppColors.primaryColor,
            toolbarWidgetColor: Colors.white,
            initAspectRatio: CropAspectRatioPreset.square,
            lockAspectRatio: false,
            statusBarColor: AppColors.primaryColor,
            activeControlsWidgetColor: AppColors.primaryColor,
            aspectRatioPresets: [
              CropAspectRatioPreset.original,
              CropAspectRatioPreset.square,
              CropAspectRatioPreset.ratio4x3,
              CropAspectRatioPresetCustom(),
            ],
          ),
          IOSUiSettings(
            title: 'Crop Image',
            aspectRatioPresets: [
              CropAspectRatioPreset.original,
              CropAspectRatioPreset.square,
              CropAspectRatioPreset.ratio4x3,
              CropAspectRatioPresetCustom(),
            ],
          ),
        ],
      );
      assignCroppedImage(croppedFile);
    }
  }

  // /// pick image from camera and gallery
  static void imagePicker(
      RecordSource recordSource,
      Completer? completer,
      BuildContext context,
      Function setFile,
      Function assignCroppedImage,
      ) async {
    if (recordSource == RecordSource.gallery) {
      final pickedFile = await ImagePickerHelper.pickImageFromGallery();
      if (pickedFile == null) {
        return;
      }
      completer?.complete(pickedFile.path);
      if (!context.mounted) {
        return;
      }
      setFile(pickedFile);

      if (context.mounted) {
        Navigator.of(context).pop();
      }
    } else if (recordSource == RecordSource.camera) {
      final pickedFile = await ImagePickerHelper.takePictureFromCamera();
      if (pickedFile == null) {
        return;
      }

      completer?.complete(pickedFile.path);
      if (!context.mounted) {
        return;
      }
      setFile(pickedFile);
      // crop image
      _cropImage(pickedFile, assignCroppedImage);

      if (context.mounted) {
        Navigator.of(context).pop();
      }
    }
  }

  /// modal for selecting file source
  static Future showFilePickerButtonSheet(BuildContext context, Completer? completer,
      Function setFile,
      Function assignCroppedImage,) {
    return showModalBottomSheet(
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(35),
          topRight: Radius.circular(35),
        ),
      ),
      context: context,
      builder: (context) {
        return SingleChildScrollView(
          child: Container(
            padding: const EdgeInsets.fromLTRB(10, 14, 15, 20),
            child: Column(
              children: [
                Container(
                  height: 4,
                  width: 50,
                  padding: const EdgeInsets.only(top: 5),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(7),
                    color: const Color(0xffE4E4E4),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      GestureDetector(
                        onTap: () => Navigator.of(context).pop(),
                        child: const Align(
                          alignment: Alignment.topRight,
                          child: Icon(Icons.close, color: Colors.grey),
                        ),
                      ),
                      const Gap(10),
                      const Text(
                        'Select Image Source',
                        style: TextStyle(
                          color: AppColors.primaryColor,
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const Gap(20),
                      ImagePickerTile(
                        title: 'Capture from Camera',
                        subtitle: 'Take a live snapshot',
                        icon: Iconsax.camera,
                        recordSource: RecordSource.camera,
                        completer: completer,
                        context: context,
                        setFile: setFile,
                        assignCroppedImage: assignCroppedImage,
                      ),
                      const Divider(color: Color(0xffE4E4E4)),
                      ImagePickerTile(
                        title: 'Upload from Gallery',
                        subtitle: 'Select image from gallery',
                        icon: Iconsax.gallery,
                        recordSource: RecordSource.gallery,
                        completer: completer,
                        context: context,
                        setFile: setFile,
                        assignCroppedImage: assignCroppedImage,
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
  }
}

class CropAspectRatioPresetCustom implements CropAspectRatioPresetData {
  @override
  (int, int)? get data => (2, 3);

  @override
  String get name => '2x3 (customized)';
}
```

The `ImageUploadController` class manages the process of picking and optionally cropping images before they are used in the application.

### `_cropImage(File? selectedFile, Function assignCroppedImage)`

- This **private static method** handles the image cropping functionality using the `image_cropper` package.
- It takes a `selectedFile` (the image to be cropped) and a `Function assignCroppedImage` (a callback to update the UI with the cropped image).
- `ImageCropper().cropImage(...)` opens the cropping UI. It's configured with various UI settings for both Android and iOS, including `toolbarColor`, `aspectRatioPresets`, and more, to ensure a consistent and branded experience.
- `CropAspectRatioPresetCustom()`: This is a custom class that implements `CropAspectRatioPresetData` to define a specific cropping aspect ratio (2x3 in this case), providing more flexibility than the built-in presets.
- Once cropped, the `croppedFile` is passed to the `assignCroppedImage` callback.

### `imagePicker(RecordSource recordSource, Completer? completer, BuildContext context, Function setFile, Function assignCroppedImage)`

- This **static method** is the core logic for initiating image picking from either the camera or gallery.
- It takes a `recordSource` (from the `RecordSource` enum), an optional `completer` (likely for handling asynchronous operations outside the UI), the current `context`, `setFile` (a callback to set the picked file in the UI), and `assignCroppedImage` (the callback for cropped images).
- **Gallery Selection (**`RecordSource.gallery`):
  - It calls `ImagePickerHelper.pickImageFromGallery()` to get the selected image.
  - If a file is picked, it completes the `completer`, calls `setFile` to update the UI, and then pops the bottom sheet.
- **Camera Capture (**`RecordSource.camera`):
  - It calls `ImagePickerHelper.takePictureFromCamera()` to capture an image.
  - Similar to gallery selection, it completes the `completer`, calls `setFile`, and then importantly, it calls `_cropImage` to allow the user to crop the newly captured image before it's fully used.
  - Finally, it pops the bottom sheet.
- `context.mounted` checks are included to ensure that UI updates only happen if the widget is still in the widget tree, preventing errors.

### `showFilePickerButtonSheet(...)`

- This **static method** displays a modal bottom sheet, providing the user with options to select an image source (Camera or Gallery).
- It uses `showModalBottomSheet` to present a nicely styled sheet with rounded corners.
- Inside the sheet, it displays a draggable indicator and two `ImagePickerTile` widgets (presumably a custom widget for displaying each option) for "Capture from Camera" and "Upload from Gallery."
- When an `ImagePickerTile` is tapped, it internally calls the `imagePicker` method with the corresponding `RecordSource`.

In summary, `ImageUploadController` acts as a central orchestrator for image acquisition, offering options to pick from the gallery or camera, and integrating robust image cropping capabilities - all while ensuring a smooth user experience through UI callbacks and modal interactions.

```dart :collapsed-lines title="recipe_controller.dart"
import 'dart:io';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:gap/gap.dart';
import 'package:google_generative_ai/google_generative_ai.dart';
import 'package:snap2chef/core/extensions/loading.dart';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';
import '../core/constants/app_colors.dart';
import '../core/constants/app_strings.dart';
import '../core/constants/enums/status.dart';
import '../presentation/components/toast_info.dart';

class RecipeController {
  // send image to gemini
  static Future<void> _sendImageToGemini(
      File? selectedFile,
      GenerativeModel model,
      BuildContext context,
      Function removeFile,
      Function removeText,
      ) async {
    toastInfo(msg: "Obtaining recipe and preparations", status: Status.success);

    if (selectedFile == null) return;

    final bytes = await selectedFile.readAsBytes();

    final prompt = TextPart(AppStrings.AI_TEXT_PART);
    final image = DataPart('image/jpeg', bytes);

    final response = await model.generateContent([
      Content.multi([prompt, image]),
    ]);

    if (context.mounted) {
      _displayRecipe(
        response.text,
        context,
        selectedFile,
        removeFile,
        removeText,
      );
    }
  }

  // send audio text prompt
  static Future<void> _sendAudioTextPrompt(
      GenerativeModel model,
      BuildContext context,
      String transcribedText,
      File? selectedFile,
      Function removeFile,
      Function removeText,
      ) async {
    toastInfo(msg: "Obtaining recipe and preparations", status: Status.success);

    final prompt = '${AppStrings.AI_AUDIO_PART} ${transcribedText.trim()}.';
    final content = [Content.text(prompt)];
    final response = await model.generateContent(content);

    if (context.mounted) {
      _displayRecipe(
        response.text,
        context,
        selectedFile,
        removeFile,
        removeText,
      );
    }
  }

  static void _displayRecipe(
      String? recipeText,
      BuildContext context,
      File? selectedFile,
      Function removeFile,
      Function removeText,
      ) {
    if (recipeText == null || recipeText.isEmpty) {
      recipeText = "No recipe could be generated or parsed from the response.";
    }
    String workingRecipeText = recipeText;

    String? videoId;
    String? extractedImageUrl;

    final youtubeLineRegex = RegExp(r'YouTube Video URL:\s*(https?:\/\/\S+)', caseSensitive: false);
    final youtubeMatch = youtubeLineRegex.firstMatch(recipeText);
    if (youtubeMatch != null) {
      final youtubeUrl = youtubeMatch.group(1);
      final ytIdRegex = RegExp(r'v=([\w-]{11})');
      final ytIdMatch = ytIdRegex.firstMatch(youtubeUrl ?? '');
      if (ytIdMatch != null) {
        videoId = ytIdMatch.group(1);
      }
      workingRecipeText = workingRecipeText.replaceAll(youtubeMatch.group(0)!, '').trim();
    }

    final imageLine = RegExp(r'Image URL:\s*(https?:\/\/\S+.(?:png|jpe?g|gif|webp|bmp|svg))');
    final imageMatch = imageLine.firstMatch(recipeText);
    if (imageMatch != null) {
      extractedImageUrl = imageMatch.group(1);
      workingRecipeText = workingRecipeText.replaceAll(imageMatch.group(0)!, '').trim();
    }

    print("Extracted Image URL: $extractedImageUrl");
    print("Extracted Video ID: $videoId");

    String? cleanedRecipeText = workingRecipeText;

    showDialog(
      barrierDismissible: false,
      context: context,
      builder: (BuildContext dialogContext) {
        YoutubePlayerController? ytController;

        if (videoId != null) {
          ytController = YoutubePlayerController(
            initialVideoId: videoId,
            flags: const YoutubePlayerFlags(
              autoPlay: false,
              mute: false,
              disableDragSeek: false,
              loop: false,
              isLive: false,
              forceHD: false,
              enableCaption: true,
            ),
          );
        }

        return AlertDialog(
          title: const Text('Generated Recipe'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                selectedFile != null
                    ? Container(
                  height: 150,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(7),
                    border: Border.all(color: AppColors.primaryColor),
                    image: DecorationImage(
                      image: FileImage(File(selectedFile.path)),
                      fit: BoxFit.cover,
                    ),
                  ),
                )
                    :  extractedImageUrl != null
                    ? ClipRRect(
                  borderRadius: BorderRadius.circular(7),
                  child: CachedNetworkImage(
                    imageUrl: extractedImageUrl,
                    height: 150,
                    width: double.infinity,
                    fit: BoxFit.cover,
                    placeholder: (context, url) =>
                        Image.asset('assets/images/placeholder.png', fit: BoxFit.cover),
                    errorWidget: (context, url, error) =>
                        Image.asset('assets/images/placeholder.png', fit: BoxFit.cover),
                  ),
                )
                    : const SizedBox.shrink(),
                Gap(16),
                MarkdownBody(
                  data: cleanedRecipeText,
                  styleSheet: MarkdownStyleSheet(
                    h1: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Colors.deepPurple,
                    ),
                    h2: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                    strong: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),

                if (videoId != null && ytController != null) ...[
                  const Gap(16),
                  YoutubePlayer(
                    controller: ytController,
                    showVideoProgressIndicator: true,
                    progressIndicatorColor: AppColors.primaryColor,
                    progressColors: const ProgressBarColors(
                      playedColor: AppColors.primaryColor,
                      handleColor: Colors.amberAccent,
                    ),
                    onReady: () {
                      // Controller is ready
                    },
                  ),
                ],
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                ytController?.dispose();
                Navigator.of(dialogContext).pop();
                if (selectedFile != null) {
                  removeFile();
                } else {
                  removeText();
                }
              },
              child: const Text('Close'),
            ),
          ],
        );
      },
    );
  }

  static void sendRequest(
      BuildContext context,
      File? selectedFile,
      GenerativeModel model,
      Function removeFile,
      String transcribedText,
      Function removeText,
      ) async {
    context.showLoader();
    toastInfo(msg: "Processing...", status: Status.success);
    try {
      if (selectedFile != null) {
        await _sendImageToGemini(
          selectedFile,
          model,
          context,
          removeFile,
          removeText,
        );
      } else if (transcribedText.isNotEmpty) {
        await _sendAudioTextPrompt(
          model,
          context,
          transcribedText,
          selectedFile,
          removeFile,
          removeText,
        );
      }
    } catch (e) {
      if (kDebugMode) {
        print('Error sending request: $e');
      }
      toastInfo(msg: "Error sending request:$e ", status: Status.error);
    } finally {
      if (context.mounted) {
        context.hideLoader();
      }
    }
  }
}
```

The `RecipeController` class is responsible for interacting with the Gemini AI model to generate recipes and then display these recipes to the user, complete with parsed YouTube video links and potentially extracted image URLs.

### `_sendImageToGemini(File? selectedFile, GenerativeModel model, BuildContext context, Function removeFile, Function removeText)`:

- This **private static method** handles sending an image to the Gemini model.
- It displays a "Processing..." toast message.
- It reads the `selectedFile` (the image) as bytes.
- It creates a `TextPart` from `AppStrings.AI_TEXT_PART` (our image-based AI prompt) and a `DataPart` for the image bytes.
- `model.generateContent([Content.multi([prompt, image])])`: This is where the magic happens! It sends both the text prompt and the image data to the Gemini model for generation.
- Upon receiving a response, it calls `_displayRecipe` to show the generated recipe to the user.
- `context.mounted` check ensures the context is still valid before attempting UI updates.

###  `_sendAudioTextPrompt(GenerativeModel model, BuildContext context, String transcribedText, File? selectedFile, Function removeFile, Function removeText)`:

- This **private static method** handles sending transcribed audio text to the Gemini model.
- It constructs a full prompt by concatenating `AppStrings.AI_AUDIO_PART` with the `transcribedText`.
- `model.generateContent([Content.text(prompt)])`: It sends only the text prompt to the Gemini model.
- Similar to the image method, it calls `_displayRecipe` with the generated text.

### `_displayRecipe(String? recipeText, BuildContext context, File? selectedFile, Function removeFile, Function removeText)`:

- This **private static method** is responsible for parsing the AI's response and displaying it in a modal dialog.
- **Error handling**: If `recipeText` is null or empty, it provides a default message.
- **Extracting YouTube video URL**: It uses a `RegExp` (`youtubeLineRegex`) to find a line in the `recipeText` that matches the "YouTube Video URL: https://..." pattern. If found, it extracts the full URL and then another `RegExp` (`ytIdRegex`) to get the YouTube video ID. The extracted video URL text is then removed from `workingRecipeText` to clean the displayed recipe.
- **Extracting image URL**: Similarly, it uses another `RegExp` (`imageLine`) to extract an image URL from the `recipeText`. The extracted image URL text is also removed.
- **Debug printing**: Prints the extracted URLs for debugging.
- `showDialog`: Presents an `AlertDialog` to the user.
  - `YoutubePlayerController`: If a `videoId` was extracted, it initializes a `YoutubePlayerController` from the `Youtubeer_flutter` package, configured with basic flags (for example, `autoPlay: false`).
  - **Recipe display**:
    - If an `selectedFile` (image taken by the user) is present, it displays that image.
    - Otherwise, if an `extractedImageUrl` was found in the AI's response, it uses `CachedNetworkImage` to display that image. This is particularly useful for text-based queries where Gemini might suggest an image.
    - `MarkdownBody`: Uses `flutter_markdown` to render the `cleanedRecipeText` (after removing the YouTube and Image URLs) as Markdown, allowing for rich text formatting (for example, bolding, headings) directly from the AI's response.
    - `YoutubePlayer`: If a `videoId` and `ytController` are available, it embeds the YouTube video player directly into the dialog, with customizable progress bar colors.
  - **"Close" button**: Disposes the `ytController` (important for resource management), pops the dialog, and calls either `removeFile()` or `removeText()` to clear the input fields based on what was used for the query.

### `sendRequest(BuildContext context, File? selectedFile, GenerativeModel model, Function removeFile, String transcribedText, Function removeText)`:

- This **public static method** is the entry point for sending requests to the Gemini model.
- `context.showLoader()`: Displays a loading overlay using our custom extension.
- `toastInfo(msg: "Processing...", status: Status.success)`: Shows a toast message.
- **Conditional logic**:
  - If `selectedFile` is not null, it calls `_sendImageToGemini`.
  - Otherwise, if `transcribedText` is not empty, it calls `_sendAudioTextPrompt`.
- **Error handling**: Uses a `try-catch` block to gracefully handle any errors during the AI request, logging them in debug mode and showing an error toast to the user.
- `finally` Block: Ensures `context.hideLoader()` is always called, regardless of success or error, to dismiss the loading indicator.

In essence, `RecipeController` orchestrates the entire process of sending user input (image or voice), communicating with the Gemini AI, parsing its intelligent response, and beautifully presenting it to the user with interactive elements like YouTube videos and relevant images.

---

## 3. The `presentation` Folder

This folder contains all the UI-related code.

```dart :collapsed-lines title="screens/home_screen.dart"
import 'dart:async';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:google_generative_ai/google_generative_ai.dart';
import 'package:iconsax/iconsax.dart';
import 'package:image_cropper/image_cropper.dart';
import 'package:snap2chef/core/extensions/format_to_mb.dart';
import 'package:snap2chef/infrastructure/image_upload_controller.dart';
import 'package:snap2chef/infrastructure/recipe_controller.dart';
import 'package:speech_to_text/speech_recognition_result.dart';
import 'package:speech_to_text/speech_to_text.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_strings.dart';
import '../../core/constants/enums/status.dart';
import '../components/toast_info.dart';
import '../widgets/glowing_microphone.dart';
import '../widgets/image_previewer.dart';
import '../widgets/query_text_box.dart';
import '../widgets/upload_container.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  File? selectedFile;
  Completer? completer;
  String? fileName;
  int? fileSize;
  late GenerativeModel _model;
  String apiKey = ""; // <--- REPLACE WITH YOUR ACTUAL API KEY
  final TextEditingController _query = TextEditingController();
  final SpeechToText _speechToText = SpeechToText();
  bool _speechEnabled = false;
  String _lastWords = '';
  bool isRecording = false;
  bool isDoneRecording = false;

  void removeText() {
    setState(() {
      _query.clear();
      isDoneRecording = false;
      _lastWords = "";
    });
    _query.clear();
  }

  void setKeyword(String prompt) {
    if (prompt.isEmpty) {
      toastInfo(msg: "You didn't say anything!", status: Status.error);
      setState(() {
        isDoneRecording = false;
        isRecording = false;
      });
      return;
    }

    setState(() {
      _lastWords = "";
      isRecording = false;
      _query.text = prompt;
      isDoneRecording = true;
    });
  }

  void _initSpeech() async {
    try {
      _speechEnabled = await _speechToText.initialize(
        onStatus: (status) => debugPrint('Speech status: $status'),
        onError: (error) => debugPrint('Speech error: $error'),
      );
      if (!_speechEnabled) {
        toastInfo(
          msg: "Microphone permission not granted or speech not available.",
          status: Status.error,
        );
      }
      setState(() {});
    } catch (e) {
      debugPrint("Speech initialization failed: $e");
    }
  }

  void _startListening() async {
    setState(() {
      isRecording = true;
    });
    if (!_speechEnabled) {
      toastInfo(msg: "Speech not initialized yet.", status: Status.error);
      return;
    }

    await _speechToText.listen(onResult: _onSpeechResult);
    setState(() {});
  }

  void _stopListening() async {
    await _speechToText.stop();
    setKeyword(_lastWords);
    setState(() {});
  }

  void _onSpeechResult(SpeechRecognitionResult result) {
    setState(() {
      _lastWords = result.recognizedWords;
    });
  }

  @override
  void initState() {
    super.initState();
    // TODO: Replace "YOUR_API_KEY" with your actual Gemini API Key
    // Refer to https://freecodecamp.org/news/how-to-secure-mobile-apis-in-flutter/ for API key security.
    apiKey = "YOUR_API_KEY"; // Secure this!
    _model = GenerativeModel(model: AppStrings.AI_MODEL, apiKey: apiKey);
    _initSpeech();
  }

  @override
  void dispose() {
    _query.dispose();
    _speechToText.cancel(); // Cancel listening to prevent resource leaks
    super.dispose();
  }

  void assignCroppedImage(CroppedFile? croppedFile) {
    if (croppedFile != null) {
      setState(() {
        selectedFile = File(croppedFile.path);
      });
    }
  }

  void setFile(File? pickedFile) {
    setState(() {
      selectedFile = pickedFile;
      fileName = pickedFile?.path.split('/').last;
      fileSize = pickedFile?.lengthSync().formatToMegaByte();
    });
  }

  void removeFile() {
    setState(() {
      selectedFile = null;
      fileSize = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.sizeOf(context);

    return Scaffold(
      floatingActionButton: selectedFile != null || _query.text.isNotEmpty
          ? FloatingActionButton.extended(
        onPressed: () => RecipeController.sendRequest(
          context,
          selectedFile,
          _model,
          removeFile,
          _query.text,
          removeText,
        ),
        backgroundColor: AppColors.primaryColor,
        icon: const Icon(Iconsax.send_1, color: Colors.white),
        label: const Text(
          "Send Request",
          style: TextStyle(color: Colors.white),
        ),
      )
          : null,
      body: Padding(
        padding: const EdgeInsets.all(18.0),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                AppStrings.APP_TITLE,
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.w500,
                  fontSize: 16,
                ),
              ),
              Text(
                AppStrings.APP_SUBTITLE,
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: AppColors.grey,
                  fontSize: 15,
                  fontWeight: FontWeight.w300,
                ),
              ),
              const Gap(20),
              if (!isDoneRecording)
                !isRecording
                    ? selectedFile != null
                    ? ImagePreviewer(
                  size: size,
                  pickedFile: selectedFile,
                  removeFile: removeFile,
                  context: context,
                  completer: completer,
                  setFile: setFile,
                  assignCroppedImage: assignCroppedImage,
                )
                    : GestureDetector(
                  onTap: () =>
                      ImageUploadController.showFilePickerButtonSheet(
                        context,
                        completer,
                        setFile,
                        assignCroppedImage,
                      ),
                  child: UploadContainer(
                    title: 'an image of a food or snack',
                    size: size,
                  ),
                )
                    : SizedBox.shrink(),
              const Gap(20),

              if (selectedFile == null) ...[
                if (!isDoneRecording) ...[
                  Text(
                    "or record your voice",
                    style: TextStyle(
                      color: AppColors.grey,
                      fontSize: 16,
                      fontWeight: FontWeight.w200,
                    ),
                  ),
                  Center(
                    child: GestureDetector(
                      onTap: () {
                        if (!_speechEnabled) {
                          toastInfo(
                            msg: "Speech recognition not ready yet.",
                            status: Status.error,
                          );
                          return;
                        }
                        if (_speechToText.isNotListening) {
                          _startListening();
                        } else {
                          _stopListening();
                        }
                      },
                      child: GlowingMicButton(
                        isListening: !_speechToText.isNotListening,
                      ),
                    ),
                  ),
                  const Gap(10),
                  Container(
                    padding: EdgeInsets.all(16),
                    child: Text(
                      _speechToText.isListening
                          ? _lastWords
                          : _speechEnabled
                          ? 'Tap the microphone to start listening...'
                          : 'Speech not available',
                    ),
                  ),
                  const Gap(10),
                ],

                isDoneRecording
                    ? QueryTextBox(query: _query)
                    : SizedBox.shrink(),
              ],

              const Gap(20),
              selectedFile != null || _query.text.isNotEmpty
                  ? GestureDetector(
                onTap: () {
                  if (selectedFile != null) {
                    removeFile();
                  } else {
                    removeText();
                  }
                },
                child: CircleAvatar(
                  backgroundColor: AppColors.primaryColor,
                  radius: 30,
                  child: Icon(Iconsax.close_circle, color: Colors.white),
                ),
              )
                  : SizedBox.shrink(),
            ],
          ),
        ),
      ),
    );
  }
}
```

The `HomeScreen` is the main user interface of our AI cooking assistant application. It manages the state for image selection, voice input, and triggers the AI recipe generation.

### State variables

- `selectedFile`: Stores the `File` object of the image picked by the user.
- `completer`: A `Completer` object, often used for asynchronous operations to signal completion.
- `fileName`, `fileSize`: Store details about the selected image.
- `_model`: An instance of `GenerativeModel` from the `google_generative_ai` package, which is our interface to the Gemini API.
- `apiKey`: **Crucially, this is where you'll insert your Gemini API key.** Remember the security warning above!
- `_query`: A `TextEditingController` for the text input field, which will display the transcribed voice input.
- `_speechToText`: An instance of `SpeechToText` for handling voice recognition.
- `_speechEnabled`: A boolean indicating if speech recognition is initialized and available.
- `_lastWords`: Stores the most recently recognized words from speech.
- `isRecording`: A boolean to track if voice recording is active.
- `isDoneRecording`: A boolean to track if a voice recording has been completed and transcribed.

### Methods

- `removeText()`: Clears the text input field (`_query`), resets `isDoneRecording` and `_lastWords` to clear any previous voice input.
- `setKeyword(String prompt)`: Sets the `_query` text to the `prompt` (transcribed voice), and updates `isRecording` and `isDoneRecording` states. It also provides a toast message if the prompt is empty.
- `_initSpeech()`: Initializes the `SpeechToText` plugin. It requests microphone permission and sets `_speechEnabled` based on the initialization success. If permissions are not granted, it shows an error toast.
- `_startListening()`: Starts the speech recognition listener. Sets `isRecording` to `true`.
- `_stopListening()`: Stops the speech recognition listener and calls `setKeyword` with the `_lastWords` to finalize the transcribed text.
- `_onSpeechResult(SpeechRecognitionResult result)`: Callback method for `SpeechToText` that updates `_lastWords` with the recognized words as speech recognition progresses.
- `initState()`: Called when the widget is inserted into the widget tree. It initializes the `_model` with the Gemini API key and model name, and calls `_initSpeech()` to set up voice recognition.
- `dispose()`: Called when the widget is removed from the widget tree. It disposes of the `_query` controller and cancels the `_speechToText` listener to prevent memory leaks.
- `assignCroppedImage(CroppedFile? croppedFile)`: Callback function passed to `ImageUploadController` to update `selectedFile` with the path of the newly cropped image.
- `setFile(File? pickedFile)`: Callback function passed to `ImageUploadController` to update `selectedFile` with the picked image, and also extracts its `fileName` and `fileSize` using our custom extension.
- `removeFile()`: Clears the `selectedFile` and `fileSize` states, effectively removing the displayed image.

### `build(BuildContext context)` Method - UI Layout:

- `FloatingActionButton.extended`: This button, labeled "Send Request," becomes visible only when an image (`selectedFile`) is chosen OR when there's text in the query box (`_query.text.isNotEmpty`). Tapping it triggers `RecipeController.sendRequest` with the relevant input.
  - **App title and subtitle**: Displays the main headings using `AppStrings`.
  - **Image upload/preview section**:
    - If `!isDoneRecording` (meaning no voice input has been finalized) and `!isRecording` (not currently recording voice):
      - If `selectedFile` is not null, it shows an `ImagePreviewer` widget to display the chosen image with an option to remove it.
      - Otherwise (no image selected), it displays an `UploadContainer` which acts as a tappable area to trigger `ImageUploadController.showFilePickerButtonSheet` for picking an image.
  - **Voice input section**:
    - This section (`if (selectedFile == null) ...`) only appears if no image is selected, providing an alternative input method.
    - If `!isDoneRecording`, it shows a "or record your voice" text and a `GlowingMicButton`.
      - Tapping the `GlowingMicButton` toggles speech recognition (`_startListening` / `_stopListening`).
      - A `Text` widget displays the current speech recognition status or `_lastWords` as they are transcribed.
    - If `isDoneRecording` (meaning voice input has been finalized), it shows a `QueryTextBox` which displays the transcribed text, allowing for review before sending the request.
  - **Clear input button**: A `CircleAvatar` with a close icon appears when either an image is selected or text is present in the query. Tapping it calls `removeFile()` or `removeText()` to clear the respective input.

Overall, `HomeScreen` intelligently adapts its UI based on user input (image or voice) and orchestrates the interaction with the `ImageUploadController` for image handling and the `RecipeController` for AI recipe generation.

### The <VPIcon icon="fas fa-folder-open"/>`components` Folder

This folder contains smaller, reusable UI elements.

```dart title="toast_info.dart"
import 'package:fluttertoast/fluttertoast.dart';
import '../../core/constants/app_colors.dart';
import 'package:flutter/material.dart'; // Import for MaterialColor/Colors

void toastInfo({
  required String msg,
  required Status status,
}) {
  Fluttertoast.showToast(
    msg: msg,
    toastLength: Toast.LENGTH_SHORT,
    gravity: ToastGravity.BOTTOM,
    timeInSecForIosWeb: 1,
    backgroundColor: status == Status.success ? AppColors.primaryColor : AppColors.errorColor,
    textColor: Colors.white,
    fontSize: 16.0,
  );
}
```

The `toastInfo` function provides a convenient way to display brief, non-intrusive messages (toasts) to the user, typically for feedback like "success" or "error" messages.

It takes two required parameters:

- `msg`: The message string to be displayed in the toast.
- `status`: An enum of type `Status` (`success` or `error`) which determines the background color of the toast.

`Fluttertoast.showToast(...)` is the core function from the `fluttertoast` package that displays the toast.

- `toastLength`: Sets the duration the toast is visible (short).
- `gravity`: Positions the toast at the bottom of the screen.
- `timeInSecForIosWeb`: Duration for web/iOS.
- `backgroundColor`: Dynamically set to `AppColors.primaryColor` for success and `AppColors.errorColor` for errors, providing visual cues to the user.
- `textColor`: Sets the text color to white.
- `fontSize`: Sets the font size of the toast message.

This function centralizes toast message display, ensuring consistency in appearance and behavior throughout the app.

### The <VPIcon icon="fas fa-folder-open"/>`widgets` Folder

The application's user interface is constructed using a series of well-defined, reusable Flutter widgets. Each widget serves a specific purpose, contributing to the overall functionality and aesthetic of Snap2Chef.

This widget creates an animated microphone button that visually indicates when the application is actively listening for speech input.

```dart :collapsed-lines title="glowing_microphone.dart"
import 'package:flutter/material.dart';
import 'package:iconsax/iconsax.dart';

import '../../core/constants/app_colors.dart';

class GlowingMicButton extends StatefulWidget {
  final bool isListening;

  const GlowingMicButton({super.key, required this.isListening});

  @override
  State<GlowingMicButton> createState() => _GlowingMicButtonState();
}

class _GlowingMicButtonState extends State<GlowingMicButton>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    );

    _animation = Tween<double>(begin: 0.0, end: 25.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOut),
    );

    if (widget.isListening) {
      _controller.repeat(reverse: true);
    }
  }

  @override
  void didUpdateWidget(covariant GlowingMicButton oldWidget) {
    super.didUpdateWidget(oldWidget);

    if (widget.isListening && !_controller.isAnimating) {
      _controller.repeat(reverse: true);
    } else if (!widget.isListening && _controller.isAnimating) {
      _controller.stop();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 100, // Enough space for the full glow
      height: 100,
      child: Stack(
        alignment: Alignment.center,
        children: [
          if (widget.isListening)
            AnimatedBuilder(
              animation: _animation,
              builder: (_, __) {
                return Container(
                  width: 60 + _animation.value,
                  height: 60 + _animation.value,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: AppColors.primaryColor.withOpacity(0.15),
                  ),
                );
              },
            ),
          CircleAvatar(
            backgroundColor: AppColors.primaryColor,
            radius: 30,
            child: Icon(
              widget.isListening ? Iconsax.stop_circle : Iconsax.microphone,
              color: Colors.white,
            ),
          ),
        ],
      ),
    );
  }
}
```

#### `GlowingMicButton` (StatefulWidget): 

This is a `StatefulWidget` because it needs to manage its own animation state. It takes a `final bool isListening` property, which dictates whether the microphone should display a glowing animation or remain static.

#### `_GlowingMicButtonState` (State with `SingleTickerProviderStateMixin`):

- `SingleTickerProviderStateMixin`: This mixin is crucial for providing a `Ticker` to an `AnimationController`. A `Ticker` essentially drives the animation forward, linking it to the frame callbacks, ensuring smooth animation performance.
- `_controller` (`AnimationController`): Manages the animation. It's initialized with `vsync: this` (from `SingleTickerProviderStateMixin`) and a `duration` of 2 seconds.
- `_animation` (`Animation<double>`): Defines the range of values the animation will produce. Here, a `Tween<double>(begin: 0.0, end: 25.0)` is used with a `CurvedAnimation` (specifically `Curves.easeOut`) to create a smooth, decelerating effect as the glow expands.
- `initState()`: When the widget is first created, the `AnimationController` and `Animation` are initialized. If `isListening` is initially `true`, the animation is set to `repeat(reverse: true)` to make the glow pulse in and out continuously.
- `didUpdateWidget()`: This lifecycle method is called when the widget's configuration (its properties) changes. It checks if `isListening` has changed and starts or stops the animation accordingly. This ensures the animation dynamically responds to changes in the `isListening` state from its parent.
- `dispose()`: Crucially, the `_controller.dispose()` method is called here to release the resources held by the animation controller when the widget is removed from the widget tree, preventing memory leaks.

#### `build()` Method:

- `SizedBox`: Provides a fixed size (100x100) for the button, ensuring enough space for the glowing effect.
- `Stack`: Allows layering widgets on top of each other.
  - `if (widget.isListening) AnimatedBuilder(...)`: This conditional renders the glowing effect *only* when `isListening` is `true`.
    - `AnimatedBuilder`: Rebuilds its child whenever the `_animation` changes value.
    - Inside `AnimatedBuilder`, a `Container` is used to create the circular glow. Its `width` and `height` are dynamically increased by `_animation.value`, creating the expanding effect. The `color` is `AppColors.primaryColor` with `0.15` opacity, giving it a subtle glow.
  - `CircleAvatar`: This is the main microphone button.
    - `backgroundColor` is `AppColors.primaryColor`.
    - `radius` is `30`.
    - The `child` is an `Icon` from the `Iconsax` package, dynamically changing between `Iconsax.stop_circle` (when listening) and `Iconsax.microphone` (when not listening). The icon color is white.

This widget provides a reusable `ListTile` interface for users to select images from either the camera or the gallery.

```dart :collapsed-lines title="image_picker_component.dart"
import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:snap2chef/infrastructure/image_upload_controller.dart';

import '../../core/constants/app_colors.dart';
import '../../core/constants/enums/record_source.dart';

class ImagePickerTile extends StatelessWidget {
  const ImagePickerTile({
    super.key,
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.recordSource,
    required this.completer,
    required this.context,
    required this.setFile,
    required this.assignCroppedImage,
  });

  final String title;
  final String subtitle;
  final IconData icon;
  final RecordSource recordSource;
  final Completer? completer;
  final BuildContext context;
  final Function setFile;
  final Function assignCroppedImage;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: CircleAvatar(
        backgroundColor: AppColors.litePrimary,
        child: Padding(
          padding: const EdgeInsets.all(3.0),
          child: Center(
            child: Icon(icon, color: AppColors.primaryColor, size: 20),
          ),
        ),
      ),
      title: Text(title, style: const TextStyle(color: Colors.black)),
      subtitle: Text(
        subtitle,
        style: const TextStyle(fontSize: 14, color: Colors.grey),
      ),
      trailing: const Icon(
        CupertinoIcons.chevron_right,
        size: 20,
        color: Color(0xffE4E4E4),
      ),
      onTap: () {
        ImageUploadController.imagePicker(
          recordSource,
          completer,
          context,
          setFile,
          assignCroppedImage,
        );
      },
    );
  }
}
```

#### `ImagePickerTile` (StatelessWidget)

This is a `StatelessWidget` because it simply renders content based on its immutable properties and triggers an external function (`ImageUploadController.imagePicker`) when tapped.

#### Properties:

It takes several `final` properties to make it highly customizable:

- `title` and `subtitle`: Text for the main and secondary lines of the list tile.
- `icon`: The `IconData` to display as the leading icon.
- `recordSource`: An enum (`RecordSource`) likely indicating if the image should be picked from the camera or gallery.
- `completer`: A `Completer` object, often used for asynchronous operations to signal when a task is complete.
- `context`: The `BuildContext` to allow the `ImageUploadController` to show dialogs or navigate.
- `setFile`: A `Function` callback to update the selected image file in the parent widget.
- `assignCroppedImage`: A `Function` callback to handle the result of any image cropping operation.

#### `build()` Method:

- `ListTile`: A standard Flutter widget used to arrange elements in a single row.
  - `leading`: Displays a `CircleAvatar` with a light primary background color, containing the specified `icon` in the primary color. This creates a visually appealing icon button on the left.
  - `title`: Displays the `title` text in black.
  - `subtitle`: Displays the `subtitle` text in grey with a font size of 14, providing additional descriptive information.
  - `trailing`: Shows a `CupertinoIcons.chevron_right` (right arrow) icon, common for indicating navigation or actionable items in a list.
  - `onTap`: This is the primary interaction point. When the `ListTile` is tapped, it calls the static method `ImageUploadController.imagePicker`, passing all the necessary parameters. This centralizes the image picking logic within `ImageUploadController`, making the `ImagePickerTile` purely a UI component.

This widget is responsible for displaying a previously picked image and offering options to 'Edit' (re-pick) or 'Remove' the image.

```dart :collapsed-lines title="image_previewer.dart"
import 'dart:async';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:iconsax/iconsax.dart';
import 'package:snap2chef/infrastructure/image_upload_controller.dart';

class ImagePreviewer extends StatelessWidget {
  const ImagePreviewer({
    super.key,
    required this.size,
    required this.pickedFile,
    required this.removeFile,
    required this.context,
    required this.completer,
    required this.setFile,
    required this.assignCroppedImage,
  });

  final Size size;
  final File? pickedFile;
  final Function removeFile;
  final BuildContext context;
  final Completer? completer;
  final Function setFile;
  final Function assignCroppedImage;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: size.height * 0.13,
      width: double.infinity,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(7),
        // border: Border.all(
        //   color: AppColors.borderColor,
        // ),
        image: DecorationImage(
          image: FileImage(
            File(pickedFile!.path),
          ),
          fit: BoxFit.cover,
        ),
      ),
      child: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.3),
              borderRadius: BorderRadius.circular(7),
            ),
          ),
          // Centered content
          Center(
            child: Wrap(
              crossAxisAlignment: WrapCrossAlignment.center,
              spacing: 20,
              children: [
                GestureDetector(
                  onTap: () {
                    ImageUploadController.showFilePickerButtonSheet(context,completer,setFile,assignCroppedImage);
                  },
                  child: Column(
                    children: [
                      Icon(
                        Iconsax.edit_2,
                        size: 20,
                        color: Colors.white,
                      ),
                      const Text(
                        'Edit',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 15,
                        ),
                      )
                    ],
                  ),
                ),
                GestureDetector(
                  onTap: () {
                    removeFile();
                  },
                  child: Column(
                    children: [
                      Icon(
                        Iconsax.note_remove,
                        color: Colors.white,
                        size: 20,
                      ),
                      const Text(
                        'Remove',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 15,
                        ),
                      )
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
```

#### `ImagePreviewer` (StatelessWidget)

Similar to `ImagePickerTile`, this is a `StatelessWidget` that displays content and triggers callbacks.

#### Properties:

- `size`: The `Size` of the parent widget, used to calculate the `height` of the preview container proportionally.
- `pickedFile`: A `File?` representing the image file to be displayed. It's nullable, implying that this widget might only show if a file has been picked.
- `removeFile`: A `Function` callback to handle the removal of the currently displayed image.
- `context`, `completer`, `setFile`, `assignCroppedImage`: These are passed through to the `ImageUploadController` when the 'Edit' action is triggered, similar to the `ImagePickerTile`.

#### `build()` Method:

- `Container`: The primary container for the image preview.
  - `height`: Set to 13% of the screen height, providing a responsive size.
  - `width`: `double.infinity` to take full available width.
  - `decoration`:
    - `borderRadius`: Applies rounded corners to the container.
    - `image: DecorationImage(...)`: This is where the magic happens. It displays the `pickedFile` as a background image for the container.
      - `FileImage(File(pickedFile!.path))`: Creates an image provider from the local file path. The `!` (null assertion operator) implies `pickedFile` is expected to be non-null when this widget is displayed.
      - `fit: BoxFit.cover`: Ensures the image covers the entire container, potentially cropping parts of it.
- `Stack`: Layers content on top of the image.
  - `Container` (Overlay): A semi-transparent black `Container` is placed on top of the image (`Colors.black.withOpacity(0.3)`) to create a darkened overlay. This improves the readability of the white text and icons placed over the image.
  - `Center`: Centers the action buttons horizontally and vertically within the overlay.
  - `Wrap`: Arranges the 'Edit' and 'Remove' buttons horizontally with a `spacing` of 20. `WrapCrossAlignment.center` aligns them vertically within the `Wrap`.
  - `GestureDetector` (for 'Edit'):
    - `onTap`: Calls `ImageUploadController.showFilePickerButtonSheet`, allowing the user to re-select or change the image. This method likely presents a bottom sheet with options to pick from the camera or gallery, similar to how the initial image picking works.
    - Its child is a `Column` containing an `Iconsax.edit_2` icon and an 'Edit' text, both in white.
- `GestureDetector` (for 'Remove'):
  - `onTap`: Calls the `removeFile()` callback, which would typically clear the selected `pickedFile` in the parent state, causing this previewer to disappear or revert to an upload state.
  - Its child is a `Column` containing an `Iconsax.note_remove` icon and a 'Remove' text, both in white.

This widget provides a styled `TextFormField` for multi-line text input, typically used for user queries or notes.

```dart :collapsed-lines title="query_text_box.dart"
import 'package:flutter/material.dart';

import '../../core/constants/app_colors.dart';

class QueryTextBox extends StatelessWidget {
  const QueryTextBox({
    super.key,
    required TextEditingController query,
  }) : _query = query;

  final TextEditingController _query;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: _query,
      maxLines: 4,
      autofocus: true,
      decoration: InputDecoration(
        hintStyle: TextStyle(color: AppColors.lighterGrey),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12.0),
          borderSide: BorderSide(color: Colors.grey.shade400),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12.0),
          borderSide: const BorderSide(
            color: AppColors.primaryColor,
            width: 2.0,
          ),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12.0),
          borderSide: BorderSide(color: Colors.grey.shade300),
        ),
        contentPadding: const EdgeInsets.symmetric(
          vertical: 12.0,
          horizontal: 16.0,
        ),
      ),
      style: const TextStyle(
        fontSize: 14.0,
        color: Colors.black,
      ),
      keyboardType: TextInputType.multiline,
      textInputAction: TextInputAction.newline,
    );
  }
}
```

#### `QueryTextBox` (StatelessWidget):

A `StatelessWidget` that renders a text input field. It takes a `TextEditingController` as a required parameter, allowing external control over the text field's content.

#### **Properties:

- `_query` (TextEditingController): The controller linked to the `TextFormField`. This allows retrieving the text, setting initial text, and listening for changes.

#### `build()` Method:

- `TextFormField`: The core input widget.
  - `controller: _query`: Binds the `TextEditingController` to this field.
  - `maxLines: 4`: Allows the text field to expand up to 4 lines before becoming scrollable.
  - `autofocus: true`: Automatically focuses the text field when the screen loads, bringing up the keyboard.
  - `decoration: InputDecoration(...)`: Defines the visual styling of the input field.
    - `hintStyle`: Sets the color of the hint text to `AppColors.lighterGrey`.
    - `border`: Defines the default border when the field is not focused or enabled, with rounded corners and a light grey border.
    - `focusedBorder`: Defines the border style when the field is actively focused by the user. It uses `AppColors.primaryColor` with a wider stroke (`width: 2.0`) to provide a clear visual indicator of focus.
    - `enabledBorder`: Defines the border style when the field is enabled but not focused, using a slightly darker grey.
    - `contentPadding`: Adds internal padding within the text field for better spacing of the text.
  - `style`: Sets the font size to 14.0 and color to black for the entered text.
  - `keyboardType: TextInputType.multiline`: Configures the keyboard to be suitable for multi-line text input, often providing a "return" key that creates a new line.
  - `textInputAction: TextInputAction.newline`: Specifies that pressing the "Done" or "Enter" key on the keyboard should insert a new line.

This widget creates a visually distinct "dotted border" container, typically used as a tappable area to trigger file upload or selection actions.

```dart :collapsed-lines title="upload_container.dart"
import 'package:dotted_border/dotted_border.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:iconsax/iconsax.dart';
import '../../core/constants/app_colors.dart';

class UploadContainer extends StatelessWidget {
  const UploadContainer({
    super.key,
    required this.size,
    required this.title,
  });

  final Size size;
  final String title;

  @override
  Widget build(BuildContext context) {
    return DottedBorder(
      color: AppColors.primaryColor,
      radius: const Radius.circular(15),
      borderType: BorderType.RRect,
      strokeWidth: 1,
      child: SizedBox(
        height: size.height * 0.13,
        width: double.infinity,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              height: 70,
              width: 60,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppColors.litePrimary,
              ),
              child: Padding(
                padding: const EdgeInsets.all(13.0),
                child: Icon(
                  Iconsax.document_upload,
                  color: AppColors.primaryColor,
                ),
              ),
            ),
            const Gap(5),
            RichText(
              text: TextSpan(
                text: 'Click to select ',
                style: TextStyle(
                  color: AppColors.primaryColor,
                ),
                children: [
                  TextSpan(
                    text: title,
                    style: TextStyle(
                      color: Color(0xff555555),
                    ),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

#### `UploadContainer` (StatelessWidget):

A `StatelessWidget` primarily for visual presentation, indicating an upload zone.

#### Properties:

- `size`: The `Size` of the parent, used to determine the container's height proportionally.
- `title`: A `String` to be displayed as part of the `"Click to select [title]"` message.

####  `build()` Method:

- `DottedBorder`: This package provides the visual dotted border effect.
  - `color: AppColors.primaryColor`: The color of the dotted line.
  - `radius: const Radius.circular(15)`: Applies rounded corners to the dotted border.
  - `borderType: BorderType.RRect`: Specifies that the border should follow a rounded rectangle shape.
  - `strokeWidth: 1`: Sets the thickness of the dotted line.
- `SizedBox`: Defines the internal dimensions of the area within the dotted border, taking up 13% of the screen height and full width.
- `Column`: Arranges the icon and text vertically, centered within the `SizedBox`.
  - `Container` (Icon background): A circular container with `AppColors.litePrimary` background holds the upload icon.
    - `Iconsax.document_upload`: The icon signifying an upload action, colored with `AppColors.primaryColor`.
  - `Gap(5)`: From the `gap` package, this provides a small vertical space (5 pixels) between the icon and the text.
  - `RichText`: Allows for different styles within a single text block.
    - `TextSpan(text: 'Click to select ', ...)`: The first part of the message, styled with `AppColors.primaryColor`.
    - `children: [TextSpan(text: title, ...)]`: The second part of the message, which is the `title` property passed to the widget, styled in a darker grey. This structure allows "Click to select " to be consistently styled while the `title` (for example, "image", "document") can have a different appearance.

---

## Summary of Code Implementation

We've covered a significant amount of ground in this part of the article, transforming our basic Flutter application into a powerful AI-powered recipe guide. We started by setting up the core UI, then delved into integrating the `google_generative_ai` package to communicate with Google's Gemini models for both image and voice input.

We implemented robust logic for:

- **Image input:** Capturing images from the camera or gallery, cropping them, and sending them to the `gemini` model.
- **Voice input:** Recording audio and preparing the groundwork for transcription before sending text to the `gemini` model.
- **Dynamic content display:** Skillfully parsing the AI's response to extract and present not just the recipe text, but also embedding YouTube instructional videos and even relevant images, all within a beautifully formatted dialog using `flutter_markdown` and `cached_network_image`. We also ensured proper lifecycle management for our media players.

This highlights how easily you can leverage advanced AI capabilities like multimodal understanding and natural language generation within your Flutter applications. By building on these concepts, you can create truly interactive and intelligent user experiences.

Now that we have the core logic in place for capturing input, communicating with the AI, and displaying its rich responses, we need to ensure that our application can actually access the necessary device features.
