import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2016: SidebarYeargroupTemplate = {
  text: '2016',
  collapsible: true,
  children: [
    // END: 2016
  ]
}

const Y2017: SidebarYeargroupTemplate = {
  text: '2017',
  collapsible: true,
  children: [
    // END: 2017
  ]
}

const Y2018: SidebarYeargroupTemplate = {
  text: '2018',
  collapsible: true,
  children: [
    // END: 2018
  ]
}

const Y2019: SidebarYeargroupTemplate = {
  text: '2019',
  collapsible: true,
  children: [
    // END: 2019
  ]
}

const Y2020: SidebarYeargroupTemplate = {
  text: '2020',
  collapsible: true,
  children: [
    // END: 2020
    "you-dont-have-to-use-docker-anymore", // 2020-10-15
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
  name: 'towardsdatascience.com',
  faviconPath: 'https://cdn-images-1.medium.com/v2/resize:fill:128:128/1*VzTUkfeGymHP4Bvav-T-lA.png',
  linksMap: new Map([
    [
    "docker",[
      "you-dont-have-to-use-docker-anymore", // 2020-10-15
      // END: 2020docker
      // END: 2021docker
      // END: 2022docker
      // END: 2023docker
      // END: 2024docker
      // END: 2025docker
      // END: docker
    ]],[
    "podman", [
      "you-dont-have-to-use-docker-anymore", // 2020-10-15
      // END: 2020podman
      // END: 2021podman
      // END: 2022podman
      // END: 2023podman
      // END: 2024podman
      // END: 2025podman
      // END: podman
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
    ]]
  ])
}