---
lang: en-US
title: "How to Avoid JNI Crashes by Managing Local and Global References Correctly"
description: "Article(s) > How to Avoid JNI Crashes by Managing Local and Global References Correctly"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - C++
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - java
  - jdk
  - kotlin
  - android
  - c++
  - cpp
  - c-plus-plus
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Avoid JNI Crashes by Managing Local and Global References Correctly"
    - property: og:description
      content: "How to Avoid JNI Crashes by Managing Local and Global References Correctly"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-avoid-jni-crashes-by-managing-local-and-global-references-correctly.html
prev: /programming/java-android/articles/README.md
date: 2026-10-04
isOriginal: false
author:
  - name: Nikheel Vishwas Savant
    url: https://freecodecamp.org/news/author/nsavant/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a1d2cb14-64c8-4b13-b428-acb6717c7594.png
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

```component VPCard
{
  "title": "C++ > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cpp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Avoid JNI Crashes by Managing Local and Global References Correctly"
  desc="Most JNI crashes don't come from complicated logic. They come from a small set of mistakes around object references: holding on to a reference after it has become invalid, creating references faster t"
  url="https://freecodecamp.org/news/how-to-avoid-jni-crashes-by-managing-local-and-global-references-correctly"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a1d2cb14-64c8-4b13-b428-acb6717c7594.png"/>

Most JNI crashes don't come from complicated logic. They come from a small set of mistakes around object references: holding on to a reference after it has become invalid, creating references faster than they're released, or passing a reference to a thread that was never allowed to use it.

These bugs are hard to track down because the crash often happens far away from the line that caused it, sometimes minutes later, inside the garbage collector.

The Java Native Interface gives C and C++ code a way to call into the JVM and work with Java objects. Native code never gets a raw pointer to a Java object. It gets a reference, and each kind of reference comes with its own rules about how long it stays valid, which threads can use it, and who's responsible for freeing it. Once those rules are clear, most JNI crashes become easy to prevent and easy to diagnose.

This article explains how local, global, and weak global references work, walks through the most common mistakes with broken and fixed code for each, and finishes with tools and patterns (CheckJNI and RAII wrappers) that catch these problems before they reach production.

The examples use C++ and Android conventions, but the reference rules come from the JNI specification and apply to any JVM.

::: note Prerequisites

You should be comfortable reading C++ and Java, and you should have written or at least read a basic JNI function (one declared with `extern "C" JNIEXPORT` and called from a Java `native` method).

Familiarity with the Android NDK helps for the Android specific parts, but it's not required to follow the core ideas.

:::

---

## How JNI References Work

A Java object lives on the managed heap, and the garbage collector is free to move it whenever it compacts memory.

If native code held a raw pointer to that object, the pointer would silently go stale after the next compaction. JNI avoids this by handing native code an opaque handle instead. Types like `jobject`, `jclass`, `jstring`, and `jobjectArray` are all handles of this kind.

```plaintext
 Native code                 JVM reference tables             Managed heap
 +-------------+            +----------------------+         +------------+
 | jobject h   + -------->  | slot 17 : ptr        + ------> |  User obj  |
 +-------------+            +----------------------+         +------------+
                              (GC updates the ptr
                               when the object moves)
