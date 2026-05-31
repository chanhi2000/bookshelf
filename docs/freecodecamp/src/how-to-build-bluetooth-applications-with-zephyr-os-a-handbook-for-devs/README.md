---
lang: en-US
title: "How to Build Bluetooth Applications with Zephyr OS: A Handbook for Devs"
description: "Article(s) > How to Build Bluetooth Applications with Zephyr OS: A Handbook for Devs"
icon: iconfont icon-c
category:
  - Python
  - C
  - Hardware
  - Zephyr
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - c
  - hw
  - hardware
  - zephyr
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Bluetooth Applications with Zephyr OS: A Handbook for Devs"
    - property: og:description
      content: "How to Build Bluetooth Applications with Zephyr OS: A Handbook for Devs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-bluetooth-applications-with-zephyr-os-a-handbook-for-devs/
prev: /programming/c/articles/README.md
date: 2026-06-02
isOriginal: false
author:
  - name: Nikheel Vishwas Savant
    url: https://freecodecamp.org/news/author/nsavant/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/2915a74f-5ad2-4e92-b1e6-6516ce9f0ca0.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "C > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/c/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Zephyr > Article(s)",
  "desc": "Article(s)",
  "link": "/hw/zephyr/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Bluetooth Applications with Zephyr OS: A Handbook for Devs"
  desc="Your phone just connected to wireless earbuds, your smartwatch synced health data to an app, and a sensor somewhere in your building reported its temperature to a gateway. All of those interactions ha"
  url="https://freecodecamp.org/news/how-to-build-bluetooth-applications-with-zephyr-os-a-handbook-for-devs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/2915a74f-5ad2-4e92-b1e6-6516ce9f0ca0.png"/>

Your phone just connected to wireless earbuds, your smartwatch synced health data to an app, and a sensor somewhere in your building reported its temperature to a gateway. All of those interactions happened over Bluetooth Low Energy (BLE). And increasingly, the firmware behind those devices is built on Zephyr OS.

This handbook teaches you how to build Bluetooth applications on Zephyr from the ground up. You'll start with the fundamentals of BLE (what GAP, GATT, services, and characteristics actually mean), then move into writing real Zephyr firmware: advertising a device, creating custom services, handling connections, reading sensor data over BLE, and building a complete BLE peripheral that a phone can talk to.

Every concept comes with working code, and every code block comes with an explanation of what it does and why it matters.

This is a long, detailed guide. Bluetooth has a lot of moving parts, and most tutorials gloss over the pieces that trip people up in real projects.

This one does not. Work through it sequentially, build the code as you go, and by the end you'll have the knowledge to build production BLE devices on Zephyr.

::: note Prerequisites

To follow along with this tutorial, you should be comfortable reading and writing C code. Pointers, structs, function pointers, and callbacks should not be foreign concepts. You need a command-line terminal and basic familiarity with building C projects. Prior Bluetooth experience isn't required. This article explains BLE concepts from scratch.

For hardware, a Nordic Semiconductor nRF52840 DK is the ideal board for following along. Nordic's chips have the best-supported Bluetooth stack in Zephyr, and the nRF52840 DK is affordable (around $40), widely available, and includes an onboard debugger.

If you have a different Zephyr-supported board with Bluetooth (nRF52832 DK, nRF5340 DK, or any board with a BLE-capable radio), that works too.

For testing the BLE side, you'll need a phone with a BLE scanner app (nRF Connect for Mobile is excellent and free on both iOS and Android).

You'll also need a computer running Linux (Ubuntu 22.04 or newer), macOS, or Windows with WSL2.

:::

---

## What Is Zephyr OS (And Why Use It for Bluetooth)?

Zephyr OS is a small, open-source, real-time operating system built for resource-constrained embedded devices. It's hosted by the Linux Foundation, licensed under Apache 2.0, and runs on microcontrollers with as little as 8 KB of RAM. It supports over 600 boards across ARM, RISC-V, x86, Xtensa, and other architectures.

But this article is about Bluetooth, so here's why Zephyr matters specifically for BLE development.

Zephyr includes a full, Bluetooth SIG-qualified BLE stack. That means the stack has been through the official Bluetooth qualification process and meets the specification requirements. You aren't building on a hobby implementation. You're building on a stack that has passed conformance testing.

The stack covers both the host (GAP, GATT, SMP, L2CAP, ATT) and the controller (Link Layer, HCI). For supported radios (primarily Nordic nRF series), Zephyr provides its own open-source controller implementation. This means the entire Bluetooth stack, from your application code down to the radio registers, is open source. No binary blobs. No closed-source libraries. You can read, debug, and modify every line.

Nordic Semiconductor, the company whose chips dominate the BLE market, built their nRF Connect SDK on top of Zephyr. When Nordic's own engineers write BLE firmware, they use Zephyr. That's a strong endorsement.

The Zephyr Bluetooth stack supports Bluetooth 5.x features (2M PHY, Coded PHY for long range, Extended Advertising), Bluetooth Mesh (relay, proxy, friend, and low-power nodes), LE Audio (the newest Bluetooth audio standard with LC3 codec, broadcast, and hearing aid support), Direction Finding (Angle of Arrival and Angle of Departure for indoor positioning), and all the standard BLE profiles and services you need for product development.

In short: if you're building a BLE product these days, Zephyr is one of the best platforms available. Google uses it in Chromebooks, Nordic uses it for their entire SDK, and hundreds of companies ship products built on it.

---

## Bluetooth Low Energy Fundamentals

Before you write any code, you need a mental model of how BLE works. Skip this section if you already know BLE well. Read it carefully if you don't, because everything that follows builds on these concepts.

BLE is not the same as "classic" Bluetooth (the kind used for audio streaming to speakers before LE Audio). Classic Bluetooth (BR/EDR) is designed for continuous, high-throughput data streaming. BLE is designed for intermittent, low-power communication.

A BLE sensor might wake up once per minute, send 20 bytes of data, and go back to sleep. That interaction consumes microwatts of energy. This fundamental design difference is why BLE devices can run on a coin cell battery for years.

BLE communication is organized into two main layers that you interact with as a developer: GAP and GATT.

**GAP (Generic Access Profile)** controls how devices discover each other and establish connections. Think of GAP as the "meeting people at a party" layer.

A device can be in one of several GAP roles. A **peripheral** (also called an advertiser) broadcasts small packets of data at regular intervals, announcing its presence and basic information. A **central** (also called a scanner) listens for these broadcasts and can initiate a connection. Your phone is typically a central. A sensor, earbud, or smartwatch is typically a peripheral.

**GATT (Generic Attribute Profile)** controls how data is exchanged after two devices are connected. Think of GATT as the "having a conversation" layer.

GATT defines a hierarchical data structure. At the top level, a device exposes one or more **services**. A service groups related data together.

For example, a heart rate monitor might have a Heart Rate Service. Inside each service are one or more **characteristics**. A characteristic is a single data point with a value and metadata. The Heart Rate Service might have a Heart Rate Measurement characteristic (the actual BPM value) and a Body Sensor Location characteristic (where the sensor is worn).

Each characteristic has **properties** that define what you can do with it. A characteristic can be readable (a central can request its value), writable (a central can set its value), notifiable (the peripheral can push updates to the central without being asked), or indicatable (like notify but with acknowledgment). A characteristic can have multiple properties.

Every service and characteristic is identified by a **UUID**. The Bluetooth SIG defines standard 16-bit UUIDs for common services and characteristics (Heart Rate is 0x180D, Battery Service is 0x180F, and so on). For custom functionality, you define your own 128-bit UUIDs.

Here's a concrete mental model. Imagine a temperature sensor device:

```plaintext
Device: "My Temp Sensor"
  |
  +-- Environmental Sensing Service (UUID: 0x181A)
  |     |
  |     +-- Temperature characteristic (UUID: 0x2A6E)
  |     |     Properties: Read, Notify
  |     |     Value: 23.5 (degrees C)
  |     |
  |     +-- Humidity characteristic (UUID: 0x2A6F)
  |           Properties: Read, Notify
  |           Value: 65.2 (percent)
  |
  +-- Battery Service (UUID: 0x180F)
        |
        +-- Battery Level characteristic (UUID: 0x2A19)
              Properties: Read, Notify
              Value: 87 (percent)
```

This diagram shows a device with two services and three characteristics. A connected phone could read the temperature, subscribe to humidity notifications, and check the battery level. The services and characteristics are the API of your BLE device.

Designing them well is like designing a good REST API: think about what data your device exposes and how clients will interact with it.

One more concept: **advertising data**. When a peripheral advertises, it broadcasts small packets (up to 31 bytes in legacy advertising, larger with Extended Advertising). These packets contain structured data like the device name, supported services, manufacturer-specific data, and flags. The advertising data is what a scanner sees before making a connection. It is your device's "business card."

---

## The GAP Layer: Advertising and Connections

GAP is the first layer you interact with when building a BLE device. Your peripheral needs to advertise its presence before anything else can happen.

Advertising works like this: the peripheral's radio wakes up at regular intervals (the "advertising interval"), transmits a short packet on one of three advertising channels (channels 37, 38, and 39), and goes back to sleep. A central scanning those channels picks up the packet and learns about the device.

The advertising interval is a tradeoff: shorter intervals (like 20 ms) make the device easier to discover but consume more power. Longer intervals (like 1000 ms) save power but make discovery slower. For most applications, 100 to 500 ms is a reasonable range.

An advertising packet contains structured fields called AD (Advertising Data) structures. Each AD structure has a length byte, a type byte, and data bytes. Common types include flags (indicating discoverability and BR/EDR support), complete or shortened local name, list of service UUIDs, TX power level, and manufacturer-specific data.

The total payload is limited to 31 bytes for legacy advertising (Bluetooth 4.x), so you can't fit much. You often have to choose between including the device name or the service UUID, because both might not fit.

Bluetooth 5.0 introduced Extended Advertising, which allows advertising payloads up to 254 bytes per fragment (chained into even larger payloads), advertising on all 40 BLE channels (not just the three advertising channels), and multiple simultaneous advertising sets. Zephyr supports Extended Advertising when the hardware and controller support it.

When a central decides to connect, it sends a connection request to the peripheral. The two devices negotiate connection parameters: the **connection interval** (how often they communicate, typically 7.5 ms to 4 seconds), the **peripheral latency** (how many connection events the peripheral can skip to save power), and the **supervision timeout** (how long to wait before considering the connection lost).

These parameters affect both data throughput and power consumption. A short connection interval gives you fast data transfer but costs more power. A high peripheral latency saves power but adds latency to data exchange.

---

## The GATT Layer: Services and Characteristics

Once a connection is established, GATT takes over. The connected devices exchange data through the service/characteristic hierarchy described earlier.

On the peripheral side, you define the GATT database: the list of services and characteristics your device exposes. On the central side, you perform service discovery: querying the peripheral for its available services and characteristics.

Each characteristic in the GATT database has several components. The **value** is the actual data (a byte array). The **properties** define permitted operations: Read (0x02), Write Without Response (0x04), Write (0x08), Notify (0x10), and Indicate (0x20) are the most common. The **permissions** are security requirements: whether reading/writing requires encryption, authentication, or authorization.

For notifications and indications, the characteristic has a **Client Characteristic Configuration Descriptor (CCCD)**. This is a special 2-byte value that the central writes to enable or disable notifications/indications. When the central writes 0x0001 to the CCCD, notifications are enabled. When it writes 0x0000, they're disabled. Zephyr handles the CCCD automatically when you define a characteristic with the notify property.

The GATT operations flow like this.

- For a read: the central sends a read request, the peripheral responds with the characteristic value.
- For a write: the central sends a write request with the new value, the peripheral updates the value and sends a response.
- For a notification: the peripheral sends the value to the central without the central asking. The central must have previously enabled notifications on that characteristic.

