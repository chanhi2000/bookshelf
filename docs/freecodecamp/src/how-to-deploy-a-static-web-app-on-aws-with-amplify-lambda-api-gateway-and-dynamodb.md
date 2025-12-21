---
lang: en-US
title: "How to Deploy a Static Web App on AWS with Amplify, Lambda, API Gateway, & DynamoDB"
description: "Article(s) > How to Deploy a Static Web App on AWS with Amplify, Lambda, API Gateway, & DynamoDB"
icon: fa-brands fa-aws
category:
  - DevOps
  - Amazon
  - AWS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - amazon
  - aws
  - amazon-web-services
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Deploy a Static Web App on AWS with Amplify, Lambda, API Gateway, & DynamoDB"
    - property: og:description
      content: "How to Deploy a Static Web App on AWS with Amplify, Lambda, API Gateway, & DynamoDB"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-deploy-a-static-web-app-on-aws-with-amplify-lambda-api-gateway-and-dynamodb.html
prev: /devops/aws/articles/README.md
date: 2025-07-18
isOriginal: false
author:
  - name: Raju Manoj
    url : https://freecodecamp.org/news/author/rajumanoj/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752792908077/abfe8200-e4bd-4c3c-892f-15847715c918.png
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

[[toc]]

---

<SiteInfo
  name="How to Deploy a Static Web App on AWS with Amplify, Lambda, API Gateway, & DynamoDB"
  desc="Building modern web applications often involves complex setups and managing servers - but it doesn't have to be that way. Amazon Web Services (AWS) offers a powerful suite of ”serverless” services that allow you to build and deploy applications witho..."
  url="https://freecodecamp.org/news/how-to-deploy-a-static-web-app-on-aws-with-amplify-lambda-api-gateway-and-dynamodb"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1752792908077/abfe8200-e4bd-4c3c-892f-15847715c918.png"/>

Building modern web applications often involves complex setups and managing servers - but it doesn't have to be that way. Amazon Web Services (AWS) offers a powerful suite of "serverless" services that allow you to build and deploy applications without having to worry about the underlying infrastructure. This means AWS handles all the heavy lifting of servers, scaling, and maintenance for you.

In this tutorial, we'll walk you through building a simple yet fully functional web application using several key AWS serverless services. You'll learn how to connect a frontend (what users see) with a powerful backend (what processes data) that can scale automatically and efficiently.

---

## What We'll Build: A Serverless Sum Calculator

We're going to create a straightforward **Sum Calculator web application**. This app will allow users to enter two numbers, send them to our AWS backend for calculation, store the result, and then display the sum back to the user.

::: note Here's how our calculator will work

- **First, it’ll take user input**: You'll enter two numbers into a simple web page.
- **Then the backend magic happens with AWS Lambda**: These numbers will be sent to a special piece of code running on AWS Lambda, which will add them together.
- **Next, the data is stored using DynamoDB**: The calculation details (the two numbers, their sum, and when it happened) will be saved in a super-fast database called DynamoDB.
- **Finally, it displays the results**: The sum will be sent back to your web page and shown to you.

:::

This project is a fantastic way to understand the core concepts of serverless architecture and how different AWS services work together to create a dynamic web application.

---

## Core AWS Services We'll Use

Before we dive in, let's get familiar with the main AWS services we'll be using. Think of them as specialized tools, each with its own job, working together to build our app.

### 1. AWS Lambda

Imagine you have a tiny robot that only activates when it's given a specific task. That's Lambda! It's a "serverless compute" service, meaning you don't manage any servers. You just upload your code (our calculator logic, in this case), and Lambda runs it only when needed.

::: important Why we use it

It handles our backend math (adding numbers). When a user asks for a sum, Lambda "wakes up," does the calculation, and then goes back to sleep. This is efficient and cost-effective because you only pay for the time your code is actually running.

:::

### 2. Amazon API Gateway

Think of this as the doorman or receptionist for your backend. When your web page wants to talk to your Lambda function, it doesn't talk directly. Instead, it sends a request to API Gateway.

::: important Why we use it

API Gateway securely receives requests from our web page (like "Please sum these two numbers") and then tells the correct Lambda function to wake up and handle it. It acts as the secure entry point to our backend, making sure only authorized requests get through.

:::

### 3. Amazon DynamoDB

This is our super-fast, flexible database. Unlike traditional databases that are like filing cabinets, DynamoDB is a NoSQL (Not Only SQL) database, which is great for handling large amounts of data quickly and efficiently without a fixed structure.

::: important Why we use it

We'll use DynamoDB to store the history of our calculations (the numbers entered and their sums). It's designed to handle massive amounts of traffic without slowing down, making it perfect for web applications that need to store and retrieve data quickly.

:::

### 4. AWS Amplify

Amplify is like your personal construction crew for web and mobile apps. It simplifies the process of building, deploying, and hosting your frontend application, and it integrates seamlessly with other AWS services.

::: important Why we use it

We'll use Amplify to host our simple HTML, CSS, and JavaScript web page. It provides an easy way to get our website live on the internet, handling all the complex deployment steps for us.

:::

::: note Prerequisites: What You'll Need

To follow along with this tutorial, you should have:

- **An AWS account**: This is essential to access all the AWS services. If you don't have one, you can sign up for a free tier account on the AWS website.
- **Basic knowledge of Python**: Our backend logic will be written in Python.
- **Understanding of REST APIs**: Knowing what an API (Application Programming Interface) is and how RESTful APIs work will be helpful, but we'll explain the key parts.
- **Familiarity with HTML/CSS/JavaScript**: Our frontend will be built using these standard web technologies.
- **Basic knowledge of NoSQL**: While not strictly required, understanding the concept of key-value pairs in databases can be beneficial.

:::

Let's get started!

---

## Getting Started: How to Build Our Serverless Web App

We'll build our application step-by-step, starting with the database, then our backend code, connecting them with an API, and finally, deploying our frontend.

