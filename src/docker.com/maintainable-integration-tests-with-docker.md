---
lang: en-US
title: "Write Maintainable Integration Tests with Docker"
description: "Article(s) > Write Maintainable Integration Tests with Docker"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Testcontainer
  - Java
  - Go
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
  - testcontainer
  - java
  - jdk
  - jdk11
  - go
  - golang
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Write Maintainable Integration Tests with Docker"
    - property: og:description
      content: "Write Maintainable Integration Tests with Docker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/maintainable-integration-tests-with-docker.html
prev: /devops/docker/articles/README.md
date: 2019-08-01
isOriginal: false
author:
  - name: Gianluca Arbezzano
    url : https://docker.com/author/gianluca/
cover: https://docker.com/app/uploads/2019/07/markus-spiske-code-unsplash-1110x740.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Testcontainer > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/testcontainer/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Java > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Write Maintainable Integration Tests with Docker"
  desc="The popularity of microservices and the use of third-party services for non-business critical features has drastically increased the number of integrations that make up the modern application. All of these integration points require different layers of testing."
  url="https://docker.com/blog/maintainable-integration-tests-with-docker"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2019/07/markus-spiske-code-unsplash-1110x740.jpg"/>

::: info

Testcontainer is an open source community focused on making integration tests easier across many languages. Gianluca Arbezzano is a Docker Captain, SRE at Influx Data and the maintainer of the Golang implementation of Testcontainer that uses the Docker API to expose a test-friendly library that you can use in your test cases.

