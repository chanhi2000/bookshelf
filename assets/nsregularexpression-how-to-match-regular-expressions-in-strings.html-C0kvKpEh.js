import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as e,as as g,ao as a,at as i,au as r,ak as n,aq as p,ar as h}from"./app-CpYYKbnj.js";const m={},u={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function w(o,t){const s=p("VPCard");return h(),c("div",null,[e("h1",u,[e("a",d,[e("span",null,g(o.$frontmatter.title)+" 관련",1)])]),a(s,i(r({title:"Strings - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/strings/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),a(s,i(r({title:"NSRegularExpression: How to match regular expressions in strings | Strings - free Swift example code",desc:"NSRegularExpression: How to match regular expressions in strings",link:"https://hackingwithswift.com/example-code/strings/nsregularexpression-how-to-match-regular-expressions-in-strings",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 4.0")],-1)),n(" TODO: 작성 "),n(` 
The \`NSRegularExpression\` class lets you find and replace substrings using regular expressions, which are concise and flexible descriptions of text. For example, if we wanted to pull "Taylor Swift" out of the string "My name is Taylor Swift", we could write a regular expression that matches the text "My name is " followed by any text, then pass that to the \`NSRegularExpression\` class.

The example below does just that. Note that we need to pull out the second match range because the first range is the entire matched string, whereas the second range is just the "Taylor Swift" part:

\`\`\`swift
do {
    let input = "My name is Taylor Swift"
    let regex = try NSRegularExpression(pattern: "My name is (.*)", options: NSRegularExpression.Options.caseInsensitive)
    let matches = regex.matches(in: input, options: [], range: NSRange(location: 0, length: input.utf16.count))

    if let match = matches.first {
        let range = match.range(at:1)
        if let swiftRange = Range(range, in: input) {
            let name = input[swiftRange]
        }
    }
} catch {
    // regex was bad!
}
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),n(`
/example-code/language/check-whether-all-items-in-an-array-match-a-condition">Check whether all items in an array match a condition 
/example-code/language/checking-all-array-elements-match-a-condition-allsatisfy">Checking all array elements match a condition: allSatisfy() 
/example-code/strings/how-to-use-string-interpolation-to-combine-strings-integers-and-doubles">How to use string interpolation to combine strings, integers and doubles 
/example-code/strings/how-do-you-make-raw-strings-in-swift">How do you make raw strings in Swift? 
/example-code/strings/how-to-display-different-strings-based-on-available-space-using-variantfittingpresentationwidth">How to display different strings based on available space using variantFittingPresentationWidth()</a>
`)],-1))])}const y=l(m,[["render",w],["__file","nsregularexpression-how-to-match-regular-expressions-in-strings.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/strings/nsregularexpression-how-to-match-regular-expressions-in-strings.html","title":"NSRegularExpression: How to match regular expressions in strings","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"NSRegularExpression: How to match regular expressions in strings","description":"Article(s) > NSRegularExpression: How to match regular expressions in strings","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-4.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > NSRegularExpression: How to match regular expressions in strings"},{"property":"og:description","content":"NSRegularExpression: How to match regular expressions in strings"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/strings/nsregularexpression-how-to-match-regular-expressions-in-strings.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/strings/nsregularexpression-how-to-match-regular-expressions-in-strings.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"NSRegularExpression: How to match regular expressions in strings"}],["meta",{"property":"og:description","content":"Article(s) > NSRegularExpression: How to match regular expressions in strings"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-4.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"NSRegularExpression: How to match regular expressions in strings\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.45,"words":435},"filePathRelative":"hackingwithswift.com/example-code/strings/nsregularexpression-how-to-match-regular-expressions-in-strings.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{y as comp,S as data};