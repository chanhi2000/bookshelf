import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as d,am as n,as as h,ao as s,at as g,au as m,ap as o,al as v,an as e,aq as i,ar as k}from"./app-CpYYKbnj.js";const f={},w={id:"frontmatter-title-관련",tabindex:"-1"},b={class:"header-anchor",href:"#frontmatter-title-관련"},y={class:"table-of-contents"},O={href:"https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.options.ioptions-1?view=dotnet-plat-ext-7.0",target:"_blank",rel:"noopener noreferrer"},I={href:"https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.options.ioptionssnapshot-1?view=dotnet-plat-ext-7.0",target:"_blank",rel:"noopener noreferrer"},T={href:"https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.options.ioptionsmonitor-1?view=dotnet-plat-ext-7.0",target:"_blank",rel:"noopener noreferrer"};function C(c,t){const l=i("VPCard"),a=i("router-link"),r=i("SiteInfo"),p=i("FontIcon");return k(),d("div",null,[n("h1",w,[n("a",b,[n("span",null,h(c.$frontmatter.title)+" 관련",1)])]),s(l,g(m({title:"C# > Article(s)",desc:"Article(s)",link:"/programming/cs/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),n("nav",y,[n("ul",null,[n("li",null,[s(a,{to:"#creating-the-options-class"},{default:o(()=>t[0]||(t[0]=[e("Creating The Options Class")])),_:1})]),n("li",null,[s(a,{to:"#setting-up-options-pattern-using-iconfiguration"},{default:o(()=>t[1]||(t[1]=[e("Setting Up Options Pattern Using IConfiguration")])),_:1})]),n("li",null,[s(a,{to:"#setting-up-options-pattern-using-iconfigureoptions"},{default:o(()=>t[2]||(t[2]=[e("Setting Up Options Pattern Using IConfigureOptions")])),_:1})]),n("li",null,[s(a,{to:"#injecting-options-with-ioptions"},{default:o(()=>t[3]||(t[3]=[e("Injecting Options With IOptions")])),_:1})]),n("li",null,[s(a,{to:"#what-about-ioptionssnapshot-and-ioptionsmonitor"},{default:o(()=>t[4]||(t[4]=[e("What About IOptionsSnapshot and IOptionsMonitor?")])),_:1})]),n("li",null,[s(a,{to:"#wrapping-up"},{default:o(()=>t[5]||(t[5]=[e("Wrapping up")])),_:1})])])]),t[9]||(t[9]=n("hr",null,null,-1)),s(r,{name:"How To Use The Options Pattern In ASP.NET Core 7",desc:"In this week's newsletter I want to show you how you can use the powerful Options pattern in ASP.NET Core 7. The options pattern uses classes to provide strongly typed settings in your application at runtime. The values for the options instance can come from multiple sources. The typical use case is to provide the settings from application configuration.",url:"https://milanjovanovic.tech/blog/how-to-use-the-options-pattern-in-asp-net-core-7/",logo:"https://milanjovanovic.tech/profile_favicon.png",preview:"https://milanjovanovic.tech/blog-covers/mnw_012.png"}),t[10]||(t[10]=v(`<p>In this week&#39;s newsletter I want to show you how you can use the powerful <strong>options pattern</strong> in <strong>ASP.NET Core 7</strong>.</p><p>The <strong>options pattern</strong> uses classes to provide <strong>strongly typed settings</strong> in your application at runtime.</p><p>The values for the <strong>options</strong> instance can come from multiple sources. The typical use case is to provide the settings from application configuration.</p><p>You can configure the <strong>options pattern</strong> in a few different ways in <strong>ASP.NET Core</strong>. I want to discuss some of the approaches and their potential benefits.</p><p>Let&#39;s dive in.</p><hr><h2 id="creating-the-options-class" tabindex="-1"><a class="header-anchor" href="#creating-the-options-class"><span>Creating The Options Class</span></a></h2><p>I want to set the stage first, by creating the <strong>options</strong> class and explaining what settings we want to bind to it.</p><p>We want to configure JWT Authentication for our application, so we decided to create the <code>JwtOptions</code> class to hold that configuration:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JwtOptions</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Issuer <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">init</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Audience <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">init</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> SecretKey <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">init</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>And let&#39;s imagine that inside of our <code>appsettings.json</code> file we have the following configuration values:</p><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre><code><span class="line"><span class="token property">&quot;Jwt&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;Issuer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Gatherly&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;Audience&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Gatherly&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;SecretKey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dont-tell-anyone!&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Alright, that&#39;s looking good. Now I want to show you a few ways to bind the values from JSON to our <code>JwtOptions</code> class.</p><hr><h2 id="setting-up-options-pattern-using-iconfiguration" tabindex="-1"><a class="header-anchor" href="#setting-up-options-pattern-using-iconfiguration"><span>Setting Up Options Pattern Using IConfiguration</span></a></h2><p>The most straightforward approach is to use the <code>IConfiguration</code> instance that we can access while registering services.</p><p>We need to call the <code>IServiceCollection.Configure&lt;TOptions&gt;</code> method, and specify the <code>JwtOptions</code> as the generic argument:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line">builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Configure</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>JwtOptions<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span></span>
<span class="line">    builder<span class="token punctuation">.</span>Configuration<span class="token punctuation">.</span><span class="token function">GetSection</span><span class="token punctuation">(</span><span class="token string">&quot;Jwt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>It doesn&#39;t get simpler than this, does it?</p><p>The only downside is that we are limited to the configuration values provided through application configuration.</p><p>This can be extended to include environment variables and user secrets also.</p><hr><h2 id="setting-up-options-pattern-using-iconfigureoptions" tabindex="-1"><a class="header-anchor" href="#setting-up-options-pattern-using-iconfigureoptions"><span>Setting Up Options Pattern Using IConfigureOptions</span></a></h2><p>If you want a more robust approach, I have you covered. We&#39;re going to use the <code>IConfigureOptions</code> interface to define a class to configure our <strong>strongly typed options</strong>.</p><p>There are two steps that we need to follow in this case:</p><ul><li>Create the <code>IConfigureOptions</code> implementation</li><li>Call <code>IServiceCollection.ConfigureOptions&lt;TOptions&gt;</code> with our <code>IConfigureOptions</code> implementation as the generic argument</li></ul><p>To start off, we will create the <code>JwtOptionsSetup</code> class:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JwtOptionsSetup</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IConfigureOptions<span class="token punctuation">&lt;</span>JwtOptions<span class="token punctuation">&gt;</span></span></span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> SectionName <span class="token operator">=</span> <span class="token string">&quot;Jwt&quot;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">IConfiguration</span> _configuration<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token function">JwtOptionsSetup</span><span class="token punctuation">(</span><span class="token class-name">IConfiguration</span> configuration<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        _configuration <span class="token operator">=</span> configuration<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Configure</span><span class="token punctuation">(</span><span class="token class-name">JwtOptions</span> options<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        _configuration</span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">GetSection</span><span class="token punctuation">(</span>SectionName<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">Bind</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We wrote more code, to achieve the same thing. Was it worth it?</p><p>Perhaps, if you consider that we now have access to <strong>dependency injection</strong> in the <code>JwtOptionsSetup</code> class. This means that we can resolve other services that we can use to get the configuration values.</p><p>We also need to tell the application to use the <code>JwtOptionsSetup</code> class:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line">builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ConfigureOptions</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>JwtOptionsSetup<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>When we try to inject our <code>JwtOptions</code> somewhere, the <code>JwtOptionsSetup.Configure</code> method will be called first the calculate the correct values.</p><hr><h2 id="injecting-options-with-ioptions" tabindex="-1"><a class="header-anchor" href="#injecting-options-with-ioptions"><span>Injecting Options With IOptions</span></a></h2><p>We&#39;ve seen a few examples for how to configure the <strong>options pattern</strong> with the <code>JwtOptions</code> class.</p><p>But how do we actually use the <strong>options pattern</strong>?</p><p>Easy, you just need to inject <code>IOptions&lt;JwtOptions&gt;</code> from the constructor.</p><p>I&#39;ll just show the <code>JwtProvider</code> constructor here, for brevity.</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token function">JwtProvider</span><span class="token punctuation">(</span><span class="token class-name">IOptions<span class="token punctuation">&lt;</span>JwtOptions<span class="token punctuation">&gt;</span></span> options<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    _options <span class="token operator">=</span> options<span class="token punctuation">.</span>Value<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The actual <code>JwtOptions</code> instance is available on the <code>IOptions&lt;JwtOptions&gt;.Value</code> property.</p><p>The <code>IOptions</code> instance that we injected here is configured as a <strong>Singleton</strong> in dependency injection. This is very important to be aware of.</p><hr><h2 id="what-about-ioptionssnapshot-and-ioptionsmonitor" tabindex="-1"><a class="header-anchor" href="#what-about-ioptionssnapshot-and-ioptionsmonitor"><span>What About IOptionsSnapshot and IOptionsMonitor?</span></a></h2><p>If you want to use the latest configuration values every time you inject an <strong>options</strong> class, then injecting <code>IOptions</code> won&#39;t work.</p><p>However, you can use the <code>IOptionsSnapshot</code> interface instead:</p><ul><li>It provides the latest configuration snapshot (cached per request)</li><li>It is registered as a <strong>Scoped</strong> service</li><li>It detects configuration changes after application start</li></ul><p>You can also use the <code>IOptionsMonitor</code> which retrieves the current option values at any time, and it&#39;s a <strong>Singleton</strong> service.</p><hr><h2 id="wrapping-up" tabindex="-1"><a class="header-anchor" href="#wrapping-up"><span>Wrapping up</span></a></h2><p>The <strong>options pattern</strong> gives us a way to use strongly typed configuration classes in our application.</p><p>We can configure the options class in a simple way with <a href="#setting-up-options-pattern-using-iconfiguration"><code>IConfiguration</code></a>, or we can create an <a href="#setting-up-options-pattern-using-iconfigureoptions"><code>IConfigureOptions</code></a> implementation if we need something more powerful.</p><p>When it comes to using the <strong>options pattern</strong>, we have three approaches:</p>`,53)),n("ul",null,[n("li",null,[n("a",O,[s(p,{icon:"fa-brands fa-microsoft"}),t[6]||(t[6]=n("code",null,"IOptions",-1))])]),n("li",null,[n("a",I,[s(p,{icon:"fa-brands fa-microsoft"}),t[7]||(t[7]=n("code",null,"IOptionsSnapshot",-1))])]),n("li",null,[n("a",T,[s(p,{icon:"fa-brands fa-microsoft"}),t[8]||(t[8]=n("code",null,"IOptionsMonitor",-1))])])]),t[11]||(t[11]=n("p",null,[e("Deciding which of them to use in your application depends on what kind of behavior you want. If you don't need to support refreshing configuration values after application start, "),n("a",{href:"#injecting-options-with-ioptions"},[n("code",null,"IOptions")]),e(" is a perfect solution.")],-1))])}const P=u(f,[["render",C],["__file","how-to-use-the-options-pattern-in-asp-net-core-7.html.vue"]]),J=JSON.parse('{"path":"/milanjovanovic.tech/how-to-use-the-options-pattern-in-asp-net-core-7.html","title":"How To Use The Options Pattern In ASP.NET Core 7","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How To Use The Options Pattern In ASP.NET Core 7","description":"Article(s) > How To Use The Options Pattern In ASP.NET Core 7","icon":"iconfont icon-csharp","category":["C#","DotNet","Article(s)"],"tag":["blog","milanjovanovic.tech","cs","c#","csharp","dotnet"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How To Use The Options Pattern In ASP.NET Core 7"},{"property":"og:description","content":"How To Use The Options Pattern In ASP.NET Core 7"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/how-to-use-the-options-pattern-in-asp-net-core-7.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/how-to-use-the-options-pattern-in-asp-net-core-7.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How To Use The Options Pattern In ASP.NET Core 7"}],["meta",{"property":"og:description","content":"Article(s) > How To Use The Options Pattern In ASP.NET Core 7"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://milanjovanovic.tech/blog-covers/mnw_012.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://milanjovanovic.tech/blog-covers/mnw_012.png"}],["meta",{"name":"twitter:image:alt","content":"How To Use The Options Pattern In ASP.NET Core 7"}],["meta",{"property":"article:author","content":"Milan Jovanović"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"milanjovanovic.tech"}],["meta",{"property":"article:tag","content":"cs"}],["meta",{"property":"article:tag","content":"c#"}],["meta",{"property":"article:tag","content":"csharp"}],["meta",{"property":"article:tag","content":"dotnet"}],["meta",{"property":"article:published_time","content":"2022-11-19T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How To Use The Options Pattern In ASP.NET Core 7\\",\\"image\\":[\\"https://milanjovanovic.tech/blog-covers/mnw_012.png\\"],\\"datePublished\\":\\"2022-11-19T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Milan Jovanović\\"}]}"]],"prev":"/programming/cs/articles/README.md","date":"2022-11-19T00:00:00.000Z","isOriginal":false,"author":"Milan Jovanović","cover":"https://milanjovanovic.tech/blog-covers/mnw_012.png"},"headers":[{"level":2,"title":"Creating The Options Class","slug":"creating-the-options-class","link":"#creating-the-options-class","children":[]},{"level":2,"title":"Setting Up Options Pattern Using IConfiguration","slug":"setting-up-options-pattern-using-iconfiguration","link":"#setting-up-options-pattern-using-iconfiguration","children":[]},{"level":2,"title":"Setting Up Options Pattern Using IConfigureOptions","slug":"setting-up-options-pattern-using-iconfigureoptions","link":"#setting-up-options-pattern-using-iconfigureoptions","children":[]},{"level":2,"title":"Injecting Options With IOptions","slug":"injecting-options-with-ioptions","link":"#injecting-options-with-ioptions","children":[]},{"level":2,"title":"What About IOptionsSnapshot and IOptionsMonitor?","slug":"what-about-ioptionssnapshot-and-ioptionsmonitor","link":"#what-about-ioptionssnapshot-and-ioptionsmonitor","children":[]},{"level":2,"title":"Wrapping up","slug":"wrapping-up","link":"#wrapping-up","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":3.42,"words":1026},"filePathRelative":"milanjovanovic.tech/how-to-use-the-options-pattern-in-asp-net-core-7.md","localizedDate":"2022년 11월 19일","excerpt":"\\n","copyright":{"author":"Milan Jovanović"}}');export{P as comp,J as data};