import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as s,as as d,ao as a,at as e,au as i,an as o,al as m,ak as g,aq as c,ar as h}from"./app-CpYYKbnj.js";const f={},k={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},b={href:"https://github.com/apple/swift-evolution/blob/main/proposals/0295-codable-synthesis-for-enums-with-associated-values.md",target:"_blank",rel:"noopener noreferrer"},v={class:"hint-container details"},y={href:"https://hackingwithswift.com/files/playgrounds/swift/playground-5-4-to-5-5.playground.zip",target:"_blank",rel:"noopener noreferrer"};function C(p,n){const t=c("VPCard"),l=c("FontIcon");return h(),u("div",null,[s("h1",k,[s("a",w,[s("span",null,d(p.$frontmatter.title)+" 관련",1)])]),a(t,e(i({title:"HACKING WITH SWIFT",desc:"What's new in Swift?",link:"/hackingwithswift.com/swift/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[12]||(n[12]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[13]||(n[13]=s("hr",null,null,-1)),a(t,e(i({title:"Codable synthesis for enums with associated values | Changes in Swift 5.5",desc:"Codable synthesis for enums with associated values",link:"https://hackingwithswift.com/swift/5.5/codable-enums",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[14]||(n[14]=s("blockquote",null,[s("p",null,"Available from Swift 5.5")],-1)),s("p",null,[s("a",b,[n[0]||(n[0]=o("SE-0295 (")),a(l,{icon:"iconfont icon-github"}),n[1]||(n[1]=s("code",null,"apple/swift-evolution",-1)),n[2]||(n[2]=o(")"))]),n[3]||(n[3]=o(" upgrades Swift’s ")),n[4]||(n[4]=s("code",null,"Codable",-1)),n[5]||(n[5]=o(" system to support writing enums with associated values. Previously enums were only supported if they conformed to ")),n[6]||(n[6]=s("code",null,"RawRepresentable",-1)),n[7]||(n[7]=o(", but this extends support to general enums as well as enum cases with any number of ")),n[8]||(n[8]=s("code",null,"Codable",-1)),n[9]||(n[9]=o(" associated values."))]),n[15]||(n[15]=m(`<p>For example, we could define a <code>Weather</code> enum like this one:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">enum</span> <span class="token class-name">Weather</span><span class="token punctuation">:</span> <span class="token class-name">Codable</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> sun</span>
<span class="line">    <span class="token keyword">case</span> <span class="token function">wind</span><span class="token punctuation">(</span>speed<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token function">rain</span><span class="token punctuation">(</span>amount<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">,</span> chance<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That has one simple case, one case with a single associated values, and a third case with two associated values – all are integers, but you could use strings or other <code>Codable</code> types.</p><p>With that enum defined, we can create an array of weather to make a forecast, then use <code>JSONEncoder</code> or similar and convert the result to a printable string:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token class-name">Foundation</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">let</span> forecast<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">Weather</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">.</span>sun<span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">wind</span><span class="token punctuation">(</span>speed<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">.</span>sun<span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">rain</span><span class="token punctuation">(</span>amount<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span> chance<span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">do</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token keyword">try</span> <span class="token class-name">JSONEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>forecast<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">let</span> jsonString <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">(</span>decoding<span class="token punctuation">:</span> result<span class="token punctuation">,</span> <span class="token keyword">as</span><span class="token punctuation">:</span> UTF8<span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span>jsonString<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Encoding error: </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">error<span class="token punctuation">.</span>localizedDescription</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Behind the scenes, this is implemented using multiple <code>CodingKey</code> enums capable of handling the nested structure that results from having values attached to enum cases, which means writing your own custom coding methods to do the same is a little more work.</p>`,6)),s("details",v,[n[11]||(n[11]=s("summary",null,"Other Changes in Swift 5.5",-1)),a(t,e(i({title:"Async await | Changes in Swift 5.5",desc:"Async await",link:"/hackingwithswift.com/swift/5.5/async-await.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"Async sequences | Changes in Swift 5.5",desc:"Async sequences",link:"/hackingwithswift.com/swift/5.5/async-sequences.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"Effectful read-only properties | Changes in Swift 5.5",desc:"Effectful read-only properties",link:"/hackingwithswift.com/swift/5.5/effectful-read-only-properties.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"Structured concurrency | Changes in Swift 5.5",desc:"Structured concurrency",link:"/hackingwithswift.com/swift/5.5/structured-concurrency.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"async let bindings | Changes in Swift 5.5",desc:"async let bindings",link:"/hackingwithswift.com/swift/5.5/async-let-bindings.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"Continuations for interfacing async tasks with synchronous code | Changes in Swift 5.5",desc:"Continuations for interfacing async tasks with synchronous code",link:"/hackingwithswift.com/swift/5.5/continuations.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"Actors | Changes in Swift 5.5",desc:"Actors",link:"/hackingwithswift.com/swift/5.5/actors.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"Global actors | Changes in Swift 5.5",desc:"Global actors",link:"/hackingwithswift.com/swift/5.5/global-actors.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"Sendable and @Sendable closures | Changes in Swift 5.5",desc:"Sendable and @Sendable closures",link:"/hackingwithswift.com/swift/5.5/sendable.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"if for postfix member expressions | Changes in Swift 5.5",desc:"if for postfix member expressions",link:"/hackingwithswift.com/swift/5.5/postfix-if.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"Interchangeable use of CGFloat and Double types | Changes in Swift 5.5",desc:"Interchangeable use of CGFloat and Double types",link:"/hackingwithswift.com/swift/5.5/interchangeable-cgfloat-double.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),g(` 
\`\`\`component VPCard
{
  "title": "Codable synthesis for enums with associated values | Changes in Swift 5.5",
  "desc": "Codable synthesis for enums with associated values",
  "link": "/hackingwithswift.com/swift/5.5/codable-enums.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
\`\`\`
`),a(t,e(i({title:"lazy now works in local contexts | Changes in Swift 5.5",desc:"lazy now works in local contexts",link:"/hackingwithswift.com/swift/5.5/local-lazy.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"Extending property wrappers to function and closure parameters | Changes in Swift 5.5",desc:"Extending property wrappers to function and closure parameters",link:"/hackingwithswift.com/swift/5.5/property-wrapper-function-parameters.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"Extending static member lookup in generic contexts | Changes in Swift 5.5",desc:"Extending static member lookup in generic contexts",link:"/hackingwithswift.com/swift/5.5/static-member-generic.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s("p",null,[s("a",y,[a(l,{icon:"fas fa-file-zipper"}),n[10]||(n[10]=o("Download Swift 5.5 playground"))])])])])}const A=r(f,[["render",C],["__file","codable-enums.html.vue"]]),E=JSON.parse('{"path":"/hackingwithswift.com/swift/5.5/codable-enums.html","title":"Codable synthesis for enums with associated values","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Codable synthesis for enums with associated values","description":"Article(s) > Codable synthesis for enums with associated values","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","swift","swift-5.5"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Codable synthesis for enums with associated values"},{"property":"og:description","content":"Codable synthesis for enums with associated values"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.5/codable-enums.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.5/codable-enums.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Codable synthesis for enums with associated values"}],["meta",{"property":"og:description","content":"Article(s) > Codable synthesis for enums with associated values"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.5"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Codable synthesis for enums with associated values\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.74,"words":821},"filePathRelative":"hackingwithswift.com/swift/5.5/codable-enums.md","excerpt":"\\n"}');export{A as comp,E as data};