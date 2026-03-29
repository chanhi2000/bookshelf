---
lang: en-US
title: "The Data Quality Handbook: Data Errors, the Developer's Role, and Validation Layers Explained."
description: "Article(s) > The Data Quality Handbook: Data Errors, the Developer's Role, and Validation Layers Explained."
icon: fa-brands fa-js
category:
  - JavaScript
  - PHP
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
  - php
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Data Quality Handbook: Data Errors, the Developer's Role, and Validation Layers Explained."
    - property: og:description
      content: "The Data Quality Handbook: Data Errors, the Developer's Role, and Validation Layers Explained."
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/data-quality-handbook-data-errors-the-developer-s-role-validation-layers.html
prev: /programming/js/articles/README.md
date: 2026-04-15
isOriginal: false
author:
  - name: Great John
    url: https://freecodecamp.org/news/author/greatujah/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4f0c9085-cb4f-4255-b7a0-e146eafc32c9.png
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

```component VPCard
{
  "title": "PHP > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/php/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Data Quality Handbook: Data Errors, the Developer's Role, and Validation Layers Explained."
  desc="In August 2012, Knight Capital, a major trading firm in the United States, deployed faulty trading software to its production system. The system used this incorrect configuration data and it triggered"
  url="https://freecodecamp.org/news/data-quality-handbook-data-errors-the-developer-s-role-validation-layers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4f0c9085-cb4f-4255-b7a0-e146eafc32c9.png"/>

In August 2012, Knight Capital, a major trading firm in the United States, deployed faulty trading software to its production system. The system used this incorrect configuration data and it triggered millions of unintended stock trades.

The company lost about $440 million in just 45 minutes. Knight Capital nearly collapsed and had to be rescued by investors. It was later acquired by another firm.

When Target expanded into Canada, the company relied on a new supply chain system that contained incorrect product and inventory data. Product information in the database was incomplete and inaccurate. Prices, sizes, and product descriptions were entered incorrectly.

Inventory systems reported items in stock that were actually unavailable. Customers found empty shelves in stores despite the system showing stock. The company lost over $2 billion in the Canadian market. Target eventually shut down all Canadian stores in 2015. One employee made the statement “Even though we had a great supply chain system on paper, we didn’t have accurate data. Bad data leads to bad decisions’’

Another famous example of data-related engineering failures involves the Mars Climate Orbiter spacecraft. One engineering team used metric units (newtons). Another team used imperial units (pounds-force). The system failed to convert the data correctly. The spacecraft entered Mars' atmosphere at the wrong altitude. The mission failed and the spacecraft was destroyed. The loss was about $125 million.

In this article, we'll delve deep into what data quality truly means, the types of data errors that silently break systems, the developer’s responsibility in preventing them, and the validation layers that work together to keep bad data out of production.

::: note Prerequisites

- A basic understanding of what data is
- A basic understanding of data structures
- An understanding of what an API is
- An understanding of what a database is and what it does

:::

---

## The Importance of Data Quality

As you can see from just these few examples, the quality of the data you're working with really matters.

Gartner reports that organisations attribute [**around $15 million in annual losses**](https://forbes.com/councils/forbestechcouncil/2021/10/14/flying-blind-how-bad-data-undermines-business/) to poor‑quality data. The same research also shows that [**nearly 60% of companies have no clear idea what bad data actually costs them**](https://forbes.com/councils/forbestechcouncil/2021/10/14/flying-blind-how-bad-data-undermines-business/), largely because they don’t track or measure data‑quality issues at all.

A 2016 study by IBM is even more eye-popping. IBM found that [poor data quality strips $3.1 trillion from the U.S. economy annually](https://community.sap.com/t5/technology-blog-posts-by-sap/bad-data-costs-the-u-s-3-trillion-per-year/ba-p/13575387) due to lower productivity, system outages, and higher maintenance costs.

Bad data is, and will continue to be, the kryptonite of any organisation. This is even more concerning as more organisations now depend on data for strategy execution than ever before.

When data is wrong, incomplete, duplicated, or inconsistent, the consequences ripple outward: Incorrect dashboards mislead teams, which leads to making incorrect decisions. Implementing these decisions can lead to faulty strategy and policy implementation.

Eventually, the organisation pays the price, financially, operationally, and reputationally. And while money can be recovered, reputation rarely bounces back so easily.

### How Does Bad Data Happen in the First Place?

Form fields are usually the first place where data enters an application, so they’re often where bad data begins. This is why the developer’s role is so critical.

Many of the most damaging data errors don’t originate from malicious users or complex edge cases – they come from simple oversights that the system should never have allowed in the first place.

But it's equally important to recognise that data quality issues often originate *before* the data ever reaches an application. Upstream processes — how data is collected, measured, recorded, or pre‑validated — can introduce inaccuracies long before the system receives it.

For example, a nurse might weigh a patient using an uncalibrated mechanical scale, record the incorrect value on a paper form, and later have that value transcribed into the hospital system. By the time the data enters the application, the error is already embedded.

This means that maintaining data quality requires attention both to upstream data collection practices and to the system-level validation that developers control.

When the UI, backend, or API layer permits invalid, incomplete, inconsistent, or logically impossible data to enter the pipeline, the organisation inherits a long‑term liability. Even small choices — such as allowing empty fields, ignoring duplicates, or failing to enforce validation rules — can introduce errors that may only surface months later in reports or dashboards, leading to confusion and inaccurate insights.

### The Cost of Bad Data

Data quality can also be impacted at any stage of the data pipeline: before ingestion, in production, or even during analysis.

If bad data is caught in the UI, it's almost free, if we're thinking in terms of cost. If it's caught at the API layer, that's still pretty cheap. If it's caught in the database, the cost is moderate. And if it's caught in a report or ML model months later, that's expensive, and sometimes irreversible.

A key principle in modern data management is: the cheapest and safest place to catch bad data is at the source, and that is before ingestion. [<VPIcon icon="fas fa-globe"/>The well-known 1-10-100 Rule](https://matillion.com/blog/the-1-10-100-rule-of-data-quality-a-critical-review-for-data-professionals), introduced by George Labovitz and Yu Sang Chang in 1992, clearly illustrates this idea.

According to the rule, it costs about \\(1 to validate data at the point of entry, \\)10 to correct it after it has entered the system, and $100 per record if the error goes unnoticed and causes problems further down the line.

As the saying goes, an ounce of prevention is worth a pound of cure – and this is especially true when it comes to maintaining high-quality data.

To help buttress my point, I’ve categorised the different types of errors and oversights that developers should never allow that can and should be prevented before they ever reach the database, analytics layer, or reporting systems.

---

## Types of Data Errors

### Required Field Errors

If you build a form that allows a user to submit a registration form with important fields left empty (like first name, last name, email address, phone number, date of birth, or address), you're directly letting incomplete data enter the system.

I remember a scenario from my time as a data analyst where I was analysing a dataset containing different types of alarms triggered across several buildings. These alarms fell into categories such as aquarium alarms, intruder alarms, fire alarms, and maintenance alarms.

The purpose of the analysis was simple: identify which buildings had the highest frequency of alarms so that maintenance, resources, or investigations could be allocated appropriately.

Whenever an alarm went off, the security team recorded it using a software system. By the end of each month, we could view the cumulative alarms and generate insights.

But I encountered a major data quality issue. The security officers often selected the alarm category but failed to submit the building where the alarm occurred — and the system allowed this incomplete record to be saved into the database.

Every alarm had to occur in a specific building. Yet during analysis, I would see entries like “20 fire alarms” with no building information attached. Since I couldn’t determine where these alarms happened, the data became unusable. I had no choice but to delete those records because they provided no actionable value.

This is a classic example of poor data validation. If the developer had implemented proper constraints, the system would never allow an alarm to be submitted without a building name.

Required fields should be enforced at the UI and backend levels to prevent missing data from entering the system in the first place. These gaps lead to missing or unusable data in the database, often forcing teams to delete or manually repair records later.

To prevent these errors, you can use required‑field validation, disable the submit button until all mandatory fields are completed, and visually highlight missing fields with inline error messages.

Here's a practical code example of some bad code (no required checks):

```html
<form id="signup">
  <input type="text" id="name" placeholder="Full name">
  <input type="email" id="email" placeholder="Email">
  <button type="submit">Sign up</button>
