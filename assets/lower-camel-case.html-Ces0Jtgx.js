import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as s,as as d,ao as a,at as t,au as o,al as m,ak as u,an as h,aq as i,ar as w}from"./app-CpYYKbnj.js";const f={},g={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"},v={class:"hint-container details"},b={href:"https://hackingwithswift.com/files/playgrounds/swift/playground-2-2-to-3-0.playground.zip",target:"_blank",rel:"noopener noreferrer"};function C(l,e){const n=i("VPCard"),p=i("FontIcon");return w(),c("div",null,[s("h1",g,[s("a",k,[s("span",null,d(l.$frontmatter.title)+" 관련",1)])]),a(n,t(o({title:"HACKING WITH SWIFT",desc:"What's new in Swift?",link:"/hackingwithswift.com/swift/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e[2]||(e[2]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),e[3]||(e[3]=s("hr",null,null,-1)),a(n,t(o({title:"UpperCamelCase has been replaced with lowerCamelCase for enums and properties | Changes in Swift 3.0",desc:"UpperCamelCase has been replaced with lowerCamelCase for enums and properties",link:"https://hackingwithswift.com/swift/3.0/lower-camel-case",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e[4]||(e[4]=m(`<blockquote><p>Available from Swift 3.0</p></blockquote><p>Although syntactically irrelevant, the capital letters we use to name classes and structs, properties, enums, and more have always followed a convention fairly closely: classes, structs, and enums use UpperCamelCase (MyStruct, WeatherType.Cloudy), properties and parameter names use lowerCamelCase (emailAddress, requestString).</p><p>I say &quot;fairly closely&quot; because there are some exceptions that are going to <em>stop</em> being exceptions in Swift 3: properties and parameters that started with initials in Swift 2.2 will now used lowerCamelCase in Swift 3.</p><p>Sometimes this isn&#39;t too strange: Swift 2.2 created <code>NSURLRequest</code> objects using <code>NSURLRequest(URL: someURL)</code> – note the capital &quot;URL&quot;. Swift 3 rewrites that to <code>URLRequest(url: someURL)</code>, and also means you&#39;ll use things like <code>webView.request?.url?.absoluteString</code> for reading the URL of a web view.</p><p>Where it&#39;s a bit more jarring is when only part of the property name is in caps, e.g. <code>CGColor</code> or <code>CIColor</code>. Yes, you&#39;ve guessed it: they become <code>cgColor</code> and <code>ciColor</code> in Swift 3, so you&#39;ll be writing code like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> red <span class="token operator">=</span> <span class="token class-name">UIColor</span><span class="token punctuation">.</span>red<span class="token punctuation">.</span>cgColor</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>This change does help drive consistency: all properties and parameters should start with a lowercase letter, no exceptions.</p><p>At the same time enum cases are also changing, moving from UpperCamelCase to lowerCamelCase. This makes sense: an enum is a data type (like a struct), but enum values are closer to properties. However, it does mean that wherever you&#39;ve used an Apple enum, it will now be lowercase. So:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">UIInterfaceOrientationMask</span><span class="token punctuation">.</span><span class="token class-name">Portrait</span> <span class="token comment">// old</span></span>
<span class="line"><span class="token class-name">UIInterfaceOrientationMask</span><span class="token punctuation">.</span>portrait <span class="token comment">// new</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name">NSTextAlignment</span><span class="token punctuation">.</span><span class="token class-name">Left</span> <span class="token comment">// old</span></span>
<span class="line"><span class="token class-name">NSTextAlignment</span><span class="token punctuation">.</span><span class="token keyword">left</span> <span class="token comment">// new</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name">SKBlendMode</span><span class="token punctuation">.</span><span class="token class-name">Replace</span> <span class="token comment">// old</span></span>
<span class="line"><span class="token class-name">SKBlendMode</span><span class="token punctuation">.</span>replace <span class="token comment">// new</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You get the idea. However, this tiny change brings something much bigger because Swift&#39;s optionals are actually just an enum under the hood, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">enum</span> <span class="token class-name">Optional</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token class-name">None</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token class-name">Some</span><span class="token punctuation">(</span><span class="token class-name">Wrapped</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This means if you use <code>.Some</code> to work with optionals, you&#39;ll need to switch to <code>.some</code> instead. Of course, you could always take this opportunity to ditch <code>.some</code> entirely – these two pieces of code are identical:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">for</span> <span class="token keyword">case</span> <span class="token keyword">let</span> <span class="token punctuation">.</span><span class="token keyword">some</span><span class="token punctuation">(</span>datum<span class="token punctuation">)</span> <span class="token keyword">in</span> data <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span>datum<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> <span class="token keyword">case</span> <span class="token keyword">let</span> datum<span class="token operator">?</span> <span class="token keyword">in</span> data <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span>datum<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13)),s("details",v,[e[1]||(e[1]=s("summary",null,"Changes in Swift 3.0",-1)),a(n,t(o({title:"All function parameters have labels unless you request otherwise | Changes in Swift 3.0",desc:"All function parameters have labels unless you request otherwise",link:"/hackingwithswift.com/swift/3.0/function-parameters.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(n,t(o({title:"Omit needless words | Changes in Swift 3.0",desc:"Omit needless words",link:"/hackingwithswift.com/swift/3.0/omit-needless-words.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),u(` 
\`\`\`component VPCard
{
  "title": "UpperCamelCase has been replaced with lowerCamelCase for enums and properties | Changes in Swift 3.0",
  "desc": "UpperCamelCase has been replaced with lowerCamelCase for enums and properties",
  "link": "/hackingwithswift.com/swift/3.0/lower-camel-case.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
\`\`\`
`),a(n,t(o({title:"Swifty importing of C functions | Changes in Swift 3.0",desc:"Swifty importing of C functions",link:"/hackingwithswift.com/swift/3.0/c-functions.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(n,t(o({title:"Verbs and nouns | Changes in Swift 3.0",desc:"Verbs and nouns",link:"/hackingwithswift.com/swift/3.0/verbs-and-nouns.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s("p",null,[s("a",b,[a(p,{icon:"fas fa-file-zipper"}),e[0]||(e[0]=h("Download Swift 3.0 playground"))])])])])}const U=r(f,[["render",C],["__file","lower-camel-case.html.vue"]]),R=JSON.parse('{"path":"/hackingwithswift.com/swift/3.0/lower-camel-case.html","title":"UpperCamelCase has been replaced with lowerCamelCase for enums and properties","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"UpperCamelCase has been replaced with lowerCamelCase for enums and properties","description":"Article(s) > UpperCamelCase has been replaced with lowerCamelCase for enums and properties","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","swift","swift-3.0"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > UpperCamelCase has been replaced with lowerCamelCase for enums and properties"},{"property":"og:description","content":"UpperCamelCase has been replaced with lowerCamelCase for enums and properties"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/3.0/lower-camel-case.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/3.0/lower-camel-case.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"UpperCamelCase has been replaced with lowerCamelCase for enums and properties"}],["meta",{"property":"og:description","content":"Article(s) > UpperCamelCase has been replaced with lowerCamelCase for enums and properties"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-3.0"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"UpperCamelCase has been replaced with lowerCamelCase for enums and properties\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.28,"words":685},"filePathRelative":"hackingwithswift.com/swift/3.0/lower-camel-case.md","excerpt":"\\n"}');export{U as comp,R as data};