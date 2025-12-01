---
lang: en-US
title: "How to Deploy an AI Agent with Amazon Bedrock AgentCore"
description: "Article(s) > How to Deploy an AI Agent with Amazon Bedrock AgentCore"
icon: fa-brands fa-aws
category:
  - DevOps
  - Amazon
  - AWS
  - AI
  - LLM
  - Amazon Bedrock
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - blog
  - freecodecamp.org
  - devops
  - amazon
  - amazon-web-services
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - bedrock
  - amazon-bedrock
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Deploy an AI Agent with Amazon Bedrock AgentCore"
    - property: og:description
      content: "How to Deploy an AI Agent with Amazon Bedrock AgentCore"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/deploy-an-ai-agent-with-amazon-bedrock.html
prev: /devops/aws/articles/README.md
date: 2025-10-15
isOriginal: false
author:
  - name: Emdadul Islam
    url : https://freecodecamp.org/news/author/emdadulislam/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1760489893067/3f33049f-d17e-4d94-8deb-fa43c65ec753.png
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
  "title": "Amazon Bedrock > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/bedrock/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Deploy an AI Agent with Amazon Bedrock AgentCore"
  desc="Amazon Bedrock AgentCore is a managed service that makes it easier to build, deploy, and operate AI agents securely at scale on AWS. It works seamlessly with frameworks like Strands Agents, LangGraph, CrewAI, and LlamaIndex, while taking care of the ..."
  url="https://freecodecamp.org/news/deploy-an-ai-agent-with-amazon-bedrock"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1760489893067/3f33049f-d17e-4d94-8deb-fa43c65ec753.png"/>

Amazon Bedrock AgentCore is a managed service that makes it easier to build, deploy, and operate AI agents securely at scale on AWS. It works seamlessly with frameworks like Strands Agents, LangGraph, CrewAI, and LlamaIndex, while taking care of the complex tasks such as runtime management, IAM role configuration, and observability.

In this guide, you’ll set up your environment, create and test a simple AI agent locally, deploy it with the AgentCore starter toolkit, and invoke it through the AWS SDK.

::: note Prerequisites

Before you start, make sure you have:

- An AWS account with credentials configured.
- AWS CLI installed and working.
- Python 3.10 or later installed.
- Boto3 installed.
- Model access enabled in the Amazon Bedrock console (for example, Anthropic Claude Sonnet 4.0).

:::

---

## Step 1: Set Up AWS CLI

