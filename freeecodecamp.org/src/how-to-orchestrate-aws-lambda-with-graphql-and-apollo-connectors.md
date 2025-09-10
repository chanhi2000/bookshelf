---
lang: en-US
title: "Orchestrating AWS Lambda with GraphQL and Apollo Connectors"
description: "Article(s) > Orchestrating AWS Lambda with GraphQL and Apollo Connectors"
icon: fa-brands fa-aws
category:
  - DevOps
  - AWS
  - GraphQL
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - aws
  - amazon-web-services
  - graphql
  - apollo
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Orchestrating AWS Lambda with GraphQL and Apollo Connectors"
    - property: og:description
      content: "Orchestrating AWS Lambda with GraphQL and Apollo Connectors"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-orchestrate-aws-lambda-with-graphql-and-apollo-connectors.html
prev: /devops/aws/articles/README.md
date: 2025-03-26
isOriginal: false
author:
  - name: Rob Walters
    url : https://freecodecamp.org/news/author/rwalters/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742917115054/07184be6-5384-4861-a676-b72c06ff7c65.png
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
  "title": "GraphQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/graphql/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Orchestrating AWS Lambda with GraphQL and Apollo Connectors"
  desc="AWS Lambda is a computing service that enables you to run arbitrary code functions without needing to provision, manage, or scale servers. It’s often used in the logic tier of a multi-tier architecture to handle tasks such as processing files in S3 o..."
  url="https://freecodecamp.org/news/how-to-orchestrate-aws-lambda-with-graphql-and-apollo-connectors"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742917115054/07184be6-5384-4861-a676-b72c06ff7c65.png"/>

AWS Lambda is a computing service that enables you to run arbitrary code functions without needing to provision, manage, or scale servers. It’s often used in the logic tier of a multi-tier architecture to handle tasks such as processing files in S3 or performing CRUD operations on a database.

AWS also offers an API Gateway, allowing developers to invoke AWS Lambda functions, which provides enhanced security and performance features like rate limiting. But even with the API Gateway, you have to coordinate these microservices, as your client applications likely each have unique data needs. Data might need to be transformed, filtered, or combined before it is returned to the client.

These orchestration tasks can reduce your productivity and take time and effort away from solving the business problem your application is trying to solve.

Apollo GraphQL is an API orchestration layer that helps teams ship new features faster and more independently by composing any number of underlying services and data sources into a single endpoint. This allows clients on-demand access to precisely what the experience needs, regardless of the source of that data.

This article will teach you how to orchestrate AWS Lambda functions using Apollo GraphQL. Specifically, here’s what we will cover:

---

## GraphQL Primer

For those unfamiliar with GraphQL, here’s a primer that offers some background on the challenges GraphQL addresses and how data is typically managed through REST APIs in GraphQL before the emergence of Apollo Connectors. If you’re familiar with GraphQL, feel free to skip this section.

GraphQL is a query language for APIs. This query language and corresponding runtime enable clients to specify exactly the data they require, minimizing over-fetching and under-fetching.

In contrast to REST, which necessitates multiple endpoints for various data requirements, GraphQL streamlines queries into a single request, enhancing performance and reducing network latency.

GraphQL also uses a strongly typed schema. This improves API documentation and makes validation, early error detection, and immersive developer tooling easy.

To illustrate the difference between REST APIs and GraphQL, consider the following REST API call: `/user/123`

```json title="Response"
{
  "id": 123,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "phone": "555-1234",
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "zip": "62704"
  },
  "createdAt": "2022-01-01T12:00:00Z",
  "updatedAt": "2022-05-15T14:30:00Z",
  "isAdmin": false
}
```

If you were only interested in the name and email, using REST would be a lot of data returned from the network to the client for no reason. Using GraphQL, the GraphQL query to return the name and email would be the following:

```graphql
query {
  user(id: 123) {
    name
    email
  }
}
```

The result set is just the data the client needs:

```json
{
  "data": {
    "user": {
      "name": "Alice Johnson",
      "email": "alice@example.com"
    }
  }
}
```

This is a simple example showing the benefit of not over-fetching data, but GraphQL has many other advantages. One of them is the separation between client and server. Since both parties leverage and respect the GraphQL type schema, both teams can operate more independently with the back end defining where the data resides and the front end only asking for data it needs.

