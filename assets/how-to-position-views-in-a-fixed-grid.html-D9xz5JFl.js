import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as d,am as s,as as k,ao as a,at as e,au as p,al as o,an as l,aq as c,ar as m}from"./app-CpYYKbnj.js";const v={},w={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},b={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-position-views-in-a-fixed-grid-1.zip",target:"_blank",rel:"noopener noreferrer"},f={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-position-views-in-a-fixed-grid-2.zip",target:"_blank",rel:"noopener noreferrer"},h={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-position-views-in-a-fixed-grid-3.zip",target:"_blank",rel:"noopener noreferrer"},y={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-position-views-in-a-fixed-grid-4.zip",target:"_blank",rel:"noopener noreferrer"},x={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-position-views-in-a-fixed-grid-5.zip",target:"_blank",rel:"noopener noreferrer"},q={class:"hint-container details"};function S(u,n){const t=c("VPCard"),i=c("FontIcon");return m(),d("div",null,[s("h1",w,[s("a",g,[s("span",null,k(u.$frontmatter.title)+" 관련",1)])]),a(t,e(p({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[6]||(n[6]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[7]||(n[7]=s("hr",null,null,-1)),a(t,e(p({title:"How to position views in a fixed grid | SwiftUI by Example",desc:"How to position views in a fixed grid",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-position-views-in-a-fixed-grid",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[8]||(n[8]=o(`<blockquote><p>Updated for Xcode 15</p></blockquote><p><strong>New in iOS 16</strong></p><p>SwiftUI&#39;s <code>Grid</code> view lets us create a static grid of views, with precise control over what goes into each row and column. You mark out individual rows using <code>GridRow</code>, then optionally also configure how wide each cell should be.</p><p>As a basic example, this creates a 2x2 grid with text reflecting where each cell with be positioned:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">Grid</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">GridRow</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Top Leading&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token punctuation">.</span>red<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Top Trailing&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token punctuation">.</span>orange<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token class-name">GridRow</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Bottom Leading&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token punctuation">.</span>green<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Bottom Trailing&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>title<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)),s("blockquote",null,[s("p",null,[s("a",b,[a(i,{icon:"fas fa-file-zipper"}),n[0]||(n[0]=l("Download this as an Xcode project"))])])]),n[9]||(n[9]=o(`<p>If you don&#39;t want to have the same number of cells in each row, you have three choices.</p><p>First, if you do nothing, SwiftUI will automatically insert empty cells to make sure the rows are equal. So, in this code we can add to the red and blue scores freely, and SwiftUI will keep the whole thing balanced:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> redScore <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> blueScore <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Grid</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">GridRow</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Red&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">                <span class="token class-name">ForEach</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token operator">..&lt;</span>redScore<span class="token punctuation">,</span> id<span class="token punctuation">:</span> <span class="token punctuation">\\</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token omit keyword">_</span> <span class="token keyword">in</span></span>
<span class="line">                    <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                        <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">.</span>red<span class="token punctuation">)</span></span>
<span class="line">                        <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">            <span class="token class-name">GridRow</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Blue&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">                <span class="token class-name">ForEach</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token operator">..&lt;</span>blueScore<span class="token punctuation">,</span> id<span class="token punctuation">:</span> <span class="token punctuation">\\</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token omit keyword">_</span> <span class="token keyword">in</span></span>
<span class="line">                    <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                        <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span></span>
<span class="line">                        <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>title<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token class-name">Button</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Add to Red&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> redScore <span class="token operator">+=</span> <span class="token number">1</span> <span class="token punctuation">}</span></span>
<span class="line">        <span class="token class-name">Button</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Add to Blue&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> blueScore <span class="token operator">+=</span> <span class="token number">1</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),s("blockquote",null,[s("p",null,[s("a",f,[a(i,{icon:"fas fa-file-zipper"}),n[1]||(n[1]=l("Download this as an Xcode project"))])])]),n[10]||(n[10]=o(`<p>The second option is to place views into the grid without wrapping them in a <code>GridRow</code>, which will cause them to occupy a whole row by themselves. This is great for the <code>Divider</code> view. The third option is to use the <code>gridCellColumns()</code> modifier, to make one cell span multiple columns.</p><p>We can see the second and third option in a single code sample:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">Grid</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">GridRow</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Food&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;$200&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token class-name">GridRow</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Rent&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;$800&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token class-name">GridRow</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Candles&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;$3600&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token class-name">Divider</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token class-name">GridRow</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;$4600&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">gridCellColumns</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">multilineTextAlignment</span><span class="token punctuation">(</span><span class="token punctuation">.</span>trailing<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>title<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),s("blockquote",null,[s("p",null,[s("a",h,[a(i,{icon:"fas fa-file-zipper"}),n[2]||(n[2]=l("Download this as an Xcode project"))])])]),n[11]||(n[11]=o(`<p>As you can see, using <code>gridCellColumns()</code> with the same number of columns you have yields the same result as placing a view outside of a <code>GridRow</code>.</p><p>Important: Unlike <code>LazyHGrid</code> and <code>LazyVGrid</code>, a plain <code>Grid</code> loads all its views immediately, so be careful how much work you do.</p><p>Grids are fantastic choices when you need exact layouts – we can use them to make a tic-tac-toe board:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">Grid</span><span class="token punctuation">(</span>horizontalSpacing<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">,</span> verticalSpacing<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">GridRow</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;xmark&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;xmark&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;xmark&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token class-name">GridRow</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;circle&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;xmark&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;circle&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token class-name">GridRow</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;xmark&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;circle&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;circle&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>largeTitle<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),s("blockquote",null,[s("p",null,[s("a",y,[a(i,{icon:"fas fa-file-zipper"}),n[3]||(n[3]=l("Download this as an Xcode project"))])])]),n[12]||(n[12]=o(`<p>Or even a chessboard:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Grid</span><span class="token punctuation">(</span>horizontalSpacing<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> verticalSpacing<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">ForEach</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token operator">..&lt;</span><span class="token number">8</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> row <span class="token keyword">in</span></span>
<span class="line">                <span class="token class-name">GridRow</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token class-name">ForEach</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token operator">..&lt;</span><span class="token number">8</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> col <span class="token keyword">in</span></span>
<span class="line">                        <span class="token keyword">if</span> <span class="token punctuation">(</span>row <span class="token operator">+</span> col<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isMultiple</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                            <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                                <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">.</span>black<span class="token punctuation">)</span></span>
<span class="line">                        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">                            <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                                <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">.</span>white<span class="token punctuation">)</span></span>
<span class="line">                        <span class="token punctuation">}</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">aspectRatio</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> contentMode<span class="token punctuation">:</span> <span class="token punctuation">.</span>fit<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">border</span><span class="token punctuation">(</span><span class="token punctuation">.</span>black<span class="token punctuation">,</span> width<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)),s("blockquote",null,[s("p",null,[s("a",x,[a(i,{icon:"fas fa-file-zipper"}),n[4]||(n[4]=l("Download this as an Xcode project"))])])]),s("details",q,[n[5]||(n[5]=s("summary",null,"Similar solutions…",-1)),a(t,e(p({title:"How to position views in a grid using LazyVGrid and LazyHGrid | SwiftUI by Example",desc:"How to position views in a grid using LazyVGrid and LazyHGrid",link:"/hackingwithswift.com/swiftui/how-to-position-views-in-a-grid-using-lazyvgrid-and-lazyhgrid.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(p({title:"How to make a fixed size Spacer | SwiftUI by Example",desc:"How to make a fixed size Spacer",link:"/hackingwithswift.com/swiftui/how-to-make-a-fixed-size-spacer.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(p({title:"How to adjust the position of a view using its offset | SwiftUI by Example",desc:"How to adjust the position of a view using its offset",link:"/hackingwithswift.com/swiftui/how-to-adjust-the-position-of-a-view-using-its-offset.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(p({title:"How to add Metal shaders to SwiftUI views using layer effects | SwiftUI by Example",desc:"How to add Metal shaders to SwiftUI views using layer effects",link:"/hackingwithswift.com/swiftui/how-to-add-metal-shaders-to-swiftui-views-using-layer-effects.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(p({title:"How to style text views with fonts, colors, line spacing, and more | SwiftUI by Example",desc:"How to style text views with fonts, colors, line spacing, and more",link:"/hackingwithswift.com/swiftui/how-to-style-text-views-with-fonts-colors-line-spacing-and-more.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const I=r(v,[["render",S],["__file","how-to-position-views-in-a-fixed-grid.html.vue"]]),T=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-position-views-in-a-fixed-grid.html","title":"How to position views in a fixed grid","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to position views in a fixed grid","description":"Article(s) > How to position views in a fixed grid","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to position views in a fixed grid"},{"property":"og:description","content":"How to position views in a fixed grid"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-position-views-in-a-fixed-grid.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-position-views-in-a-fixed-grid.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to position views in a fixed grid"}],["meta",{"property":"og:description","content":"Article(s) > How to position views in a fixed grid"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to position views in a fixed grid\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.23,"words":968},"filePathRelative":"hackingwithswift.com/swiftui/how-to-position-views-in-a-fixed-grid.md","excerpt":"\\n"}');export{I as comp,T as data};