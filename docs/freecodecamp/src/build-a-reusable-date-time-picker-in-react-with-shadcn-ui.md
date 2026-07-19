---
lang: en-US
title: "How to Build a Reusable Date-Time Picker in React with shadcn/ui"
description: "Article(s) > How to Build a Reusable Date-Time Picker in React with shadcn/ui"
icon: iconfont icon-shadcn
category:
  - Node.js
  - React.js
  - Shadcn
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
  - shadcn
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Reusable Date-Time Picker in React with shadcn/ui"
    - property: og:description
      content: "How to Build a Reusable Date-Time Picker in React with shadcn/ui"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-reusable-date-time-picker-in-react-with-shadcn-ui.html
prev: /programming/js-shadcn/articles/README.md
date: 2026-07-23
isOriginal: false
author:
  - name: Vaibhav Gupta
    url: https://freecodecamp.org/news/author/vaibhavg/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/7dcddc1c-2a9d-4af7-8f02-ffb76bea2c7b.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Shadcn > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-shadcn/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Reusable Date-Time Picker in React with shadcn/ui"
  desc="A date and time picker is one of those components that looks small in a design file and turns into a real time sink once you start building it. You need a calendar, a time selector, a state that keeps"
  url="https://freecodecamp.org/news/build-a-reusable-date-time-picker-in-react-with-shadcn-ui"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/7dcddc1c-2a9d-4af7-8f02-ffb76bea2c7b.png"/>

A date and time picker is one of those components that looks small in a design file and turns into a real time sink once you start building it. You need a calendar, a time selector, a state that keeps both in sync, and usually a range mode and a translated version somewhere down the line, too.

This guide walks through ready-made picker patterns you can drop into a React project today: a combined date and time picker, a date range picker, and a time picker.

