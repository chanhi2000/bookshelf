---
lang: en-US
title: "Routing and Multi-Screen Development in Flutter - a Beginner's Guide"
description: "Article(s) > Routing and Multi-Screen Development in Flutter - a Beginner's Guide"
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
      content: "Article(s) > Routing and Multi-Screen Development in Flutter - a Beginner's Guide"
    - property: og:description
      content: "Routing and Multi-Screen Development in Flutter - a Beginner's Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/routing-and-multi-screen-development-in-flutter-for-beginners.html
prev: /programming/dart/articles/README.md
date: 2025-06-27
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750956717640/60bc5ee7-640d-4d8c-8b8d-64e422fadf56.png
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
  name="Routing and Multi-Screen Development in Flutter - a Beginner's Guide"
  desc="Modern mobile applications are far from static, single-view experiences. Instead, they are dynamic, multi-faceted environments where users seamlessly transition between different features, content, and functionalities. Because of this inherent comple..."
  url="https://freecodecamp.org/news/routing-and-multi-screen-development-in-flutter-for-beginners"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1750956717640/60bc5ee7-640d-4d8c-8b8d-64e422fadf56.png"/>

Modern mobile applications are far from static, single-view experiences. Instead, they are dynamic, multi-faceted environments where users seamlessly transition between different features, content, and functionalities. Because of this inherent complexity, you’ll need to set up robust routing as well as a well-designed multi-screen architecture.

In this tutorial, you'll learn about Flutter's fundamental navigation systems: Imperative Navigation (`Navigator.push`/`pop`) and Named Routes. We'll explore their practical implementation through building an example Car List app. Through this process, you’ll learn how to navigate between a list of cars and their detailed views, and how to pass data between screens.

By the end, you'll gain a solid understanding of how to manage navigation stacks and create a smooth user experience in your Flutter applications.

::: note Prerequisites

To get the most out of this tutorial, you should have:

- **Basic understanding of the Dart programming language:** Familiarity with concepts like variables, data types, functions, classes, and asynchronous programming.
- **Fundamental knowledge of Flutter widgets:** Knowing how to use `StatelessWidget`, `StatefulWidget`, and basic layout widgets like `Column`, `Row`, `Container`, and `Text`.
- **Flutter SDK installed and configured:** Ensure you have a working Flutter development environment set up on your machine.
- **A code editor:** Visual Studio Code or Android Studio with Flutter and Dart plugins installed.

:::

---

## Why Should You Build Multi-Screen Apps?

Real-world apps are rarely single-screen. Imagine a banking app that only shows your balance, or a social media app that only displays your feed. It's simply not practical.

Users expect to be able to:

- View a list of items (for example, cars, products, news articles).
- Tap on an item to see its detailed information.
- Access user profiles, settings, or shopping carts.
- Complete multi-step processes like checkout or onboarding.

This intricate dance between different views highlights that navigation is a core user experience component. A fluid, intuitive, and predictable navigation flow directly translates to improved user satisfaction and maintainability for developers. Confusing navigation, on the other hand, can quickly lead to user frustration and abandonment.

---

## Flutter's Navigation Systems

Flutter provides powerful and flexible navigation mechanisms, catering to various application complexities. At a high level, we can categorize these mechanisms in the following ways:

1. **Imperative Navigation (Navigator.push / pop):** This is the most basic and direct way to control the navigation stack. You explicitly tell the `Navigator` to push a new route or pop the current one.
2. **Named Routes:** A more structured approach where routes are identified by string names, allowing for centralized configuration.
3. `onGenerateRoute` / `onUnknownRoute`: Advanced callbacks within `MaterialApp` or `WidgetsApp` that provide fine-grained control over how routes are generated, especially useful for dynamic or deep linking scenarios.
4. **Declarative Navigation (for example,** `go_router`, `Beamer`): For highly complex apps with deep linking, nested navigation, and web support, declarative packages offer a more state-driven approach to routing, where the URL or app state defines the current screen.

For the purpose of this article, we will focus on the built-in **Imperative Navigation** and the more scalable **Named Routes**, illustrating them with the Car List App example. Let’s see how they work.

---

## The Simple Navigator API: `Navigator.push`

