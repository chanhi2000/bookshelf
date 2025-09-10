---
lang: en-US
title: "How to Secure Mobile APIs in Flutter"
description: "Article(s) > How to Secure Mobile APIs in Flutter"
icon: fa-brands fa-dart-lang
category: 
  - Dart
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Secure Mobile APIs in Flutter"
    - property: og:description
      content: "How to Secure Mobile APIs in Flutter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-secure-mobile-apis-in-flutter.html
prev: /programming/dart/articles/README.md
date: 2025-05-07
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746626043471/57ea35c5-44b8-4eee-b713-ca9e735d7fe7.png
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
  name="How to Secure Mobile APIs in Flutter"
  desc="As mobile applications continue to evolve in functionality and scope, securing the APIs that power these apps has become more critical than ever. In the context of Flutter, a framework that enables cross-platform development, understanding how to sec..."
  url="https://freecodecamp.org/news/how-to-secure-mobile-apis-in-flutter"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746626043471/57ea35c5-44b8-4eee-b713-ca9e735d7fe7.png"/>

As mobile applications continue to evolve in functionality and scope, securing the APIs that power these apps has become more critical than ever.

In the context of Flutter, a framework that enables cross-platform development, understanding how to secure mobile APIs is essential - not only for maintaining user trust but also for safeguarding sensitive business data.

In this article, we’ll explore common API vulnerabilities in mobile applications, particularly Flutter apps, and outline practical strategies to mitigate these risks.

Securing API keys in a Flutter application is essential to prevent unauthorized access to sensitive resources. API keys are often used for authentication with external services - but if they’re exposed, they can lead to security vulnerabilities.

In this guide, we will discuss how to securely store and manage API keys using Firebase Remote Config, Flutter Secure Storage, AES encryption, and device-specific identifiers.

There are several ways to manage API keys securely, including:

- **CI/CD Solutions**: Services like Codemagic, CircleCI, and GitHub Actions allow you to store API keys as environment variables to keep them out of your codebase.
- **Backend Storage**: Keeping API keys on a backend server and fetching them dynamically is another secure approach.
- **Keystore & Keychain**: On Android and iOS, API keys can be securely stored using the device's built-in keystore mechanisms.
- **Encrypted Storage**: Using encrypted local storage solutions to save API keys on the device.

---

## Why API Security Matters in Mobile Apps

APIs serve as the bridge between mobile applications and backend services. While they enable dynamic experiences, such as fetching user data, processing payments, and managing real-time content, they also become a major attack vector if left unsecured.

Mobile applications, unlike web apps, are distributed in compiled form (for example, APKs). These can be decompiled to reveal logic, endpoints, and sometimes even secrets like API keys.

Attackers may reverse engineer APKs, intercept traffic using proxy tools like Burp Suite, or abuse API endpoints via emulators or scripts. This can lead to data breaches, unauthorized data manipulation, or service disruption.

Publicly exposing API keys in your Flutter application can lead to unauthorized access and potential abuse. This can result in quota exhaustion, service disruptions, or even security breaches. Using Firebase Remote Config, encryption, and secure local storage, we can keep API keys safe.

### Project Setup Example:

For this example, we will focus on using **Firebase Remote Config** to securely retrieve API keys, encrypt them before storing them locally, and decrypt them when needed.

We will structure an implementation using the following:

- <VPIcon icon="fa-brands fa-dart-lang"/>`remote_config.dart`: Handles fetching and encrypting API keys.
- <VPIcon icon="fa-brands fa-dart-lang"/>`global_config.dart`: Initializes Firebase, loads environment variables, and ensures API keys are available.
- <VPIcon icon="fa-brands fa-dart-lang"/>`main.dart`: Starts the application and initializes configurations.
- <VPIcon icon="fa-brands fa-dart-lang"/>`app_strings.dart`: Stores constant values used throughout the project.

#### Step 1: Setting Up Environment Variables

Create a <VPIcon icon="fas fa-file-lines"/>`.env` file in your Flutter project root directory and define your encryption key:

```sh title=".env"
ENCRYPTION_KEY=32-character-secure-key-here
```

Add `flutter_dotenv` to your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`:

```yaml title="pubspec.yaml"
dependencies:
  flutter:
    sdk: flutter
  encrypt: ^5.0.3
  flutter_dotenv: ^5.2.1
  device_info_plus: ^11.3.0
  firebase_remote_config: ^5.4.0
  flutter_secure_storage: ^9.0.0
```

Run:

```sh
flutter pub get
```

#### Step 2: Secure Storage and Encryption

### <VPIcon icon="fa-brands fa-dart-lang"/>`app_strings.dart`

Define constants used throughout the project:

```dart title="app_strings.dart"
class AppStrings {
  static const String ENCRYPTION_KEY = "ENCRYPTION_KEY";
  static const String DEVICE_ID = "DEVICE_ID";
  static const String YOU_VERIFY_API_KEY = "YOU_VERIFY_API_KEY";
  static const String GEMINI_API_KEY = "GEMINI_API_KEY";
}
```

### <VPIcon icon="fa-brands fa-dart-lang"/>`remote_config.dart`

Handles secure retrieval and storage of API keys using **AES encryption**. This is a big one, so I’ll break down each part after the code block:

```dart :collapsed-lines title="remote_config.dart"
import 'dart:io';
import 'package:device_info_plus/device_info_plus.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:firebase_remote_config/firebase_remote_config.dart';
import '../constants/app_strings.dart';
import '../../../domain/models/custom_error/custom_error.dart';
import 'package:encrypt/encrypt.dart' as encrypt;
import 'package:flutter_dotenv/flutter_dotenv.dart';

class RemoteConfig {
  static final FlutterSecureStorage _storage = FlutterSecureStorage();
  static encrypt.Encrypter? _encrypter;

  // Initialize AES encryption
  static Future<void> initializeEncrypter() async {
    encrypt.Key key = await _generateEncryptionKey();
    _encrypter = encrypt.Encrypter(encrypt.AES(key, mode: encrypt.AESMode.cbc));
  }

  static encrypt.Encrypter getEncrypter() {
    if (_encrypter == null) {
      initializeEncrypter();
    }
    return _encrypter!;
  }

  // Generate a secure encryption key using env variable and device ID
  static Future<encrypt.Key> _generateEncryptionKey() async {
    String envKey = dotenv.env[AppStrings.ENCRYPTION_KEY] ?? "default_secure_key";
    String deviceId = await _getDeviceId();
    String combinedKey = (envKey + deviceId).substring(0, 32);
    return encrypt.Key.fromUtf8(combinedKey);
  }

  // Fetch device ID and store it securely
  static Future<String> _getDeviceId() async {
    String? storedDeviceId = await _storage.read(key: AppStrings.DEVICE_ID);

    if (storedDeviceId != null) {
      return storedDeviceId;
    }

    DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
    String deviceId;

    if (Platform.isAndroid) {
      AndroidDeviceInfo androidInfo = await deviceInfo.androidInfo;
      deviceId = androidInfo.id;
    } else if (Platform.isIOS) {
      IosDeviceInfo iosInfo = await deviceInfo.iosInfo;
      deviceId = iosInfo.identifierForVendor ?? "fallbackDeviceId";
    } else {
      deviceId = "fallbackDeviceId";
    }

    await _storage.write(key: AppStrings.DEVICE_ID, value: deviceId);
    return deviceId;
  }

  // Fetch and encrypt API keys
  static Future<void> fetchApiKey({required String apiKeyName}) async {
    String key = ';
    try {
      final remoteConfig = FirebaseRemoteConfig.instance;
      await remoteConfig.setConfigSettings(
        RemoteConfigSettings(
          fetchTimeout: const Duration(seconds: 10),
          minimumFetchInterval: const Duration(seconds: 10),
        ),
      );
      await remoteConfig.fetchAndActivate();
      key = remoteConfig.getString(apiKeyName);
    } catch (e) {
      if (kDebugMode) {
        print(e);
      }
      throw CustomError(
        errorMsg: "ERROR Retrieving $apiKeyName (${e.toString()})",
        code: "configuration_error",
        plugin: "",
      );
    }

    final iv = encrypt.IV.fromSecureRandom(16);
    final encryptedKey = _encrypter?.encrypt(key, iv: iv).base64;

    await _storage.write(key: apiKeyName, value: encryptedKey);
    await _storage.write(key: "${apiKeyName}_iv", value: iv.base64);
  }

