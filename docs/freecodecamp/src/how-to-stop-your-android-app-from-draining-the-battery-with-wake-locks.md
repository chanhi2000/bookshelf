---
lang: en-US
title: "How to Stop Your Android App from Draining the Battery with Wake Locks"
description: "Article(s) > How to Stop Your Android App from Draining the Battery with Wake Locks"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - java
  - kotlin
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Stop Your Android App from Draining the Battery with Wake Locks"
    - property: og:description
      content: "How to Stop Your Android App from Draining the Battery with Wake Locks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-stop-your-android-app-from-draining-the-battery-with-wake-locks.html
prev: /programming/java-android/articles/README.md
date: 2026-10-01
isOriginal: false
author:
  - name: Nikheel Vishwas Savant
    url: https://freecodecamp.org/news/author/nsavant/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f08ae713-8957-4954-b29f-0efc696b0de8.png
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
  name="How to Stop Your Android App from Draining the Battery with Wake Locks"
  desc="A wake lock is one of the simplest APIs in Android and one of the easiest to misuse. Acquiring one takes a single line of code. Forgetting to release it can keep a phone's CPU awake for hours, drain t"
  url="https://freecodecamp.org/news/how-to-stop-your-android-app-from-draining-the-battery-with-wake-locks"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f08ae713-8957-4954-b29f-0efc696b0de8.png"/>

A wake lock is one of the simplest APIs in Android and one of the easiest to misuse. Acquiring one takes a single line of code. Forgetting to release it can keep a phone's CPU awake for hours, drain the battery overnight, and earn your app a warning label on Google Play.

Most wake lock bugs aren't caused by a misunderstanding of the API itself. They come from ordinary control flow problems: an exception thrown between `acquire()` and `release()`, an early return, a callback that never fires, or a reference count that drifts out of balance.

These bugs are hard to spot in code review and invisible during normal testing, because the device is usually plugged in and awake anyway.

This article explains what a wake lock actually does at the system level, walks through the most common ways apps leak them, and shows concrete patterns and tools for preventing and detecting leaks. It also covers the modern APIs that remove the need for manual wake locks in most cases.

::: note Prerequisites

You should be comfortable writing Android apps in Kotlin and know the basics of services, broadcast receivers, and coroutines.

You'll also need `adb` installed and a physical device for the debugging section. Emulators don't model power states in a realistic way, so some of the commands later in the article produce misleading results on them.

:::

---

## What Happens When an Android Device Sleeps

When the screen turns off and nothing else needs the CPU, Android puts the application processor into a low power suspend state. In this state, the CPU stops executing instructions, most of RAM is kept in self refresh, and only a few hardware blocks (the modem, the real time clock, sensor hubs, and a handful of interrupt controllers) stay alive. The device looks idle but is ready to wake up quickly when an interrupt arrives.

Android uses a mechanism called autosleep. The kernel tries to suspend the system as soon as there's no reason to stay awake. Anything that needs the CPU to keep running has to say so explicitly by holding a wakeup source (the kernel term for what Android calls a wake lock). As long as at least one wakeup source is active, the kernel refuses to suspend.

```mermaid
flowchart TD
  A[Screen off] --> B[Any active wakeup sources?] 
  B -- yes --> C[CPU stays awake]
  B -- no --> D[Kernel suspends CPU]
  D --> E[Interrupt (alarm, network packet, button press)]
  E --> F[CPU resumes, driver or framework takes a wake lock to handle the event]
```

The above diagram shows the decision the kernel makes repeatedly while the screen is off. If any wakeup source is held, the CPU keeps running. If none are held, the system suspends until a hardware interrupt arrives. When the device resumes, whatever code handles the interrupt usually grabs a short wake lock so it can finish its work before the kernel tries to suspend again.

The important detail is that staying awake is opt in. Your code doesn't get CPU time while the screen is off unless something is holding a wake lock on its behalf.

---

## What a Wake Lock Does

An app level wake lock is a request to `PowerManagerService`, a system service running inside `system_server`. When your app calls `acquire()`, the call goes over Binder to that service, which records the request along with your UID, a tag string, and the lock type. `PowerManagerService` aggregates all app requests and holds a single kernel wakeup source on behalf of all of them. When the last app level lock is released, it drops the kernel wakeup source and the device is free to suspend.

