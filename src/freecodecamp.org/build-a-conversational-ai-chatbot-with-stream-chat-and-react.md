---
lang: en-US
title: "How to Build a Conversational AI Chatbot with Stream Chat and React"
description: "Article(s) > How to Build a Conversational AI Chatbot with Stream Chat and React"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Conversational AI Chatbot with Stream Chat and React"
    - property: og:description
      content: "How to Build a Conversational AI Chatbot with Stream Chat and React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-conversational-ai-chatbot-with-stream-chat-and-react.html
prev: /programming/js-react/articles/README.md
date: 2025-06-18
isOriginal: false
author:
  - name: Timothy Olanrewaju
    url : https://freecodecamp.org/news/author/SmoothTech/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750192110424/b23653af-c2de-4631-973f-dcac3c0bdb41.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Conversational AI Chatbot with Stream Chat and React"
  desc="Modern chat applications are increasingly incorporating voice input capabilities because they offer a more engaging and versatile user experience. This also improves accessibility, allowing users with different needs to interact more comfortably with..."
  url="https://freecodecamp.org/news/build-a-conversational-ai-chatbot-with-stream-chat-and-react"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1750192110424/b23653af-c2de-4631-973f-dcac3c0bdb41.png"/>

Modern chat applications are increasingly incorporating voice input capabilities because they offer a more engaging and versatile user experience. This also improves accessibility, allowing users with different needs to interact more comfortably with such applications.

In this tutorial, I’ll guide you through the process of creating a conversational AI application that integrates real-time chat functionality with voice recognition. By leveraging Stream Chat for robust messaging and the Web Speech API for speech to text conversion, you’ll build a multi-faceted chat application that supports both voice and text interaction.

::: note Prerequisites

Before we begin, ensure you have the following:

