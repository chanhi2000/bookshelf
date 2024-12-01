import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as r,b as t,t as c,e as a,n as i,g as n,a as e,r as u,o as h}from"./app-DLPYIRXq.js";const d={},w={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"},p=t("nav",{class:"table-of-contents"},[t("ul")],-1),f=t("hr",null,null,-1),b=t("blockquote",null,[t("p",null,"Available from iOS 6.0")],-1),y=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/uikit/how-to-activate-multiple-auto-layout-constraints-using-activate">How to activate multiple Auto Layout constraints using activate() 
/example-code/uikit/how-to-identify-your-auto-layout-constraints">How to identify your Auto Layout constraints 
/example-code/uikit/how-to-stop-auto-layout-and-autoresizing-masks-conflicting-translatesautoresizingmaskintoconstraints">How to stop Auto Layout and autoresizing masks conflicting: translatesAutoresizingMaskIntoConstraints 
/example-code/uikit/how-to-fix-auto-layout-problems">How to fix Auto Layout problems 
/example-code/uikit/how-to-position-a-view-using-auto-layout-anchors">How to position a view using Auto Layout anchors</a>
`)],-1);function g(s,v){const o=u("VPCard");return h(),r("div",null,[t("h1",w,[t("a",m,[t("span",null,c(s.$frontmatter.title)+" 관련",1)])]),a(o,i(n({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),p,f,a(o,i(n({title:"How to create Auto Layout constraints in code: constraints(withVisualFormat:) | UIKit - free Swift example code",desc:"How to create Auto Layout constraints in code: constraints(withVisualFormat:)",link:"https://hackingwithswift.com/example-code/uikit/how-to-create-auto-layout-constraints-in-code-constraintswithvisualformat",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),b,e(" TODO: 작성 "),e(`
While the complexities of Auto Layout make it something most people prefer to grapple with using Interface Builder, it does have some cool tricks up its sleeve if you prefer to work in code. One of those tricks is called Visual Format Language (VFL) and lets you use ASCII art to tell iOS how you want your views laid out.

First, here's a dummy test case you can copy and paste into your project. It creates five labels of different colors and adds them all to your view:

\`\`\`swift
override func viewDidLoad() {
    super.viewDidLoad()

    let label1 = UILabel()
    label1.translatesAutoresizingMaskIntoConstraints = false
    label1.backgroundColor = UIColor.red
    label1.text = "THESE"
    label1.sizeToFit()

    let label2 = UILabel()
    label2.translatesAutoresizingMaskIntoConstraints = false
    label2.backgroundColor = UIColor.cyan
    label2.text = "ARE"
    label2.sizeToFit()

    let label3 = UILabel()
    label3.translatesAutoresizingMaskIntoConstraints = false
    label3.backgroundColor = UIColor.yellow
    label3.text = "SOME"
    label3.sizeToFit()

    let label4 = UILabel()
    label4.translatesAutoresizingMaskIntoConstraints = false
    label4.backgroundColor = UIColor.green
    label4.text = "AWESOME"
    label4.sizeToFit()

    let label5 = UILabel()
    label5.translatesAutoresizingMaskIntoConstraints = false
    label5.backgroundColor = UIColor.orange
    label5.text = "LABELS"
    label5.sizeToFit()

    view.addSubview(label1)
    view.addSubview(label2)
    view.addSubview(label3)
    view.addSubview(label4)
    view.addSubview(label5)
}
\`\`\`

If you run the project, you'll see the labels are all bunched up in the top-left corner, which doesn't look great. To fix this, we're going to use VFL to have each label occupy the full width of the screen, then spaced out so they are position below each other.

When you use VFL you need to create a dictionary of the views you want to work with. This dictionary needs to have the name of the view inside VFL and a reference to the view itself, but in practice most people just use the same name for VFL as the variable like this:

\`\`\`swift
let viewsDictionary = ["label1": label1, "label2": label2, "label3": label3, "label4": label4, "label5": label5]
\`\`\`

Put that just below the final \`addSubview()\` call.

Now for the VFL itself: put this directly beneath the previous line in order to have every label stretch out to occupy the full width of the screen:

\`\`\`swift
for label in viewsDictionary.keys {
    view.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|[\\(label)]|", options: [], metrics: nil, views: viewsDictionary))
}
\`\`\`

Finally, add this to make the views lay themselves out below each other:

\`\`\`swift
view.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:|[label1]-[label2]-[label3]-[label4]-[label5]", options: [], metrics: nil, views: viewsDictionary))
\`\`\`

This is only the beginning of what VFL can do – you should definitely read my <a href="/read/6/overview">Auto Layout tutorial</a> for more details.

`),y])}const A=l(d,[["render",g],["__file","how-to-create-auto-layout-constraints-in-code-constraintswithvisualformat.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-create-auto-layout-constraints-in-code-constraintswithvisualformat.html","title":"How to create Auto Layout constraints in code: constraints(withVisualFormat:)","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to create Auto Layout constraints in code: constraints(withVisualFormat:)","description":"Article(s) > How to create Auto Layout constraints in code: constraints(withVisualFormat:)","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-6.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to create Auto Layout constraints in code: constraints(withVisualFormat:)"},{"property":"og:description","content":"How to create Auto Layout constraints in code: constraints(withVisualFormat:)"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-create-auto-layout-constraints-in-code-constraintswithvisualformat.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-create-auto-layout-constraints-in-code-constraintswithvisualformat.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to create Auto Layout constraints in code: constraints(withVisualFormat:)"}],["meta",{"property":"og:description","content":"Article(s) > How to create Auto Layout constraints in code: constraints(withVisualFormat:)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-6.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to create Auto Layout constraints in code: constraints(withVisualFormat:)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.2,"words":659},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-create-auto-layout-constraints-in-code-constraintswithvisualformat.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{A as comp,x as data};
