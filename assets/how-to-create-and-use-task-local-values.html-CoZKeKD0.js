import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as k,am as n,as as d,ao as a,at as o,au as l,al as i,an as t,aq as c,ar as h}from"./app-CpYYKbnj.js";const m={},v={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},g={href:"https://hackingwithswift.com/files/projects/concurrency/how-to-create-and-use-task-local-values-1.zip",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/apple/swift-evolution/blob/main/proposals/0311-task-locals.md",target:"_blank",rel:"noopener noreferrer"},y={href:"https://hackingwithswift.com/files/projects/concurrency/how-to-create-and-use-task-local-values-2.zip",target:"_blank",rel:"noopener noreferrer"},b={href:"https://hws.dev/news-1.json",target:"_blank",rel:"noopener noreferrer"},q={class:"hint-container details"};function x(r,s){const e=c("VPCard"),p=c("FontIcon");return h(),k("div",null,[n("h1",v,[n("a",w,[n("span",null,d(r.$frontmatter.title)+" 관련",1)])]),a(e,o(l({title:"Swift Concurrency by Example",desc:"Back to Home",link:"/hackingwithswift.com/concurrency/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),s[9]||(s[9]=n("nav",{class:"table-of-contents"},[n("ul")],-1)),s[10]||(s[10]=n("hr",null,null,-1)),a(e,o(l({title:"How to create and use task local values | Swift Concurrency by Example",desc:"How to create and use task local values",link:"https://hackingwithswift.com/quick-start/concurrency/how-to-create-and-use-task-local-values",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s[11]||(s[11]=i(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>Swift lets us attach metadata to a task using <em>task-local values</em>, which are small pieces of information that any code inside a task can read. For example, you’ve already seen how we can read <code>Task.isCancelled</code> to see whether the current task is cancelled or not, but that’s not a true static property – it’s scoped to the current task, rather than shared across all tasks. This is the power of task-local values: the ability to create static-like properties inside a task.</p><div class="hint-container important"><p class="hint-container-title">Important</p><p>Most people will not want to use task-local values – if you’re just curious you’re welcome to read on and explore how task-local values work, but honestly they are useful in only a handful of very specific circumstances and if you find them complex I wouldn’t worry too much.</p></div><p>Task-local values are analogous to thread-local values in an old-style multithreading environment: we attach some metadata to our task, and any code running inside that task can read that data as needed. Swift’s implementation is carefully scoped so that you create contexts where the data is available, rather than just injecting it directly into the task, which makes it possible to adjust your metadata over time. However, <em>inside</em> that context all code is able to read your task-local values, regardless of how it’s used.</p><p>Using task-local values happens in four steps:</p><ol><li>Creating a type that has one or more properties we want to make into task-local values. This can be an enum, struct, class, or even actor if you want, but I’d suggest starting with an enum so it’s clear you don’t intend to make instances of the type.</li><li>Marking each of your task-local values with the <code>@TaskLocal</code> property wrapper. These properties can be any type you want, including optionals, but must be marked as <code>static</code>.</li><li>Starting a new task-local scope using <code>YourType.$yourProperty.withValue(someValue) { … }</code>.</li></ol><p>Inside the task-local scope, any time you read <code>YourType.yourProperty</code> you will receive the <em>task-local</em> value for that property – it’s not a regular static property that has a single value shared between all parts of your program, but instead it can return a different value depending on which task tries to read it.</p><p>To demonstrate task-local values in action, I want to give you two examples: the first is a simple toy example that demonstrates the code required to use them and how they work, but the second is a more real-world example that’s actually useful.</p><p>First, our simple example. This will create a <code>User</code> enum with a <code>id</code> property that is marked <code>@TaskLocal</code>, then it will launch a couple of tasks with different values for that user ID. Each task will do exactly the same thing: print the user ID, sleep for a small amount of time, then print the user ID again, which will allow you to see both tasks running at the same time while having their own unique task-local user ID.</p><p>Here’s the code:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">enum</span> <span class="token class-name">User</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@TaskLocal</span> <span class="token keyword">static</span> <span class="token keyword">var</span> id <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Anonymous&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token attribute atrule">@main</span></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">App</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">static</span> <span class="token keyword">func</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token keyword">throws</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Task</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token class-name">User</span><span class="token punctuation">.</span>$id<span class="token punctuation">.</span><span class="token function">withValue</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Piper&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Start of task: </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation"><span class="token class-name">User</span><span class="token punctuation">.</span>id</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token class-name">Task</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>nanoseconds<span class="token punctuation">:</span> <span class="token number">1_000_000</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;End of task: </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation"><span class="token class-name">User</span><span class="token punctuation">.</span>id</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token class-name">Task</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token class-name">User</span><span class="token punctuation">.</span>$id<span class="token punctuation">.</span><span class="token function">withValue</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Alex&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Start of task: </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation"><span class="token class-name">User</span><span class="token punctuation">.</span>id</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token class-name">Task</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>nanoseconds<span class="token punctuation">:</span> <span class="token number">1_000_000</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;End of task: </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation"><span class="token class-name">User</span><span class="token punctuation">.</span>id</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Outside of tasks: </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation"><span class="token class-name">User</span><span class="token punctuation">.</span>id</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11)),n("blockquote",null,[n("p",null,[n("a",g,[a(p,{icon:"fas fa-file-zipper"}),s[0]||(s[0]=t("Download this as an Xcode project"))])])]),s[12]||(s[12]=i("<p>When that code runs it will print:</p><ul><li>Start of task: Alex</li><li>Start of task: Piper</li><li>Outside of tasks: Anonymous</li><li>End of task: Alex</li><li>End of task: Piper</li></ul><p>Of course, because the two tasks run independently of each other you might also find that the order of Piper and Alex switch. The important thing is that each task has its own value for <code>User.id</code> even as they overlap, and code outside the task will continue to use the original value.</p><p>As you can see, Swift makes it impossible to forget about a task-local value you’ve set, because it only exists for the work inside <code>withValue()</code>. This scoping approach also means it’s possible to nest multiple task locals as needed, and you can even shadow task locals – start a scope for one, do some work, then start another nested scope for that same property. so that it temporarily has a different value.</p>",4)),n("p",null,[s[2]||(s[2]=t("In real-world code, task-local values are useful for places where you need to repeatedly pass values around inside your tasks – values that need to be shared within the task, but not across your whole program like a singleton might be. For example, the Swift Evolution proposal for task-local values (")),n("a",f,[a(p,{icon:"iconfont icon-github"}),s[1]||(s[1]=t("https://github.com/apple/swift-evolution/blob/main/proposals/0311-task-locals.md"))]),s[3]||(s[3]=t(") suggests examples such as tracing, mocking, progress monitoring, and more."))]),s[13]||(s[13]=i(`<p>As a more complex example, we could create a simple <code>Logger</code> struct that writes out messages depending on the current level of logging: debug being the lowest log level, then info, warn, error, and finally fatal at the highest level. If we make the log level – which messages to print – be a task-local value, then each of our tasks can have whatever level of logging they want, regardless of what other tasks are doing.</p><p>To make this work we need three things:</p><ol><li>An enum to describe the five levels of logging.</li><li>A <code>Logger</code> struct that is a singleton.</li><li>A task-local property inside <code>Logger</code> to store the current log level. (Even though the logger is a singleton, the log <em>level</em> is task-local.)</li></ol><p>On top of that, we need a couple more things to actually demonstrate the logger in action: a <code>fetch()</code> method that downloads data from a URL and creates various logging messages, and a couple of tasks that call <code>fetch()</code> with different task-local log settings so we can see exactly how it all works.</p><p>Here’s the code:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token comment">// Our five log levels, marked Comparable so we can use &lt; and &gt; with them.</span></span>
<span class="line"><span class="token keyword">enum</span> <span class="token class-name">LogLevel</span><span class="token punctuation">:</span> <span class="token class-name">Comparable</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> debug<span class="token punctuation">,</span> info<span class="token punctuation">,</span> warn<span class="token punctuation">,</span> error<span class="token punctuation">,</span> fatal</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">Logger</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// The log level for an individual task</span></span>
<span class="line">    <span class="token attribute atrule">@TaskLocal</span> <span class="token keyword">static</span> <span class="token keyword">var</span> logLevel <span class="token operator">=</span> <span class="token class-name">LogLevel</span><span class="token punctuation">.</span>info</span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Make this struct a singleton</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">static</span> <span class="token keyword">let</span> shared <span class="token operator">=</span> <span class="token class-name">Logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Print out a message only if it meets or exceeds our log level.</span></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">write</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> message<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">,</span> level<span class="token punctuation">:</span> <span class="token class-name">LogLevel</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> level <span class="token operator">&gt;=</span> <span class="token class-name">Logger</span><span class="token punctuation">.</span>logLevel <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">print</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token attribute atrule">@main</span></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">App</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Returns data from a URL, writing log messages along the way.</span></span>
<span class="line">    <span class="token keyword">static</span> <span class="token keyword">func</span> <span class="token function-definition function">fetch</span><span class="token punctuation">(</span>url urlString<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token keyword">throws</span> <span class="token operator">-&gt;</span> <span class="token class-name">String</span><span class="token operator">?</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Logger</span><span class="token punctuation">.</span>shared<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Preparing request: </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">urlString</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> level<span class="token punctuation">:</span> <span class="token punctuation">.</span>debug<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">if</span> <span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> urlString<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">let</span> <span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token omit keyword">_</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token class-name">URLSession</span><span class="token punctuation">.</span>shared<span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span>from<span class="token punctuation">:</span> url<span class="token punctuation">)</span></span>
<span class="line">            <span class="token class-name">Logger</span><span class="token punctuation">.</span>shared<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Received </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">data<span class="token punctuation">.</span>count</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string"> bytes&quot;</span></span><span class="token punctuation">,</span> level<span class="token punctuation">:</span> <span class="token punctuation">.</span>info<span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">(</span>decoding<span class="token punctuation">:</span> data<span class="token punctuation">,</span> <span class="token keyword">as</span><span class="token punctuation">:</span> UTF8<span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Logger</span><span class="token punctuation">.</span>shared<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;URL </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">urlString</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string"> is invalid&quot;</span></span><span class="token punctuation">,</span> level<span class="token punctuation">:</span> <span class="token punctuation">.</span>error<span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token nil constant">nil</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Starts a couple of fire-and-forget tasks with different log levels.</span></span>
<span class="line">    <span class="token keyword">static</span> <span class="token keyword">func</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token keyword">throws</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Task</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token class-name">Logger</span><span class="token punctuation">.</span>$logLevel<span class="token punctuation">.</span><span class="token function">withValue</span><span class="token punctuation">(</span><span class="token punctuation">.</span>debug<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;https://hws.dev/news-1.json&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token class-name">Task</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token class-name">Logger</span><span class="token punctuation">.</span>$logLevel<span class="token punctuation">.</span><span class="token function">withValue</span><span class="token punctuation">(</span><span class="token punctuation">.</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;https:\\\\hws.dev/news-1.json&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6)),n("blockquote",null,[n("p",null,[n("a",y,[a(p,{icon:"fas fa-file-zipper"}),s[4]||(s[4]=t("Download this as an Xcode project"))])])]),n("p",null,[s[6]||(s[6]=t("When that runs you’ll see “Preparing request: ")),n("a",b,[a(p,{icon:"iconfont icon-json"}),s[5]||(s[5]=t("https://hws.dev/news-1.json"))]),s[7]||(s[7]=t("” as the first task starts, then “URL https:\\hws.dev/news-1.json is invalid” as the second task starts (I used a back slash rather than forward slash), then “Received 8075 bytes” as the first task finishes downloading its data."))]),s[14]||(s[14]=i("<p>So, here our <code>fetch()</code> method doesn’t even need to know that a task-local value is being used – it just calls the <code>Logger</code> singleton, which in turn refers to the task-local value.</p><p>To finish up, I want to leave you with a few important tips for using task-local values:</p><ol><li>It’s okay to access a task-local value outside of a <code>withValue()</code> scope – you’ll just get back whatever default value you gave it.</li><li>Although regular tasks inherit task-local values of their parent task, detached tasks do <em>not</em> because they don’t have a parent.</li><li>Task-local values are read-only; you can only modify them by calling <code>withValue()</code> as shown above.</li></ol><p>And finally, one important quote from the Swift Evolution proposal for this feature: “please be careful with the use of task-locals and don&#39;t use them in places where plain-old parameter passing would have done the job.” Put more plainly, if task locals are the answer, there’s a very good chance you’re asking the wrong question.</p>",4)),n("details",q,[s[8]||(s[8]=n("summary",null,"Similar solutions…",-1)),a(e,o(l({title:"What’s the difference between a task and a detached task? | Swift Concurrency by Example",desc:"What’s the difference between a task and a detached task?",link:"/hackingwithswift.com/concurrency/whats-the-difference-between-a-task-and-a-detached-task.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(e,o(l({title:"What’s the difference between async let, tasks, and task groups? | Swift Concurrency by Example",desc:"What’s the difference between async let, tasks, and task groups?",link:"/hackingwithswift.com/concurrency/whats-the-difference-between-async-let-tasks-and-task-groups.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(e,o(l({title:"How to create and run a task | Swift Concurrency by Example",desc:"How to create and run a task",link:"/hackingwithswift.com/concurrency/how-to-create-and-run-a-task.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(e,o(l({title:"How to run tasks using SwiftUI’s task() modifier | Swift Concurrency by Example",desc:"How to run tasks using SwiftUI’s task() modifier",link:"/hackingwithswift.com/concurrency/how-to-run-tasks-using-swiftuis-task-modifier.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(e,o(l({title:"How to create a task group and add tasks to it | Swift Concurrency by Example",desc:"How to create a task group and add tasks to it",link:"/hackingwithswift.com/concurrency/how-to-create-a-task-group-and-add-tasks-to-it.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const T=u(m,[["render",x],["__file","how-to-create-and-use-task-local-values.html.vue"]]),A=JSON.parse('{"path":"/hackingwithswift.com/concurrency/how-to-create-and-use-task-local-values.html","title":"How to create and use task local values","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to create and use task local values","description":"Article(s) > How to create and use task local values","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to create and use task local values"},{"property":"og:description","content":"How to create and use task local values"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/concurrency/how-to-create-and-use-task-local-values.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/concurrency/how-to-create-and-use-task-local-values.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to create and use task local values"}],["meta",{"property":"og:description","content":"Article(s) > How to create and use task local values"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2021-11-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to create and use task local values\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-11-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2021-11-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":6.19,"words":1858},"filePathRelative":"hackingwithswift.com/concurrency/how-to-create-and-use-task-local-values.md","localizedDate":"2021년 11월 28일","excerpt":"\\n"}');export{T as comp,A as data};