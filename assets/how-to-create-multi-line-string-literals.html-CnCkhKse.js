import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as t,as as g,ao as a,at as o,au as r,ak as i,aq as u,ar as m}from"./app-gTf-Epb-.js";const h={},p={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function w(s,e){const n=u("VPCard");return m(),c("div",null,[t("h1",p,[t("a",d,[t("span",null,g(s.$frontmatter.title)+" 관련",1)])]),a(n,o(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),a(n,o(r({title:"How to create multi-line string literals | Language - free Swift example code",desc:"How to create multi-line string literals",link:"https://hackingwithswift.com/example-code/language/how-to-create-multi-line-string-literals",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),i(" TODO: 작성 "),i(` 
By default Swift strings can’t span more than one line. One simple way around this is to use the new line character \`\\n\`, but that only works for strings that are displayed – if you’re just trying to format your string nicely, you should use multi-line strings instead.

Multi-line strings work similarly to regular strings in that they support things like string interpolation, but they have the added benefit that they can be spread over as many lines as you need.

To start a string literal, you need to write three double quotation marks, \`”””\`, then press return. You can then go ahead and write a string as long as you want, including variables and line breaks, before ending your string by pressing return then writing three more double quotation marks.

I've been specific about pressing return because string literals have two important rules: when you open a string using \`"""\` the content of your string must begin on a new line, and when you end a multi-line string using \`”””\` that must also begin on a new line.

Here it is in action:

\`\`\`swift
let longString = """
When you write a string that spans multiple
lines make sure you start its content on a
line all of its own, and end it with three
quotes also on a line of their own.
Multi-line strings also let you write "quote marks"
freely inside your strings, which is great!
"""
\`\`\`

That creates a new string with several line breaks right there in the definition – much easier to read and write.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),i(`
/quick-start/swiftui/how-to-create-multi-column-lists-using-table">How to create multi-column lists using Table 
/quick-start/swiftui/how-to-create-multi-step-animations-using-phase-animators">How to create multi-step animations using phase animators 
/example-code/strings/how-to-calculate-the-rot13-of-a-string">How to calculate the ROT13 of a string 
/example-code/system/how-to-convert-dates-and-times-to-a-string-using-dateformatter">How to convert dates and times to a string using DateFormatter 
/quick-start/swiftui/how-to-create-and-compose-custom-views">How to create and compose custom views</a>
`)],-1))])}const k=l(h,[["render",w],["__file","how-to-create-multi-line-string-literals.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-create-multi-line-string-literals.html","title":"How to create multi-line string literals","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to create multi-line string literals","description":"Article(s) > How to create multi-line string literals","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to create multi-line string literals"},{"property":"og:description","content":"How to create multi-line string literals"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-create-multi-line-string-literals.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-create-multi-line-string-literals.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to create multi-line string literals"}],["meta",{"property":"og:description","content":"Article(s) > How to create multi-line string literals"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to create multi-line string literals\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.74,"words":522},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-create-multi-line-string-literals.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,b as data};
