---
lang: en-US
title: "How to Use GitHub Search Like a Pro"
description: "Article(s) > How to Use GitHub Search Like a Pro"
icon: iconfont icon-github
category:
  - DevOps
  - Github
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - github
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use GitHub Search Like a Pro"
    - property: og:description
      content: "How to Use GitHub Search Like a Pro"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-github-search-like-a-pro.html
prev: /devops/github/articles/README.md
date: 2026-05-22
isOriginal: false
author:
  - name: Rajdeep Singh
    url: https://freecodecamp.org/news/author/officialrajdeepsingh/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/0e61e7e1-619c-4a66-b994-6a888100d0dd.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use GitHub Search Like a Pro"
  desc="GitHub is a popular code collaboration platform for developers. You can use it to share, manage, and contribute to open-source codebases, save and work on your own code, and more. And to be a more eff"
  url="https://freecodecamp.org/news/how-to-use-github-search-like-a-pro"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/0e61e7e1-619c-4a66-b994-6a888100d0dd.png"/>

GitHub is a popular code collaboration platform for developers. You can use it to share, manage, and contribute to open-source codebases, save and work on your own code, and more.

And to be a more effective GitHub user, you'll need to know how to search within the platform.

This involves using qualifiers to efficiently filter through millions of repositories and billions of lines of code. Precise queries help you locate specific function definitions, projects, people, issues, pull requests, code, security vulnerabilities, or contribution opportunities.

In this tutorial, you'll learn how to use GitHub search, whether you're a beginner or a pro developer.

To enhance your learning, I've divided this article into two sections:

1. Basic Search Functionality
2. Advanced Search Functionality

---

## Basic Search Functionality

Basic search here refers to the most commonly used search functionalities that are fast and easy to use.

To start, click the GitHub search icon, type your query, and GitHub will display your results. With basic search, you can search globally across all of GitHub or narrow your search to a specific repository or organization.

### How to Search Globally

To search on GitHub, click the search tab or press the `/` key to open the search bar.

