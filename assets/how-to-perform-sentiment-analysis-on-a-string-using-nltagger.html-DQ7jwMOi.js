import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,b as e,t as g,e as a,n as o,g as i,a as t,r as c,o as m}from"./app-TWLwS86W.js";const h={},p={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"},f=e("nav",{class:"table-of-contents"},[e("ul")],-1),d=e("hr",null,null,-1),w=e("blockquote",null,[e("p",null,"Available from iOS 13.0")],-1),y=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/naturallanguage/how-to-lemmatize-text-using-nltagger">How to lemmatize text using NLTagger 
/example-code/system/how-to-run-code-after-a-delay-using-asyncafter-and-perform">How to run code after a delay using asyncAfter() and perform() 
/example-code/system/how-to-cancel-a-delayed-perform-call">How to cancel a delayed perform() call 
/example-code/uikit/how-to-perform-a-segue-programmatically-using-performsegue">How to perform a segue programmatically using performSegue() 
/quick-start/swiftui/how-to-create-multi-column-lists-using-table">How to create multi-column lists using Table</a>
`)],-1);function b(r,k){const n=c("VPCard");return m(),l("div",null,[e("h1",p,[e("a",u,[e("span",null,g(r.$frontmatter.title)+" 관련",1)])]),a(n,o(i({title:"NaturalLanguage - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/naturallanguage/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,d,a(n,o(i({title:"How to perform sentiment analysis on a string using NLTagger | NaturalLanguage - free Swift example code",desc:"How to perform sentiment analysis on a string using NLTagger",link:"https://hackingwithswift.com/example-code/naturallanguage/how-to-perform-sentiment-analysis-on-a-string-using-nltagger",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,t(" TODO: 작성 "),t(` 
Sentiment analysis uses machine learning to tell us whether a piece of text is considered positive or negative, and it’s baked right in to iOS with the NaturalLanguage framework.

To perform sentiment analysis takes a handful of lines of code: we create an \`NLTagger\` that creates a sentiment score, assign some text for the tagger to analyze, read the sentiment value, then convert it to a \`Double\` so it can be used.

Let’s look at the code first, then I’ll break down what it means:

\`\`\`swift
// set up our input
let input = "Hacking with Swift is awesome"

// feed it into the NaturalLanguage framework
let tagger = NLTagger(tagSchemes: [.sentimentScore])
tagger.string = input

// ask for the results
let (sentiment, _) = tagger.tag(at: input.startIndex, unit: .paragraph, scheme: .sentimentScore)

// read the sentiment back and print it
let score = Double(sentiment?.rawValue ?? "0") ?? 0
print(score)
\`\`\`

Now let’s break that down, starting with the \`tagger.tag()\` call that has three options and two return values.

The options are:

1. Where to start scanning; in the code above we go from the start of our string.
<li>How *much* to scan; in the code above we scan the entire paragraph.
<li>Which specific tag scheme we want to read; we only have one, which is the sentiment score.

What we get *back* is the sentiment score as an \`NLTag\`, plus the range where it was found. We don’t care about the range, so we’ll ignore it.

The other value, that \`sentiment\` constant, is an \`NLTag?\` with a raw value of a \`String\`. If everything went to plan that string will contain a \`Double\` in the range of -1 (very negative) to +1 (very positive), so to read that value we need to do some careful typecasting: 

\`\`\`swift
let score = Double(sentiment?.rawValue ?? "0") ?? 0
print(score)
\`\`\`

That means “attempt to read the sentiment’s raw value, but use the string ‘0’ if that fails, then attempt to convert that to a \`Double\`, but use the value 0 if *that* fails.”

The end result will be a \`score\` value that is somewhere between -1.0 (very negative) and 1.0 (very positive), or 0.0 if the text is neutral or nothing could be read.

**Note:** In this example I’ve used a short piece of text, but obviously the framework works best with *lots* of text – it’s hard to come to a conclusion given only a few words, and you’ll often get inaccurate readings doing so.

`),y])}const _=s(h,[["render",b],["__file","how-to-perform-sentiment-analysis-on-a-string-using-nltagger.html.vue"]]),T=JSON.parse('{"path":"/hackingwithswift.com/example-code/naturallanguage/how-to-perform-sentiment-analysis-on-a-string-using-nltagger.html","title":"How to perform sentiment analysis on a string using NLTagger","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to perform sentiment analysis on a string using NLTagger","description":"Article(s) > How to perform sentiment analysis on a string using NLTagger","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to perform sentiment analysis on a string using NLTagger"},{"property":"og:description","content":"How to perform sentiment analysis on a string using NLTagger"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/naturallanguage/how-to-perform-sentiment-analysis-on-a-string-using-nltagger.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/naturallanguage/how-to-perform-sentiment-analysis-on-a-string-using-nltagger.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to perform sentiment analysis on a string using NLTagger"}],["meta",{"property":"og:description","content":"Article(s) > How to perform sentiment analysis on a string using NLTagger"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-10-05T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to perform sentiment analysis on a string using NLTagger\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-05T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-10-05T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.33,"words":698},"filePathRelative":"hackingwithswift.com/example-code/naturallanguage/how-to-perform-sentiment-analysis-on-a-string-using-nltagger.md","localizedDate":"2019년 10월 5일","excerpt":"\\n"}');export{_ as comp,T as data};
