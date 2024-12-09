import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as t,t as l,e as a,n,g as i,a as e,r as h,o as p}from"./app-ubLChIzZ.js";const g={},u={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"},m=t("nav",{class:"table-of-contents"},[t("ul")],-1),w=t("hr",null,null,-1),f=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/cryptokit/how-to-calculate-the-sha-hash-of-a-string-or-data-instance">How to calculate the SHA hash of a String or Data instance 
/example-code/core-graphics/how-to-calculate-the-point-where-two-lines-intersect">How to calculate the point where two lines intersect 
/example-code/core-graphics/how-to-calculate-the-distance-between-two-cgpoints">How to calculate the distance between two CGPoints 
/example-code/core-graphics/how-to-calculate-the-manhattan-distance-between-two-cgpoints">How to calculate the Manhattan distance between two CGPoints 
/example-code/language/how-to-calculate-division-remainder-using-modulo">How to calculate division remainder using modulo</a>
`)],-1);function y(r,O){const o=h("VPCard");return p(),c("div",null,[t("h1",u,[t("a",d,[t("span",null,l(r.$frontmatter.title)+" 관련",1)])]),a(o,n(i({title:"Strings - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/strings/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),m,w,a(o,n(i({title:"How to calculate the ROT13 of a string | Strings - free Swift example code",desc:"How to calculate the ROT13 of a string",link:"https://hackingwithswift.com/example-code/strings/how-to-calculate-the-rot13-of-a-string",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e(" TODO: 작성 "),e(` 
ROT13 is a simple algorithm that shifts letters in a string forward 13 places. It’s obviously not suitable for any serious encryption, but it’s very useful for hiding text so its meaning is not obvious – posting spoilers on a forum, for example, is best done using ROT13 to avoid someone getting annoyed.

It’s not hard to write a \`rot13()\` function, but it *is* a little harder to wrap it up neatly so you avoid global variables while still making it easy to use. Because you can’t add stored variables to an extension on \`String\`, the cleanest thing to do is create a new \`ROT13\` type that can store the transformation from regular letters to ROT13, then run the calculation.

In code, it looks like this:

\`\`\`swift
struct ROT13 {
    // create a dictionary that will store our character mapping
    private static var key = [Character: Character]()

    // create arrays of all uppercase and lowercase letters
    private static let uppercase = Array("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    private static let lowercase = Array("abcdefghijklmnopqrstuvwxyz")

    static func string(_ string: String) -> String {
        // if this is the first time the method is being called, calculate the ROT13 key dictionary
        if ROT13.key.isEmpty {
            for i in 0 ..< 26 {
                ROT13.key[ROT13.uppercase[i]] = ROT13.uppercase[(i + 13) % 26]
                ROT13.key[ROT13.lowercase[i]] = ROT13.lowercase[(i + 13) % 26]
            }
        }

        // now return the transformed string
        let transformed = string.map { ROT13.key[$0] ?? $0 }
        return String(transformed)
    }
}
\`\`\`

I’ve used private properties there because there’s no reason these implementation details should leak out, and it’s all static because there’s no need to create new \`ROT13\` instances every time we need to run the conversion.

With that in place we can write an extension on \`String\` to calculate the ROT13 using our struct:

\`\`\`swift
extension String {
    func rot13() -> String {
        return ROT13.string(self)
    }
}
\`\`\`

That extension can now be called on a regular string, so users don’t need to care about how we implemented ROT13:

\`\`\`swift
print("Hello, world!".rot13())
\`\`\`

`),f])}const b=s(g,[["render",y],["__file","how-to-calculate-the-rot13-of-a-string.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/strings/how-to-calculate-the-rot13-of-a-string.html","title":"How to calculate the ROT13 of a string","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to calculate the ROT13 of a string","description":"Article(s) > How to calculate the ROT13 of a string","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to calculate the ROT13 of a string"},{"property":"og:description","content":"How to calculate the ROT13 of a string"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/strings/how-to-calculate-the-rot13-of-a-string.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/strings/how-to-calculate-the-rot13-of-a-string.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to calculate the ROT13 of a string"}],["meta",{"property":"og:description","content":"Article(s) > How to calculate the ROT13 of a string"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to calculate the ROT13 of a string\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.98,"words":595},"filePathRelative":"hackingwithswift.com/example-code/strings/how-to-calculate-the-rot13-of-a-string.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{b as comp,k as data};
