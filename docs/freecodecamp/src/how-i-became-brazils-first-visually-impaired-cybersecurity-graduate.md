---
lang: en-US
title: "How I Became Brazil's First Visually Impaired Cybersecurity Graduate — and Changed Vulnerability Research"
description: "Article(s) > How I Became Brazil's First Visually Impaired Cybersecurity Graduate — and Changed Vulnerability Research"
icon: fas fa-shield-halved
category:
  - DevOps
  - Security
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - sec
  - security
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How I Became Brazil's First Visually Impaired Cybersecurity Graduate — and Changed Vulnerability Research"
    - property: og:description
      content: "How I Became Brazil's First Visually Impaired Cybersecurity Graduate — and Changed Vulnerability Research"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-i-became-brazils-first-visually-impaired-cybersecurity-graduate.html
prev: /devops/security/articles/README.md
date: 2026-06-26
isOriginal: false
author:
  - name: Juan Mathews Rebello Santos
    url: https://freecodecamp.org/news/author/the-blind-hacker/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6a4dc6c9-2901-42c3-b008-5da6da29a845.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Security > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How I Became Brazil's First Visually Impaired Cybersecurity Graduate — and Changed Vulnerability Research"
  desc="I was born prematurely at six months. My mother's placenta detached before delivery, and she essentially ”gave birth” before I came out. Two days after my birth, doctors found a heart murmur that requ"
  url="https://freecodecamp.org/news/how-i-became-brazils-first-visually-impaired-cybersecurity-graduate"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6a4dc6c9-2901-42c3-b008-5da6da29a845.png"/>

I was born prematurely at six months. My mother's placenta detached before delivery, and she essentially "gave birth" before I came out.

Two days after my birth, doctors found a heart murmur that required emergency surgery. They also discovered that I was blind in my left eye — the visual pathway between my brain and my eye was completely closed. My right eye retained about 80-90% vision, but I developed cataracts and lost the remaining sight at age nine.

Basically, I am a miracle.

Today, at 21, I'm the first visually impaired person in Brazil to earn a degree in Cyber Defense and Information Security. I'm also the first blind person to publish a vulnerability in the U.S. government's National Vulnerability Database (NVD).

I'm the author of the first cybersecurity book in Brazil written by a visually impaired person. And I founded BNVD.org, a Brazilian National Vulnerability Database that makes CVE data accessible in Portuguese.

I've also discovered critical vulnerabilities in Google, Microsoft, Nubank, and Smiles — all while using only a screen reader and my determination.

This is my story.

---

## From DOSVOX to Cyber Defense

I started reading at age three. In school, I was placed in a resource room where I discovered DOSVOX, a Brazilian operating system for visually impaired people that speaks everything on the screen.

Even without sight, I was able to play video games by sound alone and won tournaments against sighted players. At 10 years old, I started using computers, building websites and writing programs. At 14, I dove deeper into programming. And at 17, I discovered cybersecurity and never looked back.

I used a screen reader called NVDA (NonVisual Desktop Access), a free and open-source tool for Windows that converts on-screen content into audio. I still use it today.

On my phone, I use Jieshuo, a screen reader based on Google TalkBack. These tools are essential to my work, but they're not perfect. Many corporate applications and websites aren't built with accessibility in mind.

In fact, some software developed in older programming languages is practically inaccessible. I've had to explain to my employer how a screen reader works and what they needed to do to make their systems usable for me.

I enrolled in the Cyber Defense program at UNIFAVIP/Wyden, becoming the first blind person in Brazil to graduate in this field. Throughout my studies, I had to fight for accessible materials, adapted exams, and screen reader-compatible platforms. The university didn't have a roadmap for a blind cybersecurity student — so I had to help create one.

---

## The First CVE Published by a Blind Researcher

In 2025, I discovered a critical vulnerability in the NVDA Remote and Tele NVDA Remote add-ons, which allow screen reader users to control remote computers. The problem was simple: the add-ons accepted any password regardless of strength, and had no additional authentication mechanism. More than 1,000 systems were using passwords like "1234."

I reported the vulnerability, and it was registered as CVE-2025-26326 — the first CVE ever published by a totally blind researcher. The vulnerability was recorded in the NVD by MITRE and listed in multiple global databases, including CVE.org and NVD.nist.gov.

Many people told me this would be impossible. But I learned early that the biggest limitations are not in the body. They are in the mind.