</form>

<script>
document.getElementById("signup").addEventListener("submit", e => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  console.log("Submitted:", { name, email });
});
</script>
```

From the above code snippet, the core problem is that the form doesn't enforce required input. Neither HTML‑level validation (using the `required` attribute) nor JavaScript‑based checks are implemented. This omission allows users to submit the form without providing necessary information, making the form unreliable for collecting valid and complete user data.

From a usability and data quality perspective, this is problematic. Forms are typically designed to collect meaningful and complete information, and fields such as “Full name” and “Email” are usually essential. Without marking these inputs as required or validating them programmatically, we risk receiving blank or invalid submissions, which can compromise the quality of stored data and any processes that depend on it.

Here's an example of a better version (UI prevents empty submission):

```html
<form id="signup">
  <input type="text" id="name" placeholder="Full name" required>
  <input type="email" id="email" placeholder="Email" required>
  <button type="submit">Sign up</button>
</form>

<script>
document.getElementById("signup").addEventListener("submit", e => {
  if (!e.target.checkValidity()) {
    e.preventDefault();
    alert("Please fill in all required fields.");
  }
});
</script>
```

In this revised version of the code, the addition of the `required` attribute to both the name and email input elements ensures that the browser won't allow the form to be submitted unless these fields are filled. This is an important step toward maintaining data completeness and improving the overall reliability of the form.

Also, by checking `e.target.checkValidity()`, we now ensure that the form is evaluated before submission proceeds.

Another positive aspect is the conditional use of `e.preventDefault()`. When the form is invalid, the default submission behavior is stopped, preventing incomplete or incorrect data from being sent.

### Format Validation Errors

If you have a form that allows a user to enter an email without an @ symbol, an email without a domain, a phone number containing letters, or a postcode/ZIP code in the wrong format, that allows invalid data to enter the system.

The same applies when you allow a user to submit an impossible date (32/15/2025) or a credit card number with the wrong length.

These issues will cause the data analyst to spend more time cleaning the data, if it's even cleanable. And such incorrect inputs create unreliable data that breaks downstream processes and increases cleanup costs.

To prevent these types of errors, you can use regex validation, input masks, and field‑type restrictions (for example, numeric‑only fields for phone numbers) to enforce correct formats before submission.

Here's a bad example of allowing format validation errors:

```html
<input id="phone" placeholder="Phone number">
<button onclick="save()">Save</button>

