import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as t,av as h,au as i,aw as o,ax as r,b as a,r as u,o as g}from"./app-Bhu0350G.js";const p={},m={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,e){const n=u("VPCard");return g(),c("div",null,[t("h1",m,[t("a",d,[t("span",null,h(s.$frontmatter.title)+" 관련",1)])]),i(n,o(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),i(n,o(r({title:"What is trailing closure syntax? | Language - free Swift example code",desc:"What is trailing closure syntax?",link:"https://hackingwithswift.com/example-code/language/what-is-trailing-closure-syntax",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 13.0")],-1)),a(" TODO: 작성 "),a(` 
Trailing closure syntax is a little piece of syntactic sugar that makes particularly common code more pleasant to read and write. Many functions in iOS accept multiple parameters where the final parameter is a closure. For example, if you've done animation in iOS you'll be familiar with this method:

\`\`\`swift
public class func animate(withDuration: TimeInterval, animations: () -> Void)
\`\`\`

That accepts an animation duration as its first parameter, and a closure containing animation instructions as its second.

One way of calling this method is like this:

\`\`\`swift
UIView.animate(withDuration: 1, animations: { [unowned self] in
    self.view.backgroundColor = UIColor.red
})
\`\`\`

While that is perfectly valid Swift code, it's harder to read than it ought to be. If a closure is the last parameter to a method, as seen here, Swift allows you write your code like this instead:

\`\`\`swift
UIView.animate(withDuration: 1) { [unowned self] in
    self.view.backgroundColor = UIColor.red
}
\`\`\`

That's shorter, and avoids the double closing \`})\` code.

This functionality is available wherever a closure is the final parameter to a function. For testing purposes, we could write a simple one like this:

\`\`\`swift
func greetThenRunClosure(name: String, closure: () -> ()) {
    print("Hello, \\(name)!")
    closure()
}
\`\`\`

That prints a message, then runs a closure. Because the closure is the final parameter to the function, we can call it using trailing closure syntax like this:

\`\`\`swift
greetThenRunClosure(name: "Paul") {
    print("The closure was run")
}
\`\`\`

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),a(`
/example-code/uikit/whats-the-difference-between-leading-trailing-left-and-right-anchors">What’s the difference between leading, trailing, left, and right anchors? 
/example-code/language/what-is-a-closure">What is a closure? 
/example-code/language/what-is-an-escaping-closure">What is an escaping closure? 
/example-code/language/how-to-write-a-closure-that-returns-a-value">How to write a closure that returns a value 
/example-code/language/whats-the-difference-between-a-function-and-a-closure">What’s the difference between a function and a closure?</a>
`)],-1))])}const x=l(p,[["render",f],["__file","what-is-trailing-closure-syntax.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-is-trailing-closure-syntax.html","title":"What is trailing closure syntax?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What is trailing closure syntax?","description":"Article(s) > What is trailing closure syntax?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What is trailing closure syntax?"},{"property":"og:description","content":"What is trailing closure syntax?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-trailing-closure-syntax.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-trailing-closure-syntax.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What is trailing closure syntax?"}],["meta",{"property":"og:description","content":"Article(s) > What is trailing closure syntax?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What is trailing closure syntax?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.54,"words":462},"filePathRelative":"hackingwithswift.com/example-code/language/what-is-trailing-closure-syntax.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,k as data};
