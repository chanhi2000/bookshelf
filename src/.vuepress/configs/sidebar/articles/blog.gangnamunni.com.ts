import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2019: SidebarYeargroupTemplate = {
  text: '2019',
  collapsible: true,
  children: [
    // END: 2019
    "motionlayout", // 2019-12-03
    "spring-async-hibernate-db", // 2019-09-03
    "arrays-arraylist-arraylist", // 2019-09-01
    "coroutine-basic", // 2019-08-20
    "swiftui-combine-quick-look", // 2019-07-29
    "privacy-changes-in-android-q-2", // 2019-07-02
    "privacy-changes-in-android-q-1", // 2019-07-01
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
    "dependency-inversion-principle", // 2021-08-19
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
    "saas-event-sourcing", // 2024-03-18
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
  name: 'blog.gangnamunni.com',
  faviconPath: 'https://blog.gangnamunni.com/favicon.ico',
  linksMap: new Map([
    [
    "swift", [
      "swiftui-combine-quick-look", // 2019-07-29
      // END: 2019swift
      // END: 2020swift
      // END: 2021swift
      // END: 2022swift
      // END: 2023swift
      // END: 2024swift
      // END: swift
    ]],[
    "java", [
      "arrays-arraylist-arraylist", // 2019-09-01
      // END: 2019java
      // END: 2020java
      // END: 2021java
      // END: 2022java
      // END: 2023java
      // END: 2024java
      // END: java
    ]],[
    "kotlin", [
      "coroutine-basic", // 2019-08-20
      // END: 2019kotlin
      // END: 2020kotlin
      // END: 2021kotlin
      // END: 2022kotlin
      // END: 2023kotlin
      // END: 2024kotlin
      // END: kotlin
    ]],[
    "java-spring", [
      "spring-async-hibernate-db", // 2019-09-03
      // END: 2019java-spring
      // END: 2020java-spring
      "dependency-inversion-principle", // 2021-08-19
      // END: 2021java-spring
      // END: 2022java-spring
      // END: 2023java-spring
      "saas-event-sourcing", // 2024-03-18
      // END: 2024java-spring
      // END: java-spring
    ]],[
    "java-android", [
      "privacy-changes-in-android-q-1", // 2019-07-01
      "privacy-changes-in-android-q-2", // 2019-07-02
      "motionlayout", // 2019-12-03
      // END: 2019java-android
      // END: 2020java-android
      // END: 2021java-android
      // END: 2022java-android
      // END: 2023java-android
      // END: 2024java-android
      // END: java-android
    ]],[
    "all", [
      Y2025,
      Y2024,
      Y2023,
      Y2022,
      Y2021,
      Y2020,
      Y2019,
    ]]
  ])
}