```

The diagram above shows the indirection that makes JNI references safe. Native code holds a handle (`h`), which points at a slot in a reference table owned by the JVM. That slot holds the real address of the object on the managed heap.

When the garbage collector moves the object, it updates the pointer stored in the slot, and the handle in native code stays valid. The slot also acts as a GC root, which means that as long as the slot exists, the object it points to can't be collected.

Every rule about references comes down to one question: when does that slot get freed?

JNI has three kinds of references, and they differ in exactly that respect. A local reference's slot is freed automatically when the native method returns. A global reference's slot lives until native code explicitly deletes it. A weak global reference also lives until deleted, but it doesn't keep the object alive, so the object behind it can disappear at any time.

---

## Local References

Almost every JNI function that returns a Java object returns a local reference. `FindClass`, `NewStringUTF`, `GetObjectArrayElement`, `CallObjectMethod`, and `GetObjectClass` all do this. Arguments passed into a native method (including `thiz` or the `jclass` for static methods) are local references too.

A local reference is valid only within the native method call that created it, and only on the thread that created it. When the native method returns to Java, the JVM frees every local reference created during that call in one step. This is convenient for short functions, and it's the reason most JNI code never calls `DeleteLocalRef` at all.

The convenience has limits. The local reference table has a fixed capacity per call frame. The JNI specification only guarantees room for 16 local references, and you must call `EnsureLocalCapacity` if you need more.

In practice, JVMs give you much more than that. Older Android versions capped the table at 512 entries, and exceeding it aborted the process with `local reference table overflow (max=512)`. Newer versions of ART raised the limit considerably, but any code that creates local references in an unbounded loop will still eventually run out.

---

## Pitfall 1: Leaking Local References in a Loop

The most common local reference bug is a loop that creates a new reference on every iteration and never releases it.

```cpp
extern "C" JNIEXPORT void JNICALL
Java_com_example_NameProcessor_processNames(JNIEnv* env, jobject thiz,
                                            jobjectArray names) {
  jsize count = env->GetArrayLength(names);
  for (jsize i = 0; i < count; i++) {
    jstring name = static_cast<jstring>(env->GetObjectArrayElement(names, i));
    const char* utf = env->GetStringUTFChars(name, nullptr);
    if (utf == nullptr) return;
    LogName(utf);
    env->ReleaseStringUTFChars(name, utf);
  }
}
```

This function iterates over a Java `String[]` and logs each entry. Each call to `GetObjectArrayElement` creates a new local reference and stores it in the table.

The code correctly releases the UTF-8 buffer with `ReleaseStringUTFChars`, but that only frees the character data. It does nothing for the `jstring` reference itself.

With 10 names this works fine. With 100,000 names, the table fills up and the process aborts. The bug is especially easy to miss because unit tests usually pass small arrays.

The direct fix is to delete each reference once it's no longer needed.

```cpp
for (jsize i = 0; i < count; i++) {
  jstring name = static_cast<jstring>(env->GetObjectArrayElement(names, i));
  const char* utf = env->GetStringUTFChars(name, nullptr);
  if (utf == nullptr) {
    env->DeleteLocalRef(name);
    return;
  }
  LogName(utf);
  env->ReleaseStringUTFChars(name, utf);
  env->DeleteLocalRef(name);
}
```

The loop now calls `DeleteLocalRef` at the end of every iteration and on the early return path, so the table never holds more than one reference from this loop at a time.

The early return matters: `GetStringUTFChars` returns `nullptr` when it fails to allocate memory, and in that case it also leaves an `OutOfMemoryError` pending, so returning to Java right away is the correct response.

When an iteration creates several references (a class, a method result, a string), deleting each one by hand becomes tedious and error prone. `PushLocalFrame` and `PopLocalFrame` handle that case.

```cpp
for (jsize i = 0; i < count; i++) {
  if (env->PushLocalFrame(8) != 0) return;
  jobject user = env->GetObjectArrayElement(users, i);
  jstring name = static_cast<jstring>(env->CallObjectMethod(user, gGetName));
  jstring email = static_cast<jstring>(env->CallObjectMethod(user, gGetEmail));
  SaveUser(env, name, email);
  env->PopLocalFrame(nullptr);
}
```

`PushLocalFrame(8)` opens a new scope in the local reference table with room for at least 8 references. Every local reference created after that point belongs to the new frame. `PopLocalFrame(nullptr)` frees all of them at once, so `user`, `name`, and `email` are released together at the end of each iteration.

If `PushLocalFrame` returns a nonzero value, the JVM couldn't allocate the frame and an `OutOfMemoryError` is pending, so the function returns immediately.

If you need one reference to survive the frame, pass it to `PopLocalFrame` instead of `nullptr`, and the function returns a new local reference to that object in the outer frame.

---

## Pitfall 2: Caching a Local Reference in a Static Variable

Looking up classes and method IDs is relatively slow, so native libraries often cache them. The mistake is caching the class as a local reference.

```cpp
static jclass gUserClass;
static jmethodID gGetName;

