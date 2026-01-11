---
lang: en-US
title: "How to Build and Deploy an Image Hosting Service on Sevalla"
description: "Article(s) > How to Build and Deploy an Image Hosting Service on Sevalla"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - DevOps
  - AWS
  - Sevella
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - node
  - node
  - express
  - express
  - express
  - devops
  - amazon
  - aws
  - amazon-web-services
  - sevella
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build and Deploy an Image Hosting Service on Sevalla"
    - property: og:description
      content: "How to Build and Deploy an Image Hosting Service on Sevalla"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-and-deploy-an-image-hosting-service-on-sevalla.html
prev: /programming/js-express/articles/README.md
date: 2025-09-26
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758890260515/c4b83d17-c783-425c-ab11-50961e44ea58.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Express.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Sevalla > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/sevalla/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build and Deploy an Image Hosting Service on Sevalla"
  desc="When most people think of image hosting, they imagine uploading photos to a cloud service and getting back a simple link. It feels seamless, but behind that experience sits a powerful set of technologies. At the core is something called object storag..."
  url="https://freecodecamp.org/news/build-and-deploy-an-image-hosting-service-on-sevalla"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1758890260515/c4b83d17-c783-425c-ab11-50961e44ea58.png"/>

When most people think of image hosting, they imagine uploading photos to a cloud service and getting back a simple link.

It feels seamless, but behind that experience sits a powerful set of technologies. At the core is something called object storage, which is a different way of handling files compared to traditional databases or file systems.

