import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as r,am as s,as as d,ao as a,at as e,au as o,al as c,an as k,aq as p,ar as m}from"./app-CpYYKbnj.js";const h={},w={id:"frontmatter-title-관련",tabindex:"-1"},v={class:"header-anchor",href:"#frontmatter-title-관련"},f={href:"https://hackingwithswift.com/files/projects/concurrency/how-to-use-continuations-to-convert-completion-handlers-into-async-functions-1.zip",target:"_blank",rel:"noopener noreferrer"},g={class:"hint-container details"};function y(i,n){const t=p("VPCard"),l=p("FontIcon");return m(),r("div",null,[s("h1",w,[s("a",v,[s("span",null,d(i.$frontmatter.title)+" 관련",1)])]),a(t,e(o({title:"Swift Concurrency by Example",desc:"Back to Home",link:"/hackingwithswift.com/concurrency/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[2]||(n[2]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[3]||(n[3]=s("hr",null,null,-1)),a(t,e(o({title:"How to use continuations to convert completion handlers into async functions | Swift Concurrency by Example",desc:"How to use continuations to convert completion handlers into async functions",link:"https://hackingwithswift.com/quick-start/concurrency/how-to-use-continuations-to-convert-completion-handlers-into-async-functions",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[4]||(n[4]=c(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>Older Swift code uses completion handlers for notifying us when some work has completed, and sooner or later you’re going to have to use it from an <code>async</code> function – either because you’re using a library someone else created, or because it’s one of your own functions but updating it to async would take a lot of work.</p><p>Swift uses <em>continuations</em> to solve this problem, allowing us to create a bridge between older functions with completion handlers and newer async code.</p><p>To demonstrate this problem, here’s some code that attempts to fetch some JSON from a web server, decode it into an array of <code>Message</code> structs, then send it back using a completion handler:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">Message</span><span class="token punctuation">:</span> <span class="token class-name">Decodable</span><span class="token punctuation">,</span> <span class="token class-name">Identifiable</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> id<span class="token punctuation">:</span> <span class="token class-name">Int</span></span>
<span class="line">    <span class="token keyword">let</span> from<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line">    <span class="token keyword">let</span> message<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">fetchMessages</span><span class="token punctuation">(</span>completion<span class="token punctuation">:</span> <span class="token attribute atrule">@escaping</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token class-name">Message</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;https://hws.dev/user-messages.json&quot;</span></span><span class="token punctuation">)</span><span class="token operator">!</span></span>
<span class="line"></span>
<span class="line">    <span class="token class-name">URLSession</span><span class="token punctuation">.</span>shared<span class="token punctuation">.</span><span class="token function">dataTask</span><span class="token punctuation">(</span>with<span class="token punctuation">:</span> url<span class="token punctuation">)</span> <span class="token punctuation">{</span> data<span class="token punctuation">,</span> response<span class="token punctuation">,</span> error <span class="token keyword">in</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token keyword">let</span> data <span class="token operator">=</span> data <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token keyword">let</span> messages <span class="token operator">=</span> <span class="token keyword">try</span><span class="token operator">?</span> <span class="token class-name">JSONDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token class-name">Message</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token function">completion</span><span class="token punctuation">(</span>messages<span class="token punctuation">)</span></span>
<span class="line">                <span class="token keyword">return</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token function">completion</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">resume</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Although the <code>dataTask(with:)</code> method does run our code on its own thread, this is <em>not</em> an async function in the sense of Swift’s async/await feature, which means it’s going to be messy to integrate into other code that <em>does</em> use modern async Swift.</p><p>To fix this, Swift provides us with <em>continuations</em>, which are special objects we pass into the completion handlers as captured values. Once the completion handler fires, we can either return the finished value, throw an error, or send back a <code>Result</code> that can be handled elsewhere.</p><p>In the case of <code>fetchMessages()</code>, we want to write a new async function that calls the original, and in its completion handler we’ll return whatever value was sent back:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">Message</span><span class="token punctuation">:</span> <span class="token class-name">Decodable</span><span class="token punctuation">,</span> <span class="token class-name">Identifiable</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> id<span class="token punctuation">:</span> <span class="token class-name">Int</span></span>
<span class="line">    <span class="token keyword">let</span> from<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line">    <span class="token keyword">let</span> message<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">fetchMessages</span><span class="token punctuation">(</span>completion<span class="token punctuation">:</span> <span class="token attribute atrule">@escaping</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token class-name">Message</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;https://hws.dev/user-messages.json&quot;</span></span><span class="token punctuation">)</span><span class="token operator">!</span></span>
<span class="line"></span>
<span class="line">    <span class="token class-name">URLSession</span><span class="token punctuation">.</span>shared<span class="token punctuation">.</span><span class="token function">dataTask</span><span class="token punctuation">(</span>with<span class="token punctuation">:</span> url<span class="token punctuation">)</span> <span class="token punctuation">{</span> data<span class="token punctuation">,</span> response<span class="token punctuation">,</span> error <span class="token keyword">in</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token keyword">let</span> data <span class="token operator">=</span> data <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token keyword">let</span> messages <span class="token operator">=</span> <span class="token keyword">try</span><span class="token operator">?</span> <span class="token class-name">JSONDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token class-name">Message</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token function">completion</span><span class="token punctuation">(</span>messages<span class="token punctuation">)</span></span>
<span class="line">                <span class="token keyword">return</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token function">completion</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">resume</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">fetchMessages</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token operator">-&gt;</span> <span class="token punctuation">[</span><span class="token class-name">Message</span><span class="token punctuation">]</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">await</span> withCheckedContinuation <span class="token punctuation">{</span> continuation <span class="token keyword">in</span></span>
<span class="line">        fetchMessages <span class="token punctuation">{</span> messages <span class="token keyword">in</span></span>
<span class="line">            continuation<span class="token punctuation">.</span><span class="token function">resume</span><span class="token punctuation">(</span>returning<span class="token punctuation">:</span> messages<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">let</span> messages <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetchMessages</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Downloaded </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">messages<span class="token punctuation">.</span>count</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string"> messages.&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9)),s("blockquote",null,[s("p",null,[s("a",f,[a(l,{icon:"fas fa-file-zipper"}),n[0]||(n[0]=k("Download this as an Xcode project"))])])]),n[5]||(n[5]=c(`<p>As you can see, starting a continuation is done using the <code>withCheckedContinuation()</code> function, which passes into itself the continuation we need to work with. It’s called a “checked” continuation because Swift checks that we’re using the continuation correctly, which means abiding by one very simple, very important rule:</p><p>**Your continuation must be resumed exactly once. Not zero times, and not twice or more times – exactly once.how-to-create-continuations-that-can-throw-errors</p><p>If you call the checked continuation twice or more, Swift will cause your program to halt – it will just crash. I realize this sounds bad, but when the alternative is to have some bizarre, unpredictable behavior, crashing doesn’t sound so bad.</p><p>On the other hand, if you fail to resume the continuation at all, Swift will print out a large warning in your debug log similar to this: “SWIFT TASK CONTINUATION MISUSE: fetchMessages() leaked its continuation!” This is because you’re leaving the task suspended, causing any resources it’s using to be held indefinitely.</p><p>You might think these are easy mistakes to avoid, but in practice they can occur in all sorts of places if you aren’t careful.</p><p>For example, in our original <code>fetchMessages()</code> method we used this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">Message</span><span class="token punctuation">:</span> <span class="token class-name">Decodable</span><span class="token punctuation">,</span> <span class="token class-name">Identifiable</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> id<span class="token punctuation">:</span> <span class="token class-name">Int</span></span>
<span class="line">    <span class="token keyword">let</span> from<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line">    <span class="token keyword">let</span> message<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">fetchMessages</span><span class="token punctuation">(</span>completion<span class="token punctuation">:</span> <span class="token attribute atrule">@escaping</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token class-name">Message</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;https://hws.dev/user-messages.json&quot;</span></span><span class="token punctuation">)</span><span class="token operator">!</span></span>
<span class="line"></span>
<span class="line">    <span class="token class-name">URLSession</span><span class="token punctuation">.</span>shared<span class="token punctuation">.</span><span class="token function">dataTask</span><span class="token punctuation">(</span>with<span class="token punctuation">:</span> url<span class="token punctuation">)</span> <span class="token punctuation">{</span> data<span class="token punctuation">,</span> response<span class="token punctuation">,</span> error <span class="token keyword">in</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token keyword">let</span> data <span class="token operator">=</span> data <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token keyword">let</span> messages <span class="token operator">=</span> <span class="token keyword">try</span><span class="token operator">?</span> <span class="token class-name">JSONDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token class-name">Message</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token function">completion</span><span class="token punctuation">(</span>messages<span class="token punctuation">)</span></span>
<span class="line">                <span class="token keyword">return</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token function">completion</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">resume</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">fetchMessages</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token operator">-&gt;</span> <span class="token punctuation">[</span><span class="token class-name">Message</span><span class="token punctuation">]</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">await</span> withCheckedContinuation <span class="token punctuation">{</span> continuation <span class="token keyword">in</span></span>
<span class="line">        fetchMessages <span class="token punctuation">{</span> messages <span class="token keyword">in</span></span>
<span class="line">            continuation<span class="token punctuation">.</span><span class="token function">resume</span><span class="token punctuation">(</span>returning<span class="token punctuation">:</span> messages<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">let</span> messages <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetchMessages</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Downloaded </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">messages<span class="token punctuation">.</span>count</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string"> messages.&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That checks for data coming back, and checks that it can be decoded correctly, before completing and returning, but if either of those two checks fail then the completion handler is called with an empty array – no matter what happens, the completion handler gets called.</p><p>But what if we had written something different? See if you can spot the problem with this alternative:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">if</span> <span class="token keyword">let</span> data <span class="token operator">=</span> data <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token keyword">let</span> messages <span class="token operator">=</span> <span class="token keyword">try</span><span class="token operator">?</span> <span class="token class-name">JSONDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token class-name">Message</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">completion</span><span class="token punctuation">(</span>messages<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">completion</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That attempts to decode the JSON into a <code>Message</code> array and send back the result using the completion handler, or send back an empty array if nothing came back from the server. However, it has a mistake that will cause problems with continuations: if some valid data comes back but <em>can’t</em> be decoded into an array of messages, the completion handler will never be called and our continuation will be leaked.</p><p>These two code samples are fairly similar, which shows how important it is to be careful with your continuations. However, if you have checked your code carefully and you’re sure it is correct, you can if you want replace the <code>withCheckedContinuation()</code> function with a call to <code>withUnsafeContinuation()</code>, which works exactly the same way but doesn’t add the runtime cost of checking you’ve used the continuation correctly.</p><p>I say you can do this <em>if you want</em>, but I’m dubious about the benefit. It’s easy to say “I know my code is safe, go for it!” but I’d be wary about moving across to unsafe code unless you had profiled your code using Instruments and were quite sure Swift’s extra checks were causing a performance problem.</p>`,13)),s("details",g,[n[1]||(n[1]=s("summary",null,"Similar solutions…",-1)),a(t,e(o({title:"How to store continuations to be resumed later | Swift Concurrency by Example",desc:"How to store continuations to be resumed later",link:"/hackingwithswift.com/concurrency/how-to-store-continuations-to-be-resumed-later.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"How to create continuations that can throw errors | Swift Concurrency by Example",desc:"How to create continuations that can throw errors",link:"/hackingwithswift.com/concurrency/how-to-create-continuations-that-can-throw-errors.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"Why can’t we call async functions using async var? | Swift Concurrency by Example",desc:"Why can’t we call async functions using async var?",link:"/hackingwithswift.com/concurrency/why-cant-we-call-async-functions-using-async-var.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"How to call an async function using async let | Swift Concurrency by Example",desc:"How to call an async function using async let",link:"/hackingwithswift.com/concurrency/how-to-call-an-async-function-using-async-let.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"How to call async throwing functions | Swift Concurrency by Example",desc:"How to call async throwing functions",link:"/hackingwithswift.com/concurrency/how-to-call-async-throwing-functions.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const M=u(h,[["render",y],["__file","how-to-use-continuations-to-convert-completion-handlers-into-async-functions.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/concurrency/how-to-use-continuations-to-convert-completion-handlers-into-async-functions.html","title":"How to use continuations to convert completion handlers into async functions","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to use continuations to convert completion handlers into async functions","description":"Article(s) > How to use continuations to convert completion handlers into async functions","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to use continuations to convert completion handlers into async functions"},{"property":"og:description","content":"How to use continuations to convert completion handlers into async functions"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/concurrency/how-to-use-continuations-to-convert-completion-handlers-into-async-functions.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/concurrency/how-to-use-continuations-to-convert-completion-handlers-into-async-functions.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to use continuations to convert completion handlers into async functions"}],["meta",{"property":"og:description","content":"Article(s) > How to use continuations to convert completion handlers into async functions"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2021-11-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to use continuations to convert completion handlers into async functions\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-11-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2021-11-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":4.5,"words":1351},"filePathRelative":"hackingwithswift.com/concurrency/how-to-use-continuations-to-convert-completion-handlers-into-async-functions.md","localizedDate":"2021년 11월 28일","excerpt":"\\n"}');export{M as comp,x as data};