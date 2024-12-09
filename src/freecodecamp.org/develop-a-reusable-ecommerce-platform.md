---
lang: en-US
title: "How to Develop a Reusable eCommerce Platform"
description: "Article(s) > How to Develop a Reusable eCommerce Platform"
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
      content: "Article(s) > How to Develop a Reusable eCommerce Platform"
    - property: og:description
      content: "How to Develop a Reusable eCommerce Platform"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/develop-a-reusable-ecommerce-platform.html
prev: /academics/system-design/articles/README.md
date: 2020-12-31
isOriginal: false
author: Ramón Morcillo
cover: https://www.freecodecamp.org/news/content/images/2020/12/plants.jpg
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
  name="How to Develop a Reusable eCommerce Platform"
  desc="By Ramón Morcillo This is a story about my team’s hard work developing not a single eCommerce platform, but a reusable one for different owners. We kept the same codebase, look, and feel, and made it highly customizable.  I will conclude with what we..."
  url="https://freecodecamp.org/news/develop-a-reusable-ecommerce-platform"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://www.freecodecamp.org/news/content/images/2020/12/plants.jpg"/>

This is a story about my team’s hard work developing not a single eCommerce platform, but a reusable one for different owners. We kept the same codebase, look, and feel, and made it highly customizable.

I will conclude with what we learned from the process. I think our takeaways will be a useful learning resource for other software developers out there (and for ourselves in future projects, as well).

I will try to focus on the relevant parts as much as possible to make it easier to understand. Having said this, a bit of background is needed to go through this article.

---

## Context of the project

The client we were developing the platform for was an eLearning company which was composed of 3 main sub-companies.

For the past few years, the sub-companies had been operating mostly independently. But now they were trying to create a standardized way of doing things, so they could grow together in the best way.

The project was an ambitious one. Creating an ecommerce platform that would work for all the sub-companies wasn’t easy to design or to implement. There were a large number of unsolved questions they had, which made it very hard to estimate.

