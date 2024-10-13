import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as e,t as c,e as i,n as a,g as l,a as t,r as p,o as w}from"./app-TWLwS86W.js";const h={},d={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"},g=e("nav",{class:"table-of-contents"},[e("ul")],-1),u=e("hr",null,null,-1),f=e("blockquote",null,[e("p",null,"Available from iOS 5.0")],-1),b=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/uikit/how-to-add-peek-and-pop-to-a-uitableview">How to add peek and pop to a UITableView 
/example-code/uikit/how-to-customize-swipe-edit-buttons-in-a-uitableview">How to customize swipe edit buttons in a UITableView 
/example-code/uikit/how-to-stop-empty-row-separators-appearing-in-uitableview">How to stop empty row separators appearing in UITableView 
/example-code/uikit/how-to-remove-cells-from-a-uitableview">How to remove cells from a UITableView 
/example-code/uikit/how-to-let-users-tap-on-a-uitableviewcell-while-editing-is-enabled">How to let users tap on a UITableViewCell while editing is enabled</a>
`)],-1);function v(n,y){const o=p("VPCard");return w(),s("div",null,[e("h1",d,[e("a",m,[e("span",null,c(n.$frontmatter.title)+" 관련",1)])]),i(o,a(l({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,u,i(o,a(l({title:"How to reload a UITableView while preserving selections | UIKit - free Swift example code",desc:"How to reload a UITableView while preserving selections",link:"https://hackingwithswift.com/example-code/uikit/how-to-reload-a-uitableview-while-preserving-selections",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,t(" TODO: 작성 "),t(`
When you call \`reloadData()\` on a \`UITableView\` it will refresh all cells from your data source, but it will also lose any selections the user has made.

If you want to reload your table view while also saving and restoring any selections, you should take a copy of the \`indexPathsForSelectedRows\` property before the reload, then re-apply those selections after calling \`reloadData()\`.

This can be put into a simple \`UITableView\` extension for easier use:

\`\`\`swift
extension UITableView {
    /// Reloads a table view without losing track of what was selected.
    func reloadDataSavingSelections() {
        let selectedRows = indexPathsForSelectedRows

        reloadData()

        if let selectedRow = selectedRows {
            for indexPath in selectedRow {
                selectRow(at: indexPath, animated: false, scrollPosition: .none)
            }
        }
    }
}
\`\`\`

With that in place, you can now call \`yourTableView.reloadDataSavingSelections()\` to try it out.

`),b])}const x=r(h,[["render",v],["__file","how-to-reload-a-uitableview-while-preserving-selections.html.vue"]]),T=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-reload-a-uitableview-while-preserving-selections.html","title":"How to reload a UITableView while preserving selections","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to reload a UITableView while preserving selections","description":"Article(s) > How to reload a UITableView while preserving selections","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-5.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to reload a UITableView while preserving selections"},{"property":"og:description","content":"How to reload a UITableView while preserving selections"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-reload-a-uitableview-while-preserving-selections.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-reload-a-uitableview-while-preserving-selections.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to reload a UITableView while preserving selections"}],["meta",{"property":"og:description","content":"Article(s) > How to reload a UITableView while preserving selections"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-5.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-10-10T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to reload a UITableView while preserving selections\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-10T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-10-10T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.33,"words":400},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-reload-a-uitableview-while-preserving-selections.md","localizedDate":"2019년 10월 10일","excerpt":"\\n"}');export{x as comp,T as data};
