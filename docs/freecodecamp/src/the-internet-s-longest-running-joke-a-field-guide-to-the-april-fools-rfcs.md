---
lang: en-US
title: "The Internet's Longest-Running Joke: A Field Guide to the April Fools RFCs"
description: "Article(s) > The Internet's Longest-Running Joke: A Field Guide to the April Fools RFCs"
icon: fas fa-computer
category:
  - Engineering
  - Computer
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - engineering
  - coen
  - computerengineering
  - computer-engineering
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Internet's Longest-Running Joke: A Field Guide to the April Fools RFCs"
    - property: og:description
      content: "The Internet's Longest-Running Joke: A Field Guide to the April Fools RFCs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-internet-s-longest-running-joke-a-field-guide-to-the-april-fools-rfcs.html
prev: /academics/coen/articles/README.md
date: 2026-07-29
isOriginal: false
author:
  - name: Omer Rosenbaum
    url: https://freecodecamp.org/news/author/omerros/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/57a6dfdc-d28b-45c5-a047-753e0b8f1ee0.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Computer Engineering > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/coen/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Internet's Longest-Running Joke: A Field Guide to the April Fools RFCs"
  desc="Here's a line from an official document published by the people who run the internet: ”Readers who cannot distinguish satire by reading the text may have a future in marketing.” This line actually s"
  url="https://freecodecamp.org/news/the-internet-s-longest-running-joke-a-field-guide-to-the-april-fools-rfcs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/57a6dfdc-d28b-45c5-a047-753e0b8f1ee0.png"/>

Here's a line from an official document published by the people who run the internet:

> *"Readers who cannot distinguish satire by reading the text may have a future in marketing."*

This line actually sits inside the RFC Editor's *Instructions to RFC Authors*, the actual rulebook for how internet standards get written [^1].

[^1]: The April 1st tradition and the "future in marketing" line come from the RFC Editor's *Instructions to RFC Authors* (in its April 1 satire guidance). Quoted and sourced at [<VPIcon icon="fa-brands fa-wikipedia-w"/>Wikipedia, "April Fools' Day RFC"](https://en.wikipedia.org/wiki/April_Fools%27_Day_Request_for_Comments). See also the [<VPIcon icon="fas fa-globe"/>RFC Editor](https://rfc-editor.org/).


This raises a fair question: why does the standards body behind IP, TCP, and HTTP need to warn you, in writing, that some of its own documents are jokes?

Because for almost fifty years, it has been publishing them on purpose.

If you've followed my posts, you know I love computer networks, and specifically the nitty-gritty of the protocols we all rely on. When I first stumbled onto this particular tradition, I was genuinely stunned, and it's since become one of my favorite things to talk about. So let's take the tour.

Every April 1st since 1978, the IETF has published at least one deliberately humorous RFC. The best ones are indistinguishable, in form, from the documents that define the real internet.

