import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as d,am as e,as as m,ao as n,at as a,au as o,an as i,al as u,ak as h,aq as c,ar as g}from"./app-CpYYKbnj.js";const f={},w={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"},v={href:"https://github.com/apple/swift-evolution/blob/master/proposals/0157-recursive-protocol-constraints.md",target:"_blank",rel:"noopener noreferrer"},y={class:"hint-container details"},b={href:"https://hackingwithswift.com/files/playgrounds/swift/playground-4-0-to-4-1.playground.zip",target:"_blank",rel:"noopener noreferrer"};function S(l,s){const t=c("VPCard"),r=c("FontIcon");return g(),d("div",null,[e("h1",w,[e("a",k,[e("span",null,m(l.$frontmatter.title)+" 관련",1)])]),n(t,a(o({title:"HACKING WITH SWIFT",desc:"What's new in Swift?",link:"/hackingwithswift.com/swift/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s[7]||(s[7]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),s[8]||(s[8]=e("hr",null,null,-1)),n(t,a(o({title:"Recursive constraints on associated types | Changes in Swift 4.1",desc:"Recursive constraints on associated types",link:"https://hackingwithswift.com/swift/4.1/recursive-constraints",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s[9]||(s[9]=e("blockquote",null,[e("p",null,"Available from Swift 4.1")],-1)),e("p",null,[s[3]||(s[3]=i("Swift 4.1 implements ")),e("a",v,[s[0]||(s[0]=i("SE-0157 (")),n(r,{icon:"iconfont icon-github"}),s[1]||(s[1]=e("code",null,"apple/swift-evolution",-1)),s[2]||(s[2]=i(")"))]),s[4]||(s[4]=i(", which lifts restrictions on the way we use associated types inside protocols. As a result, we can now create recursive constraints for our associated types: associated types that are constrained by the protocol they are defined in."))]),s[10]||(s[10]=u(`<p>To demonstrate this, let&#39;s consider a simple team hierarchy in a tech company. In this company, every employee has a manager – someone more senior to them that they report to. Each manager must also be an employee of the company, because it would be weird if they weren&#39;t.</p><p>We can express this relationship in a simple <code>Employee</code> protocol:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">protocol</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">associatedtype</span> <span class="token class-name">Manager</span><span class="token punctuation">:</span> <span class="token class-name">Employee</span></span>
<span class="line">   <span class="token keyword">var</span> manager<span class="token punctuation">:</span> <span class="token class-name">Manager</span><span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token keyword">set</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container note"><p class="hint-container-title">Note</p><p>I&#39;ve used an optional <code>Manager?</code> because ultimately one person (presumably the CEO) has no manager.</p></div><p>Even though that&#39;s a fairly self-evident relationship, it wasn&#39;t possible to compile that code in Swift 4.0 because we&#39;re using the <code>Employee</code> protocol inside itself. However, this is fixed in Swift 4.1 because of the new ability to use recursive constraints on associated types.</p><p>Thanks to this new feature, we can model a simple tech company that has three kinds of team members: junior developers, senior developers, and board members. The reporting structure is also simple: junior developers are managed by senior developers, senior developers are managed by board members, and board members may be managed by another board member – e.g. the CTO reporting to the CEO.</p><p>That looks exactly as you would imagine thanks to Swift 4.1:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">BoardMember</span><span class="token punctuation">:</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">var</span> manager<span class="token punctuation">:</span> <span class="token class-name">BoardMember</span><span class="token operator">?</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">SeniorDeveloper</span><span class="token punctuation">:</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">var</span> manager<span class="token punctuation">:</span> <span class="token class-name">BoardMember</span><span class="token operator">?</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">JuniorDeveloper</span><span class="token punctuation">:</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">var</span> manager<span class="token punctuation">:</span> <span class="token class-name">SeniorDeveloper</span><span class="token operator">?</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container note"><p class="hint-container-title">Note</p><p>I&#39;ve used classes here rather than structs because <code>BoardMember</code> itself contains a <code>BoardMember</code> property and that would result in an infinitely sized struct. If one of these has to be a class I personally would prefer to make all three classes just for consistency, but if you preferred you could leave <code>BoardMember</code> as a class and make both <code>SeniorDeveloper</code> and <code>JuniorDeveloper</code> into structs.</p></div>`,9)),e("details",y,[s[6]||(s[6]=e("summary",null,"Other Changes in Swift 4.1",-1)),n(t,a(o({title:"Synthesized Equatable and Hashable | Changes in Swift 4.1",desc:"Synthesized Equatable and Hashable",link:"/hackingwithswift.com/swift/4.1/synthesized-protocols.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(t,a(o({title:"Key decoding strategies for Codable | Changes in Swift 4.1",desc:"Key decoding strategies for Codable",link:"/hackingwithswift.com/swift/4.1/key-decoding-strategies.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(t,a(o({title:"Conditional conformances | Changes in Swift 4.1",desc:"Conditional conformances",link:"/hackingwithswift.com/swift/4.1/conditional-conformance.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),h(` 
\`\`\`component VPCard
{
  "title": "Recursive constraints on associated types | Changes in Swift 4.1",
  "desc": "Recursive constraints on associated types",
  "link": "/hackingwithswift.com/swift/4.1/recursive-constraints.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
\`\`\`
`),n(t,a(o({title:"Build configuration import testing | Changes in Swift 4.1",desc:"Build configuration import testing",link:"/hackingwithswift.com/swift/4.1/import-testing.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(t,a(o({title:"Target environment testing | Changes in Swift 4.1",desc:"Target environment testing",link:"/hackingwithswift.com/swift/4.1/target-environment.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(t,a(o({title:"flatMap is now (partly) compactMap() | Changes in Swift 4.1",desc:"flatMap is now (partly) compactMap()",link:"/hackingwithswift.com/swift/4.1/compactmap.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e("p",null,[e("a",b,[n(r,{icon:"fas fa-file-zipper"}),s[5]||(s[5]=i("Download Swift 4.1 playground"))])])])])}const E=p(f,[["render",S],["__file","recursive-constraints.html.vue"]]),M=JSON.parse('{"path":"/hackingwithswift.com/swift/4.1/recursive-constraints.html","title":"Recursive constraints on associated types","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Recursive constraints on associated types","description":"Article(s) > Recursive constraints on associated types","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","swift","swift-4.1"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Recursive constraints on associated types"},{"property":"og:description","content":"Recursive constraints on associated types"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/4.1/recursive-constraints.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/4.1/recursive-constraints.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Recursive constraints on associated types"}],["meta",{"property":"og:description","content":"Article(s) > Recursive constraints on associated types"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-4.1"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Recursive constraints on associated types\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.29,"words":688},"filePathRelative":"hackingwithswift.com/swift/4.1/recursive-constraints.md","excerpt":"\\n"}');export{E as comp,M as data};