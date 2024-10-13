import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as e,t as s,e as o,n as i,g as n,a as t,r as m,o as g}from"./app-TWLwS86W.js";const p={},d={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"},u=e("nav",{class:"table-of-contents"},[e("ul")],-1),f=e("hr",null,null,-1),I=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1),w=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/core-graphics/how-to-use-core-graphics-blend-modes-to-draw-a-uiimage-differently">How to use Core Graphics blend modes to draw a UIImage differently 
/example-code/media/how-to-save-a-uiimage-to-a-file-using-jpegdata-and-pngdata">How to save a UIImage to a file using jpegData() and pngData() 
/example-code/media/how-to-read-the-average-color-of-a-uiimage-using-ciareaaverage">How to read the average color of a UIImage using CIAreaAverage 
/example-code/media/cidetectortypeface-how-to-detect-faces-in-a-uiimage">CIDetectorTypeFace: How to detect faces in a UIImage 
/example-code/media/how-to-render-a-uiview-to-a-uiimage">How to render a UIView to a UIImage</a>
`)],-1);function x(r,y){const a=m("VPCard");return g(),c("div",null,[e("h1",d,[e("a",h,[e("span",null,s(r.$frontmatter.title)+" 관련",1)])]),o(a,i(n({title:"Media - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/media/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),u,f,o(a,i(n({title:"How to pixellate a UIImage | Media - free Swift example code",desc:"How to pixellate a UIImage",link:"https://hackingwithswift.com/example-code/media/how-to-pixellate-a-uiimage",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),I,t(" TODO: 작성 "),t(` 
Core Image has a number of interesting filters baked in, and an easy one to use is \`CIPixellate\` – it pixellates images, making them appear blocky. You have control over how big each pixel block should be, so it’s suitable for a range of tasks.

Below is some sample code to get you started. To use it you should:

1. Change \`yourUIImage\` to be whatever input \`UIImage\` you want to use.
<li>Change the value of 12 for however strong your pixellation effect should be.
<li>Change the \`print(processedImage.size)\` line at the end for something more interesting – maybe you want to display the pixellated image somewhere?

Here’s the code:

\`\`\`swift
guard let currentCGImage = yourUIImage.cgImage else { return }
let currentCIImage = CIImage(cgImage: currentCGImage)

let filter = CIFilter(name: "CIPixellate")
filter?.setValue(currentCIImage, forKey: kCIInputImageKey)
filter?.setValue(12, forKey: kCIInputScaleKey)
guard let outputImage = filter?.outputImage else { return }

let context = CIContext()

if let cgimg = context.createCGImage(outputImage, from: outputImage.extent) {
    let processedImage = UIImage(cgImage: cgimg)
    print(processedImage.size)
}
\`\`\`

Note: if you intend to run pixellation several times you’ll find it more efficient to save your \`CIContext\` rather than keep recreating it.

`),w])}const _=l(p,[["render",x],["__file","how-to-pixellate-a-uiimage.html.vue"]]),C=JSON.parse('{"path":"/hackingwithswift.com/example-code/media/how-to-pixellate-a-uiimage.html","title":"How to pixellate a UIImage","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to pixellate a UIImage","description":"Article(s) > How to pixellate a UIImage","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to pixellate a UIImage"},{"property":"og:description","content":"How to pixellate a UIImage"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-pixellate-a-uiimage.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-pixellate-a-uiimage.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to pixellate a UIImage"}],["meta",{"property":"og:description","content":"Article(s) > How to pixellate a UIImage"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to pixellate a UIImage\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.5,"words":449},"filePathRelative":"hackingwithswift.com/example-code/media/how-to-pixellate-a-uiimage.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{_ as comp,C as data};
