import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as s,as as u,ao as a,at as t,au as i,al as d,ak as m,an as w,aq as p,ar as k}from"./app-CpYYKbnj.js";const v={},g={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},h={class:"hint-container details"},b={href:"https://hackingwithswift.com/files/playgrounds/swift/playground-5-3-to-5-4.playground.zip",target:"_blank",rel:"noopener noreferrer"};function y(l,n){const e=p("VPCard"),o=p("FontIcon");return k(),c("div",null,[s("h1",g,[s("a",f,[s("span",null,u(l.$frontmatter.title)+" 관련",1)])]),a(e,t(i({title:"HACKING WITH SWIFT",desc:"What's new in Swift?",link:"/hackingwithswift.com/swift/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[2]||(n[2]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[3]||(n[3]=s("hr",null,null,-1)),a(e,t(i({title:"Property wrappers are now supported for local variables | Changes in Swift 5.4",desc:"Property wrappers are now supported for local variables",link:"https://hackingwithswift.com/swift/5.4/local-property-wrappers",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[4]||(n[4]=d(`<blockquote><p>Available from Swift 5.4</p></blockquote><p>Property wrappers were first introduced in Swift 5.1 as a way of attaching extra functionality to properties in an easy, reusable way, but in Swift 5.4 their behavior got extended to support using them as local variables in functions.</p><p>For example, we could create a property wrapper that ensures its value never goes below zero:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@propertyWrapper</span> <span class="token keyword">struct</span> <span class="token class-name">NonNegative</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token punctuation">:</span> <span class="token class-name">Numeric</span> <span class="token operator">&amp;</span> <span class="token class-name">Comparable</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> value<span class="token punctuation">:</span> <span class="token class-name">T</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> wrappedValue<span class="token punctuation">:</span> <span class="token class-name">T</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">get</span> <span class="token punctuation">{</span> value <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">set</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">if</span> newValue <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">                value <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">                value <span class="token operator">=</span> newValue</span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">init</span><span class="token punctuation">(</span>wrappedValue<span class="token punctuation">:</span> <span class="token class-name">T</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> wrappedValue <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">self</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">self</span><span class="token punctuation">.</span>value <span class="token operator">=</span> wrappedValue</span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>And from Swift 5.4 onwards we can use that property wrapper inside a regular function, rather than just attaching to a property. For example, we might write a game where our player can gain or lose points, but their score should never go below 0:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">playGame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@NonNegative</span> <span class="token keyword">var</span> score <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// player was correct</span></span>
<span class="line">    score <span class="token operator">+=</span> <span class="token number">4</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// player was correct again</span></span>
<span class="line">    score <span class="token operator">+=</span> <span class="token number">8</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// player got one wrong</span></span>
<span class="line">    score <span class="token operator">-=</span> <span class="token number">15</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// player got another one wrong</span></span>
<span class="line">    score <span class="token operator">-=</span> <span class="token number">16</span></span>
<span class="line"></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span>score<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function">playGame</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6)),s("details",h,[n[1]||(n[1]=s("summary",null,"Other Changes in Swift 5.4",-1)),a(e,t(i({title:"Improved implicit member syntax | Changes in Swift 5.4",desc:"Improved implicit member syntax",link:"/hackingwithswift.com/swift/5.4/improved-implicit-member-syntax.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(e,t(i({title:"Multiple variadic parameters in functions | Changes in Swift 5.4",desc:"Multiple variadic parameters in functions",link:"/hackingwithswift.com/swift/5.4/multiple-variadic-parameters-in-functions.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(e,t(i({title:"Local functions now support overloading | Changes in Swift 5.4",desc:"Local functions now support overloading",link:"/hackingwithswift.com/swift/5.4/local-functions-now-support-overloading.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(e,t(i({title:"Creating variables that call a function of the same name | Changes in Swift 5.4",desc:"Creating variables that call a function of the same name",link:"/hackingwithswift.com/swift/5.4/local-variables-same-name.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(e,t(i({title:"Result builders | Changes in Swift 5.4",desc:"Result builders",link:"/hackingwithswift.com/swift/5.4/result-builders.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),m(` 
\`\`\`component VPCard
{
  "title": "Property wrappers are now supported for local variables | Changes in Swift 5.4",
  "desc": "Property wrappers are now supported for local variables",
  "link": "/hackingwithswift.com/swift/5.4/local-property-wrappers.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
\`\`\`
`),a(e,t(i({title:"Packages can now declare executable targets | Changes in Swift 5.4",desc:"Packages can now declare executable targets",link:"/hackingwithswift.com/swift/5.4/spm-executable-targets.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s("p",null,[s("a",b,[a(o,{icon:"fas fa-file-zipper"}),n[0]||(n[0]=w("Download Swift 5.4 playground"))])])])])}const x=r(v,[["render",y],["__file","local-property-wrappers.html.vue"]]),C=JSON.parse('{"path":"/hackingwithswift.com/swift/5.4/local-property-wrappers.html","title":"Property wrappers are now supported for local variables","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Property wrappers are now supported for local variables","description":"Article(s) > Property wrappers are now supported for local variables","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","swift","swift-5.4"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Property wrappers are now supported for local variables"},{"property":"og:description","content":"Property wrappers are now supported for local variables"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.4/local-property-wrappers.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.4/local-property-wrappers.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Property wrappers are now supported for local variables"}],["meta",{"property":"og:description","content":"Article(s) > Property wrappers are now supported for local variables"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.4"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Property wrappers are now supported for local variables\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.89,"words":567},"filePathRelative":"hackingwithswift.com/swift/5.4/local-property-wrappers.md","excerpt":"\\n"}');export{x as comp,C as data};