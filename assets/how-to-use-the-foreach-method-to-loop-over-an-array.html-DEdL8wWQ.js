import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as o,t as l,e as a,n as r,g as n,a as t,r as h,o as p}from"./app-DLPYIRXq.js";const m={},d={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},u=o("nav",{class:"table-of-contents"},[o("ul")],-1),f=o("hr",null,null,-1),w=o("blockquote",null,[o("p",null,"Available from iOS 8.0")],-1),y=o("details",{class:"hint-container details"},[o("summary",null,"Similar solutions…"),t(`
/quick-start/swiftui/how-to-create-views-in-a-loop-using-foreach">How to create views in a loop using ForEach 
/example-code/language/how-to-loop-over-non-nil-items-in-an-array">How to loop over non-nil items in an array 
/quick-start/swiftui/how-to-create-a-list-or-a-foreach-from-a-binding">How to create a List or a ForEach from a binding 
/quick-start/concurrency/how-to-loop-over-an-asyncsequence-using-for-await">How to loop over an AsyncSequence using for await 
/example-code/language/using-stride-to-loop-over-a-range-of-numbers">Using stride() to loop over a range of numbers</a>
`)],-1);function v(i,b){const e=h("VPCard");return p(),s("div",null,[o("h1",d,[o("a",g,[o("span",null,l(i.$frontmatter.title)+" 관련",1)])]),a(e,r(n({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),u,f,a(e,r(n({title:"How to use the forEach method to loop over an array | Language - free Swift example code",desc:"How to use the forEach method to loop over an array",link:"https://hackingwithswift.com/example-code/language/how-to-use-the-foreach-method-to-loop-over-an-array",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,t(" TODO: 작성 "),t(` 
In Swift we normally loop over arrays like this:

\`\`\`swift
let numbers = [1, 2, 3, 4, 5]

for number in numbers {
    print(number)
}
\`\`\`

However, Swift provides us an alternative: a dedicated array method called \`forEach()\`, that loops over each item in the array and does something with it. For example, the above loop would be written like this:

\`\`\`swift
numbers.forEach {
    print($0)
}
\`\`\`

The difference is that \`forEach()\` can’t skip over any items – you can’t exit the loop part way, without processing the rest of the items. This helps people reading your code to figure out your intent: you want to act on all items, and won’t stop in the middle.

`),y])}const x=c(m,[["render",v],["__file","how-to-use-the-foreach-method-to-loop-over-an-array.html.vue"]]),E=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-use-the-foreach-method-to-loop-over-an-array.html","title":"How to use the forEach method to loop over an array","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to use the forEach method to loop over an array","description":"Article(s) > How to use the forEach method to loop over an array","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to use the forEach method to loop over an array"},{"property":"og:description","content":"How to use the forEach method to loop over an array"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-use-the-foreach-method-to-loop-over-an-array.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-use-the-foreach-method-to-loop-over-an-array.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to use the forEach method to loop over an array"}],["meta",{"property":"og:description","content":"Article(s) > How to use the forEach method to loop over an array"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to use the forEach method to loop over an array\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.39,"words":417},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-use-the-foreach-method-to-loop-over-an-array.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,E as data};
