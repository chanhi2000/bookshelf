import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as c,am as e,as as p,ao as i,at as o,au as a,al as l,aq as g,ar as u}from"./app-CpYYKbnj.js";const d={},m={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},h={class:"hint-container details"};function w(s,t){const n=g("VPCard");return u(),c("div",null,[e("h1",m,[e("a",f,[e("span",null,p(s.$frontmatter.title)+" 관련",1)])]),i(n,o(a({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[1]||(t[1]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[2]||(t[2]=e("hr",null,null,-1)),i(n,o(a({title:"How to fix “Cannot convert value of type 'String' to expected argument type 'Binding<String>'” | SwiftUI by Example",desc:"How to fix “Cannot convert value of type 'String' to expected argument type 'Binding<String>'”",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-fix-cannot-convert-value-of-type-string-to-expected-argument-type-binding-string",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t[3]||(t[3]=l(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>SwiftUI’s components expect to have two-way bindings to properties, using something like <code>@State</code> or <code>@ObservedObject</code>. This error occurs because you tried to create an interactive component <em>without</em> a binding, such as this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">TextField</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Enter your name&quot;</span></span><span class="token punctuation">,</span> text<span class="token punctuation">:</span> name<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>To fix the problem, make sure your property is marked with <code>@State</code>, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token attribute atrule">@State</span> <span class="token keyword">private</span> <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;&quot;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Now create your component using a two-way binding, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">TextField</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Enter your name&quot;</span></span><span class="token punctuation">,</span> text<span class="token punctuation">:</span> $name<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,7)),e("details",h,[t[0]||(t[0]=e("summary",null,"Similar solutions…",-1)),i(n,o(a({title:"How to fix “Cannot convert value of type 'String' to expected argument type 'Text'” | SwiftUI by Example",desc:"How to fix “Cannot convert value of type 'String' to expected argument type 'Text'”",link:"/hackingwithswift.com/swiftui/how-to-fix-cannot-convert-value-of-type-string-to-expected-argument-type-text.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),i(n,o(a({title:"How to fix “Cannot convert value of type '() -> ()' to expected argument type '() -> _'” | SwiftUI by Example",desc:"How to fix “Cannot convert value of type '() -> ()' to expected argument type '() -> _'”",link:"/hackingwithswift.com/swiftui/how-to-fix-cannot-convert-value-of-type-to-expected-argument-type.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),i(n,o(a({title:"How to fix “Cannot assign to property: 'self' is immutable” | SwiftUI by Example",desc:"How to fix “Cannot assign to property: 'self' is immutable”",link:"/hackingwithswift.com/swiftui/how-to-fix-cannot-assign-to-property-self-is-immutable.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),i(n,o(a({title:"How to fix “Missing argument for parameter 'content' in call” | SwiftUI by Example",desc:"How to fix “Missing argument for parameter 'content' in call”",link:"/hackingwithswift.com/swiftui/how-to-fix-missing-argument-for-parameter-content-in-call.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),i(n,o(a({title:"How to fix “Function declares an opaque return type, but has no return statements in its body from which to infer an underlying type” | SwiftUI by Example",desc:"How to fix “Function declares an opaque return type, but has no return statements in its body from which to infer an underlying type”",link:"/hackingwithswift.com/swiftui/how-to-fix-function-declares-an-opaque-return-type-but-has-no-return-statements-in-its-body-from-which-to-infer-an-underlying-type.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const x=r(d,[["render",w],["__file","how-to-fix-cannot-convert-value-of-type-string-to-expected-argument-type-binding-string.html.vue"]]),k=JSON.parse(`{"path":"/hackingwithswift.com/swiftui/how-to-fix-cannot-convert-value-of-type-string-to-expected-argument-type-binding-string.html","title":"How to fix “Cannot convert value of type 'String' to expected argument type 'Binding<String>'”","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to fix “Cannot convert value of type 'String' to expected argument type 'Binding<String>'”","description":"Article(s) > How to fix “Cannot convert value of type 'String' to expected argument type 'Binding<String>'”","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to fix “Cannot convert value of type 'String' to expected argument type 'Binding<String>'”"},{"property":"og:description","content":"How to fix “Cannot convert value of type 'String' to expected argument type 'Binding<String>'”"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-fix-cannot-convert-value-of-type-string-to-expected-argument-type-binding-string.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-fix-cannot-convert-value-of-type-string-to-expected-argument-type-binding-string.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to fix “Cannot convert value of type 'String' to expected argument type 'Binding<String>'”"}],["meta",{"property":"og:description","content":"Article(s) > How to fix “Cannot convert value of type 'String' to expected argument type 'Binding<String>'”"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2022-12-01T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to fix “Cannot convert value of type 'String' to expected argument type 'Binding<String>'”\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-12-01T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2022-12-01T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.96,"words":588},"filePathRelative":"hackingwithswift.com/swiftui/how-to-fix-cannot-convert-value-of-type-string-to-expected-argument-type-binding-string.md","localizedDate":"2022년 12월 1일","excerpt":"\\n"}`);export{x as comp,k as data};