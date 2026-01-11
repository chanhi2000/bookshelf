---
lang: en-US
title: "Unit Testing in Go - A Beginner's Guide"
description: "Article(s) > Unit Testing in Go - A Beginner's Guide"
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
      content: "Article(s) > Unit Testing in Go - A Beginner's Guide"
    - property: og:description
      content: "Unit Testing in Go - A Beginner's Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/unit-testing-in-go-a-beginners-guide.html
prev: /programming/go/articles/README.md
date: 2026-01-13
isOriginal: false
author:
  - name: Gabor Koos
    url : https://freecodecamp.org/news/author/gkoos/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1768240528981/73c9c9f6-4942-4c39-9e62-87f540fd2233.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Unit Testing in Go - A Beginner's Guide"
  desc="If you're learning Go and you’re already familiar with the idea of unit testing, the main challenge is usually not why to test, but how to test in Go. Go takes a deliberately minimal approach to testing. There are no built-in assertions, no annotatio..."
  url="https://freecodecamp.org/news/unit-testing-in-go-a-beginners-guide"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1768240528981/73c9c9f6-4942-4c39-9e62-87f540fd2233.png"/>

If you're learning Go and you’re already familiar with the idea of **unit testing**, the main challenge is usually not *why* to test, but *how* to test in Go.

Go takes a deliberately minimal approach to testing. There are no built-in assertions, no annotations, and no special syntax. Instead, tests are written as regular Go code using a small standard library package, and run with a single command. This can feel unusual at first if you're coming from ecosystems with richer testing frameworks, but it quickly becomes predictable and easy to reason about.

In this article, we'll look at how unit testing works in Go in practice. We'll write a few small tests, run them from the command line, and cover the most common patterns you'll see in real Go codebases, such as table-driven tests and testing functions that return errors. We'll focus on the essentials and won't cover more advanced topics like mocks or external frameworks.

The goal is to show how familiar testing concepts translate into idiomatic Go. By the end, you should feel comfortable reading and writing basic unit tests and integrating them into your regular Go workflow.

::: note Prerequisites

Before you start, you should be comfortable with:

- Writing and running basic Go programs
- Defining and calling functions in Go
- Understanding basic Go types (int, string, bool, and so on)
- Using the Go command-line tool (go run, go build)
- Basic understanding of unit tests: what a test is and why it's useful
- Familiarity with Test-Driven Development concepts like testing before or alongside writing code
- Awareness of common testing ideas such as assertions, test coverage, and checking error conditions

You don't need prior experience with Go's `testing` package or Go-specific test patterns, as this guide will cover all of that.

:::

---

## Writing Your First Test

Let's start with a simple function to test. Imagine you have a small `calc` package with an `Add` function:

```go title="calc.go"
package calc

// Add returns the sum of two integers
func Add(a, b int) int {
    return a + b
}
```

To test this function, create a new file named <VPIcon icon="fa-brands fa-golang"/>`calc_test.go` in the same package. In Go, test files must end with `_test.go` to be recognized by the testing tool.

Inside <VPIcon icon="fa-brands fa-golang"/>`calc_test.go`, you write a test function:

```go title="calc_test.go"
package calc

import "testing"

func TestAdd(t *testing.T) {
    got := Add(2, 3)
    want := 5
    if got != want {
        t.Errorf("Add(2, 3) = %d; want %d", got, want)
    }
}
```

::: info Here's what's happening:

- The function name starts with `Test` and takes a single `*testing.T` parameter. Go automatically discovers and runs any function that follows this convention.
- The `t.Errorf` call reports a test failure. Unlike some frameworks, Go doesn't provide special assertions – you simply check a condition and call `t.Errorf` or `t.Fatalf` if it fails.
- Each test is a standalone function. You can write as many as you like, and Go will run them all.

:::

### Running Your Test

Once the file is saved, you can run your test with:

```sh
go test
```

This runs tests for the current package (files ending with `_test.go`). If you want to run tests recursively in all subdirectories of your project, use:

```sh
go test ./...
```

The `./...` pattern is shorthand for "run tests in this directory and all subdirectories". This is especially useful in larger projects where your code is spread across multiple packages.

If everything is working, you should see output indicating that the test passed:

```sh
go test
# 
# PASS
# ok      _/C_/projects/Articles/Go_Testing       0.334s
```

You can add the `-v` flag for verbose output:

```sh
go test -v
```

This will show you the names of the tests as they run:

```sh
$ go test -v
#
# === RUN   TestAdd
# --- PASS: TestAdd (0.00s)
# PASS
# ok      _/C_/projects/Articles/Go_Testing       0.356s
```

Not much difference for a single test, but it becomes useful as you add more tests.

Now let's see what happens if the test fails. Change the expected value in <VPIcon icon="fa-brands fa-golang"/>`calc_test.go` to an incorrect one:

```go title="calc_test.go"
  ...
    want := 6 // Incorrect expected value
  ...
```

Run the tests again:

```sh
go test
# 
# --- FAIL: TestAdd (0.00s)
#     calc_test.go:9: Add(2, 3) = 5; want 6
# FAIL
# exit status 1
# FAIL    _/C_/projects/Articles/Go_Testing       0.340s
```

or with verbose output:

```sh
go test -v
# 
# === RUN   TestAdd
#     calc_test.go:9: Add(2, 3) = 5; want 6
# --- FAIL: TestAdd (0.00s)
# FAIL
# exit status 1
# FAIL    _/C_/projects/Articles/Go_Testing       0.337s
```

Of course, your tests should always check for the correct expected values! A failing (but correct) test is a sign that your code needs to be fixed.

We only created one test file and one test function with one assertion here, but Go's testing tool can handle many files and functions at once. Behind the scenes, Go will automatically:

- Find **all** `_test.go` files in the specified packages (for example, current directory for `go test`, or recursively in all subdirectories with `go test ./...`).
- Identify functions that start with `Test` and have the correct signature.
- Compile them together with your package into a temporary test binary.
- Execute each test function and report the results.

To prove this, let's quickly add a `Divide` function to our package:

```go title="calc.go"
// ...
// Divide returns the result of dividing a by b
func Divide(a, b int) int {
    return a / b
}
```

(Note that this is an **integer division**, so fractional parts are discarded. `Divide(5, 2)` would return `2`.)

And another test file with a corresponding test:

```go title="calc_2_test.go"
package calc

import "testing"

func TestDivide(t *testing.T) {
    got := Divide(10, 2)
    want := 5    
    if got != want {
        t.Errorf("Divide(10, 2) = %d; want %d", got, want)
    }    
}
```

Now when you run `go test`, both `TestAdd` and `TestDivide` will be executed:

```sh
go test
# 
# PASS
# ok      _/C_/projects/Articles/Go_Testing       0.325s
```

Or:

```sh
go test -v
#
# === RUN   TestAdd
# --- PASS: TestAdd (0.00s)
# === RUN   TestDivide
# --- PASS: TestDivide (0.00s)
# PASS
# ok      _/C_/projects/Articles/Go_Testing       0.323s
```

### Divide by Zero

What happens if we try to `Divide` by zero? Let's add another test case for that:

```go title="calc_test.go"
func TestDivideByZero(t *testing.T) {
    defer func() {
        if r := recover(); r == nil { // Check if a panic occurred
            t.Errorf("Divide did not panic on division by zero")
        }
    }()
    Divide(10, 0) // This should cause a panic
}
```

This test checks that the `Divide` function panics when dividing by zero. When you run the tests again, you'll see that this new test also passes:

```sh
go test -v
# 
# === RUN   TestAdd
# --- PASS: TestAdd (0.00s)
# === RUN   TestDivide
# --- PASS: TestDivide (0.00s)
# === RUN   TestDivideByZero
# --- PASS: TestDivideByZero (0.00s)
# PASS
# ok      _/C_/projects/Articles/Go_Testing       0.312s
```

