---
lang: en-US
title: "Multimedia Accessibility"
description: Article(s) > (5/6) Everything You Need to Know About Web Acessibility 
category:
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - css
head:
  - - meta:
    - property: og:title
      content: Article(s) > (5/6) Everything You Need to Know About Web Acessibility
    - property: og:description
      content: "Multimedia Accessibility"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-web-accessibility-handbook/multimedia-accessibility.html
date: 2025-03-19
isOriginal: false
author:
  - name: Kunal Nalawade
    url : https://freecodecamp.org/news/author/KunalN25/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742318086251/103cec5f-3330-4559-8554-4ec76b16ec76.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Everything You Need to Know About Web Acessibility",
  "desc": "The web is a great place to access information and connect with people. It has opened up countless opportunities, making life more convenient in many ways. But not everyone experiences the web in the same way. Websites are difficult to use for people...",
  "link": "/freecodecamp.org/the-web-accessibility-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Everything You Need to Know About Web Acessibility"
  desc="The web is a great place to access information and connect with people. It has opened up countless opportunities, making life more convenient in many ways. But not everyone experiences the web in the same way. Websites are difficult to use for people..."
  url="https://freecodecamp.org/news/the-web-accessibility-handbook#heading-multimedia-accessibility"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742318086251/103cec5f-3330-4559-8554-4ec76b16ec76.png"/>


A website’s content is not restricted to text. It also often consists of multimedia content like images, audio, and video. In a lot of cases, multimedia content is easier to understand than text content. While this is true for many users, it poses challenges for users with disabilities.

People with visual impairments cannot see images and people who are deaf or hard of hearing cannot easily interpret audio content. So, as developers, it’s our job to make this type of content accessible for everyone. Let’s understand how to make this possible:

---

## Images

Since people with visual impairments cannot see images, they depend on a screen reader to describe the image. Just writing an `img` tag with `src` attribute does not help.

```html
<img src="temple.jpg" />
```

By default, the screen reader reads out the file path or URL of the image. A file name might give some idea of the image, but still does not describe it.

So, it’s helpful to add an `alt` attribute to an `img`. The `alt` attribute provides an alternate text for the image, and its purpose is to describe the image.

```html
<img
  src="temple.jpg"
  alt="The Meenakshi Temple, situated in Madurai, a South Indian City is dedicated to goddess Meenakshi, a form of Parvati"
/>
```

Here, instead of reading the file path, the screen reader reads out the alternate text – that is, the value of the `alt` attribute. The alternate text should provide a description of the image to help users understand what it’s conveying. So, instead of just saying “Temple", the user knows which temple is being depicted in the image.

You can also add extra context to the image with the `title` attribute.

```html
<img
  src="temple.jpg"
  alt="The Meenakshi Temple, situated in Madurai, a South Indian City is dedicated to goddess Meenakshi, a form of Parvati"
  title="The Meenakshi Temple"
/>
```

When focussed on the image, the screen reader reads out the `alt` text and the title.

Let’s take another example which uses an alternative to the `alt` attribute:

```html
<img src="temple.jpg" aria-labelledby="temple-label" />
<p id="temple-label">
  The Meenakshi Temple, situated in Madurai, a South Indian City is dedicated to
  goddess Meenakshi, a form of Parvati
</p>
```

Here, instead of using the `alt` attribute, we have used the `aria-labelledby` attribute to link the paragraph element to the image. The text inside `p` acts as an alternate text for the image. This is helpful if you need to use the same text as an alternate text for different images.

Sometimes, we use images as icons for headers and navigation menus, just for decoration. Usually, these images are not relevant to understand the content of the page. In these cases, you add an empty `alt` attribute.

```html
<h3>
  <img src="page-icon.png" alt="" />
  History of Meenakshi Temple 
</h3>
```

If you skip the `alt` attribute, the screen reader reads out the entire image URL. To avoid this, use an empty `alt` attribute, so the screen reader simply announces it as an image and moves on, preventing unnecessary distractions for users.

You can also use `role="presentation"` to skip reading the image path or alternative text.

---

## Audio and video

When using the [<FontIcon icon="fa-brands fa-firefox"/>`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) and [<FontIcon icon="fa-brands fa-firefox"/>`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) elements, remember to include multiple sources – that is, provide the audio and video in different formats. For browsers that do not support the formats you have mentioned, include a fallback download link so they can access the resource.

```html
<audio controls>
  <source src="audio.mp3" type="audio/mpeg" />
  <source src="audio.ogg" type="audio/ogg" />
  <p>
    Your browser doesn't support HTML video. Here is a
    <a href="video.mp3">link to the video</a> instead.
  </p>
</audio>
<video controls>
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />
  <p>
    Your browser doesn't support HTML5 video. Here is a
    <a href="video.mp4">link to the video</a> instead.
  </p>
</video>
```

