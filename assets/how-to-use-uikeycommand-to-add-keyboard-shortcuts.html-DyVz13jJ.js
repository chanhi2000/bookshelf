import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as t,av as l,au as s,aw as r,ax as i,b as o,r as h,o as u}from"./app-Bhu0350G.js";const m={},y={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"};function k(n,e){const a=h("VPCard");return u(),c("div",null,[t("h1",y,[t("a",p,[t("span",null,l(n.$frontmatter.title)+" 관련",1)])]),s(a,r(i({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),s(a,r(i({title:"How to use UIKeyCommand to add keyboard shortcuts | UIKit - free Swift example code",desc:"How to use UIKeyCommand to add keyboard shortcuts",link:"https://hackingwithswift.com/example-code/uikit/how-to-use-uikeycommand-to-add-keyboard-shortcuts",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 7.0")],-1)),o(" TODO: 작성 "),o(`
Anyone who connects a keyboard to their iOS device is immediately able to take advantage of keyboard shortcuts – both at the system level and inside apps.

If you want your own apps to respond to shortcuts, as well as advertise those shortcuts to users, you need just one class: \`UIKeyCommand\`. You attach an array of these to each view controller that should respond to keyboard shortcuts, and iOS will take care of advertising and responding to them.

The basic use of \`UIKeyCommand\` is this:

\`\`\`swift
let search = UIKeyCommand(input: "f", modifierFlags: .command, action: #selector(findFriends), discoverabilityTitle: "Find Friends")
\`\`\`

That takes four parameters in total: the input string to read, modifier flags, a selector, and a discoverability title. Let’s break them down…

First, the input string is the actual alphanumeric key that must be pressed in order to trigger your shortcut. You can specify literals here such as “f”, “t”, or “3”, or use constants such as \`UIKeyInputUpArrow\`, \`UIKeyInputLeftArrow\`, or \`UIKeyInputEscape\`.

Second, the modifier flags parameter accepts an option set of key modifiers. We’re using \`.command\` above to make <kbd>Cmd</kbd>+F a shortcut, but we could easily have used \`[.command, .shift]\` to make <kbd>Cmd</kbd>+<kbd>Shift</kbd>+F a shortcut.

Third, the selector parameter determines what code is run when the shortcut is triggered – the code above will call a \`findFriends()\` method on your view controller when <kbd>Cmd</kbd>+F is pressed. Because this is called from the Objective-C runtime you’ll need to mark it \`@objc\`, like this:

\`\`\`swift
@objc func findFriends() {
    // your code here
}
\`\`\`

Finally, the discoverability title is there to control what is shown to users. Because there’s no natural on-screen place to discover keyboard shortcuts, iOS has a simple shortcut: users holding down the Cmd key will see an on-screen popup with your shortcuts and discoverability titles.

Once you’ve decided on your list of keyboard shortcuts, return them all from the \`keyCommands\` property of your view controller, like this:

\`\`\`swift
override var keyCommands: [UIKeyCommand]? {
    return [
        UIKeyCommand(input: "f", modifierFlags: .command, action: #selector(findFriends), discoverabilityTitle: "Find Friends")
    ]
}
\`\`\`

iOS will automatically call that whenever the user holds down the Cmd key to show the shortcut list, or whenever they attempt to activate a shortcut. This means you can update it as often as you need, based on your app state:

\`\`\`swift
override var keyCommands: [UIKeyCommand]? {
    if isAuthenticated {
        return [
            UIKeyCommand(input: "f", modifierFlags: .command, action: #selector(findFriends), discoverabilityTitle: "Find Friends")
        ]
    } else {
        return nil
    }
}
\`\`\`

Note: don’t try to override any built-in shortcuts, because iOS is always given the first opportunity to handle key commands – before they are routed to your app. So, built-in system events such as copy and paste will happen automatically even if you try to replace them.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/how-to-add-keyboard-shortcuts-using-keyboardshortcut">How to add keyboard shortcuts using keyboardShortcut() 
/quick-start/swiftui/how-to-dismiss-the-keyboard-when-the-user-scrolls">How to dismiss the keyboard when the user scrolls 
/quick-start/swiftui/how-to-dismiss-the-keyboard-for-a-textfield">How to dismiss the keyboard for a TextField 
/quick-start/swiftui/how-to-add-a-toolbar-to-the-keyboard">How to add a toolbar to the keyboard 
/example-code/uikit/how-to-add-a-toolbar-above-the-keyboard-using-inputaccessoryview">How to add a toolbar above the keyboard using inputAccessoryView</a>
`)],-1))])}const b=d(m,[["render",k],["__file","how-to-use-uikeycommand-to-add-keyboard-shortcuts.html.vue"]]),g=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-use-uikeycommand-to-add-keyboard-shortcuts.html","title":"How to use UIKeyCommand to add keyboard shortcuts","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to use UIKeyCommand to add keyboard shortcuts","description":"Article(s) > How to use UIKeyCommand to add keyboard shortcuts","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to use UIKeyCommand to add keyboard shortcuts"},{"property":"og:description","content":"How to use UIKeyCommand to add keyboard shortcuts"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-use-uikeycommand-to-add-keyboard-shortcuts.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-use-uikeycommand-to-add-keyboard-shortcuts.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to use UIKeyCommand to add keyboard shortcuts"}],["meta",{"property":"og:description","content":"Article(s) > How to use UIKeyCommand to add keyboard shortcuts"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to use UIKeyCommand to add keyboard shortcuts\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":2.45,"words":735},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-use-uikeycommand-to-add-keyboard-shortcuts.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,g as data};
