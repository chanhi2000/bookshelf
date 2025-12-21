---
lang: en-US
title: "How to Get Started With GoRouter in Flutter"
description: "Article(s) > How to Get Started With GoRouter in Flutter"
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
      content: "Article(s) > How to Get Started With GoRouter in Flutter"
    - property: og:description
      content: "How to Get Started With GoRouter in Flutter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-get-started-with-gorouter-in-flutter.html
prev: /programming/dart/articles/README.md
date: 2025-09-04
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756945807034/30528205-5ed9-4517-add6-5a3f32e6ac96.png
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
  name="How to Get Started With GoRouter in Flutter"
  desc="Navigating between screens in Flutter is crucial for any app. And while the built-in Navigator API provides functionality, it can get complex for larger projects. This is where go_router shines, offering a more declarative, URL-based, and feature-ric..."
  url="https://freecodecamp.org/news/how-to-get-started-with-gorouter-in-flutter"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1756945807034/30528205-5ed9-4517-add6-5a3f32e6ac96.png"/>

Navigating between screens in Flutter is crucial for any app. And while the built-in Navigator API provides functionality, it can get complex for larger projects.

This is where `go_router` shines, offering a more declarative, URL-based, and feature-rich navigation system. This article delves deep into every detail of `go_router`, guiding you from setup to advanced features like redirection and nested routes.

`go_router` is a flexible and lightweight routing library for Flutter that simplifies the navigation process and provides a clean API for managing routes, passing parameters, and handling redirects. It’s designed to be easy to use while offering advanced features for more complex navigation requirements.

Navigation plays a crucial role in crafting seamless user experiences. While the built-in Navigator 2.0 offers versatility, it can become complex in larger projects. Here's where `go_router` steps in and helps simplify the process significantly.

::: note Prerequisites

To follow along with this article and build the example application, you'll need:

- **Flutter SDK:** Ensure you have Flutter installed and configured on your development machine. You can find installation instructions on the official Flutter website.
- **Basic Flutter knowledge:** Familiarity with Flutter widgets, state management (even basic `setState`), and general app development concepts will be helpful.
- **Dart language basics:** A good understanding of Dart syntax, classes, and functions is essential.
- **An IDE:** Visual Studio Code or Android Studio with the Flutter and Dart plugins installed.

:::

---

## What We'll Build

By the end of this article, we will have built a minimalistic shopping application that demonstrates the core functionalities of `go_router`. This application will have the following features:

1. A Product Listing screen displaying a grid of products.
2. A Product Details screen showing detailed information about a selected product.
3. A Product Purchase screen that confirms a product purchase.
4. Navigation between these screens using `go_router`, including passing data via query and path parameters.
5. Route Redirection and Exit Guards for enhanced navigation control.

---

## Installation

To begin, add `go_router` to your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` file:

```yaml title="pubspec.yaml"
dependencies:
  go_router: ^13.0.0
