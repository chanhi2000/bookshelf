---
lang: en-US
title: "How to Build an Interactive University Ranking System Using React and Data Viz Tools"
description: "Article(s) > How to Build an Interactive University Ranking System Using React and Data Viz Tools"
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
      content: "Article(s) > How to Build an Interactive University Ranking System Using React and Data Viz Tools"
    - property: og:description
      content: "How to Build an Interactive University Ranking System Using React and Data Viz Tools"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-interactive-ranking-system-using-react-and-data-viz-tools.html
prev: /programming/js-react/articles/README.md
date: 2026-03-26
isOriginal: false
author:
  - name: Daria Filozop
    url: https://freecodecamp.org/news/author/filozopdaria/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/5f31dd6f-e199-4cf3-a76a-daf985a4e7d7.png
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
  name="How to Build an Interactive University Ranking System Using React and Data Viz Tools"
  desc="Hi! I'm Daria, and I'm a software engineering student with a keen interest in data visualization. I've been actively exploring various visualization tools through small pet projects, and I'd like to s"
  url="https://freecodecamp.org/news/build-an-interactive-ranking-system-using-react-and-data-viz-tools"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/5f31dd6f-e199-4cf3-a76a-daf985a4e7d7.png"/>

Hi! I'm Daria, and I'm a software engineering student with a keen interest in data visualization. I've been actively exploring various visualization tools through small pet projects, and I'd like to share my latest demo with you.

In this tutorial, we'll build a project that displays the historical rankings of universities around the world. It's interesting to check out and analyze which institutions consistently maintain their top-tier positions and which ones experience significant movement up or down the rankings over the years.

While building the dashboard, we'll load and structure the dataset, display all important information in a pivot table, and then create charts to visualize the top 10 universities and their ranking trends over time.

Even though we'll walk through this specific example here, you can apply this same approach to many other datasets to build data viz dashboards.

---

## Tech Stack

Let’s talk about the tools we’ll be using so you know what you’ll need to have before following along.