(Note that in real-world Go code, it's better to return `(int, error)` for unsafe operations instead of panicking.)

Feel free to experiment by adding more test cases, changing expected values, and exploring how Go's testing framework handles different scenarios.

### `t.Errorf` vs `t.Fatalf`

In the examples above, we used `t.Errorf` to report test failures. This function logs the error but allows the test to continue running. This is useful when you want to check multiple conditions in a single test function.

In contrast, `t.Fatalf` logs the error and immediately stops the execution of the current test. Use `t.Fatalf` when continuing the test after a failure doesn't make sense or could cause misleading results.

For example, in the `TestDivideByZero` test, if the `Divide` function does not panic, we use `t.Errorf` to report the failure but continue to the end of the test. But if we had additional checks after the division, we might want to use `t.Fatalf` to stop execution immediately upon failure.

While `t.Errorf` and `t.Fatalf` use `fmt`-style formatting, for simple messages without formatting, you can also use `t.Error` and `t.Fatal`, respectively.

In the next section, we'll look at *table-driven tests*, a common Go pattern for testing multiple cases efficiently.

---

## Table-Driven Tests

In Go, it's common to want to run the same test logic for multiple inputs and expected outputs. Rather than writing a separate test function for each case, Go developers often use **table-driven tests**. This pattern keeps your tests concise, readable, and easy to extend.

### Table-Driven `Add` Test

Let's rewrite our Add test using a table-driven approach (and delete <VPIcon icon="fa-brands fa-golang"/>`calc_2_test.go` for clarity):

```go title="calc_test.go"
package calc

import "testing"

func TestAddTableDriven(t *testing.T) {
    tests := []struct {// Define a struct for each test case and create a slice of them
        name string
        a, b int
        want int
    }{
        {"both positive", 2, 3, 5},
        {"positive + zero", 5, 0, 5},
        {"negative + positive", -1, 4, 3},
        {"both negative", -2, -3, -5},
    }

    for _, tt := range tests {// Loop over each test case
        t.Run(tt.name, func(t *testing.T) {// Run each case as a subtest
            got := Add(tt.a, tt.b)
            if got != tt.want {// Check the result
                t.Errorf("Add(%d, %d) = %d; want %d", tt.a, tt.b, got, tt.want) // Report failure if it doesn't match
            }
        })
    }
}
```

::: info Here's how it works:

- We define a **slice of structs**, each representing a test case.
- Each struct contains the test name, input values, and the expected result.
- We loop over the slice and call `t.Run(tt.name, func(t *testing.T) { ... })` to run each test as a **subtest**.
- If a subtest fails, you can see which one by its name in the output.

```sh
go test
# 
# PASS
# ok      _/C_/projects/Articles/Go_Testing       0.452s
```

Or to see detailed output:

```sh
go test -v
# 
# === RUN   TestAddTableDriven
# === RUN   TestAddTableDriven/both_positive
# === RUN   TestAddTableDriven/positive_+_zero
# === RUN   TestAddTableDriven/negative_+_positive
# === RUN   TestAddTableDriven/both_negative
# --- PASS: TestAddTableDriven (0.00s)
#     --- PASS: TestAddTableDriven/both_positive (0.00s)
#     --- PASS: TestAddTableDriven/positive_+_zero (0.00s)
#     --- PASS: TestAddTableDriven/negative_+_positive (0.00s)
#     --- PASS: TestAddTableDriven/both_negative (0.00s)
# PASS
# ok      _/C_/projects/Articles/Go_Testing       0.385s
```

:::

### Table-Driven Divide Test

We can apply the same pattern to `Divide`, including checking for divide-by-zero:

```go title="calc_test.go"
func TestDivideTableDriven(t *testing.T) {
    tests := []struct { // Define test cases
        name     string
        a, b     int
        want     int
        wantPanic bool
    }{
        {"normal division", 10, 2, 5, false},
        {"division by zero", 10, 0, 0, true},
    }

    for _, tt := range tests { // Loop over
        t.Run(tt.name, func(t *testing.T) { // Run subtest
            if tt.wantPanic { // Check for expected panic
                defer func() { // Recover from panic
                    if r := recover(); r == nil {
                        t.Errorf("Divide(%d, %d) did not panic", tt.a, tt.b)
                    }
                }()
            }
            got := Divide(tt.a, tt.b) // Tests that do not panic
            if !tt.wantPanic && got != tt.want {
                t.Errorf("Divide(%d, %d) = %d; want %d", tt.a, tt.b, got, tt.want)
            }
        })
    }
}
```

This example shows how to handle both normal and panic cases in a single table-driven test:

- The `wantPanic` field tells the test whether we expect a panic.
- We use `defer` and `recover` to check for a panic when needed.
- Normal test cases still check the result as usual.

Run all tests as before:

```sh
go test -v
#
# === RUN   TestAddTableDriven
# === RUN   TestAddTableDriven/both_positive
# === RUN   TestAddTableDriven/positive_+_zero
# === RUN   TestAddTableDriven/negative_+_positive
# === RUN   TestAddTableDriven/both_negative
# --- PASS: TestAddTableDriven (0.00s)
#     --- PASS: TestAddTableDriven/both_positive (0.00s)
#     --- PASS: TestAddTableDriven/positive_+_zero (0.00s)
#     --- PASS: TestAddTableDriven/negative_+_positive (0.00s)
#     --- PASS: TestAddTableDriven/both_negative (0.00s)
# === RUN   TestDivideTableDriven
# === RUN   TestDivideTableDriven/normal_division
# === RUN   TestDivideTableDriven/division_by_zero
# --- PASS: TestDivideTableDriven (0.00s)
#     --- PASS: TestDivideTableDriven/normal_division (0.00s)
#     --- PASS: TestDivideTableDriven/division_by_zero (0.00s)
# PASS
# ok      _/C_/projects/Articles/Go_Testing       0.321s
```

Subtest names make it easy to see which case passed or failed.

### Exercise

Try creating your own table-driven test for a new function, `Subtract(a, b int) int`. Include at least four test cases:

- Both positive numbers
- Positive minus zero
- Negative minus positive
- Both negative

Then run your tests and verify the output.

---

## Testing Functions That Return Errors

Many Go functions return an error as the last return value. Writing tests for these functions is slightly different from testing pure functions like our `Add` or `Divide`, because you need to check both the result and whether an error occurred.

### Safe Divide Function

Let's add a `SafeDivide` function to return an error instead of panicking:

```go title="calc.go"
import "fmt"
// ...
// SafeDivide returns the result of dividing a by b.
// It returns an error if b is zero.
func SafeDivide(a, b int) (int, error) {
    if b == 0 {
        return 0, fmt.Errorf("cannot divide by zero")
    }
    return a / b, nil
}
```

### Writing Tests for `SafeDivide()`

We can use a table-driven test again:

```go title="calc_test.go"
func TestSafeDivide(t *testing.T) {
    tests := []struct {
        name      string
        a, b      int
        want      int
        wantError bool
    }{
        {"normal division", 10, 2, 5, false},
        {"division by zero", 10, 0, 0, true},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := SafeDivide(tt.a, tt.b)
            if tt.wantError {
                if err == nil {
                    t.Errorf("SafeDivide(%d, %d) expected error, got nil", tt.a, tt.b)
                }
                return // stop here, no need to check `got`
            }
            if err != nil {
                t.Errorf("SafeDivide(%d, %d) unexpected error: %v", tt.a, tt.b, err)
            }
            if got != tt.want {
                t.Errorf("SafeDivide(%d, %d) = %d; want %d", tt.a, tt.b, got, tt.want)
            }
        })
    }
}
```

::: info What's happening here:

- We added a `wantError` field to indicate whether the test expects an error.
- If an error is expected, we check that `err != nil`. If not (that is, `err == nil`), we fail the test.
- If no error is expected, we check both the returned value (`got`) and that `err == nil`.
- Using `t.Run` subtests keeps everything organized and readable.

:::

Running the tests again:

```sh
go test -v
# 
# ...
# === RUN   TestSafeDivide
# === RUN   TestSafeDivide/normal_division
# === RUN   TestSafeDivide/division_by_zero
# --- PASS: TestSafeDivide (0.00s)
#     --- PASS: TestSafeDivide/normal_division (0.00s)
#     --- PASS: TestSafeDivide/division_by_zero (0.00s)
# PASS
# ok      _/C_/projects/Articles/Go_Testing       0.323s
```

Showing that both normal and error cases are handled correctly.

::: tip Exercise

Update your `Subtract(a, b int) int` function to a `SafeSubtract(a, b int) (int, error)` variant that returns an error if the result would be negative. Then write a table-driven test that covers:

- A positive result
- Zero result
- A negative result (should return an error)

:::

---

## Best Practices and Tips

Writing tests in Go is straightforward, but there are a few conventions and tips that make your tests more readable, maintainable, and idiomatic:

### Name Tests Clearly

First, make sure you use descriptive names for test functions and subtests. A good name explains what you're testing and under what conditions.

Here’s an example:

```go
t.Run("Divide positive numbers", func(t *testing.T) { ... })
t.Run("Divide by zero returns error", func(t *testing.T) { ... })
```

### Keep Tests Small and Focused

Each subtest should verify one thing, and each test function should cover a single function or method.

Try to avoid combining multiple unrelated checks in the same test function, and use table-driven tests help keep multiple similar checks concise without losing clarity.

### Use Table-Driven Tests for Repetitive Cases

If you find yourself writing multiple similar test functions, switch to a table-driven pattern. It makes it easier to add new cases, reduces duplicated code, and keeps output organized with `t.Run`.

### Check Errors Explicitly

In Go, functions often return `error`. So make sure you always check for errors in tests, even if you expect `nil`.

You can use the `wantError` pattern in table-driven tests for clarity.

```go
if tt.wantError {
    if err == nil {
        t.Errorf("expected error, got nil")
    }
}
```

### Avoid Panics When Possible

Panics are fine for some internal checks, but in production code, prefer returning an error.

Your tests can check for panics using `defer` and `recover`, but this should be the exception rather than the norm.

### Run Tests Frequently

Try to make running tests a habit: `go test -v ./...`. Frequent testing helps catch mistakes early and reinforces TDD practices.

### Keep Tests in the Same Package

By convention, tests live in the same package as the code they test. You can create `_test.go` files for testing, and Go automatically recognizes them.

Only use a separate `package calc_test` if you want to test your code from the outside, like a consumer. External test packages (just like every other external package) cannot access unexported identifiers.

### Use t.Fatalf vs t.Errorf Appropriately

- `t.Errorf` reports a failure but continues running the test.
- `t.Fatalf` stops the test immediately, which is useful if subsequent code depends on successful setup.

These tips will help you write clean, maintainable, and idiomatic Go tests that are easy to read and extend. Following these practices early in your Go journey will make testing less intimidating and more effective.

---

## Conclusion

Unit testing in Go may feel different at first, especially if you're coming from ecosystems with heavy frameworks and assertions. But the simplicity of Go's testing tools is one of its strengths: once you understand the conventions, writing, running, and organizing tests becomes predictable and intuitive.

In this guide, you've seen how to:

- Write basic test functions with the testing package
- Run tests from the command line and interpret the results
- Use table-driven tests to cover multiple cases efficiently
- Handle functions that return errors and check for expected failures

Beyond these fundamentals, testing is not just about verifying correctness, it's also about confidence. Well-tested code allows you to refactor, experiment, and add new features with less fear of breaking existing functionality.

As you continue writing Go code, try to integrate testing early, follow the idiomatic patterns you've learned, and explore more advanced topics such as:

- Using *mocks* or *interfaces* to isolate dependencies
- Benchmark tests with `testing.B`
- Coverage analysis with `go test -cover`

The key takeaway is that testing in Go is accessible, flexible, and powerful, even without fancy frameworks. By building these habits now, you'll write code that's more reliable, maintainable, and enjoyable to work with.

---

## Solutions to Exercises

### Subtract Function and Tests

```go title="calc.go"
package calc

func Subtract(a, b int) int {
    return a - b
}
```

```go title="calc_test.go"
package calc

import "testing"

func TestSubtractTableDriven(t *testing.T) {
    tests := []struct {
        name string
        a, b int
        want int
    }{
        {"both positive", 5, 3, 2},
        {"positive minus zero", 5, 0, 5},
        {"negative minus positive", -1, 4, -5},
        {"both negative", -3, -2, -1},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := Subtract(tt.a, tt.b)
            if got != tt.want {
                t.Errorf("Subtract(%d, %d) = %d; want %d", tt.a, tt.b, got, tt.want)
            }
        })
    }
}
```

### SafeSubtract Function and Tests

```go title="calc.go"
package calc

import "fmt"

func SafeSubtract(a, b int) (int, error) {
    result := a - b
    if result < 0 {
        return 0, fmt.Errorf("result would be negative")
    }
    return result, nil
}
```

```go :collapsed-lines title="calc_test.go"
package calc

import "testing"

func TestSafeSubtract(t *testing.T) {
    tests := []struct {
        name      string
        a, b      int
        want      int
        wantError bool
    }{
        {"positive result", 5, 3, 2, false},
        {"zero result", 3, 3, 0, false},
        {"negative result", 2, 5, 0, true},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := SafeSubtract(tt.a, tt.b)
            if tt.wantError {
                if err == nil {
                    t.Errorf("SafeSubtract(%d, %d) expected error, got nil", tt.a, tt.b)
                }
                return
            }
            if err != nil {
                t.Errorf("SafeSubtract(%d, %d) unexpected error: %v", tt.a, tt.b, err)
            }
            if got != tt.want {
                t.Errorf("SafeSubtract(%d, %d) = %d; want %d", tt.a, tt.b, got, tt.want)
            }
        })
    }
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Unit Testing in Go - A Beginner's Guide",
  "desc": "If you're learning Go and you’re already familiar with the idea of unit testing, the main challenge is usually not why to test, but how to test in Go. Go takes a deliberately minimal approach to testing. There are no built-in assertions, no annotatio...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/unit-testing-in-go-a-beginners-guide.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
