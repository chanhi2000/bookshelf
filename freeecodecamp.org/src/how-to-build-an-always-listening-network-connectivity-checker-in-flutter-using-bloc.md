---
lang: en-US
title: "How to Build an Always Listening Network Connectivity Checker in Flutter using BLoC"
description: "Article(s) > How to Build an Always Listening Network Connectivity Checker in Flutter using BLoC"
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
      content: "Article(s) > How to Build an Always Listening Network Connectivity Checker in Flutter using BLoC"
    - property: og:description
      content: "How to Build an Always Listening Network Connectivity Checker in Flutter using BLoC"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-always-listening-network-connectivity-checker-in-flutter-using-bloc.html
prev: /programming/dart/articles/README.md
date: 2025-08-18
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755525049875/2d9540c1-5a4a-41f4-87c6-59ee15bb99e4.png
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
  name="How to Build an Always Listening Network Connectivity Checker in Flutter using BLoC"
  desc="Many mobile applications require a stable internet connection to provide a smooth user experience. And as a Flutter developer, you need a robust way to handle network state changes, ensuring that your app responds gracefully whether it's connected, d..."
  url="https://freecodecamp.org/news/how-to-build-an-always-listening-network-connectivity-checker-in-flutter-using-bloc"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755525049875/2d9540c1-5a4a-41f4-87c6-59ee15bb99e4.png"/>

Many mobile applications require a stable internet connection to provide a smooth user experience. And as a Flutter developer, you need a robust way to handle network state changes, ensuring that your app responds gracefully whether it's connected, disconnected, or transitioning between states.

This article will give you a detailed walkthrough of building a comprehensive network connectivity checker using a powerful combination of modern Flutter packages and architectural patterns.

We will leverage:

1. `connectivity_plus`: A package to check for basic network connectivity (for example, WiFi, mobile data, Ethernet).
2. `internet_connection_checker`: A more reliable tool that goes beyond a simple network check by actively pinging a known URL to confirm actual internet access.
3. **A direct HTTP call to a trusted URL (like Google)**: As a failsafe, a direct network call can serve as a final confirmation of connectivity.
4. `rxdart` with `debounce`: To prevent excessive and rapid network checks, which can be inefficient and drain the device's battery.
5. **Dependency Injection with** `get_it` and `injectable`: For a clean, modular, and testable codebase.
6. **State Management with BLoC and** `freezed`: The BLoC pattern separates business logic from the UI, and `freezed` simplifies the creation of immutable states and events.
7. **Streams**: To enable a reactive, "always-listening" approach to network status changes.
8. `fluttertoast`: To provide clear, non-intrusive user feedback.

Let’s dive in.

::: note Prerequisites

Before you begin, make sure you have a basic understanding of:

1. **Flutter and Dart**: The fundamentals of building apps with Flutter.
2. **Asynchronous Programming**: Concepts like `async`, `await`, and `Future`.
3. **BLoC pattern**: The core principles of BLoC (Business Logic Component) for state management.
4. **Code generation**: How to use packages like `build_runner` to generate boilerplate code.

:::

---

## Step 1: Set Up Dependency Injection with `get_it` and `injectable`

Dependency Injection (DI) is a software design pattern that allows a class to receive its dependencies from an external source rather than creating them itself. This makes your code more flexible, reusable, and easier to test.

Let’s look at the two tools we’ll use to implement this:

1. `get_it` is a "service locator" that acts as a central registry. You register your services (dependencies) with `get_it`, and it provides a way to retrieve their single instance from anywhere in your app. It's a simple and effective alternative to more complex DI frameworks.
2. `injectable` is a code-generation package that works with `get_it`. By annotating your classes with `@injectable`, `@lazySingleton`, or `@module`, `injectable` automatically writes the boilerplate code to register your dependencies with `get_it` for you, saving you from manual setup.

First, create a new Flutter project like this:

```sh
flutter create my_injectable_project
cd my_injectable_project
```

