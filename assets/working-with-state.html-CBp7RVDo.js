import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as h,am as e,as as c,ao as o,at as a,au as n,al as l,aq as g,ar as w}from"./app-CpYYKbnj.js";const p={},m={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},d={class:"hint-container details"};function u(r,t){const i=g("VPCard");return w(),h("div",null,[e("h1",m,[e("a",f,[e("span",null,c(r.$frontmatter.title)+" 관련",1)])]),o(i,a(n({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[1]||(t[1]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[2]||(t[2]=e("hr",null,null,-1)),o(i,a(n({title:"Working with state | SwiftUI by Example",desc:"Working with state",link:"https://hackingwithswift.com/quick-start/swiftui/working-with-state",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t[3]||(t[3]=l("<blockquote><p>Updated for Xcode 15</p></blockquote><p>All apps change state. For example, the user might have tapped a button to reveal more information, they might have entered some text into a text box, or chosen a date from a date picker – all things that involve the app moving from one state to another.</p><p>The problem with state is that it&#39;s messy: when it changes we need to spot that change and update our layouts to match. That might sound simple at first, but as our state grows and grows it becomes increasingly hard – it&#39;s easy to forget to update one thing, or to get the update order wrong so that the user interface state doesn&#39;t match what was expected.</p><p>SwiftUI solves this problem by removing state from our control. When we add properties to our views they are effectively inert – they have values, sure, but changing them doesn&#39;t do anything. But if we added the special <code>@State</code> attribute before them, SwiftUI will automatically watch for changes and update any parts of our views that use that state.</p><p>When it comes to <em>referring</em> to some state – for example, telling a state property to change when a toggle switch changes – we can&#39;t refer to the property directly. This is because Swift would think we just want to read the value right now rather than saying “please also update this value as things change.” Fortunately, SwiftUI&#39;s solution is to place a dollar sign before the property name, which lets us refer to the underlying data binding rather than its current value. I know this is a little confusing at first, but it becomes second nature after an hour or two.</p><p>Remember, SwiftUI is <em>declarative</em>, which means we tell it all layouts for all possible states up front, and let it figure out how to move between them when properties change. We call this <em>binding</em> – asking SwiftUI to synchronize changes between a UI control and an underlying property.</p><p>Working with state will cause you a few headaches at first if you&#39;re used to a more imperative style of programming, but trust me – once you&#39;re through that it&#39;s clear sailing.</p>",7)),e("details",d,[t[0]||(t[0]=e("summary",null,"Similar solutions…",-1)),o(i,a(n({title:"Working with containers | SwiftUI by Example",desc:"Working with containers",link:"/hackingwithswift.com/swiftui/working-with-containers.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),o(i,a(n({title:"Working with presentations | SwiftUI by Example",desc:"Working with presentations",link:"/hackingwithswift.com/swiftui/working-with-presentations.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),o(i,a(n({title:"Working with forms | SwiftUI by Example",desc:"Working with forms",link:"/hackingwithswift.com/swiftui/working-with-forms.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),o(i,a(n({title:"Working with lists | SwiftUI by Example",desc:"Working with lists",link:"/hackingwithswift.com/swiftui/working-with-lists.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),o(i,a(n({title:"What's the difference between @ObservedObject, @State, and @EnvironmentObject? | SwiftUI by Example",desc:"What's the difference between @ObservedObject, @State, and @EnvironmentObject?",link:"/hackingwithswift.com/swiftui/whats-the-difference-between-observedobject-state-and-environmentobject.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const y=s(p,[["render",u],["__file","working-with-state.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/swiftui/working-with-state.html","title":"Working with state","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Working with state","description":"Article(s) > Working with state","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Working with state"},{"property":"og:description","content":"Working with state"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/working-with-state.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/working-with-state.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Working with state"}],["meta",{"property":"og:description","content":"Article(s) > Working with state"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Working with state\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]],"prev":"/hackingwithswift.com/swiftui/how-to-detect-whether-a-scrollview-is-currently-moving-or-is-idle.md"},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.09,"words":628},"filePathRelative":"hackingwithswift.com/swiftui/working-with-state.md","excerpt":"\\n"}');export{y as comp,v as data};