This design has two consequences worth understanding. First, the system knows exactly which app holds each lock and for how long, which is how battery statistics and Play Console vitals can blame your app.

Second, `PowerManagerService` links each lock to your process through a Binder death notification. If your process dies, the system releases its locks automatically. A leak is therefore bounded by the lifetime of your process, but processes that run foreground services or are kept alive by the system can live for many hours.

---

## The Types of Wake Locks

The `PowerManager` class defines several lock levels. Most of them are deprecated, and in practice only one matters for app developers.

| Level | Keeps CPU on | Keeps screen on | Status |
| --- | --- | --- | --- |
| `PARTIAL_WAKE_LOCK` | Yes | No | Current, the only one most apps should use |
| `SCREEN_DIM_WAKE_LOCK` | Yes | Yes, dimmed | Deprecated since API 17 |
| `SCREEN_BRIGHT_WAKE_LOCK` | Yes | Yes, full brightness | Deprecated since API 13 |
| `FULL_WAKE_LOCK` | Yes | Yes, plus keyboard backlight | Deprecated since API 17 |
| `PROXIMITY_SCREEN_OFF_WAKE_LOCK` | No | Turns screen off near proximity sensor | Current, used by calling apps |

The first column is the constant you pass to `newWakeLock()`, and the next two describe what the lock keeps powered. The screen-related levels were deprecated because apps kept them held after the user left, leaving the display on and the battery draining.

The replacement for keeping the screen on is the `FLAG_KEEP_SCREEN_ON` window flag (or `android:keepScreenOn` in a layout), which the window manager ties to the visibility of your window, so it can't leak. The proximity lock is a special case for in-call screens. For everything else, "wake lock" in modern Android means `PARTIAL_WAKE_LOCK`, and the rest of this article focuses on it.

---

## How to Acquire and Release a Wake Lock

Using a wake lock requires the `WAKE_LOCK` permission in your manifest. It's a normal permission, so it's granted at install time without a prompt.

```xml title="android/app/src/main/AndroidManifest.xml"
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

This line declares that the app may hold wake locks. Without it, `acquire()` throws a `SecurityException`. Because the permission is granted silently, users have no idea your app uses wake locks until they look at battery usage, which is one more reason to be careful with them.

Here's the most basic usage.

```kotlin
val powerManager = context.getSystemService(PowerManager::class.java)
val wakeLock = powerManager.newWakeLock(
    PowerManager.PARTIAL_WAKE_LOCK,
    "myapp:upload"
)

