import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as e,as as u,ao as n,at as a,au as i,al as d,aq as o,ar as g}from"./app-CpYYKbnj.js";const h={},m={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"};function w(r,t){const s=o("VPCard"),c=o("VidStack");return g(),l("div",null,[e("h1",m,[e("a",f,[e("span",null,u(r.$frontmatter.title)+" 관련",1)])]),n(s,a(i({title:"Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/read/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(s,a(i({title:"Basic Swift debugging using print() | Hacking with iOS",desc:"Basic Swift debugging using print()",link:"https://hackingwithswift.com/read/18/2/basic-swift-debugging-using-print",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n(c,{src:"youtube/tbFO8DsJ6aw"}),t[2]||(t[2]=d(`<p>We&#39;re going to start with the absolute easiest debugging technique, which is the <code>print()</code> function. This prints a message into the Xcode debug console that can say anything you want, because users won&#39;t see it in the UI. The &quot;scattershot&quot; approach to bug fixing is to litter your code with calls to <code>print()</code> then follow the messages to see what&#39;s going on.</p><p>You&#39;ll meet lots of people telling you how bad this is, but the truth is it&#39;s the debugging method everyone starts with – it&#39;s easy, it&#39;s natural, and it often gives you enough information to solve your problem. Use it with Swift&#39;s string interpolation to see the contents of your variables when your app is running.</p><p>We’ve used <code>print()</code> several times already, always in its most basic form:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;I&#39;m inside the viewDidLoad() method!&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>By adding calls like that to your various methods, you can see exactly how your program flowed.</p><p>However, <code>print()</code> is actually a bit more complicated behind the scenes. For example, you can actually pass it lots of values at the same time, and it will print them all:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token function">print</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>That makes <code>print()</code> a variadic function, which you learned about previously. Here, though, it’s worth adding that <code>print()</code>’s variadic nature becomes much more useful when you use its optional extra parameters: <code>separator</code> and <code>terminator</code>.</p><p>The first of these, <code>separator</code>, lets you provide a string that should be placed between every item in the <code>print()</code> call. Try running this code:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token function">print</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> separator<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;-&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>That should print “1-2-3-4-5”, because the <code>separator</code> parameter is used to split up each item passed into <code>print()</code>.</p><p>The second optional parameter, <code>terminator</code>, is what should be placed after the final item. It’s <code>\\n</code> by default, which you should remember means “line break”. If you don’t want <code>print()</code> to insert a line break after every call, just write this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Some message&quot;</span></span><span class="token punctuation">,</span> terminator<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Notice how you don’t need to specify <code>separator</code> if you don’t want to.</p>`,14))])}const y=p(h,[["render",w],["__file","02-basic-swift-debugging-using-print.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/read/18/02-basic-swift-debugging-using-print.html","title":"Basic Swift debugging using print()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Basic Swift debugging using print()","description":"Article(s) > Basic Swift debugging using print()","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore","ios"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Basic Swift debugging using print()"},{"property":"og:description","content":"Basic Swift debugging using print()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/18/02-basic-swift-debugging-using-print.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/18/02-basic-swift-debugging-using-print.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Basic Swift debugging using print()"}],["meta",{"property":"og:description","content":"Article(s) > Basic Swift debugging using print()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:tag","content":"ios"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Basic Swift debugging using print()\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.68,"words":505},"filePathRelative":"hackingwithswift.com/read/18/02-basic-swift-debugging-using-print.md","excerpt":"\\n"}');export{y as comp,v as data};