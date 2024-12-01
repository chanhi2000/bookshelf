import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as d,b as t,t as h,e,n as i,g as n,a as o,r,o as w}from"./app-DLPYIRXq.js";const p={},m={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"},g=t("nav",{class:"table-of-contents"},[t("ul")],-1),f=t("hr",null,null,-1),b=t("blockquote",null,[t("p",null,"Available from iOS 2.0")],-1),v=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/how-to-create-multi-column-lists-using-table">How to create multi-column lists using Table 
/example-code/language/how-to-create-an-objective-c-bridging-header-to-use-code-in-swift">How to create an Objective-C bridging header to use code in Swift 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/quick-start/swiftui/how-to-convert-a-swiftui-view-to-an-image">How to convert a SwiftUI view to an image</a>
`)],-1);function k(c,y){const a=r("VPCard"),s=r("VidStack");return w(),d("div",null,[t("h1",m,[t("a",u,[t("span",null,h(c.$frontmatter.title)+" 관련",1)])]),e(a,i(n({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,f,e(a,i(n({title:"How to add a section header to a table view | UIKit - free Swift example code",desc:"How to add a section header to a table view",link:"https://hackingwithswift.com/example-code/uikit/how-to-add-a-section-header-to-a-table-view",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),b,e(s,{src:"youtube/09QyTxzxHYE"}),o(" TODO: 작성 "),o(`
You can use the built-in iOS table section headers by returning a value from \`titleForHeaderInSection\` like this:

\`\`\`swift
override func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
    return "Section \\(section)"
}
\`\`\`

If you want to return a custom header view with something more than just some text, you should use \`viewForHeaderInSection\` instead, like this:

\`\`\`swift
override func tableView(tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
    let vw = UIView()
    vw.backgroundColor = UIColor.red

    return vw
}
\`\`\`

`),v])}const x=l(p,[["render",k],["__file","how-to-add-a-section-header-to-a-table-view.html.vue"]]),H=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-add-a-section-header-to-a-table-view.html","title":"How to add a section header to a table view","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to add a section header to a table view","description":"Article(s) > How to add a section header to a table view","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to add a section header to a table view"},{"property":"og:description","content":"How to add a section header to a table view"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-add-a-section-header-to-a-table-view.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-add-a-section-header-to-a-table-view.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to add a section header to a table view"}],["meta",{"property":"og:description","content":"Article(s) > How to add a section header to a table view"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to add a section header to a table view\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.19,"words":358},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-add-a-section-header-to-a-table-view.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,H as data};
