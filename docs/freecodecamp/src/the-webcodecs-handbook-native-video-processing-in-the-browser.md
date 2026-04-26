---
lang: en-US
title: "The WebCodecs Handbook: Native Video Processing in the Browser"
description: "Article(s) > The WebCodecs Handbook: Native Video Processing in the Browser"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The WebCodecs Handbook: Native Video Processing in the Browser"
    - property: og:description
      content: "The WebCodecs Handbook: Native Video Processing in the Browser"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-webcodecs-handbook-native-video-processing-in-the-browser.html
prev: /programming/js-node/articles/README.md
date: 2026-04-09
isOriginal: false
author:
  - name: Sam Bhattacharyya
    url: https://freecodecamp.org/news/author/sb2702/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9b0978d4-7d8c-464c-ade0-07d007f56d92.png
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
  name="The WebCodecs Handbook: Native Video Processing in the Browser"
  desc="If you've ever tried to process video in the browser, like for a video editing or streaming app, your options were either to process video on a server (expensive) or to use ffmpeg.js (clunky). With th"
  url="https://freecodecamp.org/news/the-webcodecs-handbook-native-video-processing-in-the-browser"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9b0978d4-7d8c-464c-ade0-07d007f56d92.png"/>

If you've ever tried to process video in the browser, like for a video editing or streaming app, your options were either to process video on a server (expensive) or to use ffmpeg.js (clunky). With the WebCodecs API, there's now a better way to do this.

WebCodecs is a relatively new API that allows browser applications to process video efficiently with very low-level control.

In the past, if you wanted to build, say, a video-editing app or live-streaming studio or anything that required 'heavy lifting', you needed to build a native desktop application. Many SaaS tools like Canva got around this with server-side video processing, which provided a much better UX, but which is much more complex and expensive.

With WebCodecs, it's now possible to build these apps entirely in the browser, without requiring users to download and install software, and without expensive, complex server infrastructure.

This isn't theoretical. Video Editing tools like Capcut saw an 83% boost in traffic after switching to WebCodecs + WebAssembly[^1]. Utility apps like [<VPIcon icon="fas fa-globe"/>Remotion Convert](https://remotion.dev/convert) and [<VPIcon icon="fas fa-globe"/>Free AI Video Upscaler](https://free.upscaler.video/) (both open source) process thousands of videos a day with zero server costs and no installation required [^2].

[^1]: https://web.dev/case-studies/capcut?hl=en
[^2]: https://web.dev/case-studies/ai-video-upscaler-case-study

![Remotion Convert](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/73f19be2-b746-421c-888f-7431962520d7.png)

WebCodecs is even being used for entirely new use cases, like generating videos programatically [^3].

[^3]: https://github.com/remotion-dev/remotion

If you're building any kind of video app, it's worthwhile to at least know about WebCodecs as an option for working with video in the browser.

In this guide, we will:

1. Review the basics of Video Processing
2. Introduce the WebCodecs API
3. Discuss Muxing + Demuxing to read and write video files
4. Build our own video conversion utility to convert videos between webm + mp4, and apply basic transformations
5. Cover some production-level concerns
6. Discuss additional resources

The goal of this article is to be a practical entry point and introduction to the [<VPIcon icon="fa-brands fa-firefox"/>WebCodecs API](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API) for frontend developers. It'll teach you how the API works and what you can do with it. I'll assume you know the basics of Javascript but you don't need to be a senior developer or a video engineer to follow along.

At the end, I'll mention additional learning resources and references. In future tutorials, I'll go more in-depth on specific topics like building a video editor, or doing live-streaming with WebCodecs. But this handbook should provide a solid starting point for what WebCodecs is, what it can do, and how to build a basic application with it.

::: note Prerequisites

You don't need to be a video engineer to follow along, but you should be comfortable with:

- Core JavaScript, including async/await and callbacks
- Basic browser APIs like fetch and the DOM
- What a File object is and how file inputs work in HTML
- A general sense of what HTML5 is (we'll use it briefly, but won't go deep)

No prior knowledge of video processing, codecs, or media APIs is required — that's what the first half of this handbook covers.

:::

---

## Primer on Video Processing

Hold your bunnies, because before getting into WebCodecs, I want to make sure you're aware of what codecs are before we even consider putting codecs on the web.

### Video Frames

I presume you know what a video is. Ironically the 'video' below is actually a gif, but you get the idea.

![Big Buck Bunny, an opensource video](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/0e95c1f7-d384-4065-bba9-4dade19ce6f8.gif)

Videos are just a series of images, shown one after the other, in quick succession. Each image is called a *Video Frame*, and each frame is associated with a timestamp. When a video player plays back the video, it displays each video frame at the time indicated by the timestamp.

![Video Frames](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/26f534e8-f828-41ec-9bcd-de059916f528.png)

Every frame in the video is made of pixels, with a 4K video frame containing approximately 8 million pixels ($3840\times2160=8294400$).

![VideoFrames have pixels](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/2c73397d-2d9f-4091-8b32-fa7a5dac115f.png)

Each pixel itself is actually made of 3 components: a Red, Green, and Blue value (also called RGB value).

![RGB Channels](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/2fc2b555-265b-4d6a-8670-981e197c6566.svg)

Each of of the R, G and B color values is stored as an 8-bit integer, ranging from 0 to 255, with the number indicating the intensity of the red, green, or blue color component.

![uint8 color channel](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/d9d7ae0b-e67b-4cbb-b21a-867108cd3303.png)

Combining the intensity of each of the R, G, and B components lets you represent any arbitrary color on the color spectrum:

![RGB Color value examples](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/adbeb63b-20b8-4ddb-9b7f-83c88f86e09d.png)

So for each pixel, we need 3 bytes of data: 1 byte for each of the R, G, and B color values (1 byte = 8 bits). A 4K video frame therefore would contain ~25 Megabytes of data.

