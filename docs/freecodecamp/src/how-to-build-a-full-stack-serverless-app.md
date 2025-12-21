---
lang: en-US
title: "How to Build a Full-Stack Serverless CRUD App using AWS and React"
description: "Article(s) > How to Build a Full-Stack Serverless CRUD App using AWS and React"
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
  - devops
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
      content: "Article(s) > How to Build a Full-Stack Serverless CRUD App using AWS and React"
    - property: og:description
      content: "How to Build a Full-Stack Serverless CRUD App using AWS and React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-full-stack-serverless-app.html
prev: /devops/aws/articles/README.md
date: 2025-10-22
isOriginal: false
author:
  - name: Chisom Uma
    url : https://freecodecamp.org/news/author/ChisomUma123/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761064422167/c0a6b8ed-a500-43f2-820f-42fef5d73275.png
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
  name="How to Build a Full-Stack Serverless CRUD App using AWS and React"
  desc="Imagine running a production application that automatically scales from zero to thousands of users without ever touching a server configuration. That's the power of serverless architecture, and it's easier to implement than you might think. If you're..."
  url="https://freecodecamp.org/news/how-to-build-a-full-stack-serverless-app"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761064422167/c0a6b8ed-a500-43f2-820f-42fef5d73275.png"/>

Imagine running a production application that automatically scales from zero to thousands of users without ever touching a server configuration. That's the power of serverless architecture, and it's easier to implement than you might think.

If you're a junior cloud engineer ready to move beyond theoretical AWS concepts and build something real, this tutorial walks you through creating a complete serverless coffee shop management system.

You'll learn how to architect, deploy, and secure a production-ready application using AWS's most powerful serverless services.

Without further ado, let's get started!

::: note Prerequisites

- Basic knowledge of AWS.
- Basic knowledge of AWS serverless services.
- Knowledge of React (not required).
- Basic knowledge of Postman or other API testing tools.

:::

## Tools We’ll be Using

<SiteInfo
  name="React"
  desc="React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript. React is designed to let you seamlessly combine components written by independent people, teams, and organizations."
  url="https://react.dev/"
  logo="https://react.dev/favicon-16x16.png"
  preview="https://react.dev/images/og-home.png"/>

```component VPCard
{
  "title": "Serverless Function, FaaS Serverless  - AWS Lambda - AWS",
  "desc": "AWS Lambda is a serverless compute service for running code without having to provision or manage servers. You pay only for the compute time you consume.",
  "link": "https://aws.amazon.com/lambda/",
  "logo": "https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico",
  "background": "rgba(22,29,38,0.2)"
}
```

```component VPCard
{
  "title": "Amazon DynamoDB",
  "desc": "Amazon DynamoDB is a fully managed, serverless, key-value NoSQL database that runs high-performance applications at any scale, with built-in security, continuous backups, and automated multi-region replication.",
  "link": "https://aws.amazon.com/dynamodb/",
  "logo": "https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico",
  "background": "rgba(22,29,38,0.2)"
}
```

```component VPCard
{
  "title": "API Management - Amazon API Gateway - AWS",
  "desc": "Amazon API Gateway helps you build HTTP, REST, and WebSocket APIs with a fully managed service that makes it easy to create, publish, maintain, manage, monitor, and secure APIs.",
  "link": "https://aws.amazon.com/api-gateway/",
  "logo": "https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico",
  "background": "rgba(22,29,38,0.2)"
}
```

```component VPCard
{
  "title": "Amazon Cognito",
  "desc": "Customer Identity And Access Management - Amazon Cognito",
  "link": "https://aws.amazon.com/pm/cognito//",
  "logo": "https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico",
  "background": "rgba(22,29,38,0.2)"
}
```

```component VPCard
{
  "title": "CDN Cloud Service - Amazon CloudFront - AWS",
  "desc": "Amazon CloudFront is a content delivery network (CDN) service that helps you distribute your static and dynamic content quickly and reliably with high speed performance, security, and developer ease-of-use.",
  "link": "https://aws.amazon.com/cloudfront/",
  "logo": "https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico",
  "background": "rgba(22,29,38,0.2)"
}
```

