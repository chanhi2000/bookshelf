---
lang: en-US
title: "How to Fix a Leaked API Key: A Developer’s Guide to Git Security"
description: "Article(s) > How to Fix a Leaked API Key: A Developer’s Guide to Git Security"
icon: iconfont icon-git
category:
  - Git
  - DevOps
  - Security
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - git
  - devops
  - sec
  - security
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Fix a Leaked API Key: A Developer’s Guide to Git Security"
    - property: og:description
      content: "How to Fix a Leaked API Key: A Developer’s Guide to Git Security"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-fix-a-leaked-api-key.html
prev: /programming/git/articles/README.md
date: 2026-08-26
isOriginal: false
author:
  - name: Eva J Patel
    url: https://freecodecamp.org/news/author/evapatel123/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0903575c-822b-481b-af12-07b864bebc67.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Git > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/git/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Security > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Fix a Leaked API Key: A Developer’s Guide to Git Security"
  desc="Imagine this: you're working late, your code finally works, and you're ready to push it to GitHub. You run: git add . git commit -m ”Fix API integration” git push A few minutes later, you notice some"
  url="https://freecodecamp.org/news/how-to-fix-a-leaked-api-key"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0903575c-822b-481b-af12-07b864bebc67.png"/>

Imagine this: you're working late, your code finally works, and you're ready to push it to GitHub.

You run:

```sh
git add .
git commit -m "Fix API integration"
git push
```

A few minutes later, you notice something strange. Your API usage has suddenly increased. Maybe there are unexpected requests, new cloud resources, or even a bill that looks much larger than expected.

Then you find it:

```js
const apiKey = "sk_live_123456789";
```

Your API key is sitting in a Git repository.

This situation is stressful, but it's fixable.

The most important rule is:

> **If an API key has been committed to Git, assume it has been copied and compromised, even if you delete it immediately.**

Deleting the key from the latest version of your file doesn't make the old key safe. Git keeps previous versions of files in its history, and exposed credentials can be discovered by automated scanners.

We'll use this basic workflow throughout the article:

```mermaid
flowchart TD
  A[Invalidate] --> B[Investigate]
  B --> C[Remove]
  C --> D[Replace]
  D --> E[Prevent]
```

Let's start with what an API key actually is before we get to the most important part: what to do **right now** after a key is exposed.

---

## What Is an API Key?

An API key is a credential that allows an application to communicate with another service.

For example, an application might use an API key to access:

- A weather service
- A payment provider
- A mapping service
- An artificial intelligence API
- A cloud platform
- A database
- An email provider
- A private company API

A key might look something like this:

```js
const apiKey = "your-real-api-key";
```

Or it might appear in a configuration file:

```json
{
  "apiKey": "your-real-api-key",
  "databasePassword": "your-real-password"
}
```

API keys are often called **secrets** because possessing one may allow someone to make requests, access data, create resources, or generate charges on your account.

Not every API key is equally sensitive. Some services provide browser keys that are intentionally visible to users. Those keys should still have appropriate restrictions, quotas, and permissions.

::: note As a general rule

> If a credential can access private data, create resources, modify records, or generate charges, it shouldn't be stored directly in your source code.

:::

---

## The Emergency Response: What to Do First

When you discover a leaked credential, a common reaction is to delete the key from the file and push another commit.

Don't start there.

Your first priority is to **make the leaked credential useless**.

Use this order of operations:

```text
1. Invalidate the leaked credential
2. Investigate suspicious activity
3. Remove the secret from your code
4. Replace it with a new credential
5. Clean the Git history if necessary
6. Verify the cleanup
7. Add protections against future leaks
```

Think of an API key like a house key that was dropped in a crowded street.

Deleting a picture of the key doesn't matter if someone already picked up the physical key.

**Change the lock first.**

---

## Step 1: Revoke or Rotate the Leaked Key

Go to the dashboard of the service that issued the credential.

Depending on the provider, you may see options such as:

- Revoke
- Delete
- Disable
- Rotate
- Regenerate
- Create new key

If the provider supports key rotation, create a replacement credential before disabling the old one if possible. This can reduce application downtime while you update your configuration.

The important thing is that the original credential must no longer be usable.

