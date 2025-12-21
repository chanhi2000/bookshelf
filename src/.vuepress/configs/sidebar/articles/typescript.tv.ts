import { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";


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
  name: 'typescript.tv',
  faviconPath: 'https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png',
  linksMap: new Map([
    [
    "sh", [
      // END: 2025sh
      // END: sh
    ]],[
    "js-node", [
      // END: 2025js-node
      // END: js-node
    ]],[
    "ts", [
      // END: 2025ts
      // END: ts
    ]],[
    "all", [
      Y2025,
      Y2024,
    ]],
  ])
}