The most straightforward way to navigate in Flutter is using `Navigator.push`. This method takes a `MaterialPageRoute` (or a `CupertinoPageRoute` for iOS-style transitions) that defines the widget for the new screen.

```dart
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => DetailsScreen()),
);
```

::: info Characteristics

- **Best for smaller apps:** Where the number of screens is limited and data passing is simple.
- **Can pass data using constructor:** You can directly pass data to the new screen's constructor (for example, `DetailsScreen(car: myCar)`). This is intuitive for simple data.

:::

While easy to use, `Navigator.push` can become cumbersome for larger apps as it requires direct instantiation of widgets at every navigation point, making centralized route management difficult.

---

## Named Routes: The Scalable Approach

For applications with multiple screens and a more defined navigation structure, **named routes** offer a cleaner and more scalable solution. With named routes, you define a map of string names to screen-building functions within your `MaterialApp`.

Our Car List App perfectly demonstrates this:

```dart
// In MyApp widget's build method
MaterialApp(
  initialRoute: '/', // The starting screen of our app
  routes: {
    '/': (context) => HomeScreen(),          // Maps '/' to HomeScreen
    '/details': (context) => DetailsScreen(), // Maps '/details' to DetailsScreen
    '/profile': (context) => ProfileScreen(), // Maps '/profile' to ProfileScreen
  },
);
```

To navigate using a named route, you use `Navigator.pushNamed()`:

```dart
// From HomeScreen to DetailsScreen
Navigator.pushNamed(context, '/details');

// From HomeScreen to ProfileScreen
Navigator.pushNamed(context, '/profile');
```

::: info Advantages of named routes

- **More scalable:** As your app grows, managing routes by name is far easier than scattering `MaterialPageRoute` instantiations throughout your codebase.
- **Easy to centralize route management:** All your app's main navigation paths are defined in one clear location (the `routes` map).
- **Improved readability:** Route names provide semantic meaning to your navigation actions.

:::

### Passing and Receiving Data with Named Routes

A common requirement for multi-screen apps is passing data from one screen to the next (for example, a selected car object from the list to its detail view). With named routes, the `arguments` property of `Navigator.pushNamed` is the idiomatic way to do this.

When navigating:

```dart
// From HomeScreen, passing the 'car' object to the DetailsScreen
Navigator.pushNamed(context, '/details', arguments: car);
```

On the receiving screen, `ModalRoute.of(context)!.settings.arguments` is used to retrieve the passed data. Remember to cast it to the expected type and handle nullability.

```dart
class DetailsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Retrieve the Car object passed as arguments
    final Car car = ModalRoute.of(context)!.settings.arguments as Car;

    return Scaffold(
      appBar: AppBar(title: Text(car.name)),
      // ... rest of the UI using 'car' data
    );
  }
}
```

This pattern ensures type safety (with the `as Car` cast) and allows any data type to be passed, from simple strings to complex custom objects.

---

## Backstack Management: Controlling User Flow

The `Navigator` manages a **stack of routes**. When you `push` a new route, it's added to the top. When you go back, the top route is `popped` off the stack. Understanding and controlling this backstack is crucial for a smooth user experience.

- `Navigator.pop(context)`: This is the most common way to return to the previous screen. It removes the topmost route from the navigation stack. In our app, both `DetailsScreen` and `ProfileScreen` use this to return to `HomeScreen`.

```dart
// In DetailsScreen or ProfileScreen
ElevatedButton.icon(
  onPressed: () => Navigator.pop(context), // Go back to the previous screen
  icon: Icon(Icons.arrow_back),
  label: Text('Back'),
)
```

- `Navigator.pushReplacementNamed(context, '/newRouteName')`: Use this if you don't want the user to go back to the *current* screen. It replaces the current route on the stack with the new one. This is ideal for scenarios like a login screen, where after successful login, you don't want the user to be able to go back to the login page using the back button.
- `Navigator.pushNamedAndRemoveUntil(context, '/newRouteName', (route) => false)`: This powerful method pushes a new route and then removes *all* the previous routes until the `predicate` function returns `true`. If the predicate always returns `false` (as shown), it clears the entire stack and makes the new route the only one. This is perfect for **login flows, onboarding, or splash screens** where, once completed, the user should not be able to return to those initial screens.

