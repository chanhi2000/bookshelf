---
lang: ko-KR
title: "URL이 이상해요! Java와 Spring 중 범인은 누구?"
description: "Article(s) > URL이 이상해요! Java와 Spring 중 범인은 누구?"
icon: iconfont icon-spring
category:
  - Java
  - Kotlin
  - Spring
  - Article(s)
tag:
  - blog
  - tech.kakaopay.com
  - java
  - jdk
  - spring
  - kotlin
  - uri
  - UriComponentsBuilder
  - 알림피드
head:
  - - meta:
    - property: og:title
      content: "Article(s) > URL이 이상해요! Java와 Spring 중 범인은 누구?"
    - property: og:description
      content: "URL이 이상해요! Java와 Spring 중 범인은 누구?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tech.kakaopay.com/url-is-strange.html
prev: /articles/README.md
date: 2024-09-26
isOriginal: false
author: rain.drop
cover: https://tech.kakaopay.com/_astro/thumb.ae533dc7_Z1gJ8gh.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Spring > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-spring/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="URL이 이상해요! Java와 Spring 중 범인은 누구?"
  desc="카카오페이 알림피드 서비스에서 발생한 장애 원인과 해결 과정을 공유합니다."
  url="https://tech.kakaopay.com/post/url-is-strange/"
  logo="https://tech.kakaopay.com/favicon.ico"
  preview="https://tech.kakaopay.com/_astro/thumb.ae533dc7_Z1gJ8gh.png"/>

::: info 요약

이 글은 카카오페이 알림피드 서비스에서 발생한 장애 원인과 해결 과정을 다룹니다. 알림피드의 랜딩 URL을 가공하는 중 발생한 문제를 분석하며, Java의 URI 클래스와 Spring의 `UriComponentsBuilder` 클래스 간의 불일치가 장애의 원인이었음을 설명합니다. 이를 해결하기 위해 `fromUriString` 메서드를 사용하여 문제를 해결하는 방법을 제안하며, 경험을 공유하는 글입니다.

:::

::: note 💡 **리뷰어 한줄평**

> **hyeoni.c** 평소 잘 사용하던 라이브러리의 정책과 내부 구현을 살펴보며 문제를 해결해 가는 과정을 재밌게 풀어내었습니다. 유사한 경험을 가지신, 앞으로 마주할 수 있는 모든 분들에게 추천합니다!

> **daisy.dani** URI 정보가 왜 갑자기 사라졌을까요? 이 글에서 원인을 파헤치고, 어떻게 해결할 수 있는지 알아봅시다!

:::

---

## 시작하며

Spring 프레임워크가 제공하는 `UriComponentsBuilder` 클래스를 아시나요? `UriComponentsBuilder` 클래스는 URL을 쉽게 다루기 위한 유틸 클래스입니다. 이번에 URL을 수정하기 위해 `UriComponentsBuilder` 클래스를 사용하던 중 서비스 장애가 발생했는데요. 원인을 분석해 보니 `java.net.URI` 클래스와 `UriComponentsBuilder` 클래스 사이에서 꽤나 흥미로운 일이 이뤄지고 있습니다. 무슨 일인지 궁금하지 않으신가요? 지금부터 함께 당시의 상황 속으로 들어가 보겠습니다.

