---
lang: en-US
title: "How to Write Code That's Easy to Read – Tips for Developers"
description: "Article(s) > How to Write Code That's Easy to Read – Tips for Developers"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Write Code That's Easy to Read – Tips for Developers"
    - property: og:description
      content: "How to Write Code That's Easy to Read – Tips for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-write-code-thats-easy-to-read.html
prev: /programming/js/articles/README.md
date: 2024-12-05
isOriginal: false
author: Orim Dominic Adah
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1733334801650/9c73c253-246a-4678-8d65-6679ff7f35f2.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Write Code That's Easy to Read – Tips for Developers"
  desc="Programs are meant to be read by humans and only incidentally for computers to execute. - Donald Knuth Have you ever heard that programmers spend more time reading code than writing it? Well, I’ve found that this is often true: as a developer, you’l..."
  url="https://freecodecamp.org/news/how-to-write-code-thats-easy-to-read"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1733334801650/9c73c253-246a-4678-8d65-6679ff7f35f2.png"/>

> Programs are meant to be read by humans and only incidentally for computers to execute. - Donald Knuth

Have you ever heard that programmers spend more time reading code than writing it? Well, I’ve found that this is often true: as a developer, you’ll often spend more time reading and thinking about code than actually writing code.

This means that, however optimally you intend to make your code run, it’s also important that it’s delightful and easy to read.

In this article, we’ll look at an example function: `createOrUpdateUserOnLogin`. It lives in a JavaScript codebase far away and it’s begging to be made delightful to read. We will look at `createOrUpdateUserOnLogin`, highlight what makes it hard to read and why, and eventually refactor it to make it easier to read and understand.

