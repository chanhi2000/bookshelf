import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as t,as as p,ao as a,at as i,au as n,ak as e,aq as h,ar as w}from"./app-CpYYKbnj.js";const m={},d={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"};function f(c,o){const r=h("VPCard");return w(),l("div",null,[t("h1",d,[t("a",u,[t("span",null,p(c.$frontmatter.title)+" 관련",1)])]),a(r,i(n({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[0]||(o[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),o[1]||(o[1]=t("hr",null,null,-1)),a(r,i(n({title:"How to show the price of an SKProduct | System - free Swift example code",desc:"How to show the price of an SKProduct",logo:"https://hackingwithswift.com/favicon.svg",link:"https://hackingwithswift.com/example-code/how-to-show-the-price-of-an-skproduct",background:"rgba(174,10,10,0.2)"})),null,16),o[2]||(o[2]=t("blockquote",null,[t("p",null,"Available from iOS 3.0")],-1)),e(" TODO: 작성 "),e(` 
StoreKit products come with \`price\` and \`priceLocale\` properties but it takes a little effort to combine those two together in order to show a user-friendly price in your interface.

Fortunately, one small extension to \`SKProduct\` will provide you with a \`localizedPrice\` property you can use to do that work for you:

\`\`\`swift
extension SKProduct {
    var localizedPrice: String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.locale = priceLocale
        return formatter.string(from: price)!
    }
}
\`\`\`

`),o[3]||(o[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/quick-start/swiftui/how-to-show-an-alert">How to show an alert 
/quick-start/swiftui/how-to-show-a-map-view">How to show a Map view 
/quick-start/swiftui/how-to-show-multiple-alerts-in-a-single-view">How to show multiple alerts in a single view 
/example-code/uikit/how-do-you-show-a-modal-view-controller-when-a-uitabbarcontroller-tab-is-tapped">How do you show a modal view controller when a UITabBarController tab is tapped? 
/quick-start/swiftui/how-to-show-an-action-sheet">How to show an action sheet</a>
`)],-1))])}const k=s(m,[["render",f],["__file","how-to-show-the-price-of-an-skproduct.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-show-the-price-of-an-skproduct.html","title":"How to show the price of an SKProduct","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to show the price of an SKProduct","description":"Article(s) > How to show the price of an SKProduct","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-3.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to show the price of an SKProduct"},{"property":"og:description","content":"How to show the price of an SKProduct"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-show-the-price-of-an-skproduct.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-show-the-price-of-an-skproduct.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to show the price of an SKProduct"}],["meta",{"property":"og:description","content":"Article(s) > How to show the price of an SKProduct"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-3.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2021-03-03T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to show the price of an SKProduct\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-03-03T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2021-03-03T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.11,"words":333},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-show-the-price-of-an-skproduct.md","localizedDate":"2021년 3월 3일","excerpt":"\\n"}');export{k as comp,S as data};