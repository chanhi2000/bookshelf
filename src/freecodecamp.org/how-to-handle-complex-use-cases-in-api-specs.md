---
lang: en-US
title: "How to Handle Complex Use Cases in Your OpenAPI Specifications – API Documentation Guide"
description: "Article(s) > How to Handle Complex Use Cases in Your OpenAPI Specifications – API Documentation Guide"
icon: iconfont icon-openapi
category:
  - OpenAPI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - openapi
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Handle Complex Use Cases in Your OpenAPI Specifications – API Documentation Guide"
    - property: og:description
      content: "How to Handle Complex Use Cases in Your OpenAPI Specifications – API Documentation Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-handle-complex-use-cases-in-api-specs.html
prev: /tool/openapi/articles/README.md
date: 2024-11-05
isOriginal: false
author: Onyeanuna Prince
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1730415311732/58afe01c-0ac4-4351-a4b4-a15729b5bcb1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "OpenAPI > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/openapi/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Handle Complex Use Cases in Your OpenAPI Specifications – API Documentation Guide"
  desc="When you’re documenting an API reference, there are two main approaches you can follow. You can either use the manual approach of filling in the endpoints via a user interface, or organize a structured document containing all the necessary informatio..."
  url="https://freecodecamp.org/news/how-to-handle-complex-use-cases-in-api-specs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730415311732/58afe01c-0ac4-4351-a4b4-a15729b5bcb1.png"/>

When you’re documenting an API reference, there are two main approaches you can follow. You can either use the manual approach of filling in the endpoints via a user interface, or organize a structured document containing all the necessary information about your API.