```

This adds the `go_router` package as a dependency to your project, allowing you to use its functionalities.

Import it in your Dart files:

```dart
import 'package:go_router/go_router.dart';
```

This statement makes all the classes and functions provided by the `go_router` package available for use in your Dart file.

---

## How to Define Routes

Create a list of `GoRoute` objects, each defining a route:

```dart
final routes = [
  GoRoute(
    path: '/',
    builder: (context, state) => const HomeScreen(),
  ),
  GoRoute(
    path: '/products/:id',
    builder: (context, state) => ProductDetailsScreen(productId: state.params['id']!),
  ),
  // ... more routes
];
```

Here’s what’s going on in this code:

- `final routes = [...]`: This declares a final list named `routes` which will hold all our route configurations.
- `GoRoute(...)`: This is the core class for defining a route. Each `GoRoute` object represents a distinct path in your application.
- `path: '/'`: The `path` property defines the URL path for this route. In this case, `/` represents the root or home screen of the application.
- `builder: (context, state) => const HomeScreen()`: The `builder` property is a function that returns the widget to be displayed when this route is active. `context` provides the build context, and `state` gives access to route-specific information like parameters. Here, it builds a `HomeScreen` widget.
- `path: '/products/:id'`: This route defines a dynamic path. The `:id` part is a path parameter, meaning that whatever value is in that position in the URL will be captured as a parameter.
- `builder: (context, state) => ProductDetailsScreen(productId: state.params['id']!)`: When this route is activated, it builds a `ProductDetailsScreen`. `state.params['id']!` accesses the value of the `id` path parameter. The `!` asserts that `id` will not be null.

---

## How to Create the Router

Instantiate a `GoRouter` object, passing the routes and integrating it with your app's `MaterialApp`:

```dart
MaterialApp.router(
  routeInformationParser: GoRouter.of(context).routeInformationParser,
  routerDelegate: GoRouter(routes: routes),
  // ... other MaterialApp properties
)
```

Here’s what’s going on in this code:

- `MaterialApp.router(...)`: This is a special constructor for `MaterialApp` that integrates with a router delegate, like `GoRouter`.
- `routerConfig: router,` or `routeInformationParser: GoRouter.of(context).routeInformationParser, routerDelegate: GoRouter(routes: routes),`: These properties are crucial for `go_router` to manage navigation.
    1. `routeInformationParser`: Responsible for parsing the route information from the platform (for example, URL in a web browser) into a data structure that the router can understand.
    2. `routerDelegate`: Responsible for building and managing the navigation stack based on the parsed route information.
- `GoRouter(routes: routes)`: This creates an instance of `GoRouter`, passing the list of `GoRoute` objects we defined earlier.

---

## How to Navigate Between Screens

You can navigate programmatically using `GoRouter.of(context).go()`:

```dart
GoRouter.of(context).go('/products/123');
```

Here’s what this code is doing:

- `GoRouter.of(context)`: This static method retrieves the nearest `GoRouter` instance from the widget tree.
- `.go('/products/123')`: This method navigates to the specified URL path. This will replace the current route in the navigation stack.

You can also navigate using named routes like this:

```dart
GoRouter.of(context).goNamed('productDetails', params: {'id': 123});
```

In this code**:**

- `.goNamed('productDetails', ...)`: This method navigates to a route identified by its `name` property (which needs to be defined in the `GoRoute` configuration).
- `params: {'id': 123}`: This map provides values for any path parameters defined in the named route.

---

## How to Pass Parameters

In most real-world applications, we don’t just navigate between screens – we also need to pass information. For example:

- From a product list to a product details page, you’ll want to pass the product’s ID.
- From a checkout screen, you may need to pass the product description or price.

With go_router, you can pass parameters in two main ways:

1. **Query Parameters**: Added to the URL after a `?`. Useful for optional data or filters (for example, `/products?id=123`).
2. **Path Parameters**: Embedded directly in the route path. Best for required values (for example, `/products/123`).

Let’s explore both.

### 1. Passing Query Parameters

Query parameters are flexible key-value pairs attached to the URL. These are typically used for non-essential or optional information, such as filters, search queries, or IDs.

Example: tapping a product card to open its details screen.

```dart
GestureDetector( 
  onTap: () => context.goNamed(
    ProductDetailsScreen.routeName, 
    queryParameters: {'id': product.id}, 
  ), 
  child: SingleProduct(product: product), 
);
```

What’s happening here?

- `context.goNamed(...)`: Navigates to a route using its name (defined in your routes config).
- `queryParameters: {'id': product.id}`: Appends the product ID to the URL like this:

```sh
/product-details?id=abc123
```

On the destination screen, you retrieve the parameter like this:

```dart
GoRoute(
  path: ProductDetailsScreen.routeName,
  name: ProductDetailsScreen.routeName,
  builder: (context, state) {
    return ProductDetailsScreen(
      productId: state.uri.queryParameters['id'] ?? "",
    );
  },
)
```

- `state.uri.queryParameters['id']`: Extracts the `id` value from the URL.
- `?? ""`: Provides a default empty string if the parameter is missing.

Use query parameters when:

- The parameter is optional.
- You want to allow multiple parameters without changing the base route.
- The data doesn’t fundamentally change the structure of the route.

### 2. Passing Path Parameters

Path parameters are part of the route itself and are usually required. Without them, the route doesn’t make sense.

Example: a purchase flow where the product description is required.

Navigate to the route:

```dart
context.goNamed(
  'pay-now',
  pathParameters: {
    'description': product.description,
  },
);
```

Define the route:

```dart
GoRoute(
  path: 'product-purchase/:description',
  name: ProductPurchaseScreen.routeName,
  builder: (context, state) {
    return ProductPurchaseScreen(
      description: state.pathParameters['description']!,
    );
  },
)
```

What’s happening here?

- `path: 'product-purchase/:description'`: The `:description` part defines a dynamic segment.
- `pathParameters: {'description': product.description}`: Replaces `:description` with the actual value. The URL will look like:

```sh
/product-purchase/AwesomeProduct
```

- `state.pathParameters['description']!`: Retrieves the parameter inside the screen.

Use path parameters when:

- The value is required (for example, ID, username, slug).
- The route should not exist without it.

---

## Sub-routes and ShellRoute

As your app grows, you’ll need to organize routes in a hierarchy or keep persistent UI elements like a bottom navigation bar. go_router makes this possible with **Sub-routes** and **ShellRoute**.

### 1. Sub-routes

Sub-routes allow you to nest routes under a parent. This keeps related routes grouped together.

Example: Profile and its settings page.

```dart
GoRoute(
  path: '/profile',
  builder: (context, state) => ProfileScreen(),
  routes: [
    GoRoute(
      path: 'settings',
      builder: (context, state) => SettingsScreen(),
    ),
  ],
),
```

- `/profile`: Opens `ProfileScreen`.
- `/profile/settings`: Opens `SettingsScreen`.

Use sub-routes to keep related screens organized under one parent route.

### 2. ShellRoute

ShellRoute is used when you need a persistent UI wrapper (like a `BottomNavigationBar` or `Drawer`) that stays visible while switching between child routes.

Example: A bottom navigation layout.

```dart
ShellRoute(
  builder: (context, state, child) {
    return MainScaffold(child: child); // contains BottomNavigationBar
  },
  routes: [
    GoRoute(
      path: '/home',
      builder: (context, state) => HomeScreen(),
    ),
    GoRoute(
      path: '/profile',
      builder: (context, state) => ProfileScreen(),
    ),
  ],
),
```

`ShellRoute`: Wraps a persistent widget (`MainScaffold`). `child`: Dynamically changes depending on which route is active.

Use ShellRoute when:

- You need tabs or bottom navigation.
- You want a layout to remain while only the inner content changes.

---

## Redirection and Guards

In many apps, navigation isn’t just about moving between pages. It’s also about controlling who can access what and when. For example:

- Redirecting a logged-out user to the login screen.
- Preventing non-admins from entering admin routes.

go_router provides two main tools here: **redirects** and **guards**.

### 1. Redirection

A redirect automatically reroutes users if a condition is not met.

Example: redirecting old URLs or enforcing login.

```dart
GoRoute(
  path: '/old-path',
  redirect: (state) => '/new-path',
),