The function is written in JavaScript and uses [<FontIcon icon="fas fa-globe"/>JSDoc](https://jsdoc.app/) to document its parameters. Knowledge of JavaScript is not necessarily important because the logic in the function will be explained in detail. JSDoc is only used to document what the function’s parameters represent.

---

## The Problematic Function

This function is not made-up. It is a real function in the codebase of an application with more than a thousand users. Here it is:

```js :collapsed-lines
/**
 * @param {Object} dto
 * @param {string} dto.email
 * @param {string} dto.firstName
 * @param {string} dto.lastName
 * @param {string} [dto.photoUrl]
 * @param {'apple' | 'google'} [dto.loginProvider]
 * @param {string} [dto.appleId]
 * @returns {string} token - access token
 */
async function createOrUpdateUserOnLogin(dto) {
  let user;

  if (dto.loginProvider == "apple") {
    user = await findOneByAppleId(dto.appleId);
    if (user?.isDisabled) {
      throw new Error("Unable to login");
    }

    if (user && !user.verified) {
      user = await setUserAsVerified(user.email);
    }

    if (!user) {
      user = await findOneByEmail(dto.email);

      if (user && dto.appleId) {
        user = await updateUserAppleId(user, dto.appleId);
      }

      if (user && !user.verified) {
        user = await setUserAsVerified(user.email);
      }
    }
  } else {
    user = await findOneByEmail(dto.email);
    if (user?.isDisabled) {
      throw new Error("Unable to login");
    }

    if (user && !user.photoUrl && dto.photoUrl) {
      user.photoUrl = dto.photoUrl;
      user = await updateUserDetails(user._id, user);
    }

    if (user && !user.verified) {
      user = await setUserAsVerified(user.email);
    }
  }

  if (!user) {
    user = await this.usersService.create(loginProviderDto);
  }

  return await this.createToken(user);
}
```

Perhaps you can tell by reading through and studying the code that it is quite hard to follow. If you leave your computer for a break right after reading this function, there is a good chance you won’t remember what exactly it does when you get back.

But this isn’t, and shouldn’t be, the case when you read a good story, regardless of its length. You can follow it easily and remember the basic details after hearing it.

The function is executed when a user attempts to sign in or sign up. Users can be authenticated using their Google account or their Apple account and the function has to return an access token on a successful attempt.

Some users have disabled their account. Those users are not allowed to authenticate successfully. The logic of the function also includes operations for updating the data of already-registered users based on some conditions.

The function does one of two things:

1. It creates an authentication token for an existing account and returns it after updating the account details or,
2. It creates an account if none exists and returns an authentication token.

This violates the Single Responsibility Principle – but fixing that is a challenge for another article.

The goal here is to refactor this function so that it reads so well that even a non-programmer can read it and understand what it does. Even better, we also want them to be able to remember it after they’ve been away from it for a while.

The function is well-tested, so there are no worries about breaking any functionality while refactoring. Tests will report any breaking changes.

### What Makes This Code Hard to Read?

A number of factors make this code harder to read. Here are the main ones:

1. **Deep nesting** (`if` statements within `if` statements) makes it hard to keep track of the changes that occur through the execution of the code. In the case of `createOrUpdateUserOnLogin`, it is nested conditionals. Other cases can include logic like an `if` statement inside a `while` loop which is nested inside another `if` statement. <br/>Deep nesting increases the complexity of reading and understanding code. Its flow isn’t pleasant to the eyes and it makes writing tests more complicated because you have to cater for the operations inside the nested code blocks.
2. **Complex conditionals** like `user && !user.photoUrl && dto.photoUrl` hold a lot of logic which has to be kept in your short-term memory and remembered as you read on.
3. **Haphazard flow** which makes it hard for you to tell at a glance what the function is doing. The function seems to be doing a lot, but it really is not. Two operations are repeated: preventing disabled users from logging in (twice) and updating users’ verification status (three times). Finding a user by email is also repeated twice.

---

## How to Refactor the Code for Easier, More Delightful Reading

After examining the function for issues that make it difficult to read, here are a couple of changes you’ll want to implement:

**Handle failure cases first**: Consider failure cases first and get them out of the story so that the function can focus on the success cases for a smooth narration of the logic of the code.

This involves the use of `return` statements or throwing errors early in the function for operations that prevent the goal of the function from being achieved.

**Rearrange the flow**: If it’s possible that some operations can occur before others and it will make the flow of the code memorable and enjoyable to read, while still achieving the purpose of the function, then you should rearrange it accordingly.

**Use everyday grammar**: This involves updating identifiers and compressing complex conditionals into memorable identifier names. Everyday grammar is easy to read because it is familiar and relatable.

**Avoid nested code blocks**: When debugging code mentally or trying to understand it, changes in the value of identifiers in nested code blocks are hard to keep track of. This is because with each nested conditional, there is at least a 2x increase in the number of paths that the logic execution can take to update the value of one identifier – and that gets worse if there is more than one identifier that is updated.

This means that your mind has to keep track of those paths which can escalate quickly into a mental memory overload, potentially resulting in mental grief and bugs when updating the code.

The visual effect of nested code is also not pleasant to the eyes and it makes writing tests more complex than it should be.

After refactoring the code using the guidelines above, we have the following snippet (I’ve numbered different parts of the code for reference in the explanations below):

```js
async function updateUserOnLogin(dto) {
  let user = await findUserByEmail(dto.email); // 1
  if (!user) {
    user = await createUser(dto);
  }

  if (user.isDisabled) { // 2a
    throw new Error("Unable to login"); // 2b
  }

  const userIsNotVerified = Boolean(user.isVerified) == false // 3a
  if (userIsNotVerified) { // 3b
    await setUserAsVerified(user.email);
  }

  const shouldUpdateAppleId = dto.loginProvider == "apple" && dto.appleId // 4a
  if (shouldUpdateAppleId) { // 4b
    await setUserAppleId(user.email, dto.appleId);
  }

  const shouldUpdatePhotoUrl = !user.photoUrl && dto.photoUrl // 5a
  if (shouldUpdatePhotoUrl) { // 5b
    await updateUserDetails(user._id, { photoUrl: dto.photoUrl });
  }

  return await this.createToken(user);
}
```

Alright, now let’s see what exactly we’ve done here to make the code more enjoyable to read.

### 1. Rearranging the Flow

Judging by the JSDoc comment above the function, `email` is a required argument field. Existing accounts have an email address irrespective of their login provider. We can fetch an account by `email` first and decide to create a new one if none exists (code section 1). By doing this, failure cases are handled early.

Choosing to throw an error if the account is disabled at the beginning (section 2b) is also an attempt to handle failure cases early. This does not affect new accounts because new accounts are not disabled by default.

Handling failure cases early helps us understand the code easier because we’re free to consider only what is going to happen without keeping track of error cases from before (like remembering if the `user` object has a value or not (section 5)) as we read on.

The refactored code has also eliminated nested conditionals and still works as expected.

### 2. Using Everyday Grammar

In trying to make the code read like everyday grammar, we’ve used clear and relatable variable names (see sections 2a, 3, 4, 5). Written this way, even non-programmers like product managers can read the code and understand what is happening.

Everyday grammar reads like pseudocode - “If user is not verified then set user to verified” and “If should update apple id then update appleId”.

Using everyday grammar is key to making code read like a story.

---

## Conclusion

Code that is delightful to read promotes maintainability and thus, longevity of software. Contributors can read it, understand it, and eventually update it with ease. Like reading a well-written story, reading code can be an enjoyable activity.

Image credit: [<FontIcon icon="fas fa-globe"/>Work illustrations by Storyset](https://storyset.com/work)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Write Code That's Easy to Read – Tips for Developers",
  "desc": "Programs are meant to be read by humans and only incidentally for computers to execute. - Donald Knuth Have you ever heard that programmers spend more time reading code than writing it? Well, I’ve found that this is often true: as a developer, you’l...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-write-code-thats-easy-to-read.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
