import{_ as k}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as v,am as s,as as b,ao as e,at as m,au as g,ap as c,an as a,al as p,ak as f,aq as i,ar as y}from"./app-CpYYKbnj.js";const w={},z={id:"frontmatter-title-관련",tabindex:"-1"},S={class:"header-anchor",href:"#frontmatter-title-관련"},Z={class:"table-of-contents"},C={href:"https://css-loaders.com/zig-zag/",target:"_blank",rel:"noopener noreferrer"},x={href:"https://css-loaders.com/zig-zag/",target:"_blank",rel:"noopener noreferrer"},H={href:"https://css-loaders.com/zig-zag/",target:"_blank",rel:"noopener noreferrer"},I={href:"https://css-tip.com/steps/",target:"_blank",rel:"noopener noreferrer"},A={href:"https://css-loaders.com/zig-zag/",target:"_blank",rel:"noopener noreferrer"};function L(t,n){const u=i("VPCard"),r=i("router-link"),d=i("SiteInfo"),h=i("RouteLink"),l=i("FontIcon"),o=i("CodePen");return y(),v("div",null,[s("h1",z,[s("a",S,[s("span",null,b(t.$frontmatter.title)+" 관련",1)])]),e(u,m(g({title:"CSS > Article(s)",desc:"Article(s)",link:"/programming/css/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),s("nav",Z,[s("ul",null,[s("li",null,[e(r,{to:"#how-to-create-a-zig-zag-shape"},{default:c(()=>n[0]||(n[0]=[a("How to Create a Zig-Zag Shape")])),_:1})]),s("li",null,[e(r,{to:"#how-to-animate-the-zig-zag-shape"},{default:c(()=>n[1]||(n[1]=[a("How to Animate the Zig-Zag Shape")])),_:1})]),s("li",null,[e(r,{to:"#how-to-create-a-discrete-animation"},{default:c(()=>n[2]||(n[2]=[a("How to Create a Discrete Animation")])),_:1})]),s("li",null,[e(r,{to:"#conclusion"},{default:c(()=>n[3]||(n[3]=[a("Conclusion")])),_:1})])])]),n[29]||(n[29]=s("hr",null,null,-1)),e(d,{name:"How to Create Zig-Zag CSS Loaders Using One Element",desc:"In a previous article, I showed you how to create filling CSS loaders collection where each loader was built using a single HTML element. Here, you’ll learn more about loaders by creating the Zig-Zag collection. Here is an overview of what you’ll be ...",url:"https://freecodecamp.org/news/zig-zag-css-loaders",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",preview:"https://cdn.hashnode.com/res/hashnode/image/upload/v1732045303831/af9240a9-6a25-4b13-a397-102ee098db78.jpeg"}),s("p",null,[n[6]||(n[6]=a("In ")),e(h,{to:"/freecodecamp.org/filling-css-loaders.html"},{default:c(()=>n[4]||(n[4]=[a("a previous article")])),_:1}),n[7]||(n[7]=a(", I showed you how to create filling CSS loaders collection where each loader was built using a single HTML element. Here, you’ll learn more about loaders by creating ")),s("a",C,[e(l,{icon:"fas fa-globe"}),n[5]||(n[5]=a("the Zig-Zag collection"))]),n[8]||(n[8]=a("."))]),n[30]||(n[30]=s("p",null,"Here is an overview of what you’ll be building:",-1)),e(o,{user:"t_afif","slug-hash":"RwXdvKj",title:"Untitled","default-tab":["css","result"],theme:t.$isDarkmode?"dark":"light"},null,8,["theme"]),s("p",null,[n[10]||(n[10]=a("You can also check ")),s("a",x,[e(l,{icon:"fas fa-globe"}),n[9]||(n[9]=a("my online collection"))]),n[11]||(n[11]=a(" to see up to 20 variations using a zig-zag shape."))]),n[31]||(n[31]=s("p",null,"We won’t study all the variations but I will show you a few tricks that’ll help you create as many variations as you want.",-1)),n[32]||(n[32]=s("hr",null,null,-1)),n[33]||(n[33]=s("h2",{id:"how-to-create-a-zig-zag-shape",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#how-to-create-a-zig-zag-shape"},[s("span",null,"How to Create a Zig-Zag Shape")])],-1)),n[34]||(n[34]=s("p",null,"The first step is to create a zig-zag shape. For this, you can grab the code from my CSS shape website:",-1)),e(d,{name:"CSS Shape: Zig-Zag Line",desc:"A CSS-only Zig-Zag Line shape made with a single-element and modern CSS.",url:"https://css-shape.com/zig-zag-line/",logo:"https://css-shape.com/fav.png",preview:"zig-zag-line.jpg"}),n[35]||(n[35]=p(`<figure><img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1731707755150/f1782db9-fa7f-472e-b771-cfc1c2046e0c.png" alt="Zig-Zag shape from css-shape.com" tabindex="0" loading="lazy"><figcaption>Zig-Zag shape from css-shape.com</figcaption></figure><p>You can adjust the different variables to get the zig-zag you want. In our case, I will use an easier version with no variables.</p><div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre><code><span class="line"><span class="token selector">.loader</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">height</span><span class="token punctuation">:</span> 47px<span class="token punctuation">;</span> <span class="token comment">/* control the size */</span></span>
<span class="line">  <span class="token property">aspect-ratio</span><span class="token punctuation">:</span> 5<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">background</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token function">conic-gradient</span><span class="token punctuation">(</span>from 135deg at top<span class="token punctuation">,</span>#000 90deg<span class="token punctuation">,</span>#0000 0<span class="token punctuation">)</span> top<span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">conic-gradient</span><span class="token punctuation">(</span>from 135deg at top<span class="token punctuation">,</span>#0000 90deg<span class="token punctuation">,</span>#000 0<span class="token punctuation">)</span> bottom<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">background-size</span><span class="token punctuation">:</span> 20% 50%<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">background-repeat</span><span class="token punctuation">:</span> repeat-x<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>And here is a figure to illustrate how those gradients create the shape:</p><figure><img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1731708477342/bbe3e0b6-24a2-498d-992b-4ee152b0d74c.png" alt="Color gradients created by the code" tabindex="0" loading="lazy"><figcaption>Color gradients created by the code</figcaption></figure><p>The first gradient created the red part while the second one created the green part. We have two triangle shapes that repeat horizontally.</p><p>Since we have five repetitions, I used <code>aspect-ratio: 5</code> and <code>20% (100%/5)</code> in the <code>background-size</code>. You can make it more generic by introducing a variable to control the number of repetitions but as I said previously, I am going to keep things simple.</p><p>I want to point out that when using gradients, you can achieve the same result by using different syntaxes. For example, I can update the previous code with the following:</p><div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre><code><span class="line"><span class="token selector">.loader</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">height</span><span class="token punctuation">:</span> 47px<span class="token punctuation">;</span> <span class="token comment">/* control the size */</span></span>
<span class="line">  <span class="token property">aspect-ratio</span><span class="token punctuation">:</span> 5<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">background</span><span class="token punctuation">:</span></span>
<span class="line">   <span class="token function">conic-gradient</span><span class="token punctuation">(</span>from 135deg at top   <span class="token punctuation">,</span>#000 90deg<span class="token punctuation">,</span>#0000 0<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">   <span class="token function">conic-gradient</span><span class="token punctuation">(</span>from -45deg at bottom<span class="token punctuation">,</span>#000 90deg<span class="token punctuation">,</span>#0000 0<span class="token punctuation">)</span> 12.5% 100%<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">background-size</span><span class="token punctuation">:</span> 20% 50%<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">background-repeat</span><span class="token punctuation">:</span> repeat-x<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>It’s still the same output but with a different syntax for the second gradient. Did you notice the repeated part within the gradients? That part controls the coloration and we can define it as a variable to avoid repetition and be able to update the color only once in the code.</p><div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre><code><span class="line"><span class="token selector">.loader</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">height</span><span class="token punctuation">:</span> 47px<span class="token punctuation">;</span> <span class="token comment">/* control the size */</span></span>
<span class="line">  <span class="token property">aspect-ratio</span><span class="token punctuation">:</span> 5<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">--c</span><span class="token punctuation">:</span>#000 <span class="token comment">/* the color */</span> 90deg<span class="token punctuation">,</span>#0000 0<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">background</span><span class="token punctuation">:</span></span>
<span class="line">   <span class="token function">conic-gradient</span><span class="token punctuation">(</span>from 135deg at top   <span class="token punctuation">,</span><span class="token function">var</span><span class="token punctuation">(</span>--c<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">   <span class="token function">conic-gradient</span><span class="token punctuation">(</span>from -45deg at bottom<span class="token punctuation">,</span><span class="token function">var</span><span class="token punctuation">(</span>--c<span class="token punctuation">)</span><span class="token punctuation">)</span> 12.5% 100%<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">background-size</span><span class="token punctuation">:</span> 20% 50%<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">background-repeat</span><span class="token punctuation">:</span> repeat-x<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now we have our zig-zag shape and we are ready to animate it.</p><hr><h2 id="how-to-animate-the-zig-zag-shape" tabindex="-1"><a class="header-anchor" href="#how-to-animate-the-zig-zag-shape"><span>How to Animate the Zig-Zag Shape</span></a></h2><p>Since we’re using a background, we’ll animate the <code>background-position</code> to get our first loader. The idea is to move the gradients horizontally and create an infinite movement.</p><div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre><code><span class="line"><span class="token selector">.loader</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token property">height</span><span class="token punctuation">:</span> 47px<span class="token punctuation">;</span> <span class="token comment">/* control the size */</span></span>
<span class="line">   <span class="token property">aspect-ratio</span><span class="token punctuation">:</span> 5<span class="token punctuation">;</span></span>
<span class="line">   <span class="token property">--c</span><span class="token punctuation">:</span>#000 <span class="token comment">/* the color */</span> 90deg<span class="token punctuation">,</span>#0000 0<span class="token punctuation">;</span></span>
<span class="line">   <span class="token property">background</span><span class="token punctuation">:</span></span>
<span class="line">     <span class="token function">conic-gradient</span><span class="token punctuation">(</span>from 135deg at top   <span class="token punctuation">,</span><span class="token function">var</span><span class="token punctuation">(</span>--c<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">     <span class="token function">conic-gradient</span><span class="token punctuation">(</span>from -45deg at bottom<span class="token punctuation">,</span><span class="token function">var</span><span class="token punctuation">(</span>--c<span class="token punctuation">)</span><span class="token punctuation">)</span> 12.5% 100%<span class="token punctuation">;</span></span>
<span class="line">   <span class="token property">background-size</span><span class="token punctuation">:</span> 20% 50%<span class="token punctuation">;</span></span>
<span class="line">   <span class="token property">background-repeat</span><span class="token punctuation">:</span> repeat-x<span class="token punctuation">;</span></span>
<span class="line">   <span class="token property">animation</span><span class="token punctuation">:</span> loading .8s infinite linear<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token atrule"><span class="token rule">@keyframes</span> loading</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token selector">0%</span>   <span class="token punctuation">{</span><span class="token property">background-position</span><span class="token punctuation">:</span> 0   0<span class="token punctuation">,</span>12.5% 100%<span class="token punctuation">}</span></span>
<span class="line">  <span class="token selector">100%</span> <span class="token punctuation">{</span><span class="token property">background-position</span><span class="token punctuation">:</span> 25% 0<span class="token punctuation">,</span>37.5% 100%<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Note how we increased the X value of the <code>background-position</code> by <code>25%</code>. In case you are wondering what the logic behind that value is, here is the formula:</p><p class="katex-block"><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mfrac><mn>0.2</mn><mrow><mn>1</mn><mo>−</mo><mn>0.2</mn><mo stretchy="false">)</mo></mrow></mfrac><mo>=</mo><mi mathvariant="normal">.</mi><mn>25</mn><mo>=</mo><mn>25</mn><mi mathvariant="normal">%</mi></mrow><annotation encoding="application/x-tex"> \\frac{0.2}{1-0.2)}=.25=25\\% </annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:2.2574em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">0.2</span><span class="mclose">)</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">0.2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">.25</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.8056em;vertical-align:-0.0556em;"></span><span class="mord">25%</span></span></span></span></span></p><p><code>.2</code> corresponds to the <code>20%</code> used inside the <code>background-size</code>.</p>`,19)),e(o,{user:"t_afif","slug-hash":"poMBgQO",title:"Untitled","default-tab":["css","result"],theme:t.$isDarkmode?"dark":"light"},null,8,["theme"]),n[36]||(n[36]=p(`<p>We have our first loader! Actually, two loaders because we can easily change the direction of the movement by adding <code>animation-direction: reverse</code>.</p><p>Let’s try a different animation: using <code>clip-path</code> and the <code>inset()</code> value. We can easily adjust this technique to create many variations.</p><p>Let’s start with a basic example:</p><div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre><code><span class="line"><span class="token selector">.loader</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">/* same code as previously */</span></span>
<span class="line">  <span class="token property">animation</span><span class="token punctuation">:</span> loading .8s infinite linear<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token atrule"><span class="token rule">@keyframes</span> loading</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token selector">0%</span>   <span class="token punctuation">{</span><span class="token property">clip-path</span><span class="token punctuation">:</span> <span class="token function">inset</span><span class="token punctuation">(</span>0 100% 0 0<span class="token punctuation">)</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token selector">100%</span> <span class="token punctuation">{</span><span class="token property">clip-path</span><span class="token punctuation">:</span> <span class="token function">inset</span><span class="token punctuation">(</span>0 0    0 0<span class="token punctuation">)</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>inset()</code> value creates a rectangle where only the part inside it will be visible. For this, we define a distance from each side of the element (top, right, bottom, left).</p><p>Logically, <code>inset(0 0 0 0)</code> shows the whole element since all the distances are equal to 0, but <code>inset(0 100% 0 0)</code> completely hides the element since the right value is equal to 100%. So it will touch the opposite edge, creating an empty rectangle.</p><p>By animating that right value from <code>100%</code> to <code>0</code> we create a reveal animation. Another loader variation!</p>`,7)),e(o,{user:"t_afif","slug-hash":"WNVWrVy",title:"Untitled","default-tab":["css","result"],theme:t.$isDarkmode?"dark":"light"},null,8,["theme"]),n[37]||(n[37]=p(`<p>If you inspect the code of the second animation, you will see that I did the same thing but with the left side.</p><p>We can also have a sliding effect if we animate both the left and right values while keeping their difference constant.</p><div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre><code><span class="line"><span class="token selector">.loader</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">/* same code as previously */</span></span>
<span class="line">  <span class="token property">animation</span><span class="token punctuation">:</span> loading .8s infinite linear<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token atrule"><span class="token rule">@keyframes</span> loading</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token selector">0%</span>   <span class="token punctuation">{</span><span class="token property">clip-path</span><span class="token punctuation">:</span> <span class="token function">inset</span><span class="token punctuation">(</span>0 60% 0 0  <span class="token punctuation">)</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token selector">100%</span> <span class="token punctuation">{</span><span class="token property">clip-path</span><span class="token punctuation">:</span> <span class="token function">inset</span><span class="token punctuation">(</span>0 0   0 60%<span class="token punctuation">)</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The right value animates from <code>60%</code> to <code>0</code> and the left one from <code>0</code> to <code>60%</code>, so we have a constant difference equal to <code>60%</code> which will create the illusion of a sliding rectangle. Another cool loader!</p>`,4)),e(o,{user:"t_afif","slug-hash":"wvVZGwy",title:"Untitled","default-tab":["css","result"],theme:t.$isDarkmode?"dark":"light"},null,8,["theme"]),s("p",null,[n[13]||(n[13]=a("By trying different combinations of ")),n[14]||(n[14]=s("code",null,"inset()",-1)),n[15]||(n[15]=a(" values, you can get a lot of CSS loaders. Give it a try! You can also check ")),s("a",H,[e(l,{icon:"fas fa-globe"}),n[12]||(n[12]=a("my online collection"))]),n[16]||(n[16]=a(" and try to identify the variations that use ")),n[17]||(n[17]=s("code",null,"clip-path: inset()",-1)),n[18]||(n[18]=a("."))]),n[38]||(n[38]=s("hr",null,null,-1)),n[39]||(n[39]=s("h2",{id:"how-to-create-a-discrete-animation",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#how-to-create-a-discrete-animation"},[s("span",null,"How to Create a Discrete Animation")])],-1)),n[40]||(n[40]=s("p",null,[a("To achieve a discrete animation, you can use the "),s("code",null,"steps()"),a(" timing function instead of "),s("code",null,"linear"),a(". Let’s start with the first example using "),s("code",null,"steps(2)"),a(".")],-1)),e(o,{user:"t_afif","slug-hash":"YzmbzGL",title:"Untitled","default-tab":["css","result"],theme:t.$isDarkmode?"dark":"light"},null,8,["theme"]),n[41]||(n[41]=p(`<p>We can do the same with almost all the variations. Let’s try with the ones that use <code>clip-path: inset()</code>.</p><div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre><code><span class="line"><span class="token selector">.loader</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">/* same code as previously */</span></span>
<span class="line">  <span class="token property">animation</span><span class="token punctuation">:</span> loading .8s infinite <span class="token function">steps</span><span class="token punctuation">(</span>5<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token atrule"><span class="token rule">@keyframes</span> loading</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token selector">0%</span>   <span class="token punctuation">{</span><span class="token property">clip-path</span><span class="token punctuation">:</span> <span class="token function">inset</span><span class="token punctuation">(</span>0 100% 0 0<span class="token punctuation">)</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token selector">100%</span> <span class="token punctuation">{</span><span class="token property">clip-path</span><span class="token punctuation">:</span> <span class="token function">inset</span><span class="token punctuation">(</span>0 0    0 0<span class="token punctuation">)</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We have five repetitions so let’s see what we’ll get with <code>steps(5)</code>.</p>`,3)),e(o,{user:"t_afif","slug-hash":"JjgqjNr",title:"Untitled","default-tab":["css","result"],theme:t.$isDarkmode?"dark":"light"},null,8,["theme"]),n[42]||(n[42]=p(`<p>At the moment, it’s not good because we don’t see all the repetition. The animation stops at 4 repetitions, but we need to see the whole element (5 repetitions). The count starts from 0 so what we really need is 6 steps instead of 5 to show all the repetitions.</p><div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre><code><span class="line"><span class="token selector">.loader</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">/* same code as previously */</span></span>
<span class="line">  <span class="token property">animation</span><span class="token punctuation">:</span> loading .8s infinite <span class="token function">steps</span><span class="token punctuation">(</span>6<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token atrule"><span class="token rule">@keyframes</span> loading</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token selector">0%</span>   <span class="token punctuation">{</span><span class="token property">clip-path</span><span class="token punctuation">:</span> <span class="token function">inset</span><span class="token punctuation">(</span>0 100% 0 0<span class="token punctuation">)</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token selector">100%</span> <span class="token punctuation">{</span><span class="token property">clip-path</span><span class="token punctuation">:</span> <span class="token function">inset</span><span class="token punctuation">(</span>0 0    0 0<span class="token punctuation">)</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)),e(o,{user:"t_afif","slug-hash":"RwXmKje",title:"Untitled","default-tab":["css","result"],theme:t.$isDarkmode?"dark":"light"},null,8,["theme"]),n[43]||(n[43]=p(`<p>Even with 6 steps, the result is still not good but don’t worry, it’s not a bug. The default behavior of <code>steps()</code> gives us that output but we can update it to get the expected output:</p><div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre><code><span class="line"><span class="token selector">.loader</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">/* same code as previously */</span></span>
<span class="line">  <span class="token property">animation</span><span class="token punctuation">:</span> loading .8s infinite <span class="token function">steps</span><span class="token punctuation">(</span>6<span class="token punctuation">,</span>jump-none<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token atrule"><span class="token rule">@keyframes</span> loading</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token selector">0%</span>   <span class="token punctuation">{</span><span class="token property">clip-path</span><span class="token punctuation">:</span> <span class="token function">inset</span><span class="token punctuation">(</span>0 100% 0 0<span class="token punctuation">)</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token selector">100%</span> <span class="token punctuation">{</span><span class="token property">clip-path</span><span class="token punctuation">:</span> <span class="token function">inset</span><span class="token punctuation">(</span>0 0    0 0<span class="token punctuation">)</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)),s("p",null,[n[20]||(n[20]=a("If you’re not familiar with ")),n[21]||(n[21]=s("code",null,"jump-none",-1)),n[22]||(n[22]=a(", it’s a value that can fix most of your issues when working with ")),n[23]||(n[23]=s("code",null,"steps()",-1)),n[24]||(n[24]=a(". I wrote a short article about it if you want more details: “")),s("a",I,[e(l,{icon:"fas fa-globe"}),n[19]||(n[19]=a("How to correctly use steps() with animations"))]),n[25]||(n[25]=a("“"))]),e(o,{user:"t_afif","slug-hash":"JjgqEpO",title:"Untitled","default-tab":["css","result"],theme:t.$isDarkmode?"dark":"light"},null,8,["theme"]),n[44]||(n[44]=s("p",null,[a("Our animation looks perfect now! We can also make it an 11-step animation ("),s("code",null,"5×2 + 1"),a(") and get another cool loader.")],-1)),e(o,{user:"t_afif","slug-hash":"vYowgRV",title:"Untitled","default-tab":["css","result"],theme:t.$isDarkmode?"dark":"light"},null,8,["theme"]),n[45]||(n[45]=s("p",null,"Even the sliding effect can have its discrete variation.",-1)),e(o,{user:"t_afif","slug-hash":"bGXyZpO",title:"Untitled","default-tab":["css","result"],theme:t.$isDarkmode?"dark":"light"},null,8,["theme"]),n[46]||(n[46]=s("p",null,"Can you figure out why I am using 4 and 7 steps? I’ll let you do the calculation as a small exercise.",-1)),n[47]||(n[47]=s("hr",null,null,-1)),n[48]||(n[48]=s("h2",{id:"conclusion",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#conclusion"},[s("span",null,"Conclusion")])],-1)),n[49]||(n[49]=s("p",null,[a("This article showed you how to create zig-zag shapes, how to animate them using "),s("code",null,"clip-path"),a(", and how to make a discrete animations. You can also consider more tricks like using both pseudo-elements to have two shapes.")],-1)),n[50]||(n[50]=s("p",null,"I didn’t explore all the variations but you now have the recipe to create most of them!",-1)),s("p",null,[n[27]||(n[27]=a("You can explore ")),s("a",A,[e(l,{icon:"fas fa-globe"}),n[26]||(n[26]=a("my Zig-Zag loaders collection"))]),n[28]||(n[28]=a(" to study other variations and try to create your own loader. It’s a good opportunity to practice what you have learned from this article."))]),f(" TODO: add ARTICLE CARD "),e(u,m(g({title:"How to Create Zig-Zag CSS Loaders Using One Element",desc:"In a previous article, I showed you how to create filling CSS loaders collection where each loader was built using a single HTML element. Here, you’ll learn more about loaders by creating the Zig-Zag collection. Here is an overview of what you’ll be ...",link:"https://chanhi2000.github.io/bookshelf/freecodecamp.org/zig-zag-css-loaders.html",logo:"https://cdn.freecodecamp.org/universal/favicons/favicon.ico",background:"rgba(10,10,35,0.2)"})),null,16)])}const U=k(w,[["render",L],["__file","zig-zag-css-loaders.html.vue"]]),D=JSON.parse('{"path":"/freecodecamp.org/zig-zag-css-loaders.html","title":"How to Create Zig-Zag CSS Loaders Using One Element","lang":"en-US","frontmatter":{"lang":"en-US","title":"How to Create Zig-Zag CSS Loaders Using One Element","description":"Article(s) > How to Create Zig-Zag CSS Loaders Using One Element","icon":"fa-brands fa-css3-alt","category":["CSS","Article(s)"],"tag":["blog","freecodecamp.org","css"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to Create Zig-Zag CSS Loaders Using One Element"},{"property":"og:description","content":"How to Create Zig-Zag CSS Loaders Using One Element"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/zig-zag-css-loaders.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/freecodecamp.org/zig-zag-css-loaders.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to Create Zig-Zag CSS Loaders Using One Element"}],["meta",{"property":"og:description","content":"Article(s) > How to Create Zig-Zag CSS Loaders Using One Element"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1732045303831/af9240a9-6a25-4b13-a397-102ee098db78.jpeg"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://cdn.hashnode.com/res/hashnode/image/upload/v1732045303831/af9240a9-6a25-4b13-a397-102ee098db78.jpeg"}],["meta",{"name":"twitter:image:alt","content":"How to Create Zig-Zag CSS Loaders Using One Element"}],["meta",{"property":"article:author","content":"Temani Afif"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"freecodecamp.org"}],["meta",{"property":"article:tag","content":"css"}],["meta",{"property":"article:published_time","content":"2024-11-21T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to Create Zig-Zag CSS Loaders Using One Element\\",\\"image\\":[\\"https://cdn.hashnode.com/res/hashnode/image/upload/v1731707755150/f1782db9-fa7f-472e-b771-cfc1c2046e0c.png\\",\\"https://cdn.hashnode.com/res/hashnode/image/upload/v1731708477342/bbe3e0b6-24a2-498d-992b-4ee152b0d74c.png\\"],\\"datePublished\\":\\"2024-11-21T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Temani Afif\\"}]}"]],"prev":"/programming/css/articles/README.md","date":"2024-11-21T00:00:00.000Z","isOriginal":false,"author":"Temani Afif","cover":"https://cdn.hashnode.com/res/hashnode/image/upload/v1732045303831/af9240a9-6a25-4b13-a397-102ee098db78.jpeg"},"headers":[{"level":2,"title":"How to Create a Zig-Zag Shape","slug":"how-to-create-a-zig-zag-shape","link":"#how-to-create-a-zig-zag-shape","children":[]},{"level":2,"title":"How to Animate the Zig-Zag Shape","slug":"how-to-animate-the-zig-zag-shape","link":"#how-to-animate-the-zig-zag-shape","children":[]},{"level":2,"title":"How to Create a Discrete Animation","slug":"how-to-create-a-discrete-animation","link":"#how-to-create-a-discrete-animation","children":[]},{"level":2,"title":"Conclusion","slug":"conclusion","link":"#conclusion","children":[]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":6.52,"words":1955},"filePathRelative":"freecodecamp.org/zig-zag-css-loaders.md","localizedDate":"November 21, 2024","excerpt":"\\n","copyright":{"author":"Temani Afif"}}');export{U as comp,D as data};