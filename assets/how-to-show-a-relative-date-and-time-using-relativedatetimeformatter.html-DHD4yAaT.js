import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,b as e,t as m,e as o,n as i,g as r,a as t,r as c,o as d}from"./app-TWLwS86W.js";const h={},p={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},w=e("nav",{class:"table-of-contents"},[e("ul")],-1),u=e("hr",null,null,-1),f=e("blockquote",null,[e("p",null,"Available from iOS 13.0")],-1),v=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/language/how-to-check-whether-a-date-is-inside-a-date-range">How to check whether a date is inside a date range 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/quick-start/swiftui/how-to-provide-relative-sizes-using-geometryreader">How to provide relative sizes using GeometryReader</a>
`)],-1);function y(n,k){const a=c("VPCard");return d(),l("div",null,[e("h1",p,[e("a",g,[e("span",null,m(n.$frontmatter.title)+" 관련",1)])]),o(a,i(r({title:"System - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/system/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),w,u,o(a,i(r({title:"How to show a relative date and time using RelativeDateTimeFormatter | System - free Swift example code",desc:"How to show a relative date and time using RelativeDateTimeFormatter",logo:"https://hackingwithswift.com/favicon.svg",link:"https://hackingwithswift.com/example-code/how-to-show-a-relative-date-and-time-using-relativedatetimeformatter",background:"rgba(174,10,10,0.2)"})),null,16),f,t(" TODO: 작성 "),t(` 
If you want to format dates and times in the form “5 hours ago” or “3 months ago”, Apple gives us a dedicated formatter called \`RelativeDateTimeFormatter\`. This is localized for many languages, so you’ll automatically get back strings that work in French, German, Chinese, and more, all depending on the user’s locale.

Here’s an example to get you started:

\`\`\`swift
// the date you want to format
let exampleDate = Date.now.addingTimeInterval(-15000)

// ask for the full relative date
let formatter = RelativeDateTimeFormatter()
formatter.unitsStyle = .full

// get exampleDate relative to the current date
let relativeDate = formatter.localizedString(for: exampleDate, relativeTo: Date.now)

// print it out
print("Relative date is: \\(relativeDate)")
\`\`\`

That will print “Relative date is: 4 hours ago”.

“Full” has a precise meaning here: we’ll get back things like “2 months ago”, and if you prefer you can try spell out mode to get “two months ago” or even short mode to get “2 mo. ago”.

Having that second \`relativeTo\` parameter available allows us to calculate relative values between two arbitrary dates, rather than one date and the current date:

\`\`\`swift
let relativeDate2 = formatter.localizedString(for: someDate, relativeTo: someOtherDate)
\`\`\`

**Tip:** Although relative time formatters are great for things in recent history – the last few months, perhaps – they are less useful for larger time gaps. So, you might want to try checking whether your date is over six months ago, and if so use a custom formatter instead to give the specific date.

`),v])}const T=s(h,[["render",y],["__file","how-to-show-a-relative-date-and-time-using-relativedatetimeformatter.html.vue"]]),x=JSON.parse('{"path":"/hackingwithswift.com/example-code/system/how-to-show-a-relative-date-and-time-using-relativedatetimeformatter.html","title":"How to show a relative date and time using RelativeDateTimeFormatter","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to show a relative date and time using RelativeDateTimeFormatter","description":"Article(s) > How to show a relative date and time using RelativeDateTimeFormatter","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-13.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to show a relative date and time using RelativeDateTimeFormatter"},{"property":"og:description","content":"How to show a relative date and time using RelativeDateTimeFormatter"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-show-a-relative-date-and-time-using-relativedatetimeformatter.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-show-a-relative-date-and-time-using-relativedatetimeformatter.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to show a relative date and time using RelativeDateTimeFormatter"}],["meta",{"property":"og:description","content":"Article(s) > How to show a relative date and time using RelativeDateTimeFormatter"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-13.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2022-03-23T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to show a relative date and time using RelativeDateTimeFormatter\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-03-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2022-03-23T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.73,"words":518},"filePathRelative":"hackingwithswift.com/example-code/system/how-to-show-a-relative-date-and-time-using-relativedatetimeformatter.md","localizedDate":"2022년 3월 23일","excerpt":"\\n"}');export{T as comp,x as data};
