import{_ as m}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as k,am as a,as as d,ao as s,at as e,au as i,al as c,an as l,aq as o,ar as w}from"./app-CpYYKbnj.js";const v={},f={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"},b={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-start-an-animation-immediately-after-a-view-appears-1.zip",target:"_blank",rel:"noopener noreferrer"},g={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-start-an-animation-immediately-after-a-view-appears-2.zip",target:"_blank",rel:"noopener noreferrer"},y={class:"hint-container details"};function x(r,n){const t=o("VPCard"),p=o("FontIcon"),u=o("VidStack");return w(),k("div",null,[a("h1",f,[a("a",h,[a("span",null,d(r.$frontmatter.title)+" 관련",1)])]),s(t,e(i({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[3]||(n[3]=a("nav",{class:"table-of-contents"},[a("ul")],-1)),n[4]||(n[4]=a("hr",null,null,-1)),s(t,e(i({title:"How to start an animation immediately after a view appears | SwiftUI by Example",desc:"How to start an animation immediately after a view appears",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-start-an-animation-immediately-after-a-view-appears",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[5]||(n[5]=c(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>If you want a SwiftUI view to start animating as soon as it appears, you should use the <code>nAppear()</code> modifier to attach an animation. I’ll show you the basic code first, then show you two extensions I use to make this process easier.</p><p>First, the simple version – this creates a circle that scales up and down forever:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">var</span> scale <span class="token operator">=</span> <span class="token number">1.0</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">scaleEffect</span><span class="token punctuation">(</span>scale<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span>onAppear <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">let</span> baseAnimation <span class="token operator">=</span> <span class="token class-name">Animation</span><span class="token punctuation">.</span><span class="token function">easeInOut</span><span class="token punctuation">(</span>duration<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token keyword">let</span> repeated <span class="token operator">=</span> baseAnimation<span class="token punctuation">.</span><span class="token function">repeatForever</span><span class="token punctuation">(</span>autoreverses<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">                <span class="token function">withAnimation</span><span class="token punctuation">(</span>repeated<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    scale <span class="token operator">=</span> <span class="token number">0.5</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),a("blockquote",null,[a("p",null,[a("a",b,[s(p,{icon:"fas fa-file-zipper"}),n[0]||(n[0]=l("Download this as an Xcode project"))])])]),s(u,{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-start-an-animation-immediately-after-a-view-appears-1~dark.mp4"}),n[6]||(n[6]=c(`<p>If you intend to add initial animations frequently, it’s a smart idea to add some extensions to the <code>View</code> protocol to make it easier.</p><p>To demonstrate this, the two extensions below add <code>animate()</code> and <code>animateForever()</code> modifiers that let you customize the animation you want and also wrap up the whole behavior neatly:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token comment">// Create an immediate animation.</span></span>
<span class="line"><span class="token keyword">extension</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">animate</span><span class="token punctuation">(</span>using animation<span class="token punctuation">:</span> <span class="token class-name">Animation</span> <span class="token operator">=</span> <span class="token punctuation">.</span><span class="token function">easeInOut</span><span class="token punctuation">(</span>duration<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token omit keyword">_</span> action<span class="token punctuation">:</span> <span class="token attribute atrule">@escaping</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Void</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        onAppear <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">withAnimation</span><span class="token punctuation">(</span>animation<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token function">action</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Create an immediate, looping animation</span></span>
<span class="line"><span class="token keyword">extension</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">animateForever</span><span class="token punctuation">(</span>using animation<span class="token punctuation">:</span> <span class="token class-name">Animation</span> <span class="token operator">=</span> <span class="token punctuation">.</span><span class="token function">easeInOut</span><span class="token punctuation">(</span>duration<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> autoreverses<span class="token punctuation">:</span> <span class="token class-name">Bool</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token omit keyword">_</span> action<span class="token punctuation">:</span> <span class="token attribute atrule">@escaping</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Void</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> repeated <span class="token operator">=</span> animation<span class="token punctuation">.</span><span class="token function">repeatForever</span><span class="token punctuation">(</span>autoreverses<span class="token punctuation">:</span> autoreverses<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">return</span> onAppear <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">withAnimation</span><span class="token punctuation">(</span>repeated<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token function">action</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Try out our extensions with the scaling circle.</span></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">var</span> scale <span class="token operator">=</span> <span class="token number">1.0</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">scaleEffect</span><span class="token punctuation">(</span>scale<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">animateForever</span><span class="token punctuation">(</span>autoreverses<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> scale <span class="token operator">=</span> <span class="token number">0.5</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),a("blockquote",null,[a("p",null,[a("a",g,[s(p,{icon:"fas fa-file-zipper"}),n[1]||(n[1]=l("Download this as an Xcode project"))])])]),a("details",y,[n[2]||(n[2]=a("summary",null,"Similar solutions…",-1)),s(t,e(i({title:"How to make a ScrollView start at the bottom | SwiftUI by Example",desc:"How to make a ScrollView start at the bottom",link:"/hackingwithswift.com/swiftui/how-to-make-a-scrollview-start-at-the-bottom.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(i({title:"SwiftUI tips and tricks | SwiftUI by Example",desc:"SwiftUI tips and tricks",link:"/hackingwithswift.com/swiftui/swiftui-tips-and-tricks.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(i({title:"How to follow this quick start guide | SwiftUI by Example",desc:"How to follow this quick start guide",link:"/hackingwithswift.com/swiftui/how-to-follow-this-quick-start-guide.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(i({title:"How to create an explicit animation | SwiftUI by Example",desc:"How to create an explicit animation",link:"/hackingwithswift.com/swiftui/how-to-create-an-explicit-animation.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(i({title:"How to create a spring animation | SwiftUI by Example",desc:"How to create a spring animation",link:"/hackingwithswift.com/swiftui/how-to-create-a-spring-animation.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const S=m(v,[["render",x],["__file","how-to-start-an-animation-immediately-after-a-view-appears.html.vue"]]),I=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-start-an-animation-immediately-after-a-view-appears.html","title":"How to start an animation immediately after a view appears","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to start an animation immediately after a view appears","description":"Article(s) > How to start an animation immediately after a view appears","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to start an animation immediately after a view appears"},{"property":"og:description","content":"How to start an animation immediately after a view appears"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-start-an-animation-immediately-after-a-view-appears.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-start-an-animation-immediately-after-a-view-appears.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to start an animation immediately after a view appears"}],["meta",{"property":"og:description","content":"Article(s) > How to start an animation immediately after a view appears"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to start an animation immediately after a view appears\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.18,"words":654},"filePathRelative":"hackingwithswift.com/swiftui/how-to-start-an-animation-immediately-after-a-view-appears.md","excerpt":"\\n"}');export{S as comp,I as data};