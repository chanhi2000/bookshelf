---
lang: en-US
title: "How to Implement LEGO Architecture in Flutter [Full Handbook]"
description: "Article(s) > How to Implement LEGO Architecture in Flutter [Full Handbook]"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - Design
  - System
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Implement LEGO Architecture in Flutter [Full Handbook]"
    - property: og:description
      content: "How to Implement LEGO Architecture in Flutter [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-lego-architecture-in-flutter-handbook.html
prev: /programming/dart/articles/README.md
date: 2026-09-12
isOriginal: false
author:
  - name: Atuoha Anthony
    url: https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b53122ab-f3d5-4b7e-a4d1-6e42e01cbe02.png
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
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Implement LEGO Architecture in Flutter [Full Handbook]"
  desc="Almost everyone has snapped two LEGO bricks together at some point, even without owning a single set as an adult. You press one brick down onto another, feel it click, and it holds. You likely never o"
  url="https://freecodecamp.org/news/how-to-implement-lego-architecture-in-flutter-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b53122ab-f3d5-4b7e-a4d1-6e42e01cbe02.png"/>

Almost everyone has snapped two LEGO bricks together at some point, even without owning a single set as an adult. You press one brick down onto another, feel it click, and it holds.

You likely never once thought about how the brick was molded, what plastic it used, or which factory it came from. You only cared about one thing in that moment: did the studs match?

That small, ordinary moment is the entire idea behind this handbook. Now step away from LEGO for a second and picture a Flutter project instead. Somewhere in that project is a screen everyone on the team is secretly afraid to open. It fetches data, formats it, validates it, and renders it, all inside one enormous `build()` method.

The thing is: it works. Nobody wants to touch it. A change to the checkout flow means scrolling past three unrelated concerns just to find the one line that needs editing.

The difference between those two experiences (the satisfying click of a LEGO brick and the dread of opening that one file) comes down to a single habit. LEGO bricks are built so that nothing needs to understand anything else's insides, only its connection points. But most code isn't built that way by default.

"LEGO Architecture" is simply the decision to build code the way LEGO builds bricks. And this handbook is going to teach you that habit slowly, starting from something almost too small to call architecture at all, and building up, piece by piece, until it can hold together an entire app.

Along the way we'll also look at Clean Architecture, a specific, well-known way of applying this same habit, and see exactly where the two meet.

::: note Prerequisites

You should be comfortable writing basic Flutter widgets and running a Flutter app, since the early sections build directly on `StatelessWidget` and ordinary widget composition.

You should also understand Dart classes, constructors, and abstract classes, since contracts, the studs this whole handbook is built around, are just abstract classes and interfaces. Some familiarity with dependency injection or service locators is helpful but not required, since that idea is introduced from scratch when it first comes up.

Later sections use `flutter_bloc`, `get_it`, `dio`, and `go_router` as example packages. You don't need to have used them before, since every import is explained the moment it appears.

A working knowledge of what Clean Architecture is trying to achieve (keeping business logic independent of frameworks) is useful context too, though the handbook also includes a crash course for readers meeting it for the first time.

No prior knowledge of monorepos is required either, since the section on merging LEGO Architecture with a modular monorepo builds that idea from an empty folder. But if you want a deeper, dedicated walkthrough of monorepo structure, Melos, and Dart Workspaces before getting there, reading [**How to Use Monorepos in Flutter**](/freecodecamp.org/how-to-use-monorepos-in-flutter.md) first gives you useful background on why teams reach for a monorepo in the first place.

:::

---

## What "LEGO Architecture" Actually Means

Go back to that LEGO brick for a moment, because it has exactly two things worth noticing about it. There's what the brick is, meaning its shape, its color, and its purpose. And there are its studs, the standardized connection points on top and the tubes underneath that let it snap onto any other brick following the same standard.

Nobody needs to know how a brick was molded to click it onto another one. They only need the studs to match.

That's the whole idea, and software can copy it almost exactly. The brick becomes a unit of your app, which could be a widget, a class, a service, or an entire feature. The studs become the contract that brick exposes to the outside world, which in code usually means an abstract class, an interface, or a well-defined function signature.

Snapping two bricks together, in code, means one part of your app depends on another part only through that contract, and never by reaching in and relying on how the other part happens to be built underneath.

![Diagram showing two concrete implementations, Brick A and Brick B, connecting through dotted arrows to a shared contract, represented as an abstract class or interface.](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/bc967d8d-de6e-44ed-9093-a5cab4f7952e.png)

Notice that both bricks touch the world only through the contract sitting between them. Neither one ever needs to know which concrete brick is plugged in on the other side. That single habit of reaching for the contract instead of the concrete thing is the whole engine behind everything that follows in this handbook. You'll meet it again and again, first in a single widget, then in a class, then in a whole feature, and eventually in an entire package.

There's one more thing worth internalizing before any code appears. A brick that's doing its job well should make sense on its own, without forcing you to open several other files first. You should be able to swap what's plugged into it without its neighbors ever noticing. And it should never show its neighbors how it does something, only what it does.

Keep those three feelings in mind. Every example from here on is really just those three feelings, expressed as Dart.

---

## LEGO Thinking at the Widget Level

Here's a secret: you've already been doing a small version of this, possibly without naming it. Look at this line, which you've almost certainly written before:

```dart
Padding(
  padding: const EdgeInsets.all(8),
  child: const Text('Hello'),
)
```

`Padding` does exactly one thing, and it doesn't care in the slightest what you hand it as a `child`. It could be `Text`, an `Image`, a `Column`, or anything else. That's a brick and a stud, hiding in plain sight. `Padding` is the brick. Its `child` parameter is the stud, because any widget that fits through that door is welcome. You never taught `Padding` how to render text or images. It never needed to know.

Now watch what happens the moment that habit is dropped, using something small enough to hold in your head all at once. Say you need a little rounded, shaded box to show a price.

```dart
class PriceTag extends StatelessWidget {
  final double price;
  const PriceTag({super.key, required this.price});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(6),
      ),
      child: Text('\$${price.toStringAsFixed(2)}'),
    );
  }
}
```

This is a perfectly acceptable, perfectly small widget, and there's nothing broken about it. But look closely at what it's actually doing. It's deciding two unrelated things at once inside the same class: what the box around the content should look like, and what the content itself is.

The moment you need that same rounded, shaded box around something that's not a price, say a small label reading "Sale", you're stuck. You either copy the `Container` and its decoration into a new widget, or you reach for `extends` and start building a small class hierarchy just to reuse six lines of styling.

