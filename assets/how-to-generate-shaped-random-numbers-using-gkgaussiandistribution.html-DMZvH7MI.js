import{_ as m}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as e,as as l,ao as o,at as i,au as r,ak as a,aq as d,ar as g}from"./app-CpYYKbnj.js";const c={},h={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"};function b(s,t){const n=d("VPCard");return g(),u("div",null,[e("h1",h,[e("a",p,[e("span",null,l(s.$frontmatter.title)+" 관련",1)])]),o(n,i(r({title:"Games - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/games/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),o(n,i(r({title:"How to generate shaped random numbers using GKGaussianDistribution | Games - free Swift example code",desc:"How to generate shaped random numbers using GKGaussianDistribution",link:"https://hackingwithswift.com/example-code/games/how-to-generate-shaped-random-numbers-using-gkgaussiandistribution",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 9.0")],-1)),a(" TODO: 작성 "),a(" \nA shaped random number generator is one that generates each of its possible values but does so in a way that numbers near the middle are more frequent. For example, you might use it generate heights of characters, because most people are around average height while some outliers are much shorter or much taller. For example, if you were generating numbers between 1 and 10, 5 and 6 would be generated significantly more than 1 or 10.\n\nGameplayKit has support for shaped random number generation using `GKGaussianDistribution`. First, add an import for the GameplayKit framework:\n\n```swift\nimport GameplayKit\n```\n\nSecond, create an instance of `GKGaussianDistribution`, telling it the lowest and highest values it can generate:\n\n```swift\nlet distribution = GKGaussianDistribution(lowestValue: 1, highestValue: 8)\n```\n\nFinally, call `nextInt()` on it as needed to generate numbers. You should get find the numbers returned are most commonly 4s and 5s, with quite a few 3s and 6s, not many 2s or 7s, and hardly any 1s or 8s.\n\n"),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),a(`
/example-code/games/how-to-generate-fair-random-numbers-using-gkshuffleddistribution">How to generate fair random numbers using GKShuffledDistribution 
/example-code/system/how-to-generate-a-random-identifier-using-uuid">How to generate a random identifier using UUID 
/example-code/language/how-to-generate-a-random-number">How to generate a random number 
/example-code/games/how-to-generate-a-random-number-with-gkrandomsource">How to generate a random number with GKRandomSource 
/example-code/uikit/how-to-generate-haptic-feedback-with-uifeedbackgenerator">How to generate haptic feedback with UIFeedbackGenerator</a>
`)],-1))])}const k=m(c,[["render",b],["__file","how-to-generate-shaped-random-numbers-using-gkgaussiandistribution.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/example-code/games/how-to-generate-shaped-random-numbers-using-gkgaussiandistribution.html","title":"How to generate shaped random numbers using GKGaussianDistribution","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to generate shaped random numbers using GKGaussianDistribution","description":"Article(s) > How to generate shaped random numbers using GKGaussianDistribution","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-9.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to generate shaped random numbers using GKGaussianDistribution"},{"property":"og:description","content":"How to generate shaped random numbers using GKGaussianDistribution"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/games/how-to-generate-shaped-random-numbers-using-gkgaussiandistribution.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/games/how-to-generate-shaped-random-numbers-using-gkgaussiandistribution.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to generate shaped random numbers using GKGaussianDistribution"}],["meta",{"property":"og:description","content":"Article(s) > How to generate shaped random numbers using GKGaussianDistribution"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-9.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to generate shaped random numbers using GKGaussianDistribution\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.41,"words":422},"filePathRelative":"hackingwithswift.com/example-code/games/how-to-generate-shaped-random-numbers-using-gkgaussiandistribution.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,y as data};