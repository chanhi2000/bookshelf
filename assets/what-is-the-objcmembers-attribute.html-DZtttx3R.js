import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as t,as as h,ao as i,at as n,au as r,ak as a,aq as m,ar as p}from"./app-CpYYKbnj.js";const u={},b={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function g(s,e){const o=m("VPCard");return p(),l("div",null,[t("h1",b,[t("a",d,[t("span",null,h(s.$frontmatter.title)+" 관련",1)])]),i(o,n(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),i(o,n(r({title:"What is the @objcMembers attribute? | Language - free Swift example code",desc:"What is the @objcMembers attribute?",link:"https://hackingwithswift.com/example-code/language/what-is-the-objcmembers-attribute",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),a(" TODO: 작성 "),a(" \nBy default Swift generates code that is only available to other Swift code, but if you need to interact with the Objective-C runtime – all of UIKit, for example – you need to tell Swift what to do.\n\nIf you just want to expose a single method or property, you can mark that method using the `@objc` attribute. However, if you want *all* methods in a class to be exposed to Objective-C you can use a shortcut: the `@objcMembers` keyword:\n\n```swift\n@objcMembers class MyController: UIViewController {\n    func login() {\n\n    }\n}\n```\n\nIn that code, the `login()` method will automatically be exposed to Objective-C in the same way as if it had been marked with `@objc`, because the whole class it’s inside is marked with `@objcMembers`.\n\n"),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),a(`
/example-code/language/what-is-the-autoclosure-attribute">What is the autoclosure attribute? 
/example-code/language/what-is-the-objc-attribute">What is the @objc attribute? 
/example-code/language/how-to-fix-argument-of-selector-refers-to-instance-method-that-is-not-exposed-to-objective-c">How to fix “argument of #selector refers to instance method that is not exposed to Objective-C” 
/example-code/language/how-to-handle-unknown-properties-and-methods-using-dynamicmemberlookup">How to handle unknown properties and methods using @dynamicMemberLookup 
/example-code/uikit/how-to-subclass-uiapplication-using-uiapplicationmain">How to subclass UIApplication using UIApplicationMain</a>
`)],-1))])}const y=c(u,[["render",g],["__file","what-is-the-objcmembers-attribute.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-is-the-objcmembers-attribute.html","title":"What is the @objcMembers attribute?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What is the @objcMembers attribute?","description":"Article(s) > What is the @objcMembers attribute?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What is the @objcMembers attribute?"},{"property":"og:description","content":"What is the @objcMembers attribute?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-the-objcmembers-attribute.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-the-objcmembers-attribute.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What is the @objcMembers attribute?"}],["meta",{"property":"og:description","content":"Article(s) > What is the @objcMembers attribute?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What is the @objcMembers attribute?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.23,"words":368},"filePathRelative":"hackingwithswift.com/example-code/language/what-is-the-objcmembers-attribute.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,k as data};