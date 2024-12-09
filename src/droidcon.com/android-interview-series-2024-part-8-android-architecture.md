---
lang: en-US
title: "Android Interview Series 2024 — Part 8 (Android architecture)"
description: "Article(s) > Android Interview Series 2024 — Part 8 (Android architecture)"
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
      content: "Article(s) > Android Interview Series 2024 — Part 8 (Android architecture)"
    - property: og:description
      content: "Android Interview Series 2024 — Part 8 (Android architecture)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/android-interview-series-2024-part-8-android-architecture.html
prev: /programming/java-android/articles/README.md
date: 2024-11-26
isOriginal: false
author: Anitaa Murthy
cover: https://droidcon.com/wp-content/uploads/2024/11/0_ovGMYgU7aA9In-oV-1024x576.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Android > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-android/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Android Interview Series 2024 — Part 8 (Android architecture)"
  desc="This is Part 8 of the android interview question series. This part will focus on Android architecture. Part 1 — Android basics Part 2 — Android experts Part 3 — Java basics Part 4 — Kotlin basics Part 5 — Kotlin coroutines Part 6 — Kotlin Flows Part 7 — Jetpack Compose Part 8 — Android architecture & framework -> You are here"
  url="https://droidcon.com/android-interview-series-2024-part-8-android-architecture"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/0_ovGMYgU7aA9In-oV-1024x576.webp"/>

This is Part 8 of the android interview question series. This part will focus on Android architecture.

::: info Android Interview Series 2024

