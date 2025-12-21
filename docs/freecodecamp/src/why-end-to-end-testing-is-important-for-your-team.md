---
lang: en-US
title: "Why End-to-End Testing is Important for Your Team"
description: "Article(s) > Why End-to-End Testing is Important for Your Team"
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
      content: "Article(s) > Why End-to-End Testing is Important for Your Team"
    - property: og:description
      content: "Why End-to-End Testing is Important for Your Team"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/why-end-to-end-testing-is-important-for-your-team.html
prev: /academics/coen/articles/README.md
date: 2017-12-04
isOriginal: false
author:
  - name: Phong Huynh
    url : https://freecodecamp.org
cover: https://cdn-media-1.freecodecamp.org/images/1*KMFrX776LOznXpsJSfQXVw.jpeg
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
  name="Why End-to-End Testing is Important for Your Team"
  desc="By Phong Huynh How our team implemented end to end testing in 4 easy steps At Hubba, our business needs are always evolving and the speed of development needs to catch up with it. One of the ways to keep the team moving forward without breaking every..."
  url="https://freecodecamp.org/news/why-end-to-end-testing-is-important-for-your-team-cb7eb0ec1504"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn-media-1.freecodecamp.org/images/1*KMFrX776LOznXpsJSfQXVw.jpeg"/>

## How our team implemented end to end testing in 4 easy steps

