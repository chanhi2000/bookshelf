import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,b as t,t as l,e as n,n as s,g as a,a as e,r as h,o as p}from"./app-TWLwS86W.js";const m={},d={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"},f=t("nav",{class:"table-of-contents"},[t("ul")],-1),w=t("hr",null,null,-1),g=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/testing/how-to-check-and-unwrap-optionals-in-tests-using-xctunwrap">How to check and unwrap optionals in tests using XCTUnwrap() 
/quick-start/swiftui/how-to-synchronize-animations-from-one-view-to-another-with-matchedgeometryeffect">How to synchronize animations from one view to another with matchedGeometryEffect() 
/example-code/system/how-to-decode-json-from-your-app-bundle-the-easy-way">How to decode JSON from your app bundle the easy way 
/quick-start/swiftui/building-a-menu-using-list">Building a menu using List 
/quick-start/swiftui/how-to-mask-one-view-with-another">How to mask one view with another</a>
`)],-1);function y(i,k){const o=h("VPCard");return p(),c("div",null,[t("h1",d,[t("a",u,[t("span",null,l(i.$frontmatter.title)+" 관련",1)])]),n(o,s(a({title:"Testing - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/testing/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,w,n(o,s(a({title:"How to do one-time setup for your tests | Testing - free Swift example code",desc:"How to do one-time setup for your tests",link:"https://hackingwithswift.com/example-code/testing/how-to-do-one-time-setup-for-your-tests",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e(" TODO: 작성 "),e(` 
When you create a default \`XCTestCase\` using Xcode you’ll get default \`setUp()\` and \`tearDown()\` methods like these:

\`\`\`swift
override func setUp() {
    super.setUp()
    // Put setup code here. This method is called before the invocation of each test method in the class.
}

override func tearDown() {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    super.tearDown()
}
\`\`\`

Those are called before and after every test inside your \`XCTestCase\` subclass, which allows you to reset your testing environment fully. However, sometimes you prefer to do some setup once and keep that state during all your tests, for example if you need to generate some test data that gets shared in all your tests.

As well as the regular \`setUp()\` and \`tearDown()\` instance methods, you can also define class methods with the same names, like this:

\`\`\`swift
override class func setUp() {
    super.setUp()
}

override class func tearDown() {
    super.tearDown()
}
\`\`\`

Unlike their instance method equivalents, these two class methods will be run only once each: \`setUp()\` before all your tests are run, and \`tearDown()\` after all your tests have completed.

`),g])}const b=r(m,[["render",y],["__file","how-to-do-one-time-setup-for-your-tests.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/example-code/testing/how-to-do-one-time-setup-for-your-tests.html","title":"How to do one-time setup for your tests","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to do one-time setup for your tests","description":"Article(s) > How to do one-time setup for your tests","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to do one-time setup for your tests"},{"property":"og:description","content":"How to do one-time setup for your tests"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/testing/how-to-do-one-time-setup-for-your-tests.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/testing/how-to-do-one-time-setup-for-your-tests.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to do one-time setup for your tests"}],["meta",{"property":"og:description","content":"Article(s) > How to do one-time setup for your tests"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to do one-time setup for your tests\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.52,"words":457},"filePathRelative":"hackingwithswift.com/example-code/testing/how-to-do-one-time-setup-for-your-tests.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{b as comp,x as data};
