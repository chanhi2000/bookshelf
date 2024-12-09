import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as e,t as l,e as n,n as a,g as i,a as t,r as d,o as w}from"./app-ubLChIzZ.js";const p={},h={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"},g=e("nav",{class:"table-of-contents"},[e("ul")],-1),f=e("hr",null,null,-1),u=e("blockquote",null,[e("p",null,"Available from iOS 9.0")],-1),b=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/networking/how-to-support-low-data-mode-networking-using-allowsconstrainednetworkaccess">How to support low data mode networking using allowsConstrainedNetworkAccess 
/example-code/uikit/how-to-let-users-tap-on-a-uitableviewcell-while-editing-is-enabled">How to let users tap on a UITableViewCell while editing is enabled 
/example-code/uikit/how-to-check-whether-users-have-enabled-the-reduced-motion-setting">How to check whether users have enabled the reduced motion setting 
/quick-start/swiftui/how-to-detect-dark-mode">How to detect dark mode 
/example-code/uikit/how-to-detect-dark-mode-in-ios">How to detect dark mode in iOS</a>
`)],-1);function k(r,y){const o=d("VPCard");return w(),c("div",null,[e("h1",h,[e("a",m,[e("span",null,l(r.$frontmatter.title)+" 관련",1)])]),n(o,a(i({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,f,n(o,a(i({title:"How to detect low power mode is enabled | System - free Swift example code",desc:"How to detect low power mode is enabled",link:"https://hackingwithswift.com/example-code/how-to-detect-low-power-mode-is-enabled",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),u,t(" TODO: 작성 "),t(` 
When a user has enabled low-power mode you probably want to avoid doing CPU-intensive work: not only is the system less able to give you resources, but you always want to respect the user's wishes and help their battery last as long as possible.

There are two ways of checking for low-power mode: you can read a property whenever you need it, or register for a notification. First, here's an example with the property:

\`\`\`swift
func doComplicatedWork() {
    guard ProcessInfo.processInfo.isLowPowerModeEnabled == false else { return }

    // continue doing complicated work here
}
\`\`\`

You can also register to be notified when the lower power mode state changes, like this:

\`\`\`swift
NotificationCenter.default.addObserver(self, selector: #selector(powerStateChanged), name: Notification.Name.NSProcessInfoPowerStateDidChange, object: nil)
\`\`\`

When that method is triggered, you can check the new value of \`isLowPowerModeEnabled\` to see what state the device is in:

\`\`\`swift
@objc func powerStateChanged(_ notification: Notification) {
    let lowerPowerEnabled = ProcessInfo.processInfo.isLowPowerModeEnabled
    // take appropriate action
}
\`\`\`

`),b])}const x=s(p,[["render",k],["__file","how-to-detect-low-power-mode-is-enabled.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-detect-low-power-mode-is-enabled.html","title":"How to detect low power mode is enabled","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to detect low power mode is enabled","description":"Article(s) > How to detect low power mode is enabled","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-9.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to detect low power mode is enabled"},{"property":"og:description","content":"How to detect low power mode is enabled"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-detect-low-power-mode-is-enabled.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-detect-low-power-mode-is-enabled.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to detect low power mode is enabled"}],["meta",{"property":"og:description","content":"Article(s) > How to detect low power mode is enabled"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-9.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to detect low power mode is enabled\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.42,"words":426},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-detect-low-power-mode-is-enabled.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{x as comp,S as data};
