import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2016: SidebarYeargroupTemplate = {
  text: '2016',
  collapsible: true,
  children: [
    // END: 2016
  ]
}

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
  name: 'popit.kr',
  faviconPath: 'https://popit.kr/wp-content/uploads/2016/08/favicon_32x32.png',
  linksMap: new Map([
    [
    "java", [
      "java-vs-go-1", // 2018-02-22
    ]],[
    "java-kafka", [
      "about-kraft-kafkas-new-consensus-protocol-1", // 2024.03.26
      "about-kraft-kafkas-new-consensus-protocol-2", // 2024.03.29
    ]],[
    "java-elasticsearch", [
      "elastic-keyword-field-ignore-above", // 2023.10.12
      "data-visualization-easy-peasy", // 2024.04.13
    ]],[
    "go", [
      "java-vs-go-1", // 2018-02-22
      "apply-etag-cache-to-rest-service-made-with-go", // 2023.02.08
    ]],[
    "spark", [
      "spark-text-data-source-supports-only-a-single-column-and-you-have-2-columns-error", // 2024.01.12
    ]],[
    "all", [ 
      "java-vs-go-1", // 2018-02-22
      "apply-etag-cache-to-rest-service-made-with-go", // 2023.02.08
      "elastic-keyword-field-ignore-above", // 2023.10.12
      "spark-text-data-source-supports-only-a-single-column-and-you-have-2-columns-error", // 2024.01.12
      "about-kraft-kafkas-new-consensus-protocol-1", // 2024.03.26
      "about-kraft-kafkas-new-consensus-protocol-2", // 2024.03.29
      "data-visualization-easy-peasy", // 2024.04.13
    ]]
  ])
}