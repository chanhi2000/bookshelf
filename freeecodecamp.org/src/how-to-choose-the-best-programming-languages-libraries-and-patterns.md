---
lang: en-US
title: "How to Choose the Best Programming Languages, Libraries, and Patterns"
description: "Article(s) > How to Choose the Best Programming Languages, Libraries, and Patterns"
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
      content: "Article(s) > How to Choose the Best Programming Languages, Libraries, and Patterns"
    - property: og:description
      content: "How to Choose the Best Programming Languages, Libraries, and Patterns"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-choose-the-best-programming-languages-libraries-and-patterns.html
prev: /articles/README.md
date: 2025-08-11
isOriginal: false
author:
  - name: Ryan Michael Kay
    url : https://freecodecamp.org/news/author/ryan-michael-kay/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1754846007203/c9db729e-ebed-4726-8e3e-5414c8e2714d.png
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
  name="How to Choose the Best Programming Languages, Libraries, and Patterns"
  desc="In my first few years learning software development and building applications, I was quite interested in finding the best programming language, platform, libraries, frameworks, patterns, and architectures available. I thought that by finding the best..."
  url="https://freecodecamp.org/news/how-to-choose-the-best-programming-languages-libraries-and-patterns"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1754846007203/c9db729e-ebed-4726-8e3e-5414c8e2714d.png"/>

In my first few years learning software development and building applications, I was quite interested in finding the best programming language, platform, libraries, frameworks, patterns, and architectures available. I thought that by finding the *best* things and focusing on those topics to the exclusion of others, I could avoid wasting precious time.

While I figured out early on that narrowing my focus by using a project-based learning approach (as opposed to the topic-by-topic laundry list approach) was important, finding the best tools for the job was a different matter.

If you happen to be searching for some of those things, then this article is for you. After over a decade of programming products, building client applications, answering thousands of questions from junior and intermediate developers, and wrestling with these questions myself, I will do my best to explain how to find the best *things*.

This article is intended for junior to intermediate level developers looking to get some practical answers to difficult problems. You will not need extensive programming experience to get through it and you may skip over any technical discussions specifics. Those are meant to be helpful pieces of information, but the core of this article is about how to make these decisions in general using what I call: The Law of Suitability.

---

## How to Find the Best Anything

I invite you to follow along with some basic non-technical examples which lay the groundwork for the rest of this article. The examples may sound silly to some, but I have layered in some conceptual patterns which you can apply to programming languages, tools, and concepts - as well as just about anything where terms like good, bad, best, or worst can apply.

### How to Find the Best Water Bottle

Suppose that you are looking to solve the problem of staying hydrated and wish to purchase a water bottle.

You consider that figuring out the best water bottle might involve looking into:

- Public opinions and reviews
- Expert opinions and reviews
- The manufacturer’s descriptions and reputation
- Buying and testing water bottles (though preferably not all of them, as that costs too much time and money, generally)

All of those things are fair for consideration. Something which is not well-tested in public presents uncertainty. Expert reviews can help inform your decision, but you have to consider the biases and motivations of such experts. You also should consider if the manufacturer has a history of quality, design, and customer support, or whether they’re simply maximizing profit.

After doing some research, you come up with these options:

- A plastic bottle of water from a vending machine
- A high-tech metal bottle which you can even boil stuff in!
- A simple but ethically sourced, refillable, BPA-free plastic water bottle

However, you noticed that nobody seemed to universally agree about which option was the best. There were usually some common opinions, but it was never the case that every expert had the same evaluation or recommendation.

After reflecting on this, it became obvious that you need to consider how, when, and where you will be using this water bottle. In other words, you need to **consider the context or situation** of its usage.

Suppose three different contexts within which you have to make this decision:

- You are standing in a rest stop in Death Valley California (often thought to be the hottest place on Earth in summer) and there is a vending machine full of micro-plastic filled, old, generic, and cheap plastic bottles of water in front of you. But you have no other options and are very thirsty
- You are in a camping store preparing for a camping trip to New Zealand with lots of hiking and not too much access to filtered water
- You are looking on your favorite shopping website for something you can bring to work each day to avoid those dehydration headaches from not drinking enough water

