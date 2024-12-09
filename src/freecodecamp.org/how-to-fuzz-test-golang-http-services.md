---
lang: en-US
title: "How to Fuzz Test Golang HTTP Services"
description: "Article(s) > How to Fuzz Test Golang HTTP Services"
icon: fa-brands fa-golang
category: 
  - Go
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - go
  - golang
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Fuzz Test Golang HTTP Services"
    - property: og:description
      content: "How to Fuzz Test Golang HTTP Services"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-fuzz-test-golang-http-services.html
prev: /programming/go/articles/README.md
date: 2024-11-05
isOriginal: false
author: Alex Pliutau
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1730664559414/b64781c3-341f-4a5d-94fe-38ff78099b42.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Fuzz Test Golang HTTP Services"
  desc="As a developer, you can’t always envision all of the possible inputs your programs or functions might receive. Even though you can define the major edge cases, you still can’t predict how your program will behave in the case of some weird unexpected ..."
  url="https://freecodecamp.org/news/how-to-fuzz-test-golang-http-services"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730664559414/b64781c3-341f-4a5d-94fe-38ff78099b42.png"/>

As a developer, you can’t always envision all of the possible inputs your programs or functions might receive.

Even though you can define the major edge cases, you still can’t predict how your program will behave in the case of some weird unexpected input. In other words, you can typically only find bugs you *expect* to find.

That’s where fuzz testing or fuzzing comes to the rescue. And in this tutorial, you’ll learn how to perform fuzz testing in Go.

---

## What is Fuzz Testing?

Fuzzing is an automated software testing technique that involves inputting a large amount of valid, nearly-valid, or invalid random data into a computer program and observing its behavior and output. So the goal of fuzzing is to reveal bugs, crashes, and security vulnerabilities in source code you might not find through traditional testing methods.

