import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as r,am as s,as as u,ao as a,at as e,au as i,al as d,aq as o,ar as k}from"./app-CpYYKbnj.js";const h={},g={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function w(p,n){const t=o("VPCard"),c=o("VidStack");return k(),r("div",null,[s("h1",g,[s("a",m,[s("span",null,u(p.$frontmatter.title)+" 관련",1)])]),a(t,e(i({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[0]||(n[0]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[1]||(n[1]=s("hr",null,null,-1)),a(t,e(i({title:"Working with strings in Swift | Hacking with iOS",desc:"Working with strings in Swift",link:"https://hackingwithswift.com/read/24/3/working-with-strings-in-swift",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a(c,{src:"youtube/AthqAjYhZLw"}),n[2]||(n[2]=d(`<p>We’ve used strings in lots of the projects so far, and I’ve tried to introduce you to a handful of important properties and methods as we go. Here, though, I’m going to run through some of those, plus a few more, while also looking at how we can write extensions to make strings a little more useful.</p><p>First, there are methods for checking whether a string starts with or ends with a substring: <code>hasPrefix()</code> and <code>hasSuffix()</code>. They look like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> password <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;12345&quot;</span></span></span>
<span class="line">password<span class="token punctuation">.</span><span class="token function">hasPrefix</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;123&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">password<span class="token punctuation">.</span><span class="token function">hasSuffix</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;345&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We can add extension methods to <code>String</code> to extend the way prefixing and suffixing works:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">extension</span> <span class="token class-name">String</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// remove a prefix if it exists</span></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">deletingPrefix</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> <span class="token keyword">prefix</span><span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">String</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">guard</span> <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">hasPrefix</span><span class="token punctuation">(</span><span class="token keyword">prefix</span><span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">self</span> <span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">dropFirst</span><span class="token punctuation">(</span><span class="token keyword">prefix</span><span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// remove a suffix if it exists</span></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">deletingSuffix</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> suffix<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">String</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">guard</span> <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">hasSuffix</span><span class="token punctuation">(</span>suffix<span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">self</span> <span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">dropLast</span><span class="token punctuation">(</span>suffix<span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That uses the <code>dropFirst()</code> and <code>dropLast()</code> method of <code>String</code>, which removes a certain number of letters from either end of the string.</p><p>We’ve used <code>lowercased()</code> and <code>uppercased()</code> in previous projects, but there’s also the <code>capitalized</code> property that gives the first letter of each word a capital letter. For example:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> weather <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;it&#39;s going to rain&quot;</span></span></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span>weather<span class="token punctuation">.</span>capitalized<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>That will print “It’s Going To Rain”.</p><p>We could add our own specialized capitalization that uppercases only the first letter in our string:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">extension</span> <span class="token class-name">String</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> capitalizedFirst<span class="token punctuation">:</span> <span class="token class-name">String</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">guard</span> <span class="token keyword">let</span> firstLetter <span class="token operator">=</span> <span class="token keyword">self</span><span class="token punctuation">.</span>first <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token string-literal"><span class="token string">&quot;&quot;</span></span> <span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">return</span> firstLetter<span class="token punctuation">.</span><span class="token function">uppercased</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">dropFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>One thing you <em>can’t</em> see in that is an interesting subtlety of working with strings: individual letters in strings aren’t instances of <code>String</code>, but are instead instances of <code>Character</code> – a dedicated type for holding single-letters of a string.</p><p>So, that <code>uppercased()</code> method is actually a method on <em>Character</em> rather than <em>String</em>. However, where things get <em>really</em> interesting is that <code>Character.uppercased()</code> actually returns a string, not an uppercased <code>Character</code>. The reason is simple: language is complicated, and although many languages have one-to-one mappings between lowercase and uppercase characters, some do not.</p><p>For example, in English “a” maps to “A”, “b” to “B”, and so on, but in German “ß” becomes “SS” when uppercased. “SS” is clearly two separate letters, so <code>uppercased()</code> has no choice but to return a string.</p><p>One last useful method of strings is <code>contains()</code>, which returns true if it contains another string. So, this will return true:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> input <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Swift is like Objective-C without the C&quot;</span></span></span>
<span class="line">input<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Swift&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>So, <code>contains()</code> takes a string parameter and returns true or false depending on whether that parameter exists in the string. Keep that in your head for a moment.</p><p>Now look at this code:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> languages <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;Python&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;Ruby&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;Swift&quot;</span></span><span class="token punctuation">]</span></span>
<span class="line">languages<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Swift&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>That will also return true, because arrays have a <code>contains()</code> method that returns true or false depending on whether they contain the element you were looking for.</p><p>Now for the part that confuses people – brace yourself!</p><p>We have an array of strings (<code>[&quot;Python&quot;, &quot;Ruby&quot;, &quot;Swift&quot;]</code>) and we have an input string (<code>&quot;Swift is like Objective-C without the C&quot;</code>). How can we check whether any string in our array exists in our input string?</p><p>Well, we might start writing an extension on <code>String</code> like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">extension</span> <span class="token class-name">String</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">containsAny</span><span class="token punctuation">(</span>of array<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">String</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Bool</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">for</span> item <span class="token keyword">in</span> array <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">return</span> <span class="token boolean">true</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">false</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We can now run our check like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">input<span class="token punctuation">.</span><span class="token function">containsAny</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> languages<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>That certainly <em>works</em>, but it’s not elegant – and Swift has a better solution built right in.</p><p>You see, arrays have a <em>second</em> <code>contains()</code> method called <code>contains(where:)</code>. This lets us provide a closure that accepts an element from the array as its only parameter and returns true or false depending on whatever condition we decide we want. This closure gets run on all the items in the array until one returns true, at which point it stops.</p><p>Now let’s put together the pieces:</p><ul><li>When used with an array of strings, the <code>contains(where:)</code> method wants to call a closure that accepts a string and returns true or false.</li><li>The <code>contains()</code> method of <code>String</code> accepts a string as its parameter and returns true or false.</li><li>Swift massively blurs the lines between functions, methods, closures, and more.</li></ul><p>So, what we can actually do is pass one function directly into the other, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line">languages<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token keyword">where</span><span class="token punctuation">:</span> input<span class="token punctuation">.</span>contains<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Don’t feel bad if you need to read that single line of code several times – it’s not easy! Let’s break it down.</p><p><code>contains(where:)</code> will call its closure once for every element in the <code>languages</code> array until it finds one that returns true, at which point it stops.</p><p>In that code we’re passing <code>input.contains</code> as the closure that <code>contains(where:)</code> should run. This means Swift will call <code>input.contains(&quot;Python&quot;)</code> and get back false, then it will call <code>input.contains(&quot;Ruby&quot;)</code> and get back false again, and finally call <code>input.contains(&quot;Swift&quot;)</code> and get back true – then stop there.</p><p>So, because the <code>contains()</code> method of strings has the exact same signature that <code>contains(where:)</code> expects (take a string and return a Boolean), this works perfectly – do you see what I mean about how Swift blurs the lines between these things?</p>`,36))])}const y=l(h,[["render",w],["__file","03-working-with-strings-in-swift.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/read/24/03-working-with-strings-in-swift.html","title":"Working with strings in Swift","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Working with strings in Swift","description":"Article(s) > Working with strings in Swift","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Working with strings in Swift"},{"property":"og:description","content":"Working with strings in Swift"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/24/03-working-with-strings-in-swift.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/24/03-working-with-strings-in-swift.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Working with strings in Swift"}],["meta",{"property":"og:description","content":"Article(s) > Working with strings in Swift"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Working with strings in Swift\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.44,"words":1031},"filePathRelative":"hackingwithswift.com/read/24/03-working-with-strings-in-swift.md","excerpt":"\\n"}');export{y as comp,b as data};