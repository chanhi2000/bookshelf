import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,f as t,av as h,au as a,aw as i,ax as r,b as n,r as p,o as d}from"./app-CCjNjKMa.js";const w={},m={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"};function u(s,e){const o=p("VPCard");return d(),l("div",null,[t("h1",m,[t("a",g,[t("span",null,h(s.$frontmatter.title)+" 관련",1)])]),a(o,i(r({title:"Core Graphics - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/core-graphics/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),a(o,i(r({title:"How to calculate the point where two lines intersect | Core Graphics - free Swift example code",desc:"How to calculate the point where two lines intersect",link:"https://hackingwithswift.com/example-code/core-graphics/how-to-calculate-the-point-where-two-lines-intersect",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("blockquote",null,[t("p",null,"Available from iOS 8.0")],-1)),n(" TODO: 작성 "),n(` 
Finding where two lines cross can be done by calculating their cross product. The code below returns an optional tuple containing the X and Y intersection points, or nil if they don’t cross at all.

**Note:** Core Graphics doesn’t give us a \`CGLine\` type, so you’ll need pass this four points: where the first line starts and ends, and where the second line starts and ends.

\`\`\`swift
func linesCross(start1: CGPoint, end1: CGPoint, start2: CGPoint, end2: CGPoint) -> (x: CGFloat, y: CGFloat)? {
    // calculate the differences between the start and end X/Y positions for each of our points
    let delta1x = end1.x - start1.x
    let delta1y = end1.y - start1.y
    let delta2x = end2.x - start2.x
    let delta2y = end2.y - start2.y

    // create a 2D matrix from our vectors and calculate the determinant
    let determinant = delta1x * delta2y - delta2x * delta1y

    if abs(determinant) < 0.0001 {
        // if the determinant is effectively zero then the lines are parallel/colinear
        return nil
    }

    // if the coefficients both lie between 0 and 1 then we have an intersection
    let ab = ((start1.y - start2.y) * delta2x - (start1.x - start2.x) * delta2y) / determinant

    if ab > 0 && ab < 1 {
        let cd = ((start1.y - start2.y) * delta1x - (start1.x - start2.x) * delta1y) / determinant

        if cd > 0 && cd < 1 {
            // lines cross – figure out exactly where and return it
            let intersectX = start1.x + ab * delta1x
            let intersectY = start1.y + ab * delta1y
            return (intersectX, intersectY)
        }
    }

    // lines don't cross
    return nil
}
\`\`\`

Note: this code is adapted from “Intersection of Two Lines in Three-Space”, which is a one-page chapter by Ronald Goodman in the book Graphics Gems. For more on how cross products work, I can highly recomend the book “Essential Mathematics for Games and Interactive Applications” by James M. Van Verth and Lars M. Bishop.

`),e[3]||(e[3]=t("details",{class:"hint-container details"},[t("summary",null,"Similar solutions…"),n(`
/example-code/core-graphics/how-to-calculate-the-distance-between-two-cgpoints">How to calculate the distance between two CGPoints 
/example-code/core-graphics/how-to-calculate-the-manhattan-distance-between-two-cgpoints">How to calculate the Manhattan distance between two CGPoints 
/example-code/core-graphics/how-to-draw-lines-in-core-graphics-moveto-and-addlineto">How to draw lines in Core Graphics: move(to:) and addLine(to:) 
/example-code/strings/how-to-get-the-lines-in-a-string-as-an-array">How to get the lines in a string as an array 
/example-code/strings/how-to-specify-floating-point-precision-in-a-string">How to specify floating-point precision in a string</a>
`)],-1))])}const x=c(w,[["render",u],["__file","how-to-calculate-the-point-where-two-lines-intersect.html.vue"]]),b=JSON.parse('{"path":"/hackingwithswift.com/example-code/core-graphics/how-to-calculate-the-point-where-two-lines-intersect.html","title":"How to calculate the point where two lines intersect","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to calculate the point where two lines intersect","description":"Article(s) > How to calculate the point where two lines intersect","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-8.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to calculate the point where two lines intersect"},{"property":"og:description","content":"How to calculate the point where two lines intersect"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/core-graphics/how-to-calculate-the-point-where-two-lines-intersect.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/core-graphics/how-to-calculate-the-point-where-two-lines-intersect.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to calculate the point where two lines intersect"}],["meta",{"property":"og:description","content":"Article(s) > How to calculate the point where two lines intersect"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-8.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to calculate the point where two lines intersect\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false,"gitInclude":[]},"headers":[],"readingTime":{"minutes":1.93,"words":579},"filePathRelative":"hackingwithswift.com/example-code/core-graphics/how-to-calculate-the-point-where-two-lines-intersect.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{x as comp,b as data};
