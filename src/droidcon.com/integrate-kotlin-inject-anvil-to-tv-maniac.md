---
lang: en-US
title: "Integrate Kotlin-Inject-Anvil To Tv Maniac"
description: "Article(s) > Integrate Kotlin-Inject-Anvil To Tv Maniac"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - Article(s)
tag:
  - blog
  - droidcon.com
  - java
  - kotlin
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Integrate Kotlin-Inject-Anvil To Tv Maniac"
    - property: og:description
      content: "Integrate Kotlin-Inject-Anvil To Tv Maniac"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/integrate-kotlin-inject-anvil-to-tv-maniac.html
prev: /programming/java-android/articles/README.md
date: 2024-12-12
isOriginal: false
author: Thomas Kioko™
cover: https://droidcon.com/wp-content/uploads/2024/12/0_Q0gZACq7a3T4cYeD-1024x683.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Android > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-android/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Integrate Kotlin-Inject-Anvil To Tv Maniac"
  desc="If you've used Anvil before, you know it takes away a lot of the boilerplate code and makes DI seamless. If Anvil is new to you, it basically allows you to contribute dagger modules and component interfaces to your DI graph, merge all the contributions, and add them to your component during compilation. Ralf Wonderatschek and Gabriel Peal gave an in-depth talk about this. Dagger + Anvil: Learning to Love Dependency Injection. You should check it out."
  url="https://droidcon.com/2024/12/12/integrate-kotlin-inject-anvil-to-tv-maniac"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/12/0_Q0gZACq7a3T4cYeD-1024x683.webp"/>

