import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as w,am as s,as as d,ao as t,at as e,au as i,al as p,an as h,aq as o,ar as m}from"./app-CpYYKbnj.js";const k={},g={id:"frontmatter-title-관련",tabindex:"-1"},v={class:"header-anchor",href:"#frontmatter-title-관련"},f={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-present-a-new-view-using-sheets-1.zip",target:"_blank",rel:"noopener noreferrer"},b={class:"hint-container details"};function y(c,n){const a=o("VPCard"),l=o("FontIcon"),r=o("VidStack");return m(),w("div",null,[s("h1",g,[s("a",v,[s("span",null,d(c.$frontmatter.title)+" 관련",1)])]),t(a,e(i({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[2]||(n[2]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[3]||(n[3]=s("hr",null,null,-1)),t(a,e(i({title:"How to present a new view using sheets | SwiftUI by Example",desc:"How to present a new view using sheets",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-present-a-new-view-using-sheets",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[4]||(n[4]=p(`<blockquote><p>Updated for Xcode 15</p></blockquote><p><strong>Updated in iOS 15</strong></p><p>SwiftUI’s sheets are used to present new views over existing ones, while still allowing users to drag down to dismiss the new view when they are ready.</p><p>To use a sheet, give it something to show (some text, an image, a custom view, etc), add a Boolean that defines whether the detail view should be showing, then attach it to your main view as a modal sheet.</p><p>For example, this creates a simple detail view, then presents it from <code>ContentView</code> when a button is tapped:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">SheetView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@Environment</span><span class="token punctuation">(</span><span class="token punctuation">\\</span><span class="token punctuation">.</span>dismiss<span class="token punctuation">)</span> <span class="token keyword">var</span> dismiss</span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Button</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Press to dismiss&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">dismiss</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>title<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token punctuation">.</span>black<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> showingSheet <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Button</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Show Sheet&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            showingSheet<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">sheet</span><span class="token punctuation">(</span>isPresented<span class="token punctuation">:</span> $showingSheet<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">SheetView</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6)),s("blockquote",null,[s("p",null,[s("a",f,[t(l,{icon:"fas fa-file-zipper"}),n[0]||(n[0]=h("Download this as an Xcode project"))])])]),t(r,{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-present-a-new-view-using-sheets-1~dar.mp4"}),n[5]||(n[5]=p('<div class="hint-container important"><p class="hint-container-title">Important</p><p>If you’re targeting iOS 14 or below, you should use <code>@Environment(\\.presentationMode) var presentationMode</code> and <code>presentationMode.wrappedValue.dismiss()</code> instead.</p></div><p>Unlike navigation links, sheets don’t require a navigation stack to work.</p><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>If you don’t want your sheet to be dismissible by dragging downwards on iOS, use the <code>fullScreenCover()</code> modifier instead.</p></div>',3)),s("details",b,[n[1]||(n[1]=s("summary",null,"Similar solutions…",-1)),t(a,e(i({title:"How to present multiple sheets | SwiftUI by Example",desc:"How to present multiple sheets",link:"/hackingwithswift.com/swiftui/how-to-present-multiple-sheets.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(a,e(i({title:"How to present a full screen modal view using fullScreenCover() | SwiftUI by Example",desc:"How to present a full screen modal view using fullScreenCover()",link:"/hackingwithswift.com/swiftui/how-to-present-a-full-screen-modal-view-using-fullscreencover.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(a,e(i({title:"SwiftUI tips and tricks | SwiftUI by Example",desc:"SwiftUI tips and tricks",link:"/hackingwithswift.com/swiftui/swiftui-tips-and-tricks.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(a,e(i({title:"How to convert a SwiftUI view to an image | SwiftUI by Example",desc:"How to convert a SwiftUI view to an image",link:"/hackingwithswift.com/swiftui/how-to-convert-a-swiftui-view-to-an-image.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(a,e(i({title:"How to push a new view onto a NavigationStack | SwiftUI by Example",desc:"How to push a new view onto a NavigationStack",link:"/hackingwithswift.com/swiftui/how-to-push-a-new-view-onto-a-navigationstack.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const H=u(k,[["render",y],["__file","how-to-present-a-new-view-using-sheets.html.vue"]]),I=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-present-a-new-view-using-sheets.html","title":"How to present a new view using sheets","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to present a new view using sheets","description":"Article(s) > How to present a new view using sheets","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to present a new view using sheets"},{"property":"og:description","content":"How to present a new view using sheets"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-present-a-new-view-using-sheets.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-present-a-new-view-using-sheets.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to present a new view using sheets"}],["meta",{"property":"og:description","content":"Article(s) > How to present a new view using sheets"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to present a new view using sheets\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"prev":"/hackingwithswift.com/swiftui/how-to-let-users-pick-options-from-a-menu.md"},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.93,"words":578},"filePathRelative":"hackingwithswift.com/swiftui/how-to-present-a-new-view-using-sheets.md","excerpt":"\\n"}');export{H as comp,I as data};