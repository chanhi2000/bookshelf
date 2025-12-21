---
lang: en-US
title: "How to Build Your First Dynamic Performance Test in Apache JMeter"
description: "Article(s) > How to Build Your First Dynamic Performance Test in Apache JMeter"
icon: iconfont icon-jmeter
category:
  - DevOps
  - JMeter
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - performance-testing
  - jmeter
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Your First Dynamic Performance Test in Apache JMeter"
    - property: og:description
      content: "How to Build Your First Dynamic Performance Test in Apache JMeter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-your-first-dynamic-performance-test-in-apache-jmeter.html
prev: /devops/jmeter/articles/README.md
date: 2025-10-29
isOriginal: false
author:
  - name: Mah Noor
    url : https://freecodecamp.org/news/author/tiredmahnoor/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761335397152/cb105a44-4c18-4998-9ffb-d520df0e6510.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JMeter > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/jmeter/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Your First Dynamic Performance Test in Apache JMeter"
  desc="As a QA engineer, I have always found performance testing to be one of the most exciting and underrated parts of software testing. Yes, functional testing is important, but it’s of little use if users have to wait for 5 seconds for each page to load...."
  url="https://freecodecamp.org/news/how-to-build-your-first-dynamic-performance-test-in-apache-jmeter"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761335397152/cb105a44-4c18-4998-9ffb-d520df0e6510.png"/>

As a QA engineer, I have always found performance testing to be one of the most exciting and underrated parts of software testing. Yes, functional testing is important, but it’s of little use if users have to wait for 5 seconds for each page to load.

For me personally, there is a deep satisfaction that comes with seeing your product come alive under load to find out how it’ll actually work in production when thousands of users will be using it.

Performance testing is about discovering how your system performs under real-world pressure in terms of load, concurrency, and throughput. One of the key aspects of performance testing is ensuring that the APIs can endure the expected load. You can do this using tools like Apache JMeter and K6. In this tutorial, we’ll explore how you can build your first end-to-end performance test in Apache JMeter. You will be learning to create a test suite that is dynamic (the test can be run with any test data) and that’s one-click executable (the test execution can be done through the GUI as well as the CLI).

::: note Prerequisites

Before you start, make sure you have:

