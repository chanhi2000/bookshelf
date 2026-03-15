---
lang: en-US
title: "How to Set Up WebAuthn in Node.js for Passwordless Biometric Login"
description: "Article(s) > How to Set Up WebAuthn in Node.js for Passwordless Biometric Login"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Set Up WebAuthn in Node.js for Passwordless Biometric Login"
    - property: og:description
      content: "How to Set Up WebAuthn in Node.js for Passwordless Biometric Login"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/set-up-webauthn-in-node-js-for-passwordless-biometric-login.html
prev: /programming/js-express/articles/README.md
date: 2026-03-20
isOriginal: false
author:
  - name: Sumit Saha
    url: https://freecodecamp.org/news/author/sumitsaha/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8cc356c5-b011-4316-8236-a0443eb2cc03.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Set Up WebAuthn in Node.js for Passwordless Biometric Login"
  desc="JWT auth feels clean until a stolen token still looks valid to your server. That's the real problem: a bearer token proves possession of a token, but it doesn't prove possession of a trusted device. I"
  url="https://freecodecamp.org/news/set-up-webauthn-in-node-js-for-passwordless-biometric-login"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8cc356c5-b011-4316-8236-a0443eb2cc03.png"/>

JWT auth feels clean until a stolen token still looks valid to your server. That's the real problem: a bearer token proves possession of a token, but it doesn't prove possession of a trusted device. If an attacker gets a reusable token, replay starts to look like a normal login.

WebAuthn changes the shape of the system. The private key stays on the user's device. Your server stores a public key, a credential ID, and a counter. Each registration or login signs a fresh challenge. The browser, the authenticator, and your backend all take part in the ceremony.

This guide walks you through the full path in Node.js. You'll set up the backend, wire registration and login, store passkeys correctly, replace long-lived bearer auth with short server sessions, support backup devices, and add step-up verification for risky actions.

::: warning

WebAuthn works in secure contexts. Use localhost for local development, and use HTTPS everywhere else.

:::

::: note Prerequisites

To follow along and get the most out of this guide, you should have:

- Basic knowledge of JavaScript and Node.js.
- Basic knowledge of TypeScript and Express.
- Basic frontend to backend flow. You should be able to follow `fetch()` requests from the browser to the server and back.
- A modern browser and a passkey-capable authenticator, such as Touch ID, Face ID, Windows Hello, Android biometrics, or a security key.
- Local testing on `localhost`. The demo uses `localhost` as the relying party ID and origin during development.
- No prior WebAuthn knowledge required. The article explains the registration and authentication flow step by step.

:::

---

## Why JWT Alone Falls Short

JWTs are not the villain.

The weak point is the usual deployment pattern around JWTs. Teams often place long-lived tokens in places attackers love, then trust those tokens for too long.

The failure path usually looks like this:

- Your server issues a reusable bearer token.
- The browser stores it.
- Malware, XSS, session theft, or a fake login flow grabs it.
- The attacker replays it.
- Your backend sees a valid token and treats the request as real.

That pattern falls apart fast on high-risk routes. Admin actions, money movement, payout approval, email change, API key creation, or destructive writes deserve stronger proof.

WebAuthn gives you stronger proof because the secret never leaves the authenticator.

In the above diagram, the left side (reusable JWT path) shows the risk of reusable tokens. A server issues a JWT after login. The browser stores the token. An attacker steals the token and sends requests. The backend accepts the token until expiration. Replay becomes possible.

On the right side (WebAuthn path), the flow changes. The server sends a fresh challenge for each login. Your device signs the challenge using a private key stored inside the authenticator. The server verifies the signature before creating a short session.

The key point is simple: JWTs rely on a stored bearer secret, while WebAuthn relies on device-bound cryptographic proof created for a single challenge.

---

## What WebAuthn Changes

WebAuthn uses asymmetric cryptography.

The authenticator creates a key pair. The private key stays on the device. Your backend stores the public key and uses it later to verify signatures. During login, your server sends a fresh challenge. The device signs it, and your backend verifies the result against the stored public key.

That changes three things at once:

