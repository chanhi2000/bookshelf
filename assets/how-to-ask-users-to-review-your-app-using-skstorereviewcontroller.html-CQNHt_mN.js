import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as p,f as e,av as u,au as i,aw as n,ax as a,b as o,r as c,o as h}from"./app-n2Oj_rFs.js";const w={},m={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function g(s,t){const r=c("VPCard");return h(),p("div",null,[e("h1",m,[e("a",d,[e("span",null,u(s.$frontmatter.title)+" 관련",1)])]),i(r,n(a({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),i(r,n(a({title:"How to ask users to review your app using SKStoreReviewController | UIKit - free Swift example code",desc:"How to ask users to review your app using SKStoreReviewController",link:"https://hackingwithswift.com/example-code/uikit/how-to-ask-users-to-review-your-app-using-skstorereviewcontroller",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 14.0")],-1)),o(" TODO: 작성 "),o(`
Many apps ask users to review their apps, but it’s increasingly common to see dark patterns such as apps pre-screening users so they get sent to the App Store only if they said they like the app.

To avoid this problem in the future, and also to provide a standardized interface that users can trust, iOS 10.3 brought a built-in way to ask users to review the app, and it couldn’t be much easier to use. In iOS 14 this was upgraded to rely on scenes, so it’s important your code makes the review request on an active scene.

But first, some important information:

1. You *request* that the system show a review dialog, which means the request might be ignored based on internal logic known only to Apple.
<li>Because the request might be ignored, you should *not* trigger the request from a user-facing button saying something like “Leave a review” – it might appear to do nothing at all.
<li>When you are in development, requesting a review will always show the review user interface, but you can’t submit an actual review.
<li>When you are using TestFlight to test your app, requesting a review will do nothing at all.

Once you understand those rules, the process really couldn’t be easier. First, add this \`import\` to your code:

\`\`\`swift
import StoreKit
\`\`\`

Then at some point in your app run this code:

\`\`\`swift
if let scene = UIApplication.shared.connectedScenes.first(where: { $0.activationState == .foregroundActive }) as? UIWindowScene {
    SKStoreReviewController.requestReview(in: scene)
}
\`\`\`

That’s it!

Again, you should *not* call that in response to user input, although if you have any sense you won’t just put it inside \`viewDidAppear()\` in your app.

Instead, consider storing a simple run count for your app using \`UserDefaults\`, then calling the method after your app has been run 10 times. By that point it’s pretty clear the user keeps coming back to your app, so hopefully you have more chance of getting a positive review!

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/how-to-ask-the-user-to-review-your-app">How to ask the user to review your app 
/example-code/system/how-to-run-code-when-your-app-is-terminated">How to run code when your app is terminated 
/example-code/uikit/how-to-localize-your-ios-app">How to localize your iOS app 
/example-code/uikit/how-to-change-your-app-icon-dynamically-with-setalternateiconname">How to change your app icon dynamically with setAlternateIconName() 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks</a>
`)],-1))])}const k=l(w,[["render",g],["__file","how-to-ask-users-to-review-your-app-using-skstorereviewcontroller.html.vue"]]),f=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-ask-users-to-review-your-app-using-skstorereviewcontroller.html","title":"How to ask users to review your app using SKStoreReviewController","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to ask users to review your app using SKStoreReviewController","description":"Article(s) > How to ask users to review your app using SKStoreReviewController","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-14.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to ask users to review your app using SKStoreReviewController"},{"property":"og:description","content":"How to ask users to review your app using SKStoreReviewController"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-ask-users-to-review-your-app-using-skstorereviewcontroller.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-ask-users-to-review-your-app-using-skstorereviewcontroller.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to ask users to review your app using SKStoreReviewController"}],["meta",{"property":"og:description","content":"Article(s) > How to ask users to review your app using SKStoreReviewController"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-14.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2023-01-22T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to ask users to review your app using SKStoreReviewController\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-01-22T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2023-01-22T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":2.03,"words":608},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-ask-users-to-review-your-app-using-skstorereviewcontroller.md","localizedDate":"2023년 1월 22일","excerpt":"\\n"}');export{k as comp,f as data};
