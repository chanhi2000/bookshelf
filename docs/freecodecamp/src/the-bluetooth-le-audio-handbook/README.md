---
lang: en-US
title: "The Bluetooth LE Audio Handbook: From “Why Does My Call Sound Like a Tin Can?” to AOSP Implementation"
description: "Article(s) > The Bluetooth LE Audio Handbook: From “Why Does My Call Sound Like a Tin Can?” to AOSP Implementation"
icon: fa-brands fa-android
category:
  - Java
  - Android
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - java
  - jdk
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Bluetooth LE Audio Handbook: From “Why Does My Call Sound Like a Tin Can?” to AOSP Implementation"
    - property: og:description
      content: "The Bluetooth LE Audio Handbook: From “Why Does My Call Sound Like a Tin Can?” to AOSP Implementation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-bluetooth-le-audio-handbook/
prev: /programming/java-android/articles/README.md
date: 2026-04-09
isOriginal: false
author:
  - name: Nikheel Vishwas Savant
    url: https://freecodecamp.org/news/author/nsavant/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4c5a3b97-9a23-40cd-8999-333927f58e6c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Android > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-android/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Bluetooth LE Audio Handbook: From “Why Does My Call Sound Like a Tin Can?” to AOSP Implementation"
  desc="Since the early 2000s, Bluetooth has been the dominant way we listen to wireless audio, powering everything from the first mono headsets to today's true wireless earbuds. But the underlying technology"
  url="https://freecodecamp.org/news/the-bluetooth-le-audio-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4c5a3b97-9a23-40cd-8999-333927f58e6c.png"/>

Since the early 2000s, Bluetooth has been the dominant way we listen to wireless audio, powering everything from the first mono headsets to today's true wireless earbuds.

But the underlying technology hasn't kept pace with how we actually use it. True wireless earbuds, all-day hearing aids, shared audio experiences – none of these were anticipated when the original Bluetooth audio stack was designed.

LE Audio, introduced by the Bluetooth SIG and finalized in 2022, is a ground-up redesign that replaces the Classic Bluetooth audio stack with an entirely new architecture built on Bluetooth Low Energy. It introduces a new codec (LC3), new transport primitives (isochronous channels), new profiles for unified audio streaming, and an entirely new broadcast capability called Auracast.

Together, these changes address long-standing limitations around audio quality, power consumption, multi-device streaming, and accessibility.

This handbook is a comprehensive technical deep dive into LE Audio: what it is, why it exists, how it works at every layer of the stack, and how it's implemented in Android (AOSP). We'll start with the history and motivation, build up an intuitive understanding of the core concepts, and then go deep into the architecture and code.

::: info Here's what you'll learn:

- Why Classic Bluetooth audio hit its limits, the relay problem, the two-profile split, power constraints, and the lack of broadcast or hearing aid support
- How the LC3 codec works, and why it delivers better audio at roughly half the bitrate of SBC
- What isochronous channels are, the new transport primitive that replaces SCO and ACL for audio, in both unicast (CIS) and broadcast (BIS) forms
- How the LE Audio profile stack is organized, from foundational services like BAP and PACS up through use-case profiles like TMAP and HAP
- How multi-stream audio eliminates the earbud relay hack, with native synchronized streams to each earbud
- What Auracast enables, one-to-many broadcast audio and the infrastructure that supports it
- How all of this is implemented in Android (AOSP), a full walkthrough of the architecture from framework APIs through the native C++ stack to the Bluetooth controller, including the state machines, codec negotiation, and data flow

:::

Whether you're a Bluetooth engineer, an embedded developer, an Android platform engineer, or just someone curious about how your devices actually work, this guide aims to make one of the most complex parts of modern wireless systems feel approachable.

If you've ever wondered why your earbuds sound great for music but terrible on calls, why one earbud always dies first, or why you can't easily share audio with people around you, read on. The answers are all here.

---

## Once Upon a Time in Bluetooth Land

Picture this: it's 2003. Flip phones are cool. The first Bluetooth headsets hit the market, and suddenly you can walk around looking like a cyborg while taking calls.

That mono, telephone-quality audio? Powered by a little thing called **HFP** (Hands-Free Profile) using the **CVSD** codec at a whopping 64 kbps. It sounded like your caller was speaking from inside a submarine, but hey, no wires!

Fast forward a few years. We got **A2DP** (Advanced Audio Distribution Profile) for streaming music, bringing us **SBC** (Sub-Band Codec), the audio codec equivalent of a Honda Civic. Not flashy, not terrible, gets the job done. A2DP gave us stereo music streaming, and life was good.

For a while.

The Bluetooth SIG (Special Interest Group), the consortium of thousands of companies that governs Bluetooth, kept iterating on the classic Bluetooth audio stack. We got better codecs like **aptX**, **AAC**, and **LDAC**. But here's the thing: all of these were built on top of the same ancient plumbing. It's like renovating your kitchen while the house's foundation is slowly cracking.

The Bluetooth audio stack was built on **BR/EDR** (Basic Rate/Enhanced Data Rate), the "Classic Bluetooth" radio. This is the same radio technology from the early 2000s, designed when streaming audio from a phone to a single headset was the pinnacle of innovation. Nobody imagined true wireless earbuds, hearing aids that stream directly from your phone, or broadcasting audio to an entire airport terminal.

By the late 2010s, Bluetooth audio was showing its age. Badly.

---

## The Problems With Classic Bluetooth Audio

Let's catalogue the issues of Classic Bluetooth Audio, because they're educational:

### Issue #1: The Two-Profile Personality Disorder

Classic Bluetooth had a split personality. Want to listen to music? Use A2DP with SBC/AAC at nice quality. Want to make a phone call? Switch to HFP, which uses a completely different codec (CVSD or mSBC) at dramatically lower quality.

Ever noticed how your wireless earbuds sound amazing playing Spotify, but the moment you jump on a Zoom call, it sounds like you're talking through a paper towel tube? That's the A2DP-to-HFP switchover. Different profiles, different codecs, different audio paths. The switch isn't even graceful, there's often an audible glitch.

![Bluetooth audio quality diagram](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/fd614824-0684-4fb3-87a8-8c97052721b6.png)

The above diagram shows the audio quality drop when switching from A2DP (music streaming with SBC/AAC at high quality) to HFP (voice call with CVSD/mSBC at low quality). The switch causes an audible glitch and dramatic reduction in audio fidelity.

### Issue #2: The Relay Problem (True Wireless Earbuds)

When you have true wireless earbuds (left and right earbuds with no wire between them), Classic Bluetooth has a dirty little secret: **A2DP can only stream to one device at a time.**

So what actually happens with your fancy earbuds?

1. Your phone sends the stereo audio stream to the **primary earbud** (usually the right one)
2. The primary earbud receives both left and right channels
3. It then **relays** the other channel to the secondary earbud via a separate Bluetooth link

