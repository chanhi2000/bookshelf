import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,b as t,t as s,e as i,n as o,g as n,a as e,r as f,o as p}from"./app-ubLChIzZ.js";const h={},m={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"},g=t("nav",{class:"table-of-contents"},[t("ul")],-1),d=t("hr",null,null,-1),w=t("blockquote",null,[t("p",null,"Available from iOS 7.0")],-1),k=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/quick-start/swiftui/answering-the-big-question-should-you-learn-swiftui-uikit-or-both">Answering the big question: should you learn SwiftUI, UIKit, or both? 
/quick-start/swiftui/migrating-from-uikit-to-swiftui">Migrating from UIKit to SwiftUI 
/example-code/uikit/how-to-create-a-page-curl-effect-using-uipageviewcontroller">How to create a page curl effect using UIPageViewController 
/example-code/calayer/how-to-create-a-marching-ants-effect-using-linedashphase">How to create a marching ants effect using lineDashPhase 
/quick-start/swiftui/how-to-create-a-marching-ants-border-effect">How to create a marching ants border effect</a>
`)],-1);function x(r,y){const a=f("VPCard");return p(),l("div",null,[t("h1",m,[t("a",u,[t("span",null,s(r.$frontmatter.title)+" 관련",1)])]),i(a,o(n({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,d,i(a,o(n({title:"How to create a parallax effect in UIKit | UIKit - free Swift example code",desc:"How to create a parallax effect in UIKit",link:"https://hackingwithswift.com/example-code/uikit/how-to-create-a-parallax-effect-in-uikit",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,e(" TODO: 작성 "),e(`
Parallax effects have been standard since iOS 7.0, and the \`UIInterpolatingMotionEffect\` class makes this easy by automatically smoothing accelerometer input so your views can adjust to tilt data.

If you want to have a \`UIView\` respond to tilting, add this function to your code then call it on any view you want:

\`\`\`swift
func addParallaxToView(vw: UIView) {
    let amount = 100

    let horizontal = UIInterpolatingMotionEffect(keyPath: "center.x", type: .tiltAlongHorizontalAxis)
    horizontal.minimumRelativeValue = -amount
    horizontal.maximumRelativeValue = amount

    let vertical = UIInterpolatingMotionEffect(keyPath: "center.y", type: .tiltAlongVerticalAxis)
    vertical.minimumRelativeValue = -amount
    vertical.maximumRelativeValue = amount

    let group = UIMotionEffectGroup()
    group.motionEffects = [horizontal, vertical]
    vw.addMotionEffect(group)
}
\`\`\`

`),k])}const b=c(h,[["render",x],["__file","how-to-create-a-parallax-effect-in-uikit.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-create-a-parallax-effect-in-uikit.html","title":"How to create a parallax effect in UIKit","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to create a parallax effect in UIKit","description":"Article(s) > How to create a parallax effect in UIKit","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to create a parallax effect in UIKit"},{"property":"og:description","content":"How to create a parallax effect in UIKit"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-create-a-parallax-effect-in-uikit.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-create-a-parallax-effect-in-uikit.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to create a parallax effect in UIKit"}],["meta",{"property":"og:description","content":"Article(s) > How to create a parallax effect in UIKit"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to create a parallax effect in UIKit\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.19,"words":358},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-create-a-parallax-effect-in-uikit.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,v as data};