![RGB Channnels](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/2fc2b555-265b-4d6a-8670-981e197c6566.svg)

At 30 frames per second (a typical frame rate), a 1 hour, 4K video would be around **746 Gigabytes of data**. If you've ever downloaded a large video or recorded HD video with your phone camera, you'll know that video files can be large, but they're never *that* large.

In reality, actual video files you might watch on YouTube, record on your phone camera, or download from the internet are ~100x smaller than that. The reason actual video files are much smaller is because of *video compression*, a family of very sophisticated algorithms that help reduce the data by ~100x.

Without this video compression, you wouldn't be able to record more than 10 minutes of video on the latest high-end smartphones, and you wouldn't be able to stream anything HD on a high-end home internet connection.

As sophisticated as our modern devices and internet connections are, without aggressive video compression, we wouldn't be able to watch, record, or stream anything in HD.

### Codecs

A *codec* is a fancy word for a video compression algorithm. There are a few established codecs / compression algorithms, such as:

- `h264`: The most common codec. If you see an mp4 file, it most likely uses the h264 codec.
- `vp9`: An open source codec used commonly by YouTube and in video conferencing, often found in webm files.
- `av1`: A new open source codec, increasingly being used by platforms like YouTube and Netflix.

How these algorithms work is too complex and out of scope for this handbook. But at a very high level, here are some major ways these algorithms compress video:

#### Removing detail

All these algorithms use a technique called the Discrete Cosine Transform to "remove details". As you remove "detail" from the video frame, the frame starts looking "blockier". This technique is so effective, though, that you can compress a video frame by ~10x before the differences start becoming visible to the human eye.

