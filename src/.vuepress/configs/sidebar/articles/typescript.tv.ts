import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const GLOSSARY: SidebarInfoSubgroupTemplate = {
  text: "Glossary",
  collapsible: true,
  icon: 'iconfont icon-typescript',
  subPath: 'glossary',
  children: [
    'README',
  ]
}

const Y2026: SidebarYeargroupTemplate = {
  text: '2026',
  collapsible: true,
  children: [
    // END: 2026
    "why-your-cat-became-a-dog-and-typescript-finally-noticed", // 2026-01-22
    "how-intersection-types-replace-error-handling", // 2026-01-13
    "never-review-a-dependency-update-again", // 2026-01-10
    "stop-committing-unformatted-code", // 2026-01-08
    "never-miss-a-switch-case-again", // 2026-01-07
    "why-you-should-use-locators-instead-of-text-in-your-tests", // 2026-01
  ],
}

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
    "hands-onwhy-you-should-use-locators-instead-of-text-in-your-tests", // 2025-12-15
  ],
}

const Y2024: SidebarYeargroupTemplate = {
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
  ],
}

const Y2023: SidebarYeargroupTemplate = {
  text: '2023',
  collapsible: true,
  children: [
    // END: 2023
    "what-are-ecmascript-modules", // 2023-11-10
    "serving-static-content-with-nestjs-and-express", // 2023-11-01
    "write-a-simple-typescript-script-with-esm.", // 2023-11-01
    "effortless-nodemon-setup-with-typescript-and-esm", // 2023-09-21
    "fix-type-x-is-not-assignable-to-type-y", // 2023-09-20
    "what-is-the-windows-subsystem-for-android-wsa", // 2023-09-12
    "what-is-type-coercion-in-typescript", // 2023-08-09
    "create-a-typescript-test-matrix-using-github-actions", // 2023-07-25
    "type-inference-type-annotations-in-typescript", // 2023-07-22
    "what-is-type-compatibility-in-typescript", // 2023-07-12
    "what-is-the-satisfies-operator-in-typescript", // 2023-07-07
    "what-is-downleveling-in-typescript", // 2023-07-05
    "safer-array-access-in-typescript", // 2023-06-16
    "the-void-operator-in-typescript-and-javascript", // 2023-06-14
    "improve-your-type-safety-with-branded-types", // 2023-05-15
    "avoid-errors-with-defensive-coding-in-typescript", // 2023-05-09
    "enhancing-return-types-with-function-overloading-in-typescript", // 2023-05-08
    "video-tutorial-compiling-typescript-to-javascript", // 2023-05-08
    "javascript-in-typescript-learn-how-to-use-them-together", // 2023-01-22
    "type-checking-with-assertion-functions-in-typescript", // 2023-01-21
    "how-to-use-mapped-types-in-typescript", // 2023-01-05
    "how-to-use-const-assertions-in-typescript", // 2023-01-03
  ]
}

const Y2022: SidebarYeargroupTemplate = {
  text: '2022',
  collapsible: true,
  children: [
    // END: 2022
  ]
}

const Y2021: SidebarYeargroupTemplate = {
  text: '2021',
  collapsible: true,
  children: [
    // END: 2021
    "how-to-type-express-js-middleware", // 2021-11-26
    "debugging-node-js-with-chrome-devtools", // 2021-03-17
    "styling-react-components-with-css-and-typescript", // 2021-03-17
    "error-ts1196-catch-clause-variable-type-annotation", // 2021-03-08
    "how-to-create-a-screencast", // 2021-03-06
    "rendering-multiple-elements-in-react", // 2021-02-28
    "improve-your-switch-cases-with-typescript", // 2021-02-27
    "react-with-typescript-for-beginners", // 2021-02-23
    "docker-desktop-hardware-assisted-virtualization", // 2021-01-13
    "upgrade-to-react-router-v6", // 2021-01-02
  ]
}

const Y2020: SidebarYeargroupTemplate = {
  text: '2020',
  collapsible: true,
  children: [
    // END: 2020
    "setup-webpack-hmr-with-nestjs-and-react", // 2020-12-21
    "setup-webpack-hmr-with-express-server-and-react", // 2020-12-21
    "use-react-with-typescript", // 2020-12-17
    "understanding-generators-iterators-and-iterables", // 2020-11-30
    "function-overloading-explained", // 2020-11-29
    "when-to-use-static-methods-in-typescript", // 2020-10-08
    "fastest-way-to-set-up-a-typescript-project-with-nodejs-npm", // 2020-08-05
    "error-ts2307-cannot-find-module-events", // 2020-06-04
    "top-level-await-in-typescript-3-8", // 2020-03-31
  ]
}

