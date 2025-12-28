---
lang: en-US
title: "Developing Multi-Modal Bots with Django, GPT-4, Whisper, and DALL-E"
description: "Article(s) > Developing Multi-Modal Bots with Django, GPT-4, Whisper, and DALL-E"
icon: iconfont icon-django
category: 
  - Python
  - Django
  - OpenAI
  - ChatGPT
  - Article(s)
tag:
  - blog
  - digitalocean.com
  - python
  - py
  - django
  - py-django
  - openai
  - chatgpt
  - dall-e
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Developing Multi-Modal Bots with Django, GPT-4, Whisper, and DALL-E"
    - property: og:description
      content: "Developing Multi-Modal Bots with Django, GPT-4, Whisper, and DALL-E"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/developing-multi-modal-bots-with-django-gpt-4-whisper-and-dall-e.html
prev: /programming/py-django/articles/README.md
date: 2024-04-26
isOriginal: false
authors: 
  - name: Evans Ehiorobo
    url: https://www.digitalocean.com/community/users/ehioroboevans
  - name: Anish Singh Walia
    url: https://www.digitalocean.com/community/users/asinghwalia
cover: https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Django > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-django/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "OpenAI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/openai/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Developing Multi-Modal Bots with Django, GPT-4, Whisper, and DALL-E"
  desc="Technical tutorials, Q&A, events. This is an inclusive place where developers can find or lend support and discover new ways to contribute to the community."
  url="https://digitalocean.com/community/tutorials/developing-multi-modal-bots-with-django-gpt-4-whisper-and-dall-e"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg"/>

## Introduction

Modern web applications can be taken to the next level by integrating Artificial Intelligence. This tutorial focuses on the cutting-edge development of multi-modal bots, which leverage natural language processing, image generation, and speech recognition. These bots offer a unique user experience, engaging users through various modes of interaction.

