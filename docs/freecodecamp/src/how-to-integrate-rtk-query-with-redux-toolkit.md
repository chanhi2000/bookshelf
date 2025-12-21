---
lang: en-US
title: "How to Integrate RTK Query with Redux Toolkit: A Step-by-Step Guide for React Developers"
description: "Article(s) > How to Integrate RTK Query with Redux Toolkit: A Step-by-Step Guide for React Developers"
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
      content: "Article(s) > How to Integrate RTK Query with Redux Toolkit: A Step-by-Step Guide for React Developers"
    - property: og:description
      content: "How to Integrate RTK Query with Redux Toolkit: A Step-by-Step Guide for React Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-integrate-rtk-query-with-redux-toolkit.html
prev: /programming/js-react/articles/README.md
date: 2025-02-07
isOriginal: false
author:
  - name: Chidera Humphrey
    url : https://freecodecamp.org/news/author/dera10/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738854615563/3357bd11-3fcd-43b3-b459-b0e8b60e853d.png
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
  name="How to Integrate RTK Query with Redux Toolkit: A Step-by-Step Guide for React Developers"
  desc="Redux is a state management library for JavaScript applications. It lets you create applications that behave in a predictable manner and run on different environments, including server and native environments. Redux Toolkit is the recommended way to ..."
  url="https://freecodecamp.org/news/how-to-integrate-rtk-query-with-redux-toolkit"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738854615563/3357bd11-3fcd-43b3-b459-b0e8b60e853d.png"/>

Redux is a state management library for JavaScript applications. It lets you create applications that behave in a predictable manner and run on different environments, including server and native environments. Redux Toolkit is the recommended way to write Redux logic, and was created to make working with Redux easier.

Traditionally, writing Redux logic required a lot of boilerplate code, configuration, and dependency installations. This made Redux difficult to work with. RTK was created to solve these issues. RTK contains utilities that simplify common Redux tasks such as store configuration, creation of reducers, and immutable state update logic.

Redux Toolkit Query (RTK Query) is an optional add-on included in the Redux ToolKit package. It was created to simplify data fetching and caching in web applications. RTK Query is built on top of Redux Toolkit and employs Redux for its internal architectural design.

In this article, you'll learn how to integrate RTK Query with Redux Toolkit in your React applications by building a simple CRUD Movie app.

::: note Prerequisites

For this article, I assume that you are familiar with React.

:::

---

## Understanding RTK Query and Core Concepts

At the core of RTK Query is the `createApi` function. This function allows you to define an API slice, which includes the server's base URL and a set of endpoints that describe how to fetch and mutate data from the server.

RTK Query automatically generates a custom hook for each of the defined endpoints. These custom hooks can be used in your React component to conditionally render content based on the state of the API request.

The code below shows how to create an API slice using the `createApi` function:

```jsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://server.co/api/v1/" }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => "/data",
    }),
  }),
});

export const { useGetDataQuery } = apiSlice;

```

`fetchBaseQuery` is a lightweight wrapper around the native JavaScript `fetch` function that simplifies API requests. The `reducerPath` property specifies the directory where your API slice is stored. A common convention is to name the directory `api`. The `baseQuery` property uses the `fetchBaseQuery` function to specify the base URL of your server. You can think of it as the root URL in which your endpoints are appended.

`useGetDataQuery` is an auto-generated hook that you can use in your components.

---

## How to Integrate RTK Query with Redux Toolkit

