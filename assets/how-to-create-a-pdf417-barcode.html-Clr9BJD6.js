import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as e,t as l,e as o,n as r,g as i,a as t,r as d,o as p}from"./app-TWLwS86W.js";const m={},h={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},f=e("nav",{class:"table-of-contents"},[e("ul")],-1),w=e("hr",null,null,-1),u=e("blockquote",null,[e("p",null,"Available from iOS 9.0")],-1),b=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/media/how-to-create-a-barcode">How to create a barcode 
/example-code/media/how-to-scan-a-barcode">How to scan a barcode 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks</a>
`)],-1);function y(n,k){const a=d("VPCard");return p(),s("div",null,[e("h1",h,[e("a",g,[e("span",null,l(n.$frontmatter.title)+" 관련",1)])]),o(a,r(i({title:"Media - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/media/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,w,o(a,r(i({title:"How to create a PDF417 barcode | Media - free Swift example code",desc:"How to create a PDF417 barcode",link:"https://hackingwithswift.com/example-code/media/how-to-create-a-pdf417-barcode",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),u,t(" TODO: 작성 "),t(` 
PDF417 barcodes - most frequently seen on boarding passes at airports, but also seen in digital postage stamps and other places – are built right into iOS. This function below accepts a string as its only parameter and returns a \`UIImage\` containing the PDF417 barcode representing that string:

\`\`\`swift
func generatePDF417Barcode(from string: String) -> UIImage? {
    let data = string.data(using: String.Encoding.ascii)

    if let filter = CIFilter(name: "CIPDF417BarcodeGenerator") {
        filter.setValue(data, forKey: "inputMessage")
        let transform = CGAffineTransform(scaleX: 3, y: 3)

        if let output = filter.outputImage?.transformed(by: transform) {
            return UIImage(ciImage: output)
        }
    }

    return nil
}

let image = generatePDF417Barcode(from: "Hacking with Swift")
\`\`\`

`),b])}const x=c(m,[["render",y],["__file","how-to-create-a-pdf417-barcode.html.vue"]]),D=JSON.parse('{"path":"/hackingwithswift.com/example-code/media/how-to-create-a-pdf417-barcode.html","title":"How to create a PDF417 barcode","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to create a PDF417 barcode","description":"Article(s) > How to create a PDF417 barcode","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-9.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to create a PDF417 barcode"},{"property":"og:description","content":"How to create a PDF417 barcode"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-create-a-pdf417-barcode.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-create-a-pdf417-barcode.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to create a PDF417 barcode"}],["meta",{"property":"og:description","content":"Article(s) > How to create a PDF417 barcode"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-9.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to create a PDF417 barcode\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.1,"words":329},"filePathRelative":"hackingwithswift.com/example-code/media/how-to-create-a-pdf417-barcode.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,D as data};
