import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,f as e,av as d,au as n,aw as a,ax as r,b as o,r as p,o as u}from"./app-n2Oj_rFs.js";const m={},w={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"};function f(s,t){const i=p("VPCard");return u(),c("div",null,[e("h1",w,[e("a",h,[e("span",null,d(s.$frontmatter.title)+" 관련",1)])]),n(i,a(r({title:"Location - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/location/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(i,a(r({title:"How to find directions using MKMapView and MKDirections.Request | Location - free Swift example code",desc:"How to find directions using MKMapView and MKDirections.Request",link:"https://hackingwithswift.com/example-code/location/how-to-find-directions-using-mkmapview-and-mkdirectionsrequest",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 6.0")],-1)),o(" TODO: 작성 "),o(` 
MapKit is great for letting users navigate from place to place, but also makes it easy for you to plot directions from one place to another. You just tell iOS where you're starting from, where you're going, as well as how you're traveling (by car, foot, or mass transit), and it will find routes for you.

First, make sure you have a map view in your app, and have the Maps entitlement enabled. Now add this code:

\`\`\`swift
import MapKit
import UIKit

class ViewController: UIViewController, MKMapViewDelegate {
    @IBOutlet var mapView: MKMapView!

    override func viewDidLoad() {
        super.viewDidLoad()

        let request = MKDirections.Request()
        request.source = MKMapItem(placemark: MKPlacemark(coordinate: CLLocationCoordinate2D(latitude: 40.7127, longitude: -74.0059), addressDictionary: nil))
        request.destination = MKMapItem(placemark: MKPlacemark(coordinate: CLLocationCoordinate2D(latitude: 37.783333, longitude: -122.416667), addressDictionary: nil))
        request.requestsAlternateRoutes = true
        request.transportType = .automobile

        let directions = MKDirections(request: request)

        directions.calculate { [unowned self] response, error in
            guard let unwrappedResponse = response else { return }

            for route in unwrappedResponse.routes {
                self.mapView.addOverlay(route.polyline)
                self.mapView.setVisibleMapRect(route.polyline.boundingMapRect, animated: true)
            }
        }
    }

    func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
        let renderer = MKPolylineRenderer(polyline: overlay as! MKPolyline)
        renderer.strokeColor = UIColor.blue
        return renderer
    }
}
\`\`\`

That example requests driving directions between New York and San Francisco. It asks for alternate routes if they exist (spoiler: they do), then sets up a closure to run when the directions come back that adds them as overlays to the map. To make the overlays draw, you need to implement the \`rendererFor\` method, but that's just three lines as you can see.

Note: because I request alternative routes if they exist, I loop through the array of returned routes to add them all to the map. The \`setVisibleMapRect()\` method is called once for each route, but fortunately that isn't a problem as all routes have the same start and end location!

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),o(`
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/quick-start/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts">How to use Instruments to profile your SwiftUI code and identify slow layouts</a>
`)],-1))])}const M=l(m,[["render",f],["__file","how-to-find-directions-using-mkmapview-and-mkdirectionsrequest.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/location/how-to-find-directions-using-mkmapview-and-mkdirectionsrequest.html","title":"How to find directions using MKMapView and MKDirections.Request","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to find directions using MKMapView and MKDirections.Request","description":"Article(s) > How to find directions using MKMapView and MKDirections.Request","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-6.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to find directions using MKMapView and MKDirections.Request"},{"property":"og:description","content":"How to find directions using MKMapView and MKDirections.Request"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/location/how-to-detect-ibeacons.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/location/how-to-find-directions-using-mkmapview-and-mkdirectionsrequest.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to find directions using MKMapView and MKDirections.Request"}],["meta",{"property":"og:description","content":"Article(s) > How to find directions using MKMapView and MKDirections.Request"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-6.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to find directions using MKMapView and MKDirections.Request\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.85,"words":555},"filePathRelative":"hackingwithswift.com/example-code/location/how-to-find-directions-using-mkmapview-and-mkdirectionsrequest.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{M as comp,k as data};
