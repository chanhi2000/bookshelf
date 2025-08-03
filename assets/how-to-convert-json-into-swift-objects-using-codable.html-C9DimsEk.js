import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,f as t,av as d,au as a,aw as i,ax as s,b as o,r as p,o as g}from"./app-CCjNjKMa.js";const h={},w={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function u(r,e){const n=p("VPCard");return g(),l("div",null,[t("h1",w,[t("a",m,[t("span",null,d(r.$frontmatter.title)+" 관련",1)])]),a(n,i(s({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),a(n,i(s({title:"How to convert JSON into Swift objects using Codable | Language - free Swift example code",desc:"How to convert JSON into Swift objects using Codable",link:"https://hackingwithswift.com/example-code/language/how-to-convert-json-into-swift-objects-using-codable",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),o(" TODO: 작성 "),o(` 
Swift’s \`Codable\` protocol makes it easy to convert JSON to native Swift structs and classes – just design data types that hold the same keys and values as your JSON, then use \`JSONDecoder\` to convert.

Here’s some example JSON we can work with:

\`\`\`swift
let jsonString = """
[
    {
        "name": "Taylor Swift",
        "age": 26
    },
    {
        "name": "Justin Bieber",
        "age": 25
    }
]
"""

let jsonData = Data(jsonString.utf8)
\`\`\`

That stores two people in an array, each with a name and an age.

We need to make a matching Swift struct that can hold those fields. The only requirement \`Codable\` has is that all the properties inside the struct also conform to \`Codable\` – in our case that’s a string and an integer, so we’re all set.

Start by adding this type:

\`\`\`swift
struct Person: Codable {
    var name: String
    var age: Int
}
\`\`\`

Now we can go ahead and decide the JSON data into an array of that \`Person\` struct. This is a throwing operation, so you need to use \`try\`. Here’s some example code:

\`\`\`swift
let decoder = JSONDecoder()

do {
    let people = try decoder.decode([Person].self, from: jsonData)
    print(people)
} catch {
    print(error.localizedDescription)
}
\`\`\`

That will result in \`people\` storing the two items from the JSON, except now they are parsed into Swift types so we can refer to them in a type-safe way.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/quick-start/concurrency/how-to-download-json-from-the-internet-and-decode-it-into-any-codable-type">How to download JSON from the internet and decode it into any Codable type 
/quick-start/concurrency/how-to-use-continuations-to-convert-completion-handlers-into-async-functions">How to use continuations to convert completion handlers into async functions 
/example-code/language/how-to-format-json-using-codable-and-pretty-printing">How to format JSON using Codable and pretty printing 
/example-code/language/how-to-sort-the-keys-of-your-json-using-codable">How to sort the keys of your JSON using Codable 
/quick-start/swiftui/observable-objects-environment-objects-and-published">Observable objects, environment objects, and @Published</a>
`)],-1))])}const y=c(h,[["render",u],["__file","how-to-convert-json-into-swift-objects-using-codable.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-convert-json-into-swift-objects-using-codable.html","title":"How to convert JSON into Swift objects using Codable","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to convert JSON into Swift objects using Codable","description":"Article(s) > How to convert JSON into Swift objects using Codable","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to convert JSON into Swift objects using Codable"},{"property":"og:description","content":"How to convert JSON into Swift objects using Codable"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-convert-json-into-swift-objects-using-codable.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-convert-json-into-swift-objects-using-codable.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to convert JSON into Swift objects using Codable"}],["meta",{"property":"og:description","content":"Article(s) > How to convert JSON into Swift objects using Codable"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to convert JSON into Swift objects using Codable\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.7,"words":510},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-convert-json-into-swift-objects-using-codable.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,S as data};
