import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as k,am as n,as as m,ao as a,at as t,au as o,al as p,an as i,aq as l,ar as v}from"./app-CpYYKbnj.js";const w={},g={id:"frontmatter-title-관련",tabindex:"-1"},h={class:"header-anchor",href:"#frontmatter-title-관련"},f={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-convert-a-swiftui-view-to-an-image-1.zip",target:"_blank",rel:"noopener noreferrer"},b={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-convert-a-swiftui-view-to-an-image-2.zip",target:"_blank",rel:"noopener noreferrer"},y={class:"hint-container details"};function I(u,s){const e=l("VPCard"),c=l("FontIcon"),r=l("VidStack");return v(),k("div",null,[n("h1",g,[n("a",h,[n("span",null,m(u.$frontmatter.title)+" 관련",1)])]),a(e,t(o({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),s[3]||(s[3]=n("nav",{class:"table-of-contents"},[n("ul")],-1)),s[4]||(s[4]=n("hr",null,null,-1)),a(e,t(o({title:"How to convert a SwiftUI view to an image | SwiftUI by Example",desc:"How to convert a SwiftUI view to an image",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-convert-a-swiftui-view-to-an-image",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s[5]||(s[5]=p(`<blockquote><p>Updated for Xcode 15</p></blockquote><p><strong>Improved in iOS 16</strong></p><p>SwiftUI’s <code>ImageRenderer</code> class is able to render any SwiftUI view hierarchy into an image, which can then be saved, shared, or reused somehow else. At its simplest, the code needed is this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">let</span> renderer <span class="token operator">=</span> <span class="token class-name">ImageRenderer</span><span class="token punctuation">(</span>content<span class="token punctuation">:</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Hello, world!&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> <span class="token keyword">let</span> uiImage <span class="token operator">=</span> renderer<span class="token punctuation">.</span>uiImage <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// use the rendered image somehow</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),n("blockquote",null,[n("p",null,[n("a",f,[a(c,{icon:"fas fa-file-zipper"}),s[0]||(s[0]=i("Download this as an Xcode project"))])])]),s[6]||(s[6]=p(`<p>However, there are four key points to be aware of:</p><ol><li>If you don’t specify otherwise, your image will be rendered at 1x scale – that will look fuzzy on 2x or 3x resolution screens.</li><li>You must not attempt to use <code>ImageRenderer</code> off the main actor, which might mean marking your rendering code with <code>@MainActor</code>.</li><li>You can put the SwiftUI views you want to render right into the <code>ImageRenderer(content:)</code> initializer if you want, but I nearly always find separating them out into a dedicated view results in much cleaner code.</li><li>Unlike the older <code>UIGraphicsImageRenderer</code> there is no easy way to read PNG or JPEG data directly from <code>ImageRenderer</code>, so as you can see in the code we need to read its resulting <code>UIImage</code> then call the <code>pngData()</code> method of <em>that</em>. This makes the code more complex for cross-platform users, but when I suggested to Apple that they could make it better they told me to use the (ancient) ImageI/O framework. (Spoiler: don’t use it, it will just lead to pain.)</li></ol><p>Let’s look at a second example that is more realistic – this automatically uses the correct image scale for the device, uses <code>@MainActor</code> to ensure the rendering code is safe to call, carves out the view to render into its own struct, and then lets users share the result using <code>ShareLink</code>:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token comment">// An example view to render</span></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">RenderView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> text<span class="token punctuation">:</span> <span class="token class-name">String</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">font</span><span class="token punctuation">(</span><span class="token punctuation">.</span>largeTitle<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">foregroundStyle</span><span class="token punctuation">(</span><span class="token punctuation">.</span>white<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">clipShape</span><span class="token punctuation">(</span><span class="token class-name">Capsule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> text <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Your text here&quot;</span></span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> renderedImage <span class="token operator">=</span> <span class="token class-name">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;photo&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token attribute atrule">@Environment</span><span class="token punctuation">(</span><span class="token punctuation">\\</span><span class="token punctuation">.</span>displayScale<span class="token punctuation">)</span> <span class="token keyword">var</span> displayScale</span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">            renderedImage</span>
<span class="line"></span>
<span class="line">            <span class="token class-name">ShareLink</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Export&quot;</span></span><span class="token punctuation">,</span> item<span class="token punctuation">:</span> renderedImage<span class="token punctuation">,</span> preview<span class="token punctuation">:</span> <span class="token class-name">SharePreview</span><span class="token punctuation">(</span><span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Shared image&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> image<span class="token punctuation">:</span> renderedImage<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">            <span class="token class-name">TextField</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Enter some text&quot;</span></span><span class="token punctuation">,</span> text<span class="token punctuation">:</span> $text<span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">textFieldStyle</span><span class="token punctuation">(</span><span class="token punctuation">.</span>roundedBorder<span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">onChange</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> text<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token omit keyword">_</span> <span class="token keyword">in</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">.</span>onAppear <span class="token punctuation">{</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token attribute atrule">@MainActor</span> <span class="token keyword">func</span> <span class="token function-definition function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> renderer <span class="token operator">=</span> <span class="token class-name">ImageRenderer</span><span class="token punctuation">(</span>content<span class="token punctuation">:</span> <span class="token class-name">RenderView</span><span class="token punctuation">(</span>text<span class="token punctuation">:</span> text<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// make sure and use the correct display scale for this device</span></span>
<span class="line">        renderer<span class="token punctuation">.</span>scale <span class="token operator">=</span> displayScale</span>
<span class="line"></span>
<span class="line">        <span class="token keyword">if</span> <span class="token keyword">let</span> uiImage <span class="token operator">=</span> renderer<span class="token punctuation">.</span>uiImage <span class="token punctuation">{</span></span>
<span class="line">            renderedImage <span class="token operator">=</span> <span class="token class-name">Image</span><span class="token punctuation">(</span>uiImage<span class="token punctuation">:</span> uiImage<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),n("blockquote",null,[n("p",null,[n("a",b,[a(c,{icon:"fas fa-file-zipper"}),s[1]||(s[1]=i("Download this as an Xcode project"))])])]),s[7]||(s[7]=p(`<p>As you can see, that calls <code>render()</code> when the view is shown and also whenever <code>text</code> changes.</p><p>If you need to target iOS 15 and below, then SwiftUI’s views don’t have a built-in function to render a view as an image – we need to write one ourselves. The key here is to wrap the view using <code>UIHostingController</code>, then render its view hierarchy into a <code>UIGraphicsImageRenderer</code>.</p><p>This is best done using an extension on <code>View</code>, so you can call it naturally. This should wrap the view in a hosting controller, adjust the size of the hosting controller’s view to be the intrinsic content size of the SwiftUI view, clear any background color to keep the rendered image clean, then render the view into an image and send it back.</p><p>Here’s how that looks in code:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">extension</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">func</span> <span class="token function-definition function">snapshot</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">UIImage</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> controller <span class="token operator">=</span> <span class="token class-name">UIHostingController</span><span class="token punctuation">(</span>rootView<span class="token punctuation">:</span> <span class="token keyword">self</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">let</span> view <span class="token operator">=</span> controller<span class="token punctuation">.</span>view</span>
<span class="line"></span>
<span class="line">        <span class="token keyword">let</span> targetSize <span class="token operator">=</span> controller<span class="token punctuation">.</span>view<span class="token punctuation">.</span>intrinsicContentSize</span>
<span class="line">        view<span class="token operator">?</span><span class="token punctuation">.</span>bounds <span class="token operator">=</span> <span class="token class-name">CGRect</span><span class="token punctuation">(</span>origin<span class="token punctuation">:</span> <span class="token punctuation">.</span>zero<span class="token punctuation">,</span> size<span class="token punctuation">:</span> targetSize<span class="token punctuation">)</span></span>
<span class="line">        view<span class="token operator">?</span><span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token punctuation">.</span>clear</span>
<span class="line"></span>
<span class="line">        <span class="token keyword">let</span> renderer <span class="token operator">=</span> <span class="token class-name">UIGraphicsImageRenderer</span><span class="token punctuation">(</span>size<span class="token punctuation">:</span> targetSize<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">return</span> renderer<span class="token punctuation">.</span>image <span class="token punctuation">{</span> <span class="token omit keyword">_</span> <span class="token keyword">in</span></span>
<span class="line">            view<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">drawHierarchy</span><span class="token punctuation">(</span><span class="token keyword">in</span><span class="token punctuation">:</span> controller<span class="token punctuation">.</span>view<span class="token punctuation">.</span>bounds<span class="token punctuation">,</span> afterScreenUpdates<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To use that extension in SwiftUI, you should create your view as a property so you can reference it on demand – for example, in response to a button action.</p><p>For example, this renders a styled text view to an image, then saves it to the user’s photo album:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> textView<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Hello, SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">foregroundStyle</span><span class="token punctuation">(</span><span class="token punctuation">.</span>white<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">clipShape</span><span class="token punctuation">(</span><span class="token class-name">Capsule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">            textView</span>
<span class="line"></span>
<span class="line">            <span class="token class-name">Button</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Save to image&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">let</span> image <span class="token operator">=</span> textView<span class="token punctuation">.</span><span class="token function">snapshot</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">                <span class="token class-name">UIImageWriteToSavedPhotosAlbum</span><span class="token punctuation">(</span>image<span class="token punctuation">,</span> <span class="token nil constant">nil</span><span class="token punctuation">,</span> <span class="token nil constant">nil</span><span class="token punctuation">,</span> <span class="token nil constant">nil</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8)),a(r,{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-convert-a-swiftui-view-to-an-image-1~dark.mp4"}),s[8]||(s[8]=n("div",{class:"hint-container important"},[n("p",{class:"hint-container-title"},"Important"),n("p",null,[i("In order to call "),n("code",null,"UIImageWriteToSavedPhotosAlbum()"),i(" you "),n("em",null,"must"),i(" add the "),n("code",null,"NSPhotoLibraryAddUsageDescription"),i(" key to your Info.plist and explain to the user why you want to write images. If you fail to do this your app will crash when you attempt to write out the image.")])],-1)),n("details",y,[s[2]||(s[2]=n("summary",null,"Similar solutions…",-1)),a(e,t(o({title:"SwiftUI tips and tricks | SwiftUI by Example",desc:"SwiftUI tips and tricks",link:"/hackingwithswift.com/swiftui/swiftui-tips-and-tricks.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(e,t(o({title:"How to add Metal shaders to SwiftUI views using layer effects | SwiftUI by Example",desc:"How to add Metal shaders to SwiftUI views using layer effects",link:"/hackingwithswift.com/swiftui/how-to-add-metal-shaders-to-swiftui-views-using-layer-effects.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(e,t(o({title:"How to load a remote image from a URL | SwiftUI by Example",desc:"How to load a remote image from a URL",link:"/hackingwithswift.com/swiftui/how-to-load-a-remote-image-from-a-url.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(e,t(o({title:"How to draw images using Image views | SwiftUI by Example",desc:"How to draw images using Image views",link:"/hackingwithswift.com/swiftui/how-to-draw-images-using-image-views.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(e,t(o({title:"How to make a view dismiss itself | SwiftUI by Example",desc:"How to make a view dismiss itself",link:"/hackingwithswift.com/swiftui/how-to-make-a-view-dismiss-itself.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const U=d(w,[["render",I],["__file","how-to-convert-a-swiftui-view-to-an-image.html.vue"]]),V=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-convert-a-swiftui-view-to-an-image.html","title":"How to convert a SwiftUI view to an image","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to convert a SwiftUI view to an image","description":"Article(s) > How to convert a SwiftUI view to an image","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to convert a SwiftUI view to an image"},{"property":"og:description","content":"How to convert a SwiftUI view to an image"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-convert-a-swiftui-view-to-an-image.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-convert-a-swiftui-view-to-an-image.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to convert a SwiftUI view to an image"}],["meta",{"property":"og:description","content":"Article(s) > How to convert a SwiftUI view to an image"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to convert a SwiftUI view to an image\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":3.77,"words":1131},"filePathRelative":"hackingwithswift.com/swiftui/how-to-convert-a-swiftui-view-to-an-image.md","excerpt":"\\n"}');export{U as comp,V as data};