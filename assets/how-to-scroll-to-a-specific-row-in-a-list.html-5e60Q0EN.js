import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as w,am as s,as as d,ao as n,at as o,au as i,al as m,an as e,aq as l,ar as h}from"./app-CpYYKbnj.js";const k={},f={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},b={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-scroll-to-a-specific-row-in-a-list-1.zip",target:"_blank",rel:"noopener noreferrer"},v={class:"hint-container details"};function y(p,t){const a=l("VPCard"),r=l("FontIcon"),c=l("VidStack");return h(),w("div",null,[s("h1",f,[s("a",g,[s("span",null,d(p.$frontmatter.title)+" 관련",1)])]),n(a,o(i({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),t[3]||(t[3]=s("hr",null,null,-1)),n(a,o(i({title:"How to scroll to a specific row in a list | SwiftUI by Example",desc:"How to scroll to a specific row in a list",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-scroll-to-a-specific-row-in-a-list",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t[4]||(t[4]=m(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>If you want to programmatically make SwiftUI&#39;s <code>List</code> move to show a specific row, you should embed it inside a <code>ScrollViewReader</code>. This provides a <code>scrollTo()</code> method on its proxy that can move to any row inside the list, just by providing its ID and optionally also an anchor.</p><p>For example, this creates 100 rows in a list, and when you press the button it will scroll directly to the row with ID 50:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">ScrollViewReader</span> <span class="token punctuation">{</span> proxy <span class="token keyword">in</span></span>
<span class="line">            <span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token class-name">Button</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Jump to #50&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    proxy<span class="token punctuation">.</span><span class="token function">scrollTo</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">                <span class="token class-name">List</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token operator">..&lt;</span><span class="token number">100</span><span class="token punctuation">,</span> id<span class="token punctuation">:</span> <span class="token punctuation">\\</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> i <span class="token keyword">in</span></span>
<span class="line">                    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Example </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">i</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),s("blockquote",null,[s("p",null,[s("a",b,[n(r,{icon:"fas fa-file-zipper"}),t[0]||(t[0]=e("Download this as an Xcode project"))])])]),n(c,{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-scroll-to-a-specific-row-in-a-list-1~dark.mp4"}),t[5]||(t[5]=s("p",null,[e("For more control over your scroll behavior, add an "),s("code",null,"anchor"),e(" as the second parameter, like this: "),s("code",null,"proxy.scrollTo(50, anchor: .top)"),e(".")],-1)),n(c,{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-scroll-to-a-specific-row-in-a-list-2~dark.mp4"}),t[6]||(t[6]=s("div",{class:"hint-container tip"},[s("p",{class:"hint-container-title"},"Tips"),s("p",null,[e("If you call "),s("code",null,"scrollTo()"),e(" inside "),s("code",null,"withAnimation()"),e(" the movement will be animated.")])],-1)),s("details",v,[t[1]||(t[1]=s("summary",null,"Similar solutions…",-1)),n(a,o(i({title:"How to flash the scroll bar indicators of a ScrollView or List | SwiftUI by Example",desc:"How to flash the scroll bar indicators of a ScrollView or List",link:"/hackingwithswift.com/swiftui/how-to-flash-the-scroll-bar-indicators-of-a-scrollview-or-list.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(a,o(i({title:"How to hide the scroll indicators in ScrollView, List, and more | SwiftUI by Example",desc:"How to hide the scroll indicators in ScrollView, List, and more",link:"/hackingwithswift.com/swiftui/how-to-hide-the-scroll-indicators-in-scrollview-list-and-more.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(a,o(i({title:"How to allow row selection in a list | SwiftUI by Example",desc:"How to allow row selection in a list",link:"/hackingwithswift.com/swiftui/how-to-allow-row-selection-in-a-list.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(a,o(i({title:"How to adjust List row separator insets | SwiftUI by Example",desc:"How to adjust List row separator insets",link:"/hackingwithswift.com/swiftui/how-to-adjust-list-row-separator-insets.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(a,o(i({title:"How to add custom swipe action buttons to a List row | SwiftUI by Example",desc:"How to add custom swipe action buttons to a List row",link:"/hackingwithswift.com/swiftui/how-to-add-custom-swipe-action-buttons-to-a-list-row.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const H=u(k,[["render",y],["__file","how-to-scroll-to-a-specific-row-in-a-list.html.vue"]]),V=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-scroll-to-a-specific-row-in-a-list.html","title":"How to scroll to a specific row in a list","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to scroll to a specific row in a list","description":"Article(s) > How to scroll to a specific row in a list","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to scroll to a specific row in a list"},{"property":"og:description","content":"How to scroll to a specific row in a list"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-scroll-to-a-specific-row-in-a-list.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-scroll-to-a-specific-row-in-a-list.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to scroll to a specific row in a list"}],["meta",{"property":"og:description","content":"Article(s) > How to scroll to a specific row in a list"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to scroll to a specific row in a list\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.98,"words":595},"filePathRelative":"hackingwithswift.com/swiftui/how-to-scroll-to-a-specific-row-in-a-list.md","excerpt":"\\n"}');export{H as comp,V as data};