So how does GraphQL know how to populate data for every field in your schema? It does this through [<FontIcon icon="iconfont icon-graphql"/>resolvers](https://apollographql.com/docs/apollo-server/data/resolvers). Resolvers can fetch data from a back-end databases or third-party API such as REST APIs, gRPC, and so on. These functions comprise procedural code compiled and maintained for each field in the schema. Thus, one field can have a resolver that queries a REST API and another can query a gRPC endpoint.

To illustrate resolvers, consider the example above. Let’s add a field, status, that queries a REST API to determine if the user is full-time, part-time, or terminated.

First we have defined our schema as:

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  status: String!  # Need this from an external REST API
}

type Query {
  user(id: ID!): User
}
```

The user query in this case will accept a user id and return a type User. The resolver function to support the data fetching resembles the following:

```js
const resolvers = {
  Query: {
    user: async (_, { id }) => {
      // Fetch user details from one REST API
      const userResponse = await fetch(`https://api.company.com/users/${id}`);
      const userData = await userResponse.json();

      // Fetch employee status from another REST API
      const statusResponse = await fetch(`https://api.company.com/employees/${id}/status`);
      const statusData = await statusResponse.json();

      return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        status: statusData.status, // e.g., "Full-Time", "Part-Time", "Terminated"
      };
    },
  },
};
```

Notice that not only are there two fetches needed to obtain the information the query requires, but we also need to write procedural code and deploy it.

A better approach would be to declaratively specify to GraphQL where the REST API is located and what data to return. Apollo Connectors is the solution to this challenge, simplifying the process and allowing you to declaratively integrate REST API data without requiring code compilation and maintenance.

Now that you have a general idea of GraphQL and the challenges it addresses, let’s delve into the example we will build out.

---

## Tutorial Overview

In this tutorial, you will create two AWS Lambda functions that return product information, which are described as follows:

```plaintext title="Products Request"
POST /2015-03-31/functions/products/invocations
```

```json title="Response"
{
  "statusCode": 200,
  "body": [
    {
      "id": "RANQi6AZkUXCbZ",
      "name": "OG Olive Putter - Blade",
      "description": "The traditional Block in a blade shape is made from a solid block of Olive wood. The head weight is approximately 360 grams with the addition of pure tungsten weights. Paired with a walnut center-line and white accents colors.",
      "image": "https://keynote-strapi-production.up.railway.app/uploads/thumbnail_IMG_9102_3119483fac.png"
    }, {
      "id": "RANYrWRy876AA5",
      "name": "Butter Knife Olive Putter- Blade",
      "description": "The traditional Block in a extremely thin blade shape (~1\") is made from a solid block of Olive wood. The head weight is approximately 330 grams with the addition of pure tungsten weights.",
      "image": "https://keynote-strapi-production.up.railway.app/uploads/thumbnail_IMG_9104_97c221e79c.png"
    },
    // ...
  ]
}
```

```plaintext title="Product-price request"
POST /2015-03-31/functions/product-price/invocations
```

```json title="Response"
{
  "default_price": 49900,
  "is_active": true,
  "currency": "usd",
  "billing_schema": "per_unit",
  "recurring": {
    "interval": 0,
    "interval_count": 3
  }
}
```

To expose these two lambda microservices, you need to create API Gateway triggers. This involves either setting up a distinct API Gateway for each lambda or consolidating them under one or a few API Gateway instances with specified routes for each lambda.

Creating a trigger may feel tedious and repetitive in a microservices setup. But there is an alternative available. You could directly invoke those functions via REST using the InvokeFunction permission assigned to an IAM user. This article will show you this method and guide you through function creation, necessary AWS IAM permissions, and configuring the Apollo Connector to invoke the function.

::: note Prerequisites

To follow along in this tutorial, you will need to have a basic understanding of AWS Lambda functions as well as AWS security. You’ll also need access to the following:

- An AWS account with permissions to create IAM Users and Policies
- An Apollo GraphQL account, you can [<FontIcon icon="iconfont icon-graphql"/>sign up for a free plan here](https://studio.apollographql.com/signup).

:::

We will also use the following tools:

- [<FontIcon icon="iconfont icon-vscode"/>VS Code](https://code.visualstudio.com/): Microsoft VS Code is a free source code editor from Microsoft
- [<FontIcon icon="iconfont icon-graphql"/>Apollo Rover CLI](https://apollographql.com/docs/rover/getting-started): Rover is the command-line interface for managing and maintaining graphs
- [<FontIcon icon="iconfont icon-graphql"/>Apollo Studio](https://studio.apollographql.com/signup): A web-based portal used for managing all aspects of your graph
- [<FontIcon icon="iconfont icon-graphql"/>Apollo Connectors Mapping Playground](https://apollographql.com/connectors-mapping-playground): A website that takes a JSON document and helps developers create the selection mapping used with Apollo Connectors

---

## Section 1: Create the AWS Resources

First, let’s configure our AWS environment, starting with security. In our scenario, we will create an IAM User, “ConnectorUser,” with access to an AWS Policy, “ConnectorLambdaPolicy,” with the minimum permissions needed to access the AWS Lambda functions.

Note that you could create user groups and assign permission policies to those groups in a production environment. But for this article, we are reducing the number of administrative steps to focus on the core integration with GraphQL.

### Step 1: Create an AWS Policy

To create a policy, navigate to IAM within the AWS Management console, then select “Policies” under Access Management. Click “Create Policy”. This will open the policy editor page, as shown below:

![specify permissions](https://cdn.hashnode.com/res/hashnode/image/upload/v1742755417676/1025d04f-a712-4311-9669-ac38bd2fee50.jpeg)

Choose the “Lambda” service and under the Access level select “InvokeFunction” from the Write drop down menu as shown below:

![InvokeFunction checkmarked](https://cdn.hashnode.com/res/hashnode/image/upload/v1742755482285/1be204db-7b39-4c8f-ac7c-d461032f6887.jpeg)

Under the Resources menu, you can choose either All ARNs or a specific option. It's a best practice to be as granular as possible when defining security configurations. In this example, let’s limit our selection to the “us-east-1” region by clicking on the “Specific” option and then “Add ARNs.” Enter “us-east-1” in the resource region and select “Any function name.”

![Specify ARN dialog](https://cdn.hashnode.com/res/hashnode/image/upload/v1742755564740/99e47ac8-4ce9-4ff3-94b6-105308526f56.jpeg)

With the policy created, we can assign an IAM user to that policy.

### Step 2: Create the IAM User and Attach a Policy

Click on Users under “Access Management” then Create User. Provide a name for the user, “ConnectorUser”.

![Permission policy](https://cdn.hashnode.com/res/hashnode/image/upload/v1742755638499/ad782c39-a78f-4d68-b834-4e58dea9e35b.jpeg)

Next, select “Attach policies directly,” choose the policy we just created, “ConnectorLambdaPolicy,” and click “Create User.”

### Step 3: Create AWS Lambda Functions

In your AWS console, create a new NodeJS AWS Lambda function, “products”.

![AWS create function dialog](https://cdn.hashnode.com/res/hashnode/image/upload/v1742754922858/b2a307c2-8b43-4417-b022-0113803a3b5d.jpeg)

Select “Node.JS” for the runtime then click “Create function”. Once created, paste in the the function code [from this Gist (<FontIcon icon="iconfont icon-github"/>`RWaltersMA`)](https://gist.github.com/RWaltersMA/25264ff22a5cbc26814a00dbb78a16e2).

![AWS function showing code source](https://cdn.hashnode.com/res/hashnode/image/upload/v1742755096066/90e96036-41cd-4b45-8841-0bb3acb5af6b.jpeg)

Repeat this process, creating another function for, “product-price” and use the function code [from this Gist (<FontIcon icon="iconfont icon-github"/>`RWaltersMA`)](https://gist.github.com/RWaltersMA/d75d9eb02264829c1392dbdf7f238bad).

---

## Section 2: Create an Apollo Connector

In this section, we will install the Apollo Rover CLI tool, create an Apollo Studio free tier account, and clone the Apollo Connectors repository. If you already have an Apollo environment available, you can skip steps 1 and 2. ### Step 1: Install Rover

Rover is the command-line interface for managing and maintaining graphs. It also provides a modern hot-reloading experience for developing and running your connectors locally. If you don’t have Rover installed, install it by [<FontIcon icon="iconfont icon-graphql"/>following the steps here](https://apollographql.com/docs/rover/getting-started).

### Step 2: Create an Apollo Studio Free Tier Account

Apollo Studio is a cloud-based management platform designed to explore, deliver, and collaborate on graphs. If you do not have an Apollo Studio account, create one on a free plan [<FontIcon icon="iconfont icon-graphql"/>by navigating here](https://studio.apollographql.com/signup).

![Apollo Studio](https://cdn.hashnode.com/res/hashnode/image/upload/v1742755870123/4b38b025-064c-4a9a-b836-53a563152e43.jpeg)

### Step 3: Clone the Apollo Connectors Repository

To help you start your first Apollo Connector, a GitHub repository provides sample connectors and a template script. When run, this script will create all the necessary files and configurations you need to begin.

Go ahead and [clone the repository from here (<FontIcon icon="iconfont icon-github"/>`apollographql/connectors-community`)](https://github.com/apollographql/connectors-community).

Note: While not required, I recommended using VS Code, as this repo leverages VS Code-specific settings files.

### Step 4: Create a .env File

Before you run the Create Connectors template script, create a .env locally with a user API key from your Apollo Studio. You can [<FontIcon icon="iconfont icon-graphql"/>create and obtain this key here](https://studio.apollographql.com/user-settings/api-keys). Populating this .env file will add this API key to the connector template you create in the next step.

![.env file](https://cdn.hashnode.com/res/hashnode/image/upload/v1742755977271/860ef610-e802-4ec1-9cca-e881881a0968.jpeg)

### Step 5: Create Your New Connector from a Template

Execute `npm start` and provide a location to create the connector template. You can use default values for the remaining questions.

![`npm start`](https://cdn.hashnode.com/res/hashnode/image/upload/v1742756030015/e6c3b535-8657-4a77-b353-b8546cfa9ac5.jpeg)

This script will create all the necessary files to run a local Apollo GraphQL instance in the specified directory. Load the newly created connector using VS Code or your preferred code editor. You will return to this editor soon, but first, we need to obtain some access keys from AWS.

### Step 6: Create an AWS Access Key

Since we connect to AWS using SigV4, we must create an AWS access key and enter the KEY values in the settings.json file. Return to the AWS IAM Console and select the *ConnectorUser* you created in Step 1. Create a new access key by clicking on “Create access key”.

You will be presented with multiple options as far as where the use of this key will originate. Since we are first running locally, select “Third-party service” and then continue the wizard until you are presented with the key and secret key as shown below:

![retrieve access key dialog](https://cdn.hashnode.com/res/hashnode/image/upload/v1742756092209/e7b33bd2-f6ca-4e78-bf83-8ed357860abd.jpeg)

Add the access key and secret access key to the settings.json file as “AWS_ACCESS_KEY_ID” and “AWS_SECRET_ACCESS_KEY” respectively.

![vscode settings file](https://cdn.hashnode.com/res/hashnode/image/upload/v1742756152443/31906e19-625d-446f-adde-b9618e8df61a.jpeg)

You'll need to reload the window since VS Code only loads these files under the .vscode directory once.

![vscode task window showing reload option](https://cdn.hashnode.com/res/hashnode/image/upload/v1742756203631/8fb467fc-e8de-4f16-8907-622a12017d4f.jpeg)

Note: In this step, we saved the key to the settings.json file. While this is acceptable for development, consider saving environment variables in .env files.

### Step 7: Configure the Graph

The <FontIcon icon="iconfont icon-yaml"/>`supergraph.yaml` file is used to define all the subgraphs that are part of this federation. Modify the <FontIcon icon="iconfont icon-yaml"/>`supergraph.yaml` file as follows:

```yaml title="supergraph.yaml"
federation_version: =2.10.0
subgraphs:
  awsconnector:
    routing_url: http://lambda
    schema:
      file: connector.graphql
