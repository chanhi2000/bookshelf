import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as e,as as h,ao as a,at as n,au as s,ak as o,aq as d,ar as u}from"./app-gTf-Epb-.js";const p={},m={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"};function g(l,t){const r=d("VPCard");return u(),c("div",null,[e("h1",m,[e("a",w,[e("span",null,h(l.$frontmatter.title)+" 관련",1)])]),a(r,n(s({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),a(r,n(s({title:"How to use UISearchController to let users enter search words | UIKit - free Swift example code",desc:"How to use UISearchController to let users enter search words",link:"https://hackingwithswift.com/example-code/uikit/how-to-use-uisearchcontroller-to-let-users-enter-search-words",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),o(" TODO: 작성 "),o(`
\`UISearchController\` is a small component designed to make it easy and consistent to add searching to any view controller. Adding it only takes a few small steps: 

1. Embed your view controller in a navigation controller.
2. Add a conformance to \`UISearchResultsUpdating\`.
3. Create the search controller and assign it to your view controller.
4. Implement its sole required method: \`updateSearchResults()\`.

Let’s go through them here. First, open Main.storyboard, select your view controller, then embed it in a navigation controller – go to the Editor menu and choose Embed In > Navigation Controller.

Second, modify your view controller’s definition so that it includes a conformance for \`UISearchResultsUpdating\`.

Third, add some code to \`viewDidLoad()\` to create the search controller and assign it to the current view controller. The search controller actually belongs as a property of the navigation item of the view controller, which automatically places it inside your navigation bar when the view controller is displayed.

\`\`\`swift
let search = UISearchController(searchResultsController: nil)
search.searchResultsUpdater = self
search.obscuresBackgroundDuringPresentation = false
search.searchBar.placeholder = "Type something here to search"
navigationItem.searchController = search
\`\`\`

Finally, implement the \`updateSearchResults()\` method to update your search results. This method gets called every time the user types anything into the search bar, so it’s your job to use their new text to filter your data however you want:

\`\`\`swift
func updateSearchResults(for searchController: UISearchController) {
    guard let text = searchController.searchBar.text else { return }
    print(text)
}
\`\`\`

That’s it!

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/how-to-add-search-tokens-to-a-search-field">How to add search tokens to a search field 
/example-code/naturallanguage/how-to-find-similar-words-for-a-search-term">How to find similar words for a search term 
/quick-start/concurrency/how-to-call-an-async-function-using-async-let">How to call an async function using async let 
/example-code/uikit/how-to-add-scopes-to-a-uisearchcontroller">How to add scopes to a UISearchController 
/example-code/uikit/how-to-stop-your-uisearchcontroller-bar-hiding-when-you-scroll">How to stop your UISearchController bar hiding when you scroll</a>
`)],-1))])}const k=i(p,[["render",g],["__file","how-to-use-uisearchcontroller-to-let-users-enter-search-words.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-use-uisearchcontroller-to-let-users-enter-search-words.html","title":"How to use UISearchController to let users enter search words","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to use UISearchController to let users enter search words","description":"Article(s) > How to use UISearchController to let users enter search words","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to use UISearchController to let users enter search words"},{"property":"og:description","content":"How to use UISearchController to let users enter search words"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-use-uisearchcontroller-to-let-users-enter-search-words.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-use-uisearchcontroller-to-let-users-enter-search-words.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to use UISearchController to let users enter search words"}],["meta",{"property":"og:description","content":"Article(s) > How to use UISearchController to let users enter search words"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to use UISearchController to let users enter search words\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.74,"words":523},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-use-uisearchcontroller-to-let-users-enter-search-words.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,S as data};
