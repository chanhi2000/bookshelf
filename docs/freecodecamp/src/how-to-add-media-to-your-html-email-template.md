---
lang: en-US
title: "How to Add Media to Your HTML Email Template"
description: "Article(s) > How to Add Media to Your HTML Email Template"
icon: fa-brands fa-css3-alt
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
      content: "Article(s) > How to Add Media to Your HTML Email Template"
    - property: og:description
      content: "How to Add Media to Your HTML Email Template"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-add-media-to-your-html-email-template.html
prev: /programming/css/articles/README.md
date: 2024-04-24
isOriginal: false
author:
  - name: Fanny Nyayic
    url : https://freecodecamp.org/news/author/nyayicfanny/
cover: https://freecodecamp.org/news/content/images/2024/04/Add-Media-to-Your-HTML-Email-Template.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Add Media to Your HTML Email Template"
  desc="In my previous article, ”How to Create a Responsive HTML Email Template,” we explored the fundamentals of designing and coding a simple HTML email template that adapts beautifully across different devices and email clients.  I got a couple of questio..."
  url="https://freecodecamp.org/news/how-to-add-media-to-your-html-email-template"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/04/Add-Media-to-Your-HTML-Email-Template.png"/>

In my previous article, "[**How to Create a Responsive HTML Email Template**](/freecodecamp.org/how-to-create-a-responsive-html-email-template.md)," we explored the fundamentals of designing and coding a simple HTML email template that adapts beautifully across different devices and email clients.

I got a couple of questions about adding media to the HTML email template.

Building on that foundation, I'll guide you through different ways of adding media to your HTML email template. Adding media such as images, videos, and audio can significantly increase the engagement and effectiveness of your communications.

::: note Requirements

- A simple HTML email template. You can create one following [**this guide**](/freecodecamp.org/how-to-create-a-responsive-html-email-template.md).

:::

---

## How to Add Images to Your Email Template

Images are the most common type of media added to emails. Here's how to include them in your HTML email templates:

- Before adding an image, ensure it is properly sized and optimized for web use. A common practice is to keep the image width under 600 pixels to fit most email clients without scaling. For this particular example we have a stock image and resized it to 600 x 750 pixels as shown below.

