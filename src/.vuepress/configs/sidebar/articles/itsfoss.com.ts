import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2020: SidebarYeargroupTemplate = {
  text: '2020',
  collapsible: true,
  children: [
    // END: 2020
    "things-to-do-after-installing-arch-linux", // 2020-06-01
    "add-multiple-time-zones-ubuntu", // 2020-04-12
    "change-timezone-ubuntu", // 2020-01-19
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
    "vim-vs-nano", // 2022-02-02
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
    "install-hyprland", // 2024-11-20
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
  name: 'itsfoss.com',
  faviconPath: 'https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png',
  linksMap: new Map([
    [
    "linux-debian", [
      "change-timezone-ubuntu", // 2020-01-19
      "add-multiple-time-zones-ubuntu", // 2020-04-12
      // END: 2020linux-debian
      // END: 2021linux-debian
      // END: 2022linux-debian
      // END: 2023linux-debian
      // END: 2024linux-debian
      // END: linux-debian
    ]],[
    "linux-fedora", [
      // END: 2020linux-fedora
      // END: 2021linux-fedora
      // END: 2022linux-fedora
      // END: 2023linux-fedora
      // END: 2024linux-fedora
      // END: linux-fedora
    ]],[
    "linux-arch", [
      "install-arch-linux", // 2017-12-12
      // END: 2017linux-arch
      "things-to-do-after-installing-arch-linux", // 2020-06-01
      // END: 2020linux-arch
      "why-arch-linux",
    ]],[
    "hyprland", [
      "install-hyprland", // 2024-11-20
    ]],[
    "vim", [
      "pro-vim-tips", // 2017-03-29
      // END: 2017vim
      "vim-vs-nano", // 2022-02-02
      // END: 2022vim
      // END: 2023vim
      // END: 2024vim
      // END: 2025vim
      // END: vim
    ]],[
    "all", [
      "pro-vim-tips", // 2017-03-29
      "install-arch-linux", // 2017-12-12
      // END: 2017
      // END: 2018
      // END: 2019
      Y2020,
      Y2021,
      Y2022,
      Y2023,
      Y2024,
      Y2025,
      // END: 2024
    ]]
  ])
}