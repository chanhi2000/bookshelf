import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as t,as as p,ao as n,at as i,au as r,ak as e,aq as m,ar as u}from"./app-CVhcaaOv.js";const g={},h={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function y(s,o){const a=m("VPCard");return u(),l("div",null,[t("h1",h,[t("a",d,[t("span",null,p(s.$frontmatter.title)+" 관련",1)])]),n(a,i(r({title:"Catalyst - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/catalyst/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[0]||(o[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),o[1]||(o[1]=t("hr",null,null,-1)),n(a,i(r({title:"How to detect your iOS app is running on macOS Catalyst | Catalyst - free Swift example code",desc:"How to detect your iOS app is running on macOS Catalyst",link:"https://hackingwithswift.com/example-code/catalyst/how-to-detect-your-ios-app-is-running-on-macos-catalyst",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[2]||(o[2]=t("blockquote",null,[t("p",null,"Available from iOS 13.0")],-1)),e(" TODO: 작성 "),e(` 
Although Catalyst does a good job of making UIKit work on macOS, you will quickly realize that some things that worked great on iOS just aren’t great fits for macOS.

So, if you want to detect when your iOS app is running on macOS using Catalyst, you can add an \`#if targetEnvironment\` check to provide alternative functionality, like this:

\`\`\`swift
#if targetEnvironment(macCatalyst)
    print("UIKit running on macOS")
#else
    print("Your regular code")
#endif
\`\`\`

If that file also happens to support other platforms such as watchOS and tvOS, you can add further checks as needed like this:

\`\`\`swift
#if targetEnvironment(macCatalyst)
    print("UIKit running on macOS")
#elseif os(watchOS)
    print("Running on watchOS")
#else
    print("Your regular code")
#endif
\`\`\`

Detecting Catalyst is particularly useful when removing behavior that, while appropriate on iOS itself, doesn’t look great on macOS. For example, having screens full of information slide onto a \`UINavigationController\` looks great on iPhone, OK on iPad, but downright ugly on macOS, so you might want to push view controllers without animation when running on Catalyst.

`),o[3]||(o[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/system/how-to-run-code-when-your-app-is-terminated">How to run code when your app is terminated 
/example-code/uikit/how-to-localize-your-ios-app">How to localize your iOS app 
/example-code/uikit/how-to-change-your-app-icon-dynamically-with-setalternateiconname">How to change your app icon dynamically with setAlternateIconName() 
/quick-start/swiftui/how-to-get-translucent-lists-on-macos">How to get translucent lists on macOS 
/example-code/arkit/how-to-detect-images-using-arimagetrackingconfiguration">How to detect images using ARImageTrackingConfiguration</a>
`)],-1))])}const S=c(g,[["render",y],["__file","how-to-detect-your-ios-app-is-running-on-macos-catalyst.html.vue"]]),O=JSON.parse('{"path":"/hackingwithswift.com/example-code/catalyst/how-to-detect-your-ios-app-is-running-on-macos-catalyst.html","title":"How to detect your iOS app is running on macOS Catalyst","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to detect your iOS app is running on macOS Catalyst","description":"Article(s) > How to detect your iOS app is running on macOS Catalyst","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to detect your iOS app is running on macOS Catalyst"},{"property":"og:description","content":"How to detect your iOS app is running on macOS Catalyst"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/catalyst/how-to-detect-your-ios-app-is-running-on-macos-catalyst.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/catalyst/how-to-detect-your-ios-app-is-running-on-macos-catalyst.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to detect your iOS app is running on macOS Catalyst"}],["meta",{"property":"og:description","content":"Article(s) > How to detect your iOS app is running on macOS Catalyst"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-10-04T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to detect your iOS app is running on macOS Catalyst\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-04T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-10-04T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.53,"words":459},"filePathRelative":"hackingwithswift.com/example-code/catalyst/how-to-detect-your-ios-app-is-running-on-macos-catalyst.md","localizedDate":"2019년 10월 4일","excerpt":"\\n"}');export{S as comp,O as data};
