import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as e,as as d,ao as r,at as i,au as a,ak as o,aq as w,ar as h}from"./app-Dn51E1Ub.js";const p={},u={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function y(s,t){const n=w("VPCard");return h(),c("div",null,[e("h1",u,[e("a",m,[e("span",null,d(s.$frontmatter.title)+" 관련",1)])]),r(n,i(a({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),r(n,i(a({title:"How to use dependency injection with storyboards | UIKit - free Swift example code",desc:"How to use dependency injection with storyboards",link:"https://hackingwithswift.com/example-code/uikit/how-to-use-dependency-injection-with-storyboards",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 13.0")],-1)),o(" TODO: 작성 "),o(`
Dependency injection is a fancy name for a simple thing: when we create an object in our app, we want to provide it with all the data it needs to work. Before iOS 13 this wasn’t possible when using storyboards, which meant we ended up with properties that were optional or implicitly unwrapped, even though we knew we’d be setting them immediately.

So, we used to write code like this:

\`\`\`swift
// A view controller that we want to present with some data
class EditUserViewController: UIViewController {
    var selectedUser: User?
    // ...
}

// Our root view controller that wants to create, configure, and present an EditUserViewController
class MainViewController {
    // ...

    func show(user: User) {
        // attempt to load our view controller from the storyboard
        guard let vc = storyboard?.instantiateViewController(withIdentifier: "EditUser") as? EditUserViewController else {
            fatalError("Failed to load EditUserViewController from storyboard.")
        }

        // configure its only property
        vc.selectedUser = user

        // display it
        navigationController?.pushViewController(vc, animated: true)
    }
}
\`\`\`

Having optionals in here was unavoidable because we had to let the storyboard handle initializing the view controller, but it adds all sorts of complexity – we can set that value to \`nil\` by accident, we can forget to set it at all, and we need to unwrap it as needed.

From iOS 13.0 and later there’s a better solution: a new method on \`UIStoryboard\` called \`instantiateViewController(identifier:creator:)\`, which lets us determine how to create and configure our view controllers.

So, we could rewrite \`EditUserViewController\` to this:

\`\`\`swift
class EditUserViewController: UIViewController {
    var selectedUser: User

    init?(coder: NSCoder, selectedUser: User) {
        self.selectedUser = selectedUser
        super.init(coder: coder)
    }

    required init?(coder: NSCoder) {
        fatalError("You must create this view controller with a user.")
    }

    // ...
}
\`\`\`

That makes \`selectedUser\` non-optional, but also added two custom initializers: one with an \`NSCoder\` and a \`User\`, and one just with an \`NSCoder\`. The second one now uses \`fatalError()\` to make it clear that creating an \`EditUserViewController\` without a user isn’t allowed.

With that custom initializer in place we can now update \`MainViewController\` so that it initializes our \`EditUserViewController\` correctly:

\`\`\`swift
func show(user: User) {
    guard let vc = storyboard?.instantiateViewController(identifier: "EditUser", creator: { coder in
        return EditUserViewController(coder: coder, selectedUser: user)
    }) else {
        fatalError("Failed to load EditUserViewController from storyboard.")
    }

    navigationController?.pushViewController(vc, animated: true)
}
\`\`\`

What’s really changing here is that we’re now handed the \`NSCoder\` instance that can create our view controller, and we can use that however we want – including alongside other properties we want to inject. However, it means more places where we can remove optionality from properties, which is always welcome.
`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/xcode/how-to-use-storyboard-references-to-simplify-your-storyboards">How to use storyboard references to simplify your storyboards 
/quick-start/swiftui/swiftui-vs-interface-builder-and-storyboards">SwiftUI vs Interface Builder and storyboards 
/example-code/uikit/how-to-add-a-button-to-a-navigation-bar-using-storyboards">How to add a button to a navigation bar using storyboards 
/quick-start/swiftui/whats-the-difference-between-observedobject-state-and-environmentobject">What’s the difference between @ObservedObject, @State, and @EnvironmentObject? 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks</a>
`)],-1))])}const b=l(p,[["render",y],["__file","how-to-use-dependency-injection-with-storyboards.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-use-dependency-injection-with-storyboards.html","title":"How to use dependency injection with storyboards","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to use dependency injection with storyboards","description":"Article(s) > How to use dependency injection with storyboards","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to use dependency injection with storyboards"},{"property":"og:description","content":"How to use dependency injection with storyboards"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-use-dependency-injection-with-storyboards.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-use-dependency-injection-with-storyboards.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to use dependency injection with storyboards"}],["meta",{"property":"og:description","content":"Article(s) > How to use dependency injection with storyboards"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-06-24T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to use dependency injection with storyboards\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-06-24T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-06-24T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.27,"words":680},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-use-dependency-injection-with-storyboards.md","localizedDate":"2019년 6월 24일","excerpt":"\\n"}');export{b as comp,v as data};
