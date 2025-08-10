---
lang: en-US
title: "Building Your First Kotlin Multiplatform App: From Setup to iOS App Store with Compose Multiplatform (2025 Guide)"
description: "Article(s) > Building Your First Kotlin Multiplatform App: From Setup to iOS App Store with Compose Multiplatform (2025 Guide)"
icon: iconfont icon-kotlin
category:
  - Java
  - Kotlin
  - Android
  - Jetpack Compose
  - Article(s)
tag:
  - blog
  - kt.academy
  - java
  - kotlin
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Building Your First Kotlin Multiplatform App: From Setup to iOS App Store with Compose Multiplatform (2025 Guide)"
    - property: og:description
      content: "Building Your First Kotlin Multiplatform App: From Setup to iOS App Store with Compose Multiplatform (2025 Guide)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/kmp-to-compose-guide.html
prev: /programming/java-android/articles/README.md
date: 2025-07-28
isOriginal: false
author: 
  - name: Faisal Ahmed
    url: https://kt.academy/user/faisalahmed
cover: https://marcinmoskala.com/kt-academy-articles/promotion/building_first_kmm_app.png
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
  name="Building Your First Kotlin Multiplatform App: From Setup to iOS App Store with Compose Multiplatform (2025 Guide)"
  desc="A comprehensive guide to building your first Kotlin Multiplatform app using Compose Multiplatform, covering setup, development, and deployment"
  url="https://kt.academy/kmp-to-compose-guide"
  logo="https://kt.academy/logo.png"
  preview="https://marcinmoskala.com/kt-academy-articles/promotion/building_first_kmm_app.png"/>

::: info

**🎯 What You'll Learn:**

Build a production-ready subscription tracker that runs natively on Android and iOS with 95% shared code, including database, business logic, and UI.

**⏱️ Time Investment:**

~3-4 hours for complete implementation  

**🎯 Target Audience:**

Android developers exploring KMP, iOS developers curious about Kotlin

:::

---

## 🎯 Introduction

Remember when building for both Android and iOS meant writing everything twice? Those days are over.

With Compose Multiplatform for iOS now stable (May 2025), you can build truly native apps with 95% shared code. No more maintaining two codebases, no more feature parity issues, no more "it works on Android but breaks on iOS."

In this comprehensive guide, we'll build **Kyklos**—a subscription management app that proves KMP is ready for production. We'll tackle real challenges like cross-platform databases, Material Design on iOS, and the gotchas that can trip up new KMP developers.

By the end of this tutorial, you'll have created a fully functional app with:

- ✅ Shared business logic and UI between Android and iOS
- ✅ Clean Architecture with proper separation of concerns
- ✅ Type-safe database using SQLDelight
- ✅ Material Design 3 theming that works on iOS
- ✅ Production-ready iOS support with real device testing

::: info 🏗️ What We're Building

**Kyklos** (Greek for "cycle") is a subscription management app that helps users track their recurring payments. The app features:

- 📱 Cross-platform native UI with shared Compose code
- 💰 Subscription tracking with intelligent cost calculations
- 🌍 Multi-currency support (USD, EUR, GBP, CAD, AUD, INR)
- 📊 Monthly spending summaries and analytics
- 🎨 Modern Material Design 3 interface
- 🔄 Real-time sync across platforms

:::

---

## 🛠️ Setting Up the Development Environment

::: note Prerequisites

- **Android Studio** with the latest KMP plugin
- **Xcode 14+** (for iOS development and simulator)
- **JDK 11+**
- **Kotlin 2.1.21+**

:::

### Creating the Project

Start by creating a new Kotlin Multiplatform project:

```plaintext
# Option 1: Using the KMP wizard (Recommended)
# Visit: https://kmp.jetbrains.com/
# Configure: Android + iOS + Compose Multiplatform

# Option 2: Android Studio
# New Project > Kotlin Multiplatform > Mobile Application
```

#### 🏗️ Architecture Decision

Why start with the official wizard? It sets up the proper expect/actual structure and configures Compose Multiplatform correctly for both platforms.

---

## 📦 Dependencies and Project Structure

### Core Dependencies

Let's set up our `gradle/libs.versions.toml` with production-ready versions:

