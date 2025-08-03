import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as e,av as u,au as o,aw as s,ax as r,b as a,r as m,o as d}from"./app-CCjNjKMa.js";const w={},p={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"};function g(i,t){const n=m("VPCard");return d(),c("div",null,[e("h1",p,[e("a",h,[e("span",null,u(i.$frontmatter.title)+" 관련",1)])]),o(n,s(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),o(n,s(r({title:"How to add raw values to enums | Language - free Swift example code",desc:"How to add raw values to enums",link:"https://hackingwithswift.com/example-code/language/how-to-add-raw-values-to-enums",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),a(" TODO: 작성 "),a(` 
Raw values for enums are primitive values that sit behind each case. For example, you might create an enum for the planets in our solar system, and want to refer to each planet by a number as well as its name:

\`\`\`swift
enum Planets: Int {
    case mercury
    case venus
    case earth
    case mars
} 
\`\`\`

Swift will assign each case a raw integer value, starting from 0 and counting up. You can then use this to load and save the enum, or perhaps transfer it over the network.

You can provide custom raw values for any or all of your cases, and Swift will fill in the rest. For example, if we wanted \`mercury\` to be planet number 1, \`venus\` to be number 2, and so on, we could do this:

\`\`\`swift
enum Planets: Int {
    case mercury = 1
    case venus
    case earth
    case mars
}
\`\`\`

That will cause Swift to count upwards from 1.

If your raw value type is \`String\`, Swift will automatically create strings from each case name.

So, this:

\`\`\`swift
enum Planets: String {
    case mercury
    case venus
    case earth
    case mars
}
\`\`\`

Is equivalent to this:

\`\`\`swift
enum Planets: String {
    case mercury = "mercury"
    case venus = "venus"
    case earth = "earth"
    case mars = "mars"
}
\`\`\`

Finally, you can create enums from their raw value, but you get back an *optional* enum because your raw value might not match any of the available cases. For example, given our original \`Planets\` enum with integer raw values starting from 0, this would create an optional \`Planet\` pointing at Venus:

\`\`\`swift
let venus = Planets(rawValue: 1)
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),a(`
/example-code/strings/how-do-you-make-raw-strings-in-swift">How do you make raw strings in Swift? 
/example-code/language/how-to-add-associated-values-to-enums">How to add associated values to enums 
/example-code/language/what-are-indirect-enums">What are indirect enums? 
/quick-start/concurrency/how-to-create-and-use-task-local-values">How to create and use task local values 
/example-code/uikit/how-to-add-a-uiapplicationshortcutitem-quick-action-for-3d-touch">How to add a UIApplicationShortcutItem quick action for 3D Touch</a>
`)],-1))])}const y=l(w,[["render",g],["__file","how-to-add-raw-values-to-enums.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-add-raw-values-to-enums.html","title":"How to add raw values to enums","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to add raw values to enums","description":"Article(s) > How to add raw values to enums","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to add raw values to enums"},{"property":"og:description","content":"How to add raw values to enums"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-add-raw-values-to-enums.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-add-raw-values-to-enums.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to add raw values to enums"}],["meta",{"property":"og:description","content":"Article(s) > How to add raw values to enums"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to add raw values to enums\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.69,"words":508},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-add-raw-values-to-enums.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,k as data};
