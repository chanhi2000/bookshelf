import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as d,am as s,as as g,ao as e,at as t,au as o,al as i,aq as r,ar as u}from"./app-CpYYKbnj.js";const m={},v={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"};function k(l,n){const a=r("VPCard"),p=r("SiteInfo");return u(),d("div",null,[s("h1",v,[s("a",h,[s("span",null,g(l.$frontmatter.title)+" 관련",1)])]),e(a,t(o({title:"The Go Handbook – Learn Golang for Beginners",desc:"Golang is an awesome, simple, modern, and fast programming language. It’s compiled, open source, and strongly typed. Golang – also called Go – was created by Google engineers with these main goals: make their projects compile (and run) faster be sim...",link:"/freecodecamp.org/go-beginners-handbook/README.md",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",background:"rgba(10,10,35,0.2)"})),null,16),n[0]||(n[0]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[1]||(n[1]=s("hr",null,null,-1)),e(p,{name:"The Go Handbook – Learn Golang for Beginners",desc:"Golang is an awesome, simple, modern, and fast programming language. It’s compiled, open source, and strongly typed. Golang – also called Go – was created by Google engineers with these main goals: make their projects compile (and run) faster be sim...",url:"https://freecodecamp.org/news/go-beginners-handbook#heading-strings-in-go",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://freecodecamp.org/news/content/images/2022/10/golang.png"}),n[2]||(n[2]=i(`<p>A string in Go is a sequence of <code>byte</code> values.</p><p>As we saw above, you can define a string using this syntax:</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">&quot;test&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>It’s important to note that unlike other languages, strings are defined only using double quotes, not single quotes.</p><p>To get the length of a string, use the built-in <code>len()</code> function:</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token function">len</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token comment">//4</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>You can access individual characters using square brackets, passing the index of the character you want to get:</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line">name<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token comment">//&quot;t&quot; (indexes start at 0)</span></span>
<span class="line">name<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token comment">//&quot;e&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>You can get a portion of the string using this syntax:</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line">name<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token comment">//&quot;te&quot;</span></span>
<span class="line">name<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span>  <span class="token comment">//&quot;te&quot;</span></span>
<span class="line">name<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">:</span><span class="token punctuation">]</span>  <span class="token comment">//&quot;st&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Using this you can create a copy of the string using:</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">var</span> newstring <span class="token operator">=</span> name<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>You can assign a string to a new variable like this:</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">var</span> first <span class="token operator">=</span> <span class="token string">&quot;test&quot;</span></span>
<span class="line"><span class="token keyword">var</span> second <span class="token operator">=</span> first</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>Strings are <strong>immutable</strong>, so you cannot update the value of a string.</p><p>Even if you assign a new value to <code>first</code> using an assignment operator, the value <code>second</code> is still going to be <code>&quot;test&quot;</code>:</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">var</span> first <span class="token operator">=</span> <span class="token string">&quot;test&quot;</span></span>
<span class="line"><span class="token keyword">var</span> second <span class="token operator">=</span> first</span>
<span class="line"></span>
<span class="line">first <span class="token operator">=</span> <span class="token string">&quot;another test&quot;</span></span>
<span class="line"></span>
<span class="line">first  <span class="token comment">//&quot;another test&quot;</span></span>
<span class="line">second <span class="token comment">//&quot;test&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Strings are reference types, which means if you pass a string to a function, the <strong>reference</strong> to the string will be copied, not its value. But since strings are immutable, in this case it’s not a big difference in practice with passing an <code>int</code>, for example.</p><p>You can concatenate two strings using the <code>+</code> operator:</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">var</span> first <span class="token operator">=</span> <span class="token string">&quot;first&quot;</span></span>
<span class="line"><span class="token keyword">var</span> second <span class="token operator">=</span> <span class="token string">&quot;second&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> word <span class="token operator">=</span> first <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> second  <span class="token comment">//&quot;first second&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Go provides several string utilities in the the <code>strings</code> package.</p><p>We already saw how to import a package in the “Hello, World!” example.</p><p>Here’s how you can import <code>strings</code>:</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">&quot;strings&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>And then you can use it.</p><p>For example we can use the <code>HasPrefix()</code> function to see if a string starts with a specific substring:</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">&quot;strings&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    strings<span class="token punctuation">.</span><span class="token function">HasPrefix</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;te&quot;</span><span class="token punctuation">)</span> <span class="token comment">// true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can find the full list of methods here:</p>`,28)),e(a,t(o({title:"strings package - strings - Go Packages",desc:"Package strings implements simple functions to manipulate UTF-8 encoded strings.",link:"https://pkg.go.dev/strings/",logo:"https://pkg.go.dev/static/shared/icon/favicon.ico",background:"rgba(54,123,153,0.2)"})),null,16),n[3]||(n[3]=i("<p>Here’s a list of methods you might use frequently:</p><ul><li><code>strings.ToUpper()</code> returns a new string, uppercase</li><li><code>strings.ToLower()</code> returns a new string, lowercase</li><li><code>strings.HasSuffix()</code> checks if a string ends with a substring</li><li><code>strings.HasPrefix()</code> checks if a string starts with a substring</li><li><code>strings.Contains()</code> checks if a string contains a substring</li><li><code>strings.Count()</code> counts how many times a substring appears in a string</li><li><code>strings.Join()</code> used to join multiple strings and create a new one</li><li><code>strings.Split()</code> used to create an array of strings from a string, dividing the original one on a specific character, like a comma or a space</li><li><code>strings.ReplaceAll()</code> used to replace a portion in a string and replace it with a new one</li></ul>",2))])}const y=c(m,[["render",k],["__file","strings-in-go.html.vue"]]),w=JSON.parse('{"path":"/freecodecamp.org/go-beginners-handbook/strings-in-go.html","title":"Strings in Go","lang":"en-US","frontmatter":{"lang":"en-US","title":"Strings in Go","description":"Article(s) > (10/21) The Go Handbook – Learn Golang for Beginners","category":["Go","Article(s)"],"tag":["blog","freecodecamp.org","go","golang"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > (10/21) The Go Handbook – Learn Golang for Beginners"},{"property":"og:description","content":"Strings in Go"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/go-beginners-handbook/strings-in-go.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/go-beginners-handbook/strings-in-go.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Strings in Go"}],["meta",{"property":"og:description","content":"Article(s) > (10/21) The Go Handbook – Learn Golang for Beginners"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://freecodecamp.org/news/content/images/2022/10/golang.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://freecodecamp.org/news/content/images/2022/10/golang.png"}],["meta",{"name":"twitter:image:alt","content":"Strings in Go"}],["meta",{"property":"article:author","content":"Flavio Copes"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"go"}],["meta",{"property":"article:tag","content":"golang"}],["meta",{"property":"article:published_time","content":"2022-10-19T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Strings in Go\\",\\"image\\":[\\"https://freecodecamp.org/news/content/images/2022/10/golang.png\\"],\\"datePublished\\":\\"2022-10-19T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Flavio Copes\\"}]}"]],"date":"2022-10-19T00:00:00.000Z","author":"Flavio Copes","isOriginal":false,"cover":"https://freecodecamp.org/news/content/images/2022/10/golang.png"},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":1}]},"readingTime":{"minutes":2.33,"words":698},"filePathRelative":"freecodecamp.org/go-beginners-handbook/strings-in-go.md","localizedDate":"October 19, 2022","excerpt":"\\n","copyright":{"author":"Flavio Copes"}}');export{y as comp,w as data};