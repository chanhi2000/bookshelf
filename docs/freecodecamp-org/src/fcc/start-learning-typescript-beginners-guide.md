---
lang: en-US
title: "How to Start Learning TypeScript - A Beginner's Guide"
description: "Article(s) > How to Start Learning TypeScript - A Beginner's Guide"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - typescript
  - ts
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Start Learning TypeScript - A Beginner's Guide"
    - property: og:description
      content: "How to Start Learning TypeScript - A Beginner's Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/start-learning-typescript-beginners-guide.html
prev: /programming/ts/articles/README.md
date: 2025-01-24
isOriginal: false
author:
  - name: Akande Olalekan Toheeb
    url : https://freecodecamp.org/news/author/MuhToyyib/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737681395105/19aeca8f-e763-4833-9ac3-5c4db7d12fe7.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Start Learning TypeScript - A Beginner's Guide"
  desc="JavaScript is the most widely-used programming language for web development. But it lacks type-checking support, which is an essential feature of modern programming languages. JavaScript was originally designed as a simple scripting language. Its loo..."
  url="https://freecodecamp.org/news/start-learning-typescript-beginners-guide"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1737681395105/19aeca8f-e763-4833-9ac3-5c4db7d12fe7.png"/>

JavaScript is the most widely-used programming language for web development. But it lacks type-checking support, which is an essential feature of modern programming languages.

JavaScript was originally designed as a simple scripting language. Its loose nature and absence of crucial **Object-Oriented Programming (OOP)** features pose certain challenges for developers:

1. Limited documentation and auto-completion.
2. Inability to utilise OOP concepts.
3. Lack of type safety, leading to runtime errors.
4. Challenges in refactoring and maintenance.
5. Absence of interfaces and integration points.

TypeScript solves these problems. It was built to make JavaScript a more perfect modern programming language. It helps improve the developer experience, offers many useful features, and improves interoperability.

This article dives into TypeScript basics. I’ll teach you how to install TS and set up a project. Then we’ll cover some important fundamentals. You’ll also learn how TypeScript compiles into JavaScript, making it compatible with browsers and Node.js environments.

::: note Prerequisites

Before diving into TypeScript, it's important to have a foundational understanding of certain concepts to ensure a smoother learning journey. While TypeScript enhances JavaScript with static typing and other powerful features, it builds on core JavaScript principles. Here's what you should know:

**1. JavaScript Fundamentals**

TypeScript is a superset of JavaScript, meaning it extends JavaScript's capabilities. To effectively learn TypeScript, you should first have a solid grasp of JavaScript basics, including:

- **Syntax and data types:** Understand how to declare variables (`let`, `const`, and `var`), work with primitive types (strings, numbers, booleans), and manage arrays and objects.
- **Control flow:** Be familiar with loops (`for`, `while`), conditionals (`if-else`, `switch`), and how they control program execution.
- **Functions:** Know how to define and invoke functions, work with parameters, return values, and understand concepts like arrow functions and closures.
- **Object-Oriented Programming (OOP):** Learn about creating and working with objects, classes, and inheritance. TypeScript's class-based features build heavily on JavaScript's OOP model.
- **Error handling:** Understand how to use `try-catch` blocks to handle runtime errors.

**2. Basic HTML and CSS**

Although TypeScript is a language used primarily with JavaScript, having a basic understanding of HTML and CSS is helpful, especially for front-end developers. This is because most TypeScript projects involve creating or working with web applications

- **HTML:** Understand how to structure web pages using tags, attributes, and elements.
- **CSS:** Learn how to style elements using selectors, properties, and values. Familiarity with CSS frameworks like Bootstrap is a bonus.

**3. Familiarity with Development Tools**

- **A code editor** like Visual Studio Code, which has excellent TypeScript support and extensions.
- **Node.js and npm:** Understand how to set up a development environment, run JavaScript outside the browser, and use npm (Node Package Manager) to install dependencies.
- **Version control (Git):** Learn the basics of Git to track changes and collaborate effectively on TypeScript projects.

:::

---

## Getting Started - How to Install TypeScript

