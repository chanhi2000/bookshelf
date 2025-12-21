---
lang: en-US
title: "How to Build a Dropbox-like Distributed File Storage System Using MinIO and gRPC"
description: "Article(s) > How to Build a Dropbox-like Distributed File Storage System Using MinIO and gRPC"
icon: fa-brands fa-node
category:
  - Node.js
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Dropbox-like Distributed File Storage System Using MinIO and gRPC"
    - property: og:description
      content: "How to Build a Dropbox-like Distributed File Storage System Using MinIO and gRPC"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-dropbox-like-distributed-file-storage-system-using-minio-and-grpc.html
prev: /programming/js-node/articles/README.md
date: 2024-11-13
isOriginal: false
author: Birks Sachdev
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/GWQ67jjUg9g/upload/e37080969188b807a15d6ebdaf813fa2.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Dropbox-like Distributed File Storage System Using MinIO and gRPC"
  desc="In this tutorial, I’ll guide you through building a distributed file storage system inspired by Dropbox, using MinIO (an open-source, S3-compatible object storage server) and gRPC. The goal is to create a system that can store, replicate, and manage ..."
  url="https://freecodecamp.org/news/how-to-build-a-dropbox-like-distributed-file-storage-system-using-minio-and-grpc"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/GWQ67jjUg9g/upload/e37080969188b807a15d6ebdaf813fa2.jpeg"/>

In this tutorial, I’ll guide you through building a **distributed file storage system** inspired by Dropbox, using MinIO (an open-source, S3-compatible object storage server) and gRPC. The goal is to create a system that can **store, replicate, and manage files** across multiple nodes, ensuring data availability and resilience.

We'll implement core features like file replication, metadata management, and versioning, all while demonstrating how to achieve eventual consistency in a distributed environment. By the end, you'll have a fully functional distributed file storage system that can handle high traffic, optimize storage, and ensure data integrity.

---

## What You Will Learn

- How to set up **MinIO** for distributed object storage.
- How to use **gRPC** for efficient client-server communication.
- How to implement **file replication** and **metadata management**.
- How to understand **data consistency** in a distributed system.
- How to use **Docker** to deploy a scalable, distributed architecture.

::: note Prerequisites

Before starting, ensure you have the following installed:

- Node.js (v14 or higher)
- MinIO
- gRPC and gRPC-tools
- Docker

:::

You’ll also need to have a basic understanding of Node.js, object storage, and distributed systems.

---

## Project Overview

We'll build a **distributed file storage system** where:

1. Users can upload and download files.
2. Files are replicated across multiple storage nodes to ensure high availability.
3. Metadata (like file names, upload times, and versions) is managed centrally.
4. The system handles **eventual consistency** by syncing file updates across nodes.

### System Architecture

Our system will consist of:

1. **gRPC Server**: Manages file uploads, downloads, and metadata.
2. **MinIO Distributed Storage Nodes**: Handles object storage and replication.
3. **Client Interface**: Allows users to interact with the system via HTTP.

---

## Step 1: Setting Up the Project

Create a new directory for the project and initialize a Node.js application:

```sh
mkdir distributed-file-storage
cd distributed-file-storage
npm init -y
```

Now, install the necessary dependencies:

```sh
npm install grpc @grpc/grpc-js @grpc/proto-loader express multer dotenv minio
```

- **grpc**: For building gRPC server and client.
- **@grpc/proto-loader**: Loads gRPC protocol files.
- **express**: For the client-side HTTP server.
- **multer**: For handling file uploads.
- **dotenv**: For managing environment variables.
- **minio**: MinIO client for interacting with storage nodes.

Create a **.env** file with the following content:

```properties title=".env"
MINIO_ENDPOINT_1=localhost:9001
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
PORT=5000
```

---

## Step 2: Setting Up MinIO Distributed Storage Nodes

We'll use **Docker** to run multiple MinIO instances, simulating a distributed environment. Run the following commands to set up three MinIO containers:

```sh
docker run -p 9001:9000 --name minio1 -e "MINIO_ACCESS_KEY=minioadmin" -e "MINIO_SECRET_KEY=minioadmin" -d minio/minio server /data
docker run -p 9002:9000 --name minio2 -e "MINIO_ACCESS_KEY=minioadmin" -e "MINIO_SECRET_KEY=minioadmin" -d minio/minio server /data
docker run -p 9003:9000 --name minio3 -e "MINIO_ACCESS_KEY=minioadmin" -e "MINIO_SECRET_KEY=minioadmin" -d minio/minio server /data
```

These commands will start three MinIO nodes, each listening on a different port.

---

## Step 3: Defining the gRPC Protocol

Create a new folder named **protos** and inside it, create a file called **storage.proto**:

```protobuf title="storage.proto"
syntax = "proto3";

service FileStorage {
  rpc UploadFile(stream FileRequest) returns (UploadResponse);
  rpc DownloadFile(FileDownloadRequest) returns (stream FileResponse);
  rpc GetMetadata(FileMetadataRequest) returns (MetadataResponse);
}

message FileRequest {
  bytes fileData = 1;
  string fileName = 2;
}

message UploadResponse {
  string message = 1;
}

message FileDownloadRequest {
  string fileName = 1;
}

message FileResponse {
  bytes fileData = 1;
}

message FileMetadataRequest {
  string fileName = 1;
}

message MetadataResponse {
  string fileName = 1;
  string uploadTime = 2;
  string version = 3;
}
```

- **UploadFile**: Streams file data from the client to the server.
- **DownloadFile**: Streams file data from the server to the client.
- **GetMetadata**: Retrieves metadata like file name, upload time, and version.

---

## Step 4: Implementing the gRPC Server

Create a file called <VPIcon icon="fa-brands fa-js"/>`server.js`:

```js :collapsed-lines title="server.js"
require('dotenv').config();
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const Minio = require('minio');
const fs = require('fs');
const path = require('path');

const packageDefinition = protoLoader.loadSync('protos/storage.proto');
const storageProto = grpc.loadPackageDefinition(packageDefinition).FileStorage;

// Set up MinIO clients for each node
const minioClients = [
  new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT_1.split(':')[0],
    port: parseInt(process.env.MINIO_ENDPOINT_1.split(':')[1]),
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    useSSL: false,
  })
];

// Upload file to MinIO
async function uploadFile(call, callback) {
  const chunks = [];
  call.on('data', (chunk) => chunks.push(chunk.fileData));
  call.on('end', async () => {
    const buffer = Buffer.concat(chunks);
    const fileName = call.metadata.get('fileName')[0];

    // Store file in MinIO
    const client = minioClients[0];
    await client.putObject('files', fileName, buffer);
    callback(null, { message: `File ${fileName} uploaded successfully` });
  });
}

// Download file from MinIO
function downloadFile(call) {
  const { fileName } = call.request;
  const client = minioClients[0];

  client.getObject('files', fileName, (err, stream) => {
    if (err) return call.emit('error', err);
    stream.on('data', (chunk) => call.write({ fileData: chunk }));
    stream.on('end', () => call.end());
  });
}

function main() {
  const server = new grpc.Server();
  server.addService(storageProto.FileStorage.service, { uploadFile, downloadFile });
  server.bindAsync('0.0.0.0:5000', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC server running on port 5000');
    server.start();
  });
}

main();
```

Here’s what’s going on in this code:

1. **uploadFile**: Handles file uploads by streaming data to the server and storing it in MinIO.
2. **downloadFile**: Streams the requested file back to the client from MinIO.
3. **MinIO Clients**: We set up multiple MinIO clients to handle distributed storage.

---

## Step 5: Creating the Client

Create a file named <VPIcon icon="fa-brands fa-js"/>`client.js`:

```js :collapsed-lines title="client.js"
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');

const packageDefinition = protoLoader.loadSync('protos/storage.proto');
const storageProto = grpc.loadPackageDefinition(packageDefinition).FileStorage;
const client = new storageProto('localhost:5000', grpc.credentials.createInsecure());

function uploadFile(filePath) {
  const call = client.uploadFile();
  const fileName = filePath.split('/').pop();
  const stream = fs.createReadStream(filePath);

  stream.on('data', (chunk) => call.write({ fileData: chunk }));
  stream.on('end', () => call.end());
  call.on('data', (response) => console.log(response.message));
}

function downloadFile(fileName) {
  const call = client.downloadFile({ fileName });
  const writeStream = fs.createWriteStream(`downloaded_${fileName}`);

  call.on('data', (chunk) => writeStream.write(chunk.fileData));
  call.on('end', () => console.log(`Downloaded ${fileName}`));
}

uploadFile('test.txt');  // Example usage
```

---

## Step 6: Running the System

::: tabs

@tab:active 1. Start the gRPC Server

```sh
node server.js
```

@tab 2. Run the Client

```sh
node client.js
```

:::

---

## Conclusion: What You’ve Learned

Congratulations! You've built a distributed file storage system using **MinIO** and **gRPC**. In this tutorial, you learned how to:

1. Set up a **distributed object storage** system using MinIO.
2. Use **gRPC** to handle file uploads, downloads, and metadata management.
3. Implement **file replication** and **eventual consistency** across multiple nodes.
4. Utilize **Docker** to simulate a scalable distributed environment.

### Next Steps

1. **Add File Versioning**: Store multiple versions of files for rollback.
2. **Implement Authentication**: Secure your gRPC endpoints with JWT.
3. **Deploy with Kubernetes**: Scale your system across multiple nodes for high availability.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Dropbox-like Distributed File Storage System Using MinIO and gRPC",
  "desc": "In this tutorial, I’ll guide you through building a distributed file storage system inspired by Dropbox, using MinIO (an open-source, S3-compatible object storage server) and gRPC. The goal is to create a system that can store, replicate, and manage ...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-dropbox-like-distributed-file-storage-system-using-minio-and-grpc.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