  static final Map<String, String> _decryptedKeysCache = {};

  // Retrieve and decrypt stored API keys
  static Future<String?> getApiKey({required String key}) async {
    if (_decryptedKeysCache.containsKey(key)) {
      return _decryptedKeysCache[key];
    }

    try {
      final encryptedKey = await _storage.read(key: key);
      final ivString = await _storage.read(key: "${key}_iv");

      if (encryptedKey != null && ivString != null) {
        final iv = encrypt.IV.fromBase64(ivString);
        final encrypted = encrypt.Encrypted.fromBase64(encryptedKey);
        final decryptedKey = _encrypter?.decrypt(encrypted, iv: iv);

        _decryptedKeysCache[key] = decryptedKey!;
        return decryptedKey;
      }
    } catch (e) {
      throw CustomError(
        errorMsg: "ERROR Retrieving $key (${e.toString()})",
        code: "configuration_error",
        plugin: "",
      );
    }

    return null;
  }
}
```

This `RemoteConfig` class securely fetches, encrypts, stores, and retrieves sensitive API keys using Firebase Remote Config, AES encryption, secure storage, and device-specific information.

Here's a breakdown of what’s going on:

#### 1. Dependencies and Imports

- `dart:io`: For platform-specific checks (Android, iOS).
- `device_info_plus`: To get a unique device identifier.
- `flutter_secure_storage`: For secure local key-value storage.
- `firebase_remote_config`: To fetch API keys or configurations from Firebase.
- `encrypt`: For AES encryption and decryption.
- `flutter_dotenv`: To read environment variables.
- `CustomError`: A custom error model used for error handling.
- `AppStrings`: Presumably holds constant strings like keys.

#### 2. Class Properties

```dart
static final FlutterSecureStorage _storage = FlutterSecureStorage();
static encrypt.Encrypter? _encrypter;
```

- `_storage`: For securely storing encrypted keys and IVs.
- `_encrypter`: Used to encrypt and decrypt data using AES.

#### 3. `initializeEncrypter()`

```dart
static Future<void> initializeEncrypter() async
```

- Sets up the AES encryptor using a combination of a <VPIcon icon="fas fa-file-lines"/>`.env` key and the device ID to generate a 32-byte key.
- Uses AES CBC mode.

#### 4. `getEncrypter()`

```dart
static encrypt.Encrypter getEncrypter()
```

- Returns the existing encryptor or calls `initializeEncrypter()` if it's not yet initialized.

#### 5. `_generateEncryptionKey()`

```dart
static Future<encrypt.Key> _generateEncryptionKey()
```

- Combines an environment variable (`ENCRYPTION_KEY`) and the device ID to produce a 32-character key.
- Returns an AES key (`encrypt.Key.fromUtf8`).

#### 6. `_getDeviceId()`

```dart
static Future<String> _getDeviceId()
```

- Checks if a device ID is already securely stored. If not, gets it from the device (Android: `androidInfo.id`, iOS: `identifierForVendor`).
- Stores the device ID securely for future use.

#### 7. `fetchApiKey()`

```dart
static Future<void> fetchApiKey({required String apiKeyName})
```

- Fetches the specified API key from Firebase Remote Config.
- Encrypts the key using AES and a random IV (initialization vector).
- Stores both the encrypted key and the IV securely.

#### 8. `getApiKey()`

```dart
static Future<String?> getApiKey({required String key})
```

- Retrieves and decrypts the encrypted API key.
- If already decrypted and cached in memory, returns it immediately.
- Otherwise:
  - Reads the encrypted key and IV from secure storage.
  - Decrypts the key and returns it.
  - Caches the decrypted result in `_decryptedKeysCache`.

#### 9. Error Handling

Custom `CustomError` exceptions are thrown if Firebase fetch or decryption fails.

This class is built to:

- Securely fetch API keys from Firebase.
- Encrypt them using a key tied to both an environment variable and the specific device.
- Store them locally in an encrypted form.
- Allow retrieval and decryption with in-memory caching to minimize processing overhead.

#### Step 3: Global Initialization

### <VPIcon icon="fa-brands fa-dart-lang"/>`global_config.dart`

Handles Firebase initialization, dependency injection, and API key retrieval:

```dart :collapsed-lines title="global_config.dart"
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:injectable/injectable.dart';
import 'remote_config.dart';
import 'app_strings.dart';

