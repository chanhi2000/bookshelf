---
lang: en-US
title: "Keeping Article Demos Alive When Third-Party APIs Die"
description: "Article(s) > Keeping Article Demos Alive When Third-Party APIs Die"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Keeping Article Demos Alive When Third-Party APIs Die"
    - property: og:description
      content: "Keeping Article Demos Alive When Third-Party APIs Die"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/keeping-article-demos-alive-when-third-party-apis-die.html
prev: /programming/css/articles/README.md
date: 2025-07-30
isOriginal: false
author:
  - name: Mészáros Róbert
    url : https://css-tricks.com/author/meszarosrob/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/05/nodes-pattern.png
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
  name="Keeping Article Demos Alive When Third-Party APIs Die"
  desc="Is there a way to build demos that do not break when the services they rely on fail? How can we ensure educational demos stay available for as long as possible?"
  url="https://css-tricks.com/keeping-article-demos-alive-when-third-party-apis-die"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/05/nodes-pattern.png"/>

After four years, the demos in my [**“Headless Form Submission with the WordPress REST API”**](/css-tricks.com/headless-form-submission-with-the-wordpress-rest-api.md) article finally stopped working.

The article includes CodePen embeds that demonstrate how to use the REST API endpoints of popular WordPress form plugins to capture and display validation errors and submission feedback when building a completely custom front-end. The pens relied on a WordPress site I had running in the background. But during a forced infrastructure migration, the site failed to transfer properly, and, even worse, I lost access to my account.

Sure, I *could* have contacted support or restored a backup elsewhere. But the situation made me wonder: what if this had not been WordPress? What if it were a third-party service I couldn’t self-host or fix? Is there a way to build demos that do not break when the services they rely on fail? How can we ensure educational demos stay available for as long as possible?

Or is this just inevitable? Are demos, like everything else on the web, doomed to break eventually?

---

## Parallels with software testing

Those who write tests for their code have long wrestled with similar questions, though framed differently. At the core, the issue is the same. Dependencies, especially third-party ones, become hurdles because they are outside the bounds of control.

Not surprisingly, the most reliable way to eliminate issues stemming from external dependencies is to remove the external service entirely from the equation, effectively decoupling from it. Of course, how this is done, and whether it’s always possible, depends on the context.

As it happens, techniques for handling dependencies can be just as useful when it comes to making demos more resilient.

To keep things concrete, I’ll be using the mentioned CodePen demos as an example. But the same approach works just as well in many other contexts.

---

## Decoupling REST API dependencies

While there are many strategies and tricks, the two most common approaches to breaking reliance on a REST API are:

1. Mocking the HTTP calls in code and, instead of performing real network requests, returning stubbed responses
2. Using a mock API server as a stand-in for the real service and serving predefined responses in a similar manner

Both have trade-offs, but let’s look at those later.

---

## Mocking a response with an interceptor

