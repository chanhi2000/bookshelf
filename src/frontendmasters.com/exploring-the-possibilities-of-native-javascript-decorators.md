---
lang: en-US
title: "Exploring the Possibilities of Native JavaScript Decorators"
description: "Article(s) > Exploring the Possibilities of Native JavaScript Decorators"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Exploring the Possibilities of Native JavaScript Decorators"
    - property: og:description
      content: "Exploring the Possibilities of Native JavaScript Decorators"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/exploring-the-possibilities-of-native-javascript-decorators.html
prev: /programming/js/articles/README.md
date: 2024-08-09
isOriginal: false
author: Alex MacArthur
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3381
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
  name="Exploring the Possibilities of Native JavaScript Decorators"
  desc="Native support for decorators is inevitable! It simplifies augmenting class methods, which can help with things like logging, memoization, debouncing, and dependency injection."
  url="https://frontendmasters.com/blog/exploring-the-possibilities-of-native-javascript-decorators"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3381"/>

We’ve known it for a while now, but JavaScript is eventually getting native support for decorators. The proposal is in[stage 3 (<FontIcon icon="iconfont icon-github"/>`tc39/proposal-decorators`)](https://github.com/tc39/proposal-decorators)— it’s inevitable! I’m just coming around to explore the feature, and I’m kinda kicking myself for waiting so long, because I’m finding it to be tremendously helpful. Let’s spend some time exploring it.

<SiteInfo
  name="tc39/proposal-decorators"
  desc="Decorators for ES6 classes."
  url="https://github.com/tc39/proposal-decorators/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/39244f32a61cd92ee0be1e11aef1c18be9572ba6c891c4b252a93738276e4d96/tc39/proposal-decorators"/>

---

## The Pattern vs The Feature

It’s probably worth clarifying what’s meant by a “decorator.” Most of the time, people are talking about one of two things:

### The decorator*design pattern*

This is the[<FontIcon icon="fa-brands fa-wikipedia-w"/>higher-level concept](https://en.wikipedia.org/wiki/Decorator_pattern)of augmenting or extending a function’s behavior by “decorating” it. Logging is a common example. You might want to know*when*and*with what*parameters it’s called, so you wrap it with another function:

```js
function add(a, b) {
  return a + b;
}

function log(func) {
  return function (...args) {
    console.log(
      `method: ${func.name} | `,
      `arguments: ${[...args].join(", ")}`
    );
    return func.call(this, ...args);
  };
}

const addWithLogging = log(add);

addWithLogging(1, 2);
// adding 1 2
```

There’s no new language-specific feature here. One function simply accepts another as an argument and returns a new, souped-up version. The original function has been*decorated*.

### Decorators as a*feature of the language*

The decorator feature is a more tangible manifestation of the pattern. It’s possible you’ve seen an older, unofficial version of this before. We’ll keep using the logging example from above, but we’ll first need to refactor a bit because language-level decorators can only be used on class methods, fields, and on classes themselves.

```js{19} :collapsed-lines
// The "old" decorator API:

function log(target, key, descriptor) {  
  const originalMethod = descriptor.value;
  
  descriptor.value = function (...args) {
    console.log(
      `method: ${originalMethod.name} | `,
      `arguments: ${[...args].join(", ")}`
    );

    return originalMethod.apply(this, args);
  };
  
  return descriptor;
}

class Calculator {
  @log // <-- Decorator applied here. 
  add(a, b) {
    return a + b;
  }
}

new Calculator().add(1, 2); // method: add | arguments: 1, 2
```

Despite being non-standard, there are a number of popular, mature libraries out there that have used this implementation.[TypeORM](https://typeorm.io/),[<FontIcon icon="fa-brands fa-angular"/>Angular](https://angular.io/features), and[<FontIcon icon="iconfont icon-nestjs"/>NestJS](https://docs.nestjs.com/controllers)are just a few of the big ones. And I’m glad they have. It’s made building applications with them feel cleaner, more expressive, and easier to maintain.

But because it’s non-standard, it could become problematic. For example,[there’s some nuance (<FontIcon icon="iconfont icon-github"/>`babel/babel`)](https://github.com/babel/babel/issues/8864#issuecomment-688535867)between how it’s implemented by Babel and TypeScript, which probably caused frustration for engineers moving between applications with different build tooling. Standardization would serve them well.

---

## The Slightly Different Official API

Fortunately, both TypeScript ([<FontIcon icon="iconfont icon-typescript"/>as of v5](https://typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#decorators)) and Babel ([via plugin](https://babeljs.io/docs/babel-plugin-proposal-decorators)) now support the TC39 version of the API, which is even simpler:

```js
function log(func, context) {
  return function (...args) {
    console.log(
      `method: ${func.name} | `,
      `arguments: ${[...args].join(", ")}`
    );

    func.call(this, ...args);
  };
}

class Calculator {
  @log
  add(a, b) {
    return a + b;
  }
}

new Calculator().add(1, 2); // method: add | arguments: 1, 2
```

As you can see, there’s much less of a learning curve, and it’s fully interchangeable with many functions that have been used as decorators until now. The only difference is that it’s implemented with new syntax.

---

## Exploring the Use Cases

There’s no shortage of scenarios in which this feature will be handy, but let’s try out a couple that come to mind.

### Debouncing & Throttling

Limiting the number of times an action occurs in a given amount of time is an age-old need on the web. Typically, that’s meant reaching for a Lodash utility or rolling an implementation yourself.

Think of a live search box. To prevent user experience issues and network load, you want to*debounce*those searches, only firing a request when the user has stopped typing for a period of time:

```js
function debounce(func) {
  let timeout = null;

  return function (...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(this, args);
    }, 500);
  };
}

const debouncedSearch = debounce(search);

document.addEventListener('keyup', function(e) {
  // Will only fire after typing has stopped for 500ms.
  debouncedSearch(e.target.value);
});
```

But decorators can only be used on a class or its members, so let’s flesh out a better example. You’ve got a`ViewController`class with a method for handling`keyup`events:

```js
class ViewController {
  async handleSearch(query) {
    const results = await search(query);

    console.log(`Update UI with:`, results);
  }
}

const controller = new ViewController();

input.addEventListener('keyup', function (e) {
  controller.handleSearch(e.target.value);
});
```

Using the`debounce()`method we wrote above, implementation would be clunky. Focusing in on the`ViewController`class itself:

```js
class ViewController {
  handleSearch = debounce(async function (query) {
    const results = await search(query);

    console.log(`Got results!`, results);
  });
}
```

You not only need to wrap your*entire*method, but you also need to switch from defining a class method to an instance property set to the debounced version of that method. It’s a little invasive.

### Updating to a Native Decorator

Turning that`debounce()`function into an official decorator won’t take much. In fact, the way it’s already written fits the API perfectly: it accepts the original function and spits out the augmented version. So, all we need to do is apply it with the`@`syntax:

```js{2}
class ViewController {
  @debounce
  async handleSearch(query) {
    const results = await search(query);
    console.log(`Got results!`, results);
  }
}
```

That’s all it takes — a single line — for the exact same result.

We can also make the debouncing delay configurable by making`debounce()`accept a`delay`value and return a decorator itself:

```js
// Accept a delay:
function debounce(delay) {
  let timeout = null;

  // Return the configurable decorator:
  return function (value) {
    return function (...args) {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        value.call(this, ...args);
      }, delay);
    };
  };
}
```

Using it just means calling our decorator wrapper as a function and passing the value:

```js{2}
class ViewController { 
  @debounce(500) 
  async handleSearch(query) { 
    const results = await search(query); 
    console.log(`Got results!`, results); 
  } 
}
```

That’s a lot of value for minimal code wrangling, especially support being provided by TypeScript and Babel — tools already well-integrated in our build processes.

### Memoization

Whenever I think of great memoization that’s syntactically beautiful, Ruby first comes to mind. I’ve written about[<FontIcon icon="fas fa-globe"/>how elegant it is](https://macarthur.me/posts/memoization-with-tap-in-ruby/)in the past; the`||=`operator is all you really need:

```rb
def results
  @results ||= calculate_results
end
```

But with decorators, JavaScript’s making solid strides. Here’s a simple implementation that caches the result of a method, and uses that value for any future invocations:

```js
function memoize(func) {
  let cachedValue;

  return function (...args) {
    // If it's been run before, return from cache.
    if (cachedValue) {
      return cachedValue;
    }

    cachedValue = func.call(this, ...args);

    return cachedValue;
  };
}
```

The nice thing about this is that each invocation of a decorator declares its own scope, meaning you can reuse it without risk of the`cachedValue`being overwritten with an unexpected value.

```js :collapsed-lines
class Student {
  @memoize
  calculateGPA() {
    // Expensive computation...
    return 3.9;
  }

  @memoize
  calculateACT() {
    // Expensive computation...
    return 34;
  }
}

const bart = new Student();

bart.calculateGPA();
console.log(bart.calculateGPA()); // from cache: 3.9

bart.calculateACT();
console.log(bart.calculateACT()); // from cache: 34
```

Going further, we could also memoize based on the parameters passed to a method:

```js :collapsed-lines
function memoize(func) {
  // A place for each distinct set of parameters.
  let cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    // This set of parameters has a cached value.
    if (cache.has(key)) {
      return cache.get(key);
    }

    const value = func.call(this, ...args);

    cache.set(key, value);

    return value;
  };
}
```

Now, regardless of parameter usage, memoization can become even more flexible:

```js :collapsed-lines
class Student {
  @memoize
  calculateRank(otherGPAs) {
    const sorted = [...otherGPAs].sort().reverse();

    for (let i = 0; i <= sorted.length; i++) {
      if (this.calculateGPA() > sorted[i]) {
        return i + 1;
      }
    }

    return 1;
  }

  @memoize
  calculateGPA() {
    // Expensive computation...
    return 3.4;
  }
}

const bart = new Student();

bart.calculateRank([3.5, 3.7, 3.1]); // fresh
bart.calculateRank([3.5, 3.7, 3.1]); // cached
bart.calculateRank([3.5]); // fresh
```

That’s cool, but it’s also worth noting that you could run into issues if you’re dealing with parameters that can’t be serialized (`undefined`, objects with circular references, etc.). So, use it with some caution.

### Memoizing Getters

Since decorators can be used on more than just methods, a slight adjustment means we can memoize getters too. We just need to use`context.name`(the name of the getter) as the cache key:

```js :collapsed-lines
function memoize(func, context) {
  let cache = new Map();

  return function () {
    if (cache.has(context.name)) {
      return cache.get(context.name);
    }

    const value = func.call(this);

    cache.set(context.name, value);

    return value;
  };
}
```

Implementation would look the same:

```js :collapsed-lines
class Student {
  @memoize
  get gpa() {
    // Expensive computation...
    return 4.0;
  }
}

const milton = new Student();

milton.gpa // fresh
milton.gpa // from the cache
```

That context object contains some useful bits of information, by the way. One of those is the “kind” of field being decorated. That means we could even take this a step further by memoizing the getters*and*methods with the same decorator:

```js :collapsed-lines
function memoize(func, context) {
  const cache = new Map();

  return function (...args) {
    const { kind, name } = context;

    // Use different cache key based on "kind."
    const cacheKey = kind === 'getter' ? name : JSON.stringify(args);

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const value = func.call(this, ...args);

    cache.set(cacheKey, value);

    return value;
  };
}
```

You could take this much further, but we’ll draw the line there for now, and instead shift to something a little more complex.

---

## Dependency Injection

If you’ve worked with a framework like Laravel or Spring Boot, you’re familiar with dependency injection and the “inversion of control (IoC) container” for an application. It’s a useful feature, enabling you to write components more loosely coupled and easily testable. With native decorators, it’s possible to bring that core concept to vanilla JavaScript as well. No framework needed.

Let’s say we’re building an application needing to send messages to various third-parties. Triggering an email, sending an analytics event, firing a push notification, etc. Each of these are abstracted into their own service classes:

```js :collapsed-lines
class EmailService {
  constructor() {
    this.emailKey = process.env.EMAIL_KEY;
  }
}

class AnalyticsService {
  constructor(analyticsKey) {
    this.analyticsKey = analyticsKey;
  }
}

class PushNotificationService {
  constructor() {
    this.pushNotificationKey = process.env.PUSH_NOTIFICATION_KEY;
  }
}
```

Without decorators, it’s not difficult to instantiate those yourself. It might look something like this:

```js :collapsed-lines
class MyApp {
  constructor(
    emailService = new EmailService(),
    analyticsService = new AnalyticsService(),
    pushNotificationService = new PushNotificationService()
  ) {
    this.emailService = emailService;
    this.analyticsService = analyticsService;
    this.pushNotificationService = pushNotificationService;

    // Do stuff...
  }
}

const app = new MyApp();
```

But now you’ve cluttered your constructor with parameters that’ll never otherwise be used during runtime, and you’re taking on full responsibility for instantiating those classes. There are workable solutions out there (like relying on separate modules to create singletons), but it’s not ergonomically great. And as complexity grows, this approach will become more cumbersome, especially as you attempt to maintain testability and stick to good inversion of control.

---

## Dependency Injection with Decorators

Now, let’s create a basic dependency injection mechanism with decorators. It’ll be in charge of registering dependencies, instantiating them when necessary, and storing references to them in a centralized container.

In a separate file (<FontIcon icon="fa-brands fa-js"/>`container.js`), we’ll build a simple decorator used to register any classes we want to make available to the container.

```js
const registry = new Map();

export function register(args = []) {
  return function (clazz) {
    registry.set(clazz, args);
  };
}
```

There’s not much to it. We’re accepting the class itself and optional constructor arguments needed to spin it up. Next up, we’ll create a container to hold the instances we create, as well as an`inject()`decorator.

```js
const container = new Map();

export function inject(clazz) {
  return function (_value, context) {
    context.addInitializer(function () {
      let instance = container.get(clazz);

      if (!instance) {
        instance = Reflect.construct(clazz, registry.get(clazz));
        container.set(clazz, instance);
      }

      this[context.name] = instance;
    });
  };
}
```

You’ll notice we’re using something else from the decorator specification. The `addInitializer()` method will fire a callback only after the decorated property has been defined. That means we’ll be able to lazily instantiate our injected dependencies, rather than booting up every registered class all at once. It’s a slight performance benefit. If a class uses the`EmailService`for example, but it’s never actually instantiated, we won’t unnecessarily boot up an instance of`EmailService`either.

That said, here’s what’s going on when the decorator is invoked:

- We check for any active instance of the class in our container.
- If we don’t have one, we create one using the arguments stored in the registry, and store it in the container.
- That instance is assigned to the name of the field we’ve decorated.

Our application can now handle dependencies a little more elegantly.

```js :collapsed-lines
import { register, inject } from "./container";

@register()
class EmailService {
  constructor() {
    this.emailKey = process.env.EMAIL_KEY;
  }
}
@register()
class AnalyticsService {
  constructor(analyticsKey) {
    this.analyticsKey = analyticsKey;
  }
}
@register()
class PushNotificationService {
  constructor() {
    this.pushNotificationKey = process.env.PUSH_NOTIFICATION_KEY;
  }
}

class MyApp {
  @inject(EmailService)
  emailService;

  @inject(AnalyticsService)
  analyticsService;

  @inject(PushNotificationService)
  pushNotificationService;

  constructor() {
    // Do stuff.
  }
}

const app = new MyApp();
```

And as an added benefit, it’s straightforward to substitute those classes for mock versions of them as well. Rather than overriding class properties, we can less invasively inject our own mock classes into the container before the class we’re testing is instantiated:

```js :collapsed-lines
import { vi, it } from 'vitest';
import { container } from './container';
import { MyApp, EmailService } from './main';

it('does something', () => {
  const mockInstance = vi.fn();
  container.set(EmailService, mockInstance);

  const instance = new MyApp();
  
  // Test stuff.
});
```

That makes for less responsibility on us, tidy inversion of control, and straightforward testability. All made easy by a native feature.

---

## Just Scratching the Surface

If you read through[the proposal (<FontIcon icon="iconfont icon-github"/>`tc39/proposal-decorators`)](https://github.com/tc39/proposal-decorators?tab=readme-ov-file#adding-initialization-logic-with-addinitializer), you’ll see that the decorator specification is far deeper than what’s been explored here, and will certainly open up some novel use cases in the future, especially once more runtimes support it. But you don’t need to master the depths of the feature in order to benefit. At its foundation, the decorator feature is still firmly seated on the decorator pattern. If you keep that in mind, you’ll be in a strong position to greatly benefit from it in your own code.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Exploring the Possibilities of Native JavaScript Decorators",
  "desc": "Native support for decorators is inevitable! It simplifies augmenting class methods, which can help with things like logging, memoization, debouncing, and dependency injection.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/exploring-the-possibilities-of-native-javascript-decorators.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
