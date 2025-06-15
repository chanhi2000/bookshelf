import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as t,av as m,au as i,aw as n,ax as r,b as a,r as d,o as p}from"./app-BGkQLgjR.js";const u={},g={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"};function w(l,e){const o=d("VPCard");return p(),c("div",null,[t("h1",g,[t("a",h,[t("span",null,m(l.$frontmatter.title)+" 관련",1)])]),i(o,n(r({title:"Media - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/media/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),i(o,n(r({title:"How to desaturate an image to make it black and white | Media - free Swift example code",desc:"How to desaturate an image to make it black and white",link:"https://hackingwithswift.com/example-code/media/how-to-desaturate-an-image-to-make-it-black-and-white",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 6.0")],-1)),a(" TODO: 작성 "),a(` 
One of the most useful filters to have in your toolbox is called \`CIColorMonochrome\`, and its job is to remove the color variance from an image then tint it however you want. If you use gray as your tint color, it produces plain black and white images, but you can also use other colors to get sepia tone and other effects.

Here’s some example code to get you started:

\`\`\`swift
guard let currentCGImage = yourUIImage.cgImage else { return }
let currentCIImage = CIImage(cgImage: currentCGImage)

let filter = CIFilter(name: "CIColorMonochrome")
filter?.setValue(currentCIImage, forKey: "inputImage")

// set a gray value for the tint color
filter?.setValue(CIColor(red: 0.7, green: 0.7, blue: 0.7), forKey: "inputColor")

filter?.setValue(1.0, forKey: "inputIntensity")
guard let outputImage = filter?.outputImage else { return }

let context = CIContext()

if let cgimg = context.createCGImage(outputImage, from: outputImage.extent) {
    let processedImage = UIImage(cgImage: cgimg)
    print(processedImage.size)
}
\`\`\`

To make that work you’ll need a \`UIImage\` called \`yourUIImage\`, then replace the \`print(processedImage.size)\` line at the end with whatever you want to do with your black and white image.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),a(`
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/quick-start/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts">How to use Instruments to profile your SwiftUI code and identify slow layouts</a>
`)],-1))])}const y=s(u,[["render",w],["__file","how-to-desaturate-an-image-to-make-it-black-and-white.html.vue"]]),I=JSON.parse('{"path":"/hackingwithswift.com/example-code/media/how-to-desaturate-an-image-to-make-it-black-and-white.html","title":"How to desaturate an image to make it black and white","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to desaturate an image to make it black and white","description":"Article(s) > How to desaturate an image to make it black and white","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-6.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to desaturate an image to make it black and white"},{"property":"og:description","content":"How to desaturate an image to make it black and white"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-desaturate-an-image-to-make-it-black-and-white.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-desaturate-an-image-to-make-it-black-and-white.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to desaturate an image to make it black and white"}],["meta",{"property":"og:description","content":"Article(s) > How to desaturate an image to make it black and white"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-6.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to desaturate an image to make it black and white\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.56,"words":467},"filePathRelative":"hackingwithswift.com/example-code/media/how-to-desaturate-an-image-to-make-it-black-and-white.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,I as data};
