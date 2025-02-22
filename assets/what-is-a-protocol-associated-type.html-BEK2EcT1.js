import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as t,as as p,ao as n,at as s,au as i,ak as a,aq as h,ar as m}from"./app-J50hDzMj.js";const d={},g={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"};function y(r,e){const o=h("VPCard");return m(),l("div",null,[t("h1",g,[t("a",u,[t("span",null,p(r.$frontmatter.title)+" 관련",1)])]),n(o,s(i({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),n(o,s(i({title:"What is a protocol associated type? | Language - free Swift example code",desc:"What is a protocol associated type?",link:"https://hackingwithswift.com/example-code/language/what-is-a-protocol-associated-type",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a(" TODO: 작성 "),a(` 
Associated types are a powerful way of making protocols generic, but they can be a bit confusing at first. In essence, they mark holes in protocols that must be filled by whatever types conform to those protocols.

Let’s start with a simple example: an \`ItemStoring\` protocol that can store items in an array. What *type* those items are depends on whatever conforms to the protocol, but we can still use them inside the protocol and any extensions.

Here’s the basic protocol:

\`\`\`swift
protocol ItemStoring {
    associatedtype DataType

    var items: [DataType] { get set}
    mutating func add(item: DataType)
}
\`\`\`

As you can see, it requires that conforming types provide an \`items\` array that holds an array of whatever is used to fill the \`DataType\` hole, and also a mutating method to add items of that type.

That mutating method is probably going to be the same for all conforming types, so we can write a protocol extension that provides a default implementation:

\`\`\`swift
extension ItemStoring {
    mutating func add(item: DataType) {
        items.append(item)
    }
}
\`\`\`

Finally we can create a \`NameDatabase\` struct that conforms to the \`ItemStoring\` protocol like this:

\`\`\`swift
struct NameDatabase: ItemStoring {
    var items = [String]()
}
\`\`\`

Swift is smart enough to realize that \`String\` is being used to fill the hole in the associated type, because the \`items\` array must be whatever \`DataType\` is.

That’s all the code written, so you can go ahead and use \`NameDatabase\`:

\`\`\`swift
var names = NameDatabase()
names.add(item: "James")
names.add(item: "Jess")
\`\`\`

`),e[2]||(e[2]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),a(`
/example-code/language/how-to-fix-the-error-protocol-can-only-be-used-as-a-generic-constraint-because-it-has-self-or-associated-type-requirements">How to fix the error “protocol can only be used as a generic constraint because it has Self or associated type requirements” 
/example-code/language/how-to-constrain-a-protocol-associated-type">How to constrain a protocol associated type 
/quick-start/swiftui/how-to-fix-protocol-view-can-only-be-used-as-a-generic-constraint-because-it-has-self-or-associated-type-requirements">How to fix “Protocol 'View' can only be used as a generic constraint because it has Self or associated type requirements” 
/example-code/language/how-to-add-associated-values-to-enums">How to add associated values to enums 
/quick-start/swiftui/how-to-fix-function-declares-an-opaque-return-type-but-has-no-return-statements-in-its-body-from-which-to-infer-an-underlying-ty">How to fix “Function declares an opaque return type, but has no return statements in its body from which to infer an underlying type”</a>
`)],-1))])}const b=c(d,[["render",y],["__file","what-is-a-protocol-associated-type.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-is-a-protocol-associated-type.html","title":"What is a protocol associated type?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What is a protocol associated type?","description":"Article(s) > What is a protocol associated type?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What is a protocol associated type?"},{"property":"og:description","content":"What is a protocol associated type?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-a-protocol-associated-type.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-a-protocol-associated-type.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What is a protocol associated type?"}],["meta",{"property":"og:description","content":"Article(s) > What is a protocol associated type?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What is a protocol associated type?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.9,"words":569},"filePathRelative":"hackingwithswift.com/example-code/language/what-is-a-protocol-associated-type.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,k as data};