<script>
function save() {
  const phone = document.getElementById("phone").value;
  console.log("Saving phone:", phone);
}
</script>
```

This code doesn't perform any checks on the format or structure of the phone number. The function simply retrieves whatever value exists – whether valid, invalid, or blank – and logs it to the console without any condition.

Here's the fixed version:

```html
<input id="phone" placeholder="Phone number" required>
<button onclick="save()">Save</button>

<script>
function save() {
  const phone = document.getElementById("phone").value;

  if (!/^\d+$/.test(phone)) {
    alert("Phone number must contain digits only.");
    return;
  }

  console.log("Saving phone:", phone);
}
</script>
```

This version fixes the earlier mistake by introducing a clear validation rule. Before the system accepts the phone number, it checks whether the input contains only digits. The regular expression `^\d+$` ensures that the value is made up entirely of numbers, with no letters or symbols allowed. If the user enters anything invalid, the function stops and displays an error message instead of saving bad data.

This approach prevents the format error that occurred in the previous example. Instead of blindly trusting whatever the user types, the code now enforces a rule that matches the expected format of a phone number. This is what a responsible developer should do: verify the input before using it.

### Range and Limit Errors

Allowing users to enter values outside acceptable limits – such as negative ages, quantities below zero, discounts above 100%, or measurements far beyond realistic ranges – that enables the ingestion of data that violates business rules. These errors distort analytics, break calculations, and create operational inconsistencies.

To mitigate these errors, you can apply min/max constraints, sliders, steppers, and numeric boundaries to ensure values fall within valid ranges.

Here's a bad example of allowing range and limit errors:

```html
<input id="age" type="number">
<button onclick="submitAge()">Submit</button>

<script>
function submitAge() {
  console.log("Age:", document.getElementById("age").value);
}
</script>
```

As seen above, we've created an input field for age but doesn't specify any limits or constraints. The browser allows the user to type any number — including values that make no sense, such as negative ages, extremely large ages, or decimals. The JavaScript function simply reads the value and logs it without checking whether the age is realistic.

Here's a better version:

```html
<input id="age" type="number" min="0" max="120" required>
<button onclick="submitAge()">Submit</button>

<script>
function submitAge() {
  const ageInput = document.getElementById("age");
  if (!ageInput.checkValidity()) {
    alert("Age must be between 0 and 120.");
    return;
  }
  console.log("Age:", ageInput.value);
}
</script>
```

Now in this version, the inclusion of the `min="0"` and `max="120"` attributes sets clear boundaries for acceptable input values. This ensures that only realistic age values within a defined range are allowed, preventing invalid entries such as negative numbers or excessively large ages.

The JavaScript function further enhances this validation by using the `checkValidity()` method. This method checks whether the input satisfies all defined constraints, including the required condition and the specified numeric range. If the input doesn't meet these conditions, the function prevents further execution and displays an alert message, informing the user that the entered age must fall within the allowed range.

### Logical Consistency Errors

If you allow a user to select an end date before the start date, choose a checkout date earlier than check‑in at a hotel, or enter a delivery date before the order date, this will result in logically impossible data. The same applies when you allow a user to enter a graduation year earlier than their admission to a program, or submit working hours that exceed 24 hours in a day.

You can mitigate this by implementing cross‑field validation, business‑rule checks, and conditional logic that ensures related fields remain consistent.

Here's a bad example of a logical consistency error:

```html
<input type="date" id="start">
<input type="date" id="end">
<button onclick="save()">Save</button>

<script>
function save() {
  console.log({
    start: document.getElementById("start").value,
    end: document.getElementById("end").value
  });
}
</script>
```

In the code above, the core issue is the complete absence of validation. Although the inputs use `type="date"`, which provides a structured way for users to select dates, the code doesn't enforce that either field is required. This means the user can leave one or both date fields empty, and the `save()` function will still run and log the values. As a result, the system may end up processing incomplete or meaningless data.

Beyond missing required checks, the code also fails to validate the logical relationship between the two dates. In any scenario involving a start date and an end date, it's expected that the start date shouldn't occur after the end date. But this code performs no such comparison.

This means that the user can select a start date that's later than the end date, and the system will accept it without warning. This leads to inconsistent or impossible data being recorded.

Also, the function simply logs the values without providing any feedback to the user. There's no mechanism to alert the user when a field is empty or when the dates are logically incorrect. This reduces usability and makes it difficult for users to understand or correct their mistakes.

Here's the fixed version:

```html
<input type="date" id="start" required>
<input type="date" id="end" required>
<button onclick="save()">Save</button>