---

## Code Organization Tips for Scalable Navigation

As your app grows, maintaining a clear structure for your multi-screen components becomes vital. Here are some tips to help you keep things organized.

### 1. Organize by feature:

Instead of dumping all screens into one folder, group files related to a specific feature. For example:

- <VPIcon icon="fas fa-folder-open"/>`lib/features/home/`<VPIcon icon="fa-brands fa-dart-lang"/>`home_screen.dart`
- <VPIcon icon="fas fa-folder-open"/>`lib/features/home/widgets/`
- <VPIcon icon="fas fa-folder-open"/>`lib/features/details/`<VPIcon icon="fa-brands fa-dart-lang"/>`details_screen.dart`
- <VPIcon icon="fas fa-folder-open"/>`lib/features/profile/`<VPIcon icon="fa-brands fa-dart-lang"/>`profile_screen.dart`

### 2. Use dedicated folders for UI components

- <VPIcon icon="fas fa-folder-open"/>`lib/widgets/` (for reusable UI widgets across features)
- <VPIcon icon="fas fa-folder-open"/>`lib/screens/` (for top-level screen widgets, or within feature folders)

**3. Abstract navigation logic:** For bigger apps, consider creating a separate file (for example, <VPIcon icon="fas fa-folder-open"/>`lib/utils/app_routes.dart`) to hold all your named route constants and potentially even methods for simplified navigation, rather than hardcoding string literals.

---

## Scalable Navigation: When Built-in Isn't Enough

While named routes are excellent for many applications, very large or complex apps with deep nested navigation, dynamic route generation, or specific web-based routing needs might benefit from third-party packages that offer a **declarative navigation** approach.

Consider packages like:

- `go_router`: A Google-supported package that focuses on declarative routing, deep linking, and web-friendly URLs. It maps application state to URLs, providing a powerful and flexible system.
- `auto_route`: This package uses code generation to automatically create routing boilerplate, reducing manual effort and potential errors for complex navigation graphs.

These solutions provide higher-level abstractions and solve common headaches associated with scaling navigation in large applications.

### Understanding the Car List App Example

In this tutorial, we will be building a simple Car List App to illustrate the different navigation methods. This application will consist of these primary screens:

1. **Car List Screen:** This screen will display a list of cars, each with basic information like its name and year. Users will be able to tap on a car in this list.
2. **Car Detail Screen:** When a user taps on a car from the list, they will be navigated to this screen, which will display more detailed information about the selected car.
3. **Profile Screen:** When a user taps on the floating action button with the person icon, they will be navigated to the profile screen

This straightforward example will allow us to clearly demonstrate how to navigate between screens, pass data from one screen to another, and manage the navigation stack using Flutter's built-in navigation systems.

Now let’s get into our Car List App project so you can really see how this all works.

---

## How to Set Up Your Flutter Project: The Car List App

To create this project, you'll first need Flutter installed and configured on your system. If you haven't already, ensure you have the Flutter SDK and a suitable IDE (like VS Code or Android Studio) set up.

### Step 1: Create a New Flutter Project

Open your terminal or command prompt and run the following command to create a new Flutter project:

```sh
flutter create car_list_app
```

This command creates a new directory named <VPIcon icon="fas fa-folder-open"/>`car_list_app` with a basic Flutter project structure inside it.

### Step 2: Organize the Project Structure

Navigate into your new <VPIcon icon="fas fa-folder-open"/>`car_list_app` directory (`cd car_list_app`). Inside the <VPIcon icon="fas fa-folder-open"/>`lib` folder, you'll initially find <VPIcon icon="fa-brands fa-dart-lang"/>`main.dart`. We're going to enhance this structure to better organize our code.

Here's the recommended directory structure for your project:

```plaintext title="file structure"
car_list_app/
├── lib/
│   ├── main.dart
│   ├── models/
│   │   └── car.dart
│   ├── data/
│   │   └── dummy_data.dart
│   ├── screens/
│   │   ├── home_screen.dart
│   │   ├── details_screen.dart
│   │   └── profile_screen.dart
│   └── widgets/
│       └── car_list_tile.dart (Optional, for more complex list items)
├── pubspec.yaml
├── ... (other Flutter project files)
```