To get started working with TypeScript you’ll need to install it. It’s not a complicated process. With TypeScript installed, you can leverage its power to create high-quality solutions.

You can install TS in two ways:

### 1. Global Installation

enables you to access the compiler from any directory on your machine. To install TypeScript globally, execute the following command:

```sh
npm install -g typescript
```

This command leverages the Node.js package manager, `npm`. It installs TypeScript globally, making the command available in the command line.

### 2. Local Installation

in this case, TypeScript is installed only within a specific project. This method ensures version compatibility and consistency across team members. To install TypeScript locally, execute the following command:

```sh
npm install typescript --save-dev
```

Different from global installation, this command installs TypeScript as a development dependency. The `tsc` command is only available for project-specific usage, that is the specific project where you run the command.

![Can you seamlessly install TypeScript now? I hope so!](https://cdn.hashnode.com/res/hashnode/image/upload/v1737293526617/2f630f4c-c74f-4525-a291-9febf06d8d8b.gif)

---

## How to Organize Your TypeScript Projects

Organizing a TypeScript project involves structuring its files with meaningful names and directories, separating concerns, and using modules for encapsulation and reusability.

The <FontIcon icon="iconfont icon-typescript"/>`.ts` extension denotes typeScript files and contains code that converts into JavaScript for execution.

TypeScript also supports <FontIcon icon="iconfont icon-typescript"/>`.d.ts` files, also known as type definition files. These files offer type information about external JavaScript libraries or modules, aiding in better type-checking and code completion as well as improving development efficiency. Below is an example of a good TS project structure:

```plaintext :collapsed-lines title="file structure"
my-ts-project/
├── src/ 
│   ├── components/ 
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── services/ 
│   │   ├── api.ts
│   │   └── authService.ts
│   ├── utils/ 
│   │   ├── helpers.ts 
│   │   └── validators.ts
│   ├── models/ 
│   │   ├── User.ts
│   │   └── Product.ts
│   ├── index.tsx 
│   └── styles/ 
│       ├── global.css
│       └── theme.css
├── public/ 
│   ├── index.html
│   └── assets/ 
│       ├── images/
│       └── fonts/
├── tsconfig.json
└── package.json
```

Let’s understand what’s going on here:

1. <FontIcon icon="fas fa-folder-open"/>`src/`: This directory houses all the source code for the project.
    - <FontIcon icon="fas fa-folder-open"/>`components/`: Contains reusable UI components (for example, `Button`, `Input`, `Modal`). Using `.tsx` (TypeScript JSX) allows you to write JSX with type safety.
    - <FontIcon icon="fas fa-folder-open"/>`services/`: Holds services that interact with external APIs or handle application logic (for example, `api.ts` for API calls, `authService.ts` for authentication).
    - <FontIcon icon="fas fa-folder-open"/>`utils/`: Contains helper functions and utility classes for common tasks (for example, `helpers.ts` for date formatting, `validators.ts` for input validation).
    - <FontIcon icon="fas fa-folder-open"/>`models/`: Defines TypeScript interfaces or classes to represent data structures (for example, `User.ts`, `Product.ts`).
    - <FontIcon icon="fa-brands fa-react"/>`index.tsx`: The main entry point of the application.
    - <FontIcon icon="fas fa-folder-open"/>`styles/`: Contains CSS or other styling files.
2. <FontIcon icon="fas fa-folder-open"/>`public/`: This directory contains static assets that are not processed by TypeScript (for example, HTML, images, fonts).
3. <FontIcon icon="iconfont icon-json"/>`tsconfig.json`: The TypeScript configuration file, specifying compiler options.
4. <FontIcon icon="iconfont icon-json"/>`package.json`: The project's manifest file, listing dependencies, scripts, and other project metadata.

Just a quick note about naming conventions so you understand them here:

- Use PascalCase for class names (for example, `User`, `Product`).
- Use camelCase for function names and variable names (for example, `getUser`, `firstName`).
- Use meaningful and descriptive names for files and directories.

This structure promotes modularity, reusability, and better organization, making your TypeScript projects easier to maintain and scale.

Properly organizing your TS projects enhances code maintainability, readability, and collaboration in TypeScript development workflows.

---

## How Typing Works in TypeScript

Like any other typed programming language, TypeScript relies on type definitions, generally called **Typing**.

Typing is a term used in programming to define data types for variables, method parameters, and return values within the code.

Typing allows you to catch errors quickly and early in development, a superpower that helps maintain better code quality.

To specify a type in TypeScript, put a colon( `:`) and the desired data type after your variable name. Here’s an example:

```ts
let age: number = 2;
```

The above variable is declared with the `number` type. In TypeScript, this means it can store numbers only and nothing else.

### Typing Techniques

In TypeScript, data can be typed in two main ways:

#### 1. Static Typing

Static typing refers to explicitly specifying the data type of variables and other entities in the code during development. The TypeScript compiler enforces these type definitions, helping to catch type-related errors early. For example:

```ts
let age: number = 25;
```

Here, the variable `age` is explicitly declared to have the `number` type. This ensures that only numeric values can be assigned to it, reducing the risk of runtime errors.

#### 2. Dynamic Typing

Dynamic typing in TypeScript refers to scenarios where the type of a variable is determined at runtime. This can occur when variables are assigned the `any` type, which allows them to hold values of any type. TypeScript does not perform type-checking on operations involving variables with the `any` type.

```ts
let value: any;
value = 25; // Number
value = "Hello"; // String
```

While TypeScript is primarily a statically typed language, dynamic typing can still be useful in specific cases, such as:

- Working with third-party libraries that lack type definitions.
- Interfacing with dynamically structured data (for example, JSON responses from APIs with unknown structures).
- Rapid prototyping or when type information is unavailable during the initial development phase.

### Static vs. Dynamic Typing in TypeScript

Static typing is significantly more common in TypeScript, as it is one of the core features that sets TypeScript apart from JavaScript. By enforcing strict type checks, static typing enhances code maintainability, reduces bugs, and improves developer productivity.

Dynamic typing is typically reserved for cases where flexibility is required or when dealing with data whose structure cannot be determined in advance. Just keep in mind that relying heavily on dynamic typing (for example, overusing the `any` type) is generally discouraged, as it undermines the benefits of TypeScript's static typing system.

So while dynamic typing has its place in certain edge cases, static typing is the preferred and more commonly used approach in TypeScript development.

### Type Inference and Union Types

#### Type Inference

Type inference is a powerful TypeScript feature that allows the compiler to automatically deduce the type of a variable based on the value assigned to it during initialization. In simpler terms, TypeScript looks at the value you assign to a variable and decides what type it should be, even if you don’t explicitly declare the type.

::: tip For example

```ts
typescriptCopyEditlet age = 25; // TypeScript infers that 'age' is of type 'number'
age = "hello"; // Error: Type 'string' is not assignable to type 'number'
```

In this example, the `age` variable is automatically inferred as a `number` because of its initial value, `25`. Any attempt to reassign `age` to a value of a different type (like a string) will result in a type error.

:::

Type inference is particularly useful because it reduces the need for explicit type annotations, making your code cleaner and more readable. However, it still provides the safety and reliability of TypeScript's type-checking.

::: important When to use type inference:

- **Simple assignments**: Use type inference for straightforward assignments where the type is obvious from the value.
- **Default values**: When providing default values for variables or function parameters, type inference ensures the correct type is applied without requiring manual annotations.
- **Rapid prototyping**: During early stages of development, type inference can reduce boilerplate code while still enforcing type safety.

:::

#### Union Types

Union types allow a variable to hold values of multiple types. They are defined by placing a pipe (`|`) between the types. This feature is particularly useful when a variable may legitimately have more than one type during its lifecycle.

::: tip For example:

```ts
typescriptCopyEditlet numOrString: number | string; // 'numOrString' can hold either a number or a string
numOrString = 25; // Valid
numOrString = "hello"; // Valid
numOrString = true; // Error: Type 'boolean' is not assignable to type 'number | string'
```

You can even define union types with more than two possible types:

```ts
typescriptCopyEditlet multiType: number | string | boolean;
multiType = 42; // Valid
multiType = "TypeScript"; // Valid
multiType = false; // Valid
```

:::

::: important When to use union types:

**Flexible function parameters**

When a function can accept multiple types of input.

```ts
typescriptCopyEditfunction printValue(value: string | number) {
  console.log(value);
}
```

**Handling diverse data structures**

When working with APIs or external data sources where fields may vary in type.

**Optional or multi-state variables**

For example, a variable that can represent a loading state as a boolean, an error as a string, or valid data as an object:

```ts
typescriptCopyEditlet status: boolean | string | { success: boolean; data: any };
```

:::

---

## How to Handle Objects, Arrays, and Function Types in TypeScript

To master TypeScript, you must understand the various data types supported in TypeScript and how and when to use them.

The [<FontIcon icon="fa-brands fa-firefox"/>JavaScript primitive types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values) such as *strings*, *numbers*, *booleans*, and more also define the fundamental building blocks of data in TypeScript. But in particular, `Objects`, `Arrays`, and `Functions` are essential for building robust applications. With objects, arrays, and functions, you can better handle data and use them efficiently in development.

### Object Types in TypeScript

Object types represent the blueprint for creating objects in TypeScript. You can use objects to define their shape, similar to how [<FontIcon icon="fa-brands fa-firefox"/>classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) are used in **object-oriented programming (OOP)**. But objects lack the behavioral aspects and encapsulation that classes offer.

To define an object type, explicitly define the object's blueprint after the colon(`:`). For Example:

```ts :collapsed-lines
// Object Type Initialization
let student: {
    name: string;
    age: number;
    matricNumber: string | number;
 };

// Assigning the Object with actual data
student = {
    name: "Akande"
    age: 21,
    matricNumber: 21/52 + "HP" + 19,
};
```

Notice that the properties end with a semi-colon`;` instead of a comma `,` which ends them in an actual object.

The above is the primary way to define an object in TypeScript. Another way is to use `interfaces`, which I’ll cover later in this article.

### Array Types in TypeScript

Arrays in TypeScript allow you to store multiple values of the same or different data types in a single variable. They enhance the safety and clarity of your code by enforcing type consistency across the array elements.

In TypeScript, array types can be defined in two ways:

#### 1. Using the `Array<type>` model

This syntax uses the generic `Array` type, where `type` represents the type of elements the array can hold.

```ts
typescriptCopyEditlet numbers: Array<number> = [1, 2, 3, 4, 5];
let mixedArray: Array<number | string> = [1, 2, 3, 4, 5, "Hello"];
```

::: tip <code>numbers</code> Example

This array can only contain numbers. Attempting to add a string or other type to this array will result in a type error.

```ts
typescriptCopyEditnumbers.push(6); // Valid
numbers.push("Hello"); // Error: Type 'string' is not assignable to type 'number'
```

:::

::: tip <code>mixedArray</code> Example

This array uses a union type (`number | string`), allowing it to store both numbers and strings.

```ts
typescriptCopyEditmixedArray.push(42); // Valid
mixedArray.push("TypeScript"); // Valid
mixedArray.push(true); // Error: Type 'boolean' is not assignable to type 'number | string'
```

:::

#### 2. Using the** `type[]` model

This syntax appends square brackets (`[]`) to the type of elements the array can hold.

```ts
typescriptCopyEditconst numbers: number[] = [1, 2, 3, 4, 5];
const mixedArray: (string | number)[] = [1, 2, 3, 4, 5, "Hello"];
```


::: tip <code>numbers</code> Example

Similar to the `Array<number>` example, this array can only hold numbers.

```ts
typescriptCopyEditnumbers[0] = 10; // Valid
numbers.push("Hi"); // Error: Type 'string' is not assignable to type 'number'
```

:::

::: tip <code>mixedArray</code> Example

Like the earlier `mixedArray`, this array allows both numbers and strings, providing flexibility where the type of data may vary.

```ts
typescriptCopyEditmixedArray[1] = "World"; // Valid
mixedArray.push(true); // Error: Type 'boolean' is not assignable to type 'string | number'
```

:::

### How to Use Arrays in TypeScript

Arrays are versatile and commonly used for storing collections of related data. Here are a few practical scenarios:

#### Storing Homogeneous Data

When all elements in the array share the same type, such as a list of user IDs or product prices:

```ts
typescriptCopyEditconst userIds: number[] = [101, 102, 103];
const productPrices: Array<number> = [29.99, 49.99, 19.99];
```

#### Storing Heterogeneous Data

When elements can have different types, such as a list of messages containing text and optional metadata:

```ts
typescriptCopyEditconst messages: (string | object)[] = [
  "Welcome",
  { type: "error", text: "Something went wrong" },
];
```

#### Iterating Over Arrays

Arrays in TypeScript can be used in loops with full type safety:

```ts
typescriptCopyEditconst scores: number[] = [80, 90, 70];
scores.forEach((score) => console.log(score + 5)); // Adds 5 to each score
```

#### Function Parameters and Return Types

Arrays can also be passed as function parameters or returned by functions with strict typing:

```ts
typescriptCopyEditfunction getNumbers(): number[] {
  return [1, 2, 3];
}
function printStrings(strings: string[]): void {
  strings.forEach((str) => console.log(str));
}
```

### Function Types in TypeScript

Function types in TypeScript describe the shape of functions, including parameter types and return types. Function types are defined by explicitly specifying the parameter types during declaration. The return type is specified by adding `:` and the type to return immediately after the brackets. For Example:

```ts
function addition (a: number, b: number): number {
return a + b;
}
```

The above function takes in two numbers, adds them, and returns a number. The function will not work if any of its arguments are not numbers and if it returns anything else except a number. For example:

#### 1. Calling the function with a string as the argument

```ts
// This won't work because it expects numbers, and one of the arguments is a string
addition(1, "two");
```

#### 2. Re-writing the function to return a string

```ts
// Function will return an error because it's returning a string

function addition (a: number, b: number): string {
  let result = a + b;
  let returnStatement = `Addition of ${a} and ${b} is: ${result}`;
  return returnStatement;
}
```

Test the code out for yourself to see how these examples work.

Understanding and effectively handling objects, arrays, and functions in TypeScript empowers you to write type-safe and maintainable code, enhancing the reliability and scalability of your applications.

---

## How to Create Custom Types in TypeScript

Often, your design pattern doesn't follow the built-in data types in TypeScript. For example, you might have patterns that use dynamic programming). And this can cause problems in your codebase. TypeScript offers a solution for creating **custom types** to address this issue.

Custom types allow you to define your data structure and shapes according to your needs. This enhances code readability and maintainability.

### The Type Keyword

The `type` keyword lets you create **type aliases**, providing a way to create custom types. The types you create can be reused throughout your codebase. Type aliases help define union types or combine types into single aliases. The syntax for creating a custom type is as follows:

```ts
// Syntax
type TypeAlias = type;
```

![And here’s an example](https://i.ibb.co/qBZ3Zcw/Screenshot-2024-02-16-at-4-17-27-PM.png)

The code above creates a custom-type `UserName`, a union of numbers and strings. It uses the type created to define two variables relatively to check if the type works.

Note that it’s recommended to start a type alias starts with a capital letter.

The type Keyword is generally used for primitives - but how about creating a custom object type?

![This is where **Interfaces** come in.](https://cdn.hashnode.com/res/hashnode/image/upload/v1737294121435/5be475e2-efae-428e-b9ed-bbcce7ce260d.jpeg)

### TypeScript Interfaces

Interfaces in TypeScript are used to define the structure of objects. They serve as blueprints, specifying the properties an object should have and their respective types. This ensures that objects conform to a consistent shape, enabling type safety and clearer code.

#### Defining an interface

An interface is defined using the `interface` keyword. The syntax looks like this:

```ts
typescriptCopyEditinterface InterfaceName {
  property1: Type;
  property2: Type;
}
```

::: tip Example

```ts
typescriptCopyEditinterface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};
```

Here’s what’s going on in this example:

**Interface declaration (`interface User`)**

- Here, we define a blueprint for a `User` object. It specifies that any object of type `User` must have the following properties:
  - `id` of type `number`
  - `name` of type `string`
  - `email` of type `string`

**Using the interface (`const user: User`):**

- We declare an object `user` of type `User`.
- The object is required to have all the properties defined in the `User` interface, with values of the specified types. If a property is missing or its type doesn't match, TypeScript will throw a compile-time error.

:::

::: tip For example

```ts
typescriptCopyEditconst invalidUser: User = {
  id: 1,
  name: "Alice",
  // Error: Property 'email' is missing in type
};
```

So you might be wondering - why should you use interfaces?

- **Type safety**: Ensures that objects conform to the expected structure, preventing runtime errors.
- **Reusability**: The same interface can be reused across different parts of the application, reducing duplication.
- **Code clarity**: Makes the code easier to read and understand by explicitly describing the shape of objects.

:::

::: info Advanced Features of Interfaces

**1. Optional properties**

You can make properties optional by adding a question mark (`?`).

```ts
typescriptCopyEditinterface Product {
  id: number;
  name: string;
  description?: string; // Optional property
}

const product: Product = {
  id: 101,
  name: "Laptop",
}; // Valid, as 'description' is optional
```

**2. Readonly properties**

Use `readonly` to prevent properties from being modified after initialization.

```ts
typescriptCopyEditinterface Point {
  readonly x: number;
  readonly y: number;
}
    
const point: Point = { x: 10, y: 20 };
point.x = 15; // Error: Cannot assign to 'x' because it is a read-only property
```

**3. Extending interfaces**

Interfaces can inherit properties from other interfaces, enabling composition.

```ts
typescriptCopyEditinterface Person {
  name: string;
  age: number;
}
    
interface Employee extends Person {
  employeeId: number;
}
    
const employee: Employee = {
  name: "John",
  age: 30,
  employeeId: 1234,
};
```

### When to Use Interfaces

There are various scenarios when it’s a good idea to use interfaces. You can use them when you want to define and enforce the structure of objects passed around in your code.

They’re also useful in API responses, as they help you type-check objects received from APIs. This ensures that the data conforms to your expectations.

Interfaces are also handy when working with reusable types. When multiple parts of your application use objects with the same structure, interfaces prevent duplication.

By leveraging interfaces, you can create robust, maintainable, and type-safe applications. They are an essential feature of TypeScript that promotes clean and predictable code.

### Generics and Literal Types

**Generics** in TypeScript allow you to create reusable components that can work with various data types. They let you write functions, classes, and interfaces without specifying the exact type upfront, making your code more flexible and maintainable.

Here's an example of a generic function and a generic interface in TypeScript:

```ts
// Generic interface for a box that can hold any value 
interface  Box<T> { 
    value: T; 
}

// Usage examples
let numberBox: Box<number> = { value: 10 };
let stringBox: Box<string> = { value: "TypeScript" };

console.log(numberBox.value); // Output: 10  
console.log(stringBox.value); // Output: TypeScript
```

You can use generics when you’re unsure of your data type.

In contrast to Generics, **Literal types** allow you to specify exact values a variable can hold. This adds increased specificity and type safety to your code, preventing unintended values from being assigned. Here’s an example:

```ts
type Direction = 'up' | 'down' | 'left' | 'right';
```

A variable created with the above type can only be assigned for the strings up, down, left, and right.

Overall, leveraging custom types in TypeScript empowers you to create expressive, reusable, and type-safe data structures, helping you develop more robust and maintainable applications.

---

## How to Merge Types in TypeScript

Merging types in TypeScript combines multiple type declarations into a single, unified type. This capability allows developers to build complex types from smaller, reusable pieces, enhancing code clarity, reusability, and maintainability.

### 1. Declaration Merging in Interfaces

TypeScript supports **declaration merging**, where multiple interface declarations with the same name are automatically combined into a single interface. This lets you augment an existing interface by defining additional properties or methods.

::: tip Example

```ts
typescriptCopyEditinterface User {
  id: number;
  name: string;
}

interface User {
  email: string;
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};
```

**How it works:**

- The `User` interface is declared twice, each with different properties.
- TypeScript automatically merges these declarations into a single interface:

```ts
typescriptCopyEditinterface User {
  id: number;
  name: string;
  email: string;
}
```

- When creating the `user` object, all properties from the merged interface must be present. If any property is missing, TypeScript will raise an error.

:::

Declaration merging is particularly useful when working with third-party libraries. You can extend or add new properties to an existing interface without modifying the library's source code.

### 2. Interface Merging Using the `extends` Keyword

The `extends` keyword allows one interface to inherit properties and methods from another, creating a new interface that combines the properties of both.

::: tip Example

```ts
typescriptCopyEditinterface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
}

const employee: Employee = {
  name: "John",
  age: 30,
  employeeId: 101,
};
```

**How it works:**

- The `Person` interface defines two properties: `name` and `age`.
- The `Employee` interface uses the `extends` keyword to inherit the properties from `Person`.
- The `Employee` interface also adds a new property, `employeeId`.
- The `employee` object must include all properties from both `Person` and `Employee`.

:::

**This approach is ideal for hierarchical relationships. For instance, you can define a base interface for shared properties and extend it for specialized types.**

### 3. Type Merging Using the `&` Operator

The `&` operator, known as the intersection type, allows you to combine multiple types into a single type. The resulting type includes all properties and methods from each type.

::: tip Example

```ts
typescriptCopyEdittype Address = {
  city: string;
  country: string;
};

type ContactInfo = {
  email: string;
  phone: string;
};

type EmployeeDetails = Address & ContactInfo;

const employee: EmployeeDetails = {
  city: "New York",
  country: "USA",
  email: "john.doe@example.com",
  phone: "123-456-7890",
};
```

**How it works:**

- `Address` and `ContactInfo` are two separate types.
- `EmployeeDetails` is an intersection type created using `Address & ContactInfo`.
- The `employee` object must include all properties from both `Address` and `ContactInfo`. Missing or incorrectly typed properties will result in a TypeScript error.

:::

**Intersection types are helpful when you need to combine unrelated types or create composite types for specific use cases, like API responses that merge different data structures.**

### When to Use Each of These Approaches

1. **Declaration merging**: Use when you want to extend or augment an existing interface, particularly in third-party libraries or shared codebases.
2. `extends` **keyword**: Use for hierarchical relationships where a base interface can be specialized into more specific types.
3. **Intersection types** (`&`): Use when you need to combine multiple unrelated types into a single type for specific use cases.

By understanding these merging techniques and their implications, you can structure your TypeScript code effectively, improving reusability and maintainability while maintaining type safety.

---

## Bundling and Transformations in TypeScript

Not every browser supports the latest JavaScript used by TypeScript. So you can use the **TypeScript compiler**, or `tsc`, to convert TypeScript code (.ts files) into conventional JavaScript (.js files) that’s universally compatible with all browsers. `tsc` translates TypeScript-specific elements like types and classes into JavaScript code that browsers can interpret.

To execute TypeScript files, `tsc` is your go-to. You can install `tsc` using npm and then transform your .ts files into .js files. To use `tsc`, just specify the name of the TypeScript file before the `tsc` command. For instance, if you have a file named <FontIcon icon="iconfont icon-typescript"/>`app.ts`, you can run it by typing:

```sh
tsc app.ts
```

Webpack or Parcel are frequently employed to deploy TypeScript code on browsers. These tools bundle all JavaScript files, including those from TypeScript, for improved performance and easier website implementation. They also optimize code loading by reducing its size and enhancing browser speed.

---

## Building Better Code with TypeScript

Embracing TypeScript as a JavaScript developer opens up possibilities for writing more robust and maintainable code. By understanding the basics and core concepts outlined in this guide, you can leverage TypeScript's static typing system to catch errors early in development, leading to fewer bugs and smoother code maintenance.

By using TypeScript, JavaScript devs can enhance their code quality and productivity. As you continue to explore and practice with TypeScript, you will discover even more powerful features and functionalities.

Keep pushing your boundaries and dive deeper into the world of TypeScript. 😉

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Start Learning TypeScript - A Beginner's Guide",
  "desc": "JavaScript is the most widely-used programming language for web development. But it lacks type-checking support, which is an essential feature of modern programming languages. JavaScript was originally designed as a simple scripting language. Its loo...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/start-learning-typescript-beginners-guide.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