Every one of these is available as a [<VPIcon icon="iconfont icon-shadcn"/>Shadcn Date Picker](https://shadcnspace.com/components/date-picker) component you can install with a single CLI command instead of building from scratch.

These components are built on both Radix and Base UI primitives, and the versions below use Base UI. They also support copy-prompt functionality, so you can paste them straight into v0, Lovable, or Bolt if that's part of your workflow.

::: note Prerequisites

To follow along, you should know:

- The basics of React, including `useState` and props
- How to install components with the shadcn/ui CLI
- Basic Tailwind CSS class names

You also need a React project with shadcn/ui already set up. If you haven't done that yet, run the shadcn/ui CLI setup command in your project before continuing.

:::

::: info What You'll Build

- A `DateTimePicker` component that combines a calendar and time slots into one value.
- A `TimePicker` variant that reuses the same time-slot logic without a calendar.
- A `DateRangePicker` that lets a user pick a start and end date.

:::

---

## How to Install a Shadcn Date Time Picker

All the components below install through the same CLI pattern. Pick the package manager you use:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-pnpm"/>

```sh
pnpm dlx shadcn@latest add @shadcn-space/date-picker-01
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npx shadcn@latest add @shadcn-space/date-picker-01
```

@tab <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn dlx shadcn@latest add @shadcn-space/date-picker-01
```

@tab <VPIcon icon="iconfont icon-bun"/>

```sh
bunx --bun shadcn@latest add @shadcn-space/date-picker-01
```

:::

Every other component below installs the same way: just swap the package name at the end of the command. If you haven't set up the CLI in your project yet, this [<VPIcon icon="iconfont icon-shadcn"/>getting-started guide](https://shadcnspace.com/docs/getting-started/how-to-use-shadcn-cli) covers that first and shows how to integrate these components when you're working through an MCP-connected editor.

---

## How to Build a Date and Time Picker

This is the combined picker: a calendar popover for the date, plus start and end time fields, wrapped around a booking confirmation flow.

**Component code:**

```jsx :collapsed-lines title="components/shadcn-space/date-picker/date-picker-01.tsx"
"use client";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DateAndTimePickerDemo = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [bookingStatus, setBookingStatus] = useState<
    "idle" | "loading" | "success"
  >("idle");

  const handleBooking = () => {
    setBookingStatus("loading");
    setTimeout(() => setBookingStatus("success"), 1500);
  };

  return (
    <>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="date" className="text-sm font-semibold">
            Select Date
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              onPointerDown={() => setBookingStatus("idle")}
              render={
                <Button
                  variant="outline"
                  id="date"
                  className={cn(
                    "w-full justify-start text-left font-normal h-10 transition-all hover:bg-muted/50 cursor-pointer",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                  {date ? format(date, "PPP") : <span>Select a date</span>}
                  <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              }
            />
            <PopoverContent
              className="w-auto p-0 border-muted-foreground/10 shadow-2xl"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  setDate(d);
                  setOpen(false);
                }}
                className="rounded-md border-none"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label
              htmlFor="time-from"
              className="text-sm font-semibold text-muted-foreground flex items-center gap-1.5"
            >
              <Clock className="size-3.5" /> Start Time
            </Label>
            <Input
              type="time"
              id="time-from"
              defaultValue="09:00"
              className="h-10 bg-background appearance-none transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="time-to"
              className="text-sm font-semibold text-muted-foreground flex items-center gap-1.5"
            >
              <Clock className="size-3.5" /> End Time
            </Label>
            <Input
              type="time"
              id="time-to"
              defaultValue="10:00"
              className="h-10 bg-background appearance-none transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <Button
          className="w-full h-11 font-semibold transition-all group overflow-hidden relative cursor-pointer"
          onClick={handleBooking}
          disabled={!date || bookingStatus !== "idle"}
        >
          {bookingStatus === "idle" && (
            <span className="flex items-center gap-2">Confirm Meet</span>
          )}
          {bookingStatus === "loading" && (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Processing...
            </div>
          )}
          {bookingStatus === "success" && (
            <span className="flex items-center gap-2 animate-in zoom-in-50 duration-300">
              <Check className="h-4 w-4" />
              Meet Scheduled!
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default DateAndTimePickerDemo;
```

### How This Component Works

This component combines three pieces of state into a simple booking flow:

- The selected date
- Start and end times
- The booking status (idle, loading, success)

The date is stored using React state:

```jsx
const [date, setDate] = useState<Date | undefined>(undefined);
```

When a user selects a day from the calendar, the `onSelect` callback updates the state and closes the popover:

```jsx
onSelect={(d) => {
  setDate(d);
  setOpen(false);
}}
```

The calendar itself lives inside a `Popover`, which keeps the UI compact. Clicking the trigger button opens the calendar panel:

```jsx
<Popover open={open} onOpenChange={setOpen}>
```

The displayed date uses `date-fns` formatting:

```plaintext
format(date, "PPP")
```

This converts a JavaScript `Date` object into a readable format such as:

```plaintext
July 22, 2026
```

The time fields use native HTML inputs:

```jsx
<Input type="time" />
```

Native time inputs provide built-in browser support, mobile pickers, keyboard accessibility, and locale-aware formatting without additional libraries.

The booking button demonstrates how UI state can change during an async action:

```plaintext
"idle" → "loading" → "success"
```

In a real application, `handleBooking()` would typically call an API endpoint instead of using `setTimeout`.

This pattern works well for:

- Meeting schedulers
- Appointment systems
- Interview booking tools
- Event registration forms
- SaaS scheduling workflows

---

## How to Build a Date Range Picker

For anything involving a stay, a rental, or a multi-day booking, you need a range instead of a single date. This component pairs a two-month calendar view with a formatted range label and a computed night count.

Install this Shadcn Date Range Picker with:

```sh
npx shadcn@latest add @shadcn-space/date-picker-02
```

**Component code:**

```jsx :collapsed-lines title="components/shadcn-space/date-picker/date-picker-02.tsx"
"use client";
import * as React from "react";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

const DateRangePickerDemo = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <div className="grid gap-3 max-w-sm mx-auto">
      <Label htmlFor="date-range" className="text-sm font-medium px-1">
        Select Travel Dates
      </Label>
      <div className={cn("grid gap-2")}>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                id="date-range"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal h-11 transition-all hover:bg-muted/50 focus:ring-2 focus:ring-primary/20 cursor-pointer",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a range</span>
                )}
                <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            }
          />
          <PopoverContent
            className="w-auto p-0 border-muted/20 shadow-xl"
            align="start"
          >
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              className="p-3"
            />
          </PopoverContent>
        </Popover>
      </div>
      <p className="text-xs text-muted-foreground px-1">
        {date?.from && date?.to
          ? `Stay duration: ${Math.round((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))} nights`
          : "Please select a valid date range."}
      </p>
    </div>
  );
};

