---
lang: en-US
title: "How to Build a Multimodal Makaton-to-English Translator for Accessible Education"
description: "Article(s) > How to Build a Multimodal Makaton-to-English Translator for Accessible Education"
icon: fas fa-language
category:
  - AI
  - LLM
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Multimodal Makaton-to-English Translator for Accessible Education"
    - property: og:description
      content: "How to Build a Multimodal Makaton-to-English Translator for Accessible Education"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-a-multimodal-translator-for-accessible-education.html
prev: /ai/llm/articles/README.md
date: 2025-09-18
isOriginal: false
author:
  - name: OMOTAYO OMOYEMI
    url : https://freecodecamp.org/news/author/tayo4christ/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758158024064/bf3d7dac-0231-450a-9b40-6abf43085e49.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Multimodal Makaton-to-English Translator for Accessible Education"
  desc="A year nine student walks into class full of ideas, but when it is time to contribute, the tools around them do not listen. Their speech is difficult for standard voice systems to recognise, typing feels slow and exhausting, and the lesson moves on w..."
  url="https://freecodecamp.org/news/build-a-multimodal-translator-for-accessible-education"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1758158024064/bf3d7dac-0231-450a-9b40-6abf43085e49.png"/>

A year nine student walks into class full of ideas, but when it is time to contribute, the tools around them do not listen. Their speech is difficult for standard voice systems to recognise, typing feels slow and exhausting, and the lesson moves on without their voice being heard. The challenge is not a lack of ability but a lack of access.

Across the world, millions of learners face communication barriers. Some live with apraxia of speech or dysarthria, others with limited mobility, hearing differences, or neurodiverse needs. When speaking, writing, or pointing is unreliable or tiring, participation becomes limited, feedback is lost, and confidence slowly erodes. This is not a rare exception but an everyday reality in classrooms.

These barriers appear in very practical ways. Students are skipped or misunderstood when they cannot respond quickly. Their ability is under-measured because their means of expression are constrained. Teachers struggle to maintain the pace of lessons while making individual accommodations. Peers interact less often, reducing opportunities for social belonging.

Assistive technologies have helped over the years, with tools like text-to-speech, symbol boards, and simple gesture inputs. Yet most of these tools are designed for a single mode of interaction. They assume the learner will either speak, or type, or tap. Real communication, however, is fluid. Learners naturally combine gestures, partial speech, symbols, and context to share meaning, especially when fatigue, anxiety, or motor challenges come into play.

This is where modern AI changes the picture. We are beginning to move beyond single-solution tools into multimodal systems that can understand speech, even when it is disordered, interpret gestures and visual symbols, combine signals to infer intent, and adapt in real time as the learner’s abilities develop or change.

AI is reshaping accessibility in education by shifting from isolated tools to multimodal and adaptive systems. These systems combine gesture, speech, and intelligent feedback to meet learners where they are, while also supporting their growth over time.

In this article, we will explore what this shift looks like in practice, how it can unlock participation, and how adaptive feedback personalises support and we will also build a hands-on multimodal demo that turns these ideas into a classroom-ready tool.

::: note Prerequisites

- **An Operating System:** Windows, macOS, or Linux
- **Python installed (3.9 or later)** – Along with `pip` for installing packages.
- **Editor:** Visual Studio Code or any Integrated development environment (IDE)
- **Basics:** Comfortable running commands in a terminal
- **Optional hardware:** Microphone (speech input), Webcam (single-frame tab), speakers (TTS playback)
- **Internet:** Required for the default SpeechRecognition (Google Web Speech API) and gTTS
- **No dataset/model needed:** A stub gesture classifier is provided so the demo runs end-to-end

:::

---

## What We’ve Achieved So Far

The past few years have shown how AI can make classrooms more inclusive when we focus on accessibility. Developers, educators, and researchers are already experimenting with tools that bridge communication gaps.

