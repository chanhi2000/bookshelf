import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as t,as as g,ao as s,at as l,au as i,al as r,an as a,aq as p,ar as m}from"./app-CpYYKbnj.js";const v={},h={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"};function b(d,e){const n=p("VPCard"),o=p("FontIcon");return m(),u("div",null,[t("h1",h,[t("a",f,[t("span",null,g(d.$frontmatter.title)+" 관련",1)])]),s(n,l(i({title:"JavaScript > Article(s)",desc:"Article(s)",link:"/programming/js/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),e[11]||(e[11]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[12]||(e[12]=t("hr",null,null,-1)),s(n,l(i({title:"Name evaluated files with the sourceURL pragma | Devtools Tips",desc:"Name evaluated files with the sourceURL pragma",link:"https://devtoolstips.org/tips/en/name-evaluated-files/",logo:"https://devtoolstips.org/assets/logo-small.png",background:"rgba(31,44,43,0.2)"})),null,16),e[13]||(e[13]=r(`<p>If you insert JavaScript code in a webpage by using the <code>eval()</code> function, or inline <code>&lt;script&gt;</code> tags, you can use the <code>sourceURL</code> pragma to give them a name in DevTools.</p><p>For example, when using <code>eval()</code>:</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token function">eval</span><span class="token punctuation">(</span><span class="token string">&#39;console.log(&quot;Hello world!&quot;)\\n//# sourceURL=hello-world.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,3)),t("p",null,[e[0]||(e[0]=a("The above code snippet not only runs the evaluated code, but it also makes it appear in the ")),e[1]||(e[1]=t("strong",null,"Sources",-1)),e[2]||(e[2]=a(" (or ")),e[3]||(e[3]=t("strong",null,"Debugger",-1)),e[4]||(e[4]=a(") tool as if it came from a file named ")),s(o,{icon:"fa-brands fa-js"}),e[5]||(e[5]=t("code",null,"hello-world.js",-1)),e[6]||(e[6]=a("."))]),t("figure",null,[e[10]||(e[10]=t("img",{src:"https://devtoolstips.org/assets/img/name-evaluated-files.png",alt:'<FontIcon icon="fa-brands fa-firefox-browser"/>Firefox DevTools, the  pragma was used when evaluating some code in the Console, and a new file now appears in the Debugger tool, named after the string provided in the sourceURL pragma',tabindex:"0",loading:"lazy"},null,-1)),t("figcaption",null,[s(o,{icon:"fa-brands fa-firefox-browser"}),e[7]||(e[7]=a("Firefox DevTools, the ")),e[8]||(e[8]=t("code",null,"sourceURL",-1)),e[9]||(e[9]=a(" pragma was used when evaluating some code in the Console, and a new file now appears in the Debugger tool, named after the string provided in the sourceURL pragma"))])]),e[14]||(e[14]=r(`<p>This can also be useful when using inline <code>&lt;script&gt;</code> tags:</p><div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Hello world!&quot;</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token comment">//# sourceURL=hello-world.js</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Using the <code>sourceURL</code> pragma is a great way to debug your code more easily in DevTools. <strong>Console</strong> messages will be easier to identify, and source code will be easier to debug.</p><details class="hint-container details"><summary>See also</summary><ul><li><a href="https://devtoolstips.org/tips/en/debugger-statement" target="_blank" rel="noopener noreferrer">Use the debugger statement to pause script execution</a><!-- TODO: add VPCard --></li><li><a href="https://devtoolstips.org/tips/en/unminify-javascript-code" target="_blank" rel="noopener noreferrer">Unminify JavaScript code to easily read and debug it</a><!-- TODO: add VPCard --></li><li><a href="https://devtoolstips.org/tips/en/detect-unused-code" target="_blank" rel="noopener noreferrer">Detect unused CSS and JavaScript code</a><!-- TODO: add VPCard --></li><li><a href="https://devtoolstips.org/tips/en/ignore-scripts" target="_blank" rel="noopener noreferrer">Ignore JavaScript code to ease debugging</a><!-- TODO: add VPCard --></li></ul></details>`,4))])}const w=c(v,[["render",b],["__file","name-evaluated-files.html.vue"]]),R=JSON.parse('{"path":"/devtoolstips.org/name-evaluated-files.html","title":"Name evaluated files with the sourceURL pragma","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Name evaluated files with the sourceURL pragma","description":"Article(s) > Name evaluated files with the sourceURL pragma","icon":"fa-brands fa-js","category":["JavaScript","Article(s)"],"tag":["blog","devtoolstips.org","js","debug","tips","eval","sourceURL"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Name evaluated files with the sourceURL pragma"},{"property":"og:description","content":"Name evaluated files with the sourceURL pragma"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/devtoolstips.org/name-evaluated-files.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/devtoolstips.org/name-evaluated-files.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Name evaluated files with the sourceURL pragma"}],["meta",{"property":"og:description","content":"Article(s) > Name evaluated files with the sourceURL pragma"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://devtoolstips.org/assets/img/name-evaluated-files.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"devtoolstips.org"}],["meta",{"property":"article:tag","content":"js"}],["meta",{"property":"article:tag","content":"debug"}],["meta",{"property":"article:tag","content":"tips"}],["meta",{"property":"article:tag","content":"eval"}],["meta",{"property":"article:tag","content":"sourceURL"}],["meta",{"property":"article:published_time","content":"2024-01-29T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Name evaluated files with the sourceURL pragma\\",\\"image\\":[\\"https://devtoolstips.org/assets/img/name-evaluated-files.png\\"],\\"datePublished\\":\\"2024-01-29T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"prev":"/programming/js/articles/README.md","date":"2024-01-29T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":1.25,"words":376},"filePathRelative":"devtoolstips.org/name-evaluated-files.md","localizedDate":"2024년 1월 29일","excerpt":"\\n"}');export{w as comp,R as data};