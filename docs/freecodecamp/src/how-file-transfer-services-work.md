---
lang: en-US
title: "What Happens When You Upload a Large File & Generate a Temporary Download Link"
description: "Article(s) > What Happens When You Upload a Large File & Generate a Temporary Download Link"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What Happens When You Upload a Large File & Generate a Temporary Download Link"
    - property: og:description
      content: "What Happens When You Upload a Large File & Generate a Temporary Download Link"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-file-transfer-services-work.html
prev: /programming/js-express/articles/README.md
date: 2026-11-10
isOriginal: false
author:
  - name: Reetain Raina
    url: https://freecodecamp.org/news/author/reetain/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/5ab5b73d-ffb5-4c71-91b7-648b69bb79b7.png
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

[[toc]]

---

<SiteInfo
  name="What Happens When You Upload a Large File & Generate a Temporary Download Link"
  desc="Sending a 5 GB video file might seem simple. You select the file, click Upload, wait for the progress bar to finish, and share a link with someone. But there are several things happening in the backgr"
  url="https://freecodecamp.org/news/how-file-transfer-services-work"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/5ab5b73d-ffb5-4c71-91b7-648b69bb79b7.png"/>

Sending a 5 GB video file might seem simple. You select the file, click Upload, wait for the progress bar to finish, and share a link with someone. But there are several things happening in the background while the file is being uploaded.

The file has to travel across a network, reach a server, and be stored somewhere before another person can download it. The service also needs to make sure that the recipient can access the file without accessing the sender's account. If the internet connection drops halfway through the upload, it needs a way to continue without sending the entire file again.

File transfer services use HTTP requests, storage systems, databases, encryption, and background processes to manage these tasks. But how does a website actually handle a file that's several gigabytes in size? Does it upload everything in one request? Where does the file go after the upload finishes? And what happens when its download link expires?

In this article, we'll look at how file transfer services handle large uploads, store files, generate download links, and manage interrupted connections and expired transfers. Then, once you understand the theory behind how it all works, we'll also build a basic chunked file uploader using Node.js to see some of these processes in action.

---

## Why Email Attachments Fail: SMTP Wasn't Designed for Large Files

Before looking at dedicated file transfer services, it helps to understand why we can't just attach massive files to an email. Sending large files through email is fundamentally flawed because the underlying architecture was built for text, not high-resolution media.

### SMTP and Attachment Size Limits

Simple Mail Transfer Protocol (SMTP) handles the transmission of email messages across the internet. Because servers have limited bandwidth and storage, email providers impose strict attachment size limits, usually capping out around 25 MB. However, these limits apply to the encoded message size, not just the original file sitting on your hard drive.

### The Base64 Problem

Email attachments are commonly encoded using MIME and Base64 formats. Base64 is necessary because it converts binary data into text-compatible characters that email servers can safely route. While this solves the transmission problem, it creates a massive efficiency issue: this encoding increases the data size by approximately 33%.