**Do not reuse the leaked key.** Don't rename it. Don't encode it. Don't move it to another file and assume it is safe. Don't assume nobody saw it.

Treat it as compromised.

---

## Step 2: Investigate Suspicious Activity

After disabling the credential, check the provider's usage dashboard and logs.

Look for things such as:

- Sudden spikes in requests
- Requests from unfamiliar locations
- Unexpected database queries
- New cloud resources
- Changes to permissions
- Unexpected downloads
- Unusual payment activity
- New deployments
- Requests at times when your application was inactive

If the credential had broad permissions, assume that anything within its permission scope **MAY have been accessed or modified**.

For example, if a cloud credential could create virtual machines, check whether unexpected machines were created.

If a credential could access a database, review:

- Authentication logs
- Read operations
- Write operations
- Deleted records
- Exported data
- Newly created accounts
- Permission changes

Also check your billing information if the credential could generate usage-based charges.

Write down what you discover. A simple timeline can help:

```text
10:15 - API key committed
10:23 - Repository pushed publicly
10:41 - Unusual usage detected
10:45 - Key revoked
11:00 - Logs reviewed
11:30 - Replacement key deployed
12:00 - Git history cleaned
```

This can be especially useful if you need to report the incident to a team or service provider.

---

## Step 3: Remove the Secret From Your Current Code

Once the original credential has been disabled, remove it from your working files.

This is unsafe:

```js
const apiKey = "your-real-api-key";
```

Instead, load the credential from the environment:

```js
const apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error("API_KEY is not configured");
}
```

In Python:

```py
import os

api_key = os.environ.get("API_KEY")

if not api_key:
    raise RuntimeError("API_KEY is not configured")
```

The important idea is simple:

```text
Source code → environment variable → secret value
```

instead of:

```text
Source code → hardcoded secret
```

Environment variables aren't the only way to manage secrets, but they are a common and practical solution for local development and many deployment environments.

---

## Step 4: Use a <VPIcon icon="iconfont icon-dotenv"/>`.env` File for Local Development

For local development, you can store environment variables in a <VPIcon icon="iconfont icon-dotenv"/>`.env` file.

For example:

```sh title=".env"
API_KEY=your-local-development-key
DATABASE_URL=your-local-database-url
```

A Node.js project can load these values with a package such as `dotenv`.

Install it with:

```sh
npm install dotenv
```

Then:

```js
import "dotenv/config";

const apiKey = process.env.API_KEY;
```

The important part is that the <VPIcon icon="iconfont icon-dotenv"/>`.env` file normally **should not be committed to Git**.

Add it to <VPIcon icon="iconfont icon-git"/>`.gitignore`:

```gitignore
# Environment files
.env
.env.*
!.env.example

# Credential files
*.pem
*.key
credentials.json
service-account.json

# Local development files
.DS_Store
```

But there's an important detail here: the <VPIcon icon="iconfont icon-git"/>`.gitignore` **does NOT remove files that Git is already tracking.**

If <VPIcon icon="iconfont icon-dotenv"/>`.env` has already been committed, adding it to <VPIcon icon="iconfont icon-git"/>`.gitignore` won't erase it from Git.

You can stop tracking the file while keeping it on your computer:

```sh
git rm --cached .env
```

Then commit the <VPIcon icon="iconfont icon-git"/>`.gitignore` change:

```sh
git add .gitignore
git commit -m "Ignore local environment files"
```

But remember: this only removes the file from future commits. It does **not** remove the secret from previous commits.

That's where Git history comes in.

---

## Step 5: Create a Safe <VPIcon icon="iconfont icon-dotenv"/>`.env.example`

Other developers still need to know which environment variables the application requires.

Instead of committing <VPIcon icon="iconfont icon-dotenv"/>`.env`, create <VPIcon icon="iconfont icon-dotenv"/>`.env.example`:

```sh title=".env.example"
API_KEY=
DATABASE_URL=
PORT=3000
LOG_LEVEL=info
```

This file contains variable names rather than real credentials, so it can be committed to the repository.

You can also provide comments:

```sh title=".env.example"
# Required API credential
API_KEY=

# PostgreSQL connection string
DATABASE_URL=

# Optional application port
PORT=3000
```

