import{_ as v,a as b,b as L}from"./04-CG8GMV8p.js";import{_ as k}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as S,am as a,as as C,ao as o,at as p,au as d,ap as n,an as e,al as g,ak as J,aq as r,ar as y}from"./app-CpYYKbnj.js";const P="/bookshelf/assets/image/d2.naver.com/8113611/01.png",E="/bookshelf/assets/image/d2.naver.com/8113611/07.png",x="/bookshelf/assets/image/d2.naver.com/8113611/08.png",D="/bookshelf/assets/image/d2.naver.com/8113611/09.png",A="/bookshelf/assets/image/d2.naver.com/8113611/10.png",B="/bookshelf/assets/image/d2.naver.com/8113611/11.png",_="/bookshelf/assets/image/d2.naver.com/8113611/12.png",T={},M={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},z={class:"table-of-contents"},R={href:"https://ai.googleblog.com/2009/06/speed-matters.html",target:"_blank",rel:"noopener noreferrer"},I={href:"https://developers.google.com/search/blog/2021/04/vodafone-case-study?hl=ko",target:"_blank",rel:"noopener noreferrer"},V={href:"https://youtu.be/IDM32xJmFjo?t=1942",target:"_blank",rel:"noopener noreferrer"},N={href:"https://developer.mozilla.org/en/docs/Web/API/Document/DOMContentLoaded_event",target:"_blank",rel:"noopener noreferrer"},O={class:"hint-container info"};function j(c,t){const s=r("VPCard"),i=r("router-link"),h=r("SiteInfo"),m=r("VidStack"),u=r("RouteLink"),f=r("ImageGallery"),l=r("FontIcon");return y(),S("div",null,[a("h1",M,[a("a",w,[a("span",null,C(c.$frontmatter.title)+" 관련",1)])]),o(s,p(d({title:"System Design > Article(s)",desc:"Article(s)",link:"/academics/system-design/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),a("nav",z,[a("ul",null,[a("li",null,[o(i,{to:"#성능-모니터링"},{default:n(()=>t[0]||(t[0]=[e("성능 모니터링")])),_:1}),a("ul",null,[a("li",null,[o(i,{to:"#성능-리포트"},{default:n(()=>t[1]||(t[1]=[e("성능 리포트")])),_:1})]),a("li",null,[o(i,{to:"#성능-알람"},{default:n(()=>t[2]||(t[2]=[e("성능 알람")])),_:1})])])]),a("li",null,[o(i,{to:"#웹-성능-개선-사례"},{default:n(()=>t[3]||(t[3]=[e("웹 성능 개선 사례")])),_:1}),a("ul",null,[a("li",null,[o(i,{to:"#과거의-방식"},{default:n(()=>t[4]||(t[4]=[e("과거의 방식")])),_:1})]),a("li",null,[o(i,{to:"#과거-방식의-문제점"},{default:n(()=>t[5]||(t[5]=[e("과거 방식의 문제점")])),_:1})]),a("li",null,[o(i,{to:"#개선의-시작"},{default:n(()=>t[6]||(t[6]=[e("개선의 시작")])),_:1})]),a("li",null,[o(i,{to:"#a-b-test-결과"},{default:n(()=>t[7]||(t[7]=[e("A/B Test 결과")])),_:1})]),a("li",null,[o(i,{to:"#최종-적용"},{default:n(()=>t[8]||(t[8]=[e("최종 적용")])),_:1})]),a("li",null,[o(i,{to:"#마치며"},{default:n(()=>t[9]||(t[9]=[e("마치며")])),_:1})])])])])]),t[24]||(t[24]=a("hr",null,null,-1)),o(h,{name:"네이버 통합 검색의 웹 성능 - 모니터링과 성능 개선 | NAVER D2",desc:"네이버 통합 검색의 웹 성능 - 모니터링과 성능 개선",url:"https://d2.naver.com/helloworld/8113611",logo:"/assets/image/d2.naver.com/favicon.ico",preview:"/assets/image/d2.naver.com/8113611/banner.png"}),o(m,{src:"youtube/BeWMHPooF78"}),a("p",null,[t[11]||(t[11]=e('"네이버 통합 검색의 웹 성능" 시리즈의 첫 번째 글인 "')),o(u,{to:"/d2.naver.com/9227596.html"},{default:n(()=>t[10]||(t[10]=[e("네이버 통합 검색의 웹 성능 - 데이터 수집과 시각화")])),_:1}),t[12]||(t[12]=e('"에서는 네이버 통합 검색의 웹 성능 측정을 위한 데이터를 수집한 방법과 수집한 데이터를 시각화한 대시보드를 소개했습니다.'))]),t[25]||(t[25]=g('<p>시리즈의 두 번째 글인 이 글에서는 웹 성능 대시보드를 활용해 웹 성능 현황을 확인하는 방법과 네이버 통합 검색의 웹 성능 개선을 위해 시도한 방법을 소개합니다.</p><hr><h2 id="성능-모니터링" tabindex="-1"><a class="header-anchor" href="#성능-모니터링"><span>성능 모니터링</span></a></h2><p>네이버 통합 검색에서는 웹 성능을 지속적으로 모니터링하기 위해 크게 두 가지 방법을 사용합니다. 하나는 주기적으로 성능 변화를 확인하기 위한 성능 리포트입니다. 또 하나는 웹 성능 문제의 빠른 탐지 및 대응을 위한 성능 알람 시스템입니다.</p><h3 id="성능-리포트" tabindex="-1"><a class="header-anchor" href="#성능-리포트"><span>성능 리포트</span></a></h3><p>네이버 통합 검색에서는 매주, 매월 다음과 같은 성능 리포트가 자동으로 생성됩니다. 수집하고 있는 다양한 데이터를 바탕으로 현재 웹 성능 현황과 지난주, 지난달 대비 웹 성능의 변화를 확인할 수 있습니다.</p><figure><img src="'+P+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>네이버 통합 검색 전체의 웹 성능뿐 아니라 사용자에게 자주 노출되는 검색 영역의 웹 성능을 함께 볼 수 있도록 구성했습니다. 그 이유는 전체 웹 성능 데이터만으로는 네이버 통합 검색의 웹 성능을 정확히 파악하기 어려웠기 때문입니다. 예를 들어 어느 날 특정 검색 영역에서 웹 성능 문제가 발생했을 때 이 영역의 노출 빈도, LCP(Largest Contentful Paint) 분포에 따라 전체 성능 그래프에 영향이 있을 수도 있고 없을 수도 있습니다. 그렇기 때문에 전체 웹 성능뿐 아니라 주요 영역의 웹 성능을 꾸준히 모니터링하는 것이 중요합니다.</p><p>성능 리포트 페이지를 구성할 때 현재 웹 성능을 파악하는 것 외에도 지난 시점과 비교하여 웹 성능 변화를 쉽게 확인하려 했습니다. 특히 배포 전후에 웹 성능 문제가 발생할 확률이 높기 때문에 배포 시점에 어떤 변화가 있는지 확인할 수 있도록 구성했습니다.</p><p>배포를 기준으로 웹 성능 변화를 확인해 문제점을 발견하고 개선한 사례가 있습니다. 배포 후 다음 화면과 같이 LCP가 일시적으로 악화됐다가 시간이 지남에 따라 복구되는 현상이 종종 발생했습니다.</p><figure><img src="'+v+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>성능 리포트를 사용하기 전에는 이런 현상이 존재하는지 알기 어려웠습니다. 성능 리포트를 통해 특정 JavaScript 파일이 배포될 때마다 문제가 발생하는 것을 확인할 수 있었습니다. 이 JavaScript 파일에는 비교적 많은 로직이 있었습니다. JavaScript 파일이 배포되면 파일이 변경됨에 따라 사용자가 새로 JavaScript 파일을 다운로드해야 해서 일시적으로 웹 성능이 악화되는 현상이었습니다. 일시적이지만 사용자 입장에서는 통합 검색 서비스가 느려졌다고 생각할 수 있기 때문에 JavaScript 파일을 여러 개로 분리해서 이 문제를 해결했습니다. 이처럼 성능 리포트를 통해 이벤트가 발생했을 때 성능 변화를 직관적으로 확인하고 어떤 문제가 있는지 확인할 수 있습니다.</p><p>하지만 처음 성능 리포트 페이지만 공유했을 때에는 다음과 같은 의견이 많았습니다.</p><ul><li>이 페이지가 있는지 몰랐어요.</li><li>이 페이지를 보고 내가 무엇을 얻어 가야 하는지, 내가 무엇을 해야 하는지 모르겠어요.</li></ul><p>이런 문제점을 해결하고자 성능 리포트가 자동으로 생성되면 성능 담당자가 성능 리포트를 확인해 발생한 변화에 대한 의견을 작성하고 다음과 같은 메일을 발송하게 됐습니다.</p><figure><img src="'+b+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>처음에는 매번 확인해야 할 사항도 많고 번거로움이 있었지만 시간이 지날수록 프로세스가 정리되고 자동화되면서 큰 어려움 없이 의견을 정리할 수 있는 환경이 갖추어졌습니다. 또한 성능 담당자의 의견이 추가된 성능 리포트를 공유받은 사람의 웹 성능 이해도가 높아졌고, 담당하고 있는 영역의 웹 성능에 대한 관심을 유도할 수 있었습니다.</p><h3 id="성능-알람" tabindex="-1"><a class="header-anchor" href="#성능-알람"><span>성능 알람</span></a></h3><p>웹 성능을 모니터링하기 시작하면서 고민이 많았던 부분이 웹 성능 문제가 발생했을 때 대응 방안이었습니다. 빠르게 웹 성능 문제를 감지하고 원인을 파악할 수 있는 방법을 찾는 많은 시행착오 끝에 성능 알람 시스템을 도입했습니다. 성능 알람으로 크게 다음 두 가지를 해결하려 했습니다.</p><ul><li>빠르게 성능 문제를 감지할 것</li><li>빠르게 문제의 원인을 파악할 것</li></ul><p>앞에서 소개한 성능 리포트는 주기적으로 웹 성능 변화를 확인하기에는 좋습니다. 하지만 문제 발생 시 빠르게 문제를 감지하기는 어려웠습니다. 빠른 감지를 위해 실시간 데이터를 기반으로 1분 단위 변화를 확인하기 시작했습니다. 변화를 확인하는 로직 자체는 빠르게 완성했지만 한 가지 문제가 있었습니다. 예상했던 것보다 분 단위 성능이 일정하지 않아 실제 오류 상황이 아님에도 알람이 자주 발생했습니다.</p><p>그래서 웹 성능 변화를 수치 비교가 아닌 구간 비교로 바꾸어 확인해 문제를 해결하려 했습니다. 그동안 발생한 웹 성능 문제의 패턴을 분석해 단순히 1분 전과 현재를 비교하는 것이 아니라 과거 5분 데이터와 최근 3분 데이터를 비교하도록 설정했습니다. 그리고 분석한 패턴에 의해 임계치를 정하고 이 값을 넘는 경우에만 알람이 발송하도록 개선했습니다.</p><figure><img src="'+L+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>새로운 로직 덕분에 빠르게 웹 성능 변화를 감지할 수 있는 환경이 만들어졌습니다. 다만 어떤 문제로 인해 알람이 발생했는지 매번 확인해야 했고, 문제를 파악하는 데 꽤 긴 시간이 필요했습니다. 이런 작업을 여러 번 진행하다 보니 웹 성능 문제가 발생했을 때 반복적으로 확인하는 데이터가 있다는 것을 알게 됐습니다. 그래서 이 반복 작업을 자동화해 성능 알람이 발생하면 빠르게 원인을 확인할 수 있는 정보를 제공하기로 했습니다.</p><p>우선 LCP 변화가 감지되면 서버 응답 시간을 가장 먼저 확인합니다. LCP는 서버 응답 시간의 변화에 민감하게 반응하기 때문에 웹 성능 변화가 발생했을 때 이 수치를 확인하면 서버의 영향인지 판단할 수 있습니다. 서버 응답 시간이 변했다면 조금 더 세부적으로 몇 가지를 더 확인해 볼 수 있습니다. 전체 서버 응답 시간 중 어느 구간에서 변화가 있는지, 특정 서버에서 timeout이 발생하지 않았는지 등을 확인합니다.</p><p>만약 서버 응답 시간에 변화가 없는데 성능 문제가 발생했다면 클라이언트의 성능 변화가 원인이라 예상할 수 있습니다. 이 경우에는 보통 배포에 의한 영향일 확률이 높습니다. 왜냐하면 클라이언트에서 작동하는 로직이 바뀌지 않았는데 일시적으로 수많은 사용자의 웹 성능이 변화할 가능성은 매우 낮기 때문입니다.</p><p>마지막으로 사용자 검색어의 변화나 로그 수의 변화를 확인하는 것도 원인 파악에 도움이 됩니다. 네이버 통합 검색 서비스의 특성상 갑자기 특정 검색어 유입이 증가하는 경우가 종종 발생합니다. 이 경우에 특정 검색 결과 화면이 평소보다 더 많이 노출되기 때문에 전체 성능이 일시적으로 변하기도 합니다. 예를 들어 지진이 발생해서 지진 관련 검색어가 증가하면 검색 결과에는 지진 발생 지역을 표시하는 지도가 노출됩니다. 이 영역은 LCP가 다른 영역보다 안 좋기 때문에 전체 LCP가 악화되는 현상이 발생합니다.</p><p>이와 같이 원인 확인을 위한 데이터 분석 과정이 많이 자동화됐고, 성능 문제가 발생한 경우 다음 화면과 같이 알람 메일이 발송되는 시스템이 갖추어졌습니다. 아직 고도화해야 할 부분이 남아 있지만 알람 시스템이 갖춰지면서 성능 문제를 빠르게 감지하고 대응할 수 있게 됐습니다.</p>',28)),o(f,{paths:`
  /assets/image/d2.naver.com/8113611/05.png
  /assets/image/d2.naver.com/8113611/06.png
`}),t[26]||(t[26]=a("hr",null,null,-1)),t[27]||(t[27]=a("h2",{id:"웹-성능-개선-사례",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#웹-성능-개선-사례"},[a("span",null,"웹 성능 개선 사례")])],-1)),t[28]||(t[28]=a("p",null,[a("a",{href:"#%E1%84%89%E1%85%A5%E1%86%BC%E1%84%82%E1%85%B3%E1%86%BC-%E1%84%85%E1%85%B5%E1%84%91%E1%85%A9%E1%84%90%E1%85%B3"},"성능 리포트"),e("에서 소개한 성능 리포트 화면을 보면 2023년 한 해 동안 네이버 통합 검색 서비스가 웹 성능 가이드라인을 항상 지킨 것은 아니라는 것을 확인할 수 있습니다. 차트의 노란색 막대 구간이 웹 성능 가이드라인을 지키지 않아서 주의가 필요한 구간입니다. 모니터링 시스템 덕분에 이처럼 성능 개선이 필요한 시점을 인지할 수 있습니다.")],-1)),t[29]||(t[29]=a("p",null,"또한 최고의 검색 결과를 노출하기 위해 네이버 통합 검색에는 점점 다양하고 복잡한 기능이 요구됩니다. 새로운 기능은 기존보다 느리게 실행될 확률이 높고, 이는 사용자에게 검색 결과가 노출되는 시간이 길어짐을 의미합니다. 미래의 고도화될 기능을 위해서도 성능 관리가 필요합니다.",-1)),t[30]||(t[30]=a("p",null,"서비스의 웹 성능은 평소에는 크게 드러나지 않지만 사용자가 체감하는 순간 비즈니스에 영향을 줄 수 있는 위험한 요소입니다. 다음은 웹 성능이 서비스에 중요한 요소임을 증명하는 외부 사례입니다.",-1)),a("ul",null,[a("li",null,[a("a",R,[o(l,{icon:"fa-brands fa-google"}),t[13]||(t[13]=e("Speed Matters"))]),t[14]||(t[14]=e(": 웹 성능이 안 좋은 검색 환경에 오래 노출될수록 사용자가 더 적게 검색했습니다."))]),a("li",null,[a("a",I,[o(l,{icon:"fa-brands fa-google"}),t[15]||(t[15]=e("보다폰: LCP 31% 개선으로 매출 8% 증가"))]),t[16]||(t[16]=e(": LCP 개선을 통해 매출이 증가했습니다."))]),a("li",null,[a("a",V,[o(l,{icon:"fa-brands fa-youtube"}),t[17]||(t[17]=e("Modern Metrics"))]),t[18]||(t[18]=e(": LCP가 느려질수록 rage click 수치도 증가했습니다."))])]),o(m,{src:"youtube/IDM32xJmFjo"}),t[31]||(t[31]=g('<p>네이버 통합 검색의 웹 성능 개선을 위해 다양한 방법을 시도했으며 그중 한 가지 사례를 소개하겠습니다.</p><h3 id="과거의-방식" tabindex="-1"><a class="header-anchor" href="#과거의-방식"><span>과거의 방식</span></a></h3><p>네이버 통합 검색의 검색 결과는 여러 검색 영역으로 구성됩니다. 이 영역은 독립적으로 운영되며 각 영역에 필요한 로직(JavaScript) 역시 따로 존재합니다. 이전에는 검색 결과 화면의 DOM이 모두 렌더링되고 브라우저의 onLoad 이벤트가 발생하면 이 JavaScript를 로딩했습니다. 조금 더 자세히 설명하자면 onLoad 이벤트 발생 시점으로부터 50ms 이후에 JavaScript가 로딩됩니다.</p><p>네이버 통합 검색 결과가 렌더링되는 과정을 도식화하면 다음과 같습니다.</p><figure><img src="'+E+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>JavaScript를 onLoad 이벤트를 기준으로 로딩하면 onLoad 이벤트가 앞당겨진다는 장점이 있습니다. 이상한 이야기 같지만 브라우저의 onLoad 이벤트는 페이지의 모든 리소스가 로딩된 시점에 발생합니다. 여기서 리소스란 이미지나 CSS, JavaScript 등을 의미합니다. JavaScript 로딩 시점을 onLoad 이벤트 발생 이후로 미루면 onLoad 이벤트는 JavaScript를 제외한 리소스가 모두 로딩된 시점에 발생합니다. JavaScript 로딩 시간만큼 onLoad 이벤트가 빨리 발생하는 것입니다.</p><p>그럼 왜 onLoad 이벤트 발생 시점을 앞당기려 했을까요?</p><p>두 가지 이유가 있습니다. 첫 번째 이유는 사용자에게 조금이라도 빠르게 검색 결과 화면을 보여 주기 위함입니다. 브라우저에서는 JavaScript의 로직을 수행하는 시간 동안 렌더링이 중단됩니다. 즉, 검색 결과 화면이 모두 렌더링되기 전에 JavaScript가 수행되면 그 시간만큼 사용자에게 검색 결과가 늦게 보이게 됩니다. 그렇기 때문에 네이버 통합 검색에서는 웹 성능 향상을 위해 onLoad 이벤트 발생 이후에 JavaScript를 로드하도록 설계했습니다.</p><p>두 번째 이유는 웹 성능 지표를 개선하기 위함입니다. 네이버 통합 검색에서는 LCP를 웹 성능 지표로 사용하기 전에 onLoad 이벤트 발생 시점을 중요한 웹 성능 지표로 활용했습니다. 앞에서 언급한 것처럼 onLoad 이벤트는 모든 리소스가 로딩되어야 발생하므로 사용자가 온전히 검색을 이용할 수 있는 시점으로 볼 수 있습니다. 만약 특정 리소스에 문제가 생겨 onLoad 이벤트 발생이 느려진다면 사용자에게 영향이 있다고 판단할 수 있으므로 과거에는 onLoad 이벤트를 중요한 웹 성능 지표로 활용했습니다. 따라서 웹 성능 지표 개선을 위해 onLoad 발생 시점을 앞당기려는 다양한 시도를 했고, 여러 방법 중 한 가지가 JavaScript의 로딩 시점을 onLoad 이벤트 발생 이후로 미루는 것입니다. 하지만 이 방식으로 onLoad 이벤트 발생 자체는 빨라졌겠지만 실제 사용자가 서비스를 온전히 이용하는 데 걸리는 시간 자체는 변하지 않았을 것으로 예상합니다.</p><h3 id="과거-방식의-문제점" tabindex="-1"><a class="header-anchor" href="#과거-방식의-문제점"><span>과거 방식의 문제점</span></a></h3><p>앞에서 설명한 이유로 인해 그동안 JavaScript가 onLoad 이벤트 발생 이후에 로딩됐습니다. 하지만 이 방식에는 두 가지 문제점이 있습니다.</p><p>첫째, JavaScript를 늦게 로딩할수록 LCP가 악화됩니다. <a href="#%E1%84%80%E1%85%AA%E1%84%80%E1%85%A5%E1%84%8B%E1%85%B4-%E1%84%87%E1%85%A1%E1%86%BC%E1%84%89%E1%85%B5%E1%86%A8">네이버 통합 검색 렌더링 과정을 도식화한 그림</a>에서 LCP로 측정될 수 있는 시점을 크게 다음 세 가지로 구분했습니다.</p><ol><li>텍스트 영역이 LCP인 경우</li><li>이미지 영역이 LCP인 경우</li><li>JavaScript로 화면을 그린 영역이 LCP인 경우</li></ol><p>JavaScript가 늦게 로딩된다면 세 번째 경우의 LCP가 느려지는 현상이 발생합니다. 주로 지도가 화면에 노출되는 영역에 해당합니다.</p><p>둘째, onLoad 이벤트가 늦게 발생하면 JavaScript 역시 늦게 로딩됩니다. 이 문제는 웹 성능보다는 사용성에 큰 영향을 줄 수 있습니다. 만약 검색 결과에 사용되는 이미지나 CSS에 문제가 생겨 해당 리소스를 다운로드하는 시간이 굉장히 오래 걸리면 어떻게 될까요? 리소스 다운로드가 완료될 때까지 onLoad 이벤트는 발생하지 않고, onLoad 이벤트 뒤에 로딩되도록 설정된 JavaScript 또한 onLoad 이벤트를 기다리는 상황이 발생합니다. 문제가 생긴 특정 리소스를 제외하면 모든 화면이 잘 보이지만 JavaScript가 로딩되지 않아 사용자가 기대하는 동작이 수행되지 않을 것입니다.</p><p>이런 문제가 있었음에도 선뜻 JavaScript 로딩 시점을 변경하지 못한 이유는 것은 onLoad 이벤트라는 과거 웹 성능 지표를 준수하기 위해서였습니다. 그 외에도 JavaScript 로딩 시점을 변경했을 때 사용자에게 어떤 영향이 있을지 파악하기 어려웠기 때문입니다. 하지만 이제는 LCP라는 새로운 웹 성능 지표와 오류 로그를 분석해 사용자 영향도를 정확히 판단할 수 있는 시스템이 마련됐습니다. 이를 바탕으로 JavaScript 로딩 시점을 변경하기로 결정했습니다.</p><h3 id="개선의-시작" tabindex="-1"><a class="header-anchor" href="#개선의-시작"><span>개선의 시작</span></a></h3>',17)),a("p",null,[t[20]||(t[20]=e("JavaScript를 onLoad 이벤트 이후에 로딩할 때의 문제점을 해결하면서 기존 검색 결과에 영향을 주지 않는 최적의 JavaScript 로딩 시점이 ")),a("a",N,[o(l,{icon:"fa-brands fa-firefox"}),t[19]||(t[19]=e("DomContentLoaded 이벤트"))]),t[21]||(t[21]=e("(이하 DCL 이벤트) 이후라 예상했습니다."))]),t[32]||(t[32]=g('<p>DCL 이벤트는 브라우저가 HTML을 모두 파싱하고 DOM 트리를 완성한 시점에 발생합니다. 즉, 다른 리소스의 로딩 여부와 관계없이 DOM의 완성 여부를 확인할 수 있기 때문에 대체로 onLoad 이벤트보다 빨리 발생합니다. 따라서 네이버 통합 검색의 JavaScript를 DCL 이벤트 발생 이후에 로딩한다면 기존의 문제를 해결할 수 있다고 생각했습니다.</p><p>우선 JavaScript를 늦게 로딩할수록 LCP가 악화되는 문제를 해결할 수 있습니다. onLoad 이벤트 기준에서 DCL 이벤트 기준으로 로딩 시점을 앞당기므로 그만큼 빠르게 JavaScript를 로딩하게 되고, JavaScript 로직으로 화면을 렌더링하는 영역의 LCP가 개선될 것입니다.</p><p>또한 onLoad 이벤트가 늦게 발생하면 JavaScript 역시 늦게 로딩된다는 문제를 해결할 수 있습니다. DCL 이벤트는 다른 리소스의 로딩 여부와 관계없이 발생하므로 특정 리소스에 문제가 발생하더라도 검색에 필요한 JavaScript는 로딩됩니다.</p><p>변경 사항은 매우 간단해 보였지만 오랜 기간 적용한 onLoad 이벤트 기반의 로직을 DCL 이벤트 기반으로 변경할 때 어떤 문제가 있을지 확인해야 했습니다. 시간은 조금 더 걸리겠지만 서비스의 안정성을 위해 A/B Test를 준비했습니다. 다음 그림은 A/B Test를 위해 설정한 대조군과 실험군을 도식화한 그림입니다.</p><figure><img src="'+x+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>주요 실험군은 T1, T3, T5입니다. 각 실험군에서 DCL 이벤트 이후 지연 시간을 조금씩 다르게 설정해 JavaScript를 로딩했을 때 어떤 현상이 발생하는지 확인하려 했습니다. 당연히 지연 시간 없이 로딩하는 것이 웹 성능 면에서 좋을 것이라 생각했지만 브라우저의 주요 이벤트 시점에 많은 JavaScript가 로딩되면 어떤 문제가 발생하는지 확인이 필요했습니다.</p><h3 id="a-b-test-결과" tabindex="-1"><a class="header-anchor" href="#a-b-test-결과"><span>A/B Test 결과</span></a></h3><p>약 한 달간의 A/B Test를 통해 다음 그래프와 같은 결과를 얻었습니다.</p><figure><img src="'+D+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>우선 웹 성능 측면에서는 예상한 것과 같이 JavaScript를 더 빠르게 로딩할수록 LCP가 개선되는 것을 확인할 수 있었습니다. 기존 onLoad 이벤트가 기준인 대조군보다 DCL 이벤트를 기준으로 한 실험군의 LCP가 약 100ms(4~5%) 개선된 것을 확인할 수 있었습니다(95번째 백분위수 기준). 지연 시간을 다르게 설정한 각 실험군을 비교했을 땐 지연 시간이 없는 실험군의 LCP 수치가 가장 좋았으나 다른 실험군과의 차이가 5~10ms 정도로 크지 않은 것을 확인할 수 있었습니다. 또한 비즈니스 지표를 분석한 결과를 통해 웹 성능이 개선된 영역의 클릭 수 증가와 클릭 품질 증가를 확인했습니다.</p><p>성능 개선은 어느 정도 예상했던 부분이기 때문에 다른 문제가 있는지 조금 더 살펴봤습니다. 실험군마다 발생한 오류 수를 비교했을 때 한 가지 특이한 부분을 발견할 수 있었습니다. DCL 이벤트 발생에 맞춰 JavaScript를 로딩했던 실험군이 유독 다른 실험군에 비해 오류 수가 높게 측정됐습니다. 대체로 10~15% 정도 오류가 더 많이 발생했습니다. 원인을 분석한 결과 <a href="https://requirejs.org/" target="_blank" rel="noopener noreferrer">RequireJS</a> 로직 수행 시 오류가 더 많이 발생하는 것을 확인했습니다. DCL 이벤트가 브라우저의 주요 이벤트이기 때문에 여러 곳에서 해당 이벤트를 기준으로 로직이 수행될 것이고 타이밍 이슈가 발생한 것으로 판단했습니다.</p><figure><img src="'+A+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>당장 오류를 수정하기 어려운 상황이었기 때문에 해당 오류에 대한 로그 기록을 강화하는 한편 JavaScript 로딩 시점을 DCL 이벤트 발생 이후 30ms로 결정했습니다.</p><h3 id="최종-적용" tabindex="-1"><a class="header-anchor" href="#최종-적용"><span>최종 적용</span></a></h3><p>오랜 준비와 실험 끝에 네이버 통합 검색의 JavaScript 로딩 시점을 onLoad 이벤트 기준에서 DCL 기준으로 변경한 배포가 2023년 8월 31일에 완료됐습니다. 배포 이후 전체 LCP(p95)가 2700ms에서 2550ms로 약 150ms 개선되는 효과를 확인할 수 있었습니다.</p><figure><img src="'+B+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>150ms라는 수치는 사용자가 느끼기에 큰 차이가 아닐 수도 있습니다. 하지만 계속 느려지는 환경에서 조금씩 성능을 양보하다 보면 어느 순간 작은 차이가 큰 위험이 되어 돌아올 것이기 때문에 더 나은 서비스를 위해서라면 작은 수치라도 성능 개선을 위해 노력해야 합니다.</p><p>또한 이번 개선 과정을 통해 웹 성능 지표가 단순히 성능 확인만을 위해 사용되지 않는다는 것을 느낄 수 있었습니다. 서비스가 안정적으로 운영되기 위해서는 끊임없이 다양한 시도가 필요한데 사용자에게 주는 영향도를 파악할 수 있는 지표로 웹 성능 지표를 활용할 수 있습니다.</p><h3 id="마치며" tabindex="-1"><a class="header-anchor" href="#마치며"><span>마치며</span></a></h3><p>네이버 통합 검색에서는 이 글에서 설명한 사례뿐 아니라 여러 다양한 방법으로 성능 개선을 위해 노력하고 있습니다. 다음의 2023년 네이버 통합 검색의 성능 분포 그래프를 보면 연초에 LCP가 2.5초 이하인 사용자 비율이 95%였다가 6월에 93%까지 내려갔습니다.</p><figure><img src="'+_+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>여러 원인이 있겠지만 웹 성능 지표를 확인하지 않았다면 현재 상황을 정확히 인지하지 못했을 것이고 개선의 필요성도 느끼지 못했을 것입니다. 이러한 데이터를 바탕으로 네이버 통합 검색의 웹 성능 가이드라인을 준수하기 위해 HTTP3 도입, UI/UX 개선, 레거시 코드 제거 등 다양한 성능 개선 작업을 진행했습니다. 그 결과 연말에는 LCP가 2.5초 이하인 사용자 비율을 95%까지 높일 수 있었습니다.</p><p>네이버 통합 검색에서 많은 부분이 개선됐지만 아직 부족한 부분이 많기 때문에 계속 개선을 시도하고 발전 방향을 고민하고 있습니다. 특히 다음 주제에 관련된 고민이 많습니다. 관심이 있으신 분들과 함께 이야기해 볼 수 있다면 많은 도움이 될 것입니다.</p><ul><li>머신러닝을 활용한 성능 예측</li><li>과거 버전과 신규 버전 성능 변화 탐지 및 원인 파악</li><li>성능과 비즈니스 지표의 연관 관계</li></ul><p>이제 네이버 통합 검색에서 웹 성능 지표는 단순히 사용자 체감 성능을 확인하는 용도를 넘어 서비스를 안정적으로 유지하기 위한 지표가 됐습니다. 더 나아가 웹 성능과 밀접한 연관이 있는 오류에 대해서도 고도화를 진행하고 통합해 서비스를 최적의 상태로 유지할 수 있는 역할을 하고자 합니다.</p>',25)),a("div",O,[t[22]||(t[22]=a("p",{class:"hint-container-title"},[a("strong",null,"네이버 통합 검색의 웹 성능"),e(" 시리즈")],-1)),t[23]||(t[23]=a("ul",null,[a("li",null,[a("a",{href:"https://d2.naver.com/helloworld/9227596",target:"_blank",rel:"noopener noreferrer"},"네이버 통합 검색의 웹 성능 - 데이터 수집과 시각화")])],-1)),o(s,p(d({title:"네이버 통합 검색의 웹 성능 - 모니터링과 성능 개선 | Naver D2",desc:"네이버 통합 검색의 웹 성능 - 모니터링과 성능 개선",link:"/d2.naver.com/8113611.md",logo:"https://d2.naver.com/favicon.ico",background:"rgba(103,262,163,0.2)"})),null,16)]),J(" TODO: add ARTICLE CARD "),o(s,p(d({title:"네이버 통합 검색의 웹 성능 - 모니터링과 성능 개선",desc:"네이버 통합 검색의 웹 성능 - 모니터링과 성능 개선",link:"https://chanhi2000.github.io/bookshelf/d2.naver.com/8113611.html",logo:"https://d2.naver.com/favicon.ico",background:"rgba(103,262,163,0.2)"})),null,16)])}const K=k(T,[["render",j],["__file","8113611.html.vue"]]),W=JSON.parse('{"path":"/d2.naver.com/8113611.html","title":"네이버 통합 검색의 웹 성능 - 모니터링과 성능 개선","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"네이버 통합 검색의 웹 성능 - 모니터링과 성능 개선","description":"Article(s) > 네이버 통합 검색의 웹 성능 - 모니터링과 성능 개선","icon":"fas fa-gauge","category":["Web Performance","Article(s)"],"tag":["blog","d2.naver.com","web","web-performance","perf"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > 네이버 통합 검색의 웹 성능 - 모니터링과 성능 개선"},{"property":"og:description","content":"네이버 통합 검색의 웹 성능 - 모니터링과 성능 개선"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/d2.naver.com/8113611.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/d2.naver.com/8113611.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"네이버 통합 검색의 웹 성능 - 모니터링과 성능 개선"}],["meta",{"property":"og:description","content":"Article(s) > 네이버 통합 검색의 웹 성능 - 모니터링과 성능 개선"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://chanhi2000.github.io/bookshelf/assets/image/d2.naver.com/8113611/banner.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://chanhi2000.github.io/bookshelf/assets/image/d2.naver.com/8113611/banner.png"}],["meta",{"name":"twitter:image:alt","content":"네이버 통합 검색의 웹 성능 - 모니터링과 성능 개선"}],["meta",{"property":"article:author","content":"윤정현"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"d2.naver.com"}],["meta",{"property":"article:tag","content":"web"}],["meta",{"property":"article:tag","content":"web-performance"}],["meta",{"property":"article:tag","content":"perf"}],["meta",{"property":"article:published_time","content":"2024-04-30T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"네이버 통합 검색의 웹 성능 - 모니터링과 성능 개선\\",\\"image\\":[\\"https://chanhi2000.github.io/bookshelf/assets/image/d2.naver.com/8113611/01.png\\",\\"https://chanhi2000.github.io/bookshelf/assets/image/d2.naver.com/8113611/02.png\\",\\"https://chanhi2000.github.io/bookshelf/assets/image/d2.naver.com/8113611/03.png\\",\\"https://chanhi2000.github.io/bookshelf/assets/image/d2.naver.com/8113611/04.png\\",\\"https://chanhi2000.github.io/bookshelf/assets/image/d2.naver.com/8113611/07.png\\",\\"https://chanhi2000.github.io/bookshelf/assets/image/d2.naver.com/8113611/08.png\\",\\"https://chanhi2000.github.io/bookshelf/assets/image/d2.naver.com/8113611/09.png\\",\\"https://chanhi2000.github.io/bookshelf/assets/image/d2.naver.com/8113611/10.png\\",\\"https://chanhi2000.github.io/bookshelf/assets/image/d2.naver.com/8113611/11.png\\",\\"https://chanhi2000.github.io/bookshelf/assets/image/d2.naver.com/8113611/12.png\\"],\\"datePublished\\":\\"2024-04-30T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"윤정현\\"}]}"]],"prev":"/programming/go/articles/README.md","date":"2024-04-30T00:00:00.000Z","isOriginal":false,"author":"윤정현","cover":"/assets/image/d2.naver.com/8113611/banner.png"},"headers":[{"level":2,"title":"성능 모니터링","slug":"성능-모니터링","link":"#성능-모니터링","children":[{"level":3,"title":"성능 리포트","slug":"성능-리포트","link":"#성능-리포트","children":[]},{"level":3,"title":"성능 알람","slug":"성능-알람","link":"#성능-알람","children":[]}]},{"level":2,"title":"웹 성능 개선 사례","slug":"웹-성능-개선-사례","link":"#웹-성능-개선-사례","children":[{"level":3,"title":"과거의 방식","slug":"과거의-방식","link":"#과거의-방식","children":[]},{"level":3,"title":"과거 방식의 문제점","slug":"과거-방식의-문제점","link":"#과거-방식의-문제점","children":[]},{"level":3,"title":"개선의 시작","slug":"개선의-시작","link":"#개선의-시작","children":[]},{"level":3,"title":"A/B Test 결과","slug":"a-b-test-결과","link":"#a-b-test-결과","children":[]},{"level":3,"title":"최종 적용","slug":"최종-적용","link":"#최종-적용","children":[]},{"level":3,"title":"마치며","slug":"마치며","link":"#마치며","children":[]}]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":4}]},"readingTime":{"minutes":1.73,"words":520},"filePathRelative":"d2.naver.com/8113611.md","localizedDate":"2024년 4월 30일","excerpt":"\\n","copyright":{"author":"윤정현"}}');export{K as comp,W as data};