import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as e,as as c,ao as a,at as i,au as r,ak as o,aq as d,ar as h}from"./app-DpiNAgkx.js";const m={},u={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"};function g(s,t){const n=d("VPCard");return h(),l("div",null,[e("h1",u,[e("a",w,[e("span",null,c(s.$frontmatter.title)+" 관련",1)])]),a(n,i(r({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),a(n,i(r({title:"How to make one operation wait for another to complete using addDependency() | System - free Swift example code",desc:"How to make one operation wait for another to complete using addDependency()",logo:"https://hackingwithswift.com/favicon.svg",link:"https://hackingwithswift.com/example-code/how-to-make-one-operation-wait-for-another-to-complete-using-adddependency",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 2.0")],-1)),o(" TODO: 작성 "),o(` 
When working with multiple instances of \`Operation\`, you’ll often want to queue up work that needs to be performed sequentially rather than all at once. If you want one operation to wait for another to complete before it starts, regardless of which operation queue either one is running on, you should use \`addDependency()\` to make the sequence clear to the system.

As an example, we could create two instances of \`BlockOperation\` that each print messages and pause a little:

\`\`\`swift
let operation1 = BlockOperation {
    print("Operation 1 is starting")
    Thread.sleep(forTimeInterval: 1)
    print("Operation 1 is finishing")
}

let operation2 = BlockOperation {
    print("Operation 2 is starting")
    Thread.sleep(forTimeInterval: 1)
    print("Operation 2 is finishing")
}
\`\`\`

If we added those directly to an operation queue, they would both start running immediately. However, we could tell \`operation2\` that it needs to wait for \`operation1\` to complete, like this:

\`\`\`swift
operation2.addDependency(operation1)
\`\`\`

Now if we add the operations to a queue they will execute sequentially rather than in parallel:

\`\`\`swift
print("Adding operations")
let queue = OperationQueue()
queue.addOperation(operation1)
queue.addOperation(operation2)
queue.waitUntilAllOperationsAreFinished()
print("Done!")
\`\`\`

You can add dependencies across operation queues if you need, which means you can queue up work to run in the background, then the main thread, then back to the background again without causing problems. So, we could rewrite the above code to run the operations on separate operation queues and we’d still get the same end result:

\`\`\`swift
print("Adding operations")
let queue1 = OperationQueue()
let queue2 = OperationQueue()
queue1.addOperation(operation1)
queue2.addOperation(operation2)
queue2.waitUntilAllOperationsAreFinished()
print("Done!")
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/networking/how-to-make-a-network-request-wait-for-an-internet-connection-using-waitsforconnectivity">How to make a network request wait for an internet connection using waitsForConnectivity 
/example-code/games/how-to-make-one-sprite-draw-in-front-of-another-using-zposition">How to make one sprite draw in front of another using zPosition 
/quick-start/swiftui/how-to-force-one-gesture-to-recognize-before-another-using-highprioritygesture">How to force one gesture to recognize before another using highPriorityGesture() 
/example-code/language/how-to-append-one-array-to-another-array">How to append one array to another array 
/quick-start/swiftui/how-to-mask-one-view-with-another">How to mask one view with another</a>
`)],-1))])}const k=p(m,[["render",g],["__file","how-to-make-one-operation-wait-for-another-to-complete-using-adddependency.html.vue"]]),O=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-make-one-operation-wait-for-another-to-complete-using-adddependency.html","title":"How to make one operation wait for another to complete using addDependency()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make one operation wait for another to complete using addDependency()","description":"Article(s) > How to make one operation wait for another to complete using addDependency()","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make one operation wait for another to complete using addDependency()"},{"property":"og:description","content":"How to make one operation wait for another to complete using addDependency()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-make-one-operation-wait-for-another-to-complete-using-adddependency.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-make-one-operation-wait-for-another-to-complete-using-adddependency.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make one operation wait for another to complete using addDependency()"}],["meta",{"property":"og:description","content":"Article(s) > How to make one operation wait for another to complete using addDependency()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-10-29T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make one operation wait for another to complete using addDependency()\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-29T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-10-29T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.91,"words":572},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-make-one-operation-wait-for-another-to-complete-using-adddependency.md","localizedDate":"2019년 10월 29일","excerpt":"\\n"}');export{k as comp,O as data};
