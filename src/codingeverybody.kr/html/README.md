---
lang: ko-KR
title: "HTML 소개"
description: "Article(s) > HTML 소개"
category: 
  - HTML
  - Article(s)
tag: 
  - blog
  - codingeverybody.kr
  - html
head:
  - - meta:
    - property: og:title
      content: "Article(s) > HTML 소개"
    - property: og:description
      content: "HTML 소개"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/codingeverybody.kr/
prev: /programming/css/articles/README.md
isOriginal: false
author: 옵티안
cover: https://codingeverybody.kr/wp-content/themes/codingeverybody/assets/images/branding/social-share_img.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="HTML - 코딩에브리바디"
  desc="HTML(Hyper Text Markup Language)은 웹 페이지를 만들기 위한 가장 기본적인 언어로써, 웹 개발을 배우는 데 필수적인 언어입니다. 웹 페이지에 표시할 텍스트, 이미지, 링크, 목록 등의 내용을 HTML로 코딩하면 웹 브라우저가 해석해서 웹 페이지에 표시합니다. 처음 배우기에 매우 쉽게 느껴질 것이고, 재미있습니다."
  url="https://codingeverybody.kr/category/html/"
  logo="https://codingeverybody.kr/wp-content/uploads/cropped-favicon-origin-192x192.png"
  preview="https://codingeverybody.kr/wp-content/themes/codingeverybody/assets/images/branding/social-share_img.png"/>

::: info HTML이란 무엇인가?

HTML(Hyper Text Markup Language)은 웹 페이지를 만들기 위한 가장 기본적인 언어로서, 웹 개발을 배우는 데 필수적인 언어입니다.
웹 페이지에 표시할 텍스트, 이미지, 링크, 목록 등의 내용을 HTML로 코딩하면 브라우저가 해석해서 웹 페이지에 표시합니다.
처음 배우기에 매우 쉽게 느껴질 것이고, 재미있습니다.

:::

::: note 사전에 필요로 하는 지식

HTML에 대한 사전 지식은 필요하지 않습니다.
여기서 시작하면 됩니다. 하지만 컴퓨터 사용에 친숙해야하고, 파일을 다루거나 관리하는 등을 이해하고 있어야 합니다.

:::

---

## HTML을 소개합니다

HTML은 웹 페이지의 구조와 콘텐츠의 의미를 정의하고 구성하기 위해 사용되는 언어입니다.
브라우저(크롬브라우저, 사파리 브라우저 등)로 볼 수 있는 콘텐츠를 우리는 웹 페이지라고 부릅니다. 이 브라우저에 표시되는 텍스트, 이미지, 링크, 입력 박스 등 모든 내용은 HTML언어로 만들어저 있습니다. 즉, HTML은 브라우저로 보여지는 웹 페이지를 구성하는 모든 콘텐츠를 구성하고 그 구조를 정의하는 언어입니다.

오직 HTML 언어를 사용해서 브라우저의 콘텐츠, 즉 웹 페이지의 콘텐츠를 구성하고 구조화 할 수 있습니다. 따라서 HTML은 웹 페이지의 콘텐츠를 구성하고 구조화 하는 언어입니다.

::: warning 잠깐!

HTML 언어 이외에도 XML언어도 브라우저에 표시되지만 유저에게 콘텐츠 정보로써 유의미한 정보가 아니라서 여기에서는 설명하지 않습니다.

:::

---

## HTML은 마크업 언어입니다

HTML(HyperText Markup Language)은 브라우저에 표시되는 즉, 웹 페이지에 글과 이미지 등의 다양한 콘텐츠를 표시하기 위해 "마크업(Markup)"을 사용합니다.

마크업(Markup)이란 특정한 구조를 만들어 부호나 기호 등을 활용해서 표기하는 것을 말하는데, 이러한 방법을 활용하는 언어를 마크업 언어라고 말합니다. HTML은 웹 페이지에 표시할 텍스트, 이미지, 링크, 목록 등을 마크업을 활용해서 표기하는 마크업 언어입니다.

