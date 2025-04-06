import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as e,av as d,au as n,aw as r,ax as i,b as o,r as u,o as f}from"./app-OR5iPMEZ.js";const h={},w={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function p(s,t){const a=u("VPCard");return f(),c("div",null,[e("h1",w,[e("a",g,[e("span",null,d(s.$frontmatter.title)+" 관련",1)])]),n(a,r(i({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(a,r(i({title:"How to delay execution of code using the defer keyword | Language - free Swift example code",desc:"How to delay execution of code using the defer keyword",link:"https://hackingwithswift.com/example-code/language/how-to-delay-execution-of-code-using-the-defer-keyword",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 7.0")],-1)),o(" TODO: 작성 "),o(` 
The \`defer\` keyword is new in Swift 2 and lets you schedule some code to be run at a later date. That later date is when your code exits its current scope, which might be when a function returns or at the end of a loop, for example.

If you've used other programming languages, \`defer\` will seem similar to \`try/finally\`. Any code you defer will run no matter what, even if you throw an exception.

In the example code below, the \`closeFile()\` function will get called no matter how the \`writeLog()\` function ends:

\`\`\`swift
func writeLog() {
    let file = openFile()
    defer { closeFile(file) }

    let hardwareStatus = fetchHardwareStatus()
    guard hardwareStatus != "disaster" else { return }
    file.write(hardwareStatus)

    let softwareStatus = fetchSoftwareStatus()
    guard softwareStatus != "disaster" else { return }
    file.write(softwareStatus)

    let networkStatus = fetchNetworkStatus()
    guard networkStatus != "disaster" else { return }
    file.write(networkStatus)
}
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/system/measuring-execution-speed-using-cfabsolutetimegetcurrent">Measuring execution speed using CFAbsoluteTimeGetCurrent() 
/example-code/system/how-to-run-code-after-a-delay-using-asyncafter-and-perform">How to run code after a delay using asyncAfter() and perform() 
/quick-start/swiftui/how-to-delay-an-animation">How to delay an animation 
/example-code/language/how-to-use-the-rethrows-keyword">How to use the rethrows keyword 
/example-code/language/what-does-the-open-keyword-do">What does the open keyword do?</a>
`)],-1))])}const k=l(h,[["render",p],["__file","how-to-delay-execution-of-code-using-the-defer-keyword.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-delay-execution-of-code-using-the-defer-keyword.html","title":"How to delay execution of code using the defer keyword","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to delay execution of code using the defer keyword","description":"Article(s) > How to delay execution of code using the defer keyword","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to delay execution of code using the defer keyword"},{"property":"og:description","content":"How to delay execution of code using the defer keyword"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-delay-execution-of-code-using-the-defer-keyword.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-delay-execution-of-code-using-the-defer-keyword.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to delay execution of code using the defer keyword"}],["meta",{"property":"og:description","content":"Article(s) > How to delay execution of code using the defer keyword"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to delay execution of code using the defer keyword\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.33,"words":400},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-delay-execution-of-code-using-the-defer-keyword.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,x as data};
