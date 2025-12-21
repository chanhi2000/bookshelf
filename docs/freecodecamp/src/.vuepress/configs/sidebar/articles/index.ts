import type { SidebarGroupOptions } from 'vuepress-theme-hope'
/*
import { template as TEMPLATE_HACKINGWITHSWIFT } from './hackingwithswift.com';
import { template as TEMPLATE_KODECO } from './kodeco.com'; 
import { template as TEMPLATE_DONNYWALS } from './donnywals.com';
import { template as TEMPLATE_DOUGGREGOR } from './douggregor.net';
import { template as TEMPLATE_D2 } from './d2.naver.com';
*/
import { template as TEMPLATE_FREECODECAMP } from './freecodecamp.org';
/*
import { template as TEMPLATE_FRONTENDMASTER } from './frontendmasters.com';
import { template as TEMPLATE_CSS_TRICKS } from './css-tricks.com';
import { template as TEMPLATE_SMASHINGMAGAZINE } from './smashingmagazine.com';
import { template as TEMPLATE_DIGITALOCEAN } from './digitalocean.com';
import { template as TEMPLATE_DOCKER } from './docker.com';
import { template as TEMPLATE_TECMINT } from './tecmint.com';
import { template as TEMPLATE_KOTZILLA } from './blog.kotzilla.io';
import { template as TEMPLATE_OUTCOMES_SCHOOL } from './outcomeschool.com';
import { template as TEMPLATE_LEARNK8S } from './learnk8s.io';
import { template as TEMPLATE_LOGROCKET } from './blog.logrocket.com';
import { template as TEMPLATE_REALPYTHON } from './realpython.com';
import { template as TEMPLATE_MILAN_JOVANOVIC } from './milanjovanovic.tech';
import { template as TEMPLATE_EVENT_DRIVEN } from './event-driven.io';
import { template as TEMPLATE_PACKAGEMAIN_TECH } from './packagemain.tech';
import { template as TEMPLATE_GOSOLVE } from './gosolve.io';
import { template as TEMPLATE_BRAMUS } from './bram.us';
import { template as TEMPLATE_ONCEUPON } from './onceupon.github.io';
import { template as TEMPLATE_KAKAO_TECH } from './tech.kakao.com';
import { template as TEMPLATE_KAKAO_PAY_TECH } from './tech.kakaopay.com';
import { template as TEMPLATE_KAKAO_ENT } from './fe-developers.kakaoent.com';
import { template as TEMPLATE_NHN } from './meetup.nhncloud.com';
import { template as TEMPLATE_GANGNAMUNNI } from './blog.gangnamunni.com';
import { template as TEMPLATE_WOOWAHAN } from './techblog.woowahan.com';
import { template as TEMPLATE_GMARKET } from './dev.gmarket.com'; 
import { template as TEMPLATE_LINECORP } from './engineering.linecorp.com';
import { template as TEMPLATE_INFLAB } from './tech.inflab.com';
import { template as TEMPLATE_TOSS } from './toss.tech';
import { template as TEMPLATE_BANKSALAD } from './blog.banksalad.com';
import { template as TEMPLATE_TOAST } from './ui.toast.com';
import { template as TEMPLATE_OLIVEYOUNG } from './oliveyoung.tech';
import { template as TEMPLATE_KURLY } from './helloworld.kurly.com';
import { template as TEMPLATE_KT_ACADEMY } from './kt.academy';
import { template as TEMPLATE_DROIDCON } from './droidcon.com';
import { template as TEMPLATE_SITEPOINT } from './sitepoint.com';
import { template as TEMPLATE_ITS_FOSS } from './itsfoss.com'; 
import { template as TEMPLATE_YOZM } from './yozm.wishket.com';
import { template as TEMPLATE_POPIT } from './popit.kr';
import { template as TEMPLATE_DEVKUMA } from './devkuma.com';
import { template as TEMPLATE_DEVTOOLSTIPS } from './devtoolstips.org';
import { template as TEMPLATE_PICCALILLI } from './piccalil.li';
import { template as TEMPLATE_JOHNNYREILLY } from'./johnnyreilly.com';
import { template as TEMPLATE_CODEMAZE } from './code-maze.com';
import { template as TEMPLATE_C_SHARPCORNER } from './c-sharpcorner.com';
import { template as TEMPLATE_TOWARDSDATASCIENCE } from './towardsdatascience.com';
import { template as TEMPLATE_SHOPIFY } from './shopify.engineering';
import { template as TEMPLATE_RUTGO_LETSGO } from './tistory.com/rutgo-letsgo';
import { template as TEMPLATE_ANTONIOLEIVA } from './antonioleiva.com';
import { template as TEMPLATE_ZUMINTERNET } from './zuminternet.github.io';
import { template as TEMPLATE_IMQA } from './blog.imqa.io';
import { template as TEMPLATE_AB180 } from './engineering.ab180.co';
import { template as TEMPLATE_CODING_EVERYBODY } from './codingeverybody.kr';
*/

const EXT_MD = "md";
const DEFAULT_KEY_ALL = "all"
const PATH_BASE_ARTICLES = ""

export type SidebarInfoTemplate = {
  name: string,
  faviconPath: string,
  linksMap: Map<string, any[]>,
}

export type SidebarInfoSubgroupTemplate = {
  text: string | '',
  collapsible: boolean | true,
  icon: string | '',
  subPath: string,
  children: (string|SidebarInfoSubgroupTemplate)[]
}