At [<VPIcon icon="fas fa-globe"/>Hubba](https://hubba.com/), our business needs are always evolving and the speed of development needs to catch up with it. One of the ways to keep the team moving forward without breaking everything is End-to-end (E2E) testing.

Having a full test suite with E2E tests allows us to move quickly. It allows developers to **push code without worrying about breaking things**. It enables **releases with extra confidence**. And, it **catches errors that are missed** during manual regression testing.

---

## What is E2E Testing?

End-to-end testing is where you test your whole application from start to finish. It involves assuring that all the integrated pieces of an application function and work together as expected.

End-to-end tests simulate real user scenarios, essentially testing how a real user would use the application.

![E2E Test ([<VPIcon icon="fa-brands fa-x-twitter"/>`Una`](https://x.com/Una/status/850451564527591424))](https://cdn-media-1.freecodecamp.org/images/l0ZO6o8ovUKrS5GgoqrXlNPFbX5dDfDWkgmj)

An example for Hubba’s case would be an E2E test case for a user sign up.

The test would involve:

- opening Hubba in a browser and searching for certain elements
- performing a set of clicks and keyboard types
- ensuring that a user is successfully created

### Why Should You Care?

At Hubba, we strongly believe in test automation. We currently write unit tests and integration tests for our code.

These tests are used to:

- specify our system
- prevent bugs and regression
- perform continuous integration

Furthermore, these tests run as frequently as possible to provide feedback and to ensure that our system remains clean.

The motivation for an additional layer of E2E tests lies in the benefits of having a fully automated test suite. These benefits include **increasing developer velocity**, as well as other benefits previously mentioned.

![Source: [Giphy](https://giphy.com/gifs/fail-technology-i5RWkVZzVScmY)](https://cdn-media-1.freecodecamp.org/images/8NtBfj6HITU093EGaYhfynsMecih3civAcEY)

E2E tests allow us to cover sections of the application that unit tests and integration tests don’t cover. This is because unit tests and integration tests only take a small piece of the application and assess that piece in isolation.

Even if these pieces work well by themselves, you don’t necessarily know if they’ll work together as a whole. Having a suite of end-to-end tests on top of unit and integration tests allows us to test our entire application.

::: info Edward Robinson <VPIcon icon="fa-brands fa-medium"/><code>medium.com/@earobinson</code>

> The faster code fails, the less bugs we find in QA, the faster our QA cycles are

:::

![[<VPIcon icon="fas fa-globe"/>Test Automation Pyramid](https://blog.kentcdodds.com/write-tests-not-too-many-mostly-integration-5e8c7fff591c)](https://cdn-media-1.freecodecamp.org/images/2hCjNrylujhop6fe8MXH7vzINh0ek6eqCRqh)

This is a testing pyramid from [<VPIcon icon="fas fa-globe"/>Kent C. Dodd’s blog](https://blog.kentcdodds.com/write-tests-not-too-many-mostly-integration-5e8c7fff591c) which is a combination of the pyramids from [<VPIcon icon="fas fa-globe"/>Martin Fowler’s blog](https://martinfowler.com/bliki/TestPyramid.html) and the [<VPIcon icon="fas fa-globe"/>Google Testing Blog](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html).

The majority of your tests are at the bottom of the pyramid. As you move up the pyramid, the number of tests gets smaller. Going up the pyramid, tests get slower and more expensive to write, run, and maintain.

We want to write a very little amount of end-to-end tests due to the fact that they are slow to run and are expected to change. This is especially important because as a startup we want to move fast.

::: info Google Testing Blog (<VPIcon icon="fa-brands fa-google"/><code>testing.googleblog.com</code>)

> Google often suggests a 70/20/10 split: 70% unit tests, 20% integration tests, and 10% end-to-end tests. The exact mix will be different for each team, but in general, it should retain that pyramid shape.

:::

### 4 Steps to Get Started

#### 1. Choose a Testing Framework

The first action we took to get started was to evaluate various E2E testing frameworks. Our evaluation does not include looking at all of a framework’s features, but more of a high-level impression. The main criteria was to pick a framework that was easy to set up and quick to get started.

We did a quick run through of the following frameworks: [<VPIcon icon="fas fa-globe"/>CasperJS](http://casperjs.org/), [<VPIcon icon="fas fa-globe"/>Protractor](http://www.protractortest.org/#/), [<VPIcon icon="fas fa-globe"/>Nightwatch](http://nightwatchjs.org/), and [<VPIcon icon="fas fa-globe"/>Testcafe](https://devexpress.github.io/testcafe/).

We made the decision to go with TestCafe because of the easy installation and launch. It is fairly new but getting popular. Most noteworthy, it is easy to set up because it doesn’t require WebDriver.

Due to the fact that WebDriver wasn’t required, there was no need to install and maintain additional products and browser plugins. Tests can be run right after npm install. This allowed us to quickly write a proof of concept/prototype that gets us up and running.

![Running a [sample test (<VPIcon icon="iconfont icon-github"/>`xpress/testcafe`)](https://github.com/DevExpress/testcafe) in Safari](https://cdn-media-1.freecodecamp.org/images/Yc5yLP91UJjzf2T1iOUzubMkcOeHY2pVrKmx)

TestCafe uses async/await and ES2017 code for the tests files. It also has an implicit auto-waits mechanism which means TestCafe automatically waits for XHR requests and page loads. So you don’t need to take care of it in your code.

- Pure Node.js - TestCafe is built on top of Node.js and doesn’t use Selenium or need plugins to run tests in real browsers. It integrates and works great with modern development tools.
- No additional setup or configuration - TestCafe is all set to run tests right after `npm install`.
- Complete test harness - With a single launch command, TestCafe starts the browsers, runs tests, gathers results and generates reports.

#### 2. Pick the Important Tests

The second step was to determine the core test cases we would write for our application.

One of our pain points revolves around QA regression testing. Our quality assurance (QA) cycle consists of manual testing that includes a regression test at the end.

These regression tests is a manual process that take a long time and can potentially miss things due to human error.

![Hubba’s Login](https://cdn-media-1.freecodecamp.org/images/-YhLeoMwxG-7CtgHnhC5OWzJvZFLZmli1Sjz)

We decided on writing test cases related to those regression tests. For Hubba, this included basic - but important functionality like user sign up/login, and creating a product.

The initial batch of test cases:

- Brand/Buyer/Influencer sign up
- Login
- Create a product

#### 3. Integrate into a CI/CD Pipeline

The next step was to integrate this into a Continuous Integration and Continuous Deployment, or CI/CD pipeline. The goal of adding E2E tests to our pipeline is to catch any errors or failing tests before code is shipped to production.

We thought of two different ways of integrating this into our system.

1. Running the tests every time new code gets pushed to the project.
2. Running the tests periodically.

![Jenkins](https://cdn-media-1.freecodecamp.org/images/DmqtpLXgDmGyHRuZv0v1qe8sul4Mntg-OrPc)

We decided on running our E2E tests on a periodical nightly/weekly basis versus executing the tests on every code change as part of the CD pipeline. The reason for this is because E2E tests are slow to run.

We don’t want these tests to slow down our pipeline since it will delay our process and cycle and affect pull requests, merges, and deployments to different environments.

We wanted a set of core E2E tests we can run on a regular basis that lets us know if anything is off or broken. This is why we decided on running these tests on a nightly basis via a Jenkins [<VPIcon icon="fas fa-globe"/>cron job](https://code.tutsplus.com/tutorials/scheduling-tasks-with-cron-jobs--net-8800).

#### 4. Create a Proof of Concept/Prototype

The last step was to create a proof of concept or prototype to show the E2E tests running and then incorporate them into our system.

We also had to decide to either completely integrate the E2E tests into our current code base or to have a one-off project that is separate from the main code base.

For the initial prototype, we went with having a new repository isolated from our main code base and running our tests in the staging environment.

In conclusion, while E2E tests are very expensive to maintain, we believe that they are highly valuable as they are an excellent analogue to user behavior which helps us test basic user functionality on Hubba.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why End-to-End Testing is Important for Your Team",
  "desc": "By Phong Huynh How our team implemented end to end testing in 4 easy steps At Hubba, our business needs are always evolving and the speed of development needs to catch up with it. One of the ways to keep the team moving forward without breaking every...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/why-end-to-end-testing-is-important-for-your-team.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
