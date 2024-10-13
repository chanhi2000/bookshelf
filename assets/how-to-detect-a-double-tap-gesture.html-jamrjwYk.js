import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as t,t as l,e as a,n as i,g as r,a as e,r as d,o as p}from"./app-TWLwS86W.js";const u={},h={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},m=t("nav",{class:"table-of-contents"},[t("ul")],-1),w=t("hr",null,null,-1),f=t("blockquote",null,[t("p",null,"Available from iOS 3.2")],-1),b=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/quick-start/swiftui/how-to-read-tap-and-double-tap-gestures">How to read tap and double-tap gestures 
/quick-start/swiftui/how-to-detect-the-location-of-a-tap-inside-a-view">How to detect the location of a tap inside a view 
/quick-start/swiftui/how-to-add-a-gesture-recognizer-to-a-view">How to add a gesture recognizer to a view 
/example-code/uikit/how-to-let-users-tap-on-a-uitableviewcell-while-editing-is-enabled">How to let users tap on a UITableViewCell while editing is enabled 
/example-code/uikit/how-to-make-gesture-recognizers-work-together-using-requiretofail">How to make gesture recognizers work together using require(toFail:)</a>
`)],-1);function k(n,y){const o=d("VPCard");return p(),s("div",null,[t("h1",h,[t("a",g,[t("span",null,l(n.$frontmatter.title)+" 관련",1)])]),a(o,i(r({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),m,w,a(o,i(r({title:"How to detect a double tap gesture | UIKit - free Swift example code",desc:"How to detect a double tap gesture",link:"https://hackingwithswift.com/example-code/uikit/how-to-detect-a-double-tap-gesture",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,e(" TODO: 작성 "),e(`
The iOS \`UITapGestureRecognizer\` class has a built-in way to detect a double tap on any view. All you need to do is create the recognizer, set its \`numberOfTapsRequired\` property to 2, then add it to the view you want to monitor.

Here's an example:

\`\`\`swift
override func viewDidLoad() {
    super.viewDidLoad()

    let tap = UITapGestureRecognizer(target: self, action: #selector(doubleTapped))
    tap.numberOfTapsRequired = 2
    view.addGestureRecognizer(tap)
}

@objc func doubleTapped() {
    // do something here
}
\`\`\`

`),b])}const x=c(u,[["render",k],["__file","how-to-detect-a-double-tap-gesture.html.vue"]]),H=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-detect-a-double-tap-gesture.html","title":"How to detect a double tap gesture","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to detect a double tap gesture","description":"Article(s) > How to detect a double tap gesture","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-3.2","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to detect a double tap gesture"},{"property":"og:description","content":"How to detect a double tap gesture"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-detect-a-double-tap-gesture.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-detect-a-double-tap-gesture.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to detect a double tap gesture"}],["meta",{"property":"og:description","content":"Article(s) > How to detect a double tap gesture"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-3.2"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to detect a double tap gesture\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.15,"words":345},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-detect-a-double-tap-gesture.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,H as data};