A new developer can then copy the file:

```sh
cp .env.example .env
```

and provide their own values.

Use clearly fake placeholders in examples:

```sh title=".env"
API_KEY=replace-me-with-your-own-key
```

Avoid putting realistic-looking production credentials into <VPIcon icon="iconfont icon-dotenv"/>`.env.example`.

---

## Step 6: Determine Whether the Secret Is Still in Git History

This is one of the most important parts of fixing a leaked credential.

Suppose your Git history looks like this:

```text
Commit A: Add API key to config.js
Commit B: Update API integration
Commit C: Delete API key
```

Even though Commit C no longer contains the key, Commit A still does.

Git remembers previous versions of your files.

You can inspect the history of a file with:

```sh
git log --all -- config.js
```

To display a file from an older commit:

```sh
git show COMMIT_ID:config.js
```

You can also search Git history for a known leaked value:

```sh
git log --all -S"your-leaked-key" --oneline
```

If you know the secret was committed, you should assume that it exists somewhere in the repository's history until you've verified otherwise.

---

## When Do You Need to Rewrite Git History?

Not every accidental secret requires a history rewrite. Consider these situations:

### The Secret Was Never Committed

If the secret exists only in your working directory and was never committed, you generally don't need to rewrite history.

Remove it, add the appropriate file to <VPIcon icon="iconfont icon-git"/>`.gitignore`, and continue.

### The Secret Was Committed Locally But Never Pushed

If the secret exists in local commits but hasn't been shared with a remote repository, you may be able to clean up those commits before pushing.

### The Secret Was Pushed to a Remote Repository

Treat the credential as compromised. Revoke or rotate it immediately.

Then determine whether removing the secret from the repository's history is appropriate.

### The Repository Was Public

Assume that someone or something may already have copied the secret.

This is why **revocation comes before Git cleanup**.

### The Secret Was in a Private Repository

A private repository is safer than a public repository, but it isn't a secret vault.

Credentials can still escape through:

- Compromised accounts
- Contractors
- Integrations
- CI logs
- Forks
- Backups
- Screenshots
- Copied code
- Pull requests

So the safest rule remains:

> **Never intentionally commit credentials to Git, even in a private repository.**

---

## Step 7: Remove the Secret From Git History

If the credential was committed, you may need to remove it from the repository's history.

Before rewriting history, create a backup:

```sh
git clone --mirror https://github.com/your-username/your-repository.git repository-backup.git
```

A mirror clone includes branches and tags, which makes it useful for recovery if something goes wrong.

### Option 1: Remove an Entire File

If the secret was stored in a file such as <VPIcon icon="iconfont icon-dotenv"/>`.env`, you can remove that file from the entire history:

```sh
git filter-repo --path .env --invert-paths
```

For a file inside a directory:

```sh
git filter-repo --path config/production.json --invert-paths
```

This removes the file from the repository's rewritten history.

### Option 2: Replace a Secret Inside a File

Sometimes you need to keep the file but remove the secret from previous versions.

Create a temporary replacements file:

Then run:

```sh
git filter-repo --replace-text replacements.txt
```

You can replace the value with a placeholder:

```text
your-leaked-key==>YOUR_API_KEY_HERE
```

Be extremely careful with <VPIcon icon="fas fa-file-lines"/>`replacements.txt`. It contains the original secret, so **do not commit it.**

Delete it after the cleanup:

```sh
rm replacements.txt
```

On Windows PowerShell:

```powershell
Remove-Item replacements.txt
```

For multiple secrets:

```text
old-api-key==>REMOVED_API_KEY
old-database-password==>REMOVED_DATABASE_PASSWORD
old-token==>REMOVED_TOKEN
```

Then:

```sh
git filter-repo --replace-text replacements.txt
```

Test the cleanup on your backup clone first.

---

## Step 8: Verify That the Secret Is Gone

Never assume the cleanup worked just because the command completed successfully.

Search for the known leaked value again:

```sh
git log --all -S"your-leaked-key" --oneline
```

You can also inspect relevant files and commits:

```sh
git log --all -- config.js
```

and:

```sh
git show COMMIT_ID:config.js
```

