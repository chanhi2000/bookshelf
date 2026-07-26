---
lang: en-US
title: "Bluetooth Low Energy in Flutter: A Handbook for Devs"
description: "Article(s) > Bluetooth Low Energy in Flutter: A Handbook for Devs"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - Hardware
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - hw
  - hardware
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Bluetooth Low Energy in Flutter: A Handbook for Devs"
    - property: og:description
      content: "Bluetooth Low Energy in Flutter: A Handbook for Devs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/bluetooth-low-energy-in-flutter-a-handbook-for-devs.html
prev: /programming/dart/articles/README.md
date: 2026-08-06
isOriginal: false
author:
  - name: Nikheel Vishwas Savant
    url: https://freecodecamp.org/news/author/nsavant/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4c7f324d-73d3-4f3f-a932-7469af32f694.png
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
  "title": "Hardware > Article(s)",
  "desc": "Article(s)",
  "link": "/hw/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Bluetooth Low Energy in Flutter: A Handbook for Devs"
  desc="Most Flutter tutorials stop at network calls and REST APIs. The moment you need to talk to a physical device, a heart rate monitor, a smart bulb, a fitness tracker, an industrial sensor, or your own c"
  url="https://freecodecamp.org/news/bluetooth-low-energy-in-flutter-a-handbook-for-devs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4c7f324d-73d3-4f3f-a932-7469af32f694.png"/>

Most Flutter tutorials stop at network calls and REST APIs. The moment you need to talk to a physical device, a heart rate monitor, a smart bulb, a fitness tracker, an industrial sensor, or your own custom hardware, you leave the comfortable world of HTTP and enter Bluetooth Low Energy (BLE).

This guide teaches you how to do that properly and completely in Flutter.

Bluetooth on mobile is notoriously fiddly. Permissions differ between Android and iOS and even between Android versions. The connection lifecycle has more states than people expect, the BLE data model of services and characteristics confuses newcomers, and byte-level encoding trips up almost everyone the first time.

The `flutter_blue_plus` package hides most of the platform-specific pain while still giving you full control over scanning, connecting, and exchanging data.

This is a handbook by design. It covers the theory of how BLE actually works, complete platform configuration for Android and iOS, scanning and advertisement parsing, connecting and MTU negotiation, service discovery, reading and writing, notifications and descriptors, pairing and bonding, background operation, error handling, a production-ready service architecture with state management, testing and debugging, and performance.

Also, every code snippet is explained line by line so you can adapt it to your own hardware.

::: note Prerequisites

You should have the Flutter SDK installed (version 3.0 or later) and be comfortable with Dart, `StatefulWidget`, `Future`, and the `Stream` API, since almost everything in BLE is stream-based.

You also need a physical Android or iOS device, because BLE doesn't work on emulators or simulators as they have no Bluetooth radio.

Finally, you need a BLE peripheral to talk to. A cheap heart rate strap, a BLE development board like the Nordic nRF52 or an ESP32, or even a second phone running a BLE peripheral simulator app will work.

You'll want to install the free nRF Connect app on a spare phone as well, because it's the single most useful debugging tool for BLE work.

:::

---

## Bluetooth Classic vs Bluetooth Low Energy

Bluetooth comes in two incompatible flavors, and confusing them is the first mistake many developers make.

Bluetooth Classic (also called BR/EDR, for Basic Rate / Enhanced Data Rate) is the older, higher-bandwidth protocol used for streaming audio to headphones, file transfer, and serial-port emulation.

Bluetooth Low Energy, introduced with Bluetooth 4.0, is a completely separate protocol optimized for tiny bursts of data and extremely low power draw. A BLE coin-cell sensor can run for months or years on a single battery, which is impossible with Classic.

The two protocols don't talk to each other. A Classic-only device can't be reached with BLE APIs and vice versa, although many modern chips are dual-mode and support both.

The `flutter_blue_plus` package handles Bluetooth Low Energy only. If you need Bluetooth Classic, for example to build a serial (SPP) connection to an Arduino over the classic profile, you need a different package such as `flutter_bluetooth_serial`.

Everything in this article is about BLE, which is what the overwhelming majority of modern IoT and wearable devices use.

The practical difference for you as a developer is the data model. Classic gives you a stream, similar to a socket. BLE gives you a small structured database that you read and write field by field. That structural difference shapes the entire API, so it's worth understanding before writing any code.

---

## The BLE Data Model: GATT, Services, and Characteristics

BLE data is organized by GATT, the Generic Attribute Profile. GATT sits on top of a lower layer called ATT (the Attribute Protocol), but you rarely touch ATT directly. What matters is that a peripheral exposes a hierarchical database, and your phone reads and writes entries in it.

```plaintext
Peripheral (e.g. heart rate monitor)
└── Service: Heart Rate (UUID 0x180D)
    ├── Characteristic: Heart Rate Measurement (0x2A37)  [notify]
    │   └── Descriptor: Client Characteristic Config (0x2902)
    ├── Characteristic: Body Sensor Location (0x2A38)    [read]
    └── Characteristic: Heart Rate Control Point (0x2A39) [write]
└── Service: Battery (0x180F)
    └── Characteristic: Battery Level (0x2A19)            [read, notify]
```

The diagram above shows the GATT tree for a typical peripheral. At the top level a device exposes one or more services, each identified by a UUID and grouping related functionality, such as the Heart Rate service and the Battery service.

Inside each service are characteristics, which are the actual data endpoints you interact with. Each characteristic has a UUID and a set of properties in square brackets that declare which operations it supports.

Some characteristics also contain descriptors, which are metadata attached to a characteristic. The most important descriptor is the Client Characteristic Configuration Descriptor (CCCD, UUID 0x2902), which acts as the on/off switch for notifications.

When you write BLE code, you navigate this exact tree: discover services, find the characteristic you want, then read, write, or subscribe to it.

UUIDs come in two sizes. Standard functionality defined by the Bluetooth SIG uses short 16-bit UUIDs written as four hex digits, like `0x180D` for Heart Rate. These are shorthand for a full 128-bit UUID that follows a fixed pattern.

Custom devices that implement their own functionality use full 128-bit UUIDs, written as a long string like `6e400001-b5a3-f393-e0a9-e50e24dcca9e`, which is the Nordic UART service used by countless hobbyist projects. When you build your own hardware, you generate random 128-bit UUIDs for your services and characteristics so they don't clash with anyone else's.

---

## Roles, Advertising, and the Connection Lifecycle

BLE defines two pairs of roles that are easy to mix up. The first pair describes the connection: the **central** is the device that scans and initiates connections, which is your phone, and the **peripheral** is the device that advertises and accepts connections, which is your sensor or wearable.

The second pair describes data flow within a connection: the **GATT client** requests data (usually the central) and the **GATT server** holds the data (usually the peripheral).

In this article, your Flutter app is the central and GATT client, and the hardware is the peripheral and GATT server. This is the typical arrangement, though roles can be reversed and a device can play both.

Before any connection exists, a peripheral broadcasts advertising packets. An advertising packet is a small payload, at most 31 bytes in the legacy format, that announces the device's presence and can include its name, the service UUIDs it offers, manufacturer-specific data, and a transmit power level. Your central scans by listening for these packets. This is why scanning returns not just a device but an entire advertisement full of useful metadata you can inspect before ever connecting.

Once you decide to connect, the two devices negotiate a connection and agree on parameters like the connection interval, which is how often they exchange packets. A short interval means lower latency but higher power draw, while a long interval saves battery but adds delay.

After connecting, the central performs service discovery to learn the peripheral's GATT tree, and only then can it read, write, and subscribe. When either side goes out of range or chooses to disconnect, the link drops, all the discovered service objects become invalid, and you must reconnect and rediscover to continue.

Understanding this lifecycle (advertise, scan, connect, discover, communicate, and disconnect) is the mental model behind every function you'll write.

---

## Choosing a Flutter Bluetooth Package

