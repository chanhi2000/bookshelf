import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as t,as as c,ao as n,at as i,au as s,ak as a,aq as p,ar as m}from"./app-BYoUe6Ce.js";const u={},g={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"};function w(r,e){const o=p("VPCard");return m(),l("div",null,[t("h1",g,[t("a",h,[t("span",null,c(r.$frontmatter.title)+" 관련",1)])]),n(o,i(s({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),n(o,i(s({title:"How to use Codable to load and save custom data types | Language - free Swift example code",desc:"How to use Codable to load and save custom data types",link:"https://hackingwithswift.com/example-code/language/how-to-use-codable-to-load-and-save-custom-data-types",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),a(" TODO: 작성 "),a(` 
Swift 4 introduced a new way to load and save data, replacing the old \`NSCoding\` protocol with something that’s more flexible, safer, and easier to write: \`Codable\`.

Unless you want a custom implementation, just making your data type conform to \`Codable\` is all it takes to allow it to be saved to property list XML or JSON.

For example, here’s a custom struct that conforms to \`Codable\`, along with a few instances of it:

\`\`\`swift
struct Language: Codable {
    var name: String
    var version: Int
}

let swift = Language(name: "Swift", version: 4)
let php = Language(name: "PHP", version: 7)
let perl = Language(name: "Perl", version: 6)
\`\`\`

You can see I've marked the Language struct as conforming to the \`Codable\` protocol – there’s no need to add custom loading and saving code like we had with \`NSCoding\`.

With that one tiny conformance, we can convert it to a \`Data\` representation of JSON like this:

\`\`\`swift
let encoder = JSONEncoder()
if let encoded = try? encoder.encode(swift) {
    // save \`encoded\` somewhere
}
\`\`\`

Swift will automatically encode all properties inside your data type – you don't need to do anything.

To prove that everything is working well, we can try converting that \`Data\` object into a string so we can print it out, then decode it back into a new Language instance that we can read from:

\`\`\`swift
if let encoded = try? encoder.encode(swift) {
    if let json = String(data: encoded, encoding: .utf8) {
        print(json)
    }

    let decoder = JSONDecoder()
    if let decoded = try? decoder.decode(Language.self, from: encoded) {
        print(decoded.name)
    }
}
\`\`\`

Notice how decoding doesn't require a typecast – you provide the data type name as its first parameter, so Swift infers the return type from there.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),a(`
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/how-to-save-and-load-navigationstack-paths-using-codable">How to save and load NavigationStack paths using Codable 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode</a>
`)],-1))])}const v=d(u,[["render",w],["__file","how-to-use-codable-to-load-and-save-custom-data-types.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-use-codable-to-load-and-save-custom-data-types.html","title":"How to use Codable to load and save custom data types","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to use Codable to load and save custom data types","description":"Article(s) > How to use Codable to load and save custom data types","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to use Codable to load and save custom data types"},{"property":"og:description","content":"How to use Codable to load and save custom data types"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-use-codable-to-load-and-save-custom-data-types.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-use-codable-to-load-and-save-custom-data-types.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to use Codable to load and save custom data types"}],["meta",{"property":"og:description","content":"Article(s) > How to use Codable to load and save custom data types"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to use Codable to load and save custom data types\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.89,"words":567},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-use-codable-to-load-and-save-custom-data-types.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,b as data};
