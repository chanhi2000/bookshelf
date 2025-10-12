---
lang: en-US
title: "How to Secure JavaScript Applications: Common Vulnerabilities and Best Practices"
description: "Article(s) > How to Secure JavaScript Applications: Common Vulnerabilities and Best Practices"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Secure JavaScript Applications: Common Vulnerabilities and Best Practices"
    - property: og:description
      content: "How to Secure JavaScript Applications: Common Vulnerabilities and Best Practices"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-secure-javascript-applications.html
prev: /programming/js/articles/README.md
date: 2024-10-24
isOriginal: false
author: Bello Joseph
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1729618116705/41f6dfda-4563-4333-88ad-733238d86ec1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Secure JavaScript Applications: Common Vulnerabilities and Best Practices"
  desc="JavaScript is a widely used programming language for creating client-side and server-side applications. Its use cases go beyond web development, as JavaScript is also used in mobile app development and artificial intelligence. This makes JavaScript a..."
  url="https://freecodecamp.org/news/how-to-secure-javascript-applications"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1729618116705/41f6dfda-4563-4333-88ad-733238d86ec1.png"/>

JavaScript is a widely used programming language for creating client-side and server-side applications. Its use cases go beyond web development, as JavaScript is also used in mobile app development and artificial intelligence. This makes JavaScript a versatile language.

But with such versatility comes risks. JavaScript's widespread usage also makes it a prime target for attacks.

Just humans have developed complex security systems for their homes, such as surveillance cameras and digital locks, developers must likewise safeguard their applications from cyberattacks and external threats.

This article will introduce you to the importance of security in your application. We’ll also discuss common JavaScript security vulnerabilities and how to prevent attacks and secure your JavaScript code.

---

## Why You Need To Secure Your JavaScript Application

Nowadays, when building a project, most developers focus solely on making the application work and replicating the desired functionality. Security is often not prioritized, which has led to significant issues in recent years.

Many companies have been affected by security attacks, resulting in loss of revenue, exposure of sensitive user information, and damage to the company's credibility. One real-world example that illustrates this scenario perfectly is the [<VPIcon icon="fas fa-globe"/>Segway Magecart attack](https://threatpost.com/segway-magecart-attack-favicon/177971/).

