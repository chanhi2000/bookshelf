import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2026: SidebarYeargroupTemplate = {
  text: '2026',
  collapsible: true,
  children: [
    // END: 2026
    "linux-storage-deep-dive-lvm-mdadm-and-zfs-raid", // 2026-06-26
    "kubernetes-at-home-k3s-on-a-single-linux-server", // 2026-06-23
    "linux-backup-bible-timeshift-rsync-borg-restic", // 2026-06-23
  ]
}

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
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
    "vim-vs-nano", // 2022-02-02
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

export const template: SidebarInfoTemplate = {
  name: 'fosslinux.com',
  faviconPath: 'https://fosslinux.com/favicon.ico',
  linksMap: new Map([
    [
    "k8s", [
      // END: 2020lk8s
      // END: 2021lk8s
      // END: 2022lk8s
      // END: 2023lk8s
      // END: 2024lk8s
      // END: 2025lk8s
      "kubernetes-at-home-k3s-on-a-single-linux-server", // 2026-06-23
      // END: 2026lk8s
      // END: lk8s
    ]],[
    "linux-debian", [
      // END: 2020linux-debian
      // END: 2021linux-debian
      // END: 2022linux-debian
      // END: 2023linux-debian
      // END: 2024linux-debian
      // END: 2025linux-debian
      "linux-backup-bible-timeshift-rsync-borg-restic", // 2026-06-23
      // END: 2026linux-debian
      // END: linux-debian
    ]],[
    "linux-fedora", [
      // END: 2020linux-fedora
      // END: 2021linux-fedora
      // END: 2022linux-fedora
      // END: 2023linux-fedora
      // END: 2024linux-fedora
      // END: 2025linux-fedora
      "linux-backup-bible-timeshift-rsync-borg-restic", // 2026-06-23
      "linux-storage-deep-dive-lvm-mdadm-and-zfs-raid", // 2026-06-26
      // END: 2026linux-fedora
      // END: linux-fedora
    ]],[
    "linux-arch", [
      // END: 2017linux-arch
      // END: 2018linux-arch
      // END: 2019linux-arch
      // END: 2020linux-arch
      // END: 2021linux-arch
      // END: 2022linux-arch
      // END: 2023linux-arch
      // END: 2024linux-arch
      // END: 2025linux-arch
      "linux-backup-bible-timeshift-rsync-borg-restic", // 2026-06-23
      // END: 2026linux-arch
      // END: linux-arch
    ]],[
    "hyprland", [
      // END: 2017hyprland
      // END: 2018hyprland
      // END: 2019hyprland
      // END: 2020hyprland
      // END: 2021hyprland
      // END: 2022hyprland
      // END: 2023hyprland
      // END: 2024hyprland
      // END: 2025hyprland
      // END: 2026hyprland
      // END: hyprland
    ]],[
    "vim", [
      // END: 2017vim
      // END: 2018hyprland
      // END: 2019hyprland
      // END: 2020hyprland
      // END: 2021hyprland
      // END: 2022vim
      // END: 2023vim
      // END: 2024vim
      // END: 2025vim
      // END: vim
    ]],[
    "all", [
      Y2026,
      Y2025,
      Y2024,
      Y2023,
      Y2022,
      Y2021,
      Y2020,
    ]]
  ])
}