import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as s,as as d,ao as a,at as e,au as o,an as i,al as k,ak as g,aq as p,ar as h}from"./app-CpYYKbnj.js";const m={},f={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},v={href:"https://github.com/apple/swift-evolution/blob/master/proposals/0235-add-result.md",target:"_blank",rel:"noopener noreferrer"},y={class:"hint-container details"},b={href:"https://hackingwithswift.com/files/playgrounds/swift/playground-4-2-to-5-0.playground.zip",target:"_blank",rel:"noopener noreferrer"};function R(c,n){const t=p("VPCard"),l=p("FontIcon");return h(),u("div",null,[s("h1",f,[s("a",w,[s("span",null,d(c.$frontmatter.title)+" 관련",1)])]),a(t,e(o({title:"HACKING WITH SWIFT",desc:"What's new in Swift?",link:"/hackingwithswift.com/swift/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[8]||(n[8]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[9]||(n[9]=s("hr",null,null,-1)),a(t,e(o({title:"A standard Result type | Changes in Swift 5.0",desc:"A standard Result type",link:"https://hackingwithswift.com/swift/5.0/result",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[10]||(n[10]=s("blockquote",null,[s("p",null,"Available from Swift 5.0")],-1)),s("p",null,[s("a",v,[n[0]||(n[0]=i("SE-0235 (")),a(l,{icon:"iconfont icon-github"}),n[1]||(n[1]=s("code",null,"apple/swift-evolution",-1)),n[2]||(n[2]=i(")"))]),n[3]||(n[3]=i(" introduced a ")),n[4]||(n[4]=s("code",null,"Result",-1)),n[5]||(n[5]=i(" type into the standard library, giving us a simpler, clearer way of handling errors in complex code such as asynchronous APIs."))]),n[11]||(n[11]=k(`<p>Swift’s <code>Result</code> type is implemented as an enum that has two cases: <code>success</code> and <code>failure</code>. Both are implemented using generics so they can have an associated value of your choosing, but <code>failure</code> must be something that conforms to Swift’s <code>Error</code> type.</p><p>To demonstrate <code>Result</code>, we could write a function that connects to a server to figure out how many unread messages are waiting for the user. In this example code we’re going to have just one possible error, which is that the requested URL string isn’t a valid URL:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">enum</span> <span class="token class-name">NetworkError</span><span class="token punctuation">:</span> <span class="token class-name">Error</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> badURL</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The fetching function will accept a URL string as its first parameter, and a completion handler as its second parameter. That completion handler will itself accept a <code>Result</code>, where the success case will store an integer, and the failure case will be some sort of <code>NetworkError</code>. We’re not actually going to connect to a server here, but using a completion handler at least lets us simulate asynchronous code.</p><p>Here’s the code:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token class-name">Foundation</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">fetchUnreadCount1</span><span class="token punctuation">(</span>from urlString<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">,</span> completionHandler<span class="token punctuation">:</span> <span class="token attribute atrule">@escaping</span> <span class="token punctuation">(</span><span class="token class-name">Result</span><span class="token operator">&lt;</span><span class="token class-name">Int</span><span class="token punctuation">,</span> <span class="token class-name">NetworkError</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Void</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">guard</span> <span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> urlString<span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">completionHandler</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token function">failure</span><span class="token punctuation">(</span><span class="token punctuation">.</span>badURL<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// complicated networking code here</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Fetching </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">url<span class="token punctuation">.</span>absoluteString</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">...&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">completionHandler</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To use that code we need to check the value inside our <code>Result</code> to see whether our call succeeded or failed, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token function">fetchUnreadCount1</span><span class="token punctuation">(</span>from<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;https://hackingwithswift.com&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> result <span class="token keyword">in</span></span>
<span class="line">    <span class="token keyword">switch</span> result <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token keyword">let</span> count<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;</span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">count</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string"> unread messages.&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token punctuation">.</span><span class="token function">failure</span><span class="token punctuation">(</span><span class="token keyword">let</span> error<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token function">print</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>localizedDescription<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>There are three more things you ought to know before you start using <code>Result</code> in your own code.</p><p>First, <code>Result</code> has a <code>get()</code> method that either returns the successful value if it exists, or throws its error otherwise. This allows you to convert <code>Result</code> into a regular throwing call, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token function">fetchUnreadCount1</span><span class="token punctuation">(</span>from<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;https://hackingwithswift.com&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> result <span class="token keyword">in</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token keyword">try</span><span class="token operator">?</span> result<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;</span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">count</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string"> unread messages.&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Second, <code>Result</code> has an initializer that accepts a throwing closure: if the closure returns a value successfully that gets used for the <code>success</code> case, otherwise the thrown error is placed into the <code>failure</code> case.</p><p>For example:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token class-name">Result</span> <span class="token punctuation">{</span> <span class="token keyword">try</span> <span class="token class-name">String</span><span class="token punctuation">(</span>contentsOfFile<span class="token punctuation">:</span> someFile<span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Third, rather than using a specific error enum that you’ve created, you can also use the general <code>Error</code> protocol. In fact, the Swift Evolution proposal says “it&#39;s expected that most uses of Result will use <code>Swift.Error</code> as the <code>Error</code> type argument.”</p><p>So, rather than using <code>Result&lt;Int, NetworkError&gt;</code> you could use <code>Result&lt;Int, Error&gt;</code>. Although this means you lose the safety of typed throws, you gain the ability to throw a variety of different error enums – which you prefer really depends on your coding style.</p>`,16)),s("details",y,[n[7]||(n[7]=s("summary",null,"Other Changes in Swift 5.0",-1)),a(t,e(o({title:"Raw strings | Changes in Swift 5.0",desc:"Raw strings",link:"/hackingwithswift.com/swift/5.0/raw-strings.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),g(` 
\`\`\`component VPCard
{
  "title": "A standard Result type | Changes in Swift 5.0",
  "desc": "A standard Result type",
  "link": "/hackingwithswift.com/swift/5.0/result.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
\`\`\`
`),a(t,e(o({title:"Customizing string interpolation | Changes in Swift 5.0",desc:"Customizing string interpolation",link:"/hackingwithswift.com/swift/5.0/string-interpolation.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"Dynamically callable types | Changes in Swift 5.0",desc:"Dynamically callable types",link:"/hackingwithswift.com/swift/5.0/dynamically-callable-types.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"Handling future enum cases | Changes in Swift 5.0",desc:"Handling future enum cases",link:"/hackingwithswift.com/swift/5.0/handling-future-enum-cases.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"Flattening nested optionals resulting from try? | Changes in Swift 5.0",desc:"Flattening nested optionals resulting from try?",link:"/hackingwithswift.com/swift/5.0/flattening-optionals.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"Checking for integer multiples | Changes in Swift 5.0",desc:"Checking for integer multiples",link:"/hackingwithswift.com/swift/5.0/integer-multiples.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"Transforming and unwrapping dictionary values with compactMapValues() | Changes in Swift 5.0",desc:"Transforming and unwrapping dictionary values with compactMapValues()",link:"/hackingwithswift.com/swift/5.0/compactmapvalues.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s("p",null,[s("a",b,[a(l,{icon:"fas fa-file-zipper"}),n[6]||(n[6]=i("Download Swift 5.0 playground"))])])])])}const A=r(m,[["render",R],["__file","result.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/swift/5.0/result.html","title":"A standard Result type","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"A standard Result type","description":"Article(s) > A standard Result type","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","swift","swift-5.0"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > A standard Result type"},{"property":"og:description","content":"A standard Result type"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.0/result.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.0/result.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"A standard Result type"}],["meta",{"property":"og:description","content":"Article(s) > A standard Result type"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.0"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"A standard Result type\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.85,"words":856},"filePathRelative":"hackingwithswift.com/swift/5.0/result.md","excerpt":"\\n"}');export{A as comp,x as data};