Several packages exist for BLE in Flutter, and picking the right one saves grief. This article uses `flutter_blue_plus`, which is the actively maintained community successor to the original `flutter_blue` package that's now abandoned. It supports Android, iOS, and macOS, has a clean stream-based API, and covers the full central workflow including MTU negotiation, bonding, and connection priority.

The main alternative is `flutter_reactive_ble` from Philips, which is also solid and takes a more reactive, operation-based approach where you compose streams for each action. It's a reasonable choice, especially if your team already thinks in reactive terms.

Another option is `universal_ble`, which adds web and Windows/Linux support and presents a unified API. It's useful if you target desktop or browser.

For Bluetooth Classic rather than BLE, you need `flutter_bluetooth_serial` instead, since none of the BLE packages handle the classic SPP profile.

For most projects that target Android and iOS and act as a central connecting to peripherals, `flutter_blue_plus` is the pragmatic default because of its maturity, documentation, and large community. The concepts in this article transfer directly to the other packages even where the exact method names differ, since they all model the same underlying BLE stack.

---

## Setting Up the Project

Create a new Flutter project and add the packages you need. The first is `flutter_blue_plus` for BLE itself, and the second is `permission_handler` for requesting runtime permissions cleanly on Android.

```sh
flutter create ble_demo
cd ble_demo
flutter pub add flutter_blue_plus
flutter pub add permission_handler
```

These commands scaffold a fresh project and then add both dependencies to your `pubspec.yaml` and run `flutter pub get` automatically. Using `flutter pub add` instead of editing `pubspec.yaml` by hand ensures you get a compatible recent version and avoids indentation mistakes in the YAML file. After running these, open `pubspec.yaml` and confirm both packages appear under `dependencies` with reasonable version constraints.

You import the library with a single line wherever you use it, and it exposes everything through the top-level `FlutterBluePlus` class plus the `BluetoothDevice`, `BluetoothService`, and `BluetoothCharacteristic` types.

```dart
import 'dart:async';
import 'dart:io' show Platform;
import 'package:flutter_blue_plus/flutter_blue_plus.dart';
```

This import block brings in three things you'll use throughout. The `dart:async` import gives you `StreamSubscription` and `Future`, which every BLE operation relies on. The `dart:io` import provides `Platform`, which you use to branch between Android-specific and iOS-specific behavior, and the `show Platform` clause keeps the import narrow. The final line imports the plugin itself. Keeping these at the top of every BLE-related file avoids the confusing errors that appear when a type like `BluetoothDevice` isn't in scope.

---

## Configuring Android Permissions

Android is the harder platform because Bluetooth permissions changed significantly in Android 12 (API level 31).

On Android 11 and earlier, BLE scanning required location permission, because scanning for nearby devices could in theory reveal the user's location. On Android 12 and above, there are dedicated Bluetooth permissions instead, and you can opt out of the location requirement. You must declare all of them so your app works across the full range of devices your users have.

Open <VPIcon icon="fas fa-folder-open"/>`android/app/src/main/`<VPIcon icon="iconfont icon-code"/>`AndroidManifest.xml` and add the following inside the `<manifest>` tag, above the `<application>` tag:

```xml title="android/app/src/main/AndroidManifest.xml"
<uses-permission android:name="android.permission.BLUETOOTH_SCAN"
    android:usesPermissionFlags="neverForLocation" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
<uses-permission android:name="android.permission.BLUETOOTH_ADVERTISE" />

<uses-permission android:name="android.permission.BLUETOOTH"
    android:maxSdkVersion="30" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN"
    android:maxSdkVersion="30" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"
    android:maxSdkVersion="30" />

<uses-feature android:name="android.hardware.bluetooth_le"
    android:required="true" />
```

The first three permissions cover Android 12 and later. `BLUETOOTH_SCAN` allows your app to discover nearby devices, and the `neverForLocation` flag tells the system you aren't using BLE to infer the user's physical location. This lets you skip requesting location permission entirely on modern devices.

`BLUETOOTH_CONNECT` is required to connect and exchange data with a device. `BLUETOOTH_ADVERTISE` is only needed if your app acts as a peripheral and advertises, so you can omit it for a pure central app.

The next three permissions handle Android 11 and earlier: `BLUETOOTH` and `BLUETOOTH_ADMIN` were the classic permissions, and `ACCESS_FINE_LOCATION` was mandatory for scanning on those versions. The `maxSdkVersion="30"` attribute makes each of these apply only up to Android 11 so newer devices don't ask for location unnecessarily. The final `uses-feature` line declares that your app needs BLE hardware, and setting `required="true"` prevents the Play Store from offering the app to devices without it.

One subtlety: if you set `neverForLocation` but your app actually does use BLE to derive location (for example beacon-based indoor positioning), you must remove that flag and request location permission, otherwise Android strips location-bearing results from your scans. For the common case of talking to a known device, keep the flag.

You also need to set the minimum SDK version. Open <VPIcon icon="fas fa-folder-open"/>`android/app/`<VPIcon icon="iconfont icon-gradle"/>`build.gradle` and confirm `minSdkVersion` is at least 21, because the BLE APIs require it.

```groovy title="android/app/build.gradle"
android {
    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 34
    }
}
```

This block sets the floor and ceiling of Android versions your app supports. `minSdkVersion 21` corresponds to Android 5.0, which is the earliest version with usable BLE support in `flutter_blue_plus`. Setting `targetSdkVersion 34` tells the system your app is tested against modern Android behavior, which is required for Play Store submission and ensures the Android 12 permission model applies to your app rather than the legacy location-based one.

---

## Configuring iOS Permissions and Background Modes

iOS is simpler for permissions but stricter about App Store review. There are no runtime permission grants to code, but you must declare a usage description string, or the app crashes the instant it touches Bluetooth. Open <VPIcon icon="fas fa-folder-open"/>`ios/Runner/`<VPIcon icon="iconfont icon-code"/>`Info.plist` and add the following keys inside the top-level `<dict>`.

```xml title="ios/Runner/Info.plist"
<key>NSBluetoothAlwaysUsageDescription</key>
<string>This app uses Bluetooth to connect to and communicate with your devices.</string>
<key>NSBluetoothPeripheralUsageDescription</key>
<string>This app uses Bluetooth to connect to and communicate with your devices.</string>
```

Both keys provide the text iOS shows in the system permission dialog the first time your app uses Bluetooth. `NSBluetoothAlwaysUsageDescription` is the modern key used on iOS 13 and later, and `NSBluetoothPeripheralUsageDescription` covers older versions.

Write a description that clearly explains why you need Bluetooth and names the benefit to the user, because Apple rejects apps with vague or missing justifications during review. iOS presents the actual permission prompt automatically the first time you scan, so you don't call `permission_handler` on this platform.

If your app needs to keep using Bluetooth while backgrounded, for example to keep receiving heart rate notifications while the screen is off, you must also declare background modes. Add this to the same <VPIcon icon="iconfont icon-code"/>`Info.plist`:

```xml title="ios/Runner/Info.plist"
<key>UIBackgroundModes</key>
<array>
  <string>bluetooth-central</string>
</array>
```

This array enables the `bluetooth-central` background mode, which permits your app to continue scanning for and communicating with peripherals after the user switches away. Without it, iOS suspends your Bluetooth activity when the app leaves the foreground.

Only declare this if you genuinely need background operation, because Apple scrutinizes background modes during review and rejects apps that request them without a clear justification. If your app also acts as a peripheral in the background, add `bluetooth-peripheral` as a second array entry.

---

## Checking Bluetooth Adapter State

Before scanning, confirm that Bluetooth is actually supported and turned on. `flutter_blue_plus` exposes the adapter state as a stream, so you can react to the user toggling Bluetooth in system settings while your app runs.

