import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as h,am as t,as as w,ao as e,at as o,au as s,al as m,an as i,aq as r,ar as u}from"./app-CpYYKbnj.js";const g={},k={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},d={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-mask-one-view-with-another-1.zip",target:"_blank",rel:"noopener noreferrer"},v={class:"hint-container details"};function b(c,n){const a=r("VPCard"),p=r("FontIcon");return u(),h("div",null,[t("h1",k,[t("a",f,[t("span",null,w(c.$frontmatter.title)+" 관련",1)])]),e(a,o(s({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[2]||(n[2]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),n[3]||(n[3]=t("hr",null,null,-1)),e(a,o(s({title:"How to mask one view with another | SwiftUI by Example",desc:"How to mask one view with another",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-mask-one-view-with-another",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n[4]||(n[4]=m(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>SwiftUI gives us the <code>mask()</code> modifier for masking one with another, which means you can mask an image using text or an image using an image, or more.</p><p>For example, this creates a 300x300 image of stripes, then masks it using the text “SWIFT!” so that the letters act as a cut out for the image:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;laser-show&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">resizable</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">300</span><span class="token punctuation">,</span> height<span class="token punctuation">:</span> <span class="token number">300</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">mask</span><span class="token punctuation">(</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SWIFT!&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token function">system</span><span class="token punctuation">(</span>size<span class="token punctuation">:</span> <span class="token number">72</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),t("blockquote",null,[t("p",null,[t("a",d,[e(p,{icon:"fas fa-file-zipper"}),n[0]||(n[0]=i("Download this as an Xcode project"))])])]),n[5]||(n[5]=t("figure",null,[t("img",{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-mask-one-view-with-another-1~dark@2x.png",alt:"The text “SWIFT!” forms a mask through which we can see a laser show.",tabindex:"0",loading:"lazy"}),t("figcaption",null,"The text “SWIFT!” forms a mask through which we can see a laser show.")],-1)),n[6]||(n[6]=t("p",null,[i("The "),t("code",null,"mask()"),i(" modifier is different from "),t("code",null,"clipShape()"),i(", because it also applies any transparency from the masking view – you get to have holes in your underlying view based on the transparency of your mask. On the other hand, "),t("code",null,"clipShape()"),i(" only adjusts the outside shape of the view you apply it to.")],-1)),t("details",v,[n[1]||(n[1]=t("summary",null,"Similar solutions…",-1)),e(a,o(s({title:"How to synchronize animations from one view to another with matchedGeometryEffect() | SwiftUI by Example",desc:"How to synchronize animations from one view to another with matchedGeometryEffect()",link:"/hackingwithswift.com/swiftui/how-to-synchronize-animations-from-one-view-to-another-with-matchedgeometryeffect.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e(a,o(s({title:"How to force one gesture to recognize before another using highPriorityGesture() | SwiftUI by Example",desc:"How to force one gesture to recognize before another using highPriorityGesture()",link:"/hackingwithswift.com/swiftui/how-to-force-one-gesture-to-recognize-before-another-using-highprioritygesture.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e(a,o(s({title:"SwiftUI tips and tricks | SwiftUI by Example",desc:"SwiftUI tips and tricks",link:"/hackingwithswift.com/swiftui/swiftui-tips-and-tricks.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e(a,o(s({title:"How to recommend another app using appStoreOverlay() | SwiftUI by Example",desc:"How to recommend another app using appStoreOverlay()",link:"/hackingwithswift.com/swiftui/how-to-recommend-another-app-using-appstoreoverlay.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e(a,o(s({title:"How to force views to one side inside a stack using Spacer | SwiftUI by Example",desc:"How to force views to one side inside a stack using Spacer",link:"/hackingwithswift.com/swiftui/how-to-force-views-to-one-side-inside-a-stack-using-spacer.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const S=l(g,[["render",b],["__file","how-to-mask-one-view-with-another.html.vue"]]),H=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-mask-one-view-with-another.html","title":"How to mask one view with another","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to mask one view with another","description":"Article(s) > How to mask one view with another","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to mask one view with another"},{"property":"og:description","content":"How to mask one view with another"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-mask-one-view-with-another.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-mask-one-view-with-another.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to mask one view with another"}],["meta",{"property":"og:description","content":"Article(s) > How to mask one view with another"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-mask-one-view-with-another-1~dark@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to mask one view with another\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-mask-one-view-with-another-1~dark@2x.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.77,"words":532},"filePathRelative":"hackingwithswift.com/swiftui/how-to-mask-one-view-with-another.md","excerpt":"\\n"}');export{S as comp,H as data};