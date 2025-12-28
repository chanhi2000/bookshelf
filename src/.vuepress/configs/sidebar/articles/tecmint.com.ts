import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
    "install-postgresql-on-ubuntu", // 2025-10-15
    "best-linux-init-systems", // 2025-10-13
    "linux-command-line-tools-data-scientists", // 2025-10-09
    "introduction-to-makefiles-gnu-make", // 2025-10-08
    "mysql-database-interview-linux", // 2025-10-07
    "ssh-security-linux-tips", // 2025-10-06
    "find-and-delete-duplicate-files-in-linux", // 2025-10-01
    "linux-kernel-boot-time-parameters-explained", // 2025-09-30
    "unison-file-synchronizer-linux", // 2025-09-23
    "su-vs-sudo-and-how-to-configure-sudo-in-linux", // 2025-09-22
    "backup-restore-ubuntu-packages-dpkg", // 2025-09-19
    "install-cpanel-whm-almalinux", // 2025-09-18
    "monitor-disk-usage-bash-script", // 2025-09-17
    "upgrade-linux-mint", // 2025-09-15
    "increase-root-partition-linux", // 2025-09-11
    "best-ubuntu-gnome-extensions", // 2025-09-09
    "command-line-tools-to-monitor-linux-performance", // 2025-09-08
    "asciinema-record-terminal-sessions-in-linux", // 2025-09-06
    "check-command-exit-status-in-linux", // 2025-09-05
    "find-my-dns-server-ip-address-in-linux", // 2025-09-05
    "best-free-open-source-software", // 2025-09-04
    "install-zip-and-unzip-in-linux", // 2025-09-02
    "list-all-running-services-under-systemd-in-linux", // 2025-09-02
    "create-alias-in-linux", // 2025-07-29
    "sftp-command-examples", // 2025-07-29
    "linux-bootable-usb-creators", // 2025-07-29
    "install-dig-and-nslookup-in-linux", // 2025-07-28
    "clear-ram-memory-cache-buffer-and-swap-space-on-linux", // 2025-07-25
    "linux-networking-commands", // 2025-07-23
    "setup-local-repositories-in-ubuntu", // 2025-07-22
    "mkcert-create-ssl-certs-for-local-development", // 2025-07-21
    "edit-configuration-files-using-sed-and-awk", // 2025-07-17
    "sudo-insult-when-enter-wrong-password", // 2025-07-16
    "ssh-two-factor-authentication", // 2025-07-16
    "linux-services-and-daemons", // 2025-07-14
    "core-linux-interview-questions-and-answers", // 2025-07-10
    "best-linux-ocr-tools", // 2025-07-08
    "10-lesser-known-useful-linux-commands-part-v", // 2025-07-02
    "linux-interview-questions-and-answers-for-linux-beginners", // 2025-07-01
    "atop-linux-performance-monitoring", // 2025-06-30
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
      "edit-configuration-files-using-sed-and-awk", // 2025-07-17
      "linux-networking-commands", // 2025-07-23
      "clear-ram-memory-cache-buffer-and-swap-space-on-linux", // 2025-07-25
      "install-dig-and-nslookup-in-linux", // 2025-07-28
      "sftp-command-examples", // 2025-07-29
      "create-alias-in-linux", // 2025-07-30
      "install-zip-and-unzip-in-linux", // 2025-09-02
      "check-command-exit-status-in-linux", // 2025-09-05
      "asciinema-record-terminal-sessions-in-linux", // 2025-09-06
      "command-line-tools-to-monitor-linux-performance", // 2025-09-08
      "increase-root-partition-linux", // 2025-09-11
      "monitor-disk-usage-bash-script", // 2025-09-17
      "su-vs-sudo-and-how-to-configure-sudo-in-linux", // 2025-09-22
      "unison-file-synchronizer-linux", // 2025-09-23
      "find-and-delete-duplicate-files-in-linux", // 2025-10-01
      "ssh-security-linux-tips", // 2025-10-06
      "best-linux-init-systems", // 2025-10-13
      // END: 2025sh
      // END: sh
    ]],[
    "sh-make", [
      "introduction-to-makefiles-gnu-make", // 2025-10-08
      // END: 2025sh-make
      // END: sh-make
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
      "atop-linux-performance-monitoring", // 2025-06-30
      "linux-interview-questions-and-answers-for-linux-beginners", // 2025-07-01
      "10-lesser-known-useful-linux-commands-part-v", // 2025-07-02
      "best-linux-ocr-tools", // 2025-07-08
      "core-linux-interview-questions-and-answers", // 2025-07-10
      "linux-services-and-daemons", // 2025-07-14
      "ssh-two-factor-authentication", // 2025-07-16
      "sudo-insult-when-enter-wrong-password", // 2025-07-16
      "setup-local-repositories-in-ubuntu", // 2025-07-22
      "linux-bootable-usb-creators", // 2025-07-29
      "create-alias-in-linux", // 2025-07-30
      "list-all-running-services-under-systemd-in-linux", // 2025-09-02
      "install-zip-and-unzip-in-linux", // 2025-09-02
      "find-my-dns-server-ip-address-in-linux", // 2025-09-05
      "best-ubuntu-gnome-extensions", // 2025-09-09
      "upgrade-linux-mint", // 2025-09-15
      "monitor-disk-usage-bash-script", // 2025-09-17
      "unison-file-synchronizer-linux", // 2025-09-23
      "find-and-delete-duplicate-files-in-linux", // 2025-10-01
      "install-postgresql-on-ubuntu", // 2025-10-15
      "backup-restore-ubuntu-packages-dpkg", // 2025-09-19
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
      "atop-linux-performance-monitoring", // 2025-06-30
      "linux-interview-questions-and-answers-for-linux-beginners", // 2025-07-01
      "10-lesser-known-useful-linux-commands-part-v", // 2025-07-02
      "best-linux-ocr-tools", // 2025-07-08
      "core-linux-interview-questions-and-answers", // 2025-07-10
      "linux-services-and-daemons", // 2025-07-14
      "ssh-two-factor-authentication", // 2025-07-16
      "sudo-insult-when-enter-wrong-password", // 2025-07-16
      "linux-bootable-usb-creators", // 2025-07-29
      "list-all-running-services-under-systemd-in-linux", // 2025-09-02
      "install-zip-and-unzip-in-linux", // 2025-09-02
      "find-my-dns-server-ip-address-in-linux", // 2025-09-05
      "monitor-disk-usage-bash-script", // 2025-09-17
      "install-cpanel-whm-almalinux", // 2025-09-18
      "reduce-ram-cpu-usage-on-linux", // 2025-02-27
      "unison-file-synchronizer-linux", // 2025-09-23
      "find-and-delete-duplicate-files-in-linux", // 2025-10-01
      // END: 2025linux-fedora
      // END: linux-fedora
    ]],[
    "arch-linux", [
      "install-zip-and-unzip-in-linux", // 2025-09-02
      // END: 2025arch-linux
      // END: arch-linux
    ]],[
    "opensuse", [
      "install-zip-and-unzip-in-linux", // 2025-09-02
      // END: 2025opensuse
      // END: opensuse
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
      "edit-configuration-files-using-sed-and-awk", // 2025-07-17
      // END: 2025awk
      // END: awk
    ]],[
    "sed", [
      "edit-configuration-files-using-sed-and-awk", // 2025-07-17
      // END: 2025sed
      // END: sed
    ]],[
    "rsync", [
      "file-transfer-in-linux", // 2024-08-16
      // END: 2024rsync
      // END: 2025rsync
      // END: rsync
    ]],[
    "asciinema", [
      "asciinema-record-terminal-sessions-in-linux", // 2025-09-06
      // END: 2025asciinema
      // END: asciinema
    ]],[
    "postgres", [
      "install-postgresql-on-ubuntu", // 2025-10-15
      // END: 2025postgres
      // END: postgres
    ]],[
    "mysql", [
      // END: 2024mysql
      "linux-interview-questions-and-answers-for-linux-beginners", // 2025-07-01
      "mysql-database-interview-linux", // 2025-10-07
      // END: 2025mysql
      // END: mysql
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