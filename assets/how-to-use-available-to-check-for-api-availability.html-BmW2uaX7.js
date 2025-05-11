import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as e,av as h,au as o,aw as l,ax as n,b as a,r as p,o as u}from"./app-BQ88-Ybo.js";const m={},f={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function g(s,t){const i=p("VPCard");return u(),c("div",null,[e("h1",f,[e("a",d,[e("span",null,h(s.$frontmatter.title)+" 관련",1)])]),o(i,l(n({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),o(i,l(n({title:"How to use #available to check for API availability | Language - free Swift example code",desc:"How to use #available to check for API availability",link:"https://hackingwithswift.com/example-code/language/how-to-use-available-to-check-for-api-availability",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 7.0")],-1)),a(" TODO: 작성 "),a(` 
One of my favorite Xcode features is the ability to have Xcode automatically check API availability for you, which means it will refuse to run code that is not available on the minimum iOS version you support.

Of course, there are times when you really do need to use a newer feature, for example if you want to use \`UIStackView\` where it's available but otherwise show a message to users asking them to upgrade. For this, Swift has \`#available\`, which lets you state that a certain block of code should only execute on specific versions of iOS.

To use the previous example, this code checks whether the user has iOS 9.0 or later on their device:

\`\`\`swift
if #available(iOS 9, *) {
    // use UIStackView
} else {
    // show sad face emoji
}
\`\`\`

Any code inside the \`// use UIStackView\` block can be executed as if your deployment target were iOS 9.0.

If you want, you can mark whole functions or classes as requiring a specific iOS version by using \`@available\`, like this:

\`\`\`swift
@available(iOS 9, *)
func useStackView() {
    // use UIStackView
}
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),a(`
/example-code/language/how-to-check-whether-a-module-is-available-using-canimport">How to check whether a module is available using canImport() 
/example-code/language/how-to-use-available-to-deprecate-old-apis">How to use @available to deprecate old APIs 
/example-code/strings/how-to-display-different-strings-based-on-available-space-using-variantfittingpresentationwidth">How to display different strings based on available space using variantFittingPresentationWidth() 
/quick-start/swiftui/how-to-tell-the-user-that-no-content-is-available">How to tell the user that no content is available 
/quick-start/swiftui/whats-the-difference-between-observedobject-state-and-environmentobject">What’s the difference between @ObservedObject, @State, and @EnvironmentObject?</a>
`)],-1))])}const v=r(m,[["render",g],["__file","how-to-use-available-to-check-for-api-availability.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-use-available-to-check-for-api-availability.html","title":"How to use #available to check for API availability","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to use #available to check for API availability","description":"Article(s) > How to use #available to check for API availability","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to use #available to check for API availability"},{"property":"og:description","content":"How to use #available to check for API availability"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-use-available-to-check-for-api-availability.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-use-available-to-check-for-api-availability.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to use #available to check for API availability"}],["meta",{"property":"og:description","content":"Article(s) > How to use #available to check for API availability"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to use #available to check for API availability\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.56,"words":467},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-use-available-to-check-for-api-availability.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,y as data};