```toml title="gradle/libs.versions.toml"
[versions]
kotlin = "2.1.21"
composeMultiplatform = "1.8.2"
sqlDelight = "2.0.2"
kotlinx-datetime = "0.6.0"
uuid = "0.8.4"

[libraries]
# SQLDelight for cross-platform database
sqlDelight-driver-android = { module = "app.cash.sqldelight:android-driver", version.ref = "sqlDelight" }
sqlDelight-driver-native = { module = "app.cash.sqldelight:native-driver", version.ref = "sqlDelight" }
sqlDelight-runtime = { module = "app.cash.sqldelight:runtime", version.ref = "sqlDelight" }
sqlDelight-coroutines = { module = "app.cash.sqldelight:coroutines-extensions", version.ref = "sqlDelight" }

# Cross-platform utilities
kotlinx-datetime = { module = "org.jetbrains.kotlinx:kotlinx-datetime", version.ref = "kotlinx-datetime" }
uuid = { module = "com.benasher44:uuid", version.ref = "uuid" }

[plugins]
sqlDelight = { id = "app.cash.sqldelight", version.ref = "sqlDelight" }
```

### Project Architecture

We'll implement **Clean Architecture** with clear layer separation:

```plaintext title="file structure"
📱 Presentation Layer (UI)
├── 🎨 components/     # Reusable UI components
├── 📄 screens/        # Screen-level composables  
└── 🎭 theme/          # Material Design theme

💼 Domain Layer (Business Logic)
├── 📋 usecase/        # Business use cases
└── 📄 repository/     # Repository interfaces

💾 Data Layer (Data Management)  
├── 🗄️ local/          # SQLDelight database
├── 📊 repository/     # Repository implementations
└── 🔄 model/          # Data models
```

::: info 🏗️ Architecture Decision:

Clean Architecture separates platform code from business logic, making testing easier and code more maintainable across Android and iOS.

:::

---

## 🗄️ Setting Up SQLDelight Database

### 1. Configure SQLDelight in <FontIcon icon="iconfont icon-kotlin"/>`build.gradle.kts`

```groovy title="build.gradle.kts"
sqldelight {
    databases {
        create("KyklosDatabase") {
            packageName.set("dev.faisalahmed.kyklos.db")
            srcDirs("src/commonMain/sqldelight")
        }
    }
}
```

### 2. Create Database Schema

Create <FontIcon icon="fas fa-folder-open"/>`composeApp/src/commonMain/sqldelight/database/`<FontIcon icon="fas fa-file-lines"/>`Subscription.sq`:

```sql :collapsed-lines title="composeApp/src/commonMain/sqldelight/database/Subscription.sq"
-- Subscription table with proper indexing for performance
CREATE TABLE subscription (
    id TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    cost REAL NOT NULL,
    currency_code TEXT NOT NULL,
    billing_cycle TEXT NOT NULL,
    next_payment_date INTEGER NOT NULL,
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    notes TEXT,
    FOREIGN KEY (currency_code) REFERENCES currency(code)
);

-- Performance indexes for common queries
CREATE INDEX idx_subscription_active ON subscription(is_active);
CREATE INDEX idx_subscription_next_payment ON subscription(next_payment_date);

-- Query: Get all subscriptions with currency info
selectAll:
SELECT
    s.*,
    c.symbol AS currency_symbol,
    c.name AS currency_name,
    c.exchange_rate_to_usd
FROM subscription s
JOIN currency c ON s.currency_code = c.code
ORDER BY s.next_payment_date ASC;

-- Query: Get only active subscriptions
selectActive:
SELECT
    s.*,
    c.symbol AS currency_symbol,
    c.name AS currency_name,
    c.exchange_rate_to_usd
FROM subscription s
JOIN currency c ON s.currency_code = c.code
WHERE s.is_active = 1
ORDER BY s.next_payment_date ASC;

-- Insert new subscription
insertSubscription:
INSERT INTO subscription (
    id, name, cost, currency_code, billing_cycle,
    next_payment_date, is_active, created_at, updated_at, notes
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- Analytics query for monthly cost calculations
selectTotalMonthlyCostByActive:
SELECT
    s.currency_code,
    c.symbol AS currency_symbol,
    c.exchange_rate_to_usd,
    SUM(
        CASE
            WHEN s.billing_cycle = 'WEEKLY' THEN s.cost * 4.33
            WHEN s.billing_cycle = 'MONTHLY' THEN s.cost
            WHEN s.billing_cycle = 'QUARTERLY' THEN s.cost / 3.0
            WHEN s.billing_cycle = 'SEMI_ANNUALLY' THEN s.cost / 6.0
            WHEN s.billing_cycle = 'ANNUALLY' THEN s.cost / 12.0
            ELSE s.cost
        END
    ) AS monthly_cost
FROM subscription s
JOIN currency c ON s.currency_code = c.code
WHERE s.is_active = ?
GROUP BY s.currency_code, c.symbol, c.exchange_rate_to_usd;
```

