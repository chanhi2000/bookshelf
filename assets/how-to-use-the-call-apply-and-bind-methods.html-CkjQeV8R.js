import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as a,as as d,ao as s,at as k,au as m,ap as t,al as h,aq as o,ar as v,an as p}from"./app-CpYYKbnj.js";const g={},b={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},y={class:"table-of-contents"};function w(c,n){const i=o("VPCard"),e=o("router-link"),l=o("SiteInfo");return v(),u("div",null,[a("h1",b,[a("a",f,[a("span",null,d(c.$frontmatter.title)+" 관련",1)])]),s(i,k(m({title:"The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples",desc:"JavaScript is a widely used language in web development and powers interactive features of virtually every website out there. JavaScript makes it possible to create dynamic web pages and is very versatile. JavaScript remains one of the most in-demand programming languages in 2024. Many companies are looking for proficiency in...",link:"/freecodecamp.org/js-interview-prep-handbook/README.md",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",background:"rgba(10,10,35,0.2)"})),null,16),a("nav",y,[a("ul",null,[a("li",null,[s(e,{to:"#call"},{default:t(()=>n[0]||(n[0]=[p("call")])),_:1})]),a("li",null,[s(e,{to:"#apply"},{default:t(()=>n[1]||(n[1]=[p("apply")])),_:1})]),a("li",null,[s(e,{to:"#bind"},{default:t(()=>n[2]||(n[2]=[p("bind")])),_:1})])])]),n[3]||(n[3]=a("hr",null,null,-1)),s(l,{name:"The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples",desc:"JavaScript is a widely used language in web development and powers interactive features of virtually every website out there. JavaScript makes it possible to create dynamic web pages and is very versatile. JavaScript remains one of the most in-demand programming languages in 2024. Many companies are looking for proficiency in...",url:"https://freecodecamp.org/news/js-interview-prep-handbook#heading-how-to-use-the-call-apply-and-bind-methods",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"}),n[4]||(n[4]=h(`<p>When you use <code>this</code> inside a function, its value is set to the object on which the function is called. Let&#39;s take an example:</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Name: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, Age: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>call</code>, <code>apply</code> and <code>bind</code> are used to set the value of the <code>this</code> keyword inside a method.</p><hr><h2 id="call" tabindex="-1"><a class="header-anchor" href="#call"><span><code>call</code></span></a></h2><p>To call <code>getInfo()</code> function on an object, use the <code>call</code> function. Let&#39;s create two objects and call <code>getInfo()</code> on these objects.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">const</span> ob1 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;alex&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">25</span> <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> ob2 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;marcus&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">23</span> <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token function">getInfo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>ob1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Name: alex, Age: 25</span></span>
<span class="line"><span class="token function">getInfo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>ob2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Name: marcus, Age: 23</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>call</code> sets the value of the <code>this</code> keyword inside a function.</p><hr><h2 id="apply" tabindex="-1"><a class="header-anchor" href="#apply"><span><code>apply</code></span></a></h2><p>The <code>apply</code> method is similar to <code>call</code>, but it differs in the way you pass arguments. Consider a function with arguments:</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Name: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, Age: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Args: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>a<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> and </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>b<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;alex&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">25</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token function">getInfo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token function">getInfo</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="bind" tabindex="-1"><a class="header-anchor" href="#bind"><span><code>bind</code></span></a></h2><p><code>bind</code> is used to create a new function that has its <code>this</code> keyword set to one object. Let&#39;s use the above <code>getInfo</code> function as example.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;alex&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">25</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> objGetInfo <span class="token operator">=</span> <span class="token function">getInfo</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token function">objGetInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>When <code>bind</code> is called on <code>getInfo()</code> function, it returns a new function that is bound to <code>obj</code>. Now, every time you call the <code>objGetInfo()</code> function, <code>this</code> keyword refers to <code>obj</code>.</p><p>All three methods are similar. That is, they set the value of <code>this</code> keyword. However, a key difference in <code>bind</code> is that it returns a new function, whereas <code>call</code> and <code>apply</code> simply just call the function.</p>`,18))])}const S=r(g,[["render",w],["__file","how-to-use-the-call-apply-and-bind-methods.html.vue"]]),x=JSON.parse('{"path":"/freecodecamp.org/js-interview-prep-handbook/how-to-use-the-call-apply-and-bind-methods.html","title":"How to Use the call, apply and bind Methods.","lang":"en-US","frontmatter":{"lang":"en-US","title":"How to Use the call, apply and bind Methods.","description":"Article(s) > (9/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples","category":["JavaScript","Article(s)"],"tag":["blog","freecodecamp.org","js","javascript"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > (9/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples"},{"property":"og:description","content":"How to Use the call, apply and bind Methods."},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/js-interview-prep-handbook/how-to-use-the-call-apply-and-bind-methods.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/js-interview-prep-handbook/how-to-use-the-call-apply-and-bind-methods.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to Use the call, apply and bind Methods."}],["meta",{"property":"og:description","content":"Article(s) > (9/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"}],["meta",{"name":"twitter:image:alt","content":"How to Use the call, apply and bind Methods."}],["meta",{"property":"article:author","content":"Kunal Nalawade"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"js"}],["meta",{"property":"article:tag","content":"javascript"}],["meta",{"property":"article:published_time","content":"2024-09-10T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to Use the call, apply and bind Methods.\\",\\"image\\":[\\"https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png\\"],\\"datePublished\\":\\"2024-09-10T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kunal Nalawade\\"}]}"]],"date":"2024-09-10T00:00:00.000Z","isOriginal":false,"author":"Kunal Nalawade","cover":"https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"},"headers":[{"level":2,"title":"call","slug":"call","link":"#call","children":[]},{"level":2,"title":"apply","slug":"apply","link":"#apply","children":[]},{"level":2,"title":"bind","slug":"bind","link":"#bind","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":1}]},"readingTime":{"minutes":1.82,"words":546},"filePathRelative":"freecodecamp.org/js-interview-prep-handbook/how-to-use-the-call-apply-and-bind-methods.md","localizedDate":"September 10, 2024","excerpt":"\\n","copyright":{"author":"Kunal Nalawade"}}');export{S as comp,x as data};