![Open search bar input filed on github](https://cdn.hashnode.com/uploads/covers/5dd3ab9cc4d1027248f20c91/32ae027d-4d34-4200-b2ae-da12ec67afcf.png)

To search globally (across all of GitHub), open the search input, type your query, and select "Search all of GitHub" from the dropdown menu or press enter.

![global search on github](https://cdn.hashnode.com/uploads/covers/5dd3ab9cc4d1027248f20c91/1de2af9b-c281-463a-ac60-08322d121e84.png)

After clicking the "Search all of GitHub" button, you'll be directed to a page displaying all results related to your query.

![display all results related to your query in Github](https://cdn.hashnode.com/uploads/covers/5dd3ab9cc4d1027248f20c91/8ea8f5cb-04e8-4376-9e15-f6258f216cc6.png)

### How to Do a Scoped Search (for a Particular Repo or Organization)

To search within a specific repository or organization, go to the repository or organization page, enter your query in the search field at the top, and press Enter.

For instance, if you're searching for a file name starting with "pnpm" in the [<VPIcon icon="iconfont icon-github"/>`frontendweb3/frontendweb`](https://github.com/frontendweb3/frontendweb) repository:

![Scoped Search in Github](https://cdn.hashnode.com/uploads/covers/5dd3ab9cc4d1027248f20c91/5b714b9d-157c-4c0f-a710-fef3fa2365d1.png)

In the search bar, you'll see four suggestions: the first is "Search in this repository," the second is "Search in this organization," the third is "Search all of GitHub," and the last is the code section "Display similar files." Clicking a file opens it in the GitHub web editor.

---

## Advanced Search Functionality

In addition to the GitHub search bar, you can search on GitHub using the [<VPIcon icon="iconfont icon-github"/>advanced search ](https://github.com/search/advanced) page.

GitHub's advanced search allows you to find specific code, repositories, and issues. You can filter your searches by factors such as the number of stars, owners, forks, followers, programming language, and creation dates.

As you complete the advanced search fields, your query is automatically generated in the top search bar, and you can click on the Search button.

![GitHub advanced search page](https://cdn.hashnode.com/uploads/covers/5dd3ab9cc4d1027248f20c91/518efaf5-f3c0-48bb-a374-e00d31fc5a84.png)

For a basic example, let's search for **React** on GitHub, including recent pull and push requests, issues, commits, discussions, and so on, related to ReactJS. We can use GitHub's advanced search functionality for this. Type "React" in the first input field as text and add the owner, in this case, Facebook, to find everything related to ReactJS in the Facebook organization or user.

![Basic example of GitHub's advanced search functionality.](https://cdn.hashnode.com/uploads/covers/5dd3ab9cc4d1027248f20c91/df1c1c8b-3bff-4f77-a008-4659280d9c92.png)

After clicking on the Search button, you should see the following results page:

![Show the query result of GitHub's advanced search](https://cdn.hashnode.com/uploads/covers/5dd3ab9cc4d1027248f20c91/b6c638c5-15a1-491e-9304-a6b070203773.png)

As you can see, GitHub's advanced search functionality lets you find specific code, repositories and issues using a powerful set of qualifiers and options. Let's talk more about qualifiers now.

### Search Qualifiers

You can filter your search directly using various key qualifiers. We can divide these qualifiers into different sections:

#### Advanced Options

- **From these owners**: type the specific user's or organization's name, such as GitHub, Atom, Electron, Octokit, and so on.
- **In these repositories**: type the specific user's or organization's name, such as Facebook/React, Vercel/Next.js, and so on.
- **Created on these dates**: Specify the repository creation date, for example `>2016-04-29`, `=2016-04-29`, etc., to learn more, check out the [<VPIcon icon="iconfont icon-github"/>Query for dates](https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax#query-for-dates) documentation.
- **Written in this language**: Select the specific language that matches repositories from lists: JavaScript, TypeScript, Rust, and so on, or what it’s written in.

#### Repository Options

- **With this many stars**: Type the number of stars in the `stars:` field to filter and find repositories by star count. You can apply comparisons like >1000 (more than 1000 stars) or =1000 (exactly 1000 stars) to narrow results based on popularity.
- **With this many forks**: Type the number of forks to filter and find repositories by fork count. You can apply comparisons like 100..1000 (find repos with 100 to 1000 forks), >1000 (more than 1000 forks), or =1000 (exactly 1000 forks) to narrow results based on popularity.
- **Of this size**: type the repository size in KB to filter and find repositories, for example, size of 10000 KB
- **Pushed to**: type the date to filter and find repositories, for example >2013-02-01 matches repositories with the word "react" that were pushed to after January 2013.
- **With this license**: Select the license to filter or find repositories based on license, for example, those licensed under the Apache License 2.0.

#### Code Options

- **With this extension**: type the extension, such as rb, py, or jpg, that you want to search on GitHub.
- **In this path**: Type the path to filter on GitHub to search for files by their location within a repository. For example, you can find a header.tsx file specifically inside the <VPIcon icon="fas fa-folder-open"/>`./components` folder by combining filename: with path:.
- **With this file name**: Type the file name, such as app, footer, or header, that you want to search on GitHub.

#### Issue Options

- **In the state**: Select the issue state (whether the issue is open or closed), for example, libraries `state:open mentions:rajdeep` matches open issues that mention @rajdeep with the word "libraries," or `language:JavaScript state:open` matches open issues in JavaScript repositories.
- **With this many comments**: Enter the comment number based on the comment count. You can filter the issue, for example, `state:closed comments:>100` matches closed issues with more than 100 comments, or `comments:500..1000` matches issues with comments ranging from 500 to 1,000.
- **With the labels**: Enter the label to filter or narrow your results by labels. Since issues can have multiple labels, you can list and add multiple label qualifiers for each issue.<br/>For example, first, `label:bug label:resolved` matches issues with the labels "bug" and "resolved." Second, `label:bug,resolved` matches issues with the label "bug" or the label "resolved." Third, example `broken in:body -label:bug label:priority` matches issues with the word "broken" in the body, that lack the label "bug," but do have the label "priority."
- **Opened by the author**: Enter the name or username to filter or find issues created by a user or integration account, or filter the issues based on the author.<br/>For example, `author:rajdeep` matches issues with the word "fixed" that were created by @rajdeep, or `author:octocat` matches issues created by the account named "octocat."
- **Mentioning the users**: Enter the name or username to find issues that mention the user. For example, fixed mentions:rajdeep matches issues with the word "fixed" that mention @rajdeep in the issue.
- **Assigned to the users**: Enter the name or username to find or filter issues based on the specific username assigned to the issue. For example, `state:open assignee:rajdeep` matches open issues that are assigned to @rajdeep.
- **Updated before the date**: Enter the date, filter issues based on the time of creation, or when they were last updated.<br/>For example `language:c# created:<2011-01-01 state:open` matches open issues that were created before 2011 in repositories written in C# or `weird in:body updated:>=2013-02-01` matches issues with the word "weird" in the body that were updated after February 2013.

#### User Options

- **With this full name**: Enter a full name to filter repositories whose name includes “rajdeep singh” on GitHub.
- **From this location**: Enter a location to find users on GitHub. For example, `location:russia language:javascript` returns users based in Russia whose repositories are primarily written in JavaScript.
- **With this many followers**: Enter a follower count to filter users by popularity. For example, `followers:>=1000` finds users with 1,000 or more followers, while `followers:1..10 rajdeep` returns users with 1–10 followers whose name includes “rajdeep” on GitHub.
- **With this many public repositories**: Enter a repository count to filter users by the number of public repositories they have. For example, repos:>10 finds users with more than 10 repositories, while repos:10..30 returns users who have between 10 and 30 public repositories on GitHub.
- **Working in this language**: Select the language to find users based on the primary languages of their repositories. For example, `language:javascript location:russia` returns users in Russia whose repositories are mostly written in JavaScript, while `language:javascript fullname:rajdeep` finds users with JavaScript repositories whose full name includes "rajdeep" on GitHub.

#### Wiki Options

- **Updated before the date**: Enter a date to filter wiki pages containing “next.js” that were last updated after `2016-01-01` in your GitHub wiki.

The best way to use advanced search qualifiers is to combine one or multiple qualifier/search options to achieve the best result.

### How to Save Searches

I don't often use GitHub Advanced Search, but I used it to find open-source projects to learn from and contribute to. If you take a moment to fill in the information in GitHub Advanced Search, you can save the search for future use:

![Save the query result to GitHub](https://cdn.hashnode.com/uploads/covers/5dd3ab9cc4d1027248f20c91/323b109b-4a7d-4aaa-a7d0-c4e15cdd1f19.png)

Enter the name and click the "Create saved search" button:

![Follow these steps to save the query results on GitHub.](https://cdn.hashnode.com/uploads/covers/5dd3ab9cc4d1027248f20c91/776a4684-ded9-433b-a35f-8cb28bec3a85.png)

You can show a list of all your saved searches:

![List of saved query results on GitHub.](https://cdn.hashnode.com/uploads/covers/5dd3ab9cc4d1027248f20c91/33c4f651-d325-4ea1-87a6-9663d3932881.png)

### How to Manage Saved Searches on GitHub

![Manage Saved Searches on GitHub](https://cdn.hashnode.com/uploads/covers/5dd3ab9cc4d1027248f20c91/3d9b99d8-9763-4490-8e7f-4669c1b95ece.png)

To manage a saved search, open the search bar and type "saved:" in the search bar, then click the "Manage saved searches" button.

![Delete and edit the saved searches on GitHub.](https://cdn.hashnode.com/uploads/covers/5dd3ab9cc4d1027248f20c91/68616625-8c23-4f3d-90d2-e6e6b7b6568d.png)

To edit a saved search, click the pencil icon next to it. To delete a saved search, click the trash icon.

### Why Do We Need GitHub Advanced Search?

As mentioned, GitHub Advanced Search helps you find the best issues to contribute to in open source repositories.

For example, I'm an expert in Next.js and React.js, and I can use GitHub Advanced Search to locate suitable issues in open-source projects for contribution.

Even as a beginner developer, you can use GitHub Advanced Search to find "good first issues" labeled by maintainers, making it easier to contribute.

---

## Conclusion

GitHub Advanced Search is versatile. t's not just for searching but also for researching recent issues, pull requests, and push requests that may be related to your query, repository, user, or anything else. My favorite use is finding open-source contribution opportunities with GitHub Advanced Search.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use GitHub Search Like a Pro",
  "desc": "GitHub is a popular code collaboration platform for developers. You can use it to share, manage, and contribute to open-source codebases, save and work on your own code, and more. And to be a more eff",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-github-search-like-a-pro.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
