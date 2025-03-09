import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,f as e,av as m,au as a,aw as n,ax as r,b as o,r as d,o as h}from"./app-D4PYVeBp.js";const p={},w={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"};function u(c,t){const i=d("VPCard");return h(),l("div",null,[e("h1",w,[e("a",f,[e("span",null,m(c.$frontmatter.title)+" 관련",1)])]),a(i,n(r({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),a(i,n(r({title:"How to make the device vibrate | System - free Swift example code",desc:"How to make the device vibrate",logo:"https://hackingwithswift.com/favicon.svg",link:"https://hackingwithswift.com/example-code/how-to-make-the-device-vibrate",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 2.0")],-1)),o(" TODO: 작성 "),o(` 
All iPhones have a built-in motor to create vibration effects, and if you just want a quick vibration it takes just one line of code:

\`\`\`swift
AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)
\`\`\`

You’ll need to import the AVFoundation framework if you don’t have it already.

That’s not a particularly easy line of code to remember, so why not make it an extension on \`UIDevice\`?

\`\`\`swift
extension UIDevice {
    static func vibrate() {
        AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)
    }
}
\`\`\`

Now you can just call \`UIDevice.vibrate()\` as needed.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/how-to-detect-device-rotation">How to detect device rotation 
/example-code/uikit/how-to-respond-to-the-device-being-shaken">How to respond to the device being shaken 
/example-code/system/how-to-identify-an-ios-device-uniquely-with-identifierforvendor">How to identify an iOS device uniquely with identifierForVendor 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode</a>
`)],-1))])}const k=s(p,[["render",u],["__file","how-to-make-the-device-vibrate.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-make-the-device-vibrate.html","title":"How to make the device vibrate","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make the device vibrate","description":"Article(s) > How to make the device vibrate","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make the device vibrate"},{"property":"og:description","content":"How to make the device vibrate"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-make-the-device-vibrate.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-make-the-device-vibrate.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make the device vibrate"}],["meta",{"property":"og:description","content":"Article(s) > How to make the device vibrate"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make the device vibrate\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.05,"words":314},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-make-the-device-vibrate.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{k as comp,y as data};