---

## HTML은 마크업은 다양한 "요소(Elements)"를 사용합니다

HTML 마크업은 미리 정해져 있는 다양한 요소를 사용합니다.
이 요소들은 브라우저의 콘텐츠를 구성하는 요소라는 의미에서 요소라 말합니다. 이 각각의 요소들로 콘텐츠를 구성하며, 요소들은 각각 특징이나 기능으로 콘텐츠를 구성할 수 있는데, 예를 들어 제목에 해당하는 텍스트는 제목에 관련된 요소들이 있으며, 목록은 목록에 관련된 요소들이 있습니다. 이러한 요소들을 HTML의 구문과 서식으로 구조를 만들어 표기하는 것을 "HTML을 마크업한다"라고 합니다.

### HTML 요소로 마크업한 예제를 살펴 보겠습니다.

```html title="HTML 문서에 HTML 요소를 마크업한 예제입니다."
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <title>문서 제목</title>
  </head>
  <body>
    <!-- 웹 페이지의 내용 -->
  </body>
</html>
```

- [`<!DOCTYPE html>`](/codingeverybody.kr/html/doctype-html.md): 이 부분은 문서 유형을 선언하는 것으로, 브라우저가 최신 버전의 웹 표준 사양을 준수하고 올바르게 렌더링하도록 하는 역할을 합니다.
- [`<html>`](/codingeverybody.kr/html/html-tag/html.md): HTML 문서의 최상위 요소입니다. 모든 HTML 요소는 `<html>` 요소 내에 포함되어야 합니다.
- [`<head>`](/codingeverybody.kr/html/html-tag/head.md): HTML 문서의 메타데이터와 헤더 정보를 정의하는 부분입니다. 이 부분은 브라우저에게 문서에 대한 정보를 전달하거나 외부 스타일시트, JavaScript 파일 등을 연결할 수 있습니다.
- [`<meta charset="UTF-8">`](/codingeverybody.kr/html/html-tag/meta.md): 이 부분은 문서의 문자 인코딩을 정의하는 메타 태그로, 주로 UTF-8 인코딩을 사용합니다. 이를 통해 다국어 문자를 제대로 표시할 수 있습니다.
- [`<title>`](/codingeverybody.kr/html/html-tag/title.md): 이 부분은 웹 페이지의 제목을 정의합니다. 브라우저의 탭 제목이나 검색 결과 등에 표시됩니다.
- [`<body>`](/codingeverybody.kr/html/html-tag/body.md): HTML 문서의 본문 내용을 정의하는 부분입니다. 웹 페이지에 실제로 표시되는 내용이 이 부분에 작성되며, 텍스트, 이미지, 링크, 표, 양식 등 다양한 요소들이 포함될 수 있습니다.

이러한 기본 구조를 가진 HTML 문서를 작성하면, 브라우저에서 해당 문서를 올바르게 해석하여 웹 페이지로 표시합니다.

HTML에는 다양한 요소들이 있습니다

텍스트, 이미지, 링크, 입력 박스 등 웹 페이지를 구성하는 이 요소들은 HTML 언어에서 미리 규정하고 있는 규칙과 권고하고 있는 (일반적으로 '문법'이라고 말하는) 구문과 서식이 있으며, 이 규칙과 권고하고 있는 구문과 서식으로 마크업 해야 합니다. 이러한 구문과 서식에는 요소들을 마크업할 때 어떠한 구조로 마크업 해야 하는지에 대해서도 자세히 규정하고 있습니다.

---

## HTML은 다양한 요소와 관련 구문 및 서식이 있습니다

우리가 볼 수 있는 대부분의 웹사이트에는 텍스트, 리스트, 이미지, 링크, 입력박스, 비디오 등 다양한 콘텐츠가 있습니다. 이러한 콘텐츠는 HTML요소로 마크업하는 것입니다. 이처럼 HTML에는 다양한 요소가 있습니다.

### HTML을 익히고 배운다는 것은 다양한 요소와 구문 및 서식을 배우고 익힌다는 것을 의미합니다

