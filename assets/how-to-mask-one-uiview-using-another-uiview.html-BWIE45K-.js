import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as h,f as e,av as l,au as a,aw as n,ax as r,b as o,r as w,o as m}from"./app-D4PYVeBp.js";const u={},p={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function d(s,t){const i=w("VPCard");return m(),h("div",null,[e("h1",p,[e("a",g,[e("span",null,l(s.$frontmatter.title)+" 관련",1)])]),a(i,n(r({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),a(i,n(r({title:"How to mask one UIView using another UIView | UIKit - free Swift example code",desc:"How to mask one UIView using another UIView",link:"https://hackingwithswift.com/example-code/uikit/how-to-mask-one-uiview-using-another-uiview",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),o(" TODO: 작성 "),o(`
All views have a \`mask\` property that allows you to cut out parts depending on what you need. This mask can be any other kind of \`UIView\`, so you could for example use a label to cut out an image view.

To try it out, first create a view with some obvious content such as a background color:

\`\`\`swift
let redView = UIView(frame: CGRect(x: 50, y: 50, width: 128, height: 128))
redView.backgroundColor = .red
view.addSubview(redView)
\`\`\`

Now create your mask as a separate \`UIView\`. Although it won’t be directly visible you should give this either a background color or some other content because the alpha channel of this mask determines what shows through in the original view.

To demonstrate this, here’s a mask view that’s the same size as the original view, but it’s offset 64 pixels to the right and has a 64-point corner radius. When used as a mask for the previous view it will have the effect of turning it into a semi-circle:

\`\`\`swift
let maskView = UIView(frame: CGRect(x: 64, y: 0, width: 128, height: 128))
maskView.backgroundColor = .blue
maskView.layer.cornerRadius = 64
redView.mask = maskView
\`\`\`

The blue background color won’t be visible – that’s just there to make sure all pixels in the mask are opaque.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/how-to-mask-one-view-with-another">How to mask one view with another 
/example-code/uikit/how-to-convert-a-cgpoint-in-one-uiview-to-another-view-using-convert">How to convert a CGPoint in one UIView to another view using convert() 
/quick-start/swiftui/how-to-force-one-gesture-to-recognize-before-another-using-highprioritygesture">How to force one gesture to recognize before another using highPriorityGesture() 
/example-code/games/how-to-make-one-sprite-draw-in-front-of-another-using-zposition">How to make one sprite draw in front of another using zPosition 
/example-code/language/how-to-append-one-array-to-another-array">How to append one array to another array</a>
`)],-1))])}const v=c(u,[["render",d],["__file","how-to-mask-one-uiview-using-another-uiview.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-mask-one-uiview-using-another-uiview.html","title":"How to mask one UIView using another UIView","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to mask one UIView using another UIView","description":"Article(s) > How to mask one UIView using another UIView","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to mask one UIView using another UIView"},{"property":"og:description","content":"How to mask one UIView using another UIView"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-mask-one-uiview-using-another-uiview.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-mask-one-uiview-using-another-uiview.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to mask one UIView using another UIView"}],["meta",{"property":"og:description","content":"Article(s) > How to mask one UIView using another UIView"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to mask one UIView using another UIView\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.67,"words":501},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-mask-one-uiview-using-another-uiview.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,y as data};