This tutorial delves into developing a multi-modal bot using [<VPIcon icon="iconfont icon-openai"/><VPIcon icon="iconfont icon-django"/>Django](https://djangoproject.com/start/) and OpenAI’s [<VPIcon icon="iconfont icon-openai"/>GPT-4 Large Language Model (LLM)](https://openai.com/research/gpt-4) for conversational AI, [<VPIcon icon="iconfont icon-openai"/>Whisper](https://openai.com/research/whisper) for accurate speech transcription, and [<VPIcon icon="iconfont icon-openai"/>DALL-E](https://openai.com/research/dall-e) for image generation. It describes building a web application that generates stories with images accompanying them. Users can specify the theme of the story by voice or text, and the application would respond with a generated story embellished with visual imagery.

By the end of this tutorial, you will have developed a practical application that can understand and respond to user inputs in various forms, including text, voice, and images. This will significantly enhance the user’s interaction with the application, making it more intuitive and accessible.

::: note Prerequisites

To complete this tutorial, you will need:

1. A basic understanding of Python and Django. If you’re new to Django, following the [How To Install Django and Set Up a Development Environment](/community/tutorials/how-to-install-django-and-set-up-a-development-environment-on-ubuntu-22-04) tutorial is recommended.
2. An OpenAI API key: This tutorial requires you to interact with OpenAI’s GPT-4 and DALL-E models, which require an API key from OpenAI. You can obtain an API key by [creating an OpenAI account](https://platform.openai.com/signup) and then [creating a secret key](https://platform.openai.com/api-keys).
3. Whisper: Visit the [OpenAI Whisper GitHub page (<VPIcon icon="iconfont icon-github" />`openai/whisper`)](https://github.com/openai/whisper) for detailed installation guides and verify that your development setup is properly configured for Whisper.
4. The OpenAI Python package: If you followed the tutorial in the first prerequisite, you should already have a virtual environment named `env` active within a directory named `django-apps`.

:::

::: note

Ensure your virtual environment is active by confirming that its name appears in parentheses at the start of your terminal prompt. If it’s not active, you can manually activate it by running the following command in your terminal from the directory containing your Django app.

```sh
.env/bin/activate
```

:::

Once your environment is active, run the following to install the OpenAI Python package:

```sh
pip install openai
```

If this is your first time using the OpenAI library, you should review the [How to Integrate OpenAI GPT Models in Your Django Project](/community/tutorials/how-to-integrate-openai-gpt-models-in-your-django-project) tutorial.

---

## Step 1. Integrating OpenAI Whisper for Speech Recognition

In this step, you’ll set up OpenAI Whisper in your Django application to allow it to transcribe speech to text. Whisper is a robust speech recognition model that can provide accurate transcriptions, a crucial feature for our multi-modal bot. By integrating Whisper, our application will be able to understand user inputs provided through voice.

First, ensure that you are working in your Django project directory. Following the prerequisite tutorials, you should have a Django project ready for this integration. Open your terminal, navigate to your Django project directory, and ensure your virtual environment is activated:

```sh
cd path_to_your_django_project
source env/bin/activate
```

### Setting Up Whisper in Your Django Application

What needs to be done now is to create a function that utilizes Whisper to transcribe audio files to text. Create a new Python file named <VPIcon icon="fa-brands fa-python"/>`whisper_transcribe.py`.

```sh
touch whisper_transcribe.py
```

Open <VPIcon icon="fa-brands fa-python"/>`whisper_transcribe.py` in your text editor and import Whisper. Next, let’s define a function that takes the path of an audio file as input, uses Whisper to process the file, and then returns the transcription:

```py title="whisper_transcribe.py"
import whisper
model = whisper.load_model("base")


def transcribe_audio(audio_path):
    result = model.transcribe(audio_path)
    return result["text"]
```

In this code snippet, you’re using the “base” model for transcription. Whisper offers [different models (<VPIcon icon="iconfont icon-github" />`openai/whisper`)](https://github.com/openai/whisper?tab=readme-ov-file#available-models-and-languages) tailored to various accuracy and performance needs. Feel free to experiment with other models based on your requirements.

### Testing the Transcription

To test the transcription, save an audio file within your Django project directory. Ensure the file is in a format Whisper supports (e.g., MP3, WAV). Now, modify <VPIcon icon="fa-brands fa-python"/>`whisper_transcribe.py` by adding the following lines at the bottom:

```py title="whisper_transcribe.py"
# For testing purposes
if __name__ == "__main__":
    print(transcribe_audio("path_to_your_audio_file"))
```

Run <VPIcon icon="fa-brands fa-python"/>`whisper_transcribe.py` with Python to see the transcription of your audio file in your terminal:

```sh
python whisper_transcribe.py
```

You should see the transcribed text output in the terminal if everything is set up correctly. This functionality will serve as the foundation for voice-based interactions within our bot.

---

## Step 2. Generating Text Responses with GPT-4

In this step, you’ll utilize the GPT-4 LLM to generate text responses based on the user input or the speech transcription obtained in the previous step. GPT-4, with its large language model, can generate coherent, contextually relevant responses, making it an ideal choice for our multi-modal bot application.

Before proceeding, ensure the OpenAI Python package is installed in your virtual environment as described in the prerequisites. The GPT-4 model requires an API key to access, so ensure you have it ready. You can add the OpenAI API key to your environmental variables so that you don’t add it directly to the Python file:

```sh
export OPENAI_KEY="your-api-key"
```

### Setting Up Chat Completion

Navigate to your Django app’s directory and create a new Python file named <VPIcon icon="fa-brands fa-python"/>`chat_completion.py`. This script will handle communication with the GPT-4 model to generate responses based on the input text.

```py title="chat_completion.py"
import os
from openai import OpenAI
client = OpenAI(api_key=os.environ["OPENAI_KEY"])

def generate_story(input_text):
    # Call the OpenAI API to generate the story
    response = get_story(input_text)
    # Format and return the response
    return format_response(response)
```

This code snippet first sets the API key necessary to authenticate with OpenAI’s services. It then calls a separate function, `get_story` to make the API call to OpenAI for the story and then another function, `format_response`, to format the response from the API.

Now, let’s focus on the `get_story` function. Add the following to the bottom of your <VPIcon icon="fa-brands fa-python"/>`chat_completion.py` file:

```py title="chat_completion.py"
def get_story(input_text):
    # Construct the system prompt. Feel free to experiment with different prompts.
    system_prompt = f"""You are a story generator.
    You will be provided with a description of the story the user wants.
    Write a story using the description provided."""
    # Make the API call
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": input_text},
        ],
        temperature=0.8
    )

    # Return the API response
    return response
```

In this function, you first set up the system prompt, which informs the model about the task it needs to perform, and then request the `ChatCompletion` API to generate a story using the user’s input text.

Finally, you can implement the `format_response` function. Add the following to the bottom of your <VPIcon icon="fa-brands fa-python"/>`chat_completion.py` file:

```py title="chat_completion.py"
def format_response(response):
    # Extract the generated story from the response
    story = response.choices[0].message.content
    # Remove any unwanted text or formatting
    story = story.strip()
    # Return the formatted story
    return story
```

### Testing Generated Responses

To test the text generation, modify <VPIcon icon="fa-brands fa-python"/>`chat_completion.py` by adding a few lines at the bottom:

```py title="chat_completion.py"
# For testing purposes
if __name__ == "__main__":
    user_input = "Tell me a story about a dragon"
    print(generate_story(user_input))
```

Run <VPIcon icon="fa-brands fa-python"/>`chat_completion.py` with Python to see the generated response in your terminal:

```sh
python chat_completion.py
```

Based on the prompt, you should observe a creatively generated response from GPT-4. Experiment with different inputs to see various responses.

In the next step, you will add images to the generated stories.

---

## Step 3. Generating Images with DALL-E

DALL-E is designed to create detailed images from textual prompts, enabling your multi-modal bot to enhance stories with visual creativity.

Create a new Python file named <VPIcon icon="fa-brands fa-python"/>`image_generation.py` in your Django app. This script will use the DALL-E model for image generation:

```sh
touch image_generation.py
```

Let’s create a function within <VPIcon icon="fa-brands fa-python"/>`image_generation.py` that sends a prompt to DALL-E and retrieves the generated image:

```py title="image_generation.py"
import os
from openai import OpenAI
client = OpenAI(api_key=os.environ["OPENAI_KEY"])

def generate_image(text_prompt):
    response = client.images.generate(
        model="dall-e-3",
        prompt=text_prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )
    image_url = response.data[0].url
    return image_url
```

This function sends a request to the DALL-E model specifying the text prompt, the number of images to generate (`n=1`), and the size of the images. It then extracts and returns the URL of the generated image.

### Testing The Script

To illustrate the use of this function within your Django project, you can add the following example at the bottom of your <VPIcon icon="fa-brands fa-python"/>`image_generation.py` file:

```py title="image_generation.py"
# For testing purposes
if __name__ == "__main__":
    prompt = "Generate an image of a pet and a child playing in a yard."
    print(generate_image(prompt))
```

Run <VPIcon icon="fa-brands fa-python"/>`image_generation.py` with Python to generate an image based on the given prompt:

```sh
python image_generation.py
```

If the script runs successfully, you will see the URL of the generated image in the terminal. You can then view the image by navigating to this URL in your web browser.

In the next step, you will bring speech recognition together with text and image generation for a unified user experience.

---

## Step 4. Combining Modalities for a Unified Experience

In this step, you will integrate the functionalities developed in the previous steps to provide a seamless user experience.

Your web application will be capable of processing text and voice input from users, generating stories, and complementing them with related images.

### Creating the Unified View

First, ensure that your Django project is organized and that you have <VPIcon icon="fa-brands fa-python"/>`whisper_transcribe.py,` <VPIcon icon="fa-brands fa-python"/>`chat_completion.py,` and <VPIcon icon="fa-brands fa-python"/>`image_generation.py` in the Django app directory. You will now create a view that combines these components.

Open your <VPIcon icon="fa-brands fa-python"/>`views.py` file and import the necessary modules and functions. Then create a new view called `get_story_from_description`:

```py :collapsed-lines title="views.py"
import uuid
from django.core.files.storage import FileSystemStorage
from django.shortcuts import render
from .whisper_transcribe import transcribe_audio
from .chat_completion import generate_story
from .image_generation import generate_image

# other views

def get_story_from_description(request):
    context = {}
    user_input = ""
    if request.method == "GET":
        return render(request, "story_template.html")
    else:
        if "text_input" in request.POST:
            user_input += request.POST.get("text_input") + "\n"
        if "voice_input" in request.FILES:
            audio_file = request.FILES["voice_input"]
            file_name = str(uuid.uuid4()) + (audio_file.name or "")
            FileSystemStorage(location="/tmp").save(file_name, audio_file)
            user_input += transcribe_audio(f"/tmp/{file_name}")

        generated_story = generate_story(user_input)
        image_prompt = (
            f"Generate an image that visually illustrates the essence of the following story: {generated_story}"
        )
        image_url = generate_image(image_prompt)

        context = {
            "user_input": user_input,
            "generated_story": generated_story.replace("\n", "<br/>"),
            "image_url": image_url,
        }

        return render(request, "story_template.html", context)
```

This view retrieves the text and/or voice input from the user. If there is an audio file, it saves it with a unique name (using the `uuid` library) and uses the `transcribe_audio` function to convert speech to text. It then uses the `generate_story` function to generate a text response and the `generate_image` function to generate a related image. These outputs are passed to the context dictionary, then rendered with <VPIcon icon="fa-brands fa-html5"/>`story_template.html`.

### Creating the Template

Next, create a file called <VPIcon icon="fa-brands fa-html5"/>`story_template.html` and add the following:

```html title="story_template.html"
<div style="padding:3em; font-size:14pt;">
    <form method="post" enctype="multipart/form-data">
        {% csrf_token %}
        <textarea name="text_input" placeholder=" Describe the story you would like" style="width:30em;"></textarea>
        <br/><br/>
        <input type="file" name="voice_input" accept="audio/*" style="width:30em;">
        <br/><br/>
        <input type="submit" value="Submit" style="width:8em; height:3em;">
    </form>

    <p>
        <strong>{{ user_input }}</strong>
    </p>
    {% if image_url %}
        <p>
            <img src="{{ image_url }}" alt="Generated Image" style="max-width:80vw; width:30em; height:30em;">
        </p>
    {% endif %}
    {% if generated_story %}
        <p>{{ generated_story | safe }}</p>
    {% endif %}
</div>
```

This simple form allows users to submit their prompts through text or by uploading an audio file. It then displays the text and image generated by the application.

### Creating a URL for the View

Now that you have the `get_story_from_description` view ready, you must make it accessible by creating a URL configuration.

Open your <VPIcon icon="fa-brands fa-python"/>`urls.py` file within your Django app and add a pattern for the `get_story_from_description` view:

```py title="urls.py"
from django.urls import path
from . import views

urlpatterns = [
    # other patterns
    path('generate-story/', views.get_story_from_description, name='get_story_from_description'),
]
```

### Testing the Unified Experience

You can now visit `http://your_domain/generate-story/` in your web browser. You should see the form defined in <VPIcon icon="fa-brands fa-html5"/>`story_template.html`. Try submitting a text prompt through the text input field, or uploading an audio file using the file input. Upon submission, your application will process the input(s), generate a story and an accompanying image, and display them on the page.

For example, here is a sample story for the prompt: “Tell me a story about a pet and a child playing in a yard.”

![Screenshot of a generated story](https://doimages.nyc3.cdn.digitaloceanspaces.com/006Community/W4DO_2024/Developing_MultiModal_Bots/Generated-Story-From-Dall-E-and-GPT-4.png)

By completing this step, you have created an application that seamlessly processes and responds to user inputs in various forms—text, voice, and images.

---

## Conclusion

In this tutorial, you have successfully developed a multi-modal bot utilizing Django, with integration capabilities for Whisper for speech recognition, GPT-4 for text generation, and DALL-E for image generation. Your application can now comprehend and react to user inputs in various formats.

For further development, it is recommended to explore alternative versions of the Whisper, GPT, and DALL-E models, improve the UI/UX design of your application, or extend the bot’s functionality to include additional interactive features.

::: info

The author selected [<VPIcon icon="fas fa-globe"/>Direct Relief Program](https://directrelief.org/emergency/coronavirus-outbreak/) to receive a donation as part of the [<VPIcon icon="fas fa-globe"/>Write for DOnations](https://do.co/w4do-cta) program.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Developing Multi-Modal Bots with Django, GPT-4, Whisper, and DALL-E",
  "desc": "Technical tutorials, Q&A, events. This is an inclusive place where developers can find or lend support and discover new ways to contribute to the community.",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/developing-multi-modal-bots-with-django-gpt-4-whisper-and-dall-e.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