In summary, you shouldn’t ignore second-hand knowledge, expert opinions, popularity, ratings, reviews, testimonials, and even first-hand experience. But you will never find the best water bottle for every situation you find yourself in. The best “anything” depends on the problem you are trying to solve and the context (words like requirements or situation also apply here) of that problem.

In other words, none of these things have an absolute or fixed value - their value is always relative. I call that the **Law of Suitability**.

Let’s now discuss some examples which are directly related to software design and development.

---

## How to Find the Best Programming Language

The Law of Suitability applies just as much to programming languages as it does to water bottles - even though the details and contexts are different. There is no such thing as the best programming language for every person, team, problem, or feature.

But I do have some specific details and contexts to offer which may help you answer that question for yourself. This section will cover concrete details and some general ideas on how to choose a programming language. These patterns also apply to frameworks, libraries, and most other aspects of programming.

If you are not interested in the topic of finding a programming language, feel free to skip to the next sections on topics like libraries, principles, and patterns.

### Navigating Public and Expert Opinions

Firstly, you need to be skeptical of popularity and the opinions of experts and “influencers” here.

My general tip here is to be extremely cautious about anyone who makes one of these claims:

- “X” language is the best (though saying “X” language is my favourite is perfectly acceptable)
- “X” language is the worst, is terrible, is dead, is garbage, is useless, and so on.

There are three groups of people who generally make these sorts of statements:

- Actual experts who are voicing their personal preferences but presenting them as immutable facts (how I wish this was not so common in this industry)
- Non-experts parroting opinions of the above group or who have not yet understood the Law of Suitability
- Engagement farmers

It’s also worth noting that people can be experts in a subset of problems but that doesn’t guarantee their opinions about all problems are expert level.

This doesn’t mean you should reflexively dismiss expert opinions in general. Consider both the track records of the person and the degree to which they pay attention to the context of their statement.

Let us look at two examples:

- *Expert A* says: “Python has the best tooling, support, and ecosystem for ML development”
- *Expert B* says: “Python is the best programming language”

While *Expert B* is obviously displaying a lack of precision (either deliberately or not) if you have followed me so far, *Expert A* is a different case. Whether or not the statements made by *Expert A* are true (for the record, I have written a bit of Python but no ML code), you can tell that they are considering details and context. Look for people like *Expert A*!

### Low Level vs High Level

In simple terms, low level programming languages are difficult for humans to read and write. Also, they tend to be faster and have a lower memory footprint than high level languages. Conversely, high level languages are closer to human language which generally makes them easier for humans to work with.

I must confess, though, that I have seen plenty of examples of people writing unintelligible code in high level languages - please don’t do that.

Someone working on an embedded system might want to do so in a language like C or C++ to optimize performance or work around the limitations of memory and processing power.

But in enterprise systems, which need to run on a variety of platforms and which closely intermingle with business requirements, rules, and real world objects (thing products, users, and so on), lower level languages are not so popular. After all, upper and middle management generally tends to care about low level optimizations only to the extent it affects the user experience.

I love optimization in general, but never forget that everything is fast with small datasets (that is, when *n* is small) or high processing power. In simpler terms, sometimes human concerns like legibility are significantly more important than insignificant optimizations on efficiency.

### Tightly Structured (Static) vs Loosely Structured (Dynamic)

Ironically, the main downsides and benefits of a language like Java (which is very structured and verbose) versus a language like JavaScript (quite the opposite, depending on how you use it) are the same depending on the context.

Speaking of enterprise systems, using structures, types, interfaces, classes, threading, concurrency primitives, and similar programming constructs can have a variety of benefits. It can insulate you from safety while providing some flexibility via type hierarchies, interfaces, protocols, abstractions and so on.

Further, studying design patterns can teach you repeatable solutions to problems which have been encountered since the dawn of the general purpose computer - or shortly thereafter.