![Photo by [<VPIcon icon="fas fa-globe"/>Albert Stoynov](https://unsplash.com/@albertstoynov)](https://droidcon.com/wp-content/uploads/2024/12/0_Q0gZACq7a3T4cYeD-1024x683.webp)

---

## Intro

If you've used Anvil before, you know it takes away a lot of the boilerplate code and makes DI seamless. If Anvil is new to you, it basically allows you to contribute dagger modules and component interfaces to your DI graph, merge all the contributions, and add them to your component during compilation. Ralf Wonderatschek and Gabriel Peal gave an in-depth talk about this. [Dagger + Anvil: Learning to Love Dependency Injection.](/droidcon.com/dagger-anvil-learning-to-love-dependency-injection.md) You should check it out.

I have been using [<VPIcon icon="iconfont icon-github"/>`evant/kotlin-inject`](https://github.com/evant/kotlin-inject) on [my pet project (<VPIcon icon="iconfont icon-github"/>`thomaskioko/tv-maniac`)](https://github.com/thomaskioko/tv-maniac) for a while now, and I have had a good time with it, coming from using Dagger in other projects. One thing I missed was using Anvil. This was not available until recently, when [<VPIcon icon="iconfont icon-github"/>`amzn/kotlin-inject-anvil`](https://github.com/amzn/kotlin-inject-anvil?tab=readme-ov-file) joined the chat.

This is a blog of an ongoing series on my journey with Kotlin Multiplatform. This article will focus on my experience and journey integrating/migrating to kotlin-inject-anvil into the project.

- [<VPIcon icon="fas fa-globe"/>**Going Modular — The Kotlin Multiplatform Way**](https://betterprogramming.pub/going-modular-the-kotlin-multiplatform-way-132c3dee6c95)
- [**KMM Preferences Datastore** (<VPIcon icon="fa-brands fa-medium"/>`_thomaskioko`)](https://medium.com/@_thomaskioko/kmm-preferences-datastore-674382443262)
- [**KMP Environment Variables (Part 1)** (<VPIcon icon="fa-brands fa-medium"/>`_thomaskioko`)](https://medium.com/@_thomaskioko/kmm-environment-variables-part-1-877091c2d5b4)
- [**Intercepting Ktor Network Responses in Kotlin Multiplatform** (<VPIcon icon="fa-brands fa-medium"/>`proandroiddev`)](https://proandroiddev.com/intercepting-ktor-network-responses-in-kotlin-multiplatform-32946b7d4d65)
- [**Navigating the Waters of Kotlin Multiplatform: Exploring Navigation Solutions** (<VPIcon icon="fa-brands fa-medium"/>`proandroiddev`)](https://medium.com/proandroiddev/navigating-the-waters-of-kotlin-multiplatform-exploring-navigation-solutions-eef81aaa1a61)
- [**Enhancing iOS UI Previews: Swift UI Packages & Kotlin Multiplatform Mobile** (<VPIcon icon="fa-brands fa-medium"/>`_thomaskioko`)](https://medium.com/@_thomaskioko/enhancing-ios-development-with-swift-ui-packages-kmm-fa31901fa146)**.**
- **Integrate Kotlin-Inject-Anvil To Tv Maniac —** You are here**.** 👈

If you want to see the code, here's the [pull request (<VPIcon icon="iconfont icon-github"/>`thomaskioko/tv-maniac`)](https://github.com/thomaskioko/tv-maniac/pull/363).

<SiteInfo
  name="thomaskioko/tv-maniac"
  desc="Tv-Maniac is a personalized entertainment tracking and recommendation Multiplatform app (Android & iOS) for tracking TV Shows using TMDB API."
  url="https://github.com/thomaskioko/tv-maniac/pull/363/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/a439114321341bb40adf5dac490397e00df88da1648c5ad818247d14d071fa9a/thomaskioko/tv-maniac/pull/363"/>

---

## Koltlin-Inject-Anvil Integration

Before integrating [<VPIcon icon="iconfont icon-github"/>`amzn/kotlin-inject-anvil`](https://github.com/amzn/kotlin-inject-anvil?tab=readme-ov-file), one thing that bothered me was how to approach the integration/migration. I thought the process would be a pain as I already have multiple modules in my project. Do I rip the bandaid off and do it all at once? Is it possible to do it gradually? Spoiler alert: it is possible to do it gradually. This approach might not work for your project, depending on the size of the team. There are multiple ways of doing this, but this worked for me. This approach made it easier to determine if I broke the current implementation or introduced new errors.

Here's a quick overview of how I approached the migration.

- Add dependencies
- Apply`@ContributesTo` annotation
- Apply `@ContributesBinding` annotation
- Add ksp `kotlin-inject-anvil` compiler dependencies.
- Delete component interfaces.
- Replace `@Component` with `@MergeComponent` and create a subcomponent.

Let's take a quick look at how each step is implemented.

### Add `kotin-inject-anvil` Dependencies

This is pretty straightforward. We need to add the dependencies to our project.

```kotlin title="build.gradle.kts"
kotlinInject-anvil-compiler = { group = "software.amazon.lastmile.kotlin.inject.anvil", name = "compiler", version.ref = "kotlin-inject-anvil" }
kotlinInject-anvil-runtime = { group = "software.amazon.lastmile.kotlin.inject.anvil", name = "runtime", version.ref = "kotlin-inject-anvil" }
kotlinInject-anvil-runtime-optional = { group = "software.amazon.lastmile.kotlin.inject.anvil", name = "runtime-optional", version.ref = "kotlin-inject-anvil" }
```

`kotlinInject-anvil-runtime-optional` is optional, and your project would work without it. I added it so I can get rid of my custom scope and use kotlin-inject-anvil's scopes to keep everything consistent.

To make things easier, I created a bundle with kotlin-inject dependencies, and I use that instead.

```toml title="libs=versions.toml"
[bundles]
kotlinInject = [
  "kotlinInject-runtime",
  "kotlinInject-anvil-runtime",
  "kotlinInject-anvil-runtime-optional"
]
```

We can then add it to our module like so. `implementation(libs.bundles.kotlinInject)`

### Add `@ContributesTo` Annotation

We can now annotate our interface components with `@ContributesTo`. I also replaced my custom scope with kotlin-inject-anvil scope: `@ApplicationScope` -> `@SingleIn(AppScope::class)`. As mentioned, this is optional and will work with your custom scopes. Here's how the component looks.

::: tabs

@tab:active Before

```kotlin
interface CastComponent {
  
  @Provides
  @ApplicationScope  
  fun provideCastDao(bind: DefaultCastDao): CastDao = bind
  
  @Provides
  @ApplicationScope
  fun provideCastRepository(bind: DefaultCastRepository): CastRepository = bind
}
```

@tab After

```kotlin
@ContributesTo(AppScope::class)
interface CastComponent {
  
  @Provides
  @SingleIn(AppScope::class)
  fun provideCastDao(bind: DefaultCastDao): CastDao = bind
  
  @Provides
  @SingleIn(AppScope::class)
  fun provideCastRepository(bind: DefaultCastRepository): CastRepository = bind
}
```

:::

One small thing I did later was move the `@SingleIn` annotation to the class instead of having it in the binding functions.

### Add `@ContributesBinding` Annotation

The next thing we can do is annotate all classes that have interface implementations with `@ContributesBinding`. Once we've plugged everything in, Anvil will provide the bindings for us, and we can get rid of the component above with the manual binding.

::: tabs

@tab:active Before

```kotlin title="DefaultCastRepository.kt"
@Inject
class DefaultCastRepository(
  private val dao: CastDao,
) : CastRepository {
    // ...
}

@tab After

```kotlin title="DefaultCastRepository.kt"
@Inject
@SingleIn(AppScope::class)
@ContributesBinding(AppScope::class)
class DefaultCastRepository(
  private val dao: CastDao,
) : CastRepository {
    // ...
}
```

### Add KSP Dependencies

To check if the changes we've made work as intended, we can add the Kotlin inject Anvil compiler dependency and generate the component classes.`addKspDependencyForAllTargets(libs.kotlinInject.anvil.compiler)`. `addKspDependencyForAllTargets` is an extension function that creates KSP configurations for each target. e.g `kspAndroid`, `kspIosArm64`

![We can build our app and take a look at the generated code](https://droidcon.com/wp-content/uploads/2024/12/0_kgF_dICjfmGL6Q8C.webp)

Anvil will generate the bindings for us similarly to what we had above. This will be generated for all our classes annotated with `@ContributesBinding(AppScope::class)`.

```kotlin title="ComThomaskiokoTvmaniacDataCastImplementationDefaultCastRepository.kt"
@Origin(value = DefaultCastRepository::class)
public interface ComThomaskiokoTvmaniacDataCastImplementationDefaultCastRepository {
  
  @Provides
  public fun provideDefaultCastRepositoryCastRepository(defaultCastRepository: DefaultCastRepository): CastRepository = 
    defaultCastRepository
}
```

### Delete Manual Bindings

Now that our bindings and components are being generated, we can delete our component interfaces with provider functions.

In my previous implementation, each module was responsible for creating its own DI component. The shared module then added all these SuperType Components to the parent/final component for each platform component. This is a bit painful and can easily get out of hand as your project grows. 😮‍💨

![](https://droidcon.com/wp-content/uploads/2024/12/0_UmcoYHnJjpYp8Kp8.webp)

Thanks to `kotlin-inject-anvil`, we can get rid of these as they are now generated for us once we add the merge annotation. 🥳

---

## Final Boss: `@MergeComponent` Annotation

### `@ContributesSubcomponent` Annotation

Since we can only have one component annotated with `@MergeComponent`, we need to annotate `ActivityComponent` to `@ContributesSubcomponent`, create a factory that our parent scope will implement.

::: tabs

@tab:active Before

```kotlin title="ActivityComponent.kt"
@SingleIn(ActivityScope::class)
@Component
abstract class ActivityComponent(
  @get:Provides val activity: ComponentActivity,
  @get:Provides val componentContext: ComponentContext = activity.defaultComponentContext(),
  @Component
  val applicationComponent: ApplicationComponent =
    ApplicationComponent.create(activity.application),
) : NavigatorComponent, TraktAuthAndroidComponent {
  abstract val traktAuthManager: TraktAuthManager
  abstract val rootPresenter: RootPresenter
  
companion object
}
```

@tab After

You should note that we converted our abstract class to an interface, as only interfaces can be annotated with contributed `@ContributesSubcomponent`. For more details on annotation usage and behavior, [see the documentation. (<VPIcon icon="iconfont icon-github"/>`amzn/kotlin-inject-anvil`)](https://github.com/amzn/kotlin-inject-anvil/blob/main/runtime/src/commonMain/kotlin/software/amazon/lastmile/kotlin/inject/anvil/ContributesSubcomponent.kt)

```kotlin title="ActivityComponent.kt"
@ContributesSubcomponent(ActivityScope::class)
@SingleIn(ActivityScope::class)
interface ActivityComponent {

  @Provides
  fun provideComponentContext(
    activity: ComponentActivity
  ): ComponentContext = activity.defaultComponentContext()

  val traktAuthManager: TraktAuthManager
  val rootPresenter: RootPresenter

  @ContributesSubcomponent.Factory(AppScope::class)
  interface Factory {
    fun createComponent(
      activity: ComponentActivity
    ): ActivityComponent
  }
}
```

:::

### `@MergeComponent` Annotation

To create our graph and our components to our graph, we need to replace `kotlin-injects` `@Component` with `kotlin-inject-anvil` `@MergeComponent` and get rid of the `SharedComponent`.

::: tabs

@tab:active Before

```kotlin title="ApplicationComponent.kt"
@Component
@SingleIn(AppScope::class)
abstract class ApplicationComponent(
  @get:Provides val application: Application,
) : SharedComponent() {
  abstract val initializers: AppInitializers
  companion object
}
```

@tab After

I added annotation, removed the supertype from the application component, and added `ActivityComponent.Factory`.

```kotlin title="ApplicationComponent.kt"
@MergeComponent(AppScope::class)
@SingleIn(AppScope::class)
abstract class ApplicationComponent(
  @get:Provides val application: Application,
) : ActivityComponent.Factory {
  abstract val initializers: AppInitializers
  abstract val activityComponentFactory: ActivityComponent.Factory
}
```

![Now, if we look at the generated code, we can see that Anvil adds all the generated components to our graph when we compile the app.](https://droidcon.com/wp-content/uploads/2024/12/0_KpjwBgVoFICJmiNI-1024x761.webp)

If you forget to delete any provide functions, you will get the following error at compile time.

```plaintext title="output"
e: [ksp] Cannot provide: com.thomaskioko.tvmaniac.data.cast.api.CastDao
e: [ksp] as it is already provided
```

This is expected; you can track down the duplicate provide method and delete it.

---

## Conclusion

With this in place, we have now gotten rid of manual bindings, replacing them with `@ContributesTo` and `@ContributesBinding`. We also deleted our god component class and got rid of a lot of boilerplate, thanks to Anvil.

[Ralf (<VPIcon icon="fa-brands fa-x-twitter"/>`vRallev`)](https://x.com/vRallev) and all the contributors have done a fantastic job with [<VPIcon icon="iconfont icon-github"/>`amzn/kotlin-inject-anvil`](https://github.com/amzn/kotlin-inject-anvil). The integration was smooth. I'm looking forward to how these libraries evolve. (Maybe it should be renamed to KiAnvil. Get it? You know, like Keanu, because of how lethal it feels? No? 😂 Don't worry, I will see myself out.)

Thanks, [Ralf (<VPIcon icon="fa-brands fa-x-twitter"/>`vRallev`)](https://x.com/vRallev), for reviewing the article. Until we meet again, folks. Happy coding! ✌️

---

## References

```component VPCard
{
  "title": "Dagger + Anvil: Learning to Love Dependency Injection",
  "desc": "This is a joint talk with Ralf Wondratschek from Square and Gabriel Peal from Tonal. Anvil is a Kotlin compiler plugin that makes dependency injection with Dagger 2 easier. Anvil reduces boilerplate code, improves code modularization, reduces build times, and enables custom code generators to further simplify patterns specific to your codebase. In this talk we will explain why Square created Anvil, how Tonal successfully adopted it, how the plugin works under the hood, what code is being generated and how you can get the most out of the framework",
  "link": "/droidcon.com/dagger-anvil-learning-to-love-dependency-injection.md",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```

<SiteInfo
  name="KSP with Kotlin Multiplatform | Kotlin"
  desc="Starting from KSP 1.0.1, applying KSP on a multiplatform project is similar to that on a single platform, JVM project. The main difference is that, instead of writing the ksp(...) configuration in dependencies, add(ksp<Target>) or add(ksp<SourceSet>) is used to specify which compilation targets need symbol processing, before compilation."
  url="https://kotlinlang.org/docs/ksp-multiplatform.html/"
  logo="https://kotlinlang.org/assets/images/apple-touch-icon-114x114.png?v2"
  preview="https://kotlinlang.org/assets/images/open-graph/docs.png"/>

<SiteInfo
  name="amzn/kotlin-inject-anvil"
  desc="Extensions for the kotlin-inject dependency injection framework"
  url="https://github.com/amzn/kotlin-inject-anvil"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/0ec2840ba33fe61c38a628367c6b7682296922e89dbf31d66abd9dbc25ae73ae/amzn/kotlin-inject-anvil"/>

::: info

This article is previously published on [<VPIcon icon="fa-brands fa-medium"/>`proandroiddev`)](https://proandroiddev.com/integrate-kotlin-inject-anvil-to-tv-maniac-e1330c9cb566)

<SiteInfo
  name="Integrate Kotlin-Inject-Anvil To Tv Maniac"
  desc="If you’ve used Anvil before, you know it takes away a lot of the boilerplate code and makes DI seamless. If Anvil is new to you, it basically allows you to contribute dagger modules and component interfaces to your DI graph, merge all the contributions, and add them to your component during compilation. Ralf Wonderatschek and Gabriel Peal gave an in-depth talk about this..."
  url="https://proandroiddev.com/integrate-kotlin-inject-anvil-to-tv-maniac-e1330c9cb566/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/da:true/resize:fit:1200/0*Q0gZACq7a3T4cYeD"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Integrate Kotlin-Inject-Anvil To Tv Maniac",
  "desc": "If you've used Anvil before, you know it takes away a lot of the boilerplate code and makes DI seamless. If Anvil is new to you, it basically allows you to contribute dagger modules and component interfaces to your DI graph, merge all the contributions, and add them to your component during compilation. Ralf Wonderatschek and Gabriel Peal gave an in-depth talk about this. Dagger + Anvil: Learning to Love Dependency Injection. You should check it out.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/integrate-kotlin-inject-anvil-to-tv-maniac.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