First, install the AWS CLI if you do not already have it. On Linux or macOS: [<VPIcon icon="fa-brands fa-aws"/>AWS CLI setup guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

Next, [<VPIcon icon="fa-brands fa-aws"/>configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) a profile with AWS SSO:

```sh
aws configure sso --profile my-profile
```

You’ll be prompted to enter details such as:

- **SSO start URL** – the URL for your AWS organization’s IAM Identity Center portal.
- **SSO region** – the AWS region where IAM Identity Center is configured.
- **Account ID** – the AWS account you want to access.
- **Role name** – the IAM role you want to assume within that account.
- **Default region** – the region that will be used when making requests.
- **Default output format** – for example, `json`, `yaml`, or `table`.

This creates a new profile called `my-profile` in your AWS CLI configuration, allowing you to use that identity to interact with AWS services.

Next, you have to verify your identity. Once your profile is configured, confirm that the CLI is correctly authenticating with AWS by running:

```sh
aws sts get-caller-identity --profile my-profile
```

This command returns details about your identity, including:

- **Account** – the AWS account ID you’re authenticated against.
- **UserId** – the unique identifier of your IAM role or user.
- **Arn** – the full Amazon Resource Name (ARN) of your identity.

If the command succeeds and shows your account information, it means your profile is properly set up and ready to use with AWS SDKs, the AWS CLI, or services like Bedrock AgentCore.

---

## Step 2: Install and Create Your Agent

First, you need to set up Python virtual environment. This prevents dependency conflicts with other projects on your machine.

Let’s create and activate a virtual environment:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
python3 -m venv .venv
source .venv/bin/activate
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
python -m venv .venv
.venv\Scripts\activate
```

:::

- `python -m venv .venv` → creates a virtual environment named <VPIcon icon="fas fa-folder-open"/>`.venv` in your project folder.
- `.venv\Scripts\activate` → activates the environment.

Once activated, your terminal prompt will show (.venv) at the beginning. To deactivate:

```sh
deactivate
```

### Create a <VPIcon icon="fas fa-file-lines"/>`requirements.txt` file

List the dependencies your project needs by creating a file named <VPIcon icon="fas fa-file-lines"/>`requirements.txt` in the project root:

```plaintext title="requirements.txt"
bedrock-agentcore
strands-agents
```

This makes it easy to install everything at once with:

```sh
pip install -r requirements.txt
```

Create a file called <VPIcon icon="fa-brands fa-python"/>`my_agent.py` and add the following code:

```py title="my_agent.py"
from bedrock_agentcore import BedrockAgentCoreApp
from strands import Agent

app = BedrockAgentCoreApp()
# Create an agent with default settings
agent = Agent()

@app.entrypoint
def invoke(payload):
    """Your AI agent function"""
    user_message = payload.get("prompt", "Hello! How can I help you today?")
    result = agent(user_message)
    return {"result": result.message}

if __name__ == "__main__":
    app.run()
```

::: info Breaking Down the Code

- `BedrockAgentCoreApp` – the core runtime wrapper that handles configuration, execution, and integration with AWS services.
- `Agent` – a basic agent object from the Strands library that can process and respond to prompts.
- `BedrockAgentCoreApp()` creates the container application that manages your agent’s lifecycle.
- `Agent()` initializes a simple Strands agent with default settings. In a real-world case, you can customize this with specific tools, memory, or reasoning logic.
- The `@app.entrypoint` decorator marks this function as the callable entry point for your agent. Whenever a request is sent to the agent (via the AWS SDK, CLI, or local test), this function is invoked.
- The agent looks for a `"prompt"` in the incoming payload.
- If no prompt is provided, it defaults to `"Hello! How can I help you today?"`.
- The `Agent` object then processes this input and generates a response.

:::

---

## Step 3: Test the Agent Locally

Run the agent:

```sh
python3 -u my_agent.py
```

Open another terminal and send a request:

```sh
curl -X POST http://localhost:8080/invocations \
-H "Content-Type: application/json" \
-d '{"prompt": "Hello!"}'
```

If successful, you will see:

```json
{"result": "Hello! I'm here to help..."}
```

You can stop the agent with <kbd>Ctrl</kbd>+<kbd>C</kbd>.

---

## Step 4: Deploy to AgentCore Runtime

Now you are ready to deploy your agent to AWS.

Configure the agent:

```sh
agentcore configure -e my_agent.py
```

This creates a configuration file called <VPIcon icon="iconfont icon-yaml"/>`bedrock_agentcore.yaml`.

You can launch the deployment with this command:

```sh
agentcore launch
```

The output will include:

- The Amazon Resource Name (ARN) of your agent.
- The location of logs in Amazon CloudWatch.

Test your deployed agent:

```sh
agentcore invoke '{"prompt": "tell me a joke"}'
```

If you get a joke back, your agent is running successfully.

---

## Step 5: Invoke the Agent with AWS SDK

You can call your agent programmatically using Boto3. Create a file called <VPIcon icon="fa-brands fa-python"/>`invoke_agent.py`:

```py title="invoke_agent.py"
import json
import boto3

agent_arn = "YOUR_AGENT_ARN"
prompt = "Tell me a joke"

agent_core_client = boto3.client("bedrock-agentcore")

payload = json.dumps({"prompt": prompt}).encode()

response = agent_core_client.invoke_agent_runtime(
    agentRuntimeArn=agent_arn,
    payload=payload
)

content = []
for chunk in response.get("response", []):
    content.append(chunk.decode("utf-8"))
print(json.loads("".join(content)))
```

Run the script:

```sh
python invoke_agent.py
```

You should see the AI agent’s response.

---

## Step 6: Clean Up

**If you no longer want to run the agent, delete the runtime:**

```sh
aws bedrock-agentcore delete-agent-runtime --agent-runtime-arn <your_arn>
```

### Common Issues

- **Permission denied**: Check your AWS credentials and IAM policies.
- **Docker warning**: Ignore this unless you use — local or — local-build.
- **Model access denied**: Enable model access (such as Claude Sonnet 4.0) in the Bedrock console.
- **Build errors**: Check CloudWatch build logs and IAM policies.

### Conclusion

Amazon Bedrock AgentCore makes it easy to create and deploy AI agents without dealing with complex container setups or infrastructure. You can test locally, launch to the cloud with one command, and monitor everything through CloudWatch.

This workflow is ideal for developers who want to move from prototype to production quickly while staying inside the AWS ecosystem.

::: info Resources

```component VPCard
{
  "title": "Strands Agents",
  "desc": "AI-powered agents for modern workflows",
  "link": "https://strandsagents.com/latest//",
  "logo": "https://strandsagents.com/latest/assets/favicon-dark.png",
  "background": "rgba(0,255,119,0.2)"
}
```

```component VPCard
{
  "title": "Amazon Bedrock AgentCore - AWS",
  "desc": "Agentic platform to build, deploy and operate agents securely at scale - using any framework and model",
  "link": "https://aws.amazon.com/bedrock/agentcore//",
  "logo": "https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico",
  "background": "rgba(22,29,38,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Deploy an AI Agent with Amazon Bedrock AgentCore",
  "desc": "Amazon Bedrock AgentCore is a managed service that makes it easier to build, deploy, and operate AI agents securely at scale on AWS. It works seamlessly with frameworks like Strands Agents, LangGraph, CrewAI, and LlamaIndex, while taking care of the ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/deploy-an-ai-agent-with-amazon-bedrock.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
