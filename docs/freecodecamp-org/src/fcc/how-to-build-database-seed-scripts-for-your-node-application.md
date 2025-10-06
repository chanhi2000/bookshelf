---
lang: en-US
title: "How to Build Database Seed Scripts for Your Node Application"
description: "Article(s) > How to Build Database Seed Scripts for Your Node Application"
icon: iconfont icon-firebase
category:
  - Node.js
  - Google
  - Firebase
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - google
  - firebase
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Database Seed Scripts for Your Node Application"
    - property: og:description
      content: "How to Build Database Seed Scripts for Your Node Application"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-database-seed-scripts-for-your-node-application.html
prev: /programming/js-supabase/articles/README.md
date: 2025-07-29
isOriginal: false
author:
  - name: Tope Fasasi
    url : https://freecodecamp.org/news/author/TemiTope1/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1753746696472/4a181d0a-5e11-4603-ac27-151d16a6bbf4.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Supabase > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-supabase/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Database Seed Scripts for Your Node Application"
  desc="Database seed scripts are pre-written pieces of code that populate your database with initial data, serving as the foundation for a consistent development environment. These files contain structured data that follows real-world scenarios, letting you..."
  url="https://freecodecamp.org/news/how-to-build-database-seed-scripts-for-your-node-application"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1753746696472/4a181d0a-5e11-4603-ac27-151d16a6bbf4.png"/>