export default DateRangePickerDemo;
```

### How the Date Range Picker Works

This version switches the Calendar component from single-date mode to range mode:

```js
mode="range"
```

Instead of storing one `Date`, the component stores a `DateRange` object:

```js
{
  from: Date,
  to: Date
}
```

This makes it easy to work with booking systems, hotel stays, travel forms, and rental applications.

The component displays two calendar months:

```js
numberOfMonths={2}
```

Showing two months reduces navigation and improves the selection experience for longer stays.

The stay duration is calculated directly from the selected dates:

```js
(date.to.getTime() - date.from.getTime())
```

This avoids additional libraries and keeps the logic simple.

Compared to the first example:

- Uses `DateRange` instead of a single `Date`
- Uses `mode="range"`
- Displays two months
- Adds derived data like total nights

---

## How to Build a Time Picker

Not every form needs a calendar. This one wraps the native in an InputGroup with a clock icon that triggers the browser's own time picker UI on click.

Install this Shadcn Time Picker with:

```sh
npx shadcn@latest add @shadcn-space/date-picker-03
```

**Component code:**

```jsx :collapsed-lines title="components/shadcn-space/date-picker/date-picker-03.tsx"
"use client";
import { useRef } from "react";
import { Label } from "@/components/ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Clock8Icon } from "lucide-react";

