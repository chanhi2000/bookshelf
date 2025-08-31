import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as e,as as u,ao as n,at as a,au as r,ak as o,aq as d,ar as m}from"./app-DpiNAgkx.js";const w={},p={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,t){const i=d("VPCard");return m(),l("div",null,[e("h1",p,[e("a",h,[e("span",null,u(s.$frontmatter.title)+" 관련",1)])]),n(i,a(r({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(i,a(r({title:"How to make your user interface in code | UIKit - free Swift example code",desc:"How to make your user interface in code",link:"https://hackingwithswift.com/example-code/uikit/how-to-make-your-user-interface-in-code",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 9.0")],-1)),o(" TODO: 작성 "),o(`
Creating your user interface in code gives you the flexibility to build things conditionally, to step through problems in a debugger, to re-use components more easily, and to monitor changes more closely in source control. On the flip side, you lose features like easy segues, static cell design in table views, the ability to preview on multiple devices simultaneously, and more.

However, I’m going to assume you’ve already decided you want to make your UI in code, so let’s take a look at how it’s done:

Often you’ll see code like this inside the \`viewDidLoad()\` method of a view controller:

\`\`\`swift
backgroundColor = UIColor(white: 0.9, alpha: 1)

let stackView = UIStackView()
stackView.translatesAutoresizingMaskIntoConstraints = false
stackView.spacing = 10
view.addSubview(stackView)

stackView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor).isActive = true
stackView.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor).isActive = true
stackView.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor).isActive = true
stackView.axis = .vertical

let notice = UILabel()
notice.numberOfLines = 0
notice.text = "Your child has attempted to share the following photo from the camera:"
stackView.addArrangedSubview(notice)

let imageView = UIImageView(image: shareImage)
stackView.addArrangedSubview(imageView)

let prompt = UILabel()
prompt.numberOfLines = 0
prompt.text = "What do you want to do?"
stackView.addArrangedSubview(prompt)

for option in ["Always Allow", "Allow Once", "Deny", "Manage Settings"] {
    let button = UIButton(type: .system)
    button.setTitle(option, for: .normal)
    stackView.addArrangedSubview(button)
}
\`\`\`

That’s a complex user interface, but if you’re writing that sort of thing inside your \`viewDidLoad()\` method you’re making a terrible mistake. In fact, if you write that kind of code and you aren’t just prototyping or learning something, then you lose all rights to complain that your view controllers are massive later on.

All the code above - literally all of it - is *view* code, and needs to be treated as such. It is not controller code, and even with Apple’s muddied definition of MVC it is not *view controller* code either. It’s view code, and belongs in a subclass of \`UIView\`.

This change is trivial to make: you copy all that code, paste it into a new subclass of \`UIView\` called \`SharePromptView\`, then change the class of your view controller to your new subclass. 

The final \`SharePromptView\` class should look something like this:

\`\`\`swift
class SharePromptView: UIView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        createSubviews()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        createSubviews()
    }

    func createSubviews() {
        // all the layout code from above
    }
}
\`\`\`

All \`UIView\` subclasses must implement \`init(coder:)\`, but as you’re creating your UI in code you will also need to add \`init(frame:)\`. The \`createSubviews()\` method is there to support both.

Thanks to that custom \`UIView\` subclass you can now take a huge amount of code out of your view controller:

\`\`\`swift
class ViewController: UIViewController {
    var shareView = SharePromptView()

    override func loadView() {
        view = shareView
    }

    override func viewDidLoad() {
        super.viewDidLoad()
    }
}
\`\`\`

Having a dedicated \`shareView\` property allows you to access any properties you declare inside \`SharePromptView\` without having to keep casting \`view\`.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/system/how-to-run-code-when-your-app-is-terminated">How to run code when your app is terminated 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/quick-start/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts">How to use Instruments to profile your SwiftUI code and identify slow layouts 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/example-code/uikit/how-to-localize-your-ios-app">How to localize your iOS app</a>
`)],-1))])}const k=c(w,[["render",f],["__file","how-to-make-your-user-interface-in-code.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-make-your-user-interface-in-code.html","title":"How to make your user interface in code","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make your user interface in code","description":"Article(s) > How to make your user interface in code","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-9.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make your user interface in code"},{"property":"og:description","content":"How to make your user interface in code"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-make-your-user-interface-in-code.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-make-your-user-interface-in-code.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make your user interface in code"}],["meta",{"property":"og:description","content":"Article(s) > How to make your user interface in code"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-9.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make your user interface in code\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":2.45,"words":735},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-make-your-user-interface-in-code.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,v as data};
