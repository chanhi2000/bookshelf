import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as r,am as s,as as u,ao as a,at as e,au as o,al as d,ak as k,an as h,aq as i,ar as f}from"./app-CpYYKbnj.js";const w={},g={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"},y={class:"hint-container details"},v={href:"https://hackingwithswift.com/files/playgrounds/swift/playground-1-2-to-2-0.playground.zip",target:"_blank",rel:"noopener noreferrer"};function b(p,n){const t=i("VPCard"),l=i("FontIcon");return f(),r("div",null,[s("h1",g,[s("a",m,[s("span",null,u(p.$frontmatter.title)+" 관련",1)])]),a(t,e(o({title:"HACKING WITH SWIFT",desc:"What's new in Swift?",link:"/hackingwithswift.com/swift/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[2]||(n[2]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[3]||(n[3]=s("hr",null,null,-1)),a(t,e(o({title:"Use the defer keyword to delay work until your scope exits | Changes in Swift 2.0",desc:"Use the defer keyword to delay work until your scope exits",link:"https://hackingwithswift.com/swift/2.0/defer",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[4]||(n[4]=d(`<blockquote><p>Available from Swift 2.0</p></blockquote><p>Some languages have a concept of <code>try/finally</code> which lets you tell your app &quot;no matter what happens, I want this code to be executed.&quot; Swift 2 introduced its own take on this requirement using the <code>defer</code> keyword: it means &quot;I want this work to take place, but not just yet.&quot; In practice, this usually means the work will happen just before your method ends, but here&#39;s the cool thing: this will still happen if you throw an error.</p><p>First, a simple example:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">override</span> <span class="token keyword">func</span> <span class="token function-definition function">viewDidLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">viewDidLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Checkpoint 1&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">doStuff</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Checkpoint 4&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">doStuff</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Checkpoint 2&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">defer</span> <span class="token punctuation">{</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Do clean up here&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Checkpoint 3&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If you run that, you&#39;ll see &quot;Checkpoint 1&quot;, &quot;Checkpoint 2&quot;, &quot;Checkpoint 3&quot;, &quot;Do clean up here&quot;, then &quot;Checkpoint 4&quot;. So, even though the <code>defer</code> line appears before checkpoint 3, it gets executed after – it gets deferred until the method is about to end.</p><p>I put &quot;Do clean up code here&quot; in there because that&#39;s exactly what <code>defer</code> is good at: when you know you need to flush a cache, write out a file or whatever, and you want to make sure that code gets executed regardless of what path is taken through your method.</p><p>As I said, work you schedule with <code>defer</code> will execute no matter what route your code takes through your method, and that includes if you throw any errors. For example:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">override</span> <span class="token keyword">func</span> <span class="token function-definition function">viewDidLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">viewDidLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Checkpoint 1&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">do</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">try</span> <span class="token function">doStuff</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Error!&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Checkpoint 4&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">doStuff</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Checkpoint 2&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">defer</span> <span class="token punctuation">{</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Do clean up here&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">throw</span> <span class="token class-name">MyError</span><span class="token punctuation">.</span><span class="token class-name">UserError</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Checkpoint 3&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>As soon as <code>doStuff()</code> throws its error, the method is exited and at that point the deferred code is called.</p>`,9)),s("details",y,[n[1]||(n[1]=s("summary",null,"Other changes in Swift 2.0…",-1)),a(t,e(o({title:"Throwing errors | Changes in Swift 2.0",desc:"Throwing errors",link:"/hackingwithswift.com/swift/2.0/try.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"Use the guard keyword for early returns | Changes in Swift 2.0",desc:"Use the guard keyword for early returns",link:"/hackingwithswift.com/swift/2.0/guard.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"Measure strings using their character count | Changes in Swift 2.0",desc:"Measure strings using their character count",link:"/hackingwithswift.com/swift/2.0/strings.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),k(` 
\`\`\`component VPCard
{
  "title": "Use the defer keyword to delay work until your scope exits | Changes in Swift 2.0",
  "desc": "Use the defer keyword to delay work until your scope exits",
  "link": "/hackingwithswift.com/swift/2.0/defer.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
\`\`\`
`),a(t,e(o({title:"Mutability warnings | Changes in Swift 2.0",desc:"Mutability warnings",link:"/hackingwithswift.com/swift/2.0/mutability.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"Checking API availability | Changes in Swift 2.0",desc:"Checking API availability",link:"/hackingwithswift.com/swift/2.0/api-availability.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s("p",null,[s("a",v,[a(l,{icon:"fas fa-file-zipper"}),n[0]||(n[0]=h("Download Swift 2.0 playground"))])])])])}const C=c(w,[["render",b],["__file","defer.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/swift/2.0/defer.html","title":"Use the defer keyword to delay work until your scope exits","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Use the defer keyword to delay work until your scope exits","description":"Article(s) > Use the defer keyword to delay work until your scope exits","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","swift","swift-2.0"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Use the defer keyword to delay work until your scope exits"},{"property":"og:description","content":"Use the defer keyword to delay work until your scope exits"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/2.0/defer.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/2.0/defer.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Use the defer keyword to delay work until your scope exits"}],["meta",{"property":"og:description","content":"Article(s) > Use the defer keyword to delay work until your scope exits"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-2.0"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Use the defer keyword to delay work until your scope exits\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.14,"words":643},"filePathRelative":"hackingwithswift.com/swift/2.0/defer.md","excerpt":"\\n"}');export{C as comp,S as data};