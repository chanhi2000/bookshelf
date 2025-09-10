---
lang: en-US
title: "How to Build Dependent Dropdowns in React"
description: "Article(s) > How to Build Dependent Dropdowns in React"
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
      content: "Article(s) > How to Build Dependent Dropdowns in React"
    - property: og:description
      content: "How to Build Dependent Dropdowns in React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-dependent-dropdowns-in-react.html
prev: /programming/js-react/articles/README.md
date: 2025-01-30
isOriginal: false
author:
  - name: Timothy Olanrewaju
    url : https://freecodecamp.org/news/author/SmoothTech/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738246583123/caa07859-2ce8-44b1-9fd2-44b414babe52.png
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
  name="How to Build Dependent Dropdowns in React"
  desc="In many web applications, we often encounter forms where selecting an option in one dropdown unlocks a new set of options in another. These interconnected dropdowns, commonly known as dependent or cascading dropdowns, play a crucial role in creating ..."
  url="https://freecodecamp.org/news/how-to-build-dependent-dropdowns-in-react"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738246583123/caa07859-2ce8-44b1-9fd2-44b414babe52.png"/>

In many web applications, we often encounter forms where selecting an option in one dropdown unlocks a new set of options in another. These interconnected dropdowns, commonly known as dependent or cascading dropdowns, play a crucial role in creating a seamless and intuitive form-filling experience.

Whether it's selecting a country to reveal corresponding states or choosing a product category to display specific items, these dropdowns simplify complex choices for everyone. For developers, implementing dependent dropdowns is a practical challenge that combines logic, usability, and dynamic data handling.

In this tutorial, you’ll learn how to implement this type of dropdown in your React application.

---

## What is a Dependent Dropdown?

A dependent dropdown is a UI element in which the available options in one dropdown are determined by the selection made in another dropdown. For example, consider a scenario where you have two dropdowns:

1. Country Dropdown: The user selects a country.
2. City Dropdown: Based on the selected country, the list of available cities in the second dropdown will be filtered accordingly.

This kind of interaction is crucial for forms that require complex, context-sensitive data inputs.

---

## How Does a Dependent Dropdown Work?

Dependent dropdowns work by having the second dropdown’s options dynamically updated based on the value selected in the first dropdown. This dynamic change is typically achieved by:

1. **Listening to user input:** When the user selects an option in the first dropdown, an event (usually onChange) triggers a function to update the state.
2. **Fetching new data:** This updated state can be used to either filter the existing data or make an API call to fetch the new list of options.
3. **Rendering new data:** The second dropdown is then updated with the new options, providing the user with relevant choices.

---

## Steps to Create Dependent Dropdowns in React

### Step 1: Set up Your React Project

