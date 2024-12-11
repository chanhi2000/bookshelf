import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as h,am as t,as as l,ao as n,at as s,au as r,ak as o,aq as w,ar as c}from"./app-Dn51E1Ub.js";const g={},u={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"};function m(i,e){const a=w("VPCard");return c(),h("div",null,[t("h1",u,[t("a",p,[t("span",null,l(i.$frontmatter.title)+" 관련",1)])]),n(a,s(r({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),n(a,s(r({title:"How to render shadows using NSShadow and setShadow() | UIKit - free Swift example code",desc:"How to render shadows using NSShadow and setShadow()",link:"https://hackingwithswift.com/example-code/uikit/how-to-render-shadows-using-nsshadow-and-setshadow",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 10.0")],-1)),o(" TODO: 작성 "),o(`
There are two ways to add shadows when rendering images: calling \`setShadow()\` and providing offset, blur, and color, or by using an \`NSShadow\` attached to an attributed string. Both have their own advantages, so both are worth trying.

First, here’s some example drawing code without a shadow:

\`\`\`swift
let rect = CGRect(x: 0, y: 0, width: 512, height: 256)
let renderer = UIGraphicsImageRenderer(bounds: rect)

let img = renderer.image { ctx in
    UIColor.black.set()
    ctx.fill(rect)

    let str = """
    He thrusts his fists
    Against the posts
    And still insists
    He sees the ghosts
    """

    let attrs: [NSAttributedString.Key: Any] = [
        .font: UIFont.systemFont(ofSize: 36),
        .foregroundColor: UIColor.white
    ]

    let attributedString = NSAttributedString(string: str, attributes: attrs)
    attributedString.draw(in: rect.insetBy(dx: 50, dy: 50))
}
\`\`\`

That draws some white text on a black background.

If we want to add a shadow effect to the text, we can use the \`setShadow\` method of the Core Graphics context we’re working with. For example, if you place this line before the \`draw()\` call at the end, you’ll make the text have a 5-point red glow:

\`\`\`swift
ctx.cgContext.setShadow(offset: .zero, blur: 5, color: UIColor.red.cgColor)
\`\`\`

The advantage of using \`setShadow()\` is that once you enable a shadow color, everything you draw has the same color – all text, all images, and all shapes. 

When you’re done with the shadow and want normal rendering to resume, just use nil for the color value like this:

\`\`\`swift
ctx.cgContext.setShadow(offset: .zero, blur: 0, color: nil)
\`\`\`

The other way of drawing shadows is using \`NSAttributedString\` and the \`NSShadow\` class. This is an object you create and can attach to any attributed strings you want, giving you the flexibility to add shadowing to only certain parts of a string rather than the whole thing – something that \`setShadow()\` can’t do.

First, create an \`NSShadow\` instance like this:

\`\`\`swift
let shadow = NSShadow()
shadow.shadowColor = UIColor.red
shadow.shadowBlurRadius = 5
\`\`\`

That will create the same 5-point red glow as our earlier call to \`setShadow()\`.

Now go ahead and put that into your attributed string dictionary using the \`.shadow\` key, like this:

\`\`\`swift
let attrs: [NSAttributedString.Key: Any] = [
    .font: UIFont.systemFont(ofSize: 36),
    .foregroundColor: UIColor.white,
    .shadow: shadow
]
\`\`\`

Here the end result will look identical to \`NSShadow\`, but as I said you now have the ability to shadow only parts of a string - or even add different shadows across the string.

**Pro-tip:** If you want to make your shadow stronger – to make it darker so that the color shows through more clearly – just draw your object repeatedly. For example, this will draw our attributed string five times to give it a really strong red glow:

\`\`\`swift
for _ in 1...5 {
    attributedString.draw(in: rect.insetBy(dx: 50, dy: 50))
}
\`\`\`

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/quick-start/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts">How to use Instruments to profile your SwiftUI code and identify slow layouts</a>
`)],-1))])}const y=d(g,[["render",m],["__file","how-to-render-shadows-using-nsshadow-and-setshadow.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-render-shadows-using-nsshadow-and-setshadow.html","title":"How to render shadows using NSShadow and setShadow()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to render shadows using NSShadow and setShadow()","description":"Article(s) > How to render shadows using NSShadow and setShadow()","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-10.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to render shadows using NSShadow and setShadow()"},{"property":"og:description","content":"How to render shadows using NSShadow and setShadow()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-render-shadows-using-nsshadow-and-setshadow.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-render-shadows-using-nsshadow-and-setshadow.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to render shadows using NSShadow and setShadow()"}],["meta",{"property":"og:description","content":"Article(s) > How to render shadows using NSShadow and setShadow()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-10.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to render shadows using NSShadow and setShadow()\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.37,"words":712},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-render-shadows-using-nsshadow-and-setshadow.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,k as data};