If your repository uses branches and tags, make sure you aren't checking only the branch you currently have checked out.

You should also inspect other locations where the secret may have appeared, including pull requests, CI/CD logs, build artifacts, release files, Docker images, package releases, documentation, issue comments, and screenshots

::: note Remember

> **Rewriting your repository doesn't erase copies that already exist somewhere else.**

:::

That's another reason why the original credential must be revoked.

---

## Step 9: Push the Cleaned History Carefully

Once you've verified the cleanup, you may need to push the rewritten history:

```sh
git push --force --all origin
git push --force --tags origin
```

### Important Warning

**Force-pushing rewritten history is disruptive.** It changes commit hashes and can affect collaborators who have existing clones of the repository.

Before doing this on a shared project:

1. Tell your collaborators.
2. Make sure everyone understands that history is being rewritten.
3. Coordinate the cleanup.
4. Follow your organization's incident-response process if one exists.

After the rewrite, collaborators may need to reclone the repository:

```sh
git clone https://github.com/your-username/your-repository.git
```

They shouldn't blindly merge their old repository history back into the cleaned repository.

---

## Step 10: Replace the Credential Everywhere

Now create or use the replacement credential. Update every environment where the application runs. Common locations include:

- Local development
- Testing
- Staging
- Production
- Docker containers
- Kubernetes secrets
- CI/CD systems
- Hosting platforms
- Scheduled jobs
- Serverless functions

A common mistake is updating production but forgetting the deployment pipeline.

For example, your local application may work because <VPIcon icon="iconfont icon-dotenv"/>`.env` contains the new key, while your CI/CD system still contains the old one.

Make a checklist:

```text
1. Local development
2. Automated tests
3. Staging
4. Production
5. CI/CD variables
6. Docker configuration
7. Cloud deployment settings
8. Scheduled scripts
9. Serverless functions
```

After updating the credential, test the application in each important environment.

---

## Step 11: Restrict the Replacement Key

Replacing a leaked credential is only part of the solution.

The new credential should have **only the permissions it actually needs**.

Useful restrictions can include:

- Read-only permissions
- Specific API scopes
- Allowed IP addresses
- Allowed domains
- Environment-specific access
- Request quotas
- Rate limits
- Expiration dates

For example, a weather application may only need permission to read weather data.

It shouldn't have permission to manage users, modify billing, or delete unrelated resources.

This is the **principle of least privilege**:

> **Give each credential the smallest amount of access necessary to perform its job.**

It's also a good idea to use different credentials for different environments:

```text
local-development-key
testing-key
staging-key
production-key
```

That way, a development credential leak doesn't automatically expose production resources.

---

## What About Frontend Applications?

This is where API-key security gets confusing.

Frontend code runs on the user's device.

That means users can inspect it.

For example:

```js
const apiKey = "browser-key";
```

A user can inspect the JavaScript bundle, browser developer tools, or network requests and potentially see the value.

Some services intentionally provide browser API keys that are designed to be publicly visible.

Those keys should still be restricted by things such as:

- Allowed domains
- Website origins
- API operations
- Usage quotas
- Referrer restrictions
- Time limits

But a truly private credential should **never be placed in browser code**.

Instead of:

```js
fetch("https://private-api.example.com/data", {
  headers: {
    Authorization: "Bearer private-secret-token"
  }
});
```

have the browser call your own backend:

```js
fetch("/api/data");
```

Then the backend communicates with the private service:

```js
const response = await fetch(
  "https://private-api.example.com/data",
  {
    headers: {
      Authorization: `Bearer ${process.env.PRIVATE_API_TOKEN}`
    }
  }
);
```

The backend can then return only the information the browser is allowed to receive.

The important distinction is:

```mermaid
flowchart TD
  A[Public/browser credential] --> B[Can be visible, but should be restricted]
  B --> C[Private credential]
  C --> D[Must remain on a trusted backend or secret-management system]
```

---

## Environment Variables vs Secret Managers

Environment variables are useful, but they're not a universal secret-management solution.

For a small application or local development environment, something like:

```sh title=".env"
API_KEY=your-secret
```

may be perfectly reasonable.

For larger production systems, you may want a dedicated **secret manager**.

