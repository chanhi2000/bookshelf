import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as e,av as p,au as n,aw as s,ax as r,b as o,r as u,o as h}from"./app-CCjNjKMa.js";const m={},d={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function w(i,t){const a=u("VPCard");return h(),c("div",null,[e("h1",d,[e("a",g,[e("span",null,p(i.$frontmatter.title)+" 관련",1)])]),n(a,s(r({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(a,s(r({title:"How to use UIStepper to let users change number values | UIKit - free Swift example code",desc:"How to use UIStepper to let users change number values",link:"https://hackingwithswift.com/example-code/uikit/how-to-use-uistepper-to-let-users-change-number-values",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 5.0")],-1)),o(" TODO: 작성 "),o(`
\`UIStepper\` is one of those controls that doesn’t get used often, which is a shame – it’s trivial to add, and helps users select a value more accurately than a \`UISlider\`.

Here’s some code to help you try it out:

\`\`\`swift
let stepper = UIStepper()
stepper.minimumValue = 0
stepper.maximumValue = 10
stepper.value = 5
\`\`\`

That tells iOS to let the stepper move from 0 to 10 (inclusive), starting at 0. By default the \`autorepeat\` property of steppers is set to true, which means the user can press and hold to increment values rather than tapping repeatedly.

Next, add some code to position your stepper where you want it. This places it at the top of the safe area, aligned to the center:

\`\`\`swift
stepper.translatesAutoresizingMaskIntoConstraints = false
view.addSubview(stepper)

stepper.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor).isActive = true
stepper.centerXAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerXAnchor).isActive = true
\`\`\`

Finally, connect an \`@objc\` method to the \`valueChanged\` event like this:

\`\`\`swift
stepper.addTarget(self, action: #selector(stepperChanged), for: .valueChanged)
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/quick-start/concurrency/how-to-call-an-async-function-using-async-let">How to call an async function using async let 
/example-code/uikit/how-to-limit-the-number-of-characters-in-a-uitextfield-or-uitextview">How to limit the number of characters in a UITextField or UITextView 
/quick-start/concurrency/whats-the-difference-between-async-let-tasks-and-task-groups">What’s the difference between async let, tasks, and task groups? 
/quick-start/concurrency/how-to-manipulate-an-asyncsequence-using-map-filter-and-more">How to manipulate an AsyncSequence using map(), filter(), and more 
/example-code/uikit/how-to-change-your-app-icon-dynamically-with-setalternateiconname">How to change your app icon dynamically with setAlternateIconName()</a>
`)],-1))])}const v=l(m,[["render",w],["__file","how-to-use-uistepper-to-let-users-change-number-values.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-use-uistepper-to-let-users-change-number-values.html","title":"How to use UIStepper to let users change number values","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to use UIStepper to let users change number values","description":"Article(s) > How to use UIStepper to let users change number values","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-5.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to use UIStepper to let users change number values"},{"property":"og:description","content":"How to use UIStepper to let users change number values"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-use-uistepper-to-let-users-change-number-values.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-use-uistepper-to-let-users-change-number-values.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to use UIStepper to let users change number values"}],["meta",{"property":"og:description","content":"Article(s) > How to use UIStepper to let users change number values"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-5.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to use UIStepper to let users change number values\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.52,"words":456},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-use-uistepper-to-let-users-change-number-values.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,b as data};
