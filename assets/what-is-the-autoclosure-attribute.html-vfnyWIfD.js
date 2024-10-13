import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as t,t as l,e as a,n as i,g as r,a as e,r as u,o as h}from"./app-TWLwS86W.js";const p={},d={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"},g=t("nav",{class:"table-of-contents"},[t("ul")],-1),f=t("hr",null,null,-1),w=t("blockquote",null,[t("p",null,"Available from iOS 13.0")],-1),b=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/language/what-is-the-objc-attribute">What is the @objc attribute? 
/example-code/language/what-is-the-objcmembers-attribute">What is the @objcMembers attribute? 
/example-code/language/how-to-make-array-access-safer-using-a-custom-subscript">How to make array access safer using a custom subscript 
/example-code/language/how-to-fix-argument-of-selector-refers-to-instance-method-that-is-not-exposed-to-objective-c">How to fix “argument of #selector refers to instance method that is not exposed to Objective-C” 
/example-code/language/how-to-handle-unknown-properties-and-methods-using-dynamicmemberlookup">How to handle unknown properties and methods using @dynamicMemberLookup</a>
`)],-1);function y(n,k){const o=u("VPCard");return h(),c("div",null,[t("h1",d,[t("a",m,[t("span",null,l(n.$frontmatter.title)+" 관련",1)])]),a(o,i(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,f,a(o,i(r({title:"What is the autoclosure attribute? | Language - free Swift example code",desc:"What is the autoclosure attribute?",link:"https://hackingwithswift.com/example-code/language/what-is-the-autoclosure-attribute",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,e(" TODO: 작성 "),e(` 
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

`),b])}const v=s(p,[["render",y],["__file","what-is-the-autoclosure-attribute.html.vue"]]),T=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-is-the-autoclosure-attribute.html","title":"What is the autoclosure attribute?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What is the autoclosure attribute?","description":"Article(s) > What is the autoclosure attribute?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What is the autoclosure attribute?"},{"property":"og:description","content":"What is the autoclosure attribute?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-the-autoclosure-attribute.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-the-autoclosure-attribute.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What is the autoclosure attribute?"}],["meta",{"property":"og:description","content":"Article(s) > What is the autoclosure attribute?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What is the autoclosure attribute?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.69,"words":508},"filePathRelative":"hackingwithswift.com/example-code/language/what-is-the-autoclosure-attribute.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,T as data};
