---
lang: en-US
title: "How to Integrate a Group Chat Feature Using Stream Chat Messaging"
description: "Article(s) > (4/4) How to Build a Social Learning Platform using Next.js, Stream, and Supabase" 
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
      content: "Article(s) > (4/4) How to Build a Social Learning Platform using Next.js, Stream, and Supabase"
    - property: og:description
      content: "How to Integrate a Group Chat Feature Using Stream Chat Messaging"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase/how-to-integrate-a-group-chat-feature-using-stream-chat-messaging.html
next: /freecodecamp.org/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase/README.md#next-steps
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
  "title": "How to Build a Social Learning Platform using Next.js, Stream, and Supabase",
  "desc": "Social media and real-time communication have transformed how people interact, making it easier to share ideas, collaborate, and learn from others, regardless of location. From professional networks to online study groups, these platforms allow vario...",
  "link": "/freecodecamp.org/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Social Learning Platform using Next.js, Stream, and Supabase"
  desc="Social media and real-time communication have transformed how people interact, making it easier to share ideas, collaborate, and learn from others, regardless of location. From professional networks to online study groups, these platforms allow vario..."
  url="https://freecodecamp.org/news/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase#heading-how-to-integrate-a-group-chat-feature-using-stream-chat-messaging"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1741009946459/dba65929-1b65-4278-9601-4d047042753a.png"/>

