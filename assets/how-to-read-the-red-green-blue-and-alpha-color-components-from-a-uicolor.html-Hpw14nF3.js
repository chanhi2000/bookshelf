import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as e,t as s,e as a,n as r,g as n,a as o,r as p,o as d}from"./app-TWLwS86W.js";const h={},m={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"},g=e("nav",{class:"table-of-contents"},[e("ul")],-1),f=e("hr",null,null,-1),w=e("blockquote",null,[e("p",null,"Available from iOS 5.0")],-1),b=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/how-to-read-the-red-green-and-blue-values-from-a-color">How to read the red, green, and blue values from a Color 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/strings/how-to-split-a-string-into-an-array-componentsseparatedby">How to split a string into an array: components(separatedBy:) 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode</a>
`)],-1);function y(l,C){const t=p("VPCard");return d(),c("div",null,[e("h1",m,[e("a",u,[e("span",null,s(l.$frontmatter.title)+" 관련",1)])]),a(t,r(n({title:"UIClolr - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uicolor/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,f,a(t,r(n({title:"How to read the red, green, blue, and alpha color components from a UIColor | UIClolr - free Swift example code",desc:"How to read the red, green, blue, and alpha color components from a UIColor",link:"https://hackingwithswift.com/example-code/uicolor/how-to-read-the-red-green-blue-and-alpha-color-components-from-a-uicolor",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,o(" TODO: 작성 "),o(` 
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

`),b])}const _=i(h,[["render",y],["__file","how-to-read-the-red-green-blue-and-alpha-color-components-from-a-uicolor.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/example-code/uicolor/how-to-read-the-red-green-blue-and-alpha-color-components-from-a-uicolor.html","title":"How to read the red, green, blue, and alpha color components from a UIColor","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to read the red, green, blue, and alpha color components from a UIColor","description":"Article(s) > How to read the red, green, blue, and alpha color components from a UIColor","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-5.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to read the red, green, blue, and alpha color components from a UIColor"},{"property":"og:description","content":"How to read the red, green, blue, and alpha color components from a UIColor"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uicolor/how-to-read-the-red-green-blue-and-alpha-color-components-from-a-uicolor.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uicolor/how-to-read-the-red-green-blue-and-alpha-color-components-from-a-uicolor.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to read the red, green, blue, and alpha color components from a UIColor"}],["meta",{"property":"og:description","content":"Article(s) > How to read the red, green, blue, and alpha color components from a UIColor"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-5.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-10-23T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to read the red, green, blue, and alpha color components from a UIColor\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-10-23T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.66,"words":497},"filePathRelative":"hackingwithswift.com/example-code/uicolor/how-to-read-the-red-green-blue-and-alpha-color-components-from-a-uicolor.md","localizedDate":"2019년 10월 23일","excerpt":"\\n"}');export{_ as comp,x as data};