![Photo by Markus Spiske on Unsplash.](https://docker.com/app/uploads/2019/07/markus-spiske-code-unsplash-1110x740.jpg)

:::

The popularity of microservices and the use of third-party services for non-business critical features has drastically increased the number of integrations that make up the modern application. These days, it is commonplace to use MySQL, Redis as a key value store, MongoDB, Postgress, and InfluxDB – and that is all just for the database – let alone the multiple services that make up other parts of the application.  
  
All of these integration points require different layers of testing. Unit tests increase how fast you write code because you can mock all of your dependencies, set the expectation for your function and iterate until you get the desired transformation. But, we need more. We need to make sure that the integration with Redis, MongoDB or a microservice works as expected, not just that the mock works as we wrote it. Both are important but the difference is huge.  
  
In this article, I will show you how to use testcontainer to write integration tests in Go with very low overhead. So, I am not telling you to stop writing unit tests, just to be clear!  
  
Back in the day, when I was interested in becoming  a Java developer, I tried to write an integration between Zipkin, a popular open source tracer, and InfluxDB. I ultimately failed because I am not a Java developer, but I did understand how they wrote integration tests, and I became fascinated.  

---

## Getting Started: `testcontainers-java`

Zipkin provides a UI and an API to store and manipulate traces, it supports Cassandra, in-memory, ElasticSearch, MySQL and many more platforms as storage. In order to validate that all the storage systems work, they use a library called [<VPIcon icon="iconfont icon-github"/>`testcontainers/testcontainers-java`](https://github.com/testcontainers/testcontainers-java) that is a wrapper around the docker-api designed to be “test-friendly.”Here is the [<VPIcon icon="iconfont icon-testcontainers"/>Quick Start](https://testcontainers.org/quickstart/junit_4_quickstart/) example:  
  
```java
public class RedisBackedCacheIntTestStep0 {
    private RedisBackedCache underTest;

    @Before
    public void setUp() {
        // Assume that we have Redis running locally?
        underTest = new RedisBackedCache("localhost", 6379);
    }

    @Test
    public void testSimplePutAndGet() {
        underTest.put("test", "example");

        String retrieved = underTest.get("test");
        assertEquals("example", retrieved);
    }
}
```

At the `setUp` you can create a container (redis in this case) and expose a port. From here, you can interact with a live redis instance.  
  
Everytime you start a new container, there is a “sidecar” called [<VPIcon icon="iconfont icon-github"/>`testcontainers/moby-ryuk`](https://github.com/testcontainers/moby-ryuk) that keeps your Docker environment clean by removing containers, volumes and networks after a certain amount of time. You can also remove them from inside the test.The below example comes from [<VPIcon icon="iconfont icon-github"/>`apache/incubator-zipkin`](https://github.com/apache/incubator-zipkin/blob/b8646142fa15c8c5f47ff2a2a48dc663c7bb65b3/zipkin-storage/elasticsearch/src/test/java/zipkin2/elasticsearch/integration/ElasticsearchStorageRule.java#L30). They are testing the ElasticSearch integration and as the example shows, you can programmatically configure your dependencies from inside the test case.  
  
```java
public class ElasticsearchStorageRule extends ExternalResource {
    static final Logger LOGGER = LoggerFactory.getLogger(ElasticsearchStorageRule.class);
    static final int ELASTICSEARCH_PORT = 9200; final String image; final String index;
    GenericContainer container;
    Closer closer = Closer.create();

    public ElasticsearchStorageRule(String image, String index) {
      this.image = image;
      this.index = index;
    }

    @Override
    protected void before() {
        try {
            LOGGER.info("Starting docker image " + image);
            container =
                 new GenericContainer(image)
                     .withExposedPorts(ELASTICSEARCH_PORT)
                     .waitingFor(new HttpWaitStrategy().forPath("/"));
            container.start();
            if (Boolean.valueOf(System.getenv("ES_DEBUG"))) {
               container.followOutput(new Slf4jLogConsumer(LoggerFactory.getLogger(image)));
            }
            System.out.println("Starting docker image " + image);
        } catch (RuntimeException e) {
           LOGGER.warn("Couldn't start docker image " + image + ": " + e.getMessage(), e);
        }
    }
}
```

That this happens programmatically is key because you do not need to rely on something external such as `docker-compose` to spin up your integration tests environment. By spinning it up from inside the test itself, you have a lot more control over the orchestration and provisioning, and the test is more stable. You can even check when a container is ready before you start a test.  
  
Since I am not a Java developer, I ported the library (we are still working on all the features) in Golang and now it’s in the main [<VPIcon icon="iconfont icon-github"/>`testcontainers/testcontainers-go`](https://github.com/testcontainers/testcontainers-go) organization.  
  
```go
func TestNginxLatestReturn(t *testing.T) {
    ctx := context.Background()
    req := testcontainers.ContainerRequest{
        Image:        "nginx",
        ExposedPorts: []string{"80/tcp"},
    }
    nginxC, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
        ContainerRequest: req,
        Started:          true,
    })
    if err != nil {
        t.Error(err)
    }
    defer nginxC.Terminate(ctx)
    ip, err := nginxC.Host(ctx)
    if err != nil {
        t.Error(err)
    }
    port, err := nginxC.MappedPort(ctx, "80")
    if err != nil {
        t.Error(err)
    }
    resp, err := http.Get(fmt.Sprintf("http://%s:%s", ip, port.Port()))
    if resp.StatusCode != http.StatusOK {
        t.Errorf("Expected status code %d. Got %d.", http.StatusOK, resp.StatusCode)
    }
}
```

---

## Creating the Test

This is what it looks like:  

```go
ctx := context.Background()
req := testcontainers.ContainerRequest{
    Image:        "nginx",
    ExposedPorts: []string{"80/tcp"},
}
nginxC, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
    ContainerRequest: req,
    Started:          true,
})
if err != nil {
    t.Error(err)
}
defer nginxC.Terminate(ctx)
```

You create the nginx container and with the `defer nginxC.Terminate(ctx)` command, you are cleaning up the container when the test is over. Remember ryuk? it is not a mandatory command, but testcontainers-go uses it to remove the containers at some point.  
  
---

## Modules

The Java library has a feature called [<VPIcon icon="iconfont icon-testcontainer"/>modules](https://testcontainers.org/modules/databases/) where you get pre-canned containers such as databases (mysql, postgress, cassandra, etc.) or applications like nginx.The go version is working on something similar but it is still an [open pr (<VPIcon icon="iconfont icon-github"/>`testcontainers/testcontainers-go`)](https://github.com/testcontainers/testcontainers-go/pull/59).  
  
If you’d like to build a microservice your application relies on from the upstream video, this is a great feature. Or if you would like to test how your application behaves from inside a container (probably more similar to where it will run in prod). This is [<VPIcon icon="iconfont icon-testcontainer"/>how it works](https://testcontainers.org/features/creating_images/) in Java:  
  
```java
@Rule
public GenericContainer dslContainer = new GenericContainer(
    new ImageFromDockerfile()
            .withFileFromString("folder/someFile.txt", "hello")
            .withFileFromClasspath("test.txt", "mappable-resource/test-resource.txt")
            .withFileFromClasspath("Dockerfile", "mappable-dockerfile/Dockerfile"))
```

---

## What I’m working on now

Something that I am currently working on is a new `canned` container that uses [<VPIcon icon="iconfont icon-github"/>`kubernetes-sigs/kind`](https://github.com/kubernetes-sigs/kind) to spin up Kubernetes clusters inside a container. If your applications use the Kubernetes API, you can test it in integration:  
  
```go
ctx := context.Background()
k := &KubeKindContainer{}
err := k.Start(ctx)
if err != nil {
  t.Fatal(err.Error())
}
defer k.Terminate(ctx)
clientset, err := k.GetClientset()
if err != nil {
  t.Fatal(err.Error())
}
ns, err := clientset.CoreV1().Namespaces().Get("default", metav1.GetOptions{})
if err != nil {
  t.Fatal(err.Error())
}
if ns.GetName() != "default" {
  t.Fatalf("Expected default namespace got %s", ns.GetName())
```

This feature is still a work in progress as you can see from [PR67 (<VPIcon icon="iconfont icon-github"/>`testcontainers/testcontainers-go`)](https://github.com/testcontainers/testcontainers-go/pull/67).

---

## Calling All Coders  

The Java version for testcontainers is the first one developed, it has a lot of features not ported to the Go version or to other libraries as well such as JavaScript, Rust, .Net.  
  
My suggestion is to try the one written in your language and to contribute to it.

In Go we don’t have a way to programmatically build images. I am thinking to embed `buildkit` or [<VPIcon icon="iconfont icon-github"/>`genuinetools/img`](https://github.com/genuinetools/img) in order to get a damonless builder that doesn’t depend on Docker. The great part about working with the Go version is that all the container related libraries are already in Go, so you can do a very good work of integration with them.  
  
This is a great chance to become part of this community! If you are passionate about testing framework join us and send your pull requests, or come to hang out on [<VPIcon icon="fa-brands fa-slack"/>Slack](https://testcontainers.slack.com).  

---

## Try It Out

I hope you are as excited as me about the flavour and the power this library provides. Take a look at the [<VPIcon icon="iconfont icon-github"/>`testcontainers`](https://github.com/testcontainers) organization on GitHub to see if your language is covered and try it out! And, if your language is not covered, let’s write it! If you are a Go developer and you’d like to contribute, feel free to reach out to me [<VPIcon icon="fa-brands fa-x-twitter"/>`@gianarb`](https://twitter.com/gianarb), or go check it out and open an issue or pull request!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Write Maintainable Integration Tests with Docker",
  "desc": "The popularity of microservices and the use of third-party services for non-business critical features has drastically increased the number of integrations that make up the modern application. All of these integration points require different layers of testing.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/maintainable-integration-tests-with-docker.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
