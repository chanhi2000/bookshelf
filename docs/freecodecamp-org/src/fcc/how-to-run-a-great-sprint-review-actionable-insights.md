---
lang: en-US
title: "How to Run a Great Sprint Review - Actionable Tips for Developers and Teams"
description: "Article(s) > How to Run a Great Sprint Review - Actionable Tips for Developers and Teams"
icon: fas fa-user-tie
category:
  - Career
  - Tip
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - career
  - tip
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Run a Great Sprint Review - Actionable Tips for Developers and Teams"
    - property: og:description
      content: "How to Run a Great Sprint Review - Actionable Tips for Developers and Teams"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-run-a-great-sprint-review-actionable-insights.html
prev: /projects/career/articles/README.md
date: 2025-01-30
isOriginal: false
author:
  - name: Ben
    url : https://freecodecamp.org/news/author/justanothertechlead/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738170100236/fcc7407a-3b08-493f-a704-661eed12f369.png
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
  name="How to Run a Great Sprint Review - Actionable Tips for Developers and Teams"
  desc="In my twenty years of being in the Software Engineer game, I’ve been through lots of Sprint Reviews. I’ve seen them done well, and I’ve seen them used as no more than a few hours every sprint for people to take a nice break in a meeting room. When do..."
  url="https://freecodecamp.org/news/how-to-run-a-great-sprint-review-actionable-insights"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738170100236/fcc7407a-3b08-493f-a704-661eed12f369.png"/>

In my twenty years of being in the Software Engineer game, I’ve been through lots of Sprint Reviews. I’ve seen them done well, and I’ve seen them used as no more than a few hours every sprint for people to take a nice break in a meeting room.

When done right, the Sprint Review can be key to keeping your project on track. But badly run Sprint Reviews are worse than just the time they waste - they also reduce people’s trust in Scrum as a whole.

In this article, I’ll walk you through some clear, step-by-step ideas for making your Sprint Review more valuable.

---

## What is a Sprint Review?

A **Sprint Review** is a short session held at the end of each sprint, usually once every couple of weeks.

It allows the team to show what they have completed via demos, get feedback, and decide what happens next.

When run well, the Sprint Review shows progress and builds trust with the people who have a stake in the product and project.

Sure, you can tell the stakeholders you are on track, but if they can see it with their own eyes in the Sprint Review, they’ll be much happier.

---

## Who Should Be in the Review?

In short, anyone who wants to be. Anyone who is a project stakeholder in any capacity can and should attend the meetings.

The scrum team themselves are the core of the meeting, but there can also be Sales, Senior Management, other scrum teams, and Project Managers.

In short, if someone could have good input on a project or could get something out of learning something about a project, they should attend.

---

## What to Do Before the Review

To ensure that the meeting itself runs as smoothly as possible, you need to make sure that everyone presenting is ready and has a demo ready to show.

In my experience, live demos don’t work. Well, sometimes they do, but mostly they don’t.

Get the people who have a demo to at least record themselves showing their workflow prior to the meeting. That way, if they insist on doing a live demo, they have a recorded video as a backup if it goes wrong.

You should also have a running order. Know who is presenting, in which order, and group them by similarity of topic. Who presents and when doesn’t really matter as long as the presentations are grouped together by topic.

For instance, if you have six engineers - two working on a Login Page, two working on new back-end service, and two working on database performance - make sure that your running order groups these three distinct areas together.

