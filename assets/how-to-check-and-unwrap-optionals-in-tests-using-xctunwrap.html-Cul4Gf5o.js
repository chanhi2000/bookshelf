import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as t,t as l,e as o,n as a,g as i,a as e,r as p,o as h}from"./app-ubLChIzZ.js";const w={},u={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"},g=t("nav",{class:"table-of-contents"},[t("ul")],-1),m=t("hr",null,null,-1),f=t("blockquote",null,[t("p",null,"Available from iOS 13.0")],-1),k=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/example-code/language/when-is-it-safe-to-force-unwrap-optionals">When is it safe to force unwrap optionals?</a>
`)],-1);function y(s,T){const n=p("VPCard");return h(),c("div",null,[t("h1",u,[t("a",d,[t("span",null,l(s.$frontmatter.title)+" 관련",1)])]),o(n,a(i({title:"Testing - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/testing/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,m,o(n,a(i({title:"How to check and unwrap optionals in tests using XCTUnwrap() | Testing - free Swift example code",desc:"How to check and unwrap optionals in tests using XCTUnwrap()",link:"https://hackingwithswift.com/example-code/testing/how-to-check-and-unwrap-optionals-in-tests-using-xctunwrap",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,e(" TODO: 작성 "),e(` 
When writing tests, it’s common to want to unwrap an optional before checking it for a particular value. \`XCTUnwrap()\` does exactly that for us: it attempts to unwrap the optional, but will throw an error (and thus fail the test) if the optional is nil.

For example, if you have a \`User\` struct with a \`getAuthenticationToken()\` method that returns an optional string, you can use \`XCTUnwrap()\` like this:

\`\`\`swift
func testTokenGenerationSucceeds() throws {
    let user = User()
    let token = try XCTUnwrap(user.getAuthenticationToken())
    XCTAssertEqual(token.count, 40)
}
\`\`\`

That test is marked with \`throws\`, which allows us to call \`XCTUnwrap()\` and propagate any errors if it finds our optional is empty.

This approach is cleaner than what we might have written previously:

\`\`\`swift
func testTokenGenerationSucceeds2() {
    let user = User()
    if let token = user.getAuthenticationToken() {
        XCTAssertEqual(token.count, 40)
    } else {
        XCTFail("Failed to generate valid token.")
    }
}
\`\`\`

It’s worth adding that in trivial cases such as this one, it’s possible to compare optionals with non-optionals in less code, like this:

\`\`\`swift
func testTokenGenerationSucceeds3() throws {
    let user = User()
    XCTAssertEqual(user.getAuthenticationToken()?.count, 40)
}
\`\`\`

However, things aren’t so straightforward when you need to work with optional chaining in a longer test – that’s really where \`XCTUnwrap()\` will come into its own.

`),k])}const C=r(w,[["render",y],["__file","how-to-check-and-unwrap-optionals-in-tests-using-xctunwrap.html.vue"]]),U=JSON.parse('{"path":"/hackingwithswift.com/example-code/testing/how-to-check-and-unwrap-optionals-in-tests-using-xctunwrap.html","title":"How to check and unwrap optionals in tests using XCTUnwrap()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to check and unwrap optionals in tests using XCTUnwrap()","description":"Article(s) > How to check and unwrap optionals in tests using XCTUnwrap()","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to check and unwrap optionals in tests using XCTUnwrap()"},{"property":"og:description","content":"How to check and unwrap optionals in tests using XCTUnwrap()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/testing/how-to-check-and-unwrap-optionals-in-tests-using-xctunwrap.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/testing/how-to-check-and-unwrap-optionals-in-tests-using-xctunwrap.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to check and unwrap optionals in tests using XCTUnwrap()"}],["meta",{"property":"og:description","content":"Article(s) > How to check and unwrap optionals in tests using XCTUnwrap()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-10-15T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to check and unwrap optionals in tests using XCTUnwrap()\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-15T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-10-15T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.6,"words":479},"filePathRelative":"hackingwithswift.com/example-code/testing/how-to-check-and-unwrap-optionals-in-tests-using-xctunwrap.md","localizedDate":"2019년 10월 15일","excerpt":"\\n"}');export{C as comp,U as data};
