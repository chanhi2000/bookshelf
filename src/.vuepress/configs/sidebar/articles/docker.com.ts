import { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
    "docker-compose-with-provider-services", // 2025-07-10
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
  ],
}

const Y2022: SidebarYeargroupTemplate = {
  text: '2022',
  collapsible: true,
  children: [
    // END: 2022
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
    "new-filesharing-implementation-in-docker-desktop-windows", // 2019-12-12
    "depend-on-docker-for-kubeflow", // 2019-11-07
    "developing-docker-windows-app-wsl2", // 2019-08-15
    "maintainable-integration-tests-with-docker", // 2019-08-01
    "keep-nodejs-rockin-in-docker", // 2019-07-31
    "road-to-containing-iscsi", // 2019-07-16
    "intro-guide-to-dockerfile-best-practices", // 2019-07-03
    "getting-started-with-docker-for-arm-on-linux", // 2019-06-08
    "containerizing-test-tooling-creating-your-dockerfile-and-makefile", // 2019-06-05
    "whats-in-a-container-platform", // 2019-05-10
    "multi-arch-images", // 2019-05-01
    "happy-pi-day-docker-raspberry-pi", // 2019-03-15
    "addressing-time-drift-in-docker-desktop-for-mac", // 2019-02-26
  ],
}

const Y2018: SidebarYeargroupTemplate = {
  text: '2018',
  collapsible: true,
  children: [
    // END: 2018
    "introducing-play-kubernetes", // 2018-05-24
    "improved-docker-container-integration-with-java-10", // 2018-04-04
    "docker-windows-desktop-now-kubernetes", // 2018-01-31
    "docker-mac-kubernetes", // 2018-01-10
  ],
}

const Y2017: SidebarYeargroupTemplate = {
  text: '2017',
  collapsible: true,
  children: [
    // END: 2017
    "docker-windows-server-1709", // 2017-09-26
    "docker-official-images-now-multi-platform", // 2017-09-20
    "preview-linux-containers-on-windows", // 2017-09-14
    "demystifying-open-container-initiative-oci-specifications", // 2017-07-19
    "best-way-learn-docker-free-play-docker-pwd", // 2017-07-18
    "multi-stage-builds", // 2017-07-06
    "spring-boot-development-docker", // 2017-05-25
    "user-guided-caching-in-docker-for-mac", // 2017-05-06
    "introducing-linuxkit-container-os-toolkit", // 2017-04-18
    "introducing-the-moby-project", // 2017-04-18
    "adventures-in-gelf", // 2017-02-08
    "cpu-management-docker-1-13", // 2017-01-21
    "whats-new-in-docker-1-13", // 2017-01-20
    "docker-windows-server-image2docker", // 2017-01-18
  ],
}

const Y2016: SidebarYeargroupTemplate = {
  text: '2016',
  collapsible: true,
  children: [
    // END: 2016
    "understanding-docker-networking-drivers-use-cases", // 2016-12-20
    "introducing-containerd", // 2016-12-14
    "image2docker-prototyping-windows-vm-conversions", // 2016-09-29
    "build-your-first-docker-windows-server-container", // 2016-09-27
    "dockerforws2016", // 2016-09-26
    "java-development-using-docker", // 2016-09-21
    "docker-golang", // 2016-09-15
    "the-10-most-common-questions-it-admins-ask-about-docker", // 2016-07-28
    "building-serverless-apps-with-docker", // 2016-06-22
    "docker-1-12-built-in-orchestration", // 2016-06-21
    "docker-unikernels-open-source", // 2016-05-18
    "docker-engine-1-11-runc", // 2016-04-13
    "containers-and-vms-together", // 2016-04-09
    "docker-engine-1-11-runc", // 2016-
    "docker-networking-design-philosophy", // 2016-03-02
    "docker-compose-networking", // 2016-03-01
    "docker-1-10", // 2016-02-05
    "compose-1-6", // 2016-02-04
    "containers-as-a-service-caas", // 2016-02-02
  ],
}

const Y2015: SidebarYeargroupTemplate = {
  text: '2015',
  collapsible: true,
  children: [
    // END: 2015
    "containerd-daemon-to-control-runc", // 2015-12-18
    "new-apt-and-yum-repos", // 2015-07-23
    "open-container-project-foundation", // 2015-06-23
    "runc", // 2015-06-23
  ],
}

const Y2014: SidebarYeargroupTemplate = {
  text: '2014',
  collapsible: true,
  children: [
    // END: 2014
  ],
}

