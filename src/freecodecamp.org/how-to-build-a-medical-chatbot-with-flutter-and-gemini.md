---
lang: en-US
title: "How to Build a Medical Chatbot with Flutter and Gemini: A Beginner’s Guide"
description: "Article(s) > How to Build a Medical Chatbot with Flutter and Gemini: A Beginner’s Guide"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - AI
  - LLM
  - Google
  - Google Gemini
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - dartlang
  - dart-lang
  - flutter
  - ai
  - artficial-intelligence
  - llm
  - large-language-models
  - google
  - google-gemini
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Medical Chatbot with Flutter and Gemini: A Beginner’s Guide"
    - property: og:description
      content: "How to Build a Medical Chatbot with Flutter and Gemini: A Beginner’s Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-medical-chatbot-with-flutter-and-gemini.html
prev: /programming/dart/articles/README.md
date: 2025-06-14
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749830721631/4675d1f6-ad64-46a3-86e1-ce8a2c84323f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Gemini > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/gemini/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Medical Chatbot with Flutter and Gemini: A Beginner’s Guide"
  desc="In today's digital age, the demand for accessible and accurate health information is higher than ever. Leveraging the power of artificial intelligence, we can create intelligent chatbots that provide reliable health-related guidance. This beginner's ..."
  url="https://freecodecamp.org/news/how-to-build-a-medical-chatbot-with-flutter-and-gemini"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1749830721631/4675d1f6-ad64-46a3-86e1-ce8a2c84323f.png"/>

In today's digital age, the demand for accessible and accurate health information is higher than ever. Leveraging the power of artificial intelligence, we can create intelligent chatbots that provide reliable health-related guidance.

This beginner's guide will walk you through building a powerful and specialized medical chatbot using Flutter and Google's Gemini API. The chatbot will be able to receive input from various modalities like text, audio, camera, files, and a gallery, and it will be strictly confined to answering health-related questions.

---

## The Power of AI in Healthcare

AI-powered chatbots are transforming various industries, and healthcare is no exception. They offer a scalable and efficient way to disseminate information, answer frequently asked questions, and even provide initial assessments. By focusing on health-related queries, our chatbot will act as a specialized assistant, providing concise and accurate information to users.

### Core Technologies

We’ll build our medical chatbot using the following key technologies:

- **Flutter:** Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.**1** Its rich set of widgets and expressive UI make it ideal for creating engaging chat interfaces.
- **Google Gemini API:** Google's most capable and flexible AI model. Gemini is multimodal, meaning it can process and understand different types of information, including text, images, audio, and video. This capability is crucial for our chatbot to handle diverse user inputs.
- `flutter_ai_toolkit`: A Flutter package that provides a set of AI chat-related widgets and an abstract LLM provider API, simplifying the integration of AI models into your Flutter app. It offers out-of-the-box support for Gemini.
- `google_generative_ai`: The official Dart package for interacting with Google's Generative AI models (Gemini).

---

## How to Set Up Your Development Environment

