---
lang: en-US
title: "How to Build a Real-Time Public Speaking and Presentation Coach"
description: "Article(s) > How to Build a Real-Time Public Speaking and Presentation Coach"
icon: fa-brands fa-python
category:
  - Python
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Real-Time Public Speaking and Presentation Coach"
    - property: og:description
      content: "How to Build a Real-Time Public Speaking and Presentation Coach"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-real-time-public-speaking-and-presentation-coach.html
prev: /programming/py/articles/README.md
date: 2026-02-12
isOriginal: false
author:
  - name: Timothy Olanrewaju
    url: https://freecodecamp.org/news/author/SmoothTech/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770847484536/70b63767-cc74-4628-a4d1-6bd8c38a5a0c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Real-Time Public Speaking and Presentation Coach"
  desc="Nowadays, being able to present an idea, project, or achievement is a must-have skill. The ability to showcase and talk about your work can determine whether you’re getting that degree, funding, or approval. But while effective communication is impor..."
  url="https://freecodecamp.org/news/how-to-build-a-real-time-public-speaking-and-presentation-coach"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1770847484536/70b63767-cc74-4628-a4d1-6bd8c38a5a0c.png"/>

Nowadays, being able to present an idea, project, or achievement is a must-have skill. The ability to showcase and talk about your work can determine whether you’re getting that degree, funding, or approval.

But while effective communication is important, it’s not a skill everyone possesses. It’s something you build through consistent practice.

Therein lies the challenge: when practicing on our own, it’s easy to overlook composure, posture, and delivery, which are just as important as the speech itself.