class GlobalConfig {
  static Future<void> fetchRequiredApiKeys() async {
    final apiKeys = [
      AppStrings.YOU_VERIFY_API_KEY,
      AppStrings.GEMINI_API_KEY,
    ];
    for (final keyName in apiKeys) {
      await RemoteConfig.fetchApiKey(apiKeyName: keyName);
    }
  }

  static Future<void> initConfig() async {
    WidgetsFlutterBinding.ensureInitialized();
    await Firebase.initializeApp();
    await dotenv.load(fileName: ".env");
    await RemoteConfig.initializeEncrypter();
    await fetchRequiredApiKeys();
  }
}
```

#### Step 4: Utilizing the API Key in UI

### <VPIcon icon="fa-brands fa-dart-lang"/>`main.dart`

Initializes the application:

```dart title="main.dart"
import 'package:flutter/material.dart';
import 'global_config.dart';

Future<void> main() async {
  await GlobalConfig.initConfig();
  runApp(MyApp());
}
```

#### Step 5: Fetching API Key in Widget

```dart
String apiKey = "";

@override
void initState() {
  super.initState();
  fetchAPIKey();
}

void fetchAPIKey() async {
  try {
    final key = await RemoteConfig.getApiKey(key: AppStrings.GEMINI_API_KEY) ?? "";
    setState(() {
      apiKey = key;
    });
  } catch (e) {
    print("Error fetching API key: $e");
  }
}
```

---

## Common Vulnerabilities in Flutter Apps

### 1. Hardcoding Secrets

Storing API keys or secrets in the codebase (even in `.env` or `.dart` files) is one of the most dangerous mistakes. Tools like `apktool` can extract these secrets easily from the compiled binary.

::: warning

**Avoid this:**

```dart
// Do not hardcode keys
const apiKey = 'YOUR_SECRET_API_KEY';
```

Hardcoding secrets is unsafe because when the APK is reverse-engineered, anyone can read those values and misuse your APIs.

**Use secure storage instead:**

```dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = FlutterSecureStorage();
await storage.write(key: 'api_key', value: 'your_api_key');
final apiKey = await storage.read(key: 'api_key');
```

Using `flutter_secure_storage` stores secrets securely in platform-specific secure storage mechanisms like Android's Keystore or iOS's Keychain.

:::

### 2. Lack of SSL/TLS Enforcement (MITM Attacks)

A Man-in-the-Middle (MITM) attack occurs when an attacker intercepts and potentially alters communication between two parties. This is especially dangerous in unsecured HTTP connections, as sensitive information like login credentials and API keys can be stolen or modified.

#### How SSL/TLS Secures Code:

Secure Sockets Layer (SSL) and Transport Layer Security (TLS) are cryptographic protocols that ensure encrypted communication between a client and a server. This prevents MITM attacks by ensuring that the data is encrypted and cannot be read or altered while in transit. The connection is established over HTTPS (which is HTTP over SSL/TLS).

::: tip Code Example to Enforce SSL/TLS:

```dart
import 'package:http/http.dart' as http;

void makeSecureRequest() async {
  final response = await http.get(Uri.parse('https://yourapi.com/endpoint'));

  if (response.statusCode == 200) {
    // Handle successful response
  } else {
    // Handle error
  }
}
```

In this case, making sure that the URL starts with `https://` enforces the use of SSL/TLS for secure communication

