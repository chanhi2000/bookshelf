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

const SORTING_ALGORITHMS_PYTHON: SidebarInfoSubgroupTemplate = { // 2020-04-15
  text: 'Sorting Algorithms in Python',
  collapsible: true,
  icon: 'fa-brands fa-python',
  subPath: 'sorting-algorithms-python',
  children: [
    'README',
    'the-importance-of-sorting-algorithms-in-python',
    'pythons-built-in-sorting-algorithm',
    'the-significance-of-time-complexity',
    'the-bubble-sort-algorithm-in-python',
    'the-insertion-sort-algorithm-in-python',
    'the-merge-sort-algorithm-in-python',
    'the-quicksort-algorithm-in-python',
    'the-timsort-algorithm-in-python',
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

const PYTHON_REPL: SidebarInfoSubgroupTemplate = { // 2023-01-25
  text: "The Python Standard REPL: Try Out Code and Ideas Quickly",
  collapsible: true,
  icon: 'fa-brands fa-python',
  subPath: 'python-repl',
  children: [
    'README',
    'getting-to-know-the-python-standard-repl',
    'starting-and-ending-repl-interactive-sessions',
    'running-code-in-a-repl-session',
    'editing-code-in-the-standard-repl',
    'getting-help-and-introspecting-code-in-the-repl',
    'customizing-the-standard-repl',
    'uncovering-missing-features-in-the-standard-repl',
    'using-an-alternative-repl',
  ]
}

const PYTHON_DASH: SidebarInfoSubgroupTemplate = { // 2023-02-28
  text: "Develop Data Visualization Interfaces in Python With Dash",
  collapsible: true,
  icon: 'fa-brands fa-python',
  subPath: 'python-dash',
  children: [
    'README',
    'what-is-dash',
    'get-started-with-dash-in-python',
    'style-your-dash-application',
    'add-interactivity-to-your-dash-apps-using-callbacks',
    'deploy-your-dash-application-to-pythonanywhere',
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

const PYTHON_CONSTANTS: SidebarInfoSubgroupTemplate = { // 2025-01-19
  text: "Python Constants: Improve Your Code's Maintainability",
  collapsible: true,
  icon: 'fa-brands fa-python',
  subPath: 'python-constants',
  children: [
    'README',
    'understanding-constants-and-variables',
    'defining-your-own-constants-in-python',
    'putting-constants-into-action',
    'handling-your-constants-in-a-real-world-project',
    'exploring-other-constants-in-python',
    'type-annotating-constants',
    'defining-strict-constants-in-python',
  ]
}

const Y2025: SidebarYeargroupTemplate = { 
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
    PYTHON_CONSTANTS, // 2025-01-19
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
    "ruff-python", // 2024-06-17
  ]
}

const Y2023: SidebarYeargroupTemplate = { 
  text: '2023',
  collapsible: true,
  children: [
    // END: 2023
    PYTHON_LIST, // 2023-07-19
    "zen-of-python", // 2023-06-07
    PYTHON_DASH, // 2023-02-28
    "terminal-commands", // 2023-02-22
    PYTHON_REPL, // 2023-01-25
  ]
}

const Y2022: SidebarYeargroupTemplate = { 
  text: '2022',
  collapsible: true,
  children: [
    // END: 2022
    QUEUE_IN_PYTHON, // 2022-06-29
    "why-close-file-python", // 2022-04-27
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
    SORTING_ALGORITHMS_PYTHON, // 2020-04-15
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
    "python-histograms", // 2018-07-12
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
    "twitter-sentiment-python-docker-elasticsearch-kibana", // 2014-11-13
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
      "twitter-sentiment-python-docker-elasticsearch-kibana", // 2014-11-13
      // END: 2014py
      // END: 2015py
      // END: 2016py
      // END: 2017py
      "python-modules-packages", // 2018-04-17
      "vim-and-python-a-match-made-in-heaven", // 2018-06-01
      "python-application-layouts", // 2018-06-04
      "python-histograms", // 2018-07-12
      "documenting-python-code", // 2018-07-25
      "absolute-vs-relative-python-imports", // 2018-09-19
      // END: 2018py
      "working-with-files-in-python", // 2019-01-21
      "python-lambda", // 2019-06-19
      PYTHON_PRINT, // 2019-08-12
      "python-kwargs-and-args", // 2019-09-04
      // END: 2019py
      SORTING_ALGORITHMS_PYTHON, // 2020-04-15
      "python-boolean", // 2020-10-19
      // END: 2020py
      "what-can-i-do-with-python", // 2021-07-07
      // END: 2021py
      "python-zipfile", // 2022-02-14
      "why-close-file-python", // 2022-04-27
      QUEUE_IN_PYTHON, // 2022-06-29
      // END: 2022py
      PYTHON_REPL, // 2023-01-25
      PYTHON_DASH, // 2023-02-28
      "zen-of-python", // 2023-06-07
      PYTHON_LIST, // 2023-07-19
      // END: 2023py
      "ruff-python", // 2024-06-17
      "python-logging", // 2024-11-30
      "python-input-output", // 2024-12-02
      "run-python-scripts", // 2024-12-08
      "what-is-pip", // 2024-12-22
      // END: 2024py
      "image-processing-with-the-python-pillow-library", // 2025-01-08
      PYTHON_CONSTANTS, // 2025-01-19
      // END: 2025py
      // END: py
    ]],[
    "py-numpy", [ 
      "python-histograms", // 2018-07-12
      // END: 2018py-numpy
      // END: py-numpy
    ]],[
    "py-matplotlib", [ 
      "python-histograms", // 2018-07-12
      // END: 2018py-matplotlib
      // END: py-matplotlib
    ]],[
    "py-scipy", [ 
      "python-histograms", // 2018-07-12
      // END: 2018py-scipy
      // END: py-scipy
    ]],[
    "py-pandas", [ 
      "python-histograms", // 2018-07-12
      // END: 2018py-pandas
      // END: py-pandas
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
    "docker", [ 
      "twitter-sentiment-python-docker-elasticsearch-kibana", // 2014-11-13
      // END: 2014docker
      // END: 2015docker
      // END: 2016docker
      // END: 2017docker
      // END: 2018docker
      // END: 2019docker
      // END: 2020docker
      // END: 2021docker
      // END: 2022docker
      // END: 2023docker
      // END: 2024docker
      // END: 2025docker
      // END: docker
    ]],[
    "sublimetext", [ 
      "setting-up-sublime-text-3-for-full-stack-python-development", // 2014-08-11
      // END: 2014sublimetext
      // END: 2015sublimetext
      // END: 2016sublimetext
      // END: 2017sublimetext
      // END: 2018sublimetext
      // END: 2019sublimetext
      // END: 2020sublimetext
      // END: 2021sublimetext
      // END: 2022sublimetext
      // END: 2023sublimetext
      // END: 2024sublimetext
      // END: py
    ]],[
    "career", [ 
      "world-class-companies-using-python", // 2018-02-08
      // END: 2018career
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