JNIEXPORT jint JNI_OnLoad(JavaVM* vm, void* reserved) {
  JNIEnv* env = nullptr;
  if (vm->GetEnv(reinterpret_cast<void**>(&env), JNI_VERSION_1_6) != JNI_OK) {
    return JNI_ERR;
  }
  gUserClass = env->FindClass("com/example/User");  // Bug: local reference
  gGetName = env->GetMethodID(gUserClass, "getName", "()Ljava/lang/String;");
  return JNI_VERSION_1_6;
}
```

`JNI_OnLoad` runs once when the library is loaded, and this version stores the result of `FindClass` in a static variable for later use. The problem is that `FindClass` returns a local reference, and that reference is freed as soon as `JNI_OnLoad` returns. Every later use of `gUserClass` goes through a slot that has already been released and may have been reused for a completely different object.

The frustrating part is that this code often appears to work. On some JVMs a stale handle still happens to point at the right class for a while. On ART with CheckJNI enabled, the process aborts with an error along the lines of `accessed stale local reference`. Without CheckJNI, you get random crashes or calls that land on the wrong object.

The fix is to promote the class to a global reference before storing it.

```cpp
jclass localClass = env->FindClass("com/example/User");
if (localClass == nullptr) return JNI_ERR;
gUserClass = static_cast<jclass>(env->NewGlobalRef(localClass));
env->DeleteLocalRef(localClass);
if (gUserClass == nullptr) return JNI_ERR;

gGetName = env->GetMethodID(gUserClass, "getName", "()Ljava/lang/String;");
if (gGetName == nullptr) return JNI_ERR;
```

`NewGlobalRef` creates a second reference to the same class, one that survives after `JNI_OnLoad` returns. The original local reference is no longer needed, so the code deletes it right away. Every call is checked for `nullptr`, because `FindClass` and `GetMethodID` return `nullptr` and leave a pending exception when the class or method doesn't exist (for example, after an obfuscation tool renames it).

The `jmethodID` doesn't need the same treatment. Method IDs and field IDs aren't object references, so they're not tracked in any reference table. They stay valid as long as the class they belong to is loaded. Holding a global reference to the class guarantees it won't be unloaded, which is one more reason to cache the class globally alongside its IDs.

---

## Global References

A global reference is created explicitly with `NewGlobalRef` and stays valid until native code calls `DeleteGlobalRef`. It can be used from any thread, and it keeps the referenced object alive for its entire lifetime. That makes it the right tool for anything native code needs to keep across calls: cached classes, callback objects, or a Java object that owns a native resource.

The cost is that the JVM will never free a global reference on its own. The garbage collector treats it as a root, so the object and everything reachable from it stays in memory until the reference is deleted.

Global references also live in a table with a fixed size. On Android, that limit is 51,200 entries, and exceeding it aborts the process with `global reference table overflow`.

---

## Pitfall 3: Leaking Global References

Global reference leaks usually come from code that creates a new global reference each time something is registered, without releasing the previous one.

```cpp
static jobject gListener;

extern "C" JNIEXPORT void JNICALL
Java_com_example_Sensor_setListener(JNIEnv* env, jobject thiz, jobject listener) {
  gListener = env->NewGlobalRef(listener);
}
```

Every call to `setListener` creates a new global reference and overwrites the old handle stored in `gListener`. The old reference is still in the table, but nothing points to it anymore, so it can never be deleted. Each leaked reference also pins a listener object, and a listener is often an inner class that holds a reference to an entire Activity or Fragment. The result is a memory leak that grows with every screen rotation, and eventually a crash when the table overflows.

A corrected version releases the previous reference and gives Java a way to clear the listener.

```cpp
static std::mutex gListenerMutex;
static jobject gListener = nullptr;