```

### Step 8: Configure Apollo Router

Apollo Router supports AWS SigV4 authentication. To configure the connector to use this, modify the <FontIcon icon="iconfont icon-yaml"/>`router.yaml` file and add an authentication section as follows:

```yaml title="router.yaml"
authentication:
  connector:
    sources:
      awsconnector.lambda:   # subgraph name . connector source name
        aws_sig_v4:
          default_chain:
            region: "us-east-1"
            service_name: "lambda"
```

There are other AWS security configuration options available, including using assume role. The full documentation for subgraph authentication [<FontIcon icon="iconfont icon-graphql"/>is available here](https://apollographql.com/docs/graphos/routing/security/subgraph-authentication).

### Step 9: Build the connector

Now that we have configured the environment variables and authentication information, we are ready to build the connector. Open the <FontIcon icon="iconfont icon-graphql"/>`connector.graphql` file and erase the contents. Next, copy the following extend schema:

```graphql
extend schema
  @link(
    url: "https://specs.apollo.dev/federation/v2.10"
    import: ["@key"]
  )
  @link(
    url: "https://specs.apollo.dev/connect/v0.1"
    import: ["@source", "@connect"]
  )

  @source(
    name: "lambda"
    http: { baseURL: "https://lambda.us-east-1.amazonaws.com" }
  )
