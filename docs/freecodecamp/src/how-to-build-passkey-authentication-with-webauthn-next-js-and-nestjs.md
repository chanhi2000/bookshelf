---
lang: en-US
title: "How to Build Passkey Authentication with WebAuthn, Next.js and NestJS"
description: "Article(s) > How to Build Passkey Authentication with WebAuthn, Next.js and NestJS"
icon: iconfont icon-nestjs
category:
  - Node.js
  - Next.js
  - Nest.js
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
  - nest
  - nestjs
  - nest-js
  - data-science
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Passkey Authentication with WebAuthn, Next.js and NestJS"
    - property: og:description
      content: "How to Build Passkey Authentication with WebAuthn, Next.js and NestJS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-passkey-authentication-with-webauthn-next-js-and-nestjs.html
prev: /programming/js-nest/articles/README.md
date: 2026-10-28
isOriginal: false
author:
  - name: Roland Mweze
    url: https://freecodecamp.org/news/author/rolandm/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/416b0a8e-1b49-4945-9072-37d69280b6af.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Nest.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-nest/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Passkey Authentication with WebAuthn, Next.js and NestJS"
  desc="Passwords are a pain for both users and service providers․ Users often find it difficult to remember passwords, and the risk of phishing and password reuse across multiple websites is high. Developers"
  url="https://freecodecamp.org/news/how-to-build-passkey-authentication-with-webauthn-next-js-and-nestjs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/416b0a8e-1b49-4945-9072-37d69280b6af.png"/>

Passwords are a pain for both users and service providers․ Users often find it difficult to remember passwords, and the risk of phishing and password reuse across multiple websites is high.

Developers have to hash passwords, salt them, rate-limit login attempts, and build "forgot password" flows that nobody enjoys using.

Fortunately, passkeys address many of these issues․ Instead of providing a password‚ users can confirm their identity with a different type of authenticator they use on other devices‚ like fingerprints, facial recognition, or a PIN․ The authenticator signs a challenge using a cryptographic key stored on the device and is never shared with others․

This tutorial shows you how to build an app that doesn't use traditional passwords. The backend is a NestJS API that stores users and their passkeys in PostgreSQL. The frontend is a Next.js app where users sign up and sign in with nothing but an email address and a passkey.

You'll use [<VPIcon icon="fas fa-globe"/>SimpleWebAuthn](https://simplewebauthn.dev/docs/), a well-maintained TypeScript library to simplify tasks involving WebAuthn cryptography and data parsing․

By the end of this article, you should have what you need to implement passkey registration and authentication for your website and validate passkeys on your server securely. You'll also learn about potential risks and problems with passkeys that could impact your app or user accounts so you can take steps to prevent them.  
  