Next, add the necessary packages to your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` file:

```yaml title="pubspec.yaml"
dependencies:
  freezed_annotation: ^2.4.1
  rxdart: ^0.28.0
  get_it: ^7.6.7
  injectable: ^2.3.2
  internet_connection_checker: ^1.0.0+1
  connectivity_plus: ^5.0.2
  fluttertoast: ^8.2.4
  flutter_bloc: ^8.1.3
  http: ^0.13.3

dev_dependencies:
  build_runner:
  freezed: ^2.4.7
  injectable_generator: ^2.4.1
```

So what’s going on here?

- `freezed_annotation` & `freezed`: Used for creating immutable data classes for BLoC states and events.
- `rxdart`: Provides powerful stream-related operators, including `debounceTime`, which is essential for our connectivity checker.
- `get_it` & `injectable`: For dependency injection.
- `internet_connection_checker` & `connectivity_plus`: The core packages for checking network status.
- `fluttertoast`: To display user notifications.
- `flutter_bloc`: The main BLoC package.
- `http`: A package to make HTTP requests, used for the Google URL check.
- `build_runner`: The command-line tool that runs the code generators.
- `injectable_generator`: The generator that works with `injectable`.

Now it’s time to create the injection configuration file. Go ahead and create a file, for example, <VPIcon icon="fas fa-folder-open"/>`lib/core/dependency_injection/`<VPIcon icon="fa-brands fa-dart-lang"/>`injection.dart`, to set up `get_it` and `injectable`.

```dart title="lib/core/dependency_injection/injection.dart"
import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';
import 'package:my_injectable_project/core/dependency_injection/injection.config.dart';

// The global instance of GetIt
final GetIt getIt = GetIt.instance;

// The annotation @injectableInit tells injectable to generate the init method
@injectableInit
void configureDependencies(String env) => getIt.init(environment: env);
```

- `final GetIt getIt = GetIt.instance;`: We create a static instance of `GetIt` that can be accessed globally.
- `@injectableInit`: This annotation signals to `injectable_generator` that this is the file where it should generate the dependency registration code.
- `void configureDependencies(String env) => getIt.init(environment: env);`: This function initializes `get_it` and allows us to configure it for different environments (e.g., 'dev', 'prod').

Lastly, we need to create a module for dependencies. Create a module file, for example, <VPIcon icon="fas fa-folder-open"/>`lib/core/dependency_injection/`<VPIcon icon="fa-brands fa-dart-lang"/>`register_module.dart`, to register third-party classes that don't belong to your own project structure.

```dart title="lib/core/dependency_injection/register_module.dart"
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';
import 'package:internet_connection_checker/internet_connection_checker.dart';
import 'package:my_injectable_project/core/network_info/network_info.dart';
import 'package:my_injectable_project/features/network_info/bloc/network_info_bloc.dart';

// The @module annotation marks this class as a module for injectable
@module
abstract class RegisterModule {

  // A @lazySingleton means the instance will be created only when it's first requested
  @lazySingleton
  Connectivity get connectivity => Connectivity();

  @lazySingleton
  InternetConnectionChecker get internetConnectionChecker => InternetConnectionChecker();

  @lazySingleton
  NetworkInfoImpl get networkInfo => NetworkInfoImpl(
        connectivity: connectivity,
        internetConnectionChecker: internetConnectionChecker,
      );

