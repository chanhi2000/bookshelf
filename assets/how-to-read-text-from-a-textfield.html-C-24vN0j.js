import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as e,as as m,ao as a,at as s,au as o,al as f,an as i,aq as l,ar as h}from"./app-CpYYKbnj.js";const w={},k={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},x={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-read-text-from-a-textfield-1.zip",target:"_blank",rel:"noopener noreferrer"},b={class:"hint-container details"};function y(r,t){const n=l("VPCard"),p=l("FontIcon"),c=l("VidStack");return h(),u("div",null,[e("h1",k,[e("a",g,[e("span",null,m(r.$frontmatter.title)+" 관련",1)])]),a(n,s(o({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[2]||(t[2]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[3]||(t[3]=e("hr",null,null,-1)),a(n,s(o({title:"How to read text from a TextField | SwiftUI by Example",desc:"How to read text from a TextField",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-read-text-from-a-textfield",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t[4]||(t[4]=f(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>SwiftUI&#39;s <code>TextField</code> view is similar to <code>UITextField</code> in UIKit, although it looks a little different by default and relies very heavily on binding to state.</p><p>To create one, you should pass in a placeholder to use inside the text field, plus the state value it should bind to. For example, this creates a <code>TextField</code> bound to a local string, then places a text view below it that shows the text field&#39;s output as you type:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> name<span class="token punctuation">:</span> <span class="token class-name">String</span> <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Tim&quot;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">VStack</span><span class="token punctuation">(</span>alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>leading<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">TextField</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Enter your name&quot;</span></span><span class="token punctuation">,</span> text<span class="token punctuation">:</span> $name<span class="token punctuation">)</span></span>
<span class="line">            <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Hello, </span><span class="token interpolation-punctuation punctuation">\\(</span><span class="token interpolation">name</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">!&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),e("blockquote",null,[e("p",null,[e("a",x,[a(p,{icon:"fas fa-file-zipper"}),t[0]||(t[0]=i("Download this as an Xcode project"))])])]),a(c,{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-read-text-from-a-textfield-1~dark.mp4"}),t[5]||(t[5]=e("p",null,"When that's run, you should be able to type into the text field and see a greeting appear directly below.",-1)),t[6]||(t[6]=e("p",null,"There are two important provisos when working with text fields. First, they don't have a border by default, so you probably won't see anything – you'll need to tap inside roughly where it is in order to activate the keyboard.",-1)),t[7]||(t[7]=e("p",null,[i("Second, you might find you can't type into the canvas preview of your layout. If you hit that problem, press "),e("kbd",null,"Cmd"),i("+"),e("kbd",null,"R"),i(" to build and run your code in the simulator.")],-1)),e("details",b,[t[1]||(t[1]=e("summary",null,"Similar solutions…",-1)),a(n,s(o({title:"How to make a TextField expand vertically as the user types | SwiftUI by Example",desc:"How to make a TextField expand vertically as the user types",link:"/hackingwithswift.com/swiftui/how-to-make-a-textfield-expand-vertically-as-the-user-types.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(n,s(o({title:"How to dismiss the keyboard for a TextField | SwiftUI by Example",desc:"How to dismiss the keyboard for a TextField",link:"/hackingwithswift.com/swiftui/how-to-dismiss-the-keyboard-for-a-textfield.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(n,s(o({title:"How to add a TextField to an alert | SwiftUI by Example",desc:"How to add a TextField to an alert",link:"/hackingwithswift.com/swiftui/how-to-add-a-textfield-to-an-alert.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(n,s(o({title:"How to make a TextField or TextEditor have default focus | SwiftUI by Example",desc:"How to make a TextField or TextEditor have default focus",link:"/hackingwithswift.com/swiftui/how-to-make-a-textfield-or-texteditor-have-default-focus.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(n,s(o({title:"How to format a TextField for numbers | SwiftUI by Example",desc:"How to format a TextField for numbers",link:"/hackingwithswift.com/swiftui/how-to-format-a-textfield-for-numbers.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const F=d(w,[["render",y],["__file","how-to-read-text-from-a-textfield.html.vue"]]),H=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-read-text-from-a-textfield.html","title":"How to read text from a TextField","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to read text from a TextField","description":"Article(s) > How to read text from a TextField","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to read text from a TextField"},{"property":"og:description","content":"How to read text from a TextField"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-read-text-from-a-textfield.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-read-text-from-a-textfield.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to read text from a TextField"}],["meta",{"property":"og:description","content":"Article(s) > How to read text from a TextField"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to read text from a TextField\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.99,"words":597},"filePathRelative":"hackingwithswift.com/swiftui/how-to-read-text-from-a-textfield.md","excerpt":"\\n"}');export{F as comp,H as data};