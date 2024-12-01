import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as e,t as l,e as a,n as i,g as o,a as t,r as d,o as m}from"./app-DLPYIRXq.js";const h={},u={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"},g=e("nav",{class:"table-of-contents"},[e("ul")],-1),f=e("hr",null,null,-1),w=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1),y=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/language/how-to-add-associated-values-to-enums">How to add associated values to enums 
/example-code/language/how-to-add-raw-values-to-enums">How to add raw values to enums 
/example-code/language/how-to-list-all-cases-in-an-enum-using-caseiterable">How to list all cases in an enum using CaseIterable 
/example-code/language/whats-the-difference-between-any-and-anyobject">What’s the difference between Any and AnyObject? 
/example-code/language/how-to-create-a-custom-optionset">How to create a custom OptionSet</a>
`)],-1);function k(r,b){const n=d("VPCard");return m(),c("div",null,[e("h1",u,[e("a",p,[e("span",null,l(r.$frontmatter.title)+" 관련",1)])]),a(n,i(o({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,f,a(n,i(o({title:"What are indirect enums? | Language - free Swift example code",desc:"What are indirect enums?",link:"https://hackingwithswift.com/example-code/language/what-are-indirect-enums",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,t(" TODO: 작성 "),t(` 
Indirect enums are enums that need to reference themselves somehow, and are called “indirect” because they modify the way Swift stores them so they can grow to any size. Without the indirection, any enum that referenced itself could potentially become infinitely sized: it could contain itself again and again, which wouldn’t be possible.

As an example, here’s an indirect enum that defines a node in a linked list:

\`\`\`swift
indirect enum LinkedListItem<T> {
    case endPoint(value: T)
    case linkNode(value: T, next: LinkedListItem)
}
\`\`\`

Because that references itself – because one of the associated values is itself a linked list item – we need to mark the enum as being indirect.

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

`),y])}const x=s(h,[["render",k],["__file","what-are-indirect-enums.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-are-indirect-enums.html","title":"What are indirect enums?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What are indirect enums?","description":"Article(s) > What are indirect enums?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What are indirect enums?"},{"property":"og:description","content":"What are indirect enums?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-are-indirect-enums.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-are-indirect-enums.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What are indirect enums?"}],["meta",{"property":"og:description","content":"Article(s) > What are indirect enums?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What are indirect enums?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.39,"words":416},"filePathRelative":"hackingwithswift.com/example-code/language/what-are-indirect-enums.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,S as data};
