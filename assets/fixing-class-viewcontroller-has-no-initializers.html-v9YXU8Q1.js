import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as h,f as e,av as g,au as i,aw as a,ax as r,b as o,r as l,o as m}from"./app-BQ88-Ybo.js";const u={},d={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"};function w(s,t){const n=l("VPCard"),c=l("VidStack");return m(),h("div",null,[e("h1",d,[e("a",f,[e("span",null,g(s.$frontmatter.title)+" 관련",1)])]),i(n,a(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),i(n,a(r({title:"Fixing ”Class ViewController has no initializers” | Language - free Swift example code",desc:"Fixing ”Class ViewController has no initializers”",link:"https://hackingwithswift.com/example-code/language/fixing-class-viewcontroller-has-no-initializers",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 13.0")],-1)),i(c,{src:"youtube/o_qBp32KpOI"}),o(" TODO: 작성 "),o(` 
This is a common error, and one you can fix in just a few seconds. Swift has very strict rules about property initialization: if you give a class any properties without a default value, you *must* create an initializer that sets those default values.

There are two ways to solve this problem: either provide a default value for your property when you define the property, or create a custom \`init()\` method to set the value.

First, identify the problem property. Look for things like this:

\`\`\`swift
class ViewController: UIViewController {
    var username: String
}
\`\`\`

That defines a new property but doesn't give it an initial value, so Swift will refuse to build the app.

The simple solution is just to give your property a sensible initial value when it's defined, like this:

\`\`\`swift
class ViewController: UIViewController {
    var username: String = "Anonymous"
}
\`\`\`

The slightly more complicated solution is to create a custom initializer that gives properties default values in one place, then calls \`super.init()\`. When working with \`UIViewController\` and storyboards, the initializer you will want to override should look like this:

\`\`\`swift
required init?(coder aDecoder: NSCoder) {
    self.username = "Anonymous"
    super.init(coder: aDecoder)
}
\`\`\`

Remember: you must initialize all your own properties before calling \`super.init()\` or any other methods.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/uikit/fixing-failed-to-obtain-a-cell-from-its-datasource">Fixing "Failed to obtain a cell from its DataSource" 
/example-code/uikit/fixing-unable-to-dequeue-a-cell-with-identifier">Fixing "Unable to dequeue a cell with identifier" 
/example-code/language/fixing-ambiguous-reference-to-member-when-using-ceil-or-round">Fixing "Ambiguous reference to member when using ceil or round"</a>
`)],-1))])}const b=p(u,[["render",w],["__file","fixing-class-viewcontroller-has-no-initializers.html.vue"]]),v=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/fixing-class-viewcontroller-has-no-initializers.html","title":"Fixing ”Class ViewController has no initializers”","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Fixing ”Class ViewController has no initializers”","description":"Article(s) > Fixing ”Class ViewController has no initializers”","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Fixing ”Class ViewController has no initializers”"},{"property":"og:description","content":"Fixing ”Class ViewController has no initializers”"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/fixing-class-viewcontroller-has-no-initializers.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/fixing-class-viewcontroller-has-no-initializers.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Fixing ”Class ViewController has no initializers”"}],["meta",{"property":"og:description","content":"Article(s) > Fixing ”Class ViewController has no initializers”"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Fixing ”Class ViewController has no initializers”\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.43,"words":430},"filePathRelative":"hackingwithswift.com/example-code/language/fixing-class-viewcontroller-has-no-initializers.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,v as data};