But the Law of Suitability still applies here. Maybe you just need to write a quick script to migrate some data from one SQL database to another. Maybe you know how to approach problems using a more functional approach that doesn’t require or discourages the use of objects, classes, or structs. Maybe you realize one day that trying to apply design patterns, architectures, hierarchies and similar constructs in every situation has actually created as many problems as they were solving. More on that later.

It’s also worth mentioning that most modern language designers and maintainers have understood that we developers like flexibility. Many of us want to avoid premature optimization and unnecessary structure but also don’t want our code to blow up because we accidentally told the program to add together 1.23356 + “Rhinoceros”.

The main point is that structure or a lack of structure is both a blessing and a curse, depending on where it is used.

### Popularity Is Only One Factor

I’m not going to say that popularity is irrelevant and that you should start with the least popular hipster programming language you can find. No shade intended to hipster programming languages, but unpopularity is not generally a good thing in isolation, either.

The key point is that many people weighing in on programming languages (probably most) don’t have abundant experience working on a variety of platforms, languages, and settings. If someone has only ever written Python and enjoys doing so, they will naturally tend to regard it above others.

We humans have a tendency to find the first thing that works for us and then die on a hill defending it. But to take a more anecdotal approach here, I know a couple dozen intermediate to senior level developers who have extensive experience in Java and other programming languages. Despite Java still being ranked as one of the most popular languages globally, only one of those developers I know actually prefers to write in Java if they have the choice.

Don’t make the mistake of assuming that the first thing that works for many people will be the last thing you need to try out. I have from time to time experimented with languages such as Haskell, which taught me many valuable lessons about the benefits of making my code more functional (and functionally pure) in nature.

But I have zero intention of using Haskell as my go to solution for building GUI applications.

### Popularity Is Not A Guarantee Of Employment

One of the most common things you ought to consider is whether or not the language you pick will help you get a job - assuming that’s a concern. Influencers absolutely love to tell people to choose one particular language because it has the most public commits on GitHub, or another because it has the largest number of programmers using it (which is in practice something that’s impossible to say for sure).

Let me flip that on its head: suppose that the most common programming language and platform combination is JavaScript and web. Let’s further suppose that we have pretty concrete data on the number of job postings on the web which confirms that the largest volume of jobs available is for that combination. Let’s finally suppose that for whatever reason, you strongly dislike JavaScript and enjoyed building a website using PHP.

You will find voices who will tell you that PHP is a dead language and a dead end for job searching.

But if you go looking, you may notice that there is a good supply of job postings out there looking for PHP developers who can expand and maintain existing codebases. You might also have a much better chance of getting an interview because *the ratio of job postings to applications is significantly better for PHP developers* than JavaScript developers. In fact, my team recently hired a PHP developer!

### Hardware & Working With What You Have

This section is largely irrelevant to web developers, but may be extremely important for those looking to target specific hardware or operating systems. Simply put, if you don’t have a computer with Mac OS and XCode, you will have a very hard time developing an iOS app, for example. In my case, back in 2014, I chose Android development partly because I had studied a bit of Java - though a big consideration was that I had an Android phone.

There are some ways around this by paying to use a remote device (such as a remote Mac via an online service), but my experience with such services years ago is that they weren’t great.

Think about what resources you have and how that fits into what you want to build or whom you want to work for. If you have not much other than a cheap computer with a web browser, and you still want to build GUI applications, web development can be a great choice.

### What if I Want the AI to Code For Me?

While this topic is worthy of a separate article, I don’t believe this is an unreasonable question to ask. A year ago, I would have told you that at best, the AI can write some basic code and help you learn some things which may or may not be wrong.

How things have changed! Though I would be bad at my job if I copy pasted code I didn’t understand or didn’t test, AI has absolutely become a force multiplier for me as a developer.

Back to the topic in question, how does this relate to choosing a programming language? Well, after telling you that popularity is not always a big deal, by the nature of how LLMs work, popularity is a factor. In terms of general use, languages like Python, JavaScript, and Java are likely to have the largest amount of training data. My experience has been that the languages I typically use, such as Kotlin, TypeScript, and Swift also do fine.

