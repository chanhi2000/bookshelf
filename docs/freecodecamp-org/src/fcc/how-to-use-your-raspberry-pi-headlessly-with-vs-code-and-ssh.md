---
lang: en-US
title: "How to Use Your Raspberry Pi Headlessly with VS Code and SSH (No Monitor Needed)"
description: "Article(s) > How to Use Your Raspberry Pi Headlessly with VS Code and SSH (No Monitor Needed)"
icon: fa-brands fa-raspberry-pi
category:
  - DevOps
  - Linux
  - Debian
  - Raspberry Pi
  - VSCode
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - linux
  - debian
  - raspberry-pi
  - vscode
  - visualstudiocode
  - productivity
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Your Raspberry Pi Headlessly with VS Code and SSH (No Monitor Needed)"
    - property: og:description
      content: "How to Use Your Raspberry Pi Headlessly with VS Code and SSH (No Monitor Needed)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-your-raspberry-pi-headlessly-with-vs-code-and-ssh.html
prev: /devops/linux-debian/articles/README.md
date: 2025-05-27
isOriginal: false
author:
  - name: Josiah Adesola
    url : https://freecodecamp.org/news/author/josiahadesola/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1748452192906/594a76a0-be8f-478b-a9ae-e3ba55850c65.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Raspberry Pi > Article(s)",
  "desc": "Article(s)",
  "link": "/hw/raspberry-pi/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "VSCode > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/vscod/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Your Raspberry Pi Headlessly with VS Code and SSH (No Monitor Needed)"
  desc="The Raspberry Pi is a portable computer with an onboard processor that fits comfortably in the palm of your hand. Compared with general purpose computers, it’s an affordable option developed by the Raspberry Pi Foundation. The Raspberry Pi Model B wa..."
  url="https://freecodecamp.org/news/how-to-use-your-raspberry-pi-headlessly-with-vs-code-and-ssh"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1748452192906/594a76a0-be8f-478b-a9ae-e3ba55850c65.png"/>

