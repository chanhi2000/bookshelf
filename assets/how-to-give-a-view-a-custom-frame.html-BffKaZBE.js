import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as m,am as t,as as w,ao as n,at as i,au as e,al as p,an as o,aq as l,ar as g}from"./app-CpYYKbnj.js";const f={},h={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"},k={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-give-a-view-a-custom-frame-1.zip",target:"_blank",rel:"noopener noreferrer"},v={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-give-a-view-a-custom-frame-2.zip",target:"_blank",rel:"noopener noreferrer"},b={class:"hint-container details"};function y(r,a){const s=l("VPCard"),c=l("FontIcon");return g(),m("div",null,[t("h1",h,[t("a",d,[t("span",null,w(r.$frontmatter.title)+" 관련",1)])]),n(s,i(e({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a[3]||(a[3]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),a[4]||(a[4]=t("hr",null,null,-1)),n(s,i(e({title:"How to give a view a custom frame | SwiftUI by Example",desc:"How to give a view a custom frame",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-give-a-view-a-custom-frame",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a[5]||(a[5]=p(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>By default SwiftUI&#39;s views take up only as much space as they need, but if you want that to change you can use a frame() modifier to tell SwiftUI what kind of size range you want to have.</p><p>For example, you could create a button with a 200x200 tappable area like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">Button</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Button tapped&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span> label<span class="token punctuation">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Welcome&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>minWidth<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> maxWidth<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span> minHeight<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> maxHeight<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>largeTitle<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),t("blockquote",null,[t("p",null,[t("a",k,[n(c,{icon:"fas fa-file-zipper"}),a[0]||(a[0]=o("Download this as an Xcode project"))])])]),a[6]||(a[6]=p(`<figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-give-a-view-a-custom-frame-1~dark.png" alt="The word “Welcome” in blue signifying it is tappable." tabindex="0" loading="lazy"><figcaption>The word “Welcome” in blue signifying it is tappable.</figcaption></figure><p>Or you could make a text view fill the whole screen (minus the safe area) by specifying a frame with zero for its minimum width and height, and infinity for its maximum width and height, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Please log in&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>minWidth<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> maxWidth<span class="token punctuation">:</span> <span class="token punctuation">.</span>infinity<span class="token punctuation">,</span> minHeight<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> maxHeight<span class="token punctuation">:</span> <span class="token punctuation">.</span>infinity<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>largeTitle<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">foregroundStyle</span><span class="token punctuation">(</span><span class="token punctuation">.</span>white<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token punctuation">.</span>red<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),t("blockquote",null,[t("p",null,[t("a",v,[n(c,{icon:"fas fa-file-zipper"}),a[1]||(a[1]=o("Download this as an Xcode project"))])])]),a[7]||(a[7]=t("figure",null,[t("img",{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-give-a-view-a-custom-frame-2~dark.png",alt:"A phone showing the words “Please log in” over a large red background.",tabindex:"0",loading:"lazy"}),t("figcaption",null,"A phone showing the words “Please log in” over a large red background.")],-1)),a[8]||(a[8]=t("div",{class:"hint-container note"},[t("p",{class:"hint-container-title"},"Note"),t("p",null,[o("if you want a view to go under the safe area, make sure you add the "),t("code",null,"ignoresSafeArea()"),o(" modifier.")])],-1)),t("details",b,[a[2]||(a[2]=t("summary",null,"Similar solutions…",-1)),n(s,i(e({title:"How to create and compose custom views | SwiftUI by Example",desc:"How to create and compose custom views",link:"/hackingwithswift.com/swiftui/how-to-create-and-compose-custom-views.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(s,i(e({title:"SwiftUI tips and tricks | SwiftUI by Example",desc:"SwiftUI tips and tricks",link:"/hackingwithswift.com/swiftui/swiftui-tips-and-tricks.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(s,i(e({title:"How to use Dynamic Type with a custom font | SwiftUI by Example",desc:"How to use Dynamic Type with a custom font",link:"/hackingwithswift.com/swiftui/how-to-use-dynamic-type-with-a-custom-font.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(s,i(e({title:"How to create a custom transition | SwiftUI by Example",desc:"How to create a custom transition",link:"/hackingwithswift.com/swiftui/how-to-create-a-custom-transition.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(s,i(e({title:"How to convert a SwiftUI view to an image | SwiftUI by Example",desc:"How to convert a SwiftUI view to an image",link:"/hackingwithswift.com/swiftui/how-to-convert-a-swiftui-view-to-an-image.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const S=u(f,[["render",y],["__file","how-to-give-a-view-a-custom-frame.html.vue"]]),q=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-give-a-view-a-custom-frame.html","title":"How to give a view a custom frame","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to give a view a custom frame","description":"Article(s) > How to give a view a custom frame","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to give a view a custom frame"},{"property":"og:description","content":"How to give a view a custom frame"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-give-a-view-a-custom-frame.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-give-a-view-a-custom-frame.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to give a view a custom frame"}],["meta",{"property":"og:description","content":"Article(s) > How to give a view a custom frame"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-give-a-view-a-custom-frame-1~dark.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to give a view a custom frame\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-give-a-view-a-custom-frame-1~dark.png\\",\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-give-a-view-a-custom-frame-2~dark.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"prev":"/hackingwithswift.com/swiftui/how-to-create-a-mesh-gradient.md"},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.96,"words":587},"filePathRelative":"hackingwithswift.com/swiftui/how-to-give-a-view-a-custom-frame.md","excerpt":"\\n"}');export{S as comp,q as data};