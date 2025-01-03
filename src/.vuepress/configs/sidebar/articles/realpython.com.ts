import { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2014: SidebarYeargroupTemplate = {
  text: '2014',
  collapsible: true,
  children: [
    // END: 2014
    "setting-up-sublime-text-3-for-full-stack-python-development", // 2014-08-11
  ]
}

const Y2018: SidebarYeargroupTemplate = {
  text: '2018',
  collapsible: true,
  children: [
    // END: 2018
    "documenting-python-code", // 2018-07-25
    "python-application-layouts", // 2018-06-04
  ]
}

const Y2019: SidebarYeargroupTemplate = {
  text: '2019',
  collapsible: true,
  children: [
    // END: 2019
    "python-kwargs-and-args", // 2019-09-04
    "python-lambda", // 2019-06-19
  ]
}

const Y2024: SidebarYeargroupTemplate = { 
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
    "run-python-scripts", // 2024-12-08
  ]
}

const Y2025: SidebarYeargroupTemplate = { 
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
    "image-processing-with-the-python-pillow-library", // 2025-01-08
  ]
}

export const template: SidebarInfoTemplate = {
  name: 'realpython.com',
  faviconPath: 'https://realpython.com/static/favicon.68cbf4197b0c.png',
  linksMap: new Map([
    [
    "py", [
      "setting-up-sublime-text-3-for-full-stack-python-development", // 2014-08-11
      // END: 2014py
      // END: 2015py
      // END: 2016py
      // END: 2017py
      "python-application-layouts", // 2018-06-04
      "documenting-python-code", // 2018-07-25
      // END: 2018py
      "python-lambda", // 2019-06-19
      "python-kwargs-and-args", // 2019-09-04
      // END: 2019py
      // END: 2020py
      // END: 2021py
      // END: 2022py
      // END: 2023py
      "run-python-scripts", // 2024-12-08
      // END: 2024py
      "image-processing-with-the-python-pillow-library", // 2025-01-08
    ]],[
    "sublimetext", [ 
      "setting-up-sublime-text-3-for-full-stack-python-development", // 2014-08-11
      // END: 2014py
      // END: 2015py
      // END: 2016py
      // END: 2017py
      // END: 2018py
      // END: 2019py
      // END: 2020py
      // END: 2021py
      // END: 2022py
      // END: 2023py
      // END: 2024py
    ]],[
    "all", [ 
      Y2025,
      Y2024,
      Y2019,
      Y2018,
      Y2014,
    ]]
  ])
}