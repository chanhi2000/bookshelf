import{_ as m}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as k,am as s,as as h,ao as a,at as v,au as g,ap as t,an as e,al as l,aq as i,ar as y}from"./app-CpYYKbnj.js";const b={},w={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},I={class:"table-of-contents"},C={href:"https://learn.microsoft.com/en-us/dotnet/api/system.security.claims.claimsprincipal?view=net-8.0",target:"_blank",rel:"noopener noreferrer"},x={href:"https://rfc-editor.org/rfc/rfc7231#section-6.5.3",target:"_blank",rel:"noopener noreferrer"};function A(c,n){const u=i("VPCard"),o=i("router-link"),d=i("SiteInfo"),p=i("RouteLink"),r=i("FontIcon");return y(),k("div",null,[s("h1",w,[s("a",f,[s("span",null,h(c.$frontmatter.title)+" 관련",1)])]),a(u,v(g({title:"C# > Article(s)",desc:"Article(s)",link:"/programming/cs/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),s("nav",I,[s("ul",null,[s("li",null,[a(o,{to:"#start-with-an-abstraction"},{default:t(()=>n[0]||(n[0]=[e("Start With an Abstraction")])),_:1})]),s("li",null,[a(o,{to:"#implementing-the-usercontext"},{default:t(()=>n[1]||(n[1]=[e("Implementing the UserContext")])),_:1})]),s("li",null,[a(o,{to:"#using-the-current-user-information"},{default:t(()=>n[2]||(n[2]=[e("Using The Current User Information")])),_:1})]),s("li",null,[a(o,{to:"#takeaway"},{default:t(()=>n[3]||(n[3]=[e("Takeaway")])),_:1})])])]),n[35]||(n[35]=s("hr",null,null,-1)),a(d,{name:"Getting the Current User in Clean Architecture",desc:"The applications you build serve your users (customers), to help them solve some problems. It's a common requirement that you will need to know who the current application user is.",url:"https://milanjovanovic.tech/blog/getting-the-current-user-in-clean-architecture/",logo:"https://milanjovanovic.tech/profile_favicon.png",preview:"https://milanjovanovic.tech/blog-covers/mnw_076.png"}),n[36]||(n[36]=s("p",null,"The applications you build serve your users (customers) to help them solve some problems. It's a common requirement that you will need to know who the current application user is.",-1)),n[37]||(n[37]=s("p",null,"How do you get the current user's information in a Clean Architecture use case?",-1)),n[38]||(n[38]=s("p",null,"Use cases live in the Application layer, where you can't introduce external concerns. Otherwise, you will be breaking the dependency rule.",-1)),s("p",null,[n[5]||(n[5]=e("Let's say you want to know who the current user is to determine if they can access some resource. This is your typical resource-based authorization check. But you have to interact with the identity provider to get this information. This breaks the ")),a(p,{to:"/milanjovanovic.tech/clean-architecture-and-the-benefits-of-structured-software-design.html"},{default:t(()=>n[4]||(n[4]=[e("dependency rule in Clean Architecture")])),_:1}),n[6]||(n[6]=e("."))]),n[39]||(n[39]=l(`<p>I&#39;ve seen this problem confuse developers who are new to Clean Architecture.</p><p>In today&#39;s issue, I&#39;ll show you how to access the current user&#39;s information in a clean way.</p><hr><h2 id="start-with-an-abstraction" tabindex="-1"><a class="header-anchor" href="#start-with-an-abstraction"><span>Start With an Abstraction</span></a></h2><p>The inner layers in Clean Architecture define abstractions for external concerns. From the Application layer&#39;s perspective, authentication and user identity are external concerns.</p><p>The Infrastructure layer deals with external concerns, including authentication and identity management. This is where you would implement the abstraction.</p><p>My preferred approach is creating an <code>IUserContext</code> abstraction. The main information I need is the <code>UserId</code> of the current user. But you can expand the <code>IUserContext</code> with any other data you think is necessary.</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IUserContext</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token return-type class-name"><span class="token keyword">bool</span></span> IsAuthenticated <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token return-type class-name">Guid</span> UserId <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Let&#39;s see how to implement the <code>IUserContext</code>.</p><hr><h2 id="implementing-the-usercontext" tabindex="-1"><a class="header-anchor" href="#implementing-the-usercontext"><span>Implementing the UserContext</span></a></h2>`,11)),s("p",null,[n[8]||(n[8]=e("The ")),n[9]||(n[9]=s("code",null,"UserContext",-1)),n[10]||(n[10]=e(" class is the ")),n[11]||(n[11]=s("code",null,"IUserContext",-1)),n[12]||(n[12]=e(" implementation in the Infrastructure layer. We need to inject the ")),n[13]||(n[13]=s("code",null,"IHttpContextAccessor",-1)),n[14]||(n[14]=e(", which allows us to access the ")),s("a",C,[a(r,{icon:"fa-brands fa-microsoft"}),n[7]||(n[7]=s("code",null,"ClaimsPrincipal",-1))]),n[15]||(n[15]=e(" through the ")),n[16]||(n[16]=s("code",null,"User",-1)),n[17]||(n[17]=e(" property. The ")),n[18]||(n[18]=s("code",null,"ClaimsPrincipal",-1)),n[19]||(n[19]=e(" gives you access to the current user's claims, containing the required information."))]),n[40]||(n[40]=l(`<p>In this example, I&#39;m throwing an exception if any of the properties evaluate to <code>null</code>. You can decide if throwing an exception makes sense for you.</p><p>I also want to share an important remark here about <code>IHttpContextAccessor</code>. We&#39;re using it to access the <code>HttpContext</code> instance — <strong>which only exists during an API request</strong>. Outside an API request, the <code>HttpContext</code> will be null, and the <code>UserContext</code> will throw an exception when accessing its properties.</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">internal</span> <span class="token keyword">sealed</span> <span class="token keyword">class</span> <span class="token class-name">UserContext</span><span class="token punctuation">(</span><span class="token class-name">IHttpContextAccessor</span> httpContextAccessor<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">:</span> IUserContext</span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token return-type class-name">Guid</span> UserId <span class="token operator">=&gt;</span></span>
<span class="line">        httpContextAccessor</span>
<span class="line">            <span class="token punctuation">.</span>HttpContext<span class="token punctuation">?</span></span>
<span class="line">            <span class="token punctuation">.</span>User</span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">GetUserId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">??</span></span>
<span class="line">        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ApplicationException</span><span class="token punctuation">(</span><span class="token string">&quot;User context is unavailable&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> IsAuthenticated <span class="token operator">=&gt;</span></span>
<span class="line">        httpContextAccessor</span>
<span class="line">            <span class="token punctuation">.</span>HttpContext<span class="token punctuation">?</span></span>
<span class="line">            <span class="token punctuation">.</span>User</span>
<span class="line">            <span class="token punctuation">.</span>Identity<span class="token punctuation">?</span></span>
<span class="line">            <span class="token punctuation">.</span>IsAuthenticated <span class="token operator">??</span></span>
<span class="line">        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ApplicationException</span><span class="token punctuation">(</span><span class="token string">&quot;User context is unavailable&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Here&#39;s the <code>GetUserId</code> extension method that&#39;s used in the <code>UserContext.UserId</code> property. It&#39;s looking for a claim with the <code>ClaimTypes.NameIdentifier</code> name, and parsing that value into a <code>Guid</code>. You can replace this with a different type to match the user identity in your system.</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">internal</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">ClaimsPrincipalExtensions</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">Guid</span> <span class="token function">GetUserId</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token class-name">ClaimsPrincipal<span class="token punctuation">?</span></span> principal<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">?</span></span> userId <span class="token operator">=</span> principal<span class="token punctuation">?.</span><span class="token function">FindFirstValue</span><span class="token punctuation">(</span>ClaimTypes<span class="token punctuation">.</span>NameIdentifier<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">return</span> Guid<span class="token punctuation">.</span>TryParse<span class="token class-name"><span class="token punctuation">(</span>userId<span class="token punctuation">,</span> <span class="token keyword">out</span> Guid parsedUserId<span class="token punctuation">)</span> <span class="token punctuation">?</span></span></span>
<span class="line">            parsedUserId <span class="token punctuation">:</span></span>
<span class="line">            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ApplicationException</span><span class="token punctuation">(</span><span class="token string">&quot;User id is unavailable&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="using-the-current-user-information" tabindex="-1"><a class="header-anchor" href="#using-the-current-user-information"><span>Using The Current User Information</span></a></h2><p>Now that you have the <code>IUserContext</code>, you can use it from the Application layer.</p><p>A common requirement is checking if the current user can access some resources.</p>`,9)),s("p",null,[n[21]||(n[21]=e("Here's an example using the ")),n[22]||(n[22]=s("code",null,"GetInvoiceQueryHandler",-1)),n[23]||(n[23]=e(", which queries the database for an invoice. After projecting the result to an ")),n[24]||(n[24]=s("code",null,"InvoiceResponse",-1)),n[25]||(n[25]=e(" object, we check if the current user is the one to whom the invoice was issued. You can also apply this check as part of the database query. But performing it in memory lets you return a different response to the user when they aren't authorized. For example, a ")),s("a",x,[a(r,{icon:"fas fa-globe"}),n[20]||(n[20]=e("403 Forbidden"))]),n[26]||(n[26]=e(" might be appropriate."))]),n[41]||(n[41]=l(`<div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">GetInvoiceQueryHandler</span><span class="token punctuation">(</span><span class="token class-name">IAppDbContext</span> dbContext<span class="token punctuation">,</span> <span class="token class-name">IUserContext</span> userContext<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">:</span> IQueryHandler<span class="token operator">&lt;</span>GetInvoiceQuery<span class="token punctuation">,</span> InvoiceResponse<span class="token operator">&gt;</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>Result<span class="token punctuation">&lt;</span>InvoiceResponse<span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> <span class="token function">Handle</span><span class="token punctuation">(</span></span>
<span class="line">        <span class="token class-name">GetInvoiceQuery</span> request<span class="token punctuation">,</span></span>
<span class="line">        <span class="token class-name">CancellationToken</span> cancellationToken<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">InvoiceResponse<span class="token punctuation">?</span></span> invoiceResponse <span class="token operator">=</span> <span class="token keyword">await</span> dbContext</span>
<span class="line">            <span class="token punctuation">.</span>Invoices</span>
<span class="line">            <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ProjectTo</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>InvoiceResponse<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">FirstOrDefaultAsync</span><span class="token punctuation">(</span></span>
<span class="line">                invoice <span class="token operator">=&gt;</span> invoice<span class="token punctuation">.</span>Id <span class="token operator">==</span> request<span class="token punctuation">.</span>InvoiceId<span class="token punctuation">,</span></span>
<span class="line">                cancellationToken<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>invoiceResponse <span class="token keyword">is</span> <span class="token keyword">null</span> <span class="token operator">||</span></span>
<span class="line"><span class="token operator">&lt;</span>span <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;code-line highlight-line&quot;</span><span class="token operator">&gt;</span>            invoiceResponse<span class="token punctuation">.</span>IssuedToUserId <span class="token operator">!=</span> userContext<span class="token punctuation">.</span>UserId<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> Result<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Failure</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>InvoiceResponse<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>InvoiceErrors<span class="token punctuation">.</span>NotFound<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">return</span> invoiceResponse<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="takeaway" tabindex="-1"><a class="header-anchor" href="#takeaway"><span>Takeaway</span></a></h2>`,3)),s("p",null,[n[28]||(n[28]=e("Incorporating user identity and authentication into ")),a(p,{to:"/milanjovanovic.tech/why-clean-architecture-is-great-for-complex-projects.html"},{default:t(()=>n[27]||(n[27]=[e("Clean Architecture")])),_:1}),n[29]||(n[29]=e(" doesn't have to compromise the integrity of your design. The Application layer should remain decoupled from external concerns such as identity management."))]),s("p",null,[n[31]||(n[31]=e("We respect the ")),a(p,{to:"/milanjovanovic.tech/clean-architecture-and-the-benefits-of-structured-software-design.html"},{default:t(()=>n[30]||(n[30]=[e("Clean Architecture dependency rule")])),_:1}),n[32]||(n[32]=e(" by abstracting user-related information through the ")),n[33]||(n[33]=s("code",null,"IUserContext",-1)),n[34]||(n[34]=e(" interface and implementing it within the Infrastructure layer."))]),n[42]||(n[42]=s("p",null,"With this strategy, you can effectively manage user information, support authorization checks, and ensure your application remains robust and adaptable to future changes.",-1)),n[43]||(n[43]=s("p",null,"Remember, the key is in defining clear abstractions and respecting the architecture's boundaries.",-1)),n[44]||(n[44]=s("p",null,"Hope this was helpful.",-1)),n[45]||(n[45]=s("p",null,"See you next week.",-1))])}const j=m(b,[["render",A],["__file","getting-the-current-user-in-clean-architecture.html.vue"]]),G=JSON.parse('{"path":"/milanjovanovic.tech/getting-the-current-user-in-clean-architecture.html","title":"Getting the Current User in Clean Architecture","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Getting the Current User in Clean Architecture","description":"Article(s) > Getting the Current User in Clean Architecture","icon":"iconfont icon-csharp","category":["C#","DotNet","Article(s)"],"tag":["blog","milanjovanovic.tech","cs","c#","csharp","dotnet"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Getting the Current User in Clean Architecture"},{"property":"og:description","content":"Getting the Current User in Clean Architecture"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/getting-the-current-user-in-clean-architecture.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/getting-the-current-user-in-clean-architecture.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Getting the Current User in Clean Architecture"}],["meta",{"property":"og:description","content":"Article(s) > Getting the Current User in Clean Architecture"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://milanjovanovic.tech/blog-covers/mnw_076.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://milanjovanovic.tech/blog-covers/mnw_076.png"}],["meta",{"name":"twitter:image:alt","content":"Getting the Current User in Clean Architecture"}],["meta",{"property":"article:author","content":"Milan Jovanović"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"milanjovanovic.tech"}],["meta",{"property":"article:tag","content":"cs"}],["meta",{"property":"article:tag","content":"c#"}],["meta",{"property":"article:tag","content":"csharp"}],["meta",{"property":"article:tag","content":"dotnet"}],["meta",{"property":"article:published_time","content":"2024-02-10T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Getting the Current User in Clean Architecture\\",\\"image\\":[\\"https://milanjovanovic.tech/blog-covers/mnw_076.png\\"],\\"datePublished\\":\\"2024-02-10T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Milan Jovanović\\"}]}"]],"prev":"/programming/cs/articles/README.md","date":"2024-02-10T00:00:00.000Z","isOriginal":false,"author":"Milan Jovanović","cover":"https://milanjovanovic.tech/blog-covers/mnw_076.png"},"headers":[{"level":2,"title":"Start With an Abstraction","slug":"start-with-an-abstraction","link":"#start-with-an-abstraction","children":[]},{"level":2,"title":"Implementing the UserContext","slug":"implementing-the-usercontext","link":"#implementing-the-usercontext","children":[]},{"level":2,"title":"Using The Current User Information","slug":"using-the-current-user-information","link":"#using-the-current-user-information","children":[]},{"level":2,"title":"Takeaway","slug":"takeaway","link":"#takeaway","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":3.23,"words":969},"filePathRelative":"milanjovanovic.tech/getting-the-current-user-in-clean-architecture.md","localizedDate":"2024년 2월 10일","excerpt":"\\n","copyright":{"author":"Milan Jovanović"}}');export{j as comp,G as data};