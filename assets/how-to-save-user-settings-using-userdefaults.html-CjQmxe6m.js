import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as e,t as d,e as t,n as o,g as n,a as s,r as i,o as h}from"./app-TWLwS86W.js";const f={},g={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"},m=e("nav",{class:"table-of-contents"},[e("ul")],-1),y=e("hr",null,null,-1),w=e("blockquote",null,[e("p",null,"Available from iOS 2.0")],-1),v=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),s(`
/example-code/system/how-to-load-and-save-a-struct-in-userdefaults-using-codable">How to load and save a struct in UserDefaults using Codable 
/quick-start/swiftui/how-to-create-multi-column-lists-using-table">How to create multi-column lists using Table 
/example-code/system/how-to-store-userdefaults-options-in-icloud">How to store UserDefaults options in iCloud 
/quick-start/swiftui/how-to-save-and-load-navigationstack-paths-using-codable">How to save and load NavigationStack paths using Codable 
/example-code/media/how-to-save-a-uiimage-to-a-file-using-jpegdata-and-pngdata">How to save a UIImage to a file using jpegData() and pngData()</a>
`)],-1);function b(r,k){const a=i("VPCard"),l=i("VidStack");return h(),c("div",null,[e("h1",g,[e("a",p,[e("span",null,d(r.$frontmatter.title)+" 관련",1)])]),t(a,o(n({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),m,y,t(a,o(n({title:"How to save user settings using UserDefaults | System - free Swift example code",desc:"How to save user settings using UserDefaults",logo:"https://hackingwithswift.com/favicon.svg",link:"https://hackingwithswift.com/example-code/how-to-save-user-settings-using-userdefaults",background:"rgba(174,10,10,0.2)"})),null,16),w,t(l,{src:"youtube/HxVOahmfwz0"}),s(" TODO: 작성 "),s(` 
All iOS apps have a built in data dictionary that stores small amounts of user settings for as long as the app is installed. This system, called \`UserDefaults\` can save integers, booleans, strings, arrays, dictionaries, dates and more, but you should be careful not to save too much data because it will slow the launch of your app.

Here's an example of setting some values:

\`\`\`swift
let defaults = UserDefaults.standard
defaults.set(25, forKey: "Age")
defaults.set(true, forKey: "UseTouchID")
defaults.set(CGFloat.pi, forKey: "Pi")

defaults.set("Paul Hudson", forKey: "Name")
defaults.set(Date.now, forKey: "LastRun")
\`\`\`

When you set values like that, they become permanent – you can quit the app then re-launch and they'll still be there, so it's the ideal way to store app configuration data. As an advance warning, you might find some old tutorials recommend calling the \`synchronize()\` method to force your data to save, but Apple has asked us not to do that for some years now.

As mentioned, you can use \`UserDefaults\` to store arrays and dictionaries, like this:

\`\`\`swift
let array = ["Hello", "World"]
defaults.set(array, forKey: "SavedArray")

let dict = ["Name": "Paul", "Country": "UK"]
defaults.set(dict, forKey: "SavedDict")
\`\`\`

When it comes to reading data back, it's still easy but has an important proviso: \`UserDefaults\` will return a default value if the setting can't be found. You need to know what these default values are so that you don't confuse them with real values that you set. Here they are:

- \`integer(forKey:)\` returns an integer if the key existed, or 0 if not.
<li>\`bool(forKey:)\` returns a boolean if the key existed, or false if not.
<li>\`float(forKey:)\` returns a float if the key existed, or 0.0 if not.
<li>\`double(forKey:)\` returns a double if the key existed, or 0.0 if not.
<li>\`object(forKey:)\` returns \`AnyObject?\` so you need to conditionally typecast it to your data type.

With that in mind, you can read values back like this:

\`\`\`swift
let age = defaults.integer(forKey: "Age")
let useTouchID = defaults.bool(forKey: "UseTouchID")
let pi = defaults.double(forKey: "Pi")
\`\`\`

When retrieving objects, the result is optional. This means you can either accept the optionality, or typecast it to a non-optional type and use the nil coalescing operator to handle missing values. For example:

\`\`\`swift
let savedArray = defaults.object(forKey: "SavedArray") as? [String] ?? [String]()
\`\`\`

`),v])}const x=u(f,[["render",b],["__file","how-to-save-user-settings-using-userdefaults.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-save-user-settings-using-userdefaults.html","title":"How to save user settings using UserDefaults","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to save user settings using UserDefaults","description":"Article(s) > How to save user settings using UserDefaults","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to save user settings using UserDefaults"},{"property":"og:description","content":"How to save user settings using UserDefaults"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-save-user-settings-using-userdefaults.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-save-user-settings-using-userdefaults.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to save user settings using UserDefaults"}],["meta",{"property":"og:description","content":"Article(s) > How to save user settings using UserDefaults"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to save user settings using UserDefaults\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.2,"words":661},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-save-user-settings-using-userdefaults.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{x as comp,S as data};
