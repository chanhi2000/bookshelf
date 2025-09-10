---
lang: en-US
title: "📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions"
description: "Article(s) > 📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions"
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
      content: "Article(s) > 📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions"
    - property: og:description
      content: "📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/%F0%9F%93%B8-android-comparing-fileprovider-vs-mediastore-top-interview-questions.html
prev: /programming/java-android/articles/README.md
date: 2025-02-12
isOriginal: false
author: Leo N
cover: https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Sx4veSpq_Z1oYBsP5Q7nwQ.jpeg
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
  name="📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions"
  desc="In the world of modern android development, Jetpack Compose has revolutionized UI building, making it more intuitive and efficient. But what if you need a simple function to download, save, and share images within your app? Whether you are building a social media app, a gallery viewer, or just need to hand images dynamically, this guide will walk you through the comparison between FileProvider and MediaStore as well as suggest some of interview questions. Now let’s go 🔥"
  url="https://droidcon.com/2025/02/12/%F0%9F%93%B8-android-comparing-fileprovider-vs-mediastore-top-interview-questions"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Sx4veSpq_Z1oYBsP5Q7nwQ.jpeg"/>

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Sx4veSpq_Z1oYBsP5Q7nwQ.jpeg)

In the world of modern android development,**Jetpack Compose** has revolutionized UI building, making it more intuitive and efficient. But what if you need a simple function to download, save, and share images within your app? Whether you are building a social media app, a gallery viewer, or just n2222eed to hand images dynamically,**this guide will walk you through the** comparison between`FileProvider`and`MediaStore`as well as suggest some of interview questions. Now let’s go 🔥

- 📂 What is Android`FileProvider`?
- 🔄`FileProvider`in a Multi-Module Android Project?
- 📸 What is Android`Media Store`?
- 🚨Common Error & Solution
- 📌 Questions & Answers

---

## 📱 Access app-specific files

In many cases, your app creates files that other apps don’t need to access, or shouldn’t access. The system provides the following locations for storing such*app-specific*files:

