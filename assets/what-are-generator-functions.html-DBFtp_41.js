import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as n,as as d,ao as t,at as m,au as g,al as s,an as a,aq as o,ar as v}from"./app-CpYYKbnj.js";const f={},h={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"},b={href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction",target:"_blank",rel:"noopener noreferrer"},w={href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol",target:"_blank",rel:"noopener noreferrer"};function y(i,e){const p=o("VPCard"),c=o("SiteInfo"),r=o("FontIcon");return v(),u("div",null,[n("h1",h,[n("a",k,[n("span",null,d(i.$frontmatter.title)+" 관련",1)])]),t(p,m(g({title:"The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples",desc:"JavaScript is a widely used language in web development and powers interactive features of virtually every website out there. JavaScript makes it possible to create dynamic web pages and is very versatile. JavaScript remains one of the most in-demand programming languages in 2024. Many companies are looking for proficiency in...",link:"/freecodecamp.org/js-interview-prep-handbook/README.md",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",background:"rgba(10,10,35,0.2)"})),null,16),e[14]||(e[14]=n("nav",{class:"table-of-contents"},[n("ul")],-1)),e[15]||(e[15]=n("hr",null,null,-1)),t(c,{name:"The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples",desc:"JavaScript is a widely used language in web development and powers interactive features of virtually every website out there. JavaScript makes it possible to create dynamic web pages and is very versatile. JavaScript remains one of the most in-demand programming languages in 2024. Many companies are looking for proficiency in...",url:"https://freecodecamp.org/news/js-interview-prep-handbook#heading-what-are-generator-functions",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"}),e[16]||(e[16]=s(`<p>Generator functions are special type of functions that can pause their execution and resume it later. They also return a value each time they pause execution.</p><p>Generator functions can be used to return a sequence of values in an iterative manner as opposed to normal functions that return only once.</p><p>Following is a basic example of a generator function:</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">generatorFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">yield</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">yield</span> <span class="token number">2</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),n("p",null,[e[1]||(e[1]=a("A generator function is declared with ")),e[2]||(e[2]=n("code",null,"function*",-1)),e[3]||(e[3]=a(" and the ")),e[4]||(e[4]=n("code",null,"yield",-1)),e[5]||(e[5]=a(" keyword is used to pause execution and return a value. The above syntax creates a ")),n("a",b,[t(r,{icon:"fa-brands fa-firefox"}),e[0]||(e[0]=a("GeneratorFunction"))]),e[6]||(e[6]=a(" object."))]),e[17]||(e[17]=s(`<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">const</span> gen <span class="token operator">=</span> <span class="token function">generatorFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,1)),n("p",null,[e[8]||(e[8]=a("‌This object uses an ")),n("a",w,[t(r,{icon:"fa-brands fa-firefox"}),e[7]||(e[7]=a("iterator"))]),e[9]||(e[9]=a(" to execute a generator function. The iterator provides a ")),e[10]||(e[10]=n("code",null,"next()",-1)),e[11]||(e[11]=a(" method that executes the function's body till the next yield statement and returns an object containing the yielded value and a ")),e[12]||(e[12]=n("code",null,"done",-1)),e[13]||(e[13]=a(" property (Boolean), which indicates if the generator function has reached its end."))]),e[18]||(e[18]=s(`<p>Let&#39;s call the generator function:</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gen<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gen<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: 2, done: false }</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gen<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { value: undefined, done: true }</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>‌Here, the first call to <code>next()</code> yields 1 and the second one yields 2. The last one yields nothing and sets the <code>done</code> flag to true as there are no more <code>yield</code> statements.</p><p>You can also loop over a generator function using <code>for</code> loop:</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">for</span><span class="token punctuation">(</span>value <span class="token keyword">of</span> <span class="token function">generatorFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In this way, you can control the execution of a generator function by entering and exiting a function at any time.</p>`,6))])}const S=l(f,[["render",y],["__file","what-are-generator-functions.html.vue"]]),J=JSON.parse('{"path":"/freecodecamp.org/js-interview-prep-handbook/what-are-generator-functions.html","title":"What are Generator Functions?","lang":"en-US","frontmatter":{"lang":"en-US","title":"What are Generator Functions?","description":"Article(s) > (17/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples","category":["JavaScript","Article(s)"],"tag":["blog","freecodecamp.org","js","javascript"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > (17/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples"},{"property":"og:description","content":"What are Generator Functions?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/js-interview-prep-handbook/what-are-generator-functions.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/js-interview-prep-handbook/what-are-generator-functions.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What are Generator Functions?"}],["meta",{"property":"og:description","content":"Article(s) > (17/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"}],["meta",{"name":"twitter:image:alt","content":"What are Generator Functions?"}],["meta",{"property":"article:author","content":"Kunal Nalawade"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"js"}],["meta",{"property":"article:tag","content":"javascript"}],["meta",{"property":"article:published_time","content":"2024-09-10T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What are Generator Functions?\\",\\"image\\":[\\"https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png\\"],\\"datePublished\\":\\"2024-09-10T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kunal Nalawade\\"}]}"]],"date":"2024-09-10T00:00:00.000Z","isOriginal":false,"author":"Kunal Nalawade","cover":"https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":1}]},"readingTime":{"minutes":1.74,"words":521},"filePathRelative":"freecodecamp.org/js-interview-prep-handbook/what-are-generator-functions.md","localizedDate":"September 10, 2024","excerpt":"\\n","copyright":{"author":"Kunal Nalawade"}}');export{S as comp,J as data};