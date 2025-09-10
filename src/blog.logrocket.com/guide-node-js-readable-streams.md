---
lang: en-US
title: "A guide to Node.js readable streams"
description: "Article(s) > A guide to Node.js readable streams"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A guide to Node.js readable streams"
    - property: og:description
      content: "A guide to Node.js readable streams"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/guide-node-js-readable-streams.html
prev: /programming/js-node/articles/README.md
date: 2025-02-25
isOriginal: false
author:
  - name: Yan Sun
    url : https://blog.logrocket.com/author/yansun/
cover: /assets/image/blog.logrocket.com/guide-node-js-readable-streams/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="A guide to Node.js readable streams"
  desc="Explore how Node.js readable streams process data in small chunks, manage data flow, handle errors, and ensure resource cleanup."
  url="https://blog.logrocket.com/guide-node-js-readable-streams"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/guide-node-js-readable-streams/banner.png"/>

Imagine trying to drink from a firehose: overwhelming and chaotic. Now, think of sipping water from a glass: controlled and efficient. That’s exactly how Node.js readable streams handle data: processing it in small chunks instead of overwhelming our application.

![A Guide To Node.js Readable Streams](/assets/image/blog.logrocket.com/guide-node-js-readable-streams/banner.png)

Node.js’s streaming architecture is key to its high performance. In this guide, we’ll dive into Node.js readable streams  —  the pipelines that bring data into our application. We’ll explore how to work with them, build our application with composable stream components, and handle errors gracefully.

Let’s get started!

---

## Type of streams in Node.js

There are four primary types of Node.js streams, each serving a specific purpose:

| Stream type | Role | Common use cases |
| ---: | --- | --- |
| **Readable streams** | Fetch data from a source | Files, HTTP requests, user input |
| **Writable streams** | Send data to a destination | Files, HTTP responses |
| **Duplex streams** | Bidirectional data flow | TCP sockets, WebSocket connections |
| **Transform streams** | A subtype of duplex streams that modifies data as it flows through | Compression, encryption, parsing |

In this article, we’ll focus on readable streams.

---

## Readable streams

Node.js readable streams act as data sources, allowing us to consume information from files, network requests, and user input. By processing data in small, manageable chunks, they prevent memory overload and enable scalable, real-time data handling.

We can create readable streams using the `stream.Readable` class or its specialized implementations.

Common readable stream implementations include:

- `fs.createReadStream`: For streaming data from files on disk, it is particularly useful for handling large datasets.
- `http.IncomingMessage`: Handle incoming HTTP request bodies, commonly used in Express/Node.js servers
- `**process.stdin**`: Capture real-time user input from the command line

Here is an example of reading the contents of the <VPIcon icon="fas fa-file-lines"/>`input.txt` file using a readable stream:

```js
const fs = require("fs");
// Create a readable stream from a file
const readStream = fs.createReadStream("input.txt", { encoding: "utf-8" });
```

### Creating a custom readable stream

While Node.js provides built-in readable streams, there are times when we need to generate or adapt data in a custom way. Custom readable streams are suitable for:

- Generating synthetic data (e.g., test fixtures, mock APIs)
- Adapting non-stream sources (e.g., databases, sensors) into stream-compatible formats
- Implementing custom logic for chunking, transforming, or filtering data

Below is an example of a custom readable stream. We extend the `Readable` class and implement the `_read()` method:

```js :collapsed-lines
const { Readable } = require('stream');

// 1. Extend the Readable class
class HelloWorldStream extends Readable {
  // 2. Implement the _read() method
  _read(size) {
    // Push data incrementally
    this.push('Hello, ');  // First chunk
    this.push('world!');   // Second chunk

    // Signal end of data by pushing `null`
    this.push(null); 
  }
}

// 3. Instantiate and consume the stream
const helloWorld = new HelloWorldStream();
helloWorld.on('data', (chunk) => {
  console.log('Received chunk:', chunk.toString());
});
//
// Output:
// Received chunk: Hello, 
// Received chunk: world!
```

As the code above shows, we can control how data is generated and chunked using the custom readable stream.

### Events in Node.js readable streams

Readable streams in Node.js are event-driven, allowing us to handle key stages of the data lifecycle. By listening to specific events, we can process data chunks, react to errors, and detect when the stream has completed or closed.

Key events in a readable stream include:

- `data`: Emitted when a chunk of data is available to be read
- `readable`: Emitted when data is available to be read
- `end`: Emitted when there is no more data to be read
- `error`: Emitted if an error occurs (e.g., file not found or permission issues)
- `close`: Emitted when the stream and any underlying resources are closed

In the following example, we set up event listeners to read a file, log the chunks, handle potential errors, and log a message upon completion and stream closure:

