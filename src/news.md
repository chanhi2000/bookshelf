---
lang: ko-KR
title: News
description: My Daily News Collections
icon: fas fa-rss
category:
  - News
tag:
  - news
head:
  - - meta:
    - property: og:title
      content: News
    - property: og:description
      content: My Daily News Collections
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/news.html
---

# {{ $frontmatter.description }} 관련

<!-- 
<ShieldsGroup logos="git,gitlfs,gitignoredotio,github,awesomelists"/> 
-->

---

## <FontIcon icon="fas fa-clock-rotate-left"/>Dashboard

<DevGithubItems />
<DevHackerNewsItems /> 

---

## <FontIcon icon="fas fa-bookmark"/>Bookmarks

::: tabs

@tab:active News

```component VPCard
{
  "title": "GeekNews",
  "desc": "개발/기술/스타트업 뉴스 서비스",
  "link": "https://news.hada.io",
  "logo": "https://news.hada.io/logo.png",
  "background": "rgba(56, 59, 64, 0.2)"
}
```

```component VPCard
{
  "title": "어썸데브블로그",
  "desc": "국내 개발/기술 블로그 모음(only 실명으로).",
  "link": "https://awesome-devblog.netlify.app/korean/people/feeds",
  "logo": "https://awesome-devblog.netlify.app/favicon.ico",
  "background": "rgba(230,230,230,0.2)"
}
```

<SiteInfo
  name="üntil"
  desc="성장하는 사람들을 위한 블로그 서비스. 다른 사람들과 함께 성장해요."
  url="https://until.blog/"
  logo="https://until.blog/favicon.ico"
  preview="https://until.blog/og.png"/>

<SiteInfo
  name="데브허브 | DEVHUB | 최신 개발 트렌드"
  desc="최신 개발 트렌드는 데브허브"
  url="https://devhub-ko.vercel.app/"
  logo="https://devhub-ko.vercel.app/favicon.ico"
  preview="https://devhub-ko.vercel.app/logos/devhub-high-resolution-logo.png"/>

<SiteInfo
  name="메일리"
  desc="메일러를 위한 뉴스레터 플랫폼"
  url="https://maily.so/"
  logo="https://maily.so/apple-touch-icon.png"
  preview="https://cdn.maily.so/images/maily-og-image.png"/>

```component VPCard
{
  "title": "DAILY ROTATION",
  "desc": "DAILY ROTATION, Tech News, current news headlines from thousands of tech related sites, science news, web based RSS reader for tech headlines from thousands of sites",
  "link": "https://www.dailyrotation.com/",
  "logo": "https://www.dailyrotation.com/favicon.ico",
  "background": "rgba(8,49,90,0.2)"
}
```

```component VPCard
{
  "title": "Two Stop Bits",
  "desc": "Two Stop Bits is a discussion web site about retro computing and gaming.",
  "link": "https://twostopbits.com/",
  "logo": "https://twostopbits.com/favicon.ico",
  "background": "rgba(221,221,221,0.2)"
}
```

<SiteInfo
  name="TechURLs - A neat technology news aggregator"
  desc="Read tech news from the most popular tech websites in one place."
  url="https://techurls.com/"
  logo="https://techurls.com/favicon-techurls.png"
  preview="https://techurls.com/images/preview-image-techurls.png"/>

```component VPCard
{
  "title": "Viral news today",
  "desc": "Top rated news from all over the Web",
  "link": "https://jimmyr.com/",
  "logo": "https://jimmyr.com/logo.webp",
  "background": "rgba(245,245,245,0.2)"
}
```

```component VPCard
{
  "title": "Engineering Blogs",
  "desc": "...",
  "link": "https://engineeringblogs.xyz/",
  "background": "rgba(0,136,255,0.2)"
}
```

<SiteInfo
  name="Technology Forum / Message Board For Talking Tech — Raddle"
  desc="Technology discussion "
  url="https://raddle.me/f/Tech  "
  logo="https://raddle.me/favicon.ico"
  preview="https://raddle.me/apple-touch-icon-precomposed.png"/>

<SiteInfo
  name="Technology - Lemmy"
  desc="This is the official technology community of Lemmy.ml sfor all news related to creation and use of technology, and to facilitate civil, meaningful discussion around it. — Ask in DM before posting product reviews or ads. All such posts otherwise are subject to removal"
  url="https://lemmy.ml/c/technology"
  logo="https://lemmy.ml/pictrs/image/fa6d9660-4f1f-4e90-ac73-b897216db6f3.png"
  preview="https://lemmy.ml/pictrs/image/2QNz7bkA1V.png"/>

<SiteInfo
  name="Trending | Bear Blog"
  desc="Discover articles and blogs on Bear"
  url="https://bearblog.dev/discover/"
  logo="https://bear-images.sfo2.cdn.digitaloceanspaces.com/herman-1683556668-0.png"
  preview="https://bearblog.dev/static/favicon.ico"/>

```component VPCard
{
  "title": "Outsider's Dev Story",
  "desc": "Stay Hungry. Stay Foolish. Don't Be Satisfied.",
  "link": "https://blog.outsider.ne.kr/category/Newsletter",
  "logo": "https://blog.outsider.ne.kr/favicon.ico",
  "background": "rgba(255,255,255,0.2)"
}
```

```component VPCard
{
  "title": "개발자스럽다",
  "desc": "블로그와 SNS에서 주기적으로 기술 정보를 찾고 분류하여 가치를 더해 공유합니다.",
  "link": "https://blog.gaerae.com",
  "logo": "https://blog.gaerae.com/favicon.ico",
  "background": "rgba(75,75,75,0.2)"
}
```

```component VPCard
{
  "title": "어썸블로그",
  "desc": "국내의 좋은 블로그 글들을 매일 배달해줍니다.",
  "link": "https://awesome-blogs.petabytes.org/feeds?group=dev",
  "logo": "https://awesome-blogs.petabytes.org/favicon.ico",
  "background": "rgba(20,20,20,0.2)"
}
```

```component VPCard
{
  "title": "클리앙 : 팁과강좌",
  "desc": "팁과강좌, 사용기 게시판의 게시물 모음입니다.",
  "link": "https://www.clien.net/service/board/lecture",
  "logo": "https://www.clien.net/service/image/favicon.ico",
  "background": "rgba(37,47,61,0.2)"
}
```

```component VPCard
{
  "title": "강좌/팁 1 페이지 | 다모앙 |  DAMOANG",
  "desc": "다모앙은 각 개인의 아이디어가 모여 강력한 집단지성을 형성하고, 공정하고 투명한 협업으로 우리 모두의 꿈을 현실로 만드는 소통의 광장입니다.",
  "link": "https://damoang.net/lecture",
  "logo": "https://damoang.net/theme/damoang/img/favicon/apple-touch-icon.png",
  "background": "rgba(49,108,244,0.2)"
}
```

```component VPCard
{
  "title": "주간 뉴스 - Sangkon Han(SigmaDream, sd or SD)",
  "desc": "내가 한 주간 읽고/실행한 외국의 기사를 모아서 소개하는 Weekly 뉴스!",
  "link": "https://www.sangkon.com/tag/weekly/",
  "logo": "https://www.sangkon.com/favicon.ico",
  "background": "rgba(21,23,26,0.2)"
}
```

```component VPCard
{
  "title": "Vx Underground",
  "desc": "The largest collection of malware source code, samples, and papers on the internet.",
  "link": "https://vx-underground.org/",
  "logo": "https://vx-underground.org/favicon.ico",
  "background": "rgba(0,0,0,0.2)"
}
```

```component VPCard
{
  "title": "컴퓨터 vs 책: B급 프로그래머",
  "desc": "컴퓨터와 책에 대한 블로그입니다.",
  "link": "https://jhrogue.blogspot.com/search/label/B%EA%B8%89%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8",
  "logo": "https://jhrogue.blogspot.com/favicon.ico",
  "background": "rgba(82.151.183,0.2)"
}
```

```component VPCard
{
  "title": "BLEX",
  "desc": "누구나 경험과 지식을 공유할 수 있는 블로그 플랫폼입니다. 마크다운으로 글을 작성할 수 있으며 코드 강조 표시, 수식, 이미지 삽입 등을 지원합니다. 방문자가 내 포스트를 언제, 어디서, 어떻게 찾는지 분석할 수 있습니다. 단순한 디자인으로 사용자가 우리의 경험을 보다 쉽게 탐색할 수 있습니다.",
  "link": "https://blex.me/",
  "logo": "https://blex.me/favicon.ico",
  "background": "rgba(160,118,241,0.2)"
}
```

```component VPCard
{
  "title": "iOS Dev Weekly - The best iOS development links, every Friday",
  "desc": "Subscribe to a hand-picked round-up of the best iOS development links every week. Curated by Dave Verwer and published every Friday. Free.",
  "link": "https://iosdevweekly.com",
  "logo": "https://dxj7eshgz03ln.cloudfront.net/production/publication/publication_icon/1/favicon_442526aa-1e62-489a-87ac-8f09b5f0f867.png",
  "background": "rgba(2,107,184,0.2)"
}
```

```component VPCard
{
  "title": "Kotlin Weekly",
  "desc": "Your weekly dose of Kotlin",
  "link": "https://kotlinweekly.net/",
  "logo": "https://kotlinweekly.net/img/favicon.png",
  "background": "rgba(94,67,139,0.2)"
}
```

<SiteInfo
  name="Android Weekly - Free weekly Android & Kotlin development newsletter"
  desc="Android Weekly is a free newsletter that helps you to stay cutting-edge with your Android Development"
  url="https://androidweekly.net/"
  logo="https://androidweekly.net/assets/favicon.ico"
  preview="https://androidweekly.net/assets/newsletter.jpg"/>


```component VPCard
{
  "title": "Awesome Java Projects",
  "desc": "This is a list of repositories sorted by GitHub stars.",
  "link": "https://awesomejava.resamvi.io/",
  "background": "rgba(0,0,0,0.2)"
}
```

```component VPCard
{
  "title": "FreeFrontend",
  "desc": "Free hand-picked HTML, CSS and JavaScript (jQuery, React, Vue) code examples, tutorials and articles.",
  "link": "https://freefrontend.com/",
  "logo": "https://freefrontend.com/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "44BITS: IT 뉴스, 클라우드 컴퓨팅, 프로그래밍, 컨테이너, 리눅스",
  "desc": "44BITS는 IT 뉴스, 프로그래밍, 클라우드, 컨테이너, 리눅스 등을 주로 다루는 기술 블로그입니다.",
  "link": "https://www.44bits.io/ko",
  "logo": "https://d2uleea4buiacg.cloudfront.net/assets/favicon.png",
  "background": "rgba(74,80,86,0.2)"
}
```

```component VPCard
{
  "title": "abseil / C++ Tips of the Week",
  "desc": "Battle-tested, Mom-approved",
  "link": "https://abseil.io/tips/",
  "logo": "https://abseil.io/favicons/favicon.ico",
  "background": "rgba(40,53,147,0.2)"
}
```