  @lazySingleton
  NetworkInfoBloc get networkInfoBloc => NetworkInfoBloc(
        networkInfo: getIt<NetworkInfo>(),
        connectivity: getIt<Connectivity>(),
      );
}
```

- `@module`: A special annotation that marks a class as a module for `injectable`. Modules are useful for registering third-party classes or creating instances of classes that require complex setup.
- `@lazySingleton`: This annotation tells `injectable` to create a single instance of the class and reuse it every time it is requested. The "lazy" part means the instance is not created until it's needed for the first time.

---

## Step 2: Implement the Network Connectivity Checker

### Interface and Implementation

It's good practice to program against an interface rather than a concrete implementation. This allows for easy swapping of implementations and makes testing simpler. Below, <VPIcon icon="fas fa-folder-open"/>`lib/core/network_info/`<VPIcon icon="fa-brands fa-dart-lang"/>`network_info.dart` is the abstract class while <VPIcon icon="fas fa-folder-open"/>`lib/core/network_info/`<VPIcon icon="fa-brands fa-dart-lang"/>`network_info_impl.dart` is the implementation. This is where the functionality of the flow lies, which the bloc uses.

```dart title="lib/core/network_info/network_info.dart"
// The abstract class defines the contract for our network checker
abstract class NetworkInfo {
  Future<bool> get isConnected;
}
```

```dart title="lib/core/network_info/network_info_impl.dart"
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:injectable/injectable.dart';
import 'package:internet_connection_checker/internet_connection_checker.dart';
import 'package:my_injectable_project/core/network_info/network_info.dart';

// @LazySingleton(as: NetworkInfo) tells injectable to register this class
// as a lazy singleton, and to provide it when a NetworkInfo is requested.
@LazySingleton(as: NetworkInfo)
class NetworkInfoImpl implements NetworkInfo {
  final Connectivity connectivity;
  final InternetConnectionChecker internetConnectionChecker;

  const NetworkInfoImpl({
    required this.connectivity,
    required this.internetConnectionChecker,
  });

  @override
  Future<bool> get isConnected async {
    try {
      bool isDeviceConnected = false;
      // First, check the connectivity type (WiFi, mobile, etc.)
      final connectivityResult = await connectivity.checkConnectivity();
      debugPrint('Connectivity Result: $connectivityResult');

      if (connectivityResult != ConnectivityResult.none) {
        // If there's a network type, verify actual internet access
        isDeviceConnected = await internetConnectionChecker.hasConnection ||
            await hasInternetConnection();
      }
      debugPrint('Device Connected: $isDeviceConnected');
      return isDeviceConnected;
    } catch (e) {
      debugPrint('Error checking network connection: $e');
      return false;
    }
  }

  // A redundant but useful check with a direct HTTP call
  Future<bool> hasInternetConnection() async {
    try {
      final response = await http.get(Uri.parse('https://www.google.com')).timeout(
        const Duration(seconds: 5),
      );
      if (response.statusCode == 200) {
        return true;
      }
    } catch (e) {
      debugPrint('Error checking internet connection: $e');
    }
    return false;
  }
}
```

- `@LazySingleton(as: NetworkInfo)`: This is the key annotation. It registers `NetworkInfoImpl` as a singleton that implements the `NetworkInfo` interface. When `getIt<NetworkInfo>()` is called, an instance of `NetworkInfoImpl` will be provided.
- `connectivity.checkConnectivity()`: Provides a quick check of the device's connection type.
- `internetConnectionChecker.hasConnection`: This package is more reliable than just checking the network type, as a device can be "connected" to a WiFi network without having internet access. `internet_connection_checker` actively pings a series of addresses to verify.
- `hasInternetConnection()`: A fallback function that makes a direct HTTP request to a reliable URL like Google. This provides an extra layer of verification.

---

## Step 3: Create the BLoC for Network Connectivity

The BLoC handles the business logic of checking the network status and emitting the appropriate state changes to the UI.

```dart :collapsed-lines title="lib/features/network_info/bloc/network_info_bloc.dart"
import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/foundation.dart';
import 'package:injectable/injectable.dart';
import 'package:my_injectable_project/core/network_info/network_info.dart';
import 'package:rxdart/rxdart.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'network_info_bloc.freezed.dart';
part 'network_info_event.dart';
part 'network_info_state.dart';

// @injectable marks this class to be registered by injectable
@injectable
class NetworkInfoBloc extends Bloc<NetworkInfoEvent, NetworkInfoState> {
  final NetworkInfo networkInfo;
  final Connectivity connectivity;
  late StreamSubscription<List<ConnectivityResult>> connectivitySubscription;