wakeLock.acquire(10 * 60 * 1000L) // 10 minutes
uploadPendingFiles()
wakeLock.release()
```

The code gets the `PowerManager` system service and creates a `WakeLock` object with the partial level and a tag. Creating the object does nothing by itself. The CPU is only kept awake between `acquire()` and `release()`.

The tag `"myapp:upload"` shows up in `dumpsys`, Battery Historian, and Play Console, so it should identify both your app and the specific job.

The `app:component` format is the convention Google recommends, and it saves real time during debugging. The argument to `acquire()` is a timeout in milliseconds. If the lock is still held after 10 minutes, the system releases it for you.

This snippet looks correct but has a real bug: if `uploadPendingFiles()` throws, `release()` never runs. The timeout limits the damage to 10 minutes, but that's still 10 minutes of battery drain for every failure. The next sections explain how to fix this and what other traps exist.

---

## How Reference Counting Works

Wake locks are reference counted by default. Each call to `acquire()` increments an internal counter, each call to `release()` decrements it, and the lock is only dropped when the counter reaches zero.

```kotlin
wakeLock.acquire(60_000L)  // count = 1, lock held
wakeLock.acquire(60_000L)  // count = 2
wakeLock.release()         // count = 1, still held
wakeLock.release()         // count = 0, lock released
wakeLock.release()         // throws RuntimeException: WakeLock under-locked
```

The first two calls push the count to two. The first release only brings it back to one, so the lock stays held even though the code "released" it.

The lock is actually dropped on the second release. A third release, with nothing left to release, throws `RuntimeException` with the message "WakeLock under-locked". This is a crash in production, which is why some developers wrap `release()` in a `try` block or check `isHeld` first.

Reference counting is useful when several independent pieces of code share a single `WakeLock` object. It becomes a problem when the number of acquires and releases doesn't match, for example when a function is called twice but its completion callback fires only once.

You can turn reference counting off with `setReferenceCounted(false)`, after which any single `release()` drops the lock no matter how many times it was acquired. That's often the simpler model when one component owns the lock.

---

## Common Ways Apps Leak Wake Locks

Wake lock leaks almost always fall into a small number of patterns. Recognizing them makes code review far more effective.

### Exceptions and Early Returns

The basic example above is the most common leak. Any code path that exits the function between `acquire()` and `release()` without running the release is a leak. That includes thrown exceptions, `return` statements added later by someone who didn't notice the lock, and `break` or `continue` inside loops.

```kotlin
fun syncContacts() {
    wakeLock.acquire(5 * 60 * 1000L)
    val account = accountStore.current() ?: return
    api.pushContacts(account)
    wakeLock.release()
}
```

This function leaks the lock whenever there's no current account, because the early `return` skips the release. It also leaks when `pushContacts()` throws a network exception. Both paths look harmless in isolation. The timeout keeps the leak from being permanent, but every failed sync still costs 5 minutes of awake time.

### Asynchronous Work That Outlives the Caller

Wake locks are often acquired in one place and released in a callback somewhere else. If the callback never runs, the lock is never released.

```kotlin
fun startDownload(url: String) {
    wakeLock.acquire()
    downloader.enqueue(url, object : Callback {
        override fun onComplete() {
            wakeLock.release()
        }
        override fun onError(e: Throwable) {
            log("download failed", e)
        }
    })
}
```

Two mistakes are here. The error callback forgets to release the lock, so every failed download leaks it. And the lock is acquired with no timeout at all, so the leak lasts until the process dies.

There is a third, less obvious risk: if `downloader` is ever cancelled or drops the request without calling either callback, the lock also leaks. Any design where the release depends on a third party calling you back needs a timeout as a safety net.

### Unbalanced Reference Counts

When a shared, reference counted lock is acquired more times than it's released, it stays held even though every code path appears to release it.

```kotlin
class LocationTracker(private val wakeLock: PowerManager.WakeLock) {
    fun onStart() {
        wakeLock.acquire(30 * 60 * 1000L)
        startUpdates()
    }