```dart
Future<void> initBluetooth() async {
  if (await FlutterBluePlus.isSupported == false) {
    print('Bluetooth is not supported on this device');
    return;
  }

  FlutterBluePlus.adapterState.listen((BluetoothAdapterState state) {
    print('Adapter state: $state');
    if (state == BluetoothAdapterState.on) {
      // Ready to scan
    } else if (state == BluetoothAdapterState.off) {
      // Prompt the user to enable Bluetooth
    }
  });

  if (Platform.isAndroid) {
    await FlutterBluePlus.turnOn();
  }
}
```

This function first checks `FlutterBluePlus.isSupported`, which returns false on devices without Bluetooth hardware so you can fail gracefully rather than crash. It then subscribes to `FlutterBluePlus.adapterState`, a stream that emits a new `BluetoothAdapterState` every time the radio changes, so your app stays in sync even if the user disables Bluetooth mid-session.

The value `BluetoothAdapterState.on` means you are clear to scan, while `off` means you should prompt the user. On Android only, `FlutterBluePlus.turnOn()` asks the system to enable Bluetooth by showing the standard enable dialog. This call throws on iOS, where Apple provides no API to programmatically enable Bluetooth, so it's guarded behind the platform check and you must direct iOS users to Settings manually.

You can also read the current state once without subscribing, which is handy at a decision point rather than for continuous monitoring.

```dart
BluetoothAdapterState current = FlutterBluePlus.adapterStateNow;
if (current != BluetoothAdapterState.on) {
  print('Bluetooth is not ready, current state: $current');
  return;
}
```

This reads `FlutterBluePlus.adapterStateNow`, a synchronous snapshot of the adapter state at the moment you call it, and bails out if the radio isn't on. Use this style of check immediately before starting a scan or connection to avoid firing an operation that's guaranteed to fail.

Use the stream from the previous snippet for ongoing UI that needs to reflect the radio state, and use this one-shot getter for a quick gate inside a workflow.

---

## Requesting Runtime Permissions

On Android 6.0 and later, declaring permissions in the manifest isn't enough. You must also request the dangerous ones at runtime, and the exact set depends on the Android version.

The `permission_handler` package makes this straightforward and abstracts away most of the version differences.

```dart
import 'package:permission_handler/permission_handler.dart';

Future<bool> requestBlePermissions() async {
  if (!Platform.isAndroid) {
    return true;
  }

  final statuses = await [
    Permission.bluetoothScan,
    Permission.bluetoothConnect,
    Permission.location,
  ].request();

  final granted = statuses.values.every((status) => status.isGranted);

  if (!granted) {
    final permanentlyDenied = statuses.values.any(
      (status) => status.isPermanentlyDenied,
    );
    if (permanentlyDenied) {
      await openAppSettings();
    }
  }

  return granted;
}
```

This function returns `true` immediately on iOS, because the operating system handles Bluetooth consent through the `Info.plist` description without any code from you.

On Android, it requests three permissions in a single system dialog by passing them as a list to `.request()`. `bluetoothScan` and `bluetoothConnect` map to the Android 12 permissions, while `location` covers older devices that still tie scanning to location. The plugin no-ops the ones that don't apply to the running OS version. The call returns a map of each permission to its resulting `PermissionStatus`, and `.every()` confirms that all of them were granted.

If any permission is permanently denied, meaning the user checked "don't ask again", the code opens the app's settings page with `openAppSettings()` so the user can grant it manually, because at that point the system will no longer show the prompt. Call this function once before your first scan and abort if it returns false.

---

## Scanning for Devices

With permissions handled, you can search for nearby peripherals. Scanning returns a stream of scan results, each representing one advertising device along with its signal strength and advertised data.

```dart
final List<ScanResult> _scanResults = [];
StreamSubscription<List<ScanResult>>? _scanSubscription;

Future<void> startScan() async {
  _scanResults.clear();

  _scanSubscription = FlutterBluePlus.onScanResults.listen(
    (results) {
      for (ScanResult r in results) {
        print('${r.device.remoteId}: "${r.advertisementData.advName}" '
            'rssi: ${r.rssi}');
      }
      _scanResults
        ..clear()
        ..addAll(results);
    },
    onError: (e) => print('Scan error: $e'),
  );

  FlutterBluePlus.cancelWhenScanComplete(_scanSubscription!);

  await FlutterBluePlus.startScan(
    timeout: const Duration(seconds: 15),
    androidUsesFineLocation: false,
  );
}

Future<void> stopScan() async {
  await FlutterBluePlus.stopScan();
  await _scanSubscription?.cancel();
}
```

The `startScan` function first clears results from any previous run, then subscribes to `FlutterBluePlus.onScanResults`, which emits the current list of discovered devices every time a new advertisement arrives.

Inside the listener, each `ScanResult` gives you the device's `remoteId` (a stable identifier), the advertised name via `advertisementData.advName`, and `rssi` (the signal strength in dBm, where values closer to zero mean a stronger signal, so -40 is strong and -95 is weak).

The `onError` callback catches scan failures such as permissions being revoked mid-scan. `FlutterBluePlus.cancelWhenScanComplete` ties the subscription's lifetime to the scan so it cleans itself up when the timeout fires. The scan itself is started by `FlutterBluePlus.startScan`, where `timeout` stops scanning automatically after 15 seconds to save battery, and `androidUsesFineLocation: false` matches the `neverForLocation` flag you set in the manifest. The `stopScan` function stops the radio early and cancels the subscription so you don't leak a listener.

If you only care about a specific type of device, filter the scan so the operating system ignores everything else. This is more efficient and more reliable than scanning for everything and filtering in Dart, and it works far better in crowded RF environments.

```dart
await FlutterBluePlus.startScan(
  withServices: [Guid('180D')],
  withNames: ['MySensor'],
  withKeywords: ['Sensor'],
  timeout: const Duration(seconds: 15),
);
```

This call restricts the scan several ways at once. `withServices` keeps only peripherals that advertise the given service UUID, here `180D` for Heart Rate, with the `Guid` class wrapping the UUID string. `withNames` matches devices whose advertised name exactly equals one of the listed strings, and `withKeywords` matches devices whose name contains a substring.

Filtering at the platform level means your results stream only contains relevant devices, which cuts noise dramatically in places where dozens of Bluetooth devices are advertising. You can combine these filters, and a device must satisfy all of the specified ones to appear.

To know whether a scan is currently running, listen to the scanning state, which is useful for toggling a button between "Scan" and "Stop" in the UI.

```dart
FlutterBluePlus.isScanning.listen((scanning) {
  print('Scanning: $scanning');
});
```

This subscribes to `FlutterBluePlus.isScanning`, a stream of booleans that emits `true` when a scan starts and `false` when it stops, whether it stopped because of the timeout or an explicit `stopScan()` call. Binding your scan button's label and icon to this stream keeps the UI honest, since it reflects the actual radio state rather than what you last told it to do.

---

## Parsing Advertisement Data

The advertisement attached to each scan result carries more than a name and RSSI. It often includes the primary use case data before you even connect, and reading it correctly lets you identify and filter devices precisely.

```dart
void inspectAdvertisement(ScanResult r) {
  final adv = r.advertisementData;

  print('Name: ${adv.advName}');
  print('Connectable: ${adv.connectable}');
  print('Tx power: ${adv.txPowerLevel}');
  print('Service UUIDs: ${adv.serviceUuids}');

  adv.manufacturerData.forEach((companyId, bytes) {
    print('Manufacturer $companyId: $bytes');
  });

  adv.serviceData.forEach((uuid, bytes) {
    print('Service data $uuid: $bytes');
  });
}
```

This function pulls apart the `advertisementData` object. `advName` is the advertised local name, which is often empty because many peripherals omit it to save the limited 31-byte advertising budget. `connectable` tells you whether the device accepts connections at all, since beacons frequently advertise without being connectable.

