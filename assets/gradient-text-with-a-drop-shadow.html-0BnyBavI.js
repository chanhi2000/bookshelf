import{_ as h}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as m,am as n,as as g,ao as s,at as r,au as d,ap as c,al as o,an as e,ak as v,aq as l,ar as w}from"./app-CpYYKbnj.js";const b={},f={id:"frontmatter-title-관련",tabindex:"-1"},q={class:"header-anchor",href:"#frontmatter-title-관련"},x={class:"table-of-contents"};function y(t,a){const u=l("VPCard"),i=l("router-link"),k=l("SiteInfo"),p=l("CodePen");return w(),m("div",null,[n("h1",f,[n("a",q,[n("span",null,g(t.$frontmatter.title)+" 관련",1)])]),s(u,r(d({title:"CSS > Article(s)",desc:"Article(s)",link:"/programming/css/articles/README.md",logo:"/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),n("nav",x,[n("ul",null,[n("li",null,[s(i,{to:"#pseudo-element-solution-gradient-text-with-a-drop-shadow"},{default:c(()=>a[0]||(a[0]=[e("Pseudo Element Solution: Gradient Text with a Drop Shadow")])),_:1})]),n("li",null,[s(i,{to:"#svg-solution-gradient-text-with-a-drop-shadow"},{default:c(()=>a[1]||(a[1]=[e("SVG Solution: Gradient Text with a Drop Shadow")])),_:1})]),n("li",null,[s(i,{to:"#other-examples-in-the-wild"},{default:c(()=>a[2]||(a[2]=[e("Other Examples in the Wild")])),_:1})])])]),a[3]||(a[3]=n("hr",null,null,-1)),s(k,{name:"Gradient Text with a Drop Shadow",desc:"Gradient text is pretty easy to do these days with `background-clip: text;` — but it kills your ability to use `text-shadow`. SVG to the rescue. ",url:"https://frontendmasters.com/blog/gradient-text-with-a-drop-shadow/",logo:"https://frontendmasters.com/favicon.ico",preview:"https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3896"}),a[4]||(a[4]=o(`<p>During our annual promotion, we had this branding for the countdown timer:</p><figure><img src="https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/sale.jpg?resize=800%2C376&amp;ssl=1" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>The “Ends in X days!” needed to be HTML text since it’s dynamic based on the sale end date. Note that it both colored with a gradient and has both a stroke and a drop shadow.</p><p>We can achieve a text gradient by clipping the background to the text with <code>background-clip: text</code>, like this:</p><div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre><code><span class="line"><span class="token selector">.Countdown</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>#fff000<span class="token punctuation">,</span> #ff3600<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">background-clip</span><span class="token punctuation">:</span> text<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">-webkit-background-clip</span><span class="token punctuation">:</span> text<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">color</span><span class="token punctuation">:</span> transparent<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This creates a gradient background and then clips the background to the text. Then we hide the actual text itself with <code>color: transparent</code>. Here’s the demo:</p>`,6)),s(p,{user:"1Marc","slug-hash":"GRVKpbj",title:"Simple Text Gradient","default-tab":["css","result"],theme:t.$isDarkmode?"dark":"light"},null,8,["theme"]),a[5]||(a[5]=n("p",null,"Now I want to add a shadow behind it… sounds simple, right? Of course not.",-1)),a[6]||(a[6]=n("p",null,[e("The obvious way, using "),n("code",null,"text-shadow"),e(", looks bad because "),n("code",null,"color: transparent"),e(" makes the text itself transparent, and the shadow it renders is actually "),n("em",null,"above"),e(" the background we’re setting.")],-1)),s(p,{user:"1Marc","slug-hash":"MWNgKxN",title:"Why you can't use text gradient with text shadow","default-tab":["css","result"],theme:t.$isDarkmode?"dark":"light"},null,8,["theme"]),a[7]||(a[7]=o(`<p>So that’s out.</p><hr><h2 id="pseudo-element-solution-gradient-text-with-a-drop-shadow" tabindex="-1"><a class="header-anchor" href="#pseudo-element-solution-gradient-text-with-a-drop-shadow"><span>Pseudo Element Solution: Gradient Text with a Drop Shadow</span></a></h2><p>We can use a pseudo element that replicates the text and layers itself behind the background of the main text, and we can then use <code>text-shadow</code> on <em>that</em> safely:</p><div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre><code><span class="line"><span class="token selector">.Countdown::before</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">attr</span><span class="token punctuation">(</span>data-text<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">z-index</span><span class="token punctuation">:</span> -1<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">color</span><span class="token punctuation">:</span> #000<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">text-shadow</span><span class="token punctuation">:</span> -4px 4px 1px #000<span class="token punctuation">,</span> 3px 2px 1px #000<span class="token punctuation">,</span> -1px -2px 1px #000<span class="token punctuation">,</span> 2px 6px 3px #000<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Note the multiple shadows are in multiple directions simulating stroked text.</p>`,6)),s(p,{user:"1Marc","slug-hash":"GRVKZRd",title:"Simple Text Gradient with Shadow with a Pseudo Element","default-tab":["css","result"],theme:t.$isDarkmode?"dark":"light"},null,8,["theme"]),a[8]||(a[8]=o(`<p>It’s not ideal since we also have to add the text to the <code>data</code> attribute in order to be inserted into the pseudo element:</p><div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Countdown CountdownFont<span class="token punctuation">&quot;</span></span> </span>
<span class="line">  <span class="token attr-name">data-text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Ends in 7 days<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  Ends in 7 days</span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That is repetitive, heavier, and error-prone. It also means that if you need to change the text contents via JavaScript, you’ll also need to keep the <code>data</code> attribute updated as well. Not to mention negative <code>z-index</code> can have trouble when there is other elements backgrounds involved.</p><hr><h2 id="svg-solution-gradient-text-with-a-drop-shadow" tabindex="-1"><a class="header-anchor" href="#svg-solution-gradient-text-with-a-drop-shadow"><span>SVG Solution: Gradient Text with a Drop Shadow</span></a></h2><p>Although it’s the most complex of the methods, you can apply both effects to an SVG, no problem!</p>`,6)),s(p,{user:"1Marc","slug-hash":"RwXbaGy",title:"Simple Text Gradient with Shadow with an SVG","default-tab":["css","result"],theme:t.$isDarkmode?"dark":"light"},null,8,["theme"]),a[9]||(a[9]=o(`<p>In the code we use the <code>linearGradient</code> SVG element to draw the text, and a series of <code>feDropShadow</code> filters to the text span element:</p><div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>auto<span class="token punctuation">&quot;</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>auto<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>defs</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>linearGradient</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>gradient<span class="token punctuation">&quot;</span></span> <span class="token attr-name">x1</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>0%<span class="token punctuation">&quot;</span></span> <span class="token attr-name">y1</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>0%<span class="token punctuation">&quot;</span></span> <span class="token attr-name">x2</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>0%<span class="token punctuation">&quot;</span></span> <span class="token attr-name">y2</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>100%<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>stop</span> <span class="token attr-name">offset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>0%<span class="token punctuation">&quot;</span></span> <span class="token attr-name">stop-color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>#fff000<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line">      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>stop</span> <span class="token attr-name">offset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>100%<span class="token punctuation">&quot;</span></span> <span class="token attr-name">stop-color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>#ff3600<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>linearGradient</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>defs</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filter</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>shadow<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>feDropShadow</span> <span class="token attr-name">dx</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>-4<span class="token punctuation">&quot;</span></span> <span class="token attr-name">dy</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>4<span class="token punctuation">&quot;</span></span> <span class="token attr-name">stdDeviation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">flood-color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>black<span class="token punctuation">&quot;</span></span> <span class="token attr-name">flood-opacity</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>0.5<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>feDropShadow</span> <span class="token attr-name">dx</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>3<span class="token punctuation">&quot;</span></span> <span class="token attr-name">dy</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>2<span class="token punctuation">&quot;</span></span> <span class="token attr-name">stdDeviation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>2<span class="token punctuation">&quot;</span></span> <span class="token attr-name">flood-color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>black<span class="token punctuation">&quot;</span></span> <span class="token attr-name">flood-opacity</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>0.5<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>feDropShadow</span> <span class="token attr-name">dx</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>-1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">dy</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>-2<span class="token punctuation">&quot;</span></span> <span class="token attr-name">stdDeviation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">flood-color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>black<span class="token punctuation">&quot;</span></span> <span class="token attr-name">flood-opacity</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>0.5<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>feDropShadow</span> <span class="token attr-name">dx</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>2<span class="token punctuation">&quot;</span></span> <span class="token attr-name">dy</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>6<span class="token punctuation">&quot;</span></span> <span class="token attr-name">stdDeviation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>3<span class="token punctuation">&quot;</span></span> <span class="token attr-name">flood-color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>black<span class="token punctuation">&quot;</span></span> <span class="token attr-name">flood-opacity</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>0.5<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filter</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>text</span> <span class="token attr-name">x</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>10<span class="token punctuation">&quot;</span></span> <span class="token attr-name">y</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>50<span class="token punctuation">&quot;</span></span> <span class="token attr-name">font-family</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Rubik Mono One<span class="token punctuation">&quot;</span></span> <span class="token attr-name">font-size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>40<span class="token punctuation">&quot;</span></span> <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>url(#gradient)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tspan</span> <span class="token attr-name">filter</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>url(#shadow)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Ends in 7 Days<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tspan</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>text</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The nice thing here is there’s only one place to change the text, and the text remains selectable and accessible like any other web text. Do note that <em>wrapping</em> SVG <code>&lt;text&gt;</code> isn’t particularly well supported and probably best to avoid.</p><hr><h2 id="other-examples-in-the-wild" tabindex="-1"><a class="header-anchor" href="#other-examples-in-the-wild"><span>Other Examples in the Wild</span></a></h2><p>I did find this quick shot of gradient text and text shadow a nice reference of types of effects:</p>`,6)),s(p,{user:"1Marc","slug-hash":"vMavPr",title:"A quick shot of gradient text and text-shadow","default-tab":["css","result"],theme:t.$isDarkmode?"dark":"light"},null,8,["theme"]),a[10]||(a[10]=n("p",null,"Finally, Ana Tudor has some wild CodePens blending tons of SVG Filters together to make wild text effects:",-1)),s(p,{user:"1Marc","slug-hash":"gONbppb",title:"No image dusty SVG filter effect","default-tab":["css","result"],theme:t.$isDarkmode?"dark":"light"},null,8,["theme"]),a[11]||(a[11]=n("p",null,"Have fun!",-1)),v(" TODO: add ARTICLE CARD "),s(u,r(d({title:"Gradient Text with a Drop Shadow",desc:"Gradient text is pretty easy to do these days with `background-clip: text;` — but it kills your ability to use `text-shadow`. SVG to the rescue. ",link:"https://chanhi2000.github.io/bookshelf/frontendmasters.com/gradient-text-with-a-drop-shadow.html",logo:"https://frontendmasters.com/favicon.ico",background:"rgba(188,75,52,0.2)"})),null,16)])}const D=h(b,[["render",y],["__file","gradient-text-with-a-drop-shadow.html.vue"]]),T=JSON.parse('{"path":"/frontendmasters.com/gradient-text-with-a-drop-shadow.html","title":"Gradient Text with a Drop Shadow","lang":"en-US","frontmatter":{"lang":"en-US","title":"Gradient Text with a Drop Shadow","description":"Article(s) > Gradient Text with a Drop Shadow","icon":"fa-brands fa-css3-alt","category":["CSS","Article(s)"],"tag":["blog","frontendmasters.com","css"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Gradient Text with a Drop Shadow"},{"property":"og:description","content":"Gradient Text with a Drop Shadow"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/frontendmasters.com/gradient-text-with-a-drop-shadow.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/frontendmasters.com/gradient-text-with-a-drop-shadow.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Gradient Text with a Drop Shadow"}],["meta",{"property":"og:description","content":"Article(s) > Gradient Text with a Drop Shadow"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3896"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3896"}],["meta",{"name":"twitter:image:alt","content":"Gradient Text with a Drop Shadow"}],["meta",{"property":"article:author","content":"Marc Grabanski"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"frontendmasters.com"}],["meta",{"property":"article:tag","content":"css"}],["meta",{"property":"article:published_time","content":"2024-09-20T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Gradient Text with a Drop Shadow\\",\\"image\\":[\\"https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/sale.jpg?resize=800%2C376&ssl=1\\"],\\"datePublished\\":\\"2024-09-20T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Marc Grabanski\\"}]}"]],"prev":"/programming/css/articles/README.md","date":"2024-09-20T00:00:00.000Z","isOriginal":false,"author":"Marc Grabanski","cover":"https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3896"},"headers":[{"level":2,"title":"Pseudo Element Solution: Gradient Text with a Drop Shadow","slug":"pseudo-element-solution-gradient-text-with-a-drop-shadow","link":"#pseudo-element-solution-gradient-text-with-a-drop-shadow","children":[]},{"level":2,"title":"SVG Solution: Gradient Text with a Drop Shadow","slug":"svg-solution-gradient-text-with-a-drop-shadow","link":"#svg-solution-gradient-text-with-a-drop-shadow","children":[]},{"level":2,"title":"Other Examples in the Wild","slug":"other-examples-in-the-wild","link":"#other-examples-in-the-wild","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":1}]},"readingTime":{"minutes":3.22,"words":966},"filePathRelative":"frontendmasters.com/gradient-text-with-a-drop-shadow.md","localizedDate":"September 20, 2024","excerpt":"\\n","copyright":{"author":"Marc Grabanski"}}');export{D as comp,T as data};