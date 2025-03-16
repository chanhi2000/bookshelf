import{_ as m}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,f as e,av as c,au as r,aw as n,ax as i,b as a,r as p,o as u}from"./app-TfhzDSA_.js";const f={},d={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"};function g(l,t){const o=p("VPCard");return u(),s("div",null,[e("h1",d,[e("a",h,[e("span",null,c(l.$frontmatter.title)+" 관련",1)])]),r(o,n(i({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),r(o,n(i({title:"How to remove duplicate items from an array | Language - free Swift example code",desc:"How to remove duplicate items from an array",link:"https://hackingwithswift.com/example-code/language/how-to-remove-duplicate-items-from-an-array",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),a(" TODO: 작성 "),a(` 
There are several ways of removing duplicate items from an array, but one of the easiest is with the following extension on \`Array\`:

\`\`\`swift
extension Array where Element: Hashable {
    func removingDuplicates() -> [Element] {
        var addedDict = [Element: Bool]()

        return filter {
            addedDict.updateValue(true, forKey: $0) == nil
        }
    }

    mutating func removeDuplicates() {
        self = self.removingDuplicates()
    }
}
\`\`\`

That provides two methods: one called \`removingDuplicates()\` that returns an array with duplicates removed, and one called \`removeDuplicates()\` that changes the array in place.

The method works using \`filter()\` and a dictionary: when you call \`updateValue()\` on a dictionary it returns nil if the key is new, so we can use that to figure out which items are unique.

For example:

\`\`\`swift
let numbers = [1, 5, 3, 4, 5, 1, 3]
let unique = numbers.removingDuplicates()
\`\`\`

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),a(`
/example-code/language/how-to-remove-items-from-an-array-using-filter">How to remove items from an array using filter() 
/example-code/language/how-to-remove-the-first-or-last-item-from-an-array">How to remove the first or last item from an array 
/example-code/language/remove-all-instances-of-an-object-from-an-array">Remove all instances of an object from an array 
/example-code/uikit/how-to-remove-cells-from-a-uitableview">How to remove cells from a UITableView 
/example-code/strings/how-to-remove-a-prefix-from-a-string">How to remove a prefix from a string</a>
`)],-1))])}const v=m(f,[["render",g],["__file","how-to-remove-duplicate-items-from-an-array.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-remove-duplicate-items-from-an-array.html","title":"How to remove duplicate items from an array","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to remove duplicate items from an array","description":"Article(s) > How to remove duplicate items from an array","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to remove duplicate items from an array"},{"property":"og:description","content":"How to remove duplicate items from an array"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-remove-duplicate-items-from-an-array.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-remove-duplicate-items-from-an-array.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to remove duplicate items from an array"}],["meta",{"property":"og:description","content":"Article(s) > How to remove duplicate items from an array"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to remove duplicate items from an array\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.31,"words":394},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-remove-duplicate-items-from-an-array.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,b as data};
