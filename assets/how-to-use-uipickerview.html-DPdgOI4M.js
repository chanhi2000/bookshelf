import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as e,as as p,ao as n,at as r,au as a,ak as i,aq as w,ar as u}from"./app-Dbtze28S.js";const h={},m={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function f(c,t){const o=w("VPCard");return u(),l("div",null,[e("h1",m,[e("a",d,[e("span",null,p(c.$frontmatter.title)+" 관련",1)])]),n(o,r(a({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(o,r(a({title:"How to use UIPickerView | UIKit - free Swift example code",desc:"How to use UIPickerView",link:"https://hackingwithswift.com/example-code/uikit/how-to-use-uipickerview",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 2.0")],-1)),i(" TODO: 작성 "),i(`
The spinning, barrel-shaped picker view has been a hallmark component of iOS since the first iPhone, and it doesn’t take much work for you to use in your own apps.

First, create and position a \`UIPickerView\` where you want it. This code creates one at the bottom of the screen:

\`\`\`swift
let picker = UIPickerView()
picker.translatesAutoresizingMaskIntoConstraints = false
view.addSubview(picker)

picker.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor).isActive = true
picker.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor).isActive = true
picker.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor).isActive = true
\`\`\`

Now decide what should be the data source and delegate for the picker view. Traditionally these are there to provide data (the data source) and respond to actions (the delegate), but \`UIPickerView\` gets these two confused so you really need both.

To make things easy here we’re going to use your existing view controller for both data source and delegate, but you should move this code elsewhere in your own projects. So, start by adding both \`UIPickerViewDataSource\` and \`UIPickerViewDelegate\` to the conformance list for your view controller.

Finally, implement three methods: \`numberOfComponents()\` describes how many individual segments there are in the picker view, \`numberOfRowsInComponent\` describes how many rows each segment has, and \`titleForRow\` provides the title for each row in each segment.

Here’s some example code to get you started:

\`\`\`swift
func numberOfComponents(in pickerView: UIPickerView) -> Int {
    return 2
}

func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
    if component == 0 {
        return 10
    } else {
        return 100
    }
}

func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
    if component == 0 {
        return "First \\(row)"
    } else {
        return "Second \\(row)"
    }
}
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),i(`
/example-code/uikit/how-to-read-a-title-from-a-uipickerview-using-titleforrow">How to read a title from a UIPickerView using titleForRow 
/quick-start/swiftui/whats-the-difference-between-observedobject-state-and-environmentobject">What’s the difference between @ObservedObject, @State, and @EnvironmentObject? 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/uikit/how-to-change-your-app-icon-dynamically-with-setalternateiconname">How to change your app icon dynamically with setAlternateIconName()</a>
`)],-1))])}const y=s(h,[["render",f],["__file","how-to-use-uipickerview.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-use-uipickerview.html","title":"How to use UIPickerView","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to use UIPickerView","description":"Article(s) > How to use UIPickerView","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to use UIPickerView"},{"property":"og:description","content":"How to use UIPickerView"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-use-uipickerview.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-use-uipickerview.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to use UIPickerView"}],["meta",{"property":"og:description","content":"Article(s) > How to use UIPickerView"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to use UIPickerView\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.61,"words":484},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-use-uipickerview.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,b as data};