`txPowerLevel` is the calibrated transmit power the device claims, which you can compare against `rssi` to roughly estimate distance. `serviceUuids` lists the services the device advertises, which is useful for identifying its type. `manufacturerData` is a map from a company identifier to raw bytes, which is how devices like Apple's iBeacon or custom hardware pack proprietary data into the advertisement. You decode those bytes per the vendor's format. `serviceData` similarly maps a service UUID to bytes, commonly used by sensors to broadcast a reading without requiring a connection at all.

Reading these fields lets you recognize and triage devices before spending the time and battery to connect.

---

## Connecting to a Device

Once you have picked a device, you connect to it. Connection can fail or drop, so always wrap it in error handling and listen to the connection state before you initiate the connection.

```dart
Future<void> connectToDevice(BluetoothDevice device) async {
  final subscription = device.connectionState.listen((state) {
    print('Connection state: $state');
    if (state == BluetoothConnectionState.disconnected) {
      print('Disconnected, reason code: ${device.disconnectReason?.code}, '
          'description: ${device.disconnectReason?.description}');
    }
  });

  device.cancelWhenDisconnected(subscription, delayed: true, next: true);

  try {
    await device.connect(
      timeout: const Duration(seconds: 15),
      autoConnect: false,
      mtu: null,
    );
    print('Connected to ${device.platformName}');
  } catch (e) {
    print('Connection failed: $e');
  }
}
```

This function first subscribes to the device's `connectionState` stream so you always know whether you're connected or disconnected, and it logs both the numeric code and human-readable description from `device.disconnectReason` when a drop happens. This is invaluable for diagnosing why a peripheral went away.

`device.cancelWhenDisconnected` ties that subscription to the connection so it cleans up appropriately, with `delayed: true` keeping it alive long enough to catch the final disconnect event.

The connection itself happens in a try/catch: `timeout` gives up after 15 seconds if the device doesn't respond, `autoConnect: false` tells the system to connect immediately rather than lazily waiting for the device to reappear, and passing `mtu: null` skips automatic MTU negotiation so you can control it yourself later. If the connection throws, the catch reports the failure instead of crashing. Set up the state listener before calling connect, otherwise you can miss the first transition.

Always stop scanning before you connect. Scanning and connecting at the same time strains the radio on many Android devices and causes intermittent connection failures. Call `stopScan()` first, then connect. You can also check whether you're already connected with `device.isConnected`, which returns a boolean synchronously, to avoid redundant connect calls.

When you're done with a device, disconnect cleanly to free the connection slot, since phones support only a limited number of simultaneous BLE connections.

```dart
Future<void> disconnectFromDevice(BluetoothDevice device) async {
  await device.disconnect();
  print('Disconnected from ${device.platformName}');
}
```

This calls `device.disconnect`, which tears down the GATT connection and releases the resources associated with it. Awaiting the call ensures the disconnect completes before you continue, which matters if you plan to immediately reconnect or connect to a different device.

Failing to disconnect properly is a common cause of the "maximum connections reached" errors that appear after your app has been running for a while, because orphaned connections pile up.

---

## Negotiating the MTU

The MTU (Maximum Transmission Unit) is the largest amount of data that fits in a single BLE packet. By default it is 23 bytes, of which 3 are protocol overhead, leaving only 20 bytes of usable payload per read or write. For anything larger you request a bigger MTU right after connecting.

```dart
Future<void> negotiateMtu(BluetoothDevice device) async {
  if (Platform.isAndroid) {
    int mtu = await device.requestMtu(512);
    print('MTU negotiated to: $mtu');
  } else {
    int mtu = await device.mtu.first;
    print('iOS negotiated MTU automatically: $mtu');
  }
}
```

On Android, `device.requestMtu(512)` asks the peripheral for a 512-byte MTU, which is the maximum the BLE spec allows, and returns the value both sides actually agreed on, since the peripheral may grant less. Larger payloads then travel in one operation instead of being split into 20-byte chunks, which improves throughput significantly.

On iOS there's no manual request because Apple negotiates the MTU automatically at connection time, so the code just reads the current value from the `device.mtu` stream with `.first`. Always compute your maximum safe payload as the negotiated MTU minus 3 bytes of ATT overhead, and never assume the peripheral honored your full request.

You can also subscribe to the MTU stream to react whenever it changes, which some stacks do partway through a connection.

```dart
device.mtu.listen((mtu) {
  print('Current MTU: $mtu, usable payload: ${mtu - 3} bytes');
});
```

This listens to `device.mtu`, a stream that emits the current MTU and re-emits whenever it changes during the connection's life. The listener computes the usable payload as `mtu - 3` to account for the fixed ATT header. Binding your chunking logic to this stream rather than to a value you cached once means your writes stay correct even if the MTU changes after your initial negotiation.

---

## Discovering Services and Characteristics

A connection alone gives you nothing. You must discover the peripheral's services to gain access to its characteristics. This step maps out the GATT tree and must be repeated after every reconnection, because the old objects become invalid.

```dart
Future<BluetoothCharacteristic?> discoverServices(
  BluetoothDevice device,
  Guid serviceUuid,
  Guid characteristicUuid,
) async {
  List<BluetoothService> services = await device.discoverServices();

  for (BluetoothService service in services) {
    print('Service: ${service.uuid}');
    for (BluetoothCharacteristic c in service.characteristics) {
      print('  Characteristic: ${c.uuid} '
          '(read: ${c.properties.read}, '
          'write: ${c.properties.write}, '
          'notify: ${c.properties.notify})');
    }
  }

  for (BluetoothService service in services) {
    if (service.uuid == serviceUuid) {
      for (BluetoothCharacteristic c in service.characteristics) {
        if (c.uuid == characteristicUuid) {
          return c;
        }
      }
    }
  }
  return null;
}
```

This function calls `device.discoverServices`, which asks the peripheral for its full GATT tree and returns the list once discovery finishes.

The first pair of loops prints every service and characteristic with its properties, which is exactly what you want during development to learn a device's layout. The second pair of loops searches for the specific service and characteristic you passed in by comparing UUIDs, returning the matching `BluetoothCharacteristic` or `null` if it is absent.

Returning the characteristic object lets the caller cache it and reuse it for subsequent reads, writes, and subscriptions rather than searching the tree every time. Run discovery once right after connecting, cache the handles you need, and rediscover after any reconnection.

---

## Understanding Characteristic Properties

Every characteristic advertises which operations it supports through its `properties` object, and attempting an unsupported operation throws. Checking properties first is the difference between a robust app and one that crashes on unexpected hardware.

```dart
void printProperties(BluetoothCharacteristic c) {
  final p = c.properties;
  print('read: ${p.read}');
  print('write: ${p.write}');
  print('writeWithoutResponse: ${p.writeWithoutResponse}');
  print('notify: ${p.notify}');
  print('indicate: ${p.indicate}');
  print('broadcast: ${p.broadcast}');
  print('authenticatedSignedWrites: ${p.authenticatedSignedWrites}');
}
```

This function dumps the full set of property flags. `read` means you can pull the value on demand. `write` is a write that the peripheral acknowledges, and `writeWithoutResponse` is a faster fire-and-forget write with no acknowledgment.

`notify` and `indicate` both mean the peripheral pushes updates to you, with the difference that indicate requires the central to acknowledge each update while notify does not, making indicate more reliable but slower.

`broadcast` means the value can be included in advertising packets. `authenticatedSignedWrites` means the characteristic accepts signed writes that require bonding.

Reading these flags before acting lets you pick the correct method and skip operations the device doesn't support, which is essential when your app talks to hardware from multiple vendors that implement the same logical feature with different property sets.

---

## Reading Data from a Characteristic

Reading pulls the current value of a characteristic on demand. The value always comes back as a list of bytes, and it's your job to interpret those bytes according to the peripheral's specification.

```dart
Future<List<int>> readCharacteristic(BluetoothCharacteristic c) async {
  if (!c.properties.read) {
    print('This characteristic is not readable');
    return [];
  }

  List<int> value = await c.read();
  print('Raw bytes: $value');
  return value;
}
```

