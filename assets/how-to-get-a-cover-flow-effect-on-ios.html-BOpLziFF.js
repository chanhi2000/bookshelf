import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as s,am as e,as as f,ao as a,at as n,au as r,ak as o,aq as d,ar as h}from"./app-J50hDzMj.js";const u={},w={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function p(l,t){const i=d("VPCard");return h(),s("div",null,[e("h1",w,[e("a",m,[e("span",null,f(l.$frontmatter.title)+" 관련",1)])]),a(i,n(r({title:"Libraries - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/libraries/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),a(i,n(r({title:"How to get a Cover Flow effect on iOS | Libraries - free Swift example code",desc:"How to get a Cover Flow effect on iOS",link:"https://hackingwithswift.com/example-code/libraries/how-to-get-a-cover-flow-effect-on-ios",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 5.0")],-1)),o(" TODO: 작성 "),o(` 
You can get an instant Cover Flow effect on iOS by using the marvelous and free iCarousel library. You can download it from <a href="https://github.com/nicklockwood/iCarousel">https://github.com/nicklockwood/iCarousel</a> and drop it into your Xcode project fairly easily by adding a bridging header (it's written in Objective-C).

If you haven't added Objective-C code to a Swift project before, follow these steps:

- <a href="https://github.com/nicklockwood/iCarousel">Download iCarousel</a> and unzip it
<li>Go into the folder you unzipped, open its iCarousel subfolder, then select iCarousel.h and iCarousel.m and drag them into your project navigation – that's the left pane in Xcode. Just below Info.plist is fine.
<li>Check "Copy items if needed" then click Finish.
<li>Xcode will prompt you with the message "Would you like to configure an Objective-C bridging header?" Click "Create Bridging Header"
<li>You should see a new file in your project, named YourProjectName-Bridging-Header.h.
<li>Add this line to the file: \`#import "iCarousel.h"\`

Once you've added iCarousel to your project you can start using it. Make sure you conform to both the \`iCarouselDelegate\` and \`iCarouselDataSource\` protocols.

Here's a complete, albeit simplified, example:

\`\`\`swift
override func viewDidLoad() {
    super.viewDidLoad()

    let carousel = iCarousel(frame: CGRect(x: 0, y: 0, width: 300, height: 200))
    carousel.dataSource = self
    carousel.type = .coverFlow
    view.addSubview(carousel)

}

func numberOfItems(in carousel: iCarousel) -> Int {
    return 10
}

func carousel(_ carousel: iCarousel, viewForItemAt index: Int, reusing view: UIView?) -> UIView {
    let imageView: UIImageView

    if view != nil {
        imageView = view as! UIImageView
    } else {
        imageView = UIImageView(frame: CGRect(x: 0, y: 0, width: 128, height: 128))
    }

    imageView.image = UIImage(named: "example")

    return imageView
}
\`\`\`

That example loads the same image for all 10 carousel slides, so you'll need to change that to load data from your app.

If you have the time, do check out the other carousel types that iCarousel offers – they're quite remarkable!

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/how-to-create-3d-effects-like-cover-flow-using-scrollview-and-geometryreader">How to create 3D effects like Cover Flow using ScrollView and GeometryReader 
/example-code/uikit/how-to-create-a-page-curl-effect-using-uipageviewcontroller">How to create a page curl effect using UIPageViewController 
/example-code/calayer/how-to-create-a-marching-ants-effect-using-linedashphase">How to create a marching ants effect using lineDashPhase 
/quick-start/swiftui/how-to-add-visual-effect-blurs">How to add visual effect blurs 
/example-code/uikit/how-to-flip-a-uiview-with-a-3d-effect-transitionwith">How to flip a UIView with a 3D effect: transition(with:)</a>
`)],-1))])}const y=c(u,[["render",p],["__file","how-to-get-a-cover-flow-effect-on-ios.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/libraries/how-to-get-a-cover-flow-effect-on-ios.html","title":"How to get a Cover Flow effect on iOS","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to get a Cover Flow effect on iOS","description":"Article(s) > How to get a Cover Flow effect on iOS","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-5.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to get a Cover Flow effect on iOS"},{"property":"og:description","content":"How to get a Cover Flow effect on iOS"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/libraries/how-to-get-a-cover-flow-effect-on-ios.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/libraries/how-to-get-a-cover-flow-effect-on-ios.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to get a Cover Flow effect on iOS"}],["meta",{"property":"og:description","content":"Article(s) > How to get a Cover Flow effect on iOS"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-5.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to get a Cover Flow effect on iOS\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.99,"words":598},"filePathRelative":"hackingwithswift.com/example-code/libraries/how-to-get-a-cover-flow-effect-on-ios.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,b as data};