A secret-management system can provide features such as:

- Centralized credential storage
- Access controls
- Auditing
- Credential rotation
- Versioning
- Separation between environments
- Integration with deployment systems

The important idea is that your source code shouldn't be responsible for storing production secrets.

Instead:

```mermaid
flowchart TD
  A[Application] --> B[Secret management system]
  B --> C[Credential]
```

rather than:

```mermaid
flowchart TD
  A[Application] --> B[Hardcoded production credential]
```

Which solution you use depends on the size and requirements of your project.

---

## Add Secret Scanning to Your Workflow

Humans are excellent programmers and occasionally terrible search engines.

Automated secret scanning can catch credentials before they make it into a repository.

Popular tools include:

- Gitleaks
- TruffleHog
- detect-secrets
- Pre-commit hooks
- Git hosting secret scanning
- CI security scanners

For example, you can run Gitleaks locally:

```sh
gitleaks detect --source . --verbose
```

You can also integrate secret scanning into CI.

A basic GitHub Actions workflow might look like this:

```yaml
name: Secret Scan

on:
  push:
  pull_request:

jobs:
  scan:
    runs-on: ubuntu-latest

    steps:
      - name: Check out repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Scan for secrets
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Review the documentation for your chosen tool and pin versions according to your project's security practices.

Secret scanners can produce false positives, so you may need to configure exceptions for safe test values.

Be careful with allowlists, though. An overly broad exception can hide a real credential.

---

## Use Git Hooks as an Extra Safety Net

You can also scan files before they're committed.

For example, a simple pre-commit script could search for suspicious words:

```sh
#!/usr/bin/env bash

if grep -RniE "api[_-]?key|password|secret|token|private[_-]?key" . \
  --exclude-dir=.git \
  --exclude=".env.example"; then

  echo "Possible secret detected. Commit cancelled."
  exit 1
fi
```

This isn't a complete security scanner, but it can catch obvious mistakes.

For stronger protection, use a dedicated secret-scanning tool through a pre-commit framework.

The goal isn't to make committing miserable. The goal is to make accidentally publishing a credential harder.

---

## Review Your Staged Diff Before Committing

One of the simplest security habits you can develop is checking what you're actually about to commit.

First:

```sh
git status
```

Then stage only the files you intend to commit:

```sh
git add src/api.js README.md
```

Now inspect the staged changes:

```sh
git diff --cached
```

Look for:

- API keys
- Passwords
- Tokens
- Private URLs
- Internal hostnames
- Customer data
- Debug output
- Personal information
- Private certificates

Only commit after the staged diff looks correct:

```sh
git commit -m "Load API key from environment"
```

Be cautious with:

```sh
git add .
```

It can stage files you never intended to publish, including <VPIcon icon="iconfont icon-dotenv"/>`.env` files, database exports, generated files, or local configuration.

---

## Common Mistakes Developers Make

### Mistake 1: "I Deleted It, So It's Fine"

Deleting a secret from the current version of a file doesn't delete it from Git history.

**Correct response:** Revoke the credential and clean the repository history when appropriate.

### Mistake 2: "The Repository Is Private"

Private repositories aren't vaults.

Credentials can still escape through compromised accounts, integrations, CI logs, forks, backups, or copied code.

**Correct response:** Don't commit secrets even to private repositories.

### Mistake 3: "I'll Just Encode It"

These don't make a credential secret:

```js
const key = atob("c29tZS1rZXk=");
```

or:

```js
const key = "some-" + "secret-" + "value";
```

Encoding, splitting, renaming, or hiding a credential doesn't protect it.

If your application can reconstruct the credential, someone analyzing the application may be able to do the same.

### Mistake 4: Logging the Secret

Don't do this:

```js
console.log(process.env.API_KEY);
```

Logs can be stored by your terminal, CI system, hosting provider, monitoring platform, or cloud service.

Instead:

```js
console.log(
  "API key configured:",
  Boolean(process.env.API_KEY)
);
```

If you absolutely need to inspect a value during debugging, avoid printing the full credential.

For example:

```js
function maskSecret(value) {
  if (!value) return "not configured";
  if (value.length <= 8) return "********";

  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}

