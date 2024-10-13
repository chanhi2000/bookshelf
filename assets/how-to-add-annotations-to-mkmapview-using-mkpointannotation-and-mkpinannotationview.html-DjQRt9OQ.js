import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as d,b as t,t as c,e as i,n as a,g as e,a as n,r as l,o as p}from"./app-TWLwS86W.js";const w={},m={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"},u=t("nav",{class:"table-of-contents"},[t("ul")],-1),g=t("hr",null,null,-1),f=t("blockquote",null,[t("p",null,"Available from iOS 4.0")],-1),M=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),n(`
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/example-code/location/how-to-add-a-button-to-an-mkmapview-annotation">How to add a button to an MKMapView annotation</a>
`)],-1);function k(r,y){const o=l("VPCard");return p(),d("div",null,[t("h1",m,[t("a",h,[t("span",null,c(r.$frontmatter.title)+" 관련",1)])]),i(o,a(e({title:"Location - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/location/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),u,g,i(o,a(e({title:"How to add annotations to MKMapView using MKPointAnnotation and MKPinAnnotationView | Location - free Swift example code",desc:"How to add annotations to MKMapView using MKPointAnnotation and MKPinAnnotationView",link:"https://hackingwithswift.com/example-code/location/how-to-add-annotations-to-mkmapview-using-mkpointannotation-and-mkpinannotationview",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),f,n(" TODO: 작성 "),n(` 
Once you have an \`MKMapView\` up and running, it only takes a few lines of code more to drop pins containing placemarks.

Start by making your view controller the delegate of your map view, so that we can receive events. You should also make your view controller conform to \`MKMapViewDelegate\` in code.

Adding pins to the map takes two code changes. First you need to create an annotation describing where the pin is and what its name is – put this in your \`viewDidLoad()\` method:

\`\`\`swift
let london = MKPointAnnotation()
london.title = "London"
london.coordinate = CLLocationCoordinate2D(latitude: 51.507222, longitude: -0.1275)
yourMapView.addAnnotation(london)
\`\`\`

Second, you need to implement a \`viewFor\` method that converts your annotation into a view that can be displayed on the map. iOS comes with a built-in view type called \`MKPinAnnotationView\` that provides the familiar pin layout, so we can use that here. 

**Note:** For performance reasons, dropping pins onto a map works using re-use identifiers, just like loading table view cells. The code below tries to re-use pins, and you should do the same.

Add this to your view controller:

\`\`\`swift
func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {
    guard annotation is MKPointAnnotation else { return nil }

    let identifier = "Annotation"
    var annotationView = mapView.dequeueReusableAnnotationView(withIdentifier: identifier)

    if annotationView == nil {
        annotationView = MKPinAnnotationView(annotation: annotation, reuseIdentifier: identifier)
        annotationView!.canShowCallout = true
    } else {
        annotationView!.annotation = annotation
    }

    return annotationView
}
\`\`\`

That’s all the code you need!

`),M])}const V=s(w,[["render",k],["__file","how-to-add-annotations-to-mkmapview-using-mkpointannotation-and-mkpinannotationview.html.vue"]]),A=JSON.parse('{"path":"/hackingwithswift.com/example-code/location/how-to-add-annotations-to-mkmapview-using-mkpointannotation-and-mkpinannotationview.html","title":"How to add annotations to MKMapView using MKPointAnnotation and MKPinAnnotationView","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to add annotations to MKMapView using MKPointAnnotation and MKPinAnnotationView","description":"Article(s) > How to add annotations to MKMapView using MKPointAnnotation and MKPinAnnotationView","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-4.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to add annotations to MKMapView using MKPointAnnotation and MKPinAnnotationView"},{"property":"og:description","content":"How to add annotations to MKMapView using MKPointAnnotation and MKPinAnnotationView"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/location/how-to-add-annotations-to-mkmapview-using-mkpointannotation-and-mkpinannotationview.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/location/how-to-add-annotations-to-mkmapview-using-mkpointannotation-and-mkpinannotationview.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to add annotations to MKMapView using MKPointAnnotation and MKPinAnnotationView"}],["meta",{"property":"og:description","content":"Article(s) > How to add annotations to MKMapView using MKPointAnnotation and MKPinAnnotationView"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-4.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to add annotations to MKMapView using MKPointAnnotation and MKPinAnnotationView\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.7,"words":510},"filePathRelative":"hackingwithswift.com/example-code/location/how-to-add-annotations-to-mkmapview-using-mkpointannotation-and-mkpinannotationview.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{V as comp,A as data};
