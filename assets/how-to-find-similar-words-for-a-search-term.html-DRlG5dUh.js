import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,b as e,t as c,e as a,n as r,g as i,a as t,r as d,o as h}from"./app-DLPYIRXq.js";const m={},g={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"},f=e("nav",{class:"table-of-contents"},[e("ul")],-1),w=e("hr",null,null,-1),p=e("blockquote",null,[e("p",null,"Available from iOS 13.0")],-1),b=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/quick-start/swiftui/how-to-add-search-tokens-to-a-search-field">How to add search tokens to a search field 
/example-code/uikit/how-to-use-uisearchcontroller-to-let-users-enter-search-words">How to use UISearchController to let users enter search words 
/example-code/system/how-to-check-whether-one-date-is-similar-to-another">How to check whether one date is similar to another 
/example-code/libraries/how-to-search-your-apps-spotlight-index">How to search your app’s Spotlight index 
/quick-start/swiftui/how-to-add-a-search-bar-to-filter-your-data">How to add a search bar to filter your data</a>
`)],-1);function y(n,k){const o=d("VPCard");return h(),l("div",null,[e("h1",g,[e("a",u,[e("span",null,c(n.$frontmatter.title)+" 관련",1)])]),a(o,r(i({title:"NaturalLanguage - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/naturallanguage/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,w,a(o,r(i({title:"How to find similar words for a search term | NaturalLanguage - free Swift example code",desc:"How to find similar words for a search term",link:"https://hackingwithswift.com/example-code/naturallanguage/how-to-find-similar-words-for-a-search-term",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),p,t(" TODO: 작성 "),t(` 
iOS gives us the ability to search for similar words for a term by using *word embeddings*, which are maps of strings created using machine learning that describe how similar various words are in terms of their meaning. This kind of thing is useful when handling user searches: you might have tagged a photo with “hat”, but your user searched for “sombrero” – word embeddings let us find similar words, and we can then use those variations for data searches.

To get started, first add \`import NaturalLanguage\`, then create a word embedding for the language you want to target:

\`\`\`swift
let embedding = NLEmbedding.wordEmbedding(for: .english)
\`\`\`

That returns an optional \`NLEmbedding\`, because the language you requested might not be supported. For example, right now \`.english\`, \`.french\`, and some others work, but \`.german\` does not.

Once you have your embedding, you can request all similar words for a given string by calling its \`neighbors(for:maximumCount:)\` method, like this:

\`\`\`swift
let similarWords = embedding?.neighbors(for: "rain", maximumCount: 10)
\`\`\`

That will set \`similarWords\` to be an array of tuples, where each tuple contains two values: a word that is similar, and a distance from your original word. This array is sorted by distance, so closest words come first.

We asked for “rain”, so we’ll get back “downpour” with a distance of 0.614, “rainstorm” with a distance of 0.661, “torrential” with a distance of 0.701, and more – drenching, rainfall, flooding, storm, flood, monsoon, and more.

Here’s a full example so you can try it easily:

\`\`\`swift
if let embedding = NLEmbedding.wordEmbedding(for: .english) {
    let similarWords = embedding.neighbors(for: "rain", maximumCount: 10)

    for word in similarWords {
        print("\\(word.0) has a distance of \\(word.1)")
    }
}
\`\`\`

Before you dive into word embeddings, I want to add an important note of caution: the concept of *distance* isn’t just “words that mean the same thing.” 

Instead, word embeddings also include words that are used in *similar contexts*: if you search for “cat” you’ll get back “feline”, “kitten”, “tabby”, and “kitty”, but you’ll also get back “meow” because that’s the sound cat makes. You’ll *also* get back “pet”, because cats are pets, and even more you’ll get back “dog”, “canine”, and “puppy” because they are also pets.

Apple uses these word embeddings as search suggestions, giving users the chance to change their search. For example, if you search Photos for “meow” you’ll see a suggestion saying “meow -> Feline” as a suggested search.

`),b])}const v=s(m,[["render",y],["__file","how-to-find-similar-words-for-a-search-term.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/naturallanguage/how-to-find-similar-words-for-a-search-term.html","title":"How to find similar words for a search term","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to find similar words for a search term","description":"Article(s) > How to find similar words for a search term","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to find similar words for a search term"},{"property":"og:description","content":"How to find similar words for a search term"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/naturallanguage/how-to-find-similar-words-for-a-search-term.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/naturallanguage/how-to-find-similar-words-for-a-search-term.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to find similar words for a search term"}],["meta",{"property":"og:description","content":"Article(s) > How to find similar words for a search term"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-10-12T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to find similar words for a search term\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-12T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-10-12T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.31,"words":692},"filePathRelative":"hackingwithswift.com/example-code/naturallanguage/how-to-find-similar-words-for-a-search-term.md","localizedDate":"2019년 10월 12일","excerpt":"\\n"}');export{v as comp,S as data};