- The browser never receives a reusable password secret.
- A stolen public key is useless for login.
- Each ceremony depends on a fresh server challenge.

On the web, passkeys ride on top of WebAuthn. A passkey might live on the local device, a synced platform account, or a physical security key. In practice, your app still deals with the same core objects: credential ID, public key, transports, counter, device type, and backup state.

---

## Initialize the Project

So far, we've talked about why WebAuthn matters and how it changes the login experience. Now it's time to build a small project so you can see the whole flow working end to end.

In this demo, you'll create a simple Node.js app where a user can register a passkey, sign in with that passkey, and then access protected routes through a short-lived session. The idea here is not to build a polished full-stack product. The idea is to build the core backend flow clearly, so you can understand how registration, login, sessions, and step-up verification connect to each other.

Before we start, make sure Node.js and npm are installed on your machine. You can install Node.js from the official website, or use nvm if you prefer managing multiple Node versions.

```sh
node -v
npm -v
```

The expected output is a Node LTS version and an npm version number.

Next, create a new project folder and initialize the basic structure:

```sh
mkdir webauthn-node-demo
cd webauthn-node-demo
npm init -y
npx tsc --init
mkdir src
```

---

## Install Dependencies

Now that your project is initialized, install the required packages.

### 1. TypeScript and tsx

TypeScript types the backend while `tsx` runs TypeScript files during development.

```sh
npm i -D typescript tsx @types/node
npx tsc -v
npx tsx --version
```

### 2. Express and session management

Express handles the HTTP routes, and `express-session` stores short-lived server session state.

```sh
npm i express express-session @types/express @types/express-session
```

### 3 impleWebAuthn

`@simplewebauthn/server` generates registration options and verifies responses. `@simplewebauthn/browser` starts browser-side flows.

```sh
npm i @simplewebauthn/server @simplewebauthn/browser
```

Open your <VPIcon icon="iconfont icon-json"/>`package.json` and update the "scripts" block to include these commands:

```json
{
  "scripts": {
    "dev": "tsx watch src/app.ts",
    "build": "tsc",
    "start": "node dist/app.js"
  }
}
```

---

## Define the Data Model

Before we write the routes, we need to decide how this app will store passkeys.

With password-based login, you usually store a password hash. With WebAuthn, you store something different. After a user registers a passkey, your server needs to keep the credential data required to verify future login attempts. That includes things like the credential ID, public key, counter, and some metadata about the authenticator.

This is why the data model matters from the beginning. Registration and authentication both depend on this stored data, so it's worth making the structure clear before we move deeper into the flow.

A good way to think about it is this. A user can have one or more passkeys, and each passkey should be stored as its own record linked to that user.

Create a new file named <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`app.ts`. We'll build the backend in this file, and we'll start by defining the data model at the top.

```ts title='app.ts"
type Passkey = {
  id: string;
  publicKey: Uint8Array;
  counter: number;
  deviceType: "singleDevice" | "multiDevice";
  backedUp: boolean;
  transports?: string[];
};

type User = {
  id: string;
  email: string;
  webAuthnUserID: Uint8Array;
  passkeys: Passkey[];
};

const users = new Map<string, User>();

function findUserByEmail(email: string) {
  return [...users.values()].find((user) => user.email === email);
}
```

::: info What matters here:

- `id` identifies the credential later.
- `publicKey` verifies future signatures.
- `counter` helps detect cloned or misbehaving authenticators.
- `deviceType` and `backedUp` give you useful recovery signals.
- `webAuthnUserID` should be a stable binary value, stored once per user.

:::

::: tip

If your database returns `Buffer` or another binary wrapper for `publicKey`, convert it back to `Uint8Array` before verification.

:::

---

## Build the Server Foundation

Next, append the core Express app and relying party settings to <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`app.ts`:

