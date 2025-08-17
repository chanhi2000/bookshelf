import { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
    "streamlining-sharepoint-site-and-group-data-extraction-using-pnp-powershell", // 2025-08-19
  ]
}

const Y2024: SidebarYeargroupTemplate = {
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
  ]
}

const Y2023: SidebarYeargroupTemplate = {
  text: '2023',
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
    "how-to-addedit-path-environment-variable-in-windows-11", // 2022-02-21
  ]
}

const Y2021: SidebarYeargroupTemplate = {
  text: '2021',
  collapsible: true,
  children: [
    // END: 2021
  ]
}

const Y2020: SidebarYeargroupTemplate = {
  text: '2020',
  collapsible: true,
  children: [
    // END: 2020
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

export const template: SidebarInfoTemplate = {
  name: "c-sharpcorner.com",
  faviconPath: "https://c-sharpcorner.com/images/layout/favicon-icon-dark.svg",
  linksMap: new Map([
    [
    "cs", [
      // END: 2024cs
      // END: 2025cs
      // END: cs
    ]],[
    "pwsh", [
      // END: 2024pwsh
      "streamlining-sharepoint-site-and-group-data-extraction-using-pnp-powershell", // 2025-08-19
      // END: 2025pwsh
      // END: pwsh
    ]],[
    "win", [
      "how-to-addedit-path-environment-variable-in-windows-11", // 2022-02-21
      // END: 2022win
      // END: 2023win
      // END: 2024win
      // END: 2025win
      // END: win
    ]],[
    "sharepoint", [
      "streamlining-sharepoint-site-and-group-data-extraction-using-pnp-powershell", // 2025-08-19
      // END: 2025sharepoint
      // END: sharepoint
    ]],[
    "all", [
      Y2025,
      Y2024,
      Y2023,
      Y2022,
      Y2021,
      Y2020,
      Y2019,
      Y2018,
      Y2017,
    ]]
  ])
}