The function first guards against reading a characteristic that doesn't support it by checking `c.properties.read`, returning an empty list if the operation isn't allowed. It then calls `c.read`, which returns a `List<int>` where each element is a byte from 0 to 255. Because BLE has no concept of data types at the transport level, you receive raw bytes and must decode them yourself according to the device's data sheet. We'll cover this topic in detail in the encoding section below. Returning the raw bytes lets the caller decide how to interpret them. Always confirm the read property first, because reading an unreadable characteristic throws a `FlutterBluePlusException`.

---

## Writing Data to a Characteristic

Writing sends bytes to the peripheral, which is how you send commands, change settings, or push data to custom hardware.

There are two write modes, and choosing the right one matters for reliability and speed.

```dart
Future<void> writeCharacteristic(
  BluetoothCharacteristic c,
  List<int> data,
) async {
  if (c.properties.write) {
    await c.write(data, withoutResponse: false);
    print('Write with response complete');
  } else if (c.properties.writeWithoutResponse) {
    await c.write(data, withoutResponse: true);
    print('Write without response complete');
  } else {
    print('This characteristic is not writable');
  }
}
```

This function inspects the properties to decide how to write. If the characteristic supports `write`, it uses a write with response by passing `withoutResponse: false`, which means the peripheral acknowledges receipt and the `await` completes only after confirmation. This is reliable but slower because it waits for a round trip.

If the characteristic instead supports `writeWithoutResponse`, it sends the data fire-and-forget with `withoutResponse: true`, which is faster and ideal for high-throughput streaming but gives no delivery guarantee.

If neither property is present, the characteristic isn't writable and the function reports so. The `data` argument is a `List<int>` of bytes, so to send a two-byte command you might pass `[0x01, 0xFF]`.

When you need to send more data than the MTU allows, split it into chunks sized to the negotiated MTU minus overhead and write them in sequence.

```dart
Future<void> writeLongData(
  BluetoothCharacteristic c,
  List<int> data,
  int mtu,
) async {
  final chunkSize = mtu - 3;
  for (var i = 0; i < data.length; i += chunkSize) {
    final end = (i + chunkSize < data.length) ? i + chunkSize : data.length;
    final chunk = data.sublist(i, end);
    await c.write(chunk, withoutResponse: false);
  }
  print('Sent ${data.length} bytes in chunks of $chunkSize');
}
```

This function breaks a large payload into MTU-sized pieces. It computes `chunkSize` as the negotiated MTU minus 3 bytes of ATT overhead, then walks the data in steps of that size.

For each step it calculates the end index, guarding against running past the end of the list, slices out the chunk with `sublist`, and writes it. Using write-with-response here (`withoutResponse: false`) serializes the chunks safely, because each write waits for acknowledgment before the next begins, which prevents overrunning the peripheral's buffer.

If your peripheral defines its own reassembly protocol, follow that instead, since some devices expect a length header or sequence numbers in each chunk.

---

## Subscribing to Notifications and Indications

Notifications are the reason BLE is efficient. Instead of polling a characteristic repeatedly, you subscribe once and the peripheral pushes new values to you as they change. This is how continuous data like heart rate, temperature, or accelerometer readings arrives with minimal power cost.

```dart
StreamSubscription<List<int>>? _valueSubscription;

Future<void> subscribe(BluetoothCharacteristic c) async {
  if (!c.properties.notify && !c.properties.indicate) {
    print('This characteristic does not support notifications');
    return;
  }

  _valueSubscription = c.onValueReceived.listen((value) {
    print('Update received: $value');
  });

  c.device.cancelWhenDisconnected(_valueSubscription!);

  await c.setNotifyValue(true);
}

Future<void> unsubscribe(BluetoothCharacteristic c) async {
  await c.setNotifyValue(false);
  await _valueSubscription?.cancel();
}
```

The `subscribe` function first confirms that the characteristic supports either `notify` or `indicate`, the two flavors of server-initiated updates. It then listens to `c.onValueReceived`, a stream that emits a new byte list every time the peripheral sends an update, and ties that subscription to the connection with `cancelWhenDisconnected` so it stops cleanly on disconnect. Finally it calls `setNotifyValue(true)`, which under the hood writes to the CCCD descriptor (UUID 0x2902) to tell the peripheral to start pushing data. The plugin automatically picks indicate over notify when only indicate is supported.

The order matters: set up the listener before enabling notifications so you don't miss the first update. The `unsubscribe` function reverses this by calling `setNotifyValue(false)` to tell the peripheral to stop and cancelling the Dart subscription to free resources. Always unsubscribe when you no longer need the data, because leaving notifications on drains both devices' batteries.

---

## Working with Descriptors

Descriptors are metadata attached to a characteristic. The plugin handles the notification descriptor for you when you call `setNotifyValue`, but some devices expose custom descriptors you need to read or write directly, such as a user-readable description or a valid-range definition.

```dart
Future<void> exploreDescriptors(BluetoothCharacteristic c) async {
  for (BluetoothDescriptor d in c.descriptors) {
    print('Descriptor: ${d.uuid}');
    List<int> value = await d.read();
    print('  Value: $value');
  }
}

Future<void> writeDescriptor(BluetoothDescriptor d, List<int> data) async {
  await d.write(data);
  print('Descriptor written');
}
```

The `exploreDescriptors` function iterates over `c.descriptors`, the list of descriptors discovered alongside the characteristic, and reads each one's value with `d.read`, which returns bytes just like a characteristic read.

The `writeDescriptor` function sends bytes to a descriptor with `d.write`. Most apps never touch descriptors directly because `setNotifyValue` manages the important one, but if your hardware documents a custom descriptor, for example the Characteristic User Description (0x2901) that holds a human-readable label, this is how you access it.

Treat descriptor values as raw bytes and decode them per the specification, exactly as you would a characteristic.

---

## Encoding and Decoding Byte Data

BLE transmits raw bytes with no type information, so encoding and decoding is where most real bugs hide. You must know the byte layout of each characteristic from its specification, including the size of each field, whether integers are signed, and the byte order (endianness).

The most common order in BLE is little-endian, meaning the least significant byte comes first, but always verify against the device documentation.

```dart
import 'dart:typed_data';

int readUint8(List<int> bytes, int offset) => bytes[offset];

int readUint16LE(List<int> bytes, int offset) {
  return bytes[offset] | (bytes[offset + 1] << 8);
}

int readUint32LE(List<int> bytes, int offset) {
  return bytes[offset] |
      (bytes[offset + 1] << 8) |
      (bytes[offset + 2] << 16) |
      (bytes[offset + 3] << 24);
}

int readInt16LE(List<int> bytes, int offset) {
  final data = ByteData.sublistView(Uint8List.fromList(bytes));
  return data.getInt16(offset, Endian.little);
}

double readFloat32LE(List<int> bytes, int offset) {
  final data = ByteData.sublistView(Uint8List.fromList(bytes));
  return data.getFloat32(offset, Endian.little);
}
```

These helpers cover the field types you meet most often. `readUint8` simply returns a single byte as an unsigned integer. `readUint16LE` combines two bytes into a 16-bit unsigned value by placing the low byte first and shifting the high byte left by 8 bits, joined with a bitwise OR. `readUint32LE` extends the same idea to four bytes with shifts of 8, 16, and 24. For signed values and floats, manual bit twiddling is error-prone, so `readInt16LE` and `readFloat32LE` wrap the bytes in a `ByteData` view and use its `getInt16` and `getFloat32` methods with `Endian.little`, which correctly handle sign extension and IEEE 754 float decoding. Using `ByteData` is the recommended approach for anything beyond simple unsigned integers, because it is both correct and readable.

Encoding data to send follows the reverse pattern, and `ByteData` is again the cleanest tool.

