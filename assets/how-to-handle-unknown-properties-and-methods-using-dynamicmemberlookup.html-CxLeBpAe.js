import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as m,am as e,as as p,ao as a,at as i,au as r,ak as n,aq as c,ar as d}from"./app-CpYYKbnj.js";const u={},h={id:"frontmatter-title-관련",tabindex:"-1"},w={class:"header-anchor",href:"#frontmatter-title-관련"};function g(s,t){const o=c("VPCard");return d(),m("div",null,[e("h1",h,[e("a",w,[e("span",null,p(s.$frontmatter.title)+" 관련",1)])]),a(o,i(r({title:"Language - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/language/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),a(o,i(r({title:"How to handle unknown properties and methods using @dynamicMemberLookup | Language - free Swift example code",desc:"How to handle unknown properties and methods using @dynamicMemberLookup",link:"https://hackingwithswift.com/example-code/language/how-to-handle-unknown-properties-and-methods-using-dynamicmemberlookup",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 8.0")],-1)),n(" TODO: 작성 "),n(` 
Swift has always had strong focus on type safety, but sometimes you need to be able to work with data where the structure isn’t known ahead of time.

To handle this situation, Swift has an attribute called \`@dynamicMemberLookup\`, which instructs Swift to call a subscript method when accessing properties. This subscript method, \`subscript(dynamicMember:)\`, is *required* when using the \`@dynamicMemberLookup\` attribute – you’ll get passed the string name of the property that was requested, and can return any value you like.

To help you understand the basics, here’s an example that creates a \`Person\` struct that reads its values from a dictionary:

\`\`\`swift
@dynamicMemberLookup
struct Person {
    subscript(dynamicMember member: String) -> String {
        let properties = ["name": "Taylor Swift", "city": "Nashville"]
        return properties[member, default: ""]
    }
}
\`\`\`

The \`@dynamicMemberLookup\` attribute requires the type to implement a \`subscript(dynamicMember:)\` method to handle the work of dynamic member lookup. As you can see, I’ve written one that accepts the member name as string and returns a string, and internally it just looks up the member name in a dictionary and returns its value.

That struct allows us to write code like this:

\`\`\`swift
let person = Person()
print(person.name)
print(person.city)
print(person.nameOfPet)
\`\`\`

That will compile cleanly and run, even though \`name\`, \`city\`, and \`nameOfPet\` do not exist as properties on the \`Person\` type. Instead, they are all looked up at runtime: that code will print “Taylor Swift” and “Nashville” for the first two calls to \`print()\`, then an empty string for the final one because our dictionary doesn’t store anything for \`nameOfPet\`.

This \`subscript(dynamicMember:)\` method *must* return a string, which is what enforces Swift’s type safety – even though you’re still dealing with dynamic data, Swift will ensure you get back what you expected.

If you want multiple different types, just implement different \`subscript(dynamicMember:)\` methods:

\`\`\`swift
@dynamicMemberLookup
struct Employee {
    subscript(dynamicMember member: String) -> String {
        let properties = ["name": "Taylor Swift", "city": "Nashville"]
        return properties[member, default: ""]
    }

    subscript(dynamicMember member: String) -> Int {
        let properties = ["age": 26, "height": 178]
        return properties[member, default: 0]
    }
}
\`\`\`

Now that any property can be accessed in more than one way, it’s important that you are clear which one should be used. That might be implicit, for example if you send the return value into a function that accepts only strings, or it might be explicit, like this:

\`\`\`swift
let employee = Employee()
let age: Int = employee.age
\`\`\`

Either way, Swift must know for sure which subscript will be called.

You can also overload \`subscript\` to return closures:

\`\`\`swift
@dynamicMemberLookup
struct User {
    subscript(dynamicMember member: String) -> (_ input: String) -> Void {
        return {
            print("Hello! I live at the address \\($0).")
        }
    }
}

let user = User()
user.printAddress("123 Swift Street")
\`\`\`

When that’s run, \`user.printAddress\` returns a closure that prints out a string, and the \`("123 Swift Street")\` part immediately calls it with that input. 

Using dynamic member subscripting in a type that has also regular properties and methods will result in those properties and methods always being used in place of the dynamic member. For example, we could define a \`Singer\` struct with a built-in \`name\` property alongside a dynamic member subscript:

\`\`\`swift
struct Singer {
    public var name = "Ed Sheeran"

    subscript(dynamicMember member: String) -> String {
        return "Taylor Swift"
    }
}

let singer = Singer()
print(singer.name)
\`\`\`

That code prints “Ed Sheeran”, because the \`name\` property will always be used rather than the dynamic member subscript.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),n(`
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/quick-start/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts">How to use Instruments to profile your SwiftUI code and identify slow layouts</a>
`)],-1))])}const b=l(u,[["render",g],["__file","how-to-handle-unknown-properties-and-methods-using-dynamicmemberlookup.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/language/how-to-handle-unknown-properties-and-methods-using-dynamicmemberlookup.html","title":"How to handle unknown properties and methods using @dynamicMemberLookup","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to handle unknown properties and methods using @dynamicMemberLookup","description":"Article(s) > How to handle unknown properties and methods using @dynamicMemberLookup","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to handle unknown properties and methods using @dynamicMemberLookup"},{"property":"og:description","content":"How to handle unknown properties and methods using @dynamicMemberLookup"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-handle-unknown-properties-and-methods-using-dynamicmemberlookup.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-handle-unknown-properties-and-methods-using-dynamicmemberlookup.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to handle unknown properties and methods using @dynamicMemberLookup"}],["meta",{"property":"og:description","content":"Article(s) > How to handle unknown properties and methods using @dynamicMemberLookup"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to handle unknown properties and methods using @dynamicMemberLookup\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.8,"words":841},"filePathRelative":"hackingwithswift.com/example-code/language/how-to-handle-unknown-properties-and-methods-using-dynamicmemberlookup.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,k as data};