### 3. Cross-Platform Database Drivers

The key to SQLDelight's cross-platform magic is the **expect/actual** pattern:

#### Common interface (<FontIcon icon="fas fa-folder-open"/>`commonMain/data/local/`<FontIcon icon="iconfont icon-kotlin"/>`DatabaseDriverFactory.kt`)

```kotlin title="commonMain/data/local/DatabaseDriverFactory.kt"
import app.cash.sqldelight.db.SqlDriver
​
expect class DatabaseDriverFactory {
    fun createDriver(): SqlDriver
}
```

#### Android implementation** (<FontIcon icon="fas fa-folder-open"/>`androidMain/data/local/`<FontIcon icon="iconfont icon-kotlin"/>`DatabaseDriverFactory.android.kt`)

```kotlin title="androidMain/data/local/DatabaseDriverFactory.android.kt"
import android.content.Context
import app.cash.sqldelight.db.SqlDriver
import app.cash.sqldelight.driver.android.AndroidSqliteDriver
import dev.faisalahmed.kyklos.db.KyklosDatabase
​
actual class DatabaseDriverFactory(private val context: Context) {
    actual fun createDriver(): SqlDriver {
        return AndroidSqliteDriver(
            schema = KyklosDatabase.Schema,
            context = context,
            name = "kyklos.db"
        )
    }
}
```

#### iOS implementation (<FontIcon icon="fas fa-folder-open"/>`iosMain/data/local/`<FontIcon icon="iconfont icon-kotlin"/>`DatabaseDriverFactory.ios.kt`):

```kotlin title="iosMain/data/local/DatabaseDriverFactory.ios.kt"
import app.cash.sqldelight.db.SqlDriver
import app.cash.sqldelight.driver.native.NativeSqliteDriver
import dev.faisalahmed.kyklos.db.KyklosDatabase
​
actual class DatabaseDriverFactory {
    actual fun createDriver(): SqlDriver {
        return NativeSqliteDriver(
           schema = KyklosDatabase.Schema,
           name = "kyklos.db"
        )
    }
}
```

---

## 🏛️ Implementing Clean Architecture

### 1. Domain Layer - Business Logic

#### Repository Interface (<FontIcon icon="fas fa-folder-open"/>`domain/repository/`<FontIcon icon="iconfont icon-kotlin"/>`SubscriptionRepository.kt`):

```kotlin title="domain/repository/SubscriptionRepository.kt"
import dev.faisalahmed.kyklos.data.model.Subscription
import kotlinx.coroutines.flow.Flow
​
interface SubscriptionRepository {
    fun getAllSubscriptions(): Flow<List<Subscription>>
    fun getActiveSubscriptions(): Flow<List<Subscription>>
    suspend fun getSubscriptionById(id: String): Subscription?
    suspend fun insertSubscription(subscription: Subscription)
    suspend fun updateSubscription(subscription: Subscription)
    suspend fun deleteSubscription(id: String)
    suspend fun toggleSubscriptionStatus(id: String)
}
```

#### Use Case Example (`domain/usecase/`<FontIcon icon="iconfont icon-kotlin"/>`GetSubscriptionsUseCase.kt`):

```kotlin title="domain/usecase/GetSubscriptionsUseCase.kt"
class GetSubscriptionsUseCase(
    private val repository: SubscriptionRepository
) {
    operator fun invoke(activeOnly: Boolean = false): Flow<List<Subscription>> {
        return if (activeOnly) {
            repository.getActiveSubscriptions()
        } else {
            repository.getAllSubscriptions()
        }
    }
}
```

### 2. Data Layer - Repository Implementation