You can find the complete source code on [GitHub (<VPIcon icon="iconfont icon-github"/>`RolandM99/passwordless-auth`)](https://github.com/RolandM99/passwordless-auth).

---

## The Problems with Password-Based Authentication

Before we write a single line of code, we need to clearly define what we're replacing.

For decades, password-based authentication has been the default login method. And it has proven its effectiveness, which is why it became the standard. But the model it relies on (*a secret that a person must memorize, enter, and keep to themselves*) has significant limitations. Every aspect of this model is problematic, as we'll now see.

### 1. Phishing Attacks

A password will work anywhere it's entered. If an attacker builds a page that's identical to your bank's login page, then the password will work just as well on that page. The only thing stopping the user from being compromised is the fact that they might notice that the URL looks a little odd.  
  
That's a lot to ask. Phishing pages are often very close to being pixel-perfect, and they come in the form of urgent emails or text messages designed to get you to act immediately. Even a very careful, technically minded user can be fooled.

One-time passwords sent via SMS or from an authenticator app are of course useful, but people can still be tricked into typing those in on a fake page.

### 2. Password Reuse

Most people have dozens, if not hundreds of online accounts. You can't possibly remember a unique, strong password for each one, so you'll invariably reuse the same few passwords across the board.  
  
Attackers know this. If one site is breached, they'll take the email and password pairs that have been leaked and try them automatically against other sites. That's **credential stuffing**. A breach at a little forum you've long since forgotten can result in someone getting into your email or your bank account.

### 3. Data Breaches

Every site that uses passwords has to store something that can be used to verify the password. The ideal situation is for the site to store salted hashes rather than the passwords themselves. But not all sites do this well, and hashes of weak passwords can still be cracked offline once an attacker has a copy of the database.  
  
This is clearly the developers' burden. You have to choose the right hashing algorithm, tune it, protect the database, and still treat a leak as a disaster for your users.

### 4. Lack of Privacy

With passwords, users pass a shared secret to every site they sign up with. They have to trust that site to protect it, and they have no control over what happens to it once it's been breached.

As people reuse the same email and password combinations, it's possible for leaked credentials to be matched across breaches. That, in turn, makes it much easier to link accounts across services and build up a profile of a person's online behaviour.

### 5. Credential Fatigue

Then there's the day-to-day frustration. You're constantly juggling password policies (at least one symbol, no more than 16 characters, and so on), forced resets every few months, security questions, verification codes...the list goes on. Every new account you create just adds to the pile.

This fatigue leads people straight into the behaviour that makes passwords so insecure: short passwords, small variations of the same password, and passwords written on sticky notes. It also costs the business. People drop off during the sign-up process, get locked out, and then contact support to reset passwords they've forgotten.

---

## How Passkeys Solve These Problems

Passkeys remove the shared secret entirely. [<VPIcon icon="fas fa-globe"/>passkeys.dev](https://passkeys.dev/docs/intro/what-are-passkeys/) describes them as intuitive, automatically unique, breach-resistant, and phishing-resistant.

Here's how that lines up with each problem:

| Problem | How passkeys solve it |
| --- | --- |
| Phishing attacks | The browser and operating system only use a passkey on the site that created it. A fake domain doesn't get anywhere, no matter how convincing it looks. |
| Password reuse | Every passkey is a new key pair created for one site, so there's nothing to reuse. |
| Data breaches | The server only stores a public key. A leaked database gives attackers nothing they can sign in with. |
| Lack of privacy | Nothing secret is shared with the site, and keys are different for every site. Fingerprint and face data don't leave the device. |
| Credential fatigue | There's nothing to create or remember. Users confirm with the same fingerprint, face, or screen lock they use multiple times a day. |

The fundamental shift concerns where trust lives. With passwords, security relies on users’ ability to spot fraudulent sites and choose strong credentials. With passkeys, it's the browser and the operating system that enforce the rules, while the user just confirms their identity.

::: note Prerequisites

To follow along, you should be comfortable with TypeScript and have some React experience. You don't need to know NestJS well, but it helps to know what a controller and a service are.

You'll also need these tools installed:

- [<VPIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/) version 22 or later
- [<VPIcon icon="iconfont icon-postgresql"/>PostgreSQL](https://postgresql.org/download/). On macOS, [Postgres.app](https://postgresapp.com/) is the easiest option. [pgAdmin](https://pgadmin.org/) is handy if you prefer a graphical tool.
- A device that supports passkeys. Almost any modern laptop or phone works: a Mac with Touch ID, a Windows PC with Windows Hello, or an Android phone or iPhone.

:::

---

## What Are Passkeys?

A passkey is a credential based on public key cryptography. When you create one, your device generates a key pair. The private key stays on your device, locked behind your fingerprint, face, or screen lock. The public key goes to the website, which stores it next to your account.

Passkeys are built on the [<VPIcon icon="iconfont icon-w3c"/>Web Authentication API (WebAuthn)](https://w3.org/TR/webauthn-3/), a W3C standard supported by all major browsers. The term "passkey" is the friendly name the industry settled on for WebAuthn credentials that can sync between devices. If you want a deeper introduction, [<VPIcon icon="fas fa-globe"/>passkeys.dev](https://passkeys.dev/docs/intro/what-are-passkeys/) is an excellent resource.

One detail often surprises developers: your app can't choose between a fingerprint, facial recognition, or a PIN code. It's the operating system that decides, based on the device's capabilities and the settings configured by the user.

Here's what users will typically see:

| Device | Verification method |
| --- | --- |
| Mac | Touch ID, or the Mac password |
| iPhone or iPad | Face ID, Touch ID, or the passcode |
| Android | Fingerprint, face unlock, or PIN, pattern, or password |
| Windows | Windows Hello face, fingerprint, or PIN |
| Any other computer | Scan a QR code and confirm on your phone |

What your server can do is insist that some local check happened. You'll see how in a moment.

---

## How Passkey Authentication Works

Both sign-up and sign-in follow the same three-step pattern:

1. The server generates a random challenge and sends it to the browser along with some options.
2. The browser asks the device to verify the user and sign the challenge.
3. The browser sends the signed response back, and the server validates it.

During sign-up (WebAuthn refers to this as "registration"), the device creates a new key pair and returns the public key. The server then validates the response and stores the public key.

During sign-in (authentication), the device signs the new challenge with the existing private key. The server then validates the signature using the public key it had previously saved.

Two more concepts come up throughout the code:

The **relying party ID** (RP ID) is the domain your passkeys belong to, such as `example.com`. In development, it's `localhost`. The browser will simply refuse to use a passkey on any other domain, which is what gives passkeys their resistance to phishing.

The **user verification (UV) flag** is a bit within the signed response. It's only set by the device when the user has actually completed the fingerprint, face, or screen lock check. Your server looks at this flag to ensure that it wasn't just some random user who tapped a key or clicked a button.

---

## Project Structure

The project has two separate apps in one repository:

```sh title="file structure"
passwordless-auth/
├── client/   # Next.js frontend, runs on port 3000
└── server/   # NestJS API, runs on port 4000
```

You'll build the server first, since the frontend depends on its endpoints.

---

## How to Set Up the NestJS Backend

Start by creating a new NestJS project with the Nest CLI:

```sh
npx @nestjs/cli new server
cd server
```

Then install the dependencies for WebAuthn, the database, configuration, and JSON Web Tokens (JWTs):

```sh
npm install @simplewebauthn/server @nestjs/typeorm typeorm pg @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt
```

### Create the Database

Create an empty database called `auth`. From the terminal, run:

```sh
createdb -h localhost -U postgres auth
```

If you prefer pgAdmin, right-click **Databases**, choose **Create**, then **Database**, and name it `auth`.

If you skip this step, NestJS will fail on startup with `error: database "auth" does not exist`. TypeORM can create tables for you, but it won't create the database itself.

### Add Environment Variables

Create a <VPIcon icon="iconfont icon-dotenv"/>`.env` file in the <VPIcon icon="fas fa-folder-open"/>`server` folder:

```sh title=".env"
JWT_SECRET=replace-with-a-long-random-string

WEBAUTHN_RP_ID=localhost
WEBAUTHN_ORIGIN=http://localhost:3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-database-password
DB_NAME=auth
```

`WEBAUTHN_RP_ID` is the domain only, without a protocol or port. `WEBAUTHN_ORIGIN` is the exact URL of your frontend. The server will reject any response that comes from a different origin.

Browsers only allow WebAuthn on HTTPS sites or on `localhost`, so this setup works in development without certificates.

### Connect to PostgreSQL

Create <VPIcon icon="fas fa-folder-open"/>`src/auth/config/`<VPIcon icon="iconfont icon-typescript"/>`database.config.ts` to group the database settings:

```ts title="src/auth/config/database.config.ts"
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
}));
```

While you're in the <VPIcon icon="fas fa-folder-open"/>`config` folder, add <VPIcon icon="fas fa-folder-open"/>`src/auth/config/`<VPIcon icon="iconfont icon-typescript"/>`jwt.config.ts` for the token settings:

```ts title="src/auth/config/jwt.config.ts"
import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: '1h',
}));
```

The `synchronize` option tells TypeORM to create and update tables based on your entities. It's convenient in development, but you should switch to migrations before going to production.

Then wire everything up in <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`app.module.ts`:

```ts :collapsed-lines title="src/app.module.ts"
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './auth/config/database.config';
import jwtConfig from './auth/config/jwt.config';
import { User, Authenticator } from './auth/entities/auth.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [User, Authenticator],
        synchronize: configService.get('database.synchronize'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
})
export class AppModule {}
```

Finally, enable CORS in <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`main.ts` so the frontend on port 3000 can call the API on port 4000:

```ts title="src/main.ts"
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: true,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(4000);
  console.log('App running on port 4000');
}
bootstrap();
```

`origin: true` accepts requests from any origin, which keeps local development simple. Before you deploy, replace it with your frontend's URL.

---

## How to Define the Database Entities

You need two tables here. The User table contains the account, and the Authenticator table contains the passkeys. One user can have multiple passkeys (for example, one on their laptop and one on their phone).

Create <VPIcon icon="fas fa-folder-open"/>`src/auth/entities/`<VPIcon icon="iconfont icon-typescript"/>`auth.entity.ts`:

```ts :collapsed-lines title="src/auth/entities/auth.entity.ts"
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import type {
  CredentialDeviceType,
  Base64URLString,
} from '@simplewebauthn/server';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  webauthnId: Base64URLString;

  @Column({ type: 'varchar', nullable: true })
  currentChallenge?: string | null;

  @OneToMany(() => Authenticator, (authenticator) => authenticator.user)
  authenticators: Authenticator[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export class Authenticator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  credentialId: Base64URLString;

  @Column({ type: 'bytea' })
  credentialPublicKey: Uint8Array;

  @ManyToOne(() => User, (user) => user.authenticators, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  webauthnUserId: Base64URLString;

  @Column({ type: 'bigint' })
  counter: number;

  @Column({
    type: 'varchar',
    length: 32,
  })
  deviceType: CredentialDeviceType;

  @Column()
  backedUp: boolean;

  @Column('simple-array', { nullable: true })
  transports?: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

Let's take a closer look at a couple of these fields.

First, `webauthnId` is the user handle that gets stored on the device together with the passkey. The WebAuthn spec says it shouldn't contain personal information, so you'll fill it with random bytes instead of the email.

Next, `currentChallenge` holds the challenge the server is waiting for. It's set when you generate options and cleared after a successful verification. Notice the `string | null` type. That matters, and you'll see why in the security section.

`counter` is a signature counter. Some authenticators will increment it on every use, which allows the server to detect a cloned device. Synced passkeys will typically leave the counter at zero, and SimpleWebAuthn supports both scenarios.

`deviceType` and `backedUp` tell you whether the passkey can sync across devices and whether it's currently backed up (for example, to iCloud Keychain).

And finally, `transports` records how the browser can get to the authenticator (built into the device, over USB, over Bluetooth, or via a phone).

---

## How to Register a Passkey on the Server

Create <VPIcon icon="fas fa-folder-open"/>`src/auth/`<VPIcon icon="iconfont icon-typescript"/>`auth.service.ts`. Start with the class setup:

```ts :collapsed-lines title="src/auth/auth.service.ts"
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Authenticator } from './entities/auth.entity';
import {
  generateRegistrationOptions,
  generateAuthenticationOptions,
  verifyRegistrationResponse,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import type {
  AuthenticationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
} from '@simplewebauthn/server';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly rpName = 'Passwordless Auth';
  private readonly rpID: string;
  private readonly origin: string;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Authenticator)
    private readonly authenticatorRepository: Repository<Authenticator>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.rpID = this.configService.get<string>('WEBAUTHN_RP_ID');
    this.origin = this.configService.get<string>('WEBAUTHN_ORIGIN');
  }
  // ...
}
```

`rpName` is the human-readable name of your app. Users will see it in the operating system's passkey prompt and later in their password manager.

### Generate Registration Options

The first method finds or creates the user, then asks SimpleWebAuthn for registration options. Add it inside the class:

```ts :collapsed-lines title="src/auth/auth.service.ts"
export class AuthService {
  // ...
  async generateRegistrationOptions(
    email: string,
  ): Promise<PublicKeyCredentialCreationOptionsJSON> {
    let user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      user = this.userRepository.create({
        email,
        webauthnId: randomBytes(32).toString('base64url'),
      });
      await this.userRepository.save(user);
    }

    const authenticators = await this.authenticatorRepository.find({
      where: { user: { id: user.id } },
    });

    if (authenticators.length > 0) {
      throw new ConflictException(
        'An account with this email already exists. Please sign in.',
      );
    }

    const options = await generateRegistrationOptions({
      rpName: this.rpName,
      rpID: this.rpID,
      userID: Buffer.from(user.webauthnId, 'base64url'),
      userName: user.email,
      attestationType: 'none',
      authenticatorSelection: {
        residentKey: 'required',
        userVerification: 'required',
      },
      excludeCredentials: authenticators.map((authenticator) => ({
        id: authenticator.credentialId,
        transports: authenticator.transports,
      })),
    });

    // Save the current challenge
    user.currentChallenge = options.challenge;
    await this.userRepository.save(user);

    return options;
  }
  // ...
}
```

The `authenticatorSelection` block is where you decide what kind of passkey you want.

`residentKey: 'required'` asks for a discoverable credential. That's what makes it a true passkey (the credential is stored on the device or in the user's password manager and can then sync to their other devices).

`userVerification: 'required'` tells the device that it needs to verify the user (that is, check their fingerprint, face, or screen lock). Without that, some of the authenticators would just do a presence check and not actually verify the user.

What's missing is an authenticator attachment option. If you set it to `'platform'`, that would effectively lock users into using the sensor on their current device. If you leave it out, then they can use their phone via QR code or a hardware security key (which is what [<VPIcon icon="fas fa-globe"/>passkeys.dev](http://passkeys.dev) recommends).

`attestationType: 'none'` means you're not asking the device to attest to its make and model. Most consumer apps don't need that at all, and asking for it can in fact trigger additional privacy prompts.

`excludeCredentials` lists the passkeys the user already has so the device won't create a duplicate on an authenticator that's already registered. Given the check immediately above it, that list is always empty in this case. It becomes useful later on when you allow signed-in users to add further passkeys.

The check for existing authenticators is also important. This endpoint doesn't require the user to be signed in, so you can't just allow it to add a passkey to an account that already has one. Otherwise, anyone who knows your email address could attach their own passkey to your account.

### Verify the Registration Response

After the user confirms on their device, the browser sends back a response. The second method verifies it and stores the new passkey:

```ts :collapsed-lines title="src/auth/auth.service.ts"
export class AuthService {
  // ...
  async verifyRegistration(email: string, response: RegistrationResponseJSON) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'currentChallenge', 'webauthnId'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const verification = await verifyRegistrationResponse({
      response,
      expectedChallenge: user.currentChallenge,
      expectedOrigin: this.origin,
      expectedRPID: this.rpID,
      requireUserVerification: true,
    });

