import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as w,f as t,av as h,au as n,aw as a,ax as r,b as i,r as l,o as p}from"./app-CgstJRjh.js";const d={},u={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function g(s,e){const o=l("VPCard");return p(),w("div",null,[t("h1",u,[t("a",m,[t("span",null,h(s.$frontmatter.title)+" 관련",1)])]),n(o,a(r({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),n(o,a(r({title:"How to use UIActivityIndicatorView to show a spinner when work is happening | UIKit - free Swift example code",desc:"How to use UIActivityIndicatorView to show a spinner when work is happening",link:"https://hackingwithswift.com/example-code/uikit/how-to-use-uiactivityindicatorview-to-show-a-spinner-when-work-is-happening",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 5.0")],-1)),i(" TODO: 작성 "),i(`
If you need a simple visual way to show users that some activity is happening, \`UIActivityIndicatorView\` is the easiest approach. In fact, if you create a dedicated activity indicator view controller, you can cause the whole screen to dim without much code.

To try it out, create a new Cocoa Touch Class called SpinnerViewController, then give it this code:

import UIKit

\`\`\`swift
class SpinnerViewController: UIViewController {
    var spinner = UIActivityIndicatorView(style: .whiteLarge)

    override func loadView() {
        view = UIView()
        view.backgroundColor = UIColor(white: 0, alpha: 0.7)

        spinner.translatesAutoresizingMaskIntoConstraints = false
        spinner.startAnimating()
        view.addSubview(spinner)

        spinner.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        spinner.centerYAnchor.constraint(equalTo: view.centerYAnchor).isActive = true
    }
}
\`\`\`

You can now use view controller containment to embed that inside your current view controller so that it disables your controls. Something like this ought to be enough to get you started:

\`\`\`swift
func createSpinnerView() {
    let child = SpinnerViewController()

    // add the spinner view controller
    addChild(child)
    child.view.frame = view.frame
    view.addSubview(child.view)
    child.didMove(toParent: self)

    // wait two seconds to simulate some work happening
    DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
        // then remove the spinner view controller
        child.willMove(toParent: nil)
        child.view.removeFromSuperview()
        child.removeFromParent()
    }
}
\`\`\`

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),i(`
/quick-start/swiftui/how-to-configure-core-data-to-work-with-swiftui">How to configure Core Data to work with SwiftUI 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/how-to-show-a-map-view">How to show a Map view 
/example-code/language/how-to-detect-when-the-system-is-under-pressure-and-you-should-reduce-your-work">How to detect when the system is under pressure and you should reduce your work 
/quick-start/swiftui/how-to-show-annotations-in-a-map-view">How to show annotations in a Map view</a>
`)],-1))])}const y=c(d,[["render",g],["__file","how-to-use-uiactivityindicatorview-to-show-a-spinner-when-work-is-happening.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-use-uiactivityindicatorview-to-show-a-spinner-when-work-is-happening.html","title":"How to use UIActivityIndicatorView to show a spinner when work is happening","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to use UIActivityIndicatorView to show a spinner when work is happening","description":"Article(s) > How to use UIActivityIndicatorView to show a spinner when work is happening","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-5.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to use UIActivityIndicatorView to show a spinner when work is happening"},{"property":"og:description","content":"How to use UIActivityIndicatorView to show a spinner when work is happening"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-use-uiactivityindicatorview-to-show-a-spinner-when-work-is-happening.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-use-uiactivityindicatorview-to-show-a-spinner-when-work-is-happening.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to use UIActivityIndicatorView to show a spinner when work is happening"}],["meta",{"property":"og:description","content":"Article(s) > How to use UIActivityIndicatorView to show a spinner when work is happening"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-5.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to use UIActivityIndicatorView to show a spinner when work is happening\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.58,"words":474},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-use-uiactivityindicatorview-to-show-a-spinner-when-work-is-happening.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,k as data};
