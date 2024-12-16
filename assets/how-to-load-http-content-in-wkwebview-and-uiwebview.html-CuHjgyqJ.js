import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as s,am as e,as as c,ao as n,at as a,au as r,ak as o,aq as p,ar as d}from"./app-gTf-Epb-.js";const h={},m={id:"frontmatter-title-관련",tabindex:"-1"},b={class:"header-anchor",href:"#frontmatter-title-관련"};function u(w,t){const i=p("VPCard");return d(),s("div",null,[e("h1",m,[e("a",b,[e("span",null,c(w.$frontmatter.title)+" 관련",1)])]),n(i,a(r({title:"WKWebView - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/wkwebview/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(i,a(r({title:"How to load HTTP content in WKWebView and UIWebView | WKWebView - free Swift example code",desc:"How to load HTTP content in WKWebView and UIWebView",link:"https://hackingwithswift.com/example-code/wkwebview/how-to-load-http-content-in-wkwebview-and-uiwebview",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 9.0")],-1)),o(" TODO: 작성 "),o(` 
App Transport Security (ATS) normally doesn’t allow our apps to connect to HTTP servers, but there’s a special exception you can add to allow \`UIWebView\` and \`WKWebView\` to load insecure content.

Like all all ATS settings, this is configured inside your application's Info.plist file, and this is one of the very few times when editing your plist as source code is faster than trying to use the GUI editor in Xcode. So, right-click on your Info.plist and choose Open As > Source Code.

Your plist should end like this:

\`\`\`swift
</dict>
</plist>
\`\`\`

Just before that, I'd like you to paste this:

\`\`\`swift
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoadsInWebContent</key>
    <true/>
</dict>
\`\`\`

That tells ATS to allow Apple’s web views to access any content, secure or otherwise.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/uikit/how-to-load-a-html-string-into-a-wkwebview-or-uiwebview-loadhtmlstring">How to load a HTML string into a WKWebView or UIWebView: loadHTMLString() 
/example-code/wkwebview/whats-the-difference-between-uiwebview-and-wkwebview">What's the difference between UIWebView and WKWebView? 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/uikit/how-to-stop-users-selecting-text-in-a-uiwebview-or-wkwebview">How to stop users selecting text in a UIWebView or WKWebView</a>
`)],-1))])}const k=l(h,[["render",u],["__file","how-to-load-http-content-in-wkwebview-and-uiwebview.html.vue"]]),W=JSON.parse('{"path":"/hackingwithswift.com/example-code/wkwebview/how-to-load-http-content-in-wkwebview-and-uiwebview.html","title":"How to load HTTP content in WKWebView and UIWebView","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to load HTTP content in WKWebView and UIWebView","description":"Article(s) > How to load HTTP content in WKWebView and UIWebView","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-9.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to load HTTP content in WKWebView and UIWebView"},{"property":"og:description","content":"How to load HTTP content in WKWebView and UIWebView"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/wkwebview/how-to-load-http-content-in-wkwebview-and-uiwebview.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/wkwebview/how-to-load-http-content-in-wkwebview-and-uiwebview.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to load HTTP content in WKWebView and UIWebView"}],["meta",{"property":"og:description","content":"Article(s) > How to load HTTP content in WKWebView and UIWebView"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-9.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to load HTTP content in WKWebView and UIWebView\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.35,"words":406},"filePathRelative":"hackingwithswift.com/example-code/wkwebview/how-to-load-http-content-in-wkwebview-and-uiwebview.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,W as data};
