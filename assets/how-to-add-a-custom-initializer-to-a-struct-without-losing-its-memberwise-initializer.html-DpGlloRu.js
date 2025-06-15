import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as t,av as m,au as o,aw as n,ax as s,b as i,r as u,o as d}from"./app-BGkQLgjR.js";const w={},h={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"};function g(r,e){const a=u("VPCard");return d(),c("div",null,[t("h1",h,[t("a",p,[t("span",null,m(r.$frontmatter.title)+" 관련",1)])]),o(a,n(s({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),o(a,n(s({title:"How to add a custom initializer to a struct without losing its memberwise initializer | Language - free Swift example code",desc:"How to add a custom initializer to a struct without losing its memberwise initializer",link:"https://hackingwithswift.com/example-code/language/how-to-add-a-custom-initializer-to-a-struct-without-losing-its-memberwise-initializer",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),i(" TODO: 작성 "),i(` 
All structs in Swift come with a default memberwise initializer, which is an initializer that accepts values for all the properties in the struct. However, as soon as you add your *own* initializer to the struct that memberwise initializer goes away, because it’s possible you’re doing special work that the default initializer isn’t aware of.

If you want to keep both the default initializer and your own custom ones, there’s a simple trick: create your initializers inside an extension rather than as part of the main struct definition.

For example:

\`\`\`swift
struct Person {
    var firstName: String
    var lastName: String
}

extension Person {
    init(name: String) {
        let split = name.components(separatedBy: " ")
        firstName = split.first ?? ""
        lastName = split.last ?? ""
    }
}
\`\`\`

Because my custom initializer is inside an extension, you can create instances of \`Person\` in two ways:

\`\`\`swift
let taylor1 = Person(firstName: "Taylor", lastName: "Swift")
let taylor2 = Person(name: "Taylor Swift")
\`\`\`

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),i(`
/example-code/calayer/how-to-change-a-views-anchor-point-without-moving-it">How to change a view’s anchor point without moving it 
/quick-start/swiftui/how-to-create-modifiers-for-a-uiviewrepresentable-struct">How to create modifiers for a UIViewRepresentable struct 
/example-code/language/whats-the-difference-between-a-class-and-a-struct">What’s the difference between a class and a struct? 
/example-code/language/what-is-a-nested-class-or-nested-struct">What is a nested class or nested struct? 
/example-code/system/how-to-load-and-save-a-struct-in-userdefaults-using-codable">How to load and save a struct in UserDefaults using Codable</a>
`)],-1))])}const z=l(w,[["render",g],["__file","how-to-add-a-custom-initializer-to-a-struct-without-losing-its-memberwise-initializer.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-add-a-custom-initializer-to-a-struct-without-losing-its-memberwise-initializer.html","title":"How to add a custom initializer to a struct without losing its memberwise initializer","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to add a custom initializer to a struct without losing its memberwise initializer","description":"Article(s) > How to add a custom initializer to a struct without losing its memberwise initializer","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to add a custom initializer to a struct without losing its memberwise initializer"},{"property":"og:description","content":"How to add a custom initializer to a struct without losing its memberwise initializer"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-add-a-custom-initializer-to-a-struct-without-losing-its-memberwise-initializer.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-add-a-custom-initializer-to-a-struct-without-losing-its-memberwise-initializer.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to add a custom initializer to a struct without losing its memberwise initializer"}],["meta",{"property":"og:description","content":"Article(s) > How to add a custom initializer to a struct without losing its memberwise initializer"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to add a custom initializer to a struct without losing its memberwise initializer\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.58,"words":473},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-add-a-custom-initializer-to-a-struct-without-losing-its-memberwise-initializer.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{z as comp,y as data};
