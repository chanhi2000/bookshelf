---
lang: en-US
title: "Comparing schema validation libraries: Zod vs. Yup"
description: "Article(s) > Comparing schema validation libraries: Zod vs. Yup"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Comparing schema validation libraries: Zod vs. Yup"
    - property: og:description
      content: "Comparing schema validation libraries: Zod vs. Yup"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/comparing-schema-validation-libraries-zod-vs-yup.html
prev: /programming/js-node/articles/README.md
date: 2023-09-05
isOriginal: false
author:
  - name: Nathan Sebhastian
    url : https://blog.logrocket.com/author/nathansebhastian/
cover: /assets/image/blog.logrocket.com/comparing-schema-validation-libraries-zod-vs-yup/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Comparing schema validation libraries: Zod vs. Yup"
  desc="Compare schema validation libraries, Zod and Yup, in terms of validating common data patterns such as primitives, objects, and arrays."
  url="https://blog.logrocket.com/comparing-schema-validation-libraries-zod-vs-yup"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/comparing-schema-validation-libraries-zod-vs-yup/banner.png"/>

::: note Editor’s note:

This article was last updated on 5 September 2023 to provide a comparison of Zod and Yup based on ease of use, ecosystems, and integrations.

:::

![Comparing Schema Validation Libraries: Zod Vs. Yup](/assets/image/blog.logrocket.com/comparing-schema-validation-libraries-zod-vs-yup/banner.png)

Web developers have to deal with a lot of complex data exchanges in their applications. It’s important for apps to validate any data they send or receive because any wrong data type can cause an error. Unexpected data types or values can also crash the application processing it and lead to other undesirable outcomes.

Schema validation is the process of verifying data by creating a schema. The definition of a schema can vary depending on the implementation, but in JavaScript, a schema is usually an object data type that is used to validate the data in question.

In this guide, I’ll compare two popular schema validation libraries, Zod and Yup, to see how they perform in terms of validating common data patterns such as primitives, objects, and arrays. I will also compare their performance metrics, learning curve, ecosystem and integrations.

---

## JavaScript schemas

Below is a simple example of a schema in JavaScript:

```js :collapsed-lines
const userDataSchema = {
  name: "string",
  age: "number",
};

const userData = {
  name: "Peter",
  age: "15",
};

function validateSchema(schema, data) {
  for (let property in schema) {
    if (data[property] === undefined) {
      console.error(property + " is required.");
    } else if (typeof data[property] !== schema[property]) {
      console.error(
        property +
          " must be of type " +
          schema[property] +
          ", " +
          typeof data[property] +
          " found."
      );
    } else {
      console.log(property + " is validated!");
    }
  }
}

validateSchema(userDataSchema, userData);
```

In the code above, the `userDataSchema` object acts as a schema, validating that the `userData` object has properties of `name` and `age`. It also validates the type of these values: `name` must be a `string` while `age` must be a `number`.

Of course, the `validateSchema` function is not enough for any serious application. To validate a complex data structure and ensure that it doesn’t cause unwanted behavior, you’ll need something more powerful. This is where a schema validation library comes in.

