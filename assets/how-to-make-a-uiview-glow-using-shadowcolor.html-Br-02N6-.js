import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as o,t as c,e as a,n as i,g as n,a as e,r as w,o as h}from"./app-ubLChIzZ.js";const g={},m={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"},p=o("nav",{class:"table-of-contents"},[o("ul")],-1),u=o("hr",null,null,-1),k=o("blockquote",null,[o("p",null,"Available from iOS 3.2")],-1),f=o("details",{class:"hint-container details"},[o("summary",null,"Similar solutions…"),e(`
/example-code/uikit/how-to-make-a-button-glow-when-tapped-with-showstouchwhenhighlighted">How to make a button glow when tapped with showsTouchWhenHighlighted 
/example-code/uikit/how-to-mask-one-uiview-using-another-uiview">How to mask one UIView using another UIView 
/example-code/uikit/how-to-add-a-shadow-to-a-uiview">How to add a shadow to a UIView 
/example-code/calayer/how-to-make-a-uiview-fade-out">How to make a UIView fade out 
/example-code/uikit/how-to-make-a-uiview-fill-the-screen-using-auto-layout-anchors">How to make a UIView fill the screen using Auto Layout anchors</a>
`)],-1);function y(r,v){const t=w("VPCard");return h(),s("div",null,[o("h1",m,[o("a",d,[o("span",null,c(r.$frontmatter.title)+" 관련",1)])]),a(t,i(n({title:"CALayer - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/calayer/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),p,u,a(t,i(n({title:"How to make a UIView glow using shadowColor | CALayer - free Swift example code",desc:"How to make a UIView glow using shadowColor",link:"https://hackingwithswift.com/example-code/calayer/how-to-make-a-uiview-glow-using-shadowcolor",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),k,e(" TODO: 작성 "),e(` 
All views can have shadows thanks to the \`CALayer\` behind them, but you can use that same property to create glow effects. For example, this creates a 128x128 view then gives it a 20-point yellow glow:

\`\`\`swift
let vw = UIView(frame: CGRect(x: 100, y: 100, width: 128, height: 128))
vw.backgroundColor = .white

vw.layer.shadowOffset = .zero
vw.layer.shadowColor = UIColor.yellow.cgColor
vw.layer.shadowRadius = 20
vw.layer.shadowOpacity = 1
vw.layer.shadowPath = UIBezierPath(rect: vw.bounds).cgPath
\`\`\`

Bright glows work best on a dark background, so try making your main view black:

\`\`\`swift
view.backgroundColor = .black
\`\`\`

`),f])}const x=l(g,[["render",y],["__file","how-to-make-a-uiview-glow-using-shadowcolor.html.vue"]]),C=JSON.parse('{"path":"/hackingwithswift.com/example-code/calayer/how-to-make-a-uiview-glow-using-shadowcolor.html","title":"How to make a UIView glow using shadowColor","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make a UIView glow using shadowColor","description":"Article(s) > How to make a UIView glow using shadowColor","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-3.2","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make a UIView glow using shadowColor"},{"property":"og:description","content":"How to make a UIView glow using shadowColor"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-make-a-uiview-glow-using-shadowcolor.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-make-a-uiview-glow-using-shadowcolor.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make a UIView glow using shadowColor"}],["meta",{"property":"og:description","content":"Article(s) > How to make a UIView glow using shadowColor"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-3.2"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make a UIView glow using shadowColor\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.19,"words":358},"filePathRelative":"hackingwithswift.com/example-code/calayer/how-to-make-a-uiview-glow-using-shadowcolor.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,C as data};
