---
lang: en-US
title: "How to Overcome a Negative Performance Review and Become a Better Developer"
description: "Article(s) > How to Overcome a Negative Performance Review and Become a Better Developer"
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
      content: "Article(s) > How to Overcome a Negative Performance Review and Become a Better Developer"
    - property: og:description
      content: "How to Overcome a Negative Performance Review and Become a Better Developer"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/clawing-out-of-underperformance.html
prev: /academics/coen/articles/README.md
date: 2025-10-31
isOriginal: false
author:
  - name: Moshe Siegel
    url : https://freecodecamp.org/news/author/curiousmoshe/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761774919543/5eb6447b-d709-41cb-9383-73dacde102a7.png
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
  name="How to Overcome a Negative Performance Review and Become a Better Developer"
  desc="I was a year into my new job at Google. After repeated warnings about underperformance, my manager sat me down. I was being placed on a Performance Improvement Plan (PIP). For those unfamiliar, a PIP at Google is a two-month plan to show improvement ..."
  url="https://freecodecamp.org/news/clawing-out-of-underperformance"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761774919543/5eb6447b-d709-41cb-9383-73dacde102a7.png"/>

I was a year into my new job at Google. After repeated warnings about underperformance, my manager sat me down. I was being placed on a Performance Improvement Plan (PIP).

For those unfamiliar, a PIP at Google is a two-month plan to show improvement – a final chance to prove yourself. You’re given a project and a strict deadline. Deliver successfully, or you’re fired. There are no extensions, no middle ground.

Scary thoughts about providing for my family’s finances raced through my mind. But my deeper fear was this: what story would I carry about myself if I tried to persevere and failed?

If I got fired, I would need to face job interviews. And I knew the question would come: *“Tell me about a project you worked on at Google that you’re most proud of.”* The honest answer was that I didn’t have one. I hadn’t yet excelled at a project, hadn’t gone deep enough into any system to truly own it. I imagined myself sitting in an interview, with a blank face, with nothing to say.

That dreadful image became my motivation. I wanted a project I could truly own, something I could explain inside and out, regardless of how the PIP ended. I’m also not the type of person who simply backs down when things get tough. I needed to prove to myself that I could rise up. I was gonna give the project everything I had, week after week after week. That singular commitment became the start of my transformation into a more focused, disciplined engineer.

In this guide, you’ll learn how to turn professional setbacks into catalysts for growth. While examining my journey on Google’s Performance Improvement Plan, I’ll show you how to face underperformance head-on, rebuild your confidence, and come out stronger than before. You’ll see how focus, discipline, and gratitude can turn the lowest points of your career into launch ramps for acceleration.

---

## The Backstory

To understand how I landed in that chair across from my manager, you need to know where I came from. Before Google, I’d worked at Meta. I was hired there as an IC3 (entry-level engineer) and promoted after a year to IC4 (mid-level). But that promotion didn't come from technical excellence. It came from my connecting our engineering projects to the business’ needs.

I had worked on a payments system used by large enterprises. By sitting with the operations staff and customer service reps, I spotted inefficiencies and built small features that saved time, reduced errors, and allowed the team to scale. Those changes had a big impact, and they earned me a promotion. But, in hindsight, my success had come from soft skills such as teamwork and business awareness. I hadn’t actually developed the technical knowledge expected of an IC4. On my team at Google, technical mastery was the main thing we were measured on, while business awareness was a side point. On top of that, I had recently immigrated from the United States to Israel and needed to learn the local language of Hebrew and the local culture. It was a lot all at once: new country, new language, new company, and strong engineering expectations.

The gap between my technical skills and those of my peers eventually led to my being placed on a Performance Improvement Plan.

---

## The PIP Begins

When the PIP started, I increased my working hours to 60 hours per week. I cut out almost everything else in my life – news, side projects, YouTube – and focused only on my work. When you’re falling behind, cutting distractions isn’t punishment. Rather, it’s how you create the quiet needed to actually improve.

It was brutal. Despite all the intense hours, I was slower than my coworkers. They shipped code confidently while I second-guessed myself. They reviewed my work and pointed out ways to improve it.

Some nights I walked away from my desk ready to cry. I was exhausted, and even after pouring in all those hours, I still wasn’t keeping pace. I felt defeated.

But I kept grinding away, day after day, week after week. Ignoring every side project and distraction forced me to confront the real issue: my lack of depth in the systems I was working on.

---

## The Project

For confidentiality reasons, I won’t describe the actual project I was assigned. But here’s a similar example.

Imagine Google had a small music game built into Google Search. My task was to add a line of text above the game’s start button telling players how many people had reached the next level. The goal was to encourage more people to keep playing.

The text addition would run as an experiment. We’d launch it to a small percentage of users, measure the impact, and then either shut it down or roll it out to everyone.

