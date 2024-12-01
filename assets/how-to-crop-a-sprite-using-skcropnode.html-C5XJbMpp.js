import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as t,t as p,e as i,n,g as a,a as e,r as l,o as d}from"./app-DLPYIRXq.js";const h={},m={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},u=t("nav",{class:"table-of-contents"},[t("ul")],-1),w=t("hr",null,null,-1),f=t("blockquote",null,[t("p",null,"Available from iOS 7.1")],-1),y=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/games/how-to-warp-a-sprite-using-skwarpgeometrygrid">How to warp a sprite using SKWarpGeometryGrid 
/example-code/games/how-to-change-a-sprites-texture-using-sktexture">How to change a sprite’s texture using SKTexture 
/example-code/games/how-to-make-one-sprite-draw-in-front-of-another-using-zposition">How to make one sprite draw in front of another using zPosition 
/example-code/games/how-to-make-a-sprite-follow-a-path">How to make a sprite follow a path 
/quick-start/swiftui/how-to-create-multi-column-lists-using-table">How to create multi-column lists using Table</a>
`)],-1);function k(r,S){const o=l("VPCard");return d(),c("div",null,[t("h1",m,[t("a",g,[t("span",null,p(r.$frontmatter.title)+" 관련",1)])]),i(o,n(a({title:"Games - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/games/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),u,w,i(o,n(a({title:"How to crop a sprite using SKCropNode | Games - free Swift example code",desc:"How to crop a sprite using SKCropNode",link:"https://hackingwithswift.com/example-code/games/how-to-crop-a-sprite-using-skcropnode",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,e(" TODO: 작성 "),e(` 
SpriteKit has a dedicated node type for handling cropping, and you can add things to it, position it where you want, then add it to your scene just like any other node.

However, its role is to crop the nodes it contains: when you assign a node to its \`maskNode\` property, SpriteKit looks at the colors of the mask and uses that to crop all the child nodes of the crop node. So, you might create an \`SKCropNode\` with five child nodes, then give it a circular mask node so that parts of the children are invisible. Everything that has a color in the mask won’t be cropped, and everything that is invisible will be.

Let’s look at some code. First you create and position your crop node:

\`\`\`swift
let cropNode = SKCropNode()
cropNode.position = CGPoint(x: 50, y: 50)
\`\`\`

Next you set its \`maskNode\` property to any SpriteKit node. Using a sprite node is easy enough:

\`\`\`swift
cropNode.maskNode = SKSpriteNode(imageNamed: "cropMask")
\`\`\`

Third you create a child node, position it inside the crop node, then add it to the crop node:

\`\`\`swift
childNode = SKSpriteNode(imageNamed: "child")
childNode.position = CGPoint(x: 0, y: -90)
childNode.name = "character"
cropNode.addChild(childNode)
\`\`\`

Finally add the crop node to your main scene:

\`\`\`swift
addChild(cropNode)
\`\`\`

`),y])}const x=s(h,[["render",k],["__file","how-to-crop-a-sprite-using-skcropnode.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/games/how-to-crop-a-sprite-using-skcropnode.html","title":"How to crop a sprite using SKCropNode","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to crop a sprite using SKCropNode","description":"Article(s) > How to crop a sprite using SKCropNode","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.1","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to crop a sprite using SKCropNode"},{"property":"og:description","content":"How to crop a sprite using SKCropNode"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/games/how-to-crop-a-sprite-using-skcropnode.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/games/how-to-crop-a-sprite-using-skcropnode.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to crop a sprite using SKCropNode"}],["meta",{"property":"og:description","content":"Article(s) > How to crop a sprite using SKCropNode"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.1"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to crop a sprite using SKCropNode\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.57,"words":471},"filePathRelative":"hackingwithswift.com/example-code/games/how-to-crop-a-sprite-using-skcropnode.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,b as data};
