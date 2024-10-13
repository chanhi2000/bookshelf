import { SidebarInfoTemplate } from ".";

export const template: SidebarInfoTemplate = {
  name: 'tech.kakaopay.com',
  faviconPath: 'https://tech.kakaopay.com/favicon.ico',
  linksMap: new Map([
    [
    "java-spring", [
      "r2dbc-connection-pool-missing", // 2024-06-11
      "url-is-strange", // 2024-09-26
    ]],[
    "all", [
      "r2dbc-connection-pool-missing", // 2024-06-11
      "url-is-strange", // 2024-09-26
    ]]
  ])
}