import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as t,as as d,ao as n,at as i,au as s,ak as e,aq as p,ar as m}from"./app-CpYYKbnj.js";const g={},w={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"};function u(r,a){const o=p("VPCard");return m(),l("div",null,[t("h1",w,[t("a",h,[t("span",null,d(r.$frontmatter.title)+" 관련",1)])]),n(o,i(s({title:"Location - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/location/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a[0]||(a[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),a[1]||(a[1]=t("hr",null,null,-1)),n(o,i(s({title:"Adding places to MKMapView using MKPlacemark | Location - free Swift example code",desc:"Adding places to MKMapView using MKPlacemark",link:"https://hackingwithswift.com/example-code/location/adding-places-to-mkmapview-using-mkplacemark",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),a[2]||(a[2]=t("blockquote",null,[t("p",null,"Available from iOS 3.0")],-1)),e(" TODO: 작성 "),e(' \nYou can add places to any map view using the `MKPlacemark` class, and it’s different from adding regular annotations – the map view shows the whole address on the map, even from far away, so users can see important points easily.\n\nYour address needs to be specified as a series of keys from the Contacts framework, so start by adding this import:\n\n```swift\nimport Contacts\n```\n\nNow add the GPS coordinate and address for the placemark you want. This creates a coordinate and address for Fortnum & Mason in London:\n\n```swift\nlet coords = CLLocationCoordinate2DMake(51.5083, -0.1384)\n\nlet address = [CNPostalAddressStreetKey: "181 Piccadilly, St. James\'s", CNPostalAddressCityKey: "London", CNPostalAddressPostalCodeKey: "W1A 1ER", CNPostalAddressISOCountryCodeKey: "GB"]\n```\n\nYou can then wrap that up inside an `MKPlacemark` instance like this:\n\n```swift\nlet place = MKPlacemark(coordinate: coords, addressDictionary: address)\n```\n\nFinally, add that to your map view. `MKPlacemark` conforms to the `MKAnnotation` protocol, so you use `addAnnotation()`:\n\n```swift\nmapView.addAnnotation(place)\n```\n\n'),a[3]||(a[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),e(`
/example-code/location/how-to-find-directions-using-mkmapview-and-mkdirectionsrequest">How to find directions using MKMapView and MKDirections.Request 
/example-code/location/how-to-add-annotations-to-mkmapview-using-mkpointannotation-and-mkpinannotationview">How to add annotations to MKMapView using MKPointAnnotation and MKPinAnnotationView 
/example-code/location/how-to-add-a-button-to-an-mkmapview-annotation">How to add a button to an MKMapView annotation 
/example-code/location/how-to-add-an-mkmapview-using-mapkit">How to add an MKMapView using MapKit 
/quick-start/swiftui/adding-tabview-and-tabitem">Adding TabView and tabItem()</a>
`)],-1))])}const M=c(g,[["render",u],["__file","adding-places-to-mkmapview-using-mkplacemark.html.vue"]]),y=JSON.parse('{"path":"/hackingwithswift.com/example-code/location/adding-places-to-mkmapview-using-mkplacemark.html","title":"Adding places to MKMapView using MKPlacemark","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Adding places to MKMapView using MKPlacemark","description":"Article(s) > Adding places to MKMapView using MKPlacemark","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-3.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Adding places to MKMapView using MKPlacemark"},{"property":"og:description","content":"Adding places to MKMapView using MKPlacemark"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/location/adding-places-to-mkmapview-using-mkplacemark.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/location/adding-places-to-mkmapview-using-mkplacemark.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Adding places to MKMapView using MKPlacemark"}],["meta",{"property":"og:description","content":"Article(s) > Adding places to MKMapView using MKPlacemark"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-3.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Adding places to MKMapView using MKPlacemark\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.31,"words":393},"filePathRelative":"hackingwithswift.com/example-code/location/adding-places-to-mkmapview-using-mkplacemark.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{M as comp,y as data};