Now, let's populate these files with your provided code.

### Step 3: Populate the Files

#### 1. <VPIcon icon="fas fa-folder-open"/>`lib/models/`<VPIcon icon="fa-brands fa-dart-lang"/>`car.dart`

This file will contain your `Car` data model.

```dart title="lib/models/car.dart"
class Car {
  final String id;
  final String name;
  final String imageUrl;
  final String description;

  Car({
    required this.id,
    required this.name,
    required this.imageUrl,
    required this.description,
  });
}
```

#### 2. <VPIcon icon="fas fa-folder-open"/>`lib/data/`<VPIcon icon="fa-brands fa-dart-lang"/>`dummy_data.dart`

This file will hold your static car data list. In a real application, this data would likely come from an API or database.

```dart title="lib/data/dummy_data.dart"
import '../models/car.dart';

final List<Car> carList = [
  Car(
    id: '1',
    name: 'Tesla Model S',
    imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/2025-tesla-model-s-2-672d42e16475f.jpg?crop=0.503xw:0.502xh;0.262xw,0.289xh&resize=980:*',
    description: 'Electric car with autopilot features.',
  ),
  Car(
    id: '2',
    name: 'BMW M4',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/2021_BMW_M4_Competition_Automatic_3.0_Front.jpg/1200px-2021_BMW_M4_Competition_Automatic_3.0_Front.jpg',
    description: 'Sporty and powerful coupe.',
  ),
  Car(
    id: '3',
    name: 'Ford Mustang',
    imageUrl: 'https://images.prismic.io/carwow/c2d2e740-99e2-4faf-8cfa-b5a75c5037c0_ford-mustang-2024-lhd-front34static.jpg?auto=format&cs=tinysrgb&fit=max&q=60',
    description: 'Iconic American muscle car.',
  ),
];
```

#### 3. <VPIcon icon="fas fa-folder-open"/>`lib/screens/`<VPIcon icon="fa-brands fa-dart-lang"/>`home_screen.dart`

This file will contain the `HomeScreen` widget. Notice that the imports now point to our new file locations.

```dart :collapsed-lines title="lib/screens/home_screen.dart"
import 'package:flutter/material.dart';
import '../data/dummy_data.dart'; // Import dummy data
import '../models/car.dart';    // Import Car model

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Available Cars')),
      body: ListView.builder(
        itemCount: carList.length,
        itemBuilder: (context, index) {
          final car = carList[index];
          return Card(
            margin: const EdgeInsets.all(8),
            child: ListTile(
              contentPadding: const EdgeInsets.all(10),
              leading: CircleAvatar(
                radius: 40,
                backgroundImage: NetworkImage(car.imageUrl),
              ),
              title: Text(car.name, style: const TextStyle(fontWeight: FontWeight.bold)),
              subtitle: Text(car.description, maxLines: 2, overflow: TextOverflow.ellipsis),
              onTap: () {
                Navigator.pushNamed(
                  context,
                  '/details',
                  arguments: car,
                );
              },
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.pushNamed(context, '/profile'),
        child: const Icon(Icons.person),
        tooltip: 'Go to Profile',
      ),
    );
  }
}
```

#### 4. <VPIcon icon="fas fa-folder-open"/>`lib/screens/`<VPIcon icon="fa-brands fa-dart-lang"/>`details_screen.dart`

This file will hold the `DetailsScreen` widget.

