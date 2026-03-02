import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2016: SidebarYeargroupTemplate = {
  text: '2016',
  collapsible: true,
  children: [
    // END: 2016
  ]
}

const Y2017: SidebarYeargroupTemplate = {
  text: '2017',
  collapsible: true,
  children: [
    // END: 2017
  ]
}

const Y2018: SidebarYeargroupTemplate = {
  text: '2018',
  collapsible: true,
  children: [
    // END: 2018
  ]
}

const Y2019: SidebarYeargroupTemplate = {
  text: '2019',
  collapsible: true,
  children: [
    // END: 2019
  ]
}

const Y2020: SidebarYeargroupTemplate = {
  text: '2020',
  collapsible: true,
  children: [
    // END: 2020
  ]
}

const Y2021: SidebarYeargroupTemplate = {
  text: '2021',
  collapsible: true,
  children: [
    // END: 2021
  ]
}

const Y2022: SidebarYeargroupTemplate = {
  text: '2022',
  collapsible: true,
  children: [
    // END: 2022
  ]
}

const Y2023: SidebarYeargroupTemplate = {
  text: '2023',
  collapsible: true,
  children: [
    // END: 2023
  ]
}

const Y2024: SidebarYeargroupTemplate = {
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
    "bigquery-gemini-review", // 2024-07-25
    "commit-mvcc-set-autocommit", // 2024-06-13
    "cart-recommend-model-development-second", // 2024-05-27
    "cart-recommend-model-development", // 2024-05-20
  ]
}

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
  ]
}

export const template: SidebarInfoTemplate = {
    name: 'helloworld.kurly.com',
    faviconPath: 'https://helloworld.kurly.com/assets/logo/ico_192.png',
    linksMap: new Map([
    [
    "java-spring", [
      // END: 2022java-spring
      // END: 2023java-spring
      "commit-mvcc-set-autocommit", // 2024-06-13
      // END: 2024java-spring
      // END: 2025java-spring
      // END: 2026java-spring
      // END: java-spring
    ]],[
    "k8s", [
      // END: 2022k8s
      // END: 2023k8s
      "cart-recommend-model-development-second", // 2024-05-27
      // END: 2024k8s
      // END: 2025k8s
      // END: 2026k8s
      // END: k8s
    ]],[
    "gcp", [
      // END: 2022gcp
      // END: 2023gcp
      "bigquery-gemini-review", // 2024-07-25
      // END: 2024gcp
      // END: 2025gcp
      // END: 2026gcp
      // END: gcp
    ]],[
    "system-design", [
      // END: 2022system-design
      // END: 2023system-design
      "cart-recommend-model-development", // 2024-05-20
      "cart-recommend-model-development-second", // 2024-05-27
      // END: 2024system-design
      // END: 2025system-design
      // END: 2026system-design
      // END: system-design
    ]],[
    "llm", [
      // END: 2022llm
      // END: 2023llm
      "cart-recommend-model-development", // 2024-05-20
      // END: 2024llm
      // END: 2025llm
      // END: 2026llm
      // END: llm
    ]],[
    "gemini", [
      // END: 2022gemini
      // END: 2023gemini
      "bigquery-gemini-review", // 2024-07-25
      // END: 2024gemini
      // END: 2025gemini
      // END: 2026gemini
      // END: gemini
    ]],[
    "all", [
      Y2025,
      Y2024,
    ]],
  ]),
}