GoRoute(
  path: '/dashboard',
  builder: (context, state) => DashboardScreen(),
  redirect: (context, state) {
    final isLoggedIn = AuthService.isLoggedIn();
    return isLoggedIn ? null : '/login';
  },
),
```

- `/old-path`: Always redirects to `/new-path`.
- `/dashboard`: Redirects to `/login` if the user is not logged in.

### 2. Guards

Guards are like “checks” placed on routes. They decide if a user can access a route or not.

Example: restricting access to admins only.

```dart
GoRoute(
  path: '/admin',
  builder: (context, state) => AdminScreen(),
  redirect: (context, state) {
    final isAdmin = AuthService.isAdmin();
    return isAdmin ? null : '/not-authorized';
  },
),
```

If `isAdmin` is `true`, the user can enter `/admin`. Otherwise, they’re redirected to `/not-authorized`.

Use redirects and guards for:

- Authentication flows (login/logout).
- Role-based access (admin vs user).
- Handling deprecated or changed routes.

---

## How to Set Up a Real Flutter Project Using Go Router

Before diving into GoRouter, let's start by setting up a new Flutter project and organizing the codebase. The project structure includes the following folders and files:

```plaintext title="file structure"
go_router_project/
|-- lib/
|   |-- main.dart
|   |-- models/
|   |   |-- product.dart
|   |-- controller/
|   |   |-- product_controller.dart
|   |-- config/
|   |   |-- route_config.dart
|   |-- screens/
|   |   |-- product_details_screen.dart
|   |   |-- product_list_screen.dart
|   |   |-- product_purchase_screen.dart
|   |-- widgets/
|       |-- bottom_container.dart
|       |-- color_container.dart
|       |-- ratings.dart
|       |-- search_section.dart
|       |-- show_modal.dart
|       |-- single_product.dart
|-- pubspec.yaml
```

Now, open the <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` file and add the following dependency:

```yaml title="pubspec.yaml"
dependencies:
  go_router: ^13.0.0
```

Save the file and run `flutter pub get` in the terminal to fetch the dependency.

We'll be creating a minimalistic shopping app with just three pages.

---

## Project Structure

### 1. <VPIcon icon="fa-brands fa-dart-lang"/>`main.dart`

Replace the code in <VPIcon icon="fas fa-folder-open"/>`lib/`<VPIcon icon="fa-brands fa-dart-lang"/>`main.dart` with this:

```dart title="lib/main.dart"
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'go_router/config/route_config.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(
      const SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness: Brightness.dark,
      ),
    );

    return MaterialApp.router(
      title: 'Flutter GoRouter',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.brown),
        useMaterial3: true,
      ),
      routerConfig: router, // go router
    );
  }
}
```

Here’s what’s going on in this code:

- `main()`: The entry point of the Flutter application. It runs the `MyApp` widget.
- `SystemChrome.setSystemUIOverlayStyle(...)`: This configures the system UI overlay, specifically setting the status bar to be transparent and its icons to be dark.
- `MaterialApp.router(...)`: This is the root widget of our application, configured with `go_router`.
- `title: 'Flutter GoRouter'`: Sets the title of the application.
- `theme: ThemeData(...)`: Defines the visual theme for the application, using a `brown` seed color and Material 3 design.
- `routerConfig: router`: This is where `go_router` is integrated. `router` is the `GoRouter` instance defined in <VPIcon icon="fa-brands fa-dart-lang"/>`route_config.dart`.

### 2. Model

The `model` folder is where we define our data structures. A model is simply a Dart class that represents the shape of the data you’ll be working with in your app.

For example, in this project, `Product` is the model. It holds details such as `id`, `name`, `imageUrl`, `description`, `price`, and so on. Models don’t handle logic or UI, they’re just blueprints for data.

Think of models as the foundation. Whenever your app fetches, stores, or manipulates product information, it uses this `Product` model for consistency. We are going to create a model called **product.dart**

#### <VPIcon icon="fa-brands fa-dart-lang"/>`product.dart`

Add this code to <VPIcon icon="fas fa-folder-open"/>`lib/models/`<VPIcon icon="fa-brands fa-dart-lang"/>`product.dart`:

```dart title="lib/models/product.dart"
import 'package:flutter/foundation.dart';

class Product {
  final String id;
  final String name;
  final String imageUrl;
  final String description;
  final double price;
  final double previousPrice;
  final String colors;

  Product({
    required this.id,
    required this.name,
    required this.imageUrl,
    required this.description,
    required this.previousPrice,
    required this.price,
    required this.colors,
  });

  factory Product.initial() => Product(
        id: '',
        name: '',
        imageUrl: '',
        description: '',
        previousPrice: 0.0,
        price: 0.0,
        colors: '',
      );
}
```

- `Product` class: This class defines the structure for a product, with properties like `id`, `name`, `imageUrl`, `description`, `price`, `previousPrice`, and `colors`.
- `Product.initial()`: A factory constructor to create an empty `Product` object, useful for initialization.

### 3. Controller

The `controllers` folder contains classes that manage business logic, how data flows in and out of your app. Controllers sit between your views (UI) and your models (data).

In this example, the `ProductController` is a simple in-memory data provider. It:

- Stores a list of `Product` objects.
- Exposes a `findById()` method so we can look up a product quickly.
- Provides access to the product list via the `products` getter.

In larger apps, controllers often fetch data from APIs, handle caching, or manage app state. Here, it’s kept simple for learning purposes. We are going to create a product controller.

#### <VPIcon icon="fa-brands fa-dart-lang"/>`product_controller.dart`

