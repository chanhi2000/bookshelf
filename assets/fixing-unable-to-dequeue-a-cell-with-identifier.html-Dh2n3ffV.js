import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as e,as as u,ao as o,at as a,au as l,ak as i,aq as d,ar as h}from"./app-CVhcaaOv.js";const f={},p={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function m(r,t){const n=d("VPCard");return h(),c("div",null,[e("h1",p,[e("a",g,[e("span",null,u(r.$frontmatter.title)+" 관련",1)])]),o(n,a(l({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),o(n,a(l({title:"Fixing ”Unable to dequeue a cell with identifier” | UIKit - free Swift example code",desc:"Fixing ”Unable to dequeue a cell with identifier”",link:"https://hackingwithswift.com/example-code/uikit/fixing-unable-to-dequeue-a-cell-with-identifier",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 6.0")],-1)),i(" TODO: 작성 "),i(`
This error usually means there's a problem with your cell prototypes. There are two main reasons why table views fail to return cells, but they give different error messages. If you get an error like this:

\`\`\`swift
Terminating app due to uncaught exception 'NSInternalInconsistencyException', reason: 'unable to dequeue a cell with identifier Cell - must register a nib or a class for the identifier or connect a prototype cell in a storyboard'
\`\`\`

…it means that your call to \`dequeueReusableCell(withIdentifier:)\` is failing, which is usually caused by having no prototype cells with the identifier you requested.

First: check that you have a prototype cell registered. By default you should have one in the storyboard, but if you created your own table view then you might have moved things around. You might also have registered one in code.

Second: check that your spelling of the identified is correct. It's "Cell" by default, in the code and in the storyboard, and these two things need to match in order for everything to work.

You can verify the error by placing a breakpoint in your \`cellForRowAtIndexPath\` method. For example, if you have code like this:

\`\`\`swift
override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "Cell")!
    let object = objects[indexPath.row]
    cell.textLabel?.text = object
    return cell
}
\`\`\`

…then you should set the breakpoint on the \`let object =\` line. If the problem is that \`tableView.dequeueReusableCell(withIdentifier:)\` is failing, your breakpoint won't be hit.

If you're using modern Xcode templates where you get a prototype cell made for you, you should probably be using this instead:

\`\`\`swift
let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
\`\`\`

You should then ensure a prototype cell exists in your tableview with that identifier – double check the name, and make sure you've typed it into the "Identifier" box and not "Class" or something else.

If you aren't using an Xcode template, use that line of code anyway then register your own re-use identifier like this:

\`\`\`swift
tableView.register(UITableViewCell.self, forCellReuseIdentifier: "Cell")
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),i(`
/example-code/uikit/fixing-failed-to-obtain-a-cell-from-its-datasource">Fixing "Failed to obtain a cell from its DataSource" 
/example-code/language/fixing-class-viewcontroller-has-no-initializers">Fixing "Class ViewController has no initializers" 
/example-code/language/fixing-ambiguous-reference-to-member-when-using-ceil-or-round">Fixing "Ambiguous reference to member when using ceil or round"</a>
`)],-1))])}const y=s(f,[["render",m],["__file","fixing-unable-to-dequeue-a-cell-with-identifier.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/fixing-unable-to-dequeue-a-cell-with-identifier.html","title":"Fixing ”Unable to dequeue a cell with identifier”","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Fixing ”Unable to dequeue a cell with identifier”","description":"Article(s) > Fixing ”Unable to dequeue a cell with identifier”","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-6.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Fixing ”Unable to dequeue a cell with identifier”"},{"property":"og:description","content":"Fixing ”Unable to dequeue a cell with identifier”"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/fixing-unable-to-dequeue-a-cell-with-identifier.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/fixing-unable-to-dequeue-a-cell-with-identifier.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Fixing ”Unable to dequeue a cell with identifier”"}],["meta",{"property":"og:description","content":"Article(s) > Fixing ”Unable to dequeue a cell with identifier”"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-6.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Fixing ”Unable to dequeue a cell with identifier”\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.9,"words":570},"filePathRelative":"hackingwithswift.com/example-code/uikit/fixing-unable-to-dequeue-a-cell-with-identifier.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,x as data};