```dart
List<int> encodeCommand(int commandId, int value) {
  final data = ByteData(5);
  data.setUint8(0, commandId);
  data.setUint32(1, value, Endian.little);
  return data.buffer.asUint8List();
}
```

This function builds a five-byte command packet. It allocates a `ByteData` buffer of five bytes, writes the command identifier as a single byte at offset 0 with `setUint8`, then writes a 32-bit value in little-endian order starting at offset 1 with `setUint32`. Finally it converts the buffer to a `Uint8List` with `buffer.asUint8List()`, which is the `List<int>` type that `characteristic.write` expects.

Building packets with `ByteData` keeps offsets explicit and endianness correct, which prevents the subtle off-by-one and byte-swap bugs that plague hand-assembled byte lists.

To decode a real-world example, here's how you parse a heart rate measurement, which uses a flags byte to signal its own format.

```dart
int parseHeartRate(List<int> bytes) {
  final flags = bytes[0];
  final is16Bit = (flags & 0x01) != 0;
  if (is16Bit) {
    return readUint16LE(bytes, 1);
  } else {
    return readUint8(bytes, 1);
  }
}
```

This function implements the standard Heart Rate Measurement format. The first byte is a flags field, and its lowest bit indicates whether the heart rate value that follows is 8-bit or 16-bit, which the code extracts with a bitwise AND against `0x01`. If the bit is set, the value is a two-byte little-endian integer read from offset 1. Otherwise it's a single byte at offset 1. This flags-then-payload pattern is extremely common in standardized BLE characteristics, so recognizing it saves time. It also shows why you can't decode BLE data without the specification: the same characteristic changes its own layout depending on a flag.

---

## Pairing, Bonding, and Encryption

Some characteristics require an encrypted connection, and accessing them triggers pairing. Pairing is the process where the two devices exchange keys, and bonding is when they save those keys so future connections are encrypted automatically without pairing again.

Many secured devices work this way, and understanding the flow prevents confusing "insufficient authentication" errors.

```dart
Future<void> bondDevice(BluetoothDevice device) async {
  if (Platform.isAndroid) {
    print('Current bond state: ${await device.bondState.first}');
    await device.createBond();
    print('Bond created');
  }
}

Future<void> removeBondIfNeeded(BluetoothDevice device) async {
  if (Platform.isAndroid) {
    await device.removeBond();
    print('Bond removed');
  }
}
```

On Android, `device.createBond()` explicitly initiates pairing and bonding, which shows the system pairing dialog and, on success, stores the keys so the device is remembered. Reading `device.bondState.first` tells you the current state (none, bonding, or bonded) before you act. `device.removeBond()` deletes a stored bond, which is useful during development when a stale bond causes connection problems, or when a user wants to forget a device.

These APIs are Android-only in the plugin because iOS handles bonding transparently: on iOS, pairing is triggered automatically the first time you access an encrypted characteristic, and the system manages the keys with no code from you.

In practice, the cleanest cross-platform approach is often to let bonding happen implicitly by simply reading or writing a secured characteristic and letting each OS present its own pairing prompt, reserving `createBond` for cases where you must bond up front.

A subtle but important point: on Android, bonding sometimes needs to happen before service discovery for encrypted services to appear, while on other devices it happens on demand. If secured characteristics are missing from your discovery results, try bonding first and rediscovering.

Because bonding behavior varies so much across manufacturers, test it specifically on your target hardware rather than assuming one flow works everywhere.

---

## Reading Signal Strength and Setting Connection Priority

After connecting, you can still read the live signal strength and tune the connection's power profile. These help with proximity features and with balancing throughput against battery life.

```dart
Future<void> readLiveRssi(BluetoothDevice device) async {
  int rssi = await device.readRssi();
  print('Live RSSI: $rssi dBm');
}

Future<void> setHighThroughput(BluetoothDevice device) async {
  if (Platform.isAndroid) {
    await device.requestConnectionPriority(
      connectionPriorityRequest: ConnectionPriority.high,
    );
    print('Requested high connection priority');
  }
}
```

The `readLiveRssi` function calls `device.readRssi`, which returns the current signal strength of the active connection in dBm, distinct from the RSSI in a scan result because it reflects the live link rather than an advertisement. Polling this lets you build proximity features like "hold your phone closer".

The `setHighThroughput` function calls `device.requestConnectionPriority` with `ConnectionPriority.high`, which asks Android to shorten the connection interval so packets exchange more frequently, raising throughput at the cost of battery. The other options are `balanced` for normal use and `lowPower` for infrequent updates that maximize battery life.

This tuning is Android-only, since iOS manages the connection interval itself based on the peripheral's advertised preferences. Use high priority temporarily during a large transfer, then drop back to balanced to avoid draining both devices.

---

## Handling Disconnection and Reconnection

Bluetooth connections are inherently unstable. Devices go out of range, batteries die, and radios get interrupted. A production app must handle disconnection gracefully and reconnect intelligently rather than assuming the link stays alive.

```dart
int _retryCount = 0;
const int _maxRetries = 5;

void setupAutoReconnect(BluetoothDevice device) {
  device.connectionState.listen((state) async {
    if (state == BluetoothConnectionState.connected) {
      _retryCount = 0;
      await device.discoverServices();
    } else if (state == BluetoothConnectionState.disconnected) {
      print('Disconnected: ${device.disconnectReason?.description}');
      await _attemptReconnect(device);
    }
  });
}

Future<void> _attemptReconnect(BluetoothDevice device) async {
  while (_retryCount < _maxRetries && !device.isConnected) {
    _retryCount++;
    final backoff = Duration(seconds: 1 << _retryCount);
    print('Reconnect attempt $_retryCount in ${backoff.inSeconds}s');
    await Future.delayed(backoff);
    try {
      await device.connect(timeout: const Duration(seconds: 15));
      print('Reconnected');
      return;
    } catch (e) {
      print('Reconnect failed: $e');
    }
  }
  if (!device.isConnected) {
    print('Giving up after $_maxRetries attempts');
  }
}
```

The `setupAutoReconnect` function subscribes to the connection state and reacts to both transitions. On `connected`, it resets the retry counter and rediscovers services, which is mandatory because the previous service objects become invalid after any disconnect. On `disconnected`, it logs the reason and calls the reconnect routine.

The `_attemptReconnect` function implements exponential backoff: it retries up to `_maxRetries` times, and each attempt waits longer than the last, computed as `1 << _retryCount` seconds, which yields 2, 4, 8, 16, and 32 seconds. Backoff matters because hammering a device that just disappeared wastes battery and rarely succeeds, whereas spacing out attempts gives the device time to come back into range.

Each attempt is wrapped in a try/catch so a failure schedules the next retry instead of throwing, and the loop exits once the device reconnects or the retry budget is exhausted.

On Android you can alternatively pass `autoConnect: true` to `connect`, which offloads reconnection to the OS and lets the system reconnect in the background whenever the device reappears, at the cost of a slower initial connection.

---

## Running Bluetooth in the Background

Keeping BLE alive when your app is backgrounded requires platform-specific work. iOS handles it through the background mode you declared earlier, while Android needs a foreground service so the OS doesn't kill your Bluetooth activity.

On iOS, once you've added the `bluetooth-central` background mode to `Info.plist`, the system automatically keeps your connections alive and delivers notifications to your app even when it's suspended, waking it briefly to process each update.

There's nothing more to write on the Dart side, though you should be aware that iOS throttles background scanning heavily: background scans can't use certain filters, run at a slower duty cycle, and require you to specify service UUIDs, so a filterless background scan finds nothing on iOS.

On Android, you must run a foreground service with a persistent notification so the system treats your Bluetooth work as user-visible and doesn't suspend it under Doze mode. You can do this with a package like `flutter_foreground_task`, configured with the connected-device service type.

