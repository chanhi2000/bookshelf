import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as e,t as l,e as o,n,g as r,a as t,r as p,o as h}from"./app-DLPYIRXq.js";const m={},g={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"},y=e("nav",{class:"table-of-contents"},[e("ul")],-1),u=e("hr",null,null,-1),f=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1),w=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/language/what-is-a-tuple">What is a tuple? 
/example-code/language/what-is-the-ternary-operator">What is the ternary operator? 
/example-code/language/how-to-safely-use-reference-types-inside-value-types-with-isknownuniquelyreferenced">How to safely use reference types inside value types with isKnownUniquelyReferenced() 
/example-code/language/tips-for-android-developers-switching-to-swift">Tips for Android developers switching to Swift 
/example-code/language/how-to-convert-a-string-to-a-double">How to convert a string to a double</a>
`)],-1);function k(i,_){const a=p("VPCard");return h(),c("div",null,[e("h1",g,[e("a",d,[e("span",null,l(i.$frontmatter.title)+" 관련",1)])]),o(a,n(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),y,u,o(a,n(r({title:"What are keypaths? | Language - free Swift example code",desc:"What are keypaths?",link:"https://hackingwithswift.com/example-code/language/what-are-keypaths",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,t(" TODO: 작성 "),t(` 
Swift keypaths are a way of storing uninvoked references to properties, which is a fancy way of saying they refer to a property itself rather than to that property’s value.

Here’s an example struct storing a name and maximum warp speed of a starship:

\`\`\`swift
struct Starship {
    var name: String
    var maxWarp: Double
}

let voyager = Starship(name: "Voyager", maxWarp: 9.975)
\`\`\`

Keypaths let us refer to the \`name\` or \`maxWarp\` properties without reading them directly, like this:

\`\`\`swift
let nameKeyPath = \\Starship.name
let warpKeyPath = \\Starship.maxWarp
\`\`\`

If you want to read those keypaths on a specific starship, Swift will return you the actual values attached to those properties:

\`\`\`swift
print(voyager[keyPath: nameKeyPath])
print(voyager[keyPath: warpKeyPath])
\`\`\`

In practice, this means you can refer to the same property in multiple places all using the same keypath – and if you decide you want a different property you can change it in just one place.

`),w])}const b=s(m,[["render",k],["__file","what-are-keypaths.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-are-keypaths.html","title":"What are keypaths?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What are keypaths?","description":"Article(s) > What are keypaths?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What are keypaths?"},{"property":"og:description","content":"What are keypaths?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-are-keypaths.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-are-keypaths.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What are keypaths?"}],["meta",{"property":"og:description","content":"Article(s) > What are keypaths?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What are keypaths?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.22,"words":366},"filePathRelative":"hackingwithswift.com/example-code/language/what-are-keypaths.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,S as data};