Both of those are the tight coupling this whole handbook is trying to talk you out of.

The fix is the same one `Padding` already showed you. Pull the box out on its own, and let it accept any child at all.

```dart
class SurfaceCard extends StatelessWidget {
  final Widget child;
  const SurfaceCard({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(6),
      ),
      child: child,
    );
  }
}
```

`SurfaceCard` now knows only one thing: how to look like a small rounded, shaded box. It also has one stud, its `child`, exactly the same shape as `Padding`'s. `PriceTag` shrinks down to almost nothing, because it no longer needs to know how to draw a box at all.

```dart
class PriceTag extends StatelessWidget {
  final double price;
  const PriceTag({super.key, required this.price});

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(child: Text('\$${price.toStringAsFixed(2)}'));
  }
}
```

That single change is the entire lesson of this section. `SurfaceCard` can now sit behind a "Sale" label, a small avatar, a rating badge, or anything else, and it will never need to be touched again. This is because it was never taught to care what its child looks like.

The test for whether a brick like this is genuinely well-built is simple: can you reuse it somewhere brand new without copying a single line out of it? If yes, its studs are doing their job.

Once that clicks, the same habit scales up without changing shape at all, just size. A product card in a shopping app is really the same idea, with a slightly bigger child.

```dart :collapsed-lines
class ProductThumbnail extends StatelessWidget {
  final String imageUrl;
  const ProductThumbnail({super.key, required this.imageUrl});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(6),
      child: Image.network(imageUrl, height: 120, fit: BoxFit.cover),
    );
  }
}

class ProductCard extends StatelessWidget {
  final String name;
  final double price;
  final String imageUrl;

  const ProductCard({
    super.key,
    required this.name,
    required this.price,
    required this.imageUrl,
  });

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ProductThumbnail(imageUrl: imageUrl),
          Text(name, style: const TextStyle(fontWeight: FontWeight.bold)),
          Text('\$${price.toStringAsFixed(2)}'),
        ],
      ),
    );
  }
}
```

Nothing new happened here conceptually. `ProductThumbnail` is its own small brick, responsible only for loading and clipping an image. So if you later switch from `Image.network` to a caching image package, exactly one file changes, and nothing that uses it even notices.

`ProductCard` isn't really building anything itself anymore. It's arranging bricks that already exist (`SurfaceCard` for the box and `ProductThumbnail` for the picture) the same way you would snap two pieces from different bins into one small model.

Every import across all three widgets is still the plain `package:flutter/material.dart`. No new package was needed to get here, because LEGO thinking at this level isn't a library, it's a decision about where you draw the line between a box and what goes inside it.

---

## Bricks With Studs: Contracts Instead of Concrete Dependencies

Composition alone gets you reusable UI, but it doesn't yet get you swappable behavior. For that you need an explicit contract, usually an abstract class or a function type, that sits between a brick and whatever it depends on.

Suppose `ProductCard` needs to react to a tap by adding a product to the cart, but you don't want the card itself to know whether that means calling a REST API, writing to local storage, or just printing to the console during a demo.

```dart
abstract class CartWriter {
  Future<void> add(String productId);
}

class ApiCartWriter implements CartWriter {
  final Dio client;
  ApiCartWriter(this.client);

  @override
  Future<void> add(String productId) async {
    await client.post('/cart/items', data: {'productId': productId});
  }
}

class InMemoryCartWriter implements CartWriter {
  final List<String> items = [];

  @override
  Future<void> add(String productId) async {
    items.add(productId);
  }
}
```

And the widget only ever talks to the contract.

```dart
class AddToCartButton extends StatelessWidget {
  final String productId;
  final CartWriter cartWriter;

  const AddToCartButton({
    super.key,
    required this.productId,
    required this.cartWriter,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => cartWriter.add(productId),
      child: const Text('Add to cart'),
    );
  }
}
```

`abstract class CartWriter` is the stud. It declares exactly one capability, `add(String productId)`, and says nothing about how it's implemented. This is the contract not concretion rule from the previous section, made literal in code.

`ApiCartWriter` is one brick that satisfies the contract using `Dio`, a popular HTTP client package that would be brought in with `import 'package:dio/dio.dart';` at the top of this file in a real project. It owns all networking detail, so nothing outside this class needs to know the endpoint URL or the request shape. `InMemoryCartWriter` is a second brick satisfying the same contract. It's useful for tests, previews, or offline demos, and it has zero dependencies of its own: no Dio, and no network.

`AddToCartButton` takes a `CartWriter` through its constructor rather than instantiating one itself. This is called dependency injection, and it's the mechanism that makes contracts actually useful, since the widget is handed a brick from outside instead of building its own.

This is the payoff worth pausing on: you can now write a widget test that passes `InMemoryCartWriter` and asserts that `cartWriter.items` contains the right product, with no mocking framework and no network stub required.

![Architecture diagram showing AddToCartButton depending on the CartWriter abstract class, which acts as the shared contract and connects to ApiCartWriter for network operations and InMemoryCartWriter for in-memory testing.](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/d60c5ce5-212b-4465-a4f5-64be543d997d.png)

---

## LEGO at the Folder Level

Once you accept that individual classes should snap together through contracts, the same logic applies to how you organize folders.

A common early mistake is organizing by type, with a `screens` folder, a `widgets` folder, and a `services` folder sitting side by side. This looks tidy, but it's the opposite of LEGO thinking. To understand or change the cart feature, you have to jump between three unrelated folders, and nothing stops a cart service file from quietly importing something from a product screen file. Nothing is actually self-contained.

The LEGO-friendly version organizes by feature instead. Each feature is its own brick, containing everything it needs, and only exposing what other features are allowed to touch.

```sh title="file structure"
lib/
  features/
    product/
      product.dart          # "barrel" file: the public stud
      src/
        widgets/
          product_card.dart
          product_thumbnail.dart
        services/
          cart_writer.dart
        models/
          product.dart
    cart/
      cart.dart
      src/
        widgets/
          cart_item.dart
        services/
          cart_repository.dart
  core/
    theme/
    routing/
    network/
```

The key file here is <VPIcon icon="fa-brands fa-dart-lang"/>`product.dart`, a barrel file that exports only what other features are meant to use.

```dart title="lib/features/product/product.dart"
library product;

export 'src/widgets/product_card.dart';
export 'src/models/product.dart';
// note: cart_writer.dart is intentionally NOT exported.
// it's an internal implementation detail of this feature.
```

