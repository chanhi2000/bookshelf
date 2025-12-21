import { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2023: SidebarYeargroupTemplate = { 
  text: '2023',
  collapsible: true,
  children: [
    // END: 2023
    "how-a-minimum-viable-experience-produces-a-resilient-inclusive-end-product", // 2023-02-27
  ]
}

const Y2024: SidebarYeargroupTemplate = { 
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
    "styling-tables-the-modern-css-way", // 2024-07-18
    "its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is", // 2024-07-03
    "masonry-and-tabbing", // 2024-05-13
    "css-inheritance", // 2024-04-29
    "a-primer-on-the-cascade-and-specificity", // 2024-04-18
    "how-were-approaching-theming-with-modern-css", // 2024-04-02 
  ]
}

const Y2025: SidebarYeargroupTemplate = { 
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
    "some-practical-examples-of-view-transitions-to-elevate-your-ui", // 2025-11-06
    "start-implementing-view-transitions-on-your-websites-today", // 2025-10-28
    "nan-the-not-a-number-number-that-isnt-nan", // 2025-10-23
    "a-pragmatic-guide-to-modern-css-colours-part-one", // 2025-10-07
  ]
}

export const template: SidebarInfoTemplate = {
  name: 'piccalil.li',
  faviconPath: 'https://piccalil.li/favicons/apple-touch-icon.png',
  linksMap: new Map([
    [
    "js", [
      "nan-the-not-a-number-number-that-isnt-nan", // 2025-10-23
      // END: 2025js
      // END: js
    ]],[
    "css", [
      "how-a-minimum-viable-experience-produces-a-resilient-inclusive-end-product", // 2023-02-27
      // END: 2023css
      "how-were-approaching-theming-with-modern-css", // 2024-04-02 
      "a-primer-on-the-cascade-and-specificity", // 2024-04-18
      "css-inheritance", // 2024-04-29
      "masonry-and-tabbing", // 2024-05-13
      "its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is", // 2024-07-03
      "styling-tables-the-modern-css-way", // 2024-07-18
      // END: 2024css
      "a-workaround-for-using-custom-properties-in-media-queries", // 2025-10
      "a-pragmatic-guide-to-modern-css-colours-part-one", // 2025-10-07
      "start-implementing-view-transitions-on-your-websites-today", // 2025-10-28
      "some-practical-examples-of-view-transitions-to-elevate-your-ui", // 2025-11-06
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