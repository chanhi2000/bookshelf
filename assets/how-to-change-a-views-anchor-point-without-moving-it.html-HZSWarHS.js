import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as t,t as h,e as i,n,g as a,a as o,r as l,o as p}from"./app-DLPYIRXq.js";const w={},g={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"},d=t("nav",{class:"table-of-contents"},[t("ul")],-1),u=t("hr",null,null,-1),f=t("blockquote",null,[t("p",null,"Available from iOS 2.0")],-1),v=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/how-to-detect-whether-a-scrollview-is-currently-moving-or-is-idle">How to detect whether a scrollview is currently moving or is idle 
/example-code/language/how-to-add-a-custom-initializer-to-a-struct-without-losing-its-memberwise-initializer">How to add a custom initializer to a struct without losing its memberwise initializer 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/example-code/strings/how-to-specify-floating-point-precision-in-a-string">How to specify floating-point precision in a string 
/example-code/core-graphics/how-to-calculate-the-point-where-two-lines-intersect">How to calculate the point where two lines intersect</a>
`)],-1);function y(r,x){const e=l("VPCard");return p(),s("div",null,[t("h1",g,[t("a",m,[t("span",null,h(r.$frontmatter.title)+" 관련",1)])]),i(e,n(a({title:"CALayer - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/calayer/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),d,u,i(e,n(a({title:"How to change a view’s anchor point without moving it | CALayer - free Swift example code",desc:"How to change a view’s anchor point without moving it",link:"https://hackingwithswift.com/example-code/calayer/how-to-change-a-views-anchor-point-without-moving-it",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,o(" TODO: 작성 "),o(` 
Every \`UIView\` has an anchor point, which is the point around which animations take place. Usually this is the center of the view – X:0.5 Y:0.5 – which means if you rotate a view it will spin around its center.

If you wanted the view to rotate around its top corner, as if someone had driven a nail into that point and you were spinning the view around that corner rather than the center, you can change the anchor point using the \`layer.anchorPoint\` property.

However, there’s a problem: changing the anchor point also changes the point where the view’s position is calculated, which means changing the anchor point also moves the view’s position.

So, if you want to change a view’s anchor point *without* moving it, here’s a little extension to do just that:

\`\`\`swift
extension UIView {
    func setAnchorPoint(_ point: CGPoint) {
        var newPoint = CGPoint(x: bounds.size.width * point.x, y: bounds.size.height * point.y)
        var oldPoint = CGPoint(x: bounds.size.width * layer.anchorPoint.x, y: bounds.size.height * layer.anchorPoint.y);

        newPoint = newPoint.applying(transform)
        oldPoint = oldPoint.applying(transform)

        var position = layer.position

        position.x -= oldPoint.x
        position.x += newPoint.x

        position.y -= oldPoint.y
        position.y += newPoint.y

        layer.position = position
        layer.anchorPoint = point
    }
}
\`\`\`

If you want to see that in action, here’s some code to create a blue \`UIView\` then animate it rotating around its top-left corner:

\`\`\`swift
let box = UIView(frame: CGRect(x: 50, y: 50, width: 256, height: 256))
box.backgroundColor = .blue
view.addSubview(box)

box.setAnchorPoint(CGPoint(x: 0, y: 0))

UIView.animate(withDuration: 3) {
    box.transform = CGAffineTransform(rotationAngle: .pi)
}
\`\`\`

`),v])}const _=c(w,[["render",y],["__file","how-to-change-a-views-anchor-point-without-moving-it.html.vue"]]),P=JSON.parse('{"path":"/hackingwithswift.com/example-code/calayer/how-to-change-a-views-anchor-point-without-moving-it.html","title":"How to change a view’s anchor point without moving it","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to change a view’s anchor point without moving it","description":"Article(s) > How to change a view’s anchor point without moving it","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to change a view’s anchor point without moving it"},{"property":"og:description","content":"How to change a view’s anchor point without moving it"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-change-a-views-anchor-point-without-moving-it.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-change-a-views-anchor-point-without-moving-it.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to change a view’s anchor point without moving it"}],["meta",{"property":"og:description","content":"Article(s) > How to change a view’s anchor point without moving it"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to change a view’s anchor point without moving it\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.82,"words":546},"filePathRelative":"hackingwithswift.com/example-code/calayer/how-to-change-a-views-anchor-point-without-moving-it.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{_ as comp,P as data};