Add this code to <VPIcon icon="fas fa-folder-open"/>`lib/controllers/`<VPIcon icon="fa-brands fa-dart-lang"/>`product_controller.dart`

```dart :collapsed-lines title="lib/controllers/product_controller.dart"
import '../models/product.dart';

class ProductController {
  Product findById(String? id) {
    return _products.firstWhere((product) => product.id == id);
  }

  List<Product> get products => _products;

  final List<Product> _products = [
    Product(
      id: 'p7',
      name: 'Leather BackPack',
      imageUrl:
          'https://images.unsplash.com/photo-1571689936114-b16146c9570a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      description:
          'The stronger the better it is to load it with all that the eyes sees useful and needful too. BackPack is a all-fit leather strong bag for carrying anything the hands can store and it\'s literally worth any penny',
      price: 30.9,
      previousPrice: 40.9,
      colors: 'red,grey,black,indigo,purple',
    ),
    Product(
      id: 'p1',
      name: 'Smart Watch',
      imageUrl:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      description: 'A white smart watch with good features and more',
      price: 29.99,
      previousPrice: 39.99,
      colors: 'red,grey,black,indigo,purple',
    ),
    Product(
      id: 'p16',
      name: 'PowerBook',
      imageUrl:
          'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
      description:
          'Awesome hardware, crappy keyboard and a hefty price. Buy now before a  one is released!',
      price: 2299.99,
      previousPrice: 3299.99,
      colors: 'red,grey,black,indigo,purple',
    ),
    Product(
      id: 'p2',
      name: 'Red Sneakers',
      imageUrl:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      description:
          'Perfect for your joggers and black T-shirts and more. The sneakers comes in different sizes and colors. You never know when that T-shirt needs some styles with the soft layers of a sneakers',
      price: 199.99,
      previousPrice: 299.99,
      colors: 'yellow,grey,black,red,teal',
    ),
    Product(
      id: 'p3',
      name: 'Nikon Camera',
      imageUrl:
          'https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      description:
          'You can only see clearer with your eyes but a camera saves the memory in it\'s eyes',
      price: 89.9,
      previousPrice: 109.9,
      colors: 'red,grey,black,indigo,purple',
    ),
    Product(
      id: 'p4',
      name: 'HeadSets',
      imageUrl:
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      description:
          'The louder the sound, the better it feels inside with the body',
      price: 120.1,
      previousPrice: 150.1,
      colors: 'red,grey,black,indigo,purple',
    ),
    Product(
      id: 'p5',
      name: 'Amazon SoundBox',
      imageUrl:
          'https://images.unsplash.com/photo-1543512214-318c7553f230?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      description:
          'Automated soundbox with voice recognition and more. What could be more better',
      price: 78.19,
      previousPrice: 88.19,
      colors: 'red,grey,black,indigo,purple',
    ),
    Product(
      id: 'p6',
      name: 'Xbox 360 GamePads',
      imageUrl:
          'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      description:
          'You never know when it is time to touch it better except the pads with xbox is there to assist',
      price: 98.99,
      previousPrice: 108.99,
      colors: 'red,grey,black,indigo,purple',
    ),
  ];
}
```

- `ProductController` class: This class acts as a simple data source for our products.
- `findById(String? id)`: A method to find a product by its ID from the `_products` list.
- `products` getter: Provides access to the list of `_products`. iv. `_products`: A private list of `Product` objects, pre-populated with sample product data.

### 4. Config

The `config` folder stores all the configuration and setup files for your app. In this project, it’s where we keep <VPIcon icon="fa-brands fa-dart-lang"/>`route_config.dart`, which contains all the go_router setup and route definitions.

This is important because:

- Routes can get complex as your app grows.
- Having all navigation setup in one place keeps things clean and manageable.
- Config files are also a great place to put things like app-wide constants, environment settings, or themes.

Think of config as the central **wiring** of your app. It’s not about data or logic, but about how the app is structured and tied together. We are going to create a route config here.

#### <VPIcon icon="fa-brands fa-dart-lang"/>`route_config.dart`

Add this code to <VPIcon icon="fas fa-folder-open"/>`lib/config/route_config.dart`:

```dart :collapsed-lines title="lib/config/route_config.dart"
import 'package:flutter/material.dart';
import 'package:get_it_auto_router_go_router/go_router/controllers/product_controller.dart';
import 'package:go_router/go_router.dart';
import '../models/product.dart';
import '../screens/product_details_screen.dart';
import '../screens/product_list_screen.dart';
import '../screens/product_purchase_screen.dart';

/// The route configuration.
final GoRouter router = GoRouter(
  routes: <RouteBase>[
    GoRoute(
      path: '/',
      builder: (BuildContext context, GoRouterState state) {
        return const ProductListScreen();
      },
      routes: <RouteBase>[
        GoRoute(
          path: ProductDetailsScreen.routeName,
          name: ProductDetailsScreen.routeName,
          builder: (BuildContext context, GoRouterState state) {
            return ProductDetailsScreen(
              productId: state.uri.queryParameters['id'] ?? "",
            );
          },
          routes: <RouteBase>[
            GoRoute(
              path: 'product-purchase/:description',
              name: ProductPurchaseScreen.routeName,
              builder: (BuildContext context, GoRouterState state) {
                return ProductPurchaseScreen(
                  productImage: state.uri.queryParameters['img']!,
                  productPrice: state.uri.queryParameters['price']!,
                  productName: state.uri.queryParameters['name']!,
                  description: state.pathParameters['description']!,
                );
              },
              onExit: (BuildContext context) async {
                final bool? confirmed = await showDialog<bool>(
                  context: context,
                  builder: (_) {
                    return AlertDialog(
                      content: const Text('Are you sure to leave this page?'),
                      actions: <Widget>[
                        TextButton(
                          onPressed: () => Navigator.of(context).pop(false),
                          child: const Text('Cancel'),
                        ),
                        TextButton(
                          onPressed: () => Navigator.of(context).pop(true),
                          child: const Text('Confirm'),
                        ),
                      ],
                    );
                  },
                );
                return confirmed ?? false;
              },
            )
          ],
        )
      ],
    ),
  ],
);
```

