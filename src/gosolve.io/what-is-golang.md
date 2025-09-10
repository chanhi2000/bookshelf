---
lang: en-US
title: "What is Golang?"
description: "Article(s) > What is Golang?"
icon: fa-brands fa-golang
category:
  - Go
  - Article(s)
tag:
  - blog
  - gosolve.io
  - go
  - golang
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is Golang?"
    - property: og:description
      content: "What is Golang?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/gosolve.io/what-is-golang.html
prev: /programming/go/articles/README.md
date: 2023-05-02
isOriginal: false
author:
  - name: Yanick
    url : https://gosolve.io/author/jgadek/
cover: https://gosolve.io/wp-content/uploads/2023/05/asdasasd.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What is Golang?"
  desc="Golang (or Go in short) is a breath of fresh air in the coding market. A long-needed shakeup in the stale programming market with a cute gopher as a mascot. Its development was started in 2007 by designers Robert Griesemer, Rob Pike, and Ken Thompson."
  url="https://gosolve.io/what-is-golang"
  logo="https://gosolve.io/wp-content/uploads/2022/03/cropped-ikona1-192x192.png"
  preview="https://gosolve.io/wp-content/uploads/2023/05/asdasasd.png"/>

## The history behind the Go programming language

The first version was deployed internally at Google in 2009 when it was also announced to the public. The full release followed three years later in March 2012. Since its premiere, it reached version go 1.18 with 1.19 planned for Q3 2022. Although support has ended for versions up to 1.16 Go guarantees compatibility for major parts of the library and language specifications.

---

## The idea behind Go

The aim with Go was simple: Google wanted to improve productivity by designing a tool fit for their needs. As it was built just 13 years ago, it’s natural that it would be better adapted to modern times and technology. A great example of that is included support for multicore CPUs, whose share in the market was rapidly growing and for obvious reasons was missed in predecessors. This directly translates into easier development of apps using multi-threads and makes them more reliable.

Thanks to years of experience in the market it was also designed as a fast and versatile language, easier to learn, with syntax more accessible and easier scalable for bigger projects. Thanks to Go’s design, you’ll learn it quicker than competitors.

---

## What makes the Go programming language better suited for 2022?

As a new language, it tries hard to suit modern times and professionals. With Google behind it, it’s on the way to becoming a go-to language for fresh pros who won’t have to start their career by learning languages designed with the 90s in mind. On the other hand, switching from older languages is also well-thought-out. 

---

## Possibilities: how can you use Golang?

The number of uses for Go is rising each day. Besides web services, it can be used for big data, Web APIs, backends, mobile apps, migrations, audio/video software, machine learning, networking, software engineering, and more. Of course, you can also use it in Docker and Kubernetes. Additionally, it comes with memory safety, a rubbish collector, and a great handle of concurrency via goroutines. In the next part, you can find more real-life examples of how Golang is used.

---

## Go uses and best practices by big brands (including software)

