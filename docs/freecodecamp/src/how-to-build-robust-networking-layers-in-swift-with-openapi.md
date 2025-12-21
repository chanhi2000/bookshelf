---
lang: en-US
title: "How to Build Robust Networking Layers in Swift with OpenAPI"
description: "Article(s) > How to Build Robust Networking Layers in Swift with OpenAPI"
icon: fa-brands fa-swift
category:
  - Swift
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - swift
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Robust Networking Layers in Swift with OpenAPI"
    - property: og:description
      content: "How to Build Robust Networking Layers in Swift with OpenAPI"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-robust-networking-layers-in-swift-with-openapi.html
prev: /programming/swift/articles/README.md
date: 2025-07-23
isOriginal: false
author:
  - name: Sravan Karuturi
    url : https://freecodecamp.org/news/author/sravankaruturi/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1753206547489/dce9a849-1ccd-4cb0-bca8-f879a5aadf5f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Swift > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/swift/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Robust Networking Layers in Swift with OpenAPI"
  desc="What is the Problem We’re Solving? For many app developers, including me, writing the networking layer of an application is a familiar and tedious process. You write and test your first call and after that, it involves a repetitive cycle of tasks. Th..."
  url="https://freecodecamp.org/news/how-to-build-robust-networking-layers-in-swift-with-openapi"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1753206547489/dce9a849-1ccd-4cb0-bca8-f879a5aadf5f.png"/>

## What is the Problem We’re Solving?

For many app developers, including me, writing the networking layer of an application is a familiar and tedious process. You write and test your first call and after that, it involves a repetitive cycle of tasks.

This is how it would look in the case of Swift:

1. You create a `URLSession` Instance.
2. You create a `URLRequest` Object.
3. You create the `@Codable` models to match the expected input and output from the server.

You do the above steps for each API endpoint you have on your backend that your app uses. Not only is this process time-consuming and not challenging for developers, it’s also error prone.

In the above case, if there was a minor change in the backend API - perhaps a renamed field or a new property - this would lead to the app potentially breaking. But you wouldn’t know this until you shipped it to QA or in a worse case, your consumer. This is where the OpenAPI Specification emerges as a modern, robust solution.

In this tutorial, you’ll learn what OpenAPI is and how it can help make your development process better. After that, we’ll implement OpenAPI by creating a small SwiftUI app and using OpenAPI methodologies to interface with the `JSONPlaceholder` API. Let’s get started.

::: note Who is This Guide For?

This guide is intended both for new developers looking for best practices and for experienced developers looking to implement or learn more about the OpenAPI Specification. Let’s get into it.

:::

---

## What is OpenAPI and Why Should You Care?

At its core, the OpenAPI Specification provides a *standard, language-agnostic interface* for describing RESTful APIs. This specification, once populated, allows both humans and computers to discover and understand the capabilities of a service without needing to access the source code or the network requests.

The power of OpenAPI is that it acts as a *formal contract between different parts of the system.* This contract helps both frontend and backend programmers by removing ambiguity during design process. This also has added benefit of using code generators to generate boiler-plate code both on backend and on the client ( which we will also discuss today ).

Traditionally when you want to create a new API in a team, either the PM, the frontend engineer, or the backend engineer takes it upon themselves to request it. Then the backend team builds it and documents it. This in turn is used by the front end team to use the API.

```plainntext
Some Requester → Backend Team → Documentation → Frontend Team
```
<!-- TODO: mermaid로 표현 -->

If you’re using OpenAPI, when someone makes a request for a new API, it is formalized into a specification after deliberations with both the frontend and the backend team. This then serves as the source of truth and is used to generate the backend and the frontend code without as much interdependence.

```plainntext
Some Requester → All Teams → Specification → All Teams.
```
<!-- TODO: mermaid로 표현 -->

This not only streamlines the process of adding new APIs, but provides a definitive source of truth for each endpoint. This also makes it so that frontend engineers and backend engineers are not misaligned about a provided parameter in the result being an `Int` or a `String` and so on. **It’s all in the Spec.**

### Benefits for Swift (iOS) Developers

Adopting OpenAPI and `swift-openapi-generator` brings a host of tangible benefits to the Swift/App development process. It transforms how applications interact with web services in a few key ways.

