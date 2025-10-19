---
lang: en-US
title: "How to Use the Compound Components Pattern in React: Prop Soup to Flexible UIs"
description: "Article(s) > How to Use the Compound Components Pattern in React: Prop Soup to Flexible UIs"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use the Compound Components Pattern in React: Prop Soup to Flexible UIs"
    - property: og:description
      content: "How to Use the Compound Components Pattern in React: Prop Soup to Flexible UIs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/compound-components-pattern-in-react.html
prev: /programming/js-react/articles/README.md
date: 2025-10-09
isOriginal: false
author:
  - name: Tapas Adhikary
    url : https://freecodecamp.org/news/author/atapas/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759972853846/49e605c8-be15-44a4-9fc6-283be0cc0e4c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use the Compound Components Pattern in React: Prop Soup to Flexible UIs"
  desc="Have you ever opened React project source code and wondered why things are so messy? Have you ever tried adding a feature to a React component created by someone else and felt that you needed to rewrite it? Have you felt nightmarish in tackling state..."
  url="https://freecodecamp.org/news/compound-components-pattern-in-react"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759972853846/49e605c8-be15-44a4-9fc6-283be0cc0e4c.png"/>

Have you ever opened React project source code and wondered why things are so messy? Have you ever tried adding a feature to a React component created by someone else and felt that you needed to rewrite it? Have you felt nightmarish in tackling state and props for a component and its children?

If you happen to shout out “Yes!” to the above, you’re not alone. It’s a common feeling among many React developers across the globe. But React itself is not responsible for any of these issues. These situations arise because of code smells like:

- Props drilled six levels down.
- A single bloated component doing everything.
- Logic that’s duplicated across different components.
- Careless rendering (and re-rendering) causing performance issues.

A `Code Smell` doesn’t mean broken code. Rather, it’s an indication that the code may work now, but is difficult to maintain, reuse, scale, and much harder to debug.

And that’s exactly where we need to use `Design Patterns`. They’re well-tested solutions to the various code smell problems that developers have been encountering for decades. When you know how to use them well, you achieve a clean, maintainable codebase that is easy to enhance, debug, and scale.

Today, we will take a deep dive into one of the most prominent design patterns in React called the `Compound Components Pattern`. This pattern saves React developers from passing a long list of props and helps build composable user interface components.