안녕하세요. 채널서버유닛의 레인입니다. 채널서버유닛은 여러분이 카카오페이의 다양한 서비스와 혜택을 마주하고 탐색할 수 있도록 홈 탭, 혜택 탭, 결제 탭 등 다양한 전면 서비스를 개발하고 있습니다. 이러한 서비스에는 **이 글의 배경이 되는 알림피드**도 존재하는데요. 카카오페이 앱을 사용하신다면 아래 사진 속 공간, 알림피드가 익숙하실 겁니다.

 ![(좌) OS 알림 센터 / (우) 알림피드](https://tech.kakaopay.com/_astro/screen.063e0de1_2f5m8V.avif) 

**알림피드는 여러분이 언제나 편하게 알림을 탐색하고 원하는 서비스를 방문할 수 있도록 노력하고 있습니다.** 클릭하면 메시지가 사라지는 OS 알림 센터와 달리 메시지를 다시 볼 수 있도록 30일 동안 보관하고 있고요. 알림을 식별하기 편하도록 메시지에 서비스를 표시하거나, 원하는 종류의 알림을 탐색하기 편하도록 필터 등의 기능을 제공하고 있습니다.

---

## 기: 무슨 일이 발생했는가

알림피드를 구성하는 데이터는 앱푸시로 발송하는 메시지에 기반하고 있습니다. 그래서 알림피드는 OS 알림 센터 환경에 맞춰진 데이터들을 목적에 맞게 가공해서 사용하고 있습니다. 이 과정에서 알림피드는 반복되는 키워드를 제거하는 등 문구를 가공하고 있는데요. **어느 날 메시지의 랜딩 URL도 가공해야 하는 순간이 찾아왔습니다.**

### 정책을 반영하다

카카오페이 앱 정책이 변경되면서 **OS 알림 센터와 알림피드에서 메시지의 랜딩 동작이 서로 달라야 했습니다.** OS 알림 센터에서 앱푸시 메시지를 클릭한 경우는 카카오페이 앱이 열리고 특정 흐름을 거친 후 서비스로 랜딩 합니다. 하지만 알림피드에서 메시지를 클릭한 경우는 카카오페이 앱 내부에서의 동작이기 때문에 특정 흐름을 거치지 않아야 합니다.

정책을 반영하기 위해서는 **메시지의 랜딩 URL에서 특정 파라미터를 제거하면 됩니다.** 아래와 같이 OS 알림 센터에 맞춰진 메시지 랜딩 URL에서 base 파라미터를 제거하면 되는데요. 알림피드에 랜딩 URL을 가공하는 로직을 추가한 그날 문제가 발생했습니다.

- OS 알림 센터에서의 메시지 랜딩 URL: `kakaopay://payweb?base=home&min_version=2.22.1`
- 알림피드에서의 메시지 랜딩 URL: `kakaopay://payweb?min_version=2.22.1`

### 장애가 발생하다

알림피드에 URL 재처리 기능을 배포하고 몇 시간 후, 내부 크루 채널을 통해 **알림피드가 이상하다는 제보를 받았습니다.** 제보에 따르면 알림피드에서 특정 메시지의 랜딩이 제대로 동작하지 않고 있었습니다.

 ![](https://tech.kakaopay.com/_astro/landing_error.914c1172_e7ocx.avif) 

해당 계정의 API 응답을 확인해 보니 **메시지의 랜딩 URL이 이상했습니다.** 이 현상은 특정 메시지에서만 발생했는데요. 처음에는 해당 메시지가 랜딩 URL이 잘못된 상태로 저장된 것은 아닐까 의심했습니다. 하지만 알림피드 DB를 살펴보니 데이터 상에는 문제가 없었습니다.

- API 응답 내 메시지의 랜딩 URL: `kakaopay:?min_version=2.22.1&data=(생략)`
- DB에 저장된 메시지의 랜딩 URL: `kakaopay://payweb_tab?min_version=2.22.1&data=(생략)`
- \=> API 응답에 담긴 메시지의 랜딩 URL의 경우 **`//payweb_tab` 정보가 사라졌습니다.**

데이터 상에 문제가 없다는 것은 앞서 배포한 기능에 문제가 있음을 의미했습니다. 그래서 앞서 배포한 기능을 롤백했더니 다행히도 더 이상 문제가 발생하지 않았습니다.

---

---

## 승: 무엇이 문제였는가

배포한 기능에 문제가 있다는 점을 인지했을 때 몹시 당황스러웠습니다. QA도 진행하고 카나리 응답도 확인하는 등 여러 방면으로 검증을 진행했기 때문에 기능에 대한 확신이 있었습니다. 그래서 이 상황이 믿기지 않았는데요. 진정하고 원인을 분석하기 시작하자 놀라운 사실들이 보이기 시작했습니다.

### 추가한 코드를 살펴보자

```kotlin
private fun String.removeBaseParameter(): String =
    UriComponentsBuilder.fromUri(URI(this))
        .replaceQueryParam("base", null)
        .build()
        .toUriString()
```

위의 코드가 바로, 당시 **추가한 코틀린 확장함수입니다.** Spring 프레임워크가 제공하는 `UriComponentsBuilder` 클래스를 사용하여 URL 문자열에서 특정 파라미터를 제거하고 있습니다. 여러분은 이 코드에서 문제점이 무엇인지 보이시나요?

이 확장함수는 컴파일도 잘 되고 특정 파라미터를 제거하는 동작도 잘 수행합니다. 그래서 QA를 비롯한 여러 검증도 문제없이 통과했습니다. 하지만 앞서 장애 상황에서 보았듯 **특정 URL이 주어지면 이상하게 동작하고 있습니다.**

당시의 상황을 테스트 코드로 작성해 보겠습니다.

```kotlin
@Test
fun test1() { // 당시 문제가 발생하지 않았던 케이스
    val actual = "kakaopay://payweb?base=home&min_version=2.22.1".removeBaseParameter()
    val expected = "kakaopay://payweb?min_version=2.22.1"

    actual shouldBe expected
}

@Test
fun test2() { // 당시 문제가 발생했던 케이스
    val actual = "kakaopay://payweb_tab?base=home&min_version=2.22.1".removeBaseParameter()
    val expected = "kakaopay://payweb_tab?min_version=2.22.1"

    actual shouldBe expected
}
```

![](https://tech.kakaopay.com/_astro/test_result.1eb9bdd2_Z4mrQ6.avif) 

위에서 테스트를 통과하지 못한 URL이 바로 당시 문제를 일으킨 URL입니다. 이 URL의 테스트 실행 결과를 보면, 특정 파라미터뿐만 아니라 **URL의 주요 요소까지 제거된 것을 볼 수 있습니다.** `payweb_tab` 정보는 어디로 사라진 걸까요?

### 사라진 정보를 찾아보자

앞서 비교한 두 문자열에 대해 `UriComponentsBuilder#fromUri` 정적 팩토리 메서드의 반환 값을 확인해 보겠습니다.

![정상 케이스](https://tech.kakaopay.com/_astro/fromUri_host_exists.b2b3ad76_Z26H84S.avif)

![비정상 케이스](https://tech.kakaopay.com/_astro/fromUri_host_null.f01247c2_1hFhYI.avif)

정상 케이스와 달리 비정상 케이스의 `host` 변수가 비어 있습니다. 정상 케이스의 `host` 변수에 `payweb`이 저장된 것을 보면, 비정상 케이스의 `host` 변수에는 동일한 위치의 `payweb_tab`이 저장되어야 할 것 같은데요. 어째서 `host` 변수에 `payweb_tab` 정보가 담기지 못한 걸까요?

`UriComponentsBuilder#fromUri` 메서드에서 `host` 변수에 무엇을 저장하는지 확인해 보겠습니다.

![](https://tech.kakaopay.com/_astro/UriComponentsBuilder_fromUri.4e8d9e9d_1PQ0wU.avif)

![](https://tech.kakaopay.com/_astro/UriComponentsBuilder_uri.b22745bb_ZR0Aj3.avif)

`UriComponentsBuilder#fromUri`에서 호출하는 `UriComponentsBuilder#uri`를 따라가 보면 `host` 변수에 무엇이 저장되는지 볼 수 있습니다. 인자로 전달된 `URI` 인스턴스의 `host` 변수를 넘겨받아 저장하고 있네요. 그렇다면 `UriComponentsBuilder` 인스턴스의 `host` 변수와 마찬가지로 `URI` 인스턴스의 `host` 변수도 비어 있을까요?

이어서 인자로 전달된 `URI` 인스턴스도 확인해 보겠습니다.

![정상 케이스](https://tech.kakaopay.com/_astro/URI_host_exists.3261570c_1UH0Qp.avif)

![비정상 케이스](https://tech.kakaopay.com/_astro/URI_host_null.eb4f9b78_Z2uQCIt.avif)

정상 케이스와 달리 비정상 케이스의 host 변수가 비어 있네요. 결국 **`UriComponentsBuilder` 인스턴스가 잘못된 URL을 만들어낸 것은 URI 인스턴스의 host 변수가 비어 있었기 때문이었습니다.** `payweb_tab` 정보는 어디로 사라진 걸까요? URI 인스턴스가 `payweb_tab` 정보를 저장하지 않은 걸까요?

### 사라진 정보는 여기에

사실 **URI 인스턴스는 `payweb_tab` 정보를 버리지 않았습니다.** 비정상 케이스의 URI 인스턴스에 대해 toString 메서드를 호출해 보면 아래와 같이 `payweb_tab` 정보가 포함된 URL이 반환되는 것을 볼 수 있습니다.

 ![](https://tech.kakaopay.com/_astro/URI_host_null_toString.d118cf92_Z74Q2I.avif) 

그리고 비정상 케이스의 URI 인스턴스 변수를 다시 확인해 보면 **`authority` 변수에 값을 저장하고 있는 것도 볼 수 있습니다.**

 ![](https://tech.kakaopay.com/_astro/URI_host_null_authority.a7e39746_Z1lUgWV.avif) 

즉 우리가 찾아 헤매던 `payweb_tab` 정보는 URI 인스턴스에 있었습니다. **단지 `host` 변수가 아닌 `authority` 변수에만 저장하고 있을 뿐입니다.**

사라진 정보의 행방은 찾았지만 여전히 문제의 발생 원인은 오리무중입니다. 왜 URI 인스턴스의 host 변수는 비어있고, 왜 UriComponentsBuilder 인스턴스는 authority 변수를 바라보지 않은 걸까요? 잠시 URI에 대해 알아본 후, 이들의 동작 구조를 확인해 보며 답을 찾아보겠습니다.

---

## 쉬어가며

이후의 내용을 이해하기 위해서는 URI에 대해 알아볼 필요가 있습니다. 여러분은 URI에 대해 알고 계신가요? 흔히 사용하는 URL과는 달리 URI는 생소할 수 있는데요. 잠시 URI에 대해 알아보겠습니다.

### URI에 대해 알아보자

RFC 1630[^1]에 따르면 URI(Uniform Resource Identifier)는 인터넷 자원의 고유 식별자를 의미합니다. 그에 반해 우리에게 익숙한 URL(Uniform Resource Locator)은 URI의 하위 개념으로, 인터넷 자원의 위치를 의미합니다.

대부분의 경우는 위치만으로 자원을 식별할 수 있기 때문에 URI와 URL이 동일합니다. 하지만 게시글의 특정 섹션을 가리킬 때처럼 위치만으로 자원을 식별할 수 없을 때는 URI와 URL이 다른 형태를 띠곤 합니다.

- URI: **[https://tech.kakaopay.com/post/r2dbc-connection-pool-missing#커넥션-풀에-기대하는-동작](https://tech.kakaopay.com/post/r2dbc-connection-pool-missing#%EC%BB%A4%EB%84%A5%EC%85%98-%ED%92%80%EC%97%90-%EA%B8%B0%EB%8C%80%ED%95%98%EB%8A%94-%EB%8F%99%EC%9E%91)**
- URL: **[https://tech.kakaopay.com/post/r2dbc-connection-pool-missing](https://tech.kakaopay.com/post/r2dbc-connection-pool-missing)**

URI를 구성하는 요소를 간단히 표현하면 다음과 같습니다.

![출처: [<VPIcon icon="fas fa-globe"/>novaworkssoftware.com](https://novaworkssoftware.com/blog/archives/218-LDC-72-Get-Crackn-Working-with-URIs.html)](https://tech.kakaopay.com/_astro/URI_hierarchical_part.1d224dc1_2f3LhN.avif)

익숙한 단어가 보이지 않으신가요? 앞서 봐왔던 **`host`와 `authority`는 URI의 주요 요소입니다.** host는 인터넷상에서 식별 가능한 주소(도메인 주소, IP 주소)를 의미합니다. 그리고 authority는 주소와 사용자 정보 등이 결합된 접근 권한을 의미합니다.

`ftc://rain-drop:password** **@kakaopay.com/data.txt`을 예로 들어볼게요. 여기서 `authority`는 접근 권한으로 `rain-drop:password@kakaopay.com`을 가리키고, host는 식별 가능한 주소 “kakaopay.com”를 가리킵니다.

그렇다면 장애가 발생한 메시지의 `kakaopay://payweb_tab?min_version=2.22.1`은 어떨까요? `authority`의 구성 요소 중 사용자 정보와 port 정보는 생략 가능하기 때문에, 여기서 `authority`와 `host`는 모두 `payweb_tab`을 가리킵니다.

`authority`와 `host`의 관계를 기억해 주세요. 다른 구성요소는 이 글에서 중요하지 않기에 다루지 않겠습니다.

---

## 전: 누구의 문제인가

앞서 우리는 사라진 정보의 행방을 찾으며 Java 표준 라이브러리가 제공하는 `java.net.URI` 클래스와 Spring 프레임워크가 제공하는 `UriComponentsBuilder` 클래스 사이에서 **불협화음을 확인했습니다.** URI 인스턴스가 저장하고 있는 정보가 `UriComponentsBuilder` 인스턴스로 전달되지 못한 이 상황을 어떻게 바라봐야 할까요? 아래의 의문점을 하나씩 들여다보며 나아가 보겠습니다.

- 왜 URI 인스턴스는 `host` 변수를 비워두는가?
- 왜 `UriComponentsBuilder` 인스턴스는 `authority` 변수를 바라보지 않는가?

### `java.net.URI` 클래스를 들여다보다

`java.net.URI` 클래스가 host 변수를 어떻게 저장하고 있는지 확인하기 위해 생성자를 들여다보겠습니다.

```java
public URI(String str) throws URISyntaxException {
    new Parser(str).parse(false);
}
```

1. `URI.Parser`#parse
2. `URI.Parser`#parseHierarchical
3. `URI.Parser`#parseAuthority
4. `URI.Parser`#parseServer
5. `URI.Parser`#parseHostname
6. ...

URI 클래스의 생성자를 들여다보면 `Parser#parse` 메서드를 호출하는 모습이 보입니다. `Parser#parse` 메서드를 따라 들어가 보면 위의 흐름도를 완성할 수 있는데요. 여기서 `parseHostname` 메서드가 바로 host 영역의 구문 분석을 담당하는 메서드입니다.

다음은 `parseHostname` 메서드의 내용입니다.

![](https://tech.kakaopay.com/_astro/URI_parseHostname.adc23c2c_2qK3uY.avif) 

`parseHostname` 메서드의 주석에는 host 영역의 구성 규칙이 적혀있습니다. 이 주석은 host 영역이 영문자와 숫자, 그리고 `-` 문자로 구성될 수 있다고 말하고 있습니다. 그런데 뭔가 이상하지 않나요?

`kakaopay://payweb_tab?min_version=2.22.1` URL을 떠올려 보겠습니다. 이 URL의 `payweb_tab`은 `-` 문자가 아닌 `_` 문자를 포함하고 있습니다. `parseHostname`가 따르는 **`host` 영역의 구성 규칙을 어기고 있는 것인데요.** 결국 `parseHostname` 메서드는 `payweb_tab`을 host 변수에 저장하지 않습니다.

`kakaopay://payweb_tab?min_version=2.22.1` URL이 규칙을 위배하고 있다니, 대체 어떻게 된 일일까요? 애당초 이 문제의 시작은 규칙에 어긋난 URL을 만들어 사용했기 때문이었을까요? URI 문법에 대해 조사해 봤습니다.

### RFC 문서를 찾아보다

[Java Docs](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/net/URI.html)를 보면 아래와 설명에서 `java.net.URI` 클래스가 따르는 RFC 문서를 알 수 있습니다. RFC 2396[^2]은 URI의 문법을 처음 정의한 문서입니다. 이 문서는 URI의 구성요소가 어떠한 규칙을 가져야 하는지 정의하고 있습니다.

::: info RFC 2396

Represents a Uniform Resource Identifier (URI) reference. Aside from some minor deviations noted below, an instance of this class represents a URI reference as defined by [RFC 2396: Uniform Resource Identifiers (URI): Generic Syntax](https://ietf.org/rfc/rfc2396.txt), amended by [RFC 2732: Format for Literal IPv6 Addresses in URLs](https://ietf.org/rfc/rfc2732.txt).

:::

이 문서의 \[RFC 2396. Section 3.2.2\]에는 아래와 같이 host 영역의 규칙이 적혀 있습니다. 하지만 앞서 `parseHostname` 메서드의 주석에서 본 것처럼 `_` 문자는 찾아볼 수 없습니다.

::: info RFC 2396

Hostnames take the form described in Section 3 of \[RFC1034\] and Section 2.1 of \[RFC1123\]: a sequence of domain labels separated by ”.”, each domain label starting and ending with an **alphanumeric character and possibly also containing ”-” characters**.

:::

위 내용에 따르면 결국 `kakaopay://payweb_tab?min_version=2.22.1`은 RFC 2396을 위배하고 있습니다. 그렇다면 `kakaopay://payweb_tab?min_version=2.22.1`은 정말 잘못된 URL일까요? 흥미롭게도 URI 문법에 대한 RFC 문서는 하나가 더 존재합니다.

URI 클래스가 따르는 RFC 2396은 1998년에 작성된 문서입니다. 이때 URI 참조 문법이 처음 정의됐는데요. 시간이 흘러 2005년에 RFC 3986[^3]이 등장했습니다. **오늘날 표준이 된 RFC 3986은 RFC 2396을 대체하여 URI 문법을 재정의**하고 있으며, 이와 관련된 내용을 \[RFC 3986. Introduction\]에서 찾아볼 수 있습니다.

::: info RFC 3986

This document obsoletes \[RFC2396\], which merged “Uniform Resource Locators” \[RFC1738\] and “Relative Uniform Resource Locators” \[RFC1808\] in order to define a single, generic syntax for all URIs.

:::

RFC 3986은 RFC 2396에서 어떤 부분이 바뀌었을까요? 문서를 살펴보면 아래의 문구를 확인할 수 있습니다.

::: info RFC 3986

The server, hostport, hostname, domainlabel, toplabel, and alphanum rules have been removed.

:::

**RFC 3986은 더 이상 RFC 2396에 정의된 여러 규칙을 따르지 않습니다.** 제약을 없애는 방향을 택했고, RFC 2396과 달리 Hostname으로 `_` 문자를 허용하고 있습니다.

즉 `kakaopay://payweb_tab?min_version=2.22.1` URL은 RFC 3986에 따라 규칙을 지키고 있었습니다. 오히려 URI 클래스가 지금은 폐지된 옛 문법을 따르며 `payweb_tab`을 host로 인지하지 못하고 있었습니다. 그렇다면 `UriComponentsBuilder` 클래스는 어떨까요?

### `UriComponentsBuilder` 클래스를 들여다보다

`UriComponentsBuilder` 클래스는 RFC 3986을 따르고 있습니다. 이 내용은 코드에서 확인할 수 있고, 아래의 \[RFC 3986. appendix B\]에 나온 정규식에 따라 URI를 파싱한다는 점도 확인할 수 있습니다.

::: info RFC 3986

The following line is the regular expression for breaking-down a well-formed URI reference into its components.- `^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?`

![](https://tech.kakaopay.com/_astro/UriComponentsBuilder_code.547aa00e_1LuMMN.avif) 

:::

그렇다면 `UriComponentsBuilder`는 왜 `java.net.URI`의 `authority` 변수를 바라보지 않았을까요? URI 인스턴스의 `host` 변수가 비어 있다면 `authority` 변수를 바라봤으면 좋았을 텐데요. 아쉽게도 `UriComponentsBuilder` 클래스, 그리고 이 클래스가 생성하는 `UriComponents` 클래스는 **`authority`를 관리하지 않고 있습니다.**

아래 `UriComponents`의 `getter` 메서드 목록을 보시면 이들이 다루는 URI의 구성요소를 볼 수 있습니다.

![](https://tech.kakaopay.com/_astro/UriComponents_methods.fcb8172c_1qTL9R.avif) 

`authority`의 요소인 `userinfo`, `host`, `port` 등은 보이지만 `authority` 자체는 보이지 않습니다. 즉 `UriComponentsBuilder`는 `authority`를 다루지 않기 때문에 `java.net.URI`의 `authority` 변수를 바라보지 않았고, 이로 인해 정보의 누락이 발생한 것입니다.

---

## 결: 어떻게 해결할 수 있는가

### 의문에 답을 내리다

우리는 이 장애가 왜 발생했는지 드디어 해답을 찾았습니다. 이제는 의문에 대해 하나씩 답을 적어보며 정리해 보겠습니다.

::: note Question. 왜 <code>URI</code> 인스턴스는 <code>host</code> 변수를 비워두는가?

`java.net.URI` 클래스는 RFC 2396을 따르고 있습니다. RFC 2396에 의하면 host는 영문자, 숫자, `-` 문자로 구성되어야 합니다. 그래서 `java.net.URI` 클래스는 규칙에 어긋난 `payweb_tab`을 host에 저장하지 않았습니다.

:::

::: note Question. RFC 2396을 위배한다면 처음부터 URL이 잘못된 것 아닌가?

URL이 잘못된 것은 아닙니다. 오늘날 표준이 된 RFC 3986에서는 `host`의 규칙 제한을 해제했기 때문에 `payweb_tab`은 `host`가 맞습니다. 단지 `java.net.URI`가 폐지된 RFC 2396을 따르고 있기에 발생한 문제입니다.

:::

::: note Question. 왜 <code>UriComponentsBuilder</code> 인스턴스는 <code>authority</code> 변수를 바라보지 않는가?

`UriComponentsBuilder` 클래스는 `userinfo`, `host`, `port` 등의 구성요소는 관리하지만 `authority`를 다루지는 않습니다. 때문에 `UriComponentsBuilder#fromUri` 메서드는 인자로 전달된 `URI` 인스턴스로부터 `authority` 변수를 바라보지 않은 것입니다.

:::

::: note Question. 누구의 잘못인가?

함부로 말하기 어렵지만, 개인적인 생각으로는 `UriComponentsBuilder#fromUri`의 문제라고 생각합니다. `java.net.URI`는 폐지된 RFC 2396을 따를 뿐 `URI` 파싱에 문제가 없습니다. 정보를 누락하지 않고 `authority`에 저장하고 있기도 합니다. 하지만 `UriComponentsBuilder`의 경우, `authority`를 관리하지 않고 있습니다. `URI` 인스턴스의 `host`만을 바라보고 있던 부분, 바로 이것이 문제의 원인이라고 생각합니다.

:::

### `fromUriString` 메서드를 사용하다

문제 발생 원인을 찾았으니, 이제 해결책을 알아보겠습니다. 재밌게도 `UriComponentsBuilder#fromUri`의 대안은 `UriComponentsBuilder` 클래스 안에 있습니다. `UriComponentsBuilder` 클래스는 **`fromUriString` 메서드를 제공**하고 있는데요.

이 메서드를 들여다보면, 정규식에 기반하여 URI를 파싱하고 있음을 볼 수 있습니다. \[RFC 3986. appendix B\]에 나온 정규식에 따라 host 등의 구성요소를 파싱하기 때문에 `java.net.URI`와 달리 정보를 누락하지 않습니다.

```java
public class UriComponentsBuilder {
  private static final String SCHEME_PATTERN = "([^:/?#]+):";
  private static final String USERINFO_PATTERN = "([^@/]*)";
  private static final String HOST_PATTERN = "([^/?#:]*)";
  private static final String PORT_PATTERN = "(\\d*)";
  private static final String PATH_PATTERN = "([^?#]*)";
  private static final String QUERY_PATTERN = "([^#]*)";
  private static final String LAST_PATTERN = "(.*)";

  // Regex patterns that matches URIs. See RFC 3986, appendix B
  private static final Pattern URI_PATTERN = Pattern.compile(
      "^(" + SCHEME_PATTERN + ")?" + "(//(" + USERINFO_PATTERN + "@)?" + HOST_PATTERN + "(:" + PORT_PATTERN +
          ")?" + ")?" + PATH_PATTERN + "(\\?" + QUERY_PATTERN + ")?" + "(#" + LAST_PATTERN + ")?");

  public static UriComponentsBuilder fromUriString(String uri) {
    Assert.hasLength(uri, "'uri' must not be empty");
    Matcher m = URI_PATTERN.matcher(uri);
    if (m.matches()) {
      UriComponentsBuilder builder = new UriComponentsBuilder();

      builder.scheme(m.group(2));
      builder.userInfo(m.group(5));
      builder.host(m.group(6));
      String port = m.group(8);
      if (StringUtils.hasLength(port)) {
        builder.port(Integer.parseInt(port));
      }
      builder.path(m.group(9));
      builder.query(m.group(11));
      builder.fragment(m.group(13));

      return builder;
    }
    else {
      throw new IllegalArgumentException("[" + uri + "] is not a valid URI");
    }
  }
  ...
}
```

장애 당시 추가했던 확장함수에 대해 `fromUriString` 메서드를 사용토록 수정하고 테스트 코드를 실행해 봤습니다. `fromUri` 메서드를 사용했던 이전과 달리, 모든 테스트가 통과하는 것을 볼 수 있습니다.

```kotlin
private fun String.removeBaseParameter(): String =
    UriComponentsBuilder.fromUriString(this) // 수정 (fromUri -> fromUriString)
        .replaceQueryParam("base", null)
        .build()
        .toUriString()

@Test
fun test1() {
    val actual = "kakaopay://payweb?base=home&min_version=2.22.1".removeBaseParameter()
    val expected = "kakaopay://payweb?min_version=2.22.1"

    actual shouldBe expected
}

@Test
fun test2() {
    val actual = "kakaopay://payweb_tab?base=home&min_version=2.22.1".removeBaseParameter()
    val expected = "kakaopay://payweb_tab?min_version=2.22.1"

    actual shouldBe expected
}
```

![](https://tech.kakaopay.com/_astro/test_success.76960382_2jxcf2.avif) 

### 재발 방지에 기여하다.

원인을 분석하고 문제를 해결한 다음, 항상 마지막에는 재발 방지를 고민하고 있습니다. 지금껏 장애는 주로 개발이나 기획의 실수로 발생했습니다. 그래서 테스트 코드를 보충하거나 QA에 검증 케이스를 추가하는 방향으로 재발 방지를 해왔는데요. 이번에 발생한 장애 상황은 좀 달랐습니다.

`UriComponentsBuilder#fromUri` 메서드에 이런 문제점이 있다는 사실을 과연 얼마나 많은 개발자들이 알고 있을까요? 내부 구현을 들여다보지 않았다면 이 사실을 모를 겁니다. 우리도 내부 구현을 들여다본 후에야 `java.net.URI` 클래스와 `UriComponentsBuilder` 클래스 사이의 정보 누락을 알았으니까요. 이렇듯 이번 장애는 개발자의 실수가 아니라 라이브러리의 내부 구현에 의해 발생했다는 점에서 평상시의 장애 상황과 달랐습니다.

그래서 이 내용을 사내 채널에 공유했습니다. 카카오페이가 보다 안전한 서비스를 제공할 수 있도록, 많은 크루들이 이 문제점을 인지하고 `UriComponentsBuilder` 클래스를 사용할 때 주의하기를 바랐습니다. 이 내용은 감사하게도 많은 분들의 관심을 받았습니다. 그리고 위험성에 공감하신 크루들의 추천으로 카카오페이 전사 소나큐브에 커스텀 룰으로 등록될 수 있었습니다.

![](https://tech.kakaopay.com/_astro/sonar.16182527_1HWJ68.avif) 

---

---

## 마치며

지금까지 알림피드 서비스에서 발생한 장애 상황에 대해 원인과 대안을 살펴봤습니다. `java.net.URI` 클래스와 `UriComponentsBuilder` 클래스의 관계에 대해 들여다볼 수 있어서 뜻깊은 시간이었는데요. 여러분은 어떠셨나요?

저는 새로운 사실을 알게 되어 흥미로운 시간이기도 했지만 아쉬움이 많이 남는 시간이기도 했습니다. 사실 기능을 구현할 당시 `fromUriString` 메서드의 존재를 알고 있었습니다. 다만 `fromUriString` 메서드와 `fromUri` 메서드가 인자 타입을 다양히 받기 위해 존재한다고 생각했습니다. 이런 단순한 생각 때문에 내부 동작을 모름에도 `fromUri` 메서드를 선택했는데요. `String` 문자열을 그대로 인자로 넘기는 것보단 **`URI` 클래스로 한 번 감싸서 전달하는 것이 구문 분석에 있어서 안전할 것이라고 판단했습니다.** 하지만 제 의도와 달리 내부 동작은 그렇지 않았고, 그로 인해 장애가 발생했습니다.

다시 그때로 되돌아간다면 이 문제를 막을 수 있었을까요? 확신하기 어렵지만, 그래도 현재와 미래는 다릅니다. 이번 경험에서 많은 것을 학습하고 생각할 수 있었습니다. `java.net.URI` 클래스와 `UriComponentsBuilder` 클래스의 관계에 대한 사실도 알 수 있었고, 평소 당연하듯이 사용해 오던 라이브러리에 대해 조심스러운 태도를 가질 수 있었습니다. 여러분은 어떠셨나요? 제가 경험한 이 내용이 여러분께도 도움 되었으면 좋겠습니다.

지금까지 긴 시간 읽어주셔서 감사합니다.

---

## 참고 자료

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "URL이 이상해요! Java와 Spring 중 범인은 누구?",
  "desc": "카카오페이 알림피드 서비스에서 발생한 장애 원인과 해결 과정을 공유합니다.",
  "link": "https://chanhi2000.github.io/bookshelf/tech.kakaopay.com/url-is-strange.html",
  "logo": "https://tech.kakaopay.com/favicon.ico",
  "background": "rgba(255,84,15,0.2)"
}
```

[^1]: [RFC 1630: Universal Resource Identifiers in WWW](https://ietf.org/rfc/rfc1630.txt)
[^2]: [RFC 2396: Uniform Resource Identifiers (URI): Generic Syntax](https://ietf.org/rfc/rfc2396.txt)
[^3]: [RFC 3986: Uniform Resource Identifier (URI): Generic Syntax](https://ietf.org/rfc/rfc3986.txt)