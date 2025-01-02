import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as s,am as e,as as h,ao as n,at as i,au as r,ak as t,aq as p,ar as u}from"./app-CpYYKbnj.js";const m={},w={id:"frontmatter-title-관련",tabindex:"-1"},d={class:"header-anchor",href:"#frontmatter-title-관련"};function g(l,o){const a=p("VPCard");return u(),s("div",null,[e("h1",w,[e("a",d,[e("span",null,h(l.$frontmatter.title)+" 관련",1)])]),n(a,i(r({title:"Location - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/location/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[0]||(o[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),o[1]||(o[1]=e("hr",null,null,-1)),n(a,i(r({title:"How to look up a location with MKLocalSearch.Request | Location - free Swift example code",desc:"How to look up a location with MKLocalSearch.Request",link:"https://hackingwithswift.com/example-code/location/how-to-look-up-a-location-with-mklocalsearchrequest",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),o[2]||(o[2]=e("blockquote",null,[e("p",null,"Available from iOS 6.1")],-1)),t(" TODO: 작성 "),t(` 
MapKit has built-in functionality to let us look up places and businesses around the world, all using natural language searches that can be passed in straight from user entry.

First, import the MapKit framework, then create an instance of \`MKLocalSearch.Request\` that contains what you want to search for.

For example, this looks for Fortnum and Mason in London:

\`\`\`swift
let searchRequest = MKLocalSearch.Request()
searchRequest.naturalLanguageQuery = "Fortnum and Mason, London"
\`\`\`

That provides no other information to Apple other than the text string, so it will look everywhere in the world for such a match.

If you wanted, you could provide a specific search region by letting the user pan around an \`MKMapView\` for a specific location, then passing the region they are looking at to your search:

\`\`\`swift
searchRequest.region = yourMapView.region
\`\`\`

Once you’re ready, wrap the request inside an instance of \`MKLocalSearch\`, like this:

\`\`\`swift
let search = MKLocalSearch(request: searchRequest)
\`\`\`

When you’re ready, call the \`start()\` method on your search. This accepts one parameter, which is a closure that runs when the search completes – it will be handed the response data or an error, depending on what happened. This closure will always be run on your application’s main thread, so you can present some user interface immediately if you want.

As an example, this code will loop over all the results that were found for the search, printing out the phone number for each one:

\`\`\`swift
search.start { response, error in
    guard let response = response else {
        print("Error: \\(error?.localizedDescription ?? "Unknown error").")
        return
    }

    for item in response.mapItems {
        print(item.phoneNumber ?? "No phone number.")
    }
}
\`\`\`

Even without a map region, Apple Maps found the London store just fine, but obviously passing in a map region will help your accuracy improve.

If for some reason the request didn’t return quickly enough and you no longer need a response, call its \`cancel()\` method to abort the request.

`),o[3]||(o[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/location/how-to-request-a-users-location-only-once-using-requestlocation">How to request a user's location only once using requestLocation 
/example-code/games/how-to-find-a-touchs-location-in-a-node-using-locationin">How to find a touch's location in a node using location(in:) 
/example-code/uikit/how-to-find-a-touchs-location-in-a-view-with-locationin">How to find a touch's location in a view with location(in:) 
/example-code/libraries/how-to-preview-files-using-quick-look-and-qlpreviewcontroller">How to preview files using Quick Look and QLPreviewController 
/example-code/language/how-to-create-quick-look-debug-previews-for-your-custom-types">How to create Quick Look debug previews for your custom types</a>
`)],-1))])}const y=c(m,[["render",g],["__file","how-to-look-up-a-location-with-mklocalsearchrequest.html.vue"]]),q=JSON.parse('{"path":"/hackingwithswift.com/example-code/location/how-to-look-up-a-location-with-mklocalsearchrequest.html","title":"How to look up a location with MKLocalSearch.Request","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to look up a location with MKLocalSearch.Request","description":"Article(s) > How to look up a location with MKLocalSearch.Request","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-6.1","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to look up a location with MKLocalSearch.Request"},{"property":"og:description","content":"How to look up a location with MKLocalSearch.Request"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/location/how-to-look-up-a-location-with-mklocalsearchrequest.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/location/how-to-look-up-a-location-with-mklocalsearchrequest.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to look up a location with MKLocalSearch.Request"}],["meta",{"property":"og:description","content":"Article(s) > How to look up a location with MKLocalSearch.Request"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-6.1"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to look up a location with MKLocalSearch.Request\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.02,"words":606},"filePathRelative":"hackingwithswift.com/example-code/location/how-to-look-up-a-location-with-mklocalsearchrequest.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{y as comp,q as data};
