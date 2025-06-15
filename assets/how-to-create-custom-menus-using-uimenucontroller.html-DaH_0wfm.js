import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as u,f as e,av as c,au as i,aw as r,ax as a,b as o,r as m,o as p}from"./app-BGkQLgjR.js";const h={},d={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"};function g(s,t){const n=m("VPCard");return p(),u("div",null,[e("h1",d,[e("a",w,[e("span",null,c(s.$frontmatter.title)+" 관련",1)])]),i(n,r(a({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),i(n,r(a({title:"How to create custom menus using UIMenuController | UIKit - free Swift example code",desc:"How to create custom menus using UIMenuController",link:"https://hackingwithswift.com/example-code/uikit/how-to-create-custom-menus-using-uimenucontroller",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 3.0")],-1)),o(" TODO: 작성 "),o(`
iOS has a built-in menu system that, while *useful*, doesn't actually get much *use* – because users don't expect to see it, developers don't use it, thus making it even less likely that users expect to see it.

Anyway, if you want to attach multiple actions to elements in your UI – pieces of text in a text view or web view, table view rows, and so on – you might find iOS menus are for you, so you need to turn to \`UIMenuController\`. This has extremely simple API: you just create a \`UIMenuItem\` object for every action you want, then register them all and wait for the user to do something.

Below is a complete example for a view controller that has a web view inside it – you'll need to create that in your storyboard. The code sets up a new menu item named "Grok" that runs the \`runGrok()\` method when tapped. I've made it do something real: when the user selects some text, they tap Grok to have that printed out to the Xcode console.

Here's the code:

\`\`\`swift
class ViewController: UIViewController, UITextViewDelegate {
    @IBOutlet var webView: UIWebView!

    override func viewDidLoad() {
        super.viewDidLoad()

        webView.loadHTMLString("<p>Hello, world!</p>", baseURL: nil)
        enableCustomMenu()
    }

    func enableCustomMenu() {
        let lookup = UIMenuItem(title: "Grok", action: #selector(runGrok))
        UIMenuController.shared.menuItems = [lookup]
    }

    func disableCustomMenu() {
        UIMenuController.shared.menuItems = nil
    }

    @objc func runGrok() {
        let text = webView.stringByEvaluatingJavaScript(from: "window.getSelection().toString();")
        print(text)
    }
}
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/uikit/how-to-create-popover-menus-using-uipopoverpresentationcontroller">How to create popover menus using UIPopoverPresentationController 
/quick-start/swiftui/how-to-create-multi-column-lists-using-table">How to create multi-column lists using Table 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/concurrency/how-to-use-mainactor-to-run-code-on-the-main-queue">How to use @MainActor to run code on the main queue 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared</a>
`)],-1))])}const k=l(h,[["render",g],["__file","how-to-create-custom-menus-using-uimenucontroller.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-create-custom-menus-using-uimenucontroller.html","title":"How to create custom menus using UIMenuController","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to create custom menus using UIMenuController","description":"Article(s) > How to create custom menus using UIMenuController","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-3.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to create custom menus using UIMenuController"},{"property":"og:description","content":"How to create custom menus using UIMenuController"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-create-custom-menus-using-uimenucontroller.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-create-custom-menus-using-uimenucontroller.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to create custom menus using UIMenuController"}],["meta",{"property":"og:description","content":"Article(s) > How to create custom menus using UIMenuController"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-3.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to create custom menus using UIMenuController\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.61,"words":483},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-create-custom-menus-using-uimenucontroller.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,b as data};
