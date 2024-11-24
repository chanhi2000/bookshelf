---
lang: en-US
title: "Monitoring and Logging"
description: "Article(s) > (13/18) The Microservices Book – Learn How to Build and Manage Services in the Cloud" 
category:
  - Node.js
  - RabbitMQ
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - rabbitmq
  - rabbit-mq
  - devops
  - vm
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (13/18) The Microservices Book – Learn How to Build and Manage Services in the Cloud"
    - property: og:description
      content: "Monitoring and Logging"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-microservices-book-build-and-manage-services-in-the-cloud/monitoring-and-logging.html
date: 2024-11-29
isOriginal: false
author: Adekola Olawale
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1732028836710/aedce669-1e41-4bb1-8619-6994ed741b5c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Microservices Book – Learn How to Build and Manage Services in the Cloud",
  "desc": "In today’s fast-paced tech landscape, microservices have emerged as one of the most efficient ways to architect and manage scalable, flexible, and resilient cloud-based systems. Whether you're working with large-scale applications or building somethi...",
  "link": "/freecodecamp.org/the-microservices-book-build-and-manage-services-in-the-cloud/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Microservices Book – Learn How to Build and Manage Services in the Cloud"
  desc="In today’s fast-paced tech landscape, microservices have emerged as one of the most efficient ways to architect and manage scalable, flexible, and resilient cloud-based systems. Whether you're working with large-scale applications or building somethi..."
  url="https://freecodecamp.org/news/the-microservices-book-build-and-manage-services-in-the-cloud#heading-monitoring-and-logging"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732028836710/aedce669-1e41-4bb1-8619-6994ed741b5c.png"/>

Effective monitoring and logging are fundamental to maintaining the health and performance of a microservices-based application. As microservices often operate in distributed environments, it becomes challenging to track, diagnose, and troubleshoot issues. Without proper visibility into the system’s behavior, you risk operational inefficiencies, performance bottlenecks, and increased downtime.

In this section, we will focus on how to implement robust monitoring and logging practices that ensure you can effectively track and manage the behavior of microservices in real-time.

We'll explore the tools and frameworks available for monitoring system health, gathering performance metrics, and collecting logs from different microservices in your application.

We'll also discuss how these practices can support proactive issue resolution by allowing for timely alerts and more insightful data for debugging.

Then we’ll dive into the importance of centralized logging systems like ELK Stack (Elasticsearch, Logstash, and Kibana), and how monitoring solutions such as Prometheus and Grafana provide metrics and visualizations to observe your services' health.

Finally, we’ll cover tracing techniques that can help pinpoint the flow of requests across microservices, ensuring quick resolution of performance or failure issues.

By the end of this section, you'll understand how to implement a comprehensive monitoring and logging strategy that ensures your microservices architecture operates smoothly and reliably.

---

## Centralized Logging Solutions (ELK Stack, Fluentd)

Microservices generate logs across many instances. Centralized logging solutions collect and store logs in a single location, simplifying analysis.

- **ELK Stack (Elasticsearch, Logstash, Kibana)**: Common for centralized logging, enabling full-text search and visualizations.

---

## Monitoring and Observability Tools (Prometheus, Grafana, Datadog)

Monitoring tools track the performance and health of microservices. [<FontIcon icon="iconfont icon-prometheus"/>Prometheus](https://prometheus.io/) collects metrics, and [<FontIcon icon="iconfont icon-grafana"/>Grafana](https://grafana.com/) visualizes them in dashboards.

::: tip Prometheus (Monitoring Node.js Microservice)

```js
const client = require('prom-client');

// Create a counter metric
const requestCounter = new client.Counter({
    name: 'node_requests_total',
    help: 'Total number of requests'
});

// Increment counter on each request
app.use((req, res, next) => {
    requestCounter.inc();
    next();
});
```

:::

The following code shows the process of how Prometheus metrics are integrated into a Node.js application using the `prom-client` library to monitor API requests.

Prometheus is a popular tool for monitoring and alerting in microservices environments, often used to track and visualize system health metrics like request counts, response times, and error rates.

Here, the code is focused on implementing a simple counter metric to monitor the total number of requests the application receives.

First, the `prom-client` module is imported to set up Prometheus-compatible metrics in the application. The `Counter` class from `prom-client` is used to define a new counter metric, named `node_requests_total`, with a description (via the `help` property) of "Total number of requests."

Counters in Prometheus are designed for tracking cumulative values, like the count of requests or the number of errors, and are ideal for metrics that always increase, such as a request count.

The middleware function then increments this counter on every incoming request by calling `requestCounter.inc()`. This middleware is added to the Express `app` instance using `app.use()`, which means it will execute for every incoming request, incrementing the `requestCounter` metric.

Each time a new request is processed, Prometheus records this increment, allowing the total count of requests to be monitored over time.

This setup allows Prometheus to pull these metrics at regular intervals from the application’s `/metrics` endpoint (if configured).

By tracking the `node_requests_total` counter, you can gain insights into traffic patterns and detect sudden increases or decreases in request volume, which can be crucial for monitoring system performance and ensuring service reliability.

This basic example demonstrates how to set up and use Prometheus metrics to gain visibility into microservice activity

---

## Distributed Tracing (Jaeger, Zipkin)

In microservices, tracking a request's journey across services is crucial. Distributed tracing tools like [**Jaeger**](https://jaegertracing.io/) and [**Zipkin**](https://zipkin.io/) provide visibility into how requests propagate across services.

Distributed tracing is like tracking a package’s journey through multiple shipping hubs, providing insights into where delays occur.
