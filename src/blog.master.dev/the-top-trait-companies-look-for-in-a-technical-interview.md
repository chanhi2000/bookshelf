---
lang: en-US
title: "The Top Trait Companies Look For in a Technical Interview"
description: "Article(s) > The Top Trait Companies Look For in a Technical Interview"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - CSS
  - Career
  - Tip
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - css
  - career
  - tip
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Top Trait Companies Look For in a Technical Interview"
    - property: og:description
      content: "The Top Trait Companies Look For in a Technical Interview"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/the-top-trait-companies-look-for-in-a-technical-interview.html
prev: /programming/js-react/articles/README.md
date: 2026-03-26
isOriginal: false
author:
  - name: Abhishek Jakhar
    url: https://blog.master.dev/author/abhishekjakhar/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/8990
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

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Career > Article(s)",
  "desc": "Article(s)",
  "link": "/projects/career/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```


[[toc]]

---

<SiteInfo
  name="The Top Trait Companies Look For in a Technical Interview"
  desc="A look at an example task an interviewer might give you and all the details of how you could approach and and what they are watching for."
  url="https://blog.master.dev/the-top-trait-companies-look-for-in-a-technical-interview/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/8990"/>

Hi 👋 — I am Abishek Jakhar. I work as a Senior Software Engineer at Coinbase, and I also run my product called [<VPIcon icon="fas fa-globe"/>FrontPrep](https://frontprep.com/), which helps candidates prepare for frontend engineer interviews. I have interviewed many candidates in my professional career at Coinbase and Expedia. I am also a top-rated mentor on MentorCruise, where I help engineers get new jobs, prepare for interviews, conduct mock interviews, and develop new frontend skills.

When it comes to front-end interviews, companies often ask you to do various things, typically broken into rounds. Those rounds might be things like this:

1. **User Interface** – Companies ask you to build a user interface based on an image.
2. **JavaScript Coding** – You are asked to create a JavaScript function like debounce, a custom promise, etc., or a custom mini library like a virtualization list, an analytics library, etc.
3. **System Design** – You are asked to tell how you would go about creating an application from scratch. For example, you could be asked to design a JIRA board in which you outline your approach to which library/framework you will use, styling, performance, accessibility, component architecture, how the backend API response will map to your components, etc.
4. **MCQ** – Multiple-choice questions are asked in technical phone screen rounds.
5. **AI Proficiency** – Companies are now asking how you use AI in your day-to-day work to increase productivity.

Let’s focus on that first one: a user interface front-end interview question asked at Atlassian called Bar Chart. I will help you understand the prompt, requirements, and solution. Then we will go over how interviewers judge your solution and the common mistakes that candidates make.

Before diving into the actual question, I would like to discuss the most important thing that candidates overlook in a front-end technical interview.

Imagine you are in a technical front-end interview, and you have been asked to build a user interface. You just start coding the solution without discussing your approach with the interviewer. You’ve already missed a very important process. Ideally, you should have taken the first 5-10 minutes to discuss your approach and thought process with the interviewer, started coding, and, while coding, conveyed all the important code-level decisions you were considering.

It is very important because, in our day-to-day work, we engineers discuss architecture, explain code, and understand our colleagues’ code, so it is essential to be able to explain your code. Also, interviewers are always looking for candidates who can explain their code well.

You do not need to explain every line; however, you do need to explain important decisions that you are taking while writing the code. Some very common examples could be:

- Now, I will be creating a `useEffect` with an empty dependency array because I only want to run the effect on mount.
- I will move this logic into a custom hook to make the code cleaner and more reusable. 
- I will use `box-sizing: border-box` before I start styling my component to ensure the width I set is the box’s actual width.

Every time the interview starts, I recommend that candidates be more vocal and explain the important decisions they are making while writing code, but in most cases, I see silence during the interview. There are very few candidates who can explain what they are thinking and writing.

There are multiple advantages of being more vocal

1. It shows you are communicative and open to feedback. Companies are always looking for collaborating engineers rather than a lone wolf.
2. If you explain your plan before you start writing code (e.g, “I’m planning to use two states instead of a single React state…”), the interviewer has a chance to guide you or nudge you if you are thinking in the right or wrong direction because interviewers want you to succeed.
3. A narrative approach sets you apart from entry-level candidates. It shows you care about requirements, edge cases, and you do things with a plan.
4. It is psychological that you can often catch your own bug mid-sentence. For example (“So I will loop through…. wait, that would be an infinite loop….”)

These days it is becoming very common to cheat with the use of AI, however even if candidates use AI to build the user interface they won’t be able to explain it unless their concepts are good, if their concepts are good why would they use AI to cheat. So, explaining the code becomes a differentiating factor here as well and gives the interviewer much more confidence. Whenever I conduct an interview, I ask a couple of questions about the concepts used to create the UI. For example, I would ask such questions during an interview; obviously, the questions would vary by interviewee, but these are some general ones that usually come up in UI/React interviews.

- Why have you used an empty dependency array in `useEffect`?
- What is the benefit of wrapping the function in `useCallback`?
- Why have you used `box-sizing: border-box`?
- Is there a reason not to separate your code into multiple React components?

Answering all these questions gives the interviewer confidence. However, if you explain your code yourself, leaving no chance for the interviewer to ask questions, then you are a “Strong Yes” candidate.

Overall, being vocal during an interview and explaining your thought process will give you an edge over other candidates, which, in turn, will increase your negotiating power regarding designation and salary.

Now, I will walk you through an actual interview challenge asked at Atlassian. We will go through the prompt together, then start solving it step by step. During this process, I will show you what an ideal solution looks like, where candidates go wrong, and how interviewers judge your solution and decide if you are “Strong No”, “No”, “Yes”, or “Strong Yes”. Getting “Strong Yes” gives you more negotiation power.

---

## Prompt

**Your task is to create a Bar Chart component using React.**

This component will efficiently display a vertical bar chart using a structured array of data provided in the starter code. Each element in this array will map into a distinct bar in the chart. What makes this bar stand out is its use of color; each bar will be uniquely colored based on a predefined color in our data.

You can use the `api.js` file in the server folder to retrieve the data from our mock API for rendering your bar chart. The data also includes color and height information.

Your styling should look close to the image provided below.

::: tip Example

![A bar chart displaying six vertical bars in various colors, representing different values.](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/03/image.png?resize=1024%2C576&ssl=1)

:::

---

## Starter Code

In the interview setup, we are given starter code with some data, as shown below; we will build on it. When it comes to where you will code, you are usually given a link to platforms like HackerRank, Codility, or Karat, or you are asked to code locally in your own IDE and share your screen with the interviewer.

### The <VPIcon icon="fa-brands fa-react"/>`App.jsx` File

```jsx title="App.jsx"
// Requirements

// Create a React component that displays a vertical bar chart
// Each bar's height should correspond to the 'ticketCount' value from the data
// Apply color to each bar using the 'color' attribute from the data
// Style the bar chart to be visually appealing, ensuring it closely resembles the example.

import React from 'react';

import './style.css';

export default function App() {
 // your code here
 return <div />;
}
```

### The `server/`<VPIcon icon="fa-brands fa-js"/>`api.js` File

```js title="server/api.js"
const chartData = [
  {
    id: 'dep-1',
    name: 'Legal',
    ticketCount: 32,
    color: '#f1d05b',
  }, {
    id: 'dep-2',
    name: 'Sales',
    ticketCount: 20,
    color: '#58a958',
  }, {
    id: 'dep-3',
    name: 'Engineering',
    ticketCount: 60,
    color: '#63a6ee',
  }, {
    id: 'dep-4',
    name: 'Manufacturing',
    ticketCount: 5,
    color: '#4fc08d',
  }, {
    id: 'dep-5',
    name: 'Maintenance',
    ticketCount: 14,
    color: '#d67575',
  }, {
    id: 'dep-6',
    name: 'Human Resourcing',
    ticketCount: 35,
    color: '#9abf7a',
  }, {
    id: 'dep-7',
    name: 'Events',
    ticketCount: 43,
    color: '#73cbda',
  },
];

export const getData = () =>
  new Promise((resolve) =>
    setTimeout(resolve, 500, chartData)
  );
```

---

## Solution

Before we start coding, it is very important to thoroughly read the prompt and understand the requirements. If anything is not clear, discuss it with the interviewer. It is very common for candidates to jump straight into coding under pressure and nervousness, only to later realize they have coded something unexpected. In the interview setting, time is so limited that going back is very difficult, which makes us feel even more nervous.

Now, let’s start solving.

In the starter code, we see a mock API that provides the data to render bar charts. We can fetch the data by calling the `getData` function, the `getData` returns a promise that resolves to `chartData` after `500ms`.

Companies usually don’t create APIs for interview purposes; instead, they provide a function that acts as a mock API. Some candidates who are new to coding sometimes get confused because they know that data needs to be fetched from the API, and there is no URL available

We will start by creating a state called `chartData` in <VPIcon icon="fa-brands fa-react"/>`App.jsx`, which will hold our fetched data. We will initially return null in our App because we have not built our UI yet, and we will replace it later.

### The <VPIcon icon="fa-brands fa-react"/>`App.jsxx` File (Step 1)

```jsx title="App.jsx"
import React from 'react';
import './style.css';

export default function App() {
 const [chartData, setChartData] = React.useState([]);

 return null;
}
```

Now, we will fetch the data inside `useEffect` using our mock API. We will import the `getData` function and call it inside our `useEffect`, `getData` will return a promise, so we will use the method to get the result once the promise is fulfilled. We will pass an empty array as the second argument to `useEffect` to ensure our effect runs only once on the first page load. Now that we have data, we will use the `setChartData` updater function to update the `chartData` state with fetched data.

### The <VPIcon icon="fa-brands fa-react"/>`App.jsxx` File (Step 2)

```jsx title="App.jsx"
import React from 'react';
import './style.css';

import { getData } from './server/api';

export default function App() {
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    getData()
      .then((data) => {
        setChartData(data);
      })
      .catch(() => {
      // handle errors
      });
  }, []);

  return null;
}
```

Now, our `chartData` state has the data that we fetched from `getData` mock API, we will now create a component called `BarChart` and pass this `chartData` state to the `BarChart` component as prop. The `BarChart` component will be responsible for rendering the chart using this data.

But, before we create our `BarChart` component and render our chart, I would like to discuss a common mistake that candidates usually make.

::: warning

1. Many candidates get confused about imports. Our `getData` function is named export, so to import it, we need to use curly brackets. Candidates, import it as `import getData from './server/api'` without curly brackets(as default import), and then they see errors on screen, so it is always good to check if it is the default export or a named export.
2. A lot of candidates do not initialize state with empty array, they keep it like `React.useState()`, which again throws error when you try to map over this state later on, so if you know that your state will hold an array of objects and you are supposed to loop over it to generate a piece of UI, it is always good to initialize it with empty array before only.

:::

#### Interview Tip

I highly recommend candidates to use `console.log` during interviews, when we fetch the data we should always use `console.log()` to check if everything looks good and we are storing the data in state correctly. A lot of the time what happens is the data does not get set as expected in the state, later on it causes issues and the candidate does not understand what went wrong, so it is better to keep checking if everything is working fine step by step during interviews, don’t try to write all the code and test everything at once, it will become tough and time consuming to identify where you made mistake.

Now, we will create a new folder called components, where we will create a component file called <VPIcon icon="fa-brands fa-js"/>`BarChart.js`. This component will accept props called items and render the chart using those items. We will also update our <VPIcon icon="fa-brands fa-react"/>`App.jsx` to import and render the `BarChart` component, passing `chartData` as the items prop.

### The <VPIcon icon="fas fa-folder-open"/>`components/`<VPIcon icon="fa-brands fa-js"/>`BarChart.js` File

```jsx title="components/BarChart.jsx"
import React from 'react';

function Bar({ ...delegated }) {
  return <div className="bar" {...delegated} />;
}

export default function BarChart({ items }) {
  return (
    <div className="chart">
      {items.map((item) => (
        <Bar
          key={item.id
          style={{
            backgroundColor: item.color
          }}
          title={item.name}
        />
      ))}
    </div>
  );
}
```

### The `App.jsx` File (Step 3)

```jsx title="App.jsx"
import React from 'react';
import './style.css';

import { getData } from './server/api';

import BarChart from './components/BarChart';

export default function App() {
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    getData()
      .then((data) => {
        setChartData(data);
      })
      .catch(() => {
      // handle errors
      });
  }, []);

  return (
    <main className="wrapper">
      <BarChart items={chartData} />
    </main>
  );
}
```

Our `BarChart` component is reusable; it accepts items as props and renders a bar chart. Let’s see how it works at this moment.

1. We will create a container `div` and give it the class name of the chart, this will be responsible for holding all our bars.
2. Now, inside this container `div` we will render each individual bar using the `map` method. Giving the `key` prop is very important here (some candidates will forget that).

```jsx
{items.map((item) => (
  <Bar key={item.id} />
))}
```

3. Each individual bar is a `div`, however, I have separated it into a separate component called `Bar`.
4. Some might argue making it a component is overkill, but we need to think in terms of reusability and maintainability. Going forward, a couple of features could be added to single bar as well, so I have created it as a separate component. If it grows in features, I will move it to its own separate file.
5. We will give style using inline styling. The `backgroundColor` of each bar will be the colors of each item in our array of objects. The reason we are using inline styles is that, otherwise, we would have to create classes for each color in our CSS, and we do not know what the colors might be because the data is coming from the backend.

```jsx
{items.map((item) => (
  <Bar
    key={item.id} />
    style={{
      backgroundColor: item.color
    }}
))}
```

6. Now, to improve accessibility, you could pass a `title` attribute to the `div`. When you pass `item.name` as title. If you hover over each bar, it will show the name of that bar.

I would like to discuss two common mistakes that candidates make when it comes to component architecture:

1. They do not create a separate component like `BarChart`, they write all the logic in <VPIcon icon="fa-brands fa-react"/>`App.jsx`. There are two reasons why they do so:
    - They feel that if they create a separate component like `BarChart`, it will take a lot more time to finish the solution, so they end up writing all logic in <VPIcon icon="fa-brands fa-react"/>`App.jsx` in hope that they will separate it out later on once functionality is working end to end. But usually they never get to that. I always recommend breaking it down as early as you can, as you might not get time later.
    - They don’t think in terms of reusability and separation of concerns. They end up writing everything in a single file; they just don’t feel responsibility/sense of responsibility or a need to break it down.
2. Some candidates do create a separate component like `BarChart, but they end up making the` API call inside `BarChart`, which makes our `BarChart` less reusable and coupled with API fetching logic, which is incorrect. To keep the `BarChart` as a reusable component, the only responsibility of `BarChart` needs to take items as props and render the chart. The `BarChart` should not be concerned with where the items are coming from; that should be the responsibility of the parent component, which, in our case, is <VPIcon icon="fa-brands fa-react"/>`App.jsx`. If `BarChart` accepts data in a different format than what is being returned from API; it is the responsibility of the parent component of `BarChart` to transform that data according to the expectations of `BarChart` and pass it as props.

#### Calculating the height of each individual bar

```jsx
import React from 'react';

const getBarHeight = (height, maxHeight) => `${(height / maxHeight) * 100}%`;

function Bar({ ...delegated }) {
  return <div className="bar" {...delegated} />;
}

export default function BarChart({ items }) {
  const maxHeight = Math.max(...items.map((item) => item.ticketCount));

  return (
    <div className="chart">
      {items.map((item) => (
        <Bar
          key={item.id}
          style={{
            background: item.color,
            height: getBarHeight(item.ticketCount, maxHeight),
          }}
          title={item.name}
        />
      ))}
    </div>
  );
}`
```

Let’s talk about the calculation of the height of bars. We need to calculate the height of each bar relative to the height of the bar that has the maximum height; otherwise, the bar might flow out of the container. We can use `Math.max` to achieve this, here is the logic.

```jsx
const maxHeight = Math.max(...items.map((item) => item.ticketCount));
```

Now, that we have a maximum height, we calculate a percentage for each bar: using the following formula.

$$
\frac{\text{current ticket count}}{\text{maximum ticket count}}\times{100}
$$


If our max is 60, that bar will be 100% high. A bar with a 30 ticket count becomes half of that, which is 50% height. This mathematical calculator ensures that irrespective of what value we get in items prop, our bar always fits perfectly and does not overflow.  
  
We have created a utility function called `getBarHeight` to do this calculation for us. If any JavaScript logic is not dependent on state and you feel it could be reused later on, we should always create a utility function for it and move it to the `utils` folder. In our case, I have kept it within the `BarChart` component since we are not using it elsewhere. These are the little things that separate a junior engineer from a senior engineer and a “Yes” from a “Strong Yes” during an interview.

#### Styling the Bar Chart

Now, let’s talk about styling our bar chart with a <VPIcon icon="fa-brands fa-css3-alt"/>`style.css` file. We need to make sure our styling looks good; it should look close to the example.

```css :collapsed-lines title="style.css"
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  width: 100%;
}

