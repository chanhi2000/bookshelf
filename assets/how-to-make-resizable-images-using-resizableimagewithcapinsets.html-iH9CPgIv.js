import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as m,am as e,as as c,ao as s,at as o,au as n,ak as i,aq as g,ar as h}from"./app-CpYYKbnj.js";const p={},w={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function u(r,t){const a=g("VPCard");return h(),m("div",null,[e("h1",w,[e("a",d,[e("span",null,c(r.$frontmatter.title)+" 관련",1)])]),s(a,o(n({title:"Media - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/media/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),s(a,o(n({title:"How to make resizable images using resizableImage(withCapInsets:) | Media - free Swift example code",desc:"How to make resizable images using resizableImage(withCapInsets:)",link:"https://hackingwithswift.com/example-code/media/how-to-make-resizable-images-using-resizableimagewithcapinsets",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 2.0")],-1)),i(" TODO: 작성 "),i(` 
If you use a small image in a large image view, you can make the image stretch to fit if you want to but it probably won't look great. iOS provides an alternative known as *resizable images*, which is where you define part of an image as being fixed in size and let iOS stretch the remainder.

This technique is common with button graphics: you make the corners fixed in size, then stretch the center part as big as it needs to be. The center part ought to be just one pixel by one pixel in size so that it stretches perfectly, but you can also ask iOS to repeat the center area as a tile if that's what you want.

This example code below creates a resizable image by defining the corners as 8 points each and stretching the rest:

\`\`\`swift
if let img = UIImage(named: "button") {
    let resizable = img.resizableImage(withCapInsets: UIEdgeInsets(top: 8, left: 8, bottom: 8, right: 8), resizingMode: .stretch)
}
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),i(`
/example-code/arkit/how-to-detect-images-using-arimagetrackingconfiguration">How to detect images using ARImageTrackingConfiguration 
/quick-start/swiftui/how-to-use-decorative-images-to-reduce-screen-reader-clutter">How to use decorative images to reduce screen reader clutter 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/how-to-draw-images-using-image-views">How to draw images using Image views 
/quick-start/swiftui/how-to-insert-images-into-text">How to insert images into text</a>
`)],-1))])}const k=l(p,[["render",u],["__file","how-to-make-resizable-images-using-resizableimagewithcapinsets.html.vue"]]),z=JSON.parse('{"path":"/hackingwithswift.com/example-code/media/how-to-make-resizable-images-using-resizableimagewithcapinsets.html","title":"How to make resizable images using resizableImage(withCapInsets:)","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make resizable images using resizableImage(withCapInsets:)","description":"Article(s) > How to make resizable images using resizableImage(withCapInsets:)","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make resizable images using resizableImage(withCapInsets:)"},{"property":"og:description","content":"How to make resizable images using resizableImage(withCapInsets:)"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-make-resizable-images-using-resizableimagewithcapinsets.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-make-resizable-images-using-resizableimagewithcapinsets.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make resizable images using resizableImage(withCapInsets:)"}],["meta",{"property":"og:description","content":"Article(s) > How to make resizable images using resizableImage(withCapInsets:)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make resizable images using resizableImage(withCapInsets:)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.38,"words":413},"filePathRelative":"hackingwithswift.com/example-code/media/how-to-make-resizable-images-using-resizableimagewithcapinsets.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,z as data};