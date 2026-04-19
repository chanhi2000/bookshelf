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
    "you-dont-need-embeddings-for-rag", // 2025-04-02
    "chaos-testing-your-typescript-sdks-with-toxiproxy", // 2026-04-01
    "stop-babysitting-claude-code", // 2026-03-28
    "your-keyboard-is-obsolete-voice-coding-in-typescript", // 2026-02-12
    "why-your-cat-became-a-dog-and-typescript-finally-noticed", // 2026-01-22
    "how-intersection-types-replace-error-handling", // 2026-01-13
    "never-review-a-dependency-update-again", // 2026-01-10
    "stop-committing-unformatted-code", // 2026-01-08
    "never-miss-a-switch-case-again", // 2026-01-07
  ],
}

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
    "why-you-should-use-locators-instead-of-text-in-your-tests", // 2025-12-15
    "why-codemods-beat-search-and-replace-every-time", // 2025-12-02
    "upgrading-to-tailwind-css-v4-a-migration-guide", // 2025-12-02
    "setting-up-vitest-for-react-and-nextjs-applications", // 2025-12-01
    "from-rest-apis-to-mcp-the-future-of-ai-integration", // 2025-11-13
    "bring-immutability-and-context-to-arrays", // 2025-11-12
    "dirname-is-not-defined-in-es-module-scope", // 2025-11-06
    "you-dont-need-dotenv-anymore", // 2025-11-06
    "why-typescript-enums-are-dead", // 2025-11-04
    "deploy-your-typescript-website-on-github-pages", // 2025-10-27
    "android-emulator-running-in-nested-virtualization", // 2025-10-15
    "testing-types-in-typescript", // 2025-08-28
    "make-nodejs-eventemitter-type-safe", // 2025-08-22
    "private-fields-in-typescript-whats-the-difference-between-private-and", // 2025-08-21
    "switch-true-narrowing-in-typescript-a-practical-alternative-to-pattern-matching", // 2025-08-19
    "streamlining-cli-input-with-async-generators", // 2025-08-12
    "resilient-api-calls-with-ts-retry-promise", // 2205-07-17
    "why-write-validation-logic-when-zod-can-do-it-better", // 2025-07-17
    "goodbye-json-schema-typing-json-with-json-structure", // 2025-07-10
    "error-handling-with-result-types", // 2025-07-08
  ],
}

const Y2024: SidebarYeargroupTemplate = {
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
    "fixing-typeerror-err_unknown_file_extension-with-ts-node", // 2024-11-25
    "hosting-on-heroku-with-a-custom-domain-and-ssl", // 2024-09-25
    "parsing-csv-files-in-typescript-with-papa-parse/", // 2024-08-30
    "how-to-write-declarative-typescript-code", // 2024-08-28
    "analyzing-pdfs-with-chatgpt-using-openais-vision-api", // 2024-08-20
    "nodejs-rolls-out-experimental-typescript-support", // 2024-07-31
    "understanding-branded-types-in-typescript", // 2024-07-26
    "loading-json-files-dynamically-in-typescript", // 2024-07-18
    "reading-totp-data-for-2fa-from-qr-code-in-typescript", // 2024-07-05
    "fixing-typescript-error-type-undefined-is-not-assignable-to-type-string", // 2024-07-03
    "boost-your-typescript-tests-with-mutation-testing", // 2024-07-02
    "optimizing-typescript-configs-balancing-compilation-and-type-checking", // 2024-06-28
    "use-typescript-generators-for-cleaner-programming", // 2024-05-30
    "all-you-need-to-know-about-iterators-and-generators", // 2024-05-23
    "save-memory-with-typescript-generators", // 2024-05-21
    "the-4-must-know-typescript-compiler-configs", // 2024-05-16
    "what-are-generics-and-why-you-should-use-them", // 2024-04-30
    "module-openai-has-no-exported-member", // 2024-04-24
    "enumberable-vs-iterable-in-typescript-whats-the-difference", // 2024-01-11
  ],
}

