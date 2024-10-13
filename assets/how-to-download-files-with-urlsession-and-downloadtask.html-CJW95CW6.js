import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as r,b as t,t as d,e as n,n as a,g as i,a as o,r as c,o as w}from"./app-TWLwS86W.js";const h={},p={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"},f=t("nav",{class:"table-of-contents"},[t("ul")],-1),g=t("hr",null,null,-1),u=t("blockquote",null,[t("p",null,"Available from iOS 7.0")],-1),k=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/quick-start/concurrency/how-to-download-json-from-the-internet-and-decode-it-into-any-codable-type">How to download JSON from the internet and decode it into any Codable type 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/example-code/libraries/how-to-preview-files-using-quick-look-and-qlpreviewcontroller">How to preview files using Quick Look and QLPreviewController 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode</a>
`)],-1);function y(s,S){const e=c("VPCard");return w(),r("div",null,[t("h1",p,[t("a",m,[t("span",null,d(s.$frontmatter.title)+" 관련",1)])]),n(e,a(i({title:"Networking - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/networking/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,g,n(e,a(i({title:"How to download files with URLSession and downloadTask() | Networking - free Swift example code",desc:"How to download files with URLSession and downloadTask()",link:"https://hackingwithswift.com/example-code/networking/how-to-download-files-with-urlsession-and-downloadtask",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),u,o(" TODO: 작성 "),o(` 
\`URLSession\` is designed to make network transfers as easy as possible, and a great example of that is its \`downloadTask\`()\` method. This fetches the contents of a URL you specify, saves it to a local file, then calls a completion handler so you can manipulate the file – all in one.

To demonstrate this, here’s some code to download the source code to the apple.com homepage:

\`\`\`swift
let url = URL(string: "https://www.apple.com")!

let task = URLSession.shared.downloadTask(with: url) { localURL, urlResponse, error in
    if let localURL = localURL {
        if let string = try? String(contentsOf: localURL) {
            print(string)
        }
    }
}

task.resume()
\`\`\`

There are a few important things to note in there:

1. Your completion handler gets called with a local URL, which is where the data was saved locally. This is optional, so you need to unwrap it carefully.
<li>If something went wrong – e.g. if the network was down – then you’ll get an error passed to you explaining what happened.
<li>When you have created your download task you should call \`resume()\` on it to make it happen.
<li>You don’t need to worry about storing the download task somewhere while it happens – it’s being tracked by the shared \`URLSession\` on your behalf.

`),k])}const b=l(h,[["render",y],["__file","how-to-download-files-with-urlsession-and-downloadtask.html.vue"]]),L=JSON.parse('{"path":"/hackingwithswift.com/example-code/networking/how-to-download-files-with-urlsession-and-downloadtask.html","title":"How to download files with URLSession and downloadTask()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to download files with URLSession and downloadTask()","description":"Article(s) > How to download files with URLSession and downloadTask()","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-7.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to download files with URLSession and downloadTask()"},{"property":"og:description","content":"How to download files with URLSession and downloadTask()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/networking/how-to-download-files-with-urlsession-and-downloadtask.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/networking/how-to-download-files-with-urlsession-and-downloadtask.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to download files with URLSession and downloadTask()"}],["meta",{"property":"og:description","content":"Article(s) > How to download files with URLSession and downloadTask()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-7.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to download files with URLSession and downloadTask()\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.56,"words":468},"filePathRelative":"hackingwithswift.com/example-code/networking/how-to-download-files-with-urlsession-and-downloadtask.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{b as comp,L as data};