The Raspberry Pi is a portable computer with an onboard processor that fits comfortably in the palm of your hand. Compared with general purpose computers, it’s an affordable option developed by the [<VPIcon icon="fa-brands fa-raspberry-pi"/>Raspberry Pi Foundation](https://raspberrypi.org/).

The Raspberry Pi Model B was introduced in 2012 as the first sellable unit, and the company has since released many more models. There are even low-cost models like the Raspberry Pi Zero Series, which is quite small and tailored to embedded systems applications. All the models operate on an operating system called the Raspberry Pi OS, a Linux flavor niched for Raspberry PI Computers.

![A Raspberry Pi Model 4B single-board computer with visible ports, components.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747912686077/498ff16a-c6a0-4774-b6e4-a0d573afd4f8.jpeg)

In this tutorial, we’ll be using the Raspberry Pi 4 Model for a headless setup through a SSH connection using Visual Studio Code (VS Code). The Raspberry Pi 4 Model has a Quad-core ARM Cortex-A72 (64-bit) SoC at 1.5GHz, up to 8GB RAM options, video inputs, Ethernet shield, USB ports, MicroSD card slot for storage, USB-C power input and 40 General Purpose Inputs and Outputs Pins (GPIO). Impressive, right?

You’ll be able to use the Raspberry Pi as a personal computer, for home automation and IoT projects, robotics projects, network applications, educational tools, and Artificial Intelligence projects.

---

## Understanding the Headless Setup

Many Raspberry Pi computers are sold with additional peripherals, including a keyboard, mouse, and monitor, that are essential for the Raspberry Pi's setup. A headless setup is the process of configuring the Raspberry Pi or preparing it for use without needing these peripherals. This entails operating the Raspberry Pi through a network protocol like SSH (Secure Shell) or VNC (Virtual Network Computing).

This is really helpful when you don’t need peripherals, as it lets you use your personal computer to connect to the Raspberry Pi without needing to purchase specialized peripherals. It’s also excellent for remote access. This headless setup is also essential for remote monitoring systems, such as surveillance systems with remote camera access, and IoT systems.

[![A Raspberry Pi 400 in use on a desk, with a mouse and monitor connected](https://assets.raspberrypi.com/static/neat-lg@2x-38697d13d9952791ca96da4891de9a12.jpg)](https://raspberrypi.com/products/raspberry-pi-400/)

Remote development lets you write code and modify your Raspberry Pi and other devices connected to the GPIO pins through a headless configuration via SSH.

SSH guarantees a secure connection for transferring and modifying files, as well as transferring and debugging commands from one computer (your personal computer) to another computer (the Raspberry Pi). It restricts unauthorized access from any other system that aims to intercept the communication channel.

::: note Prerequisites

Here’s what you’ll need to follow along with this tutorial:

**Hardware Requirements**

1. Raspberry Pi 4 or 5
2. MicroSD Card (8GB or higher recommended)
3. Flash Drive with SD Card Slot or a MicroSD Card Adapter
4. Power Supply (5V 2A/3A)
5. Network Connection (Wi-Fi, Pi, and laptop must be on the same network)
6. Personal Computer (Windows, macOS, Linux)

**Software Requirements**

1. Raspberry Pi Operating System (Raspberry Pi OS)
2. Visual Studio Code
3. Remote SSH Extension in VS Code

:::

---

## Preparing the MicroSD Card

The Raspberry Pi requires a MicroSD Card that serves as the storage of your the Raspberry Pi OS using Raspberry Pi Imager. The operating system of the Raspberry Pi provides a graphical interface to interact with the Raspberry Pi, store files and datasets, and write commands to get your Raspberry Pi working.

But the Raspberry Pi needs an empty MicroSD Card to install the Raspberry Pi OS in the MicroSD Card. Here are some step by step instructions that’ll show you how to get your MicroSD Card setup before inserting it back into the Raspberry Pi for SSH Connection.

### Downloading and flashing Raspberry Pi OS

#### Insert your MicroSD Card into a flash drive with a SD Card slot

Aside from using a flash drive with an SD Card slot (so as to get the memory card connected to the computer), you can also use a SD Card adapter. Make sure it’s inserted into your computer where you have the Raspberry PI Imager downloaded to flash - that is, transfer the OS into the SD Card.

![My flash drive with an SD card slot](https://cdn.hashnode.com/res/hashnode/image/upload/v1747921369222/7deebdff-d0bc-4f08-9aab-07c562a712bd.jpeg)

::: info

Download the [<VPIcon icon="fa-brands fa-raspberry-pi"/>Raspberry Pi Imager](https://raspberrypi.com/software/) based on your PC’s operating system

This involves clicking the link and selecting your operating system (either MacOS, Windows or Linux operating system). The Raspberry Pi OS comes in these variants for different OSes

![Screenshot of a webpage from raspberrypi.com showing instructions for installing Raspberry Pi OS using Raspberry Pi Imager. It includes download links for Windows, macOS, and Ubuntu. There is a command for installing on Raspberry Pi OS and an image of the Raspberry Pi Imager interface.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747922079380/d1aa21cb-3166-4924-8f98-e2f16816fec6.png)

:::

#### Next, install and open the Raspberry Pi imager

Click the Raspberry Pi Imager download, follow all the instructions during the installation process. Once this screen pops up, you’re good to go!

![The image shows the Raspberry Pi Imager v1.8.5 interface. It has options to "Choose Device," "Choose OS," and "Choose Storage." There is also a faded "Next" button at the bottom. The background is a shade of raspberry red.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747922173921/02e58463-0634-41d6-bc85-0a1a3a199996.png)

#### Choose your Raspberry Pi Device and operating system and select Storage

For each of the three configurations, you must select one sequentially. Select a device according to the type of Raspberry Pi you have, and various options will appear. I selected the Raspberry Pi 4, as it is my preferred device. You may choose between the Raspberry Pi 5 and the Raspberry Pi Zero 2 W, depending on your device requirements.

Next, proceed to the operating system - I would recommend choosing the 64-bit version. While many people opt for the legacy version (32-bit), I think the 64-bit version is best. Once you're finished, you can choose a storage option, and your MicroSD should appear. My storage is around 128GB, which is why you can see 125.1GB displayed there in the screenshot below:

![Screenshot of the Raspberry Pi Imager v1.8.5 interface. It shows options for selecting a Raspberry Pi device, operating system, and storage. Available devices include Raspberry Pi 5, 4, and Zero 2 W. Operating systems listed are Raspberry Pi OS in 64-bit and 32-bit versions, and there is a USB device listed for storage.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747922610658/d5f4c750-ab40-47ed-8c0c-fe5951f68660.png)

#### Click on “Next” and edit the settings

It is a customary practice to keep your username as "pi", but it’s not required. The goal is to have something simple and easy to remember when setting up your SSH connection. It’s also helpful to make your password simple. I used 'roboticsai'.

Try to avoid using numbers simply to make things easier, because you may not be able to see what you are entering in the terminal. Then, make sure that your wireless LAN and SSID (WIFI or Hotspot name if you're using a phone, as well as the password for your WIFI or Hotspot) is the same network as the one linked to your computer.

![Setting up the username and password of the Raspberry Pi](https://cdn.hashnode.com/res/hashnode/image/upload/v1747922797428/c1a1ae55-e109-4a35-878c-820d1ef3f406.png)

#### Click on “SERVICES” and enable SSH. Then use password authentication for security and Click on “SAVE”

After you've completed the changes in the General Section, go to the Services section and click the checkbox button “*Enable SSH*”. Once highlighted, make sure you pick “*Use password authentication*”, avoid the “*RUN SSH-KEYGEN*” button at the moment, and then click Save.

![Screenshot of an OS customization window under the "Services" tab. "Enable SSH" is checked, with "Use password authentication" selected. An option for "Allow public-key authentication only" is available. A disabled "RUN SSH-KEYGEN" button and a "SAVE" button are visible.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747923037374/b6c63a5a-e3b6-4c9f-9612-53df7e566e41.png)

#### Click “YES” to apply the customizations, and the Raspberry Pi OS should get flashed into your SD Card

Following the previous stage, you will be shown various buttons to apply the adjustments you have made. Pick yes, and the Raspberry Pi OS will be flashed or transferred to your Memory Card. This could take between 10 and 20 minutes to go from transferring to writing or customizing. Hold on and enjoy the process.

![Raspberry Pi Imager dialog box offering to apply OS customisation settings with options to edit, clear, accept, or decline.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747923100214/d86fca18-e540-4844-9f26-5253ef5b04b8.png)

#### After a successful installation into the disk, remove your SD Card

You will receive a successful popup like the one shown below. This demonstrates that all processes were completed successfully, and the Raspberry Pi OS is now installed.

![A notification on Raspberry Pi Imager v1.8.5 shows that Raspberry Pi OS (64-bit) has been successfully written to a mass storage device USB. It instructs to remove the SD card and has a "Continue" button.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747926095493/ed017dc6-e3a5-4cda-8b3c-6f6a2d74c1ac.png)

---

## How to Boot the Raspberry Pi

### Eject the MicroSD safely from your computer

Once the installation is successful, eject the MicroSD safely from the computer.

![The Raspberry Pi Board with a micro SD card slot is placed on a wooden surface. A SanDisk 128 GB micro SD card lies next to it.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747926401040/a37dafbb-68ae-4884-9ffe-3c374e6b62b9.jpeg)

### Insert it “upside down” into the MicroSD card slot of your Raspberry Pi

To properly insert the MicroSD card, place it gently into the slot with the back or gold side facing upward. It will protrude slightly once it is inserted. You are good to go!

![A Raspberry Pi single-board computer placed on a gray surface, displaying various ports and components including USB ports and an HDMI connector.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747926384277/f7a0c5e9-6a13-4cd2-b94a-65b329a08a5c.jpeg)

### Connect the USB-C port of your Raspberry Pi to your computer. Give the Raspberry Pi some time to load

Get a USB-C cable and connect one end to your Raspberry Pi's USB-C port and the other to a laptop port. It should light up red, indicating that there is an adequate power source. You may also power your Raspberry Pi directly by plugging into a wall socket.

![A Raspberry Pi connected to a laptop via a USB cable on a wooden surface.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747926452530/b023abe6-5555-4d61-ab99-0d8e36a828a4.jpeg)

After a while, the memory card should begin to boot into the Raspberry Pi, and the green LED will blink for a while. In the next section, we’ll talk about the different states of the two LEDs during and after a successful boot.

---

## Understanding the LED Status of the Raspberry Pi During Setup

The below table describes the LED statuses you might see when you power on your Raspberry Pi and the SD Card is in the slot.

| **LED Color** | **State/Pattern** | **Meaning/Recommendation** |
| --- | --- | --- |
| 🔴Red | Solid (ON) | Stable and sufficient power supply |
| 🔴Red | Off or Blinking | Undervoltage detected (Use a direct phone Charger connected to a Socket) |
| 🟢Green | Blinking (Irregular Pattern) | SD Card is being read/written (normal booting activity) |
| 🟢Green | Solid (ON) | Raspberry Pi is stuck or trying to boot. |
| 🟢Green | Off | No SD Card detected or boot completed |
| 🟢Green | Repeated blink patterns (for example 4 long, 4 short) | Error code indicating firmware issues. |
| 🟢Green | Constant Blinking | Normal activity (Raspbian OS is loading and running smoothly) |

---

## How to Establish an SSH Connection

The SSH (Secure Shell) connection is a network protocol that allows two computers to safely communicate without leaking any information. It’s also used for remote command line execution and for file transfers between two computers.

To establish an SSH connection, you’ll have to complete a few steps. Then I’ll explain how to enable SSH using a Visual Studio Code extension

### Create a <VPIcon icon="fas fa-file-lines"/>`wpa_supplicant.conf.txt` **in the same folder of your Raspberry Pi SD Card

Insert your MicroSD card back into the computer. Then the files that comprise the Raspberry Pi OS will appear on your computer. Create a new text (.txt) document on your computer, similar to the image below, under the SD Card storage section.

Add the code below, making sure that "ssid" is the name of your Wi-Fi network and "psk" is your network's password.

```plaintext title="wpa_supplicant.conf.txt"
country=NG # Your 2-digit country code
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
network={
    ssid="Josiah"
    psk="roboticsai"
    key_mgmt=WPA-PSK
}
```

### Save the file on the same SD Card

Once you've finished producing the text file, save it to the SD Card storage, as shown in the image below.

![Screenshot of a file explorer window showing contents of the "bootfs (D:)" directory. Various system and configuration files are listed, including kernel images and .elf files. The selected file is "wpa_supplicant.conf.txt".](https://cdn.hashnode.com/res/hashnode/image/upload/v1747928812199/fb766a84-7750-468d-ae78-1ff3c688a52b.jpeg)

### Create a <VPIcon icon="fas fa-folder-open"/>`.ssh` folder

In your personal computer, create a <VPIcon icon="fas fa-folder-open"/>`.ssh` folder if it doesn’t exist on your personal computer.

If it exists, the <VPIcon icon="fas fa-folder-open"/>`.ssh` folder should contain files like `id_rsa`, `known_hosts`, and `config` files. It shouldn’t be empty.

![A computer file explorer window showing a list of folders in the <VPIcon icon="fas fa-folder-open"/>`JOSIAH` directory. The folder names include <VPIcon icon="fas fa-folder-open"/>`.matplotlib`, <VPIcon icon="fas fa-folder-open"/>`.mchp_cm`, <VPIcon icon="fas fa-folder-open"/>`.ssh`, and others, with details like date modified and type. The `.ssh` folder is highlighted.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747928560247/d07f8cb9-ec22-47ff-a2a5-d18b614e9985.png)

After a successful boot, open your terminal or command line application on your personal computer.

![Command Prompt window showing "Microsoft Windows [Version 10.0.26100.3915]" and the prompt at "C:sersOSIAH>".](https://cdn.hashnode.com/res/hashnode/image/upload/v1747928958812/2c198297-08a5-4781-9a6a-45fd6c7e85d3.png)

Make sure that the Raspberry Pi is connected to the same network before moving ahead. Once your wifi or mobile hotspot is switched on, make sure it’s the same password as the `wpa_supplicant.conf.txt` and the settings page while installing the Raspberry Pi.

As long as the SD card is in the Raspberry Pi and there is adequate power supply for at least 2-5 minutes, the Raspberry Pi will get connected to the wifi or your mobile hotspot.

![Screenshot of connected devices interface showing a limit of 3 devices. Two devices are listed: "raspberrypi" with MAC address d8:3a:dd:43:27:71, and "Josiah" with MAC address dc:71:96:d0:d5:4a. A blocklist option is available for viewing devices not allowed to connect.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747931364223/13947f34-c1a9-4b1c-b020-c236b4d377af.jpeg)

### How to Resolve Connection Problems

If there is no connection, reinstall the Raspberry Pi OS Imager on the SD Card again. Then you can also change the network AP Band from 5GHz to 2.5GHz or vice-versa. This can be very tricky.

It should get connected after trying this. Just make sure that the passwords are consistent and that you don’t accidentally have the caps lock key switched on while typing, for example.

![Screenshot of a portable hotspot setup screen showing fields for network name, password, security setting (WPA2-Personal), AP band selection (5 GHz), and an option to hide the SSID, which is off.](https://cdn.hashnode.com/res/hashnode/image/upload/v1748028008935/192fb282-93c7-4b65-86a2-c26cdfac9d53.jpeg)

To confirm if the Raspberry Pi is connected using the command line interface, use the `ping` command - it shows the devices connected to the device.

```bash
ping raspberrypi.local
```

After running the above command, you should see an image showing the connection once it’s successful like this:

![A command prompt window showing a ping test to "raspberrypi.local" with an IPv6 address. Four packets are sent and received with no loss. Round trip times range from 6ms to 125ms, with an average of 36ms.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747931544791/77217325-4f3e-4abb-a136-d4634b773f2d.png)

For establishing an SSH connection using the terminal, run the code below:

```bash
ssh pi@raspberrypi.local
```

This will result in a request for a password. If it shows an error like the image below, it means you have to delete the `known_hosts.old` and `known_hosts` if either or both exist in the <VPIcon icon="fas fa-folder-open"/>`.ssh` folder in your PC. This is because the keys are conflicting with each other. Then re-run the above code `ssh pi@raspberrypi.local` in your terminal.

![SSH warning message indicating a change in the remote host identification for a Raspberry Pi, suggesting possible eavesdropping or a host key update. Offers instructions for resolving the issue by updating the known_hosts file.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747931933273/d8f111cc-3455-4de3-af0c-cf0a9814a877.png)

After successful entry, type “`yes`” in the terminal.

![Command-line interface showing an SSH connection attempt to a Raspberry Pi. It prompts the user to confirm the authenticity of the host with a given key fingerprint, asking if they want to continue connecting.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747932392301/a09ad065-8e1e-464f-baef-5529eee26ce4.png)

`Connection Closed` should show when the connection is successful.

![Screenshot of a terminal window showing an SSH connection attempt from a user to a Raspberry Pi. The authenticity of the host is questioned, asking for confirmation to continue. The fingerprint is displayed, indicating it's not previously known. The connection is then added to known hosts, before closing.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747932449402/bcd16bc6-18a1-4a84-82cf-d5c7431345e3.png)

---

## How to Set Up Visual Studio Code for Remote Development

Download and install [Visual Studio Code](https://code.visualstudio.com/) if you don’t have it already.

Then, click on the VS Code extension and search for `Remote - SSH` by Microsoft and install it to your machine.

![Screenshot of the Visual Studio Code extension marketplace displaying the "Remote - SSH" extension by Microsoft. It shows installation details, ratings, and features like using a remote machine with SSH for development. The left sidebar lists related extensions.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747933199343/2c181e3a-80bd-44d1-8b40-5e3cf6191f2b.png)

Next, click on the “Remote Explorer” icon that looks like a monitor. Select the SSH config in your `C:\Users\{name}.ssh\config` folder.

![Screenshot of Visual Studio Code showing the Remote - SSH extension interface. The SSH configuration file selection is open, displaying file paths. On the right, there is a description and installation details for the extension, including version and update information. The left sidebar displays a connection to a remote SSH machine named "raspberrypi".](https://cdn.hashnode.com/res/hashnode/image/upload/v1747933364169/7eaa4a7b-294c-41ef-8ecb-fe80151e6399.png)

Make sure the config has this command:

```bash
Host raspberrypi.local
    HostName raspberrypi.local
    User pi
```

![611b6a3d-cd4c-4756-982b-76efb0aa25c9](https://cdn.hashnode.com/res/hashnode/image/upload/v1747933533204/611b6a3d-cd4c-4756-982b-76efb0aa25c9.png)

Enter your username as `raspberrypi.local` and input your password - the same as the password during loading Raspbian OS.

![Visual Studio Code interface showing a prompt to enter a password for "pi@raspberrypi.local" to set up an SSH host. The background features a shortcut guide and a loading bar.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747933839359/7f43b231-5177-4b11-9d10-7234961db3f7.png)

After inputting the correct password, it should start downloading the server.

![Visual Studio Code interface showing keyboard shortcuts for various commands. A download progress bar at the bottom indicates "Downloading VS Code Server…"](https://cdn.hashnode.com/res/hashnode/image/upload/v1747933859344/0c87fd5c-071b-4016-b113-4fc88c166032.png)

Congratulations! The image below has a blue rectangle button showing `SSH:raspberrypi.local` which shows a successful SSH Connection through Visual Studio Code. This also means you can start remote development as we discussed earlier in this tutorial.

![A screenshot of Visual Studio Code's welcome screen. The interface lists options to open a folder or clone a repository. The "Start" section has options like "New File" and "Open Folder." The "Recent" section displays a list of recently accessed projects. The "Walkthroughs" area suggests getting started guides. The sidebar on the left shows file explorer and other icons. The bottom status bar indicates an SSH connection.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747933925369/a2aaf412-e465-47e9-8e97-129734f87534.png)

---

## How to Write and Run the Code Remotely

Create a new file on your VS Code. This way, you’re creating files and writing to them directly. Go to the terminal and type the commands to create a folder and a file:

![Screenshot of Visual Studio Code showing a terminal session and a text editor. The terminal is open at the bottom, with commands for creating a directory, navigating to it, and opening it in the editor. The main editor area prompts to select a language or open a different editor. The Explorer sidebar is visible on the left.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747934210225/a6e7f454-6f65-4a87-8692-cadaa642b007.png)

### **Create a new file and write in your code**

Create a new file and name it `led.py` on your Visual Studio Code. It should be in the same folder as `test-raspberry` on the Raspberry Pi remote network through the SSH connection on VSCode.

Once you have your file created, you can write in your code such as blinking LED to a Raspberry Pi, as you can see in the code below:

```python
from gpiozero import LED
from time import sleep

# Set the GPIO pin where the LED is connected
led = LED(17)  # Replace 17 with your GPIO pin number

# Blink the LED in a loop
while True:
    led.on()        # Turn LED on
    sleep(1)        # Wait for 1 second
    led.off()       # Turn LED off
    sleep(1)        # Wait for 1 second
```

After writing this code in the new file you’ve created, run the code by typing the command below in your terminal:

```bash
python led.py
```

As soon as this command is sent, the LED positive terminal is connected to the GPIO 17 according to the code and the negative terminal is connected to the GND GPIO pin of the Raspberry Pi. The image from [Random Nerd Tutorials](https://randomnerdtutorials.com/raspberry-pi-pinout-gpios/) below shows the GPIO pins and their number to understand the connection. Just note that the connection of the LED is beyond the scope of this tutorial.

![Raspberry Pi Pinout Guide: How to use the Raspberry Pi GPIOs? | Random Nerd  Tutorials](https://i0.wp.com/randomnerdtutorials.com/wp-content/uploads/2023/03/Raspberry-Pi-Pinout-Random-Nerd-Tutorials.png?quality=100&strip=all&ssl=1)

The LED should start blinking each second according to the code. With this, you can now control your Raspberry Pi (a tiny computer) with another computer (your personal computer) through an SSH connection on Visual Studio Code.

---

## Conclusion

In this tutorial, you went through the whole process of setting up a headless Raspberry Pi for remote development using VS Code.

This offers a wide range of benefits: there’s no need for external peripherals, it provides remote access from anywhere within your network, and it leverages efficient coding and debugging with VS Code integration.

You can use this to deploy web servers and IoT dashboards, and you can explore with automating processes using Python scripts and GPIO control.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Your Raspberry Pi Headlessly with VS Code and SSH (No Monitor Needed)",
  "desc": "The Raspberry Pi is a portable computer with an onboard processor that fits comfortably in the palm of your hand. Compared with general purpose computers, it’s an affordable option developed by the Raspberry Pi Foundation. The Raspberry Pi Model B wa...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-use-your-raspberry-pi-headlessly-with-vs-code-and-ssh.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
