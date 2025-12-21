---
lang: en-US
title: "How to Reduce Latency in Your Generative AI Apps with Gemini and Cloud Run"
description: "Article(s) > How to Reduce Latency in Your Generative AI Apps with Gemini and Cloud Run"
icon: iconfont icon-gcp
category:
  - DevOps
  - Google
  - Google Cloud
  - AI
  - LLM
  - Gemini
  - Docker
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - google
  - google-cloud
  - gcp
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - gemini
  - google-gemini
  - docker
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Reduce Latency in Your Generative AI Apps with Gemini and Cloud Run"
    - property: og:description
      content: "How to Reduce Latency in Your Generative AI Apps with Gemini and Cloud Run"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-reduce-latency-in-your-generative-ai-apps-with-gemini-and-cloud-run.html
prev: /devops/gcp/articles/README.md
date: 2025-12-10
isOriginal: false
author:
  - name: Amina Lawal
    url : https://freecodecamp.org/news/author/Bronze/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1765370930321/e4256d2f-cab3-4ae3-9486-c6651e363366.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Google Cloud > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/gcp/articles/README.md",
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

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
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
  name="How to Reduce Latency in Your Generative AI Apps with Gemini and Cloud Run"
  desc="You've built your first Generative AI feature. Now what? When deploying AI, the challenge is no longer if the model can answer, but how fast it can answer for a user halfway across the globe. Low latency is not a luxury, it's a requirement for good u..."
  url="https://freecodecamp.org/news/how-to-reduce-latency-in-your-generative-ai-apps-with-gemini-and-cloud-run"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1765370930321/e4256d2f-cab3-4ae3-9486-c6651e363366.png"/>

You've built your first Generative AI feature. Now what? When deploying AI, the challenge is no longer *if* the model can answer, but *how fast* it can answer for a user halfway across the globe. Low latency is not a luxury, it's a requirement for good user experience.

Today, we’ve moved beyond simple container deployments and into building **Global AI Architectures**. This setup leverages Google’s infrastructure to deliver context-aware, instant Gen AI responses anywhere in the world. If you're ready to get your hands dirty, let's build the future of global, intelligent features.

In this article, you’re not just going to deploy a container, you’ll be building a global AI architecture.

A global AI architecture is a design pattern that leverages a worldwide network to deploy and manage AI services, ensuring the fastest possible response time (low latency) for users, no matter where they are located. Instead of deploying a feature to a single region, this architecture distributes the service across multiple continents.

Most people may deploy a service to a single region. That’s fine for a local user, but physical distance, and the speed of light, creates terrible latency for everyone else. We are going to eliminate this problem by leveraging Google’s global network to deploy the service in a "triangle" of locations.

The generative AI service you’ll be building is a "Local Guide." This application will be designed to be deeply **hyper-personalized**, changing its personality and providing recommendations based on the user's detected geographical context. For example, if a user is in Paris, the guide will greet them warmly, mentioning their city and suggesting a local activity.

You’re going to build this service to achieve three critical goals:

- **Lives Almost Everywhere:** Deployed to three continents simultaneously (USA, Europe, and Asia).
- **Feels Instant:** Uses Google's global fiber network and Anycast IP to route users to the nearest server, ensuring the lowest possible latency.
- **Knows Where You Are:** Automatically detects the user's location (without relying on client-side GPS permissions) to provide deeply personalized, location-aware suggestions.

::: note Prerequisites

To follow along, you need:

1. **A Google Cloud Project** (with billing enabled).
2. **Google Cloud Shell** (Recommended! No local setup required). Click the icon in the top right of the GCP Console that looks like a terminal prompt `>_`.

