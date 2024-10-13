import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as r,b as e,t as d,e as i,n as a,g as n,a as t,r as l,o as p}from"./app-TWLwS86W.js";const g={},h={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},m=e("nav",{class:"table-of-contents"},[e("ul")],-1),u=e("hr",null,null,-1),f=e("blockquote",null,[e("p",null,"Available from iOS 7.0")],-1),k=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/uikit/how-to-make-uitableviewcell-separators-go-edge-to-edge">How to make UITableViewCell separators go edge to edge 
/example-code/arkit/how-to-detect-images-using-arimagetrackingconfiguration">How to detect images using ARImageTrackingConfiguration 
/quick-start/swiftui/how-to-detect-the-location-of-a-tap-inside-a-view">How to detect the location of a tap inside a view 
/example-code/uikit/how-to-detect-keyboard-input-using-pressesbegan-and-pressesended">How to detect keyboard input using pressesBegan() and pressesEnded() 
/example-code/media/cidetectortypeface-how-to-detect-faces-in-a-uiimage">CIDetectorTypeFace: How to detect faces in a UIImage</a>
`)],-1);function y(s,_){const o=l("VPCard");return p(),r("div",null,[e("h1",h,[e("a",w,[e("span",null,d(s.$frontmatter.title)+" 관련",1)])]),i(o,a(n({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),m,u,i(o,a(n({title:"How to detect edge swipes | UIKit - free Swift example code",desc:"How to detect edge swipes",link:"https://hackingwithswift.com/example-code/uikit/how-to-detect-edge-swipes",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,t(" TODO: 작성 "),t(`
Detecting pan gestures is easy enough with a regular \`UIPanGestureRecognizer\`, but there's a special gesture recognizer to use if you want to detect the user swiping from the edge of their screen. The example below demonstrates detecting the user swiping from the left edge of the screen:

\`\`\`swift
override func viewDidLoad() {
    super.viewDidLoad()

    let edgePan = UIScreenEdgePanGestureRecognizer(target: self, action: #selector(screenEdgeSwiped))
    edgePan.edges = .left

    view.addGestureRecognizer(edgePan)
}

@objc func screenEdgeSwiped(_ recognizer: UIScreenEdgePanGestureRecognizer) {
    if recognizer.state == .recognized {
        print("Screen edge swiped!")
    }
}
\`\`\`

`),k])}const v=c(g,[["render",y],["__file","how-to-detect-edge-swipes.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-detect-edge-swipes.html","title":"How to detect edge swipes","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to detect edge swipes","description":"Article(s) > How to detect edge swipes","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to detect edge swipes"},{"property":"og:description","content":"How to detect edge swipes"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-detect-edge-swipes.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-detect-edge-swipes.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to detect edge swipes"}],["meta",{"property":"og:description","content":"Article(s) > How to detect edge swipes"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to detect edge swipes\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.08,"words":324},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-detect-edge-swipes.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,S as data};
