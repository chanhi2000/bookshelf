import { SidebarInfoTemplate, SidebarInfoSubgroupTemplate } from ".";

const HTML: SidebarInfoSubgroupTemplate = { // 2022-03-02
  text: 'HTML',
  collapsible: true,
  icon: 'fa-brands fa-html5',
  subPath: 'html',
  children: [
    'README',
    'doctype-html',
  ]
}

const HTML_TAG: SidebarInfoSubgroupTemplate = { // 2022-03-02
    text: 'HTML 태그',
    collapsible: true,
    icon: 'fa-brands fa-html5',
    subPath: 'html/html-tag',
    children: [
      'README',
      'a',
      'abbr',
      'address',
      'article',
      'aside',
      'blockquote',
      'body',
      'br',
      'button',
      'cite',
      'dd',
      'del',
      'details',
      'dfn',
      'div',
      'dl',
      'dt',
      'em',
      'fieldset',
      'figcaption',
      'figure',
      'footer',
      'form',
      'h1-h6',
      'head',
      'header',
      'hr',
      'html',
      'iframe',
      'img',
      'input',
      'ins',
      'kbd',
      'label',
      'legend',
      'li',
      'link',
      'main',
      'mark',
      'menu',
      'meta',
      'nav',
      'noscript',
      'ol',
      'p',
      'picture-source',
      'q',
      'script',
      'section',
      'select',
      'span',
      'strong',
      'style',
      'sub',
      'summary',
      'sup',
      'template',
      'textarea',
      'time',
      'title',
      'ul',
    ]
  }

export const template: SidebarInfoTemplate = {
  name: "codingeverybody.kr",
  faviconPath: "https://codingeverybody.kr/wp-content/uploads/cropped-favicon-origin-192x192.png",
  linksMap: new Map([
    [
    "html", [
      HTML,
      HTML_TAG,
    ]],[
    "all", [
      HTML,
      HTML_TAG,
    ]],
  ])
}
