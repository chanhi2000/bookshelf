import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as e,as as h,ao as i,at as n,au as r,ak as a,aq as m,ar as d}from"./app-CpYYKbnj.js";const p={},g={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,t){const o=m("VPCard");return d(),c("div",null,[e("h1",g,[e("a",u,[e("span",null,h(s.$frontmatter.title)+" 관련",1)])]),i(o,n(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),i(o,n(r({title:"What is MVVM? | Language - free Swift example code",desc:"What is MVVM?",link:"https://hackingwithswift.com/example-code/language/what-is-mvvm",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a(" TODO: 작성 "),a(` 
MVVM stands for “Model View ViewModel”, and it’s a software architecture often used by Apple developers to replace MVC.

In MVC the way most Apple developers practice it, the view controller forms part of the Controller layer (the C in MVC), which means it’s responsible for doing lots of layout as well as being a general dumping ground for functionality.

In MVVM view controllers are considered part of the V layer, which means their job is to focus specifically on layout and the view lifecycle – \`viewDidLoad()\` and so on. In its place a new object is created called the *view model*, which is effectively most of the code you had in your view controller before except without UIKit attached. That is, it should be capable of responding to requests for data, and so on, except it shouldn’t reference any user interface controls.

This might seem like you’re just pointlessly moving code around, but the difference is important: because your view model is more like a *model* than like a *view* you can write tests for it more easily. Rather than having to mock up a \`UITextField\` to insert some data, you should be able to call a method that accepts a string because your view model shouldn’t rely on any user interface components.

While all this sounds positive, MVVM does have a big drawback on iOS: it relies on a system of two-way bindings that can communicate view data to your view model, otherwise you need to do a lot of work shuttling data around yourself.

`),t[2]||(t[2]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),a(`
/example-code/language/how-to-create-multi-line-string-literals">How to create multi-line string literals 
/example-code/language/how-to-use-compactmap-to-transform-an-array">How to use compactMap() to transform an array 
/example-code/language/what-is-a-storyboard">What is a storyboard? 
/example-code/language/what-are-designated-initializers">What are designated initializers? 
/example-code/language/what-is-automatic-reference-counting-arc">What is Automatic Reference Counting (ARC)?</a>
`)],-1))])}const v=l(p,[["render",f],["__file","what-is-mvvm.html.vue"]]),V=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-is-mvvm.html","title":"What is MVVM?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What is MVVM?","description":"Article(s) > What is MVVM?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What is MVVM?"},{"property":"og:description","content":"What is MVVM?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-mvvm.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-mvvm.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What is MVVM?"}],["meta",{"property":"og:description","content":"Article(s) > What is MVVM?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What is MVVM?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.53,"words":458},"filePathRelative":"hackingwithswift.com/example-code/language/what-is-mvvm.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,V as data};