---
lang: en-US
title: "How to Build a Simple Secure Chat System Using Netcat"
description: "Article(s) > How to Build a Simple Secure Chat System Using Netcat"
icon: fas fa-shield-halved
category:
  - DevOps
  - Security
  - Netcat
  - Linux
  - Debian
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - security
  - sec
  - netcat
  - linux
  - debian
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Simple Secure Chat System Using Netcat"
    - property: og:description
      content: "How to Build a Simple Secure Chat System Using Netcat"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-a-simple-secure-chat-system-with-netcat.html
prev: /devops/security/articles/README.md
date: 2024-10-24
isOriginal: false
author: Hang Hu
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1729729356682/acf8ca42-3aaa-4ca1-9ebc-10f0f658c678.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Security > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Security > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Simple Secure Chat System Using Netcat"
  desc="In this hands-on tutorial, you'll learn how to harness the power of Netcat to build practical networking tools. We’ll start with basic message transmission. Then you'll progress to creating a file transfer system, and you’ll ultimately develop a secu..."
  url="https://freecodecamp.org/news/build-a-simple-secure-chat-system-with-netcat"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1729729356682/acf8ca42-3aaa-4ca1-9ebc-10f0f658c678.png"/>

In this hands-on tutorial, you'll learn how to harness the power of Netcat to build practical networking tools.

We’ll start with basic message transmission. Then you'll progress to creating a file transfer system, and you’ll ultimately develop a secure chat application with encryption.

::: note Prerequisites

Before we start, you'll need:

- A Linux-based system: I recommend Ubuntu. Alternatively, you can use the [<VPIcon icon="fas fa-globe"/>Online Linux Terminal](https://labex.io/tutorials/linux-online-linux-playground-372915) if you don't have Linux installed.
- Basic terminal knowledge (how to use `cd` and `ls`)

Don't worry if you're new to networking - I’ll explain everything as we go!

---

## Install Netcat

[<VPIcon icon="fas fa-globe"/>Netcat](https://nc110.sourceforge.io/) is like a digital "pipe" between computers - anything you put in one end comes out the other. Before we start using it, let's get it installed on your system.

Open your terminal and run these commands:

```bash
# Update your system's package list
sudo apt update

# Install Netcat
sudo apt install netcat -y
```

![Update your system's package list](https://cdn.hashnode.com/res/hashnode/image/upload/v1729583277378/d5fb06c5-3163-4885-b163-2cdde4fa434b.png)

To check if the installation worked, run:

```bash
nc -h
```

You should see a message starting with "OpenBSD netcat". If you do, great! If not, try running the installation commands again.

![check if the installation worked](https://cdn.hashnode.com/res/hashnode/image/upload/v1729583329155/812f32b9-2ca7-41f6-aead-07ffacbf161c.png)

---

## Your First Network Connection

Before we dive into building tools, let's understand what a network connection actually is. Think of it like a phone call: one person needs to wait for the call (the listener), and another person needs to make the call (the connector).

In networking, we use "ports" to make these connections. You can think of ports like different phone lines - they let multiple conversations happen at the same time.

Let's try making our first connection:

::: tabs

@tab 1.

> Open a terminal window and create a listener:

```bash
nc -l 12345
```

What did we just do? The `-l` tells Netcat to "listen" for a connection, and `12345` is the port number we chose. Your terminal will look like it's frozen - that's normal! It's waiting for someone to connect.

@tab 2.

> Open another terminal window and connect to your listener:

```bash
nc localhost 12345
```

Here, `localhost` means "this computer" - we're connecting to ourselves for practice. If you want to connect to another computer, you can replace `localhost` with its IP address.

:::

Now try typing a message (like "hi") in either window and press <kbd>Enter</kbd>. Cool, right? The message appears in the other window! This is exactly how basic network communication works.

![making our first connection](https://cdn.hashnode.com/res/hashnode/image/upload/v1729583496294/da70a4bc-5626-493c-8a52-385b708593f4.png)

To stop the connection, press <kbd>Ctrl</kbd>+<kbd>C</kbd> in both windows.

### What Just Happened?

You just created your first network connection! The first terminal was like someone waiting by a phone, and the second terminal was like someone calling that phone. When they connected, they could send messages back and forth.

---

## How to Build a Simple File Transfer Tool

Now that we understand basic connections, let's build something more useful: a tool to transfer files between computers.

First, let's create a test file to send:

```bash
# Create a file with some content
echo "This is my secret message" > secret.txt
```

To transfer this file, we'll need two terminals again, but this time we'll use them differently:

::: tabs

@tab 1.

> In the first terminal, set up the receiver:

```bash
nc -l 12345 > received_file.txt
```

![transfer file](https://cdn.hashnode.com/res/hashnode/image/upload/v1729583969994/d3159a2f-37f7-4cab-a23b-3788ed85876f.png)

This tells Netcat to:

- Listen for a connection (`-l`)
- Save whatever it receives to a file called `received_file.txt` (`>`)

@tab 2.

> In the second terminal, send the file:

```bash
nc localhost 12345 < secret.txt
```

![send the file](https://cdn.hashnode.com/res/hashnode/image/upload/v1729583998676/ab865ded-626a-47aa-9df6-83e56aa5f5d1.png)

The `<` tells Netcat to send the contents of our file.

@tab 3.

> Press <kbd>Ctrl</kbd>+<kbd>C</kbd> in both terminals to stop the transfer. Then check if it worked:

```bash
cat received_file.txt
```

![received file](https://cdn.hashnode.com/res/hashnode/image/upload/v1729584030360/32fa9916-ffdb-49da-abcf-57569c9b2f79.png)

You should see your message!

:::

This is similar to our chat system, but instead of typing messages, we're:

1. Taking content from a file
2. Sending it through our network connection
3. Saving it to a new file on the other end

Think of it like sending a document through a fax machine!

---

## How to Create a Secure Chat System

Our previous examples sent everything as plain text - anyone could read it if they intercepted the connection. Let's make something more secure by adding encryption.

First, let's understand what encryption does:

- It's like putting your message in a locked box
- Only someone with the right key can open it
- Even if someone sees the box, they can't read your message

We'll create two scripts: one for sending messages and one for receiving them.

::: tabs 1.

> Create the sender script:

```bash
nano secure_sender.sh
```

Copy this code into the file:

```bash
#!/bin/bash

echo "Secure Chat - Type your messages below"
echo "Press Ctrl+C to exit"

while true; do
  # Get the message
  read message

  # Encrypt and send it
  echo "$message" | openssl enc -aes-256-cbc -salt -base64 \
    -pbkdf2 -pass pass:chatpassword 2>/dev/null | \
    nc -N localhost 12345
done
```

This script will:

1. Read messages from user input.
2. Encrypt them using OpenSSL's AES-256-CBC encryption (a strong encryption standard).
3. Send the encrypted message to the specified port.

Press <kbd>Ctrl</kbd>+<kbd>X</kbd>, then <kbd>Y</kbd>, then <kbd>Enter</kbd> to save.

![Create the sender script](https://cdn.hashnode.com/res/hashnode/image/upload/v1729584825701/bcd3c3fb-5cd5-40f7-8105-14d1fff069ec.png)

@tab 2.

> Create the receiver script:

```bash
nano secure_receiver.sh
```

Copy this code:

```bash
#!/bin/bash

echo "Waiting for messages..."

while true; do
  # Receive and decrypt messages
  nc -l 12345 | openssl enc -aes-256-cbc -d -salt -base64 \
    -pbkdf2 -pass pass:chatpassword 2>/dev/null
done
```

This script will:

1. Listen for incoming encrypted messages.
2. Decrypt them using the same encryption key.
3. Display the decrypted messages.

Save this file too.

![Create the receiver script](https://cdn.hashnode.com/res/hashnode/image/upload/v1729584787785/c1e329ad-cbbe-49e8-918f-25d683884972.png)

@tab 3.

> Make both scripts executable:

```bash
chmod +x secure_sender.sh secure_receiver.sh
```

@tab 4.

> Try it out:

- In one terminal: `./secure_receiver.sh`
- In another terminal: `./secure_sender.sh`

Type a message in the sender terminal. The receiver will show your decrypted message!

![Type a message in the sender terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1729584834464/1f902a94-3a79-404b-bc9f-af9d8d2471e0.png)

### Enhancing Our Chat System

Now that we have a working basic chat system, let's make it more user-friendly and informative. We'll add features like timestamps, color-coded messages, and encryption status updates. This enhanced version will help you better understand what's happening during the encryption and transmission process.

If you're comfortable with the basic version, try this improved version:

::: tabs

@tab:active 1.

> Create an enhanced sender script (save it as `secure_sender_v2.sh`):

```bash title="secure_sender_v2.sh"
#!/bin/bash

# Set up color codes for better visibility
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}Secure Chat Sender - Started at $(date)${NC}"
echo -e "${BLUE}Type your messages below. Press Ctrl+C to exit${NC}"
echo "----------------------------------------"

while true; do
    # Show prompt with timestamp
    echo -ne "${GREEN}[$(date +%H:%M:%S)]${NC} Your message: "

    # Get the message
    read message

    # Skip if message is empty
    if [ -z "$message" ]; then
        continue
    fi

    # Add timestamp to message
    timestamped_message="[$(date +%H:%M:%S)] $message"

    # Show encryption status
    echo -e "${BLUE}Encrypting and sending message...${NC}"

    # Encrypt and send it, showing the encrypted form
    encrypted=$(echo "$timestamped_message" | openssl enc -aes-256-cbc -salt -base64 \
        -pbkdf2 -iter 10000 -pass pass:chatpassword 2>/dev/null)

    echo -e "${BLUE}Encrypted form:${NC} ${encrypted:0:50}..." # Show first 50 chars
    echo "$encrypted" | nc -N localhost 12345

    echo -e "${GREEN}Message sent successfully!${NC}"
    echo "----------------------------------------"
done
```

@tab 2.

> Create an enhanced receiver script (save as `secure_receiver_v2.sh`):

```bash title="secure_receiver_v2.sh"
#!/bin/bash

# Set up color codes for better visibility
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Secure Chat Receiver - Started at $(date)${NC}"
echo -e "${BLUE}Waiting for messages... Press Ctrl+C to exit${NC}"
echo "----------------------------------------"

while true; do
    # Receive and show the encrypted message
    echo -e "${BLUE}Waiting for next message...${NC}"

    encrypted=$(nc -l 12345)

    # Skip if received nothing
    if [ -z "$encrypted" ]; then
        continue
    fi

    echo -e "${YELLOW}Received encrypted message:${NC} ${encrypted:0:50}..." # Show first 50 chars
    echo -e "${BLUE}Decrypting...${NC}"

    # Decrypt and display the message
    decrypted=$(echo "$encrypted" | openssl enc -aes-256-cbc -d -salt -base64 \
        -pbkdf2 -iter 10000 -pass pass:chatpassword 2>/dev/null)

    # Check if decryption was successful
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Decrypted message:${NC} $decrypted"
    else
        echo -e "\033[0;31mError: Failed to decrypt message${NC}"
    fi

    echo "----------------------------------------"
done
```

@tab 3.

> Make the enhanced scripts executable:

```bash
chmod +x secure_sender_v2.sh secure_receiver_v2.sh
```

Try running both versions to see how the additional feedback helps you better understand the encryption and communication process.

![Enhancing Our Chat System](https://cdn.hashnode.com/res/hashnode/image/upload/v1729585592733/01d25154-37a9-4c14-95ac-410c513956b9.png)

The enhanced version (v2) adds several improvements:

- Colorized output for better readability.
- Timestamps for each message.
- Status updates showing the encryption/decryption process.
- Error handling for failed decryption attempts.
- Preview of encrypted messages before sending/after receiving.

---

## Conclusion

This tutorial taught you how to use Netcat as a versatile networking tool. We started with basic message sending, progressed to building a simple file transfer system, and then created a secure chat system with encryption.

You've gained hands-on experience with:

- Setting up network listeners and connections
- Transferring files securely between systems
- Implementing basic encryption for secure communication
- Adding user-friendly features like timestamps and status updates

The skills you've learned here form a solid foundation for understanding network communication and can be applied to more complex networking projects. To practice the operations from this tutorial, try [<VPIcon icon="fas fa-globe"/>the interactive hands-on lab](https://labex.io/labs/linux-using-netcat-for-simple-network-communication-392039).

---

## Practice Your Skills

Now that you've learned the basics of Netcat and built a secure chat system, let's put your skills to the test with a real-world scenario. Try the "[<VPIcon icon="fas fa-globe"/>Receive Messages Using Netcat](https://labex.io/labs/linux-receive-messages-using-netcat-392102)" lab challenge where you'll play the role of a junior interstellar communications analyst. Your mission: intercept and log signals from an alien civilization using your newfound Netcat knowledge.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Simple Secure Chat System Using Netcat",
  "desc": "In this hands-on tutorial, you'll learn how to harness the power of Netcat to build practical networking tools. We’ll start with basic message transmission. Then you'll progress to creating a file transfer system, and you’ll ultimately develop a secu...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/build-a-simple-secure-chat-system-with-netcat.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
