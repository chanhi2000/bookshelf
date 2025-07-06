import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,f as e,av as p,au as r,aw as n,ax as l,b as t,r as d,o as h}from"./app-Bhu0350G.js";const m={},u={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function f(i,o){const a=d("VPCard");return h(),s("div",null,[e("h1",u,[e("a",g,[e("span",null,p(i.$frontmatter.title)+" 관련",1)])]),r(a,n(l({title:"UIClolr - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uicolor/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[0]||(o[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),o[1]||(o[1]=e("hr",null,null,-1)),r(a,n(l({title:"How to read the red, green, blue, and alpha color components from a UIColor | UIClolr - free Swift example code",desc:"How to read the red, green, blue, and alpha color components from a UIColor",link:"https://hackingwithswift.com/example-code/uicolor/how-to-read-the-red-green-blue-and-alpha-color-components-from-a-uicolor",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[2]||(o[2]=e("blockquote",null,[e("p",null,"Available from iOS 5.0")],-1)),t(" TODO: 작성 "),t(` 
Creating a \`UIColor\` from red, green, blue, and alpha (RGBA) is easy enough:

\`\`\`swift
let color = UIColor(red: 0.8, green: 0.1, blue: 0.5, alpha: 1)
\`\`\`

But when you want to read those values back, you need to do a little more work. \`UIColor\` has a built-in method called \`getRed()\`, which unpacks the RGBA values into variable floats – you need to create four variables first, then pass them in by reference:

\`\`\`swift
var red: CGFloat = 0
var green: CGFloat = 0
var blue: CGFloat = 0
var alpha: CGFloat = 0

color.getRed(&red, green: &green, blue: &blue, alpha: &alpha)
\`\`\`

When that runs, \`red\` will have 0.8, \`green\` will have 0.1, and so on.

Because this is a pain to use you might find it best to wrap it up in an extension:

\`\`\`swift
extension UIColor {
    var rgba: (red: CGFloat, green: CGFloat, blue: CGFloat, alpha: CGFloat) {
        var red: CGFloat = 0
        var green: CGFloat = 0
        var blue: CGFloat = 0
        var alpha: CGFloat = 0
        getRed(&red, green: &green, blue: &blue, alpha: &alpha)

        return (red, green, blue, alpha)
    }
}
\`\`\`

Now you can use \`color.rgba\` to get back a tuple of all four color values.

`),o[3]||(o[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/quick-start/swiftui/how-to-read-the-red-green-and-blue-values-from-a-color">How to read the red, green, and blue values from a Color 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/strings/how-to-split-a-string-into-an-array-componentsseparatedby">How to split a string into an array: components(separatedBy:) 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode</a>
`)],-1))])}const y=c(m,[["render",f],["__file","how-to-read-the-red-green-blue-and-alpha-color-components-from-a-uicolor.html.vue"]]),C=JSON.parse('{"path":"/hackingwithswift.com/example-code/uicolor/how-to-read-the-red-green-blue-and-alpha-color-components-from-a-uicolor.html","title":"How to read the red, green, blue, and alpha color components from a UIColor","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to read the red, green, blue, and alpha color components from a UIColor","description":"Article(s) > How to read the red, green, blue, and alpha color components from a UIColor","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-5.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to read the red, green, blue, and alpha color components from a UIColor"},{"property":"og:description","content":"How to read the red, green, blue, and alpha color components from a UIColor"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uicolor/how-to-read-the-red-green-blue-and-alpha-color-components-from-a-uicolor.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uicolor/how-to-read-the-red-green-blue-and-alpha-color-components-from-a-uicolor.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to read the red, green, blue, and alpha color components from a UIColor"}],["meta",{"property":"og:description","content":"Article(s) > How to read the red, green, blue, and alpha color components from a UIColor"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-5.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-10-23T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to read the red, green, blue, and alpha color components from a UIColor\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-10-23T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.66,"words":497},"filePathRelative":"hackingwithswift.com/example-code/uicolor/how-to-read-the-red-green-blue-and-alpha-color-components-from-a-uicolor.md","localizedDate":"2019년 10월 23일","excerpt":"\\n"}');export{y as comp,C as data};
