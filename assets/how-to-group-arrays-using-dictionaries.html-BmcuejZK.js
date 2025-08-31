import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as t,as as g,ao as r,at as i,au as n,ak as o,aq as p,ar as u}from"./app-DpiNAgkx.js";const d={},h={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function w(s,e){const a=p("VPCard");return u(),l("div",null,[t("h1",h,[t("a",m,[t("span",null,g(s.$frontmatter.title)+" 관련",1)])]),r(a,i(n({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),r(a,i(n({title:"How to group arrays using dictionaries | Language - free Swift example code",desc:"How to group arrays using dictionaries",link:"https://hackingwithswift.com/example-code/language/how-to-group-arrays-using-dictionaries",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),o(" TODO: 작성 "),o(` 
If you have an array of items and want to group them according to some criteria, Swift has a special dictionary initializer just for you.

Here’s an example sequence we can work with:

\`\`\`swift
let singers = ["Ed Sheeran", "Ariana Grande", "Taylor Swift", "Adele Adkins"]
\`\`\`

We can now create a dictionary that groups those singers together by the length of their names:

\`\`\`swift
let groupedByLength = Dictionary(grouping: singers) { $0.count }
\`\`\`

That will put Taylor and Adele into an array under the “12” key, Ariana under 13, and Ed under 10.

Alternatively, we could group them by the first letters of each of their names:

\`\`\`swift
let groupedByFirst = Dictionary(grouping: singers) { $0.first! }
\`\`\`

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/quick-start/concurrency/how-to-create-a-task-group-and-add-tasks-to-it">How to create a task group and add tasks to it 
/quick-start/concurrency/how-to-handle-different-result-types-in-a-task-group">How to handle different result types in a task group 
/quick-start/concurrency/how-to-cancel-a-task-group">How to cancel a task group 
/example-code/system/how-to-group-user-notifications-using-threadidentifier-and-summaryargument">How to group user notifications using threadIdentifier and summaryArgument 
/quick-start/swiftui/how-to-group-views-together">How to group views together</a>
`)],-1))])}const k=c(d,[["render",w],["__file","how-to-group-arrays-using-dictionaries.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-group-arrays-using-dictionaries.html","title":"How to group arrays using dictionaries","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to group arrays using dictionaries","description":"Article(s) > How to group arrays using dictionaries","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to group arrays using dictionaries"},{"property":"og:description","content":"How to group arrays using dictionaries"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-group-arrays-using-dictionaries.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-group-arrays-using-dictionaries.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to group arrays using dictionaries"}],["meta",{"property":"og:description","content":"Article(s) > How to group arrays using dictionaries"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to group arrays using dictionaries\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.2,"words":360},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-group-arrays-using-dictionaries.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,b as data};
