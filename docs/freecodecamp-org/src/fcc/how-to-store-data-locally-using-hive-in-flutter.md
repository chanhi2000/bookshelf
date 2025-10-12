---
lang: en-US
title: "How to Store Data Locally Using Hive in Flutter"
description: "Article(s) > How to Store Data Locally Using Hive in Flutter"
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
      content: "Article(s) > How to Store Data Locally Using Hive in Flutter"
    - property: og:description
      content: "How to Store Data Locally Using Hive in Flutter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-store-data-locally-using-hive-in-flutter.html
prev: /programming/dart/articles/README.md
date: 2025-09-09
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757428555303/4228b0b2-9edf-48af-a917-2535b6adffa3.png
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
  name="How to Store Data Locally Using Hive in Flutter"
  desc="In this tutorial, we’ll build a Flutter application that demonstrates how to perform CRUD (Create, Read, Update, Delete) operations using Hive for local data storage. Hive is a lightweight, fast key-value database written in pure Dart. Unlike SQLite,..."
  url="https://freecodecamp.org/news/how-to-store-data-locally-using-hive-in-flutter"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1757428555303/4228b0b2-9edf-48af-a917-2535b6adffa3.png"/>

In this tutorial, we’ll build a Flutter application that demonstrates how to perform CRUD (Create, Read, Update, Delete) operations using [<VPIcon icon="fas fa-globe"/>Hive](https://pub.dev/packages/hive) for local data storage.

Hive is a lightweight, fast key-value database written in pure Dart. Unlike SQLite, it doesn’t need a heavy SQL engine. It stores data in boxes, which you can think of as containers (similar to tables, but simpler).

For a small CRUD app like this, Hive is a great fit because:

1. It’s offline-first, and all data is stored locally on the device – no internet required.
2. It’s type-safe and integrates well with Dart models (like our `Item`).
3. It’s much faster than SQLite for simple operations.
4. It has a Flutter-friendly API (`hive_flutter`) for things like reactive updates.

Hive is great for a number of different use cases, like storing app preferences/settings, managing small to medium lists of structured data (like notes, tasks, or shopping lists), offline caching for API responses, and storing session or user profile data locally.

Here, Hive is powering the to-do/inventory-like list of items, which means everything (title, quantity) is stored locally and persists even after the app restarts.

By the end of this tutorial, you'll have a fully functional app that lets you add, edit, delete, and view items locally. I’ll provide clear explanations of the code along the way.

::: note Prerequisites

Before we begin, make sure you have the following:

1. Flutter SDK installed (version 3.0 or higher recommended).
2. Basic knowledge of Flutter: widgets, stateful/stateless widgets, and navigation.
3. A code editor like VS Code or Android Studio.
4. Familiarity with Dart classes, maps, and enums.

:::

---

## Step 1: Project Setup

Start by creating a new Flutter project:

```sh
flutter create flutter_hive_crud
cd flutter_hive_crud
```

Open <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` and add the following dependencies:

```yaml title="pubspec.yaml"
dependencies:
  hive: ^2.2.3
  hive_flutter: ^1.1.0
  fluttertoast: ^8.2.12
  equatable: ^2.0.7
```

Install them:

```sh
flutter pub get
```

- `hive`: Lightweight key-value database for Flutter.
- `hive_flutter`: Flutter bindings for Hive.
- `fluttertoast`: Displays toast messages.
- `equatable`: Simplifies value equality in Dart objects.

---

## Step 2: Project Folder Structure

Organize your project like this:

```plaintext title="file structure"
lib/
├── main.dart
├── model/
│   └── item.dart
├── controller/
│   └── controller.dart
├── constants/
│   ├── string_constants.dart
│   └── enums/
│       ├── status.dart
│       └── yes_no.dart
└── screens/
    ├── main_screen.dart
    └── widgets/
        ├── are_you_sure.dart
        ├── single_list_tile.dart
        ├── text_action.dart
        └── toast.dart
```

This structure keeps the app modular and maintainable.

---

## Step 3: Implementing the Application

We'll go through the process file by file, and I’ll explain what each piece does as we go.

### 1. <VPIcon icon="fa-brands fa-dart-lang"/>`main.dart`

This is the entry point of the application. It initializes Hive and launches the app.

```dart title="main.dart"
import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'screens/main_screen.dart';
import 'constants/string_constants.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Hive for Flutter
  await Hive.initFlutter();

  // Open the Hive box to store items
  await Hive.openBox(StringConstants.hiveBox);

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Hive CRUD',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.brown),
        useMaterial3: true,
      ),
      home: const MainScreen(),
    );
  }
}
```

::: info Here’s what’s going on in this code:

- `WidgetsFlutterBinding.ensureInitialized()` ensures Flutter widgets are ready.
- `Hive.initFlutter()` initializes Hive in Flutter.
- `Hive.openBox(...)` opens a persistent storage box.
- `MyApp` sets up the Material theme and main screen.

:::

### 2. <VPIcon icon="fa-brands fa-dart-lang"/>`item.dart` (Model)

Since Hive stores data as key-value pairs, we need to decide how to represent each item (like a shopping list entry or product in stock). To keep our code organized, we’ll wrap each item in a Dart class called `Item`. That way, we can easily create, update, and convert items to Maps when saving them into Hive.

```dart title="item.dart"
import 'package:equatable/equatable.dart';

