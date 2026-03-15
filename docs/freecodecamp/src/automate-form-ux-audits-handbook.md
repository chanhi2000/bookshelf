---
lang: en-US
title: "How to Automate Form UX Audits: Errors, Hints, and Keyboard Flows"
description: "Article(s) > How to Automate Form UX Audits: Errors, Hints, and Keyboard Flows"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - design
  - system
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Automate Form UX Audits: Errors, Hints, and Keyboard Flows"
    - property: og:description
      content: "How to Automate Form UX Audits: Errors, Hints, and Keyboard Flows"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/automate-form-ux-audits-handbook.html
prev: /academics/system-design/articles/README.md
date: 2026-03-20
isOriginal: false
author:
  - name: Oleh Romanyuk
    url: https://freecodecamp.org/news/author/OlehRomanyuk/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/5bf2b730-1a9f-46e9-9809-b63926589f00.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Automate Form UX Audits: Errors, Hints, and Keyboard Flows"
  desc="Forms are often the gatekeepers to conversions on a site or application. Abandoned carts, partially signed-up users, and users who stop engaging with your app are often thanks to friction with forms. "
  url="https://freecodecamp.org/news/automate-form-ux-audits-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/5bf2b730-1a9f-46e9-9809-b63926589f00.png"/>

Forms are often the gatekeepers to conversions on a site or application. Abandoned carts, partially signed-up users, and users who stop engaging with your app are often thanks to friction with forms.

People will also abandon a site when they don’t understand an error message, can’t navigate through fields easily, or can’t get the help they need right away.

This guide will show you how to create automated systems that detect these issues before your users do. Together, we'll write code that systematically checks your forms so you don’t have to go through each field by hand in the hopes of finding problems.

Here's what we'll build together:

- Scripts that confirm your error messages are helpful and specific rather than generic and annoying.
- Automated checks that guarantee the hint text appears in the appropriate location and at the appropriate time.
- Tests to ensure keyboard users can navigate your forms without becoming lost or stuck.
- A comprehensive audit system that performs these checks automatically and provides you with a list of fixes ranked in order of priority.
- Integration with your development process so that each time you make a code change, these checks are performed.

By the end of this handbook, you'll know how to:

- Configure automated audits for any application form.
- Verify error messages against accessibility guidelines and usability best practices.
- Make sure the hint text aids users rather than confounds them.
- Verify that all users can finish your forms by testing the keyboard navigation.
- Link audit findings to actual business metrics, such as conversion rates.
- As part of your deployment procedure, run these audits automatically.

You can run the functional JavaScript code in each section right away. Because the examples use vanilla JavaScript, they can be used with any framework, including React, Vue, Angular, or simply HTML. Although you don't have to be an expert, you should be able to follow along with JavaScript to get this most out of this guide.

---

## Why Should You Automate Form Audits in the First Place?

Manual testing will typically find easy problems. But it may miss the systematic issues with forms across your entire application. You know the type of errors I’m talking about – those that don’t state incorrect values, missing keyboard support for fields, or hints that don’t have a clear place for help based on static design.

