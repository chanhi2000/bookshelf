import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as i,as as d,ao as s,at as t,au as e,an as o,al as m,ak as g,aq as l,ar as k}from"./app-CpYYKbnj.js";const h={},w={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},b={href:"https://github.com/apple/swift-evolution/blob/main/proposals/0299-extend-generic-static-member-lookup.md",target:"_blank",rel:"noopener noreferrer"},v={class:"hint-container details"},y={href:"https://hackingwithswift.com/files/playgrounds/swift/playground-5-4-to-5-5.playground.zip",target:"_blank",rel:"noopener noreferrer"};function x(p,n){const a=l("VPCard"),c=l("FontIcon");return k(),u("div",null,[i("h1",w,[i("a",f,[i("span",null,d(p.$frontmatter.title)+" 관련",1)])]),s(a,t(e({title:"HACKING WITH SWIFT",desc:"What's new in Swift?",link:"/hackingwithswift.com/swift/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[6]||(n[6]=i("nav",{class:"table-of-contents"},[i("ul")],-1)),n[7]||(n[7]=i("hr",null,null,-1)),s(a,t(e({title:"Extending static member lookup in generic contexts | Changes in Swift 5.5",desc:"Extending static member lookup in generic contexts",link:"https://hackingwithswift.com/swift/5.5/static-member-generic",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[8]||(n[8]=i("blockquote",null,[i("p",null,"Available from Swift 5.5")],-1)),i("p",null,[i("a",b,[n[0]||(n[0]=o("SE-0299 (")),s(c,{icon:"iconfont icon-github"}),n[1]||(n[1]=i("code",null,"apple/swift-evolution",-1)),n[2]||(n[2]=o(")"))]),n[3]||(n[3]=o(" allows Swift to perform static member lookup for members of protocols in generic functions, which sounds obscure but actually fixes a small but important legibility problem that hit SwiftUI particularly hard."))]),n[9]||(n[9]=m(`<p>At this time SwiftUI hasn’t been updated to support this change, but if everything goes to plan we can stop writing this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token class-name">SwiftUI</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name">Toggle</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Example&quot;</span></span><span class="token punctuation">,</span> isOn<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token function">constant</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">toggleStyle</span><span class="token punctuation">(</span><span class="token class-name">SwitchToggleStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>And instead write something like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">Toggle</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Example&quot;</span></span><span class="token punctuation">,</span> isOn<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token function">constant</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">toggleStyle</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token keyword">switch</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>This was possible in early SwiftUI betas because Apple had put extensive workarounds in place, but these were withdrawn before release.</p><p>To see what’s actually changing here, imagine a <code>Theme</code> protocol with several structs conforming to it:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">protocol</span> <span class="token class-name">Theme</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">LightTheme</span><span class="token punctuation">:</span> <span class="token class-name">Theme</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">DarkTheme</span><span class="token punctuation">:</span> <span class="token class-name">Theme</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">RainbowTheme</span><span class="token punctuation">:</span> <span class="token class-name">Theme</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We could also define a <code>Screen</code> protocol that is able to have a <code>theme()</code> method called on it with some sort of theme:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">protocol</span> <span class="token class-name">Screen</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">extension</span> <span class="token class-name">Screen</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">theme</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token punctuation">:</span> <span class="token class-name">Theme</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> style<span class="token punctuation">:</span> <span class="token class-name">T</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Screen</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Activating new theme!&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token keyword">self</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>And now we could create an instance of a screen:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">HomeScreen</span><span class="token punctuation">:</span> <span class="token class-name">Screen</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Following older SwiftUI code, we could enable a light theme on that screen by specifying <code>LightTheme()</code>:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> lightScreen <span class="token operator">=</span> <span class="token class-name">HomeScreen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">theme</span><span class="token punctuation">(</span><span class="token class-name">LightTheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>If we wanted to make that easier to access, we could try adding a static <code>light</code> property to our <code>Theme</code> protocol like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">extension</span> <span class="token class-name">Theme</span> <span class="token keyword">where</span> <span class="token keyword">Self</span> <span class="token operator">==</span> <span class="token class-name">LightTheme</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">static</span> <span class="token keyword">var</span> light<span class="token punctuation">:</span> <span class="token class-name">LightTheme</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token keyword">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>However, <em>using</em> that with the <code>theme()</code> method of our generic protocol was what caused the problem: before Swift 5.5 it was not possible and you had to use <code>LightTheme()</code> every time. However, in Swift 5.5 or later this is now possible:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> lightTheme <span class="token operator">=</span> <span class="token class-name">HomeScreen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">theme</span><span class="token punctuation">(</span><span class="token punctuation">.</span>light<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,17)),i("details",v,[n[5]||(n[5]=i("summary",null,"Other Changes in Swift 5.5",-1)),s(a,t(e({title:"Async await | Changes in Swift 5.5",desc:"Async await",link:"/hackingwithswift.com/swift/5.5/async-await.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(a,t(e({title:"Async sequences | Changes in Swift 5.5",desc:"Async sequences",link:"/hackingwithswift.com/swift/5.5/async-sequences.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(a,t(e({title:"Effectful read-only properties | Changes in Swift 5.5",desc:"Effectful read-only properties",link:"/hackingwithswift.com/swift/5.5/effectful-read-only-properties.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(a,t(e({title:"Structured concurrency | Changes in Swift 5.5",desc:"Structured concurrency",link:"/hackingwithswift.com/swift/5.5/structured-concurrency.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(a,t(e({title:"async let bindings | Changes in Swift 5.5",desc:"async let bindings",link:"/hackingwithswift.com/swift/5.5/async-let-bindings.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(a,t(e({title:"Continuations for interfacing async tasks with synchronous code | Changes in Swift 5.5",desc:"Continuations for interfacing async tasks with synchronous code",link:"/hackingwithswift.com/swift/5.5/continuations.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(a,t(e({title:"Actors | Changes in Swift 5.5",desc:"Actors",link:"/hackingwithswift.com/swift/5.5/actors.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(a,t(e({title:"Global actors | Changes in Swift 5.5",desc:"Global actors",link:"/hackingwithswift.com/swift/5.5/global-actors.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(a,t(e({title:"Sendable and @Sendable closures | Changes in Swift 5.5",desc:"Sendable and @Sendable closures",link:"/hackingwithswift.com/swift/5.5/sendable.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(a,t(e({title:"if for postfix member expressions | Changes in Swift 5.5",desc:"if for postfix member expressions",link:"/hackingwithswift.com/swift/5.5/postfix-if.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(a,t(e({title:"Interchangeable use of CGFloat and Double types | Changes in Swift 5.5",desc:"Interchangeable use of CGFloat and Double types",link:"/hackingwithswift.com/swift/5.5/interchangeable-cgfloat-double.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(a,t(e({title:"Codable synthesis for enums with associated values | Changes in Swift 5.5",desc:"Codable synthesis for enums with associated values",link:"/hackingwithswift.com/swift/5.5/codable-enums.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(a,t(e({title:"lazy now works in local contexts | Changes in Swift 5.5",desc:"lazy now works in local contexts",link:"/hackingwithswift.com/swift/5.5/local-lazy.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(a,t(e({title:"Extending property wrappers to function and closure parameters | Changes in Swift 5.5",desc:"Extending property wrappers to function and closure parameters",link:"/hackingwithswift.com/swift/5.5/property-wrapper-function-parameters.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),g(` 
\`\`\`component VPCard
{
  "title": "Extending static member lookup in generic contexts | Changes in Swift 5.5",
  "desc": "Extending static member lookup in generic contexts",
  "link": "/hackingwithswift.com/swift/5.5/static-member-generic.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
\`\`\`
`),i("p",null,[i("a",y,[s(c,{icon:"fas fa-file-zipper"}),n[4]||(n[4]=o("Download Swift 5.5 playground"))])])])])}const T=r(h,[["render",x],["__file","static-member-generic.html.vue"]]),E=JSON.parse('{"path":"/hackingwithswift.com/swift/5.5/static-member-generic.html","title":"Extending static member lookup in generic contexts","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Extending static member lookup in generic contexts","description":"Article(s) > Extending static member lookup in generic contexts","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","swift","swift-5.5"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Extending static member lookup in generic contexts"},{"property":"og:description","content":"Extending static member lookup in generic contexts"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.5/static-member-generic.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.5/static-member-generic.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Extending static member lookup in generic contexts"}],["meta",{"property":"og:description","content":"Article(s) > Extending static member lookup in generic contexts"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.5"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Extending static member lookup in generic contexts\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"next":"/hackingwithswift.com/swift/5.4/improved-implicit-member-syntax.md","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.02,"words":906},"filePathRelative":"hackingwithswift.com/swift/5.5/static-member-generic.md","excerpt":"\\n"}');export{T as comp,E as data};