extern "C" JNIEXPORT void JNICALL
Java_com_example_Sensor_setListener(JNIEnv* env, jobject thiz, jobject listener) {
  std::lock_guard<std::mutex> lock(gListenerMutex);
  if (gListener != nullptr) {
    env->DeleteGlobalRef(gListener);
    gListener = nullptr;
  }
  if (listener != nullptr) {
    gListener = env->NewGlobalRef(listener);
  }
}
```

This version deletes any existing global reference before creating a new one, so at most one listener reference exists at any time. Passing `null` from Java clears the listener entirely, which gives the Java side a clean way to release it in `onDestroy` or `close()`. The mutex protects `gListener` because the listener might be read from a native worker thread while Java is replacing it on the main thread. Without the lock, the worker could read a handle that was deleted a moment earlier.

A good habit is to pair every `NewGlobalRef` with a clearly identified place where the matching `DeleteGlobalRef` happens. If you can't point to that place, the reference will probably leak.

---

## Weak Global References

A weak global reference, created with `NewWeakGlobalRef`, works like a global reference in that it survives across calls and can be used from any thread. The difference is that it doesn't keep the object alive. If nothing else in Java refers to the object, the garbage collector can collect it, and the weak reference then refers to `null`.

Weak references are useful when native code wants to call back into a Java object without controlling that object's lifetime. A native audio engine that notifies a UI component is a typical example. The engine shouldn't keep the UI alive after the user has left the screen, but while the UI exists, the engine should be able to reach it.

---

## Pitfall 4: Using a Weak Global Reference Directly

The mistake with weak references is using them as if they were strong ones.

```cpp
static jweak gCallback;

void NotifyProgress(JNIEnv* env, jint percent) {
  if (!env->IsSameObject(gCallback, nullptr)) {
    env->CallVoidMethod(gCallback, gOnProgress, percent);  // Bug: race with GC
  }
}
```

The code checks whether the object behind `gCallback` has been collected, and if not, calls a method on it. The check and the call are two separate steps, and the garbage collector can run between them. If it does, `CallVoidMethod` receives a reference to an object that no longer exists. This is a textbook time-of-check to time-of-use race, and it will only show up under memory pressure.

The safe approach is to promote the weak reference to a local reference first.

```cpp
void NotifyProgress(JNIEnv* env, jint percent) {
  jobject callback = env->NewLocalRef(gCallback);
  if (callback == nullptr) return;
  env->CallVoidMethod(callback, gOnProgress, percent);
  env->DeleteLocalRef(callback);
}
```

`NewLocalRef` either returns `nullptr` (the object has been collected) or returns a strong local reference. Once the code holds that local reference, the garbage collector can't collect the object until the reference is deleted, so the call is safe.

`NewLocalRef` was added in JNI 1.2 and is available on every modern JVM and on all versions of Android. When the weak reference itself is no longer needed, free it with `DeleteWeakGlobalRef`, not `DeleteGlobalRef`.

---

## Pitfall 5: Sharing JNIEnv Across Threads

The `JNIEnv*` pointer passed into every native method is tied to the current thread. It points to per-thread state such as the local reference table and the pending exception. Storing it in a global and using it from another thread corrupts that state.

```cpp
static JNIEnv* gEnv;  // Bug: JNIEnv is per thread

extern "C" JNIEXPORT void JNICALL
Java_com_example_Downloader_start(JNIEnv* env, jobject thiz) {
  gEnv = env;
  std::thread([] {
    DownloadFile();
    gEnv->CallStaticVoidMethod(gDownloaderClass, gOnComplete);
  }).detach();
}
```

The native method saves its `JNIEnv*` and then starts a worker thread that uses it after the download completes. By that point, the saved pointer belongs to a different thread (the one that called `start`), and that thread may be running other JNI code at the same moment. On ART with CheckJNI, this fails immediately with a message saying the `JNIEnv` was used on the wrong thread. Without CheckJNI, it causes unpredictable corruption.

The correct pattern is to cache the `JavaVM*`, which is shared across all threads, and have each thread attach itself to obtain its own `JNIEnv*`.

```cpp
static JavaVM* gVm;

JNIEXPORT jint JNI_OnLoad(JavaVM* vm, void* reserved) {
  gVm = vm;
  // Cache classes and method IDs here.
  return JNI_VERSION_1_6;
}

