import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as e,t as s,e as a,n as o,g as r,a as t,r as m,o as p}from"./app-ubLChIzZ.js";const h={},d={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},u=e("nav",{class:"table-of-contents"},[e("ul")],-1),w=e("hr",null,null,-1),y=e("blockquote",null,[e("p",null,"Available from iOS 5.0")],-1),f=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/games/how-to-emit-particles-using-skemitternode">How to emit particles using SKEmitterNode 
/quick-start/swiftui/how-to-create-multi-column-lists-using-table">How to create multi-column lists using Table 
/quick-start/concurrency/how-to-use-mainactor-to-run-code-on-the-main-queue">How to use @MainActor to run code on the main queue 
/example-code/games/how-to-advance-time-in-an-skemitternode-using-advancesimulationtime">How to advance time in an SKEmitterNode using advanceSimulationTime() 
/quick-start/swiftui/how-to-add-advanced-text-styling-using-attributedstring">How to add advanced text styling using AttributedString</a>
`)],-1);function C(n,b){const i=m("VPCard");return p(),c("div",null,[e("h1",d,[e("a",g,[e("span",null,s(n.$frontmatter.title)+" 관련",1)])]),a(i,o(r({title:"CALayer - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/calayer/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),u,w,a(i,o(r({title:"How to emit particles using CAEmitterLayer | CALayer - free Swift example code",desc:"How to emit particles using CAEmitterLayer",link:"https://hackingwithswift.com/example-code/calayer/how-to-emit-particles-using-caemitterlayer",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),y,t(" TODO: 작성 "),t(` 
Believe it or not, iOS has a built-in particle system that works great in all UIKit apps and is immensely customizable. To get started you need to create a \`CAEmitterLayer\` object and tell it how to create particles: where it should create them, how big the emitter should be, and what types of particles should exist.

The "type of particles" part is handled by \`CAEmitterCell\`, which covers details like how fast to create, how long they should live, whether they should spin and/or fade out, what texture to use, and more. You can add as many \`CAEmitterCells\` to a \`CAEmitterLayer\` as you need.

Here's some example code to get you started. This creates particles of three different colors, all falling and spinning down from the top of the screen. The image "particle_confetti" is just a small white triangle that I drew by hand – you should replace that with something more interesting.

\`\`\`swift
func createParticles() {
    let particleEmitter = CAEmitterLayer()

    particleEmitter.emitterPosition = CGPoint(x: view.center.x, y: -96)
    particleEmitter.emitterShape = .line
    particleEmitter.emitterSize = CGSize(width: view.frame.size.width, height: 1)

    let red = makeEmitterCell(color: UIColor.red)
    let green = makeEmitterCell(color: UIColor.green)
    let blue = makeEmitterCell(color: UIColor.blue)

    particleEmitter.emitterCells = [red, green, blue]

    view.layer.addSublayer(particleEmitter)
}

func makeEmitterCell(color: UIColor) -> CAEmitterCell {
    let cell = CAEmitterCell()
    cell.birthRate = 3
    cell.lifetime = 7.0
    cell.lifetimeRange = 0
    cell.color = color.cgColor
    cell.velocity = 200
    cell.velocityRange = 50
    cell.emissionLongitude = CGFloat.pi
    cell.emissionRange = CGFloat.pi / 4
    cell.spin = 2
    cell.spinRange = 3
    cell.scaleRange = 0.5
    cell.scaleSpeed = -0.05

    cell.contents = UIImage(named: "particle_confetti")?.cgImage
    return cell
}
\`\`\`

`),f])}const _=l(h,[["render",C],["__file","how-to-emit-particles-using-caemitterlayer.html.vue"]]),A=JSON.parse('{"path":"/hackingwithswift.com/example-code/calayer/how-to-emit-particles-using-caemitterlayer.html","title":"How to emit particles using CAEmitterLayer","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to emit particles using CAEmitterLayer","description":"Article(s) > How to emit particles using CAEmitterLayer","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-5.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to emit particles using CAEmitterLayer"},{"property":"og:description","content":"How to emit particles using CAEmitterLayer"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-emit-particles-using-caemitterlayer.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-emit-particles-using-caemitterlayer.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to emit particles using CAEmitterLayer"}],["meta",{"property":"og:description","content":"Article(s) > How to emit particles using CAEmitterLayer"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-5.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to emit particles using CAEmitterLayer\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.62,"words":487},"filePathRelative":"hackingwithswift.com/example-code/calayer/how-to-emit-particles-using-caemitterlayer.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{_ as comp,A as data};
