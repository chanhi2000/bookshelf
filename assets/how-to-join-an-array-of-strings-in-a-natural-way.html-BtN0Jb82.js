import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,b as t,t as c,e as n,n as e,g as i,a,r as h,o as m}from"./app-ubLChIzZ.js";const p={},g={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},y=t("nav",{class:"table-of-contents"},[t("ul")],-1),d=t("hr",null,null,-1),f=t("blockquote",null,[t("p",null,"Available from iOS 13.0")],-1),u=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),a(`
/example-code/arrays/how-to-join-an-array-of-strings-into-a-single-string">How to join an array of strings into a single string 
/example-code/language/how-to-use-the-zip-function-to-join-two-arrays">How to use the zip() function to join two arrays 
/quick-start/swiftui/two-way-bindings-in-swiftui">Two-way bindings in SwiftUI 
/quick-start/swiftui/how-to-adjust-the-way-an-image-is-fitted-to-its-space">How to adjust the way an image is fitted to its space 
/quick-start/swiftui/how-to-customize-the-way-links-are-opened">How to customize the way links are opened</a>
`)],-1);function k(r,j){const o=h("VPCard");return m(),l("div",null,[t("h1",g,[t("a",w,[t("span",null,c(r.$frontmatter.title)+" 관련",1)])]),n(o,e(i({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),y,d,n(o,e(i({title:"How to join an array of strings in a natural way | System - free Swift example code",desc:"How to join an array of strings in a natural way",logo:"https://hackingwithswift.com/favicon.svg",link:"https://hackingwithswift.com/example-code/how-to-join-an-array-of-strings-in-a-natural-way",background:"rgba(174,10,10,0.2)"})),null,16),f,a(" TODO: 작성 "),a(` 
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

`),u])}const x=s(p,[["render",k],["__file","how-to-join-an-array-of-strings-in-a-natural-way.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-join-an-array-of-strings-in-a-natural-way.html","title":"How to join an array of strings in a natural way","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to join an array of strings in a natural way","description":"Article(s) > How to join an array of strings in a natural way","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to join an array of strings in a natural way"},{"property":"og:description","content":"How to join an array of strings in a natural way"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-join-an-array-of-strings-in-a-natural-way.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-join-an-array-of-strings-in-a-natural-way.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to join an array of strings in a natural way"}],["meta",{"property":"og:description","content":"Article(s) > How to join an array of strings in a natural way"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-10-07T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to join an array of strings in a natural way\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-07T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-10-07T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.47,"words":440},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-join-an-array-of-strings-in-a-natural-way.md","localizedDate":"2019년 10월 7일","excerpt":"\\n"}');export{x as comp,S as data};
