import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as d,am as t,as as c,ao as n,at as i,au as r,ak as o,aq as m,ar as h}from"./app-CpYYKbnj.js";const b={},u={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function p(l,a){const e=m("VPCard");return h(),d("div",null,[t("h1",u,[t("a",g,[t("span",null,c(l.$frontmatter.title)+" 관련",1)])]),n(e,i(r({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a[0]||(a[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),a[1]||(a[1]=t("hr",null,null,-1)),n(e,i(r({title:"How to add a bar button to a navigation bar | UIKit - free Swift example code",desc:"How to add a bar button to a navigation bar",link:"https://hackingwithswift.com/example-code/uikit/how-to-add-a-bar-button-to-a-navigation-bar",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a[2]||(a[2]=t("blockquote",null,[t("p",null,"Available from iOS 2.0")],-1)),o(" TODO: 작성 "),o(`
Navigation bars are one of the most common user interface components in iOS, so being able to add buttons to them is something you'll do *a lot*. You can add buttons to the left and right side of a navigation bar, and you can add more than one to either side.

Note: usually bar button items don't belong to the \`UINavigationBar\` directly. Instead, they belong to a \`UINavigationItem\` that is currently active on the navigation bar, which in turn is usually owned by the view controller that is currently active on the screen.

So, to create bar button items for your view controller, you would add code like this to the \`viewDidLoad()\` method of a view controller:

\`\`\`swift
navigationItem.leftBarButtonItem = UIBarButtonItem(barButtonSystemItem: .add, target: self, action: #selector(addTapped))
navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Add", style: .plain, target: self, action: #selector(addTapped))
\`\`\`

That will call the \`addTapped()\` method on the current view controller when either button is tapped. Note that the first one uses a standard system icon (recommended when it's available!) and the second one uses text.

Like I said, you can attach more than one bar button item to either side of the navigation bar, like this:

\`\`\`swift
let add = UIBarButtonItem(barButtonSystemItem: .add, target: self, action: #selector(addTapped))
let play = UIBarButtonItem(title: "Play", style: .plain, target: self, action: #selector(playTapped))

navigationItem.rightBarButtonItems = [add, play]
\`\`\`

Because navigation bar items are attached to view controllers rather than the bar itself, UIKit is able to animate them sliding in and out as view controllers are pushed and popped from a navigation controller – it just replaces the buttons from the existing controller with the buttons from the new controller.

`),a[3]||(a[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/example-code/uikit/how-to-add-a-button-to-a-navigation-bar-using-storyboards">How to add a button to a navigation bar using storyboards 
/example-code/uikit/how-to-customize-a-view-controllers-back-button-on-a-navigation-bar-backbarbuttonitem">How to customize a view controller’s back button on a navigation bar: backBarButtonItem 
/example-code/uikit/how-to-add-multiple-uibarbuttonitem-to-a-navigation-bar-using-rightbarbuttonitems">How to add multiple UIBarButtonItem to a navigation bar using rightBarButtonItems 
/quick-start/swiftui/how-to-add-bar-items-to-a-navigation-view">How to add bar items to a navigation view 
/quick-start/swiftui/how-to-hide-the-tab-bar-navigation-bar-or-other-toolbars">How to hide the tab bar, navigation bar, or other toolbars</a>
`)],-1))])}const v=s(b,[["render",p],["__file","how-to-add-a-bar-button-to-a-navigation-bar.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-add-a-bar-button-to-a-navigation-bar.html","title":"How to add a bar button to a navigation bar","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to add a bar button to a navigation bar","description":"Article(s) > How to add a bar button to a navigation bar","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to add a bar button to a navigation bar"},{"property":"og:description","content":"How to add a bar button to a navigation bar"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-add-a-bar-button-to-a-navigation-bar.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-add-a-bar-button-to-a-navigation-bar.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to add a bar button to a navigation bar"}],["meta",{"property":"og:description","content":"Article(s) > How to add a bar button to a navigation bar"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to add a bar button to a navigation bar\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.96,"words":587},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-add-a-bar-button-to-a-navigation-bar.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,y as data};