The [<FontIcon icon="fa-brands fa-youtube"/>Fuzz Testing in Go](https://youtu.be/w8STTZWdG9Y) video which I made a few years ago shows a very simple example of the Go code that may work well unless you provide a certain input:

<VidStack src="youtube/w8STTZWdG9Y" />

```go
func Equal(a []byte, b []byte) bool {
  for i := range a {
    // can panic with runtime error: index out of range.
    if a[i] != b[i] {
      return false
    }
  }

  return true
}
```

This sample function works perfectly as long as the length of two slices are equal. But it will panic when the first slice is longer than the second (index out of range error). Furthermore, it doesn’t return a correct result when the second slice is the subset of the first one.

The fuzzing technique would easily spot this bug by bombarding this function with various inputs.

It’s a good practice to integrate fuzzing into your team’s software development lifecycle (SDLC) as well. For example, Microsoft uses fuzzing as [<FontIcon icon="fa-brands fa-microsoft"/>one of the stages in its SDLC](https://learn.microsoft.com/en-us/compliance/assurance/assurance-microsoft-security-development-lifecycle), to find potential bugs and vulnerabilities.

---

## Fuzz Testing in Go

There are many fuzzing tools that have been available for a while – such as [<FontIcon icon="iconfont icon-github"/>`google/oss-fuzz`](https://github.com/google/oss-fuzz), for example – but since Go 1.18, fuzzing was added to Go’s standard library. So it’s now part of the regular testing package since it’s a kind of test. You can also use it together with the other testing primitives which is nice.

The steps to create a fuzz test in Go are the following:

1. In a <FontIcon icon="fa-brands fa-golang"/>`_test.go` file, create a function that starts with `Fuzz` which accepts `*testing.F`
2. Add corpus seeds using `f.Add()` to allow the fuzzer to generate the data based on it.
3. Call the fuzz target using `f.Fuzz()` by passing fuzzing arguments which our target function accepts.
4. Start the fuzzer using the regular `go test` command, but with the `–fuzz=Fuzz` flag

::: note

Note that the fuzzing arguments can only be the following types:

- string, byte, \[\]byte
- int, int8, int16, int32/rune, int64
- uint, uint8, uint16, uint32, uint64
- float32, float64
- bool

;::

A simple fuzz test for the `Equal` function above may look like this:

```go
// Fuzz test
func FuzzEqual(f *testing.F) {
  // Seed corpus addition
  f.Add([]byte{'f', 'u', 'z', 'z'}, []byte{'t', 'e', 's', 't'})

  // Fuzz target with fuzzing arguments
  f.Fuzz(func(t *testing.T, a []byte, b []byte) {
    // Call our target function and pass fuzzing arguments
    Equal(a, b)
  })
}
```

By default, fuzz tests run forever, so you either need to specify the time limit or wait for fuzz tests to fail. You can specify which tests to run using the `--fuzz` argument.

```sh
go test --fuzz=Fuzz -fuzztime=10s
```

If there are any errors during the execution, the output should look similar to this:

```sh
go test --fuzz=Fuzz -fuzztime=30s
# 
# --- FAIL: FuzzEqual (0.02s)
#     --- FAIL: FuzzEqual (0.00s)
#         testing.go:1591: panic: runtime error: index out of range
#     Failing input written to testdata/fuzz/FuzzEqual/84ed65595ad05a58
#     To re-run:
#     go test -run=FuzzEqual/84ed65595ad05a58
```

Notice that the input for which the `fuzz` test has failed are written into a file in the <FontIcon icon="fas fa-folder-open"/>`testdata` folder and can be re-played by using that input identifier.

```sh
go test -run=FuzzEqual/84ed65595ad05a58
```

The <FontIcon icon="fas fa-folder-open"/>`testdata` folder can be checked into the repository and be used for regular tests, because fuzz tests can also act as regular tests when executed without the `--fuzz` flag.

---

## Fuzzing HTTP Services

It’s also possible to fuzz test the HTTP services by writing a test for your `HandlerFunc` and using the `httptest` package. This can be very useful if you need to test the whole HTTP service, not only the underlying functions.

Let’s now introduce a more real example such as an HTTP Handler that accepts some user input in the request body and then write a fuzz test for it.

Our handler accepts a JSON request with `limit` and `offset` fields to paginate some static mocked data. Let's define the types first.

```go
type Request struct {
  Limit  int `json:"limit"`
  Offset int `json:"offset"`
}

type Response struct {
  Results    []int `json:"items"`
  PagesCount int   `json:"pagesCount"`
}
```

Our handler function then parses the JSON, paginates the static slice, and returns a new JSON in response.

```go
func ProcessRequest(w http.ResponseWriter, r *http.Request) {
  var req Request

  // Decode JSON request
  if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
    http.Error(w, err.Error(), http.StatusBadRequest)
    return
  }

  // Apply offset and limit to some static data
  all := make([]int, 1000)
  start := req.Offset
  end := req.Offset + req.Limit
  res := Response{
    Results:    all[start:end],
    PagesCount: len(all) / req.Limit,
  }

  // Send JSON response
  if err := json.NewEncoder(w).Encode(res); err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  w.WriteHeader(http.StatusOK)
}
```

As you may have already noticed, this function doesn’t handle slice operations very well and can easily `panic`. Also, it can panic if it tries to divide by 0. It's great if we can spot this during the development or using only unit tests, but sometimes not everything is visible to our eye, and our handler may pass the input to other functions and so forth.

Following our `FuzzEqual` example above, let’s implement a fuzz test for the `ProcessRequest` handler. The first thing we need to do is to provide the sample inputs for the fuzzer. This is the data that the fuzzer will use and modify into new inputs that are tried. We can craft some sample JSON request and use `f.Add()` with the `[]byte` type.

```go
func FuzzProcessRequest(f *testing.F) {
  // Create sample inputs for the fuzzer
  testRequests := []Request{
    {Limit: -10, Offset: -10},
    {Limit: 0, Offset: 0},
    {Limit: 100, Offset: 100},
    {Limit: 200, Offset: 200},
  }

  // Add to the seed corpus
  for _, r := range testRequests {
    if data, err := json.Marshal(r); err == nil {
      f.Add(data)
    }
  }

  // ...
}
```

After that we can use the **httptest** package to create a test HTTP server and make requests to it.

Note: Since our fuzzer can generate invalid non-JSON requests, it’s better just to skip them and ignore with `t.Skip()`. We can also skip `BadRequest` errors.

```go
func FuzzProcessRequest(f *testing.F) {
  // ...
  // Create a test server
  srv := httptest.NewServer(http.HandlerFunc(ProcessRequest))
  defer srv.Close()

  // Fuzz target with a single []byte argument
  f.Fuzz(func(t *testing.T, data []byte) {
    var req Request
    if err := json.Unmarshal(data, &req); err != nil {
      // Skip invalid JSON requests that may be generated during fuzz
      t.Skip("invalid json")
    }

    // Pass data to the server
    resp, err := http.DefaultClient.Post(srv.URL, "application/json", bytes.NewBuffer(data))
    if err != nil {
      t.Fatalf("unable to call server: %v, data: %s", err, string(data))
    }
    defer resp.Body.Close()

    // Skip BadRequest errors
    if resp.StatusCode == http.StatusBadRequest {
      t.Skip("invalid json")
    }

    // Check status code
    if resp.StatusCode != http.StatusOK {
      t.Fatalf("non-200 status code %d", resp.StatusCode)
    }
  })
}
```

Our fuzz target has a single argument with a type `[]byte` that contains the full JSON request, but you can change it to have multiple arguments.

Everything is ready now to run our fuzz tests. When fuzzing HTTP servers, you may need to adjust the amount of parallel workers, otherwise the load may overwhelm the test server. You can do that by setting `-parallel=1` flag.

```sh
go test --fuzz=Fuzz -fuzztime=10s -parallel=1
go test --fuzz=Fuzz -fuzztime=30s
# 
# --- FAIL: FuzzProcessRequest (0.02s)
#     --- FAIL: FuzzProcessRequest (0.00s)
#         runtime error: integer divide by zero
#         runtime error: slice bounds out of range
```

And as expected, we will see the above errors uncovered.

We can also see the fuzz inputs in the <FontIcon icon="fas fa-folder-open"/>`testdata` folder to see which JSON contributed to this failure. Here is a sample content of the file:

```sh
go test fuzz v1
# 
# []byte("{"limit":0,"offset":0}")
```

To fix that issue, we can introduce input validation and default settings:

```go
if req.Limit <= 0 {
  req.Limit = 1
}
if req.Offset < 0 {
  req.Offset = 0
}
if req.Offset > len(all) {
  start = len(all) - 1
}
if end > len(all) {
  end = len(all)
}
```

With this change, the fuzz tests will run for 10 seconds and exit without an error.

---

## Conclusion

Writing fuzz tests for your HTTP services or any other methods is a great way to detect hard-to-find bugs. Fuzzers can detect hard-to-spot bugs that happen for only some weird unexpected input.

It’s amazing to see that fuzzing is a part of Go’s built-in testing library, making it easy to combine with regular tests. Note: prior to Go 1.18, developers used [<FontIcon icon="iconfont icon-github"/>`dvyukov/go-fuzz`](https://github.com/dvyukov/go-fuzz), which is a great tool for fuzzing as well.

<SiteInfo
  name="dvyukov/go-fuzz"
  desc="Randomized testing for Go"
  url="https://github.com/dvyukov/go-fuzz/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2c9e7c2586b6074e055882ebc00cb504332699d9b08f4596a3cf5cdcca81153c/dvyukov/go-fuzz"/>

::: info Resources

<SiteInfo
  name="plutov/packagemain"
  desc="Collection of materials for my Youtube Channel about Go"
  url="https://github.com/plutov/packagemain/tree/master/fuzz-testing-http-services"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/788f882676cde0a4ce8c6636772191b2f2b3ae8f2c727f6f4601bade9b6b698c/plutov/packagemain"/>

<VidStack src="youtube/w8STTZWdG9Y" />

<SiteInfo
  name="Go Fuzzing - The Go Programming Language"
  desc="Go supports fuzzing in its standard toolchain beginning in Go 1.18. Native Go fuzz tests are supported by OSS-Fuzz."
  url="https://go.dev/doc/security/fuzz/"
  logo="https://go.dev/images/favicon-gopher.svg"
  preview="https://go.dev/doc/gopher/gopher5logo.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Fuzz Test Golang HTTP Services",
  "desc": "As a developer, you can’t always envision all of the possible inputs your programs or functions might receive. Even though you can define the major edge cases, you still can’t predict how your program will behave in the case of some weird unexpected ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-fuzz-test-golang-http-services.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
