---
lang: en-US
title: "How to Build a Full-Stack CRUD App with React, AWS Lambda, DynamoDB, and Cognito Auth"
description: "Article(s) > How to Build a Full-Stack CRUD App with React, AWS Lambda, DynamoDB, and Cognito Auth"
icon: fa-brands fa-aws
category:
  - DevOps
  - Amazon
  - AWS
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devop
  - amazon
  - aws
  - amazon-web-services
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Full-Stack CRUD App with React, AWS Lambda, DynamoDB, and Cognito Auth"
    - property: og:description
      content: "How to Build a Full-Stack CRUD App with React, AWS Lambda, DynamoDB, and Cognito Auth"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/full-stack-aws-react-lambda-dynamodb-tutorial.html
prev: /devops/aws/articles/README.md
date: 2026-03-18
isOriginal: false
author:
  - name: Benedicta Onyebuchi
    url: https://freecodecamp.org/news/author/Benedicta/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1a996eff-72f5-4f4d-b8da-cf4d646c3224.png
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
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Full-Stack CRUD App with React, AWS Lambda, DynamoDB, and Cognito Auth"
  desc="Building a web application that works only on your local machine is one thing. Building one that is secure, connected to a real database, and accessible to anyone on the internet is another challenge "
  url="https://freecodecamp.org/news/full-stack-aws-react-lambda-dynamodb-tutorial"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1a996eff-72f5-4f4d-b8da-cf4d646c3224.png"/>

Building a web application that works only on your local machine is one thing. Building one that is secure, connected to a real database, and accessible to anyone on the internet is another challenge entirely. And it requires a different set of tools.

Most production web applications share a common set of needs: they store and retrieve data, they expose that data through an API, they require users to authenticate before accessing sensitive operations, and they need to be deployed somewhere reliable and fast.

Meeting all of those needs used to require managing servers, configuring databases, handling authentication infrastructure, and provisioning hosting environments – often as separate, manual processes.

AWS changes that model significantly. With the combination of services you'll use in this tutorial (Lambda, DynamoDB, API Gateway, Cognito, and CloudFront), you can build and deploy a fully functional, secured, globally distributed application without managing a single server.

Each service handles one specific responsibility:

- DynamoDB stores your data
- Lambda runs your business logic on demand
- API Gateway exposes your functions as a REST API
- Cognito manages user authentication
- CloudFront delivers your frontend worldwide over HTTPS.

The AWS CDK (Cloud Development Kit) ties all of this together by letting you define every one of those services as TypeScript code. Instead of clicking through the AWS Console to configure each resource manually, you describe your entire infrastructure in a single file and deploy it with one command.

By the end of this tutorial, you will have a fully deployed vendor management dashboard. Users can sign up, log in, and then create, read, and delete vendors, with all data securely stored in AWS DynamoDB and all routes protected by Amazon Cognito authentication.

---

## What You'll Build

In this handbook, you'll build a two-panel web app where authenticated users can:

- Add a new vendor (name, category, contact email)
- View all saved vendors in real time
- Delete a vendor from the list
- Sign in and sign out securely

The frontend is built with Next.js. The backend runs entirely on AWS: DynamoDB stores the data, Lambda functions handle the logic, API Gateway exposes a REST API, Cognito manages authentication, and CloudFront serves the app globally over HTTPS.

::: info Who This Is For

This tutorial is for developers who know basic JavaScript and React but have never used AWS. You don't need any prior backend, cloud, or DevOps experience. I'll explain every AWS concept before we use it.

:::

::: note Prerequisites

Before starting, make sure you have the following installed and available:

