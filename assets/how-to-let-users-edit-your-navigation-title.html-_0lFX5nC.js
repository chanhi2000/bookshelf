import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as d,am as s,as as m,ao as n,at as e,au as i,al as l,an as p,aq as c,ar as g}from"./app-CpYYKbnj.js";const k={},w={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"},v={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-let-users-edit-your-navigation-title-1.zip",target:"_blank",rel:"noopener noreferrer"},f={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-let-users-edit-your-navigation-title-2.zip",target:"_blank",rel:"noopener noreferrer"},b={class:"hint-container details"};function y(r,t){const a=c("VPCard"),o=c("FontIcon");return g(),d("div",null,[s("h1",w,[s("a",h,[s("span",null,m(r.$frontmatter.title)+" 관련",1)])]),n(a,e(i({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[3]||(t[3]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),t[4]||(t[4]=s("hr",null,null,-1)),n(a,e(i({title:"How to let users edit your navigation title | SwiftUI by Example",desc:"How to let users edit your navigation title",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-let-users-edit-your-navigation-title",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t[5]||(t[5]=l(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>SwiftUI&#39;s <code>NavigationStack</code> can display a simple string by using <code>navigationTitle()</code>, but that same modifier can <em>also</em> accept a string binding so the user can <em>edit</em> the title by tapping on it.</p><div class="hint-container important"><p class="hint-container-title">Important</p><p>Navigation title editing only works when your navigation bar is operating in inline mode. As far as I know, it works only on iOS and iPadOS.</p></div><p>For example, this shows a default title of “Welcome”, but users can tap that title to change it:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> title <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Welcome&quot;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">NavigationStack</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Hello, world!&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">navigationTitle</span><span class="token punctuation">(</span>$title<span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">navigationBarTitleDisplayMode</span><span class="token punctuation">(</span><span class="token punctuation">.</span>inline<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)),s("blockquote",null,[s("p",null,[s("a",v,[n(o,{icon:"fas fa-file-zipper"}),t[0]||(t[0]=p("Download this as an Xcode project"))])])]),t[6]||(t[6]=l(`<p>If your title is there because it represents the name of some content your user is editing, I would recommend adding <code>.toolbarRole(.editor)</code> so that your title is aligned to the leading edge like other document titles:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> title <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Welcome&quot;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">NavigationStack</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Hello, world!&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">navigationTitle</span><span class="token punctuation">(</span>$title<span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">navigationBarTitleDisplayMode</span><span class="token punctuation">(</span><span class="token punctuation">.</span>inline<span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">toolbarRole</span><span class="token punctuation">(</span><span class="token punctuation">.</span>editor<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)),s("blockquote",null,[s("p",null,[s("a",f,[n(o,{icon:"fas fa-file-zipper"}),t[1]||(t[1]=p("Download this as an Xcode project"))])])]),s("details",b,[t[2]||(t[2]=s("summary",null,"Similar solutions…",-1)),n(a,e(i({title:"How to let users delete rows from a list | SwiftUI by Example",desc:"How to let users delete rows from a list",link:"/hackingwithswift.com/swiftui/how-to-let-users-delete-rows-from-a-list.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(a,e(i({title:"How to let users share content using the system share sheet | SwiftUI by Example",desc:"How to let users share content using the system share sheet",link:"/hackingwithswift.com/swiftui/how-to-let-users-share-content-using-the-system-share-sheet.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(a,e(i({title:"How to let users move rows in a list | SwiftUI by Example",desc:"How to let users move rows in a list",link:"/hackingwithswift.com/swiftui/how-to-let-users-move-rows-in-a-list.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(a,e(i({title:"How to let users import videos using PhotosPicker | SwiftUI by Example",desc:"How to let users import videos using PhotosPicker",link:"/hackingwithswift.com/swiftui/how-to-let-users-import-videos-using-photospicker.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(a,e(i({title:"How to let users customize toolbar buttons | SwiftUI by Example",desc:"How to let users customize toolbar buttons",link:"/hackingwithswift.com/swiftui/how-to-let-users-customize-toolbar-buttons.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const x=u(k,[["render",y],["__file","how-to-let-users-edit-your-navigation-title.html.vue"]]),I=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-let-users-edit-your-navigation-title.html","title":"How to let users edit your navigation title","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to let users edit your navigation title","description":"Article(s) > How to let users edit your navigation title","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to let users edit your navigation title"},{"property":"og:description","content":"How to let users edit your navigation title"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-let-users-edit-your-navigation-title.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-let-users-edit-your-navigation-title.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to let users edit your navigation title"}],["meta",{"property":"og:description","content":"Article(s) > How to let users edit your navigation title"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to let users edit your navigation title\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.9,"words":571},"filePathRelative":"hackingwithswift.com/swiftui/how-to-let-users-edit-your-navigation-title.md","excerpt":"\\n"}');export{x as comp,I as data};