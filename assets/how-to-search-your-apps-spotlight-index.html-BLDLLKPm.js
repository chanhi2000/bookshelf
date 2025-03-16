import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,f as e,av as h,au as r,aw as n,ax as i,b as o,r as p,o as u}from"./app-TfhzDSA_.js";const d={},m={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function w(s,t){const a=p("VPCard");return u(),l("div",null,[e("h1",m,[e("a",g,[e("span",null,h(s.$frontmatter.title)+" 관련",1)])]),r(a,n(i({title:"Libraries - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/libraries/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),r(a,n(i({title:"How to search your app’s Spotlight index | Libraries - free Swift example code",desc:"How to search your app’s Spotlight index",link:"https://hackingwithswift.com/example-code/libraries/how-to-search-your-apps-spotlight-index",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 10.0")],-1)),o(" TODO: 작성 "),o(` 
If you choose to index your app’s content using Spotlight (and you should), you can then use more Core Spotlight code to search your own index from inside your app.

All the work is done using the \`CSSearchQuery\` class, which works asynchronously. You need to give it two closures to work with: one to call when it finds a matching item (which should append the item to a results array), and one to call when the search finishes, at which point you should update your UI with the search results.

\`CSSearchQuery\` works similarly to Core Data – it even has the same approach to specifying search criteria. In this example we’re going to search for \`"contentDescription == \\"*\\(text)*\\"c"\`, which means “find things that have a \`contentDescription\` value equal to any text, followed by our search text, then any text, using case-insensitive matching.

There are a few more things you need to know before I show you the code:

1. Running a \`CSSearchQuery\` returns \`CSSearchableItem\` items, so we need to an array to store that data type.
<li>We’ll be taking advantage of closure capturing to share that array between the “found items” closure and the “search is finished” handler.
<li>Your closures can be called on any thread, so as you usually manipulate the UI when the search finishes you should push that work to the main thread.
<li>You need to explicitly call \`start()\` on the search to make it begin.
<li>In case a user types really fast, we want to a way to cancel the existing search before starting a new one. To make that happen, it’s a good idea to store the \`CSSearchQuery\` object as a property in the class, then call \`cancel()\` on it before searching.

To try out the code below, add \`import CoreSpotlight\` to a view controller’s class, then give it a \`CSSearchQuery?\` property called \`searchQuery\`.

Now add this method:

\`\`\`swift
func runSearch(text: String) {
    var allItems = [CSSearchableItem]()

    searchQuery?.cancel()

    let queryString = "contentDescription == \\"*\\(text)*\\"c"
    searchQuery = CSSearchQuery(queryString: queryString, attributes: nil)

    searchQuery?.foundItemsHandler = { items in
        allItems.append(contentsOf: items)
    }

    searchQuery?.completionHandler = { error in
        DispatchQueue.main.async { [unowned self] in
            self.updateUI(matches: allItems)
        }
    }

    searchQuery?.start()
}
\`\`\`

You’ll need to implement \`updateUI()\` to do something with your search results, such as updating a table view.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/system/how-to-use-core-spotlight-to-index-content-in-your-app">How to use Core Spotlight to index content in your app 
/quick-start/swiftui/how-to-add-search-tokens-to-a-search-field">How to add search tokens to a search field 
/example-code/system/how-to-run-code-when-your-app-is-terminated">How to run code when your app is terminated 
/example-code/uikit/how-to-use-uisearchcontroller-to-let-users-enter-search-words">How to use UISearchController to let users enter search words 
/example-code/uikit/how-to-localize-your-ios-app">How to localize your iOS app</a>
`)],-1))])}const S=c(d,[["render",w],["__file","how-to-search-your-apps-spotlight-index.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/example-code/libraries/how-to-search-your-apps-spotlight-index.html","title":"How to search your app’s Spotlight index","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to search your app’s Spotlight index","description":"Article(s) > How to search your app’s Spotlight index","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-10.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to search your app’s Spotlight index"},{"property":"og:description","content":"How to search your app’s Spotlight index"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/libraries/how-to-search-your-apps-spotlight-index.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/libraries/how-to-search-your-apps-spotlight-index.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to search your app’s Spotlight index"}],["meta",{"property":"og:description","content":"Article(s) > How to search your app’s Spotlight index"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-10.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to search your app’s Spotlight index\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.18,"words":655},"filePathRelative":"hackingwithswift.com/example-code/libraries/how-to-search-your-apps-spotlight-index.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{S as comp,x as data};