For the curious, you can see [<VPIcon icon="fa-brands fa-youtube"/>this video](https://youtu.be/n_uNPbdenRs) by Computerphile on how the DCT algorithm works.

![DCT algorithm removing details](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/f2b3eac4-c36a-4943-a176-4f2af72cfbac.png)

#### Encoding frame differences

When you actually look at a sequence of video frames, you'll notice that visually they're quite similar, with only small portions of the video changing, depending on how much movement there is.

These codecs/compression algorithms use sophisticated math and computer vision techniques to encode just the differences between frames,.

![Frame Differences](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/40d309dd-84fc-4018-8da4-1438bbfb8df6.png)

You therefore only need to send the first frame (a *Key Frame*) – then for subsequent frames you can send the "frame differences", also called *Delta Frames*, to reconstruct the each full frame.

![Key Frames vs Delta frames](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/66bbe03f-c394-477d-a3c2-64b571c39348.png)

In practice, for an hour long video, we don't just encode the first frame and store millions of delta frames. Instead, algorithms encode every 60th frame or so as a Key Frame, and then the next 59 frames are delta frames.

This technique is also highly effective, reducing data used by another ~10x. The distinction between *Key Frames* and *Delta Frames* is one of the few bits of "how these algorithms work" that you actually need to be aware of.

There's a number of other details and compression techniques that go into these compression algorithms that are out of scope for an intro article.

### Encoding & Decoding

For video compression to work, we need to be able to both compress video (turn raw video into compressed binary data) and then decompress video (turn the compressed binary data back into raw video frames).

Turning raw video frames into compressed binary data is called *encoding*, and turning compressed binary data back into raw video frames is called *decoding.* The word *codec* is just an abbreviation for "encode decode".

![VideoEncoder and VideoDecoder](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/843e75e0-4453-4e3e-91d5-a441f1a8e2ff.png)

From a practical, developer perspective, you don't need to know how these codecs work, but you do need to know that:

1. There are different video codecs, like `h264`, `vp9`, and `av1`
2. When you encode a video with a codec (like `h264`), you need a video player that can support the same codec to play back the video.
3. Encoding video takes a lot more computation than decoding video, so playing 4K video on a low-end phone is fine, but encoding 4K video on it would be super slow.
4. Most consumer devices (phones, laptops) have specialized chips designed specifically for encoding and decoding video, making encoding/decoding much faster than if run on the CPU like a normal software program. This is called *hardware acceleration.*

In practice, there are only a handful of video codecs, because the entire world needs to agree on standards, so that video recorded on an iPhone can be played back on a windows device.

### Containers

Most people haven't heard of `h264` or `vp9`. When you think of video files, you typically think of file formats like MP4 or MKV. These are also relevant, but they're a separate thing called containers.

A video file typically has encoded audio, encoded video, and metadata about the video file. A file format like MP4 describes a specific format for storing the encoded audio and video data, as well as the metadata.

![Video Container](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/961e7177-e331-4aa2-acdc-9d6732f18c56.png)

Video compression software stores the encoded audio/video and metadata into a file according to the file format / specs. This is called *muxing.*

Likewise, video players follow the file format specs to read the metadata and find the encoded audio/video. This is called *demuxing*.

When compressing a video file, you need to both *encode* it and *mux* it (in that order). These are two separate stages of the process. Likewise, when playing a video file, you need to both *demux* it and then *decode* it (in that order).

When a video player opens, say, an mp4 file, the logic flow is as follows:

- Ok, the file ends in .mp4, so it must be an mp4 file. Let me load the library for parsing mp4 files, and parse then parse file.
- Great, I've parsed the mp4 file, I now have the metadata and know where in the byte offsets are to fetch the encoded audio and video.
- I'll start fetching the first encoded video frames, decode them, and start displaying the decoded video frame to the user.

If you ever see a "video file is corrupt" message from a video player, it's likely that the video file doesn't follow the file format spec and there was an error while trying the parse / demux the video.

---

## What is WebCodecs?

Now that we've covered codecs, let's put them on the Web.

![WebCodecs = Web + Codecs](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/3fc9d220-f397-479a-9517-6b8dc94aaa6b.png)

WebCodecs is an API that allows frontend developers to encode and decode video in the browser efficiently (using hardware acceleration), and with very low level control (encode/decode on a frame by frame basis).

The hardware acceleration bit is important, as you can't just poly fill or re-implement the API yourself. WebCodecs gives direct access to specialized hardware for encoding/decoding, making it as performant as a desktop video app.

### Before WebCodecs

It's worth taking a moment to understand why WebCodecs exists. Before the WebCodecs API existed, there were several alternatives you could use for video operations in the browser.

- [<VPIcon icon="fa-brands fa-firefox"/>HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement): You can still create a element and use it for decoding a video. It's easy to use, but you lack frame level control. Your only control is setting the 'video.currrentTime' property and waiting for it to seek, often leading to dropped/missing frames.
- [<VPIcon icon="fa-brands fa-firefox"/>Media Recorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder): Essentially allows you to 'screen record' any canvas element or video stream. While it works, it's functionally equivalent to screen recording Adobe Premeire pro instead of clicking render. For editing scenarios, you lose frame level control and can only process video at real-time speed.
- [<VPIcon icon="iconfont icon-github"/>`Kagami/ffmpeg.js`](https://github.com/Kagami/ffmpeg.js/): A port of the popular video processing tool ffmpeg, which runs ffmpeg in the browser. Many tools used this in the past, but it lacks hardware acceleration, making it much slower than WebCodecs. It also has file size restrictions stemming from the fact that it runs in WebAssembly, making it difficult to work with videos that are larger than 100 MB.

WebCodecs was built and released in 2021 to enable low-level, hardware accelerated video decoding and encoding. It's great for high-performance streaming and video editing, which were use cases not well-served by the existing APIs.

### Core API

The core API for WebCodecs consists of two new "data types", the *VideoFrame* and *EncodedVideoChunk*, as well as the *VideoEncoder* and *VideoDecoder* interfaces.

#### VideoFrame

The Javascript *VideoFrame* object conceptually contains both pixel data and metadata about the video frame.

![VideoFrame object](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/bd341249-fab6-4c76-85b4-dd21d8de10f6.svg)

You can actually create a new *VideoFrame* object from any image source, as long as you include the metadata:

```js
const bitmapFrame = new VideoFrame(imgBitmap, {timestamp: 0});
const imageFrame = new VideoFrame(htmlImageEl, {timestamp: 0});
const videoFrame = new VideoFrame(htmlVideoEl, {timestamp: 0});
const canvasFrame = new VideoFrame(canvasEl, {timestamp: 0});
```

For a video editing app, for example, you would typically perform image editing operations on each frame on a canvas, and then you would grab each *VideoFrame* from the canvas.

You can also draw a *VideoFrame* to a canvas using the [<VPIcon icon="fa-brands fa-firefox"/>Canvas 2D rendering context](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D):

```ts
ctx.drawImage(frame, 0, 0);
```

You would typically do this when rendering / playing back a video in the browser.

#### EncodedVideoChunk

An *EncodedVideoChunk* is just the compressed version of a *VideoFrame,* containing the binary data as well as the same metadata as the frame.

![EncodedVideoChunk](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/d20b9306-03ae-48a8-b10a-f462f4a620e2.svg)

You would typically get *EncodedVideoChunks* from a library which extracts them from a *File* object.

```ts
import { getVideoChunks } from 'webcodecs-utils'

const chunks = <EncodedVideoChunk[]> await getVideoChunks(<File> file);
```

Alternatively, it's the output you get from a *VideoEncoder* object.

There's not much useful stuff you can do with *EncodedVideoChunks* – it's just the binary data that you read from files, write to files, or stream over the internet.

![Video streaming with encode and decode](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/c5778116-44ec-4fb7-8f35-6ebd2f2a8d15.gif)

The value in *EncodedVideoChunk* is that it's ~100x smaller than raw video data, which is why you'd send *EncodedVideoChunks* instead of raw video when streaming (and writing to a file).

#### VideoEncoder

A *VideoEncoder* turns *VideoFrame* objects into *EncodedVideoChunk* objects.

![VideoEncoder](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/612a6f6a-04c6-4f24-aebd-074f232cd06e.svg)

The core API looks something like this, where you define the callback where the *VideoEncoder* returns *EncodedVideoChunk* objects.

```ts
const encoder = new VideoEncoder({
  output: function(chunk: EncodedVideoChunk, meta: any) {
    // Do something with the chunk
  },
  error: function(e: any)=> console.warn(e);
});
```

Keep in mind that this is an async process, and not even a typical async process. You can't just treat this as a per-frame operation.

```js
// Does not work like this
const frame  = await encoder.encode(chunk);
```

This is because of how video encoding actually works under the hood. So you have to accept that the outputs are returned via callback, and you get the outputs when you get them.

Once you define your encoder, you can then configure the *VideoEncoder* with your choice of codec (we'll get to this), as well as other parameters like width, height, framerate and bitrate.

```ts
encoder.configure({
  'codec': 'vp9.00.10.08.00', // We'll get to this
  width: 1280,
  height: 720,
  bitrate: 1000000 //1 MBPS,
  framerate: 25
});
```

You can then start encoding frames. Here we assume we already have *VideoFrame* objects, and we make every 60th frame a *Key Frame*.

```ts
for (let i=0; i < frames.length; frames++){
  encoder.encode(frames[i], {keyFrame: i%60 ==0})
}
```

#### VideoDecoder

The Video Decoder does the reverse, turning *EncodedVideoChunk* objects into *VideoFrame* objects.

![VideoDecoder](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/47258dd5-0a7b-479a-8729-6f384ff8bc4b.svg)

Here's a simplified example of how to set up the *VideoDecoder.* First, extract the *EncodedVideoChunk* objects and the decoder config from the video file. Here, we don't choose the config – the config was chosen by whoever encoded the file. When decoding, we extract the config from the file.

```ts
import { demuxVideo } from 'webcodecs-utils';

const { chunks, config } = await demuxVideo(<File> file);
```

Next, we set up the *VideoDecoder* by specifying the callback when *VideoFrame* objects are generated, and we configure it with the config.

```ts
const decoder = new VideoDecoder({
  output: function(frame: VideoFrame){
    //do something with the VideoFrame
  },
  error: function(e: any)=> console.warn(e);
});

decoder.configure(config)
```

Again, like with *VideoEncoder*, it returns frames in a callback. Finally we can start decoding chunks.

```ts
for (const chunk of chunks){
  decoder.decode(chunk);
}
```

#### Putting it all together

At its core, the WebCodecs API is just the two data types (*EncodedVideoChunk, VideoFrame)* and the *VideoEncoder* and *VideoDecoder* interfaces which convert between the two data types.

![The core of WebCodecs](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/444553ad-58af-4b0e-ba46-d8910d3d548b.svg)

Keep in mind that the WebCodecs API doesn't actually work with video files. It only applies the encoding and decoding, and *EncodedVideoChunk* objects just represent binary data.

Reading video files and writing video files are their own, separate thing called muxing/demuxing.

---

## Muxing and Demuxing

To write to a video file, you'll also need to *mux* the video. And to play a video file, you need to *demux* the video. This involves following the file format of the video container, parsing the video file (in the case of demuxing), or placing encoded video data in the right place in the file you are writing to (muxing).

Muxing and Demuxing are not included in the WebCodecs API, so you'll need to use a separate library to handle muxing and demuxing.

### Demuxing

To play a video back in the browser, we need to both *demux* the video and *decode* the video, in that order.

![Demuxing and decoding](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/6e0459e9-f960-43dd-a1e3-a214091c439e.png)

There are several libraries you can use to demux videos, including [<VPIcon icon="fas fa-globe"/>MediaBunny](http://mediabunny.dev/) or [<VPIcon icon="iconfont icon-github"/>`bilibili/web-demuxer`](https://github.com/bilibili/web-demuxer). For the purposes of this tutorial, I put a very simplified wrapper around these libraries and exposed it in the [<VPIcon icon="fa-brands fa-npm"/>`webcodecs-utils`](https://npmjs.com/package/webcodecs-utils) package, so that demuxing is a very simple 2-liner:

```ts
import { demuxVideo } from 'webcodecs-utils'
const { chunks, config } = await demuxVideo(file);
```

This reads the entire video into memory, so don't do this in practice. But it's helpful in making a simple, readable hello world for WebCodecs.

The following snippet will take in a video file (*File* object), decode it, and paint the result to a canvas. Here, we get the frames from the output callback, and run the draw calls directly from the callback.

```ts
import { demuxVideo } from 'webcodecs-utils'

async function playFile(file: File) {

  const { chunks, config } = await demuxVideo(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const decoder = new VideoDecoder({
    output(frame: VideoFrame) {
      ctx.drawImage(frame, 0, 0);
      frame.close()
    },
    error(e) {}
  });


  decoder.configure(config);

  for (const chunk of chunks) {
    decoder.decode(chunk)
  }
}
```

Here's our super barebones demo for playing back an actual video:

<CodePen
  user="Sam-Bhattacharyya"
  slug-hash="OPRErmj"
  title="Basic Decoding Demo"
  :default-tab="['css','result']"
  :theme="dark"/>

For a more 'correct' demuxing example, here is what demuxing looks like with MediaBunny, where you can extract chunks in an iterative fashion.

```js
import { EncodedPacketSink, Input, ALL_FORMATS, BlobSource } from 'mediabunny';

const input = new Input({
  formats: ALL_FORMATS,
  source: new BlobSource(<File> file),
});

const videoTrack = await input.getPrimaryVideoTrack();
const sink = new EncodedPacketSink(videoTrack);

for await (const packet of sink.packets()) {
  const chunk = <EncodedVideoChunk> packet.toEncodedVideoChunk();
}
```

### Muxing

To write a video file, you not only need to encode it (with the *VideoEncoder*) you also need to *mux* it. This involves taking the encoded chunks and placing them in the right place in the output binary file that you're writing to.

![Muxing and Encoding](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/176ef792-e761-46d5-badf-58fd08d78552.png)

Again, you need a library to mux videos ( [<VPIcon icon="fas fa-globe"/>MediaBunny](http://mediabunny.dev/)), but for demo purposes I created a super simple wrapper. Here we define a super basic ExampleMuxer.

```ts
import { ExampleMuxer } from 'webcodecs-utils'

const muxer = new ExampleMuxer('video');

for (const chunk of encodedChunks){
  muxer.addChunk(chunk);
}

const outputBlob = await muxer.finish();
```

As a full encoding + muxing demo, we'll create an encoder, and we'll set it to mux the output encoded chunks as soon as they are returned.

```ts
const encoder = new VideoEncoder({
  output: function(chunk, meta){
    muxer.addChunk(chunk, meta);
  },
  error: function(e){}
})

encoder.configure({
  'codec': 'avc1.4d0034', // We'll get to this
  width: 1280,
  height: 720,
  bitrate: 1000000 //1 MBPS,
  framerate: 25
});
```

We'll then define a canvas animation, which will draw the current frame number to the screen, just to prove it's working.

```ts
const canvas = new OffscreenCanvas(640, 360);
const ctx = canvas.getContext('2d');
const TOTAL_FRAMES=300;
let frameNumber = 0;
let chunksMuxed = 0;
const fps = 30;


function renderFrame() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.font = `bold ${Math.min(canvas.width / 10, 72)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`Frame ${frameNumber}`, canvas.width / 2, canvas.height / 2);
}
```

Finally we'll create the encode loop, which will draw the current frame, and then encode it.

```ts

let flushed = false;

async function encodeLoop() {
  renderFrame();

  const frame = new VideoFrame(canvas, {timestamp: frameNumber/fps*1e6});
  encoder.encode(frame, {keyFrame: frameNumber %60 ===0});
  frame.close();

  frameNumber++;

  if (frameNumber === TOTAL_FRAMES) {
    if (!flushed) encoder.flush();
  }
  else return requestAnimationFrame(encodeLoop);
}
```

Putting it all together, you can encode the canvas animation to a video file with frame-level accuracy.

<CodePen
  user="Sam-Bhattacharyya"
  slug-hash="KwgebEJ"
  title="Encoding and Muxing Demo"
  :default-tab="['css','result']"
  :theme="dark"/>

You can download the video and use any video inspection tool to verify that every single frame number is included.

![Videos with frame level accuracy](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/776d6db5-f67c-4538-8e7d-f61e35e698ce.png)

This is one of the critical distinctions that separates this from other web APIs like [<VPIcon icon="fa-brands fa-firefox"/>MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) which can also encode video, but has no frame-level accuracy. WebCodecs makes sure that you can control and guarantee the consistency of each frame.

Finally, a proper full, muxing example using MediaBunny would look like this:

```ts
import {
  EncodedPacket,
  EncodedVideoPacketSource,
  BufferTarget,
  Mp4OutputFormat,
  Output
} from 'mediabunny';

async function muxChunks(chunks: EncodedVideoChunk[]): Promise <Blob>{

  const output = new Output({
    format: new Mp4OutputFormat(),
    target: new BufferTarget(),
  });

  const source = new EncodedVideoPacketSource('avc');
  output.addVideoTrack(source);

  await output.start();

  for (const chunk of chunks){
    source.add(EncodedPacket.fromEncodedChunk(chunk))
  }

  await output.finalize();
  const buffer = <ArrayBuffer> output.target.buffer;
  return new Blob([buffer], { type: 'video/mp4' });

});
```

---

## Building a Video Converter Utility

Now that we've covered the basics of WebCodecs as well as Muxing, we'll move towards actually building an MVP of something useful: a video converter utility. We'll be able to use it to convert between mp4 and webm, and do some basic operations like resizing and flipping the video.

### Transcoding

Before we do resizing and flipping, let's first handle a basic conversion decoding a video, and encoding the video to a new format. This is called transcoding.

To transcode video, we need to set up a pipeline with the following processes:

- **Demuxing**: Read *EncodedVideoChunks* from a video file
- **Decoding**: Convert *EncodedVideoChunks* to *VideoFrames*
- **Encoding**: Convert *VideoFrames* to new *EncodedVideoChunks*
- **Muxing**: Write the *EncodedVideoChunks* to a new video file

Our pipeline looks something like this:

![Transcoding pipeline](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/f06e8516-5498-44bd-9e68-e048afb303e9.png)

Using everything we've covered in this article up until now, we could build a full working demo with just *VideoEncoder* and *VideoDecoder* as discussed. But then state management and tracking frames becomes complicated and error prone.

We're going to add one more abstraction, using the [<VPIcon icon="fa-brands fa-firefox"/>Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API), which will make our pipeline look like the below. It ties directly to our mental model of our pipeline and simplifies a ton of details like state management.

```js
const transcodePipeline = demuxerReader
  .pipeThrough(new VideoDecoderStream(videoDecoderConfig))
  .pipeThrough(new VideoEncoderStream(videoEncoderConfig))
  .pipeTo(createMuxerWriter(muxer));

await transcodePipeline;
```

To do this, we'll create a TransformStream for the *VideoDecoder* and *VideoEncoder.*

```ts
class VideoDecoderStream extends TransformStream<{ chunk: EncodedVideoChunk; index: number }, { frame: VideoFrame; index: number }> {
  constructor(config: VideoDecoderConfig) {
    let pendingIndices: number[] = [];
    super(
      {
        start(controller) {
          decoder = new VideoDecoder({
            output: (frame) => {
              const index = pendingIndices.shift()!;
              controller.enqueue({ frame, index });
            },
            error: (e) => controller.error(e),
          });

          decoder.configure(config);
        },

        async transform(item, controller) {
          pendingIndices.push(item.index);
          decoder.decode(item.chunk);
        },

        async flush(controller) {
          await decoder.flush();
          if decoder.state !== 'closed' decoder.close();
        },
      }
    );
  }
}
```

I won't bore you with the full code, but I've packaged these utilities in the webcodecs-utils package, which can be used as such:

```ts
import {
  SimpleDemuxer,
  VideoDecodeStream,
  VideoEncodeStream,
  SimpleMuxer,
} from "webcodecs-utils";
```

Our code for transcoding a file then becomes this:

```ts
const demuxer = new SimpleDemuxer(videoFile);
await demuxer.load();
const decoderConfig = await demuxer.getVideoDecoderConfig();

const encoderConfig = {/*Whatever we decide*/};

// Set up muxer
const muxer = new SimpleMuxer({ video: "avc" });

// Build the upscaling pipeline
await demuxer.videoStream()
  .pipeThrough(new VideoDecodeStream(decoderConfig))
  .pipeThrough(new VideoEncodeStream(encoderConfig))
  .pipeTo(muxer.videoSink());

// Get output
const blob = await muxer.finalize();
```

For this intermediate demo, just to actually get transcoding to work, we'll download a [<VPIcon icon="fas fa-globe"/>pre-built file](https://katana.video/files/hero-small.mp4), and we'll introduce a toggle to output an mp4 file (using `h264`) or a webm file (using `vp9`).

We'll use `avc1.4d0034` for h264 (most widely supported h264 codec string) and `vp09.00.40.08.00` for vp9 (most widely supported vp9 string).

Here's a basic transcoding demo on CodePen:

<CodePen
  user="Sam-Bhattacharyya"
  slug-hash="YPGvBgO"
  title="Transcoder Demo"
  :default-tab="['css','result']"
  :theme="dark"/>

### Transformations

If we want to do any kind of transformations to the video, like flips, crops, rotations, resizing, and so on, we can't just work with pure *VideoFrame* objects.

The simplest way to accomplish this would be to introduce a Canvas element, where we'll use a [<VPIcon icon="fa-brands fa-firefox"/>2d Canvas Context](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) to manipulate our source frame and draw that to a canvas.

```ts
const canvas = new OffscreenCanvas(width, height);
const ctx = canvas.getContext('2d');

// Very easy to do transformations
ctx.drawImage(sourceFrame, 0, 0);
```

We'll then use the Canvas as a source image for our output video frame.

```ts
const outFrame = new VideoFrame(canvas, {timestamp: sourceFrame.timestamp});
```

To apply a resize operation, we'll first set the canvas dimensions to our output height and width.

```ts
const canvas = new OffscreenCanvas(outputWidth, outputHeight);
const ctx = canvas.getContext('2d');

// Resize sourceFrame to fit output dimensions
ctx.drawImage(sourceFrame, 0, 0, outputWidth, outputHeight);
```

To apply a horizontal flip operation with canvas2d, we can do the following:

```ts
ctx.scale(-1, 1);
ctx.translate(-outputWidth, 0);
ctx.drawImage(sourceFrame, 0, 0, outputWidth, outputHeight);
```

You can create a full render function that applies these transformations which looks like this:

```ts
function render(videoFrame, outW, outH, flipped) {

  canvas.width  = outW;
  canvas.height = outH;

  if (flipped) {
    ctx.scale(-1, 1);
    ctx.translate(-outW, 0);
  }
  ctx.drawImage(videoFrame, 0, 0, outW, outH);

}
```

Here's an interactive demo of what these transformations look like:

<CodePen
  user="Sam-Bhattacharyya"
  slug-hash="WbGymNQ"
  title="Canvas Transformations"
  :default-tab="['css','result']"
  :theme="dark"/>

### Transform Pipeline

With these transformations, we need to adjust our pipeline to include a transformation step. It will take in a *VideoFrame*, apply the transforms, and return a transformed frame.

![Transcoding pipeline with transforms](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/0111f887-1f27-4436-a68e-ec91b2dd9959.svg)

In the webcodecs-utils package, there is a VideoProcessStream object for this purpose, which takes in an async function which takes in a *VideoFrame* and returns a *VideoFrame:*

```ts
import { VideoProcessStream} from "webcodecs-utils";
 
new VideoProcessStream(async (frame) => {
  // Apply transformations
  return procesedFrame;
}),
```

So to apply our transformations, we can set it up as so:

```ts
import { VideoProcessStream} from "webcodecs-utils";
 

const canvas = new OffscreenCanvas(outW, outH);
const ctx = canvas.getContext('2d');

const processStream = new VideoProcessStream(async (frame) => {
  
  if (flipped) {
    ctx.scale(-1, 1);
    ctx.translate(-outW, 0);
  }
  ctx.drawImage(frame, 0, 0, outW, outH);

  return new VideoFrame(canvas, {timestamp: frame.timestamp});

});
```

And then our full pipeline looks like this:

```ts
const demuxer = new SimpleDemuxer(videoFile);
await demuxer.load();
const decoderConfig = await demuxer.getVideoDecoderConfig();

const encoderConfig = {/*Whatever we decide*/};

// Set up muxer
const muxer = new SimpleMuxer({ video: "avc" });

// Build the upscaling pipeline
await demuxer.videoStream()
  .pipeThrough(new VideoDecodeStream(decoderConfig))
  .pipeThrough(processStream) // Just defined this
  .pipeThrough(new VideoEncodeStream(encoderConfig))
  .pipeTo(muxer.videoSink());

// Get output
const blob = await muxer.finalize();
```

Here's a full working demo with the process pipeline:

<CodePen
  user="Sam-Bhattacharyya"
  slug-hash="PwGaLPM"
  title="Transform pipeline"
  :default-tab="['css','result']"
  :theme="dark"/>

### Complete Demo

Now, for the complete tool, we'll make some key changes:

- You can upload your own video
- We'll preview the transformations by extracting a frame
- We'll add progress measurement

For the input, that's trivial:

```html
<input type="file" onchange="handler(event)" />
```

For frame previews, we could use WebCodecs to generate a preview, but because the preview doesn't need frame-level accuracy or high performance, it's easier to just use the HTML5 VideoElement to grab a video frame from the source file.

```js
async function getFirstFrame(file) {
  const video = document.createElement("video");
  video.src = URL.createObjectURL(file);
  video.muted = true;

  await new Promise((resolve) => video.addEventListener("loadeddata", resolve, { once: true }));
  video.currentTime = 0;
  await new Promise((resolve) => video.addEventListener("seeked", resolve, { once: true }));

  return new VideoFrame(video, {timestamp: 0});
}
```

Finally, we can calculate progress in the process function by using the frame timestamp / the video duration.

```ts
const {duration} = await demuxer.getMediaInfo();


const processStream = new VideoProcessStream(async (frame) => {
  
  if (flipped) {
    ctx.scale(-1, 1);
    ctx.translate(-outW, 0);
  }
  ctx.drawImage(frame, 0, 0, outW, outH);

   // Frame timestamps are in microseconds, duration in seconds
  const progress = frame.timestamp/(duration*1e6); 

  return new VideoFrame(canvas, {timestamp: frame.timestamp});

});
```

Putting this all together, we can finally put together a full working video converter utility:

<CodePen
  user="Sam-Bhattacharyya"
  slug-hash="WbGymaj"
  title="Full Converter Utility"
  :default-tab="['css','result']"
  :theme="dark"/>

And that's it! We've built an MVP of something actually useful with WebCodecs 🎉, with Demuxing, Decoding, Canvas Transforms, Encoding, and Muxing.

The only difference between this and a full-fledged browser editing suite like Capcut is the scale and scope of transformations. But the video processing logic would be nearly identical.

---

## Production Concerns

It's great that we've been able to create something useful, but before we wrap up, it's important to cover some production-level concerns.

### Codecs

You might have noticed strings like `vp09.00.10.08` in the demos, but I glossed over the details. We'll cover that now:

First, WebCodecs works with specific codec strings like `vp09.00.10.08`, not just '`vp9`'. The following won't work:

```js
const codec = VideoEncoder({
  codec: 'vp9', //This won't work!
  //...
})
```

As discussed previously, when decoding video, you don't really get a choice of codec. The video is already encoded, and so you need to get the codec from the video, as shown in the previous demos.

The demuxing libraries mentioned will identify the correct codec string, so you don't need to worry about that.

```ts
const decoderConfig = await demuxer.getVideoDecoderConfig();
// decoderConfig.codec = exact codec string for the video
```

When encoding a video, you can can choose your codec. Some people care a lot about codec choice, but from a very practical, pragmatic perspective, these rules of thumb should work for most developers:

- If the videos your app generates will be downloaded by users and/or you want to output mp4 files, use `h264`.
- If the videos generated are for internal use or you control video playback, and you don't care about format, use `vp9` with webm (open source, better compression, most widely supported codec).
- For most apps, these two options will cover you — deeper codec selection is a rabbit hole you don't need to go down yet.

Once you have a codec family chosen, you need to choose a specific codec string such as `avc1.42001f`.

The other numbers in the string specify certain codec parameters which are not as important from a developer perspective. If your goal is maximum compatibility, here's your cheat sheet for what codec strings to use

#### `h264` (for mp4 files)

- `avc1.42001f` - base profile, most compatible, supports up to 720p ([<VPIcon icon="fas fa-globe"/>99.6% support](https://webcodecsfundamentals.org/codecs/avc1.42001f.html))
- `avc1.4d0034` - main profile, level 5.2 (supports up to 4K) ([<VPIcon icon="fas fa-globe"/>98.9% support](https://webcodecsfundamentals.org/codecs/avc1.4d0034.html))
- `avc1.42003e` - base profile, level 6.2 (supports up to 8k) ([<VPIcon icon="fas fa-globe"/>86.8% support](https://webcodecsfundamentals.org/codecs/avc1.42003e.html))
- `avc1.64003e` - high profile - level 6.2 (supports up to 8k) ([<VPIcon icon="fas fa-globe"/>85.9% support](https://webcodecsfundamentals.org/codecs/avc1.64003e.html))

#### `vp9` (for webm files)

- `vp09.00.10.08.00` - basic, most compatible, level 1 ([<VPIcon icon="fas fa-globe"/>99.98% support](https://webcodecsfundamentals.org/codecs/vp09.00.10.08.00.html))
- `vp09.00.40.08.00` - level 4 ([<VPIcon icon="fas fa-globe"/>99.96% support](https://webcodecsfundamentals.org/codecs/vp09.00.40.08.00.html))
- `vp09.00.50.08.00` - level 5 ([<VPIcon icon="fas fa-globe"/>99.97% support](https://webcodecsfundamentals.org/codecs/vp09.00.50.08.00.html))
- `vp09.00.61.08.00` - level 6 ([<VPIcon icon="fas fa-globe"/>99.97% support](https://webcodecsfundamentals.org/codecs/vp09.00.61.08.00.html))

You can also use the *getCodecString* function from the [<VPIcon icon="fa-brands fa-npm"/>`webcodecs-utils`](https://npmjs.com/package/webcodecs-utils) package:

```ts
import { getCodecString } from 'webcodecs-utils'

const codec_string = getCodecString('vp9', width, height, bitrate)
```

You can find a comprehensive list of what codecs and codec strings you can use in WebCodecs [<VPIcon icon="fas fa-globe"/>here](https://webcodecsfundamentals.org/datasets/codec-support-table/).

### Bit rate

On top of height and width (which you presumably know from your content) and a codec string (which we just discussed), you also need to specify a bit rate when encoding video.

Video Compression algorithms have a trade-off between quality and file size. You can have high quality video with big file sizes, or lower quality video with lower file sizes.

Here's a quick visualization of what different quality levels look like for a 1080p video encoded at different bit rates:

::: tabs

@tab:active 300 kbps

![300kbps frame](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/43d4af76-9951-47f8-9833-c64ea8034ded.png)

@tab 1 Mbps

![1Mbps frame](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/2872effb-d8ae-4001-a82a-00338bf69168.png)

@tab 3 Mbps

![3 Mbps frame](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/e25723ca-2896-4c85-be91-56fcaf4a426b.png)

@tab 10 Mbps

![10 Mbps frame](https://cdn.hashnode.com/uploads/covers/6984c5b1feda93761574fcb1/cdb983e9-d55d-49f5-9852-4e85f053f6ba.png)

:::

Here's a quick lookup table for bitrate guidance:

| **Resolution** | **Bitrate (30fps)** | **Bitrate (60fps)** |
| --- | --- | --- |
| 4K | 13-20 Mbps | 20-30 Mbps |
| 1080p | 4.5-6 Mbps | 6-9 Mbps |
| 720p | 2-4 Mbps | 3-6 Mbps |
| 480p | 1.5-2 Mbps | 2-3 Mbps |
| 360p | 0.5-1 Mbps | 1-1.5 Mbps |
| 240p | 300-500 kbps | 500-800 kbps |

You can also use this utility function in your own app as a quick approximation:

```ts
function getBitrate(width, height, fps, quality = 'good') {
  const pixels = width * height;

  const qualityFactors = {
    'low': 0.05,
    'good': 0.08,
    'high': 0.10,
    'very-high': 0.15
  };

  const factor = qualityFactors[quality] || qualityFactors['good'];

  // Returns bitrate in bits per second
  return pixels * fps * factor;
}
```

The same function is also available in the webcodecs-utils package:

```ts
import { getBitrate } from 'webcodecs-utils'
```

### GPU vs CPU

Most user devices have some type of graphics card (typically called integrated graphics). These are specialized chips with specific silicon architectures optimized for encoding and decoding video, as well as for basic graphics.

You might hear "GPU" and think AI data centers and gamers. But as far as web applications are concerned, almost everyone has a GPU.

This is important because while most frontend-development almost exclusively deals with the CPU, WebCodecs and video processing work primarily on the GPU.

Here's a quick guide for what kind of data is stored where:

| **Data Type** | **Location** |
| --- | --- |
| VideoFrame | GPU |
| EncodedVideoChunk | CPU |
| ImageBitmap | GPU |
| ArrayBuffer | CPU |
| File | CPU + Disk |

There's a performance cost to moving data around, and this also becomes important for managing memory.

### Memory

VideoFrame objects can be quite large – 30MB for a 4K video. A user's graphics card typically reserves some portion of RAM for "Video Memory" or "VRAM" which is where *VideoFrame* objects would be stored.

So if a user has 8GB of RAM, they would typically have 2GB of VRAM (how much is decided by the operating system).

If the amount of video data exceeds VRAM, your application will crash. This means that for a typical user, if you have more than 67 4K frames in memory (~2 seconds of video) the program will crash.

#### When VideoFrames are generated

VideoFrame objects are generated whenever you create a `new VideoFrame(source)` but also from the `VideoDecoder`, specifically the output callback. Every time a frame is generated, memory usage goes up.

#### How to remove VideoFrames

You can't rely on standard garbage collection for VideoFrame objects. You have to explicitly call close() on a frame when you're done:

```ts
frame.close()
```

In the Streams/Pipeline code and demo showed earlier, frames are actually being [closed (<VPIcon icon="iconfont icon-github"/>`sb2702/webcodecs-utils`)](https://github.com/sb2702/webcodecs-utils/blob/main/src/streams/video-encode-stream.ts) as soon as they are encoded in the *VideoProcessStream* and *VideoEncodeStream* interfaces.

The other reason Streams are helpful for WebCodecs is the `highWaterMark` property, which defaults to 10. What this means is that when you run:

```ts
await demuxer.videoStream()
  .pipeThrough(new VideoDecodeStream(decoderConfig))
  .pipeThrough(processStream) 
  .pipeThrough(new VideoEncodeStream(encoderConfig))
  .pipeTo(muxer.videoSink());
```

You ensure that no more than 10 video frames are in memory at any given time. The Streams API allows you to specify that limit while the browser itself deals with the logic of how to make that happen.

If you don't use the Streams API, you'll need to make sure you manage keeping track of memory limits and number of open video frames yourself.

---

## Further Resources

Through this article we've gone over the basics of video processing, introduced the core concepts of the WebCodecs API, and built an MVP of a video converter utility. This is one of the simplest possible demos which actually touches all parts of the API. We also covered some basic production concerns.

This is just an introduction, and only scratches the surface of WebCodecs. For how simple the API looks, building a proper, production-ready WebCodecs application requires moving beyond hello-world demos.

To learn more about WebCodecs, you can check out [<VPIcon icon="fa-brands fa-firefox"/>MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API) and the [<VPIcon icon="fas fa-globe"/>WebCodecsFundamentals](https://webcodecsfundamentals.org/), a comprehensive online textbook going much more in depth on WebCodecs.

You can also examine the source code of existing, production tested apps like [<VPIcon icon="fas fa-globe"/>Remotion Convert](https://remotion.dev/convert) ([source code (<VPIcon icon="iconfont icon-github"/>`remotion-dev/remotion`)](https://github.com/remotion-dev/remotion/tree/main/packages/convert)) which is most similar to the demo app we covered, and [<VPIcon icon="fas fa-globe"/>Free AI Video Upscaler](http://free.upscaler.video/) ([source code (<VPIcon icon="iconfont icon-github"/>`sb2702/free-ai-video-upscaler`)](https://github.com/sb2702/free-ai-video-upscaler), [processing pipeline (<VPIcon icon="iconfont icon-github"/>`sb2702/free-ai-video-upscaler`)](https://github.com/sb2702/free-ai-video-upscaler/blob/main/src/processors/pipeline-processor.ts)) which is the inspiration for the design patterns presented here and implemented in [<VPIcon icon="fa-brands fa-npm"/>`webcodecs-utils`](https://npmjs.com/package/webcodecs-utils).

Finally, while WebCodecs is harder than it looks, you can make your life a lot easier by using a library like [<VPIcon icon="fas fa-globe"/>MediaBunny](https://mediabunny.dev/), which simplifies a lot of the details of things like memory management, file I/O, and other details. I use it in my own production WebCodecs applications.

Whether or not you actually build a full, production grade WebCodecs application, you now at least know that it's an option – one that's relatively new, provides better UX with lower server costs, and which is increasingly being adopted by prominent video applications like Capcut and Descript for its benefits.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The WebCodecs Handbook: Native Video Processing in the Browser",
  "desc": "If you've ever tried to process video in the browser, like for a video editing or streaming app, your options were either to process video on a server (expensive) or to use ffmpeg.js (clunky). With th",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-webcodecs-handbook-native-video-processing-in-the-browser.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
