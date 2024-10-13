import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,b as e,t as c,e as r,n as i,g as a,a as t,r as d,o as h}from"./app-TWLwS86W.js";const g={},m={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"},u=e("nav",{class:"table-of-contents"},[e("ul")],-1),w=e("hr",null,null,-1),f=e("blockquote",null,[e("p",null,"Available from iOS 2.0")],-1),y=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/quick-start/swiftui/how-to-blend-views-together">How to blend views together 
/example-code/core-graphics/how-to-draw-a-text-string-using-core-graphics">How to draw a text string using Core Graphics 
/example-code/core-graphics/how-to-draw-lines-in-core-graphics-moveto-and-addlineto">How to draw lines in Core Graphics: move(to:) and addLine(to:) 
/example-code/core-graphics/how-to-draw-a-circle-using-core-graphics-addellipsein">How to draw a circle using Core Graphics: addEllipse(in:) 
/example-code/core-graphics/how-to-draw-a-square-using-core-graphics-addrect">How to draw a square using Core Graphics: addRect()</a>
`)],-1);function b(n,I){const o=d("VPCard");return h(),l("div",null,[e("h1",m,[e("a",p,[e("span",null,c(n.$frontmatter.title)+" 관련",1)])]),r(o,i(a({title:"Core Graphics - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/core-graphics/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),u,w,r(o,i(a({title:"How to use Core Graphics blend modes to draw a UIImage differently | Core Graphics - free Swift example code",desc:"How to use Core Graphics blend modes to draw a UIImage differently",link:"https://hackingwithswift.com/example-code/core-graphics/how-to-use-core-graphics-blend-modes-to-draw-a-uiimage-differently",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,t(" TODO: 작성 "),t(` 
If you're rendering images using Core Graphics you should definitely try out some of the alternate blend modes that are available. If you've ever used Photoshop's blend modes these will be familiar: screen, luminosity, multiply and so on – these are all available right in Core Graphics.

To give you an idea what's possible, here's some code that takes two UIImages and draws them into one single image. The first image is drawn using normal rendering, and the second using \`.luminosity\`.

\`\`\`swift
if let img = UIImage(named: "example"), let img2 = UIImage(named: "example2") {
    let rect = CGRect(x: 0, y: 0, width: img.size.width, height: img.size.height)
    let renderer = UIGraphicsImageRenderer(size: img.size)

    let result = renderer.image { ctx in
        // fill the background with white so that translucent colors get lighter
        UIColor.white.set()
        ctx.fill(rect)

        img.draw(in: rect, blendMode: .normal, alpha: 1)
        img2.draw(in: rect, blendMode: .luminosity, alpha: 1)
    }
}
\`\`\`

How that looks depends on the source images you used – try drawing them the other way around to see what difference it makes, or try using \`.multiply\` rather than \`.luminosity\`.

If you're looking for a more advanced example, this function accepts an image and returns the same image with a rainbow effect to it. This is done by drawing six colored strips onto an image, then overlaying the original image using the blend mode \`.luminosity\` along with a slight alpha.

\`\`\`swift
func addRainbow(to img: UIImage) -> UIImage {
    // create a CGRect representing the full size of our input iamge
    let rect = CGRect(x: 0, y: 0, width: img.size.width, height: img.size.height)

    // figure out the height of one section (there are six)
    let sectionHeight = img.size.height / 6

    // set up the colors – these are based on my trial and error
    let red = UIColor(red: 1, green: 0.5, blue: 0.5, alpha: 0.8)
    let orange = UIColor(red: 1, green: 0.7, blue: 0.35, alpha: 0.8)
    let yellow = UIColor(red: 1, green: 0.85, blue: 0.1, alpha: 0.65)
    let green = UIColor(red: 0, green: 0.7, blue: 0.2, alpha: 0.5)
    let blue = UIColor(red: 0, green: 0.35, blue: 0.7, alpha: 0.5)
    let purple = UIColor(red: 0.3, green: 0, blue: 0.5, alpha: 0.6)
    let colors = [red, orange, yellow, green, blue, purple]

    let renderer = UIGraphicsImageRenderer(size: img.size)
    let result = renderer.image { ctx in
        UIColor.white.set()
        ctx.fill(rect)

        // loop through all six colors
        for i in 0 ..< 6 {
            let color = colors[i]

            // figure out the rect for this section
            let rect = CGRect(x: 0, y: CGFloat(i) * sectionHeight, width: rect.width, height: sectionHeight)

            // draw it onto the context at the right place
            color.set()
            ctx.fill(rect)
        }

        // now draw our input image over using Luminosity mode, with a little bit of alpha to make it fainter
        img.draw(in: rect, blendMode: .luminosity, alpha: 0.6)
    }

    return result
}
\`\`\`

`),y])}const k=s(g,[["render",b],["__file","how-to-use-core-graphics-blend-modes-to-draw-a-uiimage-differently.html.vue"]]),U=JSON.parse('{"path":"/hackingwithswift.com/example-code/core-graphics/how-to-use-core-graphics-blend-modes-to-draw-a-uiimage-differently.html","title":"How to use Core Graphics blend modes to draw a UIImage differently","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to use Core Graphics blend modes to draw a UIImage differently","description":"Article(s) > How to use Core Graphics blend modes to draw a UIImage differently","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to use Core Graphics blend modes to draw a UIImage differently"},{"property":"og:description","content":"How to use Core Graphics blend modes to draw a UIImage differently"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/core-graphics/how-to-use-core-graphics-blend-modes-to-draw-a-uiimage-differently.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/core-graphics/how-to-use-core-graphics-blend-modes-to-draw-a-uiimage-differently.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to use Core Graphics blend modes to draw a UIImage differently"}],["meta",{"property":"og:description","content":"Article(s) > How to use Core Graphics blend modes to draw a UIImage differently"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to use Core Graphics blend modes to draw a UIImage differently\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.56,"words":767},"filePathRelative":"hackingwithswift.com/example-code/core-graphics/how-to-use-core-graphics-blend-modes-to-draw-a-uiimage-differently.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,U as data};