#### Reduced Development Time and Cost

The most immediate improvement you will see is the significant reduction in boilerplate code you have to write. The generator automates the creation of what is called boilerplate code or ceremonial code. This is the repetitive logic for network requests, response handling, and data model definitions.

By delegating this work, developers can work on the core features of the application which leads to faster and more interesting development cycles.

#### Compile Time Type Safety

This has been a major improvement for me personally. Instead of relying on the “strongly” typed keys for JSON parsing, we now work with strongly typed models. The generator creates native Swift struct and enum types directly from the schemas defined in the OpenAPI document. This brings the power of a strongly-typed system to the networking and parsing layer.

For example, if the return value of an API is made optional, instead of crashing at runtime, we will fail to compile at build time. This forces us to address this issue right away.

#### Improved Collaboration and Interoperability

This makes sure that all the developers are on the same page with regard to a given endpoint. And since this specification is language agnostic, it will serve as a universal language for all teams involved in the project - mobile, web and backend.

#### Other Tooling

Once you have a specification, you can use that to power a wide variety of tools. You can generate interactive documentation, create mock servers for frontend development, and run automated tests.

Alright hopefully you’re sold - so now how do you implement this into your project?

---

## A Practical Guide to Implementing This Solution

We’ll now take a look at a practical example so you can understand how you can implement this in a project. This involves:

- Creating an <VPIcon icon="iconfont icon-yaml"/>`openapi.yaml` file to describe the API specification.
- Configuring and integrating `swift-openapi-generator` into a SwiftUI application.
- Prototyping an app that fetches and displays a list of posts from the [<VPIcon icon="fas fa-globe"/>jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/)

To follow along, you will need Xcode installed and a basic understanding of Swift programming and SwiftUI for App development.

### Step 1: Create a good <VPIcon icon="iconfont icon-yaml"/>`openapi.yaml` file (the specification)

The quality of a specification is really important because it directly determines the quality of the code produced by `swift-openapi-generator`. If you don’t have a good specification, you might run into several issues that developers often complain about, like confusing and long method names.

For example, it might generate something like `get_all_my_meal_recipes_hyphen_detailed`. This might happen because the generator is forced to create a new name based on the API path if the identifier is not provided in the spec. So, instead of dealing with these issues one after the other, we will create a *good clear specification* to start with.

Since we’re using the `jsonplaceholder` as our backend server, we are limited by what tweaks we can make - but it is a fantastic project that lets us mimic a backend server.

In general, an <VPIcon icon="iconfont icon-yaml"/>`OpenAPI.yaml` file contains:

1. OpenAPI Info and servers - This will provide the metadata about the API like the OpenAPI version, which server to point to for calls, and so on.
2. Paths - This will provide the available endpoints. In our case, it can contain /posts as one of them. We also will have to mention the kind of endpoint (get, post, put, and so on)
3. OperationID - This field instructs the generator to create a clear method with this name.
4. Responses - This defines the possible outcomes of an API call. We will specify the structure of a successful 200 OK response or any other errors here.
5. Components / Schemas - This defines all the reusable components and data models. If we have a Post schema definer here, the generator will use this to create a Post struct in Swift to match this.

Keeping in mind all these elements, I compiled a yaml file for us to use for this tutorial:

```yaml :collapsed-lines title="openapi.yaml"
openapi: "3.0.3"
info:
  title: "JSONPlaceholder API"
  version: "1.0.0"
servers:
  - url: "https://jsonplaceholder.typicode.com"
paths:
  /posts:
    get:
      summary: "Get all posts"
      operationId: "getPosts"
      responses:
        "200":
          description: "A list of posts"
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Post"
components:
  schemas:
    Post:
      type: object
      required:
        - userId
        - id
        - title
        - body
      properties:
        userId:
          type: integer
        id:
          type: integer
        title:
          type: string
        body:
          type: string
```

The first line here, `openapi: “3.0.3”`, just tells the generators and parsers that we are using version `3.0.3`.

Next, we have some more metadata - the name and version of the API. We also have the server we are calling with our APIs.

After defining this metadata, we now define our endpoints. For the sake of this example, let’s assume that we only have one endpoint to call to get posts. We represent this by saying `/posts` under paths. We then specify which kind it is by specifying `get:`.

