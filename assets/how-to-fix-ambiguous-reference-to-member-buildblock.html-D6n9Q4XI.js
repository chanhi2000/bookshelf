import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as p,am as n,as as c,ao as t,at as e,au as i,al as r,aq as u,ar as m}from"./app-CpYYKbnj.js";const d={},k={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},g={class:"hint-container details"};function b(o,s){const a=u("VPCard");return m(),p("div",null,[n("h1",k,[n("a",f,[n("span",null,c(o.$frontmatter.title)+" 관련",1)])]),t(a,e(i({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),s[1]||(s[1]=n("nav",{class:"table-of-contents"},[n("ul")],-1)),s[2]||(s[2]=n("hr",null,null,-1)),t(a,e(i({title:"How to fix “Ambiguous reference to member 'buildBlock()'” | SwiftUI by Example",desc:"How to fix “Ambiguous reference to member 'buildBlock()'”",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-fix-ambiguous-reference-to-member-buildblock",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),s[3]||(s[3]=r(`<blockquote><p>Updated for Xcode 15</p></blockquote><p>SwiftUI allows up to 10 static children in each container, so if you try to add 11 or more you’ll get this error. To be clear, this means the following code is valid:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>But if you add a single more <code>Text(&quot;SwiftUI&quot;)</code> then the code will refuse to build.</p><p>To fix this problem, wrap your items in groups of 10 or fewer, like this:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">VStack</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token class-name">Group</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token class-name">Group</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;SwiftUI&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6)),n("details",g,[s[0]||(s[0]=n("summary",null,"Similar solutions…",-1)),t(a,e(i({title:"How to fix “Cannot assign to property: 'self' is immutable” | SwiftUI by Example",desc:"How to fix “Cannot assign to property: 'self' is immutable”",link:"/hackingwithswift.com/swiftui/how-to-fix-cannot-assign-to-property-self-is-immutable.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(a,e(i({title:"How to fix “Modifying state during view update, this will cause undefined behavior” | SwiftUI by Example",desc:"How to fix “Modifying state during view update, this will cause undefined behavior”",link:"/hackingwithswift.com/swiftui/how-to-fix-modifying-state-during-view-update-this-will-cause-undefined-behavior.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(a,e(i({title:"How to fix “Protocol 'View' can only be used as a generic constraint because it has Self or associated type requirements” | SwiftUI by Example",desc:"How to fix “Protocol 'View' can only be used as a generic constraint because it has Self or associated type requirements”",link:"/hackingwithswift.com/swiftui/how-to-fix-protocol-view-can-only-be-used-as-a-generic-constraint-because-it-has-self-or-associated-type-requirements.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(a,e(i({title:"How to fix “Fatal error: No ObservableObject of type SomeType found” | SwiftUI by Example",desc:"How to fix “Fatal error: No ObservableObject of type SomeType found”",link:"/hackingwithswift.com/swiftui/how-to-fix-fatal-error-no-observableobject-of-type-sometype-found.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t(a,e(i({title:"How to fix “Cannot convert value of type 'String' to expected argument type 'Binding<String>'” | SwiftUI by Example",desc:"How to fix “Cannot convert value of type 'String' to expected argument type 'Binding<String>'”",link:"/hackingwithswift.com/swiftui/how-to-fix-cannot-convert-value-of-type-string-to-expected-argument-type-binding-string.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const v=l(d,[["render",b],["__file","how-to-fix-ambiguous-reference-to-member-buildblock.html.vue"]]),x=JSON.parse(`{"path":"/hackingwithswift.com/swiftui/how-to-fix-ambiguous-reference-to-member-buildblock.html","title":"How to fix “Ambiguous reference to member 'buildBlock()'”","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to fix “Ambiguous reference to member 'buildBlock()'”","description":"Article(s) > How to fix “Ambiguous reference to member 'buildBlock()'”","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to fix “Ambiguous reference to member 'buildBlock()'”"},{"property":"og:description","content":"How to fix “Ambiguous reference to member 'buildBlock()'”"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-fix-ambiguous-reference-to-member-buildblock.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-fix-ambiguous-reference-to-member-buildblock.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to fix “Ambiguous reference to member 'buildBlock()'”"}],["meta",{"property":"og:description","content":"Article(s) > How to fix “Ambiguous reference to member 'buildBlock()'”"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2022-12-01T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to fix “Ambiguous reference to member 'buildBlock()'”\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-12-01T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"date":"2022-12-01T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":1.88,"words":564},"filePathRelative":"hackingwithswift.com/swiftui/how-to-fix-ambiguous-reference-to-member-buildblock.md","localizedDate":"2022년 12월 1일","excerpt":"\\n"}`);export{v as comp,x as data};