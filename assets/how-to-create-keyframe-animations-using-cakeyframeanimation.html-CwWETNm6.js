import{_ as m}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as e,as as l,ao as n,at as o,au as r,ak as a,aq as f,ar as h}from"./app-J50hDzMj.js";const p={},y={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"};function d(s,t){const i=f("VPCard");return h(),c("div",null,[e("h1",y,[e("a",u,[e("span",null,l(s.$frontmatter.title)+" 관련",1)])]),n(i,o(r({title:"CALayer - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/calayer/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(i,o(r({title:"How to create keyframe animations using CAKeyframeAnimation | CALayer - free Swift example code",desc:"How to create keyframe animations using CAKeyframeAnimation",link:"https://hackingwithswift.com/example-code/calayer/how-to-create-keyframe-animations-using-cakeyframeanimation",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 2.0")],-1)),a(" TODO: 작성 "),a(` 
Keyframe animations offer extraordinary power for developers because they let you set multiple values and have iOS animate between them over times you specify. There are three components: a key path (the property to animate), an array of values (the value you want to use for that property), and an array of key times (when that value should be used for the property).

The number of key times needs to match the number of values, because each value is applied in order when its key time is reached. In the example code below, a view will be moved down 300 points then back to its starting point over 2 seconds. It's important that you understand the key times and duration are separate: the key times should be between 0 and 1, where 0 means "the start of the animation" and 1 means "the end of the animation."

\`\`\`swift
let animation = CAKeyframeAnimation()
animation.keyPath = "position.y"
animation.values = [0, 300, 0]
animation.keyTimes = [0, 0.5, 1]
animation.duration = 2
animation.isAdditive = true

vw.layer.add(animation, forKey: "move")
\`\`\`

Because the animation is marked as additive, it means that 300 is relative to its starting position.

We can use key frame animations to create a simple shake effect that moves a view left and right across a brief animation. This will use additive animations again because we want to specify relative values (move to the left and right a bit) rather than absolute values:

\`\`\`swift
func shakeView(vw: UIView) {
    let animation = CAKeyframeAnimation()
    animation.keyPath = "position.x"
    animation.values = [0, 10, -10, 10, -5, 5, -5, 0 ]
    animation.keyTimes = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1]
    animation.duration = 0.4
    animation.isAdditive = true

    vw.layer.add(animation, forKey: "shake")
}
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),a(`
/example-code/uikit/how-to-create-keyframe-animations-using-animatekeyframes">How to create keyframe animations using animateKeyframes() 
/quick-start/swiftui/how-to-create-custom-text-effects-and-animations">How to create custom text effects and animations 
/quick-start/swiftui/how-to-override-animations-with-transactions">How to override animations with transactions 
/quick-start/swiftui/how-to-create-multi-step-animations-using-phase-animators">How to create multi-step animations using phase animators 
/quick-start/swiftui/how-to-apply-multiple-animations-to-a-view">How to apply multiple animations to a view</a>
`)],-1))])}const k=m(p,[["render",d],["__file","how-to-create-keyframe-animations-using-cakeyframeanimation.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/calayer/how-to-create-keyframe-animations-using-cakeyframeanimation.html","title":"How to create keyframe animations using CAKeyframeAnimation","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to create keyframe animations using CAKeyframeAnimation","description":"Article(s) > How to create keyframe animations using CAKeyframeAnimation","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to create keyframe animations using CAKeyframeAnimation"},{"property":"og:description","content":"How to create keyframe animations using CAKeyframeAnimation"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-create-keyframe-animations-using-cakeyframeanimation.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-create-keyframe-animations-using-cakeyframeanimation.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to create keyframe animations using CAKeyframeAnimation"}],["meta",{"property":"og:description","content":"Article(s) > How to create keyframe animations using CAKeyframeAnimation"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to create keyframe animations using CAKeyframeAnimation\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.75,"words":525},"filePathRelative":"hackingwithswift.com/example-code/calayer/how-to-create-keyframe-animations-using-cakeyframeanimation.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,v as data};
