import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as t,as as u,ao as i,at as a,au as r,ak as n,aq as h,ar as f}from"./app-CVhcaaOv.js";const d={},p={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function m(s,e){const o=h("VPCard");return f(),l("div",null,[t("h1",p,[t("a",g,[t("span",null,u(s.$frontmatter.title)+" 관련",1)])]),i(o,a(r({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),i(o,a(r({title:"How to set local alerts using UNNotificationCenter | System - free Swift example code",desc:"How to set local alerts using UNNotificationCenter",logo:"https://hackingwithswift.com/favicon.svg",link:"https://hackingwithswift.com/example-code/how-to-set-local-alerts-using-unnotificationcenter",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),n(" TODO: 작성 "),n(` 
Local notifications are messages that appear on the user's lock screen when your app isn't running. The user can then swipe to unlock their device and go straight to your app, at which point you can act on the notification.

All this is done using the User Notifications framework, so import that now:

\`\`\`swift
import UserNotifications
\`\`\`

To begin with, you need to ask for permission in order to show messages on the lock screen. Here's how that's done:

\`\`\`swift
let center = UNUserNotificationCenter.current()

center.requestAuthorization(options: [.alert, .badge, .sound]) { (granted, error) in
    if granted {
        print("Yay!")
    } else {
        print("D'oh")
    }
}
\`\`\`

That will show an alert to the user asking them if they want to let you show notifications. When it comes to scheduling a notification, you need to choose a trigger (when to show) and content (what to show), then combine them together into a single request. 

Here's the code required to show a local notification:

\`\`\`swift
func scheduleNotification() {
    let center = UNUserNotificationCenter.current()

    let content = UNMutableNotificationContent()
    content.title = "Late wake up call"
    content.body = "The early bird catches the worm, but the second mouse gets the cheese."
    content.categoryIdentifier = "alarm"
    content.userInfo = ["customData": "fizzbuzz"]
    content.sound = UNNotificationSound.default

    var dateComponents = DateComponents()
    dateComponents.hour = 10
    dateComponents.minute = 30
    let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 5, repeats: false)

    let request = UNNotificationRequest(identifier: UUID().uuidString, content: content, trigger: trigger)
    center.add(request)
}
\`\`\`

The \`trigger\` constant is being created using a time interval, which means this notification will appear five seconds after you schedule it. 

If you want a specific time, use \`UNCalendarNotificationTrigger\` instead, like this:

\`\`\`swift
var dateComponents = DateComponents()
dateComponents.hour = 10
dateComponents.minute = 30
let trigger = UNCalendarNotificationTrigger(dateMatching: dateComponents, repeats: true)
\`\`\`

That will show an alert at 10:30am every day, because its \`repeats\` property is set to true.

The notification request code above also set a \`userInfo\` property on the notification, which is a dictionary where you can store any kind of context data you want. This dictionary gets given back to you when the user unlocks their device using your notification, so you can act on the alert in a meaningful way.

If you want to attach custom buttons to your notification, you need to use the \`UNNotificationAction\` class, then register various actions against a category string. We used the category identifier string of “alarm” above, so we could attach a button to that category like this:

\`\`\`swift
func registerCategories() {
    let center = UNUserNotificationCenter.current()
    center.delegate = self

    let show = UNNotificationAction(identifier: "show", title: "Tell me more…", options: .foreground)
    let category = UNNotificationCategory(identifier: "alarm", actions: [show], intentIdentifiers: [])

    center.setNotificationCategories([category])
}
\`\`\`

Note that that code sets \`self\` to be the delegate for the notification center, so you’ll need to make your view controller conform to the \`UNUserNotificationCenterDelegate\` protocol.

When a message comes in, your delegate will get notified and you can take the appropriate action. We gave the “Tell me more…” button the identifier “show”, so that’s what will be passed to us if the user taps that button. Alternatively, we’ll be sent \`UNNotificationDefaultActionIdentifier\` to mean “the user swiped to unlock using our notification.” 

Here’s some code handling both options:

\`\`\`swift
func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
    // pull out the buried userInfo dictionary
    let userInfo = response.notification.request.content.userInfo

    if let customData = userInfo["customData"] as? String {
        print("Custom data received: \\(customData)")

        switch response.actionIdentifier {
        case UNNotificationDefaultActionIdentifier:
            // the user swiped to unlock
            print("Default identifier")

        case "show":
            // the user tapped our "show more info…" button
            print("Show more information…")
            break

        default:
            break
        }
    }

    // you must call the completion handler when you're done
    completionHandler()
}
\`\`\`

That code also pulls out the \`CustomField1\` value that was set in the \`userInfo\` earlier.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),n(`
/quick-start/swiftui/how-to-show-multiple-alerts-in-a-single-view">How to show multiple alerts in a single view 
/quick-start/concurrency/how-to-create-and-use-task-local-values">How to create and use task local values 
/example-code/language/how-to-use-local-variable-observers">How to use local variable observers 
/example-code/arrays/how-to-count-objects-in-a-set-using-nscountedset">How to count objects in a set using NSCountedSet 
/example-code/language/when-to-use-a-set-rather-than-an-array">When to use a set rather than an array</a>
`)],-1))])}const N=c(d,[["render",m],["__file","how-to-set-local-alerts-using-unnotificationcenter.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-set-local-alerts-using-unnotificationcenter.html","title":"How to set local alerts using UNNotificationCenter","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to set local alerts using UNNotificationCenter","description":"Article(s) > How to set local alerts using UNNotificationCenter","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to set local alerts using UNNotificationCenter"},{"property":"og:description","content":"How to set local alerts using UNNotificationCenter"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-set-local-alerts-using-unnotificationcenter.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-set-local-alerts-using-unnotificationcenter.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to set local alerts using UNNotificationCenter"}],["meta",{"property":"og:description","content":"Article(s) > How to set local alerts using UNNotificationCenter"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to set local alerts using UNNotificationCenter\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.86,"words":859},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-set-local-alerts-using-unnotificationcenter.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{N as comp,b as data};
