import { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";


const Y2020: SidebarYeargroupTemplate = {
  text: '2020',
  collapsible: true,
  children: [
    // END: 2020
    "2663", // 2020-02-06
  ]
}

const Y2021: SidebarYeargroupTemplate = {
  text: '2021',
  collapsible: true,
  children: [
    // END: 2023
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
    "17911", // 2024-06-25
    "17710", // 2024-06-07
    "17221", // 2024-04-30
    "15903", // 2024-04-24
    "17081", // 2024-04-16
    "16021", // 2024-03-26
    "16044", // 2024-03-21
    "15883", // 2024-03-19
    "16910", // 2024-03-09
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
  name: 'techblog.woowahan.com',
  faviconPath: 'https://techblog.woowahan.com/wp-content/uploads/2020/08/favicon.ico',
  linksMap: new Map([
    [
    "java-spring", [
      "2663", // 2020.02.06
      "17221", // 2024-04-30
      // END: 2024java-spring
      // END: 2025java-spring
      // END: java-spring
    ]],[
    "js-node", [
      "17710", // 2024-06-07
      // END: 2024js-node
      // END: 2025js-node
      // END: js-node
    ]],[
    "js-react", [
      "15883", // 2024-03-19
      "16021", // 2024-03-26
      // END: 2024js-react
      // END: 2025js-react
      // END: js-react
    ]],[
    "js-playwright", [
      "17081", // 2024-04-16
      // END: 2024js-playwright
      // END: js-playwright
    ]],[
    "npm", [
      "16910", // 2024-03-09
      "15903", // 2024-04-24
      // END: 2024npm
      // END: npm
    ]],[
    "git", [
      "16044", // 2024-03-21
      // END: 2024git
      // END: git
    ]],[
    "system-design", [
      "17911", // 2024-06-25
      // END: 2024system-design
      // END: 2025system-design
      // END: system-design
    ]],[
    "openai", [
      "16044", // 2024-03-21
      // END: 2024openai
      // END: openai
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