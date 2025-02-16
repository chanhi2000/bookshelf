import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as p,am as t,as as c,ao as i,at as n,au as r,ak as o,aq as h,ar as m}from"./app-BYoUe6Ce.js";const w={},f={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function g(s,e){const a=h("VPCard");return m(),p("div",null,[t("h1",f,[t("a",d,[t("span",null,c(s.$frontmatter.title)+" 관련",1)])]),i(a,n(r({title:"Games - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/games/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),i(a,n(r({title:"How to make a sprite follow a path | Games - free Swift example code",desc:"How to make a sprite follow a path",link:"https://hackingwithswift.com/example-code/games/how-to-make-a-sprite-follow-a-path",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 7.0")],-1)),o(" TODO: 작성 "),o(` 
SpriteKit makes it easy for a node to follow a path we specify, and you can use it to make rockets take off, enemies to zig zag around a maze, and more.

First, create a \`UIBezierPath\` specifying the shape of your path: 

\`\`\`swift
let path = UIBezierPath()
path.move(to: CGPoint(x: 0, y: 0))
path.addLine(to: CGPoint(x: 0, y: 1000))
\`\`\`

That will move directly up.

Next, turn that into an \`SKAction\` using \`SKAction.follow()\`. You can specify whether this path is an *offset* or contains absolute coordinates – we used X:0 Y:0 above, so if we request offset movement that will be equivalent to the node’s starting position.

The \`follow()\` method also accepts parameters for speed (how fast the movement should happen), and whether the node should orient itself to the path. The orientation option is particularly neat: your node will turn itself so that it’s always facing towards the path.

Try this code to make a node follow a path with path orientation enabled:

\`\`\`swift
let move = SKAction.follow(path.cgPath, asOffset: true, orientToPath: true, speed: 200)
node.run(move)
\`\`\`

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/example-code/games/how-to-warp-a-sprite-using-skwarpgeometrygrid">How to warp a sprite using SKWarpGeometryGrid 
/example-code/games/how-to-make-one-sprite-draw-in-front-of-another-using-zposition">How to make one sprite draw in front of another using zPosition 
/example-code/games/how-to-change-a-sprites-texture-using-sktexture">How to change a sprite’s texture using SKTexture 
/example-code/games/how-to-crop-a-sprite-using-skcropnode">How to crop a sprite using SKCropNode 
/quick-start/swiftui/how-to-draw-a-custom-path">How to draw a custom path</a>
`)],-1))])}const y=l(w,[["render",g],["__file","how-to-make-a-sprite-follow-a-path.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/example-code/games/how-to-make-a-sprite-follow-a-path.html","title":"How to make a sprite follow a path","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make a sprite follow a path","description":"Article(s) > How to make a sprite follow a path","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make a sprite follow a path"},{"property":"og:description","content":"How to make a sprite follow a path"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/games/how-to-make-a-sprite-follow-a-path.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/games/how-to-make-a-sprite-follow-a-path.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make a sprite follow a path"}],["meta",{"property":"og:description","content":"Article(s) > How to make a sprite follow a path"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make a sprite follow a path\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.49,"words":446},"filePathRelative":"hackingwithswift.com/example-code/games/how-to-make-a-sprite-follow-a-path.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,x as data};