```

**Extend schema** is used to link the Apollo Connectors directives into the current schema. In this article we are defining the base URL of our lambda function. If your REST API has HTTP headers that apply to all references of this source, such as Content-Length restrictions, you can add them here in the @source declaration. Next, let’s define the Product schema:

```graphql :collapsed-lines
type Product {
  id: ID!
  name: String
  description: String
  image: String
  price: Price
    @connect(
      source: "lambda"
      http: {
        POST: "/2015-03-31/functions/product-price/invocations"
        body: """
        product_id: $this.id
        """
      }
      selection: """
      amount: default_price
      isActive: is_active
      currency
      recurringInterval: recurring.interval -> match(
        [0,"ONE_TIME"],
        [1,"DAILY"],
        [2,"MONTHLY"],
        [3,"ANNUALLY"],
      )
      recurringCount: recurring.interval_count
      """
    )
}
```

Notice our query Products has an @connect directive that defines, at a minimum, the source name. Here, you can add the HTTP-specific configuration you need for this field, such as Authorizations headers. In this scenario, since we only defined a baseUrl in the extend schema section, we need to put the specific URL for the InvokeFunction, which is **/2015-03-31/functions/product-price/invocations**.

The selection field allows you to transform and map values returned from the REST API using the mapping definition defined in the selection field. While a complete discussion of selection mapping is beyond the scope of this article, check out the documentation for a detailed look at [<FontIcon icon="iconfont icon-graphql"/>Mapping GraphQL Responses](https://apollographql.com/docs/graphos/schema-design/connectors/responses). Apollo [<FontIcon icon="iconfont icon-graphql"/>provides a free online tool](https://apollographql.com/connectors-mapping-playground) that makes building mappings intuitive and fast.

![connectors mapping playground](https://cdn.hashnode.com/res/hashnode/image/upload/v1742756290237/91d17c59-a2d0-4a22-8acf-1faec0c0f36f.jpeg)

Next, let’s define the Price schema and products Query.

```graphql :collapsed-lines
type Price {
  amount: Float
  isActive: Boolean
  currency: String
  recurringInterval: RecurringInterval
  recurringCount: Int
}
enum RecurringInterval {
  ONE_TIME
  DAILY
  MONTHLY
  ANNUALLY
}

