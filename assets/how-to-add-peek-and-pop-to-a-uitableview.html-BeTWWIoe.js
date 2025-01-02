import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as d,am as e,as as c,ao as a,at as n,au as r,ak as o,aq as p,ar as w}from"./app-CpYYKbnj.js";const h={},u={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function g(l,t){const i=p("VPCard");return w(),d("div",null,[e("h1",u,[e("a",m,[e("span",null,c(l.$frontmatter.title)+" 관련",1)])]),a(i,n(r({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),a(i,n(r({title:"How to add peek and pop to a UITableView | UIKit - free Swift example code",desc:"How to add peek and pop to a UITableView",link:"https://hackingwithswift.com/example-code/uikit/how-to-add-peek-and-pop-to-a-uitableview",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 9.0")],-1)),o(" TODO: 작성 "),o(`
Peek and pop are features of 3D Touch that let users press hard on something to show more information. It’s surprisingly easy to add when working with table view cells and collection view cells, and downright trivial if you use storyboards and segues.

First, the trivial case: if you’re using storyboards and segues, Xcode can do all the work for you. If you want to see how easy it is, create a new iOS app using the Master-Detail project template, then open Main.storyboard. Find the Show Detail segue that moves from the table view to the detail view, then check the box marked “Preview & Commit Segues” in the attributes inspector.

That’s it: iOS will automatically make peek and pop code for that segue – you can press hard on a table view cell to bring up the detail controller as a preview, then press harder to make it full screen. (Note: if you’re using the simulator this isn’t easy to do – try using a real device!)

If you’re *not* using segues you need to write some code yourself. First, make your view controller conform to \`UIViewControllerPreviewingDelegate\` so that you’re able to respond to previewing requests correctly. Second, you need to tell the system we want to support previewing by calling \`registerForPreviewing()\` in your \`viewDidLoad()\` method:

\`\`\`swift
registerForPreviewing(with: self, sourceView: yourTableView)
\`\`\`

That tells iOS that the view controller is able to respond to previewing requests for your table view.

There are two methods you need to fill in for the \`UIViewControllerPreviewingDelegate\` protocol: which view controller should be shown when the user presses at a certain location, and when the user presses harder how do you want to present it.

For many apps the code to create a previewing detail controller will be the same code to create a regular detail view controller, so it’s a good idea to create a method to instantiate a detail view controller and configure it as needed.

For example, you might have something like this:

\`\`\`swift
func detailViewController(for index: Int) -> DetailViewController {
    guard let vc = storyboard?.instantiateViewController(withIdentifier: "Detail") as? DetailViewController else {
        fatalError("Couldn't load detail view controller")
    }

    vc.selectedItem = index
    return vc
}
\`\`\`

You would then have something like this inside your \`didSelectRowAt\` method:

\`\`\`swift
override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    let vc = detailViewController(for: indexPath.row)
    navigationController?.pushViewController(vc, animated: true)
}
\`\`\`

Now for the important part: filling in the peek and pop methods.

You need to write a \`viewControllerForLocation\` method, which gets called with whatever location on the screen the user touched. You can pass that straight to the table view to ask it what row is at that location, then tell the previewing context to use that row as its source rect – iOS will cause that row to zoom up while the others get blurred. Finally you can return the correct view controller, but if no cell was tapped you need to return \`nil\` instead so that no 3D Touch effect happens.

Here’s how that looks in code:

\`\`\`swift
func previewingContext(_ previewingContext: UIViewControllerPreviewing, viewControllerForLocation location: CGPoint) -> UIViewController? {
    if let indexPath = yourTableView.indexPathForRow(at: location) {
        previewingContext.sourceRect = yourTableView.rectForRow(at: indexPath)
        return detailViewController(for: indexPath.row)
    }

    return nil
}
\`\`\`

As for the pop effect, that’s just one line of code inside a \`commit\` method. You’ll be given the view controller that’s currently being peeked, so your method just needs to decide how to present it. For example, if you’re using a navigation controller you probably want to call \`pushViewController()\` here – iOS will automatically convert that into a pop zoom animation with bounce effect, but the end result will be a pushed view controller so you can go back like normal.

Here’s that in Swift:

\`\`\`swift
func previewingContext(_ previewingContext: UIViewControllerPreviewing, commit viewControllerToCommit: UIViewController) {
    navigationController?.pushViewController(viewControllerToCommit, animated: true)
}
\`\`\`

That’s all the code – it’s not really that hard to do, and UIKit makes the result look great.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/example-code/uikit/how-to-localize-your-ios-app">How to localize your iOS app</a>
`)],-1))])}const y=s(h,[["render",g],["__file","how-to-add-peek-and-pop-to-a-uitableview.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-add-peek-and-pop-to-a-uitableview.html","title":"How to add peek and pop to a UITableView","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to add peek and pop to a UITableView","description":"Article(s) > How to add peek and pop to a UITableView","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-9.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to add peek and pop to a UITableView"},{"property":"og:description","content":"How to add peek and pop to a UITableView"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-add-peek-and-pop-to-a-uitableview.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-add-peek-and-pop-to-a-uitableview.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to add peek and pop to a UITableView"}],["meta",{"property":"og:description","content":"Article(s) > How to add peek and pop to a UITableView"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-9.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to add peek and pop to a UITableView\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.07,"words":920},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-add-peek-and-pop-to-a-uitableview.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,k as data};