### Step 1: Set Up Your Database with Amazon DynamoDB

Our calculator needs a place to store the results of its calculations. For this, we'll use Amazon DynamoDB. You can follow these steps to get it all set up:

#### 1. Navigate to the DynamoDB Console

First, log in to your AWS Management Console. In the search bar at the top, type "DynamoDB" and select "DynamoDB" from the results. This will take you to the DynamoDB dashboard.

#### 2. Create a New Table

On the DynamoDB dashboard, look for and click the **"Create table"** button.

![Figure 1: Creating a new table in the DynamoDB console.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752056336365/33bf0598-da2e-45b9-9211-833bcd447ca9.png)

#### 3. Configure Your Table

You’ll need to add the following information for the table:

- **Table name**: Enter `myTable`. This will be the name of our database table.
- **Partition key**: Enter `ID`.

But you might be wondering - what is a Partition Key? In DynamoDB, the "Partition Key" (also sometimes called a Hash Key) is like the primary identifier for each unique item in your table. Think of it as a unique ID number for each record. It helps DynamoDB quickly find and distribute your data. For our calculator, each calculation we store will get a unique `ID`.

Leave all other settings at their default values for this tutorial. These defaults are usually sufficient for basic use cases.

![Figure 2: Configuring the 'myTable' with 'ID' as the Partition Key.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752053498063/05a9db73-0df6-4679-b2bd-6eab52f93a6b.png)

#### 4. Finalize Table Creation

Click the **"Create table"** button at the bottom of the page. DynamoDB will now create your table, which usually takes a few seconds.

#### 5. Important: Note Down the Table ARN (Amazon Resource Name)

Once your table is created, click on its name (`myTable`) in the list to go to its details page. Under the "Summary" tab, you will find a section that displays the **"ARN"**. This is a unique identifier for your DynamoDB table across AWS.

**Copy this entire ARN and save it somewhere safe (like a notepad).** We will need it later when we set up permissions for our Lambda function.

![Figure 3: Locating and copying the ARN for your DynamoDB table.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752053703489/be90f79a-38cd-42c6-b014-e0be229384fa.png)

### Step 2: Creating Your Backend Logic with AWS Lambda

Now that we have our database, let's create the brain of our operation: the Lambda function that will perform the addition and save the results.

#### 1. Navigate to the Lambda Console

In the AWS Management Console search bar, type "Lambda" and select "Lambda" from the results. This will take you to the Lambda dashboard.

Then create a new function by clicking the **"Create function"** button on the dashboard.

#### 2. Configure the Function

Now, it’s time to configure your function:

- **Author from scratch**: Ensure this option is selected.
- **Function name**: Give your function a meaningful name, for example, `SumCalculatorFunction` or `AddFunc`.
- **Runtime**: This specifies the programming language your code is written in. For this tutorial, select **"Python 3.9"** (or the latest Python 3.x runtime available).
  - **Note**: Always choose a runtime that matches the code you're going to write!
- **Architecture**: Leave as `x86_64` (default).
- **Permissions**: For now, you can leave the default execution role. We will modify its permissions shortly.

