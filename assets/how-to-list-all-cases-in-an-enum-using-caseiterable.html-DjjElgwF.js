import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as e,av as m,au as o,aw as l,ax as s,b as t,r as u,o as p}from"./app-OR5iPMEZ.js";const h={},g={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function f(i,a){const n=u("VPCard");return p(),c("div",null,[e("h1",g,[e("a",d,[e("span",null,m(i.$frontmatter.title)+" 관련",1)])]),o(n,l(s({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a[0]||(a[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),a[1]||(a[1]=e("hr",null,null,-1)),o(n,l(s({title:"How to list all cases in an enum using CaseIterable | Language - free Swift example code",desc:"How to list all cases in an enum using CaseIterable",link:"https://hackingwithswift.com/example-code/language/how-to-list-all-cases-in-an-enum-using-caseiterable",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a[2]||(a[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),t(" TODO: 작성 "),t(` 
Swift has a \`CaseIterable\` protocol that automatically generates an array property of all cases in an enum. To enable it, all you need to do is make your enum conform to the \`CaseIterable\` protocol and at compile time Swift will automatically generate an \`allCases\` property that is an array of all your enum’s cases, in the order you defined them.

For example, this creates an enum of colors and asks Swift to automatically generate an \`allCases\` array for it:

\`\`\`swift
enum Color: CaseIterable {
    case red, green, blue
}
\`\`\`

You can then use that property as a regular array – it will be a \`[Color]\` given the code above, so we could print each case like this:

\`\`\`swift
for color in Color.allCases {
    print("My favorite color is \\(color).")
}
\`\`\`

This automatic synthesis of \`allCases\` will only take place for enums that do not have associated values. Adding those automatically wouldn’t make sense, however if you want you can add it yourself:

\`\`\`swift
enum Car: CaseIterable {
    static var allCases: [Car] {
        return [.ford, .toyota, .jaguar, .bmw, .porsche(convertible: false), .porsche(convertible: true)]
    }

    case ford, toyota, jaguar, bmw
    case porsche(convertible: Bool)
}
\`\`\`

Swift can’t synthesize an \`allCases\` property if any enum cases are marked unavailable. So, if you need \`allCases\` then you’ll need to add it yourself, like this:

\`\`\`swift
enum Direction: CaseIterable {
    static var allCases: [Direction] {
        return [.north, .south, .east, .west]
    }

    case north, south, east, west

    @available(*, unavailable)
    case all
}
\`\`\`

**Note:** You must add \`CaseIterable\` to the original declaration of your enum rather than an extension in order for the \`allCases\` array to be synthesized – you can’t use extensions to retroactively make existing enums conform to the protocol.

`),a[3]||(a[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/language/what-is-an-enum">What is an enum? 
/example-code/language/check-whether-all-items-in-an-array-match-a-condition">Check whether all items in an array match a condition 
/example-code/language/remove-all-instances-of-an-object-from-an-array">Remove all instances of an object from an array 
/example-code/language/checking-all-array-elements-match-a-condition-allsatisfy">Checking all array elements match a condition: allSatisfy()</a>
`)],-1))])}const b=r(h,[["render",f],["__file","how-to-list-all-cases-in-an-enum-using-caseiterable.html.vue"]]),C=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-list-all-cases-in-an-enum-using-caseiterable.html","title":"How to list all cases in an enum using CaseIterable","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to list all cases in an enum using CaseIterable","description":"Article(s) > How to list all cases in an enum using CaseIterable","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to list all cases in an enum using CaseIterable"},{"property":"og:description","content":"How to list all cases in an enum using CaseIterable"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-list-all-cases-in-an-enum-using-caseiterable.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-list-all-cases-in-an-enum-using-caseiterable.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to list all cases in an enum using CaseIterable"}],["meta",{"property":"og:description","content":"Article(s) > How to list all cases in an enum using CaseIterable"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to list all cases in an enum using CaseIterable\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.85,"words":554},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-list-all-cases-in-an-enum-using-caseiterable.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,C as data};