Modern testing frameworks, whether for unit or end-to-end testing, such as [**Jest**](/css-tricks.com/writing-tests-for-react-applications-using-jest-and-enzyme.md#mock-api-calls.md) or [<VPIcon icon="iconfont icon-playwright"/>Playwright](https://playwright.dev/docs/mock#mock-api-requests), offer built-in mocking capabilities.

However, we don’t necessarily need these, and we can’t use them in the pens anyway. Instead, we can monkey patch the [<VPIcon icon="fa-brands fa-firefox" />Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to intercept requests and return mock responses. With monkey patching, when changing the original source code isn’t feasible, we can introduce new behavior by overwriting existing functions.

Implementing it looks like this:

```js
const fetchWPFormsRestApiInterceptor = (fetch) => async (
  resource,
  options = {}
) => {
  // To make sure we are dealing with the data we expect
  if (typeof resource !== "string" || !(options.body instanceof FormData)) {
    return fetch(resource, options);
  }

  if (resource.match(/wp-json\/contact-form-7/)) {
    return contactForm7Response(options.body);
  }

  if (resource.match(/wp-json\/gf/)) {
    return gravityFormsResponse(options.body);
  }

  return fetch(resource, options);
};

window.fetch = fetchWPFormsRestApiInterceptor(window.fetch);
```

We override the default `fetch` with our own version that adds custom logic for specific conditions, and otherwise lets requests pass through unchanged.

The replacement function, `fetchWPFormsRestApiInterceptor`, acts like an interceptor. An interceptor is simply a pattern that modifies requests or responses based on certain conditions.

Many HTTP libraries, like the once-popular [<VPIcon icon="iconfont icon-axios"/>axios](https://axios-http.com/), offer a convenient API to add [**interceptors**](/css-tricks.com/stay-dry-using-axios-for-api-requests.md#interceptors) without resorting to monkey patching, which should be used sparingly. It’s all too easy to introduce subtle bugs unintentionally or create conflicts when managing multiple overrides.

With the interceptor in place, returning a fake response is as simple as calling the static JSON method of the [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object:

```js
const contactForm7Response = (formData) => {
  const body = {}

  return Response.json(body);
};
```

Depending on the need, the response can be anything from plain text to a `Blob` or `ArrayBuffer`. It’s also possible to specify custom status codes and include additional headers.

For the CodePen demo, the response might be built like this:

```js
const contactForm7Response = (formData) => {
  const submissionSuccess = {
    into: "#",
    status: "mail_sent",
    message: "Thank you for your message. It has been sent.!",
    posted_data_hash: "d52f9f9de995287195409fe6dcde0c50"
  };
  const submissionValidationFailed = {
    into: "#",
    status: "validation_failed",
    message:
      "One or more fields have an error. Please check and try again.",
    posted_data_hash: "",
    invalid_fields: []
  };

  if (!formData.get("somebodys-name")) {
    submissionValidationFailed.invalid_fields.push({
      into: "span.wpcf7-form-control-wrap.somebodys-name",
      message: "This field is required.",
      idref: null,
      error_id: "-ve-somebodys-name"
    });
  }

  // Or a more thorough way to check the validity of an email address
  if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(formData.get("any-email"))) {
    submissionValidationFailed.invalid_fields.push({
      into: "span.wpcf7-form-control-wrap.any-email",
      message: "The email address entered is invalid.",
      idref: null,
      error_id: "-ve-any-email"
    });
  }

  // The rest of the validations...

  const body = !submissionValidationFailed.invalid_fields.length
    ? submissionSuccess
    : submissionValidationFailed;

  return Response.json(body);
};
```

At this point, any `fetch` call to a URL matching `wp-json/contact-form-7` returns the faked success or validation errors, depending on the form input.

Now let’s contrast that with the mocked API server approach.

---

## Mocked API server with serverless

Running a traditionally hosted mock API server reintroduces concerns around availability, maintenance, and cost. Even though the hype around serverless functions has quieted, we can sidestep these issues by using them.

And with [<VPIcon icon="fa-brands fa-digital-oceans"/>DigitalOcean Functions](https://digitalocean.com/products/functions) offering a generous free tier, creating mocked APIs is practically free and requires no more effort than manually mocking them.

For simple use cases, everything can be done through the Functions control panel, including writing the code in the built-in editor. Check out this concise presentation video to see it in action:

For more complex needs, functions can be [<VPIcon icon="fa-brands fa-digital-oceans"/>developed locally and deployed](https://docs.digitalocean.com/products/functions/how-to/develop-functions/) using `doctl` (DigitalOcean’s CLI).

To return the mocked response, it’s easier if we [<VPIcon icon="fa-brands fa-digital-oceans"/>create a separate Function](https://docs.digitalocean.com/products/functions/how-to/create-functions/) for each endpoint, since we can avoid adding unnecessary conditions. Fortunately, we can stick with JavaScript (Node.js), and starting with nearly the same base we used for `contactForm7Response`:

```js
function main(event) {
  const body = {};

  return { body };
}
```

We must name the handler function `main`, which is invoked when the endpoint is called. The function receives the `event` object as its first argument, containing the [<VPIcon icon="fa-brands fa-digital-oceans"/>details of the request](https://docs.digitalocean.com/products/functions/reference/runtimes/node-js/#parameters). Once again, we could return anything, but to return the JSON response we need, it’s enough to simply [<VPIcon icon="fa-brands fa-digital-oceans"/>return an object](https://docs.digitalocean.com/products/functions/reference/runtimes/node-js/#returns).

We can reuse the same code for creating the response as-is. The only difference is that we have to extract the form input data from the `event` as `FormData` ourselves:

```js
function main(event) {
  // How do we get the FormData from the event?
  const formData = new FormData();

  const submissionSuccess = {
    // ...
  };
  const submissionValidationFailed = {
    // ...
  };

  if (!formData.get("somebodys-name")) {
    submissionValidationFailed.invalid_fields.push({
      // ...
    });
  }

  // Or a more thorough way to check the validity of an email address
  if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(formData.get("any-email"))) {
    submissionValidationFailed.invalid_fields.push({
      // ...
    });
  }

  // The rest of the validations...

  const body = !submissionValidationFailed.invalid_fields.length
    ? submissionSuccess
    : submissionValidationFailed;

  return { body };
}
```

As far as converting the data, serverless functions typically expect JSON inputs, so for other data types an extra parsing step is required. As it happens, the forms in the CodePen demos are submitted as [<VPIcon icon="fa-brands fa-firefox" />`multipart/form-data`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Disposition#html_posting_multipartform-data_content_type).

Without any libraries, we can convert a `multipart/form-data` string into a `FormData` by taking advantage of the `Response` API’s capabilities:

```js
async function convertMultipartFormDataToFormData(data) {
  const matches = data.match(/^\s*--(\S+)/);

  if (!matches) {
    return new FormData();
  }

  const boundary = matches[1];

  return new Response(data, {
    headers: {
      "Content-Type": `multipart/form-data; boundary=${boundary}`
    }
  }).formData();
}
```

The code is mostly focused on extracting the boundary variable. This is typically autogenerated, for example, when submitting a form in a browser.

The submitted raw data is available via `event.http.body`, but since it’s base64-encoded, we need to decode it first:

```js
async function main(event) {
  const formData = await convertMultipartFormDataToFormData(
    Buffer.from(event?.http?.body ?? "", "base64").toString("utf8")
  );

  // ...
    
  const body = !submissionValidationFailed.invalid_fields.length
    ? submissionSuccess
    : submissionValidationFailed;

  return { body };
}
```

And that’s it. With this approach, all that’s left is to replace calls to the original APIs with calls to the mocked ones.

---

## Closing thoughts

Ultimately, both approaches help decouple the demos from the third-party API dependency. In terms of effort, at least for this specific example, they seem comparable.

It’s hard to beat the fact that there’s no external dependency with the manual mocking approach, not even on something we somewhat control, and everything is bundled together. In general, without knowing specific details, there are good reasons to favor this approach for small, self-contained demos.

But using a mocked server API also has its advantages. A mocked server API can power not only demos, but also various types of tests. For more complex needs, a dedicated team working on the mocked server might prefer a different programming language than JavaScript, or they might opt to use a tool like [<VPIcon icon="fas fa-globe"/>WireMock](https://wiremock.org/) instead of starting from scratch.

As with everything, it depends. There are many criteria to consider beyond what I’ve just mentioned.

I also don’t think this approach necessarily needs to be applied by default. After all, I had the CodePen demos working for four years without any issues.

The important part is having a way to know when demos break (monitoring), and when they do, having the right tools at our disposal to handle the situation.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Keeping Article Demos Alive When Third-Party APIs Die",
  "desc": "Is there a way to build demos that do not break when the services they rely on fail? How can we ensure educational demos stay available for as long as possible?",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/keeping-article-demos-alive-when-third-party-apis-die.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
