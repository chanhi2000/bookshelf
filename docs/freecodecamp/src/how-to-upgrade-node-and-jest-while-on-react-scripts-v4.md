---
lang: en-US
title: "How to Upgrade from Node 16 and Jest 26 While Staying on React Scripts 4"
description: "Article(s) > How to Upgrade from Node 16 and Jest 26 While Staying on React Scripts 4"
icon: fa-brands fa-npm
category: 
  - NPM
  - Node.js
  - React.js
  - DevOps
  - Docker
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - npm
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Upgrade from Node 16 and Jest 26 While Staying on React Scripts 4"
    - property: og:description
      content: "How to Upgrade from Node 16 and Jest 26 While Staying on React Scripts 4"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-upgrade-node-and-jest-while-on-react-scripts-v4.html
prev: /programming/npm/articles/README.md
date: 2024-07-11
isOriginal: false
author:
  - name: Harsh Deep
    url: https://freecodecamp.org/news/author/harsh410/
cover: https://freecodecamp.org/news/content/images/2024/07/image0.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "NPM > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/npm/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Upgrade from Node 16 and Jest 26 While Staying on React Scripts 4"
  desc="Recently, I was trying to upgrade some of my open source projects. They were made using create-react-app around 2019, and I wanted to upgrade to a newer version of NodeJS and Jest. This would let me take advantage of the security updates, bug fixes, ..."
  url="https://freecodecamp.org/news/how-to-upgrade-node-and-jest-while-on-react-scripts-v4"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/07/image0.png"/>