But there is a curious side effect of developing Android or iOS applications that I don’t experience so much in web development. The nature of these constantly changing platforms and SDKs, with tens of thousands of third party libraries, dozens of architectures, and endless opinions about best practices and anti-patterns, means that LLMs can have serious troubles with complexity or specificity.

I expect this issue to be fixed as LLM services improve correctness checking or other methods to reduce hallucinations.

### Avoid the Sunk-Cost Fallacy

Perhaps the most important point I can make in choosing a programming language is to avoid the sunk-cost fallacy. For the first several years of my part-time studies, I didn’t imagine learning a second language based on how difficult it was for me to learn Java.

Roughly 12 years later, I have written non-trivial code in Java, Kotlin, Swift, C++, TypeScript, and SQL. Further, I have dabbled with code in C, Python, JavaScript, Racket, Haskell, Objective C, Visual Basic, and C#.

It was not the case that I sought out to learn all of these things artificially - I don’t tend to learn things outside of the problems in front of me. It’s that these learning opportunities naturally unfolded along with my personal and professional interests.

Learning the fundamentals or approaching mastery of any general purpose programming language will have carry over to others. It’s true that someone learning Python or JavaScript without CS fundamentals is not going to have much of a clue how things work at the OS level or lower.

It’s also true that I have met several people who could probably code circles around me in C/C++/Assembly but never made it past building toy programs in University or College.

Just keep learning and try to find a balance between personal interest and professional goals.

---

## How to Find the Best Libraries and Frameworks

The next few topics revolve around a question which we’ll revisit a couple of times before the end of this article: “*Does it solve more problems than it creates?*”

### What Are Libraries and Frameworks?

Before we proceed, here’s a useful but not definitive definition about the relationship between libraries and frameworks. You’ll find other definitions, but there’s remarkably little consensus on topics like this in this industry.

For me, a library is code which you can take from somewhere and use it to build things. It could be anything from a single line to a large and complex sub-system - usually something in between. I could give you a long and pedantic definition, but that’s not appropriate for this context (suitability!).

One example could be Java’s Math (java.lang.Math) library, which provides you with the following: “*The class Math contains methods for performing basic numeric operations such as the elementary exponential, logarithm, square root, and trigonometric functions.*”

Some people use the term framework interchangeably with library, and I don’t have any problems with that. When I think of a framework, I’m thinking about something which you build stuff around and is not necessarily to do with solving a specific problem domain (such as mathematics).

An example of this would be RxJava, which is a rather complex framework you can use to bind together and manage data flows across an entire application. I’ve used this framework in almost a dozen applications which did very different things in principle.

I do consider a framework to be a library, fundamentally - they just have a different set of goals and often a larger footprint.

### How to Choose Libraries and Frameworks

When I think about choosing libraries and frameworks, I ask myself these questions:

- Does it solve more problems than it creates compared to writing my own solution?
- Is it well-maintained (regularly worked on, responsive authors, backed by tech companies)?
- Does it have good documentation (less of a problem now that we can leverage AI for this purpose)?
- What kind of footprint does it have?

Let’s take two examples. I won’t refer to the specific platform or name of these libraries to avoid offending anyone. But they were/are both used in mobile development (though they are solving common GUI problems on any platform).

Firstly, one of my favorite libraries had one job: It loads images into the UI.

Although devices are more powerful than they used to be, it can still be a problem to load large images on smart phones for display. Mobile operating systems can be aggressive about killing programs (that is, processes) which use up too much of the system’s resources.

This library handles all aspects of loading images that I’m concerned about:

- Loading the image into a particular widget
- Displaying an appropriate loading indicator
- Displaying an optional error or fallback state that tells the user something went wrong
- Handling the complexities of asynchronously loading in (via URL/URI), processing, and compressing potentially large streams of bits (that is, image data)
- Doesn’t inflate the packaged application’s size unnecessarily
- Doesn’t change its public API frequently (think changing function names which cause people’s implementations to break when updating versions)
- It solves problems that I’m not interested in solving

