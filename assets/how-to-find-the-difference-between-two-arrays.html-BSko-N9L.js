import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as e,t as l,e as n,n as a,g as i,a as t,r as h,o as f}from"./app-DLPYIRXq.js";const m={},d={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},p=e("nav",{class:"table-of-contents"},[e("ul")],-1),g=e("hr",null,null,-1),u=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1),y=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/language/how-to-use-the-zip-function-to-join-two-arrays">How to use the zip() function to join two arrays 
/example-code/core-graphics/how-to-calculate-the-distance-between-two-cgpoints">How to calculate the distance between two CGPoints 
/example-code/language/how-to-find-the-minimum-of-two-numbers">How to find the minimum of two numbers 
/example-code/language/how-to-find-the-maximum-of-two-numbers">How to find the maximum of two numbers 
/example-code/core-graphics/how-to-calculate-the-manhattan-distance-between-two-cgpoints">How to calculate the Manhattan distance between two CGPoints</a>
`)],-1);function b(r,x){const o=h("VPCard");return f(),s("div",null,[e("h1",d,[e("a",w,[e("span",null,l(r.$frontmatter.title)+" 관련",1)])]),n(o,a(i({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),p,g,n(o,a(i({title:"How to find the difference between two arrays | Language - free Swift example code",desc:"How to find the difference between two arrays",link:"https://hackingwithswift.com/example-code/language/how-to-find-the-difference-between-two-arrays",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),u,t(" TODO: 작성 "),t(` 
If you have two arrays that contain similar items and want to find out their differences – i.e., which items exist in one or the other, but not both – the easiest thing to do is use a \`Set\`. Sets have a \`symmetricDifference()\` method that does exactly this, so you just need to convert both arrays to a set, then convert the result back into an array.

Here’s an extension to make it easier:

\`\`\`swift
extension Array where Element: Hashable {
    func difference(from other: [Element]) -> [Element] {
        let thisSet = Set(self)
        let otherSet = Set(other)
        return Array(thisSet.symmetricDifference(otherSet))
    }
}
\`\`\`

And here’s some example code you can use to try it out:

\`\`\`swift
let names1 = ["John", "Paul", "Ringo"]
let names2 = ["Ringo", "Paul", "George"]
let difference = names1.difference(from: names2)
\`\`\`

That will set \`difference\` to be \`["George", "John"]\`, because those are the two names that only appear once in either array.

`),y])}const S=c(m,[["render",b],["__file","how-to-find-the-difference-between-two-arrays.html.vue"]]),H=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-find-the-difference-between-two-arrays.html","title":"How to find the difference between two arrays","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to find the difference between two arrays","description":"Article(s) > How to find the difference between two arrays","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to find the difference between two arrays"},{"property":"og:description","content":"How to find the difference between two arrays"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-find-the-difference-between-two-arrays.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-find-the-difference-between-two-arrays.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to find the difference between two arrays"}],["meta",{"property":"og:description","content":"Article(s) > How to find the difference between two arrays"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to find the difference between two arrays\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.4,"words":420},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-find-the-difference-between-two-arrays.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{S as comp,H as data};