[Database seed scripts](https://supabase.com/docs/guides/local-development/seeding-your-database) are pre-written pieces of code that populate your database with initial data, serving as the foundation for a consistent development environment. These files contain structured data that follows real-world scenarios, letting you work with meaningful information from the moment you set up your local environment.

Instead of manually creating test users, products, or other entities every time you reset your database, seed files automate this process, ensuring every team member works with identical data sets.

The benefits of using seed files go far beyond convenience. They provide consistent test data across different environments, dramatically faster development setup times, and truly reproducible environments that eliminate the "it works on my machine" problem. When your entire team can spin up identical databases with realistic data in seconds, everyone can develop significantly faster and debugging becomes more predictable.

[Firebase](https://medium.com/firebase-developers/what-is-firebase-the-complete-story-abridged-bcc730c5f2c0), Google's backend-as-a-service (BaaS) platform, offers an excellent foundation for implementing seed files thanks to its flexible [NoSQL](https://mongodb.com/resources/basics/databases/nosql-explained) structure and robust [Node.js SDK](https://youtu.be/lqZEXpQDuHU). [Firestore's](https://firebase.google.com/docs/firestore) document-based architecture naturally accommodates the varied data types and relationships commonly found in seed files. At the same time, Firebase's real-time capabilities make sure that your seeded data immediately reflects across all connected clients.

Seed files prove most valuable during initial project setup, feature development requiring specific data configurations, automated testing scenarios, and when onboarding new team members. They're particularly crucial when working with complex data relationships or when your application requires substantial amounts of interconnected data to function properly.

This article will guide you through creating comprehensive seed files for Firebase-powered Node.js applications, covering everything from basic setup to advanced techniques for managing complex data relationships and environment-specific configurations.

::: note Prerequisites

Before getting started, you’ll need [<VPIcon icon="fa-brands fa-node"/>Node.js 24](https://nodejs.org/en/download) or higher running on your system because the Admin SDK requires modern JavaScript features. You also need to have an active Firebase project with Firestore enabled, which you can create through the [<VPIcon icon="iconfont icon-firebase"/>Firebase Console](https://console.firebase.google.com/u/0/).

You should also know ES6+ JavaScript features in general and async/await syntax and destructuring in particular, as these will be helpful when going through the code examples.

A rudimentary understanding of NoSQL database theory, especially document-based storage and collections, will also help, as Firestore stresses being in opposition to [<VPIcon icon="iconfont icon-gcp"/>traditional relational databases](https://cloud.google.com/learn/what-is-a-relational-database).

Finally, a little knowledge of the Firebase security model and authentication system will go a long way in ensuring that you can safely implement seed files in different environments.

To create a Firebase project and enable the Firestore database, read this [<VPIcon icon="iconfont icon-firebase"/>guide](https://firebase.google.com/docs/firestore/quickstart).

:::

---

## How to Set Up Firebase for Your Node.js Application

You’ll start by installing the server-side SDK, which allows access to Firebase services without user authentication. This SDK fits well in a trusted server environment that needs complete admin privileges for a Firebase project:

```sh
npm install firebase-admin dotenv
```

The installation also brings in `dotenv`, which lets you securely maintain environment variables, something very important when handling Firebase credentials in varying deployment environments.

Next, you’ll need to configure your Firebase project by navigating to the Firebase Console. There, you can first create a service account: Go to Project Settings > Service Accounts, then generate a new private key. This JSON file holds the credentials that will allow your apps to communicate with Firebase services. Store it safely and never commit it to your source version control.

Now you’ll need to create a Firebase initialization module to hold the code connecting to your Firestore database.

For example:

```js title="config/firebase.js"
const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});

const db = admin.firestore();
module.exports = { admin, db };
```

This configuration module uses [<VPIcon icon="fa-brands fa-wikipedia-w"/>environment variables](https://en.wikipedia.org/wiki/Environment_variable) to securely store sensitive Firebase credentials while providing a clean interface for database operations throughout your application. The service account credentials enable full read/write access to your Firestore database, which is necessary for seed operations.

---

## How to Plan Your Seed Data Structure

Effective seed data requires careful planning to make sure that it accurately reflects your application's real-world usage patterns. Start by analyzing your application's core entities and their relationships, identifying which collections are fundamental to your app’s operation and which depend on others.

Consider a typical e-commerce application structure where users create orders containing products from various categories. Your seed data should establish these relationships logically, ensuring referential integrity across collections. Users should exist before orders, products should belong to valid categories, and orders should reference existing users and products.

Designing seed data is pivotal to supporting different development scenarios. Users should be created with various roles and permissions, products should be scattered across multiple categories and different price ranges, and orders should be put into varying states (like pending, completed, or cancelled). This diversity in your data allows you to test various code paths and edge cases without manually creating certain data combinations.

You’ll also need to determine suitable data volumes for each environment. For quicker testing in development environments, 10-50 records per collection should be sufficient. But for staging environments, you could simulate production load by having hundreds or thousands of records. Testing environments usually need bare minimum, tightly-controlled data that supports particular test scenarios.

You should arrange your seed data by environments and purposes, having separate data sets for unit testing, integration testing, and general development. This way, teams can test for different reasons against a dataset without interfering with one another.

---

## How to Create Basic Seed Files

You’ll want to provide the seed scripts with an organized file structure so everything stays organized as the application grows. Create a folder called <VPIcon icon="fas fa-folder-open"/>`seeds` with subfolders for various collections and environments like this:

```plaintext title="file structure"
seeds/
├── data/
│   ├── users.js
│   ├── products.js
│   └── categories.js
├── scripts/
│   ├── seedUsers.js
│   ├── seedProducts.js
│   └── seedAll.js
└── index.js
```

Separating raw data and seeding logic makes it easier to change data without modifying insertion scripts. Begin with a simple user seed script that covers the basics.

For example:

```js title="seeds/scripts/seedUsers.js"
const { db } = require('../../config/firebase');
const users = require('../data/users');

async function seedUsers() {
  console.log('Starting user seeding...');

  try {
    const batch = db.batch();
    const usersCollection = db.collection('users');

    for (const userData of users) {
      const docRef = usersCollection.doc(); // Auto-generated ID
      batch.set(docRef, {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await batch.commit();
    console.log(`Successfully seeded ${users.length} users`);
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

module.exports = seedUsers;
```

The principal features of the script involve: batch operations for efficiency, automatic timestamp generation, error handling with meaningful logging, and auto-generated document IDs. Batch operations are essential for performance, as they minimize the number of network calls and provide atomicity.

Now, create the relevant data files that’ll hold the actual seed data, distinct from the seeding logic.

For example:

```js title="seeds/data/users.js"
module.exports = [
  {
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isActive: true,
    preferences: {
      theme: 'dark',
      notifications: true
    }
  }, {
    email: 'user@example.com',
    firstName: 'Regular',
    lastName: 'User',
    role: 'user',
    isActive: true,
    preferences: {
      theme: 'light',
      notifications: false
    }
  }
];
```

This separation makes it straightforward to alter seed data without the need to modify seeding logic itself. It facilitates quick adjustments of data for different environments or testing scenarios.

---

## How to Build Complex Data Relationships

With every application that grows in complexity, you’ll need to employ some potentially advanced techniques to handle things like relationship-building among collections and data consistency. You can ensure correct referencing during seeding of related collections by storing document IDs and using those IDs in dependent collections.

You can create a seed system that takes care of collection dependencies automatically like this:

```js :collapsed-lines title="seeds/scripts/seedWithReferences.js"
const { db } = require('../../config/firebase');

async function seedWithReferences() {
  console.log('Starting advanced seeding with references...');

  // First, seed categories and store their IDs
  const categoryIds = await seedCategories();

  // Then, seed products with category references
  const productIds = await seedProducts(categoryIds);

  // Finally, seed orders with product references
  await seedOrders(productIds);
}

async function seedCategories() {
  const categories = [
    { name: 'Electronics', description: 'Electronic devices and gadgets' },
    { name: 'Books', description: 'Physical and digital books' }
  ];

  const categoryIds = [];
  const batch = db.batch();

  for (const category of categories) {
    const docRef = db.collection('categories').doc();
    batch.set(docRef, {
      ...category,
      createdAt: new Date()
    });
    categoryIds.push({ id: docRef.id, name: category.name });
  }

  await batch.commit();
  console.log(`Seeded ${categories.length} categories`);
  return categoryIds;
}

async function seedProducts(categoryIds) {
  const products = [
    {
      name: 'Smartphone',
      price: 599.99,
      categoryName: 'Electronics',
      stock: 100
    },
    {
      name: 'JavaScript Guide',
      price: 29.99,
      categoryName: 'Books',
      stock: 50
    }
  ];

  const productIds = [];
  const batch = db.batch();

  for (const product of products) {
    const category = categoryIds.find(cat => cat.name === product.categoryName);
    const docRef = db.collection('products').doc();

    batch.set(docRef, {
      name: product.name,
      price: product.price,
      stock: product.stock,
      categoryId: category.id,
      categoryName: category.name,
      createdAt: new Date()
    });

    productIds.push({ id: docRef.id, name: product.name, price: product.price });
  }

  await batch.commit();
  console.log(`Seeded ${products.length} products`);
  return productIds;
}
```

This guarantees that relationships between collections will be properly maintained while the actual seeding takes place, which prevents any orphaned records and maintains referential integrity. IDs are returned by the function and can be used by dependent collections to create an obvious dependency chain.

To create realistic fake data, you can use the [<VPIcon icon="fas fa-globe"/>Faker.js](https://vueschool.io/articles/vuejs-tutorials/effortless-data-generation-with-faker-js-a-developers-guide/) library to churn out huge volumes of different variations of realistic-looking data.

For example:

```js
const { faker } = require('@faker-js/faker');

function generateFakeUsers(count = 100) {
  const users = [];

  for (let i = 0; i < count; i++) {
    users.push({
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: faker.date.birthdate(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.country(),
        zipCode: faker.location.zipCode()
      },
      phone: faker.phone.number(),
      isActive: faker.datatype.boolean(0.9), // 90% active users
      registrationDate: faker.date.past()
    });
  }

  return users;
}
```

Using this technique, you can quickly generate large volumes of realistically behaving test data, especially for performance testing and making sure your application handles all kinds of data scenarios well.

---

## How to Manage Seed Scripts

A good seed script management system should give you flexibility in executing and maintaining your scripts. Here, you will develop one main seeding script that will initiate the entire seed process.

You’ll want to avoid unconditional seeding so that the existing data is not unintentionally overwritten.

Here is an example of how to do that:

```js :collapsed-lines title="seeds/index.js"
const seedUsers = require('./scripts/seedUsers');
const seedCategories = require('./scripts/seedCategories');
const seedProducts = require('./scripts/seedProducts');
const { db } = require('../config/firebase');

async function clearCollection(collectionName) {
  console.log(`Clearing ${collectionName} collection...`);
  const snapshot = await db.collection(collectionName).get();
  const batch = db.batch();

  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });

  if (snapshot.docs.length > 0) {
    await batch.commit();
    console.log(`Cleared ${snapshot.docs.length} documents from ${collectionName}`);
  }
}

async function runSeeds(options = {}) {
  const { clear = false, collections = ['users', 'categories', 'products'] } = options;

  try {
    if (clear) {
      for (const collection of collections.reverse()) {
        await clearCollection(collection);
      }
    }

    // Run seeds in dependency order
    if (collections.includes('users')) await seedUsers();
    if (collections.includes('categories')) await seedCategories();
    if (collections.includes('products')) await seedProducts();

    console.log('All seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const clear = args.includes('--clear');
  const collections = args.includes('--collections') 
    ? args[args.indexOf('--collections') + 1].split(',') 
    : undefined;

  runSeeds({ clear, collections });
}

module.exports = { runSeeds, clearCollection };
```

This management system provides a clean interface for running seeds with several options, such as clearing data or seeding some particular collections. The [<VPIcon icon="fa-brands fa-aws"/>CLI](https://aws.amazon.com/what-is/cli/) can be easily plugged into npm <VPIcon icon="iconfont icon-json"/>`package.json` scripts and CI/CD pipelines.

Make sure you perform conditional seeding to avoid overwriting existing data

```js
async function conditionalSeed(collectionName, seedFunction) {
  const snapshot = await db.collection(collectionName).limit(1).get();

  if (snapshot.empty) {
    console.log(`${collectionName} collection is empty, proceeding with seeding...`);
    await seedFunction();
  } else {
    console.log(`${collectionName} collection already contains data, skipping...`);
  }
}
```

Here, the collections are checked for existing data before seeding, which helps prevent accidental data loss. It’s safe to run seed scripts more than once.

---

## Environment-Specific Seeding

You can make your seed system environment-aware by structuring environment-specific data sets and configurations. Use environment variables to decide which dataset will be used:

```js title="seeds/data/index.js"
const development = require('./development');
const staging = require('./staging');
const test = require('./test');

const data = {
  development,
  staging,
  test
};

module.exports = data[process.env.NODE_ENV || 'development'];
```

You’ll create separate data files for each environment, with proper volumes and characteristics. Development environments should have minimal data that is nice and easy to understand, while staging environments can afford larger datasets that resemble production conditions better.

You can prevent accidental seeding via safety measures in production environments like this:

```js
async function safeProductionSeed() {
  if (process.env.NODE_ENV === 'production') {
    const confirmation = process.env.CONFIRM_PRODUCTION_SEED;
    if (confirmation !== 'YES_I_AM_SURE') {
      console.error('Production seeding requires explicit confirmation');
      process.exit(1);
    }
  }

  // Proceed with seeding...
}
```

The protection requires an explicit confirmation to seed production databases, preventing accidental loss or corruption of data.

---

## How to Integrate All This into Your Development Workflow

Your seed scripts should ideally be integrated into your development workflow by adding suitable npm scripts to the <VPIcon icon="iconfont icon-json"/>`package.json`:

```json title="package.json"
{
  "scripts": {
    "seed": "node seeds/index.js",
    "seed:clear": "node seeds/index.js --clear",
    "seed:users": "node seeds/index.js --collections users",
    "seed:dev": "NODE_ENV=development npm run seed",
    "seed:test": "NODE_ENV=test npm run seed:clear",
    "dev": "npm run seed:dev && npm start",
    "test": "npm run seed:test && npm run test:unit"
  }
}
```

The scripts provide an easy way of seeding data for various common task scenarios and for plugging into the Dev and Test workflows. The `dev` script automatically seeds the database before starting the development server, ensuring developers always work with fresh, consistent data.

---

## How to Document Your Seeding Practices

Proper documentation will really help your team and make long-term maintenance of your seeding system easier. Without it, your team members may have to search for the commands to run or squander time trying to figure out what data exists for a certain environment. Even worse, they might make ill-advised changes to the seed files.

Good documentation should answer three questions: How do I use the seeding system? What data exists and why? How do I extend or safely modify the system? Creating extensive documentation that addresses these items is our goal.

### Create a Seeding Guide

Let's begin by creating a documentation file for the seeding system. This file should be placed in the root directory of the project so it’s always easy for team members to find.

```md :collapsed-lines
# Database Seeding Guide

---

## Seed Commands
- To seed the database with fresh data for development: `npm run seed`
- To clear all existing data and reseed completly: `npm run seed:clear`
- To seed only the users collection: `npm run seed:users`
- To seed at a development data volume: `npm run seed:dev`
- To seed at a production data volume: `npm run seed:staging`

---

## Environment Data Sets
- **Development**: 10-50 records per collection for fast local testing quick iteration
- **Staging**: 100-1000 records for production-like-load-testing and performance evaluation
- **Test**: Stripped-down controlled data specially designed for automated testing scenarios

---

## Collection Dependencies
Our seeding system respects data relationships by running in this specific order:
1. Categories (no dependencies) - Product categories must first exist
2. Users (no dependencies) - User accounts are independent
3. Products (requires Categories) - Each product looks up a category
4. Orders (requires Users and Products) - Orders look up users and products

---

## Safety-Features
- Check automatically if there already is data that is about to seed to prevent accidental overwrites
- Production environment needs explicit confirmation with CONFIRM_PRODUCTION_SEED=YES_I_AM_SURE
- All database operations use atomic batch writes to guarantee consistency
- Conditional seeding makes sure duplicate data is not created when running scripts multiple times

### Adding New Seed Data
1. Add your data under `/seeds/data/[collection].js`
2. If your new data has relationships, update the corresponding seeding script
3. Test thoroughly in your development environment
4. Run the automated tests to verify data integrity
5. Update this documentation accordingly if you add commands or data descriptions
```

This documentation format provides immediate answers to common questions team members might have. The commands give a copy-pastable set of instructions, while the environment descriptions allow developers to know what to expect from each setting.

The dependencies section is vital because it prevents team members from unknowingly breaking associations by running seeds in an incorrect order. The safety features section makes sure people have confidence that the system won't accidentally delete important data.

---

## Environment Configuration Documentation

An environment variable may be confusing and troublesome if it is not properly documented. So you should create a template detailing exactly what's needed and why each variable matters.

```sh title=".env.example"
# Firebase Service Account Configuration
# Get these values from Firebase Console > Project Settings > Service Accounts
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_CLIENT_ID=your-client-id

# Application Environment
# Controls which data set is used (development/staging/test/production)
NODE_ENV=development

# Production Safety Flag - ONLY set this in production environments
# This prevents accidental seeding of production databases
# CONFIRM_PRODUCTION_SEED=YES_I_AM_SURE

# Optional: Customize data volumes per environment
# SEED_USER_COUNT=50
# SEED_PRODUCT_COUNT=200
```

This is where <VPIcon icon="fas fa-file-lines"/>`.env.example` comes into its own. It shows developers exactly what variables they need to set, gives context about where to find the values, and adds safety warnings about production usage. In the comments, it doesn't just disclose what the variable should do, but also tells why we need it and how to obtain the values.

---

## How to Write Automated Tests for Seed Data

Testing your seed scripts might seem unnecessary, but it becomes critical as your application grows. Without tests, changes to your data structure might break the seeding system, relationships might not be maintained correctly, and your seed data might get outdated as the application evolves.

[<VPIcon icon="fas fa-globe"/>Automated tests](https://geeksforgeeks.org/software-testing/automation-testing-software-testing/) on seed data test for three key things: making sure the raw data files have the proper information, the process for seeding records is actually working, and relationships between data are kept intact. Let's create a full-fledged testing suite to cover all these scenarios.

### Install Testing Dependencies

Before writing tests, you'll need [Jest (<VPIcon icon="fa-brands fa-npm"/>`jest`)](https://npmjs.com/package/jest) as your testing framework. Jest supports async operations very well, which is necessary when writing tests against databases.

```sh
npm install --save-dev jest
```

Since it supports promises and async/await, Jest is well-suited to test Firebase operations. But you will need to configure it for your particular Firebase setup. You'll learn how to do that in the following sections.

### Test Seed Data Structure

The first kind of tests verify if your seed actually works and creates data with the right structure. These tests run the actual seed scripts and check the database to see if things were created as expected.

```js :collapsed-lines
const { db } = require('../config/firebase');
const { runSeeds, clearCollection } = require('../seeds/index');

describe('Seed Data Tests', () => {
  beforeAll(async () => {
    // Ensure we're using test environment to avoid affecting other data
    process.env.NODE_ENV = 'test';
    // Start with a clean slate by clearing and reseeding all data
    await runSeeds({ clear: true });
  });

  afterAll(async () => {
    // Clean up test data to avoid cluttering the test database
    await clearCollection('users');
    await clearCollection('categories'); 
    await clearCollection('products');
  });

  test('users collection has correct structure', async () => {
    const snapshot = await db.collection('users').limit(1).get();
    expect(snapshot.empty).toBe(false);

    const user = snapshot.docs[0].data();
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('firstName');
    expect(user).toHaveProperty('lastName');
    expect(user).toHaveProperty('role');
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('updatedAt');
  });

  test('products maintain referential integrity with categories', async () => {
    const [productsSnapshot, categoriesSnapshot] = await Promise.all([
      db.collection('products').get(),
      db.collection('categories').get()
    ]);

    const categoryIds = categoriesSnapshot.docs.map(doc => doc.id);

    productsSnapshot.docs.forEach(productDoc => {
      const product = productDoc.data();
      expect(product).toHaveProperty('categoryId');
      expect(categoryIds).toContain(product.categoryId);
    });
  });

  test('seed scripts handle existing data correctly', async () => {
    // Get initial count after first seeding
    const initialSnapshot = await db.collection('users').get();
    const initialCount = initialSnapshot.size;

    // Run seeds again - should not create duplicates
    await runSeeds({ collections: ['users'] });

    const finalSnapshot = await db.collection('users').get();
    expect(finalSnapshot.size).toBe(initialCount);
  });
});
```

There are three basic things that these tests check for your seed system. The structure test makes sure seeded documents have all the necessary fields - if you add a required field to your application but fail to update the seed data, this test will alert you.

The referential integrity test is vital to enforce the intended relationships between the data. It makes sure that every product actually references a category existing in the database. If you don't have this test, you can accidentally create orphaned records that break the application.

The duplicate-handling test preserves the [**idempotency**](/freecodecamp.org/idempotence-explained.md) of your seeding system-it can be executed multiple times without duplicate data being generated. This is important since developers often resettle their local databases in their development workflow.

### Test Raw Seed Data Files

Before putting your raw seed data into the database, it should be tested. Such checks let you catch problems with the data itself before they cause issues in your application.

These validation tests will resolve most data-quality concerns before they reach your database. That is, email verification ensures every user email is in correct format-otherwise the users would face authentication issues later. Role verification would also prevent misspellings of assignment names that could destroy your authorization system.

Category reference is very important for enforcing data-level relationships before seeding even starts. If someone adds a product referencing a non-existent category, this test will blow up immediately.

The duplicate email test addresses a common issue where a user can accidentally be assigned the same email address, which violates any unique constraints in your application.

### Add Test Scripts to <VPIcon icon="iconfont icon-json"/>`package.json`

Adding npm scripts will make your tests easier to run. Testing then becomes apart of your regular development workflow.

```json title="package.json"
{
  "scripts": {
    "test:seeds": "jest tests/seedData.test.js",
    "test:seed-validation": "jest tests/seedDataValidation.test.js",
    "test:all-seeds": "npm run test:seed-validation && npm run test:seeds",
    "dev:safe": "npm run test:seed-validation && npm run seed:dev && npm start"
  }
}
```

Here, `test:all-seeds` runs both sets of tests in the right order-from checking the raw data all the way to testing the seeding process. `dev:safe` is an example seed test integration into the developer flow - seed testing is assured before you run the development server.

### Create Jest Configuration

Set up Jest to best accommodate Firebase operations, which tend to be longer than typical unit tests and creation of special timeouts.

```js title="jest.config.js"
module.exports = {
  testEnvironment: 'node',
  testTimeout: 30000, // Firebase operations can be slow, especially batch writes
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  // Only run test files, ignore seed data files
  testMatch: ['**/tests/**/*.test.js']
};
```

```js title="tests/setup.js"
// Global test configuration that applies to all test files

// Ensure all tests run in test environment
process.env.NODE_ENV = 'test';

// Increase timeout for Firebase operations
jest.setTimeout(30000);

// Optional: Add global test utilities
global.testDb = require('../config/firebase').db;
```

This configuration entails setting a longer timeout for the tests since Firebase operations, especially batch writes, can take a number of seconds. Also, this setup file makes sure all the tests run in the test environment so that you don’t mistakenly alter any development data.

JestConfig also states that files with a name ending in `.test.js` are the only ones to be considered tests, preventing Jest from considering your seed data files as tests.

A complete test and documentation will transform your seeding system from a mere utility to a solid, maintainable component of your development infrastructure. Documentation serves to empower the team to use this system with confidence, while tests identify issues before they trickle into development or production environments.

---

## Conclusion

Seed files are a crucial element in a modern application's building blocks that ensure a uniform, reproducible development environment for samples. When you implement advanced seeding processes using a combination of Firebase and Node.js, you get a potent system that acts as a development accelerator, fostering testing reliability and consistency among your team members.

The methods discussed in this article, from basic file management up to intricate relationship handling and environment-specific configurations, provide you with the framework necessary to implement seed files effectively in your Firebase Node.js setups. As your application grows, these patterns will grow with you, supporting anything from just a simple development environment to some really complex multi-environment deployments.

You can explore the [<VPIcon icon="iconfont icon-firebase"/>official seed docs](https://firebase.google.com/docs/data-connect/data-seeding-bulk-operations) to see more advanced seeding patterns and examples. You can also reach out to [me (<VPIcon icon="fas fa-envelope"/>`topefasasi99@gmail.com`)](topefasasi99@gmail.com) for any questions or collaboration.

I hope you found this guide helpful! 🙂

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Database Seed Scripts for Your Node Application",
  "desc": "Database seed scripts are pre-written pieces of code that populate your database with initial data, serving as the foundation for a consistent development environment. These files contain structured data that follows real-world scenarios, letting you...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-build-database-seed-scripts-for-your-node-application.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