  NetworkInfoBloc({
    required this.networkInfo,
    required this.connectivity,
  }) : super(NetworkInfoState.initial()) {
    // Custom event transformer for debouncing
    EventTransformer<T> debounce<T>(Duration duration) {
      return (events, mapper) => events.debounceTime(duration).flatMap(mapper);
    }

    // The 'on' method maps events to states
    on<CheckNetwork>(
      _onCheckNetwork,
      // Apply the debounce transformer to limit the rate of function calls
      transformer: debounce(
        const Duration(seconds: 1),
      ),
    );

    // Listen to changes from the connectivity_plus package
    connectivitySubscription = connectivity.onConnectivityChanged.listen((connectivityResult) async {
      await Future.delayed(const Duration(seconds: 1)); // Small delay to avoid race conditions
      debugPrint('Connectivity Result after delay: $connectivityResult');
      add(const CheckNetwork());
    });
  }

  // The event handler for CheckNetwork
  Future<void> _onCheckNetwork(
    CheckNetwork event,
    Emitter<NetworkInfoState> emit,
  ) async {
    final isConnected = await networkInfo.isConnected;
    // Only emit a new state if the network status has actually changed
    if (state.networkStatus != isConnected) {
      emit(state.copyWith(networkStatus: isConnected));
    }
    debugPrint(
        'Network Status ==> ${isConnected ? "Data connection is available." : "You are disconnected from the internet."}');
  }

  @override
  Future<void> close() {
    // It's crucial to cancel the stream subscription to prevent memory leaks
    connectivitySubscription.cancel();
    return super.close();
  }
}
```

- `EventTransformer<T> debounce<T>(Duration duration)`: This is a custom transformer. It uses `rxdart`'s `debounceTime` operator to wait for a specified duration of inactivity before allowing the event to be processed. This is perfect for preventing a cascade of network checks.
- `connectivity.onConnectivityChanged.listen(...)`: This creates a subscription to a stream of `ConnectivityResult`. Whenever the device's connectivity status changes (for example, switches from WiFi to mobile data), this stream emits a new value, which in turn triggers our `CheckNetwork` event.
- `_onCheckNetwork(...)`: This function is the heart of the BLoC's logic. It calls `networkInfo.isConnected` to get the current status and then emits a new state if the status has changed.
- `close()`: Overriding this method is vital for proper resource management. It's where we clean up our `StreamSubscription` to avoid memory leaks.

### Events and States

`freezed` is a code-generation tool that makes it easy to create immutable data classes, which are essential for the BLoC pattern.

```dart title="lib/features/network_info/bloc/network_info_event.dart"
part of 'network_info_bloc.dart';

@freezed
class NetworkInfoEvent with _$NetworkInfoEvent {
  const factory NetworkInfoEvent.checkNetwork() = CheckNetwork;
}
```

- `@freezed`: This annotation triggers `freezed` to generate the boilerplate code for this class.
- `const factory NetworkInfoEvent.checkNetwork() = CheckNetwork;`: This defines a single event for our BLoC, which is `CheckNetwork`.

```dart title="lib/features/network_info/bloc/network_info_state.dart"
part of 'network_info_bloc.dart';

@freezed
class NetworkInfoState with _$NetworkInfoState {
  const factory NetworkInfoState({required bool networkStatus}) = _NetworkInfoState;

  factory NetworkInfoState.initial() => const NetworkInfoState(
    networkStatus: true,
  );
}
```

- `const factory NetworkInfoState(...)`: This defines our state, which simply holds a `networkStatus` boolean.
- `factory NetworkInfoState.initial()`: A helper factory to create the initial state of the BLoC.

### Run the Code Generator

To generate the `*.freezed.dart` and `*.g.dart` files, run the following command in your terminal:

```sh
flutter pub run build_runner build --delete-conflicting-outputs
```

This command will watch your project for changes and automatically regenerate the necessary files.

---

## Step 4: Integrate the BLoC with the UI

Finally, we’ll connect our BLoC to the Flutter UI to react to state changes.

In your main widget, for example, <VPIcon icon="fa-brands fa-dart-lang"/>`main.dart`, you can access the BLoC through `getIt`.

```dart :collapsed-lines title="main.dart"
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:my_injectable_project/core/dependency_injection/injection.dart';
import 'package:my_injectable_project/features/network_info/bloc/network_info_bloc.dart';

