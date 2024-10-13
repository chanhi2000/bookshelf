import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as e,t as l,e as i,n as a,g as n,a as t,r as d,o as h}from"./app-TWLwS86W.js";const m={},p={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},f=e("nav",{class:"table-of-contents"},[e("ul")],-1),u=e("hr",null,null,-1),v=e("blockquote",null,[e("p",null,"Available from iOS 2.0")],-1),g=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/quick-start/swiftui/how-to-detect-device-rotation">How to detect device rotation 
/example-code/uikit/how-to-respond-to-the-device-being-shaken">How to respond to the device being shaken 
/example-code/system/how-to-identify-an-ios-device-uniquely-with-identifierforvendor">How to identify an iOS device uniquely with identifierForVendor 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode</a>
`)],-1);function k(r,y){const o=d("VPCard");return h(),s("div",null,[e("h1",p,[e("a",w,[e("span",null,l(r.$frontmatter.title)+" 관련",1)])]),i(o,a(n({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,u,i(o,a(n({title:"How to make the device vibrate | System - free Swift example code",desc:"How to make the device vibrate",logo:"https://hackingwithswift.com/favicon.svg",link:"https://hackingwithswift.com/example-code/how-to-make-the-device-vibrate",background:"rgba(174,10,10,0.2)"})),null,16),v,t(" TODO: 작성 "),t(` 
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

`),g])}const S=c(m,[["render",k],["__file","how-to-make-the-device-vibrate.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-make-the-device-vibrate.html","title":"How to make the device vibrate","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make the device vibrate","description":"Article(s) > How to make the device vibrate","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make the device vibrate"},{"property":"og:description","content":"How to make the device vibrate"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-make-the-device-vibrate.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-make-the-device-vibrate.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make the device vibrate"}],["meta",{"property":"og:description","content":"Article(s) > How to make the device vibrate"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make the device vibrate\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.05,"words":314},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-make-the-device-vibrate.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{S as comp,x as data};
