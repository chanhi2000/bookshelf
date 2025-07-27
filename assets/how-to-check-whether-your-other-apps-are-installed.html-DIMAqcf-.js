import{_ as h}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as e,av as l,au as r,aw as n,ax as i,b as o,r as p,o as d}from"./app-n2Oj_rFs.js";const m={},u={id:"frontmatter-title-관련",tabindex:"-1"},y={class:"header-anchor",href:"#frontmatter-title-관련"};function w(s,t){const a=p("VPCard");return d(),c("div",null,[e("h1",u,[e("a",y,[e("span",null,l(s.$frontmatter.title)+" 관련",1)])]),r(a,n(i({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),r(a,n(i({title:"How to check whether your other apps are installed | System - free Swift example code",desc:"How to check whether your other apps are installed",link:"https://hackingwithswift.com/example-code/system/how-to-check-whether-your-other-apps-are-installed",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 9.0")],-1)),o(" TODO: 작성 "),o(` 
iOS lets you check for the existence of other apps, but you do need to declare them in your Info.plist file, and you may need to provide an explanation to the App Review team if you try to query too many apps or apps that aren’t yours.

The key here is to give each of your apps a custom URL scheme. So, your first app might use “myapp1://“, your second app might use “myapp2://”, and so on. You don’t actually need to *use* these URLs, and they ought to be unique, so you should make them prefixed with your company name to be sure.

To try it out, right-click on your Info.plist file and choose Open As > Source Code. The file should end like this:

\`\`\`swift
</dict>
</plist>
\`\`\`

I’d like you to paste this XML directly before those lines:

\`\`\`swift
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>myapp1</string>
    <string>myapp2</string>
</array>
\`\`\`

That registers two URL schemes, “myapp1://” and “myapp2://”, with iOS, which means you can now try to read them.

With that done, you can now add code like this to check whether the system is able to respond to “myapp1://” URLs:

\`\`\`swift
UIApplication.shared.canOpenURL(URL(string: "myapp1://test")!)
\`\`\`

If that returns true it means the app responsible for “myapp1://” is installed on the system, which means you know for sure the user has that other app installed.

**Note:** Even though you own both apps and could easily have replicated this finding using server analytics, doing it client-side might seem sketchy to some users. Be sensible and have a clear, complete privacy policy that says exactly what you want do.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/system/how-to-run-code-when-your-app-is-terminated">How to run code when your app is terminated 
/example-code/language/how-to-check-whether-a-module-is-available-using-canimport">How to check whether a module is available using canImport() 
/example-code/uikit/how-to-check-whether-an-iphone-or-ipad-is-upside-down-or-face-up">How to check whether an iPhone or iPad is upside down or face up 
/example-code/language/check-whether-all-items-in-an-array-match-a-condition">Check whether all items in an array match a condition 
/example-code/language/how-to-check-whether-an-integer-lies-inside-a-range">How to check whether an integer lies inside a range</a>
`)],-1))])}const k=h(m,[["render",w],["__file","how-to-check-whether-your-other-apps-are-installed.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-check-whether-your-other-apps-are-installed.html","title":"How to check whether your other apps are installed","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to check whether your other apps are installed","description":"Article(s) > How to check whether your other apps are installed","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-9.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to check whether your other apps are installed"},{"property":"og:description","content":"How to check whether your other apps are installed"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-check-whether-your-other-apps-are-installed.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-check-whether-your-other-apps-are-installed.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to check whether your other apps are installed"}],["meta",{"property":"og:description","content":"Article(s) > How to check whether your other apps are installed"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-9.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to check whether your other apps are installed\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.93,"words":578},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-check-whether-your-other-apps-are-installed.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{k as comp,b as data};
