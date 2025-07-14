---
lang: en-US
title: "Kotlin Compiler Plugins"
description: "Article(s) > Kotlin Compiler Plugins"
icon: iconfont icon-kotlin
category:
  - Java
  - Kotlin
  - Article(s)
tag:
  - blog
  - kt.academy
  - java
  - kotlin
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Kotlin Compiler Plugins"
    - property: og:description
      content: "Kotlin Compiler Plugins"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/ak-compiler-plugin.html
prev: /programming/java/articles/README.md
date: 2025-03-03
isOriginal: false
author: 
  - name: Marcin Moskała
    url: https://kt.academy/user/marcinmoskala
cover: https://marcinmoskala.com/advanced-kotlin-book/promotion/12_compiler_plugin.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Kotlin > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Kotlin Compiler Plugins"
  desc="All you need to know about Kotlin Compiler plugins."
  url="https://kt.academy/ak-compiler-plugin"
  logo="https://kt.academy/logo.png"
  preview="https://marcinmoskala.com/advanced-kotlin-book/promotion/12_compiler_plugin.jpg"/>

::: info

This is a chapter from the book [<FontIcon icon="fas fa-globe"/>Advanced Kotlin](https://kt.academy/book/advanced_kotlin). You can find it on [<FontIcon icon="fas fa-globe"/>LeanPub](https://leanpub.com/advanced_kotlin/) or [<FontIcon icon="fa-brands fa-amazon"/>Amazon](https://amazon.com/Advanced-Kotlin-Developers-Marcin-Moskala/dp/839668474X/).

The Kotlin Compiler is a program that compiles Kotlin code but is also used by the IDE to provide analytics for code completion, warnings, and much more. Like many programs, the Kotlin Compiler can use plugins that change its behavior. We define a Kotlin Compiler plugin by extending a special class, called an extension, and then register it using a registrar. Each extension is called by the compiler in a certain phase of its work, thereby potentially changing the result of this phase. For example, you can register a plugin that will be called when the compiler generates supertypes for a class, thus adding additional supertypes to the result. When we write a compiler plugin, we are limited to what the supported extensions allow us to do. We will discuss the currently available extensions soon, but let's start with some essential knowledge about how the compiler works.

---

## Compiler frontend and backend

Kotlin is a multiplatform language, which means the same code can be used to generate low-level code for different platforms. It is reasonable that Kotlin Compiler is divided into two big parts:

- Frontend, responsible for parsing and transforming Kotlin code into a representation that can be interpreted by the backend and used for Kotlin code analysis.
- Backend, responsible for generating actual low-level code based on the representation received from the frontend.

The compiler frontend is independent of the target, and its results can be reused when we compile a multiplatform module. However, there is a revolution going on at the moment because a new K2 frontend is replacing the older K1 frontend.

The compiler backend is specific to your compilation target, so there is a separate backend for JVM, JS, Native, and WASM. They have some shared parts, but they are essentially different.

![Compiler frontend is responsible for parsing and analyzing Kotlin code and transforming it into a representation that is sent to the backend, on the basis of which the backend generates platform-specific files. The frontend is target-independent, but there are two frontends: older K1, and newer K2. The backend is target-specific.](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fadvanced-kotlin-book%2Fmanuscript%2Fresources%2Fcompiler_frontend_backend.png&w=1080&q=75)

When you use Kotlin in an IDE like IntelliJ, the IDE shows you warnings, errors, component usages, code completions, etc., but IntelliJ itself doesn’t analyze Kotlin: all these features are based on communication with the Kotlin Compiler, which has a special API for IDEs, and the frontend is responsible for this communication.

Each backend variant shares a part that generates Kotlin *intermediate representation* from the representation provided by the frontend (in the case of K2, it is FIR, which means *frontend intermediate representation*). Platform-specific files are generated based on this representation.

![Each backend shares a part that transforms the representation provided by the frontend into Kotlin intermediate representation, which is used to generate target-specific files.](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fadvanced-kotlin-book%2Fmanuscript%2Fresources%2Fcompiler_bckend_ir.png&w=1080&q=75)

You can find detailed descriptions of how the compiler frontend and the compiler backend work in many presentations and articles, like those by Amanda Hinchman-Dominguez or Mikhail Glukhikh. I won’t go into detail here because we’ve already covered everything we need in order to talk about compiler plugins.

---

## Compiler extensions

Kotlin Compiler extensions are also divided into those for the frontend or the backend. All the frontend extensions start with the `Fir` prefix and end with the `Extension` suffix. Here is the complete list of the currently supported K2 extensions[^1]

- `FirStatusTransformerExtension` - called when an element status (visibility, modifiers, etc.) is established and allows it to be changed. The All-open compiler plugin uses it to make all classes with appropriate annotations open by default (e.g., used by Spring Framework).
- `FirDeclarationGenerationExtension` - can specify additional declarations to be generated for a Kotlin file. Its different methods are called at different phases of compilation and allow the generation of different kinds of elements, like classes or methods. Used by many plugins, including the Kotlin Serialization plugin, to generate serialization methods.
- `FirAdditionalCheckersExtension` - allows the specification of additional checkers that will be called when the compiler checks the code; it can also report additional errors or warnings that can be visualized by IntelliJ.
- `FirSupertypeGenerationExtension` - called when the compiler generates supertypes for a class and allows additional supertypes to be added. For instance, if the class `A` inherits from `B` and implements `C`, and the extension decides it should also have supertypes `D` and `F`, then the compiler will consider `A` to have supertypes `B`, `C`, `D` and `F`. Used by many plugins, including the Kotlin Serialization plugin, which uses it to make all classes annotated with the `Serializer` annotation have an implicit `KSerializer` supertype with appropriate type arguments.
- `FirTypeAttributeExtension` - allows an attribute to be added to a type based on an annotation or determines an annotation based on an attribute. Used by the experimental Kotlin Assignment plugin, which allows a number type to be annotated as either positive or negative and then uses this information to throw an error if this contract is broken. Works with the code of libraries used by our project.
- `FirExpressionResolutionExtension` - can be used to add an implicit extension receiver when a function is called. Used by the experimental Kotlin Assignment plugin, which injects `Algebra<T>` as an implicit receiver if `injectAlgebra<T>()` is called.
- `FirSamConversionTransformerExtension` - called when the compiler converts a Java SAM interface to a Kotlin function type and allows the result type to be changed. Used by the `SAM-with-receiver compiler plugin` to generate a function type with a receiver instead of a regular function type for SAM interfaces with appropriate annotation.
- `FirAssignExpressionAltererExtension` - allows a variable assignment to be transformed into any kind of statement. Used by the experimental Kotlin Assignment plugin, which allows the assignment operator to be overloaded.
- `FirFunctionTypeKindExtension` - allows additional function types to be registered. Works with the code of libraries used by our project.
- `FirDeclarationsForMetadataProviderExtension` - currently allows additional declarations to be added in Kotlin metadata. Used by the Kotlin Serialization plugin to generate a deserialization constructor or a method to write itself. Its behavior might change in the future.
- `FirScriptConfiguratorExtension` - currently called when the compiler processes a script; it also allows the script configuration to be changed. Its behavior might change in the future.
- `FirExtensionSessionComponent` - currently allows additional extension session components to be added for a session. In other words, it allows a component to be registered so that it can be reused by different extensions. Used by many plugins. For instance, the Kotlin Serialization plugin uses it to register a component that keeps a cache of serializers in a file or KClass first from file annotation. Its behavior might change in the future.

::: note

Beware! In this chapter we only discuss K2 frontend extensions because the K1 frontend is deprecated and will be removed in the future. However, the K2 compiler frontend is currently not used by default. To use it, you need to have at least Kotlin version 1.9.0-Beta and add the `-Pkotlin.experimental.tryK2=true` compiler option.

:::

As you can see, these plugins allow us to apply changes to compilation and analysis. They can be used to show a warning or break compilation with an error. They can also be used to change the visibility of specific elements, thus influencing the behavior of the resulting code and suggestions in IDE.

Regarding the backend, there is only one extension: `IrGenerationExtension`. It is used after IR (Kotlin intermediate representation) is generated from the FIR (frontend intermediate representation) but before it is used to generate platform-specific files. `IrGenerationExtension` is used to modify the IR tree. This means that `IrGenerationExtension` can change absolutely anything in the generated code, but using it is hard as we can easily introduce breaking changes, so it must be used with great care. Also, `IrGenerationExtension` cannot influence code analysis, so it cannot impact IDE suggestions, warnings, etc.

![Backend plugin extensions are used after IR (Kotlin Intermediate Representation) is generated from the FIR (frontend intermediate representation), but before it is used to generate platform-specific files.](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fadvanced-kotlin-book%2Fmanuscript%2Fresources%2Fbackend_plugin_place.png&w=1080&q=75)

I want to make it clear that the backend cannot influence IDE analysis. If you use `IrGenerationExtension` to add a method to a class, you won’t be able to call it directly in IntelliJ because it won’t recognize such a method, so you will only be able to call it using reflection. In contrast, a method added to a class using the frontend `FirDeclarationGenerationExtension` can be used directly because the IDE knows about its existence.

The majority of popular Kotlin plugins require multiple extensions, both frontend and backend. For instance, Kotlin Serialization uses backend extensions to generate all the functions for serialization and deserialization; on the other hand, it uses frontend extensions to add implicit supertypes, checks and declarations.

This is the essential knowledge about Kotlin Compiler plugins. To make it a bit more practical, let's take a look at a couple of examples.

---

## Popular compiler plugins

Many compiler plugins and libraries that use compiler plugins are already available. The most popular ones are:

- Kotlin Serialization: a plugin that generates serialization methods for Kotlin classes. It’s multiplatform and very efficient because it uses a compiler plugin instead of reflection.
- Jetpack Compose: a popular UI framework that uses a compiler plugin to support its view element definitions. All the composable functions are transformed into a special representation that is then used by the framework to generate the UI.
- Arrow Meta: a powerful plugin introducing support for features known from functional programming languages, like optics or refined types. It also supports Aspect Oriented Programming.
- Parcelize: a plugin that generates `Parcelable` implementations for Kotlin classes. It uses a compiler plugin to add appropriate methods to existing classes.
- All-open: a plugin that makes all classes with appropriate annotations open by default. The Spring Framework uses it to make all classes with `@Component` annotation open by default (to be able to create proxies for them).

The majority of plugins use more than one extension, so let’s consider the simple Parcelize plugin, which uses only the following extensions:

- `IrGenerationExtension` to generate functions and properties that are used under the hood.
- `FirDeclarationGenerationExtension` to generate the functions required for the project to compile.
- `FirAdditionalCheckersExtension` to show errors and warnings.

Kotlin compiler plugins are defined in <FontIcon icon="iconfont icon-kotlin"/>`build.gradle(.kts)` in the plugins section:

::: tabs

@tab:active <FontIcon icon="iconfont icon-gradle"/>build.gradle

```groovy title='build.gradle"
plugins {
  id 'kotlin-parcelize'
}
```

<!-- @tab <FontIcon icon="iconfont icon-kotlin"/>build.gradle.kts

```kotlin title="build.gradle.kts"
plugins {
  id("kotlin-parcelize")
}
``` -->

:::
<!-- TODO: find why there's syntax error -->

Some plugins are distributed as part of individual Gradle plugins.

---

## Making all classes open

We’ll start our journey with a simple task: make all classes open. This behavior is inspired by the AllOpen plugin, which opens all classes annotated with one of the specified annotations. However, our example will be simpler as we will just open all classes.

As a dependency, we only need `kotlin-compiler-embeddable` that offers us the classes we can use for defining plugins.

Just like in KSP or Annotation Processing, we need to add a file to <FontIcon icon="fas fa-folder-open"/>`resources/META-INF/services` with the registrar's name. The name of this file should be `org.jetbrains.kotlin.compiler.plugin.CompilerPluginRegistrar`, which is the fully qualified name of the `CompilerPluginRegistrar` class. Inside it, you should place the fully qualified name of your registrar class. In our case, this will be `com.marcinmoskala.AllOpenComponentRegistrar`.

```kotlin
// org.jetbrains.kotlin.compiler.plugin.
// CompilerPluginRegistrar
com.marcinmoskala.AllOpenComponentRegistrar
```

Our `AllOpenComponentRegistrar` registrar needs to register an extension registrar (we’ll call it `FirAllOpenExtensionRegistrar`), which registers our extension. Note that the registrar has access to the configuration so that we can pass parameters to our plugin, but we don’t need this configuration now. Our extension is just a class that extends `FirStatusTransformerExtension`; it has two methods: `needTransformStatus` and `transformStatus`. The former determines whether the transformation should be applied; the latter applies it. In our case, we apply our extension to all classes, and we change their status to open, regardless of what this status was before.

```kotlin :collapsed-lines
@file:OptIn(ExperimentalCompilerApi::class)

class AllOpenComponentRegistrar : CompilerPluginRegistrar() {
    override fun ExtensionStorage.registerExtensions(
        configuration: CompilerConfiguration
    ) {
        FirExtensionRegistrarAdapter
            .registerExtension(FirAllOpenExtensionRegistrar())
    }

    override val supportsK2: Boolean
       get() = true
}

class FirAllOpenExtensionRegistrar : FirExtensionRegistrar() {
    override fun ExtensionRegistrarContext.configurePlugin() {
        +::FirAllOpenStatusTransformer
    }
}

class FirAllOpenStatusTransformer(
    session: FirSession
) : FirStatusTransformerExtension(session) {
    override fun needTransformStatus(
        declaration: FirDeclaration
    ): Boolean = declaration is FirRegularClass

    override fun transformStatus(
        status: FirDeclarationStatus,
        declaration: FirDeclaration
    ): FirDeclarationStatus =
        status.transform(modality = Modality.OPEN)
}
```

This is just a simplified version, but the actual AllOpen plugin is slightly more complicated as it only opens classes that are annotated with one of the specified annotations. For that, `FirAllOpenExtensionRegistrar` registers a plugin that is used by `FirAllOpenStatusTransformer` to determine if a specific class should be opened or not. If you are interested in the details, see the AllOpen plugin in the `plugins` folder in the Kotlin repository.

---

## Changing a type

Our following example will be the SAM-with-receiver compiler plugin, which changes the type of function types generated from SAM interfaces with appropriate annotations to function types with a receiver. It uses the `FirSamConversionTransformerExtension`, which is quite specific to this plugin because it is only called when a SAM interface is converted to a function type, and it allows the type that will be generated to be changed. This example is interesting because it adds a type that will be recognized by the IDE and can be used directly in code. The complete implementation can be found in the Kotlin repository in the `plugins/sam-with-receiver` folder, but here I only want to show a simplified implementation of this extension:

```kotlin :collapsed-lines
class FirScriptSamWithReceiverConventionTransformer(
    session: FirSession
) : FirSamConversionTransformerExtension(session) {
    override fun getCustomFunctionTypeForSamConversion(
        function: FirSimpleFunction
    ): ConeLookupTagBasedType? {
        val containingClassSymbol = function
            .containingClassLookupTag()
            ?.toFirRegularClassSymbol(session)
            ?: return null

        return if (shouldTransform(it)) {
            val parameterTypes = function.valueParameters
                .map { it.returnTypeRef.coneType }
            if (parameterTypes.isEmpty()) return null
            createFunctionType(
                getFunctionType(it),
                parameters = parameterTypes.drop(1),
                receiverType = parameterTypes[0],
                rawReturnType = function.returnTypeRef
                    .coneType
            )
        } else null
    }

    // ...
}
```

If the `getCustomFunctionTypeForSamConversion` function doesn’t return `null`, it overrides the type that will be generated for a SAM interface. In our case, we determine whether the function should be transformed; if so, we create a function type with a receiver by using the `createFunctionType` function. There are builder functions that help us to create many elements that are represented in FIR. Examples include `buildSimpleFunction` or `buildRegularClass`, and most of them offer a simple DSL. Here, the `createFunctionType` function creates a function type with a receiver representation of type `ConeLookupTagBasedType`, which will replace automatically generated types from a SAM interface. In essence, this is how this plugin works.

---

## Generate function wrappers

Let's consider the following problem: Kotlin suspend functions can only be called in Kotlin code. This means that if you want to call a suspend function from Java, you can use, for example, `runBlocking` to wrap it in a regular function that calls the suspend function in a coroutine.

```kotlin
suspend fun suspendFunction() = /* ... */

fun blockingFunction() = runBlocking { suspendFunction() }
```

We might use a plugin to generate such wrappers over suspend functions automatically using either a backend or a frontend plugin.

A backend plugin would require an extension for `IrGenerationExtension` that generates an additional wrapper function in IR for the appropriate function. These wrapper functions will be present in the generated platform-specific code and are therefore available for Java, Groovy, and other languages. The problem is that these wrapper classes will not be visible in Kotlin code. This is fine if our wrapper functions are meant to be used from other languages anyway, but we need to know about this serious limitation. There is an open-source plugin called kotlin-jvm-blocking-bridge that generates blocking wrappers for suspend functions using a backend plugin; you can find its source code under the link `github.com/Him188/kotlin-jvm-blocking-bridge`.

A frontend plugin would require an extension for the class `FirDeclarationGenerationExtension` to generate wrapper functions for the appropriate suspend functions in FIR. These additional functions would then be used to generate IR and finally platform-specific code. Those functions would also be visible in IntelliJ, so we would be able to use them in both Kotlin and Java. However, such a plugin would only work with the K2 compiler, so since Kotlin 2.0. To support the previous language version, we need to define an additional extension that supports K1. ---

## Example plugin implementations

Kotlin Compiler Plugins are currently not documented, and generated elements must respect many restrictions for our code to not break, so defining custom plugins is quite hard. If you want to define your own plugin, my recommendation is to first get the Kotlin Compiler sources and then analyze the existing plugins in the `plugins` folder.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fadvanced-kotlin-book%2Fmanuscript%2Fresources%2Fplugins_folder.png&w=1080&q=75)