We give a short description of what it does in the `summary` and then specify an `operationId` which is what we this function will be called in our generated code. We also specify exactly what structure the response will have, that is, a JSON of an array of `Posts`.

We then list any components we have across our APIs like the `Post`. Note that we are using the `Post` schema in the return response structure before we define it further down. The schemas in components will determine the Model structs we will generate using this yaml file.

### Step 2: Set up your project

Create a new SwiftUI project. For the purpose of this tutorial, we’ll use an iOS app - but you can do this with any app. Select Swift as the language and SwiftUI for the interface.

![App Creation Screen](https://cdn.hashnode.com/res/hashnode/image/upload/v1753047209636/75cad7d3-f403-4285-8209-fd2bb65418e5.png)

![Basic SwiftUI App after it's created](https://cdn.hashnode.com/res/hashnode/image/upload/v1753047246793/3491aa5d-c35c-4157-adf2-789fe5e9cd96.png)

Add the <VPIcon icon="iconfont icon-yaml"/>`openapi.yaml` file we just created to this project. (You can also create this file in Xcode and copy, paste from the script above.)

![Adding the <VPIcon icon="iconfont icon-yaml"/>`openapi.yaml` file to our project](https://cdn.hashnode.com/res/hashnode/image/upload/v1753047290178/fc31b759-b1c4-4b48-b58b-d90109614cd0.png)

Now, add the following swift packages to the project. (**Note: Please read the entire section about adding packages before you proceed.**)

::: tabs

@tab:active 1. Swift OpenAPI Generator

<SiteInfo
  name="apple/swift-openapi-generator"
  desc="Generate Swift client and server code from an OpenAPI document."
  url="https://github.com/apple/swift-openapi-generator/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/c8e42e6239118fa91069f496cb41dd66f15003a5f84ed03663fef9f0dab2f210/apple/swift-openapi-generator"/>

> The Core Generator Plugin.

![Adding Swift OpenAPI Generator to our Project](https://cdn.hashnode.com/res/hashnode/image/upload/v1753047376776/b1d7b2d0-9b1f-45c8-8c74-4395a4c80dd9.png)

![Making sure that no targets are selected for the OpenAPIGenerator](https://cdn.hashnode.com/res/hashnode/image/upload/v1753047411622/c6eca0c0-538e-40b5-a9b0-9fa044b60694.png)

@tab 2.  Swift OpenAPI Runtime

<SiteInfo
  name="apple/swift-openapi-runtime"
  desc="API package for code generated by Swift OpenAPI Generator"
  url="https://github.com/apple/swift-openapi-runtime/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2b7c50ab5d12ff58db2840b9183286336f4dec3f58c536c78bb67b38dd9133bd/apple/swift-openapi-runtime"/>

> This contains the common types and protocols used by the code generated by the generator plugin.

![Adding OpenAPIRuntime to our project](https://cdn.hashnode.com/res/hashnode/image/upload/v1753047457532/846ec488-cfed-4ca5-811b-c38dba0aaf30.png)

@tab 3. Swift OpenAPI <code>URLSession</code>

<SiteInfo
  name="apple/swift-openapi-urlsession"
  desc="URLSession transport for Swift OpenAPI Generator."
  url="https://github.com/apple/swift-openapi-urlsession/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/8a36569fe758495384a6adcc439e5f07f045a444db9aaaa6f674760c78535deb/apple/swift-openapi-urlsession"/>

> This is a transport layer that allows the generated code to use the Apple URLSession to make network requests.

![Adding OpenAPIURLSession to our Project](https://cdn.hashnode.com/res/hashnode/image/upload/v1753047476699/9556047e-cc33-44b4-9980-0c692d4c1d01.png)

:::

One major caveat to note here when adding these packages is that **The Swift OpenAPI Generator** should **not** be added to your project target. This is because we’re only using this to generate the code, but we’re not using it in the app.

If you get this error: `swift-openapi-generator/Sources/_OpenAPIGeneratorCore/PlatformChecks.swift:21:5 _OpenAPIGeneratorCore is only to be used by swift-openapi-generator itself—your target should not link this library or the command line tool directly.` - then you made this mistake.

The easiest way to fix this is removing the package and adding it again. Or you can go to `Project → Target → Build Phases → Link Binary with Libraries → Remove Swift OpenAPI Generator`.

![Where to check if you encounter that error](https://cdn.hashnode.com/res/hashnode/image/upload/v1753048265985/100428a4-e46a-4aa1-8fcf-4c74e26ffed6.png)

Now that we added these generator and runtime plugins, we need to give the generator some instructions on what to generate. You can do this with an <VPIcon icon="iconfont icon-yaml"/>`openapi-generator-config.yaml` file. For our project, use the following file. It’s really simple:

```yaml title="openapi-generator-config.yaml"
generate:
  - types
  - client
```

This tells our generator to generate the **types** - the swift structs, enums, and so on from the schema section of the file, and the **client** - the main class which interacts with the networking logic.

![<VPIcon icon="iconfont icon-yaml"/>`openapi-generator-config.yaml` file](https://cdn.hashnode.com/res/hashnode/image/upload/v1753048237863/963d6bc0-a368-427b-add3-75dcf4bd3edf.png)

Save this into an <VPIcon icon="iconfont icon-yaml"/>`openapi-generator-config.yaml` file as shown.

And finally, we want the generator to run whenever we want to build this application/target. We can specify this in the Build Phases tab of the target. Under the “ Target → Build Phases → Run Build Tool Plug-ins” , add the OpenAPIGenerator Plugin.

![Adding the generator in the build phase](https://cdn.hashnode.com/res/hashnode/image/upload/v1753048334094/24e20adc-c6e0-4d66-965b-19d476a5ffd3.png)

The first time the project is built after setting this, Xcode will display a security dialog. This will let us “Trust and Enable” for this plugin. It’s a one time confirmation that gives this plugin the permission required to run during the build process.

![Trust and Enable security dialog for the generator](https://cdn.hashnode.com/res/hashnode/image/upload/v1753048374405/6ff51ff4-d33a-4920-b95f-9fda0ee0aef4.png)

As soon as you build the second time after giving these permissions, you will generate the files. You might not see any changes in the Xcode window itself. But if you’re curious to see the result, go to this folder.

`DerivedData → <ProjectName>*identifier → Build → intermediates.noindex → BuildToolPluginIntermediates → <TargetName>.output → <TargetName> → OpenAPIGenerator → GeneratedSources`

More on derived data folder here: [https://gayeugur.medium.com/derived-data-2e9468c6da9b](https://gayeugur.medium.com/derived-data-2e9468c6da9b) if you’re curious.

Keep in mind that this location might vary based on Xcode version, OpenAPI version, and your project settings. But you don’t need to worry about the file location.

You will see three files called Client.swift, Types.swift, and Server.swift.

![Generated Files](https://cdn.hashnode.com/res/hashnode/image/upload/v1753048508703/8fcec6bf-ad86-47de-b57c-7dca22256e06.png)

These are the files that the our generator created and populated with the types and functions we need.

In the next section, we discuss how to use these files to make calls to the server.

### Step 3: Write a wrapper

While it’s certainly possible to make the calls to server using just the generated code (`Client`) type throughout our application, a more maintainable approach is to use a wrapper around these types. This will provide a stable, clean interface for the rest our our app to use, and it decouples feature code from the generated code.

I can hear you thinking: “Wait a second. Isn’t the entire purpose of generating this code to avoid this boilerplate abstraction?”

While it adds some abstraction on top of the generated code, it’s valuable to have this for number of reasons. Here are but a few of them:

1. Better naming. The generated `Post` struct right now will be called `Components.Schemas.Post`.
2. If you ever want to move away from the generator, an abstraction is really helpful.
3. If you want to Mock this server call, you can do this via the abstraction.
4. UI Optimization. You might want to flatten the structure of a model to reduce the number of computed variables in there, and so on.

So, we want to wrap this around a file called `WebService.swift`:

```swift :collapsed-lines title="WebService.swift"
import Foundation
import OpenAPIURLSession

// A clean, app-specific Post model.
// This decouples views from the generated types.
struct AppPost: Identifiable, Codable {
    let id: Int
    let title: String
    let body: String
}

class WebService {
    private let client: Client

    init() {
        // The server URL and transport are from the generated code.
        // `Servers.Server1.url()` corresponds to the first URL in the `servers` array of the spec.
        self.client = Client(
            serverURL: try! Servers.Server1.url(),
            transport: URLSessionTransport()
        )
    }

    func getPosts() async throws -> [AppPost] {
        // Call the generated method, which was named using `operationId`.
        let response = try await client.getPosts(.init())

        // The generated response is a type-safe enum covering all documented status codes.
        switch response {
        case.ok(let okResponse):
            // The body is also a type-safe enum for different content types.
            switch okResponse.body {
            case.json(let posts):
                // Map the generated `Components.Schemas.Post` to our clean `AppPost` model.
                return posts.map { post in
                    AppPost(id: post.id, title: post.title, body: post.body)
                }
            }
        // The generator forces the handling of other documented responses.
        // Our simple spec only has a 200, so any other response is undocumented.
        case.undocumented(statusCode: let statusCode, _):
            throw URLError(.badServerResponse, userInfo: ["statusCode": statusCode])
        }
    }
}
```

Let’s go through this file to understand what we’re doing.

First, we import `OpenAPIUrlSession` along with `Foundation`. This allows us to call the server, get a response and parse that response.

Next, we define the new `AppPost` struct. This is meant to be the representation of a `Post` in the App. In the generated <VPIcon icon="fa-brands fa-swift"/>`Types.Swift` file, we have the generated `Post` structure. This is defined as:

```swift title="Type.swift"
/// - Remark: Generated from `#/components/schemas/Post`.
        internal struct Post: Codable, Hashable, Sendable {
            /// - Remark: Generated from `#/components/schemas/Post/userId`.
            internal var userId: Swift.Int
            /// - Remark: Generated from `#/components/schemas/Post/id`.
            internal var id: Swift.Int
            /// - Remark: Generated from `#/components/schemas/Post/title`.
            internal var title: Swift.String
            /// - Remark: Generated from `#/components/schemas/Post/body`.
            internal var body: Swift.String
            /// Creates a new `Post`.
            ///
            /// - Parameters:
            ///   - userId:
            ///   - id:
            ///   - title:
            ///   - body:
            internal init(
                userId: Swift.Int,
                id: Swift.Int,
                title: Swift.String,
                body: Swift.String
            ) {
                self.userId = userId
                self.id = id
                self.title = title
                self.body = body
            }
            internal enum CodingKeys: String, CodingKey {
                case userId
                case id
                case title
                case body
            }
        }
```

As you can see, our `AppPost` struct is different from this generated type. We omit the `userId` since we do not care about it (at least for now).

Back to the `WebService` class, we see a `client` attribute. This is a generated type variable that will let us interact with the servers. In the initializer of the `WebService` class, we create a new `Client` using the first server URL we specified in the schema and use the `URLSessionTransport` object for making these calls.

We then define our methods. In this case, our `getPosts()` function which returns `[AppPost]` array.

`let response = try await client.getPosts(.init())` will call the function `getPosts()` on the `Client` object. The `Client.getPosts()` function here takes in an input struct called `Operations.getPosts.Input` which is initialized by the `.init()` passed here.

This generated response is a type-safe enum covering all documented codes. (Currently only `200` in our yaml file). So, we use a simple switch to look at both these cases and further use more switch statements to get the proper response. You can see how much easier this is than to parse the response manually.

Once we get the `Components.Schemas.Post` response, we map and convert it into `[AppPost]` array and return it.

Now, let’s use this wrapper to display data in our app.

### Step 4: Call the wrapper and display the data

We’re at the final step now. We’ll use the wrapper we created to display the fetched posts. We’ll also use a state variable to store our `AppPost` array in our `ContentView` view. We’ll then call `getPosts()` when the view is first displayed to the user.

```swift :collapsed-lines title="ContentView.swift"
import SwiftUI

struct ContentView: View {
    @State private var posts: [AppPost] = []
    @State private var errorMessage: String?

    private let webService = WebService()

    var body: some View {
        NavigationStack {
            List(posts) { post in
                VStack(alignment:.leading, spacing: 8) {
                    Text(post.title)
                       .font(.headline)
                    Text(post.body)
                       .font(.subheadline)
                       .foregroundColor(.secondary)
                }
               .padding(.vertical, 4)
            }
           .navigationTitle("Posts")
           .task {
                await loadPosts()
            }
           .overlay {
                if let errorMessage {
                    ContentUnavailableView("Error", systemImage: "xmark.octagon", description: Text(errorMessage))
                } else if posts.isEmpty {
                    ProgressView()
                }
            }
        }
    }

    func loadPosts() async {
        self.errorMessage = nil
        do {
            self.posts = try await webService.getPosts()
        } catch {
            self.errorMessage = error.localizedDescription
        }
    }
}

#Preview {
    ContentView()
}
```

You can see the dummy posts in the Preview. As you can see, all we had to do was call the `webService.getPosts()` to populate the variable.

![Simulator Run of the app showing the fetched posts](https://cdn.hashnode.com/res/hashnode/image/upload/v1753053957409/b89d50e8-ab73-4484-beda-3a328a575144.png)

You might be thinking that this is a lot of setup for a simple struct like `Post` for which we had to create a wrapper called `AppPost` anyway. But if you had ten types like this and twenty endpoints to call? You wouldn’t have to deal with a lot of repetitive, error-prone code.

---

## Potential Pitfalls

Unfortunately, no process is perfect. You might still face a lot of issues with generated code and this method. I’ve listed some of them here and how to deal with them.

### Verbose or ugly generated code

If you have very verbose or ugly generated code, the problem is almost always the missing `operationId` for an API path. If you don’t specify one, the generator must create a name from the path and the HTTP method with results in long unwieldy names. Adding a clear `operationId` will mitigate this issue.

### Large Specs and Performance Issues

If you have a very large Spec file, generating a client for this entire specification can significantly increase the compile time. It can also result in absolutely massive <VPIcon icon="fa-brands fa-swift"/>`Types.swift` and <VPIcon icon="fa-brands fa-swift"/>`Client.swift` files.

There is a filter option in the `openapi-generator-config.yaml` file that will allow the generator to include only parts of the spec that are relevant to the application to improve build times and so on. But if you want everything in an API that has hundreds of endpoints, the only way to reduce compile times is to avoid regenerating this every time and decouple this step from the regular build process.

### Unsupported Spec Features

While the swift package, `swift-openapi-generator`, is robust, it does not support all the features included in the specification. I had issues with some features of the newer spec version ( `3.1.1` and had to downgrade to `3.0.3` to make it work well ).

There are also known issues like lack of support for certain types of recursive schemas. Sometimes, the generator errors out and fails and some other times, it generates incomplete types - which can result in a few hours of debugging (I speak from experience).

In any case, knowing the limits of this generator can be helpful in avoiding issues it might cause. Also keep in mind that it is always getting better thanks to its open source nature.

---

## Conclusion: Embrace Spec-Driven Development

In this guide, you navigated the journey of adopting `swift-openapi-generator` - from understanding the power of API contracts to building a functional SwiftUI app. You also learned about the real life challenges of this process. While there is an initial learning curve, the benefits of this approach are profound.

The core tenet of this approach is to foster more disciplined and more robust method for building applications. By making the OpenAPI document the single source of truth, you make sure that both the frontend and backend are perfectly in sync in perpetuity.

Using this approach also results in more type-safe, maintainable code. The result is less time spent on writing boilerplate and debugging random integration errors and more time spent creating the app itself.

For developers ready to explore further, please checkout the official `swift-openapi-generator` repository on Github here:

<SiteInfo
  name="apple/swift-openapi-generator"
  desc="Generate Swift client and server code from an OpenAPI document."
  url="https://github.com/apple/swift-openapi-generator/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/af3f30cf5471a7fdf8c2e69b5d2af4be26de959dabd4a04a27f22e8a85023eea/apple/swift-openapi-generator"/>

You can follow me on [GitHub (<VPIcon icon="iconfont icon-github"/>`sravankaruturi`)](https://github.com/sravankaruturi) and [<VPIcon icon="fas fa-globe"/>Hashnode](https://hashnode.com/@sravankaruturi) for my other posts and projects.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Robust Networking Layers in Swift with OpenAPI",
  "desc": "What is the Problem We’re Solving? For many app developers, including me, writing the networking layer of an application is a familiar and tedious process. You write and test your first call and after that, it involves a repetitive cycle of tasks. Th...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-build-robust-networking-layers-in-swift-with-openapi.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