console.log(maskSecret(process.env.API_KEY));
```

Even masked credentials should be handled carefully.

### Mistake 5: Using the Same Credential Everywhere

If local development, testing, staging, and production all use the same credential, one leak can affect everything.

::: info Correct response

Use separate credentials with separate permissions.

:::

### Mistake 6: Cleaning Only the Current Branch

A secret can remain in:

- Old branches
- Tags
- Pull requests
- Other references

::: info Correct response

Consider the entire repository when investigating and cleaning a leaked credential.

:::

### Mistake 7: Forgetting Build Artifacts

A secret might also appear in:

- Compiled JavaScript bundles
- Docker images
- Downloadable releases
- Published packages
- Generated documentation

::: info Correct response

Revoke the credential and identify affected artifacts that may need to be removed or replaced.

:::

---

## A Complete API-Key Incident Checklist

If you discover that you've exposed an API key, use this checklist:

```text
1. Revoke or rotate the leaked key
2. Create a replacement credential
3. Restrict the replacement credential
4. Review provider logs
5. Review billing and usage
6. Check for unauthorized resources
7. Remove the key from current files
8. Add secret files to .gitignore
9. Create or update .env.example
10. Search Git history
11. Check branches and tags
12. Remove the secret from Git history if necessary
13. Verify the old secret is gone
14. Force-push cleaned history if appropriate
15. Check pull requests and forks
16. Check CI and deployment logs
17. Update local configuration
18. Update staging configuration
19. Update production configuration
20. Update CI/CD secrets
21. Run a secret scanner
22. Document the incident
23. Add preventive security checks
```

The exact steps will depend on your provider and project, but the order matters: **Invalidate first. Clean up second.**

---

## A Secure Project Structure

A simple Node.js project might look like this:

```sh title="file structure"
my-project/
├── src/
│   └── api.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

The local <VPIcon icon="iconfont icon-dotenv"/>`.env` file contains the actual development value:

```sh title=".env"
API_KEY=your-local-key
```

The <VPIcon icon="iconfont icon-dotenv"/>`.env.example` file contains no real credential:

```sh title=".env.example"
API_KEY=replace-me-with-your-own-key
```

The application reads the environment variable:

```js
import "dotenv/config";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error("Missing API_KEY environment variable");
}

export async function getData() {
  const response = await fetch(
    "https://api.example.com/data",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }
  );

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status}`
    );
  }

  return response.json();
}
```

And <VPIcon icon="iconfont icon-git"/>`.gitignore` keeps the local environment file out of future commits:

```gitignore
.env
.env.*
!.env.example

node_modules/
```

Finally, your README can explain the setup without exposing credentials:

Step 1: Copy the example environment file on your bash `cp .env.example .env`

Step 2: Add your own API key to <VPIcon icon="iconfont icon-dotenv"/>`.env`.

And last but not least, start your application!

```sh
npm start
```

---

## Final Thoughts

Leaking an API key doesn't mean you're a terrible developer. It just means your development workflow needs better guardrails.

The important thing is knowing how to respond quickly and how to prevent the same mistake from happening again.

Remember the emergency formula:

```mermaid
flowchart TD
  A[Invalidate] --> B[Investigate]
  B --> C[Remove]
  C --> D[Replace]
  D --> E[Prevent]
```

The important thing is knowing how to respond quickly and how to prevent the same mistake from happening again.

- Invalidate the leaked credential so it can no longer be used.
- Investigate your logs, usage, and billing to determine whether it was abused.
- Remove the secret from your current code and, when necessary, from Git history.
- Replace it with a new credential that has only the permissions it needs.
- Prevent future leaks with environment variables, secret managers, secret scanning, and careful Git practices.

Git is excellent at remembering your project's history. That's useful when you accidentally delete an important function. But it's much less useful when that history contains a password.

So keep your code public when appropriate. And **keep your secrets somewhere else.**

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Fix a Leaked API Key: A Developer’s Guide to Git Security",
  "desc": "Imagine this: you're working late, your code finally works, and you're ready to push it to GitHub. You run: git add . git commit -m ”Fix API integration” git push A few minutes later, you notice some",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-fix-a-leaked-api-key.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
