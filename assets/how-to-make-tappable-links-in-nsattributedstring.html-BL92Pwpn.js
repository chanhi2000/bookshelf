import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as h,f as t,av as u,au as i,aw as o,ax as r,b as a,r as s,o as d}from"./app-Bd1z_vEL.js";const m={},g={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"};function b(l,e){const n=s("VPCard"),c=s("VidStack");return d(),h("div",null,[t("h1",g,[t("a",w,[t("span",null,u(l.$frontmatter.title)+" 관련",1)])]),i(n,o(r({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),i(n,o(r({title:"How to make tappable links in NSAttributedString | System - free Swift example code",desc:"How to make tappable links in NSAttributedString",logo:"https://hackingwithswift.com/favicon.svg",link:"https://hackingwithswift.com/example-code/how-to-make-tappable-links-in-nsattributedstring",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 6.0")],-1)),i(c,{src:"youtube/qr1XJMIziBg"}),a(" TODO: 작성 "),a(` 
You can make interactive hyperlinks in any attributed string, which in turn means you can add interactive hyperlinks to any UIKit control. If you're working with \`UITextView\` (which is likely, let's face it), you get basic hyperlinks just by enabling the "Links" data detector in Interface Builder, but that doesn't work for arbitrary strings – for example, maybe you want the words “tap here" to be interactive.

Here is a complete example of arbitrary hyperlinks using a \`UITextView\`. Make sure your text view has "Selectable" enabled, as this is required by iOS:

\`\`\`swift
class ViewController: UIViewController, UITextViewDelegate {
    @IBOutlet var textView: UITextView!

    override func viewDidLoad() {
        let attributedString = NSMutableAttributedString(string: "Want to learn iOS? You should visit the best source of free iOS tutorials!")
        attributedString.addAttribute(.link, value: "https://www.hackingwithswift.com", range: NSRange(location: 19, length: 55))

        textView.attributedText = attributedString
    }

    func textView(_ textView: UITextView, shouldInteractWith URL: URL, in characterRange: NSRange, interaction: UITextItemInteraction) -> Bool {
        UIApplication.shared.open(URL)
        return false
    }
}
\`\`\`

There are three important things to note about this technique. 

First, your view controller should be set as the delegate for your text view in Interface Builder or in code.

Second, the tap cannot be very brief, which means quick taps are ignored by iOS. If you find find this annoying you might consider something like this: <a href="https://gist.github.com/benjaminbojko/c92ac19fe4db3302bd28">https://gist.github.com/benjaminbojko/c92ac19fe4db3302bd28</a>.

Third, this technique is easily used with custom URL schemes, e.g. \`yourapp://\`, which you can catch and parse inside \`shouldInteractWith\` to trigger your own behaviors.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),a(`
/quick-start/swiftui/how-to-customize-the-way-links-are-opened">How to customize the way links are opened 
/quick-start/swiftui/how-to-open-web-links-in-safari">How to open web links in Safari 
/quick-start/swiftui/how-to-create-a-tappable-button">How to create a tappable button 
/quick-start/swiftui/how-to-control-the-tappable-area-of-a-view-using-contentshape">How to control the tappable area of a view using contentShape() 
/quick-start/swiftui/how-to-fix-a-form-picker-or-a-navigationlink-that-isnt-tappable">How to fix a Form Picker or a NavigationLink that isn’t tappable</a>
`)],-1))])}const y=p(m,[["render",b],["__file","how-to-make-tappable-links-in-nsattributedstring.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-make-tappable-links-in-nsattributedstring.html","title":"How to make tappable links in NSAttributedString","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make tappable links in NSAttributedString","description":"Article(s) > How to make tappable links in NSAttributedString","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-6.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make tappable links in NSAttributedString"},{"property":"og:description","content":"How to make tappable links in NSAttributedString"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-make-tappable-links-in-nsattributedstring.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-make-tappable-links-in-nsattributedstring.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make tappable links in NSAttributedString"}],["meta",{"property":"og:description","content":"Article(s) > How to make tappable links in NSAttributedString"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-6.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-06-01T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make tappable links in NSAttributedString\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-06-01T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-06-01T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.72,"words":516},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-make-tappable-links-in-nsattributedstring.md","localizedDate":"2019년 6월 1일","excerpt":"\\n"}');export{y as comp,S as data};
