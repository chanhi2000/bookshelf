import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as g,am as n,as as d,ao as a,at as i,au as o,al as l,an as p,aq as c,ar as w}from"./app-CpYYKbnj.js";const h={},m={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"},v={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-group-views-visually-using-groupbox-1.zip",target:"_blank",rel:"noopener noreferrer"},f={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-group-views-visually-using-groupbox-2.zip",target:"_blank",rel:"noopener noreferrer"},b={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-group-views-visually-using-groupbox-3.zip",target:"_blank",rel:"noopener noreferrer"},x={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-group-views-visually-using-groupbox-4.zip",target:"_blank",rel:"noopener noreferrer"},y={class:"hint-container details"};function q(u,s){const t=c("VPCard"),e=c("FontIcon");return w(),g("div",null,[n("h1",m,[n("a",k,[n("span",null,d(u.$frontmatter.title)+" 관련",1)])]),a(t,i(o({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),s[5]||(s[5]=n("nav",{class:"table-of-contents"},[n("ul")],-1)),s[6]||(s[6]=n("hr",null,null,-1)),a(t,i(o({title:"How to group views visually using GroupBox | SwiftUI by Example",desc:"How to group views visually using GroupBox",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-group-views-visually-using-groupbox",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s[7]||(s[7]=l(`<blockquote><p>Updated for Xcode 15</p></blockquote><p><strong>Updated in iOS 15</strong></p><p>SwiftUI&#39;s <code>GroupBox</code> view groups views together and places a light background color behind them so they stand out. You can optionally also include a header to make group titles, if you need to.</p><p>By default <code>GroupBox</code> with align its views vertically. For example, this will show three text views one above the other:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">GroupBox</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Your account&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>headline<span class="token punctuation">)</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Username: tswift89&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;City: Nashville&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)),n("blockquote",null,[n("p",null,[n("a",v,[a(e,{icon:"fas fa-file-zipper"}),s[0]||(s[0]=p("Download this as an Xcode project"))])])]),s[8]||(s[8]=l(`<figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-group-views-visually-using-groupbox-1~dark@2x.png" alt="Three lines of text centered in a gray rounded rectangle. The top line is bolded." tabindex="0" loading="lazy"><figcaption>Three lines of text centered in a gray rounded rectangle. The top line is bolded.</figcaption></figure><p>If you want to control that layout, such as changing axis or adjusting the alignment, create a stack yourself:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">GroupBox</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">VStack</span><span class="token punctuation">(</span>alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>leading<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Your account&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>headline<span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Username: tswift89&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;City: Nashville&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),n("blockquote",null,[n("p",null,[n("a",f,[a(e,{icon:"fas fa-file-zipper"}),s[1]||(s[1]=p("Download this as an Xcode project"))])])]),s[9]||(s[9]=l(`<figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-group-views-visually-using-groupbox-2~dark@2x.png" alt="Three lines of text left-aligned in a gray rounded rectangle. The top line is bolded." tabindex="0" loading="lazy"><figcaption>Three lines of text left-aligned in a gray rounded rectangle. The top line is bolded.</figcaption></figure><p>One real power feature of <code>GroupBox</code> is that if you nest them they will automatically adapt their colors so they are neatly distinguished:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">GroupBox</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Outer Content&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token class-name">GroupBox</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Middle Content&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token class-name">GroupBox</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Inner Content&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),n("blockquote",null,[n("p",null,[n("a",b,[a(e,{icon:"fas fa-file-zipper"}),s[2]||(s[2]=p("Download this as an Xcode project"))])])]),s[10]||(s[10]=l(`<figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-group-views-visually-using-groupbox-3~dark@2x.png" alt="Three concentric rounded rectangles, each containing a line of text, and the inner rectangle(s)." tabindex="0" loading="lazy"><figcaption>Three concentric rounded rectangles, each containing a line of text, and the inner rectangle(s).</figcaption></figure><p>This effect works just as well – if not better! – in dark mode.</p><p>Like I said, you <em>can</em> add titles to your <code>GroupBox</code> and although it looks okay on macOS it doesn&#39;t look nice at all on iOS:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">GroupBox</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Your account&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">VStack</span><span class="token punctuation">(</span>alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>leading<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Username: tswift89&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;City: Nashville&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),n("blockquote",null,[n("p",null,[n("a",x,[a(e,{icon:"fas fa-file-zipper"}),s[3]||(s[3]=p("Download this as an Xcode project"))])])]),s[11]||(s[11]=n("figure",null,[n("img",{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-group-views-visually-using-groupbox-4~dark@2x.png",alt:"A macOS window containing “Your account” above a two lines of text in a rounded rectangle. Beside it is an iPhone with similar contents consuming horizontal space, resulting in a visual imbalance.",tabindex:"0",loading:"lazy"}),n("figcaption",null,"A macOS window containing “Your account” above a two lines of text in a rounded rectangle. Beside it is an iPhone with similar contents consuming horizontal space, resulting in a visual imbalance.")],-1)),n("details",y,[s[4]||(s[4]=n("summary",null,"Similar solutions…",-1)),a(t,i(o({title:"How to group views together with ControlGroup | SwiftUI by Example",desc:"How to group views together with ControlGroup",link:"/hackingwithswift.com/swiftui/how-to-group-views-together-with-controlgroup.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,i(o({title:"How to group views together | SwiftUI by Example",desc:"How to group views together",link:"/hackingwithswift.com/swiftui/how-to-group-views-together.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,i(o({title:"How to control spacing around individual views using padding | SwiftUI by Example",desc:"How to control spacing around individual views using padding",link:"/hackingwithswift.com/swiftui/how-to-control-spacing-around-individual-views-using-padding.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,i(o({title:"How to create multi-column lists using Table | SwiftUI by Example",desc:"How to create multi-column lists using Table",link:"/hackingwithswift.com/swiftui/how-to-create-multi-column-lists-using-table.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,i(o({title:"How to create views in a loop using ForEach | SwiftUI by Example",desc:"How to create views in a loop using ForEach",link:"/hackingwithswift.com/swiftui/how-to-create-views-in-a-loop-using-foreach.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const G=r(h,[["render",q],["__file","how-to-group-views-visually-using-groupbox.html.vue"]]),H=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-group-views-visually-using-groupbox.html","title":"How to group views visually using GroupBox","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to group views visually using GroupBox","description":"Article(s) > How to group views visually using GroupBox","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to group views visually using GroupBox"},{"property":"og:description","content":"How to group views visually using GroupBox"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-group-views-visually-using-groupbox.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-group-views-visually-using-groupbox.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to group views visually using GroupBox"}],["meta",{"property":"og:description","content":"Article(s) > How to group views visually using GroupBox"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-group-views-visually-using-groupbox-1~dark@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to group views visually using GroupBox\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-group-views-visually-using-groupbox-1~dark@2x.png\\",\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-group-views-visually-using-groupbox-2~dark@2x.png\\",\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-group-views-visually-using-groupbox-3~dark@2x.png\\",\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-group-views-visually-using-groupbox-4~dark@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.48,"words":745},"filePathRelative":"hackingwithswift.com/swiftui/how-to-group-views-visually-using-groupbox.md","excerpt":"\\n"}');export{G as comp,H as data};