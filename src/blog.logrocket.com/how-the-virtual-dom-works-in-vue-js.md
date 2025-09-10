---
lang: en-US
title: "How the virtual DOM works in Vue.js"
description: "Article(s) > How the virtual DOM works in Vue.js"
icon: iconfont icon-vuejs
category:
  - Node.js
  - Vue.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - vue
  - vuejs
  - vue-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How the virtual DOM works in Vue.js"
    - property: og:description
      content: "How the virtual DOM works in Vue.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-the-virtual-dom-works-in-vue-js.html
prev: /programming/js-vue/articles/README.md
date: 2020-12-03
isOriginal: false
author:
  - name: Nwose Lotanna
    url : https://blog.logrocket.com/author/nwoselotanna/
cover: /assets/image/blog.logrocket.com/how-the-virtual-dom-works-in-vue-js/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Vue.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-vue/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How the virtual DOM works in Vue.js"
  desc="With this overview of how the virtual DOM works in Vue.js, you can learn exactly what is happening behind the scenes."
  url="https://blog.logrocket.com/how-the-virtual-dom-works-in-vue-js"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-the-virtual-dom-works-in-vue-js/banner.png"/>

## Introduction

Vue.js is a JavaScript framework known for its fast loading speed and easy scalability. Some of its features can be linked directly its use of a virtual DOM to update the actual DOM as necessary.

![The Virtual DOM in Vue.js](/assets/image/blog.logrocket.com/how-the-virtual-dom-works-in-vue-js/banner.png)

Understanding the virtual DOM is not a requirement for learning Vue.js, but it can certainly help budding Vue developers begin to understand some of the things happening behind the scenes.

---

## The DOM itself

```html
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
</body>
</html>
```

Before we talk about the Vue.js virtual DOM, it is important to understand what the DOM itself is. The Document Object Model, or DOM, is a kind of interface that treats all the markup language (your HTML) as connected nodes. It can be seen as an interface of objects for markup elements stored in a tree-like structure.

The DOM is what allows us to write and change styles on elements, and even change elements themselves. This is done by adding, modifying, or deleting element tags or CSS styles in the head and body of a document because they are represented as nodes and objects. This is how the HTML DOM works — so why would Vue have another DOM?

![Wireframe of the HTML DOM](/assets/image/blog.logrocket.com/how-the-virtual-dom-works-in-vue-js/wireframe-html-dom.png)

### Why the traditional DOM is not enough

So all is fine and good with the DOM. As applications grow, however — meaning more nodes to traverse, more elements, and more scripts to communicate with those elements — the DOM grows slower and costs a lot of processing power.

Trying to perform a search or even update a DOM becomes a hard task, ultimately affecting the performance of the application. This is why the virtual DOM was created.

---

## The Vue.js virtual DOM

The Vue.js team built the virtual DOM to be a kind of abstraction of the traditional DOM; it is a “lite” version of the HTML DOM, but with superpowers. The virtual DOM is smarter, and so it finds a way to be more efficient than the traditional DOM.

The primary way it accomplishes this is through various diff algorithms to avoid re-rendering the entire DOM after any new change or update to the document. That alone improves efficiency and resource management to a great degree because the DOM API is called less often.

The virtual DOM by that explanation is located between the actual DOM and the Vue instance.

```js
new Vue({
  el: '#app',
  data: {
    text: 'hi LogRocket'
  },
  render(createElement) {
    return createElement(
      'h1',
      { attrs: { id: 'headers' } },
      this.text
    );
  }
});
```

This returns the elements below on render:

```html
<div id=’app’>
  <h1 id=’headers’>hi LogRocket</h1>
</div>
```

You see that Vue virtual DOM is made of Vue components, which are JavaScript objects that extend the Vue instance. Vue uses a virtual DOM because of the sheer difference in speed and efficiency compared to the actual DOM. The virtual DOM is also smaller in size than the actual DOM and so is very efficient.

### How it works

Let’s use a form with a conditional statement in it to show how the virtual DOM works:

```html
<form>
  <div>
    <div class=”form-group” :class=”{‘form-group — error’: $v.name.$error }”>
      <label class=”form__label”>Full Name</label>
      <input class=”form__input” v-model.trim=”$v.name.$model”/>
    </div>
    <span class=”error” v-if=”!$v.name.required”>Field is required</span>
  </div>
</form>
```

Notice how the code block above has a `span` with a `v-if` statement showing an `error` class when the name is not entered. In this code, a small span line appears if you do not type a name in the box indicating “Field is required.” The change in the virtual DOM will be to conditionally add this `span` element if the `v-if` condition returns `true`.

Before this line is read, the actual DOM and the virtual DOM will read the same; after this condition is met, a diff is now made between the two states (in the actual DOM and the virtual DOM), and this diff will output a patch of changes that will now be applied to the actual DOM without re-rendering it. In this way, both DOMs go back to being the same immediately.

### How to mount a virtual DOM to an HTML element

You might not have noticed, but any time you run a Vue.js command for a new project, like hello world:

```sh
vue create hello-world
```

You see that by default you are already using the Vue’s virtual DOM; you can confirm that when you go to your <VPIcon icon="fa-brands fa-js"/>`main.js` file. It should look somewhat similar to this code block below:

```js title="main.js"
import Vue from 'vue'
import App from './App'

new Vue({
  el: '#app',
  components: { App }
});
```

You can see that the element here is any element with the ID of `App`, which is usually the `App` component in the <VPIcon icon="iconfont icon-vuejs"/>`App.vue` file. Inside any component, you can specifically target an element of your choice by using the `el` option, and it becomes mounted to the HTML DOM.

---

## Some lessons

It is refreshing to catch a glimpse of what happens behind the scenes with the virtual DOM in Vue.js. It is also important to recognize that whatever code we write is parsed by the virtual DOM, and things like directives and even events inside our template sections do not end up that way on the actual DOM.

Vue makes use of them, processes them, and the patch created is what gets to the actual DOM. You can easily inspect your app in your browser to confirm that you would not see any directives.

---

## Conclusion

This post has been an overview of how the virtual DOM works in Vue.js, with a few illustrations to follow and how to mount one. It is my hope that after reading this post, you appreciate the concepts behind the things you use every day whenever you create a Vue project. Happy hacking!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How the virtual DOM works in Vue.js",
  "desc": "With this overview of how the virtual DOM works in Vue.js, you can learn exactly what is happening behind the scenes.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-the-virtual-dom-works-in-vue-js.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
