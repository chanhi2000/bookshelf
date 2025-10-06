---
lang: en-US
title: "A Developer's Guide to Protecting Personal Data: Best Practices and Tools"
description: "Article(s) > A Developer's Guide to Protecting Personal Data: Best Practices and Tools"
icon: fas fa-shield-halved
category:
  - DevOps
  - Security
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - sec
  - security
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Developer's Guide to Protecting Personal Data: Best Practices and Tools"
    - property: og:description
      content: "A Developer's Guide to Protecting Personal Data: Best Practices and Tools"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/developers-guide-to-protecting-personal-data.html
prev: /devops/security/articles/README.md
date: 2025-04-17
isOriginal: false
author:
  - name: Alex Tray
    url : https://freecodecamp.org/news/author/trayalex812/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744839185611/b3e49efc-6eee-4a0b-9522-20407b1782e3.png
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
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="A Developer's Guide to Protecting Personal Data: Best Practices and Tools"
  desc="Think about it: you're sitting there enjoying your morning coffee, reading the headlines when again another data breach is making headlines. Millions of users' personal information - gone. You can't help but cringe as a developer at the prospect. Cou..."
  url="https://freecodecamp.org/news/developers-guide-to-protecting-personal-data"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744839185611/b3e49efc-6eee-4a0b-9522-20407b1782e3.png"/>

Think about it: you're sitting there enjoying your morning coffee, reading the headlines when again another data breach is making headlines. Millions of users' personal information - gone. You can't help but cringe as a developer at the prospect. Could it happen on your watch?

The reality is, keeping personal data safe isn't something you should be doing because it's good practice - it's something you have to do. Users are trusting developers to care for their data day in and day out, and power must be wielded wisely. If you're writing code that involves getting, processing, or storing someone's personal data, then you should be being proactive about keeping it safe.

So the question is: how do you safely keep personal data?

---

## Know What You're Protecting

