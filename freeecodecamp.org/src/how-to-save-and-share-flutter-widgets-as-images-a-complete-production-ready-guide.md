---
lang: en-US
title: "How to Save and Share Flutter Widgets as Images – A Complete Production-Ready Guide"
description: "Article(s) > How to Save and Share Flutter Widgets as Images – A Complete Production-Ready Guide"
icon: fa-brands fa-dart-lang
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
      content: "Article(s) > How to Save and Share Flutter Widgets as Images – A Complete Production-Ready Guide"
    - property: og:description
      content: "How to Save and Share Flutter Widgets as Images – A Complete Production-Ready Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-save-and-share-flutter-widgets-as-images-a-complete-production-ready-guide.html
prev: /programming/dart/articles/README.md
date: 2025-09-03
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756845409709/5224a6ae-93a9-4424-9a28-cccff69779f2.png
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

[[toc]]

---

<SiteInfo
  name="How to Save and Share Flutter Widgets as Images – A Complete Production-Ready Guide"
  desc="In many apps, you may want users to be able to save or share visual content generated in the UI. Flutter doesn’t ship with a “save widget to image” API, but with RepaintBoundary plus a few small packages, you can capture any widget, save it to the de..."
  url="https://freecodecamp.org/news/how-to-save-and-share-flutter-widgets-as-images-a-complete-production-ready-guide"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1756845409709/5224a6ae-93a9-4424-9a28-cccff69779f2.png"/>

In many apps, you may want users to be able to save or share visual content generated in the UI. Flutter doesn’t ship with a “save widget to image” API, but with `RepaintBoundary` plus a few small packages, you can capture any widget, save it to the device’s gallery, and share it through the native share sheet.

This article will go through the process of capturing and saving a widget step-by-step. We’ll be building a small Flutter app that renders a styled Quote Card and provides two actions:

1. Save the quote card to the device’s gallery as a PNG.
2. Share the image through the native share sheet (WhatsApp, Gmail, Messages, and so on).

::: note Prerequisites

1. Flutter 3.x or later installed and configured
2. An Android device or emulator, and optionally an iOS device or simulator
3. Basic familiarity with Flutter widgets and project structure

:::

---

## Project Setup

Create a new project and open it in your IDE:

```sh
flutter create quote_share_app
cd quote_share_app
```

---

## Dependencies

Add the following to <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` under `dependencies:` and run `flutter pub get`:

```yaml title="pubspec.yaml"
dependencies:
  flutter:
    sdk: flutter
  permission_handler: ^11.3.1
  image_gallery_saver: ^2.0.3
  path_provider: ^2.1.3
  share_plus: ^9.0.0
```

Notes about this code:

1. `permission_handler` handles runtime permissions where required.
2. `image_gallery_saver` writes raw bytes to the photo gallery (Android and iOS).
3. `path_provider` creates a temporary file location before sharing.
4. `share_plus` invokes the platform share sheet.

Version numbers above are examples that work with Flutter 3.x at the time of writing. If you update, check each package’s README for any API changes.

---

## Platform Configuration

Modern Android and iOS storage permissions are stricter than older blog posts often suggest. The snippets below are current best practices.

### Android

Open <VPIcon icon="fas fa-folder-open"/>`android/app/src/main/`<VPIcon icon="fa-brands fa-android"/>`AndroidManifest.xml`.

For Android 10 (API 29) and above, `WRITE_EXTERNAL_STORAGE` is deprecated. For Android 13 (API 33)+ you request media-scoped permissions like `READ_MEDIA_IMAGES` only if you are reading images. For saving your own image to the Pictures or DCIM collection, many devices don’t require the legacy external storage permissions when you write via MediaStore (plugins often handle this). `image_gallery_saver` typically works without `WRITE_EXTERNAL_STORAGE` on API 29+.

Add the following only if you target older devices and the plugin still requires it. Otherwise, you can omit storage permissions for modern SDKs.

```xml title="android/app/src/main/AndroidManifest.xml"
<!-- Optional for older devices pre-API 29 -->
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
    android:maxSdkVersion="28" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"
    android:maxSdkVersion="32" />

