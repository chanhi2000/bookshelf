import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as e,as as m,ao as r,at as i,au as n,ak as t,aq as h,ar as p}from"./app-CpYYKbnj.js";const g={},d={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"};function w(l,o){const a=h("VPCard");return p(),c("div",null,[e("h1",d,[e("a",u,[e("span",null,m(l.$frontmatter.title)+" 관련",1)])]),r(a,i(n({title:"Media - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/media/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[0]||(o[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),o[1]||(o[1]=e("hr",null,null,-1)),r(a,i(n({title:"How to choose a photo from the camera roll using UIImagePickerController | Media - free Swift example code",desc:"How to choose a photo from the camera roll using UIImagePickerController",link:"https://hackingwithswift.com/example-code/media/how-to-choose-a-photo-from-the-camera-roll-using-uiimagepickercontroller",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[2]||(o[2]=e("blockquote",null,[e("p",null,"Available from iOS 2.0")],-1)),t(" TODO: 작성 "),t(` 
The \`UIImagePickerController\` class is a super-simple way to select and import user photos into your app. As a bonus, it also automatically handles requesting user permission to read the photo library, so all you need to do is be ready to respond when the user selects a photo.

First, make sure your view controller conforms to the \`UINavigationControllerDelegate\` and \`UIImagePickerControllerDelegate\` protocols. Next, fill it in with methods to trigger selecting a picture, to handle cancelling, and to handle picture selection.

Here’s a working example to get you started:

\`\`\`swift
func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
    var newImage: UIImage

    if let possibleImage = info[.editedImage] as? UIImage {
        newImage = possibleImage
    } else if let possibleImage = info[.originalImage] as? UIImage {
        newImage = possibleImage
    } else {
        return
    }

    // do something interesting here!
    print(newImage.size)

    dismiss(animated: true)
}
\`\`\`

To use that code in your own project, replace the call to \`print()\` with something useful – you have the image, now what?

There’s one more thing before you’re done, which is to add a description of *why* you want access – what do you intend to do with your user’s photos? To set this, look for the file Info.plist in the project navigator and select it. This opens a new editor for modifying property list values (“plists”) – app configuration settings.

In the Key column, hover your mouse pointer over any item and you’ll see a + button appear; please click that to insert a new row. A huge list of options will appear – please scroll down and select “Privacy - Photo Library Usage Description”. In the “Value” box for your row, enter “We need to import photos of people”. This is the message Apple will show to the user when photo access is requested.

`),o[3]||(o[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/uikit/how-to-take-a-photo-using-the-camera-and-uiimagepickercontroller">How to take a photo using the camera and UIImagePickerController 
/example-code/games/how-to-roll-a-dice-using-gameplaykit-and-gkrandomdistribution">How to roll a dice using GameplayKit and GKRandomDistribution 
/example-code/uikit/how-to-let-users-choose-a-font-with-uifontpickerviewcontroller">How to let users choose a font with UIFontPickerViewController 
/example-code/media/how-to-turn-on-the-camera-flashlight-to-make-a-torch">How to turn on the camera flashlight to make a torch 
/example-code/media/uiimagewritetosavedphotosalbum-how-to-write-to-the-ios-photo-album">UIImageWriteToSavedPhotosAlbum(): how to write to the iOS photo album</a>
`)],-1))])}const I=s(g,[["render",w],["__file","how-to-choose-a-photo-from-the-camera-roll-using-uiimagepickercontroller.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/example-code/media/how-to-choose-a-photo-from-the-camera-roll-using-uiimagepickercontroller.html","title":"How to choose a photo from the camera roll using UIImagePickerController","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to choose a photo from the camera roll using UIImagePickerController","description":"Article(s) > How to choose a photo from the camera roll using UIImagePickerController","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to choose a photo from the camera roll using UIImagePickerController"},{"property":"og:description","content":"How to choose a photo from the camera roll using UIImagePickerController"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-choose-a-photo-from-the-camera-roll-using-uiimagepickercontroller.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/how-to-choose-a-photo-from-the-camera-roll-using-uiimagepickercontroller.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to choose a photo from the camera roll using UIImagePickerController"}],["meta",{"property":"og:description","content":"Article(s) > How to choose a photo from the camera roll using UIImagePickerController"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to choose a photo from the camera roll using UIImagePickerController\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.98,"words":595},"filePathRelative":"hackingwithswift.com/example-code/media/how-to-choose-a-photo-from-the-camera-roll-using-uiimagepickercontroller.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{I as comp,y as data};