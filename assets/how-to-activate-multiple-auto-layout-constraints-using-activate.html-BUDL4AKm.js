import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,f as t,av as u,au as i,aw as n,ax as s,b as a,r as h,o as p}from"./app-n2Oj_rFs.js";const m={},d={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"};function g(r,e){const o=h("VPCard");return p(),l("div",null,[t("h1",d,[t("a",w,[t("span",null,u(r.$frontmatter.title)+" 관련",1)])]),i(o,n(s({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),i(o,n(s({title:"How to activate multiple Auto Layout constraints using activate() | UIKit - free Swift example code",desc:"How to activate multiple Auto Layout constraints using activate()",link:"https://hackingwithswift.com/example-code/uikit/how-to-activate-multiple-auto-layout-constraints-using-activate",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),a(" TODO: 작성 "),a(`
Using Auto Layout is the best way to create complex layouts that automatically adapt to their environment, but sometimes adding and removing lots of constraints can cause performance problems. 

As an example, here’s a simple \`UIView\` with some color so you can see it on-screen:

\`\`\`swift
let vw = UIView()
vw.translatesAutoresizingMaskIntoConstraints = false
vw.backgroundColor = .red
view.addSubview(vw)
\`\`\`

We could use Auto Layout anchors to give that constraints: stay 20 points from the leading and trailing edges of its superview, be fixed at 100 points in height, and center itself on-screen:

\`\`\`swift
vw.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: 20).isActive = true
vw.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -20).isActive = true
vw.heightAnchor.constraint(equalToConstant: 100).isActive = true
vw.centerYAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerYAnchor).isActive = true
\`\`\`

However, while that approach is easy to read – and perfectly fine while you’re learning or if you don’t have complex layouts – there is a more efficient way. \`NSLayoutConstraint\` has a class method called \`activate()\` that activates multiple constraints at once, which should allow Auto Layout to update its entire layout as a single batch.

The code for this is straightforward: just pass in an array of constraints to the \`activate()\` method, like this:

\`\`\`swift
NSLayoutConstraint.activate([
    vw.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: 20),
    vw.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -20),
    vw.heightAnchor.constraint(equalToConstant: 100),
    vw.centerYAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerYAnchor)
])
\`\`\`

If you need to *deactivate* constraints, there’s an equivalent \`deactivate()\` method that is used the same way.

**Note:** Auto Layout is smart enough to bulk actual layout changes even with the \`isActive\` approach – i.e., it will only call \`layoutSubviews()\` once per view even if you change four constraints – but Apple says that using \`activate()\` is definitely more efficient.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),a(`
/example-code/uikit/how-to-create-auto-layout-constraints-in-code-constraintswithvisualformat">How to create Auto Layout constraints in code: constraints(withVisualFormat:) 
/example-code/uikit/how-to-identify-your-auto-layout-constraints">How to identify your Auto Layout constraints 
/quick-start/swiftui/how-to-activate-different-button-behaviors-when-a-modifier-key-is-pressed">How to activate different button behaviors when a modifier key is pressed 
/example-code/uikit/how-to-stop-auto-layout-and-autoresizing-masks-conflicting-translatesautoresizingmaskintoconstraints">How to stop Auto Layout and autoresizing masks conflicting: translatesAutoresizingMaskIntoConstraints 
/example-code/uikit/how-to-fix-auto-layout-problems">How to fix Auto Layout problems</a>
`)],-1))])}const y=c(m,[["render",g],["__file","how-to-activate-multiple-auto-layout-constraints-using-activate.html.vue"]]),A=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-activate-multiple-auto-layout-constraints-using-activate.html","title":"How to activate multiple Auto Layout constraints using activate()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to activate multiple Auto Layout constraints using activate()","description":"Article(s) > How to activate multiple Auto Layout constraints using activate()","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to activate multiple Auto Layout constraints using activate()"},{"property":"og:description","content":"How to activate multiple Auto Layout constraints using activate()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-activate-multiple-auto-layout-constraints-using-activate.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-activate-multiple-auto-layout-constraints-using-activate.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to activate multiple Auto Layout constraints using activate()"}],["meta",{"property":"og:description","content":"Article(s) > How to activate multiple Auto Layout constraints using activate()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to activate multiple Auto Layout constraints using activate()\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.83,"words":549},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-activate-multiple-auto-layout-constraints-using-activate.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,A as data};