<!-- For Android 13+ if you ever need to read user images; not required just to write your own image -->
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
```

Do not add `android:requestLegacyExternalStorage="true"`. That flag was a temporary compatibility bridge for Android 10 and is not recommended anymore.

Gradle configuration: ensure your `compileSdkVersion` and `targetSdkVersion` are reasonably up to date (33 or 34). You usually don’t need special Gradle changes beyond what Flutter templates provide.

### iOS

Open `ios/Runner/`<VPIcon icon="iconfont icon-apple"/>`Info.plist` and add the following keys to explain why you save to the user’s photo library:

```xml title="ios/Runner/Info.plist"
<key>NSPhotoLibraryAddUsageDescription</key>
<string>The app needs access to save your generated images.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>The app needs access to your photo library.</string>
```

Some devices only require the Add usage description for writing, but supplying both keeps intent clear.

---

## App Architecture and Files Overview

To keep the code maintainable, we will split it into small files:

1. <VPIcon icon="fas fa-folder-open"/>`lib/`<VPIcon icon="fa-brands fa-dart"/>`main.dart`
2. <VPIcon icon="fas fa-folder-open"/>`lib/widgets/`<VPIcon icon="fa-brands fa-dart-lang"/>`quote_card.dart`
3. <VPIcon icon="fas fa-folder-open"/>`lib/utils/`<VPIcon icon="fa-brands fa-dart-lang"/>`capture.dart`
4. <VPIcon icon="fas fa-folder-open"/>`lib/services/`<VPIcon icon="fa-brands fa-dart-lang"/>`permission_service.dart`
5. <VPIcon icon="fas fa-folder-open"/>`lib/services/`<VPIcon icon="fa-brands fa-dart-lang"/>`gallery_saver_service.dart`
6. <VPIcon icon="fas fa-folder-open"/>`lib/services/`<VPIcon icon="fa-brands fa-dart-lang"/>`share_service.dart`
7. <VPIcon icon="fas fa-folder-open"/>`lib/screens/`<VPIcon icon="fa-brands fa-dart-lang"/>`quote_screen.dart`

This is the flow:

1. `QuoteCard` renders the visual widget we want to capture.
2. `captureWidgetToPngBytes(GlobalKey)` converts that widget into PNG bytes using `RepaintBoundary`.
3. `PermissionService` requests storage or photo library permissions when needed.
4. `GallerySaverService` saves bytes to the gallery.
5. `ShareService` writes bytes to a temporary file and triggers the share sheet.
6. `QuoteScreen` wires everything together with two buttons: Save and Share.

---

## Code Sections With Explanations

```dart title="lib/main.dart"
import 'package:flutter/material.dart';
import 'screens/quote_screen.dart';

void main() {
  runApp(const QuoteShareApp());
}

class QuoteShareApp extends StatelessWidget {
  const QuoteShareApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Quote Share App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorSchemeSeed: Colors.teal,
        useMaterial3: true,
      ),
      home: const QuoteScreen(),
    );
  }
}
```

::: info Code explanation:

1. `runApp` bootstraps the app.
2. `MaterialApp` provides theming and navigation.
3. `QuoteScreen` is our only screen; it displays the card and buttons.

:::

```dart :collapsed-lines title="lib/widgets/quote_card.dart"
import 'package:flutter/material.dart';

class QuoteCard extends StatelessWidget {
  final String quote;
  final String author;

