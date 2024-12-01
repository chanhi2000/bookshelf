import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as t,t as l,e as o,n as a,g as i,a as e,r as m,o as h}from"./app-DLPYIRXq.js";const g={},u={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"},d=t("nav",{class:"table-of-contents"},[t("ul")],-1),w=t("hr",null,null,-1),f=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1),y=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/language/how-to-find-the-index-of-the-first-matching-array-element">How to find the index of the first matching array element 
/example-code/language/how-to-count-element-frequencies-in-an-array">How to count element frequencies in an array 
/example-code/language/how-to-find-the-first-matching-element-in-an-array">How to find the first matching element in an array 
/example-code/arrays/how-to-count-objects-in-a-set-using-nscountedset">How to count objects in a set using NSCountedSet 
/example-code/language/removing-matching-elements-from-a-collection-removeallwhere">Removing matching elements from a collection: removeAll(where:)</a>
`)],-1);function _(r,x){const n=m("VPCard");return h(),s("div",null,[t("h1",u,[t("a",p,[t("span",null,l(r.$frontmatter.title)+" 관련",1)])]),o(n,a(i({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),d,w,o(n,a(i({title:"How to count matching items in an array | Language - free Swift example code",desc:"How to count matching items in an array",link:"https://hackingwithswift.com/example-code/language/how-to-count-matching-items-in-an-array",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,e(" TODO: 작성 "),e(` 
If you want to count how many items in an array (or any collection) match a test you specify, the easiest thing to do is run the collection through a call to \`filter()\` then count the remainder.

For example, if you had an array of numbers and wanted to count how many were odd, you would write this:

\`\`\`swift
let count1 = [1, 2, 3, 4, 5].filter { $0 % 2 == 1 }.count
\`\`\`

Because this is something that all collections might want to do, you should consider wrapping it in an extension on \`Collection\`, like this:

\`\`\`swift
extension Collection {
    func count(where test: (Element) throws -> Bool) rethrows -> Int {
        return try self.filter(test).count
    }
}
\`\`\`

With that change, counting the odd numbers becomes this:

\`\`\`swift
let count2 = [1, 2, 3, 4, 5].count { $0 % 2 == 1 }
\`\`\`

`),y])}const v=c(g,[["render",_],["__file","how-to-count-matching-items-in-an-array.html.vue"]]),H=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-count-matching-items-in-an-array.html","title":"How to count matching items in an array","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to count matching items in an array","description":"Article(s) > How to count matching items in an array","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to count matching items in an array"},{"property":"og:description","content":"How to count matching items in an array"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-count-matching-items-in-an-array.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-count-matching-items-in-an-array.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to count matching items in an array"}],["meta",{"property":"og:description","content":"Article(s) > How to count matching items in an array"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to count matching items in an array\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.36,"words":407},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-count-matching-items-in-an-array.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,H as data};