<VPBanner
  title="TILNOTE - AI 노트 & 블로그"
  content="틸노트는 클라우드 노트+ 블로그 서비스입니다."
  logo="https://tilnote.io/favicon.ico"
  :actions='[
    {
      text: "TILNOTE GIST - 유튜브 요약 & 웹 페이지 요약",
      link: "https://tilnote.io/gist"
    }, {
      text: "AI News - TILNOTE",
      link: "https://tilnote.io/news",
      type: "default"
    }
  ]'
/>

```component VPCard
{
  "title": "Search HackerNews",
  "desc": "Use Vectara for conversational search",
  "link": "https://hackernews.demo.vectara.com/",
  "logo": "https://hackernews.demo.vectara.com/vectara-favicon.png",
  "background": "rgba(243,247,251,0.2)"
}
```

```component VPCard
{
  "title": "Next AI News",
  "desc": "A full-stack replica of HN using Next.js and AI generated content. (rauchg/next-ai-news)",
  "link": "https://next-ai-news.vercel.app",
  "logo": "https://next-ai-news.vercel.app/favicon.ico",
  "background": "rgba(255, 153, 102, 0.2)"
}
```

<SiteInfo
  name="BleepingComputer | Cybersecurity, Technology News and Support"
  desc="BleepingComputer is a premier destination for cybersecurity news for over 20 years, delivering breaking stories on the latest hacks, malware threats, and how to protect your devices."
  url="https://www.bleepingcomputer.com/"
  logo="https://www.bleepstatic.com/favicon/bleeping.ico"
  preview="https://www.bleepstatic.com/logo/bleepingcomputer-logo.png"/>

```component VPCard
{
  "title": "DataTau",
  "desc": "Hacker News Clone - Data Science Newsboard",
  "link": "https://datatau.net",
  "logo": "https://datatau.net/static/img/datatau.png",
  "background": "rgba(0,180,180,0.2)"
}
```

```component VPCard
{
  "title": "ZSync",
  "desc": "zsync - high quality discussion",
  "link": "https://zsync.xyz",
  "logo": "https://zsync.xyz/favicon.webp",
  "background": "rgba(46,49,84,0.2)"
}
```

```component VPCard
{
  "title": "데일리시큐",
  "desc": "인터넷 신문",
  "link": "https://www.dailysecu.com/",
  "logo": "https://www.dailysecu.com/image/logo/snslogo_20201208012525.jpg",
  "background": "rgba(237,110,34,0.2)"
}
```

```component VPCard
{
  "title": "ByteByteGo",
  "desc": "ByteByteGo Newsletter",
  "link": "https://blog.bytebytego.com",
  "logo": "https://substackcdn.com/image/fetch/w_96,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F8a5609ae-1239-4400-9491-6010a15c4d60_504x504.png",
  "background": "rgba(140, 234, 216, 0.2)"
}
```

```component VPCard
{
  "title": "A List Apart", 
  "desc": "For people who make websites", 
  "link": "https://alistapart.com", 
  "logo": "https://149572954.v2.pressablecdn.com/wp-content/themes/ala/assets/img/icon_navigation-laurel.svg", 
  "background": "rgba(255, 255, 255, 0.2)"
}
```

```component VPCard
{
  "title": "Model & API Providers Analysis | Artificial Analysis",
  "desc": "Comparison and analysis of AI models and API hosting providers. Independent benchmarks across key metrics including quality, price, performance and speed (throughput & latency).",
  "link": "https://artificialanalysis.ai/",
  "logo": "https://artificialanalysis.ai/favicon.ico",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "디자인DB",
  "desc": "세상의 디자인을 만나다, 디자인DB",
  "link": "https://www.designdb.com/?menuno=668#gsc.tab=0",
  "logo": "https://www.designdb.com/images/designdb.ico",
  "background": "rgba(209,13,32,0.2)"
}
```

```component VPCard
{
  "title": "Google Trends",
  "desc": "Explore what United Statesthe world is searching for right now",
  "link": "https://trends.google.com/home?geo=US",
  "logo": "https://ssl.gstatic.com/trends/favicon.ico",
  "background": "rgba(59,102,206,0.2)"
}
```

<SiteInfo
  name="Blog | Compositional IT"
  desc="Functional First, Cloud Ready consultancy"
  url="https://www.compositional-it.com/news-blog/"
  logo="https://www.compositional-it.com/wp-content/themes/compositionalit/static/min/img/favicon.png"
  preview="https://www.compositional-it.com/wp-content/themes/compositionalit/static/min/img/placeholders/hero.jpg"/>

<SiteInfo
  name="selfh.st - Self-hosted content and software"
  desc="Self-hosted news, content, updates, launches, events, and more"
  url="https://selfh.st/"
  logo="https://selfh.st/content/images/size/w256h256/2023/09/favicon-1.png"
  preview="https://selfh.st/content/images/2024/07/selfh-st-logo-banner-3.png"/>

https://www.techmeme.com/
https://gracefullight.dev/archive/
https://interestingengineering.com/
https://paperlined.org/

<!-- 
```component VPCard
{
  "title": "머니플뉴스",
  "desc": "AI가 대신 읽어주는 뉴스",
  "link": "https://newsgpt.web.app",
  "logo": "https://newsgpt.web.app/logo192.png",
  "background": "rgba(46, 46, 46, 0.2)"
}
```
-->

<!-- END: News -->

@tab Industry

<SiteInfo
  name="대한민국 정책브리핑"
  desc="문화체육관광부에서 운영하는 대한민국 정부 정책뉴스포털. - 정책브리핑 | 정책자료 | 전문자료"
  url="https://www.korea.kr/archive/expDocMainList.do"
  logo="https://www.korea.kr/images/common/favicon.ico"
  preview="https://www.korea.kr/images/event/korea_logo_2024.jpg"/>

<SiteInfo
  name="KOTRA 해외시장뉴스"
  desc="메인"
  url="https://dream.kotra.or.kr/kotranews/index.do"
  logo="https://dream.kotra.or.kr/type/common/img/common/favicon_news.ico"
  preview="https://dream.kotra.or.kr/type/news/img/layout/logo_navi.png"/>

```component VPCard
{
  "title": "ITFIND - IT 지식포털",
  "desc": "ITFIND는 IT산업 전반에 관한 국내외 기술, 시장 및 경영 정보 등 각종 지식과 정보를 수집, DB화하여 IT관련 기업 및 기관에 제공함으로써 국가 IT 혁신역량을 제고할 목적으로 운영되고 있습니다.",
  "link": "https://www.itfind.or.kr/main.do",
  "logo": "https://www.itfind.or.kr/favicon.ico",
  "background": "rgba(42,100,197,0.2)"
}
```

```component VPCard
{
  "title": "광고정보센터",
  "desc": "광고 전문 포탈 사이트",
  "link": "https://www.adic.or.kr/index.waple",
  "background": "rgba(72,144,208,0.2)"
}
```

<SiteInfo
  name="검색어트렌드 : 네이버 데이터랩"
  desc="네이버 통합검색에서 검색된 검색어와 검색횟수를 기간별/연령별/성별로 조회할 수 있습니다."
  url="https://datalab.naver.com/keyword/trendSearch.naver"
  logo="https://ssl.pstatic.net/static.datalab/202405030736/img/favicon/android_legacy_xxxhpdi_192x192.png"
  preview="https://ssl.pstatic.net/static.datalab/img2019/datalab_og_244x244.jpg"/>

<SiteInfo
  name="카카오데이터트렌드: 검색어 인사이트"
  desc="다음 통합검색의 검색어 트렌드를 확인해 보세요."
  url="https://datatrend.kakao.com/"
  logo="https://t1.daumcdn.net/depo/datatrend/favicon.ico"
  preview="https://t1.daumcdn.net/depo/datatrend/datatrend.png"/>

<SiteInfo
  name="빅카인즈(BIG KINDS)"
  desc="뉴스빅데이터 분석시스템, 뉴스 속 키워드 관계망, 주요 이슈, 정보원, 이슈 트렌드 분석 정보 제공"
  url="https://www.bigkinds.or.kr/"
  logo="https://www.bigkinds.or.kr/images/favicon.ico;Bigkinds=94E1D68429FA4C0C2F0211A2344BDE05"
  preview="https://www.bigkinds.or.kr/assets/v3/img/common/logo_2.png"/>

<SiteInfo
  name="한국무역협회-KITA.NET"
  desc="한국무역협회 무역 통상정보, 회원/업무지원, 무역통계, 협회안내 등 서비스 안내."
  url="https://www.kita.net/"
  logo="https://www.kita.net/imgs/favicon.png"
  preview="https://kita.net/imgs/common/kita_logo_mid.png"/>

<SiteInfo
  name="DMC리포트"
  desc="시장, 소비자, 디지털 미디어 마케팅을 연구한 DMC리포트의 보고서와 시장에 공개된 콘텐츠까지 제공하는 디지털 광고&마케팅 지식 포털 서비스"
  url="https://www.dmcreport.co.kr/"
  logo="https://tsn.dmcmedia.co.kr/dmcreportCDN/DMCReportFront/images/favicon.png"
  preview="https://tsn.dmcmedia.co.kr/dmcreportCDN/DMCReportFront/images/og_img.jpg"/>

<SiteInfo
  name="증권형 크라우드펀딩 포털 - 크라우드넷(CrowdNet)"
  desc="한국예탁결제원 운영, 크라우드펀딩 제도 소개, 운영구조, 자금 조달 및 투자 방법, FAQ 등 제공."
  url="https://www.crowdnet.or.kr/index.jsp"
  logo="https://www.crowdnet.or.kr/img/favicon.ico"
  preview="http://www.crowdnet.or.kr/img/contents/img_sns.png"/>

<SiteInfo
  name="한국핀테크산업협회 - KORFIN"
  desc="대한민국 핀테크 업계를 대변하는 국내 최대의 핀테크 네트워크 기관 한국핀테크산업협회입니다."
  url="http://korfin.kr/kr/"
  logo="http://korfin.kr/kr/assets/img/common/icon_home_aos.png"
  preview="http://korfin.kr//kr/assets/img/common/sns_thumbnail.svg"/>

```component VPCard
{
  "title": "한국식품산업협회",
  "desc": "한국식품산업협회",
  "link": "https://www.kfia.or.kr/kfia/main.php",
  "logo": "https://www.kfia.or.kr/kfia/favicon.ico",
  "background": "rgba(82,156,82,0.2)"
}
```

<SiteInfo
  name="한국프랜차이즈산업협회"
  desc="프랜차이즈, 박람회, 가맹본부, 분쟁조정협의회, 프랜차이즈교육, 세미나 및 포럼 안내, 브랜드소개."
  url="http://www.ikfa.or.kr/"
  logo="http://www.ikfa.or.kr/img/favicon.png"
  preview="http://www.ikfa.or.kr/img/kfa_logo_400.png"/>

