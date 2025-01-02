import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as s,am as e,as as h,ao as i,at as r,au as n,ak as o,aq as m,ar as p}from"./app-CpYYKbnj.js";const d={},g={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"};function k(c,t){const a=m("VPCard");return p(),s("div",null,[e("h1",g,[e("a",u,[e("span",null,h(c.$frontmatter.title)+" 관련",1)])]),i(a,r(n({title:"UIKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uikit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),i(a,r(n({title:"How to take a photo using the camera and UIImagePickerController | UIKit - free Swift example code",desc:"How to take a photo using the camera and UIImagePickerController",link:"https://hackingwithswift.com/example-code/uikit/how-to-take-a-photo-using-the-camera-and-uiimagepickercontroller",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 3.0")],-1)),o(" TODO: 작성 "),o(`
UIKit has a built-in view controller designed to let the user take photos, crop them as needed, them load them directly into your app. Even better, it only takes a few lines of code to use!

First, make your view controller conform to both \`UINavigationControllerDelegate\`, and \`UIImagePickerControllerDelegate\`.

Second, add this code wherever you want to trigger the camera process:

\`\`\`swift
let vc = UIImagePickerController()
vc.sourceType = .camera
vc.allowsEditing = true
vc.delegate = self
present(vc, animated: true)
\`\`\`

The \`sourceType\` property is what directs the view controller to the camera rather than the user’s saved image library.

Third, add the \`didFinishPickingMediaWithInfo\` method, which gets called by the image picker when an image was selected. You need to read it out of the info dictionary using the key \`.editedImage\`, but then you have a \`UIImage\` that you can do whatever you want with.

This example code should get you started:

\`\`\`swift
func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
    picker.dismiss(animated: true)

    guard let image = info[.editedImage] as? UIImage else {
        print("No image found")
        return
    }

    // print out the image size as a test
    print(image.size)
}
\`\`\`

That’s all the code needed to make the camera work, but there is one last change you need: reading images from the camera requires a new Info.plist key describing how you plan to use the data.

To add this, open your Info.plist file, right-click on some space below the rows, then choose Add Row. Give it the name “Privacy - Camera Usage Description”, then enter a description in the value area – this will be shown to users the first time you try to use the camera.
`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/example-code/media/how-to-choose-a-photo-from-the-camera-roll-using-uiimagepickercontroller">How to choose a photo from the camera roll using UIImagePickerController 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource</a>
`)],-1))])}const y=l(d,[["render",k],["__file","how-to-take-a-photo-using-the-camera-and-uiimagepickercontroller.html.vue"]]),I=JSON.parse('{"path":"/hackingwithswift.com/example-code/uikit/how-to-take-a-photo-using-the-camera-and-uiimagepickercontroller.html","title":"How to take a photo using the camera and UIImagePickerController","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to take a photo using the camera and UIImagePickerController","description":"Article(s) > How to take a photo using the camera and UIImagePickerController","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-3.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to take a photo using the camera and UIImagePickerController"},{"property":"og:description","content":"How to take a photo using the camera and UIImagePickerController"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-take-a-photo-using-the-camera-and-uiimagepickercontroller.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-take-a-photo-using-the-camera-and-uiimagepickercontroller.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to take a photo using the camera and UIImagePickerController"}],["meta",{"property":"og:description","content":"Article(s) > How to take a photo using the camera and UIImagePickerController"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-3.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to take a photo using the camera and UIImagePickerController\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.84,"words":553},"filePathRelative":"hackingwithswift.com/example-code/uikit/how-to-take-a-photo-using-the-camera-and-uiimagepickercontroller.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,I as data};