    const { verified, registrationInfo } = verification;

    if (verified && registrationInfo) {
      const { credential, credentialDeviceType, credentialBackedUp } =
        registrationInfo;

      const newAuthenticator = this.authenticatorRepository.create({
        credentialId: credential.id,
        credentialPublicKey: credential.publicKey,
        counter: credential.counter,
        user: user,
        webauthnUserId: user.webauthnId,
        deviceType: credentialDeviceType,
        backedUp: credentialBackedUp,
        transports: response.response.transports,
      });

      await this.authenticatorRepository.save(newAuthenticator);

      user.currentChallenge = null;
      await this.userRepository.save(user);

      return {
        verified,
        user: { id: user.id, email: user.email },
      };
    }

    throw new UnauthorizedException('Registration verification failed');
  }
  // ...
}
```

`verifyRegistrationResponse` is what does the hard work in this code. It checks that the challenge matches the one you saved, that the response came from your origin and RP ID, and that the signature is valid. With `requireUserVerification: true` it'll also reject the response if the UV flag isn't set. That flag is your proof that a fingerprint, face, or screen lock check took place.

If all goes well, you'll save the credential ID and the public key and then clear the challenge so it can't be reused.

---

## How to Sign In with a Passkey on the Server

Sign-in works the same way: generate options, then verify the response.

### Generate Authentication Options

```ts :collapsed-lines title="src/auth/auth.service.ts"
export class AuthService {
  // ...
  async function generateAuthenticationOptions(
    email: string,
  ): Promise<PublicKeyCredentialRequestOptionsJSON> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const authenticators = await this.authenticatorRepository.find({
      where: { user: { id: user.id } },
    });