이렇게 다양한 요소들은 아무렇게나 마크업하는 것이 아니라 HTML 언어에서 미리 규정하고 있는 규칙과 권고하는 구문과 서식으로 마크업해야 합니다.

웹 페이지에 표시할 텍스트, 이미지, 링크, 목록 등의 내용을 HTML 요소들로 마크업하면 브라우저가 해석해서 웹 페이지에 표시합니다.
브라우저는 크롬, 사파리, 파이어 폭스, 그 외에도 다양하게 있습니다. 만약에 이 다양한 브라우저들이 각각의 자신들만의 방법으로 마크업한 HTML 요소들을 해석해서 표시하면 어떻게 될까요? 또는 해석하지 못하면 어떻게 될까요?

이러한 일이 발생하면, HTML을 사용하는 웹 개발자뿐만 아니라, 웹 사이트를 사용하는 사용자, 그리고 이러한 웹과 연동된 응용 프로그램들은 크거나 작은 문제나 불편함들이 발생하게 될 것입니다. 그래서 이러한 일이 발생하지 않게 하기 위해서 표준(권고)안을 제시하고 있습니다.

HTML의 다양한 요소와 구문 및 서식은 웹을 위한 표준을 개발하고 장려하기 위해 웹의 창안자인 '팀 버니스리'를 중심으로 조직된 월드 와이드 웹 컨소시엄(World Wide Web Consortium, 축약형은 WWW 또는 W3)에서 관리하다가 2019년 이 후에는 애플, 모질라, 구글과 마이크로소프트 등으로 구성된 웹 하이퍼텍스트 애플리케이션 테크놀로지 워킹 그룹(Web Hypertext Application Technology Working Group, WHATWG)에서 관리하고 있습니다.

### HTML 표준(권고)안은 계속 업데이트되고 있습니다.

1989년에 HTML이 발명된 이 후로 지금까지 HTML은 꾸준히 업데이트되고 있습니다. 1991년 HTML1.0을 발표했고, 2014년 HTML5.0이 출시되어 현재는 그 후에도 업데이트 되고 있는 최신 HTML5 버전을 전세계가 표준(권고)안으로 따르고 있습니다. 표준(권고)안을 '명세서'라고도 부릅니다.

HTML 요소와 관련 구문 및 서식은 HTML 표준(권고)안에 따라 계속 추가되거나 수정, 삭제될 수 있습니다.

::: info

코딩에브리바디는 최신 HTML5 표준(권고)안을 따릅니다.

:::

---

## 참고문헌

<SiteInfo
  name="HTML: HyperText Markup Language | MDN"
  desc="HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content. Other technologies besides HTML are generally used to describe a web page's appearance/presentation (CSS) or functionality/behavior (JavaScript)."
  url="https://developer.mozilla.org/en-US/docs/Web/HTML/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

<SiteInfo
  name="HTML - Wikipedia"
  desc="Hypertext Markup Language (HTML) is the standard markup language for documents designed to be displayed in a web browser. It defines the content and structure of web content. It is often assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript."
  url="https://en.wikipedia.org/wiki/HTML/"
  logo="https://en.wikipedia.org/static/favicon/wikipedia.ico"
  preview="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/640px-HTML5_logo_and_wordmark.svg.png"/>

```component VPCard
{
  "title": "HTML Standard",
  "desc": "",
  "link": "https://html.spec.whatwg.org/multipage/",
  "logo": "https://resources.whatwg.org/logo.svg",
  "background": "rgba(75,120,36,0.2)"
}
```

<SiteInfo
  name="W3C and WHATWG to work together to advance the open Web platform"
  desc="The World Wide Web Consortium (W3C) is an international community where Member organizations, a full-time staff, and the public work together to develop Web standards."
  url="https://w3.org/blog/2019/w3c-and-whatwg-to-work-together-to-advance-the-open-web-platform/"
  logo="https://www.w3.org/favicon.ico"
  preview="https://w3.org/assets/website-2021/images/w3c-opengraph-image.png"/>
