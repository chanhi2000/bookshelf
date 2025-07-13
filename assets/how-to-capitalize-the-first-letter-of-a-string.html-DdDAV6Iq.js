import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as t,av as p,au as o,aw as r,ax as n,b as i,r as f,o as h}from"./app-Bd1z_vEL.js";const g={},m={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function w(s,e){const a=f("VPCard");return h(),c("div",null,[t("h1",m,[t("a",d,[t("span",null,p(s.$frontmatter.title)+" 관련",1)])]),o(a,r(n({title:"Strings - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/strings/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),o(a,r(n({title:"How to capitalize the first letter of a string | Strings - free Swift example code",desc:"How to capitalize the first letter of a string",link:"https://hackingwithswift.com/example-code/strings/how-to-capitalize-the-first-letter-of-a-string",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),i(" TODO: 작성 "),i(` 
If you want to capitalize the first letter of a string without touching the rest of the letters, add this simple extension of \`String\`:

\`\`\`swift
extension String {
    func capitalizingFirstLetter() -> String {
        return prefix(1).capitalized + dropFirst()
    }

    mutating func capitalizeFirstLetter() {
        self = self.capitalizingFirstLetter()
    }
}
\`\`\`

Here’s an example to try it out:

\`\`\`swift
let test = "the rain in Spain"
print(test.capitalizingFirstLetter())
\`\`\`

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),i(`
/example-code/strings/how-to-capitalize-words-in-a-string-using-capitalized">How to capitalize words in a string using capitalized 
/quick-start/concurrency/what-calls-the-first-async-function">What calls the first async function? 
/example-code/language/how-to-find-the-index-of-the-first-matching-array-element">How to find the index of the first matching array element 
/example-code/language/how-to-find-the-first-matching-element-in-an-array">How to find the first matching element in an array 
/example-code/system/what-is-the-first-responder">What is the first responder?</a>
`)],-1))])}const z=l(g,[["render",w],["__file","how-to-capitalize-the-first-letter-of-a-string.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/example-code/strings/how-to-capitalize-the-first-letter-of-a-string.html","title":"How to capitalize the first letter of a string","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to capitalize the first letter of a string","description":"Article(s) > How to capitalize the first letter of a string","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to capitalize the first letter of a string"},{"property":"og:description","content":"How to capitalize the first letter of a string"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/strings/how-to-capitalize-the-first-letter-of-a-string.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/strings/how-to-capitalize-the-first-letter-of-a-string.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to capitalize the first letter of a string"}],["meta",{"property":"og:description","content":"Article(s) > How to capitalize the first letter of a string"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to capitalize the first letter of a string\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.1,"words":331},"filePathRelative":"hackingwithswift.com/example-code/strings/how-to-capitalize-the-first-letter-of-a-string.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{z as comp,x as data};
