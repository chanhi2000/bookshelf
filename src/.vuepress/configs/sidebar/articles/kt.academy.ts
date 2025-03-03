import { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
    "ak-compiler-plugin", // 2025-03-03
    "game-story-collection-processing-wasm", // 2025-01-20
    "modifier-order", // 2025-01-07
  ]
}

const Y2024: SidebarYeargroupTemplate = {
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
    "benchmark-reflection", // 2024-12-16
    "blockhound", // 2024-12-02
    "viewmodel-stateflow-sharedflow-channel", // 2024-11-18
    "dispatcher-for-backend", // 2024-11-13
    "cc-why", // 2024-10-09
    "ek-respect-contracts", // 2024-07-22
    "ek-contracts-documentation", // 2024-07-08
    "cc-dispatchers", // 2024-07-01
    "sharedflow-vs-stateflow", // 2024-06-27
    "ek-api-stability", // 2024-06-24
    "power-assert", // 2024-06-17
    "union-types-into", // 2024-06-10
    "var-readonly-vs-val-mutable", // 2024-06-10
    "network-client-threads", // 2024-05-13
    "ek-element-visibility", // 2024-05-06
    "ek-wrapping-api", // 2024-04-29
    "pattern-for-composing-flows", // 2024-04-18
    "nonblocking-spring-mvc", // 2024-03-25
    "kfde-generics", // 2024-03-18
    "cc-cancellation", // 2024-03-11
    "ak-static-analysis", // 2024-01-22
  ]
}

const Y2023: SidebarYeargroupTemplate = {
  text: '2023',
  collapsible: true,
  children: [
    // END: 2023
    "dispatcher-loom", // 2023-01-09
  ]
}

export const template: SidebarInfoTemplate = {
  name: 'kt.academy',
  faviconPath: 'https://kt.academy/logo.png',
  linksMap: new Map([
    [
    "kotlin", [
      "dispatcher-loom", // 2023-01-09
      // END: kotlin-2023
      "ak-static-analysis", // 2024-01-22
      "cc-cancellation", // 2024-03-11
      "kfde-generics", // 2024-03-18
      "pattern-for-composing-flows", // 2024-04-18
      "ek-element-visibility", // 2024-05-06
      "network-client-threads", // 2024-05-13
      "var-readonly-vs-val-mutable", // 2024-06-10
      "union-types-into", // 2024-06-10
      "power-assert", // 2024-06-17
      "ek-api-stability", // 2024-06-24
      "sharedflow-vs-stateflow", // 2024-06-27
      "cc-dispatchers", // 2024-07-01
      "ek-contracts-documentation", // 2024-07-08
      "ek-respect-contracts", // 2024-07-22
      "cc-why", // 2024-10-09
      "blockhound", // 2024-12-02
      "benchmark-reflection", // 2024-12-16
      // END: 2024kotlin
      "game-story-collection-processing-wasm", // 2025-01-20
      "ak-compiler-plugin", // 2025-03-03
      // END: 2025kotlin
      // END: kotlin
    ]],[
    "kotlin-spring", [
      "nonblocking-spring-mvc", // 2024-03-25
      "dispatcher-for-backend", // 2024-11-13
      // END: 2024kotlin-spring
      // END: 2025kotlin-spring
      // END: kotlin-spring
    ]],[
    "kotlin-android", [
      "ek-wrapping-api", // 2024-04-29
      "viewmodel-stateflow-sharedflow-channel", // 2024-11-18
      // END: 2024kotlin-android
      "modifier-order", // 2025-01-07
      // END: 2025kotlin-android
      // END: kotlin-android
    ]],[
    "all", [
      Y2025,
      Y2024,
      Y2023,
    ]]
  ])
}