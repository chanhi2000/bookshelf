import{_ as h}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as g,am as s,as as b,ao as e,at as p,au as c,ap as t,an as a,al as d,aq as o,ar as v}from"./app-CpYYKbnj.js";const y={},w={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},S={class:"table-of-contents"},R={href:"https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern",target:"_blank",rel:"noopener noreferrer"},C={href:"https://redis.io/",target:"_blank",rel:"noopener noreferrer"},P={class:"hint-container note"};function T(m,n){const l=o("VPCard"),i=o("router-link"),k=o("SiteInfo"),r=o("RouteLink"),u=o("FontIcon");return v(),g("div",null,[s("h1",w,[s("a",f,[s("span",null,b(m.$frontmatter.title)+" 관련",1)])]),e(l,p(c({title:"C# > Article(s)",desc:"Article(s)",link:"/programming/cs/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),e(l,p(c({title:"Docker > Article(s)",desc:"Article(s)",link:"/devops/docker/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),e(l,p(c({title:"Redis > Article(s)",desc:"Article(s)",link:"/data-science/redis/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),s("nav",S,[s("ul",null,[s("li",null,[e(i,{to:"#redis-channels"},{default:t(()=>n[0]||(n[0]=[a("Redis Channels")])),_:1})]),s("li",null,[e(i,{to:"#practical-use-cases"},{default:t(()=>n[1]||(n[1]=[a("Practical Use Cases")])),_:1})]),s("li",null,[e(i,{to:"#pub-sub-with-redis-channels"},{default:t(()=>n[2]||(n[2]=[a("Pub/Sub With Redis Channels")])),_:1})]),s("li",null,[e(i,{to:"#cache-invalidation-in-distributed-systems"},{default:t(()=>n[3]||(n[3]=[a("Cache Invalidation in Distributed Systems")])),_:1})]),s("li",null,[e(i,{to:"#in-summary"},{default:t(()=>n[4]||(n[4]=[a("In Summary")])),_:1})])])]),n[24]||(n[24]=s("hr",null,null,-1)),e(k,{name:"Simple Messaging in .NET With Redis Pub/Sub",desc:"Redis is a popular choice for caching data, but its capabilities go far beyond that. One of its lesser-known features is Pub/Sub support. Redis channels offer an interesting approach for implementing real-time messaging in your .NET applications.",url:"https://milanjovanovic.tech/blog/simple-messaging-in-dotnet-with-redis-pubsub/",logo:"https://milanjovanovic.tech/profile_favicon.png",preview:"https://milanjovanovic.tech/blog-covers/mnw_100.png"}),s("p",null,[n[6]||(n[6]=a("Redis is a popular choice for ")),e(r,{to:"/milanjovanovic.tech/caching-in-aspnetcore-improving-application-performance.html"},{default:t(()=>n[5]||(n[5]=[s("strong",null,"caching data",-1)])),_:1}),n[7]||(n[7]=a(", but its capabilities go far beyond that. One of its lesser-known features is Pub/Sub support. Redis channels offer an interesting approach for implementing real-time messaging in your .NET applications. However, as you'll soon see, channels also have some drawbacks."))]),n[25]||(n[25]=s("p",null,"In this week's newsletter, we'll explore:",-1)),n[26]||(n[26]=s("ul",null,[s("li",null,"Basics of Redis channels"),s("li",null,"Practical use cases for channels"),s("li",null,"Implementing a Pub/Sub example in .NET"),s("li",null,"Cache invalidation in distributed systems")],-1)),n[27]||(n[27]=s("p",null,"Let's dive in.",-1)),n[28]||(n[28]=s("hr",null,null,-1)),n[29]||(n[29]=s("h2",{id:"redis-channels",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#redis-channels"},[s("span",null,"Redis Channels")])],-1)),s("p",null,[n[9]||(n[9]=a("Redis channels are named communication channels that implement the ")),s("a",R,[e(u,{icon:"fa-brands fa-wikipedia-w"}),n[8]||(n[8]=a("Publish/Subscribe messaging paradigm"))]),n[10]||(n[10]=a(". Each channel is identified by a unique name (e.g., ")),n[11]||(n[11]=s("code",null,"notifications",-1)),n[12]||(n[12]=a(", ")),n[13]||(n[13]=s("code",null,"updates",-1)),n[14]||(n[14]=a("). Channels facilitate message delivery from publishers to subscribers."))]),n[30]||(n[30]=d(`<p>Publishers use the <code>PUBLISH</code> command to send messages to a specific channel. Subscribers use the <code>SUBSCRIBE</code> command to register interest in receiving messages from a channel.</p><figure><img src="https://milanjovanovic.tech/blogs/mnw_100/redis_channel.png?imwidth=3840" alt="Redis channel with publisher and three subscribers" tabindex="0" loading="lazy"><figcaption>Redis channel with publisher and three subscribers</figcaption></figure><p>Redis channels follow a topic-based publish-subscribe model. Multiple publishers can send messages to a channel, and multiple subscribers can receive messages from that channel.</p><p>However, it&#39;s crucial to note that Redis channels do not store messages. If there are no subscribers for a channel when a message is published, that message is immediately discarded.</p><p>Redis channels have an <strong>at-most-once delivery</strong> semantics.</p><hr><h2 id="practical-use-cases" tabindex="-1"><a class="header-anchor" href="#practical-use-cases"><span>Practical Use Cases</span></a></h2><p>Given that Redis channels operate with <strong>at-most-once delivery</strong> (messages might be lost if there are no subscribers), they are well-suited for scenarios where occasional message loss is acceptable and real-time or near-real-time communication is desired.</p><p>Here are a few possible use cases:</p><ul><li><strong>Social media feeds</strong>: Broadcasting new posts or updates to users.</li><li><strong>Live score updates</strong>: Sending live game scores or sports updates to subscribers.</li><li><strong>Chat applications</strong>: Delivering chat messages in real-time to active participants.</li><li><strong>Collaborative editing</strong>: Propagating changes in collaborative editing environments.</li><li><strong>Distributed cache updates</strong>: Invalidating cache entries across multiple servers when data changes. We&#39;ll cover this in detail later in the article.</li></ul><p>Redis channels aren&#39;t the best choice for critical data where message loss is unacceptable. In such cases, you should consider a more reliable messaging system.</p><p>Let&#39;s see how we can use Redis channels in .NET.</p><hr><h2 id="pub-sub-with-redis-channels" tabindex="-1"><a class="header-anchor" href="#pub-sub-with-redis-channels"><span>Pub/Sub With Redis Channels</span></a></h2><p>We will use the <code>StackExchange.Redis</code> library to send messages with Redis channels.</p><p>Let&#39;s start by installing it:</p><div class="language-pwsh line-numbers-mode" data-highlighter="prismjs" data-ext="pwsh" data-title="pwsh"><pre><code><span class="line">Install-Package StackExchange.Redis</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,17)),s("p",null,[n[16]||(n[16]=a("You can run ")),s("a",C,[e(u,{icon:"iconfont icon-redis"}),n[15]||(n[15]=a("Redis"))]),n[17]||(n[17]=a(" locally in a Docker container. The default port is ")),n[18]||(n[18]=s("code",null,"6379",-1)),n[19]||(n[19]=a("."))]),n[31]||(n[31]=d(`<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 redis</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Here&#39;s a simple background service that&#39;ll act as our message <code>Producer</code>.</p><p>We&#39;re creating a <code>ConnectionMultiplexer</code> by connecting to our Redis instance. This allows us to obtain an <code>ISubscriber</code> that we can use for pub/sub messaging. The <code>ISubscriber</code> will enable us to publish a message to a channel by specifying the channel name.</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Producer</span><span class="token punctuation">(</span><span class="token class-name">ILogger<span class="token punctuation">&lt;</span>Producer<span class="token punctuation">&gt;</span></span> logger<span class="token punctuation">)</span> <span class="token punctuation">:</span> BackgroundService</span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">string</span></span> ConnectionString <span class="token operator">=</span> <span class="token string">&quot;localhost:6379&quot;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token class-name">ConnectionMultiplexer</span> Connection <span class="token operator">=</span></span>
<span class="line">        ConnectionMultiplexer<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span>ConnectionString<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> Channel <span class="token operator">=</span> <span class="token string">&quot;messages&quot;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">ExecuteAsync</span><span class="token punctuation">(</span><span class="token class-name">CancellationToken</span> stoppingToken<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line highlighted">        <span class="token class-name"><span class="token keyword">var</span></span> subscriber <span class="token operator">=</span> Connection<span class="token punctuation">.</span><span class="token function">GetSubscriber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>stoppingToken<span class="token punctuation">.</span>IsCancellationRequested<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name"><span class="token keyword">var</span></span> message <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Message</span><span class="token punctuation">(</span>Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> DateTime<span class="token punctuation">.</span>UtcNow<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token class-name"><span class="token keyword">var</span></span> json <span class="token operator">=</span> JsonSerializer<span class="token punctuation">.</span><span class="token function">Serialize</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line highlighted">            <span class="token keyword">await</span> subscriber<span class="token punctuation">.</span><span class="token function">PublishAsync</span><span class="token punctuation">(</span>Channel<span class="token punctuation">,</span> json<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            logger<span class="token punctuation">.</span><span class="token function">LogInformation</span><span class="token punctuation">(</span></span>
<span class="line">                <span class="token string">&quot;Sending message: {Channel} - {@Message}&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                message<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token keyword">await</span> Task<span class="token punctuation">.</span><span class="token function">Delay</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">,</span> stoppingToken<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Let&#39;s also introduce a separate background service for consuming messages.</p><p>The <code>Consumer</code> connects to the same Redis instance and obtains an <code>ISubscriber</code>. The <code>ISubscriber</code> exposes a <code>SubscribeAsync</code> method that we can use to subscribe to messages from a given channel. This method accepts a callback delegate that we can use to handle the message.</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Consumer</span><span class="token punctuation">(</span><span class="token class-name">ILogger<span class="token punctuation">&lt;</span>Consumer<span class="token punctuation">&gt;</span></span> logger<span class="token punctuation">)</span> <span class="token punctuation">:</span> BackgroundService</span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">string</span></span> ConnectionString <span class="token operator">=</span> <span class="token string">&quot;localhost:6379&quot;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token class-name">ConnectionMultiplexer</span> Connection <span class="token operator">=</span></span>
<span class="line">        ConnectionMultiplexer<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span>ConnectionString<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> Channel <span class="token operator">=</span> <span class="token string">&quot;messages&quot;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">ExecuteAsync</span><span class="token punctuation">(</span><span class="token class-name">CancellationToken</span> stoppingToken<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name"><span class="token keyword">var</span></span> subscriber <span class="token operator">=</span> Connection<span class="token punctuation">.</span><span class="token function">GetSubscriber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">await</span> subscriber<span class="token punctuation">.</span><span class="token function">SubscribeAsync</span><span class="token punctuation">(</span>Channel<span class="token punctuation">,</span> <span class="token punctuation">(</span>channel<span class="token punctuation">,</span> message<span class="token punctuation">)</span> <span class="token operator">=&gt;</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name"><span class="token keyword">var</span></span> message <span class="token operator">=</span> JsonSerializer<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Deserialize</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Message<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            logger<span class="token punctuation">.</span><span class="token function">LogInformation</span><span class="token punctuation">(</span></span>
<span class="line">                <span class="token string">&quot;Received message: {Channel} - {@Message}&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                channel<span class="token punctuation">,</span></span>
<span class="line">                message<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Finally, here&#39;s what we get when we run both the <code>Producer</code> and <code>Consumer</code> services:</p><figure><img src="https://milanjovanovic.tech/blogs/mnw_100/redis_pub_sub.gif?imwidth=3840" alt="Redis channels publish/subscribe demo" tabindex="0" loading="lazy"><figcaption>Redis channels publish/subscribe demo</figcaption></figure><hr><h2 id="cache-invalidation-in-distributed-systems" tabindex="-1"><a class="header-anchor" href="#cache-invalidation-in-distributed-systems"><span>Cache Invalidation in Distributed Systems</span></a></h2><p>In a recent project, I tackled a common challenge in distributed systems: keeping the caches in sync. We were using a two-level caching approach. First, we had an in-memory cache on each web server for super-fast access. Second, we had a shared Redis cache to avoid hitting our database too often.</p><p>The problem was that when data changed in the database, we needed a way to quickly tell all the web servers to clear their in-memory caches. This is where Redis Pub/Sub came to the rescue. We set up a Redis channel specifically for cache invalidation messages.</p><p>Each application would run a <code>CacheInvalidationBackgroundService</code> that subscribes to messages from the cache invalidation channel.</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CacheInvalidationBackgroundService</span><span class="token punctuation">(</span></span>
<span class="line">    <span class="token class-name">IServiceProvider</span> serviceProvider<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">:</span> BackgroundService</span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> Channel <span class="token operator">=</span> <span class="token string">&quot;cache-invalidation&quot;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">ExecuteAsync</span><span class="token punctuation">(</span><span class="token class-name">CancellationToken</span> stoppingToken<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">await</span> subscriber<span class="token punctuation">.</span><span class="token function">SubscribeAsync</span><span class="token punctuation">(</span>Channel<span class="token punctuation">,</span> <span class="token punctuation">(</span>channel<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token operator">=&gt;</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name"><span class="token keyword">var</span></span> cache <span class="token operator">=</span> serviceProvider<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetRequiredService</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IMemoryCache<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            cache<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token keyword">return</span> Task<span class="token punctuation">.</span>CompletedTask<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Whenever data changes in the database, we publish a message on this channel with the cache key of the updated data. All the web servers are subscribed to this channel, so they instantly know to remove the old data from their in-memory caches. Since the in-memory cache is wiped if the application isn&#39;t running, losing cache invalidation messages isn&#39;t a problem. This keeps our caches consistent and ensures our users always see the most up-to-date information.</p><hr><h2 id="in-summary" tabindex="-1"><a class="header-anchor" href="#in-summary"><span>In Summary</span></a></h2><p>Redis Pub/Sub is not a silver bullet for every messaging need, but its simplicity and speed make it a valuable tool. Channels allow us to easily implement communication between loosely coupled components.</p><p>Redis channels have at-most-once delivery semantics, so they&#39;re best suited for cases where the occasional dropped message is acceptable.</p><p>I used it to solve the challenge of synchronizing caches across multiple servers. This allowed our system to serve up-to-date data without sacrificing performance.</p>`,21)),s("div",P,[n[23]||(n[23]=s("p",{class:"hint-container-title"},"P.S.",-1)),s("p",null,[n[21]||(n[21]=a("When you're ready to dive deeper into creating message-driven systems, check out ")),e(r,{to:"/milanjovanovic.tech/modular-monolith-architecture/"},{default:t(()=>n[20]||(n[20]=[s("strong",null,"Modular Monolith Architecture",-1)])),_:1}),n[22]||(n[22]=a(". I have an entire module dedicated to building reliable distributed messaging and event-driven architecture."))])]),n[32]||(n[32]=s("p",null,"Good luck out there, and see you next week.",-1)),n[33]||(n[33]=s("p",null,"-->",-1))])}const M=h(y,[["render",T],["__file","simple-messaging-in-dotnet-with-redis-pubsub.html.vue"]]),E=JSON.parse('{"path":"/milanjovanovic.tech/simple-messaging-in-dotnet-with-redis-pubsub.html","title":"Simple Messaging in .NET With Redis Pub/Sub","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Simple Messaging in .NET With Redis Pub/Sub","description":"Article(s) > Simple Messaging in .NET With Redis Pub/Sub","icon":"iconfont icon-csharp","category":["C#","DotNet","Redis","Docker","Article(s)"],"tag":["blog","milanjovanovic.tech","cs","c#","csharp","dotnet","redis","docker","container"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Simple Messaging in .NET With Redis Pub/Sub"},{"property":"og:description","content":"Simple Messaging in .NET With Redis Pub/Sub"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/simple-messaging-in-dotnet-with-redis-pubsub.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/simple-messaging-in-dotnet-with-redis-pubsub.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Simple Messaging in .NET With Redis Pub/Sub"}],["meta",{"property":"og:description","content":"Article(s) > Simple Messaging in .NET With Redis Pub/Sub"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://milanjovanovic.tech/blog-covers/mnw_100.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://milanjovanovic.tech/blog-covers/mnw_100.png"}],["meta",{"name":"twitter:image:alt","content":"Simple Messaging in .NET With Redis Pub/Sub"}],["meta",{"property":"article:author","content":"Milan Jovanović"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"milanjovanovic.tech"}],["meta",{"property":"article:tag","content":"cs"}],["meta",{"property":"article:tag","content":"c#"}],["meta",{"property":"article:tag","content":"csharp"}],["meta",{"property":"article:tag","content":"dotnet"}],["meta",{"property":"article:tag","content":"redis"}],["meta",{"property":"article:tag","content":"docker"}],["meta",{"property":"article:tag","content":"container"}],["meta",{"property":"article:published_time","content":"2024-08-03T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Simple Messaging in .NET With Redis Pub/Sub\\",\\"image\\":[\\"https://milanjovanovic.tech/blogs/mnw_100/redis_channel.png?imwidth=3840\\",\\"https://milanjovanovic.tech/blogs/mnw_100/redis_pub_sub.gif?imwidth=3840\\"],\\"datePublished\\":\\"2024-08-03T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Milan Jovanović\\"}]}"]],"prev":"/programming/cs/articles/README.md","date":"2024-08-03T00:00:00.000Z","isOriginal":false,"author":"Milan Jovanović","cover":"https://milanjovanovic.tech/blog-covers/mnw_100.png"},"headers":[{"level":2,"title":"Redis Channels","slug":"redis-channels","link":"#redis-channels","children":[]},{"level":2,"title":"Practical Use Cases","slug":"practical-use-cases","link":"#practical-use-cases","children":[]},{"level":2,"title":"Pub/Sub With Redis Channels","slug":"pub-sub-with-redis-channels","link":"#pub-sub-with-redis-channels","children":[]},{"level":2,"title":"Cache Invalidation in Distributed Systems","slug":"cache-invalidation-in-distributed-systems","link":"#cache-invalidation-in-distributed-systems","children":[]},{"level":2,"title":"In Summary","slug":"in-summary","link":"#in-summary","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":4.31,"words":1293},"filePathRelative":"milanjovanovic.tech/simple-messaging-in-dotnet-with-redis-pubsub.md","localizedDate":"2024년 8월 3일","excerpt":"\\n","copyright":{"author":"Milan Jovanović"}}');export{M as comp,E as data};