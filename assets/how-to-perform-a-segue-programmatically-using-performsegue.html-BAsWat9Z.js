import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as m,am as e,as as c,ao as r,at as i,au as n,ak as o,aq as g,ar as p}from"./app-CpYYKbnj.js";const u={},h={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"};function d(s,t){const a=g("VPCard");return p(),m("div",null,[e("h1",h,[e("a",f,[e("span",null,c(s.$frontmatter.title)+" 관련",1)])]),r(a,i(n({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),r(a,i(n({title:"How to perform a segue programmatically using performSegue() | UIKit - free Swift example code",desc:"How to perform a segue programmatically using performSegue()",link:"https://hackingwithswift.com/example-code/uikit/how-to-perform-a-segue-programmatically-using-performsegue",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 5.0")],-1)),o(" TODO: 작성 "),o(`
Segues are a visual way to connect various components on your storyboard, but sometimes it’s important to be able to trigger them programmatically as well as after a user interaction.

Fortunately, it only takes two steps. First, select a segue in your storyboard, then go to the attributes inspector and give it a name such as “showDetail”.

Now head to your Swift code, to the place where you want to trigger the segue you just named. The method you need to call is \`performSegue()\`, which exists on all view controllers: pass it a segue identifier as well as whatever object you want to send along, and you’re done:

\`\`\`swift
performSegue(withIdentifier: "showDetail", sender: nil)
\`\`\`

Technically the \`sender\` parameter is whatever triggered the segue, but you can put whatever you want in there.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/uikit/what-is-a-segue">What is a segue? 
/quick-start/swiftui/how-to-hide-and-show-the-sidebar-programmatically">How to hide and show the sidebar programmatically 
/example-code/system/how-to-run-code-after-a-delay-using-asyncafter-and-perform">How to run code after a delay using asyncAfter() and perform() 
/example-code/system/how-to-cancel-a-delayed-perform-call">How to cancel a delayed perform() call 
/example-code/naturallanguage/how-to-perform-sentiment-analysis-on-a-string-using-nltagger">How to perform sentiment analysis on a string using NLTagger</a>
`)],-1))])}const k=l(u,[["render",d],["__file","how-to-perform-a-segue-programmatically-using-performsegue.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-perform-a-segue-programmatically-using-performsegue.html","title":"How to perform a segue programmatically using performSegue()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to perform a segue programmatically using performSegue()","description":"Article(s) > How to perform a segue programmatically using performSegue()","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-5.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to perform a segue programmatically using performSegue()"},{"property":"og:description","content":"How to perform a segue programmatically using performSegue()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-perform-a-segue-programmatically-using-performsegue.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-perform-a-segue-programmatically-using-performsegue.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to perform a segue programmatically using performSegue()"}],["meta",{"property":"og:description","content":"Article(s) > How to perform a segue programmatically using performSegue()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-5.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to perform a segue programmatically using performSegue()\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.33,"words":399},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-perform-a-segue-programmatically-using-performsegue.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,b as data};