[<VPIcon icon="fa-brands fa-golang"/>Google uses it in the](https://go.dev/solutions/google/) Core Data Solutions team, in Chrome Content Optimization Service (and other Chrome backends), Firebase Hosting team, Site Reliability Engineering team… and many, many more! Golang is also no stranger to other big IT brands than Google. With each year, more tech companies decide to use Go in their software. Let’s review some of the best examples!

### Dropbox - Technology Platform

Dropbox owes its success to Python - a language that was established as easy to learn and fit-for-all in the same vein as Golang. Unfortunately, Python wasn’t enough, and it became clear when Dropbox grew to a massive 200,000 lines of code.

The decision to move to Go was made because of two main reasons: [<VPIcon icon="fa-brands fa-dropbox"/>due to its faster execution speed and to leverage better concurrency support](https://dropbox.tech/infrastructure/open-sourcing-our-go-libraries). All of this was done with Golang young age in mind - Dropbox’s devs had to prepare more robust libraries by themselves to help develop bigger projects. What’s best - everything was open-sourced to help build a large community.

### Allegro - Ecommerce Platform

Most of the microservices at Allegro company are written in Python, Java, or another Java Virtual Machine (JVM) language. Some legacy code is also written in PHP. Everything above didn’t stop the developers from trying something new. So, when they needed to write a very fast cache service, they decided to move on with Golang. Result? [<VPIcon icon="fas fa-globe"/>Longer requests shortened to less than 250 milliseconds from 2.5 seconds](https://blog.allegro.tech/2016/03/writing-fast-cache-service-in-go.html#final-results).

### Uber - Online Booking Software

Uber built in Golang its geofence lookups system: the one responsible for matching clients with drivers. It needed only a year to become its [<VPIcon icon="fas fa-globe"/>highest queries per second (QPS) service](https://eng.uber.com/go-geofence-highest-query-per-second-service/). Until this point, Uber was using mostly Node.Js and Python. Developers were extremely happy with choosing Go for this project.

### Paypal - Payment Processing System

Paypal is the biggest payment processing system in the world, used by most online vendors and commercial users. The idea behind choosing Go started similarly to other brands: existing NoSQL ad DB proxies used too many resources in a multithreaded mode, and the code got too complex to manage in a way that wouldn’t waste human resources. Go provided not only a tool to better deal with multi-threads but to clean the code and simply restructure it. [<VPIcon icon="fa-brands fa-golang"/>Thanks to Go, PayPal developers could spend more time](https://go.dev/solutions/paypal) thinking about how to progress their work without having to ‘fight’ with C++ and Java.

### Keybase - Cybersecurity

[<VPIcon icon="fas fa-globe"/>Keybase is an open-source directory](https://softwareengineeringdaily.com/2015/09/04/identity-and-encryption-with-keybase-founder-max-krohn/) that allows users to encrypt messages and verify identities. Max Krohn, Founder of Keybase as the main reason why it was written entirely in Go gives one main reason: The libraries in Go are too good to pass up. They do everything you need, in contrast to C++ libraries which rarely work together. 

### Twitch - Video Streaming Service

Do you know the famous Twitch chat? The chat that produces billions of messages daily? [<VPIcon icon="fas fa-globe"/>It was built in Go](https://blog.twitch.tv/en/2015/12/18/twitch-engineering-an-introduction-and-overview-a23917b71a25/). It’s not the only place where it’s used. Twitch used it to core video systems: transcoding, distribution, and edge were built with a mix of Go. That’s not all: Web APIs, search and discovery systems, revenue systems, and administrative tools all use a mix of Rails and Go. Twitch uses Go so often that they also produced the Twirp framework for Go under an Apache 2 open-source license.

### Slack - Messaging Platform

Everyone’s favourite platform also uses Go in its ranks. Slack uses a job queue system for business logic that was too time-consuming. Solution? Write a tool using Golang to enqueue jobs faster.

### Netflix - Media Service Provider

Golang allowed Netflix developers to forget about slow Java and complicated C++. It uses it to optimize server loading and data processing, which allows them to manage millions of customer contacts at the same time.

### Golang uses - other brands

Not enough examples? Go is also used by: Alibaba. Delivery Hero, Trivago, American Express, Bolt, SoundCloud, Dailymotion, Samsara, Riot Games.

---

## Summary: Golang programming language vs. others

Golang is slowly becoming a huge player in the market. It’s designed with a broad aim and, without hesitation, we can say that it is competitive with older languages. It may not be a true mature programming language yet, but it’s gaining traction very fast. This translates to a growing community, a rising number of tools and frameworks, and more professionals each year in the market. What we can say now is that it has a great coding consistency, it’s done with current standards and technology in mind, and is faster than others.

### Golang rising in popularity - hard data

Golang gaining traction and popularity is easy to explain with one word: Google. This guarantees constant support and feedback for years to come. And as we prove in a moment, Golang is far from achieving its peak. Thanks to StackOverflow’s annual survey, we have an excellent set of data.

[<VPIcon icon="fa-brands fa-stack-overflow"/>Although in 2015](https://insights.stackoverflow.com/survey/2015/#tech) you won’t see it yet in the ‘Most popular technologies’ survey, you can see it in ‘Most loved, dreaded and wanted’ where Go is loved by 72,5% of responders, while for example Python was ‘loved’ only by 66.6%. Golang [<VPIcon icon="fa-brands fa-stack-overflow"/>debuted in this survey in 2017](https://insights.stackoverflow.com/survey/2017/#technology) at 19th place with 4.3% popularity. Since then, it is only growing: [<VPIcon icon="fa-brands fa-stack-overflow"/>in 2018](https://insights.stackoverflow.com/survey/2018/#technology) it was already 16th place with 7.1%, and [<VPIcon icon="fa-brands fa-stack-overflow"/>in 2021](https://insights.stackoverflow.com/survey/2021/#most-popular-technologies-language) 14th place with 9.55%. Steady growth!

### Why is Golang gaining so much traction today?

There is more to it than just ‘being made by Google’. It’s built with modern technologies in mind, easy to learn, fast and scalable. It’s focusing on simplicity which makes a better syntax, clear code, and easier to find errors. It’s great for young developers, who won’t have to learn more complicated code, as it’s not needed anymore.

Golang can run several concurrent processes independently and built-in concurrency enables efficient processing of data without blocking, which is important for CPU-intensive operations and cloud computing. Go makes your apps and services faster, which might be the deciding factor not only for you, but for your users in particular.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is Golang?",
  "desc": "Golang (or Go in short) is a breath of fresh air in the coding market. A long-needed shakeup in the stale programming market with a cute gopher as a mascot. Its development was started in 2007 by designers Robert Griesemer, Rob Pike, and Ken Thompson.",
  "link": "https://chanhi2000.github.io/bookshelf/gosolve.io/what-is-golang.html",
  "logo": "https://gosolve.io/wp-content/uploads/2022/03/cropped-ikona1-192x192.png",
  "background": "rgba(56,119,242,0.2)"
}
```