This wasn't my only discovery. I've identified and responsibly disclosed vulnerabilities to Google, Microsoft, Nubank, and Smiles (the Brazilian airline loyalty program). Each report followed the same pattern: finding weaknesses that automated scanners miss, because my manual, screen-reader-driven approach sees software from a different angle.

---

## The Book: Digital Scams and How to Protect Yourself

I've also written a book called "Golpes Digitais: Como se Proteger na Era da Internet" (Digital Scams: How to Protect Yourself in the Internet Era), published in both Portuguese and English. It's the first cybersecurity book in Brazil written by a visually impaired author.

The book covers how to identify common scams, how fraudsters think, and how to navigate the internet safely. It was released on Amazon across multiple countries, including Brazil, the United States, the United Kingdom, Germany, France, and Japan.

I wrote this book for everyone — from super-connected people to those still taking their first steps online.

All proceeds from the book go toward my wife's medical treatment. My wife, Jhennyffer Rebello, is also visually impaired, and we support each other through the challenges of building a life with limited vision in a world not designed for us.

---

## The BNVD Project: A Brazilian Alternative to NVD

In 2025, I launched BNVD (Banco Nacional de Vulnerabilidades), a Brazilian alternative to the U.S. National Vulnerability Database. The project started with me and four friends, but I'm now the sole maintainer.

BNVD serves a critical purpose. In early 2025, the NVD faced a funding crisis that threatened to take it offline. BNVD ensures that Brazilian security professionals have access to CVE data in Portuguese, with a mobile app and continuous updates.

The platform translates vulnerability descriptions into Brazilian Portuguese and provides search, filtering, and notification features tailored to the Brazilian cybersecurity community.

BNVD is an alternative database, similar to what Japan and China already have. It helps the Brazilian public by being in Portuguese and being constantly updated.

Beyond BNVD, I also built an OSINT platform with over 1,300 investigation tools, a data leak monitoring service that tracks credential exposures in real time, and a curated collection of accessible cybersecurity tools for visually impaired professionals. I published all this on my GitHub under the handle azurejoga.

---

## 50+ Certifications and Global Recognition

I also hold over 50 professional certifications, including an Oxford diploma in Cybersecurity, Fortinet NSE certification, ISO 27001 lead implementer, LGPD (Brazilian data protection law) certification, and many others spanning network security, ethical hacking, digital forensics, and risk management.

I've earned 8 postgraduate degrees focused on different areas of cybersecurity, which makes me one of the most credentialed cybersecurity professionals in Brazil, regardless of disability.

I'm a Wazuh Ambassador for Brazil, representing the open-source security platform at events and helping grow the Brazilian Wazuh community. I'm also a member of Woncy, a global network of cybersecurity professionals.

My expertise has been featured by international publications. Moonlock cited me in an article about Apple's record-breaking security patches in 2026, where I provided expert analysis on the increasing volume of security updates. Help Net Security interviewed me about the security risks of leaked arXiv LaTeX API tokens. ProLion quoted me on the rising ransomware threat to schools. And CISO Advisor profiled me and my BNVD project in depth.

I also record and edit cybersecurity video content using tools like eternal recorder and Clipchampp. I run an educational YouTube channel, and I speak at conferences about inclusive cybersecurity, fraud prevention, and motivation.

---

## The Reality of Being Blind in Tech

Despite all this, I want to be honest about the challenges. I've applied to more than 500 job postings and have never been called for a single interview through conventional applications. I got my job through Semearhis, a company that connects disabled professionals with employers based on skills, not quotas.

After all, companies need to hire qualified people, not just fill quotas to look inclusive. In 2026, in the 21st century, it's unacceptable that basic accessibility issues are still ignored.

And the everyday reality is this: bullying in school, people assuming a blind person is a beggar, the assumption that I can't do technical work, and being stopped at a bus stop by a stranger who asked if I could afford food.

### The Tools that Help Me

And it's worth discussing in a bit more detail what it actually means to be blind while working in technology. Many people assume that blindness automatically creates a barrier to careers in cybersecurity, software, or digital investigations. In reality, the biggest obstacles usually aren't the technology itself, but the lack of accessibility built into it.

I use a screen reader called NVDA (NonVisual Desktop Access), which converts the information displayed on my computer into speech. Instead of looking at a screen, I navigate websites, applications, code editors, terminals, and documents through keyboard commands and audio feedback. After years of experience, this has become second nature. My screen reader isn't simply a tool I occasionally use. It's the primary way I interact with computers and the internet every day.