```ts title="app.ts"
import express from "express";
import session from "express-session";
import { randomBytes, randomUUID } from "node:crypto";
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
  type WebAuthnCredential,
} from "@simplewebauthn/server";

const rpName = "Node Auth Lab";
const rpID = "localhost";
const origin = "http://localhost:3000";

declare module "express-session" {
  interface SessionData {
    currentChallenge?: string;
    pendingUserId?: string;
    userId?: string;
    stepUpUntil?: number;
  }
}

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "replace-this-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 10 * 60 * 1000,
    },
  }),
);
```

This gives you the shared state you need for:

- registration challenge tracking
- authentication challenge tracking
- logged-in session state
- short step-up windows for risky actions

---

## Registration Ceremony

Registration is the part where a user's device creates a new passkey and connects it to their account.

You will often see the word ceremony in WebAuthn documentation. In simple terms, it refers to the full exchange between your server, the browser, and the authenticator during registration or login. So when we say registration ceremony, we simply mean the full process of creating and verifying a new passkey.

There are three parts involved here:

- Your backend prepares the registration options and challenge.
- The browser starts the WebAuthn request.
- Then the authenticator, such as a phone, laptop, or security key, creates the key pair and returns the result.

In the above diagram, the registration ceremony links a new passkey to your account. The browser asks the server for registration options. The server generates a challenge and returns a JSON configuration. Next, the browser starts the WebAuthn ceremony. Your authenticator creates a new key pair after biometric or security key verification. The private key stays inside the device. Then the browser sends the attestation response to the server.

Verification happens next. The server checks challenge, origin, and relying party ID. After validation, the server stores credential ID, public key, counter value, device type, and backup state. The account now holds a passkey.

Now that the overall flow is clear, let's build it step by step. We'll start by returning registration options from the backend.

### 1. Return Registration Options from the Backend

This endpoint creates a new user if needed, generates the registration options, and stores the challenge server-side.

Append the following route to your <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`app.ts` file:

```ts :collapsed-lines title="app.ts"
app.post("/auth/register/options", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  let user = findUserByEmail(email);

  if (!user) {
    user = {
      id: randomUUID(),
      email,
      webAuthnUserID: randomBytes(32),
      passkeys: [],
    };

    users.set(user.id, user);
  }

  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userName: user.email,
    userDisplayName: user.email,
    userID: user.webAuthnUserID,
    attestationType: "none",
    excludeCredentials: user.passkeys.map((passkey) => ({
      id: passkey.id,
      transports: passkey.transports,
    })),
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "preferred",
    },
  });

  req.session.currentChallenge = options.challenge;
  req.session.pendingUserId = user.id;

  res.json(options);
});
```

A few decisions here matter:

- `attestationType: 'none'` keeps the flow lighter unless you need richer device provenance.
- `excludeCredentials` stops duplicate registration of the same authenticator.
- `userVerification: 'preferred'` lets the browser lean toward biometrics or local device unlock.

### 2. Start Registration in the Browser

On the browser side, you ask your backend for options, then pass them into `startRegistration()`.

Now, create a new file at <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`browser.ts` to handle the client-side WebAuthn interactions. Add the following function:

```ts :collapsed-lines title="browser.ts"
import { startRegistration } from "@simplewebauthn/browser";

export async function registerPasskey(email: string) {
  const optionsResp = await fetch("/auth/register/options", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const optionsJSON = await optionsResp.json();

  const registrationResponse = await startRegistration({ optionsJSON });

  const verifyResp = await fetch("/auth/register/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationResponse),
  });

  return verifyResp.json();
}
```

::: note

Browsers can't run TypeScript or bare npm imports directly. In a real application, you would import <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`browser.ts` into your frontend framework (React, Vue, and so on) or bundle it using a tool like Vite, Webpack, or esbuild before serving it to the client.

:::

Under the hood, the browser now speaks to the authenticator. That might trigger Face ID, Touch ID, Windows Hello, Android biometrics, or a physical security key prompt.

### 3. Verify the Registration Response and Save the Passkey

Once the browser sends the response back, verify it against the challenge and relying party details you stored earlier.

Append this verification route to <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`app.ts`:

