import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,f as t,av as d,au as i,aw as a,ax as r,b as o,r as p,o as h}from"./app-C2w16SxA.js";const m={},g={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"};function f(c,e){const n=p("VPCard");return h(),l("div",null,[t("h1",g,[t("a",w,[t("span",null,d(c.$frontmatter.title)+" 관련",1)])]),i(n,a(r({title:"Core Graphics - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/core-graphics/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),i(n,a(r({title:"How to draw lines in Core Graphics: move(to:) and addLine(to:) | Core Graphics - free Swift example code",desc:"How to draw lines in Core Graphics: move(to:) and addLine(to:)",link:"https://hackingwithswift.com/example-code/core-graphics/how-to-draw-lines-in-core-graphics-moveto-and-addlineto",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 4.0")],-1)),o(" TODO: 작성 "),o(` 
You can draw lines in Core Graphics using \`move(to:)\` and \`addLine(to:)\`. The first function moves the Core Graphics path to a \`CGPoint\` of your choosing, and the second function moves the path to a new point while also adding a line. Once you add in the required code to set up a context and choose a color, you can draw a triangle with this code:

\`\`\`swift
let renderer1 = UIGraphicsImageRenderer(size: CGSize(width: 500, height: 500))
let img1 = renderer1.image { ctx in
    ctx.cgContext.setStrokeColor(UIColor.white.cgColor)
    ctx.cgContext.setLineWidth(3)

    ctx.cgContext.move(to: CGPoint(x: 50, y: 450))
    ctx.cgContext.addLine(to: CGPoint(x: 250, y: 50))
    ctx.cgContext.addLine(to: CGPoint(x: 450, y: 450))
    ctx.cgContext.addLine(to: CGPoint(x: 50, y: 450))

    let rectangle = CGRect(x: 0, y: 0, width: 512, height: 512)
    ctx.cgContext.addRect(rectangle)
    ctx.cgContext.drawPath(using: .fillStroke)
}
\`\`\`

Once you've mastered drawing basic lines, you can create neat effects by rotating the context as you draw, like this:

\`\`\`swift
let renderer2 = UIGraphicsImageRenderer(size: CGSize(width: 512, height: 512))
let img2 = renderer2.image { ctx in
    ctx.cgContext.setStrokeColor(UIColor.black.cgColor)

    ctx.cgContext.translateBy(x: 256, y: 256)

    var first = true
    var length: CGFloat = 256

    for _ in 0 ..< 256 {
        ctx.cgContext.rotate(by: CGFloat.pi / 2)

        if first {
            ctx.cgContext.move(to: CGPoint(x: length, y: 50))
            first = false
        } else {
            ctx.cgContext.addLine(to: CGPoint(x: length, y: 50))
        }

        length *= 0.99
    }

    ctx.cgContext.strokePath()
}
\`\`\`

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/core-graphics/how-to-calculate-the-point-where-two-lines-intersect">How to calculate the point where two lines intersect 
/example-code/core-graphics/how-to-use-core-graphics-blend-modes-to-draw-a-uiimage-differently">How to use Core Graphics blend modes to draw a UIImage differently</a>
`)],-1))])}const C=s(m,[["render",f],["__file","how-to-draw-lines-in-core-graphics-moveto-and-addlineto.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/example-code/core-graphics/how-to-draw-lines-in-core-graphics-moveto-and-addlineto.html","title":"How to draw lines in Core Graphics: move(to:) and addLine(to:)","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to draw lines in Core Graphics: move(to:) and addLine(to:)","description":"Article(s) > How to draw lines in Core Graphics: move(to:) and addLine(to:)","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-4.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to draw lines in Core Graphics: move(to:) and addLine(to:)"},{"property":"og:description","content":"How to draw lines in Core Graphics: move(to:) and addLine(to:)"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/core-graphics/how-to-draw-lines-in-core-graphics-moveto-and-addlineto.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/core-graphics/how-to-draw-lines-in-core-graphics-moveto-and-addlineto.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to draw lines in Core Graphics: move(to:) and addLine(to:)"}],["meta",{"property":"og:description","content":"Article(s) > How to draw lines in Core Graphics: move(to:) and addLine(to:)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-4.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to draw lines in Core Graphics: move(to:) and addLine(to:)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.7,"words":511},"filePathRelative":"hackingwithswift.com/example-code/core-graphics/how-to-draw-lines-in-core-graphics-moveto-and-addlineto.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{C as comp,y as data};
