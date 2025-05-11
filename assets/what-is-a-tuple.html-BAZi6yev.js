import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as t,av as p,au as o,aw as i,ax as s,b as a,r as u,o as m}from"./app-BQ88-Ybo.js";const h={},d={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function f(l,e){const n=u("VPCard");return m(),c("div",null,[t("h1",d,[t("a",g,[t("span",null,p(l.$frontmatter.title)+" 관련",1)])]),o(n,i(s({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),o(n,i(s({title:"What is a tuple? | Language - free Swift example code",desc:"What is a tuple?",link:"https://hackingwithswift.com/example-code/language/what-is-a-tuple",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 7.0")],-1)),a(" TODO: 작성 "),a(` 
<p style="margin: 0; margin-bottom: 20px;"><a href="/about">Paul Hudson</a>    <i class="fab fa-twitter" aria-hidden="true" style="color: #4099ff"></i> <a href="https://twitter.com/twostraws" target="_blank">@twostraws</a>    <time itemprop="dateModified" datetime="2019-05-28T20:41:20+00:00">May 28th 2019</time><meta itemprop="datePublished" content="2019-05-28T20:41:20+00:00">

Tuples in Swift occupy the space between dictionaries and structures: they hold very specific types of data (like a struct) but can be created on the fly (like dictionaries). They are commonly used to return multiple values from a function call.

You can create a basic tuple like this:

\`\`\`swift
let person = (name: "Paul", age: 35)
\`\`\`

As you can see, it looks like an anonymous struct: you can read \`person.name\` and \`person.age\` just like you would with a struct. But, helpfully, we haven't had to define the struct ahead of time – this is something made to be thrown away. It also means you don't get to conform to protocols or write methods inside your tuples, but that's OK.

Tuples can be accessed using element names ("name" and "age" above), or using a position in the tuple, e.g. 0 and 1. You don't have to give your tuple elements names if you don't want to, but it's a good idea.

To give you a fully fledged tuple example, here's a function that splits a name like "Paul Hudson" in two, and returns a tuple containing the first name (Paul) and the last name (Hudson). Obviously this just a trivial example – it makes no attempt to cater for middle names, honorifics, or languages where family names come first!

\`\`\`swift
func split(name: String) -> (firstName: String, lastName: String) {
    let split = name.components(separatedBy: " ")
    return (split[0], split[1])
}

let parts = split(name: "Paul Hudson")
parts.0
parts.1
parts.firstName
parts.lastName
\`\`\`

As you can see, the return value from that function is \`(firstName: String, lastName: String)\`, which is a tuple with named elements. Those elements then get accessed using \`split.0\`, \`split.1\`, \`split.firstName\` and \`split.lastName\`.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),a(`
/example-code/language/what-is-destructuring">What is destructuring? 
/example-code/uicolor/how-to-read-the-red-green-blue-and-alpha-color-components-from-a-uicolor">How to read the red, green, blue, and alpha color components from a UIColor 
/example-code/language/how-to-pass-the-fizz-buzz-test">How to pass the Fizz Buzz test 
/example-code/language/what-are-the-changes-in-swift-22">What are the changes in Swift 2.2? 
/example-code/language/how-to-count-element-frequencies-in-an-array">How to count element frequencies in an array</a>
`)],-1))])}const b=r(h,[["render",f],["__file","what-is-a-tuple.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-is-a-tuple.html","title":"What is a tuple?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What is a tuple?","description":"Article(s) > What is a tuple?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What is a tuple?"},{"property":"og:description","content":"What is a tuple?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-a-tuple.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-a-tuple.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What is a tuple?"}],["meta",{"property":"og:description","content":"Article(s) > What is a tuple?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What is a tuple?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.92,"words":576},"filePathRelative":"hackingwithswift.com/example-code/language/what-is-a-tuple.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,k as data};
