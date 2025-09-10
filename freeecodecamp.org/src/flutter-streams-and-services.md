---
lang: en-US
title: "How to Use Streams and Services for Flutter State"
description: "Article(s) > How to Use Streams and Services for Flutter State"
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
      content: Article(s) > How to Use Streams and Services for Flutter State
    - property: og:description
      content: How to Use Streams and Services for Flutter State
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/flutter-streams-and-services.html
prev: /programming/dart/articles/README.md
date: 2024-09-25
isOriginal: false
author:
  - name: Obum
    url : https://freecodecamp.org/news/author/obumnwabude/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1727130776096/a52147fe-e05a-45e7-af73-9f7a9a8510b5.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Streams and Services for Flutter State"
  desc="Among the many state management architectures in Flutter, combining Dart streams with singleton classes (services) is an unpopular yet easy architecture. In this article, we’ll explore how to achieve this combination for app-wide state in Flutter. Ta..."
  url="https://freecodecamp.org/news/flutter-streams-and-services"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1727130776096/a52147fe-e05a-45e7-af73-9f7a9a8510b5.png"/>

Among the many state management architectures in Flutter, combining Dart streams with singleton classes (services) is an unpopular yet easy architecture.

In this article, we’ll explore how to achieve this combination for app-wide state in Flutter.

---

## What is App-wide State in Flutter?

App-wide state comprises all variables that are relevant to multiple widgets at the same time. By app-wide state, we don't mean the state that is attached to `StatefulWidgets`. Those are ephemeral state. Updating them requires local or scoped calls to [<FontIcon icon="fa-brands fa-dart-lang"/>`setState`](https://api.flutter.dev/flutter/widgets/State/setState.html).

