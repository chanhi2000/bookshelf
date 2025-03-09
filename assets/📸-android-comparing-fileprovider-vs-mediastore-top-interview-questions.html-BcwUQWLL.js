import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,f as o,av as c,au as i,aw as r,ax as n,a as m,b as h,r as a,o as u}from"./app-D4PYVeBp.js";const g={},f={id:"frontmatter-title-관련",tabindex:"-1"},v={class:"header-anchor",href:"#frontmatter-title-관련"};function y(s,e){const t=a("VPCard"),d=a("SiteInfo");return u(),l("div",null,[o("h1",f,[o("a",v,[o("span",null,c(s.$frontmatter.title)+" 관련",1)])]),i(t,r(n({title:"Android > Article(s)",desc:"Article(s)",link:"/programming/java-android/articles/README.md",logo:"/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),e[0]||(e[0]=o("nav",{class:"table-of-contents"},[o("ul")],-1)),e[1]||(e[1]=o("hr",null,null,-1)),i(d,{name:"📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions",desc:"In the world of modern android development, Jetpack Compose has revolutionized UI building, making it more intuitive and efficient. But what if you need a simple function to download, save, and share images within your app? Whether you are building a social media app, a gallery viewer, or just need to hand images dynamically, this guide will walk you through the comparison between FileProvider and MediaStore as well as suggest some of interview questions. Now let’s go 🔥",url:"https://droidcon.com/2025/02/12/%F0%9F%93%B8-android-comparing-fileprovider-vs-mediastore-top-interview-questions",logo:"https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",preview:"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Sx4veSpq_Z1oYBsP5Q7nwQ.jpeg"}),e[2]||(e[2]=m('<figure><img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Sx4veSpq_Z1oYBsP5Q7nwQ.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>In the world of modern android development, <strong>Jetpack Compose</strong> has revolutionized UI building, making it more intuitive and efficient. But what if you need a simple function to download, save, and share images within your app? Whether you are building a social media app, a gallery viewer, or just need to hand images dynamically, <strong>this guide will walk you through the</strong> comparison between <code>FileProvider</code> and <code>MediaStore</code> as well as suggest some of interview questions. Now let’s go 🔥</p><ul><li>📱Access app-specific files</li><li>📂 What is Android <code>FileProvider</code>?</li><li>🔄 <code>FileProvider</code> in a Multi-Module Android Project?</li><li>📸 What is Android <code>Media Store</code>?</li><li>🚨Common Error &amp; Solution</li><li>📌 Questions &amp; Answers</li><li>🎯 Conclusion</li></ul>',3)),h(` ###### 📱 Access app-specific files

In many cases, your app creates files that other apps don’t need to access, or shouldn’t access. The system provides the following locations for storing such *app-specific* files:

- **Internal storage directories:** These directories include both a dedicated location for storing persistent files, and another location for storing cache data. The system prevents other apps from accessing these locations, and on Android 10 (API level 29) and higher, these locations are encrypted. These characteristics make these locations a good place to store sensitive data that only your app itself can access.
- **External storage directories:** These directories include both a dedicated location for storing persistent files, and another location for storing cache data. Although it’s possible for another app to access these directories if that app has the proper permissions, the files stored in these directories are meant for use only by your app. If you specifically intend to create files that other apps should be able to access, your app should store these files in the [shared storage](https://developer.android.com/training/data-storage/shared) part of external storage instead.

> When the user uninstalls your app, the files saved in app-specific storage are removed. Because of this behavior, you shouldn’t use this storage to save anything that the user expects to persist independently of your app. For example, if your app allows users to capture photos, the user would expect that they can access those photos even after they uninstall your app. So you should instead use shared storage to save those types of files to the appropriate [media collection](https://developer.android.com/training/data-storage/shared/media).

###### Scoped Storage & Why It Matters in Android 10+ 🚀

In **Android 10 (API 29)** and above, Google introduced **Scoped Storage** to improve app security and user privacy. This change **restricts** how apps can access files on external storage. and **MediaStore** is the recommended way to interact with media files.

Before **Scoped Storage**, apps could freely read/write to \`Environment.getExternalStorageDirectory()\`, but this **posed security risks** since apps could access files from other apps.

> **Note:** If your app requests a storage-related permission at runtime, the user-facing dialog indicates that your app is requesting broad access to external storage, even when scoped storage is enabled.

[Privacy changes in Android 10 | Android Developers](https://developer.android.com/about/versions/10/privacy/changes?source=post_page-----b2d2cf570e8c--------------------------------#scoped-storage "Privacy changes in Android 10 | Android Developers")

###### ✅ What Scoped Storage Changes

**Limited File Access**

- Apps can no longer **freely access** all files in external storage (\`/sdcard/\`).
- Instead, apps can only access **their own app-specific directories** inside:
- 📂 \`Android/data/com.example.app/\`
- 📂 \`Android/media/com.example.app/\`

**FileProvider is Required for Sharing**

- Direct **file://** URIs are **blocked** (causes \`FileUriExposedException\`).
- Apps must **use** **FileProvider.getUriForFile()** to share files.

**Temporary Permissions for File Access**

- If an app wants to share a file (e.g., an image) with another app (WhatsApp, Gmail, etc.), it must use:

intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)

intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)

intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)

- This grants temporary permission for the receiving app to read the file.

**Media Store APIs for Public Files**

- Apps should use **MediaStore** **APIs** to read/write **public** files (e.g., Photos, Downloads).

| Feature | Android 10+ (Scoped Storage) | Android 9- (FileProvider) |
| --- | --- | --- |
| Where is image saved? | Pictures/ using MediaStore | Pictures/MyApp/ manually |
| Requires WRITE_EXTERNAL_STORAGE? | ❌ No | ✅ Yes (Android 9-) |
| How to share? | Direct Uri from MediaStore | FileProvider URI |
| Compatible with all apps? | ✅ Yes (Gallery, WhatsApp, etc.) | ✅ Yes (With FileProvider) |

[view raw](https://gist.github.com/nphausg/13bd2aff03585c4c9d8dfb7f9bf65fb0/raw/18a24c9a90263913f8ae02ff6c83e918996e83bf/scopedStorageVsLegacyStorage.md) [scopedStorageVsLegacyStorage.md](https://gist.github.com/nphausg/13bd2aff03585c4c9d8dfb7f9bf65fb0#file-scopedstoragevslegacystorage-md) hosted with ❤ by [GitHub](https://github.com)

###### 📂 What is Android \`FileProvider\`?

\`FileProvider\` is a special subclass of \`ContentProvider\` in Android that allows you to securely share files between different applications without exposing the internal storage file paths. It provides a way to generate \`content://\` URIs instead of \`file://\` URIs, which prevents issues with the **Scoped Storage** and **File URI Exposure Exception** on modern Android versions.

- ✅ Securely share files between apps.
- ✅ Prevent \`FileUriExposedException\` on Android 7.0+.
- ✅ Works with **camera intents, sharing files via email, social media, …**
- ✅ Supports multiple modules in a project.

###### 📌 Basic Implementation of \`FileProvider\`

1️⃣ Specify the \`FileProvider\` in \`AndroidManifest.xml\`

Defining a [FileProvider](https://developer.android.com/reference/androidx/core/content/FileProvider) for your app requires an entry in your manifest. This entry specifies the authority to use in generating content URIs, as well as the name of an XML file that specifies the directories your app can share.

<provider

android:name="androidx.core.content.FileProvider"

android:authorities="\${applicationId}.provider"

android:exported="false"

android:grantUriPermissions="true">

<meta-data

android:name="android.support.FILE_PROVIDER_PATHS"

android:resource="@xml/filepaths" />

</provider>

<provider android:name="androidx.core.content.FileProvider" android:authorities="\${applicationId}.provider" android:exported="false" android:grantUriPermissions="true"> <meta-data android:name="android.support.FILE_PROVIDER_PATHS" android:resource="@xml/filepaths" /> </provider>

<provider
    android:name="androidx.core.content.FileProvider"
    android:authorities="\${applicationId}.provider"
    android:exported="false"
    android:grantUriPermissions="true">
    <meta-data
        android:name="android.support.FILE_PROVIDER_PATHS"
        android:resource="@xml/filepaths" />
</provider>

2️⃣ Specify sharable directories \`filepaths.xml\` in \`res/xml/\`

Once you have added the \`FileProvider\` to your app manifest, you need to specify the directories that contain the files you want to share. To specify the directories, start by creating the file \`filepaths.xml\` in the \`res/xml/\` subdirectory of your project. In this file, specify the directories by adding an XML element for each directory. The following snippet shows you an example of the contents of \`res/xml/filepaths.xml\`. The snippet also demonstrates how to share a subdirectory of the \`files/\` directory in your internal storage area:

<?xml version="1.0" encoding="utf-8"?>

<!-- TODO: add ARTICLE CARD `),i(t,r(n({title:"📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions",desc:"In the world of modern android development, Jetpack Compose has revolutionized UI building, making it more intuitive and efficient. But what if you need a simple function to download, save, and share images within your app? Whether you are building a social media app, a gallery viewer, or just need to hand images dynamically, this guide will walk you through the comparison between FileProvider and MediaStore as well as suggest some of interview questions. Now let’s go 🔥",link:"https://chanhi2000.github.io/bookshelf/droidcon.com/%F0%9F%93%B8-android-comparing-fileprovider-vs-mediastore-top-interview-questions.html",logo:"https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",background:"rgba(4,20,221,0.2)"})),null,16)])}const A=p(g,[["render",y],["__file","📸-android-comparing-fileprovider-vs-mediastore-top-interview-questions.html.vue"]]),S=JSON.parse('{"path":"/droidcon.com/%F0%9F%93%B8-android-comparing-fileprovider-vs-mediastore-top-interview-questions.html","title":"📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions","lang":"en-US","frontmatter":{"lang":"en-US","title":"📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions","description":"Article(s) > 📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions","icon":"fa-brands fa-android","category":["Java","Kotlin","Android","Article(s)"],"tag":["blog","droidcon.com","java","kotlin","android"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > 📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions"},{"property":"og:description","content":"📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/droidcon.com/%F0%9F%93%B8-android-comparing-fileprovider-vs-mediastore-top-interview-questions.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/droidcon.com/%F0%9F%93%B8-android-comparing-fileprovider-vs-mediastore-top-interview-questions.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions"}],["meta",{"property":"og:description","content":"Article(s) > 📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Sx4veSpq_Z1oYBsP5Q7nwQ.jpeg"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Sx4veSpq_Z1oYBsP5Q7nwQ.jpeg"}],["meta",{"name":"twitter:image:alt","content":"📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions"}],["meta",{"property":"article:author","content":"Leo N"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"droidcon.com"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"kotlin"}],["meta",{"property":"article:tag","content":"android"}],["meta",{"property":"article:published_time","content":"2025-02-12T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"📸 Android: Comparing FileProvider vs. MediaStore + Top Interview Questions\\",\\"image\\":[\\"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Sx4veSpq_Z1oYBsP5Q7nwQ.jpeg\\"],\\"datePublished\\":\\"2025-02-12T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Leo N\\"}]}"]],"prev":"/programming/java-android/articles/README.md","date":"2025-02-12T00:00:00.000Z","isOriginal":false,"author":"Leo N","cover":"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Sx4veSpq_Z1oYBsP5Q7nwQ.jpeg"},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":1}]},"readingTime":{"minutes":4.51,"words":1352},"filePathRelative":"droidcon.com/📸-android-comparing-fileprovider-vs-mediastore-top-interview-questions.md","localizedDate":"February 12, 2025","excerpt":"\\n","copyright":{"author":"Leo N"}}');export{A as comp,S as data};