<script>
function save() {
  const startValue = document.getElementById("start").value;
  const endValue = document.getElementById("end").value;

  // Extra safety: check empties (in case required is bypassed)
  if (!startValue || !endValue) {
    alert("Both start and end dates are required.");
    return;
  }

  const start = new Date(startValue);
  const end = new Date(endValue);

  if (end < start) {
    alert("End date cannot be before start date.");
    return;
  }

  console.log({ start, end });
}
</script>
```

In this improved version, first, both date fields now include the `required` attribute, ensuring that the user can't leave either field empty without triggering validation.

Second, we've added a logical validation check to ensure that the relationship between the two dates is correct. After retrieving the values, the function converts them into `Date` objects and compares them to verify that the end date doesn't occur before the start date. If this condition is violated, the function stops execution and displays an alert informing the user of the error.

This prevents inconsistent or impossible date ranges from being accepted.

### Duplicate and Data Integrity Errors

When you let a user submit an email that's already registered, choose a username that's already taken, or enter a duplicate employee ID or student number, this results in identity conflicts and duplicate records. Problems also arise when you allow users to upload unsupported file types, oversized files, or corrupted images.

Security risks can emerge when users are able to enter HTML/script tags (XSS), SQL‑injection patterns, or disallowed special characters. These issues compromise data quality, system integrity, and security.

You can prevent these types of issues by using uniqueness checks, file‑type and size validation, and input sanitization to block duplicates, invalid uploads, and malicious inputs.

Here's an example of a duplicate error:

```html
<input id="email" placeholder="Enter email" required>
<button onclick="save()">Save</button>

<script>
const savedEmails = [];

function save() {
  const email = document.getElementById("email").value;
  savedEmails.push(email);
  console.log("Saved emails:", savedEmails);
}
</script>
```

This code blindly pushes every email into the `savedEmails` array without checking whether the email already exists. Because there is no duplicate detection, the user can enter the same email multiple times.

Here is the fixed version:

```html
<input id="email" placeholder="Enter email" required>
<button onclick="save()">Save</button>

<script>
const savedEmails = [];

function save() {
  const email = document.getElementById("email").value.trim();

  // Check if the field is empty
  if (!email) {
    alert("Please enter an email before saving.");
    return;
  }

  // Check for duplicate
  if (savedEmails.includes(email)) {
    alert("This email has already been saved.");
    return;
  }

  savedEmails.push(email);
  console.log("Saved emails:", savedEmails);
}
</script>

```

In this improved version of the code, we've implemented proper validation steps to prevent duplicate email entries. Before saving the email, the function checks whether the value already exists in the `savedEmails` array using the `includes()` method. If the email is found, the function stops execution and displays an alert informing the user that the email has already been saved. This ensures that each email is stored only once, maintaining the uniqueness and integrity of the data.

### Relational Errors (Reference Integrity)

If you let a user select a city that doesn’t belong to the chosen country, a product ID that no longer exists, a retired SKU, or a shipping method unavailable in the selected region, this can result in broken references.

The same applies when users can select a manager from a different department or choose a fully booked time slot, not setting the right roles and permissions. These errors break relationships between tables and corrupt downstream joins and reports.

Here, you can use dependent dropdowns, real‑time lookups, and foreign‑key validation to help ensure that users can only select valid, existing, and compatible options.

Here's a bad example of a relational error:

```html
<select id="country">
  <option value="uk">United Kingdom</option>
  <option value="usa">United States</option>
</select>

<select id="city">
  <option value="london">London</option>
  <option value="manchester">Manchester</option>
  <option value="newyork">New York</option>
  <option value="losangeles">Los Angeles</option>
</select>

<button onclick="save()">Save</button>

<script>
function save() {
  const country = document.getElementById("country").value;
  const city = document.getElementById("city").value;

  console.log("Saving:", { country, city });
}
</script>
```

From the above, the mistake in this code is that we've treated country and city as completely independent fields, even though one is supposed to depend on the other. By presenting all cities regardless of the selected country, the interface allows users to create combinations that make no sense — such as choosing “United Kingdom” with “New York” or “United States” with “Manchester.”

Also, because the `save()` function performs no validation and simply logs whatever the user selects, the system ends up accepting and storing relationships that should never exist. This breaks the logical link between the two fields and leads to invalid, inconsistent data that can corrupt downstream.

Here's the fixed, production-ready version:

```html :collapsed-lines
<select id="country" onchange="loadCities()" required>
  <option value="">Select country</option>
  <option value="uk">United Kingdom</option>
  <option value="usa">United States</option>
</select>

<select id="city" required disabled>
  <option value="">Select city</option>
</select>

<button onclick="save()">Save</button>

<script>
const citiesByCountry = {
  uk: ["London", "Manchester"],
  usa: ["New York", "Los Angeles"]
};

function loadCities() {
  const country = document.getElementById("country").value;
  const citySelect = document.getElementById("city");

  // Reset city dropdown
  citySelect.innerHTML = '<option value="">Select city</option>';

  // Disable if no country selected
  if (!country) {
    citySelect.disabled = true;
    return;
  }

  // Enable dropdown
  citySelect.disabled = false;

  // Load cities safely
  (citiesByCountry[country] || []).forEach(city => {
    const option = document.createElement("option");
    option.value = city.toLowerCase().replace(/\s+/g, ""); // remove ALL spaces
    option.textContent = city;
    citySelect.appendChild(option);
  });
}

