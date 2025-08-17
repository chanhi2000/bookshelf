---
lang: en-US
title: "How to Add a Video Conferencing Feature with Stream"
description: "Article(s) > (3/4) How to Build a Social Learning Platform using Next.js, Stream, and Supabase" 
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
      content: "Article(s) > (3/4) How to Build a Social Learning Platform using Next.js, Stream, and Supabase"
    - property: og:description
      content: "How to Add a Video Conferencing Feature with Stream"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase/how-to-add-a-video-conferencing-feature-with-stream.html
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
  url="https://freecodecamp.org/news/how-to-build-a-social-learning-platform-using-nextjs-stream-and-supabase#heading-how-to-add-a-video-conferencing-feature-with-stream"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1741009946459/dba65929-1b65-4278-9601-4d047042753a.png"/>

In this section, I'll walk you through adding a video conferencing feature to the application using the [<FontIcon icon="fas fa-globe"/>Stream Audio & Video SDK](https://getstream.io/video/docs/react/). This will enable instructors to schedule educational sessions and allow students to join the meetings.

---

## Setting Up Stream Video & Audio SDK in Next.js

Create a [<FontIcon icon="fas fa-globe"/>Stream account](https://getstream.io/) and a new organization that holds all your apps.

![Form for creating an organization, with fields for organization name, e-mail address, and website URL, and buttons labeled "Cancel" and "Submit".](https://cdn.hashnode.com/res/hashnode/image/upload/v1740657831403/ba044353-b0f4-4380-82cf-5abeedd68ac9.png)

Add a new app to the organization and copy the Stream API and Secret key into the <FontIcon icon="fas fa-file-lines"/>`.env.local` file.

```sh title=".env.local"
NEXT_PUBLIC_STREAM_API_KEY=<paste_from_Stream_app_dashboard>
STREAM_SECRET_KEY=<paste_from_Stream_app_dashboard>
```

![Dashboard interface displaying chat overview with key metrics like Monthly Active Users (4 MAUs), Max Concurrent Connections (2), and Message Volume (3). Includes app access keys created on February 17th, 2025.](https://cdn.hashnode.com/res/hashnode/image/upload/v1740658025617/e8fb8a44-0a16-4730-875a-be3c2255276f.png)

Create a new file named <FontIcon icon="iconfont icon-typescript"/>`stream.action.ts` inside the <FontIcon icon="fas fa-folder-open"/>`actions` folder at the root of your Next.js project. This is the same folder where the authentication server actions for Supabase are stored. Then, copy the following code snippet into the file:

```ts :collapsed-lines title="actions/stream.action.ts"
"use server";

import { getUserSession } from "./auth";
import { StreamClient } from "@stream-io/node-sdk";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY!;

export const tokenProvider = async () => {
  const { user } = await getUserSession();

  if (!user) throw new Error("User is not authenticated");
  if (!STREAM_API_KEY) throw new Error("Stream API key secret is missing");
  if (!STREAM_API_SECRET) throw new Error("Stream API secret is missing");

  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

  const expirationTime = Math.floor(Date.now() / 1000) + 3600;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.generateUserToken({
    user_id: user.id,
    exp: expirationTime,
    validity_in_seconds: issuedAt,
  });

  return token;
};
```

From the code snippet above,

- The **getUserSession** function returns the Supabase user object for the current user.
- The **tokenProvider** function generates an authentication token for the user, enabling Stream to identify and manage users during real-time communication.

Create a <FontIcon icon="fas fa-folder-open"/>`providers` folder containing a `StreamVideoProvider` component within the Next.js app folder and copy the following code snippet into the file:

```tsx :collapsed-lines title="providers/StreamVideoProvider.tsx"
"use client";
import { createClient } from "../../../utils/supabase/client";
import { tokenProvider } from "../../../actions/stream.action";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useState, ReactNode, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );
  const supabase = createClient();

  const getUser = useCallback(async () => {
    //👉🏻 get user object from Supabase
    //👉🏻 set Stream user data
    // 👉🏻 initialize Stream video client using the Stream API key, Stream user data, and token Provider
  }, [supabase.auth]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (!videoClient)
    return (
      <div className='h-screen flex items-center justify-center'>
        <Loader2 size='32' className='mx-auto animate-spin' />
      </div>
    );

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};
```

The `StreamVideoProvider` component is initialized and manages Stream’s video functionality across the application. It wraps all pages that require access to Stream's real-time video features. This includes:

- `instructor/[id]` - displays an instructor’s upcoming sessions.
- `instructor/dashboard` - allows instructors to schedule new video calls.

Update the `getUser` function as shown below:

```ts
const getUser = useCallback(async () => {
  const { data, error } = await supabase.auth.getUser();
  const { user } = data;
  if (error || !user || !apiKey) return;
  if (!tokenProvider) return;

  let streamUser;

  if (user.user_metadata?.image) {
    streamUser = {
      // 👇🏻 user is an instructor
      id: user.id,
      name: user.user_metadata?.name,
      image: user.user_metadata?.image,
    };
  } else {
    // 👇🏻 user is a student
    streamUser = {
      id: user.id,
      name: user.user_metadata?.name,
    };
  }

  //👇🏻 create s Stream video client
  const client = new StreamVideoClient({
    apiKey,
    user: streamUser,
    tokenProvider,
  });

  setVideoClient(client);
}, [supabase.auth]);
```

The `getUser` function retrieves the current user's data from Supabase Auth, sets up the Stream user, and initializes a Stream video client using the Stream API key, the user’s object and the token.

---

## Creating and Scheduling Calls with Stream

Here, you will learn how to allow instructors to schedule calls using the Stream Video & Audio SDK.

Before we proceed, create a <FontIcon icon="fas fa-folder-open"/>`hooks` folder within the Next.js app folder and add these files:

```sh
cd app && mkdir hooks
cd hooks
touch useGetCallById.ts useGetCalls.ts
```

The <FontIcon icon="iconfont icon-typescript"/>`useGetCallById` file defines a React hook that fetches details of a specific Stream call via its ID, while the <FontIcon icon="iconfont icon-typescript"/>`useGetCalls` hook retrieves all calls created by a particular Stream user.

Let's create these custom React hooks.

Copy the following code snippet into the <FontIcon icon="iconfont icon-typescript"/>`useGetCallById.ts` file:

```tsx :collapsed-lines title="hooks/useGetCallById.ts"
import { useEffect, useState } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      try {
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });

        if (calls.length > 0) setCall(calls[0]);

        setIsCallLoading(false);
      } catch (error) {
        console.error(error);
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};
```

Add the following to the `useGetCalls.ts` file:

```tsx :collapsed-lines title="hooks/useGetCalls.ts"
import { useEffect, useState } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";

export const useGetCalls = () => {
  const client = useStreamVideoClient();
  const [calls, setCalls] = useState<Call[]>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !id) return;

      setIsLoading(true);

      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: 1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [{ created_by_user_id: id }, { members: { $in: [id] } }],
          },
        });

        setCalls(calls);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, id]);

  const now = new Date();
  //👇🏻 upcoming calls
  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });
  //👇🏻 ongoing calls
  const ongoingCalls = calls?.filter(
    ({ state: { startsAt, endedAt } }: Call) => {
      return startsAt && new Date(startsAt) < now && !endedAt;
    }
  );

  return { upcomingCalls, isLoading, ongoingCalls };
};
```

The `useGetCalls` hook retrieves all calls where the instructor is either the creator or a participant, returning both current and upcoming calls. It also returns an `isLoading` state to indicate when data is being fetched, allowing for conditional rendering.

Add the function below to the instructor's dashboard to allow instructors to create or schedule calls. This function accepts a call description along with the scheduled date and time.

```tsx
//👇🏻 imports
import { useStreamVideoClient, Call } from "@stream-io/video-react-sdk";
const client = useStreamVideoClient();
//👇🏻 Form states
const [description, setDescription] = useState<string>("");
const [dateTime, setDateTime] = useState<string>("");

const handleScheduleMeeting = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!client || !user) return;

  try {
    const id = crypto.randomUUID();
    const call = client.call("default", id);
    if (!call) throw new Error("Failed to create meeting");
  //👇🏻 create Stream call
    await call.getOrCreate({
      data: {
        starts_at: new Date(dateTime).toISOString(),
        custom: {
          description,
        },
      },
    });

    //👇🏻 Call object
    console.log({ call });
  } catch (error) {
    console.error(error);
  }
};
```

The code snippet above initializes a Stream video call with a default call type. It assigns the call a unique ID, sets the scheduled date and time, and includes a custom description.

::: note

Ensure that the `<StreamVideoProvider>` component wraps the instructor's dashboard where the video call is being created. You can achieve this by adding a <FontIcon icon="fa-brands fa-react"/>`layout.tsx` file to the dashboard page and wrapping all child elements with `<StreamVideoProvider>`.

:::

![Dashboard interface titled "LinkedUp" with sections for followers, announcements, and options to make an announcement, schedule a call, or access the community channel. Logout button is visible at the top right.](https://cdn.hashnode.com/res/hashnode/image/upload/v1740658849436/109c53d7-c818-4d79-8bd7-19c3c0ae62a2.gif)

---

## Joining Stream Video Calls

The `instructor/[id]` page displays detailed information about a specific instructor from Supabase and lists of their current and upcoming calls. This allows students to view scheduled meetings and join them when they start.

![Screenshot of a profile page for Carl John, a UI Designer, on a platform called LinkedUp. It includes a profile picture, a button for joining a community channel, announcements with delete options, and upcoming meetings with join and copy link options.](https://cdn.hashnode.com/res/hashnode/image/upload/v1740659135003/0c53b3b6-fa91-4d28-81cf-89e8c90b7e02.gif)

To implement this functionality, we will use the `MeetingsBox` component within the instructor's profile page and create a dedicated `calls/[id]` page route for joining calls.

First, create a `(stream)` folder and add a `calls/[id]` page route. Then, create a `layout.tsx` file within the `(stream)` folder and insert the following code:

```tsx title="layout.tsx"
import { StreamVideoProvider } from "../providers/StreamVideoProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calls & Chat | LinkedUp",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StreamVideoProvider>{children}</StreamVideoProvider>;
}
```

The <FontIcon icon="fa-brands fa-react"/>`layout.tsx` file ensures that the `StreamVideoProvider` component wraps all pages inside the `(stream)` folder, enabling access to Stream's video and audio features across these pages.

Next, render the calls within the [MeetingsBox component (<FontIcon icon="iconfont icon-github"/>`dha-stix/stream-lms`)](https://github.com/dha-stix/stream-lms/blob/main/src/app/instructor/%5Bid%5D/\(components\)/MeetingsBox.tsx) and and let students join meetings.

```ts :collapsed-lines title="MeetingsBox.tsx"
"use client";
import { formatDateTime } from "@/lib/utils";
import { Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

export default function MeetingsBox({
  upcomingCalls,
  isLoading,
  ongoingCalls,
}: {
  upcomingCalls: Call[] | undefined;
  isLoading: boolean;
  ongoingCalls: Call[] | undefined;
}) {
  const router = useRouter();

  if (isLoading || !upcomingCalls || !ongoingCalls) {
    return <p className='text-xs opacity-60'>Fetching calls...</p>;
  }

  if (upcomingCalls.length === 0) {
    return <p className='text-xs opacity-60'>No upcoming meetings</p>;
  }

  return {
    // --- upcoming and ongoing calls display elements ---
  };
}
```

Return the following UI elements from the component to allow everyone to see the instructor's current and upcoming meetings.

```tsx
return (
  <div className='space-y-4'>
    // --- ongoing calls ---
    {ongoingCalls.map((call) => (
      <div className='bg-white p-2 rounded-md' key={call.id}>
        <h3 className='text-sm font-bold text-gray-500 mb-2'>
          {call.state.custom.description}
        </h3>
        <p className='text-xs'>
          Started: {formatDateTime(call.state?.startsAt?.toLocaleString())}
        </p>
        <div className='flex items-center space-x-4'>
          <button
            className='bg-blue-500 text-white px-4 py-2 text-xs rounded-md mt-2'
            onClick={() => handleJoinCall(call)}
          >
            Join In
          </button>

          <button
            className='bg-gray-500 text-white px-4 py-2 text-xs rounded-md mt-2'
            onClick={() => handleCopyLink(call)}
          >
            Copy Link
          </button>
        </div>
      </div>
    ))}
    // --- upcoming calls ---
    {upcomingCalls.map((call) => (
      <div className='bg-white p-2 rounded-md' key={call.id}>
        <h3 className='text-sm font-bold text-gray-500 mb-2'>
          {call.state.custom.description}
        </h3>

        <div className='flex items-center space-x-4'>
          <button
            className='bg-blue-500 text-white px-4 py-2 text-xs rounded-md mt-2'
            disabled={true}
          >
            {formatDateTime(call.state?.startsAt?.toLocaleString())}
          </button>

          <button
            className='bg-gray-500 text-white px-4 py-2 text-xs rounded-md mt-2'
            onClick={() => handleCopyLink(call)}
          >
            Copy Link
          </button>
        </div>
      </div>
    ))}
  </div>
);
```

The `MeetingsBox` component renders the instructor's current and upcoming calls, allowing users to copy the call link and join meetings.

![Profile page for Carl John, a UI Designer, featuring announcements and upcoming meetings. Links to "Join my Community Channel" and meeting details are shown.](https://cdn.hashnode.com/res/hashnode/image/upload/v1740659373366/9150c744-7bb0-4e1f-99f5-b6b89d2bc488.png)

Execute the `handleJoinCall` function to redirect the user to the call page. This allows them to confirm the action before joining the call. The `handleCopyLink` function copies the call link to the clipboard.

```tsx
const handleJoinCall = (call: Call) => {
  router.push(`/call/${call.id}`);
};

const handleCopyLink = (call: Call) => {
  navigator.clipboard.writeText(
    `${process.env.NEXT_PUBLIC_PAGE_URL!}/call/${call.id}`
  );
  console.log({
    title: "Link copied to clipboard",
    description: "You can now share the link with interested participants",
  });
};
```

Now, create the `call/[id]/page.tsx` component and copy the following code into the file:

```tsx :collapsed-lines title="call/[id]/page.tsx"
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { createClient } from "../../../../../utils/supabase/client";

export default function CallPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const authenticateUser = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const userData = data.user;
    if (!userData) {
      return router.push("/student/auth/login");
    }
    setUser(userData);
  }, [router, call, camMicEnabled]);

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  return {
    // -- Conditionally render Stream Call component --
  };
}
```

The code snippet authenticates the user to ensure they are signed in.

Next, fetch the call details using the call ID from the page route via the `useParams` hook.

```tsx :collapsed-lines
"use client";
//..other imports
import { useGetCallById } from "@/app/hooks/useGetCallById";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";

export default function CallPage() {
  //..other states
  const { call, isCallLoading } = useGetCallById(id);
  const [confirmJoin, setConfirmJoin] = useState<boolean>(false);
  const [camMicEnabled, setCamMicEnabled] = useState<boolean>(false);

  const handleJoin = () => {
    //👇🏻 Stream join call function
    call?.join();
    setConfirmJoin(true);
  };

  if (isCallLoading) return <p>Loading...</p>;

  if (!call) return <p>Call not found</p>;

  return (
    <main className='min-h-screen w-full items-center justify-center'>
      <StreamCall call={call}>
        <StreamTheme>
          {confirmJoin ? (
            <MeetingRoom call={call} />
          ) : (
            <div className='flex flex-col items-center justify-center gap-5 h-screen w-full'>
              <h1 className='text-3xl font-bold'>Join Call</h1>
              <p className='text-lg'>
                Are you sure you want to join this call?
              </p>
              <div className='flex gap-5'>
                <button
                  onClick={handleJoin}
                  className='px-4 py-3 bg-blue-600 text-blue-50'
                >
                  Join
                </button>
                <button
                  onClick={() => router.back()}
                  className='px-4 py-3 bg-red-600 text-red-50'
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
}
```

In the code snippet above,

- The [<FontIcon icon="fas fa-globe"/>**StreamCall** component](https://getstream.io/video/docs/react/ui-components/core/stream-call/) wraps the entire call page, allowing access to various audio and video calling features. It accepts the **call object** as a prop.
- The [<FontIcon icon="fas fa-globe"/>**StreamTheme** component](https://getstream.io/video/docs/react/ui-components/video-theme/) provides UI styling for the call, enabling you to use different themes.
- The `confirmJoin` state is initially set to `false`. When the user clicks the **Join** button, it triggers the `handleJoin` function, which joins the call and updates `confirmJoin` to `true`.
- When `confirmJoin` is `true`, the component renders the `MeetingRoom` component, which includes all prebuilt and customizable UI elements for the call provided by Stream.

Finally, update the `authenticateUser` function to prompt the Stream user to enable or disable the camera and microphone immediately after joining a call.

```tsx :collapsed-lines
//👇🏻 call & camera disable/enable state
const [camMicEnabled, setCamMicEnabled] = useState<boolean>(false);

const authenticateUser = useCallback(async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const userData = data.user;
  if (!userData) {
    return router.push("/student/auth/login");
  }
  setUser(userData);
  //👇🏻 Enable camera and microphone
  if (camMicEnabled) {
    call?.camera.enable();
    call?.microphone.enable();
  } else {
    call?.camera.disable();
    call?.microphone.disable();
  }
}, [router, call, camMicEnabled]);

useEffect(() => {
  authenticateUser();
}, [authenticateUser]);
```

---

## Stream Call UI Components

Stream makes setting up a call page easy using minimal UI components. It provides two prebuilt [<FontIcon icon="fas fa-globe"/>call layouts](https://getstream.io/video/docs/react/ui-components/core/call-layout/) (**PaginatedGridLayout** and **SpeakerLayout)** and a customizable [<FontIcon icon="fas fa-globe"/>**CallControls** component.](https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/)

- PaginatedGridLayout and SpeakerLayout define how call participants are displayed on the call page.
- CallControls provides essential call functionalities such as toggling video and audio, sharing the screen, leaving the call, and more.

![Video call interface with a person in a small window. The microphone is muted, indicated by a crossed-out microphone icon. Other controls and a red "End Call for Everyone" button are visible at the bottom.](https://cdn.hashnode.com/res/hashnode/image/upload/v1740659807590/b3e24561-60fc-4e0d-8054-a02d78a745a2.gif)

Create the <FontIcon icon="fa-brands fa-react"/>`MeetingRoom` component as follows:

```tsx title="MeetingRoom.tsx"
const MeetingRoom = ({call} : {call: Call}) => {
  const [layout, setLayout] = useState<CallLayoutType>("grid");
  const router = useRouter();

//👇🏻 allows members to leave the call
  const handleLeave = () => {
    if (confirm("Are you sure you want to leave the call?")) {
      router.push("/");
    }
  };

//👇🏻 describes the call layout
  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition='left' />;
      default:
        return <SpeakerLayout participantsBarPosition='right' />;
    }
  };

  return (
    // -- Stream call UI component--
  )
}
```

The `handleLeave` function enables call participants to leave the call and the `CallLayout` component determines how they are laid out on the screen.

Return the following from the `MeetingRoom` component:

```tsx title="MeetingRoom.tsx"
return (
  <section className='relative min-h-screen w-full overflow-hidden pt-4'>
    <div className='relative flex size-full items-center justify-center'>
      <div className='flex size-full max-w-[1000px] items-center'>
        <CallLayout />
      </div>
      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5'>
        <CallControls onLeave={handleLeave} />
      </div>

      <div className='fixed bottom-0 right-0 flex items-center justify-center gap-5 p-5'>
        <EndCallButton call={call} />
      </div>
    </div>
  </section>
);
```

The CallLayout and CallControls components are rendered on the page, allowing users to communicate, share their screen, turn their camera on or off, and engage in conversations through reactions.

Finally, create the `EndCallButton` component to enable the host (instructor) to end the call for everyone.

```tsx title="EndCallButton.tsx"
//👇🏻 Stream call hook
import { useCallStateHooks } from "@stream-io/video-react-sdk";

const EndCallButton = ({ call }: { call: Call }) => {
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const router = useRouter();

  const participantIsHost =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!participantIsHost) return null;

  const handleEndCall = () => {
    call.endCall();
    console.log({
      title: "Call Ended",
      description: "The call has been ended for everyone",
    });
    router.push("/");
  };

  return (
    <button
      className='bg-red-500 text-white px-4 py-2 rounded-md mt-2'
      onClick={handleEndCall}
    >
      End Call for Everyone
    </button>
  );
};
```

The code snippet above ensures that only the call host can end the call for all participants. It first checks if the current user is the host before displaying the [<FontIcon icon="fas fa-globe"/>"End Call for Everyone" button](https://getstream.io/video/docs/api/calls/#ending-calls).

![Profile page of a UI Designer named Carl John. The page includes an announcement section with posts, an upcoming meetings section with join and copy link options, and a log out button. A button to join a community channel is also present.](https://cdn.hashnode.com/res/hashnode/image/upload/v1740660039466/1851aba0-6961-4b54-87cf-54a3a98bb61a.gif)