void WorkerThread() {
  JNIEnv* env = nullptr;
  if (gVm->AttachCurrentThread(&env, nullptr) != JNI_OK) return;

  DownloadFile();
  env->CallStaticVoidMethod(gDownloaderClass, gOnComplete);
  if (env->ExceptionCheck()) env->ExceptionClear();

  gVm->DetachCurrentThread();
}
```

`JNI_OnLoad` stores the `JavaVM*`, which stays valid for the lifetime of the process. The worker thread calls `AttachCurrentThread` to register itself with the JVM and receive a `JNIEnv*` of its own, then calls `DetachCurrentThread` before it exits. The Android NDK declares `AttachCurrentThread` as taking a `JNIEnv**`, while the desktop JDK header takes a `void**`, so desktop code needs a `reinterpret_cast<void**>(&env)`.

Detaching isn't optional. Local references created on an attached native thread are never freed automatically, because there's no native method return to trigger the cleanup. They're only freed on detach.

On Android, a native thread that exits while still attached causes ART to abort the process. If a thread is attached for its entire life, a common approach is to register a `pthread_key_create` destructor that calls `DetachCurrentThread` when the thread exits, so no code path can forget it.

Also note that `gDownloaderClass` must be a global reference, for the reasons covered in Pitfall 2. Local references can't cross threads any more than `JNIEnv*` can.

---

## Pitfall 6: Calling FindClass from a Native Thread

A related surprise shows up when a newly attached native thread calls `FindClass` for one of the app's own classes.

```cpp
void WorkerThread() {
  JNIEnv* env = nullptr;
  gVm->AttachCurrentThread(&env, nullptr);
  jclass cls = env->FindClass("com/example/Downloader");  // Returns nullptr
  // ...
  gVm->DetachCurrentThread();
}
```

When `FindClass` is called from inside a native method, the JVM uses the class loader of the Java class that declared that method, so application classes resolve correctly.

A thread created in native code and attached with `AttachCurrentThread` has no Java frames on its stack. In that case, the JVM falls back to the system class loader, which only knows about framework classes. The lookup fails, `FindClass` returns `nullptr`, and a `ClassNotFoundException` is left pending. Code that doesn't check the return value then crashes on the next call that uses `cls`.

The standard solution is to look up every class you need in `JNI_OnLoad` (which runs with the application's class loader), store each one as a global reference, and never call `FindClass` from native threads. If a class has to be resolved dynamically, cache a global reference to the application's `ClassLoader` object during `JNI_OnLoad` and call its `loadClass` method from the worker thread instead.

---

## Pitfall 7: Ignoring Pending Exceptions

When a JNI call fails or when Java code invoked from native code throws, the exception doesn't unwind the native stack. It's recorded as pending, and the native function keeps running. Continuing to call most JNI functions while an exception is pending is undefined behavior.

```cpp
jstring name = static_cast<jstring>(env->CallObjectMethod(user, gGetName));
const char* utf = env->GetStringUTFChars(name, nullptr);  // Bug if getName threw
```

If `getName()` throws, `CallObjectMethod` returns `nullptr` and leaves the exception pending. The next line passes that `nullptr` into `GetStringUTFChars` while an exception is still pending, which breaks two rules at once. With CheckJNI, ART aborts with a message such as `JNI GetStringUTFChars called with pending exception`. Without it, the process usually crashes with a null dereference.

```cpp
jstring name = static_cast<jstring>(env->CallObjectMethod(user, gGetName));
if (env->ExceptionCheck()) {
  return nullptr;
}
const char* utf = env->GetStringUTFChars(name, nullptr);
if (utf == nullptr) {
  return nullptr;
}
```

After every call that can throw, the fixed code checks `ExceptionCheck()` and returns immediately if an exception is pending. Returning from a native method with a pending exception is allowed and useful: the exception is rethrown in Java as soon as control returns there, so the Java caller sees it as a normal exception from the `native` method.

If native code wants to handle the failure itself instead, it calls `ExceptionClear()` before making any further JNI calls. A small set of functions, such as `DeleteLocalRef`, `DeleteGlobalRef`, and the `Release` functions, are explicitly allowed while an exception is pending, so cleanup can still run before returning.

---

## Pitfall 8: Comparing References with the Equality Operator

Because references are handles and not object addresses, two different handles can refer to the same Java object.

```cpp
if (listener == gListener) {  // Bug: compares handles, not objects
  RemoveListener();
}
```

In this comparison, `listener` is a local reference passed into the current call and `gListener` is a global reference created earlier. Even if both refer to the same Java object, they occupy different slots in different tables, so the handles are different values and the comparison is false. The listener is never removed.

```cpp
if (env->IsSameObject(listener, gListener)) {
  RemoveListener();
}
```

`IsSameObject` asks the JVM whether both handles resolve to the same object, which is the Java `==` semantics you actually want. Passing `nullptr` as the second argument is also the standard way to check whether a weak global reference has been cleared, although as Pitfall 4 showed, `NewLocalRef` is safer when you intend to use the object afterward.

---

## How to Catch Reference Bugs with CheckJNI

Most of the bugs in this article either work by accident or crash somewhere unrelated to the real mistake. CheckJNI is an extended validation mode that makes them fail loudly and immediately, with a message pointing at the bad call.

On Android, CheckJNI is enabled automatically for apps built with `android:debuggable="true"` and on emulators. To force it on for all apps on a physical device with a user build, run the following command and then restart the app.

```sh
adb shell setprop debug.checkjni 1
```

This sets a system property that tells ART to enable CheckJNI for every app process started afterward. It doesn't affect processes that are already running, which is why the app needs a restart.

With it enabled, ART validates every JNI call: it rejects stale local references, references used on the wrong thread, calls made with a pending exception, `JNIEnv*` pointers used from the wrong thread, mismatched `Release` calls, and invalid method IDs. When a check fails, ART prints `JNI DETECTED ERROR IN APPLICATION` in logcat along with a description of the problem and a native stack trace, then aborts.

On a desktop JVM, pass the `-Xcheck:jni` flag instead.

```sh
java -Xcheck:jni -Djava.library.path=build/libs -jar app.jar
```

This runs the application with HotSpot's JNI checking enabled and loads native libraries from `build/libs`. HotSpot prints warnings for many of the same problems, such as calls made with a pending exception or invalid references. Its checks are generally less strict than ART's, so an app that runs cleanly under `-Xcheck:jni` on the desktop can still fail CheckJNI on Android. Running tests with CheckJNI enabled on both platforms, including tests that pass large arrays and run work on native threads, catches most reference bugs well before release.

---

## How to Manage References Safely with RAII

Manual `DeleteLocalRef` and `DeleteGlobalRef` calls are easy to forget, especially on early return paths. C++ lets you tie the lifetime of a reference to a scope, the same way `std::unique_ptr` manages heap memory.

```cpp
template <typename T>
class ScopedLocalRef {
 public:
  ScopedLocalRef(JNIEnv* env, T ref) : env_(env), ref_(ref) {}
  ~ScopedLocalRef() {
    if (ref_ != nullptr) env_->DeleteLocalRef(ref_);
  }
  ScopedLocalRef(const ScopedLocalRef&) = delete;
  ScopedLocalRef& operator=(const ScopedLocalRef&) = delete;

