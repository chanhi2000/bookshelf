---
lang: en-US
title: "How to Use Nano Banana for Image Generation - Explained with Code Examples"
description: "Article(s) > How to Use Nano Banana for Image Generation - Explained with Code Examples"
icon: fa-brands fa-python
category:
  - Python
  - AI
  - LLM
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
  - google
  - google-gemini
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Nano Banana for Image Generation - Explained with Code Examples"
    - property: og:description
      content: "How to Use Nano Banana for Image Generation - Explained with Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/nano-banana-for-image-generation.html
prev: /programming/py/articles/README.md
date: 2025-09-19
isOriginal: false
author:
  - name: Tarun Singh
    url : https://freecodecamp.org/news/author/tarunsinghofficial/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758287738949/b33b68f4-0e84-46df-a85f-9ff6aacfd72c.png
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

[[toc]]

---

<SiteInfo
  name="How to Use Nano Banana for Image Generation - Explained with Code Examples"
  desc="AI is changing the image generation and editing process into a smooth workflow. Now, with just a single prompt, you can tell your computer to generate or edit an existing image. Google just launched its new model for image generation or editing, ”Nan..."
  url="https://freecodecamp.org/news/nano-banana-for-image-generation"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1758287738949/b33b68f4-0e84-46df-a85f-9ff6aacfd72c.png"/>