In this section, you will learn how to integrate a community chat feature into the application. Each instructor will create a group chat for their followers (students). The chat will allow students to interact with one another and share documents, video links, text, images, and so on using the [<VPIcon icon="fas fa-globe"/>Stream Chat Messaging SDK](https://getstream.io/chat/docs/sdk/react/).

---

## Setting Up the Stream Chat SDK in Next.js

Add the following code snippet to the <VPIcon icon="iconfont icon-typescript"/>`stream.action.ts` file:

```ts title="stream.action.ts"
import { StreamChat } from "stream-chat";
import { getUserSession } from "./auth";

//👇🏻 creates a StreamChat instance
const serverClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);

//👇🏻 creates a token
export async function createToken(): Promise<string> {
  const { user } = await getUserSession();
  if (!user) throw new Error("User is not authenticated");
  return serverClient.createToken(user.id);
}
```

The code snippet above initializes a Stream Chat instance using its API key and secret key. It also includes a function that generates and returns a token based on the current user's ID.

To ensure that only instructors can create a community channel, follow these steps:

1. Retrieve all the channels where the instructor is a member.
2. If no channels are found (i.e., the returned array is empty), the instructor can create a new channel.
3. An error message is displayed if a channel already exists, informing the instructor that they can only have one community channel.

```ts :collapsed-liness
export async function createChannel({
  userId,
  data,
}: {
  userId: string;
  data: { name: string; imageUrl: string };
}) {
  try {
    //👇🏻 retrieve channel list
    const channels = await serverClient.queryChannels(
      {
        members: { $in: [userId] },
        type: "messaging",
      },
      { last_message_at: -1 }
    );
    //👇🏻 instructor already has a channel
    if (channels.length > 0) {
      return {
        success: false,
        error: "You already have an existing channel",
        id: channels[0].id,
      };
    }
    //👇🏻 declare channel type
    const channel = serverClient.channel("messaging", `channel-${userId}`, {
      name: data.name,
      image: data.imageUrl,
      members: [userId],
      created_by_id: userId,
    });
    //👇🏻 create a channel
    await channel.create();
    return { success: true, error: null, id: channel.id };
  } catch (err) {
    return { success: false, error: "Failed to create channel", id: null };
  }
}
```

The code snippet above [<VPIcon icon="fas fa-globe"/>creates a public channel](https://getstream.io/chat/docs/react/creating_channels/), meaning anyone can join at any time. Also, the channel name is linked to the instructor's ID, ensuring it remains unique to that instructor.

To retrieve the instructor's channel link, add a function inside the <VPIcon icon="iconfont icon-typescript"/>`stream.action.ts` file. This function should return the channel URL (channel ID), allowing members to access the channel whenever needed. Then, you can display this link on the instructor's profile for easy access.

```ts
export async function getInstructorChannel(userId: string) {
  try {
    const channels = await serverClient.queryChannels(
      {
        members: { $in: [userId] },
        type: "messaging",
      },
      { last_message_at: -1 }
    );
    return `/chat/${channels[0].id}`;
  } catch (err) {
    return null;
  }
}
```

Finally, to grant users access to the channel page, check if the user is already a member. If not, add the student as a member before rendering the chat page. This ensures that only authorized users can participate in the conversation.

```ts
export async function addUserToChannel(channelId: string, userId: string) {
  try {
    //👇🏻 check if student is already a member
    const channels = await serverClient.queryChannels(
      {
        members: { $in: [userId] },
        type: "messaging",
        id: channelId,
      },
      { last_message_at: -1 }
    );
    //👇🏻 student already a member (success - show chat page)
    if (channels.length > 0) {
      return {
        success: true,
        message: "Already a member",
        id: channels[0].id,
        error: null,
      };
    }
    //👇🏻 get channel by ID (student not a member)
    const channel = serverClient.channel("messaging", channelId);
    //👇🏻 add student to channel as a member
    await channel.addMembers([userId]);
    //👇🏻 student now a member (success - show chat page)
    return {
      success: true,
      error: null,
      id: channel.id,
      message: "Member just added",
    };
  } catch (error) {
    console.error("Error adding user to channel:", error);
    return {
      success: false,
      error: "Failed to add user to channel",
      id: null,
      message: null,
    };
  }
}
```

![The Stream Chat page using the Stream Call UI components](https://cdn.hashnode.com/res/hashnode/image/upload/v1740660564180/474b342a-7d07-415e-b1d7-a213ed807b67.gif)

---

## Stream Chat UI Components

Inside the `(stream)` folder, create a <VPIcon icon="fas fa-folder-open"/>`chat/[id]/`<VPIcon icon="fa-brands fa-react"/>`page.tsx` file. This page retrieves the channel ID from the page route and checks whether the user is already a channel member. If not, the user is automatically added as a member before displaying the chat interface.

Copy the following code snippet into the <VPIcon icon="fas fa-folder-open"/>`chat/[id]/`<VPIcon icon="fa-brands fa-react"/>`page.tsx` file:

```tsx :collapsed-lines title="chat/[id]/page.tsx"
"use client";
import { useCallback, useEffect, useState } from "react";
import StreamChat from "./../(components)/StreamChat";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [joinChannel, setJoinChannel] = useState<boolean>(false);
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const fetchUserData = useCallback(async () => {
    // 👉🏻 get user object & channel id from useParams
    // 👉🏻 execute the addUserToChannel() function declared in the previous section
    // 👉🏻 update the joinChannel React state
  }, [params.id, router]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (!userData) {
    return null;
  }

  return (
    <>{joinChannel ? <StreamChat user={userData} /> : <ConfirmMember />}</>
  );
}

function ConfirmMember() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold mb-4 text-blue-500'>
        You are not a member of this channel
      </h1>
      <p className='text-lg mb-4'>
        Please wait while we add you to the channel
      </p>

      <div className='loader'>
        <Loader2 size={48} className='animate-spin' />
      </div>
    </div>
  );
}
```

This code snippet ensures that a user is either already a member of the channel or is added before displaying the chat interface. The `StreamChat` component is a custom React component that contains all the Stream Chat UI elements. The `ConfirmMember` component shows a loading message while the user is added to the channel.

Create a StreamChat component and add the following imports to the file:

```tsx
"use client";
import { useCallback } from "react";
//👇🏻 -- Stream chat UI components
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  useCreateChatClient,
} from "stream-chat-react";
// -- end of Stream chat UI components

//👇🏻 -- allows members to send emoji within the chat
import { EmojiPicker } from "stream-chat-react/emojis";
import { init, SearchIndex } from "emoji-mart";
import data from "@emoji-mart/data";
init({ data });
// -- end of emoji imports
//👇🏻 -- create token server action
import { createToken } from "../../../../../actions/stream.action";
```

Declare the StreamChat component as follows:

```tsx
export default function StreamChat({ user }: { user: UserData }) {
  const tokenProvider = useCallback(async () => {
    return await createToken();
  }, []);

  const filters = { members: { $in: [user.id] }, type: "messaging" };
  const options = { presence: true, state: true };

  const client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
    tokenOrProvider: tokenProvider,
    userData: { id: user.id, name: user.name, image: user.image },
  });

  if (!client) return <div>Loading...</div>;

  return (
   // -- Stream Chat UI components --
  )
}
```

The `useCreateChatClient` hook creates a Stream chat client using the Stream API key, the user's data, and the token created using the `createToken()` function declared earlier in this section.

Finally, return the chat UI from the StreamChat component:

```tsx
return (
  <Chat client={client}>
    <div className='chat-container'>
      {/* -- Channel List -- */}
      <div className='channel-list'>
        <ChannelList
          sort={{ last_message_at: -1 }}
          filters={filters}
          options={options}
        />
      </div>

      {/* -- Messages Panel -- */}
      <div className='chat-panel'>
        <Channel EmojiPicker={EmojiPicker} emojiSearchIndex={SearchIndex}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
        </Channel>
      </div>
    </div>
  </Chat>
);
```

From the code snippet above:

- [<VPIcon icon="fas fa-globe"/>**Chat** component](https://getstream.io/chat/docs/sdk/react/components/core-components/chat/) initializes the Stream Chat client and wraps the entire Chat page.
- [<VPIcon icon="fas fa-globe"/>**ChannelList**](https://getstream.io/chat/docs/sdk/react/components/core-components/channel_list/) shows available chat channels.
- [<VPIcon icon="fas fa-globe"/>**Channel**](https://getstream.io/chat/docs/sdk/react/components/core-components/channel/) sets up an active chat session.
- **Window** contains the message display and input areas.
- **ChannelHeader**, [<VPIcon icon="fas fa-globe"/>**MessageList**](https://getstream.io/chat/docs/sdk/react/components/core-components/message_list/), and **MessageInput** provide a fully functional chat interface.

![A screenshot of a group chat named "UI Design Students" with 2 members, showing a brief conversation with messages "Hello" and "Hi," timestamped at 11:33 AM.](https://cdn.hashnode.com/res/hashnode/image/upload/v1740660921805/65b237a8-584a-4d71-88ed-fe7edc68b737.png)

Congratulations! You've completed this tutorial. The [source code for this article is also available on GitHub (<VPIcon icon="iconfont icon-github"/>`dha-stix/stream-lms`)](https://github.com/dha-stix/stream-lms).