```kotlin
class SubscriptionRepositoryImpl(
    private val database: KyklosDatabase
) : SubscriptionRepository {
​
    // Convert SQLDelight query results to domain models
    override fun getAllSubscriptions(): Flow<List<Subscription>> {
        return database.subscriptionQueries
            .selectAll()
            .asFlow()
            .mapToList(Dispatchers.IO)
            .map { rows ->
                rows.map { row -> row.toSubscription() }
            }
    }
​
    // Insert subscription with proper error handling
    override suspend fun insertSubscription(subscription: Subscription) {
        try {
            database.subscriptionQueries.insertSubscription(
                id = subscription.id,
                name = subscription.name,
                cost = subscription.cost,
                currency_code = subscription.currency.code,
                billing_cycle = subscription.billingCycle.name,
                next_payment_date = subscription.nextPaymentDate.toEpochMilliseconds(),
                is_active = if (subscription.isActive) 1L else 0L,
                created_at = subscription.createdAt.toEpochMilliseconds(),
                updated_at = subscription.updatedAt.toEpochMilliseconds(),
                notes = subscription.notes
            )
        } catch (e: Exception) {
            // Handle database errors appropriately
            throw DatabaseException("Failed to insert subscription: ${e.message}")
        }
    }
}
```

### 3. Data Models with Business Logic

```kotlin
data class Subscription(
    val id: String,
    val name: String,
    val cost: Double,
    val currency: Currency,
    val billingCycle: BillingCycle,
    val nextPaymentDate: Instant,
    val isActive: Boolean = true,
    val createdAt: Instant,
    val updatedAt: Instant,
    val notes: String? = null
) {
    // Business logic: Calculate monthly cost based on billing cycle
    fun calculateMonthlyCost(): Double {
        return billingCycle.calculateMonthlyCost(cost)
    }
​
    // Business logic: Convert to USD for unified calculations
    fun calculateMonthlyCostInUsd(): Double {
        val monthlyCost = calculateMonthlyCost()
        return currency.convertToUsd(monthlyCost)
    }
​
    // Formatting for display
    fun formatCost(): String {
        return currency.formatAmount(cost)
    }
​
    companion object {
        // Factory method for creating new subscriptions
        fun create(
            name: String,
            cost: Double,
            currency: Currency,
            billingCycle: BillingCycle,
            nextPaymentDate: Instant,
            notes: String? = null,
            now: Instant = Clock.System.now()
        ): Subscription {
            val id = uuid4().toString()
            return Subscription(
                id = id,
                name = name,
                cost = cost,
                currency = currency,
                billingCycle = billingCycle,
                nextPaymentDate = nextPaymentDate,
                createdAt = now,
                updatedAt = now,
                notes = notes
            )
        }
    }
}
```

---

## 🎨 Building the UI with Compose Multiplatform

### 1. Material Design 3 Theme

```kotlin
@Composable
fun KyklosTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) {
        DarkColorScheme
    } else {
        LightColorScheme.copy(
            primary = KyklosColors.KyklosPrimary,
            onPrimary = KyklosColors.KyklosOnPrimary,
            primaryContainer = KyklosColors.KyklosPrimaryContainer,
            onPrimaryContainer = KyklosColors.KyklosOnPrimaryContainer,
        )
    }
​
    // Modern rounded shapes that work well on both platforms
    val modernShapes = Shapes(
        extraSmall = RoundedCornerShape(8.dp),
        small = RoundedCornerShape(12.dp),
        medium = RoundedCornerShape(16.dp),
        large = RoundedCornerShape(24.dp),
        extraLarge = RoundedCornerShape(32.dp)
    )
​
    MaterialTheme(
        colorScheme = colorScheme,
        shapes = modernShapes,
        typography = KyklosTypography,
        content = content
    )
}
```

### 2. Reusable UI Components

#### Subscription Card Component

```kotlin :collapsed-lines
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SubscriptionCard(
    subscription: Subscription,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        onClick = onClick,
        modifier = modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
        `    // Header row with name and cost
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = subscription.name,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    modifier = Modifier.weight(1f)
                )
    ​
                Text(
                    text = subscription.formatCost(),
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
            }
    ​
            Spacer(modifier = Modifier.height(8.dp))
    ​
            // Footer row with next payment and billing cycle
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Next payment: ${subscription.nextPaymentDate.formatDate()}",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
    ​
                Text(
                    text = subscription.billingCycle.displayName,
                    style = MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.secondary
                )
            }`
        }
    }
}
```

