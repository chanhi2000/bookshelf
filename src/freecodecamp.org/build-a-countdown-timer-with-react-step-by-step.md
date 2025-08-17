---
lang: en-US
title: "How to Build a Countdown Timer with React - A Step-by-Step Guide"
description: "Article(s) > How to Build a Countdown Timer with React - A Step-by-Step Guide"
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
      content: "Article(s) > How to Build a Countdown Timer with React - A Step-by-Step Guide"
    - property: og:description
      content: "How to Build a Countdown Timer with React - A Step-by-Step Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-countdown-timer-with-react-step-by-step.html
prev: /programming/js-react/articles/README.md
date: 2024-10-14
isOriginal: false
author: Franklin Ohaegbulam
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1724788718279/35a8ba3c-db35-49b6-ae41-14bcda547795.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Countdown Timer with React - A Step-by-Step Guide"
  desc="In this tutorial, you will learn how to build a custom countdown timer to track events using React.js. A countdown timer is a simple way to measure the time until an event happens. It counts down that time in reverse - like 5, 4, 3, 2, 1. It helps yo..."
  url="https://freecodecamp.org/news/build-a-countdown-timer-with-react-step-by-step"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1724788718279/35a8ba3c-db35-49b6-ae41-14bcda547795.png"/>

In this tutorial, you will learn how to build a custom countdown timer to track events using React.js.

A countdown timer is a simple way to measure the time until an event happens. It counts down that time in reverse - like 5, 4, 3, 2, 1. It helps you manage the time leading up to upcoming events, product launches, or offers, and allows you to inform users about that timeline.

::: note Prerequisites

You should have decent knowledge of HTML, CSS, and JavaScript to get the most out of this article.

Let's get started.

:::

---

## 1. Set Up Your React App

