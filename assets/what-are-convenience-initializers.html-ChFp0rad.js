import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as e,av as h,au as a,aw as o,ax as r,b as i,r as p,o as g}from"./app-BdFl9trH.js";const m={},d={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,t){const n=p("VPCard");return g(),c("div",null,[e("h1",d,[e("a",u,[e("span",null,h(s.$frontmatter.title)+" 관련",1)])]),a(n,o(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),a(n,o(r({title:"What are convenience initializers? | Language - free Swift example code",desc:"What are convenience initializers?",link:"https://hackingwithswift.com/example-code/language/what-are-convenience-initializers",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),i(" TODO: 작성 "),i(` 
Designated initializers are the default way of creating new instances of a type. There are others, known as convenience initializers, that are there to help you accomplish common tasks more easily, but those are in addition to your designated initializers rather than a replacement.

For example, you might have a \`Polygon\` class that stores sets of points to be drawn later on, like this:

\`\`\`swift
class Polygon {
    var points: [CGPoint]

    init(points: [CGPoint]) {
        self.points = points
    }
}
\`\`\`

Now, if that were just a struct you could go ahead and add other initializers. But as it’s a *class* – where the rules for initialization are quite complex – you could add a convenience initializer that sets up squares of a specific length, like this:

\`\`\`swift
convenience init(squareWithLength length: CGFloat) {
    let points = [
        CGPoint(x: 0, y: 0),
        CGPoint(x: length, y: 0),
        CGPoint(x: length, y: length),
        CGPoint(x: 0, y: length),
    ]

    self.init(points: points)
}
\`\`\`

Note how the convenience initializer ends by calling the designated initializer – this is a requirement, and means that your convenience initializers are only responsible for setting up the parts that are unique to them rather than doing everything.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),i(`
/example-code/language/what-are-designated-initializers">What are designated initializers? 
/example-code/language/fixing-class-viewcontroller-has-no-initializers">Fixing "Class ViewController has no initializers" 
/example-code/uicolor/how-to-convert-a-html-name-string-into-a-uicolor">How to convert a HTML name string into a UIColor 
/quick-start/concurrency/what-is-an-actor-and-why-does-swift-have-them">What is an actor and why does Swift have them? 
/quick-start/swiftui/whats-the-difference-between-observedobject-state-and-environmentobject">What’s the difference between @ObservedObject, @State, and @EnvironmentObject?</a>
`)],-1))])}const y=l(m,[["render",f],["__file","what-are-convenience-initializers.html.vue"]]),z=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-are-convenience-initializers.html","title":"What are convenience initializers?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What are convenience initializers?","description":"Article(s) > What are convenience initializers?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What are convenience initializers?"},{"property":"og:description","content":"What are convenience initializers?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-are-convenience-initializers.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-are-convenience-initializers.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What are convenience initializers?"}],["meta",{"property":"og:description","content":"Article(s) > What are convenience initializers?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What are convenience initializers?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.39,"words":418},"filePathRelative":"hackingwithswift.com/example-code/language/what-are-convenience-initializers.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,z as data};