```component VPCard
{
  "title": "LG경영연구원",
  "desc": "우리는 기업의 변화와 혁신을 이끌어갑니다",
  "link": "https://www.lgbr.co.kr/index.do",
  "logo": "https://www.lgbr.co.kr/assets/images/lg_pavicon.png",
  "background": "rgba(180,83,38,0.2)"
}
```

```component VPCard
{
  "title": "전자공시시스템",
  "desc": "...",
  "link": "https://dart.fss.or.kr/",
  "logo": "https://dart.fss.or.kr/favicon.ico",
  "background": "rgba(76,165,224,0.2)"
}
```

<SiteInfo
  name="더브이씨 (THE VC) - 한국 스타트업 투자 데이터베이스"
  desc="한국 스타트업의 투자 동향과 스타트업, 비상장 기업, 액셀러레이터, 벤처캐피탈을 빠르게 파악하고 발견하세요."
  url="https://thevc.kr/"
  logo="https://thevc.kr/icons/android-icon-192x192.png"
  preview="https://ui-resources.thevc.kr/images/banners/database.jpg"/>

<SiteInfo
  name="혁신의숲 - 스타트업 성장분석 플랫폼"
  desc="스타트업 성장분석 플랫폼 혁신의숲에서 수천개 기업의 다양한 성장 데이터를 확인해 보세요."
  url="https://www.innoforest.co.kr/"
  logo="https://www.innoforest.co.kr/images/favicon/apple-touch-icon.png"
  preview="https://www.innoforest.co.kr/images/og/inno_220112.png"/>

<SiteInfo
  name="네이버페이 증권"
  desc="국내 해외 증시 지수, 시장지표, 뉴스, 증권사 리서치 등 제공"
  url="https://finance.naver.com/"
  logo="https://ssl.pstatic.net/imgstock/favi/favicon-192x192.png"
  preview="https://ssl.pstatic.net/static/m/stock/im/2016/08/og_stock-200.png"/>

```component VPCard
{
  "title": "한경 컨센서스 | 한국경제",
  "desc": "한경 컨센서스, 한경코리아마켓 국내증권, 시장의 전반적인 지표를 제공",
  "link": "https://markets.hankyung.com/consensus",
  "logo": "https://static.hankyung.com/favicon.ico",
  "background": "rgba(26,43,99,0.2)"
}
```

<SiteInfo
  name="매일경제 마켓"
  desc="국내 및 해외 증시 정보, 경제지표, 증권 뉴스, 리포트 등 제공"
  url="https://stock.mk.co.kr/"
  logo="https://static.mk.co.kr/favicon_new.ico"
  preview="https://stock.mk.co.kr/images/default.jpg"/>

<SiteInfo
  name="보도자료(목록) | 커뮤니케이션 | 한국은행"
  desc="한국은행과 관련된 보도자료 제공 게시판"
  url="https://www.bok.or.kr/portal/bbs/P0000559/list.do?menuNo=200690&searchWrd=%EA%B2%BD%EC%98%81%EB%B6%84%EC%84%9D&searchCnd=1&sdate=&edate="
  logo="https://www.bok.or.kr/static/commons/bok.ico"
  preview="https://www.bok.or.kr/static/portal/img/common/logo.png"/>

<SiteInfo
  name="KPMG Korea - KPMG 한국"
  desc="삼정KPMG는 회계감사 서비스를 비롯하여 조세 및 재무 경영 진단, Financing, 자산관리에 이르기까지 기업 경영 전반에 걸친 종합적인 서비스를 제공합니다."
  url="https://kpmg.com/kr/ko/home.html"
  logo="https://kpmg.com/etc/designs/default/kpmg/favicons/apple-touch-icon-180x180-precomposed.png"
  preview="https://assets.kpmg.com/is/image/kpmg/kpmg-enterance:cq5dam.web.1200.630"/>

```component VPCard
{
  "title": "Samil PwC",
  "desc": "삼일회계법인 홈페이지에 오신 것을 환영합니다.",
  "link": "https://www.pwc.com/kr/ko.html",
  "logo": "https://www.pwc.com/favicon.ico",
  "background": "rgba(193,83,34,0.2)"
}
```

```component VPCard
{
  "title": "PwC: Building trust for today and tomorrow",
  "desc": "We are a community of solvers combining human ingenuity, experience and technology innovation to help organisations build trust and deliver sustained outcomes.",
  "link": "https://www.pwc.com/gx/en.html",
  "logo": "https://www.pwc.com/favicon.ico",
  "background": "rgba(193,83,34,0.2)"
}
```

<SiteInfo
  name="KOTRA 해외시장뉴스"
  desc="메인"
  url="https://dream.kotra.or.kr/kotranews/index.do"
  logo="https://dream.kotra.or.kr/type/common/img/common/favicon_news.ico"
  preview="https://dream.kotra.or.kr/type/news/img/layout/logo_navi.png"/>

<SiteInfo
  name="Ipsos | Global Market Research and Public Opinion Specialist"
  desc="Global leader in market research, Ipsos delivers reliable information and true understanding of Society, Markets and People. Our solutions use data from surveys, polls, social media or qualitative, and provide actionable insights into the experience and opinions of citizens, consumers, patients, customers, employees."
  url="https://www.ipsos.com/en-id"
  logo="https://www.ipsos.com/themes/custom/ipsos/favicon.ico"
  preview="https://www.ipsos.com/themes/custom/ipsos/logo.svg"/>

<SiteInfo
  name="Product Reviews and Ratings - Consumer Reports"
  desc="Get unbiased ratings and reviews for 9,000+ products and services from Consumer Reports, plus trusted advice and in-depth reporting on what matters most."
  url="https://www.consumerreports.org/"
  logo="https://www.consumerreports.org/favicon.ico"
  preview="https://article.images.consumerreports.org/f_auto/prod/content/dam/cro/homepage/CR%20Twitter%20Card%20Green%20300%20x%20157"/>

```component VPCard
{
  "title": "HOME - Contenta M",
  "desc": "콘텐츠 마케팅 전문 회사 콘텐타 매거진",
  "link": "https://magazine.contenta.co/",
  "logo": "https://magazine.contenta.co/wp-includes/images/w-logo-blue-white-bg.png",
  "background": "rgba(88,186,183,0.2)"
}
```

<SiteInfo
  name="뉴닉 NEWNEEK"
  desc="우리가 시간이 없지, 세상이 안 궁금하냐!"
  url="https://www.newneek.co/"
  logo="https://www.newneek.co/assets/apple-touch-icon.png"
  preview="https://newneek.co/og.png"/>

<SiteInfo
  name="홈 - UPPITY 어피티"
  desc="MZ 세대의 돈 이야기, 35만 명이 선택한 경제 미디어. 뉴스레터, 영상 콘텐츠를 통해 서비스를 제공하며, 월~금 오전 8시에 발송되는 경제뉴스 메일링 서비스, 머니레터를 운영하고 있습니다."
  url="https://uppity.co.kr/"
  logo="https://uppity.co.kr/wp-content/uploads/fbrfg/apple-touch-icon.png"
  preview="https://uppity.co.kr/wp-content/uploads/2024/03/share-thumbnail.png"/>

<SiteInfo
  name="NAVER 학술정보"
  desc="Scholarly search engine for academic articles, theses, conferences and journals"
  url="https://academic.naver.com/"
  logo="https://academic.naver.com/favicon/android_legacy_xxxhpdi_192x192.png"
  preview="https://academic.naver.com/img/academic_og_200.png"/>

<SiteInfo
  name="칸타 코리아"
  desc="데이터분석, 마케팅조사/컨설팅, 소비자패널조사, 정치사회여론조사, 플랫폼비즈니스"
  url="https://kantar.co.kr/index.php?module=Board&action=SiteBoard&sMode=SELECT_FORM&iBrdNo=3"
  preview="https://www.kantar.co.kr/myimage.jpg"/>

<SiteInfo
  name="데이터로 시장과 소비자를 이해하는 법 - 오픈서베이 블로그"
  desc="시장과 소비자, 데이터와 리서치에 관한 가장 깊고 정확한 인사이트를 얻는 법"
  url="https://blog.opensurvey.co.kr/"
  logo="https://i0.wp.com/blog.opensurvey.co.kr/wp-content/uploads/2021/12/android-icon-192x192-1.png?fit=192%2C192&ssl=1"
  preview="https://blog.opensurvey.co.kr/wp-content/uploads/2022/04/metatag_opensurvey_hompage.png"/>

```component VPCard
{
  "title": "한국갤럽조사연구소",
  "desc": "한국갤럽 자체 조사 결과 아카이브, 조사에 관한 이야기",
  "link": "https://www.gallup.co.kr/gallupdb/main.asp",
  "logo": "https://www.gallup.co.kr/images/favicon/apple-touch-icon.png",
  "background": "rgba(23,28,34,0.2)"
}
```

<SiteInfo
  name="컨슈머인사이트"
  desc="쉽고 빠른 리서치, 마케팅/여론 조사, 국내 유일한 대규모 비편향 패널 독자보유, 자동차, ICT, 금융, 여행, 교통, 미디어 엔터테인먼트 산업전문, 데이터 융합형 리서치"
  url="https://www.consumerinsight.co.kr/voc_list_search.aspx"
  logo="https://www.consumerinsight.co.kr/img/apple-touch-icon.png"
  preview="https://www.consumerinsight.co.kr/img/og.jpg"/>

```component VPCard
{
  "title": "KOSIS 국가통계포털",
  "desc": "코시스, 통계청이 제공하는 원스톱 통계 서비스, 국가승인통계, 국제통계, 북한통계, e-지방지표, 통계시각화콘텐츠, 온라인간행물 등 제공",
  "link": "https://kosis.kr/index/index.do",
  "logo": "https://kosis.kr/favicon.ico",
  "background": "rgba(92,164,148,0.2)"
}
```

<SiteInfo
  name="아이지에이웍스 블로그 | 인사이트"
  desc="IGAWorks는 데이터의 가치를 실현합니다. 수집-분석-정제-활용의 데이터 벨류체인을 연결하고, 이를 모바일 비즈니스에 연결합니다. "
  url="https://www.igaworksblog.com/"
  logo="https://static.wixstatic.com/media/4c8897_2c2ffd87d8a040fc9702be0625b245c0%7Emv2.png/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/4c8897_2c2ffd87d8a040fc9702be0625b245c0%7Emv2.png"
  preview="https://static.wixstatic.com/media/4c8897_b1ac37ff970c487ab7b51b633e9b3027~mv2.png/v1/fill/w_1200,h_630,al_c/4c8897_b1ac37ff970c487ab7b51b633e9b3027~mv2.png"/>

