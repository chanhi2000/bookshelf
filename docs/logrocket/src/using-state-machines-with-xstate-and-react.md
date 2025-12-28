---
lang: en-US
title: "Using state machines with XState and React"
description: "Article(s) > Using state machines with XState and React"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Using state machines with XState and React"
    - property: og:description
      content: "Using state machines with XState and React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/using-state-machines-with-xstate-and-react.html
prev: /programming/js-react/articles/README.md
date: 2021-05-04
isOriginal: false
author:
  - name: Ishan Manandhar
    url : https://blog.logrocket.com/author/ishan-manandhar/
cover: /assets/image/blog.logrocket.com/using-state-machines-with-xstate-and-react/banner.png
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
  name="Using state machines with XState and React"
  desc="Using XState and React to build state machines is one of the easiest and most efficient ways to handle state in any JavaScript application."
  url="https://blog.logrocket.com/using-state-machines-with-xstate-and-react"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/using-state-machines-with-xstate-and-react/banner.png"/>

When our application grows bigger, we need a way to maintain the complexity in dealing with the state of the application. State is the data that is manipulated and reflected by our running application. There are many ways to handle the state of the application in React. Some of the most popular state management libraries are [<VPIcon icon="iconfont icon-redux"/>Redux](https://redux.js.org/), [<VPIcon icon="fa-brands fa-react"/>Context API](https://reactjs.org/docs/context.html), [<VPIcon icon="fas fa-globe"/>React Query](https://react-query.tanstack.com/), Recoil, and [<VPIcon icon="iconfont icon-xstate"/>XState](https://xstate.js.org/docs/).

![XState Logo](/assets/image/blog.logrocket.com/using-state-machines-with-xstate-and-react/banner.png)

In this article, we’ll use XState, as it’s one of the easiest and most efficient ways to handle state in any JavaScript application, rather than being framework agnostic. When using XState, we can easily leverage state machines for managing and designing global or component state.

---

## What is a finite state machine?

[<VPIcon icon="fas fa-globe"/>Finite state machines](https://brilliant.org/wiki/finite-state-machines/) are a mathematical model of computation, initially developed in the early 1940s, that have been used for decades to build both hardware and software for a wide variety of technologies. It helps us reduce the number of possible states and control the transition of moving the state, which results in a predictable and reliable application to work with.

The other benefit of working with a state machine is that they also have a visualizer to view the state in a diagram, called [<VPIcon icon="iconfont icon-xstate"/>XState Visualizer](https://xstate.js.org/viz/), both before and/or after we have built it.

---

## Prerequisites

- Familiarity with JavaScript and a basic understanding of ES6 syntax.
- Node.js installed on your machine
- [<VPIcon icon="fa-brands fa-npm"/>NPM installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

In this tutorial, we will build a simple bookstore and implement all the necessary state needed to build that store. This store will involve all the CRUD (create, read, update, delete) functionality required to build general applications.

For the API endpoint, we will leverage the features provided by Airtable and use it to serve data for our application and style our app with [<VPIcon icon="iconfont icon-tailwindcss"/>Tailwind CSS](https://tailwindcss.com/).

### Adding books state machine

Inside of our XState Visualizer, we’ll first write a simple state machine to create a new book for our book store:

```js :collapsed-lines
export const addbookMachine = {
  id: "addBooks",
  initial: "addNew",
  states: {
    addNew: {},
    adding: {
      invoke: {
        id: "addingBook",
        src: addingBook,
        onDone: {
          target: "success",
          actions: assign({ fields: (_context, event) => event.data }),
        },
        onError: {
          target: "failed",
          actions: assign({ error: (_context, event) => event.data }),
        },
      },
    },
    success: {},
    failed: {},
  },
};
```

Visualizing this simple state machine, we can see when we are able to fill up the `add a book` form, which transitions its state from `addNew` to `adding`, and, based on that specific promise, we change to success and error. This is a simple state machine that can transition its state based on the success and failure when a function calls.

![XState Visualizer](/assets/image/blog.logrocket.com/using-state-machines-with-xstate-and-react/xstate-visualizer.png)

XState Visualizer generated from [<VPIcon icon="iconfont icon-xstate"/>XState Visualizer](https://xstate.js.org/viz/).

We will also create a function to determine whether our call was a success or failure. We already named it `addingBook` inside `invoke` in our state machine before.

```js
const addingBook = (context, event) =>
  new Promise(async (resolve, reject) => {
    let result = await addTheBooks(context, event);
    if (result.status === 200) {
      resolve(result);
    } else {
      reject("books");
    }
  });
```

This promise resolves or rejects the function call that we provided to await for its value. If the response is `200`, we will go to `onDone`; else, we will transition to `OnError` state.

Let’s also connect to our Airtable API to make this call. We will create a new folder and call it **API**, where we will place all the API calls needed for our application. Inside, there we will make a new file and call it **addBook**.

```js
const addTheBooks = async (_context, event) => {
  const { Name, Author, Published, Currency, Category } = event;
  const formater = {
    records: [
      {
        fields: { Name, Author, Published, Currency, Category },
      },
    ],
  };
  const res = await fetch(process.env.REACT_APP_BASE_URL + "Books", {
    method: "POST",
    headers: new Headers({
      Authorization: process.env.REACT_APP_API_KEY,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(formater),
  });
  return res;
};

export default addTheBooks;
```

Here, we called an API endpoint from our Airtable to `POST` the books we added. We have also added a formatter constant to structure the data format that the API takes. The form fields will be sent as a JSON payload to the formatter constant, which takes the fields values as a key value pair.

Lastly, to add books in our bookstore, we have created a component to add the book. This communicates with the state machine to flow in the specified states of the application.

```jsx :collapsed-lines title="Addbook.jsx"
import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MachineContext } from '../state/index';
 
// eslint-disable-next-line
function AddBook({}) {
  const book = useRef();
  const authorName = useRef();
  const date = useRef();
  const price = useRef();
  const category = useRef();
  const [machine, sendToMachine] = useContext(MachineContext);

  const addAbook = async () => {
    const Name = book.current.value;
    const Author = authorName.current.value;
    const Published = date.current.value;
    const Currency = parseFloat(price.current.value);
    const Category = category.current.value;
    sendToMachine("ADD_BOOK", { Name, Author, Published, Currency, Category });
    book.current.value = "";
    authorName.current.value = "";
    date.current.value = "";
    price.current.value = "";
    category.current.value = "";
  };

  return (
    <div>
      <div className="flex items-left justify-left">
        <div className="max-w-md w-full">
          <div>
            <div>
              <Link
                to="/"
                className="text-indigo-500 inline-flex items-center font-bold"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  ></path>
                </svg>
                Go back
              </Link>
            </div>
            <h4 className="text-left text-2xl font-bold text-gray-500">
              Fill details to add new book.
            </h4>
          </div>
          <form className="mt-10 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm">
              <div className="mb-3">
                <label htmlFor="book-name" className="sr-only">
                  Book Name
                </label>
                <input
                  id="book-name"
                  name="book"
                  type="text"
                  autoComplete="bookname"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="book name"
                  ref={book}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="author-name" className="sr-only">
                  Author Name
                </label>
                <input
                  id="author-name"
                  name="author"
                  type="text"
                  autoComplete="authorname"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="author name"
                  ref={authorName}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="published-date" className="sr-only">
                  Published date
                </label>
                <input
                  id="published-date"
                  name="date"
                  type="date"
                  autoComplete="published date"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="published date"
                  ref={date}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="currency" className="sr-only">
                  Price
                </label>
                <input
                  id="currency"
                  name="currency"
                  type="text"
                  autoComplete="currencyname"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="price of book"
                  ref={price}
                />
              </div>

              <div className="relative">
                <select
                  className="rounded border appearance-none border-gray-300 py-2 w-full placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10 sm:text-sm"
                  ref={category}
                >
                  <option default value="select one">
                    select one
                  </option>
                  <option>Psychology</option>
                  <option>Related</option>
                  <option>Others</option>
                  <option>Research</option>
                  <option>Testing</option>
                  <option>Usability</option>
                </select>
                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div>

            <div className="inline-flex rounded-md shadow">
              <input
                type="button"
                value="Add My Book"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={addAbook}
              ></input>
            </div>

            {machine.matches("addbookMachine.adding") && (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-loader"
                >
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
              </span>
            )}
          </form>
        </div>
      </div>
      {machine.matches("addbookMachine.success") && (
        <div className="bg-green-200 px-2 py-2 text-green-800 mt-2 inline-flex">
          Your book has been added!
        </div>
      )}
      {machine.matches("addbookMachine.failed") && (
        <div className="bg-red-200 px-2 py-2 text-red-800 mt-2 inline-flex">
          Sorry we cannot add new book!
        </div>
      )}
    </div>
  );
}

export default AddBook;
```

We do obviously need our app to wrap with an XState provider. For this, you can still check the code repository shared below.

### Updating a book state machine

In order to update our book details, we need to create two API calls: the first one to get the details of a single book and the second to submit a PATCH request to edit that particular book.

Let’s start by creating a <VPIcon icon="fa-brands fa-js"/>`fetchOneBookMachine.js` file and write our machine code there:

```js :collapsed-lines title="fetchOneBookMachine.js"
export const fetchOneBookMachine = {
  id: "fetchonebook",
  initial: "start",
  states: {
    start: {},
    fetching: {
      invoke: {
        id: "getOneBook",
        src: getOneBook,
        onDone: {
          target: "success",
          actions: assign({ list: (_context, event) => event.data }),
        },
        onError: {
          target: "failed",
          actions: assign({ error: (_context, event) => event.data }),
        },
      },
    },
    editing: {
      invoke: {
        id: "editOneBook",
        src: editOneBook,
        onDone: {
          target: "success",
          actions: assign({ list: (_context, event) => event.data }),
        },
        onError: {
          target: "failed",
          actions: assign({ error: (_context, event) => event.data }),
        },
      },
    },
    success: {},
    failed: {},
  },
};
```

This is what I really love about state machines. In a single glance of these nested object structures, we can understand what’s going on.

We simply have added five states now, initially at the start state. When we invoke the function `FETCH_A_BOOK`, it transitions itself to fetching inside of `fetchOneBookMachine`.

In this similar way, we can also add PUT API requests once we enter the editing state. All of the state weather moves to success or failed state. We also need to create a promise to determine the function is `onDone` or `onError` state.

```js
const getOneBook = (context, event) =>
  new Promise(async (resolve, reject) => {
    let result = await fetchSingleBook(context, event);
    if (result.status === 200) {
      resolve(result);
    } else {
      reject("book");
    }
  });

const editOneBook = (context, event) => {
  new Promise(async (resolve, reject) => {
    let result = await editTheBook(context, event);
    if (result.status === 200) {
      resolve(result);
    } else {
      reject("book");
    }
  });
};
```

Let’s also write our API calls for editing our books as well. Here, we also need two functions: one to grab values of a single book and second, add the values in a non-destructive way into our database.

```js title="fetchSingleBook.js"
const fetchSingleBook = async (props) => {
  const { id } = props;
  const res = await fetch(process.env.REACT_APP_BASE_URL + "Books/" + id, {
    method: "GET",
    headers: new Headers({
      Authorization: process.env.REACT_APP_API_KEY,
      "Content-Type": "application/json",
    }),
  }).then((x) => x.json());
  return res;
};
 
export default fetchSingleBook;
```

Finally, we will create our `editbook` component. Inside of it, we’ll use the `useEffect` hook to get a single book. That book is the same ID we clicked and visited on our route, which we will filter down from our state (updated when we get all the list of books).

```js :collapsed-lines title="Editbook.jsx"
import React, { useContext, useEffect, useState } from 'react';
import { MachineContext } from '../state/index';
import { useHistory } from "react-router-dom";
 
import { Link } from 'react-router-dom';
 
function Editbook(route) {
  const [machine, sendToMachine] = useContext(MachineContext);
  const id = route.match.params.id;
  const [selectedBook, setSeletedBook] = useState({
    id: "",
    fields: {
      Category: "",
      Name: "",
      Published: "",
      Currency: "",
      Author: "",
    },
    createdTime: "",
  });
  let history = useHistory();

  useEffect(() => {
    sendToMachine("FETCH_A_BOOK", { id });
    const { books, error } = machine.context;
    const list = books.records;
    const filterObj = list.filter((list) => list.id === id);
    setSeletedBook(filterObj[0]);
  }, []);

  const handleOnChange = (userKey, value) => {
    setSeletedBook({ ...selectedBook, fields: { [userKey]: value } });
  };

  const editAbook = async () => {
    sendToMachine("EDIT_A_BOOK", selectedBook);
    history.push("/");
  };

  return (
    <div>
      <div className="flex items-left justify-left">
        <div className="max-w-md w-full">
          <div>
            <div>
              <Link
                to="/"
                className="text-indigo-500 inline-flex items-center font-bold"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  ></path>
                </svg>
                Go back
              </Link>
            </div>
            <h4 className="text-left text-2xl font-bold text-gray-500">
              Fill details to edit book details.
            </h4>
          </div>
        </div>
      </div>
      <section>
        {machine.matches("fetchOneBookMachine.fetching") && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-loader animate-spin text-2xl"
            >
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
          </>
        )}
        <div>
          <form className="mt-10 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm">
              <div className="mb-3">
                <label htmlFor="book-name" className="sr-only">
                  Book Name
                </label>
                <input
                  id="book-name"
                  name="book"
                  type="text"
                  autoComplete="bookname"
                  value={selectedBook.fields.Name}
                  onChange={(e) => handleOnChange("Name", e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="author-name" className="sr-only">
                  Author Name
                </label>
                <input
                  id="author-name"
                  name="author"
                  type="text"
                  autoComplete="authorname"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="author name"
                  value={selectedBook.fields.Author}
                  onChange={(e) => handleOnChange("Author", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="published-date" className="sr-only">
                  Published date
                </label>
                <input
                  id="published-date"
                  name="date"
                  type="date"
                  autoComplete="published date"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="published date"
                  value={selectedBook.fields.Published}
                  onChange={(e) => handleOnChange("Published", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="currency" className="sr-only">
                  Price
                </label>
                <input
                  id="currency"
                  name="currency"
                  type="text"
                  autoComplete="currencyname"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="price of book"
                  value={selectedBook.fields.Currency}
                  onChange={(e) => handleOnChange("Currency", e.target.value)}
                />
              </div>

              <div className="relative">
                <select
                  onChange={(e) => handleOnChange("Category", e.target.value)}
                  className="rounded border appearance-none border-gray-300 py-2 w-full placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10 sm:text-sm"
                >
                  <option default value={selectedBook.fields.Category}>
                    {selectedBook.fields.Category}
                  </option>
                  <option>Psychology</option>
                  <option>Related</option>
                  <option>Others</option>
                  <option>Research</option>
                  <option>Testing</option>
                  <option>Usability</option>
                </select>
                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div>

            <div className="inline-flex rounded-md shadow">
              <input
                type="button"
                value="Edit My Book"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={editAbook}
              ></input>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Editbook;
```

### Deleting a book state machine

Let’s start with the machine for deleting our book. This will resemble a lot of other state machines we have created before. For deleting a book, we need a list of books fetched, so we will create two files.

The first one is for fetching all of the books, and the other is for deleting a book. We will add some states for our machine to achieve this.

```js
export const removebookMachine = {
 id: 'removebook',
 initial: 'start',
 states: {
   start: {},
   deleting: {
     invoke: {
       id: 'deletingBooks',
       src: deletingBooks,
       onDone: {
         target: 'success',
         actions: assign({ fields: (_context, event) => event.data }),
       },
       onError: {
         target: 'failed',
         actions: assign({ error: (_context, event) => event.data }),
       },
     },
   },
   success: {},
   failed: {},
 },
};
```

This snippet is for removing book machines. We will also add machine code for fetching all machines.

```js
export const appMachine = Machine({
 id: 'app',
 initial: 'init',
 context: {
   books: [],
   error: undefined,
   fields: '',
 },
 states: {
   init: {},
   addbookMachine,
   removebookMachine,
   fetchOneBookMachine,
   list: {
     states: {
       loading: {
         invoke: {
           id: 'fetchAllBooks',
           src: fetchAllBooks,
           onDone: {
             target: 'success',
             actions: assign({ books: (_context, event) => event.data }),
           },
           onError: {
             target: 'failed',
             actions: assign({ error: (_context, event) => event.data }),
           },
         },
       },
       success: {},
       failed: {},
     },
   },
 },
 on: {
   LOAD_BOOKS: {
     target: 'list.loading',
   },
   DELETE_BOOK: {
     target: 'removebookMachine.deleting',
     actions: assign((_ctx, evt) => ({
       id: evt.id,
     })),
   }
 },
});
```

As you may have noticed, we also imported other machine code with its named exports as well. This helps us in separating the state machine from one another.

Now, let’s move on to the `Booklist` component where we can call our machine to invoke an action for us. Delete `book` and `load books` for the respective actions.

```jsx :collapsed-lines title="Booklist.jsx"
import React, { useContext, useEffect } from 'react';
import { MachineContext } from '../state/index';
 
import { Deleteicon } from './Deleteicon';
import { Link } from 'react-router-dom';
 
function Booklist() {
  const [machine, sendToMachine] = useContext(MachineContext);
  const { books, error } = machine.context;
  const list = books.records;

  useEffect(() => {
    sendToMachine("LOAD_BOOKS");
    // eslint-disable-next-line
  }, []);

  const removeBook = (id) => {
    sendToMachine("DELETE_BOOK", { id });
  };

  return (
    <>
      {machine.matches("list.loading") && (
        <span className="w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-loader animate-spin text-2xl"
          >
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
        </span>
      )}
      <section>
        {list && list.length > 0 && (
          <div>
            {list.map((b) => (
              <div key={b.id}>
                {b.fields.Name}
                {b.fields.Published}
                {b.fields.Author}
                {b.fields.Currency}
                {b.fields.Category}
                <Deleteicon clickDelete={() => removeBook(b.id)} />
                <Link to={`/editbook/${b.id}`}>
                  <span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
      <div>
        {machine.matches("list.failed") && (
          <span>Data cannot be loaded {error.toString()}</span>
        )}
      </div>
      <div>
        {machine.matches("removebookMachine.deleting") && (
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-loader animate-spin text-2xl"
            >
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
          </span>
        )}
      </div>
      {machine.matches("removebookMachine.success") && (
        <div className="bg-green-200 px-2 py-2 text-green-800 mt-2 inline-flex">
          Your book has been removed!
        </div>
      )}
      {machine.matches("removebookMachine.failed") && (
        <div className="bg-green-200 px-2 py-2 text-green-800 mt-2 inline-flex">
          Your book has not been removed!
        </div>
      )}
    </>
  );
}

export default Booklist;
```

With this approach, we can create a simple fully working CRUD bookstore application. In it, we can store, edit, and delete the information regarding our books inside of Airtable.

Making use of XState, we can determine the finite number of states of the application and have better control overall.

---

## Conclusion

As developers, we need external libraries to maintain the state of application. Using just the internal state of React using `useState` won’t be a solution, [**as this brings an event-based approach to code and there are many flaws we will face using it**](/blog.logrocket.com/state-driven-interfaces-with-xstate.md).

After all, we are making the state machine responsible for the transitions in order to make your application’s performance more robust. This ensures you only ever have one state at a time, that it’s one of your predefined states, and that it’s only possible to transition from a certain state to another if we explicitly enable that. So, we call this finite state machine.

You can find the source code of the article in the github repository [here (<VPIcon icon="iconfont icon-github"/>`ishan-me/xstate_airtable_crudApp`)](https://github.com/ishan-me/xstate_airtable_crudApp/tree/main). Happy coding!

<SiteInfo
  name="isNan909/xstate_airtable_crudApp"
  desc="A demo application using Xstate with Airtable inside of React Application"
  url="https://github.com/isNan909/xstate_airtable_crudApp/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/41a3fb17fb50ea5ed71572463f294cea3bd738a1c4f2c6b4c4b395673133e991/isNan909/xstate_airtable_crudApp"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using state machines with XState and React",
  "desc": "Using XState and React to build state machines is one of the easiest and most efficient ways to handle state in any JavaScript application.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/using-state-machines-with-xstate-and-react.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
