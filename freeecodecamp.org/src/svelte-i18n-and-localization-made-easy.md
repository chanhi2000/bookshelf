---
lang: en-US
title: "Svelte i18n and Localization Made Easy"
description: "Article(s) > Svelte i18n and Localization Made Easy"
icon: iconfont icon-svelte
category:
  - Node.js
  - Svelte.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - svelte
  - sveltejs
  - svelte-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Svelte i18n and Localization Made Easy"
    - property: og:description
      content: "Svelte i18n and Localization Made Easy"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/svelte-i18n-and-localization-made-easy.html
prev: /programming/js-svelte/articles/README.md
date: 2024-12-06
isOriginal: false
author: Alex Tray
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1733421094910/f2f91ab6-0717-4135-9f08-719f041471f6.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Svelte.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-svelte/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Svelte i18n and Localization Made Easy"
  desc="Apps are accessible worldwide. This means anyone from anywhere in the world can download your app.  So, if you want to cater to people everywhere, your app needs to support multiple languages.  Fortunately, Svelte is easy to work with, and it makes l..."
  url="https://freecodecamp.org/news/svelte-i18n-and-localization-made-easy"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1733421094910/f2f91ab6-0717-4135-9f08-719f041471f6.jpeg"/>

Apps are accessible worldwide. This means anyone from anywhere in the world can download your app.

So, if you want to cater to people everywhere, your app needs to support multiple languages.

Fortunately, Svelte is easy to work with, and it makes localization (l10n) and internationalization (i18n) quite straightforward.

But it lacks built-in i18n support—so you need to use a library like svelte-i18n or one of the others available. Let’s create a simple Svelte app to demonstrate how localization can be implemented.

We’ll create a welcome screen that can be used in both English and Spanish and then build some more advanced features.

---

## What Makes Svelte Unique?