```js :collapsed-lines
const fs = require('fs');
const inputFilePath = 'example.txt';
// Create a readable stream
const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf-8' });

// Listen for 'data' events to process chunks
readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk);
});

// Listen for 'end' to detect when reading is complete
readStream.on('end', () => {
  console.log('Finished reading the file.');
});

// Listen for 'error' to handle failures
readStream.on('error', (err) => {
  console.error('An error occurred:', err.message);
});

// Listen for 'close' to perform cleanup
readStream.on('close', () => {
  console.log('Stream has been closed.');
});
```

### Flowing vs. Paused mode in readable streams

Readable streams operate in two modes: flowing and paused, offering a balance between control and performance, giving developers fine-grained control over data consumption:

| Mode | Behavior | Use case |
| ---: | --- | --- |
| **Flowing** | Data is read as fast as possible, emitting data events | Continuous processing |
| **Paused** | Data must be explicitly read using .read() | Precise control over data flow |

Here’s an example of transitions between these two modes:

```js :collapsed-lines
const fs = require("fs");

// Create a readable stream from a file
const readStream = fs.createReadStream("input.txt", { encoding: "utf-8" });

// Starts in paused mode
console.log(readStream.isPaused()); // true

// Switch to flowing mode
readStream.on('data', (chunk) => { 
  console.log('Auto-received:', chunk); 
});
console.log(readStream.isPaused()); // false

// Return to paused mode
readStream.pause(); 

// Manually pull data in paused mode
readStream.on('readable', () => {
  let chunk;
  while ((chunk = readStream.read()) !== null) {
    console.log('Manually read:', chunk);
  }
});

// Switch back to flowing mode
readStream.resume();
```

This dynamic switching between paused and flowing modes provides flexibility. Use paused mode when we need precise control over data consumption (e.g., batch operations), and flowing mode for continuous processing (e.g., live data feeds).

---

## Stream error handling

Robust error handling is essential when working with Node.js streams because they can fail due to missing files, permission errors, network interruptions, or corrupted data.

Since streams inherit from `EventEmitter`, they emit an `'error'` event when something goes wrong. Proper error handling involves listening to the `'error'` event and implementing appropriate recovery strategies.

General steps for error handling in streams:

1. **Listen for `'error'` events**: Attach an event listener to the readable stream to catch errors
2. **Determine the appropriate action**: Decide how to handle the error. Options include logging the error, attempting a retry (if applicable), or closing the stream
3. **Clean up resources**: Close the stream and release any associated resources to prevent leaks

```js :collapsed-lines
const fs = require('fs');
const readableStream = fs.createReadStream('example.txt', 'utf-8');

// Listen for 'error' events
readableStream.on('error', (err) => {
  console.error('Stream error:', err.message);

  // Clean up resources
  readableStream.destroy(); // Close the stream and release resources
});

// Optionally, pass an error to destroy() to emit an 'error' event
// readableStream.destroy(new Error('Custom error message'));
```

### Using `destroy()` for cleanup

The `destroy()` method is the recommended approach to close a stream and release its resources. It ensures the stream is immediately closed and underlying resources are being released.

You can optionally pass an error to `destroy()`:

```js
readableStream.destroy(new Error('Stream terminated due to an issue.'));
```

This will subsequently emit an `'error'` event on the stream, which can be useful for resource cleanup and signaling an unexpected termination.

### Recover gracefully from errors

In real-world applications, transient issues like network glitches or temporary file locks can cause stream errors. Instead of failing immediately, implementing a retry mechanism can help recover gracefully. Below is an example of how to add retry logic to a readable stream:

```js :collapsed-lines
const fs = require('fs');

function createReadStreamWithRetry(filePath, retries = 3) {
  let attempts = 0;

  function attemptRead() {
    const readableStream = fs.createReadStream(filePath, 'utf8');

    // Handle data chunks
    readableStream.on('data', (chunk) => {
      console.log(`Received chunk: ${chunk}`);
    });

    // Handle successful completion
    readableStream.on('end', () => {
      console.log('File reading completed successfully.');
    });

    // Handle errors
    readableStream.on('error', (err) => {
      attempts++;
      console.error(`Attempt ${attempts} failed:`, err.message);

      if (attempts < retries) {
        console.log(`Retrying... (${retries - attempts} attempts left)`);
        attemptRead(); // Retry reading the file
      } else {
        console.error('Max retries reached. Giving up.');
        readableStream.destroy(); // Close the stream and release resources
      }
    });
  }

  attemptRead(); // Start the first attempt
}

// Usage
createReadStreamWithRetry('./example.txt', 3); // File exists
createReadStreamWithRetry('./fileNotExists.txt', 3); // File does not exist
```

The above function `createReadStreamWithRetry` reads a file using a Node.js readable stream and incorporates a retry mechanism to handle potential errors during file access. If an error occurs, it retries reading the file a specified number of times before closing the stream.

By implementing a retry mechanism, we can make our application more reliable and stable.

---

## Composable streams: Building modular data pipelines

Streams aren’t just for handling large data flows, they’re also a way to create modular, reusable code. Think of them as LEGO bricks for data workflow: small components that snap together to create powerful pipelines. Each stream handles a single responsibility, making our code easier to debug, test, and extend.

