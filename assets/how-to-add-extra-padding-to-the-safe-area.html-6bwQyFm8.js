import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as a,as as h,ao as s,at as e,au as o,al as p,an as l,aq as c,ar as f}from"./app-CpYYKbnj.js";const m={},g={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"},w={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-add-extra-padding-to-the-safe-area-1.zip",target:"_blank",rel:"noopener noreferrer"},b={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-add-extra-padding-to-the-safe-area-2.zip",target:"_blank",rel:"noopener noreferrer"},v={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-add-extra-padding-to-the-safe-area-3.zip",target:"_blank",rel:"noopener noreferrer"},x={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-add-extra-padding-to-the-safe-area-4.zip",target:"_blank",rel:"noopener noreferrer"},y={class:"hint-container details"};function H(r,n){const t=c("VPCard"),i=c("FontIcon");return f(),u("div",null,[a("h1",g,[a("a",k,[a("span",null,h(r.$frontmatter.title)+" 관련",1)])]),s(t,e(o({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[5]||(n[5]=a("nav",{class:"table-of-contents"},[a("ul")],-1)),n[6]||(n[6]=a("hr",null,null,-1)),s(t,e(o({title:"How to add extra padding to the safe area | SwiftUI by Example",desc:"How to add extra padding to the safe area",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-add-extra-padding-to-the-safe-area",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[7]||(n[7]=p(`<blockquote><p>Updated for Xcode 15</p></blockquote><p><strong>New in iOS 17</strong></p><p>SwiftUI&#39;s <code>safeAreaPadding()</code> modifier insets the safe area by some amount of your choosing, either on all edges or on a subset. When dealing with scrolling content this behaves differently from using the plain <code>padding()</code> modifier, because it will inset the contents of the scroll view rather than the scroll view itself.</p><p>First, here&#39;a simple example that draws a red circle to fill all the safe area, minus 50 points on each side:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">.</span>red<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">safeAreaPadding</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)),a("blockquote",null,[a("p",null,[a("a",w,[s(i,{icon:"fas fa-file-zipper"}),n[0]||(n[0]=l("Download this as an Xcode project"))])])]),n[8]||(n[8]=p(`<p>You can request only some edges by adding a second parameter, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">.</span>red<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">safeAreaPadding</span><span class="token punctuation">(</span><span class="token punctuation">.</span>horizontal<span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)),a("blockquote",null,[a("p",null,[a("a",b,[s(i,{icon:"fas fa-file-zipper"}),n[1]||(n[1]=l("Download this as an Xcode project"))])])]),n[9]||(n[9]=p(`<p>And for complete control, you can pass in an <code>EdgeInsets</code> object to get exact insets on all four edges:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">.</span>red<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">safeAreaPadding</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token keyword">init</span><span class="token punctuation">(</span>top<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">,</span> leading<span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">,</span> bottom<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">,</span> trailing<span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)),a("blockquote",null,[a("p",null,[a("a",v,[s(i,{icon:"fas fa-file-zipper"}),n[2]||(n[2]=l("Download this as an Xcode project"))])])]),n[10]||(n[10]=p(`<p>Things get more interesting when we apply <code>safeAreaPadding()</code> to a <code>ScrollView</code>, because it ensures our content starts away from the screen edge but still scrolls next to it:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">ScrollView</span><span class="token punctuation">(</span><span class="token punctuation">.</span>horizontal<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">HStack</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">ForEach</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token operator">..&lt;</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> i <span class="token keyword">in</span></span>
<span class="line">            <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token function">safeAreaPadding</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)),a("blockquote",null,[a("p",null,[a("a",x,[s(i,{icon:"fas fa-file-zipper"}),n[3]||(n[3]=l("Download this as an Xcode project"))])])]),a("details",y,[n[4]||(n[4]=a("summary",null,"Similar solutions…",-1)),s(t,e(o({title:"How to place content outside the safe area | SwiftUI by Example",desc:"How to place content outside the safe area",link:"/hackingwithswift.com/swiftui/how-to-place-content-outside-the-safe-area.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"How to inset the safe area with custom content | SwiftUI by Example",desc:"How to inset the safe area with custom content",link:"/hackingwithswift.com/swiftui/how-to-inset-the-safe-area-with-custom-content.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"How to control spacing around individual views using padding | SwiftUI by Example",desc:"How to control spacing around individual views using padding",link:"/hackingwithswift.com/swiftui/how-to-control-spacing-around-individual-views-using-padding.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"How to color the padding around a view | SwiftUI by Example",desc:"How to color the padding around a view",link:"/hackingwithswift.com/swiftui/how-to-color-the-padding-around-a-view.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const A=d(m,[["render",H],["__file","how-to-add-extra-padding-to-the-safe-area.html.vue"]]),E=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-add-extra-padding-to-the-safe-area.html","title":"How to add extra padding to the safe area","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to add extra padding to the safe area","description":"Article(s) > How to add extra padding to the safe area","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to add extra padding to the safe area"},{"property":"og:description","content":"How to add extra padding to the safe area"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-add-extra-padding-to-the-safe-area.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-add-extra-padding-to-the-safe-area.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to add extra padding to the safe area"}],["meta",{"property":"og:description","content":"Article(s) > How to add extra padding to the safe area"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to add extra padding to the safe area\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.02,"words":606},"filePathRelative":"hackingwithswift.com/swiftui/how-to-add-extra-padding-to-the-safe-area.md","excerpt":"\\n"}');export{A as comp,E as data};