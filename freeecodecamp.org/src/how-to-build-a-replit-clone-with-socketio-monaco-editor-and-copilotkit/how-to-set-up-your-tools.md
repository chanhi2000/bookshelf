---
lang: en-US
title: "How to Set Up Your Tools"
description: "Article(s) > (2/6) How to Build a Replit Clone with Socket.io, Monaco Editor, and Copilotkit" 
category:
  - Node.js
  - Next.js
  - MongoDB
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
  - mongodb
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (2/6) How to Build a Replit Clone with Socket.io, Monaco Editor, and Copilotkit"
    - property: og:description
      content: "How to Set Up Your Tools"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-replit-clone-with-socketio-monaco-editor-and-copilotkit/how-to-set-up-your-tools.html
date: 2025-02-21
isOriginal: false
author:
  - name: Prankur Pandey
    url : https://freecodecamp.org/news/author/prankurpandeyy/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740064335866/a058fbf3-2d89-4e95-9d3b-07224f3985be.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Build a Replit Clone with Socket.io, Monaco Editor, and Copilotkit",
  "desc": "I’ve been coding for about a decade now. And over the years, I’ve tried my fair share of development tools—especially IDEs like Sublime Text, Atom, and even NetBeans back in my college days. But when VS Code came along, it completely changed the game...",
  "link": "/freecodecamp.org/how-to-build-a-replit-clone-with-socketio-monaco-editor-and-copilotkit/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Replit Clone with Socket.io, Monaco Editor, and Copilotkit"
  desc="I’ve been coding for about a decade now. And over the years, I’ve tried my fair share of development tools—especially IDEs like Sublime Text, Atom, and even NetBeans back in my college days. But when VS Code came along, it completely changed the game..."
  url="https://freecodecamp.org/news/how-to-build-a-replit-clone-with-socketio-monaco-editor-and-copilotkit#heading-how-to-set-up-your-tools"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/author/prankurpandeyy/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740064335866/a058fbf3-2d89-4e95-9d3b-07224f3985be.png"/>

Now we’ll go through everything you need to set up the project.

---

## Install Next.js and dependencies:

First, you’ll need to create a Next.js app. Go to the terminal and run the following command:

```sh
npx create-next-app@latest my-next-app
```

Replace `my-next-app` with your desired project name and use TypeScript.

Navigate to the project folder:

```sh
cd my-next-app
```

Start the development server:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn dev
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm run dev
```

:::

Open your browser and navigate to `http://localhost:3000` to see your Next.js app in action.

---

## Install CopilotKit and dependencies

Navigate to the project’s root folder in the terminal and run the following command. This will install all the necessary dependencies for CopilotKit along with other essential packages, such as dotenv, groq-sdk, sandpack, Monaco Editor, Lucide React, Socket and Mongoose.

```sh
npm install @copilotkit/react-ui @copilotkit/react-core
npm install dotenv
npm install groq-sdk
npm install @codesandbox/sandpack-react
npm install @monaco-editor/react
npm install lucide-react
npm install mongoose
npm install socket.io
npm install socket.io-client
```

- **CopilotKit**: This dependency handles all operations and configurations related to CopilotKit.
- **Dotenv**: Used for managing environment variables, and keeping sensitive keys secure within the project.
- **GroqSDK**: Facilitates access to various LLM models through a single API key.
- **CodeSandbox Sandpack (React)**: Provides the ability to display real-time previews of the code.
- **Monaco Editor**: Powers the VSCode-like environment, enabling real-time code editing.
- **Lucide React**: An icon library used to display icons for files and folders.
- **Mongoose**: Manages MongoDB schemas for storing and retrieving data from the database.
- **socket.io:** A very powerful tool for real-time data syncing between client and server.
- **socket.io client**: Extra socket.io client package for data communication.

---

## Set Up the LLM for Action:

This step is crucial for the project, as it involves setting up the LLM (Large Language Model) to convert natural language (plain English) queries into a React framework working code.

There are many LLMs available, each with its unique strengths. Some are free, while others are paid, making the selection process for this project a bit challenging.

After thorough experimentation, I chose the Groq Adapter because:

- It integrates multiple LLMs into a single platform.
- It offers access via a unified API key.
- It’s fully compatible with CopilotKit.

### How to Set Up Groq Cloud

To get started with Groq Cloud, visit its website and either log in if you already have an account or create a new account if you’re new. Once logged in, navigate to the Groq Dashboard.

