import { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const ADVANCED_GIT_FOR_PYTHONISTAS: SidebarInfoSubgroupTemplate = { // 2018-08-13
  text: "Advanced Git Tips for Python Developers",
  collapsible: true,
  icon: 'iconfont icon-git',
  subPath: 'advanced-git-for-pythonistas',
  children: [
    'README',
    'revision-selection',
    'handling-interruptions-git-stash',
    'comparing-revisions-git-diff',
    'git-difftool',
    'changing-history',
    'resolving-merge-conflicts',
  ]
}

const READ_WRITE_FILES_PYTHON: SidebarInfoSubgroupTemplate = { // 2019-02-20
  text: "Reading and Writing Files in Python (Guide)",
  collapsible: true,
  icon: 'fa-brands fa-python',
  subPath: 'read-write-files-python',
  children: [
    'README',
    'what-is-a-file',
    'opening-and-closing-a-file-in-python',
    'reading-and-writing-opened-files',
    'tips-and-tricks',
  ]
}

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

const PYTHON_DATETIME: SidebarInfoSubgroupTemplate = { // 2020-05-04
  text: "Using Python datetime to Work With Dates and Times",
  collapsible: true,
  icon: 'fa-brands fa-python',
  subPath: 'python-datetime',
  children: [
    'README',
    'programming-with-dates-and-times',
    'using-the-python-datetime-module',
    'starting-your-pycon-countdown',
    'working-with-time-zones',
    'improving-your-pycon-countdown',
    'doing-arithmetic-with-python-datetime',
    'finishing-your-pycon-countdown',
    'alternatives-to-python-datetime-and-dateutil',
  ]
}

const PYTHON39_NEW_FEATURES: SidebarInfoSubgroupTemplate = { // 2020-10-05
  text: "Python 3.9: Cool New Features for You to Try",
  collapsible: true,
  icon: 'fa-brands fa-python',
  subPath: 'python39-new-features',
  children: [
    'README',
    'proper-time-zone-support',
    'simpler-updating-of-dictionaries',
    'more-flexible-decorators',
    'annotated-type-hints',
    'a-more-powerful-python-parser',
    'other-pretty-cool-features',
    'when-is-the-next-version-of-python-coming',
    'so-should-you-upgrade-to-python-39',
  ]
}

const PYTHON_WEB_APPLICATIONS: SidebarInfoSubgroupTemplate = { // 2021-02-01
  text: "Python Web Applications: Deploy Your Script as a Flask App",
  collapsible: true,
  icon: 'iconfont icon-flask',
  subPath:'python-web-applications',
  children: [
    'README',
    'brush-up-on-the-basics',
    'build-a-basic-python-web-application',
    'deploy-your-python-web-application',
    'convert-a-script-into-a-web-application',
    'improve-the-user-interface-of-your-web-application',
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

const PYTHON_WITH_STATEMENT: SidebarInfoSubgroupTemplate = { // 2021-06-02
  text: "Context Managers and Python's with Statement",
  collapsible: true,
  icon: 'fa-brands fa-python',
  subPath: 'python-with-statement',
  children: [
    'README',
    'managing-resources-in-python',
    'using-the-python-with-statement',
    'summarizing-the-with-statements-advantages',
    'using-the-async-with-statement',
    'creating-custom-context-managers',
    'coding-class-based-context-managers',
    'creating-function-based-context-managers',
    'writing-good-apis-with-context-managers',
    'creating-an-asynchronous-context-manager',
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

const USING_JUPYTERLAB: SidebarInfoSubgroupTemplate = { // 2023-11-13
  text: "JupyterLab for an Enhanced Notebook Experience",
  collapsible: true,
  icon: 'fa-brands fa-python',
  subPath: 'using-jupyterlab',
  children: [
    'README',
    'installing-and-starting-jupyterlab',
    'understanding-jupyterlab-kernels',
    'working-with-jupyter-notebook-in-jupyterlab',
    'using-the-markdown-editor',
    'managing-and-viewing-different-files',
    'using-your-operating-system-without-leaving-jupyter',
    'using-other-tools',
  ]
}

const PYTHON_YAML: SidebarInfoSubgroupTemplate = { // 2024-12-14
  text: "YAML: The Missing Battery in Python",
  collapsible: true,
  icon: 'fa-brands fa-python',
  subPath: 'python-yaml',
  children: [
    'README',
    'taking-a-crash-course-in-yaml',
    'getting-started-with-yaml-in-python',
    'loading-yaml-documents-in-python',
    'dumping-python-objects-to-yaml-documents',
    'parsing-yaml-documents-at-a-low-level',
  ]
}

const PYTHON_JSON: SidebarInfoSubgroupTemplate = { // 2024-12-22
  text: "Working With JSON Data in Python",
  collapsible: true,
  icon: 'fa-brands fa-python',
  subPath: 'python-json',
  children: [
    'README',
    'introducing-json',
    'writing-json-with-python',
    'reading-json-with-python',
    'interacting-with-json',
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
    PYTHON_JSON, // 2024-12-22
    "what-is-pip", // 2024-12-22
    PYTHON_YAML, // 2024-12-14
    "run-python-scripts", // 2024-12-08
    "python-input-output", // 2024-12-02
    "python-logging", // 2024-11-30
    "python-zip-function", // 2024-11-17
    "ruff-python", // 2024-06-17
  ]
}

const Y2023: SidebarYeargroupTemplate = { 
  text: '2023',
  collapsible: true,
  children: [
    // END: 2023
    USING_JUPYTERLAB, // 2023-11-13
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
    "add-python-to-path", // 2022-09-26
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
    "python-zip-import", // 2021-12-27
    "what-can-i-do-with-python", // 2021-07-07
    PYTHON_WITH_STATEMENT, // 2021-06-02
    PYTHON_WEB_APPLICATIONS, // 2021-02-01
  ]
}

const Y2020: SidebarYeargroupTemplate = { 
  text: '2020',
  collapsible: true,
  children: [
    // END: 2020
    "python-boolean", // 2020-10-19
    PYTHON39_NEW_FEATURES, // 2020-10-05
    "python-wheels", // 2020-08-05
    PYTHON_DATETIME,// 2020-05-04
    SORTING_ALGORITHMS_PYTHON, // 2020-04-15
    "any-python", // 2020-03-30
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
    READ_WRITE_FILES_PYTHON, // 2019-02-20
    "working-with-files-in-python", // 2019-01-21
  ]
}

const Y2018: SidebarYeargroupTemplate = {
  text: '2018',
  collapsible: true,
  children: [
    // END: 2018
    "python-while-loop", // 2018-11-07
    "absolute-vs-relative-python-imports", // 2018-09-19
    ADVANCED_GIT_FOR_PYTHONISTAS, // 2018-08-13
    "documenting-python-code", // 2018-07-25
    "python-histograms", // 2018-07-12
    "python-application-layouts", // 2018-06-04
    "vim-and-python-a-match-made-in-heaven", // 2018-06-01
    "pipenv-guide", // 2018-04-24
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
      "pipenv-guide", // 2018-04-24
      "vim-and-python-a-match-made-in-heaven", // 2018-06-01
      "python-application-layouts", // 2018-06-04
      "python-histograms", // 2018-07-12
      "documenting-python-code", // 2018-07-25
      ADVANCED_GIT_FOR_PYTHONISTAS, // 2018-08-13
      "absolute-vs-relative-python-imports", // 2018-09-19
      "python-while-loop", // 2018-11-07
      // END: 2018py
      "working-with-files-in-python", // 2019-01-21
      READ_WRITE_FILES_PYTHON, // 2019-02-20
      "python-lambda", // 2019-06-19
      PYTHON_PRINT, // 2019-08-12
      "python-kwargs-and-args", // 2019-09-04
      // END: 2019py
      "any-python", // 2020-03-30
      SORTING_ALGORITHMS_PYTHON, // 2020-04-15
      PYTHON_DATETIME,// 2020-05-04
      "python-wheels", // 2020-08-05
      PYTHON39_NEW_FEATURES, // 2020-10-05
      "python-boolean", // 2020-10-19
      // END: 2020py
      PYTHON_WITH_STATEMENT, // 2021-06-02
      "what-can-i-do-with-python", // 2021-07-07
      "python-zip-import", // 2021-12-27
      // END: 2021py
      "python-zipfile", // 2022-02-14
      "why-close-file-python", // 2022-04-27
      QUEUE_IN_PYTHON, // 2022-06-29
      "add-python-to-path", // 2022-09-26
      // END: 2022py
      PYTHON_REPL, // 2023-01-25
      PYTHON_DASH, // 2023-02-28
      "zen-of-python", // 2023-06-07
      PYTHON_LIST, // 2023-07-19
      // END: 2023py
      "ruff-python", // 2024-06-17
      "python-zip-function", // 2024-11-17
      "python-logging", // 2024-11-30
      "python-input-output", // 2024-12-02
      "run-python-scripts", // 2024-12-08
      PYTHON_YAML, // 2024-12-14
      "what-is-pip", // 2024-12-22
      PYTHON_JSON, // 2024-12-22
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
    "py-flask", [
      PYTHON_WEB_APPLICATIONS, // 2021-02-01
      // END: 2021py-flask
      // END: 2022py-flask
      // END: 2023py-flask
      // END: 2024py-flask
      // END: 2025py-flask
      // END: py-flask
    ]],[
    "py-jupyter", [
      USING_JUPYTERLAB, // 2023-11-13
      // END: 2023py-jupyter
      // END: 2024py-jupyter
      // END: py-jupyter
    ]],[
    "git", [ 
      ADVANCED_GIT_FOR_PYTHONISTAS, // 2018-08-13
      // END: 201git
      // END: 2019git
      // END: 2020git
      // END: 2021git
      // END: 2022git
      "terminal-commands", // 2023-02-22
      // END: 2023git
      // END: 2024git
      // END: 2025git
      // END: git
    ]],[
    "sh", [ 
      "terminal-commands", // 2023-02-22
      // END: 2023sh
      // END: 2024sh
      // END: 2025sh
      // END: sh
    ]],[
    "gcp", [ 
      PYTHON_WEB_APPLICATIONS, // 2021-02-01
      // END: 2021gcp
      // END: 2022gcp
      // END: 2023gcp
      // END: 2024gcp
      // END: 2025gcp
      // END: gcp
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