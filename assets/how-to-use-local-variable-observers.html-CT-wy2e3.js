import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as e,as as p,ao as r,at as l,au as i,ak as a,aq as h,ar as m}from"./app-CpYYKbnj.js";const d={},u={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function b(n,t){const o=h("VPCard");return m(),c("div",null,[e("h1",u,[e("a",g,[e("span",null,p(n.$frontmatter.title)+" 관련",1)])]),r(o,l(i({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),r(o,l(i({title:"How to use local variable observers | Language - free Swift example code",desc:"How to use local variable observers",link:"https://hackingwithswift.com/example-code/language/how-to-use-local-variable-observers",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),a(" TODO: 작성 "),a(` 
You should already be familiar with the concept of property observers in Swift – those \`willSet\` and \`didSet\` blocks you can attach to property on classes and structs. Well, those same blocks can be attached to local and global variables as well, allowing you to respond to changes easily.

The syntax is identical: create your variable, give it an initial value, then provide \`willSet\` and/or \`didSet\` closures inside braces, like this:

\`\`\`swift
var name = "Taylor Swift" {
    didSet {
        print("Name changed to \\(name)!")
    }
}

name = "Justin Bieber"
\`\`\`

That will print “Name changed to Justin Bieber!” when run.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),a(`
/example-code/language/whats-the-difference-between-a-static-variable-and-a-class-variable">What’s the difference between a static variable and a class variable? 
/quick-start/concurrency/how-to-create-and-use-task-local-values">How to create and use task local values 
/example-code/language/what-are-property-observers">What are property observers? 
/example-code/system/how-to-set-local-alerts-using-unnotificationcenter">How to set local alerts using UNNotificationCenter 
/quick-start/swiftui/whats-the-difference-between-observedobject-state-and-environmentobject">What’s the difference between @ObservedObject, @State, and @EnvironmentObject?</a>
`)],-1))])}const f=s(d,[["render",b],["__file","how-to-use-local-variable-observers.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-use-local-variable-observers.html","title":"How to use local variable observers","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to use local variable observers","description":"Article(s) > How to use local variable observers","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to use local variable observers"},{"property":"og:description","content":"How to use local variable observers"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-use-local-variable-observers.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-use-local-variable-observers.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to use local variable observers"}],["meta",{"property":"og:description","content":"Article(s) > How to use local variable observers"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to use local variable observers\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.13,"words":340},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-use-local-variable-observers.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{f as comp,y as data};