**Note**: The project utilizes various Google Cloud services (Cloud Run, Artifact Registry, Load Balancer, Vertex AI), all of which require a Google Cloud Project with billing enabled to function. While many of these services offer a free tier, you must link a billing account to your project. Although a billing account is required, new Google Cloud users may be eligible for a [<VPIcon icon="iconfont icon-gcp"/>free trial credit**](https://console.cloud.google.com/freetrial?hl=en) that should cover the cost of this lab. [<VPIcon icon="iconfont icon-gcp"/>See credit program eligibility and coverage](https://cloud.google.com/free/docs/free-cloud-features#free-trial)

:::

---

## Phase 1: The "Location-Aware" Code

We don’t want to build a generic chatbot, so we’ll be building a "Local Guide" that changes its personality based on where the request comes from.

### Enable the APIs

To wake up the services, run this in your terminal:

```sh
gcloud services enable \
run.googleapis.com \
artifactregistry.googleapis.com \
compute.googleapis.com \
aiplatform.googleapis.com \
cloudbuild.googleapis.com
```

This command enables the necessary Google Cloud APIs for the project:

- Cloud Run ([<VPIcon icon="fa-brands fa-google"/>run.googleapis.com](http://run.googleapis.com))
- Artifact Registry ([<VPIcon icon="fa-brands fa-google"/>artifactregistry.googleapis.com](http://artifactregistry.googleapis.com))
- Compute Engine ([<VPIcon icon="fa-brands fa-google"/>compute.googleapis.com](http://compute.googleapis.com))
- Vertex AI ([<VPIcon icon="fa-brands fa-google"/>aiplatform.googleapis.com](http://aiplatform.googleapis.com))
- Cloud Build ([<VPIcon icon="fa-brands fa-google"/>cloudbuild.googleapis.com](http://cloudbuild.googleapis.com)).

Enabling them ensures that the services we need are ready to be used.

![Screenshot showing the Google Cloud APIs being successfully completed](https://cdn.hashnode.com/res/hashnode/image/upload/v1764156603095/fb2ffd56-12e4-4b9f-ac2d-8fbb30fc0a2d.png)

### Create and Populate <VPIcon icon="fa-brands fa-python"/>`main.py`

This is the brain of our service. In your Cloud Shell terminal, create a file named <VPIcon icon="fa-brands fa-python"/>`main.py` and paste the following code into it:

```py :collapsed-lines title="main.py"
import os
import logging
from flask import Flask, request, jsonify
import vertexai
from vertexai.generative_models import GenerativeModel

app = Flask(__name__)

# Initialize Vertex AI
PROJECT_ID = os.environ.get("GOOGLE_CLOUD_PROJECT")
vertexai.init(project=PROJECT_ID)

@app.route("/", methods=["GET", "POST"])
def generate():
    # 1. Identify where the code is physically running (We set this ENV var later)
    service_region = os.environ.get("SERVICE_REGION", "unknown-region")

    # 2. Identify where the user is (Header comes from Global Load Balancer)
    # Format typically: "City,State,Country"
    user_location = request.headers.get("X-Client-Geo-Location", "Unknown Location")

    model = GenerativeModel("gemini-2.5-flash")

    # 3. Construct a location-aware prompt
    prompt = (
        f"You are a helpful local guide. The user is currently in {user_location}. "
        "Greet them warmly mentioning their city, and suggest one "
        "hidden gem activity to do nearby right now. Keep it under 50 words."
    )

    try:
        response = model.generate_content(prompt)
        return jsonify({
            "ai_response": response.text,
            "meta": {
                "served_from_region": service_region,
                "user_detected_location": user_location
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
```

It’s a simple Flask web application that relies entirely on a specific HTTP header (`X-Client-Geo-Location`) that the global load balancer will inject later in the process. This design choice keeps the Python code clean, fast, and focused on using the context that the powerful Google Cloud infrastructure provides. The script uses Vertex AI and the high-performance Gemini 2.5 Flash generative model.

This core logic of the application is a simple Flask web service. It does the following:

- **Initialization:** Sets up the Flask app, logging, and initializes the Vertex AI client using the project ID.
- **Context:** It extracts two critical pieces of information: the `SERVICE_REGION` (where the code is physically running) from the environment variable, and the `X-Client-Geo-Location` (the user's detected location) from the request header, which will be injected by the global load balancer.
- **AI Generation:** It uses the high-performance `gemini-2.5-flash` model.
- **Prompt Construction:** A dynamic, location-aware prompt is built using the detected city to instruct Gemini to act as a helpful local guide and provide a personalized suggestion.
- **Response:** The response includes the AI's generated text and a `meta` section containing both the serving region and the user's detected location, which helps in verification.

### Create the** `Dockerfil

This Dockerfile tells Cloud Run how to build the Python application into a container image. Create a file named <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` in the same directory as <VPIcon icon="fa-brands fa-python"/>`main.py` and paste the following content into it:

```dockerfile title="Dockerfile"
FROM python:3.9-slim

WORKDIR /app
COPY main.py .

# Install Flask and Vertex AI SDK
RUN pip install flask google-cloud-aiplatform

CMD ["python", "main.py"]
```

Here’s what the code does:

- Starts with a lightweight Python base image `python:3.9-slim`.
- Sets the working directory inside the container `WORKDIR /app`.
- Copies your application code into the container.
- `RUN pip install...` installs the required Python packages: Flask for the web server and `google-cloud-aiplatform` for accessing the Gemini model.
- `CMD` specifies the command to run when the container starts.

---

## Phase 2: Build & Push

Let's package this up. For efficiency and consistency, we’ll follow the best practice of Build Once, Deploy Many. We’ll build the container image once using Cloud Build and store it in Google's Artifact Registry. This guarantees that the same tested application code runs in New York, Belgium, and Tokyo.

First, sets an environment variable for your Google Cloud Project ID to simplify later commands.

```sh
# 1. Set your Project ID variable
export PROJECT_ID=$(gcloud config get-value project)
```

Then create a new Docker repository named `gemini-global-repo` in the `us-central1` region to store the application container image:

```sh
# 2. Create the repository
gcloud artifacts repositories create gemini-global-repo \
--repository-format=docker \
--location=us-central1 \
--description="Repo for Global Gemini App"
```

Using the `mkdir gemini-app` command, create and navigate into a directory where you should place your <VPIcon icon="fa-brands fa-python"/>`main.py` and <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`:

```sh
# 3. Prepare the Build Environment (Crucial Step! 💡). To ensure the build process only includes our necessary code and avoids including temporary files from Cloud Shell's home directory 
mkdir gemini-app
cd gemini-app
```

Next, use `gcloud builds submit --tag` to build the container image from the files in the current directory and push the resulting image to the newly created Artifact Registry repository:

```sh
# 4. Build the image (This takes about 2 minutes)
gcloud builds submit --tag us-central1-docker.pkg.dev/$PROJECT_ID/gemini-global-repo/region-ai:v
```

![Screenshot of Cloud Shell Editor showing Dockerfile and terminal build output.](https://cdn.hashnode.com/res/hashnode/image/upload/v1764159484475/97a5b2b6-f3c2-4d1b-8bf8-6f302748e744.png)

::: nOTE

You might notice that we created the Artifact Registry repository (`gemini-global-repo`) in the `us-central1` region. This choice is purely for management and storage of the container image. When you create an image and push it to a regional Artifact Registry, the resulting image is still accessible globally. For this lab, `us-central1` serves as a reliable, central location for our single, canonical container image, the single source of truth, which is then pulled by Cloud Run in the three separate global regions.

---

## Phase 3: The "Triangle" Deployment

![Diagram of the Global AI Architecture Triangle Deployment.](https://cdn.hashnode.com/res/hashnode/image/upload/v1764661657796/0890a47b-589a-4cf8-b537-bb61e5e65ee7.png)

We’ll deploy the same image to three corners of the world, forming our "Triangle". This ensures that whether a user is in Lagos, London, or Tokyo, they’ll be geographically close to a server. This is the low-latency core of our architecture.

We’ll use Cloud Run to deploy our services. Cloud Run is a fully managed serverless platform on Google Cloud that enables you to run stateless containers via web requests or events. Crucially, it is serverless, meaning you don't manage any virtual machines, operating system updates, or scaling infrastructure. You provide a container image, and Cloud Run automatically scales it up (and down to zero) in the region you specify.

For this project, we’ll use its regional deployment capability to easily and consistently deploy the exact same container image to New York, Belgium, and Tokyo.

::: note

Setting it up primarily involves enabling the API (done in Phase 1) and using the `gcloud run deploy` command, which handles provisioning and managing the service in the specified region.

:::

Now, we’ll proceed to deploy the single, canonical container image to three separate Cloud Run regions, forming the "Triangle Deployment".

First, set a variable for the image path, pointing to the image stored in Artifact Registry.

```sh
# Define our image URL
export IMAGE_URL=us-central1-docker.pkg.dev/$PROJECT_ID/gemini-global-repo/region-ai:v1
```

```sh

# 1. Deploy to USA (New York)
gcloud run deploy gemini-service \
--image $IMAGE_URL \
--region us-east4 \
--set-env-vars SERVICE_REGION=us-east4 \
--allow-unauthenticated

# 2. Deploy to Europe (Belgium)
gcloud run deploy gemini-service \
--image $IMAGE_URL \
--region europe-west1 \
--set-env-vars SERVICE_REGION=europe-west1 \
--allow-unauthenticated

# 3. Deploy to Asia (Tokyo)
gcloud run deploy gemini-service \
--image $IMAGE_URL \
--region asia-northeast1 \
--set-env-vars SERVICE_REGION=asia-northeast1 \
--allow-unauthenticated
```

`gcloud run deploy gemini-service...` deploys the service. Key flags:

- `--image \$IMAGE_URL` specifies the container image to use.
- `--region` specifies the deployment region (for example, `us-east4` for New York).
- `--set-env-vars SERVICE_REGION=...` injects an environment variable into the running container to let the <VPIcon icon="fa-brands fa-python"/>`main.py` code know its own physical region.
- `--allow-unauthenticated` makes the service publicly accessible, as required for the Load Balancer to connect.

::: note

The commands are repeated for Europe (`europe-west1`) and Asia (`asia-northeast1`) regions.

:::

![Screenshot of Cloud Shell terminal showing the execution of the cloud run services.](https://cdn.hashnode.com/res/hashnode/image/upload/v1764160600271/fbb6a810-7496-4b29-a405-b67a22a988ed.png)

![Cloud run Service Url (asia region) terminal screenshot showing the successful execution of the service](https://cdn.hashnode.com/res/hashnode/image/upload/v1764160624375/dd4dc7e7-22a9-4d8b-a36c-7a0988068f57.png)

![Cloud run Service Url (europe region) terminal screenshot showing the successful execution of the service](https://cdn.hashnode.com/res/hashnode/image/upload/v1764160656898/1b6ca938-9ce4-48f6-bb3b-d09900dbde68.png)

![Cloud run Service Url (us-east region) terminal screenshot showing the successful execution of the service](https://cdn.hashnode.com/res/hashnode/image/upload/v1764160665595/39c2524d-62c8-4187-8b8f-15f7ebbffba4.png)

`user_detected_location` is always "Unknown Location". This is expected. You are accessing the Cloud Run URLs directly, not via the global load balancer, so the `X-Client-Geo-Location` header is not yet being injected.

---

## Phase 4: The Global Network (The Glue)

You are now ready to execute the steps to create the **Global External HTTP Load Balancer** infrastructure. This is the "magic" that stitches the three regional services together behind a single **Anycast IP Address**. The load balancer performs two critical functions:

1. **Global Routing:** It uses Google’s high-speed network to automatically route the user to the closest available region (for example, Tokyo user → Asia service).
2. **Context Injection:** It dynamically adds the `X-Client-Geo-Location` header to the request, telling your code exactly where the user is.

### The Global IP

`gcloud compute addresses create...` creates a single, global, static Anycast IP address (`gemini-global-ip`) that will serve as the single public entry point for users worldwide. That is

```sh
gcloud compute addresses create gemini-global-ip \
--global \
--ip-version IPV4
```

### The Network Endpoint Groups (NEGs)

`gcloud compute network-endpoint-groups create...` creates a **Serverless Network Endpoint Group (NEG)** for each regional Cloud Run deployment. For example, `neg-us` is created in `us-east4` and points to the `gemini-service` in that region. These map your Cloud Run services to the Load Balancer's backend service:

```sh
# USA NEG
gcloud compute network-endpoint-groups create neg-us \
--region=us-east4 \
--network-endpoint-type=serverless  \
--cloud-run-service=gemini-service

# Europe NEG
gcloud compute network-endpoint-groups create neg-eu \
--region=europe-west1 \
--network-endpoint-type=serverless \
--cloud-run-service=gemini-service

# Asia NEG
gcloud compute network-endpoint-groups create neg-asia \
--region=asia-northeast1 \
--network-endpoint-type=serverless \
--cloud-run-service=gemini-service
```

![Screenshot of Cloud Shell terminal showing the execution of global load balancer setup commands.](https://cdn.hashnode.com/res/hashnode/image/upload/v1764161003478/549c959d-8ab5-45d6-a2ae-94129529b5b4.png)

### The Backend Service & Routing

This is the load balancer's core, distributing traffic across your regions. Connect the NEGs to a global backend.

`gcloud compute backend-services create...` creates the global backend service (`gemini-backend-global`), which is the core component that manages traffic distribution:

```sh
# Create the backend service
gcloud compute backend-services create gemini-backend-global \
--global \
--protocol=HTTP
```

`gcloud compute backend-services add-backend...` adds all three regional NEGs (`neg-us`, `neg-eu`, `neg-asia`) as backends to the global service. This tells the load balancer where all the services are located:

```sh
# Add the 3 regions to the backend
gcloud compute backend-services add-backend gemini-backend-global \
--global --network-endpoint-group=neg-us \
--network-endpoint-group-region=us-east4

gcloud compute backend-services add-backend gemini-backend-global \
--global --network-endpoint-group=neg-eu \
--network-endpoint-group-region=europe-west1

gcloud compute backend-services add-backend gemini-backend-global \
--global --network-endpoint-group=neg-asia \
--network-endpoint-group-region=asia-northeast1
```

### The URL Map & Frontend

Now we can finalize the connection.

`gcloud compute url-maps create...` creates a URL Map (`gemini-url-map`) to direct all incoming traffic to the Backend Service:

```sh
# Create URL Map (Maps incoming requests to the backend service)
gcloud compute url-maps create gemini-url-map \
--default-service gemini-backend-global
```

`gcloud compute target-http-proxies create...` creates an HTTP Proxy (`gemini-http-proxy`) that inspects the request and directs it based on the URL map.

```sh
# Create HTTP Proxy (The component that inspects the request headers)
gcloud compute target-http-proxies create gemini-http-proxy \
--url-map gemini-url-map
```

`export VIP=...` retrieves the final, public IP address of the newly created Global IP and stores it in the `VIP` environment variable.

```sh
# Get your IP Address variable
export VIP=$(gcloud compute addresses describe gemini-global-ip --global --format="value(address)")
```

`gcloud compute forwarding-rules create...` creates the final global Forwarding Rule (`gemini-forwarding-rule`). This links the Global IP (`$VIP`) to the HTTP Proxy and opens port 80 for public traffic.

```sh
# Create Forwarding Rule (Open port 80)
gcloud compute forwarding-rules create gemini-forwarding-rule \
--address=$VIP \
--global \
--target-http-proxy=gemini-http-proxy \
--ports=80
```

![Cloud Shell terminal screenshot showing the successful execution of commands to create the gemini-backend-global service](https://cdn.hashnode.com/res/hashnode/image/upload/v1764161323862/299c6c43-9074-493c-95b1-2c08208aa2ec.png)

---

## Phase 5: Testing (Teleportation Time)

Global load balancers take about **5-7 minutes** to propagate worldwide. This is how you verify that the global load balancer is working correctly:

- Using the single **VIP** (Virtual IP) address.
- **Routing traffic** to the nearest server.
- **Injecting the** `X-Client-Geo-Location` header to tell your code where the user is.

### 1. Get your Global IP

First, ensure your `VIP` variable is set and retrieve the final address:

```sh
echo "http://$VIP/"
```

The output will be your single point of entry for the entire global architecture.

### 2. Test "Teleportation"

These `curl` commands simulate a user requesting the service from different geographical locations by manually injecting the `X-Client-Geo-Location` header. This bypasses the need to be physically in those locations for testing.

#### Simulate Europe (Paris)

We expect this to be served by the `europe-west1` region because it's the closest server.

```sh
curl -H "X-Client-Geo-Location: Paris,France" http://$VIP/
```

::: info Expected Output

Gemini should say "Bonjour" and mention Paris. The `served_from_region` should be `europe-west1`.

:::

#### Simulate Asia (Tokyo)

We expect this to be served by the `asia-northeast1` region.

```sh
curl -H "X-Client-Geo-Location: Tokyo,Japan" http://$VIP/
```

::: info Expected Output

Gemini should mention Tokyo. The `served_from_region` should be `asia-northeast1`.

:::

#### Simulate USA (New York)

We expect this to be served by the `us-east4` region.

```sh
curl -s -H "X-Client-Geo-Location: New York,USA" http://$VIP/ | jq .
```

::: info Expected Output

Gemini should mention USA. The `served_from_region` should be `us-east4`.

:::

![Cloud Shell terminal screenshot showing the results of curl commands simulating users in Paris, Tokyo, and New York.](https://cdn.hashnode.com/res/hashnode/image/upload/v1764161891891/ecc290ef-1c75-4088-b453-093a92b404ff.png)

::: note

The `| jq .` part is optional, but highly recommended as it formats the JSON output, making it much easier to read the `served_from_region` and `ai_response` details. If `jq` isn't available, you can just run `curl ...` without it.

:::

---

## Conclusion: The Global AI Edge

Congratulations! You have successfully built a sophisticated, global AI architecture that solves the challenges of latency and personalization for generative AI features. By combining the following technologies, you achieved two critical outcomes:

- **Guaranteed Low Latency:** By deploying the **Cloud Run** service to a "Triangle" of global regions (USA, Europe, Asia) and using the **Global External HTTP Load Balancer's Anycast IP**, your users are automatically routed across Google’s private fiber network to the closest available server.
- **Hyper-Personalization:** The global load balancer was configured to dynamically inject the user's geographical location via the `X-Client-Geo-Location` header. This context was passed directly to the **Gemini 2.5 Flash** model, allowing it to act as a truly location-aware "Local Guide".

This pattern allows you to scale intelligent features globally and is immediately applicable to any application where speed and context are essential, from real-time translations to hyper-local recommendations.

### Cleanup

Don't leave the meter running! Remember to execute the cleanup commands to ensure you don't incur unnecessary charges

```sh
gcloud run services delete gemini-service \
--region us-east4 \
--quiet

gcloud run services delete gemini-service \
--region europe-west1 \
--quiet

gcloud run services delete gemini-service \
--region asia-northeast1 \
--quiet

gcloud compute forwarding-rules delete gemini-forwarding-rule \
--global --quiet

gcloud compute addresses delete gemini-global-ip \
--global --quiet

gcloud compute backend-services delete gemini-backend-global \
--global --quiet

gcloud compute url-maps delete gemini-url-map \
--global --quiet

gcloud compute target-http-proxies delete gemini-http-proxy \
--global --quiet
```

### Resources

- Google Cloud Shell Documentation

<SiteInfo
  name="Vertex AI Platform"
  desc="Enterprise ready, fully-managed, unified AI development platform. Access and utilize Vertex AI Studio, Agent Builder, and 200+ foundation models."
  url="https://cloud.google.com/vertex-ai"
  logo="https://gstatic.com/cgc/favicon.ico"
  preview="https://cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png"/>

<SiteInfo
  name="Artifact Registry documentation  |  Google Cloud Documentation"
  desc="A universal package manager for all your build artifacts and dependencies."
  url="https://docs.cloud.google.com/artifact-registry/docs/"
  logo="https://gstatic.com/devrel-devsite/prod/v9de0f443992d54ad799f913d3a82969ff613e39ab9e3e056983c556b3c2ef1f8/clouddocs/images/favicons/onecloud/favicon.ico"
  preview="https://docs.cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png"/>

<SiteInfo
  name="Cloud Run documentation  |  Google Cloud Documentation"
  desc="Fully managed application platform to run your code, function, or container on top of Google's highly scalable infrastructure."
  url="https://docs.cloud.google.com/run/docs/"
  logo="https://gstatic.com/devrel-devsite/prod/v9de0f443992d54ad799f913d3a82969ff613e39ab9e3e056983c556b3c2ef1f8/clouddocs/images/favicons/onecloud/favicon.ico"
  preview="https://docs.cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png"/>

<SiteInfo
  name="Cloud Load Balancing overview  |  Google Cloud Documentation"
  desc="Explore the basics of Cloud Load Balancing including key features and the types of load balancers Cloud has to offer."
  url="https://docs.cloud.google.com/load-balancing/docs/load-balancing-overview/"
  logo="https://gstatic.com/devrel-devsite/prod/v9de0f443992d54ad799f913d3a82969ff613e39ab9e3e056983c556b3c2ef1f8/clouddocs/images/favicons/onecloud/favicon.ico"
  preview="https://docs.cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png"/>

<SiteInfo
  name="Serverless network endpoint groups overview  |  Cloud Load Balancing  |  Google Cloud Documentation"
  desc="Understand serverless NEGs. Integrate serverless applications with Application Load Balancers for advanced traffic management."
  url="https://docs.cloud.google.com/load-balancing/docs/negs/serverless-neg-concepts/"
  logo="https://gstatic.com/devrel-devsite/prod/v9de0f443992d54ad799f913d3a82969ff613e39ab9e3e056983c556b3c2ef1f8/clouddocs/images/favicons/onecloud/favicon.ico"
  preview="https://docs.cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png"/>

<SiteInfo
  name="Serve traffic from multiple regions  |  Cloud Run  |  Google Cloud Documentation"
  desc="You return faster responses to your users around the world by deploying services in multiple regions and routing your users to the nearest region. Deploying across multiple regions delivers low latency and higher availability in case of regional outages."
  url="https://docs.cloud.google.com/run/docs/multiple-regions/"
  logo="https://gstatic.com/devrel-devsite/prod/v9de0f443992d54ad799f913d3a82969ff613e39ab9e3e056983c556b3c2ef1f8/clouddocs/images/favicons/onecloud/favicon.ico"
  preview="https://docs.cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Reduce Latency in Your Generative AI Apps with Gemini and Cloud Run",
  "desc": "You've built your first Generative AI feature. Now what? When deploying AI, the challenge is no longer if the model can answer, but how fast it can answer for a user halfway across the globe. Low latency is not a luxury, it's a requirement for good u...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-reduce-latency-in-your-generative-ai-apps-with-gemini-and-cloud-run.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
