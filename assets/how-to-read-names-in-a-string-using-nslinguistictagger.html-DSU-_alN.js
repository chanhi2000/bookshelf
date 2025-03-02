import{_ as g}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as t,as as l,ao as a,at as o,au as s,ak as n,aq as m,ar as u}from"./app-Dbtze28S.js";const p={},h={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function w(r,e){const i=m("VPCard");return u(),c("div",null,[t("h1",h,[t("a",d,[t("span",null,l(r.$frontmatter.title)+" 관련",1)])]),a(i,o(s({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),a(i,o(s({title:"How to read names in a string using NSLinguisticTagger | System - free Swift example code",desc:"How to read names in a string using NSLinguisticTagger",logo:"https://hackingwithswift.com/favicon.svg",link:"https://hackingwithswift.com/example-code/how-to-read-names-in-a-string-using-nslinguistictagger",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 5.0")],-1)),n(" TODO: 작성 "),n(` 
Foundation has a built-in class to parse strings of text, and it includes some useful options to extra names of people, places, organizations, and more. 

To try it out, consider this string:

\`\`\`swift
let text = "Apple Computer was established in Cupertino by Steve Jobs, Steve Wozniak, and Ronald Wayne."
\`\`\`

That contains a company name, a place name, and three names of people all in one, and we can use \`NSLinguisticTagger\` to pull them all out. 

First you create a linguistic tagger and tell it to look for the names of things inside that text string:

\`\`\`swift
let tagger = NSLinguisticTagger(tagSchemes: [.nameType], options: 0)
tagger.string = text
\`\`\`

Next you create the range to scan. This is done using the older \`NSRange\` type, like this:

\`\`\`swift
let range = NSRange(location: 0, length: text.utf16.count)
\`\`\`

Third, you tell \`NSLinguisticTagger\` what it should look for and how it should scan. One useful option here is \`.joinNames\`, which means it will return “Steve Jobs” as a single name rather than as two individual names:

\`\`\`swift
let options: NSLinguisticTagger.Options = [.omitPunctuation, .omitWhitespace, .joinNames]
let tags: [NSLinguisticTag] = [.personalName, .placeName, .organizationName]
\`\`\`

Finally, you tell \`NSLinguisticTagger\` to enumerate the tags in the input string, filter out any that aren’t in the \`tags\` array we’re looking for, convert the \`NSRange\` back to a Swift range, then print out each match:

\`\`\`swift
tagger.enumerateTags(in: range, unit: .word, scheme: .nameType, options: options) { tag, tokenRange, stop in
    if let tag = tag, tags.contains(tag) {
        if let range = Range(tokenRange, in: text) {
            let name = text[range]
            print("\\(name): \\(tag)")
        }
    }
}
\`\`\`

That will find the company, organization, and three people names in our string – nice!

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),n(`
/example-code/strings/how-to-parse-a-sentence-using-nslinguistictagger">How to parse a sentence using NSLinguisticTagger 
/quick-start/swiftui/how-to-create-multi-column-lists-using-table">How to create multi-column lists using Table 
/example-code/system/how-to-convert-dates-and-times-to-a-string-using-dateformatter">How to convert dates and times to a string using DateFormatter 
/example-code/strings/how-to-read-a-single-character-from-a-string">How to read a single character from a string 
/quick-start/swiftui/how-to-read-user-contacts-with-contactaccessbutton">How to read user contacts with ContactAccessButton</a>
`)],-1))])}const S=g(p,[["render",w],["__file","how-to-read-names-in-a-string-using-nslinguistictagger.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-read-names-in-a-string-using-nslinguistictagger.html","title":"How to read names in a string using NSLinguisticTagger","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to read names in a string using NSLinguisticTagger","description":"Article(s) > How to read names in a string using NSLinguisticTagger","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-5.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to read names in a string using NSLinguisticTagger"},{"property":"og:description","content":"How to read names in a string using NSLinguisticTagger"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-read-names-in-a-string-using-nslinguistictagger.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-read-names-in-a-string-using-nslinguistictagger.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to read names in a string using NSLinguisticTagger"}],["meta",{"property":"og:description","content":"Article(s) > How to read names in a string using NSLinguisticTagger"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-5.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to read names in a string using NSLinguisticTagger\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.81,"words":544},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-read-names-in-a-string-using-nslinguistictagger.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{S as comp,k as data};