:::

### 3. Weak Authentication

Weak authentication methods are those that are easily guessed or bypassed, such as simple passwords, lack of multi-factor authentication, or weak hashing mechanisms.

Instead, you should use robust authentication methods like Firebase and OAuth.

- **Firebase Authentication** provides various authentication methods such as email/password login, Google sign-in, and phone number authentication. It is a secure and easy-to-implement solution.
- **OAuth** is a protocol that allows third-party services (like Google or Facebook) to securely authenticate users without exposing their password to your app. OAuth uses tokens for authorization, ensuring that user credentials are not compromised.

#### Use Firebase Auth or OAuth2:

```dart
import 'package:firebase_auth/firebase_auth.dart';

final FirebaseAuth _auth = FirebaseAuth.instance;
UserCredential userCredential = await _auth.signInWithEmailAndPassword(
  email: 'user@example.com',
  password: 'securePassword',
);
final token = await userCredential.user?.getIdToken();
```

Token-based authentication allows the backend to verify the identity of the user securely without relying on session cookies. Firebase Authentication handles token generation, validation, and expiration for you.

### 4. Insufficient Authorization Checks

Authorization checks are necessary to ensure that the authenticated user has the required permissions to perform certain actions. For example, an admin user may have access to all endpoints, while a regular user may only have access to limited resources.

#### How to Verify User Roles/Permissions:

On the server side, roles and permissions are typically stored in a database. When a user makes a request, the server checks their role and compares it against the required permissions for the requested resource.

::: tip Code Example:

```dart
// Assuming user roles are stored in Firestore
Future<bool> checkUserRole(String userId, String requiredRole) async {
  final userDoc = await FirebaseFirestore.instance.collection('users').doc(userId).get();
  final userRole = userDoc.data()?['role'];

  if (userRole == requiredRole) {
    return true;
  } else {
    throw CustomError(errorMsg: 'User does not have the required role');
  }
}
```

Authorization ensures the user is not only authenticated but also has the rights to perform specific actions.

:::

### 5. Exposed Endpoints and Metadata

Exposing Swagger documentation or test endpoints in production can allow attackers to easily discover vulnerabilities in your API. It provides them with detailed information about the structure and capabilities of your API, which can be exploited.

#### How to Secure with Route Guards:

A route guard can prevent unauthorized access to sensitive routes, ensuring that only authenticated and authorized users can access certain endpoints.

```dart
void checkRouteAccess(String route) {
  if (!isUserAuthenticated()) {
    throw CustomError(errorMsg: 'User not authorized');
  }
}
```

::: warning Avoid this:

- Don't deploy Swagger docs without authentication
- Use route guards for admin/dev routes
- Strip debug symbols and logs in production builds

:::

::: tip Example: Secure API Call in Flutter

Here’s a simple example using Dio, a powerful HTTP client for Dart, to securely call an API with token-based authentication and HTTPS:

```dart
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final dio = Dio();
final storage = FlutterSecureStorage();

Future<void> fetchSecureData() async {
  final token = await storage.read(key: 'auth_token');

  dio.options.headers['Authorization'] = 'Bearer $token';

  try {
    final response = await dio.get('https://yourapi.com/secure-endpoint');
    print(response.data);
  } catch (e) {
    print('API call failed: $e');
  }
}
```

This example illustrates how to include an authorization token in your request header and securely make an HTTPS request using `dio`. Dio also supports interceptors, retries, and advanced options like certificate pinning.

:::

---

## Best Practices for Securing APIs in Flutter Apps

### Always Use HTTPS

Avoid plain HTTP at all costs. Use HTTPS to encrypt data in transit.

```dart
final response = await http.get(Uri.parse('https://api.secure.com/data'));
```

### Implement OAuth2 or Firebase Auth

Use modern authentication packages like `firebase_auth` or `oauth2_client`. These offer secure, token-based authentication with built-in session and refresh token management.

### Use Firebase App Check

Prevents abuse of your backend by verifying the legitimacy of the client app.