  const QuoteCard({
    super.key,
    required this.quote,
    required this.author,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.teal.shade50,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.teal.shade200.withOpacity(0.4),
            blurRadius: 12,
            offset: const Offset(2, 6),
          ),
        ],
        border: Border.all(color: Colors.teal.shade200, width: 1),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '"$quote"',
            style: const TextStyle(
              fontSize: 22,
              fontStyle: FontStyle.italic,
              color: Colors.black87,
              height: 1.4,
            ),
          ),
          const SizedBox(height: 16),
          Align(
            alignment: Alignment.bottomRight,
            child: Text(
              '- $author',
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: Colors.black54,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
```

::: info Code explanation:

1. Pure UI. This widget is what we will capture into an image.
2. The stylings (padding, shadows, rounded corners) ensure that the result looks good when saved or shared.

:::

```dart title="lib/utils/capture.dart"
import 'dart:typed_data';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';

/// Captures the widget referenced by [boundaryKey] into PNG bytes.
/// Place a RepaintBoundary keyed with [boundaryKey] around the widget you want to capture.
Future<Uint8List?> captureWidgetToPngBytes(GlobalKey boundaryKey, {double pixelRatio = 3.0}) async {
  try {
    final context = boundaryKey.currentContext;
    if (context == null) return null;

    final renderObject = context.findRenderObject();
    if (renderObject is! RenderRepaintBoundary) return null;

    // If the boundary hasn't painted yet, wait a frame and try again.
    if (renderObject.debugNeedsPaint) {
      await Future.delayed(const Duration(milliseconds: 20));
      return captureWidgetToPngBytes(boundaryKey, pixelRatio: pixelRatio);
    }

    // Render to an Image with a higher pixelRatio for sharpness on high-dpi screens.
    final ui.Image image = await renderObject.toImage(pixelRatio: pixelRatio);

    // Encode the Image to PNG and return bytes.
    final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
    return byteData?.buffer.asUint8List();
  } catch (e) {
    debugPrint('captureWidgetToPngBytes error: $e');
    return null;
  }
}
```

::: info Code explanation line by line:

1. We accept a `GlobalKey` that must be attached to a `RepaintBoundary` wrapping the target widget.
2. `findRenderObject()` retrieves the render tree node. `RenderRepaintBoundary` can snapshot itself to an image.
3. `debugNeedsPaint` indicates whether the widget is fully laid out and painted. If not, we wait briefly and retry.
4. `toImage(pixelRatio: 3.0)` renders at higher resolution for crisp output. Increase if you need even sharper images, but note memory tradeoffs.
5. We encode the `ui.Image` to PNG via `toByteData` and return its bytes.

:::

```dart title="lib/services/permission_service.dart"
import 'dart:io';
import 'package:permission_handler/permission_handler.dart';

class PermissionService {
  /// Requests any storage/photo permissions needed for saving an image.
  /// On modern Android and iOS, saving to the Photos collection may not require
  /// the legacy WRITE permission, but some devices and OS versions still prompt.
  static Future<bool> requestSavePermission() async {
    if (Platform.isAndroid) {
      // For Android 13+ you typically do not need WRITE permission to save your own image.
      // Some OEMs still require storage permission for certain gallery operations.
      final status = await Permission.storage.request();
      if (status.isGranted) return true;

      if (status.isPermanentlyDenied) {
        await openAppSettings();
      }
      return false;
    }

    if (Platform.isIOS) {
      // On iOS, request Photos permission for adding to library when needed.
      final status = await Permission.photosAddOnly.request();
      // Fallback if photosAddOnly is unavailable on older plugin versions:
      if (status.isGranted) return true;

      // Some iOS versions may use `Permission.photos`.
      final photos = await Permission.photos.request();
      if (photos.isGranted) return true;

      return false;
    }

    // Other platforms
    return true;
  }
}
```

In the above code, the Android storage permissions are fragmented by API level and OEM behavior. Requesting `Permission.storage` remains a pragmatic approach when using gallery saver plugins, though many modern devices will succeed even if the user denies it.

On iOS, we request photo-library add permission, which allows writing to the library.

```dart title="lib/services/gallery_saver_service.dart"
import 'dart:typed_data';
import 'package:image_gallery_saver/image_gallery_saver.dart';

class GallerySaverService {
  /// Saves [pngBytes] to the gallery and returns a descriptive result map from the plugin.
  static Future<Map?> savePngBytesToGallery(Uint8List pngBytes, {String? name}) async {
    final result = await ImageGallerySaver.saveImage(
      pngBytes,
      name: name, // Optional file base name (plugin may append extension/time)
      quality: 100,
    );
    // Plugin returns a platform-dependent structure. We bubble it up unchanged.
    return result as Map?;
  }
}
```

::: info Code explanation:

1. `image_gallery_saver` writes the provided bytes to the photo library.
2. We pass `quality: 100` for best PNG quality. The plugin may place the file in DCIM/Pictures on Android and Photos on iOS.

:::

This code defines a utility class that saves raw PNG image data (bytes) into the device’s photo gallery. Let me explain it step by step:

```dart
import 'dart:typed_data';
import 'package:image_gallery_saver/image_gallery_saver.dart';
```

1. `dart:typed_data` is imported because the image is represented as `Uint8List` (a list of unsigned 8-bit integers, basically raw binary data).
2. `image_gallery_saver` is a Flutter plugin that lets you save images and videos to the device's gallery.

```dart
class GallerySaverService {
  /// Saves [pngBytes] to the gallery and returns a descriptive result map from the plugin.
  static Future<Map?> savePngBytesToGallery(Uint8List pngBytes, {String? name}) async {
```

1. The class is called `GallerySaverService`.
2. It has a static method `savePngBytesToGallery` that takes:
    - `pngBytes`: the raw PNG image data you want to save.
    - `name`: an optional file name to use for the saved image.

```dart
final result = await ImageGallerySaver.saveImage(
  pngBytes,
  name: name, // Optional file base name (plugin may append extension/time)
  quality: 100,
);
```

1. `ImageGallerySaver.saveImage` is called to save the image to the gallery.
2. `pngBytes` is passed in directly.
3. `name` is optional. The plugin may add an extension like `.png` and/or a timestamp to ensure uniqueness.
4. `quality: 100` ensures the best quality is saved (this parameter mostly applies to JPG, but still ensures maximum fidelity).

```dart
    // Plugin returns a platform-dependent structure. We bubble it up unchanged.
    return result as Map?;
  }
}
```

1. The plugin returns a result that may vary depending on platform (Android or iOS). Usually it’s a map containing information like file path and whether it was successful.
2. This method just forwards that result without altering it.
3. `as Map?` ensures the return type is a nullable Map.

In short: This class takes PNG image bytes, saves them to the user’s gallery, and returns a result map containing info about the saved file.

```dart title="lib/services/share_service.dart"
import 'dart:io';
import 'dart:typed_data';
import 'package:path_provider/path_provider.dart';
import 'package:share_plus/share_plus.dart';

class ShareService {
  /// Writes [pngBytes] to a temporary file and invokes the platform share sheet.
  static Future<void> sharePngBytes(Uint8List pngBytes, {String? text}) async {
    final tempDir = await getTemporaryDirectory();
    final filePath = '${tempDir.path}/quote_${DateTime.now().millisecondsSinceEpoch}.png';

    final file = File(filePath);
    await file.writeAsBytes(pngBytes, flush: true);

    await Share.shareXFiles(
      [XFile(file.path)],
      text: text ?? 'Sharing a quote from my app.',
    );
  }
}
```

Sharing generally requires a file path, not raw bytes. We create a temporary file, write the bytes, and pass it to `share_plus` using `shareXFiles`.

This code defines a `ShareService` class in Flutter/Dart that allows you to share an image (provided as raw PNG bytes) through the platform’s native share sheet (the system dialog that lets you share to WhatsApp, Gmail, Messenger, and so on).

Here’s a breakdown of what’s happening:

### 1. Import

- `dart:io`: Gives access to the `File` class for reading/writing files.
- `dart:typed_data`: Provides `Uint8List`, the data type used for raw byte arrays (like image data).
- `path_provider`: Used to get system directories (in this case, a temporary directory).
- `share_plus`: Provides the API for invoking the share sheet with text, files, images, and so on.

### 2. Class

`ShareService`

- A utility class that contains one static method `sharePngBytes`.

### 3. Method `sharePngBytes(Uint8List pngBytes, {String? text})`

1. **Step 1:** Get a temporary directory using `getTemporaryDirectory()`. This directory is suitable for writing temporary files that don’t need to persist.
2. **Step 2:** Generate a unique file path inside that temp directory. The filename uses the current timestamp (`DateTime.now().millisecondsSinceEpoch`) so each shared image is unique, avoiding overwrites.
3. **Step 3:** Create a `File` object at that path and write the `pngBytes` into it using `file.writeAsBytes()`. Setting `flush: true` ensures the data is written immediately.
4. **Step 4:** Use `Share.shareXFiles` from the `share_plus` package to open the native share sheet, passing the newly created file as an `XFile`. An optional text message can also be attached. If no text is provided, it defaults to "Sharing a quote from my app."

### Why this is useful

Flutter apps often generate images dynamically (like screenshots, charts, or quote cards). Since the share sheet requires an actual file (not just raw bytes), this service handles the conversion from memory (`Uint8List`) into a temporary file, then shares it seamlessly.

```dart :collapsed-lines title="lib/screens/quote_screen.dart"
import 'dart:typed_data';
import 'package:flutter/material.dart';
import '../widgets/quote_card.dart';
import '../utils/capture.dart';
import '../services/permission_service.dart';
import '../services/gallery_saver_service.dart';
import '../services/share_service.dart';

class QuoteScreen extends StatefulWidget {
  const QuoteScreen({super.key});

  @override
  State<QuoteScreen> createState() => _QuoteScreenState();
}

class _QuoteScreenState extends State<QuoteScreen> {
  // This key will be attached to a RepaintBoundary that wraps the quote card.
  final GlobalKey _captureKey = GlobalKey();

  bool _isSaving = false;
  bool _isSharing = false;

  Future<Uint8List?> _capture() async {
    return captureWidgetToPngBytes(_captureKey, pixelRatio: 3.0);
  }

  Future<void> _saveImage() async {
    setState(() => _isSaving = true);
    try {
      // Request permissions when relevant (see notes in PermissionService).
      final granted = await PermissionService.requestSavePermission();
      if (!granted) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Permission required to save images.')),
          );
        }
        return;
      }

      final bytes = await _capture();
      if (bytes == null) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Failed to capture image.')),
          );
        }
        return;
      }

      final result = await GallerySaverService.savePngBytesToGallery(
        bytes,
        name: 'quote_${DateTime.now().millisecondsSinceEpoch}',
      );

      if (mounted) {
        final ok = result != null;
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(ok ? 'Image saved to gallery.' : 'Save failed.')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isSaving = false);
    }
  }

  Future<void> _shareImage() async {
    setState(() => _isSharing = true);
    try {
      final bytes = await _capture();
      if (bytes == null) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Failed to capture image.')),
          );
        }
        return;
      }
      await ShareService.sharePngBytes(bytes, text: 'Here is a quote I wanted to share.');
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isSharing = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    const quote = "Believe you can and you're halfway there.";
    const author = 'Theodore Roosevelt';

    return Scaffold(
      appBar: AppBar(
        title: const Text('Quote Share'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            // The RepaintBoundary must directly wrap the content you want to capture.
            RepaintBoundary(
              key: _captureKey,
              child: const QuoteCard(
                quote: quote,
                author: author,
              ),
            ),
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                FilledButton.icon(
                  onPressed: _isSaving ? null : _saveImage,
                  icon: _isSaving
                      ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2))
                      : const Icon(Icons.download),
                  label: Text(_isSaving ? 'Saving...' : 'Save'),
                ),
                OutlinedButton.icon(
                  onPressed: _isSharing ? null : _shareImage,
                  icon: _isSharing
                      ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2))
                      : const Icon(Icons.share),
                  label: Text(_isSharing ? 'Sharing...' : 'Share'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
```

Code explanation highlights:

1. `GlobalKey` `_captureKey` identifies the `RepaintBoundary`.
2. Buttons call `_saveImage` and `_shareImage`.
3. We show progress indicators and disable buttons while busy.
4. SnackBars provide user feedback for success or errors.

Let’s break down what each part of this code is doing step by step.

#### State variables

```dart
bool _isSaving = false;
bool _isSharing = false;
```

1. `_isSaving` is used to track whether an image is currently being saved.
2. `_isSharing` is used to track whether an image is currently being shared.
3. These flags can be used to disable UI buttons, show a loading spinner, or prevent duplicate actions while the save/share process is in progress.

#### Capture function

```dart
Future<Uint8List?> _capture() async {
  return captureWidgetToPngBytes(_captureKey, pixelRatio: 3.0);
}
```

1. This function captures a Flutter widget (referenced by `_captureKey`) and converts it into PNG image bytes (`Uint8List`).
2. `pixelRatio: 3.0` ensures the captured image is high resolution (3x the screen density).
3. It returns the raw PNG bytes that can later be saved or shared.

#### Save function

```dart
Future<void> _saveImage() async {
  setState(() => _isSaving = true);
  try {
    final granted = await PermissionService.requestSavePermission();
    if (!granted) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Permission required to save images.')),
        );
      }
      return;
    }
