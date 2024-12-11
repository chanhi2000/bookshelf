import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as t,as as p,ao as i,at as n,au as r,ak as o,aq as g,ar as u}from"./app-Dn51E1Ub.js";const d={},m={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"};function w(s,e){const a=g("VPCard");return u(),l("div",null,[t("h1",m,[t("a",h,[t("span",null,p(s.$frontmatter.title)+" 관련",1)])]),i(a,n(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),i(a,n(r({title:"How to create a custom debug description | Language - free Swift example code",desc:"How to create a custom debug description",link:"https://hackingwithswift.com/example-code/language/how-to-create-a-custom-debug-description",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),o(" TODO: 작성 "),o(` 
Swift lets you print all types of data, but some data is more useful than others thanks to the \`CustomDebugStringConvertible\` protocol. If you write a type conforming to that protocol, you must include a \`debugDescription\` string property that describes how instances of this type should be represented while debugging.

To test this out, we’re going to create a \`Player\` struct that stores a player’s name. When we try to debug an instance of this struct – i.e., print it out, or hover over it in the debugger – we just want the player’s name to come back, for easier debugging.

Try adding this struct to a playground:

\`\`\`swift
struct Player: CustomDebugStringConvertible {
    var name: String = "@twostraws"

    var debugDescription: String {
        return name
    }
}
\`\`\`

You can now create instances of that struct and print them out to see the player name:

\`\`\`swift
let player = Player()
print(player)
\`\`\`

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/example-code/language/how-to-create-quick-look-debug-previews-for-your-custom-types">How to create Quick Look debug previews for your custom types 
/example-code/language/how-to-print-debug-text-in-swift">How to print debug text in Swift 
/example-code/games/how-to-debug-physics-in-a-spritekit-scene-using-showsphysics">How to debug physics in a SpriteKit scene using showsPhysics 
/example-code/xcode/how-to-debug-view-layouts-in-xcode">How to debug view layouts in Xcode 
/example-code/strings/how-to-test-localization-by-setting-a-debug-locale-and-double-length-pseudolanguage">How to test localization by setting a debug locale and double length pseudolanguage</a>
`)],-1))])}const y=c(d,[["render",w],["__file","how-to-create-a-custom-debug-description.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-create-a-custom-debug-description.html","title":"How to create a custom debug description","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to create a custom debug description","description":"Article(s) > How to create a custom debug description","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to create a custom debug description"},{"property":"og:description","content":"How to create a custom debug description"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-create-a-custom-debug-description.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-create-a-custom-debug-description.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to create a custom debug description"}],["meta",{"property":"og:description","content":"Article(s) > How to create a custom debug description"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to create a custom debug description\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.39,"words":416},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-create-a-custom-debug-description.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,k as data};
