import{_ as u}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as h,am as e,as as d,ao as a,at as s,au as i,al as l,an as c,aq as r,ar as g}from"./app-CpYYKbnj.js";const w={},m={id:"frontmatter-title-관련",tabindex:"-1"},f={class:"header-anchor",href:"#frontmatter-title-관련"},k={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-tell-the-user-that-no-content-is-available-1.zip",target:"_blank",rel:"noopener noreferrer"},b={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-tell-the-user-that-no-content-is-available-2.zip",target:"_blank",rel:"noopener noreferrer"},v={href:"https://hackingwithswift.com/files/projects/swiftui/how-to-tell-the-user-that-no-content-is-available-3.zip",target:"_blank",rel:"noopener noreferrer"},y={class:"hint-container details"};function x(p,t){const n=r("VPCard"),o=r("FontIcon");return g(),h("div",null,[e("h1",m,[e("a",f,[e("span",null,d(p.$frontmatter.title)+" 관련",1)])]),a(n,s(i({title:"SwiftUI by Example",desc:"Back to Home",link:"/hackingwithswift.com/swiftui/README.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(174,10,10,0.2)"})),null,16),t[4]||(t[4]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[5]||(t[5]=e("hr",null,null,-1)),a(n,s(i({title:"How to tell the user that no content is available | SwiftUI by Example",desc:"How to tell the user that no content is available",link:"https://hackingwithswift.com/quick-start/swiftui/how-to-tell-the-user-that-no-content-is-available",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),t[6]||(t[6]=l(`<blockquote><p>Updated for Xcode 15</p></blockquote><p><strong>New in iOS 17</strong></p><p>SwiftUI has a dedicated <code>ContentUnavailableView</code> type designed to show users when nothing is available to see. For example, if they perform a search that yields no results, using <code>ContentUnavailableView</code> is much nicer than showing a blank screen.</p><p>In its simplest form, you just need to use this code to show a failed search results screen:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token keyword">struct</span> <span class="token class-name">ContentView</span><span class="token punctuation">:</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> body<span class="token punctuation">:</span> <span class="token keyword">some</span> <span class="token class-name">View</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">ContentUnavailableView</span><span class="token punctuation">.</span>search</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)),e("blockquote",null,[e("p",null,[e("a",k,[a(o,{icon:"fas fa-file-zipper"}),t[0]||(t[0]=c("Download this as an Xcode project"))])])]),t[7]||(t[7]=l(`<figure><img src="https://hackingwithswift.com//img/books/quick-start/swiftui/how-to-tell-the-user-that-no-content-is-available-1~dark@2x.png" alt="The default ContentUnavailableView, showing No Results and a prompt for the user to try again." tabindex="0" loading="lazy"><figcaption>The default ContentUnavailableView, showing No Results and a prompt for the user to try again.</figcaption></figure><p>You’ll see a magnifying glass icon, backed up by title and subtitle text explaining that the user’s search yielded no results.</p><p>You can customize it if you want, to add what the user was searching for:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">ContentUnavailableView</span><span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span>text<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;Life, the Universe, and Everything&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,4)),e("blockquote",null,[e("p",null,[e("a",b,[a(o,{icon:"fas fa-file-zipper"}),t[1]||(t[1]=c("Download this as an Xcode project"))])])]),t[8]||(t[8]=l(`<figure><img src="https://hackingwithswift.com//img/books/quick-start/swiftui/how-to-tell-the-user-that-no-content-is-available-2~dark@2x.png" alt="A slightly customized ContentUnavailableView, showing the user’s search string and asking them to try again." tabindex="0" loading="lazy"><figcaption>A slightly customized ContentUnavailableView, showing the user’s search string and asking them to try again.</figcaption></figure><p>But you can also customize the icon and description too, giving a completely bespoke result:</p><div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift" data-title="swift"><pre><code><span class="line"><span class="token class-name">ContentUnavailableView</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;No favorites&quot;</span></span><span class="token punctuation">,</span> systemImage<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;star&quot;</span></span><span class="token punctuation">,</span> description<span class="token punctuation">:</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;You don&#39;t have any favorites yet.&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token function">symbolVariant</span><span class="token punctuation">(</span><span class="token punctuation">.</span>slash<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),e("blockquote",null,[e("p",null,[e("a",v,[a(o,{icon:"fas fa-file-zipper"}),t[2]||(t[2]=c("Download this as an Xcode project"))])])]),t[9]||(t[9]=e("figure",null,[e("img",{src:"https://hackingwithswift.com//img/books/quick-start/swiftui/how-to-tell-the-user-that-no-content-is-available-3~dark@2x.png",alt:"A customize ContentUnavailableView, showing No Favorites and a message telling the user they have no favorites.",tabindex:"0",loading:"lazy"}),e("figcaption",null,"A customize ContentUnavailableView, showing No Favorites and a message telling the user they have no favorites.")],-1)),e("details",y,[t[3]||(t[3]=e("summary",null,"Similar solutions…",-1)),a(n,s(i({title:"How to create multi-column lists using Table | SwiftUI by Example",desc:"How to create multi-column lists using Table",link:"/hackingwithswift.com/swiftui/how-to-create-multi-column-lists-using-table.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(n,s(i({title:"How to mark content as private using privacySensitive() | SwiftUI by Example",desc:"How to mark content as private using privacySensitive()",link:"/hackingwithswift.com/swiftui/how-to-mark-content-as-private-using-privacysensitive.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(n,s(i({title:"How to hide and reveal content using DisclosureGroup | SwiftUI by Example",desc:"How to hide and reveal content using DisclosureGroup",link:"/hackingwithswift.com/swiftui/how-to-hide-and-reveal-content-using-disclosuregroup.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(n,s(i({title:"How to indent the content or scroll indicators in a ScrollView | SwiftUI by Example",desc:"How to indent the content or scroll indicators in a ScrollView",link:"/hackingwithswift.com/swiftui/how-to-indent-the-content-or-scroll-indicators-in-a-scrollview.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16),a(n,s(i({title:"How to place content outside the safe area | SwiftUI by Example",desc:"How to place content outside the safe area",link:"/hackingwithswift.com/swiftui/how-to-place-content-outside-the-safe-area.md",logo:"https://hackingwithswift.com/favicon.svg",background:"rgba(54,94,226,0.2)"})),null,16)])])}const q=u(w,[["render",x],["__file","how-to-tell-the-user-that-no-content-is-available.md.html.vue"]]),H=JSON.parse('{"path":"/hackingwithswift.com/swiftui/how-to-tell-the-user-that-no-content-is-available.md.html","title":"How to tell the user that no content is available","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"How to tell the user that no content is available","description":"Article(s) > How to tell the user that no content is available","category":["Swift","SwiftUI","Article(s)"],"tag":["blog","hackingwithswift.com","crashcourse","swift","swiftui","xcode","appstore"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > How to tell the user that no content is available"},{"property":"og:description","content":"How to tell the user that no content is available"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-tell-the-user-that-no-content-is-available.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-tell-the-user-that-no-content-is-available.md.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"How to tell the user that no content is available"}],["meta",{"property":"og:description","content":"Article(s) > How to tell the user that no content is available"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://hackingwithswift.com//img/books/quick-start/swiftui/how-to-tell-the-user-that-no-content-is-available-1~dark@2x.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"hackingwithswift.com"}],["meta",{"property":"article:tag","content":"crashcourse"}],["meta",{"property":"article:tag","content":"swift"}],["meta",{"property":"article:tag","content":"swiftui"}],["meta",{"property":"article:tag","content":"xcode"}],["meta",{"property":"article:tag","content":"appstore"}],["meta",{"property":"article:published_time","content":"2023-06-16T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"How to tell the user that no content is available\\",\\"image\\":[\\"https://hackingwithswift.com//img/books/quick-start/swiftui/how-to-tell-the-user-that-no-content-is-available-1~dark@2x.png\\",\\"https://hackingwithswift.com//img/books/quick-start/swiftui/how-to-tell-the-user-that-no-content-is-available-2~dark@2x.png\\",\\"https://hackingwithswift.com//img/books/quick-start/swiftui/how-to-tell-the-user-that-no-content-is-available-3~dark@2x.png\\"],\\"datePublished\\":\\"2023-06-16T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]],"next":"/hackingwithswift.com/swiftui/how-to-adjust-the-position-of-a-view-using-its-offset.md","date":"2023-06-16T00:00:00.000Z","isOriginal":false},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":2}]},"readingTime":{"minutes":2.36,"words":708},"filePathRelative":"hackingwithswift.com/swiftui/how-to-tell-the-user-that-no-content-is-available.md.md","localizedDate":"2023년 6월 16일","excerpt":"\\n"}');export{q as comp,H as data};