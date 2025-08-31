import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as e,as as d,ao as i,at as o,au as r,ak as n,aq as m,ar as u}from"./app-DpiNAgkx.js";const h={},p={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,t){const a=m("VPCard");return u(),c("div",null,[e("h1",p,[e("a",g,[e("span",null,d(s.$frontmatter.title)+" 관련",1)])]),i(a,o(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),i(a,o(r({title:"What are indirect enums? | Language - free Swift example code",desc:"What are indirect enums?",link:"https://hackingwithswift.com/example-code/language/what-are-indirect-enums",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),n(" TODO: 작성 "),n(` 
Indirect enums are enums that need to reference themselves somehow, and are called “indirect” because they modify the way Swift stores them so they can grow to any size. Without the indirection, any enum that referenced itself could potentially become infinitely sized: it could contain itself again and again, which wouldn’t be possible.

As an example, here’s an indirect enum that defines a node in a linked list:

\`\`\`swift
indirect enum LinkedListItem<T> {
    case endPoint(value: T)
    case linkNode(value: T, next: LinkedListItem)
}
\`\`\`

Because that references itself - because one of the associated values is itself a linked list item - we need to mark the enum as being indirect.

Apart from the special way they store their values internally, indirect enums work identically to regular enums. So, we could make a linked list using that enum and loop over it, like this:

\`\`\`swift
let third = LinkedListItem.endPoint(value: "Third")
let second = LinkedListItem.linkNode(value: "Second", next: third)
let first = LinkedListItem.linkNode(value: "First", next: second)

var currentNode = first

listLoop: while true {
    switch currentNode {
    case .endPoint(let value):
        print(value)
        break listLoop
    case .linkNode(let value, let next):
        print(value)
        currentNode = next
    }
}
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),n(`
/example-code/language/how-to-add-associated-values-to-enums">How to add associated values to enums 
/example-code/language/how-to-add-raw-values-to-enums">How to add raw values to enums 
/example-code/language/how-to-list-all-cases-in-an-enum-using-caseiterable">How to list all cases in an enum using CaseIterable 
/example-code/language/whats-the-difference-between-any-and-anyobject">What’s the difference between Any and AnyObject? 
/example-code/language/how-to-create-a-custom-optionset">How to create a custom OptionSet</a>
`)],-1))])}const y=l(h,[["render",f],["__file","what-are-indirect-enums.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-are-indirect-enums.html","title":"What are indirect enums?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What are indirect enums?","description":"Article(s) > What are indirect enums?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What are indirect enums?"},{"property":"og:description","content":"What are indirect enums?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-are-indirect-enums.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-are-indirect-enums.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What are indirect enums?"}],["meta",{"property":"og:description","content":"Article(s) > What are indirect enums?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What are indirect enums?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.39,"words":416},"filePathRelative":"hackingwithswift.com/example-code/language/what-are-indirect-enums.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,b as data};