If you’re new to React and wish to follow along, [<VPIcon icon="fas fa-globe"/>check out the Vite docs](https://vite.dev/guide/) and follow the steps to create your React project. When you’re done, come back here and let’s continue building.

If you already have a React project you want to use, that’s great too.

### Step 2: Structure the Component

For simplicity, let’s assume we are building a two-level dependent dropdown where the first dropdown lets you choose a country, and the second dropdown displays cities based on the selected country.

Also, in the country dropdown, we’ll have another option for entering a country name that is not included in the countries options. The user can then proceed to enter their country in a text input.

First, create a new file named <VPIcon icon="fa-brands fa-js"/>`DependentDropdown.js` or <VPIcon icon="fa-brands fa-react"/>`DependentDropdown.jsx`. Inside this file, define a functional component called `DependentDropdown`.

Now we’ll be going through the following steps to build our dependent dropdown:

#### Declare Variables for Storing Data

We need to create static data for the values of our countries and cities:

```js
  // Static country data
  const countries = [
    { id: 1, name: 'USA' },
    { id: 2, name: 'Canada' },
    { id: 3, name: 'Other' },
  ];

  // Static city data corresponding to countries
  const cities = {
    USA: ['New York', 'Los Angeles', 'Chicago'],
    Canada: ['Toronto', 'Vancouver', 'Montreal'],
  };
```

- `countries` is an array of objects. Each object having properties of `id` and `name`.
- `cities` is an object with country names as keys and the values as array of cities.

#### Declare State Variables

For each selection of either country or cities, we want to be able to keep track of the values selected. We also want to be able to populate the cities option after a country selection has been made. To do that, we need to declare some states.

If the concept of state is new to you, you can read my article on state [**here**](/freecodecamp.org/react-state-management.md).

```js
const [selectedCountry, setSelectedCountry] = useState('');
const [availableCities, setAvailableCities] = useState([]);
const [selectedCity, setSelectedCity] = useState('');
const [otherCountry, setOtherCountry] = useState('');
```

- The `selectedCountry` state is declared and its initial value is set to an empty string.
- The `availableCities` state is declared and its initial value is set to an empty array.
- The `selectedCity` state is declared and its initial value is set to an empty string.
- The `otherCountry` state is declared and its initial value is set to an empty string.

#### Handling Events

In the process of making a selection in the dropdown, we want some actions to be performed. Event handlers enable us to do that in the case of an event, which in this case is the `onChange` event.

```js
const handleCountryChange = (e) => {
  const country = e.target.value;
  setSelectedCountry(country);
  setAvailableCities(cities[country] || []);
  setSelectedCity(''); 
   if (country !== 'Other') {
    setOtherCountry('');
  }
};
```

Here’s what’s going on in the `handleCountryChange` function:

- Grabs the value of the selected option in the dropdown (the country that was selected).
- The `setSelectedCountry` updates the state variable (selectedCountry) with the newly selected country.
- `cities[country]` looks up the list of cities for the selected country from the `cities` object.
  - If `cities[country]` is found, it sets that list of cities as the available cities.
  - If no cities are found for the selected country (`cities[country]` is undefined), the `|| []` ensures that an empty array (`[]`) is used as a fallback, preventing errors when trying to display the cities.
- When the user changes the country selection, the `setSelectedCity` function resets the `selectedCity` to an empty string.
- If the country selected is not ‘Other’, the `otherCountry` state is reset to an empty string. This ensures that if the user had previously typed something into the "Other" input, that text is cleared once they select a different country (for example, "USA" or "Canada").

For the ‘Other’ country selection, we just need to keep track of the value entered into the input. The `setOtherCountry` function updates the value entered. And this is how it is done:

```js
const handleOtherCountryChange = (e) => {
  setOtherCountry(e.target.value);
};
```

For the cities change, we don’t need to do much because the selected country determines which cities are displayed. All we need to do is to update the `selectedCity` to the value of the selected option in the dropdown, which is the city that is selected.

In React, the updater function does the updating of state variables, so the `setSelectedCity` handles this in this case.

The `handleCityChange` function will be:

```js
const handleCityChange = (e) => {
  setSelectedCity(e.target.value);
};
```

#### Returning JSX

The `DependentDropdown` component renders three main elements: the Country dropdown, the City dropdown, and the Country text input.

A dropdown in HTML is a combination of the `<select>` and `<option>` elements. To keep track of the value of elements, we’ll attach state variables to them so we can control them. Doing this is called 'Controlling Elements', while the elements themselves are referred to as 'Controlled Elements' in React.

To control the country `<select>` element, we’ll give it a `value` attribute of `selectedCountry` and also attach the `handleCountryChange` function to it.

```jsx
<label htmlFor="country" className='font-bold'>Select Country: </label>
<select id="country" value={selectedCountry} onChange={handleCountryChange}>
  <option value="">Select a country</option>
  {countries.map((country) => (
    <option key={country.id} value={country.name}>
      {country.name}
    </option>
  ))}
</select>
```

Also,

- Inside the `<option>`, we map over the `countries` array and dynamically create an `<option>` for each country object in the array.
- Each country’s `name` is displayed as the option’s text.
- Each option’s `key` is set to the country’s `id` and `value` is set to the country’s `name`.
- The `key` helps React manage the list efficiently when re-rendering.

The Cities dropdown is conditionally rendered based on the selected country. If the 'Other' country option is chosen, a text input field is displayed for the user to specify the country. Otherwise, if a valid country is selected, a Cities dropdown with relevant options is shown.

```jsx :collapsed-lines
{selectedCountry === 'Other' ? (
  <>
    <label htmlFor="other-country" className='font-bold'>Please specify the country: </label>
    <input
      id="other-country"
      type="text"
      value={otherCountry}
      onChange={handleOtherCountryChange}
      placeholder="Enter country name"
    />
  </>
  ) : (
    selectedCountry && (
      <>
        <label htmlFor="city" className='font-bold'>Select City: </label>
        <select id="city" value={selectedCity} onChange={handleCityChange}>
          <option value="">Select a city</option>
          {availableCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </>
    )
  )
}
```

Additionally:

- We check if `selectedCountry` is the ‘Other’ option and display a text input.
- The text input has a `otherCountry` state and the `handleOtherCountryChange` handler function attached to it.
- We control the city `<select>` element using the `value` attribute, setting it to the state variable of `selectedCity`. The event handler, `handleCityChange`, is also attached to handle `onChange` events.
- We map over the `availableCities` array and dynamically create an `<option>` for each city in the array.
- Each option’s `key` is set to an `index` and `value` is set to the `city`.
- Each city is displayed as the option’s text.

That’s all we have to do to have a functional dependent dropdown using our static data.

Here is all the code put together:

```js :collapsed-lines title="DependentDropdown.jsx"
import React, { useState } from 'react';

const DependentDropdown = () => {
  // Static country data
  const countries = [
    { id: 1, name: 'USA' },
    { id: 2, name: 'Canada' },
    { id: 3, name: 'Other' },
  ];

  // Static city data corresponding to countries
  const cities = {
    USA: ['New York', 'Los Angeles', 'Chicago'],
    Canada: ['Toronto', 'Vancouver', 'Montreal'],
  };

  // State to hold the selected country, city, and other country text
  const [selectedCountry, setSelectedCountry] = useState('');
  const [availableCities, setAvailableCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [otherCountry, setOtherCountry] = useState(''); 

  // Handle country change
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setAvailableCities(cities[country] || []);
    setSelectedCity(''); 
    if (country !== 'Other') {
      setOtherCountry('');
    }
  };

  // Handle city change
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  // Handle other country input change
  const handleOtherCountryChange = (e) => {
    setOtherCountry(e.target.value);
  };

  return (
    <div className='text-center text-3xl'>
      <h1 className='font-extrabold text-5xl p-10'>Dependent Dropdown Example</h1>

      {/* Country Dropdown */}
      <label htmlFor="country" className='font-bold'>Select Country: </label>
      <select id="country" value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.id} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>

      {/* City or Other Country Input */}
      {selectedCountry === 'Other' ? (
        <>
          <label htmlFor="other-country" className='font-bold'>Please specify the country: </label>
          <input
            id="other-country"
            type="text"
            value={otherCountry}
            onChange={handleOtherCountryChange}
            placeholder="Enter country name"
          />
        </>
      ) : (
        selectedCountry && (
          <>
            <label htmlFor="city" className='font-bold'>Select City: </label>
            <select id="city" value={selectedCity} onChange={handleCityChange}>
              <option value="">Select a city</option>
              {availableCities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </>
        )
      )}
    </div>
  );
};

export default DependentDropdown;
```

### Step 3: Use the Component

To get your final results, you need to import the `DependentDropdown` component into your <VPIcon icon="fa-brands fa-js"/>`App.js` or <VPIcon icon="fa-brands fa-react"/>`App.jsx` and place it inside the return section of the App component.

```js title="App.jsx"
import DependentDropdown from './DependentDropdown'

function App() {

  return (
    <DependentDropdown/>
  )
}

export default App
```

Don’t forget to run the application by entering either of these commands:

```sh
npm start   # for create react app
npm run dev # for react vite app
```

![Finally, this is what should render on your browser](https://cdn.hashnode.com/res/hashnode/image/upload/v1737899898480/38ff328c-09bd-4f74-b458-423ff1216e48.gif)

---

## Handling Dynamic Data (API Requests)

In real-world applications, the lists for the dropdowns might not be static. Instead, they might be fetched from an API or a JSON file acting as an API.

In this example, we’ll be reading data from a JSON file to populate our dependent dropdown. This practice has some benefits which are:

- **Reduced database load:** By using a static JSON file (or a pre-loaded file), you're reducing the number of database queries that would otherwise be needed to populate dropdowns. This is especially useful if the dropdown options are fairly static and don’t change often.
- **Faster UI rendering:** Since the data is already on the client side, there’s no need for a round-trip request to the server every time the user interacts with the dropdown. This can make the interface feel more responsive.

Our JSON file contains states and LGAs (Local Government Areas), which are the equivalents of Countries and Cities.

The data in the JSON file is represented as an array of objects, with each object having keys for **state**, **alias**, and **lgas**. The 'lgas' key contains an array.

Here’s how it’s represented:

```json :collapsed-lines
[
  {
    "state": "Adamawa",
    "alias": "adamawa",
    "lgas": [
      "Demsa",
      "Fufure",
      "Toungo",
      "Yola North",
      "Yola South"
    ]
  },
  {
    "state": "Akwa Ibom",
    "alias": "akwa_ibom",
    "lgas": [
      "Abak",
      "Uruan",
      "Urue-Offong/Oruko",
      "Uyo"
    ]
  },
  // the rest of the objects
]
```

This method of creating a dynamic dependent dropdown from an API isn’t too different from the previous example, except for some minor modifications.

Here ‘s how we fetched and used data from a JSON file:

```js :collapsed-lines title="DependentDropdown.jsx"
import React, { useEffect, useState } from "react";

function DependentDropdown() {
//declaring global state variables
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

//fetching data using the useEffect hook
  useEffect(() => {
    fetch("nigeria-state-and-lgas.json") //JSON file set as URL
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  return loading ? <div>Loading...</div> : <Form data={data} />;

}
//form recieving data as props
function Form({ data }) {

//declaring local state variables
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const [showList, setShowList] = useState(false);
  let sortedData = data.slice().sort((a, b) => a.state.localeCompare(b.state));
  const selectedData = sortedData.find((item) => item.state === selectedState);

//handler function for state
  function handleClickState(e) {
    setSelectedState(e.target.value);
    setShowList(true);
  }
//handler function for Lga
  function handleClickLga(e) {
    setSelectedLga(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
      <div>
        {/* First Name */}
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"/>
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"/>
        </div>
      </div>

      <div>
        <div>
          <select value={selectedState} onChange={handleClickState} name="state">
            <option value="" disabled>Choose your state</option>
            {sortedData.map((data) => (
              <option key={data.alias} value={data.state}>
                {data.state}
              </option>
            ))}
          </select>
        </div>
        {selectedData && showList && (
          <select value={selectedLga} onChange={handleClickLga} name="lga">
            <option value="" disabled>{`Choose your LGA in ${selectedState}`}</option>
            {selectedData.lgas.map((lgass) => (
              <option key={lgass} value={lgass}>
                {lgass}
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        <button type="submit">
          Submit
        </button>
      </div>
    </form>
  </div>
  );
}

export default DependentDropdown;
```

The key modification here is data fetching using the `useEffect` hook, which fetches the states and LGA data only on the initial render

![Here is how this renders on the browser](https://cdn.hashnode.com/res/hashnode/image/upload/v1737856956995/ada964c4-a2a4-4012-869f-c0bbf53761a7.gif)

---

## Conclusion

In this tutorial, you have learnt how to create dependent dropdowns in React using both static and dynamic data. You can now use this type of dropdown in your React applications.

If you found this article helpful, you can connect with me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`timothy-olanrewaju750`)](https://linkedin.com/in/timothy-olanrewaju750) for more programming related articles and posts.

See you on the next one!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Dependent Dropdowns in React",
  "desc": "In many web applications, we often encounter forms where selecting an option in one dropdown unlocks a new set of options in another. These interconnected dropdowns, commonly known as dependent or cascading dropdowns, play a crucial role in creating ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-dependent-dropdowns-in-react.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
