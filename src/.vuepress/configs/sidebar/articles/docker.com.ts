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
  ],
}

const Y2018: SidebarYeargroupTemplate = {
  text: '2018',
  collapsible: true,
  children: [
    // END: 2018
  ],
}

const Y2017: SidebarYeargroupTemplate = {
  text: '2017',
  collapsible: true,
  children: [
    // END: 2017
  ],
}

const Y2016: SidebarYeargroupTemplate = {
  text: '2016',
  collapsible: true,
  children: [
    // END: 2016
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
      // END: java2016
      // END: java2017
      // END: java2018
      // END: java2019
      // END: java2020
      // END: java2021
      // END: java2022
      // END: java2023
      // END: java2024
      // END: java2025
      // END: java
    ]],[
    "go", [
      "docker-golang", // 2016-09-15
      // END: go2016
      // END: go2017
      // END: go2018
      // END: go2019
      // END: go2020
      // END: go2021
      // END: go2022
      // END: go2023
      // END: go2024
      // END: go2025
      // END: go
    ]],[
    "docker", [
      "how-to-use-your-own-registry", // 2013-07-20
      "docker-can-now-run-within-docker", // 2023-09-06
      "gathering-lxc-docker-containers-metrics", // 2013-10-09
      // END: docker2013
      // END: docker2014
      "runc", // 2015-06-23
      "open-container-project-foundation", // 2015-06-23
      "new-apt-and-yum-repos", // 2015-07-23
      "containerd-daemon-to-control-runc", // 2015-12-18
      // END: docker2015
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
      // END: docker2016
      // END: docker2017
      // END: docker2018
      // END: docker2019
      // END: docker2020
      // END: docker2021
      // END: docker2022
      // END: docker2023
      // END: docker2024
      "docker-compose-with-provider-services", // 2025-07-10
      // END: docker2025
      // END: docker
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
      Y2014,
      Y2013,
    ]]
  ])
}