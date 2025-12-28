import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

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
    "adjust-perceived-typepace-weight-for-dark-mode-without-layout-shift", // 2025-11-30
  ]
}

export const template: SidebarInfoTemplate = {
  name: 'nerdy.dev',
  faviconPath: 'https://nerdy.dev/favicon.svg',
  linksMap: new Map([
    [
    "js", [
      // END: 2024js
      // END: 2025js
      // END: js
    ]],[
    "css", [
      // END: 2024css
      "adjust-perceived-typepace-weight-for-dark-mode-without-layout-shift", // 2025-11-30
      // END: 2025css
      // END: css
    ]],[
    "all", [
      Y2026,
      Y2025,
    ]]
  ])
}
