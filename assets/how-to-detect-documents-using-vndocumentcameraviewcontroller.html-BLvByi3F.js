import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as e,t as l,e as n,n as i,g as a,a as t,r as m,o as d}from"./app-ubLChIzZ.js";const u={},h={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},p=e("nav",{class:"table-of-contents"},[e("ul")],-1),w=e("hr",null,null,-1),f=e("blockquote",null,[e("p",null,"Available from iOS 13.0")],-1),y=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/system/how-to-find-the-users-documents-directory">How to find the user's documents directory 
/example-code/vision/how-to-use-vnrecognizetextrequests-optical-character-recognition-to-detect-text-in-an-image">How to use VNRecognizeTextRequest’s optical character recognition to detect text in an image 
/example-code/uikit/how-to-detect-keyboard-input-using-pressesbegan-and-pressesended">How to detect keyboard input using pressesBegan() and pressesEnded() 
/example-code/location/how-to-detect-ibeacons">How to detect iBeacons 
/example-code/arkit/how-to-detect-images-using-arimagetrackingconfiguration">How to detect images using ARImageTrackingConfiguration</a>
`)],-1);function V(c,C){const o=m("VPCard");return d(),s("div",null,[e("h1",h,[e("a",g,[e("span",null,l(c.$frontmatter.title)+" 관련",1)])]),n(o,i(a({title:"Vision - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/vision/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),p,w,n(o,i(a({title:"How to detect documents using VNDocumentCameraViewController | Vision - free Swift example code",desc:"How to detect documents using VNDocumentCameraViewController",link:"https://hackingwithswift.com/example-code/vision/how-to-convert-a-hex-color-to-a-uicolor",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,t(" TODO: 작성 "),t(` 
iOS 13.0 introduced a new micro-framework called VisionKit, which is specifically designed to make it possible to scan documents like Notes does. 

You can then Vision OCR to scan the text if you want, but by default \`VNDocumentCameraViewController\` just gives you images of each page.

To get started:

1. Import VisionKit.
<li>Make some type (such as your view controller) conform to the \`VNDocumentCameraViewControllerDelegate\` protocol so you can handle delegate callbacks.
<li>Create and present an instance of \`VNDocumentCameraViewController\`, setting its delegate property to whatever should be notified when a scan completes.
<li>Present the document scanner as normal, then wait for feedback.

So, something like this:

\`\`\`swift
let vc = VNDocumentCameraViewController()
vc.delegate = self
present(vc, animated: true)
\`\`\`

Once the scan completes your delegate will get called with the document, like this:

\`\`\`swift
func documentCameraViewController(_ controller: VNDocumentCameraViewController, didFinishWith scan: VNDocumentCameraScan) {
    print("Found \\(scan.pageCount)")

    for i in 0 ..< scan.pageCount {
        let img = scan.imageOfPage(at: i)
        // ... your code here
    }
}
\`\`\`

The result of \`imageOfPage(at:)\` is a \`UIImage\`, so you’ll need to replace “your code here” with whatever you want to do with your images.

`),y])}const b=r(u,[["render",V],["__file","how-to-detect-documents-using-vndocumentcameraviewcontroller.html.vue"]]),_=JSON.parse('{"path":"/hackingwithswift.com/example-code/vision/how-to-detect-documents-using-vndocumentcameraviewcontroller.html","title":"How to detect documents using VNDocumentCameraViewController","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to detect documents using VNDocumentCameraViewController","description":"Article(s) > How to detect documents using VNDocumentCameraViewController","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to detect documents using VNDocumentCameraViewController"},{"property":"og:description","content":"How to detect documents using VNDocumentCameraViewController"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/vision/how-to-convert-a-hex-color-to-a-uicolor.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/vision/how-to-detect-documents-using-vndocumentcameraviewcontroller.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to detect documents using VNDocumentCameraViewController"}],["meta",{"property":"og:description","content":"Article(s) > How to detect documents using VNDocumentCameraViewController"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-06-03T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to detect documents using VNDocumentCameraViewController\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-06-03T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-06-03T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.47,"words":440},"filePathRelative":"hackingwithswift.com/example-code/vision/how-to-detect-documents-using-vndocumentcameraviewcontroller.md","localizedDate":"2019년 6월 3일","excerpt":"\\n"}');export{b as comp,_ as data};