function save() {
  const country = document.getElementById("country").value;
  const city = document.getElementById("city").value;

  // Required validation
  if (!country || !city) {
    alert("Please select both a country and a city.");
    return;
  }

  // Build list of valid cities for this country
  const validCities = (citiesByCountry[country] || [])
    .map(c => c.toLowerCase().replace(/\s+/g, ""));

  // Relational validation
  if (!validCities.includes(city)) {
    alert("Selected city does not belong to the chosen country.");
    return;
  }

  console.log("Saving:", { country, city });
}
</script>
```

This improved code turns the country–city form into a controlled, relationship‑aware flow instead of two loose dropdowns.

When the user selects a country, the `loadCities()` function runs. It first clears the city dropdown and, if no country is selected, keeps the city field disabled so the user can't choose a city on its own.

Once a valid country is chosen, the city dropdown is enabled and populated only with the cities that belong to that specific country, using the `citiesByCountry` mapping. Also, the city values are normalised (lowercased and stripped of spaces) so they’re consistent and safe to compare.

When the user clicks “Save,” the `save()` function checks that both a country and a city have been selected. If either is missing, it shows an alert and stops. It then rebuilds the list of valid city values for the chosen country and verifies that the selected city is actually in that list.

### Structural Errors (Dropdowns, Radio Buttons, Enums)

If users can type a country as “U.S.A”, “USA”, “United States”, or “us”, enter gender as “male”, “Male”, “M”, or “man”, or type a department as “Engineering”, “Eng”, or “engineer”, this can result in inconsistent categorical data.

The same applies to currencies typed as “usd”, “USD”, “US Dollars”, product categories spelled differently, status values like “active”, “Active”, “ACT”, “enabled”, or boolean values like “yes”, “Yes”, “Y”, “1”.

These inconsistencies make analytics, grouping, and reporting unreliable, and the analyst will spend time cleaning and standardizing these files.

You should replace free‑text fields with dropdowns, radio buttons, and enums to enforce standardized categorical values.

Bad example of a structural error:

```html :collapsed-lines
<form id="profile">
  <label>Country</label>
  <input type="text" id="country" placeholder="Enter country">
  <button type="submit">Save</button>
</form>

<script>
document.getElementById("profile").addEventListener("submit", e => {
  e.preventDefault();
  const country = document.getElementById("country").value;
  console.log("Saving:", country);
});
</script>
```

The problem with this code is that it pretends to save a country value without doing any real validation or enforcing any rules, which makes the form unreliable and prone to bad data.

The form uses a plain text input for “country,” meaning the user can type anything they want — misspellings, random characters, invalid countries, or even leave it blank. Because the input isn’t marked as required and the JavaScript doesn’t check whether the field contains a meaningful value, the form will happily “save” an empty string or nonsense text.

The `submit` handler prevents the default form submission but does nothing beyond logging whatever the user typed, so the system accepts invalid, incomplete, or malformed data without question. In short, the code collects input but doesn't validate it, doesn't enforce correctness, and doesn't protect the system from bad or unusable values.

Here's the fixed version:

```html :collapsed-lines
<form id="profile">
  <label>Country</label>
  <select id="country" required>
    <option value="">Select country</option>
    <option value="uk">United Kingdom</option>
    <option value="usa">United States</option>
    <option value="canada">Canada</option>
  </select>

  <button type="submit">Save</button>
</form>

