import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as h,am as t,as as s,ao as r,at as n,au as i,ak as o,aq as m,ar as p}from"./app-Dbtze28S.js";const d={},u={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function f(c,e){const a=m("VPCard");return p(),h("div",null,[t("h1",u,[t("a",g,[t("span",null,s(c.$frontmatter.title)+" 관련",1)])]),r(a,n(i({title:"Media - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/media/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),r(a,n(i({title:"How to turn on the camera flashlight to make a torch | Media - free Swift example code",desc:"How to turn on the camera flashlight to make a torch",link:"https://hackingwithswift.com/example-code/media/how-to-turn-on-the-camera-flashlight-to-make-a-torch",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 6.0")],-1)),o(" TODO: 작성 "),o(` 
There is one simple property required to enable or disable a device's torch, but you do need to put in some wrapper code to make it work safely. Specifically, you need to use the \`lockForConfiguration()\` and \`unlockForConfiguration()\` methods of the \`AVCaptureDevice\` class in order to make sure only one app can control the torch at a time.

You will need to import the AVFoundation framework, because that's where the \`AVCaptureDevice\` class comes from. Once that's done, add this function to your code and you're good to code:

\`\`\`swift
func toggleTorch(on: Bool) {
    guard let device = AVCaptureDevice.default(for: .video) else { return }

    if device.hasTorch {
        do {
            try device.lockForConfiguration()

            if on == true {
                device.torchMode = .on
            } else {
                device.torchMode = .off
            }

            device.unlockForConfiguration()
        } catch {
            print("Torch could not be used")
        }
    } else {
        print("Torch is not available")
    }
}
\`\`\`

With that, you can now turn the torch on like this:

\`\`\`swift
toggleTorch(on: true)
\`\`\`

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/example-code/uikit/how-to-take-a-photo-using-the-camera-and-uiimagepickercontroller">How to take a photo using the camera and UIImagePickerController 
/example-code/media/how-to-choose-a-photo-from-the-camera-roll-using-uiimagepickercontroller">How to choose a photo from the camera roll using UIImagePickerController 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/uikit/how-to-make-your-user-interface-in-code">How to make your user interface in code</a>
`)],-1))])}const y=l(d,[["render",f],["__file","how-to-turn-on-the-camera-flashlight-to-make-a-torch.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/media/how-to-turn-on-the-camera-flashlight-to-make-a-torch.html","title":"How to turn on the camera flashlight to make a torch","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to turn on the camera flashlight to make a torch","description":"Article(s) > How to turn on the camera flashlight to make a torch","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-6.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to turn on the camera flashlight to make a torch"},{"property":"og:description","content":"How to turn on the camera flashlight to make a torch"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-turn-on-the-camera-flashlight-to-make-a-torch.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-turn-on-the-camera-flashlight-to-make-a-torch.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to turn on the camera flashlight to make a torch"}],["meta",{"property":"og:description","content":"Article(s) > How to turn on the camera flashlight to make a torch"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-6.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to turn on the camera flashlight to make a torch\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.45,"words":434},"filePathRelative":"hackingwithswift.com/example-code/media/how-to-turn-on-the-camera-flashlight-to-make-a-torch.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,v as data};