Here’s what’s happening in this code:

- `final GoRouter router = GoRouter(...)`: This is the main `GoRouter` instance for our application.
- `routes: <RouteBase>[...]`: Defines the top-level routes.
- `GoRoute(path: '/', builder: ...)` : The root route, leading to `ProductListScreen`.
- Nested `GoRoute` for `ProductDetailsScreen`: This route is a child of the root.
- `path: ProductDetailsScreen.routeName`: Uses a static constant for the path.
- `name: ProductDetailsScreen.routeName`: Assigns a name to the route for easier navigation.
- `builder`: Builds the `ProductDetailsScreen`, extracting `productId` from query parameters.
- v. Nested `GoRoute` for `ProductPurchaseScreen`: This route is a child of `ProductDetailsScreen`.
- `path: 'product-purchase/:description'`: Defines a path with a `description` path parameter.
- `name: ProductPurchaseScreen.routeName`: Assigns a name for navigation.
- `builder`: Builds the `ProductPurchaseScreen`, extracting `productImage`, `productPrice`, `productName` from query parameters and `description` from path parameters.
- `onExit: (BuildContext context) async { ... }`: This is an `onExit` guard that triggers a confirmation dialog when the user tries to leave the `ProductPurchaseScreen`. If the user cancels, navigation is prevented.

### 5. Screens

Your screens are the UI pages the user interacts with. Each screen has a different role in the shopping flow:

#### ProductListScreen

This is the **entry screen** of your app that shows all available products in a grid format.

- Acts as a catalog/browse page.
- Uses the `ProductController` to fetch product data.
- Includes a search bar (`SearchSection`) for filtering products.
- Navigates to the ProductDetailsScreen when a product is tapped.

#### ProductDetailsScreen

This screen shows the **full details** of a selected product.

- Displays product image, name, price, available colors, and description.
- Allows the user to view a larger image modal by tapping the image.
- Provides a "Buy Now" button at the bottom (via `bottomContainer`).
- Uses path and query parameters in navigation to pass product data to the next screen.

#### ProductPurchaseScreen

This is the **final confirmation screen** before purchasing.

- Shows the selected product image, name, price, and description.
- Confirms the user’s intent to purchase with a FloatingActionButton (currently just an icon).
- Completes the navigation flow: List > Details > Purchase.

Alright, now let’s go through them one by one:

#### <VPIcon icon="fa-brands fa-dart-lang"/>`product_list_screen.dart`

Add this code to <VPIcon icon="fas fa-folder-open"/>`lib/screens/product_list_screen.dart`:

```dart title="lib/screens/product_list_screen.dart"
import 'package:flutter/material.dart';
import 'package:get_it_auto_router_go_router/go_router/controllers/product_controller.dart';
import 'package:get_it_auto_router_go_router/go_router/screens/product_details_screen.dart';
import 'package:get_it_auto_router_go_router/go_router/widgets/search_section.dart';
import 'package:get_it_auto_router_go_router/go_router/widgets/single_product.dart';
import 'package:go_router/go_router.dart';

import '../models/product.dart';

class ProductListScreen extends StatelessWidget {
  const ProductListScreen({super.key});


  @override
  Widget build(BuildContext context) {
    ProductController productController = ProductController();
    TextEditingController searchController = TextEditingController();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Products'),
        elevation: 0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            SearchSection(
              searchController: searchController,
            ),
            const SizedBox(height: 10),
            Expanded(
              child: GridView.builder(
                itemCount: productController.products.length,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: 10,
                  crossAxisSpacing: 10,
                ),
                itemBuilder: (context, index) {
                  Product product = productController.products[index];

                  return GestureDetector(
                    onTap: () => context.goNamed(
                      ProductDetailsScreen.routeName,
                      queryParameters: {'id': product.id},
                    ),
                    child: SingleProduct(product: product),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

Here’s what’s going on:

- `ProductListScreen`: A `StatelessWidget` that displays a list of products.
- `ProductController productController = ProductController()`: Creates an instance of the `ProductController` to access product data.
- `AppBar`: Displays the title "Products".
- `SearchSection`: A custom widget for a search bar.
- `Expanded` with `GridView.builder`: Displays the products in a scrollable grid.
- `GestureDetector` `onTap`: When a product is tapped, it navigates to the `ProductDetailsScreen` using `context.goNamed`, passing the product's `id` as a query parameter.
- `SingleProduct`: A custom widget to display individual product information.

#### <VPIcon icon="fa-brands fa-dart-lang"/>`product_details_screen.dart`

Add this code to <VPIcon icon="fas fa-folder-open"/>`lib/screens/product_details_screen.dart`:

```dart :collapsed-lines title="lib/screens/product_details_screen.dart"
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import '../controllers/product_controller.dart';
import '../models/product.dart';
import '../widgets/bottom_container.dart';
import '../widgets/color_container.dart';
import '../widgets/ratings.dart';
import '../widgets/show_modal.dart';

class ProductDetailsScreen extends StatelessWidget {
  static const routeName = 'product-details';
  final String productId;

