import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as t,t as l,e as o,n,g as r,a as e,r as p,o as u}from"./app-ubLChIzZ.js";const h={},m={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},g=t("nav",{class:"table-of-contents"},[t("ul")],-1),d=t("hr",null,null,-1),f=t("blockquote",null,[t("p",null,"Available from iOS 6.0")],-1),y=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/language/how-to-print-debug-text-in-swift">How to print debug text in Swift 
/example-code/uikit/how-to-share-content-with-uiactivityviewcontroller">How to share content with UIActivityViewController 
/quick-start/concurrency/how-to-use-mainactor-to-run-code-on-the-main-queue">How to use @MainActor to run code on the main queue 
/quick-start/swiftui/how-to-create-multi-column-lists-using-table">How to create multi-column lists using Table 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks</a>
`)],-1);function v(a,k){const i=p("VPCard");return u(),s("div",null,[t("h1",m,[t("a",w,[t("span",null,l(a.$frontmatter.title)+" 관련",1)])]),o(i,n(r({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,d,o(i,n(r({title:"How to print using UIActivityViewController | UIKit - free Swift example code",desc:"How to print using UIActivityViewController",link:"https://hackingwithswift.com/example-code/uikit/how-to-print-using-uiactivityviewcontroller",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,e(" TODO: 작성 "),e(`
Printing in iOS used to be done using \`UIPrintInteractionController\`, and, while that still works, it has a much better replacement in the form of \`UIActivityViewController\`. This new class is responsible for taking a wide variety of actions of which printing is just one, but users can also tweet, post to Facebook, send by email, and any other action that has been registered by another app.

If you have a \`UIImage\` you want to print, you can just pass it in. If you want to print text, you can wrap it inside an \`NSAttributedString\` with some formatting, then place that inside a \`UISimpleTextPrintFormatter\` object, then print *that* – iOS automatically takes care of pagination, margins and more.

Below are two example functions that print an image and some text to help get you started:

\`\`\`swift
func share(image: UIImage) {
    let vc = UIActivityViewController(activityItems: [image], applicationActivities: [])
    present(vc, animated: true)
}

func share(text: String) {
    let attrs = [NSAttributedString.Key.font: UIFont.systemFont(ofSize: 72), NSAttributedString.Key.foregroundColor: UIColor.red]
    let str = NSAttributedString(string: text, attributes: attrs)
    let print = UISimpleTextPrintFormatter(attributedText: str)

    let vc = UIActivityViewController(activityItems: [print], applicationActivities: nil)
    present(vc, animated: true)
}
\`\`\`

`),y])}const A=c(h,[["render",v],["__file","how-to-print-using-uiactivityviewcontroller.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-print-using-uiactivityviewcontroller.html","title":"How to print using UIActivityViewController","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to print using UIActivityViewController","description":"Article(s) > How to print using UIActivityViewController","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-6.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to print using UIActivityViewController"},{"property":"og:description","content":"How to print using UIActivityViewController"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-print-using-uiactivityviewcontroller.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-print-using-uiactivityviewcontroller.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to print using UIActivityViewController"}],["meta",{"property":"og:description","content":"Article(s) > How to print using UIActivityViewController"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-6.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to print using UIActivityViewController\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.38,"words":415},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-print-using-uiactivityviewcontroller.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{A as comp,S as data};
