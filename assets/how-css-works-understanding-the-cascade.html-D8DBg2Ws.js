import{_ as m}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as g,am as t,as as f,ao as a,at as c,au as d,ap as i,al as h,an as s,ak as w,aq as n,ar as y}from"./app-CpYYKbnj.js";const b={},k={id:"frontmatter-title-관련",tabindex:"-1"},S={class:"header-anchor",href:"#frontmatter-title-관련"},v={class:"table-of-contents"},C={class:"hint-container info"},T={class:"hint-container-title"},x={href:"https://w3.org/TR/css-cascade-4/#cascading",target:"_blank",rel:"noopener noreferrer"};function I(p,e){const r=n("VPCard"),o=n("router-link"),u=n("SiteInfo"),l=n("FontIcon");return y(),g("div",null,[t("h1",k,[t("a",S,[t("span",null,f(p.$frontmatter.title)+" 관련",1)])]),a(r,c(d({title:"CSS > Article(s)",desc:"Article(s)",link:"/programming/css/articles/README.md",logo:"/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),t("nav",v,[t("ul",null,[t("li",null,[a(o,{to:"#defining-the-cascade"},{default:i(()=>e[0]||(e[0]=[s("Defining the cascade")])),_:1}),t("ul",null,[t("li",null,[a(o,{to:"#origin-importance"},{default:i(()=>e[1]||(e[1]=[s("Origin & importance")])),_:1})]),t("li",null,[a(o,{to:"#how-does-understanding-the-cascade-help-me-write-better-css"},{default:i(()=>e[2]||(e[2]=[s("How does understanding the cascade help me write better CSS?")])),_:1})])])])])]),e[8]||(e[8]=t("hr",null,null,-1)),a(u,{name:"How CSS works: Understanding the cascade",desc:"A few weeks back I got to start a short series on CSS fundamentals. If you’re in the front-end web […]",url:"https://blog.logrocket.com/how-css-works-understanding-the-cascade-d181cd89a4d8",logo:"/images/asset/blog.logrocket.com/favicon.png",preview:"/images/asset/blog.logrocket.com/how-css-works-understanding-the-cascade/banner.png"}),e[9]||(e[9]=h('<p>A few weeks back I got to start a short series on CSS fundamentals. If you’re in the front-end web development space, CSS is one of those key things to know. Whether you’re into CSS-in-JS or you’d rather just have plain ol’ CSS, knowing how CSS works under the hood is crucial for writing efficient, scalable CSS.</p><p>The <a href="/blog.logrocket.com/how-css-works-parsing-painting-css-in-the-critical-rendering-path-b3ee290762d3.m" target="_blank" rel="noopener noreferrer">first post in this series</a> was a deep dive into how the browser actually renders CSS to pixels. In this second post, we’ll dive into an often-misunderstood feature of the CSS language — the cascade.</p><p>The cascade is inherent to working with CSS — after all, it is what gives “Cascading Style Sheets” their <em>cascading</em> nature. The cascade can be a powerful tool, but using it wrong can lead to brittle stylesheets that give front-end developers nightmares any time they have to make a change. As we dive into the cascade, we’ll also look at a few ways to keep the cascade from getting out of hand.</p><hr><h2 id="defining-the-cascade" tabindex="-1"><a class="header-anchor" href="#defining-the-cascade"><span>Defining the cascade</span></a></h2><p>Since we’ll be talking about the specifics of <em>how</em> the CSS Cascade works, it’ll be helpful for us all to be on the same page.</p>',6)),t("div",C,[t("p",T,[a(l,{icon:"iconfont icon-w3c"}),e[3]||(e[3]=s("CSS Cascade Level 4 Spec"))]),t("p",null,[e[5]||(e[5]=s("Here’s the definition from the ")),t("a",x,[a(l,{icon:"iconfont icon-w3c"}),e[4]||(e[4]=s("CSS Cascade Level 4 Spec"))]),e[6]||(e[6]=s("."))]),e[7]||(e[7]=t("blockquote",null,[t("p",null,"The cascade takes a unordered list of declared values for a given property on a given element, sorts them by their declaration’s precedence, and outputs a single cascaded value.")],-1))]),e[10]||(e[10]=h(`<p>The CSS Cascade is the algorithm by which the browser decides which CSS styles to apply to an element — a lot of people like to think of this as the style that “wins”.</p><p>To understand the CSS cascade better, it’s helpful to think of a CSS declaration as having “attributes”. These attributes could be various parts of the declaration — like the selector or the CSS properties — or they can be related of <em>where</em> the CSS declaration exists (like it’s origin or the position in the source code).</p><p>The CSS cascade takes a few of these attributes and assigns each of them a weight. If a CSS rule wins at a higher-priority level, that’s the rule that gets wins.</p><p>However, if there are two rules still in conflict at a given weight, the algorithm will continue to “cascade down” and check the lower-priority attributes until it finds one that wins.</p><p>Here are the attributes that the CSS Cascade algorithm checks, listed in order from <em>highest weight</em> to <em>least weight</em>.</p><ol><li>Origin &amp; Importance</li><li>Selector Specificity</li><li>Order of Appearance</li><li>Initial &amp; Inherited Properties (default values)</li></ol><p>Don’t worry, we’ll get into each of these in-depth.</p><figure><img src="https://storage.googleapis.com/blog-images-backup/1*2H5cnv_UzdWhAwB6KOAOhg.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="origin-importance" tabindex="-1"><a class="header-anchor" href="#origin-importance"><span>Origin &amp; importance</span></a></h3><p>The highest weighted attribute that the cascade checks is a combination of the <em>importance</em> and the <em>origin</em> of a given rule.</p><p>As far as the <em>origin</em> of a CSS rule goes, there are three places that a rule can come from.</p><ol><li><strong><em>User-Agent</em></strong>: These are the default styles provided for the element by the browser. This is why inputs can look slightly different on different browsers, and it’s also one of the reasons that people like to use CSS resets, to make sure that user-agent styles are overridden.</li><li><strong><em>User</em></strong>: These are defined and controlled by the user of the browser. Not everyone will have one, but when people do add one, it’s usually for overriding styles &amp; adding accessibility to websites.</li><li><strong><em>Author</em></strong>: This is CSS declared <em>by the HTML document</em>. When we’re writing stuff as front-end developers this is really the only origin that we have in our control.</li></ol><p>The <em>importance</em> of a CSS declaration is determined by the appropriately-named <code>!important</code> syntax. Adding <code>!important</code> to a CSS rule automatically jumps it to the front of the cascade algorithm, which is why it’s often discouraged. Overriding styles that use <code>!important</code> can only be done with other rules that use <code>!important</code>, which over time can make your CSS more brittle. Many people (myself included) recommend that you only use <code>!important</code> as an escape hatch for when all else fails (such as when working with 3rd-party styles).</p><p>The cascade algorithm considers the <em>combination</em> of these 2 attributes when figuring out which declaration wins. Each combination is given a weight (similar to the way parts of a CSS declaration are weighted), and the declaration with the highest weight wins. Here are the various combinations of origin &amp; importance that the browser considers, listed in order from <em>highest weight</em> to <em>least weight</em>.</p><ol><li>User-Agent &amp; <code>!important</code></li><li>User &amp; <code>!important</code></li><li>Author &amp; <code>!important</code></li><li>CSS Animations, <code>@keyframes</code> (This is the only exception, it is still originating from the <em>author,</em> but as animations are temporary/fleeting the browser weights them slightly higher than normal author rules)</li><li>Author, normal weight</li><li>User, normal weight</li><li>User agent, normal weight</li></ol><p>When the browser comes up against 2 (or more) conflicting CSS declarations and one wins at the origin &amp; importance level, the CSS cascade resolves to that rule. No questions asked. Game over.</p><p>However, if the conflicting declarations have the same level of importance/origin, the cascade moves on to consider <em>selector specificity.</em></p><h4 id="selector-specificity" tabindex="-1"><a class="header-anchor" href="#selector-specificity"><span>Selector specificity</span></a></h4><p>The second weight in the CSS cascade is <em>selector specificity.</em> In this tier, the browser looks at the <em>selectors</em> used in the CSS declaration.</p><p>As a front-end developer, you only have control over the “author” origin stylesheets on your websites — you can’t do much to change the <em>origin</em> of a rule. However, if you’re staying away from using <code>!important</code> in your code, you’ll find that you have a lot of control over the cascade at the specificity tier.</p><p>Similar to the way that the combinations of origin &amp; importance each have their own weight, different types of CSS selectors are assigned priority. When evaluating specificity, the number of selectors and their priority are considered. CSS selectors can belong to one of the following weighted tiers.</p><ol><li>Inline styles (anything inside a <code>style</code> tag)</li><li>ID selectors</li><li>Classes / pseudo-selectors</li><li>Type selectors (for example, <code>h1</code>) &amp; pseudo-elements (<code>::before</code>)</li></ol><p>If you have 2 CSS declarations with the same number of high-priority selectors, the resolution algorithm will consider the number of selectors at the next level of specificity. For example, if both of these CSS rules were targeting the same element, the color would be red. This is because they both have 1 <code>id</code> selector, but the second rule has 2 <code>class</code> selectors.</p><div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre><code><span class="line"><span class="token selector">#first .blue h1</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token selector">#second .red.bold h1</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Many people like to manage specificity by simply <em>not relying on it</em>. Keeping your selector specificity low makes sure that your CSS rules stay flexible.</p><p>In my experience, if you default to only using <code>class</code> selectors for your custom styles and <code>element</code> selectors for your default styles, it’s <em>way</em> easier to override styles when you actually need to. If your CSS declarations have very high selector specificity you find yourself resorting to <code>!important</code> more and that can get ugly pretty quickly.</p><h4 id="source-order" tabindex="-1"><a class="header-anchor" href="#source-order"><span>Source order</span></a></h4><p>The last main tier of the CSS cascade algorithm is resolution by <em>source order</em>. When two selectors have the same specificity, the declaration that comes last in the source code wins.</p><p>Since CSS considers source order in the cascade, the order in which you load your stylesheets actually matters. If you’ve got 2 stylesheets linked in the head of your HTML document, the second stylesheet will override rules in the first stylesheet. This is also the reason that if you’re using a CSS reset or a CSS framework, you’ll want to load that <em>before</em> your custom styles.</p><h4 id="initial-inherited-properties" tabindex="-1"><a class="header-anchor" href="#initial-inherited-properties"><span>Initial &amp; inherited properties</span></a></h4><p>While initial &amp; inherited values aren’t truly part of the CSS cascade, they do determine what happens if there are <em>no CSS declarations</em> targeting the element. In this way, they determine default values for an element.</p><p>Inherited properties will trickle down from parent elements to child elements. For example, the <code>font-family</code> &amp; <code>color</code> properties are inherited. This behavior is what most people think of when they see the word “cascade” because styles will trickle down to their children.</p><p>In the following example, the <code>&lt;p&gt;</code> tag will render with a monospace font &amp; red text, since its parent node contains those styles.</p><div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">font-family</span><span class="token punctuation">:</span> monospace<span class="token punctuation">;</span> <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>inheritance can be super useful!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>For non-inherited properties, each element has a set of <em>initial values —</em> these values are defined in the CSS spec for any given rule. For example, the initial value for the <code>background-color</code> property is <code>transparent</code>. If no CSS declaration sets a value for <code>background-color</code> on an element, it will default to <code>transparent</code>.</p><p>In addition, you can explicitly opt to use inherited or initial values in a CSS declaration by using the <code>inherit</code> or <code>initial</code> keywords in your CSS rule.</p><div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre><code><span class="line"><span class="token selector">div</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">background-color</span><span class="token punctuation">:</span> initial<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">color</span><span class="token punctuation">:</span> inherit<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="how-does-understanding-the-cascade-help-me-write-better-css" tabindex="-1"><a class="header-anchor" href="#how-does-understanding-the-cascade-help-me-write-better-css"><span>How does understanding the cascade help me write better CSS?</span></a></h3><p>Since the CSS cascade is one of the more misunderstood parts of CSS (and often the source of a lot of bugs), knowing how it works will give you a huge edge on keeping your stylesheets maintainable.</p><p>Knowing how to leverage CSS selector specificity to your advantage is a huge skill — I’ve seen far too much CSS that goes straight to the <code>!important</code> escape hatch when a higher-specificity selector would have done the trick. If you’re primarily using class selectors, you can easily do this by nesting selectors or adding another class when you <em>need</em> an override.</p><p>However, with better knowledge of the CSS cascade comes higher responsibility. The more specific parts of the cascade (such as <code>!important</code>, inline styles, id selector ) tend to result in stylesheets that are harder to update or override in the future. They do come in handy if you working with component libraries that use inline styles or CSS libraries that you don’t control.</p>`,41)),w(" TODO: add ARTICLE CARD "),a(r,c(d({title:"How CSS works: Understanding the cascade",desc:"A few weeks back I got to start a short series on CSS fundamentals. If you’re in the front-end web […]",link:"https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-css-works-understanding-the-cascade-d181cd89a4d8.html",logo:"/images/asset/blog.logrocket.com/favicon.png",background:"rgba(112,76,182,0.2)"})),null,16)])}const U=m(b,[["render",I],["__file","how-css-works-understanding-the-cascade.html.vue"]]),_=JSON.parse('{"path":"/blog.logrocket.com/how-css-works-understanding-the-cascade.html","title":"How CSS works: Understanding the cascade","lang":"en-US","frontmatter":{"lang":"en-US","title":"How CSS works: Understanding the cascade","description":"Article(s) > How CSS works: Understanding the cascade","icon":"fa-brands fa-css3-alt","category":["CSS","Article(s)"],"tag":["blog","blog.logrocket.com","css"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How CSS works: Understanding the cascade"},{"property":"og:description","content":"How CSS works: Understanding the cascade"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-css-works-understanding-the-cascade.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-css-works-understanding-the-cascade.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How CSS works: Understanding the cascade"}],["meta",{"property":"og:description","content":"Article(s) > How CSS works: Understanding the cascade"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://chanhi2000.github.io/bookshelf/images/asset/blog.logrocket.com/how-css-works-understanding-the-cascade/banner.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://chanhi2000.github.io/bookshelf/images/asset/blog.logrocket.com/how-css-works-understanding-the-cascade/banner.png"}],["meta",{"name":"twitter:image:alt","content":"How CSS works: Understanding the cascade"}],["meta",{"property":"article:author","content":"Benjamin Johnson"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"blog.logrocket.com"}],["meta",{"property":"article:tag","content":"css"}],["meta",{"property":"article:published_time","content":"2018-05-29T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How CSS works: Understanding the cascade\\",\\"image\\":[\\"https://storage.googleapis.com/blog-images-backup/1*2H5cnv_UzdWhAwB6KOAOhg.png\\"],\\"datePublished\\":\\"2018-05-29T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Benjamin Johnson\\",\\"url\\":\\"https://blog.logrocket.com/author/bjohnson/\\"}]}"]],"prev":"/programming/css/articles/README.md","date":"2018-05-29T00:00:00.000Z","isOriginal":false,"author":[{"name":"Benjamin Johnson","url":"https://blog.logrocket.com/author/bjohnson/"}],"cover":"/images/asset/blog.logrocket.com/how-css-works-understanding-the-cascade/banner.png"},"headers":[{"level":2,"title":"Defining the cascade","slug":"defining-the-cascade","link":"#defining-the-cascade","children":[{"level":3,"title":"Origin & importance","slug":"origin-importance","link":"#origin-importance","children":[]},{"level":3,"title":"How does understanding the cascade help me write better CSS?","slug":"how-does-understanding-the-cascade-help-me-write-better-css","link":"#how-does-understanding-the-cascade-help-me-write-better-css","children":[]}]}],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":1}]},"readingTime":{"minutes":6.4,"words":1919},"filePathRelative":"blog.logrocket.com/how-css-works-understanding-the-cascade.md","localizedDate":"May 29, 2018","excerpt":"\\n","copyright":{"author":"Benjamin Johnson"}}');export{U as comp,_ as data};