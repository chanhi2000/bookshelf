import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as d,f as e,av as l,au as n,aw as i,ax as r,b as a,r as h,o as p}from"./app-TfhzDSA_.js";const m={},u={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"};function y(s,t){const o=h("VPCard");return p(),d("div",null,[e("h1",u,[e("a",w,[e("span",null,l(s.$frontmatter.title)+" 관련",1)])]),n(o,i(r({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(o,i(r({title:"How to save and load objects with NSKeyedArchiver and NSKeyedUnarchiver | System - free Swift example code",desc:"How to save and load objects with NSKeyedArchiver and NSKeyedUnarchiver",logo:"https://hackingwithswift.com/favicon.svg",link:"https://hackingwithswift.com/example-code/how-to-save-and-load-objects-with-nskeyedarchiver-and-nskeyedunarchiver",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 2.0")],-1)),a(" TODO: 작성 "),a(` 
You can write any kind of object to disk as long as it supports the \`NSCoding\` protocol – which includes strings, arrays, dictionaries, \`UIView\`, \`UIColor\` and more right out of the box. To write to disk, use this:

\`\`\`swift
let randomFilename = UUID().uuidString
let fullPath = getDocumentsDirectory().appendingPathComponent(randomFilename)

do {
    let data = try NSKeyedArchiver.archivedData(withRootObject: somethingToSave, requiringSecureCoding: false)
    try data.write(to: fullPath)
} catch {
    print("Couldn't write file")
}
\`\`\`

That call to \`getDocumentsDirectory()\` is a small helper function I frequently use to write files to disk:

\`\`\`swift
func getDocumentsDirectory() -> URL {
    let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
    return paths[0]
}
\`\`\`

When you want to read your object back you need to use \`unarchiveObject(withFile:)\`, but be warned: the file might not exist or might not be unarchivable, so this method returns an optional value that you need to unwrap carefully.

For example, if you want to unarchive an array of strings, you would use this code:

\`\`\`swift
do {
    if let loadedStrings = try NSKeyedUnarchiver.unarchiveTopLevelObjectWithData(data) as? [String] {
        savedArray = loadedStrings
    }
} catch {
    print("Couldn't read file.")
}
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),a(`
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/quick-start/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts">How to use Instruments to profile your SwiftUI code and identify slow layouts</a>
`)],-1))])}const v=c(m,[["render",y],["__file","how-to-save-and-load-objects-with-nskeyedarchiver-and-nskeyedunarchiver.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-save-and-load-objects-with-nskeyedarchiver-and-nskeyedunarchiver.html","title":"How to save and load objects with NSKeyedArchiver and NSKeyedUnarchiver","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to save and load objects with NSKeyedArchiver and NSKeyedUnarchiver","description":"Article(s) > How to save and load objects with NSKeyedArchiver and NSKeyedUnarchiver","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to save and load objects with NSKeyedArchiver and NSKeyedUnarchiver"},{"property":"og:description","content":"How to save and load objects with NSKeyedArchiver and NSKeyedUnarchiver"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-save-and-load-objects-with-nskeyedarchiver-and-nskeyedunarchiver.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-save-and-load-objects-with-nskeyedarchiver-and-nskeyedunarchiver.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to save and load objects with NSKeyedArchiver and NSKeyedUnarchiver"}],["meta",{"property":"og:description","content":"Article(s) > How to save and load objects with NSKeyedArchiver and NSKeyedUnarchiver"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to save and load objects with NSKeyedArchiver and NSKeyedUnarchiver\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.52,"words":457},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-save-and-load-objects-with-nskeyedarchiver-and-nskeyedunarchiver.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{v as comp,k as data};
