import{_ as m}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as e,as as c,ao as n,at as o,au as r,ak as a,aq as f,ar as h}from"./app-CpYYKbnj.js";const u={},p={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function g(s,t){const i=f("VPCard");return h(),l("div",null,[e("h1",p,[e("a",d,[e("span",null,c(s.$frontmatter.title)+" 관련",1)])]),n(i,o(r({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(i,o(r({title:"How to create keyframe animations using animateKeyframes() | UIKit - free Swift example code",desc:"How to create keyframe animations using animateKeyframes()",link:"https://hackingwithswift.com/example-code/uikit/how-to-create-keyframe-animations-using-animatekeyframes",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 7.0")],-1)),a(" TODO: 작성 "),a(`
If you need to combine a selection of animations over time the easiest thing to do is create a keyframe animation. This starts with a call to \`animateKeyframes()\`, then you go ahead and call \`addKeyframe()\` as many times as you need.

Each keyframe you add has a relative start time and relative duration, so they work independently of the overall timing. You also provide each keyframe with the animation it should perform, again not worrying about the rest of the animation. When it runs, iOS combines them all together, blending one animation seamlessly into the next.

To give you an example, here’s some code that moves and scales an image view around the screen:

\`\`\`swift
let start = self.imageView.center

UIView.animateKeyframes(withDuration: 5, delay: 0, options: .calculationModeCubic, animations: {
    UIView.addKeyframe(withRelativeStartTime: 0.0, relativeDuration: 0.25) {
        self.imageView.transform = CGAffineTransform(scaleX: 2, y: 2)
    }

    UIView.addKeyframe(withRelativeStartTime: 0.25, relativeDuration: 0.25) {
        self.imageView.center = CGPoint(x: self.view.bounds.midX, y: self.view.bounds.maxY)
    }

    UIView.addKeyframe(withRelativeStartTime: 0.5, relativeDuration: 0.25) {
        self.imageView.center = CGPoint(x: self.view.bounds.width, y: start.y)
    }

    UIView.addKeyframe(withRelativeStartTime: 0.75, relativeDuration: 0.25) {
        self.imageView.center = start
    }
})
\`\`\`

The \`calculationModeCubic\` option tells iOS to blend the animations together, so you’ll see the image view overshoot one animation as it curves into the next. You should also try using \`calculationModeCubicPaced\` instead – in the above code it makes the scaling part run over the entire length of the animation.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),a(`
/example-code/calayer/how-to-create-keyframe-animations-using-cakeyframeanimation">How to create keyframe animations using CAKeyframeAnimation 
/quick-start/swiftui/how-to-create-custom-text-effects-and-animations">How to create custom text effects and animations 
/quick-start/swiftui/how-to-override-animations-with-transactions">How to override animations with transactions 
/quick-start/swiftui/how-to-create-multi-step-animations-using-phase-animators">How to create multi-step animations using phase animators 
/quick-start/swiftui/how-to-apply-multiple-animations-to-a-view">How to apply multiple animations to a view</a>
`)],-1))])}const k=m(u,[["render",g],["__file","how-to-create-keyframe-animations-using-animatekeyframes.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-create-keyframe-animations-using-animatekeyframes.html","title":"How to create keyframe animations using animateKeyframes()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to create keyframe animations using animateKeyframes()","description":"Article(s) > How to create keyframe animations using animateKeyframes()","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to create keyframe animations using animateKeyframes()"},{"property":"og:description","content":"How to create keyframe animations using animateKeyframes()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-create-keyframe-animations-using-animatekeyframes.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-create-keyframe-animations-using-animatekeyframes.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to create keyframe animations using animateKeyframes()"}],["meta",{"property":"og:description","content":"Article(s) > How to create keyframe animations using animateKeyframes()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to create keyframe animations using animateKeyframes()\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.56,"words":469},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-create-keyframe-animations-using-animatekeyframes.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,v as data};
