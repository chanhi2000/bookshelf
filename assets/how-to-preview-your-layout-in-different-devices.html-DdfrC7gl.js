import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as e,as as r,ao as a,at as s,au as i,al as l,aq as u,ar as d}from"./app-CpYYKbnj.js";const w={},f={id:"frontmatter-title-관련",tabindex:"-1"},v={class:"header-anchor",href:"#frontmatter-title-관련"},h={class:"hint-container details"};function m(o,n){const t=u("VPCard");return d(),c("div",null,[e("h1",f,[e("a",v,[e("span",null,r(o.$frontmatter.title)+" 관련",1)])]),a(t,s(i({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[1]||(n[1]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),n[2]||(n[2]=e("hr",null,null,-1)),a(t,s(i({title:"How to preview your layout in different devices | SwiftUI by Example",desc:"How to preview your layout in different devices",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-preview-your-layout-in-different-devices",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[3]||(n[3]=l(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>Xcode’s SwiftUI preview lets us show our designs in multiple screen sizes at the same time using the <code>.previewDevice()</code> modifier. This needs to be provided with the exact name of a device as seen in Xcode’s destination menu, e.g. “iPhone 14”.</p><p>For example, this shows a preview on the iPhone 14 Pro Max:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">ContentView</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">previewDevice</span><span class="token punctuation">(</span><span class="token class-name">PreviewDevice</span><span class="token punctuation">(</span>rawValue<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;iPhone 14 Pro Max&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>When using specific devices for previewing, you’re likely to find it useful to add in the <code>.previewDisplayName()</code> modifier, which lets you put a name under a device in the preview window.</p><p>For example, this creates two previews for two different devices, adding the name of each to make it clear what’s going on:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView_Previews</span><span class="token punctuation">:</span> <span class="token class-name">PreviewProvider</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">static</span> <span class="token keyword">var</span> previews<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">ContentView</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">previewDevice</span><span class="token punctuation">(</span><span class="token class-name">PreviewDevice</span><span class="token punctuation">(</span>rawValue<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;iPhone 14&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">previewDisplayName</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;iPhone 14&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token class-name">ContentView</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">previewDevice</span><span class="token punctuation">(</span><span class="token class-name">PreviewDevice</span><span class="token punctuation">(</span>rawValue<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;iPhone 14 Pro Max&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">previewDisplayName</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;iPhone 14 Pro Max&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-preview-your-layout-in-different-devices-1~dark@2x.png" alt="Xcode showing Previews on an iPhone 12 and an iPhone 12 Pro Max." tabindex="0" loading="lazy"><figcaption>Xcode showing Previews on an iPhone 12 and an iPhone 12 Pro Max.</figcaption></figure>`,8)),e("details",h,[n[0]||(n[0]=e("summary",null,"Similar solutions…",-1)),a(t,s(i({title:"How to preview your layout at different Dynamic Type sizes | SwiftUI by Example",desc:"How to preview your layout at different Dynamic Type sizes",link:"/hackingwithswift.com/swiftui/how-to-preview-your-layout-at-different-dynamic-type-sizes.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,s(i({title:"How to preview your layout in light and dark mode | SwiftUI by Example",desc:"How to preview your layout in light and dark mode",link:"/hackingwithswift.com/swiftui/how-to-preview-your-layout-in-light-and-dark-mode.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,s(i({title:"How to preview your layout in a navigation view | SwiftUI by Example",desc:"How to preview your layout in a navigation view",link:"/hackingwithswift.com/swiftui/how-to-preview-your-layout-in-a-navigation-view.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,s(i({title:"How to preview your layout in portrait or landscape | SwiftUI by Example",desc:"How to preview your layout in portrait or landscape",link:"/hackingwithswift.com/swiftui/how-to-preview-your-layout-in-portrait-or-landscape.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,s(i({title:"How to return different view types | SwiftUI by Example",desc:"How to return different view types",link:"/hackingwithswift.com/swiftui/how-to-return-different-view-types.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const y=p(w,[["render",m],["__file","how-to-preview-your-layout-in-different-devices.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-preview-your-layout-in-different-devices.html","title":"How to preview your layout in different devices","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to preview your layout in different devices","description":"Article(s) > How to preview your layout in different devices","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to preview your layout in different devices"},{"property":"og:description","content":"How to preview your layout in different devices"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-preview-your-layout-in-different-devices.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-preview-your-layout-in-different-devices.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to preview your layout in different devices"}],["meta",{"property":"og:description","content":"Article(s) > How to preview your layout in different devices"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-preview-your-layout-in-different-devices-1~dark@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to preview your layout in different devices\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-preview-your-layout-in-different-devices-1~dark@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.81,"words":543},"filePathRelative":"hackingwithswift.com/swiftui/how-to-preview-your-layout-in-different-devices.md","excerpt":"\\n"}');export{y as comp,b as data};