- [Part 1 — Android basics](https://medium.com/@anitaa_1990/android-interview-series-2024-part-1-android-basics-23a713f4a648)
- [Part 2 — Android experts](https://medium.com/@anitaa_1990/android-interview-series-2024-part-2-android-intermediate-472e0e787725)
- [Part 3 — Java basics](https://medium.com/android-news/android-interview-questions-cheat-sheet-part-ii-bea0633f0da7)
- [Part 4 — Kotlin basics](https://medium.com/@anitaa_1990/android-interview-series-2024-part-4-kotlin-basics-16531ee54e8a)
- [Part 5 — Kotlin coroutines](https://medium.com/@anitaa_1990/android-interview-series-2024-part-5-kotlin-coroutines-3dd1ae81c721)
- [Part 6 — Kotlin Flows](https://medium.com/@anitaa_1990/android-interview-series-2024-part-6-kotlin-flows-730f6bf877df)
- [Part 7 — Jetpack Compose](https://medium.com/@anitaa_1990/android-interview-series-2024-part-7-jetpack-compose-ff7d2ecd9018)
- Part 8 — Android architecture & framework -> **You are here**

:::

---

## 1. Can you explain the MVC and MVP patterns? What are the main differences and why are they not used in Android development?

- **MVC** is the **Model-View-Controller** architecture where model refers to the data model classes. The view refers to the xml files and the controller handles the business logic. The issue with this architecture is unit testing. The model can be easily tested since it is not tied to anything. The controller is tightly coupled with the android apis making it difficult to unit test. Modularity & flexibility is a problem since the view and the controller are tightly coupled. If we change the view, the controller logic should also be changed. Maintenance is also an issue.
- **MVP architecture:** **Model-View-Presenter architecture**. MVP separates concerns by using a **Presenter** to handle business logic, the **View** (often an Activity or Fragment) to display UI, and the **Model** to manage data. In this setup, the Presenter is responsible for updating the View based on the Model’s data and handling user actions, making it testable and reducing the burden on the Android lifecycle-aware View. This separation improves testability since the Presenter can be tested independently of the Android framework. But the **Presenter** does not inherently respond to lifecycle events like configuration changes (e.g., screen rotations), which means that extra handling is often required to manage these situations.

---

## 2. What is MVVM architecture in android?

**MVVM (Model-View-View Model) architecture:** MVVM leverages **ViewModel**, a lifecycle-aware component that holds and processes data for the UI, separating it from the **View** (Activity/Fragment). The **Model** represents the data layer and interacts with the ViewModel, which then updates the View using LiveData, DataBinding, or StateFlow. The ViewModel handles data and business logic, while the View observes changes and updates UI reactively, which is lifecycle-aware and thus avoids memory leaks and configuration issues.

---

## 3. What are the main advantages and disadvantages of using MVVM in Android development?

**Advantages include:**

- MVVM encourages a clear separation between the UI (View), business logic (ViewModel), and data (Model). This makes the codebase more modular, organized, and easier to maintain.
- The ViewModel is lifecycle-aware, meaning it retains its data across configuration changes like screen rotations. This lifecycle management reduces memory leaks and simplifies handling UI-related data.
- The ViewModel contains the business logic and is decoupled from the Android UI framework, making it easier to test independently. The Model and ViewModel can be unit-tested, which improves code quality and reliability.
- MVVM enables a reactive approach where the View observes data changes in the ViewModel, allowing for automatic UI updates without manual intervention. Using LiveData, Flow, or StateFlow, the View automatically reacts to data changes, which can result in a more responsive and dynamic UI.

Some disadvantages might include:

- MVVM, along with components like LiveData, DataBinding, and Flow, requires a deeper understanding of reactive programming and lifecycle management, which can be challenging for developers new to these concepts.
- Using DataBinding in MVVM can reduce some code but also add boilerplate, especially if implemented extensively. Additionally, debugging can be more complex with DataBinding, as errors may not always be immediately apparent.

---

## 4. How do you manage the “fat ViewModel” problem in MVVM?

In MVVM, the ViewModel can easily become “fat” if too much logic is placed there, especially as the app grows. Handling multiple ViewModel responsibilities can lead to complex, hard-to-maintain code if not carefully managed. This is called the “fat ViewModel” problem. In order to avoid that,

- **Use the Repository Pattern**: The Repository acts as a single source of truth for data, abstracting data access layers (local databases, network, cache) from the ViewModel. By offloading data-fetching and manipulation responsibilities to the Repository, the ViewModel only needs to manage UI data, reducing its workload.
- **Delegate Business Logic to Use Cases or Interactors**: Use Cases are components that encapsulate a specific piece of business logic. By moving business logic out of the ViewModel into Use Cases, each Use Case is responsible for a single action, keeping the ViewModel focused on UI state and interactions. This approach makes it easier to test logic independently and enhances reusability.
- **Utilize Separate State Management Classes**: State management classes manage UI states and UI events, helping organize complex UI-related data. If your ViewModel has many UI states, creating a specific state management class can centralize the handling of UI states, reducing clutter in the ViewModel.
- **Use Event Wrappers for One-Time Events**: Event wrappers (e.g., SingleLiveEvent, Event classes) handle events that should only be consumed once, like navigation triggers or toast messages. By using event wrappers, the ViewModel doesn’t need complex logic to manage one-time events, simplifying its responsibilities and making UI event handling more predictable.

---

## 5. What is MVI architecture and what are it’s core concepts?

**MVI (Model-View-Intent)** is an architecture pattern that is inspired by functional and reactive programming principles.

- The **Model** in MVI represents the application’s state and data. It holds all the information needed to render the UI at any given time.
- The **View** in MVI is responsible for rendering the UI based on the Model’s state. The View receives the state updates from the Model and re-renders itself accordingly, which means the View is entirely reactive and doesn’t hold any logic.
- **Intents** represent user actions or events, such as button clicks, text input, or system events. Intents are like requests to change the state of the application. They are dispatched from the View to the Model, which processes the intent and updates the state accordingly.

::: important Key principles of MVI

- MVI promotes a unidirectional data flow: Intents are sent from the View to the Model, which processes them and returns a new state back to the View. This clear flow helps to prevent unpredictable state changes and race conditions.
- The state in MVI is usually managed in one central location (often a single state object), ensuring there is a single source of truth for the UI. This single state object holds all relevant data for rendering the UI, which allows for easy testing, debugging, and state persistence, especially in cases where configuration changes or complex UI flows are involved.
- MVI encourages immutable states, meaning each change creates a new state rather than modifying the existing one. This immutability helps prevent unintended side effects and makes the state transitions easy to trace.

:::

---

## 6. What are some scenarios where MVI might be a better fit than MVVM?

Jetpack Compose aligns well with MVI principles. The declarative nature of Compose reduces the complexity of handling user interactions and ensures that the UI stays in sync with the application state.

- In MVI, the UI state is managed by the ViewModel, often using `StateFlow` or `LiveData`. This state remains immutable, ensuring UI updates are predictable. Composables observe the state and recompose automatically when the state changes.
- **Event/Intent**: User interactions, like button clicks, are captured as events (Intents) and sent to the ViewModel for handling. Intents guide the ViewModel on how to respond to user actions, such as fetching data or adding a user, and the ViewModel adjusts the state based on these actions. This structured flow ensures smooth transitions in state and UI updates.
- Effects handle one-time actions like showing a snackbar or navigation. MVI manages effects using channels, allowing the ViewModel to dispatch them without affecting the app’s overall state.

---

## 7. Can you describe Clean Architecture? What layers would you typically create in a Clean Architecture setup, and what’s the purpose of each?

In Android development, **clean architecture** design approach provides a structured way to organize code into layers, each with its own responsibilities and dependencies, making the application more maintainable, flexible, and testable. Typically, Clean Architecture consists of four layers:

- **Presentation Layer**: Responsible for the UI and the communication between the user and the app. This is where you handle user input, present data to the user, and manage UI state. Eg: activities, fragments, composables etc.
- **Domain Layer**: Contains the **business logic** and **use cases** (or interactors) of the application. Executes business rules and logic without directly interacting with data sources or the UI. This layer is agnostic to platform or framework, making it suitable for pure unit testing. Eg: repository, entity, use cases etc.
- **Data Layer**: Responsible for managing data sources and implementing the **Repository pattern**. It provides data to the Domain Layer by implementing the Repository interfaces defined in the Domain. Eg: Retrofit, Room db, Paging source etc.
- **Framework and UI Layer**: Houses platform-specific elements and external frameworks that your application depends on, such as Android SDK components, dependency injection frameworks (like Dagger or Hilt), and navigation components.

---

## 8. How do you handle communication between different layers in a Clean Architecture setup?

- Communication from Presentation Layer to Domain Layer: can happen using **Use Cases**. Use Cases are often `suspend` functions (or return **Flow** or **LiveData**) to support asynchronous operations. The Presentation Layer then collects the data or subscribes to updates and updates the UI accordingly.

```kotlin title="PresentationLayerExample.kt"
// Presentation Layer (ViewModel) calls a Use Case
class ProfileViewModel(private val getUserProfile: GetUserProfile) : ViewModel() {
    val userProfile = MutableLiveData<User>()
    
    fun loadProfile(userId: String) {
        viewModelScope.launch {
            val result = getUserProfile(userId)
            userProfile.value = result
        }
    }
}
```

<!-- @include: https://gist.github.com/anitaa1990/04b366dc39976ed66dd52f97888708bc/raw/5970a20b2623a79ab47a8eec49966664a6db13b2/PresentationLayerExample.kt -->

- **Communication from Domain Layer to Data Layer**: The Domain Layer interacts with data through the **Repository pattern**. The Repository interface is defined in the Domain Layer, while the actual implementation resides in the Data Layer. The Domain Layer doesn’t know where the data is coming from (e.g., network, database). It simply calls the `UserRepository` interface, which the Data Layer implements.

<!-- @include: https://gist.github.com/anitaa1990/03706aa8562a742ce1de9ecefdacfe26/raw/4eb03cc5b192965bf6326daf93ae622b08ab349b/DomainLayerExample.kt -->

```kotlin title="DomainLayerExample.kt"
// Domain Layer (Use Case)
class GetUserProfile(private val userRepository: UserRepository) {
    suspend operator fun invoke(userId: String): User {
        return userRepository.getUserById(userId)
    }
}

// Data Layer (Repository Implementation)
class UserRepositoryImpl(private val apiService: ApiService, private val userDao: UserDao) : UserRepository {
    override suspend fun getUserById(userId: String): User {
        // Decide whether to fetch data from network or local database
        return apiService.getUserById(userId)
    }
}
```

- **Communication within the Data Layer:** The Repository in the Data Layer manages communication between various data sources (e.g., remote API, local database, cache).**Data Sources**: The Data Layer might have separate **Data Sources** for handling network requests, local database interactions, and cache. These data sources are abstracted within the Repository, so the Repository decides the source and manages caching logic if necessary.

```kotlin title="DataLayerExample2.kt"
// Data Layer: Example of combining data sources
class UserRepositoryImpl(
    private val apiService: ApiService,
    private val userDao: UserDao
) : UserRepository {
    override suspend fun getUserById(userId: String): User {
        return try {
            // Fetch from remote API
            val userDto = apiService.getUserById(userId)
            // Save to local database for caching
            userDao.insertUser(userDto.toUserEntity())
            userDto.toUser() // Convert DTO to domain model
        } catch (exception: Exception) {
            // Fallback to local database if network fails
            userDao.getUserById(userId).toDomainModel()
        }
    }
}
```

<!-- @include: https://gist.github.com/anitaa1990/cf627f8ceb51a47459b2162f0b541431/raw/12be259ad5eb754c950b4cd94c417d9a68e4c6b8/DataLayerExample2.kt -->

- **Data Flow from Data Layer Back to Domain and Presentation Layers:** The Data Layer can expose data as **Flows**, **LiveData**, or **suspend functions** that the Domain Layer or Presentation Layer can observe or collect.

```kotlin title="DataLayerExample.kt"
// Data Layer exposes data as Flow
override fun getUserById(userId: String): Flow<User> = flow {
    val userEntity = userDao.getUserById(userId)
    emit(userEntity.toDomainModel()) // Emit as domain model
}
```

<!-- @include: https://gist.github.com/anitaa1990/7dee1b3f50c9da31c932e7d6fd403dd6/raw/d0fc35f36342fa5f23fa6e335ce996ecbba4fd48/DataLayerExample.kt -->

---

## 9. Can you explain the Repository pattern and how it helps with code organization and separation of concerns?

- The **Repository Pattern** is a design pattern used to abstract and centralize data access logic, which helps with **code organization** and **separation of concerns**. It serves as a bridge between the **Domain Layer** (business logic) and the **Data Layer** (data sources such as local databases, remote APIs, and cache). This allows the application’s core logic to remain independent of specific data source implementations, making the codebase easier to maintain, test, and scale.
- The Repository Pattern **abstracts** data access, hiding the details of data sources from the rest of the app.
- **Separates concerns** by isolating data handling logic, keeping the UI and Domain layers focused on their specific roles.
- **Improves testability** by allowing you to mock the Repository for unit tests.
- **Centralizes data management** and caching, making it easier to implement and maintain complex data operations.

---

## 10. How would you design a Repository to interact with a local database and a remote API in an Android application?

```kotlin title="rawRepositoryPatternExample.kt"
// Domain Layer - Repository Interface
interface ProductRepository {
   suspend fun getProducts(): List<Product>
}

// Data Layer - Repository Implementation
class ProductRepositoryImpl(
   private val apiService: ApiService,
   private val productDao: ProductDao
) : ProductRepository {
   override suspend fun getProducts(): List<Product> {
       return try {
           val products = apiService.fetchProducts()
           productDao.insertProducts(products) // Cache data
           products
       } catch (e: Exception) {
           productDao.getProducts() // Retrieve from local database on error
       }
   }
}
```

In this example:

- The `ProductRepository` interface is defined in the Domain Layer, which is agnostic to where the data comes from.
- The `ProductRepositoryImpl` in the Data Layer fetches data from an API and caches it locally. If the API call fails, it retrieves data from the local database.
- This pattern allows the rest of the app to call `getProducts()` without knowing or managing data retrieval or caching strategies.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Android Interview Series 2024 — Part 8 (Android architecture)",
  "desc": "This is Part 8 of the android interview question series. This part will focus on Android architecture. Part 1 — Android basics Part 2 — Android experts Part 3 — Java basics Part 4 — Kotlin basics Part 5 — Kotlin coroutines Part 6 — Kotlin Flows Part 7 — Jetpack Compose Part 8 — Android architecture & framework -> You are here",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/android-interview-series-2024-part-8-android-architecture.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
