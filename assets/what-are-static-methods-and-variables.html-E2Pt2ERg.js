import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as t,t as l,e as i,n as o,g as n,a as e,r as h,o as d}from"./app-ubLChIzZ.js";const p={},m={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},u=t("nav",{class:"table-of-contents"},[t("ul")],-1),w=t("hr",null,null,-1),f=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1),y=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/quick-start/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts">How to use Instruments to profile your SwiftUI code and identify slow layouts</a>
`)],-1);function b(r,v){const a=h("VPCard");return d(),c("div",null,[t("h1",m,[t("a",g,[t("span",null,l(r.$frontmatter.title)+" 관련",1)])]),i(a,o(n({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),u,w,i(a,o(n({title:"What are static methods and variables? | Language - free Swift example code",desc:"What are static methods and variables?",link:"https://hackingwithswift.com/example-code/language/what-are-static-methods-and-variables",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,e(" TODO: 작성 "),e(` 
Static methods and variables belong to the type that defined them, rather than instances of that type. For example, we could create a struct to track taxis in a city, like this:

\`\`\`swift
struct Taxi1 {
    var ownerName: String
    var licensePlate: String
}
\`\`\`

Each instance of that struct will have its own \`ownerName\` and \`licensePlate\` property strings. However, if we made a *static* property inside that struct then it would be shared by all taxis. For example, we could add this property to store how many taxis exist in the city:

\`\`\`swift
struct Taxi2 {
    var ownerName: String
    var licensePlate: String
    static var count: Int = 0
}
\`\`\`

When we want to reference that property we need to use \`Taxi2.count\`, because it belongs to the struct not to instances of that struct.

The same is true of static methods, which are sometimes called “type methods” – they belong to the struct or class that defined them rather than instance of the class. In practice that means you can’t use \`self\` inside the method because there is no instance to refer to.

`),y])}const _=s(p,[["render",b],["__file","what-are-static-methods-and-variables.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-are-static-methods-and-variables.html","title":"What are static methods and variables?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What are static methods and variables?","description":"Article(s) > What are static methods and variables?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What are static methods and variables?"},{"property":"og:description","content":"What are static methods and variables?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-are-static-methods-and-variables.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-are-static-methods-and-variables.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What are static methods and variables?"}],["meta",{"property":"og:description","content":"Article(s) > What are static methods and variables?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What are static methods and variables?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.43,"words":430},"filePathRelative":"hackingwithswift.com/example-code/language/what-are-static-methods-and-variables.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{_ as comp,S as data};
