import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as r,am as s,as as u,ao as t,at as e,au as i,al as d,aq as o,ar as m}from"./app-CpYYKbnj.js";const w={},h={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"},g={class:"hint-container details"};function f(c,n){const a=o("VPCard"),p=o("VidStack");return m(),r("div",null,[s("h1",h,[s("a",k,[s("span",null,u(c.$frontmatter.title)+" 관련",1)])]),t(a,e(i({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[1]||(n[1]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[2]||(n[2]=s("hr",null,null,-1)),t(a,e(i({title:"How to reduce animations when requested | SwiftUI by Example",desc:"How to reduce animations when requested",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-reduce-animations-when-requested",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[3]||(n[3]=d(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>SwiftUI’s <code>withAnimation()</code> function makes it easy to perform custom animations on our views, but it doesn’t respect the “Reduce Motion” accessibility setting and so might make your apps hard to use for many people.</p><p>If you want to use <code>withAnimation()</code> while also honoring that setting, I recommend you add a global function like this one:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">withOptionalAnimation</span><span class="token operator">&lt;</span><span class="token class-name">Result</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> animation<span class="token punctuation">:</span> <span class="token class-name">Animation</span><span class="token operator">?</span> <span class="token operator">=</span> <span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">,</span> <span class="token omit keyword">_</span> body<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token operator">-&gt;</span> <span class="token class-name">Result</span><span class="token punctuation">)</span> <span class="token keyword">rethrows</span> <span class="token operator">-&gt;</span> <span class="token class-name">Result</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token class-name">UIAccessibility</span><span class="token punctuation">.</span>isReduceMotionEnabled <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token keyword">try</span> <span class="token function">body</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token keyword">try</span> <span class="token function">withAnimation</span><span class="token punctuation">(</span>animation<span class="token punctuation">,</span> body<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That automatically checks whether Reduce Motion is enabled every time the animation is triggered, and disables it for users who have specifically requested less animation.</p><p>In case you were wondering, <code>withAnimation()</code> is also a global function – a function that sits outside of any other type – so this new withOptionalAnimation()\` function will behave the same.</p><p>So, you can use it wherever you would use <code>withAnimation()</code>, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> scale <span class="token operator">=</span> <span class="token number">1.0</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Hello, World!&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">scaleEffect</span><span class="token punctuation">(</span>scale<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span>onTapGesture <span class="token punctuation">{</span></span>
<span class="line">                withOptionalAnimation <span class="token punctuation">{</span></span>
<span class="line">                    scale <span class="token operator">*=</span> <span class="token number">1.5</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8)),t(p,{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-reduce-animations-when-requested-1~dark.mp4"}),s("details",g,[n[0]||(n[0]=s("summary",null,"Similar solutions…",-1)),t(a,e(i({title:"How to detect the Reduce Motion accessibility setting | SwiftUI by Example",desc:"How to detect the Reduce Motion accessibility setting",link:"/hackingwithswift.com/swiftui/how-to-detect-the-reduce-motion-accessibility-setting.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(a,e(i({title:"How to use decorative images to reduce screen reader clutter | SwiftUI by Example",desc:"How to use decorative images to reduce screen reader clutter",link:"/hackingwithswift.com/swiftui/how-to-use-decorative-images-to-reduce-screen-reader-clutter.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(a,e(i({title:"How to create basic animations | SwiftUI by Example",desc:"How to create basic animations",link:"/hackingwithswift.com/swiftui/how-to-create-basic-animations.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(a,e(i({title:"How to override animations with transactions | SwiftUI by Example",desc:"How to override animations with transactions",link:"/hackingwithswift.com/swiftui/how-to-override-animations-with-transactions.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(a,e(i({title:"How to create multi-step animations using phase animators | SwiftUI by Example",desc:"How to create multi-step animations using phase animators",link:"/hackingwithswift.com/swiftui/how-to-create-multi-step-animations-using-phase-animators.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const y=l(w,[["render",f],["__file","how-to-reduce-animations-when-requested.html.vue"]]),q=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-reduce-animations-when-requested.html","title":"How to reduce animations when requested","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to reduce animations when requested","description":"Article(s) > How to reduce animations when requested","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to reduce animations when requested"},{"property":"og:description","content":"How to reduce animations when requested"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-reduce-animations-when-requested.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-reduce-animations-when-requested.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to reduce animations when requested"}],["meta",{"property":"og:description","content":"Article(s) > How to reduce animations when requested"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to reduce animations when requested\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.72,"words":516},"filePathRelative":"hackingwithswift.com/swiftui/how-to-reduce-animations-when-requested.md","excerpt":"\\n"}');export{y as comp,q as data};