  const ProductDetailsScreen({
    super.key,
    required this.productId,
  });

  @override
  Widget build(BuildContext context) {
    late Color colored;

    // get color
    Color getColor(String color) {
      switch (color) {
        case 'red':
          colored = Colors.red;
          break;
        case 'purple':
          colored = Colors.purple;
          break;
        case 'grey':
          colored = Colors.grey;
          break;
        case 'black':
          colored = Colors.black;
          break;
        case 'orange':
          colored = Colors.orange;
          break;
        case 'indigo':
          colored = Colors.indigo;
          break;
        case 'yellow':
          colored = Colors.yellow;
          break;
        case 'blue':
          colored = Colors.blue;
          break;
        case 'brown':
          colored = Colors.brown;
          break;
        case 'teal':
          colored = Colors.teal;
          break;
        default:
      }

      return colored;
    }

    ProductController productController = ProductController();
    Product product = productController.findById(productId);

    List<String> availableColors = product.colors.split(',');

    // pay now
    void payNow() {
      context.goNamed(
        'pay-now',
        pathParameters: <String, String>{
          'description': product.description,
        },
        queryParameters: <String, String>{
          'img': product.imageUrl.toString(),
          'price': product.price.toString(),
          'name': product.name.toString(),
        },
      );
    }

    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Colors.transparent,
        elevation: 0,
        systemOverlayStyle: const SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          color: Colors.black,
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
      ),
      body: Column(
        children: [
          Expanded(
            flex: 2,
            child: GestureDetector(
              onTap: () => showImageModal(context, product),
              child: ClipRRect(
                borderRadius: const BorderRadius.vertical(
                  top: Radius.zero,
                  bottom: Radius.circular(50),
                ),
                child: Hero(
                  tag: product.id,
                  child: Image.network(
                    product.imageUrl,
                    fit: BoxFit.cover,
                    width: double.infinity,
                  ),
                ),
              ),
            ),
          ),
          Expanded(
            flex: 3,
            child: Padding(
              padding: const EdgeInsets.all(15.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    product.name,
                    style: const TextStyle(
                      fontSize: 30,
                    ),
                  ),
                  const SizedBox(height: 5),
                  ratings(),
                  const SizedBox(height: 5),
                  Row(
                    children: [
                      Text(
                        '\$${product.price.toString()}',
                        style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(width: 3),
                      Text(
                        '\$${product.previousPrice.toString()}',
                        style: const TextStyle(
                          fontSize: 15,
                          color: Colors.grey,
                          decoration: TextDecoration.lineThrough,
                        ),
                      ),
                    ],
                  ),
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        'Available in stocks',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        'Out of stocks',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: Colors.deepOrange,
                          decoration: TextDecoration.lineThrough,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  const Text(
                    'Colors Available',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 15,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      for (var color in availableColors)
                        buildContainer(
                          color,
                          getColor,
                        )
                    ],
                  ),
                  const SizedBox(height: 15),
                  const Text(
                    'About',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 15,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    product.description,
                    textAlign: TextAlign.justify,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
      bottomSheet: bottomContainer(product, payNow),
    );
  }
}
```

That’s a lot – here’s what this code is doing:

- `ProductDetailsScreen`: A `StatelessWidget` that displays the details of a single product.
- `static const routeName = 'product-details'`: Defines a static constant for the route name, ensuring consistency.
- `productId`: This is a required parameter for the screen, passed during navigation.
- `getColor(String color)`: A helper function to convert color names (strings) into `Color` objects.
- `ProductController productController = ProductController()`: Accesses product data.
- `Product product = productController.findById(productId)`: Retrieves the specific product based on the `productId` received.
- `payNow()`: A function that navigates to the `ProductPurchaseScreen` using `context.goNamed`, passing product details as both path and query parameters.
- `AppBar`: Displays a back arrow to navigate back.
- `Expanded` for product image: Displays the product image with a `Hero` animation for smooth transitions.
- `GestureDetector` allows tapping the image to show a modal.
- `Expanded` for product details: Displays product name, ratings, prices, availability, available colors, and description.
- `bottomSheet: bottomContainer(product, payNow)`: Attaches a custom `bottomContainer` widget to the `Scaffold`, which includes the "Buy Now" button.

#### <VPIcon icon="fa-brands fa-dart-lang"/>`product_purchase_screen.dart`:

Add this code to <VPIcon icon="fas fa-folder-open"/>`lib/screens/`<VPIcon icon="fa-brands fa-dart-lang"/>`product_purchase_screen.dart`:

```dart :collapsed-lines title="lib/screens/product_purchase_screen.dart"
import 'package:flutter/material.dart';

class ProductPurchaseScreen extends StatelessWidget {
  const ProductPurchaseScreen({
    super.key,
    required this.productImage,
    required this.productName,
    required this.productPrice,
    required this.description,
  });

  static const routeName = 'pay-now';

  final String productName;
  final String productPrice;
  final String productImage;
  final String description;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: const FloatingActionButton(
        onPressed: null,
        child: Icon(
          Icons.check_circle,
        ),
      ),
      appBar: AppBar(
        title: const Text('Purchase Item'),
      ),
      body: SingleChildScrollView(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              children: <Widget>[
                ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: Image.network(productImage),
                ),
                const SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Text(
                      productName,
                      style: const TextStyle(
                        fontWeight: FontWeight.w800,
                        fontSize: 18,
                      ),
                    ),
                    Text(
                      '\$$productPrice',
                      style: const TextStyle(
                        fontWeight: FontWeight.w800,
                        fontSize: 16,
                        color: Colors.grey,
                      ),
                    )
                  ],
                ),
                const SizedBox(height: 10),
                Text(
                  description,
                  style: const TextStyle(
                    fontSize: 16,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
```

Here’s what’s going on:

- `ProductPurchaseScreen`: A `StatelessWidget` that confirms the product purchase.
- `static const routeName = 'pay-now'`: Defines the route name.
- `productImage`, `productName`, `productPrice`, `description`: These are required parameters received from the previous screen.
- `FloatingActionButton`: Displays a checkmark icon, though `onPressed` is currently null.
- `AppBar`: Displays the title "Purchase Item".
- `SingleChildScrollView`: Makes the content scrollable.
- `Image.network(productImage)`: Displays the product image received.
- `Row` for product name and price: Shows the product's name and its price.
- `Text(description)`: Displays the product's description.

### 6. Widgets

Widgets are the reusable building blocks of your UI. Instead of duplicating UI code in multiple screens, you break them into widgets.

#### <VPIcon icon="fa-brands fa-dart-lang"/>`bottom_container.dart`

Add this code to <VPIcon icon="fas fa-folder-open"/>`lib/widgets/`<VPIcon icon="fa-brands fa-dart-lang"/>`bottom_container.dart`:

```dart :collapsed-lines title="lib/widgets/bottom_container.dart"
// bottom container
import 'package:flutter/material.dart';

import '../models/product.dart';

Container bottomContainer(Product productDetails,Function payNow) {
  return Container(
    color: Colors.white,
    child: Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: 18.0,
        vertical: 10,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Price',
                style: TextStyle(
                  color: Colors.grey,
                  fontWeight: FontWeight.w500,
                  fontSize: 14,
                ),
              ),
              const SizedBox(height: 5),
              Text(
                '\$${productDetails.price}',
                style: const TextStyle(
                  color: Colors.brown,
                  fontWeight: FontWeight.w700,
                  fontSize: 25,
                ),
              )
            ],
          ),
          Wrap(
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              Container(
                height: 50,
                width: 80,
                decoration: BoxDecoration(
                  color: Colors.brown.withOpacity(0.3),
                  borderRadius: const BorderRadius.only(
                    bottomLeft: Radius.circular(5),
                    topLeft: Radius.circular(5),
                  ),
                ),
                child: const Center(
                  child: Wrap(
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      Icon(
                        Icons.shopping_cart_checkout,
                        color: Colors.white,
                      ),
                      SizedBox(width: 15),
                      Text(
                        '1',
                        style: TextStyle(
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              GestureDetector(
                onTap: () => payNow(),
                child: Container(
                  height: 50,
                  width: 120,
                  decoration: const BoxDecoration(
                    color: Colors.brown,
                    borderRadius: BorderRadius.only(
                      bottomRight: Radius.circular(5),
                      topRight: Radius.circular(5),
                    ),
                  ),
                  child: const Center(
                    child: Text(
                      'Buy Now',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                ),
              )
            ],
          )
        ],
      ),
    ),
  );
}
```

In this code:

- `bottomContainer`: A function that returns a `Container` widget for the bottom sheet. It displays the product price and a "Buy Now" button.
- `GestureDetector` `onTap`: The "Buy Now" button triggers the `payNow` function passed as an argument.

#### <VPIcon icon="fa-brands fa-dart-lang"/>`ratings.dart`

Add this code to <VPIcon icon="fas fa-folder-open"/>`lib/widgets/`<VPIcon icon="fa-brands fa-dart-lang"/>`ratings.dart`:

```dart title="lib/widgets/ratings.dart"
import 'package:flutter/material.dart';

Widget ratings() => const Row(
      children: [
        Icon(Icons.star, color: Colors.deepOrange, size: 15),
        Icon(Icons.star, color: Colors.deepOrange, size: 15),
        Icon(Icons.star, color: Colors.deepOrange, size: 15),
        Icon(Icons.star, color: Colors.deepOrange, size: 15),
        Icon(Icons.star, color: Colors.deepOrange, size: 15),
        SizedBox(width: 20),
        Text('(3400 Reviews)')
      ],
    );
```

- `ratings()`: A simple widget that displays a row of five orange stars and a review count.

#### <VPIcon icon="fa-brands fa-dart-lang"/>`color_container.dart`

Add this code to <VPIcon icon="fas fa-folder-open"/>`lib/widgets/`<VPIcon icon="fa-brands fa-dart-lang"/>`color_container.dart`:

```dart title="lib/widgets/color_container.dart"
// build container for color
import 'package:flutter/cupertino.dart';

Widget buildContainer(String color,Function getColor) {
  return Container(
    height: 5,
    width: 40,
    decoration: BoxDecoration(
      color: getColor(color),
      borderRadius: BorderRadius.circular(20),
    ),
  );
}
```

Here’s what’s going on:

- `buildContainer`: A function that creates a small, rounded `Container` to represent an available product color. It takes the color name as a string and a `getColor` function to convert it to a `Color` object.

#### <VPIcon icon="fa-brands fa-dart-lang"/>`search_section.dart`

Add this code to <VPIcon icon="fas fa-folder-open"/>`lib/widgets/`<VPIcon icon="fa-brands fa-dart-lang"/>`search_section.dart`:

```dart title="lib/widgets/search_section.dart"
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class SearchSection extends StatelessWidget {
  const SearchSection({
    super.key,
    required this.searchController,
  });

  final TextEditingController searchController;

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: searchController,
      decoration: InputDecoration(
        prefixIcon: const Icon(
          CupertinoIcons.search,
          color: Colors.black,
        ),
        hintText: 'Enter search keyword',
        label: const Text(
          'Search Here',
        ),
        fillColor: Colors.grey.withOpacity(0.1),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
        ),
      ),
    );
  }
}
```

In this code:

- `SearchSection`: A `StatelessWidget` that displays a search input field.
- `searchController`: A `TextEditingController` to manage the text input.
- `InputDecoration`: Styles the text field with a search icon, hint text, label, and rounded borders.

#### <VPIcon icon="fa-brands fa-dart-lang"/>`show_modal.dart`

Add this code to <VPIcon icon="fas fa-folder-open"/>`lib/widgets/`<VPIcon icon="fa-brands fa-dart-lang"/>`show_modal.dart`:

```dart :collapsed-lines title="lib/widgets/show_modal.dart"
// show modal for image
import 'package:flutter/material.dart';

import '../models/product.dart';


void showImageModal(BuildContext context,Product product) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return Dialog(
        insetPadding: const EdgeInsets.all(12),
        elevation: 4,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        child: Padding(
          padding: const EdgeInsets.all(3.0),
          child: Stack(children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(20),
              child: Image(
                width: double.infinity,
                fit: BoxFit.cover,
                image: NetworkImage(product.imageUrl),
              ),
            ),
            Positioned(
              right: 1,
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: Colors.grey.withOpacity(0.5),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Row(
                    children: [
                      Text(product.name),
                      const SizedBox(width: 5),
                      Text(
                        '\$${product.price}',
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            )
          ]),
        ),
      );
    },
  );
}
```

In this code:

- `showImageModal`: A function that displays a dialog with a larger view of the product image and its name and price.
- `Dialog`: A material design dialog.
- `Stack` with `Positioned`: Used to overlay the product name and price on top of the image.

#### <VPIcon icon="fa-brands fa-dart-lang"/>`single_product.dart`

Add this code to <VPIcon icon="fas fa-folder-open"/>`lib/widgets/`<VPIcon icon="fa-brands fa-dart-lang"/>`single_product.dart`:

```dart :collapsed-lines title="lib/widgets/single_product.dart"
import 'package:flutter/material.dart';

