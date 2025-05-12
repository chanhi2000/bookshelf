import { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
    "reduce-ram-cpu-usage-on-linux", // 2025-02-27
  ]
}

const Y2024: SidebarYeargroupTemplate = {
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
    "linux-terminal-file-managers", // 2024-09-10
    "clifm-fast-commandline-file-manager", // 2024-08-19
    "file-transfer-in-linux", // 2024-08-16
    "learn-use-awk-special-patterns-begin-and-end", // 2024-08-14
    "install-gcc-c-compiler-fedora", // 2024-08-13
    "install-c-c-compiler-and-development-tool-in-centos-fedora-redhat", // 2024-08-13
    "install-joomla-in-linux", // 2024-08-12
    "work-with-awk-variables-expressions-and-operators", // 2024-08-12
    "read-awk-input-from-stdin-in-linux", // 2024-08-12
    "sync-new-changed-modified-files-rsync-linux", // 2024-08-08
    "parrot-os-security-linux", // 2024-08-08
    "find-files-by-extension-in-linux", // 2024-08-07
    "use-next-command-with-awk-in-linux", // 2024-08-07
    "minify-css-and-js-files-linux", // 2024-08-01
    "home-media-streaming-server-using-plex-with-truenas", // 2024-07-31
    "configure-firewalld-rhel-rocky-almalinux", // 2024-07-30
  ]
}

const Y2023: SidebarYeargroupTemplate = {
  text: '2023',
  collapsible: true,
  children: [
    // END: 2023
    "whowatch-monitor-linux-users-and-processes-in-real-time", // 2023-07-14
    "mtr-a-network-diagnostic-tool-for-linux", // 2023-07-13
  ]
}

const Y2022: SidebarYeargroupTemplate = {
  text: '2022',
  collapsible: true,
  children: [
    // END: 2022
    "synchronize-time-with-ntp-in-linux", // 2022-11-15
    "install-security-updates-in-ubuntu", // 2022-02-07
    "create-nginx-server-blocks-in-centos", // 2022-02-07
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
    "bashtop-linux-resource-monitoring-tool", // 2020-08-07
    "install-windows-subsystem-for-linux", // 2020-09-18
  ]
}

export const template: SidebarInfoTemplate = {
  name: 'tecmint.com',
  faviconPath: 'https://tecmint.com/wp-content/uploads/2020/07/favicon.ico',
  linksMap: new Map([
    [
    "sh", [
      "bashtop-linux-resource-monitoring-tool", // 2020-08-07
      // END: 2020sh
      // END: 2021sh
      "create-nginx-server-blocks-in-centos", // 2022-02-07
      "install-security-updates-in-ubuntu", // 2022-02-07
      "synchronize-time-with-ntp-in-linux", // 2022-11-15
      // END: 2022sh
      "mtr-a-network-diagnostic-tool-for-linux", // 2023-07-13
      "whowatch-monitor-linux-users-and-processes-in-real-time", // 2023-07-14
      // END: 2023sh
      "configure-firewalld-rhel-rocky-almalinux", // 2024-07-30
      "use-next-command-with-awk-in-linux", // 2024-08-07
      "find-files-by-extension-in-linux", // 2024-08-07
      "sync-new-changed-modified-files-rsync-linux", // 2024-08-08
      "read-awk-input-from-stdin-in-linux", // 2024-08-12
      "work-with-awk-variables-expressions-and-operators", // 2024-08-12
      "install-joomla-in-linux", // 2024-08-12
      "install-c-c-compiler-and-development-tool-in-centos-fedora-redhat", // 2024-08-13
      "install-gcc-c-compiler-fedora", // 2024-08-13
      "learn-use-awk-special-patterns-begin-and-end", // 2024-08-14
      // END: 2024sh
      // END: sh
    ]],[
    "js-node", [
      "minify-css-and-js-files-linux", // 2024-08-01
      // END: 2024js-node
      // END: 2025js-node
      // END: js-node
    ]],[
    "win", [
      "install-windows-subsystem-for-linux", // 2020-09-18
      // END: 2020win
      // END: 2021win
      // END: 2022win
      // END: 2023win
      // END: 2024win
      // END: 2025win
      // END: win
    ]],[
    "linux-debian", [
      "bashtop-linux-resource-monitoring-tool", // 2020-08-07
      "install-windows-subsystem-for-linux", // 2020-09-18
      // END: 2020linux-debian
      // END: 2021linux-debian
      "install-security-updates-in-ubuntu", // 2022-02-07
      "synchronize-time-with-ntp-in-linux", // 2022-11-15
      // END: 2022linux-debian
      "mtr-a-network-diagnostic-tool-for-linux", // 2023-07-13
      "whowatch-monitor-linux-users-and-processes-in-real-time", // 2023-07-14
      // END: 2023linux-debian
      "home-media-streaming-server-using-plex-with-truenas", // 2024-07-31
      "parrot-os-security-linux", // 2024-08-08
      "clifm-fast-commandline-file-manager", // 2024-08-19
      "linux-terminal-file-managers", // 2024-09-10
      // END: 2024linux-debian
      "reduce-ram-cpu-usage-on-linux", // 2025-02-27
      // END: 2025linux-debian
      // END: linux-debian
    ]],[
    "linux-fedora", [
      "bashtop-linux-resource-monitoring-tool", // 2020-08-07
      // END: 2020linux-fedora
      // END: 2021linux-fedora
      "create-nginx-server-blocks-in-centos", // 2022-02-07
      "synchronize-time-with-ntp-in-linux", // 2022-11-15
      // END: 2022linux-fedora
      "mtr-a-network-diagnostic-tool-for-linux", // 2023-07-13
      "whowatch-monitor-linux-users-and-processes-in-real-time", // 2023-07-14
      // END: 2023linux-fedora
      "configure-firewalld-rhel-rocky-almalinux", // 2024-07-30
      "install-joomla-in-linux", // 2024-08-12
      "install-c-c-compiler-and-development-tool-in-centos-fedora-redhat", // 2024-08-13
      "install-gcc-c-compiler-fedora", // 2024-08-13
      "clifm-fast-commandline-file-manager", // 2024-08-19
      "linux-terminal-file-managers", // 2024-09-10
      // END: 2024linux-fedora
      "reduce-ram-cpu-usage-on-linux", // 2025-02-27
      // END: 2025linux-fedora
      // END: linux-fedora
    ]],[
    "nginx", [
      "create-nginx-server-blocks-in-centos", // 2022-02-07
      // END: 2022nginx
      // END: 2023nginx
      // END: 2024nginx
      // END: 2025nginx
      // END: nginx
    ]],[
    "awk", [
      "use-next-command-with-awk-in-linux", // 2024-08-07
      "read-awk-input-from-stdin-in-linux", // 2024-08-12
      "work-with-awk-variables-expressions-and-operators", // 2024-08-12
      "learn-use-awk-special-patterns-begin-and-end", // 2024-08-14
      // END: 2024awk
      // END: 2025awk
      // END: awk
    ]],[
    "rsync", [
      "file-transfer-in-linux", // 2024-08-16
      // END: 2024rsync
      // END: 2025rsync
      // END: rsync
    ]],[
    "all", [
      Y2025,
      Y2024,
      Y2023,
      Y2022,
      Y2021,
      Y2020,
    ]],
  ])
}