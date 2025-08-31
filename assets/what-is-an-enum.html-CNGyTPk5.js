import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as t,as as m,ao as o,at as i,au as s,ak as a,aq as u,ar as p}from"./app-DpiNAgkx.js";const h={},g={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function f(r,e){const n=u("VPCard");return p(),c("div",null,[t("h1",g,[t("a",d,[t("span",null,m(r.$frontmatter.title)+" 관련",1)])]),o(n,i(s({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),o(n,i(s({title:"What is an enum? | Language - free Swift example code",desc:"What is an enum?",link:"https://hackingwithswift.com/example-code/language/what-is-an-enum",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 13.0")],-1)),a(" TODO: 작성 "),a(` 
“Enum” is short for “enumeration”, and it’s a way of letting you use fixed names for special values rather than relying on strings or integers.

For example, if we wanted to track how happy a user was, you could use a number scale where -1 meant unhappy, +1 meant happy, and 0 meant they were in between, but then the onus is on you to remember what those numbers mean. A better idea is to use an enum like this one:

\`\`\`swift
enum Satisfaction {
    case unhappy
    case meh
    case happy
}
\`\`\`

Those cases can now be referenced as \`Satisfaction.happy\`, so it’s clear what you mean - and internally it’s treated no different from an integer, so it has no performance impact.

We can create a \`Person\` struct using that new enum, like this:

\`\`\`swift
struct Person {
    var name: String
    var satisfaction: Satisfaction
}
\`\`\`

Because Swift knows the \`satisfaction\` property must be a value from the \`Satisfaction\` enum we can just specify the case we want to use when creating a value:

\`\`\`swift
let person = Person(name: "Taylor", satisfaction: .happy)
\`\`\`

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),a(`
/example-code/language/how-to-list-all-cases-in-an-enum-using-caseiterable">How to list all cases in an enum using CaseIterable 
/quick-start/swiftui/how-to-create-multi-step-animations-using-phase-animators">How to create multi-step animations using phase animators 
/example-code/language/how-to-add-raw-values-to-enums">How to add raw values to enums 
/quick-start/concurrency/how-to-create-and-use-task-local-values">How to create and use task local values 
/quick-start/concurrency/how-to-handle-different-result-types-in-a-task-group">How to handle different result types in a task group</a>
`)],-1))])}const k=l(h,[["render",f],["__file","what-is-an-enum.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-is-an-enum.html","title":"What is an enum?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What is an enum?","description":"Article(s) > What is an enum?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What is an enum?"},{"property":"og:description","content":"What is an enum?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-an-enum.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-an-enum.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What is an enum?"}],["meta",{"property":"og:description","content":"Article(s) > What is an enum?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What is an enum?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.4,"words":419},"filePathRelative":"hackingwithswift.com/example-code/language/what-is-an-enum.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,b as data};