```

1. Sets `_isSaving` to `true` to indicate saving has started.
2. Requests storage/gallery permissions using `PermissionService`.
3. If permission is not granted, shows a `SnackBar` and stops.

```dart
    final bytes = await _capture();
    if (bytes == null) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to capture image.')),
        );
      }
      return;
    }
```

1. Captures the widget as PNG bytes.
2. If capture fails, shows an error and exits.

```dart
    final result = await GallerySaverService.savePngBytesToGallery(
      bytes,
      name: 'quote_${DateTime.now().millisecondsSinceEpoch}',
    );
```

1. Saves the PNG bytes into the device’s photo gallery.
2. A unique filename is generated using the current timestamp.

```dart
    if (mounted) {
      final ok = result != null;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(ok ? 'Image saved to gallery.' : 'Save failed.')),
      );
    }
  } catch (e) {
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    }
  } finally {
    if (mounted) setState(() => _isSaving = false);
  }
}
```

1. If saving succeeds, shows a success message; otherwise, shows failure.
2. If an exception occurs, shows an error with details.
3. Finally, resets `_isSaving` back to `false`.

#### Share function

```dart
Future<void> _shareImage() async {
  setState(() => _isSharing = true);
  try {
    final bytes = await _capture();
    if (bytes == null) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to capture image.')),
        );
      }
      return;
    }
    await ShareService.sharePngBytes(bytes, text: 'Here is a quote I wanted to share.');
