---
lang: en-US
title: "How to Add Live Chat to Your Applications with Rocket.chat"
description: "Article(s) > How to Add Live Chat to Your Applications with Rocket.chat"
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
      content: "Article(s) > How to Add Live Chat to Your Applications with Rocket.chat"
    - property: og:description
      content: "How to Add Live Chat to Your Applications with Rocket.chat"
    - property: oNode.jsg:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/add-live-chat-to-your-applications-with-rocketchat.html
prev: /programming/js-node/articles/README.md
date: 2025-04-07
isOriginal: false
author:
  - name: Spruce Emmanuel
    url : https://freecodecamp.org/news/author/Spruce/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744032217209/1ad8ea61-a8bd-4bea-9bec-152e52db7377.png
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
  name="How to Add Live Chat to Your Applications with Rocket.chat"
  desc="The fastest way to gather valuable information about your site’s users is still by talking to them. And what better way to do this than by adding a chat system to your app? For my case, I just wanted to add a chat system to my portfolio website so I"
  url="https://freecodecamp.org/news/add-live-chat-to-your-applications-with-rocketchat"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744032217209/1ad8ea61-a8bd-4bea-9bec-152e52db7377.png"/>

The fastest way to gather valuable information about your site’s users is still by talking to them. And what better way to do this than by adding a chat system to your app?

For my case, I just wanted to add a chat system to my portfolio website so I could get valuable info from potential employers and clients. I ended up building something like this:

![Live chat demo screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1743755398731/f7bce275-ed01-4e7f-98b6-0eed955dc428.png)

---

## Why Rocket.Chat, you may ask?

Rocket.Chat is a great option because:

- **Open Source:** It’s free and customizable.
- **Comprehensive APIs:** Their APIs make integration simple.
- **Flexible Hosting:** Self-host your own or use their cloud version with a free trial (which we’ll use here).

:::: note Prerequisites

Before you continue, there are a few things you should know and have:

- A running Rocket.Chat server (either self-hosted or on Rocket.Chat Cloud). Here, I'll show you how to set up one with Rocket.Chat Cloud.
- A working knowledge of JavaScript fundamentals.

:::

---

## Getting Started

First things first, let's set up a Rocket.Chat server. Again, you can either self host your own or use their cloud version. And don't worry - you don't have to pay anything right now or for this tutorial, as they provide a 30 day free trial.

### Step 1: Set Up the Rocket.Chat Server

