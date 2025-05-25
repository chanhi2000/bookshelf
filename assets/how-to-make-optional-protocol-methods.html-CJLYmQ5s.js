import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as t,av as p,au as n,aw as i,ax as l,b as e,r as m,o as h}from"./app-CmlMtt14.js";const d={},g={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"};function w(r,o){const a=m("VPCard");return h(),c("div",null,[t("h1",g,[t("a",u,[t("span",null,p(r.$frontmatter.title)+" 관련",1)])]),n(a,i(l({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[0]||(o[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),o[1]||(o[1]=t("hr",null,null,-1)),n(a,i(l({title:"How to make optional protocol methods | Language - free Swift example code",desc:"How to make optional protocol methods",link:"https://hackingwithswift.com/example-code/language/how-to-make-optional-protocol-methods",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[2]||(o[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),e(" TODO: 작성 "),e(` 
By default, all methods listed in a Swift protocol must be implementing in a conforming type. However, there are two ways you can work around this restriction depending on your need.

The first option is to mark your protocol using the \`@objc\` attribute. While this means it can be adopted only by classes, it *does* mean you mark individual methods as being \`optional\` like this:

\`\`\`swift
@objc protocol ObjcPrintable {
    @objc optional func canPrint() -> Bool
}
\`\`\`

If possible, the second option is usually better: write default implementations of the optional methods that do nothing, like this:

\`\`\`swift
protocol Printable {
    func canPrint() -> Bool
}

extension Printable {
    func canPrint() -> Bool {
        return true
    }
}
\`\`\`

Remember, optional methods exist because you can provide sensible default behavior without them. In the above example it seems fair to make \`Printable\` things return true from \`canPrint()\` by default, because if someone wants to write an authentication layer for specific things they can implement their own version.

`),o[3]||(o[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/language/optional-vs-implicitly-unwrapped-optional-whats-the-difference">Optional vs implicitly unwrapped optional: what’s the difference? 
/example-code/language/what-is-optional-chaining">What is optional chaining? 
/example-code/language/how-to-use-flatmap-with-an-optional-value">How to use flatMap() with an optional value 
/example-code/language/what-is-an-optional-value-in-swift">What is an optional value in Swift? 
/example-code/language/how-to-unwrap-an-optional-in-swift">How to unwrap an optional in Swift</a>
`)],-1))])}const y=s(d,[["render",w],["__file","how-to-make-optional-protocol-methods.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-make-optional-protocol-methods.html","title":"How to make optional protocol methods","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make optional protocol methods","description":"Article(s) > How to make optional protocol methods","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make optional protocol methods"},{"property":"og:description","content":"How to make optional protocol methods"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-make-optional-protocol-methods.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-make-optional-protocol-methods.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make optional protocol methods"}],["meta",{"property":"og:description","content":"Article(s) > How to make optional protocol methods"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make optional protocol methods\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.31,"words":392},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-make-optional-protocol-methods.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,b as data};