First, you’ll need to [create a React application](/freecodecamp.org/how-to-build-a-react-app-different-ways.md/#what-is-vite) if you don’t already have one ready to use. In this tutorial, I’m using Vite. Then change into the new project directory by running the following commands in your code editor:

```sh
npm create vite countdown-timer
cd countdown-timer
```

Run this command to start the app on the local server:

```sh
npm run dev
```

Now, you should see the project in your browser on `https://localhost/3000`.

---

## 2. Create the Count Down Component

In the <FontIcon icon="fas fa-folder-open"/>`src` folder of your React app, create a <FontIcon icon="fas fa-folder-open"/>`components` directory, and inside it, create a <FontIcon icon="fa-brands fa-react"/>`CountDown.jsx` file.

```jsx itle="components/CountDown.jsx"
import React from "react";

const CountdownTImer = () => {
  return (
    <div className="countdown-timer-container">
    </div>
  );
};

export default CountdownTimer;
```

---

## 3. Implement Time State Management and Functionality

Define the state variables using the useState hook. Update the <FontIcon icon="fa-brands fa-react"/>`CountDown.jsx` file with the following code:

```jsx title="components/CountDown.jsx"
import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

 return (
    <div className="countdown-timer-container">
    </div>
  );
};

export default CountdownTimer;
```

Here's a brief breakdown of the `useState`:

- `eventName`: stores the name of the event for the countdown timer.
- `eventDate`: stores the date of the event for the countdown timer.
- `countdownStarted`: tracks whether the countdown timer has started.
- `timeRemaining`: stores the remaining time in milliseconds for the countdown.

Now, we’ll implement the functionality of the countdown timer using the useEffect hook:

```jsx title="components/CountDown.jsx"
import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  // ...
  useEffect(() => {
    if (countdownStarted && eventDate) {
      const countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const eventTime = new Date(eventDate).getTime();
        let remainingTime = eventTime - currentTime;

        if (remainingTime <= 0) {
          remainingTime = 0;
          clearInterval(countdownInterval);
          alert("Countdown complete!");
        }

        setTimeRemaining(remainingTime);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [countdownStarted, eventDate, timeRemaining]);

 return (
    <div className="countdown-timer-container">
    </div>
  );
};

export default CountdownTimer;
```

The `useEffect` hook runs whenever `countdownStarted` or `eventDate` changes. It sets up an interval that updates `timeRemaining` every second based on the current time and event time. If the remaining time becomes less than or equal to 0, it stops the interval and triggers the notification "Countdown complete!"

```jsx title="components/CountDown.jsx"
import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  // ...
  useEffect(() => {
    if (countdownStarted) {
      document.title = eventName;
    }
  }, [countdownStarted, eventName]);

 return (
    <div className="countdown-timer-container">
    </div>
  );
};

export default CountdownTimer;
```

Here, the `useEffect` hook runs whenever `countdownStarted` or `eventName` changes. It updates the countdown timer title to display the `eventName` when the countdown timer is started.

---

## 4. Create a Countdown Form

To have control over the countdown timer, you’ll need to create a form with two inputs for the name and date of the event. Then, add the following code:

```jsx title="components/CountDown.jsx"
import React from "react";
  // ...
const handleSetCountdown = () => {
  setCountdownStarted(true);
};

  return (
    <div className="countdown-timer-container">
      <h2 className="countdown-name">
        {countdownStarted ? eventName : "Countdown Timer"}
      </h2>

      {!countdownStarted ? (
        <form className="countdown-form">
          <label htmlFor="title">Event Name</label>
          <input
            name="title"
            type="text"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />

          <label htmlFor="date-picker">Event Date</label>
          <input
            name="date-picker"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            onClick={(e) => (e.target.type = "date")}
          />
          <button onClick={handleSetCountdown}>Start Countdown</button>
        </form>
      }
    </div>
  );
};

export default CountdownTimer;
```

Here's a brief breakdown of the `useState`:

- `eventName`: stores the name of the event for the countdown timer.
- `countdown-name`: displays the "Countdown Timer" by default or updates to the `eventName` entered once the countdown has started.

The form includes:

- The input field with the name `title` and label `Event Name` update the `eventName` state value.
- The input field with the name `date-picker` allow users to select a date and control the `eventDate` state value.
- The button `Start Countdown` triggers the `handleSetCountdown` function when clicked to initiate the countdown.

---

## 5. Handle the Countdown Start, Stop, and Reset Functionality

Next, update the `handleSetCountdown` function to store the event name and date in the local storage using `localStorage.setItem`. localStorage is a web API that enables users to store data as key-value pairs persistently, even when the browser is closed or refreshed.

The code is as follows:

```jsx title="components/CountDown.jsx"
import React from "react";
  // ...
  const handleSetCountdown = () => {
    setCountdownStarted(true);
    localStorage.setItem("eventDate", eventDate);
    localStorage.setItem("eventName", eventName);
  };

  return (
    <div className="countdown-timer-container">
      // ...
    </div>
  );
};

export default CountdownTimer;
```

Now, create the `handleStopCountdown` and `handleResetCountdown` functions to stop the countdown timer by updating the `countdownStarted` state to `false`.

```jsx title="components/CountDown.jsx"
import React from "react";
  // ...
  const handleStopCountdown = () => {
    setCountdownStarted(false);
    setTimeRemaining(0);
  };

  const handleResetCountdown = () => {
    setCountdownStarted(false);
    setEventDate("");
    setEventName("");
    setTimeRemaining(0);
    localStorage.removeItem("eventDate");
    localStorage.removeItem("eventName");
  };

  return (
    <div className="countdown-timer-container">
      // ...
      <div className="control-buttons">
        <button onClick={handleStopCountdown}>Stop</button>
        <button onClick={handleResetCountdown}>Reset</button>
      </div>
    </div>
  );
};

export default CountdownTimer;
```

Here:

- `handleStopCountdown`: resets the `timeRemaining` state to zero.
- `handleResetCountdown`: resets the countdown timer to its initial state. It clears the remaining time states and removes the event date and event name from local storage using `localStorage.removeItem()`.

---

## 6. Format the Event Date and Time

Let's convert date and time data into a readable format.

```jsx title="components/CountDown.jsx"
import React from "react";
  // ...
  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return (
      <div className="countdown-display">
        <div className="countdown-value">
          {days.toString().padStart(2, "0")} <span>days</span>
        </div>
        <div className="countdown-value">
          {hours.toString().padStart(2, "0")} <span> hours</span>
        </div>
        <div className="countdown-value">
          {minutes.toString().padStart(2, "0")} <span>minutes</span>
        </div>
        <div className="countdown-value">
          {seconds.toString().padStart(2, "0")} <span>seconds</span>
        </div>
      </div>
    );
  };

  return (
    <div className="countdown-timer-container">
      // ...
    </div>
  );
};

export default CountdownTimer;
```

Here's a brief breakdown of the functions:

- `formatDate`: formats the date input into a human-readable date string.
- `formatTime`: takes a time in milliseconds as input and calculates the days, hours, minutes, and seconds of the timer. The `.toString().padStart(2, "0")` returns the formatted time as two characters by appending 0 at the beginning of the time only if the length of the number is less than 2.

Here are the complete contents of the <FontIcon icon="fa-brands fa-react"/>`CountDown.jsx` file:

```jsx title="components/CountDown.jsx"
import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (countdownStarted && eventDate) {
      const countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const eventTime = new Date(eventDate).getTime();
        let remainingTime = eventTime - currentTime;

        if (remainingTime <= 0) {
          remainingTime = 0;
          clearInterval(countdownInterval);
          alert("Countdown complete!");
        }

        setTimeRemaining(remainingTime);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [countdownStarted, eventDate, timeRemaining]);

  useEffect(() => {
    if (countdownStarted) {
      document.title = eventName;
    }
  }, [countdownStarted, eventName]);

  const handleSetCountdown = () => {
    setCountdownStarted(true);
    localStorage.setItem("eventDate", eventDate);
    localStorage.setItem("eventName", eventName);
  };

  const handleStopCountdown = () => {
    setCountdownStarted(false);
    setTimeRemaining(0);
  };

  const handleResetCountdown = () => {
    setCountdownStarted(false);
    setEventDate("");
    setEventName("");
    setTimeRemaining(0);
    localStorage.removeItem("eventDate");
    localStorage.removeItem("eventName");
  };

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return (
      <div className="countdown-display">
        <div className="countdown-value">
          {days.toString().padStart(2, "0")} <span>days</span>
        </div>
        <div className="countdown-value">
          {hours.toString().padStart(2, "0")} <span> hours</span>
        </div>
        <div className="countdown-value">
          {minutes.toString().padStart(2, "0")} <span>minutes</span>
        </div>
        <div className="countdown-value">
          {seconds.toString().padStart(2, "0")} <span>seconds</span>
        </div>
      </div>
    );
  };

  return (
    <div className="countdown-timer-container">
      <h2 className="countdown-name">
        {countdownStarted ? eventName : "Countdown Timer"}
      </h2>
      <p className="countdown-date">
        {countdownStarted && formatDate(eventDate)}
      </p>

      {!countdownStarted ? (
        <form className="countdown-form">
          <label htmlFor="title">Event Name</label>
          <input
            name="title"
            type="text"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />

          <label htmlFor="date-picker">Event Date</label>
          <input
            name="date-picker"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            onClick={(e) => (e.target.type = "date")}
          />
          <button onClick={handleSetCountdown}>Start Countdown</button>
        </form>
      ) : (
        <>
          {formatTime(timeRemaining)}
          <div className="control-buttons">
            <button onClick={handleStopCountdown}>Stop</button>
            <button onClick={handleResetCountdown}>Reset</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CountdownTimer;
```

---

## 7. Display the CountDown Timer

Import `CountDownTimer` in the <FontIcon icon="fa-brands fa-react"/>`App.jsx`, replacing the default code with this:

```jsx title="App.jsx"
import React from "react";
import CountdownTimer from "./components/CountDown";

function App() {
  return (
    <div className="App">
      <CountdownTimer />
    </div>
  );
}

export default App;
```

And that's it! Your countdown timer app should be rendered on `localhost:3000` in the browser.

---

## 8. Styling the Countdown Timer Component

Lastly, update the <FontIcon icon="fa-brands fa-css3-alt"/>`index.css` file in the same directory of your project by adding the following styles:

```css :collapsed-lines title="index.css"
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Open+Sans:wght@400;500;700&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: url("./img/bg-img.jpg") top center;
  background-size: cover;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
}

.countdown-form {
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  width: 300px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  background-color: #d1f1ee;
  border: 1px solid #dfdfdf;
  outline: none;
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
}

button {
  background-color: #038a7f;
  border: none;
  color: #fff;
  cursor: pointer;
  outline: none;
  margin-top: 15px;
  text-transform: uppercase;
  width: 100%;
  height: 40px;
}

button:hover {
  background-color: #005a53;
}

.countdown-message {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.countdown-name {
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 14px;
  text-align: center;
}

.countdown-date {
  color: #eafbfa;
  margin: -22px 0 10px;
  text-align: center;
}

.countdown-display {
  display: flex;
  justify-content: space-around;
}

.countdown-value:not(span) {
  background-color: #2f5d6f;
  border-radius: 50%;
  color: #03d5c0;
  font-size: 46px;
  padding: 20px;
  margin: 0 5px;
  padding: 10px;
  text-align: center;
  width: 140px;
  height: 140px;
}

.countdown-value > span {
  display: block;
  color: #fff;
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: -25px;
}

.control-buttons {
  margin-top: 50px;
  text-align: center;
}

.control-buttons > button {
  background-color: #03b4a2;
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 0.7rem;
  margin: 0 10px;
  width: 50px;
  height: 50px;
}

.control-buttons button:hover {
  background-color: #0b7c71;
}


@media only screen and (max-width: 600px) {
  .countdown-form {
    width: 90%;
    max-width: 300px;
  }

  input {
    width: 100%;
  }

  .countdown-name {
    margin-left: -20px;
  }

  .countdown-value:not(span) {
    font-size: 1.1rem;
    width: 80px;
    height: 80px;
  }

  .countdown-value > span {
    font-size: 0.7rem;
    margin-top: -15px;
  }
}
```

Congratulations, you’ve finished building your Countdown timer app!

---

## Conclusion

In this article, you've learned how to build a basic React countdown timer app and how to work with the browser's local storage.

The code implemented in this article is accessible in this [GitHub repository (<FontIcon icon="iconfont icon-github"/>`frankiefab100/countdown-timer`)](https://github.com/frankiefab100/countdown-timer). To learn more about web development and technology, check out my [<FontIcon icon="fas fa-globe"/>blog](https://frankiefab.hashnode.dev/) or connect with me on [X (<FontIcon icon="fa-brands fa-x-twitter"/>`frankiefab100`)](https://twitter.com/frankiefab100) and [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`frankiefab100`)](https://linkedin.com/in/frankiefab100/).

Thank you for reading.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Countdown Timer with React - A Step-by-Step Guide",
  "desc": "In this tutorial, you will learn how to build a custom countdown timer to track events using React.js. A countdown timer is a simple way to measure the time until an event happens. It counts down that time in reverse - like 5, 4, 3, 2, 1. It helps yo...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-countdown-timer-with-react-step-by-step.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