class Item extends Equatable {
  final String title;
  final int quantity;

  const Item({required this.title, required this.quantity});

  @override
  List<Object> get props => [title, quantity];

  // Convert Item to Map for Hive storage
  Map<String, dynamic> toMap() {
    return {'title': title, 'quantity': quantity};
  }

  // Create Item from Map
  factory Item.fromMap(Map<String, dynamic> map) {
    return Item(title: map['title'], quantity: map['quantity']);
  }
}
```

So every time we save or fetch data, we’re just converting between `Item` (class instance) and `Map` (Hive format).

Here’s what’s going on:

- `Equatable` allows comparing items by value instead of reference.
- `toMap()` and `fromMap()` convert between Dart objects and the Hive storage format.

### 3. <VPIcon icon="fa-brands fa-dart-lang"/>`controller.dart` (Hive Controller)

This controller handles all Hive CRUD operations and UI updates.

```dart :collapsed-lines title="controller.dart"
import 'package:flutter/material.dart';
import 'package:flutter_hive_crud/constants/string_constants.dart';
import 'package:flutter_hive_crud/screens/widgets/toast.dart';
import 'package:hive_flutter/hive_flutter.dart';
import '../constants/enums/status.dart';
import '../model/item.dart';

class HiveController {
  final BuildContext context;
  final Function fetchDataFunction;

  HiveController({required this.context, required this.fetchDataFunction});

  final hiveBox = Hive.box(StringConstants.hiveBox);

  // Fetch all items from Hive
  List<Map<String, dynamic>> fetchData() {
    return hiveBox.keys.map((key) {
      final item = hiveBox.get(key);
      return {
        'key': key,
        'title': item['title'],
        'quantity': item['quantity'],
      };
    }).toList().reversed.toList();
  }

  Future<void> createItem({required Item item}) async {
    try {
      await hiveBox.add(item.toMap());
      afterAction('saved');
    } catch (e) {
      toastInfo(msg: 'Failed to create item', status: Status.error);
    }
  }

  Future<void> editItem({required Item item, required int itemKey}) async {
    try {
      hiveBox.put(itemKey, item.toMap());
      afterAction('edited');
    } catch (e) {
      toastInfo(msg: 'Failed to edit item', status: Status.error);
    }
  }

  Future<void> deleteItem({required int key}) async {
    try {
      await hiveBox.delete(key);
      afterAction('deleted');
    } catch (e) {
      toastInfo(msg: 'Failed to delete item', status: Status.error);
    }
  }

  Future<void> clearItems() async {
    try {
      await hiveBox.clear();
      afterAction('cleared');
    } catch (e) {
      toastInfo(msg: 'Failed to clear items', status: Status.error);
    }
  }