const TimePickerWithIconDemo = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleShowPicker = () => {
    if (inputRef.current && "showPicker" in inputRef.current) {
      try {
        inputRef.current.showPicker();
      } catch (error) {
        console.error("Failed to open native picker:", error);
      }
    }
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="time-picker">Select Slot</Label>
      <InputGroup>
        <InputGroupAddon
          align="inline-start"
          className="cursor-pointer hover:text-foreground transition-colors"
          onClick={handleShowPicker}
          title="Open time picker"
        >
          <Clock8Icon className="size-4" />
        </InputGroupAddon>
        <InputGroupInput
          ref={inputRef}
          type="time"
          id="time-picker"
          step="1"
          defaultValue="08:30:00"
          className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </InputGroup>
    </div>
  );
};
export default TimePickerWithIconDemo;
```

### How the Time Picker Works

This component uses the browser's native time picker instead of building a custom dropdown.

The input is referenced with `useRef`:

```js
const inputRef = useRef<HTMLInputElement>(null);
```

This allows the icon button to access the input element directly.

When users click the clock icon, the browser's picker opens programmatically:

```js
inputRef.current.showPicker();
```

The `showPicker()` method is a modern browser API that opens the same interface users would see if they clicked the input manually.

The component wraps the input inside an `InputGroup`:

```jsx
<InputGroup>
```

This creates a cleaner layout where the icon behaves as part of the field rather than a separate button.

The browser's default picker icon is hidden:

```plaintext
[&::-webkit-calendar-picker-indicator]:hidden
```

This prevents duplicate icons and gives full control over the UI.

The benefit of this approach is that it keeps:

- Native accessibility
- Mobile keyboard support
- Locale-aware formatting
- Better browser compatibility

Instead of rebuilding time selection from scratch, the component improves the native experience with custom styling.

![Live Preview of the Components](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/f815455d-9f2d-4ad1-ac9c-155c37aae094.gif)

::: important Key Concepts Recap

- **Pick the pattern that matches the data you're collecting**: A single date and time for bookings, a range for stays, a bare time field for slots.
- **Every component installs the same way**: One CLI command per component: `pnpm`, `npm`, `yarn`, and `bun`. All are supported. Adding a new picker to a project takes one line, not a manual build.
- **The date and time picker separates date state from time state**, then combines them at the confirmation step. This keeps the calendar and the time inputs from getting out of sync.
- **The range picker leans on the Calendar's built-in** `mode="range"`: The two-month view and the night count come from the selection state, not custom range math.
- **The time picker wraps the native** `<input type="time">` **instead of replacing it**: This keeps native accessibility and mobile keyboard behavior intact.

:::

## Conclusion

You now have working picker patterns for React: a date and time picker for bookings, a date range picker for stays, and a plain time picker for slots.

Each one installs with a single CLI command, so you can pick whichever one matches the form you're building and have it running in minutes.

::: info Resources

<SiteInfo
  name="Introduction"
  desc="shadcn/ui is a set of beautifully-designed, accessible components and a code distribution platform. Works with your favorite frameworks and AI models. Open Source. Open Code."
  url="https://ui.shadcn.com/docs/"
  logo="https://ui.shadcn.com/favicon.ico"
  preview="https://ui.shadcn.com/og?title=Introduction&description=shadcn%2Fui%20is%20a%20set%20of%20beautifully-designed%2C%20accessible%20components%20and%20a%20code%20distribution%20platform.%20Works%20with%20your%20favorite%20frameworks%20and%20AI%20models.%20Open%20Source.%20Open%20Code."/>

<SiteInfo
  name="Modern JavaScript Date Utility Library"
  desc="date-fns provides the most comprehensive yet simple and consistent toolset for manipulating JavaScript dates in a browser & Node.js."
  url="https://date-fns.org/docs/Getting-Started/"
  logo="https://date-fns.org/static/android-icon-192x192.png"
  preview="http://cdn.date-fns.org/card.png"/>

<SiteInfo
  name="Date Picker Component for React | React DayPicker"
  desc="DayPicker is a React component for creating date pickers, calendars, and date inputs for web applications."
  url="https://daypicker.dev/"
  logo="https://daypicker.dev/img/favicon.ico"
  preview="https://daypicker.dev/img/social-card.png"/>

<SiteInfo
  name="ARIA live regions - ARIA | MDN"
  desc="Using JavaScript, it is possible to dynamically change parts of a page without requiring the entire page to reload — for instance, to update a list of search results on the fly, or to display a discreet alert or notification which does not require user interaction. While these changes are usually visually apparent to users who can see the page, they may not be obvious to users of assistive technologies. ARIA live regions fill this gap and provide a way to programmatically expose dynamic content changes in a way that can be announced by assistive technologies."
  url="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

<SiteInfo
  name="4+ Shadcn Date and Time Picker Components for React & Next.js"
  desc="Explore 4+ clean and customizable Shadcn Date and Time Picker components for your React or Next.js project. Built with Tailwind CSS and shadcn/ui for modern forms and booking systems."
  url="https://shadcnspace.com/components/date-picker/"
  logo="https://shadcnspace.com/favicon.ico?favicon.0hiis3chfprji.ico"
  preview="https://shadcnspace.com/images/og-image.png"/>

<SiteInfo
  name="385+ Shadcn Components and Variants"
  desc="Open-source collection of reusable Shadcn components and variants for React apps. Built on Base UI and Radix UI primitives, styled with Tailwind CSS. Preview, copy, or install via the shadcn CLI."
  url="https://shadcnspace.com/"
  logo="https://shadcnspace.com/favicon.ico?favicon.0hiis3chfprji.ico"
  preview="https://shadcnspace.com/images/og-images/OG-components.webp"/>

<SiteInfo
  name="12+ Free Shadcn Date Picker Components for React & Next.js"
  desc="Explore 12+ free Shadcn Date Picker components, including Date & Time, Date Range, Time Picker, and multilingual examples for React & Next.js."
  url="https://wrappixel.com/blog/shadcn-date-picker/"
  logo="https://wrappixel.com/favicon.ico?favicon.0-_m_7w-jkw3n.ico"
  preview="https://wpblog.wrappixel.com/wp-content/uploads/2026/07/12-Best-Free-Shadcn-Date-Picker-Components-for-React-and-Next.js-in-2026.webp"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Reusable Date-Time Picker in React with shadcn/ui",
  "desc": "A date and time picker is one of those components that looks small in a design file and turns into a real time sink once you start building it. You need a calendar, a time selector, a state that keeps",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-reusable-date-time-picker-in-react-with-shadcn-ui.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
