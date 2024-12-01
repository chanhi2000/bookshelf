import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,b as t,t as g,e as a,n as i,g as o,a as e,r as c,o as m}from"./app-DLPYIRXq.js";const u={},h={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"},d=t("nav",{class:"table-of-contents"},[t("ul")],-1),w=t("hr",null,null,-1),f=t("blockquote",null,[t("p",null,"Available from iOS 12.0")],-1),x=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/naturallanguage/how-to-perform-sentiment-analysis-on-a-string-using-nltagger">How to perform sentiment analysis on a string using NLTagger 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/how-to-add-advanced-text-styling-using-attributedstring">How to add advanced text styling using AttributedString 
/quick-start/swiftui/how-to-create-custom-text-effects-and-animations">How to create custom text effects and animations 
/quick-start/swiftui/building-a-menu-using-list">Building a menu using List</a>
`)],-1);function y(r,k){const n=c("VPCard");return m(),l("div",null,[t("h1",h,[t("a",p,[t("span",null,g(r.$frontmatter.title)+" 관련",1)])]),a(n,i(o({title:"NaturalLanguage - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/naturallanguage/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),d,w,a(n,i(o({title:"How to lemmatize text using NLTagger | NaturalLanguage - free Swift example code",desc:"How to lemmatize text using NLTagger",link:"https://hackingwithswift.com/example-code/naturallanguage/how-to-lemmatize-text-using-nltagger",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,e(" TODO: 작성 "),e(` 
Apple’s NaturalLanguage framework is able to lemmatize text for us, which is the process of converting words to the forms you would find in a dictionary – making plural nouns singular, finding the root forms of conjugated verbs, and so on, while also taking into account the context in which they are used.

To do this, first create an instance of \`NLTagger\` enabling its \`.lemma\` scheme, then call \`enumerateTags()\` on it to find all the root word forms. This will pass you the tag (the root word) if it exists, plus the range of the original text in the string.

So, you could lemmatize a whole sentence like this:

\`\`\`swift
import NaturalLanguage

let text = "This is text with plurals such as geese, people, and millennia."
let tagger = NLTagger(tagSchemes: [.lemma])
tagger.string = text

tagger.enumerateTags(in: text.startIndex..<text.endIndex, unit: .word, scheme: .lemma) { tag, range in
    let stemForm = tag?.rawValue ?? String(text[range])
    print(stemForm, terminator: "")
    return true
}
\`\`\`

Text lemmatized in this way will be lowercase, preserving any punctuation. So, that snippet will output “this be text with plural such as goose, person, and millennium.”

If you intend to lemmatize text frequently, consider making it an extension on \`String\` like this:

\`\`\`swift
extension String {
    func lemmatized() -> String {
        let tagger = NLTagger(tagSchemes: [.lemma])
        tagger.string = self

        var result = [String]()

        tagger.enumerateTags(in: self.startIndex..<self.endIndex, unit: .word, scheme: .lemma) { tag, tokenRange in
            let stemForm = tag?.rawValue ?? String(self[tokenRange])
            result.append(stemForm)
            return true
        }

        return result.joined()
    }
}
\`\`\`

With that in place you can now lemmatize text easily:

\`\`\`swift
let text = "This is text with plurals such as geese, people, and millennia."
print(text.lemmatized())
\`\`\`

`),x])}const b=s(u,[["render",y],["__file","how-to-lemmatize-text-using-nltagger.html.vue"]]),z=JSON.parse('{"path":"/hackingwithswift.com/example-code/naturallanguage/how-to-lemmatize-text-using-nltagger.html","title":"How to lemmatize text using NLTagger","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to lemmatize text using NLTagger","description":"Article(s) > How to lemmatize text using NLTagger","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-12.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to lemmatize text using NLTagger"},{"property":"og:description","content":"How to lemmatize text using NLTagger"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/naturallanguage/how-to-lemmatize-text-using-nltagger.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/naturallanguage/how-to-lemmatize-text-using-nltagger.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to lemmatize text using NLTagger"}],["meta",{"property":"og:description","content":"Article(s) > How to lemmatize text using NLTagger"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-12.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2021-06-17T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to lemmatize text using NLTagger\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-06-17T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2021-06-17T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.67,"words":502},"filePathRelative":"hackingwithswift.com/example-code/naturallanguage/how-to-lemmatize-text-using-nltagger.md","localizedDate":"2021년 6월 17일","excerpt":"\\n"}');export{b as comp,z as data};
