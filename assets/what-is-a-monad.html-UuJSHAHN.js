import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as h,f as a,av as d,au as o,aw as i,ax as r,b as e,r as c,o as u}from"./app-C2w16SxA.js";const m={},p={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function y(l,t){const n=c("VPCard");return u(),h("div",null,[a("h1",p,[a("a",g,[a("span",null,d(l.$frontmatter.title)+" 관련",1)])]),o(n,i(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=a("nav",{class:"table-of-contents"},[a("ul")],-1)),t[1]||(t[1]=a("hr",null,null,-1)),o(n,i(r({title:"What is a monad? | Language - free Swift example code",desc:"What is a monad?",link:"https://hackingwithswift.com/example-code/language/what-is-a-monad",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=a("blockquote",null,[a("p",null,"Available from iOS 8.0")],-1)),e(" TODO: 작성 "),e(` 
A monad is any data type that can be mapped over using \`map()\` and flat mapped over using \`flatMap()\`, as long it abides by three laws. Arrays, sets, optionals, and more are all monads. 

You don’t need to understand (or even be aware of) the three monad laws in order to use them, but if you’re curious I’ll try to explain. The three monad laws are best demonstrated using code, because honestly it’s a bit heavy when you’re just learning.

The first law is left identity, and means that if you have: 1) a value, e.g. the number 5; 2) a monad that contains that value, e.g. an array containing the number 5; and 3) a function that accepts the same type of value (5) and sends back the same type of monad (an array); then calling \`flatMap()\` on the array should be equal to applying the function directly to the value.

In code:

\`\`\`swift
// if you have a value, in this case 5
let myNumber = 5

// and you have a monad containing that value, in this case an array containing 5
let myMonad = [myNumber]

// and you have a function that accepts a number and returns the same type of monad as we had before (an array)
let doubleNumbers = { (value: Int) in return [value * 2] }

// then calling flatMap on the array…
let result1 = myMonad.flatMap(doubleNumbers)

// should be equal to applying the function directly to the value
let result2 = doubleNumbers(myNumber)

// so, this should print "true" in a playground
result1 == result2
\`\`\`

The second law is right identity, and means that if you have: 1) a value, e.g. the number 5; 2) a monad that contains that value, e.g. an array containing the number 5; and 3) a function that accepts the same type of value (5) and sends back the same kind of monad (an array) without transforming the value; then calling \`flatMap()\` with that function on your monad should leave it unchanged.

In code:

\`\`\`swift
// if you have a value, in this case 5
let value = 5

// and you have a monad containing that value, in this case an array containing 5
let array = [5]

// and you have a function that accepts a number and returns the same type of monad as we had before (an array) without transforming the value
let wrapInArray = { (value: Int) in return [value] }

// then calling flatMap() with that function on your monad should leave it unchanged
let flatMapped = array.flatMap(wrapInArray)

// this should print "true" in a playground
array == flatMapped
\`\`\`

The third law is associativity, and means that if you have 1) a value, e.g. the number 5; 2) a monad that contains that value, e.g. an array containing the number 5; and 3) two functions that can be run on that monad as a chain; then it shouldn’t matter how those functions are nested.

\`\`\`swift
// if you have a value, in this case 5
let anotherNumber = 5

// and you have a monad containing that value, in this case an array containing 5
let anotherArray = [myNumber]

// and you have two functions that can be run on that monad as a chain, in this case one that multiplies by 5 and one by 10
let multiplyBy5 = { [$0 * 5] }
let multiplyBy10 = { [$0 * 10] }

// then it shouldn’t matter how those functions are nested
let chained = anotherArray.flatMap(multiplyBy5).flatMap(multiplyBy10)
let nested = anotherArray.flatMap { multiplyBy5($0).flatMap(multiplyBy10) }

// this should print "true" in a playground
chained == nested
\`\`\`

Again, you don’t need to understand these laws in order to use monads, so don’t be too worried if you understood only part of the code above.

`),t[3]||(t[3]=a("details",{class:"hint-container details"},[a("summary",null,"Similar solutions…"),e(`
/example-code/language/whats-the-difference-between-a-function-and-a-closure">What’s the difference between a function and a closure? 
/example-code/language/how-to-use-codable-to-load-and-save-custom-data-types">How to use Codable to load and save custom data types 
/example-code/language/how-to-convert-an-int-to-a-string">How to convert an Int to a String 
/example-code/language/what-is-a-nib">What is a nib? 
/example-code/language/what-are-designated-initializers">What are designated initializers?</a>
`)],-1))])}const b=s(m,[["render",y],["__file","what-is-a-monad.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-is-a-monad.html","title":"What is a monad?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What is a monad?","description":"Article(s) > What is a monad?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What is a monad?"},{"property":"og:description","content":"What is a monad?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-a-monad.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-a-monad.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What is a monad?"}],["meta",{"property":"og:description","content":"Article(s) > What is a monad?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What is a monad?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.81,"words":843},"filePathRelative":"hackingwithswift.com/example-code/language/what-is-a-monad.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,v as data};