- **Node.js 18 or higher**: [<VPIcon icon="fa-brands fa-node"/>Download here](https://nodejs.org)
- **npm**: Included with Node.js
- **A code editor**: I recommend VS Code
- **A terminal**: Any terminal on macOS, Linux, or Windows (WSL recommended on Windows)
- **An AWS account**: You will create one in Part 1. A credit card is required, but the Free Tier covers everything in this tutorial.
- **Basic familiarity with React and TypeScript**: You should understand components, `useState`, and `useEffect`.

---

## Architecture Overview

Before writing any code, here's a plain-English description of how the pieces fit together.

When a user clicks "Add Vendor" in the React app:

1. The frontend reads the user's JWT auth token from the browser session
2. It sends a `POST` request to API Gateway, including the token in the request header
3. API Gateway checks the token against Cognito. If the token is invalid or missing, it rejects the request with a 401 error immediately
4. If the token is valid, API Gateway passes the request to the createVendor Lambda function
5. The Lambda function writes the new vendor to DynamoDB
6. DynamoDB confirms the write, and the Lambda returns a success response
7. The frontend re-fetches the vendor list and updates the UI

The same flow applies to reading and deleting vendors, with different Lambda functions and HTTP methods.

![Architecture diagram of the Vendors Tracker Application](https://cdn.hashnode.com/uploads/covers/62d53ab5bc2c7a1dc672b04f/70486bdc-f272-45db-be30-f10752916546.png)

::: info How the app is deployed

Your React app is exported as a static site, uploaded to an S3 bucket, and served globally through CloudFront. Your backend infrastructure (Lambda functions, API Gateway, DynamoDB, Cognito) is defined in TypeScript using AWS CDK and deployed with a single command.

:::

---

## Part 1: Set Up Your AWS Account and Tools

Before writing any application code, you need three things in place: an AWS account, the right tools on your machine, and credentials that let those tools communicate with AWS on your behalf.

### 1.1 Create Your AWS Account

If you don't have an AWS account:

1. Go to [<VPIcon icon="fa-brands fa-aws"/>aws.amazon.com](https://aws.amazon.com)
2. Click **Create an AWS Account**
3. Follow the sign-up prompts and add a payment method
4. Once registered, log in to the AWS Management Console

AWS has a Free Tier that covers all the services used in this tutorial. You won't be charged for normal use while following along.

### 1.2 Install the AWS CLI and CDK

The **AWS CLI** is a command-line tool that lets you interact with AWS from your terminal: checking resources, configuring credentials, and more.

The **AWS CDK (Cloud Development Kit)** is the tool you will use to define your entire backend (database, Lambda functions, API) using TypeScript code. Instead of clicking through the AWS Console to create each resource, you describe what you want in a TypeScript file and CDK builds it for you.

Install both:

```sh
# Install AWS CLI (macOS)
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /

# For Linux, see: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html
# For Windows, see: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-windows.html

# Install AWS CDK globally
npm install -g aws-cdk
```

Verify both are installed:

```sh
aws --version
cdk --version
```

Both commands should print a version number. If they do, you are ready to move on.

### 1.3 Configure Your AWS Credentials (IAM)

This step is critical. Your terminal needs a set of credentials – like a username and password – to act on your behalf inside AWS.

Think of your root account (the one you signed up with) as the master key to your entire AWS account. You should never use it for day-to-day development. Instead, you will create a separate IAM user with its own set of keys. If those keys are ever exposed, you can delete them without compromising your root account.

#### Phase 1: Create an IAM User

1. Log in to the AWS Console and search for IAM in the top search bar
2. In the left sidebar, click Users, then click Create user
3. Name the user `cdk-dev`. Leave "Provide user access to the AWS Management Console" unchecked – you only need terminal access, not console access
4. On the permissions screen, choose Attach policies directly

![IAM Console showing the “Attach policies directly” screen with AdministratorAccess checked](https://cdn.hashnode.com/uploads/covers/62d53ab5bc2c7a1dc672b04f/d4699108-c1aa-4dd3-957c-b84292c719a2.png)

1. Search for `AdministratorAccess` and check the box next to it

Note on permissions: In a production job you would use a more restricted policy. For this tutorial, Administrator access is needed because CDK creates many different types of AWS resources.

6. Click through to the end and click Create user

#### Phase 2: Generate Access Keys

1. Click on your newly created `cdk-dev` user from the Users list
2. Go to the Security credentials tab
3. Scroll down to Access keys and click Create access key
4. Select Command Line Interface (CLI), check the acknowledgment box, and click Next
5. Click Create access key

::: important

Copy both the Access Key ID and the Secret Access Key right now. You will never be able to see the Secret Access Key again after closing this screen. Save both values in a password manager or secure note.

![IAM Console showing the Create access key screen with the Access Key ID and Secret Access Key](https://cdn.hashnode.com/uploads/covers/62d53ab5bc2c7a1dc672b04f/d85bb4eb-0ecf-4d92-be92-d75af5a534c6.png)

:::

#### Phase 3: Connect Your Terminal to AWS

Run the following command in your terminal:

```sh
aws configure
```

You will be prompted for four values:

```plaintext title="output"
AWS Access Key ID:     [paste your Access Key ID]
AWS Secret Access Key: [paste your Secret Access Key]
Default region name:   us-east-1
Default output format: json
```

Use `us-east-1` as your region for this tutorial. After this step, every CDK and AWS CLI command you run will use these credentials automatically.

---

## Part 2: Set Up the Project Structure

You will use a **monorepo** layout – one top-level folder with two sub-projects inside: <VPIcon icon="fas fa-folder-open"/>`frontend` for your React app and <VPIcon icon="fas fa-folder-open"/>`backend` for your AWS infrastructure code. They are deployed independently but live side by side.

### 2.1 Create the Workspace

```sh
mkdir vendor-tracker && cd vendor-tracker
mkdir backend frontend
```

### 2.2 Initialize the Frontend (Next.js)

Navigate into the <VPIcon icon="fas fa-folder-open"/>`frontend` folder and run:

```sh
cd frontend
npx create-next-app@latest .
```

When prompted, choose the following options:

- **TypeScript** --> Yes
- **ESLint** --> Yes
- **Tailwind CSS** --> Yes
- **src/ directory** -->No
- **App Router** --> Yes
- **Import alias** --> No

### 2.3 Initialize the Backend (CDK)

Navigate into the <VPIcon icon="fas fa-folder-open"/>`backend` folder and run:

```sh
cd ../backend
cdk init app --language typescript
```

This generates a boilerplate CDK project. The most important file it creates is <VPIcon icon="fas fa-folder-open"/>`backend/lib/`<VPIcon icon="iconfont icon-typescript"/>`backend-stack.ts`. This is where you will define all of your AWS infrastructure as TypeScript code.

Also install `esbuild`, which CDK uses to bundle your Lambda functions:

```sh
npm install --save-dev esbuild
```

### 2.4 Understanding CDK Before You Write Any Code

CDK is likely different from most tools you have used. Here is how it works:

Normally, you would create AWS resources by clicking through the AWS Console: create a table here, configure a Lambda function there. CDK lets you do all of that using TypeScript code instead.

When you run `cdk deploy`, CDK reads your TypeScript file, converts it into an AWS CloudFormation template (an internal AWS format for describing infrastructure), and submits it to AWS. AWS then creates all the resources you described.

A few terms you will see throughout this tutorial:

- **Stack**: The collection of all AWS resources you define together. Your `BackendStack` class is your stack.
- **Construct**: Each individual AWS resource you create inside a stack (a table, a Lambda function, an API) is called a construct.
- **Deploy**: Running `cdk deploy` sends your TypeScript definition to AWS and creates or updates the real resources.

The main file you'll work in is <VPIcon icon="fas fa-folder-open"/>`backend/lib/`<VPIcon icon="iconfont icon-typescript"/>`backend-stack.ts`. Think of it as the blueprint for your entire backend.

Your final project structure will look like this:

```sh title="file structure"
vendor-tracker/
├── backend/
│   ├── lambda/
│   │   ├── createVendor.ts
│   │   ├── getVendors.ts
│   │   └── deleteVendor.ts
│   ├── lib/
│   │   └── backend-stack.ts
│   └── package.json
└── frontend/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── providers.tsx
    ├── lib/
    │   └── api.ts
    ├── types/
    │   └── vendor.ts
    └── .env.local
```

---

## Part 3: Define the Database (DynamoDB)

DynamoDB is AWS's NoSQL database. Think of it as a fast, scalable key-value store in the cloud. Every item in a DynamoDB table must have a unique ID called the **partition key**. For your vendor table, that key will be `vendorId`.

Open <VPIcon icon="fas fa-folder-open"/>`backend/lib/`<VPIcon icon="iconfont icon-typescript"/>`backend-stack.ts`. Replace the entire file contents with the following:

```ts title="backend/lib/backend-stack.ts"
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. DynamoDB Table
    const vendorTable = new dynamodb.Table(this, 'VendorTable', {
      partitionKey: {
        name: 'vendorId',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For development only
    });
  }
}
```

::: info What each line does

- `partitionKey` tells DynamoDB that `vendorId` is the unique identifier for every record. No two vendors can share the same `vendorId`.
- `PAY_PER_REQUEST` means you only pay when data is actually read or written. There is no charge when the table is idle, which makes it cost-effective for learning.
- `RemovalPolicy.DESTROY` means the table will be deleted when you run `cdk destroy`. For production apps you would not use this.

:::

---

## Part 4: Write the Lambda Functions

A Lambda function is your server, but unlike a traditional server, it only runs when it's called. AWS spins it up on demand, runs your code, and shuts it down. You're only charged for the time your code is actually running.

You'll write three Lambda functions:

- <VPIcon icon="iconfont icon-typescript"/>`createVendor.ts`: Adds a new vendor to DynamoDB
- <VPIcon icon="iconfont icon-typescript"/>`getVendors.ts`: Returns all vendors from DynamoDB
- <VPIcon icon="iconfont icon-typescript"/>`deleteVendor.ts`: Removes a vendor from DynamoDB by ID

Create a new folder inside <VPIcon icon="fas fa-folder-open"/>`backend`:

```sh
mkdir backend/lambda
```

![](https://cdn.hashnode.com/uploads/covers/62d53ab5bc2c7a1dc672b04f/6330a84b-77c3-4001-9783-5fedc89ae1c0.png)

### A Note on the AWS SDK

All three Lambda functions use **AWS SDK v3** (<VPIcon icon="fa-brands fa-npm"/>`@aws-sdk/client-dynamodb` and <VPIcon icon="fa-brands fa-npm"/>`@aws-sdk/lib-dynamodb`). This is the current standard. An older version of the SDK (`aws-sdk`) exists but is deprecated and not bundled in the Node.js 18 Lambda runtime, which is what you'll use. Stick to v3 throughout.

### 4.1 Create Vendor Lambda

Create <VPIcon icon="fas fa-folder-open"/>`backend/lambda/`<VPIcon icon="iconfont icon-typescript"/>`createVendor.ts`:

```ts :collapsed-lines title="backend/lambda/createVendor.ts"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: any) => {
  try {
    const body = JSON.parse(event.body);

    const item = {
      vendorId: randomUUID(), // Generates a collision-safe unique ID
      name: body.name,
      category: body.category,
      contactEmail: body.contactEmail,
      createdAt: new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({
        TableName: process.env.TABLE_NAME!,
        Item: item,
      })
    );

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE",
      },
      body: JSON.stringify({ message: "Vendor created", vendorId: item.vendorId }),
    };
  } catch (error) {
    console.error("Error creating vendor:", error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Failed to create vendor" }),
    };
  }
};
```

::: info What each part does

- `randomUUID()` generates a universally unique ID using Node's built-in `crypto` module. No extra package is needed. This is more reliable than `Date.now()`, which can produce duplicate IDs if two requests arrive within the same millisecond.
- `process.env.TABLE_NAME` reads the DynamoDB table name from an environment variable. You'll set this value in the CDK stack. This avoids hardcoding the table name inside your Lambda code.
- The `headers` block is required for CORS (Cross-Origin Resource Sharing). Without `Access-Control-Allow-Origin`, your browser will block responses from a different domain than your frontend. Without `Access-Control-Allow-Headers`, the `Authorization` header you add later for Cognito will be rejected during the browser's preflight check.

:::

### 4.2 Get Vendors Lambda

Create <VPIcon icon="fas fa-folder-open"/>`backend/lambda/`<VPIcon icon="iconfont icon-typescript"/>`getVendors.ts`:

```ts :collapsed-lines title="backend/lambda/getVendors.ts"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async () => {
  try {
    const response = await docClient.send(
      new ScanCommand({
        TableName: process.env.TABLE_NAME!,
      })
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response.Items ?? []),
    };
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Failed to fetch vendors" }),
    };
  }
};
```

::: info What each part does

- `ScanCommand` reads every item in the table and returns them as an array. For a learning project this is fine. In a production app with millions of rows, you would use a more targeted `QueryCommand` to avoid reading the entire table on every request.
- `response.Items ?? []` returns an empty array if the table is empty, preventing the frontend from crashing when there are no vendors yet.

:::

### 4.3 Delete Vendor Lambda

Create <VPIcon icon="fas fa-folder-open"/>`backend/lambda/`<VPIcon icon="iconfont icon-typescript"/>`deleteVendor.ts`:

```ts :collapsed-lines title="backend/lambda/deleteVendor.ts"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: any) => {
  try {
    const body = JSON.parse(event.body);
    const { vendorId } = body;

    if (!vendorId) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "vendorId is required" }),
      };
    }

    await docClient.send(
      new DeleteCommand({
        TableName: process.env.TABLE_NAME!,
        Key: { vendorId },
      })
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE",
      },
      body: JSON.stringify({ message: "Vendor deleted" }),
    };
  } catch (error) {
    console.error("Error deleting vendor:", error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Failed to delete vendor" }),
    };
  }
};
```

::: info What each part does

- `DeleteCommand` removes the item whose `vendorId` matches the key you provide. DynamoDB doesn't return an error if the item doesn't exist. It simply does nothing.
- The `400` guard at the top returns a clear error if the caller forgets to send a `vendorId`, rather than letting DynamoDB throw a confusing internal error.

:::

---

## Part 5: Build the API with API Gateway

API Gateway is what gives your Lambda functions a public URL. Without it, there's no way for your browser to trigger a Lambda function. Think of it as the front door of your backend: it receives HTTP requests, checks whether the caller is authorized, routes the request to the correct Lambda, and returns the Lambda's response to the caller.

Now you'll wire everything together in <VPIcon icon="fas fa-folder-open"/>`backend/lib/`<VPIcon icon="iconfont icon-typescript"/>`backend-stack.ts`.

### 5.1 Add Lambda Functions and API Gateway to the Stack

Replace the entire contents of <VPIcon icon="fas fa-folder-open"/>`backend/lib/`<VPIcon icon="iconfont icon-typescript"/>`backend-stack.ts` with this complete, assembled file:

```ts :collapsed-lines title="backend/lib/backend-stack.ts"
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. DynamoDB Table 
    const vendorTable = new dynamodb.Table(this, 'VendorTable', {
      partitionKey: {
        name: 'vendorId',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // 2. Lambda Functions
    const lambdaEnv = { TABLE_NAME: vendorTable.tableName };

    const createVendorLambda = new NodejsFunction(this, 'CreateVendorHandler', {
      entry: 'lambda/createVendor.ts',
      handler: 'handler',
      environment: lambdaEnv,
    });

    const getVendorsLambda = new NodejsFunction(this, 'GetVendorsHandler', {
      entry: 'lambda/getVendors.ts',
      handler: 'handler',
      environment: lambdaEnv,
    });

    const deleteVendorLambda = new NodejsFunction(this, 'DeleteVendorHandler', {
      entry: 'lambda/deleteVendor.ts',
      handler: 'handler',
      environment: lambdaEnv,
    });

    // 3. Permissions (Least Privilege)
    vendorTable.grantWriteData(createVendorLambda);
    vendorTable.grantReadData(getVendorsLambda);
    vendorTable.grantWriteData(deleteVendorLambda);

    // 4. API Gateway
    const api = new apigateway.RestApi(this, 'VendorApi', {
      restApiName: 'Vendor Service',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization'],
      },
    });

    const vendors = api.root.addResource('vendors');
    vendors.addMethod('POST', new apigateway.LambdaIntegration(createVendorLambda));
    vendors.addMethod('GET', new apigateway.LambdaIntegration(getVendorsLambda));
    vendors.addMethod('DELETE', new apigateway.LambdaIntegration(deleteVendorLambda));

    // 5. Outputs
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: api.url,
    });
  }
}
```

::: info What each section does

`NodejsFunction` is a special CDK construct that automatically bundles your Lambda code and all its dependencies into a single file using `esbuild` before uploading it to AWS. This is why you installed `esbuild` in Part 2. Always use `NodejsFunction` instead of the basic `lambda.Function` construct. The basic version requires you to manually manage bundling, which causes "Module not found" errors at runtime.

:::

**Permissions (Least Privilege):** In AWS, no resource can communicate with any other resource by default. A Lambda function has no access to DynamoDB, S3, or anything else unless you explicitly grant it.

This is called the **Least Privilege** principle: each piece of your system gets exactly the permissions it needs, and nothing more. `grantWriteData` lets a Lambda write and delete items. `grantReadData` lets a Lambda read items. Using separate grants for each function means the `getVendors` Lambda can never accidentally delete data.

`CfnOutput` prints a value to your terminal after `cdk deploy` completes. You'll use the `ApiEndpoint` URL to configure your frontend.

---

## Part 6: Deploy the Backend to AWS

Your infrastructure is fully defined in code. Now you'll deploy it to AWS and get a live API URL.

### 6.1 Bootstrap Your AWS Environment

Before your first CDK deployment, AWS needs a small landing zone in your account – an S3 bucket where CDK can upload your Lambda bundles and other assets. This setup step is called **bootstrapping** and only needs to be done once per AWS account per region.

From inside your <VPIcon icon="fas fa-folder-open"/>`backend` folder, run:

```sh
cdk bootstrap
```

::: important

Bootstrapping is region-specific. If you ever switch to a different AWS region, you will need to run `cdk bootstrap` again in that region.

:::

### 6.2 Deploy

Run:

```sh
cdk deploy
```

CDK will display a summary of everything it is about to create and ask for your confirmation. Type `y` and press Enter.

When the deployment finishes, you'll see an **Outputs** section in your terminal:

```plaintext title="output"
BackendStack.ApiEndpoint = https://abcdef123.execute-api.us-east-1.amazonaws.com/prod/
```

Copy that URL. You'll need it when building the frontend.

### 6.3 Troubleshooting: How to Read AWS Error Logs

Real deployments rarely go perfectly the first time. If something goes wrong after deploying, here is how to find the actual error message.

#### Error: 502 Bad Gateway

A `502` means API Gateway received your request but your Lambda crashed before it could respond. The most common cause is a missing environment variable – for example, if `TABLE_NAME` was not passed correctly and the Lambda cannot find the table.

To find the actual error message, use **CloudWatch Logs**:

1. Log in to the AWS Console and search for CloudWatch
2. In the left sidebar, click Logs --> Log groups

![CloudWatch left sidebar with log groups, and the search field showing /aws/lambda/](https://cdn.hashnode.com/uploads/covers/62d53ab5bc2c7a1dc672b04f/abfb78fc-574b-4a75-a12b-12fb09f041b3.png)

1. Find the group named `/aws/lambda/BackendStack-CreateVendorHandler...`
2. Click the most recent Log stream
3. Read the error message. It will tell you exactly what went wrong

Two common messages and their fixes:

- `Runtime.ImportModuleError` : Your Lambda cannot find a module. Make sure you're using `NodejsFunction` (not `lambda.Function`) in your CDK stack. `NodejsFunction` automatically bundles dependencies; `lambda.Function` does not.
- `AccessDeniedException`: Your Lambda tried to access DynamoDB but doesn't have permission. Check that you have the correct `grantWriteData` or `grantReadData` call in your stack for that Lambda.

---

## Part 7: Build the React Frontend

Your backend is live. Now you'll build the React UI that talks to it.

### 7.1 Define the Vendor Type

Before writing any API or component code, define what a "vendor" looks like in TypeScript. This gives you type safety throughout your frontend code.

Create <VPIcon icon="fas fa-folder-open"/>`frontend/types/`<VPIcon icon="iconfont icon-typescript"/>`vendor.ts`:

```ts title="frontend/types/vendor.ts"
export interface Vendor {
  vendorId?: string; // Optional when creating — the Lambda generates it
  name: string;
  category: string;
  contactEmail: string;
  createdAt?: string;
}
```

The `vendorId?` is marked optional with `?` because when you are *creating* a new vendor, you don't have an ID yet. The `createVendor` Lambda generates one. When you *read* vendors back from the API, `vendorId` will always be present.

### 7.2 Create the API Service Layer

Rather than writing `fetch` calls directly inside your React components, you'll centralize all your API logic in one file. This pattern is called a **service layer**. It keeps your components clean and makes it easy to update API calls in one place.

First, create a <VPIcon icon="iconfont icon-dotenv"/>`.env.local` file inside your <VPIcon icon="fas fa-folder-open"/>`frontend` folder to store your API URL:

```sh title="frontend/.env.local"
NEXT_PUBLIC_API_URL=https://abcdef123.execute-api.us-east-1.amazonaws.com/prod
```

Replace the URL with the `ApiEndpoint` value from your `cdk deploy` output. The `NEXT_PUBLIC_` prefix is required by Next.js to make an environment variable accessible in the browser.

You might be wondering: **why not hardcode the URL**? If you paste your API URL directly into your code and push it to GitHub, it becomes publicly visible. While an API URL alone does not expose your data (Cognito will protect that), it's good practice to keep URLs and secrets out of source control. Always use .env.local and add it to your .gitignore.

Make sure <VPIcon icon="iconfont icon-dotenv"/>`.env.local` is in your <VPIcon icon="iconfont icon-git"/>`.gitignore`:

```sh
echo ".env.local" >> frontend/.gitignore
```

Now create <VPIcon icon="fas fa-folder-open"/>`frontend/lib/`<VPIcon icon="iconfont icon-typescript"/>`api.ts`:

```ts :collapsed-lines title="frontend/lib/api.ts"
import { Vendor } from '@/types/vendor';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const getVendors = async (): Promise<Vendor[]> => {
  const response = await fetch(`${BASE_URL}/vendors`);
  if (!response.ok) throw new Error('Failed to fetch vendors');
  return response.json();
};

export const createVendor = async (vendor: Omit<Vendor, 'vendorId' | 'createdAt'>): Promise<void> => {
  const response = await fetch(`${BASE_URL}/vendors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vendor),
  });
  if (!response.ok) throw new Error('Failed to create vendor');
};

export const deleteVendor = async (vendorId: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/vendors`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vendorId }),
  });
  if (!response.ok) throw new Error('Failed to delete vendor');
};
```

::: info What each part does

- `Omit<Vendor, 'vendorId' | 'createdAt'>` means the `createVendor` function accepts a vendor without an ID or timestamp (those are generated server-side).
- `if (!response.ok) throw new Error(...)` ensures that any HTTP error (4xx or 5xx) surfaces as a JavaScript error in your component, where you can show the user a meaningful message instead of silently failing.

:::

You'll update these functions later in Part 8 to include the Cognito auth token.

### 7.3 Build the Main Page

Now create the main page component. It includes a form for adding vendors and a live list that displays all current vendors.

Replace the contents of <VPIcon icon="fas fa-folder-open"/>`frontend/app/`<VPIcon icon="fa-brands fa-react"/>`page.tsx` with:

```tsx :collapsed-lines title="frontend/app/page.tsx"
'use client';

import { useState, useEffect } from 'react';
import { createVendor, getVendors, deleteVendor } from '@/lib/api';
import { Vendor } from '@/types/vendor';

export default function Home() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [form, setForm] = useState({ name: '', category: '', contactEmail: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadVendors = async () => {
    try {
      const data = await getVendors();
      setVendors(data);
    } catch {
      setError('Failed to load vendors.');
    }
  };

  // Load vendors once when the page first renders
  useEffect(() => {
    loadVendors();
  }, []);
  // The empty [] means this runs only once. Without it, the effect would
  // run after every render, causing an infinite loop of fetch requests.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the browser from reloading the page on submit
    setLoading(true);
    setError('');
    try {
      await createVendor(form);
      setForm({ name: '', category: '', contactEmail: '' }); // Reset the form
      await loadVendors(); // Refresh the list from DynamoDB
    } catch {
      setError('Failed to add vendor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (vendorId: string) => {
    try {
      await deleteVendor(vendorId);
      await loadVendors(); // Refresh after deleting
    } catch {
      setError('Failed to delete vendor.');
    }
  };

  return (
    <main className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Vendor Tracker</h1>
      <p className="text-gray-500 mb-8">Manage your vendors, stored in AWS DynamoDB.</p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* ── Add Vendor Form ── */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Vendor</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full p-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Vendor Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="w-full p-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Category (e.g. SaaS, Hardware)"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              required
            />
            <input
              className="w-full p-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Contact Email"
              type="email"
              value={form.contactEmail}
              onChange={e => setForm({ ...form, contactEmail: e.target.value })}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Saving...' : 'Add Vendor'}
            </button>
          </form>
        </section>

        {/* ── Vendor List ── */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Current Vendors ({vendors.length})
          </h2>
          <div className="space-y-3">
            {vendors.length === 0 ? (
              <p className="text-gray-400 italic">No vendors yet. Add one using the form.</p>
            ) : (
              vendors.map(v => (
                <div
                  key={v.vendorId}
                  className="p-4 border rounded shadow-sm bg-white flex justify-between items-start"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{v.name}</p>
                    <p className="text-sm text-gray-500">{v.category} · {v.contactEmail}</p>
                  </div>
                  <button
                    onClick={() => v.vendorId && handleDelete(v.vendorId)}
                    className="ml-4 text-sm text-red-500 hover:text-red-700 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </main>
  );
}
```

::: important Key points in this component

- `'use client'` at the top is a Next.js directive. It tells Next.js that this component uses browser APIs (`useState`, `useEffect`, event handlers) and must run in the browser, not be pre-rendered on the server.
- `e.preventDefault()` inside `handleSubmit` stops the browser's default form submission behavior, which would cause a full page reload and wipe your React state.
- After every `createVendor` or `deleteVendor` call, `loadVendors()` is called again. This re-fetches the latest data from DynamoDB so the UI always matches what is actually stored in the database.

:::

### 7.4 Test the App Locally

Start your Next.js development server:

```sh
cd frontend
npm run dev
```

Open `http://localhost:3000` in your browser. You should see the two-panel layout. Try adding a vendor and confirm it appears in the list.

![The running Vendor Tracker app at localhost:3000 showing the two-panel layout with the Add Vendor form on the left and an empty vendor list on the right](https://cdn.hashnode.com/uploads/covers/62d53ab5bc2c7a1dc672b04f/281f971a-27b8-49b3-9079-e12601525d80.png)

![The Vendor Tracker app after a vendor has been added, showing the vendor card in the list](https://cdn.hashnode.com/uploads/covers/62d53ab5bc2c7a1dc672b04f/88b5dd74-5847-4310-bec3-b1a2b129fbaa.png)

#### Verifying the connection to AWS:

Open Chrome DevTools (<kbd>F12</kbd>) and click the Network tab. When you add a vendor, you should see:

- A `POST` request to your AWS API URL returning a **201** status code
- A `GET` request returning **200** with the updated vendor list

You can also verify the data was saved by opening the AWS Console, navigating to **DynamoDB --> Tables --> VendorTable --> Explore table items**. Your vendor should appear there.

---

## Part 8: Add Authentication with Amazon Cognito

Right now your API is completely open. Anyone who finds your API URL can add or delete vendors. You'll fix that with **Amazon Cognito**.

Cognito is AWS's authentication service. It manages a User Pool – a database of registered users with usernames and passwords. When a user logs in, Cognito issues a JWT (JSON Web Token): a cryptographically signed string that proves who the user is. Your API Gateway will check for this token on every request. No valid token means no access.

::: info What is a JWT?

A JSON Web Token is a string that looks like `eyJhbGci...`. It contains encoded information about the user and is signed by Cognito using a secret key.

:::

API Gateway can verify the signature without contacting Cognito on every request, which makes token checking fast. Think of it as a tamper-proof badge: anyone can read the name on it, but only Cognito's signature makes it valid.

### 8.1 Add Cognito to the CDK Stack

Open <VPIcon icon="fas fa-folder-open"/>`backend/lib/`<VPIcon icon="iconfont icon-typescript"/>`backend-stack.ts` and update it to include Cognito. Here is the complete updated file:

```ts :collapsed-lines title="backend/lib/backend-stack.ts"
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ─── 1. DynamoDB Table ────────────────────────────────────────────────────
    const vendorTable = new dynamodb.Table(this, 'VendorTable', {
      partitionKey: { name: 'vendorId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // ─── 2. Lambda Functions ──────────────────────────────────────────────────
    const lambdaEnv = { TABLE_NAME: vendorTable.tableName };

    const createVendorLambda = new NodejsFunction(this, 'CreateVendorHandler', {
      entry: 'lambda/createVendor.ts',
      handler: 'handler',
      environment: lambdaEnv,
    });

    const getVendorsLambda = new NodejsFunction(this, 'GetVendorsHandler', {
      entry: 'lambda/getVendors.ts',
      handler: 'handler',
      environment: lambdaEnv,
    });

    const deleteVendorLambda = new NodejsFunction(this, 'DeleteVendorHandler', {
      entry: 'lambda/deleteVendor.ts',
      handler: 'handler',
      environment: lambdaEnv,
    });

    // ─── 3. Permissions ───────────────────────────────────────────────────────
    vendorTable.grantWriteData(createVendorLambda);
    vendorTable.grantReadData(getVendorsLambda);
    vendorTable.grantWriteData(deleteVendorLambda);

    // ─── 4. Cognito User Pool ─────────────────────────────────────────────────
    const userPool = new cognito.UserPool(this, 'VendorUserPool', {
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },
    });

    // Required to host Cognito's internal auth endpoints
    userPool.addDomain('VendorUserPoolDomain', {
      cognitoDomain: {
        domainPrefix: `vendor-tracker-${this.account}`,
      },
    });

    const userPoolClient = userPool.addClient('VendorAppClient');

    // ─── 5. API Gateway + Authorizer ──────────────────────────────────────────
    const api = new apigateway.RestApi(this, 'VendorApi', {
      restApiName: 'Vendor Service',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization'],
      },
    });

    const authorizer = new apigateway.CognitoUserPoolsAuthorizer(
      this,
      'VendorAuthorizer',
      { cognitoUserPools: [userPool] }
    );

    const authOptions = {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    };

    const vendors = api.root.addResource('vendors');
    vendors.addMethod('GET', new apigateway.LambdaIntegration(getVendorsLambda), authOptions);
    vendors.addMethod('POST', new apigateway.LambdaIntegration(createVendorLambda), authOptions);
    vendors.addMethod('DELETE', new apigateway.LambdaIntegration(deleteVendorLambda), authOptions);

    // ─── 6. Outputs ───────────────────────────────────────────────────────────
    new cdk.CfnOutput(this, 'ApiEndpoint', { value: api.url });
    new cdk.CfnOutput(this, 'UserPoolId', { value: userPool.userPoolId });
    new cdk.CfnOutput(this, 'UserPoolClientId', { value: userPoolClient.userPoolClientId });
  }
}
```

![The newly created User Pool (VendorUserPool...) in the User Pools list, with the User Pool ID visible](https://cdn.hashnode.com/uploads/covers/62d53ab5bc2c7a1dc672b04f/c5e91abf-e6af-429f-bf5b-b14d18233f6c.png)

::: info What changed

- `CognitoUserPoolsAuthorizer` tells API Gateway to check every request for a valid Cognito JWT before passing it to any Lambda. If the token is missing or invalid, API Gateway rejects the request with a `401 Unauthorized` response without ever touching your Lambda.
- `authOptions` is applied to all three API methods: GET, POST, and DELETE. All routes are now protected.
- `autoVerify: { email: true }` tells Cognito to mark the email attribute as verified after a user confirms via the verification code email. It doesn't skip the verification email, as users still receive a code. If you want to skip verification during development, you can manually confirm users in the Cognito console (covered in section 8.5).
- Two new `CfnOutput` values (`UserPoolId` and `UserPoolClientId`) will appear in your terminal after the next deployment. Your frontend needs them to connect to Cognito.

:::

Deploy the updated stack:

```sh
cd backend
cdk deploy
```

After deployment, your terminal output will include three values:

```plaintext title="output"
BackendStack.ApiEndpoint     = https://abc123.execute-api.us-east-1.amazonaws.com/prod/
BackendStack.UserPoolId      = us-east-1_xxxxxxxx
BackendStack.UserPoolClientId = xxxxxxxxxxxxxxxxxxxx
```

Save all three values. You'll use them in the next step.

### 8.2 Install and Configure AWS Amplify

**AWS Amplify** is a frontend library that handles all the complex authentication logic for you: it manages the login UI, stores tokens in the browser, refreshes expired tokens automatically, and exposes a simple API to read the current user's session.

Install the Amplify libraries inside your <VPIcon icon="fas fa-folder-open"/>`frontend` folder:

```sh
cd frontend
npm install aws-amplify @aws-amplify/ui-react
```

Create <VPIcon icon="fas fa-folder-open"/>`frontend/app/`<VPIcon icon="fa-brands fa-react"/>`providers.tsx`. This file initializes Amplify with your Cognito configuration. It runs once when the app loads:

```tsx title="frontend/app/providers.tsx"
'use client';

import { Amplify } from 'aws-amplify';

Amplify.configure(
  {
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID!,
        userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!,
      },
    },
  },
  { ssr: true }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

Add the Cognito IDs to your <VPIcon icon="fas fa-folder-open"/>`frontend/`<VPIcon icon="iconfont icon-dotnev"/>`.env.local` file:

```sh title="frontend/.env.local"
NEXT_PUBLIC_API_URL=https://abc123.execute-api.us-east-1.amazonaws.com/prod
NEXT_PUBLIC_USER_POOL_ID=us-east-1_xxxxxxxx
NEXT_PUBLIC_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxx
```

Replace the values with the outputs from your `cdk deploy`.

### 8.3 Wire Providers into the App Layout

**This step is critical.** Amplify must be initialized before any component tries to use authentication. If you skip this step, `fetchAuthSession()` will throw an "Amplify not configured" error and nothing will work.

Open <VPIcon icon="fas fa-folder-open"/>`frontend/app/`<VPIcon icon="fa-brands fa-react"/>`layout.tsx` and update it to wrap the app in the `Providers` component:

```tsx title="frontend/app/layout.tsx"
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Vendor Tracker',
  description: 'Manage your vendors with AWS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

By wrapping `{children}` in `<Providers>`, you ensure that Amplify is configured once at the root of the app, before any child page or component renders.

### 8.4 Protect the UI with withAuthenticator

Now wrap your `Home` component so that unauthenticated users see a login screen instead of the dashboard.

Replace the contents of <VPIcon icon="fas fa-folder-open"/>`frontend/app/`<VPIcon icon="fa-brands fa-react"/>`page.tsx` with this updated version:

```tsx :collapsed-lines title="frontend/app/page.tsx"
'use client';

import { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { getVendors, createVendor, deleteVendor } from '@/lib/api';
import { Vendor } from '@/types/vendor';

// withAuthenticator injects `signOut` and `user` as props automatically
function Home({ signOut, user }: { signOut?: () => void; user?: any }) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [form, setForm] = useState({ name: '', category: '', contactEmail: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadVendors = async () => {
    try {
      const data = await getVendors();
      setVendors(data);
    } catch {
      setError('Failed to load vendors.');
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createVendor(form);
      setForm({ name: '', category: '', contactEmail: '' });
      await loadVendors();
    } catch {
      setError('Failed to add vendor.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (vendorId: string) => {
    try {
      await deleteVendor(vendorId);
      await loadVendors();
    } catch {
      setError('Failed to delete vendor.');
    }
  };

  return (
    <main className="p-10 max-w-5xl mx-auto">
      {/* ── Header ── */}
      <header className="flex justify-between items-center mb-8 p-4 bg-gray-100 rounded">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Vendor Tracker</h1>
          <p className="text-sm text-gray-500">Signed in as: {user?.signInDetails?.loginId}</p>
        </div>
        <button
          onClick={signOut}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Sign Out
        </button>
      </header>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* ── Add Vendor Form ── */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Vendor</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full p-2 border rounded text-black"
              placeholder="Vendor Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="w-full p-2 border rounded text-black"
              placeholder="Category (e.g. SaaS, Hardware)"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              required
            />
            <input
              className="w-full p-2 border rounded text-black"
              placeholder="Contact Email"
              type="email"
              value={form.contactEmail}
              onChange={e => setForm({ ...form, contactEmail: e.target.value })}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 disabled:bg-gray-400"
            >
              {loading ? 'Saving...' : 'Add Vendor'}
            </button>
          </form>
        </section>

        {/* ── Vendor List ── */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Current Vendors ({vendors.length})
          </h2>
          <div className="space-y-3">
            {vendors.length === 0 ? (
              <p className="text-gray-400 italic">No vendors yet.</p>
            ) : (
              vendors.map(v => (
                <div
                  key={v.vendorId}
                  className="p-4 border rounded shadow-sm bg-white flex justify-between items-start"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{v.name}</p>
                    <p className="text-sm text-gray-500">{v.category} · {v.contactEmail}</p>
                  </div>
                  <button
                    onClick={() => v.vendorId && handleDelete(v.vendorId)}
                    className="ml-4 text-sm text-red-500 hover:text-red-700 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </main>
  );
}

// Wrapping Home with withAuthenticator means any user who is not logged in
// will see Amplify's built-in login/signup screen instead of this component.
export default withAuthenticator(Home);
```

![Amplify-generated login screen](https://cdn.hashnode.com/uploads/covers/62d53ab5bc2c7a1dc672b04f/e65a88dc-ea75-4daa-b7cf-eac3406c8060.png)

### 8.5 Pass the Auth Token to API Calls

Now that API Gateway requires a JWT on every request, your `fetch` calls need to include the token in the `Authorization` header. Without it, every request will return a `401 Unauthorized` error.

Update <VPIcon icon="fas fa-folder-open"/>`frontend/lib/`<VPIcon icon="iconfont icon-typescript"/>`api.ts` with a token helper and updated fetch calls:

```ts :collapsed-lines title="frontend/lib/api.ts"
import { fetchAuthSession } from 'aws-amplify/auth';
import { Vendor } from '@/types/vendor';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

// Retrieves the current user's JWT token from the active Amplify session
const getAuthToken = async (): Promise<string> => {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();
  if (!token) throw new Error('No active session. Please sign in.');
  return token;
};

export const getVendors = async (): Promise<Vendor[]> => {
  const token = await getAuthToken();
  const response = await fetch(`${BASE_URL}/vendors`, {
    headers: { Authorization: token },
  });
  if (!response.ok) throw new Error('Failed to fetch vendors');
  return response.json();
};

export const createVendor = async (
  vendor: Omit<Vendor, 'vendorId' | 'createdAt'>
): Promise<void> => {
  const token = await getAuthToken();
  const response = await fetch(`${BASE_URL}/vendors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(vendor),
  });
  if (!response.ok) throw new Error('Failed to create vendor');
};

export const deleteVendor = async (vendorId: string): Promise<void> => {
  const token = await getAuthToken();
  const response = await fetch(`${BASE_URL}/vendors`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ vendorId }),
  });
  if (!response.ok) throw new Error('Failed to delete vendor');
};
```

::: info What <code>getAuthToken</code> does

`fetchAuthSession()` reads the currently logged-in user's session from the browser. Amplify stores the session in memory and `localStorage` after the user signs in.

`session.tokens?.idToken` is the JWT string that API Gateway's Cognito Authorizer is looking for. Passing it as the `Authorization` header tells API Gateway: "This request is from an authenticated user."

:::

### 8.6 Troubleshooting Cognito

#### "Unconfirmed" user error after sign-up

When a new user signs up through the Amplify UI, Cognito marks the account as *Unconfirmed* until the user verifies their email address. A verification code is sent to the user's email. After entering the code, the account becomes confirmed and the user can log in.

If you are testing locally and want to skip the email step, you can manually confirm any account in the AWS Console:

1. Open the AWS Console and navigate to Cognito
2. Click on your User Pool (`VendorUserPool...`)
3. Click the Users tab
4. Click on the user's email address
5. Open the Actions dropdown and click Confirm account

![Cognito Users list showing a user with "Unconfirmed" status](https://cdn.hashnode.com/uploads/covers/62d53ab5bc2c7a1dc672b04f/158fb773-9cb1-4c14-9fd7-49e4369ba7e3.png)

![Cognito Users list showing a user with "Unconfirmed" status](https://cdn.hashnode.com/uploads/covers/62d53ab5bc2c7a1dc672b04f/5637ac80-ee0c-4fdf-93cf-d4b7d71f6a65.png)

#### 401 Unauthorized errors after deployment

If you are getting 401 errors, check two things:

1. Open Chrome DevTools --> Network tab, click the failing request, and look at the **Request Headers**. You should see an `Authorization` header with a long string of characters. If it is missing, `getAuthToken` is failing. Check that Amplify is configured correctly in `providers.tsx` and wired in via `layout.tsx`.
2. In your CDK stack, confirm that `authorizationType: apigateway.AuthorizationType.COGNITO` is present on every protected method definition. If it is missing, API Gateway may not be checking tokens even though the authorizer is defined.

---

## Part 9: Deploy the Frontend with S3 and CloudFront

Your app works locally. Now you'll deploy it to a real HTTPS URL that anyone in the world can visit.

**The strategy:** Next.js will export your React app as a set of static HTML, CSS, and JavaScript files. Those files will be uploaded to an **S3 bucket** (AWS's file storage service). **CloudFront** sits in front of the bucket as a Content Delivery Network (CDN), distributing your files to servers around the world and serving them over HTTPS.

### 9.1 Configure Next.js for Static Export

Open <VPIcon icon="fas fa-folder-open"/>`frontend/`<VPIcon icon="fa-brands fa-js"/>`next.config.js` (or `next.config.mjs`) and add the `output: 'export'` setting:

```js title="frontend/next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Generates a static /out folder instead of a Node.js server
};

export default nextConfig;
```

::: note Note on 'use client' and static export

When output: 'export' is set, Next.js builds every page at compile time. Any component that uses browser-only APIs – like withAuthenticator from Amplify – must have 'use client' at the top of the file. This tells Next.js to skip server-side rendering for that component and run it only in the browser.

:::

You already have 'use client' in page.tsx. If you ever see a build error mentioning window is not defined or similar, check that the relevant component has 'use client' at the top.

Build the frontend:

```sh
cd frontend
npm run build
```

This generates an `/out` folder containing your complete website as static files. Verify the folder was created:

```sh
ls out
# You should see: index.html, _next/, etc.
```

### 9.2 Add S3 and CloudFront to the CDK Stack

Open <VPIcon icon="fas fa-folder-open"/>`backend/lib/`<VPIcon icon="iconfont icon-typescript"/>`backend-stack.ts` and add the hosting infrastructure. Here's the complete final version of the file:

```ts :collapsed-lines title="backend/lib/backend-stack.ts"
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. DynamoDB Table 
    const vendorTable = new dynamodb.Table(this, 'VendorTable', {
      partitionKey: { name: 'vendorId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // 2. Lambda Functions
    const lambdaEnv = { TABLE_NAME: vendorTable.tableName };

    const createVendorLambda = new NodejsFunction(this, 'CreateVendorHandler', {
      entry: 'lambda/createVendor.ts',
      handler: 'handler',
      environment: lambdaEnv,
    });

    const getVendorsLambda = new NodejsFunction(this, 'GetVendorsHandler', {
      entry: 'lambda/getVendors.ts',
      handler: 'handler',
      environment: lambdaEnv,
    });

    const deleteVendorLambda = new NodejsFunction(this, 'DeleteVendorHandler', {
      entry: 'lambda/deleteVendor.ts',
      handler: 'handler',
      environment: lambdaEnv,
    });

    // 3. Permissions
    vendorTable.grantWriteData(createVendorLambda);
    vendorTable.grantReadData(getVendorsLambda);
    vendorTable.grantWriteData(deleteVendorLambda);

    // 4. Cognito User Pool
    const userPool = new cognito.UserPool(this, 'VendorUserPool', {
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },
    });

    userPool.addDomain('VendorUserPoolDomain', {
      cognitoDomain: { domainPrefix: `vendor-tracker-${this.account}` },
    });

    const userPoolClient = userPool.addClient('VendorAppClient');

    // 5. API Gateway + Authorizer
    const api = new apigateway.RestApi(this, 'VendorApi', {
      restApiName: 'Vendor Service',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization'],
      },
    });

    const authorizer = new apigateway.CognitoUserPoolsAuthorizer(
      this,
      'VendorAuthorizer',
      { cognitoUserPools: [userPool] }
    );

    const authOptions = {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    };

    const vendors = api.root.addResource('vendors');
    vendors.addMethod('GET', new apigateway.LambdaIntegration(getVendorsLambda), authOptions);
    vendors.addMethod('POST', new apigateway.LambdaIntegration(createVendorLambda), authOptions);
    vendors.addMethod('DELETE', new apigateway.LambdaIntegration(deleteVendorLambda), authOptions);

    // 6. S3 Bucket (Frontend Files) 
    const siteBucket = new s3.Bucket(this, 'VendorSiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // 7. CloudFront Distribution (HTTPS + CDN)
    const distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(siteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          // Redirect all 404s back to index.html so React can handle routing
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    // 8. Deploy Frontend Files to S3 
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('../frontend/out')],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'], // Clears CloudFront cache on every deploy
    });

    // 9. Outputs ───────────────────────────────────────────────────────────
    new cdk.CfnOutput(this, 'ApiEndpoint', { value: api.url });
    new cdk.CfnOutput(this, 'UserPoolId', { value: userPool.userPoolId });
    new cdk.CfnOutput(this, 'UserPoolClientId', { value: userPoolClient.userPoolClientId });
    new cdk.CfnOutput(this, 'CloudFrontURL', {
      value: `https://${distribution.distributionDomainName}`,
    });
  }
}
```

::: info What the hosting infrastructure does

- The **S3 bucket** stores your static HTML, CSS, and JavaScript files. It is private – users cannot access it directly.
- **CloudFront** is the CDN that sits in front of S3. It gives you an HTTPS URL and caches your files at edge locations worldwide, so the app loads fast no matter where users are located. `REDIRECT_TO_HTTPS` automatically upgrades any HTTP request to HTTPS.
- The **error response** for 404 returns <VPIcon icon="fa-brands fa-html5"/>`index.html` instead of an error page. This is necessary for single-page apps: if a user navigates directly to a route like `/vendors/123`, CloudFront cannot find a file at that path, but sending back <VPIcon icon="fa-brands fa-html5"/>`index.html` lets the React app handle the routing correctly.
- `distributionPaths: ['/*']` tells CloudFront to invalidate its entire cache after every deployment. This ensures users always see the latest version of your app immediately.
- `BucketDeployment` is a CDK construct that automatically uploads the contents of your <VPIcon icon="fas fa-folder-open"/>`frontend/out` folder to the S3 bucket every time you run `cdk deploy`.

:::

### 9.3 Run the Final Deployment

First, build the frontend with the latest environment variables:

```sh
cd frontend
npm run build
```

Then deploy everything from the backend folder:

```sh
cd ../backend
cdk deploy
```

After deployment finishes, copy the `CloudFrontURL` from the terminal output:

```plaintext title="output"
BackendStack.CloudFrontURL = https://d1234abcd.cloudfront.net
```

Open that URL in your browser. Your app is now live on the internet, served over HTTPS, globally distributed.

![](https://cdn.hashnode.com/uploads/covers/62d53ab5bc2c7a1dc672b04f/f8e14979-a667-4afc-bdd4-9afe4abd9593.png)

---

## What You Built

You now have a fully deployed, production-style full-stack application. Here is a summary of every piece you built and what it does:

| Layer | Service | What it does |
| --- | --- | --- |
| Frontend | Next.js + CloudFront | React UI served globally over HTTPS |
| Auth | Amazon Cognito + Amplify | User sign-up, login, and JWT token management |
| API | API Gateway | Routes HTTP requests, validates auth tokens |
| Logic | AWS Lambda (×3) | Creates, reads, and deletes vendors on demand |
| Database | DynamoDB | Stores vendor records with no idle cost |
| Storage | S3 | Holds your built frontend files |
| Infrastructure | AWS CDK | Defines and deploys all of the above as code |

---

## Conclusion

You have built and deployed the foundational pattern of almost every cloud application: a secured API backed by a database, deployed with infrastructure as code. Here is everything you accomplished:

You set up a professional AWS development environment with scoped IAM credentials. You defined your entire backend infrastructure as TypeScript code using AWS CDK, which means your database, API, Lambda functions, and authentication system are all version-controlled, repeatable, and deployable with a single command.

You wrote three Lambda functions that handle create, read, and delete operations, each with proper error handling and the correct AWS SDK v3 patterns. You connected them to a REST API through API Gateway and protected every route with Amazon Cognito authentication, so only registered, verified users can interact with your data.

On the frontend, you built a Next.js application with a service layer that cleanly separates API logic from UI components, manages JWTs automatically through AWS Amplify, and gives users a complete sign-up and sign-in flow without you writing a single line of authentication UI code.

Finally, you deployed the entire system: your backend to AWS Lambda and DynamoDB, and your frontend as a static site served globally through CloudFront over HTTPS.

::: info

The full source code for this tutorial is available on [GitHub (<VPIcon icon="iconfont icon-github"/>`BenedictaUche/vendor-tracker`)](https://github.com/BenedictaUche/vendor-tracker). Clone it, modify it, and use it as a reference for your own projects.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Full-Stack CRUD App with React, AWS Lambda, DynamoDB, and Cognito Auth",
  "desc": "Building a web application that works only on your local machine is one thing. Building one that is secure, connected to a real database, and accessible to anyone on the internet is another challenge ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/full-stack-aws-react-lambda-dynamodb-tutorial.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
