import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as m,am as n,as as k,ao as a,at as e,au as i,al as p,an as c,aq as o,ar as w}from"./app-CpYYKbnj.js";const h={},v={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},g={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-make-a-view-dismiss-itself-1.zip",target:"_blank",rel:"noopener noreferrer"},b={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-make-a-view-dismiss-itself-2.zip",target:"_blank",rel:"noopener noreferrer"},y={class:"hint-container details"};function S(r,s){const t=o("VPCard"),l=o("FontIcon"),u=o("VidStack");return w(),m("div",null,[n("h1",v,[n("a",f,[n("span",null,k(r.$frontmatter.title)+" 관련",1)])]),a(t,e(i({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),s[3]||(s[3]=n("nav",{class:"table-of-contents"},[n("ul")],-1)),s[4]||(s[4]=n("hr",null,null,-1)),a(t,e(i({title:"How to make a view dismiss itself | SwiftUI by Example",desc:"How to make a view dismiss itself",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-make-a-view-dismiss-itself",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s[5]||(s[5]=p(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>When you show a SwiftUI view using a sheet, it’s common to want to dismiss that view when something happens – when the user taps on a button, for example. There are two ways of solving this in SwiftUI, and I’m going to show you both so you can decide which suits your needs.</p><p>The first option is to tell the view to dismiss itself using its presentation mode environment key. Any view can dismiss itself, regardless of how it was presented, using <code>@Environment(\\.dismiss)</code>, and calling that property as a function will cause the view to be dismissed.</p><p>For example, we could create a detail view that is able to dismiss itself using its presentation mode environment key, and present that from <code>ContentView</code>;</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">DismissingView1</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@Environment</span><span class="token punctuation">(</span><span class="token punctuation">\\</span><span class="token punctuation">.</span>dismiss<span class="token punctuation">)</span> <span class="token keyword">var</span> dismiss</span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Button</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Dismiss Me&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">dismiss</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> showingDetail <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Button</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Show Detail&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            showingDetail <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">sheet</span><span class="token punctuation">(</span>isPresented<span class="token punctuation">:</span> $showingDetail<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">DismissingView1</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)),n("blockquote",null,[n("p",null,[n("a",g,[a(l,{icon:"fas fa-file-zipper"}),s[0]||(s[0]=c("Download this as an Xcode project"))])])]),a(u,{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-make-a-view-dismiss-itself-1~dark.mp4"}),s[6]||(s[6]=p(`<p>The other option is to pass a binding into the view that was shown, so it can changing the binding’s value back to false. You still need to have some sort of state property in your presenting view, but now you pass that <em>into</em> the detail view as a binding.</p><p>Using this approach, the detail view settings its binding to false also updates the state in the original view, causing the detail view to dismiss – both the detail view and original view point to the same Boolean value, so changing one changes it in the other place too.</p><p>Here’s that in code:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">DismissingView2</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@Binding</span> <span class="token keyword">var</span> isPresented<span class="token punctuation">:</span> <span class="token class-name">Bool</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Button</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Dismiss Me&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            isPresented <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> showingDetail <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Button</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Show Detail&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            showingDetail <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">sheet</span><span class="token punctuation">(</span>isPresented<span class="token punctuation">:</span> $showingDetail<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">DismissingView2</span><span class="token punctuation">(</span>isPresented<span class="token punctuation">:</span> $showingDetail<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),n("blockquote",null,[n("p",null,[n("a",b,[a(l,{icon:"fas fa-file-zipper"}),s[1]||(s[1]=c("Download this as an Xcode project"))])])]),n("details",y,[s[2]||(s[2]=n("summary",null,"Similar solutions…",-1)),a(t,e(i({title:"How to dismiss the keyboard for a TextField | SwiftUI by Example",desc:"How to dismiss the keyboard for a TextField",link:"/hackingwithswift.com/swiftui/how-to-dismiss-the-keyboard-for-a-textfield.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"How to dismiss the keyboard when the user scrolls | SwiftUI by Example",desc:"How to dismiss the keyboard when the user scrolls",link:"/hackingwithswift.com/swiftui/how-to-dismiss-the-keyboard-when-the-user-scrolls.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"SwiftUI tips and tricks | SwiftUI by Example",desc:"SwiftUI tips and tricks",link:"/hackingwithswift.com/swiftui/swiftui-tips-and-tricks.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"How to convert a SwiftUI view to an image | SwiftUI by Example",desc:"How to convert a SwiftUI view to an image",link:"/hackingwithswift.com/swiftui/how-to-convert-a-swiftui-view-to-an-image.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(t,e(i({title:"How to create and compose custom views | SwiftUI by Example",desc:"How to create and compose custom views",link:"/hackingwithswift.com/swiftui/how-to-create-and-compose-custom-views.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const D=d(h,[["render",S],["__file","how-to-make-a-view-dismiss-itself.html.vue"]]),H=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-make-a-view-dismiss-itself.html","title":"How to make a view dismiss itself","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make a view dismiss itself","description":"Article(s) > How to make a view dismiss itself","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make a view dismiss itself"},{"property":"og:description","content":"How to make a view dismiss itself"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-make-a-view-dismiss-itself.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-make-a-view-dismiss-itself.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make a view dismiss itself"}],["meta",{"property":"og:description","content":"Article(s) > How to make a view dismiss itself"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make a view dismiss itself\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.34,"words":702},"filePathRelative":"hackingwithswift.com/swiftui/how-to-make-a-view-dismiss-itself.md","excerpt":"\\n"}');export{D as comp,H as data};