    fun onStop() {
        stopUpdates()
        wakeLock.release()
    }
}
```

This class looks balanced. The problem appears when `onStart()` is called twice (for example after a configuration change or a duplicate intent) but `onStop()` is called once. The count ends at one, and the lock stays held until its timeout expires. Turning off reference counting, or guarding the acquire with `if (!wakeLock.isHeld)`, fixes this particular bug.

### Broadcast Receivers That Start Background Work

The system holds a wake lock for you while `onReceive()` runs. As soon as `onReceive()` returns, that lock is released, and the process may be treated as idle.

A common mistake is to acquire a separate wake lock in `onReceive()`, start a thread, and release the lock from the thread. If the process is killed or the thread hangs, the release never happens.

The older `WakefulBroadcastReceiver` helper was built for this pattern and is now deprecated because of these problems. The modern alternatives are covered later in this article.

### Holding a Lock Across Unbounded Operations

Network requests without timeouts, waiting on a `CountDownLatch` without a deadline, and blocking reads from a Bluetooth socket are all operations that can hang forever. If a wake lock is held around one of them, the lock hangs too. The code technically releases the lock in every path, but the release is never reached because the operation never finishes.

---

## Patterns That Prevent Leaks

The fixes for these leaks come down to a few habits that are easy to apply consistently.

### Always Use a Timeout

Every call to `acquire()` should pass a timeout. Android Lint enforces this with the `WakelockTimeout` check, which flags calls to `acquire()` with no arguments.

Pick a timeout that's comfortably longer than the work should ever take, but short enough that a leak is survivable. For a sync job that normally finishes in 20 seconds, a few minutes is reasonable. An hour is not.

### Release in a Finally Block

Structured release is the single most effective fix. In Kotlin, a small extension function makes it hard to get wrong.

```kotlin
inline fun <T> PowerManager.WakeLock.withLock(
    timeoutMs: Long,
    block: () -> T
): T {
    acquire(timeoutMs)
    try {
        return block()
    } finally {
        if (isHeld) release()
    }
}
```

The function acquires the lock with a mandatory timeout, runs the caller's block, and releases the lock in a `finally` clause. Because of `finally`, the release runs on normal completion, on early return from the block, and when an exception propagates.

The `isHeld` check matters because the timeout may have already released the lock if the block ran long. Without the check, the `release()` call would throw "WakeLock under-locked" and replace whatever exception the block originally threw. Marking the function `inline` lets callers use `return` from the enclosing function inside the block, and the `finally` clause still runs.

With the helper in place, the contact sync function from earlier becomes safe.

```kotlin
fun syncContacts() = wakeLock.withLock(timeoutMs = 5 * 60 * 1000L) {
    val account = accountStore.current() ?: return
    api.pushContacts(account)
}
```

The early return and any exception from `pushContacts()` now both pass through the `finally` block in `withLock`, so the lock is released on every path. The call site is also shorter, and a reviewer can confirm correctness at a glance without tracing every branch.

### Scope Locks to Coroutines Carefully

The same pattern works inside a coroutine, because cancellation in Kotlin is delivered as a `CancellationException` and `finally` blocks run when a coroutine is cancelled.

```kotlin
suspend fun uploadAll(files: List<File>) {
    wakeLock.acquire(10 * 60 * 1000L)
    try {
        withTimeout(9 * 60 * 1000L) {
            files.forEach { api.upload(it) }
        }
    } finally {
        if (wakeLock.isHeld) wakeLock.release()
    }
}
```

The lock is acquired before the work starts and released in `finally`, which runs on completion, on failure, and on cancellation of the enclosing scope. `withTimeout` puts a hard deadline on the uploads themselves, set slightly shorter than the wake lock timeout so the coroutine gives up before the system forcibly drops the lock. This addresses the unbounded operation problem described earlier.

One caveat: the `inline` helper from the previous section can also be used here, since inline lambdas can call suspend functions when invoked from a suspend context.

### Give Each Job Its Own Lock

Sharing one `WakeLock` object across unrelated features makes reference counts hard to reason about and makes battery stats useless, because every feature reports the same tag. Creating a separate lock with a descriptive tag per job costs almost nothing and makes leaks far easier to attribute.

If you do share a lock, disable reference counting or make sure a single owner manages it.

### Attribute Work Correctly

If your code acquires a wake lock on behalf of another app or UID (common in system services and SDKs), call `setWorkSource()` so the battery cost is charged to the right party. Apps rarely need this, but platform and OEM engineers should know it exists.

---

## When You Don't Need a Wake Lock at All

The best way to avoid leaking a wake lock is to not hold one. Most background work on modern Android should use a higher level API that manages wake locks internally.

| Need | Use instead of a manual wake lock |
| --- | --- |
| Deferrable background work (sync, uploads, cleanup) | WorkManager or JobScheduler |
| Work that must run at an exact time | `AlarmManager.setExactAndAllowWhileIdle()` plus a short job |
| Short follow up work after a broadcast | `BroadcastReceiver.goAsync()` |
| Long running work the user is aware of (music, navigation, workouts) | A foreground service with the appropriate type |
| Keeping the screen on while an activity is visible | `FLAG_KEEP_SCREEN_ON` |
| User initiated data transfers | User initiated data transfer jobs (API 34 and later) |

The left column describes what the app is trying to do, and the right column names the API that covers it. The common thread is that each of these APIs takes a wake lock on your behalf and releases it when your work finishes or times out.

WorkManager and JobScheduler hold a wake lock for the duration of `doWork()` or `onStartJob()` and enforce execution limits. `goAsync()` extends the system's broadcast wake lock for roughly 10 seconds while you finish up. `FLAG_KEEP_SCREEN_ON` is tied to window visibility and disappears when the user leaves.

Here's a WorkManager worker that replaces the upload example.

```kotlin
class UploadWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result {
        return try {
            uploadPendingFiles()
            Result.success()
        } catch (e: IOException) {
            Result.retry()
        }
    }
}
```

`CoroutineWorker` runs `doWork()` while JobScheduler holds a wake lock for it. When `doWork()` returns, the wake lock is released, whether the result is success, failure, or retry. If the work runs too long, the system stops it and cancels the coroutine. There's no `acquire()` or `release()` in the code, so there's nothing to leak. Returning `Result.retry()` on an I/O failure lets WorkManager schedule another attempt with backoff instead of the app keeping the CPU awake while it retries in a loop.

Manual wake locks still have a place. Media players, VoIP stacks, and apps that stream data from a connected device over Bluetooth often need to keep the CPU running while a foreground service is active. In those cases, the service is the lifecycle owner, and the wake lock should be acquired in `onCreate()` or when playback starts, and released in the matching stop path and in `onDestroy()`.

It also helps to know that Doze mode limits what a wake lock can do. When a device enters Doze, the system ignores partial wake locks held by apps that aren't on the battery optimization allowlist. That's not a license to leak, since the lock is still counted during maintenance windows and while the device is active, but it explains why a wake lock alone doesn't guarantee your code keeps running overnight.

---

## How to Detect Wake Lock Leaks

Leaks rarely show up during development because the device is plugged in, the screen is on, and something else is keeping it awake. You need to look for them deliberately.

### Check Currently Held Locks with dumpsys power

The quickest check is to ask `PowerManagerService` what it's holding right now.

```sh
adb shell dumpsys power | grep -A 20 "Wake Locks:"
```

This command dumps the full state of the power manager and filters it to the wake lock section. The output lists every app level wake lock currently held, one per line.

```plaintext
Wake Locks: size=2
  PARTIAL_WAKE_LOCK              'myapp:upload' ACQ=-14m32s110ms (uid=10245 pid=8123)
  PARTIAL_WAKE_LOCK              'AudioMix' ACQ=-3s204ms (uid=1041 ws=WorkSource{10112})
