import{_ as k}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as g,am as s,as as m,ao as a,at as v,au as h,ap as i,al as r,an as e,aq as t,ar as b}from"./app-CpYYKbnj.js";const y={},w={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},T={class:"table-of-contents"},S={href:"https://learn.microsoft.com/en-us/dotnet/api/system.threading.periodictimer?view=net-6.0",target:"_blank",rel:"noopener noreferrer"},A={href:"https://youtu.be/XALvnX7MPeo",target:"_blank",rel:"noopener noreferrer"};function I(l,n){const u=t("VPCard"),o=t("router-link"),c=t("SiteInfo"),p=t("FontIcon"),d=t("VidStack");return b(),g("div",null,[s("h1",w,[s("a",f,[s("span",null,m(l.$frontmatter.title)+" 관련",1)])]),a(u,v(h({title:"C# > Article(s)",desc:"Article(s)",link:"/programming/cs/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),s("nav",T,[s("ul",null,[s("li",null,[a(o,{to:"#background-tasks-with-ihostedservice"},{default:i(()=>n[0]||(n[0]=[e("Background Tasks With IHostedService")])),_:1})]),s("li",null,[a(o,{to:"#background-tasks-with-backgroundservice"},{default:i(()=>n[1]||(n[1]=[e("Background Tasks With BackgroundService")])),_:1})]),s("li",null,[a(o,{to:"#periodic-background-tasks"},{default:i(()=>n[2]||(n[2]=[e("Periodic Background Tasks")])),_:1})]),s("li",null,[a(o,{to:"#what-if-you-need-a-more-robust-solution"},{default:i(()=>n[3]||(n[3]=[e("What If You Need A More Robust Solution?")])),_:1})])])]),n[12]||(n[12]=s("hr",null,null,-1)),a(c,{name:"Running Background Tasks In ASP.NET Core",desc:"In this week's newsletter we will talk about running background tasks in ASP .NET Core. After reading this newsletter, you will be able to set up a background task and have it up and running within minutes. Background tasks are used to offload some work in your application to the background, outside of the normal application flow. A typical example can be asynchronously processing messages from a queue. I will show you how to create a simple background task that runs once and completes. And you will also see how to configure a continuous background task, that repeats after a specific period.",url:"https://milanjovanovic.tech/blog/running-background-tasks-in-asp-net-core/",logo:"https://milanjovanovic.tech/profile_favicon.png",preview:"https://milanjovanovic.tech/blog-covers/mnw_014.png"}),n[13]||(n[13]=r(`<p>In this week&#39;s newsletter we will talk about running <strong>background tasks</strong> in <strong>ASP.NET Core</strong>. After reading this newsletter, you will be able to set up a <strong>background task</strong> and have it up and running within minutes.</p><p><strong>Background tasks</strong> are used to offload some work in your application to the background, outside of the normal application flow. A typical example can be asynchronously processing messages from a queue.</p><p>I will show you how to create a simple <strong>background task</strong> that runs once and completes.</p><p>And you will also see how to configure a continuous <strong>background task</strong>, that repeats after a specific period.</p><p>Let&#39;s dive in.</p><hr><h2 id="background-tasks-with-ihostedservice" tabindex="-1"><a class="header-anchor" href="#background-tasks-with-ihostedservice"><span>Background Tasks With IHostedService</span></a></h2><p>You can define a <strong>background task</strong> by implementing the <code>IHostedService</code> interface. It has only two methods.</p><p>Here&#39;s what the <code>IHostedService</code> interface looks like:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IHostedService</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token return-type class-name">Task</span> <span class="token function">StartAsync</span><span class="token punctuation">(</span><span class="token class-name">CancellationToken</span> cancellationToken<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token return-type class-name">Task</span> <span class="token function">StopAsync</span><span class="token punctuation">(</span><span class="token class-name">CancellationToken</span> cancellationToken<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>All you have to do is implement the <code>StartAsync</code> and <code>StopAsync</code> methods.</p><p>Inside of <code>StartAsync</code> you would usually perform the background processing. And inside of <code>StopAsync</code> you would perform any cleanup that is necessary, such as disposing of resources.</p><p>To configure the <strong>background task</strong> you have to call the <code>AddHostedService</code> method:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line">builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddHostedService</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>MyBackgroundTask<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Calling <code>AddHostedService</code> will configure the <strong>background task</strong> as a <strong>singleton</strong> service.</p><p>So does dependency injection still work in <code>IHostedService</code> implementations?<br>Yes, but you can only inject <strong>transient</strong> or <strong>singleton</strong> services.</p><p>However, I don&#39;t like to implement the <code>IHostedService</code> interface myself. I prefer using the <code>BackgroundService</code> class instead.</p><hr><h2 id="background-tasks-with-backgroundservice" tabindex="-1"><a class="header-anchor" href="#background-tasks-with-backgroundservice"><span>Background Tasks With BackgroundService</span></a></h2><p>The <code>BackgroundService</code> class already implements the <code>IHostedService</code> interface, and it has an <code>abstract</code> method that you need to override - <code>ExecuteAsync</code>. When you are using the <code>BackgroundService</code> class, you only have to think about the operation you want to implement.</p><p>Here&#39;s an example <strong>background task</strong> that runs <strong>EF</strong> migrations:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RunEfMigrationsBackgroundTask</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">BackgroundService</span></span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">IServiceProvider</span> _serviceProvider<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token function">RunEfMigrationsBackgroundTask</span><span class="token punctuation">(</span><span class="token class-name">IServiceProvider</span> serviceProvider<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        _serviceProvider <span class="token operator">=</span> serviceProvider<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">ExecuteAsync</span><span class="token punctuation">(</span><span class="token class-name">CancellationToken</span> stoppingToken<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">using</span> <span class="token class-name">IServiceScope</span> scope <span class="token operator">=</span> _serviceProvider<span class="token punctuation">.</span><span class="token function">CreateScope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">await</span> <span class="token keyword">using</span> <span class="token class-name">AppDbContext</span> dbContext <span class="token operator">=</span></span>
<span class="line">            scope<span class="token punctuation">.</span>ServiceProvider<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetRequiredService</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>AppDbContext<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">await</span> dbContext<span class="token punctuation">.</span>Database<span class="token punctuation">.</span><span class="token function">MigrateAsync</span><span class="token punctuation">(</span>stoppingToken<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <strong>EF</strong> <code>DbContext</code> is a <strong>scoped</strong> service, which we can&#39;t inject directly inside of <code>RunEfMigrationsBackgroundTask</code>. We have to inject an instance of <code>IServiceProvider</code> which we can use to create a custom service scope, so that we can resolve the scoped <code>AppDbContext</code>.</p><p>I would <em>not recommend</em> running the <code>RunEfMigrationsBackgroundTask</code> in production. <strong>EF</strong> migrations can easily fail and you&#39;ll run into problems. However, I think it&#39;s perfectly fine for local development.</p><hr><h2 id="periodic-background-tasks" tabindex="-1"><a class="header-anchor" href="#periodic-background-tasks"><span>Periodic Background Tasks</span></a></h2><p>Sometimes we want run a <strong>background task</strong> continuously, and have it perform some operation on repeat. For example, we want consume messages from a queue every ten seconds. How do we build this?</p><p>Here&#39;s an example <code>PeriodicBackgroundTask</code> to get you started:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PeriodicBackgroundTask</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">BackgroundService</span></span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">TimeSpan</span> _period <span class="token operator">=</span> TimeSpan<span class="token punctuation">.</span><span class="token function">FromSeconds</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">ILogger<span class="token punctuation">&lt;</span>PeriodicBackgroundTask<span class="token punctuation">&gt;</span></span> _logger<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token function">PeriodicBackgroundTask</span><span class="token punctuation">(</span><span class="token class-name">ILogger<span class="token punctuation">&lt;</span>PeriodicBackgroundTask<span class="token punctuation">&gt;</span></span> logger<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        _logger <span class="token operator">=</span> logger<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">ExecuteAsync</span><span class="token punctuation">(</span><span class="token class-name">CancellationToken</span> stoppingToken<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">using</span> <span class="token class-name">PeriodicTimer</span> timer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PeriodicTimer</span><span class="token punctuation">(</span>_period<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>stoppingToken<span class="token punctuation">.</span>IsCancellationRequested <span class="token operator">&amp;&amp;</span></span>
<span class="line">               <span class="token keyword">await</span> timer<span class="token punctuation">.</span><span class="token function">WaitForNextTickAsync</span><span class="token punctuation">(</span>stoppingToken<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            _logger<span class="token punctuation">.</span><span class="token function">LogInformation</span><span class="token punctuation">(</span><span class="token string">&quot;Executing PeriodicBackgroundTask&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,29)),s("p",null,[n[5]||(n[5]=e("We're using a ")),s("a",S,[a(p,{icon:"fa-brands fa-microsoft"}),n[4]||(n[4]=e("PeriodicTimer"))]),n[6]||(n[6]=e(" to asynchronously wait for a given period, before executing our ")),n[7]||(n[7]=s("strong",null,"background task",-1)),n[8]||(n[8]=e("."))]),n[14]||(n[14]=r('<hr><h2 id="what-if-you-need-a-more-robust-solution" tabindex="-1"><a class="header-anchor" href="#what-if-you-need-a-more-robust-solution"><span>What If You Need A More Robust Solution?</span></a></h2><p>It should be obvious by now that <code>IHostedService</code> is useful when you need simple <strong>background tasks</strong> that are running while your application is running.</p><p>What if you want to have a scheduled <strong>background task</strong> that runs at 2AM every day?</p><p>You can probably build something like this yourself, but there are existing solutions that you should consider first.</p><p>Here are two popular solutions for running <strong>background tasks</strong> that I worked with before:</p>',6)),a(c,{name:"Quartz.NET",desc:"Open-source scheduling framework for .NET.",url:"https://quartz-scheduler.net/",logo:"https://quartz-scheduler.net/android-icon-192x192.png",preview:"https://www.quartz-scheduler.net/quartz-logo-large.png"}),a(c,{name:"Hangfire – Background jobs and workers for .NET and .NET Core",desc:"An easy way to perform background processing in .NET and .NET Core applications. No Windows Service or separate process required.",url:"https://hangfire.io/",logo:"https://www.hangfire.io/apple-touch-icon.png",preview:"https://www.hangfire.io/img/twitter-crd.png"}),s("p",null,[n[10]||(n[10]=e("I also have an example of ")),s("a",A,[a(p,{icon:"fa-brands fa-youtube"}),n[9]||(n[9]=e("using Quartz for processing Outbox messages"))]),n[11]||(n[11]=e(" on my YouTube channel that you can take a look at."))]),a(d,{src:"youtube/XALvnX7MPeo"})])}const x=k(y,[["render",I],["__file","running-background-tasks-in-asp-net-core.html.vue"]]),C=JSON.parse('{"path":"/milanjovanovic.tech/running-background-tasks-in-asp-net-core.html","title":"Running Background Tasks In ASP.NET Core","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Running Background Tasks In ASP.NET Core","description":"Article(s) > Running Background Tasks In ASP.NET Core","icon":"iconfont icon-csharp","category":["C#","DotNet","Article(s)"],"tag":["blog","milanjovanovic.tech","cs","c#","csharp","dotnet"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Running Background Tasks In ASP.NET Core"},{"property":"og:description","content":"Running Background Tasks In ASP.NET Core"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/running-background-tasks-in-asp-net-core.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/running-background-tasks-in-asp-net-core.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Running Background Tasks In ASP.NET Core"}],["meta",{"property":"og:description","content":"Article(s) > Running Background Tasks In ASP.NET Core"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://milanjovanovic.tech/blog-covers/mnw_014.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://milanjovanovic.tech/blog-covers/mnw_014.png"}],["meta",{"name":"twitter:image:alt","content":"Running Background Tasks In ASP.NET Core"}],["meta",{"property":"article:author","content":"Milan Jovanović"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"milanjovanovic.tech"}],["meta",{"property":"article:tag","content":"cs"}],["meta",{"property":"article:tag","content":"c#"}],["meta",{"property":"article:tag","content":"csharp"}],["meta",{"property":"article:tag","content":"dotnet"}],["meta",{"property":"article:published_time","content":"2022-12-03T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Running Background Tasks In ASP.NET Core\\",\\"image\\":[\\"https://milanjovanovic.tech/blog-covers/mnw_014.png\\"],\\"datePublished\\":\\"2022-12-03T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Milan Jovanović\\"}]}"]],"prev":"/programming/cs/articles/README.md","date":"2022-12-03T00:00:00.000Z","isOriginal":false,"author":"Milan Jovanović","cover":"https://milanjovanovic.tech/blog-covers/mnw_014.png"},"headers":[{"level":2,"title":"Background Tasks With IHostedService","slug":"background-tasks-with-ihostedservice","link":"#background-tasks-with-ihostedservice","children":[]},{"level":2,"title":"Background Tasks With BackgroundService","slug":"background-tasks-with-backgroundservice","link":"#background-tasks-with-backgroundservice","children":[]},{"level":2,"title":"Periodic Background Tasks","slug":"periodic-background-tasks","link":"#periodic-background-tasks","children":[]},{"level":2,"title":"What If You Need A More Robust Solution?","slug":"what-if-you-need-a-more-robust-solution","link":"#what-if-you-need-a-more-robust-solution","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":3.2,"words":960},"filePathRelative":"milanjovanovic.tech/running-background-tasks-in-asp-net-core.md","localizedDate":"2022년 12월 3일","excerpt":"\\n","copyright":{"author":"Milan Jovanović"}}');export{x as comp,C as data};