import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2023: SidebarYeargroupTemplate = {
  text: '2023',
  collapsible: true,
  children: [
    "go-threads", // 2023-09-30
    "e-commerce-in-the-cloud-how-to-power-your-online-store-with-cloud-computing", // 2023-09-23
    "golang-select-channel", // 2023-09-16
    "cloud-mobile-apps", // 2023-09-03
    "cloud-migration-strategy-challenges-risk-mitigation-and-transition-models", // 2023-08-28
    "switching-to-cloud-app-development", // 2023-08-22
    "getting-into-cloud-application-development", // 2023-08-12
    "cloud-for-enterprises", // 2023-07-12
    "golang-logging-best-practices", // 2023-06-21
    "go-tracing-golangs-approach-to-concurrency", // 2023-06-08
    "scalable-cloud-computing", // 2023-05-18
    "golang-vs-java-comparison-why-are-more-and-more-companies-moving-from-java-to-golang", // 2023-05-10
    "what-is-golang", // 2023-05-02
    "golang-cast-go-type-casting-and-type-conversion", // 2023-04-18
    "go-vet-command-and-its-usage", // 2023-03-12
    "how-the-biggest-ever-go-update-brought-native-fuzzing", // 2023-03-03
    "golang-type-alias", // 2023-02-16
    "python-vs-golang-features-pros-cons-and-areas-of-use", // 2023-01-28
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
  name: 'gosolve.io',
  faviconPath: 'https://gosolve.io/wp-content/uploads/2022/03/cropped-ikona1-192x192.png',
  linksMap: new Map([
    [
    "java", [
      "golang-vs-java-comparison-why-are-more-and-more-companies-moving-from-java-to-golang", // 2023-05-10
      // END: 2023java
      // END: 2024java
      // END: java
    ]], [
    "go", [
      "python-vs-golang-features-pros-cons-and-areas-of-use", // 2023-01-28
      "golang-type-alias", // 2023-02-16
      "how-the-biggest-ever-go-update-brought-native-fuzzing", // 2023-03-03
      "go-vet-command-and-its-usage", // 2023-03-12
      "golang-cast-go-type-casting-and-type-conversion", // 2023-04-18
      "what-is-golang", // 2023-05-02
      "go-tracing-golangs-approach-to-concurrency", // 2023-06-08
      "golang-logging-best-practices", // 2023-06-21
      "golang-select-channel", // 2023-09-16
      "go-threads", // 2023-09-30
      // END: 2023go
      // END: 2024go
      // END: go
    ]], [
    "py", [
      "python-vs-golang-features-pros-cons-and-areas-of-use", // 2023-01-28
      // END: 2023py
      // END: py
    ]], [
    "system-design", [
      "e-commerce-in-the-cloud-how-to-power-your-online-store-with-cloud-computing", // 2023-09-23
      "scalable-cloud-computing", // 2023-05-18
      "cloud-for-enterprises", // 2023-07-12
      "getting-into-cloud-application-development", // 2023-08-12
      "switching-to-cloud-app-development", // 2023-08-22
      "cloud-migration-strategy-challenges-risk-mitigation-and-transition-models", // 2023-08-28
      "cloud-mobile-apps", // 2023-09-03
      // END: 2023system-design
      // END: system-design
    ]], [
      "all", [
      Y2025,
      Y2024,
      Y2023,
    ]],
  ])
}