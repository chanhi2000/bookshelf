---
lang: en-US
title: "An HTML Email Template with Basic Typography and Dark/Light Modes"
description: "Article(s) > An HTML Email Template with Basic Typography and Dark/Light Modes"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > An HTML Email Template with Basic Typography and Dark/Light Modes"
    - property: og:description
      content: "An HTML Email Template with Basic Typography and Dark/Light Modes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/simple-typographic-email-template.html
prev: /programming/css/articles/README.md
date: 2024-10-17
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4210
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="An HTML Email Template with Basic Typography and Dark/Light Modes"
  desc="You can keep it chill and just use HTML email to apply a nice typeface, reign in the line length, use real links, and honor dark mode."
  url="https://frontendmasters.com/blog/simple-typographic-email-template/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4210"/>

I don’t mind HTML email, but it really can be overdone. There is a tendency to do *too much*. Too much layout. Too many images. Too much text. Too many styles. The reason I don’t mind it though is that the HTML part of an HTML email offers some styling control that, when reigned in, makes for a clear and nice-looking email.

A plain text email can be nice too. The constraint of plain text can help an email get to the point and not do too much. But if we go for HTML email, we can apply *just enough* layout and styles to make it almost like a plain text email, only with a bit more class.

- A pleasant readable typeface
- Reasonable line length
- Breathable line height
- Anchor links on words
- Dark/light mode

I’ve put together an HTML document that does those things. I looked at various templates and poked and prodded and tested things and have what seems to be a decent setup to accomplish those things above (and nothing more).

It’s a pretty big chunk of HTML, so I’ll pop it in here as a `<details>`.

::: detatils Plain Typographic HTML Template

```html :collapsed-lines
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    
    <title>Email</title>
    
    <style type="text/css" rel="stylesheet" media="all"> @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
      
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
      
    body,
    td,
    th {
      font-family: "Inter", Helvetica, Arial, sans-serif;
      font-optical-sizing: auto;
    }
    body {
      width: 100% !important;
      height: 100%;
      margin: 0;
      -webkit-text-size-adjust: none;
       background-color: #FFF;
       color: #333;
    }
    a {
      color: #3869D4;
      text-decoration: underline;
    }
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #333333 !important;
        color: #FFF !important;
      }
      a {
      	color: #82a9ff;
      }
    }
    
    a img {
      border: none;
    }
    
    h1 {
      margin-top: 0;
      color: #333333;
      font-size: 26px;
      font-weight: bold;
      text-align: left;
      text-wrap: balance;
    }
    h2 {
      margin-top: 0;
      color: #333333;
      font-size: 21px;
      font-weight: 900;
      text-align: left;
      text-wrap: balance;
    }
    
    p,
    ul,
    ol,
    blockquote {
      margin: 8px 0 20px;
      font-size: 16px;
      line-height: 1.625;
    }
    
    .sub {
      font-size: 13px;
    }

    .button {
      background-color: #3869D4;
      border-top: 10px solid #3869D4;
      border-right: 18px solid #3869D4;
      border-bottom: 10px solid #3869D4;
      border-left: 18px solid #3869D4;
      display: inline-block;
      color: #FFF !important;
      text-decoration: none;
      border-radius: 3px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
      -webkit-text-size-adjust: none;
      box-sizing: border-box;
    }
    
    .email-wrapper {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    .email-content {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    .email-body {
      width: 100%;
      margin: 0;
      padding: 0;
      -premailer-width: 100%;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
    }
    
    .email-footer {
      width: 570px;
      margin: 0 auto;
      padding: 0;
      -premailer-width: 570px;
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      text-align: center;
    }
    .email-footer p {
      color: #A8AAAF;
    }
    
    .content-cell {
      padding: 35px;
    }
      
    @media only screen and (max-width: 600px) {
      .email-footer {
        width: 100% !important;
      }
    } </style>
    <!--[if mso]>
    <style type="text/css">
      .f-fallback  {
        font-family: Arial, sans-serif;
      }
    </style>
  <![endif]-->
  </head>
  
  <body>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">
          <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="content-cell">
                      <div class="f-fallback">
                        <p><strong>Hey folks!</strong></p>
                        
                        <p>Boy have I got some opinions for you. I don't mind HTML emails. Being allowed a bit of typography is appreciated. And hey, I like my links <a href="https://codepen.io">colorized and underlined</a>, myself, something that plain text just can't do.</p>
                        
                        <p>But don't go overboard. <em>Maybe</em> one image. If you absolutely have to do a two column thing, make sure it collapses to one on mobile.</p>
                        
                        <p>You know a button here and there is fun too.</p>
                        
                        <p><a href="https://codepen.io" class="button">A button</a></p>
                        
                        <p>But that's it. For real. Keep it chill. More people will read it. You gotta admit it looks nice right? I feel like even this email demo is getting a little long. I'd trim it up if it was a transactional email or if I really just had one call to action. An email newsletter could be longer I suppose.</p>
                        
                        <h2>Header</h2>
                        
                        <p>OK fine — a subheader or two can work. But only if the email is really long and it helps scanability.</p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="content-cell" align="center">
                      <p class="f-fallback sub">That's all folks.</p>
                      <p class="f-fallback sub"><a href="#">Company Name</a> • <a href="#">Unsubscribe</a></p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
```

