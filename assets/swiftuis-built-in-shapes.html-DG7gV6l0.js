import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as r,am as s,as as d,ao as a,at as e,au as i,al as o,an as h,aq as p,ar as k}from"./app-CpYYKbnj.js";const m={},w={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},g={href:"https://hackingwithswift.com/files/projects/swiftui/swiftuis-built-in-shapes-1.zip",target:"_blank",rel:"noopener noreferrer"},b={class:"hint-container details"};function v(c,n){const t=p("VPCard"),l=p("FontIcon");return k(),r("div",null,[s("h1",w,[s("a",f,[s("span",null,d(c.$frontmatter.title)+" 관련",1)])]),a(t,e(i({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[2]||(n[2]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[3]||(n[3]=s("hr",null,null,-1)),a(t,e(i({title:"SwiftUI's built-in shapes | SwiftUI by Example",desc:"SwiftUI's built-in shapes",link:"https://hackingwithswift.com/quick-start/swiftui/swiftuis-built-in-shapes",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[4]||(n[4]=o(`<blockquote><p>Updated for Xcode 15</p></blockquote><p><strong>Improved in iOS 17</strong></p><p>SwiftUI gives us five built-in shapes that are commonly used: rectangle, rounded rectangle, circle, ellipse, and capsule. The last three in particular are subtly different in how they behave based on what sizes you provide, but we can demonstrate all the options with a single example:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">ZStack</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">.</span>gray<span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">            <span class="token class-name">RoundedRectangle</span><span class="token punctuation">(</span>cornerRadius<span class="token punctuation">:</span> <span class="token number">25</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">.</span>red<span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">            <span class="token class-name">UnevenRoundedRectangle</span><span class="token punctuation">(</span>cornerRadii<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token keyword">init</span><span class="token punctuation">(</span>topLeading<span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">,</span> topTrailing<span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">.</span>orange<span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">            <span class="token class-name">Capsule</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">.</span>green<span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">            <span class="token class-name">Ellipse</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">            <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">.</span>white<span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),s("blockquote",null,[s("p",null,[s("a",g,[a(l,{icon:"fas fa-file-zipper"}),n[0]||(n[0]=h("Download this as an Xcode project"))])])]),n[5]||(n[5]=o("<p>That draws all five shapes: two at 200x200 and three at 100x50. However, because the drawing behavior of the shapes is different you’ll see all five shapes visible in the output:</p><ul><li><code>Rectangle</code> draws a box at the exact dimensions you specify.</li><li><code>RoundedRectangle</code> does the same, except now you can round the corners by a certain amount. Its second parameter, <code>style</code>, determines whether you want classic rounded corners (<code>.circular</code>) or Apple’s slightly smoother alternative (<code>.continuous</code>). The default from iOS 13 to 16 was <code>.circular</code>, but this changes to <code>.continuous</code> from iOS 17 on.</li><li><code>UnevenRoundedRectangle</code> is a rounded rectangle where only some corners are rounded. The default is 0 for any corner, but you can override as many as you want to get a custom effect.</li><li><code>Capsule</code> draws a box where one edge axis is rounded fully, depending on whether the height or width is largest. Our shape is 100x50, so it will have rounded left and right edges while being straight on the top and bottom edges.</li><li><code>Ellipse</code> draws an ellipse at the exact dimensions you specify.</li><li><code>Circle</code> draws an ellipse where the height and width are equal, so when we provide 100x50 for the space we’ll actually get 50x50.</li></ul><p>If you’re applying these shapes as clip shapes, content shapes, or similar, you can use the short-hand versions <code>.capsule</code>, <code>ellipse</code>, <code>.rect(cornerRadius: 10)</code>, <code>.rect(topLeadingRadius: 20, topTrailingRadius: 20)</code>, and so on.</p>",3)),s("details",b,[n[1]||(n[1]=s("summary",null,"Similar solutions…",-1)),a(t,e(i({title:"How to combine shapes to create new shapes | SwiftUI by Example",desc:"How to combine shapes to create new shapes",link:"/hackingwithswift.com/swiftui/how-to-combine-shapes-to-create-new-shapes.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"How to fill and stroke shapes at the same time | SwiftUI by Example",desc:"How to fill and stroke shapes at the same time",link:"/hackingwithswift.com/swiftui/how-to-fill-and-stroke-shapes-at-the-same-time.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"How to display solid shapes | SwiftUI by Example",desc:"How to display solid shapes",link:"/hackingwithswift.com/swiftui/how-to-display-solid-shapes.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"How to draw polygons and stars | SwiftUI by Example",desc:"How to draw polygons and stars",link:"/hackingwithswift.com/swiftui/how-to-draw-polygons-and-stars.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"How to draw a custom path | SwiftUI by Example",desc:"How to draw a custom path",link:"/hackingwithswift.com/swiftui/how-to-draw-a-custom-path.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const x=u(m,[["render",v],["__file","swiftuis-built-in-shapes.html.vue"]]),I=JSON.parse(`{"path":"/hackingwithswift.com/swiftui/swiftuis-built-in-shapes.html","title":"SwiftUI's built-in shapes","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"SwiftUI's built-in shapes","description":"Article(s) > SwiftUI's built-in shapes","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > SwiftUI's built-in shapes"},{"property":"og:description","content":"SwiftUI's built-in shapes"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/swiftuis-built-in-shapes.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/swiftuis-built-in-shapes.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"SwiftUI's built-in shapes"}],["meta",{"property":"og:description","content":"Article(s) > SwiftUI's built-in shapes"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SwiftUI's built-in shapes\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"prev":"/hackingwithswift.com/swiftui/how-to-create-new-colors-by-blending-two-other-swiftui-colors.md"},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.32,"words":697},"filePathRelative":"hackingwithswift.com/swiftui/swiftuis-built-in-shapes.md","excerpt":"\\n"}`);export{x as comp,I as data};