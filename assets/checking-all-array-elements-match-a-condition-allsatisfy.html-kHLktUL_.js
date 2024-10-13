import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as e,t as s,e as n,n as i,g as o,a as t,r as h,o as m}from"./app-TWLwS86W.js";const g={},d={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"},f=e("nav",{class:"table-of-contents"},[e("ul")],-1),y=e("hr",null,null,-1),u=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1),w=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/language/check-whether-all-items-in-an-array-match-a-condition">Check whether all items in an array match a condition 
/example-code/strings/nsregularexpression-how-to-match-regular-expressions-in-strings">NSRegularExpression: How to match regular expressions in strings 
/example-code/language/removing-matching-elements-from-a-collection-removeallwhere">Removing matching elements from a collection: removeAll(where:) 
/quick-start/swiftui/enabling-and-disabling-elements-in-forms">Enabling and disabling elements in forms 
/example-code/uikit/how-set-different-widths-for-a-uisegmentedcontrols-elements">How set different widths for a UISegmentedControl's elements</a>
`)],-1);function k(l,S){const a=h("VPCard");return m(),c("div",null,[e("h1",d,[e("a",p,[e("span",null,s(l.$frontmatter.title)+" 관련",1)])]),n(a,i(o({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,y,n(a,i(o({title:"Checking all array elements match a condition: allSatisfy() | Language - free Swift example code",desc:"Checking all array elements match a condition: allSatisfy()",link:"https://hackingwithswift.com/example-code/language/checking-all-array-elements-match-a-condition-allsatisfy",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),u,t(" TODO: 작성 "),t(` 
If you have a collection of objects and want to check that all of them match a specific condition, you should use the \`allSatisfy()\` method.

For example, if we had an array of words and wanted to make sure they all start with the letter “S”, we could write code like this:

\`\`\`swift
let sWords = ["Swift", "Seahorse", "Solar"]
let allMatch = sWords.allSatisfy { $0.hasPrefix("S") }
\`\`\`

Alternatively, if we had an array of exam results like this:

\`\`\`swift
let scores = [85, 88, 95, 92]
\`\`\`

We could decide whether that student passed their course by checking whether all their exam results were 85 or higher:

\`\`\`swift
let passed = scores.allSatisfy { $0 >= 85 }
\`\`\`

`),w])}const b=r(g,[["render",k],["__file","checking-all-array-elements-match-a-condition-allsatisfy.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/checking-all-array-elements-match-a-condition-allsatisfy.html","title":"Checking all array elements match a condition: allSatisfy()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Checking all array elements match a condition: allSatisfy()","description":"Article(s) > Checking all array elements match a condition: allSatisfy()","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Checking all array elements match a condition: allSatisfy()"},{"property":"og:description","content":"Checking all array elements match a condition: allSatisfy()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/checking-all-array-elements-match-a-condition-allsatisfy.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/checking-all-array-elements-match-a-condition-allsatisfy.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Checking all array elements match a condition: allSatisfy()"}],["meta",{"property":"og:description","content":"Article(s) > Checking all array elements match a condition: allSatisfy()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Checking all array elements match a condition: allSatisfy()\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.24,"words":371},"filePathRelative":"hackingwithswift.com/example-code/language/checking-all-array-elements-match-a-condition-allsatisfy.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,v as data};
