---
lang: en-US
title: "How to use the keyof operator in TypeScript"
description: "Article(s) > How to use the keyof operator in TypeScript"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - ts
  - typesccript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to use the keyof operator in TypeScript"
    - property: og:description
      content: "How to use the keyof operator in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-use-keyof-operator-typescript.html
prev: /programming/ts/articles/README.md
date: 2023-11-27
isOriginal: false
author:
  - name: Yan Sun
    url : https://blog.logrocket.com/author/yansun/
cover: /assets/image/blog.logrocket.com/how-to-use-keyof-operator-typescript/banner.png
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
  name="How to use the keyof operator in TypeScript"
  desc="Use the TypeScript keyof operator with features like generics, mapped types, and template literal types to improve type safety in your code."
  url="https://blog.logrocket.com/how-to-use-keyof-operator-typescript"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-use-keyof-operator-typescript/banner.png"/>

::: note Editor’s note

This article was last updated on 27 November 2023 to discuss the `keyof typeof` pattern, and using `keyof` to create new types based on `Object.keys`.

:::

![How To Use The `Keyof` Operator In TypeScript](/assets/image/blog.logrocket.com/how-to-use-keyof-operator-typescript/banner.png)

In JavaScript, we often use [<VPIcon icon="fa-brands fa-firefox"/>`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) to get a list of property keys. In the TypeScript world, the equivalent concept is the `keyof` operator. Although they are similar, `keyof` only works on the type level and returns a literal union type, while `Object.keys` returns values.

Introduced in TypeScript 2.1, the `keyof` operator is used so frequently that it has become a building block for advanced typing in TypeScript. In this article, we will examine the `keyof` operator and how it is commonly used with other TypeScript features to achieve better type safety with TypeScript generics, TypeScript mapped types, and TypeScript string literal types.

Let’s look at how each one interacts with the `keyof` operator.

---

## Defining the `keyof` operator

The [<VPIcon icon="iconfont icon-typescript"/>TypeScript handbook documentation](https://typescriptlang.org/docs/handbook/2/keyof-types.html) says:

*The `keyof` operator takes an object type and produces a string or numeric literal union of its keys.*

A simple usage is shown below. We apply the `keyof` operator to the `Staff` type, and we get a `staffKeys` type in return, which represents all the property names. The result is a union of string literal types: “`name`” | “`salary`“:

```ts
type Staff = {
 name: string;
 salary: number;
} 
type staffKeys = keyof Staff; // "name" | "salary"
```

In the above example, the `keyof` operator is used for an object type. It can also be used for non-object types, including primitive types. Below are a few examples:

```ts
type BooleanKeys = keyof boolean; // "valueOf"

type NumberKeys = keyof number; // "toString" | "valueOf" | "toFixed" | "toExponential" | "toPrecision" | "toLocaleString"

type SymbolKeys = keyof symbol; 
//typeof Symbol.toPrimitive | typeof Symbol.toStringTag | "toString" | "valueOf"
```

As shown in the above examples, it’s less useful when applied to primitive types.

---

## `Object.keys` vs. `keyof` operator

In JavaScript, `Object.keys` are used to return an array of object keys. In the code below, the returned keys are used to access the value of each property:

```js
const user = {
  name: 'John',
  age: 32
};

console.log(Object.keys(user));
// output: Array ["name", "age"]
Object.keys(user).forEach(key => {
  console.log(user[key])
}) // output: John, 32
```

It’s worth noting that `Object.keys` ignore symbol properties in JavaScript. To overcome this issue, we can use `Object.getOwnPropertySymbols`, which returns an array comprised of only symbol keys.

`Object.keys` works similarly in TypeScript. Below is the TypeScript declaration of `Object.keys`:

```ts
interface ObjectConstructor {
 //...
 keys(o: object): string[]
 //...
}
```

If we run the earlier code snippet in TypeScript, we get the same output for `Object.keys`:

```ts
const user = {
  name: 'John',
  age: 32
};
console.log(Object.keys(user)); // output: ["name", "age"]
```

But, when we iterate the keys and access the object property by the key, TypeScript throws an error when the TypeScript strict mode is turned on:

```ts
Object.keys(user).forEach(key => {
  console.log(user[key]) // error is shown
})
```

![TypeScript Object.keys Error](/assets/image/blog.logrocket.com/how-to-use-keyof-operator-typescript/typescript-object-keys-error.png)

The error is because we tried to use the `string` type key to access the object with union type “`name`” | “`age`“.

You might wonder why TypeScript doesn’t return typed keys as “`name`” | “`age`“. This is intentional. Anders Hejlsberg explains the reason in this [GitHub comment (<VPIcon icon="iconfont icon-github" />`microsoft/TypeScript`)](https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208).

In a nutshell, the strongly typed `Object.keys` is fine at compile time. But objects often have extra properties at runtime. If this is the case, `Object.keys` will return extra keys. Those extra keys will violate the assumption that `keyof` is an exhaustive list of the key of the object. This may cause the app to crash. I created a [<VPIcon icon="iconfont icon-stackblitz"/>StackBlitz example](https://stackblitz.com/edit/typescript-noyck2?file=index.ts) to demonstrate this behavior.

To work around this restriction, the simplest solution is to use type assertion with the `keyof` operator:

```ts
type userKeyType = keyof typeof user; //  "name" | "age"
Object.keys(user).forEach((key) => {
 console.log(user[key as userKeyType])
})
```

A more elegant solution is to extend the `ObjectConstructor` interface by [<VPIcon icon="iconfont icon-typescript"/>declaration merging](https://typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces):

```ts
interface ObjectConstructor {
  keys<T>(o: T): (keyof T)[];
}

Object.keys(user).forEach((key) => {
  console.log(user[key]);
});
```

Please note that both workarounds will have the same restriction described in Hejlsberg’s comment. So use these workarounds with caution. We only want to use them when we are sure that additional properties won’t be added to the object at runtime; otherwise, it may cause an unexpected crash.

---

## Using the `keyof typeof` pattern

We often combine `keyof` and `typeof` together, to create a type that represents the keys of a specific object. This is particularly useful when you want to define a type based on the structure of an existing object.

Let’s say we have a `userProfile` object as shown here:

```ts
const userProfile = {
  username: 'john_doe',
  email: 'john@example.com',
  age: 30,
  isAdmin: false,
};
```

We can use the `keyof typeof` pattern to create a type representing the keys of this user profile object:

```ts
type UserProfileKeys = keyof typeof userProfile;
// type UserProfileKeys = "username" | "email" | "age" | "isAdmin"
```

The `UserProfileKeys` type is a union of literal types containing the keys `username`, `email`, `age`, and `isAdmin`. This type can be useful for creating functions or components that need to work with various user profile properties in a type-safe manner:

```ts
function getUserInfo(key: UserProfileKeys): any {
  return userProfile[key];
}
const usernameValue = getUserInfo('username'); // Type-safe access
```

In the above example, the `getUserInfo` function takes a `key` parameter constrained to the `UserProfileKeys` type, ensuring that only valid keys of `userProfile` can be passed. This helps prevent runtime errors and enhances the overall type safety of our code.

---

## Using `keyof` to create new types based on `Object.keys`

We can use `keyof` operator to derive new types based on the object keys. For example, we have an object that represents medicine below:

```ts
const medicineObject = {
  name: 'Aspirin',
  dosage: 500,
  manufacturer: 'ExamplePharma'
};
```

We want to create a new type `ExtendedMedicineType` that includes an additional `description` property for each key in `medicineObject`:

```ts
type MedicineKeys = keyof typeof medicineObject;
type ExtendedMedicineType = {
  [K in MedicineKeys]: {
    value: typeof medicineObject[K];
    description: string;
  };
};
```

With the help of `keyof typeof`, we create a new type: `MedicineKeys`. Then, we derive an `ExtendedMedicineType` based on the `MedicineKeys`, which ensures that each property has a specific structure (`value` and `description`). The newly added `description` property serves as documentation for each property.

We can use the new `ExtendedMedicineType` as shown below:

```ts
const myMedicine: ExtendedMedicineType = {
  name: {
    value: 'Aspirin',
    description: 'Name of the medicine'
  },
  dosage: {
    value: 500,
    description: 'Dosage of the medicine in milligrams'
  },
  manufacturer: {
    value: 'ExamplePharma',
    description: 'Manufacturer of the medicine'
  }
};
```

---

## Using `keyof` with TypeScript generics

The `keyof` operator can be used to apply constraints in a generic function. The following function can retrieve the type of an object property using generics, an [<VPIcon icon="iconfont icon-typescript"/>indexed access type](https://typescriptlang.org/docs/handbook/2/indexed-access-types.html), and the `keyof` operator:

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

If we are new to TypeScript, the above function may look complex. Let’s break it down:

- `keyof T` returns a union of string literal types. The `extends` keyword is used to apply constraints to `K`, so that `K` is one of the string literal types only
- `extends` means “is assignable” instead of “inherits”; `K extends keyof T` means that any value of type `K` can be assigned to the string literal union types
- The indexed access operator `obj[key]` returns the same type that the property has

We can see how the `getProperty` type is used below:

```ts
const developer: Staff = {
  name: 'Tobias',
  salary: 100, 
};

const nameType = getProperty(developer, 'name'); // string 
// Compiler error 
const salaryType getProperty(developer, 'pay'); //Cannot find name 'pay'.(2304)
```

The compiler will validate the key to match one of the property names of type `T` because we apply the type constraint for the second parameter. In the above example, the compiler shows the error when an invalid key `'pay'` is passed.

If we don’t use the `keyof` operator, we can declare a union type manually:

```ts
type staffKeys = 'name' | 'salary';
function getProperty<T, K extends staffKeys>(obj: T, key: K): T[K] {
return obj[key];
}
```

The same type of constraint is applied, but the manual approach is less maintainable. Unlike the `keyof` operator approach, the type definition is duplicated, and the change of the original `Staff` type won’t be automatically propagated.

---

## Using `keyof` with TypeScript mapped types

A common use for the keyof operator is with [**mapped types**](/blog.logrocket.com/typescript-mapped-types.md), which transform existing types to new types by iterating through keys, often via the `keyof` operator.

Below is an example of how to transform the `FeatureFlags` type using the `OptionsFlags` mapped type:

```ts
type OptionsFlags<T> = {
 [Property in keyof T]: boolean;
};
// use the OptionsFlags
type FeatureFlags = { 
  darkMode: () => void;
  newUserProfile: () => void; 
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
// result 
/*
type FeatureOptions = {
  darkMode: boolean; 
  newUserProfile: boolean; 
 } 
*/
```

In this example, `OptionsFlags` is defined as a generic type that takes a type parameter `T`. `[Property in keyof T]` denotes the iteration of all property names of type `T`, and the square bracket is the index signature syntax. Thus, the `OptionsFlags` type contains all properties from the type `T` and remaps their value to Boolean.

### Using `keyof` with conditional mapped types

In the previous example, we mapped all the properties to a Boolean type. We can go one step further and use conditional types to perform conditional type mapping.

In the example below, we only map the non-function properties to Boolean types:

```ts
type OptionsFlags<T> = {
  [Property in keyof T]: T[Property] extends Function ? T[Property] : boolean };

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
  userManagement: string;
  resetPassword: string
 };


 type FeatureOptions = OptionsFlags<Features>;
 /**
  * type FeatureOptions = {
    darkMode: () => void;
    newUserProfile: () => void;
    userManagement: boolean;
    resetPassword: boolean;
} */
```

We can see how handy it is to map the `Features` type to a `FeatureOptions` type in the example. But best of all — any future changes in the source `FeatureFlags` type will be reflected in the `FeatureOptions` type automatically.

### Using `keyof` with utility types

TypeScript provides a set of inbuilt mapped types called [**utility types**](/blog.logrocket.com/using-built-in-utility-types-typescript.md). The `Record` type is one of them. To understand how `Record` type works, we can look at its definition below:

```ts
// Construct a type with set of properties K of T
type Record<K extends string | number | symbol, T> = { [P in K]: T; }
```

As you can see, it returns a new type after mapping all the property keys to type `T`. We can use the `Record` type to rewrite the previous `FeatureOptions` type example:

```ts
type FeatureOptions = Record<keyof FeatureFlags, boolean>; 
// result 
/* type FeatureOptions = { 
  darkMode: boolean; 
  newUserProfile: boolean; 
} 
*/
```

Here, we get the same `FeatureOptions` type using the `record` type to take a set of properties and transform them to Boolean type.

Another common usage of the `keyof` operator with utility types is with the `Pick` type. The `Pick` type allows us to pick one or multiple properties from an object type, and create a new type with the chosen properties.

The `keyof` operator ensures that the constraint is applied so that only the valid property names can be passed into the second parameter, `K`:

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
 };
```

The following example shows how to derive a `FeatureDarkModeOption` type from the `FeatureOption` type using `Pick`:

```ts
type FeatureDarkModeOption = Pick<FeatureOptions, 'darkMode'>;
 /**type FeatureDarkModeOption = {
    darkMode: boolean;
} */
```

---

## Using `keyof` with TypeScript template string literals

Introduced in TypeScript 4.1, the template literal type allows us to concatenate strings in types. With a template literal type and `keyof`, we can compose a set of strings with all the possible combinations:

```ts
type HorizontalPosition = { left: number; right: number };
type VerticalPosition = { up: number; down: number };
type TransportMode = {walk: boolean, run: boolean};

type MovePosition = `${keyof TransportMode}: ${keyof VerticalPosition}-${keyof HorizontalPosition}`;
/* result
type MovePosition = "walk: up-left" | "walk: up-right" | "walk: down-left" | "walk: down-right" | "run: up-left" | "run: up-right" | "run: down-left" | "run: down-right"
*/
```

In this example, we create a large union type `MovePosition` with the help of the `keyof` operator, which is a combination of the `TransportMode`, `HorizontalPosition`, and `VerticalPosition` types. Creating these sorts of union types manually would make them error-prone and difficult to maintain.

### Property remapping and `keyof`

Together with template string literal types in TypeScript 4.1, a set of utilities is provided out of the box to help with string manipulation. These utilities make it easier to construct types with remapped properties.

Here is an example:

```ts
interface Person {
  name: string;
  age: number;
  location: string;
}

type CapitalizeKeys<T> = {
  [P in keyof T as `${Capitalize<string & P>}`]: T[P];
}

type PersonWithCapitalizedKeys = CapitalizeKeys<Person>;
/* result:
type PersonWithCapitalizedKeys = {
    Name: string;
    Age: number;
    Location: string;
}
*/
```

In line eight, `as ${Capitalize<string & P&gt;}`, we use `as` to map the left side to the capitalized key, and still have access to the original key `P`.

You may notice that we use `<string & P>`. What does that mean? If we remove the `string &`, a compiler error will be shown as below:

![Compiler Error In Typescript](/assets/image/blog.logrocket.com/how-to-use-keyof-operator-typescript/compiler-error-typescript.png)

This error occurs because the `Capitalize` type requires the type parameter to be `string` | `number` | `bigint` | `boolean` | `null` | `undefined`. But `P` is a union type of `string` | `number` | `symbol`. The symbol type in `P` isn’t compatible with `Capitalize`.

Thus, we apply `&` ([<VPIcon icon="iconfont icon-typescript"/>intersection](https://typescriptlang.org/docs/handbook/unions-and-intersections.html)) between our `string` type and `P` type, which returns only the `string` type.

### Advanced property remapping use cases

We can go a step further to create more cool stuff:

```ts
type Getter<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P]
};
```

The above example shows a new `Getter` type using property remapping. In the code snippet below, we use the `Getter` type to create a `PersonWithGetter` type. The new type can help to enforce type safety for the `Getter` interface:

```ts
type PersonWithGetter = Getter<Person>;
/* result
type PersonWithGetters = {
    getName: () => string;
    getAge: () => number;
    getLocation: () => string;
}*/
```

Let’s extend the above example. Below is an `AsyncGetter` type. We loop through the property `P` from `keyof`, and apply a prefix of get and a suffix of `Async`. We also apply `Promise` as the return type:

```ts
type AsyncGetter<T> = {
  [P in keyof T as `get${Capitalize<string & P>}Async`]: () => Promise<T[P]>;
}

type PersonWithAsyncGetters = AsyncGetter<Person>;
/* Result:
type PersonWithAsyncGetters = {
    getNameAsync: () => Promise<string>;
    getAgeAsync: () => Promise<number>;
    getLocationAsync: () => Promise<string>;
}*/
```

In these examples, we derived two new types from the `Person` interface. We can apply these derived types to make the code type-safe and keep a consistent interface. When the `Person` interface changes, the change will propagate into the derived types automatically. We will get compiler errors if the change breaks anything.

---

## Summary

In this article, we examined the `keyof` operator and discussed using it with generics, conditional types, and template literal types.

The `keyof` operator is a small but critical cog in the giant TypeScript machine. When we use it in the right place with other tools in TypeScript, we can construct concise and well-constrained types to improve type safety in our code.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to use the keyof operator in TypeScript",
  "desc": "Use the TypeScript keyof operator with features like generics, mapped types, and template literal types to improve type safety in your code.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-use-keyof-operator-typescript.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
