import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as a,as as d,ao as s,at as e,au as o,an as p,al as k,ak as m,aq as c,ar as h}from"./app-CpYYKbnj.js";const w={},f={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},v={href:"https://github.com/apple/swift-evolution/blob/main/proposals/0296-async-await.md",target:"_blank",rel:"noopener noreferrer"},y={class:"hint-container details"},b={href:"https://hackingwithswift.com/files/playgrounds/swift/playground-5-4-to-5-5.playground.zip",target:"_blank",rel:"noopener noreferrer"};function S(l,n){const t=c("VPCard"),i=c("FontIcon");return h(),u("div",null,[a("h1",f,[a("a",g,[a("span",null,d(l.$frontmatter.title)+" 관련",1)])]),s(t,e(o({title:"HACKING WITH SWIFT",desc:"What's new in Swift?",link:"/hackingwithswift.com/swift/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[10]||(n[10]=a("nav",{class:"table-of-contents"},[a("ul")],-1)),n[11]||(n[11]=a("hr",null,null,-1)),s(t,e(o({title:"Async await | Changes in Swift 5.5",desc:"Async await",link:"https://hackingwithswift.com/swift/5.5/async-await",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[12]||(n[12]=a("blockquote",null,[a("p",null,"Available from Swift 5.5")],-1)),a("p",null,[a("a",v,[n[0]||(n[0]=p("SE-0296 (")),s(i,{icon:"iconfont icon-github"}),n[1]||(n[1]=a("code",null,"apple/swift-evolution",-1)),n[2]||(n[2]=p(")"))]),n[3]||(n[3]=p(" introduced asynchronous (async) functions into Swift, allowing us to run complex asynchronous code almost is if it were synchronous. This is done in two steps: marking async functions with the new ")),n[4]||(n[4]=a("code",null,"async",-1)),n[5]||(n[5]=p(" keyword, then calling them using the ")),n[6]||(n[6]=a("code",null,"await",-1)),n[7]||(n[7]=p(" keyword, similar to other languages such as C# and JavaScript."))]),n[13]||(n[13]=k(`<p>To see how async/await helps the language, it’s helpful to look at how we solved the same problem previously. Completion handlers are commonly used in Swift code to allow us to send back values after a function returns, but they had tricky syntax as you’ll see.</p><p>For example, if we wanted to write code that fetched 100,000 weather records from a server, processes them to calculate the average temperature over time, then uploaded the resulting average back to a server, we might have written this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token class-name">Foundation</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">fetchWeatherHistory</span><span class="token punctuation">(</span>completion<span class="token punctuation">:</span> <span class="token attribute atrule">@escaping</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token class-name">Double</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Complex networking code here; we&#39;ll just send back 100,000 random temperatures</span></span>
<span class="line">    <span class="token class-name">DispatchQueue</span><span class="token punctuation">.</span><span class="token function">global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">async</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> results <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token operator">...</span><span class="token number">100_000</span><span class="token punctuation">)</span><span class="token punctuation">.</span>map <span class="token punctuation">{</span> <span class="token omit keyword">_</span> <span class="token keyword">in</span> <span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token operator">-</span><span class="token number">10</span><span class="token operator">...</span><span class="token number">30</span><span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line">        <span class="token function">completion</span><span class="token punctuation">(</span>results<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">calculateAverageTemperature</span><span class="token punctuation">(</span><span class="token keyword">for</span> records<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">Double</span><span class="token punctuation">]</span><span class="token punctuation">,</span> completion<span class="token punctuation">:</span> <span class="token attribute atrule">@escaping</span> <span class="token punctuation">(</span><span class="token class-name">Double</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Sum our array then divide by the array size</span></span>
<span class="line">    <span class="token class-name">DispatchQueue</span><span class="token punctuation">.</span><span class="token function">global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">async</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> total <span class="token operator">=</span> records<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">+</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">let</span> average <span class="token operator">=</span> total <span class="token operator">/</span> <span class="token class-name">Double</span><span class="token punctuation">(</span>records<span class="token punctuation">.</span>count<span class="token punctuation">)</span></span>
<span class="line">        <span class="token function">completion</span><span class="token punctuation">(</span>average<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">upload</span><span class="token punctuation">(</span>result<span class="token punctuation">:</span> <span class="token class-name">Double</span><span class="token punctuation">,</span> completion<span class="token punctuation">:</span> <span class="token attribute atrule">@escaping</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// More complex networking code; we&#39;ll just send back &quot;OK&quot;</span></span>
<span class="line">    <span class="token class-name">DispatchQueue</span><span class="token punctuation">.</span><span class="token function">global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">async</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">completion</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;OK&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>I’ve substituted actual networking code with fake values because the networking part isn’t relevant here. What matters is that each of those functions can take some time to run, so rather than blocking execution of the function and returning a value directly we instead use a completion closure to send something back only when we’re ready.</p><p>When it comes to using that code, we need to call them one by one in a chain, providing completion closures for each one to continue the chain, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">fetchWeatherHistory <span class="token punctuation">{</span> records <span class="token keyword">in</span></span>
<span class="line">    <span class="token function">calculateAverageTemperature</span><span class="token punctuation">(</span><span class="token keyword">for</span><span class="token punctuation">:</span> records<span class="token punctuation">)</span> <span class="token punctuation">{</span> average <span class="token keyword">in</span></span>
<span class="line">        <span class="token function">upload</span><span class="token punctuation">(</span>result<span class="token punctuation">:</span> average<span class="token punctuation">)</span> <span class="token punctuation">{</span> response <span class="token keyword">in</span></span>
<span class="line">            <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Server response: </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">response</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Hopefully you can see the problems with this approach:</p><ul><li>It’s possible for those functions to call their completion handler more than once, or forget to call it entirely.</li><li>The parameter syntax <code>@escaping (String) -&gt; Void</code> can be hard to read.</li><li>At the call site we end up with a so-called pyramid of doom, with code increasingly indented for each completion handler.</li><li>Until Swift 5.0 added the <code>Result</code> type, it was harder to send back errors with completion handlers.</li></ul><p>From Swift 5.5, we can now clean up our functions by marking them as asynchronously returning a value rather than relying on completion handlers, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">fetchWeatherHistory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token operator">-&gt;</span> <span class="token punctuation">[</span><span class="token class-name">Double</span><span class="token punctuation">]</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token punctuation">(</span><span class="token number">1</span><span class="token operator">...</span><span class="token number">100_000</span><span class="token punctuation">)</span><span class="token punctuation">.</span>map <span class="token punctuation">{</span> <span class="token omit keyword">_</span> <span class="token keyword">in</span> <span class="token class-name">Double</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token operator">-</span><span class="token number">10</span><span class="token operator">...</span><span class="token number">30</span><span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">calculateAverageTemperature</span><span class="token punctuation">(</span><span class="token keyword">for</span> records<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">Double</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token operator">-&gt;</span> <span class="token class-name">Double</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> total <span class="token operator">=</span> records<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">+</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">let</span> average <span class="token operator">=</span> total <span class="token operator">/</span> <span class="token class-name">Double</span><span class="token punctuation">(</span>records<span class="token punctuation">.</span>count<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> average</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">upload</span><span class="token punctuation">(</span>result<span class="token punctuation">:</span> <span class="token class-name">Double</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token operator">-&gt;</span> <span class="token class-name">String</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token string-literal"><span class="token string">&quot;OK&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That has already removed a lot of the syntax around returning values asynchronously, but at the call site it’s even cleaner:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">processWeather</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> records <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetchWeatherHistory</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">let</span> average <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">calculateAverageTemperature</span><span class="token punctuation">(</span><span class="token keyword">for</span><span class="token punctuation">:</span> records<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">let</span> response <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">upload</span><span class="token punctuation">(</span>result<span class="token punctuation">:</span> average<span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Server response: </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">response</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>As you can see, all the closures and indenting have gone, making for what is sometimes called “straight-line code” – apart from the <code>await</code> keywords, it looks just like synchronous code.</p><p>There are some straightforward, specific rules about the way async functions work:</p><ul><li>Synchronous functions cannot simply call async functions directly – it wouldn’t make sense, so Swift will throw an error.</li><li>Async functions can call other async functions, but they can also call regular synchronous functions if they need to.</li><li>If you have async and synchronous functions that can be called in the same way, Swift will prefer whichever one matches your current context – if the call site is currently async then Swift will call the async function, otherwise it will call the synchronous function.</li></ul><p>That last point is important, because it allows library authors to provide both synchronous and asynchronous versions of their code without having to name the async functions specially.</p><p>The addition of <code>async</code>/<code>await</code> fits perfectly alongside <code>try</code>/<code>catch</code>, meaning that async functions and initializers can throw errors if needed. The only proviso here is that Swift enforces a particular order for the keywords, and that order is <em>reversed</em> between call site and function.</p><p>For example, we might have functions that attempt to fetch a number of users from a server, and save them to disk, both of which might fail by throwing errors:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">enum</span> <span class="token class-name">UserError</span><span class="token punctuation">:</span> <span class="token class-name">Error</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> invalidCount<span class="token punctuation">,</span> dataTooLong</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">fetchUsers</span><span class="token punctuation">(</span>count<span class="token punctuation">:</span> <span class="token class-name">Int</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token keyword">throws</span> <span class="token operator">-&gt;</span> <span class="token punctuation">[</span><span class="token class-name">String</span><span class="token punctuation">]</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> count <span class="token operator">&gt;</span> <span class="token number">3</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// Don&#39;t attempt to fetch too many users</span></span>
<span class="line">        <span class="token keyword">throw</span> <span class="token class-name">UserError</span><span class="token punctuation">.</span>invalidCount</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Complex networking code here; we&#39;ll just send back up to \`count\` users</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;Antoni&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;Karamo&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;Tan&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">prefix</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">save</span><span class="token punctuation">(</span>users<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">String</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token keyword">throws</span> <span class="token operator">-&gt;</span> <span class="token class-name">String</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> savedUsers <span class="token operator">=</span> users<span class="token punctuation">.</span><span class="token function">joined</span><span class="token punctuation">(</span>separator<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;,&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> savedUsers<span class="token punctuation">.</span>count <span class="token operator">&gt;</span> <span class="token number">32</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">throw</span> <span class="token class-name">UserError</span><span class="token punctuation">.</span>dataTooLong</span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// Actual saving code would go here</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token string-literal"><span class="token string">&quot;Saved </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">savedUsers</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">!&quot;</span></span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>As you can see, both those functions are marked <code>async throws</code> – they are asynchronous functions, and they might throw errors.</p><p>When it comes to <em>calling</em> them the order of keywords is flipped to <code>try await</code> rather than <code>await try</code>, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">updateUsers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">do</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> users <span class="token operator">=</span> <span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token function">fetchUsers</span><span class="token punctuation">(</span>count<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token function">save</span><span class="token punctuation">(</span>users<span class="token punctuation">:</span> users<span class="token punctuation">)</span></span>
<span class="line">        <span class="token function">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Oops!&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>So, “asynchronous, throwing” in the function definition, but “throwing, asynchronous” at the call site – think of it as unwinding a stack. Not only does <code>try await</code> read a little more naturally than <code>await try</code>, but it’s also more reflective of what’s actually happening: we’re waiting for some work to complete, and when it <em>does</em> complete it might end up throwing.</p><p>With async/await now in Swift itself, the <code>Result</code> type introduced in Swift 5.0 becomes much less important as one of its primary benefits was improving completion handlers. That doesn’t mean <code>Result</code> is useless, because it’s still the best way to store the result of an operation for later evaluation.</p><div class="hint-container important"><p class="hint-container-title">Important</p><p>Making a function asynchronous doesn’t mean it magically runs concurrently with other code, which means unless you specify otherwise calling multiple async functions will still run them sequentially.</p></div><p>All the <code>async</code> functions you’ve seen so far have in turn been called by other <code>async</code> functions, which is intentional: taken by itself this Swift Evolution proposal does not actually provide any way to run asynchronous code from a synchronous context. Instead, this functionality is defined in a separate Structured Concurrency proposal, although hopefully we’ll see some major updates to Foundation too.</p>`,26)),a("details",y,[n[9]||(n[9]=a("summary",null,"Other Changes in Swift 5.5",-1)),m(` 
\`\`\`component VPCard
{
  "title": "Async await | Changes in Swift 5.5",
  "desc": "Async await",
  "link": "/hackingwithswift.com/swift/5.5/async-await.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
\`\`\`
`),s(t,e(o({title:"Async sequences | Changes in Swift 5.5",desc:"Async sequences",link:"/hackingwithswift.com/swift/5.5/async-sequences.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"Effectful read-only properties | Changes in Swift 5.5",desc:"Effectful read-only properties",link:"/hackingwithswift.com/swift/5.5/effectful-read-only-properties.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"Structured concurrency | Changes in Swift 5.5",desc:"Structured concurrency",link:"/hackingwithswift.com/swift/5.5/structured-concurrency.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"async let bindings | Changes in Swift 5.5",desc:"async let bindings",link:"/hackingwithswift.com/swift/5.5/async-let-bindings.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"Continuations for interfacing async tasks with synchronous code | Changes in Swift 5.5",desc:"Continuations for interfacing async tasks with synchronous code",link:"/hackingwithswift.com/swift/5.5/continuations.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"Actors | Changes in Swift 5.5",desc:"Actors",link:"/hackingwithswift.com/swift/5.5/actors.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"Global actors | Changes in Swift 5.5",desc:"Global actors",link:"/hackingwithswift.com/swift/5.5/global-actors.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"Sendable and @Sendable closures | Changes in Swift 5.5",desc:"Sendable and @Sendable closures",link:"/hackingwithswift.com/swift/5.5/sendable.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"if for postfix member expressions | Changes in Swift 5.5",desc:"if for postfix member expressions",link:"/hackingwithswift.com/swift/5.5/postfix-if.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"Interchangeable use of CGFloat and Double types | Changes in Swift 5.5",desc:"Interchangeable use of CGFloat and Double types",link:"/hackingwithswift.com/swift/5.5/interchangeable-cgfloat-double.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"Codable synthesis for enums with associated values | Changes in Swift 5.5",desc:"Codable synthesis for enums with associated values",link:"/hackingwithswift.com/swift/5.5/codable-enums.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"lazy now works in local contexts | Changes in Swift 5.5",desc:"lazy now works in local contexts",link:"/hackingwithswift.com/swift/5.5/local-lazy.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"Extending property wrappers to function and closure parameters | Changes in Swift 5.5",desc:"Extending property wrappers to function and closure parameters",link:"/hackingwithswift.com/swift/5.5/property-wrapper-function-parameters.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(t,e(o({title:"Extending static member lookup in generic contexts | Changes in Swift 5.5",desc:"Extending static member lookup in generic contexts",link:"/hackingwithswift.com/swift/5.5/static-member-generic.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a("p",null,[a("a",b,[s(i,{icon:"fas fa-file-zipper"}),n[8]||(n[8]=p("Download Swift 5.5 playground"))])])])])}const C=r(w,[["render",S],["__file","async-await.html.vue"]]),q=JSON.parse('{"path":"/hackingwithswift.com/swift/5.5/async-await.html","title":"Async await","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Async await","description":"Article(s) > Async await","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","swift","swift-5.5"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Async await"},{"property":"og:description","content":"Async await"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.5/async-await.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.5/async-await.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Async await"}],["meta",{"property":"og:description","content":"Article(s) > Async await"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.5"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Async await\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"prev":"/hackingwithswift.com/swift/5.6/swiftpm-plugins.md","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":5.62,"words":1687},"filePathRelative":"hackingwithswift.com/swift/5.5/async-await.md","excerpt":"\\n"}');export{C as comp,q as data};