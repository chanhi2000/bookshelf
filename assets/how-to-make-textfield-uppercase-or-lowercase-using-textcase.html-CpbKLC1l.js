import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as u,am as t,as as d,ao as a,at as n,au as o,al as m,an as i,aq as l,ar as w}from"./app-CpYYKbnj.js";const k={},h={id:"frontmatter-title-관련",tabindex:"-1"},g={class:"header-anchor",href:"#frontmatter-title-관련"},f={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-make-textfield-uppercase-or-lowercase-using-textcase-1.zip",target:"_blank",rel:"noopener noreferrer"},x={class:"hint-container details"};function b(c,e){const s=l("VPCard"),r=l("FontIcon");return w(),u("div",null,[t("h1",h,[t("a",g,[t("span",null,d(c.$frontmatter.title)+" 관련",1)])]),a(s,n(o({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),e[2]||(e[2]=t("nav",{class:"table-of-contents"},[t("ul")],-1)),e[3]||(e[3]=t("hr",null,null,-1)),a(s,n(o({title:"How to make TextField uppercase or lowercase using textCase() | SwiftUI by Example",desc:"How to make TextField uppercase or lowercase using textCase()",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-make-textfield-uppercase-or-lowercase-using-textcase",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),e[4]||(e[4]=m(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>SwiftUI&#39;s <code>TextField</code> view normally lets users write their text in whatever case they want, but if you want to control that you can force either uppercase or lowercase text using the <code>textCase()</code> modifier.</p><p>For example, this asks users to enter their name and uppercases every letter:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Paul&quot;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">TextField</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Shout your name at me&quot;</span></span><span class="token punctuation">,</span> text<span class="token punctuation">:</span> $name<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">textFieldStyle</span><span class="token punctuation">(</span><span class="token punctuation">.</span>roundedBorder<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">textCase</span><span class="token punctuation">(</span><span class="token punctuation">.</span>uppercase<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span><span class="token punctuation">.</span>horizontal<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),t("blockquote",null,[t("p",null,[t("a",f,[a(r,{icon:"fas fa-file-zipper"}),e[0]||(e[0]=i("Download this as an Xcode project"))])])]),e[5]||(e[5]=t("figure",null,[t("img",{src:"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-make-textfield-uppercase-or-lowercase-using-textcase-1~dark.png",alt:"A text box containing the word “PAUL”",tabindex:"0",loading:"lazy"}),t("figcaption",null,"A text box containing the word “PAUL”")],-1)),e[6]||(e[6]=t("div",{class:"hint-container important"},[t("p",{class:"hint-container-title"},"Important"),t("p",null,[i("If you're using Xcode 12 you need to use "),t("code",null,"RoundedBorderTextFieldStyle()"),i(" rather than "),t("code",null,".roundedBorder"),i(".")])],-1)),t("details",x,[e[1]||(e[1]=t("summary",null,"Similar solutions…",-1)),a(s,n(o({title:"How to make a TextField expand vertically as the user types | SwiftUI by Example",desc:"How to make a TextField expand vertically as the user types",link:"/hackingwithswift.com/swiftui/how-to-make-a-textfield-expand-vertically-as-the-user-types.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(s,n(o({title:"How to make a TextField or TextEditor have default focus | SwiftUI by Example",desc:"How to make a TextField or TextEditor have default focus",link:"/hackingwithswift.com/swiftui/how-to-make-a-textfield-or-texteditor-have-default-focus.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(s,n(o({title:"How to dismiss the keyboard for a TextField | SwiftUI by Example",desc:"How to dismiss the keyboard for a TextField",link:"/hackingwithswift.com/swiftui/how-to-dismiss-the-keyboard-for-a-textfield.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(s,n(o({title:"How to add a TextField to an alert | SwiftUI by Example",desc:"How to add a TextField to an alert",link:"/hackingwithswift.com/swiftui/how-to-add-a-textfield-to-an-alert.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(s,n(o({title:"How to format a TextField for numbers | SwiftUI by Example",desc:"How to format a TextField for numbers",link:"/hackingwithswift.com/swiftui/how-to-format-a-textfield-for-numbers.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const T=p(k,[["render",b],["__file","how-to-make-textfield-uppercase-or-lowercase-using-textcase.html.vue"]]),F=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-make-textfield-uppercase-or-lowercase-using-textcase.html","title":"How to make TextField uppercase or lowercase using textCase()","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to make TextField uppercase or lowercase using textCase()","description":"Article(s) > How to make TextField uppercase or lowercase using textCase()","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to make TextField uppercase or lowercase using textCase()"},{"property":"og:description","content":"How to make TextField uppercase or lowercase using textCase()"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-make-textfield-uppercase-or-lowercase-using-textcase.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-make-textfield-uppercase-or-lowercase-using-textcase.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to make TextField uppercase or lowercase using textCase()"}],["meta",{"property":"og:description","content":"Article(s) > How to make TextField uppercase or lowercase using textCase()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-make-textfield-uppercase-or-lowercase-using-textcase-1~dark.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to make TextField uppercase or lowercase using textCase()\\",\\"image\\":[\\"https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-make-textfield-uppercase-or-lowercase-using-textcase-1~dark.png\\"],\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.7,"words":509},"filePathRelative":"hackingwithswift.com/swiftui/how-to-make-textfield-uppercase-or-lowercase-using-textcase.md","excerpt":"\\n"}');export{T as comp,F as data};