### 3. Screen-Level Composables

```kotlin :collapsed-lines
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SubscriptionListScreen(
    subscriptions: List<Subscription> = emptyList(),
    totalMonthlyCost: String = "$0.00",
    onAddSubscription: () -> Unit = {},
    onSubscriptionClick: (Subscription) -> Unit = {},
    modifier: Modifier = Modifier
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "Kyklos",
                        style = MaterialTheme.typography.headlineMedium,
                        fontWeight = FontWeight.Bold
                    )
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer,
                    titleContentColor = MaterialTheme.colorScheme.onPrimaryContainer
                )
            )
        },
        floatingActionButton = {
            ExtendedFloatingActionButton(
                onClick = onAddSubscription,
                icon = {
                    Icon(
                        imageVector = Icons.Default.Add,
                        contentDescription = null
                    )
                },
                text = {
                    Text("Add Subscription")
                },
                containerColor = MaterialTheme.colorScheme.primary,
                contentColor = MaterialTheme.colorScheme.onPrimary
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = modifier.padding(paddingValues),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Monthly summary card
            item {
                MonthlySummaryCard(
                    totalMonthlyCost = totalMonthlyCost,
                    subscriptionCount = subscriptions.size
                )
            }
    ​
            // Subscription list
            items(subscriptions) { subscription ->
                SubscriptionCard(
                    subscription = subscription,
                    onClick = { onSubscriptionClick(subscription) }
                )
            }
    ​
            // Empty state
            if (subscriptions.isEmpty()) {
                item {
                    EmptyStateComponent(
                        message = "No subscriptions yet",
                        actionText = "Add your first subscription",
                        onActionClick = onAddSubscription
                    )
                }
            }
        }
    }
}
```

---

## ⚠️ iOS Compatibility: Critical Gotchas

When developing for iOS with Kotlin Multiplatform, there are several compatibility gotchas to watch out for:

::: tip 💡 Pro Tip

These gotchas cost me hours of debugging. Learning them upfront will save you significant development time.

:::

### 1. String Formatting

#### ❌ Don't use:

```kotlin
String.format("%.2f", value)  // Not available on iOS/KMP
```

#### ✅ Use instead:

```kotlin
// Option 1: String templates for simple cases
"${currency.symbol}$cost"
​
// Option 2: Expect/actual pattern for complex formatting
expect fun Double.formatCurrency(symbol: String): String
​
// Android actual
actual fun Double.formatCurrency(symbol: String): String =
    "$symbol%.2f".format(this)
​
// iOS actual (using NSString)
actual fun Double.formatCurrency(symbol: String): String =
    NSString.init(format = "$symbol%.2f", this).toString()
​
// Option 3: Manual precision handling (less preferred)
fun Double.toCurrencyString(symbol: String): String {
    val rounded = (this \* 100).toLong() / 100.0
    return "$symbol$rounded"
}
```

### 2. UUID Generation

#### ❌ Don't use:

```kotlin
UUID.randomUUID()  // Java UUID not available on iOS
```

#### ✅ Use instead:

```kotlin
import com.benasher44.uuid.uuid4

val id = uuid4().toString()  // Cross-platform UUID
```

---

## 🚀 Building and Running

### Build Commands

```sh
# Android
./gradlew compileDebugKotlinAndroid    # Compile Android code
./gradlew installDebug                 # Install on device/emulator

# iOS (compilation check)
./gradlew compileKotlinIosX64         # Compile iOS code
./gradlew linkDebugFrameworkIosX64    # Link iOS framework

# All platforms
./gradlew build                       # Build all targets

# SQLDelight
./gradlew generateCommonMainKyklosDatabaseInterface

# Clean build
./gradlew clean build
```

---

## 📱 Running on iOS Simulator

To run your Kotlin Multiplatform app on the iOS Simulator:

### 1. Generate iOS Framework

```sh
# Build the iOS framework
./gradlew linkDebugFrameworkIosX64
```

### 2. Open iOS Project in Xcode

```sh
# Navigate to iOS app directory
cd iosApp

# Open in Xcode
open iosApp.xcodeproj
```

### 3. Configure and Run

- **Select Target Device:**
  - In Xcode, click on the device selection dropdown
  - Choose your preferred iOS Simulator (e.g., iPhone 15, iPad Pro)
