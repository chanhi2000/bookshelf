import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as t,av as p,au as a,aw as i,ax as r,b as o,r as m,o as h}from"./app-C2w16SxA.js";const g={},u={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function w(l,e){const n=m("VPCard");return h(),c("div",null,[t("h1",u,[t("a",d,[t("span",null,p(l.$frontmatter.title)+" 관련",1)])]),a(n,i(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),a(n,i(r({title:"How to loop over non-nil items in an array | Language - free Swift example code",desc:"How to loop over non-nil items in an array",link:"https://hackingwithswift.com/example-code/language/how-to-loop-over-non-nil-items-in-an-array",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o(" TODO: 작성 "),o(` 
Consider an array of items containing some optionals, like this one:

\`\`\`swift
let numbers: [Int?] = [1, nil, 3, nil, 5]
\`\`\`

If you want to loop over all the items and print them out, you’d write something like this:

\`\`\`swift
for number in numbers {
    print(number)
}
\`\`\`

However, that prints out all items in their current state: optionally wrapped integers for some, nil for others. 

With a small change to that loop, you can have Swift unwrap all the optionals then only enter the loop for any that contain a value – any \`nil\` items are ignored. This is done using \`for case let\` syntax, like this:

\`\`\`swift
for case let number? in numbers {
    print(number)
}
\`\`\`

That will print the numbers 1, 3, and 5.

`),e[2]||(e[2]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/example-code/language/how-to-use-the-foreach-method-to-loop-over-an-array">How to use the forEach method to loop over an array 
/example-code/language/using-stride-to-loop-over-a-range-of-numbers">Using stride() to loop over a range of numbers 
/example-code/arrays/how-to-loop-through-items-in-an-array">How to loop through items in an array 
/quick-start/swiftui/how-to-detect-the-user-hovering-over-a-view">How to detect the user hovering over a view 
/example-code/core-haptics/how-to-modify-haptic-events-over-time-using-chhapticparametercurve">How to modify haptic events over time using CHHapticParameterCurve</a>
`)],-1))])}const v=s(g,[["render",w],["__file","how-to-loop-over-non-nil-items-in-an-array.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-loop-over-non-nil-items-in-an-array.html","title":"How to loop over non-nil items in an array","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to loop over non-nil items in an array","description":"Article(s) > How to loop over non-nil items in an array","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to loop over non-nil items in an array"},{"property":"og:description","content":"How to loop over non-nil items in an array"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-loop-over-non-nil-items-in-an-array.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-loop-over-non-nil-items-in-an-array.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to loop over non-nil items in an array"}],["meta",{"property":"og:description","content":"Article(s) > How to loop over non-nil items in an array"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to loop over non-nil items in an array\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.37,"words":410},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-loop-over-non-nil-items-in-an-array.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,b as data};
