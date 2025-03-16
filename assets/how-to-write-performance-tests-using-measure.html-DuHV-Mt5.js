import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as m,f as e,av as l,au as r,aw as s,ax as a,b as o,r as p,o as g}from"./app-TfhzDSA_.js";const u={},h={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"};function w(i,t){const n=p("VPCard");return g(),m("div",null,[e("h1",h,[e("a",f,[e("span",null,l(i.$frontmatter.title)+" 관련",1)])]),r(n,s(a({title:"Testing - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/testing/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),r(n,s(a({title:"How to write performance tests using measure() | Testing - free Swift example code",desc:"How to write performance tests using measure()",link:"https://hackingwithswift.com/example-code/testing/how-to-write-performance-tests-using-measure",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o(" TODO: 작성 "),o(` 
Performance tests let you check how fast your code runs, but more importantly it lets you check how fast your code runs *over time* – you can spot performance changes as your code evolves.

Writing a performance test takes just two steps:

1. Create a new method starting with the name “test” in your Xcode tests.
<li>Using the \`measure()\` method inside that test, running any work you want.

To try it out, look in the “Tests” group in your Xcode project, then open your tests file. In my test I’m going to try generating images using a fictional \`ImageGenerator\` struct that has a \`generateImages()\` method. I’m specifically going to be testing the \`generateImages()\` method, which means I’ll create a test instance of \`ImageGenerator\` *outside* the \`measure()\` method, like this:

\`\`\`swift
func testPerformanceExample() {
    let generator = ImageGenerator()

    measure {
        generator.generateImages()
    }
}
\`\`\`

When that test runs, Xcode will run the contents of \`measure()\` 10 times to get a spread of results.

`),t[2]||(t[2]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/testing/how-to-set-baselines-for-your-performance-tests">How to set baselines for your performance tests 
/example-code/testing/how-to-do-one-time-setup-for-your-tests">How to do one-time setup for your tests 
/quick-start/concurrency/whats-the-performance-cost-of-calling-an-async-function">What’s the performance cost of calling an async function? 
/example-code/testing/how-to-check-and-unwrap-optionals-in-tests-using-xctunwrap">How to check and unwrap optionals in tests using XCTUnwrap() 
/example-code/strings/how-to-measure-a-string-for-objective-c-code">How to measure a string for Objective-C code</a>
`)],-1))])}const k=c(u,[["render",w],["__file","how-to-write-performance-tests-using-measure.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/testing/how-to-write-performance-tests-using-measure.html","title":"How to write performance tests using measure()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to write performance tests using measure()","description":"Article(s) > How to write performance tests using measure()","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to write performance tests using measure()"},{"property":"og:description","content":"How to write performance tests using measure()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/testing/how-to-write-performance-tests-using-measure.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/testing/how-to-write-performance-tests-using-measure.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to write performance tests using measure()"}],["meta",{"property":"og:description","content":"Article(s) > How to write performance tests using measure()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to write performance tests using measure()\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.4,"words":420},"filePathRelative":"hackingwithswift.com/example-code/testing/how-to-write-performance-tests-using-measure.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{k as comp,b as data};