const Y2013: SidebarYeargroupTemplate = {
  text: '2013',
  collapsible: true,
  children: [
    // END: 2013
    "gathering-lxc-docker-containers-metrics", // 2013-10-09
    "docker-can-now-run-within-docker", // 2013-09-06
    "how-to-use-your-own-registry", // 2013-07-20
  ],
}


export const template: SidebarInfoTemplate = {
  name: "docker.com",
  faviconPath: "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  linksMap: new Map([
    [
    "java", [
      "java-development-using-docker", // 2016-09-21
      // END: 2016java
      "spring-boot-development-docker", // 2017-05-25
      // END: 2017java
      "improved-docker-container-integration-with-java-10", // 2018-04-04
      // END: 2018java
      "maintainable-integration-tests-with-docker", // 2019-08-01
      // END: 2019java
      // END: 2020java
      // END: 2021java
      // END: 2022java
      // END: 2023java
      // END: 2024java
      // END: 2025java
      // END: java
    ]],[
    "java-spring", [
      "spring-boot-development-docker", // 2017-05-25
      // END: 2017java-spring
      // END: 2018java-spring
      // END: 2019java-spring
      // END: 2020java-spring
      // END: 2021java-spring
      // END: 2022java-spring
      // END: 2023java-spring
      // END: 2024java-spring
      // END: 2025java-spring
      // END: java-spring
    ]],[
    "js-node", [
      "keep-nodejs-rockin-in-docker", // 2019-07-31
      // END: 2019js-node
      // END: 2020js-node
      // END: 2021js-node
      // END: 2022js-node
      // END: 2023js-node
      // END: 2024js-node
      // END: 2025js-node
      // END: js-node
    ]],[
    "py-flask", [
      "developing-docker-windows-app-wsl2", // 2019-08-15
      // END: 2019py-flask
      // END: 2020py-flask
      // END: 2021py-flask
      // END: 2022py-flask
      // END: 2023py-flask
      // END: 2024py-flask
      // END: 2025py-flask
      // END: py-flask
    ]],[
    "go", [
      "docker-golang", // 2016-09-15
      // END: 2016go
      // END: 2017go
      // END: 2018go
      "maintainable-integration-tests-with-docker", // 2019-08-01
      // END: 2019go
      // END: 2020go
      // END: 2021go
      // END: 2022go
      // END: 2023go
      // END: 2024go
      // END: 2025go
      // END: go
    ]],[
    "pwsh", [
      "docker-windows-server-1709", // 2017-09-26
      // END: 2017pwsh
      // END: 2018pwsh
      // END: 2019pwsh
      // END: 2020pwsh
      // END: 2021pwsh
      // END: 2022pwsh
      // END: 2023pwsh
      // END: 2024pwsh
      // END: 2025pwsh
      // END: pwsh
    ]],[
    "docker", [
      "how-to-use-your-own-registry", // 2013-07-20
      "docker-can-now-run-within-docker", // 2023-09-06
      "gathering-lxc-docker-containers-metrics", // 2013-10-09
      // END: 2013docker
      // END: 2014docker
      "runc", // 2015-06-23
      "open-container-project-foundation", // 2015-06-23
      "new-apt-and-yum-repos", // 2015-07-23
      "containerd-daemon-to-control-runc", // 2015-12-18
      // END: 2015docker
      "containers-as-a-service-caas", // 2016-02-02
      "compose-1-6", // 2016-02-04
      "docker-1-10", // 2016-02-05
      "docker-compose-networking", // 2016-03-01
      "docker-networking-design-philosophy", // 2016-03-02
      "containers-and-vms-together", // 2016-04-09
      "docker-engine-1-11-runc", // 2016-04-13
      "docker-unikernels-open-source", // 2016-05-18
      "docker-1-12-built-in-orchestration", // 2016-06-21
      "building-serverless-apps-with-docker", // 2016-06-22
      "the-10-most-common-questions-it-admins-ask-about-docker", // 2016-07-28
      "docker-golang", // 2016-09-15
      "java-development-using-docker", // 2016-09-21
      "dockerforws2016", // 2016-09-26
      "build-your-first-docker-windows-server-container", // 2016-09-27
      "image2docker-prototyping-windows-vm-conversions", // 2016-09-29
      "introducing-containerd", // 2016-12-14
      "understanding-docker-networking-drivers-use-cases", // 2016-12-20
      // END: 2016docker
      "docker-windows-server-image2docker", // 2017-01-18
      "whats-new-in-docker-1-13", // 2017-01-20
      "cpu-management-docker-1-13", // 2017-01-21
      "adventures-in-gelf", // 2017-02-08
      "introducing-the-moby-project", // 2017-04-18
      "introducing-linuxkit-container-os-toolkit", // 2017-04-18
      "user-guided-caching-in-docker-for-mac", // 2017-05-06
      "spring-boot-development-docker", // 2017-05-25
      "multi-stage-builds", // 2017-07-06
      "best-way-learn-docker-free-play-docker-pwd", // 2017-07-18
      "demystifying-open-container-initiative-oci-specifications", // 2017-07-19
      "preview-linux-containers-on-windows", // 2017-09-14
      "docker-official-images-now-multi-platform", // 2017-09-20
      "docker-windows-server-1709", // 2017-09-26
      // END: 2017docker
      "docker-mac-kubernetes", // 2018-01-10
      "docker-windows-desktop-now-kubernetes", // 2018-01-31
      "improved-docker-container-integration-with-java-10", // 2018-04-04
      // END: 2018docker
      "addressing-time-drift-in-docker-desktop-for-mac", // 2019-02-26
      "happy-pi-day-docker-raspberry-pi", // 2019-03-15
      "multi-arch-images", // 2019-05-01
      "whats-in-a-container-platform", // 2019-05-10
      "containerizing-test-tooling-creating-your-dockerfile-and-makefile", // 2019-06-05
      "getting-started-with-docker-for-arm-on-linux", // 2019-06-08
      "intro-guide-to-dockerfile-best-practices", // 2019-07-03
      "road-to-containing-iscsi", // 2019-07-16
      "keep-nodejs-rockin-in-docker", // 2019-07-31
      "maintainable-integration-tests-with-docker", // 2019-08-01
      "developing-docker-windows-app-wsl2", // 2019-08-15
      "new-filesharing-implementation-in-docker-desktop-windows", // 2019-12-12
      // END: 2019docker
      // TODO: page/83
      // END: 2020docker
      // END: 2021docker
      // END: 2022docker
      // END: 2023docker
      // END: 2024docker
      "docker-compose-with-provider-services", // 2025-07-10
      // END: 2025docker
      // END: docker
    ]],[
    "testcontainer", [
      // END: 2014testcontainer
      // END: 2015testcontainer
      // END: 2016testcontainer
      // END: 2017testcontainer
      // END: 2018testcontainer
      "maintainable-integration-tests-with-docker", // 2019-08-01
      // END: 2019testcontainer
      // END: 2020testcontainer
      // END: 2021testcontainer
      // END: 2022testcontainer
      // END: 2023testcontainer
      // END: 2024testcontainer
      // END: 2025testcontainer
      // END: testcontainer
    ]],[
    "k8s", [
      "docker-mac-kubernetes", // 2018-01-10
      "docker-windows-desktop-now-kubernetes", // 2018-01-31
      "introducing-play-kubernetes", // 2018-05-24
      // END: 2018k8s
      "depend-on-docker-for-kubeflow", // 2019-11-07
      // END: 2019k8s
      // END: 2020k8s
      // END: 2021k8s
      // END: 2022k8s
      // END: 2023k8s
      // END: 2024k8s
      // END: 2025k8s
      // END: k8s
    ]],[
    "macos", [
      "user-guided-caching-in-docker-for-mac", // 2017-05-06
      // END: 2017macos
      "docker-mac-kubernetes", // 2018-01-10
      // END: 2018macos
      // END: 2019macos
      // END: 2020macos
      // END: 2021macos
      // END: 2022macos
      // END: 2023macos
      // END: 2024macos
      // END: 2025macos
      // END: macos
    ]],[
    "win", [
      "docker-windows-server-image2docker", // 2017-01-18
      "preview-linux-containers-on-windows", // 2017-09-14
      "docker-windows-server-1709", // 2017-09-26
      // END: 2017win
      "docker-windows-desktop-now-kubernetes", // 2018-01-31
      // END: 2018win
      "developing-docker-windows-app-wsl2", // 2019-08-15
      "new-filesharing-implementation-in-docker-desktop-windows", // 2019-12-12
      // END: 2019win
      // END: 2020win
      // END: 2021win
      // END: 2022win
      // END: 2023win
      // END: 2024win
      // END: 2025win
      // END: win
    ]],[
    "linux-debian", [
      "happy-pi-day-docker-raspberry-pi", // 2019-03-15
      // END: 2019win
      // END: 2020win
      // END: 2021win
      // END: 2022win
      // END: 2023win
      // END: 2024win
      // END: 2025win
      // END: win
    ]],[
    "all", [
      Y2025,
      Y2024,
      Y2023,
      Y2022,
      Y2021,
      Y2020,
      Y2019,
      Y2018,
      Y2017,
      Y2016,
      Y2015,
      // Y2014,
      Y2013,
    ]]
  ])
}