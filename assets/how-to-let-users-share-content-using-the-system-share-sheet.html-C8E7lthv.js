import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as h,am as n,as as m,ao as t,at as a,au as o,al as l,an as p,aq as c,ar as d}from"./app-CpYYKbnj.js";const k={},g={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},f={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-let-users-share-content-using-the-system-share-sheet-1.zip",target:"_blank",rel:"noopener noreferrer"},v={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-let-users-share-content-using-the-system-share-sheet-2.zip",target:"_blank",rel:"noopener noreferrer"},b={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-let-users-share-content-using-the-system-share-sheet-3.zip",target:"_blank",rel:"noopener noreferrer"},y={class:"hint-container details"};function S(r,s){const e=c("VPCard"),i=c("FontIcon");return d(),h("div",null,[n("h1",g,[n("a",w,[n("span",null,m(r.$frontmatter.title)+" 관련",1)])]),t(e,a(o({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),s[4]||(s[4]=n("nav",{class:"table-of-contents"},[n("ul")],-1)),s[5]||(s[5]=n("hr",null,null,-1)),t(e,a(o({title:"How to let users share content using the system share sheet | SwiftUI by Example",desc:"How to let users share content using the system share sheet",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-let-users-share-content-using-the-system-share-sheet",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s[6]||(s[6]=l(`<blockquote><p>Updated for Xcode 15</p></blockquote><p><strong>New in iOS 16</strong></p><p>SwiftUI&#39;s <code>ShareLink</code> view makes it easy to share any kind of data from your app, as long as it conforms to the <code>Transferable</code> protocol.</p><p>By default you get a simple “Share” label with the appropriate icon, but you can also provide your own title text, or an entirely custom label:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> link <span class="token operator">=</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;https://hackingwithswift.com&quot;</span></span><span class="token punctuation">)</span><span class="token operator">!</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token class-name">VStack</span><span class="token punctuation">(</span>spacing<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">ShareLink</span><span class="token punctuation">(</span>item<span class="token punctuation">:</span> link<span class="token punctuation">)</span></span>
<span class="line">    <span class="token class-name">ShareLink</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Learn Swift here&quot;</span></span><span class="token punctuation">,</span> item<span class="token punctuation">:</span> link<span class="token punctuation">)</span></span>
<span class="line">    <span class="token class-name">ShareLink</span><span class="token punctuation">(</span>item<span class="token punctuation">:</span> link<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Label</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Learn Swift here&quot;</span></span><span class="token punctuation">,</span> systemImage<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;swift&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)),n("blockquote",null,[n("p",null,[n("a",f,[t(i,{icon:"fas fa-file-zipper"}),s[0]||(s[0]=p("Download this as an Xcode project"))])])]),s[7]||(s[7]=l(`<p>If you want to attach some extra text to the content you&#39;re sharing, there&#39;s a <code>message</code> parameter to do just that:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> link <span class="token operator">=</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;https://hackingwithswift.com&quot;</span></span><span class="token punctuation">)</span><span class="token operator">!</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name">ShareLink</span><span class="token punctuation">(</span>item<span class="token punctuation">:</span> link<span class="token punctuation">,</span> message<span class="token punctuation">:</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Learn Swift here!&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)),n("blockquote",null,[n("p",null,[n("a",v,[t(i,{icon:"fas fa-file-zipper"}),s[1]||(s[1]=p("Download this as an Xcode project"))])])]),s[8]||(s[8]=l(`<p>For simple URLs the system is able to generate a preview on our behalf, but you can also provide a custom preview with some text and an image of your choosing, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> link <span class="token operator">=</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;https://www.admin.ch&quot;</span></span><span class="token punctuation">)</span><span class="token operator">!</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">ShareLink</span><span class="token punctuation">(</span></span>
<span class="line">        item<span class="token punctuation">:</span> link<span class="token punctuation">,</span></span>
<span class="line">        preview<span class="token punctuation">:</span> <span class="token class-name">SharePreview</span><span class="token punctuation">(</span></span>
<span class="line">            <span class="token string-literal"><span class="token string">&quot;Switzerland&#39;s flag: it&#39;s a big plus.&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">            image<span class="token punctuation">:</span> <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;plus&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)),n("blockquote",null,[n("p",null,[n("a",b,[t(i,{icon:"fas fa-file-zipper"}),s[2]||(s[2]=p("Download this as an Xcode project"))])])]),n("details",y,[s[3]||(s[3]=n("summary",null,"Similar solutions…",-1)),t(e,a(o({title:"How to display a bottom sheet | SwiftUI by Example",desc:"How to display a bottom sheet",link:"/hackingwithswift.com/swiftui/how-to-display-a-bottom-sheet.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(e,a(o({title:"How to prevent a sheet from being dismissed with a swipe | SwiftUI by Example",desc:"How to prevent a sheet from being dismissed with a swipe",link:"/hackingwithswift.com/swiftui/how-to-prevent-a-sheet-from-being-dismissed-with-a-swipe.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(e,a(o({title:"How to let users import videos using PhotosPicker | SwiftUI by Example",desc:"How to let users import videos using PhotosPicker",link:"/hackingwithswift.com/swiftui/how-to-let-users-import-videos-using-photospicker.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(e,a(o({title:"How to show an action sheet | SwiftUI by Example",desc:"How to show an action sheet",link:"/hackingwithswift.com/swiftui/how-to-show-an-action-sheet.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(e,a(o({title:"How to let users select pictures using PhotosPicker | SwiftUI by Example",desc:"How to let users select pictures using PhotosPicker",link:"/hackingwithswift.com/swiftui/how-to-let-users-select-pictures-using-photospicker.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const H=u(k,[["render",S],["__file","how-to-let-users-share-content-using-the-system-share-sheet.html.vue"]]),U=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-let-users-share-content-using-the-system-share-sheet.html","title":"How to let users share content using the system share sheet","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to let users share content using the system share sheet","description":"Article(s) > How to let users share content using the system share sheet","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to let users share content using the system share sheet"},{"property":"og:description","content":"How to let users share content using the system share sheet"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-let-users-share-content-using-the-system-share-sheet.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-let-users-share-content-using-the-system-share-sheet.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to let users share content using the system share sheet"}],["meta",{"property":"og:description","content":"Article(s) > How to let users share content using the system share sheet"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to let users share content using the system share sheet\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.11,"words":633},"filePathRelative":"hackingwithswift.com/swiftui/how-to-let-users-share-content-using-the-system-share-sheet.md","excerpt":"\\n"}');export{H as comp,U as data};