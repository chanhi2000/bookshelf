import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as h,f as e,av as c,au as a,aw as n,ax as i,b as o,r as p,o as m}from"./app-BQ88-Ybo.js";const u={},g={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function w(s,t){const r=p("VPCard");return m(),h("div",null,[e("h1",g,[e("a",d,[e("span",null,c(s.$frontmatter.title)+" 관련",1)])]),a(r,n(i({title:"Array - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/arrays/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),a(r,n(i({title:"How to loop through an array in reverse | Array - free Swift example code",desc:"How to loop through an array in reverse",link:"https://hackingwithswift.com/example-code/arrays/how-to-loop-through-an-array-in-reverse",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 7.0")],-1)),o(" TODO: 작성 "),o(` 
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

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/arrays/how-to-loop-through-items-in-an-array">How to loop through items in an array 
/example-code/strings/how-to-loop-through-letters-in-a-string">How to loop through letters in a string 
/example-code/language/how-to-reverse-sort-an-array">How to reverse sort an array 
/example-code/strings/how-to-reverse-a-string-using-reversed">How to reverse a string using reversed() 
/example-code/language/how-to-use-the-foreach-method-to-loop-over-an-array">How to use the forEach method to loop over an array</a>
`)],-1))])}const v=l(u,[["render",w],["__file","how-to-loop-through-an-array-in-reverse.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/arrays/how-to-loop-through-an-array-in-reverse.html","title":"How to loop through an array in reverse","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to loop through an array in reverse","description":"Article(s) > How to loop through an array in reverse","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to loop through an array in reverse"},{"property":"og:description","content":"How to loop through an array in reverse"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/arrays/how-to-loop-through-an-array-in-reverse.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/arrays/how-to-loop-through-an-array-in-reverse.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to loop through an array in reverse"}],["meta",{"property":"og:description","content":"Article(s) > How to loop through an array in reverse"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-29T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to loop through an array in reverse\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-29T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-29T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.24,"words":373},"filePathRelative":"hackingwithswift.com/example-code/arrays/how-to-loop-through-an-array-in-reverse.md","localizedDate":"2019년 3월 29일","excerpt":"\\n"}');export{v as comp,k as data};
