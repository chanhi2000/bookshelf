import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as t,av as g,au as i,aw as r,ax as o,b as a,r as p,o as u}from"./app-C2w16SxA.js";const h={},m={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,e){const n=p("VPCard");return u(),c("div",null,[t("h1",m,[t("a",d,[t("span",null,g(s.$frontmatter.title)+" 관련",1)])]),i(n,r(o({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),i(n,r(o({title:"What is destructuring? | Language - free Swift example code",desc:"What is destructuring?",link:"https://hackingwithswift.com/example-code/language/what-is-destructuring",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 13.0")],-1)),a(" TODO: 작성 "),a(` 
Destructuring is the practice of pulling a tuple apart into multiple values in a single assignment. For example, consider a trivial function that accepts names in the format “FirstName LastName” and returns a tuple containing the first and last names separated:

\`\`\`swift
func splitName(_ name: String) -> (String, String) {
    let parts = name.components(separatedBy: " ")
    return (parts[0], parts[1])
}
\`\`\`

If you want to call that using destructuring, just use two values for your assignment when calling it, like this:

\`\`\`swift
let (first, last) = splitName("Taylor Swift")
\`\`\`

That creates \`first\` and \`last\` constants out of the two returned items in the tuple, and you can then use them as normal:

\`\`\`swift
print(first)
print(last)
\`\`\`

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),a(`
/example-code/language/how-to-find-the-highest-value-in-an-array">How to find the highest value in an array 
/example-code/language/what-is-mvc">What is MVC? 
/example-code/language/how-to-restrict-a-protocol-to-classes">How to restrict a protocol to classes 
/example-code/language/how-to-find-the-difference-between-two-arrays">How to find the difference between two arrays 
/example-code/language/what-is-a-selector">What is a selector?</a>
`)],-1))])}const k=l(h,[["render",f],["__file","what-is-destructuring.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-is-destructuring.html","title":"What is destructuring?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What is destructuring?","description":"Article(s) > What is destructuring?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What is destructuring?"},{"property":"og:description","content":"What is destructuring?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-destructuring.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-destructuring.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What is destructuring?"}],["meta",{"property":"og:description","content":"Article(s) > What is destructuring?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What is destructuring?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.06,"words":319},"filePathRelative":"hackingwithswift.com/example-code/language/what-is-destructuring.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,x as data};