This structured document is called an [<FontIcon icon="iconfont icon-openapi"/>OpenAPI specification](https://openapis.org/) (OpenAPI Spec or OAS).

An OpenAPI spec is a format for describing APIs. It's a blueprint that outlines everything about how an API works — what endpoints are available, what data you can send or receive, and what responses to expect.

This means that a well-written OAS file means well-written API reference documentation.

When writing this file, there are some parts that can get a bit complicated. For example, you might have to document a single endpoint with different methods or sometimes duplicate endpoints.

I encountered and documented both of those use cases. So, in this article, I'll show you how you can do the same. We'll go through each use case with sample OpenAPI specs, and at the end, I'll leave you with some useful tips for documenting your OpenAPI spec files.

::: note Prerequisites

There are a few things you need to know to follow along with the use cases below. These include:

1. [**A basic knowledge of APIs and API documentation**](/freecodecamp.org/how-apis-work.md): Familiarity with API terminology and structure (for example, endpoints, methods, request/response structure) is essential to understand how an OpenAPI Specification (OAS) document functions.
2. [<FontIcon icon="iconfont icon-openapi"/>**Familiarity with OpenAPI Specification**](https://spec.openapis.org/oas/latest.html): Basic understanding of OAS, including its purpose, structure, and so on.
3. **Access to Swagger or other OpenAPI documentation tools**: You need tools like the [<FontIcon icon="iconfont icon-swagger"/>Swagger Editor](https://editor-next.swagger.io/) or [<FontIcon icon="fas fa-globe"/>RapiDoc](https://rapidocweb.com/), which will allow you to test and view the OpenAPI files visually.

:::

---

## Setting the Foundation

In both programming and in life, if you can determine that something is "complex," this means that there's also a simplistic-regular way it can be as well. And that's the same for an OAS file.

When creating your spec file, you might not always encounter the use cases we'll address shortly. That's why it’s useful to know what a conventional spec file looks like.

An OpenAPI spec is a human and machine-readable file written in JSON or YAML. Below is an example of an OAS file structure in YAML format:

```yaml
paths:
  /users:
    get:
      summary: Get a list of users
      responses:
        '200':
          description: A list of users.
  /users/{userId}:
    get:
      summary: Get details for a single user
      parameters:
 - name: userId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Details of a single user.
  /orders:
    get:
      summary: Get a list of orders
      responses:
        '200':
          description: A list of orders.
```

Here's a brief breakdown of this OAS file structure:

1. **Paths**: The `paths` section allows you to list each endpoint or URL that you can interact with in this API. Each path, such as `/users` or `/orders`, shows what type of data you can get or send to that URL.
2. **Operations**: Under each path, there's a method or operation, like `GET`, which tells us what we can do with that endpoint. In this example, each path uses `GET`, which means you request information.
3. **Summary**: Each operation has a `summary` — a short description explaining what the endpoint does, like "Get a list of users" or "Get details for a single user."
4. **Parameters**: For paths that include placeholders, like `/users/{userId}`, you'll see a `parameters` section explaining what details are required.
5. **Responses**: Each operation includes a `responses` section, which lists the possible API responses.

::: note

This is not a complete OAS file. I omitted some preceding information for the purpose of this explanation.

:::

Now, let’s dive into the more complex scenarios.

---

## Use Case 1: Duplicate Endpoints

During the development of an API, you may create a single endpoint with multiple variations. Depending on the use case, you might want that endpoint to accept multiple data formats or specific parameters.

When you encounter such scenarios and want to document the API reference using an OpenAPI spec, you won't be able to replicate it exactly how it is in the [<FontIcon icon="iconfont icon-postman"/>Postman](https://postman.com/) collection (or any other development environment).

If you did try, you'll get this error:

![Failed OpenAPI Spec](https://cdn.hashnode.com/res/hashnode/image/upload/v1730414590959/017c94c1-7e33-46c7-b572-b9ea03763e1f.png)

The workaround for this problem is to consolidate these multiple variations under a single path definition by grouping the different requests and responses as **examples**.

In the example below, you have an API that has an endpoint for managing session registration at a conference. This endpoint has various requests and responses based on registration type (for example, Speaker, Attendee, or VIP).

In a Postman collection, you can have each of these endpoints in a separate folder for easy identification and testing.

![Postman collection](https://cdn.hashnode.com/res/hashnode/image/upload/v1730414608239/be94b45d-fb16-438f-9e7e-07cdc38c179d.png)

But when documenting your spec file, it should look like this:

```yaml :collapsed-lines
openapi: 3.0.0
info:
  title: Conference Events API
  description: API to manage event registrations for conferences
  version: 1.0.0
paths:
  /register-session:
    post:
      tags:
        - Registration
      summary: Register for a conference session
      description: Register a user for a specific session based on their role, with details provided for each registration type.
      operationId: registerSession
      requestBody:
        description: Registers a user for a session at the conference. It accepts different formats for attendance, speaker, or VIP registrations.
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SessionRegistration'
            examples:
              Attendee:
                summary: Register as an Attendee
                value:
                  userType: Attendee
                  userId: 789
                  sessionId: 1234
                  preferences:
                    seating: General
                    accessLevel: Basic
              Speaker:
                summary: Register as a Speaker
                value:
                  userType: Speaker
                  userId: 456
                  sessionId: 1234
                  preferences:
                    seating: VIP
                    accessLevel: Full
                    presentationEquipment: Projector
              VIP:
                summary: Register as VIP
                value:
                  userType: VIP
                  userId: 123
                  sessionId: 1234
                  preferences:
                    seating: Front Row
                    accessLevel: Full
                    exclusiveAccess: true
      responses:
        '200':
          description: Successful registration for Attendee, Speaker, or VIP
          content:
            application/json:
              schema:
                type: object
                properties:
                  registrationId:
                    type: string
                  success:
                    type: boolean
              examples:
                Attendee:
                  summary: Response for Attendee registration
                  value:
                    registrationId: att-456def
                    success: true
                Speaker:
                  summary: Response for Speaker registration
                  value:
                    registrationId: spk-123abc
                    success: true
                VIP:
                  summary: Response for VIP registration
                  value:
                    registrationId: vip-789ghi
                    success: true
components:
  schemas:
    SessionRegistration:
      type: object
      properties:
        userType:
          type: string
          description: Type of user registering (e.g., Attendee, Speaker, VIP)
        userId:
          type: integer
          description: Unique ID of the user
        sessionId:
          type: integer
          description: Unique ID of the session to register for
        preferences:
          type: object
          properties:
            seating:
              type: string
              description: Seating preference (e.g., General, VIP, Front Row)
            accessLevel:
              type: string
              description: Access level granted (e.g., Basic, Full)
            presentationEquipment:
              type: string
              description: Required equipment for Speakers (only applicable to Speaker)
            exclusiveAccess:
              type: boolean
              description: Exclusive access for VIP users
```

In this file, you have a single `POST /register-session` path that captures all registration types without duplicating endpoints.

Here's a visual representation of this OAS file using the [<FontIcon icon="iconfont icon-swagger"/>Swagger editor](https://editor-next.swagger.io/):

![OpenAPI Spec Multiple Request Examples](https://cdn.hashnode.com/res/hashnode/image/upload/v1730414627353/eed5843b-f5f4-4e61-9126-51fd10e417c6.png)

---

## Use Case 2: How to Document Multiple HTTP Methods

Another use case you may encounter happens when you have the same endpoint but different HTTP methods.

This usually comes up because each method serves a different purpose, even though they share the same path.

For example, a **GET** method retrieves information about a resource, like viewing a user's registration details for a conference session.

On the other hand, a **PATCH** method updates specific fields for that same user registration, like updating their seat preference.

Since both the `GET` and `PATCH` methods relate to the same resource (`/register-session` in our example), the way around this is to group them under the same path. This way, you'll be documenting two separate methods for a single path.

In OpenAPI, each combination of a path and method is called an "operation". Grouping operations that share the same path helps maintain clearer and more structured documents.

Using the conference events API example, this is what your OAS file should look like:

```yaml :collapsed-lines
openapi: 3.0.0
info:
  title: Conference Events API
  description: API to manage event registrations for conferences
  version: 1.0.0
paths:
  /register-session:
    get:
      tags:
        - Registration
      summary: Retrieve a registration for a conference session
      description: Fetch details for a specific user's registration, like seat assignment and access level.
      operationId: getSessionRegistration
      parameters:
        - in: query
          name: userId
          schema:
            type: integer
          required: true
          description: The ID of the user whose registration you want to retrieve.
      responses:
        '200':
          description: Registration details retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SessionRegistration'
              example:
                userId: 789
                sessionId: 1234
                preferences:
                  seating: General
                  accessLevel: Basic
                  exclusiveAccess: false

    patch:
      tags:
        - Registration
      summary: Update a registration for a conference session
      description: Update specific fields for a user's session registration, such as seating or access level.
      operationId: updateSessionRegistration
      requestBody:
        description: Allows updating fields for a specific session registration.
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateSessionPreferences'
            example:
              userId: 789
              preferences:
                seating: VIP
                accessLevel: Full
                exclusiveAccess: true
      responses:
        '200':
          description: Registration updated successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                  message:
                    type: string
              example:
                success: true
                message: "Registration updated successfully."
components:
  schemas:
    SessionRegistration:
      type: object
      properties:
        userId:
          type: integer
          description: Unique ID of the user
        sessionId:
          type: integer
          description: Unique ID of the session
        preferences:
          type: object
          properties:
            seating:
              type: string
              description: Seating preference (e.g., General, VIP, Front Row)
            accessLevel:
              type: string
              description: Access level granted (e.g., Basic, Full)
            exclusiveAccess:
              type: boolean
              description: Exclusive access granted to certain users

    UpdateSessionPreferences:
      type: object
      properties:
        userId:
          type: integer
          description: Unique ID of the user
        preferences:
          type: object
          properties:
            seating:
              type: string
              description: New seating preference (e.g., VIP)
            accessLevel:
              type: string
              description: Updated access level (e.g., Full)
            exclusiveAccess:
              type: boolean
              description: Updated access preference (e.g., true or false)
```

In this file, you have a single `/register-session` path with multiple methods. We define just one path, `/register-session`, and list the `GET` and `PATCH` methods under it. This keeps the spec clean, reduces duplication, and shows that these methods relate to the same resource.

Here's a visual representation of this OAS file using the Swagger editor:

![Multiple methods in one operation in an OpenAPI spec](https://cdn.hashnode.com/res/hashnode/image/upload/v1730414663261/680dd222-8d36-41be-a73a-10a55771d906.png)

---

## API Documentation Tips

While working with OpenAPI specifications, there are some useful tricks and tips that can make your OAS file more readable and maintainable.

### Use Markdown in OpenAPI

OpenAPI specifications allow the use of Markdown in the `description` field. The version of Markdown used in OAS is called CommonMark, the same version used in GitHub.

Markdown formatting allows you to make text more visually engaging and organized. You can add formatting such as headers, lists, code blocks, bold, italics, and so on, which can make your documentation easier to scan and more accessible for readers.

For example, if you need to emphasize certain parts of an endpoint's purpose or highlight important details, Markdown lets you do it naturally.

You can add Markdown directly into any `description` field in the OpenAPI file, like this:

```yaml
paths:
  /register-session:
    get:
      description: |
        ## Retrieve Session Registration
       Retrieves the registration details for a specific user.  
       - **Note:** This data includes seat assignment and access level.  
       - Example of JSON response: `{"userId": 789, "sessionId": 1234, "seating": "General"}`
      responses:
        '200':
          description: Registration details retrieved successfully
```

When deployed to supported documentation platforms like [<FontIcon icon="fas fa-globe"/>RapiDoc](https://rapidocweb.com/) or [<FontIcon icon="fas fa-globe"/>ReadMe](https://readme.com/), this will render beautifully with all your Markdown styling intact.

Here's a deployed version of this example in Readme:

![Markdown in description field on Readme](https://cdn.hashnode.com/res/hashnode/image/upload/v1730414669217/100bcde8-a25e-4eab-9102-5113476a334b.png)

### Use the `operationId` Field

The `operationId` field is an optional field in OpenAPI specs that assigns a unique name to each API operation.

It is an identifier that you can use to call specific methods when integrating with SDKs or when linking between parts of your documentation.

By effectively using the `operationId`, you make it much easier for developers to reference specific actions in the API, which is especially helpful when the API is complex or has multiple endpoints.

Place the `operationId` inside each HTTP method block to give it a unique identifier. For instance:

```yaml
paths:
  /register-session:
    get:
      operationId: getSessionRegistration
      description: Retrieve a registration for a conference session
      responses:
        '200':
          description: Successfully retrieved the registration
    patch:
      operationId: updateSessionRegistration
      description: Update a registration for a conference session
      responses:
        '200':
          description: Registration updated successfully
```

With the `operationId`, developers can directly refer to `getSessionRegistration` or `updateSessionRegistration` as function calls in code or API clients.

### Use `$ref` for Reusable Components

The `$ref` keyword in OpenAPI lets you create and reuse components across your spec file. This technique is especially helpful when you have similar request bodies, responses, or parameters repeated in multiple endpoints.

By defining components in a single place and referencing them as needed, you avoid redundancy, reduce errors, and facilitate updates.

So, instead of updating the same parameter across multiple locations, you update it once in the reusable component, and every endpoint using it gets the update.

To use it, first define the reusable component in the components section of your OpenAPI file, then reference it elsewhere using `$ref`:

```yaml
components:
  schemas:
    RegistrationDetails:
      type: object
      properties:
        userId:
          type: integer
        sessionId:
          type: integer
        seating:
          type: string
paths:
  /register-session:
    post:
      summary: Register for a session
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RegistrationDetails'
      responses:
        '201':
          description: Successfully registered for the session
```

In this file, `RegistrationDetails` is defined once and is referenced using the `$ref` keyword in the `/register-session` operation.

---

## Conclusion

In this article, you learned how to resolve some complex use cases you might encounter when documenting your API reference using an OpenAPI specification. We went through what to do when you have a single endpoint with multiple methods or duplicate endpoints.

Creating your API reference without an OpenAPI spec file is a manual approach that can become redundant if you have to replicate it across various platforms. But by relying on the tips from the article, you're sure to create better, more efficient, and more reusable OpenAPI specifications. And these, in turn, will lead to better API documentation.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Handle Complex Use Cases in Your OpenAPI Specifications – API Documentation Guide",
  "desc": "When you’re documenting an API reference, there are two main approaches you can follow. You can either use the manual approach of filling in the endpoints via a user interface, or organize a structured document containing all the necessary informatio...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-handle-complex-use-cases-in-api-specs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