  T get() const { return ref_; }

 private:
  JNIEnv* env_;
  T ref_;
};
```

`ScopedLocalRef` takes ownership of a local reference and deletes it in its destructor, so the reference is released no matter how the enclosing scope exits (normal completion, an early `return`, or a C++ exception). The copy constructor and copy assignment are deleted because two wrappers holding the same handle would both try to delete it. The `get()` method returns the raw handle for passing into JNI functions.

With this wrapper, the loop from Pitfall 1 becomes shorter and can't leak.

```cpp
for (jsize i = 0; i < count; i++) {
  ScopedLocalRef<jstring> name(
      env, static_cast<jstring>(env->GetObjectArrayElement(names, i)));
  const char* utf = env->GetStringUTFChars(name.get(), nullptr);
  if (utf == nullptr) return;
  LogName(utf);
  env->ReleaseStringUTFChars(name.get(), utf);
}
```

Each iteration constructs a `ScopedLocalRef` for the array element, and the destructor runs at the end of the iteration or on the early `return`. There's no explicit `DeleteLocalRef` call anywhere, and adding another return path later can't introduce a leak.

A global reference wrapper follows the same idea, with one important difference: the destructor might run on a thread other than the one that created the reference, so it shouldn't store a `JNIEnv*`. Instead, it stores the `JavaVM*` and obtains the current thread's environment when it needs to delete the reference.

```cpp
class ScopedGlobalRef {
 public:
  ScopedGlobalRef(JNIEnv* env, jobject obj)
      : ref_(obj ? env->NewGlobalRef(obj) : nullptr) {
    env->GetJavaVM(&vm_);
  }
  ~ScopedGlobalRef() {
    JNIEnv* env = nullptr;
    if (ref_ != nullptr &&
        vm_->GetEnv(reinterpret_cast<void**>(&env), JNI_VERSION_1_6) == JNI_OK) {
      env->DeleteGlobalRef(ref_);
    }
  }
  ScopedGlobalRef(const ScopedGlobalRef&) = delete;
  ScopedGlobalRef& operator=(const ScopedGlobalRef&) = delete;