In this section, you will learn how to integrate RTK Query with Redux Toolkit by building a simple Movie app. In this app, users will be able to view movies stored in your backend (though it's a mock backend), add movies, and update and delete any movie. In essence, you will build a CRUD app using RTK Query.

Also, I will be using TypeScript for this tutorial. If you're using JavaScript, skip the type annotations and/or `interface`s and replace `.tsx`/`.ts` with `.jsx`/`.js`.

### Setting up the development environment

Create a new React project using the following command:

```sh
npm create vite@latest
```

Follow the prompts to create your React app.

Install the `react-redux` and `@reduxjs/toolkit` packages using the following command:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn add @reduxjs/toolkit react-redux
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npm install @reduxjs/toolkit react-redux
```

:::

For the backend, you're going to use `json-server`. `json-server` is a light-weight Node.js tool that simulates a RESTful API using JSON files as the data source. It lets frontend developers create mock APIs without writing any server-side code.

You can read more about [<VPIcon icon="iconfont icon-github"/>`typicode/json-server` here](https://github.com/typicode/json-server/tree/v0).

Use the following command to install `json-server`:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn add -g json-server
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npm install -g json-server
```

:::

### Folder structure

In the root directory of your application, create a <VPIcon icon="fas fa-folder-open"/>`data` folder. Inside this folder, create a <VPIcon icon="iconfont icon-json"/>`db.json` file. This will be where your "backend" is stored.

In the <VPIcon icon="fas fa-folder-open"/>`src` directory, create two folders: <VPIcon icon="fas fa-folder-open"/>`component` and <VPIcon icon="fas fa-folder-open"/>`state`.

Inside the `component` folder, create two folders: <VPIcon icon="fas fa-folder-open"/>`CardComponent` and <VPIcon icon="fas fa-folder-open"/>`Modal`, and a file: <VPIcon icon="fa-brands fa-react"/>`Movies.tsx`.

Inside the state folder, create a <VPIcon icon="fas fa-folder-open"/>`movies` folder and a file: `store.ts`.

![After creating the folders and files, your app structure should look like this](https://cdn.hashnode.com/res/hashnode/image/upload/v1734786998116/7708adad-06b1-41bd-ab22-d6efb745246b.png)

### Building the app

First, you're going to set up your **JSON server**.

Open the <VPIcon icon="iconfont icon-json"/>`db.json` file and paste in the following code:

```json :collapsed-lines title="db.json"
{
  "movies": [
    {
      "title": "John Wick",
      "description": "Retired assassin John Wick is pulled back into the criminal underworld when gangsters kill his beloved dog, a gift from his late wife. With his unmatched combat skills and a thirst for vengeance, Wick single-handedly takes on an entire criminal syndicate.",
      "year": 2014,
      "thumbnail": "https://m.media-amazon.com/images/M/MV5BNTBmNWFjMWUtYWI5Ni00NGI2LWFjN2YtNDE2ODM1NTc5NGJlXkEyXkFqcGc@._V1_.jpg",
      "id": "2"
    },
    {
      "id": "3",
      "title": "The Dark Knight",
      "year": 2008,
      "description": "Batman faces off against his archenemy, the Joker, a criminal mastermind who plunges Gotham City into chaos. As the Joker tests Batman’s limits, the hero must confront his own ethical dilemmas to save the city from destruction.",
      "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg"
    },
    {
      "title": "Die Hard",
      "description": "NYPD officer John McClane finds himself in a deadly hostage situation when a group of terrorists takes control of a Los Angeles skyscraper during a Christmas party. Armed only with his wit and a handgun, McClane must outsmart the heavily armed intruders to save his wife and others.",
      "year": 1988,
      "thumbnail": "https://m.media-amazon.com/images/M/MV5BMGNlYmM1NmQtYWExMS00NmRjLTg5ZmEtMmYyYzJkMzljYWMxXkEyXkFqcGc@._V1_.jpg",
      "id": "4"
    },
    {
      "title": "Mission: Impossible - Fallout",
      "description": "Ethan Hunt and his IMF team must track down stolen plutonium while being hunted by assassins and former allies. With incredible stunts and non-stop action sequences, Hunt races against time to prevent a global catastrophe.",
      "year": 2018,
      "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTk3NDY5MTU0NV5BMl5BanBnXkFtZTgwNDI3MDE1NTM@._V1_.jpg",
      "id": "5"
    },
    {
      "title": "Gladiator",
      "description": "Betrayed by the Emperor’s son and left for dead, former Roman General Maximus rises as a gladiator to seek vengeance and restore honor to his family. His journey from slavery to becoming a champion captures the hearts of Rome’s citizens.",
      "year": 2010,
      "thumbnail": "https://m.media-amazon.com/images/M/MV5BZmExODVmMjItNzFlZC00MDA0LWJkYjctMmQ0ZTNkYTcwYTMyXkEyXkFqcGc@._V1_.jpg",
      "id": "6"
    }
  ]
}
```

Start up your JSON server using the following command:

```sh
json-server --watch data\db.json --port 8080
```

This command will start up your JSON server and wrap the API endpoint running on port 8080.

![Your terminal should look like this](https://cdn.hashnode.com/res/hashnode/image/upload/v1734787039082/8331fca3-74ac-45aa-9fac-904af53cc961.png)

Next, you are going to create an API slice. This API slice will be used to configure your Redux store.

Navigate to the <VPIcon icon="fas fa-folder-open"/>`movies` folder and create a <VPIcon icon="iconfont icon-typescript"/>`movieApiSlice.ts` file. Open the <VPIcon icon="iconfont icon-typescript"/>`movieApiSlice.ts` file and paste in the following code:

```ts :collapsed-lines title="movieApiSlice.ts"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApiSlice = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  endpoints: (builder) => {
    return {
      getMovies: builder.query({
        query: () => `/movies`,
      }),

      addMovie: builder.mutation({
        query: (movie) => ({
          url: "/movies",
          method: "POST",
          body: movie,
        }),
      }),

      updateMovie: builder.mutation({
        query: (movie) => {
          const { id, ...body } = movie;
          return {
            url: `movies/${id}`,
            method: "PUT",
            body
          }
        },
      }),

      deleteMovie: builder.mutation({
        query: ({id}) => ({
          url: `/movies/${id}`,
          method: "DELETE",
          body: id,
        }),
      }),
    };
  },
});

export const {
  useGetMoviesQuery,
  useAddMovieMutation,
  useDeleteMovieMutation,
  useUpdateMovieMutation,
} = moviesApiSlice;
```

In the code above, you created a `movieApiSlice` using the `createApi` function from RTK Query, which takes in an object as a parameter.

The `reducerPath` property specifies the path of the API slice.

The `baseQuery` uses the `fetchBaseQuery`. The `fetchBaseQuery` function takes in an object as a parameter, which has a `baseURL` property. The `baseURL` property specifies the root URL of our API.

In this case, you are using `http://localhost:8080`, which is the URL of the JSON server.

The `endpoints` property is what your API interacts with. It’s a function that takes in a `builder` parameter and returns an object with methods (`getMovies`, `addMovie`, `updateMovie`, and `deleteMovie`) for interacting with your API.

Lastly, you are exporting custom hooks generated automatically by RTK Query. The custom hook starts with "use" and ends with "query" and is named based on the methods defined in the `endpoints` property.

These custom hooks let you interact with the API from your functional components.

Next, you are going to set up your Redux store. Navigate to the <VPIcon icon="iconfont icon-typescript"/>`store.ts` file located in the state folder and paste in the following code:

```ts :collapsed-lines title="store.ts"
import { configureStore } from "@reduxjs/toolkit";
import { moviesApiSlice } from "./movies/moviesApiSlice";

export const store = configureStore({
    reducer: {
        [moviesApiSlice.reducerPath]: moviesApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(moviesApiSlice.middleware);
    }
})
```

In the code above, you are setting up a Redux store using the `configureStore` function from Redux Toolkit. The `reducer` property specifies a reducer for updating the state in the Redux store. The `moviesApiSlice.reducer` is the reducer for updating the state of your API.

For the `middleware` property, you are creating a middleware for handling asynchronous state updates. You don't have to worry too much about this part and what it does. This is required for all the caching functionality and all the other benefits that RTK Query provides.

Before we move further, you have to add your Redux store to your application. To do this, navigate to your <VPIcon icon="fa-brands fa-react"/>`main.tsx` or <VPIcon icon="fa-brands fa-react"/>`index.tsx` file (depending on what it is called in your application) and replace the code with the following code:

```tsx :collapsed-lines title="main.tsx"
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

In the code above, you are importing the `Provider` component from `react-redux` and the `store` you created earlier. Also, you are wrapping the `Provider` component around your `App` component. The `store` prop is used to pass your Redux store to your application.

### Building the Movie component

In this section, you're going to build out the <VPIcon icon="fa-brands fa-react"/>`Movies.tsx` component, which is where all of your application logic lives.

Navigate to your <VPIcon icon="fa-brands fa-react"/>`Movies.tsx` file and paste in the following code:

```tsx :collapsed-lines title="Movies.tsx"
import "../movie.css";
import { ChangeEvent, FormEvent, useState } from "react";

import {
  useGetMoviesQuery,
  useAddMovieMutation,
  useDeleteMovieMutation,
} from "../state/movies/moviesApiSlice";
import MovieCard from "./CardComponent/MovieCard";

export interface Movie {
  title: string;
  description: string;
  year: number;
  thumbnail: string;
  id: string;
}


export default function Movies() {
  // Form input states
  const [title, setTitle] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { data: movies = [], isLoading, isError } = useGetMoviesQuery({});

  const [ addMovie ] = useAddMovieMutation();
  const [ deleteMovie ] = useDeleteMovieMutation();

  // Handle form submission to add a new movie
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("New movie submitted:", { title, thumbnail, description, year });
    addMovie({ title, description, year: Number(year), thumbnail, id: String(movies.length + 1) })
    // Reset form inputs after submission
    setTitle("");
    setThumbnail("");
    setDescription("");
    setYear("");
  };

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-container">
      <h2>Movies to Watch</h2>

      {/* Form to add a new movie */}
      <div className="new-movie-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter movie title"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageAddress">Image Link:</label>
            <input
              type="text"
              name="imageAddress"
              id="imageAddress"
              placeholder="Enter image link address"
              value={thumbnail}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setThumbnail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Year of release:</label>
            <input
              type="text"
              name="year"
              id="year"
              placeholder="Enter year of release"
              value={year}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setYear(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter movie description"
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit">Add Movie</button>
        </form>
      </div>

      {/* Render list of movies */}
      <div className="movie-list">
        {movies.length === 0 ? (
          <p>No movies added yet.</p>
        ) : (
          movies.map((movie: Movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} deleteMovie={deleteMovie} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

In the code above, you're creating a `Movies` component and using RTK Query to handle CRUD operations.

Let's go step-by-step through what each part of the code does.

In the top part, you imported the `useGetMoviesQuery`, `useAddMovieMutation`, and `useDeleteMovie` functions from the `moviesApiSlice` you created earlier. The functions will be used for fetching, adding, and deleting movies, respectively.

You also imported a `MovieCard` component, which you'll use to display each movie. You'll create the `MovieCard` component in a second.

The `Movie` interface defines the shape of each movie object. It ensures consistency in the structure of movie data across the component. Again, ignore if you're using JavaScript.

You defined some state variables: `title`, `year`, `thumbnail`, and `description` to store form input values.

The `useGetMoviesQuery` hook fetches the movie data when the component mounts. The hook returns an object with several properties, but we're focusing on three properties: `data` aliased as `movies`, `isLoading`, and `isError`.

The `useAddMovieMutation` and `useDeleteMovieMutation` hooks return two functions: `addMovie` and `deleteMovie`, respectively.

The `handleSubmit` function handles the submission of the form. When the form is submitted, the `addMovie` function is called with the new movie details. The `year` is converted to a number, and the `id` is generated based on the current length of the movie array.

If an error occurs while fetching the movies (`isError`), a simple error message is displayed.

If the API request is still loading (`isLoading`), a loading message is shown.

If everything goes well, the main JSX structure of the component is returned, which includes:

- a form for adding new movies.
- a list of movies rendered using the `MovieCard` component. Each`MovieCard` is passed the individual `movie` data along with the `deleteMovie` function to handle deletions.

Now, let's create our `MovieCard` component.

Inside the <VPIcon icon="fas fa-folder-open"/>`CardComponent` folder, create a <VPIcon icon="fa-brands fa-react"/>`MovieCard.tsx` file. Open the <VPIcon icon="fa-brands fa-react"/>`MovieCard.tsx` and paste in the following code:

```tsx :collapsed-lines title="MovieCare.tsx"
import { useRef, useState } from "react";
import EditModal from "../Modal/EditModal";
import { Movie } from "../Movies";

type DeleteMovie = (movie:{id:string}) => void;

interface MovieCardProps {
  movie: Movie;
  deleteMovie: DeleteMovie;
}

function MovieCard({ movie, deleteMovie }: MovieCardProps) {

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movie);

  const handleSelectedMovie = () => {
    setSelectedMovie(movie);
    dialogRef.current?.showModal();
    document.body.style.overflow = 'hidden';
  }

  const closeDialog = (): void => {
    dialogRef.current?.close();
    document.body.style.overflow = 'visible';
  }

  return (
    <div className="movie-wrapper" key={movie.id}>
      <div className="img-wrapper">
        <img src={movie.thumbnail} alt={`${movie.title} poster`} />
      </div>
      <h3>
        {movie.title} ({movie.year})
      </h3>
      <p>{movie.description}</p>
      <div className="button-wrapper">
        <button onClick={handleSelectedMovie}>Edit</button>
        <button onClick={() => deleteMovie({ id: movie.id })}>Delete</button>
      </div>

      <EditModal dialogRef={dialogRef} selectedMovie={selectedMovie} closeDialog={closeDialog} />

    </div>
  );
}

export default MovieCard;
```

In the code above, you're creating a `MovieCard` component for displaying the movies on the screen.

You're importing the `useRef` and `useState` hooks from React to manage the component’s state and references. You also import the `EditModal` component, which will handle editing the movie details, and the`Movie` type to enforce the shape of the movie object (this is for TypeScript).

The `MovieCard` component accepts two props: `movie` and `deleteMovie`.

The `dialogRef` variable is used to manage the reference to the modal dialog element.

The `selectedMovie` state is initialized with the `movie` prop. This will be used to track the currently selected movie for editing purposes.

The `handleSelectedMovie` function is called when the **Edit** button is clicked. It does the following:

- Sets `selectedMovie` to the current movie object.
- Opens the `EditModal` dialog using `dialogRef.current?.showModal()`.
- Prevents the page from scrolling while the modal is open by setting `document.body.style.overflow` to `'hidden'`.

The `closeDialog` function closes the modal dialog using `dialogRef.current?.close()` and resets the page’s scroll behavior by setting `document.body.style.overflow` back to `'visible'`.

In the `return` statement, a JSX structure is returned that displays:

- an image for the movie's thumbnail,
- the movie's title and year of release in an `h3` element,
- a short description of the movie,
- two buttons:
  - The "Edit" button triggers the `handleSelectedMovie` function to open the `EditModal`.
  - The "Delete" button calls the `deleteMovie` function, passing the movie’s queryID to delete the specified movie from your API.

The `EditModal` component is also rendered, passing `dialogRef`, `closeDialog`, and `selectedMovie` as props. This ensures that the `EditModal` has access to the selected movie's details and a function to close itself.

Next up, you're going to create the `EditModal` component.

Inside the <VPIcon icon="fas fa-folder-open"/>`Modal` folder, create a file: <VPIcon icon="fa-brands fa-react"/>`EditModal.tsx`, that will house the modal component.

Open the <VPIcon icon="fa-brands fa-react"/>`EditModal.tsx` file and paste in the following code:

```tsx :collapsed-lines title="EditModal.tsx"
import { useUpdateMovieMutation } from "../../state/movies/moviesApiSlice";
import { Movie } from "../Movies";
import "./modal.css";
import { useState, RefObject, FormEvent } from "react";

interface EditModalProps {
  dialogRef: RefObject<HTMLDialogElement>;
  selectedMovie: Movie;
  closeDialog: () => void;
}

function EditModal({ dialogRef, selectedMovie, closeDialog }: EditModalProps) {
  const [title, setTitle] = useState<string>(selectedMovie.title);
  const [year, setYear] = useState<string | number>(selectedMovie.year);
  const [description, setDescription] = useState<string>(selectedMovie.description);
  const [thumbnail, setThumbnail] = useState<string>(selectedMovie.thumbnail);

  const [updateMovie] = useUpdateMovieMutation();

  async function handleUpdateMovie(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    try {
      await updateMovie({title, description, year: Number(year), thumbnail, id: selectedMovie.id});
      closeDialog();
    } catch (error) {
      alert(`${error} occurred`);
    }
  }

  return (
    <dialog ref={dialogRef} className="modal-dialog">
      <form onSubmit={handleUpdateMovie}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year of release:</label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="thumbnail">Image URL:</label>
          <input
            type="text"
            id="thumbnail"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Save</button>
      </form>
      <button className="close-btn" onClick={closeDialog}>
        Close
      </button>
    </dialog>
  );
}

export default EditModal;
```

In the code above, you're simply creating a modal dialog using the native HTML `<dialog>` element. Inside the `dialog` element is a `form` field populated with the details of the selected movie, obtained from the state variables: `title`, `year`, `description`, and `thumbnail`.

You imported the `useUpdateMovieMutation` hook from your `moviesApiSlice`. The `useUpdateMovieMutation` hook returns an `updateMovie` function you can use to update movie details.

The `handleUpdateMovie` is called when the **Save** button is clicked. It does the following:

- updates the movie details by calling the `updateMovie` function
- closes the dialog using the `closeDialog` function

### Mounting our component

Navigate to your `App.tsx` file and add in your `Movies` component the following code:

```tsx :collapsed-lines title="App.tsx"
import "./App.css";
import Movies from "./components/Movies";

function App() {
  return (
    <div>
      <Movies />
    </div>
  );
}

export default App;
```

![In your browser, open your `localhost` and you should see something like this](https://cdn.hashnode.com/res/hashnode/image/upload/v1734787096281/f4f87b33-d5ba-4537-acd1-39dfa740410a.gif)

Congratulations! You've successfully integrated RTK Query with the Redux Toolkit.

In the next section, you'll learn how caching in RTK Query works and how to invalidate caches.

---

## How to Handle Data Caching with RTK Query

In this section, you'll learn how caching works in RTK Query and how to invalidate caches.

In programming, caching is one of the hardest things to do. But RTK Query makes handling caching easier for us.

When you call your API, RTK Query automatically caches the result of successfully calling your API. This means that subsequent calls to the API return the cached result.

For example, if you try editing any movie in your app, you'll notice that nothing changes. This doesn't mean that it's not working - in fact, it is working. And the results returned are the cached version (the results when you first called the API, that is on component mount).

To stop this behaviour, you need to invalidate the cache each time you make changes to your backend. This will cause RTK Query to automatically refetch the data to reflect your changes.

Navigate to your `moviesApiSlice.ts` file and replace that code with the following code:

```tsx :collapsed-lines title="moviesApiSlice.ts"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApiSlice = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  tagTypes: ['Movies'],
  endpoints: (builder) => {
    return {
      getMovies: builder.query({
        query: () => `/movies`,
        providesTags: ['Movies']
      }),

      addMovie: builder.mutation({
        query: (movie) => ({
          url: "/movies",
          method: "POST",
          body: movie,
        }),
        invalidatesTags: ['Movies']
      }),

      updateMovie: builder.mutation({
        query: (movie) => {
          const { id, ...body } = movie;
          return {
            url: `movies/${id}`,
            method: "PUT",
            body
          }
        },
        invalidatesTags: ['Movies']
      }),

      deleteMovie: builder.mutation({
        query: ({id}) => ({
          url: `/movies/${id}`,
          method: "DELETE",
          body: id,
        }),
        invalidatesTags: ['Movies']
      }),
    };
  },
});

export const {
  useGetMoviesQuery,
  useAddMovieMutation,
  useDeleteMovieMutation,
  useUpdateMovieMutation,
} = moviesApiSlice;
```

In the code above, you added the `tagTypes` property to your `moviesApiSlice` and set it to`[Movies]`. This will be used to invalidate the cached results when you make changes to your backend.

In the `getMovies` function, you added the `providesTags` property. This means that you're providing a tag to your API call, which you can invalidate with the mutation functions.

In the mutation functions (`addMovie`, `updateMovie`, and `deleteMovie`), you added the `invalidatesTags` property set to the value of the `tagTypes` property. This invalidates the cache whenever each of these mutation functions are called, which causes RTK Query to automatically refetch the data.

![With these changes, you can update and delete movies and see the result of your changes.](https://cdn.hashnode.com/res/hashnode/image/upload/v1734787129856/983cd55d-9714-4c0e-a038-2b7c9f60f881.gif)

---

## Error Handling and Loading States

When you were building your app, you handled any errors that might arise from calling your API by simply displaying a "Error..." text.

In real-world applications, you want to display something meaningful, such as a UI that tells your users what went wrong exactly.

Similarly, when your API request is loading, you want to display a loading spinner or a loading skeleton UI so that your users know that your app data is loading.

For the purposes of this article, we are not going to dive into advanced error handling or managing loading states - but these would be things you’d want to look into.

---

## Best Practices

Below are some of the best practices to consider when working with RTK Query:

1. **Separate multiple API slices**: if you have multiple API slices for different APIs, consider separating them into different API slices. This keeps your API slices modular, making it easier to maintain and debug.
2. **Use the Redux Devtools**: the Redux Devtools let you get an inside look at what is going on in your Redux store as well as your queries and mutations. This makes debugging much easier. The Redux Devtools are available as a Chrome extension.
3. **Prefetch data**: use the `usePrefetch` hook to make a data fetch before a user navigates to a page on your website or loads some known content. This reduces load time and makes the UI feel faster.
4. **Use middleware for complex logic**: implement middleware when you need to intercept and modify actions or responses, such as adding authentication tokens to headers or logging specific errors.
5. **Use optimistic updates**: when using `useMutation` to update or change existing data, you can implement an optimistic update to the UI. This helps to give the impression of immediate changes. If the request fails, you can roll back the update.

---

## Conclusion

In this article, you learned what RTK Query is and how to integrate RTK Query with Redux Toolkit by building a CRUD React Movie app. You also learned about the caching strategies of RTK Query and how to invalidate the caches.

Thanks for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Integrate RTK Query with Redux Toolkit: A Step-by-Step Guide for React Developers",
  "desc": "Redux is a state management library for JavaScript applications. It lets you create applications that behave in a predictable manner and run on different environments, including server and native environments. Redux Toolkit is the recommended way to ...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-integrate-rtk-query-with-redux-toolkit.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