This folder includes not only K2 plugins but also K1 and KSP-based plugins. We are only interested in K2 plugins, so you can ignore the rest.

A list of all the supported extensions can be found in the `FirExtensionRegistrar` class. To analyze how the compiler uses an extension, you can search for the usage of its open methods. To do this, hit command/Ctrl and click on a method name to jump to its usage. This should show you where the Kotlin Compiler uses this extension. Beware, though, that all the knowledge that is not documented is more likely to change in the future.

---

## Summary

As you can see, the capabilities of Kotlin Compiler Plugins are determined by the extensions supported by the Kotlin Compiler. On the compiler’s frontend, these extension capabilities are limited, so there is currently only a specific set of things that can be done on the frontend with Kotlin Compiler Plugins. On the compiler backend, you can change generated IR representation in any way; this offers many possibilities but can also easily cause breaking changes in your code.

Kotlin Compiler Plugins technology is still young, undocumented, and changing. It should be used with great care as it can easily break your code, but it is also extremely powerful and offers possibilities beyond comprehension. Jetpack Compose is a great example. I have only been able to share with you the general idea of how Kotlin Compiler Plugins work and what they can do, but I hope it is enough for you to understand the key concept and possibilities.

In the next chapter, we will talk about another tool that helps with code development: static code analyzers. On the one hand, it is more limited than KSP or Compiler Plugins because it cannot generate any code; on the other hand, static code analyzers are also extremely powerful as they can seriously influence our development process and help us improve our actual code.

[^1]: K1 extensions are deprecated, so I will just skip them.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Kotlin Compiler Plugins",
  "desc": "All you need to know about Kotlin Compiler plugins.",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/ak-compiler-plugin.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