First, we’ll use [<VPIcon icon="fa-brands fa-react"/>React](https://react.dev/), which is a popular JavaScript library for building interactive web interfaces. It helps create reusable components and manage data efficiently. According to [<VPIcon icon="fa-brands fa-stack-overflow"/>the 2025 Stack Overflow Developer Survey](https://survey.stackoverflow.co/2025/technology), React is the second most popular web framework.

We’ll also use [<VPIcon icon="fas fa-globe"/>Flexmonster Pivot Table](https://flexmonster.com/), a web component for displaying data in a table format. In general, pivot tables are widely used for data visualization because they allow you to quickly group, aggregate, filter, and explore large datasets from different perspectives.

With Flexmonster, you can easily create reports and customize your information. It also integrates smoothly with almost all popular modern frameworks (like React, which we’re using here!).

Next, we have [<VPIcon icon="iconfont icon-Apache"/>ECharts](https://echarts.apache.org/en/index.html), which complements the detailed data provided by the pivot table. It’s a powerful, open-source charting library that’ll give us the visual insights we need, offering over 20 chart types to effectively visualize historical university ranking trends.

Finally, we’ll use the [<VPIcon icon="iconfont icon-kaggle"/>World University Rankings Dataset](https://kaggle.com/datasets/mylesoneill/world-university-rankings). It contains data from three global rankings ([<VPIcon icon="fas fa-globe"/>THE](https://timeshighereducation.com/world-university-rankings), [<VPIcon icon="fas fa-globe"/>ARWU](https://shanghairanking.com/), and [<VPIcon icon="fas fa-globe"/>CWUR](https://cwur.org/)), providing information about well-known universities from 2012 to 2015 for detailed analytical research. The dataset size is 186.38 kB.

As a small disclaimer, this tutorial uses React, so some familiarity with it will help you follow along. But actually, you can use any other framework that's convenient for you. Flexmonster Pivot Table offers [<VPIcon icon="fas fa-globe"/>many integrations with popular frameworks](https://flexmonster.com/doc/available-tutorials-integration/), including Angular, Vue, Svelte, and more.

When we’re done with the project, we’ll get an interactive dashboard like this:

![Interactive dashboard for visualizing university ratings](https://lh7-rt.googleusercontent.com/docsz/AD_4nXe49D_OM3dE-Q8bLmhsYyejXE0CF0PZTZeXhm_3vJfCDOO8JmQMCbLk8x_d_FBAWJjcsKFd0Mm3uTntW2zcp6NYGMXUVnyfjpwWI0izXInLvUhcHgtoSPoCt4EFtHpVm5WOzP-khwnxPryrgO1FjEUqWXSEWtI?key=44ff_UPj0hN24gZs8A8Dew)

So now that you’re familiar with the tools, let’s get started!

---

## Flexmonster Pivot Table Setup

To get started, you’ll need to integrate Flexmonster into your React project. I’ll walk you through how it works with React, but you can use other frameworks, too. You can find complete instructions in [<VPIcon icon="fas fa-globe"/>the Flexmonster docs](https://flexmonster.com/doc/available-tutorials-integration/).

First, create a React application using Vite:

```sh
npm create vite@latest flexmonster-project -- --template react
```

Also, don’t forget to install npm dependencies:

```sh
cd flexmonster-project
npm install
```

Next, we’ll install the Flexmonster wrapper for React. To do this, use this command:

```sh
npm i -g flexmonster-cli
flexmonster add react-flexmonster
```

Then add Flexmonster styles and the component to your App.jsx file:

```js
import FlexmonsterReact from "react-flexmonster";
import "flexmonster/flexmonster.css";
```

---

## Loading and Displaying the Data

Now it’s time to create a report object. This is a configuration that defines how the pivot table should load and display data. It describes how the fields should be interpreted, and how the table should organize and aggregate the information.

The first part of this is `dataSource`. It defines where the data comes from and how it should be read by the pivot table (format of the dataset, location of the file, and the structure of the fields that will be used).

In our case, we'll load a CSV file that contains the university rankings dataset and define the fields that will appear in the pivot table:

```js
const report = {
  dataSource: {
    type: "csv",
    filename: "/data/world-university-rankings.csv",
    mapping: {
      world_rank: { type: "number", caption: "World Rank" },
      institution: { type: "string" },
      country: { type: "string" },
      score: { type: "number", caption: "Score" },
      year: { type: "number", caption: "Year" },
    },
  },
  …
}
```

The second part is the slice section. It defines which subset of the dataset will be displayed and how it should be organized. There, you'll render a table by setting measures, rows, and columns. You can also set the `flatOrder` property, where you define the order of the fields in the flat form.

You can find more detailed information about the [<VPIcon icon="fas fa-globe"/>Slice Object here](https://flexmonster.com/api/slice-object/). There are lots of interesting functional possibilities!

```js
const report = {
  …
  slice: {
    rows: [{ uniqueName: "institution" }],
    columns: [{ uniqueName: "[Measures]" }],
    measures: [
      { uniqueName: "world_rank", aggregation: "min" },
      {
        uniqueName: "year",
        aggregation: "none",
        filter: { members: [`year.[${selectedYear}]`] },
      },
    ],
    flatOrder: ["institution", "world_rank"],
  },
  options: {
    grid: { type: "flat", showGrandTotals: "off" },
  },
};
```

You’ll also need to include Flexmonster inside the React component. In this example, we'll include the `FlexmonsterReact` tag in JSX and pass the report object (which we defined earlier) as a property. You can do that with this code snippet:

```js
<FlexmonsterReact
  ref={pivotRef}
  toolbar={true}
  report={report}
  width="100%"
  height="100%"
  reportcomplete={createChart}
/>
```

As a result, we've got pivot table with all the info about the universities:

![Pivot table with university data and rankings](https://cdn.hashnode.com/uploads/covers/690da61ea51d4259bd4a849b/ab96b9fc-c322-482c-b95a-33d17887a94e.png)

---

## Creating Charts

For some users, charts are easier to understand than tables, so let’s also create some now. I decided to display the top 10 universities in the world using bar charts. Bar charts are commonly used to compare values between categories, and they're quite useful for highlighting rankings or top performers.

We'll use ECharts here, but you can easily integrate Flexmonster with [<VPIcon icon="fas fa-globe"/>the most convenient chart library for you](https://flexmonster.com/doc/available-tutorials-charts/).

As a first step, make sure to install ECharts in your project:

```sh
npm i echarts
```

To prepare our data for display in the charts, we’ll create the `prepareData()` function. This function picks out the universities' names and their ranks, removes any invalid data, sorts it by rank, and keeps only the top 10. It returns two arrays: one with the names (for chart labels) and another with the rankings (for chart values):

```js
const prepareData = (rawData) => {
  const rows = rawData.data
    .map((r) => ({ name: r.r0, rank: r.v0 }))
    .filter((r) => r.name && !isNaN(r.rank))
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 10);
  return {
    labels: rows.map((r) => r.name).reverse(),
    values: rows.map((r) => r.rank).reverse(),
  };
};
```

Next, we'll set up chart options. You’ll need to decide in what form your dataset will be displayed: in this example, we'll choose a bar chart. We'll also set the title (here "Top 10 Universities by World Rank"), x-axis (shows the rank numbers) and y-axis (shows universities names), and tooltip, which shows info when you hover over a bar.

Also, don't forget to initialize the chart and apply these options. You can do all this with this code snippet:

```js
const drawChart = (rawData) => {
  const { labels, values } = prepareData(rawData);
  const options = {
    title: {
      text: "Top 10 Universities by World Rank",
      left: "center",
      textStyle: { fontSize: 20, fontWeight: "bold" },
    },
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    xAxis: { type: "value", name: "Rank" },
    yAxis: { type: "category", data: labels },
    series: [{ type: "bar", data: values, barMaxWidth: 30 }],
  };
  chartInstance = echarts.init(chartRef.current);
  chartInstance.setOption(options);
};
```

Also, an important part of chart configuration is the `updateCharts()` function, which redraws the chart when needed:

```js
const updateChart = (rawData) => {
  if (chartInstance) chartInstance.dispose();
  drawChart(rawData);
};
```

So now we can see the charts we've created! This might look a bit basic and really hard to read, but don’t worry – we’ll make it look nicer and easier to understand in a later section.

![Bar charts showing the top 10 universities by world rank](https://cdn.hashnode.com/uploads/covers/690da61ea51d4259bd4a849b/65cf5e06-f0dd-4d45-b1eb-e78797b44d2b.png)

---

## Adding Year Filtering Buttons

You might have noticed that the dataset contains ratings for different years (from 2012 to 2015). It would be great if we could use the whole dataset, not just information for one year.

To manage this, we'll create filtering buttons for each year to provide more straightforward navigation.

First, we’ll add a div element which contains buttons for each year:

```jsx
<div className="years-container">
  {[2012, 2013, 2014, 2015].map((year) => (
    <button
      key={year}
      onClick={() => handleYearChange(year)}
      className={`year-btn ${selectedYear === year ? "active" : ""}`}
    >
      {year}
    </button>
  ))}
</div>
```

In the above code snippet, you can see that each button calls `handleYearChange(year)` when being clicked. Let’s now examine what this handler does:

```js
const handleYearChange = (year) => {
  setSelectedYear(year);

  const pivot = pivotRef.current?.flexmonster;
  if (pivot) {
    const newReport = {
      ...report,
      slice: {
        ...report.slice,
        measures: [
          { uniqueName: "world_rank", aggregation: "min" },
          {
            uniqueName: "year",
            aggregation: "none",
            filter: { members: [`year.[${year}]`] },
          },
        ],
      },
    };
    pivot.setReport(newReport);
  }
}; 
```

This function modifies the pivot table report to filter by that year, and refreshes the table. This way, clicking a button instantly shows only the data for the chosen year.

And now we've got buttons which display years from our dataset:

![Buttons to filter data by year](https://cdn.hashnode.com/uploads/covers/690da61ea51d4259bd4a849b/184608a5-6207-44d8-b5fe-80fd355201c0.png)

---

## Styling

Finally, here’s my favorite part of every project: customization! I love experimenting with different styles and choosing the most appropriate one.

For this dashboard, I chose light violet and white colors to make the interface clean and easy to read. I personally associate the university vibe with these colors, so I think they match our dashboard perfectly. So let's go step by step through it.

The main container defines the overall layout and background. It centers the content on the page, adds some spacing, and sets the base font and colors.

```css
.app-container {
  min-height: 100vh;
  width: 100vw;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: #ebe6f7;
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  color: #1b2a4e;
}
```

Next, we'll style the year filter buttons. They have rounded corners, a soft shadow, and a small hover effect so the interface feels interactive. The active button gets a violet background so it’s easy to see which year is selected.

```css
.year-btn {
  padding: 10px 20px;
  background: #ffffff;
  border: 1px solid #cdd2e0;
  border-radius: 8px;
  cursor: pointer;
}

.year-btn:hover {
  background: #e1dffa;
}

.year-btn.active {
  background: #6c5ce7;
  color: white;
}
```

Also, the pivot table and the chart are located inside simple containers with rounded corners and slight shadows. This visually separates the components and keeps the layout logically structured.

```css
.pivot-container,
.chart-container {
  width: 90%;
  background: #ffffff;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 6px 20px rgba(15, 35, 95, 0.12);
}

.pivot-container {
  height: 56vh;
  margin-bottom: 24px;
}

.chart-container {
  height: 40vh;
}
```

And now, here's the result of our work!

![Universities ranking pivot table with interactive year filters](https://cdn.hashnode.com/uploads/covers/690da61ea51d4259bd4a849b/ed35dbdd-9c5d-4f7e-b6e1-4f0546a0d660.png)

![Charts showing the top 10 universities by world rank](https://cdn.hashnode.com/uploads/covers/690da61ea51d4259bd4a849b/1a0b0f1c-9c26-40e2-8c28-bd45517ea145.png)

---

## Wrapping Up

In this tutorial, we've build an interactive dashboard for visualizing the world's top university rankings over the years. You learned how to load and show data in pivot table in a convenient and compact way, make bar charts to show comparative data, and add buttons to filter info by year.

You can now use these skills to visualize other datasets and play with different charts and customization options.

::: info

If you want to look closer at my code and get detailed styling code, you can check out my GitHub:

<SiteInfo
  name="filozopdasha/universities-dashboard"
  desc="Contribute to filozopdasha/universities-dashboard development by creating an account on GitHub."
  url="https://github.com/filozopdasha/universities-dashboard/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/575045134ef56ae1fbb7ae86ca468719835ff23ed7181746a51ed64f735d2cc0/filozopdasha/universities-dashboard"/>

:::

I would be delighted to hear your thoughts about this small project. I’m curious to see what you build!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an Interactive University Ranking System Using React and Data Viz Tools",
  "desc": "Hi! I'm Daria, and I'm a software engineering student with a keen interest in data visualization. I've been actively exploring various visualization tools through small pet projects, and I'd like to s",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-interactive-ranking-system-using-react-and-data-viz-tools.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
