import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,f as e,av as d,au as a,aw as r,ax as o,b as n,r as p,o as h}from"./app-Bhu0350G.js";const f={},u={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function w(s,t){const i=p("VPCard");return h(),l("div",null,[e("h1",u,[e("a",m,[e("span",null,d(s.$frontmatter.title)+" 관련",1)])]),a(i,r(o({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),a(i,r(o({title:"What’s the difference between init?() and init()? | Language - free Swift example code",desc:"What’s the difference between init?() and init()?",link:"https://hackingwithswift.com/example-code/language/whats-the-difference-between-init-and-init",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),n(" TODO: 작성 "),n(` 
It’s the job of a regular Swift initializer to create a fully fledged instance of a new type, however sometimes the data that has been provided is insufficient or incorrect, and creation can’t proceed.

For example, consider this code:

\`\`\`swift
struct Person {
    var ssn: String

    init(socialSecurityNumber: String) {
        self.ssn = socialSecurityNumber
    }
}

let person = Person(socialSecurityNumber: "111-11-1111")
print(person)
\`\`\`

That defines a \`Person\` struct that can be created using a nine-digit social security number, then creates an instance of that struct.

But what should happen here?

\`\`\`swift
let person = Person(socialSecurityNumber: "FISH")
\`\`\`

In that instance we’re passing an invalid social security number, so really we expect creating a \`Person\` to fail. 

This is where failable initializers come in: they are written as \`init?()\`, and can return nil rather than a value if something goes wrong during creation. For example, we could write a quick check to make sure the social security number is more or less correct like this:

\`\`\`swift
struct Person {
    var ssn: String

    init?(socialSecurityNumber: String) {
        if socialSecurityNumber.count < 11 {
            return nil
        } else {
            self.ssn = socialSecurityNumber
        }
    }
}
\`\`\`

Notice the initializer is now called \`init?()\` to reflect that it returns an optional – the process might return \`nil\` if the creation fails. The logic is pretty simple: if there are 11 digits we assume it’s correct, otherwise we return nil. Note: if you *really* wanted to validate that number you’d need to use a regular expression.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),n(`
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/quick-start/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts">How to use Instruments to profile your SwiftUI code and identify slow layouts</a>
`)],-1))])}const b=c(f,[["render",w],["__file","whats-the-difference-between-init-and-init.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/whats-the-difference-between-init-and-init.html","title":"What’s the difference between init?() and init()?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What’s the difference between init?() and init()?","description":"Article(s) > What’s the difference between init?() and init()?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What’s the difference between init?() and init()?"},{"property":"og:description","content":"What’s the difference between init?() and init()?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/whats-the-difference-between-init-and-init.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/whats-the-difference-between-init-and-init.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What’s the difference between init?() and init()?"}],["meta",{"property":"og:description","content":"Article(s) > What’s the difference between init?() and init()?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What’s the difference between init?() and init()?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.69,"words":507},"filePathRelative":"hackingwithswift.com/example-code/language/whats-the-difference-between-init-and-init.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,k as data};