The problem? At that time, Google Search didn’t even store how many players completed each level. So before I could add the text, I had to design and run a new data pipeline to track how many players completed each level of the game.

At first, I got lost. Just before my PIP began, our broader organization had been through a reorg, and my small team of five engineers was newly assigned to focus on games within Search. None of us had touched the gaming code before, and the particular game I was assigned hadn't had any meaningful updates in several years.

I spent days combing through design docs from 3-7 years earlier, only to find that the original authors had long since moved on. Each time I reached out, I’d get referred to someone else. Eventually, I found the current owner of the data storage systems for gaming. She had recently inherited them and hadn’t built the systems herself, but she helped me understand their current state.

With that clarity, I was finally making headway. But I realized I needed to rethink my priorities. Data pipeline code could be reviewed and deployed relatively quickly, while code changes to Google Search required slower, more comprehensive quality assurance checks. If I wanted to have any chance of meeting the PIP deadline, I had to shift focus to the Search-side work first.

As I dug deeper, another issue surfaced: the people who were listed as the engineering owners of the game hadn’t touched it in years and didn’t want to be involved anymore. I learned that our team would be running many more experiments on that code. Therefore, after consulting with my manager, I became the game’s code owner, the person ultimately responsible for all engineering decisions.

Taking ownership didn’t mean I suddenly moved fast or flawlessly. Some of my choices slowed me down. I aimed for near-perfect data accuracy when “mostly accurate” would have been enough for an experiment. I also wasted days digging through outdated documentation instead of simply reaching out to the people behind it.

After several days reading a four-year-old doc, I finally messaged the author. They immediately redirected me to someone else, who then forwarded me again. The third person turned out to be the current owner, and within minutes, they shared with me their private notes which clarified a ton.

But those mistakes were part of the learning curve. Each week, I dove deeper into the engineering tasks, internalized more of the systems, and made more progress than the week before.

By the time the final two weeks of the PIP arrived, I was operating at a whole new level. While the first month had felt like drowning, the last two weeks had felt like flying. I was excitedly diving into the code, unblocking myself, and helping teammates navigate the codebase.

That turnaround, from tears of frustration to the thrill of ownership, was exhilarating. For the first time at Google, I was independently driving my project forward. And I loved it.

When the PIP deadline arrived, though, I hadn’t yet delivered the full project. I was just a few hours of engineering work away from getting a working end-to-end flow with hardcoded data, but the actual data collection and experiment launch would have required about nine more days of engineering work.

On a PIP, “almost there” isn’t good enough. I was called in for a hearing with my director and HR, where I was given an opportunity to explain my case.

I didn’t walk into that final meeting empty-handed. I brought a detailed handoff plan listing the current state of the project, the remaining steps, and every contact and document another engineer would need to continue. I also brought a plan for improving collaboration amongst our various gaming engineers by creating a doc that would function as a centralized directory of all gaming systems, their owners, and their design docs. I offered to maintain this directory as a side effort, building it up naturally through my ongoing engineering work and conversations with past owners of the systems.

The hearing was an hour. I walked my director and HR through what I had shipped, my handoff plan, and my roadmap for unblocking future projects. I left the meeting proud of all that I’d learned over the previous two months. “*Whatever will be will be,*” I told myself.

A few days later, HR and my director called me back with their decision. Their feedback was straightforward: I had shown steady improvement, but I hadn’t delivered the final project on time, and therefore I hadn’t met expectations for my level.

Their feedback didn’t mention my handoff plan, my roadmap, nor my becoming the game’s code owner. That’s because a PIP isn’t a coaching program, it’s an evaluation. It doesn’t measure acceleration, it measures completion. It’s binary: You either deliver within the two months, or you don’t. And I hadn’t.

Upon hearing their decision, I thanked my director and the HR representative for having given me a final chance. I told them that the PIP had succeeded: it had built within me an internal engine of ownership over my engineering career. The fact that I would no longer be at Google was irrelevant. There would be no break in my internal transformation.

---

## Fatherhood

The official decision closed one chapter. But the habits I’d built during the PIP of focus, ownership, and accountability began reshaping more than just my work. They changed how I saw myself as a father and husband.

Before the PIP, I’d take my toddler to the playground after work. During it, I was often too drained for that. I’d sit him in front of the TV while I caught up on writing code or reading documentation. Date nights with my wife slipped away too. For a while, I wondered: What kind of father and husband does that make me?

One night, I was listening to financial coach Dave Ramsey, a religious Christian who often brings faith into his talk show. He spoke about a father’s responsibility to provide for his family. It reframed how I saw my long hours. Had I made more disciplined decisions and strengthened my engineering skills months earlier, I never would have been placed on the PIP. The newer, more focused, harder-working version of me wasn’t the problem, it was the solution.

