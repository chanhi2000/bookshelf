import { sidebar } from 'vuepress-theme-hope'
import { articleSidebars as asb } from './articles'

export const sidebarEn = sidebar({
  '/freecodecamp.org/': [asb.freecodecamp()],
  '/hackingwithswift.com/': [asb.hackingwithswift()],
  '/milanjovanovic.tech/': [asb.milanJovanovic()],
  '/yozm.wishket.com/': [asb.yozm()]
})