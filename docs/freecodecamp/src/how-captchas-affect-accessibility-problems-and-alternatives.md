---
lang: en-US
title: "How CAPTCHAs Affect Accessibility: Problems, Workarounds, and Alternatives"
description: "Article(s) > How CAPTCHAs Affect Accessibility: Problems, Workarounds, and Alternatives"
icon: fas fa-pen-ruler
category: 
  - Design
  - System
  - Accessibility
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - design
  - system
  - a11y
  - accessibility
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How CAPTCHAs Affect Accessibility: Problems, Workarounds, and Alternatives"
    - property: og:description
      content: "How CAPTCHAs Affect Accessibility: Problems, Workarounds, and Alternatives"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-captchas-affect-accessibility-problems-and-alternatives.html
prev: /academics/system-design/articles/README.md
date: 2026-05-28
isOriginal: false
author:
  - name: Ilknur Eren
    url: https://freecodecamp.org/news/author/ilknureren/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/a273f7cd-5fd3-49cf-942b-c2d4b6af2cc7.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How CAPTCHAs Affect Accessibility: Problems, Workarounds, and Alternatives"
  desc="CAPTCHAs – or the “I am not a robot” challenges – were originally designed to separate humans from bots. It started with deciphering some distorted text, then evolved into checking a box or boxes wher"
  url="https://freecodecamp.org/news/how-captchas-affect-accessibility-problems-and-alternatives"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/a273f7cd-5fd3-49cf-942b-c2d4b6af2cc7.png"/>

CAPTCHAs – or the “I am not a robot” challenges – were originally designed to separate humans from bots.

It started with deciphering some distorted text, then evolved into checking a box or boxes where an element is in an image. While CAPTCHAs can help websites determine whether the user is a human or a bot, they often present challenges to many real humans, especially those with disabilities.

![Photo by [<VPIcon icon="fas fa-globe"/>Karen Grigorean](https://unsplash.com/@karengrigorean?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [<VPIcon icon="fas fa-globe"/>Unsplash](https://unsplash.com/photos/a-person-pointing-at-a-large-display-of-pictures-9D6UlCW38Ss?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](https://cdn.hashnode.com/uploads/covers/68379e7b1fd0b956f4ad9839/04cdf5ba-02c9-4810-99fc-f61dd0e4c944.jpg)

---

## What is CAPTCHA?

CAPTCHA is an acronym that stands for Completely Automated Public Turing test to tell Computers and Humans Apart. CAPTCHA was originally created to prevent automated systems from abusing websites. For example, an automated system creating thousands of fake accounts in a short amount of time.

CAPTCHA can be a visual recognition test, like selecting all images with traffic lights. CAPTCHA can be audio challenge, which can be a test to type from hearing an audio. CAPTCHA can also be time-based or interaction-based behavior tracking. Visual, audio and time-based CAPTCHAs all have their own unique set of usability and accessibility issues.

---

## What Are the Issues with Visual CAPTCHAs?

Image-based CAPTCHAs are one of the most common formats today. Visual CAPTCHA’s are the tests where we you'd see nine square boxes and have to select all of the boxes with traffic lights. They are also tested with one large image broken down into nine squares, and the user has to select the boxes where traffic lights appear. The visual CAPTCHAs create barriers for many people, such as people with visual impairments like blindness, low vision, color blindness.

First, the visual tests are often poorly compatible with screen readers as they are often not properly labeled for assistive technologies like screen readers, which creates an issue for users who rely on them.

In addition to issues with screen readers, how many times have you tried to complete a CAPTCHA where a sliver of a traffic light was in another square and you didn’t know if the test wanted you to select that box as well? I personally had issues verifying if the CAPTCHA test wanted me to select a square with a sliver of an image. Some CAPTCHAs have extremely low color contrast where I had issues figuring out the distorted text.

Some of the tests and images are ambiguous and create confusion for users. Audio CAPTCHA is an alternative approach to those that struggle with visual CAPTCHAs. Audio also comes with it's own set of usability and accessibility issues.

---

## What Are the Issues with Auditory CAPTCHAs?

The visual CAPTCHA tests often come with an auditory equivalent for users who want to complete the test with auditory clues. The tests often have a button for the user to click and hear the visual clues. The user needs to enter the correct clue they hear in order to complete the CAPTCHA.

While the auditory CAPTCHA provides an alternative way for a user to complete the assignment, these often come with their own challenges. For example, they are frequently hard to understand due to distortion. Also, what if the user tries to complete these in a loud environment? Not only will the audio be distorted, the user will face a hard time listening when their environment is loud. In addition, the user might be hard of hearing, which will make the auditory CAPTCHA even harder to complete.

CAPTCHAs may put users in two difficult situations. Either struggle with a visual interface you cannot see, or attempt an audio alternative that may be equally unusable.

In addition to these struggles, CAPTCHAs can be time-based, giving you a test to complete in a specific amount of time. Time-based limitations can create another set of problems.

---

## What Are the Issues with Time-based CAPTCHAs?

Some CAPTCHA challenges might need to be completed in a specific period of time. If the user takes longer, CAPTCHA test is voided.

The time-based CAPTCHA can create issues for users with cognitive disabilities, like memory, attention, or processing challenges or motor disabilities, those who have difficulty using a mouse or precise interactions. These users might need to spend more time completing the CAPTCHA, more time than the time limit set by CAPTCHA. In addition, users with anxiety disorders, or simply low bandwidth connections can also face the same issue.

---

## Common Workarounds and Accessible Alternatives

Some websites try to improve accessibility by offering invisible CAPTCHA, checkbox verification, or verification through email or SMS. However, these solutions are inconsistent and users may still face challenges when the system is uncertain.

Improving accessibility in bot prevention does not mean removing security - it means reducing unnecessary barriers. We can try to implement Risk-Based Authentication, Device-Based Trust or move toward a human friendly approach.

### Risk-Based Authentication

Instead of challenging every user, websites can analyze signals such as device history, location, login patterns, and behavior in the background. This allows the low-risk users proceed normally while triggering additional verification for suspicious activity. This reduces interruptions for legitimate users while maintaining security.

### Device-Based Trust

Websites can recognize trusted devices after a successful login using secure tokens, passkeys, or multi-factor authentication. For example:

1. User logs in successfully
2. Device is marked as trusted
3. Future visits bypass CAPTCHA unless unusual activity is detected

However, users should still have clear opt-outs and accessible fallback options for the first time they log in.

### Human-Friendly Verification

When verification is necessary, websites can use methods that are easier to access than visual or audio puzzles, such as, email confirmation links, one-time codes and push notifications. These methods are often more compatible with screen readers and assistive technologies.

The goal is to move from “prove you are human by solving a puzzle” to “verify legitimacy with minimal friction for all users.”

---

## Conclusion

CAPTCHAs highlight a broader tension in web design: security versus accessibility. While they solve a real problem—automated abuse—they often introduce barriers that disproportionately affect users with disabilities.

As accessibility standards evolve and awareness increases, the challenge is not just building systems that stop bots, but ensuring that legitimate users are not excluded in the process.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How CAPTCHAs Affect Accessibility: Problems, Workarounds, and Alternatives",
  "desc": "CAPTCHAs – or the “I am not a robot” challenges – were originally designed to separate humans from bots. It started with deciphering some distorted text, then evolved into checking a box or boxes wher",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-captchas-affect-accessibility-problems-and-alternatives.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
