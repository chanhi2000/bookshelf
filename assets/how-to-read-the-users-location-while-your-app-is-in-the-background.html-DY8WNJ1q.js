import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,f as t,av as h,au as n,aw as i,ax as r,b as e,r as u,o as p}from"./app-C2w16SxA.js";const d={},g={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"};function m(s,o){const a=u("VPCard");return p(),l("div",null,[t("h1",g,[t("a",w,[t("span",null,h(s.$frontmatter.title)+" 관련",1)])]),n(a,i(r({title:"Location - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/location/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[0]||(o[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),o[1]||(o[1]=t("hr",null,null,-1)),n(a,i(r({title:"How to read the user’s location while your app is in the background | Location - free Swift example code",desc:"How to read the user’s location while your app is in the background",link:"https://hackingwithswift.com/example-code/location/how-to-read-the-users-location-while-your-app-is-in-the-background",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[2]||(o[2]=t("blockquote",null,[t("p",null,"Available from iOS 11.0")],-1)),e(" TODO: 작성 "),e(` 
iOS has had the ability to track locations in the background for some time, but the permission system changed in iOS 8 then again in iOS 11 as Apple has tried to stop unscrupulous apps abusing private information.

Reading the user’s location in the background takes a few steps. First, open your Info.plist file, add key called “Privacy - Location Always and When In Use Usage Description” and "Privacy - Location When In Use Usage Description”, then give both of them whatever text you want to show to users when you ask for their location. They are both required, because iOS always allows user to restrict location access to when your app is in use.

Now open whichever controller you want to use to look for the user’s location, and add this import:

\`\`\`swift
import CoreLocation
\`\`\`

You need to tell Swift that your class conforms to the \`CLLocationManagerDelegate\` protocol so that you can start to receive location updates.

Location tracking is done using the \`CLLocationManager\` class, which is also responsible for requesting location permission from users. You need to create a property for this in your class so that you can store the active location manager, so add this:

\`\`\`swift
var locationManager: CLLocationManager?
\`\`\`

If you're using a view controller, you'll probably want to initialize this property in \`viewDidLoad()\`, like this:

\`\`\`swift
override func viewDidLoad() {
    super.viewDidLoad()

    locationManager = CLLocationManager()
    locationManager?.delegate = self
    locationManager?.requestAlwaysAuthorization()
}
\`\`\`

Once you request permission to use your user's location, they'll see an alert with the message you wrote earlier. When they make a choice you'll get a delegate callback called \`didChangeAuthorization\`, at which point you can check whether they are authorized you or not:

\`\`\`swift
func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
    if status == .authorizedAlways {
        // you're good to go!
    }
}
\`\`\`

If you’re able to fall back to using location only when your app is in use, you should add a second check to the code above just in case the user didn’t select the option you wanted.

The final step is to tell Xcode that we want location updates to continue being delivered while the app is in the background. Select your project using the project navigator, then find your app’s target and choose the Capabilities tab. You need to enable Background Modes, then check the box marked “Location updates”.

That’s all the code done now, so you can go ahead and implement the \`didUpdateLocations\` method and wait for it to be called. Something like this ought to get you started:

\`\`\`swift
func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    if let location = locations.last {
        print("New location is \\(location)")
    }
}
\`\`\`

`),o[3]||(o[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/system/how-to-run-code-when-your-app-is-terminated">How to run code when your app is terminated 
/example-code/games/how-to-find-a-touchs-location-in-a-node-using-locationin">How to find a touch's location in a node using location(in:) 
/example-code/uikit/how-to-find-a-touchs-location-in-a-view-with-locationin">How to find a touch's location in a view with location(in:) 
/example-code/uikit/how-to-localize-your-ios-app">How to localize your iOS app 
/quick-start/swiftui/how-to-read-the-users-location-using-locationbutton">How to read the user’s location using LocationButton</a>
`)],-1))])}const k=c(d,[["render",m],["__file","how-to-read-the-users-location-while-your-app-is-in-the-background.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/location/how-to-read-the-users-location-while-your-app-is-in-the-background.html","title":"How to read the user’s location while your app is in the background","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to read the user’s location while your app is in the background","description":"Article(s) > How to read the user’s location while your app is in the background","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-11.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to read the user’s location while your app is in the background"},{"property":"og:description","content":"How to read the user’s location while your app is in the background"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/location/how-to-look-up-a-location-with-mklocalsearchrequest.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/location/how-to-read-the-users-location-while-your-app-is-in-the-background.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to read the user’s location while your app is in the background"}],["meta",{"property":"og:description","content":"Article(s) > How to read the user’s location while your app is in the background"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-11.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to read the user’s location while your app is in the background\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.54,"words":763},"filePathRelative":"hackingwithswift.com/example-code/location/how-to-read-the-users-location-while-your-app-is-in-the-background.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,b as data};