The `library product;` line names this file as the entry point of the product package within your app, which is a convention rather than a hard boundary by itself. The `export` statements re-export selected files, so anything not listed here, such as `cart_writer.dart`, stays private to the feature. Other features that write `import 'package:app/features/product/product.dart';` simply can't see it.

This mirrors the real LEGO idea exactly, since <VPIcon icon="fas fa-folder-open"/>`src/` is the inside of the brick, the molded plastic, and the barrel file is the studs: the only surface other bricks are allowed to touch.

You can enforce this boundary for real using Dart's <VPIcon icon="iconfont icon-yaml"/>`analysis_options.yaml` alongside import linting packages, or simply through code review discipline: no file inside <VPIcon icon="fas fa-folder-open"/>`features/cart/src/` should ever import a <VPIcon icon="fas fa-folder-open"/>`src/` file from <VPIcon icon="fas fa-folder-open"/>`features/product/`. If cart genuinely needs something from product, it imports the barrel file <VPIcon icon="fa-brands fa-dart-lang"/>`product.dart`, never the internals directly.

![Architecture diagram showing how  contains private internals accessed through the  barrel file, which exposes the feature’s public API while hiding its internal implementation details.](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/f8b46a18-d356-4c47-beba-f9525ade82da.png)

---

## Contracts Between Modules: Repositories and Service Locators

Folder boundaries stop other features from importing your internals, but real apps also need to inject implementations across those boundaries. For example, the cart feature needs something that can fetch product prices, without depending on the product feature's concrete service class. This is where the repository pattern and a service locator come in.

First, the contract lives in a shared, neutral place, not inside either feature.

```dart title="lib/core/contracts/product_lookup.dart"
abstract class ProductLookup {
  Future<double> priceOf(String productId);
}
```

The product feature provides the real implementation.

```dart title="lib/features/product/src/services/product_repository.dart"
import 'package:app/core/contracts/product_lookup.dart';

class ProductRepository implements ProductLookup {
  final Map<String, double> _cachedPrices;
  ProductRepository(this._cachedPrices);

  @override
  Future<double> priceOf(String productId) async {
    return _cachedPrices[productId] ?? 0;
  }
}
```

The cart feature only ever depends on `ProductLookup`, and the real brick gets wired in through a service locator, a registry that hands out configured instances by contract type. `get_it` is the standard package for this.

```dart title="lib/core/di/service_locator.dart"
import 'package:get_it/get_it.dart';
import 'package:app/core/contracts/product_lookup.dart';
import 'package:app/features/product/src/services/product_repository.dart';

final getIt = GetIt.instance;

void setupServiceLocator() {
  getIt.registerLazySingleton<ProductLookup>(
    () => ProductRepository({'p1': 19.99, 'p2': 4.50}),
  );
}
```

```dart title="lib/features/cart/src/services/cart_calculator.dart"
import 'package:app/core/contracts/product_lookup.dart';
import 'package:app/core/di/service_locator.dart';

class CartCalculator {
  final ProductLookup _productLookup;

  CartCalculator({ProductLookup? productLookup})
      : _productLookup = productLookup ?? getIt<ProductLookup>();

  Future<double> total(List<String> productIds) async {
    double sum = 0;
    for (final id in productIds) {
      sum += await _productLookup.priceOf(id);
    }
    return sum;
  }
}
```

The line `import 'package:get_it/get_it.dart';` brings in the service locator package, and `GetIt.instance` gives you a single global registry (a singleton) that the whole app shares.

The call `registerLazySingleton<ProductLookup>(...)` tells the locator that, when someone asks for a `ProductLookup`, it should hand them this one instance of `ProductRepository`. It should build it only the first time it's requested.

The generic type parameter is what matters here, since the registry is keyed by the contract, not by `ProductRepository`. That's the enforcement mechanism behind depending on contracts.

`setupServiceLocator()` is called once, typically in `main()`, before `runApp()`, and this becomes your app's single assembly point – the one place allowed to know about every concrete brick.

`CartCalculator`'s constructor accepts an optional `ProductLookup`, defaulting to whatever the locator provides. This optional parameter trick is what makes the class trivially testable, since a test passes in a fake `ProductLookup` while production lets it resolve from `getIt`.

Notice that `cart_calculator.dart` never imports anything from <VPIcon icon="fas fa-folder-open"/>`features/product/src/`. It only imports the shared contract and the locator. The product feature could be rewritten from scratch, swapping the in-memory map for a real backend call. `cart_calculator.dart` wouldn't need a single edited line, as long as `ProductRepository` still implemented `ProductLookup`.

This is LEGO Architecture's most important trick at scale. The contract lives in neutral territory inside <VPIcon icon="fas fa-folder-open"/>`core/contracts/`, the concrete brick lives inside the feature that owns it, and a single wiring point (the service locator) is the only place that ever imports both sides.

---

## Composing Whole Features Like a LEGO Set

The final level before comparing against Clean Architecture is treating entire features as pluggable modules that the app shell assembles at startup. This happens the same way a LEGO instruction booklet tells you which sub-assemblies snap onto the base plate.

```dart title="lib/core/feature_module.dart"
import 'package:go_router/go_router.dart';

abstract class FeatureModule {
  List<RouteBase> get routes;
  void registerDependencies();
}
```

```dart title="lib/features/cart/cart_module.dart"
import 'package:go_router/go_router.dart';
import 'package:app/core/feature_module.dart';
import 'package:app/core/di/service_locator.dart';
import 'src/screens/cart_screen.dart';
import 'src/services/cart_calculator.dart';

class CartModule implements FeatureModule {
  @override
  void registerDependencies() {
    getIt.registerFactory<CartCalculator>(() => CartCalculator());
  }

  @override
  List<RouteBase> get routes => [
        GoRoute(path: '/cart', builder: (context, state) => const CartScreen()),
      ];
}
```

```dart title="lib/app.dart"
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'features/cart/cart_module.dart';
import 'features/product/product_module.dart';
import 'core/feature_module.dart';

final List<FeatureModule> modules = [
  ProductModule(),
  CartModule(),
];

GoRouter buildRouter() {
  for (final module in modules) {
    module.registerDependencies();
  }
  return GoRouter(
    routes: modules.expand((m) => m.routes).toList(),
  );
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(routerConfig: buildRouter());
  }
}
```

`FeatureModule` is the highest level stud in the app. Any feature that wants to plug into the shell must provide `routes`, meaning the screens it exposes, and `registerDependencies()`, meaning what it needs wired into the service locator.

`CartModule` implements that contract, and inside `registerDependencies()` it registers `CartCalculator` as a factory. This is a new instance every time it's requested, unlike the singleton `ProductRepository` from the previous section. The registration style is a decision each feature makes for itself.