Head over to [<FontIcon icon="fas fa-globe"/>https://cloud.rocket.chat](https://cloud.rocket.chat) and create your free account.

Once you're logged in, click on the **"Change to SaaS trial"** button to launch a cloud-hosted server.

![Change to SaaS trial button](https://cdn.hashnode.com/res/hashnode/image/upload/v1743755542942/1b57e01d-2338-4af7-9a77-9140f65bb1f7.png)

Next, create a Cloud Workspace by providing your workspace name, URL, and server region.

![Rocket.Chat Cloud Workspace screenshot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sdorooqpo032qjibt1vp.png)

It will take a little while to set up. When it’s done, you should see something similar to this:

![Rocket.Chat dashboard screenshot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rcpvsdl49rw9t7bv7vfn.png)

Now copy your server URL—it should look like this: `https://example.rocket.chat`.

### Step 2: Configure the Rocket.Chat Server

Before diving into the code, we need to configure our server so we can use the livechat API.

To start, open your Rocket.Chat server and click on the menu button, then click on **Omnichannel**.

![Rocket.Chat Omnichannel menu screenshot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8cql8hzejwep1zhxxhgg.png)

Click on **Agents** on the sidebar and add yourself as an agent.

![Rocket.Chat Omnichannel Agents section screenshot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zsnnbjsbo64h8d5zya8u.png)

Next, click on **Departments** and create a Department. I'll call mine **Chats**.

![Rocket.Chat Omnichannel Departments section screenshot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ej4n16odg3iy578ltna0.png)

Now you need to configure a few things about the Livechat widget:

- Make sure you turn on the offline form and set the Email Address to Send Offline Messages.
- Also, configure your business hours to the times you'll be available.

### Step 3: Register the Visitor

Next, we need to register the visitor and create a room for them. To do this, you need to collect the visitor's name and email and generate a random unique ID.

#### How to Register the Visitor

First, we need to register the visitor in the server. We need their name, email, and token. You send those to this endpoint: `/api/v1/livechat/visitor`. Here's an example code that you might send from your backend:

```js
const body = {
  name: "Visitor Name",          // Replace with the visitor's name
  email: "visitor@example.com",  // Replace with the visitor's email
  token: "unique-visitor-token"  // Replace with a generated unique token
};

fetch(`${process.env.ROCKETCHAT_URL}/api/v1/livechat/visitor`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
  body: JSON.stringify(body)
})
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log("Visitor registered:", data);
    } else {
      console.error("Visitor registration failed:", data);
    }
  })
  .catch(error => console.error("Error in visitor registration:", error));
```

#### How to Create or Retrieve the Chat Room

After you've registered the visitor, you need to create a room for them so they can send you messages and you can respond.

Call this endpoint `/api/v1/livechat/room` with the visitor token as a query parameter. If the visitor already has a room, it’ll be returned. If not, a new one will be created. This is how you can make that request from your backend:

```js
const token = "unique-visitor-token"; // Replace with the actual visitor token

fetch(`${process.env.ROCKETCHAT_URL}/api/v1/livechat/room?token=${token}`, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
})
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log("Room retrieved:", data);
    } else {
      console.error("Failed to retrieve room:", data);
    }
  })
  .catch(error => console.error("Error in retrieving room:", error));
```

#### How to Retrieve Livechat Configuration

Lastly, we need to get the info about the visitor and the agent we registered. Use this API endpoint to get the visitor token, room ID, and agent info. You can use it to check if the agent is online before trying to connect to the WebSocket.

```js
const token = "unique-visitor-token"; // Replace with the actual visitor token
const url = `${process.env.ROCKETCHAT_URL}/api/v1/livechat/config?token=${token}`;

fetch(url, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
})
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log("Livechat config:", data);
    } else {
      console.error("Failed to get livechat config:", data);
    }
  })
  .catch(error => console.error("Error fetching livechat config:", error));
```

### Step 4: Create the Connection to WebSocket

To establish the live chat experience, we need to open a WebSocket connection to Rocket.Chat and handle messaging.

#### WebSocket Connection Example

First, open the WebSocket like this:

```js
const rocketChatSocket = new WebSocket("ws://example.rocket.chat/websocket");
```

Then connect:

```js
const connectRequest = {
  msg: "connect",
  version: "1",
  support: ["1", "pre2", "pre1"]
};
rocketChatSocket.send(JSON.stringify(connectRequest));
```

You can keep the connection alive by responding to the server's `"ping"` messages with a `"pong"`.

```js
rocketChatSocket.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);
    if (data.msg === "ping") {
      console.log("Received ping from server, sending pong");
      rocketChatSocket.send(JSON.stringify({ msg: "pong" }));
    }
  } catch (error) {
    console.error("Error parsing WebSocket message:", error);
  }
};
```

You can subscribe to the room created for the visitor. Just use the visitor’s token and room ID from the previous sections.

```js
const subscribeRequest = {
  msg: "sub",
  id: "unique-subscription-id", // Replace with your unique ID
  name: "stream-room-messages",
  params: [
    "fetched-room-id", // Replace with the room ID variable
    {
      useCollection: false,
      args: [
        { visitorToken: "visitor-token" } // Replace with your visitor token variable
      ],
    },
  ],
};
rocketChatSocket.send(JSON.stringify(subscribeRequest));
```

You can also listen for incoming messages. Here’s how you can process new messages as they arrive:

```js
rocketChatSocket.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);
    if (
      data.msg === "changed" &&
      data.collection === "stream-room-messages"
    ) {
      // Handle new messages
      if (data.fields && data.fields.args && data.fields.args.length > 0) {
        const newMessage = data.fields.args[0];
        // Assume isValidChatMessage is defined to validate the message format
        if (isValidChatMessage(newMessage)) {
          // Update your messages list here
          console.log("New message received:", newMessage);
        }
      }
    }
  } catch (error) {
    console.error("Error parsing WebSocket message:", error);
  }
};
```

What if you want to send livechat messages? Just use this code to do so:

```js
const sendMessageRequest = {
  msg: "method",
  method: "sendMessageLivechat",
  params: [
    {
      _id: "unique-message-id",  // Replace with a generated unique ID for the message
      rid: "room-id",            // Replace with the actual room ID
      msg: "Your message here",  // Replace with the message text you want to send
      token: "visitor-token"     // Replace with the actual visitor token
    }
  ],
  id: "unique-request-id"        // Replace with a unique request ID
};

rocketChatSocket.send(JSON.stringify(sendMessageRequest));
```

In your actual implementation, you can integrate these examples into your backend or client-side logic as needed.

You can take a look at the [source code (<FontIcon icon="iconfont icon-github"/>`iamspruce/resume`)](https://github.com/iamspruce/resume) for how I implemented mine with Next.js or you can look at the live [<FontIcon icon="fas fa-globe"/>demo](https://resume-alpha-jet-70.vercel.app).

---

## Conclusion

Adding a Livechat feature to your web apps shouldn't be hard. With Rocket.Chat's livechat API, you can quickly integrate chat functionality and gain valuable insights from your users. I even built an [SDK wrapper (<FontIcon icon="fa-brands fa-npm"/>`rocketchat-livechat-sdk`)](https://npmjs.com/package/rocketchat-livechat-sdk) to make it easier to use.

Now it’s your turn! Try out Rocket.Chat’s API and build your own live chat system. You can explore more in the Rocket.Chat [<FontIcon icon="fas fa-globe"/>documentation](https://docs.rocket.chat).

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Add Live Chat to Your Applications with Rocket.chat",
  "desc": "The fastest way to gather valuable information about your site’s users is still by talking to them. And what better way to do this than by adding a chat system to your app? For my case, I just wanted to add a chat system to my portfolio website so I",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/add-live-chat-to-your-applications-with-rocketchat.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
