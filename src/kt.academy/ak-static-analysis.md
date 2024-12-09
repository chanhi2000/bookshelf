---
lang: en-US
title: "Static Code Analysers"
description: "Article(s) > Static Code Analysers"
icon: iconfont icon-kotlin
category: 
  - Java
  - Kotlin
  - Detekt
  - Article(s)
tag: 
  - blog
  - kt.academy
  - java
  - kotlin
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Static Code Analysers"
    - property: og:description
      content: "Static Code Analysers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/ak-static-analysis.html
prev: /programming/java/articles/README.md
date: 2024-01-22
isOriginal: false
author: Nicola Corti
cover: https://marcinmoskala.com/advanced-kotlin-book/promotion/13_static_analysis.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Java > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Static Code Analysers"
  desc="All you need to know about Static Code Analysers and Detekt."
  url="https://kt.academy/article/ak-static-analysis"
  logo="https://kt.academy/logo.png"
  preview="https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fadvanced-kotlin-book%2Fpromotion%2F13_static_analysis.jpg&w=1080&q=75"/>

::: note

This is a chapter from the book [Effective Kotlin](/book/effectivekotlin). You can find it on [<FontIcon icon="fas fa-globe"/>LeanPub](https://leanpub.com/effectivekotlin) or [<FontIcon icon="fa-brands fa-amazon"/>Amazon](https://amazon.com/Effective-Kotlin-Best-Practices-Developers-ebook/dp/B0CHBR5XPF/).

> This chapter was written by Nicola Corti, who is the best person I could ask to write about Static Code Analysers. He is one of the maintainers of detekt and the author of many of its rules; he is also a well-known speaker and a true programming practitioner.

:::

One could argue that what distinguishes a novice Kotlin developer from a senior one is their mastery of recognizing and appropriately using idiomatic patterns.

Learning how to write a “Hello, world!” or a simple `for` loop takes no longer than a couple of hours, but learning how to use advanced techniques such as generics, delegation, and reflection can take much longer. Some of these patterns require years of experience to be fully mastered. After all, you don't expect a junior Kotlin engineer to write an annotation processor.

Discovering recurring patterns and applying them has always been a problem in the field of computer science.

That's why engineers who work on programming language tools, such as compilers, have also developed tools to help engineers identify recurrent patterns: these are called **static analysers**. While you're already taking a step toward mastering these patterns by reading this book, having a tool that automatically discovers and applies them will take you to the next level.

For example, several of the patterns that are described in the “Effective Kotlin” book can be automated with the help of static analysers.

However, the real power of static analysers lies in the fact that they can be customized, therefore you can discover and enforce your **own** patterns. When working on bigger codebases with hundreds of contributors, you can't really rely only on code reviews. It's crucial to have tools that automate and help you bring consensus and arbitrate conflict between developers. That's why static analysers are tools that should never be missing in the advanced Kotlin developer's toolbox.

In this chapter, we'll walk through the basics of static analysis, and we'll learn how to use one of the most popular static analysers for Kotlin: **detekt**.

---

## What are Static Analysers?

As the name suggests, static analysers are tools that spot bugs and recurrent patterns by analysing your code statically, i.e., without running it[^12].

Running your code is generally considered an expensive operation. Think about Kotlin/JVM, where you need to start a Java Virtual Machine, or Android, where you need an emulator or a physical device to run your code. One technique that can be used to protect your code from bugs is writing tests! They're a great tool to prevent bugs from reaching production, but they require a runtime and are an expensive operation that becomes more and more expensive as your codebase grows.

On the other hand, static analysers look at your code without executing it at all, so there is no need to start a runtime environment at all.

For example, there is no need to execute your code to warn you that you’ve declared a variable that you're not using. A static analyser can keep track of all the variables you’ve declared and those you access. The ones you declare but never access are most likely[^0] unused and can be removed.

Static analysers can leverage language-specific properties to determine the correctness of your code. For instance, the Kotlin type system can be used to infer types and use type information to do further analysis, similarly to how the Kotlin compiler does. Let's take a look at this simple example:

```kotlin
fun getTheAnswer(answer: String = "24"): String {
   return answer?.reversed()!!
}
```

This code behaves correctly in the sense that it correctly returns “42” when `getTheAnswer` is invoked. You could write a unit test for it and confirm that the result is as expected, but we could immediately spot a couple of potential problems just by looking at it: as the type of `answer` is a non-nullable `String`, there is no need to use either the `?.` (safe call) or the `!!` (not-null assert) operator. Instead, the return expression can be simplified to just `return answer.reversed()`[^13].

A static analyser can help you with this and other types of inspection, which could be helpful to enforce a style guide across your codebase (e.g., all unnecessary usages of `import` should be removed). Other types could help prevent potential bugs ending up in your codebase (e.g., when an expression’s return value is ignored and never used).

Static analysers are often referred to as 'linters', a term which comes from 'lint', the first static analyser for C, developed in the 70s[^1]. Lint itself takes its name from the tiny bits of fabric that appear on your clothes as you wear them. A linter should inspect your codebase and capture all these small imperfections and potential problems.

![A real-world linter. Similarly, a static analyser inspects your codebase and captures potential bugs and problems before they hit production. Photo is licensed under Creative Commons - [Source](https://pexels.com/photo/woman-in-black-long-sleeve-shirt-holding-a-lint-roller-6865186/)](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fadvanced-kotlin-book%2Fmanuscript%2Fresources%2F13_real_world_linter.jpg&w=576&q=75)

Now, you might think that a static analyser’s goal is really similar to another popular process in IT: code reviews.

When you review another engineer's code, you look at it and try to spot potential bugs. I like to think of static analysers and code reviews as complementary, but there is a difference: the former help you spot and automate a lot of recurring coding issues, while the latter are crucial to ensure high code quality and share responsibility for shipped changes. Unfortunately, static analysers can't currently fully understand a developer’s intent. You could potentially ship malicious code or “beautifully broken code” that is fully compliant with static analysers as it passes all the checks.

Perhaps, in a not too distant future, advanced AI models could power static analysers to fully automate the code review process. At the time of writing, this is not the case, so code reviews are still considered a fundamental process and are widely adopted in the IT sector.

In academia, static analysers are a vast subject of study and research. Researchers have developed numerous techniques to formally verify that code satisfies requirements and behaves as expected. Formally verifying code behavior can be business-critical in various sectors (think about software in the medical or aerospace industries).

It's outside the scope of this chapter to present all the formal methods of inspecting and verifying your code, but you can find plenty of literature on this. However, to better understand the tools available in the Kotlin ecosystem, we'll walk through some of the various types of static analysers for Kotlin.

---

## Types of analysers

It's hard to make a neat division in the ecosystem of static analysers, as you'll find a plethora of tools doing all sorts of inspection and automation. Here we present some of the most popular families of analysers. Beware that this categorization is not exhaustive, and there are tools that fit in multiple categories.

### Formatters

If you’ve written any code, you’ve probably already interacted with formatters, which are responsible for making sure your code follows a coding convention[^3]. They can help you with simple tasks such as removing unnecessary white spaces and making sure your files have the correct copyright headers.

Most of the time, formatters are embedded inside your IDEs and auto-format your code when you save your files. Formatters are typically referred to as pretty-printers or beautifiers.

Each popular programming language has a set of formatters in its ecosystem. Popular formatters in the industry are tools like [<FontIcon icon="fas fa-globe"/>Prettier](https://prettier.io/) for Web, the various `*fmt` tools like [<FontIcon icon="fa-brands fa-golang"/>`gofmt`](https://go.dev/blog/gofmt) for Go, and [<FontIcon icon="iconfont icon-github"/>`rust-lang/rustfmt`](https://github.com/rust-lang/rustfmt) for Rust.

Kotlin has various formatters to pick from: IntelliJ's built-in formatter [<FontIcon icon="iconfont icon-github"/>`pinterest/ktlint`](https://github.com/pinterest/ktlint) [<FontIcon icon="iconfont icon-github"/>`facebook/ktfmt`](https://github.com/facebook/ktfmt) [<FontIcon icon="iconfont icon-github"/>`saveourtool/diktat`](https://github.com/saveourtool/diktat)

Enforcing coding conventions and reducing *bikeshedding* is a common challenge for large engineering teams.

You probably don't want to manually read every line of code change to evaluate whether it conforms to the common patterns. You may also not want to waste a significant amount of time with your colleagues arguing over whether curly braces should be put on a newline or not.

Formatters increase productivity by allowing you to have such discussions once during the initial configuration and objectively apply your preferred style to every code change.

### Code Quality Analysers

Code quality analysers perform more advanced inspections than formatters. Generally, they operate on a tree-like representation of your code called an Abstract Syntax Tree (AST).

With an Abstract Syntax Tree, analysers can inspect specific nodes of the tree to perform inspections. Static analysers generally use the visitor pattern to register inspection on specific nodes of an AST.

Say, for example, you want to prevent usage of the `println` function in your codebase as you have a dedicated logger and want to ensure all logging goes through it.

Your inspector can ask to visit all the nodes in your AST that are of type “function call”. On these nodes, the inspector will report a finding whenever the caller function is `println`[^4].

The amount of information available in an AST might vary depending on different tools and the type of inspection that you're interested in doing. Sometimes, it is sufficient to have only syntactic information in the AST (e.g., the name of the parameters), but for more advanced inspections you might need an AST which has type information linked to it (e.g., the return type of a function invoked from a third-party library).

Popular code quality analysers in the industry are tools like [<FontIcon icon="fas fa-globe"/>Checkstyle](https://checkstyle.org/) for Java or [<FontIcon icon="fas fa-globe"/>ESlint](https://eslint.org/) for JavaScript.

### Data-Flow Analysers

Data-flow analysers operate by building a model that can determine at a particular point where values are coming from and what possible values can be produced.

As mentioned before, running your code is an expensive operation.

By looking at the expressions inside your code, a data-flow analyser can infer conditions and execution state without running your code.

Let's take a look at the following code:

```kotlin
val answer : String? = maybeGetTheAnswer()
if (answer != null) {
   println("The answer is $answer")
}
```

Reading this code, we know that the type of `answer` inside the if block is smart-casted to `String` and is not a `String?` anymore. The `!= null` check is effectively a type restriction on the set of possible values of `answer` and removes `null` from that set. Similarly, in a potential `else` branch or after the `if`, the set of possible values would be restricted to just `null`.

Data-flow analysers use the rules of the relevant programming language to compute the set of possible values of your identifier at each statement. With this information, you can perform more advanced analysis. For instance, you can inform the users of types that are too broad and can be restricted (e.g., an analyser could tell you to use `List` instead of `Collection` if the set of values is restricted to `List` only).

Kotlin uses data-flow analysis inside the compiler[^5] to power some of its popular features, such as smart-casting.

Most code quality analysers in the industry also do data-flow analysis but are just marketed as “static analysers”. Typically, they use AST analysis or data-flow analysis based on the type of inspection they need to run.

### Code Manipulation

All the previously mentioned tools inspect your code and raise warnings whenever they discover something untoward.

However, some tools can go one step further and **manipulate** your code if they find a violation.

Formatters manipulate your code as they usually provide a mechanism to “reformat” your codebase so that you don't have to edit the code manually.

Code quality analysers can also manipulate your code, but this isn’t always the case with formatters. For example, if an analyser discovers an unused variable, the manipulation would be to entirely remove the line where this variable is declared.

However, this is often considered an invasive operation as analysers generally need to perform substantial modification to make code conform to their rules. Sometimes, removing a line or an annotation is sufficient; other times, there are multiple solutions to a violation but the analyser can't pick one without a human decision. On top of this, newly created code could raise other violations or might be improperly formatted.

For this reason, static analysers tend to not manipulate code automatically; instead, they raise a violation warning and suggest one or more alternatives to resolve it.

### Embedded vs Standalone

Finally, it is worth noting that some static analysers are embedded in tools we use daily, while others are distributed as standalone software.

For instance, the Kotlin Compiler has a static analyser built-in that raises warnings while it compiles code. IntelliJ IDEA also has a built-in static analyser which offers inspections as you type, with code suggestions in the contextual menu.

On the other hand, tools like detekt, ktlint, and others are standalone. You can typically execute them from the command line by specifying your source files. These standalone static analysers offer plugins and integrations for the most popular developer environments (IntelliJ IDEA, Gradle, Visual Studio Code and so on). On top of this, standalone static analysers are generally better suited to be integrated with continuous integration servers or pre-commit hooks.

---

## Kotlin Code Analysers

Let's now walk through the various static analysers available for Kotlin in order to discover what they offer and understand how you can integrate them in your projects.

### Kotlin Compiler

As mentioned above, the Kotlin Compiler ships an embedded static analyser, which is already a great starting point for analyzing your Kotlin code.

Sadly, the Kotlin Compiler offers no easy way to write a custom inspection, so you'll have to resort to writing a custom Kotlin Compiler plugin. Moreover, the compiler doesn't offer an easy way to selectively toggle its inspections, so you'll always get all the warnings the compiler finds, and you won't be able to enable/disable some[^10]

The Kotlin Compiler also doesn’t ship with an embedded formatter, so you’ll need to resort to other tools for code formatting.

### IntelliJ IDEA

Alongside the Kotlin Compiler, JetBrains also ships a static analyser as part of IntelliJ IDEA.

This static analyser is user-friendly as it has a UI to configure it and offers suggestions inline. On the other hand, these inspections require an IntelliJ installation to run, therefore they’re less portable and less suitable for continuous integration servers.

IntelliJ IDEA also offers an embedded formatter, making it a great companion for the Kotlin Compiler.

### `pinterest/ktlint`

[`pinterest/ktlint`](https://pinterest.github.io/ktlint/) is a standalone formatter for Kotlin which offers great configurability and allows you to easily reformat your code. Ktlint is well established in the Kotlin community and has been maintained in open-source. It can be extended with custom rules and integrated with Gradle, Maven, IntelliJ, or even Vim via third-party plugins.

### `facebook/ktfmt`

[`facebook/ktfmt`](https://facebook.github.io/ktfmt/) is another standalone formatter for Kotlin, but it has a more opinionated take on code-formatting. ktfmt is non-configurable and less extensible than ktlint, with the intention to reformat code in a stricter manner. Thanks to third-party plugins, ktfmt can be easily integrated with IntelliJ, Gradle or Maven.

### Android Lint

[Android Lint](https://developer.android.com/studio/write/lint) is a static analyser for Android. It offers inspections which are Android specific, so it can inspect not only Java and Kotlin files, but also Gradle files and XML files (and other Android-related files). Android Lint is integrated inside Android Studio and it's probably the best pick for developers looking to integrate static analysis in their Android projects. The Android Studio integration allows Android Lint to also act as a code manipulator by offering *quick fixes*: small tooltips on top of the inspection that allow the user to selectively apply the suggested changes. Android Lint is also extensible with custom detectors and can be executed via Gradle or as a standalone tool, without needing to have Android Studio installed.

### detekt

[detekt](https://detekt.dev/) is a standalone static-analyser for Kotlin. Unlike Android Lint, it's general purpose and focuses only on Kotlin code. It can't inspect Java code, but it's easier to integrate in any Kotlin project.

detekt is community developed and, at the time of writing, offers more than 300 inspections. It primarily offers a Gradle plugin and a Kotlin Compiler plugin to integrate with existing projects. Moreover, detekt can be integrated with IntelliJ IDEA, Maven, Bazel and much more.

One key feature of detekt is its extensibility, which makes it easier to write custom rules to achieve your desired inspections. Let's take a closer look at how you can configure and customize it.

---

## Setting up detekt

Over the rest of this chapter, we’ll look at practical examples of how to use detekt inside your projects. We chose detekt as the preferred tool because of its great flexibility, and we will learn how you can write a custom rule for it.

Let's start by configuring detekt as part of your Gradle project. For the sake of brevity, we’ll assume you already have a single-module Gradle setup which builds properly.

To set up detekt, you just need to edit your <FontIcon icon="iconfont icon-gradle"/>`build.gradle.kts` file as follows:

```groovy title="build.gradle.kts"
plugins {
  kotlin("jvm") version "..."
  // Add this line
  id("io.gitlab.arturbosch.detekt") version "..."
}
```

This line adds the Detekt Gradle Plugin to your project and is sufficient to set up detekt in your project with the default configuration.

You can see it in action by invoking the `build` Gradle task from the command-line:

```sh
./gradlew build
# 
# BUILD SUCCESSFUL in 549ms
```

As an alternative, you can also invoke the `detekt` task directly with `./gradlew detekt`

Now, if we try to run detekt on a simple file that contains the following:

::: kotlin-playground 1

@file main.kt

```kotlin
fun main() {
    println(42)
}
```

:::

we will receive the following output:

```sh
./gradlew build
# 
# > Task :example:detekt FAILED
# /tmp/example/src/main/java/Main.kt:2:11: 
#   This expression contains a magic number. Consider
#   defining it to a well named constant. [MagicNumber]
# 
# [...]
# BUILD FAILED in 470ms
```

Here, detekt is flagging the number `42` as it's considered a "Magic Number", a number without a clear semantic which should be extracted as a well-named constant.

The ID of this violation is inside the square brackets (`MagicNumber`) and is important for several reasons:

- It is the name of the rule that generated this inspection. You can use it to search for documentation about this inspection on the detekt website.
- It can be used to suppress the inspection locally with a `@Suppress("MagicNumber")` annotation just above the offending statement.
- It can be used in the configuration file (see following sections) to configure the rule to adapt detekt to the style of your codebase.

This is just one very simple example of the various inspections that detekt offers, so let's take a closer look at some more of them.

### detekt Rules and Rulesets

The 200 inspections that detekt offers out of the box are called **rules**. Remembering all of them is hard, which is why they're organized in *rulesets*, collections of rules that serve the same purposes.

Let's take a brief look at them:

- `comments`: rules that help enforce good documentation of your functions and classes.
- `complexity`: rules that report unnecessary statements or complex code, like methods and interfaces that are larger than usual.
- `coroutines`: rules that report potential problems with Coroutines, such as usage of `GlobalScope` or other antipatterns.
- `empty-blocks`: rules that flag empty blocks and function bodies.
- `exceptions`: rules that inspect how your code throws and catches exceptions.
- `libraries`: rules that help library authors write good APIs.
- `naming`: rules that help you enforce naming conventions across your codebase.
- `performance`: rules that flag potential performance regressions in your code.
- `potential-bugs`: rules that flag code that could lead to potential bugs or crashes.
- `ruleauthors`: rules that help you write good external detekt rules.
- `style`: rules that check the style and formatting of your code and flag unnecessary code.

`potential-bugs` is one of detekt’s biggest rulesets and contains some of the most popular rules. An honorable mention goes to `DontDowncastCollectionTypes`, which was inspired by *Effective Kotlin: Item 1 - Limit Mutability*[^8]

On top of these rulesets, the community has developed a variety of third-party rules that serve specific purposes. For instance, a collection of rules that offer inspections specific to JetPack Compose is available. These and other rules are shared in the [detekt Marketplace](https://detekt.dev/marketplace).

### Configuring detekt

By default, detekt comes with a sensible default configuration. For example, not all the rules are enabled, while some rules are configured to suit a wide range of users.

However, you might want to enable/disable or customize some rules. To do so, you need to provide a YAML configuration file that lets you customize detekt as you prefer.

The easiest way to do this is to ask detekt to create one for you by invoking the `detektGenerateConfig` task as follows:

```sh
./gradlew detektGenerateConfig
# 
# > Task :example:detektGenerateConfig
# Successfully copied default config to
#   /tmp/example/config/detekt/detekt.yml
# 
# BUILD SUCCESSFUL in 473ms
# 1 actionable task: 1 executed
```

This will create a config file at the path shown in the console by copying the default detekt config file. The configuration file looks as follows:

```yaml title="src/main/resources/config/config.yaml"
...
comments:
  active: true
  AbsentOrWrongFileLicense:
    active: false
    licenseTemplateFile: 'license.template'
    licenseTemplateIsRegex: false
style:
  active: true
  MagicNumber:
    ignorePropertyDeclaration: true
    ignoreAnnotation: true
    ignoreEnums: true
    ignoreNumbers:
      - '-1'
      - '0'
      - '1'
...
```

Rules are grouped by ruleset, and you can toggle each rule via the `active` key. For instance, the `AbsentOrWrongFileLicense` rule is disabled by default as you need to provide a `licenseTemplateFile` to enable it.

### Incremental Adoption

When running detekt on a big codebase for the first time, you could be overwhelmed by the number of findings that detekt reports. Fixing them all at once could be unfeasible, so you should probably take an incremental approach to adopting detekt.

You could use the config file to disable some rules. This has the side effect of also turning off the inspection entirely for newer code added to your codebase.

A smarter approach is to use a **baseline**, which is a snapshot of a detekt run that can be used to suppress a group of inspections for future runs of detekt. Using a baseline is a two-step process:

Create the baseline with the `detektBaseline` task. detekt will run and then store all its findings in a baseline file in XML format, with the filename and line of each finding. You can then subsequently run detekt as usual with the `detekt` command. detekt will not report any issues which are listed in the baseline.

Here is an example of how a baseline file looks for a simple project with a couple of findings:

```xml
<SmellBaseline>
  <ManuallySuppressedIssues/>
  <CurrentIssues>
  <ID>ImplicitUnitReturnType:HelloWorld.kt$Hello$fun 
    aFunctionWithImplicitUnitReturnType()</ID>
  </CurrentIssues>
</SmellBaseline>
```

Baselines are also common in other static analysers and are a great tool to incrementally introduce and enable new rules to your codebase. They can also be useful when dealing with legacy code or massive codebases contributed to by multiple developers.

---

## Writing your first detekt Rule

Now that you know the basics of how to use detekt, it's time to learn how to write a custom rule to run your own inspection.

### Setting up your rule project

To get you up to speed with new detekt rules, you can use the official template for custom rules: 

<SiteInfo
  name="detekt/detekt-custom-rule-template"
  desc="A template to create custom rules for detekt"
  url="https://github.com/detekt/detekt-custom-rule-template/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/bc0e10892384361b9ecb8edd8c9aae26d225ecb04bca4cf5a4f24408ca02f229/detekt/detekt-custom-rule-template"/>

This will scaffold a new project for you with all the files needed to create a new rule. The crucial files to look into are:

.<FontIcon icon="fas fa-folder-open"/>`src/main/kotlin/org/example/detekt/`<FontIcon icon="iconfont icon-kotlin"/>`MyRule.kt` - the code of your rule. This is where your inspection logic will live. <FontIcon icon="fas fa-folder-open"/>`src/main/kotlin/org/example/detekt/`<FontIcon icon="iconfont icon-kotlin"/>`MyRuleSetProvider.kt` - the code of your ruleset. In order to be used, your rule needs to live inside a ruleset, which allows you to add multiple custom rules and distribute all of them together. .<FontIcon icon="fas fa-folder-open"/>`src/main/resources/config/`<FontIcon icon="iconfont icon-yaml"/>`config.yml` - the default config file for your rule. This is used to offer the default configuration for your rules.

Please note that detekt uses the Java Service Provider API, so the file inside <FontIcon icon="fas fa-folder-open"/>`src/main/resources/META-INF/services` is also needed to properly discover your ruleset. The template also comes with two tests that can help you write your rule.

### Coding your rule

When writing custom rules, the best approach to follow is Test-driven Development (TDD).

Let's write a rule that flags usages of `System.out.println()` and suggests replacing them with Kotlin's `println()`. So, the following code will flag the first statement but not the second:

::: kotlin-playground 2

@file main.kt

```kotlin
fun main() {
    // Non compliant
    System.out.print("Hello")

    // Compliant
    println("World!")
}
```

:::

Let's open the <FontIcon icon="fas fa-folder-open"/>`src/test/kotlin/org/example/detekt/`<FontIcon icon="iconfont icon-kotlin"/>`MyRuleTest.kt` and code our intention. A rule test looks as follows:

::: kotlin-playground 3

@file MyRuleTest.kt

```kotlin
@KotlinCoreEnvironmentTest
internal class MyRuleTest(
   private val env: KotlinCoreEnvironment
) {
  @Test
  fun `reports usages of System_out_println`() {
    val code = """
    fun main() {
        System.out.println("Hello")
    }
    """.trimIndent()
    
    val findings = MyRule(Config.empty)
                    .compileAndLintWithContext(env, code)
    // findings shouldHaveSize 1
  }

  @Test
  fun `does not report usages Kotlin's println`() {
    val code = """
      fun main() {
          println("Hello")
      }
      """.trimIndent()

    val findings = MyRule(Config.empty)
                    .compileAndLintWithContext(env, code)
    // findings shouldHaveSize 0
  }
}
```

@settings

```json
{
  "data-target-platform": "junit"
}
```

:::

:::

<!-- TODO: 활성화 -->

This test allows us to follow a declarative approach for our rule and define all of its requirements. Moreover, it is a great source of documentation for our rule, as other developers can immediately see which code triggers this inspection and which should not.

If we try to run these tests, they will both fail. Let's open the <FontIcon icon="iconfont icon-kotlin"/>`MyRule.kt` and code our rule.

The <FontIcon icon="iconfont icon-kotlin"/>`MyRule.kt` file created by the template looks like this:

```kotlin title="MyRule.kt"
class MyRule(config: Config) : Rule(config) {
    override val issue = Issue(
        javaClass.simpleName,
        Severity.CodeSmell,
        "Custom Rule",
        Debt.FIVE_MINS,
    )

    override fun visitClass(klass: KtClass) {
        // ...
    }
}
```

Let's walk through the code. We start by extending an external class provided by detekt: our rule is a class called `MyRule`, which extends detekt's `Rule` class. The `Config` parameter we pass to the constructor is what we can use to access the configuration file.

`Rule` is actually an abstract class and requires us to implement the `issue` property, which is a representation of the issue this rule is currently reporting; it contains the error message and information about the severity of the issue. Each rule can report one or more of these issues.

detekt performs code quality analysis and allows the Abstract Syntax Tree to be visited by overriding one of the various `visit*` methods. In the template, we implement the `visitClass` method that will allow each `class` declaration to be inspected.

As our rule is designed to inspect expressions, we need to implement the `visitDotQualifiedExpression` instead[^9]. To implement our rule, we'll have to implement the method as follows:

```kotlin title="MyRule.kt"
class MyRule(config: Config) : Rule(config) {
  override val issue = //...

  override fun visitDotQualifiedExpression(
    expression: KtDotQualifiedExpression
  ) {
    super.visitDotQualifiedExpression(expression)
    if (expression.text.startsWith("System.out.println")) {
      report(CodeSmell(
        issue,
        Entity.from(expression),
        "Use Kotlin stdlib's println instead.",
      ))
    }
  }
}
```

This implementation of `visitDotQualifiedExpression` checks if the expression starts with `System.out.println`; if it does, it reports an issue for it and invokes the `report` function from detekt. This also allows you to attach an error message and information on the relevant line and column.

It's worth noting that the first statement of `visit…` is a call to the superclass implementation of this method. This is needed to make sure we don't break the visitor pattern and is generally good practice when using inheritance.

If you try to run all tests again, you will see that they pass the tests, thus verifying that our rule implementation is correct.

Once you get more experienced with writing rules, you'll probably notice how using TDD (Test-driven Development) is a great approach. You can declare the snippets of code you wish to be flagged and then code your rule so that all your tests are green.

### Using your rule

Now that you’ve written and tested your rule, the last part is distributing it and letting others use it.

Your rule should be published to a Maven Repository[^11] and consumed like any other dependency in a Gradle project, but you’ll be using a `detektPlugin` dependency instead of an `implementation` dependency.

```groovy title="build.gradle.kt"
plugins {
    kotlin("jvm") version "..."
    id("io.gitlab.arturbosch.detekt") version "..."
}

dependencies {
    detektPlugin("org.example:detekt-custom-rule:...")
}
```

Users will then have to activate your rule in their config file:

```yaml title="config.yaml"
...
MyRuleSet:
  MyRule:
    active: true
...
```

And they’ll start seeing findings when they run detekt normally:

```sh
./gradlew build
# 
# > Task :example:detekt FAILED
# /tmp/example/src/main/java/Main.kt:2:11: 
#   Use Kotlin stdlib's println instead. [MyRule]
# 
# [...]
# BUILD FAILED in 470ms
```

### Rules with type resolution

This is a really simple rule that relies only on syntactic information as we treat code as just text. It's a good start and will cover most use cases, but a more precise way to perform these inspections would be to have a richer Abstract Syntax Tree which has type information. The current implementation does not ensure that the `System.out.println` you're invoking comes from the `java.lang` package and not from another `System` class the user created in their project.

To have access to richer Abstract Syntax trees, we would need to use a more advanced type of rule. These rules rely not on a single file but on the compile-time information for the entire project so that they can retrieve type information computed by the Kotlin compiler for every declaration and identifier. It's outside the scope of this book to deep dive into compiler topics or the PSI API as these are quite extensive and would probably require their own book to cover in detail.

You can find plenty of examples of more advanced rules in the detekt codebase, which can be used as a source of inspiration for your custom rules.

---

## Conclusion

In this chapter, we’ve discovered what static analysers are and which types of analyses they can perform. We’ve learned what the differences are between formatters, code quality analysers, data-flow analysers, and other types of analysers.

The Kotlin ecosystem is bursting with tools which offer all sorts of capabilities and can be integrated in the vast majority of projects. Some of these are first-party tools, like the Kotlin Compiler or IntelliJ IDEA, while others are community contributions, like detekt.

We’ve also learned how you can easily integrate detekt as part of your project, and how you can use the detekt config file and the baseline feature to incrementally adopt it in your projects.

But the real power of static analysers comes from their extensibility, which is why this chapter has shown you how to write your own custom detekt rules.

[0^]: Here we oversimplify the unused variable inspection. There are a variety of cases where you need to keep a variable even if it's not accessed; for instance, `public` definitions in a library module can't be removed if never accessed. If you're keen to learn more about this inspection, check the `UnusedPrivateMember` inspection [<FontIcon icon="fas fa-globe"/>page](https://detekt.dev/docs/rules/style/#unusedprivatemember).
[1^]: You can read more about the history of the Lint tool on the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Lint (software) Wikipedia page](https://en.wikipedia.org/wiki/Lint_(software))
[3^]: Kotlin has two popular guidelines, [<FontIcon icon="iconfont icon-jetbrains"/>JetBrain's Coding Convention](https://kotlinlang.org/docs/coding-conventions.html) and [<FontIcon icon="fa-brands fa-android"/>Google's Kotlin style guide](https://developer.android.com/kotlin/style-guide).
[4^]: If you're curious about this type of inspection, check the `ForbiddenMethodCalls` inspection [<FontIcon icon="fas fa-globe"/>source code](https://detekt.dev/docs/rules/style/#forbiddenmethodcall).
[5^]: An interesting read is the [<FontIcon icon="iconfont icon-jetbrains"/>Control- and data-flow analysis chapter](https://kotlinlang.org/spec/control--and-data-flow-analysis.html) of the Kotlin language spec.
[7^]: detekt already has such a rule called `ForbiddenMethodCalls`, which allows you to specify the methods you want to forbid.
[8^]: You can find more information on the `DontDowncastCollectionTypes` rule on its dedicated [page](https://detekt.dev/docs/rules/potential-bugs/#dontdowncastcollectiontypes)
[9^]: For the sake of brevity, we won’t explain every API that PSI and detekt expose for running inspections, but let's clarify the `visitDotQualifiedExpression` method. A dot-qualified expression is, as the name suggests, an expression which has a dot in it (e.g.., a fully qualified method call). We're interested in finding `System.out.println` calls, which are not fully qualified method calls (as they would be `java.lang.System.out.println`) but they have a dot in them, so they are treated as dot-qualified expressions in the AST.
[10^]: There is an [<FontIcon icon="iconfont icon-jetbrains"/>open issue](https://youtrack.jetbrains.com/issue/KT-8087) on JetBrains Issue Tracker about this specific problem.
[11^]: You don't necessarily need to publish to a remote repository like Maven Central. While testing, you can use Maven Local, which publishes the rule on your local computer, or you can use an internal repository for your organization.
[12^]: A common example of static analysers is spellcheckers. You probably use one daily when you write documents or emails. Similarly, a compiler also is a form of static analyser as it exposes warnings while it compiles your code.
[13^]: Please consider this simplified snippet as an example. In reality, even if you don't simplify this snippet, the compiler will do so for you during compilation.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Static Code Analysers",
  "desc": "All you need to know about Static Code Analysers and Detekt.",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/ak-static-analysis.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