---

## What We are Building

We'll build a complete serverless coffee shop management system using AWS cloud services. Coffee shop owners will securely log in through AWS Cognito authentication and have full control over their inventory, adding new products, updating stock levels, viewing current inventory, and removing discontinued items. To follow along with this tutorial, you can clone the repo [here (<VPIcon icon="iconfont icon-github"/>`ChisomUma/aws-serverless-arch-project`)](https://github.com/ChisomUma/aws-serverless-arch-project).

This is what our user interface (UI) looks like:

![image of coffee shop dashboard serverless project](https://cdn.hashnode.com/res/hashnode/image/upload/v1760784475691/8d9ba162-74dd-447d-b627-3e67b8a944ae.png)

---

## Why Serverless?

AWS serverless services like Lambda, Cognito, and API Gateway automatically scale to zero during quiet periods and instantly ramp up when traffic spikes. While 'serverless' might sound like there are no servers at all, this isn't actually the case. It means that AWS handles all the heavy lifting, provisioning, managing, and scaling of the infrastructure behind the scenes. You only pay for what you use.

---

## Architectural Overview

Our architecture uses DynamoDB as the data store, with Lambda functions (enhanced by Lambda layers) handling all API Gateway requests. Cognito secures the API Gateway, while CloudFront CDN delivers everything globally. The React frontend connects directly to the Cognito UserPool and gets hosted on S3 with CloudFront distribution. For production deployments, you can add a custom domain using CloudFlare and AWS Certificate Manager.

---

## Build a Serverless Full-Stack App

In this section, you’ll build a full-stack serverless architecture.

### Step 1: Create a DynamoDB table

To create a DynamoDB table, navigate to your AWS console and select the DynamoDB section. You can do this quickly by typing “DynamoDB” into the AWS search bar and clicking on DynamoDB. Next, follow the steps below to complete your table creation:

1. Click **Create table**.
2. Input table name as “CoffeeShop” or anything you want to name it.
3. Input partition key as “coffeeId” or anything you want to name it.
4. Click **Create table**.

#### Step 1.1: Create items

You need to create items for the table. This helps with testing connectivity to your DynamoDB table.

For our use case, we’ll be creating an item in the table called “coffee” and input attributes such as coffeeId, name, price, and availability. To create an item:

1. Click **Explore items** on the left navigation pane.
2. Click **Create items**.
3. Click the *CoffeeShop* radio button, then click **Create item**.

![image of dynamodb page](https://cdn.hashnode.com/res/hashnode/image/upload/v1760785698166/ee1f5e2d-feef-41de-80d8-eb2c4cad4d04.png)

4. Click **Add new attribute**. This allows you to add different data types such as strings and booleans. The JSON structure below shows the attributes created.

```json
{
  "coffeeId": "c123",
  "name": "new cold coffee",
  "price": 456,
  "available": true
}
```

### Step 2: Create an IAM role for the Lambda function

Next, create a Lambda function that interacts with the DynamoDB table using an IAM role attached to the function. We’ll be setting up an IAM role named "CoffeeShopRole" that serves as a shared execution role for all Lambda functions in the coffee shop application.

This role includes the following permissions:

- **CloudWatch Logs**: Full logging capabilities (create, write, and manage log streams)
- **DynamoDB Access**: Complete read, write, update, and delete operations on the "CoffeeShop" table.

To do this:

1. Navigate to the AWS IAM console.
2. Navigate to **Roles**.
3. Click **Create role**.
4. Select the Lambda service.
5. Search for “AWSLambdaBasicExecutionRole.”
6. Name your role and click **Create role**.

This is what the role looks like:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:DeleteItem",
        "dynamodb:GetItem",
        "dynamodb:Scan",
        "dynamodb:UpdateItem"
      ],
      "Resource": "arn:aws:dynamodb::<DYNAMODB_TABLE_NAME>"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
```

This policy allows us to create CloudWatch logs. Next, create an **inline policy** to allow communications to DynamoDB. Select the following actions for the table:

- Get
- Put
- Update
- Scan
- Delete

Next, connect your table ARN to the policy by navigating to the created table and copying the ARN into the policy.

### Step 3: Create Lambda Layer And Lambda Functions

Now, we need to connect our Lambda function to the DynamoDB table. For this, we’ll need the DynamoDB JavaScript SDK. To get started, create two folders: `lambda` > `get` in your IDE, preferably VS Code. Navigate into these folders in your terminal and run the `npm init` command to initialize your project. Update your <VPIcon icon="iconfont icon-json"/>`package.json` file with this:

```json

{
  "name": "get",
  "type": "module",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": ""
}
```

::: note

Note that we’ll be using [<VPIcon icon="fa-brands fa-firefox"/>ECMAScript](https://developer.mozilla.org/en-US/docs/Glossary/ECMAScript) [<VPIcon icon="fa-brands fa-firefox"/>throughout](https://developer.mozilla.org/en-US/docs/Glossary/ECMAScript) the course of this tutorial.

:::

Next, we have to create a reusable Node.js Lambda layer containing the [<VPIcon icon="fa-brands fa-aws"/>DynamoDB JavaScript SDK](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html) and shared utility functions. This layer acts like a common library that can be attached to multiple Lambda functions, eliminating the need to bundle the same dependencies repeatedly in each function's deployment package.

To use the SDK, create a new folder in your directory titled <VPIcon icon="fa-brands fa-js"/>`index.mjs` and paste in the code below:

```mjs title="index.mjs"
// getCoffee function
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb"; // ESM import
const config = {
  region: "us-east-1",
};
const client = new DynamoDBClient(config);
export const getCoffee = async (event) => {
  const coffeeId = "c123";
  const input = {
    TableName: "CoffeShop",
    Key: {
      coffeeId: {
        S: coffeeId,
      },
    },
  };
  const command = new GetItemCommand(input);
  const response = await client.send(command);
  console.log(response);
  return response;
}
```

The code above is the `getCoffee` function that connects to the DynamoDB table called `CoffeShop`, looks up the coffee with the ID `c123`, and displays its details.

Change `region` to your specific region.

Next, install the Lambda dependencies for the SDK using the command below:

```sh
npm i @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

Then, create a zip file for all the current files using the command below:

```sh
zip -r get.zip ./*
```

This creates a zip file in your project directory. Now, navigate to the Lambda function page on your AWS console and upload this zip file.

Click **Test** to test your application. If you run into an error, edit the Runtime settings and change the handler name to `index.getCoffee`. Deploy and run the code again, you should get a successful response from DynamoDB as shown below:

Response:

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "R14Q5UMTP3K9P9NAF1OGG0IB57VV4KQNSO5AEMVJF66Q9ASUAAJG",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "Item": {
    "available": {
      "BOOL": true
    },
    "price": {
      "N": "34"
    },
    "name": {
      "S": "My New Coffee"
    },
    "coffeeId": {
      "S": "c123"
    }
  }
}
```

Now, let’s make the necessary changes to make our function ready for the API gateway to get the API. When someone requests a coffee using the `/coffee` endpoint, we want the app to returns a list of all coffees. But if the request is made to `/coffee/c123` or `/coffee/id`, then the app returns only details about that specific coffee.

To do this, head back to your <VPIcon icon="fa-brands fa-js"/>`index.mjs` file and paste in the code below:

```mjs title="index.mjs"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.tableName || "CoffeShop";
const createResponse = (statusCode, body) => {
  const responseBody = JSON.stringify(body);
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: responseBody,
  };
};
export const getCoffee = async (event) => {
  const { pathParameters } = event;
  const { id } = pathParameters || {};
  try {
    let command;
    if (id) {
      command = new GetCommand({
        TableName: tableName,
        Key: {
          "coffeeId": id,
        },
      });
    }
    else {
      command = new ScanCommand({
        TableName: tableName,
      });
    }
    const response = await docClient.send(command);
    return createResponse(200, response);
  }
  catch (err) {
    console.error("Error fetching data from DynamoDB:", err);
    return createResponse(500, { error: err.message });
  }
}
```

Run the `zip -r get.zip ./*` command again and re-upload the zip file in your Lambda function page.

This AWS Lambda function implements a serverless API endpoint for retrieving coffee data from a DynamoDB table, using the [<VPIcon icon="fa-brands fa-aws"/>AWS SDK v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/dynamodb/command/GetItemCommand/) to create a document client that can either fetch a specific coffee item by ID (when an `id` parameter is provided in the URL path) or return all items from the table (when no ID is specified, though there's a missing import for `ScanCommand`).

The function extracts the coffee ID from the incoming event's path parameters, constructs the appropriate DynamoDB command (`GetCommand` for single items or `ScanCommand` for all items), executes the database operation, and returns a properly formatted HTTP response with JSON headers and appropriate status codes - either a 200 success response with the coffee data or a 500 error response if something goes wrong during the database operation.

Repeat the steps above for the `create`, `update`, and `delete` functions. You can find these functions in your cloned [project repo (<VPIcon icon="iconfont icon-github"/>`ChisomUma/aws-serverless-arch-project`)](https://github.com/ChisomUma/aws-serverless-arch-project).

### Step 4: Create an API Gateway To Expose Lambda Functions

To create an API that points to the Lambda function:

1. Navigate to **API Gateway** > **Routes** and click **Create.**
2. Create the following endpoints.

```plaintext
GET /coffee  -> getCoffee lambda function
GET /coffee/{id}  -> getCoffee lambda function
POST /coffee  -> createCoffee lambda function
PUT /coffee/{id}  -> updateCoffee lambda function
DELETE /coffee/{id}  -> deleteCoffee lambda function
```

3. Navigate to **Integrations** and create integrations for these endpoints. To do this, go to the **Manage integrations** tab, click **Create,** and select Lambda as the integration target.

Now, in your API Gateway portal, click on `API: CoffeeShop...(random numbers)` and copy the invoke URL for testing, as shown in the image below:

![image of postman interface during testing](https://cdn.hashnode.com/res/hashnode/image/upload/v1760792772732/1d453e97-ce05-4be2-ae6d-d7eb55f86820.png)

The `get` request with an `id` returns a `200 OK` response with the created items in DynamoDB. You can play around with the rest of the endpoints on Postman.

#### Adding Lambda Layer to Solve the Dependency Issue

Before we continue with this tutorial, I’d like to address one problem with the previous steps so far. All functions use the same dependency, but for each function, we had to maintain separate <VPIcon icon="fas fa-folder-open"/>`node_modules` folders and <VPIcon icon="iconfont icon-json"/>`package.json` files. To fix this issue, we’ll be using [<VPIcon icon="fa-brands fa-aws"/>Lamba Layer](https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html). Layer contains all the dependencies, while the functions contain only your code.

To get started:

1. Create a new folder in your IDE called <VPIcon icon="fas fa-folder-open"/>`LambdaWithLayer`.
2. Create two additional folders under the <VPIcon icon="fas fa-folder-open"/>`LambdaWithLayer` named <VPIcon icon="fas fa-folder-open"/>`LambdaFunctionsWithLayer` and <VPIcon icon="fas fa-folder-open"/>`nodejs`.

::: note

You *must* use the name <VPIcon icon="fas fa-folder-open"/>`nodejs` for this to work.

:::

3. Navigate to the <VPIcon icon="fas fa-folder-open"/>`nodejs` folder and initialize using the npm init command.
4. Install dependencies using the command below:

```sh
npm i @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

5. Create a new file called <VPIcon icon="fa-brands fa-js"/>`utils.js` under the <VPIcon icon="fas fa-folder-open"/>`nodejs` folder and paste in the code below:

```js title="utils.js"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand
} from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const createResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
};
export {
  docClient,
  createResponse,
  ScanCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand
};
```

Here, we imported all the commands for our API operations. Now, we can create Lambda Functions without installing the SDK dependencies for each one. For example, you can create a <VPIcon icon="fas fa-folder-open"/>`get` folder under the <VPIcon icon="fas fa-folder-open"/>`LambdaFunctionsWithLayer` folder for the `get` function, then create an <VPIcon icon="fa-brands fa-js"/>`index.mjs` file under the <VPIcon icon="fas fa-folder-open"/>`get` folder. Next, paste the code below:

```mjs title="index.mjs"
import { docClient, GetCommand, ScanCommand, createResponse } from '/opt/nodejs/utils.mjs'; // Import from Layer
const tableName = process.env.tableName || "CoffeShop";
export const getCoffee = async (event) => {
  const { pathParameters } = event;
  const { id } = pathParameters || {};
  try {
    let command;
    if (id) {
      command = new GetCommand({
        TableName: tableName,
        Key: {
            "coffeeId": id,
        },
      });
    }
    else {
      command = new ScanCommand({
        TableName: tableName,
      });
    }
    const response = await docClient.send(command);
    return createResponse(200, response);
  }
  catch (err) {
    console.error("Error fetching data from DynamoDB:", err);
    return createResponse(500, { error: err.message });
  }
}
```

Now we can see that, in the code, we no longer require dependencies for the `get` function. We just imported from the layer.

Repeat the above steps for other functions.

::: note

You can find the code for other functions in [the cloned repo (<VPIcon icon="iconfont icon-github"/>`ChisomUma/aws-serverless-arch-project`)](https://github.com/ChisomUma/aws-serverless-arch-project).

:::

6. Create a zip folder for each function. You can do this by creating a file called <VPIcon icon="iconfont icon-shell"/>`create_zip.sh` under the <VPIcon icon="fas fa-folder-open"/>`LambdaFunctionsWithLayer` folder. Then paste the script below:

```sh title="create_zip.sh"
echo "Creating zip for layer"
zip -r layer.zip nodejs
echo "Creating zip for GET Function"
cd LambdaFunctionsWithLayer/get
zip -r get.zip index.mjs
mv get.zip ../../
cd ../..
echo "Creating zip for POST Function"
cd LambdaFunctionsWithLayer/post
zip -r post.zip index.mjs
mv post.zip ../../
cd ../..
echo "Creating zip for UPDATE Function"
cd LambdaFunctionsWithLayer/update
zip -r update.zip index.mjs
mv update.zip ../../
cd ../..
echo "Creating zip for DELETE Function"
cd LambdaFunctionsWithLayer/delete
zip -r delete.zip index.mjs
mv delete.zip ../../
cd ../..
echo "Success!"
```

Run the script using the `sh create_zip.sh` command. This creates zip files (including a <VPIcon icon="fas fa-file-zipper"/>`layer.zip` file) that you can upload to your AWS Lambda function Layer page.

7. In your AWS Lambda function page, navigate to **Layers** and upload the <VPIcon icon="fas fa-file-zipper"/>`layer.zip` file.
8. Update the functions by uploading the newly created zip files for each code.
9. Add the layer to the function by clicking **Layers** in the function view:

![image of get coffee lambda layer](https://cdn.hashnode.com/res/hashnode/image/upload/v1760793962650/8e797256-af9e-445d-8025-2fbd29dfe87f.png)

Next, click **Add a layer,** then select **Custom layers.** Then choose **“DynamoDBLayer”** and version **“1”**.

10. Click **Add**.
11. Repeat for all the other functions.

### Step 5: Set up React Application And Upload Build To S3 Bucket

To set up our React application, navigate to the `frontend` folder of the cloned repository on your local machine and run `npm install` to install the dependencies. Then run `npm run dev` to start your development environment on your local machine. You should see the preview in your browser at: `http://localhost:5173/`.

![image of coffe list ui](https://cdn.hashnode.com/res/hashnode/image/upload/v1760794168737/0cace684-7f8b-47db-944a-7a642d991ca0.png)

If you inspect the page using [<VPIcon icon="fa-brands fa-chrome"/>Chrome DevTools](https://developer.chrome.com/docs/devtools), you’ll see that we ran into some [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) error:

![image of chrome dev tool console](https://cdn.hashnode.com/res/hashnode/image/upload/v1760794416609/0cd6196e-b7cc-4f61-af5f-77995d6139ec.png)

Now, let’s fix this problem. To do that:

1. Navigate your API Gateway page.
2. Click on **CORS** on the left navigation panel.
3. Click **Configure**.
4. Copy your `localhost` URL and paste it into the **Access-Control-Allow-Origin** field.

![image of cors configuration](https://cdn.hashnode.com/res/hashnode/image/upload/v1760794511537/26a1917b-16ae-48bc-a786-b36c6bb31490.png)

Ensure to remove the `/` at the end of your URL as shown in the image above.

5. Click **Add**.
6. Enter the **Access-Control-Allow-Headers** field with the text content-type and click **Add**.
7. Include `GET`, `POST`, `OPTIONS`, `PUT`, and `DELETE` in **Access-Control-Allow-Methods.**
8. Click **Save**.

Now it returns our coffee, and the CORS error has been resolved.

![image of solved cors error](https://cdn.hashnode.com/res/hashnode/image/upload/v1760794692165/7d53573d-f2e0-456d-a1da-0d06265d78a9.png)

When you add a new coffee, you should see the newly created items in your DynamoDB database.

### Step 6: Set up Amazon API Gateway Authorizer

AWS Congnito helps you secure your Amazon API Gateway. Gateway validates the access token with Amazon Cognito to ensure it is valid and has not expired, and grants or denies access based on token validity.

To get started:

1. Navigate to **Amazon Cognito > User pools**.
2. Click **Create user pool**.
3. Select **Single-page application (SPA)**.
4. Select email as the preferred sign-in and sign-up method.
5. Use `http://localhost:5174/` or your own local URL as the return URL.
6. Click **Create user directory**.

You’ll be presented with a page containing code that we can copy and paste into our app for integration. But before we do that, let's head back to API Gateway and integrate it with Cognito. To do that:

1. Go to the Authorization section in API Gateway.
2. Navigate to **Manage authorizers**.
3. Click **Create**.
4. Select JWT and name it “Cognito-CoffeeShop”
5. Copy your issuer URL from Cognito Overview. Your issuer URL is the *Token signing key URL*. If you click on the URL, you’ll be taken to your browser, where you'll see the keys that’ll be used for verification.
6. For the Audience, navigate to the Cognito user pool, then to App clients, and select CoffeShopClient. Copy the Client ID.
7. Click **Create**.
8. Go to Routes and add authorizations to each endpoint.

Now, to integrate with our front-end app:

Navigate into the frontend folder and run the command below:

```sh
npm install oidc-client-ts react-oidc-context --save
```

2. Go to the **App clients** section in Cognito user pools to find the readily available code snippets for integration.
3. Edit your <VPIcon icon="fa-brands fa-react"/>`main.jsx` file to include the code below:

```jsx title="main.jsx"
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import ItemDetails from "./ItemDetails";
import { AuthProvider } from "react-oidc-context";
const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_rXq7q3KLm",
  client_id: "6fjfrlaup7oph5lhf1q8q6pnp4",
  redirect_uri: "http://localhost:5174",
  response_type: "code",
  scope: "email openid phone",
};
createRoot(document.getElementById('root')).render(
  <AuthProvider {...cognitoAuthConfig}>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/details/:id" element={<ItemDetails />} />
        </Routes>
      </div>
    </Router>
  </AuthProvider>
)
```

Here, we imported `AuthProvider` from `react-oidc-context`, then wrapped our app with `AuthProvider`. Then, move the code in the <VPIcon icon="fa-brands fa-react"/>`App.jsx` file to a newly created <VPIcon icon="fa-brands fa-react"/>`Home.jsx` file, and update <VPIcon icon="fa-brands fa-react"/>`App.jsx` file with the code below:

```jsx title="App.jsx"
import { useEffect, useState } from "react";
import "./App.css";
import { useAuth } from "react-oidc-context";
function App() {
  const auth = useAuth();
  const signOutRedirect = () => {
    const clientId = "6fjfrlaup7oph5lhf1q8q6pnp4";
    const logoutUri = "http://localhost:5174/";
    const cognitoDomain = "https://us-east-1rxq7q3klm.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }
  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }
  if (auth.isAuthenticated) {
    return (
      <div>
        <button onClick={() => auth.removeUser()}>Sign out</button>
        <Home />
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}
export default App;
```

Now, when you run the application again, you should see this login page on your browser:

![Sign in and Sign out buttons](https://cdn.hashnode.com/res/hashnode/image/upload/v1760795002733/2be7ce35-ecff-41bb-adff-ed13c7a33a32.png)

When you click on Sign in, you’ll get directed to the Sign in page. Click Sign up. You should see the page below to create your account.

![Sign in page with a form](https://cdn.hashnode.com/res/hashnode/image/upload/v1760795104086/41c44c85-881d-482c-ae1f-d84f1ea76fb5.png)

During sign-up, a verification code is sent to your sign-up email. Once you’re logged in, you can then access your coffee dashboard.

### Step 7: Create Cloudfront Distribution With Behaviors For S3 And API Gateway

To create a distribution.

1. Navigate to **CloudFront**.
2. Click **Create distribution**.
3. In the Origin page, select the S3 bucket and browse through your created S3 buckets.
4. Select your coffee shop bucket.
5. Set origin path to <VPIcon icon="fas fa-folder-open"/>`/dist`.
6. Select *Origin access control* under **Origin access**.
7. Update your React code and AWS Cognito with the distribution domain name provided in the CloudFront log-in pages tab.

### Step 8: Set up React Application And Upload Build To S3 Bucket

In this step, we’ll be building our React application and uploading the static files to an Amazon S3 bucket, which is then served from a CloudFront distribution.

To get started:

1. Create an S3 bucket and give it the name “mycoffeeShop123new”. This name should be globally unique across all AWS accounts.
2. In the frontend folder, run the `npm run build` command. This creates a <VPIcon icon="fas fa-folder-open"/>`dist` folder in your directory.
3. Head back to the S3 bucket and drag-and-drop the <VPIcon icon="fas fa-folder-open"/>`dist` folder into S3 to upload it.
4. Click **Upload**.

Now, copy your CloudFront distribution URL and try to access your site in a private browser, for example, Chrome incognito. You should see your site live in the browser.

---

## Troubleshooting Access Denied Error

You may encounter an access denied error in the browser:

```xml
<Error>
  <Code>AccessDenied</Code>
  <Message>Access Denied</Message>
</Error>
```

It may be because of a likely S3 + CloudFront configuration error. Here are the steps to resolve this issue:

### Step 1: Set up Origin Access Control (OAC)

1. Go to **CloudFront > Your Distribution > Origins tab.**
2. Select your S3 origin and click **Edit.**
3. Under **Origin access**, select **Origin access control settings (recommended)**
4. Click **Create new OAC** (or select an existing one).
5. Click **Save changes.**

### Step 2: Update S3 Bucket Policy

After saving, CloudFront will show you a **"Copy Policy"** button. Click it, then:

1. Go to your S3 bucket > **Permissions** tab.
2. Scroll to **Bucket policy** and click **Edit.**
3. Paste the copied policy (it should look like this):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
          "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*",
      "Condition": {
        "StringEquals": {
            "AWS:SourceArn": "arn:aws:cloudfront::YOUR-ACCOUNT-ID:distribution/YOUR-DISTRIBUTION-ID"
          }
      }
    }
  ]
}
```

4. Click **Save changes.**

### Step 3: Set Default Root Object

1. Go back to **CloudFront > Your Distribution > General** tab.
2. Click **Edit.**
3. Set **Default root object** to <VPIcon icon="fa-brands fa-html5"/>`index.html`.
4. Save changes.

Now, try accessing the site again. It should work.

This brings us to the end of this tutorial. I hope you were able to learn a thing or two about building serverless systems.

---

## Conclusion

Congratulations! You've just built a production-ready serverless application from the ground up. You've successfully architected a complete CRUD system that automatically scales, stays secure with Cognito authentication, and costs you only what you actually use.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Full-Stack Serverless CRUD App using AWS and React",
  "desc": "Imagine running a production application that automatically scales from zero to thousands of users without ever touching a server configuration. That's the power of serverless architecture, and it's easier to implement than you might think. If you're...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-full-stack-serverless-app.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