  void afterAction(String keyword) {
    toastInfo(msg: 'Item $keyword successfully', status: Status.success);
    fetchDataFunction(); // Refresh UI
    Navigator.of(context).pop(); // Close modals
  }
}
```

Let's break down this `HiveController` code block by block, explaining exactly what each section does and why it’s important.

#### Imports:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_hive_crud/constants/string_constants.dart';
import 'package:flutter_hive_crud/screens/widgets/toast.dart';
import 'package:hive_flutter/hive_flutter.dart';
import '../constants/enums/status.dart';
import '../model/item.dart';
```

Here’s what’s happening:

- <VPIcon icon="fas fa-folder-open"/>`flutter/`<VPIcon icon="fa-brands fa-dart-lang"/>`material.dart`: Provides Flutter’s material design widgets and utilities.
- <VPIcon icon="fa-brands fa-dart-lang"/>`string_constants.dart`: Contains app-wide constants, for example the name of the Hive box.
- <VPIcon icon="fa-brands fa-dart-lang"/>`toast.dart`: Utility to display toast messages for success or error feedback.
- <VPIcon icon="fa-brands fa-dart-lang"/>`hive_flutter.dart`: Hive package integration with Flutter.
- <VPIcon icon="fa-brands fa-dart-lang"/>`status.dart`: Enum representing status types (`error` or `success`) for toast messages.
- <VPIcon icon="fa-brands fa-dart-lang"/>`item.dart`: The model class representing an individual item (title + quantity).

These imports allow the controller to manage Hive data and interact with the UI.

#### Class definition and constructor:

```dart
class HiveController {
  final BuildContext context;
  final Function fetchDataFunction;

  HiveController({required this.context, required this.fetchDataFunction});
```

Here’s what’s going on:

- `HiveController`: This class manages all CRUD operations for Hive.
- `context`: The current Flutter `BuildContext`, used to navigate and show modals or dialogs.
- `fetchDataFunction`: A function passed from the UI that refreshes the list after performing any Hive operation.

The constructor requires both parameters, ensuring that every instance of `HiveController` has access to the UI context and a way to refresh data.

#### Hive box reference:

```dart
final hiveBox = Hive.box(StringConstants.hiveBox);
```

Here,

- `hiveBox` is a reference to the Hive box defined in `StringConstants.hiveBox`.
- A Hive box is like a key-value store where we save our items locally.
- This allows the controller to interact with Hive without needing to re-open the box each time.

#### Fetching data

```dart
List<Map<String, dynamic>> fetchData() {
  return hiveBox.keys.map((key) {
    final item = hiveBox.get(key);
    return {
      'key': key,
      'title': item['title'],
      'quantity': item['quantity'],
    };
  }).toList().reversed.toList();
}
```

Here’s what this code is doing:

- `hiveBox.keys`: Retrieves all the keys stored in the Hive box.
- `.map((key) => ...)`: Iterates through each key and fetches the associated item.
- Converts each item into a Map containing:
  - `'key'`: The unique Hive key (used for updates/deletes).
  - `'title'`: Item title.
  - `'quantity'`: Item quantity.
  - `.toList().reversed.toList()`: Converts the mapped iterable to a list and reverses it so **newest items appear first**.

This method returns a list of items ready for display in the UI.

#### Creating an item

```dart
Future<void> createItem({required Item item}) async {
  try {
    await hiveBox.add(item.toMap());
    afterAction('saved');
  } catch (e) {
    toastInfo(msg: 'Failed to create item', status: Status.error);
  }
}
```

In this code,

- `item.toMap()`: Converts the `Item` object to a Map so Hive can store it.
- `hiveBox.add(...)`: Adds a new entry to the Hive box, generating a unique key automatically.
- `afterAction('saved')`: Shows a success toast, refreshes the UI, and closes any open modal.
- The `catch` block handles errors and displays a toast if something goes wrong.

#### Editing an item