Recently, I was trying to upgrade some of my open source [projects (<VPIcon icon="iconfont icon-github"/>`classtranscribe/FrontEnd`)](https://github.com/classtranscribe/FrontEnd/). They were made using [create-react-app (<VPIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app) around 2019, and I wanted to upgrade to a newer version of NodeJS and Jest. This would let me take advantage of the security updates, bug fixes, speed improvements, and new features that the ecosystem has developed since then.

Unfortunately, it was not as simple as just running `nvm use 18` and sailing into the sunset. Luckily, if you follow all the proper steps, you'll get past many significant hurdles and upgrade successfully. In this guide, I will share all the knowledge I wish I had known going into the process. The goal is to get your React application using Node 18+ and Jest 29+ while not making the treacherous upgrade to React Scripts 5. If you can upgrade to React Scripts 5 (which is impractical for most real-world applications), I highly recommend that path instead. This is because the newest version of CRA fixes many issues with older dependencies, like the `MD4 envelope` or Babel `process()` return shapes, that we'll manually tackle in this tutorial. If you can upgrade to v5, then Node versions 18+ should work out of the box.

Unfortunately, going up to React Scripts 5 introduces many breaking changes, mostly due to the upgrade to Webpack 5. While many small/tutorial-level applications can upgrade fairly easily, any real-world application faces a steep uphill journey to upgrade.

If the React Scripts 5 upgrade approach doesn't work for you, you can follow what I've written below on making the Node upgrade work while still staying on React Scripts 4. At the end of this page, I've written a small note about my journey trying the `v5` upgrade.

Everyone's upgrade journey will vary, especially considering the Jenga of `npm` dependencies and the relative lack of maintenance of Create React App's React Scripts in recent years.

These are the steps of the upgrade that I've tried with a few different React applications, but you may encounter issues I didn't encounter myself. Google is your best friend in these cases, and it will often lead you to Stackoverflow, GitHub issues, other tutorials, and maybe even source code. Don't be afraid; you'll be able to figure it out!

Note: In this tutorial, I'll refer to Create React App as CRA. React Scripts is the name of the installed package that abstracts all the configuration created by the Create React App command, and in most cases you'll see online resources use both interchangeably.

::: note Prerequisites

To follow along with this guide, you should have a React application that is:

- created with `create-react-app` v4 or upgraded to use `react-scripts` v4. I've tested this tutorial on both scenarios.
- running on Node 16

If you're running NodeJS behind 16, I highly suggest upgrading to version 16. The upgrade path to 16 isn't too bad, but the jump from 16 to 18 creates breaking issues with CRA 4 defaults.

Our application also ran `jest` (v26), the most common test framework in React and shipped by default in CRA v4. If you aren't running Jest, then you can skip the steps relevant to it.

We were also using `yarn`, but the process should be identical with different syntax if you use any other runner/package manager like `npm`.

Ideally, you have some test case coverage to ensure things don't break between versions, so it's well worth taking some time to write some broad integration and unit tests before any upgrade.

I recommend using version control like `git` for each stage while working on a branch. I started over three different times using different upgrade strategies until I had something that worked. Here's a quick [<VPIcon icon="iconfont icon-git"/>intro](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell) to `git` branches if you're unfamiliar with them.

I also recommend using [nvm (<VPIcon icon="iconfont icon-github"/>`nvm-sh/nvm`)](https://github.com/nvm-sh/nvm) (Node Version Manager) to to swap versions quickly. You don't have to use it, and there are many other alternatives out there to manage versions, but it makes quickly switching very easy with just `nvm use`. I'll use `nvm` syntax in this tutorial, but it should be pretty similar for your tool.

:::

---

## How to Validate Every Step

Throughout the tutorial, to ensure things still work, you'll run the following:

- `yarn build` – End-to-end build to catch a lot of library-level issues
- `yarn test` – Regression tests to catch breaks in functionality
- `yarn start` – The starter scripts to catch many initialization bugs.

If you have any more validation steps (CI builds, Docker, staging environments, smoke tests), make sure they're working already and use them throughout the process to validate the upgrade worked correctly. For the rest of the tutorial, I'll refer to these as validation commands.

Before you start the upgrade, make sure all validation steps are working on your current Node 16 and CRA 4. At the end of the tutorial, all these validation steps should be working too. Ultimately, make sure to actually use your React application extensively as the final test once all the upgrade process is done.

Occasionally, you may need to `rm -rf node_modules` and `rm package.lock.json` / `rm yarn.lock` because some library changes may not propagate correctly. Ideally you won't need to do this, but it's reasonably safe since it just downloads all packages again.

---

## How to Bump to React Scripts v4.0.3

Depending on when you started your project from CRA, you'll likely be at different versions along v4. First, we upgrade to the latest minor version to smooth over the rest of the upgrade process.

There shouldn't be any major breaking changes between the minor versions, but make sure to upgrade it incrementally in your <VPIcon icon="iconfont icon-json"/>`package.json` going from `4.0.0` -> `4.0.1` -> `4.0.2` -> `4.0.3`. Going to `4.0.3` will streamline your upgrade process since these minor updates have a lot of useful bug, library, and dependency fixes while not creating new work for now.

I ran `yarn install` after each step and then checked my validation commands to ensure everything was still working.

```json title="package.json"
{
  ... 
  "dependencies": { 
    "react-scripts": "4.0.1", 
    ... 
  }, 
  ...
}

```

In my projects, I didn't encounter any issues, but your mileage may vary. The official [CRA v4 changelog documentation (<VPIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app/blob/main/CHANGELOG-4.x.md) has a list of small changes and upgrade steps between the versions, which will narrow down the causes.

---

## How to Bump Node Version to 18

After making sure your validation commands are working on your current Node 16, set your version to 18. Then we work on fixing all the validation commands until all of them work. Occasionally you may switch back to 16 to make sure things still work in the older version.

In your command line, run the following:

```sh
nvm install 18
nvm use 18
```

::: note

If you have a <VPIcon icon="fa-brands fa-node"/>`.nvmrc` file, you can skip the version numbers in the `nvm install` and `nvm use` commands. Update the file as you change node versions.

:::

Unfortunately, if you try `yarn start` or `yarn build`, you'll immediately run into the cryptography error that comes from `openssl`, which blocks all encryption using MD4. This is the main error blocking the upgrade to Node 18 while on CRA 4. 

```plaintext
Error: error:0308010C:digital envelope routines::unsupported
```

### Understanding the MD4 Issue

MD4 is an old encryption algorithm from the 1990s and has been considered very insecure since 1995 ([<VPIcon icon="fa-brands fa-node"/><VPIcon icon="fa-brands fa-wikipedia-w"/>Wikipedia](https://en.wikipedia.org/wiki/MD4)). OpenSSL from version 3 onward changed MD4 to not be supported by default, but it can be enabled with an allow unsafe legacy [<VPIcon icon="fa-brands fa-node"/>flag (<VPIcon icon="iconfont icon-github"/>`openssl/openssl`)](https://github.com/openssl/openssl/issues/21247) on your system `openssl` or `--openssl-legacy-provider` if adding it to your node/CRA script (see the Node [<VPIcon icon="fa-brands fa-node"/>docs](https://nodejs.org/api/cli.html#--openssl-legacy-provider)).

It's a seemingly simple fix to the solution, but this is more of a last resort since allowing unsafe cryptography is generally a bad idea, and OpenSSL has disabled the algorithm entirely for a reason.

::: note

If you're curious, Webpack has a 1000+ response [discussion (<VPIcon icon="iconfont icon-github"/>`webpack/webpack#14532`)](https://github.com/webpack/webpack/issues/14532) on this topic that might have something useful. Later versions of Webpack also eventually [allowed (<VPIcon icon="iconfont icon-github"/>`webpack/webpack`)](https://github.com/webpack/webpack/pull/14306) a better algorithm called [<VPIcon icon="iconfont icon-github"/>`Cyan4973/xxHash`](https://github.com/Cyan4973/xxHash), added a built-in MD4 `wasm` [implementation (<VPIcon icon="iconfont icon-github"/>`webpack/webpack`)](https://github.com/webpack/webpack/pull/14584), and added a new config option called [<VPIcon icon="iconfont icon-webpack"/>deterministic](https://webpack.js.org/configuration/optimization/#optimizationmoduleids) that sidesteps the issue.

:::

I highly recommend reading this StackOverflow [<VPIcon icon="fa-brands fa-stack-overflow"/>answer](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported) for a quick overview of the major options if we aren't patching it ourselves. Since upgrading dependencies isn't possible here, and we don't want to stay on an old Node version or allow insecure algorithms, we need to dive into the internals of CRA to fix it.

---

## How to Eject Out of React Scripts

CRA is designed for a zero-configuration experience for React Apps that lets you focus on just working on your business logic.

When you want to start changing configuration, CRA doesn't have a built-in method to override any option. Instead, it offers a command called `eject` that copies over all the internals of CRA to your project while leaving your yarn/npm commands intact and then removing React scripts from your project entirely. It's a one-way action, so make sure you save the previous version in `git`.

```sh
yarn eject
```

This is a huge command that will change lots of files in the `config/` and `scripts/` directories as well as your list of packages in <VPIcon icon="iconfont icon-json"/>`package.json`. Once you rerun `yarn install`, make sure to run all your validation commands to make sure everything still works on Node 16 since nothing should have changed in terms of functionality.

Alternatively, if you don't want to try `eject`, there are also workarounds like:

- CRACO uses a clever override mechanism to allow you to still use React Scripts while customizing. Read [<VPIcon icon="fas fa-globe"/>Getting Started](https://craco.js.org/docs/getting-started/) and [Why I built CRACO (<VPIcon icon="fa-brands fa-medium" />`workleap`)](https://medium.com/workleap/why-i-built-craco-33ff39f4fc94). Start off with version `6.4.5` for CRA v4.
- [patch-package (<VPIcon icon="iconfont icon-github"/>`ds300/patch-package`)](https://github.com/ds300/patch-package) applies specific npm package changes for your project and then you share the patch with your team/project. For this guide, you will patch `react-scripts` with the modified webpack and config setups.
- Forking CRA with your own modifications. This way you can still keep the zero config CRA with no hacks to patch in new functionality, but this might get complicated. Here's a guide I saw online: [<VPIcon icon="fas fa-globe"/>Customizing create-react-app: How to Make Your Own Template](https://auth0.com/blog/how-to-configure-create-react-app/).

There's also [react-app-rewired (<VPIcon icon="iconfont icon-github"/>`timarney/react-app-rewired`)](https://github.com/timarney/react-app-rewired) for a similar purpose, but it's mostly unmaintained right now and intended for older versions of CRA behind v4. ### How to Add Linter Ignores for Ejected Files

A lot of the new files from the ejected configuration might not follow your existing project's linter rules. Until you're done with the upgrade, I recommend just adding new ignores on the top of the failing files like:

```js
/* eslint-disable import/order */

// rest of file
...
```

Once you're done with the entire tutorial, feel free to go back and try fixing some of the linter issues, but it might be okay to leave these files as-is since you'll rarely go in to change anything.

### How to Fix Absolute Paths for Jest

In your <VPIcon icon="iconfont icon-json"/>`package.json`, the jest `"testRunner"` option might be encoded to the absolute path that only makes sense on your computer. So, you'll want to change it to a path based on your project's root directory.

While this might work fine for your local development, it will break for any collaborators or cloud computers.

```json
{
  ... 
  "jest": { 
    ... 
    "testRunner": "/my/computer/path/project_name/node_modules/jest-circus/runner.js", 
    ... 
  }, 
  ...
}
```

We use the option `<rootDir>` that is provided by [<VPIcon icon="iconfont icon-jest"/>Jest](https://jestjs.io/docs/configuration#rootdir-string):

```json
{
  ... 
  "jest": { 
    ... 
    "testRunner": "<rootDir>/node_modules/jest-circus/runner.js", 
    ... 
  }, 
  ...
}
```

You might not have to do this on all projects, but `"modulePaths"` may need an update as well:

```json
{
  ...
  "jest": { 
    ... 
    "modulePaths": [ "/my/computer/path/project_name/src" ] 
    ... 
  },
}
...
```

Just remove the reference to your computer's absolute path:

```json
{
  ...
  "jest": { 
    ... 
    "modulePaths": [ "src" ] 
    ... 
  }, 
  ...
}
```

### How to Update your <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` and Other Build Processes with the Ejected Folders

Make sure to include the new ejected folders, <VPIcon icon="fas fa-folder-open"/>`scripts/` and <VPIcon icon="fas fa-folder-open"/>`config/`, into your <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` and other build processes you might be using that existed outside CRA.

For example, the Dockerfile will have the additions of new directories that CRA created that we also want to copy over.

```dockerfile title="Dockerfile"
... 
COPY scripts scripts/
COPY config config/ 
...
```

---

## How to Override Webpack MD4 to SHA256

Based on this [<VPIcon icon="fa-brands fa-stack-overflow"/>StackOverflow answer](https://stackoverflow.com/a/78005686), we add to <VPIcon icon="fa-brands fa-js"/>`webpack.config.js` right before we start defining `module.exports` to use the relatively more modern and secure SHA256 instead of MD4 that's also built into Webpack:

```js title="webpack.config.js"
// ... 
// https://stackoverflow.com/a/78005686 
const crypto = require("crypto"); 
const crypto_orig_createHash = crypto.createHash; crypto.createHash = algorithm => crypto_orig_createHash(algorithm == "md4" ? "sha256" : algorithm); 
// This is the production and development configuration. 
// It is focused on developer experience, fast rebuilds, and a minimal bundle. 
module.exports = function (webpackEnv) 
// ...
```

Once you've changed this, the envelope errors should disappear and your validation commands should now work for Node 18. ---

## How to Upgrade to the Latest Version of Jest

The `eject` also exposes the Babel configuration used for making more recent versions of Jest work correctly. This works great for version 26 but moving the CRA config to the latest version (v29 at the time of writing) has a few more steps.

You should go through `v26` -> `v28` -> `v29` (skipping v27) for all the Jest dependencies. This part is optional if you're happy with CRA v4's Jest 26, but until you eject, you're blocked from upgrading to a recent version of Jest.

I'm skipping Jest 27 because it'll require a change in `config/jest/babelTransform.js` where you'll have to change `module.exports = babelJest.default.createTransformer({` to `module.exports = babelJest.createTransformer({`. This was a bug [fixed (<VPIcon icon="iconfont icon-github"/>`jestjs/jest#12399`)](https://github.com/jestjs/jest/pull/12399) in version 28. Still, if you want to go through Jest 27 as well, you'll be able to follow the rest of the steps with this change and then optionally reverting it on Jest 28. I also highly recommend reading the introduction articles for each of the Jest version upgrades:

<SiteInfo
  name="Jest 27: New Defaults for Jest, 2021 edition ⏩ · Jest"
  desc="In the Jest 26 blog post about a year ago, we announced that after two major releases with few breaking changes, Jest 27 will flip some switches to set better defaults for projects that are new or can migrate smoothly. This gives us the opportunity to remove some packages from the default distribution of Jest 28 and publish them as separately installable and pluggable modules instead. Everyone on the new defaults can benefit from a smaller install size, while people needing these packages can still install them separately."
  url="https://jestjs.io/blog/2021/05/25/jest-27/"
  logo="https://jestjs.io/img/jest.png"
  preview="https://jestjs.io/img/opengraph.png"/>

<SiteInfo
  name="Jest 28: Shedding weight and improving compatibility 🫶 · Jest"
  desc="Jest 28 is finally here, and it comes with some long requested features such as support for sharding a test run across multiple machines, package exports and the ability to customize the behavior of fake timers. These are just some personal highlights, and we'll be highlighting more in this blog post."
  url="https://jestjs.io/blog/2022/04/25/jest-28/"
  logo="https://jestjs.io/img/jest.png"
  preview="https://jestjs.io/img/opengraph.png"/>

<SiteInfo
  name="Jest 29: Snapshot format changes · Jest"
  desc="Jest 29 is here, just a few short months after Jest 28. As mentioned in the Jest 28 blog post, this version contains just a couple of breaking changes, in order to make the upgrade as smooth as possible."
  url="https://jestjs.io/blog/2022/08/25/jest-29/"
  logo="https://jestjs.io/img/jest.png"
  preview="https://jestjs.io/img/opengraph.png"/>

Most of the issues come from Jest 28 having many breaking changes, but the rest of the upgrade path is fairly straightforward.

### How to Bump to Jest 28

For each upgrade, I recommend doing a find and replace for all the many Jest-related packages in your <VPIcon icon="iconfont icon-json"/>`package.json` since the version numbers are all synced. Once you update the numbers, just run `yarn install`:

```json title="package.json"
{
  ... 
  "devDependencies": { 
    ...
    "babel-jest": "^28.1.3", 
    ...
    "jest": "^28.1.3", 
    "jest-circus": "^28.1.3", 
    "jest-resolve": "^28.1.3", 
    ...
  } 
  ...
}
```

### How to Explicitly Set `jsdom` as the Test Environment

If you try running your tests out of the box with `yarn test`. It'll give you this error:

```plaintext
● Validation Error: 
Test environment jest-environment-jsdom cannot be found. 
Make sure the testEnvironment configuration option points to an existing node module. 
Configuration Documentation: https://jestjs.io/docs/configuration 
As of Jest 28 "jest-environment-jsdom" is no longer shipped by default, make sure to install it separately.
```

In Jest 27, Jest [<VPIcon icon="iconfont icon-jest"/>changed the default test environment](https://jestjs.io/blog/2021/05/25/jest-27) to be meant for a more lightweight NodeJS backend environment. However, we have a frontend application, so we still want to test with a simulated browser environment that older Jest versions were based off called [<VPIcon icon="iconfont icon-github"/>`jsdom/jsdom`](https://github.com/jsdom/jsdom).

To fix this, add `"jest-environment-jsdom"` to your dependencies and then run `yarn install`.

```json title="package.json"
{
  ... 
  "devDependencies": { 
    ...
    "babel-jest": "^28.1.3", 
    ...
    "jest": "^28.1.3", 
    "jest-circus": "^28.1.3", 
    "jest-resolve": "^28.1.3", 
    "jest-environment-jsdom": "^28.1.3", 
    ...
  }
  ...
}
```

### How to Fix Transformer Return Type for `process()` and `processAsync()`

‌‌Now, if you run `yarn test`, you'll get this:

```plaintext
FAIL  src/App.test.js 
● Test suite failed to run 
● Invalid return value: `process()` or/and `processAsync()` method of code transformer found at "path/in/my/computer" 
should return an object or a Promise resolving to an object. The object must have `code` property with a string of processed code. 
This error may be caused by a breaking change in Jest 28: https://jestjs.io/docs/upgrading-to-jest28#transformer Code Transformation Documentation: https://jestjs.io/docs/code-transformation
```

This is because the `process()` functions that used to return a string now expect an object in the format of `{ code:old_string_here}`.

To fix this, we go into our ejected <VPIcon icon="fas fa-folder-open"/>`config/jest` folder, and we change the output shape for all our files. For CSS, it's a single line change:

```js
// This is a custom Jest transformer turning style imports into empty objects. 
// http://facebook.github.io/jest/docs/en/webpack.html 

module.exports = { 
  process() { 
    return { code: 'module.exports = {};' }; 
  }, 
  getCacheKey() { 
    // The output is always the same. 
    return 'cssTransform'; 
  }, 
};
```

and for files, you have to change both branch return statements:

```js
const path = require('path');
const camelcase = require('camelcase');

// This is a custom Jest transformer turning file imports into filenames. // http://facebook.github.io/jest/docs/en/webpack.html 
module.exports = {
  process(src, filename) {
    const assetFilename = JSON.stringify(path.basename(filename));
    if (filename.match(/.svg$/)) {
      // Based on how SVGR generates a component name: 
      // https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6 
      const pascalCaseFilename = camelcase(path.parse(filename).name, { pascalCase: true, });
      const componentName = `Svg${pascalCaseFilename}`;
      return {
        code: `const React = require('react')...` // pretty long string }; 
      }

      return { code: `module.exports = ${assetFilename};` };
    },
  };
}
```

::: note

As of the time of writing, the error message link to the upgrade guide tutorial [doesn't work (<VPIcon icon="iconfont icon-github"/>`jestjs/jest`)](https://github.com/jestjs/jest/issues/15112#issuecomment-2160883936), but you can find the correct link at [https://jest-archive-august-2023.netlify.app/docs/28.x/upgrading-to-jest28/](https://jest-archive-august-2023.netlify.app/docs/28.x/upgrading-to-jest28/). There's also an older [archive link](https://web.archive.org/web/20230330085721/https://jestjs.io/docs/28.x/upgrading-to-jest28#transformer) if that doesn't work.

:::

### How to Bump Jest to 29

Once all the validation steps are working with Jest 28, the upgrade to 29 should be smoother. Just update your <VPIcon icon="iconfont icon-json"/>`package.json` and run `yarn install`:

```json
{
  ... 
  "devDependencies": { ... 
    "babel-jest": "^29.7.0", 
    "jest": "^29.7.0", 
    "jest-circus": "^29.7.0", 
    "jest-resolve": "^29.7.0", 
    "jest-environment-jsdom": "^29.7.0" ... 
  } 
  ...
}
```

At this point, `yarn test` should work correctly with your existing test suite.

---

## How Far Should I Upgrade NodeJS?

Trying to decide how far ahead to upgrade Node versions can be a tricky question. Following the above steps, I was able to get all the Node versions up until the most recent Node 22 working.

At the time of writing, 18 is a pretty good stopping point in terms of current support and recent ECMAScript support. But if you're looking to decide, then the following three factors are the most important:

1. Library support: Look at all your critical libraries and see if they have a strong preference for a certain version or have breaking issues for more recent versions. Later Node versions are usually better, but sometimes old libraries didn't get the right patches and might block your upgrade.
2. Support windows: Different Node versions have a window where the maintainers consider it under "Maintenance", "Active", "Current" or "Unsupported", and over time the older versions lose maintenance. The even versions are also designated LTS (Long Term Support), giving support for a long time and what works for most people. The website has a helpful chart for this: [<VPIcon icon="fa-brands fa-node"/>nodejs.org/en/about/previous-releases](https://nodejs.org/en/about/previous-releases).
3. Language feature support: ECMAScript's specification is always evolving with every year, and getting to use the newer syntax with nicer constructs is always a big quality of life upgrade. I love [<VPIcon icon="fas fa-globe"/>node.green](https://node.green/) which has a table of Node versions against ECMAScript syntax features with code examples for each feature.

Due to technologies like [<VPIcon icon="iconfont icon-babel"/>Babel](https://babeljs.io/) (bundled with Create React App), you don't need to worry too much about the end users of your website, as newer Node features will just get transpiled to browser-compliant ones.

---

## Should You Still Use Create React Scripts? What Alternatives Are There?

In this tutorial, I decided to eject out of CRA to access the Webpack and Babel configuration, and many CRA projects have eventually come to do this as well. Maintenance of CRA has nearly stopped while the ecosystem keeps evolving.

Personally, I recommend someone creating a React project today to try newer alternatives like [<VPIcon icon="iconfont icon-vite"/>Vite](https://vitejs.dev/guide/) or [<VPIcon icon="iconfont icon-parceljs"/>Parcel](https://parceljs.org/recipes/react/) which have a nice starter applications that are simple and easier to understand. Unfortunately, they might not have as many bells and whistles as what CRA gives, but it's good enough for almost all practical modern development.

In the context of education, my old tutorials used `create-react-app`, and it was such a major help, but my newer ones will use Vite.

Still, your application and development experience might be very different than mine. I recommend reading and learning from these resources to form your own perspective:

- GitHub [<VPIcon icon="fa-brands fa-react"/>issue (<VPIcon icon="iconfont icon-github"/>`reactjs/react.dev`)](https://github.com/reactjs/react.dev/pull/5487) with 200+ responses and 1000s of reactions on if Create React App should be replaced with Vite on the official docs. It also has a [<VPIcon icon="fa-brands fa-react"/>note (<VPIcon icon="iconfont icon-github"/>`reactjs/react.dev`)](https://github.com/reactjs/react.dev/pull/5487#issuecomment-1409720741) from the maintainer side of CRA explaining a lot of important context that is highly worth reading. Parcel's maintainer made a really good [<VPIcon icon="fa-brands fa-react"/>comment (<VPIcon icon="iconfont icon-github"/>`reactjs/react.dev`)](https://github.com/reactjs/react.dev/pull/5487#issuecomment-1399360209) as well.
- Some interesting comments ([<VPIcon icon="fa-brands fa-react"/>one (<VPIcon icon="iconfont icon-github"/>`reactjs/react.dev`)](https://github.com/reactjs/react.dev/pull/5487#issuecomment-1423368130), [two (<VPIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app/issues/13598)) on how CRA created a simple and easy to use React experience out of the box without worrying about setup hell and focusing on the actual application.
- [News article (<VPIcon icon="fa-brands fa-medium" />`@vivekdwivedi`)](https://medium.com/@vivekdwivedi/the-end-of-an-era-react-team-no-longer-recommends-create-react-app-f2fe6e842d13) explaining that the React Team has chosen to stop recommending Create React App, along with some context behind this and future alternatives.

---

## Conclusion

At this point, you should be able to run all your validation scripts and have an application that works with Node 18+ and Jest 29+.

In an ideal world, you'd run into the same hurdles as I did, and everything would be working. Realistically, everyone's application is different, and the internet is full of numerous developers who have gone through this upgrade process with various issues.

I highly suggest making Google, StackOverflow, GitHub, and official library documentation your best friends in the process, and I wish you good luck!

### Alternatively: How to Upgrade to React Scripts 5.0.1

This is beyond the scope of this tutorial, so I'll be briefer here – but here's a little information to get you started.

I suggest starting with the official docs changelog for CRA v5 that includes all the major changes as well as some version upgrade instructions: [https://github.com/facebook/create-react-app/blob/main/CHANGELOG.md (<VPIcon icon="iconfont icon-github"/>`facebook/create-react-app`)](https://github.com/facebook/create-react-app/blob/main/CHANGELOG.md).

Bumping the version is fairly easy, setting `react-scripts` to `5.0.1` in your <VPIcon icon="iconfont icon-json"/>`package.json`, but then the hard part is all the breaking changes.

The most complicated part of the upgrade is the upgrade to Webpack 5 from Webpack 4. Read Webpack's official guide [<VPIcon icon="iconfont icon-webpack"/>To v5 from v4](https://webpack.js.org/migrate/5/) which has a nice overview, and look around the internet for guides for this upgrade. A few more hurdles that you might come across:

- For `@babel/helper-compilation-targets: 'opera_mobile' is not a valid target` you can add `"not op_mob >= 1"` to the `browserslist` array as suggested by this [comment (<VPIcon icon="iconfont icon-github"/>`babel/babel`)](https://github.com/babel/babel/issues/16171#issuecomment-2015227043) on the babel issue tracker. The other comments may also be helpful.
- You'll probably have to access the CRA internals for many steps using either React Scripts `eject` or something like [CRACO version 7](https://craco.js.org/docs/getting-started/).
- Webpack 5 has a breaking change which removes support for a lot of browser specific APIs like `os`, `http`, `util` that worked in Webpack 4 that your application may have been using. You can either add all of them back using a package like [node-polyfill-webpack-plugin (<VPIcon icon="iconfont icon-github"/>`Richienb/node-polyfill-webpack-plugin`)](https://github.com/Richienb/node-polyfill-webpack-plugin) or add imports piecewise following this [cheatsheet](https://gist.github.com/ef4/d2cf5672a93cf241fd47c020b9b3066a).
- For Babel eslint parser load errors like `Error: Failed to load parser 'babel-eslint' declared in '.eslintrc': Cannot find module 'babel-eslint'` , you might have to swap out `"parser": "babel-eslint"` with `"parser": "@babel/eslint-parser"` in your `.eslintrc` and install `"@babel/eslint-parser"` in your <VPIcon icon="iconfont icon-json"/>`package.json`. This might be caused by the move of `babel-eslint` to the `@babel` monorepo, see [<VPIcon icon="iconfont icon-babel"/>The State of babel-eslint](https://babeljs.io/blog/2020/07/13/the-state-of-babel-eslint) for more info.
- Some filetype imports that used to work with Webpack 4 will start breaking with `Module build failed: UnhandledSchemeError` (the actual error took several screens in my Terminal). The solution here will be fixing the prefixes of the files you import, and for external files that were being included, see if you can find a npm package for it. For example, one of my projects stopped using `semantic-ui.min.css` downloaded from the internet, and instead I added `"semantic-ui-css": "^2.5.0"` to my <VPIcon icon="iconfont icon-json"/>`package.json`. Definitely read this [issue (<VPIcon icon="iconfont icon-github"/>`webpack/webpack`)](https://github.com/webpack/webpack/issues/12792) thread in the webpack repo for more information.

After all of these I was able to get `yarn test` and `yarn build` to succeed, but `yarn start` still had too many issues and I pivoted to making CRA v4 work instead. Hopefully you might get further than I did.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Upgrade from Node 16 and Jest 26 While Staying on React Scripts 4",
  "desc": "Recently, I was trying to upgrade some of my open source projects. They were made using create-react-app around 2019, and I wanted to upgrade to a newer version of NodeJS and Jest. This would let me take advantage of the security updates, bug fixes, ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-upgrade-node-and-jest-while-on-react-scripts-v4.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
