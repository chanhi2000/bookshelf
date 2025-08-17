---
lang: en-US
title: "How to Create Accessible and User-Friendly Forms in React"
description: "Article(s) > How to Create Accessible and User-Friendly Forms in React"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - CSS
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
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create Accessible and User-Friendly Forms in React"
    - property: og:description
      content: "How to Create Accessible and User-Friendly Forms in React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-accessible-and-user-friendly-forms-in-react.html
prev: /programming/js-react/articles/README.md
date: 2025-04-30
isOriginal: false
author:
  - name: Grant Riordan
    url : https://freecodecamp.org/news/author/grantdotdev/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745789677789/c386af23-39d6-4421-9f26-f98d75a30d61.jpeg
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

[[toc]]

---

<SiteInfo
  name="How to Create Accessible and User-Friendly Forms in React"
  desc="When designing web applications, you’ll often be asked the age old question “How accessible is your website” and “Does it offer the best user experience?”. These are both very valid questions, but they are often overlooked in favour of rich or fancy ..."
  url="https://freecodecamp.org/news/how-to-create-accessible-and-user-friendly-forms-in-react"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1745789677789/c386af23-39d6-4421-9f26-f98d75a30d61.jpeg"/>

When designing web applications, you’ll often be asked the age old question “How accessible is your website” and “Does it offer the best user experience?”. These are both very valid questions, but they are often overlooked in favour of rich or fancy looking features, reducing the site’s audience.

In this article, I’ll teach you about the React Hook Form library, HTML attributes, and development considerations to make sure your site’s available for all, focusing on:

- blind or visually impaired users, who may use a screen reader
- better user feedback
- visual queues for all
- design considerations for all