```dart
  Future<void> editItem({required Item item, required int itemKey}) async {
    try {
      hiveBox.put(itemKey, item.toMap());
      afterAction('edited');
    } catch (e) {
      toastInfo(msg: 'Failed to edit item', status: Status.error);
    }
  }
```

In this code,

- `hiveBox.put(itemKey, item.toMap())`: Updates the item at the specific key with the new data.
- `afterAction('edited')`: Handles feedback and UI updates.
- The `catch` block handles any errors during the edit process.

#### Deleting an item:

```dart
Future<void> deleteItem({required int key}) async {
  try {
    await hiveBox.delete(key);
    afterAction('deleted');
  } catch (e) {
    toastInfo(msg: 'Failed to delete item', status: Status.error);
  }
}
```

Here,

- `hiveBox.delete(key)`: Removes the item associated with the specified key from Hive.
- Calls `afterAction('deleted')` to refresh UI and show a success message.
- Errors are handled with a toast.

#### Clearing all items

```dart
Future<void> clearItems() async {
  try {
    await hiveBox.clear();
    afterAction('cleared');
  } catch (e) {
    toastInfo(msg: 'Failed to clear items', status: Status.error);
  }
}
```

Here’s what’s happening:

- `hiveBox.clear()`: Deletes **all items** in the Hive box.
- Useful for “Clear All” functionality in the app.
- Success and errors are handled the same way as other actions.

#### After action helper:

```dart
void afterAction(String keyword) {
  toastInfo(msg: 'Item $keyword successfully', status: Status.success);
  fetchDataFunction(); // Refresh UI
  Navigator.of(context).pop(); // Close modals
}
```

Here’s what’s going on:

- `toastInfo(...)`: Displays a success toast, for example, “Item saved successfully.”
- `fetchDataFunction()`: Calls the function passed from the UI to reload the list.
- `Navigator.of(context).pop()`: Closes any open modal or dialog (like the item form).

This method avoids repetition, centralizing the logic after any CRUD operation.

::: info Summary of HiveController Responsibilities

1. Fetch items from Hive for UI display.
2. Create, update, delete, and clear items.
3. Provide user feedback via toast messages.
4. Refresh the UI automatically after any data change.
5. Manage modals and dialogs with context.
6. `HiveController` abstracts Hive operations for cleaner UI code.
7. Methods: `createItem`, `editItem`, `deleteItem`, `clearItems`.
8. `afterAction` updates the UI and shows success messages.

:::

### 4. <VPIcon icon="fa-brands fa-dart-lang"/>`string_constants.dart`

This is centralized storage for string constants like Hive box names.

```dart title="string_constants.dart"
class StringConstants {
  static const hiveBox = 'items';
}
```

In this code:

- `class StringConstants`: Defines a class that’s only used to group constant values together.
- `static`: Means you don’t need to create an instance of `StringConstants` to use it. You can access it directly as `StringConstants.hiveBox`.
- `const`: Makes it a compile-time constant, so it can’t be modified anywhere in your code.
- `'items'`: This is just a string value. In this case, it’s the name of the Hive box you’ll be opening.

### 5. <VPIcon icon="fa-brands fa-dart-lang"/>`status.dart` (Enum)

```dart title="status.dart"
enum Status { error, success }
```

In this code:

- `enum`: Short for **enumeration**. It’s a special type that lets you define a fixed set of named values.
- `Status`: The name of the enum.
- `{ error, success }`: The possible values this enum can take.

So `Status` is now a custom type with only **two valid values**:

```dart
Status.error
Status.success
```

#### Why use it here?

Instead of passing around plain strings like `"error"` or `"success"` (which are easy to misspell), the code can use `Status.error` or `Status.success`.

For example, when showing a toast:

```dart
toastInfo(msg: 'Item deleted', status: Status.success);
// Or:
toastInfo(msg: 'Failed to delete item', status: Status.error);
```

This makes the code safer (you can’t accidentally pass `"sucess"` and break things), clearer (you can see the intent immediately), and easier to maintain (if you add more statuses later like `warning` or `info`, it’s just one place to update).

