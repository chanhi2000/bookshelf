import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as d,am as n,as as m,ao as s,at as e,au as o,al as l,an as c,aq as p,ar as k}from"./app-CpYYKbnj.js";const g={},w={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"},f={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-create-a-segmented-control-and-read-values-from-it-1.zip",target:"_blank",rel:"noopener noreferrer"},v={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-create-a-segmented-control-and-read-values-from-it-2.zip",target:"_blank",rel:"noopener noreferrer"},b={class:"hint-container details"};function y(r,a){const t=p("VPCard"),i=p("FontIcon");return k(),d("div",null,[n("h1",w,[n("a",h,[n("span",null,m(r.$frontmatter.title)+" 관련",1)])]),s(t,e(o({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a[3]||(a[3]=n("nav",{class:"table-of-contents"},[n("ul")],-1)),a[4]||(a[4]=n("hr",null,null,-1)),s(t,e(o({title:"How to create a segmented control and read values from it | SwiftUI by Example",desc:"How to create a segmented control and read values from it",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-create-a-segmented-control-and-read-values-from-it",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a[5]||(a[5]=l(`<blockquote><p>Updated for Xcode 15</p></blockquote><p><strong>Updated for iOS 15</strong></p><p>SwiftUI&#39;s <code>Picker</code> can also be used to create segmented controls equivalent to <code>UISegmentedControl</code> from UIKit, although it needs to be bound to some state and you must ensure to give each segment a tag so it can be identified. Segments can be text or pictures; anything else will silently fail.</p><p>As an example, this creates a segmented control that works with a <code>favoriteColor</code> state property, and adds a text view below that shows whichever value was selected:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> favoriteColor <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Picker</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;What is your favorite color?&quot;</span></span><span class="token punctuation">,</span> selection<span class="token punctuation">:</span> $favoriteColor<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Red&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">tag</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Green&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">tag</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Blue&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">tag</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">pickerStyle</span><span class="token punctuation">(</span><span class="token punctuation">.</span>segmented<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Value: </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">favoriteColor</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)),n("blockquote",null,[n("p",null,[n("a",f,[s(i,{icon:"fas fa-file-zipper"}),a[0]||(a[0]=c("Download this as an Xcode project"))])])]),a[6]||(a[6]=l(`<figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-a-segmented-control-and-read-values-from-it-1~dark.png" alt="A grey capsule containing the choices Red, Green, and Blue, with Red selected. Below are the words “Value: 0”." tabindex="0" loading="lazy"><figcaption>A grey capsule containing the choices Red, Green, and Blue, with Red selected. Below are the words “Value: 0”.</figcaption></figure><div class="hint-container important"><p class="hint-container-title">Important</p><p>If you&#39;re using Xcode 12 you need to use <code>SegmentedPickerStyle()</code> rather than <code>.segmented</code>.</p></div><p>In this instance, though, it&#39;s better to create an array to store the various colors, then use <code>ForEach</code> to create the text view inside using a loop:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> favoriteColor <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Red&quot;</span></span></span>
<span class="line">    <span class="token keyword">var</span> colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;Red&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;Green&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;Blue&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Picker</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;What is your favorite color?&quot;</span></span><span class="token punctuation">,</span> selection<span class="token punctuation">:</span> $favoriteColor<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token class-name">ForEach</span><span class="token punctuation">(</span>colors<span class="token punctuation">,</span> id<span class="token punctuation">:</span> <span class="token punctuation">\\</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token short-argument">$0</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">pickerStyle</span><span class="token punctuation">(</span><span class="token punctuation">.</span>segmented<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Value: </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">favoriteColor</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),n("blockquote",null,[n("p",null,[n("a",v,[s(i,{icon:"fas fa-file-zipper"}),a[1]||(a[1]=c("Download this as an Xcode project"))])])]),a[7]||(a[7]=n("figure",null,[n("img",{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-a-segmented-control-and-read-values-from-it-2~dark.png",alt:"A grey capsule containing the choices Red, Green, and Blue, with Blue selected. Below are the words “Value: Blue”.",tabindex:"0",loading:"lazy"}),n("figcaption",null,"A grey capsule containing the choices Red, Green, and Blue, with Blue selected. Below are the words “Value: Blue”.")],-1)),n("details",b,[a[2]||(a[2]=n("summary",null,"Similar solutions…",-1)),s(t,e(o({title:"How to create a date picker and read values from it | SwiftUI by Example",desc:"How to create a date picker and read values from it",link:"/hackingwithswift.com/swiftui/how-to-create-a-date-picker-and-read-values-from-it.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"How to create a picker and read values from it | SwiftUI by Example",desc:"How to create a picker and read values from it",link:"/hackingwithswift.com/swiftui/how-to-create-a-picker-and-read-values-from-it.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"How to create a slider and read values from it | SwiftUI by Example",desc:"How to create a slider and read values from it",link:"/hackingwithswift.com/swiftui/how-to-create-a-slider-and-read-values-from-it.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"How to read the red, green, and blue values from a Color | SwiftUI by Example",desc:"How to read the red, green, and blue values from a Color",link:"/hackingwithswift.com/swiftui/how-to-read-the-red-green-and-blue-values-from-a-color.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"How to create a stepper and read values from it | SwiftUI by Example",desc:"How to create a stepper and read values from it",link:"/hackingwithswift.com/swiftui/how-to-create-a-stepper-and-read-values-from-it.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const S=u(g,[["render",y],["__file","how-to-create-a-segmented-control-and-read-values-from-it.html.vue"]]),H=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-create-a-segmented-control-and-read-values-from-it.html","title":"How to create a segmented control and read values from it","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to create a segmented control and read values from it","description":"Article(s) > How to create a segmented control and read values from it","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to create a segmented control and read values from it"},{"property":"og:description","content":"How to create a segmented control and read values from it"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-create-a-segmented-control-and-read-values-from-it.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-create-a-segmented-control-and-read-values-from-it.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to create a segmented control and read values from it"}],["meta",{"property":"og:description","content":"Article(s) > How to create a segmented control and read values from it"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-a-segmented-control-and-read-values-from-it-1~dark.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to create a segmented control and read values from it\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-a-segmented-control-and-read-values-from-it-1~dark.png\\",\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-a-segmented-control-and-read-values-from-it-2~dark.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.48,"words":743},"filePathRelative":"hackingwithswift.com/swiftui/how-to-create-a-segmented-control-and-read-values-from-it.md","excerpt":"\\n"}');export{S as comp,H as data};