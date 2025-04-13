import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as e,av as u,au as o,aw as i,ax as s,b as a,r as h,o as m}from"./app-CgstJRjh.js";const p={},d={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function y(r,t){const n=h("VPCard");return m(),c("div",null,[e("h1",d,[e("a",g,[e("span",null,u(r.$frontmatter.title)+" 관련",1)])]),o(n,i(s({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),o(n,i(s({title:"What is a lazy sequence? | Language - free Swift example code",desc:"What is a lazy sequence?",link:"https://hackingwithswift.com/example-code/language/what-is-a-lazy-sequence",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),a(" TODO: 작성 "),a(` 
Lazy sequences are regular sequences where each item is computed on demand rather than up front. For example, consider this array of numbers:

\`\`\`swift
let numbers = Array(1...100000)
\`\`\`

That will hold 100,000 numbers. Now, if we wanted to double all those numbers, we’d write something like this:

\`\`\`swift
let doubled = numbers.map { $0 * 2 }
\`\`\`

That will cause Swift to double all 100,000 numbers, and sometimes that’s exactly what you want. However, if you know you intend to use only a handful of them, you can make the calculation lazy instead, like this:

\`\`\`swift
let lazyDoubled = numbers.lazy.map { $0 * 2 }
\`\`\`

Now that \`map()\` call won’t do any work up front – it just stores the original array (numbers 1 to 100,000) alongside the transformation closure (double each number). So, when you request item 5,000 it can calculate just that one for you and return it in a split second – a significant time saving.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),a(`
/example-code/language/what-are-lazy-variables">What are lazy variables? 
/quick-start/swiftui/how-to-lazy-load-views-using-lazyvstack-and-lazyhstack">How to lazy load views using LazyVStack and LazyHStack 
/quick-start/concurrency/whats-the-difference-between-sequence-asyncsequence-and-asyncstream">What’s the difference between Sequence, AsyncSequence, and AsyncStream? 
/example-code/language/how-to-make-a-custom-sequence">How to make a custom sequence 
/quick-start/concurrency/how-to-convert-an-asyncsequence-into-a-sequence">How to convert an AsyncSequence into a Sequence</a>
`)],-1))])}const k=l(p,[["render",y],["__file","what-is-a-lazy-sequence.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-is-a-lazy-sequence.html","title":"What is a lazy sequence?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What is a lazy sequence?","description":"Article(s) > What is a lazy sequence?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What is a lazy sequence?"},{"property":"og:description","content":"What is a lazy sequence?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-a-lazy-sequence.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-a-lazy-sequence.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What is a lazy sequence?"}],["meta",{"property":"og:description","content":"Article(s) > What is a lazy sequence?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What is a lazy sequence?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.29,"words":388},"filePathRelative":"hackingwithswift.com/example-code/language/what-is-a-lazy-sequence.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,b as data};