So as my son sat in front of the TV, I reminded myself: An earlier version of me had made decisions which resulted in my now being less available for my family. The new me, the disciplined me, hadn’t made that choice. My current unavailability was a course correction that needed to happen for me to become the type of father and husband I wanted to become.

---

## Letting Go

When I was let go, I felt a little lost. One of my biggest worries was financial. Not only did I lose a high-paying job, but I was also frustrated that I wouldn’t receive the yearly bonus Google gives its employees. I had plans for how I would use it, and letting go of that expectation was difficult.

I spoke with my Rabbi about being let go. He told me: In Judaism, we believe that everything happens for a reason. If I lost the job, then God wanted me to lose it. He encouraged me to view my overall experience at Google in positive terms, and to focus on appreciation to God for having a plan for me. It made logical sense, but I was still frustrated about the loss of the bonus income.

The inner peace came later, when I realized something simple: I hadn’t earned that yearly bonus. My performance before the PIP hadn’t justified it. It made sense, in fact it felt right, that I didn’t receive it.

With that acceptance came space for gratitude, especially toward my former coworkers and managers. During those final two months, they reviewed my work, pointed out ways to improve it, answered my questions, and patiently explained how Google’s internal engineering systems worked. I will always be grateful for how much they taught me.

That gratitude extended to my manager as well. Several weeks after being let go, I visited the office one last time to say goodbye to my team. My manager explained that the decision to let me go had been a difficult one. He told me he liked me as a person and recognized how much I had improved during the PIP. But keeping me on would have required certainty that I was already operating at the expected engineering level, and that was something he wasn’t sure of. I understood his position. If I had been in his shoes, I would have made the same decision.

Because of the Performance Improvement Plan I had gained growth, humility, and clarity. Letting go was about moving forward with gratitude for what had gone right.

---

## What’s Next

The PIP had given me something invaluable: structure and accountability. During those eight weeks, I lived by a project plan timeline, and when my time at Google ended, I didn’t let that habit go. The very first thing I did afterward was set up a new timeline, this time for my job hunt. Tasks were ordered by priority, with time estimates and due dates, so that my search itself became a disciplined project. My wife, or anyone else, could hold me accountable just as my manager once had.

As an example, the below table is a snippet from my job hunt timeline:

| **Task** | **Time Remaining** | **Due Date** |
| --- | --- | --- |
| Highly skilled at easy algorithms | 2 days | Oct 20th, 2025 |
| Medium skill at system design | 4-6 days | Oct 24th, 2025 |
| Talk to 3 local engineers and learn from them | 12 hours weekly | - |

The key to creating my job hunting timeline was being clear on my priorities regarding what type of engineering position and what type of company I’d prefer to work for.

At Google, a company with tens of thousands of engineers, I used coding frameworks and technologies that were custom-built for Google engineers and used by no one outside of Google. I felt isolated from the greater world and to engineers outside of the company. So I want my next engineering role to be at a smaller company, where I’ll use popular open-source technologies and software used by engineers throughout the world.

To prepare myself for my next engineering role, I'm now laser-focused on upskilling my technical knowledge. I’ve been interviewing engineers at local startups about the technologies they use and then sharing the lessons publicly on LinkedIn. Each 1:1 interview and write-up helps close the skills gap that led to my firing at Google.

By following my written timeline and by knowing my end goal, I’ve been able to sustain long-term momentum in my job hunt.

---

## Closing

Whatever will be will be. I’m grateful for the PIP experience, because it caused me to claw my way out of underperformance. It stripped away distractions, forced me to confront my engineering weaknesses head-on, and gave me the discipline to close the gap.

The momentum I built during those eight weeks never stopped. There was no break between week eight and week nine, just continuous acceleration. Week eight was about my PIP project, and week nine was about my job hunt. The external goals changed, but the internal engine kept running.

While my momentum softened the blow of getting fired, it didn’t erase the emotions that came with it. Sharing my story of being fired for underperformance has felt awkward and vulnerable, but also has given me a feeling of pride. Pride at who I’ve become. And pride in my giving back to the greater community, by enabling others facing similar struggles to learn from my story.

The eight weeks of the PIP were my launch ramp, and my acceleration continued long after the official PIP was over. To quote someone I know, “Like the mythical Phoenix, I believe in rising from the ashes, no matter how daunting the obstacle.” The PIP was my ashes, but it was also my fire.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Overcome a Negative Performance Review and Become a Better Developer",
  "desc": "I was a year into my new job at Google. After repeated warnings about underperformance, my manager sat me down. I was being placed on a Performance Improvement Plan (PIP). For those unfamiliar, a PIP at Google is a two-month plan to show improvement ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/clawing-out-of-underperformance.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
