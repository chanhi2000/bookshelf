import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as h,am as t,as as c,ao as o,at as n,au as r,al as l,aq as d,ar as u}from"./app-CpYYKbnj.js";const m={},p={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},w={class:"hint-container details"};function f(i,e){const a=d("VPCard");return u(),h("div",null,[t("h1",p,[t("a",g,[t("span",null,c(i.$frontmatter.title)+" 관련",1)])]),o(a,n(r({title:"Swift Concurrency by Example",desc:"Back to Home",link:"/hackingwithswift.com/concurrency/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[1]||(e[1]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[2]||(e[2]=t("hr",null,null,-1)),o(a,n(r({title:"Understanding threads and queues | Swift Concurrency by Example",desc:"Understanding threads and queues",link:"https://hackingwithswift.com/quick-start/concurrency/understanding-threads-and-queues",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e[3]||(e[3]=l('<blockquote><p>Updated for Xcode 15</p></blockquote><p>Every program launches with at least one thread where its work takes place, called the <em>main thread</em>. Super simple command-line apps for macOS might only ever have that one thread, iOS apps will have many more to do all sorts of other jobs, but either way that initial thread – the one the app is first launched with – always exists for the lifetime of the app, and it’s always called the main thread.</p><p>This is important, because all your user interface work must take place on that main thread. Not some work some of the time, but <em>all</em> work <em>all</em> the time – if you try to update your UI from any other thread in your program you might find nothing happens, you might find your app crashes, or pretty much anywhere in between.</p><p>This rule exists for all apps that run on iOS, macOS, tvOS, and watchOS, and even though it’s simple you will – <em>will</em> – forget it at some point in the future. It’s like an initiation rite, except it happens more often than I’d like to admit even after years of programming.</p><p>Although Swift lets us create threads whenever we want, this is uncommon because it creates a lot of complexity. Each thread you create needs to run <em>somewhere</em>, and if you accidentally end up creating 40 threads when you have only 4 CPU cores, the system will need to spend a lot of time just swapping them.</p><p>Swapping threads is known as a <em>context switch</em>, and it has a performance cost: the system must stash away all the data the thread was using and remember how far it had progressed in its work, before giving another thread the chance to run. When this happens a lot – when you create many more threads compared to the number of available CPU cores – the cost of context switching grows high, and so it has a suitably disastrous-sounding name: <em>thread explosion</em>.</p><p>And so, apart from that main thread of work that starts our whole program and manages the user interface, we normally prefer to think of our work in terms of <em>queues</em>.</p><p>Queues work like they do in real life, where you might line up to buy something at a grocery store: you join the queue at the back, then move forward again and again until you’re at the front, at which point you can check out. Some bigger stores might have lots of queues leading up to lots of checkouts, and small stores might just have one queue with one checkout. You might occasionally see stores trying to avoid the problem of one queue moving faster than another by having a single shared queue feed into multiple checkouts – there are all sorts of possible combinations.</p><p>Swift’s queues work exactly the same way: we create a queue and add work to it, and the system will remove and execute work from there in the order it was added. Sometimes the queues are <em>serial</em>, which means they remove one piece of work from the front of the queue and complete it before going onto the next piece of work; and sometimes they are <em>concurrent</em>, which means they remove and execute multiple pieces of work at a time. Either way work will start in the order it was added to the queue unless we specifically say something has a high or low priority.</p><p>You might look at that and wonder why you even need serial queues – surely running one thing at a time is what we’re trying to avoid? Well, no. In fact, there are lots of times when having the predictability of a serial queue is important.</p><p>As a simple example, your user might want to batch convert a collection of videos from one format to another. Video conversion is a really intense operation and is already highly optimized to take full advantage of multi-core CPUs, so it’s more efficient to convert one video fully, then the next, then a third, and so on until you reach the end, rather than trying to convert four at once. This kind of work is perfect for a serial queue.</p><p>More importantly, sometimes serial queues are <em>required</em> to ensure our data is safe. For example, manipulating your user’s data is exactly the kind of work you’d want to do on a serial queue, because it stops you from trying to read the data at the same time some other part of your program is trying to write new data.</p><p>Putting this all together, threads are the individual slices of a program that do pieces of work, whereas queues are like pipelines of execution where we can request that work be done at some point. Queues are easier to think about than threads because they focus on what matters: we don’t care how some code runs on the CPU, as long as it either runs in a particular order (serially) or not (concurrently). A lot of the time we don’t even create the queue – we just use one of the built-in queues and let the system figure out how it should happen.</p><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>Sometimes Apple’s frameworks will help you a little here. For example, even though using the <code>@State</code> property wrapper in a view will cause the body to be refreshed when the property is changed, this property wrapper is designed to be safe to call on any thread.</p></div>',14)),t("details",w,[e[0]||(e[0]=t("summary",null,"Similar solutions…",-1)),o(a,n(r({title:"Understanding how global actor inference works | Swift Concurrency by Example",desc:"Understanding how global actor inference works",link:"/hackingwithswift.com/concurrency/understanding-how-global-actor-inference-works.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),o(a,n(r({title:"Understanding how priority escalation works | Swift Concurrency by Example",desc:"Understanding how priority escalation works",link:"/hackingwithswift.com/concurrency/understanding-how-priority-escalation-works.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),o(a,n(r({title:"How to create and use an actor in Swift | Swift Concurrency by Example",desc:"How to create and use an actor in Swift",link:"/hackingwithswift.com/concurrency/how-to-create-and-use-an-actor-in-swift.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),o(a,n(r({title:"What is an actor and why does Swift have them? | Swift Concurrency by Example",desc:"What is an actor and why does Swift have them?",link:"/hackingwithswift.com/concurrency/what-is-an-actor-and-why-does-swift-have-them.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),o(a,n(r({title:"How to create and run a task | Swift Concurrency by Example",desc:"How to create and run a task",link:"/hackingwithswift.com/concurrency/how-to-create-and-run-a-task.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const b=s(m,[["render",f],["__file","understanding-threads-and-queues.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/concurrency/understanding-threads-and-queues.html","title":"Understanding threads and queues","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Understanding threads and queues","description":"Article(s) > Understanding threads and queues","category":["Swift","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Understanding threads and queues"},{"property":"og:description","content":"Understanding threads and queues"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/concurrency/understanding-threads-and-queues.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/concurrency/understanding-threads-and-queues.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Understanding threads and queues"}],["meta",{"property":"og:description","content":"Article(s) > Understanding threads and queues"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2021-07-01T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Understanding threads and queues\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-07-01T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2021-07-01T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":4.12,"words":1237},"filePathRelative":"hackingwithswift.com/concurrency/understanding-threads-and-queues.md","localizedDate":"2021년 7월 1일","excerpt":"\\n"}');export{b as comp,v as data};