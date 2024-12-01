import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as t,t as c,e as a,n as i,g as r,a as e,r as p,o as m}from"./app-DLPYIRXq.js";const d={},u={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"},w=t("nav",{class:"table-of-contents"},[t("ul")],-1),g=t("hr",null,null,-1),y=t("blockquote",null,[t("p",null,"Available from iOS 7.0")],-1),f=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/libraries/how-to-preview-files-using-quick-look-and-qlpreviewcontroller">How to preview files using Quick Look and QLPreviewController 
/example-code/uikit/how-to-stop-empty-row-separators-appearing-in-uitableview">How to stop empty row separators appearing in UITableView 
/example-code/location/how-to-look-up-a-location-with-mklocalsearchrequest">How to look up a location with MKLocalSearch.Request 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/example-code/language/how-to-create-quick-look-debug-previews-for-your-custom-types">How to create Quick Look debug previews for your custom types</a>
`)],-1);function b(n,k){const o=p("VPCard");return m(),s("div",null,[t("h1",u,[t("a",h,[t("span",null,c(n.$frontmatter.title)+" 관련",1)])]),a(o,i(r({title:"Libraries - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/libraries/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,g,a(o,i(r({title:"How to make empty UITableViews look more attractive using DZNEmptyDataSet | Libraries - free Swift example code",desc:"How to make empty UITableViews look more attractive using DZNEmptyDataSet",link:"https://hackingwithswift.com/example-code/libraries/how-to-make-empty-uitableviews-look-more-attractive-using-dznemptydataset",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),y,e(" TODO: 작성 "),e(` 
If you use table views or collection views and you want to take one simple step to make your app both more attractive and more user-friendly, let me tell you what the pros do: we use \`DZNEmptyDataSet\`. This simple, free, open source library is designed to handle the case when your data source is empty by showing some prompt text, and optionally also a button or an image.

What I love about this library is that it's so astonishingly simple, and it even uses \`NSAttributedString\` so you can provide custom formatting.

First things first: <a href="https://github.com/dzenbot/DZNEmptyDataSet">go here and click Download Zip</a> to get the source code to \`DZNEmptyDataSet\`. Now unzip it, then look inside its Source folder for two files: **UIScrollView+EmptyDataSet.h** and **UIScrollView+EmptyDataSet.m**.

Drag these into your Xcode project, and Xcode should prompt you with the message "Would you like to configure an Objective-C bridging header?" Click "Creating Bridging Header" and you'll see a file called **YourProjectName-Bridging-Header.h** appear in your project. Open that file for editing in Xcode and give it this text:

\`\`\`swift
#import "UIScrollView+EmptyDataSet.h"
\`\`\`

This is required because \`DZNEmptyDataSet\` is written in Objective-C, so these steps are required to make it available to use in Swift.

Next, tell Swift that your current table view controller (or collection view controller) conforms to the \`DZNEmptyDataSetSource\` and \`DZNEmptyDataSetDelegate\` protocols like this:

\`\`\`swift
class ViewController: UITableViewController, DZNEmptyDataSetSource, DZNEmptyDataSetDelegate {
    // your view controller here
}
\`\`\`

You then need to add these three lines of code to your \`viewDidLoad()\` method:

\`\`\`swift
tableView.emptyDataSetSource = self
tableView.emptyDataSetDelegate = self
tableView.tableFooterView = UIView()
\`\`\`

The first two lines set your code up ready to provide various \`DZNEmptyDataSet\` elements; the third one is just there to make your interface cleaner.

One of the great things about \`DZNEmptyDataSet\` is that you only need to provide what you want. This means you can provide just a heading, or perhaps a heading and an image, or a heading, a description, an image and even a button. Even better, the button is made for you: all you need to do is tell \`DZNEmptyDataSet\` what its title should be.

The example code below sets up a title, a description, an image and a button, and even provides a response to the button being tapped. Remember: you don't need all these, just the ones you want to use in your app.

\`\`\`swift
func title(forEmptyDataSet scrollView: UIScrollView) -> NSAttributedString? {
    let str = "Welcome"
    let attrs = [NSAttributedString.Key.font: UIFont.preferredFont(forTextStyle: .headline)]
    return NSAttributedString(string: str, attributes: attrs)
}

func description(forEmptyDataSet scrollView: UIScrollView) -> NSAttributedString? {
    let str = "Tap the button below to add your first grokkleglob."
    let attrs = [NSAttributedString.Key.font: UIFont.preferredFont(forTextStyle: .body)]
    return NSAttributedString(string: str, attributes: attrs)
}

func image(forEmptyDataSet scrollView: UIScrollView) -> UIImage? {
    return UIImage(named: "taylor-swift")
}

func buttonTitle(forEmptyDataSet scrollView: UIScrollView, for state: UIControlState) -> NSAttributedString? {
    let str = "Add Grokkleglob"
    let attrs = [NSAttributedString.Key.font: UIFont.preferredFont(forTextStyle: .callout)]
    return NSAttributedString(string: str, attributes: attrs)
}

func emptyDataSet(_ scrollView: UIScrollView, didTap button: UIButton) {
    let ac = UIAlertController(title: "Button tapped!", message: nil, preferredStyle: .alert)
    ac.addAction(UIAlertAction(title: "Hurray", style: .default))
    present(ac, animated: true)
}
\`\`\`

`),f])}const D=l(d,[["render",b],["__file","how-to-make-empty-uitableviews-look-more-attractive-using-dznemptydataset.html.vue"]]),N=JSON.parse('{"path":"/hackingwithswift.com/example-code/libraries/how-to-make-empty-uitableviews-look-more-attractive-using-dznemptydataset.html","title":"How to make empty UITableViews look more attractive using DZNEmptyDataSet","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make empty UITableViews look more attractive using DZNEmptyDataSet","description":"Article(s) > How to make empty UITableViews look more attractive using DZNEmptyDataSet","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make empty UITableViews look more attractive using DZNEmptyDataSet"},{"property":"og:description","content":"How to make empty UITableViews look more attractive using DZNEmptyDataSet"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/libraries/how-to-make-empty-uitableviews-look-more-attractive-using-dznemptydataset.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/libraries/how-to-make-empty-uitableviews-look-more-attractive-using-dznemptydataset.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make empty UITableViews look more attractive using DZNEmptyDataSet"}],["meta",{"property":"og:description","content":"Article(s) > How to make empty UITableViews look more attractive using DZNEmptyDataSet"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make empty UITableViews look more attractive using DZNEmptyDataSet\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.66,"words":797},"filePathRelative":"hackingwithswift.com/example-code/libraries/how-to-make-empty-uitableviews-look-more-attractive-using-dznemptydataset.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{D as comp,N as data};