Research on user experience design shows that an effective UX can be strategically built, refined, or designed by using continuous feedback loops (Source: [<VPIcon icon="fas fa-globe"/>Okonkwo, Research Gate](https://researchgate.net/publication/382804453_Assessment_of_User_Experience_UX_Design_Trends_in_Mobile_Applications)). Automated audits are a good way of putting this into practice, as they can help you find issues at scale before you release your product.

The key advantage here is coverage. You can prepare form UX audit basics so you and your teammates can check every form field, validation rule, and keyboard interaction in a systematic way.

::: important Key Form Components to Audit

Before we create our roadmap for the UX audit, let’s talk about the three main elements of forms that typically have issues:

- **Error states** indicate what went wrong, as well as how to fix it. The clearer they are, the better: the confusion of generic messages like "Invalid input" frustrates users. In contrast, specific feedback like "Email must contain @ symbol" is specific enough to help them get things completed.
- **Hint text** helps prevent errors before users can input anything. Proactive guidance like "Password must contain 8+ characters" provides realistic expectations. Placing hint text in the right location and conveying its message at the appropriate time also determines how useful the hint text will be.
- **Keyboard flows** distinguish accessible forms from broken forms. Tab order, focus order, and keyboard shortcuts dictate whether a user can complete their form without a mouse.

:::

To guide you through the audit workflow for each component, we’ll focus on three user flows: a sign-up form, checkout, and a contact form. All of these affect the conversion rate of a product’s users. And each of these elements maps to multiple metrics you can track.

We’ll use Nielsen Norman Group's 10 usability heuristics[^1] as a foundation while incorporating any data indicators. These heuristics are:

[^1]: Source: [<VPIcon icon="fas fa-globe"/>Jakob Nielsen, NNgroup](https://nngroup.com/articles/ten-usability-heuristics/)

- **System status visibility**: Users should always be aware of what's going on thanks to prompt feedback
- **System and real-world match**: Use the user's language instead of technical terms
- **User freedom and control**: Enable users to quickly correct errors
- **Consistency and standards**: Adhere to platform norms so users don't have to question whether various terms or behaviors have the same meaning.
- **Error prevention**: Design to stop issues before they start
- **Recognition rather than recall**: Show options rather than making users memorize details.
- **Flexibility and efficiency of use**: Provide shortcuts for experienced users while keeping things simple for beginners.
- **Aesthetic and minimalist design**: Don't clutter interfaces with irrelevant information.
- **Help users recognize, diagnose, and recover from errors**: Error messages should clearly explain the problem and suggest a solution.
- **Help and documentation**: Provide easy-to-search help when needed.

For form audits, we'll focus especially on heuristics #5 (error prevention through hint text), #6 (making requirements visible), and #9 (clear error recovery). These directly affect whether users can complete forms successfully.

There’s one more important thing to note before we proceed. For each component, you’ll want to identify what tests you can automate as part of your test case. For each form component, start building checks programmatically for several criteria:

- **Accessibility** – for contrast ratios, ARIA labels, and focus indicators.
- **Performance** – for the time it takes to validate fields and render error messages.
- **Visual consistency** – for error state styling, hint text patterns, and keyboard focus.

We’ll prioritize fixes with a high impact that will help prevent users from abandoning a form. Also, each audit will produce actionable information along with a line of code, acceptance criteria, and example code for fixes.

Now, let’s start building our form UX audit workflow.

---

## How to Define Concise Objectives and Scope

Before you even put your fingers to the keyboard, you'll want to determine what exactly you’re measuring and for what purpose. There’s a golden rule: ambiguous statements will yield ambiguous results. Having specific objectives linked to user behavior and business metrics is what creates actionable audits.

### Identifying Form Types and Objectives

First, you need to know what form you’re going to audit. Let’s start by mapping the three forms that have the greatest direct impact on the success of your application and defining the nuances and objectives of each one.

#### 1. A signup form’s key goal is user acquisition.

Every friction point - like poorly defined password requirements, vague expectations for email formats, and a lack of field labels - means a user will likely abandon the signup process. Your audit must identify these user flows.

#### 2. Checkout forms are aimed at bringing revenue

User engagement improves significantly when applications use user-centered design principles – shocking, right? (Source: [<VPIcon icon="fas fa-globe"/>Okonkwo, ResearchGate](https://researchgate.net/publication/382804453_Assessment_of_User_Experience_UX_Design_Trends_in_Mobile_Applications)). In checkout flows, this means that error messages appear inline, hints show requirements before a user can type, and keyboard navigation follows the expected tab order from shipping to payment fields.

#### 3. Contact forms have the objective of establishing communication

Often, devs pay less attention to contact forms than to transactional forms. But contact forms are crucial for proposal requests, customer support requests, collaboration requests, and so on. A broken contact form can mean lost business.

Now that you’ve identified the type of form and its key objective, let’s do something equally important: link these high-level objectives to specific, measurable metrics.

### Connecting Objectives and Metrics to Track

Every objective for the audit maps to a set of measurements. Here’s how to build this continuum:

#### Error message metrics

Your audit should evaluate whether error messages fulfill three criteria:

1. Specificity (Does the message indicate what the problem is?),
2. Timing (In what context will the user see the error?), and
3. Actionable (Does the message explain what the user should do to recover?).

For example, "password too weak" does not provide actionable information and isn’t specific enough, while "Password must have at least one uppercase character, one number, and one special character" is highly actionable and provides clear information on what the user needs to do.

**You can measure this by tracking two things:** what percentage of your error messages mention the specific field name, and how many errors show up immediately when users leave a field versus only appearing after they hit submit.

#### Hints can reduce user errors before they occur. Your audit should validate:

- Whether a hint’s positioning is proactive (for instance, is the hint text located before users engage the provided input field?).
- Visual proximity (Is the hint text next to the input field?).
- Accessibility (for example, are the hints connected to the fields programmatically using aria-describedby?)

The latter is especially important, as screen readers require explicit connections to announce hints at the correct time. You’ll want to measure these using metrics like the time to display a hint (immediate vs delayed) and the number of ARIA-associated hint elements.

#### Keyboard flow metrics are also directly connected to accessibility

Your audit should define if there is a correct order logic. Do fields follow the visual layout? When the tabindex jumps around sporadically across the screen, users lose context.

It should also determine if the focus visibility is the current field and if that’s clearly indicated. When the focus is invisible or subtle, you end up making your users guess where they are.

Keyboard shortcuts let users submit forms, clear fields, or jump between sections without touching their mouse. Everyone benefits from this, not just people using screen readers or other assistive technology.

You will want to measure these with the tabindex sequence alignment to the visual layout, focus indicator contrast ratios, and by defining if there are keyboard shortcuts for submitting, clearing, and moving about the forms.

Now that you have outlined the key metrics and principles applicable to the form you’re auditing, it’s time to define the specific area you want to focus on.

---

## How to Scope Audit Boundaries

You’ll need to define exactly what forms and fields your audit will cover. You’ll want to start small in order to build working automations and then slowly expand.

### Setting the Initial Scope

You should start with forms in your application’s critical user paths. We’ll use the below JavaScript snippet as an example. Paste this configuration object into your audit automation tool or script:

```js
const auditScope = {
  signupForm: {
    url: '/signup',
    fields: ['email', 'password', 'confirmPassword'],
    priority: 'critical'
  },
  checkoutForm: {
    url: '/checkout',
    fields: ['cardNumber', 'expiryDate', 'cvv', 'billingZip'],
    priority: 'critical'
  },
  contactForm: {
    url: '/contact',
    fields: ['name', 'email', 'subject', 'message'],
    priority: 'high'
  }
};
```

In the code above, the auditScope object lists critical forms (signup, checkout, and contact forms), specifies their URLs along with important fields to check (such as email, password, cardNumber), and lists their priority level. This helps the auditing system see what resources to prioritize.

The priority property allows your audit system to prioritize high-impact forms first when protocol limits the resources available. Such a method prevents your system from being overwhelmed with too broad a scope.

### Setting the Audit Execution Plan

Your objectives dictate how the audit system will act. After you have defined the scope, you can divide the workflow into several definite phases.

- **Phase 1:** Static analysis will address the structure of the HTML document and verify the ARIA attributes, tab indices, and markup patterns for semantic use. This can discover structural issues that require no user interaction.
- **Phase 2:** Dynamic testing simulates user interactions to identify the occurrence of errors, when hints are displayed, and when a keyboard user would navigate to which elements. This can identify runtime problems that were not revealed through static analysis.
- **Phase 3:** Visual verification measures spacing, contrast ratios, or positioning of elements, but using visually computed styles. This allows us to examine the visual design in relation to meeting either UX or UI objectives.

Each phase will result in findings that continually tie back to your defined objectives. In the case of a failed check, the audit report will show which objective contributed to the finding, the current state of the component, the target states, and recommendations for the solution.

### Field-level objectives

For each field, you should tell the script or the automated tool what the audit is actually checking. Each check is a specific automated test. When the audit is executed, every check is confirmed for every field, and failures are noted.

For instance, in the following snippet, for each field we provide (like "email" or "password"), we list three categories of checks: errorChecks, hintChecks, and keyboardChecks. When you link this object to your audit automation system (for example, UI testing frameworks, accessibility checkers), your audit automation system runs all these tests on every field. It will report any test failures so you can see which part of the input is broken or missing.

```js
const fieldObjectives = {
  email: {
    errorChecks: [
      'hasInlineValidation',
      'errorMessageSpecific',
      'showsValidFormatExample'
    ],
    hintChecks: [
      'hintVisibleBeforeInteraction',
      'hintExplainsFormat',
      'hintAccessible'
    ],
    keyboardChecks: [
      'tabOrderCorrect',
      'focusVisible',
      'supportsAutocomplete'
    ]
  },
  password: {
    errorChecks: [
      'hasInlineValidation',
      'listsAllRequirements',
      'showsProgressIndicator'
    ],
    hintChecks: [
      'hintListsRequirements',
      'hintVisibleBeforeTyping',
      'hintPersistsDuringTyping'
    ],
    keyboardChecks: [
      'tabOrderCorrect',
      'focusVisible',
      'supportsPasswordManagers'
    ]
  }
};
```

This leads to a very granular, consistent, and repeatable test of important user input components so you can validate usability, accessibility, and correctness of the form.

### Linking Objectives to Business KPIs

The findings of the audit should link back to business impact. Let’s look at how our objectives map to key performance indicators.

The impact on conversion rate should be direct and specific. For instance, improved error messages directly impact the form completion rate:

- **Baseline**. The current abandonment rate for forms.
- **Target**. Decrease abandonment by 15% due to clear error messages.
- **Audit validation.** 100% of error messages are clear and specific.

Reducing support tickets is another priority. In this case, better hint text provides less confusion:

- **Baseline**. Volume of support requests related to forms currently.
- **Target**. Decrease the number of support tickets by 25%.
- **Audit validation.** 100% of complex fields have proactive hints.

Accessibility compliance is another important goal. Keyboard navigation has a direct impact on the legal compliance and reach of a wider base of users. The example of the KPIs here can be the following:

- **Baseline**. Current level of WCAG conformance.
- **Target**. All forms to be WCAG 2.1 AA compliant.
- **Audit validation.** 100% of fields work with a keyboard only.

After you create such measurable criteria for success, you should actually give them as thresholds to your system. Here’s an example of how you can provide defined measures for passing and failing for the automated audit:

```js
const auditThresholds = {
  errorMessages: {
    specificityScore: 0.9,  // 90% must include field-specific details
    inlineValidationPercentage: 1.0,  // 100% must show inline errors
    actionabilityScore: 0.85  // 85% must include fix instructions
  },
  hintText: {
    proactiveDisplayPercentage: 1.0,  // 100% must appear before interaction
    proximityMaxPixels: 8,  // Hints must be within 8px of fields
    ariaAssociationPercentage: 1.0  // 100% must have aria-describedby
  },
  keyboardFlow: {
    tabOrderCorrectnessScore: 1.0,  // 100% must follow visual layout
    focusContrastRatio: 3.0,  // Minimum 3:1 contrast for focus indicators
    shortcutCoveragePercentage: 0.8  // 80% of actions must have shortcuts
  }
};
```

As you can see, under errorMessages, the specificityScore of 0.9 states that 90% of error messages must include details specific to each field. Also, within the hintText directions, the proactiveDisplayPercentage of 1.0 demands that the hints appear before the user starts typing, not after, for the test to be passed.

### The 5Cs Framework for Audit Documentation

When you document your audit results, use the 5Cs framework to make sure your reports are actually useful:

- **Coverage**: Which forms and fields did you test? Be specific about the scope.
- **Completion**: Did you run all the planned checks? Note any that were skipped and why.
- **Consistency**: Do your results use the same format and terminology throughout? This makes reports easier to scan.
- **Clarity**: Can a developer read the failure report and know exactly what to fix? Include the current state, expected state, and code examples.
- **Correctness**: Are your checks testing the right things? Validate that failures match real user problems, not just technical violations.

This framework helps both designers and developers understand audit results and take action quickly.

---

## How to Incorporate Heuristic Evaluation and Quantitative Data

Once you've established objectives, you’ll want to base your audit on the usability principles and behavior patterns of users. This combination of established usability heuristics along with quantitative data can help you verify that your automated checks are surfacing issues that users actually experience – and not fictional edge cases[^2].

[^2]: Source: [<VPIcon icon="fas fa-globe"/>Jakob Nielsen, NNgroup](https://nngroup.com/articles/ten-usability-heuristics/)

The best way to do this is to map the issues to the common standard of the Web Content Accessibility Guidelines and use that as the basis for your audit (Source: [<VPIcon icon="iconfont icon-w3c"/>WCAG 2.1, W3C Recommendation](https://w3.org/TR/WCAG21/)). For every identified problem, identify the WCAG success criteria that the issue violates. This will give you clear requirements that you can use as an automated check and that should be commonly understood by everyone working on the audits.

In the automated script, you can use the following code to map these guidelines:

```js
const wcagMapping = {
  errorIdentification: {
    criterion: '3.3.1',
    level: 'A',
    requirement: 'Error messages must identify the item in error',
    testFunction: 'checkErrorIdentification'
  },
  errorSuggestion: {
    criterion: '3.3.3',
    level: 'AA',
    requirement: 'Error messages must provide suggestions for correction',
    testFunction: 'checkErrorSuggestions'
  },
  labelInName: {
    criterion: '2.5.3',
    level: 'A',
    requirement: 'Accessible name must contain visible label text',
    testFunction: 'checkLabelInName'
  },
  focusOrder: {
    criterion: '2.4.3',
    level: 'A',
    requirement: 'Focus order must preserve meaning and operability',
    testFunction: 'checkFocusOrder'
  }
};
```

If any part of the form violates WCAG 3.3.1 – perhaps it doesn’t identify the field when it provides an error – your audit report can document it as follows:

"The error message displayed on the email field said 'Invalid input' but didn’t identify the requirement it didn't meet. WCAG 3.3.1 states that the error must identify the field with the error (potential fix: 'Email must have an @ symbol'). 3.3.1 is the mapped criteria."

Nielsen's heuristics tell you what good usability looks like. But tools like Google Analytics and Hotjar show you what users actually do on your forms. When you combine both – usability principles and real user behavior data – you make better decisions about which problems to fix first.

Research shows this combined approach catches more real issues than either method alone[^3]. Use both types of data to prioritize what your automated audits should check.

[^3]: Sources: [<VPIcon icon="fas fa-globe"/>Souza and others, IEEE Access](https://researchgate.net/publication/334385231_User_Experience_Evaluation_Using_Mouse_Tracking_and_Artificial_Intelligence)

### Define Binary Pass/Fail Criteria

Automation requires clear results. Your audit must document whether a component passed or failed its WCAG criteria. The process must yield binary results – yes/no, positive/negative.

For instance, the following code incorporates a definite, binary audit check to verify whether a form field is compliant with WCAG 3.3.1 criteria for error identification (Source: [<VPIcon icon="iconfont icon-w3c"/>WCAG 2.1, W3C Recommendation](https://w3.org/TR/WCAG21/)):

```js
function checkErrorIdentification(field) {
  const errorElement = field.querySelector('[role="alert"], .error-message');
  
  if (!errorElement) {
    return {
      pass: false,
      wcag: '3.3.1',
      severity: 'critical',
      message: `Field "${field.name}" lacks error message element`,
      fix: 'Add aria-describedby pointing to error container'
    };
  }
  
  const errorText = errorElement.textContent.trim();
  const hasFieldReference = errorText.toLowerCase().includes(field.name.toLowerCase()) 
    || errorText.toLowerCase().includes(field.labels[0]?.textContent.toLowerCase());
  
  if (!hasFieldReference) {
    return {
      pass: false,
      wcag: '3.3.1',
      severity: 'major',
      message: `Error message "${errorText}" doesn't identify field`,
      fix: `Include field name in error: "\({field.labels[0]?.textContent} \){errorText}"`
    };
  }
  
  return { pass: true, wcag: '3.3.1' };
}
```

The error message identified the error, and each component definitively passes or fails the criterion. There’s no room for interpretation or doubt.

### Standardize Error Messages and Hint Messages

Keep in mind that automated functions require familiarity and consistency. You can create centralized repositories with libraries of accepted usage patterns and approval that developers can refer to, and your tests can check that your forms are using standardized messages.

For example, in the following snippet, the errorLibrary object provides a single source of truth for every acceptable error message your application will display for specific fields. For each field, there are appropriately defined message strings for common validation issues (like empty, invalid, duplicate). Similarly, the hintLibrary object provides a single source of truth for every hint text that prefaces user input.

```js
const errorLibrary = {
  email: {
    empty: 'Email address is required',
    invalid: 'Email must include @ symbol and domain (example: user@domain.com)',
    duplicate: 'This email is already registered. Try signing in instead.'
  },
  password: {
    empty: 'Password is required',
    tooShort: 'Password must be at least 8 characters',
    missingUppercase: 'Password must include at least one uppercase letter',
    missingNumber: 'Password must include at least one number',
    missingSpecial: 'Password must include at least one special character (!@#$%^&*)'
  }
};

const hintLibrary = {
  email: 'Enter your email address (example: name@company.com)',
  password: 'Create a password with 8+ characters, including uppercase, number, and special character',
  phone: 'Enter 10-digit phone number without dashes (example: 5551234567)'
};
```

By having a single source of these patterns, you won’t run the risk of writing duplicate or misaligned messages in different areas across the app, increasing maintainability.

### Utilize Definite ARIA Identifiers

If you use consistent ARIA attributes, you can automate checks. As an example, in the following snippet, we explicitly define which ARIA attributes connect error messages, hints, and fields. The auditARIAImplementation function checks whether each field has an accessible label (either an HTML element or an aria-label attribute) to meet WCAG 1.3.1. Without it, users will likely find it hard to identify the purpose of the input.

```js
function auditARIAImplementation(field) {
  const checks = {
    hasLabel: !!field.labels?.length || !!field.getAttribute('aria-label'),
    hasDescription: !!field.getAttribute('aria-describedby'),
    hasErrorMessage: !!field.getAttribute('aria-errormessage'),
    hasRequired: field.hasAttribute('required') || field.getAttribute('aria-required') === 'true'
  };
  
  const failures = [];
  
  if (!checks.hasLabel) {
    failures.push({
      wcag: '1.3.1',
      message: `Field "${field.name}" lacks accessible label`,
      fix: 'Add <label> element or aria-label attribute'
    });
  }
  
  if (!checks.hasDescription) {
    failures.push({
      wcag: '3.3.2',
      message: `Field "${field.name}" lacks hint text association`,
      fix: 'Add aria-describedby pointing to hint element ID'
    });
  }
  
  if (field.dataset.validatable && !checks.hasErrorMessage) {
    failures.push({
      wcag: '3.3.1',
      message: `Validatable field "${field.name}" lacks aria-errormessage`,
      fix: 'Add aria-errormessage attribute pointing to error container ID'
    });
  }
  
  return {
    pass: failures.length === 0,
    failures
  };
}
```

This function checks for specific ARIA-tied patterns that your design system prescribes. The great thing is that you can check the code in CI/CD pipelines to maintain implementation standards.

The next section will help you identify specific automated test cases for errors, hints, and keyboard flows.

---

## How to Define Automated Test Cases for Form Components

Now that you've established a baseline with WCAG standards, heuristics, and user data, you can create specific automated test cases. Each test case targets a measurable quality for the error messages, hint text, or keyboard navigation functionality of each form component. The following sections will provide concrete ways to automate these checks for each form component.

### Automated Error Message Checks

Error messages are crucial conversion points. Your automated checks should ensure that each error message meets the specificity, timing, and actionability criteria. Every error message must convey what exactly has gone wrong. Generic error messages don’t pass this quality check.

For automation, your checks can provide insight as to whether the error message references the specific construction of the field. For instance, in the following snippet, the method verifies that every error message that appears in a form serves to pinpoint the input problem, not use a vague general expression.

```js
function auditErrorSpecificity(formId) {
  const form = document.getElementById(formId);
  const fields = form.querySelectorAll('input, textarea, select');
  const failures = [];
  
  fields.forEach(field => {
    const errorElement = document.querySelector(`[aria-describedby="${field.id}-error"]`);
    if (errorElement) {
      const errorText = errorElement.textContent.toLowerCase();
      const genericTerms = ['invalid', 'error', 'wrong', 'incorrect'];
      const isGeneric = genericTerms.some(term => 
        errorText.includes(term) && errorText.split(' ').length < 4
      );
      
      if (isGeneric) {
        failures.push({
          field: field.id,
          message: errorText,
          issue: 'Generic error message lacks specificity',
          wcag: '3.3.1 Error Identification'
        });
      }
    }
  });
  
  return failures;
}
```

It looks through field-specific error messages and flags any that use common generic terms in a short, vague message, as ambiguous messages don’t serve the purposes of WCAG 3.3.1 since they don’t provide an actionable correction for user input (Source: [<VPIcon icon="iconfont icon-w3c"/>WCAG 3.3.1, WC3](https://w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-identified.html)).

### Validation Timing of Inline Messages

Error messages should show the message when the user leaves the field and not just at submission. Research demonstrates that even just the timing of the feedback alone significantly disrupts user performance. Your automation should check whether errors are displayed inline (Source: [<VPIcon icon="fas fa-globe"/>Al-Khalifa and others, ResearchGate](https://researchgate.net/publication/282715275_Soft_Keyboard_UX_Evaluation_An_Eye_Tracking_Study)).

This code verifies that error messages appear immediately when a user leaves a required input field on blur, as opposed to only showing errors after submitting the entire form.

```js
function auditErrorTiming(formId) {
  const form = document.getElementById(formId);
  const fields = form.querySelectorAll('input[required], textarea[required]');
  const failures = [];
  
  fields.forEach(field => {
    let hasBlurValidation = false;
    let hasInputValidation = false;
    
    // Check for blur event listeners
    const blurListeners = getEventListeners(field).blur || [];
    hasBlurValidation = blurListeners.length > 0;
    
    // Check for input event listeners
    const inputListeners = getEventListeners(field).input || [];
    hasInputValidation = inputListeners.length > 0;
    
    if (!hasBlurValidation && !hasInputValidation) {
      failures.push({
        field: field.id,
        issue: 'No inline validation detected',
        recommendation: 'Add blur or input event validation',
        wcag: '3.3.1 Error Identification'
      });
    }
  });
  
  return failures;
}
```

This audit verifies that an event handler which runs against an inline validator is in place for blur and input events on input fields. It also checks that it flags any that fail to have these interactions as a failure under the WCAG 3.3.1 Error Identification guideline (Source: [<VPIcon icon="iconfont icon-w3c"/>WCAG 3.3.1, WC3](https://w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-identified.html)).

### Confirm Actionable Recovery Guidance

Error messages must clarify how to recover from any faults or issues. "Password too weak" fails the user. In contrast, the error message "Password must be 8+ characters, contain at least 1 upper case letter, and one numeric character" gives the user enough information to make the proper adjustment.

Let’s take an example of some code that audits password fields to ensure that the error message includes specific actionable recovery instructions outlining character types or character length and clearly guides users on how to correct input errors (Source: [<VPIcon icon="iconfont icon-w3c"/>WCAG 3.3.3, WC3](https://w3.org/WAI/WCAG21/Understanding/error-suggestion.html)).

```js
function auditErrorActionability(formId) {
  const form = document.getElementById(formId);
  const failures = [];
  const passwordFields = form.querySelectorAll('input[type="password"]');
  
  passwordFields.forEach(field => {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
      const errorText = errorElement.textContent;
      const hasSpecificRequirements = /\d+/.test(errorText) || 
        /uppercase|lowercase|special|character|digit/.test(errorText.toLowerCase());
      
      if (!hasSpecificRequirements) {
        failures.push({
          field: field.id,
          message: errorText,
          issue: 'Error lacks specific recovery guidance',
          wcag: '3.3.3 Error Suggestion'
        });
      }
    }
  });
  
  return failures;
}
```

If the error message doesn’t contain these characters or meet the length requirement, the function will flag the instance as a failure with a corresponding WCAG reference.

### Automated Rich Hint Text Auditing

Rich text hints help prevent errors (and hopefully the need for an error message). Research suggests that users who are given proactive guidance improve form completion by up to 23%[^4]. Your automation should confirm that the right hints appear at the right time, in the right places, with appropriate accessible information and presentation.

[^4]: Source: [<VPIcon icon="fas fa-globe"/>Okonkwo, ResearchGate](https://researchgate.net/publication/382804453_Assessment_of_User_Experience_UX_Design_Trends_in_Mobile_Applications)

This function audits form fields to ensure that hint text is seen before the user interacts with the form, helping avoid user errors while filling out the form.

```js
function auditHintTiming(formId) {
  const form = document.getElementById(formId);
  const complexFields = form.querySelectorAll('input[type="password"], input[pattern]');
  const failures = [];
  
  complexFields.forEach(field => {
    const hintElement = document.querySelector(`[id="${field.getAttribute('aria-describedby')}"]`);
    
    if (!hintElement) {
      failures.push({
        field: field.id,
        issue: 'Complex field missing proactive hint text',
        wcag: '3.3.2 Labels or Instructions'
      });
    } else {
      // Check if hint is visible before interaction
      const computedStyle = window.getComputedStyle(hintElement);
      const isVisible = computedStyle.display !== 'none' && 
        computedStyle.visibility !== 'hidden';
      
      if (!isVisible) {
        failures.push({
          field: field.id,
          issue: 'Hint text hidden until interaction',
          wcag: '3.3.2 Labels or Instructions'
        });
      }
    }
  });
  
  return failures;
}
```

If the hint doesn't exist or doesn’t show until after the user interacts with the form, the function will flag it as a failure to satisfy WCAG 3.3.2 Labels or Instructions for a generally consistent and user-friendly form design (Source: [<VPIcon icon="iconfont icon-w3c"/>WCAG 3.3.3, WC3](https://w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html)).

---

## How to Consistently Confirm Keyboard Navigation Flows

Keyboard accessibility is required for WCAG compliance, and you can automate most of the testing with code. When people can't use your forms with just a keyboard, they often give up and leave. This directly hurts your conversion rates.

When you document how keyboard navigation should work, you can write automated tests to check if it actually works that way.

### Outlining the Interactions

Your audit should document expected keyboard interactions for each component. If there's a modal dialog, note that Tab will cycle through the elements within the modal, Escape closes the modal, and the focus returns to the element that opened the modal.

For forms, note that Tab advances through the fields in visual order, Shift+Tab will go back, and Enter will submit the form from the submit button only.

You should document these flows in a data-driven way. A structured format with columns for "Component," "Keystroke," "Expected Action," and "Relevant WCAG" will make both human review and automated parsing much easier:

```js
const keyboardPatterns = {
  'modal-dialog': {
    tab: 'Focus next element within modal',
    shiftTab: 'Focus previous element within modal',
    escape: 'Close modal and return focus',
    wcag: '2.1.1 Keyboard, 2.4.3 Focus Order'
  },
  'form-field': {
    tab: 'Move to next field in visual order',
    shiftTab: 'Move to previous field',
    enter: 'Submit only from submit button',
    wcag: '2.1.1 Keyboard, 2.4.3 Focus Order'
  },
  'dropdown-select': {
    space: 'Open dropdown menu',
    arrowDown: 'Navigate to next option',
    arrowUp: 'Navigate to previous option',
    enter: 'Select current option',
    escape: 'Close dropdown without selection',
    wcag: '2.1.1 Keyboard, 4.1.2 Name, Role, Value'
  }
};
```

This code aligns these patterns with WCAG guidelines 2.1.1 (Keyboard Accessibility), 2.4.3 (Focus Order), and 4.1.2 (Name, Role, Value) to support users who rely on keyboard inputs[^5]

[^5] Source: [<VPIcon icon="iconfont icon-w3c"/>WCAG Understanding Docs, WC3](https://w3.org/WAI/WCAG21/Understanding/).

### Automated Tab Order Validation

Tab order should follow the visual layout of the page. When focus jumps around randomly, users get lost. The code below checks that focus moves through fields in the order people expect – top to bottom, left to right. It catches cases where focus skips around even when the tabindex values look correct.

```js
function auditTabOrder(formId) {
  const form = document.getElementById(formId);
  const focusableElements = form.querySelectorAll(
    'input, select, textarea, button, a[href], [tabindex]:not([tabindex="-1"])'
  );
  const failures = [];
  
  const elements = Array.from(focusableElements).map(el => ({
    element: el,
    position: el.getBoundingClientRect(),
    tabindex: parseInt(el.getAttribute('tabindex')) || 0
  }));
  
  for (let i = 1; i < elements.length; i++) {
    const prev = elements[i - 1];
    const curr = elements[i];
    
    // Check if tab order follows visual top-to-bottom, left-to-right
    const visuallyBefore = prev.position.top < curr.position.top || 
      (prev.position.top === curr.position.top && prev.position.left < curr.position.left);
    
    if (!visuallyBefore && prev.tabindex === curr.tabindex) {
      failures.push({
        field: curr.element.id,
        issue: 'Tab order does not match visual layout',
        wcag: '2.4.3 Focus Order'
      });
    }
  }
  
  return failures;
}
```

In essence, the audit identifies failures to adhere to WCAG 2.4.3 Focus Order while preserving context and the ability to interact with keyboard users as they interact with form fields.[^6]

[^6]: Source: [<VPIcon icon="iconfont icon-w3c"/>WCAG 2.4.3, WC3](https://w3.org/WAI/WCAG21/Understanding/focus-order.html)

### Verify Focus Visibility

Focus indicators need to be clearly identifiable. According to research, visible focus indicators improved typing and reduced errors significantly[^7]

[^7]: Source: [<VPIcon icon="fas fa-globe"/>Liu and others, ResearchGate](https://researchgate.net/publication/392950031_Enhancing_User_Experience_of_Virtual_Keyboard_Through_Collaborative_and_Speed-Adaptive_Auditory-Vibrotactile_Feedback).

For instance, focus styles can include an outline, border, or shadow, but they must have enough contrast against the background (at least 3:1) to satisfy WCAG 2.4.7 Focus Visible and 1.4.11 Non-text Contrast (Source: [<VPIcon icon="iconfont icon-w3c"/>WCAG Understanding Docs, WC3](https://w3.org/WAI/WCAG21/Understanding/)). Consider the following example:

```js
function auditFocusVisibility(formId) {
  const form = document.getElementById(formId);
  const focusableElements = form.querySelectorAll('input, select, textarea, button');
  const failures = [];
  
  focusableElements.forEach(element => {
    element.focus();
    const computedStyle = window.getComputedStyle(element);
    
    // Check for visible focus indicator
    const hasOutline = computedStyle.outline !== 'none' && 
      computedStyle.outlineWidth !== '0px';
    const hasBorder = computedStyle.borderStyle !== 'none';
    const hasBoxShadow = computedStyle.boxShadow !== 'none';
    
    // Check contrast ratio for focus indicator
    const outlineColor = computedStyle.outlineColor;
    const backgroundColor = computedStyle.backgroundColor;
    const contrastRatio = calculateContrastRatio(outlineColor, backgroundColor);
    
    if (!hasOutline && !hasBorder && !hasBoxShadow) {
      failures.push({
        field: element.id,
        issue: 'No visible focus indicator',
        wcag: '2.4.7 Focus Visible'
      });
    } else if (contrastRatio < 3) {
      failures.push({
        field: element.id,
        contrastRatio: contrastRatio.toFixed(2),
        issue: 'Focus indicator contrast ratio below 3:1',
        wcag: '1.4.11 Non-text Contrast'
      });
    }
  });
  
  return failures;
}
```

Good focus styling helps keyboard users see where they are on the page. This code checks that focus indicators are visible and have enough contrast against the background so users can tell which field they're currently in.

### Using Automated Testing Tools

To speed up and automate audits even more efficiently, you can use tools such as [<VPIcon icon="fa-brands fa-chrome"/>Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview), [<VPIcon icon="fa-brands fa-chrome"/>axe-core](https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd), and [<VPIcon icon="iconfont icon-cypress"/>Cypress](https://cypress.io/). You can also combine these tools to be even more powerful – for example, using axe-core in conjunction with Cypress is the most comprehensive test suite I can suggest.

Here is a workflow you can follow:

```js
async function runAccessibilityAudit(formId) {
  const form = document.getElementById(formId);
  const results = await axe.run(form, {
    rules: {
      'label': { enabled: true },
      'aria-required-attr': { enabled: true },
      'aria-valid-attr-value': { enabled: true },
      'keyboard-navigation': { enabled: true },
      'focus-order-semantics': { enabled: true }
    }
  });
  
  const violations = results.violations.map(violation => ({
    rule: violation.id,
    impact: violation.impact,
    description: violation.description,
    wcag: violation.tags.filter(tag => tag.startsWith('wcag')),
    elements: violation.nodes.map(node => node.target)
  }));
  
  return violations;
}
```

When you document keyboard patterns and automate the checks, you make sure everyone can complete your forms – whether they use a mouse, keyboard, or screen reader. Run these checks in your CI/CD pipeline to catch problems before they go live.

---

## AI-Informed Navigation Pattern Detection

Machine learning models can help identify strange keyboard navigation sequences that signal potential usability challenges. Combining mouse tracking with artificial intelligence can give you insights into user behavior that aren't possible using traditional strategies[^9].

[^9]: Sources: [<VPIcon icon="fas fa-globe"/>Souza and others, IEEE Access](https://researchgate.net/publication/334385231_User_Experience_Evaluation_Using_Mouse_Tracking_and_Artificial_Intelligence)

The logic could similarly be applied to keyboard navigation studies, as AI models can be trained on typical successful navigation patterns to signal when users are struggling in their keyboard flows.

### Pattern Detection for Navigation Using AI

AI tools can assess keyboard navigation to find non-compliant actions during testing. For instance, through machine learning, the code sample below captures, evaluates, and categorizes unusual or problematic keyboard navigation behavior on web forms and detects unique keyboard navigation or k-action sequences that are likely indicative of usability concerns.

```js
async function detectNavigationAnomalies(formId) {
  const navigationData = captureKeyboardSequence(formId);
  const features = extractNavigationFeatures(navigationData);
  
  // Use machine learning to classify navigation patterns
  const model = await loadTrainedModel('keyboard-anomaly-detection');
  const predictions = await model.predict(features);
  
  const anomalies = predictions.filter(p => p.confidence > 0.8).map(p => ({
    sequence: p.keystrokes,
    anomalyType: p.classification,
    severity: p.confidence,
    recommendation: generateRecommendation(p.classification)
  }));
  
  return anomalies;
}

function extractNavigationFeatures(data) {
  return {
    tabSequenceLength: data.tabs.length,
    backtrackCount: countBacktracks(data.tabs),
    focusTrapIndicators: detectFocusTraps(data),
    averageTimePerElement: calculateAverageTime(data),
    sequenceDeviation: measureSequenceDeviation(data)
  };
}
```

The code structure captures the user's keyboard navigation actions on specified forms using `captureKeyboardSequence(formId)`, which means that the user has entered keystrokes, such as tabbing and focusing between fields.

Using `extractNavigationFeatures(data)`, the code processes the Raw keyboard navigation sequence by calculating metrics. Lastly, the code loads a previously-trained ML model and provides the extracted features to the model to be classified into their respective categories along with a confidence score.

Any keyboard navigation anomalies detected with a confidence score of 0.8 or higher will be filtered. The detected keystroke sequences, type of anomaly, severity, and specific suggestions will be included in the final results report for later review by the user.

### Fuzzy Logic Paradigm for Navigation-Performance Scoring

Collaborative feedback systems can help improve the virtual keyboard user experience. Fuzzy logic lets you combine multiple measurements – like focus visibility and tab order – into a single score that better reflects the actual user experience.[^10]

[^10]: Source: [<VPIcon icon="fas fa-globe"/>Liu and others, ResearchGate](https://researchgate.net/publication/392950031_Enhancing_User_Experience_of_Virtual_Keyboard_Through_Collaborative_and_Speed-Adaptive_Auditory-Vibrotactile_Feedback).

For example, the following code creates a fuzzy inference system that evaluates two inputs: Focus Visibility and Tab Order Logic. These two inputs are evaluated using fuzzy logic and associated rules to arrive at a single score representing the total efficiency of keyboard navigation for a given application.

```js
function createKeyboardNavigationFuzzySystem() {
  // Define fuzzy variables
  const focusVisibility = new FuzzyVariable('focusVisibility', 0, 100);
  focusVisibility.addTerm('poor', new TriangularMF(0, 0, 40));
  focusVisibility.addTerm('adequate', new TriangularMF(30, 50, 70));
  focusVisibility.addTerm('excellent', new TriangularMF(60, 100, 100));
  
  const tabOrderLogic = new FuzzyVariable('tabOrderLogic', 0, 100);
  tabOrderLogic.addTerm('confusing', new TriangularMF(0, 0, 40));
  tabOrderLogic.addTerm('acceptable', new TriangularMF(30, 50, 70));
  tabOrderLogic.addTerm('intuitive', new TriangularMF(60, 100, 100));
  
  const navigationEfficiency = new FuzzyVariable('navigationEfficiency', 0, 100);
  navigationEfficiency.addTerm('inefficient', new TriangularMF(0, 0, 40));
  navigationEfficiency.addTerm('moderate', new TriangularMF(30, 50, 70));
  navigationEfficiency.addTerm('efficient', new TriangularMF(60, 100, 100));
  
  // Define fuzzy rules
  const rules = [
    'IF focusVisibility IS excellent AND tabOrderLogic IS intuitive THEN navigationEfficiency IS efficient',
    'IF focusVisibility IS poor OR tabOrderLogic IS confusing THEN navigationEfficiency IS inefficient',
    'IF focusVisibility IS adequate AND tabOrderLogic IS acceptable THEN navigationEfficiency IS moderate'
  ];
  
  return new FuzzyInferenceSystem([focusVisibility, tabOrderLogic], navigationEfficiency, rules);
}
```

The resulting score is meant to be more representative of a user’s experience with the keyboard navigation system than other existing methods of measuring user satisfaction. This fuzzy inference system assesses keyboard navigation quality based on multiple dimensions at the same time, yielding scores in a similar range to user-reported satisfaction measurements[^11]

[^11]: Source: [<VPIcon icon="fas fa-globe"/>Liu and others, ResearchGate](https://researchgate.net/publication/392950031_Enhancing_User_Experience_of_Virtual_Keyboard_Through_Collaborative_and_Speed-Adaptive_Auditory-Vibrotactile_Feedback).

---

## Conclusion

This article has given you the tools and resources you’ll need to automate a UX audit of your app’s forms – from the initial setup through continuous integration.

You’ve learned:

- Three essential components of forms and the importance of addressing each component systematically.
- How to link objectives directly with business KPIs and user outcomes.
- How to set up automated testing for the specificity of errors, the timing of validation, and the direction for the next actionable step after an error.
- How to review the hint text on your forms: proactive display, proximity to the field it assists, and accessibility.
- How to validate keyboard navigation through verification of tab order, testing focus visibility, and using ARIA tags.
- How to incorporate WCAG criteria into your automated tests and to incorporate Nielsen's 10 Heuristics.
- How to prepare documentation for the handoff between Design and Development, using the "5Cs": Coverage, Completion, Consistency, Clarity, and Correctness.

**Next steps:**

- Begin with a single high-impact form in your application (signup or checkout) and run the basic automated checks on error messages and keyboard flows.
- Integrate one or two audit functions into your existing test suite to see how they surface issues you might have missed manually.
- Create a centralized error and hint message library for your most critical forms to ensure consistency.
- Gradually expand your audit coverage to additional forms and fields as you refine your automation approach.
- Add these checks to your CI/CD pipeline so they run automatically on every pull request, catching regressions before they reach users.
- Experiment with AI-powered anomaly detection for keyboard navigation patterns once your foundational audits are stable.

Most importantly, remember that form UX optimization is an ongoing practice, not a one-time fix. Start with the forms that directly impact your conversion metrics, validate that your automated checks catch real user problems, and expand your coverage systematically. Your goal should be to build a reliable system that continuously protects your users from friction.

::: info About the author

Hope you enjoyed the article and found it helpful. I’ve been a contributor to freeCodeCamp for more than 8 years, and to make this piece more precise and detailed, I used some expert help.

I sincerely thank skilled designers from [<VPIcon icon="fas fa-globe"/>COAX Software](https://coaxsoft.com/) for the UX and accessibility guidelines, and the developers who provided the audit automation code snippets (who both wished to stay anonymous). The company has a deep expertise in [<VPIcon icon="fas fa-globe"/>UI/UX design](https://coaxsoft.com/services/ux-audit-services).

To find out more about me and read more content on tech and digital, visit [<VPIcon icon="fa-brands fa-linkedin"/>`oleg-romanyuk`](https://linkedin.com/in/oleg-romanyuk/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Automate Form UX Audits: Errors, Hints, and Keyboard Flows",
  "desc": "Forms are often the gatekeepers to conversions on a site or application. Abandoned carts, partially signed-up users, and users who stop engaging with your app are often thanks to friction with forms. ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/automate-form-ux-audits-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
