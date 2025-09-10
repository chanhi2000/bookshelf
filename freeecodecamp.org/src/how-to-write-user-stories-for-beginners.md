---
lang: en-US
title: "How to Write User Stories for Beginners: Agile in Practice"
description: "Article(s) > How to Write User Stories for Beginners: Agile in Practice"
icon: fas fa-pen-ruler
category: 
  - Design
  - System
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Write User Stories for Beginners: Agile in Practice"
    - property: og:description
      content: "How to Write User Stories for Beginners: Agile in Practice"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-write-user-stories-for-beginners.html
prev: /academics/system-design/articles/README.md/articles/README.md
date: 2024-12-17
isOriginal: false
author:
  - name: Ben
    url: https://freecodecamp.org/news/author/justanothertechlead/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1734447615195/2b7c6025-bce2-447e-a685-19f785dcd402.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Write User Stories for Beginners: Agile in Practice"
  desc="In this tutorial, you’ll learn about an important part of the Agile approach to software development: user stories. I’ll take you through what user stories are, common pitfalls that I’ve seen with creating user stories, and the frameworks that exist ..."
  url="https://freecodecamp.org/news/how-to-write-user-stories-for-beginners"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1734447615195/2b7c6025-bce2-447e-a685-19f785dcd402.png"/>

In this tutorial, you’ll learn about an important part of the Agile approach to software development: user stories.

I’ll take you through what user stories are, common pitfalls that I’ve seen with creating user stories, and the frameworks that exist to validate if your user story is “good”.

---

## The Beginnings of Agile

Chances are that you’ve heard of Agile Development and User Stories. But if you haven’t, let’s have a brief history lesson:

User Stories are part of a larger concept called Agile methodologies.

