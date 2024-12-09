import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as e,t as l,e as o,n as i,g as c,a as t,r as m,o as p}from"./app-ubLChIzZ.js";const d={},g={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},h=e("nav",{class:"table-of-contents"},[e("ul")],-1),u=e("hr",null,null,-1),w=e("blockquote",null,[e("p",null,"Available from iOS 5.0")],-1),y=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/core-graphics/how-to-use-core-graphics-blend-modes-to-draw-a-uiimage-differently">How to use Core Graphics blend modes to draw a UIImage differently 
/example-code/media/how-to-save-a-uiimage-to-a-file-using-jpegdata-and-pngdata">How to save a UIImage to a file using jpegData() and pngData() 
/example-code/media/how-to-read-the-average-color-of-a-uiimage-using-ciareaaverage">How to read the average color of a UIImage using CIAreaAverage 
/example-code/media/how-to-pixellate-a-uiimage">How to pixellate a UIImage 
/example-code/media/how-to-render-a-uiview-to-a-uiimage">How to render a UIView to a UIImage</a>
`)],-1);function I(n,_){const a=m("VPCard");return p(),s("div",null,[e("h1",g,[e("a",f,[e("span",null,l(n.$frontmatter.title)+" 관련",1)])]),o(a,i(c({title:"Media - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/media/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),h,u,o(a,i(c({title:"CIDetectorTypeFace: How to detect faces in a UIImage | Media - free Swift example code",desc:"CIDetectorTypeFace: How to detect faces in a UIImage",link:"https://hackingwithswift.com/example-code/media/cidetectortypeface-how-to-detect-faces-in-a-uiimage",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,t(" TODO: 작성 "),t(` 
Core Image has a number of feature detectors built right in, including the ability to detect faces, eyes, mouths, smiles and even blinking in pictures. When you ask it to look for faces in a picture, it will return you an array of all the faces it found, with each one containing face feature details such as eye position. Here's an example:

\`\`\`swift
if let inputImage = UIImage(named: "taylor-swift") {
    let ciImage = CIImage(cgImage: inputImage.cgImage!)

    let options = [CIDetectorAccuracy: CIDetectorAccuracyHigh]
    let faceDetector = CIDetector(ofType: CIDetectorTypeFace, context: nil, options: options)!

    let faces = faceDetector.features(in: ciImage)

    if let face = faces.first as? CIFaceFeature {
        print("Found face at \\(face.bounds)")

        if face.hasLeftEyePosition {
            print("Found left eye at \\(face.leftEyePosition)")
        }

        if face.hasRightEyePosition {
            print("Found right eye at \\(face.rightEyePosition)")
        }

        if face.hasMouthPosition {
            print("Found mouth at \\(face.mouthPosition)")
        }
    }
}
\`\`\`

`),y])}const x=r(d,[["render",I],["__file","cidetectortypeface-how-to-detect-faces-in-a-uiimage.html.vue"]]),C=JSON.parse('{"path":"/hackingwithswift.com/example-code/media/cidetectortypeface-how-to-detect-faces-in-a-uiimage.html","title":"CIDetectorTypeFace: How to detect faces in a UIImage","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"CIDetectorTypeFace: How to detect faces in a UIImage","description":"Article(s) > CIDetectorTypeFace: How to detect faces in a UIImage","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-5.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > CIDetectorTypeFace: How to detect faces in a UIImage"},{"property":"og:description","content":"CIDetectorTypeFace: How to detect faces in a UIImage"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/cidetectortypeface-how-to-detect-faces-in-a-uiimage.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/cidetectortypeface-how-to-detect-faces-in-a-uiimage.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"CIDetectorTypeFace: How to detect faces in a UIImage"}],["meta",{"property":"og:description","content":"Article(s) > CIDetectorTypeFace: How to detect faces in a UIImage"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-5.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CIDetectorTypeFace: How to detect faces in a UIImage\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.36,"words":409},"filePathRelative":"hackingwithswift.com/example-code/media/cidetectortypeface-how-to-detect-faces-in-a-uiimage.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,C as data};