The import `package:go_router/go_router.dart` brings in the `go_router` package. This turns `RouteBase` objects into a working navigation stack, and `GoRoute(path: ..., builder: ...)` maps a URL-like path to a screen. `app.dart` is the true composition root of the entire application. The `modules` list is the instruction booklet, and it's the only file in the whole app that knows every feature exists. It loops through each module, lets it register its own dependencies, and flattens all their routes into one `GoRouter`.

To add a whole new feature to the app, you write one new `FeatureModule` implementation and add one line to the `modules` list, and no existing feature file is touched. That's the LEGO promise fully realized: adding a new brick to the set never requires re-molding the bricks already in the box.

![Architecture diagram showing  as the application entry point that registers dependencies and assembles the router, while collecting routes from self-contained, and future feature modules that can be plugged in independently.](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/66074b06-4127-4ae1-bbc3-486b89923d9b.png)

That's LEGO Architecture from the ground up. Widgets compose, classes depend on contracts, folders enforce boundaries, contracts cross module lines through a locator, and whole features snap into the app shell through a `FeatureModule` contract. Now let's look at Clean Architecture, so we can compare the two on equal footing.

---

## Clean Architecture Crash Course

Clean Architecture, as popularized by Robert C. Martin, is a specific layering scheme built around one rule, known as the Dependency Rule: source code dependencies can only point inward, toward higher level policy. Nothing in an inner layer can know anything about an outer layer.

![Architecture diagram showing the Presentation and Data layers pointing inward to depend on and implement the central Domain Layer, demonstrating the core dependency rule.](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/24cc55e9-0a72-4b3e-b3e0-b4fe89d5d98c.png)

Let's build a single feature (getting a product by id) through all three layers, starting with the domain layer and its entity: a plain, framework free object.

```dart title="lib/features/product/domain/entities/product.dart"
class Product {
  final String id;
  final String name;
  final double price;

  const Product({required this.id, required this.name, required this.price});
}
```

Next comes the domain layer's repository port, an interface the domain defines but doesn't implement.

```dart title="lib/features/product/domain/repositories/product_repository.dart"
import '../entities/product.dart';

abstract class ProductRepository {
  Future<Product> getById(String id);
}
```

Then the domain layer's use case: a single, named business action.

```dart title="lib/features/product/domain/usecases/get_product.dart"
import '../entities/product.dart';
import '../repositories/product_repository.dart';

class GetProduct {
  final ProductRepository repository;
  GetProduct(this.repository);

  Future<Product> call(String id) => repository.getById(id);
}
```

Now the data layer, starting with the repository implementation that satisfies the domain's port.

```dart title="lib/features/product/data/repositories/product_repository_impl.dart"
import 'package:app/features/product/domain/entities/product.dart';
import 'package:app/features/product/domain/repositories/product_repository.dart';
import '../datasources/product_remote_data_source.dart';

class ProductRepositoryImpl implements ProductRepository {
  final ProductRemoteDataSource remoteDataSource;
  ProductRepositoryImpl(this.remoteDataSource);

  @override
  Future<Product> getById(String id) async {
    final dto = await remoteDataSource.fetchProduct(id);
    return Product(id: dto.id, name: dto.name, price: dto.price);
  }
}
```

And the remote data source, which owns the actual HTTP call and the raw JSON shape.

```dart title="lib/features/product/data/datasources/product_remote_data_source.dart"
import 'package:dio/dio.dart';

class ProductDto {
  final String id;
  final String name;
  final double price;
  ProductDto({required this.id, required this.name, required this.price});

  factory ProductDto.fromJson(Map<String, dynamic> json) => ProductDto(
        id: json['id'],
        name: json['name'],
        price: (json['price'] as num).toDouble(),
      );
}

class ProductRemoteDataSource {
  final Dio client;
  ProductRemoteDataSource(this.client);

  Future<ProductDto> fetchProduct(String id) async {
    final response = await client.get('/products/$id');
    return ProductDto.fromJson(response.data);
  }
}
```

Finally, the presentation layer: a Cubit that calls the use case.

```dart title="lib/features/product/presentation/cubit/product_cubit.dart"
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:app/features/product/domain/entities/product.dart';
import 'package:app/features/product/domain/usecases/get_product.dart';

sealed class ProductState {}
class ProductLoading extends ProductState {}
class ProductLoaded extends ProductState {
  final Product product;
  ProductLoaded(this.product);
}
class ProductError extends ProductState {
  final String message;
  ProductError(this.message);
}

class ProductCubit extends Cubit<ProductState> {
  final GetProduct getProduct;
  ProductCubit(this.getProduct) : super(ProductLoading());

  Future<void> load(String id) async {
    emit(ProductLoading());
    try {
      final product = await getProduct(id);
      emit(ProductLoaded(product));
    } catch (e) {
      emit(ProductError(e.toString()));
    }
  }
}
```

Let's walk through each layer in order.

First, `entities/product.dart` has zero imports. That's intentional, since it's the single most important rule of the domain layer: it can't import Flutter, Dio, or any framework. It's pure Dart, so it could be reused in a command line tool or a backend without modification.

`repositories/product_repository.dart` is an abstract class, the port. The domain layer defines what it needs, `getById`, but never how it's fetched. This is identical in spirit to `CartWriter` and `ProductLookup` from earlier sections. After all, Clean Architecture didn't invent dependency inversion, it just applies it systematically at every seam.

`usecases/get_product.dart` wraps one business action, and `GetProduct` implements `call(String id)`, which lets you invoke an instance like a function, `getProduct('p1')`. Its constructor takes a `ProductRepository` (again the abstract port), never the concrete `ProductRepositoryImpl`.

`data/datasources/product_remote_data_source.dart` owns `import 'package:dio/dio.dart';` and all knowledge of the wire format through `ProductDto.fromJson`. This is the only file in the whole feature allowed to know what the raw JSON from the server looks like.

`data/repositories/product_repository_impl.dart` implements the domain's port and translates between shapes, taking a `ProductDto` (the data layer shape) and returning a `Product` (the domain layer shape). This translation step is what lets the domain layer stay ignorant of JSON entirely.

`presentation/cubit/product_cubit.dart` imports `package:flutter_bloc/flutter_bloc.dart` for `Cubit`, plus the domain's `GetProduct` and `Product`, but never anything from `data/`. The `sealed class ProductState` with its three subclasses (`ProductLoading`, `ProductLoaded`, and `ProductError`) models every possible UI state explicitly, so the widget layer can switch over them without guessing.