This request/response model means that BLE isn't a streaming protocol. It's a message-passing protocol. If you need to send continuous sensor data, you use notifications at a fixed interval. If you need to configure the device, you write to a characteristic. This shapes how you design your BLE application.

---

## Table of Contents

- [Setting Up Your Zephyr Development Environment](#heading-setting-up-your-zephyr-development-environment)
- [Your First BLE Application: A Simple Beacon](#heading-your-first-ble-application-a-simple-beacon)
- [Building a BLE Peripheral with a Custom Service](#heading-building-a-ble-peripheral-with-a-custom-service)
- [Handling Connections and Connection Callbacks](#heading-handling-connections-and-connection-callbacks)
- [Adding Write Support: Receiving Data from a Phone](#heading-adding-write-support-receiving-data-from-a-phone)
- [Notifications: Pushing Data to a Connected Device](#heading-notifications-pushing-data-to-a-connected-device)
- [Building a Complete BLE Sensor Node](#heading-building-a-complete-ble-sensor-node)
- [Pairing and Security](#heading-pairing-and-security)
- [Implementing a Standard BLE Profile (Heart Rate)](#heading-implementing-a-standard-ble-profile-heart-rate)
- [Building a BLE Central](#heading-building-a-ble-central)
- [MTU Negotiation and Data Throughput](#heading-mtu-negotiation-and-data-throughput)
- [PHY Selection for Range and Speed](#heading-phy-selection-for-range-and-speed)
- [Firmware Updates Over BLE](#heading-firmware-updates-over-ble)
- [Bluetooth Mesh on Zephyr](#heading-bluetooth-mesh-on-zephyr)
- [LE Audio: The Next Generation of Bluetooth Audio](#heading-le-audio-the-next-generation-of-bluetooth-audio)
- [Debugging Bluetooth Applications](#heading-debugging-bluetooth-applications)
- [Power Optimization for BLE Devices](#heading-power-optimization-for-ble-devices)
- [Zephyr Bluetooth vs Other Stacks](#heading-zephyr-bluetooth-vs-other-stacks)

---

## Setting Up Your Zephyr Development Environment

This section walks through a complete environment setup. If you already have a Zephyr environment, skip to the next section.

Install system dependencies (Ubuntu):

```sh
sudo apt update
sudo apt install --no-install-recommends git cmake ninja-build gperf \
ccache dfu-util device-tree-compiler wget python3-dev python3-pip \
python3-setuptools python3-tk python3-wheel xz-utils file \
make gcc gcc-multilib g++-multilib libsdl2-dev libmagic1
```

These packages provide the compiler toolchain, build systems, and utilities that Zephyr's build process requires.

The devicetree compiler (`device-tree-compiler`) is particularly important for Zephyr because it processes the hardware description files that tell the build system about your board's peripherals and pin assignments.

Install west, the Zephyr command-line tool:

```sh
pip3 install west
```

West manages the multi-repository workspace that Zephyr uses, and provides commands for building, flashing, and debugging firmware. It's the single tool you interact with most.

Initialize and update the workspace:

```sh
west init ~/zephyrproject
cd ~/zephyrproject
west update
```

The `west init` command creates a workspace and clones the main Zephyr repository. The `west update` command then fetches all module dependencies: vendor HALs (the low-level chip support packages), cryptography libraries, the Bluetooth controller code, and other components. This downloads several gigabytes, so it takes a while.

Install Python requirements:

```sh
pip3 install -r ~/zephyrproject/zephyr/scripts/requirements.txt
```

This installs the Python packages that Zephyr's build scripts and west extensions depend on, including the devicetree processing tools, the Kconfig frontend, and various code generation utilities. The requirements file pins specific versions to ensure build reproducibility.

Install the Zephyr SDK (provides cross-compilation toolchains for all supported architectures):

```sh
cd ~
wget https://github.com/zephyrproject-rtos/sdk-ng/releases/download/v0.16.8/zephyr-sdk-0.16.8_linux-x86_64.tar.xz
tar xvf zephyr-sdk-0.16.8_linux-x86_64.tar.xz
cd zephyr-sdk-0.16.8
./setup.sh
```

The SDK includes GCC-based toolchains for ARM, RISC-V, x86, Xtensa, and more. The <VPIcon icon="iconfont icon-shell"/>`setup.sh` script registers them with CMake. Check the Zephyr releases page for the latest SDK version number, as it may have been updated since this handbook was written.

Set environment variables (add these to your `~/.bashrc` or `~/.zshrc`):

```sh title="~/.bashrc"
export ZEPHYR_BASE=~/zephyrproject/zephyr
source ~/zephyrproject/zephyr/zephyr-env.sh
```

The `ZEPHYR_BASE` variable tells the build system where the Zephyr source tree lives. The `zephyr-env.sh` script sets up additional paths. With both configured, you can build for any supported board from any directory.

---

## Your First BLE Application: A Simple Beacon

We'll start with the simplest possible BLE application: a device that advertises but does nothing else. No connections, no services, no data exchange. Just a beacon broadcasting its existence.

Create the project structure:

```sh
mkdir -p ~/my_ble_apps/beacon/src
```

This creates the standard Zephyr application directory layout. Every Zephyr application lives in its own directory with a <VPIcon icon="fas fa-folder-open"/>`src/` subdirectory for C source files. The project root holds the build configuration files.

Create <VPIcon icon="fas fa-folder-open"/>`~/my_ble_apps/beacon/`<VPIcon icon="fas fa-file-lines"/>`CMakeLists.txt`:

```plaintext title="my_ble_apps/beacon/CMakeLists.txt"
cmake_minimum_required(VERSION 3.20.0)
find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
project(ble_beacon)
target_sources(app PRIVATE src/main.c)
```

The `find_package(Zephyr)` line loads the entire Zephyr build system. The `target_sources` line adds your source file to the build target named `app`, which is the standard target name for Zephyr applications.

Create <VPIcon icon="fas fa-folder-open"/>`~/my_ble_apps/beacon/`<VPIcon icon="fas fa-gears"/>`prj.conf`:

```ini title="beacon/prj.conf"
CONFIG_BT=y
CONFIG_BT_BROADCASTER=y
```

Two configuration lines: `CONFIG_BT=y` enables the Bluetooth subsystem, pulling in the host stack, HCI layer, and (on supported boards) the controller. `CONFIG_BT_BROADCASTER=y` enables the broadcaster role, which is the minimal role for a device that only advertises. You don't need the peripheral role yet because this beacon doesn't accept connections.

Create <VPIcon icon="fas fa-folder-open"/>`~/my_ble_apps/beacon/src/main.c`:

```c title="my_ble_apps/beacon/src/main.c"
#include <zephyr/kernel.h>
#include <zephyr/bluetooth/bluetooth.h>

static const struct bt_data ad[] = {
    BT_DATA_BYTES(BT_DATA_FLAGS, BT_LE_AD_GENERAL | BT_LE_AD_NO_BREDR),
    BT_DATA_BYTES(BT_DATA_NAME_COMPLETE,
                  'M', 'y', 'B', 'e', 'a', 'c', 'o', 'n'),
};

int main(void)
{
    int err;

    printk("Starting BLE Beacon\n");

    err = bt_enable(NULL);
    if (err) {
        printk("Bluetooth init failed (err %d)\n", err);
        return 0;
    }

    printk("Bluetooth initialized\n");

    err = bt_le_adv_start(BT_LE_ADV_NCONN, ad, ARRAY_SIZE(ad), NULL, 0);
    if (err) {
        printk("Advertising failed to start (err %d)\n", err);
        return 0;
    }

    printk("Beacon is advertising\n");

    return 0;
}
```

Let's walk through this code piece by piece.

The `ad` array defines the advertising data. It contains two AD structures.

The first is the Flags field, which is mandatory in BLE advertising. `BT_LE_AD_GENERAL` means the device is in General Discoverable mode (visible to all scanners). `BT_LE_AD_NO_BREDR` indicates that the device doesn't support classic Bluetooth (BR/EDR), only BLE.

The second AD structure is the complete local name, spelled out character by character. The `BT_DATA_BYTES` macro packs these into the correct AD structure format.

The `bt_enable(NULL)` call initializes the entire Bluetooth subsystem. This sets up the HCI transport, initializes the controller (if using an onboard radio), and prepares the host stack. The `NULL` argument means this is a synchronous call: it blocks until initialization is complete. You could pass a callback function to make it asynchronous.

The `bt_le_adv_start` call begins advertising. The first argument, `BT_LE_ADV_NCONN`, specifies non-connectable advertising. This means scanners can see the beacon but cannot connect to it. The `ad` array and its size (`ARRAY_SIZE(ad)`) provide the advertising data. The last two arguments (`NULL, 0`) are for scan response data, which is additional data sent when a scanner actively scans (sends a scan request). You aren't using scan response data in this simple example.

After `main()` returns, the Zephyr main thread terminates, but the system keeps running. The Bluetooth subsystem continues advertising in the background, driven by the controller and the Bluetooth host thread.

Build and flash:

```sh
cd ~/zephyrproject
west build -b nrf52840dk/nrf52840 ~/my_ble_apps/beacon
west flash
```

The `west build` command compiles the application for the nRF52840 DK, producing an ELF binary and a HEX file in the <VPIcon icon="fas fa-folder-open"/>`build/` directory. The `west flash` command programs that binary onto the board via the onboard J-Link debugger, automatically detecting the connected board and using the correct programming protocol.

Open the nRF Connect app on your phone, start scanning, and you should see "MyBeacon" appear in the list of discovered devices. That's your firmware, running on your board, advertising over BLE.

---

## Building a BLE Peripheral with a Custom Service

A beacon that broadcasts is useful for some applications (iBeacon, Eddystone, asset tracking). But most BLE devices need to be connectable and expose data through GATT services. Now you'll build a peripheral with a custom service.

You'll create a "LED Service" that lets a phone control an LED on your board and read a button state. This is a classic BLE demo that teaches you the patterns you'll use in every BLE project.

Create the project:

```sh
mkdir -p ~/my_ble_apps/led_service/src
```

Same project layout as the beacon: a root directory for build configuration and a <VPIcon icon="fas fa-folder-open"/>`src/` directory for source code. This separation keeps build artifacts isolated from your source files.

Create <VPIcon icon="fas fa-folder-open"/>`~/my_ble_apps/led_service/`<VPIcon icon="fas fa-gears"/>`prj.conf`:

```ini title="led_service/prj.conf"
CONFIG_BT=y
CONFIG_BT_PERIPHERAL=y
CONFIG_BT_DEVICE_NAME="Zephyr LED"
CONFIG_BT_DEVICE_APPEARANCE=0
CONFIG_GPIO=y
CONFIG_BT_GATT_DYNAMIC_DB=y
```

`CONFIG_BT_PERIPHERAL=y` enables the peripheral role, which includes the broadcaster role plus the ability to accept connections. `CONFIG_BT_DEVICE_NAME` sets the default device name used in advertising and the GAP Device Name characteristic. `CONFIG_GPIO=y` enables the GPIO driver so you can control the LED and read the button.

Create <VPIcon icon="fas fa-folder-open"/>`~/my_ble_apps/led_service/`<VPIcon icon="fas fa-file-lines"/>`CMakeLists.txt`:

```cmake title="led_service/CMakeLists.txt"
cmake_minimum_required(VERSION 3.20.0)
find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
project(ble_led_service)
target_sources(app PRIVATE src/main.c)
```

This is the same CMake boilerplate from the beacon project. The only change is the project name (`ble_led_service`). The `find_package(Zephyr)` call loads the full Zephyr build system, and `target_sources` registers your application source file.

Create <VPIcon icon="fas fa-folder-open"/>`~/my_ble_apps/led_service/src/main.c`:

```c :collapsed-lines title="led_service/src/main.c"
#include <zephyr/kernel.h>
#include <zephyr/bluetooth/bluetooth.h>
#include <zephyr/bluetooth/gatt.h>
#include <zephyr/bluetooth/uuid.h>
#include <zephyr/drivers/gpio.h>

/* Custom service UUID: 00001234-0000-1000-8000-00805f9b34fb */
#define BT_UUID_LED_SERVICE_VAL \
    BT_UUID_128_ENCODE(0x00001234, 0x0000, 0x1000, 0x8000, 0x00805f9b34fb)
#define BT_UUID_LED_SERVICE BT_UUID_DECLARE_128(BT_UUID_LED_SERVICE_VAL)

/* LED characteristic UUID */
#define BT_UUID_LED_CHAR_VAL \
    BT_UUID_128_ENCODE(0x00001235, 0x0000, 0x1000, 0x8000, 0x00805f9b34fb)
#define BT_UUID_LED_CHAR BT_UUID_DECLARE_128(BT_UUID_LED_CHAR_VAL)

/* Button characteristic UUID */
#define BT_UUID_BUTTON_CHAR_VAL \
    BT_UUID_128_ENCODE(0x00001236, 0x0000, 0x1000, 0x8000, 0x00805f9b34fb)
#define BT_UUID_BUTTON_CHAR BT_UUID_DECLARE_128(BT_UUID_BUTTON_CHAR_VAL)

#define LED0_NODE DT_ALIAS(led0)
#define SW0_NODE  DT_ALIAS(sw0)

static const struct gpio_dt_spec led = GPIO_DT_SPEC_GET(LED0_NODE, gpios);
static const struct gpio_dt_spec button = GPIO_DT_SPEC_GET(SW0_NODE, gpios);

static uint8_t led_state;
static uint8_t button_state;

static ssize_t read_led(struct bt_conn *conn,
                        const struct bt_gatt_attr *attr,
                        void *buf, uint16_t len, uint16_t offset)
{
    return bt_gatt_attr_read(conn, attr, buf, len, offset,
                             &led_state, sizeof(led_state));
}

static ssize_t write_led(struct bt_conn *conn,
                         const struct bt_gatt_attr *attr,
                         const void *buf, uint16_t len,
                         uint16_t offset, uint8_t flags)
{
    if (len != 1) {
        return BT_GATT_ERR(BT_ATT_ERR_INVALID_ATTRIBUTE_LEN);
    }

    led_state = *((const uint8_t *)buf);
    gpio_pin_set_dt(&led, led_state ? 1 : 0);

    printk("LED %s\n", led_state ? "ON" : "OFF");

    return len;
}

static ssize_t read_button(struct bt_conn *conn,
                           const struct bt_gatt_attr *attr,
                           void *buf, uint16_t len, uint16_t offset)
{
    button_state = gpio_pin_get_dt(&button);
    return bt_gatt_attr_read(conn, attr, buf, len, offset,
                             &button_state, sizeof(button_state));
}

BT_GATT_SERVICE_DEFINE(led_service,
    BT_GATT_PRIMARY_SERVICE(BT_UUID_LED_SERVICE),

    BT_GATT_CHARACTERISTIC(BT_UUID_LED_CHAR,
        BT_GATT_CHRC_READ | BT_GATT_CHRC_WRITE,
        BT_GATT_PERM_READ | BT_GATT_PERM_WRITE,
        read_led, write_led, NULL),

    BT_GATT_CHARACTERISTIC(BT_UUID_BUTTON_CHAR,
        BT_GATT_CHRC_READ,
        BT_GATT_PERM_READ,
        read_button, NULL, NULL),
);

static const struct bt_data ad[] = {
    BT_DATA_BYTES(BT_DATA_FLAGS, BT_LE_AD_GENERAL | BT_LE_AD_NO_BREDR),
    BT_DATA(BT_DATA_NAME_COMPLETE, CONFIG_BT_DEVICE_NAME,
            sizeof(CONFIG_BT_DEVICE_NAME) - 1),
};

static const struct bt_data sd[] = {
    BT_DATA_BYTES(BT_DATA_UUID128_ALL, BT_UUID_LED_SERVICE_VAL),
};

int main(void)
{
    int err;

    if (!gpio_is_ready_dt(&led) || !gpio_is_ready_dt(&button)) {
        printk("GPIO devices not ready\n");
        return 0;
    }

    gpio_pin_configure_dt(&led, GPIO_OUTPUT_INACTIVE);
    gpio_pin_configure_dt(&button, GPIO_INPUT);

    err = bt_enable(NULL);
    if (err) {
        printk("Bluetooth init failed (err %d)\n", err);
        return 0;
    }

    printk("Bluetooth initialized\n");

    err = bt_le_adv_start(BT_LE_ADV_CONN, ad, ARRAY_SIZE(ad),
                          sd, ARRAY_SIZE(sd));
    if (err) {
        printk("Advertising failed to start (err %d)\n", err);
        return 0;
    }

    printk("Advertising as '%s'\n", CONFIG_BT_DEVICE_NAME);

    return 0;
}
```

This is a substantial piece of code, so let's go through it section by section.

The UUID definitions at the top create custom 128-bit UUIDs for the service and its two characteristics. When you build a custom BLE device, you generate your own UUIDs rather than using the standard Bluetooth SIG UUIDs (unless you're implementing a standard profile like Heart Rate).

In production, you would generate random 128-bit UUIDs using a tool like `uuidgen`. The UUIDs here are simple for readability. The `BT_UUID_128_ENCODE` macro formats the UUID in the byte order that the Bluetooth stack expects. `BT_UUID_DECLARE_128` creates a `struct bt_uuid_128` from the encoded value.

The `led` and `button` GPIO specs use the devicetree aliases `led0` and `sw0`, which most Zephyr boards define. The `GPIO_DT_SPEC_GET` macro pulls the pin number, GPIO controller, and flags directly from the devicetree, keeping the code portable across boards.

The `read_led` callback is called when a connected central reads the LED characteristic. It uses `bt_gatt_attr_read`, a helper function that handles offset and length correctly (GATT reads can be partial if the value is larger than the MTU). The function returns the current LED state as a single byte.

The `write_led` callback is called when a central writes to the LED characteristic. It validates that exactly one byte was written, updates the `led_state` variable, and calls `gpio_pin_set_dt` to physically toggle the LED. It returns the number of bytes consumed (`len`), or a GATT error if the length was wrong. The `BT_GATT_ERR` macro wraps an ATT error code into the return value that the stack expects.

The `read_button` callback reads the current physical button state at the moment of the read request. It calls `gpio_pin_get_dt` to sample the pin, stores the result, and returns it.

The `BT_GATT_SERVICE_DEFINE` macro is where the GATT database is constructed at compile time. The first argument names the service variable. `BT_GATT_PRIMARY_SERVICE` declares a primary service with the custom UUID. Each `BT_GATT_CHARACTERISTIC` declaration takes the characteristic UUID, the properties (Read + Write for the LED, Read-only for the button), the permissions (who can read/write), the read callback, the write callback, and a pointer to user data (NULL in both cases here).

The `ad` array contains the advertising data: flags and the device name. The `sd` array contains the scan response data: the 128-bit service UUID.

Splitting data between advertising and scan response is common because the 31-byte advertising packet limit is tight. The service UUID alone is 16 bytes, which would leave little room for other data in the main advertising packet. By putting the UUID in the scan response, you keep the advertising packet small and include the UUID only when a scanner explicitly requests it.

The `bt_le_adv_start` call uses `BT_LE_ADV_CONN` instead of `BT_LE_ADV_NCONN`. This makes the advertising connectable: scanners can now establish a connection to your device. The `sd` and `ARRAY_SIZE(sd)` arguments provide the scan response data that was NULL in the beacon example.

Build, flash, and test:

```sh
cd ~/zephyrproject
west build -b nrf52840dk/nrf52840 ~/my_ble_apps/led_service
west flash
```

The build command compiles the application with the full Bluetooth stack, GPIO drivers, and GATT database linked into a single binary. The flash command programs it onto the board. Because `CONFIG_BT_PERIPHERAL` is enabled, the binary is significantly larger than the beacon (the connectable advertising, GATT server, and ATT protocol layers are all included).

Open nRF Connect on your phone, scan, and find "Zephyr LED." Tap Connect. After connecting, you'll see the GATT services. Find the custom service (UUID starting with 00001234). You'll see two characteristics. Read the button characteristic to see the button state. Write 0x01 to the LED characteristic to turn on the LED, and 0x00 to turn it off. You just controlled hardware over Bluetooth from your phone.

---

## Handling Connections and Connection Callbacks

In a real application, you need to know when devices connect and disconnect. Maybe you want to stop advertising when a device connects (to save power), restart advertising when it disconnects (to allow reconnection), or update a status LED to indicate connection state.

Zephyr provides connection callbacks through a registration mechanism:

```c
#include <zephyr/bluetooth/conn.h>

static void connected(struct bt_conn *conn, uint8_t err)
{
    if (err) {
        printk("Connection failed (err %u)\n", err);
        return;
    }

    char addr[BT_ADDR_LE_STR_LEN];
    bt_addr_le_to_str(bt_conn_get_dst(conn), addr, sizeof(addr));
    printk("Connected: %s\n", addr);
}

static void disconnected(struct bt_conn *conn, uint8_t reason)
{
    char addr[BT_ADDR_LE_STR_LEN];
    bt_addr_le_to_str(bt_conn_get_dst(conn), addr, sizeof(addr));
    printk("Disconnected: %s (reason %u)\n", addr, reason);

    /* Restart advertising after disconnect */
    bt_le_adv_start(BT_LE_ADV_CONN, ad, ARRAY_SIZE(ad),
                    sd, ARRAY_SIZE(sd));
}

BT_CONN_CB_DEFINE(conn_callbacks) = {
    .connected = connected,
    .disconnected = disconnected,
};
```

The `BT_CONN_CB_DEFINE` macro statically registers a set of connection callbacks. The `.connected` callback fires when a connection is established. The `err` parameter indicates whether the connection was successful (0 means success). The `.disconnected` callback fires when a connection ends. The `reason` parameter is an HCI disconnect reason code (0x13 is "Remote User Terminated Connection," which is the normal disconnect).

In the `connected` callback, the code retrieves the remote device's Bluetooth address using `bt_conn_get_dst` and converts it to a printable string. This is useful for logging and debugging.

In the `disconnected` callback, the code restarts advertising. By default, Zephyr stops advertising when a connection is established (because the radio is now used for the connection). When the connection drops, you typically want to start advertising again so the device can be rediscovered.

The `bt_conn` pointer represents the connection. You can use it to query connection parameters, request parameter updates, initiate pairing, or disconnect programmatically. Hold a reference to it (using `bt_conn_ref`) if you need to use it outside the callback. Release the reference (using `bt_conn_unref`) when you're done.

---

## Adding Write Support: Receiving Data from a Phone

The LED service already has a write characteristic, but let's look more closely at the write callback pattern and how to handle more complex data.

Consider a scenario where the phone sends a configuration struct to the device:

```c
struct device_config {
    uint8_t mode;
    uint16_t interval_ms;
    uint8_t threshold;
} __packed;

static struct device_config current_config = {
    .mode = 0,
    .interval_ms = 1000,
    .threshold = 50,
};

static ssize_t write_config(struct bt_conn *conn,
                            const struct bt_gatt_attr *attr,
                            const void *buf, uint16_t len,
                            uint16_t offset, uint8_t flags)
{
    if (offset != 0) {
        return BT_GATT_ERR(BT_ATT_ERR_INVALID_OFFSET);
    }

    if (len != sizeof(struct device_config)) {
        return BT_GATT_ERR(BT_ATT_ERR_INVALID_ATTRIBUTE_LEN);
    }

    memcpy(&current_config, buf, len);

    printk("Config updated: mode=%u, interval=%u ms, threshold=%u\n",
           current_config.mode,
           current_config.interval_ms,
           current_config.threshold);

    return len;
}

static ssize_t read_config(struct bt_conn *conn,
                           const struct bt_gatt_attr *attr,
                           void *buf, uint16_t len, uint16_t offset)
{
    return bt_gatt_attr_read(conn, attr, buf, len, offset,
                             &current_config, sizeof(current_config));
}
```

The `__packed` attribute on the struct ensures that there is no padding between fields, so the byte layout matches what the phone sends. Without `__packed`, the compiler might insert padding bytes between `mode` and `interval_ms` for alignment, and the data wouldn't match.

The write callback validates two things. First, it checks that the offset is zero (no partial writes for this simple case). Second, it checks that the length matches the expected struct size. If either check fails, it returns a GATT error code that the central receives as a write response error.

Validating input is critical in BLE applications because the central is sending raw bytes over the air. Malformed data should be rejected, not blindly accepted.

The `memcpy` copies the validated data into the configuration struct. In a real application, you would likely apply the new configuration to your device's behavior (change a sensor polling interval, switch operating modes, and so on).

The `flags` parameter in the write callback indicates whether this is a Write With Response (the central expects an acknowledgment) or Write Without Response (fire-and-forget). You can check `flags & BT_GATT_WRITE_FLAG_CMD` to distinguish the two. For configuration data, you typically want Write With Response so the central knows the write succeeded.

---

## Notifications: Pushing Data to a Connected Device

Reading and writing work for on-demand data. But many BLE applications need the peripheral to push data to the central proactively. A heart rate monitor doesn't wait for the phone to ask for the heart rate every second. It pushes the value via notifications.

Here's how to add notification support to a characteristic:

```c
static uint8_t sensor_value;
static bool notifications_enabled;

static void sensor_ccc_changed(const struct bt_gatt_attr *attr, uint16_t value)
{
    notifications_enabled = (value == BT_GATT_CCC_NOTIFY);
    printk("Notifications %s\n", notifications_enabled ? "enabled" : "disabled");
}

static ssize_t read_sensor(struct bt_conn *conn,
                           const struct bt_gatt_attr *attr,
                           void *buf, uint16_t len, uint16_t offset)
{
    return bt_gatt_attr_read(conn, attr, buf, len, offset,
                             &sensor_value, sizeof(sensor_value));
}

BT_GATT_SERVICE_DEFINE(sensor_service,
    BT_GATT_PRIMARY_SERVICE(BT_UUID_LED_SERVICE),

    BT_GATT_CHARACTERISTIC(BT_UUID_LED_CHAR,
        BT_GATT_CHRC_READ | BT_GATT_CHRC_NOTIFY,
        BT_GATT_PERM_READ,
        read_sensor, NULL, &sensor_value),

    BT_GATT_CCC(sensor_ccc_changed, BT_GATT_PERM_READ | BT_GATT_PERM_WRITE),
);
```

The characteristic now has `BT_GATT_CHRC_NOTIFY` in its properties, which tells connected centrals that this characteristic supports notifications.

The `BT_GATT_CCC` macro adds the Client Characteristic Configuration Descriptor (CCCD). The `sensor_ccc_changed` callback is called when a central enables or disables notifications by writing to the CCCD. The `value` parameter will be `BT_GATT_CCC_NOTIFY` (0x0001) when notifications are enabled and 0 when disabled.

To actually send a notification:

```c
void send_sensor_notification(void)
{
    if (!notifications_enabled) {
        return;
    }

    sensor_value = read_actual_sensor();

    int err = bt_gatt_notify(NULL, &sensor_service.attrs[1],
                             &sensor_value, sizeof(sensor_value));
    if (err) {
        printk("Notify failed (err %d)\n", err);
    }
}
```

The `bt_gatt_notify` function sends a notification to all connected centrals that have enabled notifications on this characteristic.

The first argument is `NULL` to notify all connections (you can pass a specific `bt_conn` pointer to notify only one). The second argument is a pointer to the characteristic attribute in the GATT table. The `&sensor_service.attrs[1]` points to the first characteristic value attribute (index 0 is the service declaration, index 1 is the characteristic declaration, and the value follows). The third and fourth arguments are the data and its length.

A common pattern is to call this function from a timer or a work queue at a regular interval:

```c
void sensor_work_handler(struct k_work *work)
{
    send_sensor_notification();
}

K_WORK_DELAYABLE_DEFINE(sensor_work, sensor_work_handler);

/* In main(), after Bluetooth is initialized and advertising: */
k_work_schedule(&sensor_work, K_SECONDS(1));

/* In the work handler, reschedule for periodic execution: */
void sensor_work_handler(struct k_work *work)
{
    send_sensor_notification();
    k_work_schedule(&sensor_work, K_SECONDS(1));
}
```

This approach uses a delayable work item that reschedules itself every second. Each time it fires, it reads the sensor value and sends a notification (if notifications are enabled). The work item runs on the system work queue thread, not in interrupt context, so it's safe to call `bt_gatt_notify` and other Bluetooth APIs.

---

## Building a Complete BLE Sensor Node

Now we'll tie everything together into a complete application. This is a BLE environmental sensor that reads temperature (simulated), exposes it through a custom GATT service with read and notify support, handles connections and disconnections, and manages advertising.

Create <VPIcon icon="fas fa-folder-open"/>`~/my_ble_apps/sensor_node/src/main.c`:

```c :collapsed-lines title="sensor_node/src/main.c"
#include <zephyr/kernel.h>
#include <zephyr/bluetooth/bluetooth.h>
#include <zephyr/bluetooth/gatt.h>
#include <zephyr/bluetooth/uuid.h>
#include <zephyr/bluetooth/conn.h>
#include <zephyr/drivers/gpio.h>

/* UUIDs */
#define BT_UUID_ENV_SERVICE_VAL \
    BT_UUID_128_ENCODE(0xaabbccdd, 0x0000, 0x1000, 0x8000, 0x00805f9b34fb)
#define BT_UUID_ENV_SERVICE BT_UUID_DECLARE_128(BT_UUID_ENV_SERVICE_VAL)

#define BT_UUID_TEMP_CHAR_VAL \
    BT_UUID_128_ENCODE(0xaabbccdd, 0x0001, 0x1000, 0x8000, 0x00805f9b34fb)
#define BT_UUID_TEMP_CHAR BT_UUID_DECLARE_128(BT_UUID_TEMP_CHAR_VAL)

#define BT_UUID_INTERVAL_CHAR_VAL \
    BT_UUID_128_ENCODE(0xaabbccdd, 0x0002, 0x1000, 0x8000, 0x00805f9b34fb)
#define BT_UUID_INTERVAL_CHAR BT_UUID_DECLARE_128(BT_UUID_INTERVAL_CHAR_VAL)

/* LED for connection status */
#define LED0_NODE DT_ALIAS(led0)
static const struct gpio_dt_spec status_led = GPIO_DT_SPEC_GET(LED0_NODE, gpios);

/* Sensor state */
static int16_t temperature_value = 2250;
static uint16_t notify_interval_ms = 1000;
static bool temp_notifications_enabled;
static struct bt_conn *current_conn;

/* Forward declaration */
static void sensor_work_handler(struct k_work *work);
K_WORK_DELAYABLE_DEFINE(sensor_work, sensor_work_handler);

static int16_t simulate_temperature(void)
{
    static int16_t base = 2250;
    base += (k_uptime_get_32() % 11) - 5;
    if (base > 3500) base = 3500;
    if (base < 1000) base = 1000;
    return base;
}

/* GATT callbacks */
static ssize_t read_temperature(struct bt_conn *conn,
                                const struct bt_gatt_attr *attr,
                                void *buf, uint16_t len, uint16_t offset)
{
    temperature_value = simulate_temperature();
    return bt_gatt_attr_read(conn, attr, buf, len, offset,
                             &temperature_value, sizeof(temperature_value));
}

static void temp_ccc_changed(const struct bt_gatt_attr *attr, uint16_t value)
{
    temp_notifications_enabled = (value == BT_GATT_CCC_NOTIFY);
    printk("Temperature notifications %s\n",
           temp_notifications_enabled ? "enabled" : "disabled");

    if (temp_notifications_enabled) {
        k_work_schedule(&sensor_work, K_MSEC(notify_interval_ms));
    } else {
        k_work_cancel_delayable(&sensor_work);
    }
}

static ssize_t read_interval(struct bt_conn *conn,
                             const struct bt_gatt_attr *attr,
                             void *buf, uint16_t len, uint16_t offset)
{
    return bt_gatt_attr_read(conn, attr, buf, len, offset,
                             &notify_interval_ms, sizeof(notify_interval_ms));
}

static ssize_t write_interval(struct bt_conn *conn,
                              const struct bt_gatt_attr *attr,
                              const void *buf, uint16_t len,
                              uint16_t offset, uint8_t flags)
{
    if (len != sizeof(uint16_t)) {
        return BT_GATT_ERR(BT_ATT_ERR_INVALID_ATTRIBUTE_LEN);
    }

    uint16_t new_interval = *((const uint16_t *)buf);

    if (new_interval < 100 || new_interval > 60000) {
        return BT_GATT_ERR(BT_ATT_ERR_VALUE_NOT_ALLOWED);
    }

    notify_interval_ms = new_interval;
    printk("Notification interval changed to %u ms\n", notify_interval_ms);

    if (temp_notifications_enabled) {
        k_work_cancel_delayable(&sensor_work);
        k_work_schedule(&sensor_work, K_MSEC(notify_interval_ms));
    }

    return len;
}

/* GATT service definition */
BT_GATT_SERVICE_DEFINE(env_service,
    BT_GATT_PRIMARY_SERVICE(BT_UUID_ENV_SERVICE),

    BT_GATT_CHARACTERISTIC(BT_UUID_TEMP_CHAR,
        BT_GATT_CHRC_READ | BT_GATT_CHRC_NOTIFY,
        BT_GATT_PERM_READ,
        read_temperature, NULL, NULL),
    BT_GATT_CCC(temp_ccc_changed,
        BT_GATT_PERM_READ | BT_GATT_PERM_WRITE),

    BT_GATT_CHARACTERISTIC(BT_UUID_INTERVAL_CHAR,
        BT_GATT_CHRC_READ | BT_GATT_CHRC_WRITE,
        BT_GATT_PERM_READ | BT_GATT_PERM_WRITE,
        read_interval, write_interval, NULL),
);

/* Notification sender */
static void sensor_work_handler(struct k_work *work)
{
    temperature_value = simulate_temperature();

    if (temp_notifications_enabled) {
        int err = bt_gatt_notify(NULL, &env_service.attrs[2],
                                 &temperature_value,
                                 sizeof(temperature_value));
        if (err && err != -ENOTCONN) {
            printk("Notify error: %d\n", err);
        }

        k_work_schedule(&sensor_work, K_MSEC(notify_interval_ms));
    }
}

/* Advertising data */
static const struct bt_data ad[] = {
    BT_DATA_BYTES(BT_DATA_FLAGS, BT_LE_AD_GENERAL | BT_LE_AD_NO_BREDR),
    BT_DATA(BT_DATA_NAME_COMPLETE, CONFIG_BT_DEVICE_NAME,
            sizeof(CONFIG_BT_DEVICE_NAME) - 1),
};

static const struct bt_data sd[] = {
    BT_DATA_BYTES(BT_DATA_UUID128_ALL, BT_UUID_ENV_SERVICE_VAL),
};

/* Connection callbacks */
static void connected(struct bt_conn *conn, uint8_t err)
{
    if (err) {
        printk("Connection failed (err %u)\n", err);
        return;
    }

    current_conn = bt_conn_ref(conn);
    gpio_pin_set_dt(&status_led, 1);

    char addr[BT_ADDR_LE_STR_LEN];
    bt_addr_le_to_str(bt_conn_get_dst(conn), addr, sizeof(addr));
    printk("Connected: %s\n", addr);
}

static void disconnected(struct bt_conn *conn, uint8_t reason)
{
    char addr[BT_ADDR_LE_STR_LEN];
    bt_addr_le_to_str(bt_conn_get_dst(conn), addr, sizeof(addr));
    printk("Disconnected: %s (reason %u)\n", addr, reason);

    if (current_conn) {
        bt_conn_unref(current_conn);
        current_conn = NULL;
    }

    temp_notifications_enabled = false;
    k_work_cancel_delayable(&sensor_work);
    gpio_pin_set_dt(&status_led, 0);

    bt_le_adv_start(BT_LE_ADV_CONN, ad, ARRAY_SIZE(ad), sd, ARRAY_SIZE(sd));
}

BT_CONN_CB_DEFINE(conn_callbacks) = {
    .connected = connected,
    .disconnected = disconnected,
};

int main(void)
{
    int err;

    if (!gpio_is_ready_dt(&status_led)) {
        printk("LED not ready\n");
        return 0;
    }
    gpio_pin_configure_dt(&status_led, GPIO_OUTPUT_INACTIVE);

    err = bt_enable(NULL);
    if (err) {
        printk("Bluetooth init failed (err %d)\n", err);
        return 0;
    }

    printk("Bluetooth initialized\n");

    err = bt_le_adv_start(BT_LE_ADV_CONN, ad, ARRAY_SIZE(ad),
                          sd, ARRAY_SIZE(sd));
    if (err) {
        printk("Advertising failed (err %d)\n", err);
        return 0;
    }

    printk("Environmental sensor ready. Advertising as '%s'\n",
           CONFIG_BT_DEVICE_NAME);

    return 0;
}
```

The <VPIcon icon="fas fa-gears"/>`prj.conf` for this application:

```ini title="sensor_node/prj.conf"
CONFIG_BT=y
CONFIG_BT_PERIPHERAL=y
CONFIG_BT_DEVICE_NAME="Zephyr Sensor"
CONFIG_BT_GATT_DYNAMIC_DB=y
CONFIG_GPIO=y
CONFIG_SYSTEM_WORKQUEUE_STACK_SIZE=2048
```

This application demonstrates the full lifecycle of a BLE sensor device, so study the design carefully.

The service exposes two characteristics. The temperature characteristic supports read and notify. When a central reads it, it gets the latest simulated temperature. When the central enables notifications, the device starts pushing temperature updates at a configurable interval.

The interval characteristic lets the central read and write the notification interval, bounded between 100 ms and 60000 ms. The validation in `write_interval` rejects values outside this range with `BT_ATT_ERR_VALUE_NOT_ALLOWED`, which the central receives as an error response.

Temperature values are stored as `int16_t` in hundredths of a degree Celsius (2250 = 22.50 degrees C). This fixed-point representation avoids floating-point math, which is expensive on microcontrollers without an FPU, and gives you 0.01 degree resolution in a 2-byte value.

The connection callbacks manage the full connection lifecycle. On connect, the code takes a reference to the connection object (`bt_conn_ref`) and turns on the status LED. On disconnect, it releases the reference (`bt_conn_unref`), cancels any pending notification work, turns off the LED, and restarts advertising.

The reference counting is important because the `bt_conn` pointer is only valid while you hold a reference. Using it after the reference is released leads to undefined behavior.

The notification work item reschedules itself at the configured interval, creating a periodic loop. When notifications are disabled (either explicitly by the central or implicitly by disconnection), the work is cancelled. This prevents wasted CPU cycles (and battery) when nobody is listening.

---

## Pairing and Security

Production BLE devices almost always need security. Without pairing, any device within radio range can connect and interact with your GATT services. Pairing establishes an encrypted link and optionally authenticates the devices to each other.

BLE supports several pairing methods. "Just Works" provides encryption but no authentication. It protects against passive eavesdropping but not against active man-in-the-middle attacks. "Passkey Entry" requires the user to enter a 6-digit code, providing authentication. "Numeric Comparison" displays a number on both devices and the user confirms they match. "Out of Band (OOB)" uses an external channel (like NFC) to exchange pairing information.

Enable security in your <VPIcon icon="fas fa-gears"/>`prj.conf`:

```ini title="sensor_node/prj.conf"
CONFIG_BT_SMP=y
CONFIG_BT_SETTINGS=y
CONFIG_FLASH=y
CONFIG_FLASH_MAP=y
CONFIG_NVS=y
CONFIG_SETTINGS=y
```

`CONFIG_BT_SMP=y` enables the Security Manager Protocol, which handles pairing. The Settings, Flash, and NVS options enable persistent storage so that bonding information (the keys exchanged during pairing) survives reboots. Without persistent storage, the device would need to re-pair after every power cycle, which is a terrible user experience.

To require encryption on a characteristic, change its permissions:

```c
BT_GATT_CHARACTERISTIC(BT_UUID_TEMP_CHAR,
    BT_GATT_CHRC_READ | BT_GATT_CHRC_NOTIFY,
    BT_GATT_PERM_READ_ENCRYPT,
    read_temperature, NULL, NULL),
```

`BT_GATT_PERM_READ_ENCRYPT` means the characteristic can only be read over an encrypted connection. If a central tries to read it without pairing first, the stack automatically triggers pairing. You can also use `BT_GATT_PERM_READ_AUTHEN` to require authenticated pairing (Passkey or Numeric Comparison, not Just Works).

Register authentication callbacks to handle passkey display or input:

```c
static void auth_passkey_display(struct bt_conn *conn, unsigned int passkey)
{
    char addr[BT_ADDR_LE_STR_LEN];
    bt_addr_le_to_str(bt_conn_get_dst(conn), addr, sizeof(addr));
    printk("Passkey for %s: %06u\n", addr, passkey);
}

static void auth_cancel(struct bt_conn *conn)
{
    char addr[BT_ADDR_LE_STR_LEN];
    bt_addr_le_to_str(bt_conn_get_dst(conn), addr, sizeof(addr));
    printk("Pairing cancelled: %s\n", addr);
}

static struct bt_conn_auth_cb auth_callbacks = {
    .passkey_display = auth_passkey_display,
    .cancel = auth_cancel,
};

/* In main(), after bt_enable(): */
bt_conn_auth_cb_register(&auth_callbacks);
```

The `passkey_display` callback fires when the stack generates a passkey that the user needs to enter on the central (phone). On a device with a display, you would show the passkey on screen. On a device without a display (like a sensor), you might print it to a serial console during development or use Just Works pairing in production.

The `bt_conn_auth_cb_register` function registers these callbacks with the stack. Only one set of callbacks can be active at a time.

---

## Implementing a Standard BLE Profile (Heart Rate)

The examples so far have used custom 128-bit UUIDs. In production, many BLE devices implement standard profiles defined by the Bluetooth SIG. Standard profiles use 16-bit UUIDs, which consume less advertising space and allow generic apps (like nRF Connect) to automatically parse and display the data in a human-readable format. The Heart Rate Profile is one of the most common and illustrates how standard profiles work in Zephyr.

The Heart Rate Service (UUID 0x180D) contains a Heart Rate Measurement characteristic (UUID 0x2A37) that uses notifications to push heart rate data. The measurement characteristic has a specific byte format defined by the Bluetooth SIG: the first byte is a flags field, and the remaining bytes contain the heart rate value and optional fields like energy expended and RR-interval.

```c :collapsed-lines
#include <zephyr/kernel.h>
#include <zephyr/bluetooth/bluetooth.h>
#include <zephyr/bluetooth/gatt.h>
#include <zephyr/bluetooth/uuid.h>
#include <zephyr/bluetooth/conn.h>

static uint8_t heart_rate_bpm = 72;
static bool hr_notifications_enabled;

static void hr_ccc_changed(const struct bt_gatt_attr *attr, uint16_t value)
{
    hr_notifications_enabled = (value == BT_GATT_CCC_NOTIFY);
}

static ssize_t read_body_sensor_location(struct bt_conn *conn,
                                         const struct bt_gatt_attr *attr,
                                         void *buf, uint16_t len,
                                         uint16_t offset)
{
    uint8_t location = 0x01; /* Chest */
    return bt_gatt_attr_read(conn, attr, buf, len, offset,
                             &location, sizeof(location));
}

BT_GATT_SERVICE_DEFINE(hr_service,
    BT_GATT_PRIMARY_SERVICE(BT_UUID_HRS),

    BT_GATT_CHARACTERISTIC(BT_UUID_HRS_MEASUREMENT,
        BT_GATT_CHRC_NOTIFY,
        BT_GATT_PERM_NONE,
        NULL, NULL, NULL),
    BT_GATT_CCC(hr_ccc_changed,
        BT_GATT_PERM_READ | BT_GATT_PERM_WRITE),

    BT_GATT_CHARACTERISTIC(BT_UUID_HRS_BODY_SENSOR,
        BT_GATT_CHRC_READ,
        BT_GATT_PERM_READ,
        read_body_sensor_location, NULL, NULL),
);

static void send_heart_rate(void)
{
    if (!hr_notifications_enabled) {
        return;
    }

    uint8_t hr_data[2];
    hr_data[0] = 0x00; /* Flags: uint8 format, no extra fields */
    hr_data[1] = heart_rate_bpm;

    bt_gatt_notify(NULL, &hr_service.attrs[1], hr_data, sizeof(hr_data));
}
```

This code uses Zephyr's predefined UUID macros (`BT_UUID_HRS`, `BT_UUID_HRS_MEASUREMENT`, `BT_UUID_HRS_BODY_SENSOR`) instead of custom 128-bit UUIDs. Zephyr defines macros for all standard Bluetooth SIG services and characteristics in <VPIcon icon="fas fa-folder-open"/>`zephyr/bluetooth/`<VPIcon icon="iconfont icon-c"/>`uuid.h`. Using these standard UUIDs means that any BLE heart rate app on a phone can automatically discover, connect, and display data from your device without custom app development.

The Heart Rate Measurement characteristic has `BT_GATT_PERM_NONE` for permissions because it's notify-only. No read or write access is permitted: the data flows exclusively through notifications.

The first byte of the notification payload (`hr_data[0]`) is a flags field defined by the SIG specification. A value of 0x00 means the heart rate is in uint8 format (values 0 to 255 BPM) with no optional fields present. Setting bit 0 would switch to uint16 format for heart rates above 255. Setting other bits would indicate the presence of energy expended or RR-interval data.

The Body Sensor Location characteristic is a simple read-only value. The value 0x01 means "Chest." Other defined values include 0x00 (Other), 0x02 (Wrist), 0x03 (Finger), 0x04 (Hand), 0x05 (Ear Lobe), and 0x06 (Foot).

The <VPIcon icon="fas fa-gears"/>`prj.conf` for a standard profile application doesn't need any special configuration beyond the basic Bluetooth peripheral setup:

```ini title="prj.conf"
CONFIG_BT=y
CONFIG_BT_PERIPHERAL=y
CONFIG_BT_DEVICE_NAME="Zephyr HR"
```

The standard UUIDs are always available when `CONFIG_BT=y` is set. No additional Kconfig options are needed to use SIG-defined service and characteristic UUIDs.

The advertising data for a standard profile device typically includes the 16-bit service UUID in the advertising packet, which allows phones to filter scans by service type:

```c
static const struct bt_data ad[] = {
    BT_DATA_BYTES(BT_DATA_FLAGS, BT_LE_AD_GENERAL | BT_LE_AD_NO_BREDR),
    BT_DATA_BYTES(BT_DATA_UUID16_ALL, BT_UUID_16_ENCODE(0x180D)),
    BT_DATA(BT_DATA_NAME_COMPLETE, CONFIG_BT_DEVICE_NAME,
            sizeof(CONFIG_BT_DEVICE_NAME) - 1),
};
```

The `BT_DATA_UUID16_ALL` type advertises the complete list of 16-bit service UUIDs. The `BT_UUID_16_ENCODE(0x180D)` macro encodes the Heart Rate Service UUID in little-endian byte order. A 16-bit UUID takes only 2 bytes in the advertising packet (compared to 16 bytes for a 128-bit UUID), leaving much more room for other advertising data. This is a significant advantage of using standard profiles.

---

## Building a BLE Central

Every example so far has built a peripheral (a device that advertises and accepts connections). The other side of a BLE connection is the central: a device that scans for peripherals, initiates connections, and reads/writes characteristics. Gateways, hubs, and data collectors are typically centrals.

Building a central on Zephyr requires a second board, but understanding the central role is essential for building complete BLE systems.

The <VPIcon icon="fas fa-gears"/>`prj.conf` for a central application:

```ini title="prj.conf"
CONFIG_BT=y
CONFIG_BT_CENTRAL=y
CONFIG_BT_GATT_CLIENT=y
CONFIG_BT_SCAN=y
CONFIG_BT_DEVICE_NAME="Zephyr Central"
```

`CONFIG_BT_CENTRAL=y` enables the central role (scanning and connection initiation). `CONFIG_BT_GATT_CLIENT=y` enables the GATT client APIs for service discovery, reading, writing, and subscribing. `CONFIG_BT_SCAN=y` enables the scan module, which provides a higher-level scanning API with filtering.

A BLE central starts by scanning for peripherals:

```c :collapsed-lines
#include <zephyr/kernel.h>
#include <zephyr/bluetooth/bluetooth.h>
#include <zephyr/bluetooth/conn.h>
#include <zephyr/bluetooth/gatt.h>
#include <zephyr/bluetooth/uuid.h>

static struct bt_conn *default_conn;

static void device_found(const bt_addr_le_t *addr, int8_t rssi,
                          uint8_t type, struct net_buf_simple *ad)
{
    char addr_str[BT_ADDR_LE_STR_LEN];
    bt_addr_le_to_str(addr, addr_str, sizeof(addr_str));

    if (rssi < -70) {
        return; /* Skip distant devices */
    }

    printk("Found device: %s (RSSI %d)\n", addr_str, rssi);

    /* Stop scanning before connecting */
    bt_le_scan_stop();

    int err = bt_conn_le_create(addr, BT_CONN_LE_CREATE_CONN,
                                BT_LE_CONN_PARAM_DEFAULT,
                                &default_conn);
    if (err) {
        printk("Connection failed (err %d)\n", err);
        bt_le_scan_start(BT_LE_SCAN_ACTIVE, device_found);
    }
}

int main(void)
{
    int err;

    err = bt_enable(NULL);
    if (err) {
        printk("Bluetooth init failed (err %d)\n", err);
        return 0;
    }

    printk("Starting BLE scan...\n");

    err = bt_le_scan_start(BT_LE_SCAN_ACTIVE, device_found);
    if (err) {
        printk("Scan failed (err %d)\n", err);
        return 0;
    }

    return 0;
}
```

The `bt_le_scan_start` function begins scanning for BLE advertisements. The first argument, `BT_LE_SCAN_ACTIVE`, enables active scanning, which means the scanner sends scan request packets to advertisers to get their scan response data (passive scanning only listens). The second argument is a callback function that's called for every advertising packet received.

The `device_found` callback receives the advertiser's address, RSSI (signal strength in dBm), advertising type, and the raw advertising data.

In this example, the code filters by RSSI to ignore distant devices, then attempts to connect to the first device it finds. The `bt_le_scan_stop` call is necessary before initiating a connection because the radio can't scan and connect simultaneously.

The `bt_conn_le_create` function initiates a connection. It takes the target address, creation parameters (which control the scan window used during connection establishment), connection parameters (interval, latency, timeout), and a pointer to store the connection reference. `BT_LE_CONN_PARAM_DEFAULT` uses the default connection parameters, which are suitable for most applications.

In a real application, you would filter the scan results more carefully, typically by checking the advertised service UUIDs or device name. After connecting, you would perform GATT service discovery and then read/write/subscribe to characteristics:

```c
static uint8_t discover_func(struct bt_conn *conn,
                              const struct bt_gatt_attr *attr,
                              struct bt_gatt_discover_params *params)
{
    if (!attr) {
        printk("Discovery complete\n");
        return BT_GATT_ITER_STOP;
    }

    char uuid_str[BT_UUID_STR_LEN];
    bt_uuid_to_str(params->uuid, uuid_str, sizeof(uuid_str));
    printk("Discovered attribute: handle %u, UUID %s\n",
           attr->handle, uuid_str);

    return BT_GATT_ITER_CONTINUE;
}

static struct bt_gatt_discover_params discover_params;

static void start_discovery(struct bt_conn *conn)
{
    discover_params.uuid = NULL; /* Discover all services */
    discover_params.func = discover_func;
    discover_params.start_handle = BT_ATT_FIRST_ATTRIBUTE_HANDLE;
    discover_params.end_handle = BT_ATT_LAST_ATTRIBUTE_HANDLE;
    discover_params.type = BT_GATT_DISCOVER_PRIMARY;

    int err = bt_gatt_discover(conn, &discover_params);
    if (err) {
        printk("Discovery failed (err %d)\n", err);
    }
}
```

The `bt_gatt_discover` function initiates GATT service discovery on the connected peripheral. The `discover_params` structure controls what to discover: setting `uuid` to NULL discovers all primary services. Setting `type` to `BT_GATT_DISCOVER_PRIMARY` discovers primary services. You can also set it to `BT_GATT_DISCOVER_CHARACTERISTIC` to discover characteristics within a service, or `BT_GATT_DISCOVER_DESCRIPTOR` to discover descriptors within a characteristic.

The discovery callback (`discover_func`) is called once for each discovered attribute and once more with `attr` set to NULL when discovery is complete. Returning `BT_GATT_ITER_CONTINUE` tells the stack to continue discovering. Returning `BT_GATT_ITER_STOP` stops discovery early.

After discovering the services and characteristics, you read a characteristic value using `bt_gatt_read` and subscribe to notifications using `bt_gatt_subscribe`. The subscribe function takes a `bt_gatt_subscribe_params` structure that specifies the characteristic handle, a notification callback function, and the CCC value to write (BT_GATT_CCC_NOTIFY).

---

## MTU Negotiation and Data Throughput

The default BLE ATT MTU (Maximum Transmission Unit) is 23 bytes. Subtract 3 bytes of ATT protocol overhead, and you're left with 20 bytes of actual payload per GATT operation. For a single temperature reading, 20 bytes is plenty. For transferring a firmware image or a large sensor data buffer, 20 bytes per operation is painfully slow.

MTU negotiation allows two connected devices to agree on a larger MTU, up to 517 bytes (the BLE maximum). A larger MTU means more data per packet, fewer round-trips, and higher throughput. On an nRF52840 with 2M PHY, the difference between a 23-byte MTU and a 247-byte MTU can be 5x to 10x throughput improvement.

Enable a larger MTU in your <VPIcon icon="fas fa-gears"/>`prj.conf`:

```ini title="prj.conf"
CONFIG_BT_L2CAP_TX_MTU=247
CONFIG_BT_BUF_ACL_RX_SIZE=251
CONFIG_BT_BUF_ACL_TX_SIZE=251
CONFIG_BT_CTLR_DATA_LENGTH_MAX=251
```

`CONFIG_BT_L2CAP_TX_MTU=247` sets the maximum ATT MTU that the device will request during negotiation. The value 247 is commonly used because it aligns with the maximum single-packet data length (251 bytes at the Link Layer minus 4 bytes of L2CAP header).

`CONFIG_BT_BUF_ACL_RX_SIZE` and `CONFIG_BT_BUF_ACL_TX_SIZE` set the ACL buffer sizes to accommodate the larger packets. `CONFIG_BT_CTLR_DATA_LENGTH_MAX` enables Data Length Extension (DLE) at the controller level, allowing the Link Layer to send longer packets instead of fragmenting them into 27-byte chunks.

MTU negotiation happens automatically after a connection is established. The Zephyr stack initiates an MTU exchange on connection if the configured MTU is larger than the default. You can also trigger it explicitly:

```c
static void exchange_func(struct bt_conn *conn, uint8_t att_err,
                           struct bt_gatt_exchange_params *params)
{
    if (att_err) {
        printk("MTU exchange failed (err %u)\n", att_err);
        return;
    }

    uint16_t mtu = bt_gatt_get_mtu(conn);
    printk("MTU exchanged: %u bytes\n", mtu);
}

static struct bt_gatt_exchange_params exchange_params = {
    .func = exchange_func,
};

static void connected(struct bt_conn *conn, uint8_t err)
{
    if (err) {
        return;
    }

    bt_gatt_exchange_mtu(conn, &exchange_params);
}
```

The `bt_gatt_exchange_mtu` function sends an MTU exchange request to the remote device. The callback receives the result. After a successful exchange, `bt_gatt_get_mtu` returns the negotiated MTU, which is the minimum of both devices' supported MTU values. The effective payload per notification or write operation is the negotiated MTU minus 3 bytes of ATT header.

When sending large amounts of data over notifications, the effective throughput depends on three factors: the MTU (larger means fewer packets), the connection interval (shorter means more transmission opportunities), and the PHY (2M PHY doubles the raw data rate compared to 1M PHY).

With a 247-byte MTU, a 7.5 ms connection interval, and 2M PHY, you can achieve throughput in the range of 800 kbps to 1400 kbps, depending on the specific controller and radio conditions.

One practical consideration: iOS and Android handle MTU negotiation differently. Android allows you to request a specific MTU via the app layer, while iOS automatically negotiates the maximum supported MTU (typically 185 or 251 bytes depending on the iOS version) without app intervention. Your firmware should always handle whatever MTU is negotiated, rather than assuming a specific value.

---

## PHY Selection for Range and Speed

Bluetooth 5.0 introduced two new PHY (Physical Layer) options beyond the original 1M PHY. Selecting the right PHY trades off range, throughput, and power consumption.

**1M PHY** is the default and the only PHY available in Bluetooth 4.x. It transmits at 1 megabit per second with standard range. Every BLE device supports 1M PHY.

**2M PHY** doubles the data rate to 2 megabits per second. Each packet takes half as long to transmit, which means the radio is active for less time. This improves both throughput (more data per unit time) and power consumption (shorter radio on-time). The tradeoff is slightly reduced range compared to 1M PHY because the receiver has less time to integrate each bit. Use 2M PHY when the central and peripheral are close together (within a few meters) and throughput matters.

**Coded PHY** uses forward error correction to extend range significantly, approximately 2x to 4x compared to 1M PHY. It achieves this by transmitting each bit with redundant coding (S=2 for 2x range, S=8 for 4x range). The cost is reduced throughput: Coded PHY S=8 has an effective data rate of 125 kbps, which is 8x slower than 1M PHY. Use Coded PHY for applications that need long range (outdoor asset tracking, building-wide sensor networks) and can tolerate low data rates.

Enable PHY support in <VPIcon icon="fas fa-gears"/>`prj.conf`:

```ini title="prj.conf"
CONFIG_BT_USER_PHY_UPDATE=y
CONFIG_BT_CTLR_PHY_2M=y
CONFIG_BT_CTLR_PHY_CODED=y
```

`CONFIG_BT_USER_PHY_UPDATE=y` enables the application to request PHY updates after a connection is established. `CONFIG_BT_CTLR_PHY_2M` and `CONFIG_BT_CTLR_PHY_CODED` enable support for the respective PHYs in the controller.

Request a PHY update after connection:

```c
static void connected(struct bt_conn *conn, uint8_t err)
{
    if (err) {
        return;
    }

    /* Request 2M PHY for higher throughput */
    struct bt_conn_le_phy_param phy_param = {
        .options = BT_CONN_LE_PHY_OPT_NONE,
        .pref_tx_phy = BT_GAP_LE_PHY_2M,
        .pref_rx_phy = BT_GAP_LE_PHY_2M,
    };

    int phy_err = bt_conn_le_phy_update(conn, &phy_param);
    if (phy_err) {
        printk("PHY update request failed (err %d)\n", phy_err);
    }
}
```

The `bt_conn_le_phy_update` function sends a PHY update request to the remote device. The `pref_tx_phy` and `pref_rx_phy` fields indicate the preferred PHY for transmitting and receiving data, respectively. The remote device may accept or suggest an alternative. Both devices must support the requested PHY for the update to succeed.

To monitor PHY changes, register a callback:

```c
static void phy_updated(struct bt_conn *conn,
                         struct bt_conn_le_phy_info *param)
{
    printk("PHY updated: TX PHY %u, RX PHY %u\n",
           param->tx_phy, param->rx_phy);
}

BT_CONN_CB_DEFINE(conn_callbacks) = {
    .connected = connected,
    .disconnected = disconnected,
    .le_phy_updated = phy_updated,
};
```

The `le_phy_updated` callback fires whenever the PHY changes on a connection. The `tx_phy` and `rx_phy` fields report the active PHY for each direction. A value of 1 means 1M PHY, 2 means 2M PHY, and 4 means Coded PHY. The TX and RX PHYs can be different (asymmetric PHY), though most applications use the same PHY in both directions.

For Coded PHY with S=8 encoding (maximum range), set the options field:

```c
struct bt_conn_le_phy_param phy_param = {
    .options = BT_CONN_LE_PHY_OPT_CODED_S8,
    .pref_tx_phy = BT_GAP_LE_PHY_CODED,
    .pref_rx_phy = BT_GAP_LE_PHY_CODED,
};
```

The `BT_CONN_LE_PHY_OPT_CODED_S8` option selects S=8 coding, which provides the maximum range extension at the cost of the lowest throughput. Omitting this option (or using `BT_CONN_LE_PHY_OPT_CODED_S2`) selects S=2 coding, which provides moderate range extension with better throughput.

---

## Firmware Updates Over BLE

Deploying firmware updates to devices in the field is a critical capability for any production BLE product. Users shouldn't need to connect a USB cable or visit a service center to get bug fixes and new features.

Zephyr supports Device Firmware Update (DFU) over BLE through integration with MCUboot, a secure open-source bootloader.

The DFU architecture has two components. MCUboot is a bootloader that runs before your application. It manages two firmware slots: the active slot (running firmware) and the upgrade slot (new firmware waiting to be applied). When new firmware is written to the upgrade slot, MCUboot verifies its cryptographic signature, swaps the slots, and boots the new firmware. If the new firmware fails to confirm itself (mark itself as valid), MCUboot automatically rolls back to the previous version on the next reboot.

The BLE transport for DFU uses the SMP (Simple Management Protocol) over a GATT service. The mcumgr library implements SMP, and Zephyr includes a BLE SMP transport that exposes an SMP GATT service. A phone app (like nRF Connect or mcumgr CLI) connects to this service and uploads the new firmware image in chunks.

Enable DFU in your <VPIcon icon="fas fa-gears"/>`prj.conf`:

```ini title="prj.conf"
CONFIG_BOOTLOADER_MCUBOOT=y
CONFIG_MCUMGR=y
CONFIG_MCUMGR_TRANSPORT_BT=y
CONFIG_MCUMGR_GRP_IMG=y
CONFIG_MCUMGR_GRP_OS=y
CONFIG_IMG_MANAGER=y
CONFIG_STREAM_FLASH=y
CONFIG_FLASH_MAP=y
CONFIG_FLASH=y
```

`CONFIG_BOOTLOADER_MCUBOOT=y` tells the build system that this application runs under MCUboot, which changes the linker script and image format. `CONFIG_MCUMGR=y` enables the mcumgr management library. `CONFIG_MCUMGR_TRANSPORT_BT=y` enables the BLE SMP transport, which creates a GATT service that the phone connects to for uploading firmware. `CONFIG_MCUMGR_GRP_IMG=y` enables the image management command group (upload, confirm, erase). `CONFIG_MCUMGR_GRP_OS=y` enables the OS management group (reset, echo).

Register the BLE SMP transport in your application:

```c
#include <zephyr/mgmt/mcumgr/transport/smp_bt.h>

int main(void)
{
    int err;

    err = bt_enable(NULL);
    if (err) {
        printk("Bluetooth init failed (err %d)\n", err);
        return 0;
    }

    /* Start SMP BLE transport for DFU */
    smp_bt_register();

    /* Start advertising (include SMP service UUID) */
    bt_le_adv_start(BT_LE_ADV_CONN, ad, ARRAY_SIZE(ad), NULL, 0);

    printk("DFU-capable device ready\n");
    return 0;
}
```

The `smp_bt_register()` call registers the SMP GATT service with the Bluetooth stack. After this, any BLE central that connects can discover the SMP service and upload firmware using the mcumgr protocol.

Building with MCUboot requires flashing the bootloader first. MCUboot is built separately and programmed into the boot partition of flash:

```sh
west build -b nrf52840dk/nrf52840 bootloader/mcuboot/boot/zephyr \
-d build_mcuboot
west flash -d build_mcuboot

west build -b nrf52840dk/nrf52840 my_dfu_app
west flash
```

The first two commands build and flash MCUboot. The second two commands build and flash your application. MCUboot occupies the first portion of flash and boots your application from the primary slot.

To perform a DFU, you build a new version of your application, which produces a `zephyr.signed.bin` file in the build directory. Upload that file to the device using the nRF Connect mobile app (which has built-in DFU support) or the mcumgr command-line tool. The upload happens over the BLE SMP connection. After the upload completes, the device reboots, MCUboot verifies the new image, and swaps it into the active slot.

MCUboot supports several security features that are important for production. Image signing ensures that only firmware signed with your private key can be installed. Image encryption prevents reverse-engineering of firmware images during transfer. Rollback protection reverts to the previous firmware if the new version does not boot successfully. These features require additional configuration but are essential for any product that accepts over-the-air updates.

---

## Bluetooth Mesh on Zephyr

BLE point-to-point connections work well for devices that communicate directly with a phone or gateway. But they break down when you need to control hundreds of light bulbs in a building. You can't connect to each one individually. Bluetooth Mesh solves this.

Bluetooth Mesh is a many-to-many networking standard that runs on top of BLE. Devices in a mesh network relay messages to each other, extending the range far beyond a single BLE connection. A command to turn on the lights can originate from one device, bounce through multiple relay nodes, and reach every light bulb in the building.

Zephyr includes a complete Bluetooth Mesh implementation. Here's the conceptual architecture.

Mesh devices have roles. A **relay node** forwards messages from other devices, extending the network range. A **proxy node** bridges between GATT-connected devices (phones) and the mesh network, so a phone without mesh support can control mesh devices through a proxy. A **friend node** stores messages for nearby low-power nodes that spend most of their time sleeping. A **low-power node** periodically wakes up and asks its friend for any stored messages.

Mesh communication uses a publish/subscribe model. Devices publish messages to addresses, and devices subscribed to those addresses receive them. A light switch publishes "turn on" to a group address. All light bulbs subscribed to that group address turn on.

Data in mesh is organized using **models**. A model defines a set of messages that a device can send and receive. The Bluetooth SIG defines standard models for common use cases: Generic OnOff (on/off switches and lights), Generic Level (dimmers), Sensor (sensor data), and Lighting (color temperature, lightness, hue). You can also define custom models.

Here's a minimal mesh node configuration in <VPIcon icon="fas fa-gears"/>`prj.conf`:

```ini title="prj.conf"
CONFIG_BT=y
CONFIG_BT_MESH=y
CONFIG_BT_MESH_RELAY=y
CONFIG_BT_MESH_PB_ADV=y
CONFIG_BT_MESH_PB_GATT=y
CONFIG_BT_MESH_GATT_PROXY=y
CONFIG_BT_MESH_CFG_CLI=y
CONFIG_BT_MESH_HEALTH_SRV=y
```

`CONFIG_BT_MESH=y` enables the mesh stack. `CONFIG_BT_MESH_RELAY=y` makes this node relay messages for other nodes. `CONFIG_BT_MESH_PB_ADV=y` and `CONFIG_BT_MESH_PB_GATT=y` enable provisioning (the process of adding a device to the mesh network) over both advertising and GATT connections. `CONFIG_BT_MESH_GATT_PROXY=y` enables the proxy role for phone connectivity.

A full mesh application involves defining your composition data (what models your device supports), implementing model handlers, and setting up provisioning. The Zephyr samples directory (`samples/bluetooth/mesh/`) contains several complete examples including a light bulb, a light switch, and a sensor server that demonstrate the full pattern.

---

## LE Audio: The Next Generation of Bluetooth Audio

[**LE Audio**](/freecodecamp.org/the-bluetooth-le-audio-handbook/README.md) is the most significant addition to the Bluetooth specification in years. It replaces the Classic Bluetooth audio profile (A2DP) with a new system built entirely on BLE. Zephyr's implementation of LE Audio is one of the most complete available in any open-source stack.

The core of LE Audio is the LC3 (Low Complexity Communication Codec). LC3 provides better audio quality than the SBC codec used in classic Bluetooth audio, at half the bitrate. This means better sound quality and lower power consumption.

LE Audio introduces two communication modes. **Connected Isochronous Streams (CIS)** are point-to-point audio connections, similar to classic Bluetooth audio but more efficient. CIS is used for phone-to-earbud connections, hearing aids, and other paired audio scenarios.

**Broadcast Isochronous Streams (BIS)** are one-to-many broadcasts. A single source can broadcast audio to an unlimited number of receivers. This is the technology behind Auracast, which envisions public venues broadcasting audio that any compatible device can tune into (think: silent TVs in airports, hearing assistance in theaters, multi-language broadcasts in conference halls).

Zephyr implements the full LE Audio profile stack: BAP (Basic Audio Profile), PACS (Published Audio Capabilities), ASCS (Audio Stream Control), VCP (Volume Control), MCP (Media Control), CCP (Call Control), TMAP (Telephony and Media Audio Profile), and CAP (Common Audio Profile).

The <VPIcon icon="fas fa-gears"/>`prj.conf` for an LE Audio project includes:

```ini title="prj.conf"
CONFIG_BT=y
CONFIG_BT_AUDIO=y
CONFIG_BT_BAP_UNICAST_SERVER=y
CONFIG_BT_PACS=y
CONFIG_BT_ASCS=y
CONFIG_BT_ISO=y
CONFIG_BT_PAC_SNK=y
CONFIG_BT_PAC_SRC=y
```

LE Audio development is considerably more complex than basic BLE peripheral development. It involves managing isochronous channels, configuring codec parameters, handling audio data streams, and implementing the various profile layers. The Zephyr samples in <VPIcon icon="fas fa-folder-open"/>`samples/bluetooth/bap_unicast_server` and <VPIcon icon="fas fa-folder-open"/>`samples/bluetooth/bap_broadcast_source` are the best starting points.

If you're building hearing aids, earbuds, or any audio device, LE Audio on Zephyr is worth serious investment. The open-source stack gives you full visibility into the implementation, and Nordic's nRF5340 and nRF54 series chips provide the hardware support needed.

---

## Debugging Bluetooth Applications

BLE applications are harder to debug than regular embedded applications because the radio communication is invisible. You can't set a breakpoint in the air. Here are the tools and techniques that make BLE debugging manageable.

**Zephyr's logging subsystem** is your first line of defense. Enable detailed Bluetooth logging in <VPIcon icon="fas fa-gears"/>`prj.conf`:

```ini title="prj.conf"
CONFIG_LOG=y
CONFIG_BT_DEBUG_LOG=y
CONFIG_BT_LOG_LEVEL_DBG=4
```

`CONFIG_LOG=y` enables the logging framework. `CONFIG_BT_DEBUG_LOG=y` and `CONFIG_BT_LOG_LEVEL_DBG=4` enable debug-level logging for the Bluetooth stack.

This produces verbose output showing every HCI command, advertising event, connection event, GATT operation, and error. The output goes to the console (typically UART). It's extremely verbose, so only enable it during active debugging.

**The Zephyr shell** provides an interactive command line for Bluetooth operations:

```ini title="prj.conf"
CONFIG_SHELL=y
CONFIG_BT_SHELL=y
```

With these enabled, you get shell commands like `bt init`, `bt advertise on`, `bt connect`, `bt gatt discover`, and `bt gatt read` that let you control and inspect the Bluetooth stack interactively over the serial console. This is invaluable for testing because you can manually trigger operations and see the results without modifying firmware.

**nRF Connect for Mobile** (iOS/Android) is an essential companion tool. Beyond scanning and connecting, it displays all GATT services and characteristics, lets you read/write/subscribe to characteristics, shows raw advertising data, and logs BLE events with timestamps. Use it to verify that your device is advertising correctly, that your GATT database looks right, and that reads/writes/notifications work as expected.

**Bluetooth sniffers** capture the actual radio packets. The nRF52840 DK can be used as a sniffer with Nordic's nRF Sniffer for Bluetooth LE firmware. Combined with Wireshark (which has BLE protocol dissectors), you can inspect every packet on the wire: advertising PDUs, connection events, GATT requests/responses, and pairing exchanges. This is the ultimate debugging tool when something at the protocol level isn't working.

**Common debugging patterns.** If advertising isn't visible, check that the advertising data doesn't exceed 31 bytes (for legacy advertising) and that the flags field is present.

If connections drop immediately, check that `CONFIG_BT_PERIPHERAL` is enabled (not just `CONFIG_BT_BROADCASTER`). If GATT reads return zero-length data, verify that your read callback returns the correct value from `bt_gatt_attr_read`. If notifications don't arrive, confirm that the central has written 0x0001 to the CCCD. If pairing fails, ensure `CONFIG_BT_SMP=y` is set and the authentication callbacks are registered.

---

## Power Optimization for BLE Devices

A BLE device that drains its battery in a week is a failed product. Power optimization isn't an afterthought – it's a core design constraint. Zephyr provides the tools, but you have to use them correctly.

The biggest power consumer in a BLE device is the radio. Every advertising event, connection event, and scan window activates the radio transmitter or receiver for milliseconds at a time, consuming milliamps of current. Reducing radio usage is the primary lever for extending battery life.

For advertising, increase the advertising interval. An interval of 1000 ms uses roughly 5x less power than an interval of 200 ms. If fast discovery isn't critical, use an even longer interval.

You can also use a two-phase approach: advertise at a fast interval (100 ms) for the first 30 seconds after power-on, then switch to a slow interval (1000 ms) for the steady state. Zephyr's advertising API supports changing parameters while advertising.

For connected devices, use the peripheral latency parameter. A peripheral latency of 4 means the peripheral can skip 4 connection events before it must respond. If the connection interval is 50 ms and the peripheral latency is 4, the peripheral only wakes up every 250 ms instead of every 50 ms. Request a longer connection interval from the central when high-throughput isn't needed:

```c
static struct bt_le_conn_param conn_params = {
    .interval_min = 80,   /* 100 ms (units of 1.25 ms) */
    .interval_max = 160,  /* 200 ms */
    .latency = 4,
    .timeout = 400,       /* 4 seconds (units of 10 ms) */
};

/* After connection is established: */
bt_conn_le_param_update(conn, &conn_params);
```

The `bt_conn_le_param_update` function sends a connection parameter update request to the central. The central may accept or reject the request. Most centrals (phones) accept reasonable parameter ranges.

Enable Zephyr's system power management:

```ini title="prj.conf"
CONFIG_PM=y
CONFIG_PM_DEVICE=y
```

With power management enabled, the kernel puts the processor into a low-power state whenever no threads are ready to run.

On an nRF52840, the idle current drops from roughly 3 mA (active) to about 1.5 microamps (System OFF with RAM retention). The difference is enormous. The Zephyr power management policy automatically selects the deepest sleep state that the system can enter given the next scheduled wake-up event.

Disable unused peripherals in your devicetree overlay. Every enabled peripheral (UART, SPI, I2C) consumes power even when idle. If you don't need UART in production (you used it only for development logging), disable it:

```dts
&uart0 {
    status = "disabled";
};
```

Measure your actual current consumption. Tools like the Nordic Power Profiler Kit II show real-time current draw at microamp resolution. Zephyr's `CONFIG_THREAD_ANALYZER` helps you right-size thread stacks (over-allocated stacks waste RAM, which means more RAM needs to be powered).

The goal for a well-optimized BLE sensor is single-digit microamp average current, which translates to years of operation on a coin cell battery. Zephyr makes this achievable, but it requires attention to every layer: radio scheduling, peripheral management, clock configuration, and application design.

---

## Zephyr Bluetooth vs Other Stacks

When choosing a Bluetooth stack, you have options. Here is how Zephyr compares.

### 1. Zephyr vs. Nordic SoftDevice

Nordic's SoftDevice was their proprietary BLE stack before they moved to Zephyr. SoftDevice was a pre-compiled binary blob: you couldn't read or modify the stack code. Nordic's nRF Connect SDK (built on Zephyr) replaces SoftDevice with Zephyr's open-source stack. If you're starting a new Nordic project, use Zephyr. SoftDevice is legacy.

### Zephyr vs. NimBLE (Apache Mynewt)

NimBLE is a lightweight, open-source BLE host stack originally from the Apache Mynewt project (also usable standalone and ported to ESP-IDF). NimBLE is smaller than Zephyr's stack and may be a better fit for extremely RAM-constrained devices. Zephyr's stack is more feature-complete (LE Audio, Mesh, Direction Finding) and has broader industry adoption. For new products, Zephyr is the stronger choice unless you are severely RAM-constrained.

### Zephyr vs. ESP-IDF Bluetooth

Espressif's ESP-IDF includes a Bluetooth stack (Bluedroid or NimBLE) for ESP32 chips. If you're exclusively using ESP32 hardware, ESP-IDF is a valid choice. Zephyr supports ESP32 and gives you portability to other hardware, a unified build system, and a more comprehensive BLE feature set. If you might ever need to switch chips, Zephyr's portability is a significant advantage.

### Zephyr vs. vendor SDKs with proprietary stacks

Many chip vendors provide their own BLE SDKs with closed-source stacks. These work well but lock you into that vendor's ecosystem. Zephyr gives you portability, open source, and the collective effort of a large community. The trade-off is a steeper learning curve.

For a product that needs to ship on a timeline with one known chip, a vendor SDK might be faster to start with. For a product line that spans multiple chips or that values long-term maintainability, Zephyr wins.

---

## Where to Go from Here

We've covered a lot of ground in this handbook. You should now understand BLE fundamentals, GAP advertising, GATT services, connections, notifications, pairing, Mesh, LE Audio, debugging, and power optimization. You've written code for every major concept. Here's how to continue.

Explore the Zephyr Bluetooth samples directory (<VPIcon icon="fas fa-folder-open"/>`zephyr/samples/bluetooth/`). It contains over 30 Bluetooth-specific examples. The `peripheral_hr` sample implements a complete Heart Rate profile. The `central` sample shows how to build a scanning/connecting central role. The <VPIcon icon="fas fa-folder-open"/>`mesh/` subdirectory has light switch, light bulb, and sensor examples for Mesh development. The `bap_*` samples demonstrate LE Audio.

Read the Zephyr Bluetooth documentation at `docs.zephyrproject.org/latest/connectivity/bluetooth/`. The API reference covers every function, macro, and configuration option. The Bluetooth architecture documentation explains how the host, controller, and HCI layers interact.

Get an nRF Connect SDK setup if you are using Nordic hardware. The nRF Connect SDK adds Nordic-specific features on top of Zephyr, including their Bluetooth libraries, proprietary wireless protocols (ESB, Gazell), and cellular modem support. It uses the same Zephyr kernel and build system.

Build something real. A BLE remote control for your desk lamp. A sensor that reports room temperature and humidity to your phone. A custom keyboard with BLE connectivity. A pet tracker.

The best way to solidify this knowledge is to encounter and solve real problems on real hardware. Every BLE product has its quirks (connection parameter negotiation with iOS vs Android, handling reconnection after bond loss, managing MTU size for efficient data transfer), and you learn those quirks by building.

The BLE ecosystem is enormous and growing. Zephyr gives you a production-quality, open-source foundation to build on, with a community and corporate backing that ensures it will be actively developed for years to come. You now have the knowledge to start building on it.

---

## Summary

This handbook covered the full spectrum of Bluetooth development on Zephyr OS, from foundational concepts to production-ready features.

The BLE fundamentals section established the mental model that everything else builds on: GAP controls discovery and connections, GATT defines how data is structured and exchanged, services and characteristics form the API of your device, and UUIDs identify every component. These concepts are not Zephyr-specific – they apply to any BLE stack.

On the Zephyr side, you built progressively more complex applications. The beacon demonstrated the minimal BLE setup: initialize the stack and start advertising. The LED service introduced GATT with read and write characteristics, showing how to control hardware from a phone. The notification examples added real-time data push, and the complete sensor node tied together advertising, GATT, connection management, and periodic data delivery into a single cohesive application.

Each of these patterns (advertising data construction, GATT callback signatures, CCC handling, connection reference management) will appear in every BLE project you build.

The standard Heart Rate profile showed how SIG-defined 16-bit UUIDs integrate with Zephyr's predefined UUID macros, enabling interoperability with generic BLE apps.

The central role example demonstrated the other side of BLE: scanning, connecting, and discovering services on remote devices. MTU negotiation and PHY selection are the two primary levers for optimizing data throughput and range after a connection is established, and both require coordinated configuration in Kconfig and runtime API calls.

The DFU section addressed the production requirement of field-updatable firmware, integrating MCUboot with SMP over BLE.

Beyond point-to-point connections, Bluetooth Mesh extends BLE into many-to-many networks for building automation and large-scale IoT deployments, while LE Audio represents the next generation of wireless audio with the LC3 codec and broadcast capabilities. Pairing and security protect production devices from unauthorized access. Power optimization, debugging tooling, and stack comparison round out the practical knowledge needed to ship a real product.

The code patterns and Kconfig options presented here form the toolkit for building any BLE device on Zephyr, from a simple beacon to a complex multi-protocol gateway.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Bluetooth Applications with Zephyr OS: A Handbook for Devs",
  "desc": "Your phone just connected to wireless earbuds, your smartwatch synced health data to an app, and a sensor somewhere in your building reported its temperature to a gateway. All of those interactions ha",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-bluetooth-applications-with-zephyr-os-a-handbook-for-devs/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