You can read the foundational specifications for this in [<VPIcon icon="fas fa-globe"/>RFC 2045](https://datatracker.ietf.org/doc/html/rfc2045), which defines MIME's Base64 transfer encoding. In practice, this means a 30 MB video file will require roughly 40 MB of space before additional message overhead is even calculated, guaranteeing it will bounce back from most email servers.

---

## The Core Architecture: What Happens Behind a File Transfer Service?

To bypass the limitations of email, file transfer services use a specialized, decoupled architecture. Having built a few of these systems myself, I believe establishing a clear mental model of the five major components is crucial for understanding the flow of data.

### The Client

The journey begins in the client, which is usually a web browser or a desktop application where the sender selects a file. Modern browsers use JavaScript's File API to access file metadata, read the raw contents and intelligently divide the file into smaller, manageable parts before any data hits the network.

### The Upload Server

Once the client starts sending data, the upload server steps in. This server receives the upload requests, authenticates the user, validates incoming data and coordinates the entire upload process. It acts as the traffic cop, ensuring that chunks of data are arriving in the correct format.

### The Storage Layer

Traditional application servers are terrible at holding massive files, so the storage layer handles the actual heavy lifting. Uploaded files are typically routed directly to object storage solutions. This allows the system to scale infinitely without crashing the primary upload servers.

### The Metadata Database

While the physical file goes to object storage, the application needs a way to remember what that file is. The metadata database stores critical information, including the original filename, file size, content type, the specific object storage key, a unique transfer identifier and the exact expiration timestamp.

### The Download Server

When someone opens a shared link, the download server takes over. It checks the database to verify permissions and expiration dates, and if everything is valid, it retrieves the stored object from the storage layer for delivery.

---

## Chunked and Resumable Uploads: How Large Files Survive Bad Internet Connections

Transferring a 5 GB file in one continuous network request is a disaster waiting to happen. If a connection drops at 99%, a single-request architecture forces the user to start all over again.

### Breaking a Large File Into Smaller Chunks

To solve this, modern clients divide large files into smaller parts, such as 10 MB chunks. Each chunk is uploaded to the server as an independent HTTP request. The server meticulously tracks which chunks have arrived. Some advanced systems even allow multiple chunks to upload simultaneously in parallel, drastically reducing the overall waiting time.

It's important to note that chunked uploads are an architectural pattern, which is entirely different from HTTP chunked transfer encoding (a mechanism for framing an HTTP message body).

### What Happens When the Internet Disconnects?

Suppose 80% of a massive file has successfully uploaded when your Wi-Fi randomly disconnects. Without resumable uploads, that progress is lost. With resumable architecture, the client reconnects and asks the server for the upload offset, the exact number of bytes successfully received and stored. The client then seamlessly continues uploading from that exact position.

### Checksums: Making Sure Nothing Gets Corrupted

Network transfers can sometimes flip bits, resulting in corrupted files. To prevent this, clients generate a cryptographic hash (checksum) for an individual chunk before sending it. The server receives the chunk, calculates its own hash, and compares the two. If the checksums don't match, the server rejects the chunk and asks the client to try again.

If you're looking to implement this, the [<VPIcon icon="fas fa-globe"/>TUS Resumable Upload Protocol](https://tus.io/) is a fantastic, standardized reference for managing upload offsets and checksum verification. Also, the [<VPIcon icon="fa-brands fa-aws"/>Amazon S3 Multipart Upload Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html) provides an industry-standard blueprint for handling parallel transfers and retrying failed parts.

---

## Storage and Link Generation: Where Does Your File Actually Go?

Once every chunk is verified and reassembled, the service needs a secure place to keep the file until the recipient is ready to download it.

### Why Services Use Object Storage

In my opinion, attempting to store gigabytes of user uploads on a traditional local server directory is architectural malpractice. Instead, services rely on object storage. Files are stored as flat objects and each object is assigned a unique key. Object storage is highly durable and scales quite easily to accommodate millions of massive files simultaneously.

### How a Download Link Is Created

The relationship between the stored file and its shareable link relies on the metadata database. When the upload finishes, the application saves the file's storage key in the database and generates a unique access token. The recipient receives a URL containing that specific token. When they click the link, the server reads the token, locates the relevant file in the database and checks the download permissions.

### Why Are These Links Difficult to Guess?

A secure file transfer link relies heavily on high entropy, which is randomness that makes tokens mathematically near-impossible to predict. Also, secure systems use signed URLs. These are URLs containing cryptographic signatures that authorize access for a limited, strictly-enforced period.

As outlined in the [<VPIcon icon="fas fa-globe"/>OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html), a random link isn't automatically secure without appropriate access controls, expiration policies, and protection against token leakage.

---

## Expiry and Cleanup: What Happens When a Transfer Expires?

File transfer services process petabytes of data, meaning they can't store uploaded files forever without going bankrupt. They rely on aggressive lifecycle management.

### Time to Live (TTL)

Every transfer is assigned a Time to Live (TTL) or expiration timestamp. Once that time passes, the database instantly invalidates the transfer identifier, ensuring that the download link no longer authorizes access.

### Automated Cleanup Jobs

Because link expiration and physical deletion aren't necessarily simultaneous, background workers or scheduled cron jobs handle the actual cleanup. These workers periodically scan the database to find expired transfers, mark them as permanently unavailable, delete the associated multi-gigabyte objects from the storage layer, and finally remove the outdated metadata.

### Download Limits

Some services also allow senders to limit how many times a file can be downloaded. Once the download count reaches the threshold, the link behaves exactly as if the TTL had expired, offering an excellent way to control unauthorized distribution.

---

## Security Layers: Protecting Files During Transfer and Storage

Security in file transfers is never about a single magic feature. It requires multiple layers of defense to keep data safe from interception or theft.

### TLS Encryption in Transit

When data travels between the sender, the transfer service, and the recipient, it's heavily encrypted. Modern platforms use HTTPS backed by strict TLS protocols to ensure no one can snoop on the data packets mid-route.

For a deep dive into how this is configured at an enterprise level, [<VPIcon icon="fas fa-globe"/>NIST SP 800-52 Rev. 2](https://csrc.nist.gov/publications/detail/sp/800-52/rev-2/final) offers exhaustive guidelines for TLS implementations.

### Encryption at Rest

Once the file arrives at the storage layer, encryption at rest ensures that even if a bad actor physically accessed the server hardware, they would only find scrambled, unreadable data. It's important to note that encryption at rest isn't the same as end to end encryption. The service provider still manages the encryption keys in a standard setup.

### Password-Protected Links

To prevent unauthorized users from accessing a valid URL, senders can add a password. This creates a secondary access-control layer that must be cleared before the server will even attempt to fetch the file from object storage. Additional safeguards, like rate-limiting against automated password guessing, ensure this layer remains effective.

---

## Real-World Examples: How Popular File Transfer Services Handle File Sharing

Seeing how established companies implement these concepts helps bridge the gap between theory and practice.

### WeTransfer: Temporary Transfers and Password Protection

WeTransfer is built entirely around temporary shareable links. Transfers have strict expiration timelines and premium users can enforce password protection. According to their security documentation, they utilize standard TLS encryption during transit and AES-256 encryption at rest to secure files on their servers.

### Dropbox Transfer: Sending Files Without Collaboration

Unlike a standard shared folder, Dropbox Transfer creates standalone downloadable links. Recipients don't need a Dropbox account to download the payload. They utilize configurable expiration dates, passwords, and automated download notifications, with maximum file size limits dictated by the sender's specific subscription plan.

### Send Anywhere: Direct Transfers and Temporary Links

Send Anywhere takes a fascinating hybrid approach. Its six-digit key transfer mechanism operates in real-time for one-time use within a 10-minute window, often leveraging peer to peer connections. Conversely, its standard Share Link option falls back to a server-based architecture, uploading files and keeping the link valid for up to 48 hours.

### Filemail: Large Transfers and Expiration Controls

Offering robust email and shareable-link delivery options, Filemail handles massive payloads easily. They provide highly configurable expiration controls and rigorous password protection. Their free service tier currently allows a 5 GB transfer limit, holding the data securely for a maximum seven-day storage period before automated cleanup takes over.

---

## Hands-On: Build a Minimal Chunked File Uploader Using Node.js

Understanding the theory is great, but building it yourself proves how it actually works. Let's create a simple application that divides a file into smaller chunks in the browser, uploads them to a Node.js server and stitches them back together.

### Step 1: Set Up the Node.js Project

You'll need Node.js, the Express framework, and multer for handling incoming file chunks. The built-in fs module will handle our file operations. First, create a Node project and install the required dependencies:

```sh
mkdir file-transfer
cd file-transfer
npm init -y
npm install express multer
```

### Step 2: Divide the File Into Smaller Chunks

First, create a <VPIcon icon="fas fa-folder-open"/>`public` directory inside your project folder if it doesn't already exist. Then, create a file named <VPIcon icon="fa-brands fa-js"/>`upload.js` inside that directory. We'll use the browser's JavaScript File API and its `slice()` method to read smaller portions of a file without loading the entire 5 GB payload into your computer's RAM.

```js :collapsed-lines title="upload.js"
const chunkSize = 5 * 1024 * 1024;

async function uploadFile(file) {
  const totalChunks = Math.ceil(file.size / chunkSize);
  const uploadId = crypto.randomUUID();

  for (let index = 0; index < totalChunks; index++) {
    const chunk = file.slice(
      index * chunkSize,
      (index + 1) * chunkSize
    );

    const formData = new FormData();
    formData.append("chunk", chunk);

    const response = await fetch(
      `/upload/${uploadId}/${index}/${totalChunks}`,
      {
        method: "POST",
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error(`Chunk ${index} failed to upload`);
    }
  }

  const response = await fetch(`/complete/${uploadId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      totalChunks,
      filename: file.name
    })
  });

  if (!response.ok) {
    throw new Error("File reassembly failed");
  }
}
```

Here, `crypto.randomUUID()` generates a unique ID for the upload. The browser sends each chunk separately and uses the same ID to associate all the chunks with the original file.

### Step 3: Create an Upload Endpoint in Express

On the server side (<VPIcon icon="fa-brands fa-js"/>`server.js`), we need an endpoint to receive and temporarily store each chunk. The server uses the upload ID and chunk index to determine where each part belongs, while the total number of chunks helps validate the upload. We use multer to parse the incoming multipart form data.

```js :collapsed-lines title="server.js"
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { pipeline } = require("stream/promises");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const chunksDir = path.join(__dirname, "chunks");
const tempDir = path.join(chunksDir, "temp");