.wrapper {
  padding: 40px 12px;
  display: flex;
  justify-content: center;
}

.chart {
  height: 400px;
  width: 500px;
  background: transparent;
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  gap: 12px;
}

.bar {
  flex: 1;
  border-radius: 4px 4px 0 0;
}
```

1. The first thing I do in almost all the user interface interview challenges is to use `box-sizing: border-box;` it makes width and height calculations easier by including padding and border in the elements total size.
2. I have added a wrapper class that centers the whole bar chart in our application using `display: flex` and `justify-content: center`. We have also added some `padding` to give it some space to breathe.
3. To make the bars sit side by side and grow from the bottom to top, we are using CSS flexbox. We set our chart container (the `div` with `className` of chart) as flex container using `display: flex;`. To fix the bar to the bottom, we use `align-items: flex-end;` on this flex container, this makes sure all bars are anchored to the bottom. The bars grow upwards because we apply `height` using inline styles, there is a calculation which we do to calculate the relative heights of bars which we have already discussed above. We use `gap: 12px` to add spacing between bars so they don’t stick to each other.
4. One very important thing here is that our `.chart` container has a fixed `height: 400px`. This is important because our bars use percentage heights. If the parent container does not have a fixed height, percentage heights on children will not work, and our bars will not appear at all. This is a very common mistake candidates make, and it can be difficult to debug.
5.  We give `flex: 1` to each individual bar, ensuring that each bar gets an equal share of the available horizontal space.

Our Bar Chart is ready and working; we have successfully built its core. Now, if time is left, I would highly recommend that you handle loading and error state while fetching data; it is simple and does not take much time. It also shows seniority to the interviewer. This is how I would update my <VPIcon icon="fa-brands fa-react"/>`App.jsx` to add status.

### The <VPIcon icon="fa-brands fa-react"/>`App.jsx` File (Step 4)

```jsx :collapsed-lines title="App.jsx"
import React from 'react';

