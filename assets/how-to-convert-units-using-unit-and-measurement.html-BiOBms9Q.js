import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as e,as as u,ao as i,at as a,au as s,ak as n,aq as m,ar as d}from"./app-CVhcaaOv.js";const h={},p={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function w(r,t){const o=m("VPCard");return d(),c("div",null,[e("h1",p,[e("a",g,[e("span",null,u(r.$frontmatter.title)+" 관련",1)])]),i(o,a(s({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),i(o,a(s({title:"How to convert units using Unit and Measurement | System - free Swift example code",desc:"How to convert units using Unit and Measurement",link:"https://hackingwithswift.com/example-code/system/how-to-convert-units-using-unit-and-measurement",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("blockquote",null,[e("p",null,"Available from iOS 10.0")],-1)),n(" TODO: 작성 "),n(` 
iOS 10 introduced a new system for calculating distance, length, area, volume, duration, and many more measurements. Let’s start with something simple. If you’re six feet tall, you’d create a \`Measurement\` instance like this:

\`\`\`swift
let heightFeet = Measurement(value: 6, unit: UnitLength.feet)
\`\`\`

Note that Swift can’t infer \`.feet\` to mean \`UnitLength.feet\` because there are lots of \`Unit\` subclasses as you’ll see soon.

Once you have a measurement ready, you can convert it to other units like this:

\`\`\`swift
let heightInches = heightFeet.converted(to: UnitLength.inches)
let heightSensible = heightFeet.converted(to: UnitLength.meters)
\`\`\`

You should see “72.0 in” and “1.8288 m” in your output, showing that the conversion process has worked. 

The \`UnitLength\` class, like all unit subclasses, spans a huge range of units from old to futuristic. For example, you can convert feet to astronomical units, which is equal to the average distance between the Earth and the Sun, or about 150 million kilometers:

\`\`\`swift
let heightAUs = heightFeet.converted(to: UnitLength.astronomicalUnits)
\`\`\`

Once you’ve used one unit, the rest work identically. Here are some more examples to get you started:

\`\`\`swift
// convert degrees to radians
let degrees = Measurement(value: 180, unit: UnitAngle.degrees)
let radians = degrees.converted(to: .radians)

// convert square meters to square centimeters
let squareMeters = Measurement(value: 4, unit: UnitArea.squareMeters)
let squareCentimeters = squareMeters.converted(to: .squareCentimeters)

// convert bushels to imperial teaspoons
let bushels = Measurement(value: 6, unit: UnitVolume.bushels)
let teaspoons = bushels.converted(to: .imperialTeaspoons)
\`\`\`

Honestly, I have no idea what the bushels to imperial teaspoons ratio is, but it’s nice to be given the option!

`),t[3]||(t[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),n(`
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/quick-start/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts">How to use Instruments to profile your SwiftUI code and identify slow layouts</a>
`)],-1))])}const v=l(h,[["render",w],["__file","how-to-convert-units-using-unit-and-measurement.html.vue"]]),k=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-convert-units-using-unit-and-measurement.html","title":"How to convert units using Unit and Measurement","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to convert units using Unit and Measurement","description":"Article(s) > How to convert units using Unit and Measurement","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-10.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to convert units using Unit and Measurement"},{"property":"og:description","content":"How to convert units using Unit and Measurement"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-convert-units-using-unit-and-measurement.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-convert-units-using-unit-and-measurement.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to convert units using Unit and Measurement"}],["meta",{"property":"og:description","content":"Article(s) > How to convert units using Unit and Measurement"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-10.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2018-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to convert units using Unit and Measurement\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2018-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.76,"words":527},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-convert-units-using-unit-and-measurement.md","localizedDate":"2018년 3월 28일","excerpt":"\\n"}');export{v as comp,k as data};
