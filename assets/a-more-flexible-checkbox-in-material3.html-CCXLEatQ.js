import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as h,d as t,f as o,b as s,a as r,t as p,n as a,g as i,r as c,o as k}from"./app-BItykJLQ.js";const f={},g={id:"frontmatter-title-관련",tabindex:"-1"},b={class:"header-anchor",href:"#frontmatter-title-관련"};function u(l,e){const n=c("VPCard"),m=c("SiteInfo");return k(),h("div",null,[t("h1",g,[t("a",b,[t("span",null,p(l.$frontmatter.title)+" 관련",1)])]),o(n,a(i({title:"Android > Article(s)",desc:"Article(s)",link:"/programming/java-android/articles/README.md",logo:"/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),e[0]||(e[0]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[1]||(e[1]=t("hr",null,null,-1)),o(m,{name:"A more flexible Checkbox in Material3",desc:"Starting with version 1.4.0-alpha07 of compose.material3:material3 we get a new API for Checkbox, which provides us an option to customize the stroke of the checkmark and checkbox-outline.",url:"https://droidcon.com/2025/02/13/a-more-flexible-checkbox-in-material3",logo:"https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",preview:"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*CwviBMtZIwUrgykadkDXKg.png"}),e[2]||(e[2]=s('<figure><img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*CwviBMtZIwUrgykadkDXKg.png" alt="Header" tabindex="0" loading="lazy"><figcaption>Header</figcaption></figure><p>Starting with version<strong>1.4.0-alpha07</strong>of<strong>compose.material3:material3</strong>we get a new API for<strong>Checkbox</strong>, which provides us an option to<strong>customize</strong>the<strong>stroke</strong>of the<strong>checkmark</strong>and<strong>checkbox-outline****.</strong></p>',2)),r(` ###### Existing API

@Preview(showBackground = true)

@Composable

fun CheckboxOldSample() {

val checkedState = remember { mutableStateOf(true) }

Row(

modifier = Modifier.fillMaxWidth(),

verticalAlignment = androidx.compose.ui.Alignment.CenterVertically

) {

Checkbox(

checked = checkedState.value,

onCheckedChange = { checkedState.value = it }

)

Text(text = "Old Checkbox API"

}

}

@Preview(showBackground = true) @Composable fun CheckboxOldSample() { val checkedState = remember { mutableStateOf(true) } Row( modifier = Modifier.fillMaxWidth(), verticalAlignment = androidx.compose.ui.Alignment.CenterVertically ) { Checkbox( checked = checkedState.value, onCheckedChange = { checkedState.value = it } ) Text(text = "Old Checkbox API" } }

@Preview(showBackground = true)
@Composable
fun CheckboxOldSample() {
    val checkedState = remember { mutableStateOf(true) }
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
    ) {
        Checkbox(
            checked = checkedState.value,
            onCheckedChange = { checkedState.value = it }
        )
        Text(text = "Old Checkbox API"
    }
}

![](https://miro.medium.com/v2/resize:fit:898/format:webp/1*WTuXHGRKl70b-TSX2HTgOw.png)

Docs of existing API

###### New API implementation

@Composable

fun CheckboxWithRoundedStrokes() {

val strokeWidthPx = with(LocalDensity.current) { floor(CheckboxDefaults.StrokeWidth.toPx()) }

val checkmarkStroke =

remember(strokeWidthPx) {

Stroke(

width = strokeWidthPx,

cap = StrokeCap.Square,

join = StrokeJoin.Round,

pathEffect = PathEffect.dashPathEffect(floatArrayOf(2f, 6f))

)

}

val outlineStroke = remember(strokeWidthPx) {

Stroke(width = 8f)

}

val checkedState = remember { mutableStateOf(true) }

Row(

modifier = Modifier.fillMaxWidth(),

verticalAlignment = androidx.compose.ui.Alignment.CenterVertically

) {

Checkbox(

checked = true,

onCheckedChange = { },

// New properties

checkmarkStroke = checkmarkStroke,

outlineStroke = outlineStroke

)

Text(text = "New Checkbox API")

}

}

@Composable fun CheckboxWithRoundedStrokes() { val strokeWidthPx = with(LocalDensity.current) { floor(CheckboxDefaults.StrokeWidth.toPx()) } val checkmarkStroke = remember(strokeWidthPx) { Stroke( width = strokeWidthPx, cap = StrokeCap.Square, join = StrokeJoin.Round, pathEffect = PathEffect.dashPathEffect(floatArrayOf(2f, 6f)) ) } val outlineStroke = remember(strokeWidthPx) { Stroke(width = 8f) } val checkedState = remember { mutableStateOf(true) } Row( modifier = Modifier.fillMaxWidth(), verticalAlignment = androidx.compose.ui.Alignment.CenterVertically ) { Checkbox( checked = true, onCheckedChange = { }, // New properties checkmarkStroke = checkmarkStroke, outlineStroke = outlineStroke ) Text(text = "New Checkbox API") } }

@Composable
fun CheckboxWithRoundedStrokes() {
    val strokeWidthPx = with(LocalDensity.current) { floor(CheckboxDefaults.StrokeWidth.toPx()) }
    val checkmarkStroke =
        remember(strokeWidthPx) {
            Stroke(
                width = strokeWidthPx,
                cap = StrokeCap.Square,
                join = StrokeJoin.Round,
                pathEffect = PathEffect.dashPathEffect(floatArrayOf(2f, 6f))
            )
        }
    val outlineStroke = remember(strokeWidthPx) {
        Stroke(width = 8f)
    }
    val checkedState = remember { mutableStateOf(true) }
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
    ) {
        Checkbox(
            checked = true,
            onCheckedChange = { },
            // New properties
            checkmarkStroke = checkmarkStroke,
            outlineStroke = outlineStroke
        )

        Text(text = "New Checkbox API")
    }
}

###### Demo

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*IFS3_W_JwGP8wZHB8WeIeg.png)

Preview of 2 states — New API

###### Stay in touch

[navczydev.bsky.social](https://bsky.app/profile/navczydev.bsky.social?source=post_page-----378edc1f9aca--------------------------------------- "navczydev.bsky.social")[Nav Singh (@navczydev@androiddev.social)](https://androiddev.social/@navczydev?source=post_page-----378edc1f9aca--------------------------------------- "Nav Singh (@navczydev@androiddev.social)")[navczydev - Overview](https://github.com/navczydev?source=post_page-----378edc1f9aca--------------------------------------- "navczydev - Overview")[x.com](https://x.com/navczydev?source=post_page-----378edc1f9aca--------------------------------------- "x.com")

###### References

[Compose Material 3 | Jetpack | Android Developers](https://developer.android.com/jetpack/androidx/releases/compose-material3?source=post_page-----378edc1f9aca---------------------------------------#1.4.0-alpha07 "Compose Material 3 | Jetpack | Android Developers")

This article is previously published on [proandroiddev.com.](https://proandroiddev.com/a-more-flexible-checkbox-material3-378edc1f9aca) `),r(" TODO: add ARTICLE CARD "),o(n,a(i({title:"A more flexible Checkbox in Material3",desc:"Starting with version 1.4.0-alpha07 of compose.material3:material3 we get a new API for Checkbox, which provides us an option to customize the stroke of the checkmark and checkbox-outline.",link:"https://chanhi2000.github.io/bookshelf/droidcon.com/a-more-flexible-checkbox-in-material3.html",logo:"https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",background:"rgba(4,20,221,0.2)"})),null,16)])}const S=d(f,[["render",u]]),w=JSON.parse('{"path":"/droidcon.com/a-more-flexible-checkbox-in-material3.html","title":"A more flexible Checkbox in Material3","lang":"en-US","frontmatter":{"lang":"en-US","title":"A more flexible Checkbox in Material3","description":"Article(s) > A more flexible Checkbox in Material3","icon":"fa-brands fa-android","category":["Java","Kotlin","Android","Article(s)"],"tag":["blog","droidcon.com","java","kotlin","android"],"head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"A more flexible Checkbox in Material3\\",\\"image\\":[\\"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*CwviBMtZIwUrgykadkDXKg.png\\",\\"https://miro.medium.com/v2/resize:fit:898/format:webp/1*WTuXHGRKl70b-TSX2HTgOw.png\\",\\"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*IFS3_W_JwGP8wZHB8WeIeg.png\\"],\\"datePublished\\":\\"2025-02-13T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Nav Singh\\"}]}"],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/droidcon.com/a-more-flexible-checkbox-in-material3.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"A more flexible Checkbox in Material3"}],["meta",{"property":"og:description","content":"Article(s) > A more flexible Checkbox in Material3"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*CwviBMtZIwUrgykadkDXKg.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*CwviBMtZIwUrgykadkDXKg.png"}],["meta",{"name":"twitter:image:alt","content":"A more flexible Checkbox in Material3"}],["meta",{"property":"article:author","content":"Nav Singh"}],["meta",{"property":"article:tag","content":"android"}],["meta",{"property":"article:tag","content":"kotlin"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"droidcon.com"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:published_time","content":"2025-02-13T00:00:00.000Z"}],[{"meta":null},{"property":"og:title","content":"Article(s) > A more flexible Checkbox in Material3"},{"property":"og:description","content":"A more flexible Checkbox in Material3"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/droidcon.com/a-more-flexible-checkbox-in-material3.html"}]],"prev":"/programming/java-android/articles/README.md","date":"2025-02-13T00:00:00.000Z","isOriginal":false,"author":"Nav Singh","cover":"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*CwviBMtZIwUrgykadkDXKg.png"},"git":{},"readingTime":{"minutes":2.1,"words":630},"filePathRelative":"droidcon.com/a-more-flexible-checkbox-in-material3.md","copyright":{"author":"Nav Singh"}}');export{S as comp,w as data};
