import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,b as e,t as u,e as o,n as a,g as i,a as t,r as c,o as g}from"./app-TWLwS86W.js";const d={},h={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"},p=e("nav",{class:"table-of-contents"},[e("ul")],-1),f=e("hr",null,null,-1),w=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1),b=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/quick-start/swiftui/how-to-fix-function-declares-an-opaque-return-type-but-has-no-return-statements-in-its-body-from-which-to-infer-an-underlying-ty">How to fix “Function declares an opaque return type, but has no return statements in its body from which to infer an underlying type” 
/example-code/uikit/how-to-move-to-the-next-uitextfield-when-the-user-presses-return">How to move to the next UITextField when the user presses return 
/quick-start/swiftui/how-to-return-different-view-types">How to return different view types 
/example-code/language/what-is-the-never-return-type">What is the Never return type? 
/quick-start/concurrency/how-to-create-and-use-task-local-values">How to create and use task local values</a>
`)],-1);function y(s,v){const n=c("VPCard");return g(),l("div",null,[e("h1",h,[e("a",m,[e("span",null,u(s.$frontmatter.title)+" 관련",1)])]),o(n,a(i({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),p,f,o(n,a(i({title:"How to ignore return values using @discardableResult | Language - free Swift example code",desc:"How to ignore return values using @discardableResult",link:"https://hackingwithswift.com/example-code/language/how-to-ignore-return-values-using-discardableresult",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,t(" TODO: 작성 "),t(` 
Many functions return values, but sometimes you don’t care what the return value is – you might want to ignore it sometimes, and use it other times.

As an example, Swift’s dictionaries have an \`updateValue()\` method that lets you change the value for a given key. If the key was found you’ll be sent back the previous value, but if the key wasn’t found you’ll get back nil. This makes it a nice way to update and check at the same time, if you need it:

\`\`\`swift
var scores = ["Sophie": 5, "James": 2]
scores.updateValue(3, forKey: "James")
\`\`\`

That code will return 2, because it was the previous score for James:

The \`updateValue()\` method is marked with \`@discardableResult\` because it’s the kind of thing you might want to use for a while then stop using, or vice versa. Without that attribute in place you’d need to assign the result to underscore to silence the warning, like this:

\`\`\`swift
_ = scores.updateValue(3, forKey: "James")
\`\`\`

You can use \`@discardableResult\` in your own functions. For example, you might write a logging function that accepts a string and optionally also a log level. This function will internally assemble a complete log line out of the message, log level, and current date, but it will also return that log message in case it needs to be used elsewhere.

In code it would look something like this:

\`\`\`swift
enum LogLevel: String {
    case trace, debug, info, warn, error, fatal
}

func log(_ message: String, level: LogLevel = .info) -> String {
    let logLine = "[\\(level)] \\(Date.now): \\(message)"
    print(logLine)
    return logLine
}

log("Hello, world!")
\`\`\`

Although the result from \`log()\` is interesting and might be useful sometimes, most of the time users aren’t going to care so this is a sensible place to use \`@discardableResult\`:

\`\`\`swift
@discardableResult func discardableLog(_ message: String, level: LogLevel = .info) -> String {
    let logLine = "[\\(level)] \\(Date.now): \\(message)"
    print(logLine)
    return logLine
}
\`\`\`

If you expect folks to use the result most or nearly all of the time, it’s probably better to leave off \`@discardableResult\` and make them use \`_\` to silence the warning instead.

`),b])}const x=r(d,[["render",y],["__file","how-to-ignore-return-values-using-discardableresult.html.vue"]]),R=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-ignore-return-values-using-discardableresult.html","title":"How to ignore return values using @discardableResult","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to ignore return values using @discardableResult","description":"Article(s) > How to ignore return values using @discardableResult","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to ignore return values using @discardableResult"},{"property":"og:description","content":"How to ignore return values using @discardableResult"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-ignore-return-values-using-discardableresult.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-ignore-return-values-using-discardableresult.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to ignore return values using @discardableResult"}],["meta",{"property":"og:description","content":"Article(s) > How to ignore return values using @discardableResult"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2022-03-23T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to ignore return values using @discardableResult\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-03-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2022-03-23T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.13,"words":640},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-ignore-return-values-using-discardableresult.md","localizedDate":"2022년 3월 23일","excerpt":"\\n"}');export{x as comp,R as data};
