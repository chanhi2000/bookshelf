---
lang: en-US
title: "How to Build a Real-time AI Gym Coach with Vision Agents"
description: "Article(s) > How to Build a Real-time AI Gym Coach with Vision Agents"
icon: fa-brands fa-python
category:
  - Python
  - AI
  - LLM
  - Google
  - Google Gemini
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
  - gemini
  - google-gemini
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Real-time AI Gym Coach with Vision Agents"
    - property: og:description
      content: "How to Build a Real-time AI Gym Coach with Vision Agents"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-real-time-ai-gym-coach-with-vision-agents.html
prev: /programming/py/articles/README.md
date: 2025-12-20
isOriginal: false
author:
  - name: Ekemini Samuel
    url : https://freecodecamp.org/news/author/envitab/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1766158143362/b5d2947c-cc24-4948-a7fd-7ef2b3a79d5f.png
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
  name="How to Build a Real-time AI Gym Coach with Vision Agents"
  desc="Computer vision is transforming how people train, from at-home workouts to smart gym mirrors. Imagine walking into your home gym, turning on your camera, and having an AI coach that sees your movements, counts your reps, and corrects your form in rea..."
  url="https://freecodecamp.org/news/how-to-build-a-real-time-ai-gym-coach-with-vision-agents"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1766158143362/b5d2947c-cc24-4948-a7fd-7ef2b3a79d5f.png"/>

Computer vision is transforming how people train, from at-home workouts to smart gym mirrors.

Imagine walking into your home gym, turning on your camera, and having an AI coach that sees your movements, counts your reps, and corrects your form in real time.

That's exactly what we're building in this tutorial: a real-time gym companion and fitness coach.

We'll integrate [<VPIcon icon="fas fa-globe"/>Vision Agents](https://visionagents.ai/)' low-latency video inference to detect movement patterns, count reps, and give instant voice feedback like "Straighten your back!" or "Keep your form tight!", just like a human trainer would.

