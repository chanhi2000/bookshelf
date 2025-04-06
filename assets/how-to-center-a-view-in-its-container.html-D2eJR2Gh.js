import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,f as t,av as p,au as n,aw as a,ax as r,b as i,r as w,o as h}from"./app-OR5iPMEZ.js";const d={},u={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function f(c,e){const o=w("VPCard");return h(),l("div",null,[t("h1",u,[t("a",m,[t("span",null,p(c.$frontmatter.title)+" 관련",1)])]),n(o,a(r({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),n(o,a(r({title:"How to center a view in its container | UIKit - free Swift example code",desc:"How to center a view in its container",link:"https://hackingwithswift.com/example-code/uikit/how-to-center-a-view-in-its-container",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 3.2")],-1)),i(" TODO: 작성 "),i(`
There are two ways to center one \`UIView\` inside another, depending on whether you use Auto Layout.

If you don’t use Auto Layout, it’s only one line of code:

\`\`\`swift
childView.center = parentView.center
\`\`\`

That sets the position once, so it won’t update when your user rotates their device or if they use something like Slide Over to change the size of your app.

If you’re using Auto Layout, you can center your child view inside its parent like this:

\`\`\`swift
childView.centerXAnchor.constraint(equalTo: parentView.centerXAnchor).isActive = true
childView.centerYAnchor.constraint(equalTo: parentView.centerYAnchor).isActive = true
\`\`\`

Those constraints will automatically update as the available space changes.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),i(`
/quick-start/swiftui/how-to-adjust-the-size-of-a-view-relative-to-its-container">How to adjust the size of a view relative to its container 
/example-code/uikit/how-to-pad-a-uitextview-by-setting-its-text-container-inset">How to pad a UITextView by setting its text container inset 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/how-to-dynamically-adjust-the-appearance-of-a-view-based-on-its-size-and-location">How to dynamically adjust the appearance of a view based on its size and location 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode</a>
`)],-1))])}const v=s(d,[["render",f],["__file","how-to-center-a-view-in-its-container.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-center-a-view-in-its-container.html","title":"How to center a view in its container","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to center a view in its container","description":"Article(s) > How to center a view in its container","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-3.2","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to center a view in its container"},{"property":"og:description","content":"How to center a view in its container"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-center-a-view-in-its-container.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-center-a-view-in-its-container.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to center a view in its container"}],["meta",{"property":"og:description","content":"Article(s) > How to center a view in its container"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-3.2"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to center a view in its container\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.28,"words":385},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-center-a-view-in-its-container.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,k as data};
