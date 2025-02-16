import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as t,as as m,ao as i,at as a,au as s,ak as e,aq as u,ar as p}from"./app-BYoUe6Ce.js";const h={},f={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function d(r,n){const o=u("VPCard");return p(),l("div",null,[t("h1",f,[t("a",g,[t("span",null,m(r.$frontmatter.title)+" 관련",1)])]),i(o,a(s({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[0]||(n[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),n[1]||(n[1]=t("hr",null,null,-1)),i(o,a(s({title:"What is function composition? | Language - free Swift example code",desc:"What is function composition?",link:"https://hackingwithswift.com/example-code/language/what-is-function-composition",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[2]||(n[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),e(" TODO: 작성 "),e(` 
Function composition is the ability to combine small functions together to make bigger functions.

In normal circumstances, you’d give some input to function A and get back output, and do the same for function B. When those two functions as combined together, A’s output becomes B’s input, so you provide input to A and get the results back from B.

To demonstrate this, here’s a function that generates random numbers in a specific range:

\`\`\`swift
func generateRandomNumber(max: Int) -> Int {
    return Int(arc4random_uniform(UInt32(max)))
}
\`\`\`

And here’s a function that spells out any number it’s given:

\`\`\`swift
func spell(number: Int) -> String {
    let formatter = NumberFormatter()
    formatter.numberStyle = .spellOut
    return formatter.string(from: number as NSNumber) ?? ""
}
\`\`\`

We can define a new operator that lets us combine those two together, like this:

\`\`\`swift
precedencegroup CompositionPrecedence {
    associativity: left
}

infix operator >>>: CompositionPrecedence

func >>> <T, U, V>(lhs: @escaping (T) -> U, rhs: @escaping (U) -> V) -> (T) -> V {
    return { rhs(lhs($0)) }
}
\`\`\`

You can learn more about how that works in <a href="/store/pro-swift">Pro Swift</a>.

You can now combine your two smaller functions into bigger ones, like this:

\`\`\`swift
let spellOutRandom = generateRandomNumber >>> spell
\`\`\`

\`spellOutRandom()\` is designed to take the input from the first function (a number) and send back the output from the second function (a string), so we can use it like this:

\`\`\`swift
print(spellOutRandom(100))
\`\`\`

That will output a different spelled number each time it’s run.

`),n[3]||(n[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/quick-start/concurrency/what-is-an-asynchronous-function">What is an asynchronous function? 
/quick-start/concurrency/what-is-a-synchronous-function">What is a synchronous function? 
/quick-start/concurrency/how-to-create-and-call-an-async-function">How to create and call an async function 
/quick-start/concurrency/how-to-make-function-parameters-isolated">How to make function parameters isolated 
/quick-start/concurrency/what-calls-the-first-async-function">What calls the first async function?</a>
`)],-1))])}const b=c(h,[["render",d],["__file","what-is-function-composition.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-is-function-composition.html","title":"What is function composition?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What is function composition?","description":"Article(s) > What is function composition?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What is function composition?"},{"property":"og:description","content":"What is function composition?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-function-composition.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-function-composition.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What is function composition?"}],["meta",{"property":"og:description","content":"Article(s) > What is function composition?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What is function composition?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.51,"words":454},"filePathRelative":"hackingwithswift.com/example-code/language/what-is-function-composition.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,k as data};
