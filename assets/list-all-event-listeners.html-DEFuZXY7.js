import{_ as g}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as e,as as c,ao as s,at as l,au as i,al as r,an as n,aq as p,ar as m}from"./app-CpYYKbnj.js";const h={},v={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"};function b(d,t){const a=p("VPCard"),o=p("FontIcon");return m(),u("div",null,[e("h1",v,[e("a",k,[e("span",null,c(d.$frontmatter.title)+" 관련",1)])]),s(a,l(i({title:"Google Chrome > Article(s)",desc:"Article(s)",link:"/tool/chrome/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),s(a,l(i({title:"Safari > Article(s)",desc:"Article(s)",link:"/tool/safari/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),t[24]||(t[24]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[25]||(t[25]=e("hr",null,null,-1)),s(a,l(i({title:"List all event listeners on the entire page | Devtools Tips",desc:"List all event listeners on the entire page",link:"https://devtoolstips.org/tips/en/list-all-event-listeners/",logo:"https://devtoolstips.org/assets/logo-small.png",background:"rgba(31,44,43,0.2)"})),null,16),t[26]||(t[26]=r(`<p>When you don&#39;t know a codebase, it might be hard to know where to get started, and what events are being listened to by which elements.</p><p>The <strong>Console</strong> tool, in Chromium-based browsers, comes with a nice utility function named <code>getEventListeners</code> which returns all of the listeners attached to a given element. If we combine this with the <code>$$</code> utility function, we can get a list of all elements on the page, and their listeners.</p><p>The following code snippet will return an array of objects, each containing an element and its listeners. It also filters out all of the elements that don&#39;t have any listeners attached to them.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token function">$$</span><span class="token punctuation">(</span><span class="token string">&quot;*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">el</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">{</span> el<span class="token punctuation">,</span> <span class="token literal-property property">listeners</span><span class="token operator">:</span> <span class="token function">getEventListeners</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">data</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>listeners<span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>So, to list all elements that have listeners on a page:</p>`,5)),e("ol",null,[e("li",null,[t[0]||(t[0]=n("Open the ")),t[1]||(t[1]=e("strong",null,"Console",-1)),t[2]||(t[2]=n(" tool, by pressing ")),t[3]||(t[3]=e("kbd",null,"Ctrl",-1)),t[4]||(t[4]=n("+")),t[5]||(t[5]=e("kbd",null,"Shift",-1)),t[6]||(t[6]=n("+")),t[7]||(t[7]=e("kbd",null,"J",-1)),t[8]||(t[8]=n(" on ")),s(o,{icon:"fa-brands fa-windows"}),t[9]||(t[9]=n("Windows or ")),s(o,{icon:"fa-brands fa-linux"}),t[10]||(t[10]=n("Linux, or ")),t[11]||(t[11]=e("kbd",null,"Cmd",-1)),t[12]||(t[12]=n("+")),t[13]||(t[13]=e("kbd",null,"Option",-1)),t[14]||(t[14]=n("+")),t[15]||(t[15]=e("kbd",null,"J",-1)),t[16]||(t[16]=n(" on ")),s(o,{icon:"iconfont icon-macos"}),t[17]||(t[17]=n("macOS."))]),t[18]||(t[18]=e("li",null,[n("Paste the code snippet above in the "),e("strong",null,"Console"),n(", and press "),e("kbd",null,"Enter"),n(".")],-1)),t[19]||(t[19]=e("li",null,[n("The list of all elements with listeners is displayed in the "),e("strong",null,"Console"),n(".")],-1))]),e("figure",null,[t[23]||(t[23]=e("img",{src:"https://devtoolstips.org/assets/img/list-all-event-listeners.png",alt:'<FontIcon icon="fa-brands fa-chrome"/>Chrome, with the  website loaded, and the DevTools Console on the side, showing the result of the above script',tabindex:"0",loading:"lazy"},null,-1)),e("figcaption",null,[s(o,{icon:"fa-brands fa-chrome"}),t[20]||(t[20]=n("Chrome, with the ")),t[21]||(t[21]=e("code",null,"devtoolstips.org",-1)),t[22]||(t[22]=n(" website loaded, and the DevTools Console on the side, showing the result of the above script"))])]),t[27]||(t[27]=r('<details class="hint-container details"><summary>See also</summary><ul><li><a href="https://devtoolstips.org/tips/en/query-dom-from-console" target="_blank" rel="noopener noreferrer">Find DOM elements from the console</a><!-- TODO: add VPCard --></li><li><a href="https://devtoolstips.org/tips/en/copy-element-styles" target="_blank" rel="noopener noreferrer">Copy an elements styles</a><!-- TODO: add VPCard --></li><li><a href="https://devtoolstips.org/tips/en/debug-unwanted-scrollbars" target="_blank" rel="noopener noreferrer">Debug unwanted scrollbars</a><!-- TODO: add VPCard --></li><li><a href="https://devtoolstips.org/tips/en/edit-position" target="_blank" rel="noopener noreferrer">Edit CSS absolute and relative positions by dragging points in the page</a><!-- TODO: add VPCard --></li></ul></details>',1))])}const w=g(h,[["render",b],["__file","list-all-event-listeners.html.vue"]]),C=JSON.parse('{"path":"/devtoolstips.org/list-all-event-listeners.html","title":"List all event listeners on the entire page","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"List all event listeners on the entire page","description":"Article(s) > List all event listeners on the entire page","icon":"fa-brands fa-js","category":["JavaScript","Brwoser","Google","Google Chrome","Safari","Article(s)"],"tag":["blog","devtoolstips.org","js","debug","tips","console","google","googlechrome","google-chrome","safari"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > List all event listeners on the entire page"},{"property":"og:description","content":"List all event listeners on the entire page"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/devtoolstips.org/list-all-event-listeners.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/devtoolstips.org/list-all-event-listeners.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"List all event listeners on the entire page"}],["meta",{"property":"og:description","content":"Article(s) > List all event listeners on the entire page"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://devtoolstips.org/assets/img/list-all-event-listeners.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"devtoolstips.org"}],["meta",{"property":"article:tag","content":"js"}],["meta",{"property":"article:tag","content":"debug"}],["meta",{"property":"article:tag","content":"tips"}],["meta",{"property":"article:tag","content":"console"}],["meta",{"property":"article:tag","content":"google"}],["meta",{"property":"article:tag","content":"googlechrome"}],["meta",{"property":"article:tag","content":"google-chrome"}],["meta",{"property":"article:tag","content":"safari"}],["meta",{"property":"article:published_time","content":"2023-11-21T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"List all event listeners on the entire page\\",\\"image\\":[\\"https://devtoolstips.org/assets/img/list-all-event-listeners.png\\"],\\"datePublished\\":\\"2023-11-21T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"prev":"/tool/chrome/articles/README.md","date":"2023-11-21T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":1.6,"words":480},"filePathRelative":"devtoolstips.org/list-all-event-listeners.md","localizedDate":"2023년 11월 21일","excerpt":"\\n"}');export{w as comp,C as data};