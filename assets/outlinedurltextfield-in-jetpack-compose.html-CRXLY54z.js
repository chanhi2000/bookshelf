import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as p,d as n,f as i,a as o,t as m,n as a,g as r,e as t,r as s,o as g}from"./app-BItykJLQ.js";const x={},f={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"};function b(d,e){const l=s("VPCard"),c=s("SiteInfo");return g(),p("div",null,[n("h1",f,[n("a",h,[n("span",null,m(d.$frontmatter.title)+" 관련",1)])]),i(l,a(r({title:"Android > Article(s)",desc:"Article(s)",link:"/programming/java-android/articles/README.md",logo:"/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),e[0]||(e[0]=n("nav",{class:"table-of-contents"},[n("ul")],-1)),e[1]||(e[1]=n("hr",null,null,-1)),i(c,{name:"OutlinedUrlTextField in Jetpack Compose",desc:"If you’ve worked with Jetpack Compose, chances are you’ve used the common OutlinedTextField at some point in your app.",url:"https://droidcon.com/2025/02/12/outlinedurltextfield-in-jetpack-compose",logo:"https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",preview:"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*xBO70tloHjOUiAOwRMBeCQ.png"}),e[2]||(e[2]=n("figure",null,[n("img",{src:"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*xBO70tloHjOUiAOwRMBeCQ.png",alt:"Create your own OutlinedUrlTextField — AI was used to create this image",tabindex:"0",loading:"lazy"}),n("figcaption",null,"Create your own OutlinedUrlTextField — AI was used to create this image")],-1)),e[3]||(e[3]=n("p",null,[t("If you’ve worked with Jetpack Compose, chances are you’ve used the common"),n("a",{href:"https://m3.material.io/components/text-fields/overview",target:"_blank",rel:"noopener noreferrer"},[n("strong",null,"OutlinedTextField")]),t("at some point in your app.")],-1)),e[4]||(e[4]=n("p",null,"While it works well for general text input, handling URLs within this component can be less than ideal. That’s why I want to share our custom implementation: OutlinedUrlTextField, a tailored solution for managing URLs more effectively.",-1)),e[5]||(e[5]=n("p",null,[t("You can find a complete example of how to create and use this component here:"),n("a",{href:"https://github.com/jarroyoesp/OutlinedUrlTextField",target:"_blank",rel:"noopener noreferrer"},"GitHub Repository"),t(".")],-1)),o(` How is it implemented?

@Suppress("ReusedModifierInstance")

@Composable

fun OutlinedUrlTextField(

value: String,

onValueChange: (String) -> Unit,

onUrlClick: (url: String) -> Unit,

modifier: Modifier = Modifier,

enabled: Boolean = true,

readOnly: Boolean = false,

textStyle: TextStyle = LocalTextStyle.current,

label: @Composable (() -> Unit)? = null,

placeholder: @Composable (() -> Unit)? = null,

leadingIcon: @Composable (() -> Unit)? = null,

trailingIcon: @Composable (() -> Unit)? = null,

prefix: @Composable (() -> Unit)? = null,

suffix: @Composable (() -> Unit)? = null,

supportingText: @Composable (() -> Unit)? = null,

isError: Boolean = false,

keyboardOptions: KeyboardOptions = KeyboardOptions.Default,

keyboardActions: KeyboardActions = KeyboardActions.Default,

singleLine: Boolean = false,

maxLines: Int = if (singleLine) 1 else Int.MAX_VALUE,

minLines: Int = 1,

interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },

shape: Shape = OutlinedTextFieldDefaults.shape,

colors: TextFieldColors = OutlinedTextFieldDefaults.colors(),

) {

val urlStyle = SpanStyle(

color = MaterialTheme.colorScheme.primary,

textDecoration = TextDecoration.Underline

)

val visualTransformation = UrlTransformation(urlStyle, onUrlClick)

if (enabled && !readOnly) {

androidx.compose.material3.OutlinedTextField(

value = value,

modifier = modifier,

onValueChange = onValueChange,

enabled = enabled,

readOnly = readOnly,

textStyle = textStyle,

label = label,

placeholder = placeholder,

leadingIcon = leadingIcon,

trailingIcon = trailingIcon,

prefix = prefix,

suffix = suffix,

supportingText = supportingText,

isError = isError,

visualTransformation = visualTransformation,

keyboardOptions = keyboardOptions,

keyboardActions = keyboardActions,

singleLine = singleLine,

maxLines = maxLines,

minLines = minLines,

interactionSource = interactionSource,

shape = shape,

colors = colors,

)

} else {

BasicTextField(

value = value,

onValueChange = onValueChange,

modifier = modifier.padding(top = 8.dp),

enabled = enabled,

readOnly = readOnly,

textStyle = textStyle,

keyboardOptions = keyboardOptions,

keyboardActions = keyboardActions,

singleLine = singleLine,

maxLines = maxLines,

minLines = minLines,

visualTransformation = visualTransformation,

interactionSource = interactionSource,

decorationBox = {

OutlinedTextFieldDefaults.DecorationBox(

value = value,

innerTextField = {

Text(

text = value.buildAnnotatedStringWithUrlHighlighting(

style = urlStyle,

onUrlClick = onUrlClick,

),

)

},

enabled = enabled,

singleLine = singleLine,

visualTransformation = visualTransformation,

interactionSource = interactionSource,

isError = isError,

label = label,

placeholder = placeholder,

leadingIcon = leadingIcon,

trailingIcon = trailingIcon,

prefix = prefix,

suffix = suffix,

supportingText = supportingText,

colors = colors,

)

},

)

}

}

@Suppress("ReusedModifierInstance") @Composable fun OutlinedUrlTextField( value: String, onValueChange: (String) -> Unit, onUrlClick: (url: String) -> Unit, modifier: Modifier = Modifier, enabled: Boolean = true, readOnly: Boolean = false, textStyle: TextStyle = LocalTextStyle.current, label: @Composable (() -> Unit)? = null, placeholder: @Composable (() -> Unit)? = null, leadingIcon: @Composable (() -> Unit)? = null, trailingIcon: @Composable (() -> Unit)? = null, prefix: @Composable (() -> Unit)? = null, suffix: @Composable (() -> Unit)? = null, supportingText: @Composable (() -> Unit)? = null, isError: Boolean = false, keyboardOptions: KeyboardOptions = KeyboardOptions.Default, keyboardActions: KeyboardActions = KeyboardActions.Default, singleLine: Boolean = false, maxLines: Int = if (singleLine) 1 else Int.MAX_VALUE, minLines: Int = 1, interactionSource: MutableInteractionSource = remember { MutableInteractionSource() }, shape: Shape = OutlinedTextFieldDefaults.shape, colors: TextFieldColors = OutlinedTextFieldDefaults.colors(), ) { val urlStyle = SpanStyle( color = MaterialTheme.colorScheme.primary, textDecoration = TextDecoration.Underline ) val visualTransformation = UrlTransformation(urlStyle, onUrlClick) if (enabled && !readOnly) { androidx.compose.material3.OutlinedTextField( value = value, modifier = modifier, onValueChange = onValueChange, enabled = enabled, readOnly = readOnly, textStyle = textStyle, label = label, placeholder = placeholder, leadingIcon = leadingIcon, trailingIcon = trailingIcon, prefix = prefix, suffix = suffix, supportingText = supportingText, isError = isError, visualTransformation = visualTransformation, keyboardOptions = keyboardOptions, keyboardActions = keyboardActions, singleLine = singleLine, maxLines = maxLines, minLines = minLines, interactionSource = interactionSource, shape = shape, colors = colors, ) } else { BasicTextField( value = value, onValueChange = onValueChange, modifier = modifier.padding(top = 8.dp), enabled = enabled, readOnly = readOnly, textStyle = textStyle, keyboardOptions = keyboardOptions, keyboardActions = keyboardActions, singleLine = singleLine, maxLines = maxLines, minLines = minLines, visualTransformation = visualTransformation, interactionSource = interactionSource, decorationBox = { OutlinedTextFieldDefaults.DecorationBox( value = value, innerTextField = { Text( text = value.buildAnnotatedStringWithUrlHighlighting( style = urlStyle, onUrlClick = onUrlClick, ), ) }, enabled = enabled, singleLine = singleLine, visualTransformation = visualTransformation, interactionSource = interactionSource, isError = isError, label = label, placeholder = placeholder, leadingIcon = leadingIcon, trailingIcon = trailingIcon, prefix = prefix, suffix = suffix, supportingText = supportingText, colors = colors, ) }, ) } }

@Suppress("ReusedModifierInstance")
@Composable
fun OutlinedUrlTextField(
    value: String,
    onValueChange: (String) -> Unit,
    onUrlClick: (url: String) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    readOnly: Boolean = false,
    textStyle: TextStyle = LocalTextStyle.current,
    label: @Composable (() -> Unit)? = null,
    placeholder: @Composable (() -> Unit)? = null,
    leadingIcon: @Composable (() -> Unit)? = null,
    trailingIcon: @Composable (() -> Unit)? = null,
    prefix: @Composable (() -> Unit)? = null,
    suffix: @Composable (() -> Unit)? = null,
    supportingText: @Composable (() -> Unit)? = null,
    isError: Boolean = false,
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
    keyboardActions: KeyboardActions = KeyboardActions.Default,
    singleLine: Boolean = false,
    maxLines: Int = if (singleLine) 1 else Int.MAX_VALUE,
    minLines: Int = 1,
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    shape: Shape = OutlinedTextFieldDefaults.shape,
    colors: TextFieldColors = OutlinedTextFieldDefaults.colors(),
) {
    val urlStyle = SpanStyle(
        color = MaterialTheme.colorScheme.primary,
        textDecoration = TextDecoration.Underline
    )
    val visualTransformation = UrlTransformation(urlStyle, onUrlClick)
    if (enabled && !readOnly) {
        androidx.compose.material3.OutlinedTextField(
            value = value,
            modifier = modifier,
            onValueChange = onValueChange,
            enabled = enabled,
            readOnly = readOnly,
            textStyle = textStyle,
            label = label,
            placeholder = placeholder,
            leadingIcon = leadingIcon,
            trailingIcon = trailingIcon,
            prefix = prefix,
            suffix = suffix,
            supportingText = supportingText,
            isError = isError,
            visualTransformation = visualTransformation,
            keyboardOptions = keyboardOptions,
            keyboardActions = keyboardActions,
            singleLine = singleLine,
            maxLines = maxLines,
            minLines = minLines,
            interactionSource = interactionSource,
            shape = shape,
            colors = colors,
        )
    } else {
        BasicTextField(
            value = value,
            onValueChange = onValueChange,
            modifier = modifier.padding(top = 8.dp),
            enabled = enabled,
            readOnly = readOnly,
            textStyle = textStyle,
            keyboardOptions = keyboardOptions,
            keyboardActions = keyboardActions,
            singleLine = singleLine,
            maxLines = maxLines,
            minLines = minLines,
            visualTransformation = visualTransformation,
            interactionSource = interactionSource,
            decorationBox = {
                OutlinedTextFieldDefaults.DecorationBox(
                    value = value,
                    innerTextField = {
                        Text(
                            text = value.buildAnnotatedStringWithUrlHighlighting(
                                style = urlStyle,
                                onUrlClick = onUrlClick,
                            ),
                        )
                    },
                    enabled = enabled,
                    singleLine = singleLine,
                    visualTransformation = visualTransformation,
                    interactionSource = interactionSource,
                    isError = isError,
                    label = label,
                    placeholder = placeholder,
                    leadingIcon = leadingIcon,
                    trailingIcon = trailingIcon,
                    prefix = prefix,
                    suffix = suffix,
                    supportingText = supportingText,
                    colors = colors,
                )
            },
        )
    }
}

The signature of*OutlinedUrlTextField*is very similar to the common*OutlinedTextField*, with one key difference: it includes a listener (*onUrlClick: (url: String) -> Unit*) that triggers when the user clicks on a URL.

To break down how it works, let’s divide the implementation into two modes:

###### **📝 Editing Enabled**

When editing is enabled, our component is essentially a OutlinedTextField from*androidx.compose.material3*. However, we need to customize its behaviour to**highlight URLs**dynamically.

To achieve this, we use a**custom** *VisualTransformation (UrlTransformation)*, which detects URLs in the text and applies styling to make them visually distinct and clickable.

private class UrlTransformation(

private val style: SpanStyle,

private val onUrlClick: (url: String) -> Unit,

) : VisualTransformation {

override fun filter(text: AnnotatedString): TransformedText = TransformedText(

text = text.text.buildAnnotatedStringWithUrlHighlighting(style, onUrlClick),

offsetMapping = OffsetMapping.Identity,

)

}

private class UrlTransformation( private val style: SpanStyle, private val onUrlClick: (url: String) -> Unit, ) : VisualTransformation { override fun filter(text: AnnotatedString): TransformedText = TransformedText( text = text.text.buildAnnotatedStringWithUrlHighlighting(style, onUrlClick), offsetMapping = OffsetMapping.Identity, ) }

private class UrlTransformation(
    private val style: SpanStyle,
    private val onUrlClick: (url: String) -> Unit,
) : VisualTransformation {
    override fun filter(text: AnnotatedString): TransformedText = TransformedText(
        text = text.text.buildAnnotatedStringWithUrlHighlighting(style, onUrlClick),
        offsetMapping = OffsetMapping.Identity,
    )
}

***UrlTransformation***is a custom*VisualTransformation*in Jetpack Compose that detects and highlights URLs in a TextField using a given SpanStyle. It applies styling and makes URLs clickable, triggering onUrlClick when tapped. The transformation does not affect text input or cursor behaviour (*OffsetMapping.Identity*).

To detect URLs in the text, we use the function*buildAnnotatedStringWithUrlHighlighting*.

This function scans the input text, identifies URLs using a regex pattern (*Patterns.WEB_URL*), and applies a SpanStyle to highlight them. Additionally, it makes the URLs clickable by attaching a listener that triggers onUrlClick(url).

fun String.buildAnnotatedStringWithUrlHighlighting(

style: SpanStyle,

onUrlClick: (url: String) -> Unit = {},

): AnnotatedString = buildAnnotatedString {

val text = this@buildAnnotatedStringWithUrlHighlighting

append(text)

text.split("\\\\\\\\s+".toRegex())

.filter { Patterns.WEB_URL.matcher(it).matches() }

.forEach { url ->

val startIndex = text.indexOf(url)

val endIndex = startIndex + url.length

addStyle(

style = style,

start = startIndex,

end = endIndex,

)

addLink(

clickable = LinkAnnotation.Clickable(

tag = url,

styles = TextLinkStyles(style),

linkInteractionListener = { onUrlClick(url) },

),

start = startIndex,

end = endIndex,

)

}

}

fun String.buildAnnotatedStringWithUrlHighlighting( style: SpanStyle, onUrlClick: (url: String) -> Unit = {}, ): AnnotatedString = buildAnnotatedString { val text = this@buildAnnotatedStringWithUrlHighlighting append(text) text.split("\\\\\\\\s+".toRegex()) .filter { Patterns.WEB_URL.matcher(it).matches() } .forEach { url -> val startIndex = text.indexOf(url) val endIndex = startIndex + url.length addStyle( style = style, start = startIndex, end = endIndex, ) addLink( clickable = LinkAnnotation.Clickable( tag = url, styles = TextLinkStyles(style), linkInteractionListener = { onUrlClick(url) }, ), start = startIndex, end = endIndex, ) } }

fun String.buildAnnotatedStringWithUrlHighlighting(
    style: SpanStyle,
    onUrlClick: (url: String) -> Unit = {},
): AnnotatedString = buildAnnotatedString {
    val text = this@buildAnnotatedStringWithUrlHighlighting
    append(text)
    text.split("\\\\\\\\s+".toRegex())
        .filter { Patterns.WEB_URL.matcher(it).matches() }
        .forEach { url ->
            val startIndex = text.indexOf(url)
            val endIndex = startIndex + url.length
            addStyle(
                style = style,
                start = startIndex,
                end = endIndex,
            )
            addLink(
                clickable = LinkAnnotation.Clickable(
                    tag = url,
                    styles = TextLinkStyles(style),
                    linkInteractionListener = { onUrlClick(url) },
                ),
                start = startIndex,
                end = endIndex,
            )
        }
}

This function detects URLs in a string and highlights them using SpanStyle, making them clickable in a Jetpack Compose TextField or Text.

How it Works

1. Extracts the original text and appends it to buildAnnotatedString.
2. Splits the text into words using whitespace as a separator.
3. Filters valid URLs using Patterns.WEB_URL.matcher(it).matches().
4. Finds the position of each URL (startIndex, endIndex).
5. Applies the provided SpanStyle to visually highlight the URL.
6. Adds a clickable link (addLink), triggering onUrlClick(url) when tapped.

###### **🔏 Editing Not Enabled**

When editing is**disabled**, we use a*BasicTextField* instead of OutlinedTextField. However, if we don’t customize it, the component will look plain and unstyled, lacking the visual consistency of an OutlinedTextField.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*7q52KB93Fugd--PR7s1HTQ.png)

BasicTextField

**How to Match the OutlinedTextField Style?**

To make it visually similar to*OutlinedTextField*, we apply a custom*DecorationBox*, which replicates the outlined style, paddings, and background.

Additionally, we set innerTextField to support**URL highlighting**, ensuring that URLs remain visually distinct and clickable even in read-only mode.

Here’s how it looks:

decorationBox = {

OutlinedTextFieldDefaults.DecorationBox(

value = value,

innerTextField = {

Text(

text = value.buildAnnotatedStringWithUrlHighlighting(

style = urlStyle,

onUrlClick = onUrlClick,

),

)

},

enabled = enabled,

singleLine = singleLine,

visualTransformation = visualTransformation,

interactionSource = interactionSource,

isError = isError,

label = label,

placeholder = placeholder,

leadingIcon = leadingIcon,

trailingIcon = trailingIcon,

prefix = prefix,

suffix = suffix,

supportingText = supportingText,

colors = colors,

)

},

decorationBox = { OutlinedTextFieldDefaults.DecorationBox( value = value, innerTextField = { Text( text = value.buildAnnotatedStringWithUrlHighlighting( style = urlStyle, onUrlClick = onUrlClick, ), ) }, enabled = enabled, singleLine = singleLine, visualTransformation = visualTransformation, interactionSource = interactionSource, isError = isError, label = label, placeholder = placeholder, leadingIcon = leadingIcon, trailingIcon = trailingIcon, prefix = prefix, suffix = suffix, supportingText = supportingText, colors = colors, ) },

decorationBox = {
    OutlinedTextFieldDefaults.DecorationBox(
        value = value,
        innerTextField = {
            Text(
                text = value.buildAnnotatedStringWithUrlHighlighting(
                    style = urlStyle,
                    onUrlClick = onUrlClick,
                ),
            )
        },
        enabled = enabled,
        singleLine = singleLine,
        visualTransformation = visualTransformation,
        interactionSource = interactionSource,
        isError = isError,
        label = label,
        placeholder = placeholder,
        leadingIcon = leadingIcon,
        trailingIcon = trailingIcon,
        prefix = prefix,
        suffix = suffix,
        supportingText = supportingText,
        colors = colors,
    )
},

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*oHGL16YtZZHUtsn1F4LeYQ.png)

OutlinedUrlTextField vs OutlinedTextField — Enabled=false

And don’t forget to add the paddingTop to the*BasicTextField*,*modifier = modifier.padding(top = 8.dp),* If you don’t include this padding, the label will be**cut off**when the text is present, affecting the visual alignment with a standard OutlinedTextField.

And here you can see the final result, OutlinedUrlTextField vs OutlinedTextField:

OutlinedUrlTextField(

value = text,

onValueChange = { text = it },

onUrlClick = {

Log.d("OutlinedUrlTextField", "Open URL $it")

Toast.makeText(context, it, Toast.LENGTH_SHORT).show()

},

modifier = Modifier.fillMaxWidth(),

enabled = editMode,

label = { Text("Label") },

)

OutlinedUrlTextField( value = text, onValueChange = { text = it }, onUrlClick = { Log.d("OutlinedUrlTextField", "Open URL $it") Toast.makeText(context, it, Toast.LENGTH_SHORT).show() }, modifier = Modifier.fillMaxWidth(), enabled = editMode, label = { Text("Label") }, )

OutlinedUrlTextField(
    value = text,
    onValueChange = { text = it },
    onUrlClick = {
        Log.d("OutlinedUrlTextField", "Open URL $it")
        Toast.makeText(context, it, Toast.LENGTH_SHORT).show()
    },
    modifier = Modifier.fillMaxWidth(),
    enabled = editMode,
    label = { Text("Label") },
)

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*jyTnohzEvqb6UKKHOqXHcg.png)

EditModeEnabled=true

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*NDo0XoBwTHOyBtmuEUQ9cA.png)

EditModeEnabled=false

You can find all the code:[GitHub Repository](https://github.com/jarroyoesp/OutlinedUrlTextField) `),e[6]||(e[6]=n("p",null,[t("This article is previously published on "),n("a",{href:"https://proandroiddev.com/outlinedurltextfield-in-jetpack-compose-86cd1c6f0325",target:"_blank",rel:"noopener noreferrer"},"proandroiddev.com.")],-1)),o(" TODO: add ARTICLE CARD "),i(l,a(r({title:"OutlinedUrlTextField in Jetpack Compose",desc:"If you’ve worked with Jetpack Compose, chances are you’ve used the common OutlinedTextField at some point in your app.",link:"https://chanhi2000.github.io/bookshelf/droidcon.com/outlinedurltextfield-in-jetpack-compose.html",logo:"https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",background:"rgba(4,20,221,0.2)"})),null,16)])}const U=u(x,[["render",b]]),S=JSON.parse('{"path":"/droidcon.com/outlinedurltextfield-in-jetpack-compose.html","title":"OutlinedUrlTextField in Jetpack Compose","lang":"en-US","frontmatter":{"lang":"en-US","title":"OutlinedUrlTextField in Jetpack Compose","description":"Article(s) > OutlinedUrlTextField in Jetpack Compose","icon":"fa-brands fa-android","category":["Java","Kotlin","Android","Article(s)"],"tag":["blog","droidcon.com","java","kotlin","android"],"head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"OutlinedUrlTextField in Jetpack Compose\\",\\"image\\":[\\"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*xBO70tloHjOUiAOwRMBeCQ.png\\",\\"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*7q52KB93Fugd--PR7s1HTQ.png\\",\\"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*oHGL16YtZZHUtsn1F4LeYQ.png\\",\\"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*jyTnohzEvqb6UKKHOqXHcg.png\\",\\"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*NDo0XoBwTHOyBtmuEUQ9cA.png\\"],\\"datePublished\\":\\"2025-02-12T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Javier Arroyo\\"}]}"],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/droidcon.com/outlinedurltextfield-in-jetpack-compose.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"OutlinedUrlTextField in Jetpack Compose"}],["meta",{"property":"og:description","content":"Article(s) > OutlinedUrlTextField in Jetpack Compose"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*xBO70tloHjOUiAOwRMBeCQ.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*xBO70tloHjOUiAOwRMBeCQ.png"}],["meta",{"name":"twitter:image:alt","content":"OutlinedUrlTextField in Jetpack Compose"}],["meta",{"property":"article:author","content":"Javier Arroyo"}],["meta",{"property":"article:tag","content":"android"}],["meta",{"property":"article:tag","content":"kotlin"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"droidcon.com"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:published_time","content":"2025-02-12T00:00:00.000Z"}],[{"meta":null},{"property":"og:title","content":"Article(s) > OutlinedUrlTextField in Jetpack Compose"},{"property":"og:description","content":"OutlinedUrlTextField in Jetpack Compose"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/droidcon.com/outlinedurltextfield-in-jetpack-compose.html"}]],"prev":"/programming/java-android/articles/README.md","date":"2025-02-12T00:00:00.000Z","isOriginal":false,"author":"Javier Arroyo","cover":"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*xBO70tloHjOUiAOwRMBeCQ.png"},"git":{},"readingTime":{"minutes":6.16,"words":1849},"filePathRelative":"droidcon.com/outlinedurltextfield-in-jetpack-compose.md","copyright":{"author":"Javier Arroyo"}}');export{U as comp,S as data};