    if (authenticators.length === 0) {
      throw new UnauthorizedException(
        'No passkey registered for this account. Please sign up.',
      );
    }

    const options = await generateAuthenticationOptions({
      rpID: this.rpID,
      allowCredentials: authenticators.map((authenticator) => ({
        id: authenticator.credentialId,
        transports: authenticator.transports,
      })),
      userVerification: 'required',
    });

    // Save the current challenge
    user.currentChallenge = options.challenge;
    await this.userRepository.save(user);

    return options;
  }
  // ...
}
```

`allowCredentials` lists the passkeys this user owns. The browser uses that list to find the right one on the device, and the `transports` hint helps it decide whether to look locally, on a security key, or on a phone.

### Verify the Authentication Response

```ts :collapsed-lines title="src/auth/auth.service.ts"
export class AuthService {
  // ...
  async verifyAuthentication(
    email: string,
    response: AuthenticationResponseJSON,
  ) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'currentChallenge'],
    });
  
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
  
    const authenticator = await this.authenticatorRepository.findOne({
      where: { credentialId: response.id, user: { id: user.id } },
    });
  
    if (!authenticator) {
      throw new UnauthorizedException('Authenticator not found');
    }
  
    const verification = await verifyAuthenticationResponse({
      response,
      expectedChallenge: user.currentChallenge,
      expectedOrigin: this.origin,
      expectedRPID: this.rpID,
      credential: {
        id: authenticator.credentialId,
        publicKey: new Uint8Array(authenticator.credentialPublicKey),
        counter: Number(authenticator.counter),
        transports: authenticator.transports,
      },
      requireUserVerification: true,
    });
  
    const { verified } = verification;
  
    if (verified) {
      authenticator.counter = verification.authenticationInfo.newCounter;
      authenticator.backedUp =
        verification.authenticationInfo.credentialBackedUp;
      await this.authenticatorRepository.save(authenticator);
  
      user.currentChallenge = null;
      await this.userRepository.save(user);
  
      // Generate JWT token
      const payload = { sub: user.id, email: user.email };
      return {
        accessToken: this.jwtService.sign(payload),
        user: { id: user.id, email: user.email },
      };
    }
  
    throw new UnauthorizedException('Authentication verification failed');
  }
  // ...
}
```

The lookup uses both the credential ID and the user ID. Don't drop the user condition. I'll explain why in the security section.

The `Number()` call around the counter is there because the `pg` driver returns `bigint` columns as strings. SimpleWebAuthn expects a number.

Once the signature has been verified, you increment the counter, clear the challenge, and issue a JWT. From that point on, the app treats the user exactly as it would any user who has signed in with a password. The only difference is that a password wasn't used.

---

## How to Expose the Auth Endpoints

Create <VPIcon icon="fas fa-folder-open"/>`src/auth/`<VPIcon icon="iconfont icon-typescript"/>`auth.controller.ts`. It has one route for each step of the sign-up and sign-in flows, plus a protected route that lists a user's passkeys:

```ts :collapsed-lines title="src/auth/auth.controller.ts"
import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/options')
  async getRegistrationOptions(
    @Body() body: { email: string },
  ): Promise<PublicKeyCredentialCreationOptionsJSON> {
    return this.authService.generateRegistrationOptions(body.email);
  }

  @Post('register/verify')
  async verifyRegistration(
    @Body() body: { email: string; response: any },
  ) {
    return this.authService.verifyRegistration(body.email, body.response);
  }

  @Post('login/options')
  async getAuthenticationOptions(
    @Body() body: { email: string },
  ): Promise<PublicKeyCredentialRequestOptionsJSON> {
    return this.authService.generateAuthenticationOptions(body.email);
  }

  @Post('login/verify')
  async verifyAuthentication(
    @Body() body: { email: string; response: any },
  ) {
    return this.authService.verifyAuthentication(body.email, body.response);
  }

  @Get('authenticators')
  @UseGuards(JwtAuthGuard)
  async getAuthenticators(@Query('email') email: string) {
    return this.authService.getAuthenticators(email);
  }
}
```

The `response` body is typed as `any` here because the service methods already declare the exact SimpleWebAuthn types they expect.

### How to Protect Routes with a JWT

The last route uses`JwtAuthGuard`, so only signed-in users can call it. It's backed by a small service method. Add it to `AuthService`:

```ts title="src/auth/auth.service.ts"
export class AuthService {
  // ...
  async getAuthenticators(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const authenticators = await this.authenticatorRepository.find({
      where: { user: { id: user.id } },
    });
    return authenticators;
  }
  // ...
}
```

Next, create the Passport strategy that reads and validates the token in <VPIcon icon="fas fa-folder-open"/>`src/auth/strategies/`<VPIcon icon="iconfont icon-typescript"/>`jwt.strategy.ts`:

```ts title="src/auth/strategies/jwt.strategy.ts"
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
```

Then create the guard in <VPIcon icon="fas fa-folder-open"/>`src/auth/guards/`<VPIcon icon="iconfont icon-typescript"/>`jwt-auth.guard.ts`. It wraps Passport's built-in guard and returns clearer error messages:

```ts :collapsed-lines title="src/auth/guards/jwt-auth.guard.ts"
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  handleRequest(err: any, user: any, info: any) {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException('Token has expired');
    }

    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Invalid token');
    }

    if (err || !user) {
      throw new UnauthorizedException('Authentication failed');
    }

    return user;
  }

  // Optional: Override canActivate if you need custom logic before JWT validation
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const [type] = authHeader.split(' ');
    if (type !== 'Bearer') {
      throw new UnauthorizedException('Invalid token format');
    }
    return super.canActivate(context) as Promise<boolean>;
  }
}
```

### How to Register the Auth Module

Finally, bring everything together in <VPIcon icon="fas fa-folder-open"/>`src/auth/`<VPIcon icon="iconfont icon-typescript"/>`auth.module.ts`:

```ts title="src/auth/auth.module.ts"
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, Authenticator } from './entities/auth.entity';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Authenticator]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
```

The `signOptions` here control the tokens the service issues, so each sign-in is valid for one day.

Start the server:

```sh
npm run start:dev
```

TypeORM will create the `user` and `authenticator` tables in your `auth` database. You can open pgAdmin and refresh the **Tables** node to see them.

---

## How to Set Up the Next.js Frontend

From the root of the project, create a Next.js app with TypeScript, Tailwind CSS, the App Router, and a <VPIcon icon="fas fa-folder-open"/>`src` folder:

```sh
npx create-next-app@latest client --typescript --tailwind --app --src-dir
cd client
npm install @simplewebauthn/browser axios
```

Add a <VPIcon icon="iconfont icon-dotenv"/>`.env` file in the <VPIcon icon="fas fa-folder-open"/>`client` folder that points to the API:

```sh title=".env"
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Then create a small API client in <VPIcon icon="fas fa-folder-open"/>`client/src/services/`<VPIcon icon="iconfont icon-typescript"/>`api.ts`:

```ts :collapsed-lines title='client/src/services/api.ts"
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const webAuthnApi = {
  getRegistrationOptions: async (email: string) => {
    const response = await api.post('/auth/register/options', { email });
    return response.data;
  },

  verifyRegistration: async (email: string, response: any) => {
    const res = await api.post('/auth/register/verify', { email, response });
    return res.data;
  },

  getAuthenticationOptions: async (email: string) => {
    const response = await api.post('/auth/login/options', { email });
    return response.data;
  },

  verifyAuthentication: async (email: string, response: any) => {
    const res = await api.post('/auth/login/verify', { email, response });
    return res.data;
  },
};

// Add request interceptor to include JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

The interceptor at the bottom attaches the JWT to every request once the user has signed in, which is what the protected `/auth/authenticators` route expects.

---

## How to Build the Sign Up Page

The frontend side of WebAuthn is surprisingly short. SimpleWebAuthn's `startRegistration` function takes the options from your server, calls the browser's WebAuthn API, and returns a response in a JSON format your server understands.

Create <VPIcon icon="fas fa-folder-open"/>`client/src/app/signup/`<VPIcon icon="fa-brands fa-react"/>`page.tsx`:

```tsx :collapsed-lines title="client/src/app/signup/page.tsx"
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { startRegistration, browserSupportsWebAuthn } from '@simplewebauthn/browser';
import { webAuthnApi } from '@/services/api';
import { getPasskeyErrorMessage } from '@/services/passkey';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!browserSupportsWebAuthn()) {
      setError('This browser does not support passkeys.');
      setLoading(false);
      return;
    }

    try {
      const options = await webAuthnApi.getRegistrationOptions(email);

      const regResult = await startRegistration({ optionsJSON: options });

      const verificationResult = await webAuthnApi.verifyRegistration(email, regResult);

      if (verificationResult.verified) {
        router.push('/welcome');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(getPasskeyErrorMessage(err, 'Registration failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Sign up</h1>
            <p className="text-sm text-gray-600 mt-2">Create your account</p>
          </div>

          <form onSubmit={handleRegistration} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Type your email"
              />
            </div>

            {error && (
              <div className="text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3B97B6] hover:bg-[#2d7591] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Creating passkey...' : 'Create a passkey'}
            </button>
            <p className="text-xs text-center text-gray-500">
              You'll confirm with your fingerprint, face, or screen lock.
            </p>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account?</span>{' '}
            <Link
              href="/signin"
              className="text-[#3B97B6] hover:text-[#2d7591] font-medium transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
```

The `handleRegistration` function follows the three steps from earlier. You fetch options from the server, hand them to`startRegistration`, and send the result back for verification.

The call to `startRegistration` is where the magic happens. The browser opens the operating system's passkey dialog, and the user confirms with Touch ID, Face ID, Windows Hello, or their phone. Your code just waits for the promise to resolve.

Note the `{ optionsJSON: options }` argument. Older versions of SimpleWebAuthn accepted the options directly, and many tutorials still show it that way. Version 13 still supports the old style but logs a warning, so use the object form.

![Sign up page with an email field and a "Create a passkey" button](https://cdn.hashnode.com/uploads/covers/679f7daff98e1199453b8c1b/812528f7-1e10-42b9-b628-143bcb715627.png)

---

## How to Build the Sign In Page

The `Sign in` page mirrors the `Sign up` page. Create <VPIcon icon="fas fa-folder-open"/>`client/src/app/signin/`<VPIcon icon="fa-brands fa-react"/>`page.tsx`, copy the sign up page into it, and change the headings and the link at the bottom so they point to `/signup`. Then import `startAuthentication` instead of `startRegistration`, and replace the submit handler with this one:

```tsx title="client/src/app/signin/page.tsx"
const handleAuthentication = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  if (!browserSupportsWebAuthn()) {
    setError('This browser does not support passkeys.');
    setLoading(false);
    return;
  }

  try {
    const options = await webAuthnApi.getAuthenticationOptions(email);

    const authResult = await startAuthentication({ optionsJSON: options });

    const verificationResult = await webAuthnApi.verifyAuthentication(email, authResult);

    if (verificationResult.accessToken) {
      localStorage.setItem('token', verificationResult.accessToken);
      router.push('/welcome');
    }
  } catch (err: any) {
    console.error('Authentication error:', err);
    setError(getPasskeyErrorMessage(err, 'Authentication failed. Please try again.'));
  } finally {
    setLoading(false);
  }
};
```

Remember to pass `handleAuthentication` to the form's `onSubmit`. You can see the finished page in the [GitHub repository (<VPIcon icon="iconfont icon-github"/>`RolandM99/passwordless-auth`)](https://github.com/RolandM99/passwordless-auth/blob/main/client/src/app/signin/page.tsx).

When verification succeeds, the server returns a JWT, and the page stores it before redirecting. Storing tokens in `localStorage` keeps this demo simple. In a production app, a `httpOnly` cookie set by the server is a safer choice because JavaScript running on the page can't read it.

![Operating system passkey prompt asking the user to confirm with Touch ID](https://cdn.hashnode.com/uploads/covers/679f7daff98e1199453b8c1b/f1df9bed-16c9-48d8-a7bb-071e9ddc607a.png)

---

## How to Show Helpful Error Messages

When something goes wrong during a passkey ceremony, the browser throws a `DOMException` with a `name` that tells you what happened. The raw messages aren't very friendly, so it's a good idea to translate the common ones.

Create <VPIcon icon="fas fa-folder-open"/>`client/src/services/`<VPIcon icon="iconfont icon-typescript"/>`passkey.ts`:

```ts title="client/src/services/passkey.ts"
/* eslint-disable @typescript-eslint/no-explicit-any */

// Turn errors from the browser's WebAuthn API and our backend into readable messages
export function getPasskeyErrorMessage(err: any, fallback: string): string {
  if (err?.response?.data?.message) {
    return err.response.data.message;
  }
  switch (err?.name) {
    case 'NotAllowedError':
      // User cancelled the fingerprint/face/screen-lock prompt, or it timed out
      return 'The passkey prompt was cancelled or timed out. Please try again.';
    case 'InvalidStateError':
      // A passkey for this account already exists on this authenticator
      return 'This device already has a passkey for this account. Please sign in instead.';
    case 'NotSupportedError':
      return 'This device does not support passkeys.';
    case 'SecurityError':
      return 'Passkeys are not allowed on this domain. Check the WebAuthn RP ID and origin settings.';
    default:
      return fallback;
  }
}
```

`NotAllowedError` is the one you'll see most. It fires when the user closes the prompt, waits too long, or fails the biometric check. `SecurityError` usually means your RP ID doesn't match the domain the page is running on, which is a configuration problem rather than a user problem.

---

## How to Test Your App

Start both apps in separate terminals:

```sh
# Terminal 1
cd server
npm run start:dev
```

```sh
# Terminal 2
cd client
npm run dev
```

Go to `http://localhost:3000/signup`, enter your email, and click the button. Your device will show the prompt about the passkey. On a Mac with Touch ID, you'll be asked to touch the sensor. Otherwise, you'll need to fill the form with your MacBook user password. On Windows, Windows Hello will ask for your face, fingerprint, or PIN. If you choose to use another device, the browser shows a QR code that you can scan with your phone.

After you confirm, you land on the welcome page. Now go to `/signin`, enter the same email, and confirm again. This time the server returns a JWT.

If you don't have a passkey-enabled device available, Chrome has a built-in virtual authenticator. Open DevTools, click the three-dot menu, then go to **More tools** and choose **WebAuthn**. Enable the virtual authenticator environment and add an authenticator with **"Supports user verification"** checked. Chrome will then simulate a passkey device for you.

You can also open pgAdmin and look at the `authenticator` table. You'll see the credential ID, the public key stored as bytes, and the device type. There's no password and nothing secret in there.

---

## Security Mistakes to Avoid

Passkeys are secure by design, but the server code around them still has to be right. I ran into each of the issues below while building this project. Some of them don't throw any errors, which is what makes them dangerous.

### Encoding the Credential ID Twice

In recent versions of **SimpleWebAuthn**, including version 14 used here, `credential.id` is already a base64url string. My first version of the code did this:

```ts
// Wrong: encodes an already-encoded string
credentialId: Buffer.from(credential.id).toString('base64url'),
```

`Buffer.from` treats the string as UTF-8 text, so the result is a base64url encoding of a base64url string. Registration succeeds, but sign-in can never find the credential because the browser sends the original ID. Store `credential.id` as it is.

### Clearing the Challenge with `undefined`

Every challenge should be used only once. This line looks like it clears it:

```ts
user.currentChallenge = undefined;
```

But TypeORM skips `undefined` properties when it saves an entity, so the old challenge stays in the database. Someone who captured a valid response could replay it. Set the value to `null` instead, and make sure the column type allows it.

### Looking Up a Credential Without Checking Its Owner

It's tempting to find the authenticator by credential ID alone:

```ts
// Wrong: any user's passkey matches
where: { credentialId: response.id }
```

::: warning But here's the problem

the attacker asks for sign-in options for your email, signs your challenge with their own passkey, and the server sees their passkey, validates the signature against their public key, and then issues a token for your account. Always include the user in the lookup as per the earlier example.

:::

### Letting Sign Up Add Passkeys to Existing Accounts

The registration endpoint is public. If it's going to add a passkey to an account that matches the email, then anyone who knows your email can register their own passkey and sign in as you.

Don't allow registration if the account already has a passkey. If you want people to be able to add more passkeys, then that can be a separate feature which requires them to be signed in.

### Asking for Verification Without Requiring It

If you request `userVerification: 'preferred'`, the device is allowed to skip the fingerprint or PIN check. If you then verify with `requireUserVerification: true`, which is SimpleWebAuthn's default, users with those devices will get confusing failures. Pick `'required'` on both sides so the options and the verification agree.

---

## Where to Go From Here

The app you've built covers the fundamental passkey flows. But there are a couple of enhancements you could make if you wanted to go further.

Passkey autofill (also known as conditional UI) will cause the browser to suggest the saved passkey directly in the email field, just as it will suggest a saved password. SimpleWebAuthn supports this via the `useBrowserAutofill` option of `startAuthentication`.

Users will also want to add passkeys for their other devices and remove old ones. You'd build that as a pair of endpoints behind your JWT guard.

Finally, challenges should expire. A simple way to do this is to store a timestamp alongside `currentChallenge` and then reject anything older than a few minutes. In a larger app, you'd probably store the challenges in a session or a cache (for example, Redis) rather than on the user record.

---

## Conclusion

In this tutorial, you've built a complete passwordless authentication system using passkeys. You've got a full NestJS API that can generate WebAuthn challenges, verify the signed responses using SimpleWebAuthn, and store the public keys in PostgreSQL. You've also got a Next.js frontend that allows users to sign up and sign in using their fingerprint, their face, or their device's screen lock.  
  
You've now learned how the challenge and signature flow works, why the user verification flag is important, and why the server can't decide which biometric method the user will see. You've also seen a number of rather subtle bugs that can result in a sign-in failure or even an account takeover, and how to avoid them.  
  
Passwords aren't going away any time soon, but passkeys are already supported on pretty much every device that your users have. You now know how to add them to your own apps.

The full source code is available on [GitHub (<VPIcon icon="iconfont icon-github"/>`RolandM99/passwordless-auth`)](https://github.com/RolandM99/passwordless-auth). Go ahead and clone it, break it, and make it your own. If you found this tutorial useful in any way, then please do pass it on to someone who’s about to have the same question.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Passkey Authentication with WebAuthn, Next.js and NestJS",
  "desc": "Passwords are a pain for both users and service providers․ Users often find it difficult to remember passwords, and the risk of phishing and password reuse across multiple websites is high. Developers",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-passkey-authentication-with-webauthn-next-js-and-nestjs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
