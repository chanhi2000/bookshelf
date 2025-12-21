---
lang: en-US
title: "How to Run a Docker Container in AWS Lambda"
description: "Article(s) > How to Run a Docker Container in AWS Lambda"
icon: fa-brands fa-aws
category:
  - DevOps
  - Amazon
  - AWS
  - Docker
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - amazon
  - aws
  - amazon-web-services
  - docker
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Run a Docker Container in AWS Lambda"
    - property: og:description
      content: "How to Run a Docker Container in AWS Lambda"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-a-docker-container-in-aws-lambda.html
prev: /devops/aws/articles/README.md
date: 2025-12-25
isOriginal: false
author:
  - name: Agnes Olorundare
    url : https://freecodecamp.org/news/author/Agnes28/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1766599506861/86c07e37-7838-4186-971e-29722ccec785.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
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
  name="How to Run a Docker Container in AWS Lambda"
  desc="While containers are quite lightweight and provide various benefits, it can be challenging to decide how best to deploy them. There are a number of ways to deploy and run Docker containers. But some are best for orchestrating and managing containers,..."
  url="https://freecodecamp.org/news/how-to-run-a-docker-container-in-aws-lambda"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1766599506861/86c07e37-7838-4186-971e-29722ccec785.png"/>

While containers are quite lightweight and provide various benefits, it can be challenging to decide how best to deploy them. There are a number of ways to deploy and run Docker containers. But some are best for orchestrating and managing containers, and may not suit a simple use case of running just one container.

In this article, I’ll teach you how you can deploy a single Docker container using a serverless service on AWS called Lambda.

::: note Prerequisite/ Requirements

The following tools and skills are necessary for following along with this tutorial:

- Knowledge of Docker, and have Docker installed locally.
- An AWS account with credentials with administrative privilege for making API calls via the CLI. Best practice would be to limit the privilege to exactly what needs to be done.
- AWS CLI installed locally
- Python virtual environment managers [such as uv (<VPIcon icon="iconfont icon-github"/>`astral-sh/uv`)](https://github.com/astral-sh/uv) (optional)

:::

---

## Serverless with AWS Lambda

Containers provide a lightweight, consistent, and resource-friendly way of running applications. Serverless takes away the overhead of managing the underlying infrastructures on which the container runs. So as you can probably start to see, combining these tools helps you deploy applications in a way that lets you focus on business logic, performance, and what gives your product a competitive edge/ advantage.

One AWS tool that enables you to go serverless is Lambda. With Lambda, you’re only billed for the number of times the code in the function runs, the memory you selected at the time of provisioning the service, and the duration of each invocation of the function.

In addition to removing operational overhead, Lambda can also help you save money since you won’t have to deal with idle resources. The function only comes alive when triggered by a request sent to it.

---

## How to Build, Run, and Test a Container Locally

Docker is a tool that helps you package applications or software into portable, standardized and shareable units that have everything the applications need such as libraries, runtime, system tools, application code, in order to run. These units are called containers.

In this section, I’ll walk you through building the Docker image, running the container, and testing it after it’s running.

You can find the project that you’ll be using here in this [GitHub repository (<VPIcon icon="iconfont icon-github"/>`Agnes4Him/freecodecamp-lambda-docker`)](https://github.com/Agnes4Him/freecodecamp-lambda-docker).

### Build the Docker Image

To run a Docker container, you first need to build an image. The image becomes the template or `class` from which you create the container or `instance of the class`.

You can find the code to build an image in <VPIcon icon="fa-brands fa-python"/>`lambda_function.py`.

```py title="lambda_function.py"
def lambda_handler(event, context):
    name = event["name"]
    message = f"Hello, {name}!"

    try:
        return {
            "statusCode": 200,
            "body": message
        }
    except Exception as e:
        return {
            "statusCode": 400,
            "body": {"error": str(e)}
        }
```

As you can see from the code above, this is a very basic Python application that expects a `POST` HTTP request, with a JSON payload that contains the key – `name` – and a corresponding value. The code then returns a greeting containing the name it has received. The application has just a single function, which also serves as the entry point to it.

To build a Docker image, you’ll need a Dockerfile to provide the blueprint for the image. For this specific case, the Dockerfile you’ll use is also very basic. Each line in a Dockerfile is called a `Directive`, and this provides the instruction Docker should follow when creating an image. So building a Docker image means creating a template for a container by following the instructions or directives in the Dockerfile.

```dockerfile title="Dockerfile"
FROM public.ecr.aws/lambda/python:3.12

# Copy function code... LAMBDA_TASK_ROOT is /var/task, the working directory set in the base image
COPY lambda_function.py ${LAMBDA_TASK_ROOT}
# Set the CMD to your handler - lambda_handler
CMD ["lambda_function.lambda_handler"]
```

A Dockerfile usually starts with a base image. To deploy an application as a Docker container in AWS Lambda, the base image has to be of a specific kind, depending on the application run-time. For this case, you’ll need the Python run-time, so the base image is `public.ecr.aws/lambda/python:3.12`. It’s okay to use a different Python version.

The next directive in the Dockerfile is copying the <VPIcon icon="fa-brands fa-python"/>`lambda_function.py` file to a specific path in the base image. That path is referenced using an environment variable that has already been defined in the base image and points to <VPIcon icon="fas fa-folder-open"/>`/var/task`. This is the directory your code will be running from.

The last directive is simply a command to start the application when the container runs.

Now, you can run the build command from the project’s root directory:

```sh
docker build -t <IMAGE_NAME>:<iIMAGE_TAG> .
```

![Running docker build command on the terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1766415846066/f128b7fc-f3a0-4770-b361-3f27c36a6ec4.png)

![Output of docker images command showing a list of all existing images](https://cdn.hashnode.com/res/hashnode/image/upload/v1766415895836/d4653144-51b2-437d-8d73-4aaa42651206.png)

### Run the Docker Container

Next, let’s create a running container from this image.

```sh
docker run -it --rm -p 8080:8080  lambda_docker:1.0.0
```

The command above will create a container and run it in interactive mode just so you can see the logs generated by the application in the container. Port 8080 is also exposed on the host where the container is running and mapped to the container port, which is also 8080 (defined by AWS). The container gets automatically removed once you kill the running process with <kbd>CTRL</kbd>+<kbd>C</kbd>.

![Showing docker run command in interactive mode](https://cdn.hashnode.com/res/hashnode/image/upload/v1766416250857/62584a3c-bf5e-4cd9-b8d5-fc6734c50075.png)

### Test the Running Container

Now confirm that the application running within the container can receive and process requests. To do this, use the code in the <VPIcon icon="fa-brands fa-python"/>`test.py` file:

```py title="test.py"
import requests

url = "http://localhost:8080/2015-03-31/functions/function/invocations"

data = {
    "name": "Janet"
}

response = requests.post(url, json=data)

print("Status Code:", response.status_code)
print("Response Body:", response.json())
```

You can use the Python `requests` library to make this call. Install the library by using a virtual environment to isolate the application from your overall system. This helps prevent issues with conflicts in the versions of libraries you install for an application to use.

If you’re using uv to manage your virtual environment, simply run the command:

```sh
uv add requests
```

Then run the code in <VPIcon icon="fa-brands fa-python"/>`test.py` from within the virtual environment:

```sh
uv run python3 test.py
```

![Testing that the running docker container is working by running test.py file](https://cdn.hashnode.com/res/hashnode/image/upload/v1766419713310/1ebc3435-3826-46fb-93f3-4218c367e280.png)

You should see the desired response on the terminal.

![Docker container logs in real time](https://cdn.hashnode.com/res/hashnode/image/upload/v1766419866358/8f0c2867-64c6-4b16-a5a7-5a0eedf9470f.png)

---

## How to Push Your Image to Amazon Elastic Container Registry (ECR)

Now that you have a working Docker image to deploy to Lambda, the next step is to push the image to a Docker registry. For this use case, your image has to be pushed to Amazon ECR, a container registry for storing Docker images.

To push your Docker image, you first need to tag the image, which simply means naming the image in a specific way.

Currently, this image tag is `lambda-docker:1.0.0`. To tag it the AWS way, first create an ECR repository. Let’s use the AWS CLI for this (this requires you to configure the AWS credentials locally by running the `aws configure` command and providing your credentials).

### Setup Environment Variables

```sh
# Set AWS profile
export AWS_PROFILE=<PROFILE_NAME>
```

```sh
# Set other variables
AWS_REGION=<AWS_REGION>
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REPO_NAME=lambda-docker
TAG=1.0.0
```

The above commands set the `AWS_PROFILE` for the CLI to target the right AWS account for API calls. The other variables specify the region, account ID, and the ECR repository name and tag.

### Create ECR Repository and Authenticate

Now, create the ECR repository:

```sh
aws ecr create-repository \
--repository-name "$REPO_NAME" \
--region "$AWS_REGION"
```

Authenticate to Amazon ECR:

```sh
aws ecr get-login-password --region "$AWS_REGION" \
| docker login \
--username AWS \
--password-stdin "$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"
```

### Tag and Push the Docker Image

Now, tag the Docker image:

```sh
docker tag $REPO_NAME:$TAG \
$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME:$TAG
```

Push the image to the ECR repository you created:

```sh
docker push $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME:$TAG
```

And that’s it! Your image is now in ECR.

![Image of Amazon ECR showing the repository created earlier](https://cdn.hashnode.com/res/hashnode/image/upload/v1766420761622/5a18e41b-be41-4660-8d6c-59b12aebb4de.jpeg)

![Image of the docker image pushed to the existing ECR repository](https://cdn.hashnode.com/res/hashnode/image/upload/v1766420810814/9f65af4b-a509-45e3-be8f-0bed08cfe6b2.png)

---

## How to Deploy Your Docker Image to Lambda

With your image now in ECR, you can create a Lambda function. Navigate to the Lambda console, and click `Create a Function`.

### Create Lambda Function

![AWS Lambda Console](https://cdn.hashnode.com/res/hashnode/image/upload/v1766421062231/19bae74d-a6d5-4e73-8cca-102be40be214.png)

Select `Container Image` and go ahead to search for the ECR repository you created.

![Select ECR repository to create a Lambda function](https://cdn.hashnode.com/res/hashnode/image/upload/v1766421207358/25ae6eb2-1b1b-43c7-86dc-6dcd512ddc81.jpeg)

Next, select the image:

![Select the existing Docker image from ECR](https://cdn.hashnode.com/res/hashnode/image/upload/v1766421335963/ab7d9103-0ea6-4e25-be8c-139344acb5c5.png)

Leave other configurations as default and click create.

![Hit the Create button to create a Lambda function](https://cdn.hashnode.com/res/hashnode/image/upload/v1766421506518/2f6e631a-a0c7-4f20-966f-2ef87f91bfb7.jpeg)

Navigate to the function after creating.

![The newly created Lambda function dashboard/ overview](https://cdn.hashnode.com/res/hashnode/image/upload/v1766421673261/71c60ac4-35e7-4458-b4a7-1be2440b9e16.jpeg)

### Test Deployment

Now, let’s test the deployment. For this, simply use the existing Lambda `Test` tab. Provide all the details needed, including the payload for your `POST` request.

![Create a new test instance to test the Lambda function](https://cdn.hashnode.com/res/hashnode/image/upload/v1766421769909/008473e4-bb28-4fdd-8c5b-7e1f3489a3a0.png)

![The output of testing Lambda function](https://cdn.hashnode.com/res/hashnode/image/upload/v1766421889043/86f6dbe6-be94-4dca-973e-9e7b68064ff3.png)

And that’s it. You’ve successfully deployed a Docker container on AWS by leveraging ECR and Lambda. You can go a step forward by integrating API Gateway and making the function accessible from the internet.

---

## Cleanup

Remember to delete the services you’ve created on your AWS ECR repository and Lambda to avoid extra charges.

---

## Conclusion

Deploying your Docker container on AWS Lambda is an efficient way to get your application running quickly without being bothered by managing servers or platforms.

Thanks for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Run a Docker Container in AWS Lambda",
  "desc": "While containers are quite lightweight and provide various benefits, it can be challenging to decide how best to deploy them. There are a number of ways to deploy and run Docker containers. But some are best for orchestrating and managing containers,...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-a-docker-container-in-aws-lambda.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
