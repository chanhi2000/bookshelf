import{_ as h}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as t,av as w,au as r,aw as a,ax as i,b as o,r as l,o as u}from"./app-D4PYVeBp.js";const d={},p={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function g(s,e){const n=l("VPCard");return u(),c("div",null,[t("h1",p,[t("a",m,[t("span",null,w(s.$frontmatter.title)+" 관련",1)])]),r(n,a(i({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),r(n,a(i({title:"How to use the rethrows keyword | Language - free Swift example code",desc:"How to use the rethrows keyword",link:"https://hackingwithswift.com/example-code/language/how-to-use-the-rethrows-keyword",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),o(" TODO: 작성 "),o(` 
The \`rethrows\` keyword is used when you write a function (let’s call it A) that accepts a throwing function as a parameter (let’s call it B). If function B throws errors, then the function A becomes a throwing function too, but if function B doesn’t throw errors then neither does function A.

First, here’s a simple function that accepts a username and always throws an error because biometric authentication isn’t available:

\`\`\`swift
extension String: Error { }

func authenticateBiometrically(_ user: String) throws -> Bool {
    throw "Failed"
}
\`\`\`

That little \`String\` extension allows us to throw strings as errors, which saves a little time.

Now here’s a second function that doesn’t throw:

\`\`\`swift
func authenticateByPassword(_ user: String) -> Bool {
    return true
}
\`\`\`

So, biometric authentication (Touch ID, Face ID) always throws an error, and password authentication always works.

Now we want to write an authentication function that can either run biometric authentication or password authentication depending on what its given. Because one of the two possibilities can throw, we mark its parameter as throwing, like this: \`method: (String) throws -> Bool\`.

What we’re saying is that this function *might* be able to throw, not that it *must* throw.

Try adding this function now:

\`\`\`swift
func authenticateUser(method: (String) throws -> Bool) throws {
    try method("twostraws")
    print("Success!")
}
\`\`\`

We can now call that function like this:

\`\`\`swift
do {
    try authenticateUser(method: authenticateByPassword)
} catch {
    print("D'oh!")
}
\`\`\`

Now for the important part: we both know that \`authenticateByPassword()\` doesn’t throw errors, and Swift can see that too, so if we change the definition of \`authenticateUser\` from *throws* to *rethrows* Swift will no longer require us to use \`do\`/\`catch\` when passing it a non-throwing parameter.

Change the function to this:

\`\`\`swift
func authenticateUser(method: (String) throws -> Bool) rethrows {
    try method("twostraws")
    print("Success!")
}
\`\`\`

Now Xcode will give you a warning: the \`catch\` block later on is unreachable because \`authenticateUser\` will never throw errors. But if you were to call it using \`authenticateBiometrically\` then you *would* need the \`do\`/\`catch\` blocks – Swift is able to evaluate the flow of our code much better, which means we need to write less code.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/example-code/language/what-does-the-open-keyword-do">What does the open keyword do? 
/example-code/language/how-to-check-for-valid-method-input-using-the-guard-keyword">How to check for valid method input using the guard keyword 
/example-code/language/how-to-delay-execution-of-code-using-the-defer-keyword">How to delay execution of code using the defer keyword 
/quick-start/swiftui/whats-the-difference-between-observedobject-state-and-environmentobject">What’s the difference between @ObservedObject, @State, and @EnvironmentObject? 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks</a>
`)],-1))])}const k=h(d,[["render",g],["__file","how-to-use-the-rethrows-keyword.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-use-the-rethrows-keyword.html","title":"How to use the rethrows keyword","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to use the rethrows keyword","description":"Article(s) > How to use the rethrows keyword","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to use the rethrows keyword"},{"property":"og:description","content":"How to use the rethrows keyword"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-use-the-rethrows-keyword.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-use-the-rethrows-keyword.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to use the rethrows keyword"}],["meta",{"property":"og:description","content":"Article(s) > How to use the rethrows keyword"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to use the rethrows keyword\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.04,"words":611},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-use-the-rethrows-keyword.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,b as data};
