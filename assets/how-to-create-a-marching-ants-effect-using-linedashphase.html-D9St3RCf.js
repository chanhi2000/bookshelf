import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,f as e,av as h,au as o,aw as i,ax as r,b as a,r as f,o as m}from"./app-BdFl9trH.js";const g={},p={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function u(s,t){const n=f("VPCard");return m(),l("div",null,[e("h1",p,[e("a",d,[e("span",null,h(s.$frontmatter.title)+" 관련",1)])]),o(n,i(r({title:"CALayer - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/calayer/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),o(n,i(r({title:"How to create a marching ants effect using lineDashPhase | CALayer - free Swift example code",desc:"How to create a marching ants effect using lineDashPhase",link:"https://hackingwithswift.com/example-code/calayer/how-to-create-a-marching-ants-effect-using-linedashphase",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 3.2")],-1)),a(" TODO: 작성 "),a(` 
“Marching ants” is the informal name used for animation of a selection: you see a dashed line around whatever you selected, and the dashes slowly move around the selection to show that it’s active.

iOS can achieve most of this effect for you when you’re using a \`CAShapeLayer\`. To try it out, first create a shape layer with a dashed stroke like this:

\`\`\`swift
let layer = CAShapeLayer()
let bounds = CGRect(x: 50, y: 50, width: 250, height: 250)
layer.path = UIBezierPath(roundedRect: bounds, byRoundingCorners: .allCorners, cornerRadii: CGSize(width: 20, height: 20)).cgPath
layer.strokeColor = UIColor.black.cgColor
layer.fillColor = nil
layer.lineDashPattern = [8, 6]
view.layer.addSublayer(layer)
\`\`\`

Now you need to create a \`CABasicAnimation\` to animate the \`lineDashPhase\` property. Annoyingly, the \`lineDashPattern\` – the part that describes the way the dashed are drawn – is actually an array of \`NSNumber\` so we need to boil it down to an integer with code like this:

\`\`\`swift
layer.lineDashPattern?.reduce(0) { $0 - $1.intValue } ?? 0
\`\`\`

With the line dash pattern used above – 8, 6 – that will result in \`toValue\` being set to 14. 

Here’s the animation you need to give the above shape layer a marching ants effect:

\`\`\`swift
let animation = CABasicAnimation(keyPath: "lineDashPhase")
animation.fromValue = 0
animation.toValue = layer.lineDashPattern?.reduce(0) { $0 - $1.intValue } ?? 0
animation.duration = 1
animation.repeatCount = .infinity
layer.add(animation, forKey: "line")
\`\`\`

I used \`.infinity\` for the repeat count so that it lasts forever.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),a(`
/quick-start/swiftui/how-to-create-a-marching-ants-border-effect">How to create a marching ants border effect 
/example-code/uikit/how-to-create-a-page-curl-effect-using-uipageviewcontroller">How to create a page curl effect using UIPageViewController 
/example-code/libraries/how-to-get-a-cover-flow-effect-on-ios">How to get a Cover Flow effect on iOS 
/example-code/uikit/how-to-animate-a-blur-effect-using-uivisualeffectview">How to animate a blur effect using UIVisualEffectView 
/example-code/system/nstexteffectletterpressstyle-how-to-add-a-letterpress-effect-to-text">NSTextEffectLetterpressStyle: How to add a letterpress effect to text</a>
`)],-1))])}const b=c(g,[["render",u],["__file","how-to-create-a-marching-ants-effect-using-linedashphase.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/calayer/how-to-create-a-marching-ants-effect-using-linedashphase.html","title":"How to create a marching ants effect using lineDashPhase","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to create a marching ants effect using lineDashPhase","description":"Article(s) > How to create a marching ants effect using lineDashPhase","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-3.2","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to create a marching ants effect using lineDashPhase"},{"property":"og:description","content":"How to create a marching ants effect using lineDashPhase"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-create-a-marching-ants-effect-using-linedashphase.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-create-a-marching-ants-effect-using-linedashphase.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to create a marching ants effect using lineDashPhase"}],["meta",{"property":"og:description","content":"Article(s) > How to create a marching ants effect using lineDashPhase"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-3.2"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to create a marching ants effect using lineDashPhase\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.67,"words":502},"filePathRelative":"hackingwithswift.com/example-code/calayer/how-to-create-a-marching-ants-effect-using-linedashphase.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,k as data};