Next, let’s understand the shortcomings of using native HTML controls for audio and video.

- They cannot be styled with CSS, so they may not align with your website’s theme.
- The play/pause buttons are not keyboard accessible.
- They don’t have functionality to forward or rewind the video.

To overcome these limitations, we’ll create our custom video player in the next steps. To start, let’s create a container for the video content:

```html
<div class="controls">
  <button class="play-pause">Play</button>
  <button class="stop">Reset Video</button>
</div>
```

These will work as the play/pause and reset buttons. Then, let’s remove the `controls` attribute from the `<video>` to replace them with our custom controls.

```js
const videoPlayer = document.querySelector("video");
videoPlayer.removeAttribute("controls");
```

Why do we remove it at run time? Let’s say JavaScript does not load due to some issue. In this case, the user can still use the native controls. Next, let’s add some functionality to our buttons:

```js
const playPauseBtn = document.querySelector(".play-pause");
const resetBtn = document.querySelector(".reset");

playPauseBtn.onclick = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playPauseBtn.textContent = "Pause";
  } else {
    videoPlayer.pause();
    playPauseBtn.textContent = "Play";
  }
};

resetBtn.onclick = () => {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  playPauseBtn.textContent = "Play";
};
```

- The video player object is of type [<FontIcon icon="fa-brands fa-firefox"/>`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement), that contains several methods you can use to control the video.
- For the play/pause button, we add a toggling functionality, with the `play()` and `pause()` methods.
- To reset the video, we pause it and set the current time to 0.

Now, our custom video player is keyboard accessible, and able to be styled with CSS. You can also add additional functionality like forward/rewind, a timer, and a progress bar. The steps are similar for a custom audio player.

Check out the [<FontIcon icon="fa-brands fa-firefox"/>MDN Docs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/Multimedia#creating_custom_audio_and_video_controls) for more detail about this functionality.

### Audio Transcripts

People who are deaf or hard of hearing cannot easily access audio content. So to make it accessible, you need to add transcripts under any audio or video form of content.

If you run a business, you could pay a professional to do the transcripts. Check out the [<FontIcon icon="fa-brands fa-firefox"/>docs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/Multimedia#audio_transcripts) for options. To show the transcript on the UI, you could use a show/hide panel. Referring to the docs, see the [<FontIcon icon="fas fa-globe"/>audio transcript UI](https://mdn.github.io/learning-area/accessibility/multimedia/audio-transcript-ui/) ([source code (<FontIcon icon="iconfont icon-github"/>`mdn/learning-area`)](https://github.com/mdn/learning-area/tree/main/accessibility/multimedia/audio-transcript-ui)) for an example.

If the audio is a recording of some presentation, you should attach links to any documents or presentation decks. Also, include a description for any visual content being referenced.

### Video Closed Captioning and Subtitles

First, let’s understand the difference between captions and subtitles. They are implemented in a similar way and visually, they look the same – but their purposes are different.

Captions denote who’s speaking and describe other sound effects in the video. They are mostly added with people who are deaf or hard of hearing in mind. Subtitles help people who don’t understand the language being spoken in the video, by translating it to text that uses the language of their choice.

Let’s see how to add subtitles to your videos. We write subtitles in WebVTT, a format that contains text along with the range of timestamps indicating which text you want in each part of the video. Following is an example of a subtitles file:

```plaintext title="text"
WEBVTT

1
00:00:01.230 --> 00:00:02.606
This is the first subtitle.

2
00:00:04.739 --> 00:00:06.074
This is the second.
```

Save this file and name it with a `.vtt` extension. To link this file to your video, include it in a [<FontIcon icon="fa-brands fa-firefox"/>`<track>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track) element:

```html
<video controls>
  <source src="video.mp4" type="video/mp4" />
  <track
    src="captions.vtt"
    kind="subtitles"
    srclang="en"
    label="English"
    default
  />
</video>
```

You should include the `<track>` element inside the `<video>` element and placed after all the sources. It has the following attributes:

- `kind` mentions the type of file being referenced.
- `srclang` indicates the language the subtitles are in.
- `label` indicates the text that is shown while the user is selecting a language
- `src` is the path or URL of the subtitles file, that is the `.vtt` file we created previously.

This will show subtitles for the specified timestamps. This will not only help people with hearing impairments, but is also useful for people who don’t understand the language, or those who are working in a noisy environment.

For people who are visually impaired, you could also include text that describes certain visuals in parts of the video. This text would be read out by screen reader.

You can also add custom styling to subtitle menu and subtitle text. Check out [<FontIcon icon="fa-brands fa-firefox"/>MDN Docs - Adding captions and subtitles to HTML video](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video) for the implementation.
