import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,f as e,av as u,au as l,aw as r,ax as n,b as o,r as w,o as h}from"./app-CgstJRjh.js";const m={},d={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"};function p(a,t){const i=w("VPCard");return h(),s("div",null,[e("h1",d,[e("a",f,[e("span",null,u(a.$frontmatter.title)+" 관련",1)])]),l(i,r(n({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),l(i,r(n({title:"How to register a cell for UICollectionView reuse | UIKit - free Swift example code",desc:"How to register a cell for UICollectionView reuse",link:"https://hackingwithswift.com/example-code/uikit/how-to-register-a-cell-for-uicollectionview-reuse",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 6.0")],-1)),o(" TODO: 작성 "),o(`
If you're working entirely in code, you can register a \`UICollectionViewCell\` subclass for use with your collection view, so that new cells are dequeued and re-use automatically by the system.

Here's the most basic form of this technique:

\`\`\`swift
collectionView.register(UICollectionViewCell.self, forCellWithReuseIdentifier: "Cell")
\`\`\`

That registers a basic collection view cell, which you can then customize in code if you want to. You can then dequeue a cell with this:

\`\`\`swift
func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
    let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "Cell", for: indexPath)
    return cell
}
\`\`\`

If a cell doesn't already exist that can be re-used, a new one will be created automatically.

As you might imagine, you will most of the time want to create your own custom \`UICollectionViewCell\` subclass and use that instead, but the code is the same – just use your class name instead.

If you're working with Interface Builder, all this work is done for you by creating prototype cells.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/uikit/how-to-register-a-cell-for-uitableviewcell-reuse">How to register a cell for UITableViewCell reuse 
/example-code/uikit/why-can-i-not-register-for-push-notifications">Why can I not register for push notifications? 
/example-code/uikit/fixing-unable-to-dequeue-a-cell-with-identifier">Fixing "Unable to dequeue a cell with identifier" 
/example-code/uikit/fixing-failed-to-obtain-a-cell-from-its-datasource">Fixing "Failed to obtain a cell from its DataSource" 
/example-code/uikit/how-to-make-uicollectionview-headers-stay-fixed-using-sectionheaderspintovisiblebounds">How to make UICollectionView headers stay fixed using sectionHeadersPinToVisibleBounds</a>
`)],-1))])}const k=c(m,[["render",p],["__file","how-to-register-a-cell-for-uicollectionview-reuse.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-register-a-cell-for-uicollectionview-reuse.html","title":"How to register a cell for UICollectionView reuse","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to register a cell for UICollectionView reuse","description":"Article(s) > How to register a cell for UICollectionView reuse","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-6.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to register a cell for UICollectionView reuse"},{"property":"og:description","content":"How to register a cell for UICollectionView reuse"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-register-a-cell-for-uicollectionview-reuse.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-register-a-cell-for-uicollectionview-reuse.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to register a cell for UICollectionView reuse"}],["meta",{"property":"og:description","content":"Article(s) > How to register a cell for UICollectionView reuse"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-6.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to register a cell for UICollectionView reuse\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.43,"words":430},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-register-a-cell-for-uicollectionview-reuse.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,b as data};
