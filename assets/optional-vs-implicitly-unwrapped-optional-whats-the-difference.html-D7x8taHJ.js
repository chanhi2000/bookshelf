import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as p,am as t,as as c,ao as n,at as o,au as l,ak as i,aq as h,ar as g}from"./app-CpYYKbnj.js";const m={},d={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"};function f(r,e){const a=h("VPCard");return g(),p("div",null,[t("h1",d,[t("a",u,[t("span",null,c(r.$frontmatter.title)+" 관련",1)])]),n(a,o(l({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),n(a,o(l({title:"Optional vs implicitly unwrapped optional: what’s the difference? | Language - free Swift example code",desc:"Optional vs implicitly unwrapped optional: what’s the difference?",link:"https://hackingwithswift.com/example-code/language/optional-vs-implicitly-unwrapped-optional-whats-the-difference",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),i(" TODO: 작성 "),i(' \nWhen you’re just learning Swift, the difference between an optional (`String?`), an implicitly unwrapped optional (`String!`), and a regular type (`String`) can seem awfully confusing. Here’s a quick summary that should explain the difference:\n\nWhen you use `String` you’re saying this will always have a string inside, and can never have nothing inside. It might be an empty string (`""`), but even an empty string is still a string.\n\nWhen you use `String?` you’re saying this might have a string inside, but it might have nothing at all inside – not even an empty string. Swift won’t let you use these without unwrapping them, which is usually done using `if let`.\n\nWhen you use `String!` you’re saying this might have a string inside, but it might have nothing at all inside – not even an empty string. However, Swift lets you use these as if they were a `String`, as if they always *do* have a value, but if you try to use a nil value by accident your code will crash. This effectively lets you say “I know this *might* be nil, but I’m so sure it has a value that I’m willing for my program to crash if I’m wrong.”\n\nSo: `String` is definitely a string, `String?` might be nil or might be a string, and `String!` might be nil but when you use it you’re absolutely sure it has a string.\n\n'),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),i(`
/example-code/language/what-are-implicitly-unwrapped-optionals">What are implicitly unwrapped optionals? 
/example-code/language/how-to-unwrap-an-optional-in-swift">How to unwrap an optional in Swift 
/example-code/language/what-is-optional-chaining">What is optional chaining? 
/example-code/language/whats-the-difference-between-init-and-init">What’s the difference between init?() and init()? 
/example-code/language/how-to-find-the-difference-between-two-arrays">How to find the difference between two arrays</a>
`)],-1))])}const v=s(m,[["render",f],["__file","optional-vs-implicitly-unwrapped-optional-whats-the-difference.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/optional-vs-implicitly-unwrapped-optional-whats-the-difference.html","title":"Optional vs implicitly unwrapped optional: what’s the difference?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Optional vs implicitly unwrapped optional: what’s the difference?","description":"Article(s) > Optional vs implicitly unwrapped optional: what’s the difference?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Optional vs implicitly unwrapped optional: what’s the difference?"},{"property":"og:description","content":"Optional vs implicitly unwrapped optional: what’s the difference?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/optional-vs-implicitly-unwrapped-optional-whats-the-difference.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/optional-vs-implicitly-unwrapped-optional-whats-the-difference.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Optional vs implicitly unwrapped optional: what’s the difference?"}],["meta",{"property":"og:description","content":"Article(s) > Optional vs implicitly unwrapped optional: what’s the difference?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Optional vs implicitly unwrapped optional: what’s the difference?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.65,"words":495},"filePathRelative":"hackingwithswift.com/example-code/language/optional-vs-implicitly-unwrapped-optional-whats-the-difference.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,b as data};