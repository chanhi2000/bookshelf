import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,b as e,t as c,e as a,n as i,g as n,a as t,r as h,o as d}from"./app-DLPYIRXq.js";const m={},u={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},p=e("nav",{class:"table-of-contents"},[e("ul")],-1),g=e("hr",null,null,-1),f=e("blockquote",null,[e("p",null,"Available from iOS 3.1")],-1),k=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/uikit/how-to-mask-one-uiview-using-another-uiview">How to mask one UIView using another UIView 
/quick-start/swiftui/how-to-get-bordered-buttons-that-stand-out">How to get bordered buttons that stand out 
/example-code/language/how-to-break-out-of-multiple-loop-levels-using-labeled-statements">How to break out of multiple loop levels using labeled statements 
/example-code/system/how-to-spell-out-numbers-using-numberformatters-spellout-style">How to spell out numbers using NumberFormatter's spellOut style 
/example-code/uikit/how-to-make-a-uiview-fill-the-screen-using-auto-layout-anchors">How to make a UIView fill the screen using Auto Layout anchors</a>
`)],-1);function y(r,b){const o=h("VPCard");return d(),l("div",null,[e("h1",u,[e("a",w,[e("span",null,c(r.$frontmatter.title)+" 관련",1)])]),a(o,i(n({title:"CALayer - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/calayer/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),p,g,a(o,i(n({title:"How to make a UIView fade out | CALayer - free Swift example code",desc:"How to make a UIView fade out",link:"https://hackingwithswift.com/example-code/calayer/how-to-make-a-uiview-fade-out",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,t(" TODO: 작성 "),t(` 
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

`),k])}const V=s(m,[["render",y],["__file","how-to-make-a-uiview-fade-out.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/example-code/calayer/how-to-make-a-uiview-fade-out.html","title":"How to make a UIView fade out","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make a UIView fade out","description":"Article(s) > How to make a UIView fade out","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-3.1","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make a UIView fade out"},{"property":"og:description","content":"How to make a UIView fade out"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-make-a-uiview-fade-out.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-make-a-uiview-fade-out.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make a UIView fade out"}],["meta",{"property":"og:description","content":"Article(s) > How to make a UIView fade out"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-3.1"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make a UIView fade out\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.67,"words":502},"filePathRelative":"hackingwithswift.com/example-code/calayer/how-to-make-a-uiview-fade-out.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{V as comp,x as data};