If two demos are fairly similar, you can explain the context once and then run through both demos back to back. Be efficient, as you have a lot of people in this meeting and everyone knows that [<FontIcon icon="fas fa-globe"/>meetings are expensive](https://calculatorlord.com/meeting-cost-calculator/).

---

## During the Review

The Software Engineers who have completed a piece of work will present the work to the other members of the scrum team (Product, QA, and so on) as well as all stakeholders who have attended.

After each Engineer has presented, anyone in the room is free to either ask questions or make comments about the work/presentation.

These questions can simply be to fill in knowledge gaps for people who know less about the project, or they can be questions about why a particular solution was chosen.

Product or more business-focused members of the audience may now give feedback on whether what was demonstrated matches the business intent of what was asked to be delivered.

Once all questions and comments have been addressed, the next Engineer will present their work.

In a Sprint Review, everyone is encouraged to speak, but generally it’s only Engineers who present. So the Engineer will present what they have worked on, then Product, QA, BA, and so on can give feedback and ask questions specifically about what the engineer has presented.

---

## Example Review

Let’s take a look at an example review and what that may look like.

We’ll use the example above of having six engineers: two working on a Login Page, two working on a back-end service, and two working on database performance. In that case, you may have a running order like this:

Presentations:

1. Larry: *User Exceeds Max login attempts and the user account gets locked after the fifth incorrect password. User has to reset password before they can login again.*
2. David: *User clicks forgotten password link and a link is sent to their email address. The user follows this link and is able to reset their password.*
3. Premilla: *Reporting Service consumes the “User Exceeded Max Login Attempts” event and publishes it to the reporting dashboard.*
4. Akshat: *Reporting Service consumes the “User Clicked Forgotten Password” event and publishes this to the reporting dashboard*
5. Olga: *An Admin User can view the reporting dashboard for a month and load the report within 3 seconds.*
6. Trevor: *An Admin User can view the events from multiple users combined in to one dashboard and load the report within 2 seconds.*

As you can see here, the two login page user stories are demonstrated first, then the two reporting service stories, and then the two database speed stories. This requires less context switching for the members of the audience and means that context only needs to be given at the beginning of the first of the two grouped stories (that is, presentations 1, 3 and 5).

After presentation 1 (by Larry), Product may ask why he chose 5 retries as the maximum amount of retries before locking the account. Larry may have an answer, or he may not. Product can either ask to have a follow up on this later and find out what the industry standard is and apply that to Larry’s logic, or just leave it as it is.

After each of the six presentations, there could be questions, comments, and change requests by anyone in the audience. Typically this will then spark a conversation amongst the audience about the best approach.

For instance, in Larry’s example again, some may argue that they should not even be using a username and password, but instead should use an email address and [<FontIcon icon="fas fa-globe"/>magic link](https://pingidentity.com/en/resources/blog/post/what-is-magic-link-login.html). This is the beauty of the review. You have a lot of smart people in a room bringing their own experience and expertise.

---

## Actionable Takeaways

Here are some tips for what to show, how to show it, and what actually matters during the meeting itself.

### 1. Showcase Real Deliverables

First, always present working software or completed work rather than static slides. For instance, if you built a new login feature, do a live demo. This makes the review more genuine and shows tangible progress.

### 2. Encourage Open Feedback

Second, invite questions from everyone. Remind stakeholders that their ideas can help shape future work. Write down their suggestions, and confirm whether any changes should go straight into your backlog.

### 3. Keep It Clear and On Track

Third, maintain a simple format. For example, start with a quick overview of the sprint goal, move to demos, and end with a short discussion of next steps.

Avoid going too deep into technical details. If a topic needs more time, set up a follow-up chat.

### 4. Align on Next Steps

After that, update your backlog based on what you learned. If a feature needs an extra tweak, add that task right away.

This helps the entire group stay informed about the plan for the upcoming sprint.

### 5. Keep it short and end on Time

You should be reviewing one scrum team’s work for one sprint (two or three weeks).

If your meetings are running on for too long, it either means that your scrum team is too large (in which case, you should think about splitting your scrum team into [<FontIcon icon="fas fa-globe"/>smaller teams](https://namegenerators.online/scrum-team-name-generator/)), or you are not efficient enough with your demos.

People’s time and attention is expensive and in short supply. Keep the meetings to no more than one [<FontIcon icon="fa-brands fa-wikipedia-w"/>ultradian cycle](https://en.wikipedia.org/wiki/Basic_rest%E2%80%93activity_cycle). I personally try to limit all of the meetings I run to a max of 90 minutes.

Lastly, set a firm limit for the meeting so that participants feel confident bringing their feedback without dragging out the discussion.

Wrapping up on time respects everyone’s schedule and keeps the team fresh for the next sprint.

---

## In Summary

A Sprint Review gives stakeholders a real-time look at completed work, ensures alignment on what’s next, and gathers the feedback you need to grow your product effectively.

If you focus on showing real progress, inviting open dialogue, and keeping things concise, you’ll see a steady improvement in how your team delivers.

*Check out more insights on my blog, [<FontIcon icon="fas fa-globe"/>Just Another Tech Lead*](https://justanothertechlead.com/). Good luck with your next Sprint Review!*

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Run a Great Sprint Review - Actionable Tips for Developers and Teams",
  "desc": "In my twenty years of being in the Software Engineer game, I’ve been through lots of Sprint Reviews. I’ve seen them done well, and I’ve seen them used as no more than a few hours every sprint for people to take a nice break in a meeting room. When do...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-run-a-great-sprint-review-actionable-insights.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
