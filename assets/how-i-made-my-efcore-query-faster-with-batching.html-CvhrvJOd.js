import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as m,am as s,as as k,ao as e,at as h,au as v,ap as i,an as a,al as c,aq as o,ar as g}from"./app-CpYYKbnj.js";const b={},y={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},w={class:"table-of-contents"},I={href:"https://learn.microsoft.com/en-us/ef/core/",target:"_blank",rel:"noopener noreferrer"},D={href:"https://learn.microsoft.com/en-us/ef/core/querying/",target:"_blank",rel:"noopener noreferrer"},M={href:"https://github.com/dotnet/BenchmarkDotNet",target:"_blank",rel:"noopener noreferrer"};function x(l,n){const r=o("VPCard"),t=o("router-link"),u=o("SiteInfo"),p=o("FontIcon");return g(),m("div",null,[s("h1",y,[s("a",f,[s("span",null,k(l.$frontmatter.title)+" 관련",1)])]),e(r,h(v({title:"C# > Article(s)",desc:"Article(s)",link:"/programming/cs/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),s("nav",w,[s("ul",null,[s("li",null,[e(t,{to:"#why-this-query-is-suboptimal"},{default:i(()=>n[0]||(n[0]=[a("Why This Query is Suboptimal")])),_:1})]),s("li",null,[e(t,{to:"#batching-to-the-rescue"},{default:i(()=>n[1]||(n[1]=[a("Batching to the Rescue")])),_:1})]),s("li",null,[e(t,{to:"#how-much-faster"},{default:i(()=>n[2]||(n[2]=[a("How Much Faster?")])),_:1})]),s("li",null,[e(t,{to:"#takeaway"},{default:i(()=>n[3]||(n[3]=[a("Takeaway")])),_:1})])])]),n[12]||(n[12]=s("hr",null,null,-1)),e(u,{name:"How I Made My EF Core Query 3.42x Faster With Batching",desc:"EF Core is a fantastic ORM if you're building .NET applications. Today, I'll show you a simple idea I used to get an almost 4x performance improvement.",url:"https://milanjovanovic.tech/blog/how-i-made-my-efcore-query-faster-with-batching/",logo:"https://milanjovanovic.tech/profile_favicon.png",preview:"https://milanjovanovic.tech/blog-covers/mnw_075.png"}),s("p",null,[s("a",I,[e(p,{icon:"fa-brands fa-microsoft"}),n[4]||(n[4]=a("EF Core"))]),n[5]||(n[5]=a(" is a fantastic ORM if you're building .NET applications."))]),n[13]||(n[13]=c('<p>But it&#39;s a tool like any other. And you can end up using it in a suboptimal way.</p><p>Today, I&#39;ll show you a simple idea I used to get an almost <strong>4x performance improvement</strong>.</p><p>I&#39;m not saying you&#39;ll see the same result, but understanding the idea will make your queries faster.</p><hr><h2 id="why-this-query-is-suboptimal" tabindex="-1"><a class="header-anchor" href="#why-this-query-is-suboptimal"><span>Why This Query is Suboptimal</span></a></h2><p>Here&#39;s the example I want to use to explain this powerful idea. It&#39;s taken from a production app I was working on, but I simplified it for this example.</p><p>We&#39;re using an <code>InvoiceService</code> to get a collection of invoices for a given company. The invoices could come from a third-party API or some other persistence store. We&#39;re lacking detailed line item information, so we&#39;re querying the database to fill in the missing data.</p>',7)),s("p",null,[n[7]||(n[7]=a("The highlighted ")),s("a",D,[e(p,{icon:"fa-brands fa-microsoft"}),n[6]||(n[6]=a("LINQ query"))]),n[8]||(n[8]=a(" below isn't bad by itself. It returns all the line items in one database query (round trip)."))]),n[14]||(n[14]=c(`<p>But it&#39;s missing one important realization that can unlock further performance gains.</p><p>Because we&#39;re iterating over the invoices, we&#39;re <strong>querying the database many times</strong>.</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line">app<span class="token punctuation">.</span><span class="token function">MapGet</span><span class="token punctuation">(</span><span class="token string">&quot;invoices/{companyId}&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token class-name"><span class="token keyword">long</span></span> companyId<span class="token punctuation">,</span></span>
<span class="line">    <span class="token class-name">InvoiceService</span> invoiceService<span class="token punctuation">,</span></span>
<span class="line">    <span class="token class-name">AppDbContext</span> dbContext<span class="token punctuation">)</span> <span class="token operator">=&gt;</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">IEnumerable<span class="token punctuation">&lt;</span>Invoice<span class="token punctuation">&gt;</span></span> invoices <span class="token operator">=</span> invoiceService<span class="token punctuation">.</span><span class="token function">GetForCompanyId</span><span class="token punctuation">(</span></span>
<span class="line">        companyId<span class="token punctuation">,</span></span>
<span class="line">        <span class="token named-parameter punctuation">take</span><span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token class-name"><span class="token keyword">var</span></span> invoiceDtos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>InvoiceDto<span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> invoice <span class="token keyword">in</span> invoices<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name"><span class="token keyword">var</span></span> invoiceDto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">InvoiceDto</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            Id <span class="token operator">=</span> invoice<span class="token punctuation">.</span>Id<span class="token punctuation">,</span></span>
<span class="line">            CompanyId <span class="token operator">=</span> invoice<span class="token punctuation">.</span>CompanyId<span class="token punctuation">,</span></span>
<span class="line">            IssuedDate <span class="token operator">=</span> invoice<span class="token punctuation">.</span>IssuedDate<span class="token punctuation">,</span></span>
<span class="line">            DueDate <span class="token operator">=</span> invoice<span class="token punctuation">.</span>DueDate<span class="token punctuation">,</span></span>
<span class="line">            Number <span class="token operator">=</span> invoice<span class="token punctuation">.</span>Number</span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line highlighted"></span>
<span class="line highlighted">        <span class="token class-name"><span class="token keyword">var</span></span> lineItemDtos <span class="token operator">=</span> <span class="token keyword">await</span> dbContext</span>
<span class="line highlighted">            <span class="token punctuation">.</span>LineItems</span>
<span class="line highlighted">            <span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span>li <span class="token operator">=&gt;</span> invoice<span class="token punctuation">.</span>LineItemIds<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span>li<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line highlighted">            <span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span>li <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">LineItemDto</span></span>
<span class="line highlighted">            <span class="token punctuation">{</span></span>
<span class="line highlighted">                Id <span class="token operator">=</span> li<span class="token punctuation">.</span>Id<span class="token punctuation">,</span></span>
<span class="line highlighted">                Name <span class="token operator">=</span> li<span class="token punctuation">.</span>Name<span class="token punctuation">,</span></span>
<span class="line highlighted">                Price <span class="token operator">=</span> li<span class="token punctuation">.</span>Price<span class="token punctuation">,</span></span>
<span class="line highlighted">                Quantity <span class="token operator">=</span> li<span class="token punctuation">.</span>Quantity</span>
<span class="line highlighted">            <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line highlighted">            <span class="token punctuation">.</span><span class="token function">ToArrayAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        invoiceDto<span class="token punctuation">.</span>LineItems <span class="token operator">=</span> lineItemDtos<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        invoiceDtos<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>invoiceDto<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> invoiceDtos<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Once you figure this out, the solution comes down to applying a simple idea.</p><p>Instead of fetching the line items for each invoice, we can query all the line items ahead of time.</p><hr><h2 id="batching-to-the-rescue" tabindex="-1"><a class="header-anchor" href="#batching-to-the-rescue"><span>Batching to the Rescue</span></a></h2><p>Here&#39;s the same query, but refactored to only query the line items once. This means there&#39;s just a single round trip to the database.</p><p>There are three components to the final design:</p><ul><li>Querying all the <code>LineItems</code> in a single database round-trip</li><li>Creating a <code>LineItemDto</code> dictionary for fast lookup</li></ul><p>Once we have the dictionary, we can loop through the invoices and assign the line items. Populating a line item becomes a dictionary lookup (cheap) instead of a database query (expensive).</p><p>Before deciding if this solution makes sense, you should consider a few more things.</p><p>How many records can you load from the database at once?</p><p>Each invoice contains ~20 line items on average, and we&#39;re only fetching ten invoices. So, we&#39;re loading ~200 line items from the database. Most applications can handle this load. But things could be different if you&#39;re fetching thousands of rows.</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line">app<span class="token punctuation">.</span><span class="token function">MapGet</span><span class="token punctuation">(</span><span class="token string">&quot;invoices/{companyId}&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token class-name"><span class="token keyword">long</span></span> companyId<span class="token punctuation">,</span></span>
<span class="line">    <span class="token class-name">InvoiceService</span> invoiceService<span class="token punctuation">,</span></span>
<span class="line">    <span class="token class-name">AppDbContext</span> dbContext<span class="token punctuation">)</span> <span class="token operator">=&gt;</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">IEnumerable<span class="token punctuation">&lt;</span>Invoice<span class="token punctuation">&gt;</span></span> invoices <span class="token operator">=</span> invoiceService<span class="token punctuation">.</span><span class="token function">GetForCompanyId</span><span class="token punctuation">(</span></span>
<span class="line">        companyId<span class="token punctuation">,</span></span>
<span class="line">        <span class="token named-parameter punctuation">take</span><span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line highlighted">    <span class="token class-name"><span class="token keyword">long</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> lineItemIds <span class="token operator">=</span> invoices</span>
<span class="line highlighted">        <span class="token punctuation">.</span><span class="token function">SelectMany</span><span class="token punctuation">(</span>invoice <span class="token operator">=&gt;</span> invoice<span class="token punctuation">.</span>LineItemIds<span class="token punctuation">)</span></span>
<span class="line highlighted">        <span class="token punctuation">.</span><span class="token function">ToArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token class-name"><span class="token keyword">var</span></span> lineItemDtos <span class="token operator">=</span> <span class="token keyword">await</span> dbContext</span>
<span class="line">        <span class="token punctuation">.</span>LineItems</span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span>li <span class="token operator">=&gt;</span> lineItemIds<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span>li<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span>li <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">LineItemDto</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            Id <span class="token operator">=</span> li<span class="token punctuation">.</span>Id<span class="token punctuation">,</span></span>
<span class="line">            Name <span class="token operator">=</span> li<span class="token punctuation">.</span>Name<span class="token punctuation">,</span></span>
<span class="line">            Price <span class="token operator">=</span> li<span class="token punctuation">.</span>Price<span class="token punctuation">,</span></span>
<span class="line">            Quantity <span class="token operator">=</span> li<span class="token punctuation">.</span>Quantity</span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">ToListAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line highlighted">    <span class="token class-name">Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">long</span><span class="token punctuation">,</span> LineItemDto<span class="token punctuation">&gt;</span></span> lineItemsDictionary <span class="token operator">=</span></span>
<span class="line highlighted">        lineItemDtos<span class="token punctuation">.</span><span class="token function">ToDictionary</span><span class="token punctuation">(</span><span class="token named-parameter punctuation">keySelector</span><span class="token punctuation">:</span> li <span class="token operator">=&gt;</span> li<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line highlighted"></span>
<span class="line">    <span class="token class-name"><span class="token keyword">var</span></span> invoiceDtos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>InvoiceDto<span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> invoice <span class="token keyword">in</span> invoices<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name"><span class="token keyword">var</span></span> invoiceDto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">InvoiceDto</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            Id <span class="token operator">=</span> invoice<span class="token punctuation">.</span>Id<span class="token punctuation">,</span></span>
<span class="line">            CompanyId <span class="token operator">=</span> invoice<span class="token punctuation">.</span>CompanyId<span class="token punctuation">,</span></span>
<span class="line">            IssuedDate <span class="token operator">=</span> invoice<span class="token punctuation">.</span>IssuedDate<span class="token punctuation">,</span></span>
<span class="line">            DueDate <span class="token operator">=</span> invoice<span class="token punctuation">.</span>DueDate<span class="token punctuation">,</span></span>
<span class="line">            Number <span class="token operator">=</span> invoice<span class="token punctuation">.</span>Number<span class="token punctuation">,</span></span>
<span class="line">            LineItems <span class="token operator">=</span> invoice</span>
<span class="line">                <span class="token punctuation">.</span>LineItemIds</span>
<span class="line highlighted">                <span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span>li <span class="token operator">=&gt;</span> lineItemsDictionary<span class="token punctuation">[</span>li<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">ToArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        invoiceDtos<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>invoiceDto<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> invoiceDtos<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="how-much-faster" tabindex="-1"><a class="header-anchor" href="#how-much-faster"><span>How Much Faster?</span></a></h2><p>It seems plausible that the batch variant would be faster. Right?</p><p>We have N queries (one per invoice) in the first version and a single query in the batched version.</p>`,19)),s("p",null,[n[10]||(n[10]=a("Here are the benchmark results I got using ")),s("a",M,[e(p,{icon:"iconfont icon-github"}),n[9]||(n[9]=s("code",null,"dotnet/BenchmarkDotNet",-1))]),n[11]||(n[11]=a(":"))]),n[15]||(n[15]=c('<figure><img src="https://milanjovanovic.tech/blogs/mnw_075/benchmark.png?imwidth=3840" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>The foreach version takes <strong>1913.3 us</strong> (microseconds) on average.<br>The batched version takes <strong>558.6 us</strong> on average.</p><p>That&#39;s <strong>3.42x faster</strong> with the batched version. This is with a local SQL database.</p><p>The batched version should be even faster if you&#39;re querying a remote database because of the impact of network round-trip time. It quickly adds up when you have N queries (foreach version).</p><hr><h2 id="takeaway" tabindex="-1"><a class="header-anchor" href="#takeaway"><span>Takeaway</span></a></h2><p>The power of this approach lies in its simplicity and efficiency. By batching database queries, we significantly reduce the number of round trips to the database. This is often one of the biggest performance bottlenecks.</p><p>But it&#39;s crucial to understand that this approach is not a one-size-fits-all solution.</p><p>EF Core offers many features and optimizations, but it&#39;s up to the developer to use them effectively.</p><p>Finally, always remember to measure and benchmark. The improvements we saw in this case were quantified through benchmarks. Without proper measurement, it&#39;s easy to make changes that inadvertently degrade performance.</p><p>Thanks for reading, and stay awesome!</p>',11))])}const T=d(b,[["render",x],["__file","how-i-made-my-efcore-query-faster-with-batching.html.vue"]]),F=JSON.parse('{"path":"/milanjovanovic.tech/how-i-made-my-efcore-query-faster-with-batching.html","title":"How I Made My EF Core Query 3.42x Faster With Batching","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How I Made My EF Core Query 3.42x Faster With Batching","description":"Article(s) > How I Made My EF Core Query 3.42x Faster With Batching","icon":"iconfont icon-csharp","category":["C#","DotNet","Article(s)"],"tag":["blog","milanjovanovic.tech","cs","c#","csharp","dotnet"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How I Made My EF Core Query 3.42x Faster With Batching"},{"property":"og:description","content":"How I Made My EF Core Query 3.42x Faster With Batching"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/how-i-made-my-efcore-query-faster-with-batching.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/how-i-made-my-efcore-query-faster-with-batching.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How I Made My EF Core Query 3.42x Faster With Batching"}],["meta",{"property":"og:description","content":"Article(s) > How I Made My EF Core Query 3.42x Faster With Batching"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://milanjovanovic.tech/blog-covers/mnw_075.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://milanjovanovic.tech/blog-covers/mnw_075.png"}],["meta",{"name":"twitter:image:alt","content":"How I Made My EF Core Query 3.42x Faster With Batching"}],["meta",{"property":"article:author","content":"Milan Jovanović"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"milanjovanovic.tech"}],["meta",{"property":"article:tag","content":"cs"}],["meta",{"property":"article:tag","content":"c#"}],["meta",{"property":"article:tag","content":"csharp"}],["meta",{"property":"article:tag","content":"dotnet"}],["meta",{"property":"article:published_time","content":"2024-02-03T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How I Made My EF Core Query 3.42x Faster With Batching\\",\\"image\\":[\\"https://milanjovanovic.tech/blogs/mnw_075/benchmark.png?imwidth=3840\\"],\\"datePublished\\":\\"2024-02-03T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Milan Jovanović\\"}]}"]],"prev":"/programming/cs/articles/README.md","date":"2024-02-03T00:00:00.000Z","isOriginal":false,"author":"Milan Jovanović","cover":"https://milanjovanovic.tech/blog-covers/mnw_075.png"},"headers":[{"level":2,"title":"Why This Query is Suboptimal","slug":"why-this-query-is-suboptimal","link":"#why-this-query-is-suboptimal","children":[]},{"level":2,"title":"Batching to the Rescue","slug":"batching-to-the-rescue","link":"#batching-to-the-rescue","children":[]},{"level":2,"title":"How Much Faster?","slug":"how-much-faster","link":"#how-much-faster","children":[]},{"level":2,"title":"Takeaway","slug":"takeaway","link":"#takeaway","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":3.33,"words":1000},"filePathRelative":"milanjovanovic.tech/how-i-made-my-efcore-query-faster-with-batching.md","localizedDate":"2024년 2월 3일","excerpt":"\\n","copyright":{"author":"Milan Jovanović"}}');export{T as comp,F as data};