fs.mkdirSync(tempDir, { recursive: true });

const upload = multer({
  dest: tempDir,
  limits: { fileSize: 5 * 1024 * 1024 }
});

app.post(
  "/upload/:id/:index/:total",
  upload.single("chunk"),
  async (req, res) => {
    try {
      const { id, index, total } = req.params;

      if (!req.file) {
        return res.status(400).send("No chunk received");
      }

      if (
        !/^[a-f0-9-]{36}$/i.test(id) ||
        !Number.isInteger(Number(index)) ||
        !Number.isInteger(Number(total)) ||
        Number(total) < 1 ||
        Number(total) > 10000 ||
        Number(index) < 0 ||
        Number(index) >= Number(total)
      ) {
        return res.status(400).send("Invalid upload details");
      }

      const folder = path.join(chunksDir, id);

      await fs.promises.mkdir(folder, {
        recursive: true
      });

      await fs.promises.rename(
        req.file.path,
        path.join(folder, `${index}.part`)
      );

      res.send("Chunk received");

    } catch (error) {
      res.status(500).send("Upload failed");
    }
  }
);
```

The server stores each chunk using its upload ID and index, making it possible to identify and retrieve the individual parts when the upload is complete.

### Step 4: Reassemble the Original File

Once the client confirms all chunks have been transmitted, it triggers a final reassembly route. The server first checks whether every expected chunk exists in the `chunks/` directory. It then reads the chunks sequentially using `fs.createReadStream()` and writes them to the same output file using `fs.createWriteStream()`. The first chunk creates the file, while subsequent chunks are appended to it. Once the original file has been reassembled, the server deletes the temporary chunks to free up space.

```js :collapsed-lines title="server.js"
const uploadsDir = path.join(__dirname, "uploads");

