import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as t,t as l,e as n,n as i,g as s,a as e,r as h,o as u}from"./app-DLPYIRXq.js";const p={},d={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},z=t("nav",{class:"table-of-contents"},[t("ul")],-1),m=t("hr",null,null,-1),w=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1),f=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/system/how-to-pass-data-between-two-view-controllers">How to pass data between two view controllers 
/example-code/testing/how-to-do-conditional-test-tear-down-using-addteardownblock">How to do conditional test tear down using addTeardownBlock() 
/example-code/testing/how-to-test-throwing-functions">How to test throwing functions 
/example-code/testing/how-to-test-asynchronous-functions-using-expectation">How to test asynchronous functions using expectation() 
/example-code/strings/how-to-test-localization-by-setting-a-debug-locale-and-double-length-pseudolanguage">How to test localization by setting a debug locale and double length pseudolanguage</a>
`)],-1);function b(a,y){const o=h("VPCard");return u(),c("div",null,[t("h1",d,[t("a",g,[t("span",null,l(a.$frontmatter.title)+" 관련",1)])]),n(o,i(s({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),z,m,n(o,i(s({title:"How to pass the Fizz Buzz test | Language - free Swift example code",desc:"How to pass the Fizz Buzz test",link:"https://hackingwithswift.com/example-code/language/how-to-pass-the-fizz-buzz-test",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,e(" TODO: 작성 "),e(` 
The Fizz Buzz test is a simple coding test used in some coding interviews. It’s not designed to be hard, in fact quite the opposite – it’s designed to be easy enough that most folks can solve it without feeling too pressured.

To pass the test you must write a function that accepts an integer and returns a string. Which string to return depends on the input number:

- If the integer is evenly divisible by three, it should return “Fizz”.
<li>If the integer is evenly divisible by five, it should return “Buzz”. 
<li>If the integer is evenly divisible by three *and* five, it should return “Fizz Buzz”. 
<li>Otherwise it should return the string form of the input number.

There are lots of ways this can be solved in Swift, but I think one of the most interesting is to use tuples like this:

\`\`\`swift
func fizzbuzz(number: Int) -> String {
    switch (number % 3 == 0, number % 5 == 0) {
    case (true, false):
        return "Fizz"
    case (false, true):
        return "Buzz"
    case (true, true):
        return "FizzBuzz"
    case (false, false):
        return String(number)
    }
}

print(fizzbuzz(number: 15))
\`\`\`

This approach breaks down a large input space – any number – into simple combinations of true and false, and we then use tuple pattern matching in the case statements to select the correct output.

`),f])}const v=r(p,[["render",b],["__file","how-to-pass-the-fizz-buzz-test.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-pass-the-fizz-buzz-test.html","title":"How to pass the Fizz Buzz test","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to pass the Fizz Buzz test","description":"Article(s) > How to pass the Fizz Buzz test","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to pass the Fizz Buzz test"},{"property":"og:description","content":"How to pass the Fizz Buzz test"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-pass-the-fizz-buzz-test.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-pass-the-fizz-buzz-test.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to pass the Fizz Buzz test"}],["meta",{"property":"og:description","content":"Article(s) > How to pass the Fizz Buzz test"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to pass the Fizz Buzz test\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.6,"words":481},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-pass-the-fizz-buzz-test.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{v as comp,x as data};
