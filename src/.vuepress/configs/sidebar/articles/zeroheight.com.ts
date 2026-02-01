import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2026: SidebarYeargroupTemplate = {
  text: '2026',
  collapsible: true,
  children: [
    // END: 2026
    "5-accessibility-checks-to-run-on-every-component", // 2026-01-06
  ]
}

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
    "how-to-annotate-design-system-components-for-accessibility", // 2025-12-15
    "whats-the-european-accessibility-act-got-to-do-with-my-design-system", // 2025-08-05
  ]
}
const Y2024: SidebarYeargroupTemplate = {
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
  ]
}

export const template: SidebarInfoTemplate = {
  name: 'zeroheight.com',
  faviconPath: 'https://zeroheight.com/favicon.ico',
  linksMap: new Map([
    [
    "js", [
      // END: 2024js
      // END: 2025js
      // END: js
    ]],[
    "css", [
      // END: 2024css
      // END: 2025css
      // END: css
    ]],[
    "system-design", [
      // END: 2024design-system
      "whats-the-european-accessibility-act-got-to-do-with-my-design-system", // 2025-08-05
      "how-to-annotate-design-system-components-for-accessibility", // 2025-12-15
      // END: 2025design-system
      "5-accessibility-checks-to-run-on-every-component", // 2026-01-06
      // END: 2026design-system
      // END: design-system
    ]],[
    "all", [
      Y2026,
      Y2025,
      Y2024,
    ]]
  ])
}
