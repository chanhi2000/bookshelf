import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as t,t as m,e as a,n,g as o,a as e,r as l,o as h}from"./app-ubLChIzZ.js";const w={},u={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"},g=t("nav",{class:"table-of-contents"},[t("ul")],-1),d=t("hr",null,null,-1),f=t("blockquote",null,[t("p",null,"Available from iOS 2.0")],-1),v=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/uikit/how-to-animate-views-with-spring-damping-using-animatewithduration">How to animate views with spring damping using animate(withDuration:) 
/example-code/uikit/how-to-animate-views-using-uiviewpropertyanimator">How to animate views using UIViewPropertyAnimator 
/example-code/uikit/how-to-animate-when-your-size-class-changes-willtransitionto">How to animate when your size class changes: willTransition(to:) 
/example-code/uikit/how-to-animate-a-blur-effect-using-uivisualeffectview">How to animate a blur effect using UIVisualEffectView 
/quick-start/swiftui/how-to-animate-the-size-of-text">How to animate the size of text</a>
`)],-1);function y(s,k){const i=l("VPCard");return h(),c("div",null,[t("h1",u,[t("a",p,[t("span",null,m(s.$frontmatter.title)+" 관련",1)])]),a(i,n(o({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,d,a(i,n(o({title:"How to animate views using animate(withDuration:) | UIKit - free Swift example code",desc:"How to animate views using animate(withDuration:)",link:"https://hackingwithswift.com/example-code/uikit/how-to-animate-views-using-animatewithduration",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,e(" TODO: 작성 "),e(`
Animation in iOS is done by starting an animation block, then telling iOS what changes you want to make. Because the animation block is active, those changes won't happen straight away – instead, iOS will execute them smoothly over the time you specified, so you don't have to worry when it will finish or what all the intermediate states are.

Here's a basic example to make a view fade out:

\`\`\`swift
let viewToAnimate = UIView()

UIView.animate(withDuration: 1) {
    viewToAnimate.alpha = 0
}
\`\`\`

If you want to remove the view from its superview once the fade has finished, you can use a more advanced version of the same method that gives you a completion block – a closure that will be run once the animation finishes. Here's how that looks:

\`\`\`swift
UIView.animate(withDuration: 1, animations: {
    viewToAnimate.alpha = 0
}) { _ in
    viewToAnimate.removeFromSuperview()
}
\`\`\`

You can also specify a delay before the animation starts, and even control the acceleration and deceleration curves of the animation, like this:

\`\`\`swift
UIView.animate(withDuration: 1, delay: 1, options: .curveEaseIn, animations: {
    viewToAnimate.alpha = 0
}) { _ in
    viewToAnimate.removeFromSuperview()
}
\`\`\`

`),v])}const x=r(w,[["render",y],["__file","how-to-animate-views-using-animatewithduration.html.vue"]]),D=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-animate-views-using-animatewithduration.html","title":"How to animate views using animate(withDuration:)","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to animate views using animate(withDuration:)","description":"Article(s) > How to animate views using animate(withDuration:)","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to animate views using animate(withDuration:)"},{"property":"og:description","content":"How to animate views using animate(withDuration:)"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-animate-views-using-animatewithduration.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-animate-views-using-animatewithduration.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to animate views using animate(withDuration:)"}],["meta",{"property":"og:description","content":"Article(s) > How to animate views using animate(withDuration:)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to animate views using animate(withDuration:)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.43,"words":429},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-animate-views-using-animatewithduration.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,D as data};
