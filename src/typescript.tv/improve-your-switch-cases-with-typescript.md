---
lang: en-US
title: "Improve your switch cases with TypeScript"
description: "Article(s) > Improve your switch cases with TypeScript"
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
      content: "Article(s) > Improve your switch cases with TypeScript"
    - property: og:description
      content: "Improve your switch cases with TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/improve-your-switch-cases-with-typescript.html
prev: /programming/ts/articles/README.md
date: 2021-02-27
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
  name="Improve your switch cases with TypeScript"
  desc="In this tutorial, you will learn how to improve your switch statements and fix certain errors in TypeScript. The article provides tips and tricks, as well as a final code example. Some key takeaways include setting `noImplicitReturns` to `true`, creating a switch case for every valid value, defining a custom return type, and adding a default case to handle unexpected values."
  url="https://typescript.tv/best-practices/improve-your-switch-cases-with-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

In this tutorial, you will learn how to improve your switch statements and fix certain errors in TypeScript. The article provides tips and tricks, as well as a final code example. Some key takeaways include setting `noImplicitReturns` to `true`, creating a switch case for every valid value, defining a custom return type, and adding a default case to handle unexpected values.

In this tutorial Benny shows you simple techniques on how to improve your **switch statements**. Using the tips and tricks from the video, you will never miss a **switch case** again. You will also learn how to fix error **TS2322**, **TS2366** and **TS7030**.

---

## Video

<VidStack src="youtube/8N_P-l5Kukk" />

Errors fixed in the video:

> TS2322: Type 'undefined' is not assignable to type 'number'.
>
> TS2366: Function lacks ending return statement and return type does not include 'undefined'.
>
> TS7030: Not all code paths return a value.

---

## Final Code

```ts title="LoanCalculator.ts"
export enum LoanTerm {
  ONE_YEAR = 'ONE_YEAR',
  TWO_YEARS = 'TWO_YEARS',
  THREE_YEARS = 'THREE_YEARS',
  FOUR_YEARS = 'FOUR_YEARS',
  FIVE_YEARS = 'FIVE_YEARS',
}
 
export interface Loan {
  term: LoanTerm;
  type: 'AUTO_LOAN' | 'HOME_LOAN' | 'REFINANCING';
}
 
export type InterestRate = 1.75 | 2.96 | 3.5 | 5;
 
export function getInterestRate(loan: Loan): InterestRate {
  switch (loan.term) {
    case LoanTerm.ONE_YEAR:
      return 1.75;
    case LoanTerm.TWO_YEARS:
    case LoanTerm.THREE_YEARS:
      return 2.96;
    case LoanTerm.FOUR_YEARS:
      return 3.5;
    case LoanTerm.FIVE_YEARS:
      return 5;
  }
}
 
const interestRate = getInterestRate({ term: LoanTerm.ONE_YEAR, type: 'AUTO_LOAN' });
```

---

## Summary

- Set `noImplicitReturns` to `true` in your `tsconfig.json`
- Create a switch case for every valid value
- Define a custom return type to narrow your function's return values
- Create a `default` case to handle values that might slip in through using your TypeScript code from JavaScript code

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Improve your switch cases with TypeScript",
  "desc": "In this tutorial, you will learn how to improve your switch statements and fix certain errors in TypeScript. The article provides tips and tricks, as well as a final code example. Some key takeaways include setting `noImplicitReturns` to `true`, creating a switch case for every valid value, defining a custom return type, and adding a default case to handle unexpected values.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/improve-your-switch-cases-with-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
