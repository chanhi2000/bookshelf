import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,b as t,t as c,e as i,n as a,g as n,a as e,r as h,o as d}from"./app-DLPYIRXq.js";const p={},g={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"},m=t("nav",{class:"table-of-contents"},[t("ul")],-1),f=t("hr",null,null,-1),u=t("blockquote",null,[t("p",null,"Available from iOS 2.0")],-1),y=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/media/how-to-save-a-uiimage-to-a-file-using-jpegdata-and-pngdata">How to save a UIImage to a file using jpegData() and pngData() 
/example-code/strings/how-to-load-a-string-from-a-file-in-your-bundle">How to load a string from a file in your bundle 
/example-code/system/how-to-read-your-apps-version-from-your-infoplist-file">How to read your app’s version from your Info.plist file 
/example-code/system/how-to-find-the-path-to-a-file-in-your-bundle">How to find the path to a file in your bundle 
/example-code/language/how-to-write-a-closure-that-returns-a-value">How to write a closure that returns a value</a>
`)],-1);function k(r,v){const o=h("VPCard");return d(),l("div",null,[t("h1",g,[t("a",w,[t("span",null,c(r.$frontmatter.title)+" 관련",1)])]),i(o,a(n({title:"Strings - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/strings/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),m,f,i(o,a(n({title:"How to save a string to a file on disk with write(to:) | Strings - free Swift example code",desc:"How to save a string to a file on disk with write(to:)",link:"https://hackingwithswift.com/example-code/strings/how-to-save-a-string-to-a-file-on-disk-with-writeto",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),u,e(" TODO: 작성 "),e(` 
All strings have a \`write(to:)\` method that lets you save the contents of the string to disk. You need to provide a filename to write to, plus two more parameters: whether the write should be atomic, and what string encoding to use. The second parameter should nearly always be \`true\` because it avoids concurrency problems. The third parameter should nearly always be \`String.Encoding.utf8\`, which is pretty much the standard for reading and writing text.

Be warned: writing a string to disk can throw an exception, so you need to catch any errors and warn the user.

Here's the code:

\`\`\`swift
let str = "Super long string here"
let filename = getDocumentsDirectory().appendingPathComponent("output.txt")

do {
    try str.write(to: filename, atomically: true, encoding: String.Encoding.utf8)
} catch {
    // failed to write file – bad permissions, bad filename, missing permissions, or more likely it can't be converted to the encoding
}
\`\`\`

That code uses a helper function called \`getDocumentsDirectory()\`, which finds the path to where you can save your app's files. Here it is:

\`\`\`swift
func getDocumentsDirectory() -> URL {
    let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
    return paths[0]
}
\`\`\`

`),y])}const x=s(p,[["render",k],["__file","how-to-save-a-string-to-a-file-on-disk-with-writeto.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/strings/how-to-save-a-string-to-a-file-on-disk-with-writeto.html","title":"How to save a string to a file on disk with write(to:)","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to save a string to a file on disk with write(to:)","description":"Article(s) > How to save a string to a file on disk with write(to:)","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to save a string to a file on disk with write(to:)"},{"property":"og:description","content":"How to save a string to a file on disk with write(to:)"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/strings/how-to-save-a-string-to-a-file-on-disk-with-writeto.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/strings/how-to-save-a-string-to-a-file-on-disk-with-writeto.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to save a string to a file on disk with write(to:)"}],["meta",{"property":"og:description","content":"Article(s) > How to save a string to a file on disk with write(to:)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to save a string to a file on disk with write(to:)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.71,"words":512},"filePathRelative":"hackingwithswift.com/example-code/strings/how-to-save-a-string-to-a-file-on-disk-with-writeto.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{x as comp,S as data};
