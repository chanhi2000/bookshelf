import { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const PYTHON_PRINT: SidebarInfoSubgroupTemplate = { // 2019-08-12
  text: "Your Guide to the Python print() Function",
  collapsible: true,
  icon: 'fa-brands fa-python',
  subPath: 'python-print',
  children: [
    'README',
    'printing-in-a-nutshell',
    'understanding-python-print',
    'printing-with-style',
    'mocking-python-print-in-unit-tests',
    'print-debugging',
    'thread-safe-printing',
    'python-print-counterparts', 
  ]
}

const QUEUE_IN_PYTHON: SidebarInfoSubgroupTemplate = { // 2022-06-29
  text: "Python Stacks, Queues, and Priority Queues in Practice",
  collapsible: true,
  icon: 'fa-brands fa-python',
  subPath: 'queue-in-python',
  children: [
    'README',
    'learning-about-the-types-of-queues',
    'implementing-queues-in-python',
    'using-queues-in-practice',
    'using-thread-safe-queues',
    'using-asynchronous-queues',
    'using-multiprocessingqueue-for-interprocess-communication-ipc',
    'integrating-python-with-distributed-message-queues',
  ]
}

const PYTHON_LIST: SidebarInfoSubgroupTemplate = { // 2023-07-19
  text: "Python's list Data Type: A Deep Dive With Examples",
  collapsible: true,
  icon: 'fa-brands fa-python',
  subPath: 'python-list',
  children: [
    'README',
    'getting-started-with-pythons-list-data-type',
    'constructing-lists-in-python',
    'accessing-items-in-a-list-indexing',
    'retrieving-multiple-items-from-a-list-slicing',
    'creating-copies-of-a-list',
    'updating-items-in-lists-index-assignments',
    'growing-and-shrinking-lists-dynamically',
    'concatenating-and-repeating-lists',
    'reversing-and-sorting-lists',
    'traversing-lists',
    'exploring-other-features-of-lists',
    'common-gotchas-of-python-lists',
    'subclassing-the-built-in-list-class',
    'putting-lists-into-action',
    'deciding-whether-to-use-lists',
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

const Y2024: SidebarYeargroupTemplate = { 
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
    "what-is-pip", // 2024-12-22
    "run-python-scripts", // 2024-12-08
    "python-input-output", // 2024-12-02
    "python-logging", // 2024-11-30
  ]
}

const Y2023: SidebarYeargroupTemplate = { 
  text: '2023',
  collapsible: true,
  children: [
    // END: 2023
    PYTHON_LIST, // 2023-07-19
    "zen-of-python", // 2023-06-07
    "terminal-commands", // 2023-02-22
  ]
}

const Y2022: SidebarYeargroupTemplate = { 
  text: '2022',
  collapsible: true,
  children: [
    // END: 2022
    QUEUE_IN_PYTHON, // 2022-06-29
    "python-zipfile", // 2022-02-14
  ]
}


const Y2021: SidebarYeargroupTemplate = { 
  text: '2021',
  collapsible: true,
  children: [
    // END: 2021
    "what-can-i-do-with-python", // 2021-07-07
  ]
}

const Y2020: SidebarYeargroupTemplate = { 
  text: '2020',
  collapsible: true,
  children: [
    // END: 2020
    "python-boolean", // 2020-10-19
  ]
}

const Y2019: SidebarYeargroupTemplate = {
  text: '2019',
  collapsible: true,
  children: [
    // END: 2019
    "python-kwargs-and-args", // 2019-09-04
    PYTHON_PRINT, // 2019-08-12
    "python-lambda", // 2019-06-19
    "working-with-files-in-python", // 2019-01-21
  ]
}

const Y2018: SidebarYeargroupTemplate = {
  text: '2018',
  collapsible: true,
  children: [
    // END: 2018
    "absolute-vs-relative-python-imports", // 2018-09-19
    "documenting-python-code", // 2018-07-25
    "python-application-layouts", // 2018-06-04
    "vim-and-python-a-match-made-in-heaven", // 2018-06-01
    "python-modules-packages", // 2018-04-17
  ]
}

const Y2015: SidebarYeargroupTemplate = {
  text: '2015',
  collapsible: true,
  children: [
    // END: 2015
  ]
}

const Y2014: SidebarYeargroupTemplate = {
  text: '2014',
  collapsible: true,
  children: [
    // END: 2014
    "setting-up-sublime-text-3-for-full-stack-python-development", // 2014-08-11
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
      "python-modules-packages", // 2018-04-17
      "vim-and-python-a-match-made-in-heaven", // 2018-06-01
      "python-application-layouts", // 2018-06-04
      "documenting-python-code", // 2018-07-25
      "absolute-vs-relative-python-imports", // 2018-09-19
      // END: 2018py
      "working-with-files-in-python", // 2019-01-21
      "python-lambda", // 2019-06-19
      PYTHON_PRINT, // 2019-08-12
      "python-kwargs-and-args", // 2019-09-04
      // END: 2019py
      "python-boolean", // 2020-10-19
      // END: 2020py
      "what-can-i-do-with-python", // 2021-07-07
      // END: 2021py
      "python-zipfile", // 2022-02-14
      QUEUE_IN_PYTHON, // 2022-06-29
      // END: 2022py
      "zen-of-python", // 2023-06-07
      PYTHON_LIST, // 2023-07-19
      // END: 2023py
      "python-logging", // 2024-11-30
      "python-input-output", // 2024-12-02
      "run-python-scripts", // 2024-12-08
      "what-is-pip", // 2024-12-22
      // END: 2024py
      "image-processing-with-the-python-pillow-library", // 2025-01-08
    ]],[
    "git", [ 
      "terminal-commands", // 2023-02-22
      // END: 2023sh
      // END: 2024sh
      // END: 2025sh
      // END: sh
    ]],[
    "sh", [ 
      "terminal-commands", // 2023-02-22
      // END: 2023sh
      // END: 2024sh
      // END: 2025sh
      // END: sh
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
      Y2023,
      Y2022,
      Y2021,
      Y2020,
      Y2019,
      Y2018,
      Y2015,
      Y2014,
    ]]
  ])
}