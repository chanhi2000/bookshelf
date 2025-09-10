---
lang: ko-KR
title: What Is Continuous Integration and Why Do You Need It?
description: Article(s) > What Is Continuous Integration and Why Do You Need It?
icon: fas fa-pen-ruler
category: 
  - Design
  - System
  - Article(s)
tag: 
  - blog
  - code-maze.com
  - design
  - system
head:  
  - - meta:
    - property: og:title
      content: Article(s) > What Is Continuous Integration and Why Do You Need It?
    - property: og:description
      content: What Is Continuous Integration and Why Do You Need It?
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/what-is-continuous-integration.html
prev: /academics/system-design/articles/README.md
date: 2016-02-04
isOriginal: false
author:
  - name: Vladimir Pecanac
    url : https://code-maze.com/author/codemaze_blog/
cover: /assets/image/code-maze.com/what-is-continuous-integration/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What Is Continuous Integration and Why Do You Need It?"
  desc="While not every project is destined to be a great success, Continuous Integration can drastically improve the success rate of any project."
  url="https://code-maze.com/what-is-continuous-integration"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/code-maze.com/what-is-continuous-integration/banner.png"/>

While not every project is destined to achieve great success, there are software methodologies and practices that can dramatically increase the chance of success of a project and make the development a more pleasurable experience. One of such practices is **Continuous Integration.** 

It was originally adopted as the extreme programming practice and its main purpose is to prevent integration problems and to avoid **“integration hell”**.

So let’s learn what Continuous Integration is and how it can help you become a better software developer.

This knowledge will make you more proficient than most people that blindly walk into the CI world. After you’ve learned about what is Continuous Integration here head to the [**top Continuous Integration tools**](/code-maze.com/top-8-continuous-integration-tools.md) to choose the one that fits you best.

If you are more into mobile app development, you can also check the Top Mobile Continuous Integration Tools list.

---

## What Is Continuous Integration?

Continuous Integration is the practice of continuously integrating the changes made to the project and testing them accordingly at least on a daily basis or more frequently.

::: info Martin Fowler put it nicely

> Continuous Integration is a software development practice where members of a team integrate their work frequently, usually each person integrates at least daily - leading to multiple integrations per day. Each integration is verified by an automated build (including test) to detect integration errors as quickly as possible. Many teams find that this approach leads to significantly reduced integration problems and allows a team to develop cohesive software more rapidly.  
> Martin Fowler

:::

Automating your build, test, and deploy processes can alleviate much of the headaches and problems commonly happening on projects. Having a reliable method of integrating changes more frequently ensures that errors can be found sooner than later. Having a blocking issue that appeared right on the demo day as the result of some part of the code you implemented a few months earlier and haven’t had a proper chance to test against other parts of your system is not a pleasant event at all.

We can all agree that having a blocking issue that appeared right in the demo is not a pleasant experience. CI can help with that. A lot.

![Here is how the basic CI lifecycle looks like.](/assets/image/code-maze.com/what-is-continuous-integration/ci-cycle-2.png)

---

## Benefits of Using Continuous Integration

Using the CI is beneficial for many reasons.

### Reduced integration risk

More often than not, working on projects means multiple people are working on separate tasks or parts of the code. The more people, the riskier the integration. Depending on how bad the problem really is, debugging and solving the issue can be really painful and can potentially mean a lot of changes to the code. Integrating on a daily basis or even more frequently can help reduce these kinds of problems to a minimum.

### Higher code quality

Not having to worry about the problems, and focusing more on the functionality of the code results in a higher quality product.

### The code in version control works

If you commit something that breaks the build, you and your team get the notice immediately and the problem is fixed before anyone else pulls the “broken” code.

### Reduced friction between team members

Having an impartial system in place reduces the frequency of quarrels between team members.

### The quality of life improvement for testers

Having different versions and builds of the code can help isolate and trace bugs efficiently, and it makes life easier for the QA team.

### Less time deploying

Deploying projects can be very tedious and time-consuming, and automating that process makes perfect sense.

### Increased confidence and morale

People that don’t work for fear of breaking something, are more likely to produce better results and can focus their energy and concentration on producing instead of worrying about the potential consequences of their actions.

One side effect of all these benefits is that new team members will have a much easier time getting into the project. Having a clear vision of the building process can greatly speed up adaptation of the newest dev on the team.

---

## Requirements

But you might be wondering what are the requirements for the installing of the CI system for your needs. If you want to install CI server in your own environment, you’ll need a few things first.

The first requirement is having the **version control system (VCS)**. There is no way around it and there shouldn’t be a way around it. VCS provides a reliable method to centralize and preserve changes made to your project over time.

If you are using onsite solutions another requirement is to have a spare server or workstation or at the very least a virtual machine. Having a clean machine to build your system on is of essential importance.

If you don’t want to mess with either servers or virtual machines, there are many hosted CI tool solutions that abstract the maintenance of the whole process and offer easier scalability. The disadvantages of the hosted systems are usually the lack of configuration options that self-hosted tools offer.