import '../models/product.dart';



class SingleProduct extends StatelessWidget {
  const SingleProduct({
    super.key,
    required this.product,
  });

  final Product product;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.grey.withOpacity(0.1),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        children: [
          ClipRRect(
            borderRadius: const BorderRadius.only(
              topRight: Radius.circular(10),
              topLeft: Radius.circular(10),
            ),
            child: Hero(
              tag: product.id,
              child: Image.network(
                product.imageUrl,
                height: 120,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
            ),
          ),
          const SizedBox(height: 10),
          Text(
            product.name,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 10),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('\$${product.price}'),
                Text(
                  '\$${product.price}',
                  style: const TextStyle(
                    decoration: TextDecoration.lineThrough,
                  ),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
```

Here’s what’s happening:

- `SingleProduct`: A `StatelessWidget` that displays a single product item in the grid.
- `product`: The `Product` object to be displayed.
- `Container`: Provides a background color and rounded borders.
- `Hero` animation for image: Facilitates a smooth animation when transitioning to the `ProductDetailsScreen`.
- `Text` for product name: Displays the product name, truncated if too long.
- `Row` for prices: Shows the current price and the previous price with a strikethrough.

::: info A Few Screenshots:

![Home page of the app](https://cdn.hashnode.com/res/hashnode/image/upload/v1703872135819/0470da63-f9e7-4358-a523-803222e8469e.png)

![product detail page](https://cdn.hashnode.com/res/hashnode/image/upload/v1703872148850/fc84b934-844f-4dee-8b09-3c7fcf03ce78.png)

![image previewer](https://cdn.hashnode.com/res/hashnode/image/upload/v1703872217140/610e283e-2588-446e-9a0f-300e3f1d961c.png)

![down section of the detail page](https://cdn.hashnode.com/res/hashnode/image/upload/v1703872162253/6c7de9e7-b5f4-4773-91b8-df5e97a4d0cc.png)

![dialog box display in the product detail page](https://cdn.hashnode.com/res/hashnode/image/upload/v1703872199030/bc0cd8d3-4028-4bff-bf5a-620e32fcdd45.png)

:::

---

## Conclusion

`go_router` is a powerful and flexible routing library for Flutter, offering a clean and intuitive API for navigation. Whether you're building a simple app or a complex navigation structure, `go_router` provides the tools you need to create a seamless user experience.

By following this comprehensive guide, you should now be well-equipped to integrate and leverage `go_router` in your Flutter projects. The provided example of a minimalistic shopping app demonstrates practical application of its features.

::: info References

<SiteInfo
  name="go_router | Flutter package"
  desc="A declarative router for Flutter based on Navigation 2 supporting deep linking, data-driven routes and more"
  url="https://pub.dev/packages/go_router/"
  logo="https://pub.dev/static/hash-e4t06sub/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-e4t06sub/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="packages/packages/go_router at main · flutter/packages"
  desc="A collection of useful packages maintained by the Flutter team - flutter/packages"
  url="https://github.com/flutter/packages/tree/main/packages/go_router/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/1c4d67c956e2faa67a74bc769b8831899341583c0c068b3f4b9dec0e2c905a56/flutter/packages"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Get Started With GoRouter in Flutter",
  "desc": "Navigating between screens in Flutter is crucial for any app. And while the built-in Navigator API provides functionality, it can get complex for larger projects. This is where go_router shines, offering a more declarative, URL-based, and feature-ric...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-get-started-with-gorouter-in-flutter.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
