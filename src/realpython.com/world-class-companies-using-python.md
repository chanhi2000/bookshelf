---
lang: en-US
title: "8 World-Class Software Companies That Use Python"
description: "Article(s) > 8 World-Class Software Companies That Use Python"
icon: fas fa-user-tie
category:
  - Career
  - Tip
  - Article(s)
tag:
  - blog
  - realpython.com
  - career
  - tips
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 8 World-Class Software Companies That Use Python"
    - property: og:description
      content: "8 World-Class Software Companies That Use Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/world-class-companies-using-python.html
prev: /projects/career/articles/README.md
date: 2018-02-08
isOriginal: false
author:
  - name: Jason Reynolds
    url : https://realpython.com/team/jreynolds/
cover: https://files.realpython.com/media/8-World-Class-Software-Companies-That-Use-Python_Watermarked.0af7266ce383.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Career > Article(s)",
  "desc": "Article(s)",
  "link": "/projects/career/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="8 World-Class Software Companies That Use Python"
  desc="A review of eight top-tier companies that use Python in production, and why. Learn about their struggles and successes, and see the career opportunities for Python developers today."
  url="https://realpython.com/world-class-companies-using-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/8-World-Class-Software-Companies-That-Use-Python_Watermarked.0af7266ce383.jpg"/>

There are over 500 current programming languages, with more being written every day. Admittedly, the majority of these overlap and a large number were never meant to be used outside of a theoretical or lab setting. But for the programming languages that are used in everyday coding and businesses, you have to make a choice. What languages should you learn, and why should you invest your time in learning them?

