import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as h,am as e,as as p,ao as i,at as r,au as s,ak as o,aq as c,ar as d}from"./app-DpiNAgkx.js";const u={},m={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"};function g(a,t){const n=c("VPCard");return d(),h("div",null,[e("h1",m,[e("a",w,[e("span",null,p(a.$frontmatter.title)+" 관련",1)])]),i(n,r(s({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),i(n,r(s({title:"How to move to the next UITextField when the user presses return | UIKit - free Swift example code",desc:"How to move to the next UITextField when the user presses return",link:"https://hackingwithswift.com/example-code/uikit/how-to-move-to-the-next-uitextfield-when-the-user-presses-return",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 2.0")],-1)),o(" TODO: 작성 "),o(`
If you’re in a situation where your iOS app has multiple \`UITextField\` instances lined up, users expect to be able to move between them by pressing Next/Return on their on-screen keyboard. There is no built-in way of making this happen, so we need to write code ourselves using one of several approaches.

The easiest approach is using view tags: give your text fields incrementing tag numbers, then make them all point to a common delegate - it might be your view controller, but it doesn’t need to be. 

Once that’s done you can use the \`becomeFirstResponder()\` and \`resignFirstResponder()\` methods to manipulate which view is in control like this:

\`\`\`swift
func textFieldShouldReturn(_ textField: UITextField) -> Bool {
    let nextTag = textField.tag + 1

    if let nextResponder = textField.superview?.viewWithTag(nextTag) {
        nextResponder.becomeFirstResponder()
    } else {
        textField.resignFirstResponder()
    }

    return true
}
\`\`\`

If you’re desperately opposed to using tags, the other solution is to place your labels in an array, find the position of the text field that triggered the event, then move one down in the array.

**Note:** If you ever need to force the first responder to resign itself and aren’t sure which text field is in control, it’s easier to use \`view.endEditing(true)\`.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/uikit/how-to-detect-long-presses-using-uilongpressgesturerecognizer">How to detect long presses using UILongPressGestureRecognizer 
/example-code/uikit/how-to-limit-the-number-of-characters-in-a-uitextfield-or-uitextview">How to limit the number of characters in a UITextField or UITextView 
/example-code/uikit/how-to-hide-passwords-in-a-uitextfield">How to hide passwords in a UITextField 
/example-code/uikit/how-to-add-a-uitextfield-to-a-uialertcontroller">How to add a UITextField to a UIAlertController 
/example-code/uikit/how-to-detect-keyboard-input-using-pressesbegan-and-pressesended">How to detect keyboard input using pressesBegan() and pressesEnded()</a>
`)],-1))])}const v=l(u,[["render",g],["__file","how-to-move-to-the-next-uitextfield-when-the-user-presses-return.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-move-to-the-next-uitextfield-when-the-user-presses-return.html","title":"How to move to the next UITextField when the user presses return","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to move to the next UITextField when the user presses return","description":"Article(s) > How to move to the next UITextField when the user presses return","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to move to the next UITextField when the user presses return"},{"property":"og:description","content":"How to move to the next UITextField when the user presses return"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-move-to-the-next-uitextfield-when-the-user-presses-return.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-move-to-the-next-uitextfield-when-the-user-presses-return.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to move to the next UITextField when the user presses return"}],["meta",{"property":"og:description","content":"Article(s) > How to move to the next UITextField when the user presses return"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to move to the next UITextField when the user presses return\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.68,"words":504},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-move-to-the-next-uitextfield-when-the-user-presses-return.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,k as data};
