import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as m,am as s,as as k,ao as a,at as h,au as v,ap as l,al as i,an as e,aq as c,ar as g}from"./app-CpYYKbnj.js";const y={},w={id:"frontmatter-title-관련",tabindex:"-1"},b={class:"header-anchor",href:"#frontmatter-title-관련"},f={class:"table-of-contents"},T={href:"https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/lock",target:"_blank",rel:"noopener noreferrer"},A={href:"https://learn.microsoft.com/en-us/dotnet/api/system.threading.semaphore?view=net-6.0",target:"_blank",rel:"noopener noreferrer"},S={href:"https://learn.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim?view=net-6.0",target:"_blank",rel:"noopener noreferrer"},C={href:"https://learn.microsoft.com/en-us/dotnet/api/system.threading.monitor?view=net-6.0",target:"_blank",rel:"noopener noreferrer"},x={href:"https://learn.microsoft.com/en-us/dotnet/api/system.threading.mutex?view=net-6.0",target:"_blank",rel:"noopener noreferrer"},L={href:"https://learn.microsoft.com/en-us/dotnet/api/system.threading.readerwriterlock?view=net-6.0",target:"_blank",rel:"noopener noreferrer"};function I(p,n){const r=c("VPCard"),o=c("router-link"),d=c("SiteInfo"),t=c("FontIcon");return g(),m("div",null,[s("h1",w,[s("a",b,[s("span",null,k(p.$frontmatter.title)+" 관련",1)])]),a(r,h(v({title:"C# > Article(s)",desc:"Article(s)",link:"/programming/cs/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),s("nav",f,[s("ul",null,[s("li",null,[a(o,{to:"#the-c-lock-statement"},{default:l(()=>n[0]||(n[0]=[e("The C# Lock Statement")])),_:1})]),s("li",null,[a(o,{to:"#locking-with-semaphore"},{default:l(()=>n[1]||(n[1]=[e("Locking With Semaphore")])),_:1})]),s("li",null,[a(o,{to:"#asynchronous-locking-with-semaphoreslim"},{default:l(()=>n[2]||(n[2]=[e("Asynchronous Locking With SemaphoreSlim")])),_:1})]),s("li",null,[a(o,{to:"#are-there-other-options-for-locking-in-net"},{default:l(()=>n[3]||(n[3]=[e("Are There Other Options For Locking in .NET?")])),_:1})])])]),n[31]||(n[31]=s("hr",null,null,-1)),a(d,{name:"Introduction To Locking And Concurrency Control in .NET 6",desc:"In this week's newsletter, we'll see how we can work with locking in .NET 6. We won't talk about how the lock is actually implemented at the operating system level. We will focus on application-level locking mechanisms instead. Locking allows us to control how many threads can access some piece of code. Why would you want to do this?",url:"https://milanjovanovic.tech/blog/introduction-to-locking-and-concurrency-control-in-dotnet-6/",logo:"https://milanjovanovic.tech/profile_favicon.png",preview:"https://milanjovanovic.tech/blog-covers/mnw_008.png"}),n[32]||(n[32]=i('<p>In this week&#39;s newsletter, we&#39;ll see how we can work with <strong>locking</strong> in <strong>.NET 6</strong>.</p><p>We won&#39;t talk about how the lock is actually implemented at the operating system level. Instead, I will focus on application-level <strong>locking</strong> mechanisms.</p><p><strong>Locking</strong> allows us to control how many <strong>threads</strong> can access some piece of code. Why would you want to do this?</p><p>Usually because you want to protect access to <strong>expensive resources</strong>, and you need the <strong>concurrency control</strong> that locking enables.</p><p>We will use a simple <code>BankAccount</code> class with a <code>Deposit</code> method to illustrate how to implement locking.</p><hr><h2 id="the-c-lock-statement" tabindex="-1"><a class="header-anchor" href="#the-c-lock-statement"><span>The C# Lock Statement</span></a></h2>',7)),s("p",null,[n[6]||(n[6]=e("The C# language supports locking with the ")),s("a",T,[a(t,{icon:"fa-brands fa-microsoft"}),n[4]||(n[4]=s("code",null,"lock",-1)),n[5]||(n[5]=e(" statement"))]),n[7]||(n[7]=e(". You can use the ")),n[8]||(n[8]=s("code",null,"lock",-1)),n[9]||(n[9]=e(" statement to define a code block that only one thread can access."))]),n[33]||(n[33]=i(`<p>The <code>lock</code> statement acquires a mutual-exclusion lock (mutex) for a given object, executes the statement block, and releases the lock.</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">lock</span><span class="token punctuation">(</span>_lock<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">   <span class="token comment">// Your code...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Here <code>_lock</code> is a reference type, usually an <code>object</code> instance.</p><p>Let&#39;s see how we can implement the <code>BankAccount</code> class using the <code>lock</code> statement:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BankAccount</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">object</span></span> _lock <span class="token operator">=</span> <span class="token keyword">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">   <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">decimal</span></span> _balance<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">   <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Deposit</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">decimal</span></span> amount<span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">lock</span><span class="token punctuation">(</span>_lock<span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">         _balance <span class="token operator">+=</span> amount<span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The first thread to reach and execute the <code>lock</code> statement will be allowed to update the <code>_balance</code>. Any other threads will block until the lock is released.</p><hr><h2 id="locking-with-semaphore" tabindex="-1"><a class="header-anchor" href="#locking-with-semaphore"><span>Locking With Semaphore</span></a></h2>`,8)),s("p",null,[n[11]||(n[11]=e("The ")),s("a",A,[a(t,{icon:"fa-brands fa-microsoft"}),n[10]||(n[10]=s("code",null,"Semaphore",-1))]),n[12]||(n[12]=e(" class is another option we can use to achieve the same effect."))]),n[34]||(n[34]=i(`<p>We&#39;ll use the <code>Semaphore</code> constructor to set the <code>initialCount</code> to 0, which means that the <code>Semaphore</code> is open at the start. And we will also set the <code>maximumCount</code> to 1, which means that only one thread is allowed to enter the <code>Semaphore</code>.</p><p>Let&#39;s see how we can implement the <code>BankAccount</code> class using the <code>Semaphore</code>:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BankAccount</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token class-name">Semaphore</span> _semaphore <span class="token operator">=</span> <span class="token keyword">new</span><span class="token punctuation">(</span></span>
<span class="line">      <span class="token named-parameter punctuation">initialCount</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token named-parameter punctuation">maximumCount</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">   <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">decimal</span></span> _balance<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">   <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Deposit</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">decimal</span></span> amount<span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">{</span></span>
<span class="line">      _semaphore<span class="token punctuation">.</span><span class="token function">WaitOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">      _balance <span class="token operator">+=</span> amount<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">      _semaphore<span class="token punctuation">.</span><span class="token function">Release</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To enter the <code>Semaphore</code>, we have to call the <code>WaitOne</code> method.</p><p>If no thread was previously inside, our thread is allowed to enter the <code>Semaphore</code> and update the balance.</p><p>After updating the balance, we call the <code>Release</code> method to release the <code>Semaphore</code> for other threads that might be waiting.</p><hr><h2 id="asynchronous-locking-with-semaphoreslim" tabindex="-1"><a class="header-anchor" href="#asynchronous-locking-with-semaphoreslim"><span>Asynchronous Locking With SemaphoreSlim</span></a></h2><p>What if we wanted to call an asynchronous method in a locked context?</p><p>We can&#39;t use the <code>lock</code> statement as it doesn&#39;t support asynchronous calls. Awaiting an asynchronous call inside a <code>lock</code> statement will cause a compilation error.</p><p>The <code>Semaphore</code> class can solve this problem.</p>`,11)),s("p",null,[n[14]||(n[14]=e("But I want to show you another option that we have, ")),s("a",S,[a(t,{icon:"fa-brands fa-microsoft"}),n[13]||(n[13]=s("code",null,"SemaphoreSlim",-1))]),n[15]||(n[15]=e(". It's a lightweight alternative to the ")),n[16]||(n[16]=s("code",null,"Semaphore",-1)),n[17]||(n[17]=e(" class and has ")),n[18]||(n[18]=s("code",null,"async",-1)),n[19]||(n[19]=e(" methods."))]),n[35]||(n[35]=i(`<p>Let&#39;s see how we can implement the <code>BankAccount</code> class using <code>SemaphoreSlim</code>:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BankAccount</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token class-name">SemaphoreSlim</span> _semaphore <span class="token operator">=</span> <span class="token keyword">new</span><span class="token punctuation">(</span></span>
<span class="line">      <span class="token named-parameter punctuation">initialCount</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token named-parameter punctuation">maximumCount</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">   <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">decimal</span></span> _balance<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">   <span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">Deposit</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">decimal</span></span> amount<span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">await</span> _semaphore<span class="token punctuation">.</span><span class="token function">WaitAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">      _balance <span class="token operator">+=</span> amount<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">      _semaphore<span class="token punctuation">.</span><span class="token function">Release</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Notice that I updated the <code>Deposit</code> method to return a <code>Task</code>.</p><p>This time, we&#39;re calling <code>WaitAsync</code> to block the current thread until it can enter the semaphore.</p><p>After updating the balance, we call the <code>Release</code> method to release the <code>SemaphoreSlim</code> like in the previous example.</p><hr><h2 id="are-there-other-options-for-locking-in-net" tabindex="-1"><a class="header-anchor" href="#are-there-other-options-for-locking-in-net"><span>Are There Other Options For Locking in .NET?</span></a></h2><p>So far I mentioned three options to implement locking:</p><ul><li><a href="#the-c-lock-statement"><code>lock</code> statement</a></li><li><a href="#locking-with-semaphore"><code>Semaphore</code></a></li><li><a href="#asynchronous-locking-with-semaphoreslim"><code>SemaphoreSlim</code></a></li></ul>`,9)),s("p",null,[n[23]||(n[23]=e("However, ")),n[24]||(n[24]=s("strong",null,".NET",-1)),n[25]||(n[25]=e(" has other classes for ")),n[26]||(n[26]=s("strong",null,"concurrency control",-1)),n[27]||(n[27]=e(" that you can explore like ")),s("a",C,[a(t,{icon:"fa-brands fa-microsoft"}),n[20]||(n[20]=s("code",null,"Monitor",-1))]),n[28]||(n[28]=e(", ")),s("a",x,[a(t,{icon:"fa-brands fa-microsoft"}),n[21]||(n[21]=s("code",null,"Mutex",-1))]),n[29]||(n[29]=e(", ")),s("a",L,[a(t,{icon:"fa-brands fa-microsoft"}),n[22]||(n[22]=s("code",null,"ReaderWriterLock",-1))]),n[30]||(n[30]=e(" and many more."))]),n[36]||(n[36]=s("p",null,"I hope you enjoyed this brief introduction to a very complex topic.",-1))])}const E=u(y,[["render",I],["__file","introduction-to-locking-and-concurrency-control-in-dotnet-6.html.vue"]]),W=JSON.parse('{"path":"/milanjovanovic.tech/introduction-to-locking-and-concurrency-control-in-dotnet-6.html","title":"Introduction To Locking And Concurrency Control in .NET 6","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Introduction To Locking And Concurrency Control in .NET 6","description":"Article(s) > Introduction To Locking And Concurrency Control in .NET 6","icon":"iconfont icon-csharp","category":["C#","DotNet","Article(s)"],"tag":["blog","milanjovanovic.tech","cs","c#","csharp","dotnet"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Introduction To Locking And Concurrency Control in .NET 6"},{"property":"og:description","content":"Introduction To Locking And Concurrency Control in .NET 6"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/introduction-to-locking-and-concurrency-control-in-dotnet-6.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/introduction-to-locking-and-concurrency-control-in-dotnet-6.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Introduction To Locking And Concurrency Control in .NET 6"}],["meta",{"property":"og:description","content":"Article(s) > Introduction To Locking And Concurrency Control in .NET 6"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://milanjovanovic.tech/blog-covers/mnw_008.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://milanjovanovic.tech/blog-covers/mnw_008.png"}],["meta",{"name":"twitter:image:alt","content":"Introduction To Locking And Concurrency Control in .NET 6"}],["meta",{"property":"article:author","content":"Milan Jovanović"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"milanjovanovic.tech"}],["meta",{"property":"article:tag","content":"cs"}],["meta",{"property":"article:tag","content":"c#"}],["meta",{"property":"article:tag","content":"csharp"}],["meta",{"property":"article:tag","content":"dotnet"}],["meta",{"property":"article:published_time","content":"2022-10-22T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Introduction To Locking And Concurrency Control in .NET 6\\",\\"image\\":[\\"https://milanjovanovic.tech/blog-covers/mnw_008.png\\"],\\"datePublished\\":\\"2022-10-22T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Milan Jovanović\\"}]}"]],"prev":"/programming/cs/articles/README.md","date":"2022-10-22T00:00:00.000Z","isOriginal":false,"author":"Milan Jovanović","cover":"https://milanjovanovic.tech/blog-covers/mnw_008.png"},"headers":[{"level":2,"title":"The C# Lock Statement","slug":"the-c-lock-statement","link":"#the-c-lock-statement","children":[]},{"level":2,"title":"Locking With Semaphore","slug":"locking-with-semaphore","link":"#locking-with-semaphore","children":[]},{"level":2,"title":"Asynchronous Locking With SemaphoreSlim","slug":"asynchronous-locking-with-semaphoreslim","link":"#asynchronous-locking-with-semaphoreslim","children":[]},{"level":2,"title":"Are There Other Options For Locking in .NET?","slug":"are-there-other-options-for-locking-in-net","link":"#are-there-other-options-for-locking-in-net","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":3,"words":901},"filePathRelative":"milanjovanovic.tech/introduction-to-locking-and-concurrency-control-in-dotnet-6.md","localizedDate":"2022년 10월 22일","excerpt":"\\n","copyright":{"author":"Milan Jovanović"}}');export{E as comp,W as data};