```dart
import 'package:flutter_foreground_task/flutter_foreground_task.dart';

Future<void> startBleForegroundService() async {
  FlutterForegroundTask.init(
    androidNotificationOptions: AndroidNotificationOptions(
      channelId: 'ble_service',
      channelName: 'BLE Connection',
      channelDescription: 'Maintains the Bluetooth connection',
    ),
    iosNotificationOptions: const IOSNotificationOptions(),
    foregroundTaskOptions: ForegroundTaskOptions(
      eventAction: ForegroundTaskEventAction.repeat(5000),
      autoRunOnBoot: false,
      allowWakeLock: true,
    ),
  );

  await FlutterForegroundTask.startService(
    notificationTitle: 'BLE Active',
    notificationText: 'Connected to your device',
  );
}
```

This function initializes and starts a foreground service. The `androidNotificationOptions` define the persistent notification channel Android requires, including an ID, a visible name, and a description that appear in the system notification settings.

The `foregroundTaskOptions` control the service behavior: `eventAction.repeat(5000)` schedules a periodic callback every 5 seconds so you can perform maintenance work, `autoRunOnBoot: false` keeps the service from starting itself after a reboot, and `allowWakeLock: true` prevents the CPU from sleeping so your BLE callbacks fire reliably.

Calling `startService` shows the notification and promotes your app to foreground priority, which is what keeps the connection alive. You must also declare `FOREGROUND_SERVICE` and `FOREGROUND_SERVICE_CONNECTED_DEVICE` permissions in the manifest and set the service type to `connectedDevice`, because on Android 14 and above the OS enforces that the service type matches the actual work.

Stop the service with `FlutterForegroundTask.stopService()` when the connection is no longer needed, since a lingering notification annoys users.

---

## Error Handling

BLE operations fail in many ways, and the plugin surfaces failures as a `FlutterBluePlusException` with a code you can inspect. Catching and interpreting these turns cryptic crashes into recoverable states.

```dart
Future<List<int>> safeRead(BluetoothCharacteristic c) async {
  try {
    return await c.read();
  } on FlutterBluePlusException catch (e) {
    print('BLE error: function=${e.function}, code=${e.code}, '
        'description=${e.description}');
    if (e.code == 6) {
      print('Device is disconnected');
    }
    return [];
  } on PlatformException catch (e) {
    print('Platform error: ${e.message}');
    return [];
  } catch (e) {
    print('Unexpected error: $e');
    return [];
  }
}
```

This function wraps a characteristic read in layered error handling. The first `catch` handles `FlutterBluePlusException`, the plugin's own exception type, which exposes `function` (the operation that failed), `code` (a numeric error code from the underlying platform), and `description` (a readable message). Checking specific codes, such as code 6 indicating the device disconnected, lets you branch to appropriate recovery.

The second `catch` handles `PlatformException`, which can arise from the platform channel itself, and the final generic `catch` is a safety net for anything unforeseen. Returning an empty list from every branch keeps the caller simple, though in a real app you might rethrow a typed error or update UI state instead.

The core lesson is that every BLE call can throw, so wrap reads, writes, connects, and subscribes in try/catch rather than letting an exception tear down your widget tree.

---

## A Production BLE Service Architecture

Scattering BLE calls across widgets becomes unmaintainable quickly. A better structure isolates all Bluetooth logic in a single service class that exposes streams of state, which your UI and state management layer consume. This keeps widgets ignorant of BLE details and makes the logic testable.

```dart :collapsed-lines
enum BleConnectionStatus { disconnected, scanning, connecting, connected }

class BleService {
  BluetoothDevice? _device;
  BluetoothCharacteristic? _dataCharacteristic;

  final _statusController =
      StreamController<BleConnectionStatus>.broadcast();
  final _dataController = StreamController<List<int>>.broadcast();

  Stream<BleConnectionStatus> get status => _statusController.stream;
  Stream<List<int>> get data => _dataController.stream;

  final Guid serviceUuid = Guid('180D');
  final Guid characteristicUuid = Guid('2A37');

  Future<void> scanAndConnect() async {
    _statusController.add(BleConnectionStatus.scanning);

    await FlutterBluePlus.startScan(
      withServices: [serviceUuid],
      timeout: const Duration(seconds: 15),
    );

    final results = await FlutterBluePlus.onScanResults.first;
    if (results.isEmpty) {
      _statusController.add(BleConnectionStatus.disconnected);
      return;
    }

    await FlutterBluePlus.stopScan();
    await _connect(results.first.device);
  }

  Future<void> _connect(BluetoothDevice device) async {
    _device = device;
    _statusController.add(BleConnectionStatus.connecting);

    device.connectionState.listen((state) {
      if (state == BluetoothConnectionState.connected) {
        _statusController.add(BleConnectionStatus.connected);
      } else if (state == BluetoothConnectionState.disconnected) {
        _statusController.add(BleConnectionStatus.disconnected);
      }
    });

    await device.connect(timeout: const Duration(seconds: 15));
    await _setupCharacteristic();
  }

  Future<void> _setupCharacteristic() async {
    final services = await _device!.discoverServices();
    for (final service in services) {
      if (service.uuid == serviceUuid) {
        for (final c in service.characteristics) {
          if (c.uuid == characteristicUuid) {
            _dataCharacteristic = c;
            c.onValueReceived.listen(_dataController.add);
            await c.setNotifyValue(true);
          }
        }
      }
    }
  }

  Future<void> send(List<int> bytes) async {
    await _dataCharacteristic?.write(bytes);
  }

  Future<void> dispose() async {
    await _device?.disconnect();
    await _statusController.close();
    await _dataController.close();
  }
}
```

This service encapsulates the entire BLE workflow behind a small interface. It defines a `BleConnectionStatus` enum for a clean, UI-friendly view of the connection, and exposes two broadcast streams: `status` for lifecycle changes and `data` for incoming characteristic values, with broadcast controllers so multiple listeners can subscribe.

The `scanAndConnect` method drives the happy path: it publishes a scanning status, starts a filtered scan, waits for the first batch of results, stops scanning, and connects to the first match, publishing a disconnected status if nothing was found.

The private `_connect` method wires up a connection-state listener that maps BLE states onto the enum, then connects and sets up the characteristic. The `_setupCharacteristic` method discovers services, locates the target characteristic, forwards its `onValueReceived` stream into the service's data controller, and enables notifications. The `send` method writes bytes to the cached characteristic, and `dispose` disconnects and closes the controllers so nothing leaks.

By funneling everything through streams of a simple enum and byte lists, the UI never touches a `BluetoothDevice` directly, which makes the widgets trivial and the whole thing far easier to reason about and swap out.

---

## Building the UI

With the service in place, the UI becomes a thin layer that reacts to streams. Here's a scanner and status screen that consumes the service.

```dart :collapsed-lines
import 'package:flutter/material.dart';

class BleHomePage extends StatefulWidget {
  final BleService service;
  const BleHomePage({super.key, required this.service});

  @override
  State<BleHomePage> createState() => _BleHomePageState();
}

class _BleHomePageState extends State<BleHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('BLE Demo')),
      body: Column(
        children: [
          StreamBuilder<BleConnectionStatus>(
            stream: widget.service.status,
            initialData: BleConnectionStatus.disconnected,
            builder: (context, snapshot) {
              return ListTile(
                leading: const Icon(Icons.bluetooth),
                title: Text('Status: ${snapshot.data?.name}'),
              );
            },
          ),
          Expanded(
            child: StreamBuilder<List<int>>(
              stream: widget.service.data,
              builder: (context, snapshot) {
                if (!snapshot.hasData) {
                  return const Center(child: Text('No data yet'));
                }
                final hr = snapshot.data!.length > 1 ? snapshot.data![1] : 0;
                return Center(
                  child: Text('$hr bpm',
                      style: const TextStyle(fontSize: 48)),
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: widget.service.scanAndConnect,
        child: const Icon(Icons.search),
      ),
    );
  }
}
```

