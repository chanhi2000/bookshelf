import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as e,t as d,e as n,n as i,g as o,a as t,r as l,o as p}from"./app-DLPYIRXq.js";const h={},g={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"},m=e("nav",{class:"table-of-contents"},[e("ul")],-1),w=e("hr",null,null,-1),f=e("blockquote",null,[e("p",null,"Available from iOS 10.0")],-1),y=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/libraries/how-to-watermark-pdfs-inside-a-pdfview">How to watermark PDFs inside a PDFView 
/example-code/libraries/how-to-display-pdfs-using-pdfview">How to display PDFs using PDFView 
/quick-start/swiftui/how-to-render-a-swiftui-view-to-a-pdf">How to render a SwiftUI view to a PDF 
/example-code/uikit/how-to-render-shadows-using-nsshadow-and-setshadow">How to render shadows using NSShadow and setShadow() 
/quick-start/swiftui/how-to-render-images-using-sf-symbols">How to render images using SF Symbols</a>
`)],-1);function b(a,D){const r=l("VPCard");return p(),c("div",null,[e("h1",g,[e("a",u,[e("span",null,d(a.$frontmatter.title)+" 관련",1)])]),n(r,i(o({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),m,w,n(r,i(o({title:"How to render PDFs using UIGraphicsPDFRenderer | UIKit - free Swift example code",desc:"How to render PDFs using UIGraphicsPDFRenderer",link:"https://hackingwithswift.com/example-code/uikit/how-to-render-pdfs-using-uigraphicspdfrenderer",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,t(" TODO: 작성 "),t(`
UIKit comes with a built-in class for rendering PDFs, and you can render strings, attributed strings, images, and more right to PDF pages. To get started, just create an instance of \`UIGraphicsPDFRenderer\` with the paper size you want, then call its \`pdfData()\` method and pass in your drawing instructions. You get back a \`Data\` object, which you can then write to disk however you want.

Let’s work through some example code so you can try it out. First, pick a paper size:

\`\`\`swift
// A4 size
let pageRect = CGRect(x: 0, y: 0, width: 595.2, height: 841.8)

// Use this to get US Letter size instead
// let pageRect = CGRect(x: 0, y: 0, width: 612, height: 792)
\`\`\`

Next, use that size to create a \`UIGraphicsPDFRenderer\`:

\`\`\`swift
let renderer = UIGraphicsPDFRenderer(bounds: pageRect)
\`\`\`

Third, decide what you want to render. I’m going to render some attributed text as if we were printing an essay:

\`\`\`swift
let title = "School report\\n"
let text = String(repeating: "This is an important report about the weather. ", count: 20)

let titleAttributes = [NSAttributedString.Key.font: UIFont.boldSystemFont(ofSize: 36)]
let textAttributes = [NSAttributedString.Key.font: UIFont.systemFont(ofSize: 12)]

let formattedTitle = NSMutableAttributedString(string: title, attributes: titleAttributes)
let formattedText = NSAttributedString(string: text, attributes: textAttributes)
formattedTitle.append(formattedText)
\`\`\`

Once you have your content ready, call \`pdfData()\` on your renderer, begin a new page, then render as much as you want:

\`\`\`swift
let data = renderer.pdfData { ctx in
    ctx.beginPage()

    formattedTitle.draw(in: pageRect.insetBy(dx: 50, dy: 50))
}
\`\`\`

As you can see, I’ve inset my formatted text by 50 points on all side, which should be enough to allow printers to print it accurately.

Finally, save \`data\` somewhere as your finished PDF file.

`),y])}const F=s(h,[["render",b],["__file","how-to-render-pdfs-using-uigraphicspdfrenderer.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-render-pdfs-using-uigraphicspdfrenderer.html","title":"How to render PDFs using UIGraphicsPDFRenderer","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to render PDFs using UIGraphicsPDFRenderer","description":"Article(s) > How to render PDFs using UIGraphicsPDFRenderer","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-10.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to render PDFs using UIGraphicsPDFRenderer"},{"property":"og:description","content":"How to render PDFs using UIGraphicsPDFRenderer"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-render-pdfs-using-uigraphicspdfrenderer.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-render-pdfs-using-uigraphicspdfrenderer.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to render PDFs using UIGraphicsPDFRenderer"}],["meta",{"property":"og:description","content":"Article(s) > How to render PDFs using UIGraphicsPDFRenderer"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-10.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to render PDFs using UIGraphicsPDFRenderer\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.73,"words":518},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-render-pdfs-using-uigraphicspdfrenderer.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{F as comp,x as data};