- **Build and Run:**
  - Press <kbd>Cmd</kbd>+<kbd>R</kbd> or click the Run button
  - Xcode will build the project and launch the iOS Simulator

### 4. Development Workflow

For efficient development:

- Make Kotlin changes in your shared code
- Rebuild framework: `./gradlew linkDebugFrameworkIosX64`
- Run from Xcode to test changes on iOS Simulator
- Use Compose Hot Reload when available for UI changes

### 5. Troubleshooting iOS Issues

#### Common Issues:

::: tabs

@tab:active 1. Framework Not Found:

```sh
# Clean and rebuild framework
./gradlew clean
./gradlew linkDebugFrameworkIosX64
```

@tab 2. Simulator Not Starting:

```sh
# Reset simulator
xcrun simctl erase all
xcrun simctl boot "iPhone 15"
```

@tab 3. Build Errors in Xcode:

- Ensure your iOS deployment target matches your KMP project settings
- Check that the framework is properly linked in Xcode project settings
- Verify the framework search paths in Build Settings

:::

---

## 🎯 Advanced Features and Next Steps

### Current Implementation Status

Based on the current Kyklos codebase, we have successfully implemented:

::: info ✅ Core Features:

- Cross-platform project setup with KMP
- SQLDelight database configuration
- Material Design 3 theming
- Clean Architecture foundation
- Basic UI components and screens

:::

### Immediate Next Steps

- **Complete CRUD Operations** - Full subscription management
- **State Management** - Add StateFlow and ViewModel integration
- **Dependency Injection** - Implement Koin for DI
- **Navigation** - Add Compose Navigation with type safety
- **Error Handling** - Comprehensive error states and recovery

### Future Roadmap

- **Networking** - Add Ktor for API calls and sync
- **Testing Suite** - Comprehensive test coverage (planned for Part 5 of this series)
- **CI/CD** - GitHub Actions for automated builds and testing
- **Platform Expansion** - Web and Desktop support with Compose Multiplatform

::: important 📚 Key Takeaways

Building a Kotlin Multiplatform app teaches several valuable lessons:

- **Architecture Matters** - Clean Architecture provides excellent separation of concerns across platforms
- **SQLDelight is Powerful** - Type-safe SQL with excellent cross-platform support makes data management a breeze
- **iOS Compatibility** - Be mindful of platform-specific APIs and always test on both platforms early and often
- **Compose Multiplatform** - With iOS stable support, truly shared UI is now production-ready
- **expect/actual Pattern** - Elegant solution for platform-specific implementations when needed

:::

---

## 🎯 Conclusion

Kotlin Multiplatform Mobile has matured into a production-ready solution for cross-platform development. With Compose Multiplatform for iOS now stable, developers can share both business logic and UI code while maintaining native performance and platform-specific optimizations.

The **Kyklos** subscription management app demonstrates how to build a real-world application using modern KMP practices. By following Clean Architecture principles and leveraging powerful libraries like SQLDelight, you can create maintainable, testable, and scalable cross-platform applications.

**Ready to start your KMP journey?** The complete source code for this tutorial is available on [GitHub (<FontIcon icon="iconfont icon-github"/>`tomriddle25/kyklos`)](https://github.com/tomriddle25/kyklos), showcasing the foundation we've built together. While we're still implementing the full feature set, the architecture and setup demonstrate production-ready KMP practices you can use as a reference for your own projects.

::: info Coming Next in This Series:

📝 **Part 2:** "KMP Reality Check: 5 Gotchas That Almost Killed My Project"  
📝 **Part 3:** "Material 3 on iOS: What Works, What Doesn't, What's Coming"  
📝 **Part 4:** "State Management in KMP: Beyond ViewModel"  
📝 **Part 5:** "Adding Comprehensive Testing to Your KMP Project"

**Follow me for updates on the Kyklos development journey!**

:::

Have questions about Kotlin Multiplatform development? Found this tutorial helpful? Share your thoughts and experiences in the comments below!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building Your First Kotlin Multiplatform App: From Setup to iOS App Store with Compose Multiplatform (2025 Guide)",
  "desc": "A comprehensive guide to building your first Kotlin Multiplatform app using Compose Multiplatform, covering setup, development, and deployment",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/kmp-to-compose-guide.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
