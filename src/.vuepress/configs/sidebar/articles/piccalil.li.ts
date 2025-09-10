import { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2024: SidebarYeargroupTemplate = { 
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
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
  ]
}

export const template: SidebarInfoTemplate = {
  name: 'piccalil.li',
  faviconPath: 'https://piccalil.li/favicons/apple-touch-icon.png',
  linksMap: new Map([
    [
    "css", [
      "how-were-approaching-theming-with-modern-css", // 2024-04-02 
      "a-primer-on-the-cascade-and-specificity", // 2024-04-18
      "css-inheritance", // 2024-04-29
      "masonry-and-tabbing", // 2024-05-13
      // END: 2024css
      // END: css
    ]],[
    "all", [
      Y2025,
      Y2024,
    ]]
  ])
}