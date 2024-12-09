import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,b as e,t as c,e as a,n as i,g as n,a as t,r as u,o as p}from"./app-ubLChIzZ.js";const h={},d={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"},w=e("nav",{class:"table-of-contents"},[e("ul")],-1),f=e("hr",null,null,-1),g=e("blockquote",null,[e("p",null,"Available from iOS 4.0")],-1),y=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/quick-start/swiftui/whats-the-difference-between-observedobject-state-and-environmentobject">What’s the difference between @ObservedObject, @State, and @EnvironmentObject? 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/system/how-to-make-one-operation-wait-for-another-to-complete-using-adddependency">How to make one operation wait for another to complete using addDependency() 
/quick-start/concurrency/how-to-call-an-async-function-using-async-let">How to call an async function using async let</a>
`)],-1);function k(r,b){const o=u("VPCard");return p(),l("div",null,[e("h1",d,[e("a",m,[e("span",null,c(r.$frontmatter.title)+" 관련",1)])]),a(o,i(n({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,f,a(o,i(n({title:"How to use multithreaded operations with OperationQueue | System - free Swift example code",desc:"How to use multithreaded operations with OperationQueue",logo:"https://hackingwithswift.com/favicon.svg",link:"https://hackingwithswift.com/example-code/how-to-use-multithreaded-operations-with-operationqueue",background:"rgba(174,10,10,0.2)"})),null,16),g,t(" TODO: 작성 "),t(` 
There are lots of ways to work with Grand Central Dispatch (GCD) on iOS, but \`OperationQueue\` is particularly powerful because it lets you control precisely how many simultaneous operations can run and what quality of service you need, while also letting you schedule work using closures. You can even ask the operation queue to wait until all its operations are finished, which makes scheduling easier.

If you had an array of images you needed to process then save somewhere, you might normally write a loop like this:

\`\`\`swift
for image in images {
    process(image)
}
\`\`\`

However, that’s single-threaded – it can only use one of the available CPU cores. With only a small change you can get the same behavior working across multiple cores, and the operation queue will wait until it’s all complete so it doesn’t change the meaning of your code:

\`\`\`swift
let queue = OperationQueue()

for image in images {
    queue.addOperation {
        self.process(image)
    }
}

queue.waitUntilAllOperationsAreFinished()
\`\`\`

You can add as many operations as you want, but they don’t all get executed at the same time. Instead, \`OperationQueue\` limits the number of operations based on system conditions – if it’s a more powerful device that isn’t doing much right now, you’ll get more operations than a less powerful device or a device that’s busy with other work.

You can override this behavior if you need something specific:

\`\`\`swift
queue.maxConcurrentOperationCount = 4
\`\`\`

And if you ever need to stop all operations that have yet to be started, call \`cancelAllOperations()\` on your queue, like this:

\`\`\`swift
queue.cancelAllOperations()
\`\`\`

That won’t cancel any operations that are currently in flight.

`),y])}const _=s(h,[["render",k],["__file","how-to-use-multithreaded-operations-with-operationqueue.html.vue"]]),q=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-use-multithreaded-operations-with-operationqueue.html","title":"How to use multithreaded operations with OperationQueue","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to use multithreaded operations with OperationQueue","description":"Article(s) > How to use multithreaded operations with OperationQueue","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-4.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to use multithreaded operations with OperationQueue"},{"property":"og:description","content":"How to use multithreaded operations with OperationQueue"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-use-multithreaded-operations-with-operationqueue.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-use-multithreaded-operations-with-operationqueue.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to use multithreaded operations with OperationQueue"}],["meta",{"property":"og:description","content":"Article(s) > How to use multithreaded operations with OperationQueue"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-4.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to use multithreaded operations with OperationQueue\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.75,"words":526},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-use-multithreaded-operations-with-operationqueue.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{_ as comp,q as data};