void main() {
  // Initialize dependency injection
  configureDependencies('dev');
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    // Provide the BLoC to the widget tree
    return BlocProvider(
      create: (context) => getIt<NetworkInfoBloc>(),
      child: MaterialApp(
        title: 'Network Checker Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: const NetworkCheckerPage(),
      ),
    );
  }
}

class NetworkCheckerPage extends StatefulWidget {
  const NetworkCheckerPage({super.key});

  @override
  State<NetworkCheckerPage> createState() => _NetworkCheckerPageState();
}

class _NetworkCheckerPageState extends State<NetworkCheckerPage> {
  final NetworkInfoBloc networkInfoBloc = getIt<NetworkInfoBloc>();

  @override
  void initState() {
    super.initState();
    // Listen to the BLoC's state stream
    networkInfoBloc.stream.listen((state) {
      if (state.networkStatus) {
        toastInfo(
          msg: "Data connection is available.",
          status: Status.success,
        );
      } else {
        toastInfo(
          msg: "You are disconnected from the internet.",
          status: Status.error,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Network Connectivity'),
      ),
      body: Center(
        child: BlocBuilder<NetworkInfoBloc, NetworkInfoState>(
          builder: (context, state) {
            return Text(
              state.networkStatus
                  ? 'Connected to the Internet!'
                  : 'Disconnected from the Internet.',
              style: TextStyle(
                fontSize: 20,
                color: state.networkStatus ? Colors.green : Colors.red,
              ),
            );
          },
        ),
      ),
    );
  }
}
```

- `BlocProvider`: This widget provides the `NetworkInfoBloc` instance to the widget tree, making it accessible to any child widget via `BlocProvider.of<NetworkInfoBloc>(context)`.
- `networkInfoBloc.stream.listen(...)`: In `initState`, we subscribe to the BLoC's state stream. Each time a new state is emitted (which happens when the network status changes), our listener is triggered, and we can display a toast notification.
- `BlocBuilder`: This widget is used to rebuild the UI in response to state changes. It listens for new states from the `NetworkInfoBloc` and rebuilds its `builder` function, updating the `Text` widget to reflect the current network status.

---

## Step 5: Display Toast Notifications

The `fluttertoast` package provides a simple, platform-agnostic way to show non-intrusive messages.

```dart
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

enum Status { success, error }

void toastInfo({
  required String msg,
  required Status status,
}) {
  Fluttertoast.showToast(
    msg: msg,
    toastLength: Toast.LENGTH_SHORT,
    gravity: ToastGravity.BOTTOM,
    backgroundColor: status == Status.success ? Colors.green : Colors.red,
    textColor: Colors.white,
    fontSize: 16.0,
  );
}
```

This helper function simplifies the process of showing toasts by allowing you to specify a message and a status, which determines the background color.

---

## Conclusion

By combining the power of the BLoC pattern, dependency injection with `get_it` and `injectable`, and robust network-checking libraries, you can build a highly reliable and maintainable network connectivity checker in your Flutter application.

This architecture ensures your app is responsive to network changes and provides a clean separation of concerns, making your codebase scalable and easy to test.

::: info References

Here are some references that support the concepts and packages used in the article:

**Flutter and Dart Fundamentals:**

<SiteInfo
  name="Flutter documentation"
  desc="Get started with Flutter. Widgets, examples, updates, and API docs to help you write your first Flutter app."
  url="https://docs.flutter.dev"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

<SiteInfo
  name="Dart documentation"
  desc="Learn to use the Dart language and libraries."
  url="https://dart.dev/docs"
  logo="https://dart.dev/assets/img/logo/dart-64.png"
  preview="https://dart.dev/assets/img/logo/dart-logo-for-shares.png?2"/>

**Connectivity and Network Checking:**

<SiteInfo
  name="connectivity_plus | Flutter package"
  desc="Flutter plugin for discovering the state of the network (WiFi & mobile/cellular) connectivity on Android and iOS."
  url="https://pub.dev/packages/connectivity_plus/"
  logo="https://pub.dev/static/hash-0mq6dpb8/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-0mq6dpb8/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="internet_connection_checker - Flutter package in Network Connectivity Status category | Flutter Gems"
  desc="internet_connection_checker is a Flutter package. A library designed for seamless internet connectivity checks.  This library enables you to verify your internet connection and detect slow internet connection."
  url="https://fluttergems.dev/packages/internet_connection_checker"
  logo="https://fluttergems.dev/media/favicon.png"
  preview="https://fluttergems.dev/media/banner.png"/>

<SiteInfo
  name="http | Dart package"
  desc="A composable, multi-platform, Future-based API for HTTP requests."
  url="https://pub.dev/packages/http/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-0mq6dpb8/img/pub-dev-icon-cover-image.png"/>

**Dependency Injection:**

<SiteInfo
  name="get_it | Dart package"
  desc="Simple direct Service Locator that allows to decouple the interface from a concrete implementation and  to access the concrete implementation from everywhere in your App”"
  url="https://pub.dev/packages/get_it/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-0mq6dpb8/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="injectable | Dart package"
  desc="Injectable is a convenient code generator for get_it. Inspired by Angular DI, Guice DI and inject.dart."
  url="https://pub.dev/packages/injectable/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-0mq6dpb8/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="flutter_bloc | Flutter package"
  desc="Flutter widgets that make it easy to implement the BLoC (Business Logic Component) design pattern. Built to be used with the bloc state management package."
  url="https://pub.dev/packages/flutter_bloc/"
  logo="https://pub.dev/static/hash-0mq6dpb8/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-0mq6dpb8/img/pub-dev-icon-cover-image.png"/>

**Immutability and Code Generation:**

<SiteInfo
  name="freezed | Dart package"
  desc="Code generation for immutable classes that has a simple syntax/API without compromising on the features."
  url="https://pub.dev/packages/freezed/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-0mq6dpb8/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="build_runner | Dart package"
  desc="A build system for Dart code generation and modular compilation."
  url="https://pub.dev/packages/build_runner/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-0mq6dpb8/img/pub-dev-icon-cover-image.png"/>

**Reactive Programming (RxDart) and Streams:**

<SiteInfo
  name="rxdart | Dart package"
  desc="RxDart is an implementation of the popular ReactiveX api for asynchronous programming, leveraging the native Dart Streams api."
  url="https://pub.dev/packages/rxdart/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-0mq6dpb8/img/pub-dev-icon-cover-image.png"/>

```component VPCard
{
  "title": "Stream class - dart:async library - Dart API",
  "desc": "API docs for the Stream class from the dart:async library, for the Dart programming language.",
  "link": "https://api.flutter.dev/flutter/dart-async/Stream-class.html/",
  "logo": "https://api.flutter.dev/static-assets/favicon.png?v1",
  "background": "rgba(19,137,253,0.2)"
}
```

**User Feedback:**

<SiteInfo
  name="fluttertoast | Flutter package"
  desc="Toast Library for Flutter, Easily create toast messages in single line of code"
  url="https://pub.dev/packages/fluttertoast/"
  logo="https://pub.dev/static/hash-0mq6dpb8/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-0mq6dpb8/img/pub-dev-icon-cover-image.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an Always Listening Network Connectivity Checker in Flutter using BLoC",
  "desc": "Many mobile applications require a stable internet connection to provide a smooth user experience. And as a Flutter developer, you need a robust way to handle network state changes, ensuring that your app responds gracefully whether it's connected, d...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-always-listening-network-connectivity-checker-in-flutter-using-bloc.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
