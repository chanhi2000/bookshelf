import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,f as e,av as g,au as n,aw as i,ax as r,b as a,r as d,o as m}from"./app-BdFl9trH.js";const u={},h={id:"frontmatter-title-관련",tabindex:"-1"},p={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,t){const o=d("VPCard");return m(),l("div",null,[e("h1",h,[e("a",p,[e("span",null,g(s.$frontmatter.title)+" 관련",1)])]),n(o,i(r({title:"ARKit - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/arkit/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(o,i(r({title:"How to detect images using ARImageTrackingConfiguration | ARKit - free Swift example code",desc:"How to detect images using ARImageTrackingConfiguration",link:"https://hackingwithswift.com/example-code/arkit/how-to-detect-images-using-arimagetrackingconfiguration",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 12.0")],-1)),a(" TODO: 작성 "),a(`
ARKit can automatically scan for images in the world, which means you can attach overlays showing more detail or trigger other behaviors inside your app depending on what was found. There are two important drawbacks you should be aware of before you start:

1. The images need to be visually distinct, which means they need some amount of detail and color variation. Xcode will warn you if your images aren’t good enough.
2. ARKit can detect a fixed number of images at a time, so if you want to detect many you either need to decide which to search for based on location (e.g. iBeacons in an art gallery), or cycle between your picture selection constantly. 25 or fewer is the target Apple recommends.

To get started detecting images, create a new iOS project using the Augmented Reality App template and SceneKit, then clean it up: open <FontIcon icon="fa-brands fa-swift"/>\`ViewController.swift\`, clear out everything in \`viewDidLoad()\` except the call to \`super.viewDidLoad()\` and \`sceneView.delegate = self\`, and finally delete the three empty methods at the end. You can also delete art.scnassets, which isn’t needed here.

The first step is to import the pictures you want ARKit to recognize. Remember, these should be digital copies of real-world pictures, so either scan the real-world objects or print your images. These pictures should *not* just be dragged into your asset catalog – we need to add them in a special way.

In your asset catalog, right-click on the blank space below AppIcon and choose New AR Resource Group. It will be named “AR Resources” by default, but I’d like you to change that to something that represents your images. For example, if you were looking for pictures in an art gallery you might call it Paintings. Now drag your images to where it says “No AR items”, to add those numbers to the resource group.

This process creates a set of images that ARKit is able to scan for, and although you can create as many as you want you can have only one active at a given time.

When you next press <kbd>Cmd</kbd>+B to build your project, Xcode will scan your ARKit images to make sure they are suitable for AR detection. You should, at least at first, always get warnings for your images, because Xcode should report the images need “non-zero, positive width”. This is because adding PNG files to the ARKit catalog isn’t enough: Xcode needs to know an estimated *size* of the images in the real world, so it can detect them more accurately. So, select each of your images, then enter their size into the attributes inspector – the default unit is meters, but you’ll probably find it easier to change that to centimeters.

Once you’ve entered a valid size for each image, Xcode’s warnings should go away – if any warnings remain it means your images fail the detection criteria, so read Xcode’s suggestions and try again.

The next step is to tell ARKit that we want to scan for images, and in particular those images we just added. Open <FontIcon icon="fa-brands fa-swift"/>\`ViewController.swift\` and change \`viewWillAppear()\` to this:

\`\`\`swift
override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)

    let configuration = ARImageTrackingConfiguration()

    guard let trackingImages = ARReferenceImage.referenceImages(inGroupNamed: "YourGroupNameHere", bundle: nil) else {
        // failed to read them – crash immediately!
        fatalError("Couldn't load tracking images.")
    }

    configuration.trackingImages = trackingImages
    sceneView.session.run(configuration)
}
\`\`\`

**Note:** Obviously you should change “YourGroupNameHere” to name of your AR resource group.

That loads the AR resource group you created and asks ARKit to track them. If for some reason you need to track more than one image at a time, you can set the \`maximumNumberOfTrackedImages\` property on your session to whatever you need – it defaults to 1, but modern iPhones can handle about 4.

Now that tracking is running, the final step is to make the app do something when your image is detected. Here’s some code for the \`ViewController\` class that places a translucent blue layer over each detected image:

\`\`\`swift
func renderer(_ renderer: SCNSceneRenderer, nodeFor anchor: ARAnchor) -> SCNNode? {
    // make sure this is an image anchor, otherwise bail out
    guard let imageAnchor = anchor as? ARImageAnchor else { return nil }

    // create a plane at the exact physical width and height of our reference image
    let plane = SCNPlane(width: imageAnchor.referenceImage.physicalSize.width, height: imageAnchor.referenceImage.physicalSize.height)

    // make the plane have a transparent blue color
    plane.firstMaterial?.diffuse.contents = UIColor.blue.withAlphaComponent(0.5)

    // wrap the plane in a node and rotate it so it's facing us
    let planeNode = SCNNode(geometry: plane)
    planeNode.eulerAngles.x = -.pi / 2

    // now wrap that in another node and send it back
    let node = SCNNode()
    node.addChildNode(planeNode)
    return node
}
\`\`\`

Wrapping our node in a parent is helpful so that ARKit can move, rotate, and scale the parent without affecting the child node inside.

**Tip:** You can read the name of the detected image by using \`imageAnchor.referenceImage.name\` – this will match whatever name it has in your asset catalog.

That’s all the code you need, so if you run the app on a real device you should be able to try scanning your images. When it runs for the first time you’ll be asked for camera permissions, but after that you’ll find you can detect your images in any orientation, pick them up, move them around, and so on – ARKit is remarkably good at detecting all sorts of variations.

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),a(`
/quick-start/swiftui/how-to-draw-images-using-image-views">How to draw images using Image views 
/quick-start/swiftui/how-to-use-decorative-images-to-reduce-screen-reader-clutter">How to use decorative images to reduce screen reader clutter 
/quick-start/swiftui/how-to-render-images-using-sf-symbols">How to render images using SF Symbols 
/example-code/xcode/how-to-use-vector-images-in-your-asset-catalog">How to use vector images in your asset catalog 
/quick-start/swiftui/how-to-insert-images-into-text">How to insert images into text</a>
`)],-1))])}const k=c(u,[["render",f],["__file","how-to-detect-images-using-arimagetrackingconfiguration.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/arkit/how-to-detect-images-using-arimagetrackingconfiguration.html","title":"How to detect images using ARImageTrackingConfiguration","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to detect images using ARImageTrackingConfiguration","description":"Article(s) > How to detect images using ARImageTrackingConfiguration","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-12.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to detect images using ARImageTrackingConfiguration"},{"property":"og:description","content":"How to detect images using ARImageTrackingConfiguration"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/arkit/how-to-detect-images-using-arimagetrackingconfiguration.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/arkit/how-to-detect-images-using-arimagetrackingconfiguration.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to detect images using ARImageTrackingConfiguration"}],["meta",{"property":"og:description","content":"Article(s) > How to detect images using ARImageTrackingConfiguration"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-12.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to detect images using ARImageTrackingConfiguration\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.86,"words":1157},"filePathRelative":"hackingwithswift.com/example-code/arkit/how-to-detect-images-using-arimagetrackingconfiguration.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{k as comp,b as data};
