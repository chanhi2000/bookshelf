import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as e,as as d,ao as a,at as i,au as r,ak as o,aq as h,ar as m}from"./app-CpYYKbnj.js";const p={},u={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"};function g(s,t){const n=h("VPCard");return m(),l("div",null,[e("h1",u,[e("a",w,[e("span",null,d(s.$frontmatter.title)+" 관련",1)])]),a(n,i(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),a(n,i(r({title:"How to run code when an object is destroyed | Language - free Swift example code",desc:"How to run code when an object is destroyed",link:"https://hackingwithswift.com/example-code/language/how-to-run-code-when-an-object-is-destroyed",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),o(" TODO: 작성 "),o(` 
All structs and classes can have initializers, which are special methods that run when those types are created. However, classes can also have *deinitializers* – code that gets run when an instance of the class is destroyed. This isn’t possible with structs because they only ever have one owner.

Deinitializers never take any parameters, so they are written just as \`deinit\`. For example, we could create a simple \`Person\` class with an initializer and a deinitializer:

\`\`\`swift
class Person {
    init() {
        print("I'm alive!")
    }

    deinit {
        print("I'm dying!")
    }
}
\`\`\`

If you want to try that in a playground, run this code:

\`\`\`swift
do {
    let person = Person()
}
\`\`\`

Putting the \`Person\` instance inside a \`do\` block ensures it will be destroyed before the playground finishes, so you should see “I’m alive!” and “I’m dying!”

Deinitializers are extremely important when handling memory that isn’t managed by Swift. For example, if you’re using an external C library and it has allocated RAM, you should free that RAM inside your deinitializer.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/quick-start/concurrency/how-to-use-mainactor-to-run-code-on-the-main-queue">How to use @MainActor to run code on the main queue 
/example-code/system/how-to-run-code-when-your-app-is-terminated">How to run code when your app is terminated 
/quick-start/swiftui/how-to-access-a-core-data-managed-object-context-from-a-swiftui-view">How to access a Core Data managed object context from a SwiftUI view 
/example-code/arrays/how-to-tell-if-an-array-contains-an-object">How to tell if an array contains an object 
/example-code/language/remove-all-instances-of-an-object-from-an-array">Remove all instances of an object from an array</a>
`)],-1))])}const b=c(p,[["render",g],["__file","how-to-run-code-when-an-object-is-destroyed.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-run-code-when-an-object-is-destroyed.html","title":"How to run code when an object is destroyed","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to run code when an object is destroyed","description":"Article(s) > How to run code when an object is destroyed","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to run code when an object is destroyed"},{"property":"og:description","content":"How to run code when an object is destroyed"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-run-code-when-an-object-is-destroyed.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-run-code-when-an-object-is-destroyed.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to run code when an object is destroyed"}],["meta",{"property":"og:description","content":"Article(s) > How to run code when an object is destroyed"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to run code when an object is destroyed\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.55,"words":465},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-run-code-when-an-object-is-destroyed.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,k as data};
