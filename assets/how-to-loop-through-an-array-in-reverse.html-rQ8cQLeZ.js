import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,b as e,t as h,e as r,n as a,g as n,a as t,r as c,o as p}from"./app-ubLChIzZ.js";const m={},g={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"},d=e("nav",{class:"table-of-contents"},[e("ul")],-1),y=e("hr",null,null,-1),w=e("blockquote",null,[e("p",null,"Available from iOS 7.0")],-1),f=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/arrays/how-to-loop-through-items-in-an-array">How to loop through items in an array 
/example-code/strings/how-to-loop-through-letters-in-a-string">How to loop through letters in a string 
/example-code/language/how-to-reverse-sort-an-array">How to reverse sort an array 
/example-code/strings/how-to-reverse-a-string-using-reversed">How to reverse a string using reversed() 
/example-code/language/how-to-use-the-foreach-method-to-loop-over-an-array">How to use the forEach method to loop over an array</a>
`)],-1);function v(i,_){const o=c("VPCard");return p(),l("div",null,[e("h1",g,[e("a",u,[e("span",null,h(i.$frontmatter.title)+" 관련",1)])]),r(o,a(n({title:"Array - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/arrays/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),d,y,r(o,a(n({title:"How to loop through an array in reverse | Array - free Swift example code",desc:"How to loop through an array in reverse",link:"https://hackingwithswift.com/example-code/arrays/how-to-loop-through-an-array-in-reverse",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,t(" TODO: 작성 "),t(` 
If you want to read through an array in reverse, you should use the \`reversed()\` method. You can use this as part of the regular fast enumeration technique if you want, which would give you code like this:

\`\`\`swift
let array = ["Apples", "Peaches", "Plums"]

for item in array.reversed() {
    print("Found \\(item)")
}
\`\`\`

You can also reverse an enumerated array just by appending the method call, like this:

\`\`\`swift
for (index, item) in array.reversed().enumerated() {
    print("Found \\(item) at position \\(index)")
}
\`\`\`

Note that whether you call \`reversed()\` then \`enumerated()\` or vice versa matters! In the above code, enumerate will count upwards, but if you use \`array.enumerated().reversed()\` it will count backwards.

`),f])}const x=s(m,[["render",v],["__file","how-to-loop-through-an-array-in-reverse.html.vue"]]),H=JSON.parse('{"path":"/hackingwithswift.com/example-code/arrays/how-to-loop-through-an-array-in-reverse.html","title":"How to loop through an array in reverse","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to loop through an array in reverse","description":"Article(s) > How to loop through an array in reverse","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to loop through an array in reverse"},{"property":"og:description","content":"How to loop through an array in reverse"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/arrays/how-to-loop-through-an-array-in-reverse.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/arrays/how-to-loop-through-an-array-in-reverse.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to loop through an array in reverse"}],["meta",{"property":"og:description","content":"Article(s) > How to loop through an array in reverse"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-29T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to loop through an array in reverse\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-29T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-29T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.24,"words":373},"filePathRelative":"hackingwithswift.com/example-code/arrays/how-to-loop-through-an-array-in-reverse.md","localizedDate":"2019년 3월 29일","excerpt":"\\n"}');export{x as comp,H as data};