const Y2023: SidebarYeargroupTemplate = {
  text: '2023',
  collapsible: true,
  children: [
    // END: 2023
    "typeerror-prettierresolveconfigsync-is-not-a-function", // 2023-12-19
    "improve-your-typescript-workflow-with-code-snippets", // 2023-12-11
    "filtering-arrays-in-typescript-with-correct-types", // 2023-12-06
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
    "java-android", [
      "android-emulator-running-in-nested-virtualization", // 2025-10-15
      // END: 2025java-android
      // END: java-android
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
      "upgrading-expo-in-a-react-native-project-with-typescript", // 2024-07-08
      // END: 2024js-react
      "setting-up-vitest-for-react-and-nextjs-applications", // 2025-12-01
      // END: 2025js-react
      // END: 2026js-react
      // END: js-react
    ]],[
    "js-next", [
      // END: 2019js-next
      // END: 2020js-next
      // END: 2021js-next
      // END: 2022js-next
      // END: 2023js-next
      // END: 2024js-next
      "setting-up-vitest-for-react-and-nextjs-applications", // 2025-12-01
      // END: 2025js-next
      // END: 2026js-next
      // END: js-next
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
      "chaos-testing-your-typescript-sdks-with-toxiproxy", // 2026-04-01
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
      "nodejs-rolls-out-experimental-typescript-support", // 2024-07-31
      // END: 2024js-node
      "make-nodejs-eventemitter-type-safe", // 2025-08-22
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
      "filtering-arrays-in-typescript-with-correct-types", // 2023-12-06
      "improve-your-typescript-workflow-with-code-snippets", // 2023-12-11
      "typeerror-prettierresolveconfigsync-is-not-a-function", // 2023-12-19
      // END: 2023ts
      "enumberable-vs-iterable-in-typescript-whats-the-difference", // 2024-01-11
      "module-openai-has-no-exported-member", // 2024-04-24
      "what-are-generics-and-why-you-should-use-them", // 2024-04-30
      "the-4-must-know-typescript-compiler-configs", // 2024-05-16
      "save-memory-with-typescript-generators", // 2024-05-21
      "all-you-need-to-know-about-iterators-and-generators", // 2024-05-23
      "use-typescript-generators-for-cleaner-programming", // 2024-05-30
      "optimizing-typescript-configs-balancing-compilation-and-type-checking", // 2024-06-28
      "boost-your-typescript-tests-with-mutation-testing", // 2024-07-02
      "fixing-typescript-error-type-undefined-is-not-assignable-to-type-string", // 2024-07-03
      "reading-totp-data-for-2fa-from-qr-code-in-typescript", // 2024-07-05
      "understanding-branded-types-in-typescript", // 2024-07-26
      "analyzing-pdfs-with-chatgpt-using-openais-vision-api", // 2024-08-20
      "how-to-write-declarative-typescript-code", // 2024-08-28
      "parsing-csv-files-in-typescript-with-papa-parse/", // 2024-08-30
      "fixing-typeerror-err_unknown_file_extension-with-ts-node", // 2024-11-25
      // END: 2024ts
      "error-handling-with-result-types", // 2025-07-08
      "goodbye-json-schema-typing-json-with-json-structure", // 2025-07-10
      "why-write-validation-logic-when-zod-can-do-it-better", // 2025-07-17
      "resilient-api-calls-with-ts-retry-promise", // 2205-07-17
      "streamlining-cli-input-with-async-generators", // 2025-08-12
      "switch-true-narrowing-in-typescript-a-practical-alternative-to-pattern-matching", // 2025-08-19
      "private-fields-in-typescript-whats-the-difference-between-private-and", // 2025-08-21
      "make-nodejs-eventemitter-type-safe", // 2025-08-22
      "testing-types-in-typescript", // 2025-08-28
      "you-dont-need-dotenv-anymore", // 2025-11-06
      "why-you-should-use-locators-instead-of-text-in-your-tests", // 2025-12-15
      "bring-immutability-and-context-to-arrays", // 2025-11-12
      "from-rest-apis-to-mcp-the-future-of-ai-integration", // 2025-11-13
      // END: 2025ts
      "how-intersection-types-replace-error-handling", // 2026-01-13
      "why-your-cat-became-a-dog-and-typescript-finally-noticed", // 2026-01-22
      "your-keyboard-is-obsolete-voice-coding-in-typescript", // 2026-02-12
      "you-dont-need-embeddings-for-rag", // 2025-04-02
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
    "css", [
      // END: 2020css
      // END: 2021css
      // END: 2022css
      // END: 2023css
      // END: 2024css
      // END: 2025css
      // END: 2026css
      // END: css
    ]],[
    "css-tailwind", [
      // END: 2020css-tailwind
      // END: 2021css-tailwind
      // END: 2022css-tailwind
      // END: 2023css-tailwind
      // END: 2024css-tailwind
      "upgrading-to-tailwind-css-v4-a-migration-guide", // 2025-12-02
      // END: 2025css-tailwind
      // END: 2026css-tailwind
      // END: css-tailwind
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
      "stop-babysitting-claude-code", // 2026-03-28
      "you-dont-need-embeddings-for-rag", // 2025-04-02
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
      "deploy-your-typescript-website-on-github-pages", // 2025-10-27
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
      "hosting-on-heroku-with-a-custom-domain-and-ssl", // 2024-09-25
      // END: 2024heroku
      // END: 2025heroku
      // END: 2026heroku
      // END: heroku
    ]],[
    "postgresql", [
      "you-dont-need-embeddings-for-rag", // 2025-04-02
      // END: 2026postgresql
      // END: postgresql
    ]],[
    "vscode", [
      // END: 2019vscode
      // END: 2020vscode
      // END: 2021vscode
      // END: 2022vscode
      "improve-your-typescript-workflow-with-code-snippets", // 2023-12-11
      // END: 2023vscode
      // END: 2024vscode
      // END: 2025vscode
      "your-keyboard-is-obsolete-voice-coding-in-typescript", // 2026-02-12
      // END: 2026vscode
      // END: vscode
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
    "openai", [
      // END: 2021openai
      // END: 2022openai
      // END: 2023openai
      "module-openai-has-no-exported-member", // 2024-04-24
      "analyzing-pdfs-with-chatgpt-using-openais-vision-api", // 2024-08-20
      // END: 2024openai
      // END: 2025openai
      // END: 2026openai
      // END: openai
    ]],[
    "claude", [
      // END: 2019claude
      // END: 2020claude
      // END: 2021claude
      // END: 2022claude
      // END: 2023claude
      // END: 2024claude
      "from-rest-apis-to-mcp-the-future-of-ai-integration", // 2025-11-13
      // END: 2025claude
      "stop-babysitting-claude-code", // 2026-03-28
      "you-dont-need-embeddings-for-rag", // 2025-04-02
      // END: 2026claude
      // END: claude
    ]],[
    "mcp", [
      // END: 2019mcp
      // END: 2020mcp
      // END: 2021mcp
      // END: 2022mcp
      // END: 2023mcp
      // END: 2024mcp
      "from-rest-apis-to-mcp-the-future-of-ai-integration", // 2025-11-13
      // END: 2025mcp
      "you-dont-need-embeddings-for-rag", // 2025-04-02
      // END: 2026mcp
      // END: mcp
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