import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as r,am as s,as as d,ao as a,at as t,au as i,al as u,aq as o,ar as w}from"./app-CpYYKbnj.js";const m={},k={id:"frontmatter-title-관련",tabindex:"-1"},v={class:"header-anchor",href:"#frontmatter-title-관련"},f={class:"hint-container details"};function h(p,n){const e=o("VPCard"),l=o("VidStack");return w(),r("div",null,[s("h1",k,[s("a",v,[s("span",null,d(p.$frontmatter.title)+" 관련",1)])]),a(e,t(i({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[1]||(n[1]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[2]||(n[2]=s("hr",null,null,-1)),a(e,t(i({title:"How to respond to view lifecycle events: onAppear() and onDisappear() | SwiftUI by Example",desc:"How to respond to view lifecycle events: onAppear() and onDisappear()",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-respond-to-view-lifecycle-events-onappear-and-ondisappear",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[3]||(n[3]=u(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>SwiftUI gives us equivalents to UIKit&#39;s <code>viewDidAppear()</code> and <code>viewDidDisappear()</code> in the form of <code>onAppear()</code> and <code>onDisappear()</code>. You can attach any code to these two events that you want, and SwiftUI will execute them when they occur.</p><p>As an example, this creates two views that use <code>onAppear()</code> and <code>onDisappear()</code> to print messages, with a navigation link to move between the two:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">NavigationStack</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token class-name">NavigationLink</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token class-name">DetailView</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">}</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Hello World&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">.</span>onAppear <span class="token punctuation">{</span></span>
<span class="line">                <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;ContentView appeared!&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">.</span>onDisappear <span class="token punctuation">{</span></span>
<span class="line">                <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;ContentView disappeared!&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">DetailView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Second View&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">.</span>onAppear <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;DetailView appeared!&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">.</span>onDisappear <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;DetailView disappeared!&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),a(l,{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-respond-to-view-lifecycle-events-onappear-and-ondisappear-1~dark.mp4"}),n[4]||(n[4]=s("p",null,"When that code runs you should be able to move between the two views and see messages printed in your Xcode debug console.",-1)),s("details",f,[n[0]||(n[0]=s("summary",null,"Similar solutions…",-1)),a(e,t(i({title:"How to detect and respond to key press events | SwiftUI by Example",desc:"How to detect and respond to key press events",link:"/hackingwithswift.com/swiftui/how-to-detect-and-respond-to-key-press-events.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(e,t(i({title:"SwiftUI tips and tricks | SwiftUI by Example",desc:"SwiftUI tips and tricks",link:"/hackingwithswift.com/swiftui/swiftui-tips-and-tricks.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(e,t(i({title:"All SwiftUI property wrappers explained and compared | SwiftUI by Example",desc:"All SwiftUI property wrappers explained and compared",link:"/hackingwithswift.com/swiftui/all-swiftui-property-wrappers-explained-and-compared.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(e,t(i({title:"How to use Instruments to profile your SwiftUI code and identify slow layouts | SwiftUI by Example",desc:"How to use Instruments to profile your SwiftUI code and identify slow layouts",link:"/hackingwithswift.com/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(e,t(i({title:"Building a menu using List | SwiftUI by Example",desc:"Building a menu using List",link:"/hackingwithswift.com/swiftui/building-a-menu-using-list.html",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const y=c(m,[["render",h],["__file","how-to-respond-to-view-lifecycle-events-onappear-and-ondisappear.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-respond-to-view-lifecycle-events-onappear-and-ondisappear.html","title":"How to respond to view lifecycle events - onAppear() and onDisappear()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to respond to view lifecycle events - onAppear() and onDisappear()","description":"Article(s) > How to respond to view lifecycle events - onAppear() and onDisappear()","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to respond to view lifecycle events - onAppear() and onDisappear()"},{"property":"og:description","content":"How to respond to view lifecycle events - onAppear() and onDisappear()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-respond-to-view-lifecycle-events-onappear-and-ondisappear.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-respond-to-view-lifecycle-events-onappear-and-ondisappear.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to respond to view lifecycle events - onAppear() and onDisappear()"}],["meta",{"property":"og:description","content":"Article(s) > How to respond to view lifecycle events - onAppear() and onDisappear()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to respond to view lifecycle events - onAppear() and onDisappear()\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.7,"words":510},"filePathRelative":"hackingwithswift.com/swiftui/how-to-respond-to-view-lifecycle-events-onappear-and-ondisappear.md","excerpt":"\\n"}');export{y as comp,S as data};