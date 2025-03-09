import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,f as e,av as g,au as n,aw as a,ax as i,b as o,r as p,o as w}from"./app-D4PYVeBp.js";const u={},f={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"};function d(l,t){const r=p("VPCard");return w(),s("div",null,[e("h1",f,[e("a",h,[e("span",null,g(l.$frontmatter.title)+" 관련",1)])]),n(r,a(i({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(r,a(i({title:"How to create a page curl effect using UIPageViewController | UIKit - free Swift example code",desc:"How to create a page curl effect using UIPageViewController",link:"https://hackingwithswift.com/example-code/uikit/how-to-create-a-page-curl-effect-using-uipageviewcontroller",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 5.0")],-1)),o(" TODO: 작성 "),o(`
When iBooks first launched in iOS 3.2, its page curl effect was almost addictive: it moved so fluently with your finger that it felt you were touching real paper. From iOS 5.0 on this page curl effect is available for every developer as part of the \`UIPageViewController\` class. Its API isn't immediately obvious to newbies, though, so I'm going to give you a complete example.

In the code below, the page view controller is created in \`viewDidLoad()\`. I also create five \`UIViewControllers\` to serve as pages inside the app, then tell the page view controller to start with the first one. I put in a couple of helper methods so that the view controllers could have random background colors so you can see it all working.

Most of the work is done by the \`viewControllerBefore\` and \`viewControllerAfter\` methods, which must either return a view controller to show before or after the current one (when the users starts to turn the page) or \`nil\` to mean the user is at the end and there are no more pages to show in that direction.

To make this work in your own app, you'll obviously want to replace the plain view controller pages with your own \`UIViewController\` subclass that does something more interesting. If you're showing quite a few different pages, you should probably create them on demand rather than creating an array of them all up front.

Anyway, here is the complete example – you can use this with the Xcode "Single View App” to get a page view controller up and running immediately:

\`\`\`swift
import UIKit

class ViewController: UIViewController, UIPageViewControllerDataSource, UIPageViewControllerDelegate {
    var pageController: UIPageViewController!
    var controllers = [UIViewController]()

    override func viewDidLoad() {
        super.viewDidLoad()

        pageController = UIPageViewController(transitionStyle: .pageCurl, navigationOrientation: .horizontal, options: nil)
        pageController.dataSource = self
        pageController.delegate = self

        addChild(pageController)
        view.addSubview(pageController.view)

        let views = ["pageController": pageController.view] as [String: AnyObject]
        view.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|[pageController]|", options: [], metrics: nil, views: views))
        view.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:|[pageController]|", options: [], metrics: nil, views: views))

        for _ in 1 ... 5 {
            let vc = UIViewController()
            vc.view.backgroundColor = randomColor()
            controllers.append(vc)
        }

        pageController.setViewControllers([controllers[0]], direction: .forward, animated: false)
    }

    func pageViewController(_ pageViewController: UIPageViewController, viewControllerBefore viewController: UIViewController) -> UIViewController? {
        if let index = controllers.firstIndex(of: viewController) {
            if index > 0 {
                return controllers[index - 1]
            } else {
                return nil
            }
        }

        return nil
    }

    func pageViewController(_ pageViewController: UIPageViewController, viewControllerAfter viewController: UIViewController) -> UIViewController? {
        if let index = controllers.firstIndex(of: viewController) {
            if index < controllers.count - 1 {
                return controllers[index + 1]
            } else {
                return nil
            }
        }

        return nil
    }

    func randomCGFloat() -> CGFloat {
        return CGFloat(arc4random()) / CGFloat(UInt32.max)
    }

    func randomColor() -> UIColor {
        return UIColor(red: randomCGFloat(), green: randomCGFloat(), blue: randomCGFloat(), alpha: 1)
    }
}
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/wkwebview/how-to-monitor-wkwebview-page-load-progress-using-key-value-observing">How to monitor WKWebView page load progress using key-value observing 
/quick-start/swiftui/how-to-enable-vertical-page-scrolling">How to enable vertical page scrolling 
/example-code/calayer/how-to-create-a-marching-ants-effect-using-linedashphase">How to create a marching ants effect using lineDashPhase 
/quick-start/swiftui/how-to-create-a-marching-ants-border-effect">How to create a marching ants border effect 
/example-code/libraries/how-to-get-a-cover-flow-effect-on-ios">How to get a Cover Flow effect on iOS</a>
`)],-1))])}const C=c(u,[["render",d],["__file","how-to-create-a-page-curl-effect-using-uipageviewcontroller.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-create-a-page-curl-effect-using-uipageviewcontroller.html","title":"How to create a page curl effect using UIPageViewController","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to create a page curl effect using UIPageViewController","description":"Article(s) > How to create a page curl effect using UIPageViewController","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-5.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to create a page curl effect using UIPageViewController"},{"property":"og:description","content":"How to create a page curl effect using UIPageViewController"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-create-a-page-curl-effect-using-uipageviewcontroller.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-create-a-page-curl-effect-using-uipageviewcontroller.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to create a page curl effect using UIPageViewController"}],["meta",{"property":"og:description","content":"Article(s) > How to create a page curl effect using UIPageViewController"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-5.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to create a page curl effect using UIPageViewController\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.34,"words":702},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-create-a-page-curl-effect-using-uipageviewcontroller.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{C as comp,y as data};
