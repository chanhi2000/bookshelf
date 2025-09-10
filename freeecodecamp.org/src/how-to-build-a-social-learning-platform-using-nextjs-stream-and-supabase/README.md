---
lang: en-US
title: "How to Build a Social Learning Platform using Next.js, Stream, and Supabase"
description: "Article(s) > How to Build a Social Learning Platform using Next.js, Stream, and Supabase"
icon: fa-brands fa-next
category:
  - Node.js
  - Next.js
  - Supabase
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
  - supabase
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Social Learning Platform using Next.js, Stream, and Supabase"
    - property: og:description
      content: "How to Build a Social Learning Platform using Next.js, Stream, and Supabase"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase/
prev: /programming/js-next/articles/README.md
date: 2025-03-04
isOriginal: false
author:
  - name: David Asaolu
    url : https://freecodecamp.org/news/author/de/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1741009946459/dba65929-1b65-4278-9601-4d047042753a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Supabased > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-supabase/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Social Learning Platform using Next.js, Stream, and Supabase"
  desc="Social media and real-time communication have transformed how people interact, making it easier to share ideas, collaborate, and learn from others, regardless of location. From professional networks to online study groups, these platforms allow vario..."
  url="https://freecodecamp.org/news/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1741009946459/dba65929-1b65-4278-9601-4d047042753a.png"/>

Social media and real-time communication have transformed how people interact, making it easier to share ideas, collaborate, and learn from others, regardless of location. From professional networks to online study groups, these platforms allow various forms of communication such as instant messaging, video calls, and content sharing.

In this tutorial, you'll learn how to build a social learning platform that connects students with professionals across various fields. The platform enables users to:

- Schedule video conferencing sessions that students can join,
- Share posts or announcements about trending tools and upcoming sessions, and
- Create community channels where students can engage with one another.

The [<VPIcon icon="fas fa-globe"/>Stream Video & Audio SDK](https://getstream.io/video/sdk/) and [<VPIcon icon="fas fa-globe"/>Stream Chat SDK](https://getstream.io/chat/sdk/) will enable us to integrate video calls and community channels easily into the application.

![Cartoon person with pink hair and green glasses holding a smartphone, which displays heart, poop, and smiley face emojis on the screen.](https://cdn.hashnode.com/res/hashnode/image/upload/v1740662075821/1a004f19-4889-4b57-921b-062cf1927261.gif)

---

## App Overview

The application consists of two types of users (students and instructors), each with access to specific features:

Students can do the following:

- View an activity feed with posts from instructors and react to them.
- Follow instructors in their field of interest.
- Join upcoming video sessions and community channels.
- Each student has an interest attribute that helps match them with relevant instructors.

Instructors can also:

- Access a dashboard showing their follower count and post activity.
- Schedule video conferences for students to join.
- Make announcements or share posts.
- Create community channels (if they haven't already).
- The platform suggests instructors to students based on shared career interests.

Here is an image showing the various functions that the users can perform:

![Flowchart titled "User Functions" showing a hierarchy. "Users" split into "Students" and "Instructors". Students can "Follow Instructors", "Join Video Sessions", "Join Community Channels", and "Read and React to Posts". Instructors can "View Dashboard", "Create Posts", "Schedule Video Sessions", and "Create Community Channels".](https://cdn.hashnode.com/res/hashnode/image/upload/v1740723106527/fd8af07a-1919-42f0-9e9a-ed380a0b77cc.png)

::: note Prerequisites

To fully understand this tutorial, you need to have a basic understanding of React or Next.js.

We will use the following tools:

- [<VPIcon icon="iconfont icon-supabase"/>Supabase](https://supabase.com/docs): a Backend-as-a-service platform that makes it easy to integrate authentication, database, real-time communication, file storage, and edge functions within your software applications. It also supports multiple programming languages.
- [<VPIcon icon="fas fa-globe"/>Stream Chat](https://getstream.io/chat/docs/sdk/react/) and [<VPIcon icon="fas fa-globe"/>Audio & Video SDK](https://getstream.io/video/docs/react/): a real-time communication platform that enables you to add video, chat, and various types of communication to your application.
- [<VPIcon icon="fas fa-globe"/>Shadcn UI](https://ui.shadcn.com/docs/installation/next): a UI component library that provides customizable, beautifully designed, and accessible UI components for your applications.

:::

Create a Next.js project by running the following code snippet:

```sh
npx create-next-app stream-lms
```

Install the package dependencies for the project:

```sh
npm install @supabase/supabase-js \
@supabase/ssr \
@stream-io/node-sdk \
@stream-io/video-react-sdk \
stream-chat \
stream-chat-react \
@emoji-mart/data \
@emoji-mart/react
```

To install the Shadcn UI library, follow [<VPIcon icon="fas fa-globe"/>the installation guide.](https://ui.shadcn.com/docs/installation/next)

Once everything is set up, your Next.js project is ready. Now, let's start building! 🚀

```component VPCard
{
  "title": "How to Set up Server-Side Authentication with Supabase",
  "desc": "(1/4) How to Build a Social Learning Platform using Next.js, Stream, and Supabase",
  "link": "/freecodecamp.org/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase/how-to-set-up-server-side-authentication-with-supabase.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "The Application Database Design",
  "desc": "(2/4) How to Build a Social Learning Platform using Next.js, Stream, and Supabase",
  "link": "/freecodecamp.org/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase/the-application-database-design.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Add a Video Conferencing Feature with Stream",
  "desc": "(3/4) How to Build a Social Learning Platform using Next.js, Stream, and Supabase",
  "link": "/freecodecamp.org/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase/how-to-add-a-video-conferencing-feature-with-stream.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Integrate a Group Chat Feature Using Stream Chat Messaging",
  "desc": "(4/4) How to Build a Social Learning Platform using Next.js, Stream, and Supabase",
  "link": "/freecodecamp.org/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase/how-to-integrate-a-group-chat-feature-using-stream-chat-messaging.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## Next Steps

So far, you've learned how to build a full-stack social learning platform using Stream and Supabase. This platform enables users to interact with one another through real-time chat powered by Stream.

Stream helps you build engaging apps that scale to millions with performant and flexible Chat, Video, Voice, Feeds, and Moderation APIs and SDKs powered by a global edge network and enterprise-grade infrastructure.

Here are some useful resources to help you get started:

- [<VPIcon icon="fas fa-globe"/>Stream Chat Documentation](https://getstream.io/chat/docs/)
- [<VPIcon icon="fas fa-globe"/>Stream Video and Audio Documentation](https://getstream.io/video/)
- [<VPIcon icon="fas fa-globe"/>Stream Activity Feeds](https://getstream.io/activity-feeds/)

Thank you for reading! 🎉

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Social Learning Platform using Next.js, Stream, and Supabase",
  "desc": "Social media and real-time communication have transformed how people interact, making it easier to share ideas, collaborate, and learn from others, regardless of location. From professional networks to online study groups, these platforms allow vario...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
