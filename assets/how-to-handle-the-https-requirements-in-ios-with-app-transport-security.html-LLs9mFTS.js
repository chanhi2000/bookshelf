import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as p,f as t,av as l,au as n,aw as r,ax as a,b as o,r as h,o as u}from"./app-CmlMtt14.js";const d={},m={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"};function y(s,e){const i=h("VPCard");return u(),p("div",null,[t("h1",m,[t("a",w,[t("span",null,l(s.$frontmatter.title)+" 관련",1)])]),n(i,r(a({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),n(i,r(a({title:"How to handle the HTTPS requirements in iOS with App Transport Security | System - free Swift example code",desc:"How to handle the HTTPS requirements in iOS with App Transport Security",link:"https://hackingwithswift.com/example-code/how-to-handle-the-https-requirements-in-ios-with-app-transport-security",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 9.0")],-1)),o(" TODO: 작성 "),o(` 
iOS doesn’t let you work with HTTP web data by default, because it's blocked by something called App Transport Security that effectively requires data to be transmitted securely. If possible, you should switch to HTTPS and use that instead, but if that's not possible for some reason – e.g. if you're working with a third-party website – then you need to tell iOS to make exceptions for you.

**Note: the very fact that iOS calls these "exceptions" does imply the exception option may go away in the future. If you add any exceptions you are required to explain them to the app review team when you submit your app to the App Store.**

Exceptions be defined per-site or globally, although if you're going to make exceptions obviously it's preferable to do it for individual sites. This is all set inside your application's Info.plist file, and this is one of the very few times when editing your plist as source code is faster than trying to use the GUI editor in Xcode. So, right-click on your Info.plist and choose Open As > Source Code.

Your plist should end like this:

\`\`\`swift
</dict>
</plist>
\`\`\`

Just before that, I'd like you to paste this:

\`\`\`swift
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSExceptionDomains</key>
    <dict>
        <key>hackingwithswift.com</key>
        <dict>
            <key>NSIncludesSubdomains</key>
            <true/>
            <key>NSThirdPartyExceptionAllowsInsecureHTTPLoads</key>
            <true/>
        </dict>
    </dict>
</dict>
\`\`\`

That requests an exception for the site **hackingwithswift.com** so that it can be loaded using regular HTTP rather than HTTPS. Note that I've set \`NSIncludesSubdomains\` to be \`true\` because the site redirects you to **www.hackingwithswift.com**, which is a subdomain.

Very observant readers might note that **hackingwithswift.com** actually supports HTTPS and thus doesn't need App Transport Security, but you do still need to point to **https://** otherwise the request will fail.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/example-code/language/how-to-fix-the-error-protocol-can-only-be-used-as-a-generic-constraint-because-it-has-self-or-associated-type-requirements">How to fix the error “protocol can only be used as a generic constraint because it has Self or associated type requirements” 
/quick-start/swiftui/how-to-fix-protocol-view-can-only-be-used-as-a-generic-constraint-because-it-has-self-or-associated-type-requirements">How to fix “Protocol 'View' can only be used as a generic constraint because it has Self or associated type requirements” 
/example-code/system/how-to-run-code-when-your-app-is-terminated">How to run code when your app is terminated 
/example-code/language/how-to-use-try-catch-in-swift-to-handle-exceptions">How to use try/catch in Swift to handle exceptions 
/quick-start/concurrency/how-to-handle-different-result-types-in-a-task-group">How to handle different result types in a task group</a>
`)],-1))])}const S=c(d,[["render",y],["__file","how-to-handle-the-https-requirements-in-ios-with-app-transport-security.html.vue"]]),T=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-handle-the-https-requirements-in-ios-with-app-transport-security.html","title":"How to handle the HTTPS requirements in iOS with App Transport Security","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to handle the HTTPS requirements in iOS with App Transport Security","description":"Article(s) > How to handle the HTTPS requirements in iOS with App Transport Security","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-9.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to handle the HTTPS requirements in iOS with App Transport Security"},{"property":"og:description","content":"How to handle the HTTPS requirements in iOS with App Transport Security"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-handle-the-https-requirements-in-ios-with-app-transport-security.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-handle-the-https-requirements-in-ios-with-app-transport-security.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to handle the HTTPS requirements in iOS with App Transport Security"}],["meta",{"property":"og:description","content":"Article(s) > How to handle the HTTPS requirements in iOS with App Transport Security"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-9.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to handle the HTTPS requirements in iOS with App Transport Security\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.22,"words":665},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-handle-the-https-requirements-in-ios-with-app-transport-security.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{S as comp,T as data};
