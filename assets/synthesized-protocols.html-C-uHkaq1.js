import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as d,am as a,as as u,ao as s,at as e,au as o,al as h,an as i,ak as m,aq as c,ar as g}from"./app-CpYYKbnj.js";const f={},k={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},y={href:"https://github.com/apple/swift-evolution/blob/master/proposals/0185-synthesize-equatable-hashable.md",target:"_blank",rel:"noopener noreferrer"},b={class:"hint-container details"},v={href:"https://hackingwithswift.com/files/playgrounds/swift/playground-4-0-to-4-1.playground.zip",target:"_blank",rel:"noopener noreferrer"};function S(p,n){const t=c("VPCard"),l=c("FontIcon");return g(),d("div",null,[a("h1",k,[a("a",w,[a("span",null,u(p.$frontmatter.title)+" 관련",1)])]),s(t,e(o({title:"HACKING WITH SWIFT",desc:"What's new in Swift?",link:"/hackingwithswift.com/swift/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[7]||(n[7]=a("nav",{class:"table-of-contents"},[a("ul")],-1)),n[8]||(n[8]=a("hr",null,null,-1)),s(t,e(o({title:"Synthesized Equatable and Hashable | Changes in Swift 4.1",desc:"Synthesized Equatable and Hashable",link:"https://hackingwithswift.com/swift/4.1/synthesized-protocols",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[9]||(n[9]=h(`<blockquote><p>Available from Swift 4.1</p></blockquote><p>The <code>Equatable</code> protocol allows Swift to compare one instance of a type against another. When we say <code>5 == 5</code>, Swift understands what that means because <code>Int</code> conforms to <code>Equatable</code>, which means it implements a function describing what <code>==</code> means for two instances of <code>Int</code>.</p><p>Implementing <code>Equatable</code> in our own value types allows them to work like Swift’s strings, arrays, numbers, and more, and it’s usually a good idea to make your structs conform to <code>Equatable</code> just so they fit the concept of value types better.</p><p>However, implementing <code>Equatable</code> can be annoying. Consider this code:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> firstName<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line">    <span class="token keyword">var</span> lastName<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line">    <span class="token keyword">var</span> age<span class="token punctuation">:</span> <span class="token class-name">Int</span></span>
<span class="line">    <span class="token keyword">var</span> city<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If you have two instances of <code>Person</code> and want to make sure they are identical, you need to compare all four properties, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">Person</span><span class="token punctuation">:</span> <span class="token class-name">Equatable</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> firstName<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line">    <span class="token keyword">var</span> lastName<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line">    <span class="token keyword">var</span> age<span class="token punctuation">:</span> <span class="token class-name">Int</span></span>
<span class="line">    <span class="token keyword">var</span> city<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">static</span> <span class="token keyword">func</span> <span class="token operator">==</span><span class="token punctuation">(</span>lhs<span class="token punctuation">:</span> <span class="token class-name">Person</span><span class="token punctuation">,</span> rhs<span class="token punctuation">:</span> <span class="token class-name">Person</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Bool</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> lhs<span class="token punctuation">.</span>firstName <span class="token operator">==</span> rhs<span class="token punctuation">.</span>firstName <span class="token operator">&amp;&amp;</span> lhs<span class="token punctuation">.</span>lastName <span class="token operator">==</span> rhs<span class="token punctuation">.</span>lastName <span class="token operator">&amp;&amp;</span> lhs<span class="token punctuation">.</span>age <span class="token operator">==</span> rhs<span class="token punctuation">.</span>age <span class="token operator">&amp;&amp;</span> lhs<span class="token punctuation">.</span>city <span class="token operator">==</span> rhs<span class="token punctuation">.</span>city</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Even <em>reading</em> that is tiring, never mind <em>writing</em> it.</p><p>Fortunately, Swift 4.1 can synthesize conformance for <code>Equatable</code> – it can generate an <code>==</code> method automatically, which will compare all properties in one value with all properties in another, just like above. So, all you have to do now is add <code>Equatable</code> as a protocol for your type, and Swift will do the rest.</p><p>Of course, if you <em>want</em> you can implement <code>==</code> yourself. For example, if your type has an <code>id</code> field that identifies it uniquely, you would write <code>==</code> to compare that single value rather than letting Swift do all the extra work.</p><p>Swift 4.1 also introduced synthesized support for the <code>Hashable</code> protocol, which means it will generate a <code>hashValue</code> property for conforming types automatically. <code>Hashable</code> was always annoying to implement because you need to return a unique (or at least mostly unique) hash for every object. It’s important, though, because it lets you use your objects as dictionary keys and store them in sets.</p><p>Previously we’d need to write code like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">var</span> hashValue<span class="token punctuation">:</span> <span class="token class-name">Int</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> firstName<span class="token punctuation">.</span>hashValue <span class="token operator">^</span> lastName<span class="token punctuation">.</span>hashValue <span class="token operator">&amp;*</span> <span class="token number">16777619</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>For the most part that’s no longer needed in Swift 4.1, although as with <code>Equatable</code> you might still want to write your own method if there’s something specific you need.</p><div class="hint-container note"><p class="hint-container-title">Note</p><p>You still need to opt in to these protocols by adding a conformance to your type, and using the synthesized code does require that all properties in your type conform to <code>Equatable</code> or <code>Hashable</code> respectively.</p></div>`,15)),a("p",null,[n[3]||(n[3]=i("For more information, see ")),a("a",y,[n[0]||(n[0]=i("Swift Evolution proposal SE-0185 (")),s(l,{icon:"iconfont icon-github"}),n[1]||(n[1]=a("code",null,"apple/swift-evolution",-1)),n[2]||(n[2]=i(")"))]),n[4]||(n[4]=i("."))]),a("details",b,[n[6]||(n[6]=a("summary",null,"Other Changes in Swift 4.1",-1)),m(` 
\`\`\`component VPCard
{
  "title": "Synthesized Equatable and Hashable | Changes in Swift 4.1",
  "desc": "Synthesized Equatable and Hashable",
  "link": "/hackingwithswift.com/swift/4.1/synthesized-protocols.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
\`\`\`
`),s(t,e(o({title:"Key decoding strategies for Codable | Changes in Swift 4.1",desc:"Key decoding strategies for Codable",link:"/hackingwithswift.com/swift/4.1/key-decoding-strategies.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"Conditional conformances | Changes in Swift 4.1",desc:"Conditional conformances",link:"/hackingwithswift.com/swift/4.1/conditional-conformance.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"Recursive constraints on associated types | Changes in Swift 4.1",desc:"Recursive constraints on associated types",link:"/hackingwithswift.com/swift/4.1/recursive-constraints.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"Build configuration import testing | Changes in Swift 4.1",desc:"Build configuration import testing",link:"/hackingwithswift.com/swift/4.1/import-testing.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"Target environment testing | Changes in Swift 4.1",desc:"Target environment testing",link:"/hackingwithswift.com/swift/4.1/target-environment.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"flatMap is now (partly) compactMap() | Changes in Swift 4.1",desc:"flatMap is now (partly) compactMap()",link:"/hackingwithswift.com/swift/4.1/compactmap.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a("p",null,[a("a",v,[s(l,{icon:"fas fa-file-zipper"}),n[5]||(n[5]=i("Download Swift 4.1 playground"))])])])])}const z=r(f,[["render",S],["__file","synthesized-protocols.html.vue"]]),C=JSON.parse('{"path":"/hackingwithswift.com/swift/4.1/synthesized-protocols.html","title":"Synthesized Equatable and Hashable","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Synthesized Equatable and Hashable","description":"Article(s) > Synthesized Equatable and Hashable","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","swift","swift-4.1"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Synthesized Equatable and Hashable"},{"property":"og:description","content":"Synthesized Equatable and Hashable"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/4.1/synthesized-protocols.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/4.1/synthesized-protocols.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Synthesized Equatable and Hashable"}],["meta",{"property":"og:description","content":"Article(s) > Synthesized Equatable and Hashable"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-4.1"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Synthesized Equatable and Hashable\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"prev":"/hackingwithswift.com/swift/4.2/toggle.md","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.58,"words":773},"filePathRelative":"hackingwithswift.com/swift/4.1/synthesized-protocols.md","excerpt":"\\n"}');export{z as comp,C as data};