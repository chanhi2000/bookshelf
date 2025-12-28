import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2022: SidebarYeargroupTemplate = {
  text: '2022',
  collapsible: true,
  children: [
    // END: 2022
    "style-queries", // 2022-06-27
  ],
}

const Y2023: SidebarYeargroupTemplate = {
  text: '2023',
  collapsible: true,
  children: [
    // END: 2023
  ],
}

const Y2024: SidebarYeargroupTemplate = {
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
  ],
}

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
  ],
}

export const template: SidebarInfoTemplate = {
  name: "una.im",
  faviconPath: "https://una.im/favicon.svg",
  linksMap: new Map([
    [
    "js",[
      // END: 2021js
      // END: 2022js
      // END: 2023js
      // END: 2024js
      // END: 2025js
      // END: js
    ]],[
    "js-node",[
      // END: 2020js-node
      // END: 2021js-node
      // END: 2022js-node
      // END: 2023js-node
      // END: 2024js-node
      // END: 2025js-node
      // END: js-node
    ]],[
    "css",[
      // END: 2017css
      // END: 2018css
      // END: 2019css
      // END: 2020css
      // END: 2021css
      "style-queries", // 2022-06-27
      // END: 2022css
      // END: 2023css
      // END: 2024css
      // END: 2025css
      // END: css
    ]],[
    "all", [
      Y2025,
      Y2024,
      Y2023,
    ]]
  ])
}
