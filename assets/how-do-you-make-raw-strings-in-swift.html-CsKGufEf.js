import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as t,as as w,ao as n,at as a,au as r,ak as i,aq as m,ar as p}from"./app-CpYYKbnj.js";const d={},h={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function u(s,e){const o=m("VPCard");return p(),c("div",null,[t("h1",h,[t("a",g,[t("span",null,w(s.$frontmatter.title)+" 관련",1)])]),n(o,a(r({title:"Strings - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/strings/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),n(o,a(r({title:"How do you make raw strings in Swift? | Strings - free Swift example code",desc:"How do you make raw strings in Swift?",link:"https://hackingwithswift.com/example-code/strings/how-do-you-make-raw-strings-in-swift",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),i(" TODO: 작성 "),i(' \nRaw strings place hash signs – `#` – before and after their quote mark, and modify the way Swift handles strings in two ways.\n\nFirst, a string that starts with `#"` must *end* with a `"#`, which means any quote marks inside the string are ignored:\n\n```swift\nlet string1 = #"The rain in "Spain" falls mainly on the Spaniards"#\n```\n\nSecond, any escape sequences – things that start with `\\` – now have their regular meaning. So, this will print one line of text:\n\n```swift\nlet string2 = #"The rain\\nin Spain\\nfalls mainly\\non the Spaniards"#\n```\n\nWith a regular Swift string the instances of `\\n` would have been interpreted as line breaks.\n\nIf you want to use escape characters, for example if you want to use string interpolation, you must use `\\#(yourValue)`, like this:\n\n```swift\nlet name = "Duane Dibbley"\nprint(#"Hello! My name is \\#(name)."#)\n```\n\n'),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),i(`
/example-code/system/how-to-run-code-when-your-app-is-terminated">How to run code when your app is terminated 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/example-code/uikit/how-to-localize-your-ios-app">How to localize your iOS app 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/quick-start/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts">How to use Instruments to profile your SwiftUI code and identify slow layouts</a>
`)],-1))])}const k=l(d,[["render",u],["__file","how-do-you-make-raw-strings-in-swift.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/strings/how-do-you-make-raw-strings-in-swift.html","title":"How do you make raw strings in Swift?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How do you make raw strings in Swift?","description":"Article(s) > How do you make raw strings in Swift?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How do you make raw strings in Swift?"},{"property":"og:description","content":"How do you make raw strings in Swift?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/strings/how-do-you-make-raw-strings-in-swift.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/strings/how-do-you-make-raw-strings-in-swift.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How do you make raw strings in Swift?"}],["meta",{"property":"og:description","content":"Article(s) > How do you make raw strings in Swift?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How do you make raw strings in Swift?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.33,"words":398},"filePathRelative":"hackingwithswift.com/example-code/strings/how-do-you-make-raw-strings-in-swift.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{k as comp,S as data};