import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as p,am as a,as as c,ao as e,at as o,au as i,al as l,aq as u,ar as d}from"./app-CpYYKbnj.js";const w={},m={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"},g={class:"hint-container details"};function v(s,t){const n=u("VPCard");return d(),p("div",null,[a("h1",m,[a("a",h,[a("span",null,c(s.$frontmatter.title)+" 관련",1)])]),e(n,o(i({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[1]||(t[1]=a("nav",{class:"table-of-contents"},[a("ul")],-1)),t[2]||(t[2]=a("hr",null,null,-1)),e(n,o(i({title:"How to preview your layout in portrait or landscape | SwiftUI by Example",desc:"How to preview your layout in portrait or landscape",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-preview-your-layout-in-portrait-or-landscape",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t[3]||(t[3]=l(`<blockquote><p>Updated for Xcode 15</p></blockquote><p><strong>New in iOS 15</strong></p><p>SwiftUI has a dedicated <code>previewInterfaceOrientation()</code> modifier that controls the way device previews look in Xcode’s canvas. To use it, pass one of the four device rotation options: <code>.portrait</code>, <code>.portraitUpsideDown</code>, <code>.landscapeLeft</code>, or <code>.landscapeRight</code>.</p><p>For example, this will show a landscape left preview:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView_Previews</span><span class="token punctuation">:</span> <span class="token class-name">PreviewProvider</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">static</span> <span class="token keyword">var</span> previews<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">ContentView</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">previewInterfaceOrientation</span><span class="token punctuation">(</span><span class="token punctuation">.</span>landscapeLeft<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-preview-your-layout-in-portrait-or-landscape-1~dark@2x.png" alt="An Xcode Preview of a phone rotated left into Landscape orientation." tabindex="0" loading="lazy"><figcaption>An Xcode Preview of a phone rotated left into Landscape orientation.</figcaption></figure><p>Remember, your preview provider can contain several devices and they’ll display one above the other. This means you can have both portrait and landscape visible at the same time:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView_Previews</span><span class="token punctuation">:</span> <span class="token class-name">PreviewProvider</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">static</span> <span class="token keyword">var</span> previews<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">ContentView</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token class-name">ContentView</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">previewInterfaceOrientation</span><span class="token punctuation">(</span><span class="token punctuation">.</span>landscapeLeft<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-preview-your-layout-in-portrait-or-landscape-2~dark@2x.png" alt="Xcode Previews in upright orientation and rotated left into Landscape orientation." tabindex="0" loading="lazy"><figcaption>Xcode Previews in upright orientation and rotated left into Landscape orientation.</figcaption></figure>`,9)),a("details",g,[t[0]||(t[0]=a("summary",null,"Similar solutions…",-1)),e(n,o(i({title:"How to preview your layout at different Dynamic Type sizes | SwiftUI by Example",desc:"How to preview your layout at different Dynamic Type sizes",link:"/hackingwithswift.com/swiftui/how-to-preview-your-layout-at-different-dynamic-type-sizes.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e(n,o(i({title:"How to preview your layout in light and dark mode | SwiftUI by Example",desc:"How to preview your layout in light and dark mode",link:"/hackingwithswift.com/swiftui/how-to-preview-your-layout-in-light-and-dark-mode.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e(n,o(i({title:"How to preview your layout in a navigation view | SwiftUI by Example",desc:"How to preview your layout in a navigation view",link:"/hackingwithswift.com/swiftui/how-to-preview-your-layout-in-a-navigation-view.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e(n,o(i({title:"How to preview your layout in different devices | SwiftUI by Example",desc:"How to preview your layout in different devices",link:"/hackingwithswift.com/swiftui/how-to-preview-your-layout-in-different-devices.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e(n,o(i({title:"How to create a custom layout using the Layout protocol | SwiftUI by Example",desc:"How to create a custom layout using the Layout protocol",link:"/hackingwithswift.com/swiftui/how-to-create-a-custom-layout-using-the-layout-protocol.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const k=r(w,[["render",v],["__file","how-to-preview-your-layout-in-portrait-or-landscape.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-preview-your-layout-in-portrait-or-landscape.html","title":"How to preview your layout in portrait or landscape","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to preview your layout in portrait or landscape","description":"Article(s) > How to preview your layout in portrait or landscape","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to preview your layout in portrait or landscape"},{"property":"og:description","content":"How to preview your layout in portrait or landscape"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-preview-your-layout-in-portrait-or-landscape.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-preview-your-layout-in-portrait-or-landscape.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to preview your layout in portrait or landscape"}],["meta",{"property":"og:description","content":"Article(s) > How to preview your layout in portrait or landscape"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-preview-your-layout-in-portrait-or-landscape-1~dark@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to preview your layout in portrait or landscape\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-preview-your-layout-in-portrait-or-landscape-1~dark@2x.png\\",\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-preview-your-layout-in-portrait-or-landscape-2~dark@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.78,"words":534},"filePathRelative":"hackingwithswift.com/swiftui/how-to-preview-your-layout-in-portrait-or-landscape.md","excerpt":"\\n"}');export{k as comp,b as data};