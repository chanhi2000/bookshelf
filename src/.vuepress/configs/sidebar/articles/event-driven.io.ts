import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
  ]
}


const Y2024: SidebarYeargroupTemplate = {
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
    "crud-with-pongo", // 2024-10-27
    "sql-support-in-pongo", // 2024-10-15
    "pongo-strongly-typed-client", // 2024-09-13
    "architecture-drivers", // 2024-08-31
    "projections-and-event-metadata", // 2024-08-25
    "emmett-projections-testing", // 2024-08-14
    "emmett-postgresql-event-store", // 2024-07-12
    "introducting-pongo", // 2024-07-07
    "filtering-eventstoredb-subscriptions-by-event-types", // 2024-06-30
  ]
}

export const template: SidebarInfoTemplate = {
  name: 'event-driven.io',
  faviconPath: '/assets/image/event-driven.io/favicon.jfif',
  linksMap: new Map([
    [
    "java", [
    ]],[
    "cs", [
      "filtering-eventstoredb-subscriptions-by-event-types", // 2024-06-30
      // END: cs2024
      // END: cs2025
      // END: cs
    ]],[
    "js-node", [
      "introducting-pongo", // 2024-07-07
      "emmett-postgresql-event-store", // 2024-07-12
      "emmett-projections-testing", // 2024-08-14
      // END: js-node2024
      // END: js-node2025
      // END: js-node
    ]],[
    "ts", [
      "projections-and-event-metadata", // 2024-08-25
      "pongo-strongly-typed-client", // 2024-09-13
      "sql-support-in-pongo", // 2024-10-15
      "crud-with-pongo", // 2024-10-27
      // END: ts2024
      // END: ts2025
      // END: ts
    ]],[
    "regex", [
      "filtering-eventstoredb-subscriptions-by-event-types", // 2024-06-30
      // END: regex2024
      // END: regex2025
      // END: regex
    ]],[
    "postgres", [
      "introducting-pongo", // 2024-07-07
      "emmett-postgresql-event-store", // 2024-07-12
      "emmett-projections-testing", // 2024-08-14
      "pongo-strongly-typed-client", // 2024-09-13
      "sql-support-in-pongo", // 2024-10-15
      "crud-with-pongo", // 2024-10-27
      // END: postgres2024
      // END: postgres2025
      // END: postgres
    ]],[
    "system-design", [
      "architecture-drivers", // 2024-08-31
      // END: system-design2024
      // END: system-design2025
      // END: system-design
    ]],[
    "all", [
      Y2025,
      Y2024,
    ]],
  ]),
}