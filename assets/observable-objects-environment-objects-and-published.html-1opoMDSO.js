import{_ as h}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as t,as as w,ao as n,at as a,au as i,al as r,an as o,aq as l,ar as m}from"./app-CpYYKbnj.js";const b={},f={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},v={class:"hint-container details"},k={class:"hint-container details"};function y(p,e){const s=l("VPCard"),d=l("VidStack"),c=l("FontIcon");return m(),u("div",null,[t("h1",f,[t("a",g,[t("span",null,w(p.$frontmatter.title)+" 관련",1)])]),n(s,a(i({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[12]||(e[12]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[13]||(e[13]=t("hr",null,null,-1)),n(s,a(i({title:"Observable objects, environment objects, and @Published | SwiftUI by Example",desc:"Observable objects, environment objects, and @Published",link:"https://hackingwithswift.com/quick-start/swiftui/observable-objects-environment-objects-and-published",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e[14]||(e[14]=t("blockquote",null,[t("p",null,"Updated for Xcode 15")],-1)),n(d,{src:"youtube/lxaEAHNmhY4"}),e[15]||(e[15]=r("<p>We want to let folks place an order for pick up by selecting items and adding them to a cart. I already gave you a dedicated <code>Order</code> class that holds an array of items, so we&#39;re going to add items to that then show them in a dedicated order view.</p><p>But there&#39;s a catch: if we&#39;re adding things inside <code>ItemDetail</code>, how can we show them in an entirely separate <code>OrderView</code>? More importantly, how can we make sure both of these two update each other as things change?</p><p>Well, SwiftUI has a quite brilliant solution called <em>environment objects</em>. These are objects that our views can use freely, but don&#39;t create or manage – they get created elsewhere, and carry on existing after the view has gone away.</p><p>In this app, we&#39;re going to create an instance of our order when the app launches, then pass it into our content view. Any view that is inside that content view – anything that can call the content view its ancestor – will automatically gain access to that environment object. Even better, when any view changes it, all other places automatically update.</p>",4)),t("p",null,[e[0]||(e[0]=o("Let's try it out now. Open your ")),n(c,{icon:"fa-brands fa-swift"}),e[1]||(e[1]=t("code",null,"iDineApp.swift",-1)),e[2]||(e[2]=o(", which is where our initial instance of ")),e[3]||(e[3]=t("code",null,"ContentView",-1)),e[4]||(e[4]=o(" is created. Now give it this property:"))]),e[16]||(e[16]=r(`<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@StateObject</span> <span class="token keyword">var</span> order <span class="token operator">=</span> <span class="token class-name">Order</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>Tip</strong>: Xcode will shown an error when you add that line, which is okay – we&#39;ll fix it in a moment.</p><p>That creates a new order when the app starts, and keeps it alive regardless of what view we show. The <code>@StateObject</code> property wrapper is responsible for keeping the object alive throughout the life of our app.</p><p>Now we can pass that into our <code>ContentView</code> struct when it gets created – look for this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">WindowGroup</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">ContentView</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>And replace it with this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">WindowGroup</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">ContentView</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">environmentObject</span><span class="token punctuation">(</span>order<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now, I said that Xcode would throw up an error when we used the <code>@StateObject</code> property – something along the lines of “Argument type &#39;Order&#39; does not conform to expected type &#39;ObservableObject&#39;”.</p><p>What it means is that SwiftUI doesn&#39;t understand how its user interface is supposed to watch our <code>Order</code> class for changes – it doesn&#39;t understand how it should send and receive notifications that the data changed.</p><p>Think about it: if we select some food from the menu and add it to our order, we want that to appear immediately on the order page – we don&#39;t want to have hit refresh, or wait a few seconds, we want it <em>immediately</em>. And for that to work, SwiftUI needs a standard way for objects like <code>Order</code> to say “hey, if anyone is watching me, you should know my data just changed.”</p><p>This standard already exists, and it&#39;s the <code>ObservableObject</code> protocol. Anything that conforms to <code>ObservableObject</code> can be used inside SwiftUI, and publish announcements when its values have changed so the user interface can be updated.</p><p>Apple provides a couple of different ways of publishing change announcements, but the easiest is to use the <code>@Published</code> property wrapper before any properties that should trigger change notifications. In this case, just placing <code>@Published</code> before a property is enough to have it update any SwiftUI views that are watching for changes – it&#39;s really powerful!</p>`,12)),t("p",null,[e[5]||(e[5]=o("So, open ")),n(c,{icon:"fa-brands fa-swift"}),e[6]||(e[6]=t("code",null,"Order.swift",-1)),e[7]||(e[7]=o(" and change the ")),e[8]||(e[8]=t("code",null,"items",-1)),e[9]||(e[9]=o(" property to this:"))]),e[17]||(e[17]=r(`<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@Published</span> <span class="token keyword">var</span> items <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token class-name">MenuItem</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>And that&#39;s it! Now that our class is configured correctly, we can make it conform to <code>ObservableObject</code>, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Order</span><span class="token punctuation">:</span> <span class="token class-name">ObservableObject</span> <span class="token punctuation">{</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>…and our code is back to compiling again. In total, we have updated <code>Order</code> so it knows how to announce changes to any views that are watching, we have told the <code>items</code> array that whenever it changes it should send out such an announcement, we have created an instance of the <code>Order</code> object in our main app, and we have placed it into the SwiftUI environment for other views to use – nice!</p>`,4)),t("details",v,[e[10]||(e[10]=t("summary",null,"Further reading",-1)),n(s,a(i({title:"How to use @EnvironmentObject to share data between views | SwiftUI by Example",desc:"How to use @EnvironmentObject to share data between views",link:"/hackingwithswift.com/swiftui/how-to-use-environmentobject-to-share-data-between-views.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(s,a(i({title:"What's the difference between @ObservedObject, @State, and @EnvironmentObject? | SwiftUI by Example",desc:"What's the difference between @ObservedObject, @State, and @EnvironmentObject?",link:"/hackingwithswift.com/swiftui/whats-the-difference-between-observedobject-state-and-environmentobject.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)]),t("details",k,[e[11]||(e[11]=t("summary",null,"Similar solutions…",-1)),n(s,a(i({title:"What is the @Published property wrapper? | SwiftUI by Example",desc:"What is the @Published property wrapper?",link:"/hackingwithswift.com/swiftui/what-is-the-published-property-wrapper.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(s,a(i({title:"All SwiftUI property wrappers explained and compared | SwiftUI by Example",desc:"All SwiftUI property wrappers explained and compared",link:"/hackingwithswift.com/swiftui/all-swiftui-property-wrappers-explained-and-compared.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(s,a(i({title:"SwiftUI tips and tricks | SwiftUI by Example",desc:"SwiftUI tips and tricks",link:"/hackingwithswift.com/swiftui/swiftui-tips-and-tricks.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(s,a(i({title:"What is the @Environment property wrapper? | SwiftUI by Example",desc:"What is the @Environment property wrapper?",link:"/hackingwithswift.com/swiftui/what-is-the-environment-property-wrapper.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),n(s,a(i({title:"How to use Instruments to profile your SwiftUI code and identify slow layouts | SwiftUI by Example",desc:"How to use Instruments to profile your SwiftUI code and identify slow layouts",link:"/hackingwithswift.com/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const S=h(b,[["render",y],["__file","observable-objects-environment-objects-and-published.html.vue"]]),I=JSON.parse('{"path":"/hackingwithswift.com/swiftui/observable-objects-environment-objects-and-published.html","title":"Observable objects, environment objects, and @Published","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Observable objects, environment objects, and @Published","description":"Article(s) > Observable objects, environment objects, and @Published","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Observable objects, environment objects, and @Published"},{"property":"og:description","content":"Observable objects, environment objects, and @Published"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/observable-objects-environment-objects-and-published.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/observable-objects-environment-objects-and-published.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Observable objects, environment objects, and @Published"}],["meta",{"property":"og:description","content":"Article(s) > Observable objects, environment objects, and @Published"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Observable objects, environment objects, and @Published\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.61,"words":1084},"filePathRelative":"hackingwithswift.com/swiftui/observable-objects-environment-objects-and-published.md","excerpt":"\\n"}');export{S as comp,I as data};