This relay architecture has a few important consequences. First, you have double the battery drain on the primary earbud (it dies first, you've noticed this). You also get higher latency to the secondary earbud

There are also potential synchronization issues between left and right channels. And if the primary earbud runs out of battery or loses connection, both earbuds go silent.

### Issue #3: Power Hungry

BR/EDR was designed in an era when "low power" meant "runs on AA batteries." Streaming audio over Classic Bluetooth is relatively power-hungry. The radio has to maintain a constant, high-bandwidth connection. For devices like hearing aids that need to run all day on tiny batteries, this was a dealbreaker.

### Issue #4: One-to-One Only

Classic Bluetooth audio is fundamentally **point-to-point**. One source, one sink (or at best, a very hacky "dual audio" implementation where the phone maintains two separate A2DP connections). There's no way to broadcast audio to multiple listeners simultaneously without establishing individual connections to each one.

Imagine you're at an airport gate and want to stream the boarding announcements to everyone's earbuds. With Classic Bluetooth, you'd need to pair with every single person's device individually. Good luck with that at Gate B47. ### Issue #5: No Standard for Hearing Aids

Before LE Audio, there was no official Bluetooth standard for hearing aids. Apple created its own proprietary MFi (Made for iPhone) hearing aid protocol. Google created ASHA (Audio Streaming for Hearing Aid) as a semi-proprietary BLE-based solution for Android. Neither was an official Bluetooth standard, and interoperability was... let's call it "aspirational."

---

## Enter LE Audio: The Hero We Needed

In January 2020, at CES, the Bluetooth SIG unveiled **LE Audio**, a complete reimagining of Bluetooth audio built on top of Bluetooth Low Energy (BLE) instead of Classic BR/EDR.

The core transport features (isochronous channels, EATT, LE Power Control) shipped in the Bluetooth Core Specification v5.2 in late 2019/early 2020. But the full suite of LE Audio profiles and services wasn't completed until July 12, 2022, when the Bluetooth SIG officially announced that all LE Audio specifications had been adopted.

The effort involved over 25 working groups, thousands of engineers from hundreds of companies, and took approximately 7 years from initial concept to completion. This wasn't a minor spec update. It was a ground-up redesign.

Here's what LE Audio brings to the table:

| Feature | Classic Audio | LE Audio |
| --- | --- | --- |
| Radio | BR/EDR (Classic) | BLE (Low Energy) |
| Mandatory Codec | SBC | LC3 |
| Audio Quality at Same Bitrate | Good | Better (LC3 wins) |
| Power Consumption | Higher | Lower |
| Multi-Stream | No (relay hack) | Yes (native) |
| Broadcast Audio | No | Yes (Auracast) |
| Hearing Aid Support | No standard (MFi/ASHA) | Yes (HAP) |
| Bidirectional Audio | Separate profiles (A2DP + HFP) | Unified (BAP) |
| Audio Sharing | Very limited | Built-in |

Think of it this way: Classic Bluetooth Audio is like a landline telephone system: reliable, well-understood, but fundamentally limited.

LE Audio is like the transition to VoIP and streaming: same goal (getting audio from A to B), but entirely new infrastructure that unlocks capabilities the old system could never support.

---

## Table of Contents

4. [The LC3 Codec: Better Sound, Less Power, More Magic](#heading-4-the-lc3-codec-better-sound-less-power-more-magic)
5. [Isochronous Channels: The New Plumbing](#heading-5-isochronous-channels-the-new-plumbing)
6. [The LE Audio Profile Stack: A Layer Cake of Specifications](#heading-6-the-le-audio-profile-stack-a-layer-cake-of-specifications)
7. [Multi-Stream Audio: No More Left Earbud Relay](#heading-7-multi-stream-audio-no-more-left-earbud-relay)
8. [Auracast: Broadcast Audio for the Masses](#heading-8-auracast-broadcast-audio-for-the-masses)
9. [LE Audio in Android/AOSP: The Implementation](#heading-9-le-audio-in-androidaosp-the-implementation)
10. [The AOSP Architecture: From App to Antenna](#heading-10-the-aosp-architecture-from-app-to-antenna)
11. [Server-Side (Source) Implementation](#heading-11-server-side-source-implementation)
12. [Client-Side (Sink) Implementation](#heading-12-client-side-sink-implementation)
13. [The State Machine That Runs It All](#heading-13-the-state-machine-that-runs-it-all)
14. [Putting It All Together: A Day in the Life of an LE Audio Packet](#heading-14-putting-it-all-together-a-day-in-the-life-of-an-le-audio-packet)

---

## 4. The LC3 Codec: Better Sound, Less Power, More Magic

At the heart of LE Audio is a new mandatory codec called **LC3**: Low Complexity Communication Codec. If SBC is the Honda Civic, LC3 is a Tesla Model 3. It's more efficient, more capable, and designed from the ground up for the modern era.

### What Even Is a Codec?

For the uninitiated: a codec (**co**der-**dec**oder) is an algorithm that compresses audio so it can be transmitted over a limited-bandwidth wireless link, and then decompresses it on the other side. The better the codec, the better the audio sounds at a given bitrate, and the less battery it eats doing the math.

### LC3 Technical Specs

LC3 was developed by Fraunhofer IIS (the same folks who brought us MP3 and AAC, they know a thing or two about audio coding) and Ericsson.

Here are the key specs:

- **Sample rates**: 8, 16, 24, 32, 44.1, and 48 kHz
- **Bit depth**: 16, 24, or 32 bits
- **Frame durations**: 7.5 ms and 10 ms
- **Bitrate range**: 16 to 320 kbps per channel
- **Algorithmic latency**: 7.5 ms (for 7.5 ms frames) or 10 ms (for 10 ms frames)
- **Channels**: Mono or stereo

### Why LC3 Is Better Than SBC

The big headline: LC3 delivers equivalent or better audio quality at roughly half the bitrate of SBC.

In listening tests conducted by Fraunhofer, participants rated LC3 at 160 kbps as equivalent to or better than SBC at 345 kbps. That's not a marginal improvement, it's nearly a 2x efficiency gain.

![SBC vs LC3 bar chart comparing audio quality](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/293ea94c-3a03-4462-8361-89617e07329f.png)

The above bar chart compares subjective audio quality ratings of LC3 and SBC at various bitrates. LC3 at 160 kbps is rated equivalent to or better than SBC at 345 kbps, demonstrating roughly 2x efficiency improvement.

This efficiency gain translates directly into one of two things (or a combination of both):

1. **Better audio quality at the same power**, more bits for quality, less wasted
2. **Same audio quality at lower power**, the device runs longer on a charge

### How LC3 Actually Works (The Simplified Version)

LC3 uses a **modified discrete cosine transform (MDCT)**, a mathematical technique that converts audio from the time domain (a waveform) to the frequency domain (which frequencies are present). This is similar to what AAC and other modern codecs do, but LC3's transform is optimized for low computational complexity.

Here's the encoding pipeline, simplified:

![flowchart of the LC3 encoding pipeline](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/f3961a0a-42af-443a-96b4-67f340a55944.png)

This is a flowchart of the LC3 encoding pipeline. PCM audio input passes through an MDCT (Modified Discrete Cosine Transform) to convert from time domain to frequency domain. Then spectral noise shaping applies a psychoacoustic model to hide quantization noise in inaudible frequency regions, followed by quantization and entropy coding to produce the compressed LC3 bitstream.

The key insight is **spectral noise shaping**: LC3 uses a psychoacoustic model (a model of how humans perceive sound) to ensure that the quantization noise (the artifacts introduced by compression) is shaped to fall in frequency regions where it's least audible. Your ears literally can't hear the distortion. Clever, right?

### LC3 vs. LC3plus

You might also hear about **LC3plus**, an enhanced version that adds:

- Super-wideband and fullband modes (up to 48 kHz audio bandwidth)
- Additional frame sizes (2.5 ms, 5 ms) for ultra-low-latency applications
- Higher quality at very low bitrates

LC3plus is not part of the base LE Audio spec but is used in some implementations (like DECT NR+ for cordless phones).

---

## 5. Isochronous Channels: The New Plumbing

Here's where things get architecturally interesting. Classic Bluetooth audio used **SCO** (Synchronous Connection-Oriented) links for voice and **L2CAP** over **ACL** (Asynchronous Connection-Less) links for A2DP streaming. These were okay, but they're like using garden hoses for different purposes, functional but not optimized for audio.

LE Audio introduces a brand-new transport mechanism at the link layer: **Isochronous Channels**. These are purpose-built pipes for time-sensitive data like audio.

### What "Isochronous" Means

"Isochronous" (from Greek: *iso* = equal, *chronos* = time) means "occurring at regular time intervals." An isochronous channel guarantees that data arrives at a predictable, regular cadence, exactly what you need for audio.

Think of it this way:

- **Asynchronous** (ACL): "Here's some data. It'll get there when it gets there." (Great for file transfers, bad for audio)
- **Synchronous** (SCO): "Here's data that MUST arrive on time, and if it doesn't, too bad." (Old voice links, no retransmissions)
- **Isochronous**: "Here's data that should arrive on time, and we'll try our best to make that happen with some smart retransmission." (Best of both worlds)

![Comparison of Bluetooth transport types: asynchronous, synchronous, and isosynchronous](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/51324579-2e10-4b26-bc09-482fa6ade853.png)

This above chart is a comparison of three Bluetooth transport types: Asynchronous (ACL) delivers data without timing guarantees, Synchronous (SCO) delivers data on a fixed schedule with no retransmission, and Isochronous delivers data on a regular schedule with smart retransmission, combining the reliability of ACL with the timing guarantees of SCO.

### Two Flavors: CIS and BIS

Isochronous channels come in two flavors, and this is where the magic happens:

#### CIS — Connected Isochronous Stream

CIS is for **point-to-point** audio (unicast). It's what your phone uses to stream music to your earbuds.

![Diagram of a Connected Isochronous Stream (CIS) setup](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/2b44fe9e-0e5d-44ee-877c-b26e147b63a1.png)
<!-- TODO: mermaid화 -->

The aboe is a diagram of a Connected Isochronous Stream (CIS) setup: a phone (Unicast Client) sends two synchronized CIS streams within a single CIG (Connected Isochronous Group), one to the left earbud and one to the right earbud. Arrows show bidirectional audio flow, with music going to the earbuds and microphone audio returning to the phone.

Key features of CIS:

- **Bidirectional**: Audio can flow in both directions simultaneously (unicast to earbuds AND microphone audio back)
- **Acknowledged**: The receiver sends acknowledgments, enabling retransmissions of lost packets
- **Grouped into CIGs**: Multiple CIS streams are grouped into a **CIG** (Connected Isochronous Group), ensuring they're synchronized

That last point is crucial. A CIG ensures the left and right earbud receive their audio packets with tight synchronization, no more "my left ear is 50ms ahead of my right ear" issues.

#### BIS — Broadcast Isochronous Stream

BIS is for **one-to-many** audio (broadcast). It's the foundation of Auracast.

![Diagram of a Broadcast Isochronous Stream (BIS) setup](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/22beaaf6-ace8-4110-a33c-d7cf370f93d3.png)
<!-- TODO: mermaid화 -->

The above is a diagram of a Broadcast Isochronous Stream (BIS) setup: a single broadcast source transmits audio via a BIG (Broadcast Isochronous Group) containing multiple BIS streams. Multiple receivers (broadcast sinks) independently receive the same audio without any connection to the source, similar to FM radio.

Key features of BIS:

- **Unidirectional**: One-way only (source to listeners), makes sense, you can't have a million people talking back
- **Unacknowledged**: No acks from listeners (the source doesn't even know who's listening)
- **Grouped into BIGs**: Multiple BIS streams form a **BIG** (Broadcast Isochronous Group)
- **Scalable**: No upper limit on listeners, it's actual radio broadcasting

### The ISO Data Path

Under the hood, isochronous data follows a specific path through the controller:

![Diagram of the isochronous data path through the Bluetooth controller](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/8bfd7893-b93a-4f07-af09-17cbd737fcbb.png)
<!-- TODO: mermaid화 -->

The above is a diagram of the isochronous data path through the Bluetooth controller. Audio frames from the host pass through HCI, then through the ISO Adaptation Layer (ISO-AL) which handles segmentation, timestamping, and flush timeout management, before reaching the Link Layer for transmission over the air.

The key innovation is the **ISO-AL** (Isochronous Adaptation Layer), which sits between HCI and the Link Layer. It handles:

- **Segmentation**: Breaking audio frames into link-layer-sized pieces
- **Time-stamping**: Each audio frame gets a timestamp so the receiver knows exactly when to play it
- **Flush timeout**: If a frame can't be delivered in time, it's flushed (better to skip a frame than play it late)

---

## 6. The LE Audio Profile Stack: A Layer Cake of Specifications

If you've ever looked at the list of LE Audio specifications and felt your eyes glaze over, you're not alone. There are a LOT of them. But they're organized in a logical hierarchy, and once you understand the structure, it all makes sense.

### Visual: The Profile Stack

Here's a three-tier diagram of the LE Audio profile stack:

![Three-tier diagram of the LE Audio profile stack](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/e4968717-72bc-43c5-b72c-057a65534bb1.png)

Tier 1 (foundation) contains BAP, VCP, MCP, CCP, MICP, CSIP, and BASS. Tier 2 (grouping layer) contains CAP, which coordinates the Tier 1 profiles. Tier 3 (use-case profiles) contains TMAP for telephony and media, HAP for hearing aids, and PBP for public broadcasts. Each tier builds on the one below it.

Think of it as a wedding cake with three tiers:

### Tier 1: The Foundation (Core Services and Profiles)

These are the building blocks everything else is built on:

#### BAP — Basic Audio Profile

The big kahuna. BAP defines the fundamental procedures for discovering, configuring, and establishing LE Audio streams. It defines two roles:

- **Unicast Client**: The device that initiates and controls audio streams (typically your phone)
- **Unicast Server**: The device that renders or captures audio (typically your earbuds)

BAP relies on several GATT services:

- **PACS** (Published Audio Capabilities Service): "Hey, here's what audio formats I support"
- **ASCS** (Audio Stream Control Service): "Let's set up and manage audio streams"

#### VCP — Volume Control Profile

Handles remote volume control. Your phone can control the volume on your earbuds (and vice versa) using the **VCS** (Volume Control Service).

#### MCP — Media Control Profile

Allows remote control of media playback. Pause, play, skip, and so on, through the **MCS** (Media Control Service). Like AVRCP for LE Audio.

#### CCP — Call Control Profile

Manages phone call state. Answer, reject, hold calls via the **TBS** (Telephone Bearer Service). This replaces HFP's call control functionality.

#### MICP — Microphone Control Profile

Handles remote mute/unmute of a device's microphone. Simple but essential, ever been on a call where you couldn't figure out how to mute? MICP standardizes it.

#### CSIP — Coordinated Set Identification Profile

This is the "these two earbuds belong together" profile. It uses the **CSIS** (Coordinated Set Identification Service) to tell the phone: "Hey, I'm the left earbud, and my buddy over there is the right earbud. We're a set."

Without CSIP, your phone would treat each earbud as a completely independent device. CSIP is what enables seamless "coordinated set" behavior.

#### BASS — Broadcast Audio Scan Service

Handles the discovery of broadcast audio sources. A device with BASS can scan for nearby broadcasts and help another device (like hearing aids) tune into them.

### Tier 2: The Grouping Layer

#### CAP — Common Audio Profile

CAP sits on top of the Tier 1 profiles and provides common procedures that higher-level profiles use. It handles things like:

- Discovering a coordinated set of devices (using CSIP)
- Setting up unicast audio streams to a coordinated set (using BAP)
- Initiating broadcast audio streams

Think of CAP as the "orchestrator" that coordinates all the Tier 1 profiles to work together.

### Tier 3: The Use-Case Profiles

These are the profiles that map to actual user scenarios:

#### TMAP — Telephony and Media Audio Profile

The "all-in-one" profile for typical audio use cases. TMAP defines roles like:

- **Call Terminal (CT)**: Can make and receive calls
- **Unicast Media Sender (UMS)**: Can send media audio (your phone)
- **Unicast Media Receiver (UMR)**: Can receive media audio (your earbuds)
- **Broadcast Media Sender (BMS)**: Can broadcast media audio
- **Broadcast Media Receiver (BMR)**: Can receive broadcast media audio

If you're building a typical phone + earbuds experience, TMAP is your profile.

#### HAP — Hearing Access Profile

The standardized profile for hearing aids. This replaces the proprietary MFi and ASHA solutions with an official Bluetooth standard. HAP defines procedures for:

- Streaming audio to hearing aids
- Adjusting hearing aid presets
- Controlling volume on hearing aids

This is a huge deal. For the first time, hearing aids can interoperate across all Bluetooth devices using a standard protocol.

#### PBP — Public Broadcast Profile

Defines how to set up and discover public broadcasts (Auracast). This is what enables "broadcast audio in the airport terminal" scenarios.

---

## 7. Multi-Stream Audio: No More Left Earbud Relay

Remember the relay problem with Classic Bluetooth? LE Audio eliminates it entirely with **multi-stream audio**.

With LE Audio, the source device (your phone) can send independent, synchronized audio streams directly to each earbud:

![Diagram comparing Classic Bluetooth relay architecture with LE Audio multi-stream architecture](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/45b7d1d7-f9ba-4857-a296-64bc0dfdd346.png)
<!-- TODO: mermaid화 -->

This diagram compares Classic Bluetooth relay architecture (phone sends stereo to primary earbud, which relays to secondary) with LE Audio multi-stream architecture (phone sends independent synchronized streams directly to each earbud via separate CIS channels within a CIG). The LE Audio approach provides balanced battery drain and lower latency.

### How It Works

1. Both earbuds connect to the phone independently via BLE
2. The phone identifies them as a coordinated set using CSIP
3. The phone establishes a **CIG** (Connected Isochronous Group) with two **CIS** streams, one per earbud
4. The phone sends the left channel on CIS #1 and the right channel on CIS #2
5. The CIG ensures both streams are synchronized, the earbuds play their respective channels at exactly the same time

Benefits:

- **Balanced battery drain**: Both earbuds do equal work
- **Lower latency**: No relay hop means fewer delays
- **Better reliability**: If one earbud loses connection, the other keeps playing
- **True stereo**: Each earbud gets its own independent stream, no need to decode and split

---

## 8. Auracast: Broadcast Audio for the Masses

**Auracast** is LE Audio's broadcast feature, and it's arguably the most revolutionary part. It's like FM radio for Bluetooth: one source, unlimited listeners.

### How Auracast Works

1. A Broadcast Source creates a BIG (Broadcast Isochronous Group) containing one or more BIS streams
2. The source advertises the broadcast using Extended Advertising with metadata (stream name, language, codec config)
3. A Broadcast Sink discovers the advertisement, syncs to the Periodic Advertising train to get stream parameters
4. The sink joins the BIG and starts receiving audio

![Diagram of the Auracast broadcast flow](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/d00d5d24-e7c1-44ae-9052-b61ae049b2ba.png)
<!-- TODO: mermaid화 -->

The above diagram shows the Auracast broadcast flow: a broadcast source advertises via Extended Advertising, broadcast sinks discover the advertisement and sync to Periodic Advertising to receive stream parameters, then join the BIG to receive audio. There is no limit on the number of sinks.

### Auracast Use Cases

The use cases are actually compelling:

- **Airports/Train Stations**: Broadcast gate announcements directly to travelers' earbuds (in multiple languages!)
- **Gyms**: Every TV on the wall can broadcast its own audio, pick which one to listen to
- **Museums**: Audio guides streamed to visitors' own earbuds
- **Bars/Sports Events**: Watch the game on the big screen with commentary in your earbuds, without blasting everyone
- **Conferences**: Live translation channels broadcast to attendees
- **Silent Discos**: Obviously

### The BASS Role: Broadcast Assistants

There's a neat supporting concept called a **Broadcast Assistant**. This is a device (typically your phone) that helps another device (typically your earbuds) discover and tune into broadcasts.

Why? Because tiny earbuds might not have the processing power or UI to scan for and select broadcasts themselves. So your phone does the scanning, shows you available broadcasts, and tells your earbuds which one to tune into via the **BASS** (Broadcast Audio Scan Service).

![Diagram showing the Broadcast Assistant role](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/dda3bf79-028f-4624-bfa1-7616bbb40a25.png)
<!-- TODO: mermaid화 -->

The above diagram showes the Broadcast Assistant role: a phone scans for available Auracast broadcasts and displays them to the user. When the user selects a broadcast, the phone (acting as Broadcast Assistant) instructs the user's earbuds to tune into the selected broadcast via BASS (Broadcast Audio Scan Service), since the earbuds may lack the UI or processing power to scan on their own.

---

## 9. LE Audio in Android/AOSP: The Implementation

Now let's get into the code. This is where the rubber meets the road.

### Timeline of Android LE Audio Support

- **Android 12 (2021)**: Initial LE Audio APIs introduced (developer preview quality)
- **Android 13 (2022)**: Full LE Audio support, including unicast client/server, broadcast source/sink
- **Android 14 (2023)**: Improved stability, broadcast audio enhancements, LE Audio source role support
- **Android 15 (2024)**: Auracast Broadcast Sink support, Broadcast Assistant role, improved audio context switching
- **Android 16 (2025)**: Native Auracast UI in Quick Settings/Bluetooth settings, enhanced audio sharing experience

The LE Audio implementation in AOSP lives primarily in the **Bluetooth module** (`packages/modules/Bluetooth`), which is a **Mainline module**, meaning it can be updated via Google Play System Updates independent of full Android OS updates.

### Key AOSP Source Locations

If you want to dive into the code yourself, here's your treasure map:

| Component | Path |
| --- | --- |
| LE Audio Java Service | `packages/modules/Bluetooth/android/app/src/com/android/bluetooth/le_audio/LeAudioService.java` |
| JNI Bridge | `packages/modules/Bluetooth/android/app/src/com/android/bluetooth/le_audio/LeAudioNativeInterface.java` |
| Native LE Audio Client | `packages/modules/Bluetooth/system/bta/le_audio/le_audio_client.cc` |
| Codec Manager | `packages/modules/Bluetooth/system/bta/le_audio/codec_manager.cc` |
| State Machine | `packages/modules/Bluetooth/system/bta/le_audio/state_machine.cc` |
| LC3 Codec Library | `external/liblc3/` |
| Framework API | `frameworks/base/core/java/android/bluetooth/BluetoothLeAudio.java` |
| Broadcast API | `frameworks/base/core/java/android/bluetooth/BluetoothLeBroadcast.java` |

### High-Level Architecture

The AOSP Bluetooth stack for LE Audio follows Android's classic layered architecture:

![Layered architecture diagram of the AOSP Bluetooth LE Audio stack](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/1f4a9658-a26a-4388-917d-92794f0f407a.png)

In this layered architecture diagram of the AOSP Bluetooth LE Audio stack, here's what's shown from top to bottom: Application layer, Framework APIs (BluetoothLeAudio, BluetoothLeBroadcast), LeAudioService (Java), JNI Bridge, Native C++ stack (le_audio_client, codec_manager, state_machine, iso_manager), HCI layer, and Bluetooth Controller hardware.

---

## 10. The AOSP Architecture: From App to Antenna

Let's walk through each layer in detail.

### Layer 1: The Framework APIs

Android exposes LE Audio functionality through several public API classes in `android.bluetooth`:

#### `BluetoothLeAudio`

The main API for unicast LE Audio. Apps use this to:

- Connect to LE Audio devices
- Set active device for audio playback/capture
- Query group information (coordinated sets)
- Select codec configuration

```java
// Example: Connect to an LE Audio device
BluetoothLeAudio leAudio = bluetoothAdapter.getProfileProxy(
    context, listener, BluetoothProfile.LE_AUDIO);

// Set the LE Audio device as active for media playback
leAudio.setActiveDevice(leAudioDevice);
```

#### `BluetoothLeBroadcast`

API for broadcast audio (Auracast). Apps use this to:

- Start/stop broadcast audio
- Set broadcast metadata (name, language)
- Configure broadcast code (encryption password)

```java
// Start a broadcast
BluetoothLeBroadcast broadcast = bluetoothAdapter.getProfileProxy(
    context, listener, BluetoothProfile.LE_AUDIO_BROADCAST);

broadcast.startBroadcast(contentMetadata, audioConfig, broadcastCode);
```

#### `BluetoothLeBroadcastAssistant`

API for the broadcast assistant role, helping another device tune into a broadcast.

#### `BluetoothVolumeControl`

API for remote volume control via VCP.

#### `BluetoothHapClient`

API for the Hearing Access Profile, controlling hearing aid presets and streaming.

### Layer 2: LeAudioService (The Brain)

The `LeAudioService` is the central service within the Bluetooth app that orchestrates all LE Audio functionality. This is where the magic happens.

Key responsibilities:

- **Device Management**: Tracking connected LE Audio devices and their capabilities
- **Group Management**: Managing coordinated sets (which devices belong together)
- **Audio Routing**: Deciding which device(s) should be active for playback/capture
- **State Machine Management**: Handling the lifecycle of audio connections
- **Profile Coordination**: Coordinating BAP, VCP, MCP, CCP, and CSIP

Here's a simplified view of how `LeAudioService` is structured:

```java :collapsed-lines
public class LeAudioService extends ProfileService {
    
    // Map of device address -> state machine
    private Map<BluetoothDevice, LeAudioStateMachine> mStateMachines;
    
    // Map of group ID -> group information
    private Map<Integer, LeAudioGroupDescriptor> mGroupDescriptors;
    
    // Native interface bridge
    private LeAudioNativeInterface mNativeInterface;
    
    // Active device tracking
    private BluetoothDevice mActiveAudioOutDevice;
    private BluetoothDevice mActiveAudioInDevice;
    
    // Codec configuration
    private BluetoothLeAudioCodecConfig mInputLocalCodecConfig;
    private BluetoothLeAudioCodecConfig mOutputLocalCodecConfig;
    
    public void connect(BluetoothDevice device) {
        // 1. Check if device supports LE Audio (PACS)
        // 2. Create state machine for device
        // 3. Initiate connection via native stack
        // 4. Discover GATT services (PACS, ASCS, VCS, etc.)
        // 5. Read audio capabilities
    }
    
    public void setActiveDevice(BluetoothDevice device) {
        // 1. Look up device's group
        // 2. Find all devices in the coordinated set
        // 3. Configure audio streams via BAP
        // 4. Set up isochronous channels
        // 5. Start audio routing
    }
}
```

### Layer 3: The Native Stack (C++)

Below the Java layer, the heavy lifting happens in C++. The native LE Audio implementation lives in the Bluetooth stack (historically called "Fluoride," with newer components in "Gabeldorsche").

Key native components:

#### `le_audio_client.cc` / `le_audio_client_impl`

The main C++ implementation of the LE Audio client. This handles:

- GATT client operations (discovering services, reading characteristics)
- ASE (Audio Stream Endpoint) state machine management
- Codec negotiation with remote devices
- CIS/BIS creation and management

#### `state_machine.cc`

Manages the connection state machine for each LE Audio device:

![State diagram of the native LE Audio connection state machine with states: Disconnected, Connecting, Connected, and Disconnecting. ](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/408b1944-6522-403f-84d1-639362e0b5df.png)

The above is a state diagram of the native LE Audio connection state machine with states: Disconnected, Connecting, Connected, and Disconnecting. The state machine is managed per-device in the native C++ layer and drives GATT connection setup, service discovery, and characteristic reads before transitioning to Connected.

#### `codec_manager.cc`

Handles codec configuration:

- Enumerates supported codec capabilities
- Selects optimal codec configuration based on device capabilities and use case
- Interfaces with the LC3 encoder/decoder

#### `iso_manager.cc`

Manages isochronous channels:

- Creates and tears down CIG/CIS for unicast
- Creates and tears down BIG/BIS for broadcast
- Handles the HCI interface for isochronous data

#### `audio_hal_client.cc`

Bridges the Bluetooth stack with the Android audio HAL:

- Receives PCM audio from the Android audio framework
- Passes it to the LC3 encoder
- Sends encoded audio over isochronous channels

### Layer 4: The Controller (Hardware)

The Bluetooth controller handles the low-level radio operations:

- Link layer scheduling of isochronous events
- PHY layer (1M, 2M, or Coded PHY)
- Packet formatting and CRC
- Retransmission of lost isochronous PDUs

The host (Android) communicates with the controller via **HCI** (Host Controller Interface), using specific HCI commands for isochronous channels:

- `HCI_LE_Set_CIG_Parameters`: Configure a Connected Isochronous Group
- `HCI_LE_Create_CIS`: Create Connected Isochronous Streams
- `HCI_LE_Create_BIG`: Create a Broadcast Isochronous Group
- `HCI_LE_Setup_ISO_Data_Path`: Set up the path for ISO data (HCI vs. vendor-specific)
- `HCI_LE_BIG_Create_Sync`: Synchronize to a BIG (for broadcast receivers)

---

## 11. Server-Side (Source) Implementation

The "server side" in LE Audio terminology is actually the **Unicast Server**, the device that renders audio (your earbuds). Yes, it's confusing that the receiver is called the "server." Think of it as a GATT server: it hosts the GATT services that the client connects to.

### What the Unicast Server Does

The Unicast Server (earbud) hosts several GATT services:

![GATT services hosted by a Unicast Server (earbud)](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/a6ce4211-1720-46b3-8965-0f5346c413fb.png)

The above diagram shows the GATT services hosted by a Unicast Server (earbud). The server exposes four key services:

- PACS (Published Audio Capabilities Service), which advertises the device's supported codecs, sample rates, frame durations, and audio contexts
- ASCS (Audio Stream Control Service), which contains one or more ASE (Audio Stream Endpoint) characteristics that the client writes to in order to configure and control audio streams
- VCS (Volume Control Service), which allows the client to read and set the device's volume level
- and CSIS (Coordinated Set Identification Service), which identifies this device as part of a coordinated set (for example, "I am the left earbud, and my partner is the right earbud").

The Unicast Client (phone) connects to these services via GATT to discover capabilities, configure streams, and control playback.

### The ASE State Machine (Server Side)

Each **ASE** (Audio Stream Endpoint) on the server has a state machine. This is the heart of audio stream management:

![State diagram of the ASE (Audio Stream Endpoint) state machine on the Unicast Server](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/e47ff774-1f97-4704-9ca7-83ba31ab17b1.png)
<!-- TODO: mermaid화 -->

The above is a state diagram of the ASE (Audio Stream Endpoint) state machine on the Unicast Server. States: Idle, Codec Configured, QoS Configured, Enabling, Streaming, Disabling, and Releasing. The client drives transitions by writing operations (Config Codec, Config QoS, Enable, Disable, Release) to the ASE Control Point characteristic.

State transitions:

1. **IDLE → CODEC_CONFIGURED**: The client writes a `Config Codec` operation to the ASE Control Point, specifying codec type (LC3), sample rate, frame duration, and so on.
2. **CODEC_CONFIGURED → QoS_CONFIGURED**: The client writes a `Config QoS` operation, specifying:
    - SDU interval (how often audio frames are sent)
    - Framing (framed or unframed)
    - Max SDU size
    - Retransmission number
    - Max transport latency
    - Presentation delay
3. **QoS_CONFIGURED → ENABLING**: The client writes an `Enable` operation. The server prepares to receive audio.
4. **ENABLING → STREAMING**: The CIS is established and audio data starts flowing. This transition happens after the client creates the CIS and both sides are ready.
5. **STREAMING → DISABLING**: The client writes a `Disable` operation, or the connection is being torn down.
6. **Any state → IDLE**: The client writes a `Release` operation, tearing down the stream configuration.

### Standard Codec Configurations

BAP defines a set of named codec configurations that map to specific LC3 parameters. These are the "presets" that devices negotiate:

| Config | Sample Rate | Frame Duration | Octets/Frame | Bitrate | Typical Use |
| --- | --- | --- | --- | --- | --- |
| 8_1 | 8 kHz | 7.5 ms | 26 | ~27.7 kbps | Low-bandwidth voice |
| 8_2 | 8 kHz | 10 ms | 30 | 24 kbps | Low-bandwidth voice |
| 16_1 | 16 kHz | 7.5 ms | 30 | 32 kbps | Telephony (low latency) |
| 16_2 | 16 kHz | 10 ms | 40 | 32 kbps | Telephony (standard) |
| 24_2 | 24 kHz | 10 ms | 60 | 48 kbps | Wideband voice |
| 32_1 | 32 kHz | 7.5 ms | 60 | 64 kbps | Super-wideband voice |
| 32_2 | 32 kHz | 10 ms | 80 | 64 kbps | Super-wideband voice |
| 48_1 | 48 kHz | 7.5 ms | 75 | 80 kbps | Music (low latency) |
| 48_2 | 48 kHz | 10 ms | 100 | 80 kbps | Music (balanced) |
| 48_4 | 48 kHz | 10 ms | 120 | 96 kbps | Music (high quality) |
| 48_6 | 48 kHz | 10 ms | 155 | 124 kbps | Music (highest quality) |

For most consumer earbuds, you'll see **48_4** (96 kbps at 48 kHz) for media and **16_2** (32 kbps at 16 kHz) for phone calls. That single LC3 codec handles both use cases – no more switching between SBC and mSBC!

### Audio Context Types

LE Audio defines **Audio Context Types**, metadata that tells the receiving device *what kind* of audio is being streamed. This allows the device to optimize its behavior (for example, enabling noise cancellation for calls or boosting bass for music):

| Context | Bit | When It's Used |
| ---: | :---: | :--- |
| Unspecified | 0x0001 | Generic audio, no specific optimization |
| Conversational | 0x0002 | Phone calls, VoIP, bidirectional, low-latency |
| Media | 0x0004 | Music, podcasts, video, high quality |
| Game | 0x0008 | Gaming, ultra-low latency priority |
| Instructional | 0x0010 | Navigation prompts, announcements |
| Voice Assistants | 0x0020 | "Hey Google" / "Hey Siri" |
| Live | 0x0040 | Live audio (concerts, broadcasts) |
| Sound Effects | 0x0080 | UI clicks, keyboard sounds |
| Notifications | 0x0100 | Message alerts, app notifications |
| Ringtone | 0x0200 | Incoming call ringtone |
| Alerts | 0x0400 | Alarms, timer alerts |
| Emergency Alarm | 0x0800 | Emergency broadcast alerts |

This is way more granular than Classic Audio, which basically only knew two states: "you're playing music" (A2DP) or "you're on a call" (HFP). With LE Audio, the device can make intelligent decisions, like "this is a game, use 7.5ms frames for minimum latency" or "this is a notification, mix it in without interrupting the music stream."

### AOSP Unicast Server Implementation

In AOSP, the Unicast Server functionality is implemented primarily for cases where the Android device acts as a receiver (for example, an Android-powered hearing aid or a Chromebook receiving audio).

Key classes:

- `LeAudioService.java`: Handles server-side operations when the device is in sink role
- In native code: `le_audio_server.cc` manages the GATT server hosting PACS, ASCS, and so on.

### Broadcast Source Implementation

For broadcast audio (Auracast), the source side in AOSP involves:

```java
// In LeAudioService.java / BroadcastService
public void startBroadcast(BluetoothLeBroadcastSettings settings) {
    // 1. Configure LC3 encoder with broadcast parameters
    // 2. Set up Extended Advertising with broadcast metadata
    // 3. Set up Periodic Advertising for stream parameters
    // 4. Create BIG via HCI
    // 5. Start sending ISO data on BIS streams
}
```

The native implementation:

- `broadcaster.cc` / `broadcaster_impl`: Manages broadcast lifecycle
- Configures **Extended Advertising** with the broadcast name and metadata
- Configures **Periodic Advertising** to carry the BASE (Broadcast Audio Source Endpoint) data structure
- Creates a **BIG** with the appropriate number of BIS streams
- Routes encoded audio to the BIS data path

---

## 12. Client-Side (Sink) Implementation

The "client side" is the **Unicast Client**, typically your phone. It discovers, connects to, and controls LE Audio devices.

### Connection Flow

Here's what happens when you connect to LE Audio earbuds, step by step:

![Sequence diagram of the LE Audio connection flow between a phone (Unicast Client) and earbuds (Unicast Server). ](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/391fca1a-897e-4e4c-b8ea-d0daad76bb38.png)
<!-- TODO: mermaid화 -->

Steps: BLE scan and discovery, GATT connection, service discovery (finding PACS, ASCS, CSIP, VCS), reading PAC records to learn audio capabilities, reading CSIS to identify coordinated set membership, then ASE configuration (Config Codec, Config QoS, Enable) followed by CIS creation and audio streaming.

### AOSP Client Implementation in Detail

#### Step 1-3: Discovery and Connection

```java
// LeAudioService.java
public void connect(BluetoothDevice device) {
    // Creates a new LeAudioStateMachine for this device
    LeAudioStateMachine sm = getOrCreateStateMachine(device);
    sm.sendMessage(LeAudioStateMachine.CONNECT);
    
    // The state machine handles:
    // - GATT connection
    // - Service discovery
    // - Characteristic reads
}
```

The `LeAudioStateMachine` manages the connection lifecycle:

```java
// LeAudioStateMachine.java (simplified)
class LeAudioStateMachine extends StateMachine {
    
    class Disconnected extends State {
        void processMessage(Message msg) {
            if (msg.what == CONNECT) {
                // Initiate GATT connection via native
                mNativeInterface.connectLeAudio(mDevice);
                transitionTo(mConnecting);
            }
        }
    }
    
    class Connecting extends State {
        void processMessage(Message msg) {
            if (msg.what == CONNECTION_STATE_CHANGED) {
                if (newState == CONNECTED) {
                    transitionTo(mConnected);
                }
            }
        }
    }
    
    class Connected extends State {
        void enter() {
            // GATT services have been discovered
            // Audio capabilities have been read
            // Device is ready for streaming
            broadcastConnectionState(BluetoothProfile.STATE_CONNECTED);
        }
    }
}
```

#### Step 4-6: Capability Discovery

The native layer reads PACS to understand what the remote device supports:

```cpp
// In native le_audio_client_impl (C++)
void OnGattServiceDiscovery(BluetoothDevice device) {
    // Read PAC records from PACS
    ReadPacsCharacteristics(device);
    
    // Read CSIS for coordinated set info
    ReadCsisCharacteristics(device);
    
    // Read ASCS for ASE count and state
    ReadAscsCharacteristics(device);
}

void OnPacsRead(BluetoothDevice device, PacRecord sink_pac) {
    // sink_pac contains:
    //   codec_id: LC3
    //   sampling_frequencies: 48000, 44100, 32000, 24000, 16000, 8000
    //   frame_durations: 10ms, 7.5ms
    //   channel_counts: 1
    //   octets_per_frame: 40-155  (maps to bitrate range)
    //   supported_contexts: MEDIA, CONVERSATIONAL, GAME
    
    // Store capabilities for later codec negotiation
    device_info.sink_capabilities = sink_pac;
}
```

#### Step 7-12: Stream Setup

When audio playback begins, the client configures and enables streams:

```cpp
// In native codec_manager (C++)
CodecConfig SelectCodecConfiguration(
    PacRecord remote_capabilities,
    AudioContext context  // MEDIA, CONVERSATIONAL, etc.
) {
    // For media playback, prefer high quality:
    //   48 kHz, 10ms frames, 96 kbps per channel
    
    // For voice calls, optimize for latency:
    //   16 kHz, 7.5ms frames, 32 kbps per channel
    
    // Negotiate: intersect local and remote capabilities
    // Select the best configuration both sides support
}

// In native le_audio_client_impl
void GroupStreamStart(int group_id, AudioContext context) {
    auto group = GetGroup(group_id);
    auto codec_config = SelectCodecConfiguration(
        group->GetRemoteCapabilities(), context);
    
    // For each device in the group:
    for (auto& device : group->GetDevices()) {
        // For each ASE on the device:
        for (auto& ase : device->GetAses()) {
            // Step 8: Config Codec
            WriteAseControlPoint(device, OPCODE_CONFIG_CODEC, {
                .ase_id = ase->id,
                .codec_id = LC3,
                .codec_specific = {
                    .sampling_freq = 48000,
                    .frame_duration = 10ms,
                    .channel_allocation = LEFT,  // or RIGHT
                    .octets_per_frame = 120
                }
            });
        }
    }
    // After codec configured notification:
    //   Step 9: Config QoS → Step 10: Enable → Step 11: Create CIS
}
```

#### Step 13: Audio Data Flow

Once streaming, here's how audio data flows through the AOSP stack:

![Diagram showing audio data flow during LE Audio streaming](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/b42f698d-2a24-4376-8121-bffe101fa7f5.png)
<!-- TODO: mermaid화 -->

The above diagram shows audio data flow during LE Audio streaming: PCM audio from the Android audio framework reaches the Bluetooth Audio HAL, is encoded by the LC3 encoder, packetized into ISO SDUs with timestamps, sent over HCI to the controller, transmitted over the air via CIS, received by the earbud's controller, decoded by the earbud's LC3 decoder, and rendered as audio.

### Broadcast Sink Implementation

For receiving broadcast audio (Auracast), AOSP implements:

```cpp
// Broadcast sink flow (native)
void OnBroadcastSourceFound(AdvertisingReport report) {
    // Parse Extended Advertising for broadcast metadata
    BroadcastMetadata metadata = ParseBroadcastMetadata(report);
    
    // Display: "Airport Gate B47 - English"
    NotifyBroadcastSourceFound(metadata);
}

void SyncToBroadcast(BroadcastMetadata metadata) {
    // 1. Sync to Periodic Advertising
    HCI_LE_Periodic_Advertising_Create_Sync(metadata.sync_info);
    
    // 2. On PA sync established, parse BASE
    BASE base = ParseBASE(periodic_adv_data);
    
    // 3. Select subgroup and BIS streams
    // 4. Sync to BIG
    HCI_LE_BIG_Create_Sync(base.big_params, selected_bis);
    
    // 5. Set up ISO data path
    HCI_LE_Setup_ISO_Data_Path(bis_handle, HCI_DATA_PATH);
    
    // 6. Start receiving and decoding audio
}
```

---

## 13. The State Machine That Runs It All

The AOSP LE Audio implementation uses several interconnected state machines:

### Connection State Machine

Manages the overall connection lifecycle for each device:

![State diagram showing the LE Audio connection state machine with four states: Disconnected, Connecting, Connected, and Disconnecting.](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/f534c8b5-5874-4af8-824c-da1c15e3188e.png)
<!-- TODO: mermaid화 -->

This state diagram shows the LE Audio connection state machine with four states: Disconnected, Connecting, Connected, and Disconnecting.

Transitions: CONNECT event moves from Disconnected to Connecting, successful connection moves to Connected, DISCONNECT event moves to Disconnecting, and completion returns to Disconnected. Timeout or failure from Connecting also returns to Disconnected.

### Group Audio State Machine

Manages the audio state for a *group* of devices (coordinated set):

![State diagram of the group audio state machine with states: Idle, Codec Configured, QoS Configured, Enabling, Streaming, and Disabling. ](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/54c9bb32-d6ad-4f1d-8238-7fd8c09c19d4.png)
<!-- TODO: mermaid화 -->

This is a state diagram showing the group audio state machine with states: Idle, Codec Configured, QoS Configured, Enabling, Streaming, and Disabling. The forward path proceeds through each state in order as audio streams are set up. The Release operation returns any state to Idle.

### How the Pieces Fit Together (Code Walkthrough)

Here's a simplified walkthrough of what happens when you press "play" on your music app with LE Audio earbuds connected:

![Diagram that traces the sequence of events when a user presses "play" in a music app with LE Audio earbuds connected](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/8086fa96-68c6-4d28-9670-76b3264d9031.png)
<!-- TODO: mermaid화 -->

The above diagram traces the sequence of events when a user presses "play" in a music app with LE Audio earbuds connected.

The flow is:

1. The music app writes PCM audio to an AudioTrack.
2. The Android AudioFlinger routes the audio to the Bluetooth Audio HAL.
3. The HAL notifies LeAudioService that audio is starting.
4. LeAudioService looks up the active group and triggers GroupStreamStart in the native stack.
5. The native stack configures ASEs on both earbuds (Config Codec → Config QoS → Enable) by writing to the ASCS control point on each device.
6. The native stack creates a CIG with two CIS channels via HCI.
7. Both CIS channels are established to the earbuds.
8. The ISO data path is set up.
9. PCM audio flows from the HAL to the LC3 encoder, which produces compressed frames
10. The compressed frames are sent as ISO SDUs over HCI to the controller
11. The controller transmits the frames over the air on the scheduled CIS intervals
12. The earbuds receive, decode, and render the audio at the agreed presentation delay.

---

## 14. Putting It All Together: A Day in the Life of an LE Audio Packet

Let's follow a single audio packet from your music app to your earbud:

![Diagram following a single audio packet through every stage of the LE Audio pipeline](https://cdn.hashnode.com/uploads/covers/68a51326db25241b7cb0c047/e4e634cc-04db-4413-a197-ddbd1169c16a.png)

The above diagram follows a single audio packet through every stage of the LE Audio pipeline.

Starting at the top: the music app generates PCM audio, which passes through Android's AudioFlinger to the Bluetooth Audio HAL. The HAL feeds 10ms of PCM samples (480 samples at 48 kHz) to the LC3 encoder, which compresses them into a ~120-byte frame.

This frame is wrapped in an ISO SDU with a timestamp and sequence number, then passed over HCI to the Bluetooth controller. The controller segments the SDU into link-layer PDUs, schedules them on the next CIS event, and transmits them over the air using the negotiated PHY (for example, 2M PHY).

On the earbud side, the controller receives the PDUs, reassembles the ISO SDU, and passes the LC3 frame to the earbud's decoder. The decoder reconstructs 480 PCM samples, which are buffered until the presentation delay timestamp is reached, then rendered to the speaker driver.

**Total latency**: ~40ms from phone to earbud (with 10ms frame + transport + presentation delay). Compare this to Classic Bluetooth A2DP which typically runs at 100-200ms!

### The Presentation Delay: The Synchronization Secret

The **presentation delay** is a crucial LE Audio concept. It's a fixed delay that both sides agree upon during stream setup. All audio must be rendered (played) at exactly:

```plaintext
rendering_time = reference_anchor_point + presentation_delay
```

This ensures:

- Left and right earbuds play audio at the exact same instant
- Even if transport latency varies between the two CIS channels
- The presentation delay provides a "buffer" for the receiver to absorb jitter

Think of it like a choir director: "Everyone sing at the count of 3. Not before, not after. Exactly at 3."

---

## 15. Wrapping Up

Bluetooth LE Audio is the most significant upgrade to Bluetooth audio since... well, since Bluetooth audio was invented. Let's recap:

### What It Solves

- **Better codec** (LC3) — equivalent quality at half the bitrate, or better quality at the same bitrate
- **Multi-stream** — no more relay earbud architecture, balanced battery life
- **Broadcast audio** (Auracast) — one-to-many streaming, opening up entirely new use cases
- **Hearing aid support** (HAP) — finally a standard, interoperable solution
- **Unified audio** (BAP) — one profile for both music and calls, no more A2DP/HFP switching

### The AOSP Stack

- **Framework layer**: `BluetoothLeAudio`, `BluetoothLeBroadcast` APIs
- **Service layer**: `LeAudioService` orchestrates everything
- **Native layer**: C++ `le_audio_client_impl` handles GATT, ASE state machines, codec negotiation
- **Controller layer**: CIS/BIS isochronous channels managed via HCI

### What's Next?

LE Audio is still maturing. Key areas of development:

- **Better interoperability** across devices from different manufacturers
- **Auracast infrastructure** — venues need to install broadcast transmitters
- **Dual-mode support** — many devices will support both Classic and LE Audio during the transition period
- **Higher quality** — as Bluetooth bandwidth improves, LC3 can scale to even higher bitrates
- **Gaming** — ultra-low-latency configurations (7.5ms frames, minimal presentation delay)

The transition from Classic Audio to LE Audio won't happen overnight. It's more like the transition from IPv4 to IPv6 – gradual, sometimes painful, but ultimately necessary. The good news is that both can coexist, and the AOSP implementation supports fallback to Classic Audio for devices that don't support LE Audio.

So the next time you connect your earbuds and marvel at the audio quality (or lack thereof), you'll know exactly which parts of this massive protocol stack are working (or failing) to get those sound waves from your phone to your ears.

Happy coding, and may your packets always be isochronous!

::: info References

<SiteInfo
  name="LE Audio Specifications | Bluetooth® Technology Website"
  desc="LE Audio introduces an entirely new architecture for supporting audio applications using Bluetooth® technology and sets the stage for the next 20 years of innovation in wireless audio."
  url="https://bluetooth.com/learn-about-bluetooth/feature-enhancements/le-audio/le-audio-specifications/"
  logo="https://bluetooth.com/wp-content/uploads/Sitecore-Media-Library/2018/favicon.ico"
  preview="https://bluetooth.com/wp-content/uploads/2025/03/GettyImages-1347685599-1000.jpg"/>

<SiteInfo
  name="A technical overview of LC3 | Bluetooth® Technology Website"
  desc="Blog Over the past two decades, since its inception, Bluetooth® technology has become the go-to solution for the vast majority of wireless audio streaming applications. If you’ve ever listened to…"
  url="https://bluetooth.com/blog/a-technical-overview-of-lc3//"
  logo="https://bluetooth.com/wp-content/uploads/Sitecore-Media-Library/2018/favicon.ico"
  preview="https://bluetooth.com/wp-content/uploads/2025/03/contemplative-woman-in-white-shirt-with-tablet-illuminated-by-vibrant-city-lights-at-night.jpg"/>

```component VPCard
{
  "title": "platform/packages/modules/Bluetooth - Git at Google",
  "desc": "",
  "link": "https://android.googlesource.com/platform/packages/modules/Bluetooth//",
  "logo": "https://android.googlesource.com/favicon.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

<SiteInfo
  name="LC3/LC3plus"
  desc="The LC3 and LC3plus audio codecs solve essential shortcomings present in today’s wireless communication platforms such as Bluetooth and Digital Enhanced Cordless Telecommunications (DECT). The codecs’ operation modes range from medium bit rates for optimal voice transmission up to high bit rates for high-resolution music streaming services (the latter applies to LC3plus). At the same time, the codecs operate at low latency, low computational complexity and low memory footprint."
  url="https://iis.fraunhofer.de/en/ff/amm/communication/lc3.html/"
  logo="https://iis.fraunhofer.de/static/css/fraunhofer/resources/img/favicons/favicon.svg"
  preview="https://iis.fraunhofer.de/en/ff/amm/communication/lc3/jcr:content/socialMediaImage.img.4col.large.jpg/1584626201598/LC3-web.jpg"/>


<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Bluetooth LE Audio Handbook: From "Why Does My Call Sound Like a Tin Can?" to AOSP Implementation",
  "desc": "Since the early 2000s, Bluetooth has been the dominant way we listen to wireless audio, powering everything from the first mono headsets to today's true wireless earbuds. But the underlying technology",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-bluetooth-le-audio-handbook/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