Secondly, one of my least favorite libraries also had one job: Pagination. Pagination, or paging, in this case refers to loading data in *chunks* into an application. This is an extremely common pattern in shopping cart or social media applications.

The library I am thinking of approaches that problem like so:

- Tightly couples every layer of your client application (from front end to back end) to its dependencies
- This tight coupling makes testing difficult without jumping through some hoops
- Handles the core problem of pagination well unless you need customization or specialized cases
- Frequently changed its public facing API
- Solved (in general) a problem which I am quite happy to write my own solution for
- Did not play well with other frameworks due to a restrictive set of types and lack of flexibility
- Was constantly updated for a couple of years then ditched and marked deprecated
- Did not inflate the packaged applications size too much but certainly more than my own solution would

As you can see, even something which solves a core problem reasonably well, can still fail this simple test of: Does it solve more problems than it creates? Having written pagination code by myself on a couple of occasions now, I would have to be pretty strongly convinced not to.

---

## How to Find the Best Programming Principles and Practices

There are more best practices and principles than I care to describe in detail. What I will do is explain why I treat programming principles as being distinct from immutable/unbreakable laws. Similarly to my goal of finding the best programming language, I wanted to find the best principles in order to write the best code.

The problem is that any programming principle I’ve come across has also been subject to the Law of Suitability. I’ll discuss one example from personal experience and point out that the question we asked above, “does it solve more problems than creates,” also applies here.

### D.R.Y - Don’t Repeat Yourself

This principle can be summarized with the idea that if you find duplicated code, you should pull it into a separate module (file, function, class, library, and so on). Without getting into the weeds, the act of pulling the duplicated code into a separate module can be thought of as a process of abstraction.

To be fair to the creators and proponents of this idea, it’s more nuanced than that. But many developers never bother to dig that deep into nuances - nor should they have to. I ran into the nuances simply by applying this idea more than I should have.

There a couple of cases where code duplication is sometimes preferable:

- You have a set of similar modules (say similar widgets or business rules) but they get used in different places for different reasons
- You have a set of similar modules which might change for different reasons (for example, rapidly changing demands from product teams and clients with different priorities)
- You’re deliberately grouping certain modules that work together in distinct packages, files, or directories to insulate modules/groupings from affecting each other
- You find that you need to add details about one particular implementation into your abstraction, but those details don’t apply to other implementations (that is, it’s a bad abstraction)

All of the things I listed above are summaries of things I have run into in the past. The key take away is that I broadly agree with avoiding code duplication. I also know of some cases where I prefer it. Suitability!

### What About Other Programming Principles?

In general, you can think of all programming principles like YAGNI, DRY, SRP (and other aspects of SOLID), and even software development methodologies like AGILE and Waterfall in the same way. Contextually, you can use them as guidelines to help avoid some common problems. But a person of sufficient creativity and experience can come up with a situation where following any of these principles creates more problems than it solves.

In many cases, you need to apply these things too much in order to understand what too much means in practical terms. Just be careful not to swing too far in the other direction when one of these principles really breaks down in front of you. I’ve also made that mistake and had to re-adjust.

To date, I haven’t come across a programming principle which is universally true. There are some which come close to that, but I can always imagine a situation where they’re not the best approach. Take a good one like: Always write the simplest code you can write. In other words, don’t add extra complexity without a reason.

Well, suppose you have a not great value system or incentive structure which encourages inflating your work artificially. Need I say more?

---

## A Note About Patterns and Architectures

I’ll now discuss the topic of patterns and architectures in software systems with respect to the Law of Suitability. Software architecture is the only thing I consider myself an expert in, and I have read multiple books on design patterns. I always try to provide some useful info on these topics when I get the chance.

### How to Find the Best Software Architecture

To summarize entire articles, courses, and public talks I have given on this topic: The best software architecture depends on project and personal requirements.

