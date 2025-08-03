import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as p,f as e,av as c,au as i,aw as r,ax as n,b as o,r as w,o as u}from"./app-CCjNjKMa.js";const h={},f={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function d(s,t){const a=w("VPCard");return u(),p("div",null,[e("h1",f,[e("a",g,[e("span",null,c(s.$frontmatter.title)+" 관련",1)])]),i(a,r(n({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),i(a,r(n({title:"How to use SFSafariViewController to show web pages in your app | UIKit - free Swift example code",desc:"How to use SFSafariViewController to show web pages in your app",link:"https://hackingwithswift.com/example-code/uikit/how-to-use-sfsafariviewcontroller-to-show-web-pages-in-your-app",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 9.0")],-1)),o(" TODO: 작성 "),o(`
If a user clicks a web link in your app, you used to have two options before iOS 9.0 came along: exit your app and launch the web page in Safari, or bring up a new web view controller that you've designed, along with various user interface controls. Exiting your app is rarely what users want, so unsurprisingly lots of app ended up creating mini-Safari experiences to browse inside their app.

As of iOS 9.0, Apple allows you to embed Safari right into your app, which means you get its great user interface, you get its access to stored user data, and you even get Reader Mode right out of the box. To get started, import the SafariServices framework into your view controller, like this:

\`\`\`swift
import SafariServices
\`\`\`

Now make your view controller conform to the \`SFSafariViewControllerDelegate\` protocol, then give it a try:

\`\`\`swift
let urlString = "https://www.hackingwithswift.com"

if let url = URL(string: urlString) {
    let vc = SFSafariViewController(url: url, entersReaderIfAvailable: true)
    vc.delegate = self

    present(vc, animated: true)
}
\`\`\`

That's all it takes to launch Safari inside your app now – cool, huh? We need to assign ourselves as the delegate of the Safari view controller because when the user taps "Done" inside Safari we should dismiss it and take any other appropriate action.

To do that, add this method to your view controller:

\`\`\`swift
func safariViewControllerDidFinish(_ controller: SFSafariViewController) {
    dismiss(animated: true)
}
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/system/how-to-run-code-when-your-app-is-terminated">How to run code when your app is terminated 
/quick-start/swiftui/how-to-create-scrolling-pages-of-content-using-tabviewstyle">How to create scrolling pages of content using tabViewStyle() 
/example-code/uikit/how-to-change-your-app-icon-dynamically-with-setalternateiconname">How to change your app icon dynamically with setAlternateIconName() 
/quick-start/swiftui/how-to-open-web-links-in-safari">How to open web links in Safari 
/example-code/uikit/how-to-localize-your-ios-app">How to localize your iOS app</a>
`)],-1))])}const S=l(h,[["render",d],["__file","how-to-use-sfsafariviewcontroller-to-show-web-pages-in-your-app.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-use-sfsafariviewcontroller-to-show-web-pages-in-your-app.html","title":"How to use SFSafariViewController to show web pages in your app","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to use SFSafariViewController to show web pages in your app","description":"Article(s) > How to use SFSafariViewController to show web pages in your app","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-9.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to use SFSafariViewController to show web pages in your app"},{"property":"og:description","content":"How to use SFSafariViewController to show web pages in your app"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-use-sfsafariviewcontroller-to-show-web-pages-in-your-app.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-use-sfsafariviewcontroller-to-show-web-pages-in-your-app.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to use SFSafariViewController to show web pages in your app"}],["meta",{"property":"og:description","content":"Article(s) > How to use SFSafariViewController to show web pages in your app"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-9.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to use SFSafariViewController to show web pages in your app\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.74,"words":521},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-use-sfsafariviewcontroller-to-show-web-pages-in-your-app.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{S as comp,b as data};