Fortunately, generous JavaScript developers around the world have shared myriad open source schema validation libraries on npm. [<VPIcon icon="iconfont icon-github"/>`jquense/yup`](https://github.com/jquense/yup) has been one of the most popular schema validation libraries for JavaScript, before [<VPIcon icon="iconfont icon-github"/>`vriad/zod`](https://github.com/vriad/zod) came onto the scene and stole some of Yup’s spotlight.

---

## An introduction to Zod

Zod is a zero-dependency TypeScript-first data validation library that provides a simple and intuitive way to define and validate data in both TypeScript and JavaScript applications. Zod is designed to be self-contained and lightweight with a simple syntax, making it easy to use in various TypeScript and JavaScript environments.

Some notable features of Zod include:

- **Type safety**: Zod is TypeScript-first, which means it provides strong type safety out of the box
- **Concise syntax**: Zod offers a simple syntax for defining data schemas. You can define complex validation rules with just a few lines of code
- **Asynchronous validation**: With Zod, you can easily perform asynchronous operations during validation
- **Custom error messages**: Zod allows you customize error messages, making it user-friendly for developers and end users alike
- **Extensibility**: You can easily integrate form validation libraries with Zod. Also, Zod allows for custom validation logic
- **Strict by default**: Unlike Yup, Zod provides strict validation rules by default
- **Validation short-circuiting**: Zod’s validation process short-circuits upon encountering the first validation error

---

## Schema validation with Zod

In this section, we will take a look at some of the common data validation APIs you’ll use.

### Primitive data types

Primitive values for Zod includes string, number, BigInt, Boolean, date, symbol, etc. Zod also provides APIs for specifying schema for empty values as well as schema for catching any type like `any` and `unknown`:

```js
const zod = require('zod');
// or import { zod } from 'zod'

const schema = zod.string()
schema.parse('hello');
```

The example above shows a simple string schema validation. Zod provides extensive methods for validation:

```js
const passwordSchema = zod.string().min(8).max(16);
passwordSchema.parse("3same33");
```

You can also use other extensive methods for validating a number:

```js
const ageSchema = zod.number().min(18);
ageSchema.parse(12); // throws error: Number must be greater than or equal to 18
```

You wouldn’t want to send error messages like the one above to end users, as it wouldn’t provide the best experience. This is where custom error messages can be useful:

```js
const ageSchema = zod
  .number()
  .min(18, { message: "too young to play" })
  .max(40, { message: "too old to play" });
ageSchema.parse(12) // throws error: too young to play
```

Apart from validation methods, Zod also provides transformation methods that help format your string values:

```js
const usernameSchema = zod.string().toLowerCase();
const emailSchema = zod.string().trim().email();

console.log(usernameSchema.parse("John_Doe")); // logs john_doe
emailSchema.parse(" doe@mail.com ");
```

In the code above, the `usernameSchema` converts the returned value of the parsed string to lower case strings. The `emailSchema` uses the `trim` transformation method to trim all whitespaces around the string before validating if it’s a valid email or not.

Ideally, creating a schema of “user” from the examples above would require an object. So let’s see how we can integrate all the examples above into an object schema.

### Basic object validations

```js
const userSchema = zod.object({
  username: zod.string().toLowerCase(),
  email: zod.string().trim().email(),
  age: zod.number().positive(),
  password: zod.string().min(8).max(16),
});

userSchema.parse({
  username: "john_doe",
  email: "doe@gmail.com",
  age: -24,
  password: "not-my-favorite",
});
```

In this case, Zod throws all validation errors in the order that they occur. So if both `username` and `age` are invalid, you’ll get an array containing error information for both schemas.

By default, all properties in an object are required. But if you want to have an optional property, you’d make use of the `optional` method:

```js
const userSchema = zod.object({
  username: zod.string().toLowerCase(),
  email: zod.string().trim().email(),
  age: zod.number().positive(),
  password: zod.string().min(8).max(16),
  familySecret: zod.string().optional()   
});
```

### Array data types

Zod provides an `array` method for validating the values of an array. For example, you can validate the minimum or maximum length of the array with the `.min` and `.max` functions:

```js
const fruitsSchema = zod.array(zod.string()).min(3).max(5);
fruitsSchema.parse(["orange", "banana", "apple"]);
```

You can pass in already created schemas to the `array` method as well. Let’s re-use the `userSchema` example from the previous section:

```js
const usersSchema = zod.array(userSchema);

const users = [
  {
    username: "john_doe",
    email: "doe@gmail.com",
    age: -24,
    password: "not-my-favorite",
  },
];

usersSchema.parse(users); // TypeError: Number must be greater than 0
```

A `tuple` is another special Zod API that creates an array with a fixed number of elements and various data types:

```js
const athleteSchema = zod.tuple([
  // takes an array of schemas
  zod.string(), // a string for name
  zod.number(), // a number for jersey
  zod.object({
    pointsScored: zod.number(),
  }), // an object with property pointsScored that has number value
]);

athleteSchema.parse(["James", 23, { pointsScored: 7 }])
```

The data parsed into the tuple must be an array that exactly matches the schema structure.

### Function validation

Zod can validate a function and make sure the data passed into the function and data returned from the function are correct. The function schema uses two APIs (`args` and `returns`) to validate the input and output of the function:

```js
const sumOfNumsSchema = zod
  .function()
  .args(zod.number(), zod.number())
  .returns(zod.number());

const sumOfNums = sumOfNumsSchema.validate((val1, val2) => {
  return val1 + val2;
});

sumOfNums("1", 33); // TypeError: Expected number, received string
```

Unlike other validations we’ve seen so far, function validation in Zod doesn’t use the same `.parse` to validate the function. Function validation is unique to Zod; Yup doesn’t have an equivalent API to perform this task.

### Zod’s union function

Zod also has some unique APIs to define optional schema. For example, the [union method (<VPIcon icon="iconfont icon-github"/>`vriad/zod`)](https://github.com/vriad/zod#unions) can be used to compose “OR” types. For example, to create a schema where the data is a string “OR” a number:

```js
const productId = zod.union([zod.string(), zod.number()]);

productId.parse(222);
productId.parse('I9290JEI');
productId.parse(false); // TypeError: Invalid input
```

### Zod’s intersection function

Another one of Zod’s unique APIs is the [intersection method (<VPIcon icon="iconfont icon-github"/>`colinhacks/zod`)](https://github.com/colinhacks/zod#intersections:~:text=5%20items%20exactly-,Intersections,-Intersections%20are%20useful), which is particularly useful for combining two schemas, creating logical “AND” types. For example:

```js
const userId = zod.object({
  id: zod.number(),
});

const baseTeacher = zod.object({
  name: zod.string(),
});

const teacher = zod.intersection(baseTeacher, userId);
teacher.parse({ name: "Mr Doe" }); // TypeError: id is required
```

---

## An Introduction to Yup

Yup is one of the most popular JavaScript validation libraries for validating data schemas, particularly in forms and data processing. Some of its core features include:

- **Chaining and fluent API**: Yup provides a fluent and chainable API for defining validation rules
- **Asynchronous validation**: Just like with Zod, you can perform asynchronous operations during validations with Yup
- **Conditional validation**: Yup allows you define validation rules that depend on the values of other fields
- **Custom error messages**: Yup allows you to customize error messages for specific validation rules, making it developer-friendly and user-friendly
- **Type safety**: Yup, which was rewritten in TypeScript, provides a TypeScript-first support, offering a higher level of type safety
- **Immutable**: Just like with Zod, the validation schema in Yup is immutable, so you can safely reuse and share schemas across your codebase
- **Locale and internationalization support**: Yup provides support for localization, allowing you to translate error messages and validation rules to different languages

---

## Schema validation with Yup

Schema validation with Yup is similar to Zod, but the syntax is different. In terms of general use and extensibility, the two libraries perform the same operations in different ways.

For example, this is how you would validate a string in Yup:

```js
const yup = require('yup')
// or import * as yup from yup

const schema = yup.string();
schema.validate(333).then((res) => console.log(res)); // returns 333
schema.isValid(11).then((res) => console.log(res)); // returns true
```

The `validate` function is similar to Zod’s `parse` function. Both functions actually parse the object instead of validating it. This means that both functions take the given data and try to return it back. If the parser encounters an error, it will terminate the runtime and throw an error.

Meanwhile, the `isValid` function only validates the data and leaves error handling to you. So you may consider catching the errors when using the `validate` function of Yup and the `parse` function of Zod.

From the example above, you may probably be wondering why the schema that we specified as `string` doesn’t throw any error when a number is passed as the value. This is because Yup isn’t strict by default. A number can easily be coerced into a string, and as such no error is thrown. But you can override this default behavior with the `strict` API:

```js
const schema = yup.string().strict();
schema.validate(333).then((res) => console.log(res)); // TypeError: this must be a `string` type, but the final value was: `333`
```

Just like Zod, Yup also provides extensive APIs for validation and transformation:

```js
const userSchema = yup
  .object({
    username: yup.string().lowercase().required(),
    email: yup.string().email().required(),
    age: yup.number().positive().required(),
    password: yup.string().min(8).max(16).required(),
    familySecret: yup.string(),
  })
  .strict();

userSchema
  .validate({
    username: "John_Doe",
    email: "doe@gmail.com",
    password: "not-my-favorite",
  })
  .then((res) => console.log(res)); // TypeError: age is a required field
```

### Array validation

For array type, Yup has several useful extensions to validate its values. For example, you can validate the minimum or maximum length of the array with the `.min` and `.max` functions. You can also check the type of its value with the `.of` function:

```js
// validate that the data is an array with number as its value. 
// The minimum value of the array is two
// The minimum length of the array is four
const schema = yup.array().of(yup.number().min(2)).min(4);

schema.validate([2]).then((res) => {
  console.log(res); // typerror: this field must have at least 4 items
});
```

---

## Zod vs. Yup

### TypeScript support

Both Zod and Yup support TypeScript. Zod offers TypeScript first-class support. These libraries enable you to infer TypeScript type aliases that you can use to validate the data.

In simple terms, you can validate whether a variable is the correct type of data by creating a [<VPIcon icon="iconfont icon-typescript"/>`type` alias](https://typescriptlang.org/docs/handbook/advanced-types.html#type-aliases) from Yup or Zod’s schema:

```js
import * as yup from "yup";
import * as zod from "zod";

const yupSchema = yup.string()
type A = yup.InferType<typeof yupSchema>
const x: A = 12 // wrong, but nothing happens

const zodSchema = zod.string();
type B = zod.infer<typeof zodSchema>; // string
const y: B = 12; // TypeError
```

You can run the script above using TypeScript. Notice that Zod actually throws an error while Yup does nothing, even though the value of `x` should be a string instead of a number.

### Comparing performance metrics

Comparing the performance of both libraries depends heavily on the specific use case, the complexity of your validation schemas, and the size of the data being validated.

For simple validation rules and small datasets, the performance difference between Zod and Yup may not be tangible. However, for very complex schemas or large datasets, the performance characteristics may differ. So consider benchmarking the specific validation scenarios that are critical to your application.

### Ease of use

Both Yup and Zod are very simple to learn and easy to use. Their syntaxes are so similar that you can easily switch your entire codebase from one to the other.

### Ecosystem

Zod is designed with TypeScript as a primary consideration, which means it integrates seamlessly with TypeScript projects, unlike Yup, which was built to support TypeScript.

So if you already have a TypeScript project, consider using Zod. Zod is also known for its zero dependency, making it lightweight and easy to integrate into your projects without worrying about extra dependencies.

Both Zod and Yup have comprehensive documentation, which makes learning easier and faster. Both libraries have a large community adoption, ensuring robust community support so you won’t be stuck on a bug for too long.

### Integrations

Though Yup is very popular for its easy integration with popular form libraries like [<VPIcon icon="fas fa-globe"/>Formik](https://formik.org/docs/tutorial#schema-validation-with-yup), Zod also integrates well with other form libraries like [React Hook Form (<VPIcon icon="iconfont icon-github"/>`react-hook-form/resolvers`)](https://github.com/react-hook-form/resolvers#zod). Sometimes it may require additional third-party libraries to make integrating Zod with these form libraries seamless.

---

## Other libraries for schema validation

Zod and Yup are not the only JavaScript and TypeScript libraries for schema validation. In fact, they are not as popular as libraries like [<VPIcon icon="iconfont icon-github"/>`hapijs/joi`](https://github.com/hapijs/joi) and [<VPIcon icon="iconfont icon-github"/>`ajv-validator/ajv`](https://github.com/ajv-validator/ajv).

joi is a popular JavaScript validation library used primarily for defining and enforcing data validation rules. It’s widely used in both server-side and client-side applications. It has its own schema definition syntax similar to what we’ve seen in Yup and Zod.

It’s safe to say that AJV is the most popular schema validation library. Unlike joi, which focuses on schema-based validation, AJV is specifically designed for JSON schema validation. It adheres to the [<VPIcon icon="fas fa-globe"/>JSON Schema standard](https://json-schema.org/) and provides efficient validation of JSON data against JSON schemas. AJV is often used in APIs and data processing pipelines.

joi and AJV are more focused on complex validation scenarios and are suitable for handling large and intricate validation rules. Yup and Zod are often preferred for simpler use cases and form validation.

---

## Conclusion

As you can see from the comparisons above, Zod and Yup both have simple APIs to validate data using schema. Yup has some functions outside of validating data, such as the number schema’s truncate and round methods, which may come in handy in a specific situation.

Zod is capable of validating a function’s input and output to make sure it has all the right data. It also has great TypeScript support, which terminates the runtime in case of errors, while Yup simply does nothing when the inferred type is wrong. What’s more, Zod has some unique features to define optional schemas like union and intersection.

So which schema validation library should you use for your next project? It depends on your application requirements. I recommend using Yup if you do a lot of form validation because its extensive functions cover many patterns that are used in forms, even situational ones where you have to do a rounding.

But if you have lots of API data exchange and you need to validate all data that passes between client and server, Zod might be your best bet — especially if you’re using TypeScript.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Comparing schema validation libraries: Zod vs. Yup",
  "desc": "Compare schema validation libraries, Zod and Yup, in terms of validating common data patterns such as primitives, objects, and arrays.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/comparing-schema-validation-libraries-zod-vs-yup.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
