---
lang: en-US
title: "Introducing TanStack Form"
description: "Article(s) > Introducing TanStack Form"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Tanstack
  - Article(s)
tag:
  - blog
  - master.dev
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - tanstack
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Introducing TanStack Form"
    - property: og:description
      content: "Introducing TanStack Form"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/introducing-tanstack-form.html
prev: /programming/js-react/articles/README.md
date: 2026-05-01
isOriginal: false
author:
  - name: Adam Rackis
    url: https://master.dev/blog/author/adamrackis/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/9516
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
  name="Introducing TanStack Form"
  desc="TanStack Form offers a powerful solution for handling form complexity in React. It emphasizes strong typing, performance, and detail management."
  url="https://master.dev/blog/introducing-tanstack-form/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/9516"/>

There’s no shortage of form libraries to help manage the complexity of form handling, particularly in React. In this post, we’ll look at [<VPIcon icon="fas fa-globe"/>TanStack Form](https://tanstack.com/form/latest). Like other TanStack libraries, Form takes strong typing and performance seriously. It’s also detail-oriented and has planned for every imaginable edge case.

---

## Complexity?

Forms are a notoriously annoying part of React. They seem simple at first: just create some basic state for each input, wire up your controlled inputs, and that’s that. But of course you’ll need validation. And you’ll probably want to add some niceties, like clearing validation errors as a user types into an invalid field. And you’ll probably not want to dump your entire form into one component, so you’d just pass around all those state values. Or put them into context. Or you could use uncontrolled form inputs, in which case you don’t need those state values, but now you’ll be dealing with raw DOM elements for all your inputs.

Manually managing your own forms always starts simple, but quickly becomes a pain. Let’s look at how to manage it all with TanStack Form.

---

## Our First Form

Let’s jump in. We’ll build a form to manage a Product of this structure:

```ts
export interface Product {
  name: string;
  price: number | string;
  added?: Date;
  description: string;
  skuNumber: string;
  metadata: { name: string; value: string }[];
}

const defaultProduct: Product = {
  name: "",
  price: 0,
  added: undefined,
  description: "",
  skuNumber: "",
  metadata: [],
};
```

TanStack Form gives us a `useForm` hook for generating our …*form*.

```ts
const form = useForm({
  defaultValues: defaultProduct,

  onSubmit: async ({ value }) => {
    // ...
  },
});
```

Now we can render our form.

```tsx
<form
  onSubmit={event => {
    event.preventDefault();
    event.stopPropagation();

    form.handleSubmit();
  }}
></form>
```

The `<form>` rendered above is the `form` variable we just created from the `useForm` hook call, *not* a generic HTML `<form>`.

Our `onSubmit` handler prevents the native HTML form behavior, and then calls `form.handleSubmit()` which invokes any validation you define, which we’ll get to, and, if no validation errors are found, invokes the original `onSubmit` callback you passed to the `useForm` hook.

---

## Managing Fields

Let’s look at a single field defined inside our form. We’ll look at the entire `Field`, and then pick it apart.

```tsx
<form.Field
  name="name"
  validators={{
    onSubmit: ({ value }) => {
      if (!value) {
        return "Name is required";
      }
    },
  }}
  children={field => (
    <div>
      <Label htmlFor={field.name}>Product Name</Label>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={event => field.handleChange(event.target.value)}
      />
      {!field.state.meta.isValid && <p className="valid-text">{field.state.meta.errors.join(", ")}</p>}
      {field.state.meta.isPristine && <p className="pristine-text">Pristine</p>}
      {field.state.meta.isTouched && <p className="touched-text">Touched</p>}
      {field.state.meta.isDirty && <p className="dirty-text">Dirty</p>}
    </div>
  )}
/>
```

Let’s start at the very top. We have to specify *which piece* of data our form field is managing, and that’s what the `name` prop is for.

```ts
name = "name";
```

If you’re used to TanStack libraries, you’re probably used to incredibly meticulous static typing, and Form is no different.

When we defined our product:

```ts
const defaultProduct: Product = {
  name: "",
  price: 0,
  added: undefined,
  description: "",
  skuNumber: "",
  metadata: [],
};

// and then ...

useForm({
  defaultValues: defaultProduct,
  // ...
});
```

The structure of the `defaultValues` we provided became the structure of the data our form now collects, and maintains. This means things like our `Field`‘s `name` prop is statically checked, and therefore even autocompleted.

![Field name autocomplete](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/04/img1-1.png?resize=1006%2C310&ssl=1)

Similarly, the *value* associated with any particular form field is also strongly typed, based on those same `defaultValues`.

### Validators

Moving on to validators, have a look at this part:

```ts
validators={{
  onSubmit: ({ value }) => {
    if (!value) {
      return "Name is required";
    }
  },
}}
```

This defines our validation. TanStack Form allows you to specify where validation occurs. I like having these errors show up only after the user tries to submit the form, but you can specify `onChange`, `onBlur`, or even some other more advanced options. See the [<VPIcon icon="fas fa-globe"/>docs](https://tanstack.com/form/latest/docs/framework/react/guides/validation) for more info.

### Rendering the Actual Form Input

How do we actually render the form input? TanStack Form is headless; it gives you the state you need, allowing you to render whatever you want. It does this with a classic React pattern that’s not used quite as often anymore (hooks removed many of its applications), but is no less valuable for use cases exactly like this: render functions.

Some may not know this, but the `children` value passed into a React component does not have to be a React Node: you can also pass a *function* that returns your React node. That’s what this is:

```tsx
<form.Field
  ...
  children={(field) => (
    <div>
      <Label htmlFor={field.name}>Product Name</Label>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
      />
      {!field.state.meta.isValid && <p className="valid-text">{field.state.meta.errors.join(", ")}</p>}
      {field.state.meta.isPristine && <p className="pristine-text">Pristine</p>}
      {field.state.meta.isTouched && <p className="touched-text">Touched</p>}
      {field.state.meta.isDirty && <p className="dirty-text">Dirty</p>}
    </div>
  )}
>
  {/* ... */}
</form.Field>
```

::: note

You don’t *have* to use the `children` prop; you can also pass this function as the actual value in between `<form.Field>` and `</form.Field>`. The two are equivalent. The TanStack Form docs use the `children` prop, but you can use whichever you prefer; they’re identical.

:::

TanStack Form’s `Field` component handles the grunt work of *calling* the function you provide, and it *passes* this function a parameter that has everything we need to render everything.

In this code, I’m rendering a ShadCN `Label`, and `Input`. The field prop passed to my render function gives me a name value, plus a state object that has things like the current value. Naturally, there’s an `onChange` handler we need to invoke with any updated values, but you might wonder why I need to pass an `onBlur` handler. That’s to help some of the field’s state. In the code above, you can see the validation error info attached to the field’s `state.meta` object, but there’s also input state like `isTouched` and `isDirty`. Check the [<VPIcon icon="fas fa-globe"/>the docs](https://tanstack.com/form/latest/docs/framework/react/guides/basic-concepts#field-state) for a full accounting of all these various state values, but `isTouched` indicates whether the user has ever focused-and-blurred your input, and the `onBlur` callback is what makes this work.

---

## Array Fields

Our original data had a metadata field that was an Array.

```ts
export interface Product {
  // ...
  metadata: { name: string; value: string }[];
}
```

Let’s see how TanStack Form manages that. First, we use a `Field` as we have been, but we set its mode to “array.” The “field” in the render prop will have a `pushValue` method for adding an item to the array, as well as a `removeValue` method for removing one of the items by index.

From there, `field.state.value` inside the `Field` component’s render function would be the array itself. We can loop it, and for each item, render *another* field for each item.

Let’s look at the code.

```tsx{12}
<form.Field name="metadata" mode="array">
  {field => (
    <div>
      <Button variant="outline" type="button" onClick={() => field.pushValue({ name: "", value: "" })}>
        Add Metadata
      </Button>
      {field.state.value.map((_, idx) => {
        return (
          <div key={idx}>
            <div>
              <form.Field
                name={`metadata[${idx}].name`}
                validators={{
                  onSubmit: ({ value }) => {
                    if (!value) {
                      return "Name is required";
                    }
                  },
                }}
                children={field => (
                  <div>
                    <Label htmlFor={field.name}>Name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={event => field.handleChange(event.target.value)}
                      placeholder=""
                    />
                    {!field.state.meta.isValid && <p class="text-error">{field.state.meta.errors.join(", ")}</p>}
                  </div>
                )}
              />
            </div>
            <div>
              <form.Field
                name={`metadata[${idx}].value`}
                validators={{
                  onSubmit: ({ value }) => {
                    if (!value) {
                      return "Value is required";
                    }
                  },
                }}
                children={field => (
                  <div>
                    <Label htmlFor={field.name}>Value</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={event => field.handleChange(event.target.value)}
                      placeholder=""
                    />
                    {!field.state.meta.isValid && <p className="text-error">{field.state.meta.errors.join(", ")}</p>}
                  </div>
                )}
              />
            </div>
            <div>
              <Button type="button" onClick={() => field.removeValue(idx)}>
                Remove
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  )}
</form.Field>
```

Notice the `name` on the inner field.

```tsx
name={`metadata[${idx}].name`}`
```

TanStack Form allows, and even type checks, that this is a perfectly valid name.

We can add items to our metadata.

```tsx
<Button
  type="button"
  onClick={() => field.pushValue({ name: "", value: "" })}>
    Add Metadata
</Button>
```

As well as remove them.

```tsx
<Button
  type="button"
  onClick={() => field.removeValue(idx)}>
  Remove
</Button>
```

---

## Referencing Other Field Values

Let’s get a little contrived and pretend that, when entering a product, if the price is > 50, we require a description. Let’s further pretend that whenever `price` has a value > 50, we immediately want to display a helpful message indicating that a description will be required since the price is what it is.

The naive solution won’t work; we can’t just do this:

```tsx
const DescriptionFieldUseStore: FC<{ form: ProductForm }> = (props) => {
  const { form } = props;

  const price = form.getFieldValue("price");
  const descriptionRequired = typeof price === "number" && price > 50;

  // later ...
  {descriptionRequired && <p className="text-yellow-800">Description is required when price is greater than $50</p>}
}
```

The reason is that `form.getFieldValue("price");` is not reactive. This is for performance reasons. If you want to dynamically and reactively get access to other parts of the form, you have a few options.

### `useStore`

The `useStore` hook is one option.

```tsx
import { useStore } from "@tanstack/react-form";
```

This allows you to grab whatever you need reactively.

```tsx
const price = useStore(form.store, state => state.values.price);
```

### `Subscribe`

The other option is the `Subscribe` component. You specify the slice of the form’s state you want, and you’re given a render function with that reactive slice of the form passed in

```tsx
<form.Subscribe selector={(formState) => ({ price: formState.values.price })}>
  {({ price }) => {
    const descriptionRequired = typeof price === "number" && price > 50;
    return (
      <form.Field
        name="description"
        // and so on...
```

Use whichever is more convenient for your particular use case.

---

## Composition

Do we have everything we need? Not really. Our `form` object was created from the `useForm` hook, and we’ve been using that for our `Field` components. `Field` is not a component we import; instead, it’s created on the fly, from the `useForm` hook, and attached to the `form` object returned therefrom. The reason is that all our form fields will be strongly typed, with appropriate names, values, etc.

But we may not want to put our entire form into one big React component if things grow even moderately large. Breaking up our form into smaller components is a great idea, and we could simply pass our `form` object around as needed, as a prop.

But what’s the *type* of this `form` object? Unfortunately, Typescript reports it as:

```tsx
const form: ReactFormExtendedApi<Product, FormValidateOrFn<Product> | undefined, FormValidateOrFn<Product> | undefined, FormAsyncValidateOrFn<Product> | undefined, FormValidateOrFn<Product> | undefined, FormAsyncValidateOrFn<Product> | undefined, FormValidateOrFn<Product> | undefined, FormAsyncValidateOrFn<Product> | undefined, FormValidateOrFn<...> | undefined, FormAsyncValidateOrFn<...> | undefined, FormAsyncValidateOrFn<...> | undefined, unknown>
```

The return type from the `useForm` type is a generic that takes **a lot** of args, and they’re required. These control things like the data in the form, obviously, but also things like validation.

Fortunately, a good understanding of TypeScript can go a long, long way here. Let’s move the call to `useForm` into its own function

```tsx
export const useProductForm = (onSubmit: (value: Product) => void) => {
  return useForm({
    defaultValues: defaultProduct,

    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });
};
```

Now we can leverage some TypeScript helpers and inferred typing to easily get the type we’re looking for.

```tsx
export type ProductForm = ReturnType<typeof useProductForm>;
```

And now we can break up our form into smaller components, and pass the `form` object in correctly.

```tsx
const DescriptionFieldSubscribe: FC<{ form: ProductForm }> = (props) => {
```

---

## Composing Better

Let’s imagine this bit of markup.

```tsx
<div>
  <Label htmlFor={field.name}>Product Name</Label>
  <Input
    id={field.name}
    name={field.name}
    value={field.state.value}
    onBlur={field.handleBlur}
    onChange={event => field.handleChange(event.target.value)}
  />
  {!field.state.meta.isValid && <p className="text-error">{field.state.meta.errors.join(", ")}</p>}
</div>
```

Maybe it’s even more complex than that, and it’s clear that it would make sense to put into a reusable component.

You have a few options.

### The `AnyFieldApi` Type

There’s a nice `AnyFieldApi` type exported from TanStack Form. This faithfully represents *any* field object. The only catch is that the value is typed as any. How could it not? It’s an umbrella type for any field. But in practice, this might be *fine*.

But you can define any components you want, and pass your field in as `AnyFieldApi`, and then just type the `value` prop as needed.

```tsx
const SimpleTextField: FC<{ label: string; field: AnyFieldApi }> = props => {
  const { label, field } = props;

  return (
    <div>
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={event => field.handleChange(event.target.value)}
      />
      {!field.state.meta.isValid && <p className="text-error">{field.state.meta.errors.join(", ")}</p>}
    </div>
  );
};
```

Then:

```tsx
<form.Field
  name="skuNumber"
  validators={{
    onSubmit: ({ value }) => {
      if (!value) {
        return "SKU is required";
      }
    },
  }}
  children={field => <SimpleTextField label="SKU Number" field={field} />}
/>
```

### FieldComponents and useFieldContext

Really, we could end this post here. Everything we’ve seen will cover the overwhelming majority of any use case imaginable. But Form has some advanced features that are at least worth looking at.

Let’s start with some new imports.

```tsx
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
```

This part is a little weird and won’t make complete sense just yet, but we’ll clear it up as we go.

```tsx
const { fieldContext, useFieldContext, formContext } = createFormHookContexts();
```

Let’s now create a reusable form component.

```tsx
const BasicTextField: FC<{ label: string }> = (props) => {
  const { label } = props;
  const field = useFieldContext<string>();

  return (
    <div>
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
      />
      {!field.state.meta.isValid && <p className="text-error">{field.state.meta.errors.join(", ")}</p>}
    </div>
  );
};
```

It’s just a simple component, which takes a `label` as a prop. But notice there’s no `field` prop; instead, we have this:

```tsx
const field = useFieldContext<string>();
```

This says, “grab whatever the current field is, in this form.” And since we can’t rely on inferred typing, since we don’t have direct access to the type, we have to pass a generic argument to let TypeScript know that this is, in fact, a string field.

Now we can tell TanStack about our custom form component and get back a new hook to create our form with.

```tsx
const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { BasicTextField },
  formComponents: {},
});

export const useProductForm = (onSubmit: (value: Product) => void) => {
  return useAppForm({
    defaultValues: defaultProduct,

    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });
};
```

Now we can do everything as before, but when we provide the markup for a field, we have a new option.

```tsx
<form.AppField
  name="name"
  validators={{
    onSubmit: ({ value }) => {
      if (!value) {
        return "Product name is required!";
      }
    },
  }}
  children={(field) => <field.BasicTextField label="Product Name" />}
/>
```

This allows us to attach any custom components directly to our form, which can then access whatever field you’re currently editing.

Form also supports reusing groups of components at the form level. For example, if you had a call to `<form.Subscribe>` and wanted to reuse that entire structure, there are utilities for that (`formComponents`). It’s a variation on the theme we already saw, so check [<VPIcon icon="fas fa-globe"/>the docs](https://tanstack.com/form/latest/docs/framework/react/guides/form-composition) if you’re curious.

For extremely large applications, these features can come in handy and help keep everything organized.

---

## Concluding Thoughts

TanStack Form is a surprisingly pleasant form library. The API is a bit more superficially complex than you might expect, but once you understand how it works, you immediately see its power, and flexibility.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Introducing TanStack Form",
  "desc": "TanStack Form offers a powerful solution for handling form complexity in React. It emphasizes strong typing, performance, and detail management.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/introducing-tanstack-form.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