export type SidebarYeargroupTemplate = {
  text: string | '',
  collapsible: boolean | true,
  children: (string|SidebarInfoSubgroupTemplate)[]
}

export const sidebarByTemplate = (
  itemTemplate: SidebarInfoTemplate, 
  type: string = DEFAULT_KEY_ALL
): SidebarGroupOptions => {
  let _all: string[] = [];
  for (const [_, values] of itemTemplate.linksMap) {
    _all.push(...values);
  }
  
  const _children: any[] = (
    itemTemplate.linksMap.get(type)
  )?.map((e: any) => {
    // const bsaePath = `${PATH_BASE_ARTICLES}/${itemTemplate.name}`
    const bsaePath = `${PATH_BASE_ARTICLES}`
    switch(typeof e) {
      case 'string': 
        return `${bsaePath}/${e}.${EXT_MD}`
        // return `${PATH_BASE_ARTICLES}/${itemTemplate.name}/${e}.${EXT_MD}`
      case 'object': // SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate
        return {
          text: e?.text,
          collapsible: e?.collapsible ?? true,
          icon: e?.icon ?? '',
          children: (e?.children ?? []).map((a: (string|SidebarInfoSubgroupTemplate)) => {
            const _subPathTmp = (e?.subPath ?? '')
            const _subPath = (_subPathTmp == '') ? _subPathTmp : `${_subPathTmp}/`
            const result = (typeof a == 'string')
              ? `${bsaePath}/${_subPath}${a}.${EXT_MD}`
              : {
                text: a?.text,
                collapsible: a?.collapsible ?? true,
                icon: a?.icon ?? '',
                children: (a?.children ?? []).map((el: string|SidebarInfoSubgroupTemplate) => {
                  return `${bsaePath}/${a?.subPath ?? ''}/${el}.${EXT_MD}`
                }),
              }
            return result
            })
          }
      default:
        return ''
    }
  }) ?? []

  return {
    text: itemTemplate.name,
    collapsible: true,
    icon: itemTemplate.faviconPath,
    children: _children
  }
}

export const articleSidebars = {
  // hackingwithswift:   (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => TEMPLATE_HACKINGWITHSWIFT,
  freecodecamp:       (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_FREECODECAMP, type),
  /*
  kodeco:             (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_KODECO, type),
  frontendmaster:     (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_FRONTENDMASTER, type),
  cssTricks:          (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_CSS_TRICKS, type),
  smashingmagazion:   (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_SMASHINGMAGAZINE, type),
  digitalocean:       (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_DIGITALOCEAN, type),
  docker:             (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_DOCKER, type),
  tecmint:            (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_TECMINT, type),
  kotzilla:           (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_KOTZILLA, type),
  outcomesSchool:     (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_OUTCOMES_SCHOOL, type),
  learnk8s:           (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_LEARNK8S, type),
  logrocket:          (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_LOGROCKET, type),
  realpython:         (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_REALPYTHON, type),
  yozm:               (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_YOZM, type),
  kakaoTech:          (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_KAKAO_TECH, type),
  kakaoPayTech:       (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_KAKAO_PAY_TECH, type),
  kakaoEnt:           (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_KAKAO_ENT, type),
  milanJovanovic:     (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_MILAN_JOVANOVIC, type),
  packgemainTech:     (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_PACKAGEMAIN_TECH, type),
  gosolve:            (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_GOSOLVE, type),
  eventDriven:        (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_EVENT_DRIVEN, type),
  bramus:             (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_BRAMUS, type),
  onceupon:           (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_ONCEUPON, type),
  d2:                 (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_D2, type),
  nhn:                (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_NHN, type),
  gangnamunni:        (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_GANGNAMUNNI, type),
  popit:              (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_POPIT, type),
  woowahan:           (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_WOOWAHAN, type),
  gmarket:            (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_GMARKET, type),
  linecorp:           (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_LINECORP, type),
  inflab:             (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_INFLAB, type),
  toss:               (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_TOSS, type),
  banksalad:          (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_BANKSALAD, type),
  toast:              (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_TOAST, type),
  oliveyoung:         (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_OLIVEYOUNG, type),
  kurly:              (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_KURLY, type),
  ktAcademy:          (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_KT_ACADEMY, type),
  droidcon:           (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_DROIDCON, type),
  sitepoint:          (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_SITEPOINT, type),
  itsfoss:            (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_ITS_FOSS, type),
  douggregor:         (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_DOUGGREGOR, type),
  donnywals:          (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_DONNYWALS, type),
  piccalilli:         (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_PICCALILLI, type),
  johnnyreilly:       (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_JOHNNYREILLY, type),
  codemaze:           (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_CODEMAZE, type),
  csharpcorner:       (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_C_SHARPCORNER, type),
  devkuma:            (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_DEVKUMA, type),
  devtoolstips:       (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_DEVTOOLSTIPS, type), 
  towardsdatascience: (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_TOWARDSDATASCIENCE, type),
  shopify:            (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_SHOPIFY, type),
  rutgoLetsgo:        (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_RUTGO_LETSGO, type),
  antonioleiva:       (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_ANTONIOLEIVA, type),
  zuminternet:        (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_ZUMINTERNET, type),
  imqa:               (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_IMQA, type),
  ab180:              (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_AB180, type),
  codingEverybody:    (type: string = DEFAULT_KEY_ALL): SidebarGroupOptions => sidebarByTemplate(TEMPLATE_CODING_EVERYBODY, type),
  */
}