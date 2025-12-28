import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

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
    "104", // 2024-03-14
    "103", // 2024-02-25
    "102", // 2024-02-15
    "101", // 2024-01-31
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
  name: 'dev.gmarket.com',
  faviconPath: 'https://tistory2.daumcdn.net/tistory/4067742/3d398eb9d6e54c5f85163614e296d515',
  linksMap: new Map([
    [
    "java-spring", [
      "103", // 2024-02-25
      "104", // 2024-03-14
      // END: 2024java-spring
      // END: 2025java-spring
      // END: java-spring
    ]],[
    "js-react", [
      "101", // 2024-01-31
      // END: 2024js-react
      // END: 2025js-react
      // END: js-react
    ]],[
    "go", [
      "102", // 2024-02-15
      // END: 2024go
      // END: 2025go
      // END: go
    ]],[
    "k8s", [
      "102", // 2024-02-15
      // END: 2024k8s
      // END: 2025k8s
      // END: k8s
    ]],[
    "all", [
      Y2025,
      Y2024,
      Y2023,
      Y2022,
      Y2021,
      Y2020,
    ]],
  ])
}