Agile methodologies have been around since 2001 when 17 well-respected software engineers met at a Ski resort in Utah and created the now infamous [<VPIcon icon="fas fa-globe"/>Agile Manifesto](https://agilemanifesto.org/).

If names such as Robert Martin, Martin Fowler and Kent Beck don’t mean anything to you, once you’ve finished this article, go and search them out. They have a wealth of knowledge and between them gave the world of software a more fluid way of delivering projects, called Agiile.

---

## What is Agile?

Agile is more of a way of thinking than a prescribed method. Prescribed methods exist, such as Scrum and Kanban, but Agile is a concept.

Agile promotes collaboration, fast feedback, and delivering value often to the user.

The Agile way of thinking encourages flexibility in project planning, which is in stark contrast to its competitor at the time, Waterfall project planning, which was very rigid with what was being delivered and when.

Agile methodologies promote doing “just enough” research at the beginning to get the project started, and then learning, iterating, and changing the design and deliverable as needed throughout the project until the final code is delivered. This “change and learn as you go” approach is called “adaptive planning”.

Agile promotes delivering something of value quickly and often, usually in the form of delivering code to production at the end of every two week “sprint”. This, again, is very different from traditional waterfall planning which would often require months of development before any user-visible change could be delivered to production.

Another key part of Agile is the focus it puts on stakeholders working together closely and often. Product, QA, Engineering, and Sales all have a large input and constant feedback on the project through the project lifecycle.

Now that you know a bit more about how Agile works, let’s dive deeper into how we validate value to the user.

Enter the User Story.

![Photo by [<VPIcon icon="fas fa-globe"/>Mikhail Nilov](https://www.pexels.com/photo/a-hand-pointing-the-sticky-note-on-the-wall-6592358)](https://cdn.hashnode.com/res/hashnode/image/upload/v1733997119683/6002c66a-b11c-4607-a37f-36480a970099.jpeg)

---

## What is a User Story?

A user story is way in plain English to connect the engineer to the end goal of the software.

It’s designed so that a non-techy can read it and understand what is being delivered, and so that an engineer can look at it and see the value and how to validate that you’ve delivered that value.

### Structure of a User Story

> As a \[type of user\], when I \[perform action\], \[expected outcome\]

At its most basic, that is it.

You are putting the emphasis on the end user and the “value” that you will deliver.

Let’s dig into the inputs:

- **Type of user**: There is no one size fits all “user”. You have “admin users”, you have “logged-in users”, you have “users with permission X” or “users in role Y”. This is being specific about who is performing the action
- **Perform action**: What is the user doing? Clicking the “login” button? Deleting a record? Submitting a form?
- **Expected outcome**: Once your user has performed the action, what should happen? If they’ve clicked “login” with the correct email address and password, where should they be directed? If they’ve clicked “login” with an incorrect email address and password, what should happen?

### Example of User Stories

Let’s look at examples of user stories for a login page.

There’s nothing better than examples.

Let’s set the scene. You have a login page with an entry text box for an email address and an entry text box for a password. You have a submit button. That’s it.

What are the different permutations that can happen on this page from the user’s perspective?

> As a logged in user, when the page loads, I am redirected to the logged in home page

If I’m already logged in, I don’t want to have to reenter my details, just redirect me to the logged-in home page.

> As a non logged in user, when I enter the correct email address but incorrect password and click Login, an error message appears

I’m a user who’s not already logged in, and I entered the incorrect details. I should not be logged in.

> As a non logged in user, when I enter an incorrect email address and password and click login, an error message appears.

Again. I’m not a logged-in user. I’ve entered incorrect details, I should not be logged in.

> As a non logged in user, when I enter the correct email address and password and click login, I am rediected to the logged in home page.

This time, I’m not already logged in, I enter the correct details and click login. I’m logged in to the system.

Can you see how all of these are focused on the user?

You may notice that some of the “expected behaviour” in the above is not fully defined. We’ll address that later in the acceptance criteria.

![Photo by [<VPIcon icon="fas fa-globe"/>cottonbro studio](https://pexels.com/photo/manager-considering-project-strategy-by-the-task-board-6804077)](https://cdn.hashnode.com/res/hashnode/image/upload/v1733997173211/1946f2a3-eee3-497e-960b-a6aeac9bd48d.jpeg)

---

## How to make good User Stories

There’s a good model called the INVEST model that really simply shows how to know if your user stories are good.

**INVEST Model**:

- **I**ndependent: Can be developed separately.
- **N**egotiable: Open to discussion and change.
- **V**aluable: Delivers value to the user.
- **E**stimable: Can be estimated for effort.
- **S**mall: Fits within a sprint.
- **T**estable: Has clear acceptance criteria.

Let’s apply this INVEST model to one of the user stories examples from above:

> As a non logged in user, when I enter the correct email address and password and click login, I am rediected to the logged in home page.

*(I’m going to make some assumptions here, as this is a theoretical code base and theoretical project)*

Is this story **Independent**? I would say so, yes. It’s a small story that involves only a few components that probably already exist. If the database hasn’t been created yet though for the project, that would give us a dependency. This would no longer be independent.

Is it **Negotiable**? Well again, yes. This story could easily be changed to redirect to the users profile page rather than their home page.

This story is definitely **valuable.** Once implemented, the user can log in. If the story was:

> As a non logged in user, when I enter the correct email address and password and click login, nothing happens

This would not be valuable. The user would get nothing out of this.

Is the story **estimable**? Again, we have to take some assumptions in this made up scenario, but I would certainly hope that this would be easily estimated. It’s a concise story, involving few components, in a domain that everyone is familiar with and has clear acceptance criteria.

The story is certainly **small.** There is little ambiguity in what needs to be done, there is one user path only and clear outcomes. Let’s take a look at a story that would be too large:

> As a non logged in user, the login page should work as expected.

As discussed further up in this article, there are many ways that the login page can and should work. “Should work as expected” seems to cover all of those permutations. This would be too large to effectively size as a story, and probably too large to be completed in one sprint.

The story is definitely **Testable.** There are clear user actions to take that has a clear outcome. This user story can be covered by Unit Tests, Integration Tests, and Manual Tests.

It looks like we’ve created a good user story!

If you use the structure I’ve defined above, and the story meets the criteria of the INVEST model, it’s probably a good story.

---

## Common pitfalls in User Story creation

I’ve seen User stories go wrong in the past where people have missed a few crucial aspects to the user story:

### Focusing on the technical aspects

As my examples show above, the user story is non-technical.

There should be no reference to a service name, a database name, or validation based on anything that the user can’t see.

As soon as your story is no longer able to be understood by the end user, you’ve gone wrong.

Focus on what the user is going to do, and what the user is going to see.

Let’s look at an example of a technically focused story:

> As a non logged in user, when I click the forgotten password link with a correct email address, a record is logged in a database table stating that the password reset link has been sent.

This story can not be verified by a user and non technical users may not understand what it means.

Let’s fix it:

> As a non logged in user, when I click the forgotten password link with a correct email address, an email is sent to the email address provided with a forgotten password reset link

Non technical users can understand this and it puts the focus on the user, not the product.

### Stakeholder Collaboration

Agile is collaborative.

User stories need input from Product, BA, QA, Engineers, and most importantly, Users.

This is how you will ensure that you are delivering what the user wants. Many hands make light work.

If, for instance, just an engineering team came up with user stories, they may look something like this:

> As a logged in user, when the page loads, I am redirected to the logged in home page
> 
> As a non logged in user, when I enter the correct email address but incorrect password and click Login, an error message appears
> 
> As a non logged in user, when I enter an incorrect email address and password and click login, an error message appears.

And that’s great. But now let’s get QA involved, who are coming from a different perspective as they’ve different experiences with software:

> As a non logged in user, when I enter a correct email address in Hebrew and a correct password, I am redirected to the home page
> 
> As a non logged in user, when I enter a correct email address and password and repeatedly click login, I am redirected to the home page

Great. We’re getting a more rounded set of user stories now that cover more situations. But what happens if we get Product involved?

> As a non logged in user, when the page loads, my password manager should pre-load my username and password, when I click login, I am redirected to the home page

The Product team know the users. They know that people really use password managers. We should make sure that when the user doesn’t actually type anything (as the text is loaded by the password manager), the login still works correctly.

### Vague User Stories

The idea behind a good user story is that everyone, regardless of expertise, can understand it.

If you’ve written a User Story that. can be interpreted 10 different ways by 10 different people, you’ve gone a bit wrong.

I mentioned above that I would touch on acceptance criteria, and now is the time to do that.

Let’s re-examine the following User Story:

> As a non logged in user, when I enter an incorrect email address and password and click login, an error message appears.

There’s vagueness in there.

What message should appear? When the page reloads after an invalid login attempt, should the username text box be set back to empty, or prepopulated with the previously entered value? What does “incorrect email address” mean? An email address that has never been seen before, or an email address that is not valid at the moment (not paid the subscription, canceled subscription etc.)

So as you can see, details matter.

This User Story is a fairly contrived simple example and I’ve managed to find a lot of questions about it.

Let’s fix the problem:

> As a non logged in user, when I enter an email address that it not registered with the system, when I click login, an error message appears

That removed the questions around the user action but has not resolved the issue about the expected error message.

Enter the acceptance criteria.

Within the user story, you need to have a set of acceptance criteria that defines if the implementation of the user story is as expected.

Things like:

- Error message: “Invalid email address or password”
- Email Address and Password text box reset to empty on reload
- User unable to access pages where login is required
- User is presented with a “forgotten password” suggested.

Acceptance criteria states what is expected from the implementation.

---

## How to Begin with User Stories

Start small.

You will not be perfect at refining and creating user stories to start with.

Creating user stories is as much an art as a science. Practice makes perfect.

The creation of User Stories should be done as a group. Often, this is done with the “3 Amigoes” approach, where you will have an engineer, a product person and a QA all sit together and brain storm different permutations that you need to support.

Once you have delivered your project, retrospect. Take a look back and see what gaps you have in your user stories. There will be bugs that the users find, that QA and UAT find, and these are either due to gaps in your user stories or gaps in your testing. Either way, you should learn from them for next time.

---

## Conclusion

Agile is collaborative. Scrum is collaborative. Creating User Stories is collaborative. Remember that.

The more people from different areas of expertise you have brainstorming user story creation, the more likely you are to cover the full set of workflows.

The user is the focus. If you are ever including terminology that your user doesn’t understand, rethink the user story.

You won’t be perfect at this from the start, but as you do more and more, the quicker and more effective you become. Take this from someone who has been doing this for over 10 years. The difference in speed and quality of my User Story creation today vs 10 years ago is a world apart.

Check out my blog posts on my website, [<VPIcon icon="fas fa-globe"/>Just Another Tech Lead](https://justanothertechlead.com), or sign up to my weekly email news letter [<VPIcon icon="fas fa-globe"/>here](https://just-another-tech-lead.kit.com/ca91094ee6).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Write User Stories for Beginners: Agile in Practice",
  "desc": "In this tutorial, you’ll learn about an important part of the Agile approach to software development: user stories. I’ll take you through what user stories are, common pitfalls that I’ve seen with creating user stories, and the frameworks that exist ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-write-user-stories-for-beginners.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