If you opt-in for the self-hosted variant, you will need to install one of the many available continuous integration tools.

Technically, the CI tool is not required per se, like the IDE is not required for software development but it would be significantly harder to implement Continuous Integration without the help of one.

The most widely known and used CI tools include Jenkins, TeamCity, Bamboo, Go… Read more about the [**top CI tools available**](/code-maze.com/top-8-continuous-integration-tools.md).

---

## Continuous Integration Servers

Continuous integration server (aka build server, aka CI server) is a software tool that centralizes all your CI operations and provides a reliable and stable environment for you to build your projects on. CI servers are highly configurable and adjustable to be able to build a variety of projects for different platforms. Running builds and tests are the basic features of every build server.

The most important thing to consider when using a CI server is to have a clean machine prepared for its installation. Having a neutral environment, untainted by unnecessary tools, environment variables, and other configurations, is crucial for the successful usage of the CI server and CI overall. If it’s not possible to install the CI server **physical machine**, you can set up a **virtual environment** and use it as the last resort.

Using development machines without setting up virtual environments will probably leave you with false assumptions and results. Once you deploy the application to another machine, you could potentially run into new problems.

Typically CI server uses a version control system like Subversion or Git or any other to pull your project files. It monitors your project’s repository and on the successful commit, it pulls the changes and performs the tasks you defined previously for that project. Upon completion of the tasks, CI server sends feedback to the relevant project members with the details of the build. **Checking out the latest version of your project, running the build scripts, running the tests, and sending notifications** are the most basic functionalities of the CI servers.

Besides these, features like code analysis, code coverage, code quality reports, agent pooling, pipelines, build comparisons, IDE integration, third-party tools support and many others make the CI servers very flexible and comfortable to use.

---

## Everyone is responsible

Even more important than hardware or software requirements is the ability of the team to take the responsible approach to the implementation of the CI. In order to use CI effectively, developers must change their day-to-day software development habits. These habits are good software development practices that you should apply even without a continuous integration system in place.

There are six practices that help individuals and teams running CI on a project:

- **Commit code frequently**
- **Don’t commit broken code**
- **Write unit tests**
- **Fix broken builds immediately**
- **All tests must pass**
- **Avoid breaking code**

That means you should not be checking in the latest changes just before lunchtime or just before you head home. You should wait for the build report to be sure the build is successful, and if it is not you should be the one fixing it.

On the other hand, you should always be on the lookout for broken builds, even if it wasn’t your fault because checking out the broken build or checking in over it can prolong the fixing process.

---

## Continuous Delivery and Continuous Deployment

Typical CI lifecycle consists of building the project, unit testing, deploying to the stage, and acceptance testing. Once the project successfully passes all of these stages, it is ready for deployment to the production environment.

Delivering a project to the production environment can be done automatically like the rest of the stages. But due to business concerns, it might be more suitable to do it manually. In the first case, we are talking about Continuous Delivery, and in the second Continuous Deployment.

![The graph above shows the differences between these three terms.](/assets/image/code-maze.com/what-is-continuous-integration/ci-4-1024x584.png)

---

## Potential pitfalls

There are some concerns that might discourage people from using the CI on their projects.

### 1. Increased project maintenance overhead

You already need to build, test and deploy your systems. If you don’t manage those processes with the CI, you **will** be managed by those processes. Once the project gets to a certain complexity, it becomes incredibly hard to manage.

### 2. Too much change

People might be unwilling to make so many changes to implement the CI on their legacy system. If that is the case, you can easily introduce CI to the system one part at a time. Once the team members are comfortable with the results, CI can be introduced to the other parts as well.

### 3. Hardware/Software costs

Costs of implementing a CI could be perceived as unnecessary by both developers and management on a project. But these costs are marginal compared to the costs of the maintenance and finding the problems later down the line.

### 4. Developers are already doing all these operations

Certainly, but they could be investing more time in building the functionality and solving business problems. Machines excel in doing repetitive tasks reliably.

### 5. Project is too small

Even the smallest projects can benefit from CI. Especially with the plethora of online Continuous Integration tools that are very easy to set up.

Even the smallest project can benefit from transparency of the development process and centralization of project resources and builds.

---

## Conclusion

Agile practices and Continuous Integration go hand in hand. You can’t consider your work or business serious without using CI anymore.

Infrequent software releases are a thing of the past and most of the leading and successful companies are already actively using these techniques with good results, Amazon being one of the leaders by [<VPIcon icon="fa-brands fa-youtube"/>making changes to production every 11.6 seconds](https://youtu.be/dxk8b9rSKOo?t=9m59s) (May 2011).

<VidStack src="youtube/dxk8b9rSKOo" />

Setting up the continuous integration system for your project could be a potentially costly and time-consuming task. But technical debt caused by not using CI can be multiple times bigger.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Is Continuous Integration and Why Do You Need It?",
  "desc": "While not every project is destined to be a great success, Continuous Integration can drastically improve the success rate of any project.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/what-is-continuous-integration.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```
