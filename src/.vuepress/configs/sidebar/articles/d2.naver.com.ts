import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2017: SidebarYeargroupTemplate = {
  text: '2017',
  collapsible: true,
  children: [
    // END: 2017
    "0590136", // 2017-08-18
    "8842776", // 2017-06-14
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
    "6532276", // 2020-10-12
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
    "0853669", // 2022-01-29
  ]
}

const Y2023: SidebarYeargroupTemplate = {
  text: '2023',
  collapsible: true,
  children: [
    // END: 2023
    "6445508", // 2023-12-19
  ]
}

const Y2024: SidebarYeargroupTemplate = {
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
    "8149881", // 2024-11-11
    "7989422", // 2024-07-19
    "1623894", // 2024-07-17
    "0281668", // 2024-07-17
    "5088940", // 2024-07-04
    "3713986", // 2024-07-04
    "9283310", // 2024-07-04
    "7321313", // 2024-07-02
    "7282210", // 2024-06-27
    "2905424", // 2024-06-25
    "8011540", // 2024-06-20
    "7030870", // 2024-06-18
    "0623656", // 2024-06-13
    "0680815", // 2024-06-11
    "7472830", // 2024-06-07
    "5564264", // 2024-06-05
    "2461452", // 2024-05-17
    "8113611", // 2024-04-30 TODO: performacne
    // "7136716", // 2024-04-35
    // "9227596", // 2024-04-22
    "6507662", // 2024-03-29
    "2690202", // 2024-03-29
    "6178029", // 2024-03-27
    "8588537", // 2024-03-27
    '9581727', // 2024-03-07
    "1203723", // 2024-03-05
    "8404108", // 2024-01-17
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
  name: 'd2.naver.com',
  faviconPath: '/assets/image/d2.naver.com/favicon.ico',
  linksMap: new Map([
    [
    "sh", [
      "8842776", // 2017-06-14
    ]], [
    "java", [
      "1329", // 2011-12-22
      "6445508", // 2023-12-19
    ]], [
    "java-android", [
      "0623656", // 2024-06-13
      "7282210", // 2024-06-27
    ]], [
    "java-spring", [
      "1341", // 2021-12-22
      "1203723", // 2024-03-05
    ]], [
    "java-kafka", [
      "0853669", // 2022-01-29
      '9581727', // 2024-03-07
    ]], [
    "js", [
      "1052", // 2011-12-23
    ]], [
    "ts", [
      "0590136", // 2017-08-18
      "7472830", // 2024-06-07
      "9283310", // 2024-07-04
      "3713986", // 2024-07-04
      "5088940", // 2024-07-04
    ]], [
    "js-node", [
      "1336", // 2022-12-22
      "6532276", // 2020-10-12
    ]], [
    "py", [
      "7989422", // 2024-07-19
      // END: py
    ]], [
    "go", [
      "8404108", // 2024-01-17
      "8588537", // 2024-03-27
      "6178029", // 2024-03-27
      "2690202", // 2024-03-29
      "6507662", // 2024-03-29
    ]], [
    "cpp", [
      "1203723", // 2024-03-05
    ]],[
    "git", [
      "1011", // 2011-12-23
    ]],[
    "linux-debian", [
      "8842776", // 2017-06-14
    ]],[
    "linux-fedora", [
      "8842776", // 2017-06-14
    ]],[
    "github", [
      "8149881", // 2024-11-11
    ]],[
    "k8s", [
      "5564264", // 2024-06-05
      "2905424", // 2024-06-25
    ]],[
    "security", [
      "994", // 2011-12-23
    ]],[
    "data-science", [
      "1042", // 2011-12-23
    ]],[
    "mongodb", [
      "1016", // 2011-12-23
      "1039", // 2011-12-23
      // END: 2021hadoop
    ]],[
    "cassandra", [
      "1039", // 2011-12-23
      // END: 2021hadoop
    ]],[
    "hadoop", [
      "1016", // 2011-12-23
      // END: 2021hadoop
      // END: 2022hadoop
      // END: 2023hadoop
      "6445508", // 2023-12-19
      // END: hadoop
    ]],[
    "spark", [
      "0680815", // 2024-06-11
      "7989422", // 2024-07-19
      // END: spark
    ]],[
    "system-design", [
      "1062", // 2011-12-23
      // END: 2018system-design
      // END: 2019system-design
      // END: 2020system-design
      // END: 2021system-design
      // END: 2022system-design
      // END: 2023system-design
      "2461452", // 2024-05-17
      "0281668", // 2024-07-17
      "1623894", // 2024-07-17
      // END: 2024system-design
      // END: 2025system-design
      // END: system-design
    ]],[
    "figma", [
      "0623656", // 2024-06-13
      "7030870", // 2024-06-18
      // END: 2024figma
      // END: 2025figma
      // END: figma
    ]],[
    "llm", [
      "8011540", // 2024-06-20
      "7321313", // 2024-07-02
      // END: 2024llm
      // END: 2025llm
      // END: llm
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
      "1329", // 2011-12-22
      "1336", // 2021-12-22
      "1341", // 2021-12-22
      "994", // 2011-12-23
      "1011", // 2011-12-23
      "1016", // 2011-12-23
      "1039", // 2011-12-23
      "1042", // 2011-12-23
      "1052", // 2011-12-23
      "1062", // 2011-12-23
    ]],
  ])
}