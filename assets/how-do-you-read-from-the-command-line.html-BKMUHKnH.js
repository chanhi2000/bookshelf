import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as m,am as e,as as c,ao as a,at as i,au as r,ak as o,aq as d,ar as p}from"./app-CpYYKbnj.js";const h={},u={id:"frontmatter-title-관련",tabindex:"-1"},y={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,t){const n=d("VPCard");return p(),m("div",null,[e("h1",u,[e("a",y,[e("span",null,c(s.$frontmatter.title)+" 관련",1)])]),a(n,i(r({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),a(n,i(r({title:"How do you read from the command line? | System - free Swift example code",desc:"How do you read from the command line?",link:"https://hackingwithswift.com/example-code/system/how-do-you-read-from-the-command-line",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 7.0")],-1)),o(" TODO: 작성 "),o(` 
If you're working on a command-line app for macOS or Linux, you'll probably want to read and manipulate commands typed by the user. This is easy to do using the \`readLine()\` function, which reads one line of user input (everything until they hit return) and sends it back to you.

Note: it's possible for users to enter no input, which is different from an empty string. This means \`readLine()\` returns an optional string when you call it, where nil is used to represent "no input".

Here's some example code to get you started:

\`\`\`swift
print("Please enter your name:")

if let name = readLine() {
    print("Hello, \\(name)!")
} else {
    print("Why are you being so coy?")
}

print("TTFN!")
\`\`\`

When that example is run, you'll see the first \`print()\` message, then the program will pause until the user has entered some text and pressed return. If they entered any text at all, including an empty string, they'll see the "Hello" output. If they entered no text – try it yourself by pressing Ctrl+D to trigger an "end of file" signal – they'll get the other message. Regardless of what they press, they'll see the final "TTFN!" message before the program finishes.

It should go without saying that command-line input is not available on iOS. Maybe in iOS 15…

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/system/how-to-run-code-when-your-app-is-terminated">How to run code when your app is terminated 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/concurrency/how-to-make-async-command-line-tools-and-scripts">How to make async command-line tools and scripts 
/example-code/uikit/how-to-localize-your-ios-app">How to localize your iOS app 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode</a>
`)],-1))])}const k=l(h,[["render",f],["__file","how-do-you-read-from-the-command-line.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-do-you-read-from-the-command-line.html","title":"How do you read from the command line?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How do you read from the command line?","description":"Article(s) > How do you read from the command line?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How do you read from the command line?"},{"property":"og:description","content":"How do you read from the command line?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-do-you-read-from-the-command-line.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-do-you-read-from-the-command-line.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How do you read from the command line?"}],["meta",{"property":"og:description","content":"Article(s) > How do you read from the command line?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How do you read from the command line?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.6,"words":479},"filePathRelative":"hackingwithswift.com/example-code/system/how-do-you-read-from-the-command-line.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{k as comp,b as data};