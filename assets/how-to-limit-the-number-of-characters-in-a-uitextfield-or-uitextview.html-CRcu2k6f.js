import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as t,av as h,au as n,aw as o,ax as a,b as i,r as u,o as m}from"./app-CCjNjKMa.js";const d={},p={id:"frontmatter-title-관련",tabindex:"-1"},x={class:"header-anchor",href:"#frontmatter-title-관련"};function w(s,e){const r=u("VPCard");return m(),c("div",null,[t("h1",p,[t("a",x,[t("span",null,h(s.$frontmatter.title)+" 관련",1)])]),n(r,o(a({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),n(r,o(a({title:"How to limit the number of characters in a UITextField or UITextView | UIKit - free Swift example code",desc:"How to limit the number of characters in a UITextField or UITextView",link:"https://hackingwithswift.com/example-code/uikit/how-to-limit-the-number-of-characters-in-a-uitextfield-or-uitextview",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 7.0")],-1)),i(" TODO: 작성 "),i(`
If you have a \`UITextField\` or \`UITextView\` and want to stop users typing in more than a certain number of letters, you need to set yourself as the delegate for the control then implement either \`shouldChangeCharactersIn\` (for text fields) or \`shouldChangeTextIn\` (for text views).

Next, add one of these two methods, depending on whether you are working with text fields (single line) or text views (multiple lines):

\`\`\`swift
// Use this if you have a UITextField
func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
    // get the current text, or use an empty string if that failed
    let currentText = textField.text ?? ""

    // attempt to read the range they are trying to change, or exit if we can't
    guard let stringRange = Range(range, in: currentText) else { return false }

    // add their new text to the existing text
    let updatedText = currentText.replacingCharacters(in: stringRange, with: string)

    // make sure the result is under 16 characters
    return updatedText.count <= 16
}

// Use this if you have a UITextView
func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
    // get the current text, or use an empty string if that failed
    let currentText = textView.text ?? ""

    // attempt to read the range they are trying to change, or exit if we can't
    guard let stringRange = Range(range, in: currentText) else { return false }

    // add their new text to the existing text
    let updatedText = currentText.replacingCharacters(in: stringRange, with: text)

    // make sure the result is under 16 characters
    return updatedText.count <= 16
}
\`\`\`

I've specified 16 as the maximum number of characters, but just change that to whatever you need.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),i(`
/quick-start/swiftui/how-to-limit-the-number-of-items-in-a-fetch-request">How to limit the number of items in a fetch request 
/quick-start/swiftui/how-to-make-voiceover-read-characters-individually">How to make VoiceOver read characters individually 
/example-code/uikit/how-to-pad-a-uitextview-by-setting-its-text-container-inset">How to pad a UITextView by setting its text container inset 
/example-code/uikit/how-to-move-to-the-next-uitextfield-when-the-user-presses-return">How to move to the next UITextField when the user presses return 
/example-code/uikit/how-to-hide-passwords-in-a-uitextfield">How to hide passwords in a UITextField</a>
`)],-1))])}const T=l(d,[["render",w],["__file","how-to-limit-the-number-of-characters-in-a-uitextfield-or-uitextview.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-limit-the-number-of-characters-in-a-uitextfield-or-uitextview.html","title":"How to limit the number of characters in a UITextField or UITextView","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to limit the number of characters in a UITextField or UITextView","description":"Article(s) > How to limit the number of characters in a UITextField or UITextView","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to limit the number of characters in a UITextField or UITextView"},{"property":"og:description","content":"How to limit the number of characters in a UITextField or UITextView"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-limit-the-number-of-characters-in-a-uitextfield-or-uitextview.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-limit-the-number-of-characters-in-a-uitextfield-or-uitextview.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to limit the number of characters in a UITextField or UITextView"}],["meta",{"property":"og:description","content":"Article(s) > How to limit the number of characters in a UITextField or UITextView"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-09-19T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to limit the number of characters in a UITextField or UITextView\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-09-19T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-09-19T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.94,"words":581},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-limit-the-number-of-characters-in-a-uitextfield-or-uitextview.md","localizedDate":"2019년 9월 19일","excerpt":"\\n"}');export{T as comp,y as data};
