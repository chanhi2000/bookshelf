import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as e,as as d,ao as a,at as n,au as o,an as i,ap as h,al as f,aq as r,ar as w}from"./app-CpYYKbnj.js";const m={},g={id:"frontmatter-title-관련",tabindex:"-1"},k={class:"header-anchor",href:"#frontmatter-title-관련"},y={class:"hint-container details"};function b(c,t){const s=r("VPCard"),l=r("RouteLink");return w(),u("div",null,[e("h1",g,[e("a",k,[e("span",null,d(c.$frontmatter.title)+" 관련",1)])]),a(s,n(o({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[4]||(t[4]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[5]||(t[5]=e("hr",null,null,-1)),a(s,n(o({title:"How to filter Core Data fetch requests using a predicate | SwiftUI by Example",desc:"How to filter Core Data fetch requests using a predicate",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-filter-core-data-fetch-requests-using-a-predicate",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t[6]||(t[6]=e("blockquote",null,[e("p",null,"Updated for Xcode 15")],-1)),t[7]||(t[7]=e("p",null,[i("Core Data fetch requests can use predicates in SwiftUI just like they can with UIKit, all by providing a "),e("code",null,"predicate"),i(" property to your "),e("code",null,"@FetchRequest"),i(" property wrapper.")],-1)),e("p",null,[t[1]||(t[1]=i("If you followed my ")),a(l,{to:"/hackingwithswift.com/swiftui/how-to-configure-core-data-to-work-with-swiftui.html"},{default:h(()=>t[0]||(t[0]=[i("Core Data and SwiftUI set up instructions")])),_:1}),t[2]||(t[2]=i(", you’ve already injected your managed object context into the SwiftUI environment."))]),t[8]||(t[8]=f(`<p>Once that’s done, you can create a fetch request for one of your entities, passing in one or more sort descriptors and a predicate. These predicates are the same instances of <code>NSPredicate</code> that you would use without SwiftUI, which means you can use the same variety of string operations you would normally use.</p><p>For example, using the example data from my setup instructions we could create a predicate like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">NSPredicate</span><span class="token punctuation">(</span>format<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;name == %@&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;Python&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>That will show details about Python, while ignoring other data.</p><p>We could use that inside a fetch request like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@FetchRequest</span><span class="token punctuation">(</span></span>
<span class="line">    sortDescriptors<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">SortDescriptor</span><span class="token punctuation">(</span><span class="token punctuation">\\</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    predicate<span class="token punctuation">:</span> <span class="token class-name">NSPredicate</span><span class="token punctuation">(</span>format<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;name == %@&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;Python&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span> <span class="token keyword">var</span> languages<span class="token punctuation">:</span> <span class="token class-name">FetchedResults</span><span class="token operator">&lt;</span><span class="token class-name">ProgrammingLanguage</span><span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Because <code>@FetchRequest</code> uses standard Core Data predicates, you can create compound predicates too.</p>`,7)),e("details",y,[t[3]||(t[3]=e("summary",null,"Similar solutions…",-1)),a(s,n(o({title:"How to create a Core Data fetch request using @FetchRequest | SwiftUI by Example",desc:"How to create a Core Data fetch request using @FetchRequest",link:"/hackingwithswift.com/swiftui/how-to-create-a-core-data-fetch-request-using-fetchrequest.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(s,n(o({title:"How to limit the number of items in a fetch request | SwiftUI by Example",desc:"How to limit the number of items in a fetch request",link:"/hackingwithswift.com/swiftui/how-to-limit-the-number-of-items-in-a-fetch-request.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(s,n(o({title:"How to add a search bar to filter your data | SwiftUI by Example",desc:"How to add a search bar to filter your data",link:"/hackingwithswift.com/swiftui/how-to-add-a-search-bar-to-filter-your-data.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(s,n(o({title:"All SwiftUI property wrappers explained and compared | SwiftUI by Example",desc:"All SwiftUI property wrappers explained and compared",link:"/hackingwithswift.com/swiftui/all-swiftui-property-wrappers-explained-and-compared.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(s,n(o({title:"How to configure Core Data to work with SwiftUI | SwiftUI by Example",desc:"How to configure Core Data to work with SwiftUI",link:"/hackingwithswift.com/swiftui/how-to-configure-core-data-to-work-with-swiftui.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const S=p(m,[["render",b],["__file","how-to-filter-core-data-fetch-requests-using-a-predicate.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-filter-core-data-fetch-requests-using-a-predicate.html","title":"How to filter Core Data fetch requests using a predicate","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to filter Core Data fetch requests using a predicate","description":"Article(s) > How to filter Core Data fetch requests using a predicate","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to filter Core Data fetch requests using a predicate"},{"property":"og:description","content":"How to filter Core Data fetch requests using a predicate"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-filter-core-data-fetch-requests-using-a-predicate.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-filter-core-data-fetch-requests-using-a-predicate.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to filter Core Data fetch requests using a predicate"}],["meta",{"property":"og:description","content":"Article(s) > How to filter Core Data fetch requests using a predicate"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to filter Core Data fetch requests using a predicate\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.92,"words":575},"filePathRelative":"hackingwithswift.com/swiftui/how-to-filter-core-data-fetch-requests-using-a-predicate.md","excerpt":"\\n"}');export{S as comp,x as data};