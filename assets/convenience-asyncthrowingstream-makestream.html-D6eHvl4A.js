import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as s,as as m,ao as a,at as e,au as o,an as i,al as k,ak as d,aq as c,ar as h}from"./app-CpYYKbnj.js";const g={},w={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},v={href:"https://github.com/apple/swift-evolution/blob/main/proposals/0388-async-stream-factory.md",target:"_blank",rel:"noopener noreferrer"},b={class:"hint-container details"},y={href:"https://hackingwithswift.com/files/playgrounds/swift/playground-5-8-to-5-9.playground.zip",target:"_blank",rel:"noopener noreferrer"};function S(l,n){const t=c("VPCard"),p=c("FontIcon");return h(),u("div",null,[s("h1",w,[s("a",f,[s("span",null,m(l.$frontmatter.title)+" 관련",1)])]),a(t,e(o({title:"HACKING WITH SWIFT",desc:"What's new in Swift?",link:"/hackingwithswift.com/swift/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[12]||(n[12]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[13]||(n[13]=s("hr",null,null,-1)),a(t,e(o({title:"Convenience Async[Throwing]Stream.makeStream methods | Changes in Swift 5.9",desc:"Convenience Async[Throwing]Stream.makeStream methods",link:"https://hackingwithswift.com/swift/5.9/convenience-asyncthrowingstream-makestream",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[14]||(n[14]=s("blockquote",null,[s("p",null,"Available from Swift 5.9")],-1)),s("p",null,[s("a",v,[n[0]||(n[0]=i("SE-0388 (")),a(p,{icon:"iconfont icon-github"}),n[1]||(n[1]=s("code",null,"apple/swift-evolution",-1)),n[2]||(n[2]=i(")"))]),n[3]||(n[3]=i(" adds a new ")),n[4]||(n[4]=s("code",null,"makeStream()",-1)),n[5]||(n[5]=i(" method to both ")),n[6]||(n[6]=s("code",null,"AsyncStream",-1)),n[7]||(n[7]=i(" and ")),n[8]||(n[8]=s("code",null,"AsyncThrowingStream",-1)),n[9]||(n[9]=i(" that sends back both the stream itself alongside its continuation."))]),n[15]||(n[15]=k(`<p>So, rather than writing code like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">var</span> _continuation<span class="token punctuation">:</span> <span class="token class-name">AsyncStream</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token operator">&gt;</span><span class="token punctuation">.</span><span class="token class-name">Continuation</span><span class="token operator">!</span></span>
<span class="line"><span class="token keyword">let</span> stream <span class="token operator">=</span> <span class="token class-name">AsyncStream</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span> _continuation <span class="token operator">=</span> <span class="token short-argument">$0</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">let</span> continuation <span class="token operator">=</span> _continuation<span class="token operator">!</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We can now get both at the same time:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> <span class="token punctuation">(</span>newStream<span class="token punctuation">,</span> newContinuation<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token class-name">AsyncStream</span><span class="token punctuation">.</span><span class="token function">makeStream</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>This is going to be particularly welcome in places where you need to access the continuation outside of the current context, such as in a different method. For example, previously we might have written a simple number generator like this one, which needs to store the continuation as its own property in order to be able to call it from the <code>queueWork()</code> method:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">OldNumberGenerator</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">var</span> continuation<span class="token punctuation">:</span> <span class="token class-name">AsyncStream</span><span class="token operator">&lt;</span><span class="token class-name">Int</span><span class="token operator">&gt;</span><span class="token punctuation">.</span><span class="token class-name">Continuation</span><span class="token operator">!</span></span>
<span class="line">    <span class="token keyword">var</span> stream<span class="token punctuation">:</span> <span class="token class-name">AsyncStream</span><span class="token operator">&lt;</span><span class="token class-name">Int</span><span class="token operator">&gt;!</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        stream <span class="token operator">=</span> <span class="token class-name">AsyncStream</span><span class="token punctuation">(</span><span class="token class-name">Int</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> continuation <span class="token keyword">in</span></span>
<span class="line">            <span class="token keyword">self</span><span class="token punctuation">.</span>continuation <span class="token operator">=</span> continuation</span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">queueWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Task</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token number">1</span><span class="token operator">...</span><span class="token number">10</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token class-name">Task</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token keyword">for</span><span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token function">seconds</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">                continuation<span class="token punctuation">.</span><span class="token function">yield</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">            continuation<span class="token punctuation">.</span><span class="token function">finish</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>With the new <code>makeStream(of:)</code> method this code becomes much simpler:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">NewNumberGenerator</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> <span class="token punctuation">(</span>stream<span class="token punctuation">,</span> continuation<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token class-name">AsyncStream</span><span class="token punctuation">.</span><span class="token function">makeStream</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">queueWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Task</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token number">1</span><span class="token operator">...</span><span class="token number">10</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token class-name">Task</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token keyword">for</span><span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token function">seconds</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">                continuation<span class="token punctuation">.</span><span class="token function">yield</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">            continuation<span class="token punctuation">.</span><span class="token function">finish</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8)),s("details",b,[n[11]||(n[11]=s("summary",null,"Other Changes in Swift 5.9",-1)),a(t,e(o({title:"if and switch expressions | Changes in Swift 5.9",desc:"if and switch expressions",link:"/hackingwithswift.com/swift/5.9/if-switch-expressions.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"Value and Type Parameter Packs | Changes in Swift 5.9",desc:"Value and Type Parameter Packs",link:"/hackingwithswift.com/swift/5.9/variadic-generics.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"Macros | Changes in Swift 5.9",desc:"Macros",link:"/hackingwithswift.com/swift/5.9/macros.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"Noncopyable structs and enums | Changes in Swift 5.9",desc:"Noncopyable structs and enums",link:"/hackingwithswift.com/swift/5.9/noncopyable-structs-and-enums.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"consume operator to end the lifetime of a variable binding | Changes in Swift 5.9",desc:"consume operator to end the lifetime of a variable binding",link:"/hackingwithswift.com/swift/5.9/consume-operator.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),d(` 
\`\`\`component VPCard
{
  "title": "Convenience Async[Throwing]Stream.makeStream methods | Changes in Swift 5.9",
  "desc": "Convenience Async[Throwing]Stream.makeStream methods",
  "link": "/hackingwithswift.com/swift/5.9/convenience-asyncthrowingstream-makestream.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
\`\`\`
`),a(t,e(o({title:"Add sleep(for:) to Clock | Changes in Swift 5.9",desc:"Add sleep(for:) to Clock",link:"/hackingwithswift.com/swift/5.9/sleep-for-clock.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"Discarding task groups | Changes in Swift 5.9",desc:"Discarding task groups",link:"/hackingwithswift.com/swift/5.9/discarding-task-groups.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s("p",null,[s("a",y,[a(p,{icon:"fas fa-file-zipper"}),n[10]||(n[10]=i("Download Swift 5.9 playground"))])])])])}const T=r(g,[["render",S],["__file","convenience-asyncthrowingstream-makestream.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/swift/5.9/convenience-asyncthrowingstream-makestream.html","title":"Convenience Async[Throwing]Stream.makeStream methods","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Convenience Async[Throwing]Stream.makeStream methods","description":"Article(s) > Convenience Async[Throwing]Stream.makeStream methods","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","swift","swift-5.9"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Convenience Async[Throwing]Stream.makeStream methods"},{"property":"og:description","content":"Convenience Async[Throwing]Stream.makeStream methods"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.9/convenience-asyncthrowingstream-makestream.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.9/convenience-asyncthrowingstream-makestream.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Convenience Async[Throwing]Stream.makeStream methods"}],["meta",{"property":"og:description","content":"Article(s) > Convenience Async[Throwing]Stream.makeStream methods"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.9"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Convenience Async[Throwing]Stream.makeStream methods\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.98,"words":593},"filePathRelative":"hackingwithswift.com/swift/5.9/convenience-asyncthrowingstream-makestream.md","excerpt":"\\n"}');export{T as comp,x as data};