<script>
document.getElementById("profile").addEventListener("submit", e => {
  e.preventDefault();

  const country = document.getElementById("country").value;

  // Required validation
  if (!country) {
    alert("Please select a country before saving.");
    return;
  }

  console.log("Saving:", country);
});
</script>
```

The biggest improvement is that we're no longer relying on a free‑text field for the country. By switching to a dropdown, the form now limits the user to a controlled set of valid options. This prevents misspellings, random text, or invalid country names from ever entering the system.

These are the main types of data errors you might come across in your work. Now that we've discussed what causes them and some key fixes/preventative measures you can take, let's move on to data quality itself.

---

## What Makes Good Data?

So what, in fact, is data quality? [<VPIcon icon="iconfont icon-ibm"/>IBM defines it](https://ibm.com/products/tutorials/6-pillars-of-data-quality-and-how-to-improve-your-data) as the degree of accuracy, consistency, completeness, reliability, and relevance of the data collected, stored, and used within an organization or a specific context.

Let's look at each of these features of quality data a bit more closely to understand what they entail.

### Completeness

Completeness measures how much of the required data is actually present. When large portions of fields are missing, the dataset stops representing reality and any analysis built on it becomes unreliable.

An example would be a sign‑up form that stores users, but half of them are missing an email address. If you run an analysis on “email engagement,” your results will be skewed because a big chunk of users can’t even receive emails. This means that this data is incomplete.

### Uniqueness

Uniqueness checks whether each real‑world entity appears only once in the dataset. Duplicate records inflate counts, break joins, and distort metrics.

An example would be a customer table containing two rows for the same person with the same customer ID. When calculating “active customers,” the system counts them twice, inflating revenue projections.

### Validity

Validity evaluates whether data follows the expected format, type, or business rules. This includes correct data types, allowed ranges, and patterns defined by the system.

An example would be a field meant to store dates contains values like “32/99/2025” or “tomorrow.” These invalid entries break downstream ETL jobs that expect a proper date format.

### Timeliness

Timeliness reflects whether data is available when it’s needed. Even accurate data becomes useless if it arrives too late for the process that depends on it. For example, after a customer places an order, the system should generate an order ID instantly.

### Accuracy

Accuracy measures how closely data matches the real‑world truth. When multiple systems report the same metric, one must be designated as the authoritative source to avoid conflicting values.

### Consistency

Consistency checks whether data aligns across different datasets or within related fields. If two systems describe the same concept, their values shouldn't contradict each other.

For example, a company’s HR system reports 50 employees in Engineering, but the payroll system lists only 42. Since both describe the same group, the mismatch signals a data quality issue.

### Fitness for Purpose

Fitness for purpose assesses whether the data is suitable for the specific business task at hand. Even complete, accurate, and timely data may be unhelpful if it doesn’t answer the intended question.

A dataset of website clicks might be perfect for analysing user engagement, for example, but it’s useless for forecasting revenue because it contains no purchase or pricing information.

---

## Data Validation Layers

Now that we've highlighted the characteristics that ensure quality data, it's important to discuss the layers of data validation.

There are five layers you'll need to check to enforce data quality.

### Frontend Layer — “Protect the User, Not the System”

Frontend validation plays an important role in enhancing the user experience – but it doesn't provide real protection for a system.

Since frontend logic operates within the user’s environment, we can't trust it as a mechanism for enforcing data quality. Any code executed in the browser is ultimately under the user’s control, meaning it can be disabled, modified, intercepted, or bypassed entirely.

For instance, a user can simply open browser developer tools, remove validation rules, and submit invalid or malicious data without restriction.

Frontend validation is incapable of enforcing complex business rules. Constraints such as ensuring that a discounted price is lower than the original price, validating that a start date precedes an end date, preventing stock levels from becoming negative, or confirming that a product belongs to a valid category within the database require deeper system-level checks.

At the frontend level, what is being validated is: required fields, email format, password strength, address fields, and payment input format.

So frontend validation doesn't guarantee data quality or security, as it can be bypassed through API tools (like Postman), disabled JavaScript, malicious bots, and third-party integrations.

Because of this, it's best to treat the front-end as a usability layer, not a trust layer.

### Backend Validation — “The Real Gatekeeper”

You can only guarantee true data quality and system integrity at the backend and database layers.

The backend is responsible for enforcing request validation, implementing business logic, and managing authentication and authorization.

If validation fails here, invalid data is rejected before it can propagate. Without this layer, data corruption begins at ingestion.

For example:

```js
$request->validate([
   'name' => 'required|string|max:255',
   'price' => 'required|numeric|min:0',
   'stock' => 'required|integer|min:0',
   'category_id' => 'required|exists:categories,id',
]);
```

The code snippet above demonstrates how you can use request validation in Laravel to ensure that incoming data meets specific requirements before it's processed or stored in the database. This is an essential practice in web development, as it helps maintain data integrity, prevents errors, and enhances application security.

In this example, we're using the `$request->validate()` method to define a set of validation rules for four input fields: `name`, `price`, `stock`, and `category_id`. Each field is assigned a series of constraints that the incoming data must satisfy.

The name field is marked as required, meaning it must be included in the request and can't be empty. It must also be a string, ensuring that only textual data is accepted, and it's limited to a maximum length of 255 characters using `max:255`. This prevents excessively long inputs that could potentially cause issues in the database or user interface.

Similarly, the price field is required and must be numeric, allowing only numbers such as integers or decimal values. The rule `min:0` ensures that the price can't be negative, which is logically consistent for most product pricing scenarios.

The stock field is also required and must be an integer, meaning it can only accept whole numbers. This is appropriate for counting physical items. Like the price field, it includes a `min:0` rule to prevent negative stock values, which would not make sense in an inventory system.

Finally, the category_id field is validated to ensure it is both present and valid. The `required` rule ensures that a category is selected, while the `exists:categories,id` rule checks that the provided value corresponds to an existing id in the categories database table. This prevents invalid or non-existent category references, thereby preserving relational integrity within the database.

This layer validates null values, data types and formats, allowed ranges, and referential integrity (exists).

### Database Layer — “Protect the Data at Rest”

Validation at the application level is insufficient on its own. You'll also need to enforce database-level constraints like NOT NULL constraints, UNIQUE constraints (email, SKU, order number), foreign keys (orders.user_id → users.id), and check constraints (for example, price >= 0).

This layer is critical because application bugs may bypass validation, background jobs and imports may skip controllers, and malicious actors may attempt direct access.

The database layer acts as the final line of defense, ensuring structural integrity regardless of application failures. Database constraints are the last hard stop: they enforce correctness even when code is bypassed.

### Service Layer / Business Logic — “Validate Real-World Rules”

This layer enforces domain-specific logic that can't be captured by simple validation rules. The service layer is where the application stops asking “Is this data shaped correctly?” and starts asking “Is this allowed to happen in the real world?”.

This layer enforces domain‑specific rules that can't be captured by simple request validation or database constraints. These rules reflect business truth, not structural correctness.

::: tip Example

```js
if (\(product->stock < \)quantity) {
   throw new OutOfStockException();
}
```

This prevents overselling and ensures the system reflects physical reality.

```js
if (\(cartTotal !== \)calculatedTotal) {
   throw new PriceMismatchException();
}
```

This protects revenue and prevents tampering.

:::

In this layer, you enforce real‑world business rules by ensuring inventory correctness, recalculating totals, applying discount logic, and checking user‑specific limits.

### Jobs / Queues / Data Ingestion — “Validate External Data”

When importing or processing external data (for example, supplier feeds), validation must occur before processing. You'll need to ensure schema conformity, that the required columns are present, that you have the correct data types, that the JSON structure is valid, and that you're detecting duplicate batches.

This is because external data sources are a major source of data quality issues. Without validation here, corrupted data can silently enter the system at scale.

Now that we've discussed the layers of a modern application stack, it should be clear that data quality isn't something you “check once” at the UI.

It must be enforced repeatedly, at multiple depths of the system. Each layer catches a different class of defects, and together they form a defensive wall that prevents bad data from ever reaching storage, analytics, or downstream consumers.

---

## Testing Strategies to Protect Data Quality

To wrap up, here are the three foundational testing strategy every developer should apply to protect data quality.

### Unit Testing

Unit tests are the first line of defense in data quality. In this context, a “unit” refers to a single column, a single transformation, or a single validation rule.

The purpose is straightforward: verify that the smallest building blocks of your data logic behave exactly as intended. This matters because if these low‑level rules are not tested and validated, incorrect or inconsistent data will flow into the database and contaminate everything built on top of it.

By isolating each rule or transformation, you can guarantee that schema constraints, field‑level assumptions, and low‑level logic remain correct before data ever flows into larger pipelines or business processes.

Typical questions answered at this layer include:

1. Does this column allow nulls?
2. Does this regex correctly strip whitespace from email strings?
3. Does this transformation produce the expected output for a single row?

This is where you can verify that the data contract is sound. If a column must be non‑null, unique, or follow a specific pattern, the unit test enforces it. When these rules fail here, they fail cheaply – before they can corrupt a table or mislead a dashboard.

To make this concrete, here’s what a unit test looks like in a real codebase. Even though this example comes from Laravel, the testing principle is identical to data‑quality unit tests: one rule, one expectation, isolated from everything else.

#### Example: Testing a Discount Calculation Rule

Imagine your e‑commerce shop has this rule:

- If a product costs more than £100, apply a 10% discount.
- Otherwise, apply no discount.

Let's say this is your discount logic:

```php
<?php