Here is a [<VPIcon icon="fa-brands fa-youtube"/>demo video](https://youtu.be/etqq68p-RGE) of the AI gym companion during a workout session:

<VidStack src="youtube/etqq68p-RGE" />

::: nnote Prerequisites

- Python 3.13 or higher
- API keys for:
  - [<VPIcon icon="iconfont icon-gemini"/>Gemini](https://ai.google.dev/) (for real-time LLM with vision)
  - [<VPIcon icon="fas fa-globe"/>Stream](https://getstream.io/video/) (for video/audio infrastructure)
  - Alternatively: [<VPIcon icon="iconfont icon-openai"/>OpenAI](https://openai.com) (if using [<VPIcon icon="iconfont icon-openai"/>OpenAI Realtime](https://platform.openai.com/docs/guides/realtime) instead)
- Code editor like VS Code or Windsurf

---

## Setting Up the Project

Create a new directory on your computer called `gym_buddy`. You can also do it directly in your terminal with this command:

```sh
mkdir gym_buddy
```

Then open the directory in your IDE (for this guide, I’m using [<VPIcon icon="fas fa-globe"/>Windsurf IDE](https://windsurf.com/)).

If you don’t have uv (a fast Python package installer and resolver) installed on your computer, install it with this command:

```sh
pip install uv
```

Note: After installing uv, you can also run `uv -init` to set up the project with sample files and a `.toml` file with the metadata.

Next, we’ll create the <VPIcon icon="iconfont icon-toml"/>`pyproject.toml` file. This is a configuration file for Python projects that specifies build system requirements and other project metadata. It's a standard file used by modern Python packaging tools.

Enter the code below:

```toml title="pyproject.toml"
[project]
name = "gym-buddy"
version = "0.1.0"
requires-python = ">=3.13"
dependencies = [
    "python-dotenv>=1.0",
    "vision-agents",
    "vision-agents-plugins-openai",
    "vision-agents-plugins-getstream",
    "vision-agents-plugins-ultralytics",
    "vision-agents-plugins-gemini",
]

[tool.uv.sources]
"vision-agents" = {path = "../../agents-core", editable=true}
"vision-agents-plugins-deepgram" = {path = "../../plugins/deepgram", editable=true}
"vision-agents-plugins-ultralytics" = {path = "../../plugins/ultralytics", editable=true}
"vision-agents-plugins-openai" = {path = "../../plugins/openai", editable=true}
"vision-agents-plugins-getstream" = {path = "../../plugins/getstream", editable=true}
"vision-agents-plugins-gemini" = {path = "../../plugins/gemini", editable=true}
```

You can also create a <VPIcon icon="fas fa-file-lines"/>`requirements.in` file with just the direct dependencies, like so:

```plaintext title="requirements.in"
python-dotenv>=1.0
vision-agents
vision-agents-plugins-openai
vision-agents-plugins-getstream
vision-agents-plugins-ultralytics
vision-agents-plugins-gemini
```

Then install dependencies using uv and either of these commands:

```sh
uv sync
```

This will generate the `uv.lock` from the uv package manager that handles the project’s dependencies and builds.

If you are using a Windows OS, you might come across a dependency installation error, particularly with NumPy. This is likely due to missing build tools on your system.

To resolve it, install [<VPIcon icon="iconfont icon-vscode"/>Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) (required for building Python packages with C extensions). During installation, make sure that you select "Desktop development with C++". This installs all the necessary build tools.

Visual Studio displays like this after the installation is done. You may need to restart your computer for the updates to take effect.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1765863109016/81d76ab4-9cd8-48f6-8cd9-83654ab27071.png)

Now run this command in your terminal:

```sh
python -m pip install -e .
```

The command above installs all the necessary dependencies for the project.

### How to Get Your API Keys

For this project, we need to get API keys from Stream and Gemini/OpenAI.

To get your Stream API key, go ahead and [<VPIcon icon="fas fa-globe"/>sign up](https://getstream.io/) with your preferred method.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1765863152347/b46c8cc0-0f2f-448f-b7c5-f723fee94fb5.png)

Then, navigate to your [<VPIcon icon="fas fa-globe"/>dashboard](https://dashboard.getstream.io/organization/1270689/apps) and click 'Create App' to create a new app for the AI gym companion.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1765863177461/8c8c51d5-46fe-44fe-8a2c-2336d3492da4.png)

Enter the name for the app, choose the environment (Development/Production), select a region, and click on **‘Create App’**.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1765863207947/529df7e3-bbdd-4d84-8023-3cb80241040b.png)

After creating the app, click on the dashboard overview tab in the left sidebar, then navigate to the Video tab and click on "**API Keys"**. Copy your API key and secret, and save them securely.

To get your [<VPIcon icon="iconfont icon-gemini"/>Gemini](https://gemini.google.com/) API key, visit the [<VPIcon icon="iconfont icon-gemini"/>Google AI Studio website](https://aistudio.google.com/welcome), then click on Get started.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1765864009410/9d588512-c2ea-42bc-8e72-d2c213587cf0.png)

Then, go to your dashboard and click on '**Create API key'.**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1765863451321/99f73092-5e05-47c4-a3de-6350dfec50f0.png)

Enter a name for the key, then create a new project for the API key.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1765863470658/40c7e61c-6be3-40a6-8e61-236e334241d9.png)

After you have created the new API key, copy it and save it securely.

Now that you have the API keys you’ll need for the AI gym companion, create a <VPIcon icon="fas fa-file-lines"/>`.env` file in the project’s root directory and add all the API keys like so:

```sh title=".env"
GEMINI_API_KEY=your_gemini_key
STREAM_API_KEY=your_stream_key
STREAM_API_SECRET=your_stream_secret
```

If you’re using [OpenAI](https://openai.com/) instead of Gemini, also add:

```sh
OPENAI_API_KEY=your_openai_key
```

In the root directory, create an empty <VPIcon icon="fa-brands fa-python"/>`_init.py` file. This file makes Python treat the directory as a package. You can add a comment in the file to remember, like so:

```py
# This file makes Python treat the directory as a package.
```

Next, create a <VPIcon icon="fa-brands fa-python"/>`gym_buddy.py` file. This is the main app file, containing agent setup and call joining logic for the Gym Companion. Enter the code below in the file:

```py title="gym_buddy.py"
import logging
from dotenv import load_dotenv
from vision_agents.core import User, Agent, cli
from vision_agents.core.agents import AgentLauncher
from vision_agents.plugins import getstream, ultralytics, gemini
logger = logging.getLogger(__name__)
load_dotenv()
async def create_agent(**kwargs) -> Agent:
    agent = Agent(
        edge=getstream.Edge(),  # use stream for edge video transport
        agent_user=User(name="AI gym companion"),
        instructions="Read @gym_buddy.md",  # read the gym buddy markdown instructions
        llm=gemini.Realtime(fps=3),  # Share video with gemini
        # llm=openai.Realtime(fps=3), use this to switch to openai
        processors=[
            ultralytics.YOLOPoseProcessor(model_path="yolo11n-pose.pt")
        ],  # realtime pose detection with yolo
    )
    return agent
async def join_call(agent: Agent, call_type: str, call_id: str, **kwargs) -> None:
    call = await agent.create_call(call_type, call_id)
    # join the call and open a demo env
    with await agent.join(call):
        await agent.llm.simple_response(
            text="Say hi. After the user does their exercise, offer helpful feedback."
        )
        await agent.finish()  # run till the call ends
if __name__ == "__main__":
    cli(AgentLauncher(create_agent=create_agent, join_call=join_call))
```

Then create a <VPIcon icon="fa-brands fa-markdown"/>`gym_buddy.md` file. This is an instructions file for the gym agent's coaching guide, which it will follow when analysing the workouts and providing real-time feedback. Enter the markdown code below:

```md :collapsed-lines titl="gym_buddy.md"
You are a voice fitness coach. You will watch the user's workout and offer feedback.
The video clarifies the body position using Yolo's pose analysis, so you'll see their exact movement.
Speak with a high-energy, motivating tone. Be strict about form but encouraging. Do not give feedback if you are not sure or do not see an exercise.
# Gym Workout Coaching Guide
---

## 1. Introduction
A fitness coach's primary responsibility is to ensure safety and efficacy in every movement. While everybody is different, the fundamental mechanics of human movement—stability, alignment, and range of motion—remain constant. By monitoring key checkpoints like spinal alignment, joint tracking, and tempo, coaches can guide athletes toward stronger, injury-free workouts. The following guidelines break down the core compound movements into phases, with clear teaching points and coaching cues.
---

## 2. The Squat: Setup and Stance
The squat is the king of lower-body exercises, but it starts before the descent. The athlete should stand with feet shoulder-width apart or slightly wider, toes pointed slightly outward (5-30 degrees). The spine must be neutral, chest proud, and core braced. Coaches should watch for collapsing arches in the feet or a rounded upper back. A solid setup creates the tension needed for a powerful lift.
---

## 3. The Squat: Descent (Eccentric Phase)
The movement begins by breaking at the hips and knees simultaneously. The hips should travel back and down, as if sitting in a chair, while the knees track in line with the toes. Coaches must ensure the heels stay glued to the floor. Common errors include "knee valgus" (knees caving in) or the torso collapsing forward. The descent should be controlled and deliberate.
---

## 4. The Squat: Depth and Reversal
"Depth" is achieved when the hip crease drops below the top of the knee (parallel). While not everyone has the mobility for this, it is the standard for a full range of motion. At the bottom, the athlete should maintain tension—no bouncing or relaxing. The reversal (concentric phase) is driven by driving the feet into the floor and extending the hips and knees, exhaling forcefully.
---

## 5. The Push-up: The Plank Foundation
A perfect push-up is essentially a moving plank. The setup requires hands placed slightly wider than shoulder-width, directly under the shoulders. The body must form a straight line from head to heels. Coaches should watch for sagging hips (lumbar extension) or piking hips (flexion). Glutes and quads should be squeezed tight to lock the body into a rigid lever.
---

## 6. The Push-up: Mechanics
As the athlete lowers themselves, the elbows should track back at roughly a 45-degree angle to the torso, forming an arrow shape, not a "T". The chest should descend until it nearly touches the floor. The neck must remain neutral—no reaching with the chin. The push back up should be explosive, fully extending the arms without locking the elbows violently.
---

## 7. The Lunge: Step and Stability
The lunge challenges balance and unilateral strength. Whether forward or reverse, the step should be long enough to allow both knees to bend to approximately 90 degrees at the bottom. The feet should remain hip-width apart throughout the movement, like moving on train tracks, not a tightrope. Coaches should look for wobbling or the front heel lifting off the ground.
---

## 8. The Lunge: Alignment
In the bottom position, the front knee should be directly over the ankle, not shooting far past the toes (though some forward travel is acceptable). The torso should remain upright or have a very slight forward lean; collapsing over the front thigh is a fault. The back knee should hover just an inch off the ground. Drive through the front heel to return to the start.
---

## 9. Tempo and Control
Time under tension builds muscle and control. Coaches should encourage a specific tempo, such as 2-0-1 (2 seconds down, 0 pause, 1 second up). Rushing through reps often masks muscle imbalances and relies on momentum rather than strength. If an athlete speeds up, cue them to "slow down and own the movement."
---

## 10. Breathing Mechanics
Proper breathing stabilises the core. The general rule is to inhale during the eccentric phase (lowering) and exhale during the concentric phase (lifting/pushing). For heavy lifts, the Valsalva manoeuvre (bracing the core with a held breath) may be appropriate, but for general fitness, rhythmic breathing ensures oxygen delivery and blood pressure management.
---

## 11. Common Faults and Fixes
- **Squat - Butt Wink**: Posterior pelvic tilt at the bottom. Fix: Limit depth or improve hamstring/ankle mobility.
- **Push-up - Winging Scapula**: Shoulder blades popping up. Fix: Push the floor away at the top (protraction) and engage serratus anterior.
- **Lunge - Valgus Knee**: Front knee collapsing in. Fix: Cue "push the knee out" and engage the glute medius.
- **General - Ego Lifting**: Sacrificing form for reps or weight. Fix: Regress the exercise or slow the tempo
```

Now we have the instruction file for the AI agent set up. Let’s look at how the code works with the AI agent-creation and markdown instruction file above. In <VPIcon icon="fa-brands fa-python"/>`gym_buddy.py`, the agent is created and initialised with specific components like so:

```py title="gym_buddy.py"
def create_agent() -> Agent:
    # Initialize video transport
    video_transport = StreamVideoTransport()

    # Set up AI components
    gemini = GeminiRealtime()
    pose_processor = YOLOPoseProcessor(model_path="yolo11n-pose.pt")

    # Create agent with instructions
    return Agent(
        name="AI Gym Buddy",
        instructions="gym_buddy.md",  # Loads coaching instructions
        video_transport=video_transport,
        llm=gemini,
        processors=[pose_processor]
    )
```

The <VPIcon icon="fa-brands fa-markdown"/>`gym_buddy.md` file contains structured instructions that guide the gym companion agent's behaviour.

```md title="gym_buddy.md"
---

## Coaching Style
- Be encouraging and positive
- Provide clear, actionable feedback
- Focus on one correction at a time

---

## Squat Form
- Keep chest up and back straight
- Knees should track over toes
- Lower until thighs are parallel to ground
- Push through heels to stand

---

## Safety Guidelines
- Stop user if a dangerous form is detected
- Suggest modifications for beginners
- Remind to keep core engaged
```

These instructions are loaded with the `instructions="gym_buddy.md"` parameter in the <VPIcon icon="fa-brands fa-python"/>`gym_buddy.py` file. The agent then parses this file to understand how to analyse your form during the workout session and provides feedback.

```py title="gym_buddy.py"
# Processing video frames
async def process_frame(self, frame):
    # Analyze pose using YOLO
    poses = await self.pose_processor.process(frame)

    # Generate feedback based on instructions
    feedback = await self.llm.generate_feedback(
        poses=poses,
        instructions=self.instructions
    )
    return feedback
```

When giving feedback, the agent compares the detected poses with the ideal form from the markdown. Then, it generates natural language feedback using the specified tone and style. The safety guidelines in the <VPIcon icon="fa-brands fa-markdown"/>`gym_buddy.md` are checked first, then specific form corrections are mentioned by the agent.

To add a new exercise, you can update the <VPIcon icon="fa-brands fa-markdown"/>`gym_buddy.md` file with a new section like so:

```md title="gym_buddy.md"
---

## Push-up Form
- Keep body in a straight line
- Lower until chest nearly touches floor
- Push through palms to return up
- Keep core engaged
```

The agent will automatically incorporate these instructions the next time it runs. This makes it easy to update and expand the agent's capabilities by simply editing the markdown file.

This is the project and codebase structure for the gym companion app we are building:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1765863516888/836e0bb0-2620-4182-b2de-74b15f6aaf48.png)

You can view the complete code for the AI Gym Companion in the [GitHub repository (<VPIcon icon="iconfont icon-github"/>`Tabintel/gym_buddy`)](https://github.com/Tabintel/gym_buddy).

---

## How to Run the App

First, create a virtual environment in Python with this command:

```sh
python -m venv venv
```

It creates the <VPIcon icon="fas fa-folder-open"/>`.venv` directory.

Then activate the virtual Python environment like so:

```sh
.\venv\Scripts\activate
```

Now run the AI agent with this command:

```sh
uv run gym_buddy.py
```

You can also start the app with this command:

```sh
python gym_buddy.py
```

It begins loading like so:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1765863544434/7fa5fa8e-4286-40d1-9f34-86e7e7e6182b.png)

The AI agent will:

1. Create a video call
2. Open a demo UI in your browser
3. Join the call and start watching
4. Ask you to do a squat exercise
5. Analyse your moves and positions, and then provide feedback

From the command terminal output above, it also shows that Gemini AI is connected.

The agent then loads in your browser like so:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1765863577856/e32b1b35-7356-4c23-8b8b-a8513dd9aabb.png)

It also displays a pop-up modal that introduces the Vision Agents. You can skip the intro or click on **Next** to proceed.

The Vision Agent uses a global edge to ensure optimal call latency. This is useful for the AI gym companion to provide real-time feedback on the exercises the users perform.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1765863612816/4bd395ca-ed40-46d7-ab3b-0ceed23f1d0c.png)

The AI gym companion can also provide chat messages on the exercises through the chatbox displayed on the right side of the UI. This is provided through the chat SDK/API.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1765863702571/7586bddc-a830-4bf4-8af3-146dccf0f337.png)

When you perform a squat, the Vision Agent (powered by Gemini) analyses the video frames in real-time. It detects the completion of the movement and triggers the `send_rep_count` tool. This instantly updates the exercise counter on your screen and provides an encouraging text and voice response!

Here is a [<VPIcon icon="fa-brands fa-youtube"/>demo video](https://youtu.be/etqq68p-RGE) of the AI gym companion during a workout session:

<VidStack src="youtube/etqq68p-RGE" />

You can also copy the link and share it, or scan the QR code below to test the Gym Companion on your mobile phone.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1765863762688/a6c7b56e-9b0b-4819-ae9f-61a32ce71280.png)

If you want to test it on your phone, install the [<VPIcon icon="fa-brands fa-apple"/>Stream Video calls app](https://apps.apple.com/us/app/stream-video-calls/id1644313060) for iOS devices for a better mobile experience.

---

## Next Steps

In this tutorial, you’ve learned how to build an AI gym companion using Vision Agents.

The Real-Time Gym Companion illustrates how vision AI unlocks human-like interactivity by merging:

- Video perception (seeing)
- LLM understanding (thinking)
- Speech feedback (speaking)

This low-latency technology lets you create real-time fitness apps that give instant feedback, much like a personal trainer would.

You can check out more project use cases with Vision Agents in the [GitHub repository (<VPIcon icon="iconfont icon-github"/>`GetStream/Vision-Agents`)](https://github.com/GetStream/Vision-Agents/tree/main/examples).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Real-time AI Gym Coach with Vision Agents",
  "desc": "Computer vision is transforming how people train, from at-home workouts to smart gym mirrors. Imagine walking into your home gym, turning on your camera, and having an AI coach that sees your movements, counts your reps, and corrects your form in rea...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-real-time-ai-gym-coach-with-vision-agents.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
