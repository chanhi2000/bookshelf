import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as t,t as l,e as a,n,g as i,a as o,r as p,o as m}from"./app-ubLChIzZ.js";const h={},u={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},d=t("nav",{class:"table-of-contents"},[t("ul")],-1),y=t("hr",null,null,-1),w=t("blockquote",null,[t("p",null,"Available from iOS 13.0")],-1),f=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/example-code/system/how-to-run-code-when-your-app-is-terminated">How to run code when your app is terminated 
/example-code/uikit/how-to-localize-your-ios-app">How to localize your iOS app 
/example-code/uikit/how-to-change-your-app-icon-dynamically-with-setalternateiconname">How to change your app icon dynamically with setAlternateIconName() 
/quick-start/swiftui/how-to-get-translucent-lists-on-macos">How to get translucent lists on macOS 
/example-code/arkit/how-to-detect-images-using-arimagetrackingconfiguration">How to detect images using ARImageTrackingConfiguration</a>
`)],-1);function S(r,O){const e=p("VPCard");return m(),s("div",null,[t("h1",u,[t("a",g,[t("span",null,l(r.$frontmatter.title)+" 관련",1)])]),a(e,n(i({title:"Catalyst - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/catalyst/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),d,y,a(e,n(i({title:"How to detect your iOS app is running on macOS Catalyst | Catalyst - free Swift example code",desc:"How to detect your iOS app is running on macOS Catalyst",link:"https://hackingwithswift.com/example-code/catalyst/how-to-detect-your-ios-app-is-running-on-macos-catalyst",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,o(" TODO: 작성 "),o(` 
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

`),f])}const C=c(h,[["render",S],["__file","how-to-detect-your-ios-app-is-running-on-macos-catalyst.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/catalyst/how-to-detect-your-ios-app-is-running-on-macos-catalyst.html","title":"How to detect your iOS app is running on macOS Catalyst","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to detect your iOS app is running on macOS Catalyst","description":"Article(s) > How to detect your iOS app is running on macOS Catalyst","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to detect your iOS app is running on macOS Catalyst"},{"property":"og:description","content":"How to detect your iOS app is running on macOS Catalyst"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/catalyst/how-to-detect-your-ios-app-is-running-on-macos-catalyst.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/catalyst/how-to-detect-your-ios-app-is-running-on-macos-catalyst.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to detect your iOS app is running on macOS Catalyst"}],["meta",{"property":"og:description","content":"Article(s) > How to detect your iOS app is running on macOS Catalyst"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-10-04T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to detect your iOS app is running on macOS Catalyst\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-04T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-10-04T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.53,"words":459},"filePathRelative":"hackingwithswift.com/example-code/catalyst/how-to-detect-your-ios-app-is-running-on-macos-catalyst.md","localizedDate":"2019년 10월 4일","excerpt":"\\n"}');export{C as comp,v as data};