  jobject get() const { return ref_; }

 private:
  JavaVM* vm_ = nullptr;
  jobject ref_;
};
```

The constructor creates a global reference from any local or global reference it receives and records the `JavaVM*`. The destructor calls `GetEnv` to get the `JNIEnv*` for whatever thread it happens to run on, and deletes the reference only if that thread is attached to the JVM.

If the destructor runs on an unattached thread, this simple version leaks the reference rather than crashing. A production version would either attach temporarily or log the leak so it gets noticed. Android's platform code uses the same pattern in its own `ScopedLocalRef` helper, and libraries such as fbjni provide complete, tested versions of both wrappers if you prefer not to write your own.

---

## Reference Types Compared

| Property | Local | Global | Weak Global |
| --- | --- | --- | --- |
| Created by | Most JNI functions | `NewGlobalRef` | `NewWeakGlobalRef` |
| Valid until | Native method returns | `DeleteGlobalRef` | `DeleteWeakGlobalRef` |
| Usable from other threads | No | Yes | Yes |
| Keeps object alive | Yes | Yes | No |
| Freed automatically | Yes, on return or detach | No | No |
| Typical use | Temporary values in one call | Cached classes, owned callbacks | Callbacks to objects native code shouldn't own |

The table summarizes the three reference types. The "Valid until" row describes when the handle stops being usable, and "Freed automatically" describes whether you can rely on the JVM to clean it up.

The main takeaway is that local references are the only kind the JVM cleans up for you, and that convenience is exactly why they can't be stored or shared. Global references can be stored and shared, but each one is a permanent GC root until you delete it. Weak global references can also be stored and shared without pinning the object, but you must promote them to a local reference before every use.

---

## Summary

Every JNI reference is a handle to a slot in a JVM-managed table, and each reference type is defined by when that slot is freed. Local references disappear when the native method returns and belong to a single thread. Global references survive until you delete them and can be used anywhere. Weak global references survive until you delete them but don't keep the object alive.

Most JNI crashes follow directly from breaking one of those rules. Creating local references in a loop without releasing them overflows the local table, which `DeleteLocalRef` or `PushLocalFrame` and `PopLocalFrame` prevent. Storing a local reference for later use leaves you with a stale handle, which promoting it with `NewGlobalRef` fixes. Creating global references without deleting them leaks memory and eventually overflows the global table. Using a weak reference without first promoting it with `NewLocalRef` races with the garbage collector.

The threading rules matter just as much. A `JNIEnv*` belongs to one thread, so cache the `JavaVM*` and attach each native thread before using JNI, then detach it before the thread exits. Resolve application classes in `JNI_OnLoad`, because native threads can't find them later. Check for pending exceptions after every call that can throw, and compare references with `IsSameObject` rather than `==`.

Finally, let tools enforce these rules for you. Run your tests with CheckJNI on Android and `-Xcheck:jni` on the desktop so that reference mistakes fail at the call that caused them, and use RAII wrappers so that releasing a reference happens automatically instead of depending on every code path remembering to do it.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Avoid JNI Crashes by Managing Local and Global References Correctly",
  "desc": "Most JNI crashes don't come from complicated logic. They come from a small set of mistakes around object references: holding on to a reference after it has become invalid, creating references faster t",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-avoid-jni-crashes-by-managing-local-and-global-references-correctly.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
