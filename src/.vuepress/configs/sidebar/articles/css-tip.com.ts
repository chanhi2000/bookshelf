import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2021: SidebarYeargroupTemplate = {
  text: '2021',
  collapsible: true,
  children: [
    // END: 2021
    "center-max-width", // 2021-12-10
    "multi-line-text-decoration", // 2021-11-30
    "dashed-rounded-border", // 2021-11-25
  ]
}
const Y2022: SidebarYeargroupTemplate = {
  text: '2022',
  collapsible: true,
  children: [
    // END: 2022
    "number-elements-has-selector", // 2022-10-10
    "overflowing-background", // 2022-06-09
    "matrix-image", // 2022-01-02
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
    "overflow-detection", // 2024-12-18
    "border-only-breadcrumb", // 2024-12-05
    "full-bleed-layout", // 2024-11-26
    "steps", // 2024-11-18
    "one-color-gradient", // 2024-10-21
    "initial-containing-block", // 2024-09-30
    "quantity-queries", // 2024-08-26
    "line-rounded-dashes", // 2024-08-15
    "arc-shape", // 2024-08-07
    "element-dimension", // 2024-07-26
    "min-max", // 2024-02-06
  ]
}

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
    "fizz-buzz", // 2025-12-06
    "position-area", // 2025-10-15
    "sequential-animations", // 2025-08-07
    "images-circle", // 2025-07-17
    "element-index", // 2025-07-10
    "hexagon", // 2025-06-12
    "safe-align", // 2025-06-10
    "inline-if", // 2025-06-02
    "broken-image", // 2025-05-22
    "svg-to-css", // 2025-05-12
    "blob-hover", // 2025-04-29
    "arrow-like-box", // 2025-04-22
    "rounded-polygon", // 2025-04-17
    "rounded-hexagon", // 2025-04-16
    "flex-wrap", // 2025-04-14
    "custom-progress", // 2025-03-25
  ]
}

export const template: SidebarInfoTemplate = {
  name: "css-tip.com",
  faviconPath: "https://css-tip.com/img/fav.png",
  linksMap: new Map([
    [
    "css",[
      // END: 2020css
      "dashed-rounded-border", // 2021-11-25
      "multi-line-text-decoration", // 2021-11-30
      "center-max-width", // 2021-12-10
      // END: 2021css
      "matrix-image", // 2022-01-02
      "overflowing-background", // 2022-06-09
      "number-elements-has-selector", // 2022-10-10
      // END: 2022css
      // END: 2023css
      "min-max", // 2024-02-06
      "element-dimension", // 2024-07-26
      "arc-shape", // 2024-08-07
      "line-rounded-dashes", // 2024-08-15
      "quantity-queries", // 2024-08-26
      "initial-containing-block", // 2024-09-30
      "one-color-gradient", // 2024-10-21
      "steps", // 2024-11-18
      "full-bleed-layout", // 2024-11-26
      "border-only-breadcrumb", // 2024-12-05
      "overflow-detection", // 2024-12-18
      // END: 2024css
      "custom-progress", // 2025-03-25
      "flex-wrap", // 2025-04-14
      "rounded-hexagon", // 2025-04-16
      "rounded-polygon", // 2025-04-17
      "arrow-like-box", // 2025-04-22
      "blob-hover", // 2025-04-29
      "svg-to-css", // 2025-05-12
      "broken-image", // 2025-05-22
      "inline-if", // 2025-06-02
      "safe-align", // 2025-06-10
      "hexagon", // 2025-06-12
      "element-index", // 2025-07-10
      "images-circle", // 2025-07-17
      "sequential-animations", // 2025-08-07
      "position-area", // 2025-10-15
      "fizz-buzz", // 2025-12-06
      // END: 2025css
      // END: css
    ]],[
    "all", [
      Y2025,
      Y2024,
      Y2023,
      Y2022,
      Y2021,
    ]]
  ])
}