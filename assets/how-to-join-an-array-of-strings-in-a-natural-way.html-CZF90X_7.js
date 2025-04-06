import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as t,av as h,au as e,aw as i,ax as r,b as o,r as m,o as p}from"./app-OR5iPMEZ.js";const w={},g={id:"frontmatter-title-관련",tabindex:"-1"},y={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,a){const n=m("VPCard");return p(),c("div",null,[t("h1",g,[t("a",y,[t("span",null,h(s.$frontmatter.title)+" 관련",1)])]),e(n,i(r({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a[0]||(a[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),a[1]||(a[1]=t("hr",null,null,-1)),e(n,i(r({title:"How to join an array of strings in a natural way | System - free Swift example code",desc:"How to join an array of strings in a natural way",logo:"https://hackingwithswift.com/favicon.svg",link:"https://hackingwithswift.com/example-code/how-to-join-an-array-of-strings-in-a-natural-way",background:"rgba(174,10,10,0.2)"})),null,16),a[2]||(a[2]=t("blockquote",null,[t("p",null,"Available from iOS 13.0")],-1)),o(" TODO: 작성 "),o(` 
Swift provides the \`ListFormatter\` class as a built-in way of joining lists of strings into a single string so that the last item has “and” before it, like a natural English string. So, rather than just getting “A, B, C” you actually get “A, B and C” – it’s much more suitable for user interfaces.

Here’s some example code:

\`\`\`swift
let names = ["Ash", "Brock", "Misty"]
let joined1 = ListFormatter.localizedString(byJoining: names)
print(joined1)
\`\`\`

That will print “Ash, Brock and Misty”. (No, there’s no way of asking it for the Oxford comma, so “Ash, Brock, and Misty” isn’t possible.)

If you want to join the strings without using the “and” at the end, you should just use the \`joined(separator:)\` method, like this:

\`\`\`swift
let joined2 = names.joined(separator: ", ")
print(joined2)
\`\`\`

That will print “Ash, Brock, Misty”.

`),a[3]||(a[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/example-code/arrays/how-to-join-an-array-of-strings-into-a-single-string">How to join an array of strings into a single string 
/example-code/language/how-to-use-the-zip-function-to-join-two-arrays">How to use the zip() function to join two arrays 
/quick-start/swiftui/two-way-bindings-in-swiftui">Two-way bindings in SwiftUI 
/quick-start/swiftui/how-to-adjust-the-way-an-image-is-fitted-to-its-space">How to adjust the way an image is fitted to its space 
/quick-start/swiftui/how-to-customize-the-way-links-are-opened">How to customize the way links are opened</a>
`)],-1))])}const k=l(w,[["render",f],["__file","how-to-join-an-array-of-strings-in-a-natural-way.html.vue"]]),j=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-join-an-array-of-strings-in-a-natural-way.html","title":"How to join an array of strings in a natural way","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to join an array of strings in a natural way","description":"Article(s) > How to join an array of strings in a natural way","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to join an array of strings in a natural way"},{"property":"og:description","content":"How to join an array of strings in a natural way"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-join-an-array-of-strings-in-a-natural-way.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-join-an-array-of-strings-in-a-natural-way.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to join an array of strings in a natural way"}],["meta",{"property":"og:description","content":"Article(s) > How to join an array of strings in a natural way"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-10-07T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to join an array of strings in a natural way\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-07T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-10-07T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.47,"words":440},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-join-an-array-of-strings-in-a-natural-way.md","localizedDate":"2019년 10월 7일","excerpt":"\\n"}');export{k as comp,j as data};