Wiring it together is Clean Architecture's version of the composition root introduced earlier.

```dart title="lib/features/product/product_injection.dart"
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'domain/repositories/product_repository.dart';
import 'domain/usecases/get_product.dart';
import 'data/datasources/product_remote_data_source.dart';
import 'data/repositories/product_repository_impl.dart';

void registerProductFeature(GetIt getIt) {
  getIt.registerLazySingleton(() => Dio());
  getIt.registerLazySingleton(() => ProductRemoteDataSource(getIt<Dio>()));
  getIt.registerLazySingleton<ProductRepository>(
    () => ProductRepositoryImpl(getIt<ProductRemoteDataSource>()),
  );
  getIt.registerFactory(() => GetProduct(getIt<ProductRepository>()));
}
```

This file is the only place in the entire feature that sees every layer at once: domain, data, and the concrete `Dio` client. This is exactly the same responsibility that `service_locator.dart` and `CartModule` held in the earlier LEGO examples.

---

## LEGO Architecture Compared With Clean Architecture

At this point the resemblance between these two architectures should be pretty clear: both are built on dependency inversion, depending on contracts rather than concretions, and both use a single wiring point to assemble concrete pieces.

The difference is what each one is optimized to answer.

LEGO Architecture is best described as a mindset or philosophy about composability and boundaries. You get to choose the unit of composition, whether that's a widget, a service, or a whole feature module.

Boundaries live wherever you decide to put them: in folders, barrel files, or module contracts. You also choose how small or large a brick should be. The primary goal is interchangeability, so that any piece can be swapped without breaking its neighbors.

LEGO architecture has a low learning curve to start, since the first level needs nothing new beyond Flutter itself, and it scales up gradually as you adopt more of its later levels. It carries as much or as little boilerplate as you choose to add.

It works best for apps that need flexible feature boundaries, teams working in parallel, and incremental adoption. Its main risk is what might be called LEGO in name only, where bricks quietly reach into each other's internals despite the folder structure suggesting otherwise.

Clean Architecture, in contrast, is a specific, named layering scheme with a fixed shape: presentation, domain, and data, with the Dependency Rule always pointing inward.

Its units of composition are specifically entities, use cases, and repositories. Its primary goal is testability and independence from frameworks, UI, and databases, and it tends to be fairly fine-grained by default, with a prescribed structure repeated per feature.

Its learning curve is steeper up front, since several files are needed per feature from day one, and it carries noticeably more boilerplate per feature, including an entity, a use case, two repository layers, a DTO, and a cubit or similar.

It's best suited to apps with complex business rules that must stay independent of UI or framework churn. Its main risk is boilerplate for boilerplate's sake: building three layers for a feature that has no real business logic to protect.

The most useful way to think about the relationship between the two is this: Clean Architecture is one very well-specified way to build LEGO bricks out of a single feature. Its entities, use cases, and repositories are themselves bricks with studs, interfaces, wired together through dependency injection. This is precisely the LEGO idea, just applied with a fixed, opinionated shape.

You're not choosing LEGO **or** Clean Architecture. You're choosing how much of Clean Architecture's specific shape to apply within your LEGO bricks.

---

## Merging Both in a Modular Monorepo

Everything up to this point has used one folder structure inside one Flutter project. Barrel files kept features from reaching into each other's internals, but that boundary was still just a convention. Nothing physically stopped a file inside <VPIcon icon="fas fa-folder-open"/>`features/cart/` from importing a file inside <VPIcon icon="fas fa-folder-open"/>`features/product/src/`, other than discipline and code review.

At production scale, some teams remove that gap entirely by turning each feature into its own real Dart package, so the boundary is enforced by the package system itself rather than by discipline.

This is often called a monorepo, and the tool most commonly used to manage it in Flutter is Melos. The rest of this section builds that setup from nothing, one small step at a time, so that nothing about the final folder tree feels like it appeared by magic.

### Starting From an Empty Folder

Before any Flutter command runs, there's just a folder on your computer, with nothing Flutter-specific in it at all.

```sh
mkdir my_lego_project
cd my_lego_project
```

At this point `my_lego_project` isn't a Flutter project. It has no <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`, no <VPIcon icon="fas fa-folder-open"/>`lib` folder, and no <VPIcon icon="fas fa-folder-open"/>`android` folder. It's only a plain directory, the same as any folder you would create to hold documents. Everything that follows is built inside it, deliberately, one piece at a time.

### Giving the Project Somewhere for Native Code to Live

A phone still needs a real Android project and a real iOS project to run on. So the very first thing you'll create inside `my_lego_project` is one ordinary Flutter app, using the exact same command you've always used:

```sh
mkdir apps
cd apps
flutter create app_main
```

`flutter create app_main` behaves exactly as it always has. It generates <VPIcon icon="fas fa-folder-open"/>`android/`, <VPIcon icon="fas fa-folder-open"/>`ios/`, <VPIcon icon="fas fa-folder-open"/>`lib/main.dart`, and a <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`, all inside <VPIcon icon="fas fa-folder-open"/>`apps/app_main/`. Nothing about this step is LEGO-specific yet. The only decision made so far is where this ordinary app lives on disk: inside an `apps` folder rather than at the project root.

```sh title="file structure"
my_lego_project/
  apps/
    app_main/
      android/
      ios/
      lib/
        main.dart
      pubspec.yaml
```

This `app_main` folder is the only place in the whole project that will ever contain <VPIcon icon="fas fa-folder-open"/>`android/` or <VPIcon icon="fas fa-folder-open"/>`ios/`. Every other package created from here on will deliberately not have them.

### Creating the First Brick

Now step back out to the project root and create a second folder called `packages`, sitting next to `apps`.

```sh
cd ../..
mkdir packages
cd packages
```

Inside `packages`, create your first feature – but this time pass a different flag to the same `flutter create` command.

```sh
flutter create --template=package feature_login
```

The only thing different from before is `--template=package`. Without it, `flutter create` assumes you want a runnable app and generates native folders. With it, Flutter generates a plain library (meaning it produces a <VPIcon icon="fas fa-folder-open"/>`lib/` folder, a <VPIcon icon="fas fa-folder-open"/>`test/` folder, and a <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`) and it deliberately leaves out <VPIcon icon="fas fa-folder-open"/>`android/`, <VPIcon icon="fas fa-folder-open"/>`ios/`, and `web/`. This is because a package like this is never launched on its own. It only ever gets pulled into an app that does have those folders.

