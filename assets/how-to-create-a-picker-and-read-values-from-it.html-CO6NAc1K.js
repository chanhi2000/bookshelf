import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as p,am as a,as as d,ao as e,at as s,au as o,al as u,an as k,aq as i,ar as m}from"./app-CpYYKbnj.js";const h={},w={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},f={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-create-a-picker-and-read-values-from-it-1.zip",target:"_blank",rel:"noopener noreferrer"},v={class:"hint-container details"};function b(l,t){const n=i("VPCard"),c=i("FontIcon");return m(),p("div",null,[a("h1",w,[a("a",g,[a("span",null,d(l.$frontmatter.title)+" 관련",1)])]),e(n,s(o({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=a("nav",{class:"table-of-contents"},[a("ul")],-1)),t[3]||(t[3]=a("hr",null,null,-1)),e(n,s(o({title:"How to create a picker and read values from it | SwiftUI by Example",desc:"How to create a picker and read values from it",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-create-a-picker-and-read-values-from-it",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t[4]||(t[4]=u(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>SwiftUI&#39;s <code>Picker</code> view manages to combine <code>UIPickerView</code>, <code>UISegmentedControl</code>, and <code>UITableView</code> in one, while also adapting to other styles on other operating systems. The great thing is that we really don&#39;t have to care how it works – SwiftUI does a good job of adapting itself automatically to its environment.</p><p>As with most other controls, you must attach your picker to some sort of state that will track the picker&#39;s selection. For example, this creates a <code>colors</code> array and an integer that stores which color was selected, then uses that with a picker and a text view so you can see values being read back:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;Red&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;Green&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;Blue&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;Tartan&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> selectedColor <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Red&quot;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Picker</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Please choose a color&quot;</span></span><span class="token punctuation">,</span> selection<span class="token punctuation">:</span> $selectedColor<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token class-name">ForEach</span><span class="token punctuation">(</span>colors<span class="token punctuation">,</span> id<span class="token punctuation">:</span> <span class="token punctuation">\\</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token short-argument">$0</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;You selected: </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">selectedColor</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),a("blockquote",null,[a("p",null,[a("a",f,[e(c,{icon:"fas fa-file-zipper"}),t[0]||(t[0]=k("Download this as an Xcode project"))])])]),t[5]||(t[5]=a("figure",null,[a("img",{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-a-picker-and-read-values-from-it-1~dark.png",alt:"A wheel picker showing Red, Green, Blue, and Tartan. Blue is selected. Below is the text “You selected: Blue”.",tabindex:"0",loading:"lazy"}),a("figcaption",null,"A wheel picker showing Red, Green, Blue, and Tartan. Blue is selected. Below is the text “You selected: Blue”.")],-1)),t[6]||(t[6]=a("div",{class:"hint-container tip"},[a("p",{class:"hint-container-title"},"Tips"),a("p",null,"Even though the label text isn't visible, it's still useful because VoiceOver will use it when reading the screen.")],-1)),a("details",v,[t[1]||(t[1]=a("summary",null,"Similar solutions…",-1)),e(n,s(o({title:"How to create a date picker and read values from it | SwiftUI by Example",desc:"How to create a date picker and read values from it",link:"/hackingwithswift.com/swiftui/how-to-create-a-date-picker-and-read-values-from-it.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e(n,s(o({title:"How to hide the label of a Picker, Stepper, Toggle, and more using labelsHidden() | SwiftUI by Example",desc:"How to hide the label of a Picker, Stepper, Toggle, and more using labelsHidden()",link:"/hackingwithswift.com/swiftui/how-to-hide-the-label-of-a-picker-stepper-toggle-and-more-using-labelshidden.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e(n,s(o({title:"How to fix a Form Picker or a NavigationLink that isn't tappable | SwiftUI by Example",desc:"How to fix a Form Picker or a NavigationLink that isn't tappable",link:"/hackingwithswift.com/swiftui/how-to-fix-a-form-picker-or-a-navigationlink-that-isnt-tappable.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e(n,s(o({title:"How to create a segmented control and read values from it | SwiftUI by Example",desc:"How to create a segmented control and read values from it",link:"/hackingwithswift.com/swiftui/how-to-create-a-segmented-control-and-read-values-from-it.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e(n,s(o({title:"How to create a slider and read values from it | SwiftUI by Example",desc:"How to create a slider and read values from it",link:"/hackingwithswift.com/swiftui/how-to-create-a-slider-and-read-values-from-it.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const H=r(h,[["render",b],["__file","how-to-create-a-picker-and-read-values-from-it.html.vue"]]),q=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-create-a-picker-and-read-values-from-it.html","title":"How to create a picker and read values from it","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to create a picker and read values from it","description":"Article(s) > How to create a picker and read values from it","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to create a picker and read values from it"},{"property":"og:description","content":"How to create a picker and read values from it"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-create-a-picker-and-read-values-from-it.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-create-a-picker-and-read-values-from-it.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to create a picker and read values from it"}],["meta",{"property":"og:description","content":"Article(s) > How to create a picker and read values from it"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-a-picker-and-read-values-from-it-1~dark.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to create a picker and read values from it\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-a-picker-and-read-values-from-it-1~dark.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.17,"words":651},"filePathRelative":"hackingwithswift.com/swiftui/how-to-create-a-picker-and-read-values-from-it.md","excerpt":"\\n"}');export{H as comp,q as data};