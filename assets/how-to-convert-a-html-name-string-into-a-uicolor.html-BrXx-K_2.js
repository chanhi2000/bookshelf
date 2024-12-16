import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as s,am as e,as as c,ao as F,at as a,au as r,ak as t,aq as m,ar as g}from"./app-gTf-Epb-.js";const h={},d={id:"frontmatter-title-관련",tabindex:"-1"},u={class:"header-anchor",href:"#frontmatter-title-관련"};function p(i,n){const o=m("VPCard");return g(),s("div",null,[e("h1",d,[e("a",u,[e("span",null,c(i.$frontmatter.title)+" 관련",1)])]),F(o,a(r({title:"UIClolr - free Swift example code",desc:"Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",link:"/hackingwithswift.com/example-code/uicolor/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[0]||(n[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),n[1]||(n[1]=e("hr",null,null,-1)),F(o,a(r({title:"How to convert a HTML name string into a UIColor | UIClolr - free Swift example code",desc:"How to convert a HTML name string into a UIColor",link:"https://hackingwithswift.com/example-code/uicolor/how-to-convert-a-html-name-string-into-a-uicolor",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),n[2]||(n[2]=e("blockquote",null,[e("p",null,"Available from iOS 2.0")],-1)),t(" TODO: 작성 "),t(` 
HTML color names let you use familiar titles like "steel blue" and "mint cream" rather than hex values, but sadly these standardized names aren't available in iOS – or at least not by default. Fortunately, it's easy to add an extension to \`UIColor\` that maps these names to hexadecimal color values, then add another extension to convert hex colors to \`UIColors\`. Here's the code:

\`\`\`swift
extension UIColor {
    public convenience init?(hexString: String) {
        let r, g, b, a: CGFloat

        if hexString.hasPrefix("#") {
            let start = hexString.index(hexString.startIndex, offsetBy: 1)
            let hexColor = hexString.substring(from: start)

            if hexColor.count == 8 {
                let scanner = Scanner(string: hexColor)
                var hexNumber: UInt64 = 0

                if scanner.scanHexInt64(&hexNumber) {
                    r = CGFloat((hexNumber & 0xff000000) >> 24) / 255
                    g = CGFloat((hexNumber & 0x00ff0000) >> 16) / 255
                    b = CGFloat((hexNumber & 0x0000ff00) >> 8) / 255
                    a = CGFloat(hexNumber & 0x000000ff) / 255

                    self.init(red: r, green: g, blue: b, alpha: a)
                    return
                }
            }
        }

        return nil
    }

    public convenience init?(name: String) {
        let allColors = [
            "aliceblue": "#F0F8FFFF",
            "antiquewhite": "#FAEBD7FF",
            "aqua": "#00FFFFFF",
            "aquamarine": "#7FFFD4FF",
            "azure": "#F0FFFFFF",
            "beige": "#F5F5DCFF",
            "bisque": "#FFE4C4FF",
            "black": "#000000FF",
            "blanchedalmond": "#FFEBCDFF",
            "blue": "#0000FFFF",
            "blueviolet": "#8A2BE2FF",
            "brown": "#A52A2AFF",
            "burlywood": "#DEB887FF",
            "cadetblue": "#5F9EA0FF",
            "chartreuse": "#7FFF00FF",
            "chocolate": "#D2691EFF",
            "coral": "#FF7F50FF",
            "cornflowerblue": "#6495EDFF",
            "cornsilk": "#FFF8DCFF",
            "crimson": "#DC143CFF",
            "cyan": "#00FFFFFF",
            "darkblue": "#00008BFF",
            "darkcyan": "#008B8BFF",
            "darkgoldenrod": "#B8860BFF",
            "darkgray": "#A9A9A9FF",
            "darkgrey": "#A9A9A9FF",
            "darkgreen": "#006400FF",
            "darkkhaki": "#BDB76BFF",
            "darkmagenta": "#8B008BFF",
            "darkolivegreen": "#556B2FFF",
            "darkorange": "#FF8C00FF",
            "darkorchid": "#9932CCFF",
            "darkred": "#8B0000FF",
            "darksalmon": "#E9967AFF",
            "darkseagreen": "#8FBC8FFF",
            "darkslateblue": "#483D8BFF",
            "darkslategray": "#2F4F4FFF",
            "darkslategrey": "#2F4F4FFF",
            "darkturquoise": "#00CED1FF",
            "darkviolet": "#9400D3FF",
            "deeppink": "#FF1493FF",
            "deepskyblue": "#00BFFFFF",
            "dimgray": "#696969FF",
            "dimgrey": "#696969FF",
            "dodgerblue": "#1E90FFFF",
            "firebrick": "#B22222FF",
            "floralwhite": "#FFFAF0FF",
            "forestgreen": "#228B22FF",
            "fuchsia": "#FF00FFFF",
            "gainsboro": "#DCDCDCFF",
            "ghostwhite": "#F8F8FFFF",
            "gold": "#FFD700FF",
            "goldenrod": "#DAA520FF",
            "gray": "#808080FF",
            "grey": "#808080FF",
            "green": "#008000FF",
            "greenyellow": "#ADFF2FFF",
            "honeydew": "#F0FFF0FF",
            "hotpink": "#FF69B4FF",
            "indianred": "#CD5C5CFF",
            "indigo": "#4B0082FF",
            "ivory": "#FFFFF0FF",
            "khaki": "#F0E68CFF",
            "lavender": "#E6E6FAFF",
            "lavenderblush": "#FFF0F5FF",
            "lawngreen": "#7CFC00FF",
            "lemonchiffon": "#FFFACDFF",
            "lightblue": "#ADD8E6FF",
            "lightcoral": "#F08080FF",
            "lightcyan": "#E0FFFFFF",
            "lightgoldenrodyellow": "#FAFAD2FF",
            "lightgray": "#D3D3D3FF",
            "lightgrey": "#D3D3D3FF",
            "lightgreen": "#90EE90FF",
            "lightpink": "#FFB6C1FF",
            "lightsalmon": "#FFA07AFF",
            "lightseagreen": "#20B2AAFF",
            "lightskyblue": "#87CEFAFF",
            "lightslategray": "#778899FF",
            "lightslategrey": "#778899FF",
            "lightsteelblue": "#B0C4DEFF",
            "lightyellow": "#FFFFE0FF",
            "lime": "#00FF00FF",
            "limegreen": "#32CD32FF",
            "linen": "#FAF0E6FF",
            "magenta": "#FF00FFFF",
            "maroon": "#800000FF",
            "mediumaquamarine": "#66CDAAFF",
            "mediumblue": "#0000CDFF",
            "mediumorchid": "#BA55D3FF",
            "mediumpurple": "#9370D8FF",
            "mediumseagreen": "#3CB371FF",
            "mediumslateblue": "#7B68EEFF",
            "mediumspringgreen": "#00FA9AFF",
            "mediumturquoise": "#48D1CCFF",
            "mediumvioletred": "#C71585FF",
            "midnightblue": "#191970FF",
            "mintcream": "#F5FFFAFF",
            "mistyrose": "#FFE4E1FF",
            "moccasin": "#FFE4B5FF",
            "navajowhite": "#FFDEADFF",
            "navy": "#000080FF",
            "oldlace": "#FDF5E6FF",
            "olive": "#808000FF",
            "olivedrab": "#6B8E23FF",
            "orange": "#FFA500FF",
            "orangered": "#FF4500FF",
            "orchid": "#DA70D6FF",
            "palegoldenrod": "#EEE8AAFF",
            "palegreen": "#98FB98FF",
            "paleturquoise": "#AFEEEEFF",
            "palevioletred": "#D87093FF",
            "papayawhip": "#FFEFD5FF",
            "peachpuff": "#FFDAB9FF",
            "peru": "#CD853FFF",
            "pink": "#FFC0CBFF",
            "plum": "#DDA0DDFF",
            "powderblue": "#B0E0E6FF",
            "purple": "#800080FF",
            "rebeccapurple": "#663399FF",
            "red": "#FF0000FF",
            "rosybrown": "#BC8F8FFF",
            "royalblue": "#4169E1FF",
            "saddlebrown": "#8B4513FF",
            "salmon": "#FA8072FF",
            "sandybrown": "#F4A460FF",
            "seagreen": "#2E8B57FF",
            "seashell": "#FFF5EEFF",
            "sienna": "#A0522DFF",
            "silver": "#C0C0C0FF",
            "skyblue": "#87CEEBFF",
            "slateblue": "#6A5ACDFF",
            "slategray": "#708090FF",
            "slategrey": "#708090FF",
            "snow": "#FFFAFAFF",
            "springgreen": "#00FF7FFF",
            "steelblue": "#4682B4FF",
            "tan": "#D2B48CFF",
            "teal": "#008080FF",
            "thistle": "#D8BFD8FF",
            "tomato": "#FF6347FF",
            "turquoise": "#40E0D0FF",
            "violet": "#EE82EEFF",
            "wheat": "#F5DEB3FF",
            "white": "#FFFFFFFF",
            "whitesmoke": "#F5F5F5FF",
            "yellow": "#FFFF00FF",
            "yellowgreen": "#9ACD32FF"
        ]

        let cleanedName = name.replacingOccurrences(of: " ", with: "").lowercased()

        if let hexString = allColors[cleanedName] {
            self.init(hexString: hexString)
        } else {
            return nil
        }
    }
}
\`\`\`

With that done, here's how you create a color:

\`\`\`swift
let steelBlue = UIColor(name: "steel blue")
\`\`\`

`),n[3]||(n[3]=e("details",{class:"hint-container details"},[e("summary",null,"Similar solutions…"),t(`
/example-code/uikit/how-to-load-a-html-string-into-a-wkwebview-or-uiwebview-loadhtmlstring">How to load a HTML string into a WKWebView or UIWebView: loadHTMLString() 
/example-code/system/how-to-convert-html-to-an-nsattributedstring">How to convert HTML to an NSAttributedString 
/example-code/uicolor/how-to-convert-a-hex-color-to-a-uicolor">How to convert a hex color to a UIColor 
/example-code/uicolor/how-to-read-the-red-green-blue-and-alpha-color-components-from-a-uicolor">How to read the red, green, blue, and alpha color components from a UIColor 
/example-code/uicolor/how-to-use-an-image-for-your-background-color-with-uicolorpatternimage">How to use an image for your background color with UIColor(patternImage:)</a>
`)],-1))])}const b=l(h,[["render",p],["__file","how-to-convert-a-html-name-string-into-a-uicolor.html.vue"]]),C=JSON.parse('{"path":"/hackingwithswift.com/example-code/uicolor/how-to-convert-a-html-name-string-into-a-uicolor.html","title":"How to convert a HTML name string into a UIColor","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to convert a HTML name string into a UIColor","description":"Article(s) > How to convert a HTML name string into a UIColor","category":["Swift","iOS","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swift-5.10","ios","ios-2.0","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to convert a HTML name string into a UIColor"},{"property":"og:description","content":"How to convert a HTML name string into a UIColor"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uicolor/how-to-convert-a-html-name-string-into-a-uicolor.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uicolor/how-to-convert-a-html-name-string-into-a-uicolor.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to convert a HTML name string into a UIColor"}],["meta",{"property":"og:description","content":"Article(s) > How to convert a HTML name string into a UIColor"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swift-5.10"}],["meta",{"property":"article:tag","content":"ios"}],["meta",{"property":"article:tag","content":"ios-2.0"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2019-03-28T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to convert a HTML name string into a UIColor\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-28T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2019-03-28T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.64,"words":792},"filePathRelative":"hackingwithswift.com/example-code/uicolor/how-to-convert-a-html-name-string-into-a-uicolor.md","localizedDate":"2019년 3월 28일","excerpt":"\\n"}');export{b as comp,C as data};
