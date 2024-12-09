import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,b as e,t as s,e as o,n as l,g as n,a as t,r as m,o as d}from"./app-ubLChIzZ.js";const p={},h={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},u=e("nav",{class:"table-of-contents"},[e("ul")],-1),y=e("hr",null,null,-1),g=e("blockquote",null,[e("p",null,"Available from iOS 4.0")],-1),w=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/quick-start/concurrency/how-to-cancel-a-task">How to cancel a Task 
/quick-start/concurrency/how-to-cancel-a-task-group">How to cancel a task group 
/example-code/system/how-to-run-code-after-a-delay-using-asyncafter-and-perform">How to run code after a delay using asyncAfter() and perform() 
/example-code/naturallanguage/how-to-perform-sentiment-analysis-on-a-string-using-nltagger">How to perform sentiment analysis on a string using NLTagger 
/example-code/uikit/how-to-perform-a-segue-programmatically-using-performsegue">How to perform a segue programmatically using performSegue()</a>
`)],-1);function b(r,k){const a=m("VPCard");return d(),i("div",null,[e("h1",h,[e("a",f,[e("span",null,s(r.$frontmatter.title)+" 관련",1)])]),o(a,l(n({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),u,y,o(a,l(n({title:"How to cancel a delayed perform() call | System - free Swift example code",desc:"How to cancel a delayed perform() call",link:"https://hackingwithswift.com/example-code/system/how-to-cancel-a-delayed-perform-call",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,t(" TODO: 작성 "),t(` 
You can make a method call run after a number of seconds have elapsed using \`perform(_:withObject:afterDelay:)\`, like this:

\`\`\`swift
perform(#selector(yourMethodHere), with: nil, afterDelay: 1)
\`\`\`

However, what if you change your mind, and decide you don't want \`yourMethodHere()\` to be called? As long as you act before that timer expires, you have two options: cancel that specific delayed call, or cancel all delayed calls.

To cancel that specific method call, you need to use the method \`cancelPreviousPerformRequests(withTarget:)\` on \`NSObject\`. Provide it with a target (where the method was going to be called), as well as the same selector and object you used when calling \`perform()\`, and it will cancel that delayed call.

For example:

\`\`\`swift
// set up a delayed call…
perform(#selector(yourMethodHere), with: nil, afterDelay: 1)

// …then immediately cancel it
NSObject.cancelPreviousPerformRequests(withTarget: self, selector: #selector(yourMethodHere), object: nil)
\`\`\`

Being able to filter the cancellation by both selector and object means you can be very specific: "cancel the printing call for this filename."

If you've made a number of delayed calls and want to cancel them all – very helpful if you're about to leave a view controller, for example, and want to abandon any queued work – you can use this method call instead:

\`\`\`swift
NSObject.cancelPreviousPerformRequests(withTarget: self)
\`\`\`

That will cancel every call that was queued up on \`self\`, regardless of which selectors and objects were used.

If you're making delayed calls on a specific object, just use that object in place of \`self\`. For example:

\`\`\`swift
myObj.perform(#selector(yourMethodHere), with: nil, afterDelay: 1)
NSObject.cancelPreviousPerformRequests(withTarget: myObj, selector: #selector(yourMethodHere), object: nil)
\`\`\`

`),w])}const x=c(p,[["render",b],["__file","how-to-cancel-a-delayed-perform-call.html.vue"]]),H=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-cancel-a-delayed-perform-call.html","title":"How to cancel a delayed perform() call","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to cancel a delayed perform() call","description":"Article(s) > How to cancel a delayed perform() call","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-4.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to cancel a delayed perform() call"},{"property":"og:description","content":"How to cancel a delayed perform() call"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-cancel-a-delayed-perform-call.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-cancel-a-delayed-perform-call.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to cancel a delayed perform() call"}],["meta",{"property":"og:description","content":"Article(s) > How to cancel a delayed perform() call"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-4.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to cancel a delayed perform() call\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.77,"words":530},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-cancel-a-delayed-perform-call.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{x as comp,H as data};