Similar to [<VPIcon icon="iconfont icon-vuejs"/>Vue i18n](https://centus.com/blog/vue-i18n), Svelte converts code to vanilla JS during the build process. This means your app ships with minimal code and offers excellent performance.

While other frameworks like React and Vue have longer startup times, Svelte’s compilation process changes that. It creates much smaller bundles, and apps run faster by default.

Svelte’s reactive syntax and lightweight nature make it an excellent choice for developers who want efficient, modern applications.

Its minimalism aligns well with the simplicity required in [<VPIcon icon="fas fa-globe"/>cloud development languages](https://v2cloud.com/blog/best-programming-languages-for-cloud-computing), ensuring that applications are lean, scalable, and optimized for cloud environments.

This minimalism also means you may not always have all the required built-in features. But pretty much all the limitations are resolved with the help of external libraries.

---

## How to Localize a Svelte Application

Let’s jump right into creating a Svelte project now. I’ll create the project using the `npm create` command. Run the below commands one by one:

```sh
npm create svelte@latest freecodecamp-localization-demo
cd freecodecamp-localization-demo
npm install
npm install svelte-i18n
```

The `npm create` command will prompt you with a few choices. Here’s what I’ve picked (but you can always adjust this based on your project requirements):

- Skeleton project: Select **Yes**.
- Add TypeScript support: Select **No** (or Yes if you prefer TypeScript).
- Add ESLint for code linting: Select **Yes**.
- Add Prettier for code formatting: Select **Yes**.

Now that we have our project set up, let's create a welcome component that we'll later enhance with translations.

Create a new file called <VPIcon icon="iconfont icon-svelte"/>`Welcome.svelte` in your src directory:

<!-- TODO: svelte로 변경 -->
```vue title="src/Welcome.svelte"
<script>
  export let username;
</script>

<div>Welcome {username}!</div>
```

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfcaW7fLzjbLa5ysYYu5FplhoGeVNmml9An_l0fcbEwQSxvg5mDbh3PY9b7etS6DESM7ZGdO_R5dqcYaDdgMaaQE2d7w1Q8eU4uAtIfKjHfm58buFwM-KLtJ_bv-x3XyqoYIOgfdQ?key=uXnvRGfJpBUiBb7CkgThtLro)

This component takes the username property (that I’ve passed from the App.svelte file) and displays a welcome message.

Simple enough for now, but what if your users speak different languages? Let’s add language support.

---

## Adding Language Support

To do this, we need to create translation files for each language. Start by creating a new directory called <VPIcon icon="fas fa-folder-open"/>`locales` in your <VPIcon icon="fas fa-folder-open"/>`src` folder. Inside the <VPIcon icon="fas fa-folder-open"/>`locales` folder, create two JSON files—<VPIcon icon="iconfont icon-json"/>`en.json` for English and <VPIcon icon="iconfont icon-json"/>`es.json` for Spanish.

```js title="src/locales/en.json"
{
  "hello": "Hello {username}!",
  "buttons": {
    "save": "Save",
    "cancel": "Cancel"
  }
}
```

```js title="src/locales/es.json"
{
  "hello": "¡Hola {username}!",
  "buttons": {
    "save": "Guardar",
    "cancel": "Cancelar"
  }
}
```

These files contain our translation strings.

Notice how we've organized them in a nested structure—this helps manage translations as your app grows.

The {username} and {count} placeholders will be replaced with actual values during runtime when we dynamically (or statically) pass the required values.

Next, we need to tell Svelte how to use these translations. For this, we need an **i18n configuration** file:

```js title="src/i18n.js"
import { register, init } from 'svelte-i18n';

register('en', () => import('./locales/en.json'));
register('es', () => import('./locales/es.json'));

init({
  fallbackLocale: 'en',
  initialLocale: 'en',
});
```

We’ve registered our translation files and set English as both the initial language and fallback language. The fallback language is used when a translation is missing in the selected language.

---

## Updating Components to Use Translations

Now we can update our welcome component to use the text from the JSON file:

<!-- TODO: svelte로 변경 -->
```vue title="src/Welcome.svelte"
<script>
  import {  } from 'svelte-i18n';
  export let username;
</script>

<div>{$('hello', { username })}</div>
```

The `$_` function is a special helper from svelte-i18n that retrieves translated strings.

When we pass { username } as the second argument, it replaces the placeholder in our translation strings with the actual username.

---

## Creating a Language Switcher

How would someone change the language, though? Let's create a simple language selector component:

<!-- TODO: svelte로 변경 -->
```vue title="src/LanguageSelect.svelte"
<script>
  import { locale } from 'svelte-i18n';

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' }
  ];
</script>

<div>
  {#each languages as { code, name }}
    <button on:click={() => locale.set(code)}>{name}</button>
  {/each}
</div>
```

The `bind:value` directive automatically updates the active language when users make a selection.

The locale store from svelte-i18n handles all the behind-the-scenes work of switching languages.

Now let's bring everything together in our main <VPIcon icon="iconfont icon-svelte"/>`App` component:

<!-- TODO: svelte로 변경 -->
```vue title="src/App.svelte"
<script>
  import { waitLocale } from 'svelte-i18n';
  import Welcome from './Welcome.svelte';
  import LanguageSelect from './LanguageSelect.svelte';

  const  username = 'developer';
</script>

{#await waitLocale()}
  <p>Loading...</p>
{:then}
  <main>
    <LanguageSelect />
    <Welcome {username} />
  </main>
{/await}
```

The `waitLocale` function ensures translations are loaded before showing content. This prevents flickering or missing translations when the app first loads.

---

## Adding Advanced Features

As your app grows, you'll need to handle more complex scenarios. Let's look at some common requirements.

### Formatting Numbers and Currencies

Different countries handle numbers and currencies quite differently. So for instance, if you show the figure of a hundred thousand to someone from France, and someone from the USA, you’ll need to show the same figure differently.

France → 100 000,00 $

USA → $100,000.00

You see how the thousands are separated by a space and the decimal by a comma in France? Using the US number format will make it quite confusing for someone from France. Here are a few other examples.

- US uses periods for decimals (1,234.56)
- Many European countries use commas for decimals and periods for thousands (1.234,56)
- Some countries group digits differently (like 1,23,456 in India)

```js title="src/lib/formatUtils.js"
export function formatCurrency(amount, locale, currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount);
}
```

You can now use these formatters in your components:

<!-- TODO: svelte로 변경 -->
```vue title="src/lib/PriceDisplay.svelte"
<script>
  import { formatCurrency } from './lib/formatUtils';
  let price = 1234.56;
  let locale = 'en';
</script>

<p>Price: {formatCurrency(price, locale, 'USD')}</p>
```

With this setup, the app now adapts the currency formats to the different locales based on what outputs you ask from it:

- US: "$1,234.56", "1.2M", "15%"
- German: "1.234,56 €", "1,2 Mio.", "15 %"

### Formatting Dates

Similar to currency and number formats, date are formatted differently across different locales.

So, while the US uses MM/DD/YYYY, many European countries use DD/MM/YYYY, and Japan often uses YYYY年MM月DD日.

Luckily, we don’t need to handle this manually. Similar to currency formatting, we have the `Intl.DateTimeFormat` function that accepts the locale and date in numeric format and returns the appropriately formatted date.

```js title="src/lib/dateUtils.js"
export function formatDate(date, locale) {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}
```

You can now use this function in your Svelte app to display the dates correctly for each locale:

<!-- TODO: svelte로 변경 -->
```vue title="src/lib/DateDisplay.svelte
<script>
  import { formatDate } from './lib/dateUtils';
  let locale = 'en';
  let today = new Date();
</script>

<p>Today's date: {formatDate(today, locale)}</p>
```

Once implemented, you’ll see the dates get formatted automatically, like below:

- English (US): "September 23, 2024"
- Spanish: "23 de septiembre de 2024"
- German: "23. September 2024"
- Japanese: "2024年9月23日"

### Localizing Images

Don’t forget that localization isn’t just about translating text—your images need attention, too. Culturally relevant visuals, region-specific content like maps or symbols, and adaptable image formats can make all the difference.

#### Dynamic Image Paths

Use Svelte's reactivity to dynamically load images based on the current locale. For example, you can store localized image paths in a JSON file or directly in your i18n configuration:

```json
{
  "en": { "logo": "/images/en/logo.png" },
  "fr": { "logo": "/images/fr/logo.png" }
}
```

Then, in your Svelte component:

```svelte
<script>
  import { locale } from 'svelte-i18n';
  import translations from './translations.json';

  $: imagePath = translations[$locale].logo;
</script>

<img src={imagePath} alt="Localized logo" />
```

#### Integrating Alternative Text Localization

Ensure your images' alt attributes are also localized. You can achieve this by adding an additional field in your translations:

```json
{
  "en": { "logoAlt": "Company Logo" },
  "fr": { "logoAlt": "Logo de l'entreprise" }
}

Then bind the localized alt text dynamically
```

```svelte
<img src={imagePath} alt={translations[$locale].logoAlt} />
```

#### Switching SVG Content Dynamically

If you need to localize content within SVGs, such as text or icons or want to [<VPIcon icon="fas fa-globe/>convert to SVG](https://adobe.com/express/feature/image/convert/svg) format, consider using Svelte's templating for seamless integration.

```svelte
<svg>
  <text x="10" y="20">{$t('svgText')}</text>
</svg>
```

This approach ensures your SVGs are directly rendered with localized text.

### Handling Multiple Forms of Pluralization

While many languages have two forms of plurals (singular and plural), there are many languages with more than two forms, and some don’t pluralize. For example:

- Arabic has six forms
- Japanese doesn't pluralize in the same way

We can easily handle these differences using svelte-i18n's ICU message syntax. I’ve also added an example of how you can handle more than two forms when using Arabic.

```js title="src/locales/en.json"
{
  "items": {
    "count": "{count, plural, =0 {No items} one {1 item} other {{count} items}}"
  }
}
```

```js title="src/locales/es.json"
{
  "items": {
    "count": "{count, plural, =0 {Sin elementos} one {1 elemento} other {{count} elementos}}"
  }
}
```

```js title="src/locales/ar.json"
{
  "items": {
    "count": "{count, plural, =0 {لا عناصر} one {عنصر واحد} two {عنصران} few {# عناصر} many {# عنصر} other {# عنصر}}",
  }
}
```

Now, let's create the pluralization component for our Svelte app where a button increments the count with every click.

<!-- TODO: svelte로 변경 -->
```vue title="src/lib/ItemCounter.svelte"
<script>
  import {  } from 'svelte-i18n';
  let count = 0;
</script>

<p>{$('items.count', { count })}</p>
<button on:click={() => count++}>Add Item</button>
<button on:click={() => count--} disabled={count === 0}>Remove Item</button>
```

With this implemented, your app is fully ready to handle pluralization dynamically (as you’ll notice by clicking on the **Add item** button).

### Handling Missing Translations

Sometimes, translations for certain keys might be missing. This can happen due to oversight, dynamic content, or incomplete translation files. To handle such scenarios gracefully, set up error handling using the **missingKeyHandler** option in **svelte-i18n**.

```js
import { register, init } from 'svelte-i18n';

register('en', () => import('./locales/en.json'));
register('es', () => import('./locales/es.json'));

init({
  fallbackLocale: 'en',
  initialLocale: 'en',
  missingKeyHandler: (locale, key) => {
    console.warn(`Missing translation: ${key} (${locale})`);
    return key; // Display the key itself when translation is missing
  }
});
```

This code logs a warning when a translation is missing and displays the key instead of showing nothing.

---

## Making Your App Production-Ready

When preparing your app for real-world users, optimize it for localization by automatically detecting the user’s language.

You can use the browser’s `navigator.language` property to set the initial locale:

```js
import { init, getLocaleFromNavigator } from 'svelte-i18n';

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
});
```

---

## Best Practices for Scaling Your Localization

- **Organize translations**: Group related translations logically (for example, buttons, menus, notifications) and use consistent naming patterns for keys.
- **Use a translation management platform:** As your app grows, handling translation files manually starts becoming cumbersome. [<VPIcon icon="fas fa-globe"/>Translation management platforms](https://centus.com/) are purpose-built to solve this exact issue and help save hours every day, make it easy to collaborate on projects, and keep track of progress.
- **Thorough testing**: Test your app with real users across all supported languages. You also need to keep in mind the text length changes to avoid issues with layouts, especially with languages like German or Arabic, which can expand text significantly.
- **Cultural considerations**: Adapt your app for cultural norms, reading directions (for example, RTL for Arabic), and regional preferences (for example, date and currency formats).

---

## Wrapping Up

Localization might feel like a big task at first, but it’s totally worth it. It lets you reach more people and makes your app more inclusive.

Svelte and svelte-i18n streamline the process and keep it fun as you build your skills.

To keep it simple, start with the basics, such as adding translations and a language switcher. Advanced features like handling dates, currencies, and pluralization can follow as you gain confidence.

Take your time, test thoroughly, and build an app that feels natural for all the users you serve!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Svelte i18n and Localization Made Easy",
  "desc": "Apps are accessible worldwide. This means anyone from anywhere in the world can download your app.  So, if you want to cater to people everywhere, your app needs to support multiple languages.  Fortunately, Svelte is easy to work with, and it makes l...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/svelte-i18n-and-localization-made-easy.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