- A Stream account with an API key and secret (Read on how to get them [<FontIcon icon="fas fa-globe"/>here](https://getstream.io/blog/stream-getting-started-guide/))
- Access to an LLM API (like OpenAI, Anthropic).
- Node.js and npm/yarn installed.
- Basic knowledge of React and TypeScript.
- Modern browser with WebSpeech API support (like Chrome, Edge)

:::

::: info Sneak Peek

Let’s take a quick look at the app we’ll be building in this tutorial. This way, you get a feel for what it does before we jump into the details.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1749925010635/5228ae93-ff56-4b0f-8ea8-c7a160973191.gif)

If you’re now excited, let’s get straight into it!

:::

---

## Core Technologies

This application is powered by three main players: Stream Chat, the Web Speech API, and a Node.js + Express backend.

[<FontIcon icon="fas fa-globe"/>Stream Chat](https://getstream.io/) is a platform that helps you easily build and integrate rich, real-time chat and messaging experiences into your applications. It offers a variety of SDKs (Software Development Kits) for different platforms (like Android, iOS, React) and pre-built UI components to streamline development. Its robustness and engaging chat functionality make it a great choice for this app – we don’t need to build anything from scratch.

[<FontIcon icon="fa-brands fa-firefox"/>Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) is a browser standard that allows you to integrate voice input and output into your apps, enabling features like speech recognition (converting spoken speech to text) and speech synthesis (converting text to speech). We’ll use the speech recognition feature in this project.

The Node.js + Express backend manages correct agent instantiation and processes the conversational responses generated by our LLM API.

---

## Backend Implementation Guide

Let’s begin with our backend, the engine room – where user input is routed to the appropriate AI model, and a processed response is returned. Our backend supports multiple AI models, specifically OpenAI and Anthropic.

### Project Setup

1. Create a folder, call it ‘**My-Chat-Application**’.
2. Clone this [Github repository (<FontIcon icon="iconfont icon-github"/>`GetStream/ai-assistant-nodejs`)](https://github.com/GetStream/ai-assistant-nodejs)
3. After cloning, rename the folder to ‘**backend**’
4. Open the <FontIcon icon="fas fa-file-lines"/>`.env.example` file and provide the necessary keys (you’ll need to provide either the OpenAI or Anthropic key – the Open Weather key is optional).
5. Rename the <FontIcon icon="fas fa-file-lines"/>`.env.example`file to <FontIcon icon="fas fa-file-lines"/>`.env`
6. Install dependencies by running this command:

```sh
npm i
```

7. Run the project by entering this command:

```sh
npm start
```

Your backend should be running smoothly on `localhost:3000`.

---

## Frontend Implementation Guide

This section explores two broad, interrelated components: the chat structure and speech recognition.

### Project Setup

We will be creating and setting up our React project with the Stream Chat React SDK. We'll use Vite with the TypeScript template. To do that, navigate to your <FontIcon icon="fas fa-folder-open"/>`My-Chat-Application` folder, open your terminal and enter this command:

```sh
npm create vite frontend -- --template react-ts
cd chat-example
npm i stream-chat stream-chat-react
```

With our frontend project set up, we can now run the app:

```sh
npm run dev
```

### Understanding the App Component

The main focus here is to initialize a chat client, connect a user, create a channel, and render the chat interface. We’ll go through all these processes step by step to help you understand them better:

#### Define Constants

First, we need to provide some important credentials that we need for user creation and chat client setup. You can find these credentials on your Stream [<FontIcon icon="fas fa-globe"/>dashboard](https://dashboard.getstream.io/).

```tsx
const apiKey = "xxxxxxxxxxxxx";
const userId = "111111111";
const userName = "John Doe";
const userToken = "xxxxxxxxxx.xxxxxxxxxxxx.xx_xxxxxxx-xxxxx_xxxxxxxx"; //your stream secret key
```

::: note

These are dummy credentials. Make sure to use your own credentials.

:::

#### Create a User

Next, we need to create a user object. We’ll create it using an ID, name and a generated avatar URL:

```tsx
const user: User = {
  id: userId,
  name: userName,
  image: `https://getstream.io/random_png/?name=${userName}`,
};
```

#### Setup a Client

We need to track the state of the active chat channel using the `useState` hook to ensure seamless real-time messaging in this Stream Chat application. A custom hook called `useCreateChatClient` initializes the chat client with an API key, user token, and user data:

```tsxx
const [channel, setChannel] = useState<StreamChannel>();
const client = useCreateChatClient({
  apiKey,
  tokenOrProvider: userToken,
  userData: user,
});
```

#### Initialize Channel

Now, we initialize a messaging channel to enable real-time communication in the Stream Chat application. When the chat client is ready, the `useEffect` hook triggers the creation of a messaging channel named `my_channel`, adding the user as a member. This channel is then stored in the channel state, ensuring that the app is primed for dynamic conversation rendering.

```tsxx
useEffect(() => {
  if (!client) return;
  const channel = client.channel("messaging", "my_channel", {
    members: [userId],
  });

  setChannel(channel);
}, [client]);
```

#### Render Chat Interface

With all the integral parts of our chat application all set up, we’ll return a JSX to define the chat interface's structure and components:

```tsx
if (!client) return <div>Setting up client & connection...</div>;

return (
  <Chat client={client}>
    <Channel channel={channel}>
      <Window>
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);
```

In this JSX structure:

- If the client is not ready, it displays a "Setting up client & connection..." message.
- Once the client is ready, it renders the chat interface using:
  - `<Chat>`: Wraps the Stream Chat context with the initialized client.
  - `<Channel>`: Sets the active channel.
  - `<Window>`: Contains the main chat UI components:
    - `<MessageList>`: Displays the list of messages.
    - `<MessageInput>`: Uses a custom `CustomMessageInput` for sending messages.
  - `<Thread>`: Renders threaded replies.

With this, we've set up our chat interface and channel, and we have a client ready. Here's what our interface looks like so far:

![stream chat interface](https://cdn.hashnode.com/res/hashnode/image/upload/v1749901280964/4b788065-27ae-40b4-9882-c74bacef0fc4.png)

### Adding AI to the Channel

Remember, this chat application is designed to interact with an AI, so we need to be able to both add and remove the AI from the channel. On the UI, we’ll add a button in the channel header to enable users add and remove AI. But we still need to determine whether or not we already have it in the channel to know which option to display.

For that we’ll create a custom hook called `useWatchers`. It monitors the presence of the AI using a concept called `watchers`:

```tsx :collapsed-lines
import { useCallback, useEffect, useState } from 'react';
import { Channel } from 'stream-chat';

export const useWatchers = ({ channel }: { channel: Channel }) => {
  const [watchers, setWatchers] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const queryWatchers = useCallback(async () => {
    setError(null);

    try {
      const result = await channel.query({ watchers: { limit: 5, offset: 0 } });
      setWatchers(result?.watchers?.map((watcher) => watcher.id).filter((id): id is string => id !== undefined) || [])
      return;
    } catch (err) {
      setError(err as Error);
    }
  }, [channel]);

  useEffect(() => {
    queryWatchers();
  }, [queryWatchers]);

  useEffect(() => {
    const watchingStartListener = channel.on('user.watching.start', (event) => {
      const userId = event?.user?.id;
      if (userId && userId.startsWith('ai-bot')) {
        setWatchers((prevWatchers) => [
          userId,
          ...(prevWatchers || []).filter((watcherId) => watcherId !== userId),
        ]);
      }
    });

    const watchingStopListener = channel.on('user.watching.stop', (event) => {
      const userId = event?.user?.id;
      if (userId && userId.startsWith('ai-bot')) {
        setWatchers((prevWatchers) =>
          (prevWatchers || []).filter((watcherId) => watcherId !== userId)
        );
      }
    });

    return () => {
      watchingStartListener.unsubscribe();
      watchingStopListener.unsubscribe();
    };
  }, [channel]);

  return { watchers, error };
};
```

### Configuring the ChannelHeader

We can now build a new channel header component by utilizing the `useChannelStateContext` hook to access the channel and initialize the custom `useWatchers` hook. Using the watchers' data, we define an `aiInChannel` variable to display relevant text. Based on this variable, we invoke either the `start-ai-agent` or `stop-ai-agent` endpoint on the Node.js backend.

```tsx :collapsed-lines
import { useChannelStateContext } from 'stream-chat-react';
import { useWatchers } from './useWatchers';

export default function ChannelHeader() {
  const { channel } = useChannelStateContext();
  const { watchers } = useWatchers({ channel });

  const aiInChannel =
    (watchers ?? []).filter((watcher) => watcher.includes('ai-bot')).length > 0;
  return (
    <div className='my-channel-header'>
      <h2>{(channel?.data as { name?: string })?.name ?? 'Voice-and-Text AI Chat'}</h2>
      <button onClick={addOrRemoveAgent}>
        {aiInChannel ? 'Remove AI' : 'Add AI'}
      </button>
    </div>
  );

  async function addOrRemoveAgent() {
    if (!channel) return;
    const endpoint = aiInChannel ? 'stop-ai-agent' : 'start-ai-agent';
    await fetch(`http://127.0.0.1:3000/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channel_id: channel.id, platform: 'openai' }),
    });
  }
}
```

### Adding an AI State Indicator

AIs take a bit of time to process information, so while the AI is processing, we add an indicator to reflect its status. We create a `AIStateIndicator` that does that for us:

```tsx :collapsed-lines
import { AIState } from 'stream-chat';
import { useAIState, useChannelStateContext } from 'stream-chat-react';

export default function MyAIStateIndicator() {
  const { channel } = useChannelStateContext();
  const { aiState } = useAIState(channel);
  const text = textForState(aiState);
  return text && <p className='my-ai-state-indicator'>{text}</p>;

  function textForState(aiState: AIState): string {
    switch (aiState) {
      case 'AI_STATE_ERROR':
        return 'Something went wrong...';
      case 'AI_STATE_CHECKING_SOURCES':
        return 'Checking external resources...';
      case 'AI_STATE_THINKING':
        return "I'm currently thinking...";
      case 'AI_STATE_GENERATING':
        return 'Generating an answer for you...';
      default:
        return '';
    }
  }
}
```

### Building the Speech to Text Functionality

Up to this point, we have a functional chat application that sends messages and receives feedback from an AI. Now, we want to enable voice interaction, allowing users to speak to the AI instead of typing manually.

To achieve this, we’ll set up speech-to-text functionality within a `CustomMessageInput` component. Let’s walk through the entire process, step by step, to understand how to achieve it.

#### Initial States Configuration

When the `CustomMessageInput` component first mounts, it begins by establishing its foundational state structure:

```tsx
const [isRecording, setIsRecording] = useState<boolean>(false);
const [isRecognitionReady, setIsRecognitionReady] = useState<boolean>(false);
const recognitionRef = useRef<any>(null);
const isManualStopRef = useRef<boolean>(false);
const currentTranscriptRef = useRef<string>("");
```

This initialization step is crucial because it establishes the component's ability to track multiple concurrent states: whether recording is active, whether the speech API is ready, and various persistence mechanisms for managing the speech recognition lifecycle.

#### Context Integration

In Stream Chat, the `MessageInputContext` is established within the `MessageInput` component. It provides data to the Input UI component and its children. Since we want to use the values stored within the `MessageInputContext` to build our own custom input UI component, we’ll be calling the `useMessageInputContext` custom hook:

```tsx
// Access the MessageInput context
const { handleSubmit, textareaRef } = useMessageInputContext();
```

This step ensures that the voice input feature integrates seamlessly with the existing chat infrastructure, sharing the same `textarea` reference and submission mechanisms that other input methods use.

#### Web Speech API Detection and Initialization

The Web Speech API is not supported by some browsers, which is why we need to check if the browser running this application is compatible. The component's first major process involves detecting and initializing the Web Speech API:

```tsx
const SpeechRecognition = (window as any).SpeechRecognition||(window as any).webkitSpeechRecognition;
```

Once the API is detected, the component configures the speech recognition service with optimal settings.

#### Event Handler Configuration

We’ll have two event handlers: the result processing handler and the lifecycle event handler.

The result processing handler processes speech recognition output. It demonstrates a two-phase processing approach where interim results provide immediate feedback while final results are accumulated for accuracy.

```tsx
recognition.onresult = (event: any) => {
  let finalTranscript = "";
  let interimTranscript = "";

  // Process all results from the last processed index
  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcriptSegment = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcriptSegment + " ";
    } else {
      interimTranscript += transcriptSegment;
    }
  }

  // Update the current transcript
  if (finalTranscript) {
    currentTranscriptRef.current += finalTranscript;
  }

  // Combine stored final transcript with current interim results
  const combinedTranscript = (currentTranscriptRef.current + interimTranscript).trim();

  // Update the textarea
  if (combinedTranscript) {
    updateTextareaValue(combinedTranscript);
  }
};
```

The lifecycle event handler ensures that the component responds appropriately to each phase of the speech recognition lifecycle events (`onstart`, `onend` and `onerror`):

```tsx
// ....
  recognition.onstart = () => {
    console.log("Speech recognition started");
    setIsRecording(true);
    currentTranscriptRef.current = ""; // Reset transcript on start
  };

  recognition.onend = () => {
    console.log("Speech recognition ended");
    setIsRecording(false);
  
    // If it wasn't manually stopped and we're still supposed to be recording, restart
    if (!isManualStopRef.current && isRecording) {
      try {
        recognition.start();
      } catch (error) {
        console.error("Error restarting recognition:", error);
      }
    }
  
    isManualStopRef.current = false;
  };
  
  recognition.onerror = (event: any) => {
    console.error("Speech recognition error:", event.error);
    setIsRecording(false);
    isManualStopRef.current = false;
  
    switch (event.error) {
      case "no-speech":
        console.warn("No speech detected");
        // Don't show alert for no-speech, just log it
        break;
      case "not-allowed":
        alert(
          "Microphone access denied. Please allow microphone permissions.",
        );
        break;
      case "network":
        alert("Network error occurred. Please check your connection.");
        break;
      case "aborted":
        console.log("Speech recognition aborted");
        break;
      default:
        console.error("Speech recognition error:", event.error);
    }
  };

  recognitionRef.current = recognition;
  setIsRecognitionReady(true);
} else {
  console.warn("Web Speech API not supported in this browser.");
  setIsRecognitionReady(false);
}
```

#### Starting Voice Input

When a user clicks the microphone button, the component initiates a multi-step process that involves requesting microphone permissions and providing clear error handling if users deny access.

```tsx
const toggleRecording = async (): Promise<void> => {
  if (!recognitionRef.current) {
    alert("Speech recognition not available");
    return;
  }

  if (isRecording) {
    // Stop recording
    isManualStopRef.current = true;
    recognitionRef.current.stop();
  } else {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Clear current text and reset transcript before starting
      currentTranscriptRef.current = "";
      updateTextareaValue("");

      // Start recognition
      recognitionRef.current.start();
    } catch (error) {
      console.error("Microphone access error:", error);
      alert(
        "Unable to access microphone. Please check permissions and try again.",
      );
    }
  }
};
```

#### Resetting State and Start Recognition

Before beginning speech recognition, the component resets its internal state. This reset ensures that each new voice input session starts with a clean slate, preventing interference from previous sessions.

```tsx
currentTranscriptRef.current = "";
updateTextareaValue("");
recognitionRef.current.start();
```

#### Real-Time Speech Processing

Two things happen simultaneously during this process:

##### 1. Continuous Result Processing

As the user speaks, the component continuously processes incoming speech data through a sophisticated pipeline:

- Each speech segment is classified as either interim (temporary) or final (confirmed).
- Final results are accumulated in the persistent transcript reference.
- Interim results are combined with accumulated finals for immediate display.

##### 2. Dynamic Textarea Updates

The component updates the `textarea` in real-time using a custom DOM manipulation approach:

```tsx
const updateTextareaValue = (value: string) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLTextAreaElement.prototype,
    'value'
  )?.set;

  if (nativeInputValueSetter) {
    nativeInputValueSetter.call(textareaRef.current, value);
    const inputEvent = new Event('input', { bubbles: true });
    textareaRef.current.dispatchEvent(inputEvent);
  }
};
```

This step involves bypassing React's conventional controlled component behavior to provide immediate feedback, while still maintaining compatibility with React's event system.

#### User Interface Feedback

To make voice interactions feel smoother for users, we’ll add some visual feedback features. These include:

##### 1. Toggling between mic and stop icons

We show a microphone icon when idle and a stop icon when recording is active. This provides a clear indication of the recording state.

```tsx
<button
  className={`voice-input-button ${isRecording ? 'recording' : 'idle'}`}
  title={isRecording ? "Stop recording" : "Start voice input"}
>
  {isRecording ? (
    <Square size={20} className="voice-icon recording-icon" />
  ) : (
    <Mic size={20} className="voice-icon idle-icon" />
  )}
</button>
```

##### 2. Recording notification banner

A notification banner appears at the top of the screen to indicate that voice recording is in progress. This notification ensures users are aware when the microphone is active, addressing privacy and usability concerns.

```tsx
{isRecording && (
  <div className="recording-notification show">
    <span className="recording-icon">🎤</span>
    Recording... Click stop when finished
  </div>
)}
```

#### Message Integration and Submission

The transcribed text integrates seamlessly with the existing chat system through the shared `textarea` reference and context-provided submission handler:

```tsx
<SendButton sendMessage={handleSubmit} />
```

This integration means that voice-generated messages follow the same submission pathway as typed messages, maintaining consistency with the chat system's behavior. After message submission, the component ensures proper cleanup of its internal state, preparing for the next voice input session.

#### Passing the CustomMessageInput component

Having built our custom messaging input component, we’ll now pass it to the `Input` prop of the `MessageInput` component in our `App.tsx`:

```tsx
<MessageInput Input={CustomMessageInput} />
```

---

## Complete Process Flow

Here’s how the application works:

1. After the component mounts, you add the AI to the chat by clicking the **Add AI** button.
2. Click the **mic icon** to start recording.
3. Your browser will ask for permission to use the microphone.
4. If you **deny** permission, recording won't begin.
5. If you **allow** permission, recording and transcription start simultaneously.
6. Click the **stop (square) icon** to end the recording.
7. Click the **send button** to submit your message.
8. The AI processes your input and generates a response.

---

## Conclusion

In this tutorial, you’ve learned how to build a powerful conversational chatbot using Stream Chat and React. The application supports both text and voice inputs.

If you want to create your own engaging chat experiences, you can explore Stream [<FontIcon icon="fas fa-globe"/>Chat](https://getstream.io/chat/) and [<FontIcon icon="fas fa-globe"/>Video](https://getstream.io/video/) features to take your projects to the next level.

Get the full source code for this project [here (<FontIcon icon="iconfont icon-github"/>`TimothyOlanrewaju/My-Chat-Application`)](https://github.com/TimothyOlanrewaju/My-Chat-Application). If you enjoyed reading this article, connect with me on [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`timothy-olanrewaju750`)](https://linkedin.com/in/timothy-olanrewaju750) or follow me on [X (<FontIcon icon="fa-brands fa-x-twitter"/>`SmoothTee_DC`)](https://x.com/SmoothTee_DC) for more programming-related posts and articles.

See you on the next one!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Conversational AI Chatbot with Stream Chat and React",
  "desc": "Modern chat applications are increasingly incorporating voice input capabilities because they offer a more engaging and versatile user experience. This also improves accessibility, allowing users with different needs to interact more comfortably with...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-conversational-ai-chatbot-with-stream-chat-and-react.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
