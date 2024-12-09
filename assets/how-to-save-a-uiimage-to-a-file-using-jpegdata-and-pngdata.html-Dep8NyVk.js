import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,b as t,t as c,e as o,n as i,g as n,a as e,r as p,o as g}from"./app-ubLChIzZ.js";const m={},d={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"},u=t("nav",{class:"table-of-contents"},[t("ul")],-1),f=t("hr",null,null,-1),w=t("blockquote",null,[t("p",null,"Available from iOS 2.0")],-1),y=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/example-code/strings/how-to-save-a-string-to-a-file-on-disk-with-writeto">How to save a string to a file on disk with write(to:)</a>
`)],-1);function D(s,v){const a=p("VPCard");return g(),l("div",null,[t("h1",d,[t("a",h,[t("span",null,c(s.$frontmatter.title)+" 관련",1)])]),o(a,i(n({title:"Media - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/media/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),u,f,o(a,i(n({title:"How to save a UIImage to a file using jpegData() and pngData() | Media - free Swift example code",desc:"How to save a UIImage to a file using jpegData() and pngData()",link:"https://hackingwithswift.com/example-code/media/how-to-save-a-uiimage-to-a-file-using-jpegdata-and-pngdata",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,e(" TODO: 작성 "),e(` 
If you've generated an image using Core Graphics, or perhaps rendered part of your layout, you might want to save that out as either a PNG or a JPEG. Both are easy thanks to two methods: \`pngData()\` and \`jpegData()\`, both of which convert a \`UIImage\` into a \`Data\` instance you can write out.

Here's an example:

\`\`\`swift
if let image = UIImage(named: "example.png") {
    if let data = image.pngData() {
        let filename = getDocumentsDirectory().appendingPathComponent("copy.png")
        try? data.write(to: filename)
    }
}
\`\`\`

That call to \`getDocumentsDirectory()\` is a little helper function I include in most of my projects, because it makes it easy to locate the user's documents directory where you can save app files. Here it is:

\`\`\`swift
func getDocumentsDirectory() -> URL {
    let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
    return paths[0]
}
\`\`\`

If you want to save your image as a JPEG rather than a PNG, use this code instead:

\`\`\`swift
if let image = UIImage(named: "example.jpg") {
    if let data = image.jpegData(compressionQuality: 0.8) {
        let filename = getDocumentsDirectory().appendingPathComponent("copy.png")
        try? data.write(to: filename)
    }
}
\`\`\`

The parameter to \`jpegData()\` is a float that represents JPEG quality, where 1.0 is highest and 0.0 is lowest.

`),y])}const _=r(m,[["render",D],["__file","how-to-save-a-uiimage-to-a-file-using-jpegdata-and-pngdata.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/example-code/media/how-to-save-a-uiimage-to-a-file-using-jpegdata-and-pngdata.html","title":"How to save a UIImage to a file using jpegData() and pngData()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to save a UIImage to a file using jpegData() and pngData()","description":"Article(s) > How to save a UIImage to a file using jpegData() and pngData()","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to save a UIImage to a file using jpegData() and pngData()"},{"property":"og:description","content":"How to save a UIImage to a file using jpegData() and pngData()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-save-a-uiimage-to-a-file-using-jpegdata-and-pngdata.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-save-a-uiimage-to-a-file-using-jpegdata-and-pngdata.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to save a UIImage to a file using jpegData() and pngData()"}],["meta",{"property":"og:description","content":"Article(s) > How to save a UIImage to a file using jpegData() and pngData()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2020-04-18T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to save a UIImage to a file using jpegData() and pngData()\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-04-18T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2020-04-18T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.63,"words":489},"filePathRelative":"hackingwithswift.com/example-code/media/how-to-save-a-uiimage-to-a-file-using-jpegdata-and-pngdata.md","localizedDate":"2020년 4월 18일","excerpt":"\\n"}');export{_ as comp,x as data};
