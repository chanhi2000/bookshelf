import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as d,am as s,as as m,ao as a,at as e,au as o,al as p,an as l,aq as c,ar as k}from"./app-CpYYKbnj.js";const w={},h={id:"frontmatter-title-관련",tabindex:"-1"},v={class:"header-anchor",href:"#frontmatter-title-관련"},f={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-handle-pinch-to-zoom-for-views-1.zip",target:"_blank",rel:"noopener noreferrer"},g={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-handle-pinch-to-zoom-for-views-2.zip",target:"_blank",rel:"noopener noreferrer"},b={class:"hint-container details"};function y(r,n){const t=c("VPCard"),i=c("FontIcon");return k(),d("div",null,[s("h1",h,[s("a",v,[s("span",null,m(r.$frontmatter.title)+" 관련",1)])]),a(t,e(o({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[3]||(n[3]=s("nav",{class:"table-of-contents"},[s("ul")],-1)),n[4]||(n[4]=s("hr",null,null,-1)),a(t,e(o({title:"How to handle pinch to zoom for views | SwiftUI by Example",desc:"How to handle pinch to zoom for views",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-handle-pinch-to-zoom-for-views",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[5]||(n[5]=p(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>SwiftUI provides <code>MagnifyGesture</code> for tracking pinch to zoom for views, which can be bound to a <code>scaleEffect()</code> modifier so the user’s pinch gesture automatically scales up or shrinks a view.</p><p>If you want to keep their zoom level once they finish the gesture, you should track their current and total zoom level together, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> currentZoom <span class="token operator">=</span> <span class="token number">0.0</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> totalZoom <span class="token operator">=</span> <span class="token number">1.0</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;singapore&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">scaleEffect</span><span class="token punctuation">(</span>currentZoom <span class="token operator">+</span> totalZoom<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">gesture</span><span class="token punctuation">(</span></span>
<span class="line">                <span class="token class-name">MagnifyGesture</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">.</span>onChanged <span class="token punctuation">{</span> value <span class="token keyword">in</span></span>
<span class="line">                        currentZoom <span class="token operator">=</span> value<span class="token punctuation">.</span>magnification <span class="token operator">-</span> <span class="token number">1</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                    <span class="token punctuation">.</span>onEnded <span class="token punctuation">{</span> value <span class="token keyword">in</span></span>
<span class="line">                        totalZoom <span class="token operator">+=</span> currentZoom</span>
<span class="line">                        currentZoom <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span>accessibilityZoomAction <span class="token punctuation">{</span> action <span class="token keyword">in</span></span>
<span class="line">                <span class="token keyword">if</span> action<span class="token punctuation">.</span>direction <span class="token operator">==</span> <span class="token punctuation">.</span>zoomIn <span class="token punctuation">{</span></span>
<span class="line">                    totalZoom <span class="token operator">+=</span> <span class="token number">1</span></span>
<span class="line">                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">                    totalZoom <span class="token operator">-=</span> <span class="token number">1</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),s("blockquote",null,[s("p",null,[s("a",f,[a(i,{icon:"fas fa-file-zipper"}),n[0]||(n[0]=l("Download this as an Xcode project"))])])]),n[6]||(n[6]=p(`<div class="hint-container tip"><p class="hint-container-title">Tips</p><p>Subtract 1 from <code>value.magnification</code> is important, because 1 is its default value for a new gesture. Using the <code>accessibilityZoomAction()</code> modifier allows assistive technologies to control the zoom level.</p></div><p>On the other hand, if you want to track their gesture but reset back to 0 each time, use <code>@GestureState</code> like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@GestureState</span> <span class="token keyword">private</span> <span class="token keyword">var</span> zoom <span class="token operator">=</span> <span class="token number">1.0</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;singapore&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">scaleEffect</span><span class="token punctuation">(</span>zoom<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">gesture</span><span class="token punctuation">(</span></span>
<span class="line">                <span class="token class-name">MagnifyGesture</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">.</span><span class="token function">updating</span><span class="token punctuation">(</span>$zoom<span class="token punctuation">)</span> <span class="token punctuation">{</span> value<span class="token punctuation">,</span> gestureState<span class="token punctuation">,</span> transaction <span class="token keyword">in</span></span>
<span class="line">                        gestureState <span class="token operator">=</span> value<span class="token punctuation">.</span>magnification</span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),s("blockquote",null,[s("p",null,[s("a",g,[a(i,{icon:"fas fa-file-zipper"}),n[1]||(n[1]=l("Download this as an Xcode project"))])])]),s("details",b,[n[2]||(n[2]=s("summary",null,"Similar solutions…",-1)),a(t,e(o({title:"How to override animations with transactions | SwiftUI by Example",desc:"How to override animations with transactions",link:"/hackingwithswift.com/swiftui/how-to-override-animations-with-transactions.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"Composing views to create a list row | SwiftUI by Example",desc:"Composing views to create a list row",link:"/hackingwithswift.com/swiftui/composing-views-to-create-a-list-row.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"How to use @EnvironmentObject to share data between views | SwiftUI by Example",desc:"How to use @EnvironmentObject to share data between views",link:"/hackingwithswift.com/swiftui/how-to-use-environmentobject-to-share-data-between-views.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"How to make two views the same width or height | SwiftUI by Example",desc:"How to make two views the same width or height",link:"/hackingwithswift.com/swiftui/how-to-make-two-views-the-same-width-or-height.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(o({title:"How to make views scroll with a custom transition | SwiftUI by Example",desc:"How to make views scroll with a custom transition",link:"/hackingwithswift.com/swiftui/how-to-make-views-scroll-with-a-custom-transition.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const H=u(w,[["render",y],["__file","how-to-handle-pinch-to-zoom-for-views.md.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-handle-pinch-to-zoom-for-views.md.html","title":"How to handle pinch to zoom for views","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to handle pinch to zoom for views","description":"Article(s) > How to handle pinch to zoom for views","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to handle pinch to zoom for views"},{"property":"og:description","content":"How to handle pinch to zoom for views"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-handle-pinch-to-zoom-for-views.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-handle-pinch-to-zoom-for-views.md.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to handle pinch to zoom for views"}],["meta",{"property":"og:description","content":"Article(s) > How to handle pinch to zoom for views"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to handle pinch to zoom for views\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"next":"/hackingwithswift.com/swiftui/whats-the-difference-between-observedobject-state-and-environmentobject.md"},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.99,"words":596},"filePathRelative":"hackingwithswift.com/swiftui/how-to-handle-pinch-to-zoom-for-views.md.md","excerpt":"\\n"}');export{H as comp,x as data};