Whilst following along with this tutorial, you can either pull down the code from the GitHub repo (by visiting this [page (<FontIcon icon="iconfont icon-github"/>`grant-dot-dev/form_accessibility_ux`)](https://github.com/grant-dot-dev/form_accessibility_ux)), or you can use the inline code snippets within the article.

::: note Pre-requisites for this article

- Knowledge of React
- Knowledge of writing TypeScript and HTML / JSX.
- Familiarity with Tailwind CSS (not required in order to follow this tutorial)

:::

---

## The Initial Basic Form

So if we take a look at the form in its current state, you may think it looks fine. But it’s actually not very accessible, nor does it offer a great user experience.

```tsx :collapsed-lines
import { TvIcon } from "@heroicons/react/24/outline";

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

export const RegistrationForm = () => {
  const onSubmit = () => {
    alert(`Form submitted`);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-black bg-opacity-75 rounded-lg">
        <div className="flex flex-row justify-center items-center gap-x-4">
          <TvIcon className="h-12 w-12 text-white" />
          <h1 className="text-7xl font-bold text-center text-red-600 mb-4">
            Getflix
          </h1>
        </div>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Sign Up
        </h2>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 "
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 "
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 "
            />
          </div>

          {/* Agree to Terms */}
          <div className="flex items-center text-gray-400 text-sm">
            <input type="checkbox" id="agreeToTerms" className="mr-2" />
            <label htmlFor="agreeToTerms" className="select-none">
              I agree to the Terms and Conditions
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
```

### What’s Wrong With The Form?

- Lack of action feedback - no user feedback means that users can become confused as to whether an action has happened or not. No error messages or feedback offers the user no insight into what they need to do to correct the form.
- No labels for form inputs - No labels for form inputs prevent screen readers from understanding their purpose. Some screen readers may miss placeholders, and once a user types within the input, the placeholder is replaced, losing context and making it hard to return to erroneous inputs.
- Lack of accessibility markup to make the form optimised for screen readers and accessibility tools.
    

So how do we make this better? Let’s jump right in.

---

## Error Handling With React-Hook-Form

Error handling on forms is a critical aspect of any form submission flow. Without it, the process becomes both chaotic and frustrating for the user. We can alleviate this frustration by adding some useful error messages which explain the issues.

A popular library for working with forms in React is the `react-hook-form` library. It’s used by over 1.4 million people according to their GitHub statistics.

Go ahead and install it if you don’t have it already:

```bash
npm install react-hook-form
```

We will then implement the basic required functions from the `react-hook-form` package, using the `useForm()` hook like so:

```tsx
// define our type structure to use within the form
type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

// basic usage of `useForm()`
const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
} = useForm<Inputs>()
```

::: info Quick Explanation:

- `register`: One of the key concepts in React Hook Form is to “register” your component / HTML element. This means you can access value of the element for both form validation and when submitting the form.
- `handleSubmit`: This is the key function needed to submit the form, run validation, and any other configured checks. It can take up to two arguments:
    1. `handleSubmit(onSuccess)` - called when the submission of the form is valid and can submit ok.
    2. `handleSubmit(onSuccess, onFail)` - here you can pass the `handleSubmit()` method two functions: the first will be run when React Hook Form deems the form to be valid, and allows you to continue. The second will be called when the form sees an error. This could be from validation, or another stipulation.
- `watch`: Watch is a function that monitors a specified element for changes and returns its value. For instance, if you’re watching an input element, you can output the user’s typing in real-time or have another element validate it against a predefined value. A good example is a confirm password matching the previous password field.
- `formState`: this is an object which holds information about your form. The `formState` object keeps track of the state of the form, like:
    1. **isDirty** - `true` if the user has changed *any* input.
    2. **isValid** - `true` if the form passes all validations.
    3. **errors** - an object holding any validation errors per field.
    4. **isSubmitting** - `true` while the form is being submitted (useful for showing loading spinners)
    5. **isSubmitted** - `true` after the form has been submitted.
    6. **touchedFields** - which fields the user has interacted with.
    7. **dirtyFields** - which fields the user has modified.

We can use any of these properties by including them in our form state object. We are destructing the `errors` property so we can use the errors later in our form to either show error messages, or validate that there no errors on the page.

---

## Hooking Up the `useForm` Methods to Our Form

Now that we know more about the `useForm()` method and react-hook-form, we need to integrate this with our existing `<form/>` element. Doing so will allow us to use all the react-hook-form features we’ve discussed so far in our form.

```tsx :collapsed-lines
import { TvIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit = () => {
    alert(`Form submitted`);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-black bg-opacity-75 rounded-lg">
        <div className="flex flex-row justify-center items-center gap-x-4">
          <TvIcon className="h-12 w-12 text-red-500" />
          <h1 className="text-7xl font-bold text-center text-white mb-4">
            Getflix
          </h1>
        </div>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <input
              {...register("fullName", {
                required: "Full Name is required",
              })}
              aria-required
              type="text"
              placeholder="Full name"
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Email Address"
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              {...register("password", {
                required: "Please enter your password",
              })}
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              {...register("confirmPassword", {
                required: "Please enter your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Agree to Terms */}
          <div className="flex items-center text-gray-400 text-sm">
            <input
              {...register("agreeToTerms", {
                required: "You must agree to the terms and conditions",
              })}
              type="checkbox"
              id="agreeToTerms"
              className="mr-2"
            />
            <label className="select-none">
              I agree to the Terms and Conditions
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-sm mt-1">
              {errors.agreeToTerms.message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition"
          >
            Sign Up
          </button>

          {/* Already have account */}
          <p className="text-center text-gray-400 text-sm mt-4">
            Already have an account?{" "}
            <a href="#" className="text-red-500 hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
```

So in the updated form code, we’ve made a few adjustments:

### Registered Each Our Elements

For each of our elements we’ve added the `register` object, and configuring some overrides.

We added the **required** property to all input fields, which checks if the element has a value. If not, it records the provided name and marks the error as erroneous, updating the errors object with our name and the provided *required* message.

```ts
{...register("fullName", {
  required: "Full Name is required"
})}
```

We’ve added a `pattern` property on the email’s register object. This allows us to specify a criteria for the value of the input - perfect for passwords, email fields, and other inputs which may have value restrictions, or requirements.

```ts
// valid email pattern
pattern: {
  value: /^\S+@\S+$/i,
  message: "Invalid email address",
},
```

We have also added the `validate` property to the confirm password element. This is a given function that will run as the user types.

```ts
validate: (value) => value === watch("password") || "Passwords do not match"
```

The `validate` function inside `register` is run **automatically** based on the field's `validationMode` setting.

By default (if you do not specify the `validationMode`), React Hook Form runs validation on `onChange` and `onBlur` events. This means that:

- When the user types into the input → it triggers `validate`.
- When the user leaves (blurs) the input → it triggers `validate` again.

If you wanted to update the custom validation mode, you can override this using the `mode` setting within `useForm()` like so:

```tsx
const { register, handleSubmit, formState, trigger } = useForm({
  mode: "onSubmit",
});
```

If you then want to go an extra step and update the mode per element, overriding the `mode` setting you just globally set for your form, you can use the `trigger()` method from `useForm` like so:

```tsx
<input
  {...register("email", { required: "Email is required" })}
  onBlur={() => trigger("email")} // validate this field onBlur manually
/>
```

This allows you to have `onSubmit` validation set via `mode`, and then email is triggered via `onBlur()` too.

Just adding these simple settings within the react-hook-form library already gives us a much better user experience than before - but it isn’t everything. Let’s explore more settings, HTML, and attributes we can add to increase accessibility and user experience.

---

## Showing Error Messages

Form errors can be stored within the `formState` object we mentioned earlier, but they’re no good there - we need to display them to our users. We can achieve this simply by accessing the destructed `errors` object, like below:

```tsx
{errors.password && (
    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
)}
```

The code uses conditional syntax to show the `<p>` tag only if the `errors.password` object has a value, indicating an error associated with the password field from `useForm()` checks. We can then display the error message from `errors.password.message`, combined with a commonly used erroneous colour like red, to highlight the form’s problems. This can then been applied to all other input fields as per the code above.

---

## Adding `aria-required`

So we’ve informed the form that certain elements are required and these should be checked when submitting the form. But this alone doesn’t inform visually impaired users that the element is required.

To aid with screen-readers, we can add an `aria` attribute to our element which will be read by the screen-reader. This property is the `aria-required` property. This means that when the screen-reader reads out information about the element it will inform the user that this value is required for successful submission.

```tsx
<input
  {...register("fullName", {
      required: "Full Name is required"
  })}
  aria-required
  type="text"
  placeholder="Full name"
  className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
/>
```

---

## Adding `fieldset` and `legend`

Fieldset elements group `<form>` controls together, while legend elements provide a description for the grouped controls.

Imagine you have one big form, but it spans two "sections" - for example, a "*User Details*" section for username, email, and passwords, and an "*Address Details*" section asking for your shipping and billing information.

In this tutorial, we’re using TailwindCSS, which provides a utility class called `sr-only`. You can apply `sr-only` to your legends so they are only visible to screen readers, and not actually visible on the page.

This way, the legend will be read aloud when users navigate into a section of the form, making it clear which part of the form they are interacting with.

::: note Important Note

Legends must be placed inside fieldsets. You need to wrap your legends within a `<fieldset>` element for your HTML to be valid and accessible.

:::

Here's an unrelated example (to keep it brief and simple):

```xml
<fieldset>
  <legend>Payment Method</legend>    
  <label>
    <input type="radio" name="payment" value="card" />
    Credit Card
  </label>

  <label>
    <input type="radio" name="payment" value="paypal" />
    PayPal
  </label>
</fieldset>
```

You can see that the payment option inputs have been grouped within a fieldset, and then described by the `legend` element, informing the user that these elements relate to “*Payment Method*”. You as the developer can then decide if you would like this shown to everyone, or if it’s only for visually impaired users.

For screen readers, they’d hear something like:

> "Group: Payment Method. Credit Card radio button. PayPal radio button."

---

## Do Not Rely on Placeholders Only!

Placeholders are a great addition to make it clear to the user what the input elements are used for, and show helpful information. But they aren’t that user friendly, especially in regards to screen-readers.

The main reasons for this are:

- Placeholders disappear when typing, meaning that if a user begins to type “*Grant*”, and then tabs away from the input when they go back, without a label it will simply read the value of the input, not what it relates to.
- Often developers utilise a grey-like colour for their placeholders, with a low opacity. This can mean it’s difficult for users to sometimes see the placeholder, especially those who are colour blind or visually impaired.

So what can we do instead ? Well this leads me onto our next point - we can use a common HTML element, the `<label/>`.

---

## Adding Labels and Using `htmlFor`

Another accessibility feature we can add to boost our accessibility and user experience for all, is the `htmlFor` attribute combined with the `<label/>` element.

Labels are highly important for both sighted and visually impaired users. It offers clarity as to what the input is associated with, as well as a navigational tool for those using screen-readers.

The `htmlFor` attribute is used to link `<label/>` elements with their input.

::: note

`htmlFor` attributes can only be used on labels and are not valid on any other element.

:::

```tsx
<label htmlFor="fullname" className="text-white">Full Name</label>
<input
  {...register("fullName", {
      required: "Full Name is required"
  })}
  id="fullname"
  aria-required
  type="text"
  placeholder="Full name"
  className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
/>
```

Why this is important for accessibility:

### 1. Screen readers:

When a screen reader lands on the `<input>`, it automatically reads the associated label ("Full Name"). Even if the label is not visually right next to the input, the screen reader still knows which text describes the input, giving you some freedom when designing your forms.

### 2. Click behaviour:

When you click the `<label>`, it automatically focuses the `<input>` when using `htmlFor`.

Users don’t have to click exactly on the tiny input field - and this can certainly be useful when dealing with checkboxes or radio buttons, for example.

In short, big click targets = better usability and faster form filling.

This is also very helpful for mobile users where precision tapping is hard, especially on smaller screens.

---

## Give Additional Information With `aria-describedBy`

Now that we’ve added clear labels to our form fields, we can take accessibility a step further by providing additional guidance for users when errors occur. By using `aria-describedby` and `aria-invalid`, we can link helpful error messages to the input fields and ensure screen readers communicate validation issues clearly. Let’s look at how to implement this:

```tsx
<div>
  <label htmlFor="email" className="text-white">Email</label>
  <input
    {...register("email", {
          required: "You must enter an email address",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Invalid email address",
      },
    })}
    id="email"
    type="email"
    aria-invalid={errors.email ? "true" : "false"}
    aria-describedby={errors.email ? "email-error" : undefined}
    placeholder="Enter your email address"
    className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
  />
  {errors.email && (
    <p id="email-error" className="text-red-500 text-sm mt-1">
      {errors.email.message}
    </p>
  )}
</div>
```

Notice the two new attributes we’ve added:

- `aria-describedBy` - this attribute links our error message with our input. Screen readers will therefore read out the error message whilst reading out other information when the input is focused.
- `aria-invalid` - this attribute again aids with screen readers, informing the user that the input’s value is invalid and they need to correct it. This combined with the `describedBy` attribute gives visually impaired users all the information they need in order to correct their mistake.

---

## Avoid Tooltips for Critical Information

When developing your form, try to avoid tooltips (those little elements that show when you hover over another element for a period of time like below).

![Example of a tooltip showing text that appears when a user hovers over a term.](https://cdn.hashnode.com/res/hashnode/image/upload/v1745685939025/ce427cf1-ef44-4021-b8d3-0095e7a091c6.png)

The problems with using tooltips are:

1. They often require **mouse hover**, which doesn't work on touch devices (for example mobile phones, or tablets).
2. They aren’t announced reliably by screen readers if proper aria labels aren’t added.
3. They disappear too quickly

Instead, we can use inline helper text or descriptions combined with `aria-describedby` like below:

```tsx
<p id="passwordHint" className="text-xs text-gray-500">
  Must be at least 8 characters and include a number.
</p>
```

We can then reference this within our input using the `aria-describedBy` attribute. But wait, we already have a `describedBy` pointing at the error message - well, that’s ok! We can link multiple elements, like the brief example below:

```tsx
// now references both passwordHint and the password error (we seperate the ids with a space)
<input 
  id="password"
  aria-describedby="passwordHint passwordError"
/>

<div id="passwordHint">
  Must be at least 8 characters long.
</div>

<div id="passwordError">
  Passwords do not match!
</div>
```

---

## Tell Me Something Important

`aria-live` is an aria attribute you can add to an element to tell screen readers:

> "Hey, if the content inside me changes, announce it automatically."

It makes dynamic content updates audible without needing the user to re-focus anything.

A basic example could look something like below, where a message which is updated upon submission is updated, it could contain something like:

> “Loading” → “*Hurray, registration complete”*
> 
> or
> 
> ““Pending” → “Registration failed due to many errors”

```tsx
<p aria-live="polite">
  {formSubmissionResultMessage}
</p>
```

When `formSubmissionResultMessage` changes, screen readers will automatically announce the updated message.

The timing of when it is read out depends on the value of the `aria-live` attribute - with `polite`, the announcement waits for a natural pause. With `assertive`, it interrupts immediately.

### Real-World Examples

#### Polite update: good for passive notifications

```tsx
<p aria-live="polite" className="mt-2 text-green-500">
  Form saved successfully.
</p>
```

The screen reader waits for a good moment to say it.

#### Assertive update: good for urgent errors

```xml
<p aria-live="assertive" className="mt-2 text-red-500">
  Passwords do not match!
</p>
```

The screen reader **immediately** interrupts and announces it.

#### Good things to know:

- The element needs to **already exist** in the DOM when the update happens. So it’s smart to always render the `<p aria-live>` - just update its content.
- Don’t overuse `assertive`, or you’ll annoy users and make apps feel super noisy and overwhelming.
    

---

## Focus States and Colouring

You may have noticed on the input elements that I have added some custom colouring with TailwindCSS classes `focus:`. But what is this doing?

Well, this allows us to control the focus colour of the inputs. Without this, the browser will apply its own default styling which may not be as accessible to our users, especially those with colour-blindness.

For example, within our form, without the styling the input with focus looks like this:

![image of the form with a faint white and blue outline around the focussed input](https://cdn.hashnode.com/res/hashnode/image/upload/v1745687500364/4bfa9c86-d908-4f2b-a674-485a1ed15bc3.png)

Here you can see it has applied a subtle white and blue outline - but its not that clear it’s being focused. You can argue it is different enough to other input elements, but for some users this may not be enough.

To combat this and improve usability, we can override this with our own custom colouring. When using TailwindCSS, we can apply the following class names:

```css
focus:outline-none focus:ring-2 focus:ring-red-500
```

### What Does This Do?

This now applies a much thicker red line (encompassing brand colours) as well as making it clearer against the darker background

| **Class name** | Meaning (CSS equivalent) |
| ---: | --- |
| `focus:outline-none` | Remove the outline when the element is focused |
| `focus:ring-2` | On focus, apply a **2px wide ring** (like a border/shadow) |
| `focus:ring-red-500` | Set the ring colour to Tailwind’s `red-500` colour |

![image of form with thick red outline around the focussed input](https://cdn.hashnode.com/res/hashnode/image/upload/v1745687470893/c003c194-5f93-491d-a16e-4d983ea557ac.png)

If you’re not using TailwindCSS, you can accomplish the same with plain CSS like so:

```css
input:focus {
  outline: none; /* no default browser outline */
  box-shadow: 0 0 0 2px #ef4444; /* 2px red ring around input */
}
```

---

## Make Buttons Descriptive

A super simple way to level up your form’s user experience is to make sure your buttons use clear, descriptive text.

Let’s take a look at a few examples of buttons that don’t quite achieve this:

![image showing different poor input buttons](https://cdn.hashnode.com/res/hashnode/image/upload/v1745688682031/54a84908-e0fd-4781-ab83-6c34ab360cae.png)

The above buttons are examples of poor input buttons because:

- “Click Here” doesn’t give any context. Screen reader users, and even sighted users, have no idea what "click here" does without reading nearby text.
- Icon Only: Sighted users *might* guess what the icon means, but screen readers see nothing unless you add `aria-label`. The point is, it is ambiguous and unclear as to what the button does. You may see websites that just use an icon, not surrounded by a button, which can be even more confusing.
- “Submit”: If you have several "Submit" buttons (for example, one for payment, one for contact form), users don't know which "submit" is doing what.

### Improvements

Instead, we can improve those buttons to be more accessible and user-friendly by doing the following:

- **Use descriptive button text** - for example: "Pay Now", "Sign Up", or "Save Changes".
- **Use both an icon and text** - combining an icon with text can be the perfect blend for both accessibility and design.
- **Use** `aria-label` - if you really must use an icon-only button (like a basket or home icon in a navigation bar), make sure to add an `aria-label` attribute to clearly describe the button’s purpose, like so:

```tsx
<button 
  type="submit"
  className="w-full py-3 px-6 rounded-lg bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-white text-lg font-semibold transition"
>
  Pay Now
<button>

<button
  type="submit"
  className="w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-lg font-semibold flex justify-center items-center gap-2 transition">
  <HomeIcon className="h-6 w-6" />
  Home
</button>

<button
  type="submit"
  aria-label="Go to homepage"
  className="w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-lg font-semibold flex justify-center items-center transition">
  <HomeIcon className="h-6 w-6" />
</button>
```

That code would generate the following:

![image showing more accessible buttons from above html](https://cdn.hashnode.com/res/hashnode/image/upload/v1745787493605/e5259e87-f8ee-463f-bc57-662779eea698.png)

---

## Final Thoughts

In this tutorial, we’ve covered various ways to make your forms more accessible and user-friendly. From simple things like making button text clearer and using more user-friendly colours, to more complex HTML attributes like `aria-describedBy` and `aria-live`, you should be covered.

I hope you found this tutorial helpful, and now you’re ready to take your development skills to the next level. Making these simple changes can have a big impact on your users’ experience, and they’ll definitely stick around longer and be less frustrated.

As always, if you’d like to share feedback on the article, discuss it further, or just hear about future articles or content, you can drop me a follow on X (Twitter) via my handle [<FontIcon icon="fa-brands fa-x-twitter"/>`@grantdotdev`](https://x.com/grantdotdev).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create Accessible and User-Friendly Forms in React",
  "desc": "When designing web applications, you’ll often be asked the age old question “How accessible is your website” and “Does it offer the best user experience?”. These are both very valid questions, but they are often overlooked in favour of rich or fancy ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-accessible-and-user-friendly-forms-in-react.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