```dart :collapsed-lines title="lib/screens/details_screen.dart"
import 'package:flutter/material.dart';
import '../models/car.dart'; // Import Car model

class DetailsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final Car car = ModalRoute.of(context)!.settings.arguments as Car;

    return Scaffold(
      appBar: AppBar(title: Text(car.name)),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(20),
                child: Image.network(
                  car.imageUrl,
                  width: 250,
                  height: 250,
                  fit: BoxFit.cover,
                ),
              ),
              const SizedBox(height: 24),
              Text(
                car.name,
                style: const TextStyle(fontSize: 26, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 12),
              Text(
                car.description,
                style: const TextStyle(fontSize: 16),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 40),
              ElevatedButton.icon(
                onPressed: () => Navigator.pop(context),
                icon: const Icon(Icons.arrow_back),
                label: const Text('Back'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

#### 5. <VPIcon icon="fas fa-folder-open"/>`lib/screens/`<VPIcon icon="fa-brands fa-dart-lang"/>`profile_screen.dart`

This file will contain the `ProfileScreen` widget.

```dart :collapsed-lines title="lib/screens/profile_screen.dart"
import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  final String profileImage = 'https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('My Profile')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center, // Center content vertically
          children: [
            CircleAvatar(
              radius: 60,
              backgroundImage: NetworkImage(profileImage),
            ),
            const SizedBox(height: 20),
            const Text(
              'John Doe',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
            Text('john.doe@example.com', style: TextStyle(color: Colors.grey[600])),
            const SizedBox(height: 30),
            ElevatedButton.icon(
              onPressed: () => Navigator.pop(context),
              icon: const Icon(Icons.arrow_back),
              label: const Text('Back to Home'),
            ),
          ],
        ),
      ),
    );
  }
}
```

#### 6. <VPIcon icon="fas fa-folder-open"/>`lib/`<VPIcon icon="fa-brands fa-dart-lang"/>`main.dart`

Finally, your <VPIcon icon="fa-brands fa-dart-lang"/>`main.dart` will become much cleaner, and will mainly be responsible for running the app and defining the global routes.

```dart title="lib/main.dart"
import 'package:flutter/material.dart';
import 'screens/home_screen.dart';    // Import HomeScreen
import 'screens/details_screen.dart'; // Import DetailsScreen
import 'screens/profile_screen.dart'; // Import ProfileScreen

void main() => runApp(const MyApp()); // Add const for MyApp

class MyApp extends StatelessWidget {
  const MyApp({super.key}); // Add const constructor

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Car List App',
      theme: ThemeData(primarySwatch: Colors.blue),
      initialRoute: '/',
      routes: {
        '/': (context) => const HomeScreen(),      // Add const to screen widgets
        '/details': (context) => const DetailsScreen(),
        '/profile': (context) => const ProfileScreen(),
      },
    );
  }
}
```

### Step 4: Run Your Application

After structuring your project and placing the code in the respective files, you can run your application from the root of your <VPIcon icon="fas fa-folder-open"/>`car_list_app` directory:

```sh
flutter run
```

This will launch the app on your connected device or emulator. You should see the list of cars, and be able to navigate to their details and the profile screen, demonstrating the clean multi-screen architecture and routing you've implemented.

::: info Screenshots

![home screen screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1749887050970/68969384-f510-4a77-b08f-989440f9a7ac.png)

![detail screen screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1749887061102/a293159f-77b9-4904-8a86-d98ba73cf574.png)

![profile screen screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1749887072401/452170e1-770c-4807-a648-941c397f84ec.png)

You can view the completed project here:

<SiteInfo
  name="Atuoha/routing_workshop"
  desc="Routing workshop for GDG Ahlen, Germany."
  url="https://github.com/Atuoha/routing_workshop/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/58531445827294a664c5e09d111691ede75e3e4c5fedef334c12b8dd5b2477f7/Atuoha/routing_workshop"/>

:::

---

## Conclusion

This organized structure significantly improves readability, reusability, and maintainability as your Flutter applications grow in complexity.

Building effective multi-screen applications in Flutter hinges on a clear understanding and strategic implementation of its navigation systems. From the simplicity of `Navigator.push` to the scalability of named routes with `Navigator.pushNamed` and `ModalRoute.of`, Flutter offers robust tools for managing your app's flow and passing essential data between screens.

By thoughtfully organizing your code and leveraging the appropriate navigation strategy, you can create user-friendly, maintainable, and scalable Flutter applications that stand out in the crowded app marketplace.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Routing and Multi-Screen Development in Flutter - a Beginner's Guide",
  "desc": "Modern mobile applications are far from static, single-view experiences. Instead, they are dynamic, multi-faceted environments where users seamlessly transition between different features, content, and functionalities. Because of this inherent comple...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/routing-and-multi-screen-development-in-flutter-for-beginners.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
