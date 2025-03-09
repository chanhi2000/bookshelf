import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,f as e,av as u,au as n,aw as a,ax as r,b as o,r as g,o as d}from"./app-D4PYVeBp.js";const m={},h={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,t){const i=g("VPCard");return d(),l("div",null,[e("h1",h,[e("a",p,[e("span",null,u(s.$frontmatter.title)+" 관련",1)])]),n(i,a(r({title:"Vision - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/vision/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(i,a(r({title:"How to use VNRecognizeTextRequest’s optical character recognition to detect text in an image | Vision - free Swift example code",desc:"How to use VNRecognizeTextRequest’s optical character recognition to detect text in an image",link:"https://hackingwithswift.com/example-code/vision/how-to-use-vnrecognizetextrequests-optical-character-recognition-to-detect-text-in-an-image",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 13.0")],-1)),o(" TODO: 작성 "),o(` 
The Vision framework has built-in support for detecting text in images, although realistically it’s limited to printed text in clear fonts – don’t expect to be able to throw raw handwriting at it and get useful results.

To get started import the Vision framework, then set up an instance of \`VNRecognizeTextRequest\` so that it processes any text that is found. Your request will be handed an array of observations that you need to safely typecast as \`VNRecognizedTextObservation\`, then you can loop over each observation to pull out candidates for each one – various possible piece of text that Vision thinks it might have found.

If we wanted to just pull out the best candidate of each observation then print it out, we’d make a request like this:

\`\`\`swift
let request = VNRecognizeTextRequest { request, error in
    guard let observations = request.results as? [VNRecognizedTextObservation] else {
        fatalError("Received invalid observations")
    }

    for observation in observations {
        guard let bestCandidate = observation.topCandidates(1).first else {
            print("No candidate")
            continue
        }

        print("Found this candidate: \\(bestCandidate.string)")
    }
}
\`\`\`

Next, put that request into an array, and set Vision off in a background queue to scan your image. For example, this uses the default \`.userInitiated\` background queue, then loads and scans an image from the app bundle called \`testImage\`:

\`\`\`swift
let requests = [request]

DispatchQueue.global(qos: .userInitiated).async {
    guard let img = UIImage(named: "testImage")?.cgImage else {
        fatalError("Missing image to scan")
    }

    let handler = VNImageRequestHandler(cgImage: img, options: [:])
    try? handler.perform(requests)
}
\`\`\`

Make sure you have an image called “testImage” in your asset catalog, and that code should work out of the box.

There are two further parameters you might want to tweak to make your text recognition more useful. First, by default the \`recognitionLevel\` property of your \`VNRecognizeTextRequest\` is set to \`.accurate\`, which means Vision does its best to figure out the most likely letters in the text. If you wanted to prioritize speed over accuracy – perhaps if you were scanning lots of image, or a live feed, you should change \`recognitionLevel\` to \`.fast\`, like this:

\`\`\`swift
request.recognitionLevel = .fast
\`\`\`

Second, you can set the \`customWords\` property of your request to be an array of unusual strings that your app is likely to come across – words that Vision might decide aren’t likely because it doesn’t recognize them:

\`\`\`swift
request.customWords = ["Pikachu", "Snorlax", "Charizard"]
\`\`\`

These custom words automatically take priority over the built-in dictionary, so use this wisely.

Rather than scanning images in your app bundle, you could load an image that was scanned using VNDocumentCameraViewController – see my article <a href="https://www.hackingwithswift.com/example-code/vision/how-to-detect-documents-using-vndocumentcameraviewcontroller">How to detect documents using VNDocumentCameraViewController</a> for more information.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/strings/how-to-read-a-single-character-from-a-string">How to read a single character from a string 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/how-to-convert-a-swiftui-view-to-an-image">How to convert a SwiftUI view to an image 
/example-code/uikit/how-to-find-an-aspect-fit-images-size-inside-an-image-view">How to find an aspect fit image’s size inside an image view 
/quick-start/swiftui/building-a-menu-using-list">Building a menu using List</a>
`)],-1))])}const y=c(m,[["render",f],["__file","how-to-use-vnrecognizetextrequests-optical-character-recognition-to-detect-text-in-an-image.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/vision/how-to-use-vnrecognizetextrequests-optical-character-recognition-to-detect-text-in-an-image.html","title":"How to use VNRecognizeTextRequest’s optical character recognition to detect text in an image","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to use VNRecognizeTextRequest’s optical character recognition to detect text in an image","description":"Article(s) > How to use VNRecognizeTextRequest’s optical character recognition to detect text in an image","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to use VNRecognizeTextRequest’s optical character recognition to detect text in an image"},{"property":"og:description","content":"How to use VNRecognizeTextRequest’s optical character recognition to detect text in an image"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/vision/how-to-use-vnrecognizetextrequests-optical-character-recognition-to-detect-text-in-an-image.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/vision/how-to-use-vnrecognizetextrequests-optical-character-recognition-to-detect-text-in-an-image.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to use VNRecognizeTextRequest’s optical character recognition to detect text in an image"}],["meta",{"property":"og:description","content":"Article(s) > How to use VNRecognizeTextRequest’s optical character recognition to detect text in an image"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-06-04T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to use VNRecognizeTextRequest’s optical character recognition to detect text in an image\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-06-04T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-06-04T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.48,"words":744},"filePathRelative":"hackingwithswift.com/example-code/vision/how-to-use-vnrecognizetextrequests-optical-character-recognition-to-detect-text-in-an-image.md","localizedDate":"2019년 6월 4일","excerpt":"\\n"}');export{y as comp,v as data};
