---
lang: en-US
title: "How to Securely Deploy APIs to Amazon Lambda – A Practical Guide"
description: "Article(s) > How to Securely Deploy APIs to Amazon Lambda – A Practical Guide"
icon: fa-brands fa-aws
category:
  - DevOps
  - Amazon
  - AWS
  - JavaScript
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - amazon
  - aws
  - amazon-web-services
  - js
  - javascript
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Securely Deploy APIs to Amazon Lambda – A Practical Guide"
    - property: og:description
      content: "How to Securely Deploy APIs to Amazon Lambda – A Practical Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-securely-deploy-apis-to-amazon-lambda-a-practical-guide.html
prev: /devops/aws/articles/README.md
date: 2025-10-10
isOriginal: false
author:
  - name: Agnes Olorundare
    url : https://freecodecamp.org/news/author/Agnes28/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1760051580641/75d09121-6167-4e06-94d7-53cf23a6f6a1.png
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
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
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
  name="How to Securely Deploy APIs to Amazon Lambda – A Practical Guide"
  desc="Cyber attacks against APIs (Application Programming Interfaces) are on the increase. These attacks arise from issues with proper authentication, authorization, unnecessary data exposure, lack of request limits, resource consumption, and use of vulner..."
  url="https://freecodecamp.org/news/how-to-securely-deploy-apis-to-amazon-lambda-a-practical-guide"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1760051580641/75d09121-6167-4e06-94d7-53cf23a6f6a1.png"/>

Cyber attacks against APIs (Application Programming Interfaces) are on the increase. These attacks arise from issues with proper authentication, authorization, unnecessary data exposure, lack of request limits, resource consumption, and use of vulnerable third-party APIs.

Gaps in APIs can occur before requests reach the APIs, within the code housing the APIs, and even along the path of the APIs’ communication with downstream services, dependencies, or other microservices.

Attackers leverage flaws in APIs to gain access to confidential data, harvest or manipulate data, or even make your service unavailable through distributed denial of service attacks.

In this article, you’ll learn to deploy your APIs in Lambda and apply some security measures pre-function, within the function, and post-function.

---

## What is an API?

The focus of this article is the security of Application Programming Interfaces (APIs). An API is an interface that connects two programms or applications, allowing them to exchange data and communicate.

An API can be internal to an organization or it can belong to a third-party that allows other users to consume their data through the API.

::: note Requirements/Prerequisites

While this tutorial is beginner-friendly, you’ll need the following prerequisites to follow along seamlessly:

- A basic knowledge of the AWS Cloud.
- An AWS account with administrator access.
- AWS CLI. You can find the installation guide [<VPIcon icon="fa-brands fa-aws"/>here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html). Follow the instructions for your operating system.
- Python. You can visit Python’s official documentation [<VPIcon icon="fa-brands fa-python"/>site](https://python.org/downloads/) for a guide on how to download and install Python for your specific operating system.
- Pipenv or any Python virtual environment creation tool. You can find the Pipenv installation guide [<VPIcon icon="iconfont icon-pypi"/>here](https://pypi.org/project/pipenv/).
- A basic knowledge of Git.
- An API client, like Postman or Thunderclient.

:::

::: info Project Goal

By the end of this project, you should be able to deploy APIs in Lambda securely, leveraging AWS cloud-native security services.

:::

---

## Project Overall Architecture

Below is the architecture of the project workflow:

![Project Architectural Diagram](https://cdn.hashnode.com/res/hashnode/image/upload/v1758829544078/b76347ee-bbd3-41f4-88c8-2b3a89ad9087.png)

As shown in the architectural diagram, when a user sends a request (a JSON object consisting of the user’s name) to an API hosted in Lambda, the user first gets authenticated by an authentication service called Amazon Cognito.

The request passes through a Web Application Firewall, then an API Gateway. API Gateway will perform a check to see if the user is authorized to access the API using the token that the user sends with the request after authentication. API Gateway then allows the traffic to pass through to the API if the user is authorized.

The user’s request will first get to an External Lambda function, which will then save the user’s name as a message to a Simple Notification Service (SNS) topic. This will then invoke an Internal Lambda to run and log the output in Amazon CloudWatch logs. The SNS topic will be accessed by External Lambda using the SNS’s unique identifier stored in Amazon Secrets Manager.

### AWS Set Up

You’ll need to set up an AWS environment to get started. This requires creating an account if you don’t already have one.

Following account creation, a root user is automatically created, with all privileges attached to the user. Security best practice is to create another user with administrator privileges and use this user for subsequent tasks.

Then, create an access key for this user, which usually consists of two parts (Access Key ID and Secret Access Key) by navigating to the following:

```
IAM —→ Users —→ Create Access key
```
<!-- TODO: mermaid화 -->

Follow the prompts and choose the `Command Line Interface` option. Check the `Confirmation` box, and go on to create the key. Download the CSV file provided, or manually copy the `Access Key ID` and `Secret Access Key`. Save them securely.

![IAM Dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1758890397608/a88ec1c6-511c-4a66-aa7a-d0dd3f41f665.png)

![IAM User Page](https://cdn.hashnode.com/res/hashnode/image/upload/v1758890497481/faab2cb7-b7ba-4e5c-b67e-a00d8fb27a10.png)

![Create Access Key Page](https://cdn.hashnode.com/res/hashnode/image/upload/v1758890928429/1a4b3163-6340-47d2-be3e-0e61c275ba8f.png)

![Access Key Use Option Page](https://cdn.hashnode.com/res/hashnode/image/upload/v1758890991928/5bb150b6-b014-4398-b839-ee5d6e49c425.png)

![Set Access Key Tag Page](https://cdn.hashnode.com/res/hashnode/image/upload/v1758891021874/a2e4eb61-eaca-4732-9377-b499fa7eab5d.png)

![Download Access Key](https://cdn.hashnode.com/res/hashnode/image/upload/v1758891049362/372f3a63-8e64-478d-9b06-61f7aa88f73a.png)

Open up your terminal and run the following commands using the AWS CLI:

```sh
aws configure
```

The above command will give some prompts to provide the components of the `Access Key` created earlier and your default region (the AWS region hosting the service you intend to interact with).

### Clone Project

In the next step, you’ll clone the GitHub repository containing the assets and resources used in the project implementation.

Visit the project [URL (<VPIcon icon="iconfont icon-github"/>`Agnes4Him/secure-lambda`)](https://github.com/Agnes4Him/secure-lambda) and clone the repository locally.

```sh
git clone <repository_clone_url>
```

### Set Up Simple Notification Service

Amazon Simple Notification Service (SNS) connects system components, enabling asynchronous communication and messaging among them.

Find `SNS` on the console, click on it, and create a topic that your APIs will send messages to. After successfully creating a topic, navigate to the topic, and in the topic details, you’ll find the topic’s `ARN`. An ARN is an Amazon Resource Name, and it’s a unique string attached to a resource you’ve created on AWS to help identify the resource. Copy the `ARN` of the topic.

![SNS Dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1758983690093/a2820581-46fb-41d1-aed9-9471a0c2db02.png)

![Create SNS Topic](https://cdn.hashnode.com/res/hashnode/image/upload/v1758982964553/3eb717c7-8ce3-497b-96fb-c16483cff43e.png)

![Topic Details](https://cdn.hashnode.com/res/hashnode/image/upload/v1758983004729/854335ec-3d53-42e4-8bef-0e8a7d3fb2e6.png)

![SNS Topic Access Policy](https://cdn.hashnode.com/res/hashnode/image/upload/v1758983094356/320ebaf9-9f2d-4241-b747-fd3fd0f0b62b.png)

![Topic Created](https://cdn.hashnode.com/res/hashnode/image/upload/v1758983451385/7886c2c4-a52f-4538-8e9d-0d33738f7632.png)

### Set Up Secrets Manager

Amazon Secrets Manager is used to store, manage, and retrieve sensitive information such as keys, credentials, tokens, and so on. You’ll store the `Topic ARN` created earlier. With this approach, you’ll demonstrate how your API can securely access the data and information it needs for its performance.

Go to `Secrets Manager` on the AWS console and create a secret. Provide the secret’s details, and add a new secret named `TOPIC_ARN` as the key and the actual SNS Topic ARN as the value.

![Secrets Manager Console](https://cdn.hashnode.com/res/hashnode/image/upload/v1758984342157/38c7855c-2221-4406-9078-496cbb480e47.png)

![Create Secret](https://cdn.hashnode.com/res/hashnode/image/upload/v1758984379959/3c4ebdf7-26c8-4b74-a175-0ea2eefd258d.png)

![Choose Other Types of Secret](https://cdn.hashnode.com/res/hashnode/image/upload/v1758984459477/cfdd8fce-4a33-45c3-8f12-d6a4a04bf799.png)

![Secret Details](https://cdn.hashnode.com/res/hashnode/image/upload/v1758984512368/7a76618e-18f6-4b3d-bc03-5941c89909ef.png)

![Final Secret Store](https://cdn.hashnode.com/res/hashnode/image/upload/v1758984575543/91ca9360-6320-442a-a121-37f9f35b175b.png)

Next, you’ll create some Lambda functions to serve your APIs and consume the output of the APIs. There’re three Lambda functions to set up. Two of the functions will host APIs, each of which can only be accessed by specific users. These will be referred to as `ExternalLambda`. The third Lambda will consume the output of the External Lambda functions through SNS.

### Set Up Internal Lambda

AWS Lambda is a serverless service on AWS that users can leverage to run application functions or code when needed. You’re billed for your Lambda function based on the number of invocations of the function, the duration each invocation lasted, and the amount of memory allocated to the function. Lambda can be provisioned to use any runtime, such as Python or NodeJS. In this demonstration, you’ll focus on the NodeJS runtime.

Now that you know what Lambda is and does, you can create one. Let’s call the first Lambda function InternalLambda. On the AWS console, search for `Lambda`, and on the `Lambda` dashboard, click `Create a function` and provide the details. We’ll be using `Node.js` – JavaScript at the backend as the runtime of choice.

![AWS Lambda](https://cdn.hashnode.com/res/hashnode/image/upload/v1759140048151/60d5c813-a190-456e-9bad-50b429bdc6f7.png)

![Lambda Details](https://cdn.hashnode.com/res/hashnode/image/upload/v1759140165012/d519f8e9-cb98-4f75-b94e-d4d343e3003c.png)

For the `Permissions` details, let Lambda create a default `IAM Role`. This default role is named according to your function, and the permissions attached to the role allow your Lambda function to send logs to CloudWatch, another AWS service used for monitoring and observability.

![Lambda Permissions](https://cdn.hashnode.com/res/hashnode/image/upload/v1759140368576/3f922a46-7b3c-4034-b20b-c2b9ab5dde94.png)

![39d50020-d0bf-4cfe-950f-eec8a2ff8989](https://cdn.hashnode.com/res/hashnode/image/upload/v1759146593382/39d50020-d0bf-4cfe-950f-eec8a2ff8989.png)

As you can see in the last image above, the Lambda function you’ve created needs a `trigger` and sometimes, a `destination`. For your `InternalLambda`, the trigger is the SNS topic we configured earlier. This Lambda will read the messages that’ve been published to it, and then you can access the message from your client or even CloudWatch logs.

To achieve this, click the `Add trigger` button and provide the details.

![Add SNS to Lambda](https://cdn.hashnode.com/res/hashnode/image/upload/v1759140925997/2534535f-5ad3-4e13-99f1-d8bf48c9cec1.png)

![SNS ARN](https://cdn.hashnode.com/res/hashnode/image/upload/v1759146639798/1f3d75c9-ef5d-4538-9f3a-aaf2e8c0ddbb.png)

![InternalLambda Overview](https://cdn.hashnode.com/res/hashnode/image/upload/v1759146670136/367f7ca9-0b41-41ed-8749-ff70e1770ebb.png)

Next, you’ll provide the `code` you want to invoke through Lambda. Find the code in the GitHub repository that you cloned earlier. Paste the code in the Lambda function code space and click on `Deploy` to deploy the function.

```js title="secure-lambda/InternalLambda/index.js"
export const handler = async (event) => {
  try {
    console.log('Request successfully received from SNS');

    let name = event['Records'][0]['Sns']['Message'];
    let response = {
      statusCode: 200,
      body: JSON.stringify(`Hello ${name}. Greetings from InternalLambda!`),
    };       
    console.log('Response: ', response);                                                
    return response;
  } catch (err) {                            
    let response = {
      statusCode: 500,
      body: JSON.stringify('An error occurred while processing your request.'),
    };

    console.error('Error processing event', err);
    return response;
  }   
};
```

The function defined in the index.js file above is simply taking the `event` object sent to it from SNS and extracting the `Message` attribute within it. We’re using `console.log` here to view outputs from the function and ensure it behaves as expected. Just don’t use this in a production-ready application.

![InternalLambda Code](https://cdn.hashnode.com/res/hashnode/image/upload/v1759142277747/f4437ff2-4495-485d-b891-d9dda3fc939c.png)

### Set Up External Lambda

You’ll be creating two external Lambda functions: 1 and 2. These two functions will receive user requests, process them, and publish messages to your SNS topic.

On the Lambda console, create another function and name it `ExternalLambda1`. Allow Lambda to create a default IAM Role, as previously.

![Create `ExternalLambda1`](https://cdn.hashnode.com/res/hashnode/image/upload/v1759144966306/ee8a2ed1-5a2e-48df-8556-5dedd7ecdde1.png)

![ExternalLambda1 Overview](https://cdn.hashnode.com/res/hashnode/image/upload/v1759146732803/82a46fd1-e3e5-4d72-a9fe-b41496ba076b.png)

Paste the code snippet below in the `ExternalLambda1` code space:

```js :collapsed-lines title="secure-lambda/ExternalLambda1/index.js"
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

import { SNSClient, 
  PublishCommand 
} from "@aws-sdk/client-sns";

const secretsManagerClient = new SecretsManagerClient();

const snsClient = new SNSClient({});

// Fetch topicArn from AWS Secrets Manager
async function getSecretValue(secretName) {
  try {
    const data = await secretsManagerClient.send(
      new GetSecretValueCommand({
        SecretId: secretName,
      }),
    );
    if (data.SecretString) {
      return JSON.parse(data.SecretString);
    } else {
      let buff = Buffer.from(data.SecretBinary, 'base64');
      return JSON.parse(buff.toString("utf-8"));
    }
  } catch (err) {
    console.error('Error retrieving secret', err); // added for debugging
    throw err;
  }
}

export const handler = async (event) => {
  let name = event['name'];
  console.log(`Request successfully received from ${name}`);

  // Retrieve SNS Topic ARN from Secrets Manager
  let topicArn;
  let response;
  try {
    const secret = await getSecretValue('LambdaSNSTopicARN');
    topicArn = secret.TOPIC_ARN;
  } catch (err) {
    response = {
      statusCode: 500,
      body: JSON.stringify('An error occured, try again later.'),
    };
    console.error('Failed to load SNS Topic ARN from Secrets Manager', err);
    return response;        
  }

  // Publish to SNS topic
  try {
    const snsResponse = await snsClient.send(
      new PublishCommand({
        Message: name,
        TopicArn: topicArn,
      })
    );
    console.log("Message published successfully:", snsResponse.MessageId);
    response = {
        statusCode: 200,
        body: JSON.stringify(`Hello ${name}. Greetings from `ExternalLambda1`! Message forwarded to InternalLambda.`),
    };
    return response;
  } catch (err) {
    response = {
      statusCode: 500,
      body: JSON.stringify(`Sorry ${name}.An error occurred while processing your request.`),
    };
    console.error("Failed to publish message:", err);
    return response;
  }  
};
```

The code above leverages the AWS SDK to fetch the ARN of the SNS topic created earlier from Secrets Manager. It then publishes a message to the topic.

The SDK already comes installed in the Lambda function. Outside of Lambda, the SDK has to be explicitly installed. The function receives its `event` from the client via API Gateway, which we’ll configure later.

The SNS topic you created earlier will be the destination for this function. For Lambda to publish a topic to SNS, it needs the necessary permission attached to its IAM Role. AWS can automatically take care of that during your configuration, as shown below.

For the trigger, you’ll use another service known as `API Gateway`. More on that later.

![ExternalLambda1 Add Destination](https://cdn.hashnode.com/res/hashnode/image/upload/v1759146816330/3c542eff-984e-4d02-85b3-c1da142f94d7.png)

![ExternalLambda1 Destination Permissions](https://cdn.hashnode.com/res/hashnode/image/upload/v1759146778567/9b3650f1-90fd-47ce-99c3-627654f2d41f.png)

Follow the same steps to provision another Lambda known as `ExternalLambda2`.

![ExternalLambda2](https://cdn.hashnode.com/res/hashnode/image/upload/v1759145915181/631aa639-493a-4f12-af1e-45f425ca2c16.png)

The outcome of the External Lambda setup is as shown below:

![ExternalLambda2 Overview](https://cdn.hashnode.com/res/hashnode/image/upload/v1759146919917/93aaf281-387f-44c3-bf6d-995b076150e9.png)

Paste the code below into `ExternalLambda2`. It performs the same function as `ExternalLambda1`, but their output differ. Each of the two Lambda functions will be receiving traffic to a specific user that’s authorized to access the function.

```js :collapsed-lines title="secure-lambda/ExternalLambda2/index.js"
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

import { SNSClient, 
  PublishCommand 
} from "@aws-sdk/client-sns";

const secretsManagerClient = new SecretsManagerClient();

const snsClient = new SNSClient({});

// Fetch topicArn from AWS Secrets Manager
async function getSecretValue(secretName) {
  try {
    const data = await secretsManagerClient.send(
      new GetSecretValueCommand({
        SecretId: secretName,
      }),
    );
    if (data.SecretString) {
      return JSON.parse(data.SecretString);
    } else {
      let buff = Buffer.from(data.SecretBinary, 'base64');
      return JSON.parse(buff.toString("utf-8"));
    }
  } catch (err) {
    console.error('Error retrieving secret', err);  
    throw err;
  }
}

export const handler = async (event) => {
  let name = event['name'];
  console.log(`Request successfully received from ${name}`);

  // Retrieve SNS Topic ARN from Secrets Manager
  let topicArn;
  let response;
  try {
    const secret = await getSecretValue('LambdaSNSTopicARN');
    topicArn = secret.TOPIC_ARN;
  } catch (err) {
    response = {
      statusCode: 500,
      body: JSON.stringify('An error occured, try again later.'),
    };
    console.error('Failed to load SNS Topic ARN from Secrets Manager', err);
    return response;        
  }

  // Publish to SNS topic
  try {
    const snsResponse = await snsClient.send(
      new PublishCommand({
        Message: name,
        TopicArn: topicArn,
      })
    );
    console.log("Message published successfully:", snsResponse.MessageId);
    response = {
      statusCode: 200,
      body: JSON.stringify(`Hello ${name}. Greetings from ExternalLambda2! Message forwarded to InternalLambda.`),
    };
    return response;
  } catch (err) {
    response = {
      statusCode: 500,
      body: JSON.stringify(`Sorry ${name}.An error occurred while processing your request.`),
    };
    console.error("Failed to publish message:", err);
    return response;
  }              
};
```

Before moving on, you need to modify the External Lambda’s IAM Roles. Currently, IAM Roles only have permissions to write to CloudWatch and SNS (automatically added). External Lambda also needs permission to fetch the ARN of the SNS topic that was created earlier.

The point here is to show how to leverage a secrets manager, such as AWS Secrets Manager, to store sensitive information or data, and still access these securely. This approach is more secure than storing the ARN as an environment variable within Lambda.

Navigate to IAM, and click on `Policies` tab on the left. This brings you to a list of policies. Next, click on `Create policy`.

![IAM Policies](https://cdn.hashnode.com/res/hashnode/image/upload/v1759320098124/71bde9ad-c6d9-4c0d-8472-d56107708be2.png)

Search for `secrets manager` in the Policy editor.

![Policy Editor](https://cdn.hashnode.com/res/hashnode/image/upload/v1759320163875/a040af9a-1e92-4aea-8c2e-5c029f60f54e.png)

![Policy Editor2](https://cdn.hashnode.com/res/hashnode/image/upload/v1759320923537/c3e8bb54-e78d-498c-9fec-7c7a5225b116.png)

Select the permissions Lambda needs to access Secrets Manager. In this case, that would be `Read —> GetSecretValue`.

![Policy Editor - Specify Permissions](https://cdn.hashnode.com/res/hashnode/image/upload/v1759321060458/963c1876-dbcc-4d7d-a6fe-9f65281c1a26.png)

Select `Specific` for Resources, and click on `Add ARNs`. On the next tab, add the details of the Secrets Manager Secret created earlier.

![Policy Editor - Select Access](https://cdn.hashnode.com/res/hashnode/image/upload/v1759321219657/f50fc354-a238-499c-9009-958bbc624299.png)

The Secret’s ARN will be populated here.

![Policy Editor - Add Secrets Manager ARN](https://cdn.hashnode.com/res/hashnode/image/upload/v1759321662642/356fb6bd-adc7-4663-a337-3cfaedb74b2d.png)

Next, give the policy a name and create it.

![Policy Editor - Create Policy](https://cdn.hashnode.com/res/hashnode/image/upload/v1759321510186/fa5da448-293f-4d95-a3b5-651292a91a7f.png)

![Newly Added Policy](https://cdn.hashnode.com/res/hashnode/image/upload/v1759321721882/27807dda-8ea3-4489-bcab-d03efc201655.png)

Next, navigate to `Roles`, and search for the IAM Roles assigned to the External Lambda functions. These are named according to the Lambda.

![IAM Roles](https://cdn.hashnode.com/res/hashnode/image/upload/v1759321748368/dfc73acb-622c-44f9-9cf8-be51b31e3fe9.png)

![Lambda IAM Roles](https://cdn.hashnode.com/res/hashnode/image/upload/v1759321856410/f1d4a13c-a568-4c9c-b14f-bb3d24b870f8.png)

Click `Add permissions` to add a new permission to the IAM Role selected.

![ExternalLambda1 Role](https://cdn.hashnode.com/res/hashnode/image/upload/v1759322020293/689715ef-7e8c-45cb-9473-010f5aa105fa.png)

![ExternalLambda1 Role - Policy Added](https://cdn.hashnode.com/res/hashnode/image/upload/v1759322453532/83996cca-7a05-48fb-8e31-d3fc679df7bc.png)

![ExternalLambda2 Role](https://cdn.hashnode.com/res/hashnode/image/upload/v1759322498243/29a8fff5-af9a-4d4c-b3ff-3790b82b6339.png)

![ExternalLambda2 Role - Policy Added](https://cdn.hashnode.com/res/hashnode/image/upload/v1759322570298/ab28750d-eb99-40f3-bf48-936b63bba1f0.png)

### Configure Web Application Firewall

A firewall is a system placed in front of an application, workload, APIs, and so on to inspect traffic, filter it, and either allow or block the traffic based on some preconfigured rules.

For this project, you’ll use the AWS Web Application Firewall (WAF) service to inspect user requests before routing the traffic to your APIs running in Lambda.

Head over to the AWS console and search for WAF.

![AWS Web Application Firewall](https://cdn.hashnode.com/res/hashnode/image/upload/v1759310730367/bbcbdf00-2759-4dd7-9b7b-63ee9c252542.png)

Click on the `IP sets` tab on the left. This will enable you to create a list of IP addresses that you want to allow (as in this case) or deny.

![IP Sets Page](https://cdn.hashnode.com/res/hashnode/image/upload/v1759311298551/4537577d-a574-417e-8352-3f72b3732926.png)

![IP Set Configuration](https://cdn.hashnode.com/res/hashnode/image/upload/v1759311354043/edd29c9c-63e7-4bf6-a503-23ef0af5ac20.png)

The IP addresses should include a CIDR block. For instance, if adding a single IP address, it should be `X.X.X.X/32`. The same applies to IP address ranges such as `X.X.X.X/24`.

![IP Set Overview](https://cdn.hashnode.com/res/hashnode/image/upload/v1759311560565/0ad16e51-b70b-4a80-98f4-821659fa61b8.png)

Next, click on the `Web ACLs` tab, then `Create web ACL`.

![Web ACL Page](https://cdn.hashnode.com/res/hashnode/image/upload/v1759311623780/9742ab87-3303-4046-84df-f9f770ed7c41.png)

Choose `Regional resources` as the Resource type, and enter your region. It’s best to keep all resources you’re creating in this project within the same region. Give your Web ACL a name, then click next.

![Web ACL Description](https://cdn.hashnode.com/res/hashnode/image/upload/v1759311736091/b4201885-2dc0-4ed8-aa38-5e25824c363b.png)

Add rules to the Web ACL.

![WAF Rule](https://cdn.hashnode.com/res/hashnode/image/upload/v1759311892739/5efad662-6c20-4678-b490-54fa33bc3a7b.png)

![Add Rule](https://cdn.hashnode.com/res/hashnode/image/upload/v1759311985197/9e7157c8-bfb4-47a9-a850-67ce8bb302b2.png)

Choose a rule type. In this case, you’ll use `IP set`, and give the rule a name. Choose the IP set created earlier.

Select `Source IP address`, and `Count` as the Action. For this project, you’ll focus on counting the requests sent to your APIs. But as shown in the image below, you can perform other actions, such as allow, block, and so on.

![WAF Rule Configuration](https://cdn.hashnode.com/res/hashnode/image/upload/v1759312925911/ea491527-970c-4b5f-b658-4345ce3d08e4.png)

Your final rule configuration will appear this way.

![WAF Rule Overview](https://cdn.hashnode.com/res/hashnode/image/upload/v1759313133810/8e1be6d3-f6bf-42d9-881d-87216862b3bd.png)

Scroll down, then click on `Create web ACL`.

![Create Rule](https://cdn.hashnode.com/res/hashnode/image/upload/v1759313210947/d625c4f3-a5a3-47c9-961f-ca67f652c992.png)

![Web ACL Dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1759313261493/3bd16ec5-3376-4607-86cc-fd1716ad68aa.png)

### Configure Cognito User Pools

Amazon Cognito is an identity management service used for creating and managing users. You can leverage it to authenticate and authorize users to applications, APIs, or other workloads.

You’ll create `User Pools` within Cognito and add a user to each pool. You’ll configure how these users can be authenticated and authorized to access the External Lambda functions already created.

Search for `Cognito` on AWS.

![Amazon Cognito](https://cdn.hashnode.com/res/hashnode/image/upload/v1759315681568/c2e7df4e-0e51-4c03-bf59-41ca895df74d.png)

Click on `Get started for free`, then `Create user pool`.

![Create User Pool](https://cdn.hashnode.com/res/hashnode/image/upload/v1759315735324/1c09e934-186f-49db-811f-dd84d7400285.png)

Select Single-page application (SPA), give the User pool the name `MyUserPool1`, and select `Email` as an option for sign-in. This means the main attribute users will provide at signup and sign-in will be their email address. Leave everything else as the default. We’ll keep things as simple as possible.

![Use Pool Configuration](https://cdn.hashnode.com/res/hashnode/image/upload/v1759315828576/73cb66a3-cbde-4443-8dfd-34338091aabc.png)

![User Pool Configuration2](https://cdn.hashnode.com/res/hashnode/image/upload/v1759315901551/9fdc173d-f92b-4080-98d4-513b404a9aeb.png)

![User Pool Configuration3](https://cdn.hashnode.com/res/hashnode/image/upload/v1759315994247/3fb17ade-90aa-4d47-b2f9-258f6b547a1f.png)

After creating the User pool, you’ll find the page shown below. You can view the login and signup page for the pool you’ve just created by clicking on the `View login page` button.

![Cognito App Client Login URL](https://cdn.hashnode.com/res/hashnode/image/upload/v1759316208497/4db5f370-deb2-449e-8017-505dc1e13079.png)

You can add `App clients` to your User Pool. By default, a client named `MyUserPool1` will be added to the pool. Navigate to your User pool, and click on `App clients` to see details of this client. Note the `Client ID`. You’ll also make some edits to the App client by clicking on the `Edit` button.

![User Pool App Client Overview](https://cdn.hashnode.com/res/hashnode/image/upload/v1759316443170/58081c40-cdcb-4af9-a60b-79156f6d2d68.png)

You’ll edit the `Authentication flows` field by ticking the `Sign in with username and password…` and `Sign in with server-side administrative credentials…` boxes. These changes will enable you to authenticate the user who will be added to this client programmatically, rather than through a UI. With this approach, we can fetch the token assigned to the user by Cognito and use this token to authorize access to Lambda.

![Edit App Client](https://cdn.hashnode.com/res/hashnode/image/upload/v1759317429341/f8db3816-c603-49fe-b661-696bfff98639.png)

Now, add a user to this pool. The user needs a valid email address. You’ll need the login page URL to create the user.

![Cognito Create New User](https://cdn.hashnode.com/res/hashnode/image/upload/v1759318555729/d9a8ac0c-72d4-4fca-8a94-ff71a5a20caf.png)

You need access to the email used to create the user. Fetch the code sent to the email address and submit to confirm the account.

![Cognito Confirm Email](https://cdn.hashnode.com/res/hashnode/image/upload/v1759318672240/42d4418d-a4e1-4af9-b8b5-deaf5fb63118.png)

![Cognito Successful Sign up](https://cdn.hashnode.com/res/hashnode/image/upload/v1759318710760/4505260f-13c9-4b3b-af99-1cb9e7436147.png)

![User Pool Users](https://cdn.hashnode.com/res/hashnode/image/upload/v1759318734000/1b3789d9-917a-4341-84ef-b8e498628557.png)

Follow the same steps and create another User pool named `MyUserPool2`. Add a user with a different email to this pool.

### Configure API Gateway

API Gateway is a service used to manage access and route traffic to API backend services such as APIs. It serves as a reverse proxy and provides an extra layer of security for backend services.

You’ll configure API Gateway to direct traffic to your Lambda functions.

Navigate to `API Gateway` and click on `Create an API`.

![API Gateway](https://cdn.hashnode.com/res/hashnode/image/upload/v1759336384538/0e2e4120-ade3-43c3-8a3e-9ec4d0e2b343.png)

Select the `REST API` option —→ `Build`.

![Select API Type](https://cdn.hashnode.com/res/hashnode/image/upload/v1759336533762/56d96fcb-ff27-4f96-b739-fc9658dca50e.png)

Select `New API`, provide a name, and choose `Regional` as the API endpoint type. IP address type can be IPv4 or Dualstack. We’ll select IPv4 here. Then create.

![API Gateway Configuration](https://cdn.hashnode.com/res/hashnode/image/upload/v1759336585590/ff2b11c2-cb32-4657-913e-6dfc9922531f.png)

An important part of API Gateway configuration for this project is the Authorizer. API Gateway uses Authorizer to allow traffic from clients to backend services.

You’ll create two Authorizers. Each will be connected to one of the User pools you configured earlier. On the left-hand side of the API Gateway you configured, click on `Authorizers` —→ `Create authorizer`.

![API Gateway Authorizer](https://cdn.hashnode.com/res/hashnode/image/upload/v1759336744757/bb00a260-3897-4867-96d3-5370e40eae59.png)

Provide the name `AGAuthorizer1`, and select `Cognito` as the Authorizer type. Add the User pool for MyUserPool1 created earlier. For the Token source, use `Authorization`. When you send a request from your API client, a token will be added to the request header for authorization. The token’s key will be named `Authorization`, while the value will be the token itself.

![Authorizer1 Configuration](https://cdn.hashnode.com/res/hashnode/image/upload/v1759337066816/1ef4b11c-3508-49a5-ae7b-561b4c7f4259.png)

Create another Authorization for MyUserPool2 the same way.

![Authorizer2 Configuration](https://cdn.hashnode.com/res/hashnode/image/upload/v1759337472200/aacad54f-8927-4c3e-9a60-f207bbf45577.png)

Both Authorizers will appear this way.

![Authorizers Overview](https://cdn.hashnode.com/res/hashnode/image/upload/v1759337540381/56362d9c-7f84-4021-b077-59992abd979b.png)

Next, you’ll create resources and endpoints within the API Gateway that you’ve defined.

A `resource` in API Gateway is used to group certain endpoints within a specific path. You’ll define two resources within the API Gateway you’ve created. This will create two different paths, `<BASE_URL>/<RESOURCE1>` and `<BASE_URL>/<RESOURCE2>`.

On the API Gateway dashboard, navigate to your Gateway, click on `Create resource`, define your root path (‘/’ in your case), and provide the resource name (`lambda1`).

![API Gateway Lambda1 Resource](https://cdn.hashnode.com/res/hashnode/image/upload/v1759420480646/c6e7c1c9-9eee-4dbf-af5b-8c335e14927c.png)

Create another resource named `lambda2`.

![API Gateway Resources Overview](https://cdn.hashnode.com/res/hashnode/image/upload/v1759420822042/74d1790e-c752-490c-883f-b42bd00d91eb.png)

Now, click on `/lambda1`, then `Create method` to define an endpoint within this resource. You’ll use the `POST` method to send requests to the backend service via this endpoint.

![API Gateway Method Configuration](https://cdn.hashnode.com/res/hashnode/image/upload/v1759420769955/bd861a6a-884d-4873-aaeb-dc958a0915b1.png)

For the backend service or Integration type, select Lambda function, and provide the ARN of `ExternalLambda1`. ![API Gateway Method Configuration2](https://cdn.hashnode.com/res/hashnode/image/upload/v1759421208532/8d84c272-58ad-4ca4-ae56-682151495b76.png)

For Authorization, select `AWS IAM —→ Cognito user pool authorizers —→ AGAuthorizer1`. Leave other configurations, then create the endpoint.

![API Gateway Method Configuration3](https://cdn.hashnode.com/res/hashnode/image/upload/v1759421234684/1e76c46e-ba07-4178-94b3-e579ed752278.png)

Repeat the same step to create a `POST` method for `/lambda2` resource. The `method` should be attached to `ExternalLambda2`, and `AGAuthorizer2`.

![API Gateway Deployment](https://cdn.hashnode.com/res/hashnode/image/upload/v1759421691530/563c85e5-52ff-43fa-8216-41fc269989e0.png)

The API Gateway you’ve created needs to be deployed to become accessible. Deployment is usually done to a Stage.

Click on `Deploy API`, select New stage and name the stage development. Then, deploy.

![API Gateway Stage](https://cdn.hashnode.com/res/hashnode/image/upload/v1759421954217/f0ca31c8-78d9-4b1b-a47c-424f6ef32093.png)

After deployment to a stage, an invoke URL will be provided. This will serve as the base URL for the endpoints you’ve defined.

![API Gateway Stage Overview](https://cdn.hashnode.com/res/hashnode/image/upload/v1759422031311/c7cac4e7-52e9-43dd-a565-46aa062aa364.png)

The stage you’ve created needs some modifications for enhanced security. Firstly, you need to attach the `WAF` that you created earlier. Secondly, the default rate limit for the API deployed to this stage is 10000. Rate limit restricts excessive resource consumption and protects your API from abuse. For this project, you can reduce the limit to 50. 

![Edit API Gateway Stage](https://cdn.hashnode.com/res/hashnode/image/upload/v1759422132101/b0f67d30-30ec-4d1f-9eee-735dc3b26500.png)

![API Gateway Stage - Add Rate Limit and WAF](https://cdn.hashnode.com/res/hashnode/image/upload/v1759423441047/95dc8f74-c71d-449a-b15a-46caa53c7595.png)

To test the API Gateway set up, click on the endpoint you want to test, then the `Test` button. This initial test doesn’t need any authorization, since the test is done directly within the Gateway.

![API Gateway Endpoint Testing](https://cdn.hashnode.com/res/hashnode/image/upload/v1759435394293/8933349c-3e2a-4795-adb4-bb9eeb990e81.png)

Add JSON data as the Request body. The key will be `name`, and the value will be any string.

![API Gateway Testing2](https://cdn.hashnode.com/res/hashnode/image/upload/v1759435424778/a613816e-8b89-4978-9b3e-6734e48119eb.png)

The response sent back from `ExternalLambda1` shows a status code of 200, and a response body containing exactly the message expected from the Lambda function.

![API Gateway Test Response](https://cdn.hashnode.com/res/hashnode/image/upload/v1759435744694/516bab58-99de-4b41-8926-e9928b8c42e4.png)

If you head over to CloudWatch Log groups, you should also find the Log groups that were automatically created for the Lambda functions. Click on the Log group for `ExternalLambda1` and navigate to the latest Log stream. You should find the logs for the request you’ve just made from API Gateway.

![CloudWatch Logs for Testing](https://cdn.hashnode.com/res/hashnode/image/upload/v1759435884121/05741f0c-82dd-43f1-855c-157df5c112fc.png)

![CloudWatch Logs for Testing2](https://cdn.hashnode.com/res/hashnode/image/upload/v1759436073425/d4a0a2c7-8d86-44ce-adb7-4c67c3cdf40b.png)

![CloudWatch Logs - Output from InternalLambda](https://cdn.hashnode.com/res/hashnode/image/upload/v1759436150374/5fae1a11-c80d-41df-8ea9-39303287144b.png)

### Test Setup End-to-End

To test our setup properly, and from the internet, send the same request from your API client with no additional information in the request header. This should return a `401` error – Unauthorized. This is expected.

![Request without Token](https://cdn.hashnode.com/res/hashnode/image/upload/v1759436452961/342e7659-5a58-45a2-af26-a657b622a83a.png)

API Gateway expects an authorization token from each request it receives before routing traffic to the appropriate backend service. It validates this token through Cognito.

You’ll mimic a user login for each user added to Coginito User pools to get a token for the user. This token will then be sent alongside any request. To achieve this, you’ll use the two Python scripts I’ve provided below:

```py title="secure-lambda/auth-scripts/user1.py"
import boto3

client = boto3.client("cognito-idp")

response = client.initiate_auth(
    AuthFlow="USER_PASSWORD_AUTH",  # or ADMIN_USER_PASSWORD_AUTH if using admin creds
    AuthParameters={
        "USERNAME": "",             # user1 email
        "PASSWORD": ""              # user1 password
    },
    ClientId=""                     # Cognito App Client ID
)

id_token = response["AuthenticationResult"]["IdToken"]
access_token = response["AuthenticationResult"]["AccessToken"]
refresh_token = response["AuthenticationResult"]["RefreshToken"]

print("ID Token:", id_token)
```

Using the Python boto3 library, you’ll initiate an authentication request to Cognito. Provide the email address and password of the user in MyUserPool1. Also, add the Client ID of the App client.

To run the script, create an isolated environment using Pipenv, uv, or a similar library. Install the dependency used in the project as defined in the Pipfile, and run the script with the Pipenv shell.

```sh
pipenv install
pipenv shell
Python secure-lambda/auth-scripts/user1.py
```

The Python command will return with a token assigned to the user. Next, you use this token to authorize a user to access `ExternalLambda1`.
![Add Token to Request Header](https://cdn.hashnode.com/res/hashnode/image/upload/v1759437804885/f03ab150-74f9-4ecf-9c7c-0ee07e8662a2.png)

Ensure that the URL for the POST request is in the format: `<BASE_URL>/<lambda1>`. You should receive a response from API Gateway indicating success.

Now try accessing ExternalLambda2 using User1 token. You should get an `Unauthorized` message. Note that user1 will always receive an unauthorized message when it tries accessing `ExternalLambda1` without an Authorization token in the header, a wrong token, or when it tries accessing ExternalLambda2, which it is not authorized to access.

![User1 Access ExternalLambda2](https://cdn.hashnode.com/res/hashnode/image/upload/v1759438020972/39e2650a-6a99-466a-ad40-6bcf72c491c4.png)

Repeat the process with `User2` using the token generated for the user in MyUserPool2. First, test access to ExternalLambda2 without a token in the request header.

![User2 Request without Token](https://cdn.hashnode.com/res/hashnode/image/upload/v1759438058029/37dbffcb-7f58-4ce0-abfa-abf0e6d1d3a4.png)

Then test access with the token.

![User2 Request with Token](https://cdn.hashnode.com/res/hashnode/image/upload/v1759438118097/a408bfe0-6e94-46a1-b98e-c959f31673f8.png)

Next, try accessing `ExternalLambda1` using `User2`.

![User2 Access `ExternalLambda1`](https://cdn.hashnode.com/res/hashnode/image/upload/v1759438144636/06ba905d-ff7b-48d6-8e5b-e35b959221ba.png)

You can also view the outcome of some of the requests made by your client on CloudWatch Logs.

![CloudWatch Logs Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1759438188476/2e5aaa35-b52c-4fd3-88f4-00bc704cd809.png)

![CloudWatch Logs Output2](https://cdn.hashnode.com/res/hashnode/image/upload/v1759438223720/630bd443-41d2-40b7-b28f-ff937fbf13f9.png)

Also, since WAF has been configured previously to count requests (although, in a real scenario, you want to achieve much more with WAF, such as allow or block certain traffic), you can view activities captured by WAF by navigating to the service on AWS, then searching for the WAF you configured, and navigating to Traffic overview.

![WAF - Traffic details](https://cdn.hashnode.com/res/hashnode/image/upload/v1759438469300/df718ef7-7eaa-49ad-8780-c43878d2d388.png)

![WAF - Traffic Details2](https://cdn.hashnode.com/res/hashnode/image/upload/v1759438498828/b1619abf-db45-4946-85e2-53e5a769cdb8.png)

You can find other details, such as the client device types and where requests originated.

![WAF - Traffic Details3](https://cdn.hashnode.com/res/hashnode/image/upload/v1759438552359/477c4f39-04e4-4427-a2d2-74a6066622dd.png)

![WAF - Traffic Details4](https://cdn.hashnode.com/res/hashnode/image/upload/v1759438590513/31acecd0-7f45-4fb9-b352-5dc5fcf49e75.png)

### Clean Up

It’s important to clean up the resources created so far after the hands-on exercise. Due to the dependencies among the resources, trying to delete a resource that another resource depends on may lead to an error. So, you should delete them in this order:

- Secrets Manager
- Cognito – Users, App Client, then User Pool
- API Gateway – Endpoints/ Methods, Resources, API, Stage
- Web Application Firewall – IP Set, Web ACL
- All Lambda Functions
- Lambda IAM Roles and the policies attached to them
- CloudWatch Log Group for all the Lambda functions
- SNS Topic

Also, you can deactivate or delete the credentials created for your IAM Admin user if not in use.

::: tip Improvements

Consider the following areas to improve, apply best practices to, and enhance the security posture of your systems further.

1. Use of API keys
2. Third-party API consumption
3. API inventory management/ documentation
4. Resource provisioning using Infrastructure as Code

:::

---

## Conclusion

Security at every layer of an IT system is not negotiable. In this project, we’ve demonstrated how to leverage cloud-native solutions to secure APIs hosted in a serverless service, allowing only authorized users access to the APIs.

I’m Agnes Olorundare, and you can find out more about me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`agnes-olorundare-446055b8`)](https://linkedin.com/in/agnes-olorundare-446055b8/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Securely Deploy APIs to Amazon Lambda – A Practical Guide",
  "desc": "Cyber attacks against APIs (Application Programming Interfaces) are on the increase. These attacks arise from issues with proper authentication, authorization, unnecessary data exposure, lack of request limits, resource consumption, and use of vulner...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-securely-deploy-apis-to-amazon-lambda-a-practical-guide.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
