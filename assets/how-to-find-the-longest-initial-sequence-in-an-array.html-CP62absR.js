import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as e,av as h,au as i,aw as o,ax as r,b as n,r as p,o as m}from"./app-CmlMtt14.js";const g={},u={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"};function d(s,t){const a=p("VPCard");return m(),c("div",null,[e("h1",u,[e("a",f,[e("span",null,h(s.$frontmatter.title)+" 관련",1)])]),i(a,o(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),i(a,o(r({title:"How to find the longest initial sequence in an array | Language - free Swift example code",desc:"How to find the longest initial sequence in an array",link:"https://hackingwithswift.com/example-code/language/how-to-find-the-longest-initial-sequence-in-an-array",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),n(" TODO: 작성 "),n(` 
One of Swift’s lesser-known functions is \`prefix(while:)\`: call this on an array along with a test to apply, and it will return as many items from the start of the array as it can, stopping only when it reaches the first element that fails your test.

For example, if we had an array of test scores:

\`\`\`swift
let scores = [89, 86, 96, 78, 92, 100]
\`\`\`

We could use \`prefix(while:)\` to return all scores over 85 that occurred before the first score below 85 – i.e., find me all the passing scores that took place before the first person failed.

Here’s that in Swift:

\`\`\`swift
let initialPasses1 = scores.prefix { $0 > 85 }
\`\`\`

You can apply any test you want, and sometimes you’ll get back an empty array if the very first element fails your test. For example, this will return an empty array:

\`\`\`swift
let initialPasses2 = scores.prefix { $0 < 85 }
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),n(`
/quick-start/concurrency/whats-the-difference-between-sequence-asyncsequence-and-asyncstream">What’s the difference between Sequence, AsyncSequence, and AsyncStream? 
/example-code/language/how-to-make-a-custom-sequence">How to make a custom sequence 
/quick-start/concurrency/how-to-convert-an-asyncsequence-into-a-sequence">How to convert an AsyncSequence into a Sequence 
/example-code/games/how-to-run-skactions-in-a-sequence">How to run SKActions in a sequence 
/example-code/language/what-is-a-lazy-sequence">What is a lazy sequence?</a>
`)],-1))])}const q=l(g,[["render",d],["__file","how-to-find-the-longest-initial-sequence-in-an-array.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-find-the-longest-initial-sequence-in-an-array.html","title":"How to find the longest initial sequence in an array","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to find the longest initial sequence in an array","description":"Article(s) > How to find the longest initial sequence in an array","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to find the longest initial sequence in an array"},{"property":"og:description","content":"How to find the longest initial sequence in an array"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-find-the-longest-initial-sequence-in-an-array.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-find-the-longest-initial-sequence-in-an-array.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to find the longest initial sequence in an array"}],["meta",{"property":"og:description","content":"Article(s) > How to find the longest initial sequence in an array"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to find the longest initial sequence in an array\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.4,"words":420},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-find-the-longest-initial-sequence-in-an-array.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{q as comp,k as data};
