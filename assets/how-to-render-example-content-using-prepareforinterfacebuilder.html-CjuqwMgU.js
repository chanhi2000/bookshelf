import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as e,av as p,au as n,aw as a,ax as i,b as r,r as d,o as h}from"./app-CgstJRjh.js";const u={},m={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"};function g(s,t){const o=d("VPCard");return h(),c("div",null,[e("h1",m,[e("a",w,[e("span",null,p(s.$frontmatter.title)+" 관련",1)])]),n(o,a(i({title:"Xcode - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/xcode/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(o,a(i({title:"How to render example content using prepareForInterfaceBuilder() | Xcode - free Swift example code",desc:"How to render example content using prepareForInterfaceBuilder()",link:"https://hackingwithswift.com/example-code/xcode/how-to-render-example-content-using-prepareforinterfacebuilder",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),r(" TODO: 작성 "),r(` 
Whenever you create a custom \`UIView\` subclass using \`@IBDesignable\`, it’s usually a good idea to provide it with some sample content so it can render meaningfully at design time.

For example, here’s a simple \`ShapeView\` class that renders a \`UIBezierPath\` inside a view, using \`CAShapeLayer\`:

\`\`\`swift
@IBDesignable class ShapeView: UIView {
    @IBInspectable var strokeColor: UIColor = UIColor.black
    @IBInspectable var fillColor: UIColor = UIColor.clear
    var path: UIBezierPath?

    override class var layerClass: AnyClass {
        return CAShapeLayer.self
    }

    override func layoutSubviews() {
        guard let layer = layer as? CAShapeLayer else { return }
        layer.path = path?.cgPath
        layer.strokeColor = strokeColor.cgColor
        layer.fillColor = fillColor.cgColor
    }
}
\`\`\`

While that might work well enough at runtime, you won’t be able to see anything when used with Interface Builder because it relies on a bezier path being set. So, while you can adjust the stroke and fill colors all you want, you can’t see how those changes look.

To fix this, Xcode lets us add a special method in the view called \`prepareForInterfaceBuilder()\`. If present, this is called by Interface Builder when your custom view is being drawn, and it’s your chance to provide some example content so others can see how it looks.

In this instance, setting the \`path\` property to a default shape does the job neatly:

\`\`\`swift
override func prepareForInterfaceBuilder() {
    let drawRect = CGRect(x: 0, y: 0, width: 128, height: 128)
    path = UIBezierPath(rect: drawRect)
}
\`\`\`

This method is only called at design time, so you don’t have to worry about it being run in shipping code.

`),t[2]||(t[2]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),r(`
/quick-start/swiftui/how-to-render-markdown-content-in-text">How to render Markdown content in text 
/example-code/uikit/how-to-render-shadows-using-nsshadow-and-setshadow">How to render shadows using NSShadow and setShadow() 
/quick-start/swiftui/how-to-render-a-gradient">How to render a gradient 
/quick-start/swiftui/how-to-render-images-using-sf-symbols">How to render images using SF Symbols 
/quick-start/swiftui/how-to-render-a-swiftui-view-to-a-pdf">How to render a SwiftUI view to a PDF</a>
`)],-1))])}const x=l(u,[["render",g],["__file","how-to-render-example-content-using-prepareforinterfacebuilder.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/xcode/how-to-render-example-content-using-prepareforinterfacebuilder.html","title":"How to render example content using prepareForInterfaceBuilder()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to render example content using prepareForInterfaceBuilder()","description":"Article(s) > How to render example content using prepareForInterfaceBuilder()","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to render example content using prepareForInterfaceBuilder()"},{"property":"og:description","content":"How to render example content using prepareForInterfaceBuilder()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/xcode/how-to-render-example-content-using-prepareforinterfacebuilder.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/xcode/how-to-render-example-content-using-prepareforinterfacebuilder.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to render example content using prepareForInterfaceBuilder()"}],["meta",{"property":"og:description","content":"Article(s) > How to render example content using prepareForInterfaceBuilder()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to render example content using prepareForInterfaceBuilder()\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.62,"words":487},"filePathRelative":"hackingwithswift.com/example-code/xcode/how-to-render-example-content-using-prepareforinterfacebuilder.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,b as data};