import './style.css';

import { getData } from './server/api';

import BarChart from './components/BarChart';

export default function App() {
 const [chartData, setChartData] = React.useState([]);
 // idle | loading | success | error
 const [status, setStatus] = React.useState('idle');

 React.useEffect(() => {
   setStatus('loading');
   getData()
     .then((data) => {
       setChartData(data);
       setStatus('success');
     })
     .catch(() => {
       setStatus('error');
     });
 }, []);

 return (
   <main className="wrapper">
     {status === 'loading' && <p>Loading...</p>}
     {status === 'error' && <p>Something went wrong!</p>}
     {status === 'success' && <BarChart items={chartData} />}
   </main>
 );
}
```

### Communicate While You Code

Throughout the interview, it is very important for the candidate to express their thought process and the key decisions they make when writing code. Lots of candidates silently code the solution and don’t talk much. It is very important for candidates to understand that coding is one part of their job as a software developer; explaining and reasoning about code is another. The interviewer loves candidates who can talk through their solutions. So, please don’t be silent, but don’t overexpress too; talk about the important decisions, for example

1. I am thinking of maintaining the state here because of so-and-so reasons
2. This is how I am thinking of fetching the data; these are the pros and cons
3. I would like to create a separate component for `BarChart` for so-and-so reasons.

It gives the interviewer more confidence that you have solid concepts and can reason and communicate well.

I have seen a lot of candidates generate solutions from Cursor, Claude etc, but when asked how it is working, they are not able to tell much, in such cases candidate is usually rejected.

---

## Interviewer Criteria

These are the criteria the interviewer will use to judge your solution.

### HTML/CSS

- [ ]  Does my layout closely match the provided image?
- [ ]  Are my CSS class names both self-explanatory and meaningful? That means if someone reads the `className` will it tell what it might be doing?
- [ ]  How quickly was I able to style the UI? Because, in the interview setup, the UI is not very complex, they use CSS properties which are expected to be known to frontend engineers, like flexbox, margin, padding, width, etc.
- [ ]  Did we use the name data from the `chartData` to improve accessibility? Did we do other accessibility improvements?

### JavaScript

- [ ]  Was I able to fetch data from the mock API without much issues or guidance?
- [ ]  Have I used ES6 features like let, const, arrow functions, destructuring etc?
- [ ]  Are my variable, function and components names self explanatory?
- [ ]  Was I able to handle the edge case where we need to calculate heights of the bar relative to the bar with maximum height and was I able to easily create the JavaScript logic?

### React

- [ ]  Have I used the `key` prop when I map over items in the `BarChart` component?
- [ ]  Have I considered loading and error states when fetching the data?
- [ ]  Do I know how to use react hooks like `useState`, `useEffect`?
- [ ]  Did I create separate components like `<BarChart />` and `<Bar />`?
- [ ]  Did I create separate files for separate components or put everything in a single file?

---

## Getting More Signals

The interview is 60 minutes, with 5 minutes for the introduction and the last 5 minutes reserved for any questions the candidate has for the interviewer about the company. So, on average, a candidate gets 50 minutes to complete the challenge.

A lot of candidates are pretty quick, and they write solid code, so they end up finishing the above challenge within 30 minutes. Now, the interviewer has 20 more minutes, so in most cases, they extend the challenge to get more signals.

The way a bar chart can be extended is to sort the bars in ascending or descending order. Which brings us down to the second prompt, which is:

> We would like to add a select menu above the bar chart to be able to sort the bars in ascending, descending or default order. The styling of the dropdown does not matter we are only concerned about the functionality here.

We will keep the Bar Chart II for some other day.

I hope you learned how to solve Bar Chart I interview questions and got insights into how your solution will be judged. Happy Interviewing! 

If you wish to explore more questions like these, I have them all at [<VPIcon icon="fas fa-globe"/>FrontPrep](http://frontprep.com), the platform is a one-stop platform for front-end interview preparation. It helps frontend engineers at any level, from junior to staff, prepare for front-end interviews. It has over 300 questions from top tech companies such as Amazon, Google, Meta, Microsoft, Apple, Netflix, and Uber. You get prompts, hints without spoilers, a solution with best practices, and, most importantly, the interviewer criteria (the actual rubric interviewers use to evaluate you). We have a browser playground for you to run and preview your output, company-tagged questions, and curated practice lists.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Top Trait Companies Look For in a Technical Interview",
  "desc": "A look at an example task an interviewer might give you and all the details of how you could approach and and what they are watching for.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/the-top-trait-companies-look-for-in-a-technical-interview.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
