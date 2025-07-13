import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as t,av as h,au as n,aw as a,ax as r,b as i,r as w,o as p}from"./app-Bd1z_vEL.js";const m={},d={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"};function g(s,e){const o=w("VPCard");return p(),c("div",null,[t("h1",d,[t("a",u,[t("span",null,h(s.$frontmatter.title)+" 관련",1)])]),n(o,a(r({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),n(o,a(r({title:"How to share content with UIActivityViewController | UIKit - free Swift example code",desc:"How to share content with UIActivityViewController",link:"https://hackingwithswift.com/example-code/uikit/how-to-share-content-with-uiactivityviewcontroller",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 6.0")],-1)),i(" TODO: 작성 "),i(`
Before iOS 6.0 was released there were a number of third-party libraries that tried to simplify the sharing of content, but even with those libraries in place it was still far too hard. Fortunately, Apple added \`UIActivityViewController\`, a class that makes sharing to any service as simple as telling it what kind of content you have.

The nice thing about \`UIActivityViewController\` is that it automatically takes advantage of the apps the user has installed. If they have configured Twitter, they can post tweets; if they have configured Facebook, they can post to their timeline; if they have a printer configured, they can print your images; and more. It takes no extra work from you: you just tell iOS what kind of content you want to share, and it does the rest.

Here's how you share an image:

\`\`\`swift
if let image = UIImage(named: "myImage") {
    let vc = UIActivityViewController(activityItems: [image], applicationActivities: [])
    present(vc, animated: true)
}
\`\`\`

And here's an example of sharing a text and an image:

\`\`\`swift
let shareText = "Hello, world!"

if let image = UIImage(named: "myImage") {
    let vc = UIActivityViewController(activityItems: [shareText, image], applicationActivities: [])
    present(vc, animated: true)
}
\`\`\`

If you want to share a URL to a website, make sure you wrap it up in a \`URL\` first.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),i(`
/quick-start/swiftui/how-to-let-users-share-content-using-the-system-share-sheet">How to let users share content using the system share sheet 
/example-code/uikit/how-to-print-using-uiactivityviewcontroller">How to print using UIActivityViewController 
/example-code/uikit/how-to-share-content-with-the-social-framework-and-slcomposeviewcontroller">How to share content with the Social framework and SLComposeViewController 
/quick-start/swiftui/how-to-use-environmentobject-to-share-data-between-views">How to use @EnvironmentObject to share data between views 
/example-code/uikit/what-is-a-views-intrinsic-content-size">What is a view’s intrinsic content size?</a>
`)],-1))])}const v=l(m,[["render",g],["__file","how-to-share-content-with-uiactivityviewcontroller.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-share-content-with-uiactivityviewcontroller.html","title":"How to share content with UIActivityViewController","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to share content with UIActivityViewController","description":"Article(s) > How to share content with UIActivityViewController","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-6.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to share content with UIActivityViewController"},{"property":"og:description","content":"How to share content with UIActivityViewController"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-share-content-with-uiactivityviewcontroller.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-share-content-with-uiactivityviewcontroller.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to share content with UIActivityViewController"}],["meta",{"property":"og:description","content":"Article(s) > How to share content with UIActivityViewController"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-6.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to share content with UIActivityViewController\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.54,"words":463},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-share-content-with-uiactivityviewcontroller.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,k as data};
