import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as w,am as n,as as d,ao as s,at as e,au as i,al as l,an as c,aq as p,ar as h}from"./app-CpYYKbnj.js";const g={},m={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},k={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-scale-a-view-up-or-down-1.zip",target:"_blank",rel:"noopener noreferrer"},v={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-scale-a-view-up-or-down-2.zip",target:"_blank",rel:"noopener noreferrer"},b={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-scale-a-view-up-or-down-3.zip",target:"_blank",rel:"noopener noreferrer"},y={class:"hint-container details"};function x(r,t){const a=p("VPCard"),o=p("FontIcon");return h(),w("div",null,[n("h1",m,[n("a",f,[n("span",null,d(r.$frontmatter.title)+" 관련",1)])]),s(a,e(i({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[4]||(t[4]=n("nav",{class:"table-of-contents"},[n("ul")],-1)),t[5]||(t[5]=n("hr",null,null,-1)),s(a,e(i({title:"How to scale a view up or down | SwiftUI by Example",desc:"How to scale a view up or down",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-scale-a-view-up-or-down",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t[6]||(t[6]=l(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>SwiftUI’s <code>scaleEffect()</code> modifier lets us increase or decrease the size of a view freely.</p><p>For example, we could make a text view five times its regular size like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Up we go&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">scaleEffect</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">300</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">300</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),n("blockquote",null,[n("p",null,[n("a",k,[s(o,{icon:"fas fa-file-zipper"}),t[0]||(t[0]=c("Download this as an Xcode project"))])])]),t[7]||(t[7]=l(`<figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-scale-a-view-up-or-down-1~dark@2x.png" alt="The large, slightly blurry text “Up we go”." tabindex="0" loading="lazy"><figcaption>The large, slightly blurry text “Up we go”.</figcaption></figure><p>You can scale the X and Y dimensions independently if you want, allowing you to squash views like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Up we go&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">scaleEffect</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">300</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">300</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),n("blockquote",null,[n("p",null,[n("a",v,[s(o,{icon:"fas fa-file-zipper"}),t[1]||(t[1]=c("Download this as an Xcode project"))])])]),t[8]||(t[8]=l(`<figure><img src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-scale-a-view-up-or-down-2~dark@2x.png" alt="The text “Up we go” stretched vertically." tabindex="0" loading="lazy"><figcaption>The text “Up we go” stretched vertically.</figcaption></figure><p>If you want more control, you can specify an anchor for your scaling like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Up we go&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">scaleEffect</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> anchor<span class="token punctuation">:</span> <span class="token punctuation">.</span>bottomTrailing<span class="token punctuation">)</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Up we go&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),n("blockquote",null,[n("p",null,[n("a",b,[s(o,{icon:"fas fa-file-zipper"}),t[2]||(t[2]=c("Download this as an Xcode project"))])])]),t[9]||(t[9]=n("figure",null,[n("img",{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-scale-a-view-up-or-down-3~dark@2x.png",alt:"Two lines, both reading “Up we go”. The upper line is both larger and offset to the left such that the lines' trailing edges align.",tabindex:"0",loading:"lazy"}),n("figcaption",null,"Two lines, both reading “Up we go”. The upper line is both larger and offset to the left such that the lines' trailing edges align.")],-1)),t[10]||(t[10]=n("p",null,"That makes the text view twice its regular size, scaled from the bottom-right corner.",-1)),t[11]||(t[11]=n("div",{class:"hint-container tip"},[n("p",{class:"hint-container-title"},"Tips"),n("p",null,"Scaling up a view won’t cause it to be redrawn at its new size, only stretched up or down. This means small text will look fuzzy, and small images might look pixellated or blurry.")],-1)),n("details",y,[t[3]||(t[3]=n("summary",null,"Similar solutions…",-1)),s(a,e(i({title:"SwiftUI tips and tricks | SwiftUI by Example",desc:"SwiftUI tips and tricks",link:"/hackingwithswift.com/swiftui/swiftui-tips-and-tricks.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(a,e(i({title:"How to convert a SwiftUI view to an image | SwiftUI by Example",desc:"How to convert a SwiftUI view to an image",link:"/hackingwithswift.com/swiftui/how-to-convert-a-swiftui-view-to-an-image.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(a,e(i({title:"How to make a view dismiss itself | SwiftUI by Example",desc:"How to make a view dismiss itself",link:"/hackingwithswift.com/swiftui/how-to-make-a-view-dismiss-itself.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(a,e(i({title:"How to create and compose custom views | SwiftUI by Example",desc:"How to create and compose custom views",link:"/hackingwithswift.com/swiftui/how-to-create-and-compose-custom-views.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(a,e(i({title:"What's the difference between @ObservedObject, @State, and @EnvironmentObject? | SwiftUI by Example",desc:"What's the difference between @ObservedObject, @State, and @EnvironmentObject?",link:"/hackingwithswift.com/swiftui/whats-the-difference-between-observedobject-state-and-environmentobject.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const S=u(g,[["render",x],["__file","how-to-scale-a-view-up-or-down.html.vue"]]),T=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-scale-a-view-up-or-down.html","title":"How to scale a view up or down","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to scale a view up or down","description":"Article(s) > How to scale a view up or down","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to scale a view up or down"},{"property":"og:description","content":"How to scale a view up or down"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-scale-a-view-up-or-down.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-scale-a-view-up-or-down.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to scale a view up or down"}],["meta",{"property":"og:description","content":"Article(s) > How to scale a view up or down"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-scale-a-view-up-or-down-1~dark@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to scale a view up or down\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-scale-a-view-up-or-down-1~dark@2x.png\\",\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-scale-a-view-up-or-down-2~dark@2x.png\\",\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-scale-a-view-up-or-down-3~dark@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.15,"words":645},"filePathRelative":"hackingwithswift.com/swiftui/how-to-scale-a-view-up-or-down.md","excerpt":"\\n"}');export{S as comp,T as data};