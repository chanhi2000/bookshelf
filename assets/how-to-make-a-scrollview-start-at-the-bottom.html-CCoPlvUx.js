import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as h,am as a,as as m,ao as o,at as n,au as e,al as i,an as u,aq as l,ar as w}from"./app-CpYYKbnj.js";const k={},d={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},f={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-make-a-scrollview-start-at-the-bottom-1.zip",target:"_blank",rel:"noopener noreferrer"},b={class:"hint-container details"};function v(c,t){const s=l("VPCard"),r=l("FontIcon");return w(),h("div",null,[a("h1",d,[a("a",g,[a("span",null,m(c.$frontmatter.title)+" 관련",1)])]),o(s,n(e({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=a("nav",{class:"table-of-contents"},[a("ul")],-1)),t[3]||(t[3]=a("hr",null,null,-1)),o(s,n(e({title:"How to make a ScrollView start at the bottom | SwiftUI by Example",desc:"How to make a ScrollView start at the bottom",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-make-a-scrollview-start-at-the-bottom",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t[4]||(t[4]=i(`<blockquote><p>Updated for Xcode 15</p></blockquote><p><strong>New in iOS 17</strong></p><p>SwiftUI&#39;s <code>ScrollView</code> starts scrolling from the top by default, but if you want to create a UI like Apple&#39;s Messages app you can ask the scroll view to start at the bottom by using the <code>scrollPosition()</code> modifier with an initial anchor of <code>.bottom</code>.</p><p>For example, this shows 50 text views in a scroll view, but asks the scroll view to start its position from the bottom rather than the top:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">ScrollView</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">ForEach</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token operator">..&lt;</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> i <span class="token keyword">in</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Item </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">i</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>maxWidth<span class="token punctuation">:</span> <span class="token punctuation">.</span>infinity<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">clipShape</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token function">rect</span><span class="token punctuation">(</span>cornerRadius<span class="token punctuation">:</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token function">scrollPosition</span><span class="token punctuation">(</span>initialAnchor<span class="token punctuation">:</span> <span class="token punctuation">.</span>bottom<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)),a("blockquote",null,[a("p",null,[a("a",f,[o(r,{icon:"fas fa-file-zipper"}),t[0]||(t[0]=u("Download this as an Xcode project"))])])]),t[5]||(t[5]=i('<figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-make-a-scrollview-start-at-the-bottom-1~dark@2x.png" alt="A scrollview containing many items, showing that it scrolls from the bottom up rather than the top down." tabindex="0" loading="lazy"><figcaption>A scrollview containing many items, showing that it scrolls from the bottom up rather than the top down.</figcaption></figure><p>If your UI alters somehow without the user scrolling – for example if the keyboard appears, or you adjust the size of the scroll view – then the scroll position will remain anchored to the bottom. However, if the user adjusts the scroll position manually, it will scroll freely as normal.</p><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>The <code>initialAnchor</code> parameter is any <code>UnitPoint</code>, so you can use <code>.trailing</code> to start a horizontal scroll view from the right edge, or any exact value you need for your UI.</p></div>',3)),a("details",b,[t[1]||(t[1]=a("summary",null,"Similar solutions…",-1)),o(s,n(e({title:"How to display a bottom sheet | SwiftUI by Example",desc:"How to display a bottom sheet",link:"/hackingwithswift.com/swiftui/how-to-display-a-bottom-sheet.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),o(s,n(e({title:"How to make a ScrollView snap with paging or between child views | SwiftUI by Example",desc:"How to make a ScrollView snap with paging or between child views",link:"/hackingwithswift.com/swiftui/how-to-make-a-scrollview-snap-with-paging-or-between-child-views.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),o(s,n(e({title:"How to follow this quick start guide | SwiftUI by Example",desc:"How to follow this quick start guide",link:"/hackingwithswift.com/swiftui/how-to-follow-this-quick-start-guide.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),o(s,n(e({title:"How to start an animation immediately after a view appears | SwiftUI by Example",desc:"How to start an animation immediately after a view appears",link:"/hackingwithswift.com/swiftui/how-to-start-an-animation-immediately-after-a-view-appears.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),o(s,n(e({title:"How to flash the scroll bar indicators of a ScrollView or List | SwiftUI by Example",desc:"How to flash the scroll bar indicators of a ScrollView or List",link:"/hackingwithswift.com/swiftui/how-to-flash-the-scroll-bar-indicators-of-a-scrollview-or-list.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const x=p(k,[["render",v],["__file","how-to-make-a-scrollview-start-at-the-bottom.html.vue"]]),H=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-make-a-scrollview-start-at-the-bottom.html","title":"How to make a ScrollView start at the bottom","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make a ScrollView start at the bottom","description":"Article(s) > How to make a ScrollView start at the bottom","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make a ScrollView start at the bottom"},{"property":"og:description","content":"How to make a ScrollView start at the bottom"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-make-a-scrollview-start-at-the-bottom.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-make-a-scrollview-start-at-the-bottom.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make a ScrollView start at the bottom"}],["meta",{"property":"og:description","content":"Article(s) > How to make a ScrollView start at the bottom"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-make-a-scrollview-start-at-the-bottom-1~dark@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make a ScrollView start at the bottom\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-make-a-scrollview-start-at-the-bottom-1~dark@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.06,"words":619},"filePathRelative":"hackingwithswift.com/swiftui/how-to-make-a-scrollview-start-at-the-bottom.md","excerpt":"\\n"}');export{x as comp,H as data};