```ts :collapsed-lines title="app.ts"
app.post("/auth/register/verify", async (req, res) => {
  const user = users.get(req.session.pendingUserId ?? "");

  if (!user || !req.session.currentChallenge) {
    return res.status(400).json({ verified: false });
  }

  let verification;

  try {
    verification = await verifyRegistrationResponse({
      response: req.body,
      expectedChallenge: req.session.currentChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
    });
  } catch (error) {
    return res.status(400).json({
      verified: false,
      error:
        error instanceof Error ? error.message : "Registration failed",
    });
  }

  if (!verification.verified || !verification.registrationInfo) {
    return res.status(400).json({ verified: false });
  }

  const { credential, credentialDeviceType, credentialBackedUp } =
    verification.registrationInfo;

  user.passkeys.push({
    id: credential.id,
    publicKey: credential.publicKey,
    counter: credential.counter,
    transports: credential.transports,
    deviceType: credentialDeviceType,
    backedUp: credentialBackedUp,
  });

  req.session.currentChallenge = undefined;
  req.session.pendingUserId = undefined;

  res.json({ verified: true });
});
```

At this point, the user has no password hash in the hot path. The authenticator now holds the private key. Your server stores only what it needs for later verification.

---

## Authentication Ceremony

Authentication is the part where the user proves they still have the passkey they registered earlier. Just like registration, this process is also called a ceremony in WebAuthn. Here, the goal is not to create a new credential. The goal is to verify an existing one in a secure way.

There are four parts involved here:

- Your server creates a fresh challenge.
- The browser passes that challenge to the authenticator.
- The authenticator signs it using the private key stored on the device.
- Then the server verifies the response using the public key it stored during registration.

In the above diagram, login occurs through a challenge-response process. The browser first asks the server for authentication options. The server generates a new challenge and returns the allowed credential list. Your browser then triggers the authenticator. The authenticator signs the challenge using the private key stored on the device. The browser sends the signed assertion to the backend.

Verification follows. The server validates signature, challenge, origin, and credential ID. The stored counter updates. A short session is issued after verification. Login depends on device proof instead of reusable credentials.

With that flow in mind, let's move into the implementation. We'll begin by returning authentication options from the backend.

### 1. Return Authentication Options

Fetch the user, list allowed credentials, and store the new challenge.

```ts :collapsed-lines title="app.ts"
app.post("/auth/login/options", async (req, res) => {
  const { email } = req.body;
  const user = findUserByEmail(email);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const options = await generateAuthenticationOptions({
    rpID,
    allowCredentials: user.passkeys.map((passkey) => ({
      id: passkey.id,
      transports: passkey.transports,
    })),
    userVerification: "preferred",
  });

  req.session.currentChallenge = options.challenge;
  req.session.pendingUserId = user.id;

  res.json(options);
});
```

### 2. Start Authentication in the Browser

The browser receives the options, then starts the ceremony. Add the login function to your <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`browser.ts` file:

```ts title="browser.ts"
import { startAuthentication } from "@simplewebauthn/browser";

export async function loginWithPasskey(email: string) {
  const optionsResp = await fetch("/auth/login/options", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const optionsJSON = await optionsResp.json();

  const authenticationResponse = await startAuthentication({ optionsJSON });

  const verifyResp = await fetch("/auth/login/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authenticationResponse),
  });

  return verifyResp.json();
}
```

### 3. Verify the Assertion and Update the Counter

This is the moment where the backend decides whether the login is real.

```ts :collapsed-lines title="app.ts"
app.post("/auth/login/verify", async (req, res) => {
  const user = users.get(req.session.pendingUserId ?? "");

  if (!user || !req.session.currentChallenge) {
    return res.status(400).json({ verified: false });
  }

  const passkey = user.passkeys.find((item) => item.id === req.body.id);

  if (!passkey) {
    return res
      .status(400)
      .json({ verified: false, error: "Passkey not found" });
  }

  const credential: WebAuthnCredential = {
    id: passkey.id,
    publicKey: passkey.publicKey,
    counter: passkey.counter,
    transports: passkey.transports,
  };

  let verification;

  try {
    verification = await verifyAuthenticationResponse({
      response: req.body,
      expectedChallenge: req.session.currentChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential,
      requireUserVerification: true,
    });
  } catch (error) {
    return res.status(400).json({
      verified: false,
      error:
        error instanceof Error
          ? error.message
          : "Authentication failed",
    });
  }

  if (!verification.verified) {
    return res.status(400).json({ verified: false });
  }

  passkey.counter = verification.authenticationInfo.newCounter;

  req.session.userId = user.id;
  req.session.currentChallenge = undefined;
  req.session.pendingUserId = undefined;

  res.json({ verified: true });
});
```