Modern artificial intelligence has also become an important part of my workflow. Tools such as Be My Eyes and AI-powered image description systems can help explain photographs, screenshots, diagrams, user interfaces, and other visual content that would otherwise be inaccessible.

These technologies have dramatically increased independence for blind people, allowing us to understand visual information more quickly than ever before.

At the same time, AI isn't perfect. Descriptions can be incomplete, inaccurate, or miss important context, so accessibility still can't rely entirely on automation.

### Accessibility Challenges

The challenges begin when accessibility isn't considered during development. A website may look beautiful and modern, but if buttons are unlabeled, forms are improperly structured, or navigation depends entirely on visual cues, a screen reader user may be completely unable to use it.

Studies and accessibility surveys consistently identify unlabeled buttons, missing image descriptions, inaccessible navigation, and poorly designed interfaces as some of the most common barriers encountered by blind users online.

One of the most frustrating realities is that accessibility problems often make entire services unusable. An inaccessible banking application, government portal, ticketing platform, or business system can prevent a blind person from completing tasks independently.

In many cases, the issue isn't a lack of technology on our side. Instead, it's simply that accessibility standards such as the Web Content Accessibility Guidelines (WCAG) were never properly implemented. Screen readers like NVDA, JAWS, and VoiceOver can only interpret information that developers expose correctly through accessible design and code.

### Mobile Accessibility Issues

The same challenges exist on mobile devices. People often assume that smartphones have solved accessibility, but many mobile applications are released with little or no accessibility testing. Buttons may have no labels, menus may not be reachable through screen readers, and important features may depend on gestures or visual interactions that cannot be performed non-visually.

As a result, some apps become completely inaccessible despite the powerful accessibility features built into modern operating systems.

### Image Accessibility Issues

Images present another major challenge. A photograph, chart, infographic, or screenshot without a meaningful description can leave a blind user without access to essential information. Many developers still omit alternative text entirely or provide descriptions that are so vague they're useless.

When an image contains important information, accessibility requires more than simply announcing that an image exists. You need to convey the same information that's available to sighted users.

### Physical Barriers

There are also physical barriers that receive less attention. Self-service kiosks, touchscreen terminals, public information displays, and other technology-driven systems are often designed without blind users in mind.

While society increasingly relies on digital interfaces, many of these systems remain inaccessible without assistance from another person. Researchers and accessibility advocates continue working on solutions, but the problem remains widespread.

### The Importance of Accessibility

What I would like readers to understand is that blindness doesn't prevent someone from becoming a cybersecurity professional, software developer, researcher, or technology expert. The real question is whether the tools and systems around us were designed inclusively.

When accessibility is considered from the beginning, blind professionals can compete, create, innovate, and contribute at the highest levels. When it's ignored, barriers are created unnecessarily.

Accessibility isn't a special feature for a small group of users. It's part of good design. And for many of us, it's the difference between independence and exclusion.

Despite all these challenges, I have many wins to share. I'm married to Jhennyffer, who's also visually impaired. I use Be My Eyes to identify clothing colors and styles so I can dress independently. I even took a photography course for blind people, learning to compose and frame images through sound and touch.

---

## What I Want You to Know

I frequently speak at conferences about inclusive cybersecurity, fraud prevention, and motivation. My message is consistent: a person with a disability can have a full life — a family, a career, dreams. The barriers are not in the body. They are in the mind.

I also want to share some advice for other visually impaired people entering tech: try to find an accessible university program, take specialized courses, get certified, build a LinkedIn presence, connect with other disabled professionals, and never stop applying.

Humility, perseverance, never giving up — that is the key. You'll always find obstacles. The important thing is not to quit, because quitting means you want to fail.

My plans for the future include reaching senior-level recognition in cybersecurity, expanding BNVD, publishing more CVEs, and becoming a reference for underrepresented groups in tech — especially women, who are still dramatically underrepresented in cybersecurity.

I want to get to the top, and I want to show that everything I learned came through study and perseverance. Brazilians never give up, and I believe that's true.

You can check out my website if you'd like to learn more about me and what I do: juanmathewsrebellosantos.com.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How I Became Brazil's First Visually Impaired Cybersecurity Graduate — and Changed Vulnerability Research",
  "desc": "I was born prematurely at six months. My mother's placenta detached before delivery, and she essentially ”gave birth” before I came out. Two days after my birth, doctors found a heart murmur that requ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-i-became-brazils-first-visually-impaired-cybersecurity-graduate.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
