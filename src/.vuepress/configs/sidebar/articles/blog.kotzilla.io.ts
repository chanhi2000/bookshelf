import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

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
    "koin-plugin-configuration-tree", // 2024-12-09
    "debugging-kotlin-apps", // 2024-12-04
    "koin-ide-plugin", // 2024-11-19
    "koin-annotations-1.4-in-compose-multiplatform", // 2024-10-17
    'migrate-from-hilt-to-koin', // 2024-07-23
    'lazy-modules-in-kotlin-with-koin', // 2024-04-16
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
  name: 'blog.kotzilla.io',
  faviconPath: 'https://blog.kotzilla.io/hubfs/favicon.png',
  linksMap: new Map([
    [
    "java", [
      // END: 2020java
      // END: 2021java
      // END: 2022java
      // END: 2023java
      // END: 2024java
      // END: 2025java
      // END: java
    ]],[
    "kotlin-android", [
      'lazy-modules-in-kotlin-with-koin', // 2024-04-16
      'migrate-from-hilt-to-koin', // 2024-07-23
      "koin-annotations-1.4-in-compose-multiplatform", // 2024-10-17
      "koin-ide-plugin", // 2024-11-19
      "debugging-kotlin-apps", // 2024-12-04
      "koin-plugin-configuration-tree", // 2024-12-09
      // END: 2024kotlin-android
      // END: 2025kotlin-android
      // END: kotlin-android
    ]],[
    "all", [
      Y2025,
      Y2024,
      Y2023,
      Y2022,
      Y2021,
      Y2020,
    ]],
  ]),
}