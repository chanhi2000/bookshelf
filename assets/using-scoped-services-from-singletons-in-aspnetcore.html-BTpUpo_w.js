import{_ as v}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as m,am as n,as as g,ao as a,at as h,au as k,ap as t,al as c,an as s,aq as r,ar as S}from"./app-CpYYKbnj.js";const y={},f={id:"frontmatter-title-관련",tabindex:"-1"},b={class:"header-anchor",href:"#frontmatter-title-관련"},w={class:"table-of-contents"},x={href:"https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection#service-lifetimes",target:"_blank",rel:"noopener noreferrer"},I={href:"https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection#transient",target:"_blank",rel:"noopener noreferrer"},T={href:"https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection#scoped",target:"_blank",rel:"noopener noreferrer"},C={href:"https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection#singleton",target:"_blank",rel:"noopener noreferrer"},A={href:"https://github.com/aspnet/DependencyInjection/blob/94b9cc9ace032f838e068702cc70ce57cc883bc7/src/DI.Abstractions/ServiceProviderServiceExtensions.cs#L125",target:"_blank",rel:"noopener noreferrer"};function P(l,e){const d=r("VPCard"),o=r("router-link"),u=r("SiteInfo"),i=r("FontIcon"),p=r("RouteLink");return S(),m("div",null,[n("h1",f,[n("a",b,[n("span",null,g(l.$frontmatter.title)+" 관련",1)])]),a(d,h(k({title:"C# > Article(s)",desc:"Article(s)",link:"/programming/cs/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),n("nav",w,[n("ul",null,[n("li",null,[a(o,{to:"#asp-net-core-service-lifetimes"},{default:t(()=>e[0]||(e[0]=[s("ASP.NET Core Service Lifetimes")])),_:1})]),n("li",null,[a(o,{to:"#the-solution-iservicescopefactory"},{default:t(()=>e[1]||(e[1]=[s("The Solution - IServiceScopeFactory")])),_:1})]),n("li",null,[a(o,{to:"#scoped-services-in-middleware"},{default:t(()=>e[2]||(e[2]=[s("Scoped Services in Middleware")])),_:1})]),n("li",null,[a(o,{to:"#iservicescopefactory-vs-iserviceprovider"},{default:t(()=>e[3]||(e[3]=[s("IServiceScopeFactory vs. IServiceProvider")])),_:1})]),n("li",null,[a(o,{to:"#summary"},{default:t(()=>e[4]||(e[4]=[s("Summary")])),_:1})])])]),e[35]||(e[35]=n("hr",null,null,-1)),a(u,{name:"Using Scoped Services From Singletons in ASP.NET Core",desc:"Did you ever need to inject a scoped service into a singleton service? I'll explain how you can solve this problem and safely use scoped services from within singletons in ASP.NET Core.",url:"https://milanjovanovic.tech/blog/using-scoped-services-from-singletons-in-aspnetcore/",logo:"https://milanjovanovic.tech/profile_favicon.png",preview:"https://milanjovanovic.tech/blog-covers/mnw_077.png"}),e[36]||(e[36]=c(`<p>Did you ever need to inject a scoped service into a singleton service?</p><p>I often need to resolve a scoped service, like the EF Core <code>DbContext</code>, in a background service.</p><p>Another example is when you need to resolve a scoped service in ASP.NET Core middleware.</p><p>If you ever tried this, you were probably greeted with an exception similar to this one:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">System.InvalidOperationException: Cannot consume scoped service &#39;Scoped&#39; from singleton &#39;Singleton&#39;.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Today, I&#39;ll explain how you can solve this problem and safely use scoped services from within singletons in ASP.NET Core.</p><hr><h2 id="asp-net-core-service-lifetimes" tabindex="-1"><a class="header-anchor" href="#asp-net-core-service-lifetimes"><span>ASP.NET Core Service Lifetimes</span></a></h2>`,8)),n("p",null,[e[6]||(e[6]=s("ASP.NET Core has three ")),n("a",x,[a(i,{icon:"fa-brands fa-microsoft"}),e[5]||(e[5]=s("service lifetimes"))]),e[7]||(e[7]=s(":"))]),e[37]||(e[37]=n("ul",null,[n("li",null,"Transient"),n("li",null,"Singleton"),n("li",null,"Scoped")],-1)),n("p",null,[n("a",I,[a(i,{icon:"fa-brands fa-microsoft"}),e[8]||(e[8]=s("Transient services"))]),e[9]||(e[9]=s(" are created each time they're requested from the service container."))]),n("p",null,[n("a",T,[a(i,{icon:"fa-brands fa-microsoft"}),e[10]||(e[10]=s("Scoped services"))]),e[11]||(e[11]=s(" are created once within the scope's lifetime. For ASP.NET Core applications, a new scope is created for each request. This is how you can resolve scoped services within a given request."))]),n("p",null,[e[13]||(e[13]=s("ASP.NET Core applications also have a root ")),e[14]||(e[14]=n("code",null,"IServiceProvider",-1)),e[15]||(e[15]=s(" used to resolve ")),n("a",C,[a(i,{icon:"fa-brands fa-microsoft"}),e[12]||(e[12]=s("singleton services"))]),e[16]||(e[16]=s("."))]),e[38]||(e[38]=n("p",null,"So, what can we do if resolving a scoped service from a singleton throws an exception?",-1)),e[39]||(e[39]=n("hr",null,null,-1)),e[40]||(e[40]=n("h2",{id:"the-solution-iservicescopefactory",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#the-solution-iservicescopefactory"},[n("span",null,[s("The Solution - "),n("code",null,"IServiceScopeFactory")])])],-1)),n("p",null,[e[18]||(e[18]=s("What if you want to resolve a scoped service inside a ")),a(p,{to:"/milanjovanovic.tech/running-background-tasks-in-asp-net-core.html"},{default:t(()=>e[17]||(e[17]=[s("background service")])),_:1}),e[19]||(e[19]=s("?"))]),e[41]||(e[41]=c(`<p>You can create a new scope (<code>IServiceScope</code>) with its own <code>IServiceProvider</code> instance. The scoped <code>IServiceProvider</code> can be used to resolve scoped services. When the scope is disposed, all disposable services created within that scope are also disposed.</p><p>Here&#39;s an example of using the <code>IServiceScopeFactory</code> to create a new <code>IServiceScope</code>. We&#39;re using the scope to resolve the <code>ApplicationDbContext</code>, which is a scoped service.</p><p>The <code>BackgroundJob</code> is registered as a singleton when calling <code>AddHostedService&lt;BackgroundJob&gt;</code>.</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BackgroundJob</span><span class="token punctuation">(</span><span class="token class-name">IServiceScopeFactory</span> serviceScopeFactory<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">:</span> BackgroundService</span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">ExecuteAsync</span><span class="token punctuation">(</span><span class="token class-name">CancellationToken</span> stoppingToken<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line highlighted">        <span class="token keyword">using</span> <span class="token class-name">IServiceScope</span> scope <span class="token operator">=</span> serviceScopeFactory<span class="token punctuation">.</span><span class="token function">CreateScope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line highlighted">        <span class="token class-name"><span class="token keyword">var</span></span> dbContext <span class="token operator">=</span> scope</span>
<span class="line highlighted">            <span class="token punctuation">.</span>ServiceProvider</span>
<span class="line highlighted">            <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetRequiredService</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ApplicationDbContext<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// Do some background processing with the EF database context.</span></span>
<span class="line">        <span class="token keyword">await</span> <span class="token function">DoWorkAsync</span><span class="token punctuation">(</span>dbContext<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="scoped-services-in-middleware" tabindex="-1"><a class="header-anchor" href="#scoped-services-in-middleware"><span>Scoped Services in Middleware</span></a></h2>`,6)),n("p",null,[e[21]||(e[21]=s("What if you want to use a scoped service in ")),a(p,{to:"/milanjovanovic.tech/3-ways-to-create-middleware-in-asp-net-core.html"},{default:t(()=>e[20]||(e[20]=[s("ASP.NET Core middleware")])),_:1}),e[22]||(e[22]=s("?"))]),e[42]||(e[42]=c(`<p>Middleware is constructed once per application lifetime.</p><p>If you try injecting a scoped service, you&#39;ll get an exception:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">System.InvalidOperationException: Cannot resolve scoped service &#39;Scoped&#39; from root provider.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>There are two ways to get around this.</p><p>First, you could use the previous approach with creating a new scope using <code>IServiceScopeFactory</code>. You&#39;ll be able to resolve scoped services. But, they won&#39;t share the same lifetime as the other scoped service in the same request. This could even be a problem depending on your requirements.</p><p>Is there a better way?</p><p>Middleware allows you to inject scoped services in the <code>InvokeAsync</code> method. The injected services will use the current request&#39;s scope, so they&#39;ll have the same lifetime as any other scoped service.</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConventionalMiddleware</span><span class="token punctuation">(</span><span class="token class-name">RequestDelegate</span> next<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">InvokeAsync</span><span class="token punctuation">(</span></span>
<span class="line">        <span class="token class-name">HttpContext</span> httpContext<span class="token punctuation">,</span></span>
<span class="line highlighted">        <span class="token class-name">IMyScopedService</span> scoped<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line highlighted">        scoped<span class="token punctuation">.</span><span class="token function">DoSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">await</span> <span class="token function">_next</span><span class="token punctuation">(</span>httpContext<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="iservicescopefactory-vs-iserviceprovider" tabindex="-1"><a class="header-anchor" href="#iservicescopefactory-vs-iserviceprovider"><span><code>IServiceScopeFactory</code> vs. <code>IServiceProvider</code></span></a></h2><p>You might see examples using the <code>IServiceProvider</code> to create a scope instead of the <code>IServiceScopeFactory</code>.</p><p>What&#39;s the difference between these two approaches?</p>`,12)),n("p",null,[e[29]||(e[29]=s("The ")),n("a",A,[e[23]||(e[23]=n("code",null,"CreateScope",-1)),e[24]||(e[24]=s(" method from ")),e[25]||(e[25]=n("code",null,"IServiceProvider",-1)),e[26]||(e[26]=s(" (")),a(i,{icon:"iconfont icon-github"}),e[27]||(e[27]=n("code",null,"aspnet/DependencyInjection",-1)),e[28]||(e[28]=s(")"))]),e[30]||(e[30]=s(" resolves an ")),e[31]||(e[31]=n("code",null,"IServiceScopeFactory",-1)),e[32]||(e[32]=s(" instance and calls ")),e[33]||(e[33]=n("code",null,"CreateScope()",-1)),e[34]||(e[34]=s(" on it:"))]),e[43]||(e[43]=c(`<div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">IServiceScope</span> <span class="token function">CreateScope</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token class-name">IServiceProvider</span> provider<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> provider<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetRequiredService</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IServiceScopeFactory<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">CreateScope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>So, if you want to use the <code>IServiceProvider</code> directly to create a scope, that&#39;s fine.</p><p>However, the <code>IServiceScopeFactory</code> is a more direct way to achieve the desired result.</p><hr><h2 id="summary" tabindex="-1"><a class="header-anchor" href="#summary"><span>Summary</span></a></h2><p>Understanding the difference between Transient, Scoped, and Singleton lifetimes is crucial for managing dependencies in ASP.NET Core applications.</p><p>The <code>IServiceScopeFactory</code> provides a solution when you need to resolve scoped services from singletons. It allows you to create a new scope, which you can use to resolve scoped services.</p><p>In middleware, we can inject scoped services into the <code>InvokeAsync</code> method. This also ensures the services use the current request&#39;s scope and lifecycle.</p><p>Thanks for reading, and I&#39;ll see you next week!</p>`,9))])}const E=v(y,[["render",P],["__file","using-scoped-services-from-singletons-in-aspnetcore.html.vue"]]),N=JSON.parse('{"path":"/milanjovanovic.tech/using-scoped-services-from-singletons-in-aspnetcore.html","title":"Using Scoped Services From Singletons in ASP.NET Core","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Using Scoped Services From Singletons in ASP.NET Core","description":"Article(s) > Using Scoped Services From Singletons in ASP.NET Core","icon":"iconfont icon-csharp","category":["C#","DotNet","Article(s)"],"tag":["blog","milanjovanovic.tech","cs","c#","csharp","dotnet"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Using Scoped Services From Singletons in ASP.NET Core"},{"property":"og:description","content":"Using Scoped Services From Singletons in ASP.NET Core"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/using-scoped-services-from-singletons-in-aspnetcore.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/using-scoped-services-from-singletons-in-aspnetcore.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Using Scoped Services From Singletons in ASP.NET Core"}],["meta",{"property":"og:description","content":"Article(s) > Using Scoped Services From Singletons in ASP.NET Core"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://milanjovanovic.tech/blog-covers/mnw_077.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://milanjovanovic.tech/blog-covers/mnw_077.png"}],["meta",{"name":"twitter:image:alt","content":"Using Scoped Services From Singletons in ASP.NET Core"}],["meta",{"property":"article:author","content":"Milan Jovanović"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"milanjovanovic.tech"}],["meta",{"property":"article:tag","content":"cs"}],["meta",{"property":"article:tag","content":"c#"}],["meta",{"property":"article:tag","content":"csharp"}],["meta",{"property":"article:tag","content":"dotnet"}],["meta",{"property":"article:published_time","content":"2024-02-17T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Using Scoped Services From Singletons in ASP.NET Core\\",\\"image\\":[\\"https://milanjovanovic.tech/blog-covers/mnw_077.png\\"],\\"datePublished\\":\\"2024-02-17T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Milan Jovanović\\"}]}"]],"prev":"/programming/cs/articles/README.md","date":"2024-02-17T00:00:00.000Z","isOriginal":false,"author":"Milan Jovanović","cover":"https://milanjovanovic.tech/blog-covers/mnw_077.png"},"headers":[{"level":2,"title":"ASP.NET Core Service Lifetimes","slug":"asp-net-core-service-lifetimes","link":"#asp-net-core-service-lifetimes","children":[]},{"level":2,"title":"The Solution - IServiceScopeFactory","slug":"the-solution-iservicescopefactory","link":"#the-solution-iservicescopefactory","children":[]},{"level":2,"title":"Scoped Services in Middleware","slug":"scoped-services-in-middleware","link":"#scoped-services-in-middleware","children":[]},{"level":2,"title":"IServiceScopeFactory vs. IServiceProvider","slug":"iservicescopefactory-vs-iserviceprovider","link":"#iservicescopefactory-vs-iserviceprovider","children":[]},{"level":2,"title":"Summary","slug":"summary","link":"#summary","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":2.98,"words":894},"filePathRelative":"milanjovanovic.tech/using-scoped-services-from-singletons-in-aspnetcore.md","localizedDate":"2024년 2월 17일","excerpt":"\\n","copyright":{"author":"Milan Jovanović"}}');export{E as comp,N as data};