import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,b as e,t as s,e as o,n as i,g as n,a as t,r as m,o as d}from"./app-DLPYIRXq.js";const p={},h={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},u=e("nav",{class:"table-of-contents"},[e("ul")],-1),w=e("hr",null,null,-1),f=e("blockquote",null,[e("p",null,"Available from iOS 6.0")],-1),k=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/quick-start/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts">How to use Instruments to profile your SwiftUI code and identify slow layouts</a>
`)],-1);function y(r,I){const a=m("VPCard");return d(),l("div",null,[e("h1",h,[e("a",g,[e("span",null,s(r.$frontmatter.title)+" 관련",1)])]),o(a,i(n({title:"Media - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/media/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),u,w,o(a,i(n({title:"How to desaturate an image to make it black and white | Media - free Swift example code",desc:"How to desaturate an image to make it black and white",link:"https://hackingwithswift.com/example-code/media/how-to-desaturate-an-image-to-make-it-black-and-white",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,t(" TODO: 작성 "),t(` 
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

`),k])}const x=c(p,[["render",y],["__file","how-to-desaturate-an-image-to-make-it-black-and-white.html.vue"]]),C=JSON.parse('{"path":"/hackingwithswift.com/example-code/media/how-to-desaturate-an-image-to-make-it-black-and-white.html","title":"How to desaturate an image to make it black and white","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to desaturate an image to make it black and white","description":"Article(s) > How to desaturate an image to make it black and white","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-6.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to desaturate an image to make it black and white"},{"property":"og:description","content":"How to desaturate an image to make it black and white"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-desaturate-an-image-to-make-it-black-and-white.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-desaturate-an-image-to-make-it-black-and-white.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to desaturate an image to make it black and white"}],["meta",{"property":"og:description","content":"Article(s) > How to desaturate an image to make it black and white"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-6.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to desaturate an image to make it black and white\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.56,"words":467},"filePathRelative":"hackingwithswift.com/example-code/media/how-to-desaturate-an-image-to-make-it-black-and-white.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,C as data};
