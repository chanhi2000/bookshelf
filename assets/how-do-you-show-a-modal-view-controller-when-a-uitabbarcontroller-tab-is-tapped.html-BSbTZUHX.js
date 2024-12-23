import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as t,as as p,ao as r,at as n,au as i,ak as o,aq as w,ar as d}from"./app-CVhcaaOv.js";const h={},u={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function b(l,e){const a=w("VPCard");return d(),c("div",null,[t("h1",u,[t("a",m,[t("span",null,p(l.$frontmatter.title)+" 관련",1)])]),r(a,n(i({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),r(a,n(i({title:"How do you show a modal view controller when a UITabBarController tab is tapped? | UIKit - free Swift example code",desc:"How do you show a modal view controller when a UITabBarController tab is tapped?",link:"https://hackingwithswift.com/example-code/uikit/how-do-you-show-a-modal-view-controller-when-a-uitabbarcontroller-tab-is-tapped",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 7.0")],-1)),o(" TODO: 작성 "),o(`
Usually tapping a tab in a \`UITabBar\` shows that tab, but it's often the case that you want to override that behavior, for example to show a view modally. If you're using one of Xcode's built-in storyboard templates for creating your user interface, it's not immediately obvious how to do this, but fortunately it's not so hard using the approach below.

First, find the \`viewDidLoad()\` method for your initial view controller – whichever one is shown first in your app. Now add this code to it:

\`\`\`swift
self.tabBarController?.delegate = UIApplication.shared.delegate as? UITabBarControllerDelegate
\`\`\`

That sets up your application delegate (in <FontIcon icon="fa-brands fa-swift"/>\`AppDelegate.swift\`) to handle events from the tab bar controller. This line uses optionals safely, so it will do nothing if you change your app structure later.

Now open <FontIcon icon="fa-brands fa-swift"/>\`AppDelegate.swift\`, and add \`UITabBarControllerDelegate\` to the list of protocols your app delegate conforms to, like this:

\`\`\`swift
class AppDelegate: UIResponder, UIApplicationDelegate, UITabBarControllerDelegate {
\`\`\`

Finally, you should implement the \`shouldSelect\` method on your app delegate, which must return true or false depending on whether you want the regular tab behavior (return true) or your own (return false).

In the example below, I want the regular view controller behavior for all tabs unless the user is trying to show one with the class \`YourViewController\`. When that happens, I'll create a new view controller and show it modally instead:

\`\`\`swift
func tabBarController(_ tabBarController: UITabBarController, shouldSelect viewController: UIViewController) -> Bool {
    if viewController is YourViewController {
        if let newVC = tabBarController.storyboard?.instantiateViewController(withIdentifier: "YourVCStoryboardIdentifier") {
            tabBarController.present(newVC, animated: true)
            return false
        }
    }

    return true
}
\`\`\`

There are two things to note about that code. First, you'll need to give your view controller a storyboard identifier so that \`instantiateViewController(withIdentifier:)\` will work. Second, this won't have any extra performance impact on your code – the view that would have been shown wasn't created yet, so creating a new one here won't be duplicating any work.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/example-code/system/how-to-run-code-when-your-app-is-terminated">How to run code when your app is terminated 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/quick-start/swiftui/how-to-embed-views-in-a-tab-bar-using-tabview">How to embed views in a tab bar using TabView 
/example-code/uikit/how-to-localize-your-ios-app">How to localize your iOS app</a>
`)],-1))])}const y=s(h,[["render",b],["__file","how-do-you-show-a-modal-view-controller-when-a-uitabbarcontroller-tab-is-tapped.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-do-you-show-a-modal-view-controller-when-a-uitabbarcontroller-tab-is-tapped.html","title":"How do you show a modal view controller when a UITabBarController tab is tapped?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How do you show a modal view controller when a UITabBarController tab is tapped?","description":"Article(s) > How do you show a modal view controller when a UITabBarController tab is tapped?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How do you show a modal view controller when a UITabBarController tab is tapped?"},{"property":"og:description","content":"How do you show a modal view controller when a UITabBarController tab is tapped?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-do-you-show-a-modal-view-controller-when-a-uitabbarcontroller-tab-is-tapped.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-do-you-show-a-modal-view-controller-when-a-uitabbarcontroller-tab-is-tapped.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How do you show a modal view controller when a UITabBarController tab is tapped?"}],["meta",{"property":"og:description","content":"Article(s) > How do you show a modal view controller when a UITabBarController tab is tapped?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How do you show a modal view controller when a UITabBarController tab is tapped?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.13,"words":639},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-do-you-show-a-modal-view-controller-when-a-uitabbarcontroller-tab-is-tapped.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,v as data};
