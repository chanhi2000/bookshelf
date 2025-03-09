import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,f as t,av as p,au as i,aw as a,ax as s,b as o,r as m,o as h}from"./app-D4PYVeBp.js";const g={},y={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"};function u(c,e){const n=m("VPCard");return h(),l("div",null,[t("h1",y,[t("a",f,[t("span",null,p(c.$frontmatter.title)+" 관련",1)])]),i(n,a(s({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),i(n,a(s({title:"How to copy objects in Swift using copy() | System - free Swift example code",desc:"How to copy objects in Swift using copy()",link:"https://hackingwithswift.com/example-code/system/how-to-copy-objects-in-swift-using-copy",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 7.0")],-1)),o(" TODO: 작성 "),o(` 
There are two main complex data types in Swift – objects and structs – and they do so many things similarly that you'd be forgiven for not being sure exactly where they differ. Well, one of the key areas is down to copying: two variables can point at the same object so that changing one changes them both, whereas if you tried that with structs you'd find that Swift creates a full copy so that changing the copy does not affect the original.

Having lots of objects point at the same data can be useful, but frequently you'll want to modify *copies* so that modifying one object doesn't have an effect on anything else. To make this work you need to do three things:

- Make your class conform to \`NSCopying\`. This isn't strictly required, but it makes your intent clear.
<li>Implement the method \`copy(with:)\`, where the actual copying happens.
<li>Call \`copy()\` on your object.

Here's an example of a \`Person\` class that conforms fully to the \`NSCopying\` protocol:

\`\`\`swift
    class Person: NSObject, NSCopying {
    var firstName: String
    var lastName: String
    var age: Int

    init(firstName: String, lastName: String, age: Int) {
        self.firstName = firstName
        self.lastName = lastName
        self.age = age
    }

    func copy(with zone: NSZone? = nil) -> Any {
        let copy = Person(firstName: firstName, lastName: lastName, age: age)
        return copy
    }
}
\`\`\`

Note that \`copy(with:)\` is implemented by creating a new \`Person\` object using the current person's information.

With that done, you can test out your copying like this:

\`\`\`swift
let paul = Person(firstName: "Paul", lastName: "Hudson", age: 36)
let sophie = paul.copy() as! Person

sophie.firstName = "Sophie"
sophie.age = 6

print("\\(paul.firstName) \\(paul.lastName) is \\(paul.age)")
print("\\(sophie.firstName) \\(sophie.lastName) is \\(sophie.age)")
\`\`\`

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/observable-objects-environment-objects-and-published">Observable objects, environment objects, and @Published 
/example-code/language/what-is-copy-on-write">What is copy on write? 
/example-code/system/how-to-copy-text-to-the-clipboard-using-uipasteboard">How to copy text to the clipboard using UIPasteboard 
/example-code/uikit/how-to-disable-undo-redo-copy-and-paste-gestures-using-editinginteractionconfiguration">How to disable undo, redo, copy, and paste gestures using editingInteractionConfiguration 
/example-code/language/how-to-convert-json-into-swift-objects-using-codable">How to convert JSON into Swift objects using Codable</a>
`)],-1))])}const b=r(g,[["render",u],["__file","how-to-copy-objects-in-swift-using-copy.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-copy-objects-in-swift-using-copy.html","title":"How to copy objects in Swift using copy()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to copy objects in Swift using copy()","description":"Article(s) > How to copy objects in Swift using copy()","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to copy objects in Swift using copy()"},{"property":"og:description","content":"How to copy objects in Swift using copy()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-copy-objects-in-swift-using-copy.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-copy-objects-in-swift-using-copy.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to copy objects in Swift using copy()"}],["meta",{"property":"og:description","content":"Article(s) > How to copy objects in Swift using copy()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to copy objects in Swift using copy()\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.81,"words":543},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-copy-objects-in-swift-using-copy.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{b as comp,S as data};
