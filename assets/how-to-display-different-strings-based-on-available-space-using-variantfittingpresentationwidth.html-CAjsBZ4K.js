import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as t,as as d,ao as a,at as o,au as s,ak as i,aq as g,ar as p}from"./app-BYoUe6Ce.js";const h={},u={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"};function m(r,e){const n=g("VPCard");return p(),c("div",null,[t("h1",u,[t("a",f,[t("span",null,d(r.$frontmatter.title)+" 관련",1)])]),a(n,o(s({title:"Strings - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/strings/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),a(n,o(s({title:"How to display different strings based on available space using variantFittingPresentationWidth() | Strings - free Swift example code",desc:"How to display different strings based on available space using variantFittingPresentationWidth()",link:"https://hackingwithswift.com/example-code/strings/how-to-display-different-strings-based-on-available-space-using-variantfittingpresentationwidth",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 9.0")],-1)),i(" TODO: 작성 "),i(` 
It’s surprisingly easy to configure your project with multiple strings then have it choose one at runtime based on available space.

First, press <kbd>Cmd</kbd>+N in Xcode to make a new file, then choose “Stringsdict file” – this is a property list XML file containing string settings. Name it “Localizable.stringsdict”, so that iOS picks it up automatically.

Right-click on the new Localizable.stringsdict file in your Xcode project, then choose Open As > Source Code so you can see the XML inside. You should see that it ends like this:

\`\`\`swift
</dict>
</plist>
\`\`\`

Add this new XML directly before those two lines:

\`\`\`swift
<key>Login</key>
<dict>
    <key>NSStringVariableWidthRuleType</key>
    <dict>
        <key>100</key>
        <string>Login.</string>
        <key>200</key>
        <string>You must login before continuing.</string>
        <key>300</key>
        <string>Please enter your username and password to continue.</string>
    </dict>
</dict>
\`\`\`

That defines a single string key, “Login”, but provides three size variations: one for very little space (size 100), one for a medium amount of space (size 200), and one for lots of space (size 300). These size integers mean nothing to iOS – you can use any numbers that make sense to you, but increments of 100 leave you lots of space to insert new values in between later on.

Now that you have a width-varying string to work with, you can pass that to \`NSLocalizedString()\`. Note that you must cast the result to an \`NSString\`:

\`\`\`swift
let localized = NSLocalizedString("Login", comment: "Prompt for user to log in.") as NSString
\`\`\`

Finally, call \`variantFittingPresentationWidth()\` with a size integer of your choosing:

\`\`\`swift
label.text = localized.variantFittingPresentationWidth(300)
\`\`\`

That method only exists on \`NSString\`, hence the earlier typecast.

You can pass any integer you want into \`variantFittingPresentationWidth()\` – iOS will automatically resolve it to find the best match in your strings dictionary, counting downwards where necessary. For example, if you tried loading a string with width 500, the 300 string would be returned, but if you tried 299 then the 200 string would be returned.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),i(`
/quick-start/swiftui/how-to-create-a-document-based-app-using-filedocument-and-documentgroup">How to create a document-based app using FileDocument and DocumentGroup 
/quick-start/swiftui/how-to-dynamically-adjust-the-appearance-of-a-view-based-on-its-size-and-location">How to dynamically adjust the appearance of a view based on its size and location 
/quick-start/swiftui/how-to-customize-the-display-mode-of-navigationsplitview">How to customize the display mode of NavigationSplitView 
/example-code/libraries/how-to-display-pdfs-using-pdfview">How to display PDFs using PDFView 
/quick-start/swiftui/how-to-automatically-switch-between-hstack-and-vstack-based-on-size-class">How to automatically switch between HStack and VStack based on size class</a>
`)],-1))])}const b=l(h,[["render",m],["__file","how-to-display-different-strings-based-on-available-space-using-variantfittingpresentationwidth.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/strings/how-to-display-different-strings-based-on-available-space-using-variantfittingpresentationwidth.html","title":"How to display different strings based on available space using variantFittingPresentationWidth()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to display different strings based on available space using variantFittingPresentationWidth()","description":"Article(s) > How to display different strings based on available space using variantFittingPresentationWidth()","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-9.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to display different strings based on available space using variantFittingPresentationWidth()"},{"property":"og:description","content":"How to display different strings based on available space using variantFittingPresentationWidth()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/strings/how-to-display-different-strings-based-on-available-space-using-variantfittingpresentationwidth.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/strings/how-to-display-different-strings-based-on-available-space-using-variantfittingpresentationwidth.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to display different strings based on available space using variantFittingPresentationWidth()"}],["meta",{"property":"og:description","content":"Article(s) > How to display different strings based on available space using variantFittingPresentationWidth()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-9.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to display different strings based on available space using variantFittingPresentationWidth()\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.16,"words":648},"filePathRelative":"hackingwithswift.com/example-code/strings/how-to-display-different-strings-based-on-available-space-using-variantfittingpresentationwidth.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{b as comp,v as data};
