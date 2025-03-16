import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,f as t,av as u,au as i,aw as r,ax as n,b as a,r as h,o as p}from"./app-TfhzDSA_.js";const d={},m={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,e){const o=h("VPCard");return p(),l("div",null,[t("h1",m,[t("a",g,[t("span",null,u(s.$frontmatter.title)+" 관련",1)])]),i(o,r(n({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),i(o,r(n({title:"What is the autoclosure attribute? | Language - free Swift example code",desc:"What is the autoclosure attribute?",link:"https://hackingwithswift.com/example-code/language/what-is-the-autoclosure-attribute",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 13.0")],-1)),a(" TODO: 작성 "),a(` 
The \`@autoclosure\` attribute can be applied to a closure parameter for a function, and automatically creates a closure from an expression you pass in. When you call a function that uses this attribute, the code you write *isn't* a closure, but it *becomes* a closure, which can be a bit confusing – even the official Swift reference guide warns that overusing autoclosures makes your code harder to understand.

To help you understand how it works, here's a trivial example:

\`\`\`swift
func printTest1(_ result: () -> Void) {
    print("Before")
    result()
    print("After")
}

printTest1({ print("Hello") })
\`\`\`

That code creates a \`printTest()\` method, which accepts a closure and calls it. As you can see, the \`print("Hello")\` is inside a closure that gets called between "Before" and "After", so the final output is "Before", "Hello", "After".

If we used \`@autoclosure\` instead, it would allow us to rewrite the \`printTest()\` call so that it doesn't need braces, like this:

\`\`\`swift
func printTest2(_ result: @autoclosure () -> Void) {
    print("Before")
    result()
    print("After")
}

printTest2(print("Hello"))
\`\`\`

These two pieces of code produce identical results thanks to \`@autoclosure\`. In the second code example, the \`print("Hello")\` won't be executed immediately because it gets wrapped inside a closure for execution later.

The \`@autoclosure\` attribute is used inside Swift wherever code needs to be passed in and executed only if conditions are right. For example, the \`&&\` operator uses \`@autoclosure\` to allow short-circuit evaluation, and the \`assert()\` function uses it so that the assertion isn’t checked outside of debug mode.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),a(`
/example-code/language/what-is-the-objc-attribute">What is the @objc attribute? 
/example-code/language/what-is-the-objcmembers-attribute">What is the @objcMembers attribute? 
/example-code/language/how-to-make-array-access-safer-using-a-custom-subscript">How to make array access safer using a custom subscript 
/example-code/language/how-to-fix-argument-of-selector-refers-to-instance-method-that-is-not-exposed-to-objective-c">How to fix “argument of #selector refers to instance method that is not exposed to Objective-C” 
/example-code/language/how-to-handle-unknown-properties-and-methods-using-dynamicmemberlookup">How to handle unknown properties and methods using @dynamicMemberLookup</a>
`)],-1))])}const y=c(d,[["render",f],["__file","what-is-the-autoclosure-attribute.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-is-the-autoclosure-attribute.html","title":"What is the autoclosure attribute?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What is the autoclosure attribute?","description":"Article(s) > What is the autoclosure attribute?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What is the autoclosure attribute?"},{"property":"og:description","content":"What is the autoclosure attribute?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-the-autoclosure-attribute.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-the-autoclosure-attribute.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What is the autoclosure attribute?"}],["meta",{"property":"og:description","content":"Article(s) > What is the autoclosure attribute?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What is the autoclosure attribute?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.69,"words":508},"filePathRelative":"hackingwithswift.com/example-code/language/what-is-the-autoclosure-attribute.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,k as data};
