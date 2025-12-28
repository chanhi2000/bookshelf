import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2020: SidebarYeargroupTemplate = {
  text: '2020',
  collapsible: true,
  children: [
    // END: 2020
    "loadtesting2", // 2020-10-14
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
  name: 'blog.imqa.io',
  faviconPath: 'https://blog.imqa.io/favicon.png',
  linksMap: new Map([
    [
    "jmeter", [
      "loadtesting2", // 2020-10-14
      // END: 2020jmeter
      // END: 2021jmeter
      // END: 2022jmeter
      // END: 2023jmeter
      // END: 2024jmeter
      // END: jmeter
    ]],[
    "gatling", [
      "loadtesting2", // 2020-10-14
      // END: 2020gatling
      // END: 2021gatling
      // END: 2022gatling
      // END: 2023gatling
      // END: 2024gatling
      // END: gatling
    ]],[
    "all", [
      Y2025,
      Y2024,
      Y2024,
      Y2022,
      Y2021,
      Y2020,
    ]]
  ])
}