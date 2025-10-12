---
lang: en-US
title: "How to Handle Permissions in Flutter: A Comprehensive Guide"
description: "Article(s) > How to Handle Permissions in Flutter: A Comprehensive Guide"
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
      content: "Article(s) > How to Handle Permissions in Flutter: A Comprehensive Guide"
    - property: og:description
      content: "How to Handle Permissions in Flutter: A Comprehensive Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-handle-permissions-in-flutter-for-beginners.html
prev: /programming/dart/articles/README.md
date: 2025-08-28
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756310343452/8db020d5-5cec-4b88-9a02-a8dc2a81190c.png
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
  name="How to Handle Permissions in Flutter: A Comprehensive Guide"
  desc="Permissions are crucial when building mobile applications that require access to device features such as location, camera, contacts, microphone, storage, and more. And handling permissions effectively ensures that your app provides a seamless user ex..."
  url="https://freecodecamp.org/news/how-to-handle-permissions-in-flutter-for-beginners"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1756310343452/8db020d5-5cec-4b88-9a02-a8dc2a81190c.png"/>

Permissions are crucial when building mobile applications that require access to device features such as location, camera, contacts, microphone, storage, and more. And handling permissions effectively ensures that your app provides a seamless user experience while respecting privacy and security requirements.

In Flutter, one of the most popular packages to manage permissions is [<VPIcon icon="fas fa-globe"/>`permission_handler`](https://pub.dev/packages/permission_handler). This article will guide you through how to:

1. Install and set up `permission_handler` and `fluttertoast`
2. Request and handle different permissions
3. Understand what each permission does and its use cases
4. Handling Android and iOS configurations
5. Implement best practices
6. Handle testing permissions
7. Provide expected outcomes and conclusions

::: note  Prerequisites

Before starting, ensure you have the following:

1. Flutter SDK installed (version 3.0.0 or higher recommended)
2. A code editor such as Android Studio or VS Code
3. Basic understanding of Flutter widgets, async/await in Dart, and state management
4. A physical device (recommended) or emulator/simulator
5. Internet connection to install dependencies

:::

---

## 2. Installing Dependencies

To get started, add the following to your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` file:

```yaml title="pubspec.yaml"
dependencies:
  permission_handler: ^11.3.1
  fluttertoast: ^8.2.4
```

Then run:

```sh
flutter pub get
```

- `permission_handler` is used to request and check permissions on Android and iOS.
- `fluttertoast` allows you to display messages to users when permissions are granted or denied.

---

## 3. Understanding Permission States

When requesting permissions with `permission_handler`, you can get the following states:

1. `isGranted` - The permission is granted.
2. `isDenied` - The permission is denied, but can be requested again.
3. `isPermanentlyDenied` - The permission is permanently denied, meaning the user must enable it from **app settings**.
4. `isRestricted` - The permission is restricted by the system (common on iOS).
5. `isLimited` - Partial access granted (mainly iOS photo library).

---

## 4. Reusable Permission Handling Function

Instead of writing multiple functions for each permission, we’ll create a reusable function:

```dart
import 'package:permission_handler/permission_handler.dart';
import 'package:fluttertoast/fluttertoast.dart';

Future<void> handlePermission(Permission permission, String name) async {
  var status = await permission.request();

  if (status.isGranted) {
    Fluttertoast.showToast(msg: '$name permission granted');
  } else if (status.isPermanentlyDenied) {
    Fluttertoast.showToast(msg: '$name permission permanently denied. Enable it in settings.');
    openAppSettings();
  } else if (status.isRestricted) {
    Fluttertoast.showToast(msg: '$name permission restricted by system.');
  } else if (status.isLimited) {
    Fluttertoast.showToast(msg: '$name permission limited access granted.');
  } else {
    Fluttertoast.showToast(msg: '$name permission denied');
  }
}
```

Usage example:

```dart
await handlePermission(Permission.camera, "Camera");
await handlePermission(Permission.location, "Location");
```

---

## 5. Permissions, Their Use Cases, and Examples

Let’s now look at a bunch of different types of permissions you might have to enable in your Flutter apps. I’ll explain what the permission does and its common use cases as well.

### 5.1 Calendar Permissions

- **Permission**: `calendar`, `calendarReadOnly`, `calendarFullAccess`
- **What it does**: Accesses the user’s calendar to read or write events.
- **Use case**: Event apps, scheduling apps.

```dart
await handlePermission(Permission.calendar, "Calendar");
```

### 5.2 Camera Permission

- **Permission**: `camera`
- **What it does**: Access device camera for capturing photos/videos.
- **Use case**: QR scanning, photo apps, video recording.

```dart
await handlePermission(Permission.camera, "Camera");
```

### 5.3 Contacts Permission

- **Permission**: `contacts`
- **What it does**: Read or modify user contacts.
- **Use case**: Messaging apps, social networking apps.

```dart
await handlePermission(Permission.contacts, "Contacts");
```

### 5.4 Location Permissions

- **Permission**: `location`, `locationAlways`, `locationWhenInUse`
- **What it does**: Access user’s location.
- **Use case**: Navigation apps, ride-hailing apps, geofencing.

```dart
await handlePermission(Permission.locationWhenInUse, "Location");
```

### 5.5 Media Library (iOS only)

- **Permission**: `mediaLibrary`
- **What it does**: Access media files on iOS devices.
- **Use case**: Photo sharing apps, media editors.

```dart
await handlePermission(Permission.mediaLibrary, "Media Library");
```

### 5.6 Microphone Permission

- **Permission**: `microphone`
- **What it does**: Record audio.
- **Use case**: Voice notes, video calls, voice commands.

```dart
await handlePermission(Permission.microphone, "Microphone");
```

### 5.7 Phone Permission

- **Permission**: `phone`
- **What it does**: Access phone state, make calls, read call logs.
- **Use case**: Telephony apps, call management apps.

```dart
await handlePermission(Permission.phone, "Phone");
```

### 5.8 Photos Permissions

- **Permission**: `photos`, `photosAddOnly`
- **What it does**: Access or add photos to user library.
- **Use case**: Media apps, social apps.

```dart
await handlePermission(Permission.photos, "Photos");
```

### 5.9 Reminders Permission

- **Permission**: `reminders`
- **What it does**: Access and manage device reminders.
- **Use case**: To-do apps, productivity apps.

```dart
await handlePermission(Permission.reminders, "Reminders");
```

### 5.10 Sensors Permissions

- **Permission**: `sensors`, `sensorsAlways`
- **What it does**: Access device sensors like accelerometer or gyroscope.
- **Use case**: Fitness apps, motion tracking apps.

```dart
await handlePermission(Permission.sensors, "Sensors");
```

### 5.11 SMS Permission

- **Permission**: `sms`
- **What it does**: Read or send SMS messages.
- **Use case**: OTP verification, messaging apps.

```dart
await handlePermission(Permission.sms, "SMS");
```

### 5.12 Speech Recognition Permission

- **Permission**: `speech`
- **What it does**: Use speech-to-text features.
- **Use case**: Voice commands, dictation apps.

```dart
await handlePermission(Permission.speech, "Speech Recognition");
```

### 5.13 Storage Permissions

- **Permission**: `storage`, `manageExternalStorage`
- **What it does**: Access internal/external storage to read/write files.
- **Use case**: File managers, download managers.

```dart
await handlePermission(Permission.storage, "Storage");
```

### 5.14 Ignore Battery Optimizations

- **Permission**: `ignoreBatteryOptimizations`
- **What it does**: Request to exclude app from battery optimizations.
- **Use case**: Alarm apps, background services.

```dart
await handlePermission(Permission.ignoreBatteryOptimizations, "Battery Optimizations");
```

### 5.15 Notifications

- **Permission**: `notification`
- **What it does**: Allow sending notifications.
- **Use case**: Messaging, reminders, alerts.

```dart
await handlePermission(Permission.notification, "Notifications");
```

### 5.16 Bluetooth Permissions

- **Permission**: `bluetooth`, `bluetoothScan`, `bluetoothAdvertise`, `bluetoothConnect`
- **What it does**: Manage or connect to Bluetooth devices.
- **Use case**: Wearables, IoT devices, headphones.

```dart
await handlePermission(Permission.bluetooth, "Bluetooth");
```

### 5.17 App Tracking Transparency (iOS only)

- **Permission**: `appTrackingTransparency`
- **What it does**: Request tracking permission for personalized ads.
- **Use case**: Analytics, advertising, user tracking.

```dart
await handlePermission(Permission.appTrackingTransparency, "App Tracking");
```

---

## 6. Android Manifest Configuration

On **Android**, all apps must declare the permissions they intend to use in the <VPIcon icon="fa-brands fa-android"/>`AndroidManifest.xml` file. This acts as the app’s “contract” with the system, letting Android know what sensitive resources (like internet, location, camera) the app might request.

Without declaring these in the manifest, runtime permission requests will fail, even if you’ve added the `permission_handler` package.

For example, if you try to access the camera without first declaring the camera permission here, your app will crash or fail when requesting it at runtime.

Below is a comprehensive list of common permissions:

```xml :collapsed-lines title="AndroidManifest.xml"
<!-- Camera access for taking pictures or recording videos -->
<uses-permission android:name="android.permission.CAMERA" />

<!-- Read user contacts (e.g., for social features, friend finder) -->
<uses-permission android:name="android.permission.READ_CONTACTS" />

<!-- Fine-grained location (GPS) for maps, navigation, geofencing -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

<!-- Coarse location (network-based, less accurate, uses WiFi/Cell) -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

<!-- Record audio from the microphone (e.g., voice notes, calls) -->
<uses-permission android:name="android.permission.RECORD_AUDIO" />

<!-- Read external storage (access user’s files like images, docs) -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

<!-- Write to external storage (save downloaded files, photos) -->
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

<!-- Send SMS directly from the app -->
<uses-permission android:name="android.permission.SEND_SMS" />

<!-- Receive SMS (read OTP messages for login/verification) -->
<uses-permission android:name="android.permission.RECEIVE_SMS" />

<!-- Read SMS messages (OTP autofill, chat backup restore) -->
<uses-permission android:name="android.permission.READ_SMS" />

<!-- Bluetooth usage (connect to Bluetooth devices like headsets, printers) -->
<uses-permission android:name="android.permission.BLUETOOTH" />

<!-- Bluetooth Admin (manage paired devices, discover nearby devices) -->
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />

<!-- Bluetooth Scan (needed from Android 12+) -->
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />

<!-- Bluetooth Connect (needed from Android 12+) -->
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />

<!-- Bluetooth Advertise (for beacon-style apps, Android 12+) -->
<uses-permission android:name="android.permission.BLUETOOTH_ADVERTISE" />

<!-- Ignore battery optimizations (keep app alive in background tasks) -->
<uses-permission android:name="android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS" />

<!-- Internet access (needed for network requests, APIs, file uploads) -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- Check if a network connection exists (WiFi/Mobile data) -->
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- Access WiFi state (check SSID, connection info, used for network control) -->
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />

<!-- Change WiFi state (enable/disable WiFi programmatically) -->
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />

<!-- Access phone state (read device ID, SIM details, call status) -->
<uses-permission android:name="android.permission.READ_PHONE_STATE" />

<!-- Make phone calls directly from the app -->
<uses-permission android:name="android.permission.CALL_PHONE" />

<!-- Use fingerprint authentication (for biometric login) -->
<uses-permission android:name="android.permission.USE_FINGERPRINT" />

<!-- Use Biometric authentication (newer than fingerprint, includes face) -->
<uses-permission android:name="android.permission.USE_BIOMETRIC" />
```

---

## 7. iOS <VPIcon icon="fa-brands fa-apple"/>`Info.plist` Configuration

For iOS, you must provide descriptive keys in the <VPIcon icon="fa-brands fa-apple"/>`Info.plist` file to inform users why your app needs specific permissions. Below are the configurations for each permission example:

### 1. Camera Permission

```xml title="Info.plist"
<key>NSCameraUsageDescription</key>
<string>We need access to your camera for taking pictures.</string>
```

### 2. Contacts Permission

```xml title="Info.plist"
<key>NSContactsUsageDescription</key>
<string>We need access to your contacts for better communication.</string>
```

### 3. Location Permissions

```xml title="Info.plist"
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need access to your location to provide location-based services.</string>
<key>NSLocationAlwaysUsageDescription</key>
<string>We need access to your location to track your movement even when the app is not active.</string>
```

### 4. Media Library/Storage Permission

```xml title="Info.plist"
<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photos for sharing or uploading media.</string>
```

### 5. Microphone Permission

```xml title="Info.plist"
<key>NSMicrophoneUsageDescription</key>
<string>We need access to your microphone for voice recording.</string>
```

### 6. Phone Permission

```xml title="Info.plist"
<key>NSPhoneUsageDescription</key>
<string>We need access to phone services to enable calls.</string>
```

### 7. Photos Permission

```xml title="Info.plist"
<key>NSPhotoLibraryAddUsageDescription</key>
<string>We need permission to add photos to your library.</string>
```

### 8. Reminders Permission

```xml title="Info.plist"
<key>NSRemindersUsageDescription</key>
<string>We need access to your reminders for task management.</string>
```

### 9. Sensors Permission

```xml title="Info.plist"
<key>NSSensorsUsageDescription</key>
<string>We need access to your sensors for fitness tracking.</string>
```

### 10. SMS Permission

::: note

Handled automatically by iOS if SMS services are requested

:::

### 11. Speech Recognition Permission

```xml title="Info.plist"
<key>NSSpeechRecognitionUsageDescription</key>
<string>We need access to speech recognition for voice commands.</string>
```

### 12. Ignore Battery Optimizations

::: note

Not applicable on iOS


:::

### 13. Notifications Permission

```xml title="Info.plist"
<key>NSUserNotificationUsageDescription</key>
<string>We need permission to send notifications.</string>
```

### 14. Access Media Location Permission

::: note

Handled automatically on iOS

:::

### 15. Activity Recognition Permission

```xml title="Info.plist"
<key>NSMotionUsageDescription</key>
<string>We need access to motion data for fitness tracking.</string>
```

### 16. Bluetooth Permissions

```xml title="Info.plist"
<key>NSBluetoothPeripheralUsageDescription</key>
<string>We need access to Bluetooth for device connectivity.</string>
```

### 17. App Tracking Transparency

```xml title="Info.plist"
<key>NSUserTrackingUsageDescription</key>
<string>We need permission to track your activity across apps and websites for personalized ads.</st
```

---

## 8. Expected Outcomes

By implementing permissions and connectivity checks this way, your Flutter app will:

1. Request permissions dynamically at runtime in a user-friendly way.
2. Handle all possible states gracefully, including granted, denied, permanently denied, restricted, and limited.
3. Provide users with meaningful feedback, guiding them to settings if necessary.
4. Maintain compliance with Android and iOS permission policies while ensuring security and transparency.
5. Listen continuously to network connectivity changes via the global BLoC listener.
6. Notify users instantly with a toast/snackbar whenever internet status changes (connected/disconnected).
7. Reduce redundant API calls and improve UX by avoiding “fake” offline or cached-only states.

---

## Best Practices for Handling Permissions in Flutter

There are some common best practices you should follow when handling permissions in Flutter.

### 1. Request only necessary permissions

Ask only for the permissions your app truly needs. For example, if your app just uploads images, you probably only need **storage/photos access**, not location, contacts, or SMS.

```dart
final status = await Permission.photos.request();
if (status.isGranted) {
  // Proceed with photo upload
}
```

### 2. Explain why permissions are needed

Always tell the user *why* you’re asking for a sensitive permission before the system dialog appears. This helps build trust.

Example of a custom dialog before requesting:

```dart
Future<void> _showPermissionRationale(BuildContext context) async {
  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: Text("Camera Access Needed"),
      content: Text("We need access to your camera so you can take profile photos."),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.pop(context);
            Permission.camera.request();
          },
          child: Text("Allow"),
        ),
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text("Cancel"),
        ),
      ],
    ),
  );
}
```

### 3. Use runtime permission requests

On Android 6.0+ and iOS, permissions must be requested **at runtime** (not just declared in <VPIcon icon="fa-brands fa-android"/>`AndroidManifest.xml` or <VPIcon icon="fa-brands fa-apple"/>`Info.plist`).

```dart
final status = await Permission.location.request();
if (status.isGranted) {
  // Use location
}
```

### 4. Handle denial gracefully

Don’t block the entire app when permissions are denied. Provide alternative flows.

For example, instead of forcing camera access:

```dart
if (await Permission.camera.isDenied) {
  // Offer file upload as fallback
  _pickImageFromGallery();
}
```

This way, users can still use your app without being forced.

### 5. Handle permanent denials

When a user selects *“Don’t ask again”* (Android) or disables a permission in Settings (iOS), you should guide them to **Settings**.

```dart
if (await Permission.camera.isPermanentlyDenied) {
  openAppSettings(); // Takes user to app settings
}
```

UX Example:

- Show a snackbar: *“Camera access is required. Enable it in Settings.”* with a **Go to Settings** button.

### 6. Test on both platforms

Permissions behave differently across Android and iOS. Example:

- iOS may return limited photo library access.
- Android 13+ has new granular media permissions (`READ_MEDIA_IMAGES`, `READ_MEDIA_VIDEO`).

Always test all scenarios:

- Granted
- Denied once
- Denied permanently
- Limited (iOS only)

### 7. Follow platform guidelines

Make sure your manifest and Info.plist contain clear explanations.

::: tip <VPIcon icon="fa-brands fa-apple"/>`Info.plist` example (iOS)

```xml
<key>NSCameraUsageDescription</key>
<string>This app requires camera access to let you take profile pictures.</string>
```

This is required for App Store approval.

:::

### 8. Avoid over-permissioning

Example: Don’t request SMS if you only need phone number autofill. Users will abandon your app if they see irrelevant requests.

**Bad**:

```xml title=AndroidManifest.xml"
<uses-permission android:name="android.permission.SEND_SMS" />
```

Just use `READ_PHONE_NUMBERS` if that’s the actual need.

### 9. Use a centralized permission manager

Instead of scattering requests across the app, create a PermissionService that handles all requests consistently.

```dart
class PermissionService {
  Future<bool> requestCamera() async {
    final status = await Permission.camera.request();
    return status.isGranted;
  }

