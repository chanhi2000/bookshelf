import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as e,as as p,ao as n,at as i,au as a,ak as o,aq as u,ar as m}from"./app-CpYYKbnj.js";const h={},w={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function d(s,t){const r=u("VPCard");return m(),c("div",null,[e("h1",w,[e("a",g,[e("span",null,p(s.$frontmatter.title)+" 관련",1)])]),n(r,i(a({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(r,i(a({title:"How to create popover menus using UIPopoverPresentationController | UIKit - free Swift example code",desc:"How to create popover menus using UIPopoverPresentationController",link:"https://hackingwithswift.com/example-code/uikit/how-to-create-popover-menus-using-uipopoverpresentationcontroller",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),o(" TODO: 작성 "),o(`
Show a \`UIAlertController\` action sheet on iPad isn't as easy as on iPhone. The reason for this is simple: on iPhone the action sheet slides up from the bottom, effectively owning the user's attention until it's dismissed, whereas on iPad it could be shown from anywhere. In fact, if you just try and show one on an iPad like this, your app crashes:

\`\`\`swift
let ac = UIAlertController(title: "Hello!", message: "This is a test.", preferredStyle: .actionSheet)
present(ac, animated: true)
\`\`\`

The solution is to use a \`UIPopoverPresentationController\`, which gets created for you when you try to access the \`popoverPresentationController\` property of a \`UIAlertController\`. With this, you can tell it where to show from (and what view those coordinates relate to) before presenting the action sheet, which makes it work correctly on iPad.

To rewrite the previous lines so they work, you'd do this:

\`\`\`swift
let popover = ac.popoverPresentationController
popover?.sourceView = view
popover?.sourceRect = CGRect(x: 32, y: 32, width: 64, height: 64)

present(ac, animated: true)
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/how-to-show-a-popover-view">How to show a popover view 
/example-code/uikit/how-to-create-custom-menus-using-uimenucontroller">How to create custom menus using UIMenuController 
/quick-start/swiftui/how-to-create-multi-column-lists-using-table">How to create multi-column lists using Table 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/concurrency/how-to-use-mainactor-to-run-code-on-the-main-queue">How to use @MainActor to run code on the main queue</a>
`)],-1))])}const y=l(h,[["render",d],["__file","how-to-create-popover-menus-using-uipopoverpresentationcontroller.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-create-popover-menus-using-uipopoverpresentationcontroller.html","title":"How to create popover menus using UIPopoverPresentationController","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to create popover menus using UIPopoverPresentationController","description":"Article(s) > How to create popover menus using UIPopoverPresentationController","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to create popover menus using UIPopoverPresentationController"},{"property":"og:description","content":"How to create popover menus using UIPopoverPresentationController"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-create-popover-menus-using-uipopoverpresentationcontroller.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-create-popover-menus-using-uipopoverpresentationcontroller.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to create popover menus using UIPopoverPresentationController"}],["meta",{"property":"og:description","content":"Article(s) > How to create popover menus using UIPopoverPresentationController"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to create popover menus using UIPopoverPresentationController\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.39,"words":418},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-create-popover-menus-using-uipopoverpresentationcontroller.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,k as data};