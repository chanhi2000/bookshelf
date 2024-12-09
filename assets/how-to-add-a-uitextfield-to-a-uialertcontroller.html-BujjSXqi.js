import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as t,t as d,e as a,n as i,g as r,a as e,r as s,o as h}from"./app-ubLChIzZ.js";const p={},m={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"},w=t("nav",{class:"table-of-contents"},[t("ul")],-1),f=t("hr",null,null,-1),g=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1),x=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/uikit/how-to-limit-the-number-of-characters-in-a-uitextfield-or-uitextview">How to limit the number of characters in a UITextField or UITextView 
/example-code/uikit/how-to-move-to-the-next-uitextfield-when-the-user-presses-return">How to move to the next UITextField when the user presses return 
/example-code/uikit/how-to-hide-passwords-in-a-uitextfield">How to hide passwords in a UITextField 
/example-code/uikit/how-to-add-a-bar-button-to-a-navigation-bar">How to add a bar button to a navigation bar 
/example-code/uikit/how-to-add-a-uiapplicationshortcutitem-quick-action-for-3d-touch">How to add a UIApplicationShortcutItem quick action for 3D Touch</a>
`)],-1);function k(n,b){const o=s("VPCard");return h(),c("div",null,[t("h1",m,[t("a",u,[t("span",null,d(n.$frontmatter.title)+" 관련",1)])]),a(o,i(r({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,f,a(o,i(r({title:"How to add a UITextField to a UIAlertController | UIKit - free Swift example code",desc:"How to add a UITextField to a UIAlertController",link:"https://hackingwithswift.com/example-code/uikit/how-to-add-a-uitextfield-to-a-uialertcontroller",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,e(" TODO: 작성 "),e(`
The \`UIAlertController\` class from iOS 8.0 lets you add as many text fields as you need, and you can read the value of those text fields when the user taps a button.

The example below creates an alert controller with one button and a text field. When the button is tapped, the text of the text field is pulled out, at which point it's down to you to do something interesting with it:

\`\`\`swift
func promptForAnswer() {
    let ac = UIAlertController(title: "Enter answer", message: nil, preferredStyle: .alert)
    ac.addTextField()

    let submitAction = UIAlertAction(title: "Submit", style: .default) { [unowned ac] _ in
        let answer = ac.textFields![0]
        // do something interesting with "answer" here
    }

    ac.addAction(submitAction)

    present(ac, animated: true)
}
\`\`\`

`),x])}const I=l(p,[["render",k],["__file","how-to-add-a-uitextfield-to-a-uialertcontroller.html.vue"]]),A=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-add-a-uitextfield-to-a-uialertcontroller.html","title":"How to add a UITextField to a UIAlertController","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to add a UITextField to a UIAlertController","description":"Article(s) > How to add a UITextField to a UIAlertController","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to add a UITextField to a UIAlertController"},{"property":"og:description","content":"How to add a UITextField to a UIAlertController"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-add-a-uitextfield-to-a-uialertcontroller.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-add-a-uitextfield-to-a-uialertcontroller.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to add a UITextField to a UIAlertController"}],["meta",{"property":"og:description","content":"Article(s) > How to add a UITextField to a UIAlertController"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to add a UITextField to a UIAlertController\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.34,"words":402},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-add-a-uitextfield-to-a-uialertcontroller.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{I as comp,A as data};
