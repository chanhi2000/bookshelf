import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as e,av as m,au as i,aw as n,ax as r,b as o,r as u,o as w}from"./app-D4PYVeBp.js";const h={},d={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,t){const a=u("VPCard");return w(),c("div",null,[e("h1",d,[e("a",p,[e("span",null,m(s.$frontmatter.title)+" 관련",1)])]),i(a,n(r({title:"CALayer - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/calayer/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),i(a,n(r({title:"How to make a UIView fade out | CALayer - free Swift example code",desc:"How to make a UIView fade out",link:"https://hackingwithswift.com/example-code/calayer/how-to-make-a-uiview-fade-out",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 3.1")],-1)),o(" TODO: 작성 "),o(` 
All views naturally fill the space assigned to them, but using \`CAGradientLayer\` as a mask view you can force a view to fade out at its edges.

To try it out, first create a test view with some obvious content like a background color:

\`\`\`swift
let maskedView = UIView(frame: CGRect(x: 50, y: 50, width: 256, height: 256))
maskedView.backgroundColor = .blue
\`\`\`

The next step is to create a \`CAGradientLayer\` at the same size as the view you want to mask:

\`\`\`swift
let gradientMaskLayer = CAGradientLayer()
gradientMaskLayer.frame = maskedView.bounds
\`\`\`

Now for the important part: to make the gradient work you need to use a clear color where nothing should be shown (where your view should be invisible) and white where the view should shine through fully.

By default \`GAGradientLayer\` spaces out its colors so they appear at equal distances, but we’re going to tell it to put the first color at 0, the second color at 0.1 (10% of the way in), the third color at 0.9 (90% of the way in), then the last color at 1 (the end). This 80% of our view is shown with full opacity:

\`\`\`swift
gradientMaskLayer.colors = [UIColor.clear.cgColor, UIColor.white.cgColor, UIColor.white.cgColor, UIColor.clear.cgColor]
gradientMaskLayer.locations = [0, 0.1, 0.9, 1]
\`\`\`

Finally, you just need to add that mask to your view, then add the whole thing to a parent view so it can be shown:

\`\`\`swift
maskedView.layer.mask = gradientMaskLayer
view.addSubview(maskedView)
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/uikit/how-to-mask-one-uiview-using-another-uiview">How to mask one UIView using another UIView 
/quick-start/swiftui/how-to-get-bordered-buttons-that-stand-out">How to get bordered buttons that stand out 
/example-code/language/how-to-break-out-of-multiple-loop-levels-using-labeled-statements">How to break out of multiple loop levels using labeled statements 
/example-code/system/how-to-spell-out-numbers-using-numberformatters-spellout-style">How to spell out numbers using NumberFormatter's spellOut style 
/example-code/uikit/how-to-make-a-uiview-fill-the-screen-using-auto-layout-anchors">How to make a UIView fill the screen using Auto Layout anchors</a>
`)],-1))])}const y=l(h,[["render",f],["__file","how-to-make-a-uiview-fade-out.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/calayer/how-to-make-a-uiview-fade-out.html","title":"How to make a UIView fade out","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make a UIView fade out","description":"Article(s) > How to make a UIView fade out","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-3.1","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make a UIView fade out"},{"property":"og:description","content":"How to make a UIView fade out"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-make-a-uiview-fade-out.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-make-a-uiview-fade-out.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make a UIView fade out"}],["meta",{"property":"og:description","content":"Article(s) > How to make a UIView fade out"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-3.1"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make a UIView fade out\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.67,"words":502},"filePathRelative":"hackingwithswift.com/example-code/calayer/how-to-make-a-uiview-fade-out.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,b as data};