One way to grasp the main idea is to ask yourself whether the best architecture for a hospital is also a good fit for a 2-bedroom apartment. The obvious answer is that we might expect a few commonalities (doors, windows, bathrooms of some kind, and so on) among these different sets of requirements. But the ideal, or even just a good architecture for a 2 bedroom apartment cannot possibly be the same for a hospital.

In short, you will never find an architecture which works well for all projects and requirements.

Here is a list of architectures I have some familiarity with:

- Model-View-Controller
- Model-View-Presenter
- Model-View-ViewModel
- VIPER
- Clean Architecture (Robert C. Martin style)
- Model-View-Intent

To make matters more confusing, there are multiple different ways to implement these architectures - almost as many ways as developers implementing them! M-V-VM is one of the more common architectures in mobile development, and I can think of at least five different variations on how to achieve what some people think of as a single architecture.

Here are my general suggestions for working with these architectures:

- Be wary of adding unnecessary complexity with the more complex architectures (particularly Clean Architecture, as many people get this horribly wrong)
- Don’t try to make the project requirements fit the architecture - work the other way around (the best indicator for this is noticing that something you’re trying to implement is made unnecessarily difficult because of the architecture you’re using)
- Don’t be afraid of applying different approaches in different features of the same application instead of blindly applying the same pattern just for consistency’s sake

### The Design Pattern Trap

One of the most common engagement farming tactics I see on social media is to post lists of design patterns “that you must know” in order to get a job or to scare junior programmers into buying your low-quality, copy-pasted content of each pattern.

Don’t get me wrong, I loved studying design patterns and I use a couple key patterns in most GUI applications I build. The Observer (a.k.a. Publisher-Subscriber or Pub-Sub) Pattern really shines when you need to glue together a bunch of asynchronous data sources. I love seeing library developers give me a nice Builder Pattern to work with their APIs. I think understanding the basics of patterns like the Bridge or Facade can teach you how to hide details behind abstractions, which is actually simpler than the big scary words describing these things make it sound.

But I spend very little time in my day to day work thinking about or in design patterns. Instead, I’m always thinking about the kinds of attitudes and principles that give rise to these patterns:

- Promoting loosely coupled code (separating the creation and usage of dependencies and parameters, reasonable usage of abstraction)
- Writing classes, interfaces, protocols, and functions which do one thing (though this “one thing” might be a macroscopic goal instead of a microscopic operation)
- Avoiding complexity wherever possible (a common source of this complexity is over-use of abstractions)
- Not pretending that every complex problem has a simple solution (that is, as simple as it can be but no simpler)
- Avoiding pre-mature optimization

Again, I will only apply these principles and attitudes to the extent that I find they solve more problems than they create. Design patterns, when applied too rigorously, can break many of those principles - particularly when it comes to avoiding complexity and pre-mature optimization.

Don’t try to make your project requirements fit your patterns. Instead, think about which patterns might suit your project requirements and deviate as necessary.

---

## Summary

My goal with this piece was to provide three things:

- A practical overview of choosing a programming language and avoiding the traps the people can fall into when navigating these sorts of topics
- A philosophical but pragmatic framework which you can use to evaluate the suitability of anything - with emphasis on learning and developing software
- A breakdown of how I approach other topics like tools, architectures, and patterns

While it can be important to consider things like job opportunities and your current hardware, don’t discount personal interest as a driving factor. From what little I remember about studying cognition (learning how to learn), interest is tightly coupled to motivation and memory. We can’t always exclusively do what interests us, but I suggest you look for intersections between personal and practical concerns as often as you can.

In closing, I encourage you to think about other areas where you might be able to explore the principles of suitability and the problems of tribalistic thinking. Change is constant and value is relative.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Choose the Best Programming Languages, Libraries, and Patterns",
  "desc": "In my first few years learning software development and building applications, I was quite interested in finding the best programming language, platform, libraries, frameworks, patterns, and architectures available. I thought that by finding the best...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-choose-the-best-programming-languages-libraries-and-patterns.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
