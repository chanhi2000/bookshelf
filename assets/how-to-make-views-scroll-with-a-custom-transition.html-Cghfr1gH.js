import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as d,am as s,as as k,ao as a,at as e,au as o,al as c,an as p,aq as l,ar as m}from"./app-CpYYKbnj.js";const h={},w={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},v={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-make-views-scroll-with-a-custom-transition-1.zip",target:"_blank",rel:"noopener noreferrer"},g={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-make-views-scroll-with-a-custom-transition-2.zip",target:"_blank",rel:"noopener noreferrer"},b={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-make-views-scroll-with-a-custom-transition-3.zip",target:"_blank",rel:"noopener noreferrer"},y={class:"hint-container details"};function S(r,n){const t=l("VPCard"),i=l("FontIcon");return m(),d("div",null,[s("h1",w,[s("a",f,[s("span",null,k(r.$frontmatter.title)+" 관련",1)])]),a(t,e(o({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[4]||(n[4]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[5]||(n[5]=s("hr",null,null,-1)),a(t,e(o({title:"How to make views scroll with a custom transition | SwiftUI by Example",desc:"How to make views scroll with a custom transition",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-make-views-scroll-with-a-custom-transition",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[6]||(n[6]=c(`<blockquote><p>Updated for Xcode 15</p></blockquote><p><strong>New in iOS 17</strong></p><p>SwiftUI&#39;s <code>ScrollView</code> places all its children in a smooth-scrolling vertical or horizontal container, but if we attach the <code>scrollTransition()</code> modifier to child views then we&#39;re able to customize how views are transitioned on to and off from the screen.</p><p>This modifier must be passed a closure that takes at least two parameters: some content to control (one child view inside the scrolling area), plus a scroll transition phase. The phase might be one of three values:</p><ul><li>The <code>.identity</code> phase, which means the view is visible on the screen.</li><li>The <code>.topLeading</code> phase, where the views is about to become visible from either the top or leading edge depending on your scroll view direction.</li><li>The <code>.bottomTrailing</code> phase, which is the bottom/trailing counterpart to <code>.topLeading</code>.</li></ul><p>For example, we could place a series of rounded rectangles in a vertical scroll view, making them fade in and out as they near the edges of the screen:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">ScrollView</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">ForEach</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token operator">..&lt;</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> i <span class="token keyword">in</span></span>
<span class="line">        <span class="token class-name">RoundedRectangle</span><span class="token punctuation">(</span>cornerRadius<span class="token punctuation">:</span> <span class="token number">25</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>height<span class="token punctuation">:</span> <span class="token number">80</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span>scrollTransition <span class="token punctuation">{</span> content<span class="token punctuation">,</span> phase <span class="token keyword">in</span></span>
<span class="line">                content</span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">opacity</span><span class="token punctuation">(</span>phase<span class="token punctuation">.</span>isIdentity <span class="token operator">?</span> <span class="token number">1</span> <span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">scaleEffect</span><span class="token punctuation">(</span>phase<span class="token punctuation">.</span>isIdentity <span class="token operator">?</span> <span class="token number">1</span> <span class="token punctuation">:</span> <span class="token number">0.75</span><span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">blur</span><span class="token punctuation">(</span>radius<span class="token punctuation">:</span> phase<span class="token punctuation">.</span>isIdentity <span class="token operator">?</span> <span class="token number">0</span> <span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span><span class="token punctuation">.</span>horizontal<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7)),s("blockquote",null,[s("p",null,[s("a",v,[a(i,{icon:"fas fa-file-zipper"}),n[0]||(n[0]=p("Download this as an Xcode project"))])])]),n[7]||(n[7]=c(`<figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-make-views-scroll-with-a-custom-transition-1~dark@2x.gif" alt="Scrolling views that fade in and out as they scroll into and off the screen." tabindex="0" loading="lazy"><figcaption>Scrolling views that fade in and out as they scroll into and off the screen.</figcaption></figure><p>For additional control, you can specify how much of the view needs to be visible before it&#39;s displayed or removed. For example, we could say that we want our scrolling views to be inserted into our view hierarchy only when they are at least 90% visible:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">ScrollView</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">ForEach</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token operator">..&lt;</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> i <span class="token keyword">in</span></span>
<span class="line">        <span class="token class-name">RoundedRectangle</span><span class="token punctuation">(</span>cornerRadius<span class="token punctuation">:</span> <span class="token number">25</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>height<span class="token punctuation">:</span> <span class="token number">80</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">scrollTransition</span><span class="token punctuation">(</span><span class="token punctuation">.</span>animated<span class="token punctuation">.</span><span class="token function">threshold</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token function">visible</span><span class="token punctuation">(</span><span class="token number">0.9</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> content<span class="token punctuation">,</span> phase <span class="token keyword">in</span></span>
<span class="line">                content</span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">opacity</span><span class="token punctuation">(</span>phase<span class="token punctuation">.</span>isIdentity <span class="token operator">?</span> <span class="token number">1</span> <span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">scaleEffect</span><span class="token punctuation">(</span>phase<span class="token punctuation">.</span>isIdentity <span class="token operator">?</span> <span class="token number">1</span> <span class="token punctuation">:</span> <span class="token number">0.75</span><span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">blur</span><span class="token punctuation">(</span>radius<span class="token punctuation">:</span> phase<span class="token punctuation">.</span>isIdentity <span class="token operator">?</span> <span class="token number">0</span> <span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span><span class="token punctuation">.</span>horizontal<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),s("blockquote",null,[s("p",null,[s("a",g,[a(i,{icon:"fas fa-file-zipper"}),n[1]||(n[1]=p("Download this as an Xcode project"))])])]),n[8]||(n[8]=c(`<figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-make-views-scroll-with-a-custom-transition-2~dark@2x.gif" alt="Scrolling views that fade in and out as they scroll into and off the screen." tabindex="0" loading="lazy"><figcaption>Scrolling views that fade in and out as they scroll into and off the screen.</figcaption></figure><p>If you need <em>very</em> precise control over the effects that are applied, read the <code>value</code> of the transition phase. This will be -1 for views in the top leading phase, 1 for views in the bottom trailing phase, and 0 for all other views.</p><p>For example, this gently modifies the hue of each scrolling shape by combining <code>phase.value</code> with the <code>hueRotation()</code> modifier:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">ScrollView</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">ForEach</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token operator">..&lt;</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> i <span class="token keyword">in</span></span>
<span class="line">        <span class="token class-name">RoundedRectangle</span><span class="token punctuation">(</span>cornerRadius<span class="token punctuation">:</span> <span class="token number">25</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>height<span class="token punctuation">:</span> <span class="token number">80</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">shadow</span><span class="token punctuation">(</span>radius<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span>scrollTransition <span class="token punctuation">{</span> content<span class="token punctuation">,</span> phase <span class="token keyword">in</span></span>
<span class="line">                content</span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">hueRotation</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token function">degrees</span><span class="token punctuation">(</span><span class="token number">45</span> <span class="token operator">*</span> phase<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span><span class="token punctuation">.</span>horizontal<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),s("blockquote",null,[s("p",null,[s("a",b,[a(i,{icon:"fas fa-file-zipper"}),n[2]||(n[2]=p("Download this as an Xcode project"))])])]),n[9]||(n[9]=s("figure",null,[s("img",{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-make-views-scroll-with-a-custom-transition-3~dark@2x.gif",alt:"Scrolling views that change color at the screen edge.",tabindex:"0",loading:"lazy"}),s("figcaption",null,"Scrolling views that change color at the screen edge.")],-1)),s("details",y,[n[3]||(n[3]=s("summary",null,"Similar solutions…",-1)),a(t,e(o({title:"How to create a custom transition | SwiftUI by Example",desc:"How to create a custom transition",link:"/hackingwithswift.com/swiftui/how-to-create-a-custom-transition.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"How to add and remove views with a transition | SwiftUI by Example",desc:"How to add and remove views with a transition",link:"/hackingwithswift.com/swiftui/how-to-add-and-remove-views-with-a-transition.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"How to make a scroll view move to a location using ScrollViewReader | SwiftUI by Example",desc:"How to make a scroll view move to a location using ScrollViewReader",link:"/hackingwithswift.com/swiftui/how-to-make-a-scroll-view-move-to-a-location-using-scrollviewreader.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"How to indent the content or scroll indicators in a ScrollView | SwiftUI by Example",desc:"How to indent the content or scroll indicators in a ScrollView",link:"/hackingwithswift.com/swiftui/how-to-indent-the-content-or-scroll-indicators-in-a-scrollview.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"How to flash the scroll bar indicators of a ScrollView or List | SwiftUI by Example",desc:"How to flash the scroll bar indicators of a ScrollView or List",link:"/hackingwithswift.com/swiftui/how-to-flash-the-scroll-bar-indicators-of-a-scrollview-or-list.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const R=u(h,[["render",S],["__file","how-to-make-views-scroll-with-a-custom-transition.html.vue"]]),I=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-make-views-scroll-with-a-custom-transition.html","title":"How to make views scroll with a custom transition","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make views scroll with a custom transition","description":"Article(s) > How to make views scroll with a custom transition","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make views scroll with a custom transition"},{"property":"og:description","content":"How to make views scroll with a custom transition"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-make-views-scroll-with-a-custom-transition.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-make-views-scroll-with-a-custom-transition.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make views scroll with a custom transition"}],["meta",{"property":"og:description","content":"Article(s) > How to make views scroll with a custom transition"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-make-views-scroll-with-a-custom-transition-1~dark@2x.gif"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make views scroll with a custom transition\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-make-views-scroll-with-a-custom-transition-1~dark@2x.gif\\",\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-make-views-scroll-with-a-custom-transition-2~dark@2x.gif\\",\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-make-views-scroll-with-a-custom-transition-3~dark@2x.gif\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.04,"words":913},"filePathRelative":"hackingwithswift.com/swiftui/how-to-make-views-scroll-with-a-custom-transition.md","excerpt":"\\n"}');export{R as comp,I as data};