import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as t,t as c,e as n,n as a,g as i,a as e,r as d,o as p}from"./app-ubLChIzZ.js";const u={},m={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"},g=t("nav",{class:"table-of-contents"},[t("ul")],-1),w=t("hr",null,null,-1),f=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1),y=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/quick-start/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts">How to use Instruments to profile your SwiftUI code and identify slow layouts</a>
`)],-1);function b(l,k){const o=d("VPCard");return p(),s("div",null,[t("h1",m,[t("a",h,[t("span",null,c(l.$frontmatter.title)+" 관련",1)])]),n(o,a(i({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,w,n(o,a(i({title:"How to multiply an int and a double | Language - free Swift example code",desc:"How to multiply an int and a double",link:"https://hackingwithswift.com/example-code/language/how-to-multiply-an-int-and-a-double",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,e(" TODO: 작성 "),e(` 
Swift’s type safety means code to multiply an integer and a double won’t compile:

\`\`\`swift
let a = 4
let b = 5.0
let c = a * b
\`\`\`

You can either fix this by forcing your integer to be a double:

\`\`\`swift
let d: Double = 4
let e = 5.0
let f = a * b
\`\`\`

Alternatively you can convert your integer to a double as needed:

\`\`\`swift
let g = 4
let h = 5.0
let i = Double(a) * b
\`\`\`

If this situation really annoys you and you want it solved fully, add this custom \`*\` function:

\`\`\`swift
func *(lhs: Int, rhs: Double) -> Double {
    return Double(lhs) * rhs
}
\`\`\`

That will multiply an integer on the left with a double on the right, returning a double containing the result.

`),y])}const S=r(u,[["render",b],["__file","how-to-multiply-an-int-and-a-double.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-multiply-an-int-and-a-double.html","title":"How to multiply an int and a double","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to multiply an int and a double","description":"Article(s) > How to multiply an int and a double","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to multiply an int and a double"},{"property":"og:description","content":"How to multiply an int and a double"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-multiply-an-int-and-a-double.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-multiply-an-int-and-a-double.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to multiply an int and a double"}],["meta",{"property":"og:description","content":"Article(s) > How to multiply an int and a double"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to multiply an int and a double\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.31,"words":392},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-multiply-an-int-and-a-double.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{S as comp,v as data};
