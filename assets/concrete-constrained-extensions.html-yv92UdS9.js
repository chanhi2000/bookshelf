import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as r,am as s,as as u,ao as a,at as e,au as o,al as d,ak as k,an as m,aq as p,ar as h}from"./app-CpYYKbnj.js";const w={},f={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},y={class:"hint-container details"},v={href:"https://hackingwithswift.com/files/playgrounds/swift/playground-3-0-to-3-1.playground.zip",target:"_blank",rel:"noopener noreferrer"};function b(i,n){const t=p("VPCard"),c=p("FontIcon");return h(),r("div",null,[s("h1",f,[s("a",g,[s("span",null,u(i.$frontmatter.title)+" 관련",1)])]),a(t,e(o({title:"HACKING WITH SWIFT",desc:"What's new in Swift?",link:"/hackingwithswift.com/swift/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[2]||(n[2]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[3]||(n[3]=s("hr",null,null,-1)),a(t,e(o({title:"Concrete constrained extensions | Changes in Swift 3.1",desc:"Concrete constrained extensions",link:"https://hackingwithswift.com/swift/3.1/concrete-constrained-extensions",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[4]||(n[4]=d(`<blockquote><p>Available from Swift 3.1</p></blockquote><p>Swift lets us extend types using constraints, which is a powerful and expressive way to add functionality. To demonstrate this, let&#39;s look at a worked example in Swift 3.0 that modifies collections to do something trivial:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">extension</span> <span class="token class-name">Collection</span> <span class="token keyword">where</span> <span class="token class-name">Iterator</span><span class="token punctuation">.</span><span class="token class-name">Element</span><span class="token punctuation">:</span> <span class="token class-name">Comparable</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">lessThanFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">[</span><span class="token class-name">Iterator</span><span class="token punctuation">.</span><span class="token class-name">Element</span><span class="token punctuation">]</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">guard</span> <span class="token keyword">let</span> first <span class="token operator">=</span> <span class="token keyword">self</span><span class="token punctuation">.</span>first <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token keyword">self</span><span class="token punctuation">.</span>filter <span class="token punctuation">{</span> <span class="token short-argument">$0</span> <span class="token operator">&lt;</span> first <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">let</span> items <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">110</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">lessThanFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That adds a new method called <code>lessThanFirst()</code>, which returns all items in a collection that are less than the first item. So, using it with the array <code>[5, 6, 10, 4, 110, 3]</code> will return <code>[4, 3]</code>.</p><p>That code extends a protocol (<code>Collection</code>) only where it matches a constraint: elements in the collection must conform to another protocol, <code>Comparable</code>. This alone is powerful stuff, but let&#39;s take it back a step: what if we wanted something a bit more specific? Swift 3.0 lets us extend a concrete type rather than the protocol <code>Collection</code>, so instead we could write this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">extension</span> <span class="token class-name">Array</span> <span class="token keyword">where</span> <span class="token class-name">Element</span><span class="token punctuation">:</span> <span class="token class-name">Comparable</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">lessThanFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">[</span><span class="token class-name">Element</span><span class="token punctuation">]</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">guard</span> <span class="token keyword">let</span> first <span class="token operator">=</span> <span class="token keyword">self</span><span class="token punctuation">.</span>first <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token keyword">self</span><span class="token punctuation">.</span>filter <span class="token punctuation">{</span> <span class="token short-argument">$0</span> <span class="token operator">&lt;</span> first <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">let</span> items <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">110</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">lessThanFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That extends a concrete type (only <code>Array</code>) but still using a protocol for its constraint. What if we wanted to go even more specific – extend a concrete type with a concrete constraint, for example only arrays that contains integers? Well, it turns out that isn&#39;t possible in Swift 3.0, which usually strikes people as odd: if Swift 3.0 can handle extending protocols with another protocol as a constraint, then surely extending a specific type with a specific constraint should be a cinch?</p><p>Fortunately, this discrepancy has been removed in Swift 3.1, which means we can now write code like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">extension</span> <span class="token class-name">Array</span> <span class="token keyword">where</span> <span class="token class-name">Element</span> <span class="token operator">==</span> <span class="token class-name">Int</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">lessThanFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">[</span><span class="token class-name">Int</span><span class="token punctuation">]</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">guard</span> <span class="token keyword">let</span> first <span class="token operator">=</span> <span class="token keyword">self</span><span class="token punctuation">.</span>first <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token keyword">self</span><span class="token punctuation">.</span>filter <span class="token punctuation">{</span> <span class="token short-argument">$0</span> <span class="token operator">&lt;</span> first <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">let</span> items <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">110</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">lessThanFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span>items<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That extends a concrete type (only <code>Array</code>) and uses a concrete constraint (only where the elements are <code>Int</code>).</p><p>Now, obviously we&#39;re using a trivial example here – in your own code this is going to be significantly more useful when you want to extend arrays containing your own custom structs.</p>`,11)),s("details",y,[n[1]||(n[1]=s("summary",null,"Other Changes in Swift 3.1",-1)),k(` 
\`\`\`component VPCard
{
  "title": "Concrete constrained extensions | Changes in Swift 3.1",
  "desc": "Concrete constrained extensions",
  "link": "/hackingwithswift.com/swift/3.1/concrete-constrained-extensions.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
\`\`\`
`),a(t,e(o({title:"Generics with nested types | Changes in Swift 3.1",desc:"Generics with nested types",link:"/hackingwithswift.com/swift/3.1/generic-nested-types.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"All function parameters have labels unless you request otherwise | Changes in Swift 3.1",desc:"Sequences get prefix(while:) and drop(while:) methods",link:"/hackingwithswift.com/swift/3.1/prefix-drop.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s("p",null,[s("a",v,[a(c,{icon:"fas fa-file-zipper"}),n[0]||(n[0]=m("Download Swift 3.1 playground"))])])])])}const S=l(w,[["render",b],["__file","concrete-constrained-extensions.html.vue"]]),T=JSON.parse('{"path":"/hackingwithswift.com/swift/3.1/concrete-constrained-extensions.html","title":"Concrete constrained extensions","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Concrete constrained extensions","description":"Article(s) > Concrete constrained extensions","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","swift","swift-3.1"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Concrete constrained extensions"},{"property":"og:description","content":"Concrete constrained extensions"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/3.1/concrete-constrained-extensions.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/3.1/concrete-constrained-extensions.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Concrete constrained extensions"}],["meta",{"property":"og:description","content":"Article(s) > Concrete constrained extensions"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-3.1"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Concrete constrained extensions\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"prev":"/hackingwithswift.com/swift/4.0/one-sided-ranges.md","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.03,"words":610},"filePathRelative":"hackingwithswift.com/swift/3.1/concrete-constrained-extensions.md","excerpt":"\\n"}');export{S as comp,T as data};