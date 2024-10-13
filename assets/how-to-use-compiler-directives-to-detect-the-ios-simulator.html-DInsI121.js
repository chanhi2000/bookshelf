import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as e,t as l,e as i,n as a,g as r,a as t,r as m,o as h}from"./app-TWLwS86W.js";const d={},u={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"},g=e("nav",{class:"table-of-contents"},[e("ul")],-1),f=e("hr",null,null,-1),w=e("blockquote",null,[e("p",null,"Available from iOS 7.0")],-1),y=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/xcode/how-to-set-the-clock-in-the-ios-simulator">How to set the clock in the iOS Simulator 
/example-code/uikit/what-does-the-message-simulator-user-has-requested-new-graphics-quality-100-mean">What does the message "Simulator user has requested new graphics quality: 100" mean? 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/whats-the-difference-between-observedobject-state-and-environmentobject">What’s the difference between @ObservedObject, @State, and @EnvironmentObject? 
/example-code/catalyst/how-to-detect-your-ios-app-is-running-on-macos-catalyst">How to detect your iOS app is running on macOS Catalyst</a>
`)],-1);function S(n,v){const o=m("VPCard");return h(),s("div",null,[e("h1",u,[e("a",p,[e("span",null,l(n.$frontmatter.title)+" 관련",1)])]),i(o,a(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,f,i(o,a(r({title:"How to use compiler directives to detect the iOS Simulator | Language - free Swift example code",desc:"How to use compiler directives to detect the iOS Simulator",link:"https://hackingwithswift.com/example-code/language/how-to-use-compiler-directives-to-detect-the-ios-simulator",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,t(" TODO: 작성 "),t(` 
Swift makes it easy to write special code that should be executed only in the iOS Simulator. This is helpful to test situations where the simulator and devices don't match, for example testing the accelerometer or camera.

If you want certain code to be run only in the iOS simulator, you should use this:

\`\`\`swift
#if targetEnvironment(simulator)
// your code
#endif
\`\`\`

Any code between the \`#if\` and \`#endif\` won't even exist when the app is run on devices, so it has zero performance impact. If you want to specify alternate code that should only be run on devices (and never on the simulator) you should use \`#else\`, like this:

\`\`\`swift
func updateMotion() {
#if targetEnvironment(simulator)
    // we're on the simulator - calculate pretend movement
    if let currentTouch = lastTouchPosition {
        let diff = CGPoint(x: currentTouch.x - player.position.x, y: currentTouch.y - player.position.y)
        physicsWorld.gravity = CGVector(dx: diff.x / 100, dy: diff.y / 100)
    }
#else
    // we're on a device – use the accelerometer
    if let accelerometerData = motionManager.accelerometerData {
        physicsWorld.gravity = CGVector(dx: accelerometerData.acceleration.y * -50, dy: accelerometerData.acceleration.x * 50)
    }
#endif
}
\`\`\`

`),y])}const x=c(d,[["render",S],["__file","how-to-use-compiler-directives-to-detect-the-ios-simulator.html.vue"]]),_=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-use-compiler-directives-to-detect-the-ios-simulator.html","title":"How to use compiler directives to detect the iOS Simulator","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to use compiler directives to detect the iOS Simulator","description":"Article(s) > How to use compiler directives to detect the iOS Simulator","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to use compiler directives to detect the iOS Simulator"},{"property":"og:description","content":"How to use compiler directives to detect the iOS Simulator"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-use-compiler-directives-to-detect-the-ios-simulator.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-use-compiler-directives-to-detect-the-ios-simulator.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to use compiler directives to detect the iOS Simulator"}],["meta",{"property":"og:description","content":"Article(s) > How to use compiler directives to detect the iOS Simulator"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to use compiler directives to detect the iOS Simulator\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.55,"words":464},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-use-compiler-directives-to-detect-the-ios-simulator.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,_ as data};