In 2022, Segway, a company known for producing two-wheeled electric scooters, fell victim to a [<VPIcon icon="fas fa-globe"/>Magecart](https://akamai.com/glossary/what-is-magecart) attack in which users' sensitive payment information was exposed to attackers. The Segway Magecart attack is a well-known example of [<VPIcon icon="fas fa-globe"/>digital skimming](https://europol.europa.eu/operations-services-and-innovation/public-awareness-and-prevention-guides/digital-skimming).

The attackers were able to steal users' information by injecting a script that manipulated the code running in the web browser, allowing them to access the data entered on the users' web pages.

The Segway attack exploited a major JavaScript vulnerability, which is JavaScript’s ability to execute client-side code. This made it easier for malicious scripts to be injected and executed in users' browsers.

To prevent your application from being compromised by attackers, it is important to understand the vulnerabilities of JavaScript, how attackers exploit these vulnerabilities, and then learn how to secure your application.

---

## Understanding Common JavaScript Security Vulnerabilities

JavaScript security vulnerabilities are weaknesses or flaws in its architecture that make it susceptible to attacks. These vulnerabilities are often referred to as the various entry points through which attackers can penetrate a program. We’ll explore some common JavaScript vulnerabilities below.

### 1\. Cross-Site Scripting (XSS)

Cross-Site Scripting (XSS) is a type of attack in which malicious code is injected into the frontend section of a website by attackers. This code is then executed in the browsers of unsuspecting users who visit the compromised webpage.

XSS attackers use this method to steal users’ data, hijack session data, and carry out other malicious activities.

XSS attacks are effective because they exploit the browser’s inability to differentiate between trusted code and malicious scripts injected by an attacker. Let’s examine an analogy to understand how XSS attacks work.

Imagine a web application where users can post comments or submit data via a form. Take, for example, a widely-used forum platform like freeCodeCamp. An attacker might insert a harmful script as part of a comment. If the application fails to sanitize or validate the input effectively, the browser will run the malicious script whenever other users load the page or view that comment.

Here’s a code example illustrating this:

```html
<form id="commentForm">
  <textarea id="comment"></textarea>
  <br>
  <button type="submit">Submit Comment</button>
</form>
<div id="commentSection"> 
  <ul id="commentList"></ul> <!--Where the comment is displayed -->
</div>
```

Here, we have a simple form markup above that submits a user’s comment.

```js
document.getElementById('commentForm').onsubmit = function(e) {
  e.preventDefault();
  const comment = document.getElementById('comment').value;
  document.getElementById('commentList').innerHTML 
  += `<li>${comment}</li>`; // line where XSS attack occurs
};
```

Now each time the user submits a comment, JavaScript takes that particular **comment** and includes it in our **webpage structure**. Now, an attacker knowing this could include a scripting attack like this in the comment form.

```html
<script>alert('XSS Attack!')</script>
```

JavaScript would take this code and **store** it in our webpage just as a regular comment, so each time a user loads the infected page, the script is executed. This type of XSS attack is known as [<VPIcon icon="fas fa-globe"/>stored XSS](https://portswigger.net/web-security/cross-site-scripting/stored).

To protect your application from XSS attacks, it is crucial to sanitize and validate inputs and regularly scan your code for vulnerabilities.

### 2\. Cross-Site Request Forgery (CSRF)

Cross-Site Request Forgery (CSRF) refers to a type of attack where an attacker tricks an authenticated user’s browser into executing unwanted actions by using the user’s credentials. This often occurs through [<VPIcon icon="fa-brands fa-wikipedia-w"/>social engineering](https://en.wikipedia.org/wiki/Social_engineering_\(security\)) techniques that cause the browser to send requests without the user's knowledge or consent.

In a CSRF attack, the attacker impersonates the victim by utilizing credentials stored in the user’s browser, such as session cookies, JWTs, or OAuth tokens. They use these credentials to send HTTP requests to the website’s server, carrying out unauthorized actions on the victim’s behalf, such as transferring funds, or changing the user's email address or password.

Let’s examine a hypothetical scenario from an attacker’s POV to understand CSRF better.

Imagine I'm an attacker trying to use CSRF to steal money from an unsuspecting victim's bank account. Here's how I would do it:

::: tabs

@tab:active 1.

> First, I am going to create a malicious form that triggers a fund transfer on the victim’s bank website using a POST request.

```html
<form action="https://victim-bank.com/transfer" method="POST">
  <input type="hidden" name="toAccount" value="attacker-account" />
  <input type="hidden" name="amount" value="1000" />
</form>
```

@tab 2.

> Next, I need to manipulate the victim to visit the webpage that contains this form. 

I can achieve this in two ways by:

- **Sending the page link via email**, pretending it’s from the victim’s bank.
- **Embedding the link** in a webpage that lures the victim into visiting (for example, a fake promotion or giveaway offer).

@tab 3.

> Now, once the victim **visits** the malicious webpage, if the victim is still authenticated to the target website, the form is executed immediately and money is transferred to my account.

```js
// Automatically submits the form when the malicious page is loaded
document.forms[0].submit();
```

To prevent CSRF attacks, you can implement an anti-CSRF token in the web application. This token generates a unique identifier for each session. When the browser makes a request, the server checks if the CSRF token from the browser matches the token stored on the server before validating any action.

### 3\. Third-Party Library Vulnerabilities

Developers often integrate external packages and libraries to enhance application functionality and speed up development. But integrating third-party libraries can introduce security risks to your JavaScript application.

On March 26, 2019, the Bootstrap-Sass library version (3.2.0.2) was deleted from the official RubyGems repository and replaced with a compromised [<VPIcon icon="fas fa-globe"/>version (3.2.0.3) that allowed remote code execution](https://acunetix.com/blog/web-security-zone/remote-code-execution-bootstrap-sass-ruby-package/). Fortunately, a [user noticed this anomaly (<VPIcon icon="iconfont icon-github"/>`twbs/bootstrap-sass`)](https://github.com/twbs/bootstrap-sass/issues/1195) and informed the Bootstrap-Sass maintainers who resolved the issue promptly.

Before integrating a third-party library into your application, examine it for vulnerabilities and ensure it is regularly maintained and up-to-date. Avoid libraries that request excessive permissions. Taking these precautions will help protect your application's security.

### 4\. Insecure Deserialization

Serialization is crucial in applications because data must be stored and transferred in formats that other systems can easily read and interpret. It involves converting data into a system-readable format (such as JSON, XML, or binary) before it can be transmitted or stored in a system.

Deserialization is the **reverse** of this process: it retrieves serialize data from the system and returns it into its original form. You can think of serialization as freezing food items for storage, and deserialization as defrosting them before use.

Insecure deserialization occurs when the transcription process of data from its serialized form to its original form is **intercepted** and manipulated by attackers. Insecure deserialization is dangerous, as attackers can use this to alter application behavior, grant themselves unauthorized access, and it can even lead to remote code execution.

To prevent insecure deserialization, it’s necessary to properly validate user input before the serialization process.

### 5\. Prototype Pollution Attack

JavaScript is a prototype-based language. This means that when an object is created, it inherits methods and properties through an internal link to another object, called its prototype. This functionality allows multiple objects to share methods and properties from a single prototype.

This process is made possible through a mechanism known as a prototype chain.

A prototype chain is a link of prototypes. When you are unable to access a particular method or property from an object, JavaScript searches through the chain of prototypes until it finds the method or property, and it stops when the chain ends in `null`.

Prototype pollution occurs when an attacker injects properties or methods into an object's prototype, affecting all objects linked to that prototype. This can result in data corruption and remote code execution.

To prevent prototype pollution, use deep cloning methods and libraries that can detect and prevent prototype pollution.

### 6\. Exclusive Reliance on Client-Side Validation

A complete (or full-stack) application typically consists of two main components: the client-side (Front end) and the server-side (Back end). Client-side validation involves checking the user's input to ensure it meets the system requirements before sending the data to the backend.

Client-side validation is important for improving the user experience. For example, displaying an error message when a user leaves part of a form unfilled, checking the password strength, or ensuring that a user types in the correct email address.

But relying solely on client-side validation can leave the application vulnerable to security threats. Attackers may bypass JavaScript and inject malicious scripts into the server, leading to data manipulation, remote code execution, and unauthorized access to the application.

To ensure a high level of security in your application, it’s a best practice for you to validate both on the client-side and server-side.

### 7\. Sensitive Data Exposure

Sensitive data exposure happens when critical information like login credentials, authentication keys, API keys, or personally identifiable information (PII) is exposed, allowing unauthorized individuals to gain access to it.

Sensitive data exposure can occur in several ways, such as:

- Storing sensitive information (such as authentication tokens) using browser storage mechanisms like localstorage and sessionstorage.
- Failing to encrypt or hash passwords, leaving them in plain text.
- Leaving your API keys visible in your JavaScript code.
- Not encrypting data in transit by using HTTP instead of HTTPS.

Leaking sensitive data in your application is like writing your PIN on your credit card or keeping your valuables in a safe without a lock. Data exposure in the wrong hands can lead to serious issues, as attackers can steal a user’s login credentials or authentication tokens and siphon other important information.

Now that we have covered some common security vulnerabilities in JavaScript, let’s look at various ways in which we can secure our JavaScript application from these vulnerabilities.

---

## Best Practices for Securing Your JavaScript Application

### 1\. Ensure User Input is Sanitized and Validated

One major way in which JavaScript applications are compromised arises from user input.

Attackers have been known to inject malicious script into form fields or areas in the applications where data from a user is received, thereby leading to Cross-Site Scripting (XSS), SQL attacks, or code injection attacks.

Let’s look at an example that validates if a user enters the correct email format.

::: tabs

@tab:active 1.

> First, you define the `validateEmail` function, which takes in one parameter, `email`. 

The email parameter is expected to be a string containing the user email.

```js
function validateEmail(email){}
```

@tab 2.

> Next, you define the regex expression that checks if a given string follows the correct email format.

```js
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

@tab 3.

Then you assign a return statement that checks if a user email matches the `emailRegex` format. Here, you’ll use the `test()` method which returns a boolean value confirming whether the `email` is in the right format or not.

```js
return emailRegex.test(email)
```

Now that you’ve created a function to validate an email, you can use this function to provide feedback when a user enters an incorrect email format.

```js
const userEmail = "userEmail@example.com"
if (validateEmail(userEmail)) {
  alert("Email Registration Successful")
} else {
  alert("Please Enter The Correct Email")
}
```

In the example above, we used the `validateEmail` function to alert a user if they enter the correct email format or not. Here is the complete code below:

```js
function validateEmail(email){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email)
}
const userEmail = "userEmail@example.com"
if (validateEmail(userEmail)) {
  alert("Email Registration Successful")
} else {
  alert("Please Enter The Correct Email")
}
```

### 2\. Implement a Content Security Policy (CSP)

Another way of protecting your application is by implementing a content security policy (CSP). A CSP allows you to restrict access or control how external resources such as inline scripts, images, or fonts are loaded in your webpage.

CSPs help prevent XSS attacks, clickjacking, and other form of code-injection attacks. Think of a CSP as a gatekeeper that only allows invited guest into the party. A CSP only allows resources explicitly defined by you to be loaded in your webpage.

To implement a CSP in your web application, add the policy to your server’s HTTP headers. You can configure CSP by specifying which types of resources (such as scripts, styles, or images) and which domains are allowed to load content from.

### 3\. Ensure Data in Transit is Always Encrypted with HTTPS

The browser and server are constantly communicating with each other. Data such as login credentials, authentication tokens, or payment details typically gets sent from the browser to the server.

It is important to ensure that data being transmitted from the browser to the server is encrypted, remains in its original form, and is sent to the correct location or server.

One way to accomplish secure communication is by using HTTPS (HyperText Transfer Protocol Secure). [HTTPS is a protocol](/freecodecamp.org/what-is-https-http-vs-https-meaning-and-how-it-works.md) created to improve the security of data transmission between browsers and servers. It ensures that data sent to the server remains unaltered and is protected from interception by attackers.

### 4\. Use Strict Mode

The "use strict" directive in JavaScript is a way to write secure and high-quality JavaScript code. It helps prevent certain actions in your code that can lead to bugs, errors, or security vulnerabilities.

With [strict mode](/freecodecamp.org/how-to-use-strict-mode-in-javascript.md), JavaScript flags an error when certain actions are taken, such as accessing global objects, using undeclared variables, and making other coding mistakes.

```js
// Without strict mode
undeclaredVariable = 10;  // No error, creates a global variable

// With strict mode
'use strict';
undeclaredVariable = 10;  // Error: "undeclaredVariable is not defined"
```

You can think of strict mode as a set of rules that guides you on what to do and what not to do when writing JavaScript.

To implement strict mode, simply add the following line at the beginning of your script or function.

```js
'use strict'
```

### 5\. Avoid Using the `eval()` Function

One rule in programming is to 'Never trust user input.' Using the `eval()` function violates this rule because it allows users to execute arbitrary code within your program. By passing user input to `eval()`, you're essentially permitting them to run any code, which can lead to serious security vulnerabilities.

The reason for this is the `eval()` function treats its argument as code and can execute expressions, functions, or even strings. While this feature is powerful, it is also extremely dangerous.

Attackers can inject malicious code, which `eval()` will execute without discrimination. This opens the door to vulnerabilities such as modifying global variables, creating new ones, or even executing remote code.

To prevent security vulnerabilities, avoid using the `eval()` function in your code, and instead consider other code alternatives.

### 6\. Always Carry Out Code Reviews

Before pushing your code to production, it's essential to have it [reviewed by other developers](/freecodecamp.org/code-review-tips.md).

Sometimes, we might overlook bugs or areas of vulnerability in our program. Getting help from your peers or senior developers can help detect those bugs, identify vulnerabilities, improve code quality, and ensure that your code meets the necessary standards.

During code reviews, it's important that you are open-minded and ready for corrections, avoid being too defensive, and understand that this is an opportunity for you to learn and grow.

### 7\. Perform Regular Penetration Testing

[Penetration testing](/freecodecamp.org/linux-essentials-for-hackers.md), also called **pen testing**, involves imitating an attack on an application in the same way a real attacker would, with the goal of uncovering security vulnerabilities within the application.

Penetration testing aims to uncover vulnerabilities before attackers do. Penetration testers do not only identify weaknesses but also provide solutions to resolve them.

Think of penetration testing like building a house, installing a security system, and then hiring thieves to try and break in. If they succeed, you can identify the weaknesses in your defenses and make improvements to strengthen the house.

You can conduct penetration testing by hiring professional and experienced pen testers or by using various tools like [**Burp Suite**](/freecodecamp.org/how-to-audit-web-apps-with-burpsuite.md), [<VPIcon icon="iconfont icon-nmap"/>Nmap](https://freecodecamp.org/what-is-nmap-and-how-to-use-it-a-tutorial-for-the-greatest-scanning-tool-of-all-time.md), and [<VPIcon icon="iconfont icon-kalilinux"/>Kali Linux](/freecodecamp.org/how-to-install-kali-linux.md).

---

## Conclusion

Security is a crucial aspect of JavaScript development that many developers often overlook when building applications. This article has introduced you to common security vulnerabilities in JavaScript, including Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and insecure deserialization.

You’ve also learned why security is important and explored various steps to secure your JavaScript application, such as conducting regular code reviews, sanitizing and validating user input, and other examples.

Thank you for reading this article. If you have any suggestions, comments, or questions, feel free to connect with me on [X (<VPIcon icon="fa-brands fa-x-twitter"/>`sephjoe12`)](https://x.com/sephjoe12) or [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`bello-joseph-970727265`)](https://linkedin.com/in/bello-joseph-970727265).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Secure JavaScript Applications: Common Vulnerabilities and Best Practices",
  "desc": "JavaScript is a widely used programming language for creating client-side and server-side applications. Its use cases go beyond web development, as JavaScript is also used in mobile app development and artificial intelligence. This makes JavaScript a...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-secure-javascript-applications.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
