import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as e,av as h,au as n,aw as i,ax as s,b as a,r as p,o as d}from"./app-n2Oj_rFs.js";const g={},u={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function w(r,t){const o=p("VPCard");return d(),c("div",null,[e("h1",u,[e("a",m,[e("span",null,h(r.$frontmatter.title)+" 관련",1)])]),n(o,i(s({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(o,i(s({title:"What is key-value observing? | Language - free Swift example code",desc:"What is key-value observing?",link:"https://hackingwithswift.com/example-code/language/what-is-key-value-observing",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),a(" TODO: 작성 "),a(` 
Key-value observing is the ability for Swift to attach code to variables, so that whenever the variable is changed the code runs. It’s similar to property observers (\`willSet\` and \`didSet\` ), except KVO is for adding observers *outside* of the type definition.

KVO isn’t terribly nice in pure Swift code, because it relies on the Objective-C runtime – you need to use \`@objc\` classes that inherit from \`NSObject\`, then mark each of your properties with \`@objc dynamic\`.

For example, we could create a \`Person\` class like this:

\`\`\`swift
@objc class Person: NSObject {
    @objc dynamic var name = "Taylor Swift"
}

let taylor = Person()
\`\`\`

You could then observe that user’s name changing like this:

\`\`\`swift
taylor.observe(\\Person.name, options: .new) { person, change in
    print("I'm now called \\(person.name)")
}
\`\`\`

That asks Swift to watch for new values coming in, then prints the person’s name as soon as the new value is set.

To try it out, just change the person’s name to something else:

\`\`\`swift
taylor.name = "Justin Bieber"
\`\`\`

That will print “I’m now called Justin Bieber.”

Although KVO is unpleasant in pure Swift code, it’s better when working with Apple’s own APIs – they are all automatically both \`@objc\` and \`dynamic\` because they are written in Objective-C. 

However, one warning: even though large parts of UIKit might work with KVO, this is a coincidence rather than a promise – Apple make no guarantees about UIKit remaining KVO-compatible in the future.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),a(`
/quick-start/swiftui/how-to-detect-and-respond-to-key-press-events">How to detect and respond to key press events 
/quick-start/swiftui/how-to-activate-different-button-behaviors-when-a-modifier-key-is-pressed">How to activate different button behaviors when a modifier key is pressed 
/example-code/uikit/how-to-detect-keyboard-input-using-pressesbegan-and-pressesended">How to detect keyboard input using pressesBegan() and pressesEnded() 
/example-code/strings/how-to-calculate-the-rot13-of-a-string">How to calculate the ROT13 of a string 
/example-code/uikit/how-to-use-uikeycommand-to-add-keyboard-shortcuts">How to use UIKeyCommand to add keyboard shortcuts</a>
`)],-1))])}const b=l(g,[["render",w],["__file","what-is-key-value-observing.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-is-key-value-observing.html","title":"What is key-value observing?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What is key-value observing?","description":"Article(s) > What is key-value observing?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What is key-value observing?"},{"property":"og:description","content":"What is key-value observing?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-key-value-observing.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-key-value-observing.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What is key-value observing?"}],["meta",{"property":"og:description","content":"Article(s) > What is key-value observing?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What is key-value observing?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.66,"words":497},"filePathRelative":"hackingwithswift.com/example-code/language/what-is-key-value-observing.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,v as data};
