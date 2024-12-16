import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as e,as as u,ao as o,at as a,au as r,ak as i,aq as h,ar as f}from"./app-gTf-Epb-.js";const d={},w={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"};function m(n,t){const l=h("VPCard");return f(),c("div",null,[e("h1",w,[e("a",p,[e("span",null,u(n.$frontmatter.title)+" 관련",1)])]),o(l,a(r({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),o(l,a(r({title:"How to register a cell for UITableViewCell reuse | UIKit - free Swift example code",desc:"How to register a cell for UITableViewCell reuse",link:"https://hackingwithswift.com/example-code/uikit/how-to-register-a-cell-for-uitableviewcell-reuse",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 6.0")],-1)),i(" TODO: 작성 "),i(`
Reusing table view cells has been one of the most important performance optimizations in iOS ever since iOS 2.0, but it was only with iOS 6.0 that the API got cleaned up a little with the addition of the \`register()\` method.

There are two variants to \`register\`, but both take a parameter called \`forCellReuseIdentifier\`, which is a string that lets you register different kinds of table view cells. For example, you might have a reuse identifier "DefaultCell", another one called "Heading cell", another one "CellWithTextField", and so on. Re-using different cells this way helps save system resources.

If you want to use \`register()\` with a Swift class, you provide a table view cell class as its first parameter. This is useful if your cell is defined entirely in code. As an example, this uses the default \`UITableViewCell\` class:

\`\`\`swift
tableView.register(UITableViewCell.self, forCellReuseIdentifier: "DefaultCell")
\`\`\`

The other option is to use \`register()\` with an Interface Builder nib file, like this:

\`\`\`swift
tableView.register(UINib(nibName: "yourNib", bundle: nil), forCellReuseIdentifier: "CellFromNib")
\`\`\`

Regardless of which option you choose, you can dequeue your cells like this:

\`\`\`swift
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "DefaultCell")!
    return cell
}
\`\`\`

If there aren't any cells created that can be reused, iOS will automatically create them – this API really is very easy.

Although knowing the above code is definitely useful, if you're using storyboards you will find it easier to create prototype cells and give them a reuse identifier directly inside Interface Builder.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),i(`
/example-code/uikit/how-to-register-a-cell-for-uicollectionview-reuse">How to register a cell for UICollectionView reuse 
/example-code/uikit/why-can-i-not-register-for-push-notifications">Why can I not register for push notifications? 
/example-code/uikit/fixing-unable-to-dequeue-a-cell-with-identifier">Fixing "Unable to dequeue a cell with identifier" 
/example-code/uikit/fixing-failed-to-obtain-a-cell-from-its-datasource">Fixing "Failed to obtain a cell from its DataSource" 
/example-code/uikit/how-to-add-a-button-to-a-uitableviewcell">How to add a button to a UITableViewCell</a>
`)],-1))])}const y=s(d,[["render",m],["__file","how-to-register-a-cell-for-uitableviewcell-reuse.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-register-a-cell-for-uitableviewcell-reuse.html","title":"How to register a cell for UITableViewCell reuse","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to register a cell for UITableViewCell reuse","description":"Article(s) > How to register a cell for UITableViewCell reuse","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-6.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to register a cell for UITableViewCell reuse"},{"property":"og:description","content":"How to register a cell for UITableViewCell reuse"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-register-a-cell-for-uitableviewcell-reuse.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-register-a-cell-for-uitableviewcell-reuse.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to register a cell for UITableViewCell reuse"}],["meta",{"property":"og:description","content":"Article(s) > How to register a cell for UITableViewCell reuse"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-6.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to register a cell for UITableViewCell reuse\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.73,"words":518},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-register-a-cell-for-uitableviewcell-reuse.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,k as data};
