import { navbar } from "vuepress-theme-hope";

export const navbarEn = navbar([
  { // News
    text: '', 
    icon: 'fas fa-rss',
    link: '/news.md'
  }, {
    text: '',
    icon: 'fas fa-keyboard',
    children: [
      {
        text: 'hackingwithswift.com',
        icon: 'https://hackingwithswift.com/favicon.svg',
        link: '/hackingwithswift.com/README.md'
      }, {
        text: 'freecodecamp.org',
        icon: 'https://cdn.freecodecamp.org/universal/favicons/favicon.ico',
        link: '/freecodecamp.org/README.md'
      }, {
        text: 'kodeco.com',
        icon: 'https://kodeco.com/favicon.ico',
        link: '/kodeco.com/README.md'
      }, {
        text: 'blog.kotzilla.io',
        icon: 'https://blog.kotzilla.io/hubfs/favicon.png',
        link: '/blog.kotzilla.io/README.md'
      }, {
        text: 'kt.academy',
        icon: 'https://kt.academy/logo.png',
        link: '/kt.academy/README.md'
      }, {
        text: 'droidcon.com',
        icon: 'https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png',
        link: '/droidcon.com/README.md'
      }, {
        text: 'outcomeschool.com',
        icon: 'https://outcomeschool.com/static/favicons/apple-touch-icon.png',
        link: '/outcomeschool.com/README.md'
      }, {
        text: 'frontendmasters.com',
        icon: 'https://frontendmasters.com/favicon.ico',
        link: '/frontendmasters.com/README.md'
      }, {
        text: 'smashingmagazine.com',
        icon: 'https://smashingmagazine.com/images/favicon/favicon.svg',
        link: '/smashingmagazine.com/README.md'
      }, {
        text: 'blog.logrocket.com',
        icon: '/assets/image/blog.logrocket.com/favicon.png',
        link: '/blog.logrocket.com/README.md'
      }, {
        text: 'digitalocean.com',
        icon: 'https://digitalocean.com/_next/static/media/favicon.594d6067.ico',
        link: '/digitalocean.com/README.md'
      }, {
        text: 'antonioleiva.com',
        icon: '/assets/image/antonioleiva.com/favicon.png',
        link: '/antonioleiva.com/README.md'
      }, {
        text: 'johnnyreilly.com',
        icon: 'https://johnnyreilly.com/favicon.ico',
        link: '/johnnyreilly.com/README.md'
      }, {
        text: 'code-maze.com',
        icon: '/assets/image/code-maze.com/favicon.png',
        link: '/code-maze.com/README.md'
      }, {
        text: 'milanjovanovic.tech',
        icon: 'https://milanjovanovic.tech/profile_favicon.png',
        link: '/milanjovanovic.tech/README.md'
      }, {
        text: 'shopify.engineering',
        icon: 'https://cdn.shopify.com/static/shopify-favicon.png',
        link: '/shopify.engineering/README.md'
      }, {
        text: 'devtoolstips.org',
        icon: 'https://devtoolstips.org/assets/favicon.ico',
        link: '/devtoolstips.org/README.md'
      }, {
        text: 'piccalil.li',
        icon: 'https://piccalil.li/favicons/apple-touch-icon.png',
        link: '/piccalil.li/README.md'
      }, {
        text: 'sitepoint.com',
        icon: 'https://sitepoint.com/favicons/512x512.png',
        link: '/sitepoint.com/README.md'
      }, {
        text: 'event-driven.io',
        icon: '/assets/image/event-driven.io/favicon.jfif',
        link: '/event-driven.io/README.md'
      }, {
        text: 'packagemain.tech',
        icon: 'https://substack-post-media.s3.amazonaws.com/public/images/2ea54e25-eaa6-4630-bfc0-10b8cfdce894/apple-touch-icon-1024x1024.png',
        link: '/packagemain.tech/README.md'
      }, {
        text: 'towardsdatascience.com',
        icon: 'https://cdn-images-1.medium.com/v2/resize:fill:128:128/1*VzTUkfeGymHP4Bvav-T-lA.png',
        link: '/towardsdatascience.com/README.md'
      }, {
        text: 'douggregor.net',
        icon: 'fas fa-globe',
        link: '/douggregor.net/README.md'
      }, {
        text: 'tech.kakao.com',
        icon: 'https://www.kakaocorp.com/page/favicon.ico',
        link: '/tech.kakao.com/README.md'
      }, {
        text: 'tech.kakaopay.com',
        icon: 'https://tech.kakaopay.com/favicon.ico',
        link: '/tech.kakaopay.com/README.md'
      }, {
        text: 'fe-developers.kakaoent.com',
        icon: 'https://fe-developers.kakaoent.com/favicon-32x32.png?v=44803cb16c1e2debd3984cf2e8cb2ded',
        link: '/fe-developers.kakaoent.com/README.md'
      }, {
        text: 'yozm.wishket.com',
        icon: 'https://yozm.wishket.com/static/renewal/img/global/gnb_yozmit.svg',
        link: '/yozm.wishket.com/README.md'
      }, {
        text: 'popit.kr',
        icon: 'https://popit.kr/wp-content/uploads/2016/08/favicon_32x32.png',
        link: '/popit.kr/README.md'
      }, {
        text: 'devkuma.com',
        icon: 'https://devkuma.com/favicons/favicon.ico',
        link: '/devkuma.com/README.md'
      }, {
        text: 'blog.gangnamunni.com',
        icon: 'https://blog.gangnamunni.com/favicon.ico',
        link: '/blog.gangnamunni.com/README.md'
      }, {
        text: 'codingeverybody.kr',
        icon: 'https://codingeverybody.kr/wp-content/uploads/cropped-favicon-origin-192x192.png',
        link: '/codingeverybody.kr/README.md'
      }, 
    ]
  }, {
    text: '',
    icon: 'fas fa-network-wired',
    children: [
      {
        text: 'tecmint.com',
        icon: 'https://tecmint.com/wp-content/uploads/2020/07/favicon.ico',
        link: '/tecmint.com/README.md'
      }, {
        text: 'learnk8s.io',
        icon: 'https://static.learnk8s.io/f7e5160d4744cf05c46161170b5c11c9.svg',
        link: '/learnk8s.io/README.md'
      }, {
        text: 'itsfoss.com',
        icon: 'https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png',
        link: '/itsfoss.com/README.md'
      },     
    ]
  },
  
])