```sh title="file structure"
my_lego_project/
  apps/
    app_main/            # (has native folders)
  packages/
    feature_login/
      lib/
      test/
      pubspec.yaml
```

At this exact moment, `feature_login` and `app_main` know nothing about each other. They're two unrelated folders that happen to sit near each other on disk.

### Connecting the Brick to the App With a Path Dependency

To let `app_main` use code from `feature_login`, you add it as a dependency. You can do this the same way you would add any package from pub.dev, except you point at a local folder instead of a name and version.

```yaml title="apps/app_main/pubspec.yaml"
name: app_main
description: The actual iOS and Android wrapper application.

dependencies:
  flutter:
    sdk: flutter
  feature_login:
    path: ../../packages/feature_login
```

The line `path: ../../packages/feature_login` is a relative path from `app_main`'s own <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` back up two folders and down into `feature_login`. This isn't a Melos feature and it's not a LEGO Architecture invention. It's a plain feature of Dart's package manager, the same `path:` dependency you would use to point at any local package.

Once this is saved, running `flutter pub get` inside <VPIcon icon="fas fa-folder-open"/>`apps/app_main` is enough for <VPIcon icon="fas fa-folder-open"/>`lib/main.dart` in `app_main` to write `import 'package:feature_login/feature_login.dart';` and use whatever that package exposes.

It's worth noticing that the whole setup already works at this point, with exactly two packages and zero mentions of Melos so far. We haven't introduced Melos yet because it's not what creates the boundary between packages. The boundary already exists, enforced by <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` and the `path:` dependency. What Melos adds is convenience once this pattern is repeated across many packages, which is the next problem to solve.

### Where melos.yaml Actually Comes From

`melos.yaml` isn't generated by any Flutter command, and no tool creates it for you automatically. You install a package, and you write this file yourself, by hand, as a plain text file at the very root of the project.

First, install Melos itself as a global Dart tool, once, on your machine:

```sh
dart pub global activate melos
```

Then, at the root of `my_lego_project`, alongside the `apps` and `packages` folders, create a new file named <VPIcon icon="iconfont icon-yaml"/>`melos.yaml` and type the following into it:

```yaml title="melos.yaml"
name: my_lego_project

packages:
  - apps/**
  - packages/**
```

```sh title="file structure"
my_lego_project/
  melos.yaml
  apps/
    app_main/
  packages/
    feature_login/
```

