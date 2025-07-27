import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as t,av as p,au as a,aw as i,ax as r,b as o,r as d,o as g}from"./app-n2Oj_rFs.js";const h={},m={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"};function w(s,e){const n=d("VPCard");return g(),c("div",null,[t("h1",m,[t("a",u,[t("span",null,p(s.$frontmatter.title)+" 관련",1)])]),a(n,i(r({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),a(n,i(r({title:"How to parse JSON using JSONSerialization | System - free Swift example code",desc:"How to parse JSON using JSONSerialization",logo:"https://hackingwithswift.com/favicon.svg",link:"https://hackingwithswift.com/example-code/how-to-parse-json-using-jsonserialization",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 5.0")],-1)),o(" TODO: 작성 "),o(` 
If you want to parse JSON by hand rather than using \`Codable\`, iOS has a built-in alternative called \`JSONSerialization\` and it can convert a JSON string into a collection of dictionaries, arrays, strings and numbers in just a few lines of code.

In the example below, I create a dummy piece of JSON that contains three names in an array cunningly called “names”. This then gets sent to \`JSONSerialization\` (by converting it into a \`Data\` object, which is how \`JSONSerialization\` likes to receive its content), and I conditionally pull out and print the \`names\` array:

\`\`\`swift
let str = "{\\"names\\": [\\"Bob\\", \\"Tim\\", \\"Tina\\"]}"
let data = Data(str.utf8)

do {
    // make sure this JSON is in the format we expect
    if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
        // try to read out a string array
        if let names = json["names"] as? [String] {
            print(names)
        }
    }
} catch let error as NSError {
    print("Failed to load: \\(error.localizedDescription)")
}
\`\`\`

There are a couple of things that might confuse you there. First, because parsing JSON will fail if the JSON isn't valid, you need to use try/catch and have some sort of error handling. Second, you need to typecast my example JSON to be a dictionary of type \`[String: Any]\` so that you can start working with your JSON values. Third, you don't know for sure that any values exist inside the JSON, so you need to conditionally check for and unwrap the \`names\` value.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/example-code/libraries/how-to-parse-json-using-swiftyjson">How to parse JSON using SwiftyJSON 
/example-code/strings/how-to-parse-a-sentence-using-nslinguistictagger">How to parse a sentence using NSLinguisticTagger 
/quick-start/concurrency/how-to-download-json-from-the-internet-and-decode-it-into-any-codable-type">How to download JSON from the internet and decode it into any Codable type 
/example-code/language/how-to-format-json-using-codable-and-pretty-printing">How to format JSON using Codable and pretty printing 
/example-code/language/how-to-convert-json-into-swift-objects-using-codable">How to convert JSON into Swift objects using Codable</a>
`)],-1))])}const y=l(h,[["render",w],["__file","how-to-parse-json-using-jsonserialization.html.vue"]]),O=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-parse-json-using-jsonserialization.html","title":"How to parse JSON using JSONSerialization","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to parse JSON using JSONSerialization","description":"Article(s) > How to parse JSON using JSONSerialization","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-5.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to parse JSON using JSONSerialization"},{"property":"og:description","content":"How to parse JSON using JSONSerialization"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-parse-json-using-jsonserialization.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-parse-json-using-jsonserialization.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to parse JSON using JSONSerialization"}],["meta",{"property":"og:description","content":"Article(s) > How to parse JSON using JSONSerialization"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-5.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to parse JSON using JSONSerialization\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.68,"words":503},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-parse-json-using-jsonserialization.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{y as comp,O as data};