In Flutter, app-wide state usually has a separate logical management from UI code. This separated logic is called a state management architecture. We have many state management architectures with which we can engineer app-wide state. Examples include [Provider (<FontIcon icon="iconfont icon-github"/>`obumnwabude/write`)](https://github.com/obumnwabude/write/blob/main/2024/flutter/get-the-link), [InheritedWidget (<FontIcon icon="iconfont icon-github"/>`obumnwabude/write`)](https://github.com/obumnwabude/write/blob/main/2024/flutter/get-the-link), [Riverpod (<FontIcon icon="iconfont icon-github"/>`obumnwabude/write`)](https://github.com/obumnwabude/write/blob/main/2024/flutter/get-the-link), [Bloc (<FontIcon icon="iconfont icon-github"/>`obumnwabude/write`)](https://github.com/obumnwabude/write/blob/main/2024/flutter/get-the-link), [Redux (<FontIcon icon="iconfont icon-github"/>`obumnwabude/write`)](https://github.com/obumnwabude/write/blob/main/2024/flutter/get-the-link), [Stacked (<FontIcon icon="iconfont icon-github"/>`obumnwabude/write`)](https://github.com/obumnwabude/write/blob/main/2024/flutter/get-the-link), and so on. Each of these state management architectures are efficient, good, and opinionated.

While your choice of architecture could vary based on different factors, consider adopting the following architecture in your projects. It involves using Dart streams and services (singleton classes) for keeping track of your app's state.

---

## What is a Stream in Dart?

A [<FontIcon icon="fa-brands fa-dart-lang"/>stream](https://dart.dev/libraries/dart-async#stream) continuously emits values. You can listen to a stream and constantly get new values when they are emitted. Streams in Dart are the equivalent of [<FontIcon icon="fas fa-globe"/>`Observable`](https://rxjs.dev/guide/observable) in JavaScript.

In Dart, streams are different from [<FontIcon icon="fa-brands fa-dart-lang"/>futures](https://dart.dev/libraries/dart-async#future). The difference is that while a future resolves to one value, a stream will continuously emit various values during its life.

Let's say we have a `counter` stream that keeps track of some current integer count. This count could be incremented or decremented. To use the values emitted by this `counter` stream, you listen to the `counter`. Listening implies calling the `.listen` method on the stream and handling the emitted value.

```dart
counter.listen((int value) => print('Got $value.'));
```

---

## How to Create a Stream in Dart

The [<FontIcon icon="fa-brands fa-dart"/>`Stream`](https://dart.dev/libraries/dart-async#stream) class comes with multiple factory constructors. They allow you to create various streams for various purposes. They include:

- `Stream.empty`
- `Stream.value`
- `Stream.error`
- `Stream.fromFuture`
- `Stream.fromFutures`
- `Stream.fromIterable`
- `Stream.multi`
- `Stream.periodic`
- `Stream.eventTransformed`

Each constructor serves a specific purpose as its name suggests.

Another technique of creating a `Stream` is by obtaining it from a `StreamController`. You will have to create the `StreamController` yourself. The advantage of doing this is that the controller allows you to *add* values to it. When you add values to the controller, they get emitted to listeners of its stream.

```dart
import 'dart:async';

void main() {
  final counterCtrl = StreamController<int>();
  counterCtrl.stream.listen(print);
  counterCtrl.add(1); // prints 1
}
```

The problem with the default `StreamController` from the `dart:async` library is that it allows only one listener. It is unicast. If you attempt attaching another listener to this stream obtained from `StreamController`, it will throw a "bad state" error.

This issue is solved by the `BehaviorSubject` class from the [<FontIcon icon="fas fa-globe"/>`rxdart`](https://pub.dev/packages/rxdart) package. Technically, `BehaviorSubject` is a `StreamController`. The difference is that it has more features like:

1. Allows multiple listeners (very important).
2. Caches the latest emitted value or error.
3. Emits the latest cached value/error to a new listener once it newly subscribes.
4. Allows you to synchronously read the current (or last emitted) value from it.
5. Allows you to add values to it if it doesn't yet have any listener (the default `StreamController` doesn’t allow this).

The `rxdart` package extends the capabilities of Dart streams. For example, it provides you with `BehaviorSubject`. Also, it exposes classes and extensions that allow more stream manipulations. To use the `rxdart` package, add it to your project's dependencies from pub using the following command:

```sh
flutter pub add rxdart
```

Then import it in your project's Dart files. From there, you can create `BehaviorSubject` (more robust `StreamController`) that can allow multiple listeners while allowing you to control them (adding values to the streams).

```dart
import 'package:rxdart/rxdart.dart';

void main() {
  // Create a BehaviorSubject.
  //
  // Asides from creating the BehaviorSubject, we can also  
  // immediately add a value to it using Dart's cascade operator.
  final counterBS = BehaviorSubject<int>()..add(0);

  counterBS.stream.listen(print); // prints 0
  counterBS.stream.listen(print); // prints 0
  counterBS.add(1); // prints 1 twice
}
```

Now that we can create streams (and listen to them), we need the exact same streams to be available to every part of our Flutter apps.

To ensure that it is the same instance of streams that different parts of our Flutter apps are accessing, we can expose the streams from singleton class instances that we create in the project.

---

## How to Create Singleton Class Instances (or Services)

When something is called a singleton, it means only one of it exists. For example, we can say the sun is a singleton star because we have only one sun.

When it comes to programming, we use a singleton when we need the same copy of an object everywhere. Already, the [<FontIcon icon="fa-brands fa-wikipedia-w"/>`static`](https://en.m.wikipedia.org/wiki/Static_variable) properties of a class are singletons to every instance of that class. When you declare a field or method as `static`, you're telling the runtime engine to always reuse the same static item.

This explains why `static` properties are used as constants. It's another reason why we use them without instantiating an object. Furthermore, in Flutter, we conventionally use static properties as a means to obtain new or existing instances of a class. For example, many Flutter classes (`MediaQuery`, `Navigator`, `ThemeData`, and so on) have a static `.of` method for obtaining their instances.

In this streams and services architecture, we expose only one instance from a class with the `static` keyword. At the same time, we hide that class constructor. Hiding the constructor ensures that no other Dart code outside the Dart file can create another instance of the same class. Doing this maintains the instance as a singleton.

Following common conventions, we can call this class a service. Any other Dart file in the project can listen to the exposed stream(s) from the service class and always get updated values emitted to it.

Services here are holders of app-wide state. Each service is a logical container of related features. In any other part of the code, through these services, we can access app-wide state variables (in our case, streams). In a production application, we could have an authentication service, another for notifications, another for files, and so on.

To have an app-wide available service (singleton class) with a stream in it:

1. Create a service class.
2. Create a private constructor (so that no other Dart code outside the class can instantiate it).
3. Create a static private instance of that very class.
4. Expose this private instance as the singleton.
5. Create a private `BehaviorSubject` in that class.
6. Expose the `BehaviorSubject` stream as a public static getter from the class.

```dart :collapsed-lines title="counter_service.dart"
import 'package:rxdart/rxdart.dart';

// 1. Create a class
// 
// The class name with "Service" appended to it indicates 
// that it is an app-wide state object.
class CounterService {
  // 2. Create a private constructor.
  //
  // This "just-underscore" constructor works. If we want, we could  
  // still add a name after the underscore. The main thing is that 
  // underscore makes the constructor to be a private one.
  CounterService._();

  // 3. Create a static private instance.
  // 
  // Prefixing underscore (_) to the variable name makes it private.
  // By being private, no other Dart code outside this file can directly 
  // access it.
  static final _instance = CounterService._();

  // 4. Expose this private instance as the singleton.
  static CounterService get instance => _instance;

  // 5. Create a private BehaviorSubject.
  final _counterBS = BehaviorSubject<int>()..add(0);

  // 6. Expose the BehaviorSubject's Stream.
  Stream<int> get countStream => _counterBS.stream;

  // Also, if need be, expose the BehaviorSubject's current as a getter.
  int get currentCount => _counterBS.value;
}

/* In any other Dart file in the project */
import 'counter_service.dart'

// Attach a listener to the stream
CounterService.instance.countStream.listen((count) {
   // Use the count as use wish. Code you write within this 
   // listener's block will be called whenever count is 
   // update/re-emitted.

   print(count); // prints 0
});

// Read the current stream value just once without subscribing
print(CounterService.instance.currentCount); // prints 0
```

---

## How to Manipulate State (Streams) Within Services

Most times, each service will have multiple streams. This is as expected, given that, for a given logical state feature, there would be multiple variables affecting it. Therefore, where need be, don't hesitate to declare multiple `BehaviorSubject` (while exposing their streams) within the same service class.

For each stream, you want to control its data. That's why we are using `BehaviorSubject`, so that we can add values to it when there is a need to update state.

Different events (whether from the user or your servers) can be the cause of such state updates. You want to trigger state updates (or add values to streams) anytime those events occur.

You could always poll your backend and emit changes to your streams if any event happens. You could also emit values based on changes in other services. In addition, if need be, services should also expose relevant methods that will update their streams. In turn, other parts of the app can call these methods and trigger changes. The obvious advantage is that every listener will respectively get the new stream value emitted to them.

```dart :collapsed-lines title="counter_service.dart"
import 'package:rxdart/rxdart.dart';

class CounterService {
  CounterService._();
  static final _instance = CounterService._();
  static CounterService get instance => _instance;

  final _counterBS = BehaviorSubject<int>()..add(0);
  Stream<int> get countStream => _counterBS.stream;
  int get currentCount => _counterBS.value;

  // Incrementing/Decrementing the counter will trigger state updates.
  void incrementCount() => _counterBS.add(currentCount + 1);
  void decrementCount() => _counterBS.add(currentCount - 1);
}

/* In another Dart file in the project */
import 'counter_service.dart'

void main() {
  final service = CounterService.instance;
  service.countStream.listen(print); // prints 0
  service.incrementCount(); // causes 1 to be printed
  service.decrementCount(); // causes 0 to be printed
}
```

For a more concrete example, let's say we have an `AuthenticationService`. It declares some `_userBS` and exposes a `currentUser` stream with type `Stream<User?>`, the user will be valid if authenticated or `null` if signed out. This auth service will naturally have `signIn` and `signOut` which can both add values to `_userBS`. The sign-up and login screens can each call `signIn` whereas the “switch account” and “log out” buttons can each call `signOut`.

```dart :collapsed-lines title="user.dart"
// A simple user with only email and username for demo purposes. 
// Your User model/schema would have more properties.
class User {
  final String email;
  final String username;

  const User(this.email, this.username);
}

/* In authentication_service.dart */
import 'package:rxdart/rxdart.dart';
import 'user.dart';

class AuthenticationService {
   AuthenticationService._();
   static final _instance = AuthenticationService._();
   static AuthenticationService instance => _instance;

   // User BehaviorSubject and its stream.
   final _userBS = BehaviorSubject<User?>()..add(null);
   Stream<User?> get currentUser => _userBS.stream;

   // signIn adds a new User to the stream.
   void signIn(String email, String username}) {
     _userBS.add(User(email, username));
   }

   // signOut sets the currentUser as null
   void signOut() => _userBS.add(null);

   // signIn and signOut methods that tamper the state could do other 
   // actions like recording analytics or carrying out navigation.
   // Also, they could do some validation or run some checks before
   // emitting values. The idea is that you get comfortable with
   // updating the values of BehaviorSubject (hence emitting streams) 
   // from controlled methods within the service.
}
```

Another state manipulation point is at initializing services. Some streams may warrant an asynchronous initializer before they should be used. You can define `init` methods in the services, and call the methods before calling [<FontIcon icon="fa-brands fa-dart-lang"/>`runApp`](https://api.flutter.dev/flutter/widgets/runApp.html) in the topmost main method in Flutter.

`init` methods may be "localStorage"-saved values from previous app runs. They can make API calls, check permissions, or set up [<FontIcon icon="fa-brands fa-dart-lang"/>EventChannel](https://api.flutter.dev/flutter/services/EventChannel-class.html) listeners. When you call them before `runApp`, be sure to call `ensureInitialized()` from [<FontIcon icon="fa-brands fa-dart-lang"/>`WidgetsFlutterBinding`](https://api.flutter.dev/flutter/widgets/WidgetsFlutterBinding-class.html) before initializing the services. This is especially mandatory if any of the service `init` code will access a [<FontIcon icon="fa-brands fa-dart-lang"/>`PlatformChannel`](https://docs.flutter.dev/platform-integration/platform-channels).

```dart title="authentication_service.dart"
// ... imports
class AuthenticationService {
  // ... other code

  // initialize the service and carry-out other setups if need be.
  Future<void> init() async => _userBS.add(await _fetchSavedUser());
}
```

```dart title="main.dart"
import 'package:flutter/material.dart';
import 'authentication_service.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize the service to be sure it is up and running before
  // launching the app. You could also initialize other services here.
  // Only do this if they are carrying out asynchronous executions,
  // and the results need to be ready before the UI launches.
  await AuthenticationService.instance.init();

  runApp(const MyApp());
}
```

---

## How to Use Dart Streams in Flutter Widgets

Flutter comes with a built-in [<FontIcon icon="fa-brands fa-dart-lang"/>StreamBuilder](https://api.flutter.dev/flutter/widgets/StreamBuilder-class.html) widget. It takes a stream and a builder function. This builder function will get a `BuildContext` and snapshot data about the stream. The function should always return a widget.

When building UIs, you can wrap UI parts that depend on or display values emitted from app-wide streams in `StreamBuilders`. That way, once the stream emits a value, Flutter auto-rebuilds the children widget of the `StreamBuilders` with the latest values.

```dart
import 'package:flutter/material.dart';
import 'counter_service.dart';

class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<int>(
      stream: CounterService.instance.countStream, // The stream to listen to
      initialData: CounterService.instance.currentCount, // Initial value
      builder: (context, snapshot) {
        // Check if the snapshot has data
        if (snapshot.hasData) {
          return Text('Counter: ${snapshot.data}', style: TextStyle(fontSize: 24));
        } else {
          // Handle any error or empty state
          return Text('Loading...', style: TextStyle(fontSize: 24));
        }
      },
    );
  }
}
```

`StreamBuilders` are great tools. However, there are times when it is not suitable to use them. For example:

- When a given UI screen depends on multiple streams that are exposed by the same or different services.
- When you want to do some computation on the stream values before rendering them in the UI.

In those cases, we need to listen to the streams separately in `initState`, set values through `setState` calls (to update the UI), and dispose of the `StreamSubscriptions` in the StatefulWidget's `dispose` method.

Listening to the streams separately allows us to perform any customizations or to merge data when the streams emit values. In addition, we make our UI code easier to read given that we’ve taken out logic-related code from the build method. However, we should do this only when necessary: `StreamBuilders` will, most of the time, be sufficient.

```dart :collapsed-lines
import 'dart:async';

import 'package:flutter/material.dart';
import 'counter_service.dart';

class CounterStatefulWidget extends StatefulWidget {
  const CounterStatefulWidget({super.key});

  @override
  _CounterStatefulWidgetState createState() => _CounterStatefulWidgetState();
}

class _CounterStatefulWidgetState extends State<CounterStatefulWidget> {
  late StreamSubscription<int> counterSub;
  int count = CounterService.instance.currentCount;

  @override
  void initState() {
    super.initState();

    // Initialize the stream subscription
    counterSub = CounterService.instance.countStream.listen((count) {
      // Update state on new stream value
      setState(() => this.count = count);
    });
  }

  @override
  void dispose() {
    // Dispose of the stream subscription to avoid memory leaks
    counterSub.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Text('Counter: $count', style: TextStyle(fontSize: 24));
  }
}
```

The example above demonstrates listening and disposing from outside the build method. The example is not a good use case of when you should do that.

---

## How to Make a Service Depend on Another

In complex applications, it's common to have services that depend on each other. The dependent service can listen to streams and call methods of the independent service. Also, the dependent service can import and reference the independent service just as we’ve been doing in UI code above.

For instance, if we are building an e-commerce app, a `CartService` may depend on an `AuthenticationService` to fetch carts and orders for the signed-in user. If the user signs out, some `currentUser` stream in the `AuthenticationService` will emit `null`. In turn, the listening `CartService` will update the cart. When next a new user signs in, it will fetch the new cart.

```dart :collapsed-lines
import 'package:rxdart/rxdart.dart';
import 'authentication_service.dart';

// Item model representing a cart item.
class CartItem {
  final String name;
  final int quantity;

  const CartItem(this.name, this.quantity);
}

// CartService to manage the user's shopping cart.
class CartService {
  // ...

  // Dependency on AuthenticationService.
  final _auth = AuthenticationService.instance;

  final _cartItemsBS = BehaviorSubject<List<CartItem>>();
  Stream<List<CartItem>> get cartStream => _cartItemsBS.stream;

  CartService() {
    // Listen to the currentUser stream in AuthenticationService.
    _auth.currentUserStream.listen((user) {
      if (user == null) {
        // User signed out, clear the cart.
        _clearCart();
      } else {
        // User signed in, fetch their cart.
        _fetchCartForUser(user.email);
      }
    });
  }

  // Method to clear the cart (called on sign-out).
  void _clearCart() {
    _cartItemsBS.add([]);  // Emit an empty list to clear the cart.
  }

  // Method to fetch the cart for a signed-in user (simulated).
  Future<void> _fetchCartForUser(String email) async {
    // ...
  }
}
```

Watch out for [<FontIcon icon="fa-brands fa-wikipedia-w"/>circular dependency](https://en.wikipedia.org/wiki/Circular_dependency) problems when your services depend on each other. Circular dependency occurs when two services inter-depend on themselves. This scenario is usually inevitable as business logic grows.

When faced with it, lift the state they want to co-share to a different service and import this new service into the others. Another solution is to use Dart’s `late` keywords when importing the interdependent services. You can also find ways to ensure that variable accessing is within functions and not at some top-level declaration.

---

## How to Improve Streams with rxdart Classes and Extensions

Asides from having service methods that update streams, you can also have new or improved streams based on existing ones, by using `rxdart` classes and extensions.

An example class is [<FontIcon icon="fas fa-globe"/>`CombineLatestStream`](https://pub.dev/documentation/rxdart/latest/rx/CombineLatestStream-class.html). It takes multiple streams and a combiner function to return a new stream that will re-emit the combined latest values of the source streams (depending on the optional combiner).

```dart
import 'package:rxdart/rxdart.dart';

class MultipliedCounterService {
  // ... 

  final _counterBS = BehaviorSubject<int>()..add(0);
  final _multiplierBS = BehaviorSubject<int>()..add(2);

  Stream<int> get combinedStream => CombineLatestStream(
        [_counterBS.stream, _multiplierBS.stream],
        (values) => values[0] * values[1],
      );

  void incrementCounter() => _counterBS.add(_counterBS.value + 1);
  void changeMultiplier(int mul) => _multiplierBS.add(mul);
}
```

Another good stream method is [<FontIcon icon="fas fa-globe"/>`debounceTime`](https://pub.dev/documentation/rxdart/latest/rx/DebounceExtensions/debounceTime.html). This is a stream extension that is useful for ignoring frequent emissions and processing the latest value after a delay (like when searching). An emission will only occur after the set duration and when there is no other emission in between that time. It helps avoid excessive API calls by waiting for a period of inactivity before emitting the latest value.

```dart
import 'package:rxdart/rxdart.dart';

class SearchService {
  // ... 

  final _searchQueryBS = BehaviorSubject<String>()..add('');

  // Stream with debouncing to emit values only after a
  // 300ms delay. For example: keystrokes will be bundled at once.
  Stream<String> get debouncedSearchQueryStream =>
      _searchQueryBS.stream.debounceTime(Duration(milliseconds: 300));

  void updateSearchQuery(String query) => _searchQueryBS.add(query);
}
```

The `rxdart` package provides more classes and stream extensions that will be useful to you, even if you don’t use this architecture. Check them out later on.

---

## How to Update State in AppLifecycle Callbacks

When a user minimizes or leaves your application and comes back, some external things you rely on for data may have changed.

For example, when you prompt a user to grant any permissions, the operating system displays a popup over your application. Programmatically, the displayed popup caused your app to lose focus or go into background mode. When the popup is gone, your app resumes focus and you need to detect whether you got the permissions.

Equally, if you are managing the contents of a specific File Explorer Directory within your application (like converted music, encrypted docs, call logs, and so on), when your app goes in background, there could be changes to that directory from the user, which are worth detecting when the user comes back.

Sometimes, you may want to know when the user comes back to your application for authentication purposes, like terminating a session if they stayed away for too long and they need to re-authenticate. Other times, you may want to refresh app contents, to retain the user, as you can do if building a social media app.

In all these cases, we need a way to programmatically know when our app comes back to the user's focus after the user had left. Luckily, Flutter provides us with [<FontIcon icon="fa-brands fa-dart-lang"/>`AppLifecycleState`](https://api.flutter.dev/flutter/dart-ui/AppLifecycleState.html) and a way to react to changes to them.

An app’s lifecycle refers to its various states while it is running. In Flutter, `AppLifecycleState` includes detached, resumed, inactive, hidden, and paused. In the above example cases, anytime the user comes back to the app, the app’s lifecycle state becomes `AppLifecycleState.resumed`.

We can react to lifecycle changes and call our service methods when a particular state occurs. To listen to lifecycle changes, your service class should add the `WidgetsBindingObserver` mixin to its declaration. Then you should override `didChangeAppLifecycleState` with a callback. This callback should handle states it is interested in.

```dart
import 'package:flutter/material.dart';

class PermissionService with WidgetsBindingObserver {
  // ...

  Future<void> checkPermissions() async {
    // ... 
  }

  @override
  Future<void> didChangeAppLifecycleState(AppLifecycleState state) async {
    if (state == AppLifecycleState.resumed) {
      await checkPermissions();
    }
    // you can check for the other states too and handle as expected.
  }
}
```

---

## Flexibility in State Management

There are multiple choices and flavors for state management in the Flutter community. Most of the time, the same features can always be built with any state management of choice.

With that in mind, be flexible with state management architectures in Flutter. They are not some hard cast rules. Bend and play around with them to suit your unique app cases as there is no "one size fits all" here.

You can play around with streams and services. You could use [<FontIcon icon="fas fa-globe"/>`getIt`](https://pub.dev/packages/get_it) for obtaining singletons. `getIt` also allows you to obtain scoped singletons, that is, singletons attached to a navigator or a logical part of features (within a search for example).

You can also combine this architecture with others. Like declaring and managing streams as explained here but in providers or cubits. Or bringing in features of other architectures into services you declare as described in this article.

Just be sure you know what you're doing and that you understand how to coordinate the variables representing app state. Preferably, document your choice of architectures in your codebase for future reference.

---

## Summary

In summary, we have explored an efficient architecture for managing app-wide state in Flutter using Dart streams and singleton services.

We've also seen how to manipulate streams, how to use them in UI code, make services depend on each other, improve streams using `rxdart`, and handle app lifecycle changes.

Remember that state management in Flutter is flexible, and no one solution fits all. Tailor your choice of state management architecture to fit your specific app needs.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Streams and Services for Flutter State",
  "desc": "Among the many state management architectures in Flutter, combining Dart streams with singleton classes (services) is an unpopular yet easy architecture. In this article, we’ll explore how to achieve this combination for app-wide state in Flutter. Ta...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/flutter-streams-and-services.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
