import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2026: SidebarYeargroupTemplate = {
  text: '2026',
  collapsible: true,
  children: [
    // END: 2026
  ],
}

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
  ],
}

const Y2024: SidebarYeargroupTemplate = {
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
  ],
}

const Y2023: SidebarYeargroupTemplate = {
  text: '2023',
  collapsible: true,
  children: [
    // END: 2023
    "css-subgrid", // 2023-09-28
  ],
}

const Y2022: SidebarYeargroupTemplate = {
  text: '2022',
  collapsible: true,
  children: [
    // END: 2022
    "css-individual-transform-properties", // 2022-08-02
  ],
}

const Y2021: SidebarYeargroupTemplate = {
  text: '2021',
  collapsible: true,
  children: [
    // END: 2021
  ],
}

const Y2020: SidebarYeargroupTemplate = {
  text: '2020',
  collapsible: true,
  children: [
    // END: 2020
  ],
}

const Y2019: SidebarYeargroupTemplate = {
  text: '2019',
  collapsible: true,
  children: [
    // END: 2019
    "link-prefetch", // 2019-09-12
    "adaptive-serving-based-on-network-quality", // 2019-05-06
  ],
}

const Y2018: SidebarYeargroupTemplate = {
  text: '2018',
  collapsible: true,
  children: [
    // END: 2018
    "apply-instant-loading-with-prpl", // 2018-11-05
    "workbox", // 2018-11-05
  ],
}

export const template: SidebarInfoTemplate = {
  name: "web.dev",
  faviconPath: "https://gstatic.com/devrel-devsite/prod/v579073a50c63499824df5a68b8922367066583d283ef78fdade1028efdb4ceb5/web/images/touchicon-180.png",
  linksMap: new Map([
    [
    "js",[
      // END: 2017js
      // END: 2018js
      "adaptive-serving-based-on-network-quality", // 2019-05-06
      "link-prefetch", // 2019-09-12
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
      // END: 2017css
      "workbox", // 2018-11-05
      "apply-instant-loading-with-prpl", // 2018-11-05
      // END: 2018css
      "link-prefetch", // 2019-09-12
      // END: 2019css
      // END: 2020css
      // END: 2021css
      "css-individual-transform-properties", // 2022-08-02
      // END: 2022css
      "css-subgrid", // 2023-09-28
      // END: 2023css
      // END: 2024css
      // END: 2025css
      // END: 2026css
      // END: css
    ]],[
    "chrome",[
      // END: 2017chrome
      // END: 2018chrome
      "adaptive-serving-based-on-network-quality", // 2019-05-06
      // END: 2019chrome
      // END: 2020chrome
      // END: 2021chrome
      // END: 2022chrome
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
      Y2018,
    ]]
  ])
}