```

Each line shows the lock level, the tag, how long ago it was acquired (`ACQ`), and the owning UID and process.

In this example, `myapp:upload` has been held for over 14 minutes, which is a strong hint of a leak if uploads normally take seconds. The second entry is held by the audio server on behalf of another app, as shown by its work source. Turn the screen off, wait a minute, and run this command again. Any lock from your app that is still present with a growing `ACQ` time deserves investigation.

### Measure Totals with batterystats

`dumpsys power` shows the current moment. To see how much wake lock time accumulated over a period, use battery statistics.

```sh
adb shell dumpsys batterystats --reset
# unplug, use the device normally or leave it idle for a while
adb shell dumpsys batterystats com.example.myapp | grep -i "wake lock"
```

The first command clears the collected statistics so the measurement starts fresh. After running the device on battery for a while (at least an hour gives useful numbers), the second command prints statistics for your package, filtered to wake lock lines.

You'll see each tag along with its total held time and how many times it was acquired. A tag with a large total time and a small acquire count usually means a lock was held for a long stretch and not released promptly.

For a visual timeline, capture a bug report with `adb bugreport` and load it into Battery Historian, or record a Perfetto trace with the `android.power` data source enabled. Both show wake locks as bars on a timeline next to screen state, network activity, and CPU frequency, which makes it easy to see a lock that stays held long after the related activity stopped.

### Watch Android Vitals in Play Console

Google Play tracks excessive partial wake lock usage as an Android vitals metric. A user session counts as excessive when the app holds non-exempt partial wake locks for a long cumulative period (the current definition is 2 or more hours within a 24 hour window) while in the background. Wake locks held by some system managed work, such as audio playback or certain job types, are exempt.

Play has made this a core vital, which means apps that exceed the bad behavior threshold can have reduced visibility in the store and may show a warning on their listing. The exact thresholds and exemptions change over time, so check the current Android vitals documentation, but the practical takeaway is stable: leaked wake locks are now a store ranking problem, not just a battery complaint.

### Enable Lint Checks

Android Lint includes two relevant checks. `Wakelock` flags code paths where a lock is acquired but may not be released, and `WakelockTimeout` flags acquires without a timeout. Both are enabled by default as warnings. Raising them to errors in your <VPIcon icon="iconfont icon-code"/>`lint.xml` or Gradle configuration stops new leaks from being merged.

```kotlin title="build.gradle.kts"
android {
    lint {
        error += listOf("Wakelock", "WakelockTimeout")
    }
}
```

This Gradle block promotes both checks from warnings to errors, so the build fails when either pattern appears. Lint is static and can't follow every asynchronous path, so it won't catch the callback leak shown earlier, but it catches the simple cases cheaply.

---

## How to Test Wake Lock Behavior

Wake lock handling is easy to cover with unit tests using Robolectric, which provides a shadow implementation of `PowerManager`.

```kotlin
@RunWith(RobolectricTestRunner::class)
class ContactSyncTest {