- [**Apache JMeter (5.5 or above)**](https://jmeter.apache.org/download_jmeter.cgi) installed.
- [**Java 8 or later**](https://java.com/en/download/manual.jsp) configured on your system.

:::

You can check if JMeter is installed by running the command below:

```sh
jmeter -v
```

::: note

This tutorial will use the [<VPIcon icon="fas fa-globe"/>JSONPlaceholder](https://jsonplaceholder.typicode.com/) public API. You’ll learn how you can get a post_id and use it in a chain request to get user details.

:::

Let’s get started.

---

## Introduction to Apache JMeter

Apache JMeter is an open-source API load and stress testing tool. It’s a powerful testing tool that supports a wide range of protocols, including HTTP, HTTPS, FTP, JDBC, SOAP, and REST.

JMeter helps you answer critical questions about your APIs, like:

- How does my API perform under heavy load?
- What’s the maximum number of users it can handle before it starts failing?
- Which requests or endpoints are slowing things down?

Let’s go through the step-by-step process of building a dynamic load testing suite with JMeter.

### Step 1: Create a New Test Plan

Once JMeter opens, you’ll see an empty Test Plan. Think of this as your main workspace, which holds everything: Test configuration, users, requests, assertions, and results.

Right-click on **Test Plan → Add → Threads (Users) → Thread Group** to add a thread group. A thread group is essentially a test suite containing our test cases.

![Add Thread Group](https://cdn.hashnode.com/res/hashnode/image/upload/v1761045558747/ad3a2fe3-de59-420f-ba9d-1a36323e1d9e.png)

### Step 2: Configure the Thread Group

To configure the thread group, fill out the following input fields:

| Setting | Value | Description |
| --- | --- | --- |
| Number of Threads (Users) | 5 | This represents the number of concurrent users. In this case, it will be ‘5’ |
| Ramp-up Period (seconds) | 10 | This means the time it takes the threads to reach the maximum value. |
| Loop Count | 2 | This specifies the number of times you want your thread group executed. |

You’ve now created a small, controlled load test of 10 total requests (5 users × 2 loops).

![Thread Group](https://cdn.hashnode.com/res/hashnode/image/upload/v1761049951497/8221336c-5f10-4161-81fa-d0ad27c7164f.png)

### Step 3: Add HTTP Request Defaults

When you’re creating a suite of 100s of APIs, you don’t need to add your request details to all the API samplers in JMeter. JMeter lets you set it once globally by using a config element called HTTP Request Defaults. To add this element, follow the steps below:

1. Right-click on **Thread Group → Add → Config Element → HTTP Request Defaults.**
2. Enter the following:
    - **Protocol:** `https`
    - **Server Name or IP:** `jsonplaceholder.typicode.com`

This means all requests in this test will automatically use this base URL.

### Step 4: Add a CSV Data Set Config (Dynamic Input)

In real projects, APIs rarely use static inputs. Take as an example a login API that you want to run for 100 concurrent users. In a real-world scenario, every login request will have a different username and password.

To replicate this on JMeter, you need to run your test for 100 different login credentials. This means that your test should be **test data-driven**. We can build a data-driven test in JMeter using a **CSV file**:

::: tabs

@tab:active 1.

Create a file named <VPIcon icon="fas fa-file-csv"/>`data.csv` with the following content

```plaintext
post_id
1
2
3
4
5
```

@tab 2.

Save it in your JMeter project folder.

@tab 3.

In JMeter, right-click on **Thread Group → Add → Config Element → CSV Data Set Config.**

![Add CSV Data Set Config](https://cdn.hashnode.com/res/hashnode/image/upload/v1761048312824/4558aae4-23c8-446d-89d0-237aca29619d.png)

@tab 4.

Fill in the following fields:

- **Filename:** <VPIcon icon="fas fa-file-csv"/>`data.csv`
- **Variable Names:** `post_id`
- **Recycle on EOF:** `True`
- **Stop thread on EOF:** `False`

![CSV Data Set Config](https://cdn.hashnode.com/res/hashnode/image/upload/v1761048167041/eae27f5c-6e23-4c7d-8890-b3eb5943bb66.png)

:::

Now each user will pick a new `post_id` for every iteration from the CSV file.

### Step 5: Add the HTTP Request Sampler

Now let’s add the actual API call we'll test under load. To do this, follow the steps below:

::: tabs

@tab:active 1.

Right-click on **Thread Group → Add → Sampler → HTTP Request.**

![Add an HTTP Request](https://cdn.hashnode.com/res/hashnode/image/upload/v1761051865320/92bf89d0-616c-4d07-9531-3985265e07d7.png)

@tab 2.

Rename it to **Get Post Data.**

@tab 3.

Set the following fields:

- **Method:** GET
- **Path:** `/posts/${post_id}`

:::

Here `${post_id}` dynamically takes its value from your CSV file. The Protocol and Server IP fields will automatically get data from the ‘HTTP Request default’ config element that we added in Step #3.

![Add a GET Request](https://cdn.hashnode.com/res/hashnode/image/upload/v1761049282841/a420139c-4622-4d7a-ac7d-4308bb9a1dbc.png)

### Step 6: Add a JSON Extractor

When the API returns a response, we can extract a value (like `userId`) from it and use it later. This is used to implement an end-to-end flow where data is gotten (with GET) from an API and sent to the next POST/DELETE API.

For our API, below is the example response:

```json
{
  "userId": 1,
  "id": 3,
  "title": "fugiat veniam minus",
  "body": "This is an example post body"
}
```

To extract `userId`:

::: tabs

@tab:active 1.

Right-click on **Get Post Data → Add → Post Processors → JSON Extractor.**

![Add JSON Extractor](https://cdn.hashnode.com/res/hashnode/image/upload/v1761051791176/b7888a78-efbb-48d3-8aba-fcd21edfd8f2.png)

@tab 2.

Set the variables below in the JSON Extractor:

- **Name:** Extract User ID
- **Variable Name:** `user_id`
- **JSON Path Expression:** `$.userId`

![JSON Extractor](https://cdn.hashnode.com/res/hashnode/image/upload/v1761049324410/8a163733-8925-4557-9ace-124b08167f8e.png)

Now you can use `${user_id}` in the next request, making your test fully dynamic.

### Step 7: Add an Assertion

Assertions help you verify that your API responds correctly even under load. You can assert on the API response code, response time, or even the response payload. To add an assertion, follow the steps below:

::: tabs

@tab:active 1.

Right-click **Get Post Data → Add → Assertions → Response Assertion.**

![Add Response Assertion](https://cdn.hashnode.com/res/hashnode/image/upload/v1761049384591/a0293eef-74a0-4d55-b0c4-232d5c5eaa0c.png)

@tab 2.

Configure as:

- **Response Field to Test:** *Response Code –* This will add an assertion for the response code.
- **Pattern Matching Rules:** *Contains*
- **Pattern to Test:** 200

![Add Response Assertion](https://cdn.hashnode.com/res/hashnode/image/upload/v1761050184412/5a52f600-74f6-48c7-a975-7e39df47afdb.png)

:::

This ensures JMeter only counts the request as successful if the word `fugiat` appears in the response.

### Step 8: Add Listeners

We’ll add listeners to display our test results in different forms, such as visually or in a summary. Let’s add two essential ones:

1. **View Results Tree**: to view and debug individual requests.
2. **Summary Report**: to view performance metrics like response time, error rate, and throughput.

Add them via **Thread Group → Add → Listener → [Choose Listener]**

![Add Listener in JMeter](https://cdn.hashnode.com/res/hashnode/image/upload/v1761049568483/0daa916c-503d-4f91-ad17-1d2bd29a9f72.png)

### Step 9: Run Your Test

Hit the green **Start** button at the top. JMeter will start sending requests to your API using the dynamic post IDs from your CSV file.

As the test runs:

- Green checkmarks in **View Results Tree** mean successful responses.
- Assertion failures will appear in red.
- **Summary Report** will aggregate key metrics.

![JMeter View Results Tree](https://cdn.hashnode.com/res/hashnode/image/upload/v1761050151356/d8c72408-cf91-4c9d-8663-0a65b6943f5b.png)

![JMeter Summary Report](https://cdn.hashnode.com/res/hashnode/image/upload/v1761050211424/532dd999-b870-4cf8-ad1e-1a692119b0e0.png)

### Step 10: Chain Another Request (Optional)

Let’s take it one step further: we’ll use the extracted `user_id` from the first response to get user details from the [<VPIcon icon="fas fa-globe"/>GET users call](https://jsonplaceholder.typicode.com/users). To do this, follow the steps below:

::: tabs

@tab:active 1.

Right-click **Thread Group → Add → Sampler → HTTP Request.**

@tab 2.

Rename to **Get User Details.**

@tab 3.

Set:

- **Method:** GET
- **Path:** `/users/${user_id}`

![GET Users API](https://cdn.hashnode.com/res/hashnode/image/upload/v1761050384264/dcc1c333-4e06-4dd9-8dca-9af823fedabd.png)

:::

![Test Execution in JMeter](https://cdn.hashnode.com/res/hashnode/image/upload/v1761050365937/736b9954-6d01-45a6-8c16-f6d2ceb60e10.png)

### Step 11: Analyze the Results

Once the test completes, open the **Summary Report**. You’ll see:

| Metric | Description |
| --- | --- |
| **Sample Count** | Number of total requests sent |
| **Average** | Mean response time per request |
| **Min/Max** | Fastest and slowest response times |
| **Error %** | Percentage of failed requests |
| **Throughput** | Requests handled per second |

If your error percentage is 0% and throughput is stable, your system handled the load well.

::: tips Pro Tips

- **Parameterize everything.** Use multiple CSVs for realistic test flows (users, IDs, tokens).
- **Add timers** (like *Constant Timer*) to simulate think time between user actions.
- **Use Assertions wisely.** Don’t add extra assertions; focus on key validations such as response time and API status code.
- **Generate HTML reports using the command below:**

```sh
jmeter -n -t test-plan.jmx -l results.jtl -e -o report
```

:::

### Example Folder Structure:

Follow the folder structure below for an organized test suite.

```sh title="file structure"
performance-test/
├── data.csv
├── test-plan.jmx
└── results/
    ├── summary.csv
    └── report.html
```

---

## Conclusion

Performance testing is an essential element of a production readiness checklist for any product. It helps you ensure that your product can handle the expected user load and scale gracefully.

This guide is your first step towards writing end-to-end performance test cases and bridging the gap between being a functional test engineer and a full-stack QA Engineer who understands both quality and scalability.

I hope you found this tutorial helpful. If you want to stay connected or learn more about performance testing, follow me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`mah-noorqa`)](https://linkedin.com/in/mah-noorqa/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Your First Dynamic Performance Test in Apache JMeter",
  "desc": "As a QA engineer, I have always found performance testing to be one of the most exciting and underrated parts of software testing. Yes, functional testing is important, but it’s of little use if users have to wait for 5 seconds for each page to load....",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-your-first-dynamic-performance-test-in-apache-jmeter.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