In this article, we’ll build a complete image hosting service using [<VPIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/en) and Express, connect it to object storage, and finally, deploy the whole project to [<VPIcon icon="iconfont icon-sevella"/>Sevalla](https://sevalla.com/).

By the end, you will have a working application that lets users upload images and retrieve them through hosted URLs, all running live on the cloud.

---

## What is Object Storage?

To understand why our project is designed the way it is, we need to first understand object storage.

Traditional file storage systems save files in a hierarchy of folders, like your computer’s file explorer. Block storage systems, often used in databases, split data into chunks and manage them for speed and reliability.

Object storage is different. It treats each file, whether an image, video, or document, as a single object. Each object is stored with its metadata and a unique identifier inside a flat structure, usually called a bucket.

This flat architecture makes object storage scalable almost without limit. Instead of worrying about file paths or directories, you simply place an object in a bucket and get back an identifier.

[<VPIcon icon="fa-brands fa-aws"/>Amazon S3](https://aws.amazon.com/s3/) is the industry standard for object storage, offering massive scale, global replication, and advanced features, but it comes with added complexity and often unpredictable costs. Sevalla’s object storage, on the other hand, is designed for developers who want the same durability and scalability without the steep learning curve.

It provides a simpler setup, and is compatible with S3, so interacting with it is same as using a S3 bucket without the additional setup and complexity. While S3 is ideal for enterprises with petabytes of data, Sevalla’s solution is perfect for projects like image hosting, blogs, or mobile apps where ease of use and speed matter most.

---

## What We Will Be Building

We will create a simple yet practical image hosting service. At its core, the service allows a user to send an image through an HTTP request. The server will accept this image, process it, and store it in object storage.

The usefulness of such a project goes far beyond a coding exercise. If you are building a blog, you could use this service to store images for your posts without worrying about file management on your web server.

If you are developing a mobile app that requires profile pictures or image sharing, this backend can serve as your foundation. Even if you simply want to understand how cloud-native applications handle file uploads, this project gives you a clear, hands-on experience.

By the end, you will not just have code running locally. We will deploy the application on Sevalla, meaning your image hosting service will be live, scalable, and accessible to anyone with a link.

---

## How to Set Up the Project

Let us start by setting up a Node.js project. You can [clone this repository (<VPIcon icon="iconfont icon-github"/>`manishmshiva/image-host)](https://github.com/manishmshiva/image-host) if you don’t want to setup the project from scratch.

Create a new project directory, initialize it with npm, and install the required dependencies.

```sh
npm init -y
npm i express multer dotenv @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

We will use [<VPIcon icon="iconfont icon-expressjs"/>Express](https://expressjs.com/) for our web server, [<VPIcon icon="fa-brands fa-npm"/>`Multer`](https://npmjs.com/package/multer) for handling file uploads, and the [<VPIcon icon="fa-brands fa-aws"/>AWS SDK](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html) to connect to object storage. Multer acts as middleware, giving us easy access to uploaded files. The AWS SDK gives us programmatic access to object storage, allowing us to upload files and generate links.

Let’s write a quick <VPIcon icon="fa-brands fa-html5"/>`index.html` and put it inside the <VPIcon icon="fas fa-folder-open"/>`public/` directory to serve as the UI for file upload.

```html :collapsed-lines title="index.html"
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" /> <!-- Set character encoding -->
  <meta name="viewport" content="width=device-width,initial-scale=1" /> <!-- Mobile-friendly -->
  <title>Pic Host</title>

  <!-- Simple CSS styling for layout and form -->
  <style>
    :root { color-scheme: light dark; } /* Support dark/light themes */
    body { 
      font-family: system-ui, sans-serif; 
      max-width: 560px; 
      margin: 4rem auto; 
      padding: 0 1rem; 
    }
    h1 { font-size: 1.25rem; margin-bottom: 1rem; }
    form, .card { 
      border: 1px solid #9993; 
      padding: 1rem; 
      border-radius: 12px; 
    }
    input[type="file"] { margin: .5rem 0 1rem; }
    button { 
      padding: .6rem 1rem; 
      border-radius: 10px; 
      border: 1px solid #9995; 
      background: #0000FF; 
      cursor: pointer; 
    }
    #result { margin-top: 1rem; display: none; }
    #result a { word-break: break-all; } /* Break long URLs nicely */
  </style>
</head>
<body>
  <!-- Page heading -->
  <h1>Simple Image Host</h1>

  <!-- Upload form -->
  <form id="uploadForm" class="card">
    <label for="file">Choose image</label><br/>
    <input id="file" name="file" type="file" accept="image/*" required />
    <br/>
    <button type="submit">Upload</button>
    <!-- Status text (uploading, success, error) -->
    <div id="status" aria-live="polite" style="margin-top:.75rem;"></div>
  </form>

  <!-- Result card: hidden until an image is uploaded -->
  <div id="result" class="card">
    <div>
      <strong>Share this page:</strong> 
      <a id="pageUrl" href="#" target="_blank" rel="noopener"></a>
    </div>
  </div>

  <!-- Client-side JavaScript -->
  <script>
    const form = document.getElementById('uploadForm');   // Form element
    const statusEl = document.getElementById('status');   // Upload status
    const result = document.getElementById('result');     // Result box
    const pageUrlEl = document.getElementById('pageUrl'); // Share link
    const directUrlEl = document.getElementById('directUrl'); // (unused here)

    // Event listener for form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent full-page reload
      statusEl.textContent = 'Uploading...'; 
      result.style.display = 'none';

      const fd = new FormData(); // FormData object for sending file
      const file = document.getElementById('file').files[0];
      if (!file) {
        statusEl.textContent = 'Pick a file first.';
        return;
      }
      fd.append('file', file); // Attach file to request

      try {
        // Send file to backend /upload route
        const res = await fetch('/upload', { method: 'POST', body: fd });
        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();

        // Show returned page URL
        pageUrlEl.textContent = data.pageUrl;
        pageUrlEl.href = data.pageUrl;

        // Display result card and reset form
        result.style.display = 'block';
        statusEl.textContent = 'Done!';
        form.reset();
      } catch (err) {
        // Handle error
        statusEl.textContent = 'Error: ' + err.message;
      }
    });
  </script>
</body>
</html>
```

When a user visits the page, they’ll see a simple upload form with a file picker. They can select an image from their computer and click Upload. Then JavaScript intercepts the form submission using `addEventListener('submit')`, prevents the browser from doing a full page refresh, and instead, packages the selected file into a `FormData` object.

That file is then sent to the server with a `fetch` call to the `/upload` route. If the server responds successfully, the JSON returned contains a `pageUrl`. This URL is displayed inside the result card, which was initially hidden. The user can now copy this link and share it with others.

If something goes wrong, like no file being selected, the server erroring out, or the upload failing, the script updates the status message to inform the user.

Here’s how it looks to the user.

![<VPIcon icon="fa-brands fa-html5"/>`index.html`](https://cdn.hashnode.com/res/hashnode/image/upload/v1757306506845/aed05c76-954e-4bae-a995-8efc2da89f10.jpeg)

Now let’s create the backend using <VPIcon icon="fa-brands fa-js"/>`server.js` file.

```js :collapsed-lines title="server.js"
import path from "path"; // For working with file paths
import express from "express"; // Web framework to handle HTTP routes
import multer from "multer"; // Middleware for handling file uploads
import crypto from "crypto"; // Used to generate random unique IDs
import dotenv from "dotenv"; // Loads environment variables from .env file
import { fileURLToPath } from "url"; // For handling ES module file paths
import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3"; // AWS SDK commands for S3 operations
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"; // To generate temporary signed URLs

dotenv.config(); // Load environment variables

// Setup paths for __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Bucket name from environment
const S3_BUCKET = process.env.S3_BUCKET;

// Create an S3 client (works with Sevalla-compatible storage as well)
const s3 = new S3Client({
  region: "auto", // Auto-region for Sevalla
  endpoint: process.env.ENDPOINT, // Custom endpoint for object storage
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // From .env
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // From .env
  },
});

// Initialize Express app
const app = express();

// Serve static files (like index.html, CSS, JS) from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Multer setup: store uploaded files in memory (not on disk)
// Limit file size to 10MB
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

// ---------- ROUTE 1: GET / ----------
// Serves the main HTML file (upload form)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ---------- ROUTE 2: POST /upload ----------
// Handles image uploads and stores them in object storage
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) return res.status(400).json({ error: "file is required" });

    // Generate a random ID for the file
    const id = crypto.randomUUID().replace(/-/g, "");
    const key = id;

    // Create a PutObjectCommand to upload file to S3/Sevalla
    const put = new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      Metadata: {
        originalname: req.file.originalname || "",
      },
    });

    // Upload the file
    await s3.send(put);

    // Build a page URL for retrieving the image later
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const pageUrl = `${baseUrl}/i/${id}`;

    // Respond with the page URL
    res.json({ id, pageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "upload_failed" });
  }
});

// ---------- ROUTE 3: GET /i/:id ----------
// Redirects to a signed URL for secure access to the uploaded file
app.get("/i/:id", async (req, res) => {
  const { id } = req.params;
  const key = id;

  try {
    // Ensure the object exists in storage
    await s3.send(new HeadObjectCommand({ Bucket: S3_BUCKET, Key: key }));

    // Create a signed URL valid for 1 hour
    const command = new GetObjectCommand({ Bucket: S3_BUCKET, Key: key });
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    // Redirect user to the signed URL
    return res.redirect(302, signedUrl);
  } catch (err) {
    console.error(err);
    return res.status(404).send("Not found");
  }
});

// ---------- Boot the Server ----------
app.listen(process.env.PORT || 3000, () => {
  console.log(`Image host server listening for requests...`);
});
```

### Route 1: `GET /`

This is the entry point of the app. When you open the browser and go to the root URL, it serves the `index.html` file from the `public` folder. That file contains the upload form where the user can select an image and submit it.

### Route 2: `POST /upload`

This is where the magic happens. When a user selects an image and clicks “Upload,” the file is sent to this endpoint. Multer handles the file upload in memory, and then the file is pushed to object storage using the `PutObjectCommand`. A random unique ID is generated as the key for the file. Once uploaded, the server responds with a `pageUrl` that can be used to view the uploaded image later.

### Route 3: `GET /i/:id`

This route retrieves an uploaded image. Instead of serving the file directly, it generates a signed URL valid for one hour using `getSignedUrl`. This signed URL gives temporary access to the file stored in object storage. The server then redirects the user to that signed URL. If the file doesn’t exist, it returns a 404 error.

Before you run this code, we need access to the object storage and add the value in an environment file. The code you see `process.env` fetches these values and helps us authenticate with the object storage to read and write files.

---

## How to Create Your Object Storage

[<VPIcon icon="iconfont icon-sevalla"/>Login](https://app.sevalla.com/login) to Sevalla and click “Object Storage”. Click “Create Object Storage” and give it a name.

![Object Storage Creation](https://cdn.hashnode.com/res/hashnode/image/upload/v1757306560384/3e88b143-2fa9-465d-b3d6-e0e54c90a6a3.jpeg)

Once created, click “Settings” and you will see the access key and secret key. We need these four values

- Bucket name
- Endpoint URL
- Access Key
- Secret Key

![Object Storage Access Keys](https://cdn.hashnode.com/res/hashnode/image/upload/v1757306618051/90970694-3d7c-486f-b32a-54c83ca88c7f.jpeg)

Copy them into a file named <VPIcon icon="iconfont icon-doitenv" />`.env` within your project.

```sh title=".env"
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID_HERE
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY_HERE
S3_BUCKET=YOUR_BUCKET_NAME_HERE
ENDPOINT=YOUR_ENDPOINT_URL_HERE
```

Additionally, enable public access in the settings so that you can push files from your local environment.

![public access enabled](https://cdn.hashnode.com/res/hashnode/image/upload/v1757306660300/7abe369e-f820-4770-82d7-27da03c9b7a9.jpeg)

### Testing the Application Locally

Let’s make sure our code works locally.

```sh
node server.js
```

Go to `http://localhost:3000` and try uploading a file. It should give you the URL to view the file after a successful upload.

![File upload success](https://cdn.hashnode.com/res/hashnode/image/upload/v1757306699833/b95b69ed-17f6-4fe9-b0a8-22e15876655d.jpeg)

You can visit the URL to see your uploaded file. You can also double check if it has been uploaded using the Object Storage UI.

![Object Storage UI](https://cdn.hashnode.com/res/hashnode/image/upload/v1757306733665/35944857-71bb-4d1a-9e11-85c35c875465.jpeg)

Great. We have built a simple image hosting and sharing service. Now let’s get this into the cloud.

---

## How to Deploy Your Project on Sevalla

First, push your project to GitHub or [fork my repository (<VPIcon icon="iconfont icon-github"/>`manishmshiva/image-host`)](https://github.com/manishmshiva/image-host). Then log in to your Sevalla dashboard and create a new application.

![Create application](https://cdn.hashnode.com/res/hashnode/image/upload/v1757306768439/3be4f9ac-abd4-4b98-95e3-22b97a3eea1a.jpeg)

Connect your GitHub account, choose the repository that contains your image hosting service, and select the branch you want to deploy. Sevalla will automatically detect that it is a Node.js project and install dependencies. It will also run the application on the specified port.

To configure AWS credentials and bucket information, go to the environment variables section in your app and add your `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, and `S3_BUCKET_NAME`. These values will be injected into your application at runtime, ensuring that sensitive data is not hardcoded into your source code.

![Adding environment variables](https://cdn.hashnode.com/res/hashnode/image/upload/v1757306811113/b5e1782d-2bce-4b9e-a654-a131e58a44cd.jpeg)

Once environment variables are added, go to “Overview” and click “Deploy”.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757306855343/fbcfcd74-d74e-43ad-9b99-7f02421cf5df.jpeg)

Wait for a few minutes. Once the deployment is complete, Sevalla will give you a live URL. Click “Visit APP” to go to your application’s page.

![Live url](https://cdn.hashnode.com/res/hashnode/image/upload/v1757306886378/97705a1f-c625-4282-9ef0-042c8c01b431.jpeg)

Congratulations! Your app is now live. You can share the URL with others or even add a custom domain to your app to have your own image hosting solution.

---

## Why This Project Matters

This project is more than just a coding exercise. It teaches you how modern applications manage files at scale, introduces you to object storage, and shows how to integrate cloud services into your own projects.

With Sevalla, you also learned how to deploy production-ready applications, giving you the full cycle from local prototype to live cloud service.

For developers building blogs, mobile apps, or even internal tools, the ability to host images reliably and at scale is invaluable. With object storage and a simple Node.js service, you can avoid reinventing the wheel and rely on proven cloud infrastructure.

---

## Conclusion

We began by exploring object storage and why it is ideal for handling files like images. We then built a Node.js application that accepts uploads, stores them in Sevalla’s Object Storage, and returns accessible URLs. Finally, we deployed the application on Sevalla, turning a local project into a live image hosting service. Along the way, you gained not only working code but also a deeper understanding of how to build cloud-native services.

By completing this project, you now have a working image hosting service you can extend and adapt. You could add features like authentication, image resizing, or even a better front-end interface with drag-and-drop UI. Most importantly, you have experienced how development and deployment fit together in modern software.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build and Deploy an Image Hosting Service on Sevalla",
  "desc": "When most people think of image hosting, they imagine uploading photos to a cloud service and getting back a simple link. It feels seamless, but behind that experience sits a powerful set of technologies. At the core is something called object storag...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/build-and-deploy-an-image-hosting-service-on-sevalla.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
