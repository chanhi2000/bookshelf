import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as r,am as s,as as d,ao as a,at as e,au as i,al as p,an as k,aq as o,ar as m}from"./app-CpYYKbnj.js";const v={},w={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"},f={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-position-and-style-subviews-that-come-from-a-different-view-3.zip",target:"_blank",rel:"noopener noreferrer"},b={class:"hint-container details"};function g(l,n){const t=o("VPCard"),c=o("FontIcon");return m(),r("div",null,[s("h1",w,[s("a",h,[s("span",null,d(l.$frontmatter.title)+" 관련",1)])]),a(t,e(i({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[2]||(n[2]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[3]||(n[3]=s("hr",null,null,-1)),a(t,e(i({title:"How to position and style subviews that come from a different view | SwiftUI by Example",desc:"How to position and style subviews that come from a different view",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-position-and-style-subviews-that-come-from-a-different-view",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[4]||(n[4]=p(`<blockquote><p>Updated for Xcode 16</p></blockquote><p><strong>Improved in iOS 18</strong></p><p>SwiftUI’s <code>Group</code> and <code>ForEach</code> views have initializers that let us read one view or view builder, then place the resulting subviews by hand. This is perfect when you want to position views manually without having to create a completely custom layout.</p><p>Let&#39;s start with <code>Group</code> first. As an example, here&#39;s a view with five pieces of news headlines:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">HeadlinesView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Coming soon: Xcode on Apple Watch&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Apple announces Swift-compatible toaster&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Xcode predicts errors before you make them&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Apple Intelligence gains sentience, demands a vacation&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Swift concurrency made simple&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>They don&#39;t have any layout attached to them – they aren&#39;t wrapped in a <code>VStack</code>, for example. As a result, we can use <code>Group(subviewsOf:)</code> to read all the text views inside <code>HeadlinesView</code>, adjusting each one by hand.</p><p>For example, we might make the first headline bigger than the others:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Group</span><span class="token punctuation">(</span>subviewsOf<span class="token punctuation">:</span> <span class="token class-name">HeadlinesView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> collection <span class="token keyword">in</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token keyword">let</span> firstView <span class="token operator">=</span> collection<span class="token punctuation">.</span>first <span class="token punctuation">{</span></span>
<span class="line">                firstView</span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>title<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">            <span class="token class-name">ForEach</span><span class="token punctuation">(</span>collection<span class="token punctuation">.</span><span class="token function">dropFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> item <span class="token keyword">in</span></span>
<span class="line">                item</span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That handles the first subview specifically, then loops over the remainder to place them unmodified.</p><p>You can add whatever positioning or styling information you want. For example, we could show all headline views at the same size, and instead cycle through background colors:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Latest News&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>largeTitle<span class="token punctuation">.</span><span class="token function">bold</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">            <span class="token class-name">Group</span><span class="token punctuation">(</span>subviewsOf<span class="token punctuation">:</span> <span class="token class-name">HeadlinesView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> collection <span class="token keyword">in</span></span>
<span class="line">                <span class="token class-name">ForEach</span><span class="token punctuation">(</span>collection<span class="token punctuation">.</span>indices<span class="token punctuation">,</span> id<span class="token punctuation">:</span> <span class="token punctuation">\\</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> index <span class="token keyword">in</span></span>
<span class="line">                    collection<span class="token punctuation">[</span>index<span class="token punctuation">]</span></span>
<span class="line">                        <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>maxWidth<span class="token punctuation">:</span> <span class="token punctuation">.</span>infinity<span class="token punctuation">)</span></span>
<span class="line">                        <span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span><span class="token punctuation">.</span>vertical<span class="token punctuation">)</span></span>
<span class="line">                        <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token class-name">Color</span><span class="token punctuation">(</span>hue<span class="token punctuation">:</span> <span class="token class-name">Double</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token class-name">Double</span><span class="token punctuation">(</span>collection<span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">,</span> saturation<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> brightness<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>So, <code>Group(subviewsOf:)</code> take a view or a view builder – we don&#39;t really care which, or how either are created – and it hands it to us as a collection we can manipulate.</p><p>In comparison, <code>ForEach(subviewOf:)</code> takes a view or a view builder, and hands each element to us one by one. It&#39;s not quite as powerful because you can&#39;t access randomly elements in the collection freely, but it&#39;s still useful for simpler things.</p><p>If you need more complex layouts, you can use SwiftUI&#39;s existing <code>Section</code> view to break things up. These can be read using <code>Group(sectionsOf:)</code> or <code>ForEach(sectionOf:)</code>, allowing you to style section headers and section contents differently as needed.</p><div class="hint-container important"><p class="hint-container-title">Important</p><p>In Xcode 16 beta 1, this API is a little broken – you&#39;ll find it works great in Xcode previews, but doesn&#39;t work at all in the simulator. If you find that it&#39;s fixed by the time you read this, please let me know and I&#39;ll remove this warning!</p></div><p>For example, this shows section headers in a big, bold font, with each section&#39;s contents below:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">SectionedHeadlinesView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Section</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Possible&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Coming soon: Xcode on Apple Watch&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Apple announces Swift-compatible toaster&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token class-name">Section</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Probable&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Xcode predicts errors before you make them&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Apple Intelligence gains sentience, demands a vacation&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token class-name">Section</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Preposterous&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Swift concurrency made simple&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Debugging Swift code works first time&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">ForEach</span><span class="token punctuation">(</span>sectionOf<span class="token punctuation">:</span> <span class="token class-name">SectionedHeadlinesView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> section <span class="token keyword">in</span></span>
<span class="line">            section<span class="token punctuation">.</span>header</span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>title<span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">fontWeight</span><span class="token punctuation">(</span><span class="token punctuation">.</span>black<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">            <span class="token class-name">ForEach</span><span class="token punctuation">(</span>section<span class="token punctuation">.</span>content<span class="token punctuation">)</span> <span class="token punctuation">{</span> item <span class="token keyword">in</span></span>
<span class="line">                item</span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17)),s("blockquote",null,[s("p",null,[s("a",f,[a(c,{icon:"fas fa-file-zipper"}),n[0]||(n[0]=k("Download this as an Xcode project"))])])]),n[5]||(n[5]=p(`<p>For complete customization, it&#39;s possible to attach custom values for your contained views, having them flow upward to their container. This is similar to SwiftUI&#39;s preferences system, except the value doesn&#39;t contain flowing upwards past their direct container.</p><p>To do this, first we need to create a new <code>ContainerValue</code> value that will hold the name we&#39;re trying to adjust and a default value. We&#39;ll make our headlines show icons next to them, by adding a new entry for the icon then adjusting our headlines so that each piece of text provides a container value for its icon:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">extension</span> <span class="token class-name">ContainerValues</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@Entry</span> <span class="token keyword">var</span> icon<span class="token punctuation">:</span> <span class="token class-name">String</span> <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;photo&quot;</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">IconHeadlinesView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Coming soon: Xcode on Apple Watch&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">containerValue</span><span class="token punctuation">(</span><span class="token punctuation">\\</span><span class="token punctuation">.</span>icon<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;applewatch&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Apple announces Swift-compatible toaster&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">containerValue</span><span class="token punctuation">(</span><span class="token punctuation">\\</span><span class="token punctuation">.</span>icon<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;swift&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Xcode predicts errors before you make them&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">containerValue</span><span class="token punctuation">(</span><span class="token punctuation">\\</span><span class="token punctuation">.</span>icon<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;exclamationmark.triangle&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Apple Intelligence gains sentience, demands a vacation&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">containerValue</span><span class="token punctuation">(</span><span class="token punctuation">\\</span><span class="token punctuation">.</span>icon<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;apple.logo&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Swift concurrency made simple&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">containerValue</span><span class="token punctuation">(</span><span class="token punctuation">\\</span><span class="token punctuation">.</span>icon<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;sparkles&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>You could make that <code>.containerValue(\\.icon, &quot;xyz&quot;)</code> call into a little <code>View</code> extension for easier calling.</p></div><p>Finally, we can display those headlines with their icons next to them like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Latest News&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>largeTitle<span class="token punctuation">.</span><span class="token function">bold</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">            <span class="token class-name">Group</span><span class="token punctuation">(</span>subviewsOf<span class="token punctuation">:</span> <span class="token class-name">IconHeadlinesView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> collection <span class="token keyword">in</span></span>
<span class="line">                <span class="token class-name">ForEach</span><span class="token punctuation">(</span>collection<span class="token punctuation">)</span> <span class="token punctuation">{</span> item <span class="token keyword">in</span></span>
<span class="line">                    <span class="token class-name">HStack</span> <span class="token punctuation">{</span></span>
<span class="line">                        <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> item<span class="token punctuation">.</span>containerValues<span class="token punctuation">.</span>icon<span class="token punctuation">)</span></span>
<span class="line">                        item</span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The real flexibility here is that <code>IconContentView</code> gets to decide how to use the data it&#39;s provided – maybe it wants to place the icons to the side like a <code>Label</code>, maybe it wants to use them as buttons that reveal the main subview when pressed, or something else entirely.</p>`,7)),s("details",b,[n[1]||(n[1]=s("summary",null,"Similar solutions…",-1)),a(t,e(i({title:"SwiftUI tips and tricks | SwiftUI by Example",desc:"SwiftUI tips and tricks",link:"/hackingwithswift.com/swiftui/swiftui-tips-and-tricks.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"How to position views in a grid using LazyVGrid and LazyHGrid | SwiftUI by Example",desc:"How to position views in a grid using LazyVGrid and LazyHGrid",link:"/hackingwithswift.com/swiftui/how-to-position-views-in-a-grid-using-lazyvgrid-and-lazyhgrid.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"All SwiftUI property wrappers explained and compared | SwiftUI by Example",desc:"All SwiftUI property wrappers explained and compared",link:"/hackingwithswift.com/swiftui/all-swiftui-property-wrappers-explained-and-compared.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"How to detect when the size or position of a view changes | SwiftUI by Example",desc:"How to detect when the size or position of a view changes",link:"/hackingwithswift.com/swiftui/how-to-detect-when-the-size-or-position-of-a-view-changes.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"How to position views in a fixed grid | SwiftUI by Example",desc:"How to position views in a fixed grid",link:"/hackingwithswift.com/swiftui/how-to-position-views-in-a-fixed-grid.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const q=u(v,[["render",g],["__file","how-to-position-and-style-subviews-that-come-from-a-different-view.html.vue"]]),V=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-position-and-style-subviews-that-come-from-a-different-view.html","title":"How to position and style subviews that come from a different view","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to position and style subviews that come from a different view","description":"Article(s) > How to position and style subviews that come from a different view","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to position and style subviews that come from a different view"},{"property":"og:description","content":"How to position and style subviews that come from a different view"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-position-and-style-subviews-that-come-from-a-different-view.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-position-and-style-subviews-that-come-from-a-different-view.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to position and style subviews that come from a different view"}],["meta",{"property":"og:description","content":"Article(s) > How to position and style subviews that come from a different view"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to position and style subviews that come from a different view\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"next":"/hackingwithswift.com/swiftui/introduction-to-navigation.md","date":"2024-06-21T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":4.13,"words":1240},"filePathRelative":"hackingwithswift.com/swiftui/how-to-position-and-style-subviews-that-come-from-a-different-view.md","localizedDate":"2024년 6월 21일","excerpt":"\\n"}');export{q as comp,V as data};