    @Test
    fun releasesWakeLockWhenSyncFails() {
        val context = ApplicationProvider.getApplicationContext<Context>()
        val syncer = ContactSyncer(context, api = FailingApi())

        runCatching { syncer.syncContacts() }

        val lock = ShadowPowerManager.getLatestWakeLock()
        assertThat(lock).isNotNull()
        assertThat(lock.isHeld).isFalse()
    }
}
```

The test creates the component under test with a fake API that always throws. It runs the sync and ignores the exception, then asks Robolectric for the most recently created wake lock.

The two assertions check that a lock was actually used and that it's no longer held after the failure. Tests like this are cheap to write for every error path, and they catch exactly the exception and early return leaks that are hardest to see in review. Injecting the `WakeLock` (or a small wrapper interface around it) into your classes makes this even easier, because you can then use a plain fake without Robolectric.

---

## Wake Locks Below the Framework

If you work on platform code, HALs, or native daemons, you deal with wake locks one layer lower. Native code can call `acquire_wake_lock()` and `release_wake_lock()` from `libpower`, and on current Android versions these go through the `SystemSuspend` service, which owns the interface to the kernel's `/sys/power/wake_lock` file.

The AIDL interface of `SystemSuspend` returns an `IWakeLock` object from `acquireWakeLock()`. The lock is held as long as that object is alive and is released when the last reference is dropped, which gives native code the same scoped lifetime as the Kotlin `finally` pattern.

The kernel exposes the full list of wakeup sources (including those held by drivers, not just the one held by `PowerManagerService`) under `/sys/class/wakeup/` on recent kernels, or `/sys/kernel/debug/wakeup_sources` on older ones with debugfs. Reading either requires elevated privileges. When `dumpsys power` shows no app wake locks but the device still refuses to suspend, a driver or native daemon holding a kernel wakeup source is usually the cause, and these files show which one.

---

## Summary

A wake lock tells the system that some code needs the CPU to stay awake even though the screen is off. App level wake locks are managed by `PowerManagerService`, which tracks every lock by UID and tag and holds a single kernel wakeup source for all of them. Because staying awake is opt in, a lock that's never released keeps the device from suspending and drains the battery until it times out or the process dies.

Most leaks come from ordinary control flow: exceptions and early returns that skip `release()`, error callbacks that forget to release, reference counts that drift out of balance, and locks held around operations that never finish.

The fixes are equally ordinary. Always pass a timeout, release in a `finally` block (ideally through a small helper like `withLock`), give each job its own tagged lock, and put deadlines on the work inside the lock.

In most cases, the better choice is to avoid manual wake locks entirely. WorkManager, JobScheduler, `goAsync()`, foreground services, and `FLAG_KEEP_SCREEN_ON` all manage the lock for you and release it when the work ends. When you do need one, verify it with `dumpsys power`, `batterystats`, Perfetto or Battery Historian, Lint, and unit tests that cover the failure paths.

With Play now treating excessive wake locks as a core vital, catching these leaks before release matters for both your users' batteries and your app's visibility in the store.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Stop Your Android App from Draining the Battery with Wake Locks",
  "desc": "A wake lock is one of the simplest APIs in Android and one of the easiest to misuse. Acquiring one takes a single line of code. Forgetting to release it can keep a phone's CPU awake for hours, drain t",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-stop-your-android-app-from-draining-the-battery-with-wake-locks.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