```dart
await FirebaseAppCheck.instance.activate(
  webRecaptchaSiteKey: 'your-site-key',
);
```

### Secure Storage of Sensitive Data

Use `flutter_secure_storage` to safely store tokens and secrets locally.

### Obfuscate Dart Code

Obfuscation makes your Dart code harder to reverse-engineer. You can do this by renaming classes, methods, and variables into meaningless names.

```sh
flutter build apk --obfuscate --split-debug-info=build/symbols
```

This command strips debug information and renames classes/functions, making it harder for attackers to understand your compiled code.

### Use Rate Limiting and Throttling

Protect backend APIs from abuse by rate-limiting requests. Implement server-side rate-limiting using API Gateway tools or middleware libraries. [**Here’s a tutorial**](/freecodecamp.org/what-is-rate-limiting-web-apis.md) that’ll teach you more about this technique.

### Set Up Logging and Monitoring

Use tools like Firebase Crashlytics or Sentry to track errors and suspicious activity.

```dart
FirebaseCrashlytics.instance.recordError(e, stackTrace);
```

### API Gateway and WAF

Use API management layers like Google Cloud Endpoints or AWS API Gateway along with Web Application Firewalls (WAF) to control and filter traffic.

---

## Security Checklist for Flutter Developers

- Use HTTPS for all communications
- Never hardcode secrets or credentials
- Use token-based authentication (OAuth2, Firebase Auth)
- Validate tokens on both client and server
- Obfuscate and minify code before production
- Securely store sensitive data using `flutter_secure_storage`
- Enable Firebase App Check or equivalent
- Use API Gateways and WAFs for traffic filtering
- Monitor usage logs and set up alerts for anomalies
- Implement rate limiting to prevent abuse

### Additional Considerations

#### Certificate Pinning:

Certificate pinning is a technique used to ensure that the app only communicates with a trusted server by comparing the server's certificate against a pre-stored certificate or public key. This prevents attackers from using fraudulent certificates.

::: tip Example: Certificate Pinning in Dio

```dart
class CertPinningInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    final context = SecurityContext(withTrustedRoots: false);
    final certBytes = (await rootBundle.load('assets/certs/myserver.cer')).buffer.asUint8List();
    context.setTrustedCertificatesBytes(certBytes);

    final client = HttpClient(context: context);
    client.badCertificateCallback = (X509Certificate cert, String host, int port) {
      final serverSha = sha256.convert(cert.der).toString();
      const expectedSha = 'your_cert_sha256_fingerprint';
      return serverSha == expectedSha;
    };

    (options.extra['httpClientAdapter'] as DefaultHttpClientAdapter?)
        ?.onHttpClientCreate = (_) => client;

    handler.next(options);
  }
}
```

- `SecurityContext(withTrustedRoots: false)`: Starts with an empty trust store, meaning no system CAs are trusted by default.
- `setTrustedCertificatesBytes`: Loads your own server’s certificate from local assets and sets it as the only trusted certificate.
- `HttpClient.badCertificateCallback`: Compares the server’s certificate SHA-256 fingerprint against a known good value. If they match, the request proceeds.
- `onHttpClientCreate`: Replaces the default Dio HTTP client with the custom client configured for pinning.

This ensures that your app will only accept HTTPS connections from your own trusted server, protecting users from certificate spoofing or MITM attacks.

:::

#### TTL and Token Rotation:

**Time-to-Live (TTL)** is a security measure that ensures tokens automatically expire after a defined period. This limits the duration a token can be used, reducing the attack surface if it’s compromised.

**Token Rotation** enhances security further by issuing a new refresh token every time the existing one is used to request a new access token. The previous refresh token is then invalidated. This prevents replay attacks where an attacker might attempt to reuse a stolen refresh token.

**Real-World Token Lifecycle:**

1. **Access Token**:
    - **TTL**: Short (for example, 15 minutes)
    - **Purpose**: Used to authenticate and authorize API requests
    - **Behavior**: Expires quickly to minimize risk if exposed