![](https://freecodecamp.org/news/content/images/2020/12/doubts-2.gif)

---

## The first MVP

To tackle this difficult challenge, we started from the bottom with one of the 3 sub-companies – let’s call it sub-company H. In fact, it wasn’t one of the main sub-companies, it was a sub-company from a sub-company.

To explain it better, if we name the 3 main sub-companies L, N, and P, then H was a sub-company of N.

Being a sub-sub-company didn’t mean the platform would be simpler to develop. It was quite the opposite, actually, given all the features proposed for the MVP.

![Main company structure](https://freecodecamp.org/news/content/images/2020/12/main_company_structure-1.jpg)

While the main goal was for a user to be able to purchase a product (seems quite obvious), there were too many dependencies with other services to accomplish this seemingly simple MVP.

Part of the product and order information came from another team’s domain, the Integrations team (I will call it team *In*). They communicated with [Swell](https://swell.is/) and Klopotek, an ecommerce system where we stored the product's information along with the order’s status.

The discounts were also provided by team *In’s*, to which we had to subscribe and then calculate the final product price according to the user info and privileges before displaying it.

To make product content like images or descriptions accessible and customizable for the client we retrieved it through [Contentful](https://contentful.com/), a content platform where clients were able to manage it in an easy way.

We managed the payment with [Stripe](https://stripe.com/), a payments service, and then we communicated with team *In* to update the order status on Swell.

The service available for the user to authenticate should be agnostic to the owner and reusable on all sub-companies. It had to be provided by another team, yet in the end, we actually developed it ourselves.

And to put the icing on the cake, we also had to implement the user tracking with [Segment](https://segment.com/), a popular service to collect user events from web and mobile apps.

Here is a simple diagram of what I have been describing which might make it easier to understand. I have grouped the microservices architecture in just *Backend* and *Frontend* to keep it simple.

![MVP Architecture overview](https://freecodecamp.org/news/content/images/2020/12/mvp_architecture_overview-1.jpg)

---

## Why We Chose GraphQL

To accomplish our goals for the project, we had to *provide the frontend with a unique source of truth* of the product’s core information from the backend.

Therefore the only thing that we aimed to have different from one store’s frontend to another would be the designs and the content from Contentful.

Regarding these designs and their implementations on React, we planned to use a shared-components-library.

Therefore, what is GraphQL doing here and why did we decide to go for it?

Well, in case you don’t know how GraphQL works, essentially it lets you define a Schema with all the properties and queries that could be made to your product. Then it lets you serve it to the frontend to let it decide what to request without the backend having to create an endpoint for each of those requests (like in REST services).

To learn more about it, check out this tutorial [I wrote to explain it](https://ramonmorcillo.com/getting-started-with-graphql-and-nodejs/). It teaches you how to use it with Node.js. Also, [their docs](https://graphql.org/learn/) are worth checking out.

This meant that each of the shops would request the data they needed from the product just by looking at the Schema, the source of truth.

Thanks to this fact we would not have to implement different sources of data in the backend for each shop. This gave the frontend the power and responsibility (the first involves the second 🕷) to request the product data needed to display at each interface.

> With great power comes great responsibility. — Stan Lee

Just to be clear, if we had decided to go with REST we would have needed to create different endpoints for each of the shops. Or we would have had to make the frontend retrieve all the product data in each shop and then decide which properties to display. This means it would've had to store unnecessary data in the frontend that would only add noise.

Or even worse, we would have had all the shops’ backend services deployed for each one of the frontend shops. This would've used unnecessary resources and increased the cost considerably.

Here is why we took this initial approach. The worst part, in my opinion, would've been the waste of time from maintaining and hardly refactoring all the mess that we would have created.

Furthermore, by making a single request on-demand, the payload was lighter, and therefore, the performance over the network was improved.

Anyway, as with every problem, there were other approaches we could've taken on the way to developing this project and its architecture. But at that moment this one seemed to us the best one.

---

## Architecture and Tech Stack

The microservices architecture mainly consisted of Node.js services hosted on Azure K8s clusters. Depending on their needs and the data they worked with, they did or didn't have a MongoDB, PostgreSQL, or Redis database associated.

The asynchronous communication between them was handled mainly with [Azure Service Bus](https://azure.microsoft.com/en-us/services/service-bus/) topics and subscriptions through a publish/subscribe messaging communication model.

The main difference with common messaging queues is that you can have more than one receiver, so you do not have multiple queues to receive messages in more than one service.

![Azure Service Bus messaging Queues.<br/>[Source](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview#queues)](https://freecodecamp.org/news/content/images/2020/12/azure_service_bus_messaging_queues-1.png)

![Azure Service Bus messaging Topics.<br/>[Source](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview#topics)](https://freecodecamp.org/news/content/images/2020/12/azure_service_bus_messaging_topics-1.png)

On the frontend part, the sites were developed with React. Sometimes we used [Next (<FontIcon icon="iconfont icon-github"/>`vercel/next.js`)](https://github.com/vercel/next.js/), and other ones we built from scratch with [Create React App (<FontIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app), depending on the complexity and the requirements of each.

We moved from Redux, used in previous projects, to the official [<FontIcon icon="fa-brands fa-react"/>Context API](https://reactjs.org/docs/context.html) to manage most of the state.

Here are the main services and their functionalities for the first MVP architecture:

- **shop-web-app:** The client shop application.
- **gateway-api-service:** Proxy service to receive requests from the client and redirect them to the corresponding services.
- **cms-api-service:** Service to retrieve and serve the content from Contentful
- **catalog-api-service:** Service that subscribes to team In messages and persists the product core data to serve it later through GraphQL.
- **orders-api-service.** Service that handles all the payment business logic
- **auth-api-service:** Provisional service to implement the user authentication to be able to buy products.
- **auth-web-app:** The client for the auth service.
- **integrations-ecommerce-api-service:** service from the integrations domain that handles the payments. Although this service was not in our domain we developed it together to increase the delivery speed and free them from extra work.

![First MVP architecture](https://freecodecamp.org/news/content/images/2020/12/first_mvp_arquitecture-1.jpg)

To deploy and update the resources needed on Azure we used [Terraform](https://terraform.io/), which let us define infrastructure as code and manage their life cycles on the K8s clusters. We also worked with Azure DevOps as our CI & CD system.

On the services, we used [<FontIcon icon="iconfont icon-github"/>`guidesmiths/systemic`](https://github.com/guidesmiths/systemic), a Node.js framework for minimal dependency injection that lets you create components and their dependencies in a system. Each component handles a separate object from the domain such as the routing, controller, services, database, and so on in an agnostic way from the others.

[Apollo](https://apollographql.com/) was our choice to implement GraphQL. It provided us with a data graph layer to easily connect both frontend and backend.

Again, to learn more about it check out [their docs](https://apollographql.com/docs/) or [this tutorial.](https://ramonmorcillo.com/getting-started-with-graphql-and-nodejs/)

Finally, we hosted the code on [GitHub](https://github.com/) to make use of features like Pull Requests to review our code properly before implementing it.

---

## The second MVP

An MVP (Minimum Viable Product) is the first prototype you create and deliver in a project. This means that there is usually just one, and when you create it you start implementing new features on it.

So, why did we focus on a second MVP for the same project? Well, when we reached a “stable” version of the first one, the client realized that we needed to start with the main sub-company stores. They decided to stop the sub-sub-company H store development to focus on the development of the new ones.

This was mainly because to some services ended their support for the sub-companies in the coming months, meaning that their stores had to be developed first.

![Graphical representation of how we felt with the second MVP](https://freecodecamp.org/news/content/images/2020/12/how_we_felt_with_second_mvp-1.jpg)

Although we tried to make a proper estimation for the first MVP, we surpassed its deadline since some unplanned issues appeared along the way. Thus, when we were told that the new deadline would be even sooner, we decided to take a different approach to reach it on time.

We decided to develop more than one store at the same time, which was a double-edged sword approach.

On one hand, we would see on the go how well the reusability aspect of our platform worked while refactoring it. We would also end up with more than one store in the end.

On the other hand, we would have to set up and maintain the environments and resources of multiple shops. Plus we would have to implement their designs which would slow us down, meaning we might not reach the deadline on time, again.

We saw this MVP as an opportunity to start over and improve our codebase. So we added TypesScript and Styled-Components to our React application.

I have to admit that I was very happy when we made these choices because I had been working with that stack on [my own projects](https://github.com/reymon359?tab=repositories&q=&type=source&language=typescript). So now I was able to learn more and get even better at it.

Fortunateluy, we were able to reuse most of the code from the previous MVP for the React apps and the backend services. But not everything was a bed of roses.

Not all of us were used to working with this new stack and it slowed us down at the beginning. Furthermore, with the same stack, we started developing a React components library for all the platforms, which, even though it was planned for the first MVP, never saw the light.

By that time, the team in charge of the user authentication service started working on it so we stopped its development and just implemented it on the site.

In addition, we started the development of a products search service (**search-api-service**) with [Azure Cognitive Search](https://azure.microsoft.com/en-us/services/search/).

After all the changes mentioned above the architecture evolved this way.

![Second MVP architecture](https://freecodecamp.org/news/content/images/2020/12/second_mvp_arquitecture.jpg)

---

## Conclusion and lessons learned

As I am writing this, the platform isn’t finished yet. But it has been a great challenge to get where we are.

We have learned some valuable lessons that can be useful to others, not just about the stack and architecture described above but about the way we worked as a team.

### Innovate the stack

Working with new technologies can be risky and less comfortable than sticking with old and well-known ones. But innovation and adaptability is the right way to go so you don't get left behind in Software Development.

One of the most important points when you upgrade your stack or adopt a new one, apart from checking the proper way to do so following standards, is *being sure the team is comfortable working with it,*. Not just at the beginning, either, but during the whole process to make the transition easier.

### Don’t underestimate, promise less, deliver more

We happily estimated the first MVP and agreed to deliver a great number of features. We ended up needing more time because of all the issues that appeared on the way and had to learn to say “no” *sometimes.*

On the second MVP, we didn’t estimate that far ahead in time and didn’t commit ourselves to features we weren’t sure we could deliver within the time expected.

Because of this, we were able to work less stressed, have a better mood, deliver better code, and improve the client's feelings about the project since they weren’t disappointed with the progress.

### Teamwork inside the team.

We realized that the best way to progress and develop was to feel comfortable – not just with the technologies but, most importantly, our teammates. Some of the measures that improved our relationship and teamwork were:

#### Team democracy.

No matter the work we were doing at the moment, *all of us had the same voice and our opinion counted the same* when making a choice. This was key when we discussed the adoption of the new stack and the practices we would follow.

#### Reviewing code.

Feedback is one of the best ways to improve not only the code itself but the way you write it too. That's why we decided to work with GitHub Pull Requests to implement most of the features.

> Working with them not only improved our code base but also made us aware of how the features were being implemented in other areas, avoiding catchup meetings and helping us keep track of the full project scope.

We refined this system little by little with features like a [minimum number of reviewers to merge them](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/about-required-reviews-for-pull-requests) or [subscribing to them through slack. (<FontIcon icon="iconfont icon-github"/>`integrations/slack`)](https://github.com/integrations/slack)

#### Helping and asking for help.

In my opinion, this one is a must. *The team must lose the fear of asking for help if they get stuck. At the same time, they must be willing to help others when they ask for it.*

I am happy to say that we were able to reach this balance and our work improved in many ways. The next point, pairing, was key in losing the fear of asking for help and getting to know each other better.

#### Pairing as much as possible.

At this point in software development, the advantages of doing pair programming are quite well known. We paired not just to deliver the features in a faster and better way of doing things, but to learn from each other's way of coding.

Each week, we decided the pairing tasks and teammates to implement them. But if someone needed or wanted to pair, we just asked for it and moments after a teammate offered to help.

#### Paying attention to feedback.

The sprint retrospectives were the perfect moment to review all the things that went well, those that went wrong, to propose changes, and to look forward to improvement. Therefore the more we shared our opinions the more issues we could approach and solve.

![](https://freecodecamp.org/news/content/images/2020/12/teamwork_makes_the_dream_work.gif)

#### Teamwork with other partners.

We were dependent on other teams' work – so having a good relationship with them was also an important point in our development process.

*Communication was the key point: the more we communicated the more we improved,*. And thanks to this, our goal was to be one whole team. Here are some actions we followed in order to enhance this communication:

- **Have a private place just for us.** We created a separate channel to talk about the progress and solve any questions or doubts as soon as possible without extra meetings.
- **Quick meetings.** A meeting once a week worked great to check the progress on the main issues. But we did not always wait for this one meeting, and had a quick call whenever an issue needed to be discussed.
- **Stay updated on the overall progress.** We had a teammate from our team attending their daily standups and one of them at ours who updated the rest of the team if needed.

Here is some actual footage of us and the Integrations Team:

![](https://freecodecamp.org/news/content/images/2020/12/source--1-.gif)

#### Make the client feel like part of the team.

At the beginning of the first MVP, there were too many clues and too little communication to clarify them so we were blocked sometimes or had to set up time-wasting meetings for these issues.

The core of the problem, like most problems in life, was a lack of communication. So we solved it by increasing our communication, asking questions directly to the client, inviting them to retrospectives, daily standups, and other meetings even when they were not required.

This helped keep the client updated as much as possible. In the end, the more we communicated the more we made them feel part of the team, and the better we worked together.

---

## Final thoughts

I want to first thank my teammates. It has been a pleasure to work with them, starting each day eager to have fun together developing the project.

On the same level, thank you to the teammates from other teams who always gave a helping hand when requested.

I'm also thankful for the opportunity to participate in the full end-to-end implementation of the project from which I learned so much. I solved issues on Front, Back, and DevOps such as setting up environments, pipelines, messaging between services, persisting and retrieving data, serving it to the frontend, and implementing the interfaces to display it.

Finally, I am thankful for having the chance to work and get better at technologies that I was using on side-projects like GraphQL or TypeScript.

I hope you enjoyed this article. You can read [it too on my site](https://ramonmorcillo.com/developing-a-reusable-ecommerce-platform/) along with others! If you've got any questions, suggestions, or feedback in general, don't hesitate to reach out on any of the social networks from [my site](https://ramonmorcillo.com/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Develop a Reusable eCommerce Platform",
  "desc": "By Ramón Morcillo This is a story about my team’s hard work developing not a single eCommerce platform, but a reusable one for different owners. We kept the same codebase, look, and feel, and made it highly customizable.  I will conclude with what we...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/develop-a-reusable-ecommerce-platform.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
