import{_ as g}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as k,am as s,as as h,ao as t,at as f,au as y,ap as e,an as a,al as l,aq as o,ar as w}from"./app-CpYYKbnj.js";const b={},v={id:"frontmatter-title-관련",tabindex:"-1"},z={class:"header-anchor",href:"#frontmatter-title-관련"},x={class:"table-of-contents"},S={href:"https://youtube.com/watch?v=P3C7fzMqIYg",target:"_blank",rel:"noopener noreferrer"};function j(u,n){const r=o("VPCard"),p=o("router-link"),d=o("SiteInfo"),m=o("VidStack"),i=o("FontIcon"),c=o("RouteLink");return w(),k("div",null,[s("h1",v,[s("a",z,[s("span",null,h(u.$frontmatter.title)+" 관련",1)])]),t(r,f(y({title:"Node.js > Article(s)",desc:"Article(s)",link:"/programming/js-node/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),s("nav",x,[s("ul",null,[s("li",null,[t(p,{to:"#메모리-누수-해결하기"},{default:e(()=>n[0]||(n[0]=[a("메모리 누수 해결하기")])),_:1}),s("ul",null,[s("li",null,[t(p,{to:"#힙-메모리-늘리기"},{default:e(()=>n[1]||(n[1]=[a("힙 메모리 늘리기")])),_:1})]),s("li",null,[t(p,{to:"#힙-메모리"},{default:e(()=>n[2]||(n[2]=[a("힙 메모리")])),_:1})])])]),s("li",null,[t(p,{to:"#메모리-누수-디버깅-하기"},{default:e(()=>n[3]||(n[3]=[a("메모리 누수 디버깅 하기")])),_:1}),s("ul",null,[s("li",null,[t(p,{to:"#디버깅-방법"},{default:e(()=>n[4]||(n[4]=[a("디버깅 방법")])),_:1})]),s("li",null,[t(p,{to:"#메모리-누수-범인-찾기"},{default:e(()=>n[5]||(n[5]=[a("메모리 누수 범인 찾기")])),_:1})])])]),s("li",null,[t(p,{to:"#using-고통을-덜어줄-키워드"},{default:e(()=>n[6]||(n[6]=[a("using - 고통을 덜어줄 키워드")])),_:1})]),s("li",null,[t(p,{to:"#마치며"},{default:e(()=>n[7]||(n[7]=[a("마치며")])),_:1})])])]),n[30]||(n[30]=s("hr",null,null,-1)),t(d,{name:"SSR 환경(Node.js) 메모리 누수 디버깅 가이드 (2) | 요즘IT",desc:"SSR 환경(Node.js) 메모리 누수 디버깅 가이드 (2)",url:"https://yozm.wishket.com/magazine/detail/2505/",logo:"https://yozm.wishket.com/static/renewal/img/global/gnb_yozmit.svg",preview:"https://yozm.wishket.com/media/news/2505/14.png"}),t(m,{src:"youtube/P3C7fzMqIYg"}),s("p",null,[n[10]||(n[10]=a("[FEConf2023에서 발표한 ")),s("a",S,[t(i,{icon:"fa-brands fa-youtube"}),n[8]||(n[8]=a("SSR 환경(Node.js) 메모리 누수 디버깅 가이드"))]),n[11]||(n[11]=a("]")),n[12]||(n[12]=s("sup",{class:"footnote-ref"},[s("a",{href:"#footnote1"},"[1]"),s("a",{class:"footnote-anchor",id:"footnote-ref1"})],-1)),n[13]||(n[13]=a("를 정리한 글입니다. 발표 내용을 2회로 나누어 발행합니다. ")),t(c,{to:"/yozm.wishket.com/2504.html"},{default:e(()=>n[9]||(n[9]=[a("1회에서는")])),_:1}),n[14]||(n[14]=a(" 메모리 누수에 대해 알아보고, 메모리 누수를 모니터링 도구를 통해 확인해보겠습니다. 2회에서는 메모리 누수 현상을 직접 디버깅해보고 해결하는 방법을 알아봅니다. 본문에 삽입된 이미지의 출처는 모두 이 콘텐츠와 같은 제목의 발표 자료로, 따로 출처를 표기하지 않았습니다. 발표 자료는 ")),n[15]||(n[15]=s("a",{href:"https://2023.feconf.kr/",target:"_blank",rel:"noopener noreferrer"},"FEConf2023 홈페이지",-1)),n[16]||(n[16]=a("에서 다운로드할 수 있습니다."))]),s("p",null,[n[18]||(n[18]=a("이번 글에서는 ")),t(c,{to:"/yozm.wishket.com/2504.html"},{default:e(()=>n[17]||(n[17]=[a("앞선 글")])),_:1}),n[19]||(n[19]=a("에서의 메모리 누수 현상을 직접 디버깅해보고 해결해 보겠습니다."))]),n[31]||(n[31]=l(`<hr><h2 id="메모리-누수-해결하기" tabindex="-1"><a class="header-anchor" href="#메모리-누수-해결하기"><span>메모리 누수 해결하기</span></a></h2><p>우리는 앞선 엘리베이터 예제에서 메모리 누수를 해결하기 위한 방법 2가지를 알아봤습니다.</p><ol><li>힙메모리를 늘려주거나</li><li>메모리 누수의 범인을 디버깅한다.</li></ol><p>두 가지 방법에 대해 자세하게 알아보겠습니다.</p><h3 id="힙-메모리-늘리기" tabindex="-1"><a class="header-anchor" href="#힙-메모리-늘리기"><span>힙 메모리 늘리기</span></a></h3><p>먼저 메모리를 늘리는 방법에 대해 살펴보겠습니다. &#39;메모리가 부족하니까 메모리를 늘린다.&#39;라는 생각은 아주 당연한 생각의 흐름입니다. 그러나 과연 힙메모리를 늘리기만 하면 메모리 누수가 해결될까요?</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">const</span> listItems <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">memoryLeakFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">1_000_000</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    listItem<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>process<span class="token punctuation">.</span><span class="token function">memoryUsage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>heapUsed <span class="token operator">/</span> <span class="token number">1024</span> <span class="token operator">/</span> <span class="token number">1024</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> MB</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>그렇지 않습니다. 힙 메모리를 늘려줘도 이 코드는 계속해서 메모리 누수를 일으키고 서버가 죽게 됩니다. 왜일까요? Node.js의 V8 엔진이 메모리를 관리하는 방식을 알면 이해할 수 있습니다. V8 엔진은 메모리를 잘 관리하기 위해 &#39;마크 앤 스윕&#39;이라는 알고리즘을 사용합니다. 사용하는 것은 마크하고 사용하지 않는 것은 쓸어서 청소해버린다는 뜻입니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/15.png" alt="Mark and Sweep" tabindex="0" loading="lazy"><figcaption>Mark and Sweep</figcaption></figure><p>배열이나 오브젝트, 펑션과 같은 데이터 타입은 힙메모리로부터 메모리를 할당받아 동작합니다. 이러한 타입을 객체라고 부르겠습니다. 가비지 컬렉터는 이러한 객체가 시용되고 있는지 아닌지 루트로부터 시작해서 재귀적으로 계속 체크를 하고 있다가 더 이상 사용하지 않는 불필요한 객체를 수거하여 메모리 공간을 확보합니다. 이게 바로 &#39;마크 앤 스윕&#39; 알고리즘입니다.</p><p>그러나 어딘가에서 계속 참조를 하고 있는 객체가 있다면 그 객체들은 계속해서 힙메모리에 존재하게 됩니다. 이렇게 객체가 계속해서 존재하면 어떻게 될까요? 이를 이해하기 위해 힙 메모리에 대해 알 필요가 있습니다.</p><h3 id="힙-메모리" tabindex="-1"><a class="header-anchor" href="#힙-메모리"><span>힙 메모리</span></a></h3><p>Node.js의 V8 엔진은 메모리를 잘 관리하기 위해 영역을 나누어 메모리를 관리합니다. 아래는 V8 엔진의 라이프 사이클을 설명하기 위해 표현한 간단한 가비지 콜렉터의 구조입니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/16.png" alt="V8의 GC" tabindex="0" loading="lazy"><figcaption>V8의 GC</figcaption></figure><p>기본적으로 영 제네레이션(Young Generation)과 올드 제네레이션(Old Generation)으로 나누어져 있고, 가비지콜렉터는 마이너 가비지 콜렉터와 메이저 가비지 콜렉터로 나누어져 있습니다. 만약에 처음 선언된 어떤 객체가 있다면 이 객체는 보통 nursery(유아기) 라는 영역에 메모리 할당이 됩니다. 가비지 콜렉터가 한번 작업을 수행했는데 해당 객체가 살아남았다면 이 객체는 intermediate(중간기) 라는 영역으로 넘어갑니다. 다시 가비지 콜렉터가 작업을 수행했는데 또 이 객체가 살아남았다면 이 객체는 결국 올드 제네레이션 영역으로 넘어갑니다. V8 문서에서는 이 영역까지 넘어가는 객체는 거의 없다고 설명을 합니다.</p><p>그렇다면 이 올드 제네레이션 영역에 살아남은 객체가 더 많아지면 어떻게 될까요? V8 엔진은 두 가지 영역을 조정하면서 어플리케이션을 동작시킵니다. 그러나 힙 메모리는 제한된 용량을 가지기 때문에 결국 꽉 차게 될 것이고 서버가 죽게 됩니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/17.png" alt="앞선 예제 코드와 함께 다시 볼까요?" tabindex="0" loading="lazy"><figcaption>앞선 예제 코드와 함께 다시 볼까요?</figcaption></figure><p><code>listItems</code> 배열은 전역 변수로 선언되었기 때문에 가비지 콜렉터가 수거하지 못하고 올드 제네레이션에 존재하게 됩니다. 처음에는 첫 번째 그림처럼 작은 영역만 차지하고 있을 겁니다. 그러고 나서 서버에 해당 요청이 오면 100만 번의 반복문을 수행하면서 <code>listItems</code>의 길이가 늘어나고 이게 반복되다 보면 두 번째 그림처럼 많은 용량을 차지하게 될 것입니다. 그러다가 결국 힙 메모리가 꽉 차는 순간이 오게 됩니다. 그러면 서버가 죽게 됩니다.</p><p>위 예제는 단순하지만 실제 코드를 작성할 때 이런 문제를 만나게 되었을 때 힙 메모리만 늘리면 문제가 해결될까요? 이런 문제를 만났을 때 구글링을 해보면 아래와 같이 <code>max-old-space-size</code>를 늘리라는 답변을 쉽게 만날 수 있습니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/18.png" alt="stackoverflow" tabindex="0" loading="lazy"><figcaption>stackoverflow</figcaption></figure><p>여기서 <code>max-old-space-size</code>는 Node.js의 올드 제네레이션의 용량을 조절하는 옵션입니다. 즉, 메모리 누수를 일으킨 대부분의 객체는 올드 제네레이션 영역에 존재하기 때문에 앞서 설명드린 가비지 콜렉터의 구조에서 올드 제네레이션의 용량을 늘리라는 답변을 많이 만나게 됩니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/19.png" alt="V8의 GC" tabindex="0" loading="lazy"><figcaption>V8의 GC</figcaption></figure><p>메모리 누수를 일으키는 원인은 이외에도 다양하게 존재합니다. 예시로 설명드린 전역 변수 뿐만 아니라, <code>setTimeout</code>, <code>setInterval</code>과 같은 함수를 사용 후 클리어를 하지 않은 경우와 클로저가 대표적입니다. 클로저의 경우는 실행 컨텍스트 안에서 객체나 변수의 선언과 참조, 이에 따른 또 다른 참조가 있는 경우 등 다양한 경우에서 힙 메모리를 많이 할당하는 경우도 발생합니다.</p><p>이러한 다양한 경우에서 힙 메모리가 굉장히 많이 필요한 상황이 발생하기 때문에 무작정 힙 메모리를 늘리는 것만이 해결책이 아닐 수도 있습니다.</p><hr><h2 id="메모리-누수-디버깅-하기" tabindex="-1"><a class="header-anchor" href="#메모리-누수-디버깅-하기"><span>메모리 누수 디버깅 하기</span></a></h2><h3 id="디버깅-방법" tabindex="-1"><a class="header-anchor" href="#디버깅-방법"><span>디버깅 방법</span></a></h3><p>이제 디버깅을 통해 해결 방법을 알아보겠습니다. <code>node -–inspect index.js</code>와 같이 inspect라는 옵션을 사용해서 Node.js를 실행시키고 브라우저의 관리자 도구를 열면 초록색 Node.js 버튼을 볼 수 있습니다. 저는 주로 크롬의 인스펙트 메뉴를 활용합니다. 이 메뉴에는 현재 실행 중인 로컬 서버들의 목록을 볼 수 있고 원하는 서버를 선택하여 인스펙트 창을 열어 사용합니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/20.png" alt="으로 범인 찾기" tabindex="0" loading="lazy"><figcaption><code>node --inspect</code>으로 범인 찾기</figcaption></figure><p>디버깅을 위해 인스펙트 창을 열면 아래와 같은 창이 뜰 겁니다. 좌측 패널을 보면 동그라미 두개가 겹쳐진 모양의 프로파일링 녹화 버튼이 있습니다. 특정 구간의 메모리 사용량 등을 확인하기 위해 녹화를 시작하고 종료해야 하는데, 이 버튼으로 녹화의 시작과 종료를 할 수 있습니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/21.png" alt="프로파일링 녹화버튼" tabindex="0" loading="lazy"><figcaption>프로파일링 녹화버튼</figcaption></figure><p>그 옆에 금지 모양의 버튼과 아래에는 녹화가 끝난 프로파일링 결과 파일 목록이 있습니다. 금지 모양의 버튼은 프로파일링 녹화의 결과 파일 목록을 모두 삭제하는 버튼입니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/22.png" alt="모든 프로파일링 결과 파일을 삭제" tabindex="0" loading="lazy"><figcaption>모든 프로파일링 결과 파일을 삭제</figcaption></figure><p>마지막으로 쓰레기통 모양의 버튼이 있고 이는 수동으로 가비지 컬렉터를 작동시키는 버튼입니다. 보통 메모리 프로파일링을 하기 전에 가비지 컬렉터를 동작시켜 안정화를 시킨 다음에 프로파일링을 하는 방식으로 사용합니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/23.png" alt="수동으로 GC를 작동시키는 버튼" tabindex="0" loading="lazy"><figcaption>수동으로 GC를 작동시키는 버튼</figcaption></figure>`,36)),s("p",null,[n[20]||(n[20]=a("다음으로 가장 중요한 영역을 살펴보겠습니다. 크롬에서는 세 가지 프로파일링 타입을 지원합니다. 첫 번째는 힙 스냅샷입니다. 지금 이 순간의 힙 메모리 사용량을 기록하는 타입입니다. 이 타입을 선택하면 아래에 ")),t(i,{icon:"iconfont icon-select"}),n[21]||(n[21]=s("code",null,"[take snapshot]",-1)),n[22]||(n[22]=a(" 버튼이 활성화됩니다. 버튼을 누르면 그 순간부터 힙 메모리를 기억하게 됩니다. 내가 정말 잘짠 코드가 있어서 메모리적으로나 성능적으로 개선한 부분이 있다면 그 전후를 기록하면 두 가지 경우를 비교할 수 있습니다. 즉, 어떤 부분에서 메모리 누수가 발생하는지 정확히 알고 있을 때 해당 부분을 디버깅할 수 있습니다."))]),n[32]||(n[32]=l('<figure><img src="https://yozm.wishket.com/media/news/2505/24.png" alt="이번에는 이 영역을 볼까요?" tabindex="0" loading="lazy"><figcaption>이번에는 이 영역을 볼까요?</figcaption></figure><p>두 번째 타입은 많이 사용하는 유용한 기능입니다. 주기적으로 힙 메모리를 기록하고 녹화하는 동안 힙 메모리를 얼마나 쓰고 있는지 그래프로 보여주는 타입입니다. 메모리 누수를 깨닫고 디버깅하는 경우 타임라인을 통해 시간이 지나면서 메모리 사용량이 어떻게 변하는지를 살펴볼 때 사용할 수 있습니다. 보통 메모리 누수가 어디서 발생하는지 알기 쉽지 않습니다. 이럴 때 사용하면 유용한 기능입니다.</p><p>마지막 타입은 샘플링 타입입니다. 두 번째 타입과 비슷하지만 훨씬 긴 시간을 녹화해야 하는 경우에 주로 사용합니다. 모든 순간을 다 기록하면 오버헤드가 발생할 수 있기 때문에 좀 더 긴 시간 동안 샘플링을 한 정보로 디버깅하는 방식입니다. 녹화 버튼을 누르면 변화가 없어 보이지만 기록 중인 상태가 되고, 녹화를 종료하면 샘플링된 정보를 보여줍니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/25.png" alt="생플링 된 정보" tabindex="0" loading="lazy"><figcaption>생플링 된 정보</figcaption></figure><p>세 가지 타입의 디버깅 방법에 대해 간단하게 알아봤습니다. 각자의 경우에 맞게 타입을 선택해서 사용하면 되지만, 보통 두 번째 타입을 많이 사용하게 됩니다. 메모리 누수 에러를 만났을 때 두 번째 타입으로 먼저 디버깅을 하면 문제점을 빠르게 확인할 수 있을 것입니다.</p><h3 id="메모리-누수-범인-찾기" tabindex="-1"><a class="header-anchor" href="#메모리-누수-범인-찾기"><span>메모리 누수 범인 찾기</span></a></h3><p>디버깅을 시작하면 앞선 2번째 디버깅 방법의 설명처럼 상단에 그래프가 나타납니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/26.png" alt="요청을 보내는 동안 Node.js에서 힙 메모리를 얼마나 사용하는지 나타내는 그래프입니다." tabindex="0" loading="lazy"><figcaption>요청을 보내는 동안 Node.js에서 힙 메모리를 얼마나 사용하는지 나타내는 그래프입니다.</figcaption></figure><p>위 그래프의 높이는 그 순간에 힙메모리에 할당된 총량을 뜻합니다. 회색 부분은 가비지 콜렉터가 메모리를 수거한 부분이고, 파란색은 힙 메모리를 차지하고 있는 부분입니다. 즉, 파란색이 많으면 누수가 많다고 할 수 있습니다. 그 순간에 회색 부분이 많다면 메모리 누수를 걱정할 필요가 없다는 뜻입니다.</p><p>그래프 영역을 드래그하면 일부 구간만 선택해서 볼 수도 있습니다. 먼저 전체 영역을 확인하고 파란색 그래프가 있는 영역을 선택해서 보면 교집합처럼 공통으로 보이는 객체들이 있을 것입니다. 이런 부분들을 집중적으로 디버깅하면 시간을 단축시킬 수 있습니다.</p><p>그래프를 통해 어느 시점에 메모리 누수가 발생했는지를 쉽게 알 수 있는데, 누가 메모리 누수의 범인인지는 그래프가 알려주지 않습니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/27.png" alt="범인을 찾기 위해서 알아야 할 지식들이 많이 있지만, 아래의 내용은 꼭 알아두어야 합니다." tabindex="0" loading="lazy"><figcaption>범인을 찾기 위해서 알아야 할 지식들이 많이 있지만, 아래의 내용은 꼭 알아두어야 합니다.</figcaption></figure><p>바로 쉘로우 사이즈와 리테인드 사이즈입니다. 쉘로우 사이즈는 객체 자신의 크기를 bytes로 표시한 것이고, 리테인드 사이즈는 객체 자신이 존재하기 위해 자신이 참조하고 있는 모든 객체들을 다 더한 크기입니다. 추가적으로 디스턴스라는 지표도 있는데, 이 지표는 가비지 콜렉터의 루트로부터 얼마나 떨어져 있는지 나타내는 값입니다. 이 값이 크면 메모리 누수가 일어날 가능성이 높다고 유추할 수 있습니다. 정확하게 디버깅하는 지표라기보다는 간단하게 참고 지표로 활용하시면 좋을 것 같습니다.</p><p>앞선 예제 코드에서 전역 변수에 선언한 <code>listItems</code>를 함수 안에서 참조하고 있었습니다. 가비지 콜렉터는 이 변수를 수거하지 못하고 힙 메모리를 계속 차지하게 됩니다. 함수 자체는 간단한 코드이지만 실제 실행 컨텍스트 안에서 이 변수는 아주 긴 길이를 가지기 때문에 힙 메모리가 굉장히 많이 필요한 상황이 발생합니다. 다시 말해 쉘로우 사이즈 크기에 비해 리테인드 사이즈가 굉장히 크다고 할 수 있습니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/28.png" alt="이처럼 쉘로우 사이즈보다 리테인드 사이즈가 굉장히 큰 객체나 변수를 집중적으로 디버깅하면 됩니다." tabindex="0" loading="lazy"><figcaption>이처럼 쉘로우 사이즈보다 리테인드 사이즈가 굉장히 큰 객체나 변수를 집중적으로 디버깅하면 됩니다.</figcaption></figure><p>앞서 작성한 코드의 인스펙트 메뉴에서 리테인드 사이즈를 내림차순으로 정렬하고 살펴보면 제가 작성한 <code>memoryLeakFunction</code>을 볼 수 있습니다. 이 객체를 선택하고 아래쪽을 보면 Retainers 탭을 통해 이 객체가 어떤 참조 순서로 힙 메모리에 할당되었는지 알 수 있습니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/29.png" alt="파일명을 눌러 어떤 파일의 어떤 코드인지 확인할 수도 있습니다. 또 내가 사용한 특정 라이브러리의 경로도 알 수 있습니다." tabindex="0" loading="lazy"><figcaption>파일명을 눌러 어떤 파일의 어떤 코드인지 확인할 수도 있습니다. 또 내가 사용한 특정 라이브러리의 경로도 알 수 있습니다.</figcaption></figure><p>아래로 쭉 넘어오면 <code>listItems</code>가 보입니다. 그림의 오른쪽 아래를 보면 <code>listItems</code>의 쉘로우 사이즈보다 리테인드 사이즈가 굉장히 크다는 걸 알 수 있습니다. 지루한 과정이 될 수도 있지만 이런 객체들을 하나씩 찾고 수정하면서 이 수치를 줄여가면 메모리 누수 범인을 찾고 이를 해결할 수 있게 됩니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/30.png" alt="Retained Size를 내림차순으로" tabindex="0" loading="lazy"><figcaption>Retained Size를 내림차순으로</figcaption></figure>',19)),s("p",null,[n[23]||(n[23]=a("아래 그림은 제가 실제로 경험한 인스펙트 화면입니다. 불필요한 부분을 제외하고 보니 아래와 같은 부분을 찾았습니다. 보통은 ")),t(i,{icon:"fas fa-folder-open"}),n[24]||(n[24]=s("code",null,"node_modules",-1)),n[25]||(n[25]=a("라는 경로로 보일 텐데 저의 경우 ")),n[26]||(n[26]=s("code",null,"yarn berry",-1)),n[27]||(n[27]=a("로 노드 패키지 관리를 하기 때문에 “")),n[28]||(n[28]=s("code",null,".yarn",-1)),n[29]||(n[29]=a("” 라는 경로를 볼 수 있습니다. 이 경로의 어떤 파일인지 확인할 수 있었고, 이 파일에서 메모리 누수가 발생했다는 것을 확인하고 수정하여 배포했더니 메모리 누수를 해결할 수 있었습니다."))]),n[33]||(n[33]=l(`<figure><img src="https://yozm.wishket.com/media/news/2505/31.png" alt="Retained Size를 내림차순으로" tabindex="0" loading="lazy"><figcaption>Retained Size를 내림차순으로</figcaption></figure><p>배포 이전 그래프는 앞서 설명드린 산 모양의 그래프였는데, 배포 이후에는 아래처럼 잔잔한 그래프로 바뀐 것을 알 수 있습니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/32.png" alt="그 뒤에도 메모리 누수가 없는 상태를 계속 유지하고 있습니다." tabindex="0" loading="lazy"><figcaption>그 뒤에도 메모리 누수가 없는 상태를 계속 유지하고 있습니다.</figcaption></figure><hr><h2 id="using-고통을-덜어줄-키워드" tabindex="-1"><a class="header-anchor" href="#using-고통을-덜어줄-키워드"><span><code>using</code> - 고통을 덜어줄 키워드</span></a></h2><p>마지막으로 소개하고 싶은 키워드가 있습니다. 바로 <code>using</code>이라는 키워드입니다. C#을 사용해 봤다면 익숙할 것 같습니다. 파이썬에서도 비슷한 개념이 있습니다. 최근 타입 스크립트 5.2 버전이 공지되면서 많은 분들이 봤겠지만 사실 새로운 개념은 아닙니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/33.png" alt="using 키워드" tabindex="0" loading="lazy"><figcaption>using 키워드</figcaption></figure><p>C#에서는 이미 있는 개념이고, 자바스크립트 TC39 (자바 스크립트 표준을 관리하는 그룹) 에서 이미 스테이지 3까지 진행된 상태이기 때문에 어쩌면 곧 만나볼 수도 있을 것 같습니다.</p><p>간단하게 설명하면 기존에 변수를 사용할 때 선언하던 <code>var</code>, <code>let</code>, <code>const</code> 대신에 <code>using</code>을 선언하면 이 변수의 스코프 끝에서 <code>Symbol.dispose()</code>를 만들어두고 이를 호출하여 클린업을 할 수 있습니다. 선언된 이벤트 리스너를 제거할 수도 있고, DB 연결을 했다면 이 연결을 해제할 수도 있습니다. 또, 스트림을 연결을 했다가 끊어야 하는 경우도 이를 활용해 라이프 사이클을 관리할 수 있습니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/34.png" alt="using 키워드" tabindex="0" loading="lazy"><figcaption>using 키워드</figcaption></figure><p>앞선 예제 코드를 <code>using</code>을 사용해서 바꿔 보면 아래와 같습니다. <code>const</code> 대신 <code>using</code>을 선언했고, <code>using</code>을 사용하기 위해 Disposable을 implements 했습니다. 함수의 내용은 동일하고 마지막 부분의 <code>dispose</code>를 통해 클린업하는 부분을 추가했습니다.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">const</span> server <span class="token operator">=</span> http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span>res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>req<span class="token punctuation">.</span>url <span class="token operator">===</span> <span class="token string">&#39;/memory-leak&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">    using func <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MemoryLeakFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line highlighted">    func<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  res<span class="token punctuation">.</span><span class="token function">writeHead</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token string-property property">&#39;Content-Type&#39;</span><span class="token operator">:</span> <span class="token string">&#39;text/html&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  res<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string"></span>
<span class="line">    &lt;!DOCTYPE html&gt;</span>
<span class="line">    &lt;html lang=&quot;en&quot;&gt;</span>
<span class="line">    &lt;head&gt;</span>
<span class="line">      &lt;title&gt;Hello World&lt;/title&gt;</span>
<span class="line">    &lt;/head&gt;</span>
<span class="line">    &lt;body&gt;</span>
<span class="line">      &lt;h1&gt;Content&lt;/h1&gt;</span>
<span class="line">    &lt;/body&gt;</span>
<span class="line">    &lt;/html&gt;</span>
<span class="line">  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line highlighted"><span class="token keyword">let</span> <span class="token literal-property property">listItems</span><span class="token operator">:</span> number<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line highlighted"></span>
<span class="line highlighted"><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MemoryLeakFunction</span> <span class="token keyword">implements</span> <span class="token class-name">Disposable</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">  <span class="token function">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">1_000_000</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">      listItem<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line highlighted">    <span class="token punctuation">}</span></span>
<span class="line highlighted">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>process<span class="token punctuation">.</span><span class="token function">memoryUsage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>heapUsed <span class="token operator">/</span> <span class="token number">1024</span> <span class="token operator">/</span> <span class="token number">1024</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> MB</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line highlighted">  <span class="token punctuation">}</span></span>
<span class="line highlighted">  <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>dispose<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">    listItems <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line highlighted">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;클린업!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line highlighted">  <span class="token punctuation">}</span></span>
<span class="line highlighted"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://yozm.wishket.com/media/news/2505/36.png" alt="이 코드를 실행시키면 아까와는 다르게 힙 메모리가 일정하게 유지되는 것을 볼 수 있습니다. 이런 과정을 통해 을 활용하면 메모리 누수가 없는 코드를 작성할 수 있을 것 같습니다." tabindex="0" loading="lazy"><figcaption>이 코드를 실행시키면 아까와는 다르게 힙 메모리가 일정하게 유지되는 것을 볼 수 있습니다. 이런 과정을 통해 <code>using</code>을 활용하면 메모리 누수가 없는 코드를 작성할 수 있을 것 같습니다.</figcaption></figure><hr><h2 id="마치며" tabindex="-1"><a class="header-anchor" href="#마치며"><span>마치며</span></a></h2><p>지금까지 설명한 것들을 요약하면서 글을 마무리하겠습니다. 서버 환경과 클라이언트 환경을 나눠서 디버깅하는 방법, 서버 환경에서 인스펙트 옵션을 사용하고 타임라인으로 힙메모리 사용량을 프로파일링 하는 방법, 쉘로우 사이즈와 리테인드 사이즈의 크기를 통해 메모리 누수의 원인인 객체를 찾는 방법, 그리고 마지막으로 <code>using</code>을 사용하여 메모리 누수를 방지하는 방법 등 을 알아봤습니다.</p><figure><img src="https://yozm.wishket.com/media/news/2505/37.png" alt="요약" tabindex="0" loading="lazy"><figcaption>요약</figcaption></figure><p>현업에서 메모리 누수를 경험할 때 오늘 설명드린 방법을 통해 디버깅해보고, 원인을 찾아 성능을 개선해 볼 수 있는 기회가 됐으면 좋겠습니다.</p><p>감사합니다.</p><hr class="footnotes-sep"><section class="footnotes"><ol class="footnotes-list"><li id="footnote1" class="footnote-item"><p>FEConf2023에서 발표된 &#39;SSR 환경(Node.js) 메모리 누수 디버깅 가이드&#39;/박지혜 토스 플레이스 프론트엔드 엔지니어 <a href="#footnote-ref1" class="footnote-backref">↩︎</a></p></li></ol></section>`,21))])}const C=g(b,[["render",j],["__file","2505.html.vue"]]),I=JSON.parse('{"path":"/yozm.wishket.com/2505.html","title":"SSR 환경(Node.js) 메모리 누수 디버깅 가이드 (2)","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"SSR 환경(Node.js) 메모리 누수 디버깅 가이드 (2)","description":"Article(s) > SSR 환경(Node.js) 메모리 누수 디버깅 가이드 (2)","icon":"fa-brands fa-node","category":["Node.js","Article(s)"],"tag":["blog","yozm.wishket.com","node","nodejs","node-js"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > SSR 환경(Node.js) 메모리 누수 디버깅 가이드 (2)"},{"property":"og:description","content":"SSR 환경(Node.js) 메모리 누수 디버깅 가이드 (2)"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/yozm.wishket.com/2505.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/yozm.wishket.com/2505.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"SSR 환경(Node.js) 메모리 누수 디버깅 가이드 (2)"}],["meta",{"property":"og:description","content":"Article(s) > SSR 환경(Node.js) 메모리 누수 디버깅 가이드 (2)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://yozm.wishket.com/media/news/2505/14.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://yozm.wishket.com/media/news/2505/14.png"}],["meta",{"name":"twitter:image:alt","content":"SSR 환경(Node.js) 메모리 누수 디버깅 가이드 (2)"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"yozm.wishket.com"}],["meta",{"property":"article:tag","content":"node"}],["meta",{"property":"article:tag","content":"nodejs"}],["meta",{"property":"article:tag","content":"node-js"}],["meta",{"property":"article:published_time","content":"2024-03-21T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SSR 환경(Node.js) 메모리 누수 디버깅 가이드 (2)\\",\\"image\\":[\\"https://yozm.wishket.com/media/news/2505/15.png\\",\\"https://yozm.wishket.com/media/news/2505/16.png\\",\\"https://yozm.wishket.com/media/news/2505/17.png\\",\\"https://yozm.wishket.com/media/news/2505/18.png\\",\\"https://yozm.wishket.com/media/news/2505/19.png\\",\\"https://yozm.wishket.com/media/news/2505/20.png\\",\\"https://yozm.wishket.com/media/news/2505/21.png\\",\\"https://yozm.wishket.com/media/news/2505/22.png\\",\\"https://yozm.wishket.com/media/news/2505/23.png\\",\\"https://yozm.wishket.com/media/news/2505/24.png\\",\\"https://yozm.wishket.com/media/news/2505/25.png\\",\\"https://yozm.wishket.com/media/news/2505/26.png\\",\\"https://yozm.wishket.com/media/news/2505/27.png\\",\\"https://yozm.wishket.com/media/news/2505/28.png\\",\\"https://yozm.wishket.com/media/news/2505/29.png\\",\\"https://yozm.wishket.com/media/news/2505/30.png\\",\\"https://yozm.wishket.com/media/news/2505/31.png\\",\\"https://yozm.wishket.com/media/news/2505/32.png\\",\\"https://yozm.wishket.com/media/news/2505/33.png\\",\\"https://yozm.wishket.com/media/news/2505/34.png\\",\\"https://yozm.wishket.com/media/news/2505/36.png\\",\\"https://yozm.wishket.com/media/news/2505/37.png\\"],\\"datePublished\\":\\"2024-03-21T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"prev":"/programming/js-node/articles/README.md","date":"2024-03-21T00:00:00.000Z","isOriginal":false,"cover":"https://yozm.wishket.com/media/news/2505/14.png"},"headers":[{"level":2,"title":"메모리 누수 해결하기","slug":"메모리-누수-해결하기","link":"#메모리-누수-해결하기","children":[{"level":3,"title":"힙 메모리 늘리기","slug":"힙-메모리-늘리기","link":"#힙-메모리-늘리기","children":[]},{"level":3,"title":"힙 메모리","slug":"힙-메모리","link":"#힙-메모리","children":[]}]},{"level":2,"title":"메모리 누수 디버깅 하기","slug":"메모리-누수-디버깅-하기","link":"#메모리-누수-디버깅-하기","children":[{"level":3,"title":"디버깅 방법","slug":"디버깅-방법","link":"#디버깅-방법","children":[]},{"level":3,"title":"메모리 누수 범인 찾기","slug":"메모리-누수-범인-찾기","link":"#메모리-누수-범인-찾기","children":[]}]},{"level":2,"title":"using - 고통을 덜어줄 키워드","slug":"using-고통을-덜어줄-키워드","link":"#using-고통을-덜어줄-키워드","children":[]},{"level":2,"title":"마치며","slug":"마치며","link":"#마치며","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":1.7,"words":510},"filePathRelative":"yozm.wishket.com/2505.md","localizedDate":"2024년 3월 21일","excerpt":"\\n"}');export{C as comp,I as data};