type Query {
  products: [Product]
    # https://docs.aws.amazon.com/lambda/latest/api/API_Invoke.html
    @connect(
      source: "lambda"
      http: { POST: "/2015-03-31/functions/products/invocations" }
      selection: """
      $.body {
        id
        name
        description
        image
      }
      """
    )
}
```

Now we're ready to run our connector and issue queries to our graph! The complete configuration script is available [at this Gist (<FontIcon icon="iconfont icon-github"/>`RWaltersMA`)](https://gist.github.com/RWaltersMA/e44813a89c748e175d6997f659162b33.).

### Step 10: Run the Connector

If you're using VS Code, the repository includes a tasks.json file that adds a “rover dev” task, which launches Rover locally.

```json
{
  "version": "2.0.0",
  "tasks": [{
    "label": "rover dev",
    "command": "rover", // Could be any other shell command
    "args": ["dev", "--supergraph-config","supergraph.yaml", "--router-config","router.yaml"],
    "type": "shell",
    "problemMatcher": [],
  }]
}
```

If you are not using VS Code, you can start your graph by executing `rover dev -supergraph-config supergraph.yaml -router-config router.yaml` from a terminal window.

If everything is configured correctly, you’ll see the following:

![running rover dev command ](https://cdn.hashnode.com/res/hashnode/image/upload/v1742756354078/9fab875a-d064-4723-be91-8ca0d6243b59.jpeg)

---

## Section 3: How to Use Apollo Sandbox

The `rover dev` command you launched in the previous step configures a local Apollo Router instance for [<FontIcon icon="iconfont icon-graphql"/>development mode](https://apollographql.com/docs/graphos/reference/router/configuration). This mode makes it easy for developers to create, execute, and debug ad-hoc GraphQL queries using the Apollo Sandbox web portal. This portal is located at `http://localhost:4000` by default.

Launch the portal and click on the products field. This will populate the Operation pane with all the available fields in the schema. In the operation pane, you can modify and build your GraphQL query. Clicking the Run button (which displays the query name, Products, in our example) will execute the query and show the results in the Response panel, as illustrated in the figure above.

In this example, you can see that data has been returned from our AWS Lambda function. To confirm, you can view the query plan by selecting "Query Plan” from the Response drop-down menu.

![query plan menu item](https://cdn.hashnode.com/res/hashnode/image/upload/v1742756499055/822467d7-0694-423e-baef-450a8d0dd64e.jpeg)

The query plan illustrates the orchestration of our two AWS Lambda functions that fetch product and product price data.

![query plan](https://cdn.hashnode.com/res/hashnode/image/upload/v1742756540147/af32d615-029a-4f6f-a489-96ee9950e630.jpeg)

A helpful debugging feature is the Connectors Debugger, available in the drop-down as shown in the previous figure.

![debugger showing request overview](https://cdn.hashnode.com/res/hashnode/image/upload/v1742756614481/c9b311e3-ab5d-4927-9457-e9a7d242fbdf.jpeg)

The Connection Debugger provides a comprehensive view of the HTTP request, including headers, body, response code, and the selection mapping used in the query. If you’re experiencing difficulties running queries, use this debugger - it will save you a lot of time.

---

## Summary

In this article, you learned how to:

- Set up AWS IAM User, Policies, and Lambda functions
- Create an Apollo Connector to obtain data from an AWS Lambda function
- Configure the Apollo Router
- Execute and debug queries using Apollo Sandbox

Integrating AWS Lambda with Apollo Connectors offers a simplified, resolver-free method for incorporating cloud functions into your GraphQL API. By utilizing Apollo Connectors, you can declaratively link REST-based Lambda functions to your supergraph while ensuring secure authentication with AWS SigV4. You can learn more about Apollo Connectors from the following resources:

<SiteInfo
  name="GraphQL meets REST, with Apollo Connectors"
  desc="Discover how Apollo Connectors bridge the gap between REST and GraphQL"
  url="https://apollographql.com/tutorials/connectors-intro-rest/"
  logo="https://apollographql.com/docs/favicon.svg"
  preview="https://res.cloudinary.com/apollographql/image/upload/w_1280,h_669,c_fill,q_auto,f_auto/w_760,c_fit,co_rgb:1A202C,g_south_west,x_480,y_254,l_text:odyssey:fonts:AeonikBold.otf_80_bold:GraphQL%20meets%20REST%252C%20with%20Apollo%20Connectors/w_760,c_fit,co_rgb:1A202C,g_north_west,x_480,y_445,l_text:odyssey:fonts:InterRegular.ttf_36:Discover%20how%20Apollo%20Connectors%20bridge%20the%20gap%20between%20REST%20and%20GraphQL/l_fetch:aHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vYXBvbGxvZ3JhcGhxbC9pbWFnZS91cGxvYWQvdjE3Mjc4OTM0Mjkvb2R5c3NleS9jZW50ZXJlZC1jb25uZWN0b3JfbG9rand5LnN2Zw==,w_400,h_669,g_south_west,c_fill,e_colorize,co_rgb:C74100/odyssey_template_base_w_illustration_b4ovtn"/>

<SiteInfo
  name="REST API Orchestration With GraphQL | Apollo GraphQL Blog"
  desc="Unlock microservices potential with Apollo GraphQL. Seamlessly integrate APIs, manage data, and enhance performance. Explore Apollo's innovative solutions."
  url="https://apollographql.com/api-orchestration-with-graphql/"
  logo="https://apollographql.com/favicon/favicon-16x16.png"
  preview="https://apollographql.com/og.png"/>

  <SiteInfo
  name="Our Journey to Apollo Connectors | Apollo GraphQL Blog"
  desc="Unlock microservices potential with Apollo GraphQL. Seamlessly integrate APIs, manage data, and enhance performance. Explore Apollo's innovative solutions."
  url="https://apollographql.com/our-journey-to-apollo-connectors/"
  logo="https://apollographql.com/favicon/favicon-16x16.png"
  preview="https://apollographql.com/og.png"/>

<SiteInfo
  name="New innovations from Apollo. Don’t miss out."
  desc="Unlock microservices potential with Apollo GraphQL. Seamlessly integrate APIs, manage data, and enhance performance. Explore Apollo's innovative solutions."
  url="https://apollographql.com/events/new-innovations-from-apollo-dont-miss-out/"
  logo="https://apollographql.com/favicon/favicon-16x16.png"
  preview="https://apollographql.com/og.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Orchestrating AWS Lambda with GraphQL and Apollo Connectors",
  "desc": "AWS Lambda is a computing service that enables you to run arbitrary code functions without needing to provision, manage, or scale servers. It’s often used in the logic tier of a multi-tier architecture to handle tasks such as processing files in S3 o...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-orchestrate-aws-lambda-with-graphql-and-apollo-connectors.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