The `packages:` list here uses glob patterns, meaning <VPIcon icon="fas fa-folder-open"/>`apps/**` and `packages/**` tell Melos to look inside both folders and treat every subfolder it finds that contains a <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` as one member of the monorepo. Nothing here is hidden or automatic. You're explicitly telling Melos where to search.

### What `melos bootstrap` Actually Does

With two packages, running `flutter pub get` once inside `app_main` and once inside `feature_login` isn't a burden. The value of Melos becomes clear once there are ten or twenty packages, each needing dependencies resolved and each depending on several others through local paths. Instead of visiting every folder by hand, you run one command from the project root:

```sh
melos bootstrap
```

This single command reads <VPIcon icon="iconfont icon-yaml"/>`melos.yaml`, finds every package under <VPIcon icon="fas fa-folder-open"/>`apps/**` and `packages/**`, and runs the equivalent of `flutter pub get` across all of them at once, resolving every local `path:` dependency along the way. It's an orchestration tool sitting on top of a mechanism that already existed (the ordinary <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` and `path:` dependency shown above) rather than a new mechanism of its own.

The modularity itself comes from separate <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` files and explicit path dependencies. Melos exists to make running commands across many of them fast and repeatable, and later, in a CI pipeline, to run tests only on the packages that actually changed.

### What Actually Belongs in app_main's lib Folder

A natural question at this point is whether every feature really becomes its own package. After all, in ordinary Flutter development a package usually means something reusable like a date picker, not a whole login screen.

In this pattern, yes, a whole feature such as login becomes its own package, including its screens, its state management, and its business logic. The reason is the same isolation goal that has driven every level of this handbook.

If `feature_login` is its own package, a developer working inside `feature_home` can't accidentally import something from inside `feature_login`, because it was never declared as a dependency in `feature_home`'s own <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`. The compiler refuses the import outright, rather than a reviewer having to catch it by eye.

That raises a second question: if the screens, state management, and logic all live inside feature packages, what's left inside `app_main/lib`? The answer is that `app_main/lib` shrinks down to exactly three responsibilities.

1. It holds `main.dart`, which boots the app and calls `runApp()`.
2. It holds the dependency injection setup. This means the composition root from earlier sections, where concrete implementations (such as a real network client) get created and handed to whichever feature packages need them.
3. And it holds the master router, since a feature package like `feature_login` deliberately doesn't know that `feature_home` exists. So only `app_main`, which depends on both, is in a position to navigate from one to the other.

Here is what that navigation glue looks like concretely, starting inside the feature package itself:

```dart title="packages/feature_login/lib/login_screen.dart"
abstract class LoginNavigationContract {
  void onLoginSuccess();
}

class LoginScreen extends StatelessWidget {
  final LoginNavigationContract navigator;

  const LoginScreen({super.key, required this.navigator});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => navigator.onLoginSuccess(),
      child: const Text('Submit'),
    );
  }
}
```

`feature_login` defines `LoginNavigationContract`, an abstract class with one method, `onLoginSuccess()`. `LoginScreen` accepts an implementation of it through its constructor rather than importing any other feature directly.

This is the same contract pattern used throughout this handbook, applied at the package boundary instead of the class boundary. `feature_login` states what needs to happen next, without ever stating where "next" actually is.

`app_main` is the only package allowed to know that both `feature_login` and `feature_home` exist, so it's the one that answers that question.

```dart title="apps/app_main/lib/app_navigator.dart"
import 'package:feature_login/feature_login.dart';
import 'package:feature_home/feature_home.dart';
import 'package:flutter/material.dart';

class AppNavigator implements LoginNavigationContract {
  final BuildContext context;
  AppNavigator(this.context);

  @override
  void onLoginSuccess() {
    Navigator.push(context, MaterialPageRoute(builder: (_) => const HomeScreen()));
  }
}
```

`AppNavigator` implements `LoginNavigationContract` and is the only place that imports both `feature_login` and `feature_home` at once. When `onLoginSuccess()` fires, it pushes `HomeScreen`, a widget that lives inside `feature_home`. Wiring it into the running app happens back in `main.dart`.

```dart title="apps/app_main/lib/main.dart"
import 'package:flutter/material.dart';
import 'package:feature_login/feature_login.dart';
import 'app_navigator.dart';

void main() => runApp(const App());

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: LoginScreen(navigator: AppNavigator(context)),
    );
  }
}
```

This is the complete picture. `feature_login` owns its screens, its validation, and the question of what should happen after a successful login, expressed only as a contract.

`app_main`, and only `app_main`, owns the concrete answer, along with <VPIcon icon="fas fa-folder-open"/>`android/`, <VPIcon icon="fas fa-folder-open"/>`ios/`, `main.dart`, dependency injection, and routing. Every other package in `packages/` follows the same shape as `feature_login`: a <VPIcon icon="fas fa-folder-open"/>`lib/` folder, a <VPIcon icon="fas fa-folder-open"/>`test/` folder, a <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` with explicit `path:` dependencies, and no native folders at all, because those exist in exactly one place in the whole project.

```sh title="file structure"
my_lego_project/
  melos.yaml
  apps/
    app_main/
      android/            # only here
      ios/                # only here
      lib/
        main.dart         # owns: boot, DI, routing
        app_navigator.dart
      pubspec.yaml        # depends on every feature package
  packages/
    feature_login/
      lib/                # owns: login screens, logic
      pubspec.yaml        #  depends on nothing feature-specific
    feature_home/
      lib/                # owns: home screens, logic
      pubspec.yaml
```

The line that matters most once every package is in place is still the same one introduced earlier: a feature package's <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` only lists the packages it is genuinely allowed to depend on. `feature_home` never appears in `feature_login`'s <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`, so `feature_login` can't import it even by accident. That's enforced by the Dart package system itself rather than by a reviewer catching it.

This is the strongest version of LEGO Architecture available in Flutter. Your bricks are literal, independently-versioned packages, your studs are literal package dependencies declared in <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`, and the compiler, not code review, enforces the rule for you.

---

## Swappable State Management Bricks

One more advanced LEGO move worth knowing is making even your state management library a brick you can swap. This matters when a team is migrating from Bloc to Riverpod, or wants to support both during a transition.

The trick is the same one used throughout this handbook: define a contract the UI depends on, and let two different state management implementations satisfy it.

```dart title="lib/features/product/presentation/product_presenter.dart"
abstract class ProductPresenter {
  ProductUiState get state;
  Stream<ProductUiState> get stateStream;
  Future<void> load(String id);
}

class ProductUiState {
  final bool isLoading;
  final String? name;
  final String? error;
  const ProductUiState({this.isLoading = false, this.name, this.error});
}
```

A Bloc based implementation might look like this:

```dart
class BlocProductPresenter implements ProductPresenter {
  final ProductCubit _cubit;
  BlocProductPresenter(this._cubit);

  @override
  ProductUiState get state => _mapState(_cubit.state);

  @override
  Stream<ProductUiState> get stateStream => _cubit.stream.map(_mapState);

  @override
  Future<void> load(String id) => _cubit.load(id);

  ProductUiState _mapState(ProductState s) => switch (s) {
        ProductLoading() => const ProductUiState(isLoading: true),
        ProductLoaded(product: final p) => ProductUiState(name: p.name),
        ProductError(message: final m) => ProductUiState(error: m),
      };
}
```

Here, the widget layer only ever imports `ProductPresenter` and `ProductUiState`, never `ProductCubit`, `Bloc`, or Riverpod directly.

`BlocProductPresenter` is the adapter brick that translates Bloc's specific `ProductState` shape into the generic `ProductUiState` the UI understands, using Dart's `switch` pattern matching over the `sealed class` hierarchy defined earlier. If the team later writes a Riverpod-based presenter, the widget code doesn't change at all, since only the wiring in the composition root changes which presenter gets handed to the widget tree.

This is the LEGO principle applied to its most volatile dependency, since the state management library itself becomes just another interchangeable brick.

---

## A Full Worked Example: Products, LEGO-Style, With Clean Layers Inside

Let's put everything together into one coherent feature, showing the full file tree and how every piece connects.

```sh title="file structure"
lib/
  core/
    contracts/
      product_lookup.dart          # shared interface
    di/
      service_locator.dart
    feature_module.dart            # app-shell contract
  features/
    product/
      product.dart                 # barrel file / public stud
      product_module.dart          # implements FeatureModule
      domain/
        entities/product.dart
        repositories/product_repository.dart
        usecases/get_product.dart
      data/
        datasources/product_remote_data_source.dart
        repositories/product_repository_impl.dart
      presentation/
        cubit/product_cubit.dart
        widgets/product_card.dart  # composed UI bricks
```

The module file ties every level together in one place.

```dart :collapsed-lines title="lib/features/product/product_module.dart"
import 'package:dio/dio.dart';
import 'package:go_router/go_router.dart';
import 'package:app/core/feature_module.dart';
import 'package:app/core/di/service_locator.dart';
import 'package:app/core/contracts/product_lookup.dart';
import 'domain/repositories/product_repository.dart';
import 'domain/usecases/get_product.dart';
import 'data/datasources/product_remote_data_source.dart';
import 'data/repositories/product_repository_impl.dart';
import 'presentation/screens/product_screen.dart';

class ProductModule implements FeatureModule {
  @override
  void registerDependencies() {
    getIt.registerLazySingleton(() => Dio());
    getIt.registerLazySingleton(
      () => ProductRemoteDataSource(getIt<Dio>()),
    );
    getIt.registerLazySingleton<ProductRepository>(
      () => ProductRepositoryImpl(getIt<ProductRemoteDataSource>()),
    );
    // this repository ALSO satisfies the cross-feature ProductLookup
    // contract, so cart (or any other feature) can use it
    // without ever importing anything from this feature's src/.
    getIt.registerLazySingleton<ProductLookup>(
      () => getIt<ProductRepository>() as ProductLookup,
    );
    getIt.registerFactory(() => GetProduct(getIt<ProductRepository>()));
  }

  @override
  List<RouteBase> get routes => [
        GoRoute(
          path: '/product/:id',
          builder: (context, state) =>
              ProductScreen(productId: state.pathParameters['id']!),
        ),
      ];
}
```

This one file is doing exactly one job (assembly). Every dependency it wires up flows in a single direction: from data, up through domain, up to presentation, matching the Clean Architecture diagram from earlier.

At the same time it satisfies the `FeatureModule` contract from the composing features section, which means `app.dart` treats `ProductModule` identically to `CartModule`. It's just another brick to add to the `modules` list.

The design decision worth calling out is that `ProductRepositoryImpl` implements two interfaces at once: the feature local `ProductRepository`, used inside this feature's own use case, and the cross feature `ProductLookup`, used by other features such as cart that only need a narrow slice of what this feature can do.

This is a common advanced LEGO pattern, where a single concrete brick exposes multiple, differently shaped studs. This lets different consumers see only the surface relevant to them, without those consumers needing to depend on each other or on the full feature.

![Architecture diagram showing  as one concrete implementation that implements two interfaces: , used only within the product feature through the  use case, and , a narrow interface exposed for use by other features such as the cart.](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/b1228a73-fe70-4f3b-8230-3943ecd07fce.png)

---

## When to Use Which, and Common Pitfalls

For a small app with a short timeline and few business rules, it's worth staying at the earlier levels of LEGO Architecture. Compose widgets, define a handful of contracts where you genuinely expect to swap implementations (such as the network client or auth), and avoid forcing entities, use cases, and DTOs onto a feature that's really just showing a list and letting the user tap an item.

For a growing team with multiple people touching the same codebase, moving to feature folders with barrel files and a `FeatureModule` contract stops merge conflicts and accidental cross-feature coupling before they start.

For complex domain logic that must outlive the UI framework, or that a backend team might reuse, bringing in full Clean Architecture layers inside each feature pays for itself the moment business rules stop being trivial. They cover things like discounts, tax rules, eligibility checks, and state machines.

For multiple teams shipping independently, or a design system shared across apps, moving to the modular monorepo pattern makes sense, since features become real packages and the compiler enforces boundaries instead of relying on code review.

There are two ways this tends to fail in practice. The first is LEGO in name only, where a folder is named <VPIcon icon="fas fa-folder-open"/>`features/cart/`, but a file inside it reaches directly into `../../product/src/services/product_repository.dart`. The moment any file reaches past another feature's barrel file into its <VPIcon icon="fas fa-folder-open"/>`src/`, independent bricks stop existing. What's left is a monolith wearing a feature folder costume. The fix is always the same: route the dependency through a contract in <VPIcon icon="fas fa-folder-open"/>`core/contracts/`.

The second is Clean Architecture cargo culting, where a feature that's genuinely just fetch a list and render it ends up with an entity, a repository interface, a repository implementation, a DTO, a use case, and a cubit. It has six files and three layers for a screen with no real business logic.

This isn't wrong exactly, but it's wasted effort, since the whole point of the Dependency Rule is to protect volatile business logic from framework churn, and there's no business logic here to protect.

When a feature has no rules beyond showing what the server sent, it's fine to let the repository return the DTO shape directly and skip the entity and use case ceremony. Those layers can always be added later, the moment real logic shows up, without having wasted time building them speculatively.

---

## Wrapping Up

Think of LEGO Architecture as a way of organizing your code, not something you install or copy.

Before you start building, you first define how the different parts of your application should connect, deciding what each part is allowed to depend on and what it should expose to others.

Once those rules are clear, you build the actual classes and implementations around them, while keeping each component’s internal details private so other parts of the application only interact with it through its public interface.

Finally, you bring the concrete pieces together at one clear assembly point instead of creating dependencies throughout the codebase.

Clean Architecture is what you get when you apply that same discipline with a specific, well-tested shape (entities, use cases, and repositories) inside each feature.

A good place to start today is pulling the decoration logic out of your next widget into its own `SurfaceCard`-style component. The next time you write a service class, make it implement an abstract class instead of being called directly. Everything else in this handbook, like feature modules, service locators, modular monorepos, and Clean Architecture layers, is that same one habit, repeated at a larger scale.

---

## References

```component VPCard
{
  "title": "Clean Coder Blog",
  "desc": "",
  "link": "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html",
  "logo": "https://blog.cleancoder.com/assets/clean_code_72_color.png",
  "background": "rgba(0,136,0,0.2)"
}
```

<SiteInfo
  name="Architecting Flutter apps"
  desc="Learn how to structure Flutter apps."
  url="https://docs.flutter.dev/app-architecture"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

<SiteInfo
  name="Architecture design patterns"
  desc="A collection of articles about useful design patterns for building Flutter applications."
  url="https://docs.flutter.dev/app-architecture/design-patterns"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

<SiteInfo
  name="get_it | Dart package"
  desc="Simple direct Service Locator that allows to decouple the interface from a concrete implementation and  to access the concrete implementation from everywhere in your App”"
  url="https://pub.dev/packages/get_it"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-fg97iip1/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="go_router | Flutter package"
  desc="A declarative router for Flutter based on Navigation 2 supporting deep linking, data-driven routes and more"
  url="https://pub.dev/packages/go_router"
  logo="https://pub.dev/static/hash-fg97iip1/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-fg97iip1/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="flutter_bloc | Flutter package"
  desc="Flutter widgets that make it easy to implement the BLoC (Business Logic Component) design pattern. Built to be used with the bloc state management package."
  url="https://pub.dev/packages/flutter_bloc"
  logo="https://pub.dev/static/hash-fg97iip1/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-fg97iip1/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="dio | Dart package"
  desc="A powerful HTTP networking package, supports Interceptors, Aborting and canceling a request, Custom adapters, Transformers, etc."
  url="https://pub.dev/packages/dio"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-fg97iip1/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="Melos"
  desc="A tool for managing Dart projects with multiple packages."
  url="https://melos.invertase.dev/"
  logo="https://raw.githubusercontent.com/invertase/melos/main/docs/assets/logo.png"
  preview="https://docspage-production.up.railway.app/api/og?params=eyJ0aXRsZSI6Ik1lbG9zIiwiZGVzY3JpcHRpb24iOiJBIHRvb2wgZm9yIG1hbmFnaW5nIERhcnQgcHJvamVjdHMgd2l0aCBtdWx0aXBsZSBwYWNrYWdlcy4iLCJsb2dvIjoiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2ludmVydGFzZS9tZWxvcy9tYWluL2RvY3MvYXNzZXRzL2xvZ28ucG5nIiwicmVwb3NpdG9yeSI6ImludmVydGFzZS9tZWxvcyJ9"/>

<SiteInfo
  name="Effective Dart"
  desc="Best practices for building consistent, maintainable, and efficient Dart libraries."
  url="https://dart.dev/effective-dart"
  logo="https://dart.dev/assets/img/logo/dart-64.png"
  preview="https://dart.dev/assets/img/logo/dart-logo-for-shares.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Implement LEGO Architecture in Flutter [Full Handbook]",
  "desc": "Almost everyone has snapped two LEGO bricks together at some point, even without owning a single set as an adult. You press one brick down onto another, feel it click, and it holds. You likely never o",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-lego-architecture-in-flutter-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