AI is changing the image generation and editing process into a smooth workflow. Now, with just a single prompt, you can tell your computer to generate or edit an existing image. Google just launched its new model for image generation or editing, [<VPIcon icon="iconfont icon-gemini"/>"Nano Banana" – Gemini 2.5 Flash](https://gemini.google/overview/image-generation/). It's a powerful, nimble tool that's changing how we think about image generation and manipulation, and it's something you'll definitely want in your developer toolkit.

In this article, you will learn how to use “Nano Banana” for Image Generation using Gemini’s 2.5 Flash Image. So, let’s get started!

---

## What is "Nano Banana"?

Nano Banana is the latest image-editing cum generation tool from Google DeepMind. Forget the formal jargon for a second. Imagine you have an incredibly talented, lightning-fast artist at your beck and call. You can describe *anything* to them – "an astronaut riding a horse on the Moon" – and *poof*, it appears. Or, you hand them a picture of your dog and say, "Make the dog wear a cap on his head," and they do it instantly, keeping your cat looking like *your* dog.

That's essentially Nano Banana. It's an advanced AI model from the Gemini family, specifically engineered for rapid, intelligent image generation and nuanced editing. It understands your natural language commands, enabling you to bring complex visual ideas to life or make surgical changes to existing images with surprising ease.

### Why "Nano Banana"?

Because it's small (flash!), packed with goodness, and leaves you feeling like you just peeled back a new layer of creative possibility. It's fast, efficient, and incredibly versatile.

::: info The Superpowers You Get

- **Prompt-Perfect Editing:** Want to change a background, alter a pose, or add a specific object? Just ask. Nano Banana understands and executes.
- **Character Consistency:** This is a big one. If you're creating a story or a series of images, maintaining the look of a specific character or object is crucial. Nano Banana excels at this, ensuring your protagonist looks the same whether they're in a forest or on the moon.
- **Visual Mashups (Multi-Image Fusion):** Got a few different visual elements you want to combine seamlessly? It can blend them into a cohesive new image.

and much more!

:::

Interested? Let's get our hands dirty. But wait! To use “Nano Banana, “ you have two ways to do this:

1. [<VPIcon icon="fa-brands fa-google"/>Using Google AI Studio](https://aistudio.google.com/prompts/new_chat?model=gemini-2.5-flash-image-preview): The simplest and easiest way to generate or edit images in Google Studio. This is a web-based tool that gives you direct access to the Gemini models without writing a single line of code. It's the absolute best place to test and start, and is useful for developers and non-developers, also. Also, there's no need to install libraries, manage API keys, or write any code
2. **Building with the Gemini API:** This is beneficial if you want more custom solutions for your application. For any serious application—whether it's a web app, a mobile app, or a backend service—you'll need to integrate directly with the Gemini API. This is where the real power lies, as it allows you to automate tasks and create interactive experiences.

In this tutorial, you will see how we can use this tool in our own applications, using nothing but Python. So, let’s get started.

---

## How to Set Up Your Project

### Step 1: Get an API key from Google Gemini

The very first step for using “Nano Banana” is to get an API key. Head over to [<VPIcon icon="fa-brands fa-google"/>Google AI Studio](https://aistudio.google.com/apikey), click on “Create API key“, and generate a new one by specifying a project from your existing Google Cloud projects.

![API key generated from Google Gemini ](https://cdn.hashnode.com/res/hashnode/image/upload/v1757429573699/1c5d1a52-2e63-476b-a957-604542044fc7.png)

Once you have generated an API key, save it securely somewhere.

### Step 2: Install the SDK and Other Dependencies

Open your terminal and run:

```sh
pip install google-generativeai pillow python-dotenv
```

We’ll use `Pillow` for easy image handling and `python-dotenv` to safely manage our API key.

### Step 3: Set Up Your Environment

It’s crucial to keep your API key out of your code for security. For this, we usually use environment variables. So, create a file named <VPIcon icon="fas fa-file-lines"/>`.env` in your project root and add your API key:

```sh title=".env"
GEMINI_API_KEY="YOUR_API_KEY_HERE"
```

### Step 4: Image Generation & Editing

::: tip Example 1: Text-to-Image Generation

Text-to-Image is like an artist who can draw anything you describe. In this, you simply write the prompt (a sentence or a description), even a very detailed one, and the AI will generate a unique, high-quality image that matches your description. It’s perfect for bringing your most imaginative ideas to life with just a few words.

```py :collapsed-lines
import os
import google.generativeai as genai
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv

# Configuration
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.5-flash-image-preview')

# Prompt, Image, and Response Setup
prompt = "A golden retriever puppy sitting in a field of daisies, bright and cheerful"
output_filename = "text_to_image_result.png"

# saving image helper function from text prompt response
def save_image_from_response(response, filename):
    """Helper function to save the image from the API response."""
    if response.candidates and response.candidates[0].content.parts:
        for part in response.candidates[0].content.parts:
            if part.inline_data:
                image_data = BytesIO(part.inline_data.data)
                img = Image.open(image_data)
                img.save(filename)
                print(f"Image successfully saved as {filename}")
                return filename
    print("No image data found in the response.")
    return None

def main():
    print(f"Generating image for prompt: '{prompt}'...")
    response = model.generate_content(prompt)
    save_image_from_response(response, output_filename)

if __name__ == "__main__":
    main()
```

**Output:**

![A golden retriever puppy sitting happily in a sunny meadow filled with white daisies, surrounded by bright green grass and a cheerful, vibrant atmosphere.](https://cdn.hashnode.com/res/hashnode/image/upload/v1757485705896/50484418-c53c-4d61-8846-2c8875dc2cbd.png)

:::

The code used in the example handles everything needed to communicate with the Gemini API and save the image.

- First, we import the required libraries and load the API key from <VPIcon icon="fas fa-file-lines"/>`.env` using `load_dotenv()`. This makes the key available so we can connect to Google’s service with `genai.configure()`.
- The model we’re using is `gemini-2.5-flash-image-preview`, which is designed for fast image generation.
- We define a `prompt` `(“A golden retriever puppy...”)` and a filename for saving the image.
- The helper function `save_image_from_response(...)` looks at the API’s response, extracts the raw image data, and saves it as a PNG file.
- In `main()`, we call the model with the prompt, then pass the response to the helper function to save the result.
- The `if __name__ == "__main__":` block ensures the script runs only when executed directly, not when imported.

::: tip Example 2: Image-to-Image Editing

Image-to-Image is like a photo editor. Instead of starting from scratch, you can upload an existing picture and describe how to change it. For instance, you can request background removal, addition of new objects, or even a complete artistic style change.

```py :collapsed-lines
import os
import google.generativeai as genai
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv

# Configuration
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.5-flash-image-preview')

# Prompt, Image, and Response Setup
input_image_path = "input_dog.png"
prommpt = "Make the dog wear a small wizard hat and spectacles."
output_filename = "edited_image_result.png"

# saving image helper function from text prompt response
def save_image_from_response(response, filename):
    """Helper function to save the image from the API response."""
    if response.candidates and response.candidates[0].content.parts:
        for part in response.candidates[0].content.parts:
            if part.inline_data:
                image_data = BytesIO(part.inline_data.data)
                img = Image.open(image_data)
                img.save(filename)
                print(f"Image successfully saved as {filename}")
                return filename
    print("No image data found in the response.")
    return None

def main():
    print(f"Editing image '{input_image_path}' with prompt: '{prommpt}'...")
    try:
        img_to_edit = Image.open(input_image_path)
        response = model.generate_content([prommpt, img_to_edit])
        save_image_from_response(response, output_filename)
    except FileNotFoundError:
        print(f"Error: The file '{input_image_path}' was not found.")

if __name__ == "__main__":
    main()
```

**Output:**

![A before and after image of a playful dog wearing a small pointed wizard hat and round spectacles, sitting upright with a charming and magical look, giving a whimsical, storybook-like feel.](https://cdn.hashnode.com/res/hashnode/image/upload/v1757486336530/84cba4bf-91bd-49b7-8fd3-e94b20eabbfb.png)

:::

This code is very similar to the first example, but the key difference is in the core logic.

- `input_image_path`: This variable now holds the file path to the image you want to edit.
- `Image.open(input_image_path)`: This line uses the Pillow library to open your local image file to be used.
- `model.generate_content([prommpt, img_to_edit])`: This is the most important part. Unlike before, we now pass a list to the `generate_content` function that contains both the text prompt and the image object. This tells the API to use the provided image as a starting point for its generation.
- `try...except` block: Here, we are handling the errors. It tries to open the image file, and if it fails (because the file isn't there), it will `except` the `FileNotFoundError` and print a friendly message to the user instead of crashing.

::: tip Example 3: Multi-Image Fusion

Multi-image fusion is like merging two or more images or objects. Upload several images and instruct the AI to blend them into one composite picture seamlessly. This is a tool for creating new scenes, combining people and backgrounds, or creating detailed product mockups.

```py :collapsed-lines
import os
import google.generativeai as genai
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv

# Configuration
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.5-flash-image-preview')

# Prompt, Images, and Response Setup
image1_path = "dog_image.png"
image2_path = "cap_image.png"
prompt = "Make the dog from the first image wear the cap from the second image. The cap should fit realistically on the dog's head."
output_filename = "dog_with_cap_result.png"

def save_image_from_response(response, filename):
    """Helper function to save the image from the API response."""
    if response.candidates and response.candidates[0].content.parts:
        for part in response.candidates[0].content.parts:
            if part.inline_data:
                image_data = BytesIO(part.inline_data.data)
                img = Image.open(image_data)
                img.save(filename)
                print(f"Image successfully saved as {filename}")
                return filename
    print("No image data found in the response.")
    return None

def main():
    print(f"Fusing images '{image1_path}' and '{image2_path}'...")
    try:
        img1 = Image.open(image1_path)
        img2 = Image.open(image2_path)
        response = model.generate_content([prompt, img1, img2])
        save_image_from_response(response, output_filename)
    except FileNotFoundError:
        print("Error: One or both image files were not found.")

if __name__ == "__main__":
    main()
```

**Output:**

![Three-part image showing a golden retriever puppy in a daisy field, a red baseball cap with the letter “A,” and the final edited version where the puppy is wearing the red cap while sitting happily among the daisies](https://cdn.hashnode.com/res/hashnode/image/upload/v1757486318798/2fe3ca32-3053-44cc-9350-b1c47abacdd9.png)

:::

The logic of the code above is an extension of the Image-to-Image example.

- `image1_path` and `image2_path`: These variables hold the paths to the two images you want to fuse or merge.
- `model.generate_content([prompt, img1, img2])`: Here, the list passed to the `generate_content` function contains three items: the text prompt and both image objects. This tells the AI to use the prompt to combine the elements from both images into a single output.

::: tip Example 4: Image Restoration

This feature can restore old, faded, or damaged photos. Upload a picture and request Gemini to restore it. This includes sharpening low-quality images, colorizing old black-and-white photos, and enhancing textures, which can make your memories look new again.

```py :collapsed-lines
import os
import google.generativeai as genai
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv

# Configuration
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.5-flash-image-preview')

# Prompt, Image, and Response Setup
input_image_path = "old_photo.png"
prompt = "Restore this old, faded photograph. Sharpen the details, remove any scratches or damage, and enhance the colors to make it look like a new, high-quality photo."
output_filename = "restored_image_result.png"

def save_image_from_response(response, filename):
    """Helper function to save the image from the API response."""
    if response.candidates and response.candidates[0].content.parts:
        for part in response.candidates[0].content.parts:
            if part.inline_data:
                image_data = BytesIO(part.inline_data.data)
                img = Image.open(image_data)
                img.save(filename)
                print(f"Image successfully saved as {filename}")
                return filename
    print("No image data found in the response.")
    return None

def main():
    print(f"Attempting to restore image: '{input_image_path}'...")
    try:
        old_photo = Image.open(input_image_path)
        response = model.generate_content([prompt, old_photo])
        save_image_from_response(response, output_filename)
    except FileNotFoundError:
        print(f"Error: The file '{input_image_path}' was not found.")

if __name__ == "__main__":
    main()
```

**Output:**

![Side-by-side comparison of an old photograph and a restored version. The left shows a scratched, sepia-toned photo of a vintage car on a rural road, while the right shows the same scene digitally restored in color, with a blue classic car under a bright sky in a golden countryside](https://cdn.hashnode.com/res/hashnode/image/upload/v1757486506412/201bf046-4c63-46eb-a026-f2a432ca8c3d.png)

:::

The structure here is identical to the Image-to-Image Editing example because, from a technical perspective, image restoration is a form of image-to-image editing.

- Now the `prompt` is where the magic happens. The text prompt explicitly tells the model what to do with the image, outlining the restoration steps like "sharpen the details," "remove scratches," and "enhance the colors." The model's intelligence allows it to understand these abstract instructions and apply them to the visual data to give you a better and a realistic update to your old image.

---

## Beyond the Basics: What Else Can You Do?

This is just the tip of the iceberg! Nano Banana is incredibly versatile. Here are some ideas for where you can take your projects:

- **Batch Processing:** Automate the generation of multiple images from a list of prompts.
- **Creative Assets:** Design icons, backgrounds, or character sprites for games or apps directly from your Python script.
- **Data Processing:** Integrate Nano Banana into a data pipeline to programmatically edit or generate images based on data inputs.
- **AI Art Galleries:** Build a backend service that allows users to submit prompts and receive images.

---

## Wrapping Up

"Nano Banana" (Gemini 2.5 Flash Image) isn't just a cool tech tool; it's a practical, powerful tool for developers and creatives alike. With just a few lines of code, you can tap into its capabilities and bring your visual ideas to real life. This streamlined approach makes it easy to get started, experiment, and integrate this visual magic into your projects.

If you found this article helpful and want to discuss AI development, LLMs, or software development, feel free to connect with me on [X/Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`itsTarun24`)](https://x.com/itsTarun24), [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`tarunsingh24`)](https://linkedin.com/in/tarunsingh24), or check out my portfolio on my [<VPIcon icon="fas fa-globe"/>Blog](http://tarunportfolio.vercel.app/blog). I regularly share insights about AI, development, technical writing, and much more.

Happy coding, and may your creations be as vibrant as a field of fresh bananas!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Nano Banana for Image Generation - Explained with Code Examples",
  "desc": "AI is changing the image generation and editing process into a smooth workflow. Now, with just a single prompt, you can tell your computer to generate or edit an existing image. Google just launched its new model for image generation or editing, ”Nan...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/nano-banana-for-image-generation.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