2. **Refresh Token**:
    - **TTL**: Longer (for example, 7 days)
    - **Purpose**: Used to request new access tokens without requiring the user to log in again
    - **Rotation**: A new refresh token is issued with each use

Here’s an example Implementation (Dart-like Pseudo-code):

Generate an access token (15-minute TTL):

```dart
String generateAccessToken(String userId) {
  final expiry = DateTime.now().add(Duration(minutes: 15));
  return createJwtToken(userId: userId, expiresAt: expiry);
}
```

Then generate a refresh token (7-day TTL):

```dart
String generateRefreshToken(String userId) {
  final expiry = DateTime.now().add(Duration(days: 7));
  return createSecureRandomToken(userId: userId, expiresAt: expiry);
}
```

Refresh the endpoint with rotation:

```dart
Map<String, String> refreshAccessToken(String refreshToken) {
  if (isValidRefreshToken(refreshToken)) {
    final userId = getUserIdFromRefreshToken(refreshToken);

    // Invalidate old refresh token
    invalidateRefreshToken(refreshToken);

    // Rotate tokens
    final newRefreshToken = generateRefreshToken(userId);
    final newAccessToken = generateAccessToken(userId);

    return {
      'accessToken': newAccessToken,
      'refreshToken': newRefreshToken,
    };
  } else {
    throw CustomError(errorMsg: 'Invalid or expired refresh token');
  }
}
```

Why this matters:

- **Mitigates long-term exposure**: Tokens automatically expire, reducing risk.
- **Prevents replay attacks**: A rotated refresh token cannot be reused if intercepted.
- **Enhances session security**: Even if a token is stolen, it becomes useless quickly.

#### Backend Validation:

Backend validation ensures that sensitive data, like API keys or JWT tokens, is checked on the server side, preventing tampering from malicious users.

Never trust the client. Always re-validate all sensitive operations and user roles on the backend.

Example:

```dart
void validateToken(String token) {
  if (isTokenExpired(token)) {
    throw CustomError(errorMsg: 'Token expired');
  }
}
```

- `validateToken(String token)`: A function that takes a user's token as input.
- `isTokenExpired(token)`: A hypothetical function that checks whether the token has expired (e.g., by decoding the token and checking its expiry timestamp).
- `throw CustomError(...)`: If the token is expired, an error is thrown — in this case, a `CustomError` with a message saying `'Token expired'`.

Why this matters:

- Tokens can be stolen or manipulated on the client side, so trusting them blindly is dangerous.
- Backend checks like this help enforce server-side control over user authentication and session validity.
- Even if a user tampers with client-side code, they can't bypass this server-side validation.

#### Use Security-focused Tools like OWASP ZAP/Burp Suite/Postman:

Use tools like OWASP ZAP, Burp Suite, and Postman to manually and automatically test your API endpoints for vulnerabilities.

- **OWASP ZAP**: Used for penetration testing, finding vulnerabilities like XSS, SQL Injection, and so on.
- **Burp Suite**: Another tool for testing security vulnerabilities in web apps.
- **Postman**: Can be used for testing API endpoints and ensuring secure communications by adding necessary headers like `Authorization`.

---

## Conclusion

Securing mobile APIs is a foundational requirement in modern app development. For Flutter developers, this means going beyond building beautiful UIs to ensuring the underlying API infrastructure is resilient against threats. The risks of exposed endpoints, leaked secrets, and insecure communication are very real, but preventable.

Security is about proactive defense, and you should make it a core part of your development workflow. With consistent practices, regular audits, and attention to detail, you’ll protect both your users and your product from unnecessary risks. Flutter provides the flexibility and power to build fast, cross-platform apps - so don’t let poor API security undermine that potential.

By following the best practices outlined in this article, such as using HTTPS, implementing proper authentication and authorization, securely storing credentials, and leveraging tools like Firebase App Check, you can significantly reduce your app’s attack surface.

Remember: effective security starts with a mindset. It’s not just a one-time setup, but an ongoing process of vigilance, testing, and improvement.

::: info References

