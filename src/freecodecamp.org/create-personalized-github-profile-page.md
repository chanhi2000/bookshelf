---
lang: en-US
title: "How to Create Your Personalized  GitHub Profile Page - GitHub Profile README Guide"
description: "Article(s) > How to Create Your Personalized  GitHub Profile Page - GitHub Profile README Guide"
icon: iconfont icon-github
category: 
  - DevOps
  - Github
  - Markdown
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - devops
  - github
  - github-profile
  - markdown
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create Your Personalized  GitHub Profile Page - GitHub Profile README Guide"
    - property: og:description
      content: "How to Create Your Personalized  GitHub Profile Page - GitHub Profile README Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/create-personalized-github-profile-page.html
prev: /devops/github/articles/README.md
date: 2024-05-02
isOriginal: false
author:
  - name: Sahil Mahapatra
    url : https://freecodecamp.org/news/author/dotslashbit/
cover: https://freecodecamp.org/news/content/images/2024/04/Neon-Green-Bold-Quote-Motivational-Tweet-Instagram-Post.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create Your Personalized  GitHub Profile Page - GitHub Profile README Guide"
  desc="Have you ever wanted to spruce up your GitHub profile page and make it stand out? Well, you're in luck!  With just a few simple steps, you can create a personalized GitHub profile that showcases your skills, projects, and personality. Let's dive in. ..."
  url="https://freecodecamp.org/news/create-personalized-github-profile-page"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/04/Neon-Green-Bold-Quote-Motivational-Tweet-Instagram-Post.png"/>

Have you ever wanted to spruce up your GitHub profile page and make it stand out? Well, you're in luck!

With just a few simple steps, you can create a personalized GitHub profile that showcases your skills, projects, and personality. Let's dive in.

---

## Create A New Repository

Go to [<FontIcon icon="iconfont icon-github"/>GitHub](https://github.com) and click on the "New" button to create a new repository.

![button to create new repository](https://freecodecamp.org/news/content/images/2024/04/github_new.png)

---

## Setup Your Repository

You should see a new page where you can create the new repo and it should look something like this:

![new repository form page](https://freecodecamp.org/news/content/images/2024/04/new_repo_page.png)

Make sure the name of the repository is the same as your GitHub username, otherwise this won't work.

![after filling the details](https://freecodecamp.org/news/content/images/2024/04/special_note.png)

You can see that after entering your username, there's a new note showing right below the repository name field that says, "this will create a special repository that you can use to add a <FontIcon icon="fa-brands fa-markdown"/>`README.md` to your GitHub profile. Make sure it’s public and initialize it with a README to get started."

The error for the repository name is showing because I already have my profile, you won't face this issue.

So, lets do this. First, keep the GitHub repository public and not private.

Then click on the add a README file checkbox so that after creating the repository, GitHub will automatically add a README file to that repository.

Next, click the "Create repository" button.

After successfully creating the repository, you should be redirected to the repository page, and you should see the <FontIcon icon="fa-brands fa-markdown"/>`README.md` file.

![repository page after successfully creating the repository](https://freecodecamp.org/news/content/images/2024/04/repo_main_page.png)

---

## Add ReadMe Content

Now, click on the "Edit README" button that should be on the right side of the page

Paste the following text into your <FontIcon icon="fa-brands fa-markdown"/>`README.md` file

```md :collapsed-lines title="README.md"
# Hi, I'm <YOUR NAME>! 👋

I am a passionate M.Tech CS student at IIT Kharagpur, driven by a curiosity for technology and a love for writing. My journey involves delving into the world of computer science, exploring new ideas, and sharing my insights with the community.

![<username>'s Stats](https://github-readme-stats.vercel.app/api?username=<username>&theme=vue-dark&show_icons=true&hide_border=true&count_private=true)

---

## 🚀 About Me

- 🔭 I'm currently pursuing my Master's in Computer Science at IIT Kharagpur.
- 📝 I write in-depth, long-form articles on my website [theenthusiast.dev](https://theenthusiast.dev), accumulating over 20k views within just 2 months.
- 🌐 Proud member of the [Hackernoon Blogging Fellowship](https://hackernoon.com/), contributing to the tech community.
- ✍️ Content Writer at [freeCodeCamp](https://freecodecamp.org/), gearing up to share valuable insights with the global coding community.

---

## My Articles
- [JavaScript Engine and Runtime Explained](https://freecodecamp.org/news/javascript-engine-and-runtime-explained/)


---

## Tech Stack
[![My Skills](https://skillicons.dev/icons?i=js,html,css,wasm)](https://skillicons.dev)

---

## 🌱 Currently Exploring

- 🚀 Learning Full Stack Web Development
  - Exploring the ins and outs of React and Redux for dynamic front-end experiences.
  - Navigating through the world of React Router for seamless page transitions.
  - Styling with Tailwind CSS to create modern and responsive user interfaces.
  - Building server-side applications with Django, a powerful Python web framework.
  - Diving into PostgreSQL for efficient and scalable database management.

 ## 🏆 Achievements

- 🌟 Completed Hacktoberfest 2023 - Contributed to open source projects and celebrated the spirit of collaboration.


---

## 📬 Get in Touch

- Connect with me on [Twitter](https://twitter.com/introvertedbot)
- Read more of my articles on [theenthusiast.dev](https://theenthusiast.dev)

Thanks for stopping by! Let's connect and explore the fascinating world of technology together. 🚀



<!--

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
```

In the above content, there are three places where you need to add your username:

- The first one is in the first line: put your name instead of `<YOUR NAME>`
- In the second statement, there are two places where you should put your username instead of `<username>`
- In the tech stack section I have added very few tech stacks just for this tutorial but you can add even more by adding the names of the tech. Head over to their [docs to learn more about adding other icons (<FontIcon icon="iconfont icon-github"/>`tandpfun/skill-icons`)](https://github.com/tandpfun/skill-icons?tab=readme-ov-file#example).

Also, modify all the other fields according to your needs, all the information is personal so you have to edit most of the information. I have given my information here, so that you'll just need to fill up your details and get an updated profile pretty fast.

---

## Commit Changes

![committing changes](https://freecodecamp.org/news/content/images/2024/04/commit_changes_confirmation_modal.png)

That's it. Click on "Commit changes" and you should have a great looking GitHub profile page.

Head over to your Profile page by replacing your username in the following URL `https://github.com/<username>` and you should see your updated GitHub profile page.

![My profile page looks like this](https://freecodecamp.org/news/content/images/2024/04/final_profile_page.png)

Now your GitHub profile page is personalized and ready to impress!

Share your updated profile on Twitter or LinkedIn and tag me—I'd love to check them out.

If you have any feedback or questions, feel free DM me on [twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`introvertedbot`)](https://twitter.com/introvertedbot) or [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`sahil-mahapatra`)](https://linkedin.com/in/sahil-mahapatra)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create Your Personalized  GitHub Profile Page - GitHub Profile README Guide",
  "desc": "Have you ever wanted to spruce up your GitHub profile page and make it stand out? Well, you're in luck!  With just a few simple steps, you can create a personalized GitHub profile that showcases your skills, projects, and personality. Let's dive in. ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/create-personalized-github-profile-page.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
