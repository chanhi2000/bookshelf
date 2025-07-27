import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as u,f as e,av as l,au as n,aw as r,ax as i,b as a,r as d,o as g}from"./app-n2Oj_rFs.js";const h={},m={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,t){const o=d("VPCard");return g(),u("div",null,[e("h1",m,[e("a",p,[e("span",null,l(s.$frontmatter.title)+" 관련",1)])]),n(o,r(i({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(o,r(i({title:"How to make a background image run under the safe area | UIKit - free Swift example code",desc:"How to make a background image run under the safe area",link:"https://hackingwithswift.com/example-code/uikit/how-to-make-a-background-image-run-under-the-safe-area",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 11.0")],-1)),a(" TODO: 작성 "),a(`
Broadly speaking it’s important to place your views so they are inside the safe area layout guide, but there are some occasions when you want to ignore that and have some that run *under* the safe area. Apple’s Weather app, for example, goes edge to edge with background weather graphics, then places the important content inside the safe area.

This is easy enough to accomplish: just make sure your background view goes edge to edge using your main view’s leading, trailing, top, and bottom anchors, then use the safe area layout guide’s anchors for your foreground view.

Here’s how that looks in code:

\`\`\`swift
let background = UIView()
background.translatesAutoresizingMaskIntoConstraints = false
background.backgroundColor = .red
view.addSubview(background)

let foreground = UIView()
foreground.translatesAutoresizingMaskIntoConstraints = false
foreground.backgroundColor = .blue
view.addSubview(foreground)

background.leadingAnchor.constraint(equalTo: view.leadingAnchor).isActive = true
background.trailingAnchor.constraint(equalTo: view.trailingAnchor).isActive = true
background.topAnchor.constraint(equalTo: view.topAnchor).isActive = true
background.bottomAnchor.constraint(equalTo: view.bottomAnchor).isActive = true

foreground.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor).isActive = true
foreground.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor).isActive = true
foreground.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor).isActive = true
foreground.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor).isActive = true
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),a(`
/example-code/uikit/what-is-the-safe-area-layout-guide">What is the safe area layout guide? 
/quick-start/swiftui/how-to-place-content-outside-the-safe-area">How to place content outside the safe area 
/quick-start/swiftui/how-to-inset-the-safe-area-with-custom-content">How to inset the safe area with custom content 
/quick-start/swiftui/how-to-add-extra-padding-to-the-safe-area">How to add extra padding to the safe area 
/quick-start/swiftui/how-to-place-content-into-the-safe-area">How to place content into the safe area</a>
`)],-1))])}const b=c(h,[["render",f],["__file","how-to-make-a-background-image-run-under-the-safe-area.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-make-a-background-image-run-under-the-safe-area.html","title":"How to make a background image run under the safe area","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make a background image run under the safe area","description":"Article(s) > How to make a background image run under the safe area","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-11.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make a background image run under the safe area"},{"property":"og:description","content":"How to make a background image run under the safe area"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-make-a-background-image-run-under-the-safe-area.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-make-a-background-image-run-under-the-safe-area.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make a background image run under the safe area"}],["meta",{"property":"og:description","content":"Article(s) > How to make a background image run under the safe area"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-11.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make a background image run under the safe area\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.52,"words":457},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-make-a-background-image-run-under-the-safe-area.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,y as data};
