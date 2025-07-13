import{_ as w}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as t,av as l,au as n,aw as a,ax as r,b as e,r as h,o as f}from"./app-Bd1z_vEL.js";const p={},d={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function u(s,i){const o=h("VPCard");return f(),c("div",null,[t("h1",d,[t("a",m,[t("span",null,l(s.$frontmatter.title)+" 관련",1)])]),n(o,a(r({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),i[0]||(i[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),i[1]||(i[1]=t("hr",null,null,-1)),n(o,a(r({title:"How to flip a UIView with a 3D effect: transition(with:) | UIKit - free Swift example code",desc:"How to flip a UIView with a 3D effect: transition(with:)",link:"https://hackingwithswift.com/example-code/uikit/how-to-fix-the-error-failed-to-instantiate-the-default-view-controller-for-uimainstoryboardfile",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),i[2]||(i[2]=t("blockquote",null,[t("p",null,"Available from iOS 2.0")],-1)),e(" TODO: 작성 "),e(`
iOS has a built-in way to transition between views, and you can use this to produce 3D flips in just a few lines of code. Here's a basic example that flips between two views:

\`\`\`swift
@objc func flip() {
    let transitionOptions: UIView.AnimationOptions = [.transitionFlipFromRight, .showHideTransitionViews]

    UIView.transition(with: firstView, duration: 1.0, options: transitionOptions, animations: {
        self.firstView.isHidden = true
    })

    UIView.transition(with: secondView, duration: 1.0, options: transitionOptions, animations: {
        self.secondView.isHidden = false
    })
}
\`\`\`

Here's a basic test harness you can use to see that method in action:

\`\`\`swift
var firstView: UIView!
var secondView: UIView!

override func viewDidLoad() {
    super.viewDidLoad()

    firstView = UIView(frame: CGRect(x: 32, y: 32, width: 128, height: 128))
    secondView = UIView(frame: CGRect(x: 32, y: 32, width: 128, height: 128))

    firstView.backgroundColor = UIColor.red
    secondView.backgroundColor = UIColor.blue

    secondView.isHidden = true

    view.addSubview(firstView)
    view.addSubview(secondView)

    perform(#selector(flip), with: nil, afterDelay: 2)
}
\`\`\`

Try experimenting with the different values of \`UIView.AnimationOptions\` to see what other animations are available.

`),i[3]||(i[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/quick-start/swiftui/how-to-create-a-custom-transition">How to create a custom transition 
/example-code/games/how-to-change-skscene-with-a-transition-presentscene">How to change SKScene with a transition: presentScene() 
/quick-start/swiftui/how-to-add-and-remove-views-with-a-transition">How to add and remove views with a transition 
/quick-start/swiftui/how-to-make-views-scroll-with-a-custom-transition">How to make views scroll with a custom transition 
/example-code/uikit/how-to-mask-one-uiview-using-another-uiview">How to mask one UIView using another UIView</a>
`)],-1))])}const v=w(p,[["render",u],["__file","how-to-flip-a-uiview-with-a-3d-effect-transitionwith.html.vue"]]),V=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-flip-a-uiview-with-a-3d-effect-transitionwith.html","title":"How to flip a UIView with a 3D effect: transition(with:)","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to flip a UIView with a 3D effect: transition(with:)","description":"Article(s) > How to flip a UIView with a 3D effect: transition(with:)","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to flip a UIView with a 3D effect: transition(with:)"},{"property":"og:description","content":"How to flip a UIView with a 3D effect: transition(with:)"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-fix-the-error-failed-to-instantiate-the-default-view-controller-for-uimainstoryboardfile.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-flip-a-uiview-with-a-3d-effect-transitionwith.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to flip a UIView with a 3D effect: transition(with:)"}],["meta",{"property":"og:description","content":"Article(s) > How to flip a UIView with a 3D effect: transition(with:)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to flip a UIView with a 3D effect: transition(with:)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.47,"words":441},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-flip-a-uiview-with-a-3d-effect-transitionwith.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,V as data};