:::

![It looks like this](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/10/clean-html-email-762x1024.png?resize=762%2C1024&ssl=1)

But “it looks like this” is of course a gross simplification. Looks like this… where? The email client landscape is arguably even more complicated than the browser landscape. There are email clients that use Microsoft Word (?!) as the rendering engine. There are mobile-specific and desktop-specific clients. There are native clients across platforms. There are web-based clients. There are clients from two decades ago, and clients updated last week.

I like the app [<VPIcon icon="fas fa-globe"/>Litmus](https://litmus.com/) for testing this stuff. It’s awfully expensive, but it allows you to see how your email will look across tons of clients and that’s pretty impressive and useful, so hey, you gotta do what you gotta do.

![Here’s a selection of screenshots of this email rendering](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/10/Screenshot-2024-10-17-at-10.34.57%E2%80%AFAM.png?resize=869%2C1024&ssl=1)

Those all turned out pretty decent across the board so I’m happy with that. I tend to focus on the extemes.

![So like does Outlook 2007 on Windows look OK?](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/10/Screenshot-2024-10-17-at-10.36.44%E2%80%AFAM.png?resize=742%2C854&ssl=1)

It’s not amazing, but for a 17-year-old email client, I’m going to call that a win. Web Gmail is sort of the other extreme.

![It’s new, and web-based, but also has rendering challenges, so testing that in Firefox on Windows is a good test.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/10/Screenshot-2024-10-17-at-10.41.23%E2%80%AFAM.png?resize=732%2C1010&ssl=1)

Of course, we’ve gotta test mobile because not only is it a very different screen size it’s also an entirely different platform.

![Here’s Dark Mode on Android](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/10/full-2-1.png?resize=289%2C1024&ssl=1)

I’ll call that a win.

You’ll find that the Frontend Masters newsletter rolls like this!

![With a red brand color as the links.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/10/Screenshot-2024-10-17-at-10.56.00%E2%80%AFAM.png?resize=861%2C1024&ssl=1)

While I was playing with all this, I was like: **do we _reallllly_ need to deal with all that `<table>` crap?** Can’t we get away with something that looks more like just semantic HTML, particularly when we’re just trying to so little with the layout?

The answer is no, we still need the `<table>` layout, sadly. I gave it a shot with this HTML, which I “modernized” into more basic HTML:

::: details Modern HTML Email (Test)

```html :collapsed-lines
<!DOCTYPE html>
<html lang="en">
  
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    
    <title>Email</title>
    
    <style> @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
      
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
      
    body,
    td,
    th {
      font-family: "Inter", Helvetica, Arial, sans-serif;
      font-optical-sizing: auto;
    }
    body {
      margin: 0;
      -webkit-text-size-adjust: none;
       background-color: Canvas;
       color: CanvasText;
    }
    
    a {
      color: #3869D4;
    }
    a img {
      border: none;
    }
    
    h1, h2 {
      margin-top: 0;
      color: #333333;
      font-size: 26px;
      font-weight: 900;
      text-wrap: balance;
    }
    h2 {
      font-size: 21px;
    }
    
    td,
    th {
      font-size: 16px;
      word-break: break-word;
    }
    
    p,
    ul,
    ol,
    blockquote {
      margin: 8px 0 20px;
      font-size: 16px;
      line-height: 1.625;
    }
    
    .sub {
      font-size: 13px;
    }

    .button {
      background-color: #3869D4;
      border-top: 10px solid #3869D4;
      border-right: 18px solid #3869D4;
      border-bottom: 10px solid #3869D4;
      border-left: 18px solid #3869D4;
      display: inline-block;
      color: #FFF;
      text-decoration: none;
      border-radius: 3px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
      -webkit-text-size-adjust: none;
      box-sizing: border-box;
    }
    @media only screen and (max-width: 500px) {
      .button {
        width: 100% !important;
        text-align: center !important;
      }
    }
    
    .email-wrapper {
      max-width: 570px;
      margin: 0 auto;
    }
    
    .email-footer {
    	margin-top: 100px;
      text-align: center;
    } 
    .email-footer p {
    	font-size: 14px;
      color: #A8AAAF;
    } </style>
  </head>
  
  <body>
    
    <div class="email-wrapper">
    
      <p><strong>Hey folks!</strong></p>

      <p>Boy have I got some opinions for you. I don't mind HTML emails. Being allowed a bit of typography is appreciated. And hey, I like my links <a href="https://codepen.io">colorized and underlined</a>, myself, something that plain text just can't do.</p>

      <p>But don't go overboard. <em>Maybe</em> one image. If you absolutely have to do a two column thing, make sure it collapses to one on mobile.</p>

      <p>You know a button here and there is fun too.</p>

      <p><a href="https://codepen.io" class="button">A button</a></p>

      <p>But that's it. For real. Keep it chill. More people will read it. You gotta admit it looks nice right? I feel like even this email demo is getting a little long. I'd trim it up if it was a transactional email or if I really just had one call to action. An email newsletter could be longer I suppose.</p>

      <h2>Header</h2>

      <p>OK fine — a subheader or two can work. But only if the email is really long and it helps scanability.</p>
                   
      <div class="email-footer">
        <p>That's all folks.</p>
        <p><a href="#">Company Name</a> • <a href="#">Unsubscribe</a></p>
      </div>
      
    </div>
    
  </body>
  
</html>
```

:::

![That looks fine in nice email clients like Apple Mail.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/10/Screenshot-2024-10-17-at-11.02.17%E2%80%AFAM.png?resize=820%2C948&ssl=1)

![But Outlook 2007 and even modern OL Office can’t deal with the layout.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/10/full-1-1.png?resize=1024%2C930&ssl=1)

An explict goal of mine here was reigning in that width and centering it such that the typography has a good line length, and apparently that can’t be done without tables. Oh well! This kind of thing is “do it once and use it for a long time” and hey, that’s the job.

---

I’ve been enjoying playing with [<VPIcon icon="fas fa-globe"/>bolt.new](https://bolt.new/), an AI generator for websites from StackBlitz. Just for kicks I asked it to create an over-the-top HTML email to see if we could get a good example of doing too much for this blog post. It spun up a Next.js app to do this, which is definitely over-the-top (lol) but I also sorta get it since the point is building web apps that StackBlitz is good at running.

![This is what I got though](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/10/Screenshot-2024-10-17-at-6.41.57%E2%80%AFAM.png?resize=725%2C1024&ssl=1)

Which is perfect and I take back everything bad I said about HTML emails.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "An HTML Email Template with Basic Typography and Dark/Light Modes",
  "desc": "You can keep it chill and just use HTML email to apply a nice typeface, reign in the line length, use real links, and honor dark mode.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/simple-typographic-email-template.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
