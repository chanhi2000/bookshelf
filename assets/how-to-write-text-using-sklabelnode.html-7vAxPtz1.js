import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as t,as as p,ao as i,at as n,au as r,ak as o,aq as d,ar as m}from"./app-CpYYKbnj.js";const g={},h={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"};function u(s,e){const a=d("VPCard");return m(),c("div",null,[t("h1",h,[t("a",w,[t("span",null,p(s.$frontmatter.title)+" 관련",1)])]),i(a,n(r({title:"Games - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/games/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),i(a,n(r({title:"How to write text using SKLabelNode | Games - free Swift example code",desc:"How to write text using SKLabelNode",link:"https://hackingwithswift.com/example-code/games/how-to-write-text-using-sklabelnode",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 7.0")],-1)),o(" TODO: 작성 "),o(` 
The \`SKLabelNode\` class is a fast and efficient way to draw text in SpriteKit games. To use it, first create a property in your game scene:

\`\`\`swift
var scoreLabel: SKLabelNode!
\`\`\`

Now create the label node by telling it want font use, its alignment, and also an initial text value if you want one. This code creates a label node using the Chalkduster font, places it in the top-right corner of the screen, and gives it the initial text "Score: 0":

\`\`\`swift
scoreLabel = SKLabelNode(fontNamed: "Chalkduster")
scoreLabel.text = "Score: 0"
scoreLabel.horizontalAlignmentMode = .right
scoreLabel.position = CGPoint(x: 980, y: 700)
addChild(scoreLabel)
\`\`\`

With that score label in place, you can now create a \`score\` integer property to store the actual number of a player's score, then use a property observer to modify the label whenever the score changes:

\`\`\`swift
var score: Int = 0 {
    didSet {
        scoreLabel.text = "Score: \\(score)"
    }
}
\`\`\`

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/example-code/strings/how-to-save-a-string-to-a-file-on-disk-with-writeto">How to save a string to a file on disk with write(to:) 
/example-code/testing/how-to-write-performance-tests-using-measure">How to write performance tests using measure() 
/example-code/language/what-is-copy-on-write">What is copy on write? 
/example-code/language/how-to-write-a-closure-that-returns-a-value">How to write a closure that returns a value</a>
`)],-1))])}const x=l(g,[["render",u],["__file","how-to-write-text-using-sklabelnode.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/games/how-to-write-text-using-sklabelnode.html","title":"How to write text using SKLabelNode","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to write text using SKLabelNode","description":"Article(s) > How to write text using SKLabelNode","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to write text using SKLabelNode"},{"property":"og:description","content":"How to write text using SKLabelNode"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/games/how-to-write-text-using-sklabelnode.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/games/how-to-write-text-using-sklabelnode.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to write text using SKLabelNode"}],["meta",{"property":"og:description","content":"Article(s) > How to write text using SKLabelNode"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to write text using SKLabelNode\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.29,"words":388},"filePathRelative":"hackingwithswift.com/example-code/games/how-to-write-text-using-sklabelnode.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,k as data};