import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as t,as as u,ao as o,at as i,au as r,ak as e,aq as m,ar as p}from"./app-Dn51E1Ub.js";const h={},f={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function g(c,a){const n=m("VPCard");return p(),l("div",null,[t("h1",f,[t("a",d,[t("span",null,u(c.$frontmatter.title)+" 관련",1)])]),o(n,i(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a[0]||(a[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),a[1]||(a[1]=t("hr",null,null,-1)),o(n,i(r({title:"How to make a variadic function | Language - free Swift example code",desc:"How to make a variadic function",link:"https://hackingwithswift.com/example-code/language/how-to-make-a-variadic-function",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a[2]||(a[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),e(" TODO: 작성 "),e(` 
Variadic functions are functions that accept any number of parameters. The most common one in Swift is \`print()\` – most people use it to print a single value, but you can actually pass as many as you want, like this:

\`\`\`swift
print(1, 2, 3, 4, 5)
\`\`\`

To make a variadic function of your own, just add \`...\` after any parameter. For example, we could write a \`sum()\` function that accepts any number of integers and adds them together, like this:

\`\`\`swift
func sum1(_ numbers: Int...) -> Int {
    var total = 0

    for number in numbers {
        total += number
    }

    return total
}
\`\`\`

Or if you wanted to write that functionally, you would use \`reduce()\`:

\`\`\`swift
func sum2(_ numbers: Int...) -> Int {
    return numbers.reduce(0, +)
}
\`\`\`

Notice how we specify \`Int...\` rather than \`Int\` – that means this function can be called using no integers, one integer, or even a hundred integers, and Swift will automatically convert them to be an array of integers inside the function.

So, it would be called like this:

\`\`\`swift
let total = sum2(1, 2, 3, 4, 5)
\`\`\`

`),a[3]||(a[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/quick-start/concurrency/how-to-make-function-parameters-isolated">How to make function parameters isolated 
/quick-start/concurrency/what-is-an-asynchronous-function">What is an asynchronous function? 
/quick-start/concurrency/what-is-a-synchronous-function">What is a synchronous function? 
/quick-start/concurrency/how-to-call-an-async-function-using-async-let">How to call an async function using async let 
/example-code/language/how-to-use-the-zip-function-to-join-two-arrays">How to use the zip() function to join two arrays</a>
`)],-1))])}const k=s(h,[["render",g],["__file","how-to-make-a-variadic-function.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-make-a-variadic-function.html","title":"How to make a variadic function","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make a variadic function","description":"Article(s) > How to make a variadic function","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make a variadic function"},{"property":"og:description","content":"How to make a variadic function"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-make-a-variadic-function.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-make-a-variadic-function.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make a variadic function"}],["meta",{"property":"og:description","content":"Article(s) > How to make a variadic function"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make a variadic function\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.38,"words":414},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-make-a-variadic-function.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,v as data};
