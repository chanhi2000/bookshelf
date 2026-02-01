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

export const template: SidebarInfoTemplate = {
  name: 'huggingface.co',
  faviconPath: 'https://huggingface.co/favicon.svg',
  linksMap: new Map([
    [
    "sh", [
      // END: 2025sh
      // END: 2026sh
      // END: sh
    ]],[
    "ai", [
      // END: 2025ai
      // END: 2026ai
      // END: ai
    ]],[
    "llm", [
      // END: 2025llm
      "diff-attn-v2", // 2026-01-20
      "nemotron-colembed-v2", // 2026-02-04
      // END: 2026llm
      // END: llm
    ]],[
    "math", [
      // END: 2025math
      "diff-attn-v2", // 2026-01-20
      // END: 2026math
      // END: math
    ]],[
    "coen", [
      // END: 2025coen
      // END: 2026coen
      // END: coen
    ]],[
    "all", [
      Y2026,
      Y2025,
      Y2024,
    ]],
  ])
}