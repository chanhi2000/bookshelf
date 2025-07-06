import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as h,f as e,av as p,au as a,aw as i,ax as r,b as o,r as s,o as d}from"./app-Bhu0350G.js";const u={},g={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"};function f(c,t){const n=s("VPCard"),m=s("VidStack");return d(),h("div",null,[e("h1",g,[e("a",w,[e("span",null,p(c.$frontmatter.title)+" 관련",1)])]),a(n,i(r({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),a(n,i(r({title:"How to make an action repeat using Timer | System - free Swift example code",desc:"How to make an action repeat using Timer",logo:"https://hackingwithswift.com/favicon.svg",link:"https://hackingwithswift.com/example-code/how-to-make-an-action-repeat-using-timer",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 2.0")],-1)),a(m,{src:"youtube/DehLJj0JmVY"}),o(" TODO: 작성 "),o(` 
Timers are a great way to run code on a repeating basis, and iOS has the \`Timer\` class to handle it for you. First, create a property of the type \`Timer?\`. For example:

\`\`\`swift
var gameTimer: Timer?
\`\`\`

You can then create that timer in somewhere like \`viewDidLoad()\` and tell it to execute every five seconds, like this:

\`\`\`swift
gameTimer = Timer.scheduledTimer(timeInterval: 5, target: self, selector: #selector(runTimedCode), userInfo: nil, repeats: true)
\`\`\`

The \`runTimedCode\` selector means that the timer will call a method named \`runTimedCode()\` every five seconds until the timer is terminated, so you'll need to replace that method name with whatever you want to call – and don’t forget to mark it using \`@objc\`.

Important note: because your object has a property to store the timer, and the timer calls a method on the object, you have a strong reference cycle that means neither object can be freed. To fix this, make sure you invalidate the timer when you're done with it, such as when your view is about to disappear:

\`\`\`swift
gameTimer?.invalidate()
\`\`\`

Alternatively, you can create timers that execute a closure rather than calling a method. For example, this creates a timer that executes a closure every second, and inside the closure a random number between 1 and 20 is selected:

\`\`\`swift
Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { timer in
    let randomNumber = Int.random(in: 1...20)
    print("Number: \\(randomNumber)")

    if randomNumber == 10 {
        timer.invalidate()
    }
}
\`\`\`

As you can see, the closure is given a reference to the active timer, and can invalidate it at will – in our case, that’s when the random number is 10.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/how-to-make-buttons-that-repeat-their-action-when-pressed">How to make buttons that repeat their action when pressed 
/quick-start/swiftui/how-to-use-a-timer-with-swiftui">How to use a timer with SwiftUI 
/example-code/xcode/how-to-repeat-code-when-debugging-using-the-instruction-pointer">How to repeat code when debugging using the instruction pointer 
/example-code/strings/how-to-repeat-a-string">How to repeat a string 
/quick-start/swiftui/how-to-show-an-action-sheet">How to show an action sheet</a>
`)],-1))])}const b=l(u,[["render",f],["__file","how-to-make-an-action-repeat-using-timer.html.vue"]]),T=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-make-an-action-repeat-using-timer.html","title":"How to make an action repeat using Timer","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make an action repeat using Timer","description":"Article(s) > How to make an action repeat using Timer","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make an action repeat using Timer"},{"property":"og:description","content":"How to make an action repeat using Timer"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-make-an-action-repeat-using-timer.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-make-an-action-repeat-using-timer.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make an action repeat using Timer"}],["meta",{"property":"og:description","content":"Article(s) > How to make an action repeat using Timer"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-09-19T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make an action repeat using Timer\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-09-19T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-09-19T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.78,"words":533},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-make-an-action-repeat-using-timer.md","localizedDate":"2019년 9월 19일","excerpt":"\\n"}');export{b as comp,T as data};