Before we dive into the code, make sure you have Flutter installed and configured on your system. If not, follow the [<FontIcon icon="fa-brands fa-dart-lang"/>official Flutter installation guide here](https://flutter.dev/docs/get-started/install).

### Get Your Gemini API Key

To interact with the Gemini API, you need an API key. This key authenticates your application and allows it to send requests to the Gemini model.

Here's how to get your Gemini API key:

1. **Go to Google AI Studio:** Open your web browser and navigate to [<FontIcon icon="fa-brands fa-google"/>https://aistudio.google.com/](https://aistudio.google.com/).
2. **Log in with your Google account:** If you're not already logged in, you'll be prompted to sign in with your Google account.
3. **Click "Get API key in Google AI Studio":** On the Google AI Studio homepage, you'll see a prominent button with this text. Click it.
4. **Review and approve terms of service:** A pop-up will appear asking you to consent to the Google APIs Terms of Service and Gemini API Additional Terms of Service. Read them carefully, check the necessary boxes, and click "Continue."
5. **Create your API key:** You'll now have the option to "Create API key in new project" or "Create API key in existing project." Choose the one that suits your needs. Your API key will be auto-generated.
6. **Copy your API key:** **Crucially, copy this API key immediately and store it securely.** It will not be shown again. **Do NOT hardcode your API key directly into your production code, especially for client-side applications.** For development purposes, we will use it directly in our `MedicalChatScreen` for simplicity, but for a real-world application, consider using environment variables or a secure backend to manage your API key.

### Add Dependencies (`pubspec.yaml`)

Open your `pubspec.yaml` file (located at the root of your Flutter project) and add the following dependencies under `dependencies`:

```yaml title="pubspec.yaml"
dependencies:
  flutter:
    sdk: flutter
  flutter_ai_toolkit: ^0.6.8
  google_generative_ai: ^0.4.6
```

After adding these, run `flutter pub get` in your terminal to fetch the packages.

---

## Project Structure

Our project will have a simple structure:

- <FontIcon icon="fas fa-folder-open"/>`lib/`<FontIcon icon="fa-brands fa-dart-lang"/>`main.dart`: The entry point of our Flutter application.
- <FontIcon icon="fas fa-folder-open"/>`lib/screens/`<FontIcon icon="fa-brands fa-dart-lang"/>`chat.dart`: Contains the main chat interface for our medical chatbot.

---

## Code Implementation and Explanation

Let's break down the provided code and understand each part.

### <FontIcon icon="fas fa-folder-open"/>`lib/`<FontIcon icon="fa-brands fa-dart-lang"/>`main.dart`

```dart title="lib/main.dart"
import 'package:ai_demo/screens/chat.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Medical ChatBot',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MedicalChatScreen(),
    );
  }
}
```

Here’s what’s going on in this code:

- `import 'package:ai_demo/screens/chat.dart';`: This line imports the `chat.dart` file from the `screens` folder. This is where our `MedicalChatScreen` widget is defined.
- `import 'package:flutter/material.dart';`: This imports the fundamental Flutter Material Design widgets, essential for building the UI.
- `void main() { runApp(const MyApp()); }`: This is the entry point of every Flutter application. `runApp()` takes a widget as an argument and makes it the root of the widget tree.
- `class MyApp extends StatelessWidget`: `MyApp` is the root widget of our application. `StatelessWidget` means its properties don't change over time.
- `Widget build(BuildContext context)`: This method is where the UI of the `MyApp` widget is built.
- `MaterialApp`: This widget provides the basic Material Design visual structure for a Flutter app.
  - `title: 'Medical ChatBot'`: Sets the title of the application, which might be displayed in the device's task switcher or browser tab.
  - `theme: ThemeData(...)`: Defines the visual theme of the application.
    - `colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple)`: Generates a color scheme based on a primary "seed" color (`Colors.deepPurple`), ensuring a consistent and harmonious look across the app.
    - `home: const MedicalChatScreen()`: Sets the initial screen of the application to our `MedicalChatScreen` widget.

#### <FontIcon icon="fas fa-folder-open"/>`lib/screens/`<FontIcon icon="fa-brands fa-dart-lang"/>`chat.dart`

```dart :collapsed-lines title="lib/screens/chat.dart"
import 'package:flutter/material.dart';
import 'package:flutter_ai_toolkit/flutter_ai_toolkit.dart';
import 'package:google_generative_ai/google_generative_ai.dart';

class MedicalChatScreen extends StatefulWidget {
  const MedicalChatScreen({super.key});

  @override
  State<MedicalChatScreen> createState() => _MedicalChatScreenState();
}

class _MedicalChatScreenState extends State<MedicalChatScreen> {
  String apiKey = ""; // IMPORTANT: Replace with your actual Gemini API Key

  @override
  void initState() {
    super.initState();
    // It's a good practice to load the API key from a secure source
    // rather than hardcoding it, especially for production apps.
    // For this demo, we'll keep it simple.
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        automaticallyImplyLeading: false,
        title: const Text("Medical ChatBot"),
      ),
      body: LlmChatView(
        suggestions: const [
          "I've been feeling dizzy lately. What now?",
          "How do I know if I need to see a doctor?",
          "What should I eat to boost my immunity?"
        ],
        style: LlmChatViewStyle(
          backgroundColor: Colors.white,
          chatInputStyle: ChatInputStyle(
            hintText: "Enter your message",
            decoration: const BoxDecoration().copyWith(
              borderRadius: BorderRadius.circular(50),
            ),
          ),
        ),
        provider: GeminiProvider(
          model: GenerativeModel(
            model: "gemini-2.0-flash",
            apiKey: apiKey,
            systemInstruction: Content.system(
              "You are a professional medical health assistant. Only respond to health and medically related questions and make them concise and straight to the point without too much explanation."
                  "If a question is unrelated to health or medicine, politely inform the user that you can only answer medical-related queries.",
            ),
          ),
        ),
        welcomeMessage:
        "Hello👋 I’m here to help with your medical questions. Please tell me how I can assist you."
      ),
    );
  }
}
```

What’s going on in <FontIcon icon="fa-brands fa-dart-lang"/>`chat.dart`:

- `import 'package:flutter/material.dart';`: Imports Material Design widgets.
- `import 'package:flutter_ai_toolkit/flutter_ai_toolkit.dart';`: Imports the `flutter_ai_toolkit` package, which provides the `LlmChatView` and `GeminiProvider`.
- `import 'package:google_generative_ai/google_generative_ai.dart';`: Imports the `google_generative_ai` package, which allows us to interact with the Gemini model.
- `class MedicalChatScreen extends StatefulWidget`: Our chat screen is a `StatefulWidget` because its `apiKey` and potentially other chat-related states might change.
- `_MedicalChatScreenState createState() => _MedicalChatScreenState();`: Creates the mutable state for this widget.
- `String apiKey = "";`: **This is where you need to paste your Gemini API key.** Replace `""` with the actual key you obtained from Google AI Studio. For example: `String apiKey = "YOUR_GEMINI_API_KEY_HERE";`.
  - **Security note:** As mentioned before, hardcoding API keys is not recommended for production applications. Consider using environment variables, a secrets management service (like Firebase Remote Config or Google Cloud Secret Manager), or a backend server to handle API requests securely.
- `initState()`: This method is called once when the widget is inserted into the widget tree. It's a good place for initial setup. In this case, it's empty but serves as a placeholder for potential future initialization like loading the API key securely.
- `Scaffold`: Implements the basic Material Design visual layout structure.
  - `appBar`: Displays a top app bar.
    - `backgroundColor: Colors.white`: Sets the background color of the app bar to white.
    - `automaticallyImplyLeading: false`: Prevents Flutter from automatically adding a back button if this screen is pushed onto a navigation stack.
    - `title: const Text("Medical ChatBot")`: Sets the title text of the app bar.
    - `body: LlmChatView(...)`: This is the core widget from the `flutter_ai_toolkit` that provides the chat UI and handles the interaction with the LLM.
  - `suggestions: const [...]`: Provides a list of initial suggested prompts to the user when the chat is empty. These prompts guide the user on the types of questions the chatbot can answer.
  - `style: LlmChatViewStyle(...)`: Customizes the appearance of the chat view.
    - `backgroundColor: Colors.white`: Sets the background color of the chat area.
    - `chatInputStyle: ChatInputStyle(...)`: Styles the text input field.
      - `hintText: "Enter your message"`: Placeholder text in the input field.
      - `decoration: const BoxDecoration().copyWith(borderRadius: BorderRadius.circular(50))`: Styles the input field with rounded corners.
  - `provider: GeminiProvider(...)`: This is where we configure our Gemini model as the AI provider for the `LlmChatView`.
    - `model: GenerativeModel(...)`: Creates an instance of the Gemini model.
      - `model: "gemini-2.0-flash"`: Specifies the particular Gemini model to use. "gemini-2.0-flash" is a lightweight and fast model suitable for many applications. Other models like "gemini-pro" are also available, offering different capabilities and costs.
      - `apiKey: apiKey`: Passes your obtained Gemini API key to the model.
      - `systemInstruction: Content.system(...)`: **This is crucial for defining the chatbot's persona and limitations.** It's a system message sent to the Gemini model at the beginning of the conversation (and potentially with every turn, depending on the implementation details of `flutter_ai_toolkit` and `google_generative_ai`).
        - `"You are a professional medical health assistant. Only respond to health and medical-related questions and make them concise and straight to the point without too much explanation."`: This is the primary instruction. It tells Gemini to act as a medical assistant and to be precise in its health-related responses.
        - `"If a question is unrelated to health or medicine, politely inform the user that you can only answer medical-related queries."`: This instruction ensures that the chatbot stays within its defined scope and doesn't hallucinate or provide irrelevant answers to non-medical questions, which is vital for a specialized health bot.
  - `welcomeMessage: "Hello👋 I’m here to help with your medical questions. Please tell me how I can assist you."`: A friendly message displayed to the user when they first open the chat screen, setting the context for the conversation.

### How to Handle Multi-Modal Inputs

The `flutter_ai_toolkit` package, when used with `GeminiProvider`, intrinsically supports multi-modal inputs. The `LlmChatView` automatically provides UI elements for:

- **Text input:** The standard text field for typing messages.
- **Audio input:** A microphone icon will typically be present, allowing users to record voice messages that are then transcribed and sent to Gemini.
- **Camera input:** A camera icon will allow users to take a photo and send it to the chatbot. Gemini can then process the image and provide a response.
- **File input:** An attachment icon (often a paperclip) will enable users to select files (like documents or images) from their device to send to the chatbot.
- **Gallery input:** Similar to file input, but specifically for selecting images or videos from the device's photo gallery.

The `flutter_ai_toolkit` abstracts away the complexities of handling these different input types, converting them into a format that the `google_generative_ai` package and subsequently the Gemini model can understand and process. For instance, images are sent as `ImagePart` within the `Content` object, and audio might be transcribed to text before being sent, or sent as `AudioPart` if the model supports direct audio input.

The `systemInstruction` we set for the `GenerativeModel` is crucial here. While the `flutter_ai_toolkit` handles the input, the Gemini model's ability to understand various modalities in the context of health questions depends on its training and our clear instructions.

For example, if a user uploads an image of a rash, the system instruction helps guide Gemini to interpret it from a medical perspective (though it's important to remember that an AI chatbot is not a substitute for professional medical diagnosis).

### How to Run Your Chatbot

1. **Replace** `apiKey`: In <FontIcon icon="fas fa-folder-open"/>`lib/screens/`<FontIcon icon="fa-brands fa-dart-lang"/>`chat.dart`, replace `""` with your actual Gemini API key.
2. **Run the application:** In your terminal, navigate to your project's root directory and run: **Bash**

```bash
flutter run
```

This will launch the application on a connected device or emulator. You should see the "Medical ChatBot" app with the welcome message and suggested prompts. Try typing some health-related questions, and also experiment with the multi-modal input options (microphone, camera, attachment icon) if your device/emulator supports them.

---

## Important Considerations and Future Enhancements

- **API key security:** Just to reiterate the importance of not hardcoding API keys in production. For a deployed app, consider using environment variables, backend services, or Flutter's build configurations to inject the API key securely.
- **Error handling:** The current code doesn't explicitly show error handling for API calls. In a real application, you'd want to handle network errors, invalid API keys, or rate limits gracefully. The `flutter_ai_toolkit` and `google_generative_ai` packages provide mechanisms for this.
- **User Experience (UX):**
  - **Loading indicators:** Show a loading indicator while the AI is generating a response.
  - **Input validation:** For certain inputs (for example, file types), you might want to add client-side validation.
  - **Clearance/history:** Implement features to clear chat history or save past conversations.
  - **Medical disclaimer:** Crucially, any medical chatbot should include a prominent disclaimer stating that it is not a substitute for professional medical advice, diagnosis, or treatment. It should always advise users to consult with a qualified healthcare professional for any health concerns.
- **Privacy and data security:** When dealing with health-related information, data privacy is paramount. Ensure your application complies with relevant regulations (for example, HIPAA in the U.S., GDPR in Europe) and that user data is handled securely. The Gemini API has its own data policies you should review.
- **Advanced system instructions:** For a more sophisticated medical chatbot, you could expand the `systemInstruction` to include specific medical knowledge domains, preferred response formats (for example, always list bullet points for symptoms), or even direct the AI to ask clarifying questions.
- **Tool use/function calling:** Gemini supports tool use (function calling), allowing the AI to interact with external services. For a health bot, this could mean:
  - Looking up drug information from a database.
  - Finding nearby clinics or pharmacies.
  - Accessing up-to-date medical research.
  - This would require more complex setup with backend functions that the AI can call.
  - **Speech-to-Text (STT) and Text-to-Speech (TTS):** While `flutter_ai_toolkit` handles audio input, you might want more fine-grained control over STT and TTS services for improved voice interaction.
- **Image processing and medical imaging:** For truly advanced medical applications, you might integrate specialized image processing libraries for analyzing medical images (for example, X-rays, MRIs), but this is a complex domain requiring expert knowledge and regulatory compliance. Our current setup allows Gemini to interpret images, but it relies on Gemini's general vision capabilities.

::: info Screenshots

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1749131323671/5768237e-2f4b-4c6b-aae6-23486dc8bb46.png)

You can check out the full project here:

<SiteInfo
  name="Atuoha/ai_medical_assistant"
  desc="AI medical assistant using Flutter and Gemini."
  url="https://github.com/Atuoha/ai_medical_assistant/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/b879e8c5fea8345d77a2e0af7235bf773059e183d4f1e24d5695823ed7e47e64/Atuoha/ai_medical_assistant"/>

:::

---

## Wrapping Up

You've now successfully built a foundational medical chatbot using Flutter and Google Gemini! This application demonstrates how to integrate a powerful AI model with a multi-modal user interface, while also enforcing specific behavioral constraints (health-only questions).

By extending this base with robust error handling, enhanced UX, and potentially advanced AI features like tool use, you can create even more sophisticated and valuable healthcare applications.

Remember to always prioritize user safety and data privacy when developing AI solutions in the medical domain.

### Flutter and Dart Packages:

::: info <code>flutter_ai_toolkit</code>

<SiteInfo
  name="flutter_ai_toolkit | Flutter package"
  desc="A set of AI chat-related widgets for Flutter apps targeting mobile, desktop, and web."
  url="https://pub.dev/packages/flutter_ai_toolkit"
  logo="https://pub.dev/static/hash-fboovmgk/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-fboovmgk/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="AI Toolkit"
  desc="Learn how to add the AI Toolkit chatbot to your Flutter application."
  url="https://docs.flutter.dev/ai-toolkit/"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

:::

::: info <code>google_generative_ai</code>

<SiteInfo
  name="google_generative_ai | Dart package"
  desc="The Google AI Dart SDK enables developers to use Google's state-of-the-art generative AI models (like Gemini)."
  url="https://pub.dev/packages/google_generative_ai/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-fboovmgk/img/pub-dev-icon-cover-image.png"/>

:::

### Google Gemini API and AI Studio:

<SiteInfo
  name="Google AI Studio"
  desc="Google AI Studio is the fastest way to start building with Gemini, our next generation family of multimodal generative AI models."
  url="https://aistudio.google.com/"
  logo="https://gstatic.com/aistudio/ai_studio_favicon_256x256.png"
  preview="https://ai.google.dev/static/site-assets/images/share-ais-02.png"/>

<SiteInfo
  name="Get a Gemini API key | Google AI for Developers"
  desc="Get your Gemini API key and start building in less than 5 minutes."
  url="https://ai.google.dev/gemini-api/docs/api-key/"
  logo="https://gstatic.com/devrel-devsite/prod/v7aeef7f1393bb1d75a4489145c511cdd5aeaa8e13ad0a83ec1b5b03612e66330/googledevai/images/favicon-new.png"
  preview="https://ai.google.dev/static/site-assets/images/api-key.png"/>

<SiteInfo
  name="Gemini API reference | Google AI for Developers"
  desc="The Gemini API lets you access the latest generative models from Google. This API reference provides detailed information for the classes and methods available in the Gemini API SDKs. Pick a language and follow the setup steps to get started building."
  url="https://ai.google.dev/api/"
  logo="https://gstatic.com/devrel-devsite/prod/v7aeef7f1393bb1d75a4489145c511cdd5aeaa8e13ad0a83ec1b5b03612e66330/googledevai/images/favicon-new.png"
  preview="https://ai.google.dev/static/site-assets/images/share-gemini-api.png"/>

### Flutter Documentation:

<SiteInfo
  name="Choose your development platform to get started"
  desc="Install Flutter and get started. Downloads available for Windows, macOS, Linux, and ChromeOS operating systems."
  url="https://docs.flutter.dev/get-started/install/"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

### General Concepts (for further reading):

<SiteInfo
  name="Material Design 3 - Google's latest open source design system"
  desc="Material Design 3 - Google's open-source design system, provides comprehensive guidelines, styles, &  components to create user-friendly interfaces."
  url="https://m3.material.io/"
  logo="https://m3.material.io/static/assets/m3-favicon.svg"
  preview="https://lh3.googleusercontent.com/FU4v8C136Tfg4kSvan7LgxVSRT91GPCmpOqhqV4Ghf_QYwBJ0pkvB4cFu1rQLkXSfrm1PVuy7MXTCWVW01hhmyexCH1XVI-WS4DUxJe83oHJ7Bf49NXD"/>

- **Large Language Models (LLMs):** A broad topic, but understanding the basics of how LLMs work will enhance comprehension of the `systemInstruction` and model behavior.
- **Multimodal AI:** Research on multimodal AI provides context for why Gemini can handle various input types (text, image, audio, and so on).
- **API Key Security Best Practices:** For production applications, it's crucial to understand secure API key management (for example, environment variables, secret management services). A good starting point would be general security best practices for API keys.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Medical Chatbot with Flutter and Gemini: A Beginner’s Guide",
  "desc": "In today's digital age, the demand for accessible and accurate health information is higher than ever. Leveraging the power of artificial intelligence, we can create intelligent chatbots that provide reliable health-related guidance. This beginner's ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-medical-chatbot-with-flutter-and-gemini.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