If you must protect information, first determine what information must be protected. It is crucial to [<VPIcon icon="fas fa-globe"/>protect sensitive information](https://blog.incogni.com/opt-out-guides/) from unauthorized access to ensure data security. Below is a list of some common types of sensitive data:

- Personally Identifiable Information (PII): name, address, phone number, email, Social Security number.
- Financial Data: bank details, payment history, credit card number.
- Authentication Data: password, auth tokens, API keys, security question responses.
- Health Info: any kind of [<VPIcon icon="fas fa-globe"/>HIPAA](https://jotform.com/what-is-hipaa-compliance/)-protected information about the health and medical history of the user.

Once you know what information has to be rendered secure, then you can go ahead and render it secure.

---

## Best Practices in Data Security

### 1. Encrypt Everything

Your best protection against hacking is encryption. When data is encrypted, even if hackers have access to it, they cannot do anything with it in the absence of the decryption key.

For stored sensitive information, use **hashing with a salt**, a process that turns a password into an irreversible value. This way, even if someone gains access to the stored data, the actual password isn't exposed.

```py
import hashlib
import os

def hash_password(password):
    salt = os.urandom(32)  # Generate a new salt
    hashed_password = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return salt + hashed_password
```

For data in transit, always use HTTPS:

```sh
sudo certbot --nginx -d yourdomain.com
```

This ensures data is encrypted between your server and the user. You can also reduce how often data is in transit by using [<VPIcon icon="fas fa-globe"/>edge computing](https://suse.com/c/what-is-edge-computing/). Rather than sending sensitive data to external servers, increasing risk, it allows data to be stored and processed locally.

### 2. Perform Secure Authentication

Weak authentication is an extremely critical security vulnerability.

**Authentication** is the process of verifying who a user is (for example, logging in), while **authorization** is verifying what they're allowed to do (for example, access admin features).

Make sure that you:

- Perform strong password habits.
- Perform multi-factor authentication (MFA). MFA requires users to present two or more verification factors (for example password and one-time code from a mobile device), making it much harder for attackers to gain access.
- Perform OAuth 2.0 or OpenID Connect third-party authentication. These are secure industry-standard protocols that allow users to authenticate via trusted platforms like Google or Facebook, reducing the need to store credentials yourself.

Example: Here’s an authentication setup using JWT (JSON Web Tokens) in Python:

```py
import jwt
import datetime

SECRET_KEY = "your_secret_key"

def generate_token(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')
```

This function generates a secure token for a user. The token contains the user ID and an expiration time, and it's signed using a secret key. Clients send this token with each request, and servers verify it to ensure the request comes from an authenticated user.

### 3. Minimize the Data You Need to Store

One of the simplest things you can do to protect personal data? Store less than you have to. Consider the following questions:

- Do I really need to store this data?
- How long do I really need to keep it for?
- Can I anonymise it?

For example, if you are going to need analytics, consider deleting personal identifiers prior to storing the data:

```js
const anonymizeData = (user) => {
    return {
        sessionId: generateRandomId(),
        event: user.event,
        timestamp: new Date().toISOString()
    };
};
```

This JavaScript function removes identifying information (like name or email) and replaces it with a random session ID, keeping only the data necessary for analytics.

For instance, if you manage email lists, avoid storing unnecessary subscriber data beyond what is required for communication.

Regularly clean and scrub email lists to remove outdated or inactive addresses. Sending emails to outdated/inactive addresses can damage your domain reputation, leading to blacklisting and email deliverability issues. If you only need email addresses for temporary campaigns, consider [<VPIcon icon="fa-brands fa-google"/>automated deletion policies](https://support.google.com/a/answer/151128?hl=en) to remove old data.

### 4. Secure Your APIs

If your application is consuming other services, protect your API endpoints. You can do this by:

- **Require tokens or API keys**: These act as credentials to access the API and prevent unauthorized use.
- **Implement rate limiting to deter abuse**: This prevents attackers from flooding your server with too many requests.
- **Validate and sanitize all input data**: This protects against injection attacks and malformed inputs.

Here's how you can validate API input in Node.js:

```js
const express = require('express');
const app = express();

app.post('/api/data', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email.includes('@')) {
        return res.status(400).send('Invalid input');
    }
    res.send('Data received');
});
```

This ensures the API receives valid data and returns an error for incorrect input, which is a basic form of input sanitization.

### 5. Lock Down Your Database

Your database is an attack treasure trove, so lock it down:

- **Use parameterized queries** to prevent SQL injection. These queries separate data from code.
- **Limit database access using role-based permissions**: Only give each user or service the access it needs—no more.
- **Back up and test restoration procedures**: Regular backups ensure you can recover data in the event of a breach or corruption.

Here's a safe way to query a database in Python:

```py
import sqlite3

def get_user(email):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    return cursor.fetchone()
```

This example uses a parameterized query (the ? placeholder) to safely insert the email into the SQL command, protecting against injection.

Also, never overlook how databases and internal systems might be accessed remotely. Remote access, whether for IT admins, support teams, or mobile workers, often involves logging in from unfamiliar devices—which introduces new security challenges. Tools that allow for secure, contactless logins without typing passwords or installing software on the remote machine reduce the risk of credential theft.

You can also ensure that remote database connections, SSH access, and admin panels are protected with strong authentication, IP restrictions, and, ideally, VPN access to avoid exposing sensitive entry points to the internet.

And remember, you don’t have to reinvent the wheel—there are [<VPIcon icon="fas fa-globe"/>powerful data protection tools](http://blog.scalefusion.com/best-data-protection-software/) available to keep your data safe from breaches and downtime. Want to know which ones stand out? Check out this guide for a breakdown of some of the best solutions.

### 6. Periodically Audit and Update Your Code

Unpatched software and outdated dependencies are essentially an open invitation to the attackers. Update your software and conduct security audits regularly.

Perform security scans for your project:

```sh
npm audit fix --force  # For Node.js projects
```

```sh
pip install --upgrade package_name  # For Python projects
```

These commands help find and fix known vulnerabilities in your project dependencies.

### 7. Train Your Employees

Your security is just as strong as your weakest link. If one employee handles sensitive data irresponsibly, everything else may have been for naught.

- **Standard security training**: Regular sessions on topics like phishing, password security, and data handling.
- **Implement solid policies on user data handling**: For instance, never download sensitive data to personal devices.
- **Establish a security-oriented culture**: Encourage reporting of suspicious activity, regular internal audits, and open communication about threats.

### 8. Give Users Control Over Their Data

Transparency breeds trust. Give users control to:

- View and download their data.
- Terminate their account easily.
- Make adjustments in privacy settings.

If you are collecting data, provide an opt-out. Users must be able to protect sensitive data and be in control of what becomes of their information. This is why it is important to have a privacy policy: users need to know what data you are collecting and for what purpose. Check out this [<VPIcon icon="fas fa-globe"/>privacy policy template](https://iubenda.com/en/help/36387-privacy-policy-template) if you need to create one for your site.

---

## Final Thoughts

Data protection isn't just about coding well—it's about attitude. Get in the head of an attacker for a day, minimize vulnerabilities, and put user privacy at the top of your mind.

So the next time you're scanning the headlines for news of the latest ginormous data breach, you can be confident that your apps are bulletproof. Be smart, continue to learn, and let's make the internet safe—one line of secure code at a time.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Developer's Guide to Protecting Personal Data: Best Practices and Tools",
  "desc": "Think about it: you're sitting there enjoying your morning coffee, reading the headlines when again another data breach is making headlines. Millions of users' personal information - gone. You can't help but cringe as a developer at the prospect. Cou...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/developers-guide-to-protecting-personal-data.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
