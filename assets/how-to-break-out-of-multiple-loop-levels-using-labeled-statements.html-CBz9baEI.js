import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as r,b as e,t as u,e as n,n as a,g as l,a as t,r as c,o as p}from"./app-TWLwS86W.js";const m={},h={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"},b=e("nav",{class:"table-of-contents"},[e("ul")],-1),f=e("hr",null,null,-1),g=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1),w=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/quick-start/swiftui/how-to-fix-function-declares-an-opaque-return-type-but-has-no-return-statements-in-its-body-from-which-to-infer-an-underlying-ty">How to fix “Function declares an opaque return type, but has no return statements in its body from which to infer an underlying type” 
/example-code/calayer/how-to-make-a-uiview-fade-out">How to make a UIView fade out 
/quick-start/swiftui/how-to-get-bordered-buttons-that-stand-out">How to get bordered buttons that stand out 
/example-code/system/how-to-spell-out-numbers-using-numberformatters-spellout-style">How to spell out numbers using NumberFormatter's spellOut style 
/quick-start/swiftui/how-to-create-views-in-a-loop-using-foreach">How to create views in a loop using ForEach</a>
`)],-1);function k(i,y){const o=c("VPCard");return p(),r("div",null,[e("h1",h,[e("a",d,[e("span",null,u(i.$frontmatter.title)+" 관련",1)])]),n(o,a(l({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),b,f,n(o,a(l({title:"How to break out of multiple loop levels using labeled statements | Language - free Swift example code",desc:"How to break out of multiple loop levels using labeled statements",link:"https://hackingwithswift.com/example-code/language/how-to-break-out-of-multiple-loop-levels-using-labeled-statements",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,t(" TODO: 작성 "),t(` 
Swift has a built-in \`break\` keyword that escapes the current loop you’re in, but what happens if you’re in two loops or more and want to break out of them all?

Swift’s labeled statements are designed to solve this problem: they let you exit any number of loops or conditions, so execution picks up directly after the block you labeled.

For example, consider this pair of loops that will find the first number that, when squared, makes 144:

\`\`\`swift
let numbers = 1...100

for number1 in numbers {
    for number2 in numbers {
        if number1 == number2 && number1 * number2 == 144 {
            print("Square found: \\(number1)")
        }
    }
}
\`\`\`

As soon as we’ve found that square, we can stop looking. The problem is, a regular \`break\` won’t work here because it will exit only the inner loop – the outer loop will keep counting 13, 14, 15, and so on up to 100. However, if we add a label to the outer loop we can break out of both loops at once, like this:

\`\`\`swift
outerLoop: for number1 in numbers {
    for number2 in numbers {
        if number1 == number2 && number1 * number2 == 144 {
            print("Square found: \\(number1)")
            break outerLoop
        }
    }
}
\`\`\`

Notice the \`outerLoop:\` before the \`for number1\` loop, and also the matching \`break outerLoop\` – that will cause both loops to exit as soon as the correct number is found.

`),w])}const x=s(m,[["render",k],["__file","how-to-break-out-of-multiple-loop-levels-using-labeled-statements.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-break-out-of-multiple-loop-levels-using-labeled-statements.html","title":"How to break out of multiple loop levels using labeled statements","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to break out of multiple loop levels using labeled statements","description":"Article(s) > How to break out of multiple loop levels using labeled statements","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to break out of multiple loop levels using labeled statements"},{"property":"og:description","content":"How to break out of multiple loop levels using labeled statements"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-break-out-of-multiple-loop-levels-using-labeled-statements.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-break-out-of-multiple-loop-levels-using-labeled-statements.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to break out of multiple loop levels using labeled statements"}],["meta",{"property":"og:description","content":"Article(s) > How to break out of multiple loop levels using labeled statements"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to break out of multiple loop levels using labeled statements\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.81,"words":544},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-break-out-of-multiple-loop-levels-using-labeled-statements.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,S as data};