- **Internal storage directories:**These directories include both a dedicated location for storing persistent files, and another location for storing cache data. The system prevents other apps from accessing these locations, and on Android 10 (API level 29) and higher, these locations are encrypted. These characteristics make these locations a good place to store sensitive data that only your app itself can access.
- **External storage directories:**These directories include both a dedicated location for storing persistent files, and another location for storing cache data. Although it’s possible for another app to access these directories if that app has the proper permissions, the files stored in these directories are meant for use only by your app. If you specifically intend to create files that other apps should be able to access, your app should store these files in the[<VPIcon icon="fa-brands fa-android"/>shared storage](https://developer.android.com/training/data-storage/shared)part of external storage instead.

::: info

> When the user uninstalls your app, the files saved in app-specific storage are removed. Because of this behavior, you shouldn’t use this storage to save anything that the user expects to persist independently of your app. For example, if your app allows users to capture photos, the user would expect that they can access those photos even after they uninstall your app. So you should instead use shared storage to save those types of files to the appropriate[<VPIcon icon="fa-brands fa-android"/>media collection](https://developer.android.com/training/data-storage/shared/media).

:::

### Scoped Storage & Why It Matters in Android 10+ 🚀

In**Android 10 (API 29)**and above, Google introduced**Scoped Storage**to improve app security and user privacy. This change**restricts**how apps can access files on external storage. and**MediaStore**is the recommended way to interact with media files.

Before**Scoped Storage**, apps could freely read/write to`Environment.getExternalStorageDirectory()`, but this**posed security risks**since apps could access files from other apps.

::: note

If your app requests a storage-related permission at runtime, the user-facing dialog indicates that your app is requesting broad access to external storage, even when scoped storage is enabled.

:::

### ✅ What Scoped Storage Changes

::: tabs

@tab Limited File Access

- Apps can no longer**freely access**all files in external storage (<VPIcon icon="fas fa-folder-open"/>`/sdcard/`).
- Instead, apps can only access**their own app-specific directories**inside:
  - <VPIcon icon="fas fa-folder-open"/>`Android/data/com.example.app/`
  - <VPIcon icon="fas fa-folder-open"/>`Android/media/com.example.app/`

@tab FileProvider is Required for Sharing

- Direct`file://` URIs are**blocked**(causes`FileUriExposedException`).
- Apps must**use** `FileProvider.getUriForFile()`to share files.

@tab Temporary Permissions for File Access

- If an app wants to share a file (e.g., an image) with another app (WhatsApp, Gmail, etc.), it must use:

```kotlin
intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
```

- This grants temporary permission for the receiving app to read the file.

@tab Media Store APIs for Public Files

- Apps should use`MediaStore` **APIs**to read/write**public**files (e.g., Photos, Downloads).

:::

| Feature | Android 10+ (Scoped Storage) | Android 9- (FileProvider) |
| ---: | --- | --- |
| Where is image saved? | Pictures/ using MediaStore | Pictures/MyApp/ manually |
| Requires `WRITE_EXTERNAL_STORAGE`? | ❌ No | ✅ Yes (Android 9-) |
| How to share? | Direct Uri from MediaStore | FileProvider URI |
| Compatible with all apps? | ✅ Yes (Gallery, WhatsApp, etc.) | ✅ Yes (With FileProvider) |

<!-- @import https://gist.github.com/nphausg/13bd2aff03585c4c9d8dfb7f9bf65fb0/raw/18a24c9a90263913f8ae02ff6c83e918996e83bf/scopedStorageVsLegacyStorage.md -->

---

## What is Android`FileProvider`?

`FileProvider`is a special subclass of`ContentProvider`in Android that allows you to securely share files between different applications without exposing the internal storage file paths. It provides a way to generate`content://`URIs instead of`file://` URIs, which prevents issues with the**Scoped Storage**and**File URI Exposure Exception**on modern Android versions.

- ✅ Securely share files between apps.
- ✅ Prevent`FileUriExposedException`on Android 7.0+.
- ✅ Works with**camera intents, sharing files via email, social media, …**
- ✅ Supports multiple modules in a project.

### 📌 Basic Implementation of`FileProvider`

#### 1. Specify the`FileProvider`in<VPIcon icon="fa-brands fa-android"/>`AndroidManifest.xml`

Defining a[<VPIcon icon="fa-brands fa-android"/>`FileProvider`](https://developer.android.com/reference/androidx/core/content/FileProvider)for your app requires an entry in your manifest. This entry specifies the authority to use in generating content URIs, as well as the name of an XML file that specifies the directories your app can share.

```xml title="AndroidManifest.xml"
<provider
  android:name="androidx.core.content.FileProvider"
  android:authorities="${applicationId}.provider"
  android:exported="false"
  android:grantUriPermissions="true">
  <meta-data
    android:name="android.support.FILE_PROVIDER_PATHS"
    android:resource="@xml/filepaths" />
</provider>
```

#### 2. Specify sharable directories<VPIcon icon="iconfont icon-code"/>`filepaths.xml`in<VPIcon icon="fas fa-folder-open"/>`res/xml/`

Once you have added the`FileProvider`to your app manifest, you need to specify the directories that contain the files you want to share. To specify the directories, start by creating the file<VPIcon icon="iconfont icon-code"/>`filepaths.xml`in the<VPIcon icon="fas fa-folder-open"/>`res/xml/`subdirectory of your project. In this file, specify the directories by adding an XML element for each directory. The following snippet shows you an example of the contents of<VPIcon icon="fas fa-folder-open"/>`res/xml/`<VPIcon icon="iconfont icon-code"/>`filepaths.xml`. The snippet also demonstrates how to share a subdirectory of the<VPIcon icon="fas fa-folder-open"/>`files/`directory in your internal storage area:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Allow access to app-specific external storage -->

<paths>
  <!-- 📂/storage/emulated/0/Android/data/{package_name}/**/images/-->
  <external-files-path name="images" path="images/" />
  <files-path name="myimages" path="images/" />
</paths>
```

In this example:

- `external-files-path`: Refers to the app’s external storage
- `external-cache-path`: Refers to the app’s external cache directory
- `<files-path>`tag shares directories within the<VPIcon icon="fas fa-folder-ope"/>`files/`directory of your app’s internal storage. The`path`attribute shares the<VPIcon icon="fas fa-folder-ope"/>`images/`subdirectory of<VPIcon icon="fas fa-folder-ope"/>`files/`. The`name`attribute tells the[<VPIcon icon="fa-brands fa-android"/>`FileProvider`](https://developer.android.com/reference/androidx/core/content/FileProvider)to add the path segment`myimages`to content URIs for files in the<VPIcon icon="fas fa-folder-ope"/>`files/images/`subdirectory.

![Example of using `context.cacheDir`](https://miro.medium.com/v2/resize:fit:1400/1*SZbnT_ronQ2ryRiYWkgaug.png)

::: note

The XML file is the only way you can specify the directories you want to share; you can’t programmatically add a directory.

:::

#### 3. Define the`BuildConfig`

- BuildConfig

```kotlin title="build.gradle.kts"
buildConfigField("String", "FILE_PROVIDER", "\"provider\"")
```

- `FileProvider`

```kotlin title="FileProvider.kt"
import androidx.core.content.FileProvider as AndroidFileProvider

interface FileProvider {

    @Throws(Exception::class)
    fun getUri(context: Context, file: File): Uri? {
        val authority = authority(context)
        return AndroidFileProvider.getUriForFile(context, authority, file)
    }

    companion object : FileProvider {
        val authority = { context: Context ->
            "${context.applicationContext.packageName}.${BuildConfig.FILE_PROVIDER}"
       }
    }
}
```

---

## 🆚`FileProvider`in a Multi-Module Android Project?

By default,`FileProvider`is tied to an`authority`(e.g.,`com.example.app.fileprovider`), which is unique per module. In a**multi-module project**, each module**cannot define its own** `FileProvider`with the same`authority`. Instead, follow these steps:

::: tabs

@tab:active Approach 1

Declare`FileProvider`in the **App Module**

- Allow feature modules to access`FileProvider`
- Pass the`Context`of the main application to the modules.
- Use`FileProvider.getUriForFile(...)`in the modules with the**app’s authority**(`com.example.app.fileprovider`).

**Use Approach 1 (App Module) if:**

- Your project is small or medium-sized.
- You don’t plan to reuse`FileProvider`in multiple apps.
- Simplicity is more important than modularity.

@tab Approach 2

Create a **Shared Module** for `FileProvider`

- Create a new module (e.g.,`foundation-io`).
- Define the`FileProvider`in`foundation-io`and expose a method:
- All modules will use this method to get the URI.

**Use Approach 2 (Shared Module) if:**

- Your project is large, with multiple feature modules.
- You want to**decouple**`FileProvider`from the main app.
- You might reuse the shared module in other projects.
- Your team follows**clean architecture and modularization**best practices.

:::

::: note

If you’re working on a**large-scale project**with multiple modules (e.g., a super app, SDK-based architecture),**Approach 2 (Shared Module) is the best choice**because it promotes**scalability, reusability, and maintainability**. However, if you**just need quick file sharing in a single app**,**Approach 1 (App Module) is simpler and works fine.**

:::

---

## 📸 What is Android`Media Store`?

The contract between the media provider and applications. Contains definitions for the supported URIs and columns. The media provider provides an indexed collection of common media types, such as[<VPIcon icon="fa-brands fa-android"/>Audio](https://developer.android.com/reference/android/provider/MediaStore.Audio),[<VPIcon icon="fa-brands fa-android"/>Video](https://developer.android.com/reference/android/provider/MediaStore.Video), and[<VPIcon icon="fa-brands fa-android"/>Images](https://developer.android.com/reference/android/provider/MediaStore.Images), from any attached storage devices. Each collection is organized based on the primary MIME type of the underlying content; for example,`image/*`content is indexed under[<VPIcon icon="fa-brands fa-android"/>Images](https://developer.android.com/reference/android/provider/MediaStore.Images). The[<VPIcon icon="fa-brands fa-android"/>Files](https://developer.android.com/reference/android/provider/MediaStore.Files)collection provides a broad view across all collections, and does not filter by MIME type.

### 1. Query Media Files (Images)

```java :collapsed-lines
public void getAllImages(Context context) {
    Uri collection = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;

    String[] projection = {
            MediaStore.Images.Media._ID,
            MediaStore.Images.Media.DISPLAY_NAME
    };

    Cursor cursor = context.getContentResolver().query(
            collection,
            projection,
            null, null,
            MediaStore.Images.Media.DATE_ADDED + " DESC"
    );

    if (cursor != null) {
        while (cursor.moveToNext()) {
            int id = cursor.getInt(cursor.getColumnIndexOrThrow(MediaStore.Images.Media._ID));
            String name = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DISPLAY_NAME));

            Uri imageUri = Uri.withAppendedPath(collection, String.valueOf(id));
            Log.d("MediaStore", "Image: " + name + ", URI: " + imageUri);
        }
        cursor.close();
    }
}
```

### 2. Insert a New Image

```java
public Uri saveImageToGallery(Context context, Bitmap bitmap, String filename) {
    ContentValues values = new ContentValues();
    values.put(MediaStore.Images.Media.DISPLAY_NAME, filename);
    values.put(MediaStore.Images.Media.MIME_TYPE, "image/png");
    values.put(MediaStore.Images.Media.RELATIVE_PATH, "Pictures/MyApp");

    Uri imageUri = context.getContentResolver().insert(
            MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);

    try {
        OutputStream outputStream = context.getContentResolver().openOutputStream(imageUri);
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream);
        outputStream.close();
        return imageUri;
    } catch (Exception e) {
        e.printStackTrace();
        return null;
    }
}
```

![](https://miro.medium.com/v2/resize:fit:1400/1*9KrIRsVVNPax0XvIK2lvmw.png)

::: note

- The`RELATIVE_PATH`specifies where the image is stored (`Pictures/MyApp`).
- No**WRITE_EXTERNAL_STORAGE**permission needed from**Android 10+**.

:::

### 3. Delete a Media File

```java
public boolean deleteImage(Context context, Uri uri) {
    int deleted = context.getContentResolver().delete(uri, null, null);
    return deleted > 0;
}
```

::: important 🔹 Permissions Needed

- **Android 10+**: No storage permission required, as long as using`MediaStore`.
- **Android 9 and below**: Requires`WRITE_EXTERNAL_STORAGE`permission.

:::

### 4. Update Media File Metadata

```java
public void updateMediaDetails(Context context, Uri uri, String newTitle) {
    ContentValues values = new ContentValues();
    values.put(MediaStore.Images.Media.DISPLAY_NAME, newTitle);

    context.getContentResolver().update(uri, values, null, null);
}
```

The system automatically scans an external storage volume and adds media files to the following well-defined collections:

- **Images,**including photographs and screenshots, which are stored in the<VPIcon icon="fas fa-folder-open"/>`DCIM/`and<VPIcon icon="fas fa-folder-open"/>`Pictures/`directories. The system adds these files to the[<VPIcon icon="fa-brands fa-android"/>`MediaStore.Images`](https://developer.android.com/reference/android/provider/MediaStore.Images)table.
- **Videos,**which are stored in the<VPIcon icon="fas fa-folder-open"/>`DCIM/`,<VPIcon icon="fas fa-folder-open"/>`Movies/`, and<VPIcon icon="fas fa-folder-open"/>`Pictures/`directories. The system adds these files to the[<VPIcon icon="fa-brands fa-android"/>`MediaStore.Video`](https://developer.android.com/reference/android/provider/MediaStore.Video)table.
- **Audio files,**which are stored in the<VPIcon icon="fas fa-folder-open"/>`Alarms/`,<VPIcon icon="fas fa-folder-open"/>`Audiobooks/`,<VPIcon icon="fas fa-folder-open"/>`Music/`,<VPIcon icon="fas fa-folder-open"/>`Notifications/`,<VPIcon icon="fas fa-folder-open"/>`Podcasts/`, and<VPIcon icon="fas fa-folder-open"/>`Ringtones/`directories. Additionally, the system recognizes audio playlists that are in the<VPIcon icon="fas fa-folder-open"/>`Music/`or<VPIcon icon="fas fa-folder-open"/>`Movies/`directories as well as voice recordings that are in the<VPIcon icon="fas fa-folder-open"/>`Recordings/`directory. The system adds these files to the[<VPIcon icon="fa-brands fa-android"/>`MediaStore.Audio`](https://developer.android.com/reference/android/provider/MediaStore.Audio)table.*The <VPIcon icon="fas fa-folder-open"/>`Recordings/` directory isn’t available on Android 11 (API level 30) and lower.*
- **Downloaded files,**which are stored in the`Download/`directory. On devices that run Android 10 (API level 29) and higher, these files are stored in the[<VPIcon icon="fa-brands fa-android"/>`MediaStore.Downloads`](https://developer.android.com/reference/android/provider/MediaStore.Downloads)table.*This table isn’t available on Android 9 (API level 28) and lower.*

---

## 🚨Common Error & Solution

### 1. `SecurityException`: Permission Denied

```plaintext title="output"
java.lang.SecurityException: Permission Denial: writing Uri content://media/external/images/media from pid=12345, uid=10085 requires android.permission.WRITE_EXTERNAL_STORAGE
```

::: tabs

@tab:active Cause

- Your app is targeting**Android 10+**and trying to write to shared storage**without using MediaStore**.
- You did not request**WRITE_EXTERNAL_STORAGE**(Android 9 and below).

@tab Solution

- ✅ Use**MediaStore**API for Android 10+ instead of direct file paths.
- ✅**No permission required**for public media directories on Android 11+.

```java
ContentValues values = new ContentValues();
values.put(MediaStore.Images.Media.DISPLAY_NAME, "my_image.jpg");
values.put(MediaStore.Images.Media.MIME_TYPE, "image/jpeg");
values.put(MediaStore.Images.Media.RELATIVE_PATH, Environment.DIRECTORY_PICTURES);

Uri uri = getContentResolver().insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
```

:::

### 2. File Not Found Exception

```plaintext title="output"
java.io.FileNotFoundException: open failed: ENOENT (No such file or directory)
```

::: tabs

@tab:active Cause

- The**file path is incorrect**or does not exist.
- You are**trying to access a file before it has been saved**.

@tab Solution

- ✅**Verify the file exists**before accessing it.
- ✅ Ensure you have**write permissions**if using direct storage access.

:::

### 3. Image Not Appearing in Gallery

::: tabs

@tab:active Cause

Media file is saved, but**not indexed by `MediaScanner`**.

@tab Solution

✅**Manually scan the file**after saving.

```java
MediaScannerConnection.scanFile(context,
    new String[]{file.getAbsolutePath()},
    new String[]{"image/jpeg"},
    (path, uri) -> Log.d("MediaScanner", "File Scanned: " + path));
```

:::

### 4. `FileUriExposedException` (Android 7+)

**Direct file paths (`file://`) are not allowed**for sharing files across apps in Android 7+.

```plaintext title="output"
android.os.FileUriExposedException: file:///storage/emulated/0/my_file.pdf exposed beyond app through ClipData.Item.getUri()
```

::: tabs

@tab:active Solution

✅ Use**FileProvider**to generate a**content URI**instead.

```java
Uri uri = FileProvider.getUriForFile(context, context.getPackageName() + ".fileprovider", new File(filePath));

Intent intent = new Intent(Intent.ACTION_VIEW);
intent.setDataAndType(uri, "application/pdf");
intent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
startActivity(intent);
```

:::

### 5. `android:authorities` Not Matching

```plaintext title="output"
java.lang.IllegalArgumentException: Couldn't find meta-data for provider with authority com.example.wrong.fileprovider
```

::: tabs

@tab:active Cause

The**authority name in <VPIcon icon="fa-brands fa-android"/>`AndroidManifest.xml`**does not match the one used in`FileProvider.getUriForFile()`.

@tab Solution

✅ Ensure the`android:authorities`in<VPIcon icon="fa-brands fa-android"/>`AndroidManifest.xml`matches exactly.

:::

### 6. Permission Denied When Opening a Shared File

```plaintext title="output"
java.lang.SecurityException: Permission Denial: reading Uri content://com.example.myapp.fileprovider/my_files/test.pdf
```

::: tabs

@tab:active Cause

The receiving app**does not have permission**to read the file.

@tab Solution

✅**Grant temporary read permissions**when sharing a file.

```java
intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
```

:::

### 7. Failed to find configured root that contains …

![<VPIcon icon="fas fa-folder-open"/>`/storage/emulated/0/Pictures/..`](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*mxEBoewfZQ9ebrxygxr2eQ.png)

The error**“Failed to find configured root that contains…”**usually occurs when trying to share a file**without proper FileProvider configuration**. In**Android 7.0 (API 24) and above**, direct`file://`URIs cannot be shared between apps due to security restrictions. Instead, you need to use a`content://`URI via`FileProvider`.

- Inside the`<application>` tag:

```xml title="AndroidManifest.xml"
<provider
  android:name="androidx.core.content.FileProvider"
  android:authorities="${applicationId}.provider"
  android:exported="false"
  android:grantUriPermissions="true">
  <meta-data
    android:name="android.support.FILE_PROVIDER_PATHS"
    android:resource="@xml/file_paths" />
</provider>
```

- <VPIcon icon="iconfont icon-code"/>`file_paths.xml`

```xml title="file_paths.xml"
<?xml version="1.0" encoding="utf-8"?>
<paths>
    <!-- Allow access to app-specific external storage -->
    <external-files-path name="pictures" path="Pictures/" />
</paths>
```

- **Code**

```kotlin
// App-specific external storage
val picturesDir = File(context.getExternalFilesDir(null), "Pictures")
picturesDir.mkdirs() // Ensure the directory exists
```

---

## 📌 Questions & Answers

::: details 1. What is <code>MediaStore</code> in Android?

`MediaStore` is an API that provides structured access to**media files**(images, videos, audio) stored on**external storage**. It allows querying, inserting, and updating media files**without requiring direct file path access**.

:::

::: details 2. How much space does your data require?

Internal storage has limited space for app-specific data. Use other types of storage if you need to save a substantial amount of data.

:::

::: details 3. How reliable does data access need to be?

If your app’s basic functionality requires certain data, such as when your app is starting up, place the data within internal storage directory or a database. App-specific files that are stored in external storage aren’t always accessible because some devices allow users to remove a physical device that corresponds to external storage.

:::

::: details 4. What are the advantages of using <code>MediaStore</code> over File API?

✅**No storage permission required**(Android 10+).  
✅**Works with scoped storage**(File API does not).  
✅**Structured access**to media files.  
✅**Auto indexing**by the system.

:::

::: details 5. What is <code>FileProvider</code> in Android?

`FileProvider` is a**content provider**(`ContentProvider`) that allows**secure file sharing**between apps using`content://`URIs instead of`file://` paths.

:::

::: details 6. Should the data be private to your app?

When storing sensitive data — data that shouldn’t be accessible from any other app — use internal storage, preferences, or a database. Internal storage has the added benefit of the data being hidden from users.

:::

::: details 7. What is Scoped Storage in Android?

Scoped Storage (introduced in Android 10)**restricts**direct access to shared storage and requires apps to use`MediaStore`or`FileProvider`.

:::

::: details 8. How do you access files in Scoped Storage?

- **For media files:**Use`MediaStore` API
- **For app-specific files:**Use`getExternalFilesDir()`
- **For file sharing:**Use`FileProvider`

To give users more control over their files and limit file clutter, Android 10 introduced a new storage paradigm for apps called[<VPIcon icon="fa-brands fa-android"/>scoped storage](https://developer.android.com/training/data-storage#scoped-storage). Scoped storage changes the way apps store and access files on a device’s external storage. To help you migrate your app to support scoped storage, follow the best practices for common storage use cases that are outlined in this guide. The use cases are organized into two categories:[<VPIcon icon="fa-brands fa-android"/>handling media files](https://developer.android.com/training/data-storage/use-cases#handle-media-files)and[<VPIcon icon="fa-brands fa-android"/>handling non-media files](https://developer.android.com/training/data-storage/use-cases#handle-non-media-files).

:::

---

## 🎯 Conclusion

By leveraging**Jetpack Compose**,`FileProvider`, and Kotlin, we can easily**download, store, and share images**in an Android app. This approach ensures smooth performance, proper file handling, and seamless sharing across different applications. Whether you are working on an image-heavy app or simply adding a sharing feature, mastering these techniques will enhance your development workflow 🚀💡

### 🔹 `MediaStore` (Scoped Storage API)

::: tabs

@tab:active Purpose

- `MediaStore`is part of the**Scoped Storage**model introduced in**Android 10 (API 29)**.
- It provides access to**public media files**(e.g., images, videos, and audio) stored in shared storage, without needing`READ_EXTERNAL_STORAGE`or`WRITE_EXTERNAL_STORAGE`permissions (from Android 11 onwards).

@tab Use Cases

- Saving media files (images, videos, audio) in**public directories**(e.g.,`Pictures/`,`Movies/`).
- Querying and managing media content using the`ContentResolver`API.
- Ensuring compliance with**Scoped Storage**, as direct file path access is restricted.

@tab Advantages

- ✅ No need for storage permissions (from Android 11+).
- ✅ Works with**Scoped Storage**, avoiding direct file access.
- ✅ Provides a**content URI**, making it safer for media handling.
- ✅ Compatible with`MediaScanner`for indexing media files.

@tab Disadvantages

- ❌ Cannot store**non-media files**(e.g., PDFs, ZIPs).
- ❌ Requires**querying APIs**(instead of direct file access)
- ❌ Files are**not private**— they’re accessible to all apps with read access to shared storage.

:::

### 🔹FileProvider (For Secure File Sharing)

::: tabs

@tab:active Purpose

- `FileProvider`is a special`ContentProvider`that allows an app to**share private files**securely with other apps using a**content URI**, rather than exposing raw file paths.

@tab Use Cases

- Sharing**files (PDFs, images, videos, etc.)**with other apps (e.g., email, social media, or messaging apps).
- Providing a secure way to expose**app-private storage files**(inside<VPIcon icon="fas fa-folder-open"/>`data/data/<package>/files`).
- Granting**temporary read/write access**to specific files.

@tab Advantages

- ✅**Secure file sharing**(avoids exposing raw file paths).
- ✅ Supports**any file type**, not just media files.
- ✅ Provides**temporary access permissions**using`FLAG_GRANT_READ_URI_PERMISSION`.
- ✅ Works with**intent-based sharing**(e.g.,`Intent.ACTION_SEND`).

@tab Disadvantages

- ❌ Requires defining a**FileProvider in AndroidManifest.xml**.
- ❌ Needs**XML configuration**for file paths.
- ❌**More complex setup**compared to direct file sharing.

:::

<SiteInfo
  name="Access app-specific files | App data and files | Android Developers"
  desc="In many cases, your app creates files that other apps don't need to access, or shouldn't access. The system provides the following locations for storing such app-specific files:"
  url="https://developer.android.com/training/data-storage/app-specific/"
  logo="https://gstatic.com/devrel-devsite/prod/v6bfb74446ce17cd0d3af9b93bf26e056161cb79c5a6475bd6a9c25286fcb7861/android/images/favicon.svg"
  preview="https://developer.android.com/static/images/social/android-developers.png"/>

<SiteInfo
  name="Overview of shared storage | App data and files | Android Developers"
  desc="Use shared storage for user data that can or should be accessible to other apps and saved even if the user uninstalls your app."
  url="https://developer.android.com/training/data-storage/shared/"
  logo="https://gstatic.com/devrel-devsite/prod/v6bfb74446ce17cd0d3af9b93bf26e056161cb79c5a6475bd6a9c25286fcb7861/android/images/favicon.svg"
  preview="https://developer.android.com/static/images/social/android-developers.png"/>

<SiteInfo
  name="Setting up file sharing | App data and files | Android Developers"
  desc="To securely offer a file from your app to another app, you need to configure your app to offer a secure handle to the file, in the form of a content URI. The Android"
  url="https://developer.android.com/training/secure-file-sharing/setup-sharing/"
  logo="https://gstatic.com/devrel-devsite/prod/v6bfb74446ce17cd0d3af9b93bf26e056161cb79c5a6475bd6a9c25286fcb7861/android/images/favicon.svg"
  preview="https://developer.android.com/static/images/social/android-developers.png"/>

<SiteInfo
  name="Retrieving file information | App data and files | Android Developers"
  desc="Before a client app tries to work with a file for which it has a content URI, the app can request information about the file from the server app, including the file's data type and file size. The da"
  url="https://developer.android.com/training/secure-file-sharing/retrieve-info/"
  logo="https://gstatic.com/devrel-devsite/prod/v6bfb74446ce17cd0d3af9b93bf26e056161cb79c5a6475bd6a9c25286fcb7861/android/images/favicon.svg"
  preview="https://developer.android.com/static/images/social/android-developers.png"/>

<SiteInfo
  name="Data and file storage overview | App data and files | Android Developers"
  desc="Android uses a file system that's similar to disk-based file systems on other platforms. The system provides several options for you to save your app data:"
  url="https://developer.android.com/training/data-storage/"
  logo="https://gstatic.com/devrel-devsite/prod/v6bfb74446ce17cd0d3af9b93bf26e056161cb79c5a6475bd6a9c25286fcb7861/android/images/favicon.svg"
  preview="https://developer.android.com/static/images/training/data-storage/room_architecture.png"/>

<SiteInfo
  name="View on-device files with Device Explorer | Android Studio | Android Developers"
  desc="Learn how to view, copy, and delete files on an Android device with the Device Explorer."
  url="https://developer.android.com/studio/debug/device-file-explorer/"
  logo="https://gstatic.com/devrel-devsite/prod/v6bfb74446ce17cd0d3af9b93bf26e056161cb79c5a6475bd6a9c25286fcb7861/android/images/favicon.svg"
  preview="https://developer.android.com/static/images/social/android-developers.png"/>

<SiteInfo
  name="Send simple data to other apps | App data and files | Android Developers"
  desc="When you construct an intent, you must specify the action you want the intent to 'trigger.' Android defines several actions, including ACTION_SEND which, as you can probably guess, indicates that the intent is sending data from one activity …"
  url="https://developer.android.com/training/sharing/send/"
  logo="https://gstatic.com/devrel-devsite/prod/v6bfb74446ce17cd0d3af9b93bf26e056161cb79c5a6475bd6a9c25286fcb7861/android/images/favicon.svg"
  preview="https://developer.android.com/static/images/social/android-developers.png"/>

::: info

This article is previously published on [<VPIcon icon="fa-brands fa-medium"/>`proandroiddev`](https://proandroiddev.com/android-comparing-fileprovider-vs-mediastore-top-interview-questions-b2d2cf570e8c)

<SiteInfo
  name="📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions"
  desc="In the world of modern android development, Jetpack Compose has revolutionized UI building, making it more intuitive and efficient. But…"
  url="https://proandroiddev.com/android-comparing-fileprovider-vs-mediastore-top-interview-questions-b2d2cf570e8c/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1024/1*Sx4veSpq_Z1oYBsP5Q7nwQ.jpeg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions",
  "desc": "In the world of modern android development, Jetpack Compose has revolutionized UI building, making it more intuitive and efficient. But what if you need a simple function to download, save, and share images within your app? Whether you are building a social media app, a gallery viewer, or just need to hand images dynamically, this guide will walk you through the comparison between FileProvider and MediaStore as well as suggest some of interview questions. Now let’s go 🔥",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/%F0%9F%93%B8-android-comparing-fileprovider-vs-mediastore-top-interview-questions.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