That’s where we need a coach. They’re a second pair of eyes and ears that takes note of crucial details and relays them to you while you present. Thanks to recent advancements in visual AI, you can now receive continuous and objective feedback at any time. Frameworks like [Vision Agents (<VPIcon icon="iconfont icon-github"/>`GetStream/Vision-Agents`)](https://github.com/GetStream/Vision-Agents) allow you to connect powerful visual models seamlessly and build your desired AI-powered applications.

In this article, we’ll build a real-time public speaking and presentation coach powered by Vision Agents, which you can run on your PC or Mac to practice and improve your delivery.

---

## ​What We’ll Be Building

In this guide, we’ll be walking through how to build a coaching agent that acts as your personal practice companion. This agent will provide real-time feedback, highlighting areas for improvement and offering helpful tips via audio and text.

They’ll track several aspects of your presentation, looking out for:

- **Filler words**: to help you reduce the use of words such as “um”, “uh”, “like” and “you know”.
- **Speaking pace**: to identify whether you’re talking too fast or too slow.
- **Vocal variety**: to point out if you’re sounding monotonous.
- **Clarity**: to listen to whether your words are clear enough.
- **Posture**: to check if you’re maintaining good or bad body posture. Look out for your shoulders, back and chin.
- **Hand gestures**: to monitor the use of your hands.
- **Eye contact**: to track whether your eyes are directly looking at your audience.

You now have a mental picture of what we’re setting out to build.

Better still, here’s a visual look at how this coach looks and works.

<VidStack src="youtube/C7ijn8Pmhbw" />

::: info

You can find all the code in this tutorial in this [repo (<VPIcon icon="iconfont icon-github"/>`TimothyOlanrewaju/Public-Speaking-and-Presentation-Coach`)](https://github.com/TimothyOlanrewaju/Public-Speaking-and-Presentation-Coach).

<SiteInfo
  name="TimothyOlanrewaju/Public-Speaking-and-Presentation-Coach"
  desc="Contribute to TimothyOlanrewaju/Public-Speaking-and-Presentation-Coach development by creating an account on GitHub."
  url="https://github.com/TimothyOlanrewaju/Public-Speaking-and-Presentation-Coach/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/455fb64edcad32d3f1d1db9ce7233decc4125dd669a0a93f7ece130436c77a1b/TimothyOlanrewaju/Public-Speaking-and-Presentation-Coach"/>

:::

::: note Technical Prerequisites

Before we begin, ensure you have:

- A [<VPIcon icon="fas fa-globe"/>free Stream account](https://getstream.io/accounts/login/).
- [<VPIcon icon="fa-brands fa-python"/>Python](https://python.org/downloads/) installed on your PC.
- An [<VPIcon icon="iconfont icon-openai"/>OpenAI API Key](https://platform.openai.com/).
- Basic knowledge of Python.

:::

## Key Technologies

First, let's introduce the major players in our presentation coach implementation and their respective roles.

### Stream Video

[<VPIcon icon="fas fa-globe"/>Stream Video](https://getstream.io/video/) is a complete video infrastructure built on WebRTC, enabling browsers and apps to send live audio and video. It comes supercharged with a global edge network that routes your video to the closest server in under 30 milliseconds. This means that for our presentation coach, the AI can join your practice session like a real participant, seeing and hearing you in real-time with no lag while also providing feedback.

### ​Vision Agents

[<VPIcon icon="fas fa-globe"/>Vision Agents](https://visionagents.ai/) is an open-source framework from Stream that allows you to connect video streams, AI models, and chat interfaces. It ships with Stream Video as its default transport layer.

This framework simplifies the development of multimodal AI agentic applications by providing a unified Agent class that orchestrates everything. With Vision Agents, you can connect models and also get them to work together seamlessly as one coordinated system.

### OpenAI RealTime API

[<VPIcon icon="fas fa-globe"/>OpenAI RealTime API](https://visionagents.ai/integrations/openai) allows you to stream live, low-latency interactions with OpenAI models. Its strength lies in its ability to handle speech-to-speech in one go. Your words go in, the AI thinks about them, and you get audio and text feedback almost instantaneously. Your app and model can communicate instantly, just like a live conversation. This will be the presentation coach’s actual brainbox.

### YOLO11

[<VPIcon icon="fas fa-globe"/>YOLO11](https://docs.ultralytics.com/) is a modern and powerful computer vision model developed by Ultralytics. It supports a wide range of tasks, including object detection, instance segmentation, image classification, pose estimation/keypoint detection, and oriented bounding box detection.

It tracks 17 different points on your body, such as your shoulders, head, and hand positions, and also attempts to determine your posture at specific times. Our presentation coach will focus on the aspects of pose estimation and keypoint detection.

![Real-time AI presentation coach pipeline combining live video pose detection and speech transcription to deliver voice and text feedback.](https://cdn.hashnode.com/res/hashnode/image/upload/v1770651953726/77a8feee-3fd9-46dd-90a5-da6527f1ecac.png)

---

## Project Setup

Now, let's get straight into building this presentation coach with all the technologies we’ve highlighted.

We’ll start bu installing uv, which is the recommended installer for Vision Agents. Create a project folder and run this command in the terminal if you’re using pip installer:

```sh
pip install uv
```

::: tabs

@tab:active <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
curl -LsSf https://astral.sh/uv/install.sh | sh.
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```powershell
powershell -ExecutionPolicy ByPass -c \"irm https://astral.sh/uv/install.ps1 | iex\"
```

:::

```sh
# Next, initialize uv in your project: 
uv init
# Then create a virtual environment:
uv venv
# And activate the virtual environment:
.venv\Scripts\activate
```

Now install [Vision Agents (<VPIcon icon="iconfont icon-github"/>`GetStream/Vision-Agents`)](https://github.com/GetStream/Vision-Agents) with the required plugins and dependencies:

```sh
uv add vision-agents[getstream,openai,ultralytics] python-dotenv
```

In the root directory, create an <VPIcon icon="iconfont icon-dotenv"/>`.env` file and provide the necessary credentials:

```sh title=".env"
STREAM_API_KEY=your-stream-api-key
STREAM_API_SECRET=your-stream-secret
OPENAI_API_KEY=your-openai-api-key
CALL_ID="practice-room" //feel free to call it any name
```

In the root directory, create an <VPIcon icon="fas fa-folder-open"/>`instructions` folder and a Markdown file called <VPIcon icon="fa-brands fa-markdown"/>`coach.md` inside it.

In the root directory, create a file and name it <VPIcon icon="fa-brands fa-python"/>`download_yolo_pose.py`.

Your current project folder structure should look like this:

```sh title="file structure
└── 📁Presentation Coach
    └── 📁.venv
    └── 📁instructions
        ├──coach.md
    └── .env
    └── .gitignore
    └── download_yolo_pose.py
    └── main.py
    └── pyproject.toml
    └── README.md
    └── uv.lock
```

---

## Set Up YOLO

The Ultralytics YOLO11 framework uses the `yolo11n-pose.pt` model file to watch your posture throughout your presentation. This pre-trained deep learning model file performs pose estimation by detecting keypoints. In your <VPIcon icon="fa-brands fa-python"/>`download_yolo_pose.py` file, insert this:

```py title="download_yolo_pose.py"
from ultralytics import YOLO
import shutil
from pathlib import Path

model = YOLO("yolo11n-pose.pt")  
project_root = Path(__file__).parent
target = project_root / "yolo11n-pose.pt"

if not target.exists():
    print("Copying model to project root...")
    shutil.copy2(model.model.path, target)
else:
    print("Model already in project root.")

print(f"Ready: {target.resolve()}")
```

This automatically downloads the `yolo11n-pose.pt` file, if absent in your project, and copies it to the project root.

---

## Coaching Instructions

AI plays the role of the coach in this implementation. The <VPIcon icon="fa-brands fa-markdown"/>`coach.md` file gives it its entire personality, expertise, and coaching philosophy. You specify the tone, output rate, length of response, speaking pace, timing of feedback, and other metrics you want your AI to follow. Without these instructions, you’ll receive generic responses, vague tips, lengthy responses, and interruptions.

Paste this in your <VPIcon icon="fa-brands fa-markdown"/>`coach.md` file to get the best results:

```md :collapsed-lines title="instructions/coach.md"
These instructions describe how the coaching system should behave when someone is practicing a presentation. Ensure to give quick, specific tips and try not to interrupt their flow. Only provide feedback after detecting at least 3-5 seconds of silence.

On format, feedback should appear like short texts on screen and keep them within 1 or 2 sentences maximum.

You want people to be relaxed during the presentation, so, ensure you start with something positive and always add one actionable tip.

You’ll have access to video feeds, transcripts and pose data. That’s enough to get a good idea of pace, body language and how engaged they look.

A big part of your evaluation is to understand their speech. You should look out for:

Pace: Shouldn’t be too fast or too slow. Send a message to address it when noticed.

Filler words: Listen for “um”,”uh”,”emm”,”you know”. If they keep popping up, send a reminder to pause.

Tone and variety: Watch out for their pitch and suggest accordingly

Clarity: Make sure that their words are clear enough

Also, keep an eye on the body posture. Encourage confident presentation involving use of hands, straight shoulders and steady eye contact.
```

---

## The Presentation Agent

Now that we have all our pieces in place, it’s time to look at the Central Processing Unit of our presentation coach. Inside the <VPIcon icon="fa-brands fa-python"/>`main.py` file is where the magic of Vision Agents happens, tying live video streaming, OpenAI Realtime functions, YOLO pose detection, and your coaching instructions into one multimodal agent.

Here’s how our <VPIcon icon="fa-brands fa-python"/>`main.py` looks:

```py title="main.py"
import logging
from dotenv import load_dotenv
from vision_agents.core import Agent, User, cli
from vision_agents.core.agents import AgentLauncher
from vision_agents.plugins import getstream, openai, ultralytics

load_dotenv()

async def create_agent(**kwargs) -> Agent:
    agent_user = User(
        name="Public Speaking & Presentation Coach",
        id="coach_agent",
        image="https://api.dicebear.com/7.x/bottts/svg?seed=coach"
    )

    return Agent(
        edge=getstream.Edge(),
        agent_user=agent_user,
        instructions="@instructions/coach.md",
        llm=openai.Realtime(
            fps=6, voice="alloy",
        ),
        processors=[
            ultralytics.YOLOPoseProcessor(model_path="yolo11n-pose.pt")
        ],
    )

async def join_call(agent: Agent, call_type: str, call_id: str, **kwargs) -> None:
    print(f"Presentation Coach Agent starting...")
    print(f"Joining call: {call_type}:{call_id}")

    call = await agent.create_call(call_type, call_id)
    session = await agent.join(call)
    print("Agent connected and ready!")
    print("Real-time coaching enabled")

    try:
        await agent.llm.simple_response(
            text="Greet the user warmly and say you're ready to help them practice. "
                 "Watch their body language and speech — give encouraging, real-time feedback."
        )
        await agent.finish()

    finally:
        await session.close()

if name == "__main__":
    cli(AgentLauncher(create_agent=create_agent, join_call=join_call))
```

::: info Let’s walk through what’s happening in this code

- Your keys are loaded from the .env file by the `load_dotenv` function.
- The `create_agent` function then creates the coach’s identity using the User object, assigning it a name, ID, and avatar.
- The instantiated Agent object takes several arguments, which configure how the agent behaves and interacts with video, models, and the user. Our Agent object has the following arguments: `edge`, `agent_user`, `instructions`, `LLMS`, and `processors`.
- `edge=getstream.Edge()` connects everything to Stream’s global, low-latency video infrastructure.
- `agent_user` defines the coach’s identity created earlier.
- Instructions load your coaching philosophy located in the coach.md directly into the agent’s brain.
- `llm` specifies the AI language model and parameters. For this agent, it is OpenAI.Realtime, which opens a WebSocket to OpenAI’s Realtime API. With a frame rate of 6, the agent receives six video frames per second. The voice parameter set to “alloy” allows for real-time speech generation.
- `processors` perform specific types of AI/ML computation on incoming streams. In this case, video frames were analysed by YOLO11.
- With the `join_call` function, the agent joins the call with a short, welcoming greeting that appears instantly in the chat. The `await agent.finish` function hands control over to the real-time loop of the agent, which continuously listens, watches, thinks, and responds automatically. No need for manual prompts.

:::

To run the agent, enter this on your terminal:

```sh
python main.py
```

---

## Conclusion

We have successfully developed a public speaking and presentation AI agent that provides timely feedback with valuable tips to help you improve your presentation in real-time.

This was made possible by the trio of Vision Agents, YOLO11, and OpenAI Realtime API. In under 50 lines of code, we were able to build an agent that costs nearly nothing (just a few tokens) compared to paying $99 for a SaaS platform or hiring a physical coach. Pretty cool.

With Vision Agents, you have a developer-friendly framework that opens up numerous opportunities for builders to create engaging AI apps efficiently.

Happy building!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Real-Time Public Speaking and Presentation Coach",
  "desc": "Nowadays, being able to present an idea, project, or achievement is a must-have skill. The ability to showcase and talk about your work can determine whether you’re getting that degree, funding, or approval. But while effective communication is impor...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-real-time-public-speaking-and-presentation-coach.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