![Figure 4: Configuring your Lambda function's name and runtime.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752053897286/6873bb14-d94e-4857-be6c-2964c21f7759.png)

#### 3. Create the Function

Next, create the function by clicking the **"Create function"** button at the bottom.

#### 4. Write Lambda Function Code

Now it’s time to write your Lambda Function code. Once your function is created, you'll be taken to its configuration page. Scroll down to the **"Code source"** section. This is where you'll write or paste your Python code.

You'll see a default <VPIcon icon="fa-brands fa-python"/>`lambda_function.py` file. Replace its contents with the following Python code:

```py :collapsed-lines title="lambda_function.py"
import json
import boto3
import time
from botocore.exceptions import ClientError

# Create a DynamoDB client. This line creates a connection to the DynamoDB service.
# 'boto3' is the AWS SDK for Python, allowing our Python code to talk to AWS services.
dynamodb = boto3.resource('dynamodb')
# Specify the DynamoDB table we want to interact with. Make sure 'myTable' matches the name you created.
table = dynamodb.Table('myTable')

# This is the main function that Lambda will run when it's triggered.
# 'event' contains the data sent to our Lambda function (e.g., the numbers from our frontend).
# 'context' provides runtime information about the invocation, function, and execution environment.
def lambda_handler(event, context):
    # Extract the numbers from the 'event' data.
    # .get() is used to safely retrieve values, returning None if the key doesn't exist.
    num1 = event.get('num1')
    num2 = event.get('num2')

    # Basic validation: Check if both numbers were provided.
    if num1 is None or num2 is None:
        # If not, return an error message with a 400 (Bad Request) status code.
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Both num1 and num2 are required'})
        }

    # Calculate the sum of the two numbers.
    sum_result = num1 + num2

    # Generate a unique ID for our DynamoDB item.
    # We use a timestamp (current time in milliseconds) to ensure uniqueness.
    partition_key = str(int(time.time() * 1000))

    # Generate a Sort Key (optional, but good practice for more complex data models).
    # Here, we're using a timestamp as well, but you could use other meaningful data.
    sort_key = str(int(time.time()))

    # Prepare the data (item) to be stored in our DynamoDB table.
    # Each key-value pair here represents an attribute in our database record.
    item = {
        'ID': partition_key,  # This matches our Partition Key in DynamoDB
        'Timestamp': sort_key, # An additional attribute to track when the calculation happened
        'num1': num1,
        'num2': num2,
        'sum': sum_result
    }

    # Attempt to store the item in the DynamoDB table.
    try:
        table.put_item(Item=item) # 'put_item' is the DynamoDB operation to add a new item.
    except ClientError as e:
        # If there's an error storing data (e.g., permission issues), return a 500 error.
        return {
            'statusCode': 500,
            'body': json.dumps({'message': f'Error storing data in DynamoDB: {e.response["Error"]["Message"]}'})
        }

    # If everything was successful, return a success message and the calculation details.
    # The 'statusCode: 200' indicates success.
    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'Sum calculated and stored successfully',
            'result': {
                'ID': partition_key,
                'Timestamp': sort_key,
                'num1': num1,
                'num2': num2,
                'sum': sum_result
            }
        })
    }
```

I’ve added a lot of comments to the code, but here’s what’s going on in summary:

- `import json, boto3, time, ClientError`: These lines bring in necessary Python modules.
  - `boto3` is crucial for interacting with AWS services like DynamoDB.
  - `json` helps us work with data in JSON format, which is common for web APIs.
  - `time` is used to generate unique IDs.
  - `ClientError` helps us catch specific AWS errors.
- `dynamodb = boto3.resource('dynamodb')`: This line creates a connection object to the DynamoDB service.
- `table = dynamodb.Table('myTable')`: This specifies which DynamoDB table (the one we just created) our Lambda function will work with.
- `lambda_handler(event, context)`: This is the special function that AWS Lambda automatically calls when your function is triggered.
  - `event`: Contains all the information about the trigger. In our case, it will contain the `num1` and `num2` sent from our web frontend.
  - `context`: Provides runtime information about the Lambda function.
- `num1 = event.get('num1')`, `num2 = event.get('num2')`: These lines safely extract the numbers `num1` and `num2` from the incoming `event` data.
- `if num1 is None or num2 is None:`: This is a basic check to make sure both numbers were actually provided. If not, it sends back an error message.
- `sum_result = num1 + num2`: This is where the actual sum calculation happens.
- `partition_key = str(int(time.time() * 1000))`: This creates a unique `ID` for each record. We use the current timestamp (in milliseconds) to ensure it's always unique.
- `item = {...}`: This dictionary defines the data structure for the item we want to save into our `myTable` in DynamoDB.
- `table.put_item(Item=item)`: This is the core line that tells DynamoDB to save our `item` into the `myTable` table. It's wrapped in a `try-except` block to catch any errors during the database operation.
- `return { 'statusCode': 200, 'body': json.dumps({...}) }`: This is the response our Lambda function sends back to whoever called it (which will be API Gateway, and then our web frontend). A `statusCode` of `200` means success. The `body` contains the message and the result of the calculation in JSON format.

![Screenshot of Lambda code editor with the Python code pasted in](https://cdn.hashnode.com/res/hashnode/image/upload/v1752053964053/037e2788-b43f-4f43-bc9a-65417001d353.png)

Figure 5: Entering the Python code for your Sum Calculator Lambda function.

#### 5. Deploy the Code

Now it’s time to deploy your code. After pasting in the code, click the **"Deploy"** button above the code editor. This saves your changes and makes them active.

#### 6. Test the Lambda Function

And finally, once the code is deployed, you’ll want to test your Lambda Function (this is optional but recommended). Click the **"Test"** button next to the "Deploy" button. You'll be prompted to configure a test event.

Choose "New event" and for the "Event template", select "hello-world" (or leave it as default if "hello-world" isn't an option). Replace the sample JSON in the "Event JSON" box with the following test data:

```json
{ "num1": 5, "num2": 10 }
```

Give your test event a name (for example, `testSum`). Then click **"Save"** and then **"Test"**. You should see a "Status: Succeeded" message and in the "Execution result" tab, you'll see a `statusCode: 200` and the calculated sum in the `body`. This confirms your Lambda function is working correctly!

![Figure 6: We can see 200 ok after the test and deploy of your Lambda function.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752054962119/650bee28-fcd3-416d-9e19-0784274b8210.png)

### Updating Lambda Function Permissions (IAM Role Policy)

Our Lambda function currently has default permissions, which usually don't include access to DynamoDB. We need to explicitly grant it permission to *write* data to our `myTable`. We’ll do this through an IAM (Identity and Access Management) role policy.

#### 1. Navigate to Permissions

On your Lambda function's configuration page, click on the **"Configuration"** tab. Then, select the **"Permissions"** sub-tab.

You will see an **"Execution role"** section with a "Role name". Click on this **"Role name"** (it will be a link). This will take you to the IAM console, specifically to the details of the role associated with your Lambda function.

![Figure 7: Locating the IAM role associated with your Lambda function.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752054336167/bcb46506-a95b-47f0-b629-3a8ac9024819.png)

#### 2. Add Permissions

On the IAM role's page, you'll see a section titled "Permissions policies". Click on **"Add permissions"** and then select **"Create inline policy"**. An "inline policy" is a policy that is embedded directly into a specific IAM identity (in this case, our Lambda's execution role).

![Figure 8: Adding an inline policy to the Lambda function's IAM role.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752056539801/500c1465-91dc-49cc-b313-93ddf314142e.png)

#### 3. Configure the Policy

You'll be presented with a **"Policy editor"**. Click on the **"Visual editor"** tab (if not already selected).

- **Service**: Click on **"Choose a service"** and search for and select **"DynamoDB"**.
- **Actions**: In the "Actions" section, expand "Write". We need to give our Lambda function permission to "put" items into DynamoDB.
  - Search for `PutItem` and select the checkbox next to `PutItem`. **Why** `PutItem`? Our Python code uses `table.put_item(Item=item)` to store data. This `PutItem` action directly corresponds to that operation.
- **Resources**: This is crucial! We need to specify *which* DynamoDB table our Lambda function is allowed to write to.
  - Click on **"Specific"** under the "Resources" section.
  - Click **"Add ARN"** next to "table".
  - In the pop-up, paste the **DynamoDB Table ARN** you copied earlier from Step 1.
  - Click **"Add ARN"** again in the pop-up to confirm.

![Figure 9: Configuring the IAM policy to allow Lambda to perform `PutItem` actions on your DynamoDB table.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752056582357/10454e95-e63c-456f-905b-34cb7b8374ab.png)

#### 4. Review and Create Policy

Click **"Next: Tags"** (if applicable, skip tags). Then click **"Next: Review policy"**. Give your policy a meaningful name, for example, `DynamoDBPutItemPolicy`.

Review the policy JSON to ensure it grants `dynamodb:PutItem` permission on your specific `myTable` ARN. Then click **"Create policy"**.

Your Lambda function now has the necessary permissions to write to your DynamoDB table!

### Step 3: Connect the Frontend to the Backend with Amazon API Gateway

Now that we have our Lambda function ready, we need a way for our web page to talk to it. That's where API Gateway comes in.

In the AWS Management Console search bar, type "API Gateway" and select "API Gateway" from the results.

#### 1. Create a New API

On the API Gateway dashboard, under "REST API" (not Private, WebSocket, or HTTP API), click the **"Build"** button.

![Figure 10: Starting the creation of a new REST API in API Gateway.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752057747903/36c55082-2cac-4f05-831c-610186857a92.png)

#### 2. Configure API Settings

- **Choose the protocol**: Select `REST`.
- **Create new API**: Select `New API`.
- **API name**: Give your API a clear name, e.g., `SumCalculatorAPI`.
- **Endpoint Type**: Choose `Regional` (default).

Then click **"Create API"**.

#### 3. Create a Resource

After creating the API, you'll be taken to its dashboard. From the "Actions" dropdown menu, select **"Create Resource"**.

- **Resource Name**: You can leave this as `calculator` or whatever makes sense. For a simple calculator endpoint, we can even leave it empty, and just work with the root `/` path. Let's keep it simple for now, and apply the method directly to the root resource (`/`). If you're building a more complex API with many functions, creating specific resources is good practice.
- **Path Part**: Leave as `/` (root path).

Then click **"Create Resource"**.

#### 4. Create a Method (POST)

With the root resource (`/`) selected in the left navigation panel, from the **"Actions"** dropdown menu, select **"Create Method"**.

Choose **"POST"** from the dropdown that appears and click the checkmark button next to it. We use a `POST` request because we are *sending* data (the two numbers) to the server to create a new calculation record (or perform an action that changes data).

Here are the setup details:

- **Integration type**: Select `Lambda Function`.
- **Use Lambda Proxy integration**: Check this box.
  - **What is Lambda Proxy Integration?** This tells API Gateway to send the entire incoming request (headers, body, query parameters) directly to your Lambda function as part of the `event` object, and also to take the entire response from Lambda and pass it back directly to the client. It simplifies the setup because you don't have to map specific request/response fields.
- **Lambda Region**: Select the AWS region where you created your Lambda function (e.g., `us-east-1` if you used that).
- **Lambda Function**: Start typing the name of your Lambda function (e.g., `SumCalculatorFunction` or `AddFunc`) and select it from the dropdown list.

Then click **"Save"**. You'll likely get a pop-up asking to confirm adding permissions to Lambda. Click **"OK"**. This automatically grants API Gateway permission to invoke your Lambda function.

![Figure 11: Configuring the POST method to integrate with your Lambda function.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752057684772/72eb9071-8ba1-42a2-9a34-60d4268ac77e.png)

#### 5. Enable CORS (Cross-Origin Resource Sharing):

This is a crucial step! Our frontend (which will be hosted on AWS Amplify, a different domain) needs permission to talk to our API Gateway endpoint. CORS is a security feature built into web browsers that prevents web pages from making requests to a different domain than the one they originated from, unless explicitly allowed.

With the root resource (`/`) still selected, from the **"Actions"** dropdown menu, select **"Enable CORS"**. A dialog box will appear. You can usually accept the default settings for this simple app. Ensure `POST` is selected under "Methods" and that "Access-Control-Allow-Origin" is set to `'*'` (meaning any origin is allowed, which is fine for a public demo).

Then click **"Enable CORS and replace existing CORS headers"**. Click **"Yes, replace existing values"** when prompted.

![Figure 12: Enabling CORS for your API Gateway endpoint to allow frontend access.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752057812238/0babb26e-2808-47f9-b6a8-50d31bb84ca9.png)

#### 6. Deploy Your API

Changes made to API Gateway methods aren't live until the API is "deployed" to a "stage." From the **"Actions"** dropdown menu, select **"Deploy API"**.

- **Deployment stage**: Select **"[New Stage]"**.
- **Stage name**: Give your stage a name, for example, `dev` (for development), `prod` (for production), and so on. `dev` is a good choice for this tutorial.
- **Stage description**: (Optional) Add a description like "Development stage for calculator API."

Then click **"Deploy"**.

![Figure 13: Deploying your API to a new stage called 'dev'.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752057834205/5de98b6c-f128-4dc6-ab68-9af65f8b8318.png)

#### 7. Note Down the Invoke URL:

After deployment, you'll be taken to the "Stages" view. Click on your newly created stage (for example, `dev`) in the left navigation panel.

You will see an **"Invoke URL"**. This is the public URL of your API endpoint.

**Copy this entire Invoke URL and save it somewhere safe. This is the URL our frontend will use to send numbers to our Lambda function!** It will look something like `https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev`.

![Screenshot of API Gateway Stages page with the "Invoke URL" ](https://cdn.hashnode.com/res/hashnode/image/upload/v1752057869112/ec23f6bb-b885-4a44-b135-3a48c76fa93b.png)

Figure 14: Copying the Invoke URL for your deployed API.

### Step 4: Create Your Frontend Web Application

Now that our backend is ready to receive requests and process calculations, let's build the simple web page that users will interact with. We'll use basic HTML, CSS, and JavaScript.

You'll need to create three files in a new folder on your computer: <VPIcon icon="fa-brands fa-html5"/>`index.html`, <VPIcon icon="fa-brands fa-js"/>`app.js`, and <VPIcon icon="fa-brands fa-css3-alt"/>`style.css`.

#### 1. <VPIcon icon="fa-brands fa-html5"/>`index.html` (The Structure of Our Web Page)

This file defines the basic layout and content of our calculator.

```html :collapsed-lines title="index.html"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Sum Calculator</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>SUM CALCULATOR</h1>

    <form id="calculatorForm">
      <label for="num1">Number 1:</label>
      <input type="number" id="num1" required />

      <label for="num2">Number 2:</label>
      <input type="number" id="num2" required />

      <button type="submit" id="calculateBtn">
        <span id="btnText">CALCULATE</span>
        <span id="loadingSpinner" class="spinner d-none"></span>
      </button>
    </form>

    <div id="errorAlert" class="alert d-none">
      <strong style="color: red">Error!</strong> <span id="errorMessage"></span>
    </div>

    <div id="resultSection" class="result-box d-none">
      <h2>Calculation Result:</h2>
      <p><strong>Transaction ID:</strong> <span id="resultId"></span></p>
      <p><strong>Timestamp:</strong> <span id="resultTimestamp"></span></p>
      <p>
        <strong>Numbers:</strong> <span id="resultNum1"></span> +
        <span id="resultNum2"></span>
      </p>
      <p><strong>Sum:</strong> <span id="resultSum"></span></p>
    </div>

    <script src="app.js"></script>
  </body>
</html>

```

::: info HTML code explanation

- `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`: These are standard HTML boilerplate tags that define the document structure.
- `<title>Sum Calculator</title>`: Sets the title that appears in the browser tab.
- `<link rel="stylesheet" href="style.css">`: This line links our HTML file to our <VPIcon icon="fa-brands fa-css3-alt"/>`style.css` file, which will make our page look nice.
- `<h1>SUM CALCULATOR</h1>`: The main heading of our page.
- `<form id="calculatorForm">`: This is the container for our input fields and button. The `id="calculatorForm"` allows our JavaScript to easily find and interact with this form.
- `<label for="num1">`, `<input type="number" id="num1" required>`: These create labels and input boxes where users can type numbers. `type="number"` ensures only numbers can be entered, and `required` means the field must be filled.
- `<button type="submit" id="calculateBtn">`: This is the button that, when clicked, will trigger our JavaScript to send data to the API. `type="submit"` means it's part of a form submission.
- `<span id="btnText">CALCULATE</span>`, `<span id="loadingSpinner" class="spinner d-none"></span>`: These are for managing the text on the button and showing a little spinner animation when the calculation is in progress. `d-none` initially hides the spinner.
- `<div id="errorAlert" ...>`: A hidden section to display any error messages.
- `<div id="resultSection" ...>`: A hidden section to display the results of a successful calculation. We use `<span>` tags with IDs inside to update specific pieces of information (like `resultId`, `resultSum`, and so on) using JavaScript.
- `<script src="app.js"></script>`: This line links our HTML file to our <VPIcon icon="fa-brands fa-js"/>`app.js` file. This is where all the interactive logic for our calculator will reside. It's placed at the end of the `<body>` so that the HTML elements are fully loaded before the JavaScript tries to access them.

:::

#### 2. <VPIcon icon="fa-brands fa-js"/>`app.js` (The Brains of Our Frontend)

This JavaScript file handles the interaction on the web page: getting numbers, sending them to our API, and displaying the results or errors.

**Remember to replace** `<YOUR Invoke URL>` with the actual Invoke URL you copied from API Gateway in Step 3 above!

```js :collapsed-lines title="app.js"
document.addEventListener('DOMContentLoaded', function () {
  // Define the API endpoint. REPLACE THIS WITH YOUR ACTUAL API GATEWAY INVOKE URL!
  const API_ENDPOINT = 'https://YOUR_API_GATEWAY_INVOKE_URL_HERE.execute-api.us-east-1.amazonaws.com/dev'; // Example: https://5nur6rhsjb.execute-api.us-east-1.amazonaws.com/dev

  // Get references to our HTML elements so we can interact with them.
  const calculatorForm = document.getElementById('calculatorForm');
  const num1Input = document.getElementById('num1');
  const num2Input = document.getElementById('num2');
  const calculateBtn = document.getElementById('calculateBtn');
  const btnText = document.getElementById('btnText');
  const loadingSpinner = document.getElementById('loadingSpinner');
  const errorAlert = document.getElementById('errorAlert');
  const errorMessage = document.getElementById('errorMessage');
  const resultSection = document.getElementById('resultSection');

  // References to the elements where we'll display the results.
  const resultId = document.getElementById('resultId');
  const resultTimestamp = document.getElementById('resultTimestamp');
  const resultNum1 = document.getElementById('resultNum1');
  const resultNum2 = document.getElementById('resultNum2');
  const resultSum = document.getElementById('resultSum');

  // Listen for when the calculator form is submitted (i.e., when the "CALCULATE" button is clicked).
  calculatorForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior (which would refresh the page).

    // Hide any previous error messages or results before a new calculation.
    errorAlert.classList.add('d-none'); // 'd-none' is a class (from our CSS) to hide elements.
    resultSection.classList.add('d-none');

    // Get the values entered by the user in the input fields and convert them to numbers.
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);

    // Basic input validation: Check if the values are actually numbers.
    if (isNaN(num1) || isNaN(num2)) {
      showError('Please enter valid numbers'); // Display an error if inputs are not numbers.
      return; // Stop the function here.
    }

    // Show a loading state on the button to indicate that a calculation is in progress.
    setLoadingState(true);

    // Prepare the data to be sent to our API Gateway in JSON format.
    const requestData = {
      num1: num1,
      num2: num2
    };

    // Use the Fetch API to send a POST request to our API Gateway endpoint.
    fetch(API_ENDPOINT, {
      method: 'POST', // We are sending data, so it's a POST request.
      headers: {
        'Content-Type': 'application/json' // Tell the API we're sending JSON data.
      },
      body: JSON.stringify(requestData) // Convert our JavaScript object to a JSON string.
    })
      .then(response => {
        // Check if the network response was OK (status code 200-299).
        if (!response.ok) {
          // If not OK, try to parse the error message from the response body.
          return response.json().then(errData => {
            throw new Error(errData.message || 'Server error');
          });
        }
        // If OK, parse the successful response body as JSON.
        return response.json();
      })
      .then(data => {
        // Once we get a response, hide the loading state.
        setLoadingState(false);

        // Process the response from our Lambda function.
        // Our Lambda function wraps the actual result in a 'body' string, so we need to parse it again.
        if (data.statusCode && data.statusCode === 200 && data.body) {
          try {
            // Try to parse the nested 'body' string into a JavaScript object.
            const resultData = typeof data.body === 'string'
              ? JSON.parse(data.body)
              : data.body;

            // Display the calculation result on the page.
            displayResult(resultData);
          } catch (err) {
            showError('Error parsing the result: ' + err.message);
          }
        } else {
          showError('Unexpected API response format'); // If the response isn't what we expect.
        }
      })
      .catch(error => {
        // Catch any errors that occurred during the fetch operation (e.g., network issues, API errors).
        setLoadingState(false); // Hide loading state even on error.
        showError(error.message || 'An error occurred while communicating with the API');
      });
  });

  // Helper function to display an error message.
  function showError(message) {
    errorMessage.textContent = message; // Set the error message text.
    errorAlert.classList.remove('d-none'); // Show the error alert.
  }

  // Helper function to manage the button's loading state.
  function setLoadingState(isLoading) {
    if (isLoading) {
      btnText.textContent = 'Calculating...'; // Change button text.
      loadingSpinner.classList.remove('d-none'); // Show spinner.
      calculateBtn.disabled = true; // Disable button to prevent multiple clicks.
    } else {
      btnText.textContent = 'CALCULATE'; // Reset button text.
      loadingSpinner.classList.add('d-none'); // Hide spinner.
      calculateBtn.disabled = false; // Enable button.
    }
  }

  // Helper function to display the successful calculation result.
  function displayResult(data) {
    // Ensure we have the 'result' object from the API response.
    if (!data.result) {
      showError('No result data in the API response');
      return;
    }

    const result = data.result;

    // Format the timestamp into a human-readable date and time.
    let timestampDisplay = result.Timestamp;
    if (result.Timestamp && !isNaN(result.Timestamp)) {
      const date = new Date(parseInt(result.Timestamp) * 1000); // Convert milliseconds to Date object.
      timestampDisplay = date.toLocaleString(); // Format to local date/time string.
    }

    // Update the text content of our result display elements.
    resultId.textContent = result.ID || 'N/A';
    resultTimestamp.textContent = timestampDisplay || 'N/A';
    resultNum1.textContent = result.num1;
    resultNum2.textContent = result.num2;
    resultSum.textContent = result.sum;

    // Show the result section.
    resultSection.classList.remove('d-none');
  }
});
```

::: info JavaScript code explanation - there’s a lot going on here

- `document.addEventListener('DOMContentLoaded', function() { ... });`: This ensures our JavaScript code runs only after the entire HTML document has been loaded and parsed.
- `const API_ENDPOINT = '...';`: This is where you **MUST** paste your API Gateway Invoke URL from step 3 above. This line defines where our frontend will send its requests.
- `document.getElementById(...)`: These lines are how JavaScript "grabs" specific elements from our HTML using their `id` attributes. This allows us to read values from inputs or change the text/visibility of other elements.
- `calculatorForm.addEventListener('submit', function(event) { ... });`: This sets up an "event listener." It waits for the `calculatorForm` to be submitted (when the "CALCULATE" button is clicked) and then runs the code inside this function. `event.preventDefault()` stops the browser from reloading the page, which is the default behavior for form submissions.
- `parseFloat(num1Input.value)`: This gets the text value from the input fields and converts them into decimal numbers.
- `if (isNaN(num1) || isNaN(num2))`: This checks if the user entered actual numbers. `isNaN` means "is Not a Number."
- `fetch(API_ENDPOINT, { ... })`: This is the core part that communicates with our backend.
  - `method: 'POST'`: Specifies that we're sending data.
  - `headers: { 'Content-Type': 'application/json' }`: Tells the API Gateway that the data we're sending is in JSON format.
  - `body: JSON.stringify(requestData)`: Converts our JavaScript `requestData` object into a JSON string that can be sent over the network.
- `.then(response => response.json())`: After the `fetch` call, these `.then()` blocks handle the response. The first one checks if the network request was successful (`response.ok`) and then parses the response body as JSON.
- `.then(data => { ... })`: This block is executed once the JSON data from the API is received. It updates the frontend with the `result` or shows an `errorAlert`. Notice `JSON.parse(data.body)` is used because our Lambda function returns the actual data *inside* a `body` string within the overall JSON response.
- `.catch(error => { ... })`: This block catches any errors that happen during the `fetch` operation (for example, network issues, or errors returned from the API).
- `showError()`, `setLoadingState()`, `displayResult()`: These are helper functions to keep our code organized. They handle showing messages, toggling the loading spinner, and updating the result display.
- `classList.add('d-none')`, `classList.remove('d-none')`: These are used to dynamically hide and show HTML elements by adding or removing a CSS class named `d-none`.

:::

#### 3. <VPIcon icon="fa-brands fa-css3-alt"/>`style.css` (The Look of Our Web Page)

This CSS file adds some basic styling to make our calculator look presentable.

```css :collapsed-lines title="style.css"
/* Basic styling for the body */
body {
  background-color: #222629; /* Dark background */
  color: #ffffff; /* White text for contrast */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  min-height: 100vh; /* Full viewport height */
  margin: 0;
}

h1 {
  color: #86c232; /* A vibrant green for the heading */
  margin-bottom: 30px;
}

/* Styling for labels (text next to input fields) */
label {
  font-size: 18px;
  margin-right: 10px;
  display: inline-block; /* Allows labels and inputs to be on the same line */
  width: 80px; /* Give labels a consistent width */
  text-align: right;
}

/* Styling for input fields */
input[type="number"] {
  background-color: #333;
  border: 1px solid #444;
  color: #ffffff;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 5px;
  margin-bottom: 15px; /* Space below each input row */
  width: 150px; /* Consistent width for inputs */
  outline: none; /* Remove default outline */
}

input[type="number"]:focus {
  border-color: #86c232; /* Highlight border on focus */
  box-shadow: 0 0 0 3px rgba(134, 194, 50, 0.5); /* Green glow on focus */
}

/* Styling for the CALCULATE button */
button {
  background-color: #86c232; /* Green background */
  border: none; /* No border */
  color: #ffffff; /* White text */
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer; /* Indicate it's clickable */
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
  display: flex; /* Allow spinner inside */
  align-items: center;
  justify-content: center;
  gap: 10px; /* Space between text and spinner */
  margin-top: 20px;
  width: 180px; /* Consistent width */
}

button:hover:not(:disabled) {
  background-color: #6a9b2b; /* Darker green on hover */
}

button:disabled {
  background-color: #555; /* Grey out when disabled */
  cursor: not-allowed;
}

/* Styling for the form container */
#calculatorForm {
  background-color: #333;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align form elements to the left */
  margin-bottom: 30px;
}

/* Styling for the loading spinner */
.spinner {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #ffffff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite; /* Animation for spinning */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Styling for the error message alert */
.alert {
  background-color: #330d0d; /* Dark red background for errors */
  border: 1px solid #ff4d4d; /* Red border */
  color: #ff4d4d; /* Red text */
  padding: 10px 15px;
  border-radius: 5px;
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

/* Styling for the result display box */
.result-box {
  background-color: #333;
  border: 1px solid #86c232; /* Green border for results */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
  animation: fadeIn 0.5s ease-in-out; /* Fade-in animation */
}

.result-box h2 {
  color: #86c232;
  margin-top: 0;
  border-bottom: 1px solid #444;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.result-box p {
  margin-bottom: 8px;
}

.result-box strong {
  color: #99ee33; /* Slightly brighter green for strong text */
}

/* Utility class to hide elements */
.d-none {
  display: none !important;
}

/* Keyframe animation for fade-in effect */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

```

::: info CSS code explanation

- `body { ... }`: Styles the overall page background, text color, font, and centers the content.
- `h1 { ... }`: Styles the main heading.
- `label { ... }`, `input[type="number"] { ... }`: Styles the input fields and their labels, making them look consistent and user-friendly. `input:focus` adds a visual highlight when an input field is clicked.
- `button { ... }`: Styles the "CALCULATE" button, giving it a distinct look and adding a hover effect. `button:disabled` changes its appearance when it's temporarily inactive.
- `#calculatorForm { ... }`: Styles the container for our input form, giving it a background, padding, and a subtle shadow.
- `.spinner { ... }`, `@keyframes spin { ... }`: These define the style and animation for the loading spinner that appears on the button while the calculation is in progress.
- `.alert { ... }`: Styles the error message box, giving it a red background and text to clearly indicate an error.
- `.result-box { ... }`: Styles the box where the calculation results are displayed, giving it a green border and a fade-in animation.
- `.d-none { display: none !important; }`: This is a utility class. When this class is added to an HTML element via JavaScript, it will completely hide that element from the page. Removing the class makes it visible again. The `!important` ensures this style overrides any other conflicting display styles.
- `@keyframes fadeIn { ... }`: This defines a simple animation that makes an element gradually appear (fade in) while slightly moving upwards, making the appearance of results smoother.

:::

### Step 5: Deploy Your Frontend with AWS Amplify

Finally, let's get our frontend web application online using AWS Amplify. Amplify makes it incredibly easy to host static websites.

#### 1. Prepare Your Frontend Files

Make sure you have all three files (<VPIcon icon="fa-brands fa-html5"/>`index.html`, <VPIcon icon="fa-brands fa-js"/>`app.js`, <VPIcon icon="fa-brands fa-css3-alt"/>`style.css`) in a single folder on your computer.

**Compress this folder into a ZIP file.** Ensure the <VPIcon icon="fa-brands fa-html5"/>`index.html` file is at the root of the ZIP file (not nested inside another subfolder within the ZIP).

#### 2. Navigate to the AWS Amplify Console:

In the AWS Management Console search bar, type "Amplify" and select "AWS Amplify" from the results.

#### 3. Deploy Without a Git Provider:

On the Amplify console, you'll see options to connect to a Git provider (like GitHub, GitLab, and so on). For simplicity in this tutorial, we'll choose to deploy manually.

Under "Deploy without Git provider", click **"Deploy"**.

![Figure 15: Choosing to deploy your web app manually with AWS Amplify.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752057954174/d4579189-1049-4896-8cc9-441101352731.png)

#### 4. Upload Your Files:

- **App name**: Give your application a name, e.g., `SumCalculatorWebApp`.
- **Environment name**: You can use `dev` or `main`.
- **Drag and drop or browse files**: Click on the "drag and drop" area or "Choose files" button.
- Select the **ZIP file** you created in step 5 above.

![Figure 16: Naming your Amplify app and uploading the ZIP file containing your frontend.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752054718089/1e94472b-4190-489b-8c10-ec402f883cef.png)

#### 5. Review and Deploy:

Now, click **"Save and Deploy"**. Amplify will now take your ZIP file, extract its contents, and deploy your static website to a global content delivery network (CDN) provided by AWS CloudFront. This makes your website load quickly for users anywhere in the world. This process may take a few minutes.

#### 6. Access Your Live Application:

Once the deployment is complete, Amplify will provide you with a **"Domain" URL**. Click on this URL. This is your live, public web application!

![Figure 17: Your deployed Sum Calculator web app with its public URL.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752054574379/a42bc253-94a1-4bc2-a42c-f7f5444d964b.png)

---

## How to Test Your Application: Is It Working?

Now for the exciting part - let's test our fully serverless web application by following these steps:

1. **Open your amplify app URL**: Navigate to the "Domain" URL provided by AWS Amplify (from Step 5.6).
2. **Enter numbers**: In the "Number 1" and "Number 2" input fields, type in any two numbers (e.g., 5 and 10).
3. **Click "CALCULATE"**: Click the "CALCULATE" button. You should briefly see "Calculating..." on the button.
4. **Observe the Result**: If everything is set up correctly, you should see the "Calculation Result" box appear below the form, displaying the Transaction ID, Timestamp, the numbers, and their sum!
5. **Verify in DynamoDB (Optional)**:
    - Go back to your DynamoDB console.
    - Click on your `myTable`.
    - Click on the **"Explore table items"** tab.
    - You should now see new entries (items) corresponding to each calculation you performed on your web app, with the `ID`, `Timestamp`, `num1`, `num2`, and `sum` stored!

---

## Common Issues and Solutions

Sometimes things don't work perfectly on the first try. Here are some common problems and how to fix them:

### CORS Errors (Cross-Origin Resource Sharing)

- **Symptom**: Your web browser's developer console (usually accessible by pressing F12 or right-clicking and selecting "Inspect") shows errors like "Access to fetch at '...' from origin '...' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present..."
- **Solution**: This means your frontend isn't allowed to talk to your API Gateway. Go back to **Step 3, part 5 (Enable CORS)** in API Gateway and ensure you've enabled CORS for your API. Make sure `POST` is selected and that the `Access-Control-Allow-Origin` is properly configured (for this tutorial, `'*'` is fine, but in production, you'd specify your Amplify domain).

### Lambda Timeouts

- **Symptom**: Your web app keeps showing "Calculating..." or gets a generic error, and in your Lambda function's logs (CloudWatch Logs), you see "Task timed out".
- **Solution**: Your Lambda function took too long to execute. For a simple sum calculator, this is unlikely, but for more complex operations, you might need to increase the "Timeout" setting for your Lambda function. You can find this under your Lambda function's "Configuration" tab, in the "General configuration" section.

### DynamoDB Permissions Errors

- **Symptom**: Your Lambda function execution fails, and in its CloudWatch logs, you see an error like "User: arn:aws:sts::... is not authorized to perform: dynamodb:PutItem on resource: arn:aws:dynamodb:..."
- **Solution**: This means your Lambda function doesn't have the necessary permissions to write to your DynamoDB table. Go back to **Step 2, part 2 (about updating Lambda Function permissions)** and ensure you've correctly added the `dynamodb:PutItem` action and specified your `myTable`'s ARN as the resource.

### Incorrect API Gateway Invoke URL

- **Symptom**: Your frontend makes a request, but it either fails immediately, or you get a network error in the browser console.
- **Solution**: Double-check that the `API_ENDPOINT` constant in your <VPIcon icon="fa-brands fa-js"/>`app.js` file is *exactly* the Invoke URL you copied from API Gateway. Even a tiny typo can break the connection.

---

## Next Steps: Enhance Your Application

This calculator is a great starting point, but you can expand it significantly:

- **Add authentication**: Implement user login and signup (for example, using AWS Amplify Auth with Amazon Cognito) so only authorized users can use the calculator.
- **Implement error handling**: Make the frontend more robust by displaying specific error messages based on what the backend sends.
- **Create a calculation history view**: Extend your frontend to fetch and display a list of all past calculations stored in DynamoDB. This would involve another Lambda function and API Gateway endpoint (for example, a `GET` method).
- **Add input validation**: Implement more robust validation on both the frontend (JavaScript) and backend (Lambda) to handle non-numeric inputs or other edge cases.
- **Implement real-time updates**: Use AWS AppSync (GraphQL) or WebSockets with API Gateway to push new calculation results to the frontend in real-time, without needing a page refresh.

---

## Conclusion

Congratulations! You've successfully built and deployed a fully functional serverless web application on AWS. You've seen how to leverage powerful services like AWS Lambda, Amazon API Gateway, Amazon DynamoDB, and AWS Amplify to create a scalable, cost-effective, and low-maintenance application.

This architecture is incredibly powerful because it can scale automatically to handle thousands or even millions of users without you needing to manage a single server. Remember to clean up your AWS resources when you're done experimenting to avoid unnecessary charges.

::: info Resources for Further Learning

```component VPCard
{
  "title": "AWS Lambda Resources",
  "desc": "Find AWS Lambda and serverless resources including getting started tutorials, reference architectures, documentation, webinars, and case studies.",
  "link": "https://aws.amazon.com/lambda/resources//",
  "logo": "https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

```component VPCard
{
  "title": "What is Amazon DynamoDB? - Amazon DynamoDB",
  "desc": "Use DynamoDB, a fully managed NoSQL database service to store and retrieve any amount of data, and serve any level of request traffic.",
  "link": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

```component VPCard
{
  "title": "What is Amazon API Gateway? - Amazon API Gateway",
  "desc": "Overview of Amazon API Gateway and its features.",
  "link": "https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

<SiteInfo
  name="Amplify Documentation - AWS Amplify Gen 2 Documentation"
  desc="AWS Amplify Docs - Develop and deploy cloud-powered web and mobile apps. AWS Amplify Documentation"
  url="https://docs.amplify.aws"
  logo="https://docs.amplify.aws/assets/icon/favicon-purple.ico"
  preview="https://docs.amplify.aws/assets/gen2-og.png"/>


:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Deploy a Static Web App on AWS with Amplify, Lambda, API Gateway, & DynamoDB",
  "desc": "Building modern web applications often involves complex setups and managing servers - but it doesn't have to be that way. Amazon Web Services (AWS) offers a powerful suite of ”serverless” services that allow you to build and deploy applications witho...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-deploy-a-static-web-app-on-aws-with-amplify-lambda-api-gateway-and-dynamodb.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
