import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as s,as as i,ao as t,at as e,au as p,al as u,aq as r,ar as k}from"./app-CpYYKbnj.js";const d={},m={id:"frontmatter-title-관련",tabindex:"-1"},v={class:"header-anchor",href:"#frontmatter-title-관련"};function w(o,n){const a=r("VPCard");return k(),l("div",null,[s("h1",m,[s("a",v,[s("span",null,i(o.$frontmatter.title)+" 관련",1)])]),t(a,e(p({title:"SwiftData by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftdata/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[0]||(n[0]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[1]||(n[1]=s("hr",null,null,-1)),t(a,e(p({title:"How to rollback changes without saving | SwiftData by Example",desc:"How to rollback changes without saving",link:"https://hackingwithswift.com/quick-start/swiftdata/how-to-rollback-changes-without-saving",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[2]||(n[2]=u(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>You can make any SwiftData model <code>Codable</code>, but you need to add the conformance by hand. If your model has relationships that you want to be encoded and decoded, those relationships must also conform to <code>Codable</code>.</p><p>I&#39;ll give you a trivial sample first, then show a more complex example with a relationship.</p><p>First, the simple example. This creates a <code>Movie</code> model with a single string property, so encoding and decoding it is just a matter of reading and writing that one value:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@Model</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">Movie</span><span class="token punctuation">:</span> <span class="token class-name">Codable</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">enum</span> <span class="token class-name">CodingKeys</span><span class="token punctuation">:</span> <span class="token class-name">CodingKey</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">case</span> name</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> name<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">init</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">required</span> <span class="token keyword">init</span><span class="token punctuation">(</span>from decoder<span class="token punctuation">:</span> <span class="token class-name">Decoder</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> container <span class="token operator">=</span> <span class="token keyword">try</span> decoder<span class="token punctuation">.</span><span class="token function">container</span><span class="token punctuation">(</span>keyedBy<span class="token punctuation">:</span> <span class="token class-name">CodingKeys</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span></span>
<span class="line">        name <span class="token operator">=</span> <span class="token keyword">try</span> container<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>name<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">encode</span><span class="token punctuation">(</span>to encoder<span class="token punctuation">:</span> <span class="token class-name">Encoder</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">var</span> container <span class="token operator">=</span> encoder<span class="token punctuation">.</span><span class="token function">container</span><span class="token punctuation">(</span>keyedBy<span class="token punctuation">:</span> <span class="token class-name">CodingKeys</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">try</span> container<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>name<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>As you can see, making the model <code>Codable</code> follows the standard steps you would use elsewhere:</p><ol><li>Defining your <code>CodingKeys</code> enum, listing all the properties you want to load and save.</li><li>Adding an <code>init(from:)</code> initializer that knows how to read all the values from your container.</li><li>Adding an <code>encode(to:)</code> method that knows how to <em>write</em> all the values to a container.</li></ol><p>Now you can go ahead and use it as normal. So, encoding a <code>Movie</code> would look like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">if</span> <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">try</span><span class="token operator">?</span> <span class="token class-name">JSONEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>movies<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">(</span>decoding<span class="token punctuation">:</span> data<span class="token punctuation">,</span> <span class="token keyword">as</span><span class="token punctuation">:</span> UTF8<span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>And if you wanted to decode data, you can do so either from local data:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">do</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">guard</span> <span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token class-name">Bundle</span><span class="token punctuation">.</span>main<span class="token punctuation">.</span><span class="token function">url</span><span class="token punctuation">(</span>forResource<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;movies&quot;</span></span><span class="token punctuation">,</span> withExtension<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;json&quot;</span></span><span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">fatalError</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Failed to find movies.json&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">try</span> <span class="token class-name">Data</span><span class="token punctuation">(</span>contentsOf<span class="token punctuation">:</span> url<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">let</span> movies <span class="token operator">=</span> <span class="token keyword">try</span> <span class="token class-name">JSONDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token class-name">Movie</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> data<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">for</span> movie <span class="token keyword">in</span> movies <span class="token punctuation">{</span></span>
<span class="line">        modelContext<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>movie<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Failed to load movies.&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Or from a remote server:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">do</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token function">URL</span><span class="token punctuation">(</span>string<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;https://hws.dev/movies.json&quot;</span></span><span class="token punctuation">)</span><span class="token operator">!</span></span>
<span class="line">    <span class="token keyword">let</span> <span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token omit keyword">_</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token class-name">URLSession</span><span class="token punctuation">.</span>shared<span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span>from<span class="token punctuation">:</span> url<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">let</span> movies <span class="token operator">=</span> <span class="token keyword">try</span> <span class="token class-name">JSONDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token class-name">Movie</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> from<span class="token punctuation">:</span> data<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">for</span> movie <span class="token keyword">in</span> movies <span class="token punctuation">{</span></span>
<span class="line">        modelContext<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>movie<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Failed to load movies.&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container important"><p class="hint-container-title">Important</p><p>Both those samples insert the data from JSON into a model context, so they are stored in SwiftData. However, whether or not you choose to insert the data, the very act of creating a <code>Movie</code> instance requires that you load that model as part of your model container, e.g. <code>modelContainer(for: Movie.self)</code>.</p></div><p><strong>That bears repeating because it&#39;s critical:</strong> Even if you&#39;re creating your model instances from JSON, you must still have that model type registered with your model container. Failure to do so will trigger a crash.</p><p>There&#39;s no magic to it, and honestly I&#39;m a bit surprised Apple couldn&#39;t find a way to add <code>Codable</code> conformance for all models out of the box.</p><p>Working with more complex models is really just more of the same. For example, in the code below there&#39;s an <code>Author</code> model that has many <code>Book</code> objects inside it, and because both conform to <code>Codable</code> they work great:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@Model</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">Author</span><span class="token punctuation">:</span> <span class="token class-name">Codable</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">enum</span> <span class="token class-name">CodingKeys</span><span class="token punctuation">:</span> <span class="token class-name">CodingKey</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">case</span> firstName<span class="token punctuation">,</span> lastName<span class="token punctuation">,</span> books</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> firstName<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line">    <span class="token keyword">var</span> lastName<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line">    <span class="token keyword">var</span> books<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">Book</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">init</span><span class="token punctuation">(</span>firstName<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">,</span> lastName<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">,</span> books<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">Book</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>firstName <span class="token operator">=</span> firstName</span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>lastName <span class="token operator">=</span> lastName</span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>books <span class="token operator">=</span> books</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">required</span> <span class="token keyword">init</span><span class="token punctuation">(</span>from decoder<span class="token punctuation">:</span> <span class="token class-name">Decoder</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> container <span class="token operator">=</span> <span class="token keyword">try</span> decoder<span class="token punctuation">.</span><span class="token function">container</span><span class="token punctuation">(</span>keyedBy<span class="token punctuation">:</span> <span class="token class-name">CodingKeys</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span></span>
<span class="line">        firstName <span class="token operator">=</span> <span class="token keyword">try</span> container<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>firstName<span class="token punctuation">)</span></span>
<span class="line">        lastName <span class="token operator">=</span> <span class="token keyword">try</span> container<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>lastName<span class="token punctuation">)</span></span>
<span class="line">        books <span class="token operator">=</span> <span class="token keyword">try</span> container<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token class-name">Book</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>books<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">encode</span><span class="token punctuation">(</span>to encoder<span class="token punctuation">:</span> <span class="token class-name">Encoder</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">var</span> container <span class="token operator">=</span> encoder<span class="token punctuation">.</span><span class="token function">container</span><span class="token punctuation">(</span>keyedBy<span class="token punctuation">:</span> <span class="token class-name">CodingKeys</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">try</span> container<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>firstName<span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>firstName<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">try</span> container<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>lastName<span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>lastName<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">try</span> container<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>books<span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>books<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token attribute atrule">@Model</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">Book</span><span class="token punctuation">:</span> <span class="token class-name">Codable</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">enum</span> <span class="token class-name">CodingKeys</span><span class="token punctuation">:</span> <span class="token class-name">CodingKey</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">case</span> title<span class="token punctuation">,</span> genre</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> title<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line">    <span class="token keyword">var</span> genre<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">init</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">,</span> genre<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>title <span class="token operator">=</span> title</span>
<span class="line">        <span class="token keyword">self</span><span class="token punctuation">.</span>genre <span class="token operator">=</span> genre</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">required</span> <span class="token keyword">init</span><span class="token punctuation">(</span>from decoder<span class="token punctuation">:</span> <span class="token class-name">Decoder</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> container <span class="token operator">=</span> <span class="token keyword">try</span> decoder<span class="token punctuation">.</span><span class="token function">container</span><span class="token punctuation">(</span>keyedBy<span class="token punctuation">:</span> <span class="token class-name">CodingKeys</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span></span>
<span class="line">        title <span class="token operator">=</span> <span class="token keyword">try</span> container<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>title<span class="token punctuation">)</span></span>
<span class="line">        genre <span class="token operator">=</span> <span class="token keyword">try</span> container<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>genre<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">encode</span><span class="token punctuation">(</span>to encoder<span class="token punctuation">:</span> <span class="token class-name">Encoder</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">var</span> container <span class="token operator">=</span> encoder<span class="token punctuation">.</span><span class="token function">container</span><span class="token punctuation">(</span>keyedBy<span class="token punctuation">:</span> <span class="token class-name">CodingKeys</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">try</span> container<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>title<span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>title<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">try</span> container<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span>genre<span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token punctuation">.</span>genre<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>As you can see, adding more properties and relationships is just a matter of adding more of the same <code>Encoder</code> and <code>Decoder</code> functionality – it&#39;s not much fun, but at least it works.</p>`,19))])}const b=c(d,[["render",w],["__file","how-to-rollback-changes-without-saving.html.vue"]]),f=JSON.parse('{"path":"/hackingwithswift.com/swiftdata/how-to-rollback-changes-without-saving.html","title":"How to rollback changes without saving","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to rollback changes without saving","description":"Article(s) > How to rollback changes without saving","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftdata","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to rollback changes without saving"},{"property":"og:description","content":"How to rollback changes without saving"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftdata/how-to-rollback-changes-without-saving.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftdata/how-to-rollback-changes-without-saving.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to rollback changes without saving"}],["meta",{"property":"og:description","content":"Article(s) > How to rollback changes without saving"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftdata"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2023-09-30T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to rollback changes without saving\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-30T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"next":"/hackingwithswift.com/swiftdata/lightweight-vs-complex-migrations.md","date":"2023-09-30T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.76,"words":828},"filePathRelative":"hackingwithswift.com/swiftdata/how-to-rollback-changes-without-saving.md","localizedDate":"2023년 9월 30일","excerpt":"\\n"}');export{b as comp,f as data};