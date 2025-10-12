---
lang: en-US
title: "How to Use WPScan to Keep Your WordPress Site Secure"
description: "Article(s) > How to Use WPScan to Keep Your WordPress Site Secure"
icon: fas fa-shield-halved
category:
  - DevOps
  - Security
  - PHP
  - Wordpress
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - security
  - wpscan
  - php
  - wordpress
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use WPScan to Keep Your WordPress Site Secure"
    - property: og:description
      content: "How to Use WPScan to Keep Your WordPress Site Secure"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-wpscan-to-keep-your-wordpress-site-secure.html
prev: /devops/security/articles/README.md
date: 2024-12-06
isOriginal: false
author: Marco Venturi
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1732705985906/49090646-5b75-40f4-ad55-473d723b4237.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Security > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "PHP > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/php/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use WPScan to Keep Your WordPress Site Secure"
  desc="Over 40% of the web is powered by WordPress. But this makes this popular CMS an attractive target for hackers. So if you run a WordPress site, you’ll need to make sure it’s secure. And this isn’t just a technical task, but is also a key responsibilit..."
  url="https://freecodecamp.org/news/how-to-use-wpscan-to-keep-your-wordpress-site-secure"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732705985906/49090646-5b75-40f4-ad55-473d723b4237.jpeg"/>

Over 40% of the web is powered by WordPress. But this makes this popular CMS an attractive target for hackers.

So if you run a WordPress site, you’ll need to make sure it’s secure. And this isn’t just a technical task, but is also a key responsibility from several points of view such as brand reputation, data breach, and business continuity.

One tool that stands out in the WordPress ecosystem is **WPScan.** It’s a security scanner that’s specifically designed for WordPress. It comes with both a paid and free license, according to your needs. It is also pre-installed in Kali Linux distributions.

So whether you’re a seasoned website admin or a website owner looking to improve your site's security, WPScan can help you identify vulnerabilities before attackers exploit them.

Before going ahead, one very important thing: the purpose of this article is to help individuals and organizations strengthen the security of their WordPress websites by effectively utilizing WPScan.

While this tool is incredibly powerful in identifying vulnerabilities, it’s important to emphasize that any unauthorized use of WPScan—such as scanning websites without proper permission—is not only unethical but also illegal.

My goal in sharing this information is to empower site administrators and developers to proactively secure their websites, safeguard their data, and create a safer online environment for everyone.

---

## What is WPScan?

WPScan is a command-line tool that helps you identify potential vulnerabilities in your WordPress installation. It’s like a security guard for your website, keeping an eye on outdated plugins, misconfigurations, and other common issues.

What makes WPScan unique is its focus on WordPress. It uses a database maintained by security experts, which is updated regularly to track thousands of known vulnerabilities in WordPress core, plugins, and themes.

### What Can WPScan Do?

Here are just a few things WPScan can help you with:

- Detecting outdated WordPress core versions.
- Identifying vulnerabilities in plugins and themes.
- Enumerating users (for example, discovering usernames).
- Testing for weak passwords (using a dictionary attack).
- Finding exposed sensitive files (like backups or debug logs).

Let’s see now the most common commands you can use.

---

## How to Scan Your WordPress Site Using WPScan

### 1. Basic Scan

A basic scan provides an overview of your WordPress site's security by identifying key vulnerabilities or misconfigurations. It can detect the WordPress core version and flag it if it's outdated, highlighting potential risks like SQL injection or cross-site scripting (XSS) vulnerabilities associated with older versions.

The scan might also reveal publicly accessible backup files (for example, `.sql` or `.zip`) or debug files like `debug.log`, which could expose sensitive information such as database credentials or server paths.

It can flag missing or improperly configured HTTP security headers, such as Strict-Transport-Security (HSTS) or Content-Security-Policy (CSP), which are critical for protecting against protocol downgrade attacks and unauthorized script execution.

Open directories that expose your site's file structure and potentially vulnerable plugins or themes may also be flagged if they are identified in public metadata.

These findings provide a starting point to address fundamental security gaps.

```sh
wpscan --url http://yourwebsite.com
```

This is what you’ll see on your terminal when you run this command:

