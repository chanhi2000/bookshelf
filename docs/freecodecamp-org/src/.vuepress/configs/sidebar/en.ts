import { sidebar } from 'vuepress-theme-hope'
import { articleSidebars as asb } from './articles'

export const sidebarEn = sidebar({
  '/fcc/':           [asb.freecodecamp()],
})