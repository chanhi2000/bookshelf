import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as n,as as h,ao as t,at as e,au as o,al as c,an as l,aq as p,ar as k}from"./app-CpYYKbnj.js";const g={},m={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},f={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-mark-content-as-a-placeholder-using-redacted-1.zip",target:"_blank",rel:"noopener noreferrer"},v={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-mark-content-as-a-placeholder-using-redacted-2.zip",target:"_blank",rel:"noopener noreferrer"},b={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-mark-content-as-a-placeholder-using-redacted-3.zip",target:"_blank",rel:"noopener noreferrer"},y={class:"hint-container details"};function x(r,a){const s=p("VPCard"),i=p("FontIcon");return k(),u("div",null,[n("h1",m,[n("a",w,[n("span",null,h(r.$frontmatter.title)+" 관련",1)])]),t(s,e(o({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a[4]||(a[4]=n("nav",{class:"table-of-contents"},[n("ul")],-1)),a[5]||(a[5]=n("hr",null,null,-1)),t(s,e(o({title:"How to mark content as a placeholder using redacted() | SwiftUI by Example",desc:"How to mark content as a placeholder using redacted()",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-mark-content-as-a-placeholder-using-redacted",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a[6]||(a[6]=c(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>SwiftUI lets us mark text as a placeholder in our view, meaning that it gets rendered but masked out with gray to show it isn&#39;t final content. This is provided through the <code>redacted(reason:)</code> modifier, along with an <code>unredacted()</code> modifier you can use to override redaction as needed.</p><p>Here&#39;s how it looks in code:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;This is placeholder text&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>title<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">redacted</span><span class="token punctuation">(</span>reason<span class="token punctuation">:</span> <span class="token punctuation">.</span>placeholder<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),n("blockquote",null,[n("p",null,[n("a",f,[t(i,{icon:"fas fa-file-zipper"}),a[0]||(a[0]=l("Download this as an Xcode project"))])])]),a[7]||(a[7]=c(`<figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-mark-content-as-a-placeholder-using-redacted-1~dark.png" alt="A long gray rectangle representing redacted text." tabindex="0" loading="lazy"><figcaption>A long gray rectangle representing redacted text.</figcaption></figure><p>You can redact several things in your view at once, just by using <code>redacted(reason:)</code> on a container, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;This is placeholder text&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;And so is this&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>title<span class="token punctuation">)</span>    </span>
<span class="line"><span class="token punctuation">.</span><span class="token function">redacted</span><span class="token punctuation">(</span>reason<span class="token punctuation">:</span> <span class="token punctuation">.</span>placeholder<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),n("blockquote",null,[n("p",null,[n("a",v,[t(i,{icon:"fas fa-file-zipper"}),a[1]||(a[1]=l("Download this as an Xcode project"))])])]),a[8]||(a[8]=c(`<p>Two gray rectangles representing two lines of redacted text.</p><p>Apple has said that redaction is an additive process, meaning that if you add redaction reasons to both a parent and a child then they will combine. Right now there&#39;s only <code>.placeholder</code>, but perhaps we&#39;ll see pixellation or similar in the future?</p><p>You can also query any redaction reasons passed in from the environment like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@Environment</span><span class="token punctuation">(</span><span class="token punctuation">\\</span><span class="token punctuation">.</span>redactionReasons<span class="token punctuation">)</span> <span class="token keyword">var</span> redactionReasons</span>
<span class="line">    <span class="token keyword">let</span> bio <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;The rain in Spain falls mainly on the Spaniards&quot;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> redactionReasons <span class="token operator">==</span> <span class="token punctuation">.</span>placeholder <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Loading…&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span>bio<span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">redacted</span><span class="token punctuation">(</span>reason<span class="token punctuation">:</span> redactionReasons<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),n("blockquote",null,[n("p",null,[n("a",b,[t(i,{icon:"fas fa-file-zipper"}),a[2]||(a[2]=l("Download this as an Xcode project"))])])]),a[9]||(a[9]=n("figure",null,[n("img",{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-mark-content-as-a-placeholder-using-redacted-3~dark.png",alt:"The unredacted text “The rain in Spain falls mainly on the Spaniards”.",tabindex:"0",loading:"lazy"}),n("figcaption",null,"The unredacted text “The rain in Spain falls mainly on the Spaniards”.")],-1)),a[10]||(a[10]=n("figure",null,[n("img",{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-mark-content-as-a-placeholder-using-redacted-4~dark.png",alt:"Placeholder text “Loading...” standing in for redacted text.",tabindex:"0",loading:"lazy"}),n("figcaption",null,"Placeholder text “Loading...” standing in for redacted text.")],-1)),a[11]||(a[11]=n("div",{class:"hint-container tip"},[n("p",{class:"hint-container-title"},"Tips"),n("p",null,"Redaction also works on images using the same code as shown above.")],-1)),n("details",y,[a[3]||(a[3]=n("summary",null,"Similar solutions…",-1)),t(s,e(o({title:"How to mark content as private using privacySensitive() | SwiftUI by Example",desc:"How to mark content as private using privacySensitive()",link:"/hackingwithswift.com/swiftui/how-to-mark-content-as-private-using-privacysensitive.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(s,e(o({title:"How to add a placeholder to a TextField | SwiftUI by Example",desc:"How to add a placeholder to a TextField",link:"/hackingwithswift.com/swiftui/how-to-add-a-placeholder-to-a-textfield.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(s,e(o({title:"How to create modifiers for a UIViewRepresentable struct | SwiftUI by Example",desc:"How to create modifiers for a UIViewRepresentable struct",link:"/hackingwithswift.com/swiftui/how-to-create-modifiers-for-a-uiviewrepresentable-struct.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(s,e(o({title:"How to render Markdown content in text | SwiftUI by Example",desc:"How to render Markdown content in text",link:"/hackingwithswift.com/swiftui/how-to-render-markdown-content-in-text.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(s,e(o({title:"How to create scrolling pages of content using tabViewStyle() | SwiftUI by Example",desc:"How to create scrolling pages of content using tabViewStyle()",link:"/hackingwithswift.com/swiftui/how-to-create-scrolling-pages-of-content-using-tabviewstyle.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const H=d(g,[["render",x],["__file","how-to-mark-content-as-a-placeholder-using-redacted.html.vue"]]),T=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-mark-content-as-a-placeholder-using-redacted.html","title":"How to mark content as a placeholder using redacted()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to mark content as a placeholder using redacted()","description":"Article(s) > How to mark content as a placeholder using redacted()","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to mark content as a placeholder using redacted()"},{"property":"og:description","content":"How to mark content as a placeholder using redacted()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-mark-content-as-a-placeholder-using-redacted.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-mark-content-as-a-placeholder-using-redacted.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to mark content as a placeholder using redacted()"}],["meta",{"property":"og:description","content":"Article(s) > How to mark content as a placeholder using redacted()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-mark-content-as-a-placeholder-using-redacted-1~dark.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to mark content as a placeholder using redacted()\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-mark-content-as-a-placeholder-using-redacted-1~dark.png\\",\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-mark-content-as-a-placeholder-using-redacted-3~dark.png\\",\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-mark-content-as-a-placeholder-using-redacted-4~dark.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.4,"words":720},"filePathRelative":"hackingwithswift.com/swiftui/how-to-mark-content-as-a-placeholder-using-redacted.md","excerpt":"\\n"}');export{H as comp,T as data};