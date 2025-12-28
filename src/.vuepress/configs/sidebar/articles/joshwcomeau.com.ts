import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const CSS: SidebarYeargroupTemplate = {
  text: 'CSS',
  collapsible: true,
  children: [
    // END: CSS
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
  name: 'joshwcomeau.com',
  faviconPath: 'https://joshwcomeau.com/favicon.png',
  linksMap: new Map([
    [
    "js", [
      // END: js
    ]],[
    "js-node", [
      // END: js-node
    ]],[
    "js-react", [
      // END: js-react
    ]],[
    "css", [
      // END: css
    ]],[
    "all", [
      Y2025,
      Y2024,
      Y2023,
    ]],
  ])
}