### 6. <VPIcon icon="fa-brands fa-dart-lang"/>`yes_no.dart` (Enum)

```dart title="yes_no.dart"
enum YesNo { yes, no }
```

- Defines a new type called `YesNo`.
- It can only ever have **two possible values**:
  - `YesNo.yes`
  - `YesNo.no`

#### Why use it?

Instead of passing around booleans (`true` / `false`) or strings (`"yes"` / `"no"`), you can use this enum to make your intent much clearer in code.

::: tip Example

For example:

```dart
YesNo userAccepted = YesNo.yes;

if (userAccepted == YesNo.yes) {
  print("User agreed!");
} else {
  print("User declined!");
}
```

This is more descriptive than using a plain `bool` where you’d have to guess what `true` or `false` means in context.

**Common use cases:**

- Confirmations (for example, *“Do you want to save this file?”*).
- Settings toggles (for example, *“Enable notifications?”*).
- API responses that return `"yes"` / `"no"` as strings. You can map them to this enum for safer handling.

:::

### 7. <VPIcon icon="fa-brands fa-dart-lang"/>`toast.dart`

```dart title="toast.dart"
import 'package:fluttertoast/fluttertoast.dart';
import '../../../constants/enums/status.dart';

void toastInfo({required String msg, required Status status}) {
  Fluttertoast.showToast(
    msg: msg,
    backgroundColor: status == Status.error ? Colors.red : Colors.green,
    toastLength: Toast.LENGTH_LONG,
    gravity: ToastGravity.TOP,
  );
}
```

This is a helper function for showing toast messages in your Flutter app.

A **toast** is a small, temporary popup message (usually at the bottom or top of the screen) used to quickly notify the user about something. For example, you might have *“Item saved successfully”* or *“Error deleting item”*.

### 8. <VPIcon icon="fa-brands fa-dart-lang"/>`are_you_sure.dart` (Confirmation Dialog)

```dart title="are_you_sure.dart"
import 'dart:io';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

Future<void> areYouSureDialog({
  required String title,
  required String content,
  required BuildContext context,
  required Function action,
  bool isKeyInvolved = false,
  int key = 0,
}) {
  return showDialog(
    context: context,
    builder: (context) => Platform.isIOS
        ? CupertinoAlertDialog(
            title: Text(title),
            content: Text(content),
            actions: [
              CupertinoDialogAction(
                  onPressed: () =>
                      isKeyInvolved ? action(key: key) : action(),
                  child: const Text('Yes')),
              CupertinoDialogAction(
                  onPressed: () => Navigator.of(context).pop(),
                  child: const Text('Dismiss')),
            ],
          )
        : AlertDialog(
            title: Text(title),
            content: Text(content),
            actions: [
              ElevatedButton(
                  onPressed: () =>
                      isKeyInvolved ? action(key: key) : action(),
                  child: const Text('Yes')),
              ElevatedButton(
                  onPressed: () => Navigator.of(context).pop(),
                  child: const Text('Dismiss')),
            ],
          ),
  );
}
```

This code handles user confirmations for actions like delete or clear.

This function shows a platform-aware confirmation dialog (`Are you sure?`) that:

1. Works on iOS with a `CupertinoAlertDialog`.
2. Works on Android/others with a Material `AlertDialog`.
3. Calls a provided `action` when the user presses Yes.
4. Closes the dialog when the user presses Dismiss.
5. Optionally passes a `key` into the action function.

### 9. <VPIcon icon="fa-brands fa-dart-lang"/>`single_list_tile.dart` (List Item Widget)

