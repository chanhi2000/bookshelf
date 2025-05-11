import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,f as e,av as c,au as n,aw as r,ax as i,b as o,r as u,o as p}from"./app-BQ88-Ybo.js";const y={},h={id:"frontmatter-title-관련",tabindex:"-1"},m={class:"header-anchor",href:"#frontmatter-title-관련"};function f(d,t){const a=u("VPCard");return p(),s("div",null,[e("h1",h,[e("a",m,[e("span",null,c(d.$frontmatter.title)+" 관련",1)])]),n(a,r(i({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(a,r(i({title:"How to decode JSON from your app bundle the easy way | System - free Swift example code",desc:"How to decode JSON from your app bundle the easy way",link:"https://hackingwithswift.com/example-code/how-to-decode-json-from-your-app-bundle-the-easy-way",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),o(" TODO: 작성 "),o(` 
If you want to load some JSON from your app bundle when your app runs, it takes quite a few lines of code: you need to get the URL from your bundle, load it into a \`Data\` instance, try decoding it, then catch any errors.

It’s such a common thing to do that I have an extension to make the process easier. I’ll show you the code first, then explain how it works.

Here’s the code:

\`\`\`swift
extension Bundle {
    func decode<T: Decodable>(_ type: T.Type, from file: String, dateDecodingStrategy: JSONDecoder.DateDecodingStrategy = .deferredToDate, keyDecodingStrategy: JSONDecoder.KeyDecodingStrategy = .useDefaultKeys) -> T {
        guard let url = self.url(forResource: file, withExtension: nil) else {
            fatalError("Failed to locate \\(file) in bundle.")
        }

        guard let data = try? Data(contentsOf: url) else {
            fatalError("Failed to load \\(file) from bundle.")
        }

        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = dateDecodingStrategy
        decoder.keyDecodingStrategy = keyDecodingStrategy

        do {
            return try decoder.decode(T.self, from: data)
        } catch DecodingError.keyNotFound(let key, let context) {
            fatalError("Failed to decode \\(file) from bundle due to missing key '\\(key.stringValue)' not found – \\(context.debugDescription)")
        } catch DecodingError.typeMismatch(_, let context) {
            fatalError("Failed to decode \\(file) from bundle due to type mismatch – \\(context.debugDescription)")
        } catch DecodingError.valueNotFound(let type, let context) {
            fatalError("Failed to decode \\(file) from bundle due to missing \\(type) value – \\(context.debugDescription)")
        } catch DecodingError.dataCorrupted(_) {
            fatalError("Failed to decode \\(file) from bundle because it appears to be invalid JSON")
        } catch {
            fatalError("Failed to decode \\(file) from bundle: \\(error.localizedDescription)")
        }
    }
}
\`\`\`

To use the extension, you need some sort of codable struct, such as this one:

\`\`\`swift
struct User: Codable {
    var name: String
}
\`\`\`

You also need some sort of JSON in your app bundle. For example, a file called data.json containing contents like this:

\`\`\`swift
{
    "name": "Taylor Swift"
}
\`\`\`

And now you can load your JSON into your struct in just a single line of code:

\`\`\`swift
let user = Bundle.main.decode(User.self, from: "data.json")
\`\`\`

The extension is capable of loading any kind of decodable data – your structs, arrays of your structs, and so on. Even better, you can use it to make properties in your types immutable and available as soon as your types are created, like this:

\`\`\`swift
class ViewController: UIViewController {
    let menuItems = Bundle.main.decode([MenuItem].self, from: "menu.json")
    // the rest of your code…
}
\`\`\`

Now, let me briefly explain what the code actually does.

First, it creates an extension on \`Bundle\` to add a \`decode()\` method:

\`\`\`swift
func decode<T: Decodable>(_ type: T.Type, from file: String, dateDecodingStrategy: JSONDecoder.DateDecodingStrategy = .deferredToDate, keyDecodingStrategy: JSONDecoder.KeyDecodingStrategy = .useDefaultKeys) -> T {
\`\`\`

As you can see, that method is generic over any kind of \`Decodable\` data type, and takes two required parameters: what you want to decode and the name of the JSON file in your bundle. There are two more parameters that have sensible default values, but allow you to customize dates and keys if you need to.

Next it attempts to find the path to the JSON in the app bundle, and load it into a \`Data\` instance. If either of those fail, the code uses \`fatalError()\` to force a crash in your app, which might seem bad but remember: this is a JSON file that you made by hand and added directly into your app bundle – if you forgot the JSON or it couldn’t be loaded, that’s a fundamental logic failure on your behalf and should be corrected.

Once the file is loaded the code creates a \`JSONDecoder\` and attempts to decode the file’s contents to the type you asked for. It then has a series of \`catch\` blocks to handle all possible errors, each of which trigger a crash telling you what was wrong.

Again, triggering a crash is perfectly fine here: this is all static, hard-coded JSON you have added directly to your app, so if it somehow changes format by surprise then your program shouldn’t run. In fact, I usually add tests that specifically attempt to load all the JSON I include in my app bundles, to make sure they don’t change by accident.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/quick-start/concurrency/how-to-download-json-from-the-internet-and-decode-it-into-any-codable-type">How to download JSON from the internet and decode it into any Codable type 
/example-code/system/how-to-run-code-when-your-app-is-terminated">How to run code when your app is terminated 
/example-code/system/how-to-find-the-path-to-a-file-in-your-bundle">How to find the path to a file in your bundle 
/example-code/uikit/how-to-localize-your-ios-app">How to localize your iOS app 
/example-code/strings/how-to-load-a-string-from-a-file-in-your-bundle">How to load a string from a file in your bundle</a>
`)],-1))])}const b=l(y,[["render",f],["__file","how-to-decode-json-from-your-app-bundle-the-easy-way.html.vue"]]),S=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-decode-json-from-your-app-bundle-the-easy-way.html","title":"How to decode JSON from your app bundle the easy way","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to decode JSON from your app bundle the easy way","description":"Article(s) > How to decode JSON from your app bundle the easy way","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to decode JSON from your app bundle the easy way"},{"property":"og:description","content":"How to decode JSON from your app bundle the easy way"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-decode-json-from-your-app-bundle-the-easy-way.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-decode-json-from-your-app-bundle-the-easy-way.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to decode JSON from your app bundle the easy way"}],["meta",{"property":"og:description","content":"Article(s) > How to decode JSON from your app bundle the easy way"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-10-06T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to decode JSON from your app bundle the easy way\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-06T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-10-06T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.21,"words":963},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-decode-json-from-your-app-bundle-the-easy-way.md","localizedDate":"2019년 10월 6일","excerpt":"\\n"}');export{b as comp,S as data};