![Results of basic scan with WPScan](https://cdn.hashnode.com/res/hashnode/image/upload/v1733225875769/0b1daa21-a258-41e3-88c1-62b9a7a23554.png)

### 2. Enumerating Users

User enumeration is a process of identifying usernames on your WordPress site. Knowing these usernames can help attackers target specific accounts for brute-force attacks.

To enumerate users, run:

```sh
wpscan --url http://yourwebsite.com --enumerate u
```

![The output will show usernames](https://cdn.hashnode.com/res/hashnode/image/upload/v1733226140065/3650be6a-e8e6-4c8b-a183-f986643c8ac2.png)

If you find default usernames like `admin`, you should replace them with something unique and secure.

Here are some best practice for usernames:

- **Avoid default names**: Replace default usernames like `admin` or `user` with something unique and not easily guessable.
- **Rename vulnerable usernames**: To change a username, you can create a new user with administrator privileges, transfer ownership of posts or content, and then delete the old user.
- **Use role-based usernames carefully**: Avoid naming accounts after their roles (for example, `editor`, `manager`), as these can be easy targets.
- **Implement login lockouts**: Combine secure usernames with plugins that lock accounts after repeated failed login attempts.
- **Enable Two-Factor Authentication (2FA)**: Adding 2FA ensures that even if a username is guessed, the account remains secure.

### 3. Checking Plugins and Themes

Plugins and themes can have security issues. WPScan can list all installed plugins and themes, along with any associated vulnerabilities.

For plugins, run this:

```sh
wpscan --url http://yourwebsite.com --enumerate p
```

It’ll have an output like this:

![Results of plugin scan](https://cdn.hashnode.com/res/hashnode/image/upload/v1733226282550/d428be3a-5b0d-410d-979a-2c65e3fb7846.png)

For themes, run this:

```sh
wpscan --url http://yourwebsite.com --enumerate t
```

It’ll have output similar to this:

![Results of theme scan](https://cdn.hashnode.com/res/hashnode/image/upload/v1733226484963/ae2ded5c-2d71-41db-8b1e-4a74df3dd94d.png)

Look for outdated versions or known vulnerabilities in the results, and update or replace those components immediately.

Let’s look at some common security issues in plugins and themes.

First, we have **Cross-Site Scripting (XSS)**. Insecure input handling in plugins or themes can allow attackers to inject malicious scripts, potentially stealing user information or taking over admin sessions. A poorly secured WordPress site with an XSS vulnerability can allow attackers to steal session cookies, potentially gain unauthorized admin access, inject malicious redirects, take users to phishing sites, display deceptive content, tricking users into providing sensitive information.

There’s also **SQL Injection**. Poorly written plugins or themes can enable attackers to manipulate database queries, exposing sensitive data or damaging your site. SQL injection vulnerabilities can be exploited to dump sensitive data, bypass authentication, and modify or delete data

Some plugins or themes might include malicious code—intentionally or due to poor security—that grants attackers unauthorized access to your site, known as **backdoors**. Once installed, a backdoor can grant persistent access, enable arbitrary file uploads, undermine site integrity, and steal sensitive data.

There’s also **Remote Code Execution (RCE)** - vulnerabilities that allow attackers to execute arbitrary code on your server, often leading to full control of your site or server. Once attackers gain RCE access, they can create admin users, exfiltrate data, launch further attacks, and privilege escalation.

#### Best Practices:

- Always keep plugins and themes updated to the latest versions.
- Remove any unused or inactive plugins and themes, as these can still pose a risk.
- Ensure plugins and themes are downloaded from trusted, reputable sources and have a history of active maintenance.
- Consider using security plugins to monitor changes to plugin or theme files and detect suspicious activity.

### 4. Password Testing

WPScan can test for weak passwords by attempting a brute-force attack using a wordlist:

```sh
wpscan --url http://yourwebsite.com --passwords /path/to/passwords.txt
```

and this is the output on your command line:

![Password testing output](https://cdn.hashnode.com/res/hashnode/image/upload/v1733229769208/699aebbe-576d-4bb6-a626-2a1139822f2d.png)

#### What is Brute-Forcing?

Brute-forcing is a method attackers use to guess passwords by systematically trying every possible combination until the correct one is found. When combined with a **wordlist**—a file containing a collection of commonly used passwords—brute-forcing becomes much faster and more efficient.

A typical wordlist might include:

- **Simple passwords** like `123456`, `password`, and `qwerty`.
- **Common patterns** such as `Spring2024!` or `welcome123`.
- **Leaked passwords** from previous data breaches.

By simulating this type of attack, WPScan can identify accounts that use weak passwords, allowing you to address vulnerabilities proactively.

Weak passwords make brute-forcing easier and faster. A short or predictable password might be guessed in seconds, while a longer, complex password with unique elements is exponentially harder to crack.

#### How to Create Strong Passwords

Strong passwords are your first line of defense against brute-force attacks. Here are key characteristics of strong passwords:

- **Length**: At least 12-16 characters long.
- **Complexity**: Use a mix of uppercase and lowercase letters, numbers, and special characters.
- **Uniqueness**: Avoid reusing passwords across multiple accounts.
- **Unpredictability**: Avoid dictionary words, common phrases, or personal information like birthdays.

#### Strategies for Generating Strong Passwords

There are various measures you can take to create strong passwords. First, use a password generator**.** Tools like LastPass and Bitwarden can create and store highly complex passwords for you.

You should also use pass phrases (instead of just regular passwords). Combine random, unrelated words with numbers and symbols, such as `Sky#Tree!Motorbike12`.

Finally, avoid patterns that might be easily guessed by an attacker. Don’t use sequential or keyboard patterns like `abcdef` or `qwerty`.

#### Use Tools to Manage Passwords

Managing strong passwords can be challenging. Password managers simplify this by securely storing and autofilling your credentials. Popular options include:

- **Bitwarden**
- **LastPass**

These tools also have features like password auditing to detect reused or weak passwords.

#### Use Two-Factor Authentication (2FA)

Two-factor authentication (2FA) adds an additional layer of security by requiring users to verify their identity through a second factor beyond the password. This can include:

- **One-time codes** sent via email or SMS.
- **App-generated codes** from tools like Google Authenticator or Authy.
- **Biometric verification**, such as fingerprints or facial recognition.

Even if an attacker guesses your password through brute-forcing, 2FA prevents them from accessing your account without secondary verification. This additional step makes brute-forcing impractical, as attackers would also need to compromise your 2FA device or method.

##### How to Implement 2FA in WordPress

1. Install a WordPress plugin such as **Google Authenticator**.
2. Require all user accounts, especially administrators, to enable 2FA.
3. Offer backup codes or recovery options in case users lose access to their 2FA device.
4. Test and make sure that 2FA works reliably for all user roles before making it mandatory.

#### The Importance of Password Hygiene

By using strong passwords and implementing 2FA, you can significantly reduce the effectiveness of brute-force attacks.

WPScan’s password testing feature can help you identify weak credentials. It also underscores the critical need for proactive password hygiene and additional security layers to keep your WordPress site secure.

---

## *hat to Do with WPScan Results

WPScan reports provide actionable insights into your site’s security. Here’s what you can do with the information:

First, update WordPress core, plugins, and themes: Keep everything updated to patch vulnerabilities.

Second, address configuration issues: Fix misconfigured file permissions, insecure HTTP headers, and other warnings.

Here are a couple of remediation examples you can apply:

### Directory indexing

If WPScan detects open directories, disable directory browsing by adding this line to your `.htaccess` file:

```apache title=".htaccess"
Options -Indexes
```

### File permissions

Ensure critical files like <VPIcon icon="fa-brands fa-php"/>`wp-config.php` are read-only by setting permissions to `440` or `400` using the command:

```sh
chmod 400 wp-config.php
```

You should also harden all user accounts. You can do this in several ways:

- **Update weak passwords**: Use strong, unique passwords for all user accounts (refer to the password testing section for tips).
- **Remove unused accounts**: Delete inactive accounts, especially those with administrator privileges.
- **Rename predictable usernames**: Change usernames like `admin` to something less obvious.

Make sure you also secure any sensitive files: If WPScan finds exposed files like `debug.log`, delete or secure them. Delete unnecessary files or old backups.

For files you need to keep, move them to a directory outside the web root. You can also protect files with `.htaccess`, by blocking access to sensitive files using `Deny` and `Allow` rules:

```apache title=".htaccess"
<Files wp-login.php>
    Order Deny,Allow
    Deny from all
    Allow from 123.456.789.000
</Files>
```

---

## Limitations of WPScan

WPScan is a powerful too, but it does have some limitations. Just be aware of them so you can take other measures to protect your WP sites.

### 1. Known Vulnerabilities Only

WPScan relies on its database of known vulnerabilities, so it won’t catch zero-day exploits or custom vulnerabilities.

Here are some tips on how you can mitigate this issue:

- **Stay informed**: Monitor WordPress security blogs, vulnerability databases like CVE or WPVulnDB, and community forums for emerging threats.
- **Use a Web Application Firewall (WAF)**: Tools like Cloudflare or Sucuri can block suspicious activities and attempts to exploit unknown vulnerabilities.
- **Conduct manual security reviews**: Periodically review your site for unusual behavior or unauthorized changes, particularly in critical files like <VPIcon icon="fa-brands fa-php"/>`wp-config.php` or your database.

### 2. No Real-Time Protection

WPScan a diagnostic tool, not a firewall or intrusion detection system. For real-time protection, it’s a good idea to combine WPScan with other tools.

Some steps you can take are:

- **Install security plugins**: Use specific security plugins to provide continuous monitoring, malware scanning, and firewall protection.
- **Monitor activity logs**: Set up activity tracking to identify suspicious login attempts, file changes, or unauthorized user actions.

### 3. Resource-Intensive

Scanning large sites with many plugins and themes can be time-consuming and may impact server performance.

There are various strategies you can adopt to mitigate this such as scheduling scans during low-traffic periods to minimize disruption to site visitors. You can also perform scans on a staging copy of your site rather than directly on the live environment.

### 4. Learning Curve

As a command-line tool, WPScan can be intimidating for less technical users. However, the documentation is excellent, and with practice, you’ll become proficient.

If the CLI is overwhelming for you, try pairing WPScan with security plugins that offer GUI-based scanning and reporting.

---

## Best Practices for Using WPScan

To get the most out of WPScan, you’ll want to to tailor its usage to your site’s specific needs and establish a robust strategy for monitoring results. Here’s how you can maximize its effectiveness:

### Choose the Right Scans for Your Site

WPScan offers a variety of scan options, from basic scans to targeted vulnerability checks for plugins, themes, and user accounts. Choosing the right scans depends on the type of site you manage and the sensitivity of the data it handles.

**For small, low-traffic sites**:

- Prioritize basic scans to check WordPress core, plugins, and themes for updates and vulnerabilities.
- Run scans monthly or after major updates.
- Use user enumeration (`--enumerate u`) if you suspect weak passwords or default usernames.

**For medium-sized business sites**:

- In addition to basic scans, include plugin and theme enumeration (`--enumerate p,t`) to ensure all components are secure.
- Weekly scans to stay ahead of emerging threats.
- Combine WPScan with activity log plugins to track user actions and file changes.

**For high-traffic or e-commerce sites**:

- Perform comprehensive scans, including user enumeration (`--enumerate u`), file enumeration (`--enumerate f`), and password brute-force testing (if allowed).
- Daily or weekly scans to minimize risk.
- Implement additional measures like 2FA for admin accounts, a web application firewall (WAF), and security headers to reinforce your site.

**For sites handling sensitive data**:

- Prioritize all available scans, including those for exposed files and configuration vulnerabilities.
- Weekly scans with real-time monitoring via a security plugin.
- Use staging environments to test security settings without affecting production.

### Should You Use All Scans?

While it may seem beneficial to use every scan WPScan offers, there are various factors to consider.

First, think about your site’s size and your resources. For smaller sites, running all scans can be overkill and resource-intensive.

You’ll also want to focus on scans that address your site's most likely vulnerabilities. For example, an e-commerce site should prioritize user and payment security over exhaustive file enumeration.

Compliance requirements are also important to take into consideration. If you’re subject to regulations like GDPR, ensure you scan for and address vulnerabilities related to data protection.

---

## How to Monitor Results Effectively

Monitoring WPScan results is important. It helps you fix vulnerabilities, of course, but it also helps you create a system to track changes over time and stay vigilant.

### Set Up Reporting

You can save scan results to files using the `--output` flag:

```sh
wpscan --url http://example.com --output /path/to/report.txt
```

Then review the reports regularly and compare them to previous scans to identify recurring issues or new vulnerabilities.

### Create an Action Plan

It’s a good idea to categorize vulnerabilities based on severity (for example, critical, moderate, low).

This allows you to address high-severity issues (like outdated plugins with known exploits) immediately. Then you can schedule lower-priority tasks, such as file permission adjustments or minor configuration changes, for routine maintenance.

### Track Trends Over Time

Use tools like spreadsheets or a project management app (for example, Trello, Asana) to log vulnerabilities, fixes, and follow-up actions.

Make sure you analyze recurring issues to identify patterns, such as frequent plugin vulnerabilities, and consider replacing problematic components.

### Automate Notifications

If you schedule scans using cron jobs, set up email alerts or notifications to review results without delay.

Use security plugins with real-time monitoring to notify you of suspicious activities in between WPScan checks.

### Communicate with Your Team*

You’ll want to make sure you share reports with relevant team members, such as developers or site administrators, so everyone is aware of potential vulnerabilities.

It’s also a good idea to establish protocols for immediate action if critical vulnerabilities are discovered.

By choosing scans based on your site’s specific needs and implementing a structured approach to monitoring results, you can ensure WPScan is used effectively. Also, make sure you tailor the tool to your risk profile, track vulnerabilities over time, and integrate its findings into a broader security strategy.

This approach not only improves your site’s security posture but also minimizes resource use and effort while delivering maximum protection.

---

## Conclusion

WPScan is an invaluable tool for anyone managing a WordPress site. It simplifies the process of identifying vulnerabilities and provides clear, actionable recommendations to strengthen your site’s security.

By integrating WPScan into your workflow and following best practices, you can reduce the risk of attacks and keep your WordPress site safe. Security is a continuous journey, and tools like WPScan make it easier to stay ahead of potential threats.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use WPScan to Keep Your WordPress Site Secure",
  "desc": "Over 40% of the web is powered by WordPress. But this makes this popular CMS an attractive target for hackers. So if you run a WordPress site, you’ll need to make sure it’s secure. And this isn’t just a technical task, but is also a key responsibilit...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-use-wpscan-to-keep-your-wordpress-site-secure.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
