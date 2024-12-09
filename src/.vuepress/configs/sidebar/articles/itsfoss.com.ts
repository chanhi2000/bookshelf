import { SidebarInfoTemplate } from ".";

export const template: SidebarInfoTemplate = {
  name: 'itsfoss.com',
  faviconPath: 'https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png',
  linksMap: new Map([
    [
    "linux-debian", [
    ]],[
    "linux-fedora", [
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
    ]],[
    "all", [
      "pro-vim-tips", // 2017-03-29
      "install-arch-linux", // 2017-12-12
      // END: 2017
      // END: 2018
      // END: 2019
      "things-to-do-after-installing-arch-linux", // 2020-06-01
      // END: 2020
      // END: 2021
      "vim-vs-nano", // 2022-02-02
      // END: 2022
      // END: 2023
      "install-hyprland", // 2024-11-20
      // END: 2024
    ]]
  ])
}