This is going to be a complete hands-on tutorial. So get your favourite code editor ready, and let’s get started. This article is also available as a video tutorial as part of the [<VPIcon icon="fa-brands fa-youtube"/>15 Days of React Design Patterns](https://youtube.com/playlist?list=PLIJrr73KDmRyQVT__uFZvaVfWPdfyMFHC) initiative. Please check it out.

---

## React 19 Code Set Up

The best way to understand how to apply a design pattern is by refactoring messy code with code smells to improve it to cleaner code. So let’s set up a coding ground so that we can start putting in our messy code first, and then go about applying the design pattern to it.

Note: you can find all the source code used in this tutorial on the [tapaScript GitHub (<VPIcon icon="iconfont icon-github"/>`tapascript/15-days-of-react-design-patterns`)](https://github.com/tapascript/15-days-of-react-design-patterns/tree/main/day-03/compound-components-patterns). Feel free to follow along with it side by side.

Also, make sure you have Node.js installed (preferably v18+). You can check it out by typing this command on your terminal/command prompt:

```sh
node -v
```

If you get an output with the installed Node.js version, you are all set. Otherwise, just download and install Node.js from [<VPIcon icon="fa-brands fa-node"/>here](https://nodejs.org/en/download).

Now, run this command in your terminal to create a React 19 project scaffolding:

```sh
npx degit atapas/code-in-react-19#main compound-components-pattern
```

It will create a folder called `compound-components-pattern` with the Vite-based React project files under it. Now, change the directory using this command:

```sh
cd compound-components-pattern
```

Then install the dependencies using this command:

```sh
npm install ## Or, yarn install, or pnpm install, etc,
```

Now, you can import the project folder into your favourite code editor (I use VS Code).

![Code Scaffolding](https://cdn.hashnode.com/res/hashnode/image/upload/v1759478983493/692ac0f9-4780-4d60-bc72-55f27b9a6074.png)

Finally, to start the project locally, use the following command:

```sh
npm run dev ## Or, yarn dev, or pnpm dev
```

Now the project should be running locally and should be accessible on the default URL, `http://localhost:5173`. You can access the URL in your browser. Now we’re all set to start coding.

---

## A Messy Modal Component

Let’s get started by creating a Modal component. Start by creating a directory called <VPIcon icon="fas fa-folder-open"/>`messy` under the <VPIcon icon="fas fa-folder-open"/>`src/` directory. Now, create a file called `Modal.jsx` under `src/messy/` with the following code snippet:

```jsx title="messy/Modal.jsx"
function Modal({ title, body, primaryAction, secondaryAction }) {
    return (
        <div className="modal-backdrop">
            <div className="modal-container">
                <h2 className="modal-header">{title}</h2>
                <p className="modal-body">{body}</p>
                <div className="modal-footer">
                    {secondaryAction}
                    {primaryAction}
                </div>
            </div>
        </div>
    );
}

export default Modal;
```

This is a simple React implementation of a modal component that accepts a title, body, and a couple of actions as props to render them as a modal.

- The `title`: The header title of the modal.
- The `body`: The modal content.
- The `primaryAction`: An action button like delete, create, save, and so on to place in the footer section of the modal.
- The `secondaryAction`: An action button like cancel, close, and so on to place in the footer section of the modal.

Next, open the <VPIcon icon="fa-brands fa-react"/>`App.jsx` file and replace the existing code with the following code snippet:

```jsx title="App.jsx"
import Modal from "./messy/Modal";

import "./App.css";

function App() {
    return (
        <div className="flex flex-col items-center">
            <Modal
                title="Delete Account"
                body="Are you sure you want to delete your account?"
                primaryAction={<button>Delete</button>}
                secondaryAction={<button>Cancel</button>} />
        </div>
    );
}

export default App;
```

Here, we have imported the `Modal` component and used it by passing its props values. Go to the browser tab and access the app’s URL. You should see the modal appearing like this:

![messy modal without style](https://cdn.hashnode.com/res/hashnode/image/upload/v1759409687600/825901e9-5b38-49a7-8d7d-74a0867f6a01.png)

Well, as it doesn’t look like a traditional modal with a backdrop and all, so let’s fix that using CSS. Open the `App.css` and paste the following CSS styles into it and save it:

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-container {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  width: 400px;
  position: relative;
}
.modal-header {
  font-weight: bold;
  margin-bottom: 1rem;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}
.modal-close {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 1.2rem;
}
```

Great! Now you have a cool-looking modal dialog asking for your confirmation to delete your account.

![Messy Modal with style](https://cdn.hashnode.com/res/hashnode/image/upload/v1759409736382/ceaaa23e-26d3-4d7d-93ed-ae83aa69b421.png)

---

## The Problems with This Messy Modal Component

Question for you: What problems do you think this modal implementation might have?

Let’s find the answers:

### 1. Lack of Flexibility

The modal has a rigid structure that dictates exactly what it renders. What if you want a modal without a title? Or a modal with a custom layout? Or more than two action buttons? You need to write additional logic and pass additional props every time you think of enhancing the modal for another use case. These changes in the component will bring maintainability issues and increase code smell.

### 2. Mixed Responsibilities

The modal tries to do multiple things. It handles both layout and content. This violates the separation of concerns principle that we learn from other design patterns, such as the [<VPIcon icon="fa-brands fa-youtube"/>Container-Presenter Pattern](https://youtu.be/1UHbhikwg-s).

### 3. Hard Reusability

The modal lacks reusability due to its rigidness. Right now, if you want a modal with this:

```html
<h2>Something Wrong!</h2>
<img src="warning.png" />
<p>Something went wrong. please see the logs for more details.</p>
```

You can not reuse this component, and you will end up creating a new one.

### 4. Poor Scalability

The modal component is not scalable. Think, for example, if you’re creating a component library and you end up creating multiple modal instances like ConfirmationModal, InfoModal, FormModal, ImageModal, and so on. It would be a huge ding on the scalability of that component library to create and maintain every new version of the modal.

### 5. Hard to Test

This modal implementation is hard to test due to its tight coupling with props.

With these issues in mind, let’s welcome the compound components pattern and see how it can help us solve them.

---

## The Compound Components Pattern

`Compound Components Pattern` in React is a design pattern where a parent component works together with its child components to share an implicit state and behaviour. Instead of passing a long list of props, the parent manages the state and exposes flexible child components (`<Modal.Header>`, `<Modal.Body>`, `<Modal.Footer>`, and so on) so that consumers can compose the UI naturally, just like using native HTML elements.

![Compound Components Pattern Diagram](https://cdn.hashnode.com/res/hashnode/image/upload/v1759409949714/8144535d-c0f3-4ae7-bd8d-ab93fe7bf6c2.png)

Think of Compound Composition Pattern like LEGO blocks.

- The parent component is like the LEGO base plate.
- The child components are the LEGO blocks (door, window, roof, and so on).
- You don’t pass any props to the base plate, saying, *“add a door here, add a window there.”* Instead, you simply place the pieces where you want them.
- The base plate (parent) still provides the rules and structure (studs, alignment, stability), but you get the flexibility to assemble your model however you like.

Got it? That’s the power of compound components. It’s a flexible composition with a shared state/behaviour underneath.

Let’s now refactor our messy (and smelly) modal component by applying the compound components pattern.

---

## How to Build a Modal Component Using the Compound Components Pattern

Create a folder called `with-pattern` under the `src/` folder. We will arrange and maintain the modal component, and in the future, an accordion component under this new folder.

Next, create a folder called `modal` under the `src/with-pattern`. Finally, create a file called `Modal.jsx` with the following code snippet:

```jsx title="src/with-pattern/modal/Modal.jsx"
const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        {children}
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
      </div>

      </div>
  );
};

function ModalHeader({ children }) {
  return <div className="modal-header">{children}</div>;
}

function ModalBody({ children }) {
  return <div className="modal-body">{children}</div>;
}

function ModalFooter({ children }) {
  return <div className="modal-footer">{children}</div>;
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
```

Let me break it down for you:

- First, focus on the Modal component above. It doesn’t take title, body, and so on as props anymore. Rather, it accepts `children`, a special prop in React to pass any HTML elements, a group of HTMLs, JSX, or even a React component. It brings flexibility that we are no longer fixed to any particular structure to pass to the Modal component.
- The JSX of the Modal component just renders the `children` prop as is, giving the entire power to the consumer of the Modal component to pass any structure it’s willing to. The Modal component uses the backdrop and container style to dictate the basic look and feel of a modal.
- The Modal’s JSX also has a button to close the modal by clicking on an x. To open and close the modal, we have passed two additional props, `isOpen` and `onClose`. You can imagine `isOpen` is a state value that the consumer of this modal uses to open the modal, and the `onClose` is a function that sets the value of the `isOpen` to false to close the modal.
- Then, we have defined three more components, `ModalHeader`, `ModalBody`, and `ModalFooter` which are equally flexible to accept any legit HTML structure or React component through the `children` prop. Now you can pass anything to render to the modal header. The same goes for the body and footer as well.
- Next, we add the header, body, and footer as the subcomponents to the `Modal` component.

```js
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
```

- Finally, we exported the `Modal` component.

### Why Didn’t We Create Separate Files for the SubComponents?

This question is quite natural. In general, we follow the standard practice of one component in one source file(`.jsx`/`.tsx`). Here, we seem to be breaking that rule…so are we? Actually not.

The golden rules are:

- The subcomponents (`ModalHeader`, `ModalBody`, and `ModalFooter`) are only meaningful in the context of Modal. They don’t have (or need) any existence beyond the modal.
- They are small helper components that you don’t expect to reuse anywhere else.
- Keeping them together is good for discoverability and is safe from potential misuse that we’ll discuss in the pitfalls section later.

### How to Use the Modal Component

So we’re sorted. Let’s now learn how to use this Modal component and see how it can bring flexibility, reusability, scalability, and testability.

Open the <VPIcon icon="fa-brands fa-react"/>`App.jsx` file and replace the content of it with the following code snippet:

```jsx title="App.jsx"
import { useState } from "react";
// import Modal from "./messy/Modal";
import Modal from "./with-pattern/modal/Modal";

import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">

      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>

        <Modal.Header>
          <h2>Welcome!</h2>
        </Modal.Header>

        <Modal.Body>
          <p>
              This is a modal built with the Compound Component
              pattern.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <button>Help!</button>
          <button onClick={() => setIsOpen(false)}>Close</button>
          <button onClick={() => alert("Action Performed!")}>Do Action</button>
        </Modal.Footer>

      </Modal>

    </div>
  );
}

export default App;
```

Check out how we have passed a bunch of JSX inside `<Modal>…</Modal>` as the children. It’s so powerful. We’re passing the subcomponents header, body, and footer in the sequence we want them to appear in the modal.

Next, if we look into the `<ModalHeader>`, `<ModalBody>`, or `<ModalFooter`> components, we can again pass anything as children to them. For example, the `<ModalFooter />` can now take three buttons (in fact, anything else) based on the needs.

We can compose the components like Lego blocks to build the kind of Modal that we wish to. You don't need to have different components to represent different kinds of modals now. This single component can cater to all your modal needs without introducing any props soup drama.

We have a button to open the modal, and the App.jsx component manages a state called `isOpen` to tackle the opening and closing of the modal.

You should be able to see these changes now in the browser. Click on the open modal button.

![Open Modal Button](https://cdn.hashnode.com/res/hashnode/image/upload/v1759410185904/b7adbab0-9d24-4245-92ad-84766817af12.png)

The modal dialog opens up with all the content we have passed to it.

![Modal With Pattern](https://cdn.hashnode.com/res/hashnode/image/upload/v1759410275413/9bff6791-3cf8-45eb-aea8-a85e9a95777d.png)

It’s a big leap towards achieving clean code to use the compound components design pattern. Now that you’re familiar with the basics, let’s quickly do another classic implementation of this pattern by building an Accordion component.

---

## How to Build an Accordion Component Using the Compound Components Pattern

An accordion component is an array of Accordion Items. It’s a combination of a header and body that shows and hides the content when users click on the header.

Create a folder called <VPIcon icon="fas fa-folder-open"/>`accordion` under <VPIcon icon="fas fa-folder-open"/>`src/with-pattern` folder. Now, create a file called <VPIcon icon="fa-brands fa-react"/>`Accordion.jsx` inside the <VPIcon icon="fas fa-folder-open"/>`src/with-pattern/accordion` with the following code snippet:

```jsx title="src/with-pattern/accordion/Accordion.jsx"
import { useState } from "react";

function Accordion({ children }) {
  return <div className="accordion">{children}</div>;
}

function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      <button className="accordion-title" onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
}

// Attach subcomponents
Accordion.Item = AccordionItem;

export default Accordion;
```

Here,

- We have followed the same pattern as we did for the modal previously. We have an `Accordion` component that takes a special prop called `children`, enabling the Accordion to accept any HTML/JSX/React component and render it.
- Then we defined the `AccordionItem`. It takes two props: the title to create the header, and the special prop called children to form the accordion content flexibly.
- The header is formed using the button that is driven by a state called `isOpen` to show/hide the content area.
- The content area of an `AccordionItem` could be anything: a paragraph, a table, an image, or even a JSX combining them.
- Finally, we have added the AccordionItem as the subcomponent to the Accordion component.

To make the accordion look better, let’s add a few styles. Open the `App.css` file and add these styles at the end of the file:

```css
.accordion-item {
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.accordion-title {
  width: 100%;
  text-align: left;
  padding: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  background: #f9f9f9;
  border: none;
}
.accordion-content {
  padding: 0.5rem;
  background: #fff;
}
```

Great, let’s now use the Accordion component. Create a new file called <VPIcon icon="fa-brands fa-react"/>`AccordionDemo.jsx` under the folder <VPIcon icon="fas fa-folder-open"/>`src/with-pattern/accordion/`<VPIcon icon="fa-brands fa-react"/>`AccordionDemo.jsx` with the following code snippet:

```jsx title="src/with-pattern/accordion/AccordionDemo.jsx"
import Accordion from "./Accordion";

export default function AccordionDemo() {
  return (
    <Accordion>
      <Accordion.Item title="What is Compound Component Pattern?">
        It’s a React pattern that allows parent and child components to work
        together seamlessly while giving developers flexible composition.
      </Accordion.Item>

      <Accordion.Item title="Why use it?">
        It makes UI libraries like modals, tabs, accordions, menus, etc. easier
        to build and use.
      </Accordion.Item>

      <Accordion.Item title="Pitfalls?">
        Overusing it can lead to deeply nested structures or make things harder
        to debug if not documented well.
      </Accordion.Item>
    </Accordion>
  );
}
```

Check out how the `Accordion` component can accept a bunch of AccordionItem components. You can also create an array of `AccordionItem` components and pass them dynamically to the Accordion component.

Each of the AccordionItem components accepts the title prop value, and we passed the text as the children. If needed, you can pass any other valid JSX as a child. That’s amazing!

### Add the Accordion to the Modal

Now, let’s take the usage of this pattern to the next level. How about using the `AccordionDemo` inside the `Modal` component? Can we do it without changing the Modal component?

Oh yes! Remember, the Modal component accepts any JSX as children, and so does the ModalBody component. So we can just import the AccordionDemo component into the App.jsx file and use it inside the `<Modal.Body>…</Modal.Body>` as shown below, right?

```jsx
import { useState } from "react";
// import Modal from "./messy/Modal";
import Modal from "./with-pattern/modal/Modal";

import AccordionDemo from "./with-pattern/accordion/AccordionDemo";

import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">

      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>

        <Modal.Header>
          <h2>Welcome!</h2>
        </Modal.Header>

        <Modal.Body>
          <p>
              This is a modal built with the Compound Component
              pattern.
          </p>
          <AccordionDemo />
        </Modal.Body>

        <Modal.Footer>
          <button>Help!</button>
          <button onClick={() => setIsOpen(false)}>Close</button>
          <button onClick={() => alert("Action Performed!")}>Do Action</button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default App;
```

Now, if you run the app with these code changes, you should see the accordion appearing inside the modal. You will also be able to show/hide the accordion content and open/close the modal. This means their individual states are intact as expected.

![Accordion](https://cdn.hashnode.com/res/hashnode/image/upload/v1759410454778/69fdcb6a-77a0-42e1-b060-fa2666543c94.png)

---

## The Use Cases

So far, we have seen a couple of important usages of the Compound Components pattern with modal and accordion. Similarly, you can use this pattern to build reusable components like:

- Tables (Table.Head, Table.Body, Table.Row).
- Any component where layout and nesting matter.

Also, if you’re ever writing your own component library or design system, this pattern is a must. If you need some inspiration, look at ShadCN, Material UI, or Radix UI. They all do this.

---

## The Pitfalls and Anti-Patterns

As you know, with great power comes great responsibility. And with patterns comes the pitfalls and anti-patterns you’ll need to be aware of. When you’re using the compound components pattern, just make sure that you:

- Don’t attach subcomponents randomly. They should belong to the parent semantically.
- Avoid re-exporting subcomponents separately. It will be a disaster if someone uses the ModalFooter without a Modal. What if the ModalFooter changes tomorrow in the context of the Modal, and the other consumers are not in need/aware of that change?
- Don’t attempt to make everything in the compound components pattern. The rule of thumb is, only use it when the children's structure matters, and you want to keep it flexible.

---

## 15 Days of React Design Patterns

I have some great news for you! After the *40 days of the JavaScript* initiative, I have now started a brand new initiative called [<VPIcon icon="fa-brands fa-youtube"/>15 Days of React Design Patterns](https://youtube.com/playlist?list=PLIJrr73KDmRyQVT__uFZvaVfWPdfyMFHC).

If you enjoyed learning from this article, I am sure you will love this series, featuring the 15 most important React design patterns. Check it out and join.

[![15 Days of React Design Patterns](https://cdn.hashnode.com/res/hashnode/image/upload/v1759482303884/694491a4-2fd9-4515-b595-eafc925d2a18.png)](https://youtube.com/playlist?list=PLIJrr73KDmRyQVT__uFZvaVfWPdfyMFHC)

::: info Before We End...

That’s all! I hope you found this article insightful.

Let’s connect:

- Subscribe to my [YouTube Channel (<VPIcon icon="fa-brands fa-youtube"/>`tapasadhikary`)](https://youtube.com/tapasadhikary).
- Subscribe to my fortnightly newsletter, [<VPIcon icon="fas fa-globe"/>The Commit Log](https://tapascript.substack.com/subscribe?utm_medium=fcc).
- Follow on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`tapasadhikary`)](https://linkedin.com/in/tapasadhikary/) if you don't want to miss the daily dose of up-skilling tips.
- Join my [<VPIcon icon="fa-brands fa-discord"/>Discord Server](https://discord.gg/zHHXx4vc2H), and let’s learn together.

See you soon with my next article. Until then, please take care of yourself and keep learning.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use the Compound Components Pattern in React: Prop Soup to Flexible UIs",
  "desc": "Have you ever opened React project source code and wondered why things are so messy? Have you ever tried adding a feature to a React component created by someone else and felt that you needed to rewrite it? Have you felt nightmarish in tackling state...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/compound-components-pattern-in-react.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
