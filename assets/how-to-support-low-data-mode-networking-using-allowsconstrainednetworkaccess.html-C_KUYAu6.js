import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as t,as as w,ao as n,at as r,au as s,ak as o,aq as d,ar as p}from"./app-CpYYKbnj.js";const g={},m={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"};function h(i,e){const a=d("VPCard");return p(),c("div",null,[t("h1",m,[t("a",u,[t("span",null,w(i.$frontmatter.title)+" 관련",1)])]),n(a,r(s({title:"Networking - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/networking/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),n(a,r(s({title:"How to support low data mode networking using allowsConstrainedNetworkAccess | Networking - free Swift example code",desc:"How to support low data mode networking using allowsConstrainedNetworkAccess",link:"https://hackingwithswift.com/example-code/networking/how-to-support-low-data-mode-networking-using-allowsconstrainednetworkaccess",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 13.0")],-1)),o(" TODO: 작성 "),o(" \niOS lets users enable Low Data Mode for any cellular or WiFi connection, which signals to apps that they should be careful how much data they use. This might mean downloading lower-resolution images, it might mean disabling prefetching, or some other way of cutting down on bandwidth use.\n\nBy default your app does not honor the user’s low data mode setting, but you can change that by setting the `allowsConstrainedNetworkAccess` property to false for a given `URLRequest`. For example:\n\n```swift\nvar request = URLRequest(url: someURL)\nrequest.allowsConstrainedNetworkAccess = false\n```\n\nWhen that request executes iOS will immediately return an error if low data mode is enabled, which might be your cue to do another request for less data or lower-resolution images, for example. You can detect this error by typecasting it to a `URLError`, then checking if the `networkUnavailableReason` property is set to `.constrained`:\n\n```swift\nif let error = error as? URLError, error.networkUnavailableReason == .constrained {\n    // user has activated low data mode so this request could not be satisfied\n}\n```\n\n**Tip:** There is a similarly named `URLSession` property called `allowsExpensiveNetworkAccess`, which determines whether network requests can be made over a personal hotspot. It’s considered expensive because often users on cellular networks have lower data caps, but broadly speaking you should prefer working with low data mode because it gives users control.\n\n"),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/example-code/system/how-to-detect-low-power-mode-is-enabled">How to detect low power mode is enabled 
/quick-start/swiftui/how-to-support-drag-and-drop-in-swiftui">How to support drag and drop in SwiftUI 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/quick-start/swiftui/how-to-detect-dark-mode">How to detect dark mode 
/example-code/uikit/how-to-support-right-to-left-languages">How to support right-to-left languages</a>
`)],-1))])}const y=l(g,[["render",h],["__file","how-to-support-low-data-mode-networking-using-allowsconstrainednetworkaccess.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/networking/how-to-support-low-data-mode-networking-using-allowsconstrainednetworkaccess.html","title":"How to support low data mode networking using allowsConstrainedNetworkAccess","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to support low data mode networking using allowsConstrainedNetworkAccess","description":"Article(s) > How to support low data mode networking using allowsConstrainedNetworkAccess","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to support low data mode networking using allowsConstrainedNetworkAccess"},{"property":"og:description","content":"How to support low data mode networking using allowsConstrainedNetworkAccess"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/networking/how-to-support-low-data-mode-networking-using-allowsconstrainednetworkaccess.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/networking/how-to-support-low-data-mode-networking-using-allowsconstrainednetworkaccess.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to support low data mode networking using allowsConstrainedNetworkAccess"}],["meta",{"property":"og:description","content":"Article(s) > How to support low data mode networking using allowsConstrainedNetworkAccess"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-10-19T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to support low data mode networking using allowsConstrainedNetworkAccess\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-19T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-10-19T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.61,"words":482},"filePathRelative":"hackingwithswift.com/example-code/networking/how-to-support-low-data-mode-networking-using-allowsconstrainednetworkaccess.md","localizedDate":"2019년 10월 19일","excerpt":"\\n"}');export{y as comp,b as data};