This widget takes a `BleService` and binds its UI entirely to the service's streams. The first `StreamBuilder` listens to the `status` stream and renders the current connection state as a list tile, with `initialData` so the tile shows something before the first event arrives.

The second `StreamBuilder`, wrapped in `Expanded`, listens to the `data` stream and displays the incoming value; it interprets byte index 1 of the heart rate payload as the reading and shows it in large text, falling back to a placeholder when no data has arrived yet.

The floating action button simply calls `service.scanAndConnect`, so the entire interactive surface is one method call. Because the widget holds no BLE objects and no connection logic, it's easy to test with a fake service that pushes canned values into the same streams, and swapping the underlying BLE package wouldn't touch this file at all.

For a larger app, wrap the service in a Provider, Riverpod provider, or Bloc so it is injected rather than passed manually.

---

## Testing and Debugging

BLE is hard to test because it depends on physical hardware and radio conditions, but a few practices make it manageable.

The most valuable tool is the nRF Connect app from Nordic Semiconductor, available for free on both Android and iOS. It lets you scan, connect, and browse the full GATT tree of any peripheral, read and write characteristics by hand, and log every packet.

Before writing a single line of Dart against a new device, connect to it with nRF Connect and note the exact service and characteristic UUIDs, their properties, and the byte format of each value. This removes guesswork and tells you whether a problem is in your code or the hardware.

For unit testing your own logic, isolate the pure functions. The byte encoding and decoding helpers from earlier are ordinary Dart with no plugin dependency, so you can test them directly without any device.

```dart
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('readUint16LE decodes little-endian correctly', () {
    expect(readUint16LE([0x34, 0x12], 0), equals(0x1234));
  });

  test('parseHeartRate handles 8-bit format', () {
    expect(parseHeartRate([0x00, 72]), equals(72));
  });

  test('parseHeartRate handles 16-bit format', () {
    expect(parseHeartRate([0x01, 0x2C, 0x01]), equals(300));
  });
}
```

These tests exercise the decoding logic without any Bluetooth hardware. The first confirms that `readUint16LE` correctly assembles the bytes `0x34, 0x12` into `0x1234`, verifying the little-endian byte order. The second and third test `parseHeartRate` with both formats its flags byte selects: an 8-bit value of 72 and a 16-bit value of 300 encoded as `0x2C, 0x01`.

Because you designed the service to keep BLE side effects separate from data interpretation, all the tricky parsing logic is covered by fast, deterministic tests that run in CI.

For the BLE calls themselves, the practical approach is manual testing on real hardware combined with an abstraction like the `BleService` interface, which you can replace with a fake implementation in widget tests that pushes scripted values into the same streams the UI consumes.

When debugging live connections, enable the plugin's verbose logging to see every operation and its result.

```dart
FlutterBluePlus.setLogLevel(LogLevel.verbose, color: true);
```

This sets the plugin's log level to `verbose`, which prints every scan result, connection event, read, write, and notification to the console, with `color: true` making the output easier to scan visually.

Turning this on while chasing a connection or data bug shows exactly where the sequence breaks, for example whether a write was even attempted or whether service discovery returned the characteristic you expected. Set it back to `LogLevel.none` or `LogLevel.error` before shipping, since verbose logging is noisy and can leak details about the connected device.

---

## Performance and Battery Optimization

BLE is designed for low power, but careless code undoes that. The single biggest drain is scanning, so never scan continuously. Always pass a `timeout` to `startScan`, filter by service UUID so the radio wakes your app less often, and stop scanning the moment you have found your device. Leaving a scan running in the background is the fastest way to earn one-star reviews about battery life.

The connection interval is the next lever. A short interval gives snappy, high-throughput communication but keeps both radios busy, while a long interval sips power at the cost of latency. Use `requestConnectionPriority(ConnectionPriority.high)` only during bursts like firmware updates or large transfers, and drop back to `balanced` or `lowPower` for idle monitoring. Match the interval to the actual data rate your app needs rather than always demanding high throughput.

Batch your operations. Every read, write, and notification costs a radio wakeup, so combining several small values into one larger characteristic, or reading a block once instead of many fields separately, saves power and time. Where the peripheral supports it, prefer notifications over polling, because a notification only transmits when data actually changes whereas polling burns energy asking "anything new?" over and over.

Finally, disconnect when you are done rather than holding an idle connection open, since maintaining a link consumes power even when no data flows, and phones cap the number of concurrent connections. Releasing one frees a slot for the next.

---

## Common Pitfalls

The single most common mistake is testing on an emulator. Neither the Android emulator nor the iOS simulator has a Bluetooth radio, so nothing will ever appear in your scan. Always test on physical hardware, and ideally test on both an old and a new Android device to catch the permission differences between Android 11 and Android 12, since a bug that only appears on one generation is easy to miss otherwise.

The second frequent issue is forgetting that scan results often have empty names. Many peripherals don't include their name in the advertising packet to save the limited 31-byte budget, so relying on `advName` for identification fails. Filter by service UUID or match on the stable `remoteId` instead, and treat the name as a nice-to-have for display only.

A third trap is ignoring the connection lifecycle. Developers connect once, run their reads, and assume the link stays up. It will not. Always subscribe to `connectionState`, handle disconnects, and rediscover services after every reconnection because the old service and characteristic objects become stale and their reads silently fail or throw.

Related to this, remember to cancel your stream subscriptions when they're no longer needed, otherwise you leak listeners every time a widget rebuilds, which eventually causes duplicate handling of every notification.

A fourth pitfall is the MTU. If your writes silently truncate at 20 bytes, you forgot to negotiate a larger MTU or you exceeded the negotiated size. Keep payloads within the negotiated MTU minus 3 bytes of overhead, and remember MTU negotiation is Android-only in the API since iOS handles it automatically.

A fifth is byte-order confusion: assuming big-endian when the device uses little-endian, or reading a signed value as unsigned, produces plausible but wrong numbers. This is why you should always verify the format against the specification and cover your parsers with unit tests.

Finally, don't scan and connect simultaneously on Android, because it causes intermittent connection failures that are maddening to reproduce. Stop the scan first, then connect.

---

## Summary

Bluetooth Low Energy in Flutter comes down to a predictable sequence that mirrors how BLE itself works: configure permissions for each platform, confirm the adapter is on, scan for peripherals and inspect their advertisements, connect to the one you want, negotiate an MTU if you need large payloads, discover services and characteristics, then read, write, or subscribe as the characteristic properties allow.

The `flutter_blue_plus` package models each of these steps directly through streams. Once you internalize the GATT hierarchy of services, characteristics, and descriptors, the API stops feeling mysterious and starts feeling like a thin wrapper over a well-defined protocol.

The parts that trip people up are almost never the happy path. They're the platform permission differences between Android versions, the empty device names, the unstable connections that require reconnection with backoff, the byte-level encoding that demands the device specification, and the MTU limits that silently truncate data. Handle those deliberately, isolate all of it behind a service class that exposes clean streams, and cover your parsing logic with unit tests, and your BLE app will feel solid rather than flaky.

From here, the natural next steps depend on your goal. If you're building against standard devices like heart rate monitors, thermometers, or glucose meters, look up the official Bluetooth SIG GATT specifications, because they define the exact UUIDs and byte layouts you need.

If you're building custom hardware, generate your own 128-bit UUIDs and document the byte format of every characteristic so your firmware and app agree.

For robustness, add proper state management with Provider or Riverpod, implement background operation only if you truly need it, and lean on nRF Connect to verify the hardware before blaming your code.

With the foundation in this article, you can talk to almost any BLE peripheral from a Flutter app and ship something reliable.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Bluetooth Low Energy in Flutter: A Handbook for Devs",
  "desc": "Most Flutter tutorials stop at network calls and REST APIs. The moment you need to talk to a physical device, a heart rate monitor, a smart bulb, a fitness tracker, an industrial sensor, or your own c",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/bluetooth-low-energy-in-flutter-a-handbook-for-devs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
