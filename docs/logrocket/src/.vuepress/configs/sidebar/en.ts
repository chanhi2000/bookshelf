import { sidebar } from "@bookshelf/shared-vuepress"
import { articleSidebars as asb } from './articles'

export const sidebarEn = sidebar({
  '/':           [asb.logrocket()],
})