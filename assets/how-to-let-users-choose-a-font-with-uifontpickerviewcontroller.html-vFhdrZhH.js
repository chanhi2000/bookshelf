import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as t,as as h,ao as n,at as r,au as a,ak as o,aq as f,ar as w}from"./app-J50hDzMj.js";const u={},p={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function m(s,e){const i=f("VPCard");return w(),c("div",null,[t("h1",p,[t("a",d,[t("span",null,h(s.$frontmatter.title)+" 관련",1)])]),n(i,r(a({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),n(i,r(a({title:"How to let users choose a font with UIFontPickerViewController | UIKit - free Swift example code",desc:"How to let users choose a font with UIFontPickerViewController",link:"https://hackingwithswift.com/example-code/uikit/how-to-let-users-choose-a-font-with-uifontpickerviewcontroller",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 13.0")],-1)),o(" TODO: 작성 "),o(`
UIKit provides \`UIFontPickerViewController\` as a built-in view controller for letting users select from a list of installed fonts available for our apps. Using it takes three steps: create a delegate to handle callbacks, create and show an instance of the font picker, then read the response as appropriate.

As an example, if you had a \`UIViewController\` subclass that wanted to show a font picker, you would make it conform to the \`UIFontPickerViewControllerDelegate\` protocol like this:

\`\`\`swift
class ViewController: UIViewController, UIFontPickerViewControllerDelegate {
    // the rest of your class
}
\`\`\`

Second, you would create the font picker, assign the current view controller as its delegate, then show it like this:

\`\`\`swift
let vc = UIFontPickerViewController()
vc.delegate = self
present(vc, animated: true)
\`\`\`

Finally, you would implement the \`fontPickerViewControllerDidPickFont()\` method. This sends you back the \`UIFontPickerViewController\` instance you created, from which you can read the font descriptor that was chosen.

If you weren’t already aware, a *font descriptor* is different from a *font*: it describes the type of font chosen, but doesn’t associate a size with it. So, if you want to use the selected font in a label you need to create a \`UIFont\` instance from it.

For example, you might write this:

\`\`\`swift
func fontPickerViewControllerDidPickFont(_ viewController: UIFontPickerViewController) {
    // attempt to read the selected font descriptor, but exit quietly if that fails
    guard let descriptor = viewController.selectedFontDescriptor else { return }

    let font = UIFont(descriptor: descriptor, size: 36)
    yourLabel.font = font
}
\`\`\`

You don’t need to dismiss the font picker; it will be dismissed automatically.

If you want to, you can optionally also add the \`fontPickerViewControllerDidCancel()\` method, which will be called if the user cancels the font picker rather than selecting a font:

\`\`\`swift
func fontPickerViewControllerDidCancel(_ viewController: UIFontPickerViewController) {
    // handle cancel event here
}
\`\`\`

Again, this will automatically dismiss the font picker for you, so you don’t need to do it yourself.

It’s worth adding that you have some control over how the font picker works. More specifically, you can create it with a customization class that contains three useful properties:

- \`displayUsingSystemFont\` will show each font in the default system font, rather than using the font itself. This sacrifices some usefulness for legibility. (This is false by default.)
<li>\`includeFaces\` adds a dropdown arrow next to each font type, letting users select different weights and options. (This is also false by default.)
<li>\`filteredTraits\` is an array of traits that limit the types of font you want to show. (This is empty by default, so all fonts are shown.)

For example, if we wanted to show a font picker in system fonts, with faces included, but only showing serif fonts (think Times New Roman rather than Helvetica), we’d write code like this:

\`\`\`swift
let configuration = UIFontPickerViewController.Configuration()
configuration.includeFaces = true
configuration.displayUsingSystemFont = true
configuration.filteredTraits = [.classModernSerifs]

let vc = UIFontPickerViewController(configuration: configuration)
\`\`\`

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),o(`
/example-code/media/how-to-choose-a-photo-from-the-camera-roll-using-uiimagepickercontroller">How to choose a photo from the camera roll using UIImagePickerController 
/quick-start/concurrency/how-to-call-an-async-function-using-async-let">How to call an async function using async let 
/quick-start/swiftui/how-to-use-dynamic-type-with-a-custom-font">How to use Dynamic Type with a custom font 
/example-code/uikit/how-to-resize-a-custom-font-using-uifontmetrics">How to resize a custom font using UIFontMetrics 
/example-code/uikit/how-to-style-the-font-in-a-uinavigationbars-title">How to style the font in a UINavigationBar's title</a>
`)],-1))])}const y=l(u,[["render",m],["__file","how-to-let-users-choose-a-font-with-uifontpickerviewcontroller.html.vue"]]),C=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-let-users-choose-a-font-with-uifontpickerviewcontroller.html","title":"How to let users choose a font with UIFontPickerViewController","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to let users choose a font with UIFontPickerViewController","description":"Article(s) > How to let users choose a font with UIFontPickerViewController","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to let users choose a font with UIFontPickerViewController"},{"property":"og:description","content":"How to let users choose a font with UIFontPickerViewController"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-let-users-choose-a-font-with-uifontpickerviewcontroller.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-let-users-choose-a-font-with-uifontpickerviewcontroller.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to let users choose a font with UIFontPickerViewController"}],["meta",{"property":"og:description","content":"Article(s) > How to let users choose a font with UIFontPickerViewController"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-10-01T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to let users choose a font with UIFontPickerViewController\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-01T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-10-01T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.5,"words":749},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-let-users-choose-a-font-with-uifontpickerviewcontroller.md","localizedDate":"2019년 10월 1일","excerpt":"\\n"}');export{y as comp,C as data};