namespace App\Services;

class DiscountService
{
    public function calculate(float $price): float
    {
        if ($price > 100) {
            return $price * 0.10; // 10% discount
        }

        return 0;
    }
}
```

The unit test for this logic will be:

```php
<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\DiscountService;

class DiscountServiceTest extends TestCase
{
    /** @test */
    public function it_applies_10_percent_discount_when_price_is_above_100()
    {
        $service = new DiscountService();

        \(discount = \)service->calculate(200);

        \(this->assertEquals(20, \)discount);
    }

    /** @test */
    public function it_applies_no_discount_when_price_is_100_or_below()
    {
        $service = new DiscountService();

        \(discount = \)service->calculate(100);

        \(this->assertEquals(0, \)discount);
    }
}
```

The `DiscountService` contains a simple rule: if a price is greater than 100, a 10% discount is applied. Otherwise, no discount is applied. The unit test verifies this rule in isolation, without involving controllers, databases, or HTTP requests. By testing the service directly, the developer ensures that the core calculation behaves exactly as intended.

The first test checks the positive case — a price of 200 should produce a discount of 20. The second test checks the boundary condition — a price of 100 should produce no discount. Together, these tests confirm both sides of the rule and protect against regressions if the logic changes in the future.

Now, since this is Laravel example, Laravel tests help you verify both your logic (unit tests) and your full application behaviour (feature tests). You can run them using `php artisan test`, which executes tests in a separate testing environment, ensuring your real database and main codebase remain safe and unaffected.

### Integration Testing: The Flow & Lineage Check

While unit tests validate the correctness of individual rules, integration tests validate the movement of data across components. Integration testing verifies that multiple layers work together as a single data flow.

In this example, the controller receives an order, calls the discount service, applies the transformation, and persists the result to the database. That interaction across layers is what elevates this from a unit test to an integration test. This is where you test the real‑world flow:

1. Controller → Service → Repository → MySQL
2. Check if MySQL migrations run correctly
3. Check foreign keys enforce relationships
4. Check to ensure services interact with the database as expected
5. Check to ensure models and repositories behave consistently

Integration tests reveal issues that only appear when components interact: incorrect joins, broken migrations, mismatched field names, or subtle type mismatches that unit tests cannot detect.

This is the layer where you catch the bugs that would otherwise silently corrupt data lineage.

**Here's an example:**

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ApplyDiscountTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function check_it_persists_the_correct_discounted_total_to_the_database()
    {
        $order = Order::factory()->create(['subtotal' => 150]);

        \(response = \)this->postJson("/orders/{$order->id}/apply-discount");

        $response->assertStatus(200);

        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'grand_total' => 135, // 150 - 10% discount
            'discount_total' => 15
        ]);
    }
}
```