```dart :collapsed-lines title="single_list_tile.dart"
import 'package:flutter/material.dart';
import '../../model/item.dart';
import 'text_action.dart';
import '../../constants/enums/yes_no.dart';

class SingleListItem extends StatelessWidget {
  final Item item;
  final int itemKey;
  final Function editHandle;
  final Function deleteDialog;
  final Function deleteItem;

  const SingleListItem({
    super.key,
    required this.item,
    required this.itemKey,
    required this.editHandle,
    required this.deleteDialog,
    required this.deleteItem,
  });

  @override
  Widget build(BuildContext context) {
    return Dismissible(
      key: ValueKey(itemKey),
      confirmDismiss: (_) => showDialog(
        context: context,
        builder: (_) => AlertDialog(
          title: const Text('Are you sure?'),
          content: Text('Delete ${item.title}?'),
          actions: [
            textAction('Yes', YesNo.yes, context),
            textAction('No', YesNo.no, context),
          ],
        ),
      ),
      onDismissed: (_) => deleteItem(key: itemKey),
      background: Container(
        color: Colors.red,
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 20),
        child: const Icon(Icons.delete, color: Colors.white),
      ),
      child: ListTile(
        title: Text(item.title),
        subtitle: Text(item.quantity.toString()),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            IconButton(onPressed: () => editHandle(item: item, key: itemKey), icon: const Icon(Icons.edit)),
            IconButton(onPressed: () => deleteDialog(key: itemKey), icon: const Icon(Icons.delete)),
          ],
        ),
      ),
    );
  }
}
```

This code represents each list item with edit/delete options and swipe-to-delete functionality.

This widget represents **one item** (like a row in a shopping list, todo list, inventory app, and so on) with:

1. Swipe-to-delete functionality.
2. Edit and delete buttons.
3. A confirmation dialog before dismissing

### 10. <VPIcon icon="fa-brands fa-dart-lang"/>`main_screen.dart` (UI + State Management)

This is the main screen that puts everything together, including forms, lists, and modals.  
Due to length, the full explanation is already well-commented in the original code, covering:

- `itemModal()`: Bottom sheet form for create/edit.
- `fetchData()`: Load items from Hive.
- `editHandle()`: Load item for editing.
- `deleteDialog()`: Confirm delete.
- `clearAllDialog()`: Confirm clearing all items.

::: info Screenshots

![screenshot of a populated list ](https://cdn.hashnode.com/res/hashnode/image/upload/v1703246520284/6d8ab811-24f4-4482-82f3-a1ab37eff384.png)

![screenshot of adding a new item](https://cdn.hashnode.com/res/hashnode/image/upload/v1703246525459/80ac292a-271d-4adf-b2bb-7dfbdb57170d.png)

![screenshot of a dialog asking to confirm if you want to delete an item in iOS](https://cdn.hashnode.com/res/hashnode/image/upload/v1703246531588/5e88c1ca-1ae0-4655-be16-e6646ef5e97d.png)

![screenshot of a confirmation dialog box of deletion in Android](https://cdn.hashnode.com/res/hashnode/image/upload/v1703246535449/aa2f7469-bbab-4c5d-bf8d-25ce9ba01743.png)

![screenshot of dialog box of clearing items ](https://cdn.hashnode.com/res/hashnode/image/upload/v1703246539025/233ddf98-62c8-4c0f-89b0-344be26dfabe.png)

![screenshot of a toast notification](https://cdn.hashnode.com/res/hashnode/image/upload/v1703246543769/13c5ecba-0916-4083-ab00-e756543f7643.png)

![screenshot of an empty state.](https://cdn.hashnode.com/res/hashnode/image/upload/v1703246547869/33aae852-e656-43a6-b41b-887cedd81e47.png)

:::

---

## Conclusion

You now have a fully functional Flutter app with Hive for local data persistence. Your app can:

- Create, Read, Update, Delete items.
- Show toast messages for feedback.
- Confirm actions with dialogs for Android and iOS.
- Clean, modular architecture with controllers, models, and widgets.

You can explore Hive further in the [<VPIcon icon="fas fa-globe"/>Hive Package Documentation](https://pub.dev/packages/hive) if you want to learn more.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Store Data Locally Using Hive in Flutter",
  "desc": "In this tutorial, we’ll build a Flutter application that demonstrates how to perform CRUD (Create, Read, Update, Delete) operations using Hive for local data storage. Hive is a lightweight, fast key-value database written in pure Dart. Unlike SQLite,...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-store-data-locally-using-hive-in-flutter.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
