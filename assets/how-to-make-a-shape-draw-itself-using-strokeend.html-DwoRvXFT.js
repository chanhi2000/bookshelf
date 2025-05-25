import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as e,av as d,au as i,aw as n,ax as r,b as a,r as m,o as p}from"./app-CmlMtt14.js";const h={},w={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,t){const o=m("VPCard");return p(),c("div",null,[e("h1",w,[e("a",g,[e("span",null,d(s.$frontmatter.title)+" 관련",1)])]),i(o,n(r({title:"CALayer - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/calayer/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),i(o,n(r({title:"How to make a shape draw itself using strokeEnd | CALayer - free Swift example code",desc:"How to make a shape draw itself using strokeEnd",link:"https://hackingwithswift.com/example-code/calayer/how-to-make-a-shape-draw-itself-using-strokeend",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 3.2")],-1)),a(" TODO: 작성 "),a(` 
iOS makes it easy to draw shapes using \`CAShapeLayer\`, but you also get the ability to adjust *how* shapes are drawn. By manipulating the \`strokeStart\` and \`strokeEnd\` properties you can make shapes draw themselves on the screen: you can present a half-drawn star, or a three-quarters drawn circle, for example.

However, as clever as that is what’s *really* neat is being able to animate the drawing process. To try it out, first create a \`CAShapeLayer\` with a stroke that’s visible, like this one:

\`\`\`swift
let layer = CAShapeLayer()
let bounds = CGRect(x: 50, y: 50, width: 250, height: 250)
layer.path = UIBezierPath(roundedRect: bounds, byRoundingCorners: .allCorners, cornerRadii: CGSize(width: 20, height: 20)).cgPath
layer.strokeColor = UIColor.black.cgColor
layer.fillColor = nil
layer.lineDashPattern = [8, 6]
view.layer.addSublayer(layer)
\`\`\`

Now create and add a \`CABasicAnimation\` to adjust the \`strokeEnd\` property:

\`\`\`swift
let animation = CABasicAnimation(keyPath: "strokeEnd")
animation.fromValue = 0
animation.toValue = 1
animation.duration = 2
animation.autoreverses = true
animation.repeatCount = .infinity
layer.add(animation, forKey: "line")
\`\`\`

I made that animate from 0 (not drawn) to 1 (fully drawn) over two seconds, but also made it reverse at the end and repeat infinite times.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),a(`
/quick-start/swiftui/how-to-draw-part-of-a-solid-shape-using-trim">How to draw part of a solid shape using trim() 
/quick-start/swiftui/how-to-make-a-view-dismiss-itself">How to make a view dismiss itself 
/example-code/core-graphics/how-to-use-core-graphics-blend-modes-to-draw-a-uiimage-differently">How to use Core Graphics blend modes to draw a UIImage differently 
/example-code/games/how-to-make-one-sprite-draw-in-front-of-another-using-zposition">How to make one sprite draw in front of another using zPosition 
/quick-start/swiftui/how-to-draw-images-using-image-views">How to draw images using Image views</a>
`)],-1))])}const y=l(h,[["render",f],["__file","how-to-make-a-shape-draw-itself-using-strokeend.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/calayer/how-to-make-a-shape-draw-itself-using-strokeend.html","title":"How to make a shape draw itself using strokeEnd","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make a shape draw itself using strokeEnd","description":"Article(s) > How to make a shape draw itself using strokeEnd","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-3.2","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make a shape draw itself using strokeEnd"},{"property":"og:description","content":"How to make a shape draw itself using strokeEnd"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-make-a-shape-draw-itself-using-strokeend.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-make-a-shape-draw-itself-using-strokeend.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make a shape draw itself using strokeEnd"}],["meta",{"property":"og:description","content":"Article(s) > How to make a shape draw itself using strokeEnd"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-3.2"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make a shape draw itself using strokeEnd\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.57,"words":471},"filePathRelative":"hackingwithswift.com/example-code/calayer/how-to-make-a-shape-draw-itself-using-strokeend.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,b as data};