  Future<bool> requestLocation() async {
    final status = await Permission.location.request();
    return status.isGranted;
  }
}
```

This keeps permission handling uniform.

### 10. Monitor permission changes

Permissions can change while the app is open (user goes to Settings and disables it). Always check before use.

```dart
@override
void initState() {
  super.initState();
  Timer.periodic(Duration(seconds: 5), (timer) async {
    final cameraStatus = await Permission.camera.status;
    if (!cameraStatus.isGranted) {
      // Disable camera UI
    }
  });
}
```

---

## Conclusion

Permissions are fundamental for building fully functional and secure mobile applications. Using `permission_handler` in Flutter allows you to manage permissions across Android and iOS efficiently.

And just remember: always request only necessary permissions, provide clear explanations, and handle all possible states to maintain trust with users.

By combining correct permission logic with proper AndroidManifest and Info.plist setup, you ensure a seamless user experience while staying compliant with platform guidelines.

::: info References

<SiteInfo
  name="permission_handler | Flutter package"
  desc="Permission plugin for Flutter. This plugin provides a cross-platform (iOS, Android) API to request and check permissions."
  url="https://pub.dev/packages/permission_handler/"
  logo="https://pub.dev/static/hash-fepf1d0b/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-fepf1d0b/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="Take a picture using the camera"
  desc="How to use a camera plugin on mobile."
  url="https://docs.flutter.dev/cookbook/plugins/picture-using-camera/"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

<SiteInfo
  name="Permissions on Android  |  Privacy  |  Android Developers"
  desc="App permissions help support user privacy by protecting access to the following: Restricted data, such as system state and users' contact informatio Restricted actions, such as connecting to a paired device and recording audio"
  url="https://developer.android.com/guide/topics/permissions/overview/"
  logo="https://gstatic.com/devrel-devsite/prod/v456243cc4559a4a6b20c070637855bec9b45a539cf460e1eddd6b80c804aa73e/android/images/favicon.svg"
  preview="https://developer.android.com/static/images/social/android-developers.png"/>

<SiteInfo
  name="Information Property List | Apple Developer Documentation"
  desc="A resource containing key-value pairs that identify and configure a bundle."
  url="https://developer.apple.com/documentation/bundleresources/information-property-list/"
  logo="https://developer.apple.com/favicon.ico"
  preview="https://developer.apple.com/tutorials/developer-og.jpg"/>

<SiteInfo
  name="fluttertoast | Flutter package"
  desc="Toast Library for Flutter, Easily create toast messages in single line of code"
  url="https://pub.dev/packages/fluttertoast/"
  logo="https://pub.dev/static/hash-fepf1d0b/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-fepf1d0b/img/pub-dev-icon-cover-image.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Handle Permissions in Flutter: A Comprehensive Guide",
  "desc": "Permissions are crucial when building mobile applications that require access to device features such as location, camera, contacts, microphone, storage, and more. And handling permissions effectively ensures that your app provides a seamless user ex...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-handle-permissions-in-flutter-for-beginners.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