![this is the image we shall be uploading](https://freecodecamp.org/news/content/images/2024/04/600x750.jpg)

- Upload your image to a reliable web server or content delivery network (CDN). You'll need a stable URL to reference in your email.

For this example we'll use [<VPIcon icon="fas fa-globe"/>the imgbb website](https://imgbb.com/) and upload our image. Click on "Start Uploading*"* and choose the image.

![imgbb is one of the free image hosting platforms](https://freecodecamp.org/news/content/images/2024/04/screely-1713853483929.png)

After choosing the image to use, select "Don't Autodelete" and click on Upload.

![Choose Don't Autodelete from the dropdown](https://freecodecamp.org/news/content/images/2024/04/screely-1713853781152.png)

After uploading, a URL will be generated. Click on the dropdown and choose "HTML full linked"

![The embed code generated](https://freecodecamp.org/news/content/images/2024/04/screely-1713854879006-copy-code.png)

- Copy the HTML code generated and insert it within a desired section in your email template as shown.

```html
<a href="https://ibb.co/XpRp2N8">
  <img src="https://i.ibb.co/q9Q9yX5/600x750.jpg" alt="600x750" border="0"/>
</a>
```

Feel free to try out other embed code options to test how your image will appear in the email template.

Below is the outcome of the inserted image:

![image successfully inserted to our email template](https://freecodecamp.org/news/content/images/2024/04/screely-1713854742721.png)

::: note

Always include the `alt` attribute to provide alternative text for scenarios where the image cannot be displayed.

:::

---

## How to Embed Videos in Your Email Template

Direct video playback is not supported in most email clients. Instead, you can embed a clickable thumbnail that links to a video hosted online:

- **Create a Thumbnail**: Capture a frame from your video or create a custom graphic that represents the video content. This will act as a placeholder. In this example, we'll use the same image as the thumbnail.

![](https://freecodecamp.org/news/content/images/2024/04/screely-1713855881423-thumbnail.png)

- From the dropdown, choose HTML thumbnail linked. Copy the code and paste it to your email template.

```html
<a href="https://ibb.co/XpRp2N8">
  <img src="https://i.ibb.co/XpRp2N8/600x750.jpg" alt="600x750" border="0"/>
</a>
```

- **Link to the Video**: Modify the above code to use the thumbnail as a clickable image linked to the video URL.
- Change the URL in the `<a href ="">` to the video link as shown below.

```html
<a href="https://youtu.be/UG8rjxYBfFg?si=xU2zqCtQW5-2z7nw">
  <img src="https://i.ibb.co/XpRp2N8/600x750.jpg" alt="600x750" border="0"/>
</a>
```

This HTML snippet creates a linked image without a border. And this is how it will appear in our email Template:

![linked thumbnail will appear like this](https://freecodecamp.org/news/content/images/2024/04/screely-1713856590062-thumbnail.png)

---

## How to Embed YouTube Videos in Your Email Template

Alternatively you can directly embed a YouTube video to your email template. Here is how:

- Go to YouTube and choose the video you would like to embed.
- Click on **share -> embed** and an `iframe` will be generated. Below is an example:

```html
<iframe 
  width="560" height="315"
  src="https://www.youtube.com/embed/UG8rjxYBfFg?si=nYBBM032nvBn5tNZ"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
>
</iframe>
```

- Copy the `iframe` and paste it to a `<td>` section of your HTML email template code. And you will have something looking like this:

![this is an example of a youtube video within an email template](https://freecodecamp.org/news/content/images/2024/04/screely-1713857296270-youtube.png)

---

## How to Add Audio to Your Email Template

Adding audio files directly to emails is also not supported by most email clients. Similar to videos, you can include a link to the audio file:

- **Host the Audio File**: Upload your audio file to a suitable platform or server. There are a number of audio platforms out there, like Google Drive, your own website, YouTube, sound cloud, and so on.
- For this example, we'll use a platform called [<VPIcon icon="fas fa-globe"/>audio.com](https://audio.com/). Simply create an account by clicking "join now for free" or sign in if you already have an account.

![](https://freecodecamp.org/news/content/images/2024/04/screely-1713861900834.png)

Click upload and choose your .mp3 file which will be stored in your account. Once the audio is complete, click on the share icon.

![](https://freecodecamp.org/news/content/images/2024/04/screely-1713862121050.png)

- This will bring you to a couple of options where you can copy the link or simply embed the link:

Click on embed, and you will see a preview of how your audio will appear. Copy the code and paste it to your email template section.

![code generated by audio.com which can be embedded in the email template](https://freecodecamp.org/news/content/images/2024/04/screely-1713862229377.png)

You can also eliminate the `div` and just use the `iframe` . Also feel free to remove parts you would not want to appear in the email template and customize it to your preference.

Here is the code:

```html
<div style="height: 228px; width: 600px;">
  <iframe src="https://audio.com/embed/audio/1797114509131910?theme=image"
    style="display:block; border-radius: 6px; border: none; height: 204px; width: 600px;"
  >
  </iframe>
  <a href='https://audio.com/nyayic-fanny'
    style="text-align: center; display: block; color: #A4ABB6; font-size: 12px; font-family: sans-serif; line-height: 16px; margin-top: 8px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"
  >
    @nyayic-fanny
  </a>
</div>
```

This is our final outcome for the above:

![our audio will appear like this in our email template](https://freecodecamp.org/news/content/images/2024/04/screely-1713862296389.png)

### Using `audio` tag

Besides embedding, we can use the audio tag and just add the URL to our audio source as shown below:

```html
<p>Audio added via audio tag</p>
<br><br>
<audio controls="controls">
  <source src="https://audio.com/nyayic-fanny/audio/past-life-jvna.mp3">
    <p>
      ? Listen: <a href="https://audio.com/nyayic-fanny/audio/past-life-jvna.mp3">Audio</a> (mp3)
    </p>
</audio>
```

Just change the URL to your `audio url` . And this is how our entire modification should look.

![our modified html email template](https://freecodecamp.org/news/content/images/2024/04/final-newsletter.png)

::: note

Hotmail and clients that don’t support HTML5 will not work!

:::

---

## Best Practices for Media in HTML Emails

When integrating media into HTML emails, consider the following tips to optimize compatibility and user experience:

- Always use full, absolute URLs for images, videos, and audio to ensure they load correctly in all email clients.
- Test Your Emails: Different email clients display HTML content in various ways. Use tools like Litmus or Email on Acid to test how your email renders across different platforms.
- Keep Load Times in Mind: Optimize media file sizes to ensure that your emails load quickly, which is crucial for retaining the recipient's attention and improving engagement.
- Consider Accessibility: Provide descriptive alt text for images and captions or transcripts for audio and video content.

While there are limitations to what email clients can support, using linked images for videos and audio files provides a user-friendly solution that works across most platforms.

Always ensure you test your emails thoroughly and follow best practices to ensure a smooth and engaging user experience.

Happy Coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Add Media to Your HTML Email Template",
  "desc": "In my previous article, ”How to Create a Responsive HTML Email Template,” we explored the fundamentals of designing and coding a simple HTML email template that adapts beautifully across different devices and email clients.  I got a couple of questio...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-add-media-to-your-html-email-template.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
