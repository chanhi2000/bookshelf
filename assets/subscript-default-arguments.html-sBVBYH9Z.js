import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as r,am as s,as as u,ao as a,at as e,au as i,al as d,ak as m,an as f,aq as o,ar as k}from"./app-CpYYKbnj.js";const g={},w={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"},b={class:"hint-container details"},v={href:"https://hackingwithswift.com/files/playgrounds/swift/playground-5-1-to-5-2.playground.zip",target:"_blank",rel:"noopener noreferrer"};function y(c,n){const t=o("VPCard"),p=o("FontIcon");return k(),r("div",null,[s("h1",w,[s("a",h,[s("span",null,u(c.$frontmatter.title)+" 관련",1)])]),a(t,e(i({title:"HACKING WITH SWIFT",desc:"What's new in Swift?",link:"/hackingwithswift.com/swift/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[2]||(n[2]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[3]||(n[3]=s("hr",null,null,-1)),a(t,e(i({title:"Subscripts can now declare default arguments | Changes in Swift 5.2",desc:"Subscripts can now declare default arguments",link:"https://hackingwithswift.com/swift/5.2/subscript-default-arguments",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[4]||(n[4]=d(`<blockquote><p>Available from Swift 5.2</p></blockquote><p>When adding custom subscripts to a type, you can now use default arguments for any of the parameters. For example, if we had a <code>PoliceForce</code> struct with a custom subscript to read officers from the force, we could add a <code>default</code> parameter to send back if someone tries to read an index outside of the array’s bounds:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">PoliceForce</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> officers<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">String</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">subscript</span><span class="token punctuation">(</span>index<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">,</span> <span class="token keyword">default</span> <span class="token keyword">default</span><span class="token punctuation">:</span> <span class="token class-name">String</span> <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Unknown&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">String</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> index <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> index <span class="token operator">&lt;</span> officers<span class="token punctuation">.</span>count <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> officers<span class="token punctuation">[</span>index<span class="token punctuation">]</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> \`<span class="token keyword">default</span>\`</span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">let</span> force <span class="token operator">=</span> <span class="token class-name">PoliceForce</span><span class="token punctuation">(</span>officers<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;Amy&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;Jake&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;Rosa&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;Terry&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span>force<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span>force<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That will print “Amy” then “Unknown”, with the latter being caused because there is no officer at index 5. Note that you do need to write your parameter labels twice if you want them to be used, because subscripts don’t use parameter labels otherwise.</p><p>So, because I use <code>default default</code> in my subscript, I can use a custom value like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token function">print</span><span class="token punctuation">(</span>force<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">default</span><span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;The Vulture&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,6)),s("details",b,[n[1]||(n[1]=s("summary",null,"Other Changes in Swift 5.2",-1)),a(t,e(i({title:"Key path expressions as functions | Changes in Swift 5.2",desc:"Key path expressions as functions",link:"/hackingwithswift.com/swift/5.2/keypath-expressions.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"Callable values of user-defined nominal types | Changes in Swift 5.2",desc:"Callable values of user-defined nominal types",link:"/hackingwithswift.com/swift/5.2/callasfunction.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),m(` 
\`\`\`component VPCard
{
  "title": "Subscripts can now declare default arguments | Changes in Swift 5.2",
  "desc": "Subscripts can now declare default arguments",
  "link": "/hackingwithswift.com/swift/5.2/subscript-default-arguments.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
\`\`\`
`),a(t,e(i({title:"Lazy filtering order is now reversed | Changes in Swift 5.2",desc:"Lazy filtering order is now reversed",link:"/hackingwithswift.com/swift/5.2/lazy-filtering.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"New and improved diagnostics | Changes in Swift 5.2",desc:"New and improved diagnostics",link:"/hackingwithswift.com/swift/5.2/new-diagnostics.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s("p",null,[s("a",v,[a(p,{icon:"fas fa-file-zipper"}),n[0]||(n[0]=f("Download Swift 5.2 playground"))])])])])}const q=l(g,[["render",y],["__file","subscript-default-arguments.html.vue"]]),C=JSON.parse('{"path":"/hackingwithswift.com/swift/5.2/subscript-default-arguments.html","title":"Subscripts can now declare default arguments","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Subscripts can now declare default arguments","description":"Article(s) > Subscripts can now declare default arguments","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","swift","swift-5.2"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Subscripts can now declare default arguments"},{"property":"og:description","content":"Subscripts can now declare default arguments"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.2/subscript-default-arguments.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.2/subscript-default-arguments.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Subscripts can now declare default arguments"}],["meta",{"property":"og:description","content":"Article(s) > Subscripts can now declare default arguments"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.2"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Subscripts can now declare default arguments\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.57,"words":472},"filePathRelative":"hackingwithswift.com/swift/5.2/subscript-default-arguments.md","excerpt":"\\n"}');export{q as comp,C as data};