import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as n,as as m,ao as a,at as i,au as o,ap as r,al as h,aq as l,ar as k,an as p}from"./app-CpYYKbnj.js";const w={},g={id:"frontmatter-title-관련",tabindex:"-1"},y={class:"header-anchor",href:"#frontmatter-title-관련"},f={class:"table-of-contents"};function v(c,s){const e=l("VPCard"),t=l("router-link");return k(),u("div",null,[n("h1",g,[n("a",y,[n("span",null,m(c.$frontmatter.title)+" 관련",1)])]),a(e,i(o({title:"Swift > Article(s)",desc:"Article(s)",link:"/programming/swift/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),n("nav",f,[n("ul",null,[n("li",null,[a(t,{to:"#how-it-used-to-be-pyramids-of-doom"},{default:r(()=>s[0]||(s[0]=[p("How it used to be: pyramids of doom")])),_:1})]),n("li",null,[a(t,{to:"#introducing-swift-s-guard-statement"},{default:r(()=>s[1]||(s[1]=[p("Introducing Swift's guard statement")])),_:1})])])]),s[2]||(s[2]=n("hr",null,null,-1)),a(e,i(o({title:"The guard keyword in Swift: early returns made easy – Hacking with Swift",desc:"The guard keyword in Swift: early returns made easy",link:"https://hackingwithswift.com/new-syntax-swift-2-guard",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s[3]||(s[3]=h(`<p>Swift&#39;s <code>guard</code> keyword lets us check an optional exists and exit the current scope if it doesn&#39;t, which makes it perfect for early returns in methods.</p><hr><h2 id="how-it-used-to-be-pyramids-of-doom" tabindex="-1"><a class="header-anchor" href="#how-it-used-to-be-pyramids-of-doom"><span>How it used to be: pyramids of doom</span></a></h2><p>When a method runs, you want to be sure that it has all the data it needs to work properly, and your code should only execute when that&#39;s the case. Coders solved that in common two ways: pyramids of doom and early returns. The former looks like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">if</span> firstName <span class="token operator">!=</span> <span class="token string-literal"><span class="token string">&quot;&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> lastName <span class="token operator">!=</span> <span class="token string-literal"><span class="token string">&quot;&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> address <span class="token operator">!=</span> <span class="token string-literal"><span class="token string">&quot;&quot;</span></span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token comment">// do great code</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>It&#39;s called a pyramid of doom because of the natural shape of the code as it piles up with more and more indenting.</p><p>The latter looks like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">if</span> firstName <span class="token operator">==</span> <span class="token string-literal"><span class="token string">&quot;&quot;</span></span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">if</span> lastName <span class="token operator">==</span> <span class="token string-literal"><span class="token string">&quot;&quot;</span></span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">if</span> address <span class="token operator">==</span> <span class="token string-literal"><span class="token string">&quot;&quot;</span></span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// do great code</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This technique is called &quot;early return&quot; because you return from the method as early as possible, meaning that if you remain in the method it means everything is safe.</p><p>Neither of these two solutions are attractive. The first solution is messy, and only gets worse as you check more things. By the time you get to the meat of your method, you might be ten levels deep in checks, which is nasty!</p><p>The second solution isn&#39;t very descriptive, in that it doesn&#39;t make clear <em>why</em> we are we returning. It also checks against the opposite of what we care about: we&#39;re looking for a valid first name, so checking for an empty string is reversed.</p><p>In Swift, early returns have another problem, which is in the way they handle optionals. As you might imagine, one of the most important checks in Swift lies in safely unwrapping optionals, but if you use a straight <code>if/let</code> in your early return, the unwrapped optional will leave scope almost immediately, and you can&#39;t use it. You either re-unwrap it, or you force unwrap now that you know it exists. Both are grim.</p><hr><h2 id="introducing-swift-s-guard-statement" tabindex="-1"><a class="header-anchor" href="#introducing-swift-s-guard-statement"><span>Introducing Swift&#39;s guard statement</span></a></h2><p>There&#39;s a Swift keyword called <code>guard</code>, and enables improved early returns in three ways:</p><ul><li>It makes your intent clearer: you tell <code>guard</code> what you want to be the case rather than the reverse. <code>guard</code> is used specifically for trapping invalid parameters being passed to a method, so everyone will understand what it does when they see it.</li><li>Any optional variables unwrapped by <code>guard</code> remain in scope after the <code>guard</code> finishes, so you can use them. This means you can check an optional variable is valid by unwrapping it, then use it straight away.</li><li>It gives you shorter code, which in turn means fewer bugs and happier developers.</li></ul><p>Any conditions you would have checked using <code>if</code> before, you can now check using <code>guard</code>. Here are some examples:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">guard</span> name<span class="token punctuation">.</span>characters<span class="token punctuation">.</span>count <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">throw</span> <span class="token class-name">InputError</span><span class="token punctuation">.</span><span class="token class-name">NameIsEmpty</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">guard</span> age <span class="token operator">&gt;</span> <span class="token number">18</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token boolean">false</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">guard</span> <span class="token other-directive property">#available</span><span class="token punctuation">(</span>iOS <span class="token number">9</span><span class="token punctuation">,</span> <span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function-definition function">printName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">guard</span> <span class="token keyword">let</span> unwrappedName <span class="token operator">=</span> name <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;You need to provide a name.&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span>unwrappedName<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That last example shows how unwrapped optionals remain in scope – a key advantage of <code>guard</code> compared to regular early returns.</p>`,19))])}const S=d(w,[["render",v],["__file","new-syntax-swift-2-guard.html.vue"]]),T=JSON.parse(`{"path":"/hackingwithswift.com/new-syntax-swift-2-guard.html","title":"The guard keyword in Swift: early returns made easy","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"The guard keyword in Swift: early returns made easy","description":"The guard keyword in Swift: early returns made easy","icon":"fa-brands fa-swift","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-2.0","xcode"],"head":[[{"meta":null},{"property":"og:title","content":"The guard keyword in Swift: early returns made easy"},{"property":"og:description","content":"The guard keyword in Swift: early returns made easy"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/new-syntax-swift-2-guard.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/new-syntax-swift-2-guard.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"The guard keyword in Swift: early returns made easy"}],["meta",{"property":"og:description","content":"The guard keyword in Swift: early returns made easy"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:published_time","content":"2019-09-23T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"The guard keyword in Swift: early returns made easy\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-09-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"prev":"/programming/swift/articles/README.md","date":"2019-09-23T00:00:00.000Z","isOriginal":false},"headers":[{"level":2,"title":"How it used to be: pyramids of doom","slug":"how-it-used-to-be-pyramids-of-doom","link":"#how-it-used-to-be-pyramids-of-doom","children":[]},{"level":2,"title":"Introducing Swift's guard statement","slug":"introducing-swift-s-guard-statement","link":"#introducing-swift-s-guard-statement","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":2.24,"words":671},"filePathRelative":"hackingwithswift.com/new-syntax-swift-2-guard.md","localizedDate":"2019년 9월 23일","excerpt":"\\n"}`);export{S as comp,T as data};