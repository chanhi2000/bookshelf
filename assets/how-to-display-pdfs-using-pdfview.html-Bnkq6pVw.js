import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as p,f as t,av as d,au as a,aw as n,ax as s,b as i,r as c,o as w}from"./app-BGkQLgjR.js";const u={},h={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function f(r,e){const o=c("VPCard");return w(),p("div",null,[t("h1",h,[t("a",m,[t("span",null,d(r.$frontmatter.title)+" 관련",1)])]),a(o,n(s({title:"Libraries - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/libraries/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),a(o,n(s({title:"How to display PDFs using PDFView | Libraries - free Swift example code",desc:"How to display PDFs using PDFView",link:"https://hackingwithswift.com/example-code/libraries/how-to-display-pdfs-using-pdfview",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 11.0")],-1)),i(" TODO: 작성 "),i(` 
Apple’s PDFKit framework provides a huge range of code to help us work with PDFs, and one of the most useful is \`PDFView\` – it renders PDFs to the screen and lets users interact with them.

To try it out, start by importing the PDFKit framework:

\`\`\`swift
import PDFKit
\`\`\`

Next, add this code to your \`viewDidLoad()\` method to create a \`PDFView\` and make it fill all available space:

\`\`\`swift
let pdfView = PDFView()

pdfView.translatesAutoresizingMaskIntoConstraints = false
view.addSubview(pdfView)

pdfView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor).isActive = true
pdfView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor).isActive = true
pdfView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor).isActive = true
pdfView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor).isActive = true
\`\`\`

Finally, create a \`URL\` pointing to a PDF you have in your bundle somewhere (or one in your documents directory), then create a \`PDFDocument\` object from that and pass it to the PDF view:

\`\`\`swift
guard let path = Bundle.main.url(forResource: "example", withExtension: "pdf") else { return }

if let document = PDFDocument(url: path) {
    pdfView.document = document
}
\`\`\`

Done!

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),i(`
/example-code/libraries/how-to-watermark-pdfs-inside-a-pdfview">How to watermark PDFs inside a PDFView 
/example-code/uikit/how-to-render-pdfs-using-uigraphicspdfrenderer">How to render PDFs using UIGraphicsPDFRenderer 
/example-code/libraries/how-to-show-pdf-thumbnails-using-pdfthumbnailview">How to show PDF thumbnails using PDFThumbnailView 
/quick-start/swiftui/how-to-customize-the-display-mode-of-navigationsplitview">How to customize the display mode of NavigationSplitView 
/example-code/strings/how-to-display-different-strings-based-on-available-space-using-variantfittingpresentationwidth">How to display different strings based on available space using variantFittingPresentationWidth()</a>
`)],-1))])}const D=l(u,[["render",f],["__file","how-to-display-pdfs-using-pdfview.html.vue"]]),P=JSON.parse('{"path":"/hackingwithswift.com/example-code/libraries/how-to-display-pdfs-using-pdfview.html","title":"How to display PDFs using PDFView","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to display PDFs using PDFView","description":"Article(s) > How to display PDFs using PDFView","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-11.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to display PDFs using PDFView"},{"property":"og:description","content":"How to display PDFs using PDFView"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/libraries/how-to-display-pdfs-using-pdfview.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/libraries/how-to-display-pdfs-using-pdfview.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to display PDFs using PDFView"}],["meta",{"property":"og:description","content":"Article(s) > How to display PDFs using PDFView"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-11.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to display PDFs using PDFView\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.32,"words":396},"filePathRelative":"hackingwithswift.com/example-code/libraries/how-to-display-pdfs-using-pdfview.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{D as comp,P as data};