<SiteInfo
  name="OWASP Mobile Application Security | OWASP Foundation"
  desc="The OWASP Mobile Application Security (MAS) project consists of a series of documents that establish a security standard for mobile apps and a comprehensive testing guide that covers the processes, techniques, and tools used during a mobile application security assessment, as well as an exhaustive set of test cases that enables testers to deliver consistent and complete results."
  url="https://owasp.org/www-project-mobile-app-security/"
  logo="https://owasp.org/www--site-theme/favicon.ico"
  preview="https://owasp.org/www--site-theme/favicon.ico"/>

<SiteInfo
  name="OWASP API Security Project | OWASP Foundation"
  desc="OWASP API Security Project on the main website for The OWASP Foundation. OWASP is a nonprofit foundation that works to improve the security of software."
  url="https://owasp.org/www-project-api-security/"
  logo="https://owasp.org/www--site-theme/favicon.ico"
  preview="https://owasp.org/www--site-theme/favicon.ico"/>

<SiteInfo
  name="Security checklist | Android Developers"
  desc="Android has built-in security features that significantly reduce the frequency and impact of application security issues. The system is designed so that you can typically build your apps with the default system and file permissions and avoid difficult decisions about security."
  url="https://developer.android.com/privacy-and-security/security-tips/"
  logo="https://gstatic.com/devrel-devsite/prod/va15d3cf2bbb0f0b76bff872a3310df731db3118331ec014ebef7ea080350285b/android/images/favicon.svg"
  preview="https://developer.android.com/static/images/social/android-developers.png"/>

<SiteInfo
  name="flutter_secure_storage | Flutter package"
  desc="Flutter Secure Storage provides API to store data in secure storage. Keychain is used in iOS, KeyStore based solution is used in Android."
  url="https://pub.dev/packages/flutter_secure_storage/"
  logo="https://pub.dev/static/hash-9gbn097u/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-9gbn097u/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="encrypt | Dart package"
  desc="A set of high-level APIs over PointyCastle for two-way cryptography."
  url="https://pub.dev/packages/encrypt/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-9gbn097u/img/pub-dev-icon-cover-image.png"/>

```component VPCard
{
  "title": "Firebase Remote Config",
  "desc": "Change the behavior and appearance of your web client or server without publishing an app update, at no cost, for unlimited daily active users.",
  "link": "https://firebase.google.com/docs/remote-config/",
  "logo": "https://gstatic.com/devrel-devsite/prod/va15d3cf2bbb0f0b76bff872a3310df731db3118331ec014ebef7ea080350285b/firebase/images/favicon.png",
  "background": "rgba(255,145,0,0.2)"
}
```

<SiteInfo
  name="device_info_plus | Flutter package"
  desc="Flutter plugin providing detailed information about the device (make, model, etc.), and Android or iOS version the app is running on."
  url="https://pub.dev/packages/device_info_plus/"
  logo="/static/hash-9gbn097u/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-9gbn097u/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="flutter_dotenv | Flutter package"
  desc="Easily configure any flutter application with global variables using a `.env` file."
  url="https://pub.dev/packages/flutter_dotenv/"
  logo="https://pub.dev/static/hash-9gbn097u/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-9gbn097u/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="injectable | Dart package"
  desc="Injectable is a convenient code generator for get_it. Inspired by Angular DI, Guice DI and inject.dart."
  url="https://pub.dev/packages/injectable/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-9gbn097u/img/pub-dev-icon-cover-image.png"/>

```component VPCard
{
  "title": "FlutterFire Overview | FlutterFire",
  "desc": "FlutterFire is a set of Flutter plugins which connect your Flutter application to Firebase.",
  "link": "https://firebase.flutter.dev/docs/overview/",
  "logo": "https://firebase.flutter.dev/favicon/favicon.ico",
  "background": "rgba(255,202,40,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Secure Mobile APIs in Flutter",
  "desc": "As mobile applications continue to evolve in functionality and scope, securing the APIs that power these apps has become more critical than ever. In the context of Flutter, a framework that enables cross-platform development, understanding how to sec...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-secure-mobile-apis-in-flutter.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
