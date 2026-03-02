import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2026: SidebarYeargroupTemplate = {
  text: '2026',
  collapsible: true,
  children: [
    // END: 2026
    "nemotron-colembed-v2", // 2026-02-04
    "diff-attn-v2", // 2026-01-20
  ],
}

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
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
    "pytorch-block-sparse", // 2020-09-10
    "how-to-generate", // 2020-03-01
    "how-to-train", // 2020-02-14
  ],
}



export const template: SidebarInfoTemplate = {
  name: 'huggingface.co',
  faviconPath: 'https://huggingface.co/favicon.ico',
  linksMap: new Map([
    [
    "py", [
      // END: 2020py
      // END: 2021py
      // END: 2022py
      // END: 2023py
      // END: 2024py
      // END: 2025py
      // END: 2026py
      // END: py
    ]],[
    "py-torch", [
      "how-to-train", // 2020-02-14
      "how-to-generate", // 2020-03-01
      "pytorch-block-sparse", // 2020-09-10
      // END: 2020py-torch
      // END: 2021py-torch
      // END: 2022py-torch
      // END: 2023py-torch
      // END: 2024py-torch
      // END: 2025py-torch
      // END: 2026py-torch
      // END: py-torch
    ]],[
    "sh", [
      // END: 2020sh
      // END: 2021sh
      // END: 2022sh
      // END: 2023sh
      // END: 2024sh
      // END: 2025sh
      // END: 2026sh
      // END: sh
    ]],[
    "ai", [
      // END: 2020ai
      // END: 2021ai
      // END: 2022ai
      // END: 2023ai
      // END: 2024ai
      // END: 2025ai
      // END: 2026ai
      // END: ai
    ]],[
    "llm", [
      "how-to-train", // 2020-02-14
      "how-to-generate", // 2020-03-01
      "pytorch-block-sparse", // 2020-09-10
      // END: 2020llm
      // END: 2021llm
      // END: 2022llm
      // END: 2023llm
      // END: 2024llm
      // END: 2025llm
      "diff-attn-v2", // 2026-01-20
      "nemotron-colembed-v2", // 2026-02-04
      // END: 2026llm
      // END: llm
    ]],[
    "math", [
      // END: 2020math
      // END: 2021math
      // END: 2022math
      // END: 2023math
      // END: 2024math
      // END: 2025math
      "diff-attn-v2", // 2026-01-20
      // END: 2026math
      // END: math
    ]],[
    "coen", [
      // END: 2020coen
      // END: 2021coen
      // END: 2022coen
      // END: 2023coen
      // END: 2024coen
      // END: 2025coen
      // END: 2026coen
      // END: coen
    ]],[
    "all", [
      Y2026,
      Y2025,
      Y2024,
      Y2023,
      Y2022,
      Y2021,
      Y2020,
    ]],
  ])
}