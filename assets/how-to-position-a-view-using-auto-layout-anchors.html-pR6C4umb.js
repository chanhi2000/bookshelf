import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,f as t,av as u,au as n,aw as a,ax as s,b as e,r as h,o as p}from"./app-BGkQLgjR.js";const w={},d={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function m(r,o){const i=h("VPCard");return p(),l("div",null,[t("h1",d,[t("a",g,[t("span",null,u(r.$frontmatter.title)+" 관련",1)])]),n(i,a(s({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[0]||(o[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),o[1]||(o[1]=t("hr",null,null,-1)),n(i,a(s({title:"How to position a view using Auto Layout anchors | UIKit - free Swift example code",desc:"How to position a view using Auto Layout anchors",link:"https://hackingwithswift.com/example-code/uikit/how-to-position-a-view-using-auto-layout-anchors",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[2]||(o[2]=t("blockquote",null,[t("p",null,"Available from iOS 9.0")],-1)),e(" TODO: 작성 "),e(`
Auto Layout anchors make it easy to position your views relative to others. There are lots of anchors to choose from: leading and trailing edges, top and bottom edges, center X and center Y, and more. 

To try it out, first create a view something like this:

\`\`\`swift
let child = UIView()
child.translatesAutoresizingMaskIntoConstraints = false
child.backgroundColor = .red
view.addSubview(child)
\`\`\`

Now we can position that view by activating various anchors. For example, we could pin it to the top and bottom edges of the screen, make it precisely 128 points wide, then center it horizontally:

\`\`\`swift
child.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor).isActive = true
child.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor).isActive = true
child.widthAnchor.constraint(equalToConstant: 128).isActive = true
child.centerXAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerXAnchor).isActive = true
\`\`\`

To explore anchors further, try typing \`child.anchor\` and exploring the code completion options.

`),o[3]||(o[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/uikit/how-to-make-a-uiview-fill-the-screen-using-auto-layout-anchors">How to make a UIView fill the screen using Auto Layout anchors 
/quick-start/swiftui/how-to-position-and-style-subviews-that-come-from-a-different-view">How to position and style subviews that come from a different view 
/quick-start/swiftui/how-to-position-views-in-a-grid-using-lazyvgrid-and-lazyhgrid">How to position views in a grid using LazyVGrid and LazyHGrid 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/how-to-detect-when-the-size-or-position-of-a-view-changes">How to detect when the size or position of a view changes</a>
`)],-1))])}const v=c(w,[["render",m],["__file","how-to-position-a-view-using-auto-layout-anchors.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-position-a-view-using-auto-layout-anchors.html","title":"How to position a view using Auto Layout anchors","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to position a view using Auto Layout anchors","description":"Article(s) > How to position a view using Auto Layout anchors","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-9.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to position a view using Auto Layout anchors"},{"property":"og:description","content":"How to position a view using Auto Layout anchors"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-position-a-view-using-auto-layout-anchors.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-position-a-view-using-auto-layout-anchors.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to position a view using Auto Layout anchors"}],["meta",{"property":"og:description","content":"Article(s) > How to position a view using Auto Layout anchors"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-9.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to position a view using Auto Layout anchors\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.4,"words":420},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-position-a-view-using-auto-layout-anchors.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,k as data};
