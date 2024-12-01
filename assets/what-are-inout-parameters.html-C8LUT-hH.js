import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as t,t as l,e as o,n,g as r,a as e,r as m,o as p}from"./app-DLPYIRXq.js";const h={},u={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"},g=t("nav",{class:"table-of-contents"},[t("ul")],-1),f=t("hr",null,null,-1),w=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1),y=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/quick-start/concurrency/how-to-make-function-parameters-isolated">How to make function parameters isolated 
/quick-start/swiftui/how-to-create-custom-text-effects-and-animations">How to create custom text effects and animations 
/quick-start/swiftui/what-is-the-gesturestate-property-wrapper">What is the @GestureState property wrapper? 
/quick-start/swiftui/how-to-create-a-custom-layout-using-the-layout-protocol">How to create a custom layout using the Layout protocol 
/example-code/language/how-to-conform-to-the-hashable-protocol">How to conform to the Hashable protocol</a>
`)],-1);function b(i,k){const a=m("VPCard");return p(),c("div",null,[t("h1",u,[t("a",d,[t("span",null,l(i.$frontmatter.title)+" 관련",1)])]),o(a,n(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),g,f,o(a,n(r({title:"What are inout parameters? | Language - free Swift example code",desc:"What are inout parameters?",link:"https://hackingwithswift.com/example-code/language/what-are-inout-parameters",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,e(" TODO: 작성 "),e(` 
When you pass value types as parameters into a function, they are constants and so can’t be modified. Sometimes it would be convenient to change this so you *can* modify the values, and that’s what \`inout\` does for us: it lets us modify parameters inside a function, and have those changes persist *outside* the function.

For example, we could write a function that accepts a number and doubles it:

\`\`\`swift
func double(_ number: inout Int) {
    number *= 2
}
\`\`\`

That doesn’t return a value – it modifies the value that was passed in directly.

When it comes to *calling* functions with \`inout\` parameters, Swift has two rules: we must pass in variables, and we also need to use \`&\` before the parameter name to acknowledge that it might be changed.

So, we would call \`double()\` like this:

\`\`\`swift
var number = 5
double(&number)
print(number)
\`\`\`

That will print 10.

\`inout\` parameters are more common than you might realize. For example, if you use \`+=\` to append one string to another, it uses \`inout\` to modify the string in place.

`),y])}const v=s(h,[["render",b],["__file","what-are-inout-parameters.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/what-are-inout-parameters.html","title":"What are inout parameters?","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"What are inout parameters?","description":"Article(s) > What are inout parameters?","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > What are inout parameters?"},{"property":"og:description","content":"What are inout parameters?"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-are-inout-parameters.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-are-inout-parameters.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"What are inout parameters?"}],["meta",{"property":"og:description","content":"Article(s) > What are inout parameters?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-10-18T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"What are inout parameters?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-18T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-10-18T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.35,"words":404},"filePathRelative":"hackingwithswift.com/example-code/language/what-are-inout-parameters.md","localizedDate":"2019년 10월 18일","excerpt":"\\n"}');export{v as comp,S as data};