![This is the homepage of Groq cloud](https://cdn.hashnode.com/res/hashnode/image/upload/v1736352733541/92012af5-b3c4-4277-a50f-834c1900a2de.png)

![Once logged in, a new page will open that’ll look like this](https://cdn.hashnode.com/res/hashnode/image/upload/v1736353229314/67313c60-47b8-4f23-b3c0-e46fcdd5201a.png)

As you can see, the sidebar has an API Keys link. Click on it, and it will open a new page as shown in the image below.

![You can also select any LLM of your choice which is given at the top right before the view code option.](https://cdn.hashnode.com/res/hashnode/image/upload/v1736353347970/3406fa54-ddc2-4a00-8b27-22536486fc64.png)

Here, click on the Create API Key button it will open a pop up like you see below.

![Just enter the name of your API key and click on Submit to create a new API key for you. Then copy this API key and paste it inside your `.env` file.](https://cdn.hashnode.com/res/hashnode/image/upload/v1736353563741/cd1a185a-2c77-470a-a5ce-eca564cf524a.png)

To enable seamless access to various LLMs on Groq Cloud, generate an API key by going to the Groq API Keys section. Create a new API key specifically for the LLM, ensuring that it is properly configured.

With the LLM set-up and all components ready, you are now prepared to build the project.

---

## How to setup the database

### Step 1: Create a MongoDB Atlas Account

- Go to the [<FontIcon icon="iconfont icon-mongodb"/>MongoDB Atlas website](https://mongodb.com/cloud/atlas).
- Click on **"Try Free"** or **"Sign Up"**.
- Fill in your details (name, email, password) to create an account.
- Verify your email address by clicking the link sent to your inbox.

![mongodb signup/login page](https://cdn.hashnode.com/res/hashnode/image/upload/v1738858230073/c150c2be-8c4c-4e79-af44-3c0792b764e3.png)

### Step 2: Create a New Project

- After logging in, you will be directed to the MongoDB Atlas dashboard.
- Click on the "New Project" button. This will take you to the Create a Project page.

![mongodb create project page](https://cdn.hashnode.com/res/hashnode/image/upload/v1739188846705/a25e1885-6f7d-4b00-907e-f03e4198d131.png)

- Fill in the Project name and click on the next button, and it will open a new page to show the project owner's information.

![mongodb create project page](https://cdn.hashnode.com/res/hashnode/image/upload/v1739189031867/42ae7fda-2a8e-4bd1-92f3-5c3dae4cc502.png)

- Now click on the Create Project Button. This will take you to the main dashboard of the project where you will get the option to create the database.

![mongodb overview page](https://cdn.hashnode.com/res/hashnode/image/upload/v1739189159505/35ecaac7-bbc4-4ee8-8ba0-196da2eaa311.png)

- Now Click on the Create Button to open a new page with details of deploying your cluster.
- Choose a cloud provider (AWS, Google Cloud, or Azure) and a region closest to your location.
- Select the "Free Tier" (free forever, but with limited resources) or a paid tier for larger projects.

![mongodb cluster selection page](https://cdn.hashnode.com/res/hashnode/image/upload/v1739189327083/46c38f50-519e-473c-b302-b0239ab409f8.png)

- Give your cluster a name (for example, `MyCluster`).
- Click "Create Deployment". It will take a few minutes for the cluster to be provisioned.
- Then It will ask you to connect your cluster to the database through a service. You should see your username and password - keep this somewhere.

![mogodb database connection page](https://cdn.hashnode.com/res/hashnode/image/upload/v1739189624879/68a26902-861a-44b2-8d01-d04ceef55ddc.png)

- Here, you will have to make yourself a database user, so click on the Create Database user button.
- It will take a few seconds to complete this process. Once it’s done, close the pop-up and return back to the dashboard.
- On the dashboard page you can see Get Connection String button. Go on and click on it.

![mongodb db setup page](https://cdn.hashnode.com/res/hashnode/image/upload/v1739189943883/84621420-312f-45e7-995e-18bf68245b1d.png)

- It will open a new popup containing your MongoDB atlas URI. Simply copy the string, put it into your <FontIcon icon="fas fa-file-lines"/>`.env` file and use the password you created in step 14.

![mongodb URL view/hide page](https://cdn.hashnode.com/res/hashnode/image/upload/v1739190119546/2dab2beb-02aa-4450-9272-fb7aac99c313.png)

::: tip Example use case

```sh title=".env"
MONGODB_URI='YOUR MONGODB URL'
```

:::
