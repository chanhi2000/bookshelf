import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as s,as as d,ao as a,at as h,au as m,ap as t,al as k,aq as o,ar as v,an as i}from"./app-CpYYKbnj.js";const b={},g={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},y={class:"table-of-contents"};function w(l,n){const p=o("VPCard"),e=o("router-link"),c=o("SiteInfo");return v(),u("div",null,[s("h1",g,[s("a",f,[s("span",null,d(l.$frontmatter.title)+" 관련",1)])]),a(p,h(m({title:"C# > Article(s)",desc:"Article(s)",link:"/programming/cs/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),s("nav",y,[s("ul",null,[s("li",null,[a(e,{to:"#how-publish-subscribe-works-with-mediatr"},{default:t(()=>n[0]||(n[0]=[i("How Publish-Subscribe Works With MediatR")])),_:1})]),s("li",null,[a(e,{to:"#introducing-notification-publisher-strategies"},{default:t(()=>n[1]||(n[1]=[i("Introducing Notification Publisher Strategies")])),_:1})]),s("li",null,[a(e,{to:"#configuring-mediatr-notification-publishing-strategy"},{default:t(()=>n[2]||(n[2]=[i("Configuring MediatR Notification Publishing Strategy")])),_:1})]),s("li",null,[a(e,{to:"#how-is-this-useful"},{default:t(()=>n[3]||(n[3]=[i("How Is This Useful?")])),_:1})])])]),n[4]||(n[4]=s("hr",null,null,-1)),a(c,{name:"How To Publish MediatR Notifications In Parallel",desc:"MediatR is a popular library with a simple mediator pattern implementation in .NET. Here's a definiton taken from MediatR's GitHub: 'In-process messaging with no dependencies.' With the rise in popularity of the CQRS pattern, MediatR became the go-to library to implement commands and queries. However, MediatR also has support for the publish-subscribe pattern using notifications. You can publish an INotification instance and have multiple subscribers handle the published message. Until recently, the handlers subscribing to an INotification message could only execute serially, one by one.",url:"https://milanjovanovic.tech/blog/how-to-publish-mediatr-notifications-in-parallel/",logo:"https://milanjovanovic.tech/profile_favicon.png",preview:"https://milanjovanovic.tech/blog-covers/mnw_030.png"}),n[5]||(n[5]=k(`<p><strong>MediatR</strong> is a popular library with a simple <strong>mediator pattern</strong> implementation in .NET.</p><p>Here&#39;s a definiton taken from MediatR&#39;s GitHub: <strong>&quot;In-process messaging with no dependencies.&quot;</strong></p><p>With the rise in popularity of the <strong>CQRS pattern</strong>, MediatR became the go-to library to implement commands and queries.</p><p>However, MediatR also has support for the <strong>publish-subscribe</strong> pattern using notifications. You can publish an <code>INotification</code> instance and have multiple subscribers handle the published message.</p><p>Until recently, the handlers subscribing to an <code>INotification</code> message could only execute serially, one by one.</p><p>In this week&#39;s newsletter, I&#39;ll show you how to configure MediatR to <strong>execute the handlers in parallel</strong>.</p><p>Let&#39;s dive in.</p><hr><h2 id="how-publish-subscribe-works-with-mediatr" tabindex="-1"><a class="header-anchor" href="#how-publish-subscribe-works-with-mediatr"><span>How Publish-Subscribe Works With MediatR</span></a></h2><p>Before I talk about notification publishing strategies, let&#39;s see how <strong>publish-subscribe</strong> works with <strong>MediatR</strong>.</p><p>You need a class implementing the <code>INotification</code> interface:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">OrderCreated</span><span class="token punctuation">(</span><span class="token class-name">Guid</span> OrderId<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">INotification</span></span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Then you need a respective <code>INotificationHandler</code> implementation:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderCreatedHandler</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">INotificationHandler<span class="token punctuation">&lt;</span>OrderCreated<span class="token punctuation">&gt;</span></span></span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">INotificationService</span> _notificationService<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token function">OrderCreatedHandler</span><span class="token punctuation">(</span><span class="token class-name">INotificationService</span> notificationService<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        _notificationService <span class="token operator">=</span> notificationService<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">Handle</span><span class="token punctuation">(</span></span>
<span class="line">        <span class="token class-name">OrderCreated</span> notification<span class="token punctuation">,</span></span>
<span class="line">        <span class="token class-name">CancellationToken</span> cancellationToken<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">await</span> _notificationService<span class="token punctuation">.</span><span class="token function">SendOrderCreatedEmail</span><span class="token punctuation">(</span></span>
<span class="line">            notification<span class="token punctuation">.</span>OrderId<span class="token punctuation">,</span></span>
<span class="line">            cancellationToken<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>And then you simply publish a message using either <code>IMediator</code> or <code>IPublisher</code>. I prefer using the <code>IPublisher</code> because it&#39;s more expressive:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">await</span> publisher<span class="token punctuation">.</span><span class="token function">Publish</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">OrderCreated</span><span class="token punctuation">(</span>order<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">,</span> cancellationToken<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>MediatR will invoke all the respective handlers.</p><hr><h2 id="introducing-notification-publisher-strategies" tabindex="-1"><a class="header-anchor" href="#introducing-notification-publisher-strategies"><span>Introducing Notification Publisher Strategies</span></a></h2><p>Before MediatR v12, the publishing strategy would invoke each handler individually.</p><p>However, there&#39;s a new interface <code>INotificationPublisher</code> controlling how the handlers are called.</p><p>The default implementation of this interface is <code>ForeachAwaitPublisher</code>:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ForeachAwaitPublisher</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">INotificationPublisher</span></span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">Publish</span><span class="token punctuation">(</span></span>
<span class="line">        <span class="token class-name">IEnumerable<span class="token punctuation">&lt;</span>NotificationHandlerExecutor<span class="token punctuation">&gt;</span></span> handlerExecutors<span class="token punctuation">,</span></span>
<span class="line">        <span class="token class-name">INotification</span> notification<span class="token punctuation">,</span></span>
<span class="line">        <span class="token class-name">CancellationToken</span> cancellationToken<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> handler <span class="token keyword">in</span> handlerExecutors<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">await</span> handler</span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">HandlerCallback</span><span class="token punctuation">(</span>notification<span class="token punctuation">,</span> cancellationToken<span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">ConfigureAwait</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>But now you can also use the <code>TaskWhenAllPublisher</code>:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TaskWhenAllPublisher</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">INotificationPublisher</span></span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token return-type class-name">Task</span> <span class="token function">Publish</span><span class="token punctuation">(</span></span>
<span class="line">        <span class="token class-name">IEnumerable<span class="token punctuation">&lt;</span>NotificationHandlerExecutor<span class="token punctuation">&gt;</span></span> handlerExecutors<span class="token punctuation">,</span></span>
<span class="line">        <span class="token class-name">INotification</span> notification<span class="token punctuation">,</span></span>
<span class="line">        <span class="token class-name">CancellationToken</span> cancellationToken<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name"><span class="token keyword">var</span></span> tasks <span class="token operator">=</span> handlerExecutors</span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span>handler <span class="token operator">=&gt;</span> handler<span class="token punctuation">.</span><span class="token function">HandlerCallback</span><span class="token punctuation">(</span></span>
<span class="line">                notification<span class="token punctuation">,</span></span>
<span class="line">                cancellationToken<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">ToArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">return</span> Task<span class="token punctuation">.</span><span class="token function">WhenAll</span><span class="token punctuation">(</span>tasks<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Here&#39;s a comparison between these two strategies.</p><p><code>ForeachAwaitPublisher</code>:</p><ul><li>Invokes each handler one by one</li><li>Fails when an exception occurs in one of the handlers</li></ul><p><code>TaskWhenAllPublisher</code>:</p><ul><li>Invokes all the handlers at the same time</li><li>Executes all the handlers regardless of one of them throwing an exception</li></ul><p>If you store the task returned by <code>TaskWhenAllPublisher</code> you can access the <code>Task.Exception</code> property, which will contain an <code>AggregateException</code> instance. You can then implement more robust exception handling.</p><hr><h2 id="configuring-mediatr-notification-publishing-strategy" tabindex="-1"><a class="header-anchor" href="#configuring-mediatr-notification-publishing-strategy"><span>Configuring MediatR Notification Publishing Strategy</span></a></h2><p>How do we configure which <code>INotificationPublisher</code> strategy MediatR will use?</p><p>There&#39;s a new way to apply configuration options when calling the <code>AddMediatR</code> method.</p><p>You supply an <code>Action&lt;MediatRServiceConfiguration&gt;</code> delegate and configure the <code>MediatRServiceConfiguration</code> instance.</p><p>If you want to use the <code>TaskWhenAllPublisher</code> strategy, you can either:</p><ul><li>Provide a value for the <code>NotificationPublisher</code> property</li><li>Specify the strategy type on the <code>NotificationPublisherType</code> property</li></ul><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line">services<span class="token punctuation">.</span><span class="token function">AddMediatR</span><span class="token punctuation">(</span>config <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">    config<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">RegisterServicesFromAssemblyContaining</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Program<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Setting the publisher directly will make the instance a Singleton.</span></span>
<span class="line">    config<span class="token punctuation">.</span>NotificationPublisher <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TaskWhenAllPublisher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Seting the publisher type will:</span></span>
<span class="line">    <span class="token comment">// 1. Override the value set on NotificationPublisher</span></span>
<span class="line">    <span class="token comment">// 2. Use the service lifetime from the ServiceLifetime property below</span></span>
<span class="line">    config<span class="token punctuation">.</span>NotificationPublisherType <span class="token operator">=</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">TaskWhenAllPublisher</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    config<span class="token punctuation">.</span>ServiceLifetime <span class="token operator">=</span> ServiceLifetime<span class="token punctuation">.</span>Transient<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can also implement a custom <code>INotificationPublisher</code> instance and use your own implementation instead.</p><hr><h2 id="how-is-this-useful" tabindex="-1"><a class="header-anchor" href="#how-is-this-useful"><span>How Is This Useful?</span></a></h2><p>Being able to <strong>run notification handlers in parallel</strong> provides a significant <strong>performance improvement</strong> over the default behavior.</p><p>However, note that all handlers will use the same service scope.</p><p>If you have service instances that don&#39;t support concurrent access you may run into problems.</p><p>Unfortunately, one such service instance is the <strong>EF Core</strong> <code>DbContext</code>.</p><p>In any case, I think this is a great addition to the already amazing <strong>MediatR</strong> library.</p><p>That&#39;s all for today.</p><p>See you next week.</p>`,49))])}const T=r(b,[["render",w],["__file","how-to-publish-mediatr-notifications-in-parallel.html.vue"]]),N=JSON.parse('{"path":"/milanjovanovic.tech/how-to-publish-mediatr-notifications-in-parallel.html","title":"How To Publish MediatR Notifications In Parallel","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How To Publish MediatR Notifications In Parallel","description":"Article(s) > How To Publish MediatR Notifications In Parallel","icon":"iconfont icon-csharp","category":["C#","DotNet","Article(s)"],"tag":["blog","milanjovanovic.tech","cs","c#","csharp","dotnet"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How To Publish MediatR Notifications In Parallel"},{"property":"og:description","content":"How To Publish MediatR Notifications In Parallel"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/how-to-publish-mediatr-notifications-in-parallel.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/how-to-publish-mediatr-notifications-in-parallel.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How To Publish MediatR Notifications In Parallel"}],["meta",{"property":"og:description","content":"Article(s) > How To Publish MediatR Notifications In Parallel"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://milanjovanovic.tech/blog-covers/mnw_030.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://milanjovanovic.tech/blog-covers/mnw_030.png"}],["meta",{"name":"twitter:image:alt","content":"How To Publish MediatR Notifications In Parallel"}],["meta",{"property":"article:author","content":"Milan Jovanović"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"milanjovanovic.tech"}],["meta",{"property":"article:tag","content":"cs"}],["meta",{"property":"article:tag","content":"c#"}],["meta",{"property":"article:tag","content":"csharp"}],["meta",{"property":"article:tag","content":"dotnet"}],["meta",{"property":"article:published_time","content":"2023-03-25T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How To Publish MediatR Notifications In Parallel\\",\\"image\\":[\\"https://milanjovanovic.tech/blog-covers/mnw_030.png\\"],\\"datePublished\\":\\"2023-03-25T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Milan Jovanović\\"}]}"]],"prev":"/programming/cs/articles/README.md","date":"2023-03-25T00:00:00.000Z","isOriginal":false,"author":"Milan Jovanović","cover":"https://milanjovanovic.tech/blog-covers/mnw_030.png"},"headers":[{"level":2,"title":"How Publish-Subscribe Works With MediatR","slug":"how-publish-subscribe-works-with-mediatr","link":"#how-publish-subscribe-works-with-mediatr","children":[]},{"level":2,"title":"Introducing Notification Publisher Strategies","slug":"introducing-notification-publisher-strategies","link":"#introducing-notification-publisher-strategies","children":[]},{"level":2,"title":"Configuring MediatR Notification Publishing Strategy","slug":"configuring-mediatr-notification-publishing-strategy","link":"#configuring-mediatr-notification-publishing-strategy","children":[]},{"level":2,"title":"How Is This Useful?","slug":"how-is-this-useful","link":"#how-is-this-useful","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":2.8,"words":840},"filePathRelative":"milanjovanovic.tech/how-to-publish-mediatr-notifications-in-parallel.md","localizedDate":"2023년 3월 25일","excerpt":"\\n","copyright":{"author":"Milan Jovanović"}}');export{T as comp,N as data};