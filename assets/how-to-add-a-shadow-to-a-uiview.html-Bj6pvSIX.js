import{_ as w}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as t,as as h,ao as o,at as n,au as s,ak as a,aq as r,ar as u}from"./app-CpYYKbnj.js";const p={},m={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"};function g(d,e){const i=r("VPCard"),l=r("VidStack");return u(),c("div",null,[t("h1",m,[t("a",f,[t("span",null,h(d.$frontmatter.title)+" 관련",1)])]),o(i,n(s({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),o(i,n(s({title:"How to add a shadow to a UIView | UIKit - free Swift example code",desc:"How to add a shadow to a UIView",link:"https://hackingwithswift.com/example-code/uikit/how-to-add-a-shadow-to-a-uiview",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 3.2")],-1)),o(l,{src:"youtube/pwaaU3hyPfk"}),a(" TODO: 작성 "),a("\niOS can dynamically generate shadows for any `UIView`, and these shadows automatically adjust to fit the shape of the item in question – even following the curves of text inside a `UILabel`. This functionality is built right in, so all you need to do is configure its properties, and there are four you need to care about:\n\n- `shadowColor` sets the color of the shadow, and needs to be a `CGColor`.\n<li>`shadowOpacity` sets how transparent the shadow is, where 0 is invisible and 1 is as strong as possible.\n<li>`shadowOffset` sets how far away from the view the shadow should be, to give a 3D offset effect.\n<li>`shadowRadius` sets how wide the shadow should be.\n\nHere's a simple example to get you started:\n\n```swift\nlet yourView = UIView()\nyourView.layer.shadowColor = UIColor.black.cgColor\nyourView.layer.shadowOpacity = 1\nyourView.layer.shadowOffset = .zero\nyourView.layer.shadowRadius = 10\n```\n\nBe warned: generating shadows dynamically is expensive, because iOS has to draw the shadow around the exact shape of your view's contents. If you can, set the `shadowPath` property to a specific value so that iOS doesn't need to calculate transparency dynamically. For example, this creates a shadow path equivalent to the frame of the view:\n\n```swift\nyourView.layer.shadowPath = UIBezierPath(rect: yourView.bounds).cgPath\n```\n\nAlternatively, ask iOS to cache the rendered shadow so that it doesn't need to be redrawn:\n\n```swift\nyourView.layer.shouldRasterize = true\n```\n\nIf you want to go down the rasterization route, you should make sure iOS caches the shadow at the same drawing scale as the main screen, otherwise it will look pixelated:\n\n```swift\nyourView.layer.rasterizationScale = UIScreen.main.scale\n```\n\n"),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),a(`
/quick-start/swiftui/how-to-draw-a-shadow-around-a-view">How to draw a shadow around a view 
/example-code/uikit/how-to-mask-one-uiview-using-another-uiview">How to mask one UIView using another UIView 
/example-code/calayer/how-to-add-a-border-outline-color-to-a-uiview">How to add a border outline color to a UIView 
/example-code/calayer/how-to-make-a-uiview-fade-out">How to make a UIView fade out 
/quick-start/swiftui/how-to-wrap-a-custom-uiview-for-swiftui">How to wrap a custom UIView for SwiftUI</a>
`)],-1))])}const v=w(p,[["render",g],["__file","how-to-add-a-shadow-to-a-uiview.html.vue"]]),V=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-add-a-shadow-to-a-uiview.html","title":"How to add a shadow to a UIView","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to add a shadow to a UIView","description":"Article(s) > How to add a shadow to a UIView","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-3.2","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to add a shadow to a UIView"},{"property":"og:description","content":"How to add a shadow to a UIView"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-add-a-shadow-to-a-uiview.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-add-a-shadow-to-a-uiview.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to add a shadow to a UIView"}],["meta",{"property":"og:description","content":"Article(s) > How to add a shadow to a UIView"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-3.2"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to add a shadow to a UIView\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.76,"words":527},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-add-a-shadow-to-a-uiview.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,V as data};