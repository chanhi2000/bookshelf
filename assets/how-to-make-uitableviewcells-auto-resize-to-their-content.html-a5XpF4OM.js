import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as e,av as h,au as a,aw as n,ax as l,b as o,r as m,o as u}from"./app-C2w16SxA.js";const w={},p={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function g(r,t){const i=m("VPCard");return u(),c("div",null,[e("h1",p,[e("a",d,[e("span",null,h(r.$frontmatter.title)+" 관련",1)])]),a(i,n(l({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),a(i,n(l({title:"How to make UITableViewCells auto resize to their content | UIKit - free Swift example code",desc:"How to make UITableViewCells auto resize to their content",link:"https://hackingwithswift.com/example-code/uikit/how-to-make-uitableviewcells-auto-resize-to-their-content",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),o(" TODO: 작성 "),o(`
Since iOS 11, table view cells automatically resize to fit their content as long as your cells use Auto Layout to configure themselves. For example, if you use the built-in Basic style for your cell prototype, all you need to do is change the Lines property to 0 for its label and the cell will grow as needed.

**Tip:** If you find your cells *aren’t* autosizing, go to the size inspector with your table view selected then check “Automatic” next to both Row Height and Estimate.

The situation is slightly more complicated when you want some cells to be autosized and others not. To make this work you should add two methods to your table view controller, \`heightForRowAt\` and \`estimatedHeightForRowAt\`, then make them both return the special value \`UITableView.automaticDimension\` for the cells you want to be sized automatically.

In case you're still not sure, here's some example code. This demonstrates a fairly common scenario where you want some important cells at the start to show all their content, but cells in subsequent sections to get clipped:

\`\`\`swift
func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
    if indexPath.section == 0 {
        return UITableView.automaticDimension
    } else {
        return 40
    }
}

override func tableView(_ tableView: UITableView, estimatedHeightForRowAt indexPath: IndexPath) -> CGFloat {
    if indexPath.section == 0 {
        return UITableView.automaticDimension
    } else {
        return 40
    }
}
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/uikit/how-to-use-dynamic-type-to-resize-your-apps-text">How to use Dynamic Type to resize your app's text 
/example-code/uikit/how-to-resize-a-custom-font-using-uifontmetrics">How to resize a custom font using UIFontMetrics 
/example-code/uikit/how-to-swipe-to-delete-uitableviewcells">How to swipe to delete UITableViewCells 
/example-code/uikit/how-to-give-uitableviewcells-a-selected-color-other-than-gray">How to give UITableViewCells a selected color other than gray 
/quick-start/swiftui/how-to-make-buttons-that-repeat-their-action-when-pressed">How to make buttons that repeat their action when pressed</a>
`)],-1))])}const k=s(w,[["render",g],["__file","how-to-make-uitableviewcells-auto-resize-to-their-content.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-make-uitableviewcells-auto-resize-to-their-content.html","title":"How to make UITableViewCells auto resize to their content","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make UITableViewCells auto resize to their content","description":"Article(s) > How to make UITableViewCells auto resize to their content","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make UITableViewCells auto resize to their content"},{"property":"og:description","content":"How to make UITableViewCells auto resize to their content"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-make-uitableviewcells-auto-resize-to-their-content.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-make-uitableviewcells-auto-resize-to-their-content.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make UITableViewCells auto resize to their content"}],["meta",{"property":"og:description","content":"Article(s) > How to make UITableViewCells auto resize to their content"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make UITableViewCells auto resize to their content\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.66,"words":497},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-make-uitableviewcells-auto-resize-to-their-content.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,y as data};
