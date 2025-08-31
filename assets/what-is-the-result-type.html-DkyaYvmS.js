import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as t,as as h,ao as o,at as r,au as i,ak as n,aq as u,ar as p}from"./app-DpiNAgkx.js";const m={},d={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,e){const a=u("VPCard");return p(),c("div",null,[t("h1",d,[t("a",g,[t("span",null,h(s.$frontmatter.title)+" 관련",1)])]),o(a,r(i({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),o(a,r(i({title:"What is the Result type? | Language - free Swift example code",desc:"What is the Result type?",link:"https://hackingwithswift.com/example-code/language/what-is-the-result-type",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),n(" TODO: 작성 "),n(` 
<p style="margin: 0; margin-bottom: 20px;"><a href="/about">Paul Hudson</a>    <i class="fab fa-twitter" aria-hidden="true" style="color: #4099ff"></i> <a href="https://twitter.com/twostraws" target="_blank">@twostraws</a>    <time itemprop="dateModified" datetime="2019-05-28T20:41:20+00:00">May 28th 2019</time><meta itemprop="datePublished" content="2019-05-28T20:41:20+00:00">

The \`Result\` type lets us encapsulate the success or failure of a method call in a single value, while also storing the contents of the successful return or the type of failure that occurred. More importantly, \`Result\` only stores one of these at a time: it will either be a success or a failure.

For example, we could use \`Result\` to handle networking. First we’d create a NetworkError\` enum containing all the things that might go wrong:

\`\`\`swift
enum NetworkError: Error {
    case badURL
}
\`\`\`

Next we’d write a method that calls a completion handler with some sort of \`Result\`. In this instance we’re going to return the number of unread messages a user has in their inbox, or a \`NetworkError\` if something went wrong:

\`\`\`swift
func fetchUnreadCount(from urlString: String, completionHandler: @escaping (Result<Int, NetworkError>) -> Void)  {
    guard let url = URL(string: urlString) else {
        completionHandler(.failure(.badURL))
        return
    }

    // complicated networking code here
    print("Fetching \\(url.absoluteString)...")
    completionHandler(.success(5))
}
\`\`\`

**Tip:** That code uses a completion handler rather than a simple return type because networking code will block the main thread - we want the method to return immediately and perform any complicated networking code in the background.

We can now call that method with a URL and evaluate what gets sent back. Remember. this will either be a success (sending us back the unread messages count), or a failure (sending us back what went wrong). Here’s the code:

\`\`\`swift
fetchUnreadCount(from: "https://www.hackingwithswift.com") { result in
    switch result {
    case .success(let count):
        print("\\(count) unread messages.")
    case .failure(let error):
        print(error.localizedDescription)
    }
}
\`\`\`

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),n(`
/quick-start/concurrency/how-to-get-a-result-from-a-task">How to get a Result from a task 
/quick-start/concurrency/how-to-handle-different-result-types-in-a-task-group">How to handle different result types in a task group 
/quick-start/swiftui/how-to-fix-function-declares-an-opaque-return-type-but-has-no-return-statements-in-its-body-from-which-to-infer-an-underlying-ty">How to fix “Function declares an opaque return type, but has no return statements in its body from which to infer an underlying type” 
/quick-start/swiftui/how-to-fix-cannot-convert-value-of-type-to-expected-argument-type">How to fix “Cannot convert value of type '() -> ()' to expected argument type '() -> _’” 
/quick-start/swiftui/how-to-fix-cannot-convert-value-of-type-string-to-expected-argument-type-text">How to fix “Cannot convert value of type 'String' to expected argument type 'Text'"</a>
`)],-1))])}const k=l(m,[["render",f],["__file","what-is-the-result-type.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-is-the-result-type.html","title":"What is the Result type?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What is the Result type?","description":"Article(s) > What is the Result type?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What is the Result type?"},{"property":"og:description","content":"What is the Result type?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-the-result-type.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-the-result-type.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What is the Result type?"}],["meta",{"property":"og:description","content":"Article(s) > What is the Result type?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What is the Result type?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":2.07,"words":621},"filePathRelative":"hackingwithswift.com/example-code/language/what-is-the-result-type.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,b as data};