const Y2019: SidebarYeargroupTemplate = {
  text: '2019',
  collapsible: true,
  children: [
    // END: 2019
    "typescript-code-coverage-with-karma", // 2019-04-29
    "anatomy-of-an-electron-4-application", // 2019-04-16
    "setup-typescript-code-coverage-for-electron-applications", // 2019-04-08
    "run-nodejs-apps-on-heroku-with-typescript", // 2019-03-19
    "parse-command-line-arguments-in-nodejs", // 2019-03-12
    "add-a-window-property-with-typescript", // 2019-02-20
    "setup-electron-mocha-with-babel-register-and-typescript", // 2019-02-19
  ]
}

/* const Y2018: SidebarYeargroupTemplate = {
  text: '2018',
  collapsible: true,
  children: [
    // END: 2018
  ]
}
const Y2017: SidebarYeargroupTemplate = {
  text: '2017',
  collapsible: true,
  children: [
    // END: 2017
  ]
} */

export const template: SidebarInfoTemplate = {
  name: 'typescript.tv',
  faviconPath: 'https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png',
  linksMap: new Map([
    [
    "sh", [
      // END: 2025sh
      // END: sh
    ]],[
    "js-react", [
      // END: 2019js-react
      "reactuse-react-with-typescript", // 2020-12-17
      "setup-webpack-hmr-with-express-server-and-react", // 2020-12-21
      "setup-webpack-hmr-with-nestjs-and-react", // 2020-12-21
      // END: 2020js-react
      "upgrade-to-react-router-v6", // 2021-01-02
      "react-with-typescript-for-beginners", // 2021-02-23
      "rendering-multiple-elements-in-react", // 2021-02-28
      "styling-react-components-with-css-and-typescript", // 2021-03-17
      // END: 2021js-react
      // END: 2022js-react
      // END: 2023js-react
      // END: 2024js-react
      // END: 2025js-react
      // END: 2026js-react
      // END: js-react
    ]],[
    "js-express", [
      "run-nodejs-apps-on-heroku-with-typescript", // 2019-03-19
      // END: 2019js-express
      "setup-webpack-hmr-with-express-server-and-react", // 2020-12-21
      // END: 2020js-express
      "how-to-type-express-js-middleware", // 2021-11-26
      // END: 2021js-express
      // END: 2022js-express
      "serving-static-content-with-nestjs-and-express", // 2023-11-01
      // END: 2023js-express
      // END: 2024js-express
      // END: 2025js-express
      // END: 2026js-express
      // END: js-express
    ]],[
    "js-nest", [
      // END: 2019js-nest
      "setup-webpack-hmr-with-nestjs-and-react", // 2020-12-21
      // END: 2020js-nest
      // END: 2021js-nest
      // END: 2022js-nest
      "serving-static-content-with-nestjs-and-express", // 2023-11-01
      // END: 2023js-nest
      // END: 2024js-nest
      // END: 2025js-nest
      // END: 2026js-nest
      // END: js-nest
    ]],[
    "js-node", [
      "parse-command-line-arguments-in-nodejs", // 2019-03-12
      // END: 2019js-node
      // END: 2020js-node
      "debugging-node-js-with-chrome-devtools", // 2021-03-17
      // END: 2021js-node
      // END: 2022js-node
      "what-are-ecmascript-modules", // 2023-11-10
      // END: 2023js-node
      // END: 2024js-node
      // END: 2025js-node
      "stop-committing-unformatted-code", // 2026-01-08
      // END: 2026js-node
      // END: js-node
    ]],[
    "ts", [
      "setup-electron-mocha-with-babel-register-and-typescript", // 2019-02-19
      "add-a-window-property-with-typescript", // 2019-02-20
      "setup-typescript-code-coverage-for-electron-applications", // 2019-04-08
      "anatomy-of-an-electron-4-application", // 2019-04-16
      "typescript-code-coverage-with-karma", // 2019-04-29
      // END: 2019ts
      "top-level-await-in-typescript-3-8", // 2020-03-31
      "error-ts2307-cannot-find-module-events", // 2020-06-04
      "fastest-way-to-set-up-a-typescript-project-with-nodejs-npm", // 2020-08-05
      "when-to-use-static-methods-in-typescript", // 2020-10-08
      "function-overloading-explained", // 2020-11-29
      "understanding-generators-iterators-and-iterables", // 2020-11-30
      // END: 2020ts
      "improve-your-switch-cases-with-typescript", // 2021-02-27
      "error-ts1196-catch-clause-variable-type-annotation", // 2021-03-08
      // END: 2021ts
      // END: 2022ts
      "how-to-use-const-assertions-in-typescript", // 2023-01-03
      "how-to-use-mapped-types-in-typescript", // 2023-01-05
      "javascript-in-typescript-learn-how-to-use-them-together", // 2023-01-22
      "video-tutorial-compiling-typescript-to-javascript", // 2023-05-08
      "enhancing-return-types-with-function-overloading-in-typescript", // 2023-05-08
      "avoid-errors-with-defensive-coding-in-typescript", // 2023-05-09
      "improve-your-type-safety-with-branded-types", // 2023-05-15
      "the-void-operator-in-typescript-and-javascript", // 2023-06-14
      "safer-array-access-in-typescript", // 2023-06-16
      "what-is-downleveling-in-typescript", // 2023-07-05
      "what-is-the-satisfies-operator-in-typescript", // 2023-07-07
      "what-is-type-compatibility-in-typescript", // 2023-07-12
      "type-inference-type-annotations-in-typescript", // 2023-07-22
      "create-a-typescript-test-matrix-using-github-actions", // 2023-07-25
      "what-is-type-coercion-in-typescript", // 2023-08-09
      "fix-type-x-is-not-assignable-to-type-y", // 2023-09-20
      "effortless-nodemon-setup-with-typescript-and-esm", // 2023-09-21
      "write-a-simple-typescript-script-with-esm.", // 2023-11-01
      // END: 2023ts
      // END: 2024ts
      "hands-onwhy-you-should-use-locators-instead-of-text-in-your-tests", // 2025-12-15
      // END: 2025ts
      "how-intersection-types-replace-error-handling", // 2026-01-13
      "why-your-cat-became-a-dog-and-typescript-finally-noticed", // 2026-01-22
      // END: 2026ts
      // END: ts
    ]],[
    "npm", [
      // END: 2020npm
      // END: 2021npm
      // END: 2022npm
      // END: 2023npm
      // END: 2024npm
      // END: 2025npm
      "stop-committing-unformatted-code", // 2026-01-08
      // END: 2026npm
      // END: npm
    ]],[
    "git", [
      // END: 2020git
      // END: 2021git
      // END: 2022git
      // END: 2023git
      // END: 2024git
      // END: 2025git
      "stop-committing-unformatted-code", // 2026-01-08
      // END: 2026git
      // END: git
    ]],[
    "docker", [
      // END: 2019docker
      // END: 2020docker
      "docker-desktop-hardware-assisted-virtualization", // 2021-01-13
      // END: 2021docker
      // END: 2022docker
      // END: 2023docker
      // END: 2024docker
      // END: 2025docker
      // END: 2026docker
      // END: docker
    ]],[
    "win", [
      // END: 2019win
      // END: 2020win
      "docker-desktop-hardware-assisted-virtualization", // 2021-01-13
      "what-is-the-windows-subsystem-for-android-wsa", // 2023-09-12
      // END: 2021win
      // END: 2022win
      // END: 2023win
      // END: 2024win
      // END: 2025win
      // END: 2026win
      // END: win
    ]],[
    "github", [
      // END: 2020github
      // END: 2021github
      // END: 2022github
      "create-a-typescript-test-matrix-using-github-actions", // 2023-07-25
      // END: 2023github
      // END: 2024github
      // END: 2025github
      "never-review-a-dependency-update-again", // 2026-01-10
      // END: 2026github
      // END: github
    ]],[
    "heroku", [
      "run-nodejs-apps-on-heroku-with-typescript", // 2019-03-19
      // END: 2019heroku
      // END: 2020heroku
      // END: 2021heroku
      // END: 2022heroku
      // END: 2023heroku
      // END: 2024heroku
      // END: 2025heroku
      // END: 2026heroku
      // END: heroku
    ]],[
    "screencast", [
      // END: 2019screencast
      // END: 2020screencast
      "how-to-create-a-screencast", // 2021-03-06
      // END: 2021screencast
      // END: 2022screencast
      // END: 2023screencast
      // END: 2024screencast
      // END: 2025screencast
      // END: 2026screencast
      // END: screencast
    ]],[
    "all", [
      GLOSSARY,
      Y2026,
      Y2025,
      Y2024,
      Y2023,
      Y2022,
      Y2021,
      Y2020,
      Y2019,
      /* Y2018,
      Y2017, */
    ]],
  ])
}