This represents a full flow rather than a single rule:

- Controller → Service
- Service → Calculation
- Controller → Database write
- Database → Final state

This test begins by creating an order using an Eloquent factory. It immediately steps beyond the boundaries of a unit test, since it interacts with the database and relies on Laravel’s model layer to persist real data.

From there, the test sends an actual HTTP POST request to the `/orders/{id}/apply-discount` endpoint, which means it's not calling a method directly, but instead it's traveling through Laravel’s routing layer, invoking the controller responsible for handling the request, and triggering whatever business logic is responsible for calculating and applying the discount.

This movement through multiple layers (routing, controller, service logic, and model persistence) is precisely what defines integration testing: the goal is to verify that these components work together correctly as a system.

Once the request is processed, the test asserts that the response returns a successful status code, which confirms that the HTTP layer behaved as expected.

But the most important part comes afterward, when the test checks the database to ensure that the correct `grand_total` and `discount_total` were saved. This final assertion proves that the discount logic was executed, the model was updated, and the changes were successfully written to the database.

In other words, the test isn't merely checking whether a calculation is correct. It's also checking whether the entire pipeline – from receiving the request to updating the database – functions as a coherent whole.

### Functional Testing: The Business Rule Check

Functional tests validate the entire user experience, from the moment a request enters the system to the moment a response is returned. This includes:

- HTTP requests
- Controller logic
- Validation rules
- Service operations
- Database writes
- Redirects or rendered views

This is where you test the business rules that govern real‑world behaviour:

“A student can't register for two exams at the same time.”

“A cart can't have negative quantities.”

“A user can't update their profile without a valid email.”

Functional tests ensure that the system behaves correctly from the perspective of the user and the business, not just the code.

#### Here's an example: Functional Test

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CartQuantityFunctionalTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_cannot_set_a_negative_cart_quantity()
    {
        // Arrange: create a product
        $product = Product::factory()->create(['price' => 40]);

        // Simulate existing cart
        $this->withSession([
            'cart' => [
                $product->id => ['quantity' => 2]
            ]
        ]);

        // Act: user tries to update quantity to a negative number
        \(response = \)this->post('/cart/update', [
            'product_id' => $product->id,
            'quantity' => -5
        ]);

        // Assert: system rejects invalid business behaviour
        $response->assertStatus(302); // redirect back with errors
        $response->assertSessionHasErrors(['quantity']);

        // Assert: cart remains unchanged (business rule preserved)
        \(this->assertEquals(2, session('cart')[\)product->id]['quantity']);
    }
}
```

The test begins by creating a realistic environment in which a user interacts with a shopping cart. This is essential for understanding the behaviour the system is meant to enforce.

First, it generates a real product in the database using a factory, giving the product a price so that it resembles an item a customer might genuinely add to their cart.

Once the product exists, the test manually seeds the session with a cart containing that product and a quantity of two. This simulates a user who has already added the item to their cart in a previous interaction, and it establishes the baseline state the system must preserve if the user attempts an invalid update.

With the environment prepared, the test then imitates a user action by sending a POST request to the `/cart/update` endpoint. Instead of calling a method directly, it uses Laravel’s HTTP layer to reproduce the exact behaviour of a browser submitting a form. The request includes the product ID and a deliberately invalid quantity of negative five.

This is the heart of the scenario: the user is attempting something that violates the business rules of the application, and the test is designed to confirm that the system responds appropriately.

Now, when the request is processed, the test expects the application to reject the input, redirect the user back, and attach validation errors to the session. The assertion that the response has a 302 status code and contains validation errors confirms that the validation layer is functioning correctly and that the controller is enforcing the rule that quantities can't be negative.

The final part of the test is where the business rule is truly verified. After the failed update attempt, the test inspects the session to ensure that the cart remains unchanged. This is crucial because rejecting invalid input is only half of the requirement: the system must also protect the integrity of the existing cart data.

Functional tests answer questions like:

- Does the system prevent invalid real‑world behaviour?
- Does the user get the correct feedback?
- Does the data remain consistent after the request?
- Does the final output match the business expectation?

---

## Conclusion

Data quality is never the result of a single check or a single team. It emerges from a disciplined, layered approach where each testing level catches a different category of defects.

Unit tests safeguard the smallest rules, integration tests validate the flow of data across components, and functional tests enforce the business logic that governs real‑world behaviour.

When these layers operate together, bad data has nowhere to hide. When they don’t, even a minor oversight can slip through the cracks and escalate into a costly downstream failure.

So as you can see, your role in data quality is fundamentally proactive, not reactive. By designing systems with validation, integrity, and monitoring in mind, you ensure that data flowing through the pipeline is accurate, timely, complete, unique, and fit for purpose – supporting reliable analytics, reporting, and intelligent systems.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Data Quality Handbook: Data Errors, the Developer's Role, and Validation Layers Explained.",
  "desc": "In August 2012, Knight Capital, a major trading firm in the United States, deployed faulty trading software to its production system. The system used this incorrect configuration data and it triggered",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/data-quality-handbook-data-errors-the-developer-s-role-validation-layers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
