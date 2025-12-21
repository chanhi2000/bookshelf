import { theme } from "@bookshelf/shared-vuepress"
/* import { AVAILABLE_SERVICES } from "vuepress-plugin-components";
import pkg from "vuepress-plugin-components/package.json" with { type: "json" }; */
import {
  // head,
  navbarEn,
  sidebarEn,
} from './configs'

export default theme("freecodecamp.org", {
  navbar: navbarEn,
  sidebar: sidebarEn,
})
