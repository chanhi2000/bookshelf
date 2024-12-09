import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as t,t as l,e as i,n,g as a,a as o,r as h,o as w}from"./app-ubLChIzZ.js";const p={},d={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"},f=t("nav",{class:"table-of-contents"},[t("ul")],-1),m=t("hr",null,null,-1),g=t("blockquote",null,[t("p",null,"Available from iOS 7.0")],-1),v=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/how-to-change-the-tint-color-for-individual-list-rows">How to change the tint color for individual list rows 
/example-code/uikit/how-to-mask-one-uiview-using-another-uiview">How to mask one UIView using another UIView 
/quick-start/swiftui/how-to-set-the-background-color-of-list-rows-using-listrowbackground">How to set the background color of list rows using listRowBackground() 
/example-code/calayer/how-to-add-a-border-outline-color-to-a-uiview">How to add a border outline color to a UIView 
/example-code/arrays/how-to-count-objects-in-a-set-using-nscountedset">How to count objects in a set using NSCountedSet</a>
`)],-1);function k(r,y){const e=h("VPCard");return w(),s("div",null,[t("h1",d,[t("a",u,[t("span",null,l(r.$frontmatter.title)+" 관련",1)])]),i(e,n(a({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,m,i(e,n(a({title:"How to set the tint color of a UIView | UIKit - free Swift example code",desc:"How to set the tint color of a UIView",link:"https://hackingwithswift.com/example-code/uikit/how-to-set-the-tint-color-of-a-uiview",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,o(" TODO: 작성 "),o(`
The \`tintColor\` property of any \`UIView\` subclass lets you change the coloring effect applied to it. The exact effect depends on what control you're changing: for navigation bars and tab bars this means the text and icons on their buttons, for text views it means the selection cursor and highlighted text, for progress bars it's the track color, and so on.

\`tintColor\` can be set for any individual view to color just one view, for the whole view in your view controller to color all its subviews, or even for the whole window in your application so that all views and subviews are tinted at once.

To tint just the current view controller, use this code:

\`\`\`swift
override func viewDidLoad() {
    view.tintColor = UIColor.red
}
\`\`\`

If you want to tint all views in your app, put this in your <FontIcon icon="fa-brands fa-swift"/>\`AppDelegate.swift\`:

\`\`\`swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.
    window?.tintColor = UIColor.red

    return true
}
\`\`\`

`),v])}const x=c(p,[["render",k],["__file","how-to-set-the-tint-color-of-a-uiview.html.vue"]]),I=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-set-the-tint-color-of-a-uiview.html","title":"How to set the tint color of a UIView","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to set the tint color of a UIView","description":"Article(s) > How to set the tint color of a UIView","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to set the tint color of a UIView"},{"property":"og:description","content":"How to set the tint color of a UIView"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-set-the-tint-color-of-a-uiview.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-set-the-tint-color-of-a-uiview.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to set the tint color of a UIView"}],["meta",{"property":"og:description","content":"Article(s) > How to set the tint color of a UIView"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to set the tint color of a UIView\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.53,"words":458},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-set-the-tint-color-of-a-uiview.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,I as data};
