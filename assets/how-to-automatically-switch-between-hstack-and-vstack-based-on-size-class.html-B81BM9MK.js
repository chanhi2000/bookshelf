import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as s,as as d,ao as n,at as e,au as o,al as i,an as k,aq as c,ar as w}from"./app-CpYYKbnj.js";const h={},m={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},b={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-automatically-switch-between-hstack-and-vstack-based-on-size-class-1.zip",target:"_blank",rel:"noopener noreferrer"},v={class:"hint-container details"};function f(l,a){const t=c("VPCard"),p=c("FontIcon");return w(),u("div",null,[s("h1",m,[s("a",g,[s("span",null,d(l.$frontmatter.title)+" 관련",1)])]),n(t,e(o({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a[2]||(a[2]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),a[3]||(a[3]=s("hr",null,null,-1)),n(t,e(o({title:"How to automatically switch between HStack and VStack based on size class | SwiftUI by Example",desc:"How to automatically switch between HStack and VStack based on size class",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-automatically-switch-between-hstack-and-vstack-based-on-size-class",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a[4]||(a[4]=i(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>SwiftUI lets us monitor the current size class to decide how things should be laid out, for example switching from a <code>HStack</code> when space is plentiful to a <code>VStack</code> when space is restricted.</p><p>With a little thinking, we can write a new <code>AdaptiveStack</code> view that automatically switches between horizontal and vertical layouts for us. This makes creating great layouts on iPad simpler, because our layouts will automatically adjust to split view and slipover scenarios.</p><p>Here&#39;s how it looks:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">AdaptiveStack</span><span class="token operator">&lt;</span><span class="token class-name">Content</span><span class="token punctuation">:</span> <span class="token class-name">View</span><span class="token operator">&gt;</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@Environment</span><span class="token punctuation">(</span><span class="token punctuation">\\</span><span class="token punctuation">.</span>horizontalSizeClass<span class="token punctuation">)</span> <span class="token keyword">var</span> sizeClass</span>
<span class="line">    <span class="token keyword">let</span> horizontalAlignment<span class="token punctuation">:</span> <span class="token class-name">HorizontalAlignment</span></span>
<span class="line">    <span class="token keyword">let</span> verticalAlignment<span class="token punctuation">:</span> <span class="token class-name">VerticalAlignment</span></span>
<span class="line">    <span class="token keyword">let</span> spacing<span class="token punctuation">:</span> <span class="token class-name">CGFloat</span><span class="token operator">?</span></span>
<span class="line">    <span class="token keyword">let</span> content<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Content</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">init</span><span class="token punctuation">(</span>horizontalAlignment<span class="token punctuation">:</span> <span class="token class-name">HorizontalAlignment</span> <span class="token operator">=</span> <span class="token punctuation">.</span>center<span class="token punctuation">,</span> verticalAlignment<span class="token punctuation">:</span> <span class="token class-name">VerticalAlignment</span> <span class="token operator">=</span> <span class="token punctuation">.</span>center<span class="token punctuation">,</span> spacing<span class="token punctuation">:</span> <span class="token class-name">CGFloat</span><span class="token operator">?</span> <span class="token operator">=</span> <span class="token nil constant">nil</span><span class="token punctuation">,</span> <span class="token attribute atrule">@ViewBuilder</span> content<span class="token punctuation">:</span> <span class="token attribute atrule">@escaping</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Content</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>horizontalAlignment <span class="token operator">=</span> horizontalAlignment</span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>verticalAlignment <span class="token operator">=</span> verticalAlignment</span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>spacing <span class="token operator">=</span> spacing</span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>content <span class="token operator">=</span> content</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Group</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">if</span> sizeClass <span class="token operator">==</span> <span class="token punctuation">.</span>compact <span class="token punctuation">{</span></span>
<span class="line">                <span class="token class-name">VStack</span><span class="token punctuation">(</span>alignment<span class="token punctuation">:</span> horizontalAlignment<span class="token punctuation">,</span> spacing<span class="token punctuation">:</span> spacing<span class="token punctuation">,</span> content<span class="token punctuation">:</span> content<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token class-name">HStack</span><span class="token punctuation">(</span>alignment<span class="token punctuation">:</span> verticalAlignment<span class="token punctuation">,</span> spacing<span class="token punctuation">:</span> spacing<span class="token punctuation">,</span> content<span class="token punctuation">:</span> content<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">AdaptiveStack</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Horizontal when there&#39;s lots of space&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;but&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Vertical when space is restricted&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)),s("blockquote",null,[s("p",null,[s("a",b,[n(p,{icon:"fas fa-file-zipper"}),a[0]||(a[0]=k("Download this as an Xcode project"))])])]),a[5]||(a[5]=i('<figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-automatically-switch-between-hstack-and-vstack-based-on-size-class-1~dark.png" alt="An iPad showing two lines of text side-by-side in an app that spans the right two thirds of the screen. Another iPad showing two lines stacked vertically in an app that spans only the right third of the screen" tabindex="0" loading="lazy"><figcaption>An iPad showing two lines of text side-by-side in an app that spans the right two thirds of the screen. Another iPad showing two lines stacked vertically in an app that spans only the right third of the screen</figcaption></figure><p>To try it out, run the app in an iPad simulator, then try different sizes of split view – you&#39;ll see <code>ContentView</code> automatically switch to a <code>VStack</code> when space runs low.</p><p>Now to explain how the custom view works:</p><ul><li>It monitors the <code>horizontalSizeClass</code> environment key, so that it will be updated every time that size class changes.</li><li>We&#39;ve given it parameters to store horizontal and vertical alignment individually, so you can control exactly how your layout should adapt.</li><li>There&#39;s an optional <code>CGFloat</code> for spacing, because that&#39;s what <code>VStack</code> and <code>HStack</code> work with. If you wanted even more control you could add <code>horizontalSpacing</code> and <code>verticalSpacing</code> properties.</li><li>The <code>content</code> property is a function that accepts no parameters and returns some sort of content, which is the view builder end users will rely on to create their layouts.</li><li>Our initializer stashes them all away for later.</li><li>Inside the <code>body</code> property we can read the horizontal size class, then wrap a call to <code>content()</code> in either a <code>VStack</code> or <code>HStack</code>.</li></ul><p>And that&#39;s it! The actual code isn&#39;t as hard you might imagine, but it gives us some really helpful flexibility.</p>',5)),s("details",v,[a[1]||(a[1]=s("summary",null,"Similar solutions…",-1)),n(t,e(o({title:"How to dynamically change between VStack and HStack | SwiftUI by Example",desc:"How to dynamically change between VStack and HStack",link:"/hackingwithswift.com/swiftui/how-to-dynamically-change-between-vstack-and-hstack.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(t,e(o({title:"How to create stacks using VStack and HStack | SwiftUI by Example",desc:"How to create stacks using VStack and HStack",link:"/hackingwithswift.com/swiftui/how-to-create-stacks-using-vstack-and-hstack.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(t,e(o({title:"How to dynamically adjust the appearance of a view based on its size and location | SwiftUI by Example",desc:"How to dynamically adjust the appearance of a view based on its size and location",link:"/hackingwithswift.com/swiftui/how-to-dynamically-adjust-the-appearance-of-a-view-based-on-its-size-and-location.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(t,e(o({title:"How to create a document-based app using FileDocument and DocumentGroup | SwiftUI by Example",desc:"How to create a document-based app using FileDocument and DocumentGroup",link:"/hackingwithswift.com/swiftui/how-to-create-a-document-based-app-using-filedocument-and-documentgroup.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(t,e(o({title:"How to create a toggle switch | SwiftUI by Example",desc:"How to create a toggle switch",link:"/hackingwithswift.com/swiftui/how-to-create-a-toggle-switch.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const z=r(h,[["render",f],["__file","how-to-automatically-switch-between-hstack-and-vstack-based-on-size-class.html.vue"]]),H=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-automatically-switch-between-hstack-and-vstack-based-on-size-class.html","title":"How to automatically switch between HStack and VStack based on size class","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to automatically switch between HStack and VStack based on size class","description":"Article(s) > How to automatically switch between HStack and VStack based on size class","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to automatically switch between HStack and VStack based on size class"},{"property":"og:description","content":"How to automatically switch between HStack and VStack based on size class"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-automatically-switch-between-hstack-and-vstack-based-on-size-class.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-automatically-switch-between-hstack-and-vstack-based-on-size-class.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to automatically switch between HStack and VStack based on size class"}],["meta",{"property":"og:description","content":"Article(s) > How to automatically switch between HStack and VStack based on size class"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-automatically-switch-between-hstack-and-vstack-based-on-size-class-1~dark.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to automatically switch between HStack and VStack based on size class\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-automatically-switch-between-hstack-and-vstack-based-on-size-class-1~dark.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.86,"words":857},"filePathRelative":"hackingwithswift.com/swiftui/how-to-automatically-switch-between-hstack-and-vstack-based-on-size-class.md","excerpt":"\\n"}');export{z as comp,H as data};