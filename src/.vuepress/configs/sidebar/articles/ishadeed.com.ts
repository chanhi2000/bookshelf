import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const CSS_CONTAINER_QUERY_GUIDE: SidebarInfoSubgroupTemplate = { // 2024-04-02
  text: 'An Interactive Guide to CSS Container Queries',
  collapsible: true,
  icon: 'fa-brands fa-css3-alt',
  subPath: 'css-container-query-guide',
  children: [
    'README',
    // TODO: 페이지 생성
  ]
}

const Y2026: SidebarYeargroupTemplate = {
  text: '2026',
  collapsible: true,
  children: [
    // END: 2026

  ]
}

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025

  ]
}

const Y2024: SidebarYeargroupTemplate = {
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
    CSS_CONTAINER_QUERY_GUIDE, // 2024-04-02
  ]
}

const Y2023: SidebarYeargroupTemplate = {
  text: '2023',
  collapsible: true,
  children: [
    // END: 2023
    "css-state-queries", // 2023-06-22
    "css-wishlist-2023", // 2023-02-09
  ]
}

const Y2022: SidebarYeargroupTemplate = {
  text: '2022',
  collapsible: true,
  children: [
    // END: 2022
    "cascade-layers", // 2022-02-11
  ]
}

const Y2021: SidebarYeargroupTemplate = {
  text: '2021',
  collapsible: true,
  children: [
    // END: 2021
    "say-hello-to-css-container-queries", // 2021-04-13
  ]
}

const Y2020: SidebarYeargroupTemplate = {
  text: '2020',
  collapsible: true,
  children: [
    // END: 2020
    "css-short-long-content", // 2020-12-16
  ]
}

const Y2019: SidebarYeargroupTemplate = {
  text: '2019',
  collapsible: true,
  children: [
    // END: 2019

  ]
}

const Y2018: SidebarYeargroupTemplate = {
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
}

const Y2016: SidebarYeargroupTemplate = {
  text: '2016',
  collapsible: true,
  children: [
    // END: 2016

  ]
}

export const template: SidebarInfoTemplate = {
  name: "ishadeed.com",
  faviconPath: "https://ishadeed.com/assets/favicon-32x32.png",
  linksMap: new Map([
    [
    "js",[
      // END: 2016js
      // END: 2017js
      // END: 2018js
      // END: 2019js
      // END: 2020js
      // END: 2021js
      // END: 2022js
      // END: 2023js
      // END: 2024js
      // END: 2025js
      // END: 2026js
      // END: js
    ]],[
    "js-node",[
      // END: 2016js-node
      // END: 2017js-node
      // END: 2018js-node
      // END: 2019js-node
      // END: 2020js-node
      // END: 2021js-node
      // END: 2022js-node
      // END: 2023js-node
      // END: 2024js-node
      // END: 2025js-node
      // END: 2026js-node
      // END: js-node
    ]],[
    "css",[
      // END: 2016css
      // END: 2017css
      // END: 2018css
      // END: 2019css
      "css-short-long-content", // 2020-12-16
      // END: 2020css
      "say-hello-to-css-container-queries", // 2021-04-13
      // END: 2021css
      "cascade-layers", // 2022-02-11
      // END: 2022css
      "css-wishlist-2023", // 2023-02-09
      "css-state-queries", // 2023-06-22
      // END: 2023css
      CSS_CONTAINER_QUERY_GUIDE, // 2024-04-02
      // END: 2024css
      // END: 2025css
      // END: 2026css
      // END: css
    ]],[
    "chrome",[
      // END: 2023chrome
      // END: 2024chrome
      // END: 2025chrome
      // END: 2026chrome
      // END: chrome
    ]],[
    "all", [
      Y2026,
      Y2025,
      Y2024,
      Y2023,
      Y2022,
      Y2021,
      Y2020,
      Y2019,
      Y2017,
      Y2016,
    ]]
  ])
}