Two details here matter more than they first appear:

- `requireUserVerification: true` forces a stronger ceremony for the verification step.
- `newCounter` should overwrite your stored counter after each successful login.

That counter update is one of the few signals you have for spotting cloned or broken authenticators.

---

## What Replaces the Long-lived JWT

Don't run this full WebAuthn flow, then issue a week-long bearer token and call the job done. That throws away the best part of the design.

A better model is:

- WebAuthn proves identity
- the server creates a short session
- the browser receives only an HTTP-only session cookie
- risky actions ask for a fresh WebAuthn assertion again

A tiny route guard shows the idea:

```ts :collapsed-lines title="app.ts"
function requireSession(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

app.get("/me", requireSession, (req, res) => {
  const user = users.get(req.session.userId ?? "");

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    id: user.id,
    email: user.email,
    passkeys: user.passkeys.length,
  });
});
```

This keeps the post-login browser state smaller and less reusable. The browser carries only a session cookie. The server owns the session state and its lifetime.

Tip: Short sessions plus fresh WebAuthn for risky actions is a stronger shape than one long bearer token with broad scope.

---

## Multi-Device and Recovery Logic

Strong auth fails fast if the first lost phone locks the user out forever. You need a real backup story from day one.

The clean pattern looks like this:

- register one platform passkey on the user's main device
- register one extra credential, such as a security key or another trusted device
- verify a contact channel during account setup
- expose passkey management in account settings
- store device metadata so users see what is registered

In the above diagram, the left side shows the recovery strategy. You start with a primary passkey on your main device. Then you add another trusted authenticator such as a second device or hardware security key. A recovery channel should exist. Device inventory helps track active credentials, and lost devices must be revoked quickly.

The right side focuses on step up authentication. Sensitive actions require fresh verification. Examples include payouts, email change, API key generation, or destructive operations. When such an action begins, the server issues a new challenge. Your authenticator signs again. Access lasts for a short step up window before new verification becomes required.

A simple product rule helps here. Don't hide the second passkey flow inside a deep settings page. Put "Add another passkey" right after the first successful registration.

Passkeys also sync across major platform ecosystems. That helps the user experience, but your backend should still treat each registered credential as a first-class record with its own ID, public key, counter, device type, and backup state.

For account recovery, keep the bar high. Recovery should not become the weakest path in the whole system. Emailed magic links, recovery codes, and support-driven recovery all need rate limits, audit trails, and strict checks.

---

## Step-up Authentication for Sensitive Actions

Logging in once should not grant silent permission for every dangerous route.

Step-up auth means this:

- the user is already signed in
- they try a sensitive action
- the server demands a fresh WebAuthn ceremony
- the app grants a short window for that one class of actions

You can use step-up auth for:

- payout approval
- credential management
- email or phone change
- API key creation
- organization deletion
- role elevation
- access to billing controls

Start by issuing new authentication options with strict user verification.

```ts :collapsed-lines title="app.ts"
app.post("/auth/step-up/options", requireSession, async (req, res) => {
  const user = users.get(req.session.userId ?? "");

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const options = await generateAuthenticationOptions({
    rpID,
    allowCredentials: user.passkeys.map((passkey) => ({
      id: passkey.id,
      transports: passkey.transports,
    })),
    userVerification: "required",
  });

  req.session.currentChallenge = options.challenge;

  res.json(options);
});
```

Then verify the response and issue a short step-up window.