Here is an example that reads a file, transforms its content, compresses it, and writes the result — all in a memory-efficient stream:

```js :collapsed-lines
const fs = require('fs');
const zlib = require('zlib');
const { Transform } = require('stream');

// 1. Create stream components
const readStream = fs.createReadStream('input.txt');      // Source: Read file
const writeStream = fs.createWriteStream('output.txt.gz');// Destination: Write compressed file

// 2. Transform stream: Convert text to uppercase
const upperCaseTransform = new Transform({
  transform(chunk, _, callback) {
    this.push(chunk.toString().toUpperCase()); // Modify data
    callback();
  }
});

// 3. Compression stream: Gzip the data
const gzip = zlib.createGzip();

// 4. Assemble the pipeline
readStream
  .pipe(upperCaseTransform)  // Step 1: Transform text
  .pipe(gzip)                // Step 2: Compress data
  .pipe(writeStream);        // Step 3: Write output
```

This chain of stream operations, connected by pipes, showcases how simple, reusable components can be combined to build complex data processing pipelines. This is just a taste of what you can achieve with streams. The possibilities are endless.

### Handle errors in the pipeline

When using chained `.pipe()` calls, errors in intermediate streams (like `gzip` or `upperCaseTransform`) won’t propagate to the final destination stream’s error handler. This can lead to uncaught exceptions, resource leaks, and application crashes. Let’s explore the problem and solutions in detail.

Here’s an example of a flawed implementation that misses intermediate errors:

```js :collapsed-lines
const fs = require('fs');
const zlib = require('zlib');
const { Transform } = require("stream");

const readStream = fs.createReadStream('input.txt');
const destination = fs.createWriteStream('output.txt.gz');
const gzip = zlib.createGzip();
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

// Flawed implementation - misses intermediate errors
readStream
  .pipe(upperCaseTransform)
  .pipe(gzip)
  .pipe(destination)
  .on('error', (err) => { // Only catches destination errors
    console.error('Pipeline failed:', err);
    destination.close();
  })
  .on('finish', () => {
    console.log('Pipeline succeeded!');
  });
```

This approach fails because errors in intermediate streams like `upperCaseTransform` or `gzip` won’t propagate to the final `.on('error')` handler. The unhandled errors could crash the entire Node.js process. Furthermore, resources like file descriptors or memory buffers might not be properly released without explicit error handling.

To fix the issue, we can attach individual error handlers to every stream:

```js :collapsed-lines
// Proper error handling
readStream
  .on('error', (err) => {
    console.error('Read error:', err);
    readStream.close();
  })
  .pipe(upperCaseTransform)
  .on('error', (err) => {
    console.error('Transform error:', err);
    upperCaseTransform.destroy();
  })
  .pipe(gzip)
  .on('error', (err) => {
    console.error('Gzip error:', err);
    gzip.destroy();
  })
  .pipe(destination)
  .on('error', (err) => {
    console.error('Write error:', err);
    destination.close();
  })
  .on('finish', () => {
    console.log('Pipeline succeeded!');
  });
```

The above code will handle errors for each stream, but the repetitive error handlers are not ideal.

A cleaner approach is to use the `pipeline` method. It automatically propagates errors from any stream to a single error handler and ensures proper cleanup:

```js :collapsed-lines
const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');

// 1. Create stream components
const source = fs.createReadStream('input.txt');
const gzip = zlib.createGzip();
const destination = fs.createWriteStream('output.txt.gz');

// 2. Connect streams using pipeline
pipeline(
  source,      // Read from file
  gzip,        // Compress data
  destination, // Write to archive
  (err) => {   // Unified error handler
    if (err) {
      console.error('Pipeline failed:', err);
      // Optional: Add retry logic here
    } else {
      console.log('Compression successful!');
    }
  }
);
```

In the above example, errors in any stream (`source`, `gzip`, or `destination`) are passed to the error-handling callback function. We ensure streams are closed even on failure, and avoid repeated error handlers.

---

## Conclusion

Node.js readable streams are more than just a tool — they’re a core pattern for building efficient, scalable applications.

In this guide, we explored how readable streams process data in small chunks, manage data flow with paused/flowing modes, handle errors, and ensure resource cleanup. We also discussed chaining, transforming, and piping streams like modular components. Whether parsing terabytes of logs or streaming live sensor data, readable streams provide an efficient way to handle data.

The code snippets in the article can be found [here (<VPIcon icon="iconfont icon-github"/>`sunnyy02/node_readableStreams`)](https://github.com/sunnyy02/node_readableStreams). For more details and best practices, refer to the [<VPIcon icon="fa-brands fa-node"/>Node.js Stream API documentation](https://nodejs.org/api/stream.html).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A guide to Node.js readable streams",
  "desc": "Explore how Node.js readable streams process data in small chunks, manage data flow, handle errors, and ensure resource cleanup.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/guide-node-js-readable-streams.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
