import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as t,as as l,ao as s,at as e,au as o,al as r,aq as d,ar as u}from"./app-CpYYKbnj.js";const w={},h={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"},g={class:"hint-container details"};function f(i,a){const n=d("VPCard");return u(),c("div",null,[t("h1",h,[t("a",m,[t("span",null,l(i.$frontmatter.title)+" 관련",1)])]),s(n,e(o({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a[1]||(a[1]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),a[2]||(a[2]=t("hr",null,null,-1)),s(n,e(o({title:"How to add an AppDelegate to a SwiftUI app | SwiftUI by Example",desc:"How to add an AppDelegate to a SwiftUI app",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-add-an-appdelegate-to-a-swiftui-app",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a[3]||(a[3]=r(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>SwiftUI apps launch using a custom struct that conforms to the <code>App</code> protocol, but sometimes you might want to get back the old <code>UIApplicationDelegate</code> functionality we used to have – perhaps to handle registration for push notifications, to respond to memory warnings, to detect time changes, and so on.</p><p>To do this, first create a custom class that inherits from <code>NSObject</code> and conforms to the <code>UIApplicationDelegate</code> protocol, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">AppDelegate</span><span class="token punctuation">:</span> <span class="token class-name">NSObject</span><span class="token punctuation">,</span> <span class="token class-name">UIApplicationDelegate</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">application</span><span class="token punctuation">(</span><span class="token omit keyword">_</span> application<span class="token punctuation">:</span> <span class="token class-name">UIApplication</span><span class="token punctuation">,</span> didFinishLaunchingWithOptions launchOptions<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">UIApplication</span><span class="token punctuation">.</span><span class="token class-name">LaunchOptionsKey</span> <span class="token punctuation">:</span> <span class="token keyword">Any</span><span class="token punctuation">]</span><span class="token operator">?</span> <span class="token operator">=</span> <span class="token nil constant">nil</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Bool</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Your code here&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>I&#39;ve added <code>didFinishLaunchingWithOptions</code> in there, but you only need to implement the methods you care about.</p><p>And now in your <code>App</code> scene, use the <code>UIApplicationDelegateAdaptor</code> property wrapper to tell SwiftUI it should use your <code>AppDelegate</code> class for the application delegate.</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@main</span></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">NewIn14App</span><span class="token punctuation">:</span> <span class="token class-name">App</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@UIApplicationDelegateAdaptor</span><span class="token punctuation">(</span><span class="token class-name">AppDelegate</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token keyword">var</span> appDelegate</span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">Scene</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">WindowGroup</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">ContentView</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SwiftUI is responsible for creating that delegate and looking after its lifetime, so you can go ahead and add any other app delegate functionality to that class to have it called.</p><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>For push notifications, you should probably adjust the <code>delegate</code> property of <code>UNUserNotificationCenter.current()</code> so that it points to a custom class you own.</p></div>`,9)),t("details",g,[a[0]||(a[0]=t("summary",null,"Similar solutions…",-1)),s(n,e(o({title:"How to add in-app purchases in SwiftUI | SwiftUI by Example",desc:"How to add in-app purchases in SwiftUI",link:"/hackingwithswift.com/swiftui/how-to-add-in-app-purchases-in-swiftui.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(n,e(o({title:"How to add Metal shaders to SwiftUI views using layer effects | SwiftUI by Example",desc:"How to add Metal shaders to SwiftUI views using layer effects",link:"/hackingwithswift.com/swiftui/how-to-add-metal-shaders-to-swiftui-views-using-layer-effects.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(n,e(o({title:"How to create a document-based app using FileDocument and DocumentGroup | SwiftUI by Example",desc:"How to create a document-based app using FileDocument and DocumentGroup",link:"/hackingwithswift.com/swiftui/how-to-create-a-document-based-app-using-filedocument-and-documentgroup.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(n,e(o({title:"How to add Core Data objects from SwiftUI views | SwiftUI by Example",desc:"How to add Core Data objects from SwiftUI views",link:"/hackingwithswift.com/swiftui/how-to-add-core-data-objects-from-swiftui-views.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s(n,e(o({title:"How to detect when your app moves to the background or foreground with scenePhase | SwiftUI by Example",desc:"How to detect when your app moves to the background or foreground with scenePhase",link:"/hackingwithswift.com/swiftui/how-to-detect-when-your-app-moves-to-the-background-or-foreground-with-scenephase.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const v=p(w,[["render",f],["__file","how-to-add-an-appdelegate-to-a-swiftui-app.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-add-an-appdelegate-to-a-swiftui-app.html","title":"How to add an AppDelegate to a SwiftUI app","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to add an AppDelegate to a SwiftUI app","description":"Article(s) > How to add an AppDelegate to a SwiftUI app","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to add an AppDelegate to a SwiftUI app"},{"property":"og:description","content":"How to add an AppDelegate to a SwiftUI app"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-add-an-appdelegate-to-a-swiftui-app.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-add-an-appdelegate-to-a-swiftui-app.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to add an AppDelegate to a SwiftUI app"}],["meta",{"property":"og:description","content":"Article(s) > How to add an AppDelegate to a SwiftUI app"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to add an AppDelegate to a SwiftUI app\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.01,"words":602},"filePathRelative":"hackingwithswift.com/swiftui/how-to-add-an-appdelegate-to-a-swiftui-app.md","excerpt":"\\n"}');export{v as comp,y as data};