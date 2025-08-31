import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as t,as as f,ao as n,at as r,au as s,ak as a,aq as p,ar as m}from"./app-DpiNAgkx.js";const g={},u={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function h(i,e){const o=p("VPCard");return m(),c("div",null,[t("h1",u,[t("a",d,[t("span",null,f(i.$frontmatter.title)+" 관련",1)])]),n(o,r(s({title:"Strings - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/strings/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),n(o,r(s({title:"How to convert a string to a safe format for URL slugs and filenames | Strings - free Swift example code",desc:"How to convert a string to a safe format for URL slugs and filenames",link:"https://hackingwithswift.com/example-code/strings/how-to-convert-a-string-to-a-safe-format-for-url-slugs-and-filenames",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),a(" TODO: 작성 "),a(` 
Swift strings are extraordinarily complex beasts, allowing you to mix in characters from any language - including emoji - freely. While this is really important to display text, it can also cause havoc while trying to create URLs and filenames, so if you need to refer to a string in those places you should first convert it to a *slug*.

If you look at a URL like <a href="https://www.hackingwithswift.com/whats-new-in-ios-11">https://www.hackingwithswift.com/whats-new-in-ios-11</a>, the *slug* is the last part - “whats-new-in-ios-11”. The conversion process stripped out punctuation (the apostrophe in “What’s”, lowercased it all, removed any non-Latin characters, then used dashed for word separators rather than spaces.

This takes a little more work to do than you might think, particularly because of the way you need to convert non-Latin and accented characters. For example, “ä” needs to be converted to “a”, and languages such as German convert “ß” into “ss” when they are rendered as Latin characters.

If you want to get the best conversion possible, you need to use Foundation’s \`StringTransform\` type then call \`applyingTransform()\` on your string. You can then split by any characters that can’t be used in slugs, and re-join on “-” to get your finished URL.

Rather than try to write all that yourself, here’s an easy extension you can drop in:

\`\`\`swift
extension String {
    private static let slugSafeCharacters = CharacterSet(charactersIn: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-")

    public func convertedToSlug() -> String? {
        if let latin = self.applyingTransform(StringTransform("Any-Latin; Latin-ASCII; Lower;"), reverse: false) {
            let urlComponents = latin.components(separatedBy: String.slugSafeCharacters.inverted)
            let result = urlComponents.filter { $0 != "" }.joined(separator: "-")

            if result.count > 0 {
                return result
            }
        }

        return nil
    }
}
\`\`\`

If you use Swift’s package manager, you can find that wrapped up in a cross-platform library in my SwiftSlug project. It’s available on GitHub at <a href="http://github.com/twostraws/SwiftSlug">http://github.com/twostraws/SwiftSlug</a>.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),a(`
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/example-code/uikit/how-to-localize-your-ios-app">How to localize your iOS app</a>
`)],-1))])}const v=l(g,[["render",h],["__file","how-to-convert-a-string-to-a-safe-format-for-url-slugs-and-filenames.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/strings/how-to-convert-a-string-to-a-safe-format-for-url-slugs-and-filenames.html","title":"How to convert a string to a safe format for URL slugs and filenames","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to convert a string to a safe format for URL slugs and filenames","description":"Article(s) > How to convert a string to a safe format for URL slugs and filenames","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to convert a string to a safe format for URL slugs and filenames"},{"property":"og:description","content":"How to convert a string to a safe format for URL slugs and filenames"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/strings/how-to-convert-a-string-to-a-safe-format-for-url-slugs-and-filenames.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/strings/how-to-convert-a-string-to-a-safe-format-for-url-slugs-and-filenames.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to convert a string to a safe format for URL slugs and filenames"}],["meta",{"property":"og:description","content":"Article(s) > How to convert a string to a safe format for URL slugs and filenames"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to convert a string to a safe format for URL slugs and filenames\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":2.06,"words":619},"filePathRelative":"hackingwithswift.com/example-code/strings/how-to-convert-a-string-to-a-safe-format-for-url-slugs-and-filenames.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{v as comp,k as data};
