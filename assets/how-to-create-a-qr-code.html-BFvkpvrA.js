import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as e,t as l,e as a,n as i,g as r,a as t,r as d,o as p}from"./app-DLPYIRXq.js";const m={},h={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"},g=e("nav",{class:"table-of-contents"},[e("ul")],-1),f=e("hr",null,null,-1),w=e("blockquote",null,[e("p",null,"Available from iOS 7.0")],-1),y=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/quick-start/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts">How to use Instruments to profile your SwiftUI code and identify slow layouts 
/example-code/uikit/how-to-make-your-user-interface-in-code">How to make your user interface in code 
/example-code/uikit/how-to-add-drag-and-drop-to-your-app">How to add drag and drop to your app 
/quick-start/concurrency/how-to-use-mainactor-to-run-code-on-the-main-queue">How to use @MainActor to run code on the main queue</a>
`)],-1);function k(n,b){const o=d("VPCard");return p(),s("div",null,[e("h1",h,[e("a",u,[e("span",null,l(n.$frontmatter.title)+" 관련",1)])]),a(o,i(r({title:"Media - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/media/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,f,a(o,i(r({title:"How to create a QR code | Media - free Swift example code",desc:"How to create a QR code",link:"https://hackingwithswift.com/example-code/media/how-to-create-a-qr-code",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,t(" TODO: 작성 "),t(` 
iOS has a built-in QR code generator, but it's a bit tricksy to use because it's exposed as a Core Image filter that needs various settings to be applied. Also, it generates codes where every bit is just one pixel across, which looks terrible if you try to stretch it inside an image view.

So, here's a simple function that wraps up QR code generation while also scaling up the QR code so it's a respectable size:

\`\`\`swift
func generateQRCode(from string: String) -> UIImage? {
    let data = string.data(using: String.Encoding.ascii)

    if let filter = CIFilter(name: "CIQRCodeGenerator") {
        filter.setValue(data, forKey: "inputMessage")
        let transform = CGAffineTransform(scaleX: 3, y: 3)

        if let output = filter.outputImage?.transformed(by: transform) {
            return UIImage(ciImage: output)
        }
    }

    return nil
}

let image = generateQRCode(from: "Hacking with Swift is the best iOS coding tutorial I've ever read!")
\`\`\`

`),y])}const x=c(m,[["render",k],["__file","how-to-create-a-qr-code.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/media/how-to-create-a-qr-code.html","title":"How to create a QR code","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to create a QR code","description":"Article(s) > How to create a QR code","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to create a QR code"},{"property":"og:description","content":"How to create a QR code"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-create-a-qr-code.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-create-a-qr-code.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to create a QR code"}],["meta",{"property":"og:description","content":"Article(s) > How to create a QR code"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to create a QR code\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.35,"words":405},"filePathRelative":"hackingwithswift.com/example-code/media/how-to-create-a-qr-code.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,S as data};