As this is a site devoted to Python, we’ve already told you why Python is a great language to learn. And you probably know about how Python is probably the most preferred language for the [**Raspberry Pi**](https://realpython.com/python-raspberry-pi/README.md) (as most come preloaded with it). And knowing that, you know what amazing things you can do with a Pi kit and just a little ingenuity. **While it’s easy to see how you can tinker with Python, you might be wondering how this translates to actual business and real world applications.**

What we’re going to do now is tell you about eight top-tier companies that you know that use Python. That way you can see what great real world opportunities there are for Python developers out there.

---

## Industrial Light and Magic

Industrial Light and Magic (ILM) is the special effects powerhouse that was founded in 1975 by George Lucas to create the FX for *Star Wars*. Since then, they’ve become synonymous with FX, winning multiple awards for their work in movies and commercials.

In their early days, ILM focused on practical effects, but soon realized that computer generated effects were the future of FX in general. Their CGI department was founded in 1979 and their first effect was the explosion sequence of the Genesis Project in *Star Trek II: The Wrath of Khan*.

Originally, ILM’s CGI studio ran off of a Unix shell, but this was only handling a relatively low amount of work. Because the studio foresaw the future of CGI, they started looking for a system that could handle the aggressive upscaling that they saw in the future.

ILM chose Python 1.4 over Perl and Tcl, opting to use Python because it was a much faster to integrate into their existing infrastructure. Because of [<FontIcon icon="fas fa-globe"/>Python’s easy interoperability with C and C++](https://davincicoders.com/codingblog/2017/2/10/love-movies-learn-to-code-python-and-you-might-work-for-ilm), it was simple for ILM to import Python into their proprietary lighting software. This let them put Python in more places, using it for wrapping software components and extend their standard graphics applications.

The studio has used Python in multiple other facets of their work. Developers use Python to track and audit pipeline functionality, maintaining a database of every image produced for each film. As more and more of ILM’s programs were controlled by Python, it created a simpler unified toolset that allowed for a more effective production pipeline. For a real world example, look no farther than [OpenEXR](https://openexr.com/index.html), an HD file format used by ILM. As part of the package, [PyIlmBase (<FontIcon icon="iconfont icon-github"/>`openexr/openexr`)](https://github.com/openexr/openexr/tree/develop/PyIlmBase) is included (although it does have a Boost dependency).

::: note

If your mind is spinning at the thought of how complicated such a codebase might be, then you might enjoy a behind-the-scenes look at managing a large codebase in [<FontIcon icon="fas fa-globe"/>The Real Python Podcast Episode 160](https://realpython.com/podcasts/rpp/160/).

:::

Despite numerous reviews, ILM continues to find Python to be the best solution for its needs. The combination of an open source code combined with the ability to back-port changes ensures that Python will continue to meet ILM’s needs for a long time.

---

## <FontIcon icon="fa-brands fa-google"/>Google

Google has been a supporter of Python from nearly the very beginning. In the beginning, the founders of Google [<FontIcon icon="fa-brands fa-stack-overflow"/>made the decision](https://stackoverflow.com/questions/2560310/heavy-usage-of-python-at-google/2561008#2561008) of “Python where we can, C++ where we must.” This meant that C++ was used where memory control was imperative and low latency was desired. In the other facets, Python enabled for ease of maintenance and relatively fast delivery.

Even when other scripts were written for Google in Perl or Bash, these were often recoded into Python. The reason was because of the ease of deployment and how simple Python is to maintain. In fact, according to [<FontIcon icon="fas fa-globe"/>Steven Levy](https://stevenlevy.com/index.php/books/in-the-plex) - author of “In the Plex,” Google’s very first web-crawling spider was first written in [**Java**](/realpython.com/oop-in-python-vs-java.md) 1.0 and was so difficult that they rewrote it into Python.

Python is now one of the official Google server-side languages—C++, Java, and Go are the other three—that are allowed to be deployed to production. And in case you aren’t really sure about how important Python is to Google, Python’s very own BDFL, [<FontIcon icon="fa-brands fa-wikipedia-w"/>Guido van Rossum](https://en.wikipedia.org/wiki/Guido_van_Rossum), worked at Google from 2005 to 2012. To top it all off, [<FontIcon icon="fas fa-globe"/>Peter Norvig](http://quintagroup.com/cms/python/google) said:

::: info Peter Norvig (<FontIcon icon="fas fa-globe"/>quintagroup.com)

<SiteInfo
  name="Python at Google"
  desc="Python as an official language at Google. Python usage on Google various applications."
  url="https://quintagroup.com/cms/python/google/"
  logo="https://quintagroup.com/++theme++quintagroup-theme/images/favicons/favicon-16x16.png"
  preview="https://quintagroup.com/@@site-logo/logo_quintagroup.png"/>

> “Python has been an important part of Google since the beginning, and remains so as the system grows and evolves. Today dozens of Google engineers use Python, and we’re looking for more people with skills in this language.”

:::

---

## <FontIcon icon="fa-brands fa-meta"/>Facebook

Facebook production engineers are exceptionally keen on Python, making it the third most popular language at the social media giant (just behind C++ and their proprietary PHP dialect, Hack). On average, there are over 5,000 commits to utilities and services at Facebook, managing infrastructure, binary distribution, hardware imaging, and operational automation.

The ease of using Python libraries means that the production engineers don’t have to write or maintain as much code, allowing them to focus on getting improvements live. It also ensures that the infrastructure of Facebook is able to scale efficiently.

According to a [<FontIcon icon="fa-brands fa-meta"/>2016 post](https://engineering.fb.com/2016/05/27/production-engineering/python-in-production-engineering/) by Facebook, Python is currently responsible for multiple services in infrastructure management. These include using TORconfig to handle network switch setup and imaging, FBOSS for whitebox switch CLIs, and using Dapper for scheduling and execution of maintenance work.

Facebook has published numerous open-source Python projects written for Py3 including a [Facebook Ads API (<FontIcon icon="iconfont icon-github"/>`facebook/facebook-python-ads-sdk`)](https://github.com/facebook/facebook-python-ads-sdk) and a [Python Async IRCbot framework (<FontIcon icon="iconfont icon-github"/>`facebook/pyaib`)](https://github.com/facebook/pyaib). Facebook is currently in the process of upgrading their infrastructure and handlers to 3.4 from 2, and AsyncIO is helping their engineers in the process.

---

## <FontIcon icon="fa-brands fa-instagram"/>Instagram

In 2016, the Instagram engineering team boasted that they were [running the world’s largest deployment of the Django web framework, which is written entirely in Python (<FontIcon icon="fa-brands fa-medium"/>`instagram-engineering`)](https://instagram-engineering.com/web-service-efficiency-at-instagram-with-python-4976d078e366). This likely still holds true today. Min Ni, a software engineer at Instagram says this about their production-use of Python:

> “We initially chose to use Python because of its reputation for simplicity and practicality, which aligns well with our philosophy of ‘do the simple thing first.’“

Since then, Instagram’s engineering team has invested time and resources into keeping their Python deployment viable at the massive scale ([<FontIcon icon="fas fa-globe"/>~800 million monthly active users](https://statista.com/statistics/253577/number-of-monthly-active-instagram-users/)) they’re operating at:

> “With the work we’ve put into building the efficiency framework for Instagram’s web service, we are confident that we will keep scaling our service infrastructure using Python. We’ve also started to invest more into the Python language itself, and are beginning to explore moving our Python from version 2 to 3.”

In 2017, Instagram migrated most of their Python code base [<FontIcon icon="fas fa-globe"/>from Python 2.7 to Python 3](https://thenewstack.io/instagram-makes-smooth-move-python-3/). You can watch the [<FontIcon icon="fa-brands fa-youtube"/>PyCon 2017 keynote talk](https://youtu.be/66XoCk79kjM) that Lisa Guo and Hui Ding gave and hear about their experience with this massive code migration:

---

## <FontIcon icon="fa-brands fa-spotify"/>Spotify

This music streaming giant is a [<FontIcon icon="fa-brands fa-spotify"/>huge proponent of Python](https://labs.spotify.com/2013/03/20/how-we-use-python-at-spotify/), using the language primarily for data analysis and back end services. On the back end, there are a large number of services that all communicate over 0MQ, or [<FontIcon icon="fas fa-globe"/>ZeroMQ](http://zguide.zeromq.org/page:all), an open source networking library and framework that is written in Python and C++(among other languages).

The reason that the services are written in Python is because Spotify likes how fast the development pipeline is when writing and coding in Python. The most recent updates to Spotify’s architecture have all been using [<FontIcon icon="fas fa-globe"/>gevent](https://gevent.org/), which provides a fast event loop with a high-level synchronous API.

To provide suggestions and recommendations for users, Spotify relies on a large volume of analytics. To interpret these, Spotify makes use of [<FontIcon icon="iconfont icon-github"/>`spotify/luigi`](https://github.com/spotify/luigi), a Python module that synchs with Hadoop. This open source module handles how the libraries work together, and consolidates error logs quickly to allow troubleshooting and redeployment.

In total, Spotify uses over 6000 individual Python processes that work together over the nodes of the Hadoop cluster.

---

## <FontIcon icon="fa-brands fa-quora"/>Quora

This huge crowd-sourced question and answer platform thought long and hard about what language they wanted to use to implement their idea. [<FontIcon icon="fa-brands fa-quora"/>Charlie Cheever](https://quora.com/Why-did-Quora-choose-Python-for-its-development-What-technological-challenges-did-the-founders-face-before-they-decided-to-go-with-Python-rather-than-PHP/answers/65731?srid=vt0q), one of the founders of Quora, had their choice narrowed down to Python, C#, Java, and Scala. Their biggest problem with proceeding with Python was the lack of typechecking and its relative slowness.

According to Adam D’Angelo, [<FontIcon icon="fa-brands fa-quora"/>they decided not to go with C#](https://quora.com/Why-did-Quora-choose-Python-for-its-development-What-technological-challenges-did-the-founders-face-before-they-decided-to-go-with-Python-rather-than-PHP/answer/Adam-DAngelo?srid=vt0q) because it’s a proprietary Microsoft language and they didn’t want to be beholden to any future changes put out. Additionally, any open source code had second-class support at best.

Java was more painful to write in than Python and it didn’t play as nicely with non-Java programs as Python did. At the time, Java was also in its infancy, so they were worried about future support and if the language would continue to grow.

Instead, the founders of Quora took their lead from Google, choosing to use Python where they could because of its ease of writing and readability, and implemented C++ for the performance critical sections. They got around Python’s lack of typechecking by writing unit tests that accomplish much the same thing.

Another key consideration for using Python was the existence of several good frameworks at the time including Django and Pylons. Additionally, because they knew that Quora was going to involve server/client interactions that wouldn’t necessarily be full page loads, having Python and JS play so well together was a huge plus.

---

## <FontIcon icon="fa-brands fa-netflix"/>Netflix

Netflix uses Python in a very similar manner to Spotify, relying on the language to [power its data analysis on the server side (<FontIcon icon="fa-brands fa-medium"/>`netflixtechblog`)](https://netflixtechblog.com/python-at-netflix-86b6028b3b3e). It doesn’t just stop there, however. Netflix allows their software engineers to choose what language to code in, and have noticed a large upsurge in the number of Python applications.

When surveyed, Netflix engineers cite the standard library, the extremely active development community, and the rich variety of third party libraries available to solve nearly any given problem. Additionally, because Python is so easy to develop, it has become a linchpin in many of Netflix’s other services.

One of the primary places that Python is used is in the Central Alert Gateway. This RESTful web app processes alerts from anywhere, and then route them to people or groups that would need to see them. Additionally, the app has the power to suppress duplicate alerts that have already been handled and in some cases, perform automated solutions such as rebooting a process or terminating something that is starting to look shaky. This app is a huge win for Netflix considering the sheer volume of alerts. Handling them intelligently means that developers and engineers aren’t flooded with redundant calls.

Another area that Python is used at Netflix is with monkey apps used to track security changes and history. These monkeys are used to track and alert any changes in EC2 security related policies in any groups, tracking any changes in these environments. They are also used to ensure to track the dozens of SSL certificates attached to Netflix’s multiple domains. In tracking, Netflix has seen a reduction in unexpected expirations drop from one very quarter to none since 2012. ---

## <FontIcon icon="fa-brands fa-dropbox"/>Dropbox

This cloud based storage system uses Python in its desktop client. If you have any doubt at all about how invested Dropbox is in Python, consider that in 2012, they managed to convince Guido van Rossum, Python’s creator and benevolent dictator for life, away from Google and into the Dropbox fold.

Rossum joined Dropbox under the condition that [he would be an engineer (<FontIcon icon="fa-brands fa-medium"/>`dropbox-makers`)](https://medium.com/dropbox-makers/guido-van-rossum-on-finding-his-way-e018e8b5f6b1), not a lead or even a manager. In his first year, he was able to help bring about the ability to share datastores with other users within the Dropbox community.

While a great many of Dropbox’s libraries and internals are proprietary and not open source, the company has released [<FontIcon icon="fa-brands fa-dropbox"/>a very efficient API](https://dropbox.com/developers/documentation/python) coded in python that allows you to see how their engineers are thinking. You can also read between the lines when you read [<FontIcon icon="fas fa-globe"/>interviews with Dropbox engineers](https://talkpython.fm/episodes/transcript/30/python-community-and-python-at-dropbox) about how a huge percentage of their server side code is Python.

It’s also interesting to note that while the client side programs are coded in Python, they make use of various libraries on both Mac and Windows machines to allow a unified experience. This is because Python doesn’t come preinstalled on Windows and depending on your Mac, your Python version will vary.

---

## <FontIcon icon="fa-brands fa-reddit"/>Reddit

This website had 542 million visitors every month across 2017, making it the [<FontIcon icon="fa-brands fa-amazon"/>fourth most visited website in the United States](https://alexa.com/siteinfo/reddit.com) and seventh most visited in the world. In 2015, there were 73.15 million submissions and 82.54 billion pageviews. And behind it all, forming the software backbone, was Python.

Reddit was originally coded in Lisp, but in December of 2005, six months after its launch, the site was recoded into Python. The primary reason for the change was that Python had a wider range of code libraries and was more developmentally flexible. The web framework that originally ran the site, web.py, is now an open-source project.

In a 2009 interview, Steve Huffman and Alexis Ohanian were asked during [**Pycon**](/realpython.com/pycon-guide.md) why Reddit is still using Python as its framework. [<FontIcon icon="fas fa-globe"/>According to Huffman](https://brainsik.net/2009/why-reddit-uses-python/), the first reason is the same as the reason for the change:

> “There’s a library for everything. We’ve been learning a lot of these technologies and a lot of these architectures as we go. And, so, when I don’t understand connection pools, I can just find a library until I understand it better myself and write our own. Don’t understand web frameworks, so we’ll use someone else’s until we make our own…Python has an awesome crutch like that.”

The second reason for Reddit staying with Python is a common thread that runs through all of the companies who build with it. According to Huffman, it’s the readability of the code:

> “When we hire new employees … I don’t think we’ve yet hired an employee who knew Python. I just say, ‘everything you write needs to be in Python.’ Just so I can read it. And it’s awesome because I can see from across the room, looking at their screen, whether their code is good or bad. Because good Python code has a very obvious structure.
> 
> And that makes my life so much easier. […] It’s extremely expressive, extremely readable, and extremely writable. And that just keeps life smooth”

::: note Update

And yes, that now makes 9 world-class companies that use Python in production. Initially we didn’t count Instagram separately because the company is owned by Facebook. But given the impressive scale the Instagram team operates at, we thought it made sense to give them a separate bullet point.

:::

---

## Anyone Else?

In this post we looked at eight world-class and successful software companies that use Python in production. But they’re not the only ones. As of 2018 Python adoption has reached a new peak and continues to climb.

Did we miss anyone one this list? Leave a comment below and let us know about your favorite Python shop!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "8 World-Class Software Companies That Use Python",
  "desc": "A review of eight top-tier companies that use Python in production, and why. Learn about their struggles and successes, and see the career opportunities for Python developers today.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/world-class-companies-using-python.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