```ts :collapsed-lines title="app.ts"
app.post("/auth/step-up/verify", requireSession, async (req, res) => {
  const user = users.get(req.session.userId ?? "");
  const passkey = user?.passkeys.find((item) => item.id === req.body.id);

  if (!user || !passkey || !req.session.currentChallenge) {
    return res.status(400).json({ verified: false });
  }

  let verification;
  try {
    verification = await verifyAuthenticationResponse({
      response: req.body,
      expectedChallenge: req.session.currentChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential: {
        id: passkey.id,
        publicKey: passkey.publicKey,
        counter: passkey.counter,
        transports: passkey.transports,
      },
      requireUserVerification: true,
    });
  } catch (error) {
    return res.status(400).json({
      verified: false,
      error: error instanceof Error ? error.message : "Step-up failed",
    });
  }

  if (!verification.verified) {
    return res.status(400).json({ verified: false });
  }

  passkey.counter = verification.authenticationInfo.newCounter;
  req.session.stepUpUntil = Date.now() + 5 * 60 * 1000;
  req.session.currentChallenge = undefined;

  res.json({ verified: true });
});
```

A tiny guard handles the rest.

```ts :collapsed-lines title="app.ts"
function requireRecentStepUp(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (!req.session.stepUpUntil || req.session.stepUpUntil < Date.now()) {
    return res.status(403).json({ error: "Fresh verification required" });
  }

  next();
}

app.post("/billing/payout", requireSession, requireRecentStepUp, (req, res) => {
  res.json({ ok: true });
});
```

This is where WebAuthn stops being a login feature and starts becoming part of your authorization model.

Now that all your routes and guards are built, append the server start command to the very bottom of <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`app.ts` to bring the backend to life:

```ts title="app.ts"
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
```

---

## Recap

You started with a common weak pattern: a reusable token trusted for too long. Then you replaced the core proof model:

- the device keeps the private key
- the server stores the public key and counter
- each ceremony signs a fresh challenge
- the app uses short server sessions after verification
- risky routes trigger fresh step-up authentication

That's the real shift.

WebAuthn is not a cosmetic login upgrade. It changes where trust lives. Once you move from reusable bearer proof to device-bound cryptographic proof, your Node.js auth stack starts to behave like a modern security system instead of a thin session wrapper.

::: info Try it Yourself

The full source code is available on GitHub. [Clone the repository (<VPIcon icon="iconfont icon-github" />`logicbaselabs/web-authn`)](https://github.com/logicbaselabs/web-authn) here and follow the setup guide in the `README` to test the biometric login flow locally.

<SiteInfo
  name="logicbaselabs/web-authn: WebAuthn in Node.js, Passwordless Biometric Login"
  desc="WebAuthn in Node.js, Passwordless Biometric Login. Contribute to logicbaselabs/web-authn development by creating an account on GitHub."
  url="https://github.com/logicbaselabs/web-authn/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/9844ad2779e8ceeb519e71cc7e915c4394af6f4aeb2d38027eb4653f0588fe3c/logicbaselabs/web-authn"/>

:::

---

## Final Words

If you found the information here valuable, feel free to share it with others who might benefit from it.

I’d really appreciate your thoughts – mention me on [X <VPIcon icon="fa-brands fa-x-twitter" />`sumit_analyzen`)](https://x.com/sumit_analyzen) or on Facebook [<VPIcon icon="fa-brands fa-meta"/>`@sumit.analyzen`](https://facebook.com/sumit.analyzen), [watch my coding tutorials (<VPIcon icon="fa-brands fa-youtube"/>`@logicBaseLabs`)](https://youtube.com/@logicBaseLabs), or simply [connect with me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin" />`sumitanalyzen`)](https://linkedin.com/in/sumitanalyzen/).

You can also checkout my official website [<VPIcon icon="fas fa-globe"/>sumitsaha.me](https://sumitsaha.me) for more details about me.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set Up WebAuthn in Node.js for Passwordless Biometric Login",
  "desc": "JWT auth feels clean until a stolen token still looks valid to your server. That's the real problem: a bearer token proves possession of a token, but it doesn't prove possession of a trusted device. I",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/set-up-webauthn-in-node-js-for-passwordless-biometric-login.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
