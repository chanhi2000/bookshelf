import{_ as h}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as t,as as c,ao as a,at as n,au as r,ak as o,aq as w,ar as d}from"./app-CpYYKbnj.js";const p={},u={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function b(s,e){const i=w("VPCard");return d(),l("div",null,[t("h1",u,[t("a",m,[t("span",null,c(s.$frontmatter.title)+" 관련",1)])]),a(i,n(r({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),a(i,n(r({title:"How to hide the tab bar when a view controller is shown | UIKit - free Swift example code",desc:"How to hide the tab bar when a view controller is shown",link:"https://hackingwithswift.com/example-code/uikit/how-to-hide-the-tab-bar-when-a-view-controller-is-shown",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 5.0")],-1)),o(" TODO: 작성 "),o("\nIf you’re using `UITabBarController` to display a tab strip at the bottom of your user interface, the default behavior for iOS is to display the tabs at all times – even if the user has navigated deep into a `UINavigationController` in one of the tabs.\n\nIf you don’t want that behavior, you should set `hidesBottomBarWhenPushed` to true where applicable. This will hide the tab bar along with any toolbars you had showing, but only when a view controller is pushed onto the navigation stack. This allows you to show the tab bar at first, then hide it when you need more room.\n\nIf you’re using segues, the best place to set this property is inside the `prepare(for:)` method, where you configure any other properties in your destination view controller:\n\n```swift\noverride func prepare(for segue: UIStoryboardSegue, sender: Any?) {\n    self.hidesBottomBarWhenPushed = true\n}\n```\n\nIf you aren’t using segues, you will usually need to override the initializer for your view controller and set `hidesBottomBarWhenPushed` to true there, like this:\n\n```swift\noverride init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {\n    super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)\n    hidesBottomBarWhenPushed = true\n}\n```\n\n"),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/how-to-hide-the-tab-bar-navigation-bar-or-other-toolbars">How to hide the tab bar, navigation bar, or other toolbars 
/example-code/uikit/how-do-you-show-a-modal-view-controller-when-a-uitabbarcontroller-tab-is-tapped">How do you show a modal view controller when a UITabBarController tab is tapped? 
/quick-start/swiftui/how-to-embed-views-in-a-tab-bar-using-tabview">How to embed views in a tab bar using TabView 
/quick-start/swiftui/how-to-run-an-asynchronous-task-when-a-view-is-shown">How to run an asynchronous task when a view is shown 
/quick-start/swiftui/how-to-control-which-navigationsplitview-column-is-shown-in-compact-layouts">How to control which NavigationSplitView column is shown in compact layouts</a>
`)],-1))])}const y=h(p,[["render",b],["__file","how-to-hide-the-tab-bar-when-a-view-controller-is-shown.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-hide-the-tab-bar-when-a-view-controller-is-shown.html","title":"How to hide the tab bar when a view controller is shown","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to hide the tab bar when a view controller is shown","description":"Article(s) > How to hide the tab bar when a view controller is shown","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-5.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to hide the tab bar when a view controller is shown"},{"property":"og:description","content":"How to hide the tab bar when a view controller is shown"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-hide-the-tab-bar-when-a-view-controller-is-shown.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-hide-the-tab-bar-when-a-view-controller-is-shown.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to hide the tab bar when a view controller is shown"}],["meta",{"property":"og:description","content":"Article(s) > How to hide the tab bar when a view controller is shown"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-5.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to hide the tab bar when a view controller is shown\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.72,"words":515},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-hide-the-tab-bar-when-a-view-controller-is-shown.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,v as data};