fs.mkdirSync(uploadsDir, { recursive: true });

app.use(express.json());

app.post("/complete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { totalChunks, filename } = req.body;

    if (
      !/^[a-f0-9-]{36}$/i.test(id) ||
      !Number.isInteger(totalChunks) ||
      totalChunks < 1 ||
      totalChunks > 10000 ||
      typeof filename !== "string"
    ) {
      return res.status(400).send("Invalid upload details");
    }

    const folder = path.join(chunksDir, id);

    for (let i = 0; i < totalChunks; i++) {
      const chunkPath = path.join(folder, `${i}.part`);

      if (!fs.existsSync(chunkPath)) {
        return res.status(400).send(`Missing chunk ${i}`);
      }
    }

    const safeName =
      path.basename(filename).replace(/[^\w.-]/g, "_") ||
      "upload.bin";

    const outputPath = path.join(
      uploadsDir,
      `${id}-${safeName}`
    );

    await fs.promises.rm(outputPath, { force: true });

    for (let i = 0; i < totalChunks; i++) {
      const chunkPath = path.join(folder, `${i}.part`);

      await pipeline(
        fs.createReadStream(chunkPath),
        fs.createWriteStream(outputPath, {
          flags: i === 0 ? "w" : "a"
        })
      );
    }

    await fs.promises.rm(folder, {
      recursive: true,
      force: true
    });

    res.json({
      message: "File assembled successfully"
    });

  } catch (error) {
    res.status(500).send("Reassembly failed");
  }
});
```

Finally, add the following code at the bottom of <VPIcon icon="fa-brands fa-js"/>`server.js` to start the Express server:

```js :collapsed-lines title="server.js"
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```

### Step 5: Test the Upload

Start the server by running `node server.js` in your terminal. Then, open `http://localhost:3000` in your browser and select a medium-sized video file to test the upload. Open your browser's Network tab to observe how the file is divided into chunks and sent sequentially. Finally, check your server's <VPIcon icon="fas fa-folder-open"/>`uploads/` directory. The assembled file should have the same byte size as the original and should open correctly.