<SiteInfo
  name="온라인 결제의 모든 것, 포트원 기업 블로그"
  desc="온라인 비즈니스를 위한 B2B 통합 핀테크 기업 포트원의 공식 블로그입니다. 포트원의 최신 소식을 빠르게 접해보세요."
  url="https://blog.portone.io/"
  logo="https://blog.portone.io/favicon.png"
  preview="https://blog.portone.io/portone_og.png"/>

<SiteInfo
  name="다양한 해외 뉴스를 번역, 요약하여 제공합니다. | Briefy"
  desc="AI를 이용하여 다양한 해외 뉴스를 번역, 요약하여 제공합니다. | Briefy"
  url="https://briefy.dev/"
  logo="https://briefy.dev/favicon.png"
  preview="https://news-affordance.vercel.app/images/ogp_image.png"/>

<!-- END: Trending Korea -->

@tab <FontIcon icon="fas fa-globe"/>Tech Blog

<SiteInfo
  name="freeCodeCamp Programming Tutorials: Python, JavaScript, Git & More"
  desc="Browse thousands of programming tutorials written by experts. Learn Web Development, Data Science, DevOps, Security, and get developer career advice."
  url="https://freecodecamp.org/news/"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.freecodecamp.org/platform/universal/fcc_meta_1920X1080-indigo.png"/>

<SiteInfo
  name="Library | Kodeco > Android & Kotlin"
  desc="Search the best collection of iOS and Android tutorials on the web"
  url="https://kodeco.com/library?domain_ids%5B%5D=2&subscription_types%5B%5D=free&content_types%5B%5D=article&category_ids%5B%5D=156&category_ids%5B%5D=181&category_ids%5B%5D=159&category_ids%5B%5D=151&category_ids%5B%5D=1222&category_ids%5B%5D=1224&category_ids%5B%5D=161&category_ids%5B%5D=177&category_ids%5B%5D=143&category_ids%5B%5D=147&category_ids%5B%5D=155&category_ids%5B%5D=144&category_ids%5B%5D=158&category_ids%5B%5D=148&category_ids%5B%5D=150&category_ids%5B%5D=152&category_ids%5B%5D=149&category_ids%5B%5D=1223&category_ids%5B%5D=154&category_ids%5B%5D=146&q="
  logo="https://kodeco.com/apple-touch-icon.png"
  preview="https://assets.carolus.kodeco.com/assets/kodeco/kodeco_og-card-407902405b9dd0a39ca47efb3b6477865605d373002abcd9b28846491c4d7717.png"/>

<SiteInfo
  name="Library | Kodeco > iOS & Swift"
  desc="Search the best collection of iOS and Android tutorials on the web"
  url="https://kodeco.com/library?domain_ids%5B%5D=1&subscription_types%5B%5D=free&content_types%5B%5D=article&category_ids%5B%5D=156&category_ids%5B%5D=181&category_ids%5B%5D=159&category_ids%5B%5D=151&category_ids%5B%5D=1222&category_ids%5B%5D=1224&category_ids%5B%5D=161&category_ids%5B%5D=177&category_ids%5B%5D=143&category_ids%5B%5D=147&category_ids%5B%5D=155&category_ids%5B%5D=144&category_ids%5B%5D=158&category_ids%5B%5D=148&category_ids%5B%5D=150&category_ids%5B%5D=152&category_ids%5B%5D=149&category_ids%5B%5D=1223&category_ids%5B%5D=154&category_ids%5B%5D=146&q="
  logo="https://kodeco.com/apple-touch-icon.png"
  preview="https://assets.carolus.kodeco.com/assets/kodeco/kodeco_og-card-407902405b9dd0a39ca47efb3b6477865605d373002abcd9b28846491c4d7717.png"/>

<SiteInfo
  name="Library | Kodeco > Flutter & Dart"
  desc="Search the best collection of iOS and Android tutorials on the web"
  url="https://kodeco.com/library?domain_ids%5B%5D=9&subscription_types%5B%5D=free&content_types%5B%5D=article&category_ids%5B%5D=156&category_ids%5B%5D=181&category_ids%5B%5D=159&category_ids%5B%5D=151&category_ids%5B%5D=1222&category_ids%5B%5D=1224&category_ids%5B%5D=161&category_ids%5B%5D=177&category_ids%5B%5D=143&category_ids%5B%5D=147&category_ids%5B%5D=155&category_ids%5B%5D=144&category_ids%5B%5D=158&category_ids%5B%5D=148&category_ids%5B%5D=150&category_ids%5B%5D=152&category_ids%5B%5D=149&category_ids%5B%5D=1223&category_ids%5B%5D=154&category_ids%5B%5D=146&q="
  logo="https://kodeco.com/apple-touch-icon.png"
  preview="https://assets.carolus.kodeco.com/assets/kodeco/kodeco_og-card-407902405b9dd0a39ca47efb3b6477865605d373002abcd9b28846491c4d7717.png"/>