In [**my first freeCodeCamp tutorial**](/freecodecamp.org/create-a-real-time-gesture-to-text-translator.md), I built a gesture-to-text translator using MediaPipe. This project demonstrated how computer vision can track hand movements and convert them into text in real time. For learners who rely on gestures, this kind of system can provide a bridge to participation.

Here is a simplified example of how MediaPipe detects hand landmarks:

```py
import mediapipe as mp
import cv2

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands()

# Start capturing video from the webcam
cap = cv2.VideoCapture(0)

# Capture a frame from the video
ret, frame = cap.read()

# Process the frame to detect hand landmarks
results = hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

# Print the detected hand landmarks
print("Hand landmarks:", results.multi_hand_landmarks)
```

This small piece of code shows how MediaPipe processes a video frame and extracts hand landmarks. From there, you can classify gestures and map them to text.

👉 You can explore the full project on [GitHub (<VPIcon icon="iconfont icon-github"/>`tayo4christ/Gesture_Article`)](https://github.com/tayo4christ/Gesture_Article) or read the complete tutorial on [**freeCodeCamp**](/freecodecamp.org/create-a-real-time-gesture-to-text-translator.md).

In another [**freeCodeCamp article**](/freecodecamp.org/build-ai-accessibility-tools-with-python.md), I demonstrated how to build AI accessibility tools with Python, such as speech recognition and text-to-speech. These projects provided readers with a foundation for building their own inclusive tools, and you can find the full source code in the [repository (<VPIcon icon="iconfont icon-github"/>`tayo4christ/inclusive-ai-toolkit`)](https://github.com/tayo4christ/inclusive-ai-toolkit).

Beyond these individual projects, the wider field has also made significant progress. Advances in sign language recognition have improved accuracy in capturing complex hand shapes and movements. Text-to-speech systems have become more natural and adaptive, giving users voices that sound closer to human speech. Mobile and desktop accessibility apps have brought these capabilities into everyday classrooms.

These achievements are encouraging, but they remain limited. Most of today’s tools are still designed for a single mode of communication. A system may work for gestures, or for speech, or for text, but not all of them together.

The next step is clear: we need multimodal, adaptive AI tools that can blend gestures, speech, and feedback into unified systems. This is where the most exciting opportunities in accessibility lie, and it is where we will turn next.

![Figure 1: Comparison of isolated single-modality systems with unified multimodal AI systems.](https://github.com/tayo4christ/ai-accessibility-articles-assets/blob/main/single-vs-multimodal.png?raw=true)

---

## Case Study 1: Translating Makaton to English

One of my first projects in this area focused on translating Makaton into English.

Makaton is a language programme that uses signs and symbols to support people with speech and language difficulties. It is widely used in classrooms where learners may not rely fully on speech. The challenge is that while a learner communicates in Makaton, their teachers and peers often work in English, which creates a communication gap.

::: info The AI Workflow

The system followed a clear pipeline:

```plaintext
Camera Input → Hand Landmark Detection → Gesture Classification → English Translation Output
```
<!-- TODO: mermiad -->

![Figure 2: AI workflow for translating Makaton gestures into English.](https://github.com/tayo4christ/ai-accessibility-articles-assets/blob/main/makaton-workflow.png?raw=true)

- **Camera Input**: captures the learner’s Makaton sign.
- **Hand Landmark Detection**: a vision library such as MediaPipe or OpenCV identifies the position of the fingers and hands.
- **Gesture Classification**: a trained machine learning model classifies which Makaton sign was made.
- **English Translation Output**: the system maps that gesture to its English word or phrase and displays it.

:::

### Example in Python

Here is a simplified version of how this workflow might look in code:

```py
# Step 1: Capture input
frame = camera.read()

# Step 2: Detect hand landmarks
landmarks = mediapipe.process(frame)

# Step 3: Classify gesture
gesture = gesture_model.predict(landmarks)

# Step 4: Translate to English
translation_map = {
    "hello_sign": "Hello",
    "thank_you_sign": "Thank you"
}
text = translation_map.get(gesture, "Unknown sign")

print("Makaton sign:", gesture, " -> English:", text)
```

This is a simplified example, but it shows the core idea: map gestures to meaning and then bridge that meaning into English.

::: important Why This Matters

Imagine a student signing *thank you* in Makaton and the system instantly displaying the words on screen. Teachers can check understanding, peers can respond naturally, and the learner’s contribution becomes visible to everyone.

The key takeaway is that AI can bridge symbol and gesture based languages with mainstream spoken and written communication. Instead of forcing learners to adapt to rigid systems, we can design systems that adapt to the way they already communicate.

:::

---

## Case Study 2: AURA Prototype (Adaptive Speech Assistant)

Another project I worked on is called [<VPIcon icon="fas fa-globe"/>AURA](https://aura-apraxia-aac-a8qejouwasaqequrhetbfw.streamlit.app/), the *Apraxia of Speech Adaptive Understanding and Relearning Assistant*. The idea was to design a system that not only recognises speech but also supports learners with speech disorders by detecting errors, adapting feedback, and offering multimodal alternatives.

### The Challenge

Most commercial speech recognition systems fail when a person’s speech does not follow typical patterns. This is especially true for people with apraxia of speech, where motor planning difficulties make pronunciation inconsistent. The result is frequent misrecognition, frustration, and exclusion from tools that rely on voice input.

::: info The AI Workflow

The AURA prototype used a layered architecture:

```plaintext
Speech Input → Wav2Vec2 (fine-tuned for disordered speech) → CNN + BiLSTM Error Detection → Reinforcement Learning Feedback → Multimodal Output (Speech + Gesture)
```
<!-- TODO: mermiad -->

![Figure 3: Workflow of the AURA prototype, combining speech, error detection, adaptive feedback, and multimodal outputs.](https://github.com/tayo4christ/ai-accessibility-articles-assets/blob/main/aura-workflow.png?raw=true)

- **Wav2Vec2 Speech Recognition**: fine-tuned on disordered speech to improve transcription accuracy.
- **CNN + BiLSTM Model**: classifies articulation or phonological errors in real time.
- **Reinforcement Learning Engine**: adapts feedback loops so therapy suggestions improve as the learner progresses.
- **Gesture-to-Speech Multimodal Input**: when speech is too difficult, MediaPipe gestures can be used to trigger spoken outputs.
- **Streamlit Interface**: integrates everything into a single accessible app for testing.

:::

Here’s a simplified view of how an error detection module could be structured:

```py
# Example: Error classification using CNN + BiLSTM
import torch
import torch.nn as nn

# Define the ErrorClassifier model
class ErrorClassifier(nn.Module):
    def __init__(self):
        super(ErrorClassifier, self).__init__()
        self.cnn = nn.Conv1d(in_channels=40, out_channels=64, kernel_size=3)
        self.lstm = nn.LSTM(64, 128, batch_first=True, bidirectional=True)
        self.fc = nn.Linear(256, 3)  # Output classes: e.g. correct, substitution, omission

    def forward(self, x):
        x = self.cnn(x)
        x, _ = self.lstm(x)
        return self.fc(x[:, -1, :])

# Instantiate the model
model = ErrorClassifier()
```

This snippet shows the heart of the error detection pipeline: combining CNN layers for feature extraction with BiLSTMs for sequence modeling. The model can flag articulation errors, which then guide the feedback loop.

::: important Why This Matters

With AURA, the goal was not just to recognise what someone said, but to help them communicate more effectively. The prototype adapted in real time offering corrective feedback, suggesting gestures, or switching modes when speech became difficult.

The takeaway is that AI can evolve from being a passive recognition tool into an active partner in learning and communication.

:::

---

## The Bigger Picture: Multimodal Accessibility Tools

The two projects we explored, translating Makaton into English and building the AURA prototype highlight a much larger transformation underway. Accessibility technology is moving away from isolated, single-purpose applications toward multimodal platforms that bring together speech, gestures, text, and adaptive AI into one seamless system.

### Why This Shift Matters

The benefits of this shift are profound:

- **Greater inclusivity in classrooms**: learners who rely on different modes of communication can participate equally.
- **Real-time support**: systems that detect errors or adapt to gestures give learners immediate feedback rather than delayed corrections.
- **Lower frustration**: multimodal options mean if one channel breaks down (for example, speech), others like gesture or text can take over smoothly.
- **Confidence and independence**: learners express themselves more fully, without depending heavily on support staff or interpreters.

### Beyond the Classroom

The impact of multimodal accessibility extends across many sectors:

- In **healthcare**, patients with communication difficulties can use multimodal AI assistants to express needs clearly, reducing misdiagnosis and stress.
- In the **workplace**, employees with speech or motor impairments can collaborate effectively using adaptive AI tools.
- In **community settings**, individuals can participate more freely in conversations, services, and digital platforms, strengthening social inclusion.

### Visualising the Shift

![Multimodal Applications](https://github.com/tayo4christ/ai-accessibility-articles-assets/blob/main/multimodal-applications.png?raw=true)

---

## How to Build a Multimodal Makaton to English Translator (Gesture + Speech)

This demo combines both use cases: a Makaton to English classroom tool and the AURA assistive speech path. It prioritizes gesture when a sign is detected, falls back to speech when it isn’t, and produces a unified English output (with optional text-to-speech). We’ll focus on the translation layer, multimodal fusion, and a simple Streamlit UI.

### Project structure

```plaintext title="file structure"
makaton_multimodal_demo/
├─ .streamlit/
│   └─ config.toml 
├─ assets/
│   └─ README.txt 
├─ tests/
│   └─ test_fuse.py 
└─ streamlit_app.py
```

The structure provided above outlines the organization of a project directory for a multimodal Makaton to English translator demo using Streamlit. Here's a brief explanation of each component:

- <VPIcon icon="fas fa-folder-open"/>`makaton_multimodal_demo/`: This is the root directory of the project.
- <VPIcon icon="fas fa-folder-open"/>`.streamlit/`: This directory contains configuration files for Streamlit, which is a framework used to build web apps in Python. The <VPIcon icon="iconfont icon-toml"/>`config.toml` file is optional and can be used to customize the Streamlit app's settings.
- <VPIcon icon="fas fa-folder-open"/>`assets/`: This directory is intended to store models or other necessary files for the project. The <VPIcon icon="fas fa-file-lines"/>`README.txt` serves as a placeholder to indicate where these files should be placed.
- <VPIcon icon="fas fa-folder-open"/>`tests/`: This directory is for test scripts. The <VPIcon icon="fa-brands fa-python"/>`test_fuse.py` file likely contains tests for the fusion function, which is a part of the multimodal translation process.
- <VPIcon icon="fa-brands fa-python"/><VPIcon icon="fa-brands fa-python"/>`streamlit_app.py`: This is the main application file where the Streamlit app is implemented. It contains the code that runs the app, handling the user interface and the logic for translating Makaton gestures and speech into English.

### Install & run

```sh
# (optional) create and activate a virtualenv
python -m venv .venv
```

::: code-tabs#sh

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
..venv\Scripts\activate
```

@tab <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
source .venv/bin/activate
```

:::

The code snippet above provides instructions for creating and activating a Python virtual environment, which is a self-contained directory that contains a Python installation for a particular version of Python, plus several additional packages.

1. `python -m venv .venv`: This command creates a new virtual environment in a directory named `.venv`. The `venv` module is used to create lightweight virtual environments.
2. `..venv\Scripts\activate` (Windows): This command activates the virtual environment on Windows. Once activated, the environment's Python interpreter and installed packages will be used.
3. `source .venv/bin/activate` (macOS/Linux): This command activates the virtual environment on macOS or Linux. Similar to Windows, activating the environment ensures that the specific Python interpreter and packages within the environment are used.

### Install dependencies

```sh
pip install streamlit opencv-python mediapipe SpeechRecognition gTTS pydub numpy
```

The command above is used to install multiple Python packages at once. Here's what each package does:

- **streamlit**: A framework for building interactive web applications in Python, often used for data science and machine learning projects.
- **opencv-python**: Provides OpenCV, a library for computer vision tasks such as image processing and video analysis.
- **mediapipe**: A library developed by Google for building cross-platform, customizable machine learning solutions for live and streaming media, including hand and face detection.
- **SpeechRecognition**: A library for performing speech recognition, allowing Python to recognize and process human speech.
- **gTTS**: Google Text-to-Speech, a library and CLI tool to interface with Google Translate's text-to-speech API, enabling text-to-speech conversion.
- **pydub**: A library for audio processing, allowing manipulation of audio files, such as converting between different audio formats.
- **numpy**: A fundamental package for scientific computing in Python, providing support for arrays and matrices, along with a collection of mathematical functions.

### Create <VPIcon icon="fa-brands fa-python"/>`streamlit_app.py`

```py :collapsed-lines title="streamlit_app.py"
from io import BytesIO
from typing import Optional
import streamlit as st

# Optional deps (kept optional so readers can still run the core demo)
try:
    import cv2
    import mediapipe as mp
    MP_OK = True
except Exception:
    MP_OK = False

try:
    import speech_recognition as sr
    SR_OK = True
except Exception:
    SR_OK = False

try:
    from gtts import gTTS
    GTTS_OK = True
except Exception:
    GTTS_OK = False

# --- 1) Minimal Makaton dictionary (extend as needed)
MAKATON_DICT = {
    "hello_sign": "Hello",
    "thank_you_sign": "Thank you",
    "help_sign": "Help",
    "toilet_sign": "Toilet",
    "stop_sign": "Stop",
}

# --- 2) Gesture classifier (stub for the demo)
def classify_gesture(landmarks) -> Optional[str]:
    """
    Return a canonical label like 'hello_sign' or None if unknown.
    Replace this stub with your trained model + confidence threshold.
    """
    return "hello_sign" if landmarks else None

# --- 3) Speech recognizer (fallback path)
def transcribe_speech(seconds: int = 3) -> Optional[str]:
    if not SR_OK:
        return None
    r = sr.Recognizer()
    try:
        with sr.Microphone() as source:
            st.info("Listening...")
            audio = r.listen(source, phrase_time_limit=seconds)
        return r.recognize_google(audio)
    except Exception as e:
        st.warning(f"Speech recognition error: {e}")
        return None

# --- 4) Fusion logic (gesture first, speech fallback)
def fuse(gesture_label: Optional[str], speech_text: Optional[str]) -> str:
    if gesture_label and gesture_label in MAKATON_DICT:
        return MAKATON_DICT[gesture_label]
    if speech_text:
        return speech_text
    return "No input detected"

# --- 5) Optional: extract single-frame hand landmarks using MediaPipe
def extract_hand_landmarks_from_image(image_bytes: bytes):
    if not MP_OK:
        return None
    try:
        import numpy as np
        np_arr = np.frombuffer(image_bytes, dtype=np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        if img is None:
            return None

        mp_hands = mp.solutions.hands
        with mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.5) as hands:
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            result = hands.process(img_rgb)

        if not result.multi_hand_landmarks:
            return None

        hand_landmarks = result.multi_hand_landmarks[0]
        return [(lm.x, lm.y, lm.z) for lm in hand_landmarks.landmark]
    except Exception:
        return None

# --- 6) Streamlit UI
st.set_page_config(page_title="Makaton → English (Multimodal Demo)")
st.title("Makaton → English (Multimodal Demo)")
st.caption("Combines a classroom Makaton translator with an assistive speech path (AURA-style).")

with st.expander("What this demo shows"):
    st.write(
        "- **Translation layer:** small Makaton dictionary you can extend.\n"
        "- **Multimodal fusion:** gesture prioritized, speech as fallback.\n"
        "- **UI:** one page, clear output, optional text-to-speech."
    )

tabs = st.tabs(["Simulated Sign", "Single-Frame Webcam (Optional)", "About"])

# Tab 1: Simulated (no CV model required)
with tabs[0]:
    st.subheader("Simulated Gesture + Speech")
    col1, col2 = st.columns(2)

    with col1:
        simulate = st.selectbox(
            "Pick a sign",
            ["", "hello_sign", "thank_you_sign", "help_sign", "toilet_sign", "stop_sign"],
            index=0
        )
        gesture_label = simulate or None

    with col2:
        speech_text = st.session_state.get("speech_text")
        st.write("Current speech:", speech_text or "None")
        if st.button("Transcribe 3s"):
            if SR_OK:
                speech_text = transcribe_speech(3)
                st.session_state["speech_text"] = speech_text
            else:
                st.warning("SpeechRecognition not installed.")

    output = fuse(gesture_label, st.session_state.get("speech_text"))
    st.markdown(f"### Output: **{output}**")

    if output and output != "No input detected":
        if st.button("Speak output"):
            if GTTS_OK:
                mp3 = BytesIO()
                try:
                    gTTS(output).write_to_fp(mp3)
                    st.audio(mp3.getvalue(), format="audio/mp3")
                except Exception as e:
                    st.warning(f"TTS failed: {e}")
            else:
                st.warning("gTTS not installed.")

# Tab 2: Optional single-frame webcam capture
with tabs[1]:
    st.subheader("Single-Frame Hand Detection (Webcam)")
    if not MP_OK:
        st.warning("Install MediaPipe + OpenCV to enable this tab.")
    else:
        img = st.camera_input("Capture a frame")
        captured_label = None
        if img is not None:
            landmarks = extract_hand_landmarks_from_image(img.getvalue())
            if landmarks:
                captured_label = classify_gesture(landmarks)
                st.success("Hand detected.")
            else:
                st.info("No hand landmarks found. Try better lighting/framing.")

        if st.button("Transcribe 3s (webcam tab)"):
            st.session_state["speech_text2"] = transcribe_speech(3) if SR_OK else None

        speech_text2 = st.session_state.get("speech_text2")
        st.write("Current speech:", speech_text2 or "None")

        output2 = fuse(captured_label, speech_text2)
        st.markdown(f"### Output: **{output2}**")

        if output2 and output2 != "No input detected":
            if st.button("Speak output (webcam tab)"):
                if GTTS_OK:
                    mp3 = BytesIO()
                    try:
                        gTTS(output2).write_to_fp(mp3)
                        st.audio(mp3.getvalue(), format="audio/mp3")
                    except Exception as e:
                        st.warning(f"TTS failed: {e}")
                else:
                    st.warning("gTTS not installed.")
```

The code above creates a Streamlit application that combines gesture recognition and speech recognition to translate Makaton signs into English. Here's a brief explanation of how it works:

1. **Dependencies and Setup**: The code attempts to import optional dependencies like OpenCV, MediaPipe, SpeechRecognition, and gTTS. These are used for gesture detection, speech recognition, and text-to-speech functionalities.
2. **Makaton Dictionary**: A minimal dictionary that maps Makaton signs to English words. This can be extended to include more signs.
3. **Gesture Classifier**: A placeholder function (`classify_gesture`) is used to classify hand gestures. In a real application, this would be replaced with a trained model.
4. **Speech Recognizer**: The `transcribe_speech` function uses the SpeechRecognition library to convert spoken words into text, serving as a fallback when gestures are not detected.
5. **Fusion Logic**: The `fuse` function prioritizes gesture recognition over speech. If a gesture is recognized, it translates it using the dictionary; otherwise, it uses the transcribed speech.
6. **Hand Landmark Extraction**: The code includes a function to extract hand landmarks from an image using MediaPipe, which is used for gesture classification.
7. **Streamlit UI**: The user interface is built with Streamlit, featuring tabs for simulated gestures, webcam-based gesture detection, and additional information. Users can simulate gestures, capture gestures via webcam, and use speech input. The output is displayed and can be converted to speech using gTTS.

This application demonstrates a multimodal approach by integrating both gesture and speech recognition to facilitate communication for users who rely on Makaton.

### Run

```sh
streamlit run .\streamlit_app.py
```

The command above is used to launch a Streamlit application. When executed, it starts a local web server and opens the specified Python script in a web browser, allowing you to interact with the app's user interface. This command is typically run in a terminal or command prompt.

![Figure — App interface: the Simulated Sign tab before any input.](https://github.com/tayo4christ/ai-accessibility-articles-assets/blob/8117234b9dc032aa0f4ff32abad92e7ad3344b81/ui-home-simulated-tab.jpg?raw=1)

![Figure — Selecting `hello_sign` produces “Output: Hello”.](https://github.com/tayo4christ/ai-accessibility-articles-assets/blob/8117234b9dc032aa0f4ff32abad92e7ad3344b81/ui-simulated-hello-output.jpg?raw=1)

---

## Project Overview

You have developed a multimodal translator that integrates both gesture recognition (specifically Makaton signs) and speech recognition to produce a unified English output. The system is designed to prioritize gesture input, using speech as a fallback when gestures are not detected.

### User Interface

The application is built using Streamlit, featuring two main tabs:

- **Simulated Sign Tab**: Allows users to simulate gestures without requiring computer vision (CV) capabilities.
- **Webcam Single Frame Tab**: Optionally uses a webcam to capture and process a single frame for gesture detection.

### Use Case Integration

- **Makaton to English Translation**: In a classroom setting, detected Makaton signs are translated into short English phrases, facilitating communication.
- **AURA-style Assistive Path**: If no gesture is detected, the system relies on speech input to generate an output, ensuring continuous communication support.

### Design Limitations

- The gesture classifier is currently a placeholder and should be replaced with a trained model that includes a confidence threshold for better accuracy.
- The Makaton dictionary is minimal and can be expanded to include more phrases and templates.
- The speech recognition component uses a basic recognizer. For improved robustness, consider using advanced models like Wav2Vec2 or offline automatic speech recognition (ASR) systems.

### Suggested Extensions

- Implement a confidence threshold to display both gesture and speech inputs when the system is uncertain.
- Expand the dictionary to support slot templates, such as "I want \[item\]".
- Introduce a toggle to switch between speech-first and gesture-first input priorities.
- Enable logging of outputs for teachers and provide an option to export these logs as CSV files.
- Consider replacing gTTS with an offline text-to-speech solution for better reliability.

### Troubleshooting Tips

- If you encounter microphone errors, ensure that pyaudio is installed. On Windows, use `pip install pipwin` followed by `pipwin install pyaudio`.
- If the webcam is not detected, check your browser permissions. The Simulated Sign tab can still be used without a webcam.
- If there are issues with package imports, verify that they are installed in your active virtual environment.

The link to the full code: [Multimodal_Makaton (<VPIcon icon="iconfont icon-github"/>`tayo4christ/makaton-multimodal-demo`)](https://github.com/tayo4christ/makaton-multimodal-demo/tree/main/makaton_multimodal_demo)

---

## Challenges and Ethical Considerations

While the promise of multimodal accessibility tools is exciting, building them responsibly requires us to confront several challenges. These are not only technical problems but also ethical ones that affect how learners, teachers, and communities experience AI.

### Data Scarcity

Training AI systems requires large, diverse datasets. But when it comes to disordered speech or symbol systems like Makaton, the data is limited. Without enough examples, models risk being inaccurate or biased toward a narrow group of users. Collecting more data is essential, but it must be done ethically, with consent and respect for the communities involved.

### Fairness and Inclusion

AI systems often work better for some groups than others. A model trained mostly on fluent English speakers may fail to recognise learners with strong accents or speech difficulties. Similarly, gesture recognition may not account for differences in motor ability. Fairness means designing models that work across abilities, accents, and cultures, so that no group is excluded by design.

### Privacy and Security

Speech and video data are highly sensitive, especially when collected in schools. Protecting this data is not optional, it is a requirement. Systems must anonymize or encrypt recordings and store them securely. Transparency is also key: learners, parents, and teachers should know exactly how data is being used and who has access to it.

### Accessibility of the Tools Themselves

Ironically, many “accessibility tools” remain inaccessible because they are expensive, require powerful hardware, or are too complex to use. For AI to truly reduce barriers, solutions must be affordable, lightweight, and easy for teachers to set up in real classrooms, not just in research labs.

### Takeaway

These challenges remind us that accessibility in AI is not only a technical question but also an ethical and social responsibility. To build tools that genuinely help learners, we need collaboration between developers, educators, policymakers, and the communities who will use the systems.

---

## Where We’re Heading Next

The future of AI accessibility tools is speculative, but the possibilities are both exciting and necessary. What we have now are prototypes and early systems. What lies ahead are tools that could reshape how classrooms and society more broadly approach communication and inclusion.

### Multilingual Makaton Translation

One promising direction is the ability to translate Makaton across multiple languages. A learner in the UK could sign in Makaton and see their contribution appear not just in English but in French, Spanish, or Yoruba. This would open up international classrooms and give learners access to global opportunities that are often closed off by language barriers.

### AI Tutors with Dynamic Adaptation

Imagine a classroom assistant powered by AI that adapts in real time. If a learner struggles with speech, it could switch to gesture recognition. If gestures become tiring, it could prompt the learner with symbol-based options. These AI tutors would not only support communication but also guide learning, adapting to each student’s strengths and challenges over time.

### Wearable Multimodal Devices

The rise of lightweight hardware makes it possible to imagine wearable AI assistants that provide instant translation and support. Glasses could capture gestures and overlay text, while earbuds could translate disordered speech into clear audio for peers and teachers. Instead of bulky setups, accessibility would become portable, personal, and ever-present.

### A Broader Impact

These innovations go beyond technology alone. They align with the United Nations Sustainable Development Goals (SDGs) especially:

- **Quality Education (Goal 4):** ensuring that every learner, regardless of ability, has equal access to education.
- **Reduced Inequalities (Goal 10):** breaking down barriers so that disability or difference is not a cause of exclusion.

The journey from single-modality tools to multimodal, adaptive systems is still in its early stages. But if we continue to push forward with creativity, ethics, and inclusivity at the center, AI accessibility tools will not only change classrooms they will change lives.

---

## Conclusion: Building an Inclusive Future with AI

AI accessibility tools are no longer just optional add-ons for a few learners. They are becoming core enablers of inclusion in education, healthcare, workplaces, and daily life.

The journey from early gesture recognition systems to multimodal, adaptive prototypes like Makaton translation and AURA shows what is possible when technology is designed around people rather than forcing people to adapt to technology. These innovations break down communication barriers and open up new opportunities for learners who have too often been left on the margins.

But the future of accessibility is not automatic. It depends on choices we make now as developers, educators, researchers, and policymakers. Building tools that are open, ethical, and affordable requires collaboration and commitment.

The vision is clear: a world where every learner, regardless of ability, can express themselves fully, be understood by others, and participate with confidence.

**The future of education is inclusive and with thoughtful design, AI can help us get there.**

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Multimodal Makaton-to-English Translator for Accessible Education",
  "desc": "A year nine student walks into class full of ideas, but when it is time to contribute, the tools around them do not listen. Their speech is difficult for standard voice systems to recognise, typing feels slow and exhausting, and the lesson moves on w...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/build-a-multimodal-translator-for-accessible-education.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
