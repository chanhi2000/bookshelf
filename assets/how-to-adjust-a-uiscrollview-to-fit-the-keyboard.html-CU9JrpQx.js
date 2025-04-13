import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as t,av as d,au as a,aw as n,ax as r,b as o,r as h,o as u}from"./app-CgstJRjh.js";const m={},p={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,e){const i=h("VPCard");return u(),c("div",null,[t("h1",p,[t("a",w,[t("span",null,d(s.$frontmatter.title)+" 관련",1)])]),a(i,n(r({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),a(i,n(r({title:"How to adjust a UIScrollView to fit the keyboard | UIKit - free Swift example code",desc:"How to adjust a UIScrollView to fit the keyboard",link:"https://hackingwithswift.com/example-code/uikit/how-to-adjust-a-uiscrollview-to-fit-the-keyboard",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 2.0")],-1)),o(" TODO: 작성 "),o(`
If your user interface brings up the keyboard, you should respond by adjusting your layout so that all parts are still visible. If you're using a \`UIScrollView\` or any classes that have a scroll view as part of their layout (table views and text views, for example), this means adjusting the \`contentInset\` property to account for the keyboard.

First you need to register for keyboard change notifications. Put this into your \`viewDidLoad()\` method:

\`\`\`swift
let notificationCenter = NotificationCenter.default
notificationCenter.addObserver(self, selector: #selector(adjustForKeyboard), name: UIResponder.keyboardWillHideNotification, object: nil)
notificationCenter.addObserver(self, selector: #selector(adjustForKeyboard), name: UIResponder.keyboardWillChangeFrameNotification, object: nil)
\`\`\`

Now add this method somewhere else in your class:

\`\`\`swift
@objc func adjustForKeyboard(notification: Notification) {
    guard let keyboardValue = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue else { return }

    let keyboardScreenEndFrame = keyboardValue.cgRectValue
    let keyboardViewEndFrame = view.convert(keyboardScreenEndFrame, from: view.window)

    if notification.name == UIResponder.keyboardWillHideNotification {
        yourTextView.contentInset = .zero
    } else {
        yourTextView.contentInset = UIEdgeInsets(top: 0, left: 0, bottom: keyboardViewEndFrame.height - view.safeAreaInsets.bottom, right: 0)
    }

    yourTextView.scrollIndicatorInsets = yourTextView.contentInset

    let selectedRange = yourTextView.selectedRange
    yourTextView.scrollRangeToVisible(selectedRange)
}
\`\`\`

That example code is for adjusting text views. If you want it to apply to a regular scroll view, just take out the last two lines - they are in there so that the text view readjusts itself so the user doesn't lose their place while editing.

**Note:** It’s important to subtract \`view.safeAreaInsets.bottom\` from the keyboard height to avoid making your text view too small on devices with a home indicator.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/example-code/uikit/how-to-adjust-image-content-mode-using-aspect-fill-aspect-fit-and-scaling">How to adjust image content mode using aspect fill, aspect fit and scaling 
/example-code/uikit/how-to-support-pinch-to-zoom-in-a-uiscrollview">How to support pinch to zoom in a UIScrollView 
/example-code/uikit/how-to-change-the-scroll-indicator-inset-for-a-uiscrollview">How to change the scroll indicator inset for a UIScrollView 
/example-code/uikit/how-to-find-an-aspect-fit-images-size-inside-an-image-view">How to find an aspect fit image’s size inside an image view 
/example-code/libraries/how-to-make-empty-uitableviews-look-more-attractive-using-dznemptydataset">How to make empty UITableViews look more attractive using DZNEmptyDataSet</a>
`)],-1))])}const b=l(m,[["render",f],["__file","how-to-adjust-a-uiscrollview-to-fit-the-keyboard.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-adjust-a-uiscrollview-to-fit-the-keyboard.html","title":"How to adjust a UIScrollView to fit the keyboard","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to adjust a UIScrollView to fit the keyboard","description":"Article(s) > How to adjust a UIScrollView to fit the keyboard","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to adjust a UIScrollView to fit the keyboard"},{"property":"og:description","content":"How to adjust a UIScrollView to fit the keyboard"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-adjust-a-uiscrollview-to-fit-the-keyboard.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-adjust-a-uiscrollview-to-fit-the-keyboard.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to adjust a UIScrollView to fit the keyboard"}],["meta",{"property":"og:description","content":"Article(s) > How to adjust a UIScrollView to fit the keyboard"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to adjust a UIScrollView to fit the keyboard\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.75,"words":526},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-adjust-a-uiscrollview-to-fit-the-keyboard.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,k as data};
