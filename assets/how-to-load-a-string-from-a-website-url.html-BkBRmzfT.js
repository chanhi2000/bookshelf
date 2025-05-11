import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as t,av as m,au as i,aw as n,ax as r,b as o,r as g,o as d}from"./app-BQ88-Ybo.js";const h={},w={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,e){const a=g("VPCard");return d(),c("div",null,[t("h1",w,[t("a",p,[t("span",null,m(s.$frontmatter.title)+" 관련",1)])]),i(a,n(r({title:"Strings - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/strings/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),i(a,n(r({title:"How to load a string from a website URL | Strings - free Swift example code",desc:"How to load a string from a website URL",link:"https://hackingwithswift.com/example-code/strings/how-to-load-a-string-from-a-website-url",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 2.0")],-1)),o(" TODO: 작성 "),o(` 
It takes just a few lines of Swift code to load the contents of a website URL, but there are three things you need to be careful with:

- Creating a \`URL\` might fail if you pass a bad site, so you need to unwrap its optional return value.
<li>Loading a URL's contents might fail because the site might be down (for example), so it might throw an error. This means you need to wrap the call into a \`do/catch\` block.
<li>Accessing network data is slow, so you really want to do this on a background thread.

Here's the code:

\`\`\`swift
if let url = URL(string: "https://www.hackingwithswift.com") {
    do {
        let contents = try String(contentsOf: url)
        print(contents)
    } catch {
        // contents could not be loaded
    }
} else {
    // the URL was bad!
}
\`\`\`

If you want to run that on a background thread (and you really ought to!) you should either use GCD's \`async()\` or \`performSelector(inBackground:)\`.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/how-to-load-a-remote-image-from-a-url">How to load a remote image from a URL 
/example-code/uikit/how-to-load-a-remote-image-url-into-uiimageview">How to load a remote image URL into UIImageView 
/example-code/strings/how-to-convert-a-string-to-a-safe-format-for-url-slugs-and-filenames">How to convert a string to a safe format for URL slugs and filenames 
/example-code/strings/how-to-detect-a-url-in-a-string-using-nsdatadetector">How to detect a URL in a String using NSDataDetector 
/example-code/system/how-to-open-a-url-in-safari">How to open a URL in Safari</a>
`)],-1))])}const y=l(h,[["render",f],["__file","how-to-load-a-string-from-a-website-url.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/strings/how-to-load-a-string-from-a-website-url.html","title":"How to load a string from a website URL","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to load a string from a website URL","description":"Article(s) > How to load a string from a website URL","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to load a string from a website URL"},{"property":"og:description","content":"How to load a string from a website URL"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/strings/how-to-load-a-string-from-a-website-url.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/strings/how-to-load-a-string-from-a-website-url.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to load a string from a website URL"}],["meta",{"property":"og:description","content":"Article(s) > How to load a string from a website URL"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to load a string from a website URL\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.5,"words":449},"filePathRelative":"hackingwithswift.com/example-code/strings/how-to-load-a-string-from-a-website-url.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{y as comp,k as data};