This article is based on my talk "April Fools' Day RFCs." If you prefer video, [<VPIcon icon="fa-brands fa-youtube"/>watch it here](https://youtu.be/Pv3AyfFzUss). Every RFC I mention is real and linked in the [References](#references) at the end, so you can go read the originals yourself.

---

## First, What Even is an RFC?

**RFC** stands for **Request for Comments**. It's a numbered document describing a protocol or standard of the internet, published by the Internet Engineering Task Force (the IETF) since 1969. If you've ever wondered where the rules live, this is where.

Each RFC gets exactly one number and is never edited after the fact. It can be *updated* or *obsoleted* by a later RFC, but the original stays frozen, forever, at its number. It's the closest thing the internet has to a constitution: a body of documents that says "here is the standard," and then everyone building routers and browsers and mail servers agrees to follow it.

Now hold that mental picture: the sober numbered standard, the frozen constitution, because the joke only works if you take the format as seriously as the IETF does.

---

## The One That Started it All: RFC 748 (1978)

In 1978, something odd showed up in the series. Mark Crispin, who would later create IMAP (the protocol your email client uses to read your inbox), published RFC 748: the **"TELNET RANDOMLY-LOSE Option."** [^2]

[^2]: RFC 748, [<VPIcon icon="fas fa-globe"/>"TELNET RANDOMLY-LOSE Option"](https://rfc-editor.org/rfc/rfc748.html) (M. Crispin, 1978).

His observation: many networked hosts of the day already provided "random lossage," meaning crashes, dropped data, and programs that misbehaved for no reason. The problem, he wrote, was that this was an *undocumented* feature. So RFC 748 set out to fix that, not by removing the misbehavior, but by standardizing it.

It proposed Telnet option code `256`, so two machines could formally negotiate whether a server is *allowed* to randomly malfunction:

- `IAC WILL RANDOMLY-LOSE`: "I request permission to randomly lose."
- `IAC DON'T RANDOMLY-LOSE`: "I demand you stop randomly losing my data."

It appeared out of nowhere, perfectly deadpan, formatted like every serious option spec around it. And ever since, the RFC Editor has kept the tradition alive (almost) every single April 1st.

---

## The Official Position (and the Marketing Line)

The tradition is official enough that it's written into the *Instructions to RFC Authors* [^1]:

> *"Many years ago the RFC Editor established the practice of publishing one or more satire documents on April 1 of each year. Readers should be aware that many of the RFCs bearing the date April 1 are not to be taken seriously."*

And then the kicker, which is where our opening quote comes from:

> *"Note that in past years the RFC Editor has sometimes published serious documents with April 1 dates. Readers who cannot distinguish satire by reading the text may have a future in marketing."*

For the record, I love marketing people. That's the IETF talking, not me. 😄 But you can see the mischief: they will happily publish a *real* standard on April 1st too, and it's your job to tell which is which by reading the actual text. Now let's meet the classics.

---

## RFC 1149: IP Over Avian Carriers (1990)

This is probably probably the most famous joke RFC has ever written.

![A World War II–era homing pigeon perched on a branch with a small camera harness strapped to its chest<br/>Photo: [<VPIcon icon="fas fa-globe"/>Bundesarchiv, Bild 183-R01996](https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-R01996,_Brieftaube_mit_Fotokamera.jpg) / [<VPIcon icon="fas fa-globe"/>CC BY-SA 3.0 DE*](https://creativecommons.org/licenses/by-sa/3.0/de/deed.en). (Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/Pv3AyfFzUss))](https://upload.wikimedia.org/wikipedia/commons/d/dd/Bundesarchiv_Bild_183-R01996%2C_Brieftaube_mit_Fotokamera.jpg)

In 1990, David Waitzman defined a standard for transmitting IP datagrams using **homing pigeons** [^3]. Written completely straight, it acknowledges the real engineering trade-offs: high latency, packet loss (hawks), and interference from storms. The maximum transmission unit, the largest chunk you can send at once, is limited by the leg length of the carrier (I covered MTUs in [**my post about how IPv4 works**](/freecodecamp.org/how-ipv4-works-a-handbook-for-developers.md)).

[^3]: RFC 1149, [<VPIcon icon="fas fa-globe"/>"A Standard for the Transmission of IP Datagrams on Avian Carriers"](https://rfc-editor.org/rfc/rfc1149.html) (D. Waitzman, 1990). Bergen implementation: [<VPIcon icon="fas fa-globe"/>Bergen Linux User Group, "The pigeon protocol"](https://web.archive.org/web/20140215072304/http://www.blug.linux.no/rfc1149/).

Here's the packet format, quoted directly from the RFC:

> *"The IP datagram is printed, on a small scroll of paper, in hexadecimal, with each octet separated by whitespace and comments. The scroll of paper is wrapped around one leg of the avian carrier."*

An octet is just another word for a byte. And yes, this is a real, published, numbered RFC.

### When People Actually Implemented it (Bergen, 2001)

Here's where it gets wonderful. In 2001, the **Bergen Linux User Group** in Norway decided to actually do it. They sent 9 ICMP echo request packets (pings, from our layer-3 video) by pigeon, over 5 kilometers.

The results were exactly as scientific as you'd hope:

- Packet loss: **55%** (only 4 of the 9 pigeons made it).
- Round-trip time: roughly **50 to 100 minutes** per packet.

This is the first confirmed RFC 1149-compliant ping in history. Rendered as normal `ping` output, the run looked like this:

```plaintext
64 bytes from 10.0.3.1: icmp_seq=0 ttl=255 time=6165731.1 ms
64 bytes from 10.0.3.1: icmp_seq=4 ttl=255 time=3211900.8 ms
64 bytes from 10.0.3.1: icmp_seq=2 ttl=255 time=5124922.8 ms
64 bytes from 10.0.3.1: icmp_seq=1 ttl=255 time=6388671.9 ms
```

That's about six thousand seconds of round-trip time. Which, for a pigeon, is honestly not bad.

### Winston the Pigeon vs. Telkom (2009)

Fast-forward to 2009, South Africa. The Unlimited Group, a financial-services company, had two branches 80 km apart and was fed up with the glacial ADSL from Telkom, the local telecom. One employee joked that a pigeon would be faster. So they tested it. 🐦

They strapped a 4 GB memory card to **Winston**, an eleven-month-old homing pigeon, and flew him 80 km from Howick to Hillcrest. Winston made the flight in **1 hour 8 minutes**; counting the time to unload the card onto a computer, the whole transfer took about **2 hours, 6 minutes, and 57 seconds**.

Meanwhile, the same 4 GB file was uploading over Telkom's ADSL in parallel. By the time Winston landed, roughly **100 MB** had gone through. About 4%. The projected time to finish the upload was up to two days.

Winston won, and it wasn't close. Kevin Rolfe, the company's head of IT, said the stunt was meant to start a conversation about South African broadband, not to single out Telkom. Mission accomplished.

---

## RFC 2549: Pigeons, but with Quality of Service (1999)

Naturally, a protocol this important needed a sequel. RFC 2549 added **Quality of Service** to avian carriers [^4]. It defines service classes (first class, business class, and coach), waxed paper to waterproof your datagrams, and it reclassifies storm avoidance as a routing problem. First-class carriers even get encryption, by trapping the data scroll *inside* the feathers.

[^4]: RFC 2549, [<VPIcon icon="fas fa-globe"/>"IP over Avian Carriers with Quality of Service"](https://rfc-editor.org/rfc/rfc2549.html) (D. Waitzman, 1999).

Best of all, it includes real ASCII art of the Weighted Fair Queuing implementation, which is a pigeon on a scale:

```plaintext
                                                  __
                                  _____/-----\   / o\
                                 <____   ______/    >--
                 +-----+              \ /    /______/
                 | 10g |               /|:||/
                 +-----+              /____/|
                 | 10g |                    |
                 +-----+          ..        X
               ===============================
                              ^
                              |
                          =========
```

Two ten-gram weights, one pigeon, and a level scale, so you know the packet weighs exactly twenty grams and can be queued accordingly.

---

## RFC 3514: The Evil Bit (2003)

This one might be my favorite piece of satire in the whole series, because it skewers a genuinely hard problem.

A firewall's entire job is to tell malicious traffic from benign traffic. That's difficult. So in 2003, Steve Bellovin proposed a beautifully simple fix [^5]. The IPv4 header has a single unused bit reserved for future use (if you want a reminder - check out [**my previous post**](/freecodecamp.org/how-ipv4-works-a-handbook-for-developers.md)). Bellovin found a use for it: the **evil bit**.

[^5]: RFC 3514, [<VPIcon icon="fas fa-globe"/>"The Security Flag in the IPv4 Header"](https://rfc-editor.org/rfc/rfc3514.html) (S. Bellovin, 2003).


- Sending a benign packet? Leave the bit `0`.
- Sending something malicious? You **must** set the bit to `1`.

Firewalls simply drop every packet with the evil bit set. Problem solved. All of cybersecurity, accomplished. The entire security model, as specified in the RFC, is this:

```plaintext
  0
 +-+
 |E|
 +-+
```

---

## RFC 1925: The Twelve Networking Truths (1996)

In 1996, Ross Callon published a list of "fundamental truths" about networking [^6]. It's written completely straight, with the same abstract and numbered sections as any real standard. The humor is entirely in the contrast between the sober packaging and what's actually inside. A few of my favorites:

- **(2)** "No matter how hard you push and no matter what the priority, you can't increase the speed of light."
- **(4)** "Some things in life can never be fully appreciated nor understood unless experienced firsthand."
- **(7a)** "Good, fast, cheap: pick any two (you can't have all three)."
- **(11)** "Every old idea will be proposed again with a different name and a different presentation, regardless of whether it works."

[^6]: RFC 1925, [<VPIcon icon="fas fa-globe"/>"The Twelve Networking Truths"](https://rfc-editor.org/rfc/rfc1925.html) (R. Callon, 1996).

If you've spent any time in this industry, number 11 probably stung a little. 🙌🏻

---

## RFC 2324: the Coffee Pot, and Status 418 (1998) ☕

You've almost certainly seen the punchline of this one without knowing where it came from.

![A brown ceramic teapot sitting on a black laptop, standing in for an internet-connected coffee pot<br/>Photo: [<VPIcon icon="fas fa-globe"/>Joseph, Royal Holloway](https://commons.wikimedia.org/wiki/File:HTCPCP_Pot.jpg) / [<VPIcon icon="fas fa-globe"/>CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). (Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/Pv3AyfFzUss))](https://upload.wikimedia.org/wikipedia/commons/4/4d/HTCPCP_Pot.jpg)

In 1998, Larry Masinter proposed the **Hyper Text Coffee Pot Control Protocol** (HTCPCP), for controlling, monitoring, and diagnosing coffee pots over HTTP [^7]. It adds two methods to HTTP, `BREW` and `WHEN` (the latter tells the pot to stop pouring milk), and it introduces a new status code:

> **418 I'm a teapot.** A teapot asked to brew coffee should respond with 418. Every HTTP status code starting with `4` (for example, `400`, `401`) is a client error, so this is saying: if you ask a teapot to make coffee, that's *your* mistake. And this fictional status code became so beloved that real software adopted it.

[^7]: RFC 2324, [<VPIcon icon="fas fa-globe"/>"Hyper Text Coffee Pot Control Protocol (HTCPCP/1.0)"](https://rfc-editor.org/rfc/rfc2324.html) (L. Masinter, 1998).

### The 418 That Refused to Die

![A ceramic teapot with a Raspberry Pi circuit board tucked inside it, its lid removed and a cable running out<br/>Photo: [<VPIcon icon="fas fa-globe"/>A. Cilia](https://commons.wikimedia.org/wiki/File:Htcpcp_teapot.jpg) / [<VPIcon icon="fas fa-globe"/>CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). (Source: [<VPIcon icon="fa-brands fa-youtube"/>*Brief](https://youtu.be/Pv3AyfFzUss))](https://upload.wikimedia.org/wikipedia/commons/4/45/Htcpcp_teapot.jpg)

Visit `google.com/teapot` on a phone and tilt the device: the little teapot tips over and pours, while returning HTTP status `418`. Node.js, Python, Go, and plenty of other stacks ship `418` right in their HTTP libraries.

In 2017, the chair of the IETF's HTTP Working Group, Mark Nottingham, campaigned to *remove* `418`, arguing that a joke code had no place in real implementations. The community fought back hard: `save418.com` rallied developers, and `418` survived [^8]. A fictional status code from an April Fools' RFC is now one of the most widely recognized codes on the web. It was later even extended for tea, with RFC 7168 [^9].

[^8]: The campaign to save 418: [<VPIcon icon="fa-brands fa-wikipedia-w"/>save418.com](https://save418.com/); background at [<VPIcon icon="fa-brands fa-wikipedia-w"/>Wikipedia, "HTTP 418"](https://en.wikipedia.org/wiki/HTTP_418).
[^9]: RFC 7168, [<VPIcon icon="fas fa-globe"/>"The Hyper Text Coffee Pot Control Protocol for Tea Efflux Appliances (HTCPCP-TEA)"](https://rfc-editor.org/rfc/rfc7168.html) (2014).

---

## The Art of ASCII: RFC 8140 (2017)

In 2017, Adrian Farrel, a prolific author of *serious* RFCs, ended a joke-less 2016 with RFC 8140, whose full title is deliberately unspellable: *"The Arte of ASCII: Or, An True and Accurate Representation of an Menagerie of Thynges Fabulous and Wonderful in Ye Forme of Character"* [^10].

[^10]: RFC 8140, [<VPIcon icon="fas fa-globe"/>"The Arte of ASCII…"](https://rfc-editor.org/rfc/rfc8140.html) (A. Farrel, 2017).

The ye-olde-English styling is part of the bit. The entire RFC has no protocol, no proposal, no abstract, nothing but a gallery of ASCII art, a self-aware nod to how much of the RFC corpus is exactly that. A sample:

```plaintext
                                            .:\::::/:.
                +-------------------+      .:\:\::/:/:.
                |   PLEASE DO NOT   |     :.:\:\::/:/:.:
                |  FEED THE TROLLS  |    :=.`  -  -  '.=:
                |                   |    `=(\  0  0  /)='
                |  Thank you,       |       (  (__)  )
                |   The Management  |     .--`-vvvv-'--
                +-------------------+     |            |
                         | |             /  /(      )\  \
                         | |            /  / (  /\  ) \  \
                         | |           (  | /  /  \  \ |  )
                         | |            ^^ (  (    )  ) ^^
                         | |              __\  \  /  /__
                         | |            `(______||______)'
                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

There's a unicorn, the Loch Ness Monster, a flock of avian carriers (a callback to RFC 1149), a security key, and a "backdoor left conveniently open," which is, of course, just a door. You can also find the cursed vampire:

```plaintext
                                 /\     /\
                                /  ---/  \
                    /\    /\   |           |   /\    /\
                   /  \  /  \  |   - - |  /  \  /  \
                  /    \/    \/   (.) (.)   \/    \/    \
                 /                 - -               \
                /                  _ _ _                  \
               /    ------\         V V         /------  \
              /    /       \                   /       \    \
              -----       \                 /         -----
                             \               /
                              \             /
                               |           |
                               |     ^     |
                                \   / \   /
                                 vvv   vvv
```

Its reflection in a mirror? An empty mirror frame, because vampires don't have one. People put real care into this.

```plaintext
                          _______________________
                         |  ___________________  |
                         | |                   | |
                         | |                   | |
                         | |                   | |
                         | |                   | |
                         | |                   | |
                         | |                   | |
                         | |                   | |
                         | |                   | |
                         | |                   | |
                         | |                   | |
                         | |                   | |
                         | |                   | |
                         | |                   | |
                         | |                   | |
                         | |                   | |
                         | |                   | |
                         | |                   | |
                         | |                   | |
                         | |___________________| |
                         |_______________________|
                      ___(_______________________)___
                     (_______________________________)
```

---

## The Modern Gems

The tradition is alive and well. A rapid-fire tour of recent entries:

### RFC 8565: Hypertext Jeopardy Protocol (2019)

Every HTTP response must be phrased as a question [^11]. `200 OK` becomes `200 What is OK?`. `404 Not Found` becomes `404 What is Not Found?`. `500 Internal Server Error` becomes `500 What is Internal Server Error?`.

[^11]: RFC 8565, [<VPIcon icon="fas fa-globe"/>"Hypertext Jeopardy Protocol (HTJP/1.0)"](https://rfc-editor.org/rfc/rfc8565.html) (2019).

### RFC 6214: RFC 1149 for IPv6 (2011)

The pigeons get modern addressing [^12]. Because IPv6 addresses are four times longer, the RFC recommends larger birds or smaller fonts, suggests multiple pigeons per header, and handles multicast with, naturally, flocks of pigeons.

[^12]: RFC 6214, [<VPIcon icon="fas fa-globe"/>"Adaptation of RFC 1149 for IPv6"](https://rfc-editor.org/rfc/rfc6214.html) (2011).

### RFC 9564: Faster Than Light Speed Protocol, or FLIP (2024)

This one leans into the moment [^13]. It proposes using AI and large language models to *predict* the packets you're about to receive and deliver them before they actually arrive, achieving faster-than-light communication. As jokes go, it aged into being uncomfortably on-theme.

[^13]: RFC 9564, [<VPIcon icon="fas fa-globe"/>"Faster Than Light Speed Protocol (FLIP)"](https://rfc-editor.org/rfc/rfc9564.html) (M. Blanchet, 2024).

### RFC 9759: Unified Time Scaling (2025)

It introduces the **Two-Week Principle** [^14]. Every duration, no matter its true value, must be normalized to "two weeks." It even specifies that iCalendar be updated so every meeting collapses to exactly two weeks. Any engineer who has ever estimated a task knows precisely why this is funny.

[^14]: RFC 9759, [<VPIcon icon="fas fa-globe"/>"Unified Time Scaling for Temporal Coordination Frameworks"](https://rfc-editor.org/rfc/rfc9759.html) (K. Kuhns, 2025).

### RFC 9948: Internet Protocol Police (2026)

This year's entry establishes the Internet Protocol Police and their schedule of punishments for offenses against "the collected wisdom of the IETF" [^15]. Minor offenses include bad grammar and dangling participles, while major offenses include using an IANA code point without registering it.

[^15]: RFC 9948, [<VPIcon icon="fas fa-globe"/>"Internet Protocol Police (IPP) - Schedule of Punishments"](https://rfc-editor.org/rfc/rfc9948.html) (2026).

It builds on a real earlier RFC, 8962, which established the Protocol Police and promised that enforcement would never actually happen [^16].

[^16]: RFC 8962, [<VPIcon icon="fas fa-globe"/>"Establishing the Protocol Police"](https://rfc-editor.org/rfc/rfc8962.html) (2021).

### RFC 9949: BUSA-TLS (2026)

Also from this year, and my personal winner for most absurd [^17]. It specifies that TLS 1.3 pre-shared key material must be derived from the SHA-256 hash of the raw audio of a specific 1990 rap song ("Banned in the U.S.A." by 2 Live Crew). All implementations must hash the *same* song, so compliance is about audio identity, not key strength.

[^17]: RFC 9949, [<VPIcon icon="fas fa-globe"/>"BUSA-TLS…"](https://rfc-editor.org/rfc/rfc9949.html) (R. Sayre, 2026).

It's a joke about copyright-encumbered inputs to cryptography, and the fact that you genuinely *can* derive a key this way.

---

## What I Take From All This

A few things stick with me every time I go back to these.

It's a nearly fifty-year tradition, in the most serious-minded corner of computing. The best entries are technically rigorous satire: the joke only works *because* the format is taken so seriously and written so deliberately.

RFC 1149 (pigeons), RFC 3514 (the evil bit), and RFC 2324 (HTCPCP and status code `418`) are the most influential, and some have left real marks, with `418` running in production frameworks and pigeons genuinely beating South African broadband.

Reading them is also a sneaky way to learn. To get the joke in RFC 2549, you have to actually understand Weighted Fair Queuing. To appreciate the evil bit, you have to know what that reserved header bit is for. The satire is a Trojan horse for the real thing.

Mostly, though, they're a reminder that the people who built the internet had a genuine sense of humor, and were (and still are), at heart, a bunch of geeks who loved this stuff as much as we do.

And one last piece of official guidance, worth repeating every April: some RFCs published on April 1st are completely serious. Telling them apart is left, deliberately, as an exercise for the reader. 😎

---

## References

Every document below is a real, published RFC or source. Read the originals, they're better than any summary.

::: info About Author

If you enjoyed this, I go deep on protocols, systems, and internals on my [Brief YouTube channel (<VPIcon icon="fa-brands fa-youtube"/>`@briefvid`)](https://youtube.com/@briefvid)*. Have a favorite April Fools' RFC I skipped? Leave a comment on the video, I'd love to hear it. Thanks for reading! 👋

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Internet's Longest-Running Joke: A Field Guide to the April Fools RFCs",
  "desc": "Here's a line from an official document published by the people who run the internet: ”Readers who cannot distinguish satire by reading the text may have a future in marketing.” This line actually s",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-internet-s-longest-running-joke-a-field-guide-to-the-april-fools-rfcs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
