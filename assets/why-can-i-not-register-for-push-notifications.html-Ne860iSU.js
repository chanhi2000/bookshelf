import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as t,as as p,ao as n,at as r,au as a,ak as o,aq as h,ar as u}from"./app-DpiNAgkx.js";const f={},g={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function m(s,e){const i=h("VPCard");return u(),l("div",null,[t("h1",g,[t("a",d,[t("span",null,p(s.$frontmatter.title)+" 관련",1)])]),n(i,r(a({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),n(i,r(a({title:"Why can I not register for push notifications? | UIKit - free Swift example code",desc:"Why can I not register for push notifications?",link:"https://hackingwithswift.com/example-code/uikit/why-can-i-not-register-for-push-notifications",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 3.0")],-1)),o(" TODO: 작성 "),o(`
When you register for push notifications, one of two methods ought to be called: \`didRegisterForRemoteNotificationsWithDeviceToken\` is called when everything worked correctly, and \`didFailToRegisterForRemoteNotificationsWithError\` is called if something went wrong.

First, ensure you're correctly registering for push notifications, like this:

\`\`\`swift
UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
    if let error = error {
        print("D'oh: \\(error.localizedDescription)")
    } else {
        application.registerForRemoteNotifications()
    }
}
\`\`\`

You should call that every time your app starts, because the user token can change, and the user can also adjust your app's permissions at any time.

Once you're sure you have registered for notifications, add these two methods to your app delegate:

\`\`\`swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    print("Successfully registered for notifications!")
}

func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
    print("Failed to register for notifications: \\(error.localizedDescription)")
}
\`\`\`

Both of those just print out the status of your push request, which should give you an idea of what's going on. The most common reasons push notification request fail are: 1) you're using the iOS simulator, which does not support push notifications, and 2) your user has denied permission for push messages.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/example-code/uikit/how-to-register-a-cell-for-uitableviewcell-reuse">How to register a cell for UITableViewCell reuse 
/example-code/uikit/how-to-register-a-cell-for-uicollectionview-reuse">How to register a cell for UICollectionView reuse 
/quick-start/swiftui/how-to-push-a-new-view-when-a-list-row-is-tapped">How to push a new view when a list row is tapped 
/example-code/system/how-to-send-notifications-asynchronously-using-notificationqueue">How to send notifications asynchronously using NotificationQueue 
/quick-start/swiftui/how-to-push-a-new-view-onto-a-navigationstack">How to push a new view onto a NavigationStack</a>
`)],-1))])}const k=c(f,[["render",m],["__file","why-can-i-not-register-for-push-notifications.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/why-can-i-not-register-for-push-notifications.html","title":"Why can I not register for push notifications?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Why can I not register for push notifications?","description":"Article(s) > Why can I not register for push notifications?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-3.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Why can I not register for push notifications?"},{"property":"og:description","content":"Why can I not register for push notifications?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/why-can-i-not-register-for-push-notifications.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/why-can-i-not-register-for-push-notifications.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Why can I not register for push notifications?"}],["meta",{"property":"og:description","content":"Article(s) > Why can I not register for push notifications?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-3.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Why can I not register for push notifications?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.54,"words":461},"filePathRelative":"hackingwithswift.com/example-code/uikit/why-can-i-not-register-for-push-notifications.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,v as data};
