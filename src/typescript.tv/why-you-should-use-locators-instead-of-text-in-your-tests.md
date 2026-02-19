---
lang: en-US
title: "Why You Should Use Locators Instead of Text in Your Tests"
description: "Article(s) > Why You Should Use Locators Instead of Text in Your Tests"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Why You Should Use Locators Instead of Text in Your Tests"
    - property: og:description
      content: "Why You Should Use Locators Instead of Text in Your Tests"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/why-you-should-use-locators-instead-of-text-in-your-tests.html
prev: /programming/ts/articles/README.md
date: 2025-12-15
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Why You Should Use Locators Instead of Text in Your Tests"
  desc="Learn why using semantic locators like data attributes and ARIA roles makes your tests more robust than text-based selectors. Discover best practices for writing frontend tests in TypeScript with Playwright."
  url="https://typescript.tv/hands-on/why-you-should-use-locators-instead-of-text-in-your-tests"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Learn why using semantic locators like data attributes and ARIA roles makes your tests more robust than text-based selectors. Discover best practices for writing frontend tests in TypeScript with Playwright.

Writing end-to-end tests is crucial for catching bugs before they reach production. But if you're still using text-based selectors like `page.locator('text=Submit')`, your tests might be more fragile than you think. In this article, we'll explore why semantic locators make your frontend tests more robust, maintainable, and accessible.

---

## The Problem with Text-Based Selectors

Let's look at a common testing pattern:

```ts
test('user can submit form', async ({ page }) => {
  await page.goto('/form');
  await page.locator('text=Submit').click();
  await expect(page.locator('text=Success!')).toBeVisible();
});
```

This test works... until it doesn't. Here's what can break it:

### Text Changes

Your product manager decides "Submit" should be "Send" for better UX. Now your test fails, even though the functionality works perfectly.

### Internationalization (i18n)

You add support for multiple languages. Suddenly, your English-based tests fail in German, French, or Japanese environments:

```ts
// This only works in English
await page.locator('text=Submit').click();
 
// But your button now says "Senden" in German
// Test fails ❌
```

### Dynamic Content

Text might be dynamic or include variables:

```ts
// Which exact text will appear?
await expect(page.locator('text=Welcome, John!')).toBeVisible();
// Fails if the username changes or includes special characters
```

### Similar Text

Multiple elements might contain the same text:

```ts
// Which "Delete" button? There are 10 of them in a table!
await page.locator('text=Delete').click();
```

---

## The Solution: Semantic Locators

Instead of relying on user-facing text, use semantic locators that describe the **purpose** of elements, not their content.

### Data Attributes

Add [<VPIcon icon="fa-brands fa-firefox"/>data attributes](https://developer.mozilla.org/docs/Web/HTML/How_to/Use_data_attributes) (like `data-testid`) to your HTML:

```html
<h2 data-testid="404-heading">
  <span class="sr-only">Error</span>
  <span class="text-primary">404</span>
</h2>
<p data-testid="404-message">Sorry, we couldn't find this page.</p>
```

Then use them in your tests:

```ts
test('shows 404 page', async ({ page }) => {
  await page.goto('/nonexistent');
  await expect(page.getByTestId('404-heading')).toBeVisible();
  await expect(page.getByTestId('404-message')).toBeVisible();
});
```

::: info Benefits

- ✅ Survives text changes
- ✅ Works across all locales
- ✅ Clearly indicates test-specific hooks
- ✅ Self-documenting code

:::

### ARIA Roles and Labels

Use semantic HTML and [<VPIcon icon="fa-brands fa-firefox"/>ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles) to make elements discoverable:

```html
<aside role="complementary" aria-label="Error Codes">
  <h2>Error Codes</h2>
  <!-- Sidebar content -->
</aside>
```

Test using Playwright's role-based selectors:

```ts
test('sidebar is visible', async ({ page }) => {
  await page.goto('/errors/ts1234');
  await expect(page.getByRole('complementary', { name: 'Error Codes' })).toBeVisible();
});
```

::: info Benefits

- ✅ Improves accessibility
- ✅ Makes tests more semantic
- ✅ Aligns with web standards
- ✅ Works with screen readers

:::

---

## Best Practices

According to [<VPIcon icon="iconfont icon-playwright"/>Playwright's best practices](https://playwright.dev/docs/best-practices), use locators in this order:

1. **Role-based selectors**: `getByRole('button', { name: 'Submit' })`
2. **Test IDs**: `getByTestId('submit-button')`
3. **Text content** (only when necessary): `getByText('Submit')`

### Use Descriptive Test IDs

Make test IDs descriptive and consistent (following a naming scheme):

```ts
// ✅ Good
data-testid="error-not-found-message"
data-testid="user-profile-avatar"
data-testid="checkout-submit-button"
 
// ❌ Bad
data-testid="msg"
data-testid="div1"
data-testid="button"
```

### Combine Locators

For complex scenarios, combine locators:

```ts
// Find a button within a specific section
await page.getByTestId('user-profile').getByRole('button', { name: 'Edit' }).click();
 
// Find the third delete button in a list
await page.getByTestId('todo-list').getByRole('button', { name: 'Delete' }).nth(2).click();
```

### Test User Flows, Not Implementation

Focus on what users see and do, not internal structure:

::: code-tabs#ts

@tab:active ✅ Good - tests user behavior

```ts
// ✅ Good - tests user behavior
test('user can update profile', async ({ page }) => {
  await page.getByRole('button', { name: 'Edit Profile' }).click();
  await page.getByLabel('Name').fill('John Doe');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByTestId('success-message')).toBeVisible();
});
```

@tab ❌ Bad - tests implementation details

```ts
// ❌ Bad - tests implementation details
test('profile form submits', async ({ page }) => {
  await page.locator('#edit-btn').click();
  await page.locator('input[name="name"]').fill('John Doe');
  await page.locator('form').evaluate((form) => form.submit());
});
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why You Should Use Locators Instead of Text in Your Tests",
  "desc": "Learn why using semantic locators like data attributes and ARIA roles makes your tests more robust than text-based selectors. Discover best practices for writing frontend tests in TypeScript with Playwright.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/why-you-should-use-locators-instead-of-text-in-your-tests.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