```component VPCard
{
  "title": "Frontend Masters Boost - Helping Your Journey to Senior Developer",
  "desc": "Helping Your Journey to Senior Developer",
  "link": "https://frontendmasters.com/blog/",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Smashing Magazine — For Web Designers And Developers",
  "desc": "Magazine on CSS, JavaScript, front-end, accessibility, UX and design. For developers, designers and front-end engineers.",
  "link": "https://smashingmagazine.com/articles/",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

<SiteInfo
  name="DigitalOcean | Cloud Infrastructure for Developers"
  desc="An ocean of simple, scalable cloud solutions."
  url="https://digitalocean.com/community/tutorials?sort_by=oldest"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://www.digitalocean.com/_next/static/media/social-share-default.e8530e9e.jpeg"/>

<SiteInfo
  name="Kt. Academy"
  desc="Teaching programming, with focus on the best practices."
  url="https://kt.academy/article"
  logo="https://kt.academy/logo.png"
  preview="https://kt.academy/images/logo_full.png"/>

<SiteInfo
  name="Blog - Koin - Cloud-Inject.io"
  desc="Keep yourself informed about the latest developments in the Koin framework and Cloud-Inject Observability Dev platform directly from the creators."
  url="https://blog.kotzilla.io/"
  logo="https://blog.kotzilla.io/hubfs/favicon.png"
  preview="https://blog.kotzilla.io/hubfs/banner.png"/>

<SiteInfo
  name="Android Community on a Global Scale - droidcon"
  desc="droidcon Community on a Global Scaledroidcon is your source for daily tech blogs, videos, events, jobs and more all around Android development."
  url="https://droidcon.com/"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2021/09/droidcon_visuals_Flaechen_RGB_droidcon-visual-23-scaled.jpg"/>

<SiteInfo
  name="Tecmint: Linux Howtos, Tutorials & Guides"
  desc="Tecmint - Linux Howtos, Tutorials, Guides, News, Tips and Tricks."
  url="https://tecmint.com/"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2022/06/tecmint-linux-blog.png"/>

```component VPCard
{
  "title": "Home | Meta Open Source",
  "desc": "The landing page of the official Meta Open Source website.",
  "link": "https://opensource.fb.com/",
  "logo": "https://opensource.fb.com/img/favicon.png",
  "background": "rgba(70,90,105,0.2)"
}
```

```component VPCard
{
  "title": "Slack Engineering -",
  "desc": "...",
  "link": "https://slack.engineering/",
  "logo": "https://slack.engineering/wp-content/uploads/sites/7/2020/05/cropped-octothrope-1.png?w=32",
  "background": "rgba(18,100,163,0.2)"
}
```

<SiteInfo
  name="Learnk8s — the Kubernetes training company"
  desc="We help you get started on your Kubernetes journey through comprehensive online, in person or remote training."
  url="https://learnk8s.io/archive"
  logo="https://static.learnk8s.io/f7e5160d4744cf05c46161170b5c11c9.svg"
  preview="https://static.learnk8s.io/6dbec52a8d352b7cd5625cf903bf4de4.png"/>

<SiteInfo
  name="Code Maze - C#, .NET and Web Development Tutorials"
  desc="Welcome to Code Maze. Here, you can find C#, .NET and Web Development tutorials. Join millions of readers from all over the world."
  url="https://code-maze.com/latest-posts-on-code-maze/"
  logo="code-maze.com/favicon.png"
  preview="code-maze.com/banner.png"/>

<SiteInfo
  name="Milan Jovanović | Helping You Become a Better .NET Engineer"
  desc="The .NET Weekly is a newsletter that delivers 1 practical tip on .NET & sofwtare architecture that you can easily implement."
  url="https://milanjovanovic.tech/blog"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/og_image.png"/>

<SiteInfo
  name="C# Corner: AI-Powered Upskilling and Growth Platform"
  desc="C# Corner is a global community focused on members education and growth through tutorials, videos, podcasts, conferences, hackathons, certifications, speaking opportunities, and mentorship programs."
  url="https://c-sharpcorner.com"
  logo="https://c-sharpcorner.com/images/layout/favicon-icon-dark.svg"
  preview="https://c-sharpcorner.com/images/csharp-corner-new.png"/>

<SiteInfo
  name="Event-Driven by Oskar Dudycz"
  desc="Event-Driven by Oskar Dudycz"
  url="https://event-driven.io/en/"
  logo="event-driven.io/favicon.jfif"
  preview="https://event-driven.io/preview.jpg"/>

<SiteInfo
  name="Outcome School | Get High Paying Tech Job"
  desc="Software engineers like you join Outcome School to achieve the outcome that is a high-paying tech job."
  url="https://outcomeschool.com/blog"
  logo="https://outcomeschool.com/static/favicons/apple-touch-icon.png"
  preview="https://outcomeschool.com/static/images/social-banner.png"/>

<SiteInfo
  name="Spring | Blog"
  desc="Level up your Java code and explore what Spring can do for you."
  url="https://spring.io/blog"
  logo="https://spring.io/favicon.svg?v=96334d577af708644f6f0495dd1c7bc8"
  preview="https://spring.io/img/og-spring.png"/>

<SiteInfo
  name="LogRocket Blog - Resources to Help Product Teams Ship Amazing Digital Experiences"
  desc="Resources to Help Product Teams Ship Amazing Digital Experiences"
  url="https://blog.logrocket.com/dev"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/banner.png"/>

```component VPCard
{
  "title": "IdeaHarbour Engineering Blog - Everyday Engineering Challenges",
  "desc": "Everyday Engineering Challenges",
  "link": "https://blog.ideaharbour.site/engineering/",
  "logo": "https://blog.ideaharbour.site/engineering/wp-content/uploads/sites/3/2024/03/cropped-android-chrome-512x512-1-192x192.png",
  "background": "rgba(27,132,21,0.2)"
}
```

<SiteInfo
  name="Coursera Engineering - Medium"
  desc="We're changing the way the world learns! Posts from Coursera engineers and data scientists."
  url="https://medium.com/coursera-engineering"
  logo="https://miro.medium.com/v2/1*m-R_BkNf1Qjr1YbyOIJY2w.png"
  preview="https://cdn-images-1.medium.com/v2/resize:fit:2400/1*SUNVx-fZ3AwO13vvCEPqsQ.jpeg"/>

```component VPCard
{
  "title": "SitePoint - Learn HTML, CSS, JavaScript, PHP, Ruby & Responsive Design",
  "desc": "Learn Web Design & Development with SitePoint tutorials, courses and books - HTML5, CSS3, JavaScript, PHP, mobile app development, Responsive Web Design",
  "link": "https://www.sitepoint.com/",
  "logo": "https://www.sitepoint.com/favicons/32x32.png",
  "background": "rgba(29,32,36,0.2)"
}
```

<SiteInfo
  name="Developer Updates - Top Updates for Software Developers"
  desc="Let us keep you updated on everything that is happening in the software development world - deliver the most valuable and up-to-date insights"
  url="https://www.developerupdates.com/"
  logo="https://www.developerupdates.com/favicon.ico"
  preview="https://www.developerupdates.com/img/logo_image.png"/>

<SiteInfo
  name="Learn. Build. Grow. Together."
  desc="Learn from the web’s leading experts. Build something new. Grow your career. Let’s do it together."
  url="https://www.learnwithjason.dev/"
  logo="https://www.learnwithjason.dev/favicon.ico"
  preview="https://res.cloudinary.com/jlengstorf/image/upload/w_1280,h_669,c_fill,q_auto,f_auto/w_813,c_fit,co_rgb:ffffff,g_south_west,x_392,y_340,l_text:jwf.otf_55:Learn%20With%20Jason/w_813,c_fit,co_rgb:ffffff,g_north_west,x_392,y_375,l_text:jwf-book.otf_42:Learn%20from%20the%20web%E2%80%99s%20leading%20experts.%20Build%20something%20new.%20Grow%20your%20career.%20Let%E2%80%99s%20do%20it%20together./lwj/post-share-2022"/>

<SiteInfo
  name="Knowledge Base"
  desc="Knowledge Base"
  url="https://iq.thc.org/"
  logo="https://cdn.hashnode.com/res/hashnode/image/upload/v1611242155728/W3_BYVVVh.png"
  preview="https://iq.thc.org/api/og/home?og=eyJ0aXRsZSI6Iktub3dsZWRnZSUyMEJhc2UiLCJkb21haW4iOiJpcS50aGMub3JnIiwiZm9sbG93ZXJzIjozNTksImJnY29sb3IiOiIjOTBlZTkwIiwiaXNUZWFtIjp0cnVlLCJhcnRpY2xlcyI6eyJ0b3RhbERvY3VtZW50cyI6MTV9LCJpc0RlZmF1bHRNb2RlRGFyayI6dHJ1ZX0="/>

<SiteInfo
  name="Latest Articles | UX Tools"
  desc="Articles about the skills, tools, and techniques of UX design."
  url="https://uxtools.co/blog/"
  logo="https://uxtools.co/apple-touch-icon.png"
  preview="https://uxtools.co/img/default-share.png"/>

```component VPCard
{
  "title": "iximiuz Labs - Learning-by-Doing Platform to master Cloud Native craft",
  "desc": "Skill up in Linux, Containers, Kubernetes, and Server-Side Programming by solving fun challenges.",
  "link": "https://labs.iximiuz.com/",
  "logo": "https://labs.iximiuz.com/favicon.ico",
  "background": "rgba(78,156,228,0.2)"
}
```

<SiteInfo
  name="TechBeamers: Programming & Testing Help"
  desc="Master Python, Java, C/C++, C# Programming Skills | Learn Testing & Automation Using Selenium With Free Tutorials, Quizzes, and Exercises."
  url="https://techbeamers.com"
  logo="https://techbeamers.com/wp-content/uploads/2024/04/cropped-techbeamers-icon-32x32.png"
  preview="https://techbeamers.com/wp-content/uploads/2023/09/techbeamers_fb.png"/>

<SiteInfo
  name="NVIDIA Blog"
  desc="Keep up to date with the latest news from the world leader in accelerated computing."
  url="https://blogs.nvidia.com/"
  logo="https://blogs.nvidia.com/favicon.ico"
  preview="https://blogs.nvidia.com/wp-content/uploads/2018/05/nvidia-logo.jpg"/>

<SiteInfo
  name="Stripe Blog: Online Payment Solutions Blog"
  desc="Follow the Stripe blog to learn about new product features, the latest in technology, payment solutions, and business initiatives."
  url="https://stripe.com/blog"
  logo="https://images.ctfassets.net/fzn2n1nzq965/2EOOpI2mMZgHYBlbO44zWV/5a6c5d37402652c80567ec942c733a43/favicon.png?w=180&h=180"
  preview="https://images.ctfassets.net/fzn2n1nzq965/1GdeUNWpnN1rxEKVgKy8dL/3eb96b4ae1ffb87717c384fe36141a1a/blog-stripe-default-social-card.png?q=80"/>

<SiteInfo
  name="Speednet - we build software"
  desc="We build software and eliminate technological friction to help you unlock and demonstrate value to your customers."
  url="https://speednetsoftware.com/"
  logo="https://speednetsoftware.com/app/uploads/2023/09/cropped-favicon-192x192.png"
  preview="https://speednetsoftware.com/app/uploads/2023/11/SEO_speednetpl-min.png"/>

<SiteInfo
  name="Let's Build UI"
  desc="Practical examples for modern frontend developers."
  url="https://www.letsbuildui.dev/"
  logo="https://www.letsbuildui.dev/content/images/size/w256h256/format/png/2023/08/favicon.svg"
  preview="https://www.letsbuildui.dev/content/images/2023/08/og-default-1.png"/>

```component VPCard
{
  "title": "The place for .NET enthusiasts, Azure lovers, and backend developers | Code4IT",
  "desc": "Code4IT - a blog for .NET enthusiasts, Azure lovers, and Backend developers",
  "link": "https://www.code4it.dev/",
  "logo": "https://www.code4it.dev/img/favicon.png",
  "background": "rgba(72,138,153,0.2)"
}
```

<SiteInfo
  name="Data School"
  desc="Launch a data science career!"
  url="https://www.dataschool.io/"
  logo="https://www.dataschool.io/content/images/size/w256h256/2019/02/favicon-192x192.png"
  preview="https://www.dataschool.io/content/images/2014/12/DS_FINAL.png"/>

```component VPCard
{
  "title": "Snap Engineering Blog",
  "desc": "Learn about Snap Engineering culture and our industry-leading innovations and achievements.",
  "link": "https://eng.snap.com/blog",
  "logo": "https://eng.snap.com/images/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```

<SiteInfo
  name="Technology - Upvoted"
  desc="..."
  url="https://redditinc.com/blog/topic/technology"
  logo="https://www.redditinc.com/assets/images/favicons/favicon-32x32.png"
    preview="https://www.redditinc.com/assets/images/site/Reddit_Upvoted_Bubble-edit.svg"/>

<SiteInfo
  name="Twitch Blog"
  desc="Twitch Blog"
  url="https://blog.twitch.tv/en/tags/engineering/"
  logo="https://blog.twitch.tv/assets/icons/favicon.ico"
  preview="https://cdn.m7g.twitch.tv/ba46b4e5e395b11efd34/assets/uploads/blog_og-image.jpg?w=1200&h=630&fm=jpg&auto=format"/>

```component VPCard
{
  "title": "Discord Blog",
  "desc": "Resources and news for engineers and Discord app developers.",
  "link": "https://discord.com/category/engineering",
  "logo": "https://assets-global.website-files.com/5f8dd67f8fdd6f51f0b50904/5f91fae62cc821206588b837_Frame%20246.png",
  "background": "rgba(64,78,237,0.2)"
}
```

<SiteInfo
  name="Stealth Security"
  desc="Learn to attack and defend yourself online. Ethically."
  url="https://stealthsecurity.sh/"
  logo="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/publication/logo/e2d29914-80f5-46c4-8e92-b2e96e013d4d/thumb_Stealth_security.gif"
  preview="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/publication/logo/e2d29914-80f5-46c4-8e92-b2e96e013d4d/Stealth_security.gif"/>
  
<SiteInfo
  name="Unicorn Utterances"
  desc="Learning programming from magically majestic words. A place to learn about all sorts of programming topics from entry-level concepts to advanced abstractions"
  url="https://unicorn-utterances.com/"
  logo="https://unicorn-utterances.com/favicon.ico"
  preview="https://unicorn-utterances.com/share-banner.png"/>

<SiteInfo
  name="Pikuma: Fundamentals of computer science and mathematics"
  desc="Video books and courses to learn computer science, programming, and mathematics."
  url="https://pikuma.com/"
  logo="https://pikuma.com/images/favicon/favicon.ico"
  preview="https://pikuma.com/images/og/home.png"/>

https://devblogs.microsoft.com/engineering-at-microsoft/

<SiteInfo
  name="Insights | 8th Light"
  desc="At 8th Light, we embrace sparking ideas, insights, and creative solutions in the software industry. Read more from our experts."
  url="https://8thlight.com/insights/"
  logo="https://8thlight.com/apple-touch-icon.png"
  preview="https://assets.8thlight.com/images/_1200x630_crop_center-center_none/8th_Light_Feature_Insights.jpg"/>

<SiteInfo
  name="NextRoll - Engineering"
  desc="Big Data, Real Time Bidding, 50TB+/day, 1 million+ qps, 100ms, Python, Java, Erlang, C, JavaScript, Cutting Edge WebDev, Machine Learning, Open Source Projects"
  url="https://tech.nextroll.com/blog/"
  logo="https://tech.nextroll.com/images/icon/apple-touch-icon.png"
  preview="https://tech.nextroll.com/images/site_cover.png"/>

<SiteInfo
  name="The Airbnb Tech Blog - Medium"
  desc="Creative engineers and data scientists building a world where you can belong anywhere."
  url="https://medium.com/airbnb-engineering"
  logo="https://miro.medium.com/v2/1*m-R_BkNf1Qjr1YbyOIJY2w.png"
  preview="https://cdn-images-1.medium.com/max/1200/1*MlNQKg-sieBGW5prWoe9HQ.jpeg"/>

<SiteInfo
  name="Algolia"
  desc="Algolia - Follow our latest articles!"
  url="https://www.algolia.com/blog/"
  logo="https://www.algolia.com/blog/favicons/light-mode/apple-touch-icon.png"
  preview="https://res.cloudinary.com/hilnmyskv/image/upload/v1665563915/Algolia_com_Website_assets/images/og/Algolia_OG_image.jpg"/>

<SiteInfo
  name="Jetify - Sophisticated Cloud Development"
  desc="Jetify builds open-source tools that make development a delightful experience.  Follow our blog to learn how to power-up your cloud development"
  url="https://www.jetify.com/blog"
  logo="https://res-3.cloudinary.com/jetpack-io/image/upload/q_auto/v1/blog/jetpack-icon.png"
  preview="https://res-2.cloudinary.com/jetpack-io/image/upload/q_auto/v1/blog/Social-Card---Jetify-Logo.png"/>

<SiteInfo
  name="Xandr-Tech - Medium"
  desc="Our latest thoughts, challenges, triumphs, try-again’s, most snarky and profound commit messages. Our proudest achievements, deepest darkest technical debt regrets (just kidding, maybe). All the humbling yet informative things you learn when you try to do things with computers."
  url="https://medium.com/xandr-tech/"
  logo="https://miro.medium.com/v2/1*m-R_BkNf1Qjr1YbyOIJY2w.png"
  preview="https://cdn-images-1.medium.com/max/1200/1*I-53yG6S3BUekzkNmpq2uA.png"/>

<SiteInfo
  name="Home | Arkency Blog"
  desc="Hi, we're Arkency and it's our blog with meaty content."
  url="https://blog.arkency.com/"
  logo="https://blog.arkency.com/favicon.ico"
  preview="https://blog-arkency.imgix.net/~text?bg=DC3E09&fit=max&h=315&txt=Home&txtalign=middle%2Ccenter&txtclr=FFF&txtfont=Georgia%2CBold&txtpad=30&txtsize=42&w=640"/>

<SiteInfo
  name="Artsy Engineering"
  desc="Two years of Next.js at Artsy: A Retrospective"
  url="https://artsy.github.io/"
  logo="https://artsy.github.io/favicon.ico"
  preview="http://artsy.github.io/images/artsy_oss_image.png"/>

<SiteInfo
  name="Asana Engineering Blog"
  desc="Are you interested in learning more about working on Asana's engineering team or the work they do? Read the Asana engineering blog."
  url="https://blog.asana.com/category/eng/"
  logo="https://d1gwm4cf8hecp4.cloudfront.net/images/favicons/android-chrome-192x192.png"
  preview="https://blog.asana.com/wp-content/post-images/Blog-home-metadata-2021-3.png"/>

<SiteInfo
  name="Developer Archives - Work Life by Atlassian"
  desc="Atlassian's team collaboration software like Jira, Confluence and Trello help teams organize, discuss, and complete shared work."
  url="https://www.atlassian.com/blog/developer"
  logo="https://atlassianblog.wpengine.com/wp-content/uploads/2017/10/android-chrome-256x256.png"
  preview="https://atlassianblog.wpengine.com/wp-content/uploads/2024/07/1120x545-2x-blog-header@2x-1560x720.png"/>

<SiteInfo
  name="Homepage | Atomic Spin"
  desc="Atomic Object’s blog on everything we find fascinating."
  url="https://spin.atomicobject.com/"
  logo="https://spin.atomicobject.com/favicon.ico"
  preview="https://spin.atomicobject.com/wp-content/uploads/Atomic-Object-Spin.jpg"/>

<SiteInfo
  name="Apps For Apple Vision Pro"
  desc="Discover new and exciting apps for visionOS from developers of all sizes. Enjoy groundbreaking immersive experiences, explore new universes and get to know visionOS apps that are available on Apple Vision Pro."
  url="https://appsforapplevision.com/blog"
  logo="https://appsforapplevision.com/favicon.ico"
  preview="https://appsforapplevision.com/images/og-image.jpeg"/>

<SiteInfo
  name="Dev.java: The Destination for Java Developers"
  desc="The Destination for Java Developers"
  url="https://dev.java/"
  logo="https://dev.java/favicon.ico"
  preview="https://dev.java/assets/images/java-logo-vert-blk.png"/>

<SiteInfo
  name="Cloud, DevOps & SRE Guidance | Build5Nines"
  desc="All about the Microsoft Cloud! Articles, Tutorials, Videos, Books, and more! Voted the #1 Microsoft Azure blog to follow!"
  url="https://build5nines.com/"
  logo="https://i0.wp.com/build5nines.com/wp-content/uploads/2020/08/image.jpg?fit=192%2C192&ssl=1"
  preview="https://i0.wp.com/build5nines.com/wp-content/uploads/2024/05/Build5Nines_Featured_Image_full_20240507.jpg"/>

<SiteInfo
  name="packagemain.tech | Alex Pliutau | Substack"
  desc="Welcome to packagemain.tech, your one-stop shop for mastering Backend, Cloud, Kubernetes, Microservices, APIs, and more. We'll provide you with hands-on, practical and real-world tutorials that you can use to build your software development skills. Click to read packagemain.tech, a Substack publication with thousands of subscribers."
  url="https://packagemain.tech/"
  logo="https://substack-post-media.s3.amazonaws.com/public/images/2ea54e25-eaa6-4630-bfc0-10b8cfdce894/apple-touch-icon-1024x1024.png"
  preview="https://substack-post-media.s3.amazonaws.com/public/images/9bcf6f54-70e1-498f-b291-3fb402eccaad_2743x1457.jpeg"/>

```component VPCard
{
  "title": "Piccalilli - level up your front-end development skills",
  "desc": "We are Piccalilli. A publication dedicated to providing high quality educational content to level up your front-end skills.",
  "link": "https://piccalil.li/",
  "logo": "https://piccalil.li/favicons/apple-touch-icon.png",
  "background": "rgba(253,208,0,0.2)"
}
```

<SiteInfo
  name="Ankur Tyagi - Blogging as a Service for Startups"
  desc="Welcome to my digital playground."
  url="https://theankurtyagi.com/blog/"
  logo="https://theankurtyagi.com/wp-content/uploads/2023/07/cropped-cropped-ankur-icon-32x32.jpg"
  preview="https://theankurtyagi.com/wp-content/uploads/2023/07/theankurtyagi-1.jpg"/>

<!-- END: Tech Blog -->

@tab <FontIcon icon="fas fa-blog"/>Tech Blog (Korea)

```component VPCard
{
  "title": "요즘IT", 
  "desc": "요즘 사람들의 IT 매거진, 요즘IT", 
  "link": "https://yozm.wishket.com/magazine/list/develop/", 
  "logo": "https://yozm.wishket.com/favicon.ico", 
  "background": "rgba(84,7,224,0.2)"
}
```

```component VPCard
{
  "title": "카카오테크, 미래의 문턱을 낮추는 기술",
  "desc": "미래의 문턱을 낮추는 기술",
  "link": "https://tech.kakao.com/blog/",
  "logo": "https://www.kakaocorp.com/page/favicon.ico",
  "background": "rgba(53,79,245,0.2)"
}
```

<SiteInfo
  name="카카오페이 기술 블로그"
  desc="기술과 경험을 함께 공유합니다."
  url="https://tech.kakaopay.com/"
  logo="https://tech.kakaopay.com/favicon.ico"
  preview="https://tech.kakaopay.com/_astro/techlog.c831e159_Z12ejLo.png"/>

<SiteInfo
  name="홈 | 카카오엔터테인먼트 FE 기술블로그"
  desc="카카오 엔터테인먼트 프론트엔드 개발팀이 관심있는 기술의 경험과 노하우를 공유합니다."
  url="https://fe-developers.kakaoent.com/"
  logo="https://fe-developers.kakaoent.com/favicon-32x32.png?v=44803cb16c1e2debd3984cf2e8cb2ded"
  preview="https://fe-developers.kakaoent.com/static/kakaoEnt-e1e7f4766847f540602de68fd4e88456.png"/>

```component VPCard
{
  "title": "NHN Cloud Meetup - NHN 기술 블로그",
  "desc": "기술을 공유하고 함께 성장해가는 개발 문화, NHN이 추구하는 가치입니다.",
  "link": "https://meetup.nhncloud.com/",
  "logo": "https://meetup.nhncloud.com/resources/img/favicon.ico",
  "background": "rgba(76,156,227,0.2)"
}
```

<SiteInfo
  name="NAVER D2"
  desc=""
  url="https://d2.naver.com"
  logo="d2.naver.com/favicon.ico"
  preview="d2.naver.com/sitebanner.png"/>

<SiteInfo
  name="강남언니 공식 블로그"
  desc="강남언니의 조직문화와 일하는 방식을 이야기합니다."
  url="https://blog.gangnamunni.com/"
  logo="https://blog.gangnamunni.com/favicon.ico"
  preview="https://blog.gangnamunni.com/_nuxt/img/ae65a45.jpg"/>

<SiteInfo
  name="토스 기술 블로그, 토스 테크"
  desc="토스의 개발과 디자인에 대한 이야기를 다룹니다."
  url="https://blog.toss.im"
  logo="https://static.toss.im/tds/favicon/favicon.ico"
  preview="https://static.toss.im/assets/payments/contents/toss-tech-banner2_.png"/>

<SiteInfo
  name="우아한형제들 기술블로그"
  desc="우아한형제들의 기술, 서비스, 비전, 가치를 들려 드립니다."
  url="https://techblog.woowahan.com/"
  logo="https://techblog.woowahan.com/wp-content/uploads/2020/08/favicon.ico"
  preview="https://techblog.woowahan.com/wp-content/uploads/2021/06/screenshot.jpg"/>

<SiteInfo
  name="Tecoble"
  desc="woowacourse code review & devlog"
  url="https://tecoble.techcourse.co.kr/"
  logo="https://tecoble.techcourse.co.kr/static/0b18bd94a62a12fdc81ea720c28722f6/af3f1/tecoble.png"
  preview="https://tecoble.techcourse.co.kr/static/51cd4d672c05e719ea8b4c940edfc3ef/1de80/wooteco.jpg"/>

```component VPCard
{
  "title": "지마켓 기술블로그",
  "desc": "지마켓의 기술과 경험을 공유합니다.",
  "link": "https://dev.gmarket.com/",
  "logo": "https://tistory2.daumcdn.net/tistory/4067742/3d398eb9d6e54c5f85163614e296d515",
  "background": "rgba(0,192,30,0.2)"
}
```

```component VPCard
{
  "title": "fe-news/issues/ at master · naver/fe-news · GitHub",
  "desc": "📚 링크 & 읽을 거리",
  "link": "https://github.com/naver/fe-news/blob/master/issues/",
  "logo": "https://github.com/naver/fe-news/raw/master/assets/logo.svg",
  "background": "rgba(247,223,30,0.2)"
}
```

<SiteInfo
  name="tech.inflab.com"
  desc="인프랩 기술 블로그"
  url="https://tech.inflab.com"
  logo="https://tech.inflab.com/favicon-32x32.png?v=85c8af743e179883b18fef5acc3a66b0"
  preview="https://cdn.inflearn.com/assets/images/tech-blog/tech_blog_banner.png"/>

<SiteInfo
  name="TOAST UI :: Make Your Web Delicious!"
  desc="TOAST UI is an open-source JavaScript UI library maintained by NHN Cloud."
  url="https://ui.toast.com/"
  logo="ui.toast.com/favicon.ico"
  preview="ui.toast.com/banner.png"/>

<SiteInfo
  name="타다 TECH BLOG"
  desc="기술로 이동의 한계를 돌파합니다"
  url="https://blog-tech.tadatada.com/"
  logo="https://blog-tech.tadatada.com/favicon-32x32.png?v=5538e116b860d2f4ef55efadcc8fc537"
  preview="https://static.tadatada.com/resources/blog/img_thumbnail_link.png"/>

```component VPCard
{
  "title": "ZUM 기술 블로그",
  "desc": "생각을 읽다, ZUM, 고객의 생각을 읽고 담는 줌 인터넷 개발자들의 '좀 다른 개발 이야기'를 소개 합니다.",
  "link": "https://zuminternet.github.io/",
  "logo": "https://zuminternet.github.io/favicon.ico",
  "background": "rgba(30,45,56,0.2)"
}
```

```component VPCard
{
  "title": "Blog - LINE ENGINEERING",
  "desc": "2022-LINE-engineering-site",
  "link": "https://engineering.linecorp.com/ko/blog/",
  "logo": "https://engineering.linecorp.com/favicon-32x32.png?v=6d6085f233d02c34273fa8a8849b502a",
  "background": "rgba(31,31,31,0.2)"
}
```

```component VPCard
{
  "title": "뱅크샐러드 공식 블로그 | 메인",
  "desc": "뱅크샐러드의 공식 블로그입니다. 뱅크샐러드의 기술, 문화, 뉴스, 행사 등 최신 소식 및 뱅크샐러드가 겪은 다양한 경험을 공유합니다.",
  "link": "https://blog.banksalad.com",
  "logo": "https://blog.banksalad.com/favicon-32x32.png?v=a0f8dfab85709bd32e8bfd56c885f0fe",
  "background": "rgba(0,198,142,0.2)"
}
```

```component VPCard
{
  "title": "블로그 | 토스페이먼츠 개발자센터",
  "desc": "토스페이먼츠 결제 연동 과정에 도움이 되는 다양한 기술 아티클입니다. 더 쉽고 재밌는 콘텐츠로 결제 연동을 학습해보세요.",
  "link": "https://docs.tosspayments.com/blog",
  "logo": "https://static.toss.im/tds/favicon/favicon-196x196.png",
  "background": "rgba(202,221,249,0.2)"
}
```

```component VPCard
{
  "title": "블로그 | 올리브영 테크블로그",
  "desc": "올리브영 Tech의 다양한 기술 고민과 일상 이야기를 소개합니다",
  "link": "https://oliveyoung.tech/blog/",
  "logo": "https://oliveyoung.tech/favicon-32x32.png?v=a4b11f19c0d38aff2ebd465d8801cd2d",
  "background": "rgba(173,209,81,0.2)"
}
```

```component VPCard
{
  "title": "DevTech - 데브시스터즈 기술블로그",
  "desc": "탁월한 기술, 서비스, 콘텐츠로 전 세계 고객에게 최고의 경험을 선사합니다.",
  "link": "https://tech.devsisters.com/",
  "logo": "https://tech.devsisters.com/favicon-32x32.png?v=9dce5f969c7c2888a235a394755ba1a5",
  "background": "rgba(255,95,0,0.2)"
}
```

```component VPCard
{
  "title": "Blog | HMG Developers",
  "desc": "HMG Developer Website",
  "link": "https://developers.hyundaimotorgroup.com/blog",
  "logo": "https://developers.hyundaimotorgroup.com/favicon.png",
  "background": "rgba(67,128,248,0.2)"
}
```

```component VPCard
{
  "title": "GS리테일 DX블로그",
  "desc": "IT 기술 블로그들의 최신 포스트를 한곳에서 보세요.",
  "link": "https://gsretail.tistory.com/",
  "logo": "https://t1.daumcdn.net/tistory_admin/favicon/tistory_favicon_32x32.ico",
  "background": "rgba(255,255,255,0.2)"
}
```

```component VPCard
{
  "title": "Hyperconnect Tech Blog | 하이퍼커넥트의 기술블로그입니다.",
  "desc": "하이퍼커넥트의 기술블로그입니다.",
  "link": "https://hyperconnect.github.io/",
  "logo": "https://hyperconnect.github.io/assets/favicon.svg",
  "background": "rgba(240,240,240,0.2)"
}
```

```component VPCard
{
  "title": "Popit | 전문 지식 공유를 위한 팀블로그",
  "desc": "전문 지식 공유를 위한 팀블로그",
  "link": "https://popit.kr/page/1",
  "logo": "https://popit.kr/wp-content/uploads/2016/08/favicon_32x32.png",
  "background": "rgba(0,21,41,0.2)"
}
```

```component VPCard
{
  "title": "AB180 엔지니어링 베이스 | 기술블로그",
  "desc": "에어브릿지를 만드는 개발자들의 경험과 기록을 꾸준히 기록하는 공간입니다",
  "link": "https://engineering.ab180.co/",
  "logo": "https://oopy.lazyrockets.com/api/rest/cdn/image/7bbc75b5-1cdf-4b59-aec4-af3e335b3aad.png?d=16",
  "background": "rgba(11,110,153,0.2)"
}
```

<SiteInfo
  name="조인씨 JOINC EDU"
  desc="To be smarter and fancier, hang out with join communication 조인씨"
  url="https://www.joinc.co.kr/w/FrontPage"
  logo="https://www.joinc.co.kr/theme/joinc/img/logo_joinc.png"
  preview="https://joinc-edu.s3.ap-northeast-2.amazonaws.com/joinc-posting/cover_joinc.jpg"/>

<SiteInfo
  name="그린랩스 기술 블로그"
  desc="농업의 처음부터 끝까지. 그린랩스 기술 블로그입니다."
  url="https://green-labs.github.io/"
  logo="https://green-labs.github.io/favicon.png"
  preview="https://green-labs.github.io/static/Banner_001-34d01da098542f4099e949f75bf1d82d.png"/>

<SiteInfo
  name=" 브랜디 랩스(Brandi Labs) "
  desc="브랜드(Brand)와 나(I)를 연결해주는 브랜디 랩스 기술 블로그"
  url="https://labs.brandi.co.kr/"
  logo="https://labs.brandi.co.kr/assets/icons/favicon.ico"
  preview="https://labs.brandi.co.kr/assets/header_image.jpg"/>

<SiteInfo
  name="CNS Tech - LG CNS 블로그"
  desc="LG CNS의 기술을 통한 혁신 스토리와 노하우를 만나보세요."
  url="https://www.lgcns.com/blog/cns-tech/"
  logo="https://www.lgcns.com/wp-content/uploads/2021/11/cropped-siteicon-180x180.png"
  preview="https://www.lgcns.com/wp-content/uploads/2024/06/B_0614-600x315.png"/>

```component VPCard
{
  "title": "InfoGrab, DevOps 전문 기술 기업 | 인포그랩 | GitLab기반 DevSecOps 구축,컨설팅,교육,기술지원 서비스 제공",
  "desc": "인포그랩 DevOps 기술 블로그는 GitLab 릴리스부터 DevOps 기술 동향, 소프트웨어 개발, 워크플로 개선, AI, GPT 등 IT전반에 이르는 기술 콘텐츠를 제공합니다.",
  "link": "https://insight.infograb.net/blog",
  "logo": "https://insight.infograb.net/img/logo-color.svg",
  "background": "rgba(23,149,106,0.2)"
}
```

```component VPCard
{
  "title": "IMQA 기술 블로그",
  "desc": "프론트엔드 성능 모니터링 솔루션 IMQA를 운영하고 있는 IMQA의 기술 블로그입니다.",
  "link": "https://blog.imqa.io/",
  "logo": "https://blog.imqa.io/favicon.png",
  "background": "rgba(86,66,204,0.2)"
}
```

<SiteInfo
  name="컬리 기술 블로그"
  desc="컬리 기술 블로그"
  url="https://helloworld.kurly.com/"
  logo="https://helloworld.kurly.com/assets/logo/ico_192.png"
  preview="http://thefarmersfront.github.io/assets/logo-square.png"/>

<SiteInfo
  name="Spoqa 기술 블로그"
  desc="스포카 크리에이터의 경험과 배움을 공유합니다."
  url="https://spoqa.github.io/"
  logo="https://spoqa.github.io/images/og-logo.png"
  preview="https://spoqa.github.io/images/twitter-card.png"/>

<SiteInfo
  name="Tech Blog - 오픈소스컨설팅 테크블로그"
  desc="오픈소스컨설팅은 오픈소스 기반의 가치 있는 서비스를 제공하고, 기술을 공유함으로써 고객과 함께 성장하고자 합니다. 오픈소스컨설팅은 가상화, 클라우드 컨설팅, DevOps, MSA, 컨테이너 아키텍처 등 최신 오픈소스 기술에 대해 전문성을 갖고 있으며, 기술을 공유함으로써 고객과 함께 성장하는 것이 우리가 나아가고자 하는 방향입니다. 오픈소스·클라우드 관련 기술을 전파하고 데브옵스·애자일과 같은 개발 문화를 직접 체험할 수 있는 마이그레이션센터 ‘열린기술공방’을 런칭함으로써 지속적으로 사업 영역을 확장해 나가고 있습니다."
  url="https://tech.osci.kr"
  logo="https://tech.osci.kr/wp-content/uploads/2022/02/cropped-Favicon-192x192.png"
  preview="https://tech.osci.kr/wp-content/uploads/2023/06/thumb___-300x152.png"/>

<SiteInfo
  name="사람인 기술 블로그 - Saramin Tech Blog / 사람인 기술 블로그"
  desc="댱신의 꿈이 별처럼 빛날 때까지 함께하겠습니다."
  url="https://saramin.github.io/"
  logo="https://saramin.co.kr/favicon.ico?ver=2"
  preview="https://saramin.github.io/img/avatar-icon.png"/>

```component VPCard
{
  "title": "Tech Archives - DRAMA&COMPANY",
  "desc": "DRAMA&COMPANY",
  "link": "https://blog.dramancompany.com/category/develop/",
  "logo": "https://i0.wp.com/blog.dramancompany.com/wp-content/uploads/2022/10/cropped-remember-appIcon.png?fit=192%2C192&ssl=1",
  "background": "rgba(20,18,4,0.2)"
}
```

<SiteInfo
  name="Tech - 화해 블로그 | 기술 블로그"
  desc="뷰티 슈퍼 앱 화해의 테크 조직이 일하는 법을 만나보세요."
  url="https://blog.hwahae.co.kr/category/all/tech"
  logo="https://static.hwahae.co.kr/favicon.ico"
  preview="https://static.hwahae.co.kr/og/OG_1200.png"/>

<SiteInfo
  name="NRISE ENGINEERING BLOG"
  desc="엔라이즈 기술 블로그 NRISE ENGINEERING BLOG"
  url="https://nrise.github.io/"
  logo="https://nrise.github.io/images/favicon.ico"
  preview="https://nrise.github.io/images/nrise_cover_image.jpg"/>

```component VPCard
{
  "title": "FONT CLUB",
  "desc": "뉴스 / 트렌드",
  "link": "http://www.fontclub.co.kr/?cat=1",
  "logo": "http://www.fontclub.co.kr/wp-content/uploads/2018/02/favicon.ico",
  "background": "rgba(93,203,200,0.2)"
}
```

<SiteInfo
  name="Tech Blog Archives - 리디주식회사 RIDI Corporation"
  desc="풍부한 상상, 깊은 통찰로 인류의 정신을 풍요롭게"
  url="https://ridicorp.com/story-category/tech-blog/"
  logo="https://ridicorp.com/wp-content/uploads/2022/03/cropped-favicon-512x512-1-192x192.png"
  preview="https://ridicorp.com/wp-content/uploads/2022/03/metaimage_ridi-crop.png"/>

<SiteInfo
  name="데보션 (DEVOCEAN) 기술 블로그 & 커뮤니티"
  desc="데보션 (DEVOCEAN) 기술 블로그, 개발자 커뮤니티이자 내/외부 소통과 성장 플랫폼"
  url="https://devocean.sk.com/blog/index.do"
  logo="https://devocean.sk.com/resource/images/external/logo/logo_favicon.ico"
  preview="https://devocean.sk.com/resource/images/external/logo/devocean-og.png"/>

<SiteInfo
  name="폴시랩"
  desc="자바스트립트, PHP, 워드프레스, HTML, CSS, 팁, 가이드, 일상이야기."
  url="https://falsy.me/"
  logo="https://falsy.me/wp-content/themes/Cheolguso/img/favicon_v4.ico"
  preview="https://falsy.me/wp-content/uploads/2020/07/falsylab.jpg"/>
  
<!-- END: Tech Blog (Korea) -->

@tab App(s)

```component VPCard
{
  "title": "Discover iOS Apps | Mobbin",
  "desc": "Browse and search across hundreds of iOS apps for UI & UX research.",
  "link": "https://mobbin.com/browse/ios/apps",
  "logo": "https://mobbin.com/favicon.svg?v=2.1",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Discover Android Apps | Mobbin",
  "desc": "Browse and search across hundreds of Android apps for UI & UX research.",
  "link": "https://mobbin.com/browse/android/apps",
  "logo": "https://mobbin.com/favicon.svg?v=2.1",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Discover Web Apps | Mobbin",
  "desc": "Browse and search across hundreds of Web apps for UI & UX research.",
  "link": "https://mobbin.com/browse/web/apps",
  "logo": "https://mobbin.com/favicon.svg?v=2.1",
  "background": "rgba(17,17,17,0.2)"
}
```

<!-- END: App -->

@tab <FontIcon icon="fas fa-database"/>Data Science

- [Analytics Vidhya](https://www.analyticsvidhya.com/blog)
- [Data Science Central](https://www.datasciencecentral.com)
- [KDnuggets](https://www.kdnuggets.com)
  - [Fine-Tuning OpenAI Language Models with Noisily Labeled Data](https://www.kdnuggets.com/2023/04/finetuning-openai-language-models-noisily-labeled-data.html)
- [<FontIcon icon="fa-brands fa-reddit"/>`r/datascience`](https://www.reddit.com/r/datascience)
- [SmartDataCollective](https://www.smartdatacollective.com)
- [Codementor Blog](https://www.codementor.io/blog)
- [Kaggle Blog](https://medium.com/kaggle-blog)
- [data.world Blog](https://data.world/blog)
- [mode Blog](https://mode.com/blog)
- [Data Science Weekly](https://www.datascienceweekly.org/articles)
- [inside BIGDATA](https://insidebigdata.com)
- [Analytics Insight](https://www.analyticsinsight.net/category/latest-news)

@tab <FontIcon icon="fas fa-comments"/>Community

```component VPCard
{
  "title": "해시넷",
  "desc": "대한민국 블록체인 및 암호화폐 정보포털",
  "link": "http://wiki.hash.kr",
  "logo": "http://www.hash.kr/images/main/logo_big.png",
  "background": "rbga(20,20,20,0.2)"
}
```

```component VPCard
{
  "title": "리눅스 커뮤니티 하모니카(HamoniKR)",
  "desc": "",
  "link": "https://hamonikr.org/",
  "logo": "https://hamonikr.org/files/attach/xeicon/favicon.ico",
  "background": "rgba(67,94,155,0.2)"
}
```

```component VPCard
{
  "title": ":::MySQL Korea:::",
  "desc": "MySQL Korea 사이트의 컨텐츠 소유권은 (주)이노클러스터에 있으므로 무단전재를 금합니다.",
  "link": "http://www.mysqlkorea.com/",
  "background": "rgba(233,147,0,0.2)"
}
```

```component VPCard
{
  "title": "KLDP",
  "desc": "Open Source, Geek, IT",
  "link": "https://kldp.org/",
  "logo": "https://kldp.org/files/bluemarine_logo.png",
  "background": "rgba(36,36,36,0.2)"
}
```

```component VPCard
{
  "title": "제타위키",
  "desc": "'세상의 각주' 제타위키에 오신 것을 환영합니다! 누구나 편집할 수 있는 위키입니다. 서브컬처 환영합니다.",
  "link": "https://zetawiki.com/",
  "logo": "https://zetawiki.com/favicon.ico",
  "background": "rgba(44,62,80,0.2)"
}
```

```component VPCard
{
  "title": "SoEn:소프트웨어 공학 연구소",
  "desc": "프로그래머와 예비 개발자의 학습 및 놀이 동아리",
  "link": "http://www.soen.kr",
  "logo": "http://www.soen.kr/data/soen.png",
  "background": "rgba(255,255,241,0.2)"
}
```

```component VPCard
{
  "title": "서버포럼 - IT, Server, Nas, Linux, ETC..",
  "desc": "서버포럼은 개인 홈서버 구축, NAS, 헤놀로지, IT 정보, 기타 많은갤러리 등 정보 공유 커뮤니티입니다",
  "link": "https://svrforum.com",
  "logo": "https://svrforum.com/files/attach/xeicon/217/favicon.ico?t=1609060434",
  "background": "rgba(2,151,157,0.2)"
}
```

```component VPCard
{
  "title": "Qt 개발자 커뮤니티",
  "desc": "Qt Korea Developer Community",
  "link": "https://qt-dev.com",
  "logo": "https://www.qt-dev.com/img/home/ci_only_logo.png",
  "background": "rgba(118,148,208,0.2)"
}
```

```component VPCard
{
  "title": "게임코디",
  "desc": "게임 프로그래머 만담 커뮤니티, 게임코디",
  "link": "http://1st.gamecodi.com/",
  "logo": "http://1st.gamecodi.com/favicon.png",
  "background": "rgba(255,255,255,0.2)"
}
```

```component VPCard
{
  "title": "Infosec Exchange",
  "desc": "A Mastodon instance for info/cyber security-minded people.",
  "link": "https://infosec.exchange/explore",
  "logo": "https://assets.infosec.exchange/packs/media/images/logo-symbol-icon-035f79c35ed096e2d5bffab156e3a706.svg",
  "background": "rgb(140,141,255,0.2)"
}
```

<!-- END: Community -->

@tab <FontIcon icon="fas fa-person-running"/>Hackerthon

```component VPCard
{
  "title": "Dev Event - 개발자 행사는 모두 데브이벤트 웹에서!",
  "desc": "데브이벤트 웹에서 개발자 행사를 놓치지 마세요! 개발자를 위한 {웨비나, 컨퍼런스, 해커톤, 네트워킹} 소식을 알려드립니다.",
  "link": "https://dev-event.vercel.app/events",
  "logo": "https://raw.githubusercontent.com/brave-people/Dev-Event-Web-Deploy/main/public/favicon.ico",
  "background": "rgba(0,32,52,0.2)"
}
```

```component VPCard
{
  "title": "Festa! 모임과 이벤트를 주최하는 가장 쉬운 방법",
  "desc": "Festa에서 이벤트를 주최하고 당신이 찾는 이벤트를 만나보세요.",
  "link": "https://festa.io/",
  "logo": "https://festa.io/public/ny/favicon/favicon.ico",
  "background": "rgba(52,58,64,0.2)"
}
```

```component VPCard
{
  "title": "제10회 대한민국 SW융합 해커톤 대회",
  "desc": "미래 창업 꾸나무들이 SW융합 발전을 위해 펼치는 무박 3일의 여정, 제9회 SW융합 해커톤 대회",
  "link": "http://www.swhackathon.kr/ko/index.html",
  "logo": "http://www.swhackathon.kr/favicon.ico",
  "background": "rgba(0,1,32,0.2)"
}
```

```component VPCard
{
  "title": "이벤터스 :: 행사와 함께하는 모든 순간",
  "desc": "내가 원하는 행사를 개최하거나, 참여할 수 있는 플랫폼 - 이벤터스",
  "link": "https://event-us.kr/search/calendar",
  "logo": "https://event-us.kr/favicon.ico",
  "background": "rgba(93,63,191,0.2)"
}
```

```component VPCard
{
  "title": "공모전 대외활동 올콘",
  "desc": "일반인 대학생 청소년 공모전 대외활동 서포터즈 마케터 홍보대사 모집 정보를 전해드립니다. 공모전 대외활동 소식은 올콘 ALLCON 에서",
  "link": "https://www.all-con.co.kr/",
  "logo": "https://www.all-con.co.kr/favicon.ico",
  "background": "rgba(250,140,50,0.2)"
}
```

<!-- END: Hackathon -->

@tab Misc.

```component VPCard
{
  "title": "페퍼노트", 
  "desc": "당신의 삶에 양념 같은 지식을! '그런 건 어떻게 알았어?' 할 때 '그런 것'들을 전해 드립니다.", 
  "link": "https://maily.so/pepper.note", 
  "logo": "https://cdn.maily.so/202402/1706759828643750.png", 
  "background": "rgba(48,94,66,0.2)"
}
```

```component VPCard
{
  "title": "공개SW 포털 - 공개SW 포털",
  "desc": "공개SW 포털 - 공개SW 포털",
  "link": "https://www.oss.kr/",
  "logo": "https://www.oss.kr/storage/app/public/favicon/default/24/06/local",
  "background": "rgba(10,85,135,0.2)"
}
```

```component VPCard
{
  "title": "기백이의 맥가이버",
  "desc": "기백이의 맥가이버",
  "link": "http://www.macguyver.co.kr/",
  "logo": "http://www.macguyver.co.kr/favicon.ico",
  "background": "rgba(69,153,164,0.2)"
}
```

:::

https://woowacon.com/presentations

::: details <FontIcon icon="iconfont icon-github"/>kilimchoi/engineering-blogs

<!-- @include: ./engineering-blogs.md -->

:::

---

<TagLinks />