import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as r,am as a,as as u,ao as n,at as t,au as o,al as d,aq as i,ar as k}from"./app-CpYYKbnj.js";const g={},h={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"};function y(c,s){const e=i("VPCard"),p=i("VidStack");return k(),r("div",null,[a("h1",h,[a("a",f,[a("span",null,u(c.$frontmatter.title)+" 관련",1)])]),n(e,t(o({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),s[0]||(s[0]=a("nav",{class:"table-of-contents"},[a("ul")],-1)),s[1]||(s[1]=a("hr",null,null,-1)),n(e,t(o({title:"Reading and writing basics: UserDefaults | Hacking with iOS",desc:"Reading and writing basics: UserDefaults",link:"https://hackingwithswift.com/read/12/2/reading-and-writing-basics-userdefaults",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n(p,{src:"youtube/WHKLXI8baJk"}),s[2]||(s[2]=d(`<p>You can use <code>UserDefaults</code> to store any basic data type for as long as the app is installed. You can write basic types such as <code>Bool</code>, <code>Float</code>, <code>Double</code>, <code>Int</code>, <code>String</code>, or <code>URL</code>, but you can also write more complex types such as arrays, dictionaries and <code>Date</code> – and even <code>Data</code> values.</p><p>When you write data to <code>UserDefaults</code>, it automatically gets loaded when your app runs so that you can read it back again. This makes using it really easy, but you need to know that it&#39;s a bad idea to store lots of data in there because it will slow loading of your app. If you think your saved data would take up more than say 100KB, <code>UserDefaults</code> is almost certainly the wrong choice.</p><p>Before we get into modifying project 10, we&#39;re going to do a little bit of test coding first to try out what <code>UserDefaults</code> lets us do. You might find it useful to create a fresh Single View App project just so you can test out the code.</p><p>To get started with <code>UserDefaults</code>, you create a new instance of the class like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> defaults <span class="token operator">=</span> <span class="token class-name">UserDefaults</span><span class="token punctuation">.</span>standard</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Once that&#39;s done, it&#39;s easy to set a variety of values – you just need to give each one a unique key so you can reference it later. These values nearly always have no meaning outside of what you use them for, so just make sure the key names are memorable.</p><p>Here are some examples:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> defaults <span class="token operator">=</span> <span class="token class-name">UserDefaults</span><span class="token punctuation">.</span>standard</span>
<span class="line">defaults<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Age&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">defaults<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;UseTouchID&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">defaults<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span><span class="token class-name">CGFloat</span><span class="token punctuation">.</span>pi<span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Pi&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can also use the <code>set()</code> to store strings, arrays, dictionaries and dates. Now, here&#39;s a curiosity that&#39;s worth explaining briefly: in Swift, strings, arrays and dictionaries are all structs, not objects. But <code>UserDefaults</code> was written for <code>NSString</code> and friends – all of which are 100% interchangeable with Swift their equivalents – which is why this code works.</p><p>Using <code>set()</code> for these advanced types is just the same as using the other data types:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">defaults<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Paul Hudson&quot;</span></span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Name&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">defaults<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span><span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;LastRun&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>Even if you&#39;re trying to save complex types such as arrays and dictionaries, <code>UserDefaults</code> laps it up:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> array <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;Hello&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;World&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">defaults<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;SavedArray&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">let</span> dict <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;Name&quot;</span></span><span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Paul&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;Country&quot;</span></span><span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;UK&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">defaults<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span>dict<span class="token punctuation">,</span> forKey<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;SavedDict&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That&#39;s enough about writing for now; let&#39;s take a look at reading.</p><p>When you&#39;re reading values from <code>UserDefaults</code> you need to check the return type carefully to ensure you know what you&#39;re getting. Here&#39;s what you need to know:</p><ul><li><code>integer(forKey:)</code> returns an integer if the key existed, or 0 if not.</li><li><code>bool(forKey:)</code> returns a boolean if the key existed, or false if not.</li><li><code>float(forKey:)</code> returns a float if the key existed, or 0.0 if not.</li><li><code>double(forKey:)</code> returns a double if the key existed, or 0.0 if not.</li><li><code>object(forKey:)</code> returns <code>Any?</code> so you need to conditionally typecast it to your data type.</li></ul><p>Knowing the return values are important, because if you use <code>bool(forKey:)</code> and get back &quot;false&quot;, does that mean the key didn&#39;t exist, or did it perhaps exist and you just set it to be false?</p><p>It&#39;s <code>object(forKey:)</code> that will cause you the most bother, because you get an optional object back. You&#39;re faced with two options, one of which isn&#39;t smart so you realistically have only one option!</p><p>Your options:</p><ul><li>Use <code>as!</code> to force typecast your object to the data type it should be.</li><li>Use <code>as?</code> to optionally typecast your object to the type it should be.</li></ul><p>If you use <code>as!</code> and <code>object(forKey:)</code> returned <code>nil</code>, you&#39;ll get a crash, so I really don&#39;t recommend it unless you&#39;re absolutely sure. But equally, using <code>as?</code> is annoying because you then have to unwrap the optional or create a default value.</p><p>There is a solution here, and it has the catchy name of <em>the nil coalescing operator</em>, and it looks like this: <code>??</code>. This does two things at once: if the object on the left is optional and exists, it gets unwrapped into a non-optional value; if it does not exist, it uses the value on the right instead.</p><p>This means we can use <code>object(forKey:)</code> and <code>as?</code> to get an optional object, then use <code>??</code> to either unwrap the object or set a default value, all in one line.</p><p>For example, let&#39;s say we want to read the array we saved earlier with the key name <code>SavedArray</code>. Here&#39;s how to do that with the <code>nil</code> coalescing operator:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> array <span class="token operator">=</span> defaults<span class="token punctuation">.</span><span class="token function">object</span><span class="token punctuation">(</span>forKey<span class="token punctuation">:</span><span class="token string-literal"><span class="token string">&quot;SavedArray&quot;</span></span><span class="token punctuation">)</span> <span class="token keyword">as</span><span class="token operator">?</span> <span class="token punctuation">[</span><span class="token class-name">String</span><span class="token punctuation">]</span> <span class="token operator">??</span> <span class="token punctuation">[</span><span class="token class-name">String</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>So, if <code>SavedArray</code> exists and is a string array, it will be placed into the <code>array</code> constant. If it doesn&#39;t exist (or if it does exist and isn&#39;t a string array), then <code>array</code> gets set to be a new string array.</p><p>This technique also works for dictionaries, but obviously you need to typecast it correctly. To read the dictionary we saved earlier, we&#39;d use this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> dict <span class="token operator">=</span> defaults<span class="token punctuation">.</span><span class="token function">object</span><span class="token punctuation">(</span>forKey<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;SavedDict&quot;</span></span><span class="token punctuation">)</span> <span class="token keyword">as</span><span class="token operator">?</span> <span class="token punctuation">[</span><span class="token class-name">String</span><span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">]</span> <span class="token operator">??</span> <span class="token punctuation">[</span><span class="token class-name">String</span><span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,28))])}const b=l(g,[["render",y],["__file","02-reading-and-writing-basics-userdefaults.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/read/12/02-reading-and-writing-basics-userdefaults.html","title":"Reading and writing basics: UserDefaults","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Reading and writing basics: UserDefaults","description":"Article(s) > Reading and writing basics: UserDefaults","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Reading and writing basics: UserDefaults"},{"property":"og:description","content":"Reading and writing basics: UserDefaults"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/12/02-reading-and-writing-basics-userdefaults.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/12/02-reading-and-writing-basics-userdefaults.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Reading and writing basics: UserDefaults"}],["meta",{"property":"og:description","content":"Article(s) > Reading and writing basics: UserDefaults"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Reading and writing basics: UserDefaults\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.33,"words":998},"filePathRelative":"hackingwithswift.com/read/12/02-reading-and-writing-basics-userdefaults.md","excerpt":"\\n"}');export{b as comp,v as data};