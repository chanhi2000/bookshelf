import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as n,as as h,ao as e,at as m,au as d,ap as s,al as g,aq as i,ar as w,an as o}from"./app-CpYYKbnj.js";const v={},y={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"},f={class:"table-of-contents"};function b(l,t){const r=i("VPCard"),a=i("router-link"),p=i("SiteInfo");return w(),u("div",null,[n("h1",y,[n("a",k,[n("span",null,h(l.$frontmatter.title)+" 관련",1)])]),e(r,m(d({title:"C# > Article(s)",desc:"Article(s)",link:"/programming/cs/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),n("nav",f,[n("ul",null,[n("li",null,[e(a,{to:"#wishing-you-a-warm-welcome"},{default:s(()=>t[0]||(t[0]=[o("Wishing You a Warm Welcome")])),_:1})]),n("li",null,[e(a,{to:"#the-problem-with-wide-linq"},{default:s(()=>t[1]||(t[1]=[o("The Problem With Wide LINQ")])),_:1})]),n("li",null,[e(a,{to:"#how-to-write-tall-linq"},{default:s(()=>t[2]||(t[2]=[o("How to Write Tall LINQ")])),_:1})])])]),t[3]||(t[3]=n("hr",null,null,-1)),e(p,{name:"Why I Write My LINQ Queries Tall, Not Wide",desc:"In this newsletter, I'll show you how you can write tall LINQ queries to improve readability and make your code easier to maintain. We are going to start from a wide LINQ query, and see how we can refactor it into a tall LINQ query.",url:"https://milanjovanovic.tech/blog/why-i-write-tall-linq-queries/",logo:"https://milanjovanovic.tech/profile_favicon.png",preview:"https://www.milanjovanovic.tech/blog-covers/mnw_001.png"}),t[4]||(t[4]=g(`<h2 id="wishing-you-a-warm-welcome" tabindex="-1"><a class="header-anchor" href="#wishing-you-a-warm-welcome"><span>Wishing You a Warm Welcome</span></a></h2><p>First, I want to welcome you to the first edition of <strong>Milan&#39;s .NET Weekly</strong> newsletter.</p><p>I hope that this newsletter can become a positive force in the .NET community. To bring many of us together so that we can all continue learning and improving.</p><p>With that out of the way, let&#39;s get into .NET!</p><hr><h2 id="the-problem-with-wide-linq" tabindex="-1"><a class="header-anchor" href="#the-problem-with-wide-linq"><span>The Problem With Wide LINQ</span></a></h2><p>Let&#39;s consider the following LINQ expression from a code style perspective.</p><p>I call this a wide LINQ expression because it stretches horizontally across the entire screen.</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line">dbContext<span class="token punctuation">.</span>Animals<span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span>animal <span class="token operator">=&gt;</span> animal<span class="token punctuation">.</span>HasBigEars<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">OrderBy</span><span class="token punctuation">(</span>animal <span class="token operator">=&gt;</span> animal<span class="token punctuation">.</span>IsDangerous<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span></span>
<span class="line">        animal <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>animal<span class="token punctuation">.</span>Id<span class="token punctuation">,</span> animal<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>It is difficult to read.</li><li>It is difficult to reason about.</li><li>It is difficult to extend or maintain.</li></ul><p>To improve this, I created a simple rule that you can follow:</p><blockquote><p>When writing LINQ, try to go tall, not wide.</p></blockquote><hr><h2 id="how-to-write-tall-linq" tabindex="-1"><a class="header-anchor" href="#how-to-write-tall-linq"><span>How to Write Tall LINQ</span></a></h2><p>So how do we write tall LINQ expressions?</p><p>I&#39;m going to rewrite the previous expression, to improve it.</p><p>Try to follow the <em>one dot per line rule</em>:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line">dbContext</span>
<span class="line">    <span class="token punctuation">.</span>Animals</span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span>animal <span class="token operator">=&gt;</span> animal<span class="token punctuation">.</span>HasBigEars<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">OrderBy</span><span class="token punctuation">(</span>animal <span class="token operator">=&gt;</span> animal<span class="token punctuation">.</span>IsDangerous<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span>animal <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>animal<span class="token punctuation">.</span>Id<span class="token punctuation">,</span> animal<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Is the new version easier to read? <strong>Yes</strong>, very much so.</p><p>It is easier to understand what each expression does, and how it feeds into the next one in the chain.</p><p>If you are working in a team, try to propose this as a coding standard (if it isn&#39;t one already). You will see that over time this will make a noticeable difference.</p>`,21))])}const N=c(v,[["render",b],["__file","why-i-write-tall-linq-queries.html.vue"]]),Q=JSON.parse('{"path":"/milanjovanovic.tech/why-i-write-tall-linq-queries.html","title":"Why I Write My LINQ Queries Tall, Not Wide","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Why I Write My LINQ Queries Tall, Not Wide","description":"Article(s) > Why I Write My LINQ Queries Tall, Not Wide","icon":"iconfont icon-csharp","category":["C#","DotNet","Article(s)"],"tag":["blog","milanjovanovic.tech","cs","c#","csharp","dotnet"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Why I Write My LINQ Queries Tall, Not Wide"},{"property":"og:description","content":"Why I Write My LINQ Queries Tall, Not Wide"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/why-i-write-tall-linq-queries.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/why-i-write-tall-linq-queries.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Why I Write My LINQ Queries Tall, Not Wide"}],["meta",{"property":"og:description","content":"Article(s) > Why I Write My LINQ Queries Tall, Not Wide"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.milanjovanovic.tech/blog-covers/mnw_001.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://www.milanjovanovic.tech/blog-covers/mnw_001.png"}],["meta",{"name":"twitter:image:alt","content":"Why I Write My LINQ Queries Tall, Not Wide"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"milanjovanovic.tech"}],["meta",{"property":"article:tag","content":"cs"}],["meta",{"property":"article:tag","content":"c#"}],["meta",{"property":"article:tag","content":"csharp"}],["meta",{"property":"article:tag","content":"dotnet"}],["meta",{"property":"article:published_time","content":"2022-09-03T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Why I Write My LINQ Queries Tall, Not Wide\\",\\"image\\":[\\"https://www.milanjovanovic.tech/blog-covers/mnw_001.png\\"],\\"datePublished\\":\\"2022-09-03T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"prev":"/programming/cs/articles/README.md","date":"2022-09-03T00:00:00.000Z","isOriginal":false,"cover":"https://www.milanjovanovic.tech/blog-covers/mnw_001.png"},"headers":[{"level":2,"title":"Wishing You a Warm Welcome","slug":"wishing-you-a-warm-welcome","link":"#wishing-you-a-warm-welcome","children":[]},{"level":2,"title":"The Problem With Wide LINQ","slug":"the-problem-with-wide-linq","link":"#the-problem-with-wide-linq","children":[]},{"level":2,"title":"How to Write Tall LINQ","slug":"how-to-write-tall-linq","link":"#how-to-write-tall-linq","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":1.49,"words":447},"filePathRelative":"milanjovanovic.tech/why-i-write-tall-linq-queries.md","localizedDate":"2022년 9월 3일","excerpt":"\\n"}');export{N as comp,Q as data};