---
lang: en-US
title: "What is a JSON Schema?"
description: "Article(s) > What is a JSON Schema?"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is a JSON Schema?"
    - property: og:description
      content: "What is a JSON Schema?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-a-json-schema.html
prev: /programming/js/articles/README.md
date: 2026-07-02
isOriginal: false
author:
  - name: Chidiadi Anyanwu
    url: https://freecodecamp.org/news/author/chidiadi01/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/cc9499a2-35ff-4aac-b5cb-5f5e6a7a415b.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What is a JSON Schema?"
  desc="If you're a developer, you likely work with JSON a lot. But how do you define and validate JSON and prevent problems from malformed JSON data? This article explores what a JSON schema is, some example"
  url="https://freecodecamp.org/news/what-is-a-json-schema"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/cc9499a2-35ff-4aac-b5cb-5f5e6a7a415b.png"/>

If you're a developer, you likely work with JSON a lot. But how do you define and validate JSON and prevent problems from malformed JSON data?

This article explores what a JSON schema is, some examples of JSON schemas, and who decides what one should look like.

::: note Prerequisites

To understand this article, you need to [<VPIcon icon="fas fa-globe"/>know some JSON basics](https://thenetworkbits.com/an-overview-of-json/) and have a [**general understanding of APIs**](/freecodecamp.org/how-apis-work.md#) and how they work.

:::

---

## What's the Deal with JSON?

[<VPIcon icon="fas fa-globe"/>JSON](https://thenetworkbits.com/an-overview-of-json/) is a popular document format typically used for the interchange of data through APIs. It's lightweight, easily readable by both humans and machines, and is supported by a lot of programming languages.

But JSON objects aren't rigid, and can be built to represent different types of data. This means that it's flexible, but it doesn't enforce a data model or constraints. This can introduce problems between the communicating parties.

For example, if a server expects cart items, and it receives an object with payment transaction data, it could get confused and not parse it correctly. Maybe even crash.

Or if a server handles messaging between users of an app and expects a certain structure of payload, but the client sent something different, it could break the app during parsing or lead to security compromises.

That’s why there's validation.

---

## What is Validation?

It's always a good practice to validate your forms before any data is sent. Validation happens when data that's entered into the form gets checked against the expected structure and data types.

If the data entered has another format, structure, or data type from what's expected and acceptable, the form is rejected and isn't sent to the server. This protects the server from parsing the wrong type of data, and also from potential security issues.

A JSON schema is a JSON document that describes the expected format of other JSON documents. It basically restricts the type of JSON data the server can receive and accept, and ensures that only the right type of data is parsed by the server.

Configuration files like package.json in node.js, and even the Azure ARM template use JSON. These have to be validated against a schema to ensure that the files are written with the correct syntax and structure so they can be understood by the system. Validators do this, and they help prevent any problems that might arise from improper parsing.

---

## The Structure of a JSON Schema

A normal JSON file contains data, while a JSON schema contains rules about the data. The schema is declarative.

Let's look at an example of a regular JSON file with data:

```json
 {
  "username": "chidiadi",
  "followers": 2200
}
```

Now here's the schema representing the structure and constraints of the JSON data:

```json
{
  "type": "object",
  "properties": {
    "username": {
      "type": "string"
    },
    "followers": {
      "type": "integer"
    }
  }
}
```

The JSON schema consists of JSON objects too, but these objects represent the constraints and syntax of the data.

For example, this schema expects a JSON object that has two properties: username and followers. For the username property, it should be a string (which is a data type supported by JSON). For the followers property, it should be an integer. The parent object itself is an “object” type.

This is the basic structure of a JSON schema. You can then build on this for a more complex and comprehensive schema based on your use case.

---

## How to Create a JSON Schema

To create a basic schema, you need to:

1. Define the schema keyword, `$schema`
2. Define the schema keyword, `$id`
3. Then define the `title` and `description` keywords (which are schema annotations)
4. Define the `type` and `properties` validation keywords

The `$schema` keyword is used to declare what version of the JSON schema specification your schema adheres to. Example:

```json
{ 
  "$schema": "https://json-schema.org/draft/2020-12/schema"
}
```

The `$id` keyword is used to give that schema a unique identifier (URI) so you can reference it from another schema. This allows you to reuse and organize your schemas. Example:

```json
{ 
  "$id": "http://yourdomain.com/schemas/followers.json" 
}
```

They can then be referenced with the `$ref` keyword from another schema.

```json
{ 
    "$ref": "http://yourdomain.com/schemas/followers.json" 
}
```

The `title` and `description` keywords are annotations. They're used to describe what the schema is for.

```json
{ 
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "http://yourdomain.com/schemas/followers.json"   
  "title": "Followers Schema",
  "description": "Number of followers per person",
 }
```

So far, all the keywords we've mentioned don't affect the output of the validation. They haven't said anything about what the expected JSON document should be like, or what to validate against. That is what `type` and `properties` keywords do. They are *validation keywords*.

The type keyword determines the type of instance being validated by the schema. That could be a `string`, an `object`, an `array`, a `number`, `boolean` or `null`.

```json
{ 
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "http://yourdomain.com/schemas/followers.json"   
  "title": "Followers Schema",
  "description": "Number of followers per person",
  "type":"object"
 }
```

Now, if you send some JSON that consists of an array as the parent in the file, it will be rejected. But what should the object contain? That's where the `properties` keyword comes in.

```json
{ 
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "http://yourdomain.com/schemas/followers.json",
  "title": "Followers Schema",
  "description": "Number of followers per person",
  "type":"object",
  "properties":{
    "username": {
      "description":"The username of the user",
      "type": "string"
    },
    "followers": {
      "description":"The number of followers user has",
      "type": "integer"
    }
  }
}
```

Here, we've added keys that are expected in the JSON file: `username` and `followers`. So, files containing other keys than that will fail validation.

This will pass:

```json
{
  "username": "chidiadi",
  "followers": 2200
}
```

And this will fail:

```json
{
  "username": "chidiadi",
  "name":"Chidiadi Anyanwu",
  "followers": 2200,
}
```

It will fail because that extra `name` key in the JSON file wasn't included in the schema. The `description` keyword in those keys are just annotations to tell the developer or whoever is going through the schema file what those keys are all about.

There's also a `required` keyword that can be used to specify what keys in the JSON file *have to* be there to be accepted. For example, if we want to reject any JSON file sent without populating the `username` field, we could make it required.

```json
{ 
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "http://yourdomain.com/schemas/followers.json",
  "title": "Followers Schema",
  "description": "Number of followers per person",
  "type":"object",
  "properties":{
    "username": {
      "description":"The username of the user",
      "type": "string"
    },
    "followers": {
      "description":"The number of followers user has",
      "type": "integer"
    }
  },
  "required":["username"]
}
```

The `required` keyword is a validation keyword for objects, and the value of this keyword must be an array. Not including the keyword is akin to an empty array. You can add multiple keys to that array. For example, if we want both the username and follower count to be compulsory keys in the JSON file, we can put both of them there:

```json
{ 
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "http://yourdomain.com/schemas/followers.json",
  "title": "Followers Schema",
  "description": "Number of followers per person",
  "type":"object",
  "properties":{
    "username": {
      "description":"The username of the user",
      "type": "string"
    },
    "followers": {
      "description":"The number of followers user has",
      "type": "integer"
    }
  },
  "required":["username","followers"]
}
```

---

## JSON Schema Use Cases

### OpenAPI

According to the OpenAPI Initiative,

> “The OpenAPI Specification (OAS) defines a standard, programming language-agnostic interface description for HTTP APIs, which allows both humans and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic.”

Basically, it gives developers a way to document their API design in a way that's easy for them to understand and track their development. It also allows others who need to consume the API to understand what they need to know to use it.

OAS is a specification for describing APIs. It uses schema definitions (based on a JSON schema) to describe the structure of requests and responses. OpenAPI documents, also known as OpenAI Descriptions (OAD), can be written in JSON or YAML.

Here's an example in JSON format:

```json :collapsed-lines
{
  "openapi": "3.2.0",
  "info": {
    "title": "Counter API",
    "version": "1.0.0",
    "description": "A simple API that stores and increments a counter."
  },
  "servers": [
    {
      "url": "https://api.example.com"
    }
  ],
  "paths": {
    "/counter": {
      "get": {
        "summary": "Get the current counter value",
        "operationId": "getCounter",
        "responses": {
          "200": {
            "description": "Current counter value",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Counter"
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Increment the counter",
        "operationId": "incrementCounter",
        "responses": {
          "200": {
            "description": "Updated counter value",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Counter"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Counter": {
        "type": "object",
        "properties": {
          "value": {
            "type": "integer",
            "example": 42
          }
        },
        "required": ["value"]
      }
    }
  }
}
```

For YAML:

```yaml
openapi: 3.2.0

info:
  title: Counter API
  version: 1.0.0
  description: A simple API that stores and increments a counter.

servers:
  - url: https://api.example.com

paths:
  /counter:
    get:
      summary: Get the current counter value
      operationId: getCounter
      responses:
        "200":
          description: Current counter value
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Counter"

    post:
      summary: Increment the counter
      operationId: incrementCounter
      responses:
        "200":
          description: Updated counter value
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Counter"

components:
  schemas:
    Counter:
      type: object
      properties:
        value:
          type: integer
          example: 42
      required:
        - value
```

Here, we have one schema object, a counter. This schema object describes the structure of the request and response the API should receive and send, respectively.

The OAD describes an API for a simple counter application with URL, “`https://api.example.com/counter`”, that accepts two HTTP methods: POST for increasing the counter, and GET for retrieving the current number in the counter.

### Azure Resource Manager (ARM) Templates

The Azure Resource Manager (ARM) is responsible for creating, deleting, and updating resources in an Azure account. The Azure portal, REST clients, Azure Powershell, and Azure CLI all depend on it to provision resources. You can also define templates for the provisioning of infrastructure using the ARM template.

The ARM template is a JSON file that declaratively defines the infrastructure and configuration of a project. It defines the resources to be deployed to a tenant, resource group, subscription, or management group.

Here’s an example of an ARM template. This is an example from the documentation:

```json

{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "location": {
      "type": "string",
      "defaultValue": "[resourceGroup().location]"
    }
  },
  "resources": [
    {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2025-06-01",
      "name": "mystorageaccount",
      "location": "[parameters('location')]",
      "sku": {
        "name": "Standard_LRS"
      },
      "kind": "StorageV2"
    }
  ]
}
```

This template creates a storage account of name `mystorageaccount`, using the location of the resource group as the location for the storage account.

As you can see, it has a schema keyword that links to the JSON schema created by the Azure team for the validation of the ARM templates. So, when a template is to be deployed, it's validated against that schema.

---

## The JSON Schema Project

It's easy to confuse a JSON schema as a concept with the JSON Schema Project. But JSON Schema is an open source project that works closely with the Internet Engineering Task Force (IETF). Its aim is to harmonize the specifications for building JSON schemas.

The point is that anyone building JSON schemas all over the world can use the same templates, assumptions, formats, and structure, which will increase the interoperability of systems that use JSON. And this is what JSON is all about as a file interchange format.

As you can see in the screenshot below, the Azure ARM template schema was built on top of a version of a JSON schema from the JSON Schema project:

![](https://cdn.hashnode.com/uploads/covers/66d08331fe16681b64d858db/49cbf0f6-7dbe-4dfb-bf2b-f8d6204a44c4.png)

To learn more about the JSON Schema project, you can visit their [<VPIcon icon="fas fa-globe"/>website](https://json-schema.org/).

---

## Conclusion

JSON schemas are used all around the world, but they're often not well-understood or talked about. Schemas are a foundational technology relied on by APIs and projects like OpenAPI, AsyncAPI, HL7 FHIR and SDFormat, so they're worth learning about as a dev. Share this article if you enjoyed it. You can also reach out to me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`chidiadi-anyanwu`)](https://linkedin.com/in/chidiadi-anyanwu) or [X (<VPIcon icon="fa-brands fa-x-twitter"/>`chidiadi01`)](https://x.com/chidiadi01).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is a JSON Schema?",
  "desc": "If you're a developer, you likely work with JSON a lot. But how do you define and validate JSON and prevent problems from malformed JSON data? This article explores what a JSON schema is, some example",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-a-json-schema.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