```

1. Sets `_isSharing` to `true` at the start.
2. Captures the widget as PNG bytes.
3. If successful, calls `ShareService.sharePngBytes` to share the image with some text. This will typically open the system share sheet (WhatsApp, Email, and so on).

```dart
  } catch (e) {
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    }
  } finally {
    if (mounted) setState(() => _isSharing = false);
  }
}
```

1. If an error occurs, shows a `SnackBar`.
2. Resets `_isSharing` back to `false` after completion.

#### Summary:

1. `_capture()` converts a widget into an image (PNG bytes).
2. `_saveImage()` captures the widget, checks permissions, and saves it to the gallery while handling errors and state.
3. `_shareImage()` captures the widget and shares it using the system share options while handling errors and state.
4. `_isSaving` and `_isSharing` are flags that help manage UI state during operations.

---

## Testing the Flow

To test this setup, you’ll want to run it on a real device for the most accurate behavior.

First, tap Share. The share sheet should appear and allow sending the image via installed apps. Then tap Save. On some devices you may be prompted for permission – accept it. Check your Photos or Gallery app for the saved image.

If the image appears blurry, increase `pixelRatio` in `captureWidgetToPngBytes` to 3.0 or 4.0. Be mindful of memory.

---

## Troubleshooting and Common Pitfalls

There are a number of common issues you might come across while saving and sharing your Flutter widgets as images. But don’t worry – we’ll address a lot of them quickly and efficiently here.

First, let’s say the saved image is empty or black. To fix this, make sure that the widget is fully painted. We already wait briefly if `debugNeedsPaint` is true. Also, make sure the `RepaintBoundary` directly wraps the target content and not a parent that has zero size.

What if permission is denied on Android even though you allowed it? Well, some OEMs have aggressive storage policies. Try again, and confirm the app has Photos or Files access in system settings. If your targetSdk is very new, just make sure that your plugins are updated.

If the image isn’t visible in the Gallery, just give it a moment – some galleries index asynchronously. YOu can also try another gallery app to confirm the file exists.

If sharing fails on iOS simulator, some share targets are unavailable in the simulator. Just try testing on a real device.

Lastly, if you have blurry or jagged text, you can increase `pixelRatio` in `toImage` and add padding around the card so shadows and edges are captured cleanly.

---

## Enhancements and Alternatives

### Use a programmatic watermark or logo

Instead of capturing a plain `QuoteCard`, you can overlay a small brand logo or watermark widget before taking the screenshot. This helps with branding (users know where the quote came from) and discourages unauthorized reuse. A simple way is to wrap the card in a `Stack` and place a `Positioned` logo in a corner.

### Use dynamic backgrounds

Rather than using a flat color, you could make the captured quote more visually engaging by adding gradient fills or even image backgrounds. For example, a gradient background can subtly elevate the design, while thematic images can match the tone of the quote (e.g., nature shots for inspirational quotes). Flutter’s `BoxDecoration` with gradients or an `Image.asset`/[`Image.network`](http://Image.network) background makes this straightforward.

### Have multiple capture targets

If your app needs to capture more than just the quote card (for example, profile cards, stats, or receipts), you don’t want a single `GlobalKey`. A map of keys like `Map<String, GlobalKey>` lets you reference and capture the right widget dynamically. This adds flexibility and keeps your capture logic reusable across multiple UI components.

### Alternative packages

There are some other packages you can consider using, like:

- `screenshot`: Provides a higher-level API that can simplify screen capturing without manually juggling `RepaintBoundary` and keys. Particularly useful for capturing the entire screen or full widgets with less boilerplate.
- `widgets_to_image`: Another option that focuses on turning specific widgets into images with a slightly different API style. Could be more ergonomic depending on your use case.
- **PDF generation (**`printing` / `pdf`): If your use case involves creating shareable documents rather than images (e.g., a formatted quote booklet), these packages are a better fit since they work with vector-based content and are resolution-independent.

### Caching and performance

Capturing widgets frequently can create memory churn and slow down the app if every capture is re-rendered from scratch. Adding caching strategies (for example, keeping the last rendered image in memory) can reduce overhead. If you write captures to disk (outside of the OS’s temporary directories), make sure you clean them up after sharing to avoid filling up user storage. Throttling rapid captures (for example, debounce a “Save Quote” button) is also a good practice to keep the UI responsive.

---

## Conclusion

You now have a complete, production-ready approach for capturing a Flutter widget to an image, saving it to the gallery, and sharing it through the native share sheet. The key pieces are `RepaintBoundary` for pixel-perfect capture, careful handling of platform permissions, and small services that keep UI code clean. This pattern generalizes well to certificates, reports, memes, flashcards, and any other visual content your app creates.

If you prefer a more batteries-included path, the `screenshot` package can achieve a similar result with slightly different tradeoffs.

::: info References

<SiteInfo
  name="share_plus | Flutter package"
  desc="Flutter plugin for sharing content via the platform share UI, using the ACTION_SEND intent on Android and UIActivityViewController on iOS."
  url="https://pub.dev/packages/share_plus/"
  logo="https://pub.dev/static/hash-mcr6dg6e/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-mcr6dg6e/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="image_gallery_saver | Flutter package"
  desc="A flutter plugin for save image to gallery, iOS need to add the following keys to your Info.plist file."
  url="https://pub.dev/packages/image_gallery_saver/"
  logo="https://pub.dev/static/hash-mcr6dg6e/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-mcr6dg6e/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="path_provider | Flutter package"
  desc="Flutter plugin for getting commonly used locations on host platform file systems, such as the temp and app data directories."
  url="https://pub.dev/packages/path_provider/"
  logo="https://pub.dev/static/hash-mcr6dg6e/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-mcr6dg6e/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="Read and write files"
  desc="How to read from and write to files on disk."
  url="https://docs.flutter.dev/cookbook/persistence/reading-writing-files/"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Save and Share Flutter Widgets as Images – A Complete Production-Ready Guide",
  "desc": "In many apps, you may want users to be able to save or share visual content generated in the UI. Flutter doesn’t ship with a “save widget to image” API, but with RepaintBoundary plus a few small packages, you can capture any widget, save it to the de...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-save-and-share-flutter-widgets-as-images-a-complete-production-ready-guide.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