Create <VPIcon icon="fas fa-folder-open"/>`public/index.html`:

```html :collapsed-lines title="index.html"
<!DOCTYPE html>
<html>
<head>
  <title>File Uploader</title>
</head>
<body>
  <h2>Upload a File</h2>
  <input type="file" id="fileInput" />
  <button id="uploadButton">Upload</button>

  <p id="status"></p>
  <script src="upload.js"></script>

  <script>
    const button = document.getElementById("uploadButton");
    const fileInput = document.getElementById("fileInput");
    const status = document.getElementById("status");

    button.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
        status.textContent = "Select a file first.";
        return;
    }

    button.disabled = true;

    try {
        await uploadFile(file);
        status.textContent = "Upload completed!";
    } catch (error) {
        status.textContent = error.message;
    } finally {
        button.disabled = false;
    }
    });
  </script>
</body>
</html>
```

::: note

This implementation demonstrates the basic mechanics of chunked uploads and file reassembly. It doesn't implement resumable uploads, checksum verification, authentication, object storage, or temporary download links.

:::

A production-grade file transfer service would also require persistent upload states, access controls, retry handling, integrity checks, and automated cleanup.

---

## Conclusion: A Simple Link Hides a Lot of Engineering

Sending a large file involves several processes working together. From upload handling and chunk management in the browser to object storage, metadata tracking, encryption, and automated cleanup, each component has a specific role in making file transfers work.

These processes also explain how services handle interrupted uploads, control access to shared files, and remove data when a transfer expires. Understanding how these components work together makes it easier to see what happens behind the scenes whenever someone uploads a large file and shares a download link.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Happens When You Upload a Large File & Generate a Temporary Download Link",
  "desc": "Sending a 5 GB video file might seem simple. You select the file, click Upload, wait for the progress bar to finish, and share a link with someone. But there are several things happening in the backgr",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-file-transfer-services-work.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
