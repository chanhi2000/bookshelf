import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as p,am as a,as as d,ao as e,at as n,au as o,al as u,an as m,aq as i,ar as h}from"./app-CpYYKbnj.js";const w={},k={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},g={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-create-a-slider-and-read-values-from-it-1.zip",target:"_blank",rel:"noopener noreferrer"},v={class:"hint-container details"};function b(r,t){const s=i("VPCard"),l=i("FontIcon");return h(),p("div",null,[a("h1",k,[a("a",f,[a("span",null,d(r.$frontmatter.title)+" 관련",1)])]),e(s,n(o({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=a("nav",{class:"table-of-contents"},[a("ul")],-1)),t[3]||(t[3]=a("hr",null,null,-1)),e(s,n(o({title:"How to create a slider and read values from it | SwiftUI by Example",desc:"How to create a slider and read values from it",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-create-a-slider-and-read-values-from-it",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t[4]||(t[4]=u(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>SwiftUI&#39;s <code>Slider</code> view works much like <code>UISlider</code>, although you need to bind it somewhere so you can store its value.</p><p>When you create it there are a variety of parameters you can provide, but the ones you probably care about most are:</p><ul><li>Value: What Double to bind it to.</li><li>In: The range of the slider.</li><li>Step: How much to change the value when you move the slider. This parameter is optional.</li></ul><p>For example, this code creates a slider bound to a <code>Celsius</code> property, then updates a text view as the slider moves so that it converts between Celsius and Fahrenheit:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> celsius<span class="token punctuation">:</span> <span class="token class-name">Double</span> <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Slider</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> $celsius<span class="token punctuation">,</span> <span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token operator">-</span><span class="token number">100</span><span class="token operator">...</span><span class="token number">100</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;</span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">celsius<span class="token punctuation">,</span> specifier<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;%.1f&quot;</span></span></span><span class="token interpolation-punctuation punctuation">)</span><span class="token string"> Celsius is </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">celsius <span class="token operator">*</span> <span class="token number">9</span> <span class="token operator">/</span> <span class="token number">5</span> <span class="token operator">+</span> <span class="token number">32</span><span class="token punctuation">,</span> specifier<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;%.1f&quot;</span></span></span><span class="token interpolation-punctuation punctuation">)</span><span class="token string"> Fahrenheit&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6)),a("blockquote",null,[a("p",null,[a("a",g,[e(l,{icon:"fas fa-file-zipper"}),t[0]||(t[0]=m("Download this as an Xcode project"))])])]),t[5]||(t[5]=a("figure",null,[a("img",{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-a-slider-and-read-values-from-it-1~dark.png",alt:"A slider with a blue-grey bar and white handle. Below is the text “0.0 Celsius is 32.0 Fahrenheit”.",tabindex:"0",loading:"lazy"}),a("figcaption",null,"A slider with a blue-grey bar and white handle. Below is the text “0.0 Celsius is 32.0 Fahrenheit”.")],-1)),a("details",v,[t[1]||(t[1]=a("summary",null,"Similar solutions…",-1)),e(s,n(o({title:"How to create a date picker and read values from it | SwiftUI by Example",desc:"How to create a date picker and read values from it",link:"/hackingwithswift.com/swiftui/how-to-create-a-date-picker-and-read-values-from-it.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e(s,n(o({title:"How to create a segmented control and read values from it | SwiftUI by Example",desc:"How to create a segmented control and read values from it",link:"/hackingwithswift.com/swiftui/how-to-create-a-segmented-control-and-read-values-from-it.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e(s,n(o({title:"How to create a picker and read values from it | SwiftUI by Example",desc:"How to create a picker and read values from it",link:"/hackingwithswift.com/swiftui/how-to-create-a-picker-and-read-values-from-it.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e(s,n(o({title:"SwiftUI tips and tricks | SwiftUI by Example",desc:"SwiftUI tips and tricks",link:"/hackingwithswift.com/swiftui/swiftui-tips-and-tricks.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e(s,n(o({title:"How to read the red, green, and blue values from a Color | SwiftUI by Example",desc:"How to read the red, green, and blue values from a Color",link:"/hackingwithswift.com/swiftui/how-to-read-the-red-green-and-blue-values-from-a-color.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const x=c(w,[["render",b],["__file","how-to-create-a-slider-and-read-values-from-it.html.vue"]]),H=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-create-a-slider-and-read-values-from-it.html","title":"How to create a slider and read values from it","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to create a slider and read values from it","description":"Article(s) > How to create a slider and read values from it","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to create a slider and read values from it"},{"property":"og:description","content":"How to create a slider and read values from it"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-create-a-slider-and-read-values-from-it.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-create-a-slider-and-read-values-from-it.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to create a slider and read values from it"}],["meta",{"property":"og:description","content":"Article(s) > How to create a slider and read values from it"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-a-slider-and-read-values-from-it-1~dark.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to create a slider and read values from it\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-a-slider-and-read-values-from-it-1~dark.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.96,"words":589},"filePathRelative":"hackingwithswift.com/swiftui/how-to-create-a-slider-